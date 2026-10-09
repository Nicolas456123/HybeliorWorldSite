#!/usr/bin/env node
/**
 * Chantier 487 — arbitrage des incohérences de l'Atrium relevées par les lots
 * du jeu (gazetteer 459, palettes 470, générateur 471a ; D38 du prototype :
 * délégation de l'auteur du 2026-10-09, « je te laisse trancher tout ce qu'il
 * reste en restant cohérent et logique »). Canon dominant ; journal au registre
 * des incohérences, II, §16.
 *
 *  1. Textes copiés d'un homonyme : Lunaris (Drakora) portait les extraits du
 *     Lunaris de Lunasar ; Kryndor (Ventera) celui du Kryndor d'Elarian.
 *  2. Ackerna : la fiche doublon lie-0668 est fusionnée dans lie-0581
 *     (AckernaVille) ; le texte de la nation passe à pol-0014.
 *  3. Climats : Lythar (lisière de plaine et taïga) et Ysundara (forêt de
 *     brouillard au bord du désert) ; Tyndara et Skaldoria : le plan est à
 *     corriger (registre), rien n'est réécrit ici.
 *  4. Caeloria : « malgré la chaleur » retiré (D38).
 *  5. Faits de mort rangés sous une nation ou un continent : Talvind
 *     (fac-1182) et Corvane de Cendara (fac-1202) en deviennent les sujets.
 *  6. Agglomérations sans nation : Cëpias à Thalmaris (C/25), Windora rendue à
 *     Astravia dans les résumés, sept villes d'Evertia marquées sans nation.
 *  7. Fablioris : siège historique de la Ligue (bornée 9 977-9 989) ;
 *     Evertia (nation) reçoit son continent.
 *
 * Chaque retouche laisse une trace dans data.raccord ; les retouches de corps
 * sont reportées dans Docs/Lore/Pays quand le texte y figure. Idempotent.
 * Aucun reseed. Usage : node scripts/arbitrer-487.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const PAYS = path.join(ROOT, 'Docs', 'Lore', 'Pays');
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-09T12:00:00.000Z';
const DATE = '2026-10-09';
const D38 = 'chantier 487, délégation de l\'auteur du 2026-10-09 (HybeliorPrototype/Docs/DECISIONS.md, D38) ; registre des incohérences, II, §16';

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
    trace(e, champ, avant.length > 300 ? avant.slice(0, 300) + '…' : avant, pourquoi);
    const m = champ === 'body' ? miroir(avant, apres, t) : 0;
    journal.push(`${id} ${e.name} · ${champ}${m ? ` (+ ${m} fiche${m > 1 ? 's' : ''} Docs)` : ''}`);
    return true;
  }
  echec(`${id} (${e.name}) : texte introuvable dans ${champ} : « ${avant.slice(0, 80)}… »`);
}
/* retire un passage du corps (déplacé ailleurs) ; idempotent */
function retirer(id, passage, pourquoi) {
  const e = ent(id);
  const t = e.body || '';
  if (!t.includes(passage)) return false;
  e.body = t.split(passage).join('').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '') + '\n';
  trace(e, 'body', passage.length > 300 ? passage.slice(0, 300) + '…' : passage, pourquoi);
  journal.push(`${id} ${e.name} · body (passage retiré, ${passage.length} car.)`);
  return true;
}
/* ajoute en fin de corps ; reconnu par le texte lui-même */
function ajouter(id, texte, pourquoi, sansGarde) {
  const e = ent(id);
  if (!sansGarde) ecrits.push([id, texte]);
  const t = e.body || '';
  if (t.includes(texte.trim().slice(0, 200))) return false;
  e.body = t.trim() ? `${t.replace(/\s+$/, '')}\n\n${texte.trim()}\n` : `${texte.trim()}\n`;
  trace(e, 'body', t.trim() ? '(ajout en fin de corps, rien n\'est retiré)' : '(corps vide)', pourquoi);
  journal.push(`${id} ${e.name} · body (ajout)`);
  return true;
}
function poserData(id, cle, valeur, pourquoi) {
  const e = ent(id);
  e.data = e.data || {};
  if (JSON.stringify(e.data[cle]) === JSON.stringify(valeur)) return false;
  const avant = e.data[cle] === undefined ? '(absent)' : JSON.stringify(e.data[cle]);
  e.data[cle] = valeur;
  trace(e, 'data.' + cle, avant, pourquoi);
  journal.push(`${id} ${e.name} · data.${cle}`);
  return true;
}
let g = core.mergeGraph(doc, {});
const nouvRel = [];
function relation(r) {
  const deja = doc.relations.find((x) => x.rel_type === r.rel_type && x.from_id === r.from_id && x.to_id === r.to_id);
  if (deja) return deja;
  const { ops } = core.prepareWrite(g, 'save-relation', r);
  core.applyOps(g, ops);
  doc.relations.push(ops[0].record);
  nouvRel.push(ops[0].record);
  return ops[0].record;
}

