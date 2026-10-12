#!/usr/bin/env node
/**
 * Demande Studio d492ccffc, 2026-10-12 — la Trace Verte (arbitrage de la
 * session principale, délégation D38, carte qui fait foi) : Warenthor étant
 * l'île de la mer intérieure (D50), la Trace Verte qu'on suit à pied depuis
 * Sylthara (Chroniques, ch. 19 et 20) finit par une chaussée ancienne sur les
 * hauts-fonds, de la rive la plus proche (rive haldrienne entre Raldir et
 * Talrin, (−233,0 ; 171,6)) à la pointe ouest de l'île ((−223,8 ; 172,9)),
 * 9,3 u, environ 8,9 km. Les livres restent exacts : rien n'y dit une
 * traversée, et la chaussée est bordée d'arbres.
 * Rappel de D50 (script arbitrer-warenthor-1012.js) :
 *  - Haldria reçoit le lobe sud-ouest (l'aplat « Haldria » de la carte Pays) et
 *    la presqu'île de Ravantis ; le coin nord-ouest (Reckia, Vesperis, Ostram)
 *    reste à Ackerna ; Brystalis reste à Vytharia ;
 *  - Warenthor perd `data.carte.surface_figee` et garde l'île de la mer
 *    intérieure d'Ilthara, où la carte de l'auteur pose tous ses lieux (Wyndor,
 *    Galdris, Fylorin, la région) ; sa fiche « forêt géante du sud » devient
 *    une île forestière.
 * Les positions ne sont pas touchées. data.raccord partout, miroirs Docs.
 * Idempotent, sans reseed. Usage : node scripts/arbitrer-trace-verte-1012.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const MIROIRS = [path.join(ROOT, 'Docs', 'Lore', 'Pays'), path.join(ROOT, 'Docs', 'Lore', 'Histoires'), path.join(ROOT, 'Docs', 'GDD')];
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-12T23:00:00.000Z';
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

/* ═══ La Trace Verte : une chaussée ═══════════════════════════════════════ */
const MOTIF_T = `Warenthor est l'île de la mer intérieure d'Ilthara (D50) ; la Trace Verte des Chroniques (ch. 19 : « On ne descend pas vers Warenthor à cheval. La Trace Verte quitte les moissons de Sylthara », quinze jours à pied ; ch. 20 : « Depuis Warenthor, depuis la voûte d'Ackerna, je marchais sous des arbres ») finit par une chaussée ancienne sur les hauts-fonds, de la rive la plus proche, praticable à pied : les livres restent exacts ; arbitrage de la session principale (délégation D38, la carte fait foi) ; demande Studio d492ccffc ; registre des incohérences, II, §20`;
ent('lie-0926', 'Warenthor');
retouche('lie-0926', 'body',
  'ses rives sont des racines et des vasières plus que des plages, et l\'on n\'y aborde que par les passes que les Marcheurs entretiennent.',
  'ses rives sont des racines et des vasières plus que des plages. On y entre à pied par la chaussée de la Trace Verte ; les barques passent par les chenaux que les Marcheurs entretiennent.\n\n### La Trace Verte\n\nLa Trace Verte descend des moissons de Sylthara, traverse la voûte d\'Ackerna et finit sur une chaussée ancienne, longue d\'environ neuf kilomètres, posée sur les hauts-fonds de la mer intérieure entre la rive haldrienne, entre Raldir et Talrin, et la pointe ouest de l\'île. Des pierres levées la jalonnent de loin en loin. Des arbres ont pris racine entre ses blocs et la bordent presque d\'un bout à l\'autre, si bien qu\'on y marche à couvert et qu\'on voit à peine l\'eau. Par gros temps, la mer passe dessus en plusieurs endroits et l\'on attend qu\'elle se retire. Un cheval n\'y avance pas.',
  MOTIF_T, 'Warenthor.md');
poserData('lie-0926', 'acces', {
  trace_verte: {
    nature: 'chaussée ancienne sur les hauts-fonds de la mer intérieure, bordée d\'arbres, jalonnée de pierres levées',
    de: [-233.0, 171.6], rive: 'Haldria, entre Raldir (lie-0679) et Talrin (lie-0827)',
    a: [-223.8, 172.9], longueur_u: 9.3, longueur_km: 8.9,
    praticable: 'à pied ; quelques passages inondés par gros temps ; pas à cheval',
    amont: 'Sylthara → voûte d\'Ackerna → rive (corps d\'Ilthara, Routes inter-nations)',
    jeu: 'routes 462 : un tronçon de chaussée (chemin de rang 3, sans bac) de la rive à la pointe ouest de l\'île, puis Wyndor',
    methode: 'points les plus proches entre la côte de l\'île et la côte d\'Ilthara (data/monde-contours.json)',
    date: DATE,
  },
}, MOTIF_T);
retouche('lie-0010', 'body',
  '- **Trace Verte** (Sylthara → AckernaVille → Warenthor) — au sud ; impraticable à cheval, parcourue à pied.',
  '- **Trace Verte** (Sylthara → AckernaVille → Warenthor) — au sud ; impraticable à cheval, parcourue à pied ; elle finit par une chaussée ancienne de neuf kilomètres sur les hauts-fonds de la mer intérieure, de la rive haldrienne jusqu\'à l\'île de Warenthor.',
  MOTIF_T);

/* ── garde-fous ── */
for (const id of ['lie-0926', 'lie-0010', 'lie-0695']) {
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
