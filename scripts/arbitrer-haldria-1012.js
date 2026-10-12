#!/usr/bin/env node
/**
 * Demande Studio d492ccffc (volet donnees-atrium-jeu), 2026-10-12 — décision
 * D47 de l'auteur : Haldria est au SUD-OUEST d'Ilthara, là où sa carte pose ses
 * villes (Hekorinth, Uldarin, Kandorin, Raldir, Thyrin…) et ses régions
 * (Hekoria, Uldora, Kandaros, Ravantis). Cela renverse l'arbitrage du
 * 2026-09-14 (Haldria sur Endora, « sans territoire »). Précision de l'auteur
 * (même jour) : les positions affichées par la carte du site sont bonnes ; on
 * corrige les rattachements et les textes, jamais les positions des lieux.
 *
 *  1. Haldria (pol-0017) : continent Ilthara, situe-dans Ilthara (lnk-0028),
 *     data.carte sans `sans_territoire`, marqueur de nation rendu (l'ancien
 *     marqueur d'origine, sud-ouest d'Ilthara) ; résumé et tableau du corps.
 *  2. Ses lieux qui disaient « d'Endora » (Uldarin, Uldora, Sylradis, Valdren,
 *     Ravindor, Ravantis, Galdrion) ; Haltheria (motif de position estimée).
 *  3. Généalogie : Protectorat d'Haldros (pol-0073) au sud-ouest d'Ilthara
 *     (lnk-0462) ; Haldros le Navigateur unifie les côtes d'Ilthara (comme le
 *     disent déjà fac-0654, fac-0655 et l'histoire de Haldria) ; les Schismes
 *     d'Endora ne produisent plus qu'Avalor et Sanvara ; fac-0413 (Saint-Empire
 *     d'Endara) sans Haldria ; fac-0017 et fac-0020 (faits-précurseurs) ne
 *     parlent plus d'une province d'Endara ni d'une « région montagneuse de
 *     Haldria » pour Endrath (nation d'Endora, issue de l'Empire Kalvorn).
 *     L'ascendance iltharienne de Haldria est celle que dit evt-0022 (Drahk'Nor).
 *  4. Continents : Endora (lie-0007) compte deux nations, Avalor et Sanvara ;
 *     Haldria y reste la troisième voix, par la mer (Route des Marées). Ilthara
 *     (lie-0010) compte neuf nations.
 *  5. Lunasar : la ligne « Endora (Haldria) » de ses relations.
 *
 * Les livres ne sont pas touchés ici (passages relevés pour le skill
 * reecriture-livres). coord_x/y des lieux jamais touchées. Chaque retouche est
 * tracée dans data.raccord ; les corps sont reportés dans les miroirs Docs.
 * Idempotent, sans reseed. Usage : node scripts/arbitrer-haldria-1012.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const MIROIRS = [path.join(ROOT, 'Docs', 'Lore', 'Pays'), path.join(ROOT, 'Docs', 'Lore', 'Histoires'), path.join(ROOT, 'Docs', 'GDD')];
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-12T18:00:00.000Z';
const DATE = '2026-10-12';
const D47 = 'décision de l\'auteur du 2026-10-12 (D47) : Haldria est au sud-ouest d\'Ilthara, là où sa carte pose ses villes ; renverse l\'arbitrage du 2026-09-14 ; demande Studio d492ccffc ; registre des incohérences, II, §20';

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
function miroir(avant, apres, seul) {
  let n = 0;
  for (const [p, t] of docsTexte) {
    if (seul && !p.split(path.sep).join('/').includes(seul)) continue;
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
function retouche(id, champ, avant, apres, pourquoi, seul) {
  const e = ent(id);
  const t = e[champ] || '';
  ecrits.push([id, apres]);
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
  ecrits.push([id, JSON.stringify(valeur)]);
  if (JSON.stringify(o[k]) === JSON.stringify(valeur)) return false;
  const avant = o[k] === undefined ? '(absent)' : JSON.stringify(o[k]);
  o[k] = valeur;
  trace(e, 'data.' + chemin, avant, pourquoi);
  journal.push(`${id} ${e.name} · data.${chemin}`);
  return true;
}
function deplacerLien(lnk, from, ancienTo, nouveauTo, pourquoi) {
  const r = doc.relations.find((x) => x.id === lnk);
  if (!r || r.from_id !== from) echec(`${lnk} inattendu`);
  if (r.to_id === nouveauTo) return false;
  if (r.to_id !== ancienTo) echec(`${lnk} : cible ${r.to_id}, attendu ${ancienTo}`);
  r.to_id = nouveauTo;
  r.data = Object.assign({}, r.data, { raccord: [...((r.data && r.data.raccord) || []), { date: DATE, champ: 'to_id', avant: ancienTo, pourquoi }] });
  journal.push(`${lnk} ${from} ${r.rel_type} ${ancienTo} → ${nouveauTo}`);
  return true;
}
function libelleFait(fid, avant, apres, pourquoi) {
  const f = doc.facts.find((x) => x.id === fid);
  if (!f) echec(`${fid} absent`);
  ecrits.push([fid, apres]);
  if ((f.label || '').includes(apres)) return false;
  if (!(f.label || '').includes(avant)) echec(`${fid} : libellé inattendu « ${f.label} »`);
  f.label = f.label.split(avant).join(apres);
  f.data = Object.assign({}, f.data, { raccord: [...((f.data && f.data.raccord) || []), { date: DATE, champ: 'label', avant, pourquoi }] });
  f.updated_at = NOW;
  journal.push(`${fid} (${f.fact_type} de ${f.subject_id}) · label`);
  return true;
}

/* ═══ 1. Haldria ═══════════════════════════════════════════════════════════ */
const H = ent('pol-0017', 'Haldria');
ent('lie-0007', 'Endora');
ent('lie-0010', 'Ilthara');
const MOTIF_1 = `la carte de l'auteur pose la capitale Hekorinth, toutes les villes et les quatre régions de Haldria au sud-ouest d'Ilthara ; l'histoire de Haldria (Haldros unifie « les communautés côtières d'Ilthara », Sylveira en fait « la puissance maritime incontestée d'Ilthara ») et la base Access d'origine (Haldria n° 10, Ilthara) le disaient déjà ; ${D47}`;
retouche('pol-0017', 'summary', 'Monarchie maritime d’Endora', 'Monarchie maritime du sud-ouest d’Ilthara', MOTIF_1);
retouche('pol-0017', 'body', '| **Continent** | Endora |', '| **Continent** | Ilthara (sud-ouest) |', MOTIF_1, 'Pays/Endora/Haldria.md');
retouche('pol-0017', 'body', '*Extrait de la fiche d\'Endora.*', '*Extrait d\'une ancienne fiche d\'Endora, du temps où Haldria y était rangée.*', MOTIF_1, 'Endora/Haldria.md');
poserData('pol-0017', 'continent', 'Ilthara', MOTIF_1);
{
  const c = (H.data && H.data.carte) || {};
  const marq = c.ancien_marqueur || (c.historique_1409 && c.historique_1409.ancien_marqueur);
  if (!marq) echec('pol-0017 : ancien marqueur introuvable');
  const neuve = {
    marqueur: marq,
    terre: 'Ilthara',
    motif: 'Haldria est au sud-ouest d\'Ilthara, là où la carte de l\'auteur pose Hekorinth, ses villes et ses régions ; le marqueur d\'origine de la nation est rendu tel quel. La surface de la nation sur la carte des pays attend la décision de l\'auteur sur le partage du lobe sud-ouest avec Warenthor (planche du 2026-10-12).',
    date: DATE,
    qui: 'décision de l\'auteur du 2026-10-12 (D47)',
    historique_1409: {
      arbitrage: 'le 2026-09-14, confirmé le 2026-09-22 : Haldria rangée sur Endora, sans marqueur ni territoire (data.carte.sans_territoire), son lobe donné à Warenthor',
      ancien_marqueur: marq,
      ancienne_masse: c.ancienne_masse || 'Ilthara',
      renverse_le: DATE,
    },
  };
  poserData('pol-0017', 'carte', neuve, MOTIF_1);
  poserData('pol-0017', 'coord_x', marq[0], MOTIF_1 + ' ; marqueur de la nation rendu (ancien marqueur d\'origine)');
  poserData('pol-0017', 'coord_y', marq[1], MOTIF_1 + ' ; marqueur de la nation rendu (ancien marqueur d\'origine)');
}
deplacerLien('lnk-0028', 'pol-0017', 'lie-0007', 'lie-0010', MOTIF_1);

