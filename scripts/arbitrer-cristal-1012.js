#!/usr/bin/env node
/**
 * Demande Studio de5669280 (volet donnees-atrium-jeu), 2026-10-12 — chaînes
 * cristallines d'Ilthara et Dragons d'Aube, Volnir, Serenth, Pyrtara.
 * Délégation de l'auteur (D38 : « je te laisse trancher tout ce qu'il reste en
 * restant cohérent et logique »). Canon dominant, méthode du lot 512
 * (scripts/arbitrer-jeu-1012.js) ; journal au registre des incohérences, II.
 *
 *  1. Chaînes cristallines : au NORD d'Ilthara, en Gryndor (Holvandor,
 *     Pyrendor) ; elles partent de la côte à Holvendar et descendent vers le
 *     sud-est jusqu'aux volcans de Pyrtara (Davoria), où elles plongent.
 *     « À l'ouest » (fiche du continent) est une erreur d'orientation.
 *  2. Dragons d'Aube : à Drakora (SUD-EST, coordonnées de l'auteur), nids des
 *     sommets de Myrthéria ; ils ne « dorment » pas sous les chaînes
 *     cristallines. Le seul dormant est Vey'thar, légende du canyon de Lunaris.
 *     Retirer « dorment sous » ôte aussi une identification que la ligne rouge
 *     de que-0011 interdit (con-0119 : « ce qui dormirait sous Ilthara »).
 *  3. Pyrtara : au NORD-EST d'Ilthara (coordonnées ; C/16 : de Drakora on
 *     repart « vers le nord. Vers Pyrtara ») ; « archipel » est une image.
 *     Drakora est au sud-est, pas au nord-est.
 *  4. Volnir : dans les Hautes-Pierres de Ferrath (Alkaran), position estimée
 *     sur le plateau de Ferrath ; les cristaux luminescents (con-0048) sont à
 *     Volnir seul, pas sur les crêtes d'Ilthara.
 *  5. Serenth : une île (satellite sud d'Ulinor) bordée de falaises noires ;
 *     « les falaises de Serenth » désignent l'île vue de la mer.
 *
 * coord_x/y ne sont jamais touchées. Chaque retouche est tracée dans
 * data.raccord ; les retouches de corps sont reportées dans les miroirs Docs.
 * Idempotent, sans reseed. Usage : node scripts/arbitrer-cristal-1012.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const MIROIRS = [path.join(ROOT, 'Docs', 'Lore', 'Pays'), path.join(ROOT, 'Docs', 'Lore', 'Histoires'), path.join(ROOT, 'Docs', 'GDD')];
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-12T15:00:00.000Z';
const DATE = '2026-10-12';
const D38 = 'demande Studio de5669280 (chaînes cristallines, Dragons d\'Aube, Volnir, Serenth, Pyrtara), délégation de l\'auteur du 2026-10-09 (D38) ; registre des incohérences, II, §18';

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

/* ── miroirs Docs ── */
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
function miroir(avant, apres) {
  let n = 0;
  for (const [p, t] of docsTexte) {
    if (!t.includes(apres) && t.includes(avant)) { docsTexte.set(p, t.split(avant).join(apres)); docsTouches.add(p); n++; }
  }
  return n;
}

