#!/usr/bin/env node
'use strict';
/*
 * scripts/diagnostic-pays.js — Mesure les surfaces de pays contre les FICHES.
 *
 * Chaque surface (monde-contours.json, jeu 0, niveau « pays ») est confrontée
 * aux lieux positionnés qu'elle contient, et à la nation que l'Atrium leur
 * donne (remontée de `situe-dans` — qui suit les fiches depuis le 2026-09-22) :
 *   justes    lieux dans la surface et de cette nation ;
 *   intrus    lieux dans la surface mais d'une autre nation ;
 *   échappés  lieux de cette nation mais hors de sa surface.
 *
 * Usage :  node scripts/diagnostic-pays.js [contours.json]
 * Module : { charger, score } — réutilisés par scripts/assembler-pays.js.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const dedans = (x, y, p) => {
  let o = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [a, b] = p[i], [c, d] = p[j];
    if ((b > y) !== (d > y) && x < ((c - a) * (y - b)) / (d - b) + a) o = !o;
  }
  return o;
};
const cle = (s) => String(s).replace(/\s*\(.*\)$/, '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

function charger() {
  const kg = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'kg-base.json'), 'utf8'));
  const byId = new Map(kg.entities.map((e) => [e.id, e]));
  const nation = (id, vus = new Set()) => {
    if (vus.has(id)) return null; vus.add(id);
    const e = byId.get(id);
    if (!e) return null;
    if (e.type === 'entite-politique') return e;
    const r = kg.relations.find((x) => x.from_id === id && x.rel_type === 'situe-dans');
    return r ? nation(r.to_id, vus) : null;
  };
  return kg.entities
    .filter((e) => e.type === 'lieu' && e.data && e.data.coord_x != null
      && !['continent', 'region', 'nation'].includes(e.data.echelle))
    .map((l) => ({ nom: l.name, x: +l.data.coord_x, y: +l.data.coord_y, nation: nation(l.id) }))
    .filter((l) => l.nation);
}

function score(lieux, nomPays, masse) {
  const s = { justes: 0, intrus: 0, echappes: 0, parIntrus: {} };
  for (const l of lieux) {
    const ins = !!masse && dedans(l.x, l.y, masse.points);
    const sien = cle(l.nation.name) === cle(nomPays);
    if (ins && sien) s.justes++;
    else if (ins) { s.intrus++; s.parIntrus[l.nation.name] = (s.parIntrus[l.nation.name] || 0) + 1; }
    else if (sien) s.echappes++;
  }
  return s;
}

if (require.main === module) {
  const fichier = process.argv[2] || path.join(ROOT, 'data', 'monde-contours.json');
  const doc = JSON.parse(fs.readFileSync(fichier, 'utf8'));
  const pays = doc.jeux.find((j) => j.era_id === null).masses.filter((m) => m.niveau === 'pays');
  const lieux = charger();
  const lignes = pays.map((m) => ({ nom: m.nom, ...score(lieux, m.nom, m) }))
    .sort((a, b) => (b.intrus + b.echappes) - (a.intrus + a.echappes));
  let t = { justes: 0, intrus: 0, echappes: 0 };
  console.log('  pays                    justes  intrus  échappés   intrus principaux');
  for (const l of lignes) {
    t.justes += l.justes; t.intrus += l.intrus; t.echappes += l.echappes;
    const top = Object.entries(l.parIntrus).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([n, c]) => n + ' ' + c).join(', ');
    const f = (l.intrus + l.echappes) >= 5 ? '⚠' : (l.intrus + l.echappes) ? '·' : '✔';
    console.log(' ' + f + ' ' + l.nom.padEnd(24) + String(l.justes).padStart(6) + String(l.intrus).padStart(8) + String(l.echappes).padStart(10) + '   ' + top);
  }
  const hors = lieux.filter((l) => !pays.some((m) => dedans(l.x, l.y, m.points))).length;
  console.log(`\n  TOTAL  justes ${t.justes} · intrus ${t.intrus} · échappés ${t.echappes} · hors de tout pays ${hors}`);
}

module.exports = { charger, score };
