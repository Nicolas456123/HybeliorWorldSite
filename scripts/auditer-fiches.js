#!/usr/bin/env node
'use strict';
/*
 * scripts/auditer-fiches.js — Fait le tour des fiches et dit ce qui cloche
 * encore : longueur, et documents du corpus qui se paraphrasent.
 *
 * Sert de relevé après `degrouper-fiches.js` : ce qui reste demande un
 * arbitrage d'auteur (fusionner deux aperçus qui se paraphrasent, créer la
 * fiche d'un lieu qui n'existe pas encore), pas une passe automatique.
 *
 * Usage : node scripts/auditer-fiches.js [--md]   (--md : sortie markdown)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const doc = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'kg-base.json'), 'utf8'));
const MD = process.argv.includes('--md');

const LONG = 25000;                 // au-delà, la fiche redevient une brique

// un corps de fiche est la suite des documents du corpus qui l'ont nourri
function documents(corps) {
  const blocs = [];
  let cur = null;
  for (const l of corps.split('\n')) {
    if (/^# /.test(l)) { cur = { titre: l.slice(2).trim(), texte: [] }; blocs.push(cur); }
    else if (cur) cur.texte.push(l);
  }
  return blocs.map((b) => ({ titre: b.titre, texte: b.texte.join('\n') }));
}

// ressemblance grossière entre deux textes : part des mots longs communs
function ressemblance(a, b) {
  const mots = (t) => new Set((t.toLowerCase().match(/[a-zàâäéèêëîïôöùûüç]{6,}/g) || []).slice(0, 4000));
  const A = mots(a), B = mots(b);
  if (!A.size || !B.size) return 0;
  let n = 0; for (const m of A) if (B.has(m)) n++;
  return n / Math.min(A.size, B.size);
}

const lignes = [];
for (const e of doc.entities) {
  if (!e.body || e.body.length < 4000) continue;
  if (!['entite-politique', 'lieu'].includes(e.type)) continue;
  const soucis = [];

  if (e.body.length > LONG) soucis.push(`encore ${Math.round(e.body.length / 1000)} k`);

  const docs = documents(e.body);
  const paires = [];
  for (let i = 0; i < docs.length; i++) {
    for (let j = i + 1; j < docs.length; j++) {
      const r = ressemblance(docs[i].texte, docs[j].texte);
      if (r > 0.55 && docs[i].texte.length > 2000 && docs[j].texte.length > 2000) {
        paires.push(`« ${docs[i].titre} » ≈ « ${docs[j].titre} » (${Math.round(r * 100)} %)`);
      }
    }
  }
  if (paires.length) soucis.push(`${paires.length} document(s) qui se recoupent`);

  // Note : on a tenté de repérer les sections décrivant un lieu dépourvu de
  // fiche. Sans dictionnaire, aucun réglage ne sépare « Enluminure » ou
  // « Biomes » (des rubriques) de « Galdryn-bas » (un lieu) : le relevé était
  // faux aux trois quarts. Mieux vaut ne rien annoncer que d'annoncer à faux.

  if (soucis.length) lignes.push({ nom: e.name, type: e.type, k: Math.round(e.body.length / 1000), soucis, paires });
}

lignes.sort((a, b) => b.k - a.k);

if (MD) {
  console.log('# Fiches à revoir — relevé automatique\n');
  console.log(`${lignes.length} fiches appellent encore une décision d'auteur.\n`);
  console.log('| Fiche | Taille | Ce qui reste à trancher |');
  console.log('|---|---|---|');
  for (const l of lignes) console.log(`| ${l.nom} | ${l.k} k | ${l.soucis.join(' ; ')} |`);
  console.log('\n## Détail\n');
  for (const l of lignes) {
    if (!l.paires.length) continue;
    console.log(`### ${l.nom} (${l.k} k)\n`);
    for (const p of l.paires) console.log(`- Documents qui se recoupent : ${p}`);
    console.log('');
  }
} else {
  console.log(`fiches appelant encore une décision : ${lignes.length}\n`);
  for (const l of lignes) console.log(`  ${String(l.k).padStart(3)}k  ${l.nom.padEnd(24)} ${l.soucis.join(' ; ')}`);
  const tropLong = lignes.filter((l) => l.k > LONG / 1000).length;
  const recoupe = lignes.filter((l) => l.paires.length).length;
  console.log(`\n  ${tropLong} encore trop longues · ${recoupe} avec des documents qui se recoupent`);
}
