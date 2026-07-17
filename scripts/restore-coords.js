#!/usr/bin/env node
'use strict';
/*
 * scripts/restore-coords.js — Restaure les coordonnées de carte des lieux.
 *
 * Au dédoublonnage, les lieux créés par les fiches Pays (sans coords) ont gagné
 * sur ceux de la sauvegarde carte (avec coords) : ~330 lieux ont perdu leur
 * position. Ce script recopie coord_x / coord_y (+ échelle si absente) depuis
 * local-db.backup-20260503.json dans data/kg-base.json — édition NATIVE de la
 * base (source de vérité), pas un re-seed. Idempotent.
 *
 * Usage :  node scripts/restore-coords.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE_PATH = path.join(ROOT, 'data', 'kg-base.json');
const base = JSON.parse(fs.readFileSync(BASE_PATH, 'utf8'));
const backup = JSON.parse(fs.readFileSync(path.join(ROOT, 'local-db.backup-20260503.json'), 'utf8'));

const norm = (s) => String(s == null ? '' : s)
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘]/g, "'").toLowerCase().replace(/\s+/g, ' ').trim();

const scaleOf = { capitalesElements: 'cite', citesElements: 'cite', villesElements: 'ville', villagesElements: 'bourg', regionElements: 'region' };
const src = {};
for (const p of (Array.isArray(backup) ? backup : Object.values(backup))) {
  if (!p || !p.name || p.coord_x == null || !scaleOf[p.storage]) continue;
  const k = norm(p.name);
  if (!src[k]) src[k] = { x: p.coord_x, y: p.coord_y, echelle: scaleOf[p.storage], capitale: p.storage === 'capitalesElements' };
}

let restaures = 0, dejaOk = 0, sansSource = 0;
for (const e of base.entities) {
  if (e.type !== 'lieu') continue;
  const d = e.data || {};
  if (d.coord_x != null) { dejaOk++; continue; }
  const s = src[norm(e.name)];
  if (!s) { sansSource++; continue; }
  e.data = { ...d, coord_x: s.x, coord_y: s.y };
  if (!e.data.echelle) e.data.echelle = s.echelle;
  if (s.capitale && e.data.capitale == null) e.data.capitale = true;
  restaures++;
}

console.log(`lieux avec coords déjà en place : ${dejaOk}`);
console.log(`coordonnées restaurées          : ${restaures}`);
console.log(`sans source carte (fiches only) : ${sansSource}`);
fs.writeFileSync(BASE_PATH, JSON.stringify(base, null, 1));
console.log('✔ data/kg-base.json mis à jour — pense à `npm run kg:db && npm run kg:index`');
