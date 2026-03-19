# Rapport Gamma-2 — Analyse de cohérence du lore Hybelior

**Analyste :** Gamma-2 (session indépendante)
**Date :** 2026-03-19
**Fichiers analysés :** 12 (Era0 → Era7, index Chronologie.md)
**Méthode :** Lecture exhaustive cross-fichiers, comparaison systématique par catégorie

---

## 0. Avertissement de méthode

Ce rapport n'est pas un résumé du lore. Il consigne uniquement les contradictions, anomalies, lacunes et propositions d'amélioration relevées lors de la lecture croisée des 12 fichiers sources. Chaque entrée cite le ou les fichiers concernés et, quand applicable, les passages exacts.

---

## 1. Incohérences de noms

### 1.1 — PRIORITÉ MAXIMALE : Cercle des Huit — double nomenclature totale

**Fichiers :** `Era3_Religions_Chute.md` vs `Era4_Arrachement.md`
**Gravité :** Critique — deux versions mutuellement exclusives du même groupe

L'index `Chronologie.md` signale lui-même ce conflit dans ses Notes, indiquant que les noms d'Era3 sont canoniques. Malgré cette note, aucune correction n'a été apportée à Era4.

| Position | Era3_Religions_Chute.md | Era4_Arrachement.md |
|----------|-------------------------|----------------------|
| 1 | Sera de Celethor | Serna Veld |
| 2 | Drakhan l'Ainé | Orath Koss |
| 3 | Mirathis | Ysala Thorne |
| 4 | Vorath le Tacite | Merith l'Aveugle |
| 5 | Aelindra de Pyrion | Casta Drel |
| 6 | Thessan l'Érudit | Boran Shult |
| 7 | Kayara-du-Large | Pelara Ash |
| 8 | Iveth le Silencieux | (l'Etudiant) |

**Composition contradictoire :**
- Era3 : 8 disciples + l'Etudiant = 9 personnes au total. Le "Cercle des Huit" désigne les 8 disciples.
- Era4 : l'Etudiant est compté parmi les 8. Il ne reste que 7 autres noms. La composition est donc 7 + l'Etudiant = 8.

**Contradiction interne à Era4 :** Boran Shult est décrit comme "tenu à l'écart de l'objectif final". Or Era3 affirme explicitement que tous les membres du Cercle avaient lu l'intégralité du Traité du Vide. Ces deux états sont incompatibles.

**Action requise :** Choisir une liste canonique (Era3 recommandée par l'index) et réécrire Era4 en conséquence. Clarifier si l'Etudiant est le neuvième membre ou le fondateur non compté.

---

### 1.2 — Embrasur / Cendris — doublon d'Ethere

**Fichiers :** `Era1_Etheres_Panghor.md` vs `Era4_Arrachement.md`
**Gravité :** Majeure

- Era1 : **Embrasur** = Flamara × Terranu, domaine "lave, coulées volcaniques, roche en fusion"
- Era4 : **Cendris** = Flamara × Terranu, domaine "lave, roche en fusion"

Même filiation, même domaine, noms différents. Deux interprétations possibles :
1. Ce sont le même Ethere, renommé sans justification entre les deux fichiers.
2. Ce sont deux Etheres distincts issus du même couple parental, ce qui soulève la question de la multiplicité possible des naissances éthérées — jamais abordée dans les textes.

Dans les deux cas, il y a une incohérence documentaire non résolue.

---

### 1.3 — Etheres d'Era4 absents de la liste canonique d'Era1

**Fichiers :** `Era1_Etheres_Panghor.md` vs `Era4_Arrachement.md`
**Gravité :** Majeure

Era1 liste 25 Etheres de façon détaillée. Era4 introduit 6 Etheres supplémentaires sans les avoir jamais établis :

| Nom Era4 | Parents | Domaine | Statut dans Era1 |
|----------|---------|---------|-----------------|
| Verdis | Arborius × Aquor | végétation aquatique | Absent |
| Pathis | Navigor × Terranu | routes, chemins | Absent |
| Memoria | Somnix × Spiritus | mémoire collective | Absent |
| Sanavir | Spiritus × Arborius | guérison | Absent |
| Cendris | Flamara × Terranu | lave, roche | Doublon d'Embrasur |
| Obscuris | Noctis × Somnix | obscurité profonde | Absent |

Era1 précise que les Etheres sont "environ 45" et que seuls 25 sont détaillés. Ces 6 pourraient faire partie des 20 non-détaillés — mais la présence de Cendris (doublon) fragilise cette justification pour l'ensemble du groupe.

---

### 1.4 — "Lumasar" vs "Lunasar" dans la table des religions

**Fichier :** `Chronologie.md` (table Religions, entrée Somnium Vigil)
**Gravité :** Mineure (probable coquille)

L'index liste les territoires de la religion Somnium Vigil comme : "Vytharia, **Lumasar**, Baelor". Or :
- Lumasar est une nation de Galenor (identifiée ailleurs comme région marchande)
- Lunasar est une nation de Nysaria, la région associée aux mystères lunaires et à la contemplation, cohérente avec le Somnium Vigil

Il s'agit vraisemblablement d'une faute de frappe, mais la correction est nécessaire pour éviter une attribution géographique erronée.

---

## 2. Incohérences chronologiques

### 2.1 — Déclin de population post-Arrachement : timeline contradictoire

**Fichiers :** `Chronologie.md` vs `Era4_Arrachement.md`
**Gravité :** Majeure

Deux versions du même effondrement démographique :

| Source | Avant | Immédiat | Court terme |
|--------|-------|----------|-------------|
| `Chronologie.md` (index) | ~120M | ~110M (heures suivantes) | ~30M sur 3 000 ans |
| `Era4_Arrachement.md` | ~120M | — | ~30M **en un an** |

Ces deux comptes sont mutuellement exclusifs. L'index dit que les 90 millions de morts s'étalent sur 3 000 ans. Era4 dit que la chute à 30M se produit en un an. La seconde version rendrait l'Ere 5 (Grande Nuit, 3 000 ans) presque vide de toute dynamique démographique.

---

### 2.2 — Population en fin d'Ère 5 : deux chiffres incompatibles

**Fichiers :** `Chronologie.md` vs `Era5_Grande_Nuit.md`
**Gravité :** Majeure

- `Chronologie.md` : population survivante après 3 000 ans = **~30M**
- `Era5_Grande_Nuit.md` : population à ~3 000 ap.A = **~15-18 millions**

Écart de 12 à 15 millions non expliqué. L'une des deux sources est incorrecte, ou les deux mesurent des moments légèrement différents sans le préciser.

**Note de cohérence :** Si on adopte la logique d'Era4 (30M dès l'An 1), une chute supplémentaire à 15-18M sur 3 000 ans d'Ère 5 serait défendable. Mais si on adopte la logique de l'index (30M = fin des 3 000 ans), le chiffre d'Era5 contredit directement ce total.

---

### 2.3 — Durée de submersion de Navoria : ambiguïté "3 jours"

**Fichiers :** `Chronologie.md` vs `Era4_Arrachement.md`
**Gravité :** Mineure

L'index mentionne "3 jours" pour l'engloutissement de Navoria. La narration détaillée d'Era4 s'étend sur les Jours 0 à 3, ce qui pourrait signifier 3 jours complets ou 4 jours (J0 inclus). Pas une contradiction franche, mais une ambiguïté à clarifier selon la convention de décompte adoptée dans le monde.

---

## 3. Incohérences causales

### 3.1 — Boran Shult ignorant vs tous les membres informés

**Fichiers :** `Era3_Religions_Chute.md` vs `Era4_Arrachement.md`
**Gravité :** Majeure (dépend de la résolution du §1.1)

Era3 affirme : "Chacun des huit avait lu l'intégralité du Traité du Vide. Aucun ne pouvait prétendre ignorer ce vers quoi ils marchaient."

Era4 affirme de Boran Shult : il "participait sans connaître l'objectif véritable de l'opération, convaincu qu'il s'agissait d'un rituel de stabilisation."

Si les deux listes désignent le même groupe (ce qu'implique le nom "Cercle des Huit"), la contradiction est directe. Si la résolution du §1.1 établit qu'Era4 décrit un groupe distinct ou une réalité alternative, cette contradiction disparaît — mais crée alors un problème narratif plus profond (deux Cercles des Huit ?).

---

### 3.2 — Calcul des Tissés à An 0 : proportion incohérente

**Fichiers :** `Era4_Arrachement.md` et `Chronologie.md`
**Gravité :** Modérée

Era4 : "~90 000 Tissés sur ~30 millions de survivants à An 0" → 0,3% de la population.

Mais Chronologie.md indique qu'immédiatement après l'Arrachement, la population est de ~110M (non ~30M). Si l'Arrachement crée les Tissés au moment même de l'événement (An 0), le calcul devrait s'appliquer à la population d'alors :
- 0,3% de 110M = ~330 000 Tissés, non 90 000.
- 0,3% de 30M = 90 000 — mais ce chiffre de 30M n'est atteint qu'un an plus tard (selon Era4) ou sur 3 000 ans (selon l'index).

Le chiffre de 90 000 n'est cohérent que si on applique la proportion à une population de 30M au moment de la création des Tissés, ce qui nécessite de choisir et d'assumer l'une des deux chronologies du §2.1.

---

## 4. Incohérences de faits

### 4.1 — Territoires des Berceaux : omissions dans l'index

**Fichiers :** `Era2_Berceaux.md` vs `Chronologie.md`
**Gravité :** Mineure

| Peuple | Era2_Berceaux.md | Chronologie.md (index) |
|--------|-----------------|----------------------|
| Marcheurs de Cendre | futur Cendara / Onara | Cendara seulement |
| Voix-sous-Bois | futur Celethor / Ilthara | Celethor seulement |

L'index tronque les informations. Ce n'est pas une contradiction logique mais une perte d'information qui peut induire en erreur quiconque consulte uniquement l'index.

---

### 4.2 — Filiation de Cantor non recoupée

**Fichier :** `Era1_Cosmiques.md`
**Gravité :** Mineure — à surveiller

Cantor est listé comme enfant d'Eldoria × Arborius. Arborius est un Cosmique (nature/végétation), Eldoria est également Cosmique. Cette filiation n'est jamais questionnée, mais aucun autre fichier ne mentionne Cantor ni n'implique ses capacités. Sans cross-référence, cette donnée est isolée et risque d'être oubliée ou contredite dans les développements futurs.

---

## 5. Points flous et lacunes

### 5.1 — Le Sixième Eternel : mention sans développement

**Fichier :** `Era0_Le_Vide.md`
**Type :** Lacune narrative majeure

Era0 mentionne "dans de très anciens textes, certains évoquent un Sixième Eternel" sans jamais y revenir. Aucun autre fichier sur les 12 ne développe ce point. Cette mention crée une attente non comblée. Si ce sixième Eternel est un mythe in-universe, il doit être explicitement désigné comme tel. S'il est réel, son absence totale des ères suivantes est une lacune structurelle.

---

### 5.2 — Thyara, compagne de Verithan : personnage fantôme

**Fichier :** `Era3_Religions_Chute.md`
**Type :** Lacune narrative

Thyara est nommée comme la compagne de Verithan et joue un rôle dans la fondation du Verithanisme. Elle disparaît entièrement après Era3. Aucune mention dans Era4 (lors de l'Arrachement), Era5 (Grande Nuit), ni dans les mystères actifs d'Era7. Pour un personnage lié au fondateur de la religion dominante, cette absence est notable.

---

### 5.3 — Fragment Zéro : artefact non suivi

**Fichier :** `Era4_Arrachement.md`
**Type :** Lacune de continuité

Era4 mentionne que le Fragment Zéro (parchemin contenant les calculs de l'Arrachement) est "conservé dans les archives de l'Académie d'Altram". Ni Era6 ni Era7 ne font référence à cet artefact. Dans un contexte où Era7 liste 4 mystères cosmiques actifs, un parchemin contenant le mode opératoire de l'effondrement des Eternels semble directement pertinent — son absence des fils narratifs actifs est inexpliquée.

---

### 5.4 — Mont Jumeau : donnée cosmique orpheline

**Fichiers :** `Era1_Cosmiques.md` / `Era1_Etheres_Panghor.md` vs `Era7_Monde_Actuel.md`
**Type :** Lacune de connexion

Era1 mentionne que Glacien "absorbe" le Mont Jumeau sous les glaces de Cestra. Era7 liste le "Coeur de Cendra" comme l'un des 4 mystères cosmiques actifs, directement lié à la région de Cestra. La connexion entre le Mont Jumeau englouti et le mystère du Coeur de Cendra n'est jamais établie explicitement dans aucun fichier, alors qu'elle semble évidente et serait narrativement riche.

---

### 5.5 — Casta Drel et Pelara Ash : membres du Cercle sans substance

**Fichier :** `Era4_Arrachement.md`
**Type :** Lacune de développement

Parmi les 8 membres du Cercle selon Era4, 5 reçoivent un portrait individuel (Serna Veld, Orath Koss, Ysala Thorne, Merith l'Aveugle, Boran Shult). Casta Drel et Pelara Ash sont nommés mais n'ont aucun portrait, aucune action propre, aucun destin mentionné. Pour un groupe de 8 personnes responsables de l'événement fondateur du calendrier mondial, cette asymétrie de traitement fragilise la crédibilité du groupe.

---

### 5.6 — Royaumes intermédiaires d'Ère 5 : chronologie interne floue

**Fichier :** `Era5_Grande_Nuit.md`
**Type :** Lacune chronologique interne

Tharnok, Forgon et Drahk'Nor sont les trois royaumes intermédiaires de l'Ère 5. Le fichier ne précise pas :
- S'ils coexistent ou se succèdent
- Leurs dates d'émergence et de chute respectives
- Leurs positions géographiques par rapport aux futures nations d'Ère 6

Sans ces données, il est impossible de tracer une continuité entre la fin de l'Ère 5 et les 38 nations de l'Ère 6 documentées dans Era6_Guerres_Nations.md.

---

### 5.7 — Catena Fracta : origine et membres actuels non précisés

**Fichier :** `Era7_Monde_Actuel.md`
**Type :** Lacune informationnelle

La Catena Fracta est présentée comme une organisation centrale de l'Ère 7, mais le fichier ne précise ni sa date de fondation (Ère 6 ou Ère 7 ?), ni qui en sont les membres actuels nommés, ni sa structure hiérarchique. Pour une organisation présentée comme l'un des acteurs principaux du monde actuel, le manque de détail contraste avec le niveau de précision accordé aux guildes d'Ère 6.

---

## 6. Propositions d'amélioration

### 6.1 — Résoudre le Cercle des Huit en une opération de réécriture ciblée

**Priorité :** Immédiate

1. Adopter officiellement les noms d'Era3 comme canoniques (déjà indiqué dans l'index).
2. Réécrire Era4 pour remplacer les 7 noms alternatifs par les noms canoniques.
3. Décider : l'Etudiant est-il le 9e membre ou le fondateur non compté ? Documenter explicitement dans l'index.
4. Supprimer la note de contradiction de l'index une fois la réécriture achevée.
5. Corriger la contradiction Boran Shult/tous informés simultanément.

---

### 6.2 — Créer un fichier Era1_Etheres_Complementaires.md

**Priorité :** Haute

Plutôt que de laisser 6 Etheres flotter dans Era4 sans ancrage, créer un fichier dédié aux 20 Etheres non détaillés dans Era1. Y intégrer Verdis, Pathis, Memoria, Sanavir et Obscuris avec leurs fiches complètes. Statuer explicitement sur Cendris/Embrasur (doublon ou entités distinctes avec explication canonique).

---

### 6.3 — Unifier les tables démographiques dans Chronologie.md

**Priorité :** Haute

Ajouter une table démographique canonique à l'index avec :

| Moment | Population | Source canonique |
|--------|-----------|-----------------|
| Avant Grand Gel | ~45 000 | Era2_Berceaux |
| Post-Grand Gel | ~8 000-12 000 | Era2_Gel_Reconstruction |
| Age d'Or (Ère 3) | ~120M | Era3_Lien_Empires |
| An 0 (Arrachement) | ~110M | à décider |
| An 1 ou fin Ère 5 | ~30M | à arbitrer |
| Fin Ère 5 (~3 000 ap.A) | à arbitrer | Era5 vs Index |
| Ère 7 actuelle | à préciser | Era7 |

Cette table force à arbitrer les contradictions du §2.1 et §2.2 avant publication.

---

### 6.4 — Développer le Sixième Eternel ou le clore

**Priorité :** Moyenne

Deux options :
- **Option A (intégration)** : Faire du Sixième Eternel l'un des 4 mystères cosmiques actifs d'Era7, créant un lien direct Era0→Era7.
- **Option B (clôture)** : Ajouter dans Era0 une note explicite indiquant que ces "très anciens textes" sont des interpolations mythiques, sans fondement factuel dans la cosmogonie établie.

Laisser la mention telle quelle est la moins bonne option : elle crée une attente narrative non satisfaite.

---

### 6.5 — Relier Mont Jumeau, Glacien et Coeur de Cendra

**Priorité :** Moyenne

Ajouter dans Era7_Monde_Actuel.md (section Coeur de Cendra) une référence explicite à la données d'Era1 : "Selon les chroniques des Premiers Ages, le Cosmique Glacien aurait absorbé le Mont Jumeau sous les glaces de Cestra — ce que certains érudits lient directement au phénomène du Coeur de Cendra." Cela transforme une donnée orpheline en fil narratif exploitable.

---

### 6.6 — Compléter les portraits de Casta Drel et Pelara Ash

**Priorité :** Moyenne (conditionnelle à §6.1)

Une fois la liste canonique du Cercle arrêtée, donner à chaque membre un portrait minimal (rôle dans l'Arrachement, destin post-An 0, lieu de mort ou de survie connu). La symétrie narrative d'un groupe de 8 l'exige.

---

### 6.7 — Préciser la chronologie interne d'Ère 5

**Priorité :** Moyenne

Ajouter dans Era5_Grande_Nuit.md une frise interne avec les dates d'émergence et de chute de Tharnok, Forgon et Drahk'Nor, et une note sur leur rapport géographique aux futures nations d'Ère 6. Sans cela, la transition Ère 5 → Ère 6 reste narrativement opaque.

---

### 6.8 — Corriger "Lumasar" → "Lunasar" dans l'index

**Priorité :** Faible (coquille)

Dans la table des religions de `Chronologie.md`, ligne Somnium Vigil : remplacer "Lumasar" par "Lunasar".

---

### 6.9 — Compléter l'index sur les territoires des Berceaux

**Priorité :** Faible

Dans la table des Berceaux de `Chronologie.md` :
- Marcheurs de Cendre : ajouter "/ Onara" après "Cendara"
- Voix-sous-Bois : ajouter "/ Ilthara" après "Celethor"

---

## 7. Questions ouvertes prioritaires

Les questions suivantes n'ont pas de réponse dans les 12 fichiers et requièrent une décision éditoriale explicite avant toute publication ou développement ultérieur.

1. **Cercle des Huit — liste canonique :** Quelle liste est la bonne ? Era3 (8 disciples + l'Etudiant séparé) ou Era4 (7 + l'Etudiant compté) ? L'Etudiant est-il membre du Cercle ou son fondateur/superviseur ?

2. **Cendris vs Embrasur :** Sont-ils le même Ethere (renommé) ou deux entités distinctes issues des mêmes parents ? Si distincts, comment le lore justifie-t-il deux naissances éthérées identiques ?

3. **Chronologie des 90 millions de morts :** La chute de 120M à 30M se produit-elle en un an (Era4) ou sur 3 000 ans (Chronologie.md) ? Ce choix détermine entièrement la dynamique narrative de l'Ère 5.

4. **Le Sixième Eternel :** Mythe in-universe, entité réelle non développée, ou easter egg intentionnellement laissé sans réponse ? Le statut éditorial doit être consigné même s'il n'est pas publié dans le lore.

5. **Thyara :** Personnage dont le développement est délibérément abandonné après Era3, ou lacune involontaire ? Si le premier cas, sa disparition post-Arrachement devrait être expliquée dans Era4 (mort ? exil ? rôle dans la résistance ?)

6. **Fragment Zéro :** Artefact connu et accessible aux chercheurs de l'Ère 7, ou perdu/détruit entre-temps ? Sa présence aux archives d'Altram en An 0 ne garantit pas sa survie sur 10 000 ans.

7. **Catena Fracta — date de fondation :** Ère 6 ou Ère 7 ? Cette donnée est nécessaire pour situer l'organisation dans la continuité historique du monde actuel.

---

*Rapport Gamma-2 — Analyse complète. 12 fichiers sources. 4 incohérences majeures, 3 incohérences modérées, 4 incohérences mineures, 7 lacunes, 9 propositions d'amélioration, 7 questions ouvertes.*
