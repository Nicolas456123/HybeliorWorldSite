#!/usr/bin/env node
'use strict';
/*
 * scripts/gen-embeddings.js — Espace sémantique LOCAL du corpus d'Hybélior.
 *
 * Zéro dépendance, zéro réseau : l'espace est appris sur le corpus lui-même
 * (le graphe + toute la prose de Docs/), pas sur un modèle générique qui
 * ignorerait les Tisses, l'Arrachement ou les Capitaineries.
 *
 * Chaîne : documents (une fiche du graphe = un doc ; les .md de Docs/
 * découpés en passages de ~150 mots) → matrice tf-idf mots×documents,
 * colonnes normalisées → SVD tronquée randomisée (itérations de sous-espace
 * + Gram-Schmidt, JS pur) → vecteurs de mots U·Σ^½ (128 dims, unitaires)
 * → vecteur d'entité = somme idf-pondérée des mots de ses champs
 * (nom ×3, alias ×2, résumé ×1,5, corps ×1, libellés de ses faits ×0,75).
 *
 * Sortie : data/embeddings.json (committé) — vocabulaire, idf, vecteurs de
 * mots et d'entités quantifiés int8 (échelle par vecteur). Lecture runtime :
 * lib/semantique.js (recherche « par le sens » et voisins de fiche).
 */

const fs = require('fs');
const path = require('path');
const { normaliser } = require('../lib/semantique.js');

const RACINE = path.join(__dirname, '..');
const SORTIE = path.join(RACINE, 'data', 'embeddings.json');
const DIMS = 128;          // dimensions de l'espace
const SUR = 16;            // sur-échantillonnage de la SVD randomisée
const ITERS = 2;           // itérations de sous-espace (précision du spectre)
const VOCAB_MAX = 20000;   // plafond du vocabulaire
const TF_MIN = 4;          // fréquence totale minimale d'un mot
const DF_MIN = 3;          // ... et présence dans au moins 3 documents
const CIBLE_PASSAGE = 150; // taille (en mots pleins) des passages de Docs/

const t0 = Date.now();
const log = (m) => console.log(((Date.now() - t0) / 1000).toFixed(1).padStart(6) + 's  ' + m);

/* ── 1. Le corpus ───────────────────────────────────────────────────── */
const kgb = JSON.parse(fs.readFileSync(path.join(RACINE, 'data', 'kg-base.json'), 'utf8'));

// Champs pondérés par entité (pour composer son vecteur au §5).
const champsParEntite = new Map(); // id → [{ tokens, poids }]
const aliasParEntite = new Map();
for (const a of kgb.aliases || []) {
  if (!aliasParEntite.has(a.entity_id)) aliasParEntite.set(a.entity_id, []);
  aliasParEntite.get(a.entity_id).push(a.value);
}
const faitsParEntite = new Map(); // sujet → libellés
for (const f of kgb.facts || []) {
  const texte = [f.label, f.detail].filter(Boolean).join(' ');
  if (!texte) continue;
  if (!faitsParEntite.has(f.subject_id)) faitsParEntite.set(f.subject_id, []);
  faitsParEntite.get(f.subject_id).push(texte);
}

const documents = []; // chaque doc : tableau de tokens
for (const e of kgb.entities) {
  const champs = [
    { tokens: normaliser(e.name || ''), poids: 3 },
    { tokens: normaliser((aliasParEntite.get(e.id) || []).join(' ')), poids: 2 },
    { tokens: normaliser(e.summary || ''), poids: 1.5 },
    { tokens: normaliser(e.body || ''), poids: 1 },
    { tokens: normaliser((faitsParEntite.get(e.id) || []).join(' ')), poids: 0.75 },
  ].filter((c) => c.tokens.length);
  champsParEntite.set(e.id, champs);
  const tousTokens = champs.flatMap((c) => c.tokens);
  if (tousTokens.length) documents.push(tousTokens);
}
log(documents.length + ' documents-fiches (graphe)');

