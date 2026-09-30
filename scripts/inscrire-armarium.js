#!/usr/bin/env node
/**
 * Inscrit au graphe l'Armarium, la citadelle de Frondeval (décision de
 * l'auteur du 30 septembre 2026, D17 du prototype), et trace les écarts de
 * l'étude de placement que le canon dominant tranche sans ambiguïté.
 *
 * Sources : HybeliorPrototype/Docs/DECISIONS.md (D17) et
 * HybeliorPrototype/Docs/atrium_edifice/placement/PLACEMENT.md (§2.1, §3,
 * §4, §5.1 pour le lieu ; §6 pour les écarts, reportés au registre des
 * incohérences, II, §15).
 *
 * Écrit :
 *  - l'entité lieu « Armarium » (lieu-dit, citadelle), pointe de l'éperon en
 *    coordonnée monde (−403,5 ; −138,8), région Frondeval ; ses deux
 *    rattachements situe-dans (Frondeval, Seraphia), tirés des fiches des deux
 *    lieux les plus proches, jamais du polygone de Seraphia (non validé) ;
 *    l'alias « la Taiseuse » (nom du pays). Les cinq âges restent au corps,
 *    marqués comme proposition : la lignée n'est pas arbitrée, aucun fait.
 *  - le Conclave des Scribes n'a pas d'entité : le script le signale et
 *    n'invente rien (si elle apparaît un jour, le lien est posé).
 *  - écart 2 : fondation de Seraphia (pol-0006, ali-0118, nouvel alias
 *    « Caverana ») ; écart 3 : Galenthis et la Confédération de
 *    Galenthis-Centre (pol-0059, nouvel alias) ; écart 8 : Caelorn (lie-0162).
 *    Chaque arbitrage dans data.arbitrage de l'entité touchée.
 *
 * Identifiants : suivants de l'allocateur de lib/kg-core.js (le plus grand
 * + 1) ; relancé, le script retrouve ce qu'il a déjà écrit (idempotent).
 * Validation par lib/kg-core.js ; aucun reseed.
 *
 * Usage : node scripts/inscrire-armarium.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-09-30T00:00:00.000Z';
const DATE = '2026-09-30';

const NOM = 'Armarium';
const FRONDEVAL = 'lie-0397';
const SERAPHIA = 'pol-0006';
const VOISINS = { 'lie-0481': 'Velithor', 'lie-0480': 'Ithoria' };

function echec(msg) { console.error('✗ ' + msg + ' — rien n\'est écrit'); process.exit(1); }

/* ── le lieu ── */
const SUMMARY = 'Citadelle fermée de la retombée sud-est de la chaîne de Frondeval, en Seraphia : le dépôt de la réserve du Conclave des Scribes, plus ancien que Seraphia, qui le tolère sans l\'aimer. Personne n\'y vit ; les Scribes y montent une fois l\'an déposer les copies de l\'année. Le pays l\'appelle la Taiseuse.';

