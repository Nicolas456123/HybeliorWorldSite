#!/usr/bin/env node
/**
 * Demande Studio de8d6b3a6 (volet donnees-atrium-jeu), 2026-10-12 — décision de
 * l'auteur D49 après l'audit 1012 (lot 527) : « la carte fait foi ». Les
 * positions affichées par la carte du site (coord_x/y de l'Atrium) sont bonnes ;
 * on corrige rattachements et textes, jamais un lieu. Journal : registre des
 * incohérences, II, §21.
 *
 *  1. Iskara (pol-0002, 21 villes, 4 régions) et Ferrath (pol-0003) : côte nord
 *     d'Endora. Alkaran est un autre continent, à ~70 km au nord par la mer
 *     (C/8 : « trois jours de mer pour passer le bras qui sépare Alkaran
 *     d'Iskara »). Les deux nations gardent leur culture alkarane (Petravin).
 *     Ce qui ne tient plus par-dessus la mer suit : la Vorne et le lac de Vyrn
 *     passent sur la côte d'Endora (Selvaris partagée avec Iskara, plus avec
 *     Altram) ; frontières Altram/Ferrath et Torkam/Iskara → liens.
 *  2. Thalmaris (pol-0031, 17 villes, 5 régions) : nord-est d'Endora. Cëpias
 *     (lie-0669), cour du Cantus de C/24-26, est posée sur Evertia : elle devient
 *     la cité-État du Cantus d'Evertia, fille de Thalmaris, et tient la frontière
 *     avec Sylvara que les fiches prêtaient à Thalmaris.
 *  3. Skaldoria (pol-0039) : ses îles. L'île de Sylthor et Vyndar (et les
 *     marqueurs de la nation et de la région) est à ~15 km d'Endora : Endora.
 *     L'îlot de Skaldris est à ~18 km d'Alkaran : Skaldris est en Alkaran.
 *  4. Velmaris : le point de lie-0214 (port de Solmaris) est au cœur de
 *     Seraphia ; c'est celui de l'homonyme lie-0969 (Lagosaim). Confusion
 *     d'homonymes, pas rattachement faux : le point passe à lie-0969, lie-0214
 *     le perd (data.carte.coord_retirees), Solmaris reste en Azoria.
 *  5. Gravité 2 de l'audit : directions contredites (Glintar, Wildoria,
 *     Fugnord, Mylarin, Taldorn) ; lieux dans un lac ou la mer intérieure sans
 *     site lacustre (Crestalis, Nectoria, Galdris, Fylorin, Caelorn, Ylthros,
 *     Soltharis, Thaloris, et Azuralith, Zylarith de Thalmaris).
 *
 * Les livres ne sont pas touchés (relevé au registre). coord_x/y ne bougent pas,
 * sauf le transfert d'homonyme du point 4. data.raccord sur chaque retouche ;
 * corps reportés dans les miroirs Docs. Idempotent, sans reseed.
 * Usage : node scripts/arbitrer-d49-1012.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const MIROIRS = [path.join(ROOT, 'Docs', 'Lore', 'Pays'), path.join(ROOT, 'Docs', 'Lore', 'Histoires'), path.join(ROOT, 'Docs', 'GDD')];
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-12T22:00:00.000Z';
const DATE = '2026-10-12';
const D49 = 'décision de l\'auteur D49 (« la carte fait foi », 2026-10-12, après l\'audit 1012) ; demande Studio de8d6b3a6 ; registre des incohérences, II, §21';

function echec(msg) { console.error('✗ ' + msg + ' — rien n\'est écrit'); process.exit(1); }

const brutBase = fs.readFileSync(BASE, 'utf8');
const doc = JSON.parse(brutBase);
const byId = new Map(doc.entities.map((e) => [e.id, e]));
const relById = new Map(doc.relations.map((r) => [r.id, r]));
const faitById = new Map(doc.facts.map((f) => [f.id, f]));
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
function miroir(avant, apres, filtre) {
  let n = 0;
  for (const [p, t] of docsTexte) {
    if (filtre && path.basename(p) !== filtre) continue;
    if (t.includes(avant)) { docsTexte.set(p, t.split(avant).join(apres)); docsTouches.add(p); n++; }
  }
  return n;
}

/* ── retouches tracées ── */
const journal = [];
const ecrits = [];
function trace(o, champ, avant, pourquoi) {
  o.data = o.data || {};
  o.data.raccord = o.data.raccord || [];
  o.data.raccord.push({ date: DATE, champ, avant, pourquoi });
  if ('updated_at' in o || o.type) o.updated_at = NOW;
}
function retouche(id, champ, avant, apres, pourquoi, docsFiltre) {
  const e = ent(id);
  const t = e[champ] || '';
  ecrits.push([id, apres]);
  if (!t.includes(avant)) {
    if (t.includes(apres)) return false; // déjà fait
    echec(`${id} (${e.name}) : texte introuvable dans ${champ} : « ${avant.slice(0, 90)}… »`);
  }
  e[champ] = t.split(avant).join(apres);
  trace(e, champ, avant, pourquoi);
  const m = champ === 'body' ? miroir(avant, apres, docsFiltre) : 0;
  journal.push(`${id} ${e.name} · ${champ}${m ? ` (+ ${m} fiche Docs)` : ''}`);
  return true;
}
function retoucheData(id, chemin, avant, apres, pourquoi) {
  const e = ent(id);
  const parts = chemin.split('.');
  let o = e.data;
  for (const k of parts.slice(0, -1)) { if (!o || typeof o !== 'object') echec(`${id} : data.${chemin} absent`); o = o[k]; }
  const k = parts[parts.length - 1];
  const t = o && typeof o[k] === 'string' ? o[k] : null;
  if (t == null) echec(`${id} : data.${chemin} n'est pas un texte`);
  ecrits.push([id, apres]);
  if (!t.includes(avant)) {
    if (t.includes(apres)) return false;
    echec(`${id} (${e.name}) : texte introuvable dans data.${chemin} : « ${avant.slice(0, 90)}… »`);
  }
  o[k] = t.split(avant).join(apres);
  trace(e, 'data.' + chemin, avant, pourquoi);
  journal.push(`${id} ${e.name} · data.${chemin}`);
  return true;
}
function ajouter(id, texte, pourquoi) {
  const e = ent(id);
  ecrits.push([id, texte]);
  const t = e.body || '';
  if (t.includes(texte.trim().slice(0, 120))) return false;
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
  if (typeof valeur === 'string') ecrits.push([id, valeur]);
  if (JSON.stringify(o[k]) === JSON.stringify(valeur)) return false;
  const avant = o[k] === undefined ? '(absent)' : JSON.stringify(o[k]);
  if (valeur === undefined) delete o[k]; else o[k] = valeur;
  trace(e, 'data.' + chemin, avant, pourquoi);
  journal.push(`${id} ${e.name} · data.${chemin}`);
  return true;
}
function retoucheFait(fid, champ, avant, apres, pourquoi) {
  const f = faitById.get(fid);
  if (!f) echec(`${fid} absent`);
  const t = f[champ] || '';
  ecrits.push([fid, apres]);
  if (!t.includes(avant)) {
    if (t.includes(apres)) return false;
    echec(`${fid} : texte introuvable dans ${champ} : « ${avant.slice(0, 90)}… »`);
  }
  f[champ] = t.split(avant).join(apres);
  f.data = f.data || {};
  f.data.raccord = f.data.raccord || [];
  f.data.raccord.push({ date: DATE, champ, avant, pourquoi });
  journal.push(`${fid} (fait) · ${champ}`);
  return true;
}
function relier(lid, attendu, champs, pourquoi) {
  const r = relById.get(lid);
  if (!r) echec(`${lid} absent`);
  if (r.from_id !== attendu.from) echec(`${lid} : from ${r.from_id} ≠ ${attendu.from}`);
  const deja = Object.entries(champs).every(([k, v]) => r[k] === v);
  if (deja) return false;
  if (r.rel_type !== attendu.type || r.to_id !== attendu.to) echec(`${lid} : ${r.rel_type} ${r.to_id} inattendu (attendu ${attendu.type} ${attendu.to})`);
  const avant = `${r.rel_type} ${r.to_id}${r.label ? ' (' + r.label + ')' : ''}`;
  Object.assign(r, champs);
  r.data = r.data || {};
  r.data.raccord = r.data.raccord || [];
  r.data.raccord.push({ date: DATE, champ: Object.keys(champs).join('+'), avant, pourquoi });
  journal.push(`${lid} ${r.from_id} → ${r.rel_type} ${r.to_id}`);
  return true;
}
function nouvelleRelation(from, type, to, label, pourquoi) {
  ent(from); ent(to);
  if (doc.relations.some((r) => r.from_id === from && r.rel_type === type && r.to_id === to)) return false;
  const max = Math.max(...doc.relations.map((r) => Number((r.id.match(/^lnk-(\d+)$/) || [0, 0])[1])));
  const id = 'lnk-' + String(max + 1).padStart(4, '0');
  const r = { id, rel_type: type, from_id: from, to_id: to, start_year: null, end_year: null, label, data: { raccord: [{ date: DATE, champ: 'création', avant: '(absent)', pourquoi }] }, source_id: null, status: 'canon' };
  doc.relations.push(r); relById.set(id, r);
  journal.push(`${id} ${from} ${type} ${to} (nouveau)`);
  return true;
}

