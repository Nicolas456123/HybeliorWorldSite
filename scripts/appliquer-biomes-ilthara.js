#!/usr/bin/env node
/**
 * Applique à l'Atrium les décisions de l'auteur du 1er octobre 2026
 * (HybeliorPrototype/Docs/DECISIONS.md, D22) :
 *
 *  1. « Baelor est à la base froid » : le plan des biomes de l'auteur, qui
 *     peint l'île en désert de glace, fait foi. Baelor devient une île froide,
 *     subpolaire (glace, givre, lande rase, brumes) ; tout le canon compatible
 *     reste (falaises de basalte, Voile bas, lac Ce-qui-rend-le-ciel, cascade,
 *     Baeloris). Les écarts avec les livres vont au registre, sans prose
 *     réécrite.
 *  2. Les textes de fiches de D21 (« le plan fait le fond, le détail de la
 *     fiche devient une zone locale ») : Warenthor, Cendara, Valoria, Ulinor,
 *     Esperia, Ilthara, et la terre tempérée du pôle sud-ouest. Sources :
 *     HybeliorPrototype/Docs/monde/BIOMES_MAGIQUES.md §11 (v2) et, pour les
 *     textes inchangés, sa v1 (commit 5c293c8, §7.3 et §7.4). Deux options
 *     tranchées au canon dominant : Ulinor (forêt pluviale tempérée) et
 *     Esperia (forêts-galeries des vallées de l'est d'Endora). Aucun des
 *     éléments rejetés par l'auteur n'est importé (Glace qui refuse,
 *     Tempêtes Vivantes magiques, Envers, lacs miroirs, rideau de rosée,
 *     cratère où l'eau remonte).
 *  3. Les corrections de la planche d'Ilthara (Docs/monde/ilthara/PLANCHE.md,
 *     INCOHERENCES_A_CORRIGER.md §C) : C1 (huit positions en mer ramenées à
 *     terre, sur la vignette de la carte peinte), C11 (le Val-Serrin),
 *     C8 (altitudes des trois sommets). data/monde-contours.json n'est PAS
 *     touché (C2 : autre passe) ; il est seulement lu pour vérifier la terre.
 *
 * Chaque retouche d'un corps ou d'un résumé laisse une trace dans
 * data.raccord (date, champ, avant, pourquoi) ; la même retouche est faite
 * dans la fiche source de Docs/Lore/Pays quand le texte y figure (miroir).
 * Idempotent : relancé, il reconnaît ce qu'il a déjà écrit. Aucun reseed.
 *
 * Usage : node scripts/appliquer-biomes-ilthara.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const CONTOURS = path.join(ROOT, 'data', 'monde-contours.json');
const PAYS = path.join(ROOT, 'Docs', 'Lore', 'Pays');
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-01T00:00:00.000Z';
const DATE = '2026-10-01';
const D22 = 'décision de l\'auteur du 2026-10-01 (HybeliorPrototype/Docs/DECISIONS.md, D22)';

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
/* les fiches sont lues en LF (certaines sont en CRLF) et réécrites avec leur fin de ligne d'origine */
const docsCRLF = new Map();
const docsTexte = new Map(fichiers.map((p) => {
  const brut = fs.readFileSync(p, 'utf8');
  docsCRLF.set(p, brut.includes('\r\n'));
  return [p, brut.replace(/\r\n/g, '\n')];
}));
const docsTouches = new Set();
/* miroir : seulement dans les fiches que le corps de l'entité cite comme sources (« <!-- source: … --> ») ;
   à défaut (lieux « extraits de la fiche de … »), dans toute fiche de Docs/Lore/Pays qui porte le texte */
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
const ecrits = []; // textes neufs, passés au crible des garde-fous
function retouche(id, champ, avant, apres, pourquoi) {
  const e = ent(id);
  const t = e[champ] || '';
  ecrits.push([id, apres]);
  if (t.includes(apres)) return false; // déjà fait (l'« avant » peut être contenu dans l'« après »)
  if (t.includes(avant)) {
    e[champ] = t.split(avant).join(apres);
    e.data = e.data || {};
    e.data.raccord = e.data.raccord || [];
    e.data.raccord.push({ date: DATE, champ, avant, pourquoi });
    e.updated_at = NOW;
    const m = champ === 'body' ? miroir(avant, apres, t) : 0;
    journal.push(`${id} ${e.name} · ${champ}${m ? ` (+ ${m} fiche${m > 1 ? 's' : ''} Docs)` : ''}`);
    return true;
  }
  echec(`${id} (${e.name}) : texte introuvable dans ${champ} : « ${avant.slice(0, 80)}… »`);
}
function resume(id, apres, pourquoi) {
  const e = ent(id);
  if (e.summary === apres) return false;
  return retouche(id, 'summary', e.summary, apres, pourquoi);
}
function poserData(id, cle, valeur) {
  const e = ent(id);
  e.data = e.data || {};
  if (JSON.stringify(e.data[cle]) === JSON.stringify(valeur)) return false;
  e.data[cle] = valeur;
  e.updated_at = NOW;
  return true;
}

