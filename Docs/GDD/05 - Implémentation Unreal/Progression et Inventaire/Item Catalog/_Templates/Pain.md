---
tags: [item, archétype, consommable, pain, cuisine, boulangerie]
type: archetype
category: Consommable
subcategory: Pain
source: Fabriqué
mastery: Cuisine / Boulangerie
craft_category: Cuisine
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-buff-stamina-playtest, action-lente-en-combat, pain-rituel-religions]
---

# 🥖 Archétype — Pain

> Deuxième archétype-référence de la **catégorie [[Catégories d'Items|Consommable]]**, sous-catégorie **Pain**. Pose le pattern canonique pour tous les **consommables solides à durée hors-combat** : pain, gâteaux, fromages, viandes séchées. Voir aussi [[Potion]] (référence consommable liquide à effet immédiat).

---

## 1. Vue d'ensemble

Le **pain** est l'aliment fondamental d'Hybelior — produit en quantité par les [[Boulanger|boulangers PNJ]] et par les joueurs ayant le métier [[Métiers|Boulanger]] ou [[Métiers|Cuisinier]] (voir [[Crafts]] §Cuisine). Sa fonction gameplay : **buff Stamina prolongé** + **effets secondaires culturels** (résistance, social, rituel).

**Ancrage gameplay :**
- Réponse économique de masse (pain = denrée commune, peu chère, partout)
- Buff de **longue durée hors combat** — complète les [[Potion|potions]] (burst en combat) sans les remplacer
- Outil de préparation pour les voyages, métiers physiques (mineur, bûcheron, forgeron)
- Composante des **rituels religieux** (pains rituels — voir [[Lore/Religions/00 - Système Religieux|9 religions canoniques]])

**Ancrage culturel :** chaque grande nation a son pain. Le pain est porteur d'identité — un Galenorien reconnaît le pain de Galenor, un Cendarien refuse le pain noir d'Alkaran. Voir §8 (signatures pays).

**Cohérence avec [[Boulanger]]** : ce fichier détaille les pains référencés dans le stock-type d'un PNJ Boulanger (Pain commun, Pain de campagne, Brioche, Pain noir/aux céréales rares, Pain rituel).

---

## 2. Variations / sous-types

> **6 sous-types canoniques** de pains. Chacun a son tableau d'effets (§3) et ses recettes (§6).

| Sous-type | Effet principal | Public | Notes |
|-----------|-----------------|--------|-------|
| **Pain commun** | Restaure Stamina | Aventurier de base, peuple | Recette T1 universelle, peu cher |
| **Pain de campagne** | Restaure Stamina + buff léger Endurance | Voyageurs, fermiers | T2, conservation +1 jour vs commun |
| **Pain noir** | Stamina + résistance froid / longue conservation | Nordiques, mineurs, soldats | T3, dur, dense — culture Alkaran/Skaldoria |
| **Brioche** | Stamina + buff Présence (social) | Nobles, fêtes, bourgeoisie | T2-T3, conservation courte (1j) |
| **Pain d'épices** | Stamina + résistance maladie / buff Mémoire | Mages, érudits, voyageurs longs | T3-T4, intrants épices (modificateur cuisine [[Catégories d'Items]] §Épices) |
| **Pain rituel** | Effet spécial selon **religion** | Fidèles, clergé, pèlerins | T4-T6, accessible uniquement Boulanger Maître + initiation religieuse — voir §7-8 |

> Le **pain rituel** se décline en **9 variants religieux** (1 par religion canonique) — voir [[Lore/Religions/00 - Système Religieux]]. Détail dans §8.

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Personnage]] / [[Combat]]** : Stamina max ~350-450, régen Stamina hors combat 80 pts/s. Le pain est conçu pour être bu/mangé **avant l'effort**, pas en réaction. Magnitude buff plus modeste qu'une potion, mais durée bien plus longue.

### 3.1 Pain commun (Stamina pure)