/* ═══ 1. Iskara et Ferrath : côte nord d'Endora ═══════════════════════════ */
const MI = `les 21 villes et les 4 régions d'Iskara sont posées sur la côte nord d'Endora (x 113 à 216, y −35 à 58) ; Alkaran est un autre continent, à ~70 km au nord par la mer (C/8 : « trois jours de mer pour passer le bras qui sépare Alkaran d'Iskara ») ; la nation garde sa culture alkarane (lignée Petravin, Lex Petra) ; ${D49}`;
const MF = `Ferrath touche Iskara (frontière des Hautes-Pierres ; C/8 : de Glintar, « la passe nord-est vers les hauts plateaux que les gens d'ici appellent Ferrath ») ; sa position estimée (229 ; 17) est sur Endora, au nord-est d'Iskara ; Altram et Torkam sont de l'autre côté de la mer Cendrée, et ce que les fiches tenaient par la terre avec eux passe par la mer ou revient à Iskara ; ${D49}`;

ent('pol-0002', 'Iskara');
poserData('pol-0002', 'continent', 'Endora', MI);
relier('lnk-0004', { from: 'pol-0002', type: 'situe-dans', to: 'lie-0001' }, { to_id: 'lie-0007' }, MI);
retouche('pol-0002', 'summary', 'Nation d\'Alkaran faite de vallées-forteresses', 'Nation de la côte nord d\'Endora, de culture alkarane, faite de vallées-forteresses', MI);
retouche('pol-0002', 'body', '| **Continent** | Alkaran |\n| **Numéro** | 23 |', '| **Continent** | Endora (côte nord ; culture alkarane, par-delà la mer Cendrée) |\n| **Numéro** | 23 |', MI);
retouche('pol-0002', 'body', 'vallées encaissées d\'Alkaran central, peuplées de bergers', 'vallées encaissées de la côte nord d\'Endora, peuplées de bergers', MI);
retouche('pol-0002', 'body', 'caserne-village unique en Alkaran', 'caserne-village unique dans le monde alkaran', MI);
retouche('lie-0027', 'summary', 'à Iskara (Alkaran)', 'à Iskara (Endora)', MI);
retouche('rel-0002', 'body', '(Iskara, Alkaran)', '(Iskara, Endora)', MI);
retouche('rel-0006', 'body', '(Iskara, Alkaran)', '(Iskara, Endora)', MI);
retouche('lie-0123', 'body', 'l\'homme le plus riche d\'Alkaran', 'l\'homme le plus riche d\'Iskara', MI);
retouche('pol-0018', 'body', '(NB : depuis la refonte V3.4, Iskara est rattachée à Alkaran ; l\'alliance reste évoquée dans les vieux traités sans application concrète.)', '(NB : Iskara est la voisine du nord d\'Avalor, sur le même continent — D49, 12 octobre 2026.)', MI);
retouche('lie-0297', 'body', '| **Alkaran (Iskara, Altram)** |', '| **Alkaran (Altram) et Iskara (Endora)** |', MI);
retouche('pol-0076', 'summary', 'Civilisation minière et métallurgique d\'Alkaran (', 'Civilisation minière et métallurgique d\'Alkaran et de la côte nord d\'Endora (', MI);
relier('lnk-2019', { from: 'pol-0040', type: 'frontiere-avec', to: 'pol-0002' }, { rel_type: 'lie-a', label: 'tension par-dessus la mer Cendrée' }, `${MI} ; Torkam (Alkaran) n'a pas de frontière terrestre avec Iskara`);

// Glintar : sud-est d'Iskara (direction, gravité 2)
const MG = `Glintar (196,0 ; 43,7) est au sud-est des villes d'Iskara (barycentre ~170 ; 9) et en est la région la plus méridionale ; au nord d'Iskara, il n'y a que la mer ; le seul accès terrestre vient donc de l'intérieur d'Endora ; ${D49}`;
retouche('lie-0916', 'summary', 'Région nord d’Iskara', 'Région sud-est d’Iskara', MG);
retouche('lie-0916', 'summary', 'la Porte de Fer qui commande le seul accès terrestre par le nord.', 'la Porte de Fer qui commande le seul accès terrestre, par le sud-est, depuis l’intérieur d’Endora.', MG);
retouche('lie-0916', 'body', 'Région nord, siège de la capitale.', 'Région sud-est, siège de la capitale.', MG);
retouche('lie-0916', 'body', 'la Porte de Fer y contrôle le seul accès terrestre depuis le nord.', 'la Porte de Fer y contrôle le seul accès terrestre, depuis le sud-est (l\'intérieur d\'Endora).', MG);

