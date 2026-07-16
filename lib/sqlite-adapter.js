'use strict';
/*
 * lib/sqlite-adapter.js — Adaptateur de stockage node:sqlite pour le graphe.
 *
 * Fournit `exec(sql, args) -> { rows }` attendu par lib/kg-core.js, adossé au
 * module natif node:sqlite. C'est le miroir de développement (et de seed) de
 * Turso : le MÊME SQL y tourne. Utilisé par server.js et scripts/migrate-kg.js.
 */

const { DatabaseSync } = require('node:sqlite');

function createSqliteExec(target) {
  const db = typeof target === 'string' ? new DatabaseSync(target) : target;
  try { db.exec('PRAGMA journal_mode = WAL'); } catch { /* :memory: ou déjà posé */ }

  const exec = async (sql, args = []) => {
    if (!args || args.length === 0) {
      const head = sql.trim().slice(0, 6).toUpperCase();
      if (head === 'SELECT' || /RETURNING/i.test(sql)) return { rows: db.prepare(sql).all() };
      db.exec(sql);
      return { rows: [] };
    }
    return { rows: db.prepare(sql).all(...args) };
  };

  return { exec, db };
}

module.exports = { createSqliteExec };
