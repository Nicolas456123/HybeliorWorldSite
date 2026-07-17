'use strict';
/*
 * lib/kg-core.js — Le cœur du graphe de connaissances canonique d'Hybélior.
 *
 * PRINCIPE : le site est la source de vérité unique. Chaque information
 * (personne, empire, ville, événement, concept, religion, espèce, objet…)
 * n'existe qu'à un seul endroit — une ligne de ce graphe — et est PROJETÉE
 * partout ailleurs (fiche, chronologie, arbre, liste de dirigeants…).
 *
 * Ce module est BACKEND-AGNOSTIQUE. Il reçoit une fonction d'exécution :
 *
 *     exec(sql, args) -> Promise<{ rows: Object[], lastInsertRowid?: number }>
 *
 * où `args` est un tableau de valeurs JS simples (string | number | null).
 * Le MÊME SQL tourne en production (Turso / libSQL via HTTP) et en
 * développement (node:sqlite). Toute la logique — validation, cohérence,
 * projections — est écrite ici UNE seule fois. Les adaptateurs ne font que
 * du stockage.
 *
 * Aucune dépendance externe. CommonJS (require) pour être chargeable aussi
 * bien par les fonctions serverless Vercel que par server.js.
 */

// ─────────────────────────────────────────────────────────────────────────
// 1. CATALOGUES — l'ontologie fermée du monde
// ─────────────────────────────────────────────────────────────────────────
// Fermer les catalogues est ce qui empêche une faute de frappe de créer un
// type d'entité ou une relation « fantôme ». On étend le monde en étendant
// ces listes, jamais à la volée.

const ENTITY_TYPES = [
  'personne',        // tout individu nommé
  'lignee',          // lignée / dynastie
  'lieu',            // entité géographique (échelle dans data)
  'entite-politique',// empire, royaume, cité-État (distinct du sol)
  'evenement',       // fait daté d'importance (peut aussi être un kg_fact)
  'concept',         // notion cosmologique ou abstraite
  'religion',        // culte, ordre, foi
  'espece',          // peuple, race, ordre d'êtres
  'objet',           // artefact nommé
  'terme',           // entrée de lexique / glossaire
  'source',          // œuvre canonique — fait AUTORITÉ (voir rang)
  'question',        // mystère protégé — première classe (voir readings)
  'oeuvre',          // roman / récit comme objet éditorial
  'ere',             // ère chronologique (borne d'événements)
];

// Échelles pour les lieux, du plus grand au plus petit.
const LIEU_SCALES = ['monde', 'continent', 'region', 'nation', 'cite', 'ville', 'bourg', 'ruine', 'lieu-dit'];

// Rang canonique d'une source (hiérarchie d'autorité).
const SOURCE_RANKS = ['texte-publie', 'bible', 'chronique-interne', 'note-travail'];

const FACT_TYPES = [
  'naissance', 'mort',
  'regne', 'succession', 'couronnement', 'abdication',
  'fondation', 'chute',
  'frontiere',           // tracé daté (le polygone vit dans country_borders)
  'bataille', 'traite',
  'apparition', 'disparition',
  'evenement', 'autre',
];

// Relations typées et dirigées. Le catalogue est fermé.
const REL_TYPES = [
  // filiation
  'parent-de', 'conjoint-de', 'fratrie-de', 'descend-de',
  // politique
  'gouverne', 'capitale-de', 'vassal-de', 'allie-de', 'en-guerre-avec', 'succede-a',
  // spatial
  'situe-dans', 'frontiere-avec',
  // cosmologique / religieux
  'incarne', 'pratique', 'venere', 'fonde', 'schisme-de',
  // appartenance / textuel
  'membre-de', 'apparait-dans', 'source-de', 'mentionne', 'lie-a',
  // désambiguïsation
  'a-ne-pas-confondre-avec',
];

// Étiquette inverse d'une relation, pour l'affichage du côté récepteur.
// (On ne stocke JAMAIS l'arête inverse — elle est calculée à la projection.)
const REL_INVERSE = {
  'parent-de': 'enfant de',
  'conjoint-de': 'conjoint de',
  'fratrie-de': 'de la fratrie de',
  'descend-de': 'ancêtre de',
  'gouverne': 'gouverné par',
  'capitale-de': 'a pour capitale',
  'vassal-de': 'suzerain de',
  'allie-de': 'allié de',
  'en-guerre-avec': 'en guerre avec',
  'succede-a': 'précède',
  'situe-dans': 'contient',
  'frontiere-avec': 'frontalier de',
  'incarne': 'incarné par',
  'pratique': 'pratiqué par',
  'venere': 'vénéré par',
  'fonde': 'fondé par',
  'schisme-de': 'a pour schisme',
  'membre-de': 'compte pour membre',
  'apparait-dans': 'met en scène',
  'source-de': 'attesté par',
  'mentionne': 'mentionné par',
  'lie-a': 'lié à',
  'a-ne-pas-confondre-avec': 'à ne pas confondre avec',
};

// Statut épistémique — le graphe représente ce qu'on sait ET à quel degré.
const STATUSES = ['canon', 'lecture-disputee', 'rumeur', 'retconne'];

// Horizon de divulgation (site privé, mais utile pour trier établi/spéculatif).
const DISCLOSURES = ['public', 't1', 't2', 't3', 't4', 'interne'];

// Précision d'une date — jamais de fausse exactitude.
const PRECISIONS = ['exact', 'annee', 'decennie', 'siecle', 'estimation'];

// Statut d'un alias (nom daté).
const ALIAS_STATUSES = ['visible', 'predecessor', 'vanished', 'variante', 'desambig'];

const ID_PREFIX = {
  personne: 'per', lignee: 'lig', lieu: 'lie', 'entite-politique': 'pol',
  evenement: 'evt', concept: 'con', religion: 'rel', espece: 'esp',
  objet: 'obj', terme: 'ter', source: 'src', question: 'que',
  oeuvre: 'oeu', ere: 'ere',
};