ent('pol-0003', 'Ferrath');
poserData('pol-0003', 'continent', 'Endora', MF);
relier('lnk-0006', { from: 'pol-0003', type: 'situe-dans', to: 'lie-0001' }, { to_id: 'lie-0007' }, MF);
relier('lnk-0782', { from: 'pol-0001', type: 'frontiere-avec', to: 'pol-0003' }, { rel_type: 'lie-a', label: 'ancienne suzeraineté, par-delà la mer Cendrée' }, `${MF} ; Altram (Alkaran) n'a pas de frontière terrestre avec Ferrath`);
retouche('pol-0003', 'summary', 'Nation minière des hauts massifs d\'Alkaran,', 'Nation minière des hauts massifs de la côte nord d\'Endora, de culture alkarane,', MF);
retouche('pol-0003', 'body', '| **Continent** | Alkaran |', '| **Continent** | Endora (côte nord, au nord-est d\'Iskara ; culture alkarane) |', MF, 'Ferrath.md');
retouche('pol-0003', 'body', 'Cavernes de l\'Écoute principales d\'Alkaran', 'Cavernes de l\'Écoute principales du monde alkaran', MF);
retouche('pol-0003', 'body', 'Massifs orientaux, frontière avec Iskara.', 'Massifs occidentaux, frontière avec Iskara.', `${MF} ; Iskara est à l'ouest de Ferrath sur la carte`);
retouche('pol-0003', 'body', 'Région nord-ouest, à la lisière des hauts plateaux torkamites. Mélange de vallées boisées (rares en Alkaran)', 'Région nord, sur la côte de la mer Cendrée, face aux hauts plateaux torkamites d\'outre-mer. Mélange de vallées boisées (rares dans le monde alkaran)', MF);
retouche('pol-0003', 'body', 'Région lacustre partagée avec Altram.', 'Région lacustre partagée avec Iskara.', MF);
retouche('pol-0003', 'body', 'Pas de frontière commune significative. Quelques caravanes torkamites passent par le Sourd-Bois ;', 'Pas de frontière commune : la mer Cendrée les sépare. Quelques marchands torkamites débarquent au Sourd-Bois ;', MF);
retouche('pol-0003', 'body', 'vallées d\'Alkaran central peuplées par des communautés de mineurs. Vassalité notionnelle envers Altram.', 'hautes vallées de la Vorne peuplées par des communautés de mineurs. Vassalité notionnelle envers Altram, d\'outre-mer.', MF);
poserData('pol-0003', 'carte.position_estimee.conflits', [
  'Résolu par D49 (2026-10-12) : Ferrath est sur Endora, comme Iskara, et son rattachement suit.',
  'Lac de Vyrn : partagé avec Iskara depuis D49, plus avec Altram (de l\'autre côté de la mer).',
], MF);
retouche('lie-0172', 'summary', 'partagée entre Ferrath et Altram', 'partagée entre Ferrath et Iskara', MF);
retouche('lie-0172', 'body', 'partagée administrativement avec Altram (frontière au milieu du lac)', 'partagée administrativement avec Iskara (frontière au milieu du lac)', MF);
retouche('lie-0172', 'body', 'Population mixte ferrathine et altramine', 'Population mixte ferrathine et iskarane', MF);
retouche('lie-0172', 'body', 'quartier altrami (rive sud)', 'quartier iskaran (rive sud)', MF);
retouche('lie-0172', 'body', 'entre en territoire altrami (ou inversement)', 'entre en territoire iskaran (ou inversement)', MF);
retouche('lie-0178', 'body', '(par voie d\'eau jusqu\'à Trelios)', '(par la Vorne jusqu\'à la mer Cendrée, puis par mer jusqu\'à Trelios)', MF);
retouche('lie-0169', 'body', 'des morts d\'Alkaran central de l\'an 58', 'des morts des vallées de la Vorne de l\'an 58', MF);
retouche('evt-0116', 'summary', 'chefs de mine d\'Alkaran central', 'chefs de mine des hautes vallées de la Vorne', MF);
retouche('lie-0175', 'summary', 'Caverne de l\'Écoute d\'Alkaran', 'Caverne de l\'Écoute du monde alkaran', MF);
retouche('lie-0175', 'body', 'Cavernes de l\'Écoute d\'Alkaran', 'Cavernes de l\'Écoute du monde alkaran', MF);
retouche('lie-0179', 'body', 'le reste d\'Alkaran est passé au fer', 'le reste du monde alkaran est passé au fer', MF);
retouche('lie-0173', 'summary', 'exportés dans toute Alkaran', 'exportés dans tout le monde alkaran', MF);
retouche('lie-0173', 'body', 'exportés dans toute Alkaran', 'exportés dans tout le monde alkaran, de part et d\'autre de la mer Cendrée', MF);
retoucheData('lie-0173', 'carte.position_estimee.motif', 'La terre physique est celle qu\'Iskara partage avec Endora ; l\'appartenance reste Ferrath, nation d\'Alkaran (comme Iskara).', 'Ferrath et Iskara sont des nations d\'Endora depuis D49 (2026-10-12).', MF);

// La fiche d'Alkaran
ent('lie-0001', 'Alkaran');
const MA = `${MI} ; ${MF}`;
retouche('lie-0001', 'summary', 'Quatre nations (Altram, Iskara, Ferrath, Torkam) de lignée Petravin y tiennent chacune un « métier » : forger, tailler, descendre, veiller.', 'Ses nations de lignée Petravin tiennent chacune un « métier » : forger (Altram), tailler (Iskara), descendre (Ferrath), veiller (Torkam) ; Altram, Torkam et Myrtam sont sur le continent, Iskara et Ferrath de l\'autre côté de la mer Cendrée, sur la côte nord d\'Endora.', MA);
retouche('lie-0001', 'body', '| **Nations** | 5 ([[Altram]], [[Iskara]], [[Ferrath]], [[Torkam]], [[Myrtam]]) |', '| **Nations** | 3 ([[Altram]], [[Torkam]], [[Myrtam]]) ; outre-mer, de même lignée, sur la côte nord d\'Endora : [[Iskara]], [[Ferrath]] |', MA);
retouche('lie-0001', 'body', 'Sédentaires d\'Altram, d\'Iskara et de Ferrath — nations de pierre, de fer, de mine.', 'Sédentaires d\'Altram — et, de l\'autre côté de la mer Cendrée, d\'Iskara et de Ferrath — nations de pierre, de fer, de mine.', MA);
retouche('lie-0001', 'body', '- **La Vorne** — rivière noire ; descend des massifs centraux d\'Altram, traverse Ferrath, se jette dans la mer Cendrée à hauteur d\'Iskara.', '- **La Vorne** (outre-mer, sur la côte nord d\'Endora) — rivière noire ; descend des hauts massifs de Ferrath et se jette dans la mer Cendrée à hauteur d\'Iskara, face à Alkaran.', MA);
retouche('lie-0001', 'body', '- **Lac de Vyrn** — plan d\'eau intérieur à cheval entre Altram et Ferrath ;', '- **Lac de Vyrn** (outre-mer, sur la côte nord d\'Endora) — plan d\'eau intérieur à cheval entre Ferrath et Iskara ;', MA);
retouche('lie-0001', 'body', 'fait que les chroniqueurs de Trelios refusent de laisser inscrire.', 'fait que les chroniqueurs de Glintaris refusent de laisser inscrire.', MA);
retouche('lie-0001', 'body', 'forêt de conifères de moyenne altitude (Altram, frontières d\'Iskara)', 'forêt de conifères de moyenne altitude (Altram)', MA);
retouche('lie-0001', 'body', 'steppe de pierre noire (centre d\'Altram, Ferrath)', 'steppe de pierre noire (centre d\'Altram)', MA);
retouche('lie-0001', 'body', 'littoral tempéré-froid (côte nord d\'Altram, côte est d\'Iskara)', 'littoral tempéré-froid (côte nord d\'Altram)', MA);
retouche('lie-0001', 'body', '| [[Iskara]] | Vallées-forteresses', '| [[Iskara]] (outre-mer, côte nord d\'Endora) | Vallées-forteresses', MA);
retouche('lie-0001', 'body', '| [[Ferrath]] | Profondeurs minières', '| [[Ferrath]] (outre-mer, côte nord d\'Endora) | Profondeurs minières', MA);
retouche('lie-0001', 'body', 'La refonte V3.4 a relocalisé Iskara → Alkaran et Skaldoria → Ulinor.', 'La refonte V3.4 avait relocalisé Iskara → Alkaran et Skaldoria → Ulinor ; le 12 octobre 2026 (D49), la carte faisant foi, Iskara et Ferrath sont rendues à la côte nord d\'Endora et Skaldoria à ses îles, entre Endora et Alkaran (Skaldris au large d\'Alkaran).', MA);
retouche('lie-0001', 'body', '(Trelios → Tanolies → fonds de Ferrath → Glintaris) — route caravanière intérieure suivant la rivière noire.', '(Trelios → Tanolies → la côte, puis la mer Cendrée → embouchure de la Vorne → fonds de Ferrath → Glintaris) — route mi-caravanière, mi-maritime, qui remonte la rivière noire de l\'autre côté de la mer.', MA);
retouche('lie-0001', 'body', 'reliant les Cavernes de l\'Écoute des hauts massifs de Ferrath aux Cavernes du nord d\'Altram et aux Sources-Bleues d\'Iskara)', 'reliant les Cavernes de l\'Écoute des hauts massifs de Ferrath aux Sources-Bleues d\'Iskara, sur la côte nord d\'Endora, et, par les barques des veilleurs, aux Cavernes du nord d\'Altram)', MA);
retouche('lie-0001', 'body', '- **Torkam / Iskara** — tension froide. Iskara tient les passes ; Torkam refuse de les reconnaître. Aucune armée levée depuis trois générations, mais frontières garnies en permanence', '- **Torkam / Iskara** — tension froide, par-dessus la mer Cendrée. Iskara tient les passes et les mouillages de sa côte ; Torkam refuse de les reconnaître. Aucune armée levée depuis trois générations, mais côtes garnies en permanence', MA);
retouche('lie-0001', 'body', 'Il y a [[Alkaran/Iskara|Iskara]], les vallées-forteresses', 'Il y a, de l\'autre côté de la mer Cendrée, sur la côte nord d\'Endora, [[Alkaran/Iskara|Iskara]], les vallées-forteresses', MA);
retouche('lie-0001', 'body', 'Il y a [[Alkaran/Ferrath|Ferrath]], les profondeurs minières', 'Il y a, sur la même côte, [[Alkaran/Ferrath|Ferrath]], les profondeurs minières', MA);