/* ════════════════════ 1. BAELOR, ÎLE FROIDE ════════════════════ */
const P_BAELOR = `${D22} : « Baelor est à la base froid. » Le plan des biomes de l'auteur peint l'île en désert de glace ; la fiche disait « tempéré-océanique ». Registre des incohérences, II, §14 (F4).`;
ent('lie-0003', 'Baelor');
resume('lie-0003', 'Île monastique froide et subpolaire, surnommée « l\'Île Fantôme » : falaises de basalte noir, lande rase sous le givre, glace l\'hiver, et un brouillard argenté permanent. Elle est habitée par un unique ordre d\'ascètes-guerriers (les Silentii/Taciti) qui pratiquent le silence et un langage gestuel codifié. Sites principaux : Baeloris, Tholmë, Velkadra, Thyldris. [Arbitrage : grande île, non comptée parmi les continents.]', P_BAELOR);
retouche('lie-0003', 'body',
  '| **Type** | Île-continent unique, tempéré-océanique, ceinturée de falaises noires |',
  '| **Type** | Île-continent unique, froide et subpolaire, ceinturée de falaises noires |', P_BAELOR);
retouche('lie-0003', 'body',
  '| **Climat** | Tempéré-océanique frais, brumeux ; soleil ~1 jour sur 3 |',
  '| **Climat** | Subpolaire océanique : froid, venté, brumeux ; givre la plus grande partie de l\'année, glace l\'hiver ; soleil ~1 jour sur 3 |', P_BAELOR);
retouche('lie-0003', 'body',
  'marais salants (récolte du **sel**)',
  'marais salants (récolte du **sel** : l\'eau de mer s\'y concentre dans des bassins pendant le court été, puis s\'achève dans des chaudières sur feux de tourbe)',
  P_BAELOR + ' Au froid, l\'évaporation seule ne suffit pas : les salines achèvent au feu de tourbe, comme dans les îles subpolaires réelles.');
retouche('lie-0003', 'body',
  'collines de bruyère sous brume permanente dite **le Voile bas** (brouillard léger jamais entièrement levé, même en été).',
  'collines de lande rase (bruyère naine, mousses, lichens) sous brume permanente dite **le Voile bas** (brouillard léger jamais entièrement levé, même en été ; l\'hiver, un brouillard givrant qui couvre de givre la lande et les cairns).', P_BAELOR);
retouche('lie-0003', 'body',
  'courant nord-sud, sépare côtes ouest et est.',
  'courant nord-sud, sépare côtes ouest et est. Neige et glace sur les crêtes tout l\'hiver ; des névés s\'attardent dans les combes jusqu\'au cœur de l\'été.', P_BAELOR);
retouche('lie-0003', 'body',
  'vers la côte ouest ; **aucune navigable**.',
  'vers la côte ouest ; **aucune navigable** ; prises par la glace au cœur de l\'hiver.', P_BAELOR);
retouche('lie-0003', 'body',
  'seulement des mares de tourbière de 10 à 50 m.',
  'seulement des mares de tourbière de 10 à 50 m, gelées l\'hiver.', P_BAELOR);
const LAC_AVANT = 'se jette dans la mer par une **cascade** de même hauteur, à l\'angle même.';
const LAC_APRES = 'se jette dans la mer par une **cascade** de même hauteur, à l\'angle même. L\'hiver, le lac prend en glace et la cascade se fige en colonnes le long de la muraille ; la glace ne cède qu\'au printemps.';
retouche('lie-0003', 'body', LAC_AVANT, LAC_APRES, P_BAELOR);
retouche('lie-1060', 'body', LAC_AVANT, LAC_APRES, P_BAELOR);
retouche('lie-0003', 'body',
  '**Biomes :** landes basses (majorité du plateau central), bruyères, prairies maigres, taillis de pins maritimes côtiers, bosquets de chênes nains dans les vallées intérieures. **Aucune forêt** véritable. **Aucun grand prédateur.**',
  '**Biomes :** lande rase subpolaire (majorité du plateau central) : bruyère naine, camarine, mousses et lichens, tourbières ; prairies maigres sur les terrasses abritées de la côte sud ; saules et bouleaux nains, couchés par le vent, dans les vallées intérieures. **Aucune forêt**, aucun arbre debout. Givre sur la lande la plus grande partie de l\'année ; glace de rive dans les criques abritées l\'hiver. **Aucun grand prédateur.**',
  P_BAELOR + ' Les pins maritimes et les chênes nains ne tiennent pas sous ce climat ; aucun livre ne les nomme.');
retouche('lie-0003', 'body',
  '**Climat (détail) :** hivers longs, doux mais humides ; étés courts et frais ; soleil ~1 jour sur 3. Vent dominant du sud-ouest (apporte le brouillard) ; au nord-est il porte sec et clair et **découvre l\'île** au regard',
  '**Climat (détail) :** île froide, subpolaire. Hivers longs, froids et sombres : gel presque chaque nuit, neige sur la dorsale, glace dans les criques abritées, brouillard givrant sur le plateau. Étés courts et frais, quelques semaines sans gel. Soleil ~1 jour sur 3. Vent dominant du sud-ouest (apporte le brouillard) ; au nord-est il porte sec, clair et glacial, et **découvre l\'île** au regard', P_BAELOR);