const BODY = `## Le lieu

Citadelle fermée sur l'éperon qui termine au sud-est la chaîne de Frondeval, en Seraphia. La chaîne descend du nord-nord-ouest au sud-sud-est ; son sommet est à neuf kilomètres environ au nord de la pointe, qui domine la source d'une rivière filant au midi. Une autre rivière naît à l'ouest de la chaîne et gagne la mer au sud-ouest.

La région est Frondeval, la forêt la plus sauvage du pays, celle des ermites-artistes : ce sont les seuls que Seraphia laisse se taire, et leur statut y est « honoré mais légèrement suspect ». Un bâtiment d'où ne sort aucun chant y a le même.

## Ce qu'est l'Armarium

Le dépôt fermé de la réserve du Conclave des Scribes. Né vers 5 500, cet ordre d'archivistes, d'historiens et de copistes entretient des « scriptoria de réserve » dans quinze nations, copies redondantes des archives vitales, et refuse depuis sa fondation toute appartenance nationale. Son siège n'est pas ici : la Chronologie le dit « Celethor/Lumasar ».

Personne ne vit dans la citadelle et personne ne la garde de l'intérieur. Les Scribes y montent une fois l'an déposer les copies de l'année ; hors de ce jour, le châtelet n'est presque jamais emprunté. Le dernier dépôt date de la fin de l'an 250 ; celui de l'an 251 n'est pas encore venu, et c'est là que les fonds s'arrêtent.

## Ce qu'il garde

De l'ordre de deux millions et demi de volumes : moins que les 3 742 000 ouvrages de la Grande Bibliothèque de Holvendar, la plus vaste d'Ilthara. C'est une réserve de copies, non la plus grande collection du monde. Des travées restent vides, celles des dépôts à venir, et le manque se voit.

Les fonds sont ceux du monde, avec ses pertes. Des siècles du Lien, seul ce qui a survécu à la Grande Nuit y est ; rien d'Endara, dont les 40 000 rouleaux ont tous disparu. Aucun exemplaire n'y est meilleur que le meilleur connu : la ligne du « sixième Éternel » d'un texte de l'Ordo Caelum y est lacunaire comme partout, et les Tables stellaires y sont telles que les Stellaris les recopient. On y range par dépôt, année après année ; rien n'y met en regard les versions rivales d'un même fait, usage propre à Elarian.

Ce qui a été tu ou purgé n'y est pas. Le dépôt ne reçoit que ce que les archives des nations confient au Conclave des Scribes, et nul ne confie un manuscrit qu'il purge : ceux que Seraphia fait disparaître sont à Varithor, en Kharazir, dans la bibliothèque flottante.

## Les noms et la devise

- **Armarium** : le nom des Scribes, et celui des livres. En langue d'Aethran ancienne, l'armoire aux livres des monastères ; le mot vient de celui qui disait les armes et les outils, et c'est bien une forteresse devenue armoire à livres. Il ne prétend pas au tout.
- **La Taiseuse** : le nom du pays. Celle qui se tait, non la muette : à Seraphia, les « Muets » sont ceux qui ne créent rien, et la réserve est pleine d'œuvres. Le surnom est mi-respectueux, mi-méfiant, comme le statut des ermites de Frondeval.
- **Omnia Dicta**, « tout ce qui a été dit » : la devise gravée au-dessus du châtelet, jamais employée comme nom. Elle dit ce que le lieu prétend de lui-même, et Varithor la dément.

À Seraphia, « le Conclave » tout court est le Conclave des Illuminés, qui gouverne le pays : on dit toujours « Conclave des Scribes » en entier.

## La pierre

Le Roc, la base de la citadelle, est d'une pierre du pays, gris sombre. Aucun bloc n'y vient d'Aethranor, et la pierre bleue n'y paraît nulle part.

## Seraphia et l'Armarium

Seraphia le tolère sans l'aimer. Elle purge des manuscrits dont elle nie l'existence, et depuis la Codification de la Beauté (an 110) elle ne tient qu'une lecture de ses Tables stellaires, les autres étant « autorisées en privé mais interdites en chaire ». La réserve existe malgré elle. Elle est plus ancienne que Seraphia de plus de trois millénaires (le Conclave des Scribes naît vers 5 500, Seraphia vers 8 800) ; les Scribes sont intouchables, même en temps de guerre, sauf deux exceptions notables que rien n'identifie ; une réserve fermée ne prêche rien ; et ce que Seraphia purge n'y a jamais été confié.

## Alentours

Au levant, la forêt de Frondeval et les cabanes dispersées de Velithor, à 9 km ; les teinturiers de Zyndril, à 18 km. Au nord, l'arête et son sommet, puis Ithoria et ses sculpteurs de bois mort, à 14 km ; au nord-ouest, les oliviers de Thalinar, à 16 km. Au couchant, la vallée de la rivière de l'ouest, la mer et Esaridia, cité des marchés de l'art, à 14 km. Au midi, la vallée de la rivière née au pied de l'éperon, puis la plaine de Ventera : Varethor, à 13 km, et les haras d'Arlyndor, à 21 km. La grotte d'Altheus, à Velynor, est à 30 km, dans un autre massif ; Althior, la capitale, à 40 km. Distances à vol d'oiseau.

## Les cinq âges (proposition, non validée)

Les sources de la lignée de Caverana se contredisent (registre des incohérences, II, §15) : aucun fait n'est versé tant que l'auteur ne les a pas arbitrées. L'étude de placement propose, sous réserve :

- **I. Le Roc** (Grande Nuit) : un refuge de pierre sèche, sans arc, le seul genre de bâtiment qui ait tenu quand les édifices du Lien cédaient. Le puits du gouffre, taillé de main d'homme, en fut la carrière : son fond est connu, sec, sans galerie, et il ne communique avec rien.
- **II. Les Moellons** : la place forte s'élève. Qui la tient dépend de l'arbitrage de la lignée.
- **III. Les Lits de brique** : le Conclave des Scribes prend la place et en fait le dépôt de sa réserve. La brique, que Seraphia n'emploie pas, est sa main.
- **IV. Les Loggias** et **V. Les Coupoles** : de la même main, dans la paix d'avant le Sillage, sans signature séraphienne (ni vitrail narratif, ni clocher accordé, ni marbre blanc de Thalvorn).

Le scriptorium, atelier de copie et donc habité, serait hors les murs, au pied de l'éperon. L'Incendie Sacré, qui met fin à la Principauté de Caverana, n'est situé nulle part : on ne le pose pas ici.
`;

