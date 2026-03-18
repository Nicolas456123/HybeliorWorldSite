const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'local-db.json');
const LORE_ROOT = path.join(__dirname, 'lore');
const EDITOR_PASSWORD = process.env.EDITOR_PASSWORD || 'local';

// ── Local DB (dev fallback for /api/overrides) ──────────────

function loadDB() {
    try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
    catch { return []; }
}

function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
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
        const relative = pathname.slice('/lore/'.length);
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
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(loadDB()));
    }

    // ── API: POST /api/overrides ──────────────────────────────
    if (pathname === '/api/overrides' && req.method === 'POST') {
        try {
            const { name, storage, coord_x, coord_y, password } = await parseBody(req);
            if (password !== EDITOR_PASSWORD) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Mot de passe incorrect' }));
            }
            const db = loadDB();
            const idx = db.findIndex(e => e.name === name && e.storage === storage);
            if (idx >= 0) { db[idx].coord_x = coord_x; db[idx].coord_y = coord_y; }
            else db.push({ name, storage, coord_x, coord_y });
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

    // ── Static files ──────────────────────────────────────────
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
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