poserData('lie-0003', 'climat', {
  classe: 'subpolaire océanique (plan des biomes de l\'auteur : désert de glace)',
  decision: D22 + ' : « Baelor est à la base froid. »',
  garde: 'falaises de basalte, Voile bas, brouillard argenté, lac Ce-qui-rend-le-ciel (lie-1060) et sa cascade, Baeloris, vent du nord-est qui découvre l\'île',
  livres: 'C/30, C/31, T1/14-15, T3/05 : compatibles (froid qui monte en approchant, doigts gourds, air froid, roche froide, vin chaud d\'épices). Écart mineur : T1/53, « l\'algue chaude » (registre, II, §14, F).',
});

/* ════════════════════ 2. LES FICHES DE D21 ════════════════════ */
const P_D21 = (n) => `${D22} : textes de fiches de D21 acceptés (« le plan fait le fond, le détail de la fiche devient une zone locale ») ; HybeliorPrototype/Docs/monde/BIOMES_MAGIQUES.md, §11${n ? ` (${n})` : ''}. Registre des incohérences, II, §14 (F).`;

/* Warenthor (F6, §11.1) */
const P_W = P_D21('11.1, Warenthor : fond de taïga, zone de la forêt géante à canopée suspendue autour de Wyndor');
resume('pol-0015', 'Monarchie tribale de la forêt géante du sud d\'Ilthara : une taïga froide et profonde dont le cœur, sous une double canopée, garde un sous-bois moite et doux toute l\'année. Les voyageurs l\'appellent la jungle ; peuple animiste guidé par un Roi-Chaman et le Cercle des Anciens.', P_W);
resume('lie-0926', 'Unique région du royaume : une taïga de conifères géants drapés de lichens pendants comme des lianes, sous laquelle poussent des fougères hautes comme des hommes ; la vapeur monte dans les rayons, les sentiers se referment en une saison. Habitations suspendues, sol des esprits les plus anciens.', P_W);
retouche('lie-0926', 'body',
  '| **Ressources clés** | Bois tropicaux, plantes médicinales rares, pigments naturels, venins, fruits exotiques, cristaux de sève |',
  '| **Ressources clés** | Bois des conifères géants, plantes médicinales rares, pigments naturels, venins, baies et fruits du sous-bois, cristaux de sève |', P_W);
retouche('lie-0926', 'body',
  'fruits tropicaux variés ; racines bouillies dans du lait de coco ;',
  'baies et fruits du sous-bois ; racines bouillies ;', P_W + ' Le cocotier ne pousse pas dans une taïga.');
retouche('lie-0926', 'body',
  '- Unique région : englobe l\'ensemble du territoire, une jungle tropicale continue sans divisions naturelles évidentes.',
  '- Unique région : englobe l\'ensemble du territoire, une forêt continue sans divisions naturelles évidentes. Le fond est une taïga de conifères géants ; au cœur, autour de Wyndor et jusqu\'à Galdris, la double canopée garde un sous-bois moite et doux toute l\'année : c\'est ce que les voyageurs appellent la jungle.', P_W);

/* Cendara (F9, §11.2) */
const P_C = P_D21('11.2, Cendara : fond de toundra, pays-fournaise par la chaleur du sol');
resume('lie-0005', 'Archipel volcanique surnommé « l\'Île de Feu et de Cendres », dominé par le Mont Cendra. Sous un ciel de toundra, vent froid et sol gelé en surface, la Grande Île (Brumaria et Pyrevane) est un pays-fournaise : le Mont chauffe la roche par-dessous, les fissures fument, l\'eau froide tombe dans des bassins chauds et les forges travaillent à même les coulées. Une journée de mer suffit à passer du pays-fournaise au pays-laine d\'Arkhen, au nord du Détroit de Suie, humide et brumeux ; au large, l\'île tropicale d\'Ilnara. Religion dominante Ignis Aeternum ; lignée des Kharavasts.', P_C);
retouche('lie-0005', 'body',
  '- **Grande île** : chaud, sec, sulfureux.',
  '- **Grande île** : ciel de toundra, vent froid et sol gelé en surface ; mais pays-fournaise par-dessous : le Mont Cendra chauffe la roche, les fissures fument, et près des coulées, des forges et des bassins chauds l\'air est chaud, sec et sulfureux.', P_C);
retouche('lie-0005', 'body',
  '- **Arkhen** : tempéré humide, brumeux, doux.',
  '- **Arkhen** : le « pays-laine » ; taïga humide et brumeuse, plus fraîche que douce.', P_C + ' Le plan met un peu de taïga au nord de l\'archipel.');

