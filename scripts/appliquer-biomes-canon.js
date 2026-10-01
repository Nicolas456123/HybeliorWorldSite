#!/usr/bin/env node
/**
 * Porte dans l'Atrium ce que la validation des biomes et du climat par
 * l'auteur (1er octobre 2026, D23 du prototype,
 * HybeliorPrototype/Docs/DECISIONS.md) touche au CANON :
 * BIOMES_MAGIQUES.md (v2), tableau §13, lignes V2 à V10, V14, V15, V17.
 *
 *  1. Relectures crédibles de phénomènes déjà canoniques (V2 à V10) : on garde
 *     ce que le canon affirme, on ajoute ce qui s'observe ; les croyances de
 *     peuples (chamanes, druides, prêtres) restent des croyances. Aucune
 *     question protégée n'est tranchée (lignes rouges, §10).
 *  2. Ajouts proposés qui entrent au canon : ruines suspendues de Caelum Prima
 *     (V14, nouvelle fiche), portes taillées de Ferrath, d'Iskara et de Myrtam
 *     (V15, sections de fiche), hauteur de l'Arbre-Mère (V17, estimation).
 *  3. La règle du climat global plus local (D19) dans la fiche « Hybélior ».
 *
 * Les familles de paysages, palettes de sols, tempêtes et grammaire visuelle
 * sont des outils du jeu : ils n'entrent pas à l'Atrium.
 *
 * Chaque retouche laisse une trace dans data.raccord (date, champ, avant,
 * pourquoi) ; la même retouche est reportée dans la fiche source de
 * Docs/Lore/Pays quand le texte y figure. Idempotent. Aucun reseed.
 * Les écarts avec les livres vont au registre des incohérences (II, §14, G) :
 * la prose des livres n'est pas touchée.
 *
 * Usage : node scripts/appliquer-biomes-canon.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const PAYS = path.join(ROOT, 'Docs', 'Lore', 'Pays');
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-01T12:00:00.000Z';
const DATE = '2026-10-01';
const D23 = 'décision de l\'auteur du 2026-10-01 (HybeliorPrototype/Docs/DECISIONS.md, D23)';
const SRC = (v) => `${D23} : ${v} de HybeliorPrototype/Docs/monde/BIOMES_MAGIQUES.md (v2, §13). Registre des incohérences, II, §14 (G).`;

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
function miroir(avant, apres, corps) {
  const sources = [...(corps || '').matchAll(/<!-- source: (Docs\/[^>]+?\.md) -->/g)].map((m) => path.join(ROOT, m[1]));
  let n = 0;
  for (const [p, t] of docsTexte) {
    if (sources.length && !sources.some((q) => path.resolve(q) === path.resolve(p))) continue;
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
  if (t.includes(avant)) {
    e[champ] = t.split(avant).join(apres);
    trace(e, champ, avant, pourquoi);
    const m = champ === 'body' ? miroir(avant, apres, t) : 0;
    journal.push(`${id} ${e.name} · ${champ}${m ? ` (+ ${m} fiche${m > 1 ? 's' : ''} Docs)` : ''}`);
    return true;
  }
  echec(`${id} (${e.name}) : texte introuvable dans ${champ} : « ${avant.slice(0, 80)}… »`);
}
function resume(id, apres, pourquoi) {
  const e = ent(id);
  if (e.summary === apres) return false;
  ecrits.push([id, apres]);
  trace(e, 'summary', e.summary, pourquoi);
  e.summary = apres;
  journal.push(`${id} ${e.name} · summary`);
  return true;
}
/* ajout en fin de corps (corps vide ou non) ; reconnu par sa première ligne */
function ajouter(id, texte, pourquoi) {
  const e = ent(id);
  ecrits.push([id, texte]);
  const t = e.body || '';
  if (t.includes(texte)) return false;
  e.body = t.trim() ? `${t.replace(/\s+$/, '')}\n\n${texte}\n` : `${texte}\n`;
  trace(e, 'body', t.trim() ? '(ajout en fin de corps, rien n\'est retiré)' : '(corps vide)', pourquoi);
  journal.push(`${id} ${e.name} · body (ajout)`);
  return true;
}

