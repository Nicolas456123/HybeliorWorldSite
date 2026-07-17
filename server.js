const http = require('http');
const fs = require('fs');
const path = require('path');
const kg = require('./lib/kg-core.js');
const { createFileOverlay } = require('./lib/kg-overlay-file.js');

const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'local-db.json');
const HISTORY_FILE = path.join(__dirname, 'local-history.json');
const BORDERS_FILE = path.join(__dirname, 'local-borders.json');
const KG_OVERLAY_FILE = path.join(__dirname, 'local-kg-overlay.json');
const LORE_ROOT = path.join(__dirname, 'Docs', 'Lore');
const EDITOR_PASSWORD = process.env.EDITOR_PASSWORD || 'local';

// ── Graphe de connaissances : base statique (data/kg-base.json) ⊕ overlay ──
// Overlay = fichier JSON local en dev (miroir de l'overlay Turso en prod).
// Accès direct, sans mot de passe.
let KG_BASE = {};
try { KG_BASE = require('./data/kg-base.json'); } catch { KG_BASE = {}; }
const kgOverlay = createFileOverlay(KG_OVERLAY_FILE);

// ── Local DB (dev fallback for /api/overrides) ──────────────

function loadDB() {
    try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
    catch { return []; }
}

function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function loadHistory() {
    try { return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')); }
    catch { return []; }
}

function saveHistory(data) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
}

function initDBFromCSV() {
    if (fs.existsSync(DB_FILE)) {
        const data = loadDB();
        if (data.length > 0) return;
    }
    const files = [
        { path: 'Data/DT_Capitales.csv', storage: 'capitalesElements' },
        { path: 'Data/DT_Cites.csv',     storage: 'citesElements' },
        { path: 'Data/DT_Villes.csv',    storage: 'villesElements' },
        { path: 'Data/DT_Villages.csv',  storage: 'villagesElements' }
    ];
    const entries = [];
    const seen = new Set();
    for (const f of files) {
        const csvPath = path.join(__dirname, f.path);
        if (!fs.existsSync(csvPath)) continue;
        const lines = fs.readFileSync(csvPath, 'utf8').split('\n').slice(1);
        for (const line of lines) {
            const parts = line.split(',');
            if (parts.length >= 3 && parts[0].trim()) {
                const name = parts[0].trim();
                const key = name + '|' + f.storage;
                if (seen.has(key)) continue;
                seen.add(key);
                entries.push({ name, storage: f.storage, coord_x: parseFloat(parts[1]), coord_y: parseFloat(parts[2]) });
            }
        }
    }
    saveDB(entries);
    console.log(`DB initialisée: ${entries.length} entrées`);
}

// ── MIME types ───────────────────────────────────────────────

const MIME = {
    '.html': 'text/html',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.csv':  'text/csv',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg':  'image/svg+xml',
    '.dzi':  'application/xml',
    '.xml':  'application/xml',
    '.md':   'text/plain; charset=utf-8',
    '.ico':  'image/x-icon',
    '.woff2':'font/woff2',
    '.woff': 'font/woff',
    '.ttf':  'font/ttf'
};

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try { resolve(JSON.parse(body)); }
            catch { reject(new Error('Invalid JSON')); }
        });
    });
}

