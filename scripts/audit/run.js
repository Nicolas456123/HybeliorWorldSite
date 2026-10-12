'use strict';
// Audit de cohérence 1012 : lance A à D, ajoute E (livres), écrit audit_cas.json et le rapport Markdown.
// Lecture seule : rien n'est écrit dans data/ ni dans le prototype.
const fs = require('fs'), path = require('path');
const L = require('./lib.js');
const A = require('./a_lieu_terre.js');
const B = require('./b_nation_villes.js');
const C = require('./c_textes.js');
const D = require('./d_jeu.js');

const RACINE = L.ROOT;
const LIVRES = path.join(RACINE, 'Docs', 'Lore');

// ---- chapitres
const chapitres = {};
const dirChro = path.join(LIVRES, 'Chroniques');
for (const f of fs.readdirSync(dirChro)) {
  const m = f.match(/^Chapitre (\d+)/);
  if (m && f.endsWith('.md')) chapitres['C/' + Number(m[1])] = path.join(dirChro, f);
}
const dirTri = path.join(LIVRES, 'Romans', 'Les Trois Coups');
for (const t of fs.readdirSync(dirTri)) {
  const tome = (t.match(/^T\d/) || [])[0];
  if (!tome) continue;
  for (const f of fs.readdirSync(path.join(dirTri, t))) {
    const m = f.match(/^(\d+)/);
    if (m && f.endsWith('.md')) chapitres[tome + '/' + Number(m[1])] = path.join(dirTri, t, f);
  }
}
const brut = {};
for (const c in chapitres) brut[c] = fs.readFileSync(chapitres[c], 'utf8').replace(/^---[\s\S]*?\n---\n/, '');
const vers = (r) => { const m = String(r).match(/^(C|T[123])\s*\/\s*(\d+)/); return m ? m[1] + '/' + Number(m[2]) : null; };
const OEUVRE = { chroniques: 'C', t1: 'T1', t2: 'T2', t3: 'T3', 'oeu-0013': 'C', 'oeu-0002': 'T1', 'oeu-0003': 'T2', 'oeu-0004': 'T3' };
const ancresDe = (x) => {
  const s = new Set(); const d = x.data || {};
  for (const r of [].concat(d.preuve || [], d.source || [])) { const c = vers(r); if (c && chapitres[c]) s.add(c); }
  if (d.recit_uid && d.chapitre != null) { const o = OEUVRE[String(d.recit_uid).split(':')[0]]; if (o && chapitres[o + '/' + d.chapitre]) s.add(o + '/' + d.chapitre); }
  return s;
};
const factsBySubj = new Map();
for (const f of L.kg.facts) { for (const id of [f.subject_id, f.object_id]) { if (!id) continue; if (!factsBySubj.has(id)) factsBySubj.set(id, []); factsBySubj.get(id).push(f); } }
const reDir = /(nord|sud|est|ouest|Alkaran|Azoria|Celethor|Cendara|Cestra|Endora|Evertia|Galenor|Ilthara|Onara|Ulinor)/;
function livres(e) {
  const anc = ancresDe(e);
  for (const f of factsBySubj.get(e.id) || []) for (const c of ancresDe(f)) anc.add(c);
  const nom = e.name.replace(/\s*\(.*\)\s*$/, '');
  const res = { ancres: [...anc].sort(), chapitres_nommant: [], phrases_spatiales: [] };
  if (nom.length < 4) return res;
  const re = new RegExp('(^|[^\\p{L}])' + nom.replace(/[.*+?^${}()|[\]\\]/g, (c) => '\\' + c) + '(?![\\p{L}])', 'u');
  for (const c in brut) {
    if (!re.test(brut[c])) continue;
    res.chapitres_nommant.push(c);
    if (res.phrases_spatiales.length < 3) {
      for (const s of brut[c].split(/(?<=[.!?»])\s+|\n+/)) {
        if (re.test(s) && reDir.test(s) && s.length < 400) { res.phrases_spatiales.push(c + ' : ' + s.trim().slice(0, 220)); break; }
      }
    }
  }
  return res;
}

// ---- lancement
const a = A.run();
const b = B.run();
const c = C.run();
const d = D.run();
const cas = [...a, ...b.cas, ...c, ...d.cas];

