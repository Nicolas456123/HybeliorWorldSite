---
tags: [lore, méta, atrium, incohérences, chantiers, à-résoudre]
type: lore
status: living
date: 2026-07-17
last_review: 2026-09-26
needs_review_for: []
---

# Incohérences et chantiers — à résoudre

> [!abstract] À quoi sert cette page
> Elle répond à trois questions, et à trois seulement.
> **I. Ce qui est clos** — le chantier, la décision, l'endroit où elle vit maintenant.
> **II. Ce qui reste ouvert** — la seule partie qui demande encore du travail.
> **III. Ce qui ne sera jamais tranché** — les 33 `question`. Ce ne sont pas des
> incohérences : c'est le sujet des livres.

La source de vérité est **l'Atrium** — `data/kg-base.json`, au 2026-09-23 :
**3 121 entités, 1 473 faits, 3 963 relations, 238 alias, 36 lectures**
(divulgation : 2 962 `public`, 158 `restreint`, 1 `auteur`). Quand un chapitre ou
une fiche le contredit, c'est lui qui a raison ; s'il a tort, on le corrige **là**,
et le reste suit.

**Ce registre ne recopie pas les décisions.** Chaque arbitrage vit dans l'entité
qu'il touche, avec sa provenance — `data.arbitrage`, `data.correction`,
`data.fusion`, `data.origine`, `data.preuve`. Pour savoir pourquoi une chose est
ce qu'elle est, on ouvre sa fiche dans l'Atrium, pas cette page.

Il ne reste, pour le corpus, que **les livres et l'Atrium** : les cinq bibles ont
été retirées le 2026-09-22. Leur poétique est dans le skill
`.claude/skills/reecriture-livres/` (`SKILL.md`, `POETIQUE.md`, `VOIX.md`), leurs
faits dans l'Atrium. **Aucun renvoi à une bible n'a de sens ici.**

---

## I. Ce qui est clos

### Les 36 arbitrages du 2026-09-22

Rendus par délégation de l'auteur (« tranche toutes les interrogations pour que ça
fonctionne »), appliqués au texte par `b90def3` (42 fichiers) et versés dans
l'Atrium par `ea456c2` (214 entités, 117 faits, 71 relations, 29 liens
`a-ne-pas-confondre-avec`). Le détail est dans l'Atrium ; voici les familles.

| Famille | n° | Ce qui a été décidé | Où ça vit |
|---|---|---|---|
| **Chronologie et faits du tome 3** | 1-13 | Ilex chez Renna : **depuis nourrisson, six ans** (*révisé le 2026-09-23* : le « deux ans » lu au ch. 02 était l'absence au registre de la Corvane ; le texte dit partout le lange, le nourrisson, six ans). Renna : **~38 ans**, sans contradiction. Ysolde : **trente-cinq ans** (le canon des Chroniques l'emporte). Wenna **rejoint Sanne**. Sanne et Vaskar : **vingt ans** de métier ; Sanne reçoit le cahier à **vingt ans passés** (*révisé le 2026-09-23* : « trente ans passés » la menait à plus de cinquante ans contre « la quarantaine » des ch. 17 et 39 — un mot changé au ch. 04). Les dépôts passent de **cinq à dix** entre les ch. 36 et 38, le geste écrit. Le répit **se raccourcit**. Vharok meurt **sept ans** plus tôt. Le Fragment #3 est dans l'**avant-dernier** cahier. *Astremer* → **Astravia**, « Aînée de la Franche » → **des Mains Vides**. | Dans le texte du T3 |
| **Noms, homonymes, genres** | 14-19 | **Corvane est un nom de famille courant de Galénor** : six porteurs — cinq dans la trilogie, un dans les Chroniques —, chacun avec son épithète. **Vahel → Solvec**, **Vharel → Dorvel** ; Vhail, Vael, Vharok, Nève restent. **Tovan → Karsel**. **La Consule Selvir**, féminin. **L'Arbre-Mère**, féminine (le lore d'Evertia corrigé, pas le chapitre). Les paires Orsenne, Vael, Forge-Basse, Kessa, Vessine, Corven sont **deux entités chacune**, reliées. | Texte + Atrium (`a-ne-pas-confondre-avec`) |
| **Les deux œuvres** | 20-30 | **Dix-sept cahiers, deux dépôts** (voir ci-dessous). Le colophon est de **252**, la copie de **251**. **Ysolde commence la copie de son chef** ; le Tribunal ordonne la conservation. **Kharazir est une nation**, sa capitale est **Rukhsar**. **Chaque ville de Kharazir a sa Porte d'Azur** ; celle de Rukhsar est la première. **Trois pierres scellées distinctes**. C/38 **précède** T3/46, et la prophétie des murs s'y accomplit. Le **Fragment #3 est planté** dans les Chroniques. Cestra et le Mont Jumeau sont **le même site**. Rukhsar **a des murs**. Le tissu jaune : institution vieille, **usage policier neuf** — aucune édition. | Texte + Atrium |
| **Tomes 1 et 2** | 31-36 | Le T2 a **trois** cahiers. La blessure de Vaenor : **un frère, Tavel**, **vingt-deux ans**. C'est le **Préfet-du-Feu** qui ordonne de brûler, Verkan qui exécute *et* lit — et la légende publique est enregistrée **comme légende**. Le scribe est **Thevin**, le rapport est **d'Aelindra**. | Texte + Atrium |

**Les deux arbitrages retranchés en cours de route**, dont voici la version finale :

- **N° 20 — les cahiers.** Il n'y a **pas** de dix-huitième cahier : le C/38 le dit
  lui-même (« il restait une quinzaine de pages blanches », puis la note du jour 910,
  et il en reste quatorze — dans le même objet). **Dix-sept cahiers et deux dépôts** :
  la thèse et la copie d'Ysolde restent à Prismalith au jour 895 ; les cahiers
  repartent avec Sorin, reçoivent la note du jour 910 à Rukhsar et se referment sur
  quatorze pages blanches — c'est le second dépôt, chez Omarin, derrière la porte
  bleue, que le C/36 annonçait. Une seule édition faite : C/38 l. 34.
- **N° 14 — le pont Corvane.** La Corvane du T3 et le Corvane de Cendara des
  Chroniques **ne sont pas la même personne** : le vieux lettré meurt à sa table en
  l'an 250, la veuve de Taldre parle encore en 251. **Deux homonymes**, reliés dans
  l'Atrium par `a-ne-pas-confondre-avec` (`lnk-3692`).

*Vérifié par sondage dans les fichiers* : T3/03 ne porte plus *Astremer* et dit « La
Consule Selvir » ; T3/07 et T3/15 ne portent plus *Tovan* ; T3/11 dit « Aînée des
Mains Vides » ; T3/29 et T3/40 portent Dorvel et Solvec ; T3/38 porte la ligne des
cinq derniers dépôts ; C/34 porte le Fragment #3 en marge ; C/38 l. 34 dit « la copie
d'Ysolde était restée aux archives » ; C/01 ne dit plus « remparts ».

### Le raccord livres ↔ Atrium du 2026-09-23

À la question « les livres et l'Atrium sont-ils raccord ? », la réponse a été
**mesurée, pas supposée**. Cinq relectures intégrales ont confronté les 200 chapitres
à tout ce que l'Atrium affirme en les citant (979 affirmations), puis cinq autres ont
recalé chaque citation sur le texte réécrit. Chaque correction a été vérifiée deux
fois : la phrase du livre existe mot pour mot au chapitre, la sous-chaîne remplacée
existe une fois et une seule dans le champ. Chaque champ touché garde sa trace dans
`data.raccord` (date, ancien texte, motif).

| Mesure | Avant | Après |
|---|---|---|
| Citations « … » de l'Atrium introuvables dans le chapitre cité | **787** sur 1 628 | **0** (11 restantes : intitulés d'arbitrage, lore hors livres, ou retour à la ligne) |
| Citations exactes mais tirées d'un autre chapitre que celui cité | 37 | 0 (le chapitre est ajouté aux preuves) |
| Chapitres dont l'Atrium ne dit rien | 11 | 4 (T1/30, T1/37, T3/1, T3/47) |
| Renvois de l'Atrium vers un chapitre inexistant | 0 | 0 |
| Renvois vers une bible retirée | 2 | 0 |
| Réponses données à un mystère protégé | 4 | 0 |