// ─────────────────────────────────────────────────────────────────────────
// 2. SCHÉMA — le DDL, exécuté instruction par instruction (uniforme aux 2 backends)
// ─────────────────────────────────────────────────────────────────────────

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS kg_entities (
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
   )`,
  `CREATE INDEX IF NOT EXISTS idx_kg_entities_type ON kg_entities(type)`,
  `CREATE INDEX IF NOT EXISTS idx_kg_entities_name ON kg_entities(name)`,

  `CREATE TABLE IF NOT EXISTS kg_aliases (
     id           INTEGER PRIMARY KEY AUTOINCREMENT,
     entity_id    TEXT NOT NULL,
     value        TEXT NOT NULL,
     alias_status TEXT NOT NULL DEFAULT 'visible',
     era_id       TEXT,
     from_year    INTEGER,
     to_year      INTEGER,
     meaning      TEXT,
     UNIQUE(entity_id, value, era_id)
   )`,
  `CREATE INDEX IF NOT EXISTS idx_kg_aliases_entity ON kg_aliases(entity_id)`,
  `CREATE INDEX IF NOT EXISTS idx_kg_aliases_value ON kg_aliases(value)`,

  `CREATE TABLE IF NOT EXISTS kg_facts (
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
   )`,
  `CREATE INDEX IF NOT EXISTS idx_kg_facts_subject ON kg_facts(subject_id)`,
  `CREATE INDEX IF NOT EXISTS idx_kg_facts_object ON kg_facts(object_id)`,
  `CREATE INDEX IF NOT EXISTS idx_kg_facts_year ON kg_facts(start_year)`,
  `CREATE INDEX IF NOT EXISTS idx_kg_facts_type ON kg_facts(fact_type)`,

  `CREATE TABLE IF NOT EXISTS kg_relations (
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
   )`,
  `CREATE INDEX IF NOT EXISTS idx_kg_relations_from ON kg_relations(from_id)`,
  `CREATE INDEX IF NOT EXISTS idx_kg_relations_to ON kg_relations(to_id)`,

  `CREATE TABLE IF NOT EXISTS kg_readings (
     id             INTEGER PRIMARY KEY AUTOINCREMENT,
     question_id    TEXT NOT NULL,
     text           TEXT NOT NULL,
     source_id      TEXT,
     reading_status TEXT DEFAULT 'lecture-sourcee',
     ordinal        INTEGER DEFAULT 0
   )`,
  `CREATE INDEX IF NOT EXISTS idx_kg_readings_q ON kg_readings(question_id)`,

  `CREATE TABLE IF NOT EXISTS kg_audit (
     id         INTEGER PRIMARY KEY AUTOINCREMENT,
     ref_id     TEXT,
     kind       TEXT,
     op         TEXT,
     before     TEXT,
     after      TEXT,
     changed_at TEXT
   )`,
];

async function initSchema(exec) {
  for (const sql of SCHEMA_STATEMENTS) {
    await exec(sql, []);
  }
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────
// 3. UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────

async function q(exec, sql, args) {
  const r = await exec(sql, args || []);
  return (r && r.rows) || [];
}

function nowIso() {
  // Passé par l'appelant via param quand disponible ; sinon ISO courant.
  return new Date().toISOString();
}

function num(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function str(v) {
  return v === null || v === undefined ? null : String(v);
}

function jsonOrNull(v) {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'string') return v;
  try { return JSON.stringify(v); } catch { return null; }
}

function parseJson(v) {
  if (v === null || v === undefined || v === '') return null;
  try { return typeof v === 'string' ? JSON.parse(v) : v; } catch { return null; }
}

class KGError extends Error {
  constructor(message, code) { super(message); this.code = code || 'validation'; }
}

// Génère le prochain id stable et opaque pour un type (per-0001, pol-0042…).
async function nextId(exec, type) {
  const prefix = ID_PREFIX[type];
  if (!prefix) throw new KGError(`Type d'entité inconnu : ${type}`);
  const rows = await q(exec,
    `SELECT id FROM kg_entities WHERE id LIKE ? ORDER BY id`, [prefix + '-%']);
  let max = 0;
  for (const r of rows) {
    const m = /-(\d+)$/.exec(r.id);
    if (m) { const n = parseInt(m[1], 10); if (n > max) max = n; }
  }
  return `${prefix}-${String(max + 1).padStart(4, '0')}`;
}

// ─────────────────────────────────────────────────────────────────────────
// 4. FORMATAGE DES DATES — le double calendrier et la précision variable
// ─────────────────────────────────────────────────────────────────────────
// L'axe canonique interne est l'An 0 = l'Arrachement (av.A / ap.A). La date
// n'est jamais une chaîne : elle porte sa propre incertitude et ne ment
// jamais par excès de confiance.

function formatYear(year, precision, circa) {
  if (year === null || year === undefined) return '—';
  const y = Number(year);
  const approx = circa ? '~' : (precision === 'estimation' ? '≈' : '');
  if (y === 0) return `${approx}An 0 (l'Arrachement)`;
  const abs = Math.abs(y);
  const suffix = y < 0 ? 'av.A' : 'ap.A';
  if (precision === 'siecle') {
    const siecle = Math.floor(abs / 100) + (abs % 100 === 0 ? 0 : 1);
    return `${approx}${siecle}ᵉ s. ${suffix}`;
  }
  return `${approx}${abs.toLocaleString('fr-FR')} ${suffix}`;
}

function formatRange(f) {
  const start = formatYear(f.start_year, f.start_precision, f.start_circa);
  if (f.end_year === null || f.end_year === undefined) return start;
  const end = formatYear(f.end_year, f.end_precision, f.end_circa);
  return `${start} → ${end}`;
}

// Clé de tri temporel : (année de début, seq). Les dates inconnues finissent
// en tête (négatif infini) pour ne pas polluer le milieu de la frise.
function sortKey(f) {
  const y = f.start_year === null || f.start_year === undefined ? -Infinity : Number(f.start_year);
  const s = f.seq === null || f.seq === undefined ? 0 : Number(f.seq);
  return [y, s];
}

