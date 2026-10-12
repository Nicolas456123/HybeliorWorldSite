#!/usr/bin/env node
/**
 * Demande Studio d1f80e2b8 (div6), 2026-10-12 — petites incohérences laissées
 * par le lot 518 (registre des incohérences, II, §18, « restent ») ; délégation
 * de l'auteur (D38, D41). Canon dominant : coordonnées de l'auteur et chapitres.
 * Journal : registre des incohérences, II, §19.
 *
 *  1. Pyrendor « région du nord de Gryndor », mais au SUD de Holvendar (−207,5 ;
 *     78,3 contre 66,5) et sur l'axe des chaînes cristallines (lie-0010) : c'est
 *     le sud du royaume, au nord d'Ilthara.
 *  2. Tolvandor « méridionale », mais à l'EST de Holvendar (−186,5 ; 68,2) ; C/15
 *     en fait des plateaux (Ordavan sur sa marge sud, Zyrthar au nord).
 *  3. Route des Forges « Drakora → cols de Pyrendor → Gryndor — au nord » : on
 *     garde la route, on lui donne un tracé qui tient (cols du Veltrak, Lythar,
 *     Davoria, cols de Pyrendor au bout des chaînes, Veylorn, Holvendar). Les
 *     cols du Veltrak (lie-1026) se prennent vers le SUD après Tolvandor (C/15 :
 *     « Drakora est au sud »), pas vers l'est.
 *  4. Lunaris (lie-0847) : la « roche argentée » de C/16 est un micaschiste à
 *     paillettes de mica et grains de quartz (reflets, aucune lueur propre) ;
 *     micro-zone retenue, seul éclat minéral de Drakora.
 *
 * coord_x/y jamais touchées ; data.raccord à chaque retouche ; miroirs Docs.
 * Idempotent, sans reseed. Usage : node scripts/arbitrer-div6-1012.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const MIROIRS = [path.join(ROOT, 'Docs', 'Lore', 'Pays'), path.join(ROOT, 'Docs', 'Lore', 'Histoires'), path.join(ROOT, 'Docs', 'GDD')];
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-12T18:30:00.000Z';
const DATE = '2026-10-12';
const D38 = 'demande Studio d1f80e2b8 (div6, restes du lot 518), délégation de l\'auteur (D38, D41) ; registre des incohérences, II, §19';

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
function miroir(avant, apres) {
  let n = 0;
  for (const [p, t] of docsTexte) {
    if (!t.includes(apres) && t.includes(avant)) { docsTexte.set(p, t.split(avant).join(apres)); docsTouches.add(p); n++; }
  }
  return n;
}
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

/* ═══ 1. Pyrendor : le sud du royaume ═══════════════════════════════════ */
ent('lie-0927', 'Pyrendor'); ent('lie-0665', 'Holvendar');
const MOTIF_1 = `les coordonnées de l'auteur placent Pyrendor (−207,5 ; 78,3) à ~12 u au SUD de Holvendar (−209,1 ; 66,5) et du cœur de Gryndor (−202,4 ; 69,4), sur l'axe des chaînes cristallines qui descend vers Pyrtara (lie-0010 data.carte.chaines_cristallines ; Veylorn, sa ville minière, en −199,7 ; 73) ; « du nord » ne vaut que pour Ilthara, dont Gryndor est le nord ; ${D38}`;
retouche('lie-0927', 'summary',
  'Région montagneuse du nord de Gryndor ;',
  'Région montagneuse du sud de Gryndor, où les chaînes cristallines descendent de Holvandor vers Pyrtara ;',
  MOTIF_1);
retouche('lie-0927', 'body',
  'Région montagneuse du nord. Domaine',
  'Région montagneuse du sud du royaume (le nord d\'Ilthara), où les chaînes cristallines descendent de Holvandor vers les volcans de Pyrtara ; ses cols, au bout de la chaîne, ouvrent Gryndor vers le sud-est. Domaine',
  MOTIF_1);
