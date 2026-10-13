#!/usr/bin/env node
/**
 * Demande Studio d1f80e2b8 (volet diversite-monde, chantier div6), 2026-10-12 —
 * îles et roches flottantes sauvages : les « errantes » (proposé, D39, D41).
 *
 * Ce que l'Atrium savait déjà : les îles volantes d'Astravia, « blocs de montagne
 * de roche chargée d'aethérite », immobiles, seul pays qui en porte (pol-0021,
 * lie-0893, D23/V8) ; la Chute de Caelum Prima (evt-0099) et ses ruines
 * suspendues, « seule ruine flottante du monde » (lie-1072, V14) ; trois îles
 * basses écrasées près de Belvarin (lie-0374) ; le minerai de cielvif et les
 * réserves de Galdryn qui « pèsent plus lourd » (pol-0021, lie-0732) ; les cités
 * volantes de l'An 0, toutes tombées (evt-0015, que-0013).
 *
 * Ce qui est proposé : des roches de cielvif que nul mage ne tient. Petites
 * errantes (5 à 25 m) qui dérivent au vent au-dessus de Brastallia ; échouées
 * (60 à 400 m) presque immobiles au-dessus de la mer de nuages des vallées de
 * Lysoria. Une seule exception physique (l'aethérite pèse moins que l'air,
 * déjà canon) ; tout le reste suit la nature : plafond d'équilibre, vent, neige
 * qui alourdit, veines qui ternissent, chute.
 *
 * Écrit : 1 concept + 2 lieux (data.statut « proposé »), liens lie-a /
 * situe-dans / a-ne-pas-confondre-avec (data.statut proposé), alias ; nuance
 * tracée (data.raccord) sur lie-1072 et pol-0021 (+ miroir Docs d'Astravia).
 * Aucune coord_x/y ; positions dans data.carte.position_estimee.
 * Idempotent (clé data.cle ; liens et alias retrouvés par leur contenu), sans
 * reseed ; refuse d'écrire si kg-base.json change pendant le calcul.
 * Usage : node scripts/iles-errantes-div6.js [--essai]   puis   npm run kg:db
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const MIROIRS = [path.join(ROOT, 'Docs', 'Lore', 'Pays'), path.join(ROOT, 'Docs', 'Lore', 'Histoires')];
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-12T18:00:00.000Z';
const DATE = '2026-10-12';
const DEMANDE = 'd1f80e2b8';
const MOTIF = 'demande Studio d1f80e2b8 (volet diversite-monde, div6 : îles flottantes sauvages, proposé), D39 et D41 ; consigne « fantasy crédible » (îles flottantes oui, physique inversée non)';

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
// Références attendues (garde-fou : l'Atrium n'a pas bougé sous nos pieds)
ent('pol-0021', 'Astravia'); ent('lie-0894', 'Lysoria'); ent('lie-0892', 'Brastallia');
ent('lie-0893', 'Inverna'); ent('lie-0732', 'Galdryn'); ent('lie-0374', 'Belvarin');
ent('lie-1072', 'Les ruines suspendues de Caelum Prima'); ent('esp-0014', 'Les Nuélaines');
ent('esp-0016'); ent('pol-0087', 'Elarian'); ent('lie-0675', 'Lysoris'); ent('evt-0099');

const journal = [];
const ecrits = [];

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
function retouche(id, champ, avant, apres, pourquoi) {
  const e = ent(id);
  const t = e[champ] || '';
  ecrits.push([id, apres]);
  if (t.includes(apres)) return false;
  if (!t.includes(avant)) echec(`${id} (${e.name}) : texte introuvable dans ${champ} : « ${avant.slice(0, 80)}… »`);
  e[champ] = t.split(avant).join(apres);
  e.data = e.data || {};
  e.data.raccord = e.data.raccord || [];
  e.data.raccord.push({ date: DATE, champ, avant, pourquoi });
  e.updated_at = NOW;
  const m = champ === 'body' ? miroir(avant, apres) : 0;
  journal.push(`${id} ${e.name} · ${champ}${m ? ` (+ ${m} fiche Docs)` : ''}`);
  return true;
}

/* ── création idempotente ── */
function prochainId(prefixe, liste) {
  let max = 0;
  for (const x of liste) if (x.id.startsWith(prefixe)) { const n = +x.id.slice(prefixe.length); if (n > max) max = n; }
  return prefixe + String(max + 1).padStart(4, '0');
}
const PROPOSITION = {
  date: DATE, decision: 'D39, D41', demande: `${DEMANDE} (volet diversite-monde, chantier div6)`,
  par: 'Claude (agent iles-div6)',
  reference: 'HybeliorPrototype/Docs/monde/references_auteur/1012_diversite/09_village_au_dessus_des_nuages.jpg',
  attente: 'validation de l\'auteur',
};
function poserEntite(cle, type, prefixe, champs) {
  let e = doc.entities.find((x) => x.data && x.data.cle === cle);
  const data = Object.assign({ cle, statut: 'proposé', proposition: PROPOSITION }, champs.data);
  const neuf = { type, name: champs.name, slug: null, summary: champs.summary, body: champs.body.trim() + '\n', data, status: 'canon', disclosure: 'public' };
  ecrits.push([cle, champs.name + ' ' + champs.summary + ' ' + champs.body + ' ' + JSON.stringify(champs.data)]);
  if (!e) {
    e = Object.assign({ id: prochainId(prefixe, doc.entities) }, neuf, { created_at: NOW, updated_at: NOW });
    doc.entities.push(e); byId.set(e.id, e);
    journal.push(`${e.id} ${e.name} · créé`);
    return e;
  }
  const avant = JSON.stringify([e.type, e.name, e.summary, e.body, e.data]);
  // Idempotence (relecture D46, lot 522) : jamais de rétrogradation. Le statut et la validation déjà posés
  // (D45 : « oui pour les îles qui dérivent ») sont conservés tels quels ; seul un statut absent prend « proposé ».
  if (e.data && e.data.statut) neuf.data.statut = e.data.statut;
  if (e.data && e.data.validation) neuf.data.validation = e.data.validation;
  Object.assign(e, neuf);
  if (JSON.stringify([e.type, e.name, e.summary, e.body, e.data]) !== avant) { e.updated_at = NOW; journal.push(`${e.id} ${e.name} · mis à jour`); }
  return e;
}
function lien(rel, from, to, label) {
  const ex = doc.relations.find((r) => r.rel_type === rel && r.from_id === from && r.to_id === to);
  const data = { statut: 'proposé', demande: DEMANDE };
  if (ex && ex.data) {   // même règle que poserEntite : un statut ou une validation existants ne sont jamais écrasés
    if (ex.data.statut) data.statut = ex.data.statut;
    if (ex.data.validation) data.validation = ex.data.validation;
  }
  if (ex) {
    if (ex.label !== label || JSON.stringify(ex.data) !== JSON.stringify(data)) { ex.label = label; ex.data = data; journal.push(`${ex.id} ${rel} ${from} → ${to} · mis à jour`); }
    return ex;
  }
  const r = { id: prochainId('lnk-', doc.relations), rel_type: rel, from_id: from, to_id: to, start_year: null, end_year: null, label, data, source_id: null, status: 'canon' };
  doc.relations.push(r);
  journal.push(`${r.id} ${rel} ${from} → ${to}`);
  return r;
}
function alias(entity, value, meaning) {
  const ex = doc.aliases.find((a) => a.entity_id === entity && a.value === value);
  if (ex) { if (ex.meaning !== meaning) { ex.meaning = meaning; journal.push(`${ex.id} alias « ${value} » · mis à jour`); } return; }
  const a = { id: prochainId('ali-', doc.aliases), entity_id: entity, value, alias_status: 'variante', era_id: null, from_year: null, to_year: null, meaning };
  doc.aliases.push(a);
  journal.push(`${a.id} alias « ${value} » (${entity})`);
}

