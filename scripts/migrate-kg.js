'use strict';
/*
 * scripts/migrate-kg.js — Seed du graphe de connaissances depuis les données
 * chronologiques existantes (data/timeline-names.json).
 *
 * Transforme le corpus déjà à moitié structuré en graphe :
 *   • ères                → entités type « ere » (id = slug d'origine)
 *   • continents          → lieux (échelle continent) + noms historiques (alias datés)
 *   • nations             → entités politiques + alias datés + fait « fondation »
 *                           + relations situe-dans / pratique(religion) / capitale-de
 *   • civilisations mortes → entités politiques + faits « fondation » et « chute »
 *                           + relations situe-dans / succède-à
 *
 * Backend : Turso si TURSO_URL + TURSO_AUTH_TOKEN sont présents, sinon
 * node:sqlite (local-kg.sqlite). Le MÊME cœur (lib/kg-core.js) traite les deux.
 *
 * Usage :  node scripts/migrate-kg.js [--reset]
 *   --reset  vide d'abord les tables kg_* (seed propre).
 */

const path = require('path');
const kg = require('../lib/kg-core.js');
const { createSqliteExec } = require('../lib/sqlite-adapter.js');
const { createTursoExec } = require('../lib/turso-adapter.js');
const data = require('../data/timeline-names.json');

const RESET = process.argv.includes('--reset');

function pickExec() {
  if (process.env.TURSO_URL && process.env.TURSO_AUTH_TOKEN) {
    console.log('→ Backend : Turso');
    return createTursoExec(process.env.TURSO_URL, process.env.TURSO_AUTH_TOKEN);
  }
  const file = path.join(__dirname, '..', 'local-kg.sqlite');
  console.log('→ Backend : node:sqlite (' + file + ')');
  return createSqliteExec(file).exec;
}

// Précision d'une date issue des chroniques : les temps très reculés sont des
// estimations rituelles ; le reste, des années nettes.
function datePrec(year) {
  if (year === null || year === undefined) return { precision: 'annee', circa: 0 };
  if (year < -1000) return { precision: 'estimation', circa: 1 };
  return { precision: 'annee', circa: 0 };
}

