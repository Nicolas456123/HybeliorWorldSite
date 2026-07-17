#!/usr/bin/env node
'use strict';
/*
 * scripts/absorb-docs.js — Verse la prose COMPLÈTE des fiches dédiées dans le
 * champ `body` des entités du graphe. Édition NATIVE du graphe (data/kg-base.json),
 * PAS un re-seed : le graphe devient autosuffisant (chaque entité porte tout son
 * contenu, plus seulement un résumé) pour qu'à terme les Docs disparaissent.
 *
 * Rattachement fiche → entité par NOM (nom de fichier / titre H1 / alias), avec un
 * cas spécial pour les Ères (mot-clé). Plusieurs fiches sur une même entité sont
 * concaténées. Idempotent : réexécuter remplace le body absorbé (ne cumule pas).
 *
 * Usage :  node scripts/absorb-docs.js [--dry]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE_PATH = path.join(ROOT, 'data', 'kg-base.json');
const base = JSON.parse(fs.readFileSync(BASE_PATH, 'utf8'));
const DRY = process.argv.includes('--dry');

const norm = (s) => String(s == null ? '' : s)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’‘]/g, "'").toLowerCase().replace(/\s+/g, ' ').trim();

const byName = {}; for (const e of base.entities) byName[norm(e.name)] = e;
const byId = {}; for (const e of base.entities) byId[e.id] = e;
const aliToId = {}; for (const a of base.aliases || []) if (!aliToId[norm(a.value)]) aliToId[norm(a.value)] = a.entity_id;
const eres = base.entities.filter((e) => e.type === 'ere');

function resolveByName(name) {
  const n = norm(name);
  if (byName[n]) return byName[n];
  if (aliToId[n]) return byId[aliToId[n]];
  return null;
}
// Ères : « Era 4 - L'Arrachement » → l'entité ère dont le nom partage un mot distinctif.
function resolveEra(fileStem) {
  const kw = fileStem.replace(/^Era\s+\w+\s*[-—:]\s*/i, '').trim();
  const nkw = norm(kw);
  if (!nkw) return null;
  return eres.find((e) => norm(e.name).includes(nkw) || nkw.includes(norm(e.name).replace(/^ere\s+\w+\s*[-—:]\s*/i, '').trim())) || null;
}

function stripFrontmatter(md) {
  return md.replace(/^﻿?---\n[\s\S]*?\n---\n?/, '').trim();
}

function walk(dir) {
  let out = [];
  let entries; try { entries = fs.readdirSync(dir); } catch { return out; }
  for (const f of entries) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) out = out.concat(walk(p));
    else if (f.endsWith('.md')) out.push(p);
  }
  return out;
}

// Racines par priorité (la première trouvée donne le corps principal ; les suivantes s'ajoutent).
const ROOTS = [
  'Docs/Lore/Pays', 'Docs/Lore/Religions', 'Docs/Lore/Histoires',
  'Docs/GDD/02 - Monde/Continents', 'Docs/Lore/Chronologie',
];
const files = ROOTS.flatMap((r) => walk(path.join(ROOT, r)));

const perEntity = new Map(); // id -> [{ rel, content }]
let matched = 0; const unmatched = [];

for (const f of files) {
  const stem = path.basename(f, '.md');
  const raw = fs.readFileSync(f, 'utf8');
  const h1 = (raw.match(/^#\s+(.+)$/m) || [])[1] || '';
  const cands = [stem.split(/[—\-–:]/)[0].trim(), h1.split(/[—\-–:]/)[0].trim(), stem].filter(Boolean);
  let ent = null;
  for (const c of cands) { ent = resolveByName(c); if (ent) break; }
  if (!ent && /^Era\s/i.test(stem)) ent = resolveEra(stem);
  if (!ent) { unmatched.push(path.relative(ROOT, f)); continue; }
  matched++;
  const rel = path.relative(ROOT, f);
  if (!perEntity.has(ent.id)) perEntity.set(ent.id, []);
  perEntity.get(ent.id).push({ rel, content: stripFrontmatter(raw) });
}

// Construit le body : concaténation, avec un en-tête de provenance si plusieurs fiches.
let bodiesSet = 0, chars = 0;
for (const [id, parts] of perEntity) {
  const ent = byId[id];
  const body = parts.length === 1
    ? parts[0].content
    : parts.map((p) => `<!-- source: ${p.rel} -->\n\n${p.content}`).join('\n\n---\n\n');
  chars += body.length;
  if (!DRY) ent.body = body;
  bodiesSet++;
}

console.log(`Fiches scannées : ${files.length} | rattachées : ${matched} | entités enrichies (body) : ${bodiesSet}`);
console.log(`Volume de prose absorbée : ${Math.round(chars / 1024)} Ko`);
if (unmatched.length) {
  console.log(`Non rattachées (${unmatched.length}, méta/index — laissées de côté) :`);
  for (const u of unmatched) console.log('   ', u);
}

if (DRY) { console.log('\n(dry-run — rien écrit)'); process.exit(0); }
fs.writeFileSync(BASE_PATH, JSON.stringify(base, null, 1));
const mb = (fs.statSync(BASE_PATH).size / 1048576).toFixed(2);
console.log(`\n✔ data/kg-base.json mis à jour (${mb} Mo). Régénère l'index : npm run kg:index`);