const ID_C = (doc.entities.find((x) => x.data && x.data.cle === 'errantes-div6') || { id: prochainId('con-', doc.entities) }).id;

/* ═══ 1. Le concept : les errantes ═══════════════════════════════════════ */
const LIGNE_ROUGE = [
  'que-0013 : aucune errante ne bouge selon une heure, un jour ou un calendrier ; leur dérive suit le vent et le poids de la neige ; aucune cité de l\'An 0 ne flotte, et les ruines des errantes ne sont pas des cités.',
  'que-0001, que-0006 : on ne dit pas pourquoi l\'aethérite s\'éteint ; aucun lien avec l\'Arrachement, les Souffles Cardinaux ou les Failles.',
  'que-0011 : aucune pulsation, aucune lueur, aucun son venu de la pierre ; ne jamais rapprocher les errantes du Cœur de Caelum Prima ni du vortex de Valtheron (lie-0751).',
  'que-0034 : les ruines n\'ont ni inscription, ni figure sculptée, ni nom gratté ; leur usure est celle de la roche.',
  'Physique : pas de pesanteur faible, pas de balancement, aucune errante hors d\'Astravia ; tout le reste (pluie, racines, vent, neige, chute) suit la nature.',
];
const conErrantes = poserEntite('errantes-div6', 'concept', 'con-', {
  name: 'Les errantes',
  summary: 'Roches et îles de cielvif, pierre veinée d\'aethérite plus légère que l\'air, que nul mage ne tient : des blocs de cinq à vingt-cinq mètres qui dérivent au vent au-dessus de Brastallia, et des îles de cent à quatre cents mètres, presque immobiles, échouées au-dessus de la mer de nuages des vallées de Lysoria. Certaines portent des ruines que personne ne sait attribuer ; toutes finissent par s\'éteindre et tomber.',
  body: `
## Ce que c'est

Le cielvif est la roche où naît l'aethérite : un schiste gris parcouru de veines bleu-gris, pâles, qui sentent l'orage quand on les brise. Quand la part de veine dépasse ce que les carriers de Galdryn appellent « le tiers », un bloc pèse moins que l'air qu'il déplace. C'est la seule chose que la pierre refuse aux lois communes, et c'est celle qui porte les îles du Magistère. Le reste suit la nature.

Une errante ne monte pas sans fin. L'air s'allège avec la hauteur, et chaque bloc s'arrête là où il ne pèse plus rien : les plus chargés plus haut, les autres plus bas. Elle naît quand le gel, un séisme ou l'effondrement d'une falaise libère un pan de montagne assez riche en veine ; les montagnes de cielvif perdent des pierres vers le ciel comme les autres en perdent vers la vallée. Les îles volantes d'Astravia sont des errantes que les mages ont arrachées, chargées et amarrées : on les tient, c'est pourquoi elles ne bougent pas. Les errantes, personne ne les tient.

Les naturalistes d'Invernis tiennent l'aethérite pour de l'« air léger pris dans la pierre », parent de celui que les Nuélaines fabriquent dans leur ventre. Ils ne l'ont jamais démontré.

## Deux sortes

- **Les errantes** proprement dites, de cinq à vingt-cinq mètres, nées sur les escarpements entre Inverna et les plateaux de Brastallia. Elles flottent de deux cents à six cents mètres au-dessus des forêts et vont où le vent les pousse, de quelques centaines de mètres à quelques lieues par jour. Elles s'accrochent par leurs racines à une crête ou à la cime d'un arbre, y restent une semaine ou dix ans, repartent au coup de vent suivant. Les vents de nord-est de l'hiver les poussent vers le sud-ouest, vers les fjords d'Elarian, où beaucoup finissent.
- **Les échouées**, de soixante à quatre cents mètres de long et de vingt à cent cinquante d'épaisseur, au-dessus des vallées à lacs de Lysoria. Trop lourdes pour le vent, elles se déplacent de quelques mètres à quelques centaines de mètres par an, s'appuient contre un versant, y restent un siècle, puis un dégel ou une tempête les décolle. Elles flottent de trois cents à neuf cents mètres au-dessus des fonds, juste au-dessus de la mer de nuages qui remplit ces vallées les matins froids.

La neige et le givre les alourdissent : après un gros hiver, une échouée a pu descendre de plusieurs dizaines de mètres, et elle ne remonte qu'avec la fonte. Cela dépend de la neige tombée, jamais du calendrier.

## Ce qu'on y trouve

Dessous, un cône de roche érodée d'où pendent des racines de pierre et de bois. Dessus, ce que le froid laisse pousser : herbe rase, mousses, lichens, saules et bouleaux nains, plaques de neige qui tiennent tard. L'hiver, par temps calme, l'air froid reste au fond des vallées et les échouées, au-dessus, ont souvent dix degrés de moins de froid que la vallée : c'est là que les ermites passent la mauvaise saison. La pluie ruisselle vers les bords et tombe en cascades qui se changent en brume bien avant le sol. Au bord, l'air monte en ascendances, et les grands oiseaux de falaise y nichent, avec les Attendeurs. L'été, l'air autour des échouées est plein d'insectes et de semences portées par le vent, et les troupeaux de Nuélaines s'y attardent.

Sur une échouée sur dix, et sur quelques errantes, il y a des ruines : escaliers taillés, murets de pierre sèche, citernes creusées dans le roc, abris voûtés, une tour basse effondrée. Elles sont usées comme la pierre qui les porte et ne portent ni inscription ni figure. Plusieurs escaliers finissent sur une cassure, dans le vide. Les carriers en concluent que la pierre était encore montagne quand on les a taillés ; d'autres pensent qu'on montait déjà dans le ciel avant les mages. Personne ne sait qui les a bâties. Ce ne sont pas des cités : les cités de l'An 0 sont tombées, et aucune ne flotte.

## Ce que les peuples en font

- **Le Magistère** revendique toute errante comme aethérite de la collectivité, au même titre que chaque cristal de Galdryn. Les Gardiens du Seuil en marquent certaines au fer rouge. On en a creusé pour leurs veines, et plusieurs sont tombées de ces carrières.
- **Les ermites** de Lysoria montent sur les échouées par des cordes et des échelles qu'ils laissent pendre, et se font hisser leurs vivres au panier. Ils y passent des années ; certains n'en redescendent pas.
- **Les chasseurs d'œufs** de Brastallia et d'Elarian montent au grappin prendre les œufs des grands oiseaux et ceux des Attendeurs, dont les plumes se vendent à Invernis. Le métier tue un homme sur vingt par saison, dit-on à Brastoris.
- **Les guides** de Brastallia et les pilotes des fjords d'Elarian tiennent des registres d'errantes : un nom, une taille, la dernière place où on l'a vue, la date. Une carte d'errantes vaut une saison. On ne mouille pas sous une errante, et l'on ne bâtit pas là où elles passent.
- **Les Fils du Sol** refusent d'y monter, comme le charron Aldric refusait les îles célestes.

## Ce qu'elles coûtent

- **Les chutes.** Une errante qui casse lâche un pan sans veine, qui tombe comme une pierre. Sous les plateaux de Brastallia, un hameau de charbonniers a été écrasé ainsi ; on n'a jamais relevé les maisons. Près de Belvarin, trois îles basses se sont écrasées en cinq ans : les Veilleurs de Belvarin y lisent des perturbations du ciel que leurs instruments mesurent, les carriers une extinction. Rien n'est tranché.
- **Les îles qui s'éteignent.** Les veines exposées ternissent, du bleu-gris au gris sale, et l'errante pèse un peu plus chaque année. Elle descend, puis touche : un versant, une forêt, un lac. Une échouée qui s'éteint s'enfonce dans la mer de nuages, et ceux d'en bas entendent craquer ses arbres dans la brume. Les ermites restent souvent dessus jusqu'au bout. Les carriers disent que c'est le même mal que celui des réserves de Galdryn, qui « pèsent plus lourd » ; personne ne sait d'où il vient.
- **Les morts.** Une Nuélaine prise par la tempête est restée deux hivers accrochée au rebord d'une échouée de Lysoria, et les Attendeurs ont tourné au-dessus tout ce temps.
- **Les bâtisseurs.** Les ruines n'ont pas de maître. On ne sait pas qui a taillé les escaliers qui donnent sur le vide, ni pourquoi personne n'en parle dans les Tables.
`,
  data: {
    nature: 'roche de cielvif (schiste à veines d\'aethérite) plus légère que l\'air ; seule exception physique, déjà canon (îles d\'Astravia)',
    mecanisme: {
      principe: 'au-delà d\'environ un tiers de veine, le bloc pèse moins que l\'air qu\'il déplace ; il s\'élève jusqu\'à son plafond d\'équilibre (l\'air s\'allège avec l\'altitude)',
      naissance: 'gel, séisme ou effondrement qui libère un pan de montagne assez chargé',
      neige: 'neige et givre alourdissent : descente de quelques dizaines de mètres après un gros hiver, remontée à la fonte ; aucun calendrier',
      extinction: 'les veines exposées ternissent (bleu-gris → gris sale) ; le bloc s\'alourdit, descend, touche ou casse ; cause non dite',
      parente_nuelaines: 'lecture des naturalistes d\'Invernis (« air léger pris dans la pierre »), non démontrée',
    },
    formes: {
      errante: { longueur_m: [5, 25], hauteur_sur_sol_m: [200, 600], derive: 'au vent, de quelques centaines de mètres à quelques lieues par jour ; accrochages d\'une semaine à dix ans', region: 'lie-0892', vents: 'nord-est en hiver → sud-ouest, vers les fjords d\'Elarian (pol-0087)' },
      echouee: { longueur_m: [60, 400], epaisseur_m: [20, 150], hauteur_sur_fond_m: [300, 900], derive_m_par_an: [2, 300], region: 'lie-0894', appui: 'contre un versant, parfois un siècle' },
    },
    altitude_absolue_m: { fonds_lysoria: 400, echouees: [700, 1300], nuelaines: [1500, 4000], source: 'HybeliorPrototype/Docs/monde/ILES_DU_CIEL.md §2.2-2.3 (sol d\'Invernis 375 m, toundra ; nappe au sommet moyen de 1,0 km)' },
    climat: 'toundra : pas d\'arbres hauts ; inversion d\'hiver, les îles moins froides que les fonds (≈ +10 °C, ILES_DU_CIEL §2.3, proposé)',
    rarete: 'Astravia seulement ; Lysoria : une quarantaine d\'échouées dont une douzaine de plus de 200 m ; Brastallia : une soixantaine d\'errantes connues, rarement plus de 20 m',
    usages: ['revendication du Magistère (aethérite de la collectivité, marque des Gardiens du Seuil)', 'carrières (cause de chutes)', 'ermites de Lysoria', 'chasseurs d\'œufs (grands oiseaux, Attendeurs)', 'registres d\'errantes des guides et des pilotes d\'Elarian', 'refus des Fils du Sol'],
    part_sombre: ['chutes de pans sans veine (hameau de charbonniers de Brastallia)', 'îles basses de Belvarin, lectures non tranchées', 'extinction lente des veines, sans cause dite', 'Nuélaine morte accrochée deux hivers', 'ruines sans bâtisseurs connus'],
    ruines: { part: 'une échouée sur dix, quelques errantes', types: ['escaliers taillés (certains donnent sur le vide)', 'murets de pierre sèche', 'citernes', 'abris voûtés', 'tour basse effondrée'], interdits: 'aucune inscription, figure, cadran, horloge ni trace de rituel ; aucune cité' },
    ligne_rouge: LIGNE_ROUGE,
    jeu: 'kit HybeliorPrototype Art/Kits/IlesDiv6 (div6) ; mer de nuages d\'inversion : note pour le volet ciel',
  },
});