/* ═══ 2. Thalmaris : nord-est d'Endora ; Cëpias, cité du Cantus d'Evertia ══ */
const MT = `les 17 villes de Thalmaris (Ostarith, Galdaris, Valornis…) et ses cinq régions sont posées au nord-est d'Endora (x 211 à 319), à l'est d'Iskara ; Evertia est à ~650 km à l'ouest ; ${D49}`;
const MC = `Cëpias, cour du Cantus de C/24-26, est posée sur Evertia (−456,6 ; 132,2), à deux heures de l'Arbre-Mère de Sylvara : elle ne peut pas être une ville de Thalmaris, qui est au nord-est d'Endora ; elle devient la cité-État du Cantus d'Evertia, fondée par des Cantori venus de Thalmaris, et tient la frontière avec Sylvara que les fiches prêtaient à Thalmaris (C/25 : « le Cantus est plus vieux que Thalmaris » reste vrai) ; ${D49}`;
ent('pol-0031', 'Thalmaris');
poserData('pol-0031', 'continent', 'Endora', MT);
relier('lnk-0048', { from: 'pol-0031', type: 'situe-dans', to: 'lie-0008' }, { to_id: 'lie-0007' }, MT);
retouche('pol-0031', 'summary', 'Nation du sud-ouest du continent Evertia,', 'Nation du nord-est d\'Endora, à l\'est d\'Iskara,', MT);
retouche('pol-0031', 'body', '| **Continent** | Evertia |', '| **Continent** | Endora (nord-est) |', MT, 'Thalmaris.md');
retoucheData('pol-0031', 'note_interne', 'Thalmaris est la voie principale des rares contacts diplomatiques d\'Evertia avec l\'extérieur ; le continent reste hors des routes commerciales majeures et n\'entretient que quelques liaisons réglementées.', 'Thalmaris, au nord-est d\'Endora, garde avec Evertia, outre-mer, un lien de Cantus ancien que tient sur place sa cité-fille de Cëpias ; elle reste hors des routes commerciales majeures et n\'entretient que quelques liaisons réglementées.', `${MT} ; ${MC}`);
retoucheData('pol-0031', 'note_interne', '| **Evertia** (interne) | Voisinage druidique | Par le détroit, aux marées favorables : les druides evertiens viennent acheter partitions et cristaux de résonance ; les Cantori passent à Sylvara pour les sessions du Cantus à l\'Arbre-Mère. Contact quotidien mais irrégulier. |', '| **Evertia** (outre-mer) | Lien druidique lointain | Par mer, quelques traversées par an ; sur place, c\'est Cëpias, cité du Cantus fille de Thalmaris, qui vend partitions et cristaux de résonance aux druides evertiens et envoie ses Cantori aux sessions du Cantus à l\'Arbre-Mère de Sylvara. |', `${MT} ; ${MC}`);
retoucheData('pol-0031', 'note_interne', '| **Sylvara** (interne) | Écoute partagée | Les Cantori accompagnent au chant la croissance de l\'Arbre-Mère ; les Sylvarains sortants viennent aux marchés de Nalmir et repartent. Aucune frontière fixée, convention orale renouvelée deux fois par génération. |', '| **Sylvara** (outre-mer) | Écoute partagée | Par Cëpias : les Cantori accompagnent au chant la croissance de l\'Arbre-Mère ; les Sylvarains sortants viennent aux marchés de Cëpias et repartent. La frontière mouvante est celle de Cëpias, convention orale renouvelée deux fois par génération. |', `${MT} ; ${MC}`);
retoucheData('pol-0031', 'note_interne', 'Œuvres et instruments de Thalmaris ne circulent au-delà d\'Evertia que par cette voie', 'Œuvres et instruments de Thalmaris ne circulent au-delà d\'Endora que par cette voie', MT);
retouche('lie-0369', 'body', 'de tout Thalmaris et des trois nations d\'Evertia', 'de tout Thalmaris et des nations voisines d\'Endora', MT);
relier('lnk-2476', { from: 'pol-0032', type: 'frontiere-avec', to: 'pol-0031' }, { to_id: 'lie-0669' }, MC);
relier('lnk-4035', { from: 'lie-0669', type: 'situe-dans', to: 'pol-0031' }, { to_id: 'lie-0008' }, MC);
nouvelleRelation('lie-0669', 'lie-a', 'pol-0031', 'cité-fille du Cantus, outre-mer', MC);

