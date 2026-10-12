#!/usr/bin/env node
/**
 * Demande Studio de8d6b3a6 (volet donnees-atrium-jeu), 2026-10-12 — décision D49
 * (« la carte fait foi ») : les agglomérations de l'Atrium (cités, villes, bourgs,
 * hameaux) qui n'avaient ni coord_x/y ni position_estimee (audit 1012, contrôle D1)
 * reçoivent une data.carte.position_estimee lue sur la carte peinte de l'auteur
 * (pictogrammes, HybeliorFull/HybeliorMap_files, niveaux 13-15) ou déduite des
 * textes (confiance basse). Les propositions sont dans data/positions_1012.json.
 *
 * Règles :
 *  - coord_x/y ne sont jamais touchées ; un lieu qui a des coord_x/y n'est pas
 *    touché (refus compté, jamais déplacé) ;
 *  - une position_estimee existante d'une autre origine n'est pas remplacée ;
 *    celle que ce script a posée (source « positions_1012 ») est mise à jour si la
 *    proposition a changé — rejouable et idempotent ;
 *  - kg-base.json est relu juste avant l'écriture : s'il a changé pendant le
 *    calcul (autre agent), rien n'est écrit ;
 *  - contrôle de cohérence de lib/kg-core avant écriture.
 *
 * Usage : node scripts/appliquer-positions-1012.js [--essai]
 * Ensuite : node scripts/tracer-routes.js ; node scripts/verifier-trajets.js --ecrire ; npm run kg:db
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const core = require('../lib/kg-core');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const PROPS = path.join(ROOT, 'data', 'positions_1012.json');
const ESSAI = process.argv.includes('--essai');
const NOW = '2026-10-12T22:00:00.000Z';
const ETIQUETTE = 'positions_1012';
const SOURCE = 'carte peinte de l\'auteur (HybeliorFull/HybeliorMap_files, niveaux 13-15) et fiches, relue le 2026-10-12 ; audit 1012 (D1), décision D49, demande de8d6b3a6 ; ' + ETIQUETTE;
const ECHELLES = new Set(['cite', 'ville', 'bourg', 'hameau']);

function echec(msg) { console.error('✗ ' + msg + ' — rien n\'est écrit'); process.exit(1); }
const empreinte = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

const brut = fs.readFileSync(BASE);
const avant = empreinte(brut);
const doc = JSON.parse(brut.toString('utf8'));
const props = JSON.parse(fs.readFileSync(PROPS, 'utf8'));
const liste = Array.isArray(props) ? props : props.positions;
if (!Array.isArray(liste) || !liste.length) echec('data/positions_1012.json vide ou mal formé');
const byId = new Map(doc.entities.map((e) => [e.id, e]));

const bilan = { posees: [], maj: [], deja: [], refus: [], nulles: [] };
const vus = new Set();
for (const p of liste) {
  if (vus.has(p.id)) echec(`${p.id} en double dans positions_1012.json`);
  vus.add(p.id);
  const e = byId.get(p.id);
  if (!e) { bilan.refus.push(`${p.id} ${p.nom} : absent de l'Atrium`); continue; }
  if (p.nom && e.name !== p.nom) echec(`${p.id} n'est pas ${p.nom} (${e.name})`);
  if (!p.position_estimee) { bilan.nulles.push(`${p.id} ${p.nom}`); continue; }
  const [x, y] = p.position_estimee.map(Number);
  if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(x) > 523 || Math.abs(y) > 523) echec(`${p.id} : position hors carte ${p.position_estimee}`);
  if (!['haute', 'moyenne', 'basse'].includes(p.confiance)) echec(`${p.id} : confiance « ${p.confiance} »`);
  const d = e.data = e.data || {};
  if (d.echelle && !ECHELLES.has(d.echelle)) { bilan.refus.push(`${p.id} ${e.name} : échelle ${d.echelle}, pas une agglomération`); continue; }
  if (d.coord_x != null || d.coord_y != null) { bilan.refus.push(`${p.id} ${e.name} : a des coord_x/y (${d.coord_x}, ${d.coord_y}), jamais déplacé`); continue; }
  const neuve = {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
    confiance: p.confiance,
    methode: p.source === 'pictogramme' ? 'carte' : 'indices',
    terre: p.terre || null,
    motif: p.justification,
    source: SOURCE,
  };
  if (!neuve.terre) delete neuve.terre;
  d.carte = d.carte || {};
  const ex = d.carte.position_estimee;
  if (ex && !(typeof ex.source === 'string' && ex.source.includes(ETIQUETTE))) {
    bilan.refus.push(`${p.id} ${e.name} : position_estimee d'une autre origine (${ex.x}, ${ex.y}), gardée`);
    continue;
  }
  if (ex && JSON.stringify(ex) === JSON.stringify(neuve)) { bilan.deja.push(p.id); continue; }
  d.carte.position_estimee = neuve;
  e.updated_at = NOW;
  (ex ? bilan.maj : bilan.posees).push(`${p.id} ${e.name} (${neuve.x}, ${neuve.y}) ${neuve.confiance}`);
}

const rapport = core.getConsistencyReport(core.mergeGraph(doc, {}));
if (rapport.counts.erreur) {
  rapport.issues.filter((i) => i.severity === 'erreur').slice(0, 10).forEach((i) => console.error('  ', i.message));
  echec(`${rapport.counts.erreur} erreur(s) de cohérence`);
}
console.log(`✓ posées : ${bilan.posees.length}, mises à jour : ${bilan.maj.length}, déjà à jour : ${bilan.deja.length}, sans position (cas impossibles) : ${bilan.nulles.length}, refusées : ${bilan.refus.length}`);
bilan.refus.forEach((r) => console.log('   refus — ' + r));
if (process.argv.includes('--detail')) [...bilan.posees, ...bilan.maj].forEach((r) => console.log('   ' + r));
console.log(`  cohérence : ${rapport.counts.erreur} erreur, ${rapport.counts.avert} avert., ${rapport.counts.info} info`);
if (ESSAI) { console.log('(essai : rien n\'est écrit)'); process.exit(0); }
if (!bilan.posees.length && !bilan.maj.length) { console.log('rien à écrire'); process.exit(0); }
if (empreinte(fs.readFileSync(BASE)) !== avant) echec('data/kg-base.json a changé pendant le calcul (autre agent ?) : relancer');
doc._meta.updated_at = NOW;
fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
console.log(`✓ data/kg-base.json écrit (${doc.entities.length} entités). Ensuite : node scripts/tracer-routes.js ; node scripts/verifier-trajets.js --ecrire ; npm run kg:db`);