/* ═══ 2. Les Échouées de Lysoria ═════════════════════════════════════════ */
const lieEchouees = poserEntite('echouees-lysoria-div6', 'lieu', 'lie-', {
  name: 'Les Échouées de Lysoria',
  summary: 'Une quarantaine d\'îles de cielvif sauvages, de soixante à quatre cents mètres, presque immobiles au-dessus des vallées à lacs de Lysoria, juste au-dessus de la mer de nuages qui les remplit les matins froids ; des ermites y vivent, quelques ruines y restent, et certaines s\'éteignent.',
  body: `
## Ce que l'on voit

Vue des crêtes de Lysoria par un matin d'hiver, la vallée a disparu sous une mer de nuages blancs et plats, d'où sortent les sommets des collines. Au-dessus, à quelques centaines de mètres, flottent les échouées : une quarantaine d'îles de roche grise, dont une douzaine de plus de deux cents mètres, chacune avec son cône de pierre dessous, ses racines pendantes et ses cascades qui s'effilochent en brume avant d'atteindre les nuages. Vers midi, la mer de nuages se déchire et l'on voit les lacs en dessous. La « brume permanente » de Lysoria, c'est cela vu d'en bas.

## Ce que c'est

Des errantes (${ID_C}) trop lourdes pour le vent. Elles ne bougent que de quelques mètres à quelques centaines de mètres par an, s'appuient contre un versant, y restent longtemps. On en nomme trois :

- **la Marchée**, cent vingt mètres, où un escalier taillé monte depuis une citerne et s'arrête sur une cassure, dans le vide ;
- **le Grand Dos**, trois cent vingt mètres, couvert de saules nains et de mousses, où vivent quatre ou cinq ermites autour d'une tour basse effondrée, et d'où pendent leurs cordes ;
- **la Grise**, quatre-vingts mètres, dont les veines ont terni : elle a descendu de cent quarante mètres en soixante ans, elle touche presque la mer de nuages, et plus personne n'y monte.

## Ce qu'il en coûte

Une Nuélaine prise par la tempête y est restée deux hivers accrochée au rebord du Grand Dos. Les ermites disent qu'on entend craquer les arbres de la Grise dans la brume, les nuits sans vent.
`,
  data: {
    echelle: 'region',
    carte: { position_estimee: { x: 92, y: -357, confiance: 'basse', methode: 'vallées à lacs entre Lysoria (lie-0894, 94,5 ; −362,4) et Lysoris (lie-0675, 96,8 ; −349,6)', terre: 'Celethor', motif: 'Champ d\'îles sauvages au-dessus des vallées de Lysoria ; position du cœur du champ, sur terre (contours du site). Aucun rattachement n\'en est dérivé.', source: `demande ${DEMANDE}` } },
    nombre: { iles: 40, plus_de_200_m: 12 },
    iles_nommees: [
      { nom: 'la Marchée', longueur_m: 120, trait: 'escalier taillé qui s\'arrête sur le vide, citerne' },
      { nom: 'le Grand Dos', longueur_m: 320, trait: 'saules nains, mousses, quatre ou cinq ermites, tour basse effondrée, cordes' },
      { nom: 'la Grise', longueur_m: 80, trait: 'veines ternies, descendue de 140 m en 60 ans, plus personne n\'y monte' },
    ],
    mer_de_nuages: { nature: 'inversion : l\'air froid des nuits s\'accumule dans les vallées à lacs', sommet_m: [700, 1300], sommet_moyen_m: 1000, tient: 'jusqu\'à midi en hiver ; se déchire par vent ou soleil', iles_m: [700, 1300], source: 'HybeliorPrototype/Docs/monde/ILES_DU_CIEL.md §2.2' },
    ligne_rouge: LIGNE_ROUGE,
  },
});

