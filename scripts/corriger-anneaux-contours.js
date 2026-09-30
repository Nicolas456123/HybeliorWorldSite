#!/usr/bin/env node
'use strict';
/*
 * scripts/corriger-anneaux-contours.js — corrige data/monde-contours.json
 * (registre du prototype, C2 / F2 / F3). Rejouable : ce qui est déjà corrigé
 * porte la marque `recale` (ou le niveau 'eau') et n'est plus touché.
 *
 * CAUSE (diagnostic du 2026-10-01). continents-trace.svg est rempli en
 * « evenodd » : la mer intérieure d'Ilthara et les lacs y sont des SOUS-CHEMINS
 * IMBRIQUÉS (profondeur 1), pas des terres. Or extract-trace-contours.js
 * faisait de chaque sous-chemin une masse de « continent », et le site (monde.js,
 * tracer-routes, cartes d'ères…) les remplissait comme des terres. De plus, en
 * juillet 2026 (commit d3f7f41e4, « toutes les côtes recalées sur le vrai trait
 * de plage ») toutes les côtes ont été translatées d'environ (+5,2 ; +5,0) u
 * pour passer du repère du tracé à celui des vraies tuiles ; les 20 lacs, la
 * mer intérieure, Cestra, la terre du sud-ouest et l'îlot de Galenor (−418 ;
 * −214) n'ont PAS suivi : ils sont restés IDENTIQUES au tracé brut, donc
 * décalés de (−5,2 ; −5,0) u de la carte réelle.
 *
 * CORRECTION.
 *   - les 21 anneaux de profondeur 1 passent au niveau 'eau' (type
 *     'mer-interieure' ou 'lac', champ `dans` = continent hôte) et sont
 *     translatés de (+5,2 ; +5,0) ;
 *   - Cestra, la terre sans nom du sud-ouest et l'îlot de Galenor (profondeur 0,
 *     non retouchés) reçoivent la même translation (`--sans-cotes` pour les
 *     laisser en l'état) ;
 *   - les jeux par ère (copies des continents du jeu actuel) suivent.
 *   Les côtes déjà recalées (Ilthara, Galenor, Celethor…) ne sont PAS touchées.
 *
 * Usage : node scripts/corriger-anneaux-contours.js [--dry-run] [--sans-cotes]
 */

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'monde-contours.json');
const DECALAGE = [5.2, 5.0];          // tracé brut → vraies tuiles (médiane des côtes recalées, 0,4–0,7 u de résidu)
const dry = process.argv.includes('--dry-run');
const sansCotes = process.argv.includes('--sans-cotes');

// Empreintes (aire, nb de sommets, 1er sommet) des anneaux de profondeur 1 du tracé brut.
const ANNEAUX = [
  [1367, 26, -231.89, 145.61, 'mer-interieure', 'Ilthara'],
  [561, 20, 188.12, 60.54, 'lac', 'Endora'],
  [243, 18, -273.2, -165.95, 'lac', 'Galenor'],
  [108, 12, -314.41, -108.66, 'lac', 'Galenor'],
  [70, 8, -409.57, -125.08, 'lac', 'Galenor'],
  [79, 7, 229.36, 35.07, 'lac', 'Endora'],
  [76, 8, 242.09, 84.32, 'lac', 'Endora'],
  [72, 8, -407.89, -89.23, 'lac', 'Galenor'],
  [79, 8, 366.39, 64.89, 'lac', 'Onara'],
  [45, 9, -227.64, 131.9, 'lac', 'Ilthara', 'douteux : à cheval sur la côte de la mer intérieure'],
  [63, 8, -66.48, -302.65, 'lac', 'Celethor'],
  [64, 9, -259.47, 141.61, 'lac', 'Ilthara'],
  [64, 9, 170.72, -193.43, 'lac', 'Alkaran'],
  [40, 6, 323.17, 190.86, 'lac', 'Onara'],
  [55, 8, -369.7, -193.09, 'lac', 'Galenor'],
  [55, 8, 389.84, 120.17, 'lac', 'Onara'],
  [46, 6, 164.69, -252.06, 'lac', 'Alkaran'],
  [51, 9, -240.04, -203.81, 'lac', 'Galenor'],
  [47, 6, -195.14, 196.56, 'lac', 'Ilthara'],
  [42, 7, -385.78, -140.16, 'lac', 'Galenor'],
  [39, 5, -259.13, 80.64, 'lac', 'Ilthara'],
];
// Côtes non retouchées (profondeur 0, identiques au tracé brut).
const COTES = [
  [11790, 51, -463.18, -506.54, 'Cestra'],
  [6013, 44, -353.25, 392.16, 'terre sans nom du sud-ouest'],
  [86, 7, -421.69, -219.34, 'îlot au large de Galenor'],
];

const est = (m, [aire, n, x, y]) => m.points.length === n && m.aire === aire &&
  Math.abs(m.points[0][0] - x) < 0.006 && Math.abs(m.points[0][1] - y) < 0.006;
const decaler = (pts) => pts.map(([x, y]) => [Math.round((x + DECALAGE[0]) * 100) / 100, Math.round((y + DECALAGE[1]) * 100) / 100]);

const doc = JSON.parse(fs.readFileSync(OUT, 'utf8'));
let eau = 0, cotes = 0;
for (const jeu of doc.jeux) {
  jeu.masses = jeu.masses.flatMap((m) => {
    if (m.niveau !== 'continent' || m.recale) return [m];
    const a = ANNEAUX.find((e) => est(m, e));
    if (a) {
      if (jeu.era_id === null) eau++;
      if (jeu.era_id !== null) return [];    // l'eau ne figure pas dans les cartes d'ères (comme à la régénération)
      const r = { nom: a[4] === 'mer-interieure' ? 'Mer intérieure d\'Ilthara' : null, niveau: 'eau', type: a[4], dans: a[5], aire: m.aire, points: decaler(m.points), recale: DECALAGE };
      if (a[6]) r.note = a[6];
      return [r];
    }
    const c = !sansCotes && COTES.find((e) => est(m, e));
    if (c) {
      if (jeu.era_id === null) cotes++;
      return [{ ...m, points: decaler(m.points), recale: DECALAGE }];
    }
    return [m];
  });
}
console.log(`${eau} anneaux d'eau (mer intérieure + lacs) · ${cotes} côtes recalées` + (dry ? ' (dry-run, rien écrit)' : ''));
if (!dry && (eau || cotes)) fs.writeFileSync(OUT, JSON.stringify(doc) + '\n');
