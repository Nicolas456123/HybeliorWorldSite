import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Ensure table exists on first call
let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  await db.execute(`
    CREATE TABLE IF NOT EXISTS coordinate_overrides (
      name TEXT NOT NULL,
      storage TEXT NOT NULL,
      coord_x REAL NOT NULL,
      coord_y REAL NOT NULL,
      PRIMARY KEY (name, storage)
    )
  `);
  tableReady = true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await ensureTable();

    if (req.method === 'GET') {
      const result = await db.execute('SELECT name, storage, coord_x, coord_y FROM coordinate_overrides');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const { name, storage, coord_x, coord_y, password } = req.body;

      if (password !== process.env.EDITOR_PASSWORD) {
        return res.status(403).json({ error: 'Mot de passe incorrect' });
      }

      if (!name || !storage || coord_x == null || coord_y == null) {
        return res.status(400).json({ error: 'Champs manquants' });
      }

      await db.execute({
        sql: `INSERT INTO coordinate_overrides (name, storage, coord_x, coord_y)
              VALUES (?, ?, ?, ?)
              ON CONFLICT(name, storage) DO UPDATE SET coord_x = ?, coord_y = ?`,
        args: [name, storage, coord_x, coord_y, coord_x, coord_y],
      });

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
