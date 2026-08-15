#!/usr/bin/env node
'use strict';
/*
 * scripts/degrouper-fiches.js — Rend leur taille aux fiches de pays et de
 * continents en rendant à chaque lieu ce qui lui appartient.
 *
 * Le problème. Les corps de fiches sont la concaténation brute de plusieurs
 * documents du corpus : l'aperçu du continent, la fiche du pays, le recueil
 * d'histoires… Evertia fait 94 000 caractères, soit 45 écrans, et décrit ses
 * seize villes DEUX fois — une notice et une histoire — alors que chacune de
 * ces villes a déjà sa propre fiche, vide.
 *
 * Ce que fait le script :
 *   1. découpe chaque corps en sections (titres markdown, avec leur sous-arbre) ;
 *   2. déplace vers la fiche du lieu concerné toute section qui porte son nom,
 *      à condition que ce lieu soit bien SITUÉ dans le pays traité (sans quoi
 *      un homonyme récupérerait le texte d'un autre) ;
 *   3. met de côté les passages marqués « interne, ne pas afficher » dans
 *      `data.note_interne` — rien n'est perdu, mais rien d'interne ne s'affiche ;
 *   4. supprime les sections rigoureusement identiques répétées d'un document
 *      à l'autre, et les titres devenus vides.
 *
 * Usage :
 *   node scripts/degrouper-fiches.js --essai   # revue à blanc
 *   node scripts/degrouper-fiches.js           # applique
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const ESSAI = process.argv.includes('--essai');

const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const byId = {}; for (const e of doc.entities) byId[e.id] = e;

// ── noms : comparaison insensible aux accents, à la casse et aux ornements ──
const clef = (s) => String(s || '')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[«»"'’★☆]/g, '')
  .replace(/\s*[—–-]\s.*$/, '')          // « Caëspia — Capitale » → « Caëspia »
  .replace(/\s*\([^)]*\)\s*$/, '')       // « Pyracine (présence…) » → « Pyracine »
  .replace(/[^a-z0-9\s]/gi, ' ')
  .replace(/\s+/g, ' ').trim().toLowerCase();

const LIEUX = doc.entities.filter((e) => ['lieu', 'entite-politique'].includes(e.type));
const parNom = {};
for (const e of LIEUX) (parNom[clef(e.name)] = parNom[clef(e.name)] || []).push(e);

// ── contenance : ce qui est situé dans X (transitivement) ─────────────────
const dedans = {};
for (const r of doc.relations) {
  if (!['situe-dans', 'capitale-de'].includes(r.rel_type)) continue;
  (dedans[r.to_id] = dedans[r.to_id] || new Set()).add(r.from_id);
}
function contenu(id, prof = 3) {
  const vus = new Set();
  const file = [[id, 0]];
  while (file.length) {
    const [x, p] = file.shift();
    for (const y of dedans[x] || []) {
      if (vus.has(y)) continue;
      vus.add(y);
      if (p + 1 < prof) file.push([y, p + 1]);
    }
  }
  return vus;
}

// ── découpage d'un corps en sections ──────────────────────────────────────
function parser(corps) {
  const lignes = corps.split('\n');
  const noeuds = [];
  lignes.forEach((l, i) => {
    const m = l.match(/^(#{1,6})\s+(.*)$/);
    if (m) noeuds.push({ niveau: m[1].length, titre: m[2].trim(), debut: i });
  });
  noeuds.forEach((n, k) => {
    n.fin = lignes.length;
    for (let j = k + 1; j < noeuds.length; j++) {
      if (noeuds[j].niveau <= n.niveau) { n.fin = noeuds[j].debut; break; }
    }
  });
  return { lignes, noeuds };
}

const rxInterne = /ne pas afficher|note d'[ée]criture|\(interne\b|usage interne|hors[- ]fiction/i;
const normaliser = (t) => t.replace(/\s+/g, ' ').trim();
// « de Evertia » → « d'Evertia »
const de = (nom) => (/^[aeiouyâàäéèêëîïôöûüh]/i.test(nom) ? "d'" : 'de ') + nom;

// Sur la fiche du lieu, répéter son nom en titre n'apprend rien : on ne garde
// que ce que le titre disait EN PLUS (« Capitale ★ », « La Chute de la
// Cascade »), qui est précisément ce qui distingue les deux passages venus de
// la notice et du recueil d'histoires.
function titreUtile(titreSection, nomCible) {
  // comparaison sans accents : le corpus écrit « Caespia » là où l'entité
  // s'appelle « Caëspia », et le nom doit tomber quand même
  const sansAcc = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const nu = sansAcc(nomCible).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const plat = sansAcc(titreSection);
  const m = plat.match(new RegExp(nu, 'i'));
  const reste = (m ? titreSection.slice(0, m.index) + titreSection.slice(m.index + m[0].length) : titreSection)
    .replace(/^[\s—–:,-]+|[\s—–:,-]+$/g, '')
    .trim();
  return reste.length > 1 ? reste : null;
}

// ── traitement ────────────────────────────────────────────────────────────
const recus = {};                    // id du lieu → [textes reçus]
const rapport = [];
let nbDeplacees = 0, nbInternes = 0, nbDoublons = 0, nbVides = 0;

for (const e of doc.entities) {
  if (!e.body || e.body.length < 1500) continue;
  const { lignes, noeuds } = parser(e.body);
  const situes = contenu(e.id);
  const aRetirer = [];               // { noeud, motif, cible }

  for (const n of noeuds) {
    if (n.niveau < 2) continue;                       // on ne bouge pas un document entier
    if (aRetirer.some((r) => n.debut >= r.noeud.debut && n.fin <= r.noeud.fin)) continue;  // déjà dans un retrait

    const texte = lignes.slice(n.debut, n.fin).join('\n');
    if (rxInterne.test(n.titre) || rxInterne.test(texte.slice(0, 400))) {
      aRetirer.push({ noeud: n, motif: 'interne' });
      continue;
    }
    const cands = parNom[clef(n.titre)] || [];
    const cible = cands.find((c) => c.id !== e.id && situes.has(c.id))
      || (cands.length === 1 && cands[0].id !== e.id && cands[0].type === 'lieu' ? cands[0] : null);
    if (cible && texte.trim().length > 120) {
      aRetirer.push({ noeud: n, motif: 'ville', cible });
    }
  }

  if (!aRetirer.length) continue;

  // lignes à garder
  const garder = new Array(lignes.length).fill(true);
  for (const r of aRetirer) for (let i = r.noeud.debut; i < r.noeud.fin; i++) garder[i] = false;

  for (const r of aRetirer) {
    const texte = lignes.slice(r.noeud.debut, r.noeud.fin).join('\n').trim();
    if (r.motif === 'interne') {
      e.data = Object.assign({}, e.data, { note_interne: ((e.data && e.data.note_interne) || '') + '\n\n' + texte });
      nbInternes++;
    } else {
      // la section rejoint la fiche du lieu, sans y répéter son nom
      const sousTitre = titreUtile(r.noeud.titre.replace(/^#+\s*/, ''), r.cible.name);
      const corpsSection = lignes.slice(r.noeud.debut + 1, r.noeud.fin).join('\n').trim();
      if (corpsSection.length > 60) {
        // la provenance va EN FIN de section : en tête, elle capterait la
        // lettrine décorative que la fiche pose sur son premier paragraphe
        (recus[r.cible.id] = recus[r.cible.id] || []).push(
          (sousTitre ? `## ${sousTitre}\n\n` : '') +
          `${corpsSection}\n\n*Extrait de la fiche ${de(e.name)}.*`);
        nbDeplacees++;
      }
    }
  }

  let nouveau = lignes.filter((_, i) => garder[i]).join('\n');

  // titres devenus vides (toute leur matière est partie ailleurs)
  for (let passe = 0; passe < 4; passe++) {
    const p = parser(nouveau);
    const vides = p.noeuds.filter((n) => p.lignes.slice(n.debut + 1, n.fin).join('').trim() === '');
    if (!vides.length) break;
    const g = new Array(p.lignes.length).fill(true);
    for (const n of vides) { for (let i = n.debut; i < n.fin; i++) g[i] = false; nbVides++; }
    nouveau = p.lignes.filter((_, i) => g[i]).join('\n');
  }

  // sections rigoureusement identiques répétées d'un document à l'autre
  const p2 = parser(nouveau);
  const vus = new Set(); const g2 = new Array(p2.lignes.length).fill(true);
  for (const n of p2.noeuds) {
    if (n.niveau < 2) continue;
    const t = normaliser(p2.lignes.slice(n.debut, n.fin).join('\n'));
    if (t.length < 250) continue;
    if (vus.has(t)) { for (let i = n.debut; i < n.fin; i++) g2[i] = false; nbDoublons++; } else vus.add(t);
  }
  nouveau = p2.lignes.filter((_, i) => g2[i]).join('\n').replace(/\n{4,}/g, '\n\n\n').trim() + '\n';

  rapport.push({ nom: e.name, avant: e.body.length, apres: nouveau.length,
    villes: aRetirer.filter((r) => r.motif === 'ville').length });
  if (!ESSAI) e.body = nouveau;
}