/* ═══ 2. Lieux de Haldria ══════════════════════════════════════════════════ */
const MOTIF_2 = `lieu de Haldria, posé par la carte de l'auteur au sud-ouest d'Ilthara : « d'Endora » devient « d'Ilthara » ; ${D47}`;
retouche('lie-0686', 'summary', 'plus grand chantier naval d’Endora', 'plus grand chantier naval d’Ilthara', MOTIF_2);
retouche('lie-0686', 'body', 'plus grand **chantier naval** d\'Endora', 'plus grand **chantier naval** d\'Ilthara', MOTIF_2);
retouche('lie-0950', 'summary', 'les meilleurs vaisseaux d’Endora', 'les meilleurs vaisseaux d’Ilthara', MOTIF_2);
retouche('lie-0950', 'body', 'les meilleurs vaisseaux d\'Endora', 'les meilleurs vaisseaux d\'Ilthara', MOTIF_2);
retouche('lie-0856', 'summary', 'les plus chères d’Endora', 'les plus chères d’Ilthara', MOTIF_2);
retouche('lie-0856', 'body', 'les plus rares et chères d\'Endora', 'les plus rares et chères d\'Ilthara', MOTIF_2);
retouche('lie-0857', 'summary', 'se vend à prix d’or dans tout Endora', 'se vend à prix d’or dans tout Ilthara', MOTIF_2);
retouche('lie-0857', 'body', 'se vend à prix d\'or dans tout Endora', 'se vend à prix d\'or dans tout Ilthara', MOTIF_2);
retouche('lie-0689', 'body', 'les routes maritimes du sud d\'Endora', 'les routes maritimes du sud-ouest d\'Ilthara', MOTIF_2);
retouche('lie-0948', 'body', 'porte d\'entrée vers les routes maritimes du sud d\'Endora.', 'porte d\'entrée vers les routes maritimes du sud, celles qui mènent à Endora.', MOTIF_2);
retouche('lie-0853', 'body', 'reconnu au-delà d\'Endora.', 'reconnu au-delà d\'Ilthara.', MOTIF_2);
{
  const e = ent('lie-1023', 'Haltheria');
  const pe = JSON.parse(JSON.stringify(e.data.carte.position_estimee));
  pe.motif = pe.motif.replace('(arbitrage « sans territoire » de l’Atrium)', '(décision de l’auteur du 2026-10-12, D47)');
  pe.conflits = ['Les Chroniques (C/13) rangent Haldria sous « Endora » (titre de partie, bilan du chapitre). Depuis la décision de l’auteur du 2026-10-12 (D47), Haldria est au sud-ouest d’Ilthara : la position tient, ce sont les passages du livre qui sont à reprendre.'];
  poserData('lie-1023', 'carte.position_estimee', pe, MOTIF_2 + ' (x/y inchangés)');
}