poserData('lie-0927', 'carte.situation', {
  dans: 'Gryndor (pol-0011), au sud de Holvandor (lie-0928)',
  axe: 'versant sud des chaînes cristallines, de Veylorn (lie-0703) jusqu\'aux cols au-dessus de Davoria (lie-0930)',
  pas: 'nord du royaume',
  date: DATE,
}, MOTIF_1);

/* ═══ 2. Tolvandor : l'est, des plateaux ════════════════════════════════ */
ent('lie-0929', 'Tolvandor'); ent('lie-0704', 'Zyrthar'); ent('lie-0046', 'Ordavan');
const MOTIF_2 = `les coordonnées de l'auteur placent Tolvandor (−186,5 ; 68,2) à ~23 u à l'EST de Holvendar, à la même latitude ; sa ville Zyrthar (−191,1 ; 66,2) et Ordavan (−190 ; 76,5) y sont. C/15 en fait « les plateaux de Tolvandor » (première neige, vent des plateaux ; Ordavan au sud, Zyrthar « vers le nord ») : plus bas que les crêtes de Holvandor, pas une plaine du sud ; ${D38}`;
retouche('lie-0929', 'summary',
  'Région méridionale de Gryndor, plus basse et tempérée ;',
  'Région orientale de Gryndor, plateaux plus bas et plus doux que les crêtes cristallines ;',
  MOTIF_2);
retouche('lie-0929', 'body',
  'Région méridionale, plus basse et tempérée.',
  'Région orientale, faite de plateaux plus bas et plus doux que les crêtes cristallines de Holvandor, mais où la neige tient dans les creux dès l\'automne ; Zyrthar au nord, Ordavan sur la marge sud.',
  MOTIF_2);
poserData('lie-0929', 'carte.situation', {
  dans: 'Gryndor (pol-0011), à l\'est de Holvandor (lie-0928)',
  relief: 'plateaux (C/15), plus bas que les chaînes cristallines',
  lieux: ['Zyrthar (lie-0704), au nord', 'Ordavan (lie-0046), marge sud'],
  pas: 'région méridionale',
  date: DATE,
}, MOTIF_2);

/* ═══ 3. Route des Forges ════════════════════════════════════════════════ */
ent('lie-0010', 'Ilthara'); ent('lie-1026', 'Les cols du Veltrak');
const MOTIF_3 = `la Route des Forges « Drakora → cols de Pyrendor → Gryndor, au nord » ne disait ni par où ni comment Drakora (sud-est, −143,5 ; 219,5) rejoint Gryndor (−202,4 ; 69,4), à ~150 u au nord-ouest ; on la garde (caravanes armées entre deux ennemis historiques, minerai de Davoria pour les forgerons) avec le seul tracé que la carte et les livres permettent : Myrthorin, cols du Veltrak (lie-1026, C/15-16), Lytharil (Lythar), plateau de Davoria (Pyrtara), cols de Pyrendor au bout des chaînes cristallines (Rydelith, lie-0828), Veylorn, Holvendar ; ${D38}`;
retouche('lie-0010', 'body',
  '- **Route des Forges** (Drakora → cols de Pyrendor → Gryndor) — au nord ; caravanes armées.',
  '- **Route des Forges** (Myrthorin → cols du Veltrak → Lytharil → plateau de Davoria → cols de Pyrendor → Veylorn → Holvendar) — de Drakora au sud-est jusqu\'à Gryndor au nord, par l\'est du continent ; caravanes armées, qui paient passage en Lythar et en Pyrtara.',
  MOTIF_3);
