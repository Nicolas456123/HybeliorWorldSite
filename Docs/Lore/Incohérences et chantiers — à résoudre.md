---
tags: [lore, méta, incohérences, chantiers, cohérence, graphe, à-résoudre]
type: lore
status: living
date: 2026-07-17
last_review: 2026-07-17
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

**Statut : ouvert.** *Le plus gros chantier.*

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

---

## 2. Nombre de continents — 13 dans le graphe, « douze » au canon

**Statut : ouvert (arbitrage d'auteur requis).**

Le [[Canon — décisions et mystères protégés]] pose **« Douze continents partout »** (« treize », voire « quatorze », explicitement corrigé). Or le graphe contient **13** entités `lieu` d'échelle *continent* :

> Alkaran · Azoria · Baelor · Celethor · Cendara · Cestra · Endora · Evertia · Galenor · Ilthara · Nysaria · Onara · Ulinor

Un de ces treize est de trop **par rapport au canon**, ou bien l'un d'eux est en réalité une **nation/région** promue à tort au rang de continent (candidats plausibles : *Baelor*, *Celethor*, *Nysaria*). 

**Résolution suggérée.** Trancher lesquels sont les douze continents canoniques ; rétrograder l'intrus en `entite-politique` ou `lieu`/région. À décider par l'auteur.

---

## 3. Décompte des polités — 59 dans le graphe, 47 nations au canon

**Statut : ouvert (à réconcilier).**

Le graphe compte **59** `entite-politique` ; le canon fixe **47 nations (dont 3 « No Man's Land »)** (décision L1). L'écart s'explique en partie parce que le graphe range dans le même type les **nations actuelles** *et* les **civilisations historiques** (17 civ + 42 nations), qui ne sont pas comptées ensemble par le canon — mais l'alignement n'a pas été vérifié.

**Résolution suggérée.** Distinguer dans le graphe `nation` (actuelle) et `civilisation` (historique) via un champ `data.genre`, puis vérifier que le compte des `nation` retombe sur **47**.

---

## 4. Noms hérités non corrigés — Caeloria / Torkam encore présents comme polités

**Statut : ouvert (vérifier fiche par fiche).**

Le canon acte : **« Table Chronologie corrigée : Caeloria → Azoria ; Torkam → Alkaran »**. Or le graphe contient encore des `entite-politique` nommées **Caeloria** et **Torkam** (Torkam porte même **3** faits de règne). Deux cas de figure à démêler :

- soit ce sont des **résidus** de l'ancien étiquetage (à renommer Azoria / Alkaran) ;
- soit **Caeloria** (nation actuelle, siège du Cardinal-Élu) et un éventuel royaume **Torkam** sont des entités **légitimes distinctes** des continents Azoria/Alkaran, et la coïncidence est bénigne.

**Résolution suggérée.** Vérifier dans les fiches Histoires si « Torkam » y désigne le continent (→ Alkaran) ou une nation propre ; idem pour Caeloria. Renommer ou conserver en conséquence.

---

## 5. Dirigeants non rattachés à leur royaume — 8 règnes orphelins

**Statut : ouvert (mineur).**

44 des 52 règnes sont reliés à leur polité (`object_id`) ; **8** ne le sont pas, faute d'une entité-polité au nom correspondant :

> Valtheria la Forgée · Hadran le Sage · Veldris l'Ancien · Valren de Nalithos · Orlan IV de Nalithos · Mirathi Voix-d'Ambre · Myrind · Krenneth-le-Jeune

Leur royaume est nommé dans le **libellé** (ex. « Thane d'Astraneth (Valoria) », « de Nalithos ») mais ce royaume n'existe pas comme entité, ou sous un autre nom.

**Résolution suggérée.** Créer les polités manquantes (Nalithos, Astraneth/Valoria…) ou corriger le nom cible, puis rattacher les 8 règnes.

---

## 6. Géographie sans rattachement — 651 lieux, aucun `situe-dans`

**Statut : ouvert (chantier assumé).**

Les **633** lieux importés depuis la sauvegarde carte (plus les 13 continents et quelques capitales : **651** `lieu` au total) n'ont **aucune** relation `situe-dans` : on connaît leur nom, leur échelle (cité/ville/bourg/région) et leurs coordonnées, mais **pas** leur continent ni leur nation de rattachement.

Le rattachement a été volontairement laissé de côté (cf. `scripts/migrate-kg.js`) : le déduire des seules coordonnées serait **faux** (les continents ne sont pas séparés par des polygones fiables, et l'heuristique « continent le plus proche » biaisait tout vers Galenor). 

**Résolution suggérée.** Rattacher via de vrais **polygones de frontières** (magasin Turso de prod) ou par **assignation manuelle** dans l'Atelier. Tant que ce n'est pas fait, la carte du graphe et les fiches « lieux d'un continent » restent incomplètes.

---

## 7. Doublons d'entités entre fiches — noms non canonisés

**Statut : partiellement géré.**

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

## Annexe — d'où viennent ces constats

- Rapport d'agrégation régénérable : `data/.lore-aggregate-report.json` (produit par `node scripts/aggregate-lore.js`, non versionné).
- Rapport de cohérence du graphe : projection *Cohérence* de l'Atelier (`getConsistencyReport`) — **0 erreur** actuellement (les points ci-dessus sont des **trous** ou des **arbitrages**, pas des ruptures d'intégrité référentielle).
- Base de vérité : `data/kg-base.json` — **1 097** entités, 248 faits, 202 relations au dernier import.

## Renvois

- [[Canon — décisions et mystères protégés]] — ce qui fait foi ; ce qu'on ne touche pas.
- [[Glossaire des homonymies]] — les mots à plusieurs sens.
- [[Lexique du Lien à travers les Ères]] — la chaîne Vide → Tisse → non-Lié → « Délié ».