ent('lie-0669', 'Cëpias');
retouche('lie-0669', 'summary', 'Cité du continent d’Evertia, portée au rang de capitale ; cour et académie du Cantus sur la côte intérieure d’Evertia, à deux heures de l’Arbre-Mère de Sylvara', 'Cité-État du Cantus sur la côte intérieure d’Evertia, à deux heures de l’Arbre-Mère de Sylvara, fondée par des Cantori venus de Thalmaris (Endora) et capitale de son petit territoire ; cour et académie du Cantus, elle tient la frontière avec Sylvara', MC);
poserData('lie-0669', 'rattachement', {
  nation: null,
  cite_etat: true,
  continent: 'Evertia (lie-0008)',
  fille_de: 'Thalmaris (pol-0031), outre-mer',
  date: DATE,
  motif: 'Posée sur Evertia par la carte ; Thalmaris est au nord-est d\'Endora (D49). C/25 : cour et académie du Cantus, ville qui dépense plus pour ses arts que pour ses soldats. Elle reprend sur Evertia ce que les fiches prêtaient à Thalmaris (frontière et hameaux mixtes avec Sylvara, Cantori à l\'Arbre-Mère, marché des Sylvarains). Rattachement du 2026-10-09 (Thalmaris) remplacé.',
}, MC);

ent('pol-0116', 'Evertia');
const MTE = `${MT} ; ${MC}`;
retouche('pol-0116', 'body', '| **Nations habitées** | 3 (Evertia au centre, Thalmaris au sud-ouest, Sylvara à l\'ouest) |', '| **Nations habitées** | 2 (Evertia au centre, Sylvara à l\'ouest) ; au sud-ouest, la cité-État cantorienne de Cëpias, fille de Thalmaris (nord-est d\'Endora) |', MTE);
retouche('pol-0116', 'body', 'instruments de Thalmaris, encres de Faloria)', 'partitions de Cëpias)', `${MTE} ; Faloria est une ville de Thalmaris, en Endora`);
retouche('pol-0116', 'body', '- **Thalmaris** — monarchie bardique-académique ; les Cantori écoutent les fréquences.', '- **Thalmaris** (outre-mer, au nord-est d\'Endora ; présente ici par sa cité-fille de Cëpias) — monarchie bardique-académique ; les Cantori écoutent les fréquences.', MTE);
retouche('pol-0116', 'body', '- **Thalmaris** (sud-ouest) — séparé d\'Evertia par un détroit praticable certains jours selon les marées. Collines onduleuses, lacs intérieurs, plans d\'eau acoustiquement remarquables, montagnes à l\'extrême nord-est (**Rylthos**), côte ouverte au commerce. Voie principale des contacts diplomatiques d\'Evertia avec l\'extérieur. Capitale : **Ostarith**, sur une colline de cristal de résonance.', '- **Cëpias** (sud-ouest) — cité-État du Cantus sur la côte intérieure, fondée par des Cantori venus de Thalmaris, royaume bardique du nord-est d\'Endora (capitale **Ostarith**, sur une colline de cristal de résonance). Cour et académie du Cantus, à deux heures de l\'Arbre-Mère ; voie principale des contacts diplomatiques d\'Evertia avec l\'extérieur.', MTE);
retouche('pol-0116', 'body', 'Frontière avec Thalmaris : convention orale', 'Frontière avec Cëpias : convention orale', MTE);
retouche('pol-0116', 'body', '- Thalmaris : soleil environ deux fois plus fréquent que chez ses voisines.', '- Thalmaris, qu\'on cite ici pour son soleil deux fois plus fréquent, est outre-mer, au nord-est d\'Endora.', MTE);
retouche('pol-0116', 'body', '- **Thalmaris** — plusieurs **lacs scintillants** aux berges acoustiques fondatrices d\'une tradition d\'écoute.', '- **Thalmaris** (outre-mer, pour mémoire) — plusieurs **lacs scintillants** aux berges acoustiques fondatrices d\'une tradition d\'écoute, que les Cantori de Cëpias racontent.', MTE);
retouche('pol-0116', 'body', '- Forêts mixtes (Thalmaris central).', '- Forêts mixtes (arrière-pays de Cëpias).', MTE);
retouche('pol-0116', 'body', 'Thalmaris par sa géographie de lacs et forêts.', 'Thalmaris, outre-mer, par sa géographie de lacs et forêts.', MTE);
retouche('pol-0116', 'body', '| [[Thalmaris]] | Monarchie bardique-académique, écoute des fréquences, espérance d\'une réponse qui ne vient pas |', '| [[Thalmaris]] (nord-est d\'Endora, outre-mer ; cité-fille : Cëpias) | Monarchie bardique-académique, écoute des fréquences, espérance d\'une réponse qui ne vient pas |', MTE);
retouche('pol-0116', 'body', '> [!info] Note V3.4 — Thalmaris à cheval', '> [!info] Note V3.4 et D49 — Thalmaris en Endora', MTE);
retouche('pol-0116', 'body', 'La fiche Thalmaris conserve les deux mentions.', 'Le 12 octobre 2026 (D49), la carte faisant foi, Thalmaris est rendue au nord-est d\'Endora, où sont ses dix-sept villes ; sa présence en Evertia est celle de Cëpias, cité-fille du Cantus.', MTE);
retouche('pol-0116', 'body', '- **Thalmaris ↔ Evertia (interne)** — par le détroit, irrégulier mais quotidien aux marées favorables. Druides venant acheter partitions et cristaux de résonance ; Cantori allant à Sylvara pour les sessions du Cantus à l\'Arbre-Mère.', '- **Cëpias ↔ Evertia (interne)** — par la côte intérieure, quotidien. Druides venant acheter partitions et cristaux de résonance ; Cantori allant à Sylvara pour les sessions du Cantus à l\'Arbre-Mère. Thalmaris, outre-mer, n\'y vient que par ses navires.', MTE);
retouche('pol-0116', 'body', 'Les Sylvarains sortants vont aux marchés de Nalmir (Thalmaris) et reviennent.', 'Les Sylvarains sortants vont aux marchés de Cëpias et reviennent.', MTE);
retouche('pol-0116', 'body', '**Les Thalmariens**, au sud-ouest insulaire, ont fondé leur royaume sur le **Cantus** — l\'art d\'écouter le monde par les fréquences qu\'il émet. Leur capitale, Ostarith,', '**Les Cantori de Cëpias**, au sud-ouest, tiennent leur cité de Thalmaris, royaume du nord-est d\'Endora fondé sur le **Cantus** — l\'art d\'écouter le monde par les fréquences qu\'il émet. Sa capitale, Ostarith,', MTE);
retouche('lie-0008', 'summary', 'Trois peuples de lignée Selvarine (Evertiens, Sylvarains, Thalmariens) unis par', 'Deux peuples de lignée Selvarine (Evertiens, Sylvarains), avec la cité cantorienne de Cëpias, fille de Thalmaris (Endora), unis par', MTE);