/* ── retouches tracées ── */
const journal = [];
const ecrits = [];
function trace(e, champ, avant, pourquoi) {
  e.data = e.data || {};
  e.data.raccord = e.data.raccord || [];
  e.data.raccord.push({ date: DATE, champ, avant, pourquoi });
  e.updated_at = NOW;
}
function retouche(id, champ, avant, apres, pourquoi, avantDocs) {
  const e = ent(id);
  const t = e[champ] || '';
  ecrits.push([id, apres]);
  if (t.includes(apres)) return false;
  if (!t.includes(avant)) echec(`${id} (${e.name}) : texte introuvable dans ${champ} : « ${avant.slice(0, 80)}… »`);
  e[champ] = t.split(avant).join(apres);
  trace(e, champ, avant, pourquoi);
  let m = 0;
  if (champ === 'body') m = miroir(avant, apres) + (avantDocs ? miroir(avantDocs[0], avantDocs[1]) : 0);
  journal.push(`${id} ${e.name} · ${champ}${m ? ` (+ ${m} fiche Docs)` : ''}`);
  return true;
}
function ajouter(id, texte, pourquoi) {
  const e = ent(id);
  ecrits.push([id, texte]);
  const t = e.body || '';
  if (t.includes(texte.trim().slice(0, 200))) return false;
  e.body = t.trim() ? `${t.replace(/\s+$/, '')}\n\n${texte.trim()}\n` : `${texte.trim()}\n`;
  trace(e, 'body', t.trim() ? '(ajout en fin de corps, rien n\'est retiré)' : '(corps vide)', pourquoi);
  journal.push(`${id} ${e.name} · body (ajout)`);
  return true;
}
function poserData(id, chemin, valeur, pourquoi) {
  const e = ent(id);
  e.data = e.data || {};
  const parts = chemin.split('.');
  let o = e.data;
  for (const k of parts.slice(0, -1)) { o[k] = o[k] || {}; o = o[k]; }
  const k = parts[parts.length - 1];
  ecrits.push([id, JSON.stringify(valeur)]);
  if (JSON.stringify(o[k]) === JSON.stringify(valeur)) return false;
  const avant = o[k] === undefined ? '(absent)' : JSON.stringify(o[k]);
  o[k] = valeur;
  trace(e, 'data.' + chemin, avant, pourquoi);
  journal.push(`${id} ${e.name} · data.${chemin}`);
  return true;
}

/* ═══ 1. Chaînes cristallines : au nord, en Gryndor ═══════════════════════ */
ent('lie-0010', 'Ilthara');
const MOTIF_1 = `les coordonnées de l'auteur placent tout ce que les fiches disent de cristallin au NORD d'Ilthara, en Gryndor : Holvendar « taillée dans une montagne de cristal blanc » (lie-0665, −209,1 ; 66,5), Holvandor « montagnes cristallines les plus riches » (lie-0928), Pyrendor « falaises de quartz » et veines (lie-0927), Veylorn « vallée cristalline » (lie-0703) ; C/14 y monte « par un chemin taillé » dans « les montagnes cristallines ». Le résumé du continent (« au nord ») et BIOMES_MAGIQUES (M11, « chaînes du nord ») le disent déjà ; « à l'ouest » était une erreur d'orientation (Ackerna, à l'ouest, n'a pas de cristal). « Plongeant vers Pyrtara » est gardé dans le bon sens : la chaîne descend au sud-est vers les volcans de Davoria (Pyrtara) ; ${D38}`;
retouche('lie-0010', 'body',
  '- **Ouest** — chaînes montagneuses cristallines, plongeant vers l\'archipel volcanique de Pyrtara.',
  '- **Nord (Gryndor)** — chaînes montagneuses cristallines, de la côte de Holvendar vers le sud-est, plongeant vers les volcans de Pyrtara, au nord-est du continent.',
  MOTIF_1);
retouche('lie-0010', 'body',
  '**Biomes :** montagnes cristallines (ouest) · archipel volcanique (Pyrtara)',
  '**Biomes :** montagnes cristallines (nord, Gryndor) · archipel volcanique (Pyrtara, nord-est)',
  MOTIF_1);

/* ═══ 2. Dragons d'Aube : Drakora, au sud-est ═════════════════════════════ */
const MOTIF_2 = `les Dragons d'Aube vivent à Drakora (pol-0010 : « refuge des derniers Dragons d'Aube », nids qui « couronnaient chaque sommet », plus grands nids en Myrthéria ; C/16 : Nid Royal de Myrthorin) ; Drakora est au SUD-EST d'Ilthara par les coordonnées de l'auteur (−143,5 ; 219,5), ~120 u au sud de Gryndor (C/16 : on passe le col « le vent du nord dans le dos »), en terres brûlées sans cristal. Rien ne place de dragon sous les chaînes cristallines du nord. Le seul dragon dit endormi est Vey'thar, légende du canyon de Lunaris (ter-0041, C/16). « Dorment sous les chaînes cristallines » faisait aussi converger les dragons vers « ce qui dormirait sous Ilthara » (con-0119), identification que la ligne rouge de que-0011 interdit à tout narrateur ; ${D38}`;
retouche('lie-0010', 'body',
  '- **Nord-est** — montagnes de Drakora, refuge des derniers Dragons d\'Aube.',
  '- **Sud-est** — montagnes de Drakora, refuge des derniers Dragons d\'Aube.',
  MOTIF_2);
retouche('lie-0010', 'body',
  '· montagnes du nord-est (Drakora).',
  '· montagnes du sud-est (Drakora).',
  MOTIF_2);
