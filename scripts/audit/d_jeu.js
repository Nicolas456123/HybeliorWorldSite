'use strict';
const fs = require('fs'), path = require('path');
const L = require('./lib.js');
const PROTO = 'H:/HybeliorWorld_Project/HybeliorPrototype/Monde';
const gaz = JSON.parse(fs.readFileSync(PROTO + '/atrium/lieux_jeu.json', 'utf8'));
const routes = JSON.parse(fs.readFileSync(PROTO + '/ilthara/routes.json', 'utf8'));
const AGG = new Set(['cite', 'ville', 'bourg', 'hameau']);
function run() {
  const cas = [], stats = {};
  const gid = new Map(gaz.lieux.map((l) => [l.id, l]));
  // D1 : lieux de l'Atrium absents du gazetteer
  const abs = L.kg.entities.filter((e) => e.type === 'lieu' && !gid.has(e.id));
  const rais = {};
  for (const e of abs) {
    const d = e.data || {}; const ech = d.echelle || '(aucune)';
    const p = L.pos(e);
    const parents = (L.out.get(e.id) || []).filter((r) => r.rel_type === 'situe-dans').map((r) => L.byId.get(r.to_id)).filter(Boolean);
    const parentPos = parents.find((q) => L.pos(q));
    let pourquoi = p ? 'position présente mais non exportée' : 'ni coord_x/y ni position_estimee dans la fiche';
    let g = 3;
    if (AGG.has(ech)) { g = p ? 1 : 2; pourquoi += ' — agglomération (' + ech + ') absente du jeu'; }
    else if (ech === 'caravanserail') { g = 2; pourquoi += ' — caravansérail (27 dans l\'Atrium, hors critère « agglomération »)'; }
    else if (ech === 'region') { g = 3; }
    rais[ech] = (rais[ech] || 0) + 1;
    cas.push({ ctrl: 'D1', id: e.id, nom: e.name, echelle: ech, gravite: g, detail: pourquoi + (parentPos ? ` ; parent positionné : ${parentPos.name}` : ''), fiche: [...L.continentsFiche(e).keys()].join('/') || '(aucun)' });
  }
  stats.D1_par_echelle = rais; stats.D1_total = abs.length;
  // D1b : gazetteer périmé vs Atrium actuel
  for (const l of gaz.lieux) {
    const e = L.byId.get(l.id); if (!e) { cas.push({ ctrl: 'D1b', id: l.id, nom: l.nom, gravite: 2, detail: 'dans le gazetteer, absent de l\'Atrium' }); continue; }
    const p = L.pos(e); const c = l.coord_carte;
    if (p && c && (Math.abs(p.x - c[0]) > 0.5 || Math.abs(p.y - c[1]) > 0.5)) cas.push({ ctrl: 'D1b', id: l.id, nom: l.nom, gravite: 1, detail: `coordonnées gazetteer (${c[0].toFixed(1)}, ${c[1].toFixed(1)}) ≠ Atrium (${p.x.toFixed(1)}, ${p.y.toFixed(1)})` });
    const F = [...L.continentsFiche(e).keys()];
    if (F.length && l.continent && !F.includes(l.continent)) cas.push({ ctrl: 'D1b', id: l.id, nom: l.nom, gravite: 2, detail: `continent gazetteer ${l.continent} ≠ fiche actuelle ${F.join('/')} (gazetteer périmé ?)` });
  }
  // D2 : vides de peuplement (grille 4 u)
  const agg = L.kg.entities.filter((e) => e.type === 'lieu' && AGG.has(e.data && e.data.echelle) && e.data.coord_x != null).map((e) => [e.data.coord_x, e.data.coord_y]);
  const STEP = 4, R_KM = 35, R = R_KM / L.KM;
  const cells = new Map(); // "i,j" -> {terre, d}
  for (const t of L.terres) {
    const xs = t.points.map((p) => p[0]), ys = t.points.map((p) => p[1]);
    for (let x = Math.min(...xs); x <= Math.max(...xs); x += STEP) for (let y = Math.min(...ys); y <= Math.max(...ys); y += STEP) {
      const loc = L.localiser(x, y); if (loc.type !== 'terre' || loc.terre.idx !== t.idx) continue;
      let d = 1e9; for (const a of agg) { const dd = Math.hypot(a[0] - x, a[1] - y); if (dd < d) d = dd; }
      cells.set(Math.round(x / STEP) + ',' + Math.round(y / STEP), { x, y, t, d, vide: d > R });
    }
  }
  const seen = new Set(); const vides = [];
  for (const [k, c] of cells) {
    if (!c.vide || seen.has(k)) continue;
    const st = [k]; seen.add(k); const comp = [];
    while (st.length) {
      const q = st.pop(); const cc = cells.get(q); comp.push(cc);
      const [i, j] = q.split(',').map(Number);
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const n = (i + di) + ',' + (j + dj); const nc = cells.get(n); if (nc && nc.vide && !seen.has(n)) { seen.add(n); st.push(n); } }
    }
    vides.push(comp);
  }
  const par = {};
  for (const comp of vides) {
    const km2 = comp.length * STEP * STEP * L.KM * L.KM;
    const cx = comp.reduce((s, c) => s + c.x, 0) / comp.length, cy = comp.reduce((s, c) => s + c.y, 0) / comp.length;
    const maxd = Math.max(...comp.map((c) => c.d)) * L.KM;
    const masse = L.continentMasse(comp[0].t);
    par[masse] = (par[masse] || 0) + km2;
    if (km2 < 4000) continue;
    cas.push({ ctrl: 'D2', id: '-', nom: `vide ${masse} @(${cx.toFixed(0)}, ${cy.toFixed(0)})`, echelle: 'zone', gravite: km2 > 20000 ? 1 : 2, x: cx, y: cy, km2: Math.round(km2), detail: `${Math.round(km2)} km² sans agglomération à moins de ${R_KM} km (point le plus isolé : ${maxd.toFixed(0)} km), sur ${masse}`, fiche: masse, phys: masse });
  }
  stats.D2_km2_vide_par_masse = par;
  const total = {}; for (const c of cells.values()) { const m = L.continentMasse(c.t); total[m] = (total[m] || 0) + STEP * STEP * L.KM * L.KM; }
  stats.D2_km2_terre_par_masse = Object.fromEntries(Object.entries(total).map(([k, v]) => [k, Math.round(v)]));
  // D3 : agglomérations d'Ilthara non reliées au réseau 462
  const dansReseau = new Set(routes.lieux);
  const nodesLieu = new Set(routes.noeuds.filter((n) => n.lieu).map((n) => n.lieu));
  const relie = new Set([...dansReseau, ...nodesLieu]);
  const deg = new Map(); routes.aretes.forEach((a) => { for (const i of [a.a, a.b]) { const id = routes.lieux[i]; deg.set(id, (deg.get(id) || 0) + 1); } });
  const nodesOf = new Map(); routes.noeuds.filter((n) => n.lieu).forEach((n) => { if (!nodesOf.has(n.lieu)) nodesOf.set(n.lieu, []); nodesOf.get(n.lieu).push(n.id); });
  const ilt = L.kg.entities.filter((e) => e.type === 'lieu' && AGG.has(e.data && e.data.echelle) && e.data.coord_x != null && (() => { const l = L.localiser(e.data.coord_x, e.data.coord_y); return l.terre && L.continentMasse(l.terre) === 'Ilthara'; })());
  stats.D3 = { agglo_sur_masse_Ilthara: ilt.length, dans_reseau: ilt.filter((e) => relie.has(e.id)).length };
  for (const e of ilt) {
    const F = [...L.continentsFiche(e).keys()].join('/');
    if (!relie.has(e.id)) cas.push({ ctrl: 'D3', id: e.id, nom: e.name, echelle: e.data.echelle, gravite: 1, x: e.data.coord_x, y: e.data.coord_y, fiche: F, detail: `sur la masse Ilthara, absente du réseau de routes 462${F !== 'Ilthara' ? ' (fiche : ' + F + ')' : ''}` });
    else if (!deg.get(e.id)) cas.push({ ctrl: 'D3', id: e.id, nom: e.name, echelle: e.data.echelle, gravite: 2, fiche: F, detail: 'nœud sans arête' });
  }
  for (const id of routes.lieux) { const e = L.byId.get(id); if (!e) cas.push({ ctrl: 'D3', id, nom: '?', gravite: 2, detail: 'dans routes.json, absent de l\'Atrium' }); else { const F = [...L.continentsFiche(e).keys()].join('/'); if (F && F !== 'Ilthara') cas.push({ ctrl: 'D3', id, nom: e.name, gravite: 2, detail: `dans le réseau 462 (Ilthara) mais la fiche dit ${F}`, fiche: F }); } }
  stats.D3.composantes = routes.controles.composantes_du_graphe;
  return { cas, stats };
}
module.exports = { run };
if (require.main === module) {
  const { cas, stats } = run(); console.log(JSON.stringify(stats, null, 1));
  const g = {}; cas.forEach((x) => { const k = x.ctrl + ' g' + x.gravite; g[k] = (g[k] || 0) + 1; }); console.log(g);
  cas.filter((x) => x.gravite === 1).slice(0, 40).forEach((x) => console.log(x.ctrl, x.id, x.nom, '|', x.detail));
}
