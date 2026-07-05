#!/usr/bin/env node
// Génère du SQL INSERT pour les tables timeline_eras et timeline_names
// Sortie : JSON à coller dans le console Turso via JavaScript

const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/timeline-names.json');
const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const td = raw.timelineData;

function formatDateLabel(start, end) {
  function fmt(y) {
    if (y <= -100000) return 'Temps Primordiaux';
    if (y < 0) return '~' + Math.abs(y).toLocaleString('fr-FR') + ' av.A';
    return '~' + y.toLocaleString('fr-FR') + ' ap.A';
  }
  return fmt(start) + ' -> ' + fmt(end);
}

function esc(s) {
  return String(s || '').replace(/'/g, "''");
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
        parsedNames.push({ place_name: c.historicalName, place_type: 'continent', era_id: era.id, historical_name: c.historicalName, visibility: 'visible', meaning: c.meaning || '' });
      } else {
        parsedNames.push({ place_name: c.currentName, place_type: 'continent', era_id: era.id, historical_name: c.historicalName, visibility: 'visible', meaning: c.meaning || '' });
      }
    });
  }
});

if (td.countries) {
  td.countries.forEach(country => {
    const name = country.currentName || country.name;
    if (country.timeline) {
      country.timeline.forEach(entry => {
        const matchingEra = parsedEras.find(e => entry.startYear >= e.start_year && entry.startYear < e.end_year) || parsedEras.find(e => e.id === entry.era);
        if (matchingEra) {
          parsedNames.push({ place_name: name, place_type: 'pays', era_id: matchingEra.id, historical_name: entry.name || name, visibility: entry.name === name ? 'visible' : 'predecessor', meaning: '' });
        }
      });
      parsedEras.forEach(era => {
        const hasEntry = parsedNames.some(n => n.place_name === name && n.era_id === era.id);
        if (!hasEntry) {
          const existsInEra = country.timeline.some(t => t.startYear <= (era.end_year || era.start_year) && t.endYear >= era.start_year);
          if (!existsInEra) {
            parsedNames.push({ place_name: name, place_type: 'pays', era_id: era.id, historical_name: name, visibility: 'hidden', meaning: '' });
          }
        }
      });
    }
    if (country.existsInEras) {
      country.existsInEras.forEach(eraId => {
        const existing = parsedNames.find(n => n.place_name === name && n.era_id === eraId);
        if (!existing) {
          parsedNames.push({ place_name: name, place_type: 'pays', era_id: eraId, historical_name: (country.eraNames && country.eraNames[eraId]) || name, visibility: 'visible', meaning: '' });
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
        const matchingEra = parsedEras.find(e => e.id === entry.era) || parsedEras.find(e => entry.startYear >= e.start_year && entry.startYear < e.end_year);
        if (matchingEra) {
          parsedNames.push({ place_name: name, place_type: 'pays', era_id: matchingEra.id, historical_name: entry.name || name, visibility: 'vanished', meaning: '' });
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

// Générer le SQL
const lines = [];

// Eras
lines.push('-- TIMELINE ERAS');
parsedEras.forEach(e => {
  lines.push(`INSERT OR REPLACE INTO timeline_eras (id, label, date_label, description, start_year, end_year, sort_order) VALUES ('${esc(e.id)}','${esc(e.label)}','${esc(e.date_label)}','${esc(e.description)}',${e.start_year},${e.end_year},${e.sort_order});`);
});

lines.push('-- TIMELINE NAMES');
parsedNames.forEach(n => {
  lines.push(`INSERT OR REPLACE INTO timeline_names (place_name, place_type, era_id, historical_name, visibility, meaning) VALUES ('${esc(n.place_name)}','${esc(n.place_type)}','${esc(n.era_id)}','${esc(n.historical_name)}','${esc(n.visibility)}','${esc(n.meaning)}');`);
});

const outPath = path.join(__dirname, '../scripts/timeline-data.sql');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');

console.log(`Généré: ${parsedEras.length} ères + ${parsedNames.length} noms`);
console.log(`Fichier: ${outPath}`);
console.log(`Taille: ${(lines.join('\n').length / 1024).toFixed(1)} KB`);
