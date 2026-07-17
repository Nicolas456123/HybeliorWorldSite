#!/usr/bin/env node
'use strict';
// Agrège les lots d'extraction (scratchpad/lore/*.json) en data/lore-extracted.json.
//
// Règles :
//   • Lots « dirigeants » (rulers-*) : filtre de datation. Les fiches Histoires
//     mélangent trois calendriers (ap.A absolu, du Sillage 0–255, « an X » local
//     de Galenor). On ne garde une année de règne/événement que si elle est
//     clairement en temps profond absolu (|année| > 300) ; sinon on la met à null
//     et on préserve la date locale dans le label. Évite de placer un roi actuel
//     ~10 000 ans trop tôt et les incohérences « règne avant naissance ».
//   • Dédup entités par (type, nom) — première occurrence gagne. L'ordre place
//     les événements de la chronologie avant les doublons régionaux des rois,
//     pour que la version datée canonique l'emporte (ex. « L'Arrachement »).
//   • Dédup relations par (rel_type, from, to) et faits par (type, sujet, année,
//     label).
// Sortie : rapport des collisions inter-lots (utile pour le doc d'incohérences).

const fs = require('fs');
const path = require('path');

const LORE = path.join(__dirname, '..', '..');
const DIR = process.env.LORE_DIR ||
  '/tmp/claude-0/-home-user-HybeliorWorldSite/7accd542-73e3-5436-b3c2-572673da0020/scratchpad/lore';
const OUT = path.join(__dirname, '..', 'data', 'lore-extracted.json');

// Ordre de fusion : événements/chronologie avant les lots de rois.
const ORDER = [
  'concepts', 'religions', 'lineages', 'characters', 'divinities',
  'events', 'chronologie', 'vies', 'objets',
  'rulers-A', 'rulers-B', 'rulers-C', 'rulers-D',
];
// Lots à dater avec prudence : sources narratives (fiches Histoires, Pays,
// Chroniques, romans) où trois calendriers se mêlent (ap.A / du Sillage /
// « an X » local). On n'y garde une année que si elle est clairement en temps
// profond absolu (|an| > 300) ; sinon null + date préservée dans le libellé.
// Les lots à datation canonique (chronologie, events, vies) en sont exemptés.
const NARRATIVE_PREFIXES = ['rulers', 'pays', 'chroniques', 'romans', 'histoires', 'gdd-monde'];
const needsDateFilter = (name) => NARRATIVE_PREFIXES.some((p) => name === p || name.startsWith(p + '-'));
const DEEP_TIME = 300; // |année| > 300 ⇒ datation absolue conservée