// Toute la prose de Docs/ (Lore + GDD), en passages de ~CIBLE_PASSAGE mots.
function* fichiersMd(dossier) {
  for (const nom of fs.readdirSync(dossier)) {
    const p = path.join(dossier, nom);
    const st = fs.statSync(p);
    if (st.isDirectory()) yield* fichiersMd(p);
    else if (nom.endsWith('.md')) yield p;
  }
}
let nbMd = 0;
for (const racine of ['Docs/Lore', 'Docs/GDD']) {
  const abs = path.join(RACINE, racine);
  if (!fs.existsSync(abs)) continue;
  for (const fichier of fichiersMd(abs)) {
    nbMd++;
    const texte = fs.readFileSync(fichier, 'utf8').replace(/^---\n[^]*?\n---\n/, '');
    let passage = [];
    for (const para of texte.split(/\n\s*\n/)) {
      passage.push(...normaliser(para));
      if (passage.length >= CIBLE_PASSAGE) { documents.push(passage); passage = []; }
    }
    if (passage.length >= 20) documents.push(passage);
  }
}
log(documents.length + ' documents au total (' + nbMd + ' fichiers .md découpés en passages)');

/* ── 2. Vocabulaire + idf ───────────────────────────────────────────── */
const tf = new Map(); const df = new Map();
for (const doc of documents) {
  const vus = new Set();
  for (const t of doc) {
    tf.set(t, (tf.get(t) || 0) + 1);
    if (!vus.has(t)) { vus.add(t); df.set(t, (df.get(t) || 0) + 1); }
  }
}
const mots = [...tf.keys()]
  .filter((t) => tf.get(t) >= TF_MIN && df.get(t) >= DF_MIN)
  .sort((a, b) => tf.get(b) - tf.get(a))
  .slice(0, VOCAB_MAX)
  .sort(); // ordre alphabétique stable (diffs git lisibles)
const V = mots.length;
const indexMot = new Map(mots.map((m, i) => [m, i]));
const D = documents.length;
const idf = new Float32Array(V);
for (let i = 0; i < V; i++) idf[i] = Math.log(1 + D / df.get(mots[i]));
log('vocabulaire : ' + V + ' mots (sur ' + tf.size + ' distincts)');

/* ── 3. Matrice tf-idf mots×documents (CSR par mot) ─────────────────── */
// Comptes par document, colonnes L2-normalisées à la volée.
const docsComptes = documents.map((doc) => {
  const c = new Map();
  for (const t of doc) { const i = indexMot.get(t); if (i != null) c.set(i, (c.get(i) || 0) + 1); }
  return c;
});
documents.length = 0; // libère la mémoire du corpus brut

const nnzParMot = new Int32Array(V);
for (const c of docsComptes) for (const i of c.keys()) nnzParMot[i]++;
const ptr = new Int32Array(V + 1);
for (let i = 0; i < V; i++) ptr[i + 1] = ptr[i] + nnzParMot[i];
const NNZ = ptr[V];
const cols = new Int32Array(NNZ);
const vals = new Float32Array(NNZ);
const curseur = Int32Array.from(ptr.subarray(0, V));
for (let j = 0; j < D; j++) {
  const c = docsComptes[j];
  let norme = 0;
  for (const [i, n] of c) { const w = (1 + Math.log(n)) * idf[i]; norme += w * w; }
  norme = Math.sqrt(norme) || 1;
  for (const [i, n] of c) {
    const k = curseur[i]++;
    cols[k] = j;
    vals[k] = ((1 + Math.log(n)) * idf[i]) / norme;
  }
}
log('matrice : ' + V + '×' + D + ', ' + NNZ + ' coefficients');

/* ── 4. SVD tronquée randomisée (itérations de sous-espace) ─────────── */
const R = DIMS + SUR;

