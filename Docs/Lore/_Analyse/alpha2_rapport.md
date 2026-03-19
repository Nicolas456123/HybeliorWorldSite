# Rapport Alpha-2 — Analyse de cohérence du corpus Hybelior
**Analyste** : Alpha-2 (instance indépendante)
**Date** : 2026-03-19
**Corpus analysé** : 12 fichiers de lore, Era0 → Era7
**Statut** : Complet — toutes incohérences documentées

---

## Sommaire exécutif

L'analyse du corpus révèle **4 incohérences critiques**, **5 incohérences significatives**, et **8 points mineurs ou lacunes**. L'incohérence la plus grave est la double série de noms pour le Cercle des Huit entre Era3 et Era4, qui rend les deux fichiers mutuellement incompatibles sur l'identité même des personnages centraux de l'Arrachement. Une décision canonique est indispensable avant toute publication.

---

## 1. Incohérences de noms

### 1.1 — CRITIQUE : Double jeu de noms pour le Cercle des Huit

**Fichiers concernés** : `Era3_Religions_Chute.md` (noms canoniques désignés) vs `Era4_Arrachement.md`

Le Cercle des Huit possède deux listes de membres entièrement différentes. Les noms de Era3 sont déclarés canoniques par `Chronologie.md` (note explicite) et par Era3 elle-même.

| # | Era3 — NOM CANONIQUE | Origine / Trait | Era4 — NOM CONFLICTUEL | Origine / Trait |
|---|---|---|---|---|
| 1 | Sera de Celethor | femme, ~45 ans | Serna Veld | Cendara, Liée-du-Feu |
| 2 | Drakhan l'Aîné | homme, ~60 ans, Cendara | Orath Koss | Alkaran, Lié-de-Pierre |
| 3 | Mirathis | non-binaire, ~30 ans, Nysaria, Somnium Vigil | Ysala Thorne | Galenor, Liée-du-Vent, ~28 ans, "la plus jeune" |
| 4 | Vorath le Tacite | homme, ~50 ans, Baelor, non-Lié | Merith l'Aveugle | Ilthara, Lié-du-Rêve, né aveugle, homme |
| 5 | Aelindra de Pyrion | femme, ~35 ans, capitaine militaire | Casta Drel | Celethor, Liée-des-Forêts |
| 6 | Thessan l'Érudit | homme, ~25 ans (le plus jeune) | Boran Shult | Evertia, Lié-du-Commerce, tenu dans l'ignorance |
| 7 | Kayara-du-Large | femme, ~40 ans, navigatrice, Azoria | Pelara Ash | Endora, Liée-de-Feu secondaire, meurt en H1 |
| 8 | Iveth le Silencieux | homme, ~55 ans, Alkaran, Lien-des-morts | L'Étudiant | le 8e membre selon Era4 |

**Décision requise** : Utiliser exclusivement les noms de Era3. Réécrire Era4 pour substituer chaque référence.

**Note structurelle additionnelle** : Les deux fichiers divergent aussi sur la composition totale du groupe :
- Era3 : les 8 membres du Cercle sont distincts de L'Étudiant → 9 participants au Rituel
- Era4 : L'Étudiant est lui-même le 8e membre → 8 participants au Rituel

Cette divergence modifie la signification symbolique du nombre "huit" et doit être tranchée.

---

### 1.2 — CRITIQUE : Embrasur (Era1) vs Cendris (Era4) — même filiation, deux noms

**Fichiers concernés** : `Era1_Etheres_Panghor.md` vs `Era4_Arrachement.md`

- Era1 liste l'Éthéré #2 comme **Embrasur** (Flamara × Terranu — domaine : lave/volcans)
- Era4 cite **Cendris** (Flamara × Terranu — lave, roche en fusion) parmi les Éthérés renforcés post-Arrachement

Les deux noms partagent exactement les mêmes parents et le même domaine. Il s'agit soit du même être sous deux noms différents (erreur de cohérence), soit de deux Éthérés distincts avec des parents identiques (ce qui exigerait une justification cosmologique explicite, les Cosmiques n'ayant pas d'unions répétées documentées).

**Décision requise** : Choisir un nom unique. Le nom Era1 (**Embrasur**) est antérieur et probablement plus ancré dans le système.

---

### 1.3 — Mineure : Orvane / Orivane — personne vs institution

**Fichiers concernés** : `Era3_Lien_Empires.md`, `Era2_Berceaux.md`, `Era3_Religions_Chute.md`

La découvreuse du Lien se nomme **Orvane la Tisseuse** dans certains passages. L'un des empires successifs s'appelle **Orivane** (ou "Sanctuaire d'Orivane"). La similitude orthographique crée une ambiguité : le lecteur peut croire que l'empire a été fondé par et nommé d'après Orvane. Si c'est intentionnel, une phrase de confirmation le rend explicite. Si c'est une erreur de frappe, corriger l'un des deux noms.

