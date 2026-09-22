#!/usr/bin/env node
'use strict';
// Contrôle de divulgation — ce que le monde sait contre ce que les livres disent.
//
// DEUX AXES, à ne pas confondre :
//   • `disclosure` — jusqu'où va la connaissance de cette entité DANS le monde.
//       public    : n'importe quel habitant le sait ; un livre peut l'énoncer.
//       restreint : un ordre, une guilde, une archive le sait. Une narration en
//                   point de vue extérieur au groupe qui l'énonce est une FAUTE
//                   DE POINT DE VUE, pas une faute de fait.
//       auteur    : défini pour la cohérence, JAMAIS énoncé par un narrateur.
//                   C'est le substrat : ce qu'il faut tenir uniforme sans le dire.
//       t1..t4    : axe hérité, spoiler-lecteur (révélé par tel tome).
//       interne   : défaut historique, à migrer vers `auteur` ou `public`.
//   • `data.protege: true` — ce mystère ne doit JAMAIS être DÉFINI. L'inverse
//       d'`auteur` : là on ne sait pas, ici on sait mais on se tait.
//
// Usage :
//   node scripts/verifier-divulgation.js            → rapport complet
//   node scripts/verifier-divulgation.js --proposer → propose une classification
//                                                     d'après ce que les livres nomment

const fs = require('fs');
const path = require('path');

const RACINE = path.join(__dirname, '..');
const LIVRES = path.join(RACINE, 'Docs/Lore/Romans');

function norm(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’]/g, "'").toLowerCase();
}

function corps(txt) {
  const m = txt.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return m ? m[1] : txt;
}

// narration seule : ni bloc cité, ni réplique, ni incise entre guillemets
function narration(txt) {
  return corps(txt).split('\n').filter(l => {
    const s = l.trim();
    return !s.startsWith('>') && !s.startsWith('#') && !s.startsWith('—');
  }).map(l => {
    let out = '', i = 0;
    while (i < l.length) {
      if (l[i] === '«') { const j = l.indexOf('»', i); i = j === -1 ? l.length : j + 1; out += ' ¤ '; }
      else { out += l[i]; i++; }
    }
    return out;
  }).join('\n');
}

function chapitres() {
  const out = [];
  for (const tome of fs.readdirSync(LIVRES)) {
    const d = path.join(LIVRES, tome);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const sd of [d, ...fs.readdirSync(d).map(x => path.join(d, x)).filter(x => fs.statSync(x).isDirectory())]) {
      for (const f of fs.readdirSync(sd).filter(x => /^\d\d .*\.md$/.test(x))) {
        const p = path.join(sd, f);
        out.push({ cle: path.basename(sd).slice(0, 2) + '/' + f.slice(0, 2), txt: fs.readFileSync(p, 'utf8') });
      }
    }
  }
  return out;
}

const kg = JSON.parse(fs.readFileSync(path.join(RACINE, 'data/kg-base.json'), 'utf8'));
let ents = kg.entities || kg;
if (!Array.isArray(ents)) ents = Object.values(ents);
const chs = chapitres();
const narr = chs.map(c => ({ cle: c.cle, n: norm(narration(c.txt)), tout: norm(corps(c.txt)) }));

const dataDe = e => {
  let d = e.data || {};
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch { d = {}; } }
  return d;
};

// un nom est « nommé » s'il apparaît en frontière de mot
const nomme = (nom, hay) => {
  const n = norm(nom);
  if (n.length < 4) return false;
  return new RegExp('(^|[^a-z0-9\'-])' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9-])').test(hay);
};

const par = {};
for (const e of ents) (par[e.disclosure || 'interne'] ||= []).push(e);

console.log('=== RÉPARTITION ACTUELLE ===');
for (const [k, v] of Object.entries(par).sort((a, b) => b[1].length - a[1].length)) {
  console.log('  ' + k.padEnd(12) + String(v.length).padStart(5));
}

console.log('\n=== INFRACTIONS : une entité `auteur` nommée en narration ===');
let inf = 0;
for (const e of par.auteur || []) {
  const où = narr.filter(c => nomme(e.name, c.n)).map(c => c.cle);
  if (où.length) { inf++; console.log('  ⚠ ' + e.name + ' → ' + où.join(' · ')); }
}
console.log('  → ' + inf + ' infraction(s)');

console.log('\n=== `restreint` nommées en narration (à juger : faute de point de vue ?) ===');
let res = 0;
for (const e of par.restreint || []) {
  const où = narr.filter(c => nomme(e.name, c.n)).map(c => c.cle);
  if (où.length) { res++; console.log('  · ' + e.name + ' → ' + où.join(' · ')); }
}
console.log('  → ' + res + ' cas');

console.log('\n=== MYSTÈRES PROTÉGÉS (data.protege) — ne doivent jamais être définis ===');
for (const e of ents) if (dataDe(e).protege === true || dataDe(e).protege === 'true') {
  const où = narr.filter(c => nomme(e.name, c.tout)).map(c => c.cle);
  console.log('  • ' + e.name + (où.length ? '  (nommé en ' + où.slice(0, 6).join(', ') + ')' : ''));
}

if (process.argv.includes('--proposer')) {
  console.log('\n=== PROPOSITION : le substrat, ce qui est défini et jamais dit ===');
  const jamais = [], dits = [];
  for (const e of ents) {
    (narr.some(c => nomme(e.name, c.tout)) ? dits : jamais).push(e);
  }
  console.log('  entités nommées quelque part dans les livres : ' + dits.length);
  console.log('  entités JAMAIS nommées (candidates `auteur`)  : ' + jamais.length);
  const parType = {};
  for (const e of jamais) parType[e.type] = (parType[e.type] || 0) + 1;
  for (const [t, n] of Object.entries(parType).sort((a, b) => b[1] - a[1])) {
    console.log('    ' + t.padEnd(20) + String(n).padStart(5));
  }
}