// ── versement dans les fiches des lieux ───────────────────────────────────
let nbLieuxServis = 0, carsVerses = 0;
for (const [id, morceaux] of Object.entries(recus)) {
  const c = byId[id];
  if (!c) continue;
  const ajout = morceaux.join('\n\n');
  carsVerses += ajout.length;
  nbLieuxServis++;
  if (!ESSAI) c.body = ((c.body || '').trim() + '\n\n' + ajout).trim() + '\n';
}

// ── rapport ──────────────────────────────────────────────────────────────
rapport.sort((a, b) => (b.avant - b.apres) - (a.avant - a.apres));
console.log(`fiches allégées          : ${rapport.length}`);
console.log(`sections déplacées       : ${nbDeplacees} vers ${nbLieuxServis} fiches de lieux (${Math.round(carsVerses / 1000)} k caractères)`);
console.log(`notes internes retirées  : ${nbInternes} (conservées dans data.note_interne)`);
console.log(`doublons supprimés       : ${nbDoublons}`);
console.log(`titres vidés supprimés   : ${nbVides}`);
const av = rapport.reduce((s, r) => s + r.avant, 0), ap = rapport.reduce((s, r) => s + r.apres, 0);
console.log(`volume des fiches allégées : ${Math.round(av / 1000)} k → ${Math.round(ap / 1000)} k caractères (−${Math.round(100 * (av - ap) / av)} %)`);
console.log('');
console.log('--- les plus allégées ---');
for (const r of rapport.slice(0, 15)) {
  console.log(`  ${String(Math.round(r.avant / 1000)).padStart(3)}k → ${String(Math.round(r.apres / 1000)).padStart(3)}k  (${String(r.villes).padStart(2)} lieux servis)  ${r.nom}`);
}

if (ESSAI) { console.log('\n(essai — rien n\'a été écrit)'); process.exit(0); }
fs.writeFileSync(BASE, JSON.stringify(doc, null, 1) + '\n');
const totalCorps = doc.entities.filter((e) => e.body).length;
console.log(`\n✔ data/kg-base.json — ${totalCorps} entités portent un corps`);
