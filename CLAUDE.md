# Hybélior — guide de session

Projet de worldbuilding dark-fantasy de Nicolas (français). Le site EST la
source de vérité (les Docs/ sont voués à disparaître). Lecture libre, mot de
passe uniquement pour l'édition.

## Le nom du savoir : **l'Atrium**

Le savoir du site porte un nom, et c'est par ce nom qu'on s'y réfère :
**l'Atrium**. Comme la salle centrale de la maison antique : la lumière y
tombe, tout ce qui vient du dehors y est recueilli, et toutes les pièces y
ouvrent. Trois règles, qui valent partout dans ce dépôt :

1. **L'Atrium sait tout et montre tout.** Aucune restriction, aucun
   mystère caché. Le champ `disclosure` ne gouverne QUE ce qu'un narrateur de
   roman a le droit d'énoncer — jamais ce que le site affiche.
2. **L'Atrium tranche.** Quand un chapitre, une fiche ou une bible le
   contredit, c'est lui qui a raison. Si c'est lui qui a tort, on le corrige
   **là** — dans `data/kg-base.json` — et le reste suit.
3. **Les livres gardent leurs mystères ; l'Atrium, lui, sait.** Les 33
   entités de type `question`, dont treize portent `data.protege`, ne sont
   jamais résolues **dans les livres** : aucun narrateur n'énonce la réponse.
   Mais l'Atrium connaît la vérité d'auteur — `data.verite` des treize : ce
   qui s'est réellement passé, jamais simple (ses couches, ce que chaque
   lecture voit juste et où elle se trompe, les indices plantés, la
   `ligne_rouge` des narrateurs). Décision de l'auteur, 2026-09-28 : « il faut
   qu'on sache nous, dans l'Atrium, la réalité, qui n'est jamais simple. »
   Une vérité `statut: proposée` attend sa validation par l'auteur.

Le mot n'existe nulle part dans la fiction d'Hybélior, et c'est voulu :
l'Atrium est **hors monde**. Aucun personnage n'y entre, aucune fiche ne le
mentionne — c'est la salle depuis laquelle on regarde le monde, pas une salle
du monde.

## Architecture (l'essentiel)

- **L'Atrium** (graphe de connaissances) : `data/kg-base.json` (3128
  entités, 1473 faits, 3960 liens ; committé, source de vérité) ⊕ overlay
  Turso (éditions post-hoc).
  Moteur : `lib/kg-core.js`. Base SQLite locale `data/hybelior.db` (gitignorée,
  reconstruite par `npm run kg:db`), recherche FTS5 `lib/kg-store-sqlite.js`.
- **Le Monde** (`monde.html` + `js/monde.js`) : portail d'exploration —
  portes, fiches, carte vivante, Visions croisées (graphes de force en
  constellations nommées), Fresque du temps. Vanilla JS, canvas.
- **Carte vivante** : fond = tuiles DZI `https://hybelior-tiles.nicolas-vollard.workers.dev/HybeliorMap.dzi`,
  repère monde→image : `px = (monde + [527.5, 535]) / 1047 · largeur_image`.
  Contours des côtes et pays : `data/monde-contours.json`, produit par le
  pipeline `scripts/extract-trace-contours.js` (côtes depuis
  `continents-trace.svg`, le tracé de l'auteur, cadrage « Hybelior Pays.png »,
  calage RANSAC px₂₆₅₃ = 2.64937·monde + (1347.6, 1342.4)) →
  `scripts/extract-pays.js` → `scripts/snap-pays-cotes.js`.
  ⚠ `canon-stitched.jpg` est MAL CADRÉE vs les vraies tuiles — ne jamais
  s'en servir comme référence de calage. `Atlas-Lore.svg` idem (déprécié).

## Conventions de travail

- Répondre et committer en français. Pousser sur `main` (fast-forward
  vérifié) ET sur la branche de travail désignée.
- Boucle de vérification : `npx eslint js/monde.js`, serveur local
  `PORT=30xx node server.js`, captures Playwright
  (executablePath `/opt/pw-browsers/chromium-*/chrome-linux/chrome`,
  `NODE_PATH=<repo>/node_modules`), envoyer les captures à l'utilisateur.
