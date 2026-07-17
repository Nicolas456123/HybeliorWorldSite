#!/usr/bin/env node
'use strict';
/*
 * scripts/gen-kg-search-index.js — Index de recherche compact du graphe.
 *
 * Lit data/kg-base.json et écrit data/kg-search-index.json : une entrée par
 * entité { id, type, name, aliases?, echelle?, summary } avec un résumé tronqué.
 * Objectif : un fichier léger, chargé en un éclair, pour résoudre un nom/mot-clé
 * → id sans parcourir toute la base (mirroir de Docs/_search-index.json côté site).
 * Régénéré avec la base (`npm run kg:build`).
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'data', 'kg-base.json');
const OUT = path.join(__dirname, '..', 'data', 'kg-search-index.json');

const base = JSON.parse(fs.readFileSync(BASE, 'utf8'));

// Alias par entité (noms historiques, variantes, désambiguïsation).
const aliByEnt = {};
for (const a of base.aliases || []) {
  (aliByEnt[a.entity_id] = aliByEnt[a.entity_id] || []).push(a.value);
}

const snippet = (s) => (s ? String(s).replace(/\s+/g, ' ').trim().slice(0, 160) : '');

const index = base.entities.map((e) => {
  const row = { id: e.id, type: e.type, name: e.name };
  if (aliByEnt[e.id]) row.aliases = aliByEnt[e.id];
  if (e.data && e.data.echelle) row.echelle = e.data.echelle;
  const sum = snippet(e.summary);
  if (sum) row.summary = sum;
  return row;
});

// Format compact (pas d'indentation) — c'est un artefact de recherche, pas à lire à la main.
fs.writeFileSync(OUT, JSON.stringify(index) + '\n');

const kb = Math.round(fs.statSync(OUT).size / 1024);
const byType = index.reduce((a, r) => ((a[r.type] = (a[r.type] || 0) + 1), a), {});
console.log(`✔ Index de recherche → ${OUT}`);
console.log(`  ${index.length} entités, ${kb} Ko | types : ${Object.entries(byType).map(([t, n]) => `${t}:${n}`).join(' ')}`);
