---
tags: [item, archétype, consommable, poisson, nourriture, pêche]
type: archetype
category: Consommable
subcategory: Poisson
source: Récolté (Pêcheur) | Fabriqué (cuit, fumé, séché)
mastery: Pêche / Cuisine
craft_category: Cuisine
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-buff-esprit-poisson-noble, conservation-fumée-vs-séchée]
---

# 🐟 Archétype — Poisson

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. Nourriture aquatique transformée par cuisson, fumage ou séchage. Pattern intermédiaire : **Stamina + bonus Esprit** (poissons nobles) ou **Stamina + Endurance** (poissons gras). Conservation accrue en fumé/séché.

---

## 1. Vue d'ensemble

Le **poisson** est récolté par le [[Métiers|Pêcheur]] (voir [[Sources de Ressources]] §Créature, [[Crafts]] §Récolte) puis transformé par le [[Métiers|Cuisinier]] ou [[Métiers|Charcutier]]. Consommable cru rare (sushi-like), plus communément cuit, fumé ou séché.

**Ancrage gameplay :**
- Magnitude proche [[Pain]] T2-T3 (similaire viande, pas snack)
- **Profil unique : poissons nobles → buff Esprit / mages**
- Conservation très variable : cru = 1j, fumé = 30j, séché = 90j (×7 vs Pain selon technique)
- Composante de l'économie côtière (Galenor, Vytharia, ports d'Onara)

**Ancrage culturel :** poisson de rivière d'Astravia, poisson de mer de Galenor, poisson abyssal de Vytharia (rare et puissant). Le poisson est aussi **rituel** — [[Lore/Religions/Foedus Animae|Animari]] consomment du poisson pour communier avec les esprits aquatiques.

---

## 2. Variations / sous-types

> **5 sous-types canoniques** selon préparation.

| Sous-type | État | Effet principal | Conservation |
|-----------|------|-----------------|--------------|
| **Poisson cru** | Pêché frais | Stamina léger + bonus selon espèce | 1 jour |
| **Poisson cuit** | Grillé/poêlé | Stamina + buff Esprit (noble) ou Endurance (gras) | 1-2 jours |
| **Poisson fumé** | Conservation moyenne | Stamina + buff stat | 30-60 jours |
| **Poisson séché** | Conservation longue | Stamina + voyage long | 60-120 jours |
| **Poisson noble** | Espèces rares (T4-T6) | Stamina + Esprit fort + effet narratif | Selon préparation |

> **Frontière** : un poisson dans une **soupe** = "Plat préparé" (composite cuisine). Un poisson seul cuit = sous-type Poisson cuit.

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Pain]]** : magnitude Stamina ≈ équivalent Pain T1-T5. Bonus secondaire = **Esprit** (poissons nobles : truite, saumon noble, abyssal) ou **Endurance** (poissons gras : maquereau, hareng).

### 3.1 Poisson cuit — Stamina + buff stat

| Tier | Nom typique | Stamina rendu | Buff stat | Durée | Conservation cuit |
|------|-------------|---------------|-----------|-------|---------------------|
| 1 — Commun | Hareng grillé | +50 Stamina | — | — | 1 jour |
| 2 — Façonné | Truite poêlée | +110 | +3 Esprit (noble) ou +3 Endurance (gras) | 5 min | 1 jour |
| 3 — Œuvré | Saumon rôti | +180 | +6 Esprit ou +6 Endurance | 10 min | 2 jours |
| 4 — Magistral | Anguille rituelle | +280 | +12 Esprit | 15 min | 2 jours |
| 5 — Légendaire | Saumon doré d'Eldoria | +450 | +20 stat (au choix) | 25 min | 2 jours |
| 6 — Mythique | Poisson abyssal | +700 + 25% Stamina max temp | +35 stat double | 40 min | 7 jours (instable) |

### 3.2 Poisson fumé (conservation moyenne)

| Tier | Stamina rendu | Buff stat | Durée | Conservation |
|------|---------------|-----------|-------|--------------|
| 2 | +90 | +3 stat | 5 min | 30 jours |
| 3 | +150 | +6 stat | 10 min | 45 jours |
| 4 | +230 | +10 stat | 15 min | 60 jours |
| 5 | +370 | +18 stat | 25 min | 90 jours |

