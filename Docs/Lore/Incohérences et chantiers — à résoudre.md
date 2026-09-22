---
tags: [lore, méta, atrium, incohérences, chantiers, à-résoudre]
type: lore
status: living
date: 2026-07-17
last_review: 2026-09-22
needs_review_for: []
---

# Incohérences et chantiers — à résoudre

> [!abstract] À quoi sert cette page
> Elle répond à trois questions, et à trois seulement.
> **I. Ce qui est clos** — le chantier, la décision, l'endroit où elle vit maintenant.
> **II. Ce qui reste ouvert** — la seule partie qui demande encore du travail.
> **III. Ce qui ne sera jamais tranché** — les 33 `question`. Ce ne sont pas des
> incohérences : c'est le sujet des livres.

La source de vérité est **l'Atrium** — `data/kg-base.json`, au 2026-09-22 :
**2 948 entités, 1 473 faits, 3 662 relations, 231 alias, 36 lectures**
(divulgation : 2 862 `public`, 85 `restreint`, 1 `auteur`). Quand un chapitre ou
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
| **Chronologie et faits du tome 3** | 1-13 | Ilex chez Renna : **deux ans**. Renna : **~38 ans**, sans contradiction. Ysolde : **trente-cinq ans** (le canon des Chroniques l'emporte). Wenna **rejoint Sanne**. Sanne et Vaskar : **vingt ans** de métier. Les dépôts passent de **cinq à dix** entre les ch. 36 et 38, le geste écrit. Le répit **se raccourcit**. Vharok meurt **sept ans** plus tôt. Le Fragment #3 est dans l'**avant-dernier** cahier. *Astremer* → **Astravia**, « Aînée de la Franche » → **des Mains Vides**. | Dans le texte du T3 |
| **Noms, homonymes, genres** | 14-19 | **Corvane est un nom de famille courant de Galénor** : cinq porteurs, chacun avec son épithète. **Vahel → Solvec**, **Vharel → Dorvel** ; Vhail, Vael, Vharok, Nève restent. **Tovan → Karsel**. **La Consule Selvir**, féminin. **L'Arbre-Mère**, féminine (le lore d'Evertia corrigé, pas le chapitre). Les paires Orsenne, Vael, Forge-Basse, Kessa, Vessine, Corven sont **deux entités chacune**, reliées. | Texte + Atrium (`a-ne-pas-confondre-avec`) |
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

### 6. ~~322 entités sans résumé~~ — EN COURS, 275 écrits le 2026-09-22

314 lieux et 8 nations s'ouvraient sur du vide. Le constat de départ était faux
sur un point : **287 d'entre elles portaient déjà leur fiche de lore recopiée en
entier dans leur champ `body`** — le texte dormait dans l'Atrium sans jamais
s'afficher. Le travail était donc de compresser, pas d'écrire. 275 résumés sont
posés ; les 47 derniers (Ulinor, Alkaran) suivent.

Trois noms ont été rendus à leur orthographe au passage : **Myrthéria** et
**Obélia** (un `é` perdu à l'encodage, que les fiches `Drakora.md` et
`Ackerna.md` écrivent correctement), et **Le Lié draconique**.

**Reste ouvert et grave : 162 entités ont perdu TOUS leurs accents**, dont les
huit Ères — « l'Ocean Premier », « les Eternels », « les 45 Etheres », « Clivage
Lies/Delies ». C'est la colonne vertébrale chronologique du monde qui s'affiche
ainsi. Réparation en cours.

### 7. `LIEU_SCALES` est une ontologie fermée que la base viole

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

### 7 bis. Les rattachements de lieux sont faux en masse, et on en connaît la cause

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

*(Réparation en cours au 2026-09-22 ; chaque correction doit citer la phrase de
la fiche qui la prouve.)*

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
