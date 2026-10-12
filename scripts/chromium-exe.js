/**
 * Chemin du Chromium à donner à playwright-core, sans dépendre d'un poste :
 *  1. variable d'environnement HYB_CHROMIUM (ou PLAYWRIGHT_CHROMIUM_EXECUTABLE) ;
 *  2. environnement d'origine : /opt/pw-browsers/chromium-* /chrome-linux/chrome ;
 *  3. sinon undefined : playwright-core prend le Chromium qu'il a installé
 *     (`npx playwright-core install chromium`, dossier ms-playwright).
 */
'use strict';
const fs = require('fs');

module.exports = function chromiumExe() {
  const env = process.env.HYB_CHROMIUM || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  if (env && fs.existsSync(env)) return env;
  try {
    const p = fs.readdirSync('/opt/pw-browsers').filter((d) => /^chromium[-_]?\d/.test(d))
      .map((d) => `/opt/pw-browsers/${d}/chrome-linux/chrome`).find((x) => fs.existsSync(x));
    if (p) return p;
  } catch { /* pas d'environnement d'origine */ }
  return undefined;
};
