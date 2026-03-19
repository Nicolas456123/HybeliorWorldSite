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

let tablesReady = false;
async function ensureTables() {
  if (tablesReady) return;
  await tursoBatch([
    {
      sql: `CREATE TABLE IF NOT EXISTS timeline_eras (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        date_label TEXT NOT NULL,
        description TEXT,
        start_year INTEGER,
        end_year INTEGER,
        sort_order INTEGER NOT NULL DEFAULT 0
      )`,
      args: []
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS timeline_names (
        place_name TEXT NOT NULL,
        place_type TEXT NOT NULL,
        era_id TEXT NOT NULL,
        historical_name TEXT NOT NULL,
        visibility TEXT NOT NULL DEFAULT 'visible',
        meaning TEXT,
        PRIMARY KEY (place_name, place_type, era_id)
      )`,
      args: []
    }
  ]);
  tablesReady = true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await ensureTables();

    if (req.method === 'GET') {
      // Charger toutes les eres
      const eras = await tursoExecute(
        'SELECT id, label, date_label, description, start_year, end_year, sort_order FROM timeline_eras ORDER BY sort_order'
      );

      // Charger tous les noms historiques
      const names = await tursoExecute(
        'SELECT place_name, place_type, era_id, historical_name, visibility, meaning FROM timeline_names'
      );

      // Construire la structure attendue par map.js
      const continentMap = {};
      const countryMap = {};

      names.forEach(n => {
        if (n.place_type === 'continent') {
          if (!continentMap[n.place_name]) {
            continentMap[n.place_name] = { currentName: n.place_name, eraNames: {} };
          }
          continentMap[n.place_name].eraNames[n.era_id] = n.historical_name;
        } else if (n.place_type === 'pays') {
          if (!countryMap[n.place_name]) {
            countryMap[n.place_name] = {
              name: n.place_name,
              existsInEras: [],
              vanishedInEras: [],
              eraNames: {},
              predecessors: {}
            };
          }
          const c = countryMap[n.place_name];
          if (n.visibility === 'visible') {
            c.existsInEras.push(n.era_id);
            c.eraNames[n.era_id] = n.historical_name;
          } else if (n.visibility === 'vanished') {
            c.vanishedInEras.push(n.era_id);
            c.eraNames[n.era_id] = n.historical_name;
          } else if (n.visibility === 'predecessor') {
            c.predecessors[n.era_id] = n.historical_name;
          } else if (n.visibility === 'hidden') {
            // Ne rien ajouter — le pays sera masque
          }
        }
      });

      return res.status(200).json({
        timelineData: {
          eras: eras.map(e => ({
            id: e.id,
            label: e.label,
            date: e.date_label,
            description: e.description,
            startYear: e.start_year,
            endYear: e.end_year
          })),
          continents: Object.values(continentMap),
          countries: Object.values(countryMap)
        }
      });
    }

    if (req.method === 'POST') {
      const { password, action, data } = req.body;
      if (password !== process.env.EDITOR_PASSWORD) {
        return res.status(403).json({ error: 'Mot de passe incorrect' });
      }

      if (action === 'upsert_era') {
        const { id, label, date_label, description, start_year, end_year, sort_order } = data;
        await tursoExecute(
          `INSERT INTO timeline_eras (id, label, date_label, description, start_year, end_year, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET label=?, date_label=?, description=?, start_year=?, end_year=?, sort_order=?`,
          [
            { type: 'text', value: id },
            { type: 'text', value: label },
            { type: 'text', value: date_label },
            { type: 'text', value: description || '' },
            { type: 'integer', value: start_year },
            { type: 'integer', value: end_year },
            { type: 'integer', value: sort_order },
            { type: 'text', value: label },
            { type: 'text', value: date_label },
            { type: 'text', value: description || '' },
            { type: 'integer', value: start_year },
            { type: 'integer', value: end_year },
            { type: 'integer', value: sort_order }
          ]
        );
        return res.status(200).json({ ok: true });
      }

      if (action === 'upsert_name') {
        const { place_name, place_type, era_id, historical_name, visibility, meaning } = data;
        await tursoExecute(
          `INSERT INTO timeline_names (place_name, place_type, era_id, historical_name, visibility, meaning)
           VALUES (?, ?, ?, ?, ?, ?)
           ON CONFLICT(place_name, place_type, era_id) DO UPDATE SET historical_name=?, visibility=?, meaning=?`,
          [
            { type: 'text', value: place_name },
            { type: 'text', value: place_type },
            { type: 'text', value: era_id },
            { type: 'text', value: historical_name },
            { type: 'text', value: visibility || 'visible' },
            { type: 'text', value: meaning || '' },
            { type: 'text', value: historical_name },
            { type: 'text', value: visibility || 'visible' },
            { type: 'text', value: meaning || '' }
          ]
        );
        return res.status(200).json({ ok: true });
      }

      if (action === 'bulk_init') {
        const { eras, names } = data;
        let inserted = 0;

        // Insert eras
        if (eras && eras.length > 0) {
          const batchSize = 30;
          for (let i = 0; i < eras.length; i += batchSize) {
            const batch = eras.slice(i, i + batchSize);
            const stmts = batch.map(e => ({
              sql: `INSERT INTO timeline_eras (id, label, date_label, description, start_year, end_year, sort_order)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(id) DO UPDATE SET label=?, date_label=?, description=?, start_year=?, end_year=?, sort_order=?`,
              args: [
                { type: 'text', value: e.id },
                { type: 'text', value: e.label },
                { type: 'text', value: e.date_label },
                { type: 'text', value: e.description || '' },
                { type: 'integer', value: e.start_year },
                { type: 'integer', value: e.end_year },
                { type: 'integer', value: e.sort_order },
                { type: 'text', value: e.label },
                { type: 'text', value: e.date_label },
                { type: 'text', value: e.description || '' },
                { type: 'integer', value: e.start_year },
                { type: 'integer', value: e.end_year },
                { type: 'integer', value: e.sort_order }
              ]
            }));
            await tursoBatch(stmts);
            inserted += batch.length;
          }
        }

        // Insert names
        if (names && names.length > 0) {
          const batchSize = 30;
          for (let i = 0; i < names.length; i += batchSize) {
            const batch = names.slice(i, i + batchSize);
            const stmts = batch.map(n => ({
              sql: `INSERT INTO timeline_names (place_name, place_type, era_id, historical_name, visibility, meaning)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON CONFLICT(place_name, place_type, era_id) DO UPDATE SET historical_name=?, visibility=?, meaning=?`,
              args: [
                { type: 'text', value: n.place_name },
                { type: 'text', value: n.place_type },
                { type: 'text', value: n.era_id },
                { type: 'text', value: n.historical_name },
                { type: 'text', value: n.visibility || 'visible' },
                { type: 'text', value: n.meaning || '' },
                { type: 'text', value: n.historical_name },
                { type: 'text', value: n.visibility || 'visible' },
                { type: 'text', value: n.meaning || '' }
              ]
            }));
            await tursoBatch(stmts);
            inserted += batch.length;
          }
        }

        return res.status(200).json({ ok: true, inserted });
      }

      return res.status(400).json({ error: 'Action inconnue' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Timeline API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