// Produits creux : Y(V×R) = A·Ω(D×R) et Z(D×R) = Aᵀ·Q(V×R), rangées à plat.
function aFois(om) {
  const Y = new Float64Array(V * R);
  for (let i = 0; i < V; i++) {
    const fin = ptr[i + 1]; const ligne = i * R;
    for (let k = ptr[i]; k < fin; k++) {
      const v = vals[k]; const base = cols[k] * R;
      for (let c = 0; c < R; c++) Y[ligne + c] += v * om[base + c];
    }
  }
  return Y;
}
function atFois(Q) {
  const Z = new Float64Array(D * R);
  for (let i = 0; i < V; i++) {
    const fin = ptr[i + 1]; const ligne = i * R;
    for (let k = ptr[i]; k < fin; k++) {
      const v = vals[k]; const base = cols[k] * R;
      for (let c = 0; c < R; c++) Z[base + c] += v * Q[ligne + c];
    }
  }
  return Z;
}
// Orthonormalisation en place (Gram-Schmidt modifié, colonnes de M (n×R)).
function orthonormaliser(M, n) {
  for (let c = 0; c < R; c++) {
    for (let p = 0; p < c; p++) {
      let dot = 0;
      for (let r = 0; r < n; r++) dot += M[r * R + c] * M[r * R + p];
      for (let r = 0; r < n; r++) M[r * R + c] -= dot * M[r * R + p];
    }
    let nrm = 0;
    for (let r = 0; r < n; r++) nrm += M[r * R + c] * M[r * R + c];
    nrm = Math.sqrt(nrm) || 1;
    for (let r = 0; r < n; r++) M[r * R + c] /= nrm;
  }
  return M;
}