/* ═══ 3. Généalogie ════════════════════════════════════════════════════════ */
const MOTIF_3 = `Haldria naît sur la côte sud-ouest d'Ilthara (histoire de Haldria, fac-0654, fac-0655) ; son ascendance iltharienne est celle que dit evt-0022 (la dissolution de Drahk'Nor donne naissance aux ancêtres de Drakora, Gryndor et Haldria), pas le Saint-Empire d'Endara ; ${D47}`;
retouche('pol-0073', 'summary', 'Civilisation intermédiaire du nord-centre d\'Endora', 'Civilisation intermédiaire du sud-ouest d\'Ilthara', MOTIF_3);
poserData('pol-0073', 'continent', 'Ilthara', MOTIF_3);
deplacerLien('lnk-0462', 'pol-0073', 'lie-0007', 'lie-0010', MOTIF_3);
retouche('per-0111', 'summary', 'il unifia les communautés côtières d\'Endora', 'il unifia les communautés côtières d\'Ilthara', MOTIF_3);
retouche('evt-0026', 'summary', 'Endora se fragmente en Haldria, Avalor et Sanvara.', 'Endora se fragmente en Avalor et Sanvara.', MOTIF_3);
libelleFait('fac-0413', 'Avalor, Haldria et Sanvara descendent', 'Avalor et Sanvara descendent', MOTIF_3);
libelleFait('fac-0017', 'Saint-Empire d\'Endara (province sud)', 'Communautés côtières du sud-ouest d\'Ilthara (avant le Protectorat d\'Haldros)', MOTIF_3);
libelleFait('fac-0020', 'Région montagneuse de Haldria', 'Région montagneuse d\'Endora (sous l\'Empire Kalvorn)', `Endrath est une nation d'Endora issue de l'Empire Kalvorn (fac-0394, succede-a pol-0075) ; Haldria n'est pas sur Endora ; ${D47}`);