poserData('lie-0010', 'routes.route_des_forges', {
  nom: 'Route des Forges',
  etapes: [
    { lieu: 'Myrthorin (lie-0661)', x: -160.5, y: 195.2 },
    { lieu: 'cols du Veltrak (lie-1026)', x: -168, y: 182, estime: true },
    { lieu: 'Lytharil (lie-0699)', x: -170.2, y: 144.4 },
    { lieu: 'plateau de Davoria (lie-0930)', x: -186.9, y: 95.9 },
    { lieu: 'cols de Pyrendor, au-dessus de Rydelith (lie-0828)', x: -195, y: 85, estime: true },
    { lieu: 'Veylorn (lie-0703)', x: -199.7, y: 73 },
    { lieu: 'Holvendar (lie-0665)', x: -209.1, y: 66.5 },
  ],
  longueur_u: 141, longueur_km: 135, duree: 'dix à douze jours de caravane',
  pays: ['Drakora', 'Lythar', 'Pyrtara', 'Gryndor'],
  nature: 'caravanes armées ; minerai et obsidienne de Davoria, acier de Drakora, instruments de Gryndor',
  note: 'en jeu : route principale (rang 4) ; aucun tronçon n\'est tracé ici (chemins-routes)',
  date: DATE,
}, MOTIF_3);
const MOTIF_3b = `C/15 dit « Drakora est au sud » et « vers le sud, vers les cols du Veltrak » ; C/16 passe le col « le vent du nord dans le dos » ; « vers l'est » venait d'une version antérieure du chapitre ; la Route des Forges emprunte ces cols ; ${D38}`;
retouche('lie-1026', 'summary',
  'que Sorin prend vers l’est après Tolvandor.',
  'que Sorin prend vers le sud après Tolvandor ; la Route des Forges y passe.',
  MOTIF_3b);

/* ═══ 4. Lunaris : la roche argentée ═════════════════════════════════════ */
ent('lie-0847', 'Lunaris');
const MOTIF_4 = `C/16 donne au canyon « des parois d'un gris argenté qui prennent la lumière » et dit que « la lumière accroche les cristaux de la roche » ; la fiche, « parois cristallines » et lueur argentée « même de jour ». Lecture crédible et unique : un micaschiste à mica blanc et grains de quartz, dont les paillettes renvoient la lumière ; aucune lueur propre, aucune veine de cristal comme en Gryndor. Micro-zone retenue (proposition du §18) ; ${D38}`;
ajouter('lie-0847', `## La roche

Les parois du canyon sont d'un micaschiste gris clair, chargé de paillettes de mica blanc et de grains de quartz. Elles n'émettent aucune lumière : elles renvoient celle qui tombe entre elles, de la lune comme du jour, d'où l'éclat d'argent qui a donné son nom au village. C'est le seul éclat de ce genre en Drakora, dont le reste n'est que basalte, cendre et caillasse volcanique.`, MOTIF_4);
poserData('lie-0847', 'carte.micro_zone', {
  nom: 'roche argentée',
  nature: 'micaschiste à mica blanc et grains de quartz (reflets, aucune lueur propre)',
  etendue: 'parois du canyon sur ~3 km autour du village',
  centre: { x: -167.9, y: 220.5, source: 'coordonnée de la fiche' },
  ligne_rouge: 'que-0011 : aucune lueur, aucune variation lumineuse rythmée, rien qui monte du fond ; la roche est un décor, pas un signe',
  date: DATE,
}, MOTIF_4);

/* ── garde-fous ── */
const INTERDITS = /atrium|Panghor|Profondeur Premi|dessous du fond|\bpuls|battement|dorm/i;
for (const [id, txt] of ecrits) if (INTERDITS.test(txt.replace(/rien qui monte du fond/g, ''))) echec(`${id} : élément proscrit « ${txt.match(INTERDITS)[0]} »`);
for (const id of ['lie-0927', 'lie-0929', 'lie-0010', 'lie-0847']) {
  const d = byId.get(id).data;
  if (d.coord_x == null || d.coord_y == null) echec(`${id} : coord_x/y perdues`);
}
const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
console.log(`✓ retouches (${journal.length}) :`); journal.forEach((j) => console.log('   ' + j));
console.log(`✓ fiches Docs touchées : ${[...docsTouches].map((p) => path.relative(ROOT, p)).join(', ') || 'aucune'}`);
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
if (!journal.length) { console.log('rien à écrire (déjà à jour)'); process.exit(0); }
if (fs.readFileSync(BASE, 'utf8') !== brutBase) echec('data/kg-base.json a changé pendant le calcul (autre session) : relancer');
doc._meta.updated_at = NOW;
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
for (const p of docsTouches) fs.writeFileSync(p, docsCRLF.get(p) ? docsTexte.get(p).replace(/\n/g, '\r\n') : docsTexte.get(p));
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités). Ensuite : npm run kg:db`);
