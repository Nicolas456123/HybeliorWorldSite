#!/usr/bin/env node
/**
 * gen-search-index.js
 *
 * Scanne `HybeliorWorldSite/Docs/` (récursif) et produit `Docs/_search-index.json`
 * pour alimenter la recherche globale du site (js/site-search.js).
 *
 * Pour chaque fichier .md, extrait :
 *   - path        : chemin relatif depuis Docs/
 *   - title       : H1 (sans emoji) ou nom de fichier
 *   - subtitle    : 1ère ligne blockquote (> ...) après le H1, tronquée à 120 chars
 *   - category    : auto-inférée depuis le path (voir CATEGORY_MAP)
 *   - tags        : frontmatter YAML tags
 *   - keywords    : mots gras **xxx**, wikilinks [[xxx]], noms propres (≤50)
 *   - snippet     : ~200 premiers chars de prose (skip frontmatter, h1, blockquote, headings)
 *   - route       : URL hash de navigation (depuis nav-config.js, sinon #md/{path})
 *
 * Usage :
 *   node scripts/gen-search-index.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'Docs');
const NAV_CONFIG_PATH = path.join(ROOT, 'js', 'nav-config.js');
const OUT = path.join(DOCS, '_search-index.json');

// ============================================================
// Catégories : prefix -> label
// ============================================================
const CATEGORY_MAP = [
    { prefix: 'Lore/Chroniques/', label: 'Chroniques' },
    { prefix: 'Lore/Chroniques', label: 'Chroniques' },
    { prefix: 'Lore/Histoires/', label: 'Histoires & Nations' },
    { prefix: 'Lore/Pays/', label: 'Histoires & Nations' },
    { prefix: 'Lore/Religions/', label: 'Religions' },
    { prefix: 'Lore/Chronologie/', label: 'Chronologie' },
    { prefix: 'Lore/_Analyse/', label: 'Lore — Analyse' },
    { prefix: 'Lore/_Audio/', label: 'Lore — Audio' },
    { prefix: 'Lore/', label: 'Lore' },
    { prefix: 'GDD/01 - Vision/', label: 'Vision' },
    { prefix: 'GDD/02 - Monde/', label: 'Le monde' },
    { prefix: 'GDD/03 - Mécaniques/', label: 'Mécaniques' },
    { prefix: 'GDD/04 - Systèmes/', label: 'Systèmes' },
    { prefix: 'GDD/', label: 'GDD' },
];

function inferCategory(relPath) {
    for (const { prefix, label } of CATEGORY_MAP) {
        if (relPath.startsWith(prefix)) return label;
    }
    return 'Autre';
}

// ============================================================
// Construction du mapping src -> route depuis nav-config.js
// On parse à la regex (pas de require, le fichier expose `window.NavConfig`).
// ============================================================
function buildRouteMap() {
    const map = {}; // relSrc (normalisé) -> hash route
    if (!fs.existsSync(NAV_CONFIG_PATH)) return map;
    const raw = fs.readFileSync(NAV_CONFIG_PATH, 'utf8');

    // On cible chaque bloc subtabs.X : { ... tabs: [ ... ] }
    // Plus simple : extraire tous les `{ key: '...', label: '...', src: '...' }` avec leur contexte.
    // On localise chaque section par "<sectionKey>:\s*{" et on extrait les tabs jusqu'à la fermeture.
    // Cette regex matche : key: 'xx',  ... src: 'src.md'
    // (les éventuels engine: 'html' sont ignorés car non destinés à un .md)
    const sections = ['vision', 'monde', 'mecaniques', 'systemes', 'histoires'];

    for (const section of sections) {
        // Trouver le bloc subtabs.section
        const sectionRe = new RegExp(
            `\\b${section}\\s*:\\s*\\{[\\s\\S]*?tabs\\s*:\\s*(?:\\(function[^]*?return\\s*)?\\[([\\s\\S]*?)\\]`,
            'm'
        );
        const m = sectionRe.exec(raw);
        if (!m) continue;
        const tabsBlock = m[1];

        // Extraire chaque entry { key: '...', ... src: '...' }
        // On veut éviter les entries avec engine: 'html'.
        const entryRe = /\{\s*key\s*:\s*['"]([^'"]+)['"][\s\S]*?src\s*:\s*['"]([^'"]+)['"]([\s\S]*?)\}/g;
        let em;
        while ((em = entryRe.exec(tabsBlock)) !== null) {
            const key = em[1];
            const src = em[2];
            const tail = em[3] || '';
            // Si engine: 'html' explicitement, on saute
            if (/engine\s*:\s*['"]html['"]/.test(tail)) continue;
            // src commençant par "/pages/" = page HTML, on saute
            if (src.startsWith('/pages/')) continue;
            // Normaliser src (séparateurs)
            const normSrc = src.replace(/\\/g, '/');
            map[normSrc] = `#${section}/${key}`;
        }
    }
    return map;
}

// ============================================================
// Helpers
// ============================================================

// Retire les emojis (plages courantes) et caractères de présentation Unicode (FE0F)
function stripEmoji(s) {
    if (!s) return s;
    return s
        .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
        .replace(/[\u{2600}-\u{27BF}]/gu, '')
        .replace(/[\u{2300}-\u{23FF}]/gu, '')
        .replace(/️/g, '')
        .replace(/‍/g, '')
        .trim();
}

function splitFrontmatter(content) {
    // Strip BOM if present
    if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
    if (!content.startsWith('---')) return { fm: '', body: content };
    const end = content.indexOf('\n---', 3);
    if (end === -1) return { fm: '', body: content };
    return {
        fm: content.slice(3, end).trim(),
        body: content.slice(end + 4).replace(/^\r?\n/, ''),
    };
}

// Parse une liste YAML inline (sur 1 ligne) : `tags: [a, b, "c d"]`
// ou multi-lignes : `tags:\n  - a\n  - b`
function extractTags(fm) {
    if (!fm) return [];
    const tags = [];

    // Forme inline
    const inline = /^tags\s*:\s*\[([^\]]*)\]/m.exec(fm);
    if (inline) {
        const items = inline[1].split(',');
        for (const it of items) {
            const v = it.trim().replace(/^['"]|['"]$/g, '');
            if (v) tags.push(v);
        }
        return tags;
    }

    // Forme multi-lignes
    const multi = /^tags\s*:\s*\n((?:[ \t]+-[^\n]+\n?)+)/m.exec(fm);
    if (multi) {
        const lines = multi[1].split(/\n/);
        for (const ln of lines) {
            const mm = /^\s*-\s*(.+?)\s*$/.exec(ln);
            if (mm) {
                const v = mm[1].replace(/^['"]|['"]$/g, '').trim();
                if (v) tags.push(v);
            }
        }
        return tags;
    }
    return tags;
}

// Retire les liens markdown, les wikilinks (mais on les garde ailleurs), les balises HTML
function stripMarkdown(text) {
    return text
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links
        .replace(/\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g, (_, a, b) => (b || a)) // wikilinks
        .replace(/`{1,3}[^`]*`{1,3}/g, '') // inline code
        .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1') // bold/italic
        .replace(/<[^>]+>/g, '') // html
        .replace(/\s+/g, ' ')
        .trim();
}

// Renvoie la 1ère ligne de prose (non vide, hors blockquote, hors heading, hors séparateur)
function extractSubtitle(body) {
    const lines = body.split(/\r?\n/);
    // On cherche un blockquote juste après le H1
    let seenH1 = false;
    for (let i = 0; i < lines.length; i++) {
        const ln = lines[i].trim();
        if (!ln) continue;
        if (/^#\s+/.test(ln)) { seenH1 = true; continue; }
        if (seenH1) {
            if (ln.startsWith('>')) {
                // C'est une citation : on prend son texte
                const txt = ln.replace(/^>+\s*/, '').replace(/[*_]+/g, '');
                const cleaned = stripMarkdown(txt);
                if (cleaned) {
                    if (cleaned.length <= 120) return cleaned;
                    // Coupe au dernier espace ≤ 117 pour ne pas casser un mot
                    let cut = cleaned.slice(0, 117);
                    const lastSpace = cut.lastIndexOf(' ');
                    if (lastSpace > 80) cut = cut.slice(0, lastSpace);
                    return cut + '...';
                }
            }
            // Si ce n'est pas un blockquote on n'a pas de sous-titre selon la spec
            return '';
        }
    }
    return '';
}

