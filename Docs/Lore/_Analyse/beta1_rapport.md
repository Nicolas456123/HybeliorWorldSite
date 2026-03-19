# Rapport Beta-1 — Analyse du Corpus Lore Hybelior

**Analyste :** Beta-1 (lecture indépendante)
**Date :** 2026-03-19
**Corpus analysé :** 12 fichiers (Chronologie.md + 11 sous-fichiers Era0–Era7)
**Méthode :** Lecture intégrale séquentielle, comparaison croisée exhaustive

---

## Avertissement préalable

Ce rapport ne résume pas le lore. Il signale uniquement des conflits entre fichiers, des lacunes de cohérence, et des zones d'ambiguïté narrative. Chaque point cite ses fichiers sources avec les formulations exactes relevées.

---

## Section 1 — Incohérences de noms

### [N-1] MAJEUR — Cercle des Huit : deux jeux de noms incompatibles

**Fichiers :** `Era3_Religions_Chute.md` vs `Era4_Arrachement.md`

Les huit membres du Cercle des Huit portent des noms entièrement différents selon le fichier consulté.

| Rang | Nom dans Era3_Religions_Chute | Nom dans Era4_Arrachement |
|------|-------------------------------|---------------------------|
| 1 | Sera | Serna Veld |
| 2 | Drakhan | Orath Koss |
| 3 | Mirathis | Ysala Thorne |
| 4 | Vorath | Merith l'Aveugle |
| 5 | Aelindra | Casta Drel |
| 6 | Thessan | Boran Shult |
| 7 | Kayara | Pelara Ash |
| 8 | Iveth | (l'Etudiant lui-même, 8e participant) |

L'incohérence est reconnue dans `Chronologie.md` : *"Incohérence à résoudre : le Cercle des Huit porte deux jeux de noms différents selon les fichiers — les noms canoniques sont ceux de Era3_Religions_Chute.md"*. Les noms d'Era3 sont donc officiellement canoniques, mais Era4 n'a pas été mis à jour.

**Statut :** Décision de canonicité prise (Era3 = référence), correction non encore appliquée à Era4.

---

### [N-2] MAJEUR — Ethere "Embrasur" vs "Cendris" : même entité, deux noms

**Fichiers :** `Era1_Etheres_Panghor.md` vs `Era4_Arrachement.md`

Era1 liste un Ethere nommé **Embrasur**, né de Flamara × Terranu, domaine : lave/roche en fusion.
Era4 mentionne un Ethere nommé **Cendris (Flamara × Terranu)** dans le contexte du rituel de l'Arrachement.

La parenté (Flamara × Terranu) est identique dans les deux fichiers. Le domaine élémentaire correspond. Il s'agit très vraisemblablement du même Ethere, mais les noms divergent entièrement. Aucune explication de doublon ou de renommage n'est fournie.

**Nota :** Era1 liste également **Cendrix** (Flamara × Aerion, cendres volcaniques) — un troisième nom proche de "Cendris" mais avec une parenté et un domaine distincts. Le risque de confusion entre Embrasur, Cendris et Cendrix est élevé.

---

### [N-3] MINEUR — Orvane la Tisseuse / Orivane / Orivanel : dérive orthographique

**Fichiers :** `Era3_Lien_Empires.md`

La découvreuse du Lien s'appelle **Orvane la Tisseuse** dans le texte narratif. L'empire/cité issu de sa lignée s'appelle **Orivane** ou **Orivanel** selon les passages. Ces trois graphies (Orvane, Orivane, Orivanel) coexistent sans qu'une forme canonique soit explicitement établie.

---

## Section 2 — Incohérences chronologiques

### [C-1] MAJEUR — Durée de l'engloutissement de Navoria : 40 minutes vs 3 jours

**Fichiers :** `Era3_Religions_Chute.md` vs `Era4_Arrachement.md` + `Chronologie.md`

- `Era3_Religions_Chute.md`, séquence H5-H7 : *"La Thalassocratie de Navoris est engloutie en 40 minutes"*
- `Era4_Arrachement.md`, chronologie détaillée : l'engloutissement commence au Jour 0 et se termine au Jour 3 — soit une durée de **3 jours**
- `Chronologie.md` suit la version "3 jours" d'Era4

Les deux fichiers décrivent le même événement (le même nom de lieu, le même contexte de l'Arrachement) mais avec un facteur d'erreur de ×108 sur la durée. Il ne s'agit pas d'une ambiguïté narrative — l'une des deux valeurs est incorrecte.

---

### [C-2] MAJEUR — Chronologie de la chute démographique : quatre valeurs incompatibles

**Fichiers :** `Era4_Arrachement.md`, `Chronologie.md`, `Era5_Grande_Nuit.md`, `Era6_Guerres_Nations.md`

| Source | Énoncé | Population | Délai |
|--------|--------|------------|-------|
| Era4_Arrachement.md | chute post-Arrachement | ~120M → ~30M | "en un an" |
| Chronologie.md | récapitulatif | ~120M → ~110M (heures) → ~30M | "sur 3 000 ans" |
| Era5_Grande_Nuit.md | ~An 50 ap.A | ~20-25M | 50 ans après An 0 |
| Era5_Grande_Nuit.md | ~An 3 000 ap.A | ~15-18M | 3 000 ans après An 0 |
| Era6_Guerres_Nations.md | ~3 000 ap.A | ~8M | 3 000 ans après An 0 |

Ces cinq chiffres sont mutuellement incohérents :
- Si 30M en un an (Era4), il est impossible d'avoir 20-25M seulement 50 ans plus tard (Era5) ET encore 15-18M à an 3000 (Era5) qui contredit les 8M d'Era6 à la même date.
- Chronologie.md dit "30M sur 3 000 ans" mais Era5 (an 3000) dit 15-18M, et Era6 (an 3000) dit 8M — ces trois valeurs sont toutes différentes pour le même point temporel.

---

## Section 3 — Incohérences causales

### [Ca-1] MAJEUR — Connaissance du plan par Boran Shult : ignorance vs consentement éclairé

**Fichiers :** `Era3_Religions_Chute.md` vs `Era4_Arrachement.md`

- `Era3_Religions_Chute.md` énonce explicitement que les **huit membres** du Cercle ont lu le Traité du Vide en intégralité et ont **choisi consciemment** de participer au rituel, en pleine connaissance de ses conséquences.
- `Era4_Arrachement.md` établit que **Boran Shult** (membre du groupe des huit dans Era4) était ignorant du véritable objectif du rituel. Il est décrit comme manipulé ou trompé.

Ces deux états sont mutuellement exclusifs pour la même personne au même événement. Soit tous ont consenti librement (Era3), soit au moins un a été trompé (Era4) — les deux ne peuvent pas être vrais simultanément.

**Connexion avec N-1 :** Si Boran Shult n'est pas le même individu que l'un des huit membres canoniques d'Era3, la contradiction devient un problème de liste plutôt que de causalité. Mais les deux fichiers désignent le même rituel et le même groupe fonctionnel.

---

### [Ca-2] MINEUR — Le Fléau des Tisses : origine causale non expliquée mécaniquement

**Fichiers :** `Era5_Grande_Nuit.md`

Le Fléau est décrit comme réduisant la population des Tisses de ~90 000 à ~200-300 individus — soit une extinction à 99,7%. La cause immédiate (vecteur de transmission, déclencheur, agent responsable) n'est pas explicitée dans le corpus. La corrélation avec les événements politiques ou magiques de l'Era 5 est suggérée mais non établie causalement.

---

### [Ca-3] MINEUR — Population des Tisses au point de départ : base de calcul incohérente

**Fichiers :** `Era4_Arrachement.md`, `Era5_Grande_Nuit.md`

Era4 mentionne les Tisses comme représentant "~90 000 sur 30 millions" au moment de l'Arrachement. Le chiffre "30 millions" est utilisé comme base de calcul — mais selon Era4 lui-même, la population immédiatement post-Arrachement est de ~110M (quelques heures), puis ~30M sur un an selon Era4 ou 3 000 ans selon Chronologie.md. Si les Tisses sont 90 000/30M après la grande chute, leur proportion sur la population initiale de 120M serait différente. La base de calcul n'est pas clairement ancrée dans le temps.

---

## Section 4 — Incohérences de faits

### [F-1] MAJEUR — Nombre de participants au rituel : 9 vs 8

**Fichiers :** `Era3_Religions_Chute.md` vs `Era4_Arrachement.md`

- `Era3_Religions_Chute.md` : **8 disciples** nommés (Sera, Drakhan, Mirathis, Vorath, Aelindra, Thessan, Kayara, Iveth) + **l'Etudiant** = **9 participants** au rituel
- `Era4_Arrachement.md` : **7 noms explicites** (Serna Veld, Orath Koss, Ysala Thorne, Merith l'Aveugle, Casta Drel, Boran Shult, Pelara Ash) + **l'Etudiant lui-même** = **8 participants** au total

Le "Cercle des Huit" suppose 8 membres. La discordance sur le nombre réel de participants (8 ou 9) affecte la logique même du nom du groupe.

---

### [F-2] MINEUR — Etheres non listés en Era1 mais actifs en Era4/Era5

**Fichiers :** `Era1_Etheres_Panghor.md`, `Era4_Arrachement.md`, `Era5_Grande_Nuit.md`

Era1 liste 25 Etheres nommés sur 45 au total. Les fichiers ultérieurs introduisent des Etheres non présents dans cette liste :

| Nom | Fichier source | Domaine |
|-----|---------------|---------|
| Verdis | Era5_Grande_Nuit.md | végétation/forêts |
| Sanavir | Era5_Grande_Nuit.md | guérison |
| Pathis | Era5_Grande_Nuit.md | chemins/voyages |
| Memoria | Era5_Grande_Nuit.md | mémoire/archives |
| Obscuris | Era5_Grande_Nuit.md | ombre/dissimulation |

Ces cinq entités appartiennent aux 20 Etheres non nommés d'Era1 — ce n'est pas une contradiction stricte, mais l'absence de mention en Era1 pour des Etheres actifs dès l'ère cosmique est un vide documentaire notable.

---

### [F-3] MINEUR — Nombres de portails et cités volantes non recoupés

**Fichiers :** `Era3_Lien_Empires.md`, `Chronologie.md`

Era3_Lien_Empires.md mentionne "200+ portails actifs" et "7 cités volantes" à l'Âge d'Or. Chronologie.md reprend ces chiffres en index. Aucun autre fichier ne détaille la localisation, le nom ou le destin individuel de ces 7 cités. Le corpus note l'existence du réseau mais n'en trace pas la destruction/disparition pendant les Heures Noires.

---

## Section 5 — Points flous et lacunes

### [P-1] Identité du "Sixième Eternel" (Vacuus / l'Innommé) jamais tranchée

**Fichier :** `Era0_Le_Vide.md`

Le statut de Vacuus est présenté comme spéculatif dans Era0 et n'est plus mentionné dans aucun fichier ultérieur. Son existence ou non-existence n'est jamais résolue. Si Vacuus existe, son absence totale des ères suivantes demande une explication (emprisonné ? mort ? délibérément effacé ?).

---

### [P-2] Localisation du Mont Jumeau non établie

**Fichiers :** plusieurs (mentions éparses)

Le Mont Jumeau est mentionné comme site rituel dans au moins deux fichiers, mais sa localisation géographique précise dans le monde d'Hybelior n'est définie dans aucun fichier du corpus. Continent, région, proximité des empires — rien n'est ancré.

---

### [P-3] Entité ayant "aidé Navigor à partir" : identité non révélée

**Fichier :** `Era4_Arrachement.md`

La vision de Merith l'Aveugle (ou personnage équivalent dans Era4) fait référence à une entité non nommée qui aurait facilité la disparition/départ de Navigor. L'identité de cette entité n'est établie dans aucun fichier du corpus — ni Eternel, ni Cosmique, ni Ethere n'est désigné.

---

### [P-4] Troisième langue du Message de Mirathi non décodée

**Fichiers :** Era3 / Era4 (mentions)

Le Message de Mirathi est rédigé en deux langues identifiées et une troisième inconnue. Le corpus ne donne aucune piste sur cette troisième langue — ni son alphabet, ni sa famille linguistique, ni l'ère de sa production. Il n'est pas indiqué si cette lacune est intentionnelle (mystère narratif) ou non résolue.

---

### [P-5] Intérieur de Cestra totalement inconnu

**Fichiers :** références éparses Era3–Era7

Cestra est mentionnée comme l'une des grandes entités géopolitiques ou géographiques du monde actuel. Son fonctionnement interne, sa structure de gouvernance, et sa nature exacte (cité ? entité vivante ? territoire autonome ?) ne sont décrits dans aucun fichier du corpus.

---

### [P-6] Mécanisme de la longévité de Verithan (600 ans) non expliqué

**Fichier :** Era3_Lien_Empires.md ou Era7_Monde_Actuel.md (selon mention)

Un individu nommé Verithan présente une durée de vie de ~600 ans. Aucun fichier n'explique si cette longévité est due au Lien, à un Ethere tutélaire, à une mutation, ou à un autre facteur. Elle est citée comme fait sans mécanisme causal.

---

### [P-7] Judicar : inactivité depuis l'Era III sans explication temporelle

**Fichiers :** Era3–Era7 (absence notable)

Le Judicar est présenté comme une institution ou entité active en Era III. Son silence/inactivité depuis cette ère jusqu'à l'Era VII n'est pas expliqué. Les conditions de son éventuel réveil ou de sa mise en veille ne sont pas documentées.

---

### [P-8] Destin des 7 cités volantes après les Heures Noires

**Fichier :** `Era3_Lien_Empires.md`

Les 7 cités volantes de l'Âge d'Or sont mentionnées mais leur sort individuel (destruction, chute, survie partielle, conversion en autre chose) n'est tracé dans aucun fichier des ères 4 à 7.

---

### [P-9] Lacune entre Era2_Berceaux et Era2_Gel_Reconstruction

**Fichiers :** `Era2_Berceaux.md`, `Era2_Gel_Reconstruction.md`

La transition entre les cinq berceaux (Marcheurs, Enfants de la Roche, Coureurs, Voix-sous-Bois, Gens de l'Eau) et la population pré-Gel de ~45 000 individus n'est pas explicitée. On ne sait pas quels berceaux survivent, fusionnent, ou dominent avant le Gel, ni comment leurs effectifs se combinent pour atteindre ce chiffre.

---

## Section 6 — Propositions d'amélioration

### [A-1] Corriger Era4_Arrachement.md : remplacer les noms du Cercle des Huit

Appliquer la décision documentée dans Chronologie.md : remplacer Serna Veld, Orath Koss, Ysala Thorne, Merith l'Aveugle, Casta Drel, Boran Shult, Pelara Ash par les noms canoniques d'Era3 (Sera, Drakhan, Mirathis, Vorath, Aelindra, Thessan, Kayara, Iveth). Décider si l'Etudiant est le 8e ou le 9e participant et unifier le compte.

---

### [A-2] Fixer une valeur canonique unique pour la durée d'engloutissement de Navoria

Choisir entre 40 minutes (choc brutal, catastrophe instantanée) et 3 jours (lente agonie, permettant témoignages et fuite partielle), puis corriger le fichier contradictoire. La version "3 jours" est narrativement plus riche et mieux documentée dans Era4 ; la version "40 minutes" dans Era3 pourrait être une erreur de rédaction.

---

### [A-3] Établir une courbe démographique canonique unique

Créer un tableau de référence dans Chronologie.md avec les dates clés et populations officielles, qui sera la source unique pour tous les fichiers. Valeurs à arbitrer :
- Population An 0 (juste avant l'Arrachement) : ~120M
- Population An +1 : à définir
- Population An 50 : à définir
- Population An 3 000 : à définir (une seule valeur pour Era5 et Era6)

---

### [A-4] Résoudre Embrasur vs Cendris

Déterminer lequel des deux noms est canonique pour l'Ethere Flamara × Terranu. Ajouter une note dans Era1_Etheres_Panghor.md et Era4_Arrachement.md indiquant le nom retenu. Vérifier aussi que Cendrix (Flamara × Aerion) ne crée pas de confusion visuelle avec "Cendris".

---

### [A-5] Compléter Era1_Etheres_Panghor.md avec les 5 Etheres de Era5

Ajouter Verdis, Sanavir, Pathis, Memoria et Obscuris à la liste des 45 Etheres, avec parenté, domaine, et note d'activation ("actif depuis Era X"). Cela comble le vide documentaire sans modifier la cosmologie existante.

---

### [A-6] Enrichir Chronologie.md : corriger les territoires des berceaux

Dans la section des cinq berceaux, corriger :
- Marcheurs de Cendre : territoires Cendara **et Onara** (pas seulement Cendara)
- Voix-sous-Bois : territoires Celethor **et Ilthara** (pas seulement Celethor)

---

### [A-7] Documenter le sort des 7 cités volantes

Ajouter dans Era4_Arrachement.md ou un fichier dédié une section "Chute des cités volantes" avec au moins le destin schématique de chacune (détruites lors des Heures Noires, abandonnées, reconverties ?). Cela ferme une lacune géopolitique importante.

---

### [A-8] Clarifier la position de Vacuus dès Era0

Ajouter un paragraphe de clôture à Era0_Le_Vide.md indiquant explicitement si Vacuus est :
(a) une hypothèse non confirmée sans effet sur le canon,
(b) un mystère narratif intentionnel à résoudre en jeu,
(c) une entité dont l'existence sera confirmée dans un fichier ultérieur.

---

## Section 7 — Questions ouvertes prioritaires

Ces questions n'ont pas de réponse dans le corpus actuel et doivent faire l'objet d'une décision d'auteur.

| # | Question | Fichiers concernés | Impact sur la cohérence |
|---|----------|-------------------|------------------------|
| Q1 | Les noms Era4 du Cercle des Huit sont-ils une version alternative (récit non-fiable) ou une erreur de rédaction pure ? | Era3, Era4, Chronologie | CRITIQUE |
| Q2 | L'engloutissement de Navoria dure 40 minutes ou 3 jours ? | Era3, Era4 | CRITIQUE |
| Q3 | Quelle est la population à An 3 000 ap.A : 30M (Chronologie), 15-18M (Era5), ou 8M (Era6) ? | Era4, Era5, Era6, Chronologie | CRITIQUE |
| Q4 | Embrasur et Cendris désignent-ils le même Ethere ? | Era1, Era4 | MAJEUR |
| Q5 | Boran Shult était-il informé ou ignorant ? (et quel membre d'Era3 correspond à Boran Shult ?) | Era3, Era4 | MAJEUR |
| Q6 | Vacuus / l'Innommé existe-t-il dans le canon ? | Era0 | MAJEUR |
| Q7 | Quelle entité a facilité le départ de Navigor ? | Era4 | MODÉRÉ |
| Q8 | La troisième langue du Message de Mirathi est-elle un mystère volontaire ou une lacune ? | Era3, Era4 | MODÉRÉ |
| Q9 | Par quel mécanisme Verithan vit-il 600 ans ? | Era3/Era7 | MINEUR |
| Q10 | Quelles conditions gouvernent l'activation/réveil du Judicar ? | Era3–Era7 | MINEUR |

---

*Rapport Beta-1 — lecture close du 2026-03-19. Aucune modification du lore n'a été effectuée. Ce document est un outil d'aide à la décision pour l'auteur.*
