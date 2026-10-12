'use strict';
// Bibliothèque de l'audit de cohérence 1012 (lecture seule).
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const kg = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'kg-base.json'), 'utf8'));
const contours = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'monde-contours.json'), 'utf8'));
const KM = 0.955; // km par unité de carte
const byId = new Map(kg.entities.map((e) => [e.id, e]));
const out = new Map(), inn = new Map();
for (const r of kg.relations) {
  if (!out.has(r.from_id)) out.set(r.from_id, []);
  out.get(r.from_id).push(r);
  if (!inn.has(r.to_id)) inn.set(r.to_id, []);
  inn.get(r.to_id).push(r);
}
const CONTINENTS = kg.entities.filter((e) => e.type === 'lieu' && e.data && e.data.echelle === 'continent');
const CONT_BY_ID = new Map(CONTINENTS.map((c) => [c.id, c.name]));
const CONT_NAMES = new Set(CONTINENTS.map((c) => c.name));

// Position : coordonnées de la fiche, sinon position estimée
function pos(e) {
  const d = e.data || {};
  if (d.coord_x != null && d.coord_y != null) return { x: d.coord_x, y: d.coord_y, src: 'coord' };
  const pe = d.carte && d.carte.position_estimee;
  if (pe && pe.x != null) return { x: pe.x, y: pe.y, src: 'estimee', confiance: pe.confiance, terre: pe.terre };
  return null;
}
// Continents de la fiche, par remontée situe-dans / capitale-de
function continentsFiche(e) {
  const d = e.data || {};
  const res = new Map(); // nom -> profondeur
  const add = (n, depth, via) => { if (n && CONT_NAMES.has(n) && !res.has(n)) res.set(n, { depth, via }); };
  if (e.type === 'lieu' && d.echelle === 'continent') { add(e.name, 0, 'soi'); return res; }
  add(d.continent, 0, 'data.continent');
  const seen = new Set([e.id]);
  let front = [e.id], depth = 0;
  while (front.length && depth < 8) {
    depth++;
    const nxt = [];
    for (const id of front) {
      for (const r of out.get(id) || []) {
        if (r.rel_type !== 'situe-dans' && r.rel_type !== 'capitale-de') continue;
        if (seen.has(r.to_id)) continue;
        seen.add(r.to_id);
        const t = byId.get(r.to_id); if (!t) continue;
        if (t.type === 'lieu' && t.data && t.data.echelle === 'continent') add(t.name, depth, id + '>' + t.id);
        const td = t.data || {};
        if (td.continent) add(td.continent, depth, 'data.continent de ' + t.id);
        nxt.push(r.to_id);
      }
    }
    front = nxt;
    if (res.size) break;
  }
  return res;
}
// Géométrie
function inPoly(pt, poly) {
  let ok = false;
  for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
    if ((poly[a][1] > pt[1]) !== (poly[b][1] > pt[1]) &&
      pt[0] < (poly[b][0] - poly[a][0]) * (pt[1] - poly[a][1]) / (poly[b][1] - poly[a][1]) + poly[a][0]) ok = !ok;
  }
  return ok;
}
function distSeg(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy;
  let t = l2 ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}
function distPoly(p, poly) {
  let m = 1e9;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) m = Math.min(m, distSeg(p, poly[j], poly[i]));
  return m;
}
const jeu = contours.jeux.find((j) => j.era_id === null);
const terres = jeu.masses.map((m, i) => ({ ...m, idx: i })).filter((m) => m.niveau === 'continent');
const eaux = jeu.masses.map((m, i) => ({ ...m, idx: i })).filter((m) => m.niveau === 'eau');
const pays = jeu.masses.filter((m) => m.niveau === 'pays');
// centroïde bbox des terres nommées pour rattacher les îles anonymes au continent le plus proche (indication)
const nommees = terres.filter((t) => t.nom);
function nomMasse(t) {
  if (t.nom) return t.nom + (t.aire < 1000 && t.nom ? ' (îlot/anneau)' : '');
  let best = null, bd = 1e9;
  const c = t.points[0];
  for (const n of nommees) { const d = distPoly(c, n.points); if (d < bd) { bd = d; best = n.nom; } }
  return `île#${t.idx} (${t.aire} u², près de ${best}, ${(bd * KM).toFixed(0)} km)`;
}
function continentMasse(t) { // nom du continent nommé le plus proche
  if (t.nom) return t.nom;
  let best = null, bd = 1e9;
  const c = t.points[0];
  for (const n of nommees) { const d = distPoly(c, n.points); if (d < bd) { bd = d; best = n.nom; } }
  return best;
}
// localise un point : { type:'terre'|'eau'|'mer', masse, dist (u à la terre la plus proche si mer) }
function localiser(x, y) {
  const p = [x, y];
  let terre = null;
  for (const t of terres) if (inPoly(p, t.points)) { if (!terre || t.aire < terre.aire) terre = t; }
  // eau intérieure
  let eau = null;
  for (const e of eaux) if (inPoly(p, e.points)) { if (!eau || e.aire < eau.aire) eau = e; }
  if (eau) return { type: 'eau', eau, terre, dist: 0 };
  if (terre) {
    // masse "creuse" : si une terre plus petite à l'intérieur contient aussi... on prend la plus petite
    return { type: 'terre', terre, dist: 0 };
  }
  let best = null, bd = 1e9;
  for (const t of terres) { const d = distPoly(p, t.points); if (d < bd) { bd = d; best = t; } }
  return { type: 'mer', terre: best, dist: bd };
}
const bareNom = (e) => e.name;
const RE_PORT = /\b(port|havre|mouillage|rade|ancrage|quai|embarcad[eè]re|phare|plage|crique|baie|golfe|cap|côte|littoral|marin|maritime|chantier naval|île|ilot|îlot|archipel|atoll|récif)\b/i;
const RE_LAC = /\b(lac|lagune|étang|marais|mer intérieure|rive|rivage|lacustre|barque)\b/i;
module.exports = { kg, contours, KM, byId, out, inn, CONTINENTS, CONT_NAMES, pos, continentsFiche, inPoly, distPoly, jeu, terres, eaux, pays, localiser, nomMasse, continentMasse, RE_PORT, RE_LAC, ROOT };
