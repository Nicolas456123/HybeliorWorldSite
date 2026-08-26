#!/usr/bin/env node
'use strict';
/*
 * scripts/inferer-dates.js — Situe dans le temps TOUT ce qui peut l'être, en
 * propageant les dates connues à travers le graphe.
 *
 * Beaucoup d'éléments n'ont aucune date écrite mais sont attachés à quelque
 * chose de daté : un successeur, un père, un conjoint, une lignée, un règne,
 * une œuvre. Une date approchée vaut mieux que pas de date — à condition de
 * dire d'où elle vient et à quel point on y croit.
 *
 * Chaque entité reçoit une PÉRIODE (floruit) : `data.periode = { debut, fin,
 * methode, confiance, indice }`. Chaque fait encore vide reçoit une date
 * dérivée de la période de son sujet, selon son type (une naissance prend le
 * début, une mort la fin, un règne toute la période).
 *
 * Règles, de la plus sûre à la plus lâche — la confiance baisse à chaque
 * propagation, et une date issue d'une propagation ne remplace jamais une
 * date écrite :
 *   1. faits datés du sujet        → période directe          (haute)
 *   2. succède-à                   → après son prédécesseur   (haute)
 *   3. ordinal de règne            → interpolation dans la liste (moyenne)
 *   4. conjoint / fratrie          → même génération          (moyenne)
 *   5. parent-de / descend-de      → ± une génération (27 ans) (moyenne)
 *   6. fonde / gouverne / capitale → contemporain de l'objet  (moyenne)
 *   7. membre-de, apparaît-dans    → dans la période du groupe (basse)
 *   8. situé-dans une polité datée → après sa fondation       (basse)
 *
 * Usage :
 *   node scripts/inferer-dates.js --essai        # revue à blanc
 *   node scripts/inferer-dates.js                # applique
 *   node scripts/inferer-dates.js --lecture <f>  # + résultats des agents (JSON)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const ESSAI = process.argv.includes('--essai');
const iLect = process.argv.indexOf('--lecture');
const FICHIER_LECTURE = iLect >= 0 ? process.argv[iLect + 1] : null;

const DECALAGE = 9949;         // régional / Sillage → absolu
const GENERATION = 27;         // ans entre deux générations
const REGNE = 25;              // durée d'un règne faute de mieux
// (le présent, an 10 200, sert de repère dans les scripts amont)

const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const byId = {}; for (const e of doc.entities) byId[e.id] = e;

// ── périodes : ce qu'on sait, et avec quelle force ────────────────────────
const RANG = { haute: 3, moyenne: 2, basse: 1 };
const periode = {};            // id → { debut, fin, confiance, methode, indice }

// Une vie humaine ne s'étale pas sur des millénaires : quand une période est
// héritée d'un lieu ou d'une institution (qui, eux, durent), on la ramène à
// une échelle de vie plutôt que de laisser un personnage couvrir 17 000 ans.
const VIE_MAX = 90;

function poser(id, debut, fin, confiance, methode, indice) {
  const e = byId[id];
  if (!e || debut == null || !Number.isFinite(debut)) return false;
  if (debut < -1e6 || debut > 11000) return false;                 // hors monde
  const p = periode[id];
  if (p && RANG[p.confiance] >= RANG[confiance]) return false;     // déjà mieux
  let f = fin != null && Number.isFinite(fin) ? Math.round(Math.max(fin, debut)) : null;
  const d = Math.round(debut);
  if (e.type === 'personne' && f != null && f - d > VIE_MAX) f = d + VIE_MAX;
  periode[id] = { debut: d, fin: f, confiance, methode, indice: indice || null };
  return true;
}

// 1. faits déjà datés → période directe (source de vérité)
for (const f of doc.facts) {
  if (f.start_year == null) continue;
  for (const id of [f.subject_id, f.object_id]) {
    if (!id || !byId[id]) continue;
    const p = periode[id];
    const d = Math.min(p && p.confiance === 'haute' ? p.debut : Infinity, f.start_year);
    const fin = Math.max(p && p.confiance === 'haute' && p.fin != null ? p.fin : -Infinity,
      f.end_year != null ? f.end_year : f.start_year);
    periode[id] = { debut: d, fin: Number.isFinite(fin) ? fin : null, confiance: 'haute', methode: 'fait-date', indice: null };
  }
}
// Périodes déjà inscrites sur les entités (lecture du corpus par les agents,
// puis par scripts/dater-par-corpus.js) : ce sont des ancres à part entière.
// Sans cette reprise, une nouvelle passe de propagation les écraserait.
for (const e of doc.entities) {
  const p = e.data && e.data.periode;
  if (!p || p.debut == null) continue;
  poser(e.id, p.debut, p.fin, p.confiance || 'basse', p.methode || 'periode-existante', p.indice);
}
const ancresInitiales = Object.keys(periode).length;

// ── résultats de la lecture du corpus par les agents ──────────────────────
let lecture = [];
if (FICHIER_LECTURE && fs.existsSync(FICHIER_LECTURE)) {
  const brut = JSON.parse(fs.readFileSync(FICHIER_LECTURE, 'utf8'));
  lecture = Array.isArray(brut) ? brut : (brut.resultats || []);
}
const versAbsolu = (an, cal) => (cal === 'regional' || cal === 'sillage') ? an + DECALAGE : an;
let posesLecture = 0;
for (const r of lecture) {
  if (!r || r.methode === 'aucune' || r.annee_source == null) continue;
  const [genre, id] = String(r.cible || '').split(':');
  if (!id || !byId[id] && genre === 'entity') continue;
  const deb = versAbsolu(r.annee_source, r.calendrier);
  const fin = r.annee_fin_source != null ? versAbsolu(r.annee_fin_source, r.calendrier) : null;
  const conf = r.methode === 'corpus-explicite' ? 'haute' : r.methode === 'corpus-deduit' ? 'moyenne' : 'basse';
  if (genre === 'entity') {
    if (poser(id, deb, fin, conf, 'corpus:' + r.methode, r.indice)) posesLecture++;
  } else if (genre === 'fact') {
    const f = doc.facts.find((x) => x.id === id);
    // Une date LUE DANS LE CORPUS prime sur une date seulement déduite des
    // liens — lire la fiche vaut mieux que propager de proche en proche. Le
    // pipeline ne dépend donc pas de l'ordre des passes. Seule exception : un
    // simple contexte (confiance basse) ne déloge pas une déduction solide.
    const deduite = f && f.data && f.data.source_date === 'inference';
    const remplacable = f && (f.start_year == null
      || (deduite && (conf !== 'basse' || f.data.confiance === 'basse')));
    if (remplacable) {
      f.start_year = Math.round(deb);
      if (fin != null && fin > deb) f.end_year = Math.round(fin);
      f.start_circa = conf === 'haute' ? 0 : 1;
      f.start_precision = conf === 'haute' ? 'annee' : 'estimation';
      f.data = Object.assign({}, f.data, {
        calendrier: r.calendrier || 'absolu', source_date: 'corpus-lu',
        methode: r.methode, confiance: conf, indice_date: r.indice || null, fiche: r.fichier || null,
      });
      posesLecture++;
      if (f.subject_id) poser(f.subject_id, deb, fin, conf, 'corpus:' + r.methode, r.indice);
    }
  }
}

// ── index des relations ───────────────────────────────────────────────────
const sortantes = {}, entrantes = {};
for (const r of doc.relations) {
  (sortantes[r.from_id] = sortantes[r.from_id] || []).push(r);
  (entrantes[r.to_id] = entrantes[r.to_id] || []).push(r);
}
const voisins = (id, type, sens) =>
  ((sens === 'in' ? entrantes[id] : sortantes[id]) || [])
    .filter((r) => r.rel_type === type)
    .map((r) => (sens === 'in' ? r.from_id : r.to_id));

// ── 2. ordinaux de règne : interpoler les listes de dirigeants ───────────
const ORDINAUX = ['premier', 'première', 'deuxième', 'second', 'seconde', 'troisième', 'quatrième',
  'cinquième', 'sixième', 'septième', 'huitième', 'neuvième', 'dixième', 'onzième', 'douzième',
  'treizième', 'quatorzième', 'quinzième', 'seizième', 'dix-septième', 'dix-huitième',
  'dix-neuvième', 'vingtième', 'vingt-et-unième', 'vingt-deuxième'];
const VALEUR = { premier: 1, première: 1, deuxième: 2, second: 2, seconde: 2, troisième: 3, quatrième: 4,
  cinquième: 5, sixième: 6, septième: 7, huitième: 8, neuvième: 9, dixième: 10, onzième: 11,
  douzième: 12, treizième: 13, quatorzième: 14, quinzième: 15, seizième: 16, 'dix-septième': 17,
  'dix-huitième': 18, 'dix-neuvième': 19, vingtième: 20, 'vingt-et-unième': 21, 'vingt-deuxième': 22 };
const ROMAINS = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, XI: 11, XII: 12 };

// L'ordinal est celui qui OUVRE le libellé : dans « Treizième Premier
// Capitaine de Bord », le rang est treizième — « Premier Capitaine » est le
// titre de la charge. On prend donc le plus à gauche, pas le premier trouvé.
function ordinalDe(f) {
  const t = (f.label || '').toLowerCase();
  let best = null;
  for (const o of ORDINAUX) {
    const m = t.match(new RegExp('\\b' + o + '\\b'));
    if (!m) continue;
    if (!best || m.index < best.i || (m.index === best.i && o.length > best.o.length)) best = { i: m.index, o };
  }
  if (best && best.i <= 2) return VALEUR[best.o];        // en tête du libellé
  const s = byId[f.subject_id];
  if (s) { const m = s.name.match(/\s([IVX]{1,5})$/); if (m && ROMAINS[m[1]]) return ROMAINS[m[1]]; }
  return best ? VALEUR[best.o] : null;
}
// Regrouper les règnes par POLITÉ GOUVERNÉE — c'est structurel, là où les
// libellés de titres varient trop pour servir de clé. Dans une même polité,
// les rangs (« Kethron III », « Treizième Capitaine ») ordonnent la liste.
const parCharge = {};
for (const f of doc.facts) {
  if (f.fact_type !== 'regne') continue;
  const pol = voisins(f.subject_id, 'gouverne', 'out')[0];
  const o = ordinalDe(f);
  if (o == null || !pol) continue;
  (parCharge[pol] = parCharge[pol] || []).push({ f, ord: o });
}
let posesOrdinal = 0;
for (const liste of Object.values(parCharge)) {
  if (liste.length < 2) continue;
  liste.sort((a, b) => a.ord - b.ord);
  const ancres = liste.filter((x) => x.f.start_year != null);
  if (!ancres.length) continue;
  // cadence : pente entre les deux ancres extrêmes, sinon durée de règne type
  let cad = REGNE;
  if (ancres.length >= 2) {
    const a = ancres[0], b = ancres[ancres.length - 1];
    if (b.ord > a.ord) cad = Math.max(2, Math.min(60, (b.f.start_year - a.f.start_year) / (b.ord - a.ord)));
  }
  for (const x of liste) {
    if (x.f.start_year != null) continue;
    // ancre la plus proche en ordinal
    let best = null;
    for (const a of ancres) if (!best || Math.abs(a.ord - x.ord) < Math.abs(best.ord - x.ord)) best = a;
    const an = Math.round(best.f.start_year + (x.ord - best.ord) * cad);
    if (an < -1e6 || an > 10400) continue;
    if (ESSAI) { posesOrdinal++; continue; }
    x.f.start_year = an;
    x.f.start_circa = 1;
    x.f.start_precision = 'estimation';
    x.f.data = Object.assign({}, x.f.data, {
      source_date: 'inference', methode: 'ordinal-interpole', confiance: 'moyenne',
      indice_date: `${x.ord}ᵉ de la liste ; ancre ${best.ord}ᵉ en ${best.f.start_year}, cadence ${Math.round(cad)} ans`,
    });
    posesOrdinal++;
    if (x.f.subject_id) poser(x.f.subject_id, an, an + cad, 'moyenne', 'ordinal-interpole', null);
  }
}

// ── 3. propagation dans le graphe, par vagues ────────────────────────────
const PROPAGATIONS = [
  { rel: 'succede-a', sens: 'out', conf: 'haute', calc: (p) => ({ d: (p.fin != null ? p.fin : p.debut + REGNE), f: (p.fin != null ? p.fin : p.debut + REGNE) + REGNE }), quoi: 'succède à' },
  { rel: 'succede-a', sens: 'in', conf: 'haute', calc: (p) => ({ d: p.debut - REGNE, f: p.debut }), quoi: 'prédécesseur de' },
  { rel: 'conjoint-de', sens: 'both', conf: 'moyenne', calc: (p) => ({ d: p.debut, f: p.fin }), quoi: 'conjoint de' },
  { rel: 'fratrie-de', sens: 'both', conf: 'moyenne', calc: (p) => ({ d: p.debut, f: p.fin }), quoi: 'frère/sœur de' },
  { rel: 'parent-de', sens: 'out', conf: 'moyenne', calc: (p) => ({ d: p.debut + GENERATION, f: (p.fin != null ? p.fin : p.debut) + GENERATION }), quoi: 'enfant de' },
  { rel: 'parent-de', sens: 'in', conf: 'moyenne', calc: (p) => ({ d: p.debut - GENERATION, f: (p.fin != null ? p.fin : p.debut) - GENERATION }), quoi: 'parent de' },
  { rel: 'descend-de', sens: 'out', conf: 'basse', calc: (p) => ({ d: p.debut + GENERATION * 2, f: null }), quoi: 'descend de' },
  { rel: 'fonde', sens: 'out', conf: 'moyenne', calc: (p) => ({ d: p.debut, f: p.fin }), quoi: 'fondateur de' },
  { rel: 'gouverne', sens: 'out', conf: 'basse', calc: (p) => ({ d: p.debut, f: p.fin }), quoi: 'gouverne' },
  { rel: 'capitale-de', sens: 'both', conf: 'basse', calc: (p) => ({ d: p.debut, f: p.fin }), quoi: 'capitale de' },
  { rel: 'apparait-dans', sens: 'out', conf: 'basse', calc: (p) => ({ d: p.debut, f: p.fin }), quoi: 'apparaît dans' },
  { rel: 'membre-de', sens: 'out', conf: 'basse', calc: (p) => ({ d: p.debut, f: p.fin }), quoi: 'membre de' },
];

let vagues = 0, posesPropag = 0;
for (let v = 0; v < 6; v++) {
  let bouge = 0;
  for (const pr of PROPAGATIONS) {
    const sens = pr.sens === 'both' ? ['out', 'in'] : [pr.sens];
    for (const r of doc.relations) {
      if (r.rel_type !== pr.rel) continue;
      for (const s of sens) {
        const [de, vers] = s === 'out' ? [r.to_id, r.from_id] : [r.from_id, r.to_id];
        const p = periode[de];
        if (!p) continue;
        // on ne propage qu'à partir d'une source au moins aussi sûre
        if (RANG[p.confiance] < RANG[pr.conf]) continue;
        const { d, f } = pr.calc(p);
        const nom = byId[de] ? byId[de].name : de;
        if (poser(vers, d, f, pr.conf, 'relation:' + pr.rel, `${pr.quoi} ${nom} (${p.debut})`)) { bouge++; posesPropag++; }
      }
    }
  }
  vagues++;
  if (!bouge) break;
}

// ── 4. les faits encore vides héritent de la période de leur sujet ───────
const DEBUT = new Set(['naissance', 'fondation', 'couronnement']);
const FIN = new Set(['mort', 'chute']);
// Durée plausible d'un fait, quand sa fin est héritée d'une période : un règne
// ne dépasse pas une vie, une bataille est ponctuelle. Sans cette borne, un
// fait rattaché à une nation millénaire s'étirait sur toute la frise.
const DUREE_MAX = { regne: 80, evenement: 120, autre: 120, traite: 0, bataille: 0, frontiere: 200 };
let posesFaits = 0;
for (const f of doc.facts) {
  if (f.start_year != null) continue;
  const p = periode[f.subject_id];
  if (!p) continue;
  const an = DEBUT.has(f.fact_type) ? p.debut
    : FIN.has(f.fact_type) ? (p.fin != null ? p.fin : p.debut)
      : p.debut;
  if (an == null) continue;
  posesFaits++;
  if (ESSAI) continue;
  f.start_year = Math.round(an);
  const max = DUREE_MAX[f.fact_type];
  if (!DEBUT.has(f.fact_type) && !FIN.has(f.fact_type) && p.fin != null && p.fin > an
      && max && p.fin - an <= max) f.end_year = Math.round(p.fin);
  f.start_circa = 1;
  f.start_precision = 'estimation';
  f.data = Object.assign({}, f.data, {
    source_date: 'inference', methode: p.methode, confiance: p.confiance,
    indice_date: p.indice || `période du sujet (${p.debut}${p.fin != null ? '→' + p.fin : ''})`,
  });
}

// ── 4 bis. mise en ordre : un enfant ne naît pas avant son parent, un roi
// ne règne pas avant celui à qui il succède. Quand l'ordre est violé, on
// déplace la date la MOINS assurée ; si les deux sont attestées, on ne touche
// à rien et on le signale — c'est alors une contradiction du lore, pas du
// moteur.
// Les périodes sont des FLORUITS (activité attestée), pas des naissances :
// un père et son fils sont souvent actifs en même temps. On ne déclenche donc
// que sur une violation franche — l'enfant actif AVANT son parent — et on
// répare en rétablissant un écart de génération.
const contradictions = new Set();
let remis = 0;
function remettreEnOrde(avantId, apresId, ecart, quoi) {
  const a = periode[avantId], b = periode[apresId];
  if (!a || !b || b.debut >= a.debut) return;
  const atteste = (p) => p.methode === 'fait-date' || p.methode === 'corpus:corpus-explicite';
  const nom = (id) => (byId[id] ? byId[id].name : id);
  if (atteste(a) && atteste(b)) {
    contradictions.add(`${quoi} : ${nom(apresId)} (${b.debut}) avant ${nom(avantId)} (${a.debut}) — les deux dates sont attestées`);
    return;
  }
  if (atteste(a) || RANG[a.confiance] > RANG[b.confiance]) {
    b.debut = a.debut + ecart;
    if (b.fin != null && b.fin < b.debut) b.fin = b.debut + ecart;
    b.methode = 'mise-en-ordre'; b.confiance = 'basse';
    b.indice = `${quoi} : replacé après ${nom(avantId)} (${a.debut})`;
  } else {
    a.debut = b.debut - ecart;
    if (a.fin != null && a.fin < a.debut) a.fin = a.debut + ecart;
    a.methode = 'mise-en-ordre'; a.confiance = 'basse';
    a.indice = `${quoi} : replacé avant ${nom(apresId)} (${b.debut})`;
  }
  remis++;
}
for (let v = 0; v < 3; v++) {
  for (const r of doc.relations) {
    const de = byId[r.from_id], vers = byId[r.to_id];
    if (!de || !vers) continue;
    if (r.rel_type === 'parent-de' && de.type === 'personne' && vers.type === 'personne') {
      remettreEnOrde(r.from_id, r.to_id, GENERATION, 'filiation');
    }
    // la succession n'ordonne que des PERSONNES : deux polités qui se
    // succèdent sur un territoire ont des existences qui se chevauchent.
    if (r.rel_type === 'succede-a' && de.type === 'personne' && vers.type === 'personne') {
      remettreEnOrde(r.to_id, r.from_id, 1, 'succession');
    }
  }
}

// ── 5. inscrire la période sur les entités (floruit affichable) ──────────
let posesEntites = 0;
if (!ESSAI) {
  for (const [id, p] of Object.entries(periode)) {
    const e = byId[id];
    if (!e) continue;
    e.data = Object.assign({}, e.data, {
      periode: { debut: p.debut, fin: p.fin, confiance: p.confiance, methode: p.methode, indice: p.indice || undefined },
    });
    posesEntites++;
  }
}

// ── contrôles de cohérence ───────────────────────────────────────────────
const alertes = [];
const parSujet = {};
for (const f of doc.facts) {
  if (f.start_year == null || !f.subject_id) continue;
  (parSujet[f.subject_id] = parSujet[f.subject_id] || []).push(f);
}
for (const [sid, liste] of Object.entries(parSujet)) {
  const n = liste.find((f) => f.fact_type === 'naissance'), m = liste.find((f) => f.fact_type === 'mort');
  if (n && m && m.start_year < n.start_year) alertes.push(`${byId[sid] ? byId[sid].name : sid} : mort ${m.start_year} < naissance ${n.start_year}`);
  // Une vie très longue n'est une anomalie que si le lore ne l'assume pas :
  // Hybélior compte des longévités voulues (Verithan, ~600 ans).
  if (n && m && m.start_year - n.start_year > 200) {
    const e = byId[sid];
    const assume = e && /longévité|immortel|ne vieilli|siècles de vie|âge impossible|ne meurt pas/i
      .test((e.summary || '') + ' ' + (e.body || '').slice(0, 4000));
    if (!assume) alertes.push(`${e ? e.name : sid} : ${m.start_year - n.start_year} ans de vie`);
  }
}
for (const r of doc.relations) {
  if (r.rel_type !== 'parent-de') continue;
  const a = periode[r.from_id], b = periode[r.to_id];
  if (a && b && a.confiance === 'haute' && b.confiance === 'haute' && b.debut < a.debut - 5) {
    alertes.push(`${byId[r.from_id] ? byId[r.from_id].name : r.from_id} (${a.debut}) parent de ${byId[r.to_id] ? byId[r.to_id].name : r.to_id} (${b.debut}) — l'enfant précède le parent`);
  }
}

// ── rapport ──────────────────────────────────────────────────────────────
const datesFin = doc.facts.filter((f) => f.start_year != null).length;
console.log(`ancres de départ         : ${ancresInitiales} entités datées par des faits`);
if (FICHIER_LECTURE) console.log(`lecture du corpus        : ${posesLecture} datations reprises des agents`);
console.log(`interpolation d'ordinaux : ${posesOrdinal} règnes situés dans leur liste`);
console.log(`propagation relationnelle: ${posesPropag} périodes posées en ${vagues} vagues`);
console.log(`faits datés par héritage : ${posesFaits}`);
console.log(`entités avec une période : ${Object.keys(periode).length} / ${doc.entities.length}`);
const parConf = {};
for (const p of Object.values(periode)) parConf[p.confiance] = (parConf[p.confiance] || 0) + 1;
console.log(`  confiance :`, Object.entries(parConf).map(([k, v]) => `${k} ${v}`).join(' · '));
const P = doc.entities.filter((e) => e.type === 'personne');
console.log(`personnes situées        : ${P.filter((e) => periode[e.id]).length} / ${P.length}`);
console.log(`faits datés              : ${datesFin} / ${doc.facts.length} (${(100 * datesFin / doc.facts.length).toFixed(0)} %)`);
console.log(`mises en ordre           : ${remis} (filiations et successions replacées)`);
console.log(`alertes de cohérence     : ${alertes.length}`);
alertes.slice(0, 12).forEach((a) => console.log('  ⚠ ' + a));
if (contradictions.size) {
  console.log(`\ncontradictions du LORE (dates attestées des deux côtés) : ${contradictions.size}`);
  [...contradictions].slice(0, 15).forEach((c) => console.log('  ⚑ ' + c));
}

if (ESSAI) { console.log('\n(essai — rien n\'a été écrit)'); process.exit(0); }
fs.writeFileSync(BASE, JSON.stringify(doc, null, 1) + '\n');
console.log(`\n✔ data/kg-base.json — ${posesEntites} périodes inscrites sur les entités`);