/* ═══ 4. Continents ════════════════════════════════════════════════════════ */
const MOTIF_4E = `Haldria quitte Endora pour le sud-ouest d'Ilthara : Endora compte deux nations (Avalor, Sanvara) ; Haldria y reste la voix d'outre-mer, liée à ses ports par la Route des Marées ; ${D47}`;
const E7 = 'lie-0007';
retouche(E7, 'summary', 'Trois nations héritières du Saint-Empire d\'Endara — Avalor, Haldria, Sanvara — de lignée Syltharan.', 'Deux nations héritières du Saint-Empire d\'Endara, Avalor et Sanvara, de lignée Syltharan ; Haldria, royaume maritime du sud-ouest d\'Ilthara, en fréquente les ports.', MOTIF_4E);
retouche(E7, 'body', '| **Nations** | 3 — [[Avalor]], [[Haldria]], [[Sanvara]] |', '| **Nations** | 2 — [[Avalor]], [[Sanvara]] ; [[Haldria]], sur la rive d\'Ilthara, en est le partenaire d\'outre-mer |', MOTIF_4E);
retouche(E7, 'body', '- **Haldria** — lit les étoiles et les marées (« nous lisons »)', '- **Haldria** (outre-mer, au sud-ouest d\'Ilthara) — lit les étoiles et les marées (« nous lisons »)', MOTIF_4E);
retouche(E7, 'body', 'Trois bandes (axes) identifiables en deux semaines de marche :', 'Deux bandes (axes) identifiables en deux semaines de marche, et une troisième de l\'autre côté de la mer :', MOTIF_4E);
retouche(E7, 'body', '- **Axe maritime occidental (Haldria)** — côte découpée de Hekoria,', '- **Axe maritime d\'outre-mer (Haldria, au sud-ouest d\'Ilthara)** — hors d\'Endora, mais lié à ses ports par la Route des Marées : côte découpée de Hekoria,', MOTIF_4E);
retouche(E7, 'body', '- **Fjords d\'Uldora** — orientation', '- **Fjords d\'Uldora** (Haldria, outre-mer) — orientation', MOTIF_4E);
retouche(E7, 'body', 'bocage côtier (Perival, Uldora) · littoral découpé (Hekoria, Ravantis) · archipel insulaire (Kandaros) · ', 'bocage côtier (Perival) · ', MOTIF_4E);
retouche(E7, 'body', 'par les chroniqueurs d\'Hekorinth (étés plus tardifs', 'par les chroniqueurs d\'Hekorinth, en Ilthara (étés plus tardifs', MOTIF_4E);
retouche(E7, 'body', '| [[Haldria]] | Monarchie maritime, navigation stellaire, lecture des Tables et des marées |', '| [[Haldria]] (Ilthara, outre-mer) | Monarchie maritime, navigation stellaire, lecture des Tables et des marées |', MOTIF_4E);
retouche(E7, 'body', 'La refonte V3.4 a consolidé ces nations selon leur cohérence narrative actuelle : Iskara → Alkaran, Thalmaris → Evertia, Haldria → Endora. La trinité actuelle d\'Endora — Avalor, Haldria, Sanvara — est celle de la refonte.', 'La refonte V3.4 a consolidé ces nations selon leur cohérence narrative : Iskara → Alkaran, Thalmaris → Evertia, et avait rangé Haldria sous Endora. Le 12 octobre 2026, l\'auteur a rendu Haldria à Ilthara, au sud-ouest, où sa carte pose ses villes : Endora compte deux nations, et Haldria reste la troisième voix de sa polyphonie, par la mer.', MOTIF_4E);
retouche(E7, 'body', '- **Route des Marées** (Hekorinth → Raldir → Ravindor → Yaderis) — route maritime et terrestre reliant Haldria à Sanvara par le sud ; traverse la frange orientale de Perival sans entrer dans la forêt profonde.', '- **Route des Marées** (Hekorinth → Raldir → Ravindor, puis la mer jusqu\'à Yaderis) — route côtière en Haldria puis maritime, qui relie les ports haldriens d\'Ilthara à Sanvara par le sud ; à l\'arrivée, elle longe la frange orientale de Perival sans entrer dans la forêt profonde.', MOTIF_4E);
retouche(E7, 'body', '- **Route Astrale** (Hekorinth → Tyrolis → Murahal → frontière d\'Esperia)', '- **Route Astrale** (Hekorinth → Tyrolis par la côte haldrienne, puis la mer jusqu\'à Murahal et la frontière d\'Esperia)', MOTIF_4E);
retouche(E7, 'body', 'Trois nations partagent Endora, héritières chacune d\'un de ses paysages, et pourtant tissées par des routes anciennes', 'Deux nations partagent Endora, Avalor et Sanvara, et Haldria y aborde depuis Ilthara ; toutes sont tissées par des routes anciennes', MOTIF_4E);
retouche(E7, 'body', 'tint le continent entier — Avalor, Haldria et Sanvara descendent de ce souvenir', 'tint le continent entier — Avalor et Sanvara descendent de ce souvenir', MOTIF_4E);
retouche(E7, 'body', 'la **Route des Marées** qui longe les côtes haldriennes, la **Route Astrale** qui plonge depuis Hekorinth vers la frontière esperienne', 'la **Route des Marées** qui part des côtes haldriennes, outre-mer, la **Route Astrale** qui, depuis Hekorinth, traverse la mer et plonge vers la frontière esperienne', MOTIF_4E);