---

## 2. Incohérences chronologiques

### 2.1 — CRITIQUE : Déclin de population post-Arrachement — "en un an" vs "sur 3 000 ans"

**Fichiers concernés** : `Era4_Arrachement.md` vs `Chronologie.md` (index) et `Era3_Religions_Chute.md`

- `Era4_Arrachement.md` : "La population mondiale passe à ~30 millions **en un an**"
- `Chronologie.md` (index, section population) : "~120M → ~30M **sur 3 000 ans**"
- Era3 décrit un processus de déclin graduel sur toute la Grande Nuit

Ces trois versions sont incompatibles. Un effondrement de 75 % de la population mondiale en douze mois est un événement d'extinction de masse instantanée, incompatible avec la narration de Era5 qui décrit des royaumes intermédiaires fonctionnels (Tharnok, Forgon, Drahk'Nor) et un Fléau des Failles survenant seulement ~1 500 ans après l'An 0.

**Décision requise** : La version "sur 3 000 ans" est cohérente avec le reste de Era5. Era4 doit être corrigé : soit le chiffre de 30M est faux (la population immédiate post-Arrachement est plus élevée), soit la formulation "en un an" est fausse.

---

### 2.2 — Significative : Grand Gel — taux de survie annoncé vs tableau chiffré

**Fichier concerné** : `Era2_Gel_Reconstruction.md`

- Le texte affirme une mortalité de **80 %** (20 % de survivants)
- Le tableau de population donne : ~45 000 habitants pré-Gel, ~12 300 survivants
- 12 300 / 45 000 = **27,3 %** de survivants, soit une mortalité de ~72,7 %, pas 80 %

Mineur numériquement mais visible à tout lecteur attentif. Corriger soit le texte ("environ 73 % de mortalité") soit les chiffres du tableau (~9 000 survivants pour 80 % de mortalité).

---

### 2.3 — Significative : Ère du Tissu Vivant — durée et placement

**Fichiers concernés** : `Era5_Grande_Nuit.md`, `Era6_Guerres_Nations.md`

Era5 situe la Grande Nuit de An 0 à ~3 000 ap.A. Era6 débute à ~3 000 ap.A avec les premières nations post-Grande-Nuit. Le Traité des Treize Continents est signé vers **9 500 ap.A** (64 signataires). Era7 situe le présent à **~10 200 ap.A**.

La cohérence globale de l'axe temporel est satisfaisante. Cependant, la "résurgence des Liés" en Era6 est décrite comme atteignant ~35 % de la population, puis Era7 indique un déclin vers ~30 %. Ce n'est pas une incohérence, mais la cause du déclin n'est pas expliquée (voir section 5).

---

## 3. Incohérences causales

### 3.1 — CRITIQUE : Consentement éclairé de Boran Shult vs doctrine du Cercle

**Fichiers concernés** : `Era3_Religions_Chute.md` vs `Era4_Arrachement.md`

- Era3 : Tous les membres du Cercle des Huit "avaient lu le Traité du Vide et comprenaient le coût. Aucun n'agissait par ignorance."
- Era4 : Boran Shult (Evertia, Lié-du-Commerce) "avait été convaincu de participer sans qu'on lui révèle la véritable nature du Rituel"

Ces deux affirmations sont directement contradictoires. Si Boran Shult a été trompé, la déclaration universelle d'Era3 est fausse. Si personne n'était ignorant, Era4 invente une trahison interne non documentée ailleurs.

Cette contradiction a des implications narratives majeures : la nature morale du Cercle (collectif responsable vs groupe manipulé) change entièrement selon la version choisie.

**Décision requise** : Trancher la question morale du Cercle. Si la tromperie est conservée, elle doit être mentionnée dans Era3 et ses conséquences narratives explorées.

---

### 3.2 — Significative : Mort de Pelara Ash au moment H1 — personnage non listé en Era3

**Fichiers concernés** : `Era4_Arrachement.md`, `Era3_Religions_Chute.md`

Era4 mentionne que "Pelara Ash, Liée-de-Feu secondaire d'Endora, meurt lors de la première heure du Rituel (H1)". Pelara Ash n'existe pas dans la liste canonique Era3. Si les noms Era3 sont canoniques, cette mort doit être réassignée à un membre nommé du Cercle Era3 (probablement Aelindra ou Drakhan, qui ont un profil feu/sacrifice).

L'absence de mort documentée dans Era3 laisse aussi une lacune narrative : le Rituel est-il présenté comme sans coût personnel pour les membres ? Cela affaiblit la tension dramatique.

---

### 3.3 — Significative : La Fracture du Panghor produit 13 continents — cohérence avec le Traité

**Fichiers concernés** : `Era1_Etheres_Panghor.md`, `Era6_Guerres_Nations.md`

