#!/usr/bin/env node
/**
 * Demande Studio d492ccffc (volet donnees-atrium-jeu), 2026-10-12 — décision
 * D50 de l'auteur, suite de D47 (Haldria au sud-ouest d'Ilthara) :
 *  - Haldria reçoit le lobe sud-ouest (l'aplat « Haldria » de la carte Pays) et
 *    la presqu'île de Ravantis ; le coin nord-ouest (Reckia, Vesperis, Ostram)
 *    reste à Ackerna ; Brystalis reste à Vytharia ;
 *  - Warenthor perd `data.carte.surface_figee` et garde l'île de la mer
 *    intérieure d'Ilthara, où la carte de l'auteur pose tous ses lieux (Wyndor,
 *    Galdris, Fylorin, la région) ; sa fiche « forêt géante du sud » devient
 *    une île forestière.
 * Les positions ne sont pas touchées. data.raccord partout, miroirs Docs.
 * Idempotent, sans reseed. Usage : node scripts/arbitrer-warenthor-1012.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const MIROIRS = [path.join(ROOT, 'Docs', 'Lore', 'Pays'), path.join(ROOT, 'Docs', 'Lore', 'Histoires'), path.join(ROOT, 'Docs', 'GDD')];
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-12T21:00:00.000Z';
const DATE = '2026-10-12';
const D50 = 'décision de l\'auteur du 2026-10-12 (D50, suite de D47) : Haldria prend le lobe sud-ouest et la presqu\'île de Ravantis, Warenthor garde son île de la mer intérieure, où sont tous ses lieux ; demande Studio d492ccffc ; registre des incohérences, II, §20';

function echec(msg) { console.error('✗ ' + msg + ' — rien n\'est écrit'); process.exit(1); }
const brutBase = fs.readFileSync(BASE, 'utf8');
const doc = JSON.parse(brutBase);
const byId = new Map(doc.entities.map((e) => [e.id, e]));
const ent = (id, nom) => {
  const e = byId.get(id);
  if (!e) echec(`${id} absent`);
  if (nom && e.name !== nom) echec(`${id} n'est pas ${nom} (${e.name})`);
  return e;
};

const fichiers = [];
for (const racine of MIROIRS) {
  if (!fs.existsSync(racine)) continue;
  (function lister(dir) {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) lister(p); else if (f.name.endsWith('.md')) fichiers.push(p);
    }
  })(racine);
}
const docsCRLF = new Map();
const docsTexte = new Map(fichiers.map((p) => {
  const brut = fs.readFileSync(p, 'utf8');
  docsCRLF.set(p, brut.includes('\r\n'));
  return [p, brut.replace(/\r\n/g, '\n')];
}));
const docsTouches = new Set();
function miroir(avant, apres, seul) {
  let n = 0;
  for (const [p, t] of docsTexte) {
    if (seul && !p.split(path.sep).join('/').includes(seul)) continue;
    if (!t.includes(apres) && t.includes(avant)) { docsTexte.set(p, t.split(avant).join(apres)); docsTouches.add(p); n++; }
  }
  return n;
}
const journal = [];
function trace(e, champ, avant, pourquoi) {
  e.data = e.data || {};
  e.data.raccord = e.data.raccord || [];
  e.data.raccord.push({ date: DATE, champ, avant, pourquoi });
  e.updated_at = NOW;
}
function retouche(id, champ, avant, apres, pourquoi, seul) {
  const e = ent(id);
  const t = e[champ] || '';
  if (t.includes(apres)) return false;
  if (!t.includes(avant)) echec(`${id} (${e.name}) : texte introuvable dans ${champ} : « ${avant.slice(0, 80)}… »`);
  e[champ] = t.split(avant).join(apres);
  trace(e, champ, avant, pourquoi);
  const m = champ === 'body' ? miroir(avant, apres, seul) : 0;
  journal.push(`${id} ${e.name} · ${champ}${m ? ` (+ ${m} fiche Docs)` : ''}`);
  return true;
}
function poserData(id, chemin, valeur, pourquoi) {
  const e = ent(id);
  e.data = e.data || {};
  const parts = chemin.split('.');
  let o = e.data;
  for (const k of parts.slice(0, -1)) { o[k] = o[k] || {}; o = o[k]; }
  const k = parts[parts.length - 1];
  if (JSON.stringify(o[k]) === JSON.stringify(valeur)) return false;
  const avant = o[k] === undefined ? '(absent)' : JSON.stringify(o[k]);
  o[k] = valeur;
  trace(e, 'data.' + chemin, avant, pourquoi);
  journal.push(`${id} ${e.name} · data.${chemin}`);
  return true;
}

/* ═══ Warenthor : une île forestière ══════════════════════════════════════ */
const W = ent('pol-0015', 'Warenthor');
ent('lie-0926', 'Warenthor');
const MOTIF_W = `la carte de l'auteur pose Wyndor (lie-0695), Galdris (lie-0843), Fylorin (lie-0844) et la région (lie-0926) sur l'île de la mer intérieure d'Ilthara (environ 10 km de côté), et l'aplat du sud-ouest porte le nom « Haldria » ; ${D50}`;
retouche('pol-0015', 'summary', 'Monarchie tribale de la forêt géante du sud d\'Ilthara :', 'Monarchie tribale d\'une île forestière de la mer intérieure d\'Ilthara, au sud du continent :', MOTIF_W);
retouche('lie-0926', 'summary', 'Unique région du royaume : une taïga', 'Unique région du royaume, une île de la mer intérieure d\'Ilthara couverte d\'une taïga', MOTIF_W);
retouche('lie-0926', 'body', '- Unique région : englobe l\'ensemble du territoire, une forêt continue sans divisions naturelles évidentes.', '- Unique région : englobe l\'ensemble du territoire, une île d\'une dizaine de kilomètres de côté au milieu de la mer intérieure d\'Ilthara, couverte d\'une forêt continue sans divisions naturelles évidentes ; ses rives sont des racines et des vasières plus que des plages, et l\'on n\'y aborde que par les passes que les Marcheurs entretiennent.', MOTIF_W, 'Warenthor.md');
{
  const c = (W.data && W.data.carte) || {};
  if (c.surface_figee || !c.nature) {
    const neuve = {
      nature: 'île forestière de la mer intérieure d\'Ilthara',
      surface: 'côte de son île (repli « côte d\'île » de scripts/extract-pays.js)',
      date: DATE,
      qui: 'décision de l\'auteur du 2026-10-12 (D50)',
      historique_1409: {
        surface: c.surface || null,
        surface_figee_motif: c.surface_figee_motif || null,
        date: c.date || null,
        qui: c.qui || null,
        levee_le: DATE,
      },
    };
    poserData('pol-0015', 'carte', neuve, MOTIF_W);
  }
}