/* ═══ 3. Les errantes de Brastallia ═══════════════════════════════════════ */
const lieErrantes = poserEntite('errantes-brastallia-div6', 'lieu', 'lie-', {
  name: 'Les errantes de Brastallia',
  summary: 'Une soixantaine de roches de cielvif de cinq à vingt-cinq mètres, nées sur les escarpements entre Inverna et les plateaux de Brastallia, qui dérivent au vent au-dessus des forêts d\'altitude vers les fjords d\'Elarian ; les guides en tiennent registre, les chasseurs d\'œufs y montent, les Fils du Sol les maudissent.',
  body: `
## Ce que l'on voit

Une roche grise de la taille d'une maison, parfois d'un clocher, qui passe lentement au-dessus des forêts, à quelques centaines de mètres, des racines et des saules nains pendant dessous. Elle se prend à une crête, y reste, repart. Les plus grandes portent un fourré de bouleaux nains et un nid d'Attendeurs ; deux ou trois, des murets ou les marches d'un escalier.

## D'où elles viennent, où elles vont

Elles se détachent des escarpements de cielvif au nord des plateaux, au pied de la chaîne d'Inverna, quand le gel ou un éboulement libère un pan assez chargé. Les vents de nord-est de l'hiver les poussent vers le sud-ouest, par-dessus les terrasses et les forêts de Brastallia, jusqu'aux fjords d'Elarian, où la plupart finissent : elles s'éteignent, descendent et tombent dans la mer ou contre les falaises. L'été, les troupeaux de Nuélaines qui reviennent sur Brastallia les croisent et s'attardent autour.

## Ce qu'on en fait

Les guides de Brastoris tiennent le registre des errantes : un nom, une taille, le dernier endroit où on l'a vue. Les chasseurs d'œufs y montent au grappin. Les Fils du Sol n'y montent pas, et l'on ne bâtit pas dans leur couloir : sous les plateaux, un hameau de charbonniers a été écrasé par un pan tombé d'une errante, et personne n'a relevé les maisons.
`,
  data: {
    echelle: 'region',
    carte: { position_estimee: { x: 2, y: -310, confiance: 'basse', methode: 'escarpements entre Brastallia (lie-0892, −10,5 ; −298) et Inverna (lie-0893, 39,7 ; −344,6)', terre: 'Celethor', motif: 'Lieu de naissance des errantes, au nord des plateaux ; leur couloir de dérive va de là vers le sud-ouest (Elarian, pol-0087). Sur terre (contours du site). Aucun rattachement n\'en est dérivé.', source: `demande ${DEMANDE}` } },
    nombre: { errantes_connues: 60, longueur_m: [5, 25] },
    couloir: { depuis: 'escarpements de cielvif au pied d\'Inverna', vers: 'fjords d\'Elarian (pol-0087)', vents: 'nord-est en hiver', fin: 'extinction, descente, chute en mer ou contre les falaises' },
    ligne_rouge: LIGNE_ROUGE,
  },
});

