#!/usr/bin/env node
'use strict';
/*
 * scripts/dater-faits.js — RÉCUPÈRE les dates perdues des faits du graphe.
 *
 * Le problème. À l'import du corpus, le pipeline appliquait un garde-fou :
 * il ne gardait une année que si elle était clairement en temps profond
 * (|an| > 300), parce que les fiches mêlent trois décomptes sans les taguer.
 * Toutes les dates « petites » (règnes, naissances, morts régionales) ont
 * donc été mises à null — la date restant seulement dans le libellé.
 * Résultat : 762 faits sur 1097 sans année, 0 règne daté, aucune succession
 * ordonnable.
 *
 * La clé (canon, « Chronologie - Index.md » et le registre §1) :
 *   An 251 du Sillage = ~10 200 ap.A  →  décalage +9 949.
 * Et les décomptes régionaux partagent cette même époque : les fiches de
 * Galenor, d'Azoria, d'Ilthara… situent toutes le présent narratif en
 * « l'an 251 » (« vingt-neuf ans en cette an 251 », « soixante ans en l'an
 * 251 »). Vérifié sur 10 continents.
 *
 * Ce que fait le script : relire label/detail de chaque fait non daté,
 * y reconnaître les dates, les convertir en années absolues, et TAGUER le
 * calendrier employé dans fact.data.calendrier — pour que la conversion
 * soit auditable et réversible :
 *   - 'absolu'   : « an 9 605 ap.A », ou |an| > 300 (temps profond explicite)
 *   - 'sillage'  : « an 89 du Sillage » (mention explicite)
 *   - 'regional' : petite année sans mention de calendrier (même époque)
 *   - 'relatif'  : « ~4 siècles avant le présent » (présent = 10 200 ap.A)
 *
 * Usage :
 *   node scripts/dater-faits.js --essai   # revue à blanc, n'écrit rien
 *   node scripts/dater-faits.js           # applique et réécrit kg-base.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const ESSAI = process.argv.includes('--essai');
const { lireDates } = require('../lib/calendrier');
// ── passe 2 : la prose du sujet (résumé, corps de fiche) ──────────────────
// Le libellé d'un fait est souvent muet alors que le résumé de l'entité porte
// la date (« désignée Lunarch à l'éclipse de l'an 244 … jusqu'à sa mort en
// 252 »). On ne lit que les phrases dont le VERBE correspond au type du fait,
// pour ne pas coller à un règne la date d'une bataille voisine.
const VERBES = {
  mort: /mor(?:t|te)\b|meur[t]\b|décèd|s'éteint|tuée?\b|assassinée?\b|périt\b/i,
  naissance: /née?\b|naît\b|naissance\b|vient au monde/i,
  regne: /règn|régna|désignée?\b|élue?\b|couronnée?\b|investie?\b|accède\b|monte sur|en charge\b|gouverne\b|dirige\b|prend la tête/i,
  fondation: /fond(?:e|é|ée|ation)\b|institu|créée?\b|établi/i,
  chute: /chute\b|tombe\b|s'effondre|prise de\b|détruit|renversé/i,
  bataille: /bataille\b|combat\b|affront|siège\b|assaut\b|guerre\b/i,
  couronnement: /couronn|sacre\b|intronis/i,
  traite: /traité\b|accord\b|pacte\b|alliance signée/i,
  evenement: /./,
  autre: /./,
};
const phrases = (t) => (t || '').split(/(?<=[.!?;])\s+|\n+/).filter((p) => p.length > 8);

// Les faits ponctuels ne prennent pas de fin : une mort n'a pas de durée.
const PONCTUEL = new Set(['mort', 'naissance', 'couronnement', 'bataille', 'chute', 'traite']);

function depuisProse(f, sujet) {
  if (!sujet || !sujet.summary) return null;
  const verbe = VERBES[f.fact_type] || /./;
  // UNIQUEMENT le résumé : il décrit CETTE entité. Le corps d'une fiche est
  // un texte de nation qui charrie des dizaines de dates étrangères au fait
  // (un tableau de population, le passage d'un voyageur…) : les motifs y
  // produisent des rapprochements faux. Cette lecture-là demande du jugement
  // et revient aux agents de lecture du corpus.
  const corps = sujet.summary;
  for (const p of phrases(corps)) {
    if (!verbe.test(p)) continue;
    // d'abord la PROPOSITION qui porte le verbe (une phrase peut mêler un
    // sacre et une mort : « désignée en 244 … jusqu'à sa mort en 252 »)
    const bouts = p.split(/[,;]|\bjusqu'|\bpuis\b|\bavant de\b/).filter((s) => s.trim().length > 4);
    for (const bout of bouts) {
      if (!verbe.test(bout)) continue;
      const d = lireDates(bout);
      if (d) return { ...d, fin: PONCTUEL.has(f.fact_type) ? null : d.fin, indice: bout.trim().slice(0, 140) };
    }
    const d = lireDates(p);                      // repli : la phrase entière
    if (d) return { ...d, fin: PONCTUEL.has(f.fact_type) ? null : d.fin, indice: p.trim().slice(0, 140) };
  }
  return null;
}

// ── application ───────────────────────────────────────────────────────────
const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const byId = {}; for (const e of doc.entities) byId[e.id] = e;
const eres = doc.entities.filter((e) => e.type === 'ere' && e.data && e.data.startYear != null)
  .map((e) => ({ id: e.id, d: e.data }));
const ereDe = (an) => {
  const e = eres.find((x) => an >= x.d.startYear && an <= (x.d.endYear == null ? 1e15 : x.d.endYear));
  return e ? e.id : null;
};

// ── passe 0 : réparer les dates que ce script a lui-même posées avec une
// lecture de calendrier désormais corrigée (négations, exceptions). Sans
// cela, une correction du lecteur ne profite qu'aux faits encore vides.
let repares = 0;
for (const f of doc.facts) {
  if (!f.data || f.data.source_date !== 'libellé' || !f.data.calendrier) continue;
  const txt = ((f.label || '') + ' ' + (f.detail || '')).trim();
  const d = lireDates(txt);
  if (!d || d.cal === f.data.calendrier) continue;
  const avant = f.start_year;
  f.start_year = d.debut;
  if (d.fin != null) f.end_year = d.fin; else if (f.end_year != null && f.end_year < d.debut) f.end_year = null;
  f.data = Object.assign({}, f.data, { calendrier: d.cal, corrige_de: avant });
  repares++;
  console.log(`  ↻ ${f.fact_type} ${avant} → ${d.debut} [${f.data.calendrier}] ${JSON.stringify(txt).slice(0, 72)}`);
}
if (repares) console.log(`calendrier relu : ${repares} fait(s) corrigé(s)\n`);

const stats = { absolu: 0, sillage: 0, regional: 0, relatif: 0, intervalle: 0, rien: 0, prose: 0 };
const echantillon = [];
let touches = 0;

for (const f of doc.facts) {
  if (f.start_year != null) continue;
  const txt = ((f.label || '') + ' ' + (f.detail || '')).trim();
  let d = lireDates(txt);
  let via = 'libellé';
  if (!d) {                                   // passe 2 : la prose du sujet
    d = depuisProse(f, byId[f.subject_id]);
    if (d) { via = 'prose'; stats.prose++; }
  }
  if (!d) { stats.rien++; continue; }
  stats[d.cal]++;
  if (d.fin != null) stats.intervalle++;
  touches++;
  if (echantillon.length < 22 || (via === 'prose' && echantillon.length < 34)) {
    echantillon.push(`${f.fact_type.padEnd(10)} ${String(d.debut).padStart(6)}${d.fin != null ? '→' + d.fin : '      '}  [${d.cal}/${via}]  ${JSON.stringify(d.indice || txt).slice(0, 74)}`);
  }
  if (ESSAI) continue;
  f.start_year = d.debut;
  f.start_circa = d.circa;
  f.start_precision = d.cal === 'relatif' || d.circa ? 'estimation' : 'annee';
  if (d.fin != null) { f.end_year = d.fin; f.end_circa = d.circa; f.end_precision = f.start_precision; }
  if (!f.era_id) f.era_id = ereDe(d.debut);
  f.data = Object.assign({}, f.data, { calendrier: d.cal, source_date: via },
    d.indice ? { indice_date: d.indice } : {});
  f.updated_at = doc.facts[0].updated_at;
}

console.log(`faits datés récupérés : ${touches} (dont ${stats.intervalle} avec une fin)`);
console.log(`  absolu ${stats.absolu} · sillage ${stats.sillage} · régional ${stats.regional} · relatif ${stats.relatif}`);
console.log(`faits laissés sans date : ${stats.rien} (aucune date dans le texte)`);
console.log('\n--- échantillon ---');
echantillon.forEach((l) => console.log('  ' + l));

if (ESSAI) { console.log('\n(essai — rien n\'a été écrit)'); process.exit(0); }

// contrôle de cohérence : pas de mort avant naissance, pas de règne aberrant
const parSujet = {};
for (const f of doc.facts) {
  if (f.start_year == null || !f.subject_id) continue;
  (parSujet[f.subject_id] = parSujet[f.subject_id] || []).push(f);
}
let alertes = 0;
for (const [sid, fs2] of Object.entries(parSujet)) {
  const n = fs2.find((f) => f.fact_type === 'naissance'), m = fs2.find((f) => f.fact_type === 'mort');
  if (n && m && m.start_year < n.start_year) {
    alertes++;
    if (alertes <= 6) console.log(`⚠ ${byId[sid] ? byId[sid].name : sid} : mort ${m.start_year} < naissance ${n.start_year}`);
  }
}
console.log(`\ncontrôle : ${alertes} incohérence(s) mort/naissance`);

fs.writeFileSync(BASE, JSON.stringify(doc, null, 1) + '\n');
const dates = doc.facts.filter((f) => f.start_year != null).length;
console.log(`✔ data/kg-base.json — ${dates}/${doc.facts.length} faits datés (${(100 * dates / doc.facts.length).toFixed(0)} %)`);