/* ═══ 1. Textes copiés d'un homonyme ═══════════════════════════════════════ */
const LUNARIS_D = ent('lie-0847', 'Lunaris');
const LUNARIS_C = ent('lie-1034', 'Lunaris (capitale de Lunasar)');
const LUNASAR = ent('pol-0034', 'Lunasar');
const MOTIF_1 = `texte du Lunaris de Lunasar, copié dans la fiche de son homonyme drakorien à l'import ; ${D38}`;
{
  const b = LUNARIS_D.body || '';
  const i = b.indexOf('## (Capitale, ~24 000 habitants)');
  if (i >= 0) {
    const passage = b.slice(i);
    const j = passage.indexOf('## « Les Tables qui Ne Disent Rien »');
    if (j < 0) echec('lie-0847 : découpe inattendue');
    const capitale = passage.slice(0, j);
    const histoires = passage.slice(j);
    // la description de la capitale (sans citation) va à la fiche de la ville
    const capPropre = capitale.replace('## (Capitale, ~24 000 habitants)', '## Capitale (~24 000 habitants)').trim();
    ajouter('lie-1034', capPropre, MOTIF_1, true);
    // les deux récits (citations de fiche, pas de livre) vont à la nation : la ville est ancrée à C/28
    ajouter('pol-0034', histoires.trim(), MOTIF_1, true);
    retirer('lie-0847', passage, MOTIF_1);
    // le séparateur et l'extrait de Drakora qui précédaient restent
  }
  if (/Cité-amphithéâtre|Les Tables qui Ne Disent Rien|Éclipse de Mira/.test(LUNARIS_D.body)) echec('lie-0847 garde du texte de Lunasar');
}
void LUNASAR; void LUNARIS_C;

const KRYNDOR_V = ent('lie-0522', 'Kryndor');
const ELARIAN = ent('pol-0087', 'Elarian');
const KRYOSTRA = ent('lie-0889', 'Kryostra');
const MOTIF_K = `texte du Kryndor d'Elarian (ville principale de Kryostra), copié dans la fiche de son homonyme ventérien à l'import ; ${D38}`;
let kryndorE = doc.entities.find((e) => e.name === 'Kryndor (Kryostra)');
{
  const b = KRYNDOR_V.body || '';
  const debut = b.indexOf('- Ville principale de Kryostra');
  const extraitE = debut >= 0 ? b.slice(debut) : null;
  if (!kryndorE) {
    if (!extraitE) echec('lie-0522 : extrait d\'Elarian introuvable');
    const id = core.nextEntityId(g, 'lieu');
    const { ops } = core.prepareWrite(g, 'save-entity', {
      id, type: 'lieu', name: 'Kryndor (Kryostra)', slug: null, status: 'canon', disclosure: 'public',
      summary: 'Ville principale de Kryostra, en Elarian, accrochée à quarante mètres de falaise au-dessus d\'un fjord ; maisons tenues à la roche, reliées par escaliers et passerelles de corde. Homonyme du Kryndor de Ventera (lie-0522).',
      body: `## Ville\n\n${extraitE.trim()}\n`,
      data: {
        echelle: 'ville',
        region: 'Kryostra',
        homonymie: 'Kryndor de Ventera (lie-0522), dernier village avant les terres sans carte du sud ; aucun lien.',
        provenance: `Docs/Lore/Pays/Celethor/Elarian.md, section Kryndor ; texte retiré de lie-0522 ; ${D38}`,
        note: 'Position non relevée : à poser sur la côte de Kryostra quand la carte le permettra.',
      },
    }, NOW);
    core.applyOps(g, ops);
    doc.entities.push(ops[0].record);
    byId.set(id, ops[0].record);
    kryndorE = ops[0].record;
    journal.push(`${id} Kryndor (Kryostra) · créé`);
  }
  if (extraitE) retirer('lie-0522', extraitE, MOTIF_K);
  relation({ rel_type: 'situe-dans', from_id: kryndorE.id, to_id: ELARIAN.id });
  relation({ rel_type: 'situe-dans', from_id: kryndorE.id, to_id: KRYOSTRA.id });
  relation({ rel_type: 'a-ne-pas-confondre-avec', from_id: kryndorE.id, to_id: KRYNDOR_V.id });
}