/* Valoria (F14, v1 §7.3) */
const P_V = P_D21('11.3, Valoria : forêt de vapeur des volcans endormis de Voldenor ; texte de la v1, commit 5c293c8, §7.3');
retouche('pol-0090', 'body',
  '\n---\n\n## Gouvernement — La Confédération Clanique',
  '\n---\n\n## Paysage et climat\n\n- Entre deux déserts, les clans tiennent une forêt chaude et ruisselante : les volcans endormis de [[Montagnes de Voldenor|Voldenor]] soufflent sous la terre une vapeur qui retombe en pluie tiède, et la jungle de Valoria ne vit que de ce souffle.\n- Plus haut, sur les terres rocailleuses et dans les passes de Voldenor, le pays reste rude : hivers impitoyables, orge de montagne, bêtes de pierre.\n\n---\n\n## Gouvernement — La Confédération Clanique', P_V);

/* Ulinor (F10, v1 §7.4) : tranché, forêt pluviale tempérée */
const P_U = P_D21('11.4, Ulinor : tout Ulinor tempéré ; la forêt de Xyria devient une forêt pluviale, texte de la v1, commit 5c293c8, §7.4') + ' Option tranchée au canon dominant : la forêt pluviale (sous-biome humide du tempéré) garde tout ce que disent les fiches (forêt dense, canopée qui laisse le sol en pénombre, une journée de marche jusqu\'au tempéré frais), là où une exception « tropicale » demanderait une chaleur que rien n\'explique.';
retouche('lie-0013', 'body', 'forêts tropicales à l\'ouest (Xyria)', 'forêt pluviale à l\'ouest (Xyria)', P_U);
retouche('lie-0013', 'body',
  '**Climat :** tropical chaud à l\'ouest et au sud-ouest de l\'île principale · semi-aride au centre · tempéré frais en altitude à l\'est · tempéré humide dans les Vallées dhalvoriennes · subarctique sévère à Skaldoria. Dans certaines régions de l\'île principale, une journée de marche fait passer du tropical au tempéré frais.',
  '**Climat :** tempéré sur toute l\'île principale, humide et moite à l\'ouest et au sud-ouest, où la forêt pluviale de Xyria fait sa propre pluie · semi-aride au centre · tempéré frais en altitude à l\'est · tempéré humide dans les Vallées dhalvoriennes · subarctique sévère à Skaldoria. Une journée de marche fait passer de la forêt pluviale de Xyria, moite et si sombre que le sol reste en pénombre, au tempéré frais des hautes terres ; au nord-est, les mangroves d\'Elarion et leurs récifs chantants.', P_U);
retouche('lie-0013', 'body', 'Cristaux résonnants, bois tropical,', 'Cristaux résonnants, bois de la forêt pluviale,', P_U);
retouche('lie-0013', 'body', '| **Xyria** | Forêts tropicales ouest |', '| **Xyria** | Forêt pluviale ouest |', P_U);
resume('lie-0920', 'Forêt pluviale dense de l\'ouest de l\'île principale d\'Ulinor, moite, à la canopée si épaisse que le sol reste en pénombre ; y couper un arbre près d\'une ruine vaut le bannissement.', P_U);
retouche('lie-0920', 'body', 'Forêts tropicales denses couvrant tout l\'ouest de l\'île principale ;', 'Forêt pluviale dense et moite couvrant tout l\'ouest de l\'île principale ;', P_U);
retouche('lie-0814', 'body', 'Village de lisière entre la forêt tropicale et les plaines de Jentar', 'Village de lisière entre la forêt pluviale et les plaines de Jentar', P_U);
retouche('lie-0708', 'body', 'remèdes à base de plantes tropicales.', 'remèdes à base de plantes de la forêt pluviale.', P_U);

/* Esperia (F11, v1 §7.4) : tranché, choix (b) */
const P_E = P_D21('11.4, Esperia, choix (b) : forêts-galeries chaudes des vallées de l\'est d\'Endora ; texte de la v1, commit 5c293c8, §7.4') + ' Option tranchée au canon dominant : Esperia est « à l\'est » d\'Endora dans les fiches d\'Endora et de Sanvara, au bout des routes de caravanes de Murahal ; la poser sur les petites îles tropicales entre Alkaran et Endora (choix a) démentirait ces routes.';
resume('lie-0067', 'Forêt dense de l\'est d\'Endora, qui ne devient jungle qu\'au fond des vallées, le long de rivières sinueuses où l\'air reste chaud et lourd ; des cités perdues y dorment, celles d\'une civilisation qui gravait des glyphes magiques sur l\'écorce des arbres.', P_E);

/* Ilthara (F5 et C7, §11.5) */
const P_I = P_D21('11.5, Ilthara : du nord tempéré au sud froid, le sol dément la latitude ; F5 et C7');
resume('lie-0010', 'Continent surnommé « le Berceau de la Magie », où la magie imprègne le sol lui-même. Du nord tempéré, forestier et venteux, au sud froid ; mais le sol dément la latitude : chaînes veinées de cristal qui chantent au vent au nord, vallée tiède de Brevana entre ses volcans, plaines de Gryndor et les rochers de verre d\'Ordavan, bois d\'Ackerna au sol qui luit la nuit, forêt géante de Warenthor, moite sous sa double canopée, bassins de brouillard de Vytharia, terres brûlées de Drakora, chaudes par-dessous. On y trouve aussi les steppes de Lythar, les terres volcaniques de Pyrtara, les marécages de Noyrath et le Lac des Rêves. Huit nations de lignée Ombril.', P_I);
retouche('lie-0010', 'body', '| **Étendue climatique** | Du nord glacial au sud tropical |',
  '| **Étendue climatique** | Du nord tempéré, forestier et venteux, au sud froid ; le sol dément la latitude par endroits |', P_I);
