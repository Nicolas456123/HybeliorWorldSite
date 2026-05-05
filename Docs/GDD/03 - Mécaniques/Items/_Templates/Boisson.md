---
tags: [item, archétype, consommable, boisson, alchimie, cuisine, brasserie]
type: archetype
category: Consommable
subcategory: Boisson
source: Fabriqué
mastery: Brasserie / Alchimie / Cuisine
craft_category: Alchimie | Cuisine
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-buff-vs-pain, action-en-combat-pénalité, overlap-potion-buff]
---

# 🍺 Archétype — Boisson

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. Frère liquide du [[Pain]] et cousine alchimique de la [[Potion]] — la **boisson** combine **action rapide liquide** (utilisable en combat avec malus) et **buff de durée moyenne** (entre Potion burst et Pain durée longue).

---

## 1. Vue d'ensemble

Une **boisson** est un liquide non-thérapeutique fabriqué par [[Métiers|Brasseur]], [[Métiers|Distillateur]], [[Métiers|Cuisinier]] ou [[Métiers|Alchimiste]] (variantes alchimiques) — voir [[Crafts]] §Alchimie + §Cuisine. Elle est **bue** pour obtenir un **buff temporaire** : focus mental, force physique, charisme social, résistance à un élément, ou recharge mineure de ressource.

**Ancrage gameplay :**
- Pont entre [[Potion]] (burst combat, action 1.5s) et [[Pain]] (durée longue, hors-combat strict 3-5s)
- Action liquide 2-3s **utilisable en combat avec malus** (voir §4)
- Magnitude buff plus modeste que Pain, mais durée plus longue (effet liquide qui imprègne)
- Composante centrale de l'économie tavernière, des marchés portuaires et des cérémonies sociales

**Ancrage culturel :** chaque pays a ses boissons signature (bière noire d'Alkaran, vin doré de Galenor, eau-de-vie volcanique de Cendara). La boisson est un **marqueur d'identité**, parfois un **outil diplomatique** (offrir un verre = geste codifié).

---

## 2. Variations / sous-types

> **6 sous-types canoniques** de boissons. Le sous-type détermine la station de craft principale et le profil de buff.

| Sous-type | Effet principal | Public | Notes |
|-----------|-----------------|--------|-------|
| **Eau / Boisson neutre** | Restaure très peu de Stamina, hydratation | Tous | T1 universelle, indispensable voyage long |
| **Bière / Hydromel** | Stamina + buff Présence/Vigueur léger | Soldats, fermiers, peuple | Brasserie T1-T4, conservation moyenne |
| **Vin / Spiritueux** | Buff Présence (social) + résistance froid | Nobles, marchands, fêtes | Distillateur T2-T5, conservation longue |
| **Tisane / Infusion** | Buff Esprit/Mémoire + régen Mana mineure | Mages, érudits, malades | Apothicaire T1-T4, action plus rapide (2s) |
| **Élixir énergétique** | Buff stat brute (Vigueur/Vivacité/Acuité) | Aventuriers, athlètes | Alchimiste T3-T5, magnitude proche [[Potion]] §3.5 |
| **Boisson cosmique** | Effet lié à une [[Les Ères\|ère]] | Spécial | T5-T6, débloquée via ère ou rituel — voir §7 |

> **Frontière avec [[Potion]]** : une boisson n'a **jamais** la magnitude d'un soin de potion (pas de restauration HP majeure). Elle ne soigne pas — elle **prépare** ou **accompagne**. Si le liquide soigne, c'est une potion, pas une boisson.

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Personnage]]** : magnitude du buff stat = **80% du Pain équivalent**, durée = **×1.4** (effet imprégnant). Magnitude restauration ressource = **40% Potion équivalente** (jamais le rôle principal).

### 3.1 Boisson — Buff stat brute (1 stat)

| Tier | Nom typique | Buff stat | Durée buff | Conservation | Action |
|------|-------------|-----------|------------|--------------|--------|
| 1 — Commun | Bière de table | +3 stat | 7 min | 5 jours | 2s |
| 2 — Façonné | Vin de pays | +6 stat | 10 min | 30 jours | 2s |
| 3 — Œuvré | Hydromel doré | +12 stat | 15 min | 90 jours | 2.5s |
| 4 — Magistral | Eau-de-vie cendrée | +20 stat | 25 min | 180 jours | 2.5s |
| 5 — Légendaire | Élixir des Veilleurs | +35 stat (1 stat) + 10 stat secondaire | 40 min | 365 jours | 3s |
| 6 — Mythique | Cuvée de l'Aube | +60 stat (double stat) + buff narratif | 60 min | 30 jours (instable) | 3s |

