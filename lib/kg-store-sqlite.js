'use strict';
/*
 * lib/kg-store-sqlite.js — Accès en LECTURE à la vraie base SQLite (data/hybelior.db).
 *
 * Deux usages :
 *   • loadGraph()  → hydrate le graphe { entities, facts, relations, aliases,
 *     readings } (même forme que data/kg-base.json) pour les projections en
 *     mémoire de lib/kg-core.js (arbre, dirigeants, chronologie, cohérence).
 *   • searchFTS()  → recherche plein-texte FTS5 indexée, SANS charger le graphe.
 *
 * Moteur node:sqlite intégré (zéro dépendance). `available()` dit si la DB et le
 * moteur sont présents ; sinon l'appelant se rabat sur data/kg-base.json.
 */

const fs = require('fs');
const path = require('path');

let DatabaseSync = null;
try { ({ DatabaseSync } = require('node:sqlite')); } catch { /* node < 22.5 : indispo */ }

const DB_PATH = path.join(__dirname, '..', 'data', 'hybelior.db');

function available() { return !!DatabaseSync && fs.existsSync(DB_PATH); }

function open() { return new DatabaseSync(DB_PATH, { readOnly: true }); }

function parseData(rows) {
  for (const r of rows) if (r.data != null) { try { r.data = JSON.parse(r.data); } catch { /* garde la chaîne */ } }
  return rows;
}

// Hydrate le graphe complet depuis SQLite (forme identique à kg-base.json).
function loadGraph() {
  const db = open();
  try {
    return {
      entities: parseData(db.prepare('SELECT * FROM entities').all()),
      facts: parseData(db.prepare('SELECT * FROM facts').all()),
      relations: parseData(db.prepare('SELECT * FROM relations').all()),
      aliases: db.prepare('SELECT * FROM aliases').all(),
      readings: db.prepare('SELECT * FROM readings').all(),
    };
  } finally { db.close(); }
}

// Recherche plein-texte (nom, alias, résumé, body), classée par pertinence bm25.
function searchFTS(term, opts) {
  opts = opts || {};
  const limit = opts.limit || 10;
  const db = open();
  try {
    const tokens = String(term).replace(/["]/g, ' ').trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];
    const match = tokens.map((t) => `"${t}"*`).join(' OR ');
    let sql = `SELECT e.id, e.type, e.name, e.summary, bm25(entities_fts) AS rank
               FROM entities_fts JOIN entities e ON e.id = entities_fts.id
               WHERE entities_fts MATCH ?`;
    const args = [match];
    if (opts.type) { sql += ' AND e.type = ?'; args.push(opts.type); }
    sql += ' ORDER BY rank LIMIT ?'; args.push(limit);
    return db.prepare(sql).all(...args).map((r) => ({ id: r.id, type: r.type, name: r.name, summary: r.summary }));
  } finally { db.close(); }
}

module.exports = { available, loadGraph, searchFTS, DB_PATH };
