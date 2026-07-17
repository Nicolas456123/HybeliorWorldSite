-- db/schema.sql — Schéma de la SURCOUCHE (overlay) Turso du graphe.
--
-- Modèle base ⊕ overlay :
--   • data/kg-base.json (committé) = TOUTES les données de base. Servi
--     directement ; ne touche jamais Turso.
--   • Turso = overlay : uniquement ce qui est créé / édité / supprimé APRÈS
--     le seed. Magasin générique id→enregistrement + tombstones.
--
-- DDL appliqué automatiquement par lib/kg-overlay-turso.js au premier appel.

-- Un enregistrement modifié ou créé après coup, sérialisé en JSON.
-- kind ∈ { entities, facts, relations, aliases, readings } ; id = id stable.
CREATE TABLE IF NOT EXISTS kg_overlay (
  kind       TEXT NOT NULL,
  id         TEXT NOT NULL,
  json       TEXT NOT NULL,
  updated_at TEXT,
  PRIMARY KEY (kind, id)
);

-- Tombstones : un enregistrement (de la base ou de l'overlay) marqué supprimé.
CREATE TABLE IF NOT EXISTS kg_deletes (
  kind       TEXT NOT NULL,
  id         TEXT NOT NULL,
  deleted_at TEXT,
  PRIMARY KEY (kind, id)
);