retouche('lie-0010', 'body', 'Identités radicalement contrastées : jungle tropicale,',
  'Identités radicalement contrastées : forêt géante sous double canopée,', P_I);
retouche('lie-0010', 'body',
  '- **Sud** — jungle dense de Warenthor et marécages de Noyrath ; masse végétale presque impénétrable.',
  '- **Sud** — taïga froide autour de la mer intérieure, toundra plus au sud ; au cœur de Warenthor, la forêt géante sous double canopée, que les voyageurs appellent la jungle, et les marécages de Noyrath ; masse végétale presque impénétrable.', P_I);
retouche('lie-0010', 'body', '- **Nord** — terres glaciales.', '- **Nord** — terres tempérées, forestières et venteuses.', P_I);
retouche('lie-0010', 'body', '· jungle dense (Warenthor) ·', '· taïga (sud, autour de la mer intérieure) et forêt géante sous double canopée (cœur de Warenthor) · toundra (sud) ·', P_I);
retouche('lie-0010', 'body',
  '**Climat :** gradient du nord glacial au sud tropical ; plaines centrales tempérées.',
  '**Climat :** du nord tempéré, forestier et venteux, au sud froid : taïga autour de la mer intérieure, toundra et terres brûlées de Drakora au sud-est ; plaines centrales tempérées. Le sol dément la latitude par endroits : vallée tiède de Brevana entre ses volcans, sous-bois moite du cœur de Warenthor, bassins de brouillard de Vytharia.', P_I);

/* ════════════════════ 3. PLANCHE D'ILTHARA ════════════════════ */
/* terre : côte du site (lecture seule), comme la planche (m01_ilthara_sources.py) */
const contours = JSON.parse(fs.readFileSync(CONTOURS, 'utf8'));
const aire = (P) => { let a = 0; for (let i = 0; i < P.length; i++) { const [x1, y1] = P[i]; const [x2, y2] = P[(i + 1) % P.length]; a += x1 * y2 - x2 * y1; } return a / 2; };
/* jeu actuel ; depuis le commit 0ae1db815 (C2), la mer intérieure et les lacs sont des anneaux de niveau « eau » :
   un point est à terre quand le plus petit anneau qui le contient est une terre (île de la mer intérieure comprise) */
const jeu = contours.jeux.find((j) => j.era_id == null) || contours.jeux[0];
const anneaux = jeu.masses.filter((m) => m.niveau === 'continent' || m.niveau === 'eau');
const masses = jeu.masses.filter((m) => m.niveau === 'continent');
function dedans(P, x, y) { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i]; const [xj, yj] = P[j]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; }
function aCote(P, x, y) { let b = Infinity; for (let i = 0; i < P.length; i++) { const [ax, ay] = P[i]; const [bx, by] = P[(i + 1) % P.length]; const dx = bx - ax; const dy = by - ay; const l2 = dx * dx + dy * dy; let t = l2 ? ((x - ax) * dx + (y - ay) * dy) / l2 : 0; t = Math.max(0, Math.min(1, t)); b = Math.min(b, Math.hypot(x - ax - t * dx, y - ay - t * dy)); } return b; }
function terre(x, y) {
  let m = null;
  for (const a of anneaux) if (dedans(a.points, x, y) && (!m || Math.abs(aire(a.points)) < Math.abs(aire(m.points)))) m = a;
  if (!m || m.niveau !== 'continent') return null;
  return m.nom === 'Ilthara' ? 'terre principale' : (m.nom || 'île');
}
const cote = (x, y) => Math.min(...anneaux.map((a) => aCote(a.points, x, y)));

/* C1 : cible = la vignette de la carte peinte (lieux.json de la planche), poussée
   à terre au plus près quand la vignette touche la côte (écart peinture / tracé) */
