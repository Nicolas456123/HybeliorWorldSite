---
tags: [item, archétype, consommable, légumes, nourriture, frais]
type: archetype
category: Consommable
subcategory: Légumes
source: Récolté | Fabriqué (conserve, cuit)
mastery: Botanique / Cuisine
craft_category: Cuisine
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-magnitude-snack-vs-fruits, conservation-racines-vs-feuilles]
---

# 🥕 Archétype — Légumes

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. Frère terrestre des [[Fruits]] : nourriture brute récoltée, magnitude modeste, **bonus secondaire orienté Vigueur/Endurance** (alors que les fruits poussent vers Vivacité/Présence). Conservation légèrement supérieure aux fruits (racines, tubercules).

---

## 1. Vue d'ensemble

Les **légumes** sont récoltés sur les potagers, champs et forêts par les [[Métiers|Cueilleur]], [[Métiers|Fermier]] et [[Métiers|Botaniste]] (voir [[Sources de Ressources]] §Nature, [[Crafts]] §Récolte). Consommables crus (limité), mais usage courant : **cuits, mijotés, conservés en saumure**. Buff Stamina + Vigueur/Endurance léger.

**Ancrage gameplay :**
- Snack ou repas léger — action 2-3s, bloqué en combat
- **Conservation supérieure aux fruits** (racines tiennent 5-7 jours frais ; saumure 90+ jours)
- Magnitude proche [[Fruits]] (Pain / 3) mais profil **Vigueur/Endurance** au lieu de Vivacité/Présence
- Composante essentielle des **soupes** et **plats préparés** (intermédiaires craft)

**Ancrage culturel :** légumes-racines de Skaldoria (navets, pommes-de-terre), légumes-feuilles de Galenor (cresson, salade), légumes-bulbes d'Astravia (oignons rituels, ails contre les morts-vivants). Le légume est aussi **base religieuse** : la soupe rituelle de [[Lore/Religions/Lex Petra]] contient 7 racines symboliques.

---

## 2. Variations / sous-types

> **5 sous-types canoniques** selon préparation et nature.

| Sous-type | État | Effet principal | Conservation |
|-----------|------|-----------------|--------------|
| **Légume-racine cru** | Brut (carotte, navet, betterave) | Stamina + Vigueur légère | 5-7 jours |
| **Légume-feuille cru** | Brut (salade, cresson) | Stamina + Esprit légère | 2-3 jours |
| **Légume cuit** | Bouilli, rôti | Stamina + Endurance | 2 jours après cuisson |
| **Légume en saumure** | Conservé sel/vinaigre | Stamina + résistance maladie | 90-180 jours |
| **Légume cosmique** | Variant ère | Effet unique selon ère | T5 uniquement, 7 jours |

> **Frontière** : un légume cuit dans une soupe = sous-type Légume cuit ; une soupe complète (multi-intrants) = **plat préparé** (rejoint pattern [[Pain]] dans la catégorie Cuisine, sous-type composite). Limite floue à arbitrer en Phase 4.

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Pain]] §10 + [[Fruits]] §3** : magnitude Stamina = Pain / 3 ; bonus secondaire = Vigueur ou Endurance léger.

### 3.1 Légume-racine cru (Stamina + Vigueur)

| Tier | Nom typique | Stamina rendu | Buff stat | Durée buff | Conservation |
|------|-------------|---------------|-----------|------------|--------------|
| 1 — Commun | Navet de potager | +20 Stamina | — | — | 5 jours |
| 2 — Façonné | Carotte rouge | +40 | +2 Vigueur | 3 min | 6 jours |
| 3 — Œuvré | Pomme-de-terre raffinée | +70 | +5 Endurance | 5 min | 7 jours |
| 4 — Magistral | Racine d'or skaldorienne | +110 | +10 Vigueur | 8 min | 7 jours |
| 5 — Légendaire | Tubercule de l'Aube | +180 | +18 stat (au choix) | 12 min | 7 jours |

### 3.2 Légume-feuille cru