Era1 : la Fracture produit exactement 13 continents (en 3 phases).
Era6 : le "Traité des Treize Continents" est signé par 64 nations (~9 500 ap.A).

Le titre du Traité confirme les 13 continents — cohérence satisfaisante. Cependant, aucun fichier ne dresse une liste nommée des 13 continents ni ne les cartographie. Era2 mentionne "futur Cendara/Onara" comme localisation des Marcheurs de Cendre, mais la relation entre noms de continents et noms de nations/régions n'est jamais établie explicitement. C'est une lacune documentaire, pas une incohérence à proprement parler.

---

## 4. Incohérences factuelles

### 4.1 — CRITIQUE : Hiérarchie cosmique — nombre d'Éthérés documentés

**Fichiers concernés** : `Era1_Cosmiques.md`, `Era1_Etheres_Panghor.md`

- La cosmologie déclare **45 Éthérés** au total
- `Era1_Etheres_Panghor.md` n'en liste que **25**
- Les 20 Éthérés manquants ne sont jamais mentionnés dans aucun fichier du corpus

Bien que cela puisse être intentionnel (Éthérés "mineurs" non détaillés), l'absence de toute mention de leur existence, leur domaine, ou leur destin crée un vide dans la cosmologie. Si 20 Éthérés ont disparu, été absorbés, ou restent dormants, cela mérite au minimum une note.

---

### 4.2 — Mineure : Cantor — filiation parentale

**Fichier concerné** : `Era1_Cosmiques.md`