const DATA = {
  echelle: 'lieu-dit',
  type_lieu: 'citadelle',
  region: 'Frondeval',
  coord_x: -403.5,
  coord_y: -138.8,
  note: 'Pointe de l\'éperon, relevée sur la carte peinte (étude de placement, §2.1 : tuiles aux niveaux 15 à 17) ; la rotonde est ~250 m plus haut sur l\'axe, vers (−403,6 ; −139,0). Rattachement par les fiches : Velithor (lie-0481, 8,9 km) et Ithoria (lie-0480, 13,8 km), les deux lieux les plus proches, sont rangés en Frondeval et en Seraphia ; jamais par le polygone de Seraphia, non validé (registre, II, §7 ter).',
  provenance: {
    decision: 'Décision de l\'auteur du 2026-09-30 : HybeliorPrototype/Docs/DECISIONS.md, D17',
    etude: 'HybeliorPrototype/Docs/atrium_edifice/placement/PLACEMENT.md (§2.1, §3, §4, §5.1)',
  },
  arbitrage: {
    date: DATE,
    qui: 'délégation de l\'auteur (D17), au canon dominant ; l\'auteur peut les renverser',
    decision: [
      'Dépôt fermé de la réserve du Conclave des Scribes, plus ancien que Seraphia, qui le tolère sans l\'aimer ; le siège du Conclave des Scribes reste celui de la Chronologie, « Celethor/Lumasar ».',
      'Fonds sous les 3 742 000 ouvrages de Holvendar : vers 2,5 millions de volumes, travées vides visibles.',
      'Le Roc est d\'une pierre du pays, gris sombre, jamais la pierre bleue d\'Aethranor.',
      'Le dépôt annuel des Scribes explique l\'arrêt des fonds à l\'an 250 ; le châtelet n\'est presque jamais emprunté.',
      'Lieu ordinaire, pas une question.',
    ],
    motif: 'Étude de placement, §1.1, §1.2 (règles 9 et 10), §3 et §7 ; D17.',
  },
  fonds: { volumes: 'environ 2 500 000', plafond: 'moins que les 3 742 000 ouvrages de Holvendar', dernier_depot: 'fin de l\'an 250' },
  conclave_des_scribes: 'Entité absente du graphe, que la Chronologie décrit (Ère VI : « Le Conclave des Scribes (Celethor/Lumasar, ~5 500 → présent) »). Le lien de l\'Armarium à son propriétaire sera posé quand elle sera créée ; il n\'est pas inventé ici.',
  garde_fous: [
    'Le nom de fiction n\'est jamais celui du savoir du site : ni mur, ni livre, ni inscription, ni objet (règle 1).',
    'Rangement par dépôt, jamais par dispute ; aucune réponse aux questions que le monde laisse ouvertes (règle 2).',
    'Aucun exemplaire meilleur que le meilleur connu (règle 3).',
    'Aucun journal rangé « achevé » quand le sort de son auteur est protégé ; rien n\'y confirme ni n\'y dément un récit des livres (règles 4 et 5).',
    'Ce qui a été tu ou purgé n\'y est pas (règle 6).',
    'Le gouffre est taillé, sec, sans galerie ; rien n\'y bat ni n\'y respire (règle 7, proposition).',
    'Les annotations sont celles des gardiens du dépôt, d\'une écriture humaine et datée (règle 8, proposition).',
    'Pas de pierre bleue ; aucun bloc d\'Aethranor (règle 9).',
  ],
};