| Tier | Stamina rendu | Buff stat (Esprit) | Durée | Conservation |
|------|---------------|--------------------|-------|--------------|
| 1 | +15 | — | — | 2 jours |
| 2 | +30 | +2 Esprit | 3 min | 3 jours |
| 3 | +55 | +5 Esprit | 5 min | 3 jours |

### 3.3 Légume cuit

| Tier | Stamina rendu | Buff Endurance | Durée | Conservation |
|------|---------------|----------------|-------|--------------|
| 2 | +50 | +3 Endurance | 5 min | 2 jours |
| 3 | +90 | +6 Endurance | 8 min | 2 jours |
| 4 | +150 | +12 Endurance | 12 min | 3 jours |

### 3.4 Légume en saumure (longue conservation)

| Tier | Stamina rendu | Buff résistance maladie | Durée | Conservation |
|------|---------------|--------------------------|-------|--------------|
| 2 | +30 | +10% rés. poison | 15 min | 90 jours |
| 3 | +60 | +20% rés. poison | 20 min | 120 jours |
| 4 | +100 | +35% rés. poison + maladie | 30 min | 180 jours |

### 3.5 Légume cosmique (T5)

Voir §7. Effet narratif > effet pur.

---

## 4. Mécanique d'usage

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action** | 2s (cru, T1-T3) ; 3s (cuit, T4-T5) | Cru = snack rapide, cuit = repas |
| **Possible en mouvement** | Marche oui ; sprint pour cru, non pour cuit | |
| **Possible en combat** | Bloqué (cohérent [[Pain]] §4.2) | |
| **Cumul** | 1 buff alimentaire actif ; plafond 3 buffs Pain+Boisson+Légume etc. | |

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Bio (sans pesticide)** | Magnitude +15% |
| 2 | **Récolté à maturité** | Conservation +1 jour |
| 3 | **Mariné** | Convertit en sous-type Saumure |
| 4 | **Verdoyant** ([[Les Ères\|Verdoiement]]) | Magnitude × 1.5 |
| 5 | **Bénédiction terre** ([[Lore/Religions/Lex Petra]]) | +5 Endurance bonus |
| 6 | **Coupé en croix** | 50% chance double effet (gamble) |
| 7 | **Glaçé** ([[Cosmologie\|Aquor]]) | Conservation × 3, perd buff stat |
| 8 | **Doré** ([[Cosmologie\|Eldoria]]) | +20% magnitude de jour |
| 9 | **Soufflé** ([[L'Accord]]) | Résiste à la rouille post-Souffle |
| 10 | **Du jardin du Roi** | Magnitude + bonus Reconnaissance Galenor |

> **Affixes négatifs** : *Pourri* (poison T1), *Véreux* (magnitude /2), *Mou* (durée /2).

---

## 6. Recettes (Cuisine — transformation)

> Comme les [[Fruits]], les légumes frais sont récoltés (pas crafté). Ci-dessous les transformations.

### 6.1 T1 — Légume bouilli simple

| Aspect | Valeur |
|--------|--------|
| **Métier** | Cuisinier |
| **Palier** | Novice |
| **Station** | Fourneau + Plan de travail |
| **Intrants** | Légume × 3, Liquide × 1, Sel × 1 |
| **Sortie** | 3× Légume bouilli |
| **Durée** | 60s |
| **Mini-jeu** | Timing cuisson (1 jauge thermique) |

### 6.2 T2 — Saumure simple

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Plan de travail + Récipient (pot scellé) |
| **Intrants** | Légume × 4, Sel × 3, Liquide × 1, Pot × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Dosage 2 jauges (sel/liquide) + scellage |

### 6.3 T3 — Soupe campagnarde

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Fourneau + Plan de travail |
| **Intrants** | Légume × 5 (mélange), Liquide × 2, Sel × 2, Herbe × 2 (modificateur), Récipient × 1 |
| **Durée** | 2 min |
| **Mini-jeu** | Dosage 3 jauges + timing cuisson 2 phases + découpe précise |

### 6.4 T4 — Saumure rituelle

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Plan de travail + Cave de fermentation |
| **Intrants** | Légume rare × 4, Sel × 4, Épices × 3, Vinaigre × 1, Pot rituel × 1 |
| **Durée** | 5 min |
| **Mini-jeu** | Dosage 4 jauges + scellage rituel + timing fermentation |

### 6.5 T5 — Conserve cosmique

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Plan de travail + Cave + Cercle d'enchantement |
| **Intrants** | Légume cosmique × 3, Sel × 3, Cristal × 1, Pot rituel × 1 |
| **Durée** | 10 min |
| **Mini-jeu** | Dosage 5 jauges + séquence rituelle |

> **Pas de T6** : matière trop simple pour effet mythique seul. Atteignable via cumul dans plats composites.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet |
|---------|-----|-------|
| **Shadow** | Ombre Longue | Récolté nuit, +furtivité |
| **Spectral** | Échos Brisés | Buff anticipé |
| **Frost** | Sommeil de Glace | Conservation × 4 |
| **Verdoyant** | Verdoiement | Magnitude × 1.5 |
| **Brulé** | Feu Endormi | +rés. feu, −10% magnitude |
| **Pourpre** | Brume Mortelle | Immunité brume |
| **Doré** | Rêve Lumineux | +20% magnitude jour |
| **Brisé** | Échos Brisés | 50% double / 50% nul |
| **Onirique** | Sommeil Onirique | Mange en rêve |
| **Vénérable** | Présages | +durée si quête active |

---

## 8. Exemples de signatures

- **Racine d'Or de Skaldoria** (T4, identité Alkaran)
  *Tubercule rare des hauts plateaux. Effet : +110 Stamina + +10 Vigueur 8 min. Bonus narratif : monnaie d'échange tribale.*

- **Cresson d'Astravia** (T2, [[Lore/Religions/Ordo Caelum]])
  *Cultivé près des observatoires. Effet : Stamina + +2 Esprit 3 min. Bonus narratif : reconnu des Stellari.*

- **Soupe des Sept Racines** (T4, [[Lore/Religions/Lex Petra]])
  *Soupe rituelle aux 7 légumes-racines symboliques. Effet : +150 Stamina + +12 Endurance 12 min + +20% rés. dégâts physiques 5 min. Bonus narratif : témoignage devant tribunal de pierre.*

- **Saumure de Vytharia** (T3, ports portuaires)
  *Concombre acide en pot scellé. Effet : Stamina + +20% rés. poison 20 min. Bonus narratif : remède de marin.*

- **Tubercule de l'Aube Galenorienne** (T5, cosmique)
  *Cultivé pendant l'[[Les Ères|Ère du Verdoiement]]. Effet : +180 Stamina + +18 stat au choix 12 min.*

---

## 9. Conservation, stockage, dégradation

| Sous-type | Conservation T1 | Conservation T5 | Notes |
|-----------|-----------------|-----------------|-------|
| Légume-racine cru | 5 jours | 7 jours | Cave |
| Légume-feuille cru | 2 jours | 3 jours | Très fragile |
| Légume cuit | 2 jours | 3 jours | Réfrigération |
| Saumure | 90 jours | 180 jours | Pot scellé |

> **Pattern [[Pain]] §9** : racines = ×2 vs Fruits frais (plus stables) ; feuilles = ×0.7 vs Fruits (plus fragiles) ; saumure = comparable Fromage longue conservation.

---

## 10. Décisions ouvertes

- [ ] **Crus vs cuits magnitude** : cru garde la fraîcheur magique, cuit augmente magnitude — équilibrage à playtester
- [ ] **Légume = seul ou intermédiaire ?** : la majorité des légumes vont dans des plats composites (soupe, ragoût, festin) — confirmer en Phase 4 que le légume seul est utile
- [ ] **Saumure et religion** : 7 racines de [[Lore/Religions/Lex Petra]] — ritualisable comme Pain rituel ?
- [ ] **Pas de T6** : confirmé sauf si dans festin composite

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Pain]] · [[Fruits]]*