ent('pol-0032', 'Sylvara');
retouche('pol-0032', 'body', 'Le contact ancien avec Thalmaris a introduit', 'Le contact ancien avec Thalmaris, entretenu par sa cité-fille de Cëpias, a introduit', MC);
retouche('pol-0032', 'body', 'conduites par les Cantori thalmariens deux fois par lunaison', 'conduites par les Cantori de Cëpias deux fois par lunaison', MC);
retouche('pol-0032', 'body', 'Environ trois cents familles de la frontière thalmarienne pratiquent le Cantus Mundi comme religion principale : elles vont aux Heures du Chant à Ostarith, achètent des partitions à Galdaris,', 'Environ trois cents familles de la marge de Cëpias pratiquent le Cantus Mundi comme religion principale : elles vont aux Heures du Chant à Cëpias, y achètent leurs partitions,', MC);
retouche('pol-0032', 'body', '- **La Marge Thalmarienne** : frontière mouvante avec Thalmaris, où la forêt s\'amincit vers les collines onduleuses thalmariennes. Population mixte sylvarain-thalmarien (plusieurs hameaux).', '- **La Marge Cantorienne** : frontière mouvante avec les terres de Cëpias, où la forêt s\'amincit vers les collines de la cité du Cantus. Population mixte sylvaraine et cëpienne (plusieurs hameaux).', MC);
retouche('pol-0032', 'body', '| **Thalmaris** | Alliance pratique de longue date |', '| **Cëpias (et Thalmaris, outre-mer)** | Alliance pratique de longue date |', MC);
retouche('pol-0032', 'body', 'les hameaux mixtes (Vellinor) tiennent la frontière.', 'les hameaux mixtes (Vellinor) tiennent la frontière avec Cëpias.', MC);
retouche('pol-0032', 'body', 'Les rares contacts officiels passent par Thalmaris comme intermédiaire.', 'Les rares contacts officiels passent par Cëpias comme intermédiaire.', MC);
retouche('rel-0008', 'body', 'Cantus Mundi est une religion régionale d\'**Evertia** (Thalmaris)', 'Cantus Mundi est une religion régionale de **Thalmaris** (nord-est d\'Endora)', MT);
retouche('rel-0008', 'body', 'Thalmaris (Evertia)', 'Thalmaris (Endora)', MT);
retouche('pol-0035', 'body', 'Thalmaris (Evertia)', 'Thalmaris (Endora)', MT);
retouche('rel-0011', 'body', 'Thalmaris (Evertia)', 'Thalmaris (Endora)', MT);
retoucheFait('fac-0259', 'label', 'Forme institutionnelle tardive à Evertia (Thalmaris)', 'Forme institutionnelle tardive à Thalmaris (Endora)', MT);

/* ═══ 3. Skaldoria : ses îles ═════════════════════════════════════════════ */
const MS = `les lieux posés de Skaldoria sont sur deux îles : l'île de Sylthor et de Vyndar (201 u², à ~15 km de la côte nord d'Endora, où sont aussi les marqueurs de la nation et de la région) et l'îlot de Skaldris (85 u², à ~18 km d'Alkaran) ; Ulinor est à ~200 km au sud-ouest ; la nation est rattachée à Endora, Skaldris à Alkaran ; ${D49}`;
ent('pol-0039', 'Skaldoria');
poserData('pol-0039', 'continent', 'Endora', MS);
relier('lnk-0063', { from: 'pol-0039', type: 'situe-dans', to: 'lie-0013' }, { to_id: 'lie-0007' }, MS);
retouche('pol-0039', 'summary', 'Confédération clanique des fjords du nord d’Ulinor :', 'Confédération clanique des îles à fjords du large de la côte nord d’Endora, jusqu’aux abords d’Alkaran :', MS);
retouche('lie-0912', 'body', '| **Continent** | Ulinor |', '| **Continent** | Endora (îles du large de la côte nord ; Skaldris au large d\'Alkaran) |', MS, 'Skaldoria.md');
retouche('lie-0912', 'body', 'Une flotte venue d\'un continent lointain — les historiens débattent encore de son origine, certains disant Endora, d\'autres Cestra —', 'Une flotte venue de loin — les historiens débattent encore de son origine, certains disant Cestra, d\'autres plus loin encore —', `${MS} ; Endora est à quelques heures de mer, pas un « continent lointain »`);
poserData('lie-0782', 'continent', 'Alkaran', MS);
retouche('lie-0782', 'summary', 'Hameau côtier de Skaldoria, port de départ', 'Hameau côtier de Skaldoria, sur un îlot au large d\'Alkaran, port de départ', MS);
ent('lie-0013', 'Ulinor');
retouche('lie-0013', 'summary', 'Trois cultures — Confédération d\'Ulinor, Skaldoria au nord, Dhalvoria à l\'ouest — de lignée Panghori, vouées à la mémoire des Anciens.', 'Deux cultures — Confédération d\'Ulinor, Dhalvoria à l\'ouest — de lignée Panghori, vouées à la mémoire des Anciens ; Skaldoria, leur cousine, tient des îles lointaines au large d\'Endora.', MS);
retouche('lie-0013', 'body', '- **Confédération clanique de Skaldoria** (nord) —', '- **Confédération clanique de Skaldoria** (hors du continent : îles du large d\'Endora, à ~200 km au nord-est) —', MS);
retouche('lie-0013', 'body', '- **Fjords gelés du nord** (Skaldoria) —', '- **Fjords gelés de Skaldoria** (hors du continent, îles du large d\'Endora ; pour mémoire) —', MS);
retouche('lie-0013', 'body', '- **Grand Fjord de Skaldoria** — point d\'accostage défensif historique.', '- **Grand Fjord de Skaldoria** (hors du continent) — point d\'accostage défensif historique.', MS);
retouche('lie-0013', 'body', 'subarctique sévère à Skaldoria.', 'subarctique sévère à Skaldoria, outre-mer.', MS);
retouche('lie-0013', 'body', '| [[Skaldoria]] | Confédération clanique des fjords gelés', '| [[Skaldoria]] (îles du large d\'Endora, hors du continent) | Confédération clanique des fjords gelés', MS);
retouche('lie-0013', 'body', 'La refonte V3.4 a relocalisé Skaldoria vers Ulinor pour cohérence narrative,', 'La refonte V3.4 avait relocalisé Skaldoria vers Ulinor pour cohérence narrative (le 12 octobre 2026, D49, la carte faisant foi, Skaldoria est rendue à ses îles, au large de la côte nord d\'Endora et d\'Alkaran, cousine panghori d\'Ulinor),', MS);
retouche('lie-0013', 'body', 'accostant à Elaris et Skaldris une à deux fois par an', 'accostant à Elaris une à deux fois par an', MS);
retouche('lie-0013', 'body', 'aucun contact significatif ; les deux régions ne se touchent pas (les Vallées débouchent au sud, pas vers le nord glacé). Rumeur non vérifiée de Skaldoriens du Clan du Givre traversant à pied vers une vallée haute dhalvorienne pour y mourir', 'aucun contact significatif ; des centaines de lieues de mer les séparent. Rumeur non vérifiée de Skaldoriens du Clan du Givre venant par mer mourir dans une vallée haute dhalvorienne', MS);
retouche('lie-0013', 'body', 'vit au nord, dans les fjords gelés battus par des vents', 'vit loin au nord-est, au large d\'Endora, sur des îles aux fjords gelés battues par des vents', MS);
retouche('lie-0013', 'body', 'Skaldoria, plus au nord, fit la même découverte avec ses cairns.', 'Skaldoria, sur ses îles lointaines, fit la même découverte avec ses cairns.', MS);
retouche('lie-0013', 'body', '| **Skaldoria (Ulinor)** |', '| **Skaldoria (îles entre Endora et Alkaran)** |', MS);
retouche('lie-0297', 'body', '| **Skaldoria (Ulinor)** |', '| **Skaldoria (îles entre Endora et Alkaran)** |', MS);
retoucheFait('fac-1044', 'label', 'Les trois confédérations du continent (Confédération tribale d\'Ulinor, Skaldoria, Dhalvoria)', 'Les trois confédérations panghori (Confédération tribale d\'Ulinor, Dhalvoria et, sur ses îles lointaines, Skaldoria)', MS);

