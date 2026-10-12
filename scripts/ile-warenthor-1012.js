#!/usr/bin/env node
/**
 * Demande Studio de8d6b3a6, 2026-10-12 — décision de l'auteur après D52 : « ajoute
 * l'île de Warenthor ». L'île de la mer intérieure d'Ilthara n'avait dans
 * data/monde-contours.json qu'un polygone grossier de 10 points (≈ 104 u², décalé
 * vers l'est et rogné de ~1 u à l'ouest). Sa côte est relevée ici sur la carte
 * peinte de l'auteur (tuiles HybeliorFull/HybeliorMap_files, niveau 15 ; trait de
 * plage, comme les autres côtes ; repère px = (monde + [527.5, 535]) / 1047 · L ;
 * simplification à 0,12 u) et remplace ce polygone :
 *  - dans le jeu actuel et dans les trois cartes d'ères (même île) ;
 *  - pour la surface de Warenthor (source « cote-ile » : repli « côte d'île »
 *    d'extract-pays.js, qui reprend exactement la côte de l'île).
 * Rien d'autre n'est touché (Haldria, autres pays, autres côtes). Les surfaces
 * d'ères posées sur l'île sont refaites par generer-cartes-eres.js.
 * Rejouable, idempotent. Ensuite : node scripts/verifier-contours.js ;
 * node scripts/generer-cartes-eres.js ; tracer-routes, verifier-trajets --ecrire, kg:db.
 * Usage : node scripts/ile-warenthor-1012.js [--essai]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const F = path.join(__dirname, '..', 'data', 'monde-contours.json');
const ESSAI = process.argv.includes('--essai');
const COTE = [[-217.02, 172.12], [-216.39, 172.37], [-215.93, 173.09], [-215.56, 172.79], [-215.18, 172.79], [-214.97, 173.09], [-215.72, 174.13], [-215.47, 175.68], [-215.22, 176.39], [-214.38, 177.4], [-213.67, 179.07], [-213.76, 180.58], [-213.55, 181.67], [-214.01, 182.38], [-214.3, 184.77], [-214.64, 185.32], [-215.05, 185.57], [-216.6, 185.86], [-217.78, 186.45], [-219.03, 186.53], [-219.74, 186.36], [-220.58, 185.86], [-221.67, 185.86], [-222.05, 185.69], [-222.43, 185.15], [-222.63, 184.14], [-222.89, 181.76], [-222.13, 178.36], [-222.13, 177.44], [-222.3, 176.9], [-223.3, 175.68], [-224.06, 173.76], [-224.06, 173.09], [-223.64, 172.54], [-222.89, 172.42], [-219.33, 172.96], [-218.91, 173.5], [-218.7, 173.5], [-218.15, 173.09], [-217.82, 173.13], [-217.53, 172.46], [-217.06, 172.16], [-217.02, 172.12]];
const aire = (P) => { let a = 0; for (let i = 0; i < P.length - 1; i++) a += P[i][0] * P[i + 1][1] - P[i + 1][0] * P[i][1]; return Math.round(Math.abs(a / 2)); };
const centre = (P) => [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];
const estIle = (m) => { const [x, y] = centre(m.points); return Math.abs(x + 219) < 4 && Math.abs(y - 179.5) < 5 && m.aire < 150; };
const A = aire(COTE);
const doc = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0;
for (const jeu of doc.jeux) {
  const iles = jeu.masses.filter((m) => m.niveau === 'continent' && estIle(m));
  if (iles.length !== 1) { console.error(`✗ [${jeu.era_id}] ${iles.length} île(s) de Warenthor trouvée(s) — rien n'est écrit`); process.exit(1); }
  const cibles = [iles[0]];
  if (jeu.era_id === null) {
    const w = jeu.masses.find((m) => m.niveau === 'pays' && m.nom === 'Warenthor');
    if (!w || w.source !== 'cote-ile') { console.error('✗ surface de Warenthor absente ou pas « cote-ile » — rien n\'est écrit'); process.exit(1); }
    cibles.push(w);
  }
  for (const m of cibles) {
    if (JSON.stringify(m.points) === JSON.stringify(COTE) && m.aire === A) continue;
    m.points = COTE.map((p) => p.slice());
    m.aire = A;
    if (m.niveau === 'continent') m.releve = 'côte relevée sur la carte peinte (niveau 15), 2026-10-12, de8d6b3a6';
    n++;
  }
}
console.log(`✓ île de Warenthor : ${COTE.length} points, ${A} u² ; ${n} masse(s) mise(s) à jour`);
if (ESSAI || !n) process.exit(0);
fs.writeFileSync(F, JSON.stringify(doc) + (fs.readFileSync(F, 'utf8').endsWith('\n') ? '\n' : ''));
console.log('✓ data/monde-contours.json écrit');
