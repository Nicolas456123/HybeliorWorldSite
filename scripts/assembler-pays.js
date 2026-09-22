#!/usr/bin/env node
'use strict';
/*
 * scripts/assembler-pays.js — Ne garde une surface ré-extraite que si elle est
 * MEILLEURE SUR TOUS LES PLANS que celle en place.
 *
 * Les aplats de « Hybelior Pays.png » ne sont pas encore justes (constat de
 * l'auteur, 2026-09-22) : une ré-extraction en répare certains et en abîme
 * d'autres. On compare donc pays par pays, contre les fiches
 * (scripts/diagnostic-pays.js) : la surface neuve ne passe que si elle n'a
 * pas un lieu juste de moins, ni un intrus ni un échappé de plus, et gagne
 * sur au moins un point. Sinon l'ancienne reste. Toute nouvelle surface qui
 * chevaucherait une surface retenue est refusée.
 *
 * Procédure :
 *   cp data/monde-contours.json /tmp/pays-en-place.json
 *   node scripts/extract-pays.js && node scripts/snap-pays-cotes.js
 *   node scripts/assembler-pays.js /tmp/pays-en-place.json
 *   node scripts/generer-cartes-eres.js
 */
const fs = require('fs');
const path = require('path');
const { charger, score } = require('./diagnostic-pays.js');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'monde-contours.json');

const enPlace = process.argv[2];
if (!enPlace) { console.error('usage : node scripts/assembler-pays.js <contours-en-place.json>'); process.exit(1); }
const ancien = JSON.parse(fs.readFileSync(enPlace, 'utf8'));
const neuf = JSON.parse(fs.readFileSync(OUT, 'utf8'));
const paysDe = (doc) => doc.jeux.find((j) => j.era_id === null).masses.filter((m) => m.niveau === 'pays');
const A = new Map(paysDe(ancien).map((m) => [m.nom, m]));
const N = new Map(paysDe(neuf).map((m) => [m.nom, m]));
const lieux = charger();

const dedans = (x, y, p) => { let o = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
  const [a, b] = p[i], [c, d] = p[j]; if ((b > y) !== (d > y) && x < ((c - a) * (y - b)) / (d - b) + a) o = !o; } return o; };
const chevauche = (a, b) => {
  const bx = (p) => [Math.min(...p.map((q) => q[0])), Math.max(...p.map((q) => q[0])), Math.min(...p.map((q) => q[1])), Math.max(...p.map((q) => q[1]))];
  const [a0, a1, a2, a3] = bx(a.points), [b0, b1, b2, b3] = bx(b.points);
  const x0 = Math.max(a0, b0), x1 = Math.min(a1, b1), y0 = Math.max(a2, b2), y1 = Math.min(a3, b3);
  if (x0 >= x1 || y0 >= y1) return 0;
  let n = 0; for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) if (dedans(x, y, a.points) && dedans(x, y, b.points)) n++;
  return n;
};

const retenues = new Map();
const neuves = [];
for (const nom of new Set([...A.keys(), ...N.keys()])) {
  const a = A.get(nom), n = N.get(nom);
  const sa = score(lieux, nom, a), sn = score(lieux, nom, n);
  const meilleure = n && sn.justes >= sa.justes && sn.intrus <= sa.intrus && sn.echappes <= sa.echappes
    && (sn.justes > sa.justes || sn.intrus < sa.intrus || sn.echappes < sa.echappes);
  if (meilleure) { retenues.set(nom, n); neuves.push([nom, sa, sn]); } else if (a) retenues.set(nom, a);
}
for (const [nom] of neuves) {
  for (const [autre, m] of retenues) {
    if (autre === nom) continue;
    const c = chevauche(retenues.get(nom), m);
    if (c > 3) { console.log(`  ⚠ ${nom} chevauche ${autre} (~${c} u²) — ancienne surface gardée`); A.get(nom) ? retenues.set(nom, A.get(nom)) : retenues.delete(nom); break; }
  }
}
console.log('surfaces remplacées :');
for (const [nom, a, n] of neuves) if (retenues.get(nom) === N.get(nom))
  console.log(`  ✔ ${nom.padEnd(24)} justes ${a.justes}→${n.justes}  intrus ${a.intrus}→${n.intrus}  échappés ${a.echappes}→${n.echappes}`);

const jeu = ancien.jeux.find((j) => j.era_id === null);
jeu.masses = jeu.masses.filter((m) => m.niveau !== 'pays').concat([...retenues.values()]);
fs.writeFileSync(OUT, JSON.stringify(ancien) + '\n');
console.log(`✔ ${retenues.size} surfaces — relancer scripts/generer-cartes-eres.js`);