| Tier | Nom | Stamina rendu (instantané) | Buff Stamina sur durée | Durée buff | Conservation (jours) |
|------|-----|----------------------------|------------------------|------------|----------------------|
| 1 — Commun | Miche commune | +60 Stamina | — | — | 1 jour |
| 2 — Façonné | Pain de campagne | +120 | +5 régen Stamina/s | 5 min | 2 jours |
| 3 — Œuvré | Pain noir | +200 | +10 régen Stamina/s | 10 min | 5 jours |
| 4 — Magistral | Pain d'épices | +320 | +18 régen Stamina/s + buff stat | 15 min | 7 jours |
| 5 — Légendaire | Brioche royale | +500 | +30 régen Stamina/s + buff stat | 25 min | 7 jours |
| 6 — Mythique | Pain de l'Aube | +800 + 30% Stamina max temp | +50 régen Stamina/s + double buff stat | 40 min | 7 jours (instable, voir §9) |

### 3.2 Pain à buff stat (par sous-type)

> Le pain T3+ ajoute un **buff sur 1 stat brute** ([[Personnage]] couche 1) selon recette. Magnitude buff = 50% de la potion équivalente, durée = ×3 (compense la moindre puissance).

| Tier | Magnitude buff stat | Durée buff stat | Stat ciblée selon recette |
|------|---------------------|-----------------|---------------------------|
| 1 | — | — | — |
| 2 | +3 stat | 5 min | Endurance (Pain de campagne), Présence (Brioche simple) |
| 3 | +6 stat | 10 min | Endurance (Pain noir), Mémoire (Pain d'épices simple) |
| 4 | +12 stat | 15 min | Acuité, Mémoire, Endurance, Vigueur (selon recette) |
| 5 | +20 stat | 25 min | Stat au choix (Brioche royale) — bonus Présence + 1 stat |
| 6 | +35 stat | 40 min | Double stat (1 stat principale + 1 secondaire à demi-magnitude) |

### 3.3 Pain noir / résistance froid

| Tier | Résistance froid | Buff conservation alimentaire (sac) | Notes |
|------|------------------|--------------------------------------|-------|
| 3 | +20% résistance dégâts froid pendant 15 min | +1 jour conservation autres aliments transportés | — |
| 4 | +35% / 20 min | +2 jours | — |
| 5 | +50% / 30 min | +3 jours | — |

### 3.4 Pain rituel (religieux — voir §8)

| Tier | Effet rituel canonique | Durée | Condition |
|------|------------------------|-------|-----------|
| 4 | Bénédiction mineure (selon religion — buff thématique) | 30 min | Avoir Reconnaissance ≥ Initié dans la religion |
| 5 | Bénédiction majeure + bonus narratif (dialogues uniques avec clergé) | 1h | Reconnaissance ≥ Adepte |
| 6 | Bénédiction sacrée — effet unique par religion + bonus Renom (voir [[Mort]] §Reconnaissance vs Renom) | 2h | Reconnaissance ≥ Maître + initiation rituelle |

---

## 4. Mécanique d'usage

### 4.1 Action lente — manger un pain

> **Pattern canonique consommable solide.** Différent de la [[Potion]] (burst 1.5s) : manger un pain est une **action contemplative**.

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action manger** | 3s (T1-T2), 4s (T3-T4), 5s (T5-T6) | Animation de mastication visible |
| **Ralentissement marche** | −20% vitesse pendant l'action | Empêche de courir en mangeant |
| **Possible en sprint** | Non | Force la pause |
| **Possible en saut** | Non | |
| **Interruption si dégâts subis** | Oui — annule le pain (perdu si l'action a commencé) **et** déclenche un cooldown 5s avant prochain essai | Cohérent avec l'esprit "consommé hors combat" |
| **Buff appliqué** | À la **fin** de l'action de manger (pas pendant) | Force l'engagement complet |

### 4.2 Compatibilité avec le statut "en combat"

> Voir [[Combat]] §Régénération — statut "en combat" actif tant que dégâts donnés/reçus < 5s.

| Contexte | Effet |
|----------|-------|
| **Hors combat (5s sans dégât)** | Effet pleine magnitude, durée standard |
| **En combat** | **Action manger BLOQUÉE** — interface affiche "Trop dangereux pour manger" | 
| **Sortie de combat** | Délai 2s avant possibilité de manger (animation de respiration / repli) |

> [!important] Décision design canonique
> Contrairement à la [[Potion]] (utilisable en combat, action 1.5s), le pain est **strictement hors combat**. Cela définit le rôle de la nourriture : préparation, pas réaction. Pousse les joueurs à manger **avant** un raid, pas pendant.

### 4.3 Cumul de buffs alimentaires

| Mécanique | Valeur |
|-----------|--------|
| **Cooldown manger** | Aucun cooldown (mais durée action et statut "en combat" limitent l'abus) |
| **Cumul de pains** | 1 seul buff Pain actif à la fois — manger un nouveau pain **remplace** le buff actif (pas de stack) |
| **Cumul Pain + Potion** | **Oui** — sources différentes (voir [[Potion]] §10 "Décisions ouvertes") |
| **Cumul Pain + Boisson** | **Oui**, mais une seule "Boisson" et un seul "Pain" actifs simultanément |
| **Cumul Pain + Pain rituel** | Non — 1 seul buff alimentaire actif. Le pain rituel **prime** sur le pain ordinaire si consommé en même fenêtre |

---

## 5. Affixes / modificateurs spécifiques (10)

> Modificateurs appliqués par **[[Architecture Data-Driven|ItemModifier Generator]]** ou par recette signature. Cumul max : 2 affixes par pain T1-T3, 3 par T4, 4 par T5-T6.

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Pétri par un Maître** | Pas de cooldown 5s sur interruption — peut retenter immédiatement |
| 2 | **Cuit au feu sacré** ([[Lore/Religions/Ignis Aeternum\|Ignis Aeternum]]) | Magnitude +30% près d'un foyer/forge actif |
| 3 | **Nourrit l'âme** | Restaure aussi 10% de la perte d'Accord récente (voir [[L'Accord]]) — uniquement si religion concordante |
| 4 | **Doré** ([[Les Ères\|Rêve Lumineux]]) | Magnitude ×2 si consommé pendant l'Ère du Rêve Lumineux |
| 5 | **Conservation jurée** | Conservation × 3 mais magnitude initiale −15% |
| 6 | **Pain de partage** | Si donné à un autre joueur (commerce ou échange direct), bonus social Reconnaissance +1 dans la zone |
| 7 | **Ferment ancien** | Buff stat ×1.5 magnitude, durée ×0.5 |
| 8 | **Recette de famille** | Le pain consommé par un membre de la même guilde donne +5% buff |
| 9 | **Pain du Voyageur** ([[Les Ères\|Vents Bouleversants]]) | +1 jour conservation par voyage entamé (max 7 jours) — ne se dégrade pas en monture |
| 10 | **Pain du Souffle** | Résiste à la dégradation post-[[Le Souffle\|Souffle]] (cf. [[L'Accord]]) |

> **Affixes négatifs** (rouille post-Souffle T5-T6) : *Rassis* (−25% magnitude), *Moisi* (50% chance d'effet poison T1), *Effrité* (durée /2).

---

## 6. Recettes (Cuisine / Boulangerie — 1 par tier)

> Voir [[Crafts]] §Cuisine pour la station. Métier : [[Métiers|Boulanger]] (T1-T5) ou [[Métiers|Cuisinier]] (T1-T4) ou Boulanger-Maître (T6 + condition cachée). Mini-jeu canonique : **dosage assaisonnement + timing cuisson**.

### 6.1 Recette T1 — Miche commune (Pain commun)

| Aspect | Valeur |
|--------|--------|
| **Métier** | Boulanger ou Cuisinier |
| **Palier requis** | Novice |
| **Station** | Pétrin + Four à pain |
| **Intrants** | Farine × 2 ([[Sources de Ressources]] §Fabriqué), Liquide × 1 (Eau), Sel pincée × 1 |
| **Sortie** | 4× Miche commune |
| **Durée gameplay** | 60s (en simulation : 4h pour PNJ Boulanger — voir [[Boulanger]]) |
| **Mini-jeu** | Dosage simple (1 jauge eau/farine) + timing cuisson (1 jauge thermique) |

### 6.2 Recette T2 — Pain de campagne (Façonné)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Initié |
| **Station** | Pétrin + Four à pain + Plan de travail |
| **Intrants** | Farine × 3 (mélange de 2 céréales), Liquide × 1, Sel × 1, Graine × 1 (parfum), Levain mère × 1 (Émulsion fabriquée) |
| **Sortie** | 3× Pain de campagne |
| **Durée** | 90s |
| **Mini-jeu** | Dosage 2 jauges (hydratation + sel) + timing cuisson 2 phases (pousse + cuisson) |

### 6.3 Recette T3 — Pain noir (Œuvré)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Adepte |
| **Station** | Pétrin + Four à pain |
| **Intrants** | Farine de seigle × 4, Liquide × 1, Sel × 2, Graine × 2 (cumin, anis), Bière (Boisson) × 1 |
| **Sortie** | 2× Pain noir |
| **Durée** | 2 min |
| **Mini-jeu** | Dosage 3 jauges + timing cuisson long (jauge thermique tenue 30s sans surcuir) |

### 6.4 Recette T4 — Pain d'épices (Magistral)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Expert |
| **Station** | Pétrin + Four à pain + Atelier d'Apothicaire (pour les épices broyées) |
| **Intrants** | Farine × 3, Miel × 2 ([[Sources de Ressources]] §Nature), Épices × 4 (cannelle, gingembre, anis, clou de girofle), Œuf × 1, Liquide × 1, Beurre raffiné × 1 |
| **Sortie** | 2× Pain d'épices |
| **Durée** | 5 min |
| **Mini-jeu** | Dosage 4 jauges + timing thermique 3 phases + séquence d'incorporation des épices |

### 6.5 Recette T5 — Brioche royale (Légendaire)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Maître |
| **Station** | Pétrin + Four à pain + Atelier de pâtisserie |
| **Intrants** | Farine fine × 4, Œuf × 4, Beurre raffiné × 3, Miel × 2, Lait × 2, Sel × 1, Graine × 1 (vanille rare), Pigment alimentaire (or) × 1 |
| **Sortie** | 1× Brioche royale |
| **Durée** | 15 min |
| **Mini-jeu** | Dosage 6 jauges + timing thermique 4 phases (pousse 1 + pousse 2 + dorure + cuisson) |

### 6.6 Recette T6 — Pain de l'Aube (Mythique)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Maître + condition cachée 🔒 (pétrir au lever du soleil pendant l'[[Les Ères\|Ère du Rêve Lumineux]] OU avoir Reconnaissance Maître dans une religion solaire — [[Lore/Religions/Ignis Aeternum]] ou [[Lore/Religions/Ordo Caelum]]) |
| **Station** | Pétrin sacré + Four à pain rituel + Cercle d'enchantement |
| **Intrants** | Farine d'or × 3 (variant [[Les Ères\|Ère du Verdoiement]]), Miel solaire × 3, Œuf de phénix × 1, Beurre béni × 2, Lait sacré × 2, Larme d'Eldoria × 1 (composant rare), Cristal de Voie d'Eldoria × 1 |
| **Sortie** | 1× Pain de l'Aube (1 charge unique) |
| **Durée** | 1h (rituel ininterrompu) |
| **Mini-jeu** | Dosage 8 jauges + timing thermique 5 phases + séquence rituelle Maître + canalisation [[Le Lien\|Voie d'Eldoria]] palier Adepte minimum |

> **Pattern de recette canonique pain** : tier N requiert **N intrants principaux** (farine + 1-3 céréales/épices/parfums) + **(N-1) intrants enrichissants** (œuf, miel, beurre, lait) + **1 station de qualité ≥ T-1**. Les T5-T6 introduisent un **composant rituel** (cercle d'enchantement, ère active, cristal de Voie).

> **Variante Cuisinier** : peut faire les T1-T4 standards mais pas T5+. Un Cuisinier-Maître peut produire des pains régionaux (variant signature pays) mais pas le Pain de l'Aube T6.

---

## 7. Variants cosmiques (10 — par ère)

> Les **10 variants visuels** ([[Les Ères]] §Variants) modulent le pain fabriqué pendant ou avec des intrants d'ère. Magnitude inchangée, **propriétés secondaires modifiées**.

| Variant | Ère associée | Effet sur le pain |
|---------|--------------|-------------------|
| **Shadow** ([[Cosmologie\|Noctis]]) | Ombre Longue | Buff Stamina silencieux + +10% furtivité 10 min |
| **Spectral** ([[Cosmologie\|Tempora]]) | Échos Brisés | Buff démarre 5s avant la fin de l'action manger (anticipation temporelle) |
| **Frost** ([[Cosmologie\|Aquor]]) | Sommeil de Glace | Conservation × 3, buff résistance froid +15% inclus |
| **Verdoyant** ([[Cosmologie\|Spiritus]]) | Verdoiement | Buff régen Stamina hors combat doublé, mais durée /2 |
| **Brulé** (Voie de Feu) | Feu Endormi | +résistance feu 25%, mais magnitude Stamina −10% |
| **Pourpre** ([[Cosmologie\|Umbra]]) | Brume Mortelle | Immunité brume légère 30 min (cf. [[Les Ères]] §Brume Mortelle) |
| **Doré** ([[Cosmologie\|Eldoria]]) | Rêve Lumineux | Magnitude +25% si consommé de jour |
| **Brisé** ([[Cosmologie\|Tempora]] aigu) | Échos Brisés (variante) | 50% double durée / 50% durée /2 (gamble — cf. [[Potion]] §7) |
| **Onirique** ([[Cosmologie\|Somnix]]) | Sommeil Onirique | **Buff sommeil régénérateur** : si endormi pendant la durée du buff, régen Stamina ×2 et bonus Mémoire +10 |
| **Vénérable** ([[Cosmologie\|Fatum]]) | Présages | Buff prolonge sa durée si l'utilisateur est en quête (+50% durée par quête active) |

> **Pattern cohérent avec [[Potion]] §7** : un variant ne change jamais la magnitude brute, mais **module la temporalité, la condition d'application, ou ajoute un effet thématique**. Les pains rituels (T6+) ne peuvent être pétris que pendant l'ère ou la condition compatible.

---

## 8. Exemples de signatures (PHASE 4 stub)

### Pains signature par grand pays

- **Pain Spirale d'Onara** (T5, rituel [[Lore/Religions/Foedus Animae|Foedus Animae]])
  *Pain en spirale tressée représentant le passage entre vie et mort. Pétri par les [[Lore/Religions/Foedus Animae|Animari]] avec une farine mêlée à une pincée de cendre d'ancêtre. Effet : restaure Stamina + dialogue possible avec les esprits du lieu pendant 1h. Bonus narratif : les médiums reconnaissent un consommateur récent.*

- **Pain Volcanique de Cendara** (T4, rituel [[Lore/Religions/Ignis Aeternum|Ignis Aeternum]])
  *Cuit dans la chaleur résiduelle d'une coulée volcanique éteinte. Pierre noire en miette dans la croûte. Effet : Stamina + +25% résistance feu + +10 Vigueur 30 min. Bonus narratif : badge de loyauté à la Flamme Éternelle, accès aux temples-forges.*

- **Pain de Voyageur de Galenor** (T3, [[Les Ères\|Vents Bouleversants]] uniquement)
  *Pain rond, percé au centre pour être passé sur une corde de selle. Conservation +5 jours en monture. Effet : Stamina + +5 Endurance 10 min + immunité fatigue voyage. Recette favorite des caravaniers et marchands itinérants.*

- **Pain Noir d'Alkaran** (T3-T4, identité tribale [[Lore/Religions/Vael Kurash|Vael'Kurash]])
  *Dense et amer, conservé un mois. Marqueur d'appartenance au peuple du Nord. Effet : Stamina + résistance froid 35% + +5 Endurance. Bonus narratif : les chamanes alkarans reconnaissent un mangeur de leur pain comme un allié.*

- **Brioche Étoilée d'Astravia** (T5, rituel [[Lore/Religions/Ordo Caelum|Ordo Caelum]])
  *Brioche couverte de graines disposées en motif de constellation natale. Préparée par les [[Lore/Religions/Ordo Caelum|Stellari]] pour les cérémonies astrologiques. Effet : Stamina + +10 Acuité + +5 Mémoire 25 min. Bonus narratif : les astrologues acceptent de tirer un thème natal au consommateur.*

- **Pain Silencieux de Baelor** (T4, rituel [[Lore/Religions/00 - Système Religieux|Taciti]])
  *Pain sans levain, pétri en silence absolu pendant une nuit complète. Effet : Stamina + −80% bruit du joueur 30 min + +8 Mémoire. Bonus narratif : les Silentii acceptent un échange par gestes avec le consommateur.*

- **Pain de Pierre de Gryndor** (T4, rituel [[Lore/Religions/Lex Petra|Lex Petra]])
  *Pain dense, presque minéral, cuit dans des moules de granit. Effet : Stamina + +10 Vigueur + +20% résistance dégâts physiques 20 min. Bonus narratif : tribunaux de pierre acceptent le serment du consommateur.*

- **Pain Onirique de Vytharia** (T5, rituel [[Lore/Religions/Somnium Vigil|Somnium Vigil]])
  *Pain tâché d'herbes hallucinogènes douces. Effet : Stamina + +15 Esprit 25 min + facilite l'entrée en méditation profonde (+30% régen Mana en méditation). Bonus narratif : les [[Lore/Religions/Somnium Vigil|Vigili]] partagent leurs visions avec un consommateur.*

- **Pain du Cycle de Sylthara** (T5, rituel [[Lore/Religions/Rota Mundi|Rota Mundi]])
  *Pain rond marqué de runes saisonnières. Effet varie selon la saison de consommation : printemps = Vivacité, été = Vigueur, automne = Mémoire, hiver = Endurance.*

- **Pain Ancestral d'Ulinor** (T4, rituel double [[Lore/Religions/Vael Kurash|Vael'Kurash]] + [[Lore/Religions/Foedus Animae|Foedus Animae]])
  *Pain pétri en cavernes, parfumé à la sève d'arbre ancien. Effet : Stamina + communion 15 min avec l'esprit-ancien d'un lieu. Bonus narratif : déverrouille des dialogues d'esprits dans tout Ulinor.*

> Phase 4 prévoit **2-3 pains signature par grand pays** (~30 pays), **1 pain rituel par religion** (9 pains rituels canoniques) → ~80-100 pains signatures à terme. La table des religions dominantes par pays ([[Lore/Religions/00 - Système Religieux]]) sert de matrice.

---

## 9. Conservation, stockage, dégradation

> **Pattern canonique consommable solide cuit.** Le pain est plus périssable qu'une potion liquide scellée : la cuisson le rend vivant, fragile.

| Tier | Conservation par défaut | Conditions optimales | Dégradation |
|------|--------------------------|----------------------|-------------|
| 1 | 1 jour réel | Garde-manger frais | Rassis à J2, non comestible J3 |
| 2 | 2 jours | Garde-manger + linge | −20% magnitude J2, gaspillé J5 |
| 3 | 3-5 jours (selon recette) | Garde-manger + sel/conservation | −15% magnitude après pic, gaspillé J7 |
| 4 | 7 jours | Cave + emballage cire | −10% magnitude après J7, gaspillé J14 |
| 5 | 7 jours | Cave + emballage rituel | Stable pendant 7 jours, gaspillé J14 |
| 6 | 7 jours réels (instable) | Aucun stockage durable | **Mythique = volatile** : doit être consommé rapidement (cf. [[Potion]] §9 — pattern partagé) |

### Pattern conservation comparé (pour autres consommables solides)

| Type | Conservation T1 | Conservation T5 | Multiplicateur vs Pain |
|------|-----------------|-----------------|------------------------|
| **Pain** (référence) | 1 jour | 7 jours | ×1 |
| **Gâteaux** (festif) | 1 jour | 3 jours | ×0.7 (plus fragile) |
| **Fromage** (affiné) | 5 jours | 60 jours | ×5 (long terme) |
| **Viande séchée** | 7 jours | 90 jours | ×7 |
| **Fruits frais** | 1 jour | 3 jours | ×0.5 |
| **Poisson cuit** | 1 jour | 4 jours | ×0.6 |

### Conditions spéciales

- **Post-[[Le Souffle|Souffle]]** : pains T5-T6 −20% magnitude pendant 2 semaines (cf. [[L'Accord]])
- **[[Les Ères|Ère du Sommeil de Glace]]** : conservation × 2 sur tous pains stockés (effet froid)
- **[[Les Ères|Ère du Verdoiement]]** : levain et farines exceptionnelles, +1 tier de qualité possible
- **Pain rituel non consommé** : se "désanime" J7 → redevient pain ordinaire de tier équivalent (perd l'effet rituel)

---

## 10. Décisions ouvertes / chantiers de profondeur

### Décisions non tranchées

- [ ] **Action lente 3-5s en sécurité totale** : suffisamment dissuasif en zones contestées ? Ou ajouter pénalité supplémentaire ?
- [ ] **Cumul Pain + Boisson + Potion** : actuellement OK. À playtester pour ne pas créer de "stack" abusif. Proposition : pas plus de 3 buffs alimentaires actifs simultanément
- [ ] **Pain rituel et Reconnaissance** : faut-il une initiation explicite (quête religieuse) ou simple Reconnaissance suffit ? Penche pour **initiation explicite** (cohérent [[Lore/Religions/00 - Système Religieux|9 religions]])
- [ ] **Conservation en monture** : actuellement +1 jour si en sacoche de selle. À étendre pour caravanes ?
- [ ] **Pain joueur vs pain PNJ** : un pain acheté chez un boulanger PNJ est-il identique à celui crafté ? Décision préliminaire = **oui** (le boulanger PNJ a une recette publique, le craft joueur ouvre les variantes)
- [ ] **Variante Boulanger vs Cuisinier** : Cuisinier limité à T4 — à confirmer ou laisser flou ?

### Notes pour les autres archétypes consommables

> **Patterns canoniques solides (à dériver pour Boisson, Fruits, Légumes, Viande, Poisson, Fromage, Gâteaux, Champignons).**

#### Pattern action consommation

- **Pain / nourriture solide** : action lente 3-5s, **bloquée en combat**, cumul 1 buff alimentaire actif → **canonique**
- **Boisson** : action lente 2-3s (boire plus vite que mâcher), **possible en combat** mais pénalité (cf. [[Combat]] §statut "en combat"), durée buff plus longue que pain (effet liquide qui imprègne)
- **Fruits / Légumes / Champignons frais** : action courte 2s, magnitude /3 vs pain T équivalent (snack), conservation 1-3 jours
- **Viande / Poisson cuit** : action 3s, magnitude équivalente Pain, conservation +5 jours si séchage
- **Fromage** : action 2s, magnitude Pain T-1, conservation × 5 (longue durée — pattern unique)
- **Gâteaux** : action 3s, magnitude ×1.3 mais durée /2 (festif, burst social)

#### Pattern formule magnitude × durée

> **Loi canonique consommable** : `Magnitude × Durée ≈ constante par tier`. Le designer choisit le profil (burst court ou durée longue) en respectant l'enveloppe.

| Tier | Enveloppe magnitude × durée (Stamina) | Référence |
|------|----------------------------------------|-----------|
| 1 | 60 (ex: +60 instant OU +6/s × 10s) | Pain commun, fruit frais |
| 2 | 150 | Pain campagne, viande grillée |
| 3 | 300 | Pain noir, fromage affiné |
| 4 | 600 | Pain d'épices, brioche commune |
| 5 | 1200 | Brioche royale, fromage rare |
| 6 | 2500+ | Pain de l'Aube, festin légendaire |

#### Pattern recette cuisine

- **Mini-jeu canonique cuisine** : **dosage assaisonnement + timing cuisson** (T1-T3) + **séquence d'incorporation** (T4+) + **rituel/canalisation** (T5-T6)
- **Stations** : Pétrin + Four à pain (boulangerie), Fourneau + Plan de travail (cuisine), Affineur (fromage), Cuve à fermentation (boisson — rejoint Alchimie cf. [[Crafts]] §2)
- Tier N = N intrants principaux + (N-1) enrichissants + 1 station de qualité

#### Pattern pain rituel → consommable rituel généralisé

- 9 religions canoniques → 9 variants rituels possibles **par catégorie de consommable** (pain, boisson, viande)
- Effet rituel = effet thématique de la religion (cf. [[Lore/Religions/00 - Système Religieux]] : Lex Petra → résistance physique, Via Ventus → mobilité, Foedus Animae → communion morts, etc.)
- Condition : Reconnaissance dans la religion + initiation rituelle
- Tier 4-6 uniquement (rituel = haut effort)

#### Hooks pour Boisson (futur archétype frère)

> La **Boisson** est le frère liquide du Pain, mais hérite aussi de la [[Potion]] :

- Action lente 2-3s (entre Pain 3-5s et Potion 1.5s)
- Possible en combat avec malus (à différencier du Pain)
- Durée buff plus longue que Pain (×1.3-1.5)
- Magnitude buff plus modeste que Pain (×0.7-0.8)
- Conservation comparable à Pain (recette cuisinée), ou Potion (recette alchimique fermentée)
- Mini-jeu cuisine OU alchimie selon recette ([[Crafts]] §Alchimie §Brasseur)

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Boulanger]] · [[Combat]] · [[Personnage]] · [[Le Lien]] · [[Mort]] · [[Les Ères]] · [[L'Accord]] · [[Lore/Religions/00 - Système Religieux]] · [[Potion]] (référence consommable liquide)*