- Jamais de reseed du graphe sans `KG_RESEED=1` (destructif).
- **Raccord livres ↔ Atrium** : après toute retouche d'un livre,
  `node scripts/verifier-raccord.js --detail`. Au 2026-09-28 : 1 820 citations
  ancrées, 1 809 exactes, 11 légitimes (intitulés d'arbitrage, lore hors livres) ;
  0 renvoi cassé. Une citation qui tombe désigne la fiche à reprendre. Les
  contradictions entre chapitres et l'ancien lore (registre §12, §13) ont été
  tranchés le 2026-09-28 (registre, I).
- **Trajets des personnages** : `data.parcours` des fiches (calque « trajets » de
  la Carte vivante, `kget({action:'parcours'})`). Chaque étape reçoit une ROUTE
  par `node scripts/tracer-routes.js` (la mer en longeant les côtes, une escale
  par journée de navire — port connu, mouillage ou large —, la terre en évitant
  l'eau, les bras de mer comptés à part ; `data.parcours[i].route`), puis est jugée
  par `node scripts/verifier-trajets.js --ecrire` (toujours dans cet ordre, puis
  `npm run kg:db`) à l'échelle de l'auteur (1 000 km
  de bord à bord, 1 u ≈ 0,955 km, 1 lieue ≈ 4,19 u, `lie-1059`). Au 2026-09-28 :
  183 tronçons le long des routes, 0 impossible, 0 lent, 13 serrés. Après toute retouche d'une durée dans un
  livre, recaler l'étape et relancer. Une lenteur que le texte explique porte
  `lenteur_dite` ; les positions inventées vont dans
  `data.carte.position_estimee`, jamais dans `coord_x/y`.
- Écriture des livres : charger le skill **`reecriture-livres`**, qui porte
  toute la manière (`SKILL.md`, `POETIQUE.md`, `VOIX.md`). Les cinq bibles ont
  été retirées du dépôt le 2026-09-22 : leur poétique est dans le skill, leurs
  faits dans l'Atrium, et le reste était des plans réalisés, des numérotations
  mortes et des canons que le texte avait démentis.
- **La quatrième de couverture publique ne révèle JAMAIS que Sorin ment.**
  Les `_resume.md`, le site et tout texte de présentation vendent l'aventure
  au premier degré — l'exilé, la traque, les érudits qui meurent sans
  assassin, le monde qui bascule ; au plus une phrase ambiguë qui se relira
  après coup. Un lecteur qui sait d'avance perd deux des trois paliers.
  (Consigne d'auteur, héritée de la bible des Chroniques §1.1.)
- **Sous-agents (outil Agent et workflows) : Sonnet 5.5 en effort moyen dès que
  possible** — consigne de l'auteur, à effet immédiat (2026-10-01 : « utiliser pour
  les agents dès que possible Sonnet 5.5 en effort moyen pour les tâches compatibles
  et qui ne nécessitent pas Opus »). Type d'agent **`hybelior-sonnet`**
  (`.claude/agents/hybelior-sonnet.md` : `model: sonnet`, `effort: medium`), ou
  `model: "sonnet"`. **Opus** (type `hybelior`, `model: opus`, `effort: medium`)
  seulement quand la tâche l'exige : écriture ou réécriture de prose des livres,
  arbitrages de lore délicats, conception d'ensemble, diagnostics techniques
  difficiles, travail long et autonome dans Unreal. Tout le reste (relevés,
  recherches, contrôles, scripts, exports, captures, retouches mécaniques) part
  en Sonnet. La session principale reste en effort moyen. Lots de 5 agents au
  plus en parallèle.
- Le registre des incohérences du lore :
  `Docs/Lore/Incohérences et chantiers — à résoudre.md`.

## Carte, contours, pays et données de prod — règles à ne jamais enfreindre

Historique, état pays par pays, procédures complètes : `scripts/CARTE_ET_DONNEES.md` (à lire avant tout
travail sur la carte, les contours, les pays, les cartes par ère, l'overlay Turso ou la carte de l'accueil).

- **Côtes** de `data/monde-contours.json` : validées par l'auteur. **Surfaces de pays : NON validées** —
  ne JAMAIS dériver un rattachement (`situe-dans`, `capitale-de`) d'un point-dans-polygone ; rattachement = fiches.
- **Ré-extraction des pays** : jamais `extract-pays.js` + `snap-pays-cotes.js` seuls (ils écrasent tout) ;
  suivre la procédure du document (sauvegarde, `assembler-pays.js`, `generer-cartes-eres.js`).
- **Eau** : mer intérieure et lacs sont des masses `niveau: 'eau'` ; garde-fou `node scripts/verifier-contours.js` ;
  après retouche des contours, `tracer-routes.js` puis `verifier-trajets.js --ecrire`, puis `npm run kg:db`.
- Haldria est au sud-ouest d'Ilthara (D47, D50 du 2026-10-12) : surface figée (`data.carte.surface_figee`), tracée par
  `scripts/surface-haldria-d50.js` après `assembler-pays.js` ; Warenthor est sur son île de la mer intérieure (registre, II §20).
- **Overlay Turso de prod : vide**, la base committée fait foi ; accès par « Identifiants API ». La carte de
  l'accueil lit encore `coordinate_overrides` (`scripts/sync-overrides-arbitrages.js`) ; les ~80 écarts de 5-7 u
  sont un artefact connu, ne pas « corriger ».
- Le 403 sur les tuiles venait de la politique réseau de l'environnement, jamais du site : ne plus retenter le curl.