const ALIAS_TAISEUSE = {
  value: 'la Taiseuse', alias_status: 'variante',
  meaning: 'nom du pays : celle qui se tait, non la muette ; surnom mi-respectueux, mi-méfiant (décision de l\'auteur, 2026-09-30)',
};

/* ── les écarts de l'étude de placement tranchés au canon dominant (§6 → registre, II, §15) ── */
const QUI = 'délégation de l\'auteur (D17 : « tranchés au canon dominant »), 2026-09-30';
const ALI_0118_AVANT = { from_year: 5181, meaning: 'royaume theocratique — Fondé par Davan (soutenu par l\'Ordo Caelum). Savoir et médecine.' };
const ALI_0118_APRES = { from_year: 8800, meaning: 'royaume théocratique — fondé vers 8 800 par le moine Altheus, héritier de la Principauté de Caverana (lignée de Davan, soutenue par l\'Ordo Caelum). Savoir et médecine.' };
const ALIAS_CAVERANA = {
  entity_id: SERAPHIA, value: 'Caverana', alias_status: 'predecessor', from_year: 5181, to_year: 8800,
  meaning: 'territoire — la Principauté de Caverana des héritiers de Davan, ancêtre direct de Seraphia ; ses dates et les maîtres de la région entre ~6 400 et ~8 800 restent ouverts (registre des incohérences, II, §15, écart 1)',
};
const ALIAS_GALENTHIS = {
  entity_id: 'pol-0059', value: 'Confédération de Galenthis-Centre', alias_status: 'variante', from_year: 2800, to_year: 5181,
  meaning: 'forme confédérale de Galenthis, nom que lui donne la Chronologie (Ère VI) ; même polité (arbitrage du 2026-09-30)',
};
const arbSeraphia = (idCaverana) => ({
  date: DATE,
  qui: QUI,
  decision: `Seraphia est fondée vers 8 800 par le moine Altheus, héritière de la Principauté de Caverana ; Davan de Caverana est l'ancêtre de la Principauté, non le fondateur de Seraphia. L'alias ali-0118 commence donc vers 8 800 ; de 5 181 à 8 800, le territoire porte le nom de Caverana (${idCaverana}).`,
  motif: 'Chronologie, Ère VI (Guerre des Trois Couronnes : les héritiers de Davan « établiront la Principauté de Caverana, ancêtre direct de Seraphia » ; table des nations : Seraphia, de la Principauté de Caverana, ~8 800) ; Histoire de Seraphia (fondation par Altheus) ; fac-0364, fac-0751. Seul ali-0118, venu de timeline-names.json, disait « Fondé par Davan » dès 5 181. Registre des incohérences, II, §15, écart 2.',
  avant: { 'ali-0118': ALI_0118_AVANT },
});
const arbGalenthis = (idAlias) => ({
  date: DATE,
  qui: QUI,
  decision: `Galenthis et la Confédération de Galenthis-Centre sont une seule polité : la Confédération est la forme que Galenthis prend vers 2 800 (alias ${idAlias}). La chute reste datée de la Nuit des Trois Étendards (~5 181) ; la guerre qu'elle ouvre dure jusqu'à ~5 230 (Accords de Lumasar, ~5 228), fin que retient la table de l'Ère VI.`,
  motif: 'Chronologie : l\'une et l\'autre sont dites successeur de l\'Hégémonie d\'Aethran (Ère V, Convention de Gryndor, ~2 950 ; Ère VI, Guerre des Trois Couronnes), et les trois héritiers de la Confédération proclament chacun « roi de Galenthis » ; le résumé de pol-0059 reprend celui de la Confédération (tradition mercenaire, carrefour commercial). Galenthis existe avant 2 800 (Ère V : Galenor-est contesté avec Drahk\'Nor, ~2 000 → ~3 500). Registre des incohérences, II, §15, écart 3.',
});
const ARB_CAELORN = {
  date: DATE,
  qui: QUI,
  decision: 'Écart assumé : position = carte de l\'auteur, rattachement = fiches. Caelorn reste l\'oasis de Qythros, en Torkam (lnk-1997), à la place où l\'auteur l\'a posée, que la carte peinte met au bord d\'un grand lac.',
  motif: 'Règle des écarts carte / fiches (Iskara, Thalmaris, Skaldoria, Myrtam : registre, I, « Positions carte vs fiches »). Relevé de l\'étude de placement, §6, écart 8 ; registre des incohérences, II, §15.',
};