const MOTIF_4I = `Haldria est la neuvième nation d'Ilthara, au sud-ouest, où la carte de l'auteur pose ses villes ; ${D47}`;
const I10 = 'lie-0010';
retouche(I10, 'summary', 'Huit nations de lignée Ombril.', 'Neuf nations de lignée Ombril, dont Haldria, royaume maritime du sud-ouest.', MOTIF_4I);
retouche(I10, 'body', '| **Nations** | 8 (Ackerna, Drakora, Gryndor, Lythar, Pyrtara, Sylthara, Vytharia, Warenthor) |', '| **Nations** | 9 (Ackerna, Drakora, Gryndor, Haldria, Lythar, Pyrtara, Sylthara, Vytharia, Warenthor) |', MOTIF_4I);
retouche(I10, 'body', 'revendiquée par aucune des huit nations', 'revendiquée par aucune des neuf nations', MOTIF_4I);
retouche(I10, 'body', 'druides d\'Ackerna, chamanes de Warenthor). Uniformité de posture commune aux huit nations.', 'druides d\'Ackerna, chamanes de Warenthor, astrologues de Haldria). Uniformité de posture commune aux neuf nations.', MOTIF_4I);
retouche(I10, 'body', 'Huit nations partagent Ilthara.', 'Neuf nations partagent Ilthara.', MOTIF_4I);
retouche(I10, 'body', 'sous les huit nations', 'sous les neuf nations', MOTIF_4I);
retouche(I10, 'body', '| [[Gryndor]] | Royaume du savoir, bibliothèques de cristal et préservation rigoureuse |\n', '| [[Gryndor]] | Royaume du savoir, bibliothèques de cristal et préservation rigoureuse |\n| [[Haldria]] | Monarchie maritime du sud-ouest, navigation stellaire, Tables et marées |\n', MOTIF_4I);
retouche(I10, 'body', 'La refonte V3.4 l\'a relocalisée vers Endora pour cohérence narrative (royaume maritime / navigation astrale). Les fiches d\'Ilthara n\'incluent plus Haldria.', 'La refonte V3.4 l\'avait relocalisée vers Endora ; le 12 octobre 2026, l\'auteur l\'a rendue à Ilthara, au sud-ouest, où sa carte pose ses villes (Hekorinth, Uldarin, Kandorin, Raldir…). Haldria est la neuvième nation d\'Ilthara.', MOTIF_4I);

