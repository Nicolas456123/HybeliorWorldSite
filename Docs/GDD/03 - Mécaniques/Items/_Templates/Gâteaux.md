---
tags: [item, archétype, consommable, gâteaux, nourriture, festif, pâtisserie]
type: archetype
category: Consommable
subcategory: Gâteaux
source: Fabriqué (Pâtissier, Boulanger)
mastery: Cuisine / Pâtisserie
craft_category: Cuisine
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-buff-festif-magnitude, durée-courte-vs-pain, gâteau-rituel]
---

# 🍰 Archétype — Gâteaux

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. Variante festive du [[Pain]] : **magnitude ×1.3, durée ×0.5** (cf. [[Pain]] §10). Cumul **Stamina + Présence** (social). Conservation courte. Composante centrale des **fêtes, mariages, cérémonies religieuses**.

---

## 1. Vue d'ensemble

Les **gâteaux** sont fabriqués par le [[Métiers|Pâtissier]] et le [[Métiers|Boulanger]] (voir [[Crafts]] §Cuisine). Aliment **festif et rituel** : magnitude immédiate plus forte qu'un pain équivalent, mais durée moitié moindre. Conçu pour **célébration**, pas survie.

**Ancrage gameplay :**
- **Burst festif** : magnitude Pain × 1.3, durée /2
- **Profil Stamina + Présence** : double buff social — utilité noces, négociations, cérémonies
- Conservation courte (×0.7 vs Pain) — fragile, fait pour être consommé rapidement
- Composante **culturelle et religieuse** (gâteau de mariage galenorien, gâteau funéraire animari, gâteau de pacte cendarien)

**Ancrage culturel :** chaque pays a ses gâteaux signature. Pâtisserie au miel d'Astravia, gâteau au sang d'Alkaran (rituel), pavé royal de Galenor, gâteau de pèlerinage onarien.

---

## 2. Variations / sous-types

| Sous-type | Effet principal | Public | Notes |
|-----------|-----------------|--------|-------|
| **Gâteau simple** | Stamina + Présence | Tous | T1-T3 commun |
| **Pâtisserie raffinée** | Stamina + buff stat | Nobles, fêtes | T3-T5 |
| **Gâteau de mariage** | Buff cumulé groupe (multiplie) | Cérémonie | T4-T5 spécial |
| **Gâteau rituel** | Effet thématique religion | Cérémonies religieuses | T4-T6 |
| **Gâteau cosmique** | Variant ère | Spécial | T5-T6, instable |

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Pain]] §10** : magnitude = Pain × 1.3, durée = Pain / 2. Loi `Magnitude × Durée ≈ constante` respectée.

### 3.1 Gâteau simple

| Tier | Nom typique | Stamina rendu | Buff Présence + stat | Durée | Conservation |
|------|-------------|---------------|----------------------|-------|--------------|
| 1 — Commun | Petit gâteau au miel | +80 | — | — | 1 jour |
| 2 — Façonné | Tarte aux fruits | +160 | +4 Présence | 3 min | 1 jour |
| 3 — Œuvré | Pavé royal | +260 | +8 Présence + 4 stat | 5 min | 2 jours |
| 4 — Magistral | Pièce montée | +420 | +14 Présence + 8 stat | 8 min | 3 jours |
| 5 — Légendaire | Pâtisserie de l'Aube | +650 | +25 Présence + 14 stat | 12 min | 3 jours |
| 6 — Mythique | Festin Sucré | +1040 + 40% Stamina max temp | +45 Présence + 25 stat double | 20 min | 7 jours (instable) |

### 3.2 Gâteau de mariage / cérémonie (effet groupe)

| Tier | Effet | Conditions |
|------|-------|------------|
| 4 | Tous joueurs dans 10m partagent buff Stamina + Présence × 0.5 | Joueur cible présent à la cérémonie |
| 5 | Idem mais buff complet partagé | Idem |

### 3.3 Gâteau rituel (religion)

| Tier | Effet rituel canonique | Durée | Condition |
|------|------------------------|-------|-----------|
| 4 | Bénédiction mineure thématique | 15 min | Reconnaissance ≥ Initié |
| 5 | Bénédiction majeure + dialogue clergé | 30 min | Reconnaissance ≥ Adepte |
| 6 | Bénédiction sacrée + Renom | 1h | Reconnaissance ≥ Maître |