const C1 = [
  ['lie-0665', 'Holvendar', [-214.918, 62.383], [-209.1, 66.5], 'vignette de la carte peinte, à terre (PLANCHE.md §3.5)'],
  ['lie-0680', 'Faldrin', [-274.471, 43.71], [-272.79, 46.68], 'vignette peinte (−272,24 ; 46,13), poussée à ~1 u de la côte'],
  ['lie-0865', 'Velthar', [-224.927, 82.825], [-226.11, 84.76], 'vignette peinte (−225,46 ; 83,86), en mer au tracé, poussée à ~0,8 u de la côte'],
  ['lie-0695', 'Wyndor', [-217.752, 170.123], [-217.26, 173.27], 'vignette peinte, sur l\'île de la mer intérieure (bourg sur pilotis, près du rivage)'],
  ['lie-0724', 'Merias', [-331.53, 105.953], [-330.79, 109.02], 'vignette peinte (−332,14 ; 108,37), en mer au tracé, poussée à ~1 u de la côte'],
  ['lie-0705', 'Valdyn', [-153.302, 63.162], [-152.29, 66.51], 'vignette peinte (−151,64 ; 65,86), poussée à ~1 u de la côte'],
  ['lie-0829', 'Nelthoris', [-175.323, 60.829], [-175.88, 63.92], 'vignette peinte (−175,53 ; 61,72), en mer au tracé, poussée à ~0,8 u de la côte'],
];
const fmt = (v) => String(Math.round(v * 100) / 100).replace('.', ',');
const deplaces = [];
function deplacer(id, nom, avant, apres, motif) {
  const e = ent(id, nom);
  const d = e.data;
  if (Math.abs(d.coord_x - apres[0]) < 1e-6 && Math.abs(d.coord_y - apres[1]) < 1e-6) return;
  if (Math.abs(d.coord_x - avant[0]) > 0.01 || Math.abs(d.coord_y - avant[1]) > 0.01) echec(`${nom} n'est plus à sa position de fiche attendue`);
  if (!terre(apres[0], apres[1])) echec(`${nom} : la cible (${apres}) n'est pas à terre`);
  const note = `${DATE} : position de fiche (${fmt(avant[0])} ; ${fmt(avant[1])}) en mer, à ${fmt(cote(avant[0], avant[1]))} u de la côte ; ramenée à terre en (${fmt(apres[0])} ; ${fmt(apres[1])}), ${motif}. ${D22} ; registre, II, §14 (C1).`;
  d.coord_x = apres[0];
  d.coord_y = apres[1];
  d.correction = d.correction ? `${d.correction} | ${note}` : note;
  e.updated_at = NOW;
  deplaces.push(`${nom} (${fmt(avant[0])} ; ${fmt(avant[1])}) → (${fmt(apres[0])} ; ${fmt(apres[1])}), ${terre(apres[0], apres[1])}, côte à ${fmt(cote(apres[0], apres[1]))} u`);
}
for (const [id, nom, avant, apres, motif] of C1) deplacer(id, nom, avant, apres, motif);
/* le marqueur de la nation Warenthor : sur celui de sa seule région (fiche lie-0926) */
const reg = ent('lie-0926', 'Warenthor').data;
deplacer('pol-0015', 'Warenthor', [-228.05078279999998, 183.1424751], [reg.coord_x, reg.coord_y], 'sur le marqueur de sa région unique, Warenthor (lie-0926), d\'après la fiche (« unique région du royaume ») ; la question de l\'île et du sud-ouest (C5) reste ouverte');

/* C8 : altitudes proposées par la planche, validées par l'auteur (D22) */
const SOMMETS = [
  ['lie-0584', 'Pic de l\'Aube', 2900, [-156.56, 197.81], 'haute', 'Myrthorin est « bâtie autour du Pic de l\'Aube » : sommet des pictogrammes de montagnes à moins de 5 u de Myrthorin'],
  ['lie-0582', 'Mont Pyralis', 2400, [-132.69, 72.31], 'moyenne', 'Ilyndar est « au pied » du volcan : le plus fort des pictogrammes à moins de 9 u d\'Ilyndar, à 3 u au moins de la ville et à plus de 5 u de la côte'],
  ['lie-0107', 'Mont Kethar', 1900, [-165.44, 82.19], 'basse', 'volcan de Pyrtara du récit de Theralor : sommet des pictogrammes à moins de 10 u de Theralor, hors du Pyralis'],
];
for (const [id, nom, alt, [x, y], conf, motif] of SOMMETS) {
  ent(id, nom);
  poserData(id, 'altitude_m', alt);
  poserData(id, 'altitude_source', `Proposée par la planche d'Ilthara (HybeliorPrototype/Docs/monde/ilthara/PLANCHE.md, §3.4 ; INCOHERENCES_A_CORRIGER.md, C8), validée par l'auteur : ${D22}.`);
  const e = ent(id);
  const carte = { ...(e.data.carte || {}) };
  if (!carte.position_estimee) {
    carte.position_estimee = { x, y, confiance: conf, methode: 'carte peinte', terre: 'Ilthara', motif, source: `planche d'Ilthara, 2026-09-30 (${D22})` };
    e.data.carte = carte;
    e.updated_at = NOW;
  }
  if (!terre(x, y)) echec(`${nom} : position proposée hors de la terre`);
}

/* ════════════════════ créations : Val-Serrin (C11), terre du pôle sud-ouest (F12) ════════════════════ */
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
  const { ops } = core.prepareWrite(g, 'save-relation', r);
  core.applyOps(g, ops);
  nouveaux.relations.push(ops[0].record);
  return ops[0].record;
}

