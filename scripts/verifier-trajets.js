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
 *   impossible : rythme > allure forcée
 *   serré      : allure normale < rythme ≤ allure forcée
 *   tient      : le récit donne entre une et `lenteur.facteur` fois le temps que
 *                demande l'allure normale
 *   lent       : il en donne davantage alors que le texte annonce la durée du trajet
 *                (`jours`) : la distance est trop courte sur la carte pour ce temps.
 *
 * Quand le temps ne vient que de l'écart des dates (`t`), un trajet trop lent n'est pas
 * un verdict : le calendrier du récit compte aussi les séjours, et le surplus s'y range
 * tant que le texte ne dit pas que ce temps s'est passé sur la route (règle du
 * 2026-09-26). L'étape reçoit alors `lenteur` (le rapport au temps de route) et une
 * note, sans verdict.
 *
 * L'échelle et les vitesses vivent dans l'Atrium, sur l'entité d'échelle « monde »
 * (`data.echelle_carte`) : c'est lui qui tranche, ce script ne fait que compter.
 * Depuis la décision de l'auteur du 2026-09-26, une unité de carte vaut
 * `km_par_unite` km (≈ 0,955 : 1 047 unités pour 1 000 km d'une mer à l'autre) ;
 * la lieue reste l'unité du récit (`lieue_km`), soit `lieue_km / km_par_unite`
 * unités. Les allures sont en lieues par jour : ce sont des vitesses du monde réel,
 * que l'échelle de la carte ne touche pas. Les seuils de précision de la carte
 * (ce qu'elle est trop grossière pour juger) restent comptés en unités.
 *
 * Usage :
 *   node scripts/verifier-trajets.js              → rapport (impossibles et lents ;
 *                                                    ? = une extrémité estimée en confiance basse,
 *                                                    ◌ = une extrémité estimée)
 *   node scripts/verifier-trajets.js --detail     → + chaque étape jugée
 *   node scripts/verifier-trajets.js --ecrire     → écrit distance, rythme et verdict
 *                                                    dans chaque étape (data/kg-base.json)
 *   node scripts/verifier-trajets.js --json F     → + la liste des verdicts dans F
 */

const fs = require('fs');
const path = require('path');

const FICHIER = path.join(__dirname, '..', 'data', 'kg-base.json');
const argv = process.argv.slice(2);
const DETAIL = argv.includes('--detail');
const ECRIRE = argv.includes('--ecrire');
const JSON_OUT = argv.includes('--json') ? argv[argv.indexOf('--json') + 1] : null;

const kg = JSON.parse(fs.readFileSync(FICHIER, 'utf8'));
const byId = new Map(kg.entities.map((e) => [e.id, e]));

const monde = kg.entities.find((e) => e.data && e.data.echelle === 'monde' && e.data.echelle_carte);
if (!monde) { console.error('Aucune échelle : l’entité « monde » ne porte pas data.echelle_carte.'); process.exit(1); }
const ECH = monde.data.echelle_carte;
const KPU = +ECH.km_par_unite || (+ECH.lieue_km / +ECH.unites_par_lieue);   // km par unité de carte
const UPL = +ECH.lieue_km / KPU;                                              // unités de carte par lieue
const DETOUR = ECH.detour || { terre: 1.25, eau: 1.1 };
const VITESSES = ECH.vitesses || {};
const MODES_EAU = new Set(ECH.modes_eau || ['bateau', 'navire', 'barge', 'pirogue', 'bac']);
const LENTEUR = +((ECH.lenteur && ECH.lenteur.facteur) || 3);
// Seuils de précision de la carte, en unités (≈ km) : en deçà, la carte ne juge pas.
const PREC = Object.assign({ minimum: 0.5, journee: 10, lent: 10 }, ECH.precision_unites || {});

function position(etape) {
  const e = etape.lieu_id && byId.get(etape.lieu_id);
  const d = e && e.data;
  if (d && d.coord_x != null && d.coord_y != null) return { x: +d.coord_x, y: +d.coord_y, estimee: false };
  const pe = d && d.carte && d.carte.position_estimee;
  if (pe && pe.x != null) return { x: +pe.x, y: +pe.y, estimee: true, confiance: pe.confiance || 'basse' };
  if (etape.x != null && etape.y != null) return { x: +etape.x, y: +etape.y, estimee: true };
  return null;
}
const arrondi = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;
const fr = (n, d = 1) => String(arrondi(n, d)).replace('.', ',');   // nombres des notes, à la française

let total = 0;
const bilan = { tient: 0, serre: 0, impossible: 0, lent: 0, lent_dates: 0, sans_temps: 0, sans_position: 0, douteux: 0 };
const lignes = [];
const verdicts = [];
// Un tronçon se juge d'un repère daté au suivant : la distance cumulée des étapes
// intermédiaires (non datées) rapportée à l'écart des repères `t` ; ou, pour une
// étape qui annonce sa propre durée (`jours`), sur ce seul tronçon.
// Un segment (d'un repère daté au suivant) peut enchaîner la mer et la terre : on
// additionne, sous-tronçon par sous-tronçon, le temps qu'il demande à l'allure normale
// et à l'allure forcée de SON mode, et l'on compare au temps dont le récit dispose.
const vitesse = (mode) => VITESSES[mode] || VITESSES.marche;
const SYMB = { impossible: '✗', serre: '≈', lent: '⋯' };
function juger(et, segs, jours, cpt, lg, ent, de, douteux, origine) {
  const unites = segs.reduce((s, x) => s + x.unites, 0);
  const lieues = segs.reduce((s, x) => s + x.lieues, 0);
  if (unites < PREC.minimum) return;
  if (!(jours > 0)) { bilan.sans_temps++; return; }
  // Sous la journée et la dizaine d'unités, la carte n'a pas la précision de juger
  // (le pied et le sommet d'un mont, deux quartiers d'une ville).
  if (unites < PREC.journee && jours < 1) return;
  const tNormal = segs.reduce((s, x) => s + x.lieues / vitesse(x.mode).normal, 0);
  const tForce = segs.reduce((s, x) => s + x.lieues / vitesse(x.mode).max, 0);
  et.rythme = arrondi(lieues / jours, 1);
  // « Lent » ne se dit que d'un trajet d'au moins un jour et de quelques unités :
  // plus court, la position d'un lieu (centre d'une région, d'une ville) pèse plus
  // que la route.
  const lent = jours >= 1 && unites >= PREC.lent && jours > LENTEUR * tNormal;
  // Une lenteur que le texte explique lui-même (glacier sondé, Voile qui allonge le col)
  // n'est pas un écart : l'étape porte `lenteur_dite` (la phrase du livre).
  const annonce = origine === 'durée annoncée' && !et.lenteur_dite;
  // Sous la journée, `jours` compte des heures d'horloge (0,2 j ≈ 5 h), les allures des
  // journées de route (≈ 8 h à l'allure normale, 12 h à marche forcée) : on convertit.
  const jN = jours < 1 ? Math.min(1, jours * 24 / 8) : jours;
  const jF = jours < 1 ? Math.min(1, jours * 24 / 12) : jours;
  const verdict = jF < tForce ? 'impossible' : jN < tNormal ? 'serre' : lent && annonce ? 'lent' : null;
  const lentDates = lent && !annonce;
  const modes = [...new Set(segs.map((x) => x.mode))].join(' + ');
  if (douteux) et.fiabilite = 'basse'; else delete et.fiabilite;
  const km = lieues * +ECH.lieue_km;
  if (lentDates) et.lenteur = arrondi(jours / tNormal, 1);
  if (verdict || lentDates) {
    if (verdict) et.verdict = verdict;
    if (!et.note_verrouillee) {
      et.note = verdict === 'lent'
        ? `${fr(lieues, 0)} lieues (${fr(km, 0)} km, ${modes}) en ${fr(jours, 1)} j : l'allure normale en demande ${fr(tNormal, 1)}, le texte en annonce ${fr(jours / tNormal, 1)} fois plus`
        : lentDates
          ? `${fr(lieues, 0)} lieues (${fr(km, 0)} km) de route pour ${fr(jours, 1)} j au calendrier (${fr(tNormal, 1)} à l'allure normale) : le reste est séjour`
          : `${fr(lieues, 0)} lieues (${fr(km, 0)} km, ${modes}) en ${fr(jours, 1)} j : il en faudrait ${fr(tNormal, 1)} à l'allure normale, ${fr(tForce, 1)} à marche forcée`;
    }
  } else if (!et.note_verrouillee) delete et.note;
  const cle = verdict || (lentDates ? 'lent_dates' : 'tient');
  cpt[cle]++; bilan[cle]++; total++;
  if (douteux && verdict) bilan.douteux++;
  if (verdict || lentDates) {
    verdicts.push({
      personnage: ent.name, id: ent.id, oeuvre: ent.data.parcours_oeuvre || null, chapitre: et.chapitre || null,
      de, vers: et.lieu, modes, unites: arrondi(unites, 1), km: arrondi(km, 0), lieues: arrondi(lieues, 1),
      jours: arrondi(jours, 2), origine, rythme_lieues: arrondi(lieues / jours, 2), rythme_km: arrondi(km / jours, 1),
      t_normal: arrondi(tNormal, 2), t_force: arrondi(tForce, 2), rapport: arrondi(jours / tNormal, 1),
      verdict: verdict || 'lent_dates', douteux: !!douteux, estimee: segs.some((x) => x.estimee), duree: et.duree || null, citation: et.citation || null,
    });
  }
  if (DETAIL || verdict === 'impossible' || verdict === 'lent' || lentDates) {
    lg.push(`  ${SYMB[verdict] || (lentDates ? '·' : '✓')}${douteux ? '?' : segs.some((x) => x.estimee) ? '◌' : ' '}${ent.name} · ${et.chapitre || ''} · ${de} → ${et.lieu} : ${arrondi(lieues, 0)} lieues ≈ ${arrondi(km, 0)} km (${modes}) en ${arrondi(jours, 1)} j [${origine}] — normal ${arrondi(tNormal, 1)} j, forcé ${arrondi(tForce, 1)} j`);
  }
}
for (const ent of kg.entities) {
  const P = ent.data && ent.data.parcours;
  if (!Array.isArray(P) || !P.length) continue;
  const cpt = { tient: 0, serre: 0, impossible: 0, lent: 0, lent_dates: 0 };
  const lg = [];
  let prec = null;          // dernière étape placée
  let repere = null;        // dernière étape datée : { t, lieu, segs }
  for (const et of P) {
    for (const k of ['distance_lieues', 'rythme', 'verdict', 'jours_dispo', 'fiabilite', 'lenteur']) delete et[k];
    if (!et.note_verrouillee) delete et.note;
    const pos = position(et);
    if (!pos) { bilan.sans_position++; continue; }
    if (et.souvenir) continue;
    if (prec) {
      const mode = et.mode && et.mode !== 'inconnu' ? et.mode : 'marche';
      const eau = MODES_EAU.has(mode);
      const douteux = pos.confiance === 'basse' || prec.pos.confiance === 'basse', estimee = pos.estimee || prec.pos.estimee;
      const seg = (unites, m) => ({ unites, lieues: unites / UPL, mode: m, douteux, estimee });
      // La route tracée (scripts/tracer-routes.js) quand elle existe : la mer qu'on longe,
      // la terre qu'on suit, le bras de mer qu'on passe au bac ou en navire ; sinon la
      // ligne droite majorée.
      const r = et.route;
      let segsEt;
      if (r && r.u != null) {
        if (eau) segsEt = [seg(r.u * (r.fleuve ? 1.15 : 1), mode)];
        else {
          segsEt = [];
          if (r.terre_u > 0 || !(r.eau_u > 0.5)) segsEt.push(seg((r.terre_u || r.u) * (mode === 'autre' ? 1 : DETOUR.route_terre || 1.1), mode));
          if (r.eau_u > 0.5) segsEt.push(seg(r.eau_u, r.eau_u / UPL < 4 ? 'barque' : 'navire'));
        }
      } else segsEt = [seg(Math.hypot(pos.x - prec.pos.x, pos.y - prec.pos.y) * (eau ? DETOUR.eau : DETOUR.terre), mode)];
      const lieues = segsEt.reduce((t, x) => t + x.lieues, 0);
      et.distance_lieues = arrondi(lieues, lieues < 10 ? 1 : 0);
      if (repere) repere.segs.push(...segsEt);
      if (et.jours != null) juger(et, segsEt, +et.jours, cpt, lg, ent, prec.et.lieu, douteux, 'durée annoncée');
      else if (et.t != null && repere && repere.t != null) {
        const jours = +et.t - repere.t;
        et.jours_dispo = arrondi(jours, 2);
        juger(et, repere.segs, jours, cpt, lg, ent, repere.lieu, repere.segs.some((x) => x.douteux), 'écart des dates');
      }
    }
    if (et.t != null) repere = { t: +et.t, lieu: et.lieu, segs: [] };
    prec = { et, pos };
  }
  ent.data.parcours_bilan = cpt;
  lignes.push(`${ent.name} : ${P.length} étapes — tient ${cpt.tient}, serré ${cpt.serre}, impossible ${cpt.impossible}, lent ${cpt.lent}` +
    ` · séjours à dire ${cpt.lent_dates}`, ...lg);
}

console.log(`Échelle : 1 unité de carte = ${arrondi(KPU, 3)} km · 1 lieue = ${ECH.lieue_km} km = ${arrondi(UPL, 2)} unités` +
  ` · détour terre ×${DETOUR.terre}, eau ×${DETOUR.eau} · lent au-delà de ${LENTEUR} fois l'allure normale`);
console.log(`Tronçons jugés : ${total} — tient ${bilan.tient} · serré ${bilan.serre} · impossible ${bilan.impossible} · lent ${bilan.lent}` +
  ` · lent au calendrier (séjours à dire, sans verdict) ${bilan.lent_dates}` +
  ` · sans temps ${bilan.sans_temps} · étapes sans position ${bilan.sans_position}` +
  ` · dont ${bilan.douteux} verdicts « ? » (une extrémité estimée en confiance basse)`);
for (const l of lignes) console.log(l);
if (JSON_OUT) {
  fs.writeFileSync(JSON_OUT, JSON.stringify({ echelle: { km_par_unite: KPU, unites_par_lieue: UPL, lenteur: LENTEUR }, bilan, verdicts }, null, 2) + '\n');
  console.log(`→ ${verdicts.length} verdicts écrits dans ${JSON_OUT}`);
}
if (ECRIRE) {
  fs.writeFileSync(FICHIER, JSON.stringify(kg, null, 2) + '\n');
  console.log('→ data/kg-base.json écrit');
}
