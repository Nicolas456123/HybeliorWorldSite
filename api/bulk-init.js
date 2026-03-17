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
  return res.json();
}

async function tursoBatch(statements) {
  const requests = statements.map(s => ({
    type: 'execute',
    stmt: { sql: s.sql, args: s.args }
  }));
  requests.push({ type: 'close' });

  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requests })
  });
  if (!res.ok) throw new Error(`Turso error: ${res.status}`);
  return res.json();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { entries, password } = req.body;

    if (password !== process.env.EDITOR_PASSWORD) {
      return res.status(403).json({ error: 'Mot de passe incorrect' });
    }

    if (!Array.isArray(entries) || entries.length === 0) {
      return res.status(400).json({ error: 'Entries array required' });
    }

    // Ensure table exists
    await tursoExecute(`CREATE TABLE IF NOT EXISTS coordinate_overrides (
      name TEXT NOT NULL, storage TEXT NOT NULL,
      coord_x REAL NOT NULL, coord_y REAL NOT NULL,
      PRIMARY KEY (name, storage)
    )`);

    // Batch insert/update all entries (max 50 per pipeline to avoid limits)
    const batchSize = 50;
    let inserted = 0;

    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);
      const statements = batch.map(e => ({
        sql: `INSERT INTO coordinate_overrides (name, storage, coord_x, coord_y)
              VALUES (?, ?, ?, ?) ON CONFLICT(name, storage) DO UPDATE SET coord_x = ?, coord_y = ?`,
        args: [
          { type: 'text', value: e.name },
          { type: 'text', value: e.storage },
          { type: 'float', value: Number(e.coord_x) },
          { type: 'float', value: Number(e.coord_y) },
          { type: 'float', value: Number(e.coord_x) },
          { type: 'float', value: Number(e.coord_y) }
        ]
      }));
      await tursoBatch(statements);
      inserted += batch.length;
    }

    return res.status(200).json({ ok: true, inserted });
  } catch (err) {
    console.error('Bulk init error:', err);
    return res.status(500).json({ error: err.message });
  }
}
