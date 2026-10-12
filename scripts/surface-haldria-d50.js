#!/usr/bin/env node
/**
 * Surface de Haldria sur la carte des pays : décision de l'auteur D50 du
 * 2026-10-12, suite de D47 (demande Studio d492ccffc ; registre, II §20).
 *
 * Haldria = la terre d'Ilthara (masses d'eau exclues) comprise dans la zone Z
 * ci-dessous, hors des surfaces des autres pays. Z réunit l'aplat « Haldria »
 * de « Hybelior Pays.png » et la presqu'île de Ravantis (aplat brun sans nom,
 * Ravantis selon les fiches) ; ses bords suivent les frontières tiretées de la
 * carte Pays, relevées à la main sur la planche du 2026-10-12 :
 *   - nord-ouest : Ackerna (Reckia, Vesperis, Ostram restent à Ackerna ; le
 *     tracé passe au sud de la rive d'Ostram) ;
 *   - nord : Sylthara (de (−272 ; 127) vers (−235 ; 136), infléchie au sud de
 *     Falyria, ville de Sylthara selon sa fiche) ;
 *   - est : la frontière tiretée vers x ≈ −222, de la mer intérieure à la côte
 *     sud (Brystalis reste à Vytharia).
 * Le coin nord-ouest (zone K, terre entre la frontière et la surface d'Ackerna,
 * autrefois dans le lobe figé de Warenthor) est ajouté à Ackerna.
 * Raster de 0,25 u, contour de Moore, simplification de Douglas-Peucker 0,3 u.
 * Aucun rattachement n'est déduit de ces surfaces (rattachement = fiches).
 * Idempotent. Usage : node scripts/surface-haldria-d50.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'monde-contours.json');
const ESSAI = process.argv.includes('--essai');
const doc = JSON.parse(fs.readFileSync(OUT, 'utf8'));
const jeu = doc.jeux.find((j) => j.era_id === null);

// frontière nord-ouest (Ackerna), d'ouest en est
const NO = [[-312, 149.5], [-300, 149], [-296, 141], [-289, 139], [-285.5, 135.5], [-283.5, 131], [-283.5, 124], [-279, 121], [-276, 119]];
// frontière nord (Sylthara) puis rive nord-est jusqu'à la mer intérieure
const NORD = [[-272, 127], [-253, 131], [-249, 139.5], [-243, 140], [-235, 139], [-228, 140]];
// frontière est (Vytharia), du sud de la mer intérieure à la côte sud
const EST = [[-224, 192], [-223.5, 195.5], [-224, 199.5], [-223, 202.5], [-221.5, 206], [-220.5, 208.5], [-221.5, 213], [-222, 216]];
const Z = [[-345, 149.5], ...NO, ...NORD, [-228, 192], ...EST, [-222, 262], [-345, 262]];
const K = [[-345, 100], [-276, 100], ...NO.slice().reverse(), [-345, 149.5]];

const X0 = -350, X1 = -210, Y0 = 40, Y1 = 262, R = 0.25;
const W = Math.round((X1 - X0) / R), H = Math.round((Y1 - Y0) / R);
const anneaux = (m) => (Array.isArray(m.points[0][0]) ? m.points : [m.points]);

// remplissage par lignes (pair-impair) d'une liste d'anneaux
function raster(rings) {
  const g = new Uint8Array(W * H);
  for (let r = 0; r < H; r++) {
    const y = Y0 + (r + 0.5) * R;
    const xs = [];
    for (const ring of rings) {
      for (let a = 0, b = ring.length - 1; a < ring.length; b = a++) {
        const [xa, ya] = ring[a], [xb, yb] = ring[b];
        if ((ya > y) !== (yb > y)) xs.push(xa + (y - ya) * (xb - xa) / (yb - ya));
      }
    }
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const c0 = Math.max(0, Math.ceil((xs[k] - X0) / R - 0.5)), c1 = Math.min(W - 1, Math.floor((xs[k + 1] - X0) / R - 0.5));
      for (let c = c0; c <= c1; c++) g[r * W + c] ^= 1;
    }
  }
  return g;
}
const ilthara = jeu.masses.find((m) => m.niveau === 'continent' && m.nom === 'Ilthara');
const terre = raster(anneaux(ilthara));
for (const m of jeu.masses.filter((x) => x.niveau === 'eau')) {
  const e = raster(anneaux(m));
  for (let i = 0; i < e.length; i++) if (e[i]) terre[i] = 0;
}
const autres = new Uint8Array(W * H);
for (const m of jeu.masses.filter((x) => x.niveau === 'pays' && x.nom !== 'Haldria')) {
  const p = raster(anneaux(m));
  for (let i = 0; i < p.length; i++) if (p[i]) autres[i] = 1;
}
const z = raster([Z]), k = raster([K]);
const ackOld = raster(anneaux(jeu.masses.find((m) => m.niveau === 'pays' && m.nom === 'Ackerna')));

const hald = new Uint8Array(W * H), ack = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) {
  if (terre[i] && z[i] && !autres[i]) hald[i] = 1;
  if (ackOld[i] || (terre[i] && k[i] && !autres[i] && !z[i])) ack[i] = 1;
}

// plus grande composante 4-connexe
function principale(g) {
  const lab = new Int32Array(W * H).fill(-1);
  let best = -1, bestN = 0, id = 0;
  const tailles = [];
  for (let i = 0; i < W * H; i++) {
    if (!g[i] || lab[i] >= 0) continue;
    const pile = [i]; lab[i] = id; let n = 0;
    while (pile.length) {
      const j = pile.pop(); n++;
      const x = j % W;
      for (const v of [j - 1, j + 1, j - W, j + W]) {
        if (v < 0 || v >= W * H || lab[v] >= 0 || !g[v]) continue;
        if (Math.abs((v % W) - x) > 1) continue;
        lab[v] = id; pile.push(v);
      }
    }
    tailles.push(n);
    if (n > bestN) { bestN = n; best = id; }
    id++;
  }
  const out = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (lab[i] === best) out[i] = 1;
  return { masque: out, n: bestN, ecartees: tailles.filter((t, j) => j !== best).reduce((s, t) => s + t, 0) };
}
function contour(dans) {
  let start = -1;
  for (let i = 0; i < W * H; i++) if (dans[i]) { start = i; break; }
  const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  const D = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? 0 : dans[y * W + x];
  let x = start % W, y = (start / W) | 0, dir = 6;
  const pts = []; let n = 0; const x0 = x, y0 = y;
  do {
    pts.push([x, y]);
    let ok = false;
    for (let q = 0; q < 8; q++) {
      const dd = (dir + 6 + q) % 8, nx = x + DIRS[dd][0], ny = y + DIRS[dd][1];
      if (D(nx, ny)) { x = nx; y = ny; dir = dd; ok = true; break; }
    }
    if (!ok || ++n > 400000) break;
  } while (x !== x0 || y !== y0);
  return pts;
}
function simplifier(pts, eps) {
  if (pts.length < 4) return pts;
  const garder = new Uint8Array(pts.length);
  let far = 1, dmax = -1;
  for (let j = 1; j < pts.length; j++) { const d = Math.hypot(pts[j][0] - pts[0][0], pts[j][1] - pts[0][1]); if (d > dmax) { dmax = d; far = j; } }
  garder[0] = garder[far] = garder[pts.length - 1] = 1;
  const pile = [[0, far], [far, pts.length - 1]];
  while (pile.length) {
    const [a, b] = pile.pop();
    if (b - a < 2) continue;
    const [x1, y1] = pts[a], [x2, y2] = pts[b];
    const L = Math.hypot(x2 - x1, y2 - y1) || 1e-9;
    let dm = 0, idx = a;
    for (let j = a + 1; j < b; j++) {
      const d = Math.abs((pts[j][0] - x1) * (y2 - y1) - (pts[j][1] - y1) * (x2 - x1)) / L;
      if (d > dm) { dm = d; idx = j; }
    }
    if (dm > eps) { garder[idx] = 1; pile.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, j) => garder[j]);
}
const enMonde = ([c, r]) => [Math.round((X0 + (c + 0.5) * R) * 100) / 100, Math.round((Y0 + (r + 0.5) * R) * 100) / 100];
function polygone(g) {
  const p = principale(g);
  return { points: simplifier(contour(p.masque).map(enMonde), 0.3), u2: Math.round(p.n * R * R), ecartees: Math.round(p.ecartees * R * R) };
}

const H_ = polygone(hald), A_ = polygone(ack);
const S = 2.64937 ** 2; // aire en px² de la carte Pays (S = 2653), unité de `aire`
const masseH = { nom: 'Haldria', niveau: 'pays', aire: Math.round(H_.u2 * S), points: H_.points, source: 'scripts/surface-haldria-d50.js', note: 'D50 (2026-10-12) : aplat « Haldria » + presqu\'île de Ravantis, frontières tiretées relevées à la main ; surface figée dans l\'Atrium (pol-0017 data.carte.surface_figee).' };
const ancA = jeu.masses.find((m) => m.niveau === 'pays' && m.nom === 'Ackerna');
const masseA = Object.assign({}, ancA, { aire: Math.round(A_.u2 * S), points: A_.points, note: 'D50 (2026-10-12) : le coin nord-ouest de l\'ancien lobe de Warenthor (Reckia, Vesperis, Ostram) est ajouté à la surface extraite (scripts/surface-haldria-d50.js).' });

const { charger, score } = require('./diagnostic-pays.js');
const lieux = charger();
const sH = score(lieux, 'Haldria', masseH), sA0 = score(lieux, 'Ackerna', ancA), sA = score(lieux, 'Ackerna', masseA);
console.log(`Haldria : ${H_.u2} u², ${H_.points.length} sommets (éclats écartés : ${H_.ecartees} u²) ; justes ${sH.justes}, intrus ${sH.intrus} ${JSON.stringify(sH.parIntrus)}, échappés ${sH.echappes}`);
console.log(`Ackerna : ${A_.u2} u² ; justes ${sA0.justes}→${sA.justes}, intrus ${sA0.intrus}→${sA.intrus}, échappés ${sA0.echappes}→${sA.echappes}`);
if (sH.intrus) console.log('⚠ intrus dans Haldria : ' + lieux.filter((l) => l.nation.name !== 'Haldria' && (function d(x, y, p) { let o = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const [a, b] = p[i], [c, e] = p[j]; if ((b > y) !== (e > y) && x < ((c - a) * (y - b)) / (e - b) + a) o = !o; } return o; })(l.x, l.y, masseH.points)).map((l) => l.nom).join(', '));
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
jeu.masses = jeu.masses.filter((m) => !(m.niveau === 'pays' && (m.nom === 'Haldria' || m.nom === 'Ackerna'))).concat([masseA, masseH]);
fs.writeFileSync(OUT, JSON.stringify(doc) + '\n');
console.log('✓ data/monde-contours.json écrit (Haldria, Ackerna). Ensuite : node scripts/verifier-contours.js && node scripts/generer-cartes-eres.js');
