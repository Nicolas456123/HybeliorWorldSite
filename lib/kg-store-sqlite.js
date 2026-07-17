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
    // bm25 pondéré : le NOM prime largement, puis alias, résumé, et le corps
    // en dernier (sinon une mention dans une longue fiche bat le porteur du nom).
    let sql = `SELECT e.id, e.type, e.name, e.summary, bm25(entities_fts, 0, 20.0, 8.0, 3.0, 0.4) AS rank
               FROM entities_fts JOIN entities e ON e.id = entities_fts.id
               WHERE entities_fts MATCH ?`;
    const args = [match];
    if (opts.type) { sql += ' AND e.type = ?'; args.push(opts.type); }
    sql += ' ORDER BY rank LIMIT ?'; args.push(Math.max(limit * 4, 40));
    const brut = db.prepare(sql).all(...args);

    // Complément par NOM/ALIAS (LIKE) : bm25 pénalise les gros corps (une nation
    // à fiche de 80 Ko peut sortir du top) — le porteur du nom doit toujours être là.
    let likeSql = `SELECT DISTINCT e.id, e.type, e.name, e.summary, 0 AS rank FROM entities e
                   LEFT JOIN aliases a ON a.entity_id = e.id
                   WHERE (e.name LIKE ? OR a.value LIKE ?)`;
    const likeArgs = ['%' + term + '%', '%' + term + '%'];
    if (opts.type) { likeSql += ' AND e.type = ?'; likeArgs.push(opts.type); }
    likeSql += ' LIMIT 30';
    const parNom = db.prepare(likeSql).all(...likeArgs);

    // Fusion + re-classement déterministe : exact > préfixe-de-mot > préfixe >
    // contient dans le nom ; bm25 départage le reste.
    const nrm = (x) => String(x).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘]/g, "'").toLowerCase().trim();
    const q = nrm(term);
    const vus = new Map();
    for (const r of [...parNom, ...brut]) if (!vus.has(r.id)) vus.set(r.id, r);
    const rows = [...vus.values()].map((r) => {
      const n = nrm(r.name);
      const boost = n === q ? 4000 : n.startsWith(q + ' ') ? 3000 : n.startsWith(q) ? 2200 : n.includes(q) ? 1000 : 0;
      return { id: r.id, type: r.type, name: r.name, summary: r.summary, score: boost - (r.rank || 0), nlen: n.length };
    });
    rows.sort((a, b) => b.score - a.score || a.nlen - b.nlen || String(a.name).localeCompare(String(b.name), 'fr'));
    return rows.slice(0, limit).map(({ id, type, name, summary }) => ({ id, type, name, summary }));
  } finally { db.close(); }
}

module.exports = { available, loadGraph, searchFTS, DB_PATH };