function truncate(s, n) {
  if (!s) return null;
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

(async () => {
  const exec = pickExec();
  await kg.initSchema(exec);

  if (RESET) {
    for (const t of ['kg_readings', 'kg_relations', 'kg_facts', 'kg_aliases', 'kg_entities', 'kg_audit']) {
      await exec(`DELETE FROM ${t}`, []);
    }
    console.log('⌫ tables kg_* vidées (--reset)');
  }

  // Index (type|name) → id, pour l'idempotence et la résolution des relations.
  const index = new Map();
  const key = (type, name) => `${type}|${name}`;
  for (const row of (await exec(`SELECT id, type, name FROM kg_entities`, [])).rows) {
    index.set(key(row.type, row.name), row.id);
  }

  async function ensure(type, name, extra) {
    const k = key(type, name);
    if (index.has(k)) return index.get(k);
    const e = await kg.upsertEntity(exec, Object.assign({ type, name }, extra || {}));
    index.set(k, e.id);
    return e.id;
  }

  const td = data.timelineData;
  let counts = { eras: 0, continents: 0, aliases: 0, nations: 0, civs: 0, religions: 0, facts: 0, relations: 0, capitals: 0 };

  // ── Source de provenance des faits migrés ─────────────────────────────
  const srcId = await ensure('source', 'Chroniques d’Hybélior (chronologie canonique)', {
    summary: 'Chronologie et noms historiques agrégés — provenance des faits migrés.',
    data: { rang: 'chronique-interne' },
  });

  // ── Ères (id = slug d'origine, pour préserver les références era_id) ───
  for (const era of td.eras) {
    await kg.upsertEntity(exec, {
      id: era.id, type: 'ere', name: era.name, summary: era.description,
      data: { startYear: era.startYear, endYear: era.endYear },
    });
    counts.eras++;
  }

  // ── Continents (lieux) + noms historiques datés (alias) ───────────────
  const continentIdByName = {};
  for (const ct of td.continentTimelines) {
    const id = await ensure('lieu', ct.currentName, { data: { echelle: 'continent' } });
    continentIdByName[ct.currentName] = id;
    counts.continents++;
    for (const seg of (ct.timeline || [])) {
      if (!seg.name) continue;
      const isCurrent = seg.name === ct.currentName;
      await kg.upsertAlias(exec, {
        entity_id: id, value: seg.name,
        alias_status: isCurrent ? 'visible' : 'predecessor',
        from_year: seg.startYear, to_year: seg.endYear,
      });
      counts.aliases++;
    }
  }

  // ── Nations (entités politiques) ──────────────────────────────────────
  for (const c of td.countries) {
    const polId = await ensure('entite-politique', c.currentName, {
      data: { continent: c.continent || null, religion: c.religion || null },
    });
    counts.nations++;

    const segs = (c.timeline || []).slice().sort((a, b) => (a.startYear ?? 0) - (b.startYear ?? 0));

    // Alias datés (noms successifs de la lignée politique)
    for (const seg of segs) {
      if (!seg.name) continue;
      const isCurrent = seg.name === c.currentName;
      await kg.upsertAlias(exec, {
        entity_id: polId, value: seg.name,
        alias_status: isCurrent ? 'visible' : 'predecessor',
        from_year: seg.startYear, to_year: seg.endYear,
        meaning: truncate([seg.type, seg.notes].filter(Boolean).join(' — '), 240),
      });
      counts.aliases++;
    }

    // Fait « fondation » au plus ancien segment
    if (segs.length && segs[0].startYear !== undefined) {
      const p = datePrec(segs[0].startYear);
      await kg.upsertFact(exec, {
        fact_type: 'fondation', subject_id: polId,
        start_year: segs[0].startYear, start_precision: p.precision, start_circa: p.circa,
        era_id: segs[0].era || null, label: segs[0].name, source_id: srcId,
      });
      counts.facts++;
    }

    // Relation situe-dans → continent
    if (c.continent && continentIdByName[c.continent]) {
      await kg.upsertRelation(exec, { rel_type: 'situe-dans', from_id: polId, to_id: continentIdByName[c.continent], source_id: srcId });
      counts.relations++;
    }

    // Relation pratique → religion
    if (c.religion) {
      const relId = await ensure('religion', c.religion, {});
      counts.religions = Object.keys(index).length; // approximé plus bas
      await kg.upsertRelation(exec, { rel_type: 'pratique', from_id: polId, to_id: relId, source_id: srcId });
      counts.relations++;
    }

    // Capitale actuelle → lieu (cité) + relation capitale-de
    const lastCap = [...segs].reverse().find(s => s.capital);
    if (lastCap && lastCap.capital) {
      const capId = await ensure('lieu', lastCap.capital, { data: { echelle: 'cite' } });
      await kg.upsertRelation(exec, { rel_type: 'capitale-de', from_id: capId, to_id: polId, start_year: lastCap.startYear, source_id: srcId });
      counts.capitals++;
      counts.relations++;
    }
  }

  // ── Civilisations disparues (entités politiques + fondation/chute) ─────
  const pendingSuccessions = [];
  for (const civ of (td.civilisationsDisparues || [])) {
    const civId = await ensure('entite-politique', civ.name, {
      summary: truncate(civ.notes, 240),
      data: { continent: civ.continent || null, disparue: true, type: civ.type || null },
    });
    counts.civs++;

    if (civ.startYear !== undefined) {
      const p = datePrec(civ.startYear);
      await kg.upsertFact(exec, { fact_type: 'fondation', subject_id: civId, start_year: civ.startYear, start_precision: p.precision, start_circa: p.circa, source_id: srcId });
      counts.facts++;
    }
    if (civ.endYear !== undefined) {
      const p = datePrec(civ.endYear);
      await kg.upsertFact(exec, { fact_type: 'chute', subject_id: civId, start_year: civ.endYear, start_precision: p.precision, start_circa: p.circa, source_id: srcId });
      counts.facts++;
    }
    if (civ.continent && continentIdByName[civ.continent]) {
      await kg.upsertRelation(exec, { rel_type: 'situe-dans', from_id: civId, to_id: continentIdByName[civ.continent], source_id: srcId });
      counts.relations++;
    }
    if (civ.successeur) pendingSuccessions.push({ civName: civ.name, successorName: civ.successeur });
  }

  // Successions (2e passe : le successeur doit exister)
  for (const s of pendingSuccessions) {
    const civId = index.get(key('entite-politique', s.civName));
    const succId = index.get(key('entite-politique', s.successorName));
    if (civId && succId) {
      await kg.upsertRelation(exec, { rel_type: 'succede-a', from_id: succId, to_id: civId, source_id: srcId });
      counts.relations++;
    }
  }

  // Compter les religions réellement créées
  counts.religions = [...index.keys()].filter(k => k.startsWith('religion|')).length;

  const stats = await kg.getStats(exec);
  const rep = await kg.getConsistencyReport(exec);
  console.log('\n✔ Migration terminée');
  console.log('  créé :', JSON.stringify(counts));
  console.log('  graphe :', JSON.stringify(stats));
  console.log('  cohérence :', JSON.stringify(rep.counts));
  if (rep.counts.erreur) {
    console.log('  ⚠ erreurs de cohérence :');
    rep.issues.filter(i => i.severity === 'erreur').slice(0, 10).forEach(i => console.log('    -', i.message));
  }
})().catch(e => { console.error('ÉCHEC migration:', e); process.exit(1); });