/* ═══ Endora : les nations du nord ═══════════════════════════════════════ */
ent('lie-0007', 'Endora');
const ME = `${MI} ; ${MT} ; ${MS}`;
retouche('lie-0007', 'summary', 'de lignée Syltharan ; Haldria, royaume maritime', 'de lignée Syltharan ; au nord, Iskara et Ferrath, nations de pierre de culture alkarane ; au nord-est, Thalmaris, monarchie bardique ; au large de la côte nord, les îles de Skaldoria ; Haldria, royaume maritime', ME);
retouche('lie-0007', 'body', '| **Nations** | 2 — [[Avalor]], [[Sanvara]] ; [[Haldria]], sur la rive d\'Ilthara, en est le partenaire d\'outre-mer |', '| **Nations** | 6 — [[Avalor]], [[Sanvara]] ; au nord, [[Iskara]], [[Ferrath]] et [[Thalmaris]] ; sur les îles du nord, [[Skaldoria]] ; [[Haldria]], sur la rive d\'Ilthara, en est le partenaire d\'outre-mer |', ME);
retouche('lie-0007', 'body', `| [[Sanvara]] | Confédération marchande, hospitalité codifiée, arbitrage itinérant |

> [!info] Note V3.4`, `| [[Sanvara]] | Confédération marchande, hospitalité codifiée, arbitrage itinérant |
| [[Iskara]] (côte nord) | Vallées-forteresses, monarchie militaire, culture alkarane |
| [[Ferrath]] (nord-est d'Iskara) | République des Profondeurs, mines et veilleurs, culture alkarane |
| [[Thalmaris]] (nord-est) | Monarchie bardique-académique, écoute des fréquences (Cantus) |
| [[Skaldoria]] (îles du nord) | Confédération clanique, ancêtres invoqués au combat |

> [!info] Note V3.4`, ME);
retouche('lie-0007', 'body', 'où sa carte pose ses villes : Endora compte deux nations, et Haldria reste la troisième voix de sa polyphonie, par la mer.', 'où sa carte pose ses villes. Le même jour (D49), la carte faisant foi, Iskara et Ferrath (côte nord), Thalmaris (nord-est) et les îles de Skaldoria reviennent à Endora, où sont leurs villes. Les trois voix de la polyphonie d\'Endora restent Avalor, Sanvara et Haldria, par la mer ; les nations du nord gardent leurs cultures propres (alkarane, bardique, clanique).', ME);
retouche('lie-0007', 'body', 'Deux nations partagent Endora, Avalor et Sanvara, et Haldria y aborde depuis Ilthara ;', 'Avalor et Sanvara se partagent le cœur d\'Endora, Iskara, Ferrath et Thalmaris son nord, Skaldoria les îles du large, et Haldria y aborde depuis Ilthara ;', ME);

/* ═══ 4. Velmaris : confusion d'homonymes ═════════════════════════════════ */
const MV = `le point (−357,8 ; −221,5) porté par lie-0214 est au cœur de Seraphia (Galenor), à 4,7 u d'Olvaris et à ~40 u du Lagosaim, région de l'homonyme lie-0969 (village de perliers détaché le 2026-09-09, §11.b-11) ; c'était une confusion d'homonymes, pas un rattachement faux : le point et son nom restent sur la carte et passent à lie-0969 ; Solmaris reste en Azoria et lie-0214 attend une position (agglomérations sans position, D49) ; ${D49}`;
{
  const v = ent('lie-0214', 'Velmaris');
  const s = ent('lie-0969', 'Velmaris (Seraphia)');
  const X = -357.8113845047076, Y = -221.51717630284855;
  if (v.data.coord_x != null) {
    if (Math.abs(v.data.coord_x - X) > 1e-6 || Math.abs(v.data.coord_y - Y) > 1e-6) echec('lie-0214 : coordonnées inattendues');
    poserData('lie-0214', 'carte.coord_retirees', { x: X, y: Y, date: DATE, vers: 'lie-0969 (Velmaris, Lagosaim, Seraphia)', motif: 'point de l\'homonyme de Seraphia, porté par erreur par le port de Solmaris' }, MV);
    poserData('lie-0214', 'coord_x', undefined, MV);
    poserData('lie-0214', 'coord_y', undefined, MV);
  }
  poserData('lie-0969', 'coord_x', X, MV);
  poserData('lie-0969', 'coord_y', Y, MV);
  if (s.data.coord_x !== X) echec('lie-0969 : coordonnées non posées');
}

/* ═══ 5a. Directions (gravité 2) ══════════════════════════════════════════ */
const MDW = `Wildoria (207,1 ; 111,1) est au sud des villes d'Avalor (audit 1012, C2) ; ${D49}`;
retouche('lie-0919', 'summary', 'Forêt sauvage du nord d’Avalor', 'Forêt sauvage du sud d’Avalor', MDW);
retouche('lie-0919', 'body', 'Forêt sauvage au nord ;', 'Forêt sauvage au sud ;', MDW);
const MDF = `Fugnord (354,7 ; 187,2) est au sud-ouest des villes de Mosrack, à ~79 km (audit 1012, C2) ; ${D49}`;
retouche('lie-0960', 'summary', 'Région marécageuse et malsaine du nord-est de Mosrack', 'Région marécageuse et malsaine du sud-ouest de Mosrack', MDF);
retouche('lie-0960', 'body', 'Région marécageuse et malsaine au nord-est.', 'Région marécageuse et malsaine au sud-ouest.', MDF);
const MDM = `Mylarin (−373,8 ; 272,4) est au nord de Malrith (−377,0 ; 282,1), sur la côte (audit 1012, C2) ; ${D49}`;
retouche('lie-0272', 'summary', 'Hameau de la côte sud de Malrith', 'Hameau de la côte nord de Malrith', MDM);
retouche('lie-0272', 'body', 'Hameau de la côte sud de Malrith', 'Hameau de la côte nord de Malrith', MDM);
const MDT = `Taldorn (−175,3 ; 112,3) est au sud-est de Davoria (−186,9 ; 95,9), vers Lythar dont il repousse les nomades (audit 1012, C2) ; ${D49}`;
retouche('lie-0735', 'summary', 'frontière nord de Davoria', 'frontière sud-est de Davoria', MDT);
retouche('lie-0735', 'body', 'frontière nord de Davoria', 'frontière sud-est de Davoria', MDT);
retouche('lie-0735', 'body', 'a scruter l\'horizon nord en quête', 'a scruter l\'horizon du sud-est en quête', MDT);
retouche('lie-0735', 'body', 'Une lumière, au nord, au-delà des frontières de Pyrtara,', 'Une lumière, au sud-est, au-delà des frontières de Pyrtara,', MDT);
retouche('lie-0735', 'body', 'd\'orienter leurs instruments vers le nord', 'd\'orienter leurs instruments vers le sud-est', MDT);