**Ce qui était faux dans l'Atrium, et que les livres ont corrigé** : ~130 erreurs de fond
(Tavel et toute la chaîne de Vaenor ; Davor vivant à H2 ; Vharok et trente-neuf fidèles ;
Vhail, trente ans de rondes ; Nève l'astronome confondue avec Neve la passeuse ; la liasse
d'Omarin confondue avec la copie de Prismalith ; Ílvar, que la bible faisait mourir et que
le T1/49 laisse vivant au large ; un voyage daté 9952 au lieu de −3 ; la mort d'une chamane
de Velathor accrochée à Kessa la forgeronne…) et ~600 citations écrites d'après la version
des livres d'avant la réécriture — une quinzaine changeaient le fait (un autre locuteur,
un « oui » devenu « non »). **175 fiches** créées pour ce que les livres nomment et que
l'Atrium ignorait (Pardine la mule, Ryvan, Rœfel, Terec, Lunaris capitale de Lunasar…),
**2 doublons** fusionnés (`con-0151` dans `obj-0069`, le Fragment #3 ; `per-0843` dans
`per-0168`, Talvhar). Commits `6885d96` et suivant.

### Le reste

| Chantier | Décision | Où ça vit |
|---|---|---|
| **Trois calendriers non tagués** (2026-08-05 → 09-14) | Le tag est posé **dans l'Atrium**, pas fiche par fiche : `fact.data.calendrier`, un décalage unique de +9 949 pour le Sillage, l'An 0 de l'Arrachement excepté. 1 092 faits datés sur 1 097, 958 entités avec `data.periode` (confiance + méthode + indice). | Atrium |
| **Douze continents** | **11 continents** ; Baelor et Nysaria sont de grandes îles. « Douze » reste dans la prose : c'est **un usage vernaculaire du monde**, pas une erreur. | Atrium + prose inchangée |
| **47 nations** | `data.genre` sur les 124 polités : 44 `nation` + 3 `non-etat` = **47**. `data.forme` garde l'ancienne valeur descriptive. | Atrium |
| **Règnes orphelins, doublons, homonymies non balisées** | 0 règne orphelin, 0 homonymie non balisée (**112** `a-ne-pas-confondre-avec`), 79 faits en double fusionnés, les variantes de noms versées en alias au fil de l'eau (**231**). | Atrium |
| **Rattachement géographique** | ~1 000 relations `situe-dans`, chacune avec sa `data.methode`. Restent Baelor (racine) et Kytheris (non rattachable, acté). | Atrium |
| **Positions carte vs fiches** | **0 conflit** sur 226 villes. Marqueurs NML Azoria/Cestra échangés, Folgrad à Mosrack, Windora à Astravia, Haldria d'**Endora** (sa surface extraite revient à Warenthor). Écarts assumés d'Iskara, Thalmaris, Skaldoria, Myrtam : **position = carte de l'auteur, rattachement = fiches**. | Atrium + `data/monde-contours.json` |
| **Calage de la carte** | Clos le 2026-09-10, validé par l'auteur sur le vrai fond. Ne pas rouvrir. | `CLAUDE.md` |
| **380 notes du balayage** | Triées et closes : alias, balises d'homonymie, fusions, statut `lecture-disputee` des divinités sectaires. | Atrium + `data/lore-notes.json` (trace) |
| **Contradictions du lore (12 points)** | Tranchées le 2026-09-09 : Tessar Veynd, l'Édit de Celestia, les **trois** Kyra, les civilisations antiques (les fiches font foi), Kethvar, Pyrevane, Mirathi, Elarath/Solmaris, Skaldoria, la Ligue des Marchands, les **deux** Velmaris, les règnes multiséculaires (`data.fourchette`). | Atrium |
| **Chronologie de Noravia / Sorin** | Les Chroniques font foi : Aldric en **230**, Sorin en **251**, et il monte au glacier. Quatre fiches rebasées. | Texte + Atrium |
| **Année de la Refermeture (T2)** | Le récit fait foi : le Fléau s'achève **~1 500**. | Atrium |
| **Arbitrages de fait du tome 1** | Les treize points de la réécriture (Thessan pose la question, dix nuits à la crique, Kessa part du campement, Sera les mains vides, Verithan à mille ans, Kelib sept ans plus tôt…) sont tranchés **dans le texte**. | Texte du T1 |
| **Renumérotation du tome 1** | Prologue « La gardienne du seuil » (POV Nera), 49 chapitres, corpus de la trilogie à 162 fichiers. Les ≈57 renvois numérotés périmés vivaient **dans les bibles** : ils sont partis avec elles. Vérifié : les 65 `recit_uid` du T1 et leur `data.chapitre` concordent, 0 divergence ; plus aucun fichier du dépôt ne porte de renvoi « canon ch. N ». | Texte + Atrium |
| **Le champ `disclosure`** | Nettoyé (`d9f7f78`) : les 2 704 entités qui portaient `interne` par défaut d'import sont `public`. **Il ne gouverne que ce qu'un narrateur a le droit d'énoncer** — jamais ce que le site affiche. Les exceptions sont ensuite posées à la main : 35 appliquées le 2026-09-22 (27 objets, concepts et termes ; 8 lieux et événements), l'Atrium à 2 862 `public` · 85 `restreint` · 1 `auteur`. **Le lot des personnes est encore en cours.** | Atrium |
| **Doublons francs fusionnés** (2026-09-22) | `obj-0061` dans `obj-0012` (le Cœur de Cendra) · `obj-0065` dans `obj-0062` (les Pierres Runiques de Lune) · `con-0132` et `ter-0048` dans `con-0128` (les Chamanes des Brumes) · `que-0032` dans `que-0031` (voir §III). | Atrium |
| **Bake overlay → base** | L'overlay Turso de prod est **vide** : la base committée fait foi seule. `scripts/bake-overlay.js` reste prêt. | `CLAUDE.md` |
| **Nœuds de montage du T2 dissous par la réécriture** | La fuite de Kessane et Lirenn (ch. 29/30/33/35) : les ch. 29, 30 et 33 ne portent plus les mentions anticipées — **vérifié, le conflit n'existe plus**. Les feuillets « blanchis » du T3/52 disent désormais « noirci » comme les autres. | Texte |

---

## II. Ce qui reste ouvert

### 1. Les neuf faits de Sorin Valthen à l'an 252

Neuf faits portés par `per-0153` sont datés **10201 (an 252)** —
`fac-0470`, `fac-0472`, `fac-0473`, `fac-0545`, `fac-0619`, `fac-0823`, `fac-0951`,
`fac-0972`, `fac-1282` — au-delà de la borne du corpus : les Chroniques se ferment au
jour 910, au début de l'**an 251**. La `data.periode` de Sorin en hérite (10181→10201).
**Quatorze fiches** de `Docs/Lore/Pays/` et `Docs/Lore/Histoires/` écrivent de même
« an 252 » (et « en 254 ») pour son voyage.

⚠ **Un seul fait est légitimement à cette date** : `fac-1560`, le colophon du copiste
de Prismalith (« la note est de 252, la copie de 251 », arbitrage n° 21). Il porte la
mention en `data.note`. **Ne pas l'emporter dans un traitement en bloc.**

### 2. La fourchette du tome 2 — `oeu-0003` / `evt-0162`

`oeu-0003` dit « ~1 400–1 600 ap.A » et `evt-0162` « avant ~1700 », quand l'arbitrage
du 2026-09-14 pose que **le Fléau s'achève ~1 500**. Les six faits du Fléau ont été
recalés ; ces deux résumés ne l'ont pas été. Point hors des 36 arbitrages.

### 3. `per-0755` « Le cartographe de Kharazir »

Doublon probable de Sorin Valthen : même signalement — cartographe, de Kharazir,
tissu jaune, carnet. **La date l'interdit** : la fiche le fait passer à Elarath en 251,
le récit y passe à l'acte II, en 249. Un lien `a-ne-pas-confondre-avec` vers `per-0153`
le dit, avec le motif. **La fusion demande l'auteur.**

### 4. `data/evenements-recit.json` — deux clés pour une œuvre

Les Chroniques y sont versées sous **`oeu-0013`** (ch. 1-23, 105 événements) et
**`chroniques`** (ch. 24-38, 84 événements). Aucun titre dupliqué : c'est une coupure
de clé au chapitre 24, pas un doublon. À unifier.

### 5. ~~103 des 117 faits versés n'ont pas de libellé~~ — RÉGLÉ le 2026-09-22

Leur contenu était dans `detail`, `label` à `null`, et les trois affichages de
`js/monde.js` lisaient `label` sans jamais lire `detail` : 36 d'entre eux
s'affichaient entièrement vides. Un helper `texteFait()` prend désormais le
premier des deux champs qui porte du texte. Vérifié au navigateur sur la fiche
de Vaskar Sorne : zéro ligne muette, alors que six de ses sept faits en étaient.

