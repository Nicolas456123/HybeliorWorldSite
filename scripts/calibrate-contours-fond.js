#!/usr/bin/env node
'use strict';
/*
 * scripts/calibrate-contours-fond.js — RECALE les contours (côtes + pays) sur
 * le FOND DE CARTE réel (canon-stitched.jpg, source des tuiles DZI).
 *
 * Pourquoi : trois sources, trois calages. Le fond et les points (villes…)
 * partagent le repère historique u=(x+527.5)/1047, v=(y+535)/1047 — c'est la
 * référence. Les côtes (Atlas-Lore.svg) et les pays (Hybelior Pays.png)
 * avaient chacun leur propre ajustement → décalages visibles à l'écran.
 *
 * Méthode (Chromium headless, aucune dépendance) :
 *   1. masque terre/océan du fond → champ de distance au TRAIT DE CÔTE ;
 *   2. pour chaque jeu (continents puis pays), descente par recuit sur une
 *      correction affine axiale (sx, sy, tx, ty) minimisant la distance
 *      moyenne tronquée des sommets côtiers au trait de côte (robuste aux
 *      divergences locales entre l'atlas dessiné et la carte peinte) ;
 *   3. application des corrections en coordonnées monde dans
 *      data/monde-contours.json + image de contrôle avant/après.
 *
 * Après ce script, relancer scripts/snap-pays-cotes.js pour souder les
 * frontières nationales aux côtes corrigées.
 *
 * Usage :  node scripts/calibrate-contours-fond.js [--apercu]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'monde-contours.json');
const IMG = path.join(ROOT, 'canon-stitched.jpg');
// repère du fond (js/map.js + js/monde.js) : px_img = (x_monde+OX)/M * W
const M = 1047, OX = 527.5, OY = 535;
const DEMI = 1651;                       // travail à la demi-résolution (3302/2)

(async () => {
  const doc = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  const jeu = doc.jeux.find((j) => j.era_id === null);
  const continents = jeu.masses.filter((m) => m.niveau === 'continent' || !m.niveau);
  const pays = jeu.masses.filter((m) => m.niveau === 'pays');

  const { chromium } = require(path.join(ROOT, 'node_modules', 'playwright-core'));
  const exe = fs.readdirSync('/opt/pw-browsers').filter((d) => /^chromium[-_]?\d/.test(d))
    .map((d) => `/opt/pw-browsers/${d}/chrome-linux/chrome`).find((p) => fs.existsSync(p));
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const b64 = fs.readFileSync(IMG).toString('base64');

  const res = await page.evaluate(async ({ b64, continents, pays, M, OX, OY, DEMI, apercu }) => {
    const img = new Image();
    await new Promise((ok, ko) => { img.onload = ok; img.onerror = ko; img.src = 'data:image/jpeg;base64,' + b64; });
    const S = DEMI;
    const cv = document.createElement('canvas'); cv.width = S; cv.height = S;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.drawImage(img, 0, 0, S, S);
    const d = cx.getImageData(0, 0, S, S).data;

    // ── 1. masque océan (bleu/sarcelle : b nettement au-dessus du rouge) ──
    const ocean = new Uint8Array(S * S);
    for (let i = 0; i < S * S; i++) {
      const r = d[i * 4], b = d[i * 4 + 2];
      if (b - r > 22 && b > 95) ocean[i] = 1;
    }
    // ── champ de distance au trait de côte (chamfer 3-4, deux passes) ─────
    const INF = 1e7;
    const df = new Float32Array(S * S).fill(INF);
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const i = y * S + x;
        const o = ocean[i];
        if ((x > 0 && ocean[i - 1] !== o) || (y > 0 && ocean[i - S] !== o) ||
            (x < S - 1 && ocean[i + 1] !== o) || (y < S - 1 && ocean[i + S] !== o)) df[i] = 0;
      }
    }
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const i = y * S + x;
      if (x > 0) df[i] = Math.min(df[i], df[i - 1] + 3);
      if (y > 0) df[i] = Math.min(df[i], df[i - S] + 3);
      if (x > 0 && y > 0) df[i] = Math.min(df[i], df[i - S - 1] + 4);
      if (x < S - 1 && y > 0) df[i] = Math.min(df[i], df[i - S + 1] + 4);
    }
    for (let y = S - 1; y >= 0; y--) for (let x = S - 1; x >= 0; x--) {
      const i = y * S + x;
      if (x < S - 1) df[i] = Math.min(df[i], df[i + 1] + 3);
      if (y < S - 1) df[i] = Math.min(df[i], df[i + S] + 3);
      if (x < S - 1 && y < S - 1) df[i] = Math.min(df[i], df[i + S + 1] + 4);
      if (x > 0 && y < S - 1) df[i] = Math.min(df[i], df[i + S - 1] + 4);
    }
    const dist = (px, py) => {
      const x = Math.round(px), y = Math.round(py);
      if (x < 0 || y < 0 || x >= S || y >= S) return 60;
      return df[y * S + x] / 3;                          // ≈ pixels
    };

    // monde → pixels (demi-résolution)
    const K = S / M;                                     // px par unité monde
    const pX = (wx) => (wx + OX) * K, pY = (wy) => (wy + OY) * K;

    // ── 2. ajustement (sx, sy, tx, ty) en px, coût = moyenne tronquée ─────
    function cout(pts, p, cap) {
      let s = 0;
      for (let i = 0; i < pts.length; i++) {
        const dd = dist(p[0] * pts[i][0] + p[2], p[1] * pts[i][1] + p[3]);
        s += Math.min(dd, cap);
      }
      return s / pts.length;
    }
    function ajuster(pts, cap) {
      let best = [1, 1, 0, 0], cBest = cout(pts, best, cap);
      // recuit par balayages coordonnée par coordonnée, pas décroissant
      const pas = [[.02, 24], [.008, 9], [.003, 3.5], [.001, 1.2], [.0004, .45]];
      for (const [ds, dt] of pas) {
        let bouge = true;
        while (bouge) {
          bouge = false;
          for (let k = 0; k < 4; k++) {
            const dp = k < 2 ? ds : dt;
            for (const sgn of [1, -1]) {
              const cand = best.slice(); cand[k] += sgn * dp;
              const c = cout(pts, cand, cap);
              if (c < cBest - 1e-6) { best = cand; cBest = c; bouge = true; }
            }
          }
        }
      }
      return { p: best, c: cBest };
    }

    // sommets côtiers des continents = tous ; des pays = proches du trait
    const vCont = [];
    for (const m of continents) for (const q of m.points) vCont.push([pX(q[0]), pY(q[1])]);
    const avantCont = cout(vCont, [1, 1, 0, 0], 30);
    const fitCont = ajuster(vCont, 30);

    const vPays = [];
    for (const m of pays) for (const q of m.points) {
      const px = pX(q[0]), py = pY(q[1]);
      if (dist(px, py) < 15) vPays.push([px, py]);       // sommets côtiers seulement
    }
    const avantPays = cout(vPays, [1, 1, 0, 0], 30);
    const fitPays = ajuster(vPays, 30);

    // ── 3. aperçu avant/après (contours sur le fond) ──────────────────────
    let apercuPng = null;
    if (apercu) {
      const cv2 = document.createElement('canvas'); cv2.width = S; cv2.height = S;
      const c2 = cv2.getContext('2d');
      c2.drawImage(img, 0, 0, S, S);
      const tracer = (masses, p, coul, lw) => {
        c2.strokeStyle = coul; c2.lineWidth = lw;
        for (const m of masses) {
          c2.beginPath();
          m.points.forEach((q, i) => {
            const x = p[0] * pX(q[0]) + p[2], y = p[1] * pY(q[1]) + p[3];
            i ? c2.lineTo(x, y) : c2.moveTo(x, y);
          });
          c2.closePath(); c2.stroke();
        }
      };
      tracer(continents, [1, 1, 0, 0], 'rgba(255,80,80,.8)', 1);      // avant : rouge
      tracer(continents, fitCont.p, 'rgba(20,200,60,.9)', 1.4);       // après : vert
      tracer(pays, fitPays.p, 'rgba(40,80,255,.7)', 1);               // pays après : bleu
      apercuPng = cv2.toDataURL('image/png');
    }
    return { fitCont, fitPays, avantCont, avantPays, nCont: vCont.length, nPays: vPays.length, apercuPng };
  }, { b64, continents, pays, M, OX, OY, DEMI, apercu: process.argv.includes('--apercu') });
  await browser.close();

  const { fitCont, fitPays, avantCont, avantPays } = res;
  console.log(`côtes  : ${res.nCont} sommets | écart moyen ${avantCont.toFixed(2)} px → ${fitCont.c.toFixed(2)} px`);
  console.log('         correction px [sx, sy, tx, ty] =', fitCont.p.map((v) => +v.toFixed(4)).join(', '));
  console.log(`pays   : ${res.nPays} sommets côtiers | écart moyen ${avantPays.toFixed(2)} px → ${fitPays.c.toFixed(2)} px`);
  console.log('         correction px [sx, sy, tx, ty] =', fitPays.p.map((v) => +v.toFixed(4)).join(', '));

  // corrections px (demi-rés) → monde : x' = sx·x + (sx−1)·OX + tx/K
  const K = DEMI / M;
  const enMonde = ([sx, sy, tx, ty]) => ({
    ax: sx, bx: (sx - 1) * OX + tx / K,
    ay: sy, by: (sy - 1) * OY + ty / K,
  });
  const cC = enMonde(fitCont.p), cP = enMonde(fitPays.p);
  console.log('monde  côtes :', JSON.stringify(cC));
  console.log('monde  pays  :', JSON.stringify(cP));

  const appliquer = (masses, c) => {
    for (const m of masses) {
      m.points = m.points.map(([x, y]) => [
        Math.round((c.ax * x + c.bx) * 100) / 100,
        Math.round((c.ay * y + c.by) * 100) / 100,
      ]);
    }
  };
  appliquer(jeu.masses.filter((m) => m.niveau === 'continent' || !m.niveau), cC);
  appliquer(jeu.masses.filter((m) => m.niveau === 'pays'), cP);
  fs.writeFileSync(OUT, JSON.stringify(doc) + '\n');
  console.log('✔ data/monde-contours.json recalé sur le fond de carte');

  if (res.apercuPng) {
    const out = path.join(ROOT, '..', 'apercu-calage.png');
    const dest = process.env.APERCU || out;
    fs.writeFileSync(dest, Buffer.from(res.apercuPng.split(',')[1], 'base64'));
    console.log('aperçu →', dest, '(rouge = côtes avant, vert = côtes après, bleu = pays après)');
  }
})();