/* ════════════════════ V2 · Cestra, Tempêtes Vivantes, Paroi ════════════════════ */
const P_V2 = SRC('V2 (Cestra : désert de glace ordinaire ; blizzards physiques ; Noravia abritée par la Paroi), §3');
ajouter('con-0129', `## Ce que le relief explique

Ce sont des blizzards, de ceux que produisent partout les calottes polaires, et chacun des comportements qui frappent les chroniqueurs a une lecture physique, celle des sceptiques :
- *contre le vent dominant* : la tempête avance avec la dépression que pousse le vent d'altitude, alors qu'au sol souffle le vent catabatique qui descend de la calotte, en sens inverse ; vue d'un campement, elle remonte le vent ;
- *retraits avant certaines entrées de territoire* : les cols, les falaises et les vallées glaciaires coupent le vent ou le détournent ;
- *elles évitent le périmètre de Noravia* : la Paroi abrite la crique du vent de nord-est ; aucune tempête majeure n'a frappé la colonie depuis sa fondation ;
- *intensification autour des campements* : c'est la lecture des Chamanes ; aucune mesure ne la confirme.

Leurs trajectoires ne convergent vers aucun point du continent. Ce que les Chamanes des Brumes y lisent (des esprits de glace et de vent) reste leur lecture.`, P_V2);
ajouter('con-0130', `## Ce que mesurent les voyageurs

Au-delà d'une certaine altitude, un vent de 15 m/s par environ -45 °C donne un ressenti d'environ -70 °C et des gelures en moins de cinq minutes : c'est ce que les explorateurs distinguent du froid hivernal ordinaire. Les lectures théologiques ci-dessus ne sont pas tranchées pour autant.`, P_V2);
retouche('lie-0302', 'body',
  '- Falaise de basalte protégeant la crique des vents dominants nord-est.',
  '- Falaise de basalte protégeant la crique des vents dominants nord-est : elle coupe le vent sur tout le secteur de la crique (abri de falaise), ce qui explique, pour les sceptiques, que les blizzards de Cestra ne frappent pas la colonie.', P_V2);
const REL_TV = '- Ce que le relief en dit : ce sont des blizzards de calotte. Au sol souffle le vent catabatique, qui descend de la calotte ; la tempête avance avec la dépression que pousse le vent d\'altitude, en sens inverse, d\'où l\'impression qu\'elle remonte le vent. Les cols et les falaises coupent ou détournent le vent avant certaines entrées ; la Paroi abrite la crique de Noravia du vent de nord-est.';
retouche('lie-0006', 'body',
  '- Lectures : Chamanes = tempêtes habitées par des esprits ; sceptiques = effets topographiques mal compris. Aucune expédition scientifique n\'a duré assez pour trancher.',
  '- Lectures : Chamanes = tempêtes habitées par des esprits ; sceptiques = effets topographiques mal compris. Aucune expédition scientifique n\'a duré assez pour trancher.\n' + REL_TV, P_V2);
retouche('lie-0006', 'body',
  '**Hydrographie / glaciologie :** glace des glaciers de teinte bleue-noire ; calotte centrale permanente.',
  '**Hydrographie / glaciologie :** glace des glaciers de teinte bleue-noire (vieille glace bleue, feuilletée de lits de cendre volcanique) ; calotte centrale permanente ; froid extrême (autour de -44 °C en janvier à l\'intérieur) et vents catabatiques qui descendent de la calotte.', P_V2);