### 3.3 Poisson séché (voyage long)

| Tier | Stamina rendu | Buff voyage | Durée | Conservation |
|------|---------------|-------------|-------|--------------|
| 2 | +60 | +2 Endurance + immunité fatigue voyage 5 min | 5 min | 60 jours |
| 3 | +110 | +5 Endurance + immunité fatigue 10 min | 10 min | 90 jours |
| 4 | +180 | +10 Endurance + immunité 15 min | 15 min | 120 jours |

---

## 4. Mécanique d'usage

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action** | 3s (T1-T3), 4s (T4-T5), 5s (T6) | Repas, pas snack |
| **Possible en mouvement** | Marche oui, sprint non, saut non | |
| **Possible en combat** | **Bloqué** (cohérent [[Pain]] §4.2) | |
| **Cumul** | 1 buff alimentaire actif ; plafond 3 buffs simultanés | |

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Pêche du jour** | Magnitude +20% si consommé J1 |
| 2 | **Fumé au bois sacré** ([[Lore/Religions/Ignis Aeternum]]) | +1 Vigueur bonus + Reconnaissance |
| 3 | **Mariné** | Conservation × 2, perd −10% magnitude |
| 4 | **Préparation rituelle** | +5 Esprit bonus + Reconnaissance religion |
| 5 | **Pêché à la lune** ([[Cosmologie\|Stellaris]]) | +5 Mana en bonus si Voie active |
| 6 | **Salaison fine** | +1 jour conservation, magnitude +10% |
| 7 | **Aux herbes** | Modificateur Herbes appliqué = bonus thématique selon herbe |
| 8 | **Glaçé** ([[Cosmologie\|Aquor]]) | Conservation × 3 |
| 9 | **Pêché en abysse** | +20% magnitude, mais 10% chance effet mer (vertige 5s) |
| 10 | **Soufflé** ([[L'Accord]]) | Résiste à la rouille post-Souffle |

> **Affixes négatifs** : *Avarié* (poison T1-T2), *Sec* (durée /2), *Râpeux* (action +1s).

---

## 6. Recettes (Cuisine — 1 par tier)

### 6.1 T1 — Hareng grillé

| Aspect | Valeur |
|--------|--------|
| **Métier** | Cuisinier |
| **Palier** | Novice |
| **Station** | Fourneau |
| **Intrants** | Poisson commun × 1, Sel × 1 |
| **Durée** | 30s |
| **Mini-jeu** | Timing cuisson (1 jauge) |

### 6.2 T2 — Truite poêlée

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Fourneau + Plan de travail |
| **Intrants** | Poisson noble × 1, Sel × 1, Beurre × 1, Herbe × 1 |
| **Durée** | 60s |
| **Mini-jeu** | Timing cuisson 2 phases + dosage |

### 6.3 T3 — Saumon rôti

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Fourneau + Plan de travail |
| **Intrants** | Poisson noble × 1, Sel × 2, Beurre × 1, Herbes × 2, Liquide × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Timing cuisson + dosage 3 jauges |

### 6.4 T4 — Anguille rituelle

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Fourneau + Plan de travail + Atelier de pâtisserie |
| **Intrants** | Anguille rituelle × 1, Épices × 3, Beurre raffiné × 2, Sel × 2, Liquide rare × 1 |
| **Durée** | 4 min |
| **Mini-jeu** | Timing cuisson 3 phases + dosage 4 jauges + séquence d'incorporation |

### 6.5 T5 — Saumon doré d'Eldoria

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Fourneau + Atelier de pâtisserie |
| **Intrants** | Saumon noble cosmique × 1, Épices × 4, Miel × 2, Beurre × 3, Sel rituel × 2 |
| **Durée** | 10 min |
| **Mini-jeu** | Timing cuisson 4 phases + 6 jauges + séquence rituelle |

### 6.6 T6 — Poisson abyssal

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître + condition cachée 🔒 (pêché lors d'une [[Les Ères\|Ère]] aquatique OU [[Lore/Religions/Foedus Animae]] Reconnaissance Maître) |
| **Station** | Fourneau + Cercle d'enchantement |
| **Intrants** | Poisson abyssal × 1, Larme × 1, Cristal de Voie d'Aquor × 1, Épices × 4, Beurre béni × 2 |
| **Durée** | 30 min (rituel) |
| **Mini-jeu** | Timing cuisson 5 phases + 8 jauges + canalisation Voie d'Aquor palier Initié |

> **Pattern recette canonique** : tier N = N intrants principaux (poisson + épices + beurre/sel + herbes) + (N-1) secondaires + 1 station ≥ T-1.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet |
|---------|-----|-------|
| **Shadow** | Ombre Longue | Pêché nuit, +furtivité |
| **Spectral** | Échos Brisés | Buff anticipé |
| **Frost** | Sommeil de Glace | Conservation × 3 |
| **Verdoyant** | Verdoiement | Magnitude × 1.3 |
| **Brulé** | Feu Endormi | +rés. feu |
| **Pourpre** | Brume Mortelle | Immunité brume |
| **Doré** | Rêve Lumineux | +20% magnitude jour |
| **Brisé** | Échos Brisés | 50% double / 50% nul |
| **Onirique** | Sommeil Onirique | Buff persiste sommeil |
| **Vénérable** | Présages | +durée quête active |

---

## 8. Exemples de signatures

- **Saumon Doré d'Eldoria** (T5, cosmique)
  *Pêché dans les eaux baignées de l'aube. Effet : Stamina + +20 stat 25 min. Bonus narratif : déverrouille dialogue avec esprits-aquatiques.*

- **Anguille des Caves d'Onara** (T4, [[Lore/Religions/Foedus Animae]])
  *Anguille noire rituelle. Effet : Stamina + +12 Esprit 15 min + communion brève avec un esprit.*

- **Hareng Fumé d'Alkaran** (T2, identité Vael'Kurash)
  *Aliment de subsistance des fjords. Effet : Stamina + +3 Endurance 5 min + conservation 30j. Bonus narratif : monnaie tribale.*

- **Carpe Étoilée d'Astravia** (T3, [[Lore/Religions/Ordo Caelum]])
  *Carpe pêchée à la pleine lune. Effet : Stamina + +6 Esprit 10 min + +5 Mana bonus.*

- **Poisson Abyssal de Vytharia** (T6, espionnage)
  *Pêché dans les profondeurs noires. Effet : Stamina + double stat 40 min + voit dans le noir 10 min. Conservation 7 jours seulement.*

---

## 9. Conservation, stockage, dégradation

| Sous-type | Conservation T1 | Conservation T5 | Multiplicateur vs Pain |
|-----------|-----------------|-----------------|-------------------------|
| Cru | 1 jour | 1 jour | ×0.5 |
| Cuit | 1-2 jours | 2 jours | ×0.6 |
| Fumé | 30 jours | 90 jours | ×7-10 |
| Séché | 60 jours | 120 jours | ×10-15 |

> **Pattern conservation [[Pain]] §9 + Pain §10 hooks** : poisson séché = ×7 Pain équivalent.

### Conditions spéciales

- **Sel + fumage** : conservation × 30 vs cru frais
- **Post-[[Le Souffle|Souffle]]** : poissons T5-T6 −20% magnitude pendant 2 semaines
- **[[Les Ères|Ère du Sommeil de Glace]]** : conservation × 2 (effet froid naturel)

---

## 10. Décisions ouvertes

- [ ] **Buff Esprit poissons nobles** : magnitude à playtester pour ne pas concurrencer trop fort buff Mana de potion
- [ ] **Sushi/cru T6** : un poisson abyssal cru = magnitude T6 sans cuisson ? Décision préliminaire = oui (variante régionale)
- [ ] **Pêcheur Maître + Cuisinier Maître** : double métier nécessaire pour T6 ? Penche pour **oui** (lore : pêcher abyssal + cuisson rituelle)
- [ ] **Poisson + Pain dans repas composé** : compte-t-il comme 1 ou 2 buffs alimentaires ? Penche pour **1** (festin = 1 buff complexe)

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Pain]] · [[Viande]]*
