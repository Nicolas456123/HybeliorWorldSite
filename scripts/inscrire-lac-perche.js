#!/usr/bin/env node
/**
 * Inscrit au graphe le lac perché de Baelor, « Ce-qui-rend-le-ciel »
 * (décision de l'auteur du 26 septembre 2026, consignée dans
 * « Canon — décisions et mystères protégés »).
 *
 * Les fiches font foi : le corps de l'entité est tiré de
 * Docs/Lore/Pays/Baelor/Baelor.md (section « ### Ce-qui-rend-le-ciel — … »,
 * rangée à la manière de degrouper-fiches.js) et de
 * Docs/Lore/Pays/Baelor/Baelor - Continent.md (bloc « Le lac perché… » de la
 * Géographie). La part « continent » du corps de Baelor (lie-0003), copie
 * conforme de la fiche, est resynchronisée avec le fichier.
 *
 * Écrit : l'entité lie-1060 (lieu-dit, centre du lac en coordonnée monde
 * (67,35 ; 251,44) : relevé d'abord en (67,15 ; 251,36) sur les tuiles de la
 * carte peinte, recentré pour l'échelle de 0,955 km/u), ses deux rattachements
 * situe-dans (Baelor, Baelor-Prime) et l'alias « Source de l'Éternité »
 * (variante : le nom de la rumeur). Validation par lib/kg-core.js.
 * Idempotent ; aucun reseed.
 *
 * Identifiants : le script a d'abord tourné le 26 septembre sur une base
 * périmée (lie-0970, lnk-3313/3314, ali-0201), numéros pris entre-temps en
 * amont ; réinscrit sur la base à jour avec les suivants de l'allocateur
 * de lib/kg-core.js (le plus grand + 1).
 *
 * Usage : node scripts/inscrire-lac-perche.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const F_PAYS = 'Docs/Lore/Pays/Baelor/Baelor.md';
const F_CONT = 'Docs/Lore/Pays/Baelor/Baelor - Continent.md';
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-09-26T00:00:00.000Z';

const ID = 'lie-1060';
const NOM = 'Ce-qui-rend-le-ciel';
const REL = [
  { id: 'lnk-4020', rel_type: 'situe-dans', from_id: ID, to_id: 'lie-0003' },   // Baelor (île)
  { id: 'lnk-4021', rel_type: 'situe-dans', from_id: ID, to_id: 'pol-0036' },   // Baelor-Prime (nation)
];
const ALIAS = {
  id: 'ali-0239', entity_id: ID, value: 'Source de l\'Éternité', alias_status: 'variante',
  meaning: 'nom de la rumeur des marins étrangers, qui la disent noire et au cœur de l\'île ; le lac en est l\'origine (décision de l\'auteur, 2026-09-26)',
};

const lire = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
const sansFrontmatter = (md) => md.replace(/^﻿?---\n[\s\S]*?\n---\n?/, '').trim();
function echec(msg) { console.error('✗ ' + msg + ' — rien n\'est écrit'); process.exit(1); }

/* ── le corps, tiré des deux fiches ── */
const pays = lire(F_PAYS);
const mCarte = pays.match(/^### Ce-qui-rend-le-ciel — (.+)\n([\s\S]*?)\n(?=### |---)/m);
if (!mCarte) echec('section « ### Ce-qui-rend-le-ciel » introuvable dans ' + F_PAYS);
const cont = lire(F_CONT);
const mGeo = cont.match(/^\*\*Le lac perché de l'angle nord-ouest \(Ce-qui-rend-le-ciel\) :\*\*\n((?:- .*\n)+)/m);
if (!mGeo) echec('bloc « Le lac perché… » introuvable dans ' + F_CONT);

const body = [
  `## ${mCarte[1].trim()}`, '', mCarte[2].trim(), '', '*Extrait de la fiche de Baelor.*', '',
  '## Géographie', '', mGeo[1].trim(), '', '*Extrait de la fiche de Baelor.*', '',
].join('\n');

const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const g = core.mergeGraph(doc, {});

const deja = g.byId.get(ID);
if (deja && deja.name !== NOM) echec(`${ID} est déjà pris par « ${deja.name} »`);
const homonyme = doc.entities.find((e) => e.id !== ID && e.name === NOM);
if (homonyme) echec(`une autre entité porte déjà le nom « ${NOM} » (${homonyme.id})`);

/* ── l'entité ── */
const { ops: opsE } = core.prepareWrite(g, 'save-entity', {
  id: ID, type: 'lieu', name: NOM, slug: null,
  summary: 'Lac perché de l\'angle nord-ouest de Baelor, à une quarantaine de mètres au-dessus de la mer, dont l\'eau claire rend le ciel comme un miroir ; il se jette dans l\'océan par une cascade de même hauteur. Origine de la rumeur de la « Source de l\'Éternité », que les marins étrangers disent noire et au cœur de l\'île.',
  body,
  data: {
    echelle: 'lieu-dit',
    coord_x: 67.35,
    coord_y: 251.44,
    altitude_m: 40,
    source: 'Baelor - Continent.md',
    arbitrage: 'Décision de l\'auteur (2026-09-26) : lac perché inscrit au canon, origine de la rumeur de la Source de l\'Éternité ; miroir du ciel, non lac noir. Nom révisable par l\'auteur.',
    note: 'Centre du lac. Premier relevé sur les tuiles de la carte peinte en (67,15 ; 251,36) ; recentré le 2026-09-26 en (67,35 ; 251,44) pour l\'échelle de 0,955 km/u (décision de l\'auteur) : un lac de ~1,2 × 0,4 km (≈ 1,26 × 0,42 u) centré au premier point mordait sur l\'angle nord-ouest. À terre sur la carte peinte, hors du contour provisoire de Baelor dans monde-contours.json (registre §7 ter).',
  },
  status: 'canon', disclosure: 'interne',
}, NOW);
const rec = opsE[0].record;
if (deja && deja.created_at) rec.created_at = deja.created_at;
if (deja && JSON.stringify({ ...deja, updated_at: 0 }) === JSON.stringify({ ...rec, updated_at: 0 })) rec.updated_at = deja.updated_at;
core.applyOps(g, opsE);

/* ── rattachements et alias ── */
const recsR = REL.map((r) => {
  const { ops } = core.prepareWrite(g, 'save-relation', r);
  const x = ops[0].record;
  if (x.id !== r.id) echec(`relation ${r.rel_type} ${r.from_id}→${r.to_id} déjà présente sous ${x.id}`);
  const autre = g.relations.find((y) => y.id === r.id && (y.from_id !== r.from_id || y.to_id !== r.to_id));
  if (autre) echec(`${r.id} est déjà pris (${autre.from_id}→${autre.to_id})`);
  core.applyOps(g, ops);
  return x;
});
const { ops: opsA } = core.prepareWrite(g, 'save-alias', ALIAS);
const recA = opsA[0].record;
const autreA = doc.aliases.find((a) => a.id === ALIAS.id && a.entity_id !== ID);
if (autreA) echec(`${ALIAS.id} est déjà pris (« ${autreA.value} »)`);

/* ── la part « continent » du corps de Baelor, recopiée de la fiche ── */
const baelor = doc.entities.find((e) => e.id === 'lie-0003');
const tete = `<!-- source: ${F_CONT} -->\n\n`;
const i = baelor.body.indexOf(tete);
if (i < 0) echec('part « continent » introuvable dans le corps de lie-0003');
const debut = i + tete.length;
const fin = baelor.body.indexOf('\n\n---\n\n<!-- source: ', debut);
if (fin < 0) echec('fin de la part « continent » introuvable dans le corps de lie-0003');
const partNeuve = sansFrontmatter(cont);
const corpsNeuf = baelor.body.slice(0, debut) + partNeuve + baelor.body.slice(fin);

/* ── application ── */
function poser(arr, r) {
  const k = arr.findIndex((x) => x.id === r.id);
  if (k >= 0) arr[k] = r; else arr.push(r);
}
poser(doc.entities, rec);
recsR.forEach((r) => poser(doc.relations, r));
poser(doc.aliases, recA);
const corpsChange = corpsNeuf !== baelor.body;
if (corpsChange) { baelor.body = corpsNeuf; baelor.updated_at = NOW; }

const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) {
  rapport.issues.filter((x) => x.severity === 'erreur').slice(0, 10).forEach((x) => console.error('  ', x.message));
  echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
}

console.log(`✓ ${ID} « ${NOM} » : lieu-dit (67,35 ; 251,44), corps ${body.length} car.`);
console.log(`✓ rattachements : ${recsR.map((r) => r.id + ' → ' + r.to_id).join(', ')}`);
console.log(`✓ alias ${recA.id} « ${recA.value} » (${recA.alias_status})`);
console.log(corpsChange ? '✓ lie-0003 : part « continent » du corps resynchronisée avec la fiche' : '· lie-0003 : corps déjà à jour');
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités, ${doc.relations.length} relations, ${doc.aliases.length} alias). Régénère l'index : npm run kg:index`);