### 3.2 Boisson — Restauration ressource (mineure, secondaire)

| Tier | Stamina rendu | Mana rendu (tisane) | Régen sur durée |
|------|---------------|---------------------|-----------------|
| 1 | +25 Stamina | +15 Mana | — |
| 2 | +50 | +35 | +3/s × 5 min |
| 3 | +90 | +70 | +6/s × 7 min |
| 4 | +150 | +130 | +10/s × 10 min |
| 5 | +250 | +220 | +18/s × 15 min |
| 6 | +400 + 15% max temp | +350 + 15% max temp | +30/s × 20 min |

### 3.3 Boisson — Résistance élémentaire

| Tier | Résistance unique (feu/froid/foudre/poison) | Durée |
|------|---------------------------------------------|-------|
| 2 | +10% | 10 min |
| 3 | +20% | 15 min |
| 4 | +30% | 20 min |
| 5 | +45% | 30 min |
| 6 | +60% + immunité statut associé | 45 min |

### 3.4 Risque effet secondaire (alcool, surcharge)

| Tier | Risque | Effet secondaire si déclenché |
|------|--------|-------------------------------|
| 1-2 | 0% | — |
| 3 | 5% | Étourdi 3s (vision floue, −5 Acuité) |
| 4 | 10% | Étourdi 5s |
| 5 | 15% | Étourdi 5s + nausée (annule prochain buff alimentaire) |
| 6 | 25% | Voir §10 — risque d'addiction durable |

---

## 4. Mécanique d'usage

### 4.1 Action boire — pont Potion/Pain

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action boire** | 2s (T1-T2), 2.5s (T3-T4), 3s (T5-T6) | Plus rapide que Pain (3-5s), plus lent que Potion (1.5s) |
| **Possible en mouvement** | Oui (marche), non sprint, non saut | |
| **Possible en combat** | **Oui avec malus** : durée action +1s, magnitude buff −20% si bue en combat | Différencie de Pain (bloqué) et Potion (sans malus) |
| **Interruption si dégâts** | Oui — annule la boisson et déclenche cooldown 5s | |
| **Buff appliqué** | À la fin de l'action | |

### 4.2 Cooldown

| Mécanique | Valeur |
|-----------|--------|
| **Cooldown global boisson** | 60s entre 2 boissons (toutes catégories) |
| **Cooldown vs Potion** | 8s (cf. [[Potion]] §4.2 inter-catégories) |
| **Cooldown vs Pain** | 0s (catégorie distincte) |
| **Cumul Boisson** | 1 seule boisson active à la fois ; nouvelle boisson **remplace** l'ancienne |

### 4.3 Cumul de buffs alimentaires (rappel canonique)

> **Plafond canonique consommable** : **3 buffs alimentaires actifs simultanément** (Pain + Boisson + Gâteau/Fruit/etc.) — voir [[Pain]] §4.3. Une potion (effet médical) ne compte pas dans ce plafond.