/* ── contrôles ── */
const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const g = core.mergeGraph(doc, {});
const E = (id) => g.byId.get(id);
if (!E(FRONDEVAL) || E(FRONDEVAL).name !== 'Frondeval') echec(`${FRONDEVAL} n'est pas Frondeval`);
if (!E(SERAPHIA) || E(SERAPHIA).name !== 'Seraphia') echec(`${SERAPHIA} n'est pas Seraphia`);
const situe = (from, to) => g.relations.some((r) => r.rel_type === 'situe-dans' && r.from_id === from && r.to_id === to);
if (!situe(FRONDEVAL, SERAPHIA)) echec('Frondeval n\'est pas situé dans Seraphia');
for (const [id, nom] of Object.entries(VOISINS)) {
  const v = E(id);
  if (!v || v.name !== nom) echec(`${id} n'est pas ${nom}`);
  if (!v.data || v.data.region !== 'Frondeval' || !situe(id, SERAPHIA)) echec(`la fiche de ${nom} ne la range plus en Frondeval et en Seraphia : revoir le rattachement`);
}
if (/atrium/i.test(NOM + SUMMARY + BODY + JSON.stringify(ALIAS_TAISEUSE))) echec('le mot « Atrium » est hors monde : il n\'entre ni dans la fiction ni dans la fiche');
for (const [id, nom] of [['pol-0059', 'Galenthis'], ['lie-0162', 'Caelorn'], ['pol-0040', 'Torkam']]) {
  if (!E(id) || E(id).name !== nom) echec(`${id} n'est pas ${nom}`);
}
const ali118 = doc.aliases.find((a) => a.id === 'ali-0118');
if (!ali118 || ali118.entity_id !== SERAPHIA || ali118.value !== 'Seraphia') echec('ali-0118 n\'est plus l\'alias « Seraphia » de pol-0006');

const deja = doc.entities.find((e) => e.type === 'lieu' && e.name === NOM);
const ID = deja ? deja.id : core.nextEntityId(g, 'lieu');
const homonyme = doc.entities.find((e) => e.id !== ID && e.name === NOM);
if (homonyme) echec(`une autre entité porte déjà le nom « ${NOM} » (${homonyme.id})`);

/* ── l'entité ── */
const { ops: opsE } = core.prepareWrite(g, 'save-entity', {
  id: ID, type: 'lieu', name: NOM, slug: null, summary: SUMMARY, body: BODY, data: DATA,
  status: 'canon', disclosure: 'public',
}, NOW);
const rec = opsE[0].record;
if (deja && deja.created_at) rec.created_at = deja.created_at;
if (deja && JSON.stringify({ ...deja, updated_at: 0 }) === JSON.stringify({ ...rec, updated_at: 0 })) rec.updated_at = deja.updated_at;
core.applyOps(g, opsE);

