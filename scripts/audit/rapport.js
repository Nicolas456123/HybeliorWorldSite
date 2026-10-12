'use strict';
// Écrit Docs/Lore/audit_1012.md à partir de audit_cas.json (lecture seule des données ; seul le rapport est écrit).
const fs = require('fs'), path = require('path');
const j = require('./audit_cas.json');
const cas = j.cas;
const OUT = path.join(__dirname, '..', '..', 'Docs', 'Lore', 'audit_1012.md');
const esc = (s) => String(s == null ? '' : s).replace(/\|/g, '/').replace(/\n/g, ' ');
const L = [];
const w = (s = '') => L.push(s);
const compte = {};
for (const x of cas) { const k = x.ctrl; compte[k] = compte[k] || { 1: 0, 2: 0, 3: 0, t: 0 }; compte[k][x.gravite]++; compte[k].t++; }
w('# Audit de cohérence carte / Atrium / jeu / livres — 12 octobre 2026');
w();
w('Demande Studio d97b48be3 (volet donnees-atrium-jeu). Lecture seule : aucune donnée modifiée. Scripts rejouables : `HybeliorWorldSite/scripts/audit/` (`node scripts/audit/run.js`, `node scripts/audit/rapport.js`, `python scripts/audit/cartes.py <dossier>`). Données complètes : `scripts/audit/audit_cas.json`.');
w();
w('## Règle de lecture (consigne de l\'auteur)');
w();
w('La position affichée par la carte du site fait foi. Le site (`monde.html`, `js/monde.js`) place chaque lieu sur `data.coord_x/coord_y` de `kg-base.json` (overlay Turso vide) ; `position_estimee` n\'est utilisée que par le calque des trajets, pas par les marqueurs. L\'accueil (`js/map.js`) lit `coordinate_overrides` (écarts de 5-7 u connus, ignorés). Quand un continent, un `situe-dans` ou un texte contredit la position, ce sont le rattachement et le texte qui sont à corriger : les propositions vont toutes dans ce sens. Le point dans un polygone ne sert qu\'à détecter ; les surfaces de pays (non validées) ne servent à rien ici, sauf une indication citée.');
w();
w('## Comptes par contrôle et par gravité');
w();
w('| Contrôle | Gravité 1 | Gravité 2 | Gravité 3 | Total |');
w('|---|---|---|---|---|');
const NOMS = { A1: 'A1 lieu sur un autre continent que sa fiche', A2: 'A2 lieu en mer hors port/île', A3: 'A3 lieu dans un lac ou la mer intérieure', A4: 'A4 lieu à plus de 20 km de toute terre', A5: 'A5 lieu sans continent de fiche', B: 'B nation / villes', C1: 'C1 texte : continent cité', C2: 'C2 texte : point cardinal', C3: 'C3 texte : tableau « Continent »', D1: 'D1 lieux absents du gazetteer', D1b: 'D1b gazetteer périmé', D2: 'D2 vides de peuplement', D3: 'D3 réseau de routes 462' };
for (const k of Object.keys(NOMS)) { const c = compte[k] || { 1: 0, 2: 0, 3: 0, t: 0 }; w(`| ${NOMS[k]} | ${c[1]} | ${c[2]} | ${c[3]} | ${c.t} |`); }
w();
w('Le contrôle E (livres) ne compte pas de cas propres : chaque cas de gravité 1 et 2 porte ses ancres et ses chapitres (champ `livres`, listé plus bas).');
w();

// ---- groupes de gravité 1
w('## Les grands groupes (gravité 1)');
w();
const grp = {};
for (const x of cas.filter((c) => c.gravite === 1 && c.ctrl === 'A1')) { const k = `${x.fiche} -> ${x.continent_carte}`; (grp[k] = grp[k] || []).push(x); }
w('| Groupe (fiche -> carte) | Lieux | Nations concernées | Preuves |');
w('|---|---|---|---|');
const natOf = (id) => (j.nations || []).filter((n) => n.repartition && 0);
for (const [k, g] of Object.entries(grp).sort((a, b) => b[1].length - a[1].length)) w(`| ${k} | ${g.length} | ${esc(g.slice(0, 4).map((x) => x.nom).join(', '))}${g.length > 4 ? '…' : ''} | voir A1 |`);
w();
w('Nations dont la masse majoritaire de villes diffère de leur continent de fiche (B) :');
w();
w('| Nation | Fiche | Villes posées par masse | Surface de pays (indicatif, non validée) | Proposition |');
w('|---|---|---|---|---|');
for (const x of cas.filter((c) => c.ctrl === 'B' && c.cat.startsWith('masse') && c.gravite <= 2)) {
  const pc = j.pays_centre[x.nom];
  w(`| ${x.nom} (${x.id}) | ${x.fiche} | ${esc(JSON.stringify(x.repartition))} | ${pc ? pc.aire + ' u², centre sur ' + pc.masse : '-'} | ${esc(x.proposition || x.detail)} |`);
}
w();
w('Constat structurant : sur la carte, le nord d\'Endora est occupé par Iskara (fiche Alkaran) et Thalmaris (fiche Evertia) ; les villes propres d\'Endora sont au sud. Les intitulés de chapitre des Chroniques disent « Alkaran — Iskara, de Glintar aux mines de Myrilith » (C/8) et « Endora — Perivalis, Crestalis, Hekorinth » (C/13) : les livres suivent les fiches, pas la carte. Même schéma que Haldria (D47). Corriger dans le sens de la carte touche donc des chapitres de livre (voir E).');
w();

