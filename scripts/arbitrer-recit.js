#!/usr/bin/env node
/**
 * Application des arbitrages du versement des Romans au graphe
 * (Docs/Lore/Incohérences et chantiers — à résoudre.md, section 2026-09-14).
 *
 * Les dix points relevés pendant la lecture intégrale des « Trois Coups »
 * ont été tranchés par délégation de l'auteur (« tranche au plus logique »,
 * session du 2026-09-14) ; les verdicts motivés sont dans le registre.
 * Chaque application porte sa provenance :
 *  - date recalée      → `data.correction = { date, motif, avant }`
 *  - fiche arbitrée    → `data.arbitrage`
 *  - fusion d'entité   → `data.fusion` sur l'entité conservée.
 * Idempotent : une opération déjà appliquée est sautée ; une valeur
 * inattendue (le graphe a bougé) fait échouer la passe sans rien écrire.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'data', 'kg-base.json');
const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const facts = new Map(doc.facts.map((f) => [f.id, f]));
const rels = new Map(doc.relations.map((r) => [r.id, r]));
const ents = new Map(doc.entities.map((e) => [e.id, e]));
const NOW = '2026-09-14T00:00:00.000Z';
const QUI = 'délégation de l\'auteur, 2026-09-14';
let ops = 0;
const touches = new Set(); // entités dont la période dérivée est à recalculer
const fait = (msg) => { ops++; console.log('✓ ' + msg); };
const echec = (msg) => { console.error('✗ ' + msg + ' — rien n\'est écrit'); process.exit(1); };

/* ── outils ── */
function recalerDebut(id, attendu, nouveau, motif, opts) {
  const o = opts || {};
  const f = facts.get(id);
  if (!f) echec(id + ' introuvable');
  if (f.start_year === nouveau) return; // déjà fait
  if (f.start_year !== attendu) echec(id + ' : start_year ' + f.start_year + ' ≠ attendu ' + attendu);
  const avant = { start_year: f.start_year };
  if (o.era && f.era_id !== o.era) { avant.era_id = f.era_id; f.era_id = o.era; }
  if (o.circa && !f.start_circa) { avant.start_circa = f.start_circa; f.start_circa = 1; }
  f.data = Object.assign({}, f.data, { correction: { date: '2026-09-14', motif, avant } });
  f.start_year = nouveau;
  f.updated_at = NOW;
  if (f.subject_id) touches.add(f.subject_id);
  if (f.object_id) touches.add(f.object_id);
  fait(id + ' : ' + attendu + ' → ' + nouveau + ' (' + motif + ')');
}
function recalerFin(id, attendu, nouveau, motif, remplacements) {
  const f = facts.get(id);
  if (!f) echec(id + ' introuvable');
  if (f.end_year === nouveau) return; // déjà fait
  if (f.end_year !== attendu) echec(id + ' : end_year ' + f.end_year + ' ≠ attendu ' + attendu);
  const avant = { end_year: f.end_year, end_circa: f.end_circa };
  if (remplacements && f.label) {
    let label = f.label;
    for (const [de, vers] of remplacements) label = label.split(de).join(vers);
    if (label !== f.label) { avant.label = f.label; f.label = label; }
  }
  f.data = Object.assign({}, f.data, { correction: { date: '2026-09-14', motif, avant } });
  f.end_year = nouveau;
  f.end_circa = 1;
  f.updated_at = NOW;
  if (f.subject_id) touches.add(f.subject_id);
  if (f.object_id) touches.add(f.object_id);
  fait(id + ' : fin ' + attendu + ' → ' + nouveau + ' (' + motif + ')');
}

/* ── #1 · oeu-0016 fusionnée dans oeu-0004 ──
 * oeu-0016 « L'Heure qui Naît » (créée par le balayage corpus) recouvre le
 * tome canonique oeu-0004 « L'Heure qui Naît (T3) » : aucun fait, aucun
 * alias, deux relations seulement. Fusion : alias + relations reportés. */
if (ents.has('oeu-0016')) {
  const l2276 = rels.get('lnk-2276'); // per-0020 apparait-dans oeu-0016
  if (!l2276 || l2276.from_id !== 'per-0020' || l2276.to_id !== 'oeu-0016') echec('lnk-2276 : extrémités inattendues');
  const l2277 = rels.get('lnk-2277'); // lie-0247 apparait-dans oeu-0016
  if (!l2277 || l2277.from_id !== 'lie-0247' || l2277.to_id !== 'oeu-0016') echec('lnk-2277 : extrémités inattendues');
  doc.relations = doc.relations.filter((r) => r.id !== 'lnk-2276'); // doublon de lnk-0166 (per-0020 → oeu-0004)
  rels.delete('lnk-2276');
  l2277.to_id = 'oeu-0004';
  if (doc.aliases.some((a) => a.id === 'ali-0201')) echec('ali-0201 déjà pris');
  doc.aliases.push({
    id: 'ali-0201', entity_id: 'oeu-0004', value: 'L\'Heure qui Naît', alias_status: 'variante',
    era_id: null, from_year: null, to_year: null, meaning: 'titre du tome sans le marqueur (T3) ; fiche doublon oeu-0016 fusionnée',
  });
  const t3 = ents.get('oeu-0004');
  t3.data = Object.assign({}, t3.data, {
    fusion: { de: 'oeu-0016', date: '2026-09-14', motif: 'doublon créé par le balayage corpus — même tome 3 (' + QUI + ')' },
  });
  t3.updated_at = NOW;
  doc.entities = doc.entities.filter((e) => e.id !== 'oeu-0016');
  ents.delete('oeu-0016');
  fait('#1 : oeu-0016 fusionnée dans oeu-0004 (lnk-2277 re-branché, lnk-2276 doublon supprimé, alias ali-0201)');
}

