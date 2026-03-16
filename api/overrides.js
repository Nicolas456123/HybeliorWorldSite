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
  // Convert Turso row format to objects
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
  await tursoExecute(`CREATE TABLE IF NOT EXISTS coordinate_overrides (
    name TEXT NOT NULL, storage TEXT NOT NULL,
    coord_x REAL NOT NULL, coord_y REAL NOT NULL,
    PRIMARY KEY (name, storage)
  )`);
  tableReady = true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await ensureTable();

    if (req.method === 'GET') {
      const rows = await tursoExecute('SELECT name, storage, coord_x, coord_y FROM coordinate_overrides');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { name, storage, coord_x, coord_y, password } = req.body;
      if (password !== process.env.EDITOR_PASSWORD) {
        return res.status(403).json({ error: 'Mot de passe incorrect' });
      }
      if (!name || !storage || coord_x == null || coord_y == null) {
        return res.status(400).json({ error: 'Champs manquants' });
      }
      await tursoExecute(
        `INSERT INTO coordinate_overrides (name, storage, coord_x, coord_y)
         VALUES (?, ?, ?, ?) ON CONFLICT(name, storage) DO UPDATE SET coord_x = ?, coord_y = ?`,
        [
          { type: 'text', value: name },
          { type: 'text', value: storage },
          { type: 'float', value: String(coord_x) },
          { type: 'float', value: String(coord_y) },
          { type: 'float', value: String(coord_x) },
          { type: 'float', value: String(coord_y) }
        ]
      );
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
