#!/usr/bin/env node
'use strict';
/*
 * scripts/kg-query.js — Interroge le graphe SANS le parcourir entièrement.
 *
 * Charge data/kg-base.json ⊕ overlay local (local-kg-overlay.json s'il existe),
 * puis rend une TRANCHE ciblée — pensé pour qu'une IA/un agent récupère juste
 * ce qu'il faut au lieu de lire toute la base.
 *
 * Usage :
 *   node scripts/kg-query.js search "<terme>" [--type <type>] [--limit <n>]
 *   node scripts/kg-query.js dossier <id|nom>        # entité + faits + relations + alias
 *   node scripts/kg-query.js arbre <id|nom>          # arbre généalogique
 *   node scripts/kg-query.js dirigeants <id|nom>     # règnes d'une polité
 *   node scripts/kg-query.js chronologie [--type t] [--from y] [--to y]
 *   node scripts/kg-query.js voisins <id|nom> [--limit n]   # entités directement reliées
 *   node scripts/kg-query.js stats
 * Options globales : --pretty (JSON indenté), --json (par défaut).
 */

const fs = require('fs');
const path = require('path');
const kg = require('../lib/kg-core.js');
const store = require('../lib/kg-store-sqlite.js');

const ROOT = path.join(__dirname, '..');
const USE_DB = store.available(); // vraie base SQLite dispo → source de vérité
const BASE = USE_DB ? null : JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'kg-base.json'), 'utf8'));

// ── overlay local (dev) : miroir du magasin Turso, s'il existe ────────────
function loadOverlay() {
  try {
    const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'local-kg-overlay.json'), 'utf8'));
    const o = { entities: [], facts: [], relations: [], aliases: [], readings: [], deletes: s.deletes || {} };
    for (const kind of Object.keys(s.records || {})) o[kind] = Object.values(s.records[kind]);
    return o;
  } catch { return { entities: [], facts: [], relations: [], aliases: [], readings: [], deletes: {} }; }
}

const EMPTY = { entities: [], facts: [], relations: [], aliases: [], readings: [], deletes: {} };
const g = USE_DB ? kg.mergeGraph(store.loadGraph(), EMPTY) : kg.mergeGraph(BASE, loadOverlay());

// ── résolution nom → id (accents / casse / apostrophes normalisés) ────────
const norm = (s) => String(s == null ? '' : s)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')  // enlève les accents
  .replace(/[’‘]/g, "'").toLowerCase().trim();

const ID_RE = /^(per|div|lig|lie|pol|evt|con|rel|esp|obj|ter|src|que|oeu|ere)-/;

// Index en mémoire (nom + alias → entité) pour la recherche.
const rows = g.entities.map((e) => ({ e, nname: norm(e.name), nsum: norm(e.summary) }));
const aliByEnt = {};
for (const a of g.aliases) (aliByEnt[a.entity_id] = aliByEnt[a.entity_id] || []).push(a.value);

function search(term, { type, limit = 10 } = {}) {
  const q = norm(term);
  const out = [];
  for (const { e, nname, nsum } of rows) {
    if (type && e.type !== type) continue;
    const alis = (aliByEnt[e.id] || []).map(norm);
    let score = 0;
    if (nname === q) score = 100;
    else if (nname.startsWith(q)) score = 80;
    else if (nname.includes(q)) score = 60;
    else if (alis.some((a) => a === q)) score = 70;
    else if (alis.some((a) => a.includes(q))) score = 50;
    else if (nsum.includes(q)) score = 30;
    if (score) out.push({ score, id: e.id, type: e.type, name: e.name, summary: e.summary || null });
  }
  out.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return out.slice(0, limit).map((r) => ({ id: r.id, type: r.type, name: r.name, summary: r.summary }));
}

function resolve(arg) {
  if (!arg) return null;
  if (ID_RE.test(arg) && g.byId.has(arg)) return arg;
  const hits = search(arg, { limit: 1 });
  return hits.length ? hits[0].id : null;
}

// ── parsing des options ───────────────────────────────────────────────────
const argv = process.argv.slice(2);
const cmd = argv[0];
const opts = {};
const positional = [];
for (let i = 1; i < argv.length; i++) {
  if (argv[i].startsWith('--')) {
    const k = argv[i].slice(2);
    const v = (i + 1 < argv.length && !argv[i + 1].startsWith('--')) ? argv[++i] : true;
    opts[k] = v;
  } else positional.push(argv[i]);
}
const term = positional.join(' ');
const pretty = !!opts.pretty;
const emit = (obj) => process.stdout.write(JSON.stringify(obj, null, pretty ? 2 : 0) + '\n');
const fail = (msg) => { process.stderr.write(msg + '\n'); process.exit(1); };

switch (cmd) {
  case 'search': {
    if (!term) fail('usage: kg-query search "<terme>" [--type t] [--limit n]');
    // Vraie base dispo → recherche plein-texte FTS5 (nom+alias+résumé+body, classée bm25) ;
    // sinon repli sur la recherche en mémoire (nom/alias/résumé).
    const results = USE_DB
      ? store.searchFTS(term, { type: opts.type, limit: +opts.limit || 10 })
      : search(term, { type: opts.type, limit: +opts.limit || 10 });
    emit({ query: term, source: USE_DB ? 'sqlite-fts' : 'memory', results });
    break;
  }
  case 'dossier': case 'entity': {
    const id = resolve(term);
    if (!id) fail(`introuvable : "${term}"`);
    emit(kg.getDossier(g, id));
    break;
  }
  case 'arbre': {
    const id = resolve(term);
    if (!id) fail(`introuvable : "${term}"`);
    emit(kg.getArbre(g, id));
    break;
  }
  case 'dirigeants': {
    const id = resolve(term);
    if (!id) fail(`introuvable : "${term}"`);
    emit(kg.getDirigeants(g, id));
    break;
  }
  case 'voisins': {
    const id = resolve(term);
    if (!id) fail(`introuvable : "${term}"`);
    const d = kg.getDossier(g, id);
    const lim = +opts.limit || 25;
    emit({
      id, name: d.entity.name,
      voisins: d.relations.slice(0, lim).map((r) => ({ rel: r.label, direction: r.direction, id: r.otherId, name: r.otherName })),
    });
    break;
  }
  case 'chronologie':
    emit(kg.readAction(g, 'chronologie', { fact_type: opts.type, from_year: opts.from ? +opts.from : undefined, to_year: opts.to ? +opts.to : undefined }));
    break;
  case 'stats':
    emit(kg.getStats(g));
    break;
  default:
    fail('commandes : search | dossier | arbre | dirigeants | voisins | chronologie | stats\n' +
      'ex : node scripts/kg-query.js dossier "Sorin Valthen" --pretty');
}
