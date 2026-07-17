#!/usr/bin/env node
'use strict';
/*
 * scripts/extract-contours.js — Extrait les CONTOURS des masses terrestres
 * depuis une image de la carte du monde, et les convertit en polygones dans le
 * repère du graphe (u = (x + 527.5) / 1047, calage identique à js/map.js).
 *
 * Pipeline (Chromium headless via Playwright — aucun ajout de dépendance) :
 *   1. charge l'image dans un canvas ;
 *   2. classe chaque pixel terre/mer (distance à la couleur d'océan,
 *      auto-détectée sur les coins de l'image ou fournie via --ocean) ;
 *   3. marching squares → contours fermés ; simplification Douglas-Peucker ;
 *   4. filtre les îlots < aire minimale ; convertit en coordonnées monde ;
 *   5. nomme chaque masse par le marqueur de continent le plus proche
 *      (ancres importées de la carte d'origine) ;
 *   6. écrit data/monde-contours.json — consommé par la couche « surfaces »
 *      de la carte vivante. Champ era_id prévu pour les cartes historiques.
 *
 * Usage :
 *   node scripts/extract-contours.js <image> [--ocean "#0e1a26"] [--tol 2]
 *        [--min-aire 400] [--era <era_id>] [--seuil 60]
 *   (l'image doit couvrir TOUTE la carte, même cadrage que les tuiles)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const argv = process.argv.slice(2);
const IMG = argv.find((a) => !a.startsWith('--'));
const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
if (!IMG || !fs.existsSync(IMG)) {
  console.error('usage: node scripts/extract-contours.js <image-de-la-carte> [--ocean #hex] [--tol 2] [--min-aire 400] [--era id] [--seuil 60]');
  process.exit(1);
}

const OCEAN = opt('ocean', null);          // couleur d'océan (sinon auto : coins)
const TOL = +opt('tol', 2);                // tolérance de simplification (px image)
const MIN_AIRE = +opt('min-aire', 400);    // aire minimale d'un îlot (px²)
const ERA = opt('era', null);              // cartes historiques : era_id
const SEUIL = +opt('seuil', 60);           // distance couleur terre/mer (0-441)
const MONDE_PAR_IMG = 1047, OX = 527.5, OY = 535;

(async () => {
  const { chromium } = require(path.join(ROOT, 'node_modules', 'playwright-core'));
  const exe = fs.readdirSync('/opt/pw-browsers')
    .filter((d) => /^chromium[-_]?\d/.test(d))
    .map((d) => `/opt/pw-browsers/${d}/chrome-linux/chrome`)
    .find((p) => fs.existsSync(p));
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const b64 = fs.readFileSync(IMG).toString('base64');
  const ext = path.extname(IMG).slice(1).replace('jpg', 'jpeg');

  const res = await page.evaluate(async ({ b64, ext, OCEAN, TOL, MIN_AIRE, SEUIL }) => {
    // ── 1. image → pixels ──
    const img = new Image();
    await new Promise((ok, ko) => { img.onload = ok; img.onerror = ko; img.src = `data:image/${ext};base64,${b64}`; });
    const W = img.naturalWidth, H = img.naturalHeight;
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.drawImage(img, 0, 0);
    const px = cx.getImageData(0, 0, W, H).data;
    const at = (x, y) => { const i = (y * W + x) * 4; return [px[i], px[i + 1], px[i + 2]]; };

    // ── 2. couleur d'océan : fournie, sinon médiane des 4 coins ──
    let ocean;
    if (OCEAN) {
      const m = OCEAN.replace('#', '');
      ocean = [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
    } else {
      const coins = [at(4, 4), at(W - 5, 4), at(4, H - 5), at(W - 5, H - 5)];
      ocean = [0, 1, 2].map((c) => coins.map((k) => k[c]).sort((a, b) => a - b)[1]);
    }
    const estTerre = (x, y) => {
      const [r, g, b] = at(x, y);
      return Math.hypot(r - ocean[0], g - ocean[1], b - ocean[2]) > SEUIL;
    };

    // ── grille binaire (sous-échantillonnée si très grande image) ──
    const pas = Math.max(1, Math.round(Math.max(W, H) / 2400));
    const gw = Math.floor(W / pas), gh = Math.floor(H / pas);
    const grille = new Uint8Array(gw * gh);
    for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) grille[gy * gw + gx] = estTerre(gx * pas, gy * pas) ? 1 : 0;
    const G = (x, y) => (x < 0 || y < 0 || x >= gw || y >= gh) ? 0 : grille[y * gw + x];

    // ── 3. suivi de contour (Moore) par composante ──
    const vus = new Uint8Array(gw * gh);
    const contours = [];
    const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    function suivre(sx, sy) {
      const pts = [];
      let x = sx, y = sy, dir = 6, n = 0;
      do {
        pts.push([x, y]);
        let trouve = false;
        for (let i = 0; i < 8; i++) {
          const d = (dir + 6 + i) % 8;
          const nx = x + DIRS[d][0], ny = y + DIRS[d][1];
          if (G(nx, ny)) { x = nx; y = ny; dir = d; trouve = true; break; }
        }
        if (!trouve) break;
        if (++n > gw * gh) break;
      } while (x !== sx || y !== sy);
      return pts;
    }
    // remplissage pour marquer la composante entière
    function inonder(sx, sy) {
      const pile = [[sx, sy]]; let aire = 0;
      while (pile.length) {
        const [x, y] = pile.pop();
        if (x < 0 || y < 0 || x >= gw || y >= gh) continue;
        const i = y * gw + x;
        if (vus[i] || !grille[i]) continue;
        vus[i] = 1; aire++;
        pile.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
      return aire;
    }
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        const i = y * gw + x;
        if (!grille[i] || vus[i]) continue;
        if (G(x - 1, y)) { inonder(x, y); continue; }   // pas un bord gauche → juste marquer
        const c = suivre(x, y);
        const aire = inonder(x, y);
        if (aire * pas * pas >= MIN_AIRE && c.length > 12) contours.push({ pts: c, aire: aire * pas * pas });
      }
    }

    // ── 4. simplification Douglas-Peucker ──
    function dp(pts, eps) {
      if (pts.length < 4) return pts;
      const dmax = { d: 0, i: 0 };
      const [x1, y1] = pts[0], [x2, y2] = pts[pts.length - 1];
      const L = Math.hypot(x2 - x1, y2 - y1) || 1e-9;
      for (let i = 1; i < pts.length - 1; i++) {
        const d = Math.abs((pts[i][0] - x1) * (y2 - y1) - (pts[i][1] - y1) * (x2 - x1)) / L;
        if (d > dmax.d) { dmax.d = d; dmax.i = i; }
      }
      if (dmax.d <= eps) return [pts[0], pts[pts.length - 1]];
      const a = dp(pts.slice(0, dmax.i + 1), eps), b = dp(pts.slice(dmax.i), eps);
      return a.slice(0, -1).concat(b);
    }
    const epsGrille = Math.max(.8, TOL / pas);
    const simples = contours
      .sort((a, b) => b.aire - a.aire)
      .map((c) => ({ aire: c.aire, pts: dp(c.pts, epsGrille).map(([x, y]) => [x * pas, y * pas]) }))
      .filter((c) => c.pts.length >= 6);
    return { W, H, ocean, pas, masses: simples };
  }, { b64, ext, OCEAN, TOL, MIN_AIRE, SEUIL });
  await browser.close();

  // ── 5. pixels → monde + nommage par marqueur de continent ──
  const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'kg-base.json'), 'utf8'));
  const continents = base.entities.filter((e) => e.type === 'lieu' && e.data && e.data.echelle === 'continent' && e.data.coord_x != null);
  const enMonde = ([px, py]) => [
    Math.round(((px / res.W) * MONDE_PAR_IMG - OX) * 100) / 100,
    Math.round(((py / res.W) * MONDE_PAR_IMG - OY) * 100) / 100,
  ];
  const masses = res.masses.map((m) => {
    const pts = m.pts.map(enMonde);
    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    let nom = null, dMin = 1e15;
    for (const c of continents) {
      const d = Math.hypot(cx - c.data.coord_x, cy - c.data.coord_y);
      if (d < dMin) { dMin = d; nom = c.name; }
    }
    return { nom: dMin < 260 ? nom : null, aire_px: m.aire, points: pts };
  });

  const OUT = path.join(ROOT, 'data', 'monde-contours.json');
  let doc = { _note: 'Contours extraits de la carte (scripts/extract-contours.js). Repère monde (u=(x+527.5)/1047).', jeux: [] };
  if (fs.existsSync(OUT)) { try { doc = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch { /* remplace */ } }
  doc.jeux = (doc.jeux || []).filter((j) => (j.era_id || null) !== ERA);
  doc.jeux.push({ era_id: ERA, source: path.basename(IMG), image: { W: res.W, H: res.H, ocean: res.ocean }, masses });
  fs.writeFileSync(OUT, JSON.stringify(doc) + '\n');

  console.log(`✔ ${masses.length} masses terrestres extraites (image ${res.W}×${res.H}, océan rgb(${res.ocean.join(',')}), pas ${res.pas}px)`);
  for (const m of masses.slice(0, 15)) console.log('  ', (m.nom || '(sans nom)').padEnd(12), m.points.length, 'sommets');
  console.log(`→ data/monde-contours.json${ERA ? ' (ère ' + ERA + ')' : ''} — la couche « surfaces » de la carte vivante les affichera.`);
})();
