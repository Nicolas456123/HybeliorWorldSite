#!/usr/bin/env node
/**
 * Baelor à l'échelle du monde (décision de l'auteur du 26 septembre 2026 :
 * 1 047 unités de carte = 1 000 km, soit 0,955 km par unité). L'île de la
 * carte fait ~8 × 10 km ; l'échelle ne bouge pas, c'est le texte qui s'adapte.
 *
 * Écrit dans l'Atrium (data/kg-base.json), sans reseed :
 *  - lie-0237 Baeloris : ramenée sur la côte nord (y 251,81 → 251,05, x
 *    inchangé) ; à 0,76 u (730 m) dans les terres, elle quittait sa crique ;
 *  - lie-0003 Baelor : marqueur de la région posé au centre de l'île peinte
 *    (70,4 ; 255,8) au lieu de (70,81 ; 240,35), en mer à 10 u au nord ;
 *  - lie-0238 Thyldris : « Postes d'observation sur 7 lieues de côte » →
 *    « sur toute la côte est » (la côte est fait ~10 km), comme la fiche ;
 *  - lie-0003 : data.arbitrage, trace des décisions de l'échelle pour l'île.
 * La part « continent » du corps de lie-0003 (taille, côte nord, mares de
 * tourbière) se resynchronise avec la fiche par scripts/inscrire-lac-perche.js.
 *
 * Idempotent. Usage : node scripts/baelor-echelle.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const BASE = path.join(__dirname, '..', 'data', 'kg-base.json');
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-09-26T00:00:00.000Z';
function echec(msg) { console.error('✗ ' + msg + ' — rien n\'est écrit'); process.exit(1); }

const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const ent = (id, nom) => {
  const e = doc.entities.find((x) => x.id === id);
  if (!e || e.name !== nom) echec(`${id} n'est pas « ${nom} »`);
  return e;
};
const changes = [];
function poserCoord(e, x, y, correction) {
  if (e.data.coord_x === x && e.data.coord_y === y) return;
  e.data.coord_x = x; e.data.coord_y = y; e.data.correction = correction;
  e.updated_at = NOW; changes.push(`${e.id} ${e.name} → (${x} ; ${y})`);
}
function remplacer(e, avant, apres) {
  if (e.body.includes(apres) && !e.body.includes(avant)) return;
  const n = e.body.split(avant).length - 1;
  if (n !== 1) echec(`${e.id} : « ${avant} » trouvé ${n} fois`);
  e.body = e.body.replace(avant, apres); e.updated_at = NOW;
  changes.push(`${e.id} ${e.name} : « ${avant} » → « ${apres} »`);
}

const baeloris = ent('lie-0237', 'Baeloris');
poserCoord(baeloris, 69.5032136603134, 251.05,
  '2026-09-26 : ramenée sur la côte nord (y 251,81 → 251,05, x inchangé). À l’échelle de 0,955 km/u, 0,76 u la mettait à 730 m dans les terres, loin de la crique où elle est creusée. Hors du contour provisoire de Baelor (monde-contours.json), à terre sur la carte peinte (registre §7 ter).');

const baelor = ent('lie-0003', 'Baelor');
poserCoord(baelor, 70.4, 255.8,
  '2026-09-26 : marqueur posé au centre de l’île peinte (x ≈ 66,2 à 74,6 ; y ≈ 250,6 à 261,0) ; l’ancien, (70,81 ; 240,35), tombait en mer à 10 u au nord.');
const ARB = 'Échelle du monde (décision de l’auteur, 2026-09-26 : 0,955 km par unité ; l’échelle ne bouge pas, le texte s’adapte). ' +
  'L’île fait ~10 km nord-sud sur ~8 est-ouest, une cinquantaine de km² : la fiche disait « ~300 lieues × ~150 » et une côte nord de « ~200 lieues » (corrigé). ' +
  'Pas de lac à l’intérieur : seulement des mares de tourbière de 10 à 50 m ; le seul lac est Ce-qui-rend-le-ciel (lie-1060), perché sur la côte nord-ouest (tranché au canon dominant, la fiche disant « pas de lac noir au cœur de l’île »). ' +
  'Les distances des récits se rapportent à cette taille (registre §14).';
if (baelor.data.arbitrage !== ARB) { baelor.data.arbitrage = ARB; baelor.updated_at = NOW; changes.push('lie-0003 Baelor : data.arbitrage'); }

const thyldris = ent('lie-0238', 'Thyldris');
remplacer(thyldris, 'Postes d\'observation sur 7 lieues de côte', 'Postes d\'observation sur toute la côte est');

const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
changes.forEach((c) => console.log('✓ ' + c));
if (!changes.length) console.log('· rien à changer');
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI || !changes.length) process.exit(0);
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
console.log('✓ data/kg-base.json écrit. Régénère l\'index : npm run kg:index');
