#!/usr/bin/env node
'use strict';
/*
 * scripts/lots-datation.js — Prépare les LOTS DE DATATION : ce qu'il reste à
 * dater dans le graphe, rangé par continent, avec tout le contexte utile.
 *
 * Sert de plan de travail à la passe de datation (agents de lecture du corpus
 * + moteur d'inférence). Écrit un JSON par continent dans un dossier de sortie.
 *
 * Rattachement d'un fait/d'une personne à un continent, par ordre de force :
 *   1. relation situe-dans / gouverne vers une polité située sur un continent ;
 *   2. nom d'une polité ou d'un lieu connu cité dans le libellé du fait ;
 *   3. sinon → lot « _sans-region ».
 *
 * Usage :  node scripts/lots-datation.js [dossier-de-sortie]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SORTIE = process.argv[2] || path.join(ROOT, 'data', 'lots-datation');
const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'kg-base.json'), 'utf8'));
const byId = {}; for (const e of base.entities) byId[e.id] = e;

// ── index géographique ────────────────────────────────────────────────────
const contDe = {};                       // entité → nom du continent
for (const r of base.relations) {
  if (r.rel_type !== 'situe-dans') continue;
  const c = byId[r.to_id];
  if (c && c.type === 'lieu' && c.data && c.data.echelle === 'continent') contDe[r.from_id] = c.name;
}
// propagation : ville → nation → continent
for (let passe = 0; passe < 3; passe++) {
  for (const r of base.relations) {
    if (r.rel_type !== 'situe-dans') continue;
    if (!contDe[r.from_id] && contDe[r.to_id]) contDe[r.from_id] = contDe[r.to_id];
  }
}
const gouverne = {};
for (const r of base.relations) if (r.rel_type === 'gouverne') gouverne[r.from_id] = r.to_id;

// noms de polités / lieux majeurs → continent, pour la reconnaissance textuelle
const nomVersCont = [];
for (const e of base.entities) {
  if (!contDe[e.id]) continue;
  if (!['entite-politique', 'lieu'].includes(e.type)) continue;
  if (e.name.length < 4) continue;
  nomVersCont.push({ nom: e.name, cont: contDe[e.id] });
}
nomVersCont.sort((a, b) => b.nom.length - a.nom.length);      // le plus spécifique gagne
const contParTexte = (txt) => {
  if (!txt) return null;
  for (const { nom, cont } of nomVersCont) if (txt.includes(nom)) return cont;
  return null;
};

function continentDe(entId, txt) {
  if (contDe[entId]) return contDe[entId];
  const p = gouverne[entId];
  if (p && contDe[p]) return contDe[p];
  return contParTexte(txt) || null;
}

// ── contexte relationnel d'une entité (ce qui permettra de déduire) ───────
const liens = {};
for (const r of base.relations) {
  (liens[r.from_id] = liens[r.from_id] || []).push({ sens: '→', rel: r.rel_type, autre: r.to_id });
  (liens[r.to_id] = liens[r.to_id] || []).push({ sens: '←', rel: r.rel_type, autre: r.from_id });
}
const UTILES = new Set(['parent-de', 'conjoint-de', 'fratrie-de', 'descend-de', 'succede-a',
  'gouverne', 'membre-de', 'fonde', 'apparait-dans', 'capitale-de']);
const contexte = (id) => (liens[id] || [])
  .filter((l) => UTILES.has(l.rel))
  .map((l) => `${l.sens} ${l.rel} ${byId[l.autre] ? byId[l.autre].name : l.autre}`)
  .slice(0, 12);

// dates déjà connues d'une entité (ancres pour l'inférence)
const datesDe = {};
for (const f of base.facts) {
  if (f.start_year == null) continue;
  for (const k of [f.subject_id, f.object_id]) {
    if (k) (datesDe[k] = datesDe[k] || []).push(`${f.fact_type} ${f.start_year}${f.end_year != null ? '→' + f.end_year : ''}`);
  }
}

// ── constitution des lots ────────────────────────────────────────────────
const lots = {};
const lot = (c) => (lots[c] = lots[c] || { continent: c, faits: [], personnes: [] });

for (const f of base.facts) {
  if (f.start_year != null) continue;
  const s = byId[f.subject_id];
  const txt = ((f.label || '') + ' ' + (f.detail || '')).trim();
  const c = continentDe(f.subject_id, txt + ' ' + (s ? s.name + ' ' + (s.summary || '') : '')) || '_sans-region';
  lot(c).faits.push({
    fact_id: f.id, type: f.fact_type,
    sujet: s ? s.name : null, sujet_id: f.subject_id,
    libelle: f.label || '', detail: f.detail || '',
    resume_sujet: s && s.summary ? s.summary.slice(0, 220) : null,
    contexte: s ? contexte(s.id) : [],
    dates_connues_du_sujet: datesDe[f.subject_id] || [],
  });
}

// personnes sans aucune date, mais reliées à quelque chose (donc situables)
for (const e of base.entities) {
  if (e.type !== 'personne' || datesDe[e.id]) continue;
  const ctx = contexte(e.id);
  if (!ctx.length) continue;                       // isolée : rien pour l'ancrer
  const c = continentDe(e.id, e.name + ' ' + (e.summary || '')) || '_sans-region';
  lot(c).personnes.push({
    entity_id: e.id, nom: e.name,
    resume: e.summary ? e.summary.slice(0, 260) : null,
    contexte: ctx,
    ancres: ctx.map((l) => { const m = l.match(/ (.+)$/); const o = m && base.entities.find((x) => x.name === m[1]); return o && datesDe[o.id] ? `${m[1]} : ${datesDe[o.id][0]}` : null; }).filter(Boolean),
  });
}

fs.mkdirSync(SORTIE, { recursive: true });
for (const f of fs.readdirSync(SORTIE)) if (f.endsWith('.json')) fs.unlinkSync(path.join(SORTIE, f));
const resume = [];
for (const [c, l] of Object.entries(lots).sort((a, b) => (b[1].faits.length + b[1].personnes.length) - (a[1].faits.length + a[1].personnes.length))) {
  const nom = c.replace(/[^\w-]/g, '_') + '.json';
  fs.writeFileSync(path.join(SORTIE, nom), JSON.stringify(l, null, 1));
  resume.push({ continent: c, faits: l.faits.length, personnes: l.personnes.length, fichier: nom });
}
fs.writeFileSync(path.join(SORTIE, '_resume.json'), JSON.stringify(resume, null, 1));

console.log(`lots écrits dans ${path.relative(ROOT, SORTIE)}/`);
console.log('continent'.padEnd(16), 'faits'.padStart(6), 'personnes'.padStart(10));
for (const r of resume) console.log('  ' + r.continent.padEnd(14), String(r.faits).padStart(6), String(r.personnes).padStart(10));
const tf = resume.reduce((s, r) => s + r.faits, 0), tp = resume.reduce((s, r) => s + r.personnes, 0);
console.log('  ' + 'TOTAL'.padEnd(14), String(tf).padStart(6), String(tp).padStart(10));
