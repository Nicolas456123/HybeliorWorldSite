'use strict';
/*
 * scripts/migrate-kg.js — Génère data/kg-base.json (la base statique du graphe)
 * depuis les données chronologiques existantes + le canon des mystères/romans.
 *
 * Le résultat est COMMITTÉ dans le repo : c'est « toutes les données sur le
 * site directement ». Turso ne sert ensuite qu'à la surcouche (modifications).
 *
 *   • ères                → entités « ere » (id = slug d'origine)
 *   • continents          → lieux (échelle continent) + noms historiques (alias datés)
 *   • nations             → entités politiques + alias datés + fait « fondation »
 *                           + relations situe-dans / pratique / capitale-de
 *   • civilisations mortes → entités politiques + faits fondation/chute + succède-à
 *   • mystères protégés    → entités « question » à lectures concurrentes
 *   • romans               → entités « oeuvre » (trilogie + 3 tomes)
 *
 * Usage :  node scripts/migrate-kg.js   (écrit data/kg-base.json)
 */

const fs = require('fs');
const path = require('path');
const kg = require('../lib/kg-core.js');
const data = require('../data/timeline-names.json');

const WHEN = '2026-07-17T00:00:00.000Z'; // horodatage fixe → base déterministe

const g = kg.emptyGraph();
function write(action, payload) {
  const { ops, result } = kg.prepareWrite(g, action, payload, WHEN);
  kg.applyOps(g, ops);
  return result;
}

const index = new Map();
const keyOf = (type, name) => `${type}|${name}`;
function ensure(type, name, extra) {
  const k = keyOf(type, name);
  if (index.has(k)) return index.get(k);
  const e = write('save-entity', Object.assign({ type, name }, extra || {})).entity;
  index.set(k, e.id);
  return e.id;
}

function datePrec(year) {
  if (year === null || year === undefined) return { precision: 'annee', circa: 0 };
  if (year < -1000) return { precision: 'estimation', circa: 1 };
  return { precision: 'annee', circa: 0 };
}
function truncate(s, n) { if (!s) return null; return s.length > n ? s.slice(0, n - 1) + '…' : s; }

