#!/usr/bin/env node
'use strict';
/*
 * scripts/extract-svg-contours.js — Extrait les côtes VECTORIELLES du
 * landMask d'Atlas-Lore.svg (188 sous-chemins : continents + îles) et les
 * convertit dans le repère monde du graphe.
 *
 * Calage exact (résidu 0, ajusté sur 18 villes nommées de l'atlas) :
 *   x_monde = 0.349003·sx − 562.40 ; y_monde = 0.349000·sy − 574.09
 *
 * Sortie : data/monde-contours.json (jeu era_id=null = le monde actuel ;
 * les cartes historiques s'ajoutent comme jeux distincts par era_id).
 *
 * Usage :  node scripts/extract-svg-contours.js [--tol 1.2] [--min-aire 40]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const AX = 0.349003, BX = -562.40, AY = 0.349000, BY = -574.09;
const opt = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 ? +process.argv[i + 1] : d; };
const TOL = opt('tol', 1.2);
const MIN_AIRE = opt('min-aire', 40);

const svg = fs.readFileSync(path.join(ROOT, 'Atlas-Lore.svg'), 'utf8');
const mask = svg.match(/<clipPath id="landMask">([\s\S]*?)<\/clipPath>/);
if (!mask) { console.error('landMask introuvable'); process.exit(1); }
const dAttr = [...mask[1].matchAll(/d="([^"]+)"/g)].map((m) => m[1]).join(' ');

// ── parseur (M/L/C absolus, sans Z — le format de l'atlas) ────────────────
const tokens = dAttr.match(/[MLCZmlcz]|-?[\d.]+(?:e-?\d+)?/g);
const sousChemins = [];
let courant = null, i = 0, cx = 0, cy = 0;
const lire = () => +tokens[i++];
while (i < tokens.length) {
  const t = tokens[i++];
  if (t === 'M' || t === 'm') {
    if (courant && courant.length > 2) sousChemins.push(courant);
    const x = lire(), y = lire();
    cx = (t === 'm' && courant) ? cx + x : x; cy = (t === 'm' && courant) ? cy + y : y;
    courant = [[cx, cy]];
  } else if (t === 'L' || t === 'l') {
    const x = lire(), y = lire();
    cx = t === 'l' ? cx + x : x; cy = t === 'l' ? cy + y : y;
    if (courant) courant.push([cx, cy]);
  } else if (t === 'C' || t === 'c') {
    const x1 = lire(), y1 = lire(), x2 = lire(), y2 = lire(), x = lire(), y = lire();
    const p0 = [cx, cy];
    const p1 = t === 'c' ? [cx + x1, cy + y1] : [x1, y1];
    const p2 = t === 'c' ? [cx + x2, cy + y2] : [x2, y2];
    const p3 = t === 'c' ? [cx + x, cy + y] : [x, y];
    if (courant) for (let s = 1; s <= 4; s++) {
      const u = s / 4, v = 1 - u;
      courant.push([
        v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0],
        v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1],
      ]);
    }
    cx = p3[0]; cy = p3[1];
  } else if (t === 'Z' || t === 'z') {
    if (courant && courant.length > 2) sousChemins.push(courant);
    courant = null;
  } else {
    const x = +t, y = lire();
    if (courant) { courant.push([x, y]); cx = x; cy = y; }
  }
}
if (courant && courant.length > 2) sousChemins.push(courant);

// ── monde + simplification (Douglas-Peucker itératif, pile explicite) ─────
// Le landMask est utilisé avec transform="translate(100,100) scale(0.5)" :
// coordonnées brutes → viewBox : svg = brut·0.5 + 100, puis viewBox → monde.
const enMonde = ([rx, ry]) => [AX * (rx * 0.5 + 100) + BX, AY * (ry * 0.5 + 100) + BY];
function simplifier(pts, eps) {
  if (pts.length < 4) return pts;
  const garder = new Uint8Array(pts.length);
  garder[0] = garder[pts.length - 1] = 1;
  const pile = [];
  // Contour fermé (début ≈ fin) : le segment de référence est dégénéré et
  // toutes les distances valent 0 — on ancre d'abord le point le plus éloigné.
  const ferme = Math.hypot(pts[0][0] - pts[pts.length - 1][0], pts[0][1] - pts[pts.length - 1][1]) < eps * 2;
  if (ferme) {
    let far = 1, dmax = -1;
    for (let j = 1; j < pts.length - 1; j++) {
      const dd = Math.hypot(pts[j][0] - pts[0][0], pts[j][1] - pts[0][1]);
      if (dd > dmax) { dmax = dd; far = j; }
    }
    garder[far] = 1;
    pile.push([0, far], [far, pts.length - 1]);
  } else pile.push([0, pts.length - 1]);
  while (pile.length) {
    const [a, b] = pile.pop();
    if (b - a < 2) continue;
    const [x1, y1] = pts[a], [x2, y2] = pts[b];
    const L = Math.hypot(x2 - x1, y2 - y1) || 1e-9;
    let dmax = 0, idx = a;
    for (let j = a + 1; j < b; j++) {
      const dd = Math.abs((pts[j][0] - x1) * (y2 - y1) - (pts[j][1] - y1) * (x2 - x1)) / L;
      if (dd > dmax) { dmax = dd; idx = j; }
    }
    if (dmax > eps) { garder[idx] = 1; pile.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, j) => garder[j]);
}
const aireDe = (pts) => Math.abs(pts.reduce((s, p, j) => { const q = pts[(j + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);

const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'kg-base.json'), 'utf8'));
const continents = base.entities.filter((e) => e.type === 'lieu' && e.data && e.data.echelle === 'continent' && e.data.coord_x != null);
// villes positionnées → continent (via nation), pour nommer les masses sans marqueur dedans
const byId = {}; for (const e of base.entities) byId[e.id] = e;
const natCont = {};
for (const r of base.relations) {
  if (r.rel_type !== 'situe-dans') continue;
  const a = byId[r.from_id], b = byId[r.to_id];
  if (a && b && a.type === 'entite-politique' && b.type === 'lieu' && b.data && b.data.echelle === 'continent') natCont[a.id] = b.name;
}
const villesCont = [];
for (const r of base.relations) {
  if (r.rel_type !== 'situe-dans') continue;
  const v = byId[r.from_id], n = byId[r.to_id];
  if (v && n && v.type === 'lieu' && v.data && v.data.coord_x != null && natCont[n.id]) villesCont.push({ x: +v.data.coord_x, y: +v.data.coord_y, cont: natCont[n.id] });
}
function dedans(pt, poly) {
  let ok = false;
  for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
    if ((poly[a][1] > pt[1]) !== (poly[b][1] > pt[1]) &&
        pt[0] < (poly[b][0] - poly[a][0]) * (pt[1] - poly[a][1]) / (poly[b][1] - poly[a][1]) + poly[a][0]) ok = !ok;
  }
  return ok;
}

const masses = sousChemins
  .map((sc) => {
    const monde = sc.map(enMonde);
    const pts = simplifier(monde, TOL).map(([x, y]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100]);
    return { pts, aire: aireDe(pts) };
  })
  .filter((m) => m.aire >= MIN_AIRE && m.pts.length >= 5)
  .sort((a, b) => b.aire - a.aire)
  .map((m) => {
    // 1. un marqueur de continent DANS la masse ; 2. sinon vote des villes contenues
    let nom = null;
    for (const c of continents) if (dedans([c.data.coord_x, c.data.coord_y], m.pts)) { nom = c.name; break; }
    if (!nom) {
      const votes = {};
      for (const v of villesCont) if (dedans([v.x, v.y], m.pts)) votes[v.cont] = (votes[v.cont] || 0) + 1;
      const gagnant = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
      if (gagnant && gagnant[1] >= 2) nom = gagnant[0];
    }
    return { nom, niveau: 'continent', aire: Math.round(m.aire), points: m.pts };
  });

const OUT = path.join(ROOT, 'data', 'monde-contours.json');
let doc = { _note: 'Côtes vectorielles extraites d\'Atlas-Lore.svg (landMask), repère monde. Jeux par ère (era_id null = actuel).', jeux: [] };
if (fs.existsSync(OUT)) { try { doc = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch { /* remplace */ } }
doc.jeux = (doc.jeux || []).filter((j) => j.era_id !== null);
doc.jeux.unshift({ era_id: null, source: 'Atlas-Lore.svg#landMask', masses });
fs.writeFileSync(OUT, JSON.stringify(doc) + '\n');

const somme = masses.reduce((s, m) => s + m.points.length, 0);
console.log(`✔ ${masses.length} masses terrestres (côtes réelles), ${somme} sommets`);
for (const m of masses.slice(0, 14)) console.log('  ', (m.nom || '(île)').padEnd(12), String(m.points.length).padStart(4), 'sommets | aire', m.aire);
console.log('→ data/monde-contours.json — couche 🏔 surfaces de la carte vivante.');
