'use strict';
const L = require('./lib.js');
const B = require('./b_nation_villes.js');
const AGG = new Set(['cite', 'ville', 'bourg', 'hameau']);
const CONT = [...L.CONT_NAMES];
// centroïdes (indicatifs) des références : continents = centroïde du polygone ; nations = moyenne des villes posées
function centroid(poly) { let sx = 0, sy = 0; poly.forEach((p) => { sx += p[0]; sy += p[1]; }); return [sx / poly.length, sy / poly.length]; }
const ref = new Map();
for (const c of CONT) { const t = L.terres.find((m) => m.nom === c); if (t) ref.set(c, { xy: centroid(t.points), kind: 'continent' }); }
for (const e of L.kg.entities) {
  if (e.type === 'lieu' && e.data && e.data.coord_x != null && e.data.echelle !== 'continent') ref.set(e.name, { xy: [e.data.coord_x, e.data.coord_y], kind: e.data.echelle || 'lieu', id: e.id });
}
// nations : barycentre des agglomérations rattachées
const descend = (id) => { const seen = new Set(); let f = [id]; for (let i = 0; i < 4; i++) { const n = []; for (const x of f) for (const r of L.inn.get(x) || []) if ((r.rel_type === 'situe-dans' || r.rel_type === 'capitale-de') && !seen.has(r.from_id)) { seen.add(r.from_id); n.push(r.from_id); } f = n; } return [...seen].map((i) => L.byId.get(i)).filter((e) => e && e.type === 'lieu' && AGG.has(e.data.echelle) && e.data.coord_x != null); };
for (const n of L.kg.entities.filter((e) => e.type === 'entite-politique' && e.data && e.data.genre === 'nation')) {
  const ds = descend(n.id); if (!ds.length) continue;
  ref.set(n.name, { xy: [ds.reduce((s, v) => s + v.data.coord_x, 0) / ds.length, ds.reduce((s, v) => s + v.data.coord_y, 0) / ds.length], kind: 'nation', id: n.id });
}
const names = [...ref.keys()].filter((n) => n.length >= 4).sort((a, b) => b.length - a.length);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, (c) => '\\' + c);
const DIR = { 'nord': [0, -1], 'sud': [0, 1], 'est': [1, 0], 'ouest': [-1, 0], 'nord-est': [.707, -.707], 'nord-ouest': [-.707, -.707], 'sud-est': [.707, .707], 'sud-ouest': [-.707, .707] };
const clean = (s) => (s || '').replace(/<!--[\s\S]*?-->/g, ' ').replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, '$1').replace(/[*_#>|`]/g, ' ');
const sentences = (s) => clean(s).split(/(?<=[.!?])\s+|\n+/);
const reNames = new RegExp(String.raw`(?:^|[^\p{L}])(nord-est|nord-ouest|sud-est|sud-ouest|nord|sud|est|ouest)\s+(?:de |d['’]|du |des |de l['’]|de la )?(` + names.map(esc).join('|') + String.raw`)(?![\p{L}])`, 'giu');
const contRe = new RegExp(String.raw`\b(?:plus grand|plus grande|principal|principale|premier|première|seul|seule|unique|capitale|port|chantier|chantiers|cité|ville|bourg|forteresse|village|place)\b[^.;\n]{0,70}?\b(?:d['’]|de |du |sur |en )(` + CONT.map(esc).join('|') + String.raw`)(?![\p{L}])`, 'giu');
function run() {
  const cas = [];
  for (const e of L.kg.entities) {
    if (e.type !== 'lieu' && e.type !== 'entite-politique') continue;
    const p = L.pos(e) || (ref.get(e.name) && { x: ref.get(e.name).xy[0], y: ref.get(e.name).xy[1], src: 'derive' });
    if (!p || (e.data && e.data.echelle === 'continent')) continue;
    const loc = L.localiser(p.x, p.y);
    const phys = loc.terre ? L.continentMasse(loc.terre) : null;
    const F = [...L.continentsFiche(e).keys()];
    const ech = (e.data && e.data.echelle) || e.type;
    const agg = AGG.has(ech) || e.type === 'entite-politique';
    { // C3 : tableau d'en-tête de la fiche (« Continent | X »)
      const mt = /\*\*Continent\*\*\s*\|\s*([^|\n]+)/.exec(e.body || '');
      if (mt) {
        const dit = CONT.filter((c) => mt[1].includes(c));
        if (dit.length && phys && !dit.includes(phys)) cas.push({ ctrl: 'C3', id: e.id, nom: e.name, echelle: ech, portee: 'corps', phys, fiche: F.join('/') || '(aucun)', mentionne: dit.join('/'),
          sens: 'tableau « Continent » du corps', gravite: agg ? 2 : 3, extrait: 'Continent | ' + mt[1].trim().slice(0, 100) });
      }
    }
    const parts = [['résumé', e.summary], ['corps', e.body]];
    for (const [portee, texte] of parts) {
      for (const s of sentences(texte)) {
        if (s.length < 15) continue;
        if (portee === 'corps' && !s.includes(e.name)) continue;
        // C1 : continent cité
        contRe.lastIndex = 0; let m;
        while ((m = contRe.exec(s))) {
          const cx = m[1];
          if (cx === phys) continue;
          // un autre continent cité comme appartenance de l'entité
          if (/\b(depuis|vers|venu|venus|vient|partout|commerce|route|ravitaill|expédi|échang|flotte|avec)\b/i.test(s.slice(0, m.index + 80)) && portee === 'corps') continue;
          cas.push({ ctrl: 'C1', id: e.id, nom: e.name, echelle: ech, portee, phys, fiche: F.join('/') || '(aucun)', mentionne: cx,
            sens: F.includes(cx) ? 'texte suit la fiche (contredit la carte)' : 'texte contredit carte ET fiche',
            gravite: agg ? (portee === 'résumé' ? 2 : 3) : 3, extrait: s.trim().slice(0, 240) });
          break;
        }
        if (portee === 'résumé') {
          const re2 = new RegExp(String.raw`\b(?:d['’]|de |du |sur |en |dans )(` + CONT.map(esc).join('|') + String.raw`)(?![\p{L}])`, 'giu');
          let m2; const vus = new Set();
          while ((m2 = re2.exec(s))) {
            const cx = m2[1];
            if (cx === phys || vus.has(cx)) continue;
            vus.add(cx);
            if (cas.some((c) => c.ctrl === 'C1' && c.id === e.id && c.mentionne === cx)) continue;
            cas.push({ ctrl: 'C1', id: e.id, nom: e.name, echelle: ech, portee, phys, fiche: F.join('/') || '(aucun)', mentionne: cx,
              sens: F.includes(cx) ? 'texte suit la fiche (contredit la carte)' : 'autre continent cité (souvent légitime : échanges, origine)',
              gravite: F.includes(cx) && F.length && !F.includes(phys) ? 2 : 3, extrait: s.trim().slice(0, 240) });
          }
        }
        // C2 : direction
        reNames.lastIndex = 0;
        while ((m = reNames.exec(s))) {
          const dir = DIR[m[1].toLowerCase()], r = ref.get(m[2]); if (!r || m[2] === e.name) continue;
          // un mot-clé de direction précédé d'un nom propre autre que E => on ne sait pas de qui on parle : on garde seulement si E est sujet probable
          const dx = p.x - r.xy[0], dy = p.y - r.xy[1], d = Math.hypot(dx, dy);
          if (d < 8) continue;
          const cos = (dx * dir[0] + dy * dir[1]) / d;
          if (cos < -0.17) { // > ~100° d'écart
            const ang = Math.round(Math.atan2(dy, dx) * 180 / Math.PI);
            const vrai = ['est', 'sud-est', 'sud', 'sud-ouest', 'ouest', 'nord-ouest', 'nord', 'nord-est'][((Math.round(ang / 45) % 8) + 8) % 8];
            cas.push({ ctrl: 'C2', id: e.id, nom: e.name, echelle: ech, portee, phys, fiche: F.join('/') || '(aucun)', dit: `${m[1]} de ${m[2]}`, vrai: `${vrai} de ${m[2]} (${(d * L.KM).toFixed(0)} km)`,
              gravite: cos < -0.7 ? (portee === 'résumé' ? 2 : 3) : 3, extrait: s.trim().slice(0, 240) });
          }
        }
      }
    }
  }
  return cas;
}
module.exports = { run };
if (require.main === module) {
  const c = run(); const g = {}; c.forEach((x) => { const k = x.ctrl + ' g' + x.gravite + ' ' + x.portee; g[k] = (g[k] || 0) + 1; }); console.log(g);
  c.filter((x) => x.gravite <= 2).slice(0, 60).forEach((x) => console.log(x.ctrl, x.id, x.nom, x.phys, '|', x.mentionne || x.dit + ' => ' + x.vrai, '|', x.extrait.slice(0, 140)));
}
