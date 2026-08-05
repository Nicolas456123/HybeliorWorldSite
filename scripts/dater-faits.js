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
const DECALAGE = 9949;          // an X du Sillage / régional  →  X + 9949 ap.A
const PRESENT = 10200;          // an 251 du Sillage

// ── reconnaissance des dates ──────────────────────────────────────────────
// Un nombre n'est une année que s'il est introduit par un marqueur temporel
// et n'est pas suivi d'une unité qui en ferait un âge ou un décompte.
const MARQUEUR = '(?:an|en|vers|dès|depuis|jusqu\'en|à partir de|fin|début|élue?|investie?|couronnée?|née?|morte?|décédée?|\\+)';
const PAS_UNITE = '(?!\\s*(?:ans?\\b|siècles?|générations?|navires?|hommes?|jours?|mois\\b|%))';
const NB = '(-?\\d{1,2}[  ]?\\d{3}|-?\\d{1,4})';

// « ~an 248-251 », « +172 à +189 », « fin 248 – début 251 »
const rxIntervalle = new RegExp(
  `${MARQUEUR}[^.;]{0,24}?\\+?${NB}\\s*(?:[–—-]|à|jusqu'(?:en|à)|au)\\s*[^\\d.;]{0,12}\\+?${NB}${PAS_UNITE}`, 'i');
// fin de règne énoncée à part : « élue en 132, morte en charge en 156 »
const rxFin = new RegExp(
  `(?:mort[e]?|décès|décédée?|jusqu'en|abdique|déposée?|renversée?|fin de (?:règne|charge))[^.;]{0,28}?` +
  `(?:en|l'an|vers|\\+)\\s*~?${NB}${PAS_UNITE}`, 'i');
const rxSimple = new RegExp(`${MARQUEUR}\\s+(?:l'an\\s+|l'année\\s+|an\\s+|\\+)?~?${NB}${PAS_UNITE}`, 'i');
const rxRelatif = /~?\s*(\d{1,4})\s*(siècles?|ans?|générations?)\s*(avant|après)\s+le\s+présent/i;
const rxSillage = /du\s+Sillage/i;
const rxApA = /\bap\.?\s?A\b/i;
const rxAvA = /\bav\.?\s?A\b/i;
const rxCirca = /~|vers|environ|circa|\bc\./i;

const nb = (s) => parseInt(String(s).replace(/[  ]/g, ''), 10);

// L'Arrachement EST l'An 0 absolu : une date qui s'y réfère explicitement
// n'est pas un décompte local et ne doit pas être décalée.
const rxArrachement = /Arrachement|Mont\s+Cendra|[Cc]ataclysme\s+cosmique|jour\s+de\s+la\s+[Dd]échirure/;

// Convertit une année lue en année absolue, selon le calendrier détecté.
function versAbsolu(an, txt) {
  if (rxAvA.test(txt)) return { an: -Math.abs(an), cal: 'absolu' };
  if (rxApA.test(txt)) return { an, cal: 'absolu' };
  if (Math.abs(an) <= 30 && rxArrachement.test(txt)) return { an, cal: 'absolu' };
  if (rxSillage.test(txt)) return { an: an + DECALAGE, cal: 'sillage' };
  if (Math.abs(an) > 300) return { an, cal: 'absolu' };      // temps profond
  return { an: an + DECALAGE, cal: 'regional' };             // même époque
}

function lireDates(txt) {
  if (!txt) return null;
  const rel = txt.match(rxRelatif);
  if (rel) {
    const q = +rel[1] * (/siècle/i.test(rel[2]) ? 100 : /génération/i.test(rel[2]) ? 25 : 1);
    const an = /avant/i.test(rel[3]) ? PRESENT - q : PRESENT + q;
    return { debut: an, fin: null, cal: 'relatif', circa: 1 };
  }
  const inter = txt.match(rxIntervalle);
  if (inter) {
    const a = versAbsolu(nb(inter[1]), txt), b = versAbsolu(nb(inter[2]), txt);
    if (b.an >= a.an && b.an - a.an < 4000) {
      return { debut: a.an, fin: b.an, cal: a.cal, circa: rxCirca.test(txt) ? 1 : 0 };
    }
  }
  const s = txt.match(rxSimple);
  if (s) {
    const a = versAbsolu(nb(s[1]), txt);
    // une fin peut être énoncée séparément, après le début
    let fin = null;
    const m = txt.match(rxFin);
    if (m) {
      const b = versAbsolu(nb(m[1]), txt);
      if (b.an > a.an && b.an - a.an < 4000) fin = b.an;
    }
    return { debut: a.an, fin, cal: a.cal, circa: rxCirca.test(txt) ? 1 : 0 };
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

const stats = { absolu: 0, sillage: 0, regional: 0, relatif: 0, intervalle: 0, rien: 0 };
const echantillon = [];
let touches = 0;

for (const f of doc.facts) {
  if (f.start_year != null) continue;
  const txt = ((f.label || '') + ' ' + (f.detail || '')).trim();
  const d = lireDates(txt);
  if (!d) { stats.rien++; continue; }
  stats[d.cal]++;
  if (d.fin != null) stats.intervalle++;
  touches++;
  if (echantillon.length < 22) {
    echantillon.push(`${f.fact_type.padEnd(10)} ${String(d.debut).padStart(6)}${d.fin != null ? '→' + d.fin : '      '}  [${d.cal}]  ${JSON.stringify(txt).slice(0, 78)}`);
  }
  if (ESSAI) continue;
  f.start_year = d.debut;
  f.start_circa = d.circa;
  f.start_precision = d.cal === 'relatif' || d.circa ? 'estimation' : 'annee';
  if (d.fin != null) { f.end_year = d.fin; f.end_circa = d.circa; f.end_precision = f.start_precision; }
  if (!f.era_id) f.era_id = ereDe(d.debut);
  f.data = Object.assign({}, f.data, { calendrier: d.cal, source_date: 'libellé' });
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
