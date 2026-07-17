'use strict';
/*
 * api/kg.js — Point d'entrée serverless (Vercel) du graphe de connaissances.
 *
 * Modèle base ⊕ overlay :
 *   • data/kg-base.json (committé) = toutes les données de base, servies
 *     directement — les LECTURES fonctionnent même sans Turso.
 *   • Turso (overlay) = uniquement ce qui est créé/édité/supprimé ensuite ;
 *     requis seulement pour les ÉCRITURES.
 *
 * Aucun mot de passe : accès direct (outil personnel privé).
 */

const kg = require('../lib/kg-core.js');
const { createTursoOverlay } = require('../lib/kg-overlay-turso.js');
const store = require('../lib/kg-store-sqlite.js');

// Source de vérité : la vraie base SQLite (data/hybelior.db) si présente, sinon
// repli sur data/kg-base.json (ex. déploiement où le .db n'est pas embarqué).
// Le graphe de base est mis en cache module (lecture seule au runtime).
const USE_DB = store.available();
let _base = null;
function baseGraph() {
  if (!_base) {
    if (USE_DB) _base = store.loadGraph();
    else { try { _base = require('../data/kg-base.json'); } catch { _base = {}; } }
  }
  return _base;
}

let _overlay = null;
function haveTurso() { return !!(process.env.TURSO_URL && process.env.TURSO_AUTH_TOKEN); }
function overlayStore() {
  if (!_overlay) _overlay = createTursoOverlay(process.env.TURSO_URL, process.env.TURSO_AUTH_TOKEN);
  return _overlay;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const overlay = haveTurso() ? await overlayStore().load() : {};
    const graph = kg.mergeGraph(baseGraph(), overlay);

    if (req.method === 'GET') {
      const action = req.query.action || 'list';
      // Recherche : FTS5 (nom+alias+résumé+body) si la vraie base est là,
      // sinon repli sur la recherche en mémoire (nom/alias/résumé) via `list`.
      if (action === 'search') {
        const q = req.query.q || req.query.search || '';
        const limit = +req.query.limit || 10;
        if (USE_DB) return res.status(200).json({ query: q, source: 'sqlite-fts', results: store.searchFTS(q, { type: req.query.type, limit }) });
        const ents = (kg.readAction(graph, 'list', { search: q, type: req.query.type }).entities || []).slice(0, limit);
        return res.status(200).json({ query: q, source: 'memory', results: ents });
      }
      return res.status(200).json(kg.readAction(graph, action, req.query));
    }

    if (req.method === 'POST') {
      // Petit mot de passe sur les ÉCRITURES seulement (les lectures sont ouvertes).
      // Actif si EDITOR_PASSWORD est défini ; sinon écritures libres.
      const { password, action, data } = req.body || {};
      if (process.env.EDITOR_PASSWORD && password !== process.env.EDITOR_PASSWORD) {
        return res.status(403).json({ error: 'Mot de passe incorrect', code: 'auth' });
      }
      if (!haveTurso()) {
        return res.status(503).json({ error: 'Turso non configuré — écriture impossible (lecture seule).', code: 'read-only' });
      }
      const { ops, result } = kg.prepareWrite(graph, action, data, new Date().toISOString());
      await overlayStore().apply(ops, new Date().toISOString());
      return res.status(200).json(result);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const code = err && err.code ? err.code : 'error';
    const status = (code === 'validation' || code === 'ref' || code === 'referenced') ? 400
      : code === 'not-found' ? 404 : 500;
    return res.status(status).json({ error: err.message, code });
  }
};
