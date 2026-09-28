#!/usr/bin/env node
'use strict';
/*
 * scripts/tracer-routes.js — Donne à chaque étape des trajets (`data.parcours`)
 * une ROUTE plausible au lieu de la ligne droite : le chemin qu'on suit
 * vraiment sur la carte de l'auteur.
 *
 *   - En mer (navire, barque…) : un chemin sur l'eau, qui ne coupe jamais une
 *     terre et préfère longer les côtes (le cabotage : on s'écarte du rivage
 *     seulement quand le raccourci en vaut la peine). Chaque journée de mer
 *     finit à une ESCALE — le port connu le plus proche de la route — ou, faute
 *     de port, par une nuit au mouillage ou au large.
 *   - Sur une rivière : quand les deux bouts sont sur la même terre et que la
 *     route de terre est bien plus courte que le tour par la mer, le bateau
 *     descend un fleuve : on suit la terre (la carte ne trace pas les rivières).
 *   - À terre (marche, mule, cheval, relais, caravane…) : un chemin sur la
 *     terre. Un bras de mer à franchir se compte à part (`route.eau_u`), à
 *     l'allure d'un bac : si le texte ne le dit pas, c'est à dire.
 *   - « autre » (l'arche, la cité volante) : la ligne droite.
 *
 * Écrit dans chaque étape : `route = { u, terre_u, eau_u, fleuve, trace,
 * escales }` (u = unités de carte le long de la route ; trace simplifiée).
 * `scripts/verifier-trajets.js` juge ensuite la longueur de la route.
 *
 * Usage : node scripts/tracer-routes.js [--essai]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const KG = path.join(ROOT, 'data', 'kg-base.json');
const CONTOURS = path.join(ROOT, 'data', 'monde-contours.json');
const ESSAI = process.argv.includes('--essai');

const raw = fs.readFileSync(KG, 'utf8');
const kg = JSON.parse(raw);
const byId = new Map(kg.entities.map((e) => [e.id, e]));
const monde = kg.entities.find((e) => e.data && e.data.echelle === 'monde' && e.data.echelle_carte);
const ECH = monde.data.echelle_carte;
const KPU = +ECH.km_par_unite || (+ECH.lieue_km / +ECH.unites_par_lieue);
const UPL = +ECH.lieue_km / KPU;
const MODES_EAU = new Set(ECH.modes_eau || ['bateau', 'navire', 'barge', 'pirogue', 'bac']);
['barque', 'canot', 'bac'].forEach((m) => MODES_EAU.add(m));
const VITESSE_NAVIRE = (ECH.vitesses && ECH.vitesses.navire && +ECH.vitesses.navire.normal) || 25;

// ── la grille : 1 case = 1 unité de carte ────────────────────────────────
const X0 = -527.5, Y0 = -535, W = 1048, H = 1071;
const terre = new Uint8Array(W * H);
const idx = (cx, cy) => cy * W + cx;
const versCase = (x, y) => [Math.max(0, Math.min(W - 1, Math.floor(x - X0))), Math.max(0, Math.min(H - 1, Math.floor(y - Y0)))];
const versMonde = (i) => [(i % W) + X0 + 0.5, Math.floor(i / W) + Y0 + 0.5];

const jeu = JSON.parse(fs.readFileSync(CONTOURS, 'utf8')).jeux.find((j) => j.era_id == null);
const masses = jeu.masses.filter((m) => m.niveau === 'continent');
for (const m of masses) {                     // remplissage par balayage de lignes
  const P = m.points;
  let ymin = Infinity, ymax = -Infinity;
  for (const [, y] of P) { ymin = Math.min(ymin, y); ymax = Math.max(ymax, y); }
  for (let cy = Math.max(0, Math.floor(ymin - Y0)); cy <= Math.min(H - 1, Math.ceil(ymax - Y0)); cy++) {
    const yc = cy + Y0 + 0.5; const xs = [];
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      const [xi, yi] = P[i], [xj, yj] = P[j];
      if ((yi > yc) !== (yj > yc)) xs.push(xi + (yc - yi) / (yj - yi) * (xj - xi));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      for (let cx = Math.max(0, Math.ceil(xs[k] - X0 - 0.5)); cx <= Math.min(W - 1, Math.floor(xs[k + 1] - X0 - 0.5)); cx++) terre[idx(cx, cy)] = 1;
    }
  }
}

// distance au rivage, côté mer (en cases, 8-connexité approchée)
const auLarge = new Float32Array(W * H).fill(Infinity);
{
  const file = [];
  for (let i = 0; i < W * H; i++) if (terre[i]) { auLarge[i] = 0; file.push(i); }
  for (let h = 0; h < file.length; h++) {
    const i = file[h], cx = i % W, cy = (i / W) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const j = idx(nx, ny); if (auLarge[j] <= auLarge[i] + 1) continue;
      auLarge[j] = auLarge[i] + 1; file.push(j);
    }
  }
}

// l'océan : l'eau reliée au bord de la carte (les lacs intérieurs n'en sont pas)
const ocean = new Uint8Array(W * H);
{
  const file = [];
  for (let cx = 0; cx < W; cx++) for (const cy of [0, H - 1]) { const i = idx(cx, cy); if (!terre[i] && !ocean[i]) { ocean[i] = 1; file.push(i); } }
  for (let cy = 0; cy < H; cy++) for (const cx of [0, W - 1]) { const i = idx(cx, cy); if (!terre[i] && !ocean[i]) { ocean[i] = 1; file.push(i); } }
  for (let h = 0; h < file.length; h++) {
    const i = file[h], cx = i % W, cy = (i / W) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const j = idx(nx, ny); if (terre[j] || ocean[j]) continue; ocean[j] = 1; file.push(j);
    }
  }
}

// ── A* sur la grille ──────────────────────────────────────────────────────
// cout(i) : coût d'entrée dans la case i, ou Infinity si interdite.
const G = new Float64Array(W * H), DE = new Int32Array(W * H), FERME = new Uint8Array(W * H);
function astar(depart, arrivee, cout) {
  G.fill(Infinity); DE.fill(-1); FERME.fill(0);
  const [ax, ay] = [arrivee % W, (arrivee / W) | 0];
  const hf = (i) => { const dx = Math.abs(i % W - ax), dy = Math.abs(((i / W) | 0) - ay); return Math.max(dx, dy) + (Math.SQRT2 - 1) * Math.min(dx, dy); };
  const tas = [], prio = [];
  const pousser = (i, f) => { tas.push(i); prio.push(f); let k = tas.length - 1; while (k > 0) { const p = (k - 1) >> 1; if (prio[p] <= prio[k]) break; [tas[p], tas[k]] = [tas[k], tas[p]]; [prio[p], prio[k]] = [prio[k], prio[p]]; k = p; } };
  const tirer = () => { const r = tas[0]; const lt = tas.pop(), lp = prio.pop(); if (tas.length) { tas[0] = lt; prio[0] = lp; let k = 0; for (;;) { const a = 2 * k + 1, b = a + 1; let m = k; if (a < tas.length && prio[a] < prio[m]) m = a; if (b < tas.length && prio[b] < prio[m]) m = b; if (m === k) break; [tas[m], tas[k]] = [tas[k], tas[m]]; [prio[m], prio[k]] = [prio[k], prio[m]]; k = m; } } return r; };
  G[depart] = 0; pousser(depart, hf(depart));
  while (tas.length) {
    const i = tirer(); if (FERME[i]) continue; FERME[i] = 1;
    if (i === arrivee) break;
    const cx = i % W, cy = (i / W) | 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const j = idx(nx, ny); if (FERME[j]) continue;
      const c = cout(j); if (c === Infinity) continue;
      const g = G[i] + c * (dx && dy ? Math.SQRT2 : 1);
      if (g < G[j]) { G[j] = g; DE[j] = i; pousser(j, g + hf(j)); }
    }
  }
  if (!FERME[arrivee]) return null;
  const chemin = []; for (let i = arrivee; i !== -1; i = DE[i]) chemin.push(i);
  return chemin.reverse();
}
// la case la plus proche d'un type voulu (terre = 1 / mer = 0), en spirale
function plusProche(x, y, veutTerre, oceanSeul) {
  const [cx, cy] = versCase(x, y);
  for (let r = 0; r < 80; r++) {
    let best = -1, bd = Infinity;
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
      const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const j = idx(nx, ny); if (!!terre[j] !== veutTerre || (oceanSeul && !ocean[j])) continue;
      const d = Math.hypot(dx, dy); if (d < bd) { bd = d; best = j; }
    }
    if (best >= 0) return best;
  }
  return -1;
}

// on longe les côtes : le large coûte plus cher, et le grand large plus encore
const coutMer = (j) => (terre[j] ? Infinity : auLarge[j] > 30 ? 1.8 : auLarge[j] > 12 ? 1.4 : 1);
const coutTerre = (j) => (terre[j] ? 1 : 6);                                  // un bras de mer coûte cher
const coutTerreSeule = (j) => (terre[j] ? 1 : Infinity);

// Lissage en ligne de vue : on coupe au plus court entre deux cases du chemin tant
// que le raccourci reste sur le même élément (terre, ou eau) et, en mer, ne
// s'éloigne pas plus au large que le chemin d'origine.
function surSegment(i, j, f) {
  const [x1, y1] = versMonde(i), [x2, y2] = versMonde(j);
  const n = Math.ceil(Math.hypot(x2 - x1, y2 - y1) * 2);
  for (let k = 1; k < n; k++) { const [cx, cy] = versCase(x1 + (x2 - x1) * k / n, y1 + (y2 - y1) * k / n); if (!f(idx(cx, cy))) return false; }
  return true;
}
function lisser(ch, enMer) {
  if (ch.length < 3) return ch;
  const out = [ch[0]]; let i = 0;
  while (i < ch.length - 1) {
    let j = i + 1, largeMax = Math.max(auLarge[ch[i]], auLarge[ch[j]]);
    const type = terre[ch[i + 1]];
    while (j + 1 < ch.length) {
      const c = ch[j + 1];
      if (!enMer && terre[c] !== type) break;
      const lm = Math.max(largeMax, auLarge[c]);
      const ok = enMer ? (j2) => !terre[j2] && auLarge[j2] <= Math.max(12, lm)
        : (j2) => terre[j2] === type;
      if (!surSegment(ch[i], c, ok)) break;
      j++; largeMax = lm;
    }
    out.push(ch[j]); i = j;
  }
  return out;
}

// la trace, en morceaux de terre et d'eau (chacun simplifié)
function morceaux(pts, eauDe) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const e = eauDe(i) ? 1 : 0;
    if (!out.length || out[out.length - 1].eau !== e) out.push({ eau: e, p: out.length ? [out[out.length - 1].p.slice(-1)[0]] : [] });
    out[out.length - 1].p.push(pts[i]);
  }
  return out.map((m) => ({ eau: m.eau, p: simplifier(m.p, 0.8).map(([x, y]) => [r1(x), r1(y)]) })).filter((m) => m.p.length > 1);
}
function longueur(pts) { let s = 0; for (let i = 1; i < pts.length; i++) s += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return s; }
function simplifier(pts, eps) {                // Ramer-Douglas-Peucker
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const L = Math.hypot(bx - ax, by - ay) || 1e-9;
  let dmax = 0, k = 0;
  for (let i = 1; i < pts.length - 1; i++) { const d = Math.abs((by - ay) * pts[i][0] - (bx - ax) * pts[i][1] + bx * ay - by * ax) / L; if (d > dmax) { dmax = d; k = i; } }
  if (dmax <= eps) return [pts[0], pts[pts.length - 1]];
  return simplifier(pts.slice(0, k + 1), eps).slice(0, -1).concat(simplifier(pts.slice(k), eps));
}
const r1 = (n) => Math.round(n * 10) / 10;

// ── les ports : lieux posés sur une côte ─────────────────────────────────
function position(id) {
  const e = id && byId.get(id); const d = e && e.data; if (!d) return null;
  if (d.coord_x != null && d.coord_y != null) return { x: +d.coord_x, y: +d.coord_y };
  const pe = d.carte && d.carte.position_estimee; if (pe && pe.x != null) return { x: +pe.x, y: +pe.y };
  return null;
}
const ports = [];
for (const e of kg.entities) {
  if (e.type !== 'lieu' || !['ville', 'cite', 'bourg', 'hameau'].includes(e.data && e.data.echelle)) continue;
  const p = position(e.id); if (!p) continue;
  const [cx, cy] = versCase(p.x, p.y);
  let cote = false;                           // de l'eau à 3 unités au plus
  for (let dy = -3; dy <= 3 && !cote; dy++) for (let dx = -3; dx <= 3; dx++) {
    const nx = cx + dx, ny = cy + dy; if (nx >= 0 && ny >= 0 && nx < W && ny < H && !terre[idx(nx, ny)]) { cote = true; break; }
  }
  if (cote) ports.push({ id: e.id, nom: e.name, x: p.x, y: p.y, rang: e.data.echelle === 'cite' ? 0 : e.data.echelle === 'ville' ? 1 : 2 });
}

// les escales : une par journée de mer, au port connu le plus proche de la route
function escales(pts, idDepart, idArrivee) {
  const jour = VITESSE_NAVIRE * UPL;          // une journée de navire, en unités
  const total = longueur(pts);
  const out = []; const pris = new Set([idDepart, idArrivee]);
  let cumul = 0, cible = jour;
  for (let i = 1; i < pts.length && cible < total - jour * 0.4; i++) {
    const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    while (cible <= cumul + seg && cible < total - jour * 0.4) {
      const t = (cible - cumul) / seg;
      const x = pts[i - 1][0] + t * (pts[i][0] - pts[i - 1][0]), y = pts[i - 1][1] + t * (pts[i][1] - pts[i - 1][1]);
      let best = null, bd = Infinity;
      for (const p of ports) { if (pris.has(p.id)) continue; const d = Math.hypot(p.x - x, p.y - y) + p.rang * 3; if (d < bd) { bd = d; best = p; } }
      if (best && bd <= 28) { pris.add(best.id); out.push({ id: best.id, nom: best.nom, x: r1(best.x), y: r1(best.y), jour: Math.round(cible / jour) }); }
      else out.push({ id: null, nom: auLarge[idx(...versCase(x, y))] > 12 ? 'nuit au large' : 'mouillage sur la côte', x: r1(x), y: r1(y), jour: Math.round(cible / jour) });
      cible += jour;
    }
    cumul += seg;
  }
  return out;
}

// ── une route pour chaque étape ──────────────────────────────────────────
const stats = { mer: 0, fleuve: 0, terre: 0, bac: 0, droite: 0, echec: 0, escales: 0, ports: 0 };
const alertes = [];
function router(a, b, mode, idA, idB) {
  const direct = Math.hypot(b.x - a.x, b.y - a.y);
  if (direct < 2 || mode === 'autre') { stats.droite++; return { u: r1(direct), terre_u: mode === 'autre' ? 0 : r1(direct), eau_u: 0, trace: null, escales: [] }; }
  if (MODES_EAU.has(mode)) {
    const s = plusProche(a.x, a.y, false, true), t = plusProche(b.x, b.y, false, true);
    const ch = s >= 0 && t >= 0 ? astar(s, t, coutMer) : null;
    const mer = ch ? [[a.x, a.y], ...lisser(ch, true).map(versMonde), [b.x, b.y]] : null;
    // fleuve ? même terre des deux côtés, et la terre bien plus courte que la mer
    const sa = plusProche(a.x, a.y, true), sb = plusProche(b.x, b.y, true);
    const chT = sa >= 0 && sb >= 0 ? astar(sa, sb, coutTerreSeule) : null;
    const ter = chT ? [[a.x, a.y], ...lisser(chT, false).map(versMonde), [b.x, b.y]] : null;
    if (ter && (!mer || longueur(ter) * 1.6 < longueur(mer))) {
      stats.fleuve++;
      return { u: r1(longueur(ter)), terre_u: 0, eau_u: r1(longueur(ter)), fleuve: true, trace: morceaux(ter, () => true), escales: [] };
    }
    if (!mer) { stats.echec++; alertes.push(`pas de route d'eau de ${idA} à ${idB}`); return null; }
    stats.mer++; const esc = escales(mer, idA, idB);
    stats.escales += esc.length; stats.ports += esc.filter((e) => e.id).length;
    return { u: r1(longueur(mer)), terre_u: 0, eau_u: r1(longueur(mer)), trace: morceaux(mer, () => true), escales: esc };
  }
  const s = plusProche(a.x, a.y, true), t = plusProche(b.x, b.y, true);
  const ch = s >= 0 && t >= 0 ? astar(s, t, coutTerre) : null;
  if (!ch) { stats.echec++; alertes.push(`pas de route de terre de ${idA} à ${idB}`); return null; }
  const cl = lisser(ch, false);
  const pts = [[a.x, a.y], ...cl.map(versMonde), [b.x, b.y]];
  // un pas est d'eau quand sa case d'arrivée l'est (le lissage garde les passages terre/eau)
  let eau = 0; for (let i = 1; i < cl.length; i++) if (!terre[cl[i]]) eau += Math.hypot(versMonde(cl[i])[0] - versMonde(cl[i - 1])[0], versMonde(cl[i])[1] - versMonde(cl[i - 1])[1]);
  const L = longueur(pts);
  if (eau > 0.5) stats.bac++; else stats.terre++;
  // pts = [départ, ...cases, arrivée] : l'indice i de pts correspond à la case ch[i - 1]
  const eauDe = (i) => i > 0 && i <= cl.length && !terre[cl[i - 1]];
  return { u: r1(L), terre_u: r1(L - eau), eau_u: r1(eau), trace: morceaux(pts, eauDe), escales: [] };
}

let n = 0;
for (const ent of kg.entities) {
  const P = ent.data && ent.data.parcours; if (!Array.isArray(P)) continue;
  let prec = null;
  for (const et of P) {
    delete et.route;
    const pos = position(et.lieu_id) || (et.x != null ? { x: +et.x, y: +et.y } : null);
    if (!pos || et.souvenir) continue;
    if (prec && !et.sur_place) {
      const mode = et.mode && et.mode !== 'inconnu' ? et.mode : 'marche';
      const r = router(prec.pos, pos, mode, prec.id, et.lieu_id);
      if (r) { r.fait_le = '2026-09-28'; et.route = r; n++; }
      if (r && r.eau_u > 3 && !MODES_EAU.has(mode) && mode !== 'autre') alertes.push(`${ent.name} · ${et.chapitre} · ${prec.nom} → ${et.lieu} : ${mode}, ${r1(r.eau_u / UPL)} lieues d'eau à franchir`);
    }
    prec = { pos, id: et.lieu_id, nom: et.lieu };
  }
}
console.log(`Terre : ${masses.length} masses, ${terre.reduce((s, v) => s + v, 0)} u² · ports connus sur une côte : ${ports.length}`);
console.log(`Routes : ${n} — mer ${stats.mer} · fleuve ${stats.fleuve} · terre ${stats.terre} · terre avec bras de mer ${stats.bac} · ligne droite ${stats.droite} · échecs ${stats.echec}`);
console.log(`Escales : ${stats.escales}, dont ${stats.ports} dans un port connu`);
for (const a of alertes) console.log('  ! ' + a);
if (!ESSAI) { fs.writeFileSync(KG, JSON.stringify(kg, null, raw.includes('\n  ') ? 2 : 0) + (raw.endsWith('\n') ? '\n' : '')); console.log('→ data/kg-base.json écrit'); }