/* ═══ 5b. Lieux de lac ou de mer intérieure ═══════════════════════════════ */
const ML = (n, ou) => `${n} est posé ${ou} par la carte (audit 1012, A3 : « dans un lac sans mot lacustre ») ; site décrit d'après la carte, la position ne bouge pas ; ${D49}`;
ajouter('lie-0667', `## Site

Crestalis s'élève sur une île boisée du grand lac qui s'étend au nord d'Avalor, entre ses forêts et les terres de Thalmaris : on y arrive en barque, et les chênes de la cathédrale vivante plongent leurs racines jusque dans l'eau de la rive.`, ML('Crestalis', 'à ~4 km de la rive, dans le grand lac au nord d\'Avalor (561 u²)'));
ajouter('lie-0357', `## Site

Azuralith est un port de lac : la cité borde le grand lac qui s'étend au nord d'Avalor, entre Iskara, Thalmaris et Crestalis, et ses quais regardent l'eau douce ; les cristaux qui font sa lumière sont ceux de ses rives.`, ML('Azuralith', 'à ~0,8 km de la rive, dans le grand lac au nord d\'Avalor'));
ajouter('lie-0360', `## Site

Le village est bâti sur un éperon rocheux qui s'avance dans le lac du fond de la vallée de Zylar ; les falaises qui encerclent l'eau renvoient les sons d'une rive à l'autre.`, ML('Zylarith', 'à ~1,6 km de la rive, dans un lac de la vallée de Zylar (79 u²)'));
ajouter('lie-0693', `## Site

Nectoria est bâtie sur les îlots et les rives d'un petit lac de Nectaris ; ses jardins descendent jusqu'à l'eau et des ponts de bois relient les îlots, si bien que l'étranger qu'on y accueille passe la rive avant d'entrer dans les illusions.`, ML('Nectoria', 'à ~1,5 km de la rive, dans un petit lac de Nectaris (47 u²)'));
ajouter('lie-0843', `## Site

Galdris est sur l'île de jungle qui se dresse au milieu de la mer intérieure d'Ilthara, avec les autres lieux de Warenthor ; sa cascade aux eaux curatives tombe des hauteurs de l'île vers la rive.`, ML('Galdris', 'sur l\'île de la mer intérieure d\'Ilthara (île#27, 104 u², à ~11 km du continent)'));
ajouter('lie-0844', `## Site

Fylorin est sur la même île de jungle de la mer intérieure d'Ilthara que Galdris ; sa vallée s'ouvre vers la rive, et les pisteurs passent en barque d'une crique à l'autre quand la jungle est trop dense.`, ML('Fylorin', 'sur l\'île de la mer intérieure d\'Ilthara (île#27, 104 u²)'));
ajouter('lie-0162', `## Site

L'oasis est la rive d'un lac caché au fond du désert de Qythros : un plan d'eau que les dunes dérobent à la vue, et dont seules les tribus des Dunes et des Ombres connaissent le chemin.`, ML('Caelorn', 'au bord d\'un lac d\'Alkaran (64 u², ~0,6 km de la rive)'));
ajouter('lie-0465', `## Site

Ylthros borde un petit lac du Lagosaim ; les ateliers des souffleurs de verre sont sur la rive, et la source souterraine du minéral jaillit sous le village, au ras de l'eau.`, ML('Ylthros', 'sur la rive d\'un petit lac de Seraphia (55 u²)'));
ajouter('lie-0501', `## Site

Le cercle de Soltharis est bâti sur une presqu'île ronde qui s'avance dans un lac, au centre des plaines de Plenera : les couloirs de vent courent de la rive jusqu'à l'Arène Royale.`, ML('Soltharis', 'à ~1,4 km de la rive, dans un lac de Ventera (72 u²)'));
ajouter('lie-0805', `## Site

Thaloris est posé sur la rive d'un lac de Porthar, par où passent les barques chargées des marchandises de Tyndara ; le poste de contrôle surveille l'eau autant que la route, et c'est dans les roseaux de la rive que les contrebandiers cachent ce qu'ils cachent.`, ML('Thaloris', 'sur la rive d\'un petit lac d\'Onara (40 u²)'));

// le site lacustre dit aussi dans le résumé (ce que la carte et les fiches affichent d'abord)
retouche('lie-0667', 'summary', 'Capitale d’Avalor, « cathédrale vivante »', 'Capitale d’Avalor, bâtie sur une île boisée du grand lac, « cathédrale vivante »', ML('Crestalis', 'dans le grand lac au nord d\'Avalor'));
retouche('lie-0693', 'summary', 'Ville-jardin de Nectaris, point d’accueil', 'Ville-jardin de Nectaris, sur les îlots et les rives d’un petit lac, point d’accueil', ML('Nectoria', 'dans un petit lac de Nectaris'));
retouche('lie-0843', 'summary', 'Village de guérisseurs de Warenthor, près d’une cascade', 'Village de guérisseurs de Warenthor, sur l’île de la mer intérieure, près d’une cascade', ML('Galdris', 'sur l\'île de la mer intérieure d\'Ilthara'));
retouche('lie-0844', 'summary', 'Village des meilleurs pisteurs de Warenthor, dans une vallée', 'Village des meilleurs pisteurs de Warenthor, sur l’île de la mer intérieure, dans une vallée', ML('Fylorin', 'sur l\'île de la mer intérieure d\'Ilthara'));
retouche('lie-0162', 'summary', 'Oasis cachée de Torkam connue', 'Oasis cachée de Torkam, sur la rive d’un lac du désert, connue', ML('Caelorn', 'au bord d\'un lac d\'Alkaran'));
retouche('lie-0465', 'summary', 'Village de souffleurs de verre fabriquant', 'Village de souffleurs de verre, sur la rive d’un petit lac du Lagosaim, fabriquant', ML('Ylthros', 'sur la rive d\'un petit lac de Seraphia'));
retouche('lie-0501', 'summary', 'Capitale de Ventera, cité circulaire aux murs bas', 'Capitale de Ventera, cité circulaire bâtie sur une presqu’île de lac, aux murs bas', ML('Soltharis', 'dans un lac de Ventera'));
retouche('lie-0805', 'summary', 'Village de douaniers et d’inspecteurs contrôlant', 'Village de douaniers et d’inspecteurs, sur la rive d’un lac de Porthar, contrôlant', ML('Thaloris', 'sur la rive d\'un petit lac d\'Onara'));
retouche('lie-0360', 'summary', 'Unique village de la vallée de Zylar (Thalmaris), habité', 'Unique village de la vallée de Zylar (Thalmaris), sur un éperon de son lac, habité', ML('Zylarith', 'dans un lac de la vallée de Zylar'));

/* ── garde-fous ── */
const INTERDITS = /atrium|glace qui refuse|temp[êe]tes? vivantes? magiques?|l'envers|lacs?[- ]miroirs?|champignons? g[ée]ants?|dessous du fond|Panghor(?!i)|Profondeur Premi/i;
for (const [id, txt] of ecrits) {
  if (INTERDITS.test(txt)) echec(`${id} : le texte neuf contient un élément proscrit : « ${txt.match(INTERDITS)[0]} »`);
}
for (const [id, cont] of [['pol-0002', 'Endora'], ['pol-0003', 'Endora'], ['pol-0031', 'Endora'], ['pol-0039', 'Endora'], ['lie-0782', 'Alkaran']]) {
  if (byId.get(id).data.continent !== cont) echec(`${id} : continent ≠ ${cont}`);
}
for (const id of ['pol-0002', 'pol-0031', 'pol-0039', 'lie-0116', 'lie-0355', 'lie-0783']) {
  const d = byId.get(id).data;
  if (d.coord_x == null || d.coord_y == null) echec(`${id} : coord_x/y perdues`);
}
const sel = byId.get('lie-0172');
if (/altram/i.test(sel.summary + sel.body.replace(/Extrait/g, ''))) console.warn('  ! Selvaris mentionne encore Altram : ' + (sel.body.match(/[^.\n]*altram[^.\n]*/i) || [''])[0].slice(0, 160));
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