/* ── liens et alias ── */
const C = conErrantes.id, E = lieEchouees.id, B = lieErrantes.id;
lien('lie-a', C, 'pol-0021', 'Astravia est le seul pays qui en porte ; le Magistère revendique leur aethérite');
lien('lie-a', C, 'lie-0893', 'les îles du Magistère sont des errantes arrachées, chargées et amarrées');
lien('lie-a', C, 'lie-0732', 'les carriers de Galdryn : « le tiers » de veine ; l\'extinction, même mal que les réserves qui « pèsent plus lourd »');
lien('lie-a', C, 'lie-0374', 'trois îles basses écrasées en cinq ans : perturbations du ciel ou extinction, non tranché');
lien('lie-a', C, 'esp-0014', 'les troupeaux s\'attardent l\'été autour des errantes ; « air léger » parent, selon les naturalistes d\'Invernis');
lien('lie-a', C, 'esp-0016', 'nichent sur les rebords ; leurs œufs et leurs plumes attirent les chasseurs d\'œufs');
lien('lie-a', C, 'pol-0087', 'les errantes finissent dans les fjords ; pilotes et chasseurs d\'œufs d\'Elarian');
lien('a-ne-pas-confondre-avec', C, 'lie-1072', 'ruines de la Chute qui flottent d\'elles-mêmes, immobiles ; les errantes sont des roches qui portent parfois des ruines');
lien('situe-dans', E, 'lie-0894', null);
lien('lie-a', E, C, 'échouées : errantes trop lourdes pour le vent');
lien('situe-dans', B, 'lie-0892', null);
lien('lie-a', B, C, 'errantes de cinq à vingt-cinq mètres, au vent');
lien('lie-a', B, 'pol-0087', 'couloir de dérive vers les fjords d\'Elarian');
alias(C, 'pierres de ciel', 'nom populaire de Brastallia');
alias(C, 'îles non tenues', 'terme du Magistère');
alias(C, 'échouées', 'les grandes errantes de Lysoria');
alias(E, 'les Échouées', 'forme courte');
alias(B, 'le couloir des errantes', 'nom des guides de Brastoris');

