#!/usr/bin/env node
'use strict';
/*
 * scripts/build-sqlite.js — Construit data/hybelior.db (VRAIE base SQLite,
 * moteur node:sqlite intégré — zéro dépendance, fichier interne).
 *
 * Schéma relationnel (une table par type d'enregistrement) + recherche
 * plein-texte FTS5 sur les entités (nom, alias, résumé, body). Alimenté depuis
 * data/kg-base.json (état courant du graphe). C'est la brique « vraie DB » :
 * ensuite le site/CLI liront et écriront ici plutôt que dans le JSON.
 *
 * Usage :  node scripts/build-sqlite.js
 */

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const ROOT = path.join(__dirname, '..');
const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'kg-base.json'), 'utf8'));
const DB_PATH = path.join(ROOT, 'data', 'hybelior.db');

fs.rmSync(DB_PATH, { force: true });
const db = new DatabaseSync(DB_PATH);

db.exec(`
PRAGMA journal_mode = WAL;
CREATE TABLE entities (
  id TEXT PRIMARY KEY, type TEXT NOT NULL, name TEXT NOT NULL, slug TEXT,
  summary TEXT, body TEXT, data TEXT, status TEXT, disclosure TEXT,
  created_at TEXT, updated_at TEXT
);
CREATE INDEX idx_entities_type ON entities(type);
CREATE INDEX idx_entities_name ON entities(name);

CREATE TABLE facts (
  id TEXT PRIMARY KEY, fact_type TEXT, subject_id TEXT, object_id TEXT,
  start_year INTEGER, start_precision TEXT, start_circa INTEGER,
  end_year INTEGER, end_precision TEXT, end_circa INTEGER,
  era_id TEXT, seq INTEGER, label TEXT, detail TEXT, data TEXT,
  source_id TEXT, status TEXT, disclosure TEXT, created_at TEXT, updated_at TEXT
);
CREATE INDEX idx_facts_subject ON facts(subject_id);
CREATE INDEX idx_facts_object ON facts(object_id);
CREATE INDEX idx_facts_type ON facts(fact_type);

CREATE TABLE relations (
  id TEXT PRIMARY KEY, rel_type TEXT, from_id TEXT, to_id TEXT,
  start_year INTEGER, end_year INTEGER, label TEXT, data TEXT,
  source_id TEXT, status TEXT
);
CREATE INDEX idx_rel_from ON relations(from_id);
CREATE INDEX idx_rel_to ON relations(to_id);
CREATE INDEX idx_rel_type ON relations(rel_type);

CREATE TABLE aliases (
  id TEXT PRIMARY KEY, entity_id TEXT, value TEXT, alias_status TEXT,
  era_id TEXT, from_year INTEGER, to_year INTEGER, meaning TEXT
);
CREATE INDEX idx_alias_entity ON aliases(entity_id);
CREATE INDEX idx_alias_value ON aliases(value);

CREATE TABLE readings (
  id TEXT PRIMARY KEY, question_id TEXT, text TEXT, source_id TEXT,
  reading_status TEXT, ordinal INTEGER
);
CREATE INDEX idx_readings_question ON readings(question_id);

-- Recherche plein-texte sur les entités (nom + alias + résumé + body).
CREATE VIRTUAL TABLE entities_fts USING fts5(id UNINDEXED, name, aliases, summary, body);
`);

const J = (v) => (v == null ? null : JSON.stringify(v));
const cols = (obj, keys) => keys.map((k) => {
  const v = obj[k];
  if (v == null) return null;
  if (typeof v === 'object') return JSON.stringify(v);
  if (typeof v === 'boolean') return v ? 1 : 0;
  return v;
});

function bulk(table, keys, rows) {
  if (!rows || !rows.length) return 0;
  const stmt = db.prepare(`INSERT INTO ${table} (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`);
  db.exec('BEGIN');
  for (const r of rows) stmt.run(...cols(r, keys));
  db.exec('COMMIT');
  return rows.length;
}

const nE = bulk('entities', ['id', 'type', 'name', 'slug', 'summary', 'body', 'data', 'status', 'disclosure', 'created_at', 'updated_at'], base.entities);
const nF = bulk('facts', ['id', 'fact_type', 'subject_id', 'object_id', 'start_year', 'start_precision', 'start_circa', 'end_year', 'end_precision', 'end_circa', 'era_id', 'seq', 'label', 'detail', 'data', 'source_id', 'status', 'disclosure', 'created_at', 'updated_at'], base.facts);
const nR = bulk('relations', ['id', 'rel_type', 'from_id', 'to_id', 'start_year', 'end_year', 'label', 'data', 'source_id', 'status'], base.relations);
const nA = bulk('aliases', ['id', 'entity_id', 'value', 'alias_status', 'era_id', 'from_year', 'to_year', 'meaning'], base.aliases);
const nRd = bulk('readings', ['id', 'question_id', 'text', 'source_id', 'reading_status', 'ordinal'], base.readings);

// FTS : alias concaténés par entité.
const aliByEnt = {};
for (const a of base.aliases || []) (aliByEnt[a.entity_id] = aliByEnt[a.entity_id] || []).push(a.value);
const fts = db.prepare('INSERT INTO entities_fts (id, name, aliases, summary, body) VALUES (?,?,?,?,?)');
db.exec('BEGIN');
for (const e of base.entities) fts.run(e.id, e.name || '', (aliByEnt[e.id] || []).join(' '), e.summary || '', e.body || '');
db.exec('COMMIT');

db.exec('PRAGMA wal_checkpoint(TRUNCATE); VACUUM;');
db.close();

const mb = (fs.statSync(DB_PATH).size / 1048576).toFixed(2);
console.log(`✔ data/hybelior.db (${mb} Mo)`);
console.log(`  entities:${nE} facts:${nF} relations:${nR} aliases:${nA} readings:${nRd} + FTS`);
void J;