// ─────────────────────────────────────────────────────────────────────────
// 5. ENTITÉS — CRUD
// ─────────────────────────────────────────────────────────────────────────

function validateEntity(e) {
  if (!e || typeof e !== 'object') throw new KGError('Entité manquante');
  if (!ENTITY_TYPES.includes(e.type)) throw new KGError(`Type inconnu : ${e.type}`);
  if (!e.name || !String(e.name).trim()) throw new KGError('Le nom est obligatoire');
  if (e.status && !STATUSES.includes(e.status)) throw new KGError(`Statut inconnu : ${e.status}`);
  if (e.disclosure && !DISCLOSURES.includes(e.disclosure)) throw new KGError(`Divulgation inconnue : ${e.disclosure}`);
}

async function listEntities(exec, opts) {
  opts = opts || {};
  const where = [];
  const args = [];
  if (opts.type) { where.push('type = ?'); args.push(opts.type); }
  if (opts.search) {
    where.push('(name LIKE ? OR id IN (SELECT entity_id FROM kg_aliases WHERE value LIKE ?))');
    args.push('%' + opts.search + '%', '%' + opts.search + '%');
  }
  const sql = `SELECT id, type, name, summary, status, disclosure
               FROM kg_entities
               ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
               ORDER BY name COLLATE NOCASE`;
  return q(exec, sql, args);
}

async function getEntity(exec, id) {
  const rows = await q(exec, `SELECT * FROM kg_entities WHERE id = ?`, [id]);
  if (!rows.length) return null;
  const e = rows[0];
  e.data = parseJson(e.data);
  return e;
}

async function upsertEntity(exec, input, when) {
  validateEntity(input);
  const ts = when || nowIso();
  let id = input.id;
  const existing = id ? await getEntity(exec, id) : null;
  if (!id) id = await nextId(exec, input.type);

  await exec(
    `INSERT INTO kg_entities (id, type, name, slug, summary, body, data, status, disclosure, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       type=excluded.type, name=excluded.name, slug=excluded.slug,
       summary=excluded.summary, body=excluded.body, data=excluded.data,
       status=excluded.status, disclosure=excluded.disclosure,
       updated_at=excluded.updated_at`,
    [
      id, input.type, String(input.name).trim(), str(input.slug),
      str(input.summary), str(input.body), jsonOrNull(input.data),
      input.status || 'canon', input.disclosure || 'interne',
      existing ? existing.created_at : ts, ts,
    ]
  );
  await audit(exec, id, 'entity', existing ? 'update' : 'create', existing, { id, ...input }, ts);
  return getEntity(exec, id);
}

