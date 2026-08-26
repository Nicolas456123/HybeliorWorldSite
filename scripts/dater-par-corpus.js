#!/usr/bin/env node
'use strict';
/*
 * scripts/dater-par-corpus.js — Situe dans le temps ce que le graphe seul ne
 * peut pas situer, en allant voir OÙ le corpus en parle.
 *
 * Restent 350 personnes sans la moindre date. 205 d'entre elles n'ont aucune
 * relation : le moteur de propagation n'avait rien pour les accrocher, et les
 * lots de lecture ne les avaient même pas envoyées aux agents. Pourtant le
 * corpus les nomme — et le FICHIER qui les nomme dit déjà beaucoup :
 *
 *   - « Chronologie/Era 6 - L'Ère des Nations.md »  → l'ère VI ;
 *   - « Chroniques/ » et « Romans/ »                → le présent narratif,
 *     que ces textes datent eux-mêmes en an 248-252 du Sillage (~10 200 ap.A) ;
 *   - partout ailleurs, la date écrite dans le paragraphe où le nom apparaît.
 *
 * Ordre de préférence, du plus sûr au plus lâche :
 *   1. une date dans la PHRASE qui nomme la personne     (moyenne)
 *   2. une date dans le PARAGRAPHE qui la nomme          (moyenne)
 *   3. l'époque du fichier qui la nomme                  (basse)
 *
 * Chaque date posée dit d'où elle vient (fichier + citation), donc reste
 * vérifiable et révisable.
 *
 * Usage :
 *   node scripts/dater-par-corpus.js --essai
 *   node scripts/dater-par-corpus.js
 */

const fs = require('fs');
const path = require('path');
const { lireDates, PRESENT } = require('../lib/calendrier');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const DOCS = path.join(ROOT, 'Docs');
const ESSAI = process.argv.includes('--essai');
const iT = process.argv.indexOf('--types');
// Les divinités, les termes et les concepts ne se datent pas : ce sont des
// notions, pas des événements. On ne les force donc pas dans le temps.
const TYPES = (iT >= 0 ? process.argv[iT + 1] : 'personne,lieu,entite-politique,lignee,objet,oeuvre,evenement').split(',');

const doc = JSON.parse(fs.readFileSync(BASE, 'utf8'));

// ── époques rattachées aux fichiers ───────────────────────────────────────
const ERES = {
  0: [-999999, -45000], 1: [-999999, -45000], 2: [-45000, -20000],
  3: [-20000, 0], 4: [0, 0], 5: [0, 3000], 6: [3000, 9500], 7: [9500, PRESENT],
};
// Le présent narratif : les Chroniques et les Romans se datent eux-mêmes en
// an 248-252 du Sillage, soit 10 197-10 201 ap.A.
const RECIT = [PRESENT - 3, PRESENT + 1];

function epoqueDuFichier(rel) {
  const m = rel.match(/Chronologie[/\\]Era\s+(\d)/i);
  if (m && ERES[+m[1]]) return { bornes: ERES[+m[1]], quoi: `ère ${m[1]}` };
  if (/[/\\](Chroniques|Romans)[/\\]/.test(rel)) return { bornes: RECIT, quoi: 'récit (an 251 du Sillage)' };
  return null;
}

// ── lecture du corpus ─────────────────────────────────────────────────────
function fichiers(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) fichiers(p, acc);
    else if (f.endsWith('.md')) acc.push(p);
  }
  return acc;
}
const corpus = fichiers(DOCS).map((p) => ({
  rel: path.relative(ROOT, p),
  texte: fs.readFileSync(p, 'utf8'),
  epoque: epoqueDuFichier(path.relative(ROOT, p)),
}));
// Époque DOMINANTE d'un fichier : la médiane des années qu'il cite. Beaucoup
// de fiches (Histoires/, Pays/, Religions/) n'annoncent aucune ère dans leur
// chemin, mais leur contenu se tient dans une tranche de temps ; une personne
// qu'elles nomment sans la dater y appartient probablement.
function epoqueDominante(texte) {
  const ans = [];
  for (const ligne of texte.split('\n')) {
    if (/^\s*\|/.test(ligne)) continue;
    const d = lireDates(ligne.replace(/\bch(?:ap(?:itre)?)?\.?\s*\d+/gi, ' '));
    if (d) ans.push(d.debut);
  }
  if (ans.length < 3) return null;
  ans.sort((a, b) => a - b);
  const med = ans[Math.floor(ans.length / 2)];
  const q1 = ans[Math.floor(ans.length / 4)], q3 = ans[Math.floor(3 * ans.length / 4)];
  // Un fichier dont les dates s'étalent sur des millénaires n'a pas d'époque :
  // le dire reviendrait à ne rien dire. Mieux vaut laisser la case vide.
  if (q3 - q1 > 2000) return null;
  return { median: med, bornes: [q1, q3], n: ans.length };
}
for (const f of corpus) f.dominante = epoqueDominante(f.texte);
console.log(`corpus : ${corpus.length} fichiers (${corpus.filter((f) => f.dominante).length} avec une époque lisible)`);