/* ── #2 · Le Fléau des Failles s'achève ~1 500, pas ~1 600 ──
 * Le récit du T2 fait foi : Refermeture « en une heure » à la fin du tome,
 * coda du cahier muré en 1502, coda de l'enfant ~1560. Les « ~1 600 » des
 * fiches sont des arrondis d'archives (la fiche Era 5 note elle-même que
 * « les archives tardives » étalent la fermeture jusqu'à ~1 700). */
const MOTIF_FLEAU = '#2 : le récit du T2 fait foi — Refermeture ~1 500 (coda 1502), non ~1 600';
recalerFin('fac-0097', 1600, 1500, MOTIF_FLEAU);
recalerFin('fac-0349', 1600, 1500, MOTIF_FLEAU, [['~1 600', '~1 500']]);
recalerFin('fac-1051', 1600, 1500, MOTIF_FLEAU, [['1400-1600', '1400-1500']]);
recalerFin('fac-1074', 1600, 1500, MOTIF_FLEAU, [['1400-1600', '1400-1500'], ['1450-1550', '1450-1500']]);
recalerFin('fac-1075', 1600, 1500, MOTIF_FLEAU);
recalerFin('fac-1076', 1600, 1500, MOTIF_FLEAU);

/* ── #3 · La famille de faits « An 0 » importée à 9949 ──
 * « An 0 » y désigne l'Arrachement (0 ap.A) ; l'import l'a lu comme l'an 0
 * du Sillage (9949 ap.A). Recalage à 0, ère era5_grande_nuit (comme les
 * faits de récit du T1 déjà en place). */
const MOTIF_AN0 = '#3 : « An 0 » = Arrachement (0 ap.A), lu par erreur comme an 0 du Sillage (9949)';
recalerDebut('fac-1056', 9949, 0, MOTIF_AN0, { era: 'era5_grande_nuit' });
recalerDebut('fac-1057', 9949, 0, MOTIF_AN0, { era: 'era5_grande_nuit' });
recalerDebut('fac-1058', 9949, 0, MOTIF_AN0, { era: 'era5_grande_nuit' });
recalerDebut('fac-1059', 9949, 0, MOTIF_AN0, { era: 'era5_grande_nuit', circa: true });
recalerDebut('fac-1060', 9949, 0, MOTIF_AN0, { era: 'era5_grande_nuit' });
recalerDebut('fac-1061', 9949, 0, MOTIF_AN0, { era: 'era5_grande_nuit' });
recalerDebut('fac-1066', 9949, 0, MOTIF_AN0, { era: 'era5_grande_nuit', circa: true });
recalerDebut('fac-1067', 9949, 0, MOTIF_AN0, { era: 'era5_grande_nuit' });
recalerDebut('fac-1070', 9949, 0, MOTIF_AN0, { era: 'era5_grande_nuit' });

/* fac-1069 (Fragment Zéro « déposé bien après l'An 0 ») n'est PAS de cette
 * famille : son libellé interdit 0, la date exacte est inconnue ; 9949
 * (début du Sillage) reste un ancrage plausible — marqué circa. */
{
  const f = facts.get('fac-1069');
  if (!f) echec('fac-1069 introuvable');
  if (!f.start_circa) {
    if (f.start_year !== 9949) echec('fac-1069 : start_year ' + f.start_year + ' ≠ 9949');
    f.start_circa = 1;
    f.data = Object.assign({}, f.data, {
      correction: {
        date: '2026-09-14',
        motif: '#3 : dépôt « bien après l\'An 0 », date inconnue — 9949 (début du Sillage) conservé comme ancrage conventionnel, marqué circa',
        avant: { start_circa: 0 },
      },
    });
    f.updated_at = NOW;
    fait('fac-1069 : ancrage 9949 conservé, marqué circa (dépôt sans date connue)');
  }
}

