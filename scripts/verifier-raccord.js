#!/usr/bin/env node
'use strict';
/*
 * scripts/verifier-raccord.js — Les livres et l'Atrium sont-ils raccord ?
 *
 * Trois mesures, sans rien écrire :
 *   1. chaque renvoi de l'Atrium à un chapitre (data.preuve, data.source,
 *      data.recit_uid + data.chapitre) vise un chapitre qui existe ;
 *   2. chaque citation « … » d'une fiche ou d'un fait ancré à un chapitre se
 *      retrouve MOT POUR MOT dans ce chapitre (apostrophes, italiques, tirets et
 *      casse mis à part ; les coupes « […] » sont permises) ;
 *   3. les chapitres dont l'Atrium ne dit rien.
 *
 * À lancer après toute retouche d'un livre : une citation qui ne tient plus
 * désigne la fiche à reprendre.
 *
 * Usage :
 *   node scripts/verifier-raccord.js            → rapport
 *   node scripts/verifier-raccord.js --detail   → + chaque citation introuvable
 *   node scripts/verifier-raccord.js --json f   → écrit le détail dans f
 */

const fs = require('fs');
const path = require('path');

const RACINE = path.join(__dirname, '..');
const LIVRES = path.join(RACINE, 'Docs', 'Lore');
const argv = process.argv.slice(2);
const DETAIL = argv.includes('--detail');
const iJson = argv.indexOf('--json');
const SORTIE_JSON = iJson >= 0 ? argv[iJson + 1] : null;

const kg = JSON.parse(fs.readFileSync(path.join(RACINE, 'data', 'kg-base.json'), 'utf8'));

// ─── les chapitres : « C/12 », « T1/5 »… → fichier
const chapitres = {};
const dirChro = path.join(LIVRES, 'Chroniques');
for (const f of fs.readdirSync(dirChro)) {
  const m = f.match(/^Chapitre (\d+)/);
  if (m && f.endsWith('.md')) chapitres['C/' + Number(m[1])] = path.join(dirChro, f);
}
const dirTrilogie = path.join(LIVRES, 'Romans', 'Les Trois Coups');
for (const t of fs.readdirSync(dirTrilogie)) {
  const tome = (t.match(/^T\d/) || [])[0];
  if (!tome) continue;
  for (const f of fs.readdirSync(path.join(dirTrilogie, t))) {
    const m = f.match(/^(\d+)/);
    if (m && f.endsWith('.md')) chapitres[tome + '/' + Number(m[1])] = path.join(dirTrilogie, t, f);
  }
}

const norme = (s) => String(s).normalize('NFC')
  .replace(/[’‘]/g, "'").replace(/[«»“”"]/g, ' ').replace(/\*/g, '')
  .replace(/[—–-]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase();
const texte = {};
for (const c in chapitres) {
  texte[c] = norme(fs.readFileSync(chapitres[c], 'utf8').replace(/^---[\s\S]*?\n---\n/, ''));
}
const corpus = Object.values(texte).join(' \n ');

// ─── les ancres : item → chapitres
const OEUVRE = { chroniques: 'C', 't1': 'T1', 't2': 'T2', 't3': 'T3',
  'oeu-0013': 'C', 'oeu-0002': 'T1', 'oeu-0003': 'T2', 'oeu-0004': 'T3' };
const versChapitre = (r) => {
  const m = String(r).match(/^(C|T[123])\s*\/\s*(\d+)/);
  return m ? m[1] + '/' + Number(m[2]) : null;
};
const ancres = new Map();
const cassees = [];
const ancrer = (id, c) => {
  if (!c) return;
  if (!chapitres[c]) { cassees.push(`${id} → ${c}`); return; }
  if (!ancres.has(id)) ancres.set(id, new Set());
  ancres.get(id).add(c);
};
for (const x of [...kg.entities, ...kg.facts]) {
  const d = x.data || {};
  for (const r of [].concat(d.preuve || [], d.source || [])) ancrer(x.id, versChapitre(r));
  if (d.recit_uid && d.chapitre != null) {
    const o = OEUVRE[String(d.recit_uid).split(':')[0]];
    if (o) ancrer(x.id, o + '/' + d.chapitre);
  }
}

// ─── les citations
let total = 0;
let exactes = 0;
const ailleurs = [];
const introuvables = [];
const items = [
  ...kg.entities.map((e) => ({ id: e.id, nom: e.name, t: [e.summary, e.body].join(' ⁂ ') })),
  ...kg.facts.map((f) => ({ id: f.id, nom: f.label, t: [f.label, f.detail].join(' ⁂ ') })),
];
for (const it of items) {
  const cs = ancres.get(it.id);
  if (!cs) continue;
  for (const m of it.t.matchAll(/«\s*([^«»]{12,}?)\s*»/g)) {
    const morceaux = m[1].split(/\s*(?:\[…\]|\[\.\.\.\]|…|\.\.\.)\s*/).map(norme).filter((x) => x.length >= 10);
    if (!morceaux.length) continue;
    total++;
    if (morceaux.every((f) => [...cs].some((c) => texte[c].includes(f)))) { exactes++; continue; }
    const rec = { id: it.id, nom: it.nom, citation: m[1], ancres: [...cs] };
    if (morceaux.every((f) => corpus.includes(f))) ailleurs.push(rec);
    else introuvables.push(rec);
  }
}

const muets = Object.keys(chapitres).filter((c) => ![...ancres.values()].some((s) => s.has(c)));

console.log(`Chapitres : ${Object.keys(chapitres).length} · items de l'Atrium ancrés à un chapitre : ${ancres.size}`);
console.log(`Renvois vers un chapitre inexistant : ${cassees.length}`);
for (const c of cassees) console.log('  ✗ ' + c);
console.log(`Citations « … » ancrées : ${total}`);
console.log(`  exactes au chapitre cité ........ ${exactes}`);
console.log(`  exactes, mais dans un autre ...... ${ailleurs.length}`);
console.log(`  introuvables dans les livres ..... ${introuvables.length}`);
console.log(`Chapitres dont l'Atrium ne dit rien : ${muets.length}${muets.length ? ' — ' + muets.join(' ') : ''}`);
if (DETAIL) {
  for (const r of introuvables) console.log(`  ✗ ${r.id} [${r.ancres.join(',')}] « ${r.citation} »`);
  for (const r of ailleurs) console.log(`  ↪ ${r.id} [${r.ancres.join(',')}] « ${r.citation} »`);
}
if (SORTIE_JSON) {
  fs.writeFileSync(SORTIE_JSON, JSON.stringify({ cassees, introuvables, ailleurs, muets }, null, 1));
  console.log('→ ' + SORTIE_JSON);
}
