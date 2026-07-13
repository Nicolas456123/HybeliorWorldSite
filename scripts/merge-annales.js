#!/usr/bin/env node
/**
 * merge-annales.js — Fusionne les lots de densification (workflow Annales des Âges)
 * dans data/annales.json, avec contrôles de cohérence.
 *
 * Usage : node scripts/merge-annales.js <chemin-du-resultat-workflow.json>
 * Le fichier d'entrée doit contenir { result: { slices: { <key>: {entities, conflicts} } } }
 * ou directement { slices: ... }.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ANNALES = path.join(ROOT, 'data', 'annales.json');

const inPath = process.argv[2];
if (!inPath) { console.error('usage: node scripts/merge-annales.js <resultat.json>'); process.exit(1); }

const raw = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const slices = (raw.result && raw.result.slices) || raw.slices;
if (!slices) { console.error('slices introuvables dans le fichier'); process.exit(1); }

const annales = JSON.parse(fs.readFileSync(ANNALES, 'utf8'));

function slugify(name) {
    return name.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/['']/g, '-')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
function eraOf(startApA, endApA) {
    const mid = (startApA + endApA) / 2;
    if (mid < 0) return 'III';
    if (mid < 3000) return 'V';
    if (mid < 9500) return 'VI';
    return 'VII';
}

const existingIds = new Set(annales.entities.map(e => e.id).concat(annales.conflicts.map(c => c.id)));
const existingNames = new Set(annales.entities.map(e => e.name.toLowerCase()).concat(annales.conflicts.map(c => c.name.toLowerCase())));
const report = { added: { entities: 0, conflicts: 0 }, skipped: [], fixedDates: [] };

for (const key of Object.keys(slices)) {
    const batch = slices[key];
    if (!batch) continue;

    for (const e of batch.entities || []) {
        if (existingNames.has(e.name.toLowerCase())) { report.skipped.push('entité en collision: ' + e.name); continue; }
        if (typeof e.startApA !== 'number' || typeof e.endApA !== 'number' || e.startApA >= e.endApA) {
            report.skipped.push('entité aux dates invalides: ' + e.name + ' [' + e.startApA + ',' + e.endApA + ']'); continue;
        }
        let id = slugify(e.name), n = 2;
        while (existingIds.has(id)) id = slugify(e.name) + '-' + n++;
        const entity = {
            id, name: e.name, type: e.type || 'royaume',
            continents: e.continents && e.continents.length ? e.continents : ['Transcontinental'],
            startApA: e.startApA, endApA: e.endApA,
            startLabel: e.startLabel || String(e.startApA), endLabel: e.endLabel || String(e.endApA),
            era: eraOf(e.startApA, e.endApA), statut: 'nouveau',
            fondation: e.fondation || '', chute: e.chute || '',
            souverains: e.souverains || [],
            predecesseur: e.predecesseur || '', successeur: e.successeur || '',
            blurb: e.blurb || ''
        };
        annales.entities.push(entity);
        existingIds.add(id); existingNames.add(e.name.toLowerCase());
        report.added.entities++;
    }

    for (const c of batch.conflicts || []) {
        if (existingNames.has(c.name.toLowerCase())) { report.skipped.push('conflit en collision: ' + c.name); continue; }
        if (typeof c.startApA !== 'number' || typeof c.endApA !== 'number') {
            report.skipped.push('conflit aux dates invalides: ' + c.name); continue;
        }
        if (c.endApA < c.startApA) { const t = c.startApA; c.startApA = c.endApA; c.endApA = t; report.fixedDates.push(c.name); }
        let id = slugify(c.name), n = 2;
        while (existingIds.has(id)) id = slugify(c.name) + '-' + n++;
        const conflict = {
            id, name: c.name, type: c.type || 'guerre',
            continents: c.continents && c.continents.length ? c.continents : ['Transcontinental'],
            startApA: c.startApA, endApA: c.endApA,
            label: c.label || '', belligerants: c.belligerants || [],
            batailles: c.batailles || [], issue: c.issue || '',
            statut: 'nouveau', blurb: c.blurb || ''
        };
        annales.conflicts.push(conflict);
        existingIds.add(id); existingNames.add(c.name.toLowerCase());
        report.added.conflicts++;
    }
}

annales.entities.sort((a, b) => a.startApA - b.startApA);
annales.conflicts.sort((a, b) => a.startApA - b.startApA);

fs.writeFileSync(ANNALES, JSON.stringify(annales, null, 1).replace(/\n +/g, m => m.length > 3 ? ' ' : m) , 'utf8');
// Note : réécrit compact (indentation 1) pour limiter la taille du fichier.

console.log('Ajouté :', report.added.entities, 'entités,', report.added.conflicts, 'conflits.');
if (report.fixedDates.length) console.log('Dates inversées corrigées :', report.fixedDates.join(' · '));
if (report.skipped.length) { console.log('Écartés (' + report.skipped.length + ') :'); report.skipped.forEach(s => console.log('  -', s)); }
console.log('Totaux :', annales.entities.length, 'entités,', annales.conflicts.length, 'conflits.');