### 6. ~~322 entités sans résumé~~ — RÉGLÉ le 2026-09-22

314 lieux et 8 nations s'ouvraient sur du vide. Le constat de départ était faux
sur un point : **287 d'entre elles portaient déjà leur fiche de lore recopiée en
entier dans leur champ `body`** — le texte dormait dans l'Atrium sans jamais
s'afficher. Le travail était donc de compresser, pas d'écrire. **Les 322 sont
écrits** : plus aucune fiche de l'Atrium ne s'ouvre sur du vide.

Trois noms ont été rendus à leur orthographe au passage : **Myrthéria** et
**Obélia** (un `é` perdu à l'encodage, que les fiches `Drakora.md` et
`Ackerna.md` écrivent correctement), et **Le Lié draconique**.

**Réparé le même jour : 162 entités avaient perdu TOUS leurs accents**, dont les
huit Ères — « l'Ocean Premier », « les Eternels », « les 45 Etheres », « Clivage
Lies/Delies ». C'est la colonne vertébrale chronologique du monde qui s'affiche
ainsi. Réparé — graphe et fiches de lore sources, sous un invariant qui
n'autorise que des diacritiques ; 806 mots restent nus sous le seuil de
confiance (ambiguïtés participe/présent), laissés à une relecture humaine.

### 7. ~~`LIEU_SCALES` est une ontologie fermée que la base viole~~ — RÉGLÉ le 2026-09-22

`lib/kg-core.js` déclare `LIEU_SCALES = ['monde', 'continent', 'region', 'nation',
'cite', 'ville', 'bourg', 'ruine', 'lieu-dit']`. Or `data.echelle` emploie deux
valeurs qui n'y figurent pas — **`hameau`** et **`quartier souterrain`** — et
**64 lieux sur 1 005 n'ont aucune échelle**, dont des régions entières (Skraalia,
Korvaria, Kethmaria, Solniria) et des salles (le Sanctuaire de la Première Enclume,
la Porte de Fer du défilé d'Iskara). Deux sorties : ouvrir l'ontologie aux deux
valeurs employées, ou les ramener à `bourg` et `lieu-dit` ; puis échelonner les 64.

**RÉGLÉ le 2026-09-22** : `hameau` et `quartier` entrent dans l'ontologie
(`quartier souterrain` y est ramené), les 65 échelles manquantes sont posées, et
521 fiches qui n'avaient pas d'objet `data` du tout en ont un. Contrôle : zéro
valeur hors ontologie, zéro lieu sans échelle.

### 7 bis. ~~Les rattachements de lieux sont faux en masse~~ — RÉGLÉ le 2026-09-22

Les six lots de résumés ont buté sur le même défaut : **le graphe range des
lieux sous le mauvais pays**, ou sous le continent au lieu de la nation. Le
site affiche donc des villages sous la mauvaise bannière.

Les cas les plus graves : **Holvendar** et **Amarendis**, deux capitales, sont
accrochées au mauvais pays ; **Navoria**, capitale de la Thalassocratie de
Navoris engloutie à l'An 0, est donnée pour capitale de **Mosrack**, qui n'en
est que l'héritier politique neuf mille ans plus tard ; **Everthor-Prime**
donne à Thalmaris une seconde capitale, alors qu'Ostarith la tient déjà ;
**treize villages et régions d'Haldria** sont rangés en Ilthara, quand Haldria
est une nation d'Endora ; **quatorze lieux d'Avalor** et **dix-neuf d'Onara**
pendent au continent au lieu de leur nation.

**La cause est dans la carte, pas dans le graphe.** Ces liens ont été dérivés
par point-dans-polygone depuis `data/monde-contours.json`. Or sur Celethor, le
polygone étiqueté **« Ryldor » fait 15 295 unités² sur les 35 839 du continent
et en couvre toute la largeur** (x de −155 à 153, quand Celethor va de −155 à
158) — contre 2 054 pour Astravia et 4 367 pour Elarian. Tout point de ce
continent tombe donc dans Ryldor. Et `Docs/Lore/Pays/Celethor/Ryldor.md` dit
l'inverse à sa ligne 97 : « Unique région du pays : vallée abritée entre les
montagnes de Celethor. »

L'arbitrage du 2026-09-14 tranche déjà ce genre de conflit et s'applique ici :
**position = carte de l'auteur, rattachement = fiches.** Les liens sont donc à
refaire d'après le lore, surface inchangée. Mais **l'étiquetage des surfaces de
pays mérite d'être revu par l'auteur** : sa carte peint Ryldor sur la moitié de
Celethor, ce que sa propre fiche contredit.

Second volet du même chantier : **`data.echelle` contredit la prose du lore**
dans une quarantaine de cas — des `cite` pour un « Population : Village », des
`ville` pour des hameaux, et une fiche qui se contredit elle-même (`Vyndris`,
« Hameau de cartographes… — Population : Ville »).

**Réglé le 2026-09-22** : 173 corrections, chacune appuyée sur une phrase citée de la
fiche — 160 `situe-dans` et 13 `capitale-de`. Cinq capitales d'empires disparus
(`lie-0014` à `lie-0018`) étaient accrochées à leur héritier moderne, sept nations
retrouvent leur capitale. Les 168 échelles décalées d'un cran sont corrigées d'après
la ligne « Population » de chaque fiche.

### 7 ter. Les surfaces de pays ne sont pas bonnes — liste de travail

**Confirmé par l'auteur le 2026-09-22.** Chaque surface de `data/monde-contours.json`
(jeu 0, niveau `pays`) a été confrontée aux lieux positionnés qu'elle contient,
et à la nation que leur **fiche** leur donne. Deux mesures :
- **intrus** : lieux dans la surface, mais d'une autre nation selon leur fiche ;
- **échappés** : lieux de cette nation, mais hors de sa surface.

Sur 30 surfaces, **deux seulement** sont propres (Evertia, Baelor-Prime — les deux
plus petites). **224 lieux** positionnés ne tombent dans aucun pays.

| Pays | Aire (u²) | Justes | Intrus | Échappés | Intrus principaux |
|---|---:|---:|---:|---:|---|
| Lumasar | 5045 | 14 | 5 | 18 | Kharazir 3, Trinoria 2 |
| Seraphia | 3825 | 14 | 1 | 19 | Lumasar 1 |
| Trinoria | 5701 | 8 | 8 | 10 | Lumasar 7, Kharazir 1 |
| Altram | 3197 | 6 | 4 | 11 | Torkam 4 |
| Kharazir | 7418 | 13 | 4 | 11 | Lumasar 2, Valoria 2 |
| Avalor | 3114 | 10 | 0 | 15 | — |
| Ryldor | 15295 | 2 | 11 | 3 | Astravia 6, No Man's Land Celethor 5 |
| Warenthor | 3805 | 0 | 9 | 3 | Haldria 7, Ackerna 2 |
| Astravia | 2054 | 5 | 0 | 12 | — |
| Ventera | 2537 | 11 | 2 | 9 | Solena 2 |
| Torkam | 1112 | 3 | 0 | 11 | — |
| Sylthara | 2337 | 5 | 0 | 10 | — |
| Elarian | 4367 | 9 | 0 | 10 | — |
| Iskara | 5071 | 13 | 1 | 8 | Avalor 1 |
| Tyndara | 2497 | 9 | 0 | 8 | — |
| Solena | 1323 | 8 | 0 | 8 | — |
| Thalmaris | 4055 | 10 | 1 | 7 | Iskara 1 |
| Brumaria | 1665 | 8 | 0 | 8 | — |
| Ackerna | 5360 | 8 | 4 | 3 | Sylthara 4 |
| Mosrack | 4058 | 1 | 0 | 7 | — |
| Myrtam | 2070 | 6 | 1 | 6 | Torkam 1 |
| Drakora | 2767 | 5 | 4 | 2 | Lythar 3, Vytharia 1 |
| Pyrtara | 3425 | 8 | 0 | 5 | — |
| Lythar | 2924 | 8 | 0 | 5 | — |
| Valoria | 2784 | 11 | 2 | 3 | Lumasar 2 |
| Gryndor | 1115 | 1 | 1 | 3 | Pyrtara 1 |
| Vytharia | 1266 | 3 | 0 | 4 | — |
| Skaldoria | 0 | 0 | 0 | 3 | — |

**Ce qui vient de l'Atrium, et ce qui vient de la carte.** `scripts/extract-pays.js`
tire la graine de chaque pays de l'Atrium : sa capitale (`capitale-de`), sinon ses
villes (`situe-dans`). Ces liens étaient faux pour sept nations au moins. Ré-extraction
testée en bac à sable après la correction des liens du 2026-09-22 :
- **Ryldor** passe de 15 295 à 2 451 u² — l'aspiration de la moitié de Celethor
  venait des graines, et elle disparaît. Warenthor et Ackerna s'améliorent aussi.
- **22 des 30 pays ressortent identiques à l'octet près** (Lumasar, Seraphia,
  Trinoria, Kharazir, Avalor, Altram…). Leurs graines étaient déjà bonnes : leurs
  erreurs viennent des **aplats de couleur de « Hybelior Pays.png »**, pas de
  l'Atrium. C'est la carte qui est à reprendre là.
