#!/usr/bin/env node
// Script local pour populer les tables timeline_eras et timeline_names dans Turso
// Utilise directement l'API HTTP Turso (sans passer par l'API Vercel)

const fs = require('fs');
const path = require('path');

const TURSO_URL = process.argv[2];
const TURSO_TOKEN = process.argv[3];

if (!TURSO_URL || !TURSO_TOKEN) {
  console.error('Usage: node populate-turso.js <turso_https_url> <token>');
  console.error('Ex: node populate-turso.js https://hybelior-map-nicolas456123.aws-eu-west-1.turso.io eyJ...');
  process.exit(1);
}

const jsonPath = path.join(__dirname, '../data/timeline-names.json');
const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const td = raw.timelineData;

// ---- Transformation identique a timeline-init.html ----
function formatDateLabel(start, end) {
  function fmt(y) {
    if (y <= -100000) return 'Temps Primordiaux';
    if (y < 0) return '~' + Math.abs(y).toLocaleString() + ' av.A';
    return '~' + y.toLocaleString() + ' ap.A';
  }
  return fmt(start) + ' → ' + fmt(end);
}

let parsedEras = [];
let parsedNames = [];

td.eras.forEach((era, idx) => {
  parsedEras.push({
    id: era.id,
    label: era.name || era.label || era.id,
    date_label: formatDateLabel(era.startYear, era.endYear),
    description: era.description || '',
    start_year: era.startYear || 0,
    end_year: era.endYear || 0,
    sort_order: idx
  });

  if (era.continents) {
    era.continents.forEach(c => {
      if (c.currentName === 'ALL' || c.currentName === 'ALL_NORD' || c.currentName === 'ALL_SUD') {
        parsedNames.push({
          place_name: c.historicalName,
          place_type: 'continent',
          era_id: era.id,
          historical_name: c.historicalName,
          visibility: 'visible',
          meaning: c.meaning || ''
        });
      } else {
        parsedNames.push({
          place_name: c.currentName,
          place_type: 'continent',
          era_id: era.id,
          historical_name: c.historicalName,
          visibility: 'visible',
          meaning: c.meaning || ''
        });
      }
    });
  }
});

if (td.countries) {
  td.countries.forEach(country => {
    const name = country.currentName || country.name;
    if (country.timeline) {
      country.timeline.forEach(entry => {
        const matchingEra = parsedEras.find(e =>
          entry.startYear >= e.start_year && entry.startYear < e.end_year
        ) || parsedEras.find(e => e.id === entry.era);
        if (matchingEra) {
          parsedNames.push({
            place_name: name,
            place_type: 'pays',
            era_id: matchingEra.id,
            historical_name: entry.name || name,
            visibility: entry.name === name ? 'visible' : 'predecessor',
            meaning: ''
          });
        }
      });
      parsedEras.forEach(era => {
        const hasEntry = parsedNames.some(n => n.place_name === name && n.era_id === era.id);
        if (!hasEntry) {
          const existsInEra = country.timeline.some(t =>
            t.startYear <= (era.end_year || era.start_year) && t.endYear >= era.start_year
          );
          if (!existsInEra) {
            parsedNames.push({
              place_name: name, place_type: 'pays', era_id: era.id,
              historical_name: name, visibility: 'hidden', meaning: ''
            });
          }
        }
      });
    }
    if (country.existsInEras) {
      country.existsInEras.forEach(eraId => {
        const existing = parsedNames.find(n => n.place_name === name && n.era_id === eraId);
        if (!existing) {
          parsedNames.push({
            place_name: name, place_type: 'pays', era_id: eraId,
            historical_name: (country.eraNames && country.eraNames[eraId]) || name,
            visibility: 'visible', meaning: ''
          });
        }
      });
    }
  });
}

if (td.extinctCivilizations) {
  td.extinctCivilizations.forEach(civ => {
    const name = civ.name || civ.currentName;
    if (civ.timeline) {
      civ.timeline.forEach(entry => {
        const matchingEra = parsedEras.find(e => e.id === entry.era) ||
          parsedEras.find(e => entry.startYear >= e.start_year && entry.startYear < e.end_year);
        if (matchingEra) {
          parsedNames.push({
            place_name: name, place_type: 'pays', era_id: matchingEra.id,
            historical_name: entry.name || name, visibility: 'vanished', meaning: ''
          });
        }
      });
    }
  });
}

// Deduplicate
const seen = new Set();
parsedNames = parsedNames.filter(n => {
  const key = `${n.place_name}|${n.place_type}|${n.era_id}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log(`Eres: ${parsedEras.length}`);
console.log(`Noms historiques: ${parsedNames.length}`);

// ---- Envoi vers Turso HTTP API ----
async function tursoBatch(statements) {
  const requests = statements.map(s => ({ type: 'execute', stmt: { sql: s.sql, args: s.args } }));
  requests.push({ type: 'close' });
  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requests })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Turso error ${res.status}: ${txt}`);
  }
  return res.json();
}

async function main() {
  // Insérer les ères par batch de 30
  console.log('Insertion des ères...');
  const BATCH = 30;
  for (let i = 0; i < parsedEras.length; i += BATCH) {
    const batch = parsedEras.slice(i, i + BATCH);
    const stmts = batch.map(e => ({
      sql: `INSERT INTO timeline_eras (id, label, date_label, description, start_year, end_year, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET label=?, date_label=?, description=?, start_year=?, end_year=?, sort_order=?`,
      args: [
        { type: 'text', value: e.id },
        { type: 'text', value: e.label },
        { type: 'text', value: e.date_label },
        { type: 'text', value: e.description },
        { type: 'integer', value: e.start_year },
        { type: 'integer', value: e.end_year },
        { type: 'integer', value: e.sort_order },
        { type: 'text', value: e.label },
        { type: 'text', value: e.date_label },
        { type: 'text', value: e.description },
        { type: 'integer', value: e.start_year },
        { type: 'integer', value: e.end_year },
        { type: 'integer', value: e.sort_order }
      ]
    }));
    await tursoBatch(stmts);
    console.log(`  Ères: ${Math.min(i + BATCH, parsedEras.length)}/${parsedEras.length}`);
  }

  // Insérer les noms par batch de 30
  console.log('Insertion des noms historiques...');
  let sent = 0;
  for (let i = 0; i < parsedNames.length; i += BATCH) {
    const batch = parsedNames.slice(i, i + BATCH);
    const stmts = batch.map(n => ({
      sql: `INSERT INTO timeline_names (place_name, place_type, era_id, historical_name, visibility, meaning)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(place_name, place_type, era_id) DO UPDATE SET historical_name=?, visibility=?, meaning=?`,
      args: [
        { type: 'text', value: n.place_name },
        { type: 'text', value: n.place_type },
        { type: 'text', value: n.era_id },
        { type: 'text', value: n.historical_name },
        { type: 'text', value: n.visibility },
        { type: 'text', value: n.meaning },
        { type: 'text', value: n.historical_name },
        { type: 'text', value: n.visibility },
        { type: 'text', value: n.meaning }
      ]
    }));
    await tursoBatch(stmts);
    sent += batch.length;
    process.stdout.write(`\r  Noms: ${sent}/${parsedNames.length}`);
  }
  console.log('\n=== TERMINE ===');
}

main().catch(err => { console.error('ERREUR:', err.message); process.exit(1); });
