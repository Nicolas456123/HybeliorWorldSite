'use strict';
/*
 * lib/kg-overlay-turso.js — Magasin de SURCOUCHE (overlay) sur Turso.
 *
 * Turso ne stocke QUE ce qui est créé / édité / supprimé après le seed : un
 * magasin générique id→enregistrement (kg_overlay) + des tombstones de
 * suppression (kg_deletes). Les données de base vivent dans data/kg-base.json
 * (committé) et ne touchent jamais Turso.
 *
 *   load()          -> { entities, facts, relations, aliases, readings, deletes }
 *   apply(ops, when) -> persiste les ops { store, op:'put'|'delete', record?, id? }
 */

const { createTursoExec } = require('./turso-adapter.js');

const DDL = [
  `CREATE TABLE IF NOT EXISTS kg_overlay (
     kind TEXT NOT NULL, id TEXT NOT NULL, json TEXT NOT NULL, updated_at TEXT,
     PRIMARY KEY (kind, id))`,
  `CREATE TABLE IF NOT EXISTS kg_deletes (
     kind TEXT NOT NULL, id TEXT NOT NULL, deleted_at TEXT,
     PRIMARY KEY (kind, id))`,
];

function createTursoOverlay(url, token) {
  const exec = createTursoExec(url, token);
  let ready = false;
  async function ensure() { if (ready) return; for (const sql of DDL) await exec(sql, []); ready = true; }

  return {
    async load() {
      await ensure();
      const overlay = { entities: [], facts: [], relations: [], aliases: [], readings: [], deletes: {} };
      const rows = (await exec(`SELECT kind, id, json FROM kg_overlay`, [])).rows;
      for (const r of rows) {
        try { (overlay[r.kind] = overlay[r.kind] || []).push(JSON.parse(r.json)); } catch { /* ligne corrompue ignorée */ }
      }
      const dels = (await exec(`SELECT kind, id FROM kg_deletes`, [])).rows;
      for (const d of dels) (overlay.deletes[d.kind] = overlay.deletes[d.kind] || []).push(d.id);
      return overlay;
    },

    async apply(ops, when) {
      await ensure();
      const ts = when || new Date().toISOString();
      for (const op of ops) {
        if (op.op === 'put') {
          await exec(
            `INSERT INTO kg_overlay (kind, id, json, updated_at) VALUES (?,?,?,?)
             ON CONFLICT(kind, id) DO UPDATE SET json=excluded.json, updated_at=excluded.updated_at`,
            [op.store, op.record.id, JSON.stringify(op.record), ts]);
          await exec(`DELETE FROM kg_deletes WHERE kind=? AND id=?`, [op.store, op.record.id]);
        } else if (op.op === 'delete') {
          await exec(
            `INSERT INTO kg_deletes (kind, id, deleted_at) VALUES (?,?,?)
             ON CONFLICT(kind, id) DO NOTHING`,
            [op.store, op.id, ts]);
          await exec(`DELETE FROM kg_overlay WHERE kind=? AND id=?`, [op.store, op.id]);
        }
      }
    },
  };
}

module.exports = { createTursoOverlay };
