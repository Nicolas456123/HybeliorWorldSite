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
  await tursoExecute(`CREATE TABLE IF NOT EXISTS country_borders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    entity_type TEXT NOT NULL DEFAULT 'paysElements',
    era_id TEXT NOT NULL DEFAULT 'actuelle',
    points TEXT NOT NULL,
    color TEXT,
    UNIQUE(name, entity_type, era_id)
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
      const rows = await tursoExecute('SELECT name, entity_type, era_id, points, color FROM country_borders');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { password, action, data } = req.body;
      if (password !== process.env.EDITOR_PASSWORD) {
        return res.status(403).json({ error: 'Mot de passe incorrect' });
      }

      if (action === 'upsert') {
        if (!data.name || !data.points) {
          return res.status(400).json({ error: 'Champs manquants' });
        }
        await tursoExecute(
          `INSERT INTO country_borders (name, entity_type, era_id, points, color)
           VALUES (?, ?, ?, ?, ?) ON CONFLICT(name, entity_type, era_id)
           DO UPDATE SET points = ?, color = ?`,
          [
            { type: 'text', value: data.name },
            { type: 'text', value: data.entity_type || 'paysElements' },
            { type: 'text', value: data.era_id || 'actuelle' },
            { type: 'text', value: data.points },
            data.color ? { type: 'text', value: data.color } : { type: 'null' },
            { type: 'text', value: data.points },
            data.color ? { type: 'text', value: data.color } : { type: 'null' }
          ]
        );
        return res.status(200).json({ ok: true });
      }

      if (action === 'delete') {
        if (!data.name) {
          return res.status(400).json({ error: 'Nom manquant' });
        }
        await tursoExecute(
          'DELETE FROM country_borders WHERE name = ? AND entity_type = ? AND era_id = ?',
          [
            { type: 'text', value: data.name },
            { type: 'text', value: data.entity_type || 'paysElements' },
            { type: 'text', value: data.era_id || 'actuelle' }
          ]
        );
        return res.status(200).json({ ok: true });
      }

      return res.status(400).json({ error: 'Action inconnue' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Borders API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