/* ═══ 5. Lunasar ═══════════════════════════════════════════════════════════ */
retouche('pol-0034', 'body', '| **Endora (Haldria)** |', '| **Haldria** |', `Haldria est une nation d'Ilthara, comme Lunasar ; ${D47}`);

/* ── garde-fous ── */
const INTERDITS = /atrium|glace qui refuse|l'envers|dessous du fond|Panghor|Profondeur Premi|le fond\b/i;
for (const [id, txt] of ecrits) {
  if (INTERDITS.test(txt)) echec(`${id} : le texte neuf contient un élément proscrit : « ${txt.match(INTERDITS)[0]} »`);
}
if (H.data.carte.sans_territoire) echec('pol-0017 : sans_territoire encore là');
for (const r of doc.relations) {
  if (r.rel_type === 'situe-dans' && r.from_id === 'pol-0017' && r.to_id === 'lie-0007') echec('pol-0017 encore situe-dans Endora');
}
const POS = ['lie-0660', 'lie-0679', 'lie-0685', 'lie-0686', 'lie-0687', 'lie-0688', 'lie-0689', 'lie-0948', 'lie-0949', 'lie-0950', 'lie-0951'];
const avantPos = new Map(JSON.parse(brutBase).entities.filter((e) => POS.includes(e.id)).map((e) => [e.id, [e.data.coord_x, e.data.coord_y]]));
for (const id of POS) {
  const d = byId.get(id).data;
  if (JSON.stringify([d.coord_x, d.coord_y]) !== JSON.stringify(avantPos.get(id))) echec(`${id} : position touchée`);
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
if (fs.readFileSync(BASE, 'utf8') !== brutBase) echec('data/kg-base.json a changé pendant le calcul (autre session) : relancer');
if (journal.length) doc._meta.updated_at = NOW;
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
for (const p of docsTouches) fs.writeFileSync(p, docsCRLF.get(p) ? docsTexte.get(p).replace(/\n/g, '\r\n') : docsTexte.get(p));
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités, ${doc.relations.length} relations). Ensuite : npm run kg:db`);
