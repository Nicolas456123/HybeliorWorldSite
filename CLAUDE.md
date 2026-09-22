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
3. **Les livres, eux, gardent leurs mystères.** Les 34 entités de type
   `question`, dont treize portent `data.protege`, ne sont jamais résolues :
   l'Atrium enregistre **que** la question se pose, ses lectures concurrentes
   et qui les porte — jamais la réponse.

Le mot n'existe nulle part dans la fiction d'Hybélior, et c'est voulu :
l'Atrium est **hors monde**. Aucun personnage n'y entre, aucune fiche ne le
mentionne — c'est la salle depuis laquelle on regarde le monde, pas une salle
du monde.

## Architecture (l'essentiel)

- **L'Atrium** (graphe de connaissances) : `data/kg-base.json` (2953
  entités, 1473 faits, 3670 liens ; committé, source de vérité) ⊕ overlay
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
- Sous-agents (outil Agent) : **toujours le modèle Opus 5** (`model: "opus"`),
  consigne de l'auteur ; lots de 5 agents au plus en parallèle.
- Le registre des incohérences du lore :
  `Docs/Lore/Incohérences et chantiers — à résoudre.md`.

## Calage de la carte — CLOS (2026-09-10)

Les côtes/pays de `data/monde-contours.json` (refaits depuis le tracé de
l'auteur) sont validés : indirectement (631/633 villes cohérentes,
Velmaris à 1,2 unité de la côte) ET visuellement par l'auteur sur le vrai
fond (la carte s'affiche correctement dans son navigateur, contours
alignés). Le 403 sur `hybelior-tiles.nicolas-vollard.workers.dev` ne
concernait que la politique réseau de l'environnement Claude Code, jamais
le site — **ne plus retenter le curl à chaque session**. Si une
vérification au pixel devient un jour utile : ouvrir le domaine dans la
politique réseau, ou demander à l'auteur une capture de la carte zoomée
(côte de Solmaris / Velmaris).

Chantiers suivants (rappel) : embeddings locaux pour la recherche
sémantique. (Marqueurs NML : réglé 2026-09-10, 0 conflit géo.)

**Cartes historiques par ère — FAIT (2026-09-11).**
`scripts/generer-cartes-eres.js` génère trois jeux dans monde-contours :
`era3_lien_empires` (réf −6 000 : 6 empires du Lien),
`era5_grande_nuit` (réf 2 000 : Tharnok, Galenthis, Drahk'Nor, Forgon),
`era6_nations` (réf 9 000 : 21 états — protectorats/ligues de la veille +
nations déjà nées). Territoires = union raster des pays héritiers
(succede-a + faits-précurseurs cités ; états sans fondation datés par la
chute de leur prédécesseur, sinon fenêtre de veille 1 000 ans avant leurs
successeurs — JAMAIS par data.periode, dérivée). Le curseur temporel de
la carte les affiche sans modification de code (surfacesPourEre).
Limites : Union des Flammes et Azor-Kerev sans territoire (leurs
héritiers Arkhen/Pyrevane/Azoral/Kethvar/Caeloria n'ont pas de surface
extraite). Haldria : tranché le 2026-09-14 (registre §10) — la surface
d'Ilthara est celle de Warenthor, Haldria (Endora) reste sans marqueur ;
les autres écarts carte/fiches (Iskara, Thalmaris, Skaldoria, Myrtam)
sont assumés : position = carte de l'auteur, rattachement = fiches.

**Bake overlay→base — CLOS (2026-09-10).** L'overlay kg de prod
(`kg_overlay`/`kg_deletes`) est **vide** : aucune édition post-hoc, la
base committée fait foi seule. `scripts/bake-overlay.js` reste prêt pour
l'avenir (`--dry-run` d'abord ; purge séparée `--purge`). **Accès Turso
depuis l'environnement : par « Identifiants API »** (hôte
`hybelior-map-nicolas456123.aws-eu-west-1.turso.io`, en-tête
Authorization Bearer) — c'est ce mécanisme qui ouvre l'hôte, PAS le champ
variables ; `TURSO_URL`/`TURSO_AUTH_TOKEN` restent en variables pour les
scripts. ⚠ `turso-adapter` : les entiers Hrana passent en chaîne
(corrigé). Découvert au passage : **la carte de l'accueil (`index.html` →
`js/map.js`) lit encore `coordinate_overrides`** — table synchronisée sur
les arbitrages par `scripts/sync-overrides-arbitrages.js` (NML échangés,
Folgrad→(393,91) ; et en sens inverse Mordock corrigé dans le graphe :
village de Mosrack, le mauvais homonyme avait été restauré ; NML Celethor
a reçu son marqueur (−57.3,−369.2)). Restent ~80 écarts uniformes de
5-7 unités (artefact d'import de mai, sans enjeu) — ne pas « corriger ».
Faits les 2026-09-10 : affichage `data.fourchette` et capitales
anciennes ; surfaces manquantes (Iskara, Ackerna, Valoria + Seraphia,
Baelor-Prime via la côte de son île — 30 pays au total). Restent non extractibles de « Hybelior Pays.png » : Caeloria (territoire blanc,
îles célestes), les No Man's Land (Warenthor a reçu le 2026-09-14 la lobe
sud-ouest d'Ilthara, extraite depuis l'ancien marqueur « Haldria ») ;
l'île de Baelor n'est qu'un blob de 33 unités² dans continents-trace.svg
(Thyldris tombe en mer) — à compléter dans le tracé si l'île doit
grandir.
