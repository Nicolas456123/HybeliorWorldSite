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
for (const ent of kg.entities) {
  const P = ent.data && ent.data.parcours;
  if (!Array.isArray(P) || !P.length) continue;
  const cpt = { tient: 0, serre: 0, impossible: 0 };
  const lg = [];
  let prec = null;
  for (let i = 0; i < P.length; i++) {
    const et = P[i];
    delete et.distance_lieues; delete et.rythme; delete et.verdict; delete et.jours_dispo;
    const pos = position(et);
    if (!pos) { bilan.sans_position++; continue; }
    if (et.souvenir) continue;
    if (prec && prec.pos) {
      total++;
      const eau = MODES_EAU.has(et.mode);
      const units = Math.hypot(pos.x - prec.pos.x, pos.y - prec.pos.y);
      const lieues = (units * (eau ? DETOUR.eau : DETOUR.terre)) / UPL;
      et.distance_lieues = arrondi(lieues, 0);
      let jours = et.jours != null ? +et.jours : null;
      if (jours == null && et.t != null && prec.et.t != null) {
        jours = +et.t - +prec.et.t;
        et.jours_dispo = arrondi(jours, 2);
      }
      const v = VITESSES[et.mode] || null;
      if (lieues < 0.5) { /* sur place */ }
      else if (jours == null || !(jours > 0)) bilan.sans_temps++;
      else {
        const rythme = lieues / jours;
        et.rythme = arrondi(rythme, 1);
        if (v) {
          const verdict = rythme <= v.normal ? null : rythme <= v.max ? 'serre' : 'impossible';
          if (verdict) {
            et.verdict = verdict;
            if (!et.note_verrouillee) {
              et.note = `${arrondi(rythme, 1)} lieues/jour pour « ${et.mode} » (allure ${v.normal}, forcée ${v.max})`;
            }
          } else if (!et.note_verrouillee) delete et.note;
          const cle = verdict === 'serre' ? 'serre' : verdict || 'tient';
          cpt[cle]++; bilan[cle]++;
          if (DETAIL || verdict === 'impossible') {
            lg.push(`  ${verdict === 'impossible' ? '✗' : verdict === 'serre' ? '≈' : '✓'} ${ent.name} · ${et.chapitre || ''} · ${prec.et.lieu} → ${et.lieu} : ${arrondi(lieues, 0)} lieues en ${arrondi(jours, 1)} j (${arrondi(rythme, 1)}/j, ${et.mode})`);
          }
        }
      }
    }
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
