#!/usr/bin/env node
/**
 * gen-annales-doc.js — Génère Docs/Lore/Chronologie/Annales des Âges.md
 * depuis les items statut:'nouveau' de data/annales.json.
 *
 * Usage : node scripts/gen-annales-doc.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'annales.json'), 'utf8'));
const OUT = path.join(ROOT, 'Docs', 'Lore', 'Chronologie', 'Annales des Âges.md');

const ERA_META = {
    III: { title: 'Ère III — les marges de l\'Âge du Lien', note: 'Les 7 puis 6 grands empires occupent la lumière des chroniques ; ces États ont vécu dans leurs interstices, leurs vassalités et leurs ruines. Datations rituelles de la Mémoire d\'Astravie.' },
    V: { title: 'Ère V — les royaumes de la survie (Grande Nuit)', note: 'Hors des Trois Grands (Tharnok, Forgon, Drahk\'Nor), la Grande Nuit fut un cimetière d\'États brefs. Le Fléau des Failles (~1 400-1 600 ap.A) en tua plusieurs d\'un coup.' },
    VI: { title: 'Ère VI — les chaînons manquants de l\'Ère des Nations', note: 'Entre les entités intermédiaires déjà recensées par [[Era 6 - L\'Ère des Nations]], d\'autres États ont vécu — et les guerres qui expliquent plusieurs chutes datées du canon.' },
    VII: { title: 'Ère VI tardive et Sillage — les ruines derrière les nations', note: 'Proto-États absorbés pendant la formation des 36 nations, et les conflits courts du Sillage — le présent n\'a pas de guerre mondiale, il a des saisons de guerre.' }
};

function entBlock(e) {
    let s = `**${e.name}** *(${e.type})* — ${e.continents.join(', ')} · ${e.startLabel} → ${e.endLabel}\n`;
    if (e.predecesseur) s += `- **Avant** : ${e.predecesseur}\n`;
    if (e.fondation) s += `- **Naissance** : ${e.fondation}\n`;
    if (e.souverains && e.souverains.length) {
        s += `- **Ont régné** : ` + e.souverains.map(r => r.nom + (r.regne ? ` (${r.regne})` : '') + (r.note ? ` — ${r.note}` : '')).join(' · ') + '\n';
    }
    if (e.chute) s += `- **Chute** : ${e.chute}\n`;
    if (e.successeur) s += `- **Après** : ${e.successeur}\n`;
    if (e.blurb) s += `\n> ${e.blurb}\n`;
    return s;
}

function confBlock(c) {
    let s = `**${c.name}** *(${c.type})* — ${c.continents.join(', ')} · ${c.label}\n`;
    if (c.belligerants && c.belligerants.length) s += `- **Belligérants** : ${c.belligerants.join(' ⚔ ')}\n`;
    if (c.batailles && c.batailles.length) {
        s += `- **Batailles** : ` + c.batailles.map(b => b.nom + (b.date ? ` (${b.date})` : '') + (b.note ? ` — ${b.note}` : '')).join(' · ') + '\n';
    }
    if (c.issue) s += `- **Issue** : ${c.issue}\n`;
    if (c.blurb) s += `\n> ${c.blurb}\n`;
    return s;
}

const news = d.entities.filter(e => e.statut === 'nouveau');
const newc = d.conflicts.filter(c => c.statut === 'nouveau');

let md = `---
tags: [lore, chronologie, annales, densification, guerres, royaumes-disparus]
type: lore
status: drafted
last_review: 2026-07-13
needs_review_for: [validation-nicolas]
---

# 📜 Annales des Âges — royaumes oubliés et guerres retrouvées

> Densification de l'histoire d'Hybelior : **${news.length} États disparus** et **${newc.length} conflits** qui ne figuraient dans aucune chronique — dispersés de l'Âge du Lien au Sillage. Chaque entrée a été confrontée au canon existant (dates, territoires, successions, styles de noms) avant inscription. L'ensemble est aussi tissé dans la [[Registre des Nations|trame des nations]] et visible sur la **Tapisserie des Âges** (Monde › Tapisserie).

> [!important] Statut canonique
> Ces Annales relèvent du **nouveau canon en validation** (\`status: drafted\`). Les entrées pré-Sillage relèvent de la Mémoire d'Astravie — datations rituelles, listes royales lacunaires, sources souvent issues des vainqueurs. Aucune entrée ne contredit les Ères, le Registre des Nations ou les fiches Pays ; plusieurs **expliquent** des chutes que le canon datait sans les raconter.

`;

for (const eraId of ['III', 'V', 'VI', 'VII']) {
    const meta = ERA_META[eraId];
    const ents = news.filter(e => e.era === eraId).sort((a, b) => a.startApA - b.startApA);
    const confs = newc.filter(c => (eraId === 'III' ? c.startApA < 0 : eraId === 'V' ? c.startApA >= 0 && c.startApA < 3000 : eraId === 'VI' ? c.startApA >= 3000 && c.startApA < 9500 : c.startApA >= 9500)).sort((a, b) => a.startApA - b.startApA);
    if (!ents.length && !confs.length) continue;
    md += `\n---\n\n## ${meta.title}\n\n> ${meta.note}\n\n`;
    if (ents.length) {
        md += `### États\n\n`;
        md += ents.map(entBlock).join('\n');
    }
    if (confs.length) {
        md += `\n### Guerres et batailles\n\n`;
        md += confs.map(confBlock).join('\n');
    }
}

md += `\n---\n\n*Liens : [[Chronologie - Index]] | [[Registre des Nations]] | [[Dynasties et Empires]] | [[Era 3a - Le Lien et les Empires]] | [[Era 5 - La Grande Nuit]] | [[Era 6 - L'Ère des Nations]]*\n`;

fs.writeFileSync(OUT, md, 'utf8');
console.log('Écrit :', OUT, '—', md.length, 'caractères,', news.length, 'États,', newc.length, 'conflits.');