// ── cibles ────────────────────────────────────────────────────────────────
// Un continent n'a pas d'époque : il dure. Le dater reviendrait à lui coller
// la date de la première ligne qui le nomme — et l'on a vu que ces lignes-là
// sont souvent des renvois de sommaire.
const HORS_TEMPS = new Set(['continent']);
const sansDate = doc.entities.filter((e) => TYPES.includes(e.type)
  && !(e.data && e.data.periode)
  && !(e.data && HORS_TEMPS.has(e.data.echelle)));
console.log(`entités sans date (${TYPES.join(', ')}) : ${sansDate.length}`);

// Un nom trop court ou qui est aussi un mot courant produirait des trouvailles
// au hasard : « Keth » ou « Vela » se rencontrent dans n'importe quelle page.
const MOT_COURANT = /^(le|la|les|des|une|nord|sud|est|ouest|mont|val|port|haute?|vieux|grand|petit|noir|blanc|rouge|pierre|source|fille|frère|soeur|sœur|mère|père|roi|reine|dame|maitre|maître)$/i;
const cherchable = (nom) => nom.length >= 4 && !MOT_COURANT.test(nom);

// Chercher sur le premier mot d'un nom n'a de sens que pour une PERSONNE, et
// seulement si ce prénom ne désigne qu'elle : « Fondation de Seraphia » et
// « Fondation du Conseil » partagent leur premier mot, et se feraient dater
// par la même ligne.
const freqPremierMot = {};
for (const e of doc.entities) {
  const t = e.name.split(/[\s'’-]/)[0];
  if (t.length >= 4) freqPremierMot[t] = (freqPremierMot[t] || 0) + 1;
}

// Un tableau markdown n'est pas de la prose : « | **Orren** | Ch. 4 | » se lit
// « an 4 », et « Ilthara→Cendara 12 j » (douze jours de route) « an 12 ». On
// écarte donc les lignes de tableau, les renvois de chapitre et les durées
// avant toute lecture de date — la même leçon que pour les corps de fiches.
const nettoyer = (t) => t
  .split('\n')
  .filter((l) => !/^\s*\|/.test(l) && (l.match(/\|/g) || []).length < 2)   // tableaux
  .filter((l) => !/^\s*>/.test(l))           // citations et notes d'édition
  .filter((l) => !/\bGDD\b|\bversion\s|\bcanon-check\b/i.test(l))
  // lignes d'appareil : renvois, sommaires, listes de liens. Elles portent des
  // chiffres (numéros de tome, comptes de lieux) qu'aucune date ne justifie.
  .filter((l) => !/\[\[|\]\(|`Lore\/|voir\s+\[|^\s*\*(?:Récit|Source|Liens|Note)/i.test(l))
  .filter((l) => !/\bretenus?\b|\bsommaire\b|\btome\s*\d/i.test(l))
  .join('\n')
  .replace(/\bch(?:ap(?:itre)?)?\.?\s*\d+/gi, ' ')
  .replace(/\bjours?\s*\d+(?:\s*[-–]\s*\d+)?/gi, ' ')   // « jours 140-300 » : un itinéraire
  .replace(/\bp{1,2}\.?\s*\d+(?:\s*[-–]\s*\d+)?/gi, ' ') // « p. 7-13 » : une pagination
  .replace(/\b\d+\s*(?:j|jours?|h|min|km|kg|m|%)\b/gi, ' ');

const phraseDe = (texte, i) => {
  const d = Math.max(0, texte.lastIndexOf('.', i), texte.lastIndexOf('\n', i));
  let f = texte.indexOf('.', i); if (f < 0) f = texte.length;
  return texte.slice(d, Math.min(f + 1, d + 500));
};
// Ligne entière portant le nom. Dans une énumération (« - **Aldric le
// Bâtisseur** — fondateur, an 0-30 »), chaque puce porte SA date : lire le
// paragraphe entier collerait la date d'un voisin au personnage cherché.
const ligneDe = (texte, i) => {
  const d = texte.lastIndexOf('\n', i) + 1;
  const f = texte.indexOf('\n', i);
  return texte.slice(d, f < 0 ? texte.length : f);
};
const estPuce = (l) => /^\s*[-*+]\s|^\s*\d+[.)]\s/.test(l);

const paragrapheDe = (texte, i) => {
  const d = texte.lastIndexOf('\n\n', i);
  const f = texte.indexOf('\n\n', i);
  return texte.slice(d < 0 ? 0 : d, f < 0 ? Math.min(texte.length, i + 900) : f);
};

// ── le texte de l'entité elle-même ────────────────────────────────────────
// Depuis le dégroupage des fiches, un lieu porte SA section (« Fondée autour
// de la première veine de stellarite… »). C'est la meilleure source qui soit :
// elle parle de lui et de personne d'autre.
const VERBE_DATANT = /fond|institu|créé|creé|bâti|bati|élev|eleve|établi|etabli|naît|nait|apparaît|apparait|érig|erig|premi[eè]r/i;
function depuisSonTexte(e) {
  const t = ((e.summary || '') + '\n' + (e.body || '')).slice(0, 30000);
  if (!t.trim()) return null;
  for (const ligne of nettoyer(t).split(/(?<=[.!?])\s+|\n/)) {
    if (ligne.length < 12 || !VERBE_DATANT.test(ligne)) continue;
    const d = lireDates(ligne);
    if (d) return { debut: d.debut, fin: d.fin, conf: 'moyenne', ou: 'sa fiche',
      fichier: null, indice: ligne.trim().replace(/\s+/g, ' ').slice(0, 150) };
  }
  return null;
}

// ── recherche ─────────────────────────────────────────────────────────────
const RANG = { moyenne: 2, basse: 1 };
const trouves = [];
let nPhrase = 0, nParagraphe = 0, nFichier = 0, nRien = 0, nSienne = 0;

for (const e of sansDate) {
  const sienne = depuisSonTexte(e);
  if (sienne) { nSienne++; trouves.push({ e, ...sienne }); continue; }
  const formes = [e.name];
  const prenom = e.name.split(/[\s'’-]/)[0];
  if (e.type === 'personne' && prenom !== e.name && cherchable(prenom) && freqPremierMot[prenom] === 1) {
    formes.push(prenom);
  }
  const utiles = formes.filter(cherchable);
  if (!utiles.length) { nRien++; continue; }

  let best = null;
  for (const f of corpus) {
    for (const forme of utiles) {
      if (!f.texte.includes(forme)) continue;
      const rx = new RegExp('\\b' + forme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
      let m;
      while ((m = rx.exec(f.texte)) !== null) {
        const brute = ligneDe(f.texte, m.index);
        const ph = nettoyer(phraseDe(f.texte, m.index));
        // dans une liste, on s'en tient à la puce ; sinon le paragraphe
        const large = nettoyer(estPuce(brute) ? brute : paragrapheDe(f.texte, m.index));
        let d = lireDates(ph); let ou = 'phrase'; let source = ph;
        if (!d) { d = lireDates(large); ou = estPuce(brute) ? 'phrase' : 'paragraphe'; source = large; }
        if (d) {
          const cand = { debut: d.debut, fin: d.fin, conf: 'moyenne', ou, fichier: f.rel, indice: source.trim().replace(/\s+/g, ' ').slice(0, 150) };
          if (!best || RANG[cand.conf] > RANG[best.conf] || (best.ou === 'paragraphe' && ou === 'phrase')) best = cand;
        } else if (!best && f.epoque) {
          best = { debut: f.epoque.bornes[0], fin: f.epoque.bornes[1], conf: 'basse', ou: 'fichier',
            fichier: f.rel, indice: `nommé dans « ${path.basename(f.rel)} » — ${f.epoque.quoi}` };
        } else if (!best && f.dominante) {
          best = { debut: f.dominante.bornes[0], fin: f.dominante.bornes[1], conf: 'basse', ou: 'fichier',
            fichier: f.rel, indice: `nommé dans « ${path.basename(f.rel)} », dont les dates se tiennent autour de ${f.dominante.median}` };
        }
        if (best && best.ou === 'phrase') break;
      }
      if (best && best.ou === 'phrase') break;
    }
    if (best && best.ou === 'phrase') break;
  }

  if (!best) { nRien++; continue; }
  if (best.ou === 'phrase') nPhrase++; else if (best.ou === 'paragraphe') nParagraphe++; else nFichier++;
  trouves.push({ e, ...best });
}

console.log(`\nsituées : ${trouves.length} / ${sansDate.length}`);
console.log(`  par le texte de la fiche même    : ${nSienne}`);
console.log(`  par une date dans la phrase      : ${nPhrase}`);
console.log(`  par une date dans le paragraphe  : ${nParagraphe}`);
console.log(`  par l'époque du fichier          : ${nFichier}`);
console.log(`  introuvables dans le corpus      : ${nRien}`);
for (const quoi of ['sa fiche', 'phrase', 'paragraphe', 'fichier']) {
  const ech = trouves.filter((t) => t.ou === quoi).slice(0, 6);
  if (!ech.length) continue;
  console.log(`\n--- par ${quoi} ---`);
  for (const t of ech) {
    console.log(`  ${String(t.debut).padStart(7)}${t.fin != null && t.fin !== t.debut ? '→' + t.fin : ''}  ${t.e.name.slice(0, 20).padEnd(22)} ${JSON.stringify(t.indice).slice(0, 88)}`);
  }
}

if (ESSAI) { console.log('\n(essai — rien n\'a été écrit)'); process.exit(0); }
for (const t of trouves) {
  t.e.data = Object.assign({}, t.e.data, {
    periode: { debut: t.debut, fin: t.fin != null ? t.fin : null, confiance: t.conf,
      methode: 'corpus:' + t.ou, indice: t.indice, fiche: t.fichier },
  });
}
fs.writeFileSync(BASE, JSON.stringify(doc, null, 1) + '\n');
for (const t of TYPES) {
  const S = doc.entities.filter((x) => x.type === t);
  if (!S.length) continue;
  console.log(`  ${t.padEnd(18)} ${String(S.filter((x) => x.data && x.data.periode).length).padStart(4)} / ${String(S.length).padStart(4)}`);
}
console.log('✔ data/kg-base.json');