retouche('lie-0298', 'body',
  '- Lectures : esprits de glace et de vent réagissant à la présence humaine (Chamanes des Brumes) ; effets topographiques mal compris (autres voyageurs).',
  '- Lectures : esprits de glace et de vent réagissant à la présence humaine (Chamanes des Brumes) ; effets topographiques mal compris (autres voyageurs).\n' + REL_TV, P_V2);
retouche('lie-0298', 'body',
  'Lectures : *donnée pratique sans interprétation* (Conseil de Maintien) ; *effet de l\'accord* (Chamanes).',
  'Lectures : *donnée pratique sans interprétation* (Conseil de Maintien) ; *effet de l\'accord* (Chamanes) ; *abri de la Paroi*, qui coupe le vent de nord-est sur la crique (sceptiques).', P_V2);
retouche('lie-0298', 'body',
  'glaciers massifs (certains si anciens que leur glace a une teinte bleue-noire).',
  'glaciers massifs (certains si anciens que leur glace a une teinte bleue-noire : vieille glace bleue, feuilletée de lits de cendre volcanique).', P_V2);

/* ════════════════════ V3 · Cratères du Cardinal ════════════════════ */
const P_V3 = SRC('V3 (Cratères du Cardinal crédibles : impact ou explosion, bords vitrifiés, lac salé ordinaire), §3 et F12');
resume('con-0036', 'Cratères d\'impact ou d\'explosion, au rebord relevé et aux parois vitrifiées, que le monde refuse de combler là où un Souffle Cardinal a frappé le sol ; la magie résiduelle y stagne parfois des siècles et la faune et les plantes y deviennent étranges.', P_V3);
ajouter('con-0036', `## Ce qu'on y voit

Un cratère d'impact ou d'explosion : rebord relevé, blocs éjectés en couronne, parois hautes vitrifiées en rochers de verre sombre, fond plat.
- *Le monde refuse de combler* : le fond vitrifié ne se décompose pas en sol, aucune rivière n'y entre, le cratère reste nu et net pendant des siècles.
- *La faune et les plantes deviennent étranges* : sans exutoire, l'eau du fond devient un lac salé et alcalin, bordé d'algues roses et de plantes du sel, que fréquentent crustacés roses et oiseaux filtreurs.
- *La magie résiduelle* est la lecture des gens du pays ; le cratère n'a rien d'autre à montrer.`, P_V3);

/* ════════════════════ V4 · Voile : Gelinar et Kaloria ════════════════════ */
const P_V4 = SRC('V4 (Voile : bassin de brouillard de Gelinar, poche de gaz de Kaloria), §4.1');
resume('lie-0936', 'Région méridionale de Vytharia, au fond d\'une grande cuvette sous brume perpétuelle (un bassin de brouillard, plus épais à l\'aube, plus fin à midi), où l\'on lit l\'heure à l\'épaisseur du brouillard ; domaine des Artisans du Rêve.', P_V4);
retouche('lie-0936', 'body',
  'Région méridionale sous brume perpétuelle ; domaine des Artisans du Rêve.',
  'Région méridionale sous brume perpétuelle ; domaine des Artisans du Rêve. La brume est un brouillard de cuvette : l\'air froid et humide de la nuit reste piégé sous une inversion, épais et laiteux à l\'aube, plus fin et gris à midi, presque bleu le soir, sans jamais se lever tout à fait. C\'est de l\'eau (il mouille, il givre), et c\'est à son épaisseur qu\'on lit l\'heure.', P_V4);
resume('lie-0825', 'Village de récolteurs de brume, dans la partie la plus brumeuse de Gelinar, en Vytharia ; trop de brume concentrée y endort sans réveil (au fond de la cuvette, par nuit calme, la brume recouvre une poche de gaz volcanique qui endort).', P_V4);
retouche('lie-0825', 'body',
  '(trois récolteurs ainsi endormis depuis la fondation, maintenus en vie ; les Voilés communiquent parfois avec eux dans le rêve).',
  '(trois récolteurs ainsi endormis depuis la fondation, maintenus en vie ; les Voilés communiquent parfois avec eux dans le rêve). Ce qu\'on observe : par nuit calme, du gaz carbonique d\'origine volcanique s\'accumule au fond de la cuvette sous la brume et endort qui le respire ; le vent et le brassage du jour le chassent. Le Voile et les rêves partagés sont la lecture des Voilés et des anciens du village.', P_V4);

