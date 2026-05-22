const TURSO_URL = process.env.TURSO_URL?.replace('libsql://', 'https://');
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

async function tursoExecute(sql, args) {
  const body = {
    requests: [
      { type: 'execute', stmt: { sql, args: args || [] } },
      { type: 'close' }
    ]
  };
  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Turso error: ${res.status}`);
  const data = await res.json();
  const result = data.results?.[0]?.response?.result;
  if (!result) return [];
  const cols = result.cols.map(c => c.name);
  return result.rows.map(row => {
    const obj = {};
    row.forEach((cell, i) => { obj[cols[i]] = cell.value; });
    return obj;
  });
}

let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  await tursoExecute(`CREATE TABLE IF NOT EXISTS chronicle_highlights (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at INTEGER NOT NULL,
    deleted INTEGER NOT NULL DEFAULT 0
  )`);
  tableReady = true;
}

function rowToHighlight(r) {
  try {
    const obj = JSON.parse(r.data);
    obj.id = r.id;
    obj.updatedAt = Number(r.updated_at);
    if (r.deleted) obj.deleted = true;
    return obj;
  } catch (e) { return null; }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Editor-Password');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await ensureTable();

    if (req.method === 'GET') {
      // Editor password must travel as a header — never a query string. URLs land in
      // server access logs, browser history, and Referer headers on outbound clicks,
      // any of which would leak the secret across the audit boundary.
      const password = req.headers['x-editor-password'];
      if (!password || password !== process.env.EDITOR_PASSWORD) {
        return res.status(403).json({ error: 'Mot de passe requis (header X-Editor-Password)' });
      }
      const rows = await tursoExecute(
        'SELECT id, data, updated_at, deleted FROM chronicle_highlights WHERE deleted = 0'
      );
      const highlights = rows.map(rowToHighlight).filter(Boolean);
      return res.status(200).json({ highlights });
    }

    if (req.method === 'POST') {
      const { password, entries } = req.body || {};
      if (password !== process.env.EDITOR_PASSWORD) {
        return res.status(403).json({ error: 'Mot de passe incorrect' });
      }
      if (!Array.isArray(entries)) {
        return res.status(400).json({ error: 'entries (array) attendu' });
      }
      const now = Date.now();
      for (const h of entries) {
        if (!h || !h.id) continue;
        const updatedAt = Number(h.updatedAt) || now;
        const isDeleted = h.deleted ? 1 : 0;
        const json = JSON.stringify(h);
        await tursoExecute(
          `INSERT INTO chronicle_highlights (id, data, updated_at, deleted)
           VALUES (?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET
             data = excluded.data,
             updated_at = excluded.updated_at,
             deleted = excluded.deleted
           WHERE excluded.updated_at >= chronicle_highlights.updated_at`,
          [
            { type: 'text', value: String(h.id) },
            { type: 'text', value: json },
            { type: 'integer', value: String(updatedAt) },
            { type: 'integer', value: String(isDeleted) }
          ]
        );
      }
      const rows = await tursoExecute(
        'SELECT id, data, updated_at, deleted FROM chronicle_highlights WHERE deleted = 0'
      );
      const merged = rows.map(rowToHighlight).filter(Boolean);
      return res.status(200).json({ ok: true, highlights: merged });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API highlights error:', err);
    return res.status(500).json({ error: err.message });
  }
}
