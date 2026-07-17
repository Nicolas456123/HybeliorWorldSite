#!/usr/bin/env node
'use strict';
/*
 * scripts/fix-geo-conflits.js — Corrige les conflits géographiques révélés par
 * la carte vivante (cas Folgrad), à partir des MARQUEURS de la carte d'origine
 * (local-db.backup-20260503.json : paysElements / continentsElements), qui sont
 * la référence géographique posée par l'auteur.
 *
 *  1. Importe les marqueurs : chaque nation/continent du graphe reçoit ses
 *     coordonnées officielles (data.coord_x/y) — ancres des sphères et libellés.
 *  2. Doublons de noms dans la sauvegarde (2×Kryndor, 2×Ackerna…) : la ville du
 *     graphe reprend l'entrée la plus proche du marqueur de SA nation (l'ancienne
 *     restauration prenait la première, parfois le mauvais homonyme).
 *  3. « No Man's Land » : les villes rattachées au No Man's Land d'Azoria mais
 *     posées à >2,5× plus près d'un autre No Man's Land sont re-rattachées à
 *     celui-ci (confusion des trois graphies par les agents d'extraction).
 *  4. Parcours de Sorin : une étape dont la ville est en conflit avec sa nation
 *     est ré-ancrée sur le marqueur de la nation (vérité des fiches).
 *  5. Les conflits NON tranchables (carte vs fiche : Folgrad, Windora…) sont
 *     listés dans data/geo-conflits.json pour arbitrage — rien n'est déplacé.
 *
 * Édition NATIVE de data/kg-base.json. Idempotent.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const b = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const backup = JSON.parse(fs.readFileSync(path.join(ROOT, 'local-db.backup-20260503.json'), 'utf8'));
const arr = Array.isArray(backup) ? backup : Object.values(backup);
const byId = {}; for (const e of b.entities) byId[e.id] = e;
const norm = (s) => String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘]/g, "'").toLowerCase().replace(/\s+/g, ' ').trim();

// ── marqueurs officiels ────────────────────────────────────────────────────
const marqueursPays = {}, marqueursCont = {}, entreesParNom = {};
for (const p of arr) {
  if (!p || !p.name || p.coord_x == null) continue;
  const k = norm(p.name);
  if (p.storage === 'paysElements') marqueursPays[k] = { x: +p.coord_x, y: +p.coord_y };
  if (p.storage === 'continentsElements') marqueursCont[k] = { x: +p.coord_x, y: +p.coord_y };
  if (['capitalesElements', 'citesElements', 'villesElements', 'villagesElements', 'regionElements'].includes(p.storage)) {
    (entreesParNom[k] = entreesParNom[k] || []).push({ x: +p.coord_x, y: +p.coord_y, storage: p.storage });
  }
}

// 1. ancres des nations et continents
let nAncres = 0;
for (const e of b.entities) {
  if (e.type === 'entite-politique' && marqueursPays[norm(e.name)]) {
    const m = marqueursPays[norm(e.name)];
    e.data = { ...(e.data || {}), coord_x: m.x, coord_y: m.y }; nAncres++;
  }
  if (e.type === 'lieu' && e.data && e.data.echelle === 'continent' && marqueursCont[norm(e.name)]) {
    const m = marqueursCont[norm(e.name)];
    e.data = { ...e.data, coord_x: m.x, coord_y: m.y }; nAncres++;
  }
}

// index : ville -> nation (situe-dans)
const nationDe = {};
for (const r of b.relations) {
  if (r.rel_type !== 'situe-dans') continue;
  const v = byId[r.from_id], n = byId[r.to_id];
  if (v && n && v.type === 'lieu' && n.type === 'entite-politique') nationDe[v.id] = { rel: r, nation: n };
}

// 2. doublons : re-résoudre la bonne entrée par proximité au marqueur du pays
let nDoublons = 0;
for (const e of b.entities) {
  if (e.type !== 'lieu' || !e.data || e.data.coord_x == null) continue;
  const entrees = entreesParNom[norm(e.name)];
  if (!entrees || entrees.length < 2) continue;
  const nat = nationDe[e.id] && marqueursPays[norm(nationDe[e.id].nation.name)];
  if (!nat) continue;
  let best = null, dBest = 1e15;
  for (const en of entrees) { const d = Math.hypot(en.x - nat.x, en.y - nat.y); if (d < dBest) { dBest = d; best = en; } }
  if (best && (best.x !== +e.data.coord_x || best.y !== +e.data.coord_y)) {
    e.data.coord_x = best.x; e.data.coord_y = best.y; nDoublons++;
    console.log(`  doublon résolu : ${e.name} → entrée la plus proche de ${nationDe[e.id].nation.name}`);
  }
}

// 3. No Man's Land : re-rattacher au plus proche quand l'évidence est écrasante
const nmls = b.entities.filter((e) => e.type === 'entite-politique' && /no man'?s land/i.test(e.name) && marqueursPays[norm(e.name)]);
let nReattach = 0;
for (const [vid, info] of Object.entries(nationDe)) {
  if (!/no man'?s land/i.test(info.nation.name)) continue;
  const v = byId[vid];
  if (!v.data || v.data.coord_x == null) continue;
  const dActuel = marqueursPays[norm(info.nation.name)]
    ? Math.hypot(+v.data.coord_x - marqueursPays[norm(info.nation.name)].x, +v.data.coord_y - marqueursPays[norm(info.nation.name)].y) : 1e15;
  let best = null, dBest = 1e15;
  for (const n of nmls) {
    const m = marqueursPays[norm(n.name)];
    const d = Math.hypot(+v.data.coord_x - m.x, +v.data.coord_y - m.y);
    if (d < dBest) { dBest = d; best = n; }
  }
  if (best && best.id !== info.nation.id && dActuel > dBest * 2.5 && dActuel > 300) {
    info.rel.to_id = best.id; nReattach++;
    console.log(`  re-rattaché : ${v.name} — ${info.nation.name} → ${best.name} (d ${Math.round(dActuel)} → ${Math.round(dBest)})`);
  }
}

// 4 & 5. conflits restants (ville loin de sa nation) : arbitrage + Sorin
const conflits = [];
for (const [vid, info] of Object.entries(nationDe)) {
  const v = byId[vid];
  if (!v.data || v.data.coord_x == null) continue;
  const m = marqueursPays[norm(info.nation.name)];
  if (!m) continue;
  const d = Math.hypot(+v.data.coord_x - m.x, +v.data.coord_y - m.y);
  let plusProche = null, dMin = 1e15;
  for (const [k, mp] of Object.entries(marqueursPays)) { const dd = Math.hypot(+v.data.coord_x - mp.x, +v.data.coord_y - mp.y); if (dd < dMin) { dMin = dd; plusProche = k; } }
  if (d > 140 && d > dMin * 2.5) conflits.push({ lieu_id: vid, lieu: v.name, nation_fiche: info.nation.name, d_nation: Math.round(d), pose_pres_de: plusProche, d_reel: Math.round(dMin) });
}
fs.writeFileSync(path.join(ROOT, 'data', 'geo-conflits.json'), JSON.stringify({
  _note: 'Villes dont la position (carte de l\'auteur) contredit le rattachement (fiches). À arbitrer : corriger la position sur la carte OU le rattachement dans la fiche. Généré par scripts/fix-geo-conflits.js.',
  conflits,
}, null, 2) + '\n');

// Sorin : ré-ancrer les étapes en conflit sur le marqueur de la nation des fiches
const sorin = byId['per-0153'];
let nSorin = 0;
if (sorin && sorin.data && Array.isArray(sorin.data.parcours)) {
  const conflitIds = new Set(conflits.map((c) => c.lieu_id));
  for (const p of sorin.data.parcours) {
    if (!p.lieu_id || !conflitIds.has(p.lieu_id)) continue;
    const nat = nationDe[p.lieu_id];
    const m = nat && marqueursPays[norm(nat.nation.name)];
    if (!m) continue;
    p.x = m.x; p.y = m.y; p.lieu = p.lieu.split(' (')[0] + ' (' + nat.nation.name + ' — position du pays, ville en conflit)';
    delete p.lieu_id; // ne plus pointer la position conflictuelle
    nSorin++;
    console.log(`  Sorin : étape ${p.etape} ré-ancrée sur le marqueur de ${nat.nation.name}`);
  }
}

fs.writeFileSync(BASE, JSON.stringify(b, null, 1));
console.log(`\n✔ ancres pays/continents posées : ${nAncres} | doublons corrigés : ${nDoublons} | re-rattachés : ${nReattach}`);
console.log(`  conflits à arbitrer : ${conflits.length} → data/geo-conflits.json | étapes Sorin ré-ancrées : ${nSorin}`);
