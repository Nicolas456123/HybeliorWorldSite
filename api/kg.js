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

let BASE = {};
try { BASE = require('../data/kg-base.json'); } catch { BASE = {}; }

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
    const graph = kg.mergeGraph(BASE, overlay);

    if (req.method === 'GET') {
      return res.status(200).json(kg.readAction(graph, req.query.action || 'list', req.query));
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
