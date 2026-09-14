'use strict';
/*
 * lib/semantique.js — Recherche sémantique par embeddings LOCAUX.
 *
 * L'espace sémantique est appris sur le corpus d'Hybélior lui-même par
 * `scripts/gen-embeddings.js` (tf-idf mots×documents puis SVD tronquée
 * randomisée — JS pur, zéro dépendance, zéro appel réseau) : un modèle
 * générique ignorerait les Tisses ou l'Arrachement ; l'espace corpus, non.
 *
 * `data/embeddings.json` (committé, régénéré par `npm run kg:embed`) porte
 * le vocabulaire, l'idf, les vecteurs de mots et un vecteur par entité
 * (composition idf-pondérée de nom/alias/résumé/corps/faits), tous
 * unitaires puis quantifiés int8 avec une échelle par vecteur.
 *
 * Requête → somme idf-pondérée des vecteurs de ses mots, normalisée ;
 * classement des entités au cosinus. `prochesDe(id)` : voisins d'une
 * entité dans le même espace. Tout est en lecture seule et paresseux —
 * si le fichier manque, `chercher`/`prochesDe` rendent simplement [].
 */

const fs = require('fs');
const path = require('path');

const FICHIER = path.join(__dirname, '..', 'data', 'embeddings.json');

/* ── Normalisation partagée (générateur + requêtes) ─────────────────── */
// Mots-outils du français (et petits numéraux) — hors espace sémantique.
const STOP = new Set((
  'au aux avec ce ces cet cette dans de des du elle elles en et eux il ils je tu la le les leur leurs lui ma mais me mes moi mon ne nos notre nous on ou par pas pour que qui sa se ses son sur ta te tes toi ton un une vos votre vous y ' +
  'est sont etait etaient ete etre fut furent sera seront serait seraient soit soient suis es etes sommes avoir ai as avons avez ont avait avaient eut aura auront aurait auraient ait ' +
  'plus moins tres peu trop tout tous toute toutes autre autres meme memes aussi ainsi alors comme si oui non sans sous entre vers chez depuis pendant avant apres encore deja jamais toujours souvent parfois puis donc or ni car cela ceci celui celle ceux celles dont quand quel quelle quels quelles ou la ' +
  'fait faits faire fais dit dire disait deux trois quatre cinq six sept huit neuf dix cent mille premier premiere seconde second peut etre y a il n s t l d j c m qu jusqu lorsqu puisqu quoiqu quelqu aujourd hui'
).split(/\s+/));

function normaliser(texte) {
  return String(texte)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’‘']/g, "'")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 2 && !STOP.has(t) && !/^\d+$/.test(t));
}

/* ── Chargement paresseux du modèle ─────────────────────────────────── */
let _modele = null; // false = absent (déjà tenté), objet = chargé
function b64f32(s) { const b = Buffer.from(s, 'base64'); return new Float32Array(b.buffer, b.byteOffset, b.byteLength / 4); }
function b64i8(s) { const b = Buffer.from(s, 'base64'); return new Int8Array(b.buffer, b.byteOffset, b.byteLength); }

function modele() {
  if (_modele === null) {
    try {
      const brut = JSON.parse(fs.readFileSync(FICHIER, 'utf8'));
      _modele = {
        dims: brut.dims,
        indexMot: new Map(brut.mots.map((m, i) => [m, i])),
        idf: b64f32(brut.idf),
        vecMots: b64i8(brut.vecMots),
        echMots: b64f32(brut.echMots),
        entites: brut.entites,
        indexEntite: new Map(brut.entites.map((id, i) => [id, i])),
        vecEntites: b64i8(brut.vecEntites),
        echEntites: b64f32(brut.echEntites),
      };
    } catch { _modele = false; }
  }
  return _modele;
}

function disponible() { return !!modele(); }

/* ── Vecteur d'une requête : somme idf-pondérée de ses mots ─────────── */
function vecteurRequete(q) {
  const M = modele();
  if (!M) return null;
  const v = new Float64Array(M.dims);
  let connus = 0;
  for (const t of normaliser(q)) {
    const i = M.indexMot.get(t);
    if (i == null) continue;
    connus++;
    const poids = M.idf[i];
    const ech = M.echMots[i];
    const base = i * M.dims;
    for (let d = 0; d < M.dims; d++) v[d] += poids * ech * M.vecMots[base + d];
  }
  if (!connus) return null;
  let n = 0;
  for (let d = 0; d < M.dims; d++) n += v[d] * v[d];
  n = Math.sqrt(n) || 1;
  for (let d = 0; d < M.dims; d++) v[d] /= n;
  return v;
}

/* ── Classement des entités au cosinus contre un vecteur unitaire ───── */
function classer(v, limit, exclure) {
  const M = modele();
  const scores = [];
  for (let i = 0; i < M.entites.length; i++) {
    if (M.entites[i] === exclure) continue;
    const ech = M.echEntites[i];
    if (!ech) continue; // entité sans texte connu du vocabulaire
    const base = i * M.dims;
    let dot = 0;
    for (let d = 0; d < M.dims; d++) dot += v[d] * M.vecEntites[base + d];
    scores.push({ id: M.entites[i], sim: dot * ech });
  }
  scores.sort((a, b) => b.sim - a.sim);
  return scores.slice(0, Math.max(1, limit | 0 || 10));
}

// Recherche par le sens d'un texte libre → [{ id, sim }] (sim ∈ [−1..1]).
function chercher(q, limit) {
  const v = vecteurRequete(q);
  return v ? classer(v, limit) : [];
}

// Voisins sémantiques d'une entité → [{ id, sim }], elle-même exclue.
function prochesDe(id, limit) {
  const M = modele();
  if (!M) return [];
  const i = M.indexEntite.get(id);
  if (i == null) return [];
  const ech = M.echEntites[i];
  if (!ech) return [];
  const v = new Float64Array(M.dims);
  const base = i * M.dims;
  for (let d = 0; d < M.dims; d++) v[d] = ech * M.vecEntites[base + d];
  return classer(v, limit, id);
}

module.exports = { STOP, normaliser, disponible, chercher, prochesDe, FICHIER };
