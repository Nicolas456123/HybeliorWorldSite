---
tags: [item, archétype, consommable, viande, nourriture, charcuterie]
type: archetype
category: Consommable
subcategory: Viande
source: Récolté (Chasseur, Dépéceur) | Fabriqué (cuit, fumé, séché)
mastery: Cuisine / Charcuterie
craft_category: Cuisine
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-magnitude-vs-pain, conservation-séchage-fumage, viande-créatures-cosmiques]
---

# 🥩 Archétype — Viande

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. Nourriture animale terrestre. Pattern proche [[Poisson]] mais profil **Vigueur + Stamina** (force brute, soldat). Conservation excellente en séché/fumé (×7-10 vs Pain).

---

## 1. Vue d'ensemble

La **viande** est récoltée par les [[Métiers|Chasseur]] et [[Métiers|Dépéceur]] (voir [[Sources de Ressources]] §Créature, [[Crafts]] §Récolte) puis transformée par le [[Métiers|Cuisinier]] ou [[Métiers|Charcutier]]. Aliment dense en énergie, profil **soldat / aventurier physique**.

**Ancrage gameplay :**
- Magnitude proche [[Pain]] — pas snack, repas
- **Profil Vigueur/Endurance** : viande = combattant, mineur, bûcheron
- Conservation très variable : crue 1j, cuite 2j, fumée 60j, séchée 90j
- Ressource clé pour le commerce de masse (charcuterie portuaire, jambon de cave noble)

**Ancrage culturel :** chaque biome a ses créatures et ses charcuteries. Boudin noir d'Alkaran, jambon doré de Galenor, cervidé fumé d'Astravia, viande noire des dragons (T6 mythique). La **viande de créature unique** (loup spectral, ours-chamane) porte parfois un effet narratif.

---

## 2. Variations / sous-types

| Sous-type | État | Effet principal | Conservation |
|-----------|------|-----------------|--------------|
| **Viande crue** | Pas consommée seule (insalubrité) | — | 1 jour |
| **Viande cuite** | Rôtie, grillée, mijotée | Stamina + Vigueur | 2 jours |
| **Viande fumée** | Fumage long | Stamina + Vigueur durable | 60 jours |
| **Viande séchée** | Séchage prolongé | Stamina + voyage long | 90 jours |
| **Charcuterie** | Boudin, saucisson, jambon | Stamina + Présence (festif) | 30-90 jours |
| **Viande mythique** | Créature rare/cosmique | Stamina + effet narratif unique | T6, instable |

> **Frontière** : un ragoût (viande + légumes + bouillon) = "Plat préparé" composite. Viande seule transformée = sous-type Viande.

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Pain]] / [[Poisson]]** : magnitude équivalente Pain. Bonus secondaire = **Vigueur** ou **Endurance** (rarement Esprit, contrairement au poisson noble).

### 3.1 Viande cuite

| Tier | Nom typique | Stamina rendu | Buff Vigueur | Durée | Conservation |
|------|-------------|---------------|--------------|-------|--------------|
| 1 — Commun | Viande grillée | +60 | — | — | 2 jours |
| 2 — Façonné | Rôti de bœuf | +120 | +3 Vigueur | 5 min | 2 jours |
| 3 — Œuvré | Civet de cerf | +200 | +6 Vigueur | 10 min | 2 jours |
| 4 — Magistral | Cuissot d'ours | +320 | +12 Vigueur | 15 min | 3 jours |
| 5 — Légendaire | Côte de licorne | +500 | +20 Vigueur (ou stat au choix) | 25 min | 3 jours |
| 6 — Mythique | Cœur de dragon | +800 + 30% Stamina max temp | +35 stat double | 40 min | 7 jours (instable) |

### 3.2 Viande fumée (conservation moyenne)

| Tier | Stamina rendu | Buff stat | Durée | Conservation |
|------|---------------|-----------|-------|--------------|
| 2 | +100 | +3 Vigueur | 5 min | 60 jours |
| 3 | +170 | +6 Vigueur | 10 min | 75 jours |
| 4 | +260 | +12 Vigueur | 15 min | 90 jours |
| 5 | +400 | +20 Vigueur | 25 min | 120 jours |