/* ── rattachements (fiches, jamais polygones) ── */
const nouveaux = { relations: [], aliases: [] };
function relation(r) {
  const { ops } = core.prepareWrite(g, 'save-relation', r);
  core.applyOps(g, ops);
  nouveaux.relations.push(ops[0].record);
  return ops[0].record;
}
function alias(a) {
  const { ops } = core.prepareWrite(g, 'save-alias', a);
  core.applyOps(g, ops);
  nouveaux.aliases.push(ops[0].record);
  return ops[0].record;
}
const relFrondeval = relation({ rel_type: 'situe-dans', from_id: ID, to_id: FRONDEVAL });
const relSeraphia = relation({ rel_type: 'situe-dans', from_id: ID, to_id: SERAPHIA });
const aliTaiseuse = alias({ entity_id: ID, ...ALIAS_TAISEUSE });

/* ── le Conclave des Scribes : on cherche, on n'invente pas ── */
const conclave = doc.entities.find((e) => /conclave des scribes/i.test(e.name))
  || (() => { const a = doc.aliases.find((x) => /conclave des scribes/i.test(x.value)); return a && E(a.entity_id); })();
let relConclave = null;
if (conclave) relConclave = relation({ rel_type: 'lie-a', from_id: ID, to_id: conclave.id, label: 'dépôt de la réserve du Conclave des Scribes' });

/* ── écart 2 : la fondation de Seraphia ── */
const aliCaverana = alias(ALIAS_CAVERANA);
const ali118Neuf = alias({ ...ali118, ...ALI_0118_APRES, id: 'ali-0118' });
/* ── écart 3 : Galenthis ── */
const aliGalenthis = alias(ALIAS_GALENTHIS);

/* ── application ── */
function poser(arr, r) {
  const k = arr.findIndex((x) => x.id === r.id);
  if (k >= 0) arr[k] = r; else arr.push(r);
}
function arbitrer(id, arbitrage) {
  const e = doc.entities.find((x) => x.id === id);
  if (e.data && e.data.arbitrage && JSON.stringify(e.data.arbitrage) === JSON.stringify(arbitrage)) return false;
  if (e.data && e.data.arbitrage) echec(`${id} porte déjà un autre data.arbitrage : à fusionner à la main`);
  e.data = { ...(e.data || {}), arbitrage };
  e.updated_at = NOW;
  return true;
}
poser(doc.entities, rec);
nouveaux.relations.forEach((r) => poser(doc.relations, r));
nouveaux.aliases.forEach((a) => poser(doc.aliases, a));
const touches = [
  [SERAPHIA, arbSeraphia(aliCaverana.id)],
  ['pol-0059', arbGalenthis(aliGalenthis.id)],
  ['lie-0162', ARB_CAELORN],
].filter(([id, a]) => arbitrer(id, a)).map(([id]) => id);

const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) {
  rapport.issues.filter((x) => x.severity === 'erreur').slice(0, 10).forEach((x) => console.error('  ', x.message));
  echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
}

console.log(`✓ ${ID} « ${NOM} » : lieu-dit (citadelle), (−403,5 ; −138,8), région Frondeval, corps ${BODY.length} car.`);
console.log(`✓ rattachements : ${relFrondeval.id} → Frondeval (${FRONDEVAL}), ${relSeraphia.id} → Seraphia (${SERAPHIA})`);
console.log(`✓ alias ${aliTaiseuse.id} « ${aliTaiseuse.value} » (${aliTaiseuse.alias_status})`);
console.log(relConclave
  ? `✓ Conclave des Scribes : ${conclave.id}, lien ${relConclave.id}`
  : '· Conclave des Scribes : aucune entité au graphe — lien non posé, signalé dans data.conclave_des_scribes');
console.log(`✓ écart 2 : ${ali118Neuf.id} « Seraphia » dès ${ali118Neuf.from_year} ; ${aliCaverana.id} « Caverana » ${aliCaverana.from_year} → ${aliCaverana.to_year}`);
console.log(`✓ écart 3 : ${aliGalenthis.id} « ${aliGalenthis.value} » sur pol-0059`);
console.log(`✓ data.arbitrage : ${touches.length ? touches.join(', ') : 'déjà en place'}`);
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités, ${doc.relations.length} relations, ${doc.aliases.length} alias). Régénère l'index : npm run kg:index`);