/* ═══ 2. Ackerna : une seule capitale ══════════════════════════════════════ */
{
  const VILLE = ent('lie-0581', 'AckernaVille');
  const NATION = ent('pol-0014', 'Ackerna');
  const doublon = byId.get('lie-0668');
  if (doublon) {
    if (doublon.name !== 'Ackerna') echec('lie-0668 inattendu');
    const MOTIF_A = `fiche doublon lie-0668 « Ackerna » (même capitale, deux fiches) fusionnée dans lie-0581 ; le texte de la nation qu'elle portait passe à pol-0014 ; ${D38}`;
    ajouter('pol-0014', doublon.body, MOTIF_A, true);
    const d = doublon.data || {};
    VILLE.data = Object.assign({}, VILLE.data, { coord_x: d.coord_x, coord_y: d.coord_y, capitale: true });
    VILLE.data.fusion = [].concat(VILLE.data.fusion || [], [{
      absorbe: 'lie-0668', date: DATE, nom: doublon.name, resume_absorbe: doublon.summary,
      motif: 'doublon : la même capitale sans nom propre (« la Ville »), créée deux fois par l\'import ; coordonnées reprises, corps (fiche de la nation) versé à pol-0014',
    }]);
    trace(VILLE, 'data.coord_x/coord_y', '(absent ; portées par la fiche doublon lie-0668)', MOTIF_A);
    doc.relations = doc.relations.filter((r) => r.from_id !== 'lie-0668' && r.to_id !== 'lie-0668');
    doc.entities = doc.entities.filter((e) => e.id !== 'lie-0668');
    byId.delete('lie-0668');
    if (!doc.aliases.some((a) => a.entity_id === 'lie-0581' && a.value === 'Ackerna (la Ville)')) {
      const id = core.nextRecId({ aliases: doc.aliases }, 'aliases');
      doc.aliases.push({
        id, entity_id: 'lie-0581', value: 'Ackerna (la Ville)', alias_status: 'variante', era_id: null, from_year: null, to_year: null,
        meaning: 'la capitale sans nom propre, que les étrangers appellent du nom du pays ; fiche doublon lie-0668 fusionnée (2026-10-09)',
      });
    }
    journal.push('lie-0668 Ackerna · fusionnée dans lie-0581, supprimée');
    void NATION;
  }
}

/* ═══ 3. Climats ═══════════════════════════════════════════════════════════ */
const MOTIF_C = (v) => `plan des biomes de l'auteur (D19/D23, validé) : ${v} ; le plan fait le fond, le détail de la fiche devient une zone locale crédible ; ${D38}`;
retouche('pol-0013', 'summary',
  'Confédération tribale nomade des steppes orientales d\'Ilthara',
  'Confédération tribale nomade des plaines herbeuses de l\'est d\'Ilthara, à la lisière de la taïga',
  MOTIF_C('Lythar est en taïga et en plaine, la « steppe » de la fiche est une lisière de plaine (BIOMES §0 bis.3, registre §F)'));