- **Haldria — TRANCHÉ le 2026-09-22 (délégation de l'auteur) : l'arbitrage du
  2026-09-14 est maintenu.** La fiche et l'Atrium placent Haldria en Endora ; sa
  capitale Hekorinth est pourtant posée à (−265, 149), en Ilthara — vestige de son
  ancienne implantation, que la carte n'a jamais suivie. La décision est désormais
  écrite dans l'Atrium (`data.carte.sans_territoire` sur Haldria,
  `data.carte.surface_figee` sur Warenthor) et `extract-pays.js` la respecte.

**Appliqué le 2026-09-22, sous une règle stricte : une surface neuve ne remplace
l'ancienne que si elle est meilleure sur tous les plans.** Cinq passent — Ryldor
(intrus 11 → 2, 15 295 → 2 451 u²), Ackerna (intrus 4 → 0), Sylthara, Pyrtara, et
No Man's Land Celethor, qui reçoit sa surface. Astravia et Elarian gardent la leur :
la ré-extraction faisait avaler cinq villages d'Astravia par Elarian. Total : justes
200 → 207, intrus 58 → 45. Aucun chevauchement introduit, cartes par ère régénérées.
La procédure est reproductible (`scripts/assembler-pays.js`, vérifié de bout en bout).

Au passage, la génération des cartes par ère avait perdu deux héritiers de
l'Hégémonie d'Aethran — Kharazir et Ventera, 9 800 u² — parce que sa table citait le
nom en dur, sans l'accent que l'Atrium venait de lui rendre. La recherche y est
désormais insensible aux accents.

Le bloc Galenor (Lumasar 23 erreurs, Seraphia 20, Trinoria 18, Kharazir 15) est le
plus atteint : les lieux de Lumasar tombent dans Trinoria, ceux de Kharazir dans
Lumasar. C'est par là que la reprise de la carte rapporterait le plus.

**La côte de Baelor, révélée le 2026-09-26 par le lac perché.** Le lac inscrit ce
jour (`lie-1060`, Ce-qui-rend-le-ciel, centré en (67,35 ; 251,44) après le passage
à la nouvelle échelle, §14) tombe **hors** de l'île de Baelor dans
`monde-contours.json`, qui n'en a qu'un hexagone provisoire de 33 u² (x de 67,70 à
73,73 ; Thyldris y tombe déjà en mer, et Baeloris, ramenée sur sa côte nord en
y = 251,05, aussi). Sur les tuiles de la carte peinte (niveau 17), ces points sont
bien à terre ; l'île peinte couvre ~55 u² (x ≈ 66,2 à 74,6, y ≈ 250,6 à 261,0), soit
~8 × 10 km. À faire : reporter la côte peinte dans le tracé (`continents-trace.svg`,
puis `extract-trace-contours` → `extract-pays` → `snap-pays-cotes`), ou reprendre la
côte v3 du prototype (§14, B12). Au passage, la
surface **Baelor-Prime** (`source: cote-ile`) est dégénérée : six points alignés vers
y ≈ 320, loin de l'île, d'aire nulle malgré son `aire: 33`. Si elle compte parmi les
deux surfaces « propres » du tableau, c'est qu'elle ne contient rien ; elle sera
refaite avec la côte.

### 8. `npm run lint` est rouge — deux erreurs

`scripts/wf-corpus-sweep.js` et `scripts/wf-histoires-exhaustif.js` sont des modules
ESM (`export const meta = …`), mais `eslint.config.js` range tout `scripts/**/*.js`
en `sourceType: 'script'` : *Parsing error: 'import' and 'export' may appear only with
'sourceType: module'*. **2 erreurs, 36 avertissements.** Correctif : un bloc de config
pour ces deux fichiers, ou les renommer en `.mjs`.

### 9. Les nœuds de montage du tome 2

Ce sont des choix d'auteur, pas des corrections. Rien n'a été déplacé.

- **ch. 27, « Ceux qui restent debout »** — le hameau bascule « deux cents ans » en
  arrière et y trouve le monde **d'avant l'Arrachement**, à quatorze siècles de là ; et
  trois nombres du chapitre ne s'additionnent pas (la narratrice à cinquante ans, sa
  grand-mère à dix-sept, Vesle morte depuis quarante ans). Garder la profondeur en
  lâchant la parenté, ou garder la parenté en ramenant la chute à quatre-vingts ans.