retouche('lie-0010', 'body',
  'Au nord, **les chaînes cristallines** dressent leurs pics translucides comme une longue méditation minérale ; sous ces montagnes dorment les Dragons d\'Aube. À l\'ouest, **l\'archipel volcanique** où se tient Pyrtara fume en permanence ; on y naît avec un goût de cendre qu\'on ne perdra jamais.',
  'Au nord, **les chaînes cristallines** dressent leurs pics translucides comme une longue méditation minérale ; Gryndor y a taillé sa capitale et ses bibliothèques. Au nord-est, là où ces chaînes plongent, **l\'archipel volcanique** où se tient Pyrtara fume en permanence : des volcans semés sur la terre ferme comme des îles sur la mer, reliés par des coulées figées ; on y naît avec un goût de cendre qu\'on ne perdra jamais.',
  `${MOTIF_1} ; ${MOTIF_2}`);
retouche('lie-0010', 'body',
  'on y voit ce qu\'on s\'attendait à voir, et parfois autre chose, et l\'on n\'apprend jamais à distinguer.',
  'on y voit ce qu\'on s\'attendait à voir, et parfois autre chose, et l\'on n\'apprend jamais à distinguer. À l\'extrême sud-est, enfin, les montagnes noires de **Drakora**, chaudes par-dessous, portent sur leurs sommets les nids des derniers Dragons d\'Aube.',
  MOTIF_2);
retouche('lie-0010', 'body',
  'Cristaux de Drakora, essences d\'Ackerna',
  'Cristaux de Pyrendor, essences d\'Ackerna',
  `les cristaux d'Ilthara viennent des mines de Pyrendor, en Gryndor (Veylorn, lie-0703 : « principal fournisseur de cristaux bruts du royaume ») ; Drakora exporte écailles, acier draconique et pierres de feu (pol-0010) ; ${D38}`);

poserData('lie-0010', 'carte.chaines_cristallines', {
  nom: 'chaînes cristallines d\'Ilthara',
  pays: 'Gryndor (pol-0011)',
  regions: ['Holvandor (lie-0928)', 'Pyrendor (lie-0927)'],
  axe: [[-210, 61], [-208, 64], [-204, 69], [-201, 75], [-199, 81], [-196, 86]],
  longueur_km: 27.5,
  largeur_u: 8,
  coeur: { x: -208, y: 64, nature: 'montagne de cristal blanc de Holvendar (lie-0665) : filons de quartz les plus denses' },
  jalons: ['Holvendar (lie-0665), au pied nord-ouest, près de la côte', 'Veylorn (lie-0703), vallée cristalline et mines au cœur de la chaîne', 'falaises de quartz de Pyrendor (lie-0927) sur le versant sud'],
  fin: 'plongent au sud-est vers les volcans de Davoria (Pyrtara) : Rydelith (lie-0828) est accroché à un volcan dormant au bout de la chaîne',
  dragons: 'aucun ; les Dragons d\'Aube sont à Drakora (esp-0008)',
  motif: 'Axe tiré des lieux cristallins de Gryndor, tous à terre (contours du site) : de la côte au nord-ouest de Holvendar jusqu\'à la limite de Pyrtara. Largeur : bande de crêtes et de vallées de ~8 u. Veines de cristal (F11) sur les crêtes, peu communes, denses au cœur de Holvendar.',
  confiance: 'moyenne',
  methode: 'indices',
  source: 'fiches lie-0665, lie-0928, lie-0927, lie-0703, lie-0828 ; C/14 ; demande de5669280',
}, MOTIF_1);

ent('esp-0008', 'Les Dragons d\'Aube');
retouche('esp-0008', 'summary',
  'Créatures qui dorment sous les chaînes cristallines d\'Ilthara ; jamais domestiquées, elles sont liées pour la vie à leurs Liés par le Pacte du Souffle, à Drakora',
  'Créatures des montagnes de Drakora, au sud-est d\'Ilthara, qui nichent sur les sommets de Myrthéria ; jamais domestiquées, elles sont liées pour la vie à leurs Liés par le Pacte du Souffle',
  MOTIF_2);
