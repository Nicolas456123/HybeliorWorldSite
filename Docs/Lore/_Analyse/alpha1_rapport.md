# Rapport d'Analyse Alpha-1 — Lore Hybelior
**Analyste :** Alpha-1 (instance indépendante)
**Date :** 2026-03-19
**Périmètre :** 12 fichiers lore, Era0 → Era7
**Objectif :** Identifier les incohérences de noms, chronologiques, causales, factuelles, les points flous, et proposer des corrections.

---

> **Méthode :** Lecture séquentielle des 12 fichiers dans l'ordre canonique. Recoupement systématique de chaque nom propre, date, chiffre de population, et relation causale. Ce rapport ne résume pas le lore — il l'analyse.

---

## 1. Incohérences de noms

### 1.1 [CRITIQUE] Le Cercle des Huit — deux jeux de noms entièrement différents

C'est l'incohérence la plus grave du corpus. Le Cercle des Huit possède deux compositions de membres absolument différentes selon les fichiers sources, avec une logique de comptage contradictoire et une caractérisation idéologique incompatible.

**Fichier source A : `Era3_Religions_Chute.md`**
Le Cercle des Huit canonique est composé de **8 disciples de l'Étudiant** (l'Étudiant lui-même n'est pas compté) :

> Sera, Drakhan, Mirathis, Vorath, Aelindra, Thessan, Kayara, Iveth

- Vorath et Kayara sont explicitement **non-Liés**.
- Les 8 sont présentés comme idéologiquement engagés dans le mouvement Vérithanien.
- Boran Shult est **absent**.

**Fichier source B : `Era4_Arrachement.md`**
Le Cercle des Huit tel qu'il participe au rituel de l'Arrachement :

> Serna Veld, Orath Koss, Ysala Thorne, Merith l'Aveugle, Casta Drel, Boran Shult, Pelara Ash, **L'Étudiant lui-même**

- Les 7 membres non-Étudiant sont **tous Liés** (Liée-du-Feu, Lié-de-Pierre, Liée-du-Vent, etc.).
- **Boran Shult est présent** et est explicitement décrit comme ayant été trompé — il croyait participer à un rituel académique de « mesure du Lien », non à une destruction.
- **L'Étudiant est compté** comme le 8e membre.

**Tableau de comparaison :**

| # | Era3_Religions_Chute.md | Era4_Arrachement.md | Statut Lié/Délié |
|---|------------------------|---------------------|------------------|
| 1 | Sera | Serna Veld | Liée (Era4) |
| 2 | Drakhan | Orath Koss | Lié (Era4) |
| 3 | Mirathis | Ysala Thorne | Liée (Era4) |
| 4 | Vorath | Merith l'Aveugle | Non-Lié (Era3) / Lié (Era4) |
| 5 | Aelindra | Casta Drel | — |
| 6 | Thessan | Boran Shult | absent Era3 / trompé Era4 |
| 7 | Kayara | Pelara Ash | Non-Liée (Era3) / Liée-de-Feu (Era4) |
| 8 | Iveth | L'Étudiant lui-même | — |

**Contradiction majeure secondaire :** Era3 décrit 8 disciples engagés idéologiquement (incluant des non-Liés convaincus). Era4 décrit 7 Liés dont **un recruté par tromperie** (Boran Shult). Ces deux portraits de groupe sont mutuellement exclusifs.

**Confirmation dans `Chronologie.md` :**
La note de la page maîtresse confirme la contradiction : *« Incohérence à résoudre : le Cercle des Huit porte deux jeux de noms différents »* — les noms d'Era3 y sont désignés comme canoniques.

---

### 1.2 [SIGNIFICATIF] Éthere Cendris — conflit de nom, de filiation et de domaine

Trois entrées contradictoires sur le même Éthere (ou ce qui semble être le même) :

