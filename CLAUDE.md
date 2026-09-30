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

## Calage de la carte — CLOS (2026-09-10) · Surfaces de pays — NON VALIDÉES

Les **côtes** de `data/monde-contours.json` (refaites depuis le tracé de
l'auteur) sont validées : indirectement (631/633 villes cohérentes,
Velmaris à 1,2 unité de la côte) ET visuellement par l'auteur sur le vrai
fond (la carte s'affiche correctement dans son navigateur, contours
alignés).

**Eau dans `monde-contours.json` (2026-10-01).** La mer intérieure d'Ilthara et
20 lacs sont des masses de `niveau: 'eau'` (`type` mer-interieure|lac, `dans`
= continent hôte), jamais des terres : le tracé est rempli en evenodd, ses
sous-chemins imbriqués sont des trous. Ces anneaux, et Cestra, la terre du
sud-ouest et l'îlot (−418 ; −214) de Galenor, étaient restés dans le repère du
tracé brut : recalés de (+5,2 ; +5,0) u par `scripts/corriger-anneaux-contours.js`
(rejouable). Garde-fou : `node scripts/verifier-contours.js`. Les routes
`data.parcours[].route` de l'Atrium ont été tracées avant : relancer
`tracer-routes.js` puis `verifier-trajets.js --ecrire` dès que le graphe est libre.

⚠ **Les surfaces de PAYS ne le sont pas** — l'auteur l'a confirmé le
2026-09-22 (« les polygones ne sont pas encore bons »). Mesure du jour :
sur 30 surfaces, 2 seulement ne contiennent aucun lieu d'une autre nation,
et 224 lieux positionnés ne tombent dans aucun pays. Conséquences :
- **Ne JAMAIS dériver un rattachement (`situe-dans`, `capitale-de`) d'un
  point-dans-polygone.** C'est ce qui avait rangé 160 lieux sous la
  mauvaise bannière. Rattachement = fiches, toujours.
- **`scripts/extract-pays.js` tire ses graines de l'Atrium** (capitale via
  `capitale-de`, sinon villes via `situe-dans`). Des liens faux y
  produisent des surfaces fausses : c'est ce qui faisait avaler la moitié
  de Celethor par Ryldor (15 295 u² → 2 451 après correction des liens,
  testé en bac à sable). Mais 22 des 30 pays ressortent identiques : leurs
  erreurs viennent des aplats de « Hybelior Pays.png », pas des graines.
- **Arbitrage Haldria/Warenthor maintenu (tranché le 2026-09-22, délégation
  de l'auteur) et désormais ÉCRIT dans l'Atrium** au lieu de dépendre d'un
  marqueur vide : Haldria porte `data.carte.sans_territoire` (d'Endora selon
  sa fiche, ses lieux restent posés en Ilthara sur la carte) ; Warenthor
  porte `data.carte.surface_figee` (le lobe lui a été réattribué à la main,
  aucune extraction ne le refait). `extract-pays.js` respecte les deux.
- **Procédure de ré-extraction** — ne JAMAIS enchaîner extract + snap seuls,
  ils écrasent tout et font régresser Astravia/Elarian :
  `cp data/monde-contours.json /tmp/pays-en-place.json` →
  `node scripts/extract-pays.js && node scripts/snap-pays-cotes.js` →
  `node scripts/assembler-pays.js /tmp/pays-en-place.json` (ne garde une
  surface neuve que si elle est meilleure sur tous les plans) →
  `node scripts/generer-cartes-eres.js`. Mesure : `node scripts/diagnostic-pays.js`.
- **État au 2026-09-22** : 5 surfaces remplacées (Ryldor, Ackerna, Sylthara,
  Pyrtara, No Man's Land Celethor) — justes 200 → 207, intrus 58 → 45.
  Les 22 autres pays sont inchangés : leurs erreurs sont dans les aplats de
  « Hybelior Pays.png », à reprendre par l'auteur.
Le détail pays par pays est au registre des incohérences, §7 ter. Le 403 sur `hybelior-tiles.nicolas-vollard.workers.dev` ne
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
Baelor-Prime via la côte de son île — 30 pays au total). Restent non extractibles de « Hybelior Pays.png » : Caeloria (territoire blanc ;
théocratie d'Azoria, « le Royaume des Cieux Gelés », pol-0022 — les îles
célestes sont celles d'Astravia, pas de Caeloria), les No Man's Land (Warenthor a reçu le 2026-09-14 la lobe
sud-ouest d'Ilthara, extraite depuis l'ancien marqueur « Haldria ») ;
l'île de Baelor n'est qu'un blob de 33 unités² dans continents-trace.svg
(Thyldris tombe en mer) — à compléter dans le tracé si l'île doit
grandir.
