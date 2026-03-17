const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3333;
const DB_FILE = path.join(__dirname, 'local-db.json');
const EDITOR_PASSWORD = 'local'; // mot de passe local

// Charger ou initialiser la base locale (fichier JSON)
function loadDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Initialiser la DB depuis les CSV si elle n'existe pas
function initDBFromCSV() {
  if (fs.existsSync(DB_FILE)) {
    const data = loadDB();
    if (data.length > 0) return;
  }

  const files = [
    { path: 'Data/DT_Capitales.csv', storage: 'capitalesElements' },
    { path: 'Data/DT_Cites.csv', storage: 'citesElements' },
    { path: 'Data/DT_Villes.csv', storage: 'villesElements' },
    { path: 'Data/DT_Villages.csv', storage: 'villagesElements' }
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
        entries.push({
          name,
          storage: f.storage,
          coord_x: parseFloat(parts[1]),
          coord_y: parseFloat(parts[2])
        });
      }
    }
  }

  saveDB(entries);
  console.log(`Base locale initialisée avec ${entries.length} entrées`);
}

// MIME types
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.csv': 'text/csv',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.dzi': 'application/xml',
  '.xml': 'application/xml',
  '.md': 'text/markdown',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
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

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(200); return res.end(); }

  // API routes
  if (url.pathname === '/api/overrides') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(loadDB()));
    }
    if (req.method === 'POST') {
      try {
        const { name, storage, coord_x, coord_y, password } = await parseBody(req);
        if (password !== EDITOR_PASSWORD) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Mot de passe incorrect' }));
        }
        const db = loadDB();
        const idx = db.findIndex(e => e.name === name && e.storage === storage);
        if (idx >= 0) {
          db[idx].coord_x = coord_x;
          db[idx].coord_y = coord_y;
        } else {
          db.push({ name, storage, coord_x, coord_y });
        }
        saveDB(db);
        console.log(`Sauvegardé: ${name} (${storage}) → ${coord_x}, ${coord_y}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
      }
    }
  }

  if (url.pathname === '/api/auth') {
    if (req.method === 'POST') {
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
  }

  // Fichiers statiques
  let filePath = path.join(__dirname, url.pathname === '/' ? 'index.html' : url.pathname);
  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) filePath = path.join(filePath, 'index.html');
    const ext = path.extname(filePath);
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

initDBFromCSV();
server.listen(PORT, () => {
  console.log(`Serveur local: http://localhost:${PORT}`);
  console.log(`Mot de passe éditeur: ${EDITOR_PASSWORD}`);
});