/* ═══ Haldria : sa surface est décidée ════════════════════════════════════ */
const H = ent('pol-0017', 'Haldria');
{
  const c = JSON.parse(JSON.stringify(H.data.carte));
  const motif = 'Haldria est au sud-ouest d\'Ilthara, là où la carte de l\'auteur pose Hekorinth, ses villes et ses régions ; le marqueur d\'origine de la nation est rendu tel quel. Surface (D50) : l\'aplat « Haldria » de la carte Pays et la presqu\'île de Ravantis ; le coin nord-ouest (Reckia, Vesperis, Ostram) reste à Ackerna, Brystalis à Vytharia.';
  if (c.motif !== motif) { c.motif = motif; c.surface = 'aplat « Haldria » de « Hybelior Pays.png » + presqu\'île de Ravantis, rognés aux côtes et à Ackerna (D50)'; poserData('pol-0017', 'carte', c, D50); }
}
poserData('pol-0017', 'carte.surface_figee', true, D50 + ' ; surface tracée par scripts/surface-haldria-d50.js');
poserData('pol-0017', 'carte.surface_figee_motif', 'Décision de l\'auteur du 2026-10-12 (D50) : la surface réunit deux aplats de « Hybelior Pays.png » (l\'aplat « Haldria » et la presqu\'île de Ravantis, aplat brun sans nom) et suit les frontières tiretées relevées à la main (Ackerna au nord-ouest, Vytharia à l\'est, Brystalis exclue). Une ré-extraction ne peut pas reproduire ce geste : elle reprend la surface en place ; pour la refaire, relancer scripts/surface-haldria-d50.js.', D50);

/* ── garde-fous ── */
if (W.data.carte.surface_figee) echec('Warenthor : surface_figee encore là');
for (const id of ['pol-0015', 'lie-0926', 'lie-0695', 'lie-0843', 'lie-0844']) {
  const a = JSON.parse(brutBase).entities.find((e) => e.id === id).data;
  const b = byId.get(id).data;
  if (a.coord_x !== b.coord_x || a.coord_y !== b.coord_y) echec(`${id} : position touchée`);
}
const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
console.log(`✓ retouches (${journal.length}) :`); journal.forEach((j) => console.log('   ' + j));
console.log(`✓ fiches Docs touchées : ${[...docsTouches].map((p) => path.relative(ROOT, p)).join(', ') || 'aucune'}`);
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
if (fs.readFileSync(BASE, 'utf8') !== brutBase) echec('data/kg-base.json a changé pendant le calcul : relancer');
if (journal.length) doc._meta.updated_at = NOW;
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
for (const p of docsTouches) fs.writeFileSync(p, docsCRLF.get(p) ? docsTexte.get(p).replace(/\n/g, '\r\n') : docsTexte.get(p));
console.log(`✓ data/kg-base.json écrit. Ensuite : npm run kg:db`);