// ── Server ───────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(200); return res.end(); }

    // ── Lore markdown files: GET /lore/<path> ─────────────────
    if (pathname.startsWith('/lore/')) {
        // pathname (URL.pathname) n'est PAS décodé : décoder les espaces/accents
        // (%20, %C3%A8…) pour retrouver le vrai chemin disque, comme le fait le
        // handler de fichiers statiques plus bas.
        let relative = pathname.slice('/lore/'.length);
        try { relative = decodeURIComponent(relative); } catch { /* garde brut */ }
        if (relative.includes('..') || relative.includes('\0')) {
            res.writeHead(400); return res.end('Bad request');
        }
        const filePath = path.join(LORE_ROOT, relative);
        try {
            const content = fs.readFileSync(filePath);
            const ext = path.extname(filePath);
            res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain; charset=utf-8' });
            return res.end(content);
        } catch {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('Not found');
        }
    }

    // ── API: GET /api/overrides ───────────────────────────────
    if (pathname === '/api/overrides' && req.method === 'GET') {
        if (url.searchParams.get('history') === '1') {
            const limit = Math.max(1, Math.min(Number(url.searchParams.get('limit')) || 30, 100));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(loadHistory().slice(-limit).reverse()));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(loadDB()));
    }

    // ── API: POST /api/overrides ──────────────────────────────
    if (pathname === '/api/overrides' && req.method === 'POST') {
        try {
            const { name, storage, coord_x, coord_y, password, action = 'move' } = await parseBody(req);
            if (password !== EDITOR_PASSWORD) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Mot de passe incorrect' }));
            }
            const db = loadDB();
            const idx = db.findIndex(e => e.name === name && e.storage === storage);
            const current = idx >= 0 ? db[idx] : null;
            const nextX = Number(coord_x);
            const nextY = Number(coord_y);
            if (!Number.isFinite(nextX) || !Number.isFinite(nextY)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Coordonnées invalides' }));
            }
            if (!current || Number(current.coord_x) !== nextX || Number(current.coord_y) !== nextY) {
                const history = loadHistory();
                history.push({
                    id: (history[history.length - 1]?.id || 0) + 1,
                    name,
                    storage,
                    old_coord_x: current ? Number(current.coord_x) : null,
                    old_coord_y: current ? Number(current.coord_y) : null,
                    new_coord_x: nextX,
                    new_coord_y: nextY,
                    action: String(action).slice(0, 30),
                    changed_at: new Date().toISOString()
                });
                saveHistory(history.slice(-500));
            }
            if (idx >= 0) { db[idx].coord_x = nextX; db[idx].coord_y = nextY; }
            else db.push({ name, storage, coord_x: nextX, coord_y: nextY });
            saveDB(db);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ ok: true }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: err.message }));
        }
    }

    // ── API: POST /api/auth ───────────────────────────────────
    if (pathname === '/api/auth' && req.method === 'POST') {
        try {
            const { password } = await parseBody(req);
            if (password === EDITOR_PASSWORD) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ ok: true }));
            }
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Mot de passe incorrect' }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: err.message }));
        }
    }

    // ── API: GET /api/borders ─────────────────────────────────
    if (pathname === '/api/borders' && req.method === 'GET') {
        let borders = [];
        try { borders = JSON.parse(fs.readFileSync(BORDERS_FILE, 'utf8')); } catch {}
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(borders));
    }

    // ── API: POST /api/borders ────────────────────────────────
    if (pathname === '/api/borders' && req.method === 'POST') {
        try {
            const { password, action, data } = await parseBody(req);
            if (password !== EDITOR_PASSWORD) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Mot de passe incorrect' }));
            }
            let borders = [];
            try { borders = JSON.parse(fs.readFileSync(BORDERS_FILE, 'utf8')); } catch {}

            if (action === 'upsert') {
                const idx = borders.findIndex(b => b.name === data.name && b.entity_type === (data.entity_type || 'paysElements') && b.era_id === (data.era_id || 'actuelle'));
                const entry = { name: data.name, entity_type: data.entity_type || 'paysElements', era_id: data.era_id || 'actuelle', points: data.points, color: data.color || null, parent_name: data.parent_name || null };
                if (idx >= 0) borders[idx] = entry;
                else borders.push(entry);
            } else if (action === 'delete') {
                borders = borders.filter(b => !(b.name === data.name && b.entity_type === (data.entity_type || 'paysElements') && b.era_id === (data.era_id || 'actuelle')));
            }

            fs.writeFileSync(BORDERS_FILE, JSON.stringify(borders, null, 2));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ ok: true }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: err.message }));
        }
    }

    // ── API: GET /api/highlights ──────────────────────────────
    if (pathname === '/api/highlights' && req.method === 'GET') {
        // Header only — query string passwords leak via access logs and Referer.
        const password = req.headers['x-editor-password'];
        if (!password || password !== EDITOR_PASSWORD) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Mot de passe requis (header X-Editor-Password)' }));
        }
        const HL_FILE = path.join(__dirname, 'local-highlights.json');
        let store = {};
        try { store = JSON.parse(fs.readFileSync(HL_FILE, 'utf8')); } catch {}
        const highlights = Object.values(store).filter(h => h && !h.deleted);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ highlights }));
    }

    // ── API: POST /api/highlights ─────────────────────────────
    if (pathname === '/api/highlights' && req.method === 'POST') {
        try {
            const HL_FILE = path.join(__dirname, 'local-highlights.json');
            const { password, entries } = await parseBody(req);
            if (password !== EDITOR_PASSWORD) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Mot de passe incorrect' }));
            }
            if (!Array.isArray(entries)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'entries (array) attendu' }));
            }
            let store = {};
            try { store = JSON.parse(fs.readFileSync(HL_FILE, 'utf8')); } catch {}
            const now = Date.now();
            for (const h of entries) {
                if (!h || !h.id) continue;
                const updatedAt = Number(h.updatedAt) || now;
                const existing = store[h.id];
                if (!existing || (existing.updatedAt || 0) <= updatedAt) {
                    store[h.id] = Object.assign({}, h, { updatedAt: updatedAt, deleted: !!h.deleted });
                }
            }
            fs.writeFileSync(HL_FILE, JSON.stringify(store, null, 2));
            const merged = Object.values(store).filter(h => h && !h.deleted);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ ok: true, highlights: merged }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: err.message }));
        }
    }

    // ── API: /api/kg (graphe de connaissances — base ⊕ overlay, sans mot de passe) ──
    if (pathname === '/api/kg') {
        try {
            const overlay = await kgOverlay.load();
            const graph = kg.mergeGraph(KG_BASE, overlay);
            if (req.method === 'GET') {
                const query = Object.fromEntries(url.searchParams.entries());
                const out = kg.readAction(graph, query.action || 'list', query);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(out));
            }
            if (req.method === 'POST') {
                const { password, action, data } = await parseBody(req);
                if (EDITOR_PASSWORD && password !== EDITOR_PASSWORD) {
                    res.writeHead(403, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Mot de passe incorrect', code: 'auth' }));
                }
                const { ops, result } = kg.prepareWrite(graph, action, data, new Date().toISOString());
                await kgOverlay.apply(ops, new Date().toISOString());
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(result));
            }
            res.writeHead(405, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Method not allowed' }));
        } catch (err) {
            const code = err && err.code ? err.code : 'error';
            const status = (code === 'validation' || code === 'ref' || code === 'referenced') ? 400
                : code === 'not-found' ? 404 : 500;
            res.writeHead(status, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: err.message, code }));
        }
    }

    // ── Static files ──────────────────────────────────────────
    let decodedPath;
    try { decodedPath = decodeURIComponent(pathname); }
    catch { decodedPath = pathname; }
    if (decodedPath.includes('..') || decodedPath.includes('\0')) {
        res.writeHead(400); return res.end('Bad request');
    }
    let filePath = path.join(__dirname, decodedPath === '/' ? 'index.html' : decodedPath);
    try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) filePath = path.join(filePath, 'index.html');
        const ext = path.extname(filePath);
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(content);
    } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

initDBFromCSV();
server.listen(PORT, () => {
    console.log(`Hybélior — http://localhost:${PORT}`);
    console.log(`Lore: ${LORE_ROOT}`);
    console.log(`Éditeur password: ${EDITOR_PASSWORD}`);
});