// ---- sections par contrôle
const sect = (titre, filtre, cols, fmt, max3 = 9999) => {
  w(`## ${titre}`);
  w();
  const rows = cas.filter(filtre).sort((a, b) => a.gravite - b.gravite || String(a.continent_carte).localeCompare(String(b.continent_carte)) || String(a.id).localeCompare(String(b.id)));
  w(cols[0]); w(cols[1]);
  let n3 = 0;
  for (const x of rows) { if (x.gravite === 3 && ++n3 > max3) continue; w(fmt(x)); }
  if (n3 > max3) w(`| … | | | | ${n3 - max3} cas de gravité 3 supplémentaires dans audit_cas.json |`);
  w();
};
sect('A. Lieu et terre', (x) => x.ctrl.startsWith('A'),
  ['| Gr | Ctrl | Continent (carte) | Id | Nom | Échelle | Position | Détail |', '|---|---|---|---|---|---|---|---|'],
  (x) => `| ${x.gravite} | ${x.ctrl} | ${esc(x.continent_carte)} | ${x.id} | ${esc(x.nom)} | ${x.echelle} | ${x.x}, ${x.y} (${x.src}) | ${esc(x.detail)}${x.proposition ? ' — **Proposition** : ' + esc(x.proposition) : ''} |`);
sect('B. Nation et villes', (x) => x.ctrl === 'B' && x.gravite <= 2,
  ['| Gr | Id | Nom | Fiche | Répartition des villes | Catégorie | Détail |', '|---|---|---|---|---|---|---|'],
  (x) => `| ${x.gravite} | ${x.id} | ${esc(x.nom)} | ${x.fiche} | ${esc(JSON.stringify(x.repartition))} | ${x.cat} | ${esc(x.detail)} |`);
w('Organisations et conseils sans lieu rattaché (gravité 3) : ' + cas.filter((x) => x.ctrl === 'B' && x.gravite === 3).map((x) => x.nom).join(' ; ') + '.');
w();
sect('C. Textes contre coordonnées', (x) => x.ctrl.startsWith('C'),
  ['| Gr | Ctrl | Id | Nom | Carte | Fiche | Texte dit | Extrait |', '|---|---|---|---|---|---|---|---|'],
  (x) => `| ${x.gravite} | ${x.ctrl} | ${x.id} | ${esc(x.nom)} | ${esc(x.phys)} | ${x.fiche} | ${esc(x.mentionne || (x.dit + ' ; carte : ' + x.vrai))} | ${esc(x.extrait)} |`);
sect('D1. Lieux de l\'Atrium absents du gazetteer de jeu', (x) => x.ctrl === 'D1' && x.gravite <= 2,
  ['| Gr | Id | Nom | Échelle | Fiche | Pourquoi |', '|---|---|---|---|---|---|'],
  (x) => `| ${x.gravite} | ${x.id} | ${esc(x.nom)} | ${x.echelle} | ${x.fiche} | ${esc(x.detail)} |`);
const d1_3 = cas.filter((x) => x.ctrl === 'D1' && x.gravite === 3);
w(`Gravité 3 (${d1_3.length}) : lieux-dits, régions, ruines, lieux sans échelle, non positionnés, hors critère « agglomération » : ` + d1_3.map((x) => `${x.nom} (${x.id})`).join(' ; ') + '.');
w();
w('Statistiques D : ```' + JSON.stringify(j.stats_d) + '```');
w();
sect('D1b, D2 et D3. Gazetteer périmé, vides de peuplement, routes 462', (x) => ['D1b', 'D2', 'D3'].includes(x.ctrl),
  ['| Gr | Ctrl | Id | Nom | Détail |', '|---|---|---|---|---|'],
  (x) => `| ${x.gravite} | ${x.ctrl} | ${x.id} | ${esc(x.nom)} | ${esc(x.detail)} |`);