async function deleteEntity(exec, id, when) {
  const existing = await getEntity(exec, id);
  if (!existing) throw new KGError('Entité introuvable', 'not-found');
  // Intégrité : refuser la suppression si l'entité est encore référencée.
  const refs = await q(exec,
    `SELECT 'fait' AS k FROM kg_facts WHERE subject_id=? OR object_id=? OR source_id=?
     UNION ALL SELECT 'relation' FROM kg_relations WHERE from_id=? OR to_id=? OR source_id=?
     UNION ALL SELECT 'lecture' FROM kg_readings WHERE question_id=? OR source_id=?`,
    [id, id, id, id, id, id, id, id]);
  if (refs.length) {
    throw new KGError(`Suppression refusée : encore référencée par ${refs.length} élément(s). Détache-les d'abord.`, 'referenced');
  }
  await exec(`DELETE FROM kg_aliases WHERE entity_id=?`, [id]);
  await exec(`DELETE FROM kg_entities WHERE id=?`, [id]);
  await audit(exec, id, 'entity', 'delete', existing, null, when || nowIso());
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────
// 6. ALIAS — les noms sont des données datées (généralise timeline_names)
// ─────────────────────────────────────────────────────────────────────────

async function getAliases(exec, entityId) {
  return q(exec,
    `SELECT id, entity_id, value, alias_status, era_id, from_year, to_year, meaning
     FROM kg_aliases WHERE entity_id=? ORDER BY from_year IS NULL DESC, from_year`, [entityId]);
}

async function upsertAlias(exec, a) {
  if (!a.entity_id) throw new KGError('entity_id manquant');
  if (!a.value || !String(a.value).trim()) throw new KGError('Valeur du nom manquante');
  if (a.alias_status && !ALIAS_STATUSES.includes(a.alias_status)) {
    throw new KGError(`Statut d'alias inconnu : ${a.alias_status}`);
  }
  const owner = await getEntity(exec, a.entity_id);
  if (!owner) throw new KGError(`Entité inexistante : ${a.entity_id}`, 'ref');
  await exec(
    `INSERT INTO kg_aliases (entity_id, value, alias_status, era_id, from_year, to_year, meaning)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(entity_id, value, era_id) DO UPDATE SET
       alias_status=excluded.alias_status, from_year=excluded.from_year,
       to_year=excluded.to_year, meaning=excluded.meaning`,
    [a.entity_id, String(a.value).trim(), a.alias_status || 'visible',
     str(a.era_id), num(a.from_year), num(a.to_year), str(a.meaning)]
  );
  return { ok: true };
}

async function deleteAlias(exec, id) {
  await exec(`DELETE FROM kg_aliases WHERE id=?`, [num(id)]);
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────
// 7. FAITS DATÉS — le cœur événementiel (chronologie, règnes, vies…)
// ─────────────────────────────────────────────────────────────────────────

async function validateFact(exec, f) {
  if (!FACT_TYPES.includes(f.fact_type)) throw new KGError(`Type de fait inconnu : ${f.fact_type}`);
  if (!f.subject_id) throw new KGError('Sujet manquant');
  const subj = await getEntity(exec, f.subject_id);
  if (!subj) throw new KGError(`Sujet inexistant : ${f.subject_id}`, 'ref');
  if (f.object_id) {
    const obj = await getEntity(exec, f.object_id);
    if (!obj) throw new KGError(`Objet inexistant : ${f.object_id}`, 'ref');
  }
  if (f.source_id) {
    const src = await getEntity(exec, f.source_id);
    if (!src) throw new KGError(`Source inexistante : ${f.source_id}`, 'ref');
    if (src.type !== 'source') throw new KGError(`La source doit être de type « source » : ${f.source_id}`);
  }
  if (f.start_precision && !PRECISIONS.includes(f.start_precision)) throw new KGError(`Précision inconnue : ${f.start_precision}`);
  if (f.end_precision && !PRECISIONS.includes(f.end_precision)) throw new KGError(`Précision inconnue : ${f.end_precision}`);
  if (f.status && !STATUSES.includes(f.status)) throw new KGError(`Statut inconnu : ${f.status}`);
  // Cohérence intra-fait : la fin ne précède pas le début.
  const s = num(f.start_year), e = num(f.end_year);
  if (s !== null && e !== null && e < s) {
    throw new KGError(`Incohérence temporelle : la fin (${e}) précède le début (${s}).`);
  }
  // Un fait « canon » doit citer une source (pas de canon anonyme).
  if ((f.status || 'canon') === 'canon' && !f.source_id) {
    // Avertissement non bloquant : renvoyé pour affichage, pas une erreur dure.
    return { warning: 'Fait canon sans source — provenance recommandée.' };
  }
  return {};
}

async function getFact(exec, id) {
  const rows = await q(exec, `SELECT * FROM kg_facts WHERE id=?`, [num(id)]);
  if (!rows.length) return null;
  rows[0].data = parseJson(rows[0].data);
  return rows[0];
}

async function upsertFact(exec, f, when) {
  const check = await validateFact(exec, f);
  const ts = when || nowIso();
  const cols = [
    f.fact_type, f.subject_id, str(f.object_id),
    num(f.start_year), f.start_precision || 'annee', f.start_circa ? 1 : 0,
    num(f.end_year), str(f.end_precision), f.end_circa ? 1 : 0,
    str(f.era_id), num(f.seq) || 0, str(f.label), str(f.detail),
    jsonOrNull(f.data), str(f.source_id), f.status || 'canon',
    f.disclosure || 'interne',
  ];
  if (f.id) {
    await exec(
      `UPDATE kg_facts SET fact_type=?, subject_id=?, object_id=?, start_year=?,
        start_precision=?, start_circa=?, end_year=?, end_precision=?, end_circa=?,
        era_id=?, seq=?, label=?, detail=?, data=?, source_id=?, status=?, disclosure=?,
        updated_at=? WHERE id=?`,
      [...cols, ts, num(f.id)]
    );
    await audit(exec, f.subject_id, 'fact', 'update', { id: f.id }, f, ts);
    return getFact(exec, f.id);
  }
  const rows = await q(exec,
    `INSERT INTO kg_facts
       (fact_type, subject_id, object_id, start_year, start_precision, start_circa,
        end_year, end_precision, end_circa, era_id, seq, label, detail, data,
        source_id, status, disclosure, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING id`,
    [...cols, ts, ts]
  );
  const id = rows.length ? rows[0].id : null;
  await audit(exec, f.subject_id, 'fact', 'create', null, f, ts);
  const saved = await getFact(exec, id);
  if (check.warning) saved._warning = check.warning;
  return saved;
}

async function deleteFact(exec, id, when) {
  const f = await getFact(exec, id);
  await exec(`DELETE FROM kg_facts WHERE id=?`, [num(id)]);
  if (f) await audit(exec, f.subject_id, 'fact', 'delete', f, null, when || nowIso());
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────
// 8. RELATIONS — typées, dirigées, saisies une seule fois
// ─────────────────────────────────────────────────────────────────────────

async function validateRelation(exec, r) {
  if (!REL_TYPES.includes(r.rel_type)) throw new KGError(`Relation inconnue : ${r.rel_type}`);
  if (!r.from_id || !r.to_id) throw new KGError('from_id et to_id sont obligatoires');
  if (r.from_id === r.to_id) throw new KGError('Une entité ne peut pas être en relation avec elle-même');
  const a = await getEntity(exec, r.from_id);
  if (!a) throw new KGError(`Entité source inexistante : ${r.from_id}`, 'ref');
  const b = await getEntity(exec, r.to_id);
  if (!b) throw new KGError(`Entité cible inexistante : ${r.to_id}`, 'ref');
  if (r.source_id) {
    const src = await getEntity(exec, r.source_id);
    if (!src) throw new KGError(`Source inexistante : ${r.source_id}`, 'ref');
  }
  if (r.status && !STATUSES.includes(r.status)) throw new KGError(`Statut inconnu : ${r.status}`);
}

async function upsertRelation(exec, r) {
  await validateRelation(exec, r);
  await exec(
    `INSERT INTO kg_relations (rel_type, from_id, to_id, start_year, end_year, label, data, source_id, status)
     VALUES (?,?,?,?,?,?,?,?,?)
     ON CONFLICT(rel_type, from_id, to_id, start_year) DO UPDATE SET
       end_year=excluded.end_year, label=excluded.label, data=excluded.data,
       source_id=excluded.source_id, status=excluded.status`,
    [r.rel_type, r.from_id, r.to_id, num(r.start_year), num(r.end_year),
     str(r.label), jsonOrNull(r.data), str(r.source_id), r.status || 'canon']
  );
  return { ok: true };
}

async function deleteRelation(exec, id) {
  await exec(`DELETE FROM kg_relations WHERE id=?`, [num(id)]);
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────
// 9. LECTURES — les lectures concurrentes d'un mystère protégé
// ─────────────────────────────────────────────────────────────────────────

async function getReadings(exec, questionId) {
  return q(exec,
    `SELECT id, question_id, text, source_id, reading_status, ordinal
     FROM kg_readings WHERE question_id=? ORDER BY ordinal, id`, [questionId]);
}

async function upsertReading(exec, r) {
  if (!r.question_id) throw new KGError('question_id manquant');
  if (!r.text || !String(r.text).trim()) throw new KGError('Texte de la lecture manquant');
  const owner = await getEntity(exec, r.question_id);
  if (!owner) throw new KGError(`Question inexistante : ${r.question_id}`, 'ref');
  if (owner.type !== 'question') throw new KGError('Les lectures ne s\'attachent qu\'à une entité « question »');
  if (r.id) {
    await exec(`UPDATE kg_readings SET text=?, source_id=?, reading_status=?, ordinal=? WHERE id=?`,
      [String(r.text).trim(), str(r.source_id), r.reading_status || 'lecture-sourcee', num(r.ordinal) || 0, num(r.id)]);
    return { ok: true };
  }
  await exec(`INSERT INTO kg_readings (question_id, text, source_id, reading_status, ordinal) VALUES (?,?,?,?,?)`,
    [r.question_id, String(r.text).trim(), str(r.source_id), r.reading_status || 'lecture-sourcee', num(r.ordinal) || 0]);
  return { ok: true };
}

async function deleteReading(exec, id) {
  await exec(`DELETE FROM kg_readings WHERE id=?`, [num(id)]);
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────
// 10. AUDIT — journal des changements (durabilité, retcons traçables)
// ─────────────────────────────────────────────────────────────────────────

async function audit(exec, refId, kind, op, before, after, when) {
  try {
    await exec(
      `INSERT INTO kg_audit (ref_id, kind, op, before, after, changed_at) VALUES (?,?,?,?,?,?)`,
      [str(refId), kind, op, jsonOrNull(before), jsonOrNull(after), when || nowIso()]
    );
  } catch { /* l'audit ne doit jamais bloquer une écriture */ }
}

// ─────────────────────────────────────────────────────────────────────────
// 11. PROJECTIONS — une info écrite une fois, affichée partout
// ─────────────────────────────────────────────────────────────────────────

// Résout un ensemble d'ids en {id: {id, name, type}} en une requête.
async function resolveNames(exec, ids) {
  const uniq = [...new Set(ids.filter(Boolean))];
  if (!uniq.length) return {};
  const placeholders = uniq.map(() => '?').join(',');
  const rows = await q(exec, `SELECT id, name, type FROM kg_entities WHERE id IN (${placeholders})`, uniq);
  const map = {};
  for (const r of rows) map[r.id] = r;
  return map;
}

// LE DOSSIER (la « fiche ») : tout ce que le graphe sait d'une entité,
// agrégé à la lecture — jamais dupliqué au stockage.
async function getDossier(exec, id) {
  const entity = await getEntity(exec, id);
  if (!entity) return null;

  const aliases = await getAliases(exec, id);

  // Faits où l'entité est sujet OU objet.
  const factRows = await q(exec,
    `SELECT * FROM kg_facts WHERE subject_id=? OR object_id=?`, [id, id]);
  // Relations où l'entité est source OU cible.
  const relOut = await q(exec, `SELECT * FROM kg_relations WHERE from_id=?`, [id]);
  const relIn = await q(exec, `SELECT * FROM kg_relations WHERE to_id=?`, [id]);
  const readings = entity.type === 'question' ? await getReadings(exec, id) : [];

  // Résoudre tous les noms référencés en une passe.
  const refIds = [];
  factRows.forEach(f => { refIds.push(f.subject_id, f.object_id, f.source_id); });
  relOut.forEach(r => { refIds.push(r.to_id, r.source_id); });
  relIn.forEach(r => { refIds.push(r.from_id, r.source_id); });
  readings.forEach(r => refIds.push(r.source_id));
  const names = await resolveNames(exec, refIds);
  const nameOf = (rid) => (rid && names[rid] ? names[rid].name : rid) || null;

  const facts = factRows
    .map(f => ({
      ...f,
      data: parseJson(f.data),
      dateLabel: formatRange(f),
      subjectName: nameOf(f.subject_id),
      objectName: nameOf(f.object_id),
      sourceName: nameOf(f.source_id),
      role: f.subject_id === id ? 'sujet' : 'objet',
    }))
    .sort((a, b) => {
      const [ay, as] = sortKey(a); const [by, bs] = sortKey(b);
      return ay - by || as - bs || a.id - b.id;
    });

  const relations = [
    ...relOut.map(r => ({ ...r, data: parseJson(r.data), direction: 'sortante',
      label: r.rel_type, otherId: r.to_id, otherName: nameOf(r.to_id), sourceName: nameOf(r.source_id) })),
    ...relIn.map(r => ({ ...r, data: parseJson(r.data), direction: 'entrante',
      label: REL_INVERSE[r.rel_type] || r.rel_type, otherId: r.from_id, otherName: nameOf(r.from_id), sourceName: nameOf(r.source_id) })),
  ];

  return {
    entity,
    aliases,
    facts,
    relations,
    readings: readings.map(r => ({ ...r, sourceName: nameOf(r.source_id) })),
  };
}

// LA CHRONOLOGIE : tous les faits triés par (date, seq) — projection globale.
async function getChronologie(exec, opts) {
  opts = opts || {};
  const where = [];
  const args = [];
  if (opts.fact_type) { where.push('f.fact_type = ?'); args.push(opts.fact_type); }
  if (opts.era_id) { where.push('f.era_id = ?'); args.push(opts.era_id); }
  if (opts.from_year !== undefined && opts.from_year !== null && opts.from_year !== '') {
    where.push('f.start_year >= ?'); args.push(num(opts.from_year));
  }
  if (opts.to_year !== undefined && opts.to_year !== null && opts.to_year !== '') {
    where.push('f.start_year <= ?'); args.push(num(opts.to_year));
  }
  if (opts.status) { where.push('f.status = ?'); args.push(opts.status); }
  const rows = await q(exec,
    `SELECT f.* FROM kg_facts f ${where.length ? 'WHERE ' + where.join(' AND ') : ''}`, args);
  const refIds = [];
  rows.forEach(f => refIds.push(f.subject_id, f.object_id, f.source_id));
  const names = await resolveNames(exec, refIds);
  const nameOf = (rid) => (rid && names[rid] ? names[rid].name : rid) || null;
  return rows
    .map(f => ({
      ...f, data: parseJson(f.data),
      dateLabel: formatRange(f),
      subjectName: nameOf(f.subject_id),
      objectName: nameOf(f.object_id),
      sourceName: nameOf(f.source_id),
    }))
    .sort((a, b) => {
      const [ay, as] = sortKey(a); const [by, bs] = sortKey(b);
      return ay - by || as - bs || a.id - b.id;
    });
}

// LA LISTE DE DIRIGEANTS : calculée depuis les faits « regne » d'une entité
// politique — jamais maintenue à la main. Vérifie trous et chevauchements.
async function getDirigeants(exec, polityId) {
  const rows = await q(exec,
    `SELECT * FROM kg_facts WHERE fact_type='regne' AND object_id=?`, [polityId]);
  const names = await resolveNames(exec, rows.map(r => r.subject_id).concat([polityId]));
  const nameOf = (rid) => (rid && names[rid] ? names[rid].name : rid) || null;
  const regnes = rows
    .map(f => ({
      factId: f.id, rulerId: f.subject_id, rulerName: nameOf(f.subject_id),
      start_year: num(f.start_year), end_year: num(f.end_year),
      dateLabel: formatRange(f), seq: num(f.seq) || 0,
    }))
    .sort((a, b) => (a.start_year ?? -Infinity) - (b.start_year ?? -Infinity) || a.seq - b.seq || a.factId - b.factId);

  // Anomalies de continuité (chevauchement / trou).
  const anomalies = [];
  for (let i = 1; i < regnes.length; i++) {
    const prev = regnes[i - 1], cur = regnes[i];
    if (prev.end_year !== null && cur.start_year !== null) {
      if (cur.start_year < prev.end_year) {
        anomalies.push({ type: 'chevauchement', between: [prev.rulerName, cur.rulerName],
          detail: `${cur.rulerName} commence (${cur.start_year}) avant la fin de ${prev.rulerName} (${prev.end_year}).` });
      } else if (cur.start_year - prev.end_year > 1) {
        anomalies.push({ type: 'interregne', between: [prev.rulerName, cur.rulerName],
          detail: `Trou de ${cur.start_year - prev.end_year} ans entre ${prev.rulerName} et ${cur.rulerName}.` });
      }
    }
  }
  return { polityId, polityName: nameOf(polityId), regnes, anomalies };
}

// L'ARBRE GÉNÉALOGIQUE : ascendance et descendance via « parent-de »,
// conjoints via « conjoint-de », vies depuis les faits naissance/mort.
async function parentsOf(exec, x) {
  const r = await q(exec, `SELECT from_id FROM kg_relations WHERE rel_type='parent-de' AND to_id=?`, [x]);
  return r.map(o => o.from_id);
}
async function childrenOf(exec, x) {
  const r = await q(exec, `SELECT to_id FROM kg_relations WHERE rel_type='parent-de' AND from_id=?`, [x]);
  return r.map(o => o.to_id);
}
async function conjointsOf(exec, x) {
  const r = await q(exec, `SELECT from_id, to_id FROM kg_relations WHERE rel_type='conjoint-de' AND (from_id=? OR to_id=?)`, [x, x]);
  return r.map(o => (o.from_id === x ? o.to_id : o.from_id));
}
function uniq(a) { return [...new Set(a)]; }

async function getArbre(exec, id) {
  const center = await getEntity(exec, id);
  if (!center) return null;

  const parents = await parentsOf(exec, id);
  const children = await childrenOf(exec, id);
  const conjoints = await conjointsOf(exec, id);
  const grandparents = uniq((await Promise.all(parents.map(p => parentsOf(exec, p)))).flat());
  const grandchildren = uniq((await Promise.all(children.map(c => childrenOf(exec, c)))).flat());
  const siblings = uniq((await Promise.all(parents.map(p => childrenOf(exec, p)))).flat()).filter(s => s !== id);

  const all = uniq([id, ...parents, ...children, ...conjoints, ...grandparents, ...grandchildren, ...siblings]);
  const names = await resolveNames(exec, all);
  const lifeRows = all.length
    ? await q(exec, `SELECT subject_id, fact_type, start_year, start_precision, start_circa
                     FROM kg_facts WHERE fact_type IN ('naissance','mort')
                     AND subject_id IN (${all.map(() => '?').join(',')})`, all)
    : [];
  const life = {};
  for (const r of lifeRows) { (life[r.subject_id] = life[r.subject_id] || {})[r.fact_type] = r; }

  const node = (x) => {
    const n = names[x]; const l = life[x] || {};
    const b = l.naissance ? formatYear(l.naissance.start_year, l.naissance.start_precision, l.naissance.start_circa) : null;
    const d = l.mort ? formatYear(l.mort.start_year, l.mort.start_precision, l.mort.start_circa) : null;
    return { id: x, name: n ? n.name : x, birth: b, death: d, lifeLabel: (b || d) ? `${b || '?'} – ${d || '?'}` : '' };
  };
  return {
    center: node(id),
    grandparents: grandparents.map(node), parents: parents.map(node),
    conjoints: conjoints.map(node), siblings: siblings.map(node),
    children: children.map(node), grandchildren: grandchildren.map(node),
  };
}

// ─────────────────────────────────────────────────────────────────────────
// 12. COHÉRENCE — le filet de sécurité rendu visible
// ─────────────────────────────────────────────────────────────────────────
// Scanne tout le graphe et rapporte les violations. C'est le sens
// opérationnel de « aucune contradiction ne peut apparaître ».

async function getConsistencyReport(exec) {
  const issues = [];
  const add = (severity, kind, message, refId) => issues.push({ severity, kind, message, refId });

  const entities = await q(exec, `SELECT id, type, name, data FROM kg_entities`);
  const idSet = new Set(entities.map(e => e.id));
  const byId = {}; entities.forEach(e => { byId[e.id] = e; });
  const nameOf = (id) => (byId[id] ? byId[id].name : id);

  // 12.1 Intégrité référentielle — aucun lien vers le vide.
  const facts = await q(exec, `SELECT * FROM kg_facts`);
  for (const f of facts) {
    if (!idSet.has(f.subject_id)) add('erreur', 'ref', `Fait #${f.id} : sujet inexistant (${f.subject_id}).`, f.subject_id);
    if (f.object_id && !idSet.has(f.object_id)) add('erreur', 'ref', `Fait #${f.id} : objet inexistant (${f.object_id}).`, f.object_id);
    if (f.source_id && !idSet.has(f.source_id)) add('erreur', 'ref', `Fait #${f.id} : source inexistante (${f.source_id}).`, f.source_id);
    if (num(f.end_year) !== null && num(f.start_year) !== null && num(f.end_year) < num(f.start_year)) {
      add('erreur', 'temps', `Fait #${f.id} (${f.fact_type}) : fin ${f.end_year} avant début ${f.start_year}.`, f.subject_id);
    }
    if ((f.status || 'canon') === 'canon' && !f.source_id) {
      add('info', 'provenance', `Fait #${f.id} (${f.fact_type} sur ${nameOf(f.subject_id)}) : canon sans source.`, f.subject_id);
    }
  }

  const rels = await q(exec, `SELECT * FROM kg_relations`);
  for (const r of rels) {
    if (!idSet.has(r.from_id)) add('erreur', 'ref', `Relation #${r.id} : source inexistante (${r.from_id}).`, r.from_id);
    if (!idSet.has(r.to_id)) add('erreur', 'ref', `Relation #${r.id} : cible inexistante (${r.to_id}).`, r.to_id);
  }
  const aliases = await q(exec, `SELECT * FROM kg_aliases`);
  for (const a of aliases) {
    if (!idSet.has(a.entity_id)) add('erreur', 'ref', `Alias « ${a.value} » : entité inexistante (${a.entity_id}).`, a.entity_id);
  }
  const readings = await q(exec, `SELECT * FROM kg_readings`);
  for (const rd of readings) {
    if (!idSet.has(rd.question_id)) add('erreur', 'ref', `Lecture #${rd.id} : question inexistante (${rd.question_id}).`, rd.question_id);
  }

  // 12.2 Cohérence de vie — naissance avant mort ; règne dans la vie.
  const bySubject = {};
  for (const f of facts) {
    (bySubject[f.subject_id] = bySubject[f.subject_id] || []).push(f);
  }
  for (const [sid, fs] of Object.entries(bySubject)) {
    const naissance = fs.find(f => f.fact_type === 'naissance');
    const mort = fs.find(f => f.fact_type === 'mort');
    if (naissance && mort && num(naissance.start_year) !== null && num(mort.start_year) !== null
        && num(mort.start_year) < num(naissance.start_year)) {
      add('erreur', 'temps', `${nameOf(sid)} : mort (${mort.start_year}) avant naissance (${naissance.start_year}).`, sid);
    }
    for (const r of fs.filter(f => f.fact_type === 'regne')) {
      if (naissance && num(r.start_year) !== null && num(naissance.start_year) !== null
          && num(r.start_year) < num(naissance.start_year)) {
        add('avert', 'temps', `${nameOf(sid)} : règne commencé (${r.start_year}) avant sa naissance (${naissance.start_year}).`, sid);
      }
      if (mort && num(r.end_year) !== null && num(mort.start_year) !== null
          && num(r.end_year) > num(mort.start_year)) {
        add('avert', 'temps', `${nameOf(sid)} : règne fini (${r.end_year}) après sa mort (${mort.start_year}).`, sid);
      }
    }
  }

  // 12.3 Successions politiques — trous et chevauchements par entité gouvernée.
  const polities = entities.filter(e => e.type === 'entite-politique');
  for (const p of polities) {
    const { anomalies } = await getDirigeants(exec, p.id);
    for (const an of anomalies) add(an.type === 'chevauchement' ? 'avert' : 'info', 'succession', `${p.name} — ${an.detail}`, p.id);
  }

  // 12.4 Sanctuaire des mystères — une question protégée garde ≥ 2 lectures.
  for (const e of entities.filter(x => x.type === 'question')) {
    const data = parseJson(e.data) || {};
    if (data.protege) {
      const rs = readings.filter(r => r.question_id === e.id);
      if (rs.length < 2) {
        add('avert', 'mystere', `Mystère protégé « ${e.name} » : ${rs.length} lecture(s). Un mystère protégé doit conserver au moins deux lectures concurrentes.`, e.id);
      }
    }
  }

  const counts = {
    erreur: issues.filter(i => i.severity === 'erreur').length,
    avert: issues.filter(i => i.severity === 'avert').length,
    info: issues.filter(i => i.severity === 'info').length,
  };
  return { counts, issues };
}

// LA PROJECTION « TIMELINE » : reconstruit la forme year-based de
// data/timeline-names.json (eras / continentTimelines / countries) DEPUIS le
// graphe, pour alimenter la carte du site. Le graphe devient la source ;
// aucune donnée n'est dupliquée. Données non secrètes (mêmes que le fichier
// public actuel) — cette projection est donc lisible sans mot de passe.
async function getTimelineProjection(exec) {
  const entities = await q(exec,
    `SELECT id, type, name, summary, data FROM kg_entities WHERE type IN ('ere','lieu','entite-politique')`);
  const aliases = await q(exec, `SELECT entity_id, value, from_year, to_year FROM kg_aliases`);
  const aliasBy = {};
  for (const a of aliases) (aliasBy[a.entity_id] = aliasBy[a.entity_id] || []).push(a);

  const timelineOf = (id, currentName) => (aliasBy[id] || [])
    .filter(a => a.from_year !== null && a.from_year !== undefined && a.to_year !== null && a.to_year !== undefined)
    .map(a => ({ name: a.value || currentName, startYear: Number(a.from_year), endYear: Number(a.to_year) }))
    .sort((x, y) => x.startYear - y.startYear);

  const eras = [], continentTimelines = [], countries = [];
  for (const e of entities) {
    const data = parseJson(e.data) || {};
    if (e.type === 'ere') {
      eras.push({ id: e.id, label: e.name, name: e.name, description: e.summary,
        startYear: data.startYear, endYear: data.endYear });
    } else if (e.type === 'lieu' && data.echelle === 'continent') {
      continentTimelines.push({ currentName: e.name, timeline: timelineOf(e.id, e.name) });
    } else if (e.type === 'entite-politique' && !data.disparue) {
      countries.push({ currentName: e.name, continent: data.continent || null, timeline: timelineOf(e.id, e.name) });
    }
  }
  eras.sort((a, b) => (a.startYear ?? 0) - (b.startYear ?? 0));
  return { timelineData: { eras, continentTimelines, countries } };
}

// ─────────────────────────────────────────────────────────────────────────
// 13. STATISTIQUES — vue d'ensemble
// ─────────────────────────────────────────────────────────────────────────

async function getStats(exec) {
  const byType = await q(exec, `SELECT type, COUNT(*) AS n FROM kg_entities GROUP BY type`);
  const facts = await q(exec, `SELECT COUNT(*) AS n FROM kg_facts`);
  const rels = await q(exec, `SELECT COUNT(*) AS n FROM kg_relations`);
  const aliases = await q(exec, `SELECT COUNT(*) AS n FROM kg_aliases`);
  return {
    entitiesByType: byType.reduce((m, r) => (m[r.type] = Number(r.n), m), {}),
    entities: byType.reduce((s, r) => s + Number(r.n), 0),
    facts: Number((facts[0] || {}).n || 0),
    relations: Number((rels[0] || {}).n || 0),
    aliases: Number((aliases[0] || {}).n || 0),
  };
}

// ─────────────────────────────────────────────────────────────────────────
// 13b. ROUTAGE — mapping action→opération, partagé par les 2 backends
// ─────────────────────────────────────────────────────────────────────────
// Écrit une seule fois ; api/kg.js (Turso) et server.js (node:sqlite) l'appellent.

function getCatalog() {
  return {
    entityTypes: ENTITY_TYPES, lieuScales: LIEU_SCALES, sourceRanks: SOURCE_RANKS,
    factTypes: FACT_TYPES, relTypes: REL_TYPES, relInverse: REL_INVERSE,
    statuses: STATUSES, disclosures: DISCLOSURES, precisions: PRECISIONS,
    aliasStatuses: ALIAS_STATUSES,
  };
}

async function readAction(exec, action, query) {
  query = query || {};
  switch (action || 'list') {
    case 'catalog': return getCatalog();
    case 'list': return { entities: await listEntities(exec, { type: query.type, search: query.search }) };
    case 'entity': return { entity: await getEntity(exec, query.id) };
    case 'dossier': return { dossier: await getDossier(exec, query.id) };
    case 'chronologie': return { facts: await getChronologie(exec, {
      fact_type: query.fact_type, era_id: query.era_id,
      from_year: query.from_year, to_year: query.to_year, status: query.status }) };
    case 'dirigeants': return { dirigeants: await getDirigeants(exec, query.id) };
    case 'arbre': return { arbre: await getArbre(exec, query.id) };
    case 'coherence': return { report: await getConsistencyReport(exec) };
    case 'timeline': return await getTimelineProjection(exec);
    case 'stats': return { stats: await getStats(exec) };
    default: throw new KGError(`Action de lecture inconnue : ${action}`);
  }
}

async function writeAction(exec, action, data) {
  data = data || {};
  switch (action) {
    case 'save-entity': return { entity: await upsertEntity(exec, data) };
    case 'delete-entity': return await deleteEntity(exec, data.id);
    case 'save-alias': return await upsertAlias(exec, data);
    case 'delete-alias': return await deleteAlias(exec, data.id);
    case 'save-fact': return { fact: await upsertFact(exec, data) };
    case 'delete-fact': return await deleteFact(exec, data.id);
    case 'save-relation': return await upsertRelation(exec, data);
    case 'delete-relation': return await deleteRelation(exec, data.id);
    case 'save-reading': return await upsertReading(exec, data);
    case 'delete-reading': return await deleteReading(exec, data.id);
    default: throw new KGError(`Action d'écriture inconnue : ${action}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 14. EXPORTS
// ─────────────────────────────────────────────────────────────────────────

module.exports = {
  // catalogues (exposés pour peupler les menus de l'UI)
  ENTITY_TYPES, LIEU_SCALES, SOURCE_RANKS, FACT_TYPES, REL_TYPES, REL_INVERSE,
  STATUSES, DISCLOSURES, PRECISIONS, ALIAS_STATUSES, ID_PREFIX,
  KGError,
  // schéma
  initSchema, SCHEMA_STATEMENTS,
  // entités
  listEntities, getEntity, upsertEntity, deleteEntity, nextId,
  // alias
  getAliases, upsertAlias, deleteAlias,
  // faits
  getFact, upsertFact, deleteFact, validateFact,
  // relations
  upsertRelation, deleteRelation, validateRelation,
  // lectures / mystères
  getReadings, upsertReading, deleteReading,
  // projections
  getDossier, getChronologie, getDirigeants, getArbre, getConsistencyReport, getStats,
  getTimelineProjection,
  // routage partagé
  getCatalog, readAction, writeAction,
  // utilitaires de date (réutilisés côté front si besoin)
  formatYear, formatRange,
};