| Cumul | Autorisé ? |
|-------|-----------|
| Boisson + Pain | Oui |
| Boisson + Potion | Oui |
| Boisson + 2e Boisson | Non — remplace |
| Boisson + Boisson cosmique T6 | Non — remplace |

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Brassée à la lune** | +20% durée si bue de nuit |
| 2 | **Cuvée du voyageur** ([[Les Ères\|Vents Bouleversants]]) | Conservation × 2 en sacoche/monture |
| 3 | **Distillation pure** | Pas de risque effet secondaire (annule §3.4) |
| 4 | **Trinquée** | Si bue à plusieurs joueurs en même temps (5s window), magnitude +15% pour tous |
| 5 | **Maturée en cave** | +1 tier de magnitude après 90 jours de stockage |
| 6 | **Bénie par un clergé** | Buff narratif Reconnaissance +1 zone religieuse |
| 7 | **Glaçée** ([[Cosmologie\|Aquor]]) | Annule le malus combat (−20% magnitude) |
| 8 | **Enivrante** | Magnitude ×1.4, mais 100% chance d'étourdi 5s en fin de buff |
| 9 | **Toast cosmique** ([[Les Ères\|Rêve Lumineux]]) | Si bue de jour, +1 stat secondaire au choix |
| 10 | **Soufflée** ([[L'Accord]] post-Souffle) | Résiste à la rouille post-Souffle |

> **Affixes négatifs** : *Éventée* (−25% magnitude), *Vinaigre* (50% chance effet secondaire), *Coupée* (durée /2).

---

## 6. Recettes (Brasserie / Alchimie / Cuisine — 1 par tier)

> Stations : **Cuve à fermentation** (brasserie/distillation, [[Crafts]] §Alchimie) ou **Fourneau + Pétrin** (tisane, [[Crafts]] §Cuisine). Mini-jeu canonique : **dosage fermentation + timing maturation**.

### 6.1 T1 — Bière de table

| Aspect | Valeur |
|--------|--------|
| **Métier** | Brasseur ou Cuisinier |
| **Palier** | Novice |
| **Station** | Cuve à fermentation (basique) |
| **Intrants** | Céréale × 2 (orge), Liquide × 1 (eau), Levain × 1, Récipient × 1 (chope ou bouteille) |
| **Sortie** | 4× Bière de table |
| **Durée gameplay** | 60s (simulation : 2 jours fermentation pour PNJ) |
| **Mini-jeu** | Dosage simple (1 jauge) |

### 6.2 T2 — Vin de pays

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Cuve à fermentation + Plan de travail |
| **Intrants** | Fruit × 3 (raisin), Liquide × 1, Levain × 1, Bouteille × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Dosage 2 jauges + timing maturation (jauge fermentation 15s) |

### 6.3 T3 — Hydromel doré

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Cuve à fermentation + Alambic (filtration) |
| **Intrants** | Miel × 4, Liquide × 1, Herbe × 2 (modificateur), Levain × 1, Bouteille scellée × 1 |
| **Durée** | 2 min |
| **Mini-jeu** | Dosage 3 jauges + timing fermentation 2 phases |

### 6.4 T4 — Eau-de-vie cendrée

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Cuve + Alambic + Cornue (distillation) |
| **Intrants** | Fruit × 3, Cendre rituelle × 1, Épice × 2, Émulsion alchimique × 2, Bouteille gravée × 1 |
| **Durée** | 4 min |
| **Mini-jeu** | Dosage 4 jauges + timing distillation 3 phases |

### 6.5 T5 — Élixir des Veilleurs

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Cuve + Alambic + Cucurbite |
| **Intrants** | Fruit cosmique × 3, Larme × 1, Essence spirituelle × 1, Cristal de Voie × 1, Bouteille rituelle × 1 |
| **Durée** | 10 min |
| **Mini-jeu** | Dosage 6 jauges + timing distillation 4 phases + séquence rituelle |

### 6.6 T6 — Cuvée de l'Aube

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître + condition cachée 🔒 (ère [[Les Ères\|Rêve Lumineux]] OU [[Lore/Religions/Ordo Caelum]] Reconnaissance Maître) |
| **Station** | Cuve + Alambic + Cercle d'enchantement |
| **Intrants** | Fruit d'or × 3, Larme d'Eldoria × 1, Essence × 3, Cristal de Voie d'Eldoria × 1, Bouteille sertie × 1 |
| **Durée** | 30 min (rituel) |
| **Mini-jeu** | Dosage 8 jauges + canalisation [[Le Lien\|Voie d'Eldoria]] palier Adepte minimum |

> **Pattern recette canonique** : tier N = N intrants principaux (fruits/céréales/miel/herbes) + (N-1) secondaires (levain, épice, émulsion) + 1 récipient ≥ T-1.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet sur la boisson |
|---------|-----|----------------------|
| **Shadow** ([[Cosmologie\|Noctis]]) | Ombre Longue | Buff invisible, +10% furtivité |
| **Spectral** ([[Cosmologie\|Tempora]]) | Échos Brisés | Buff démarre 3s avant fin de l'action |
| **Frost** ([[Cosmologie\|Aquor]]) | Sommeil de Glace | Conservation × 3, +résistance froid 15% |
| **Verdoyant** ([[Cosmologie\|Spiritus]]) | Verdoiement | Régen Stamina hors combat doublée |
| **Brulé** (Voie de Feu) | Feu Endormi | +résistance feu 25%, magnitude −10% |
| **Pourpre** ([[Cosmologie\|Umbra]]) | Brume Mortelle | Immunité brume 30 min |
| **Doré** ([[Cosmologie\|Eldoria]]) | Rêve Lumineux | Magnitude +25% si bue de jour |
| **Brisé** ([[Cosmologie\|Tempora]]) | Échos Brisés | 50% double durée / 50% durée /2 |
| **Onirique** ([[Cosmologie\|Somnix]]) | Sommeil Onirique | Buff persiste pendant le sommeil, régen Mana ×2 |
| **Vénérable** ([[Cosmologie\|Fatum]]) | Présages | +50% durée par quête active |

---

## 8. Exemples de signatures

> Signatures CSV (type 14 — Boisson) — interprétation contextuelle :

- **Élingue banane** (T3, Hydromel exotique de Galenor)
  *Cocktail tropical à base de fruit-tendre fermenté. Effet : +10 Vivacité 15 min + ricochet de mouvement (les esquives consomment moins de Stamina). Bonus narratif : geste de bienvenue dans les ports galenoriens.*

- **Score fou** (T4, Eau-de-vie de tournoi cendarien)
  *Distillée pour célébrer une victoire. Effet : +20 Vigueur 25 min + immunité étourdi pendant le buff. Bonus narratif : reconnu par les arènes de Cendara.*

- **Tempête démoniaque** (T5, Spiritueux noir de Vytharia)
  *Distillation noire des Veilari [[Lore/Religions/Noctari]]. Effet : +35 Acuité 40 min + voit les ennemis à travers les murs (10s par minute). Bonus narratif : marqueur d'allégeance aux espions.*

- **Boire un buzzer** (T2, Tisane énergisante d'Astravia)
  *Infusion d'herbes stimulantes. Effet : +6 Vivacité 10 min + annule fatigue voyage. Bonus narratif : dans l'inventaire de tout astronome qui veille.*

- **Amigo universel** (T3, Vin diplomatique galenorien)
  *Cuvée offerte aux ambassadeurs. Effet : +12 Présence 15 min + +5 Reconnaissance toute zone neutre. Bonus narratif : dialogues débloqués avec marchands de tous les pays.*

- **Lever de soleil démoniaque** (T6, Cuvée cosmique [[Les Ères\|Rêve Lumineux]])
  *Cuvée mythique brassée à l'aube d'un changement d'ère. Effet : +60 stat double + déverrouille un dialogue oraculaire unique. Conservation 30 jours seulement (instable).*

---

## 9. Conservation, stockage, dégradation

| Tier | Conservation par défaut | Conditions optimales | Dégradation |
|------|--------------------------|----------------------|-------------|
| 1 | 5 jours | Cave fraîche | Vinaigre J7, gaspillée J14 |
| 2 | 30 jours | Cave + scellé | −10% magnitude J30, gaspillée J60 |
| 3 | 90 jours | Cave + cire | −5% magnitude J90, gaspillée J180 |
| 4 | 180 jours | Cave magique | Stable, gaspillée J365 |
| 5 | 365 jours | Cave magique + cristal | Stable, peut bonifier (affixe Maturée) |
| 6 | 30 jours réels (instable) | Aucun stockage durable | Mythique = volatile |

> **Pattern cohérent [[Potion]] §9** : conservation longue (méthode fermentation/distillation = stable), inversion T6 instable.

---

## 10. Décisions ouvertes

- [ ] **Malus boisson en combat (−20%)** : suffisant pour différencier de Potion ? Ou ajouter cooldown spécifique ?
- [ ] **Addiction T5-T6** : pénalité durable (−5 stat permanente après 10 usages) ou cooldown allongé ?
- [ ] **Boisson + Pain cumul** : 3 buffs alimentaires max — confirmer en playtest
- [ ] **Boisson religieuse** : variant rituel comme le Pain rituel ? Penche pour **oui** (boisson eucharistique)
- [ ] **Brasseur vs Distillateur vs Cuisinier vs Alchimiste** : 4 métiers se chevauchent — affiner les frontières en Phase 4

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Métiers]] · [[Combat]] · [[Personnage]] · [[Pain]] · [[Potion]] · [[Les Ères]]*
