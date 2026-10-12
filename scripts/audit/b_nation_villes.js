'use strict';
const L = require('./lib.js');
const AGG = new Set(['cite', 'ville', 'bourg', 'hameau']);
function descendants(id) { // lieux rattachés (situe-dans / capitale-de), 4 niveaux
  const seen = new Map(); let front = [id];
  for (let depth = 1; depth <= 4 && front.length; depth++) {
    const nxt = [];
    for (const f of front) for (const r of L.inn.get(f) || []) {
      if (r.rel_type !== 'situe-dans' && r.rel_type !== 'capitale-de') continue;
      if (seen.has(r.from_id)) continue;
      const e = L.byId.get(r.from_id); if (!e || e.type !== 'lieu') continue;
      seen.set(r.from_id, { e, depth, rel: r.rel_type }); nxt.push(r.from_id);
    }
    front = nxt;
  }
  return [...seen.values()];
}
function run() {
  const cas = [], tab = [];
  for (const n of L.kg.entities.filter((e) => e.type === 'entite-politique')) {
    const F = [...L.continentsFiche(n).keys()];
    const ds = descendants(n.id);
    const rows = [];
    for (const { e } of ds) {
      const d = e.data || {};
      if (d.coord_x == null) continue;
      const ech = d.echelle;
      if (!AGG.has(ech)) continue;
      const loc = L.localiser(d.coord_x, d.coord_y);
      const m = loc.terre ? L.continentMasse(loc.terre) : '(mer)';
      rows.push({ id: e.id, nom: e.name, m, x: d.coord_x, y: d.coord_y, ech });
    }
    const cnt = {}; rows.forEach((r) => cnt[r.m] = (cnt[r.m] || 0) + 1);
    const tri = Object.entries(cnt).sort((a, b) => b[1] - a[1]);
    const maj = tri[0] ? tri[0][0] : null;
    const sansTerr = !!(n.data && n.data.carte && n.data.carte.sans_territoire);
    const pe = L.pos(n);
    tab.push({ id: n.id, nom: n.name, fiche: F.join('/'), villes_posees: rows.length, repartition: cnt, majoritaire: maj, sans_territoire: sansTerr, marqueur: pe ? `${pe.x.toFixed(0)},${pe.y.toFixed(0)} (${pe.src})` : null, lieux_rattaches: ds.length });
    const base = { id: n.id, nom: n.name, ctrl: 'B', fiche: F.join('/') || '(aucun)', repartition: cnt, majoritaire: maj };
    if (!rows.length) {
      cas.push({ ...base, cat: 'aucune ville positionnée', gravite: (sansTerr || !ds.length) ? 3 : 2, detail: `${ds.length} lieux rattachés, aucun agglo avec coordonnées${sansTerr ? ' ; sans_territoire dit par la fiche' : ''}` });
      continue;
    }
    if (F.length && !F.includes(maj)) {
      const g = rows.length >= 3 ? 1 : 2;
      cas.push({ ...base, cat: 'masse majoritaire ≠ continent de la fiche', gravite: g, detail: `${tri.map(([k, v]) => k + ' ' + v).join(', ')} ; fiche : ${F.join('/')}` });
    }
    if (tri.length > 1) {
      const minor = rows.length - tri[0][1];
      const mer = cnt['(mer)'] || 0;
      if (minor - mer > 0) cas.push({ ...base, cat: 'dispersée sur plusieurs masses', gravite: minor / rows.length > 0.3 ? 2 : 3,
        detail: tri.map(([k, v]) => k + ' ' + v).join(', ') + ' — hors majoritaire : ' + rows.filter((r) => r.m !== maj && r.m !== '(mer)').map((r) => `${r.nom} (${r.m})`).join(', ').slice(0, 300) });
    }
  }
  return { cas, tab };
}
module.exports = { run };
if (require.main === module) {
  const { cas, tab } = run();
  const g = {}; cas.forEach((x) => { const k = x.cat + ' g' + x.gravite; g[k] = (g[k] || 0) + 1; }); console.log(g);
  cas.forEach((x) => console.log(x.gravite, x.id, x.nom, '|', x.cat, '|', x.detail));
}
