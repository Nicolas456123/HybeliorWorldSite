// Configuration ESLint (flat config, ESLint v9+).
//
// Le code est du JS vanilla sans bundler, avec de nombreux globals partagés
// entre fichiers (marked, DOMPurify, OpenSeadragon, NavConfig, LoreReader…).
// On désactive donc `no-undef`, et on garde un noyau de règles « attrape-bug »
// en avertissement (warn) plutôt qu'en erreur : le lint reste informatif et ne
// bloque pas le CI tant que la base existante n'a pas été nettoyée. Resserrer
// progressivement (warn → error) au fil du temps.

const browserGlobals = {
  window: 'readonly', document: 'readonly', navigator: 'readonly',
  location: 'readonly', history: 'readonly', localStorage: 'readonly',
  sessionStorage: 'readonly', fetch: 'readonly', console: 'readonly',
  setTimeout: 'readonly', clearTimeout: 'readonly', setInterval: 'readonly',
  clearInterval: 'readonly', requestAnimationFrame: 'readonly',
  cancelAnimationFrame: 'readonly', URL: 'readonly', URLSearchParams: 'readonly',
  CustomEvent: 'readonly', Event: 'readonly', Image: 'readonly',
  caches: 'readonly', self: 'readonly', alert: 'readonly', prompt: 'readonly',
  confirm: 'readonly', getComputedStyle: 'readonly', matchMedia: 'readonly',
};

const nodeGlobals = {
  require: 'readonly', module: 'writable', exports: 'writable',
  process: 'readonly', __dirname: 'readonly', __filename: 'readonly',
  Buffer: 'readonly', console: 'readonly', setTimeout: 'readonly',
  fetch: 'readonly',
};

const bugRules = {
  'no-undef': 'off',
  'no-unused-vars': 'warn',
  'no-empty': ['warn', { allowEmptyCatch: true }],
  'no-dupe-keys': 'warn',
  'no-dupe-args': 'warn',
  'no-dupe-else-if': 'warn',
  'no-unreachable': 'warn',
  'no-func-assign': 'warn',
  'no-self-assign': 'warn',
  'no-self-compare': 'warn',
  'use-isnan': 'warn',
  'valid-typeof': 'warn',
  'no-constant-condition': ['warn', { checkLoops: false }],
};

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'openseadragon-bin-5.0.0/**',
      'Docs/**',
      'Data/**',
      '**/*.min.js',
    ],
  },
  {
    files: ['js/**/*.js', 'server.js', 'sw.js', 'trace-coastlines.js', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...browserGlobals, ...nodeGlobals },
    },
    rules: bugRules,
  },
  {
    files: ['api/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: nodeGlobals,
    },
    rules: bugRules,
  },
];
