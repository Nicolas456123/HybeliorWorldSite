#!/usr/bin/env node
'use strict';
/*
 * scripts/verifier-contours.js — garde-fou de data/monde-contours.json.
 * Échoue (code 1) si un anneau d'eau (mer intérieure, lac) est encore rangé
 * comme « continent » (registre du prototype, C2) ; vérifie aussi que chaque
 * anneau d'eau tombe dans une terre (ou une mer intérieure) et que les
 * continents n'ont pas de terre « en creux » dans une autre terre.
 *   node scripts/verifier-contours.js [fichier.json]
 */
const fs = require('fs');
const path = require('path');
const doc = JSON.parse(fs.readFileSync(process.argv[2] || path.join(__dirname, '..', 'data', 'monde-contours.json'), 'utf8'));
const dedans = (pt, poly) => {
  let ok = false;
  for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
    if ((poly[a][1] > pt[1]) !== (poly[b][1] > pt[1]) &&
        pt[0] < (poly[b][0] - poly[a][0]) * (pt[1] - poly[a][1]) / (poly[b][1] - poly[a][1]) + poly[a][0]) ok = !ok;
  }
  return ok;
};
const part = (m, hote) => m.points.filter((p) => dedans(p, hote.points)).length / m.points.length;
let erreurs = 0;
const ko = (msg) => { erreurs++; console.log('✘ ' + msg); };

for (const jeu of doc.jeux) {
  const tag = jeu.era_id || 'actuel';
  const terres = jeu.masses.filter((m) => m.niveau === 'continent');
  const eaux = jeu.masses.filter((m) => m.niveau === 'eau');
  // 1. une « terre » entièrement contenue dans une autre terre est un anneau de trop (sauf île d'une mer intérieure)
  for (const m of terres) {
    for (const o of terres) {
      if (o === m || o.aire <= m.aire) continue;
      if (part(m, o) > 0.9 && !eaux.some((e) => part(m, e) > 0.9)) ko(`[${tag}] terre ${m.nom || '(sans nom)'} ${m.aire} u² noyée dans ${o.nom || '(sans nom)'} : anneau d'eau rangé en continent ?`);
    }
  }
  // 2. un anneau d'eau doit tomber dans une terre (ou toucher sa côte pour la mer intérieure ouverte)
  for (const e of eaux) {
    const hote = terres.find((t) => t.aire > e.aire && part(e, t) > 0.3);
    if (!hote && e.type !== 'mer-interieure' && !e.note) ko(`[${tag}] ${e.type} ${e.aire} u² hors de toute terre`);
  }
  if (tag !== 'actuel' && eaux.length) ko(`[${tag}] les cartes d'ères ne portent pas d'eau`);
}
const actuel = doc.jeux.find((j) => j.era_id === null);
const iles = actuel.masses.filter((m) => m.niveau === 'continent' && Math.abs(m.aire - 104) <= 2 && Math.abs(m.points.reduce((s, p) => s + p[0], 0) / m.points.length + 218) < 6);
if (iles.length !== 1) ko('île de la mer intérieure d\'Ilthara (≈104 u²) introuvable');
const mer = actuel.masses.filter((m) => m.niveau === 'eau' && m.type === 'mer-interieure');
if (mer.length !== 1) ko('mer intérieure d\'Ilthara absente');
else if (!dedans([iles[0] ? iles[0].points[0][0] : 0, iles[0] ? iles[0].points[0][1] : 0], mer[0].points)) ko('l\'île ne tombe pas dans la mer intérieure (anneau mal recalé)');
console.log(erreurs ? `✘ ${erreurs} problème(s)` : `✔ contours sains : ${actuel.masses.filter((m) => m.niveau === 'continent').length} terres, ${actuel.masses.filter((m) => m.niveau === 'eau').length} anneaux d'eau`);
process.exit(erreurs ? 1 : 0);