/* ════════════════════ V5 · Brumes Éternelles ════════════════════ */
const P_V5 = SRC('V5 (Brumes Éternelles : courant froid et brouillard d\'advection), §4.1');
resume('con-0082', 'Barrière de brouillard presque permanent isolant Ilthara et Haldria du reste du monde maritime : un courant froid longe leurs côtes et l\'air humide qui le traverse condense ; lue par Ordo Caelum comme protection de Celestia, par Via Ventus comme épreuve d\'Aerion.', P_V5);
ajouter('con-0082', `## Ce qu'on observe

Un courant froid longe Ilthara à une ou quatre lieues des côtes. L'air humide qui passe dessus se refroidit par le bas et condense : c'est un brouillard d'advection, de jour comme de nuit, presque permanent. Il se déchire quand le vent se lève fort (au-delà d'environ 10 m/s). Les lectures religieuses ci-dessus restent des lectures.`, P_V5);

/* ════════════════════ V6 · Pouls de Cendra ════════════════════ */
const P_V6 = SRC('V6 (Pouls de Cendra : respiration de gaz volcanique, 46 s), §4.1');
retouche('lie-0005', 'body',
  'pulse ~1 fois toutes les 46 secondes (relevés tenus depuis 3 siècles par la Voix sous les Cendres)',
  'pulse ~1 fois toutes les 46 secondes (relevés tenus depuis 3 siècles par la Voix sous les Cendres) ; ce que montrent le sol et les mares, c\'est une respiration de gaz volcanique : la colonne de magma du Mont se gonfle de gaz puis se vide à ce rythme, ce qui fait frémir les mares et vibrer le sol (la cause de la régularité n\'est pas établie ; la période est propre au Mont)', P_V6);

/* ════════════════════ V7 · Chant des Profondeurs ════════════════════ */
const P_V7 = SRC('V7 (Chant des Profondeurs : infrasons des grottes soufflantes), §4.1');
ajouter('con-0119', `## Ce qu'on mesure

Un grondement très grave, plutôt ressenti qu'entendu : il fait vibrer les os et ne vient d'aucune direction. Les sceptiques y lisent un infrason : les grands réseaux de grottes sous Ackerna respirent quand la pression change, et l'air qui passe fait vibrer les cavités comme des tuyaux d'orgue ; les oiseaux se taisent pendant les épisodes. Les habitants y entendent un chant, une présence ; la convergence vers ce qui dormirait sous Ilthara reste non tranchée.`, P_V7);

/* ════════════════════ V8 · îles d'Astravia ════════════════════ */
const P_V8 = SRC('V8 (îles flottantes immobiles, seulement à Astravia, sans pesanteur faible), F1 et §4.1');
retouche('pol-0021', 'body',
  '- Architecture arcanistique : tours élancées, ponts suspendus dans le vide, jardins flottants ; tout exprime la légèreté et l\'aspiration vers le haut.',
  '- Architecture arcanistique : tours élancées, ponts suspendus dans le vide, jardins flottants ; tout exprime la légèreté et l\'aspiration vers le haut.\n- Les îles volantes : blocs de montagne de roche chargée d\'aethérite, de quelques dizaines à quelques centaines de mètres de long, à plusieurs centaines de mètres au-dessus du sol. Elles sont immobiles, sans balancement ni rythme (la descente volontaire de l\'Hommage à la Chute mise à part), et la pesanteur n\'y est pas affaiblie : on y marche comme sur le sol. Astravia est le seul pays qui en porte. Dessous, un cône de roche érodée aux racines pendantes ; leurs cascades se changent en brume avant le sol ; leur ombre glisse sur la vallée au fil du jour ; au bord, des ascendances soulèvent la neige poudreuse en panaches.', P_V8);