| Fichier | Nom | Parents | Domaine |
|---------|-----|---------|---------|
| `Era1_Etheres_Panghor.md` ligne 92 | **Embrasur** | Flamara × Terranu | Lave, coulées volcaniques, roche en fusion |
| `Era1_Etheres_Panghor.md` ligne 107 | **Cendrix** | Flamara × Aerion | Cendres volcaniques en suspension |
| `Era4_Arrachement.md` ligne 267 | **Cendris** | Flamara × Terranu | Lave, roche en fusion (se surcharge après l'Arrachement) |

**Problème :** Era4 attribue à *Cendris (Flamara × Terranu)* exactement le domaine et la filiation d'*Embrasur*. Ce sont deux noms différents pour le même être ? Ou Era4 a confondu les deux Éthérés ? La coexistence d'Embrasur et de Cendrix dans Era1 est cohérente (deux Éthérés distincts issus de Flamara mais avec des seconds parents différents). L'apparition de « Cendris » dans Era4 rompt cette cohérence.

---

### 1.3 [MODÉRÉ] Harrath — ambiguïté entre deux personnages distincts

| Fichier | Période | Action |
|---------|---------|--------|
| `Era2_Berceaux.md` | ~34 000 av.A | Un Guide-de-Piste « refuse de migrer » et **reste** — découverte de l'agriculture |
| `Era2_Gel_Reconstruction.md` | ~29 900 av.A | « Harrath-qui-Reste » **organise la migration vers le sud** |

Ce sont deux personnages à 4 000 ans d'intervalle dont les actions sont **inverses** (l'un reste, l'autre organise la migration). Le personnage du Gel n'est nommé explicitement « Harrath-qui-Reste » que dans Era2_Gel ; le Guide de Era2_Berceaux n'est pas nommé. Il est possible qu'il n'y ait pas de lien, mais le nom et le pattern ("qui reste") créent une confusion potentielle. À clarifier ou différencier explicitement.

---

### 1.4 [MINEUR] Navoria / Navoris — variation orthographique potentiellement problématique

- La capitale est désignée **Navoria** (ville, `Era4_Arrachement.md`, `Era3_Lien_Empires.md`).
- L'empire est désigné **Thalassocratie de Navoris** (avec un -s final).
- Dans `Era4_Arrachement.md` ligne 221 : « **Navoris Celeste** » (la cité volante).

Cette variation ville/empire est cohérente si intentionnelle (comme « Paris » vs « Parisii »). Mais elle mérite d'être documentée comme convention délibérée pour éviter les confusions lors de futures extensions.

---

## 2. Incohérences chronologiques

### 2.1 [SIGNIFICATIF] Vael'Kurash et la Théocratie de Celith — décalage de 500 ans

Dans `Era3_Lien_Empires.md`, section sur la chute de Lithane :
> *« Dans les temples Vael'Kurash sur Alkaran, les prêtres tentent de contacter Spiritus et Arborius — silence total. Pour la première fois en **20 000 ans**, les entités ne répondent pas. »* (cet événement se déroule à An 0)

Si l'on remonte 20 000 ans depuis An 0, on obtient ~20 000 av.A — ce qui correspond à la découverte du Lien par les trois Découverts (Orvane, Khatun, Ildaran). Cohérent en soi.

Cependant, l'origine de Vael'Kurash est documentée dans `Era3_Lien_Empires.md` :
La **Theocratie de Celith** démarre à ~17 000 av.A et crée le premier système d'écriture vers ~16 000 av.A. Vael'Kurash est une religion institutionnelle spécifique à Alkaran. Or la **Confédération d'Alkarath** commence à ~16 000 av.A. Il est attendu que Vael'Kurash émerge au sein ou à la suite de cette Confédération.

**Problème concret :** Si Vael'Kurash est lié à la Confédération d'Alkarath (~16 000 av.A), la phrase « pour la première fois en 20 000 ans » daterait le premier contact à 20 000 av.A — soit 4 000 ans **avant** la Confédération. Cette formulation paraît trop large ou approximative.

**Point connexe dans `Era3_Religions_Chute.md` :** Vael'Kurash est présenté comme débutant à ~17 500 av.A, mais la Théocratie de Celith — qui est l'entité institutionnelle susceptible de générer ou concurrencer Vael'Kurash sur Alkaran — ne débute qu'à ~17 000 av.A. Le décalage de 500 ans peut être volontaire (Vael'Kurash précède Celith) ou accidentel.

---

### 2.2 [MODÉRÉ] Continuité des 7 Grands Empires vers les 6 Empires pré-Arrachement

Dans `Era3_Lien_Empires.md`, les 7 Grands Empires historiques sont listés avec leurs périodes de fin :

| Grand Empire (historique) | Fin approximative |
|--------------------------|-------------------|
| Dominat de Pyrevaste | ~14 500 av.A |
| Theocratie de Celith | ~13 000 av.A |
| Confederation d'Alkarath | ~11 500 av.A |
| Khalifat de Solvenar | ~7 500 av.A |
| Saint-Empire d'Endara | ~5 000 av.A |
| Royaume des Songes d'Ithalorn | ~3 500 av.A |
| Ligue Marchande d'Everthor | ~1 500 av.A |

Les 6 Empires pré-Arrachement (coexistants à An 0) sont :
> Hégemonie d'Aethran, Dominat de Pyrion, Empire de Lithane, Sanctuaire d'Orivane, Thalassocratie de Navoris, Union des Flammes

**Problème :** Ces deux listes ne se recoupent pas — aucun nom commun. Le texte dit que les 6 Empires pré-Arrachement sont des « successeurs » des 7 Grands Empires, mais aucune lignée de succession n'est tracée pour la **Thalassocratie de Navoris**. Azoria et les routes maritimes correspondent à la Ligue Marchande d'Everthor — mais Navoris n'a pas d'équivalent dans la liste des 7 Grands Empires. Soit Navoris est une émergence *ex nihilo* (possible mais non documentée), soit un Grand Empire précédent aurait dû couvrir son territoire.

---

### 2.3 [MODÉRÉ] La découverte du Lien et la Theocratie de Celith — fondation trop rapide

La découverte du Lien par Orvane est datée de ~20 050 av.A. La propagation du Lien est estimée à ~1 000 ans. La Theocratie de Celith — institution religioso-politique mature avec caste sacerdotale, système d'écriture, et « Porteurs-de-Verdure » — commence à ~17 000 av.A.

Entre ~20 050 et ~17 000 av.A, il y a 3 000 ans. Ce délai est en réalité suffisant, mais il vaut noter que le texte de la Theocratie de Celith indique qu'elle émerge quand les pratiquants du Lien-de-l'Arbre « acquièrent suffisamment d'influence politique » — et que le premier système d'écriture complet n'est créé qu'à ~16 000 av.A (soit 1 000 ans après la fondation). La chronologie interne de Celith est globalement cohérente.

---

## 3. Incohérences causales (entre ères)

### 3.1 [SIGNIFICATIF] Boran Shult — trompé ou convaincu ?

`Era3_Religions_Chute.md` décrit le Cercle des Huit (dans la liste Era3) comme un groupe idéologiquement homogène de Vérithaniens convaincus, dont deux membres sont non-Liés par choix philosophique (Vorath et Kayara). Tous paraissent être des militants du mouvement.

`Era4_Arrachement.md` introduit Boran Shult comme un membre qui **ignorait totalement** le but réel du rituel :
> *« Boran Shult (Evertia, Lié-du-Commerce) — tenu dans l'ignorance du but final, croit participer à un rituel de "mesure" du Lien »*

**Rupture causale :** Si l'on adopte la liste Era3 (les noms canoniques), aucun des 8 membres n'est décrit comme potentiellement trompé — la composition idéologique est uniforme. La trahison et la tromperie de Boran Shult (Era4) constituent un élément narratif fort et bien développé qui disparaît complètement si l'on adopte les noms Era3.

Il y a un **choix forcé** : soit on garde les noms Era4 (avec la trahison de Boran Shult comme élément narratif), soit on garde les noms Era3 (sans trahison documentée). Les deux ne peuvent coexister sans réconciliation explicite.

---

### 3.2 [SIGNIFICATIF] Pelara Ash — meurt au rituel, mais ce prénom n'existe pas en Era3

`Era4_Arrachement.md` décrit Pelara Ash comme :
> *« sacrifiée la première »*, *« son Nœud, surchargé par la proximité, se rompt involontairement »*

C'est un événement dramatique et concret avec des conséquences physiques. Si Pelara Ash = Kayara (la non-Liée d'Era3), la mort par rupture involontaire de Nœud est impossible pour une non-Liée (pas de Nœud actif à rompre). Si Pelara Ash = Sera (Liée-du-Feu), la mort de ce personnage doit être réconciliée avec l'absence de Sera dans les récits post-Arrachement.

Aucune correspondance propre n'est possible sans modification délibérée du lore.

---

### 3.3 [MODÉRÉ] Cantor se tait à ~500 ap.A — mais sa mort n'est jamais causée

`Era4_Arrachement.md` (tableau des Cosmiques) :
> *« Cantor : écosystèmes maintenus par le Lien s'effondrent instantanément | Silencieux depuis ~500 ap.A — dort ou est mort »*

`Era7_Monde_Actuel.md` mentionne que Cantor est absent et que son fils Éthere Harmonex joue de manière plus triste depuis ~500 ap.A.

**Lacune causale :** L'Arrachement affaiblit Cantor (perte des écosystèmes maintenus par le Lien), mais le texte ne documente pas le mécanisme par lequel Cantor passe du silence post-Arrachement (An 0) au silence **total** à ~500 ap.A. 500 ans après l'Arrachement, que se passe-t-il ? Épuisement progressif ? Événement déclencheur ? La cause n'est pas établie.

---

### 3.4 [MODÉRÉ] Navigor — « quelqu'un l'a aidé à partir »

`Era4_Arrachement.md`, Vision de Merith :
> *« J'ai vu Navigor. Il ne part pas. Il est poussé. Quelqu'un l'a aidé à partir. Quelqu'un que nous n'avons pas vu. »*

Ce point est décrit dans le même fichier comme un **mystère ouvert volontaire** et l'un des piliers de la théologie Catena Fracta (Era7). Il n'y a donc pas d'incohérence — c'est un fil narratif délibérément incomplet. Documenté ici pour exhaustivité.

---

## 4. Incohérences de faits (chiffres et affirmations contradictoires)

### 4.1 [SIGNIFICATIF] Population post-Arrachement : 30 millions (Era4) vs 20-25 millions (Era5)

**Source Era4** (`Era4_Arrachement.md`, ligne 134) :
> *« Population mondiale : ~120 millions → **~30 millions en un an** (famine, effondrements, guerres) »*

**Source Era5** (`Era5_Grande_Nuit.md`) :
> *« Stabilisée autour de **20-25 millions** »* (années 50-200 ap.A)

**Contradiction :** Si la population atteint 30 millions à An 1, elle ne peut pas « se stabiliser » à 20-25 millions entre les années 50 et 200 sans un second effondrement documenté. Era5 décrit une période de Grande Nuit difficile mais pas une deuxième hécatombe de 5-10 millions. Soit Era4 surestime (devrait être ~20-25 millions), soit Era5 doit documenter une mortalité supplémentaire de 5-10 millions entre An 1 et An 50 (famines, épidémies, guerres secondaires).

**Chiffre terminal de la Grande Nuit (Era5) :** ~15-18 millions à ~3 000 ap.A. La tendance décroissante est cohérente en interne (25M → 18M sur 3 000 ans), mais le point de départ (30M vs 25M) reste la contradiction à corriger.

---

### 4.2 [SIGNIFICATIF] Endara « plus grande ville jusqu'à l'Ère VI » (200 000 hab.) vs Navoria (400 000 hab. — contemporaine)

**Source Era3** (`Era3_Lien_Empires.md`, ligne 276) :
> *« **Endara** (capitale impériale) : population de 200 000 — **la plus grande ville de l'histoire jusqu'à l'Ère VI**. »*

**Source Era4** (`Era4_Arrachement.md`, ligne 286) :
> *« Navoria [...] **population ~400 000 habitants**, plus grand port du monde, 3 000 ans d'histoire continue »*

**Contradiction directe :** Navoria (400 000 hab.) existe **simultanément** aux dernières périodes de l'Ère III. Le Saint-Empire d'Endara s'effondre à ~5 000 av.A ; la Thalassocratie de Navoris est un des 6 Grands Empires pré-Arrachement. Si Navoria atteint 400 000 avant l'Arrachement, Endara ne peut pas être « la plus grande ville jusqu'à l'Ère VI ».

**Solution possible :** Endara (200 000 à son apogée ~8 000 av.A) était effectivement la plus grande ville à son époque — mais Navoria la dépasse plus tard, vers ~2 000-1 000 av.A. La formulation d'Era3 est donc soit inexacte, soit elle devrait préciser *« jusqu'à la montée de Navoria »* plutôt que *« jusqu'à l'Ère VI »*.

---

### 4.3 [MODÉRÉ] Tisses — 0,3% de 30 millions = 90 000 (Era4) — cohérence interne

`Era4_Arrachement.md` (ligne 274) :
> *« Environ 0,3% de la population mondiale après l'Arrachement garde une connexion partielle (~90 000 individus sur 30 millions de survivants) »*

Le calcul est juste (0,3% × 30 millions = 90 000). Mais si la population réelle post-Arrachement est de 20-25 millions (selon Era5, voir §4.1), le nombre de Tisses devrait être de ~60 000-75 000. L'incohérence de population se propage ici. Non bloquant mais à corriger en cascade une fois le chiffre principal arbitré.

---

### 4.4 [MINEUR] La Cité volante de Cendara : « Cendal'Horun » ou une autre orthographe

`Era4_Arrachement.md` :
- Ligne 158 : **Cendal'Horun**
- Ligne 216 (tableau) : **Cendal'Horun**

Pas de contradiction interne dans Era4. Mais ce nom n'apparaît dans aucun autre fichier, à surveiller lors d'extensions.

---

## 5. Points flous et lacunes narratives

### 5.1 [MAJEUR] Le Sixième Éternel — statut non tranché

`Era0_Le_Vide.md` présente **Vacuus/l'Innommé/le Résidu** comme un potentiel sixième Éternel — résidu du processus de création, dont le statut est *« débat théologique non résolu »*. Il est mentionné dans la hiérarchie cosmique mais n'a aucun rôle documenté dans les Ères II à VII.

**Lacune :** Aucun effet de Vacuus n'est documenté sur les événements historiques. Les théologies mentionnées ne s'y réfèrent pas. Si c'est un mystère volontaire, il gagnerait à être raccroché à au moins un fil des Ères actuelles (Catena Fracta ? Déliés avancés ?).

---

### 5.2 [MAJEUR] L'Étudiant — identité, origin, formation

L'Étudiant est le personnage central de l'Ère IV. Sa préparation (An ~30 av.A → An 0) est détaillée, mais les informations suivantes restent entièrement absentes :

- Son nom réel (aucun fichier ne le donne)
- Son continent d'origine
- Sa formation de base (quelle académie du Lien ? quelle tradition ?)
- Comment il a connu Verithan ou ses écrits
- Les ~30 années de préparation : avec qui, comment, financement

Ce vide est peut-être intentionnel (mystère narratif). Si c'est le cas, il devrait être explicitement labellisé comme tel dans le fichier lore, comme l'est la Vision de Merith.

---

### 5.3 [MODÉRÉ] Le Transit de portail interrompu — sort des victimes

`Era4_Arrachement.md`, scène du portail à la fermeture :
> *« la moitié [de la caravane] dans le néant. Aucun corps retrouvé. »*

Ce point est mentionné de manière dramatique mais jamais exploré. Sont-ils morts ? Teleportés ailleurs ? Dans une Faille temporelle de Tempora ? Le lien avec les Failles du Temps créées lors de l'Arrachement semble évident, mais n'est jamais établi explicitement.

---

### 5.4 [MODÉRÉ] La Chose sous le Glacier — référence orpheline

`Era5_Grande_Nuit.md` (ou `Era7_Monde_Actuel.md`) mentionne une présence ou entité sous les glaces de Cestra, liée au Mont Jumeau enterré sous les glaces de Glacien. Ce point est cohérent avec `Era1_Etheres_Panghor.md` (le Mont Jumeau encore intact selon les Déliés méditants).

**Lacune :** Aucune interaction concrète entre Glacien (qui a *absorbé* le Mont Jumeau selon Era1) et la possible présence au cœur du mont n'est documentée. Si Glacien a absorbé l'énergie du Mont Jumeau, est-il le Éthere le plus puissant du monde actuel (comme suggéré en Era1) ? Ce point est ouvert sans être traité dans les Ères VI-VII.

---

### 5.5 [MODÉRÉ] L'Expédition d'Ulinor — bilan narratif incomplet

`Era1_Etheres_Panghor.md` décrit une expédition académique à Ulinor dont 3 membres sur 5 sont « restés volontairement » et subissent une « absorption par le végétal ». Les 2 rescapés développent des signes physiques (peau ramifiée, communication par gestes lents).

Ces deux survivants ne réapparaissent dans aucun autre fichier. Leur sort — et les implications pour l'état actuel de Selvara en Ère VII — n'est pas documenté. Un suivi minimal dans Era7 serait attendu.

---

### 5.6 [MODÉRÉ] Le passage de la Theocratie de Celith au Vael'Kurash (Alkaran)

`Era3_Religions_Chute.md` établit Vael'Kurash (~17 500 av.A) comme religion alkarianne. Or le texte de la Theocratie de Celith dans `Era3_Lien_Empires.md` mentionne explicitement que les « Ecoutes-Profondes exilées » s'installent sur le nord d'Ilthara. Il n'y a pas de connexion documentée entre ces exilés et Vael'Kurash d'Alkaran — ni aucune relation entre les deux institutions, bien qu'elles soient contemporaines et géographiquement proches.

---

### 5.7 [MINEUR] Le Fleau des Failles — non détaillé

`Era4_Arrachement.md` (section Verithani, vers ~1 400-1 600 ap.A) et `Era5_Grande_Nuit.md` mentionnent le Fléau des Failles qui tue 40% des survivants restants et persécute les Tisses. Aucun fichier ne détaille :

- La nature exacte du Fléau (maladie ? phénomène de Faille ? guerre ?)
- Son origine causale
- Sa résolution

C'est un événement qui transforme la démographie et la politique de l'Ère V, sans entrée de lore dédiée.

---

## 6. Propositions d'amélioration

### 6.1 Résoudre l'incohérence du Cercle des Huit (priorité absolue)

**Option A — Adopter Era4 comme canonique :**
Remplacer les 8 noms d'Era3 par les noms d'Era4 (Serna Veld, Orath Koss, etc.). Avantages : Era4 est plus développé (portraits individuels, destins documentés, trahison de Boran Shult). Inconvénients : les deux membres non-Liés (Vorath, Kayara) disparaissent — implique de retravailler la thématique de l'inclusion des Déliés dans le rituel.

**Option B — Adopter Era3 comme canonique :**
Remplacer les noms d'Era4 par ceux d'Era3. Avantages : les noms Era3 sont déclarés canoniques par `Chronologie.md`. Inconvénients : toute la section portraits d'Era4 doit être réécrite avec les nouveaux noms. La trahison de Boran Shult doit être assignée à un autre personnage ou supprimée.

**Option C — Réconciliation partielle (recommandée) :**
Conserver les noms Era4 (plus développés) mais les déclarer comme les noms complets dont les noms Era3 sont des surnoms ou formes courtes : Serna Veld → *Sera*, Orath Koss → *Vorath* (son nom de code/pseudonyme Vérithanien), etc. Cela nécessite une table de correspondance explicite dans `Chronologie.md`. La non-Liée Kayara d'Era3 pourrait correspondre à Boran Shult (trompé, donc non militant au sens philosophique). Kayara non-Liée est différente d'un membre trompé, donc cette correspondance reste imparfaite — mais elle préserve les deux thématiques.

---

### 6.2 Clarifier l'Éthere Cendris / Embrasur / Cendrix

**Action proposée dans `Era4_Arrachement.md` :** Remplacer « Cendris (Flamara × Terranu) » par « Embrasur (Flamara × Terranu) » — conformément à la liste d'Era1. Cendrix (Flamara × Aerion) est l'Éthere distinct des cendres en suspension.

Si Cendris est intentionnellement un **troisième** Éthere, il doit être ajouté à la liste des 45 Éthérés dans `Era1_Etheres_Panghor.md` avec ses parents et son domaine propre — et Embrasur doit être distingué de lui de manière explicite.

---

### 6.3 Arbitrer le chiffre de population post-Arrachement

Choisir **un** chiffre cohérent entre Era4 et Era5 :

- **Si An 1 = 30 millions** : Era5 doit documenter une deuxième hécatombe (épidémie, famine prolongée, Errants-sans-Corps) entre An 1 et An 50 expliquant le passage à 20-25 millions.
- **Si An 1 = 20-25 millions** : Modifier Era4 ligne 134 de « ~30 millions » à « ~20-25 millions ».

La deuxième option est la plus simple. La première est narrativement plus riche.

---

### 6.4 Corriger la formulation « plus grande ville jusqu'à l'Ère VI »

Dans `Era3_Lien_Empires.md`, ligne 276 : remplacer :
> *« la plus grande ville de l'histoire jusqu'à l'Ère VI »*

par :
> *« la plus grande ville de son époque (apogée ~8 000 av.A), dépassée plus tard par Navoria »*

---

### 6.5 Documenter le Fléau des Failles

Créer une entrée dédiée dans `Era5_Grande_Nuit.md` ou un fichier `Era5_Fleau_Failles.md`. Données minimales nécessaires : nature, durée, cause, résolution, impact démographique précis.

---

### 6.6 Connecter les fils ouverts de l'Ère VII aux mystères établis

Plusieurs mystères sont établis dans les fichiers antérieurs mais non repris dans `Era7_Monde_Actuel.md` :

- Le Mont Jumeau et Glacien : à connecter aux recherches des Déliés avancés en Era7
- La Vision de Merith (« quelqu'un a aidé Navigor à partir ») : déjà raccroché à Catena Fracta — bien géré, continuer dans cette direction
- L'Expédition d'Ulinor : ajouter une mention dans Era7 (sort des survivants, rapport académique confidentiel)
- Vacuus / Sixième Éternel : à raccrocher à au moins un culte ou ordre secret de l'Ère VII

---

## 7. Questions ouvertes prioritaires (pour décision de l'auteur)

Les points suivants nécessitent une décision narrative explicite — ils ne peuvent pas être résolus par analyse seule.

| # | Question | Impact si non tranché |
|---|----------|-----------------------|
| Q1 | **Noms canoniques du Cercle des Huit** : Era3 ou Era4 ? | Toute la section rituel d'Era4 est invalide sans décision |
| Q2 | **L'Étudiant a-t-il un nom ?** S'il n'en a pas (volontaire), le documenter comme tel | Confusion possible lors d'extensions |
| Q3 | **Cendris = Embrasur, ou troisième Éthere distinct ?** | Liste des 45 Éthérés incomplète ou incorrecte |
| Q4 | **Population à An 1 : 30M ou 20-25M ?** | Cascade d'incohérences (Tisses, Era5) |
| Q5 | **Vacuus / Sixième Éternel : mystère actif ou fond théologique passif ?** | Si actif, doit apparaître dans Era6 ou Era7 |
| Q6 | **Sort des victimes de portails interrompus** : morts, coincés dans les Failles, autre ? | Implication pour la géographie des Failles de Tempora |
| Q7 | **Cantor : dort ou est mort ?** | Impacts sur Harmonex (Era7) et sur la possibilité d'un réveil (enjeu narratif) |
| Q8 | **Harrath de l'agriculture (~34k av.A) et Harrath-qui-Reste (~29,9k av.A) : lien délibéré ?** | Confusion ou profondeur intentionnelle |

---

## Annexe — Récapitulatif des incohérences par niveau de priorité

| ID | Type | Niveau | Fichiers concernés |
|----|------|--------|-------------------|
| 1.1 | Noms | CRITIQUE | Era3_Religions_Chute.md ↔ Era4_Arrachement.md |
| 4.1 | Faits (population) | SIGNIFICATIF | Era4_Arrachement.md ↔ Era5_Grande_Nuit.md |
| 4.2 | Faits (ville) | SIGNIFICATIF | Era3_Lien_Empires.md ↔ Era4_Arrachement.md |
| 1.2 | Noms (Éthere) | SIGNIFICATIF | Era1_Etheres_Panghor.md ↔ Era4_Arrachement.md |
| 3.1 | Causal | SIGNIFICATIF | Era3_Religions_Chute.md ↔ Era4_Arrachement.md |
| 3.2 | Causal | SIGNIFICATIF | Era3 ↔ Era4 (mort de Pelara Ash) |
| 2.1 | Chronologique | SIGNIFICATIF | Era3_Religions_Chute.md, Era3_Lien_Empires.md |
| 2.2 | Chronologique | MODÉRÉ | Era3_Lien_Empires.md (Navoris sans prédécesseur) |
| 1.3 | Noms | MODÉRÉ | Era2_Berceaux.md ↔ Era2_Gel_Reconstruction.md |
| 3.3 | Causal | MODÉRÉ | Era4_Arrachement.md ↔ Era7_Monde_Actuel.md |
| 5.1 | Lacune | MAJEUR | Era0_Le_Vide.md (Vacuus) |
| 5.2 | Lacune | MAJEUR | Era4_Arrachement.md (identité de l'Étudiant) |
| 5.7 | Lacune | MODÉRÉ | Era4, Era5 (Fléau des Failles) |
| 4.3 | Faits (cascade) | MODÉRÉ | Era4 (nombre de Tisses) |

---

*Rapport clôturé. Aucune modification des fichiers lore n'a été effectuée. Ce document est consultatif.*
