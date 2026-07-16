-- db/schema.sql — Schéma du graphe de connaissances canonique d Hybélior.
--
-- ⚠ SOURCE DE VÉRITÉ : lib/kg-core.js (constante SCHEMA_STATEMENTS).
-- Ce fichier est un instantané lisible, régénéré par : npm run kg:schema
-- Le même DDL est appliqué en production (Turso/libSQL) et en dev (node:sqlite).

CREATE TABLE IF NOT EXISTS kg_entities (
  id         TEXT PRIMARY KEY,
  type       TEXT NOT NULL,
  name       TEXT NOT NULL,
  slug       TEXT,
  summary    TEXT,
  body       TEXT,
  data       TEXT,
  status     TEXT NOT NULL DEFAULT 'canon',
  disclosure TEXT NOT NULL DEFAULT 'interne',
  created_at TEXT,
  updated_at TEXT
  );

CREATE INDEX IF NOT EXISTS idx_kg_entities_type ON kg_entities(type);

CREATE INDEX IF NOT EXISTS idx_kg_entities_name ON kg_entities(name);

CREATE TABLE IF NOT EXISTS kg_aliases (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_id    TEXT NOT NULL,
  value        TEXT NOT NULL,
  alias_status TEXT NOT NULL DEFAULT 'visible',
  era_id       TEXT,
  from_year    INTEGER,
  to_year      INTEGER,
  meaning      TEXT,
  UNIQUE(entity_id, value, era_id)
  );

CREATE INDEX IF NOT EXISTS idx_kg_aliases_entity ON kg_aliases(entity_id);

CREATE INDEX IF NOT EXISTS idx_kg_aliases_value ON kg_aliases(value);

CREATE TABLE IF NOT EXISTS kg_facts (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  fact_type       TEXT NOT NULL,
  subject_id      TEXT NOT NULL,
  object_id       TEXT,
  start_year      INTEGER,
  start_precision TEXT DEFAULT 'annee',
  start_circa     INTEGER DEFAULT 0,
  end_year        INTEGER,
  end_precision   TEXT,
  end_circa       INTEGER DEFAULT 0,
  era_id          TEXT,
  seq             INTEGER DEFAULT 0,
  label           TEXT,
  detail          TEXT,
  data            TEXT,
  source_id       TEXT,
  status          TEXT NOT NULL DEFAULT 'canon',
  disclosure      TEXT NOT NULL DEFAULT 'interne',
  created_at      TEXT,
  updated_at      TEXT
  );

CREATE INDEX IF NOT EXISTS idx_kg_facts_subject ON kg_facts(subject_id);

CREATE INDEX IF NOT EXISTS idx_kg_facts_object ON kg_facts(object_id);

CREATE INDEX IF NOT EXISTS idx_kg_facts_year ON kg_facts(start_year);

CREATE INDEX IF NOT EXISTS idx_kg_facts_type ON kg_facts(fact_type);

CREATE TABLE IF NOT EXISTS kg_relations (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  rel_type   TEXT NOT NULL,
  from_id    TEXT NOT NULL,
  to_id      TEXT NOT NULL,
  start_year INTEGER,
  end_year   INTEGER,
  label      TEXT,
  data       TEXT,
  source_id  TEXT,
  status     TEXT NOT NULL DEFAULT 'canon',
  UNIQUE(rel_type, from_id, to_id, start_year)
  );

CREATE INDEX IF NOT EXISTS idx_kg_relations_from ON kg_relations(from_id);

CREATE INDEX IF NOT EXISTS idx_kg_relations_to ON kg_relations(to_id);

CREATE TABLE IF NOT EXISTS kg_readings (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id    TEXT NOT NULL,
  text           TEXT NOT NULL,
  source_id      TEXT,
  reading_status TEXT DEFAULT 'lecture-sourcee',
  ordinal        INTEGER DEFAULT 0
  );

CREATE INDEX IF NOT EXISTS idx_kg_readings_q ON kg_readings(question_id);

CREATE TABLE IF NOT EXISTS kg_audit (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  ref_id     TEXT,
  kind       TEXT,
  op         TEXT,
  before     TEXT,
  after      TEXT,
  changed_at TEXT
  );
