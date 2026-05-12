---
tags: [item, archétype, consommable, fruits, nourriture, frais]
type: archetype
category: Consommable
subcategory: Fruits
source: Récolté | Fabriqué (séchage, conserve)
mastery: Botanique / Cuisine
craft_category: Cuisine
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-snack-magnitude, conservation-fraîche, fruits-cosmiques-rares]
---

# 🍎 Archétype — Fruits

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. Nourriture brute consommable directement après récolte — **snack** rapide à magnitude modeste mais **action courte** (2s). Frère brut du [[Pain]] et complément du voyage léger.

---

## 1. Vue d'ensemble

Les **fruits** sont récoltés sur les arbres et arbustes par les [[Métiers|Cueilleur]], [[Métiers|Botaniste]] et [[Métiers|Fermier]] (voir [[Sources de Ressources]] §Nature, [[Crafts]] §Récolte). Consommables **directement** après récolte sans transformation, ils offrent un **boost rapide de Stamina** et un **bonus mineur** selon variété (Vivacité, résistance, hydratation).

**Ancrage gameplay :**
- **Snack rapide** : action 2s, hors combat strict (cf. [[Pain]] §4)
- **Magnitude modeste** = magnitude Pain équivalent / 3 (cf. [[Pain]] §10 patterns)
- **Conservation courte** (1-3 jours frais), motive la consommation immédiate ou la transformation (confiture, séchage)
- Outil de voyage léger — un sac de fruits pèse peu, se mange en mouvement

**Ancrage culturel :** chaque biome a ses fruits. Pommes d'Alkaran, agrumes de Cendara, fruit-tendre de Galenor. Les fruits sont aussi **symboles religieux** (fruit du verger d'[[Lore/Religions/Foedus Animae|Animae]], grenade rituelle d'[[Lore/Religions/Ignis Aeternum]]).

---

## 2. Variations / sous-types

> **5 sous-types canoniques** selon préparation.

| Sous-type | État | Effet principal | Conservation |
|-----------|------|-----------------|--------------|
| **Fruit frais** | Brut, juste récolté | Stamina + Vivacité légère | 1-3 jours |
| **Fruit séché** | Déshydraté | Stamina + voyage long | 30-60 jours |
| **Confiture** | Cuit + sucre | Stamina + buff Présence | 90+ jours |
| **Compote** | Cuit, lissé | Stamina + régen mineure HP | 14 jours |
| **Fruit cosmique** | Variant ère | Effet unique selon ère | T5 uniquement, 7 jours |

> **Frontière** : un fruit séché reste classé "Fruits" (sous-type séché) ; une confiture est classée "Fruits" (sous-type confiture) — pas une catégorie séparée. La confiture haut tier devient toutefois proche du **Gâteau** (voir [[Gâteaux]]).

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Pain]] §10** : magnitude Stamina = Pain / 3 ; durée plus courte. Bonus secondaire = Vivacité ou Vigueur léger.

### 3.1 Fruit frais (Stamina pure)

| Tier | Nom typique | Stamina rendu | Buff stat secondaire | Durée buff | Conservation |
|------|-------------|---------------|----------------------|------------|--------------|
| 1 — Commun | Pomme de verger | +20 Stamina | — | — | 1 jour |
| 2 — Façonné | Poire mielleuse | +40 | +2 Vivacité | 3 min | 2 jours |
| 3 — Œuvré | Agrume d'or | +70 | +5 Vivacité | 5 min | 3 jours |
| 4 — Magistral | Fruit-tendre galenorien | +110 | +10 Vivacité | 8 min | 3 jours |
| 5 — Légendaire | Pêche de l'Aube | +180 | +18 stat (au choix) | 12 min | 3 jours |

### 3.2 Fruit séché (voyage long)

| Tier | Stamina rendu | Buff voyage | Durée | Conservation |
|------|---------------|-------------|-------|--------------|
| 1 | +15 Stamina | — | — | 30 jours |
| 2 | +30 | +1 Endurance 5 min | 5 min | 45 jours |
| 3 | +50 | +3 Endurance 8 min | 8 min | 60 jours |
| 4 | +85 | +6 Endurance 12 min | 12 min | 90 jours |

### 3.3 Confiture / Compote

| Tier | Stamina rendu | Buff Présence (confiture) / régen HP (compote) | Durée |
|------|---------------|------------------------------------------------|-------|
| 2 | +50 | +3 Présence ou +5 HP/s × 30s | 5 min |
| 3 | +90 | +6 Présence ou +10 HP/s × 60s | 8 min |
| 4 | +150 | +10 Présence ou +18 HP/s × 90s | 12 min |
| 5 | +230 | +16 Présence ou +30 HP/s × 120s | 15 min |