w('## E. Livres : ancres et chapitres touchant les cas de gravité 1 et 2');
w();
w('`node scripts/verifier-raccord.js --detail` : 1 820 citations ancrées, 1 809 exactes, 11 introuvables ; aucune des 11 ne touche un cas de cet audit. Ancres = `data.preuve/source/recit_uid` de la fiche et de ses faits ; chapitres = chapitres des livres qui nomment le lieu (recherche de nom, homonymes possibles).');
w();
w('| Id | Nom | Contrôle | Ancres | Chapitres nommant | Phrase spatiale |');
w('|---|---|---|---|---|---|');
const vus = new Set();
for (const x of cas.filter((c) => c.livres && (c.livres.ancres.length || c.livres.chapitres_nommant.length) && c.gravite <= 2 && c.ctrl !== 'D1')) {
  const k = x.id + x.ctrl; if (vus.has(k)) continue; vus.add(k);
  w(`| ${x.id} | ${esc(x.nom)} | ${x.ctrl} | ${x.livres.ancres.join(', ')} | ${x.livres.chapitres_nommant.slice(0, 12).join(', ')} | ${esc(x.livres.phrases_spatiales[0] || '')} |`);
}
w();
w('## Hypothèse inverse : le nom des masses est-il juste ?');
w();
w('Vérifié le 12 octobre. Les 11 marqueurs de continents (`coord_x/y` des fiches de continents, ceux dont `monde.js` tire les étiquettes de la carte) tombent tous dans la masse de `monde-contours.json` qui porte le même nom (Cendara et Ilthara : marqueur en mer, à quelques unités, repère de nom). Les masses sont donc bien nommées. Les 54 villes d\'Altram, Torkam et Myrtam sont sur la masse Alkaran, celles d\'Avalor sur Endora. Les surfaces de pays extraites de la carte peinte (non validées, simple indice) placent aussi Iskara (x 106 à 204, y -46 à 37) et Thalmaris (x 206 à 322, y -10 à 56) sur la masse Endora : l\'image de l\'auteur les dessine là, ce n\'est pas un artefact du calcul. Deux continents ne partagent pas une masse : Alkaran (11 617 u²) est une masse distincte, au nord, qui contient déjà Altram, Torkam et Myrtam. Conclusion : erreur de rattachement des fiches (ou de leur continent écrit), pas de nommage des masses. Réserve : la taille d\'Alkaran (11 617 u²) est inférieure à la surface peinte d\'Altram seul (21 185 u², unités du pays non comparables à celles des masses) ; seule l\'auteur peut dire si Iskara est « d\'Alkaran » par la culture et « sur Endora » par la géographie.');
w();
w('## Limites de la méthode');
w();
w('- Les côtes sont validées, les surfaces de pays non : aucun rattachement n\'en est tiré. Les îles sans nom dans `monde-contours.json` sont rattachées au continent le plus proche (indication).');
w('- Une position `estimee` (non affichée sur la carte) pèse un cran de moins ; les nations sans marqueur sont jugées sur le barycentre de leurs villes posées.');
w('- Le continent « de la fiche » vient de `data.continent` et de la remontée `situe-dans` / `capitale-de` (8 niveaux) ; un rattachement multiple n\'est pas signalé s\'il contient la masse de la carte.');
w('- C est lexical : mentions « d\'<Continent> » après un nom de fonction, mentions de continent dans le résumé, tableau « Continent » du corps, « au nord/sud/est/ouest de <lieu connu> » (écart de plus de 100 degrés). Les corps de fiche ne sont lus que pour les phrases qui nomment l\'entité. Des faux positifs existent (échanges entre continents) ; des contradictions non lexicales échappent.');
w('- Les centres de continents et de nations sont des barycentres, pas des frontières.');
w('- D2 : grille de 4 u, rayon 35 km autour d\'une agglomération positionnée ; D3 ne juge que la masse Ilthara (le réseau 462 ne couvre qu\'elle).');
w('- E : recherche par nom (homonymes, noms courts exclus) ; les citations ancrées ne sont pas comparées une à une aux cas.');
fs.writeFileSync(OUT, L.join('\n') + '\n');
console.log(OUT, L.length);