// Aléa reproductible (mulberry32) → même graine, même espace.
let graine = 0x48796265; // « Hybe »
const alea = () => {
  graine |= 0; graine = (graine + 0x6d2b79f5) | 0;
  let t = Math.imul(graine ^ (graine >>> 15), 1 | graine);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
let om = new Float64Array(D * R);
for (let i = 0; i < om.length; i++) om[i] = alea() * 2 - 1;

let Q = orthonormaliser(aFois(om), V);
for (let it = 0; it < ITERS; it++) {
  const Z = orthonormaliser(atFois(Q), D);
  Q = orthonormaliser(aFois(Z), V);
  log('itération de sous-espace ' + (it + 1) + '/' + ITERS);
}
const T = atFois(Q); // T = Aᵀ·Q (D×R) ; B = QᵀA = Tᵀ

// M = B·Bᵀ = TᵀT (R×R), symétrique → valeurs/vecteurs propres par Jacobi.
const M = new Float64Array(R * R);
for (let j = 0; j < D; j++) {
  const base = j * R;
  for (let a = 0; a < R; a++) {
    const ta = T[base + a];
    if (!ta) continue;
    for (let b = a; b < R; b++) M[a * R + b] += ta * T[base + b];
  }
}
for (let a = 0; a < R; a++) for (let b = 0; b < a; b++) M[a * R + b] = M[b * R + a];

function jacobi(S) {
  const n = R;
  const A2 = Float64Array.from(S);
  const P = new Float64Array(n * n);
  for (let i = 0; i < n; i++) P[i * n + i] = 1;
  for (let balayage = 0; balayage < 60; balayage++) {
    let hors = 0;
    for (let p = 0; p < n - 1; p++) for (let q = p + 1; q < n; q++) hors += A2[p * n + q] * A2[p * n + q];
    if (hors < 1e-18) break;
    for (let p = 0; p < n - 1; p++) for (let q = p + 1; q < n; q++) {
      const apq = A2[p * n + q];
      if (Math.abs(apq) < 1e-15) continue;
      const theta = (A2[q * n + q] - A2[p * n + p]) / (2 * apq);
      const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      const co = 1 / Math.sqrt(t * t + 1); const si = t * co;
      for (let r = 0; r < n; r++) {
        const arp = A2[r * n + p]; const arq = A2[r * n + q];
        A2[r * n + p] = co * arp - si * arq;
        A2[r * n + q] = si * arp + co * arq;
      }
      for (let r = 0; r < n; r++) {
        const apr = A2[p * n + r]; const aqr = A2[q * n + r];
        A2[p * n + r] = co * apr - si * aqr;
        A2[q * n + r] = si * apr + co * aqr;
      }
      for (let r = 0; r < n; r++) {
        const prp = P[r * n + p]; const prq = P[r * n + q];
        P[r * n + p] = co * prp - si * prq;
        P[r * n + q] = si * prp + co * prq;
      }
    }
  }
  const valeurs = []; for (let i = 0; i < n; i++) valeurs.push({ v: A2[i * n + i], i });
  valeurs.sort((a, b) => b.v - a.v);
  return { valeurs, P };
}
const { valeurs, P } = jacobi(M);
log('spectre : σ₁=' + Math.sqrt(Math.max(0, valeurs[0].v)).toFixed(2) +
  ' … σ' + DIMS + '=' + Math.sqrt(Math.max(0, valeurs[DIMS - 1].v)).toFixed(2));

// Vecteurs de mots : W = Q·P·Λ^¼ (≙ U·Σ^½), puis normalisation L2.
const W = new Float64Array(V * DIMS);
for (let d = 0; d < DIMS; d++) {
  const { v, i: colP } = valeurs[d];
  const poids = Math.pow(Math.max(v, 1e-12), 0.25);
  for (let r = 0; r < V; r++) {
    let s = 0;
    for (let c = 0; c < R; c++) s += Q[r * R + c] * P[c * R + colP];
    W[r * DIMS + d] = s * poids;
  }
}
for (let i = 0; i < V; i++) {
  let n = 0;
  for (let d = 0; d < DIMS; d++) { const x = W[i * DIMS + d]; n += x * x; }
  n = Math.sqrt(n) || 1;
  for (let d = 0; d < DIMS; d++) W[i * DIMS + d] /= n;
}
log('vecteurs de mots : ' + V + '×' + DIMS);

/* ── 5. Vecteurs d'entités (somme idf-pondérée des champs) ──────────── */
const entites = kgb.entities.map((e) => e.id);
const E = entites.length;
const VE = new Float64Array(E * DIMS);
for (let k = 0; k < E; k++) {
  const champs = champsParEntite.get(entites[k]) || [];
  for (const { tokens, poids } of champs) {
    for (const t of tokens) {
      const i = indexMot.get(t);
      if (i == null) continue;
      const w = poids * idf[i];
      for (let d = 0; d < DIMS; d++) VE[k * DIMS + d] += w * W[i * DIMS + d];
    }
  }
  let n = 0;
  for (let d = 0; d < DIMS; d++) { const x = VE[k * DIMS + d]; n += x * x; }
  if (n > 0) { n = Math.sqrt(n); for (let d = 0; d < DIMS; d++) VE[k * DIMS + d] /= n; }
}

/* ── 6. Quantification int8 + écriture ──────────────────────────────── */
function quantifier(F, nb) {
  const q = new Int8Array(nb * DIMS);
  const ech = new Float32Array(nb);
  for (let k = 0; k < nb; k++) {
    let max = 0;
    for (let d = 0; d < DIMS; d++) max = Math.max(max, Math.abs(F[k * DIMS + d]));
    if (!max) continue; // échelle 0 = vecteur vide (entité sans texte connu)
    ech[k] = max / 127;
    for (let d = 0; d < DIMS; d++) q[k * DIMS + d] = Math.round(F[k * DIMS + d] / ech[k]);
  }
  return { q, ech };
}
const qm = quantifier(W, V);
const qe = quantifier(VE, E);
const b64 = (ta) => Buffer.from(ta.buffer, ta.byteOffset, ta.byteLength).toString('base64');

fs.writeFileSync(SORTIE, JSON.stringify({
  version: 1,
  genere: new Date().toISOString().slice(0, 10),
  methode: 'tf-idf mots×documents + SVD tronquée randomisée (corpus Hybélior)',
  dims: DIMS,
  mots,
  idf: b64(idf),
  vecMots: b64(qm.q),
  echMots: b64(qm.ech),
  entites,
  vecEntites: b64(qe.q),
  echEntites: b64(qe.ech),
}) + '\n');
const octets = fs.statSync(SORTIE).size;
log('écrit ' + path.relative(RACINE, SORTIE) + ' (' + (octets / 1048576).toFixed(1) + ' Mo) — ' +
  V + ' mots, ' + E + ' entités, ' + DIMS + ' dims');
