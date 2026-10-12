#!/usr/bin/env node
/**
 * Demande Studio dd6df7db1 (volet donnees-atrium-jeu), 2026-10-12 — arbitrage
 * des écarts relevés par les lots du jeu 462 (routes et rivières d'Ilthara) et
 * 510 (masques). Délégation de l'auteur (D38 : « je te laisse trancher tout ce
 * qu'il reste en restant cohérent et logique »). Canon dominant, méthode du
 * chantier 487 ; journal au registre des incohérences, II, §17.
 *
 *  1. Ostram (lie-0722) : la carte peinte de l'auteur (tuiles n14) pose le
 *     pictogramme du village sur la rive sud-est d'un lac allongé ; la
 *     coordonnée relevée tombe au milieu du lac (erreur de relevé de ~3 u).
 *     Village de rive, grottes dans la berge : data.carte.position_estimee.
 *  2. Nectoria (lie-0693) : même cas (pictogramme sur la rive sud-est de son
 *     lac). Les livres en font un port de mer (C/27, arrivée par navire) : sa
 *     marine est sur la côte de la mer intérieure (data.carte.port).
 *  3. Iliara (lie-0941) : le plan des biomes (D23) fait le fond (taïga) ; les
 *     « prairies fleuries » deviennent des prairies ouvertes dans la taïga
 *     (zone locale, D21), comme la « steppe » de Lythar au 487.
 *  4. Obryalis (lie-0846) : un col est un passage ; chemin muletier (rang 3)
 *     depuis Myrthorin, pas une route (data.acces).
 *
 * coord_x/y ne sont jamais touchées (repère de l'auteur ; elles priment pour
 * les trajets). Chaque retouche est tracée dans data.raccord ; la retouche de
 * corps d'Iliara est reportée dans Docs/Lore/Pays. Idempotent, sans reseed.
 * Usage : node scripts/arbitrer-jeu-1012.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const PAYS = path.join(ROOT, 'Docs', 'Lore', 'Pays');
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-12T12:00:00.000Z';
const DATE = '2026-10-12';
const D38 = 'demande Studio dd6df7db1 (lots du jeu 462 et 510), délégation de l\'auteur du 2026-10-09 (D38) ; registre des incohérences, II, §17';

function echec(msg) { console.error('✗ ' + msg + ' — rien n\'est écrit'); process.exit(1); }

const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const byId = new Map(doc.entities.map((e) => [e.id, e]));
const ent = (id, nom) => {
  const e = byId.get(id);
  if (!e) echec(`${id} absent`);
  if (nom && e.name !== nom) echec(`${id} n'est pas ${nom} (${e.name})`);
  return e;
};

/* ── miroirs Docs/Lore/Pays ── */
const fichiers = [];
(function lister(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) lister(p); else if (f.name.endsWith('.md')) fichiers.push(p);
  }
})(PAYS);
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
function retouche(id, champ, avant, apres, pourquoi) {
  const e = ent(id);
  const t = e[champ] || '';
  ecrits.push([id, apres]);
  if (t.includes(apres)) return false;
  if (!t.includes(avant)) echec(`${id} (${e.name}) : texte introuvable dans ${champ} : « ${avant.slice(0, 80)}… »`);
  e[champ] = t.split(avant).join(apres);
  trace(e, champ, avant, pourquoi);
  const m = champ === 'body' ? miroir(avant, apres) : 0;
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
/* pose data[cle] (ou data.carte[sous]) ; idempotent */
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

/* ═══ 1. Ostram : village de rive ═════════════════════════════════════════ */
ent('lie-0722', 'Ostram');
const CARTE = 'carte peinte de l\'auteur (HybeliorFull/HybeliorMap_files/14), relue le 2026-10-12';
retouche('lie-0722', 'summary',
  'Village de champignonnistes d’Ackerna, dans des grottes à mousse luminescente ;',
  'Village de champignonnistes d’Ackerna, au bord d’un lac de Reckia, dans des grottes à mousse luminescente ;',
  `le lot 462 trouvait Ostram « en mer » (1,8 km de la terre) : sa coordonnée tombe au milieu d'un lac peint par l'auteur, mais le pictogramme du village est sur la rive sud-est (${CARTE}) ; village de rive, pas lacustre ; ${D38}`);
ajouter('lie-0722', `## Site

Ostram tient la rive sud-est d'un lac étroit et long d'une dizaine de kilomètres, au creux des collines de Reckia. Les grottes s'ouvrent dans la berge, à quelques pas de l'eau, et s'enfoncent plus bas que la surface du lac : c'est lui qui leur donne l'air humide et tiède que cherchaient les premiers malades, et la brume qui en monte au petit jour couvre le village une bonne partie de l'année. Le village est sur la terre ferme : ni pilotis, ni île.`,
  `site d'après la carte de l'auteur (pictogramme sur la rive sud-est du lac) ; les grottes, l'air humide et la brume de Reckia (« attribuée aux esprits de l'eau », lie-0957) en sont la suite logique ; ${D38}`);
poserData('lie-0722', 'carte.position_estimee', {
  x: -302.2, y: 146.55, confiance: 'moyenne', methode: 'carte',
  terre: 'Ilthara',
  motif: 'Centre du pictogramme d\'Ostram sur la carte peinte de l\'auteur : rive sud-est d\'un lac allongé (≈ 5 × 11 km). La coordonnée relevée (-303,5 ; 143,4) tombe au milieu de ce lac, 3,3 u plus au nord-ouest : erreur de relevé, gardée dans coord_x/y (repère de l\'auteur). Pour le jeu : le village touche l\'eau sur la rive sud-est la plus proche de ce point (lac lac-09 du lot 462).',
  source: `${CARTE} ; demande dd6df7db1`,
}, D38);

/* ═══ 2. Nectoria : ville de rive, marine sur la mer intérieure ═══════════ */
ent('lie-0693', 'Nectoria');
ajouter('lie-0693', `## Site

Nectoria s'étend sur la rive sud-est d'un lac de Nectaris, ses jardins descendant jusqu'à l'eau. Les navires venus d'Onara, d'Evertia ou de Lunasar ne remontent pas jusque-là : ils accostent à la marine de Nectoria, sur la côte de la mer intérieure, une demi-journée de marche au nord-ouest, d'où une route monte vers la ville. Pour un étranger, c'est pourtant là que Nectoria commence : à la marine, on parle déjà des jardins.`,
  `la carte de l'auteur pose le pictogramme de Nectoria sur la rive sud-est d'un lac, à ~16 km de la mer intérieure (${CARTE}) ; les livres en font un port de mer (C/27 : « L'odeur arrive depuis la mer avant la côte », arrivée par navire ; parcours de Sorin, étape 76) et Sondaris (lie-0594), port de Lunasar, commerce avec elle : la ville est sur le lac, son port est sa marine (comme Athènes et le Pirée) ; ${D38}`);
poserData('lie-0693', 'carte.position_estimee', {
  x: -188.7, y: 206.75, confiance: 'moyenne', methode: 'carte',
  terre: 'Ilthara',
  motif: 'Centre du pictogramme de Nectoria sur la carte peinte de l\'auteur : rive sud-est de son lac. La coordonnée relevée (-190,3 ; 204,1) tombe dans le lac (1,1 km de la rive au lot 462, 1,6 u dans les contours du site) : erreur de relevé, gardée dans coord_x/y. Pour le jeu : la ville touche l\'eau sur la rive sud-est (lac lac-15 du lot 462).',
  source: `${CARTE} ; demande dd6df7db1`,
}, D38);
poserData('lie-0693', 'carte.port', {
  nom: 'marine de Nectoria', x: -196.2, y: 192.2, confiance: 'basse', methode: 'indices',
  motif: 'Point de la côte de la mer intérieure le plus proche de Nectoria (contours du site), 0,5 u dans les terres ; ≈ 16 km de la ville, une route les relie. Les navires de C/27 y accostent.',
  indices: ['C/27 : « L\'odeur arrive depuis la mer avant la côte »', 'C/27 : arrivée par navire, quinzième jour depuis Evertia', 'lie-0594 Sondaris, port de Lunasar : « pêche et commerce avec Tyndara et Nectoria »'],
  source: 'demande dd6df7db1',
}, D38);

/* ═══ 3. Iliara : prairies fleuries dans la taïga ═════════════════════════ */
ent('lie-0941', 'Iliara');
const MOTIF_3 = `plan des biomes de l'auteur (D23, validé) : taïga sur toute la région, toundra au sud ; le masque 461 a raison. Le détail de la fiche devient une zone locale (D21) : de grandes prairies ouvertes dans la taïga, comme la « steppe » de Lythar (chantier 487, registre II §16, 3a) ; ${D38}`;
retouche('lie-0941', 'summary',
  'collines et prairies fleuries de la tribu du Vent-Doré',
  'collines où la taïga s’ouvre en prairies fleuries, terre de la tribu du Vent-Doré',
  MOTIF_3);
retouche('lie-0941', 'body',
  'Région méridionale ; collines douces et prairies fleuries, la plus paisible de Lythar.',
  'Région méridionale ; collines douces où la taïga s\'ouvre en prairies fleuries, la plus paisible de Lythar.',
  MOTIF_3);
ajouter('lie-0941', `## Paysage

Sur les croupes et les versants tournés au soleil, la forêt de conifères recule et laisse de grandes prairies que l'été, court, couvre de fleurs ; la taïga garde les creux et les versants nord. Les moutons du Vent-Doré y paissent de la fonte des neiges aux premières gelées, et c'est dans ces prés que se cueillent les herbes médicinales qui font la réputation d'Illythia.`, MOTIF_3);
poserData('lie-0941', 'zone_locale', {
  nature: 'prairies fleuries ouvertes dans la taïga (clairières de croupe et de versant sud)',
  fond: 'taïga (plan D23)',
  centre: { x: -178.5, y: 185.5 }, rayon_u: 8, part_ouverte: 0.55,
  motif: 'Couvre les collines entre Illythia (lie-0694) et le repère de la région ; s\'arrête avant la toundra du sud (y ≈ 197). Prairies sur les croupes et les versants sud, taïga dans les creux et au nord, lisières irrégulières.',
  date: DATE,
}, MOTIF_3);

/* ═══ 4. Obryalis : chemin muletier du col ════════════════════════════════ */
ent('lie-0846', 'Obryalis');
const MOTIF_4 = `le lot 462 ne relie Obryalis que par un sentier (rang 2, pente et falaises) ; or un col est un passage, le village vit de ses échanges avec la capitale (premiers messages à la reine Myrthin après la Grande Chasse ; la reine Syraeth « fit le voyage depuis Myrthorin »). Chemin muletier (rang 3, celui des bourgs), pas une route (rang 4 : cités et villes) ; ${D38}`;
ajouter('lie-0846', `## Accès

Un chemin muletier monte de Myrthorin au col en longs lacets taillés dans la pente, assez large pour les bêtes de bât qui portent au village le grain, l'huile et les onguents. Au-delà des dernières maisons, vers les aires de repos des dragons et les sources chaudes, il n'y a plus que les sentiers rocheux de Myrthéria.`, MOTIF_4);
poserData('lie-0846', 'acces', {
  liaison: 'Myrthorin (lie-0661)', rang: 3, type: 'chemin muletier en lacets',
  au_dela: 'sentiers (rang 2) vers les aires des dragons et les sources chaudes',
  date: DATE,
}, MOTIF_4);

/* ── garde-fous ── */
const INTERDITS = /atrium|glace qui refuse|temp[êe]tes? vivantes? magiques?|l'envers|lacs?[- ]miroirs?|champignons? g[ée]ants?/i;
for (const [id, txt] of ecrits) {
  if (INTERDITS.test(txt)) echec(`${id} : le texte neuf contient un élément proscrit : « ${txt.match(INTERDITS)[0]} »`);
}
for (const id of ['lie-0722', 'lie-0693', 'lie-0941', 'lie-0846']) {
  const d = byId.get(id).data;
  if (d.coord_x == null || d.coord_y == null) echec(`${id} : coord_x/y perdues`);
}
const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) {
  rapport.issues.filter((x) => x.severity === 'erreur').slice(0, 10).forEach((x) => console.error('  ', x.message));
  echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
}
console.log(`✓ retouches (${journal.length}) :`); journal.forEach((j) => console.log('   ' + j));
console.log(`✓ fiches Docs touchées : ${[...docsTouches].map((p) => path.relative(ROOT, p)).join(', ') || 'aucune'}`);
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
if (journal.length) doc._meta.updated_at = NOW;
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
for (const p of docsTouches) fs.writeFileSync(p, docsCRLF.get(p) ? docsTexte.get(p).replace(/\n/g, '\r\n') : docsTexte.get(p));
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités). Ensuite : npm run kg:db`);
