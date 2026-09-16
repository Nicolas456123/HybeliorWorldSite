---
tags: [lore, méta, incohérences, chantiers, cohérence, graphe, à-résoudre]
type: lore
status: living
date: 2026-07-17
last_review: 2026-09-09
needs_review_for: []
---

# Incohérences et chantiers — à résoudre

> [!abstract] À quoi sert cette page
> Registre **vivant** des incohérences et des trous relevés en construisant le **graphe de connaissance** du site (la base de vérité unique, `data/kg-base.json`). Ces points **ne sont pas des mystères protégés** : ce sont des divergences accidentelles entre sources, des décomptes qui ne concordent pas, ou des rattachements manquants — des choses à **trancher** ou à **compléter** plus tard.
>
> Cette page **complète** deux pages de référence, sans les redoubler :
> - [[Canon — décisions et mystères protégés]] — ce qui **fait foi** et ce qu'il ne faut **jamais** harmoniser ;
> - [[Glossaire des homonymies]] — les mots à plusieurs sens, déjà glosés.
>
> Ici : uniquement le **reste à faire**. Chaque entrée porte un **statut** (`ouvert` / `en cours` / `arbitré`) et, quand c'est possible, une **résolution suggérée**.

---

## Avant tout — ce qu'on ne « corrige » PAS

Ces flous sont **délibérés** : les toucher serait l'erreur. Rappel, avec renvoi.

- **Le double (triple) calendrier lui-même** — an 251 du Sillage = ~10 200 ap.A ; « quinze siècles » (T2) et « dix mille ans » (T3) sont des usages *conformes* du temps profond. Voir [[Canon — décisions et mystères protégés]] §*Le double calendrier*. Ce qui suit (§1) n'est **pas** ce mystère : c'est le fait, purement **matériel**, que les fiches ne **taguent pas** quel calendrier chaque date emploie.
- **Les lectures de l'Arrachement, la cause du Fléau et de « l'Heure », l'auteur de la Guerre de l'Ombre, le sort d'Aldric Valthen, le Panghor/la Profondeur Première, le Mangeur de Temps** — mystères protégés (Canon, Partie 2). Le graphe les garde **au conditionnel** (entités `question`, lectures multiples) ; ne pas les résoudre.
- **Les homonymies voulues** (Délié, Vide, Souffle, Cardinal, Céleste, Heure, Ancrage, Mirathi/Mirathis, Panghor, les deux Portes de Fer, les deux Lunaris…) — voir [[Glossaire des homonymies]]. On glose, on ne fusionne pas.

---

## 1. Datation des dirigeants et des événements régionaux — trois calendriers non tagués

**Statut : largement résolu (2026-08-05).** Voir la *Résolution appliquée* en fin de section.

Les fiches `Docs/Lore/Histoires/` mêlent **trois systèmes de datation** sans jamais dire lequel s'applique à une date donnée :