Cantor est listée avec les parents **Eldoria × Arborius**. Arborius est lui-même un Cosmique (né d'Eldoria × Tempora en phase 3). Cantor serait donc à la fois l'enfant et le demi-frère/sœur d'Arborius sur la ligne Eldoria — à moins que la cosmologie des Éternels admette des unions entre Cosmiques de générations différentes.

Ce n'est pas formellement exclu, mais la mention explicite de ce mécanisme renforcerait la cohérence. Sans clarification, le tableau de filiation semble contenir une boucle généalogique implicite.

---

### 4.3 — Mineure : Âge de Thessan vs Ysala Thorne — "le plus jeune"

**Fichiers concernés** : `Era3_Religions_Chute.md`, `Era4_Arrachement.md`

- Era3 : Thessan l'Érudit, ~25 ans, est explicitement "le plus jeune membre"
- Era4 : Ysala Thorne, ~28 ans, est décrite comme "la plus jeune"

Outre le fait que ces personnages appartiennent à deux listes incompatibles, si l'intention était que le même personnage soit le plus jeune dans les deux versions, les âges sont incohérents (25 ≠ 28). Après harmonisation des noms, l'âge devra être uniformisé.

---

### 4.4 — Mineure : Tisses — effondrement numérique pendant le Fléau des Failles

**Fichier concerné** : `Era5_Grande_Nuit.md`

Le Fléau des Failles (~1 500 ap.A) fait passer les Tisses de ~90 000 à **200-300 individus**. C'est une réduction de 99,7 %. Aucun mécanisme causal ne précise pourquoi les Tisses — qui sont des praticiens du Tissu/Lien — seraient spécifiquement ciblés à ce degré d'extinction quasi-totale alors que la population générale ne perd "que" 40 %. Si intentionnel, le mécanisme doit être expliqué (ciblage magique ? vulnérabilité liée au Lien ?).

---

## 5. Points flous et lacunes

| # | Point | Fichier(s) concerné(s) | Impact |
|---|---|---|---|
| L1 | Les 20 Éthérés non documentés : domaine, statut, destin | Era1_Etheres_Panghor.md | Cosmologie incomplète |
| L2 | Cause du déclin des Liés (~35 % → ~30 %) entre Era6 et Era7 | Era6, Era7 | Manque de moteur narratif |
| L3 | Liste nommée des 13 continents et correspondance avec nations | Era1, Era6 | Désorientation géographique |
| L4 | Mécanisme de ciblage spécifique des Tisses par le Fléau des Failles | Era5 | Incohérence potentielle |
| L5 | Destin de Vorath le Tacite (non-Lié dans le Cercle) post-Rituel | Era3, Era4 | Personnage sans arc de résolution |
| L6 | Qu'est-il advenu des 6 empires simultanés pré-Arrachement après An 0 ? | Era3_Lien_Empires.md | Lacune historique |
| L7 | Le Lien est-il héritable ou acquis ? Mécanisme de transmission non précisé | Era2, Era3 | Flou mécanique fondamental |
| L8 | Les Éternels interviennent-ils après l'Arrachement ? Aucun signe depuis Era4 | Era4, Era5, Era6, Era7 | Absence cosmique inexpliquée |

---

## 6. Propositions d'amélioration

### P1 — Créer un fichier `_Canon_Noms.md` (priorité immédiate)

Un fichier de référence unique listant tous les noms canoniques (Éternels, Cosmiques, Éthérés, personnages clés, continents) avec une colonne "variantes rejetées". Cela évite les divergences futures entre fichiers créés à des moments différents.

### P2 — Réécrire Era4 pour aligner les noms du Cercle sur Era3

Substitution directe : chaque membre Era4 est réassigné au nom canonique Era3 le plus compatible thématiquement (ex : Merith l'Aveugle/Lié-du-Rêve → Mirathis/Somnium Vigil ; Orath Koss/Lié-de-Pierre → Iveth le Silencieux/Lien-des-morts via Alkaran). La compatibilité n'est pas parfaite et exigera des ajustements de caractérisation.

### P3 — Clarifier la structure du Rituel (8 ou 9 participants ?)

Décision à prendre sur la symbolique du nombre "huit" : est-il intrinsèque au Cercle (8 membres + L'Étudiant = 9) ou définit-il le Rituel lui-même (8 participants incluant L'Étudiant) ? Cette question structure la mythologie de l'Arrachement.

### P4 — Ajouter une note de bas de page dans Era4 sur Embrasur/Cendris

En attendant la décision canonique, insérer : "Note d'éditeur : le nom Cendris est à harmoniser avec Embrasur (Era1_Etheres_Panghor.md)."

### P5 — Documenter les 20 Éthérés manquants, même en une ligne chacun

Un tableau "Éthérés mineurs" avec nom, parents, domaine (une ligne) suffit à fermer la lacune cosmologique sans nécessiter de lore développé.

### P6 — Préciser le mécanisme de transmission du Lien

Une section courte dans Era2 ou Era3 (2-3 phrases) sur l'héritabilité du Lien résoudrait L7 et renforcerait la crédibilité du déclin des Liés en Era7.

---

## 7. Questions ouvertes prioritaires

| Priorité | Question | Impact sur le lore |
|---|---|---|
| **P1** | Quel est le nom canonique définitif de chaque membre du Cercle des Huit ? (Era3 ou Era4) | Bloquant pour Era4, biographies, tout récit post-Arrachement |
| **P2** | L'Étudiant est-il le 8e membre du Cercle ou un 9e participant extérieur ? | Structure symbolique de l'Arrachement |
| **P3** | Boran Shult a-t-il été trompé, ou tous les membres avaient-ils consenti en connaissance de cause ? | Moralité du Cercle, thème de la responsabilité collective |
| **P4** | Embrasur ou Cendris ? Quel nom pour l'Éthéré Flamara × Terranu ? | Cohérence cosmologique Era1↔Era4 |
| **P5** | La population post-Arrachement chute-t-elle en un an ou sur 3 000 ans ? | Échelle de la catastrophe, crédibilité de Era5 |
| **P6** | Pourquoi les Tisses sont-ils réduits à 200-300 individus alors que la population générale perd 40 % ? | Vraisemblance du Fléau des Failles |
| **P7** | Les Éternels sont-ils définitivement absents depuis l'Arrachement, ou préparent-ils un retour ? | Arc cosmologique global, finalité de l'histoire |

---

## Annexe — Correspondances de substitution proposées (Cercle des Huit)

Si la décision est de conserver les noms Era3 et de réécrire Era4, les correspondances thématiques suggérées sont les suivantes (approximatives — à valider par l'auteur) :

| Nom Era4 | Domaine Era4 | Nom Era3 proposé | Compatibilité thématique |
|---|---|---|---|
| Serna Veld (Cendara, Feu) | Liée-du-Feu | Drakhan l'Aîné (Cendara, forge) | Forte — même région, domaine feu |
| Orath Koss (Alkaran, Pierre) | Lié-de-Pierre | Iveth le Silencieux (Alkaran) | Forte — même région |
| Ysala Thorne (Galenor, Vent) | Liée-du-Vent | Aelindra de Pyrion (militaire) | Faible — domaine à adapter |
| Merith l'Aveugle (Ilthara, Rêve) | Lié-du-Rêve | Mirathis (Nysaria, Somnium Vigil) | Forte — même domaine onirique |
| Casta Drel (Celethor, Forêts) | Liée-des-Forêts | Sera de Celethor | Forte — même région |
| Boran Shult (Evertia, Commerce) | Lié-du-Commerce | Thessan l'Érudit (érudit) | Faible — à retravailler |
| Pelara Ash (Endora, Feu 2) | Liée-de-Feu, mort H1 | Kayara-du-Large (Azoria) | Très faible — à retravailler |
| L'Étudiant (8e) | — | Vorath le Tacite ou L'Étudiant | Dépend de la décision P2 |

---

*Rapport Alpha-2 — Analyse complète. Aucun jugement éditorial sur les choix narratifs de fond ; toutes les décisions de canonisation appartiennent à l'auteur.*