### 3.3 Viande séchée (voyage long)

| Tier | Stamina rendu | Buff voyage | Durée | Conservation |
|------|---------------|-------------|-------|--------------|
| 1 | +40 Stamina | — | — | 30 jours |
| 2 | +80 | +3 Endurance + immunité fatigue 5 min | 5 min | 60 jours |
| 3 | +130 | +6 Endurance + immunité 10 min | 10 min | 90 jours |
| 4 | +200 | +10 Endurance + immunité 15 min | 15 min | 120 jours |

### 3.4 Charcuterie (festif)

| Tier | Stamina rendu | Buff Présence | Durée | Conservation |
|------|---------------|----------------|-------|--------------|
| 2 | +110 | +3 Présence | 5 min | 30 jours |
| 3 | +190 | +6 Présence + 4 Vigueur | 10 min | 60 jours |
| 4 | +300 | +10 Présence + 8 Vigueur | 15 min | 90 jours |

---

## 4. Mécanique d'usage

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action** | 3s (T1-T3), 4s (T4-T5), 5s (T6) | Repas |
| **Possible en mouvement** | Marche oui (séchée — viande de voyage), sprint non, saut non | Avantage séchée : peut être grignotée en marchant |
| **Possible en combat** | **Bloqué** | |
| **Cumul** | 1 buff alimentaire actif ; plafond 3 buffs simultanés | |

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Chassé à l'aube** | Magnitude +15% si consommé J1 |
| 2 | **Fumé au feu sacré** ([[Lore/Religions/Ignis Aeternum]]) | +5 Vigueur bonus + Reconnaissance |
| 3 | **Mariné aux herbes** | Modificateur Herbes appliqué |
| 4 | **Saignée rituelle** ([[Lore/Religions/Vael Kurash]]) | +3 Esprit bonus + Reconnaissance chamane |
| 5 | **Vieillie en cave** | +1 tier conservation |
| 6 | **Coupé maître boucher** | Magnitude +10%, action −0.5s |
| 7 | **Glaçé** ([[Cosmologie\|Aquor]]) | Conservation × 3 |
| 8 | **Doré** ([[Cosmologie\|Eldoria]]) | +20% magnitude jour |
| 9 | **Saigné dans le sable** ([[Cosmologie\|Solis]]) | +rés. soleil 15 min |
| 10 | **Soufflée** ([[L'Accord]]) | Résiste à la rouille post-Souffle |

> **Affixes négatifs** : *Avariée* (poison T1-T2), *Coriace* (action +1s), *Sèche* (durée /2).

---

## 6. Recettes (Cuisine / Charcuterie — 1 par tier)

### 6.1 T1 — Viande grillée

| Aspect | Valeur |
|--------|--------|
| **Métier** | Cuisinier |
| **Palier** | Novice |
| **Station** | Fourneau |
| **Intrants** | Viande crue × 1, Sel × 1 |
| **Durée** | 30s |
| **Mini-jeu** | Timing cuisson (1 jauge) |

### 6.2 T2 — Rôti de bœuf

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Fourneau + Plan de travail |
| **Intrants** | Viande × 2, Sel × 1, Beurre × 1, Herbe × 1 |
| **Durée** | 60s |
| **Mini-jeu** | Timing cuisson 2 phases + dosage |

### 6.3 T3 — Civet de cerf

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Fourneau + Plan de travail |
| **Intrants** | Viande noble × 2, Sel × 2, Liquide × 1 (vin), Herbes × 2, Légume × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Timing cuisson 3 phases + dosage 3 jauges |

### 6.4 T4 — Cuissot d'ours fumé

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Fourneau + Charcuterie + Étendoir |
| **Intrants** | Viande rare × 2, Sel × 3, Bois aromatique × 2, Épices × 3, Liquide × 1 |
| **Durée** | 4 min |
| **Mini-jeu** | Timing fumage 3 phases + dosage 4 jauges |

### 6.5 T5 — Côte de licorne

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Fourneau + Charcuterie + Atelier rituel |
| **Intrants** | Viande mythique × 1 (licorne), Sel rituel × 3, Épices × 4, Beurre béni × 2, Liquide rare × 1, Herbe rare × 2 |
| **Durée** | 10 min |
| **Mini-jeu** | Timing cuisson 4 phases + 6 jauges + séquence rituelle |

### 6.6 T6 — Cœur de dragon

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître + condition cachée 🔒 (avoir abattu un dragon, [[Combat]] §créatures cosmiques) |
| **Station** | Fourneau + Cercle d'enchantement |
| **Intrants** | Cœur de dragon × 1, Larme × 2, Cristal de Voie de Feu × 1, Épices × 5, Beurre béni × 3, Sel rituel × 3 |
| **Durée** | 1h (rituel) |
| **Mini-jeu** | Timing cuisson 5 phases + 8 jauges + canalisation Voie de Feu palier Adepte |

> **Pattern recette canonique** : tier N = N intrants principaux + (N-1) secondaires + station ≥ T-1.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet |
|---------|-----|-------|
| **Shadow** | Ombre Longue | Chassé nuit, +furtivité |
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

- **Cervidé Étoilé d'Astravia** (T4, [[Lore/Religions/Ordo Caelum]])
  *Cerf chassé sous constellation propice. Effet : +320 Stamina + +12 Vigueur 15 min + +5 Acuité.*

- **Boudin Noir d'Alkaran** (T3, identité Vael'Kurash)
  *Charcuterie traditionnelle des fjords. Effet : Stamina + +6 Vigueur 10 min + résistance froid.*

- **Jambon Doré de Galenor** (T4, identité galenorienne)
  *Affiné en cave 2 ans. Effet : Stamina + +10 Présence + 8 Vigueur 15 min. Bonus narratif : badge négociant.*

- **Cuissot d'Ours-Chamane** (T5, [[Lore/Religions/Vael Kurash]])
  *Ours sacré tué dans rituel. Effet : Stamina + +20 stat + communion brève esprit.*

- **Cœur de Dragon Cendarien** (T6, [[Lore/Religions/Ignis Aeternum]])
  *Trophée mythique. Effet : Stamina + double stat 40 min + +30% rés. feu permanente 24h. Conservation 7j.*

---

## 9. Conservation, stockage, dégradation

| Sous-type | Conservation T1 | Conservation T5 | Multiplicateur vs Pain |
|-----------|-----------------|-----------------|-------------------------|
| Cuite | 2 jours | 3 jours | ×1 |
| Fumée | 60 jours | 120 jours | ×10 |
| Séchée | 30 jours | 120 jours | ×10-15 |
| Charcuterie | 30 jours | 90 jours | ×7 |

> **Pattern conservation [[Pain]] §9** : viande séchée / fumée = méthode longue conservation par excellence.

### Conditions spéciales

- **Salaison + fumage** : conservation × 30+ vs viande fraîche
- **Post-[[Le Souffle|Souffle]]** : viandes T5-T6 −20% magnitude pendant 2 semaines
- **[[Les Ères|Ère du Sommeil de Glace]]** : conservation × 2 (froid naturel — viande gardée dans la neige)

---

## 10. Décisions ouvertes

- [ ] **Pas de viande crue consommée seule** : confirmé sauf variant culturel (sushi-équivalent)
- [ ] **Cœur de dragon T6** : disponibilité ? Penche pour **rare drop boss + condition multiple**
- [ ] **Charcuterie + Pain composite** : compte-t-il comme 1 ou 2 buffs alimentaires si consommés simultanément ? Penche pour **2 buffs** (séparés)
- [ ] **Viande de créature unique = effet narratif systématique ?** : penche pour oui (loup-spectral, ours-chamane portent une trace de leur lore)

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Pain]] · [[Poisson]] · [[Fromage]]*