ajouter('esp-0008', `## Habitat

Les Dragons d'Aube vivent à Drakora, au sud-est d'Ilthara, et nulle part ailleurs. Avant les humains, leurs nids couronnaient chaque sommet de ces montagnes de pierre noire, chaudes par-dessous ; aujourd'hui les plus grands sont en Myrthéria, autour de Myrthorin, dont le Nid Royal domine la cité, et les plateaux lisses des sommets leur servent d'aires de repos, au-dessus d'Obryalis notamment. Ils ne hantent pas les chaînes cristallines du nord, qui sont le pays de Gryndor et de ses mineurs.

Le seul dragon que les Drakoriens disent endormi est Vey'thar, le Dormant, que leurs légendes placent dans les profondeurs du canyon de Lunaris ; aucune expédition récente n'a confirmé sa présence.`, MOTIF_2);
poserData('esp-0008', 'carte.aire', {
  pays: 'Drakora (pol-0010)',
  centre: { x: -143.5, y: 219.5 },
  nids: [
    { lieu: 'Myrthorin (lie-0661), Nid Royal', x: -160.5, y: 195.2 },
    { lieu: 'aires de repos au-dessus d\'Obryalis (lie-0846)', x: -167.9, y: 204.9 },
  ],
  dormant: { nom: 'Vey\'thar (ter-0041)', lieu: 'canyon de Lunaris (lie-0847)', x: -167.9, y: 220.5, statut: 'légende drakorienne, jamais confirmée' },
  hors_aire: 'chaînes cristallines de Gryndor (lie-0010 data.carte.chaines_cristallines) : aucun dragon',
  motif: 'Nids sur les sommets de Myrthéria (pol-0010) ; terres brûlées de Drakora (M8 de BIOMES_MAGIQUES), plateaux de repos (F13).',
  source: 'pol-0010, lie-0661, lie-0846, lie-0847, ter-0041 ; C/16 ; demande de5669280',
}, MOTIF_2);

/* ═══ 3. Pyrtara au nord-est, Drakora au sud-est ══════════════════════════ */
const MOTIF_3 = `coordonnées de l'auteur : Pyrtara (−166,1 ; 95,0) au nord-est d'Ilthara, à l'est-sud-est de Gryndor et ~125 u au nord de Drakora (C/16 : de Drakora, Sorin « repart vers le nord » vers Pyrtara) ; Drakora (−143,5 ; 219,5) au sud-est ; Lythar (−169,4 ; 171,0) a donc Gryndor et Pyrtara au nord et Drakora au sud-est ; ${D38}`;
retouche('pol-0010', 'summary',
  'Nation montagneuse du nord-est d\'Ilthara',
  'Nation montagneuse du sud-est d\'Ilthara',
  MOTIF_3);
retouche('pol-0013', 'body',
  'Gryndor a l\'ouest, Pyrtara au sud-ouest, Drakora au nord-est',
  'Gryndor et Pyrtara au nord, Drakora au sud-est',
  MOTIF_3,
  ['Gryndor à l\'ouest, Pyrtara au sud-ouest, Drakora au nord-est', 'Gryndor et Pyrtara au nord, Drakora au sud-est']);
poserData('pol-0012', 'carte.situation', {
  ou: 'nord-est d\'Ilthara, sur la terre ferme : à l\'est-sud-est de Gryndor, au nord de Lythar et de Drakora',
  archipel: 'image : « archipel de volcans actifs reliés par des ponts de lave solidifiée » désigne des volcans semés sur la terre ferme, reliés par des coulées figées ; aucune île sur le tracé des côtes',
  motif: 'Un texte de la fiche du continent la plaçait « à l\'ouest » : erreur d\'orientation, tranchée pour les coordonnées.',
  date: DATE,
}, MOTIF_3);