---

## 4. Mécanique d'usage

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action** | 3s (T1-T3), 4s (T4-T6) | Pas snack, pas repas — savouré |
| **Possible en mouvement** | Marche oui, sprint non, saut non | |
| **Possible en combat** | **Bloqué** (cf. [[Pain]] §4.2) | |
| **Cumul** | 1 buff alimentaire actif ; plafond 3 buffs simultanés | |

> **Note Festif** : un gâteau consommé pendant un événement social (mariage, fête au sens narratif) gagne **+10% magnitude bonus** (event flag).

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Pâtissier de la cour** | Magnitude +20% |
| 2 | **Décoré pâte d'amandes** | +5 Présence bonus |
| 3 | **Cuit avec amour** | +10% durée |
| 4 | **Au miel rare** | Magnitude +15% |
| 5 | **Glaçage royal** ([[Cosmologie\|Eldoria]]) | +20% magnitude jour |
| 6 | **Multi-étages** | Cumule effet × N étages (max 3) |
| 7 | **Festif** ([[Les Ères\|Rêve Lumineux]]) | Effet groupe étendu (15m) |
| 8 | **Bénédiction d'autel** | +1 Reconnaissance religion |
| 9 | **Croquant fragile** | Magnitude × 1.5, durée /2 |
| 10 | **Soufflé** ([[L'Accord]]) | Résiste à la rouille post-Souffle |

> **Affixes négatifs** : *Rassis* (magnitude −30%), *Effrité* (durée /2), *Fondu* (gaspillé en sac chaud).

---

## 6. Recettes (Cuisine / Pâtisserie — 1 par tier)

> Station principale : **Atelier de pâtisserie** + **Four à pain** ([[Crafts]] §Cuisine). Mini-jeu : **dosage assaisonnement + timing cuisson + dressage**.

### 6.1 T1 — Petit gâteau au miel

| Aspect | Valeur |
|--------|--------|
| **Métier** | Cuisinier ou Boulanger |
| **Palier** | Novice |
| **Station** | Four à pain + Plan de travail |
| **Intrants** | Farine × 2, Œuf × 1, Miel × 1, Sel × 1 |
| **Sortie** | 4× Petit gâteau |
| **Durée** | 60s |
| **Mini-jeu** | Dosage simple + timing cuisson |

### 6.2 T2 — Tarte aux fruits

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Four à pain + Atelier de pâtisserie |
| **Intrants** | Farine × 3, Œuf × 2, Miel × 1, Beurre × 1, Fruit × 3 |
| **Durée** | 90s |
| **Mini-jeu** | Dosage 2 jauges + dressage |

### 6.3 T3 — Pavé royal

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Four + Atelier de pâtisserie |
| **Intrants** | Farine × 4, Œuf × 3, Miel × 2, Beurre × 2, Lait × 1, Épice × 2 |
| **Durée** | 2 min |
| **Mini-jeu** | Dosage 3 jauges + timing 2 phases + dressage |

### 6.4 T4 — Pièce montée

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Four + Atelier de pâtisserie + Plan de travail (présentation) |
| **Intrants** | Farine fine × 4, Œuf × 4, Beurre × 3, Miel × 2, Lait × 2, Épices × 3, Pigment alimentaire × 1 |
| **Durée** | 5 min |
| **Mini-jeu** | Dosage 4 jauges + timing 3 phases + assemblage |

### 6.5 T5 — Pâtisserie de l'Aube

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Four sacré + Atelier de pâtisserie + Cercle d'enchantement (mini) |
| **Intrants** | Farine d'or × 3, Œuf × 4, Miel solaire × 3, Beurre béni × 2, Épices × 4, Pigment d'or × 1 |
| **Durée** | 15 min |
| **Mini-jeu** | Dosage 6 jauges + timing 4 phases + séquence rituelle |

### 6.6 T6 — Festin Sucré

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître + condition cachée 🔒 (cérémonie de mariage royal OU [[Les Ères\|Rêve Lumineux]]) |
| **Station** | Four sacré + Cercle d'enchantement |
| **Intrants** | Farine mythique × 3, Œuf de phénix × 1, Miel solaire × 3, Beurre béni × 3, Larme × 1, Cristal de Voie × 1 |
| **Durée** | 1h (rituel) |
| **Mini-jeu** | Dosage 8 jauges + canalisation Voie palier Adepte |

> **Pattern recette canonique** : tier N = N intrants principaux (farine + œuf + miel + beurre + lait) + (N-1) secondaires (épice, pigment) + station ≥ T-1.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet |
|---------|-----|-------|
| **Shadow** | Ombre Longue | Magnitude silencieuse |
| **Spectral** | Échos Brisés | Buff anticipé |
| **Frost** | Sommeil de Glace | Conservation × 3 |
| **Verdoyant** | Verdoiement | Magnitude × 1.3 |
| **Brulé** | Feu Endormi | +rés. feu, magnitude −10% |
| **Pourpre** | Brume Mortelle | Immunité brume |
| **Doré** | Rêve Lumineux | +20% magnitude jour |
| **Brisé** | Échos Brisés | 50% double / 50% nul |
| **Onirique** | Sommeil Onirique | Buff persiste sommeil |
| **Vénérable** | Présages | +durée quête active |

---

## 8. Exemples de signatures

- **Pavé Royal de Galenor** (T3, identité commerçante)
  *Pâtisserie standard de la noblesse galenorienne. Effet : Stamina + +8 Présence + 4 stat 5 min. Bonus narratif : reconnu nobles.*

- **Pièce Montée de Mariage Cendarien** (T4, [[Lore/Religions/Ignis Aeternum]])
  *Cérémonie de pacte. Effet groupe : tous joueurs dans 10m gagnent buff partagé. Bonus narratif : pacte de mariage scellé.*

- **Gâteau Étoilé d'Astravia** (T4, [[Lore/Religions/Ordo Caelum]])
  *Décoré de constellations en sucre. Effet : Stamina + +14 Présence + 8 Acuité 8 min.*

- **Gâteau Funéraire Onarien** (T4, [[Lore/Religions/Foedus Animae]])
  *Gâteau noir partagé en cérémonie. Effet : Stamina + dialogue temporaire morts.*

- **Festin Sucré Cosmique** (T6, [[Les Ères\|Rêve Lumineux]])
  *Pâtisserie unique pendant changement d'ère. Effet : double stat + buff groupe.*

---

## 9. Conservation, stockage, dégradation

> **Pattern [[Pain]] §10** : Gâteau = ×0.7 Pain équivalent (festif fragile).

| Tier | Conservation par défaut | Conditions optimales | Dégradation |
|------|--------------------------|----------------------|-------------|
| 1 | 1 jour | Garde-manger | Rassis J2 |
| 2 | 1 jour | Garde-manger + linge | Rassis J2 |
| 3 | 2 jours | Cave fraîche | Rassis J3 |
| 4 | 3 jours | Cave + emballage | Rassis J5 |
| 5 | 3 jours | Cave + emballage rituel | Stable 3j, gaspillé J7 |
| 6 | 7 jours | Aucun stockage durable | Mythique = volatile |

### Conditions spéciales

- **Post-[[Le Souffle|Souffle]]** : gâteaux T5-T6 −20% magnitude pendant 2 semaines
- **[[Les Ères|Ère du Sommeil de Glace]]** : conservation × 2 (effet froid)
- **Cérémonie active** : gâteau cérémonie consommé pendant l'event = magnitude +10% bonus

---

## 10. Décisions ouvertes

- [ ] **Magnitude × 1.3 vs Pain** : confirmé en playtest ?
- [ ] **Effet groupe T4-T5 mariage** : équilibrer pour ne pas devenir "buff de raid déguisé". Penche pour **buff partagé /2 magnitude**
- [ ] **Gâteau rituel = 1 buff rituel maximum** (cohérent [[Pain]] et [[Fromage]])
- [ ] **Festin Sucré T6 instable** : 7 jours OK ? Ou 3 jours pour forcer consommation immédiate ?
- [ ] **Cérémonie comme event** : un mariage joueur = "event" qui débloque magnitude bonus. À playtester abus.

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Métiers]] · [[Pain]] · [[Lore/Religions/00 - Système Religieux]]*
