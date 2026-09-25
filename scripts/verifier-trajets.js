#!/usr/bin/env node
'use strict';
/*
 * scripts/verifier-trajets.js — Les trajets des personnages tiennent-ils dans le temps ?
 *
 * Pour chaque entité qui porte `data.parcours`, chaque étape est placée sur la carte
 * (coordonnées posées par l'auteur, sinon `data.carte.position_estimee` du lieu), puis
 * jugée : la distance depuis l'étape précédente, en lieues, rapportée au temps dont
 * le récit dispose (la durée annoncée `jours`, sinon l'écart des repères `t`),
 * comparée aux vitesses plausibles du moyen de transport.
 *
 *   tient      : rythme ≤ allure normale du mode
 *   serré      : allure normale < rythme ≤ allure forcée
 *   impossible : rythme > allure forcée
 *
 * L'échelle et les vitesses vivent dans l'Atrium, sur l'entité d'échelle « monde »
 * (`data.echelle_carte`) : c'est lui qui tranche, ce script ne fait que compter.
 *
 * Usage :
 *   node scripts/verifier-trajets.js              → rapport
 *   node scripts/verifier-trajets.js --detail     → + chaque étape jugée
 *   node scripts/verifier-trajets.js --ecrire     → écrit distance, rythme et verdict
 *                                                    dans chaque étape (data/kg-base.json)
 */

const fs = require('fs');
const path = require('path');

const FICHIER = path.join(__dirname, '..', 'data', 'kg-base.json');
const argv = process.argv.slice(2);
const DETAIL = argv.includes('--detail');
const ECRIRE = argv.includes('--ecrire');

const kg = JSON.parse(fs.readFileSync(FICHIER, 'utf8'));
const byId = new Map(kg.entities.map((e) => [e.id, e]));

const monde = kg.entities.find((e) => e.data && e.data.echelle === 'monde' && e.data.echelle_carte);
if (!monde) { console.error('Aucune échelle : l’entité « monde » ne porte pas data.echelle_carte.'); process.exit(1); }
const ECH = monde.data.echelle_carte;
const UPL = +ECH.unites_par_lieue;
const DETOUR = ECH.detour || { terre: 1.25, eau: 1.1 };
const VITESSES = ECH.vitesses || {};
const MODES_EAU = new Set(ECH.modes_eau || ['bateau', 'navire', 'barge', 'pirogue', 'bac']);

function position(etape) {
  const e = etape.lieu_id && byId.get(etape.lieu_id);
  const d = e && e.data;
  if (d && d.coord_x != null && d.coord_y != null) return { x: +d.coord_x, y: +d.coord_y, estimee: false };
  const pe = d && d.carte && d.carte.position_estimee;
  if (pe && pe.x != null) return { x: +pe.x, y: +pe.y, estimee: true };
  if (etape.x != null && etape.y != null) return { x: +etape.x, y: +etape.y, estimee: true };
  return null;
}
const arrondi = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

