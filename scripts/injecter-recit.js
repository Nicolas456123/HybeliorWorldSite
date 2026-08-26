#!/usr/bin/env node
'use strict';
/*
 * scripts/injecter-recit.js — Verse les événements du RÉCIT dans le graphe.
 *
 * Les romans et chroniques font les deux tiers du corpus (5,2 Mo, 210
 * chapitres) et le graphe n'en avait presque rien : ses faits sont
 * encyclopédiques (fondations, règnes) et viennent des fiches de pays. Or un
 * chapitre contient dix événements — une saisie, une fuite, une rencontre,
 * une mort — tous situables par la position du chapitre dans l'arc.
 *
 * L'ancrage des Chroniques est canonique (bible, §4.0bis) : « Budget total
 * intangible : 910 jours, départ fin an 248, retour jour 910 au début de
 * l'an 251 ». On pose le départ ~60 jours avant la fin de 248 :
 *     an_sillage(jour) = 248 + floor((305 + jour - 1) / 365)
 * L'incertitude (« fin 248 » n'est pas précise au jour) vaut ±1 an aux
 * frontières : toutes ces dates sont donc marquées circa/estimation.
 *
 * L'entrée est un fichier d'événements RELUS PAR UN HUMAIN POSSIBLE :
 * data/evenements-recit.json — chaque entrée dit son chapitre, son jour, son
 * titre, ses personnages. Corrigez-y ce qui cloche puis relancez : le script
 * est idempotent (clé oeuvre:chapitre:titre), il remplace au lieu de doubler.
 *
 * Usage :
 *   node scripts/injecter-recit.js --essai
 *   node scripts/injecter-recit.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const EVTS = path.join(ROOT, 'data', 'evenements-recit.json');
const ESSAI = process.argv.includes('--essai');
const DECALAGE = 9949;

const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const evts = JSON.parse(fs.readFileSync(EVTS, 'utf8')).evenements;

// le fichier d'événements dit « chroniques », le graphe dit oeu-0013
const OEUVRES = { chroniques: 'oeu-0013' };

// ── résolution des noms ───────────────────────────────────────────────────
const plat = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ').trim();
const parNom = {};
for (const e of doc.entities) (parNom[plat(e.name)] = parNom[plat(e.name)] || []).push(e);
for (const a of doc.aliases || []) {
  const e = doc.entities.find((x) => x.id === a.entity_id);
  if (e) (parNom[plat(a.value)] = parNom[plat(a.value)] || []).push(e);
}
function resoudre(nom, types) {
  if (!nom) return null;
  if (/^(per|lie|pol|oeu|evt|obj|rel|div|lig)-\d+$/.test(nom)) return doc.entities.find((e) => e.id === nom) || null;
  // dédoublonner par id : un alias identique au nom ferait croire à une homonymie
  const c = [...new Map((parNom[plat(nom)] || [])
    .filter((e) => !types || types.includes(e.type))
    .map((e) => [e.id, e])).values()];
  if (c.length === 1) return c[0];
  return null;                       // absent ou ambigu (homonymies voulues) : on ne force pas
}

// ── datation ─────────────────────────────────────────────────────────────
function annee(evt, oeuvre) {
  if (evt.annee_sillage != null) return { sillage: evt.annee_sillage };
  if (evt.jour != null && oeuvre === 'oeu-0013') {
    return { sillage: 248 + Math.floor((305 + evt.jour - 1) / 365) };
  }
  return null;
}

// ── identifiants ─────────────────────────────────────────────────────────
const num = (id) => +(String(id).match(/\d+/) || [0])[0];
let facSuiv = Math.max(...doc.facts.map((f) => num(f.id))) + 1;
let lnkSuiv = Math.max(...doc.relations.map((r) => num(r.id))) + 1;
const uid = (e) => `${e.oeuvre}:${e.chapitre}:${plat(e.titre).replace(/ /g, '-').slice(0, 60)}`;
const dejaLa = {};
for (const f of doc.facts) if (f.data && f.data.recit_uid) dejaLa[f.data.recit_uid] = f;
const relExiste = new Set(doc.relations.map((r) => r.rel_type + '|' + r.from_id + '|' + r.to_id));

// ── personnages secondaires du récit absents du graphe ────────────────────
// Le fichier d'événements peut en déclarer (personnes: [{nom, resume}]) :
// créés une seule fois (idempotence par nom), la période viendra des faits
// via inferer-dates. On ne crée JAMAIS depuis un simple nom non résolu.
let perSuiv = Math.max(...doc.entities.filter((e) => /^per-/.test(e.id)).map((e) => +e.id.slice(4))) + 1;
let creees = 0;
for (const p of JSON.parse(fs.readFileSync(EVTS, 'utf8')).personnes || []) {
  if (resoudre(p.nom, ['personne'])) continue;
  const e = {
    id: 'per-' + String(perSuiv++).padStart(4, '0'), type: 'personne', name: p.nom,
    slug: null, summary: p.resume || null, body: null, data: null,
    status: 'canon', disclosure: 'interne',
    created_at: '2026-08-26T00:00:00.000Z', updated_at: '2026-08-26T00:00:00.000Z',
  };
  doc.entities.push(e);
  (parNom[plat(e.name)] = parNom[plat(e.name)] || []).push(e);
  creees++;
  console.log(`  + ${e.id} ${e.name}`);
}
if (creees) console.log(`personnes créées     : ${creees}\n`);

// ── injection ────────────────────────────────────────────────────────────
const stats = { faits: 0, remplaces: 0, sansDate: 0, apparitions: 0, sujetsNonResolus: 0 };
const nonResolus = {};

for (const evt of evts) {
  const oeuvre = OEUVRES[evt.oeuvre] || evt.oeuvre || 'oeu-0013';
  const an = annee(evt, oeuvre);
  if (!an) { stats.sansDate++; continue; }
  const abs = an.sillage + DECALAGE;

  // sujet_id tranche les homonymies réelles (Evertia archipel vs nation)
  const resolu = (evt.sujet_id ? resoudre(evt.sujet_id, null) : null) || resoudre(evt.sujet, null);
  const sujet = resolu || resoudre('Sorin Valthen', ['personne']);
  if (!resolu) { stats.sujetsNonResolus++; nonResolus[evt.sujet] = (nonResolus[evt.sujet] || 0) + 1; }
  const objet = evt.objet ? resoudre(evt.objet, null) : null;

  const cle = uid(evt);
  const ancien = dejaLa[cle];
  const f = ancien || { id: 'fac-' + String(facSuiv++).padStart(4, '0') };
  Object.assign(f, {
    fact_type: evt.type || 'evenement',
    subject_id: sujet ? sujet.id : oeuvre,
    object_id: objet ? objet.id : null,
    start_year: abs, start_precision: 'estimation', start_circa: 1,
    end_year: null, end_precision: null, end_circa: 0,
    era_id: 'era7_actuel', seq: evt.chapitre || 0,
    label: evt.titre + (evt.sujet && !resolu ? ` — ${evt.sujet}` : ''),
    detail: (evt.detail || '') + ` [Chroniques, ch. ${evt.chapitre}${evt.jour != null ? ', jour ' + evt.jour : ''} — an ${an.sillage} du Sillage]`,
    data: {
      calendrier: 'sillage', source_date: 'recit', recit_uid: cle,
      chapitre: evt.chapitre, jour: evt.jour != null ? evt.jour : null,
      confiance: 'moyenne',
    },
    source_id: oeuvre, status: 'canon', disclosure: 'interne',
    created_at: f.created_at || '2026-08-26T00:00:00.000Z',
    updated_at: '2026-08-26T00:00:00.000Z',
  });
  if (ancien) stats.remplaces++; else { doc.facts.push(f); stats.faits++; }

  // qui apparaît dans ce chapitre → relation vers l'œuvre
  for (const nom of evt.personnages || []) {
    const p = resoudre(nom, ['personne']);
    if (!p) continue;
    const k = 'apparait-dans|' + p.id + '|' + oeuvre;
    if (relExiste.has(k)) continue;
    relExiste.add(k);
    doc.relations.push({
      id: 'lnk-' + String(lnkSuiv++).padStart(4, '0'),
      rel_type: 'apparait-dans', from_id: p.id, to_id: oeuvre,
      start_year: null, end_year: null,
      label: `apparaît dans les Chroniques (ch. ${evt.chapitre})`,
      data: null, source_id: oeuvre, status: 'canon',
    });
    stats.apparitions++;
  }
}

console.log(`événements lus       : ${evts.length}`);
console.log(`faits créés          : ${stats.faits} (+ ${stats.remplaces} remplacés, idempotence)`);
console.log(`apparitions ajoutées : ${stats.apparitions} (personnage → œuvre)`);
console.log(`sujets non résolus   : ${stats.sujetsNonResolus} (fait posé, nom gardé dans le libellé)`);
const top = Object.entries(nonResolus).sort((a, b) => b[1] - a[1]).slice(0, 12);
if (top.length) console.log('  ' + top.map(([n, c]) => `${n}×${c}`).join(' · '));
if (stats.sansDate) console.log(`⚠ sans date possible  : ${stats.sansDate}`);

if (ESSAI) { console.log('\n(essai — rien n\'a été écrit)'); process.exit(0); }
fs.writeFileSync(BASE, JSON.stringify(doc, null, 1) + '\n');
console.log(`\n✔ data/kg-base.json — ${doc.facts.length} faits, ${doc.relations.length} relations`);
