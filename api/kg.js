'use strict';
/*
 * api/kg.js — Point d'entrée serverless (Vercel) du graphe de connaissances.
 *
 * La logique vit dans lib/kg-core.js (backend-agnostique). Ici on ne fait que :
 *   1. fournir l'adaptateur de stockage Turso (exec SQL via HTTP /v2/pipeline) ;
 *   2. router les requêtes GET (lectures / projections) et POST (écritures) ;
 *   3. protéger l'accès par EDITOR_PASSWORD — le site est privé.
 *
 * Le MÊME cœur est câblé en développement dans server.js sur node:sqlite.
 */

const kg = require('../lib/kg-core.js');
const { createTursoExec } = require('../lib/turso-adapter.js');

const TURSO_URL = process.env.TURSO_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

let _exec = null;
function getExec() {
  if (!_exec) _exec = createTursoExec(TURSO_URL, TURSO_TOKEN);
  return _exec;
}

let schemaReady = false;
async function ensureSchema(exec) {
  if (schemaReady) return;
  await kg.initSchema(exec);
  schemaReady = true;
}

// ── Handler ─────────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Editor-Password');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!TURSO_URL || !TURSO_TOKEN) {
    return res.status(500).json({ error: 'Turso non configuré (TURSO_URL / TURSO_AUTH_TOKEN).' });
  }

  const exec = getExec();
  const PASSWORD = process.env.EDITOR_PASSWORD;

  try {
    await ensureSchema(exec);

    // ── Lectures (GET) — le site est privé : mot de passe requis (header) ──
    if (req.method === 'GET') {
      const provided = req.headers['x-editor-password'];
      if (!PASSWORD || provided !== PASSWORD) {
        return res.status(403).json({ error: 'Mot de passe requis (header X-Editor-Password)' });
      }
      const out = await kg.readAction(exec, req.query.action || 'list', req.query);
      return res.status(200).json(out);
    }

    // ── Écritures (POST) — mot de passe dans le corps ─────────────────────
    if (req.method === 'POST') {
      const { password, action, data } = req.body || {};
      if (!PASSWORD || password !== PASSWORD) {
        return res.status(403).json({ error: 'Mot de passe incorrect' });
      }
      const out = await kg.writeAction(exec, action, data);
      return res.status(200).json(out);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const code = err && err.code ? err.code : 'error';
    const status = code === 'validation' || code === 'ref' || code === 'referenced' ? 400
      : code === 'not-found' ? 404 : 500;
    return res.status(status).json({ error: err.message, code });
  }
};