/* ════════════════════ V9 · Warenthor (déjà posé par D21 : sentiers, sous-bois) ════════════════════ */
const P_V9 = SRC('V9 (taïga de Warenthor : sous-bois tamponné, sentiers qui se ferment en une saison), §4.1');
retouche('lie-0926', 'body',
  'c\'est ce que les voyageurs appellent la jungle.',
  'c\'est ce que les voyageurs appellent la jungle. Ce sous-bois est tamponné par la canopée (moins de gel la nuit, moins chaud le jour, air saturé, sans chaleur ajoutée) et sa repousse rapide (lianes, chablis) referme en une saison les sentiers qu\'on n\'entretient pas ; la forêt qui bouge de l\'Éveil est la lecture de la tradition.', P_V9);

/* ════════════════════ V10 · Evertia ════════════════════ */
const P_V10 = SRC('V10 (Evertia : double canopée, rien de mortel, faune normale), F5 et §4.1');
retouche('pol-0116', 'body',
  'lumière verte filtrée sans direction)',
  'lumière verte filtrée sans direction ; au-dessus, un second toit de couronnes d\'arbres émergents très espacés, vers 80 à 120 m, et entre les deux un air calme et saturé où pendent lianes et épiphytes : une double canopée, rien de mortel, et une faune de forêt tempérée humide)', P_V10);

/* ════════════════════ V14 · ruines suspendues de Caelum Prima ════════════════════ */
const P_V14 = SRC('V14 (ruines suspendues au-dessus du cratère de Caelum Prima), F16');
retouche('lie-0083', 'body',
  'Le cratère de Caelum Prima est devenu un sanctuaire où l\'on médite sur les dangers de l\'hubris.',
  'Le cratère de Caelum Prima est devenu un sanctuaire où l\'on médite sur les dangers de l\'hubris. Au-dessus du cratère, des blocs de fondation chargés d\'aethérite sont restés en l\'air depuis la Chute : piliers et linteaux bruts, la seule ruine flottante du monde (voir la fiche des ruines suspendues).', P_V14);

/* ════════════════════ V15 · portes taillées des peuples des montagnes ════════════════════ */
const P_V15 = SRC('V15 (portes taillées des peuples des montagnes : Ferrath, Iskara, Myrtam), F16');
const AVANT_REL = '\n---\n\n## Religion\n';
retouche('pol-0003', 'body', AVANT_REL,
  '\n---\n\n## Les portes taillées\n\nLes plus anciennes mines de Ferrath s\'ouvrent par des façades taillées à même la falaise : un portail à linteau massif, des montants de roche vive, une cour d\'accès, de trente à cinquante mètres de haut pour les plus grandes. Les siècles les ont usées au point qu\'on distingue mal l\'ouvrage de la roche ; les mineurs les entretiennent sans les refaire. On y passe, on n\'y habite pas.\n' + AVANT_REL, P_V15);
retouche('pol-0002', 'body', AVANT_REL,
  '\n---\n\n## Les portails des vallées\n\nChacune des vallées-forteresses d\'Iskara s\'ouvre par un portail taillé dans la falaise, de cinquante à quatre-vingts mètres de haut, flanqué de bastions creusés dans la roche vive ; la ville et les forges se tiennent à son pied. Le temps a adouci leurs arêtes et couvert les parois de lichen : de loin, on les prend pour des accidents de la montagne.\n' + AVANT_REL, P_V15);
retouche('pol-0026', 'body', AVANT_REL,
  '\n---\n\n## Les façades de forge\n\nLes grandes forges de Myrtam s\'ouvrent dans le flanc de la montagne par des façades taillées dans la roche, aux portes de soixante à cent vingt mètres, noircies par des siècles de fumée ; la ville s\'étage à leurs pieds. On y lit encore les marques d\'outils des premiers tailleurs, sous la suie.\n' + AVANT_REL, P_V15);