function extractTitle(body, fallback) {
    const m = body.match(/^\s*#\s+(.+?)\s*$/m);
    if (m) {
        const t = stripEmoji(m[1]).replace(/\s{2,}/g, ' ').trim();
        return t || fallback;
    }
    return fallback;
}

function extractSnippet(body) {
    const lines = body.split(/\r?\n/);
    const chunks = [];
    let total = 0;
    const LIMIT = 220;
    for (const ln of lines) {
        const t = ln.trim();
        if (!t) continue;
        if (t.startsWith('#')) continue;       // headings
        if (t.startsWith('>')) continue;       // blockquotes
        if (t.startsWith('---') || t.startsWith('***') || t.startsWith('___')) continue;
        if (t.startsWith('|') || t.startsWith('- |')) continue; // tables
        if (/^\s*[-*+]\s/.test(t) && total === 0) {
            // Si on n'a encore rien collecté et qu'on tombe sur une liste,
            // on prend quand même l'item (utile pour les fichiers Index très listés)
        }
        const cleaned = stripMarkdown(t);
        if (!cleaned) continue;
        chunks.push(cleaned);
        total += cleaned.length;
        if (total >= LIMIT) break;
    }
    let snip = chunks.join(' ');
    if (snip.length > LIMIT) snip = snip.slice(0, LIMIT - 3) + '...';
    return snip;
}

function extractKeywords(body) {
    const set = new Map(); // preserve order, keep first casing
    const add = (s) => {
        const v = s.trim();
        if (!v) return;
        if (v.length < 3) return;
        const key = v.toLowerCase();
        if (!set.has(key)) set.set(key, v);
    };

    // Mots gras **xxx** — seulement si court (≤ 40 chars) et ≤ 5 mots
    // (les bolds très longs sont des phrases entières, pas des termes-clés)
    const boldRe = /\*\*([^*\n]{2,80})\*\*/g;
    let m;
    while ((m = boldRe.exec(body)) !== null) {
        const inner = m[1].replace(/[*_]/g, '').trim();
        if (inner.length > 40) continue;
        const wc = inner.split(/\s+/).length;
        if (wc > 5) continue;
        add(inner);
    }

    // Wikilinks [[Nom]] ou [[Nom|alias]]
    const wikiRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
    while ((m = wikiRe.exec(body)) !== null) {
        const target = m[1].split('/').pop().split('#')[0].trim();
        add(target);
    }

    // Noms propres : majuscule + ≥4 lettres, hors début de phrase (= pas précédé de .! ? ou de début de ligne)
    // Capture en deux passes : 1) mots simples 2) bigrammes/trigrammes en cascade pour les noms composés
    // On limite à ~30 entries par fichier ici (avant déduplication).
    const proper = [];
    const stripped = stripMarkdown(body);
    // On split en phrases approximatives via les ponctuations finales
    const sentences = stripped.split(/(?<=[.!?])\s+/);
    let count = 0;
    for (const sent of sentences) {
        if (count >= 30) break;
        // On enlève le 1er mot (souvent capitalisé en début de phrase)
        const words = sent.split(/\s+/);
        for (let i = 1; i < words.length && count < 30; i++) {
            const w = words[i].replace(/[«»"'(),:;.!?—–…]/g, '');
            if (/^[A-ZÀ-Ý][a-zà-ÿ]{3,}$/.test(w)) {
                proper.push(w);
                count++;
            }
        }
    }
    for (const w of proper) add(w);

    // Limite finale
    const arr = Array.from(set.values());
    return arr.slice(0, 50);
}

// ============================================================
// Walk
// ============================================================
function walkDir(dir, acc) {
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
        return;
    }
    for (const e of entries) {
        // _* = documents internes (bibles, résumés de travail) : jamais indexés.
        // archive* = anciennes versions conservées : jamais indexées.
        if (e.name.startsWith('.') || e.name.startsWith('_')) continue;
        if (e.isDirectory() && /^archive/i.test(e.name)) continue;
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            walkDir(full, acc);
        } else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) {
            acc.push(full);
        }
    }
}

