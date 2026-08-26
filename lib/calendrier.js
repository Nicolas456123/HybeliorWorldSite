'use strict';
/*
 * lib/calendrier.js — Lire une date dans une phrase d'Hybélior.
 *
 * Le monde compte le temps de trois façons et les fiches ne disent jamais
 * laquelle. Le canon donne l'ancrage : « an 251 du Sillage = ~10 200 ap.A »,
 * soit un décalage de +9 949 ; et les décomptes régionaux partagent cette
 * époque — vérifié sur dix continents, qui situent tous le présent narratif
 * en « l'an 251 ».
 *
 * Deux exceptions valent d'être connues :
 *   - « An 0 » qui désigne l'Arrachement lui-même est l'an 0 ABSOLU, pas le
 *     début d'un décompte local ;
 *   - une mention de calendrier peut être NIÉE (« non exprimé en ap.A ») :
 *     la lire à l'endroit décale la date de 9 949 ans.
 *
 * Utilisé par scripts/dater-faits.js et scripts/dater-par-corpus.js.
 */

const DECALAGE = 9949;          // an X du Sillage / régional  →  X + 9949 ap.A
const PRESENT = 10200;          // an 251 du Sillage

// ── reconnaissance des dates ──────────────────────────────────────────────
// Un nombre n'est une année que s'il est introduit par un marqueur temporel
// et n'est pas suivi d'une unité qui en ferait un âge ou un décompte.
const MARQUEUR = '(?:an|en|vers|dès|depuis|jusqu\'en|à partir de|fin|début|élue?|investie?|couronnée?|née?|morte?|décédée?|\\+)';
// (?!\d) d'abord : sans lui, « depuis 120 ans » se fait lire « 12 » — le moteur
// recule sur un nombre plus court pour contourner le refus des unités.
const PAS_UNITE = '(?!\\d)(?!\\s*(?:ans?\\b|siècles?|générations?|navires?|hommes?|jours?|mois\\b|%|km|m\\b))';
const NB = '(-?\\d{1,2}[  ]?\\d{3}|-?\\d{1,4})';

// « ~an 248-251 », « +172 à +189 », « fin 248 – début 251 »
const rxIntervalle = new RegExp(
  `${MARQUEUR}[^.;]{0,24}?\\+?${NB}\\s*(?:[–—-]|à|jusqu'(?:en|à)|au)\\s*[^\\d.;]{0,12}\\+?${NB}${PAS_UNITE}`, 'i');
// fin de règne énoncée à part : « élue en 132, morte en charge en 156 »
const rxFin = new RegExp(
  `(?:mort[e]?|décès|décédée?|jusqu'en|abdique|déposée?|renversée?|fin de (?:règne|charge))[^.;]{0,28}?` +
  `(?:en|l'an|vers|\\+)\\s*~?${NB}${PAS_UNITE}`, 'i');
const rxSimple = new RegExp(`${MARQUEUR}\\s+(?:l'an\\s+|l'année\\s+|an\\s+|\\+)?~?${NB}${PAS_UNITE}`, 'i');
// « ~4 siècles avant le présent », « 7 000 à 8 000 ans avant le présent »
const rxRelatif = /~?\s*(\d{1,2}[  ]?\d{3}|\d{1,4})\s*(?:(?:à|-|–)\s*(\d{1,2}[  ]?\d{3}|\d{1,4})\s*)?(siècles?|ans?|générations?|millénaires?)\s*(avant|après)\s+le\s+présent/i;
const rxSillage = /du\s+Sillage/i;
const rxApA = /\bap\.?\s?A\b/i;
const rxAvA = /\bav\.?\s?A\b/i;
const rxCirca = /~|vers|environ|circa|\bc\./i;

const nb = (s) => parseInt(String(s).replace(/[  ]/g, ''), 10);

// L'Arrachement EST l'An 0 absolu : une date qui s'y réfère explicitement
// n'est pas un décompte local et ne doit pas être décalée.
const rxArrachement = /Arrachement|Mont\s+Cendra|[Cc]ataclysme\s+cosmique|jour\s+de\s+la\s+[Dd]échirure/;

// Un marqueur de calendrier peut être NIÉ : « Morte en +249 (calendrier local
// d'Alkaran / du Sillage, non exprimé en ap.A) ». Lire « ap.A » sans voir le
// « non » qui le précède décale la date de 9 949 ans. On vérifie donc qu'aucune
// négation ne gouverne la mention.
const NEGATION = /\b(?:non|pas|jamais|ni|hors|≠)\b[^.;]{0,24}$/i;
function mentionne(txt, rx) {
  const m = txt.match(rx);
  if (!m) return false;
  return !NEGATION.test(txt.slice(Math.max(0, m.index - 30), m.index));
}

// Convertit une année lue en année absolue, selon le calendrier détecté.
function versAbsolu(an, txt) {
  if (mentionne(txt, rxAvA)) return { an: -Math.abs(an), cal: 'absolu' };
  if (mentionne(txt, rxApA)) return { an, cal: 'absolu' };
  if (Math.abs(an) <= 30 && rxArrachement.test(txt)) return { an, cal: 'absolu' };
  if (mentionne(txt, rxSillage)) return { an: an + DECALAGE, cal: 'sillage' };
  if (Math.abs(an) > 300) return { an, cal: 'absolu' };      // temps profond
  return { an: an + DECALAGE, cal: 'regional' };             // même époque
}

function lireDates(txt) {
  if (!txt) return null;
  const rel = txt.match(rxRelatif);
  if (rel) {
    const unite = /siècle/i.test(rel[3]) ? 100 : /millénaire/i.test(rel[3]) ? 1000
      : /génération/i.test(rel[3]) ? 25 : 1;
    // fourchette « 7 000 à 8 000 ans » → on retient le milieu
    const a = nb(rel[1]), b = rel[2] ? nb(rel[2]) : null;
    const q = (b == null ? a : (a + b) / 2) * unite;
    const an = Math.round(/avant/i.test(rel[4]) ? PRESENT - q : PRESENT + q);
    return { debut: an, fin: null, cal: 'relatif', circa: 1 };
  }
  const inter = txt.match(rxIntervalle);
  if (inter) {
    const a = versAbsolu(nb(inter[1]), txt), b = versAbsolu(nb(inter[2]), txt);
    if (b.an >= a.an && b.an - a.an < 4000) {
      return { debut: a.an, fin: b.an, cal: a.cal, circa: rxCirca.test(txt) ? 1 : 0 };
    }
  }
  const s = txt.match(rxSimple);
  if (s) {
    const a = versAbsolu(nb(s[1]), txt);
    // une fin peut être énoncée séparément, après le début
    let fin = null;
    const m = txt.match(rxFin);
    if (m) {
      const b = versAbsolu(nb(m[1]), txt);
      if (b.an > a.an && b.an - a.an < 4000) fin = b.an;
    }
    return { debut: a.an, fin, cal: a.cal, circa: rxCirca.test(txt) ? 1 : 0 };
  }
  return null;
}


module.exports = { DECALAGE, PRESENT, lireDates, versAbsolu, mentionne, rxSillage, rxApA, rxAvA };