(function main() {
  const td = data.timelineData;
  const counts = { eras: 0, continents: 0, aliases: 0, nations: 0, civs: 0, religions: 0, facts: 0, relations: 0, capitals: 0, lectures: 0, mysteres: 0, oeuvres: 0 };

  const srcId = ensure('source', 'Chroniques d’Hybélior (chronologie canonique)', {
    summary: 'Chronologie et noms historiques agrégés — provenance des faits migrés.',
    data: { rang: 'chronique-interne' },
  });

  // Ères (id = slug d'origine)
  for (const era of td.eras) {
    write('save-entity', { id: era.id, type: 'ere', name: era.name, summary: era.description, data: { startYear: era.startYear, endYear: era.endYear } });
    index.set(keyOf('ere', era.name), era.id);
    counts.eras++;
  }

  // Continents + noms historiques datés
  const continentIdByName = {};
  for (const ct of td.continentTimelines) {
    const id = ensure('lieu', ct.currentName, { data: { echelle: 'continent' } });
    continentIdByName[ct.currentName] = id;
    counts.continents++;
    for (const seg of (ct.timeline || [])) {
      if (!seg.name) continue;
      write('save-alias', { entity_id: id, value: seg.name, alias_status: seg.name === ct.currentName ? 'visible' : 'predecessor', from_year: seg.startYear, to_year: seg.endYear });
      counts.aliases++;
    }
  }

  // Nations
  for (const c of td.countries) {
    const polId = ensure('entite-politique', c.currentName, { data: { continent: c.continent || null, religion: c.religion || null } });
    counts.nations++;
    const segs = (c.timeline || []).slice().sort((a, b) => (a.startYear ?? 0) - (b.startYear ?? 0));
    for (const seg of segs) {
      if (!seg.name) continue;
      write('save-alias', {
        entity_id: polId, value: seg.name,
        alias_status: seg.name === c.currentName ? 'visible' : 'predecessor',
        from_year: seg.startYear, to_year: seg.endYear,
        meaning: truncate([seg.type, seg.notes].filter(Boolean).join(' — '), 240),
      });
      counts.aliases++;
    }
    if (segs.length && segs[0].startYear !== undefined) {
      const p = datePrec(segs[0].startYear);
      write('save-fact', { fact_type: 'fondation', subject_id: polId, start_year: segs[0].startYear, start_precision: p.precision, start_circa: p.circa, era_id: segs[0].era || null, label: segs[0].name, source_id: srcId });
      counts.facts++;
    }
    if (c.continent && continentIdByName[c.continent]) { write('save-relation', { rel_type: 'situe-dans', from_id: polId, to_id: continentIdByName[c.continent], source_id: srcId }); counts.relations++; }
    if (c.religion) { const relId = ensure('religion', c.religion, {}); write('save-relation', { rel_type: 'pratique', from_id: polId, to_id: relId, source_id: srcId }); counts.relations++; }
    const lastCap = [...segs].reverse().find(s => s.capital);
    if (lastCap && lastCap.capital) { const capId = ensure('lieu', lastCap.capital, { data: { echelle: 'cite' } }); write('save-relation', { rel_type: 'capitale-de', from_id: capId, to_id: polId, start_year: lastCap.startYear, source_id: srcId }); counts.capitals++; counts.relations++; }
  }

  // Civilisations disparues
  const pendingSuccessions = [];
  for (const civ of (td.civilisationsDisparues || [])) {
    const civId = ensure('entite-politique', civ.name, { summary: truncate(civ.notes, 240), data: { continent: civ.continent || null, disparue: true, type: civ.type || null } });
    counts.civs++;
    if (civ.startYear !== undefined) { const p = datePrec(civ.startYear); write('save-fact', { fact_type: 'fondation', subject_id: civId, start_year: civ.startYear, start_precision: p.precision, start_circa: p.circa, source_id: srcId }); counts.facts++; }
    if (civ.endYear !== undefined) { const p = datePrec(civ.endYear); write('save-fact', { fact_type: 'chute', subject_id: civId, start_year: civ.endYear, start_precision: p.precision, start_circa: p.circa, source_id: srcId }); counts.facts++; }
    if (civ.continent && continentIdByName[civ.continent]) { write('save-relation', { rel_type: 'situe-dans', from_id: civId, to_id: continentIdByName[civ.continent], source_id: srcId }); counts.relations++; }
    if (civ.successeur) pendingSuccessions.push({ civName: civ.name, successorName: civ.successeur });
  }
  for (const s of pendingSuccessions) {
    const civId = index.get(keyOf('entite-politique', s.civName));
    const succId = index.get(keyOf('entite-politique', s.successorName));
    if (civId && succId) { write('save-relation', { rel_type: 'succede-a', from_id: succId, to_id: civId, source_id: srcId }); counts.relations++; }
  }

  // Romans (œuvres)
  const trilogieId = ensure('oeuvre', 'Les Trois Coups (trilogie)', { summary: 'Trilogie — l’Arrachement, le Fléau des Failles, le Sillage.', data: { forme: 'trilogie' } });
  const romanId = {};
  for (const r of [
    { cle: 't1', titre: 'La Septième Heure', tome: 1, epoque: 'l’Arrachement, An 0' },
    { cle: 't2', titre: 'L’Heure qui se Referme', tome: 2, epoque: '~1 400–1 600 ap.A (Ère V, la Grande Nuit)' },
    { cle: 't3', titre: 'L’Heure qui Naît', tome: 3, epoque: 'an 251 / ~10 200 ap.A (le Sillage)' },
  ]) {
    const id = ensure('oeuvre', `${r.titre} (T${r.tome})`, { summary: `Tome ${r.tome} de « Les Trois Coups » — ${r.epoque}.`, data: { trilogie: 'Les Trois Coups', tome: r.tome, epoque: r.epoque } });
    romanId[r.cle] = id;
    write('save-relation', { rel_type: 'membre-de', from_id: id, to_id: trilogieId }); counts.relations++;
  }

  // Mystères protégés (questions à lectures concurrentes)
  const MYSTERES = [
    { nom: 'La cause de l’Arrachement', q: 'Qu’est-ce qui a causé l’Arrachement ? (protéger la cause, jamais la classe)', lie: 't1',
      lectures: ['Un Souffle Cardinal passant sur une trame pleine — une marée basse de plus (image native)', 'La roue faussée (lecture des Rota Mundi)', 'Une punition ou une purge', 'L’acte rituel des Huit — la lecture verithane, jamais prouvée'] },
    { nom: 'La causalité du geste de l’Étudiant', q: 'Le rituel des Huit a-t-il réellement causé l’Arrachement ?', lie: 't1',
      lectures: ['Les Huit croient avoir agi (lecture verithane)', 'Rien ne le prouve — le delta de Mirathis et la « silhouette de plus » de Verkan sont les garde-fous'] },
    { nom: '« Revenir ou commencer »', q: 'La voix du T3 annonce-t-elle le retour du Lien ou une naissance neuve ? Et qui parle à la dernière page ?', lie: 't3',
      lectures: ['Le Lien qui revient (retissage en cours)', 'Une naissance neuve', 'Voix finale : Ilex, ou le dessous — jamais tranché'] },
    { nom: 'L’auteur de la Guerre de l’Ombre', q: 'Qui est derrière la Guerre de l’Ombre ?', lie: 't3',
      lectures: ['Les Fils de l’Abîme — le « suspect commode »', 'Une troisième chose qui ne signe rien', 'Jamais revendiqué — Sanne meurt sans visage, sans revendication'] },
    { nom: 'La cause du Fléau et de « l’Heure »', q: 'Qu’est-ce qui a déclenché le Fléau, et pourquoi l’Heure le referme ?', lie: 't2',
      lectures: ['Une blessure qui suppure', 'La roue faussée', 'Une purge', 'L’Étranger des Heures', 'L’Heure « n’explique rien » — aucun « donc » entre extinction des Tisses et fermeture des Failles'] },
    { nom: 'La cause des Souffles Cardinaux', q: 'Qu’est-ce qui déclenche un Souffle Cardinal (Premier Don, Fracture, Arrachement) ?',
      lectures: ['Inconnaissable — aucune lecture ne s’est imposée', 'Une cause différente à chaque déchirure'] },
    { nom: 'Les termes exacts du Pacte Primordial', q: 'Qu’a-t-on promis, exactement, dans le Pacte Primordial ?',
      lectures: ['Nul ne sait ce qui fut promis', 'Seuls les contractants — Éternels et Cosmiques — sont établis'] },
    { nom: 'Le retrait de Navigor', q: 'Pourquoi Navigor s’est-il retiré ?',
      lectures: ['Retiré de lui-même', 'Il chuchote seulement', 'Poussé par quelqu’un que nous n’avons pas vu (vision de Vorath)'] },
    { nom: 'Le sort d’Aldric Valthen', q: 'Qu’est devenu Aldric Valthen ?',
      lectures: ['Mort', 'Attendant au-delà d’un seuil', 'Hors du temps — les trois cartes, jamais résolues'] },
    { nom: 'La filiation de « l’enfant qui entend »', q: 'Qui sont les parents de l’enfant qui entend (coda T2) ?', lie: 't2',
      lectures: ['Laissée ouverte', 'L’identité de la fileuse au cahier demeure inconnue'] },
    { nom: 'Le Panghor, le dessous, la Profondeur Première', q: 'Cinq noms pour une même chose, ou cinq peurs distinctes ?',
      lectures: ['Cinq noms, peut-être, pour une même chose', 'Cinq peurs sans objet commun — référent jamais identifié'] },
    { nom: 'Le Mangeur de Temps', q: 'Créature ou culte ?',
      lectures: ['Une créature — montrée par ses seuls effets, jamais vue', 'Un culte — les Mangeurs jouent de la confusion'] },
    { nom: 'L’heure exacte du geste de l’An 0', q: 'À quelle heure le geste de l’An 0 a-t-il eu lieu ?',
      lectures: ['L’aube', 'Minuit', 'Midi — coexistence voulue selon les traditions'] },
  ];
  for (const m of MYSTERES) {
    const qid = ensure('question', m.nom, { summary: m.q, data: { protege: true }, status: 'lecture-disputee' });
    let ord = 1;
    for (const lect of m.lectures) { write('save-reading', { question_id: qid, text: lect, ordinal: ord++ }); counts.lectures++; }
    counts.mysteres++;
    if (m.lie && romanId[m.lie]) { write('save-relation', { rel_type: 'lie-a', from_id: romanId[m.lie], to_id: qid }); counts.relations++; }
  }

  counts.religions = [...index.keys()].filter(k => k.startsWith('religion|')).length;
  counts.oeuvres = [...index.keys()].filter(k => k.startsWith('oeuvre|')).length;

  // Émission de la base
  const base = {
    _meta: { generatedFrom: 'data/timeline-names.json + Canon mystères/romans', generatedAt: WHEN },
    entities: g.entities, facts: g.facts, relations: g.relations, aliases: g.aliases, readings: g.readings,
  };
  const outPath = path.join(__dirname, '..', 'data', 'kg-base.json');
  fs.writeFileSync(outPath, JSON.stringify(base, null, 1));

  const rep = kg.getConsistencyReport(g);
  const stats = kg.getStats(g);
  console.log('✔ Base générée →', outPath);
  console.log('  créé :', JSON.stringify(counts));
  console.log('  graphe :', JSON.stringify(stats));
  console.log('  cohérence :', JSON.stringify(rep.counts));
  if (rep.counts.erreur) { rep.issues.filter(i => i.severity === 'erreur').slice(0, 10).forEach(i => console.log('    -', i.message)); process.exit(1); }
})();