/* Val-Serrin */
const JULINDAR = 'lie-0953';
const SYLTHARA = 'pol-0016';
const KELVORIS = 'lie-0862';
ent(JULINDAR, 'Julindar'); ent(SYLTHARA, 'Sylthara'); ent(KELVORIS, 'Kelvoris');
const situe = (a, b) => doc.relations.some((r) => r.rel_type === 'situe-dans' && r.from_id === a && r.to_id === b);
if (!situe(JULINDAR, SYLTHARA)) echec('Julindar n\'est plus situé dans Sylthara');
if (!situe(KELVORIS, SYLTHARA) || !/Julindar/.test(byId.get(KELVORIS).body || '')) echec('la fiche de Kelvoris ne la range plus en Julindar (Sylthara)');
const VS = [-267.38, 121.53];
if (terre(VS[0], VS[1]) !== 'terre principale') echec('le Val-Serrin n\'est pas sur la terre d\'Ilthara');
const dKel = Math.hypot(VS[0] - byId.get(KELVORIS).data.coord_x, VS[1] - byId.get(KELVORIS).data.coord_y) * 0.955;
const valSerrin = creer('Val-Serrin', 'lieu', {
  summary: 'Hameau de bergers et de bûcherons de la marche occidentale de Julindar, en Sylthara, au débouché d\'un vallon, au pied des hauteurs de l\'ouest ; à six kilomètres de Kelvoris. Son nom, forgé dans le parler des bergers de l\'ouest, fait exception à la toponymie syltharie.',
  body: `## Le hameau

Hameau de bergers et de bûcherons de la marche occidentale de Julindar, région de forêts et de pâturages de l'ouest de Sylthara. Il vit comme le reste de Julindar, de la laine, du miel et du bois : maisons de pierre et de bois à toit de chaume, derrière une palissade.

## Le site

Au débouché d'un vallon, au pied est des hauteurs de l'ouest de Julindar, à la tête de la rivière qui passe au sud de Drylia. De la crête du val, on voit à l'est la plaine de Julindar et les fumées de Drylia, et derrière soi les montagnes de l'ouest.

Voisins, à vol d'oiseau : Kelvoris, le village des bergers à la laine blanche, à 6 km (moins de deux heures de marche) ; Myridia, le village des apiculteurs, à 11 km ; Drylia, la ville forestière, à 12 km ; le cœur de Julindar à 14 km à l'est.

## Le nom

« Val-Serrin » est un nom de marche, forgé dans le parler des bergers de l'ouest : sa forme dit la frontière plutôt que la capitale, et fait exception à la toponymie syltharie, qui est en -is, -ia, -oris ou -yn (Myridia, Kelvoris, Drylia, Ydralis, Amarendis).
`,
  data: {
    echelle: 'hameau',
    region: 'Julindar',
    carte: {
      position_estimee: {
        x: VS[0], y: VS[1], confiance: 'moyenne', methode: 'planche',
        terre: 'Ilthara',
        motif: 'Position proposée par la planche d\'Ilthara (§5.1), non relevée sur la carte peinte : plus de 600 m de tout lieu du graphe ; lieu le plus proche rattaché à Sylthara (Kelvoris, 6,2 km) ; 14,3 km plein ouest du repère de Julindar ; sur la terre à plus de 3 u de la côte, hors des lacs peints ; au pied des reliefs peints de l\'ouest ; tête du fleuve peint qui passe au sud de Drylia.',
        source: `HybeliorPrototype/Docs/monde/ilthara/PLANCHE.md §5.1 et Monde/canon/ilthara/valserrin.json (2026-09-30) ; ${D22}`,
      },
    },
    note: `Rattachement par les fiches, jamais par le polygone de Sylthara (non validé) : Julindar (lie-0953) est la région de Sylthara la plus proche, et Kelvoris (lie-0862, ${fmt(dKel)} km), son plus proche voisin, est rangé en Julindar, Sylthara.`,
    provenance: {
      decision: `HybeliorPrototype/Docs/DECISIONS.md, D2 (2026-09-14 : « Val-Serrin est un hameau de Julindar », le nom conservé comme exception documentée) et ${D22}`,
      etude: 'HybeliorPrototype/Docs/monde/ilthara/PLANCHE.md §5 ; INCOHERENCES_A_CORRIGER.md, C11',
    },
  },
});
const relJul = relation({ rel_type: 'situe-dans', from_id: valSerrin.id, to_id: JULINDAR });
const relSyl = relation({ rel_type: 'situe-dans', from_id: valSerrin.id, to_id: SYLTHARA });
const relKel = relation({ rel_type: 'lie-a', from_id: valSerrin.id, to_id: KELVORIS, label: `voisin, à ${fmt(dKel)} km (moins de deux heures de marche)` });