/* ── nuances tracées sur le canon voisin ── */
const MOTIF_N = `les errantes (${C}) sont des roches de cielvif qui portent parfois des ruines ; les ruines de Caelum Prima restent la seule ruine qui flotte d'elle-même ; ${MOTIF}`;
retouche('lie-1072', 'summary',
  'la seule ruine flottante du monde',
  'la seule ruine qui flotte d\'elle-même',
  MOTIF_N);
retouche('lie-1072', 'body',
  'C\'est la seule ruine flottante du monde ; les cités de l\'An 0, elles, sont tombées, et aucune ne flotte.',
  `C'est la seule ruine qui flotte d'elle-même : ailleurs, ce sont des roches de cielvif, les errantes (${C}), qui portent quelques ruines. Les cités de l'An 0, elles, sont tombées, et aucune ne flotte.`,
  MOTIF_N);
retouche('pol-0021', 'body',
  'Astravia est le seul pays qui en porte.',
  `Astravia est le seul pays qui en porte. Seules dérivent les errantes (${C}), roches de cielvif que nul mage ne tient : au vent pour les petites, de quelques mètres par an pour les grandes échouées de Lysoria.`,
  `les îles du Magistère sont tenues, donc immobiles ; les errantes sauvages dérivent sans rythme ; ${MOTIF}`);