### 3.4 Fruit cosmique (variant ère, T5)

Magnitude variable, effet narratif. Voir §7.

---

## 4. Mécanique d'usage

### 4.1 Action croquer

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action** | 2s (T1-T3), 2.5s (T4-T5) | **Plus rapide que Pain** (3-5s) — c'est un snack |
| **Possible en mouvement** | Marche oui, sprint oui (avantage snack), saut non | Différencie du Pain (sprint impossible) |
| **Possible en combat** | **Bloqué en combat** (cf. [[Pain]] §4.2) | Cohérent nourriture |
| **Interruption si dégâts** | Oui — fruit gaspillé | |

### 4.2 Cumul

| Mécanique | Valeur |
|-----------|--------|
| **Cooldown** | Aucun direct, mais 1 buff alimentaire actif à la fois (voir [[Pain]] §4.3) |
| **Cumul Fruit + Pain + Boisson** | Fruit compte comme 1 buff alimentaire dans le plafond 3 buffs simultanés |
| **Cumul Fruit + Fruit** | Non — remplace ou refresh |

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Mûr à point** | Magnitude +25% (récolté au moment optimal) |
| 2 | **Conservé en cave** | Conservation × 2 |
| 3 | **Confit au miel** | Magnitude +15%, conversion en sous-type Confiture |
| 4 | **Verdoyant** ([[Les Ères\|Verdoiement]]) | Bonus Vivacité +50% |
| 5 | **Cueilli sous la lune** | +5 Mana en bonus si Voie active |
| 6 | **Rare biome** | Magnitude ×1.5 si récolté dans biome correspondant |
| 7 | **Fermenté** | Convertit en équivalent Boisson (alcool léger) |
| 8 | **Béni du verger** ([[Lore/Religions/Foedus Animae]]) | +1 Reconnaissance dans la zone |
| 9 | **Givré** | Conservation × 3 froid, perd buff stat |
| 10 | **Fruit du Souffle** ([[L'Accord]]) | Résiste à la dégradation post-Souffle |

> **Affixes négatifs** : *Pourri* (effet poison T1), *Véreux* (magnitude /2), *Sec* (perd bonus Vivacité).

---

## 6. Recettes (Cuisine — transformation, 1 par tier)

> Le fruit **frais** ne se craft pas (récolte directe, voir [[Sources de Ressources]] §Nature). Les recettes ci-dessous sont les **transformations** : séchage, confiture, compote.

### 6.1 T1 — Fruit séché

| Aspect | Valeur |
|--------|--------|
| **Métier** | Cuisinier ou Confiturier |
| **Palier** | Novice |
| **Station** | Étendoir / Plan de travail |
| **Intrants** | Fruit frais × 4, Sel × 1 |
| **Sortie** | 4× Fruit séché |
| **Durée** | 30s (simulation : 3 jours séchage) |
| **Mini-jeu** | Découpe simple (1 jauge) |

### 6.2 T2 — Compote simple

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Fourneau + Plan de travail |
| **Intrants** | Fruit frais × 5, Liquide × 1, Sel × 1, Récipient × 1 (pot) |
| **Durée** | 60s |
| **Mini-jeu** | Dosage 2 jauges + timing cuisson |

### 6.3 T3 — Confiture de pays

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Fourneau + Plan de travail |
| **Intrants** | Fruit frais × 6, Miel × 2, Épices × 1 (modificateur), Pot scellé × 1 |
| **Durée** | 2 min |
| **Mini-jeu** | Dosage 3 jauges + timing cuisson 2 phases |

### 6.4 T4 — Confiture rare

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Fourneau + Plan de travail + Atelier de pâtisserie |
| **Intrants** | Fruit rare × 4, Miel × 3, Épices × 2, Liqueur × 1, Pot rituel × 1 |
| **Durée** | 5 min |
| **Mini-jeu** | Dosage 4 jauges + timing cuisson 3 phases |

### 6.5 T5 — Fruit conservé cosmique

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Fourneau + Atelier de pâtisserie + Cercle d'enchantement |
| **Intrants** | Fruit cosmique × 3, Miel × 3, Cristal × 1, Pot rituel × 1 |
| **Durée** | 10 min |
| **Mini-jeu** | Dosage 5 jauges + séquence rituelle |

> **Pas de T6** : les fruits sont des matières trop simples pour porter un effet mythique seuls. T6 atteignable seulement via cumul (fruit T5 + autre intrant rituel dans une recette Pain ou Gâteau).

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet sur le fruit |
|---------|-----|--------------------|
| **Shadow** ([[Cosmologie\|Noctis]]) | Ombre Longue | Récolté de nuit, +furtivité 3 min |
| **Spectral** ([[Cosmologie\|Tempora]]) | Échos Brisés | Mange-toi 3s avant l'action (anticipation) |
| **Frost** ([[Cosmologie\|Aquor]]) | Sommeil de Glace | Conservation × 4, +résistance froid 10% |
| **Verdoyant** ([[Cosmologie\|Spiritus]]) | Verdoiement | Magnitude × 1.5, sème automatiquement une graine |
| **Brulé** (Voie de Feu) | Feu Endormi | +résistance feu 15%, magnitude −10% |
| **Pourpre** ([[Cosmologie\|Umbra]]) | Brume Mortelle | Immunité brume légère 15 min |
| **Doré** ([[Cosmologie\|Eldoria]]) | Rêve Lumineux | Magnitude +20% de jour |
| **Brisé** ([[Cosmologie\|Tempora]]) | Échos Brisés | 50% double effet / 50% effet annulé |
| **Onirique** ([[Cosmologie\|Somnix]]) | Sommeil Onirique | Mange en rêve = effet réel |
| **Vénérable** ([[Cosmologie\|Fatum]]) | Présages | Effet prolongé +50% si quête active |

---

## 8. Exemples de signatures

> Phase 4 stub. Inventées (pas de CSV).

- **Pomme du Verger d'Onara** (T3, [[Lore/Religions/Foedus Animae]])
  *Pomme rouge sang d'un verger sacré. Effet : Stamina + voit les esprits des morts récents. Bonus narratif : preuve de communion.*

- **Agrume Volcanique de Cendara** (T4, [[Lore/Religions/Ignis Aeternum]])
  *Cultivé près des coulées de lave. Effet : Stamina + +10 résistance feu 12 min. Bonus narratif : badge Ignitari.*

- **Fruit-Tendre de Galenor** (T4, identité galenorienne)
  *Tropical, juteux, grandit dans les ports humides. Effet : Stamina + +10 Vivacité 8 min + hydratation. Bonus narratif : marchands galenoriens reconnaissent.*

- **Pêche d'Astravia** (T5, [[Lore/Religions/Ordo Caelum]])
  *Fruit cultivé sous orchard étoilé. Effet : Stamina + +18 Acuité 12 min. Bonus narratif : vision claire du ciel nocturne.*

- **Baie d'Alkaran** (T2, identité Vael'Kurash)
  *Petite baie acide du Nord. Effet : Stamina + +2 Vivacité 3 min + résistance froid légère. Bonus narratif : reconnu des chamanes.*

---

## 9. Conservation, stockage, dégradation

| Tier | Conservation par défaut (frais) | Conditions optimales | Dégradation |
|------|----------------------------------|----------------------|-------------|
| 1 | 1 jour | Garde-manger frais | Pourri J2 |
| 2 | 2 jours | Cave fraîche | Pourri J3 |
| 3 | 3 jours | Cave + linge | Pourri J5 |
| 4 | 3 jours | Cave + cire | Pourri J5 |
| 5 | 3 jours | Cave magique | Pourri J7 (instable T5) |

> **Pattern frais [[Pain]] §9** : Fruits = ×0.5 conservation Pain. Très périssable.

### Conditions spéciales

- **Sécher** : conservation × 15 (T1 frais 1j → 30j séché)
- **Confiture** : conservation × 30+ (mais magnitude différente)
- **Givrage** ([[Cosmologie\|Aquor]] mineur) : × 3 conservation, perd buff stat
- **Post-[[Le Souffle|Souffle]]** : fruits T4-T5 perdent leur magnitude exotique pendant 2 semaines

---

## 10. Décisions ouvertes

- [ ] **Magnitude /3 vs Pain** : ratio à playtester — équilibrage snack léger
- [ ] **Pas de T6 frais** : confirmé ? Décision préliminaire = oui (matière trop simple)
- [ ] **Confiture vs Pain d'épices** : frontière floue ? Confiture = sous-type Fruits, Pain d'épices = Pain T4
- [ ] **Récolte automatique** : un fruit cueilli génère-t-il magnitude T1 ou peut-il être de meilleur tier selon biome ? Penche pour **biome détermine tier**
- [ ] **Fruit + Boisson cumul** : ok, comptés tous deux dans plafond 3 buffs alimentaires

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Pain]] · [[Légumes]] · [[Boisson]]*
