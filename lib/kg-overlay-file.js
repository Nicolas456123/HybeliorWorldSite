'use strict';
/*
 * lib/kg-overlay-file.js — Magasin de surcouche en développement : un simple
 * fichier JSON local (miroir de l'overlay Turso). Même contrat que
 * lib/kg-overlay-turso.js : load() / apply(ops, when).
 */

const fs = require('fs');

function createFileOverlay(filePath) {
  function read() {
    try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
    catch { return { records: {}, deletes: {} }; }
  }
  function write(s) { fs.writeFileSync(filePath, JSON.stringify(s, null, 2)); }

  return {
    async load() {
      const s = read();
      const overlay = { entities: [], facts: [], relations: [], aliases: [], readings: [], deletes: s.deletes || {} };
      for (const kind of Object.keys(s.records || {})) overlay[kind] = Object.values(s.records[kind]);
      return overlay;
    },

    async apply(ops, when) {
      const s = read();
      s.records = s.records || {}; s.deletes = s.deletes || {};
      for (const op of ops) {
        s.records[op.store] = s.records[op.store] || {};
        if (op.op === 'put') {
          s.records[op.store][op.record.id] = op.record;
          if (s.deletes[op.store]) s.deletes[op.store] = s.deletes[op.store].filter(x => x !== op.record.id);
        } else if (op.op === 'delete') {
          delete s.records[op.store][op.id];
          s.deletes[op.store] = s.deletes[op.store] || [];
          if (!s.deletes[op.store].includes(op.id)) s.deletes[op.store].push(op.id);
        }
      }
      s.updated_at = when || new Date().toISOString();
      write(s);
    },
  };
}

module.exports = { createFileOverlay };