/* ── #5 · Navoria n'est pas « engloutie en ~40 minutes » ──
 * Le récit du T1 (ch. 26 « La ville qui respire », ch. 50 « H6 ») décrit
 * une montée des eaux amorcée des jours avant l'An 0 et une noyade
 * progressive sur une journée — la tradition azorienne (« trois jours »)
 * est la bonne ; « ~40 min » (Era 3b) reste une variante d'archives. */
{
  const p = ents.get('pol-0054');
  if (!p) echec('pol-0054 introuvable');
  const avant = 'engloutie en ~40 minutes lors de l\'Arrachement';
  const apres = 'noyée par l\'Arrachement en une journée, au terme d\'une montée des eaux de plusieurs jours';
  if (!p.summary.includes(apres)) {
    if (!p.summary.includes(avant)) echec('pol-0054 : résumé inattendu');
    p.summary = p.summary.replace(avant, apres);
    p.data = Object.assign({}, p.data, {
      arbitrage: '#5 : le récit du T1 (ch. 26/50) fait foi — noyade progressive ; « ~40 min » (Era 3b) rétrogradé en variante d\'archives (' + QUI + ')',
    });
    p.updated_at = NOW;
    fait('#5 : pol-0054 — résumé recalé sur le récit du T1');
  }
  const f = facts.get('fac-1056');
  if (f && !(f.data && f.data.arbitrage)) {
    f.data = Object.assign({}, f.data, {
      arbitrage: '#5 : le récit du T1 tranche pour la noyade progressive (« trois jours » azoriens) ; « ~40 min » conservé comme variante Era 3b (' + QUI + ')',
    });
    fait('#5 : fac-1056 — arbitrage historiographique noté');
  }
}

/* ── #6 · Le Grand Pontife de Navoris s'appelle Théon Ossarin ──
 * Nom donné par le T1 (ch. 34 « Ce qu'un homme peut tenir ») ; « Grand
 * Pontife de Navigor » y est son titre (Navigor : le dieu ; Navoris : la
 * thalassocratie — pas d'homonymie). */
{
  const p = ents.get('per-0882');
  if (!p) echec('per-0882 introuvable');
  if (p.name !== 'Théon Ossarin') {
    if (p.name !== 'Le Grand Pontife de Navoris') echec('per-0882 : nom inattendu « ' + p.name + ' »');
    p.name = 'Théon Ossarin';
    p.summary = 'Théon Ossarin, Grand Pontife de Navigor — chef religieux de la Thalassocratie de Navoris ; à l\'An 0 il ordonne les cultes normaux pour éviter la panique et meurt noyé (Jour 2). [canon]';
    p.data = Object.assign({}, p.data, {
      arbitrage: '#6 : nom propre donné par le T1, ch. 34 (' + QUI + ')',
    });
    p.updated_at = NOW;
    if (doc.aliases.some((a) => a.id === 'ali-0202')) echec('ali-0202 déjà pris');
    doc.aliases.push({
      id: 'ali-0202', entity_id: 'per-0882', value: 'Le Grand Pontife de Navoris', alias_status: 'variante',
      era_id: null, from_year: null, to_year: null, meaning: 'titre — nommé Théon Ossarin par le T1 (ch. 34)',
    });
    fait('#6 : per-0882 nommé Théon Ossarin, le titre passe en alias (ali-0202)');
  }
}

/* ── #9 · Vharok meurt en 10 193 (an 244), pas en 10 200 ──
 * « Sept ans avant le présent » (an 251) : bible T3 §3.3 et ch. 40. */
recalerDebut('fac-1095', 10200, 10193, '#9 : mort « sept ans avant le présent » (an 244 du Sillage), bible T3 §3.3 et ch. 40');

/* ── périodes dérivées : règle du pipeline (min/max des faits datés) ── */
for (const id of touches) {
  const e = ents.get(id);
  if (!e || !e.data || !e.data.periode || e.data.periode.methode !== 'fait-date') continue;
  let debut = Infinity, fin = -Infinity;
  for (const f of doc.facts) {
    if (f.start_year == null) continue;
    if (f.subject_id !== id && f.object_id !== id) continue;
    debut = Math.min(debut, f.start_year);
    fin = Math.max(fin, f.end_year != null ? f.end_year : f.start_year);
  }
  if (!Number.isFinite(debut)) continue;
  const p = e.data.periode;
  if (p.debut !== debut || p.fin !== fin) {
    console.log('  ↻ période de ' + e.name + ' (' + id + ') : ' + p.debut + '→' + p.fin + ' ⇒ ' + debut + '→' + fin);
    p.debut = debut; p.fin = fin;
    e.updated_at = NOW;
  }
}

if (ops === 0) {
  console.log('Rien à faire : les arbitrages du 2026-09-14 sont déjà appliqués.');
} else {
  fs.writeFileSync(BASE, JSON.stringify(doc, null, 1) + '\n');
  console.log('\n' + ops + ' opération(s) — data/kg-base.json réécrit : ' +
    doc.entities.length + ' entités, ' + doc.facts.length + ' faits, ' +
    doc.relations.length + ' relations, ' + doc.aliases.length + ' alias.');
}