/* ════════════════════ V17 · l'Arbre-Mère, 300 m ════════════════════ */
const P_V17 = SRC('V17 (Arbre-Mère de 300 m, hauteur indéterminée dans le canon), F4');
retouche('pol-0032', 'body',
  'hauteur indéterminée (canopée empêchant toute mesure verticale).',
  'hauteur estimée à 300 m environ, jamais mesurée (canopée empêchant toute mesure verticale directe).', P_V17);
resume('lie-0381', 'La plus ancienne du continent Evertia, au centre du Cœur de Sylvara, haute d\'environ 300 m (estimation) ; centre symbolique de la nation (sanctuaire, non une ville) et lieu du Pacte. L’Arbre-Mère est féminine — le nom le porte.', P_V17);

/* ════════════════════ D19 · climat global plus local, dans « Hybélior » ════════════════════ */
const P_D19 = `${D23} ; règle du climat global plus local : HybeliorPrototype/Docs/DECISIONS.md, D19 (2026-09-30). Registre des incohérences, II, §14 (G).`;
ajouter('lie-1059', 'Le climat d\'un lieu se compose de deux couches : un fond global, celui du plan de l\'auteur (la latitude fait peu ; comptent le relief, la mer, les vents), et par-dessus un climat local (cuvette, abri de falaise, courant froid, source chaude, forêt qui fait sa pluie) que la fiche du lieu dit. Quand les deux diffèrent, le local l\'emporte sur son terrain, et le fond reste celui du plan alentour (décision de l\'auteur, 30 septembre 2026).', P_D19);

/* ════════════════════ création : les ruines suspendues (V14) ════════════════════ */
let g = core.mergeGraph(doc, {});
const nouveaux = { entities: [], relations: [] };
function creer(nom, type, input) {
  const deja = doc.entities.find((e) => e.type === type && e.name === nom);
  const id = deja ? deja.id : core.nextEntityId(g, type);
  const homonyme = doc.entities.find((e) => e.id !== id && e.name === nom);
  if (homonyme) echec(`une autre entité porte déjà le nom « ${nom} » (${homonyme.id})`);
  const { ops } = core.prepareWrite(g, 'save-entity', { id, type, name: nom, slug: null, status: 'canon', disclosure: 'public', ...input }, NOW);
  const rec = ops[0].record;
  if (deja && deja.created_at) rec.created_at = deja.created_at;
  if (deja && JSON.stringify({ ...deja, updated_at: 0 }) === JSON.stringify({ ...rec, updated_at: 0 })) rec.updated_at = deja.updated_at;
  core.applyOps(g, ops);
  ecrits.push([id, `${nom} ${input.summary} ${input.body}`]);
  nouveaux.entities.push(rec);
  return rec;
}
function relation(r) {
  const deja = doc.relations.find((x) => x.rel_type === r.rel_type && x.from_id === r.from_id && x.to_id === r.to_id);
  if (deja) return deja;
  const { ops } = core.prepareWrite(g, 'save-relation', r);
  core.applyOps(g, ops);
  nouveaux.relations.push(ops[0].record);
  return ops[0].record;
}
const AELORIA = ent('lie-0754', 'Aeloria');
const ruines = creer('Les ruines suspendues de Caelum Prima', 'lieu', {
  summary: 'Fragments de l\'île Caelum Prima restés en l\'air au-dessus de son cratère depuis la Chute : blocs de fondation chargés d\'aethérite, piliers et linteaux bruts, la seule ruine flottante du monde, que l\'on voit depuis Aeloria.',
  body: `## Ce que l'on voit

Au-dessus du cratère-sanctuaire de Caelum Prima, une grappe de blocs de fondation chargés d'aethérite, restés en l'air depuis la Chute : piliers, linteaux et dalles à peine dégrossis, sans sculpture ni inscription. C'est la seule ruine flottante du monde ; les cités de l'An 0, elles, sont tombées, et aucune ne flotte.

## Ce que c'est

Ce sont des ruines de la Chute d'Astravia, non de l'An 0 : des morceaux de l'île qui s'écrasa, que leur charge d'aethérite a gardés en l'air. Comme les îles volantes d'Astravia, ils sont immobiles ; au bord des blocs, le vent soulève la neige en panaches.

## Autour

Aeloria, le village de chercheurs au bord du cratère, les a sous les yeux depuis la Chute.
`,
  data: {
    echelle: 'lieu-dit',
    carte: {
      position_estimee: {
        x: Math.round(AELORIA.data.coord_x * 10) / 10,
        y: Math.round(AELORIA.data.coord_y * 10) / 10,
        confiance: 'basse',
        methode: 'cratère de Caelum Prima, au bord duquel est posée Aeloria (lie-0754)',
        terre: 'Celethor',
        motif: 'Fragments suspendus au-dessus du cratère : même position que le village d\'Aeloria, sentinelle du site.',
        source: `HybeliorPrototype/Docs/monde/BIOMES_MAGIQUES.md, F16 et §13 (V14) ; ${D23}`,
      },
    },
    provenance: `HybeliorPrototype/Docs/monde/BIOMES_MAGIQUES.md, F16 et §13 (V14, « ruines suspendues », validé le 2026-10-01) ; ${D23}`,
  },
});
relation({ rel_type: 'situe-dans', from_id: ruines.id, to_id: 'pol-0021' });
relation({ rel_type: 'lie-a', from_id: ruines.id, to_id: 'lie-0083' });
relation({ rel_type: 'lie-a', from_id: ruines.id, to_id: 'lie-0754' });
relation({ rel_type: 'lie-a', from_id: ruines.id, to_id: 'evt-0099' });

