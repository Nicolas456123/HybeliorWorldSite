#!/usr/bin/env node
'use strict';
// Normalise la typographie française d'un chapitre de livre (Chroniques, romans) :
//   • apostrophes courbes (' → ’)
//   • guillemets français avec espace + insécable : «␣⍽texte⍽␣»
//   • insécable + espace avant ? ! ; : (convention du corpus : ⍽␣ devant le signe)
// Le frontmatter YAML (entre les deux premiers ---) n'est pas touché.
// Usage : node scripts/normalize-typo-livres.js <fichier.md> [...]

const fs = require('fs');

const NBSP = ' ';

function normalizeBody(text) {
  return text
    .replace(/'/g, '’')
    // espaces déjà normalisés → on repart d'espaces simples pour être idempotent
    .replace(/«[   ]*/g, '« ')
    .replace(/[   ]*»/g, ' »')
    .replace(/[   ]+([?!;:])/g, ' $1')
    // puis application de la convention du corpus
    .replace(/« /g, '« ' + NBSP)
    .replace(/ »/g, NBSP + ' »')
    .replace(/ ([?!;:])/g, NBSP + ' $1');
}

for (const file of process.argv.slice(2)) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
  const out = m ? m[1] + normalizeBody(m[2]) : normalizeBody(raw);
  fs.writeFileSync(file, out);
  console.log('normalisé :', file);
}
