# Carte vivante, contours, pays et données de prod — historique et procédures

Déplacé de `CLAUDE.md` le 11 octobre 2026 (texte inchangé) pour alléger ce que chaque session charge. 
À lire avant tout travail sur la carte, les contours, les surfaces de pays, les cartes par ère, l'overlay Turso
ou la carte de l'accueil. Les règles à ne jamais enfreindre restent résumées dans `CLAUDE.md`.

### Calage de la carte — CLOS (2026-09-10) · Surfaces de pays — NON VALIDÉES

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
- **Haldria au sud-ouest d'Ilthara (D47, décision de l'auteur du 2026-10-12)**,
  qui renverse l'arbitrage Haldria/Warenthor des 14 et 22 septembre : Haldria
  n'a plus `data.carte.sans_territoire`, son marqueur d'origine est rendu, ses
  lieux étaient déjà posés là. Warenthor porte encore `data.carte.surface_figee`
  sur le lobe sud-ouest, qui est l'ancien aplat « Haldria » : tant que l'auteur
  n'a pas tranché le partage (proposition A au registre, II §20 : Haldria prend
  l'aplat et la presqu'île de Ravantis, Warenthor son île de la mer intérieure
  où sont tous ses lieux), une ré-extraction ne donne aucune surface à Haldria
  (`assembler-pays.js` refuse le chevauchement). Pour appliquer la décision :
  retirer `surface_figee` de Warenthor dans l'Atrium, puis la procédure
  ci-dessous. `extract-pays.js` respecte toujours les deux drapeaux.
- **Outillage** : `extract-pays.js` et `generer-cartes-eres.js` lancent
  Chromium par `playwright-core` (chemin `/opt/pw-browsers`) ; sur le poste
  Windows ni l'un ni l'autre n'est installé (constat du 2026-10-12).
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
d'Ilthara est celle de Warenthor, Haldria (Endora) reste sans marqueur
[renversé le 2026-10-12, D47 : Haldria est au sud-ouest d'Ilthara ; sa
généalogie passe par le Protectorat d'Haldros ← Drahk'Nor, plus par Endara] ;
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