// ---- attribution à un continent (physique, carte) pour le classement
const physDe = (x) => {
  if (x.phys) return String(x.phys).replace(/^mer près de /, '').replace(/^île#\d+ \([^)]*près de ([^,)]+).*$/, '$1').replace(/ \(îlot\/anneau\)/, '').split(' (')[0];
  if (x.majoritaire) return x.majoritaire;
  return '(non localisé)';
};
const idsGrav = new Set(cas.filter((x) => x.gravite <= 2 && x.id && x.id !== '-').map((x) => x.id));

// ---- raccord : les 11 citations introuvables touchent-elles nos cas ?
let raccordIds = new Set();
try {
  const txt = fs.readFileSync(process.env.RACCORD || path.join(__dirname, 'raccord_detail.txt'), 'utf8');
  for (const m of txt.matchAll(/✗ ([a-z]{3}-\d{4})/g)) raccordIds.add(m[1]);
} catch (e) { /* facultatif */ }

// ---- propositions de correction (gravité 1) : regroupées
const groupes = {};
const prop = (x) => {
  const key = `${x.ctrl}|${x.fiche}|${physDe(x)}`;
  return key;
};
for (const x of cas) {
  if (x.gravite !== 1 || x.ctrl !== 'A1') continue;
  const k = prop(x); (groupes[k] = groupes[k] || []).push(x);
}
const PAYS_CENTRE = {};
for (const p of L.pays) {
  const cx = p.points.reduce((s, q) => s + q[0], 0) / p.points.length, cy = p.points.reduce((s, q) => s + q[1], 0) / p.points.length;
  const loc = L.localiser(cx, cy);
  PAYS_CENTRE[p.nom] = { aire: p.aire, masse: loc.terre ? L.continentMasse(loc.terre) : '(mer)' };
}
function proposition(x) {
  if (x.ctrl === 'A1' && x.gravite === 1) {
    const k = prop(x); const g = groupes[k];
    return `La carte fait foi : ${g.length} lieu(x) du groupe « fiche ${x.fiche} -> carte ${physDe(x)} » ; corriger le rattachement (data.continent, situe-dans vers le continent, data.region) et les textes de ces fiches vers ${physDe(x)}, ou, si la nation n'est pas censée y être, déplacer le groupe d'un bloc. Le plus probable : rattacher à ${physDe(x)} (groupe cohérent de ${g.length} lieux, tous posés ensemble).`;
  }
  if (x.ctrl === 'B') return `La carte fait foi : la masse majoritaire (${x.majoritaire}) devient le continent de la nation (data.continent, tableau « Continent » du corps, résumé), et ses régions suivent.`;
  if (x.ctrl === 'D3') return `Ajouter ces agglomérations au réseau de routes 462 (relancer le tracé sur la masse Ilthara) une fois le rattachement tranché.`;
  if (x.ctrl === 'D1') return `Positionner la fiche (coord_x/y) ou exporter sa position vers le gazetteer.`;
  if (x.ctrl === 'D2') return `Peuplement à compléter ou vide assumé (désert, glace) à documenter.`;
  if (x.ctrl === 'A2' || x.ctrl === 'A4') return `Vérifier le tracé de côte ou noter port/île dans la fiche ; la position est bonne.`;
  return '';
}
for (const x of cas) { x.continent_carte = physDe(x); if (x.gravite <= 2 && x.id !== '-' && !String(x.ctrl).startsWith('D1')) x.livres = livres(L.byId.get(x.id) || { id: x.id, name: x.nom || '', data: {} }); if (x.gravite === 1) x.proposition = proposition(x); if (raccordIds.has(x.id)) x.raccord_introuvable = true; }
// cas D1 g1/g2 d'agglomérations : livres aussi
for (const x of cas) if (x.ctrl === 'D1' && x.gravite <= 2 && L.byId.get(x.id)) x.livres = livres(L.byId.get(x.id));

fs.writeFileSync(path.join(__dirname, 'audit_cas.json'), JSON.stringify({ date: '2026-10-12', cas, stats_d: d.stats, nations: b.tab, pays_centre: PAYS_CENTRE }, null, 1));

// ---- comptes
const compte = {};
for (const x of cas) { const k = x.ctrl; compte[k] = compte[k] || { 1: 0, 2: 0, 3: 0, total: 0 }; compte[k][x.gravite]++; compte[k].total++; }
console.log(JSON.stringify(compte));
module.exports = { cas, compte, d, b, PAYS_CENTRE, groupes };