let total = 0;
const bilan = { tient: 0, serre: 0, impossible: 0, sans_temps: 0, sans_position: 0 };
const lignes = [];
// Un tronçon se juge d'un repère daté au suivant : la distance cumulée des étapes
// intermédiaires (non datées) rapportée à l'écart des repères `t` ; ou, pour une
// étape qui annonce sa propre durée (`jours`), sur ce seul tronçon.
// Un segment (d'un repère daté au suivant) peut enchaîner la mer et la terre : on
// additionne, sous-tronçon par sous-tronçon, le temps qu'il demande à l'allure normale
// et à l'allure forcée de SON mode, et l'on compare au temps dont le récit dispose.
const vitesse = (mode) => VITESSES[mode] || VITESSES.marche;
function juger(et, segs, jours, cpt, lg, ent, de) {
  const lieues = segs.reduce((s, x) => s + x.lieues, 0);
  if (lieues < 0.5) return;
  if (!(jours > 0)) { bilan.sans_temps++; return; }
  const tNormal = segs.reduce((s, x) => s + x.lieues / vitesse(x.mode).normal, 0);
  const tForce = segs.reduce((s, x) => s + x.lieues / vitesse(x.mode).max, 0);
  et.rythme = arrondi(lieues / jours, 1);
  const verdict = jours >= tNormal ? null : jours >= tForce ? 'serre' : 'impossible';
  const modes = [...new Set(segs.map((x) => x.mode))].join(' + ');
  if (verdict) {
    et.verdict = verdict;
    if (!et.note_verrouillee) {
      et.note = `${arrondi(lieues, 0)} lieues (${modes}) en ${arrondi(jours, 1)} j : il en faudrait ${arrondi(tNormal, 1)} à l'allure normale, ${arrondi(tForce, 1)} à marche forcée`;
    }
  } else if (!et.note_verrouillee) delete et.note;
  const cle = verdict || 'tient';
  cpt[cle]++; bilan[cle]++; total++;
  if (DETAIL || verdict === 'impossible') {
    lg.push(`  ${verdict === 'impossible' ? '✗' : verdict === 'serre' ? '≈' : '✓'} ${ent.name} · ${et.chapitre || ''} · ${de} → ${et.lieu} : ${arrondi(lieues, 0)} lieues (${modes}) en ${arrondi(jours, 1)} j — normal ${arrondi(tNormal, 1)} j, forcé ${arrondi(tForce, 1)} j`);
  }
}
for (const ent of kg.entities) {
  const P = ent.data && ent.data.parcours;
  if (!Array.isArray(P) || !P.length) continue;
  const cpt = { tient: 0, serre: 0, impossible: 0 };
  const lg = [];
  let prec = null;          // dernière étape placée
  let repere = null;        // dernière étape datée : { t, lieu, segs }
  for (const et of P) {
    for (const k of ['distance_lieues', 'rythme', 'verdict', 'jours_dispo']) delete et[k];
    if (!et.note_verrouillee) delete et.note;
    const pos = position(et);
    if (!pos) { bilan.sans_position++; continue; }
    if (et.souvenir) continue;
    if (prec) {
      const mode = et.mode && et.mode !== 'inconnu' ? et.mode : 'marche';
      const eau = MODES_EAU.has(mode);
      const units = Math.hypot(pos.x - prec.pos.x, pos.y - prec.pos.y);
      const lieues = (units * (eau ? DETOUR.eau : DETOUR.terre)) / UPL;
      et.distance_lieues = arrondi(lieues, 0);
      const seg = { lieues, mode };
      if (repere) repere.segs.push(seg);
      if (et.jours != null) juger(et, [seg], +et.jours, cpt, lg, ent, prec.et.lieu);
      else if (et.t != null && repere && repere.t != null) {
        const jours = +et.t - repere.t;
        et.jours_dispo = arrondi(jours, 2);
        juger(et, repere.segs, jours, cpt, lg, ent, repere.lieu);
      }
    }
    if (et.t != null) repere = { t: +et.t, lieu: et.lieu, segs: [] };
    prec = { et, pos };
  }
  ent.data.parcours_bilan = cpt;
  lignes.push(`${ent.name} : ${P.length} étapes — tient ${cpt.tient}, serré ${cpt.serre}, impossible ${cpt.impossible}`, ...lg);
}

console.log(`Échelle : 1 lieue = ${ECH.lieue_km} km = ${UPL} unité de carte · détour terre ×${DETOUR.terre}, eau ×${DETOUR.eau}`);
console.log(`Tronçons jugés : ${total} — tient ${bilan.tient} · serré ${bilan.serre} · impossible ${bilan.impossible}` +
  ` · sans temps ${bilan.sans_temps} · étapes sans position ${bilan.sans_position}`);
for (const l of lignes) console.log(l);
if (ECRIRE) {
  fs.writeFileSync(FICHIER, JSON.stringify(kg, null, 2) + '\n');
  console.log('→ data/kg-base.json écrit');
}