retouche('pol-0013', 'body',
  '| **Ressources clés** | Chevaux d\'exception, cuir, laine de steppe, herbes médicinales des plaines, sel gemme |\n',
  '| **Ressources clés** | Chevaux d\'exception, cuir, laine de steppe, herbes médicinales des plaines, sel gemme |\n\n## Paysage et climat\n\n- Ce que les cavaliers appellent la steppe est une lisière : de grandes plaines d\'herbe rase et de vastes clairières ouvertes dans la taïga, que les conifères cernent de partout et où les troupeaux passent l\'été.\n- Hivers longs et froids, étés courts ; les chevaux de Lythar, petits et laineux, grattent la neige pour trouver l\'herbe. Vers le sud et l\'est, la forêt s\'éclaircit sur les terres brûlées de Drakora.\n',
  MOTIF_C('Lythar est en taïga et en plaine, la « steppe » de la fiche est une lisière de plaine (BIOMES §0 bis.3, registre §F)'));
retouche('lie-0413', 'body',
  'couverte de forêts denses (taïga du nord de Galenor)',
  'couverte de forêts denses : la brume de mer qui monte sur les contreforts y nourrit une forêt de brouillard, îlot vert et humide au bord du désert, aux hivers parfois rudes',
  MOTIF_C('Ysundara est en désert de sable et de roche, au bord de la mer ; la taïga de Galenor est plus au nord'));

/* ═══ 4. Caeloria ══════════════════════════════════════════════════════════ */
retouche('pol-0022', 'body',
  'Elles ne fondent jamais malgré la chaleur relative de la côte.',
  'Elles ne fondent pas : sur cette côte, l\'air reste sous le gel presque toute l\'année.',
  `D38 : la glace des observatoires et des Temples du Givre est gardée, « malgré la chaleur » retiré (les normales de Caeloria restent sous 0 °C, BIOMES_MAGIQUES F7 ; aucune glace qui refuse la chaleur, R1) ; ${D38}`);

/* ═══ 5. Faits de mort sans leur mort ══════════════════════════════════════ */
function sujetMort(fid, personne, ancien, an) {
  const f = doc.facts.find((x) => x.id === fid);
  if (!f) echec(`${fid} absent`);
  const p = ent(personne);
  if (f.subject_id === ancien) {
    f.subject_id = personne;
    f.object_id = ancien;
    f.data = Object.assign({}, f.data, {
      raccord: [].concat((f.data || {}).raccord || [], [{
        date: DATE, champ: 'subject_id', avant: ancien,
        pourquoi: `fait de mort rangé sous un lieu ou une nation : la personne devient le sujet, ${ancien} passe en objet ; ${D38}`,
      }]),
    });
    f.updated_at = NOW;
    journal.push(`${fid} · sujet ${ancien} → ${personne} (${p.name})`);
  } else if (f.subject_id !== personne) echec(`${fid} : sujet inattendu ${f.subject_id}`);
  const per = (p.data || {}).periode;
  if (per && per.fin !== an) {
    poserData(personne, 'periode', Object.assign({}, per, { fin: an, confiance: 'haute', methode: 'fait-date', indice: `mort : ${fid}` }),
      `la fin de période suit le fait de mort ${fid} (an ${an - 9949} du Sillage) ; ${D38}`);
  }
}
sujetMort('fac-1182', 'per-1059', 'pol-0016', 10199);
sujetMort('fac-1202', 'per-1023', 'lie-0005', 10199);