// Découverte : tous les *.json du dossier (hors artefacts), triés selon ORDER
// puis alphabétiquement pour les nouveaux lots. L'ordre place les sources
// datées canoniques avant les doublons narratifs (la version datée gagne au dédup).
const DENYLIST = new Set(['lore-extracted', '.lore-aggregate-report']);
const discovered = fs.readdirSync(DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .filter((n) => !DENYLIST.has(n));
const rank = (n) => { const i = ORDER.indexOf(n); return i === -1 ? ORDER.length : i; };
const BATCHES = discovered.sort((a, b) => (rank(a) - rank(b)) || a.localeCompare(b));

const norm = (s) => String(s == null ? '' : s).replace(/[’‘]/g, "'").trim();
const eKey = (e) => `${e.type}|${norm(e.name)}`;
const rKey = (r) => `${r.rel_type}|${norm(r.from)}|${norm(r.to)}`;
const fKey = (f) => `${f.fact_type}|${norm(f.subject)}|${f.start_year ?? ''}|${norm(f.label)}`;

const entities = [];
const relations = [];
const facts = [];
const eSeen = new Map();   // eKey -> batch d'origine
const rSeen = new Set();
const fSeen = new Set();

const report = { batches: {}, entityCollisions: [], orphanEvents: [], dateFiltered: 0, relDup: 0, factDup: 0 };

for (const name of BATCHES) {
  const file = path.join(DIR, `${name}.json`);
  if (!fs.existsSync(file)) { report.batches[name] = 'ABSENT'; continue; }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const isRuler = needsDateFilter(name);
  let ne = 0, nr = 0, nf = 0;

  for (const e of (data.entities || [])) {
    const k = eKey(e);
    if (eSeen.has(k)) {
      report.entityCollisions.push({ key: k, kept: eSeen.get(k), dropped: name });
      continue;
    }
    eSeen.set(k, name);
    entities.push({ type: e.type, name: e.name, summary: e.summary || null, data: e.data || null });
    ne++;
  }

  for (const r of (data.relations || [])) {
    const k = rKey(r);
    if (rSeen.has(k)) { report.relDup++; continue; }
    rSeen.add(k);
    relations.push({ rel_type: r.rel_type, from: r.from, to: r.to });
    nr++;
  }

  for (const f of (data.facts || [])) {
    const fact = {
      fact_type: f.fact_type,
      subject: f.subject,
      ...(f.object ? { object: f.object } : {}),
      start_year: f.start_year === undefined ? null : f.start_year,
      end_year: f.end_year === undefined ? null : f.end_year,
      circa: !!f.circa,
      label: f.label || null,
    };
    if (isRuler) {
      // Filtre de datation : ne garder que le temps profond absolu.
      if (fact.start_year != null && Math.abs(fact.start_year) <= DEEP_TIME) { fact.start_year = null; report.dateFiltered++; }
      if (fact.end_year != null && Math.abs(fact.end_year) <= DEEP_TIME) { fact.end_year = null; }
    }
    const k = fKey(fact);
    if (fSeen.has(k)) { report.factDup++; continue; }
    fSeen.add(k);
    facts.push(fact);
    nf++;
  }
  report.batches[name] = { entities: ne, relations: nr, facts: nf };
}

// Récupération des événements orphelins : un fait « evenement/bataille » dont le
// sujet ne correspond à aucune entité (les fiches nomment parfois le fait un peu
// autrement que l'entité). On rattache au plus proche événement existant (l'un
// contient l'autre), sinon on crée l'entité manquante — aucun événement daté
// n'est perdu en silence.
const evNames = entities.filter((e) => e.type === 'evenement').map((e) => norm(e.name));
const allNames = new Set(entities.map((e) => norm(e.name)));
for (const f of facts) {
  if (f.fact_type !== 'evenement' && f.fact_type !== 'bataille') continue;
  const s = norm(f.subject);
  if (allNames.has(s)) continue;
  // Rattachement par inclusion (le plus court des deux fait > 12 caractères).
  let match = null;
  for (const n of evNames) {
    const short = n.length < s.length ? n : s;
    if (short.length > 12 && (n.includes(s) || s.includes(n))) { match = n; break; }
  }
  if (match) {
    const ent = entities.find((e) => e.type === 'evenement' && norm(e.name) === match);
    report.orphanEvents.push({ subject: f.subject, resolvedTo: ent.name });
    f.subject = ent.name;
  } else {
    entities.push({ type: 'evenement', name: f.subject, summary: f.label || null, data: null });
    allNames.add(s); evNames.push(s);
    report.orphanEvents.push({ subject: f.subject, resolvedTo: '(créé)' });
  }
}

const out = {
  _meta: {
    note: 'Agrégé depuis les lots d\'extraction du corpus (scripts/aggregate-lore.js). ' +
      'Ne pas éditer à la main — régénérer via `node scripts/aggregate-lore.js`.',
    order: BATCHES,
    dateFilterDeepTimeThreshold: DEEP_TIME,
    totals: { entities: entities.length, relations: relations.length, facts: facts.length },
  },
  entities, relations, facts,
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');

console.log('== Agrégation lore ==');
for (const [b, v] of Object.entries(report.batches)) console.log(' ', b.padEnd(12), typeof v === 'string' ? v : `e=${v.entities} r=${v.relations} f=${v.facts}`);
console.log('Totaux    :', out._meta.totals);
console.log('Dates filtrées (rois, |an|<=300 -> null):', report.dateFiltered);
console.log('Relations dupliquées ignorées:', report.relDup, '| Faits dupliqués ignorés:', report.factDup);
if (report.orphanEvents.length) {
  console.log('Événements orphelins récupérés :', report.orphanEvents.length);
  for (const o of report.orphanEvents) console.log('    "' + o.subject + '" ->', o.resolvedTo);
}
if (report.entityCollisions.length) {
  console.log('Collisions entités (type|nom présent dans plusieurs lots) :', report.entityCollisions.length);
  for (const c of report.entityCollisions) console.log('   ', c.key, `— gardé:${c.kept} / ignoré:${c.dropped}`);
}
fs.writeFileSync(path.join(__dirname, '..', 'data', '.lore-aggregate-report.json'), JSON.stringify(report, null, 2));