- **ch. 24 / 38 / 39, le marquage des portes** — le ch. 24 fait **déjà** joindre le
  signe par la circulaire (« Un rond barré d'un trait », tracé au brai) ; l'article
  quatre du ch. 38 le crée comme chose neuve, « l'Édit ne disait pas lequel ». Sortie la
  moins coûteuse : faire de l'Édit la généralisation d'une circulaire déjà appliquée.
- **ch. 42 contre le reste du tome** — le délai avant le crachement de sang est de
  **six mois** au ch. 42 et de **dix-huit mois** partout ailleurs (ch. 02, 20, 30, 35,
  39, 48, 49). C'est un contre sept, pas un contre un.
- **ch. 40** — l'arithmétique des sept ne boucle pas ; et **Nael est absent du ch. 40**
  alors que le ch. 34 le met en tête du même convoi.
- **Herec / Herrec** (ch. 37 et 18) — homonymie voulue ou coquille.

### 10. Les écarts de comptage du tome 3, relevés et laissés

Relevés par la passe finale, aucun chiffre inventé. Ils sont mineurs et cohabitent
sans casser de lecture : « Six morts, quatre tentatives » (ch. 32) qui ne se raccorde
ni au ch. 03 ni au ch. 07 · le lieu de la mort de la femme des marches (Taldre au
ch. 38, entre Vireuil et le haut pays au ch. 39) · le commis de Vellan, « l'an dernier »
au ch. 24 et dans l'année en cours au ch. 15 · le comptage des ch. 09 et 29 · le compte
des jours d'Ísae au T2 (ch. 03 contre ch. 33) · l'aiguille courbe du T2 (forgée au
ch. 03, sortie d'un paquet plat au ch. 26).

### 11. Points de style et de dispositif laissés à l'auteur

Aucun n'est une incohérence. Le triplet de Karsel (T3/45-50-51) · « main / paume à
plat », tic de trilogie · les trois « première fois » du T3/28 · la clausule « sans
hâte » du T1/08 · la litanie du T3/01, qui dit « qu'hier » là où les ch. 12, 23, 34, 47
disent « chaque fois un peu mieux » · le calendrier interne de l'autodafé (T1, ch. 09,
10, 53) · et **la phrase du Cercle**, que le T3/12 donne pour invariante « au même mot
près » quand le fragment du T3/01 la donne altérée — si c'est le ch. 12 qui se trompe,
c'est la plus belle faute de copiste du livre. C'est un texte de fragment : on n'y
touche pas sans l'auteur.

### 12. Ce que le raccord du 2026-09-23 laisse à l'auteur

Relevées en lisant chaque chapitre contre l'Atrium, **ce sont des contradictions entre
chapitres** : l'Atrium ne peut pas les trancher sans réécrire un livre. Il suit
aujourd'hui l'un des deux textes, indiqué entre parenthèses quand c'est le cas.

**Chroniques.**
- **C/3 contre C/4** — la route Kharazir → Ventera → Solena : C/3 inverse les points
  cardinaux (sur la carte, Ventera et Solena sont à l'ouest).
- **C/9** — l'en-tête (jour 190) ne tient pas avec les intervalles du chapitre
  (Intendant = arrivée + 4, puis cinq jours de route) ; et « deux mois » depuis Kelanor
  quand les numéros de jour en donnent six.
- **C/10 contre C/11** — la fuite de Velithar : le soir même (C/10, suivi par l'Atrium)
  ou deux nuits avant le départ (C/11).
- **C/13 et C/19 contre C/4, 6, 10** — la traque « prend un visage » à Perivalis comme
  une première rencontre, et Draye « ne s'était encore jamais laissé voir » au C/19.
- **C/17 contre C/18** — vingt-cinq jours de Keldros à Ydralis donnent le jour ≈ 433,
  pas 425.
- **C/19** — Kael la veille du duel, les bêtes avant : l'Atrium met trois jours entre
  Kael et le duel.
- **C/1, C/2 contre C/14, C/27** — l'écriture des tunnels de Rukhsar : lisible au quart
  (« Ancrages ») ou sans famille connue ? Double-fond voulu, ou non.
- **C/21 contre C/22** — la montée au cratère annoncée à deux ou trois jours, faite
  une vingtaine de jours plus tard (l'Atrium suit l'en-tête du C/22).
- **C/24** — « J'étais en mer quand Ourven cessa d'entendre » alors que Sorin a passé
  trois jours à Valmora. **C/24 contre C/25** — la dernière voix et le guide de Sylvara
  ne portent pas le même nom ; Ourven (578) + 5 jours ne font pas 600.
- **C/29 contre C/30** — dix-huit jours de traversée ne tiennent pas entre 722 et 736.
- **C/33 contre C/34** — la perte des sept de l'expédition altram : version d'Yrsa
  contre version de Torval ; et « Demain, l'intérieur » (825) contre le surplomb au 845.
- **C/37** — le jour 895 est à la fois le premier jour à Prismalith et le soir de
  l'audience. **C/38** — la note « Jour 910 » raconte la visite du lendemain.
- **Les « il y a N ans » des C/32 à C/35** sont comptés depuis l'an 250 quand l'Atrium
  date ces scènes de 251 : un an d'écart, toutes en estimation.

**Tome 1.**
- **T1/4** — « trente ans plus tard » est intenable (quinze ans de lettres, puis des mois
  de protocole). **T1/5 contre T1/6** — la spoliation de la forge : −5 ou −6.
- **T1/7** énonce comme un fait ce que le T1/8 donne comme rumeur (le Préfet et
  l'autodafé, arbitrage 34). **T1/8 contre T1/9** — deux ans et trois mois, ou quatre
  ans d'infiltration. **T1/19 contre T1/8** — qui dit « Vous la trouverez », qui signe
  l'ordre de mission d'Aelindra.
- **T1/14, 15, 53** — la Baelor de l'An 0 porte Thyldris, ses Veilleurs et « quatre
  siècles », qui sont du Sillage ; **T1/16, 18** — la même transposition pour l'Ilthara
  de Mirathis. **T1/14 contre T1/1** — Verithan meurt, ou naît, il y a mille ans.
- **T1/14 contre T1/15** — deux récits du troisième soir de Baelor ; et Ollam, du
  Premier Voile, vote alors que la règle du chapitre l'interdit.
- **T1/16** — la conversation du seuil « à trois ans » de la montagne, quand Thessan
  n'entre au Cercle qu'à J-90. **T1/20 contre T1/35** — le Fragment #3 daté J-51 et
  écrit la dernière nuit.
- **T1/21-22 contre T1/1, 8, 14, 35** — Kayara, membre du Cercle depuis J-90, ou
  passeuse louée qui découvre le but en mer ? **T1/22, 26, 27** — trois itinéraires
  incompatibles pour Sera. **T1/25 contre T1/33** — l'eau de Navoria monte depuis un
  mois, ou depuis l'avant-veille.
- **T1/34 contre T1/36** — le campement tiède de Verkan « la veille », à des jours de
  route du Mont. **T1/37** — la forge de Drakhan éteinte depuis des semaines, contre un
  dernier jour de forge. **T1/39 contre T1/43** — nuit sans lune, ou lune prise par la
  fumée. **T1/43 contre T1/52** — il ne restera de Verkan « qu'une ligne, et elle
  serait fausse », mais il garde une feuille vraie.
- **Le titre « H1 »** met l'ouverture du Mont une heure après le geste ; trois chapitres
  la font dans l'instant. **Les horloges du geste** (H2, H5, H6 « à midi » contre un geste
  « avant l'aube ») touchent `que-0013` : à signaler, jamais à trancher.
- **Géographie** : le T1 fait de **Celethor** une ville (d'écoles et de jardins), l'Atrium
  un continent ; l'« **Empire de fer** » du T1/8 est sans doute Lithane. Aucune fiche
  créée pour l'une ou l'autre.

**Tome 2** (en plus des nœuds du §9).
- **T2/0** — l'en-tête dit ~−30, la prose au moins quarante ans avant l'Arrachement.
- **T2/2-3 contre T2/10** — la Forge-Basse : la maison de Kessane, ou un hameau de trente
  feux ? **T2/7** — Corvane le corroyeur : un bourg des marges d'Onara (fiche) ou le marché
  des grains de Drahk'Nor (chapitre).
- **La chaîne de Vaenor après Tavel** : le T2/18 garde des traces de l'ancienne chaîne, les
  années de service varient (10, 15, 16, 20 ans) ; et si Tavel meurt en 1480, les
  Inspecteurs naissent vers 1480-1485 — l'Atrium les date encore de ~1460
  (`ter-0133`, `fac-1071`).
- **T2/9, 21 contre T2/16** — le cahier de Teor. **T2/16 contre T2/30** — quand la phrase
  du Fragment #3 entre chez Vaenor. **T2/25, 31 contre T2/42** — quel cahier Kessane lit
  sur la crête. **T2/23 contre T2/43** — Vaenor retourne-t-elle au moulin ?
- **T2/4, 5 contre T2/29, 33** — l'apaisement de Sènn : ce même automne, ou deux ans
  plus tôt. **T2/33 contre T2/49** — Ombreth meurt en Alkaran ou « sur la plaine ».
  **T2/45** lui prête une intuition que ses propres chapitres lui refusent.
- **La coda (T2/48, 51)** tient deux horloges pour l'enfant qui entend ; elle touche
  `que-0010` — à signaler, jamais à trancher.

**Tome 3** (en plus du §10).
- **T3/3 contre T3/7** — le coffre de la copie d'Olven : tampon récent de Drakora, ou
  mention d'un autre siècle sous cire noircie. **T3/32, 39** — la copie dort depuis
  « trois siècles » ; elle a été scellée au T2, neuf mille ans plus tôt.
- **T3/17 contre T3/19** — la même nuit de Taldre racontée deux fois : cahier fermé et
  récité, ou ouvert et lu ; « tu » ou « vous ».
- **T3/22** — la pulse « presque quotidienne » après les « deux fois par jour » des
  ch. 13 et 17 : l'escalier recule, contre l'arbitrage 8.
- **T3/26** — Maître Corvane, « de son âge à elle », connaît le prisme « depuis quarante
  ans » : reste des cinquante-trois ans d'Ysolde. **T3/26 contre T3/30** — l'auteur et le
  texte de la note qui accompagne la ligne marginale.
- **T3/4 contre T3/36** — qui a remis le cahier à Sanne : sa mère, ou « ma maîtresse ».
  **T3/30** — Sanne n'a défait le paquet devant témoin qu'une fois, mais la Roue-Basse
  (T3/25) précède Prismalith.
- **Les « deux mois »** : la traque et l'apprentissage de Karsel (T3/28, 37, 39, 42)
  ne passent pas ; Karsel élève depuis deux mois (T3/39, 42) ou un an (T3/51).
- **T3/33 contre T3/35** — deux jours, ou six, entre la rivière et le foyer.
- **T3/43 contre T3/47** — les irruptions 6 et 7 de la voix découvrent deux fois la
  même chose. **T3/32 contre T3/51** — le nom de Vaenor, prononcé devant Vaskar puis
  « jamais entendu ». **T3/50 contre T3/51** — le rapport porte « trois mille », ou
  aucun nombre.
- **T3/39, 42, 50** — la même case de Vaskar porte deux noms.
- **Coquilles** : T3/40, neuf moins trois font six pèlerins, pas sept ; T3/45, « nous »
  (Renna et Ilex) appelle « rayés ».
- **Géographie** : le T3 fait d'**Onara** une ville à marches, met **Astravia** à trois
  jours de Vireuil (elle est sur Celethor, à ~580 unités), fait **monter au nord** vers
  Cendara et **descendre au sud** vers Prismalith — la carte dit l'inverse.

**Homonymes à connaître** (tous distincts, sauf mention) : trois **Nesse** (C/29, T2/12,
T3/25) et **Neve / Nève** ; trois **Wenna** ; deux **Kessa** et une Kessa de Velathor ;
**Terec / Térec** ; **Sorn / Sorne** ; **Varel / Vharel** (ancien nom de Dorvel) ;
**Dorvel / Yorvel** ; **Osrik / Ostrik** ; **Vireuil / Mireuil** ; **Sarech / Marech** ;
**Talvire / Elvire** ; **Herec / Herrec** (§9) ; **Torval** (deux) ; **Doran** (trois) ;
**Aldran**, **Kael**, **Yrsa**, **Sera**, **Renna**, **Marek**, **Marenn**, **Thyren**,
**Brennan** (chacun plusieurs) ; **Sarnac / Sarnak** et **Ossian** (deux moines de
Baeloris) — **même personne ou non, incertain** ; **la Saint-Feu / la Sainte-Braise** —
une fête sous deux noms, ou deux fêtes.

### 13. Ce que l'Atrium hérite encore de l'ancien lore

Ces fiches viennent des pages de pays et d'histoires écrites **avant** les romans, et les
romans les démentent. L'Atrium doit trancher pour les livres ; c'est une réécriture de
fiches, pas une retouche, d'où ce relevé.
- **Verian Soth** (`per-0044`, `evt-0086`) daté 251-252, quand le C/2 le met au jour 14 de
  l'an 248.
- **La chemise de cuir marron** (`obj-0029`, `per-0170`, `lie-0297`) : dépôt d'Aldric chez
  Sethiran en 220, remise à Sorin en 231, alors que les C/33-34 en font le journal
  d'Aldris Vane (le C/37 penche pourtant vers la lecture de l'Atrium).
- **Le parchemin de Lunasar** (`per-0194`) « conservé trente ans » et « la carte du
  père » : le C/28 ne connaît ni parchemin ni recul d'Aldric devant Solvanes.
- **Mylaris « an 252 »** (fiches de Brumaria) : l'an 252 est impossible, et Talvhar ouvre
  à Sorin les tablettes du Temple au lieu de l'oublier.
- **Naïm** : balayeur de Rukhsar dans l'histoire de la place (`evt-0073`, `lie-0523`),
  lecteur d'archives de Prismalith au C/38 (`fac-1284`).
- **`data.parcours` de Sorin** (`per-0153`) : huit étapes posées sur des capitales que
  leurs chapitres ne visitent pas (Soltharis, Oranthor, Gyndor, Valtheria, Folgrad,
  Fablioris, Ostarith, Duskoris).
- **Myrtam** : les Chroniques et la carte le mettent en Alkaran (écart déjà assumé au
  « Reste »).

### 14. L'échelle du monde (1 000 km) et la géographie construite

**Décision de l'auteur, 2026-09-26** : « au maximum du maximum, d'un bout de la carte
dans la mer à gauche jusqu'à l'autre bout dans la mer à droite, ça fait 1 000 km ». Les
1 047 unités de la carte font donc 1 000 km : **1 u ≈ 0,955 km**. La lieue reste
l'unité du récit (≈ 4 km ≈ 4,19 u) ; le monde compte à peine deux cent cinquante lieues
de bord à bord. Le calage du 25 septembre (1 u = 1 lieue, un monde quatre fois plus
large) est remplacé. **L'échelle ne bouge pas : c'est le texte qui s'adapte**, au canon
dominant. Elle vit dans `lie-1059` (`data.echelle_carte`, ancien calage en
`historique`) ; la carte d'accueil mesurait déjà sur cette base (`js/map.js`,
`worldWidthKm: 1000`).

Ce que cela change. Les allures ne bougent pas (ce sont des vitesses du monde réel, en
lieues par jour), mais toutes les distances de la carte sont ~4,2 fois plus courtes en
kilomètres qu'on ne le croyait : Sorin, à ses quatre à sept lieues par jour, couvre
désormais 17 à 29 u par jour. Galenor fait ~290 × 220 km, Cendara ~42 × 100, Ulinor
~41 × 71, Baelor ~8 × 10 ; un navire à l'allure normale (25 lieues, 100 km par jour)
traverse le monde en dix jours. Les durées des livres, calées sur un monde plus grand,
deviennent trop longues ; quelques trajets jugés impossibles redeviennent possibles
(Verkan, Mont → Sulvane en deux jours, T1/34 ; les traversées de Vorath, T1/22 et
T1/53 ; Drakora → Mont en quatre jours à cheval, T3/42-45 ; Cendral → Sulvane « à
40 km », Chronologie, Ère IV).

La voie « monde » du prototype tient une **boîte d'arrivée** pour les écarts qu'elle
découvrira en construisant la géographie
(`HybeliorPrototype/Docs/monde/INCOHERENCES_A_CORRIGER.md`) ; ils sont reportés ici,
qui fait foi. Statuts : **ouvert** · **tranché** (décision prise, texte à écrire) ·
**corrigé** (avec l'endroit). Les chapitres des livres ne sont pas réécrits : leurs
écarts restent ouverts pour l'auteur.

**A et B. Le relevé de la voie « monde »**

| # | Écart | Où | Correction proposée | Statut |
|---|---|---|---|---|
| A1 | `lie-1059` calait 1 u = 1 lieue (~4 000 km d'ouest en est). | Atrium | 0,955 km/u, 1 000 km de bord à bord ; la lieue reste une unité de récit. | **corrigé** : `lie-1059` (résumé, corps, `data.echelle_carte`) |
| A2 | Les durées des Chroniques sont calées sur l'ancienne échelle. | Chroniques, T1 | Liste C ci-dessous, produite par `scripts/verifier-trajets.js`. | ouvert (texte) |
| B1 | Baelor « ~300 lieues × ~150 », côte nord de « ~200 lieues ». | fiche Baelor - Continent, l. 15 et 31 | ~10 km sur 8, une cinquantaine de km² ; côte nord de ~8 km. | **corrigé** : fiche et sa copie dans `lie-0003` |
| B2 | La cabane du berger est « à deux jours de marche de Baeloris ». | Histoires/Baelor, l. 208 ; corps de `lie-0003` | « À quelques heures de marche », ou « une longue journée par le Voile bas » si le brouillard doit peser. | tranché (deux jours sont impossibles) ; formule à choisir |
| B3 | Les postes de Thyldris couvrent « 7 lieues de côte » ; la côte est fait ~10 km. | fiche Baelor, l. 154 | « Sur toute la côte est ». | **corrigé** : fiche et `lie-0238` |
| B4 | Baeloris posée à 0,76 u (730 m) dans les terres ; c'est une crique de la côte nord. | Atrium | Ramener sur la côte nord. | **corrigé** : `lie-0237` en (69,50 ; 251,05), `data.correction` |
| B5 | Le lac Ce-qui-rend-le-ciel, relevé en (67,15 ; 251,36), déborde sur l'angle nord-ouest à la nouvelle échelle. | Atrium | Recentrer en (67,35 ; 251,44). | **corrigé** : `lie-1060` (le relevé disait `lie-0970`, numéro pris en amont) |
| B6 | Le marqueur de la région Baelor, (70,81 ; 240,35), est en mer à 10 u au nord de l'île. | Atrium | Le poser au centre de l'île. | **corrigé** : `lie-0003` en (70,4 ; 255,8), centre de l'île peinte |
| B7 | « Lacs de lande », alors que la fiche dit « pas de lac noir au cœur de l'île ». | voie « monde » | Seulement des mares de tourbière de 10 à 50 m. | **corrigé** : aucune fiche du site n'en parlait ; la fiche du continent le dit (Hydrographie), `lie-0003.data.arbitrage` |
| B8 | Tholmë : galets gris et « falaise basse » (fiche) contre « grève noire » et « falaises noires montant droit de la mer » (T1). | fiche Tholmë, T1 | Les terrasses marines portent les deux : falaise basse sur la terrasse, falaises noires en contrebas. | ouvert |
| B9 | Kethros, monastère distinct dans l'Atrium, confondu avec Baeloris au C/30 ; où 40 navires ont-ils pu attaquer ? Sa position estimée (70,0 ; 253,0), « 1,7 u en retrait » de l'ancienne Baeloris, est à ~2 u de la nouvelle. | Atrium, C/30 | À trancher, puis reposer Kethros sur sa falaise. | ouvert |
| B10 | « Une seule crique pour toute l'île » (C/31), mais Tholmë a un quai et commerce avec Tyndara. | C/31, fiche Tholmë | Une seule crique sur la côte nord ; un simple quai d'échouage à Tholmë. | ouvert |
| B11 | Galets blancs « ramassés au nord de l'île » (T1/16), où la côte n'a pas de plage. | T1/16 | Ils viennent de la grève du fond de la crique de Baeloris. | ouvert |
| B12 | La côte de Baelor n'est qu'un hexagone provisoire de 33 u² ; Thyldris, Baeloris et le lac tombent en mer. | `monde-contours.json` | Reprendre la côte v3 du prototype (49 km²). | ouvert (§7 ter) |

**C. Les trajets à la nouvelle échelle.** `scripts/verifier-trajets.js` lit l'échelle
dans `lie-1059` (unités → lieues : ÷ 4,19). Sur 59 tronçons jugés, l'ancienne échelle
en faisait tenir 39, serrer 12, et 8 impossibles ; la nouvelle en fait tenir 8,
serrer 1, et **20 incohérents** : 4 impossibles et 16 trop lents, où le texte annonce
une durée plus de trois fois supérieure au temps de route. Trente autres tronçons ne
sont lents qu'au calendrier : **tranché**, le surplus d'un écart de dates est un
séjour tant que le texte ne dit pas que ce temps s'est passé sur la route ; ils
portent `lenteur` et une note, sans verdict (carte vivante, calque Trajets).
Corrigé au relevé (`per-0153`, `data.correction` sur chaque étape) : C/4, 32 jours
→ 23 (« Vingt-trois jours », chiffres inversés) ; C/21, 3 → 12 (« Douze jours de mer,
dont trois au large ») ; C/9, durée d'une heure retirée (c'était la descente de la
crête) ; durées du texte inscrites pour C/2 (13), C/10 (17), C/12 (25), C/19 (35),
C/20 (10), C/28 (15).

| Chapitre | Trajet | Le texte | La carte | Correction proposée | Statut |
|---|---|---|---|---|---|
| T1/22 | Sarth → crique de la Dent (Sera, Kayara) | « Six jours d'eau » | 148 km par mer, 1,5 j | Les six jours tiennent pour le navire parti d'Aethranor (455 km) ou de Tholmë ; depuis Sarth, « deux jours d'eau », ou le détour par le Fleuve-sous-la-Mer et un calme. | ouvert |
| T1/26-29 | Sulvane → Mont Cendra (Thessan 7 j, Aelindra 10 j) ; Sulvane → Cendral (Sera, 10 j) | « des jours et des jours de marche » | 60 km, 2 j | Cendara ne fait que ~42 × 100 km : dire la marche lente (cendre, colonne, détours), ou la raccourcir. | ouvert |
| T1/43 | Sulvane → Cendral (Verkan) | un jour | 55 km : **impossible** (1,4 j à marche forcée) | Sulvane est estimée à 44 u de Cendral ; la Chronologie (Ère IV) la met « à 40 km » : à ~33 u, une marche forcée tient. | ouvert (position) |
| T1/49 | Corail-le-Haut → île de Corail (Ílvar) | six heures de pirogue | 14 km : « impossible » | Artefact : les allures sont des journées de route ; 2,3 km/h à la rame tient. | sans objet |
| T1/50 | la Dent → Sarn-du-Vent (Kayara) | « dix nuits » au plus | 645 km : **impossible** en pirogue (13 j forcés) | Une pirogue à voile de haute mer va à l'allure d'un navire (6,5 j), ou « quinze nuits ». | ouvert |
| T1/52 | Mont Cendra → Baelor (Vorath) | deux heures | 414 km : **impossible** | Déjà impossible à l'ancienne échelle : passage ou ellipse du récit, pas l'échelle. | ouvert (relevé) |
| C/2 | Rukhsar → Kelanor | « Treize jours de route dans la caravane » | 59 km, 2,5 j | « Trois jours de route » ; le calendrier (J1 → J13) garde un séjour à dire, ou les haltes de la caravane. | ouvert |
| C/4 | steppes de Ventera → Vyndralith | « Vingt-trois jours » | 58 km depuis le départ estimé de la piste ; toute la traversée Kelanor → Vyndralith fait ~47 lieues, une semaine, où le texte met huit jours de caravane et vingt-trois de marche | « Sept jours », ou la grande herbe qui égare. | ouvert |
| C/5 | Solena → lisière de Trinoria | « Six jours de marche au sortir de Solena » | Vyndralith → Nalithos 313 km, 11 j ; le calendrier (J55 → J82) tient | Poser l'étape à la lisière de la forêt, à moins de 60 lieues de Solena, plutôt qu'à Nalithos. | ouvert (relevé) |
| C/7 | Trelios → Roseltar | « à trois jours de Trelios » | 42 km par mer (0,4 j), ~50 km par la route (1,8 j) | Par la route, trois jours tiennent ; le relevé suppose une traversée que le texte ne dit pas. | ouvert (relevé) |
| C/8 | cols d'Iskara ↔ Archives de Trelios | « Vingt-cinq jours de routes intérieures » | ~68 lieues par la terre (10 j, tient) ; la carte met la mer entre Alkaran et Endora (3 j) | Écart de carte antérieur à l'échelle : le texte dit des routes, la carte un bras de mer. | ouvert (carte) |
| C/9 | Haliandris → Ardentris | « Ardentris à cinq jours de route » | 22 km, 0,8 j | « À une journée de route ». | ouvert |
| C/10 | Myrtam → Velithar | « dix-sept jours dans les jambes depuis Myrtam » | 345 km dont la mer, 3,5 j | « Sept jours », et dire l'attente d'un navire. | ouvert |
| C/12 | Tyndara → Malderis | « Vingt-cinq jours de mer entre Onara et Endora » | 150 km, 1,5 j | « Deux jours de mer » ; le calendrier (43 j depuis Velithar) garde les séjours sur l'Onar. | ouvert |
| C/14 | Endora → Holvendar | « Trente jours de mer depuis Endora » | Hekorinth est posée en Ilthara (§7 ter, Haldria) : 106 km ; depuis l'Endora des fiches, ~540 km, 5 j | « Six jours de mer ». | ouvert |
| C/16 | Veldar → Myrthorin | une journée de montée à cheval | 11 km | Tient en montagne ; Veldar est à re-estimer (liste D). | sans objet |
| C/19 | Bybias → Wyndor | « Trente-cinq jours » de Trace (deux fois dans le chapitre) | 133 km, 4,7 j | Une quinzaine de jours (la jungle, où « une monture avance moins vite qu'un homme »). | ouvert |
| C/20 | Lytharil → Vaelmar | « dix jours de plaine plein ouest » | 53 km jusqu'à la Vaelmar estimée sur le golfe de Lythar ; la côte ouest d'Ilthara est à ~52 lieues (7 j) | Le texte tient si Vaelmar est « sur la côte ouest », comme il le dit : re-estimer Vaelmar (le rattachement à Lythar en souffre). | ouvert (position) |
| C/21 | côte ouest d'Ilthara → Diamoris | « Douze jours de mer, dont trois au large, à attendre » | 164 km, 1,6 j | « Quatre jours de mer, dont trois au large. » | ouvert |
| C/28 | couvents de Mirathi → Lunaris | « quinze jours de route » | ~60 km, 2,5 j | « Trois jours de route ». | ouvert |
| C/32 | Baeloris → Invernis | ≈ 38 jours de mer (J752 → J790) | 636 km, 6,4 j | Garder les dates et dire l'escale ou l'attente (glaces du chenal nord, vents). | ouvert |
| C/32 | Invernis → Galdryn | « Une demi-journée de marche » | 38 km : **impossible** (1 j forcé) | « Une journée de marche », ou Galdryn plus près (≤ 20 u) ; les deux sont posés par l'auteur. | ouvert |

**D. Positions estimées à l'ancienne échelle.** Les 65 positions estimées du
2026-09-25 (`data.carte.position_estimee`) ont converti des durées en unités à 1 u
= 1 lieue ; vingt le disent dans leur motif (« quatre jours ≈ 20 u »). À la nouvelle
échelle, la même durée vaut 4,2 fois plus de carte : chacune est à revoir. Soit la
position tient par d'autres indices (relief, côte) et c'est la durée du texte qui
s'adapte, soit elle recule. Liste : Mirathi `pol-0035`, Mont Cendra `lie-0019`,
Sarandel `lie-0045`, Ordavan `lie-0046`, Mont Jumeau `lie-0050`, Glacier central
`lie-0064`, Cendral `lie-0246`, Arbre-Mère `lie-0381`, Sulvane `lie-0636`, Route des
Cendres `lie-0639`, passe du Corail-Mort `lie-0991`, Sarth `lie-0992`, piste des Neuf
Cairns `lie-1011`, cercle de Kaeldrun `lie-1017`, Verthal `lie-1019`, Malderis
`lie-1022`, Veldar `lie-1027`, Vaelmar `lie-1031`, source d'Ourthalle `lie-1033`,
Corail-le-Haut `lie-1044` ; et Kethros `lie-0080` (B9). Pour le Mont Cendra, les
« quinze, dix-huit lieues du Mont » de T3/31 valent désormais 63 à 75 u : Cendara n'en
offre que ~65 du Mont à sa pointe nord.

**E. Les distances chiffrées des Docs** (recherche des km et des lieues, 2026-09-26) :

| Où | Le texte | La carte | Correction proposée | Statut |
|---|---|---|---|---|
| C/31 | « deux cents lieues de falaises noires » (Baelor) | côte nord de ~8 km | « deux lieues de falaises » | ouvert (chapitre) |
| fiche Ulinor - Continent | « ~1200 km nord-sud » ; faille « sur plus de 400 km » | ~41 × 71 km | ~70 km nord-sud ; faille sur toute la longueur de l'île | tranché |
| Chronologie, Ère IV | côtes méridionales de Cendara effondrées « sur trois cents lieues » (la Mer Cassée) | l'île fait ~100 km de long | « sur une dizaine de lieues » | tranché |
| Chronologie, Ère IV | le Mont inhabitable « dans un rayon de 50 km », moines « sur le flanc sud, à 30 km » | l'île fait ~42 km de large | toute l'île ; « sur le flanc sud, près de la côte » | tranché |
| Chronologie, Ère IV | Cendral → Sulvane « à 40 km au sud » | 46 u (44 km), mais Sulvane au nord-nord-est (T1 et carte) | la distance tient ; la direction est à corriger (« au nord ») | ouvert |
| Histoire d'Arkhen | le Mont « à plus de cent lieues » ; « cinq cents lieues de mer » | Arkhen ↔ Mont ≈ 78 u, 19 lieues ; le monde en compte 250 | « à une vingtaine de lieues » ; « une mer » | tranché |
| fiche Pyrevane | lueurs vues d'Aïkhar « à plus de soixante lieues » | Cendara et Arkhen tiennent en ~130 u, ~30 lieues | « à plus de vingt lieues » | tranché |
| fiche Cendara - Continent | « > 30 lieues de plateau continental » | plus long que l'île | « plusieurs lieues » | tranché |
| fiche Lunasar | « ~200 lieues de côtes basses » | 60 % du littoral d'Ilthara | à mesurer quand Lunasar aura sa surface | ouvert |
| fiche Nysaria | sites « à 5–20 lieues de Nysoris » | l'île de la carte fait ~16 × 10 km | « à une ou deux lieues » ; lié à la question de Nysaria continent ou île | ouvert |
| fiche Baelor | ~18 000 habitants | ~50 km², 360 hab./km² de lande | à revoir avec l'auteur | ouvert |
| T1/00, T1/45 | « trois cents lieues » d'Aethranor à Sulvane (l'arche, le porteur d'eau) | ~370 u, ~90 lieues | « cent lieues » | ouvert (roman) |
| T1/16, T1/18 | « trois mille lieues » (Gelinar, Vytharia ↔ Aethranor) | ~360 u, ~90 lieues ; déjà hyperbolique avant | « cent lieues », ou la figure « mille lieues » | ouvert (roman) |
| T1/46 | le Gouffre, « trois lieues de long », coupe Endora en deux | Endora fait ~210 × 185 km | écart antérieur à l'échelle | ouvert |
| T3/31 | « quinze », « dix-huit », « vingt lieues du Mont » | 63 à 84 u : au-delà de la pointe nord de Cendara pour les deux derniers | « douze à quinze lieues » ; « cent lieues et plus » jusqu'à Baelor tient (~93) | ouvert (roman) |
| Ère VII, C/21, C/22, T3/40 | « cinquante lieues à la ronde » autour du Mont | ~210 u : toute Cendara et le sud d'Ilthara (Arkhen, Mirathi, Vytharia, Lunaris) | le chiffre reste ; vérifier que personne n'est dit hors du rayon | ouvert |
| C/4, C/20, C/24, C/27, T1/06, T2/00, T2/19, T2/40, T3/15 | « mille lieues », « l'horizon est à cent lieues » | le monde fait 250 lieues | ce sont des figures : elles restent | tranché |

Tiennent à la nouvelle échelle : la bande côtière de Noravia (200 km) et ses boussoles
« à plus de 50 km des côtes » (Cestra ≈ 150 × 100 km), les distances locales de Mirathi,
Solmaris et Baelor (le lac, ~1,2 km). Plausibles, lieux non posés : les « trente
lieues » d'Ombreth (T2/20).

**Tranché ce jour** (journal du canon, « L'échelle du monde ») : l'échelle ; la règle
du calendrier ; les chiffres de taille qui dépassent la carte sont nuls, la carte fait
foi (Baelor écrit, Ulinor, Cendara, Arkhen, Pyrevane à écrire) ; « mille lieues » reste
une figure ; Baelor sans lac intérieur. Scripts : `scripts/verifier-trajets.js`,
`scripts/baelor-echelle.js`, `scripts/inscrire-lac-perche.js`.

---

## III. Ce qui ne sera jamais tranché

**Ce n'est pas un chantier. Rien de ce qui suit n'attend une décision.**

L'Atrium porte **33 entités de type `question`**, toutes `public` — il les montre,
comme il montre tout. **Treize portent `data.protege`** et le statut
`lecture-disputee` ; elles rassemblent les **36 lectures** (`readings`) du monde. Les
vingt autres sont `canon` et n'ont aucune lecture concurrente : la question suffit.

*(Elles étaient trente-quatre jusqu'au 2026-09-22 : `que-0032` « Qu'y a-t-il sous le
Glacier Central de Cestra ? » était un doublon franc de `que-0031` — même mystère,
même refus des Chamanes des Brumes, mêmes lectures théologiques concurrentes, aucune
des deux protégée. Fusionnée dans `que-0031` ; la formulation interrogative devient un
alias, la convention du lot étant nominale.)*

L'Atrium enregistre **que** la question se pose, ses lectures concurrentes et qui les
porte. **Jamais la réponse.** Là où le corpus s'en approche, la fiche dit le silence
explicitement : l'identité du huitième (`que-0034`), l'auteur de la note de la main
inconnue (`que-0004`), le troisième mot d'*Ourrène-davé* (`que-0033`, `que-0003`, versé
**comme manquant**), la lignée de Renna (`que-0010`, trois femmes nommées et pas une de
plus).

**Les treize protégées** — `que-0001` à `que-0013` :

> La cause de l'Arrachement · La causalité du geste de l'Étudiant · « Revenir ou
> commencer » · L'auteur de la Guerre de l'Ombre · La cause du Fléau et de « l'Heure » ·
> La cause des Souffles Cardinaux · Les termes exacts du Pacte Primordial · Le retrait
> de Navigor · Le sort d'Aldric Valthen · La filiation de « l'enfant qui entend » · Le
> Panghor, le dessous, la Profondeur Première · Le Mangeur de Temps · L'heure exacte du
> geste de l'An 0

**Les vingt autres** — `que-0014` à `que-0034`, moins `que-0032` :

> Ce qui dort derrière la Porte de métal scellée de Myrilith · Ce qui respirait sous
> Ulthral · La masse qui pulse sous Temeryl · Le vrai nom de Zarek · Le nom de la
> treizième tribu de Torkam · Le déplacement de l'étoile Veylar · La silhouette de
> l'horizon nord-est (Baelor) · L'identité de la figure sans masque au Cercle des
> Masques · La rumeur de trahison du Pacte des Sylves · Le courant froid sous la forêt
> d'Avalor · L'identité du voyageur de Hesran · L'Éveil sous Evertia · Le dragon blanc
> de Mercy · La lumière bleue de Taldorn · La pulsation du Mont Pyralis · Ce qui repose
> sous l'Acier Éternel · L'authenticité de la Pierre des Quarante · La Chose Sous le
> Glacier Central · La nature du Troisième Coup / de la voix qui naît · L'identité de
> l'oublié qui remonte

Deux endroits sont minces, et **restent tels quels** : le libellé des trois lignes que
la Dalle confirme au T3/46 — le texte referme aussitôt sur le sens, le référent reste
ouvert ; et l'asymétrie de lucidité sur la Guerre de l'Ombre entre les deux œuvres,
que la réplique du C/10 tient à elle seule. C'est assez.

---

## Renvois

- [[Canon — décisions et mystères protégés]] — ce qui fait foi ; ce qu'on ne touche pas.
- [[Glossaire des homonymies]] — les mots à plusieurs sens.
- [[Lexique du Lien à travers les Ères]] — la chaîne Vide → Tisse → non-Lié → « Délié ».
- `data/kg-base.json` — l'Atrium. `data/lore-notes.json` — les 380 notes brutes du
  balayage, gardées comme trace. `data/geo-conflits.json` — 0 conflit.