/* ═══ 6. Agglomérations sans nation ════════════════════════════════════════ */
const MOTIF_6 = `rattachement par les fiches et les livres, jamais par la position ; ${D38}`;
// Cëpias : la cour et l'académie du Cantus (C/25) ; le Cantus Mundi et ses Cantori sont thalmariens
relation({ rel_type: 'situe-dans', from_id: 'lie-0669', to_id: 'pol-0031' });
poserData('lie-0669', 'rattachement', {
  nation: 'pol-0031', date: DATE,
  motif: 'C/25 : cour et académie du Cantus (Voix-de-Pierre, Cantus du couchant), ville qui dépense plus pour ses arts que pour ses soldats ; le Cantus Mundi et les Cantori sont la religion et l\'ordre de Thalmaris, monarchie bardique-académique du sud-ouest du continent (fiche Evertia - Continent). Ostarith reste la capitale de Thalmaris : data.capitale de Cëpias (signe de la carte) se lit cité de cour.',
}, MOTIF_6);
// Windora : région d'Astravia (arbitrage du 2026-09-10, registre I) ; les résumés disaient encore Thalmaris
for (const id of ['lie-0372', 'lie-0373', 'lie-0374', 'lie-0375']) {
  retouche(id, 'summary', 'Windora (Thalmaris)', 'Windora (Astravia)',
    `Windora est une région d'Astravia (lie-0354 situe-dans pol-0021 ; arbitrage « Windora à Astravia », registre I) ; ${D38}`);
}
// villes d'Evertia dont seuls le nom et la position sont attestés : sans nation, dit
const SANS = 'seuls le nom et la position sur la carte de l\'auteur sont attestés ; le continent porte trois nations (Evertia, Thalmaris, Sylvara, fiche Evertia - Continent) et aucun texte ne dit laquelle tient cette ville ; un rattachement par la position est exclu (CLAUDE.md)';
for (const id of ['lie-0725', 'lie-0726', 'lie-0727', 'lie-0729', 'lie-0874', 'lie-0876']) {
  poserData(id, 'sans_nation', { date: DATE, raison: SANS }, MOTIF_6);
}
poserData('lie-0875', 'sans_nation', {
  date: DATE,
  raison: SANS + '. Le nom évoque la Grande Cloche d\'Evertia, mais la fiche la place à Créciel (Vaelcendia) : rapprochement non établi.',
}, MOTIF_6);

/* ═══ 7. Fablioris, Miralis ════════════════════════════════════════════════ */
{
  const r = doc.relations.find((x) => x.id === 'lnk-3275');
  if (!r || r.from_id !== 'lie-0614' || r.to_id !== 'pol-0124') echec('lnk-3275 inattendu');
  if (r.end_year !== 9989) {
    r.start_year = 9977; r.end_year = 9989;
    r.label = 'siège de la Ligue des Marchands, institution tyndarienne devenue le gouvernement de Tyndara';
    r.data = Object.assign({}, r.data, { raccord: [{ date: DATE, champ: 'start_year/end_year', avant: 'null/null', pourquoi: `la Ligue (institution, 9 977-9 989, situe-dans Tyndara) siégeait à Fablioris ; Fablioris reste capitale de Tyndara, pas d'une autre nation ; ${D38}` }] });
    journal.push('lnk-3275 Fablioris capitale-de Ligue des Marchands · bornée 9977-9989');
  }
}
poserData('pol-0116', 'continent', 'Evertia', `fiche Evertia (Continent : Evertia) ; Miralis (lie-0728), situe-dans Evertia, n'avait pas de continent ; ${D38}`);
relation({ rel_type: 'situe-dans', from_id: 'pol-0116', to_id: 'lie-0008' });

/* ── garde-fous ── */
const INTERDITS = /atrium|glace qui refuse|temp[êe]tes? vivantes? magiques?|l'envers|lacs?[- ]miroirs?|rideau de ros[ée]e|malgr[ée] la chaleur/i;
for (const [id, txt] of ecrits) {
  if (INTERDITS.test(txt)) echec(`${id} : le texte neuf contient un élément proscrit : « ${txt.match(INTERDITS)[0]} »`);
}
const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) {
  rapport.issues.filter((x) => x.severity === 'erreur').slice(0, 10).forEach((x) => console.error('  ', x.message));
  echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
}
console.log(`✓ retouches (${journal.length}) :`); journal.forEach((j) => console.log('   ' + j));
console.log(`✓ relations neuves : ${nouvRel.map((r) => `${r.id} ${r.from_id} ${r.rel_type} ${r.to_id}`).join(', ') || 'aucune'}`);
console.log(`✓ fiches Docs touchées : ${[...docsTouches].map((p) => path.relative(ROOT, p)).join(', ') || 'aucune'}`);
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
if (journal.length) doc._meta.updated_at = NOW;
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
for (const p of docsTouches) fs.writeFileSync(p, docsCRLF.get(p) ? docsTexte.get(p).replace(/\n/g, '\r\n') : docsTexte.get(p));
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités, ${doc.relations.length} relations). Ensuite : npm run kg:index && npm run kg:db`);
