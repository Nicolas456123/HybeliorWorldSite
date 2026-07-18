#!/usr/bin/env node
'use strict';
/*
 * scripts/snap-pays-cotes.js — Colle les frontières NATIONALES au trait de
 * côte. Les côtes (Atlas-Lore.svg) et les surfaces de pays (Hybelior Pays.png)
 * viennent de deux sources aux calages légèrement différents : les pays
 * débordaient dans l'océan ou n'atteignaient pas la côte.
 *
 * Méthode : pour chaque sommet d'un polygone de pays qui tombe HORS de toute
 * masse terrestre, on le rabat sur le point le plus proche du trait de côte de
 * sa masse d'accueil (celle qui contient le centroïde du pays, sinon la plus
 * proche). Les sommets déjà à terre ne bougent pas. Idempotent.
 *
 * Usage :  node scripts/snap-pays-cotes.js [--marge 1.5]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'monde-contours.json');
const doc = JSON.parse(fs.readFileSync(OUT, 'utf8'));
const jeu = doc.jeux.find((j) => j.era_id === null);
const continents = jeu.masses.filter((m) => m.niveau === 'continent' || !m.niveau);
const pays = jeu.masses.filter((m) => m.niveau === 'pays');

function dedans(pt, poly) {
  let ok = false;
  for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
    if ((poly[a][1] > pt[1]) !== (poly[b][1] > pt[1]) &&
        pt[0] < (poly[b][0] - poly[a][0]) * (pt[1] - poly[a][1]) / (poly[b][1] - poly[a][1]) + poly[a][0]) ok = !ok;
  }
  return ok;
}
// point le plus proche sur le bord d'un polygone
function surBord(pt, poly) {
  let best = null, dBest = 1e15;
  for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
    const [x1, y1] = poly[b], [x2, y2] = poly[a];
    const dx = x2 - x1, dy = y2 - y1;
    const L2 = dx * dx + dy * dy || 1e-9;
    let t = ((pt[0] - x1) * dx + (pt[1] - y1) * dy) / L2;
    t = Math.max(0, Math.min(1, t));
    const px = x1 + t * dx, py = y1 + t * dy;
    const d2 = (pt[0] - px) ** 2 + (pt[1] - py) ** 2;
    if (d2 < dBest) { dBest = d2; best = [px, py]; }
  }
  return { pt: best, d: Math.sqrt(dBest) };
}

let bouges = 0, total = 0;
for (const p of pays) {
  const cx = p.points.reduce((s, q) => s + q[0], 0) / p.points.length;
  const cy = p.points.reduce((s, q) => s + q[1], 0) / p.points.length;
  // masse d'accueil : contient le centroïde, sinon bord le plus proche
  let hote = continents.find((c) => c.points.length > 30 && dedans([cx, cy], c.points));
  if (!hote) {
    let dBest = 1e15;
    for (const c of continents) {
      if (c.points.length <= 30) continue;
      const { d } = surBord([cx, cy], c.points);
      if (d < dBest) { dBest = d; hote = c; }
    }
  }
  if (!hote) continue;
  p.points = p.points.map((pt) => {
    total++;
    if (dedans(pt, hote.points)) return pt;                    // déjà à terre
    // hors côte (dans l'océan ou sur une autre masse) → rabattu sur le bord
    const { pt: snap } = surBord(pt, hote.points);
    bouges++;
    return [Math.round(snap[0] * 100) / 100, Math.round(snap[1] * 100) / 100];
  });
}
fs.writeFileSync(OUT, JSON.stringify(doc) + '\n');
console.log(`✔ frontières collées aux côtes : ${bouges}/${total} sommets rabattus (${pays.length} pays)`);