/* ── application ── */
function poser(arr, r) { const k = arr.findIndex((x) => x.id === r.id); if (k >= 0) arr[k] = r; else arr.push(r); }
nouveaux.entities.forEach((r) => poser(doc.entities, r));
nouveaux.relations.forEach((r) => poser(doc.relations, r));

/* garde-fous : rien de ce que l'auteur a rejeté, et jamais le mot du savoir hors monde */
const INTERDITS = /atrium|glace qui refuse|temp[êe]tes? vivantes? magiques?|l'envers|lacs?[- ]miroirs?|rideau de ros[ée]e|l'eau remonte|pesanteur faible/i;
for (const [id, txt] of ecrits) {
  if (INTERDITS.test(txt)) echec(`${id} : le texte neuf contient un élément proscrit : « ${txt.match(INTERDITS)[0]} »`);
  if (/«/.test(txt)) echec(`${id} : guillemets « » dans un texte neuf (le raccord les prendrait pour des citations de livres)`);
}
const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) {
  rapport.issues.filter((x) => x.severity === 'erreur').slice(0, 10).forEach((x) => console.error('  ', x.message));
  echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
}

console.log(`✓ retouches (${journal.length}) :`); journal.forEach((j) => console.log('   ' + j));
console.log(`✓ ${ruines.id} ${ruines.name} (lieu), relations : ${nouveaux.relations.map((r) => `${r.rel_type} → ${r.to_id}`).join(', ') || 'déjà posées'}`);
console.log(`✓ fiches Docs touchées : ${[...docsTouches].map((p) => path.relative(ROOT, p)).join(', ') || 'aucune'}`);
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
for (const p of docsTouches) fs.writeFileSync(p, docsCRLF.get(p) ? docsTexte.get(p).replace(/\n/g, '\r\n') : docsTexte.get(p));
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités, ${doc.relations.length} relations). Ensuite : npm run kg:index && npm run kg:db`);