/* ── garde-fous ── */
const INTERDITS = /atrium|pesanteur (faible|affaiblie)|balanc|l'envers|lacs?[- ]miroirs?|rideau de ros|Panghor|Profondeur Premi|\bpuls|battement|à heure fixe|chaque (jour|nuit|année) à|heure du geste|cité volante qui flotte/i;
for (const [id, txt] of ecrits) {
  const t = txt.replace(/pas de balancement|ni balancement|sans balancement|aucune pulsation|pesanteur faible, pas de balancement/gi, '');
  if (INTERDITS.test(t)) echec(`${id} : le texte neuf contient un élément proscrit : « ${t.match(INTERDITS)[0]} »`);
}
for (const e of [conErrantes, lieEchouees, lieErrantes]) {
  if (e.data.coord_x != null || e.data.coord_y != null) echec(`${e.id} : coord_x/y interdites (position_estimee seulement)`);
}
const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) {
  rapport.issues.filter((x) => x.severity === 'erreur').slice(0, 10).forEach((x) => console.error('  ', x.message));
  echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
}
{ // garde : une donnée validée avant ne doit jamais être rétrogradée (relecture D46, lot 522)
  const avantDoc = JSON.parse(brutBase);
  const valides = (d) => new Map([...d.entities, ...d.relations].filter((x) => x.data && (x.data.validation || x.data.statut === 'validé')).map((x) => [x.id, JSON.stringify([x.data.statut, x.data.validation])]));
  const vAvant = valides(avantDoc), vApres = valides(doc);
  const retro = [...vAvant].filter(([id, v]) => vApres.get(id) !== v).map(([id]) => id);
  console.log(`✓ rétrogradations : ${retro.length}`);
  if (retro.length) echec(`validation rétrogradée : ${retro.join(', ')}`);
}
console.log(`✓ écritures (${journal.length}) :`); journal.forEach((j) => console.log('   ' + j));
console.log(`✓ fiches Docs touchées : ${[...docsTouches].map((p) => path.relative(ROOT, p)).join(', ') || 'aucune'}`);
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
if (!journal.length) { console.log('rien à écrire (déjà à jour)'); process.exit(0); }
if (fs.readFileSync(BASE, 'utf8') !== brutBase) echec('data/kg-base.json a changé pendant le calcul (autre session) : relancer');
doc._meta.updated_at = NOW;
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
for (const p of docsTouches) fs.writeFileSync(p, docsCRLF.get(p) ? docsTexte.get(p).replace(/\n/g, '\r\n') : docsTexte.get(p));
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités). Ensuite : npm run kg:db`);