/* La terre du pôle sud-ouest (F12, §11.6) : pas de nom d'auteur, nom descriptif provisoire */
const sw = masses.find((m) => m.nom == null && m.points.every(([x, y]) => x < -300 && y > 370));
if (!sw) echec('la terre sans nom du sud-ouest n\'est plus dans monde-contours.json');
let cx = 0; let cy = 0; const A = aire(sw.points);
for (let i = 0; i < sw.points.length; i++) { const [x1, y1] = sw.points[i]; const [x2, y2] = sw.points[(i + 1) % sw.points.length]; const k = x1 * y2 - x2 * y1; cx += (x1 + x2) * k; cy += (y1 + y2) * k; }
cx = Math.round(cx / (6 * A) * 10) / 10; cy = Math.round(cy / (6 * A) * 10) / 10;
if (!dedans(sw.points, cx, cy)) echec('le centre de la terre du sud-ouest tombe hors de sa côte');
const terreSO = creer('Terre sans nom du sud-ouest', 'lieu', {
  summary: 'Terre douce du bout du monde, au coin sud-ouest de la carte : une forêt tempérée sous la nuit polaire, que la mer tiède garde du gel ; l\'hiver, quand le soleil ne se lève plus, ses sous-bois s\'allument de mousses et de champignons luisants. Elle n\'a pas encore de nom.',
  body: `## La terre

Terre du coin sud-ouest de la carte, au bout du monde, qu'aucune fiche ne nomme encore. Le cadre de la carte la coupe au sud : elle se prolonge au-delà.

## Le climat

Une forêt tempérée là où l'on attendrait la glace : une dérive chaude longe ses côtes et garde la terre du gel. L'hiver, la nuit polaire y dure des semaines ; les sous-bois s'allument alors de mousses, de lichens et de champignons à lueur verte, qui éclairent la longue nuit.
`,
  data: {
    echelle: 'region',
    ile: true,
    nom_provisoire: true,
    nom: 'à donner par l\'auteur (le nom de la fiche est descriptif)',
    coord_x: cx,
    coord_y: cy,
    surface_u2: Math.round(Math.abs(A)),
    note: `Marqueur au centre de la terre tracée par l'auteur (data/monde-contours.json, masse sans nom de x ${fmt(Math.min(...sw.points.map((p) => p[0])))} à ${fmt(Math.max(...sw.points.map((p) => p[0])))}, y ${fmt(Math.min(...sw.points.map((p) => p[1])))} à ${fmt(Math.max(...sw.points.map((p) => p[1])))}, recalée le 2026-10-01). Aucun lieu, aucune nation n'y est posé.`,
    climat: {
      classe: 'tempéré (plan des biomes de l\'auteur), au pôle sud de la pseudo-latitude',
      cause: 'dérive chaude le long des côtes (physique) ; la lecture « voix d\'un Éthéré des marées » est retirée (critère de crédibilité)',
      zone: 'sous-bois bioluminescents de la longue nuit (famille F2 validée par l\'auteur)',
    },
    provenance: `HybeliorPrototype/Docs/monde/BIOMES_MAGIQUES.md, §11.6 ; INCOHERENCES_A_CORRIGER.md, F12 et F16 ; ${D22}`,
  },
});

/* ── application ── */
function poser(arr, r) { const k = arr.findIndex((x) => x.id === r.id); if (k >= 0) arr[k] = r; else arr.push(r); }
nouveaux.entities.forEach((r) => poser(doc.entities, r));
nouveaux.relations.forEach((r) => poser(doc.relations, r));

/* garde-fous */
const INTERDITS = /atrium|glace qui refuse|temp[êe]tes? vivantes?|l'envers|lacs?[- ]miroirs?|rideau de ros[ée]e|l'eau remonte/i;
for (const [id, txt] of ecrits) {
  if (INTERDITS.test(txt)) echec(`${id} : le texte neuf contient un élément proscrit : « ${txt.match(INTERDITS)[0]} »`);
}
const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) {
  rapport.issues.filter((x) => x.severity === 'erreur').slice(0, 10).forEach((x) => console.error('  ', x.message));
  echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
}

console.log(`✓ retouches (${journal.length}) :`); journal.forEach((j) => console.log('   ' + j));
console.log(`✓ lieux ramenés à terre (${deplaces.length}) :`); deplaces.forEach((d) => console.log('   ' + d));
console.log(`✓ altitudes : ${SOMMETS.map((s) => `${s[1]} ${s[2]} m`).join(', ')}`);
console.log(`✓ ${valSerrin.id} Val-Serrin (hameau), position estimée (${fmt(VS[0])} ; ${fmt(VS[1])}) ; ${relJul.id} → Julindar, ${relSyl.id} → Sylthara, ${relKel.id} lié à Kelvoris (${fmt(dKel)} km)`);
console.log(`✓ ${terreSO.id} Terre sans nom du sud-ouest, marqueur (${fmt(cx)} ; ${fmt(cy)}), ${Math.round(Math.abs(A))} u²`);
console.log(`✓ fiches Docs touchées : ${[...docsTouches].map((p) => path.relative(ROOT, p)).join(', ') || 'aucune'}`);
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
for (const p of docsTouches) fs.writeFileSync(p, docsCRLF.get(p) ? docsTexte.get(p).replace(/\n/g, '\r\n') : docsTexte.get(p));
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités, ${doc.relations.length} relations). Ensuite : npm run kg:index && npm run kg:db`);