1. **ap.A / av.A** — calendrier absolu (An 0 = l'Arrachement). Ex. « an 9 900 ap.A », « ~4 750 av.A ».
2. **du Sillage** — an 0–255 (≈ 9 949–10 204 ap.A ; décalage +9 949). Ex. « an 251 du Sillage ».
3. **« an X » local** — le décompte propre de Galenor et d'autres royaumes, en petits nombres (0–255) **indiscernables** du Sillage à l'œil nu.

**Conséquence dans le graphe.** Importer une date brute placerait un roi *actuel* ~10 000 ans trop tôt et déclencherait des faux « règne avant naissance ». Le pipeline applique donc un **garde-fou de datation** (`scripts/aggregate-lore.js`) : il ne garde une année de règne/événement que si elle est **clairement en temps profond absolu** (`|an| > 300`) ; sinon la date est mise à `null` et **préservée dans le libellé**.

- **76** dates de règne/événement mises à `null` (ambiguës) lors du dernier import.
- **52** règnes sur 52 sont aujourd'hui **non datés** sur la frise absolue (dates locales conservées dans le libellé, ex. « règne 244–252 du Sillage »).
- **47** événements régionaux sur 86 sont datés (temps profond) ; **39** restent non datés.

**Effet visible.** Impossible d'**ordonner** une liste de succession par polité tant que les règnes sont non datés → l'onglet *Dirigeants* montre les rois d'un royaume **sans ordre chronologique fiable**.

**Résolution suggérée.** Ajouter, à **chaque date** des fiches Histoires, un **tag de calendrier explicite** (`ap.A` / `Sillage` / `local:<royaume>`). Une passe de conversion (Sillage → ap.A via +9 949 ; local → ap.A via l'ancrage du royaume) donnerait alors des dates absolues sûres, et l'on pourrait relâcher le garde-fou `|an| > 300`. À faire fiche par fiche, ou dans l'Atelier.

### Résolution appliquée (2026-08-05) — `scripts/dater-faits.js`

Le tag de calendrier a été posé **dans le graphe** plutôt que fiche par fiche :
le script relit le libellé de chaque fait non daté, y reconnaît la date, la
convertit en année absolue et **inscrit le calendrier employé** dans
`fact.data.calendrier` — donc auditable et réversible.

**L'ancrage des décomptes régionaux a été prouvé, pas supposé.** Le canon pose
« an 251 du Sillage = ~10 200 ap.A » (décalage +9 949) ; et les fiches de
**dix** continents situent toutes le présent narratif en « l'an 251 »
(« vingt-neuf ans en cette an 251 » à Caeloria, « soixante ans en l'an 251 »,
Kessa de Velathor morte « en l'an 251 » à Trinoria). Les décomptes locaux
partagent donc l'époque du Sillage : un seul décalage vaut pour tous.

**Exception traitée :** « An 0 » qui désigne l'**Arrachement** lui-même
(Mont Cendra, cataclysme cosmique) reste à l'an 0 absolu — il ne s'agit pas
d'un décompte local. 12 faits concernés.

Résultat : **335 → 675 faits datés** (31 % → 62 %).

| | avant | après |
|---|---|---|
| règnes datés | **0** / 189 | **65** / 189 (dont 23 avec début *et* fin) |
| personnes avec au moins une date | 30 | **147** |
| événements datés | 59 | **101** |
| lieux datés | 5 | **42** |

Contrôle : **0** incohérence mort/naissance introduite ; aucune date hors des
bornes du monde (les 5 valeurs extrêmes sont les faits cosmologiques
préexistants, Origine du cosmos et Ère I).

### Passe 2 (2026-08-05) — situer TOUT ce qui peut l'être

Objectif de l'auteur : pouvoir **comparer** les événements. Une date
approximative vaut mieux que pas de date, à condition de dire ce qu'elle vaut.

Trois sources, du plus sûr au plus lâche, chacune tracée dans le graphe :

1. **Lecture du corpus** (`data/datation-corpus.json`) — douze agents ont lu
   les fiches continent par continent pour les 402 faits et 360 personnes que
   le graphe seul ne situait pas, puis des relecteurs sceptiques ont contrôlé
   les datations non certaines : **9 rejetées, 55 corrigées**. Chaque entrée
   garde sa **citation** et sa **fiche d'origine** — tout est révisable.
2. **Propagation relationnelle** (`scripts/inferer-dates.js`) — successions,
   filiations (27 ans par génération), conjoints, fondations, appartenances.
3. **Mise en ordre** — un enfant ne peut pas être actif avant son parent ; la
   date la moins assurée cède. 21 replacements.

| | avant la passe 1 | après la passe 2 |
|---|---|---|
| faits datés | 335 / 1097 (31 %) | **1092 / 1097 (100 %)** |
| — dont date ferme | 335 | 404 |
| — dont date approchée | 0 | 688 |
| personnes situées | 30 / 898 | **548 / 898** |
| nations situées | 86 / 123 | **109 / 123** |
| entités avec une période | 0 | **958** |

Chaque entité porte désormais `data.periode = { debut, fin, confiance,
methode, indice }`, affichée sur sa fiche (« daté par le corpus » /
« estimation » / « situé par recoupement »). La Fresque distingue le cercle
plein (attesté) du cercle creux (approché).

**Trois points d'honnêteté.**

- **Les années « du Sillage » négatives sont traitées comme absolues.** Le
  corpus écrit « ~-800 du Sillage » pour des schismes religieux qu'il situe
  *avant* l'Arrachement ; les lire en +9 949 les placerait dans l'ère
  actuelle. Les positives gardent le décalage. La projection est donc
  *hybride* — mais narrativement juste : les schismes anciens tombent dans
  l'Âge du Lien, les règnes actuels dans l'ère VII. C'est le paradoxe canon
  du double calendrier qui affleure ; il n'est pas résolu, seulement projeté.
- **688 dates sur 1092 sont des approximations.** Elles portent toutes leur
  méthode et leur niveau de confiance : ne pas les citer comme des dates
  fermes sans vérifier l'indice.
- **Une contradiction du lore est apparue** (dates attestées des deux côtés,
  donc rien à corriger automatiquement) : *Sœur Asra Krasv-Velmaris* (10 179)
  succède à *Sœur Velna Brum-Velmaris* (10 181) — la successeuse précède
  celle à qui elle succède. À arbitrer.

**Reste — 5 faits sans aucune date possible** (le règne « Lunarch » de Myrind,
le Schisme de la Septième, la révélation de Yelthari, une convention des
ermites-astronomes) : le corpus ne dit rien, même indirectement. À écrire.

### Passe 3 (2026-08-26) — le récit versé au graphe (les 38 Chroniques)

Les Chroniques de l'Exilé (5 actes, 910 jours) n'existaient dans le graphe
que par leurs personnages : **aucun événement narratif** n'y figurait. Les 38
chapitres ont été relus et 189 événements en ont été extraits dans
`data/evenements-recit.json` (fichier relisible/corrigeable à la main), puis
versés par `scripts/injecter-recit.js` (idempotent, clé `oeuvre:chapitre:titre`).

- **Ancrage temporel** (bible v2, §4.0bis) : départ fin an 248, retour jour
  910 au début de l'an 251 → `an(jour) = 248 + ⌊(305 + jour − 1)/365⌋`,
  toutes dates *circa/estimation*, calendrier tagué `sillage`.
- **Au-delà du voyage** : ~40 jalons hors-itinéraire datés par le texte
  (disparition d'Aldric, éveil de Velathor, réouverture du chenal du nord an
  247, expédition altram an 243, anomalies magnétiques de Cestra an ~220,
  plongée du père de Selendris an ~220, Édit de Celestia an −450…).
- **14 personnages secondaires créés** (Ossian, Wenna Corth, Hesken, Torhal,
  Vessane, Halen…) — déclarés dans le fichier d'événements, jamais créés
  d'office depuis un nom non résolu.
- Le graphe passe à **2 748 entités, 1 286 faits (1 285 datés), 3 269
  relations** ; 766/912 personnes situées.

**Contradiction du lore mise au jour — la chronologie de Noravia.**
`Histoires/Cestra/Noravia.md` (registres du Conseil novien) date le départ
d'Aldric de **l'an 220** et le passage de Sorin de **l'an 231** (« 12-19 du
IIIe mois 231 », reparti « sans avoir tenté d'aller au glacier »). Les
Chroniques v2 posent Sorin à Noravia vers **l'an 250** (jours 825-847), *qui
monte au surplomb du Jumeau*, et un Aldric parti « il y a vingt ans »
(~230) — mais Solvanes, à Lunasar, parle de « trente pleines saisons »
(~220 ?). Deux faits attestés cohabitent donc sur la fiche de Sorin
(fac-0645 : passage en 231 ; faits du récit : passage en 250). **À arbitrer
par l'auteur** : soit Noravia.md précède la bible v2 et doit être rebasée
(220→~230 pour Aldric, 231→250 pour Sorin, et Sorin monte bel et bien au
glacier), soit le registre novien est volontairement faux dans la fiction.

---

## 2. Nombre de continents — 13 dans le graphe, « douze » au canon

**Statut : arbitré** — 11 continents (2026-07-18 : Baelor et Nysaria sont des îles) ; la prose garde « douze » comme usage vernaculaire du monde (2026-09-14). Texte d'origine conservé ci-dessous.

Le [[Canon — décisions et mystères protégés]] pose **« Douze continents partout »** (« treize », voire « quatorze », explicitement corrigé). Or le graphe contient **13** entités `lieu` d'échelle *continent* :

> Alkaran · Azoria · Baelor · Celethor · Cendara · Cestra · Endora · Evertia · Galenor · Ilthara · Nysaria · Onara · Ulinor

Un de ces treize est de trop **par rapport au canon**, ou bien l'un d'eux est en réalité une **nation/région** promue à tort au rang de continent (candidats plausibles : *Baelor*, *Celethor*, *Nysaria*). 

**Résolution suggérée.** Trancher lesquels sont les douze continents canoniques ; rétrograder l'intrus en `entite-politique` ou `lieu`/région. À décider par l'auteur.

---

## 3. Décompte des polités — 59 dans le graphe, 47 nations au canon

**Statut : résolu (2026-09-14, par délégation).** `data.genre` est posé sur les 124 polités : **44 `nation` + 3 `non-etat` = 47**, le compte du canon (les 44 sont les fiches `Pays/` moins les fiches de continent, les trois No Man's Land, les deux provinces de Vytharia et l'île de Nysaria ; Baelor-Prime compte) ; 2 `province` (Lunasar, Mirathi), 50 `civilisation` (polités historiques), 22 `institution`, 3 `faction`. L'ancienne valeur descriptive (confédération, théocratie…) est conservée dans `data.forme`. La Ligue des Marchands existait en double (`pol-0098`, `pol-0124`) : fusionnée. Texte d'origine :

Le graphe compte **59** `entite-politique` ; le canon fixe **47 nations (dont 3 « No Man's Land »)** (décision L1). L'écart s'explique en partie parce que le graphe range dans le même type les **nations actuelles** *et* les **civilisations historiques** (17 civ + 42 nations), qui ne sont pas comptées ensemble par le canon — mais l'alignement n'a pas été vérifié.

**Résolution suggérée.** Distinguer dans le graphe `nation` (actuelle) et `civilisation` (historique) via un champ `data.genre`, puis vérifier que le compte des `nation` retombe sur **47**.

---

## 4. Noms hérités non corrigés — Caeloria / Torkam encore présents comme polités

**Statut : résolu (2026-09-14).** Caeloria (théocratie astrale d'Azoria, siège du Cardinal-Élu) et Torkam (nation nomade d'Alkaran) sont des nations légitimes, chacune avec sa fiche `Pays/` ; le canon « Caeloria → Azoria ; Torkam → Alkaran » corrigeait la colonne continent de la table de chronologie, pas l'existence des nations. Le champ dérivé `data.continent` de Caeloria, Torkam et Tyndara est réaligné sur leur `situe-dans` (trace `data.arbitrages`). Texte d'origine :

Le canon acte : **« Table Chronologie corrigée : Caeloria → Azoria ; Torkam → Alkaran »**. Or le graphe contient encore des `entite-politique` nommées **Caeloria** et **Torkam** (Torkam porte même **3** faits de règne). Deux cas de figure à démêler :

- soit ce sont des **résidus** de l'ancien étiquetage (à renommer Azoria / Alkaran) ;
- soit **Caeloria** (nation actuelle, siège du Cardinal-Élu) et un éventuel royaume **Torkam** sont des entités **légitimes distinctes** des continents Azoria/Alkaran, et la coïncidence est bénigne.

**Résolution suggérée.** Vérifier dans les fiches Histoires si « Torkam » y désigne le continent (→ Alkaran) ou une nation propre ; idem pour Caeloria. Renommer ou conserver en conséquence.

---

## 5. Dirigeants non rattachés à leur royaume — 8 règnes orphelins

**Statut : résolu (11.c, 2026-09-09) — 0 règne orphelin ; une tribu typée lignée peut être gouvernée (assumé).**

44 des 52 règnes sont reliés à leur polité (`object_id`) ; **8** ne le sont pas, faute d'une entité-polité au nom correspondant :

> Valtheria la Forgée · Hadran le Sage · Veldris l'Ancien · Valren de Nalithos · Orlan IV de Nalithos · Mirathi Voix-d'Ambre · Myrind · Krenneth-le-Jeune

Leur royaume est nommé dans le **libellé** (ex. « Thane d'Astraneth (Valoria) », « de Nalithos ») mais ce royaume n'existe pas comme entité, ou sous un autre nom.

**Résolution suggérée.** Créer les polités manquantes (Nalithos, Astraneth/Valoria…) ou corriger le nom cible, puis rattacher les 8 règnes.

---

## 6. Géographie — rattachement `situe-dans` en grande partie comblé

**Statut : largement résolu par le balayage (reste un tail).**

Les lieux importés de la sauvegarde carte n'avaient **aucune** relation `situe-dans`. Le **balayage des fiches Pays** (un agent par continent) a rattaché la géographie via les fiches elles-mêmes (chaque nation → son continent, chaque cité/village → sa nation) : **326 lieux existants** ont été reliés à leur nation/continent (`geo.reused` = 326) et l'ensemble porte désormais **~1000 relations `situe-dans`**.

**Résolu (2026-09-14, par délégation) :** les surfaces nationales extraites de la carte de l'auteur (`data/monde-contours.json`) ont servi de polygones : **162** lieux rattachés par point-dans-surface, **125** par masse continentale (nations sans surface), **5** recalés sur le marqueur de pays nettement plus proche (surface de Ryldor débordant sur le No Man's Land Celethor), **22** lieux hors de toute masse tracée rattachés au marqueur le plus proche ou par le récit (Holvendar → Pyrtara, ch. 17), **22** lieux sans coordonnées rattachés d'après leur résumé (dont les six cités volantes de l'Âge d'Or à leur empire, `end_year` 0). Chaque relation porte `data.methode`. Restent : l'île de Baelor (racine, comme un continent) et Kytheris (non rattachable, acté dans `data.rattachement`). Quelques conflits de rattachement sont aussi remontés en note (ex. *Iskara* rattachée à *Endora* dans la base Access d'origine mais à *Alkaran* dans les fiches — cf. §9).

---

## 7. Doublons d'entités entre fiches — noms non canonisés

**Statut : géré** — alias posés au fil de l'eau (`save-alias`, 202 → 217 le 2026-09-14) ; 0 homonymie non balisée depuis 11.c. Texte d'origine :

Un même événement/personnage peut être nommé **différemment** d'une fiche à l'autre. Cas rencontrés et traités automatiquement au dernier import :

- **« L'Arrachement »** apparaissait comme entité dans deux lots (chronologie + dirigeants) → dédoublonné au profit de la version **datée** de la chronologie.
- Trois événements « orphelins » (fait sans entité au nom exact — *dernier voyage d'Etheira*, *Codification du Sang*, *Réduction du Cri du Cairn*) → rattachés ou recréés, pour ne rien perdre.

**Risque résiduel.** D'autres quasi-doublons peuvent subsister (variantes d'orthographe, titre long vs court). 

**Résolution suggérée.** Tenir un **registre de noms canoniques + alias** (le graphe gère déjà les alias : `save-alias`) et y verser les variantes au fil de l'eau.

---

## 8. Rappels mineurs (déjà cadrés ailleurs)

- **Graphie `Era` / `Ère` / `Ere`** — écrire **« Ère »** dans les textes ; « Era N » toléré comme **cote de fichier** seulement. Voir [[Glossaire des homonymies]] §*Graphie*.
- **Apostrophes droites `'` vs courbes `’`** — **déjà géré** par le pipeline (normalisation `’‘ → '` à la résolution des noms) ; ne cause plus d'échec de rattachement. Ne pas « corriger » à la main dans les sources, c'est inutile.
- **Collision de préfixes d'ID `rel-`** (religion vs relation) — **déjà géré** (les relations utilisent le préfixe `lnk-`).

---

## 9. Constats du balayage exhaustif du corpus (380 notes d'agents)

**Statut : trié et clos (2026-09-14).** Les 380 notes sont couvertes par les passes ultérieures (datation : §1 passes 1-3 ; rattachement : §6 ; continents : §2 ; homonymies : 11.c et glossaire ; mystères : hors périmètre, à ne pas résoudre). Sort de l'échantillon ci-dessous : Taciti (arbitré 2026-07-18) ; graphies du No Man's Land canonisées par alias (« No Man's Land d'Azoria », « No-Man's-Land azorien », « NML Azoria », idem Celethor/Cestra) ; « Grande Chamane Nareth » et « Nymera » posés en alias ; Kaeloria ↔ Caeloria et Thalorin (lieu) ↔ Thalorin (prince) balisés `a-ne-pas-confondre-avec`, Karendis (village) fusionné avec son doublon ; Iskara → Alkaran et Myrtam → Onara (11.c) ; les deux « Défense de la Porte de Fer » sont deux événements distincts (Protectorat des Passes ~8 790 ; Iskara an 35-38 du Sillage) — homonymie commémorative actée au Canon, tracée sur `fac-0357`/`fac-0451` ; Ferros, Cantor, Realis, Umbralis, Anima, Mentor, Ancestralis, les Éveilleurs de Givre et la Mère des Glaces passent en `lecture-disputee` (croyances propres à un culte), Arborius reste canon (D-COSMO-4) ; les deux notes de succession : la Brèche du Néant de Mirathi (9 300-9 500, lecture contestée) précède de peu la fondation du Sanctuaire (~9 400) — articulation notée sur `evt-0049` ; Yelthari la Muette est la seule fondatrice ancienne des Premiers Échos (période recalée sur la fondation de Jentaris, `fac-0904` daté), l'apprentie Tirenne assiste l'Écho-Guide actuelle, Mirathi Voix-d'Ambre. Texte d'origine : en balayant tout le corpus (Pays, Religions, Chronologie, GDD/Monde, Chroniques, Romans, puis Histoires continent par continent), les ~30 agents d'extraction ont remonté **380 notes d'incohérence**, versées telles quelles dans **`data/lore-notes.json`** (source, texte). Répartition approximative :

| Thème | ~n | Nature |
|---|---|---|
| **Homonymies / variantes de noms** | 116 | un même nom pour deux référents, ou un référent orthographié différemment selon les fiches |
| **Datation (trois calendriers)** | 84 | confirme le §1 — dates locales/du Sillage vs ap.A absolu, mêlées sans tag |
| **Rattachement géographique** | 69 | complète le §6 — nation/région d'un lieu ambiguë ou contradictoire |
| **Mystères laissés ouverts** | 45 | **normal** — les agents ont *correctement* refusé de trancher (Profondeur Première, sort d'Aldric Valthen…) ; à ne pas « résoudre » |
| **Continents (12 vs 13)** | 41 | recoupe le §2 |
| **Successions** | 6 | trous/chevauchements dans des listes de règnes |

Cas concrets à traiter en priorité (échantillon) :

- **Doublon de religion** : le graphe porte **« Taciti »** ET **« Les Silencieux (Taciti) »** comme deux religions distinctes — à fusionner.
- **Nom écrit de trois façons** : *« No Man's Land Azoria » / « No Man's Land d'Azoria » / « No-Man's-Land azorien »* — à canoniser (+ alias).
- **Variantes de dirigeants** : *« Nareth la Sage » = « Grande Chamane Nareth »*, *« Nymera » / « Nyméra »*, *« Yrelda la Forgée » = « Yrelda… »* — candidats alias.
- **Homonymies proches** à surveiller : *Kaeloria* (ville d'Iskara) vs *Caeloria* (nation) ; *Thalorin* (ville **et** prince héritier de Haldria) ; *Karendis*, *Pyrevane*, *Thyros* (chacun désigne à la fois un lieu et une personne/titre).
- **Rattachement contradictoire** : *Iskara* rattachée à *Endora* dans la base Access d'origine, à *Alkaran* dans les fiches (idem *Myrtam/Skaldoria*).
- **Double « Défense de la Porte de Fer »** : deux datations concurrentes (~8790 ap.A vs autre) — à réconcilier.
- **Statut de divinité sectaire** : *Ferros* (« Forgeron Légendaire, rang Céleste ») est une **croyance des Filii Fornacis**, pas le panthéon canonique — à marquer `lecture-disputee` plutôt que fait (idem plusieurs Célestes/divinités locales ajoutés par les fiches religieuses).

**Résolution suggérée.** Trier `data/lore-notes.json` en trois piles : (a) **alias** à créer (variantes de noms) ; (b) **fusions** d'entités (vrais doublons) ; (c) **arbitrages d'auteur** (continents, calendriers, statut des divinités locales). Les mystères (thème « ouverts ») restent **hors périmètre** — on n'y touche pas.

---

## 10. Positions vs rattachements — les conflits carte/fiches (cas Folgrad)

**Statut : RÉSOLU (2026-09-10) — 0 conflit restant sur 226 villes.** Le
dernier lot (la famille « No Man's Land ») est tombé d'un coup : sur la
carte d'origine, les étiquettes des marqueurs **NML Azoria** et **NML
Cestra** étaient **permutées** — le marqueur « Azoria » posé en lisière
sud du continent Cestra (−473, −398), le marqueur « Cestra » au cœur du
continent Azoria (231, 384 — position retrouvée par triangulation sur les
distances de `geo-conflits.json`, erreur < 1 unité), au milieu des treize
villes que les fiches rattachent au NML d'Azoria. Arbitrage (délégué,
2026-09-10) : **échange des deux marqueurs**, appliqué par
`scripts/arbitrer-nml.js` (tracé `data.arbitrage`, anciennes valeurs
conservées) ; aucun re-rattachement nécessaire — les lieux des deux NML
étaient déjà du bon côté du monde. `geo-conflits.json` régénéré : **0
conflit**. Le texte d'origine suit, comme trace.

**Nouveau cas découvert le 2026-09-11 (par les cartes d'ère) — Haldria.**
Le marqueur de Haldria (−271, 172) — et donc sa surface extraite — vit en
plein **Ilthara**, quand ses fiches (`Pays/Endora/Haldria.md`) la disent
d'**Endora**. Invisible aux contrôles : Haldria n'a aucune ville
positionnée pour trancher. Arbitrage d'auteur : déplacer le bloc carte
vers Endora (marqueur + re-extraction de surface), OU acter que la carte
a raison (et corriger fiches + rattachement). En attendant, la surface
« Haldria » (et le Protectorat d'Haldros / le Saint-Empire d'Endara des
cartes d'ère qui en héritent) s'affiche à l'ouest.

**Tranché (2026-09-14, par délégation) : la fiche a raison.** Haldria est d'Endora (fiche `Pays/Endora/Haldria.md`, bible §4.0bis, Chroniques ch. 13) ; le marqueur d'origine, posé au sud-ouest d'Ilthara, n'était soutenu par aucune ville positionnée. La surface extraite depuis ce marqueur est la lobe sud d'Ilthara : elle est **réattribuée à Warenthor** (jungle du sud d'Ilthara, seule nation méridionale sans surface, dont l'extraction depuis son propre marqueur avait échoué). Haldria reste **sans marqueur**, comme treize autres nations : la carte de l'auteur ne la dessine pas sur Endora ; un marqueur synthétique au centre libre d'Endora a été essayé puis retiré, parce qu'il faussait les contrôles de proximité (`data.carte` sur `pol-0017` garde l'ancien marqueur et le motif). Cartes d'ère régénérées (le Protectorat d'Haldros et le Saint-Empire d'Endara n'héritent plus de la lobe d'Ilthara ; les précurseurs de Warenthor en héritent). La carte de l'accueil (Turso, dessin d'origine de l'auteur) n'est pas modifiée : elle reste le brut.

**Constat connexe (2026-09-14), assumé :** la masse continentale que le tracé nomme « Endora » porte aussi les villes positionnées d'Iskara (Alkaran, 20 villes), de Thalmaris (Evertia, 5 villes) et la surface de Skaldoria (Ulinor) ; Myrtam (Onara) est dessinée sur l'île d'Alkaran. Ce sont des grappes entières de villes, donc le dessin de l'auteur, pas des étiquettes égarées : **le rattachement politique suit les fiches (graphe) et la position suit la carte** ; une masse continentale n'est pas un continent politique. Rien n'est déplacé.

La carte vivante a rendu visible une contradiction entre **deux sources de l'auteur** : la position des points sur la carte d'origine (sauvegarde du 3 mai) et le rattachement des fiches. Cas découvert : **Folgrad**, capitale de **Mosrack** (Onara) selon les fiches, mais posée sur la carte **à 21 unités du marqueur d'Ulinor** (et à 381 du marqueur de Mosrack).

Vérification systématique (242 villes rattachées et positionnées, comparées aux **marqueurs de pays de la carte d'origine**) : **93,4 % cohérentes**, 16 conflits, trois causes distinctes :

| Cause | Cas | Correction |
|---|---|---|
| Confusion « No Man's Land » (trois graphies) par les agents d'extraction | 13 villes rattachées au NML d'**Azoria** mais posées près de ceux de **Cestra**/Caeloria/Baelor | à re-rattacher quand les entités NML par continent existeront |
| Conflit **carte vs fiche** dans les sources | **Folgrad** (Mosrack/Onara vs zone Ulinor), **Windora** (Thalmaris vs Astravia) | **arbitrage d'auteur** : déplacer le point sur la carte OU corriger la fiche |
| Homonymes en double dans la sauvegarde carte (12 noms : 2×Kryndor, 2×Ackerna…) — la restauration de coordonnées prenait la première entrée | **Kryndor** (Ventera) avait reçu les coordonnées du Kryndor d'Elarian | **corrigé** : résolution par proximité au marqueur du pays (`fix-geo-conflits.js`) |

Corrections déjà appliquées : **42 ancres** pays/continents importées des marqueurs officiels de la carte (les sphères et libellés de la carte vivante s'alignent sur la vraie géographie) ; l'étape 10 du parcours de Sorin (Folgrad) est **ré-ancrée sur le marqueur de Mosrack** (vérité des fiches) en attendant l'arbitrage.

---

## 11. Passe d'analyse systématique du graphe (2026-09-09)

**Statut : matière neuve, triée en quatre familles.** Relecture programmatique
complète de `data/kg-base.json` (2 748 entités, 1 286 faits, 3 269 relations) :
intégrité référentielle, chronologie, généalogie, successions, doublons,
géographie. Bonne nouvelle d'abord : **0 rupture d'intégrité** (aucun fait ni
relation ne pointe vers une entité fantôme, aucun cycle `situe-dans`, aucune
mort avant naissance sur dates fermes, aucune paire alliés-et-en-guerre).
Tout ce qui suit est daté, sourcé par identifiant de fait, et corrigeable.

### 11.a Erreurs mécaniques de datation — corrigées (2026-09-09)

**Statut : résolu.** Voir la *Résolution appliquée* en fin de section ; le
tableau ci-dessous est conservé comme trace de ce qui était faux.

Le libellé de chaque fait dit une chose, l'année absolue inscrite en dit une
autre. Neuf cas sûrs, décelés en recomparant l'année du graphe à l'année
Sillage écrite dans le libellé (154 faits vérifiables, 9 divergents) :

| Fait | Sujet | Année inscrite | Ce que dit le libellé | Année attendue |
|---|---|---|---|---|
| `fac-0931` | L'Invasion Avortée | 10 201 | « trois siècles **avant** l'an 252 » | ~9 900 (cohérent avec `fac-0195`/`fac-0542`) |
| `fac-0598` | La Schismature des Forges | 10 179 | l'événement court Sillage 121–137 | 10 070–10 086 (cf. `fac-0942`/`fac-0962`) |
| `fac-0646` | Expédition Valkren | 9 963 | « départ consigné **14 du IIe mois 188** » — le jour du mois a été lu comme année Sillage | 10 137 (cf. `fac-0974`/`fac-0987`) |
| `fac-0205` | L'Édit de Celestia | **−700** | « ~7 siècles avant le Sillage » lu comme année absolue négative — place l'Édit avant l'Arrachement | ~9 250 |
| `fac-0276` | mort de Lethanis Vor-Ostrun | 10 121→10 138 | c'est sa période de charge (+172–+189) ; elle meurt « en +193 » | 10 142 (cf. `fac-0191`/`fac-0550`) |
| `fac-0280` | mort de Mara Telventh | 10 101 | 10 101 = +152, le **début** de sa charge ; elle meurt « en +178 » | 10 127 |
| `fac-0288` | mort de Veska Drennar | 10 083 | 10 083 = +134, sa **canonisation** ; elle meurt « en Sillage 109 » | 10 058 (cf. `fac-0438`) |
| `fac-0565` | mort d'Ingrid Frelvar | 10 146 | 10 146 = sa **naissance** (an 197) ; elle « meurt en l'an 263 » | 10 212 |
| `fac-0693` | règne d'Elyndra III | début 10 199 | 10 199 = son **abdication** (« en 250 ») ; « environ trois décennies de règne » | ~10 169→10 199 (cf. `fac-0233`, cohérent) |

S'y ajoute `fac-0953` (déclin des Phénix de Feu) daté 9 952 (≈ Sillage 3)
alors que tout le libellé vit vers l'an 220–251 du Sillage (registre depuis
Sillage 70, dernier passage an 240) — origine de la valeur inexpliquée.

**Résolution appliquée (2026-09-09) — `scripts/corriger-faits-11a.js`.**
Les dix faits portent désormais l'année que leur propre libellé énonce ;
chaque ancienne valeur est conservée dans `data.correction` (auditable,
réversible), et le script est idempotent (valeurs attendues vérifiées avant
écriture). Les périodes dérivées de sept entités ont été recalées avec la
règle exacte du pipeline (min/max des faits datés) : l'Invasion Avortée
(9 900), la Schismature (10 070–10 086), l'Expédition Valkren (10 137),
l'Édit de Celestia (9 250–9 500 — la fourchette du §11.b-2 reste à
arbitrer), Veska Drennar (fin 10 058), Ingrid Frelvar (10 146–10 212 ; sa
naissance ne vit que dans le libellé de `fac-0565`, conservée en début de
période), les Phénix de Feu (déclin dès ~10 170). L'audit libellé-vs-année
re-passé ne laisse que des faux positifs de lecture (années « 9 605 ap.A »
attrapées comme « Sillage 9 », années de contexte) et les contradictions
attestées du §11.b (Tessar, Kyra), qui relèvent de l'arbitrage, pas de la
correction.

### 11.b Contradictions du lore — arbitrées (2026-09-09, par délégation)

**Statut : résolu.** L'auteur a délégué l'arbitrage (« tranche au plus
logique ») ; les douze verdicts, motivés, sont enregistrés dans l'interface
d'arbitrage et appliqués au graphe par **`scripts/arbitrer-11b.js`**
(idempotent, gardé par les valeurs attendues, provenance `data.correction` /
`data.arbitrage` sur chaque fait touché). Verdicts :

1. **Tessar Veynd** — né en **Sillage 88** (le récit précis — lieu, famille,
   âge à la mort — l'emporte sur « vers 75 », dérivé d'un âge estimé au
   sermon) ; mort en **137**, la fuite de l'apprenti « en 138 » suit une
   mort de fin d'année.
2. **Édit de Celestia** — promulgué par le **Premier Conclave, an −450 du
   Sillage (9 499 ap.A)** : deux sources indépendantes convergent (fiche
   religieuse ~9 500, récit an −450). `fac-0299`/`0399`/`0205` recalés ;
   `fac-1234` (la promulgation, typée fondation *de Caeloria*) retypé
   événement.
3. **Kyra** — c'étaient **trois** personnes : la fille d'Aldren Voss
   (Glintaris, † à 11 ans, garde `per-0200`, renommée « Kyra (de
   Glintaris) »), la forgeronne d'Ardentris fille de Velya (`per-0913`),
   l'épouse d'Aldren de Thalor (`per-0914`). Faits, liens familiaux et
   conjugaux répartis ; alias « Kyra » posés en désambiguïsation ;
   `a-ne-pas-confondre-avec` en triangle.
4. **Civilisations antiques** — **les fiches font foi** : les 16 faits-seed
   sans libellé (table du premier import) supprimés ; les huit périodes
   recalées sur les dates des fiches (Alkarath −16 000→−11 500, Endara
   −9 000→−5 000, Ithalorn −7 000→−3 500…).
5. **Kethvar** — deux temps : le **peuplement** (Loi de Pierre, ~−2 000,
   `fac-0505` retypé événement) et la **fondation nationale** (~9 700).
6. **Pyrevane** — **trait canon conservé** (« existe sans avoir été
   instituée ») : l'émergence de ~−14 500 devient un événement, la
   fondation politique reste ~9 800 ; le paradoxe vit dans les libellés.
7. **Mirathi** — fondée par le **Sanctuaire (~9 400)** ; l'érection en
   province de Vytharia (~9 800) devient un événement.
8. **Elarath 9 996, Solmaris 9 961** — le récit fondateur propre fait foi
   (« l'an 47 » de la fragmentation de Morveth ; la Première Veillée) ;
   les estimations de succession (~9 800) recalées.
9. **Skaldoria** — fondée ~9 400 ; l'accord du Ralthyn (9 560) est une
   **réorganisation confédérale** (retypé événement).
10. **Ligue des Marchands** — institution propre (`pol-0124`, dans
    Tyndara) : `fac-1028` déplacé, Selyra la fonde, Fablioris en capitale.
11. **Velmaris** — il y a **deux Velmaris** : la ville du soufre reste à
    Solmaris ; le **village de pêcheurs de perles du Lagosaim (Seraphia)**,
    découvert dans la fiche Seraphia, devient `lie-0969` et reprend le lien
    vers Seraphia. La ville-étalon du calage carte est donc bien à Solmaris.
12. **Règnes multiséculaires** — **fenêtres d'incertitude**, pas des durées
    (aucun n'est canonisé « longévité inexpliquée », contrairement à
    Verithan) : les huit faits marqués `data.fourchette = true`. Affichage
    fait le 2026-09-10 (cercle creux à mi-fenêtre, « entre X et Y »).

**Observation de bordure (hors arbitrage).** Les ~40 paires de fondations
restantes suivent le motif *précurseur* voulu (« Province sud de Tharnok »,
« Berceau de l'Eau »…) : des faits d'histoire profonde du territoire, typés
`fondation` par l'import d'origine. Même remède que 5/7/9 si l'auteur le
souhaite — les retyper `evenement` en masse — mais c'est une décision de
**modèle**, pas de lore. **Tranché (2026-09-14) : conservés tels quels** — le
générateur des cartes d'ère (`scripts/generer-cartes-eres.js`) s'appuie sur
ces faits-précurseurs pour dater les états sans fondation ; les retyper
viderait les cartes historiques.

Le texte d'origine des douze points est conservé ci-dessous comme trace.

1. **Tessar Veynd, deux naissances.** « Né vers 75 » (quarante-six ans au
   sermon de 121 — `fac-0187`/`fac-0596`) vs « né en Sillage 88 » (mort à
   49 ans en 137 — `fac-0273`/`fac-0274`). Les deux traditions sont
   *internement* cohérentes (75+46=121 ; 88+49=137) et incompatibles entre
   elles. Mort en 137 vs 138 (`fac-0943` : l'apprenti fuit « immédiatement
   après la mort » en 138) — divergence mineure liée.
2. **L'Édit de Celestia, trois datations.** ~9 350 ap.A (`fac-0299`/`fac-0399`),
   ~9 500 « par le Premier Conclave » (`fac-0516`), « sept siècles avant le
   Sillage » ≈ 9 250 (`fac-0205`) — et le récit (passe 3) le situe « an −450 »
   ≈ 9 499. Deux époques candidates : ~9 250–9 350 ou ~9 500.
3. **Kyra (`per-0200`) est deux personnes fusionnées.** Fille d'Aldren Voss,
   morte à **11 ans** d'une fièvre inexpliquée au temple d'Ignis Aeternum de
   Glintaris (`fac-0437`, 10 165) — et forgeronne à Ardentris, fille de la
   prêtresse Velya, morte à **19 ans** de la Maladie des Poumons (`fac-0880`).
   Parents, lieux, âges et causes incompatibles : à **scinder** en deux
   entités homonymes.
4. **Civilisations antiques : la table-seed contredit les fiches.** Chaque
   grande civilisation porte une fondation/chute **sans libellé** (seed du
   premier import chronologique) *et* une fondation/chute **libellée**
   (fiches Histoires), qui divergent :
   | Civilisation | Fondation seed / fiches | Chute seed / fiches |
   |---|---|---|
   | Confédération d'Alkarath | −15 000 / −16 000 | **−2 000 / −11 500** |
   | Khalifat de Solvenar | −12 000 / −11 000 | **−4 000 / −7 500** |
   | Saint-Empire d'Endara | −10 000 / −9 000 | **0 / −5 000** (+ fait de chute en double) |
   | Royaume des Songes d'Ithalorn | **−10 000 / −7 000** | −2 000 / −3 500 |
   | Ligue Marchande d'Everthor | −5 000 / −5 000 | 0 / −1 500 |
   | Tharnok | 100 / 600 | 3 000 / 3 200 |
   | Forgon | 150 / 400 | 3 500 / 4 000 |
   | Drahk'Nor | 200 / 800 | 4 800 / 4 800 |
   La Fresque affiche les **deux** jeux. Trancher lequel fait foi (les faits
   libellés sont traçables aux fiches ; les seeds venaient de la table
   chronologique), puis supprimer l'autre.
5. **Kethvar, deux fondations à 11 700 ans d'écart.** ~9 700 ap.A
   (successeur de la Thalassocratie Azor-Kerev) vs ~−2 000 (« forgerons
   issus d'une migration des plateaux d'Alkaran… durant l'Âge du Lien »).
6. **Pyrevane** : fondation ~9 800 (successeur de la Ligue des Villes
   Libres) vs émergence ~−14 500 (fragmentation du Dominat de Pyrevaste) —
   possiblement voulu (« existe sans avoir été instituée ») ; à confirmer et
   à glossairer si c'est le cas.
7. **Mirathi** : « province de Vytharia ~9 800 » vs « Sanctuaire de Mirathi
   fondé ~9 400 par des rêveurs vythariens dissidents ».
8. **Elarath** : fondation ~9 800 vs fragmentation de Morveth « an 47 »
   (= 9 996). **Solmaris** : ~9 800 vs 9 961 (Première Veillée). Même motif :
   la date « succession de la civilisation mère » et la date « récit fondateur
   propre » cohabitent sans hiérarchie.
9. **Skaldoria** : fondation ~9 400 vs confédération clanique de 9 560
   (accord du Ralthyn, après la Bataille du Fjord Gelé) — peut-être deux
   événements légitimes (nation puis confédération) ; à dire explicitement.
10. **Tyndara** porte la fondation de la **Ligue des Marchands** (Selyra la
    Calculatrice, Fablioris, datée 9 977) comme un fait de fondation de
    Tyndara elle-même (fondée ~8 400) — rattachement à vérifier.
11. **Velmaris dans deux nations.** La ville-étalon du calage carte est
    `situe-dans` **Solmaris** (`lnk-2065`, conforme au résumé « port ouest de
    Solmaris ») *et* **Seraphia** (`lnk-2586`). Soit un rattachement erroné,
    soit deux Velmaris homonymes (le couvent des sœurs Brum-Velmaris /
    Krasv-Velmaris, « Velmaris-Haut » ?) — à trancher, avec incidence sur la
    carte.
12. **Durées de règne extrêmes non distinguées des fourchettes.** Haldros le
    Navigateur 8 200→9 300 (1 100 ans), Faelorn et Amaryl 700 ans, Warenthos
    600, Ashgrim le Calciné 400 (« règne non daté » !), Theldryn III 300,
    Vytha 200. Certaines sont des **fenêtres d'incertitude** encodées dans
    début/fin, d'autres peut-être des longévités voulues (Verithan, ~600 ans,
    est lui **explicitement** canonisé « longévité inexpliquée »). Le modèle
    ne permet pas de les distinguer → marquer les fourchettes (`data`) ou
    élaguer.

### 11.c Structure du graphe — réparé (2026-09-09)

**Statut : résolu**, par **`scripts/reparer-11c.js`** (idempotent, tout
tracé en `data.reparation`, libellés des faits fusionnés conservés dans
`data.fusion`). Sauvegarde avant/après dans l'historique git. Bilan :

- **Fusions** : la nation Dhalvoria récupère tout ce que portait
  l'événement homonyme (dont sa vraie fondation ~9 900) ; Feylor, Zarnith
  et Frosthal redeviennent des lieux (résumés et faits transférés,
  Frosthal rattachée à Elarian) ; le double vide de la Fédération de
  Morveth supprimé ; **l'Empire d'Evertia et la nation Evertia ne font
  plus qu'un** (même capitale Caëspia, même Impératrice — alias posé), et
  Thalmaris/Sylvara redeviennent des nations sœurs du continent.
- **79 faits en double fusionnés** (règnes, naissances, morts des deux
  passes d'import) ; la fuite de l'apprenti de Tessar retypée événement.
  Restent 3 paires *voulues* (objets différents = deux rôles, ex. Brenna
  cheffe du Clan du Loup et fondatrice de la Confédération).
- **11 rattachements continentaux tranchés par les fiches `Pays/`** :
  Tyndara→Onara, Haldria→Endora, **Caeloria→Azoria** (chantier CLAUDE.md
  réglé), Vytharia/Lunasar/Mirathi→Ilthara (l'île de Nysaria restant à
  Celethor), **Torkam→Alkaran**, le Temple des Flammes Éternelles ramené
  à Ilnara seule, Windora purgée de son reliquat Thalmaris (résumé
  compris). **0 entité à cheval sur deux continents** (57 avant).
- **No Man's Land homogénéisés** : Celethor et Cestra retypés
  `entite-politique` genre non-état, comme Azoria (le canon les compte
  parmi les 47 nations). La permutation des *marqueurs* NML
  Azoria/Cestra a été réglée le 2026-09-10 (§10 : marqueurs échangés).
- **Capitales-seed** : les cinq situées dans leur nation ; Lithanel,
  Navoria (engloutie An 0, fin posée) et Everthor-Prime qualifiées
  « capitale ancienne » face aux capitales actuelles des fiches (Trelios,
  Folgrad, Ostarith).
- **0 règne orphelin** (13 avant) : rattachés à Kryostra, Glacoria,
  Thyldor, Galdryn, Mythralis, Eridorn, et aux tribus Jentar/Folinor
  (lignées — assumé) ; la Tyrannie des Cendres retypée événement de
  Drahk'Nor.
- **0 homonymie non balisée** (30 avant) : 17 `a-ne-pas-confondre-avec`
  posés ; les doublons de facettes (Vael'Ur, Cœur de Cendra, Chamanes des
  Brumes, Verithani, Étranger des Heures, Fragment #3) reliés `lie-a`
  « à fusionner au bake » ; l'Arrachement et la Résonance balisés
  « concept + événement, facettes voulues ».

**Restes assumés** : les faits-précurseurs typés `fondation` (~40, motif
voulu — cf. fin du §11.b) ; les doublons de fondation à date égale
(Tharnok, Forgon, Drahk'Nor, Lunasar… — attestations multiples, bake).

**Affichage appliqué (2026-09-10).** La Fresque dessine désormais une
fourchette (`data.fourchette`) en cercle creux à mi-fenêtre avec
moustaches — plus jamais en trait de règne — et son infobulle dit
« entre X et Y · fenêtre d'incertitude » ; `dateLabel` (fiches, Atelier
Dirigeants) dit « entre X et Y » ; et le label propre d'une relation
(« capitale ancienne, engloutie An 0 »…) qualifie son type sur les fiches
au lieu d'être écrasé (`lib/kg-core.js`).

Le texte d'origine est conservé ci-dessous comme trace.

#### Texte d'origine (avant réparation)

1. **La nation Dhalvoria vit dans un événement.** `evt-0166` (« Dhalvoria »)
   porte la capitale (Dhalvora, `lnk-2855`), neuf villes `situe-dans`, deux
   religions pratiquées, une vénération, une frontière avec la Confédération
   tribale d'Ulinor et la **succession de la Ligue Yurrak** (`lnk-0448`) —
   pendant que la vraie polité `pol-0041` ne porte qu'un fait. Même famille :
   **Feylor** (`evt-0164`, cible de `gouverne` et `fonde` !), **Zarnith**
   (`evt-0163`, `situe-dans` le No Man's Land Celethor), **Frosthal**
   (`evt-0165`) — des événements nommés comme leurs lieux homonymes
   (`lie-0739`/`lie-0746`/`lie-0767`) et devenus porte-relations de lieux.
   À retyper ou re-brancher sur les bonnes entités.
2. **Fédération de Morveth en double** : `evt-0126` (décrite comme « la
   confédération de douze cités » — une entité, pas un événement) vs
   `pol-0081`. Fusionner ou faire de l'événement la *fondation* de la polité.
3. **52 dirigeants portent deux faits de règne quasi identiques** (45 paires
   aux dates strictement égales, 7 divergentes) — reliquat de deux passes
   d'import (séries `fac-01xx`–`02xx` vs `fac-04xx`+). Dédoublonner lors du
   bake ; les 7 divergentes sont surtout « fin 10 200 (présent) vs fin
   ouverte », sauf Elyndra III (cf. 11.a).
4. **Doubles rattachements `situe-dans` contradictoires** — les racines des
   57 entités « à deux continents » : **Tyndara** → Galenor *et* Onara ;
   **Haldria** → Endora *et* Ilthara ; **Caeloria** → Celethor *et* Azoria
   (chantier connu) ; **Vytharia/Lunasar/Mirathi** → Nysaria *et* Ilthara
   (leur `data.continent` dit encore Nysaria) ; **Torkam** → Ulinor *et*
   Alkaran (§4) ; **Temple des Flammes Éternelles** → quatre parents
   (Ilnara, Pyracine, Haliandris, Lorenthia) ; **Mont Cendra** → Cendara et
   La Grande Île. Clans à cheval (Halgren, Hesgarn, Ours, Vass) : peut-être
   voulu, à confirmer. Un arbitrage par nation suffit à assainir toute la
   descendance.
5. **Windora : arbitrage appliqué à moitié.** L'arbitrage 2026-07-18 (« région
   d'Astravia ») a bien posé `lnk-2134` → Astravia et l'échelle `region`,
   mais l'ancien `lnk-2433` → Thalmaris **subsiste**, et le résumé de la
   fiche dit toujours « région venteuse de l'est de **Thalmaris** ».
6. **Trois No Man's Land, deux typages.** NML Azoria = `entite-politique`
   (`pol-0109`, genre non-état) ; NML Celethor et NML Cestra = `lieu`
   d'échelle region (`lie-0242`, `lie-0298`). Le canon les compte parmi les
   47 nations : homogénéiser (et créer les entités NML par continent
   attendues par le §10).
7. **Evertia en triple.** `lie-0008` (échelle **continent**, pourtant décrit
   « archipel-forteresse, l'Île aux Merveilles ») + `pol-0116` (nation
   « extérieure à Cendara », sans géographie) + `pol-0119` (Empire
   d'Evertia). Thalmaris et Sylvara sont `situe-dans` les **deux** premiers ;
   Valmora et Lithéa dans `pol-0116` *et* `pol-0119`. À démêler — et le cas
   pèse sur le §2 (si Evertia est une île, le compte des continents descend
   à dix).
8. **Cinq capitales hors géographie** : Lithanel, Drahk, Orivanel, Navoria
   (engloutie An 0) et Everthor-Prime (`lie-0014`–`lie-0018`) sont
   `capitale-de` sans aucun `situe-dans`.
9. **29 homonymies non balisées** (aucun `a-ne-pas-confondre-avec`) :
   Evertia, Ackerna, Warenthor, Skaldoria, Noravia, Trinoria, Valoria,
   Ryldor (polité vs lieu) ; Thaldris, Thyros, Selvorn, Aerith, Yltheris,
   Korven (personne vs lieu) ; Jentar, Folinor, Xyria (lignée vs lieu) ;
   L'Arrachement (concept vs événement), La Résonance, Vael'Ur, Le Cœur de
   Cendra, Les Chamanes des Brumes, Les Verithani, l'Étranger des Heures,
   Le Fragment #3 (concept/terme/objet — probablement de **vrais doublons**
   à fusionner plutôt que des homonymes) ; Zarnith, Feylor, Frosthal,
   Dhalvoria, Fédération de Morveth (cf. points 1–2).
10. **Le décompte des règnes orphelins passe de 8 à 13** (§5) — s'y sont
    ajoutés Krenneth de Kryostra, Rann et Vyssa (Glacoria), Brennar et
    Myrael (Thyldor), Vorastes (Galdryn), Vael Vegnaurson (Mythralis), La
    Tisseuse d'Eridorn ; et un fait de règne porté par un **événement** (La
    Tyrannie des Cendres, `evt-0161`). Trois des anciens cas visent des
    tribus typées `lignee` (Jentar, Folinor, Clan du Loup) — décider si une
    lignée peut être gouvernée ou s'il faut des polités tribales.

### 11.d Points recontrôlés, inchangés

- Les **13 villes** rattachées au No Man's Land d'Azoria mais posées près de
  Caeloria (§10) : le recalcul spatial complet (226 villes vérifiées)
  retombe exactement sur ces 13 — rien de neuf n'a dérivé.
- **§2 continents** : 11 continents d'échelle dans le graphe ; la prose dit
  « douze » — **clos 2026-09-14** : usage vernaculaire conservé (§2).
- **§3 nations vs civilisations** : **résolu 2026-09-14** — `data.genre` posé
  partout, 44 nations + 3 No Man's Land = 47 (§3).
- **Sœur Asra / Sœur Velna** (passe 2) : **résolu 2026-09-14** — pas de
  contradiction : la période d'Asra (dès 230) est celle de ses observations,
  sa charge de médecin chef suit la mort de Velna (232) ; la relation
  `succede-a` (`lnk-0863`) est datée 10 181.
- **La chronologie de Noravia / Sorin** (passe 3) : **résolu 2026-09-14** —
  les Chroniques v2 font foi (route verrouillée, §4.0bis) : Aldric passe à
  Noravia en **l'an 230** (~40 ans, berger-astronome venu de Galenor, non
  « cartographe haldrien »), Sorin en **l'an 251** (jours 825-848) et il monte
  au surplomb du Jumeau. Fiches rebasées (`Histoires/Cestra/Noravia.md`,
  `Histoires/Cestra/Cestra.md`, `Pays/Cestra/Noravia.md`, `Pays/Cestra/Cestra -
  Continent.md` : 220 → 230, 231 → 251, « onze ans » → « vingt et un ans »,
  Mira Dasthen à Rukhsar) ; faits `fac-0644`, `fac-0645`, `fac-0975`,
  `fac-0988`, `fac-0989` recalés avec `data.correction`.
- Les **faits sans aucune date** : il n'en restait qu'un (`fac-0904`, la
  révélation de Yelthari), **daté le 2026-09-14** sur la fondation de Jentaris
  (époque des Premiers Échos, estimation basse confiance) ; les autres avaient
  été datés par les passes suivantes.

---

## Arbitrages actés par l'auteur (2026-07-18)

Quatre points tranchés en interface interactive, appliqués au graphe :

| Point | Arbitrage | Application |
|---|---|---|
| **Folgrad** (carte vs fiche) | **La fiche a raison** : capitale de Mosrack (Onara) | point repositionné au marqueur Mosrack (393, 91) ; surface nationale de Mosrack extraite ; étape 10 de Sorin re-pointée sur Folgrad |
| **Windora** (Thalmaris vs Astravia) | **Région d'Astravia** | `situe-dans` → Astravia, échelle passée à `region` |
| **Continents (12 vs 13)** | **Baelor et Nysaria sont de grandes îles**, pas des continents | rétrogradés (échelle `region`, marqués île) → **11 continents canoniques**. ⚠ ~~Reste à réconcilier : la prose (romans, Chroniques) dit « douze continents »~~ — **clos 2026-09-14** : usage vernaculaire du monde, prose conservée (voir section suivante). |
| **Taciti / Les Silencieux (Taciti)** | **L'une est une branche de l'autre** | reliées par `lie-a` (« branche de ») ; les deux entités conservées |

Le §2 (nombre de continents) et les lignes Folgrad/Windora du §10 sont donc **réglés** ; `data/geo-conflits.json` régénéré (restent 14 cas, tous de la famille « No Man's Land »).

---

## Arbitrage appliqué pendant la réécriture stylistique des Chroniques (2026-08-27)

| Point | Constat | Application (réversible) |
|---|---|---|
| **Sexe de Reen** (capitaine, ch. 4 et 35 des Chroniques) | Le ch. 4 v1 écrivait « la capitaine Reen… elle » ; la bible v2 dit « le capitaine **Reen** [canon] » et le ch. 35 l'écrit au masculin | **Aligné sur la bible et le ch. 35 : masculin** dans le ch. 4 réécrit. Si l'auteur préfère une capitaine, c'est le ch. 35 et la bible qu'il faudra corriger. |
| **Vérification du Délié** (ch. 22) | « Vérifié à ma naissance par les Veilleurs » vs l'épreuve de discernement à treize ans du ch. 1 (les « Veilleurs » des autres chapitres sont d'autres institutions) | Aligné sur le ch. 1 : épreuve à treize ans. |
| **Première sensation du pouls** (ch. 21) | « pour la première fois » alors que Sorin sent déjà le pouls à Trinoria (ch. 5) et y ment — mensonge frontal interdit par la bible §2.4.1 | Énoncés rendus littéralement vrais ; « pour la première fois » retiré. |
| **Mira « dans ma cuisine »** (ch. 26) | Contredit le ch. 1 où elle reste dans l'embrasure | Aligné sur le ch. 1. |
| **Le mot « classer »** (ch. 10) | L'original l'attribuait à Torhal ; au ch. 6 c'est Sorin qui le prononce devant Torhal | Aligné sur le ch. 6. |
| **Phrase relue du ch. 1** (ch. 26) | La bible fait relire « J'espère, pour elle, qu'on n'a pas remarqué son passage » comme écrite au ch. 1, où elle ne figurait pas | Semée au ch. 1 (scène de Mira). |
| **Durée Rukhsar → Lumasar** (ch. 2) | « Onze jours de route » puis « Douze jours » dans le même chapitre ; la bible donne jour 1 → jour 14. | Relecture 2026-09-14 : **treize jours** aux deux endroits. |
| **« Un mort »** (ch. 10) | Sorin appelait son père « un mort » ; le ch. 1 pose « Je n'écris pas qu'il est mort » (garde-fou §7). | Relecture 2026-09-14 : « un disparu ». |
| **« Sans un mot »** (ch. 22) | Sorin dit que l'Enfant aux Yeux Blancs l'avait regardé « sans un mot » ; au ch. 20 l'Enfant lui parle longuement. | Relecture 2026-09-14 : les deux mots retirés. |
| **Aveu précoce du plan** (ch. 26) | « j'ai déposé… pour qu'aucune main ne puisse le rappeler » énonçait la stratégie avant la bascule du ch. 27 (§2.4.4), où c'est le rapport d'Orath qui la révèle. | Relecture 2026-09-14 : le fait reste (« déposé partout où l'on voulait bien le garder »), le motif stratégique est retiré. |
| **Présent de narration** (ch. 16-17) | Deux chapitres au présent entre des chapitres au passé. | Relecture 2026-09-14 : **conservé** — régime propre à ces deux chapitres (le flagrant délit se vit au présent), déjà dans l'original. |

**Signalées pendant la même réécriture, puis tranchées le 2026-09-14 par délégation de l'auteur (« arbitre de manière logique ») :**

| Point | Constat | Arbitrage (2026-09-14) |
|---|---|---|
| Profondeur des tunnels sous Rukhsar | « neuf cents pieds » (ch. 27) vs « sept mètres » (ch. 34 v1). | **Conservé « neuf cents pieds »** : le « sept mètres » a disparu à la réécriture du ch. 34, et le ch. 27 (deux occurrences, dont une de Sorin lui-même) reste le seul chiffre du corpus ; cohérent avec des galeries « d'avant l'Arrachement » datées par les géologues de Gryndor. `fac-1225` inchangé. |
| Qui a copié le fragment de Mirathi | Sorin à Gryndor (bible ch. 14, ch. 34) / « une main de dormeuse » (ch. 28) ; et le ch. 20 disait Mirathi « pays qui n'existe plus », le ch. 35 en faisait une personne (« une Déliée »). | **Le graphe fait foi** (`pol-0035` : province-sanctuaire de Vytharia, vivante ; `obj-0054`, `per-0869`). Ch. 20 : écriture venue « du plateau de Mirathi, où les Oracles la gardent sans la lire », déjà croisée « à Gryndor, dans le fragment qu'on m'avait laissé copier » (et « dans un relevé de Cendra », plus « gravé sous une pierre » d'une ville où Sorin n'est pas allé). Ch. 28 : fragment « copié de ma main » à Gryndor et comparé au couvent. Ch. 35 : « Les Oracles de Mirathi, qui reçoivent le Message sans chercher à le lire » remplace « Mirathi… une Déliée ». `fac-1188` aligné. |
| La copie du scriptorium de Lumasar | Le rapport d'Orath (ch. 27) la disait hors de portée ; la bible la dit saisie au ch. 11. | **La bible fait foi** : la note d'Orath dit désormais que la copie de Lumasar a été reprise sur le fleuve (un leurre remis en route pour qu'on le reprenne) et que trois copies au moins restent hors de portée (ports d'Onar, dépôt non localisé) ; le commentaire de Sorin suit (« Il en manquait »). `fac-1226` aligné. |
| Vels vu ou non | « ne se laisse pas voir » (ch. 19, présent gnomique) vs gant vu sous la canopée (ch. 19 même chapitre, rappelé ch. 23). | **Pas de contradiction de fond** : la phrase passe au passé (« ne s'était encore jamais laissé voir ; on constatait son passage après coup »), la canopée est la première fois. |
| Homonymie **Lunaris** | Canyon de Drakora (ch. 16) et capitale de Lunasar (ch. 28). | **Les deux sont canon** (`ter-0041`, `per-0708` / `pol-0034`, `lie-0847`) : homonymie assumée, notée une fois au ch. 28 par le cartographe (« La ville s'appelle Lunaris, comme le canyon de Drakora ; les deux n'ont en commun que le nom »). |
| « Trente pleines saisons » (ch. 28) | Unité inhabituelle, et trente ans contredit le reste du corpus (ch. 17 : « vingt ans avant moi » ; graphe `fac-0409`, `fac-1166`, `fac-1169`, `fac-1260` : vingt à vingt-trois ans). | **Le corpus fait foi** : Solvanes dit « vingt ans, peut-être davantage » ; `fac-1231` aligné. |
| Rature ajoutée au ch. 20 par la réécriture | « ~~conclure n'est pas ma tâche ; je suis venu relever, puis déposer…~~ », absente de l'original (ajout d'un agent). | **Retirée** (même règle : la barre est réservée au lapsus du ch. 29 et au raisonnement barré du ch. 37) ; la phrase reste, non barrée, comme « une ligne qui n'était pas un relevé ». |
| Rature quasi-aveu du ch. 25 | « ~~ce n'est pas moi qui les tue, je ne fais que~~ » (préexistante) alors que la bible réserve la bascule par lapsus barré au ch. 29 (§2.6, §7.20 « jamais quatre fois le même geste ») et fonde le ch. 25 sur l'aveu **par un tiers** (la gardienne, §2.4.5). | **La bible fait foi** : la rature du ch. 25 est retirée (« je commençai une phrase et ne l'achevai pas. La marge disait déjà ce qu'il fallait. ») ; le seul lapsus barré reste celui du ch. 29. |
| Jour du ch. 31 | Frontmatter 748 (= ch. 30) vs table bible 775. | **Le graphe et le texte font foi** : les événements injectés datent le départ de Baeloris au jour 752, l'interception de Vels au 769, l'arrivée à Invernis au 790 ; le ch. 31 passe à **752** (frontmatter, ligne lieu/jour, `chroniques-index.json`). La table de la bible est mise en cohérence : ch. 30 **748** (ses propres durées 3 + 18 + 12 depuis le jour 715 donnaient 748, non 745 ; le texte et `fac` « jour 748 » disaient déjà 748) ; ch. 31 **752**, traversée ~38 j. Non modifié, à titre de convention : le ch. 13 porte le jour d'arrivée (276, plage « 276 à 300 ») là où la bible donne le jour de la scène clé (300) ; idem ch. 32 (800 = départ final, arrivée 790). |

---

## Constats du versement des Romans au graphe (2026-09-14)

Relevés faits pendant la lecture intégrale des trois tomes des *Trois Coups* (injection de 161 événements de récit dans le graphe), puis **tranchés le jour même par délégation de l'auteur** (« tranche au plus logique »). Application : `scripts/arbitrer-recit.js` (idempotent ; provenance `data.correction`/`data.arbitrage`/`data.fusion` sur chaque fait ou fiche touché) + corrections de texte listées ci-dessous.

| Point | Constat | Arbitrage (2026-09-14) |
|---|---|---|
| **Doublon d'œuvres** | `oeu-0016` et `oeu-0004` recouvraient le même tome 3 ; l'injection n'utilise que `oeu-0004`. | **Fusion** : `oeu-0016` (créée par le balayage corpus — aucun fait, aucun alias, deux relations) absorbée par `oeu-0004` ; la relation Taldre re-branchée, le doublon per-0020 supprimé, le titre sans marqueur conservé en alias (`ali-0201`). |
| **Année de la Refermeture** | La bible du T2 datait le Fléau « ~1400-1600 ap.A » ; le récit du T2 pose la Refermeture **vers 1500** (prologue −30, flashbacks 1480/1485, coda cahier muré 1502, coda enfant ~1560). | **Le récit fait foi : le Fléau s'achève ~1 500** (« l'Heure qui se referme »). Fin des six faits du Fléau (`fac-0097/0349/1051/1074/1075/1076`) 1600 → 1500 circa ; période d'`evt-0021` 1400→1500 ; datations harmonisées dans la bible T2, Era 4, Era 5, l'index de chronologie et le Lexique du Lien. Les « ~1 600 » deviennent un arrondi d'archives (la fiche Era 5 notait déjà des archives tardives étalant la fermeture « jusque vers ~1 700 »). La **tyrannie des Cendres garde ~1 450-1 600** : l'appareil survit un siècle à la Refermeture — cohérent avec le rapport falsifié de Vaenor (« le Fléau a cédé sous l'action des Inspecteurs »). |
| **Périodes de personnages** | `per-0005` et `per-0008` portaient des périodes incompatibles avec leur rôle (fin à 9949). | Cause identifiée : **neuf faits « An 0 » importés à 9949** — « An 0 » y désigne l'Arrachement (0 ap.A), lu par erreur comme l'an 0 du Sillage. `fac-1056`→`fac-1061`, `fac-1066`, `fac-1067`, `fac-1070` recalés à 0 (ère Grande Nuit) ; périodes dérivées recalculées (Vorath −1→0, Kayara −40→0, Théon Ossarin 0, Tirash VII 0…). `fac-1069` (Fragment Zéro « déposé **bien après** l'An 0 ») n'est **pas** de cette famille : date de dépôt inconnue, ancrage 9949 (début du Sillage) conservé et marqué circa. |
| **Velkar vs Verkan** | La bible du T3 (§2.1) écrivait « **Velkar** Sorne » ; le texte du T1 écrit partout « **Verkan** Sorne ». | **Verkan** — déjà acté au Canon (« Renommages de romans »). Le graphe était correct (`per-0010`) ; graphie corrigée dans les bibles T2 et T3 et la bible des Chroniques. Le **port Velkar** d'Azoral (`lie-0188`) et **Velkaris** (Lumasar) sont des homonymes légitimes, non touchés. |
| **Navoria engloutie** | `pol-0054` : « engloutie en ~40 minutes » ; le T1 (ch. 26, H6) décrit une montée des eaux sur des jours et une noyade progressive sur une journée. | **Le récit fait foi** : résumé de `pol-0054` réécrit (noyade en une journée au terme d'une montée de plusieurs jours) ; « ~40 min » (Era 3b) rétrogradé en variante d'archives — le libellé de `fac-1056` garde les deux traditions, arbitrage noté dessus. |
| **Nom du Grand Pontife** | Le T1 (ch. 34 — et non le T2 comme l'écrivait ce constat) le nomme **Théon Ossarin**. | `per-0882` renommée **Théon Ossarin** ; « Le Grand Pontife de Navoris » passe en alias (`ali-0202`). Son titre romanesque « Grand Pontife de **Navigor** » désigne le dieu, Navoris la thalassocratie — pas d'homonymie. |
| **Marenn (homonymie)** | `per-0758` Marenn = fille de Retto, aubergiste du Poisson Doré **an 251** ; la « vieille Marenn » du T2 (~1560) est une personne distincte. | **Pas de nouvelle fiche** : la vieille du T2 est un personnage-fenêtre d'une coda, sans autre attache dans le monde ; le fait de récit la nomme sans lien. `per-0758` inchangée ; le câblage du lot avait déjà été corrigé. |
| **La seconde clef du coffre d'Olven (T3, interne)** | Ch. 15 et 28 : l'autre clef est **au Prime** des Ombres ; ch. 32 : la déléguée **Orsenne** dit « J'ai l'autre ». | **Lecture conciliante, aucun texte modifié** : la clef appartient au Prime ; Orsenne en dispose **par délégation** lors de sa descente — c'est exactement son rôle d'émissaire ; « J'ai l'autre » est vrai au moment où elle le dit. |
| **Mort du Prophète Vharok (T3, interne)** | Ch. 40 : « **sept ans** plus tôt » (idem bible §3.3) ; ch. 45 : « **un an** plus tôt ». | **Sept ans** (an 244 du Sillage) : ch. 45 corrigé (« sept ans plus tôt ») ; `fac-1095` recalé 10 200 → 10 193, période de `per-0893` suivie. Le « un an plus tôt » du ch. 51 (l'élève Karsel) est un autre sujet, non touché. |
| **« Douze continents »** (rappel) | La prose des romans dit « douze continents » ; l'arbitrage 2026-07-18 a acté 11 continents + 2 grandes îles. | **Usage vernaculaire conservé, prose non modifiée** : « douze continents » est la façon dont le monde se compte lui-même (les vieilles cartes comptaient Baelor) ; le canon géographique reste 11 + 2. L'écart n'est plus une incohérence mais un fait de langue du monde — clos. |

Créations liées au versement : `per-0915` **Vael** (frère de Thessan, T1) et `per-0916` **Rensa** (fille de Verkan Sorne, T1), fiches minimales issues du récit. *(Une première version de cette note écrivait per-0913/per-0914 — IDs pris entre-temps par les deux Kyra du §11.b.)*

---

## Arbitrages du 2026-09-14 — « tranche tout ce qui doit être tranché »

L'auteur a délégué en bloc (« ne laisse rien à ma lecture ») : tout ce que ce
registre laissait ouvert est tranché au plus logique, appliqué, et tracé
(`data.arbitrages` / `data.correction` / `data.fusion` / `data.carte` sur les
entités touchées). Récapitulatif :

| Point | Verdict | Application |
|---|---|---|
| Jours des ch. 13 et 32 (Chroniques) | **Convention posée** : le frontmatter et la ligne lieu/jour portent le jour de la première scène datée ; la colonne Jour de la bible porte la scène clé. | Ch. 32 : ouverture au jour **790** (arrivée à Invernis ; départ 800 en fin de chapitre), index des chroniques à jour ; ch. 13 inchangé (276 → 300) ; convention écrite dans la bible §4.0bis. |
| §2 continents | 11 continents ; « douze » vernaculaire | statut mis à jour. |
| §3 décompte des polités | 44 nations + 3 NML = 47 | `data.genre` sur les 124 polités, `data.forme` conserve l'ancienne valeur ; Ligue des Marchands dédoublonnée. |
| §4 Caeloria / Torkam | nations légitimes | `data.continent` réaligné (Caeloria, Torkam, Tyndara). |
| §5 règnes orphelins | déjà résolu (11.c) | statut mis à jour. |
| §6 tail géographique | rattachement par surfaces puis marqueurs | 336 rattachements créés ; restent Baelor (racine) et Kytheris (non rattachable). |
| §7 doublons | géré | statut mis à jour. |
| §9 échantillon des 380 notes | chaque cas tranché (voir §9) | alias, balises, fusion Karendis, statut des divinités locales, Porte de Fer, Brèche/Sanctuaire, Yelthari/Tirenne. |
| §10 Haldria | la fiche a raison (Endora) | surface d'Ilthara → Warenthor ; Haldria sans marqueur ; cartes d'ère régénérées ; écarts carte/fiches d'Iskara, Thalmaris, Skaldoria, Myrtam assumés (position = carte, rattachement = fiches). |
| 11.b faits-précurseurs typés fondation | conservés | motif : pipeline des cartes d'ère. |
| 11.b-12 / 11.c ⚠ | faits le 2026-09-10 | texte mis à jour. |
| 11.d Asra / Velna | pas de contradiction | `lnk-0863` daté 10 181. |
| 11.d Noravia / Sorin | les Chroniques font foi | quatre fiches rebasées, cinq faits recalés. |
| 11.d faits sans date | `fac-0904` daté | époque des Premiers Échos. |
| Contrôle de proximité (`arbitrer-nml.js`) | un rattachement arbitré n'est pas un conflit | `data/geo-conflits.json` : 0 conflit. |

---

## Arbitrages de la réécriture de la trilogie (2026-09-16 →)

Relevés par les agents pendant la réécriture des *Trois Coups*, tranchés au fil de l'eau
par délégation de l'auteur. Le style seul est réécrit ; ces points-ci touchaient au fond.

| Point | Constat | Arbitrage |
|---|---|---|
| **Deux Corvane** (T1) | Un condisciple rieur de 19 ans au ch. 2 et « le vieux Corvane, préposé aux annales de Tempora » au ch. 12, six ans plus tard ; un troisième Corvane, autrement plus important, parle aux T2 et T3. | **Le condisciple est renommé Havrenn** (8 occurrences, ch. 2 seul) : il n'apparaît nulle part ailleurs, l'annaliste a une fonction et une suite. |
| **Fragments intercalaires A et B** (bible du T1) | La bible les prescrit « à placer dans S7 et S9 » ; ils n'ont jamais été écrits, et le plan de scènes S ne correspond plus au découpage en 56 chapitres. | **Non insérés, classés comme tels dans la bible.** Le dispositif en vigueur est la série numérotée Fragment #1 à #7, complète. |
| **Âge de Sera** (T1) | « Trente ans de rage » au ch. 4 (elle a ~43 ans) et une dernière lettre « trente ans plus tard » au ch. 3, ce qui la mènerait à ~75 ans. | **Aucune contradiction** : la rage date de son adolescence, et la bible ne fixe aucune fin à Sera. Rien corrigé. |
| **Datation du triptyque de la forge** (T1 ch. 6, 7, 24) | Le ch. 7 datait la perte de l'atelier de trois ans et Kessa de 22 ans ; le ch. 6 disait quatre ans et 25 ans, et plaçait la première visite des hommes de Vhaeran trois mois avant son présent, donc après la scène du ch. 7 qui la suppose faite. | **Dissoute par la réécriture** : les marqueurs en conflit ont disparu des textes. Reste trois ans au ch. 7, quatre ans au ch. 6 — les deux chapitres étant à un an d'écart, c'est cohérent. Seul âge subsistant : Kessa, 25 ans au ch. 6. Vérifié, rien à corriger. |
| **« Montrer, c'est faire »** (T1) | Thessan formule la phrase à 19 ans au ch. 2, et le ch. 12 la lui fait combattre. | **Le ch. 12 est un refus, pas une ignorance** : le ch. 2 se clôt sur « six ans de méthode n'avaient pas suffi à la défaire ». |
| **Ísae** (T1 ch. 2) | Le texte disait « ni Sera, ni sa sœur, ni Ísae » alors qu'Ísae *est* la sœur de Sera (ch. 3). | Corrigé : « ni Sera ni sa sœur Ísae ». |

### Arbitrages de fait du tome 1 (réécriture terminée le 2026-09-16)

Les 56 chapitres du T1 ont été réécrits et relus transversalement. Ces points-là étaient
des contradictions entre chapitres, pas des questions de style ; ils sont tranchés dans
le texte, la bible du tome ayant suivi dans le même commit quand elle divergeait.

| Point | Ce qui clochait | Arbitrage |
| --- | --- | --- |
| **Qui pose la question au J-51** (ch. 17) | Mirathis s'attribuait la question ; le Fragment #3, le ch. 21 et le ch. 36 disent que c'est Thessan qui la pose et Mirathis qui répond par la phrase. | **Thessan pose, Mirathis répond.** Un mot inversé au ch. 17. |
| **Le gîte du Corbeau-Gris** (ch. 25 / 29) | Le ch. 25 montre un trou de registre **bouché** (l'entrée est récrite le matin, c'est l'encre qui trahit) ; le ch. 29 s'en souvenait comme d'un blanc laissé béant, soit l'inverse. | Le ch. 29 se souvient d'une nuit **récrite** ; le blanc mal bouché revient au logeur plus au sud, l'amateur pris en hâte, que le ch. 25 mentionne déjà. |
| **Le débarquement à la crique de la Dent** (ch. 36, 37, 51) | Le ch. 37 donnait à Verkan « trois jours de retard » sur une quille vieille de dix nuits. | **Dix nuits** (les ch. 36 et 51 le disaient tous deux). Le ch. 37 distingue désormais deux âges : la quille a dix nuits, la piste vivante des hautes terres en a trois. |
| **Drakhan et sa forge** (ch. 24, 36, 38, 44, 45) | Le ch. 38 le faisait forger la veille de la montée, le ch. 44 déduisait son départ d'une cheminée éteinte — alors qu'il a éteint sa forge et emporté son marteau au ch. 24, et que Kessa y tient le feu. | Il n'a plus de forge : il attend en bas les mains froides. Au ch. 44, Verkan lit **la cendre comme une horloge**, pas une cheminée. |
| **Où est Kessa la dernière nuit** (ch. 33 / 52) | Le ch. 52 la faisait partir de la remise trois jours plus tôt ; le ch. 33 la montre au campement du pied du Mont la veille au soir. | **Le ch. 33 fait foi.** Elle part du campement dans la nuit, une nuit de marche, un relais au petit jour. |
| **Sera à H0** (ch. 42, 43, 55) | Le ch. 55 la faisait disparaître « le protocole roulé contre elle », alors que le ch. 42 le lui fait ranger et que le ch. 43 ouvre sur « tu as les mains vides ». | **Les mains vides**, la sacoche du protocole au flanc. |
| **Vorath et le nom de Navigor** (ch. 15 / 43) | Il ignore le nom à Baelor et le prononce au sommet. | Il l'a **appris en route**, avec le Cercle : une incise d'une ligne au ch. 43. |
| **Verithan** (ch. 47) | Né à Varandar « une centaine d'années plus tôt », contre mille ans aux ch. 01 et 02 ; et son nom dit inconnu, alors qu'à Varandar on le connaît sans le prononcer (ch. 02). | **Mille ans**, et Tarreck tient le nom « de la voix basse qu'on garde, dans ce pays, pour les morts qui ont mal fini ». |
| **Kelib** (ch. 14 / 46) | « Comme cinq ans plus tôt » alors qu'il avait cinq ans au ch. 14 et en a douze. | **Sept ans plus tôt.** |
| **Ísae à H0** (ch. 43 / 48) | Le ch. 48 la mettait au jardin « à l'heure où cela commença » ; le ch. 43 la montre endormie. | Cela **commence dans la nuit** — elle se réveille une fois sans rien en savoir — et met quatre heures à atteindre Celethor. Au passage, « depuis quarante ans » disparaît : Ísae est la jumelle de Sera, que la bible donne à quarante-cinq ans. |
| **La bible contre le livre** (deux points) | La bible écrivait « l'un d'entre nous » là où le livre dit « l'un **de** nous », et gardait la forme longue du Fragment #5. | **Le livre fait foi**, la bible s'aligne. La citation aphoristique du Grand Pontife, que le ch. 34 ne dit plus ainsi, est remplacée par la fonction à faire entendre. |
| **Calendrier de l'autodafé** (ch. 09, 10, 53) | Signalé, **non corrigé** : rien ne se contredit sur la page — Aelindra envoie les quarante pages, Verkan les brûle sans se dater, elle l'apprend trois mois plus tard, la coda situe le brasier « au dernier hiver ». Seul le mot « présent » du frontmatter du ch. 10 est lâche, et c'est de la métadonnée. | **Laissé à l'auteur** s'il veut fixer le calendrier interne du tome. |

**Dispositifs consolidés au passage** (ce ne sont pas des incohérences, mais ils étaient
appliqués de façon inégale) : une **seule** clausule d'échappée par chapitre — les ch. 19,
46, 51 et 53 en portaient de deux à quatre — et aucune ne partage plus ses mots avec une
autre ; le tag `pov-velkar` est aligné sur **Verkan Sorne** dans les dix frontmatters qui
le gardaient.

### Tome 2 — un point de chronologie que je ne tranche pas (ch. 27, « Ceux qui restent debout »)

Relevé pendant la réécriture. Ce n'est pas un défaut de style : c'est la **prémisse** du
chapitre, et elle touche à ce que font les Failles. Je la pose telle quelle.

Le chapitre fait basculer le hameau du Mont-Gris **deux cents ans en arrière**, et ce qu'on
y trouve est le monde **d'avant l'Arrachement** : la main tiède, des gens « pleins », des
cités qui flottent. Or le tome se situe vers 1 450 ap. A. Deux cents ans en arrière, c'est
encore la Grande Nuit — le monde plein est à plus de **quatorze siècles**, pas à deux.

Trois nombres du chapitre s'additionnent mal, indépendamment de cela :

| Ce que dit le texte | Ce que cela implique |
| --- | --- |
| La narratrice a **cinquante ans** et voit sa **grand-mère à dix-sept** | Deux générations, soit **soixante-dix à quatre-vingt-dix ans** en arrière, pas deux cents. |
| Elle revient « deux cents ans plus tard » | Sa grand-mère aurait deux cent dix-sept ans. |
| **Vesle est morte depuis quarante ans**, enterrée par la narratrice « jeune femme » | À cinquante ans, elle en avait dix quand Vesle est morte. |

**Deux sorties possibles, au choix de l'auteur :**
1. **Garder la profondeur** (le monde plein, la main tiède) et lâcher la parenté : la jeune
   femme de la fontaine n'est pas sa grand-mère, c'est une inconnue dont elle reconnaît le
   rire — ce qui est plus troublant, et compatible avec une Voix qui ne sait plus quand elle
   est.
2. **Garder la parenté** et ramener la chute à **quatre-vingts ans** : la grand-mère à
   dix-sept ans tient, mais alors le hameau retombe dans la Grande Nuit, pas dans le monde
   plein — et la révélation du chapitre (apprendre ce qu'est un monde où personne n'est
   seul) change de nature. Dans les deux cas, l'âge de Vesle est à reprendre.

Rien n'a été modifié dans le chapitre : le nombre est dans le corps **et** dans le
frontmatter, et le choix change ce que le livre dit des Failles.

### Tome 2 — quand Kessane et Lirenn fuient-elles ? (ch. 29, 30, 33, 35)

Quatre chapitres donnent quatre états de la même fuite, et ils ne tiennent pas ensemble.
Relevé par trois agents indépendants pendant la réécriture ; **rien n'a été déplacé**,
parce que c'est l'ordre des scènes qui est en cause, pas leur écriture.

| Chapitre | Ce qu'il dit |
| --- | --- |
| **ch. 29** | Kessane et Lirenn **ont déjà fui**. |
| **ch. 30**, juste après | Vaenor **découvre** la forge et la note « à surveiller ». |
| **ch. 33** | Elles sont **déjà dans la Plaine**, aux trois déchirures, à l'instant où Ombreth meurt. |
| **ch. 35** | Elles **apprennent la mort d'Ombreth au quatrième soir de marche** et atteignent Gryndor le lendemain. |

Les ch. 29 et 33 supposent la fuite faite ; le ch. 30 suppose la forge encore tenue ; le
ch. 35 la raconte et la date. Deux sorties possibles : avancer la fuite avant le ch. 29,
ce qui oblige à reprendre le ch. 30 ; ou la laisser au ch. 35 et reprendre les deux
mentions anticipées. **C'est un choix de montage, il revient à l'auteur.**

---

## Annexe — d'où viennent ces constats

- Notes brutes du balayage : **`data/lore-notes.json`** (380 entrées `{ source, note }`, versionné).
- Rapport d'agrégation régénérable : `data/.lore-aggregate-report.json` (produit par `node scripts/aggregate-lore.js`, non versionné).
- Rapport de cohérence du graphe : projection *Cohérence* de l'Atelier (`getConsistencyReport`) — **0 erreur** (les points ci-dessus sont des **trous**, **doublons** ou **arbitrages**, pas des ruptures d'intégrité référentielle).
- Base de vérité : `data/kg-base.json` — **2 748** entités, 1 286 faits, 3 269 relations après la passe 3 (contre 1 097 entités avant le balayage).

## Renvois

- [[Canon — décisions et mystères protégés]] — ce qui fait foi ; ce qu'on ne touche pas.
- [[Glossaire des homonymies]] — les mots à plusieurs sens.
- [[Lexique du Lien à travers les Ères]] — la chaîne Vide → Tisse → non-Lié → « Délié ».
