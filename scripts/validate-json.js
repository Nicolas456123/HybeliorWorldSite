#!/usr/bin/env node
// Valide que chaque fichier JSON passé en argument parse correctement.
// Usage : git -c core.quotepath=false ls-files -z '*.json' | xargs -0 node scripts/validate-json.js
const fs = require('fs');

let bad = 0;
for (const f of process.argv.slice(2)) {
  try {
    JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch (e) {
    console.error(`Invalid JSON: ${f}\n  ${e.message}`);
    bad++;
  }
}

if (bad > 0) {
  console.error(`\n${bad} fichier(s) JSON invalide(s).`);
  process.exit(1);
}
console.log(`JSON OK (${process.argv.length - 2} fichiers).`);