function slugify(s) {
    return String(s).toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Map chemin md d'une religion → sa clé (depuis NavConfig.religions), pour la route propre.
let RELIGION_MAP = {};
function buildReligionMap() {
    const map = {};
    if (!fs.existsSync(NAV_CONFIG_PATH)) return map;
    const raw = fs.readFileSync(NAV_CONFIG_PATH, 'utf8');
    const block = /religions\s*:\s*\[([\s\S]*?)\n\s*\],/m.exec(raw);
    if (!block) return map;
    const re = /\{\s*key\s*:\s*['"]([^'"]+)['"][\s\S]*?md\s*:\s*(?:'([^']*)'|"([^"]*)")/g;
    let m;
    while ((m = re.exec(block[1])) !== null) {
        const key = m[1];
        const md  = m[2] != null ? m[2] : m[3];
        if (md) map[md] = key;
    }
    return map;
}

function computeRoute(relPath, routeMap) {
    const normRel = relPath.replace(/\\/g, '/');
    if (routeMap[normRel]) return routeMap[normRel];

    // Chroniques → page composite
    if (normRel.startsWith('Lore/Chroniques/')) return '#histoires/chroniques';

    // Routes propres : fiche continent / Description / récit (clé continent = nom slugifié).
    let m = /^Lore\/Pays\/([^/]+)\/\1 - Continent\.md$/.exec(normRel);
    if (m) return '#continent/' + slugify(m[1]);
    m = /^Lore\/Pays\/[^/]+\/(.+)\.md$/.exec(normRel);
    if (m) return '#nation/' + slugify(m[1]);
    m = /^Lore\/Histoires\/[^/]+\/(.+)\.md$/.exec(normRel);
    if (m) return '#histoire/' + slugify(m[1]);

    // Religions : route propre #religion/<key> (sinon repli sur le hub)
    if (RELIGION_MAP[normRel]) return '#religion/' + RELIGION_MAP[normRel];
    if (normRel.startsWith('Lore/Religions/')) return '#monde/religions';
    if (normRel.startsWith('Lore/Chronologie/')) return '#monde/chronologie';

    // Fallback générique
    return `#md/${normRel}`;
}

function processFile(full, routeMap) {
    let content;
    try {
        content = fs.readFileSync(full, 'utf8');
    } catch {
        return null;
    }
    const relPath = path.relative(DOCS, full).split(path.sep).join('/');
    const baseName = path.basename(full, path.extname(full));

    const { fm, body } = splitFrontmatter(content);
    const title = extractTitle(body, baseName);
    const subtitle = extractSubtitle(body);
    const tags = extractTags(fm);
    const keywords = extractKeywords(body);
    const snippet = extractSnippet(body);
    const category = inferCategory(relPath);
    const route = computeRoute(relPath, routeMap);

    const entry = {
        path: relPath,
        title,
        category,
        route,
    };
    if (subtitle) entry.subtitle = subtitle;
    if (tags.length) entry.tags = tags;
    if (keywords.length) entry.keywords = keywords;
    if (snippet) entry.snippet = snippet;
    return entry;
}

function main() {
    if (!fs.existsSync(DOCS)) {
        console.error('Docs/ introuvable :', DOCS);
        process.exit(1);
    }
    console.log('Scan de', DOCS);

    const routeMap = buildRouteMap();
    RELIGION_MAP = buildReligionMap();
    console.log(`Mapping de routes depuis nav-config.js : ${Object.keys(routeMap).length} entrées, ${Object.keys(RELIGION_MAP).length} religions`);

    const files = [];
    walkDir(DOCS, files);
    console.log(`${files.length} fichiers .md trouvés`);

    const entries = [];
    let skipped = 0;
    for (const f of files) {
        const e = processFile(f, routeMap);
        if (e) entries.push(e);
        else skipped++;
    }

    // Tri stable : par catégorie, puis par titre
    entries.sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category, 'fr');
        return a.title.localeCompare(b.title, 'fr');
    });

    const out = {
        version: new Date().toISOString().slice(0, 10),
        generated_at: new Date().toISOString(),
        entries,
    };
    fs.writeFileSync(OUT, JSON.stringify(out), 'utf8');

    const stat = fs.statSync(OUT);
    const sizeKB = (stat.size / 1024).toFixed(1);
    console.log(`OK : ${entries.length} entrées (${skipped} ignorés) → ${OUT} (${sizeKB} KB)`);

    // Stats par catégorie
    const byCat = {};
    for (const e of entries) byCat[e.category] = (byCat[e.category] || 0) + 1;
    const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
    console.log('\nRépartition par catégorie :');
    for (const [c, n] of cats) console.log(`  ${c.padEnd(28)} ${n}`);
}

main();
