#!/usr/bin/env node
/**
 * gen-doc-manifest.js
 *
 * Scanne `HybeliorWorldSite/Docs/` et produit `Docs/_manifest.json` :
 *   {
 *     "GDD/05 - Implémentation Unreal/Combat et Capacités": [
 *       { "name": "Abilities Combat", "file": "Abilities Combat.md", "title": "Abilities Combat" },
 *       ...
 *     ],
 *     ...
 *   }
 *
 * Le client (md-renderer.js) charge ce manifeste pour résoudre les blocs
 * `dataview FROM "X"` en grilles de cartes cliquables.
 *
 * Le titre de chaque fichier est extrait du premier `# H1` du markdown,
 * sinon fallback sur le nom de fichier sans extension.
 *
 * Usage :
 *   node scripts/gen-doc-manifest.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'Docs');
const OUT  = path.join(DOCS, '_manifest.json');

function extractTitle(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Strip frontmatter
        let body = content;
        if (body.startsWith('---')) {
            const end = body.indexOf('\n---', 3);
            if (end !== -1) body = body.slice(end + 4);
        }
        const m = body.match(/^\s*#\s+(.+?)\s*$/m);
        return m ? m[1].trim() : null;
    } catch {
        return null;
    }
}

function walkDir(dir) {
    const out = {};
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const mdFiles = entries
        .filter(e => e.isFile() && e.name.toLowerCase().endsWith('.md'))
        .map(e => e.name)
        .sort();

    if (mdFiles.length > 0) {
        const relDir = path.relative(DOCS, dir).split(path.sep).join('/');
        const list = mdFiles
            .filter(name => name !== 'Index.md' && !name.startsWith('_')) // exclut Index.md et _Files
            .map(name => {
                const full = path.join(dir, name);
                const baseName = name.replace(/\.md$/i, '');
                const title = extractTitle(full) || baseName;
                return { name: baseName, file: name, title };
            });
        if (list.length > 0) out[relDir] = list;
    }

    // Récursion
    for (const e of entries) {
        if (e.isDirectory() && !e.name.startsWith('.')) {
            const sub = walkDir(path.join(dir, e.name));
            Object.assign(out, sub);
        }
    }

    return out;
}

function main() {
    if (!fs.existsSync(DOCS)) {
        console.error('Docs/ introuvable :', DOCS);
        process.exit(1);
    }
    console.log('Scan de', DOCS);
    const manifest = walkDir(DOCS);
    fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2), 'utf8');
    const count = Object.keys(manifest).length;
    const total = Object.values(manifest).reduce((s, l) => s + l.length, 0);
    console.log(`OK : ${count} dossiers, ${total} fichiers indexés → ${OUT}`);
}

main();
