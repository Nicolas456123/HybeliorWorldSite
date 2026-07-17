export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  // Si aucun mot de passe n'est configuré, l'accès est ouvert (cohérent avec /api/kg).
  if (!process.env.EDITOR_PASSWORD || password === process.env.EDITOR_PASSWORD) {
    return res.status(200).json({ ok: true });
  }
  return res.status(403).json({ error: 'Mot de passe incorrect' });
}