/* ═══ 4. Volnir et ses cristaux : Ferrath, pas Ilthara ════════════════════ */
ent('lie-0173', 'Volnir');
const MOTIF_4 = `Volnir est une ville des Hautes-Pierres de Ferrath (lie-0173, situe-dans pol-0003), « région nord-ouest » à la frontière d'Iskara (fiche Ferrath) ; ses cristaux (con-0048) sont « exportés dans toute Alkaran » et n'ont rien à voir avec les crêtes d'Ilthara, auxquelles BIOMES_MAGIQUES les rattachait (M11) ; ${D38}`;
poserData('lie-0173', 'carte.position_estimee', {
  x: 219, y: 14, confiance: 'basse', methode: 'rattachement seul',
  terre: 'Endora',
  motif: 'Hautes-Pierres = nord-ouest de Ferrath, à la frontière d\'Iskara (fiche Ferrath). Posée au nord-ouest de la position estimée de Ferrath (229 ; 17), à ~14 u à l\'est de Feldoris (Iskara) et à ~6 u de la côte du golfe. La terre physique est celle qu\'Iskara partage avec Endora ; l\'appartenance reste Ferrath, nation d\'Alkaran (comme Iskara).',
  source: 'fiche pol-0003 (Hautes-Pierres, frontière d\'Iskara gardée par Selthar) ; demande de5669280',
}, MOTIF_4);
ajouter('con-0048', `## Où

Les cristaux luminescents ne se trouvent qu'à Volnir, dans les Hautes-Pierres de Ferrath, et seulement dans quelques galeries. Les crêtes cristallines d'Ilthara n'ont rien de semblable : leurs filons de quartz chantent au vent, ils ne brillent pas dans le noir.`, MOTIF_4);
poserData('con-0048', 'lieu', { lieu: 'Volnir (lie-0173)', pays: 'Ferrath (pol-0003)', region: 'Hautes-Pierres', pas: 'crêtes cristallines d\'Ilthara', date: DATE }, MOTIF_4);

/* ═══ 5. Serenth : une île à falaises ═════════════════════════════════════ */
ent('lie-0063', 'Serenth');
const MOTIF_5 = `la fiche d'Ulinor (lie-0013) range Serenth parmi les « îles satellites » (sud : falaises, Grottes de Cristal) et parle de « l'île de Serenth » ; la fiche de Serenth dit « île aux falaises noires » : les deux se lisent ensemble, « les falaises de Serenth » sont l'île vue de la mer ; ${D38}`;
retouche('lie-0013', 'summary',
  'les falaises de Serenth (Grottes de Cristal)',
  'l\'île de Serenth et ses falaises (Grottes de Cristal)',
  MOTIF_5);
ajouter('lie-0063', `## Site

Serenth est une île, la plus méridionale de l'archipel d'Ulinor, séparée de l'île principale par un bras de mer. Ses côtes sont des falaises noires que les marins longent de loin ; les Grottes de Cristal s'ouvrent dans ces falaises et s'enfoncent sous l'île. Quand on parle des falaises de Serenth, c'est de l'île qu'on parle, telle qu'on la voit du large.`, MOTIF_5);
poserData('lie-0063', 'carte.nature', {
  nature: 'île bordée de falaises',
  rattachement: 'Ulinor (lie-0013), île satellite du sud',
  trace: 'aucune île à son nom sur le tracé des côtes (continents-trace.svg) ; pas de position inventée',
  date: DATE,
}, MOTIF_5);

/* ── garde-fous ── */
const INTERDITS = /atrium|glace qui refuse|temp[êe]tes? vivantes? magiques?|l'envers|lacs?[- ]miroirs?|champignons? g[ée]ants?|dessous du fond|Panghor|Profondeur Premi|le fond\b/i;
for (const [id, txt] of ecrits) {
  if (INTERDITS.test(txt)) echec(`${id} : le texte neuf contient un élément proscrit : « ${txt.match(INTERDITS)[0]} »`);
}
const e8 = byId.get('esp-0008');
if (/dorm/i.test(e8.summary)) echec('esp-0008 : le résumé parle encore de sommeil');
for (const id of ['lie-0010', 'pol-0010', 'pol-0012', 'pol-0013']) {
  const d = byId.get(id).data;
  if (d.coord_x == null || d.coord_y == null) echec(`${id} : coord_x/y perdues`);
}
const q = byId.get('que-0011');
if (!q || !q.data || !q.data.verite || !q.data.verite.ligne_rouge) echec('que-0011 : vérité ou ligne rouge absente');
const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) {
  rapport.issues.filter((x) => x.severity === 'erreur').slice(0, 10).forEach((x) => console.error('  ', x.message));
  echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
}
console.log(`✓ retouches (${journal.length}) :`); journal.forEach((j) => console.log('   ' + j));
console.log(`✓ fiches Docs touchées : ${[...docsTouches].map((p) => path.relative(ROOT, p)).join(', ') || 'aucune'}`);
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
if (fs.readFileSync(BASE, 'utf8') !== brutBase) echec('data/kg-base.json a changé pendant le calcul (autre session) : relancer');
if (journal.length) doc._meta.updated_at = NOW;
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
for (const p of docsTouches) fs.writeFileSync(p, docsCRLF.get(p) ? docsTexte.get(p).replace(/\n/g, '\r\n') : docsTexte.get(p));
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités). Ensuite : npm run kg:db`);
