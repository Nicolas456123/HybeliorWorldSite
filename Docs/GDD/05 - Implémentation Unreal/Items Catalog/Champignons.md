---
tags: [item, archétype, consommable, champignons, nourriture, alchimie]
type: archetype
category: Consommable
subcategory: Champignons
source: Récolté (Mycologue) | Fabriqué (cuit, séché)
mastery: Mycologie / Cuisine / Alchimie
craft_category: Cuisine | Alchimie
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-effets-cosmiques-rares, frontière-alchimie-cuisine, champignons-toxiques]
---

# 🍄 Archétype — Champignons

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. **Hybride nourriture / alchimie** : consommable direct (snack, soupe, repas) ou **composant alchimique** clé pour potions et philtres. Certains champignons rares portent des **effets cosmiques uniques**.

---

## 1. Vue d'ensemble

Les **champignons** sont récoltés par le [[Métiers|Mycologue]] et le [[Métiers|Cueilleur]] (voir [[Sources de Ressources]] §Nature, [[Crafts]] §Récolte). Consommables après cuisson (la majorité), ou utilisés comme **intrants alchimiques** dans les potions et philtres ([[Crafts]] §Alchimie).

**Ancrage gameplay :**
- **Double usage** : consommé direct OU composant alchimique (frontière naturelle Cuisine/Alchimie)
- Magnitude proche [[Fruits]] / [[Légumes]] consommé seul ; effet plus fort en composant de potion
- **Effets cosmiques rares** : certains champignons (T5-T6) portent des effets narratifs uniques (vision, communion, distorsion temporelle)
- Conservation moyenne ; séchage = ×5

**Ancrage culturel :** champignons de forêt d'Alkaran (cèpes, pieds-de-mouton), champignons de cave de Vytharia (cultivés en obscurité), champignons cosmiques d'Onara ([[Lore/Religions/Foedus Animae|Animari]] les considèrent sacrés). Les **toxiques** sont aussi recherchés par les empoisonneurs.

---

## 2. Variations / sous-types

| Sous-type | État | Effet principal | Conservation |
|-----------|------|-----------------|--------------|
| **Champignon comestible** | Cuit | Stamina + Esprit ou Endurance | 1-3 jours frais, 30j séché |
| **Champignon toxique** | Pas consommable seul | Composant poison | 60j séché |
| **Champignon alchimique** | Composant potion | Modificateur effets | Variable |
| **Champignon cosmique** | Variant ère ou rare | Effet narratif unique | T5-T6, 7 jours |
| **Champignon hallucinogène** | Préparation rituelle | Vision + buff Esprit | 30j séché |

> **Note** : un champignon **cru** est rarement consommable en sécurité. Crust direct = effet aléatoire (50% bénéfique, 50% poison T1) sauf si espèce explicitement comestible crue (rare).

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Pain]] §10** : magnitude consommé seul = Pain / 3 (snack). En composant alchimique, modifie/booste la potion de base.

### 3.1 Champignon cuit (consommé seul)

| Tier | Nom typique | Stamina rendu | Buff stat | Durée | Conservation |
|------|-------------|---------------|-----------|-------|--------------|
| 1 — Commun | Pied-de-mouton | +25 | — | — | 1 jour |
| 2 — Façonné | Cèpe boulanger | +50 | +2 Endurance ou Esprit | 5 min | 2 jours |
| 3 — Œuvré | Morille noire | +90 | +5 Esprit | 8 min | 3 jours |
| 4 — Magistral | Truffe royale | +140 | +10 Présence + 5 Esprit | 12 min | 3 jours |
| 5 — Légendaire | Champignon stellaire | +220 | +18 Esprit + vision arcanique 30s | 18 min | 5 jours |
| 6 — Mythique | Spore de l'Aube | +350 + 25% Mana max temp | +30 stat double + effet narratif | 30 min | 7 jours (instable) |

### 3.2 Champignon comme intrant alchimique

> Le champignon **modifie la magnitude ou ajoute un effet** à une potion ou philtre. Voir [[Potion]] §6 — Émulsion alchimique × N.

| Tier intrant | Bonus à la potion | Notes |
|--------------|-------------------|-------|
| 2 | +5% magnitude | Substitut basique aux Plantes |
| 3 | +10% magnitude OU +5s durée | Améliore [[Potion]] T2-T3 |
| 4 | +15% magnitude OU ajoute statut secondaire | [[Potion]] T3-T4 |
| 5 | +20% magnitude + effet cosmique mineur | [[Potion]] T4-T5 |
| 6 | +25% magnitude + variant cosmique forcé | [[Potion]] T5-T6 — composant ultime |

### 3.3 Champignon hallucinogène (préparation rituelle)

| Tier | Effet vision | Durée | Risque |
|------|--------------|-------|--------|
| 3 | Voit les esprits 30s | 30s | 5% nausée |
| 4 | Voit les morts récents 1 min | 1 min | 10% étourdi |
| 5 | Communion avec un esprit ancien (dialogue) | 2 min | 15% perte de Reconnaissance temporaire |
| 6 | Vision oraculaire (révèle un événement futur) | Permanent (1 vision) | 25% — voir §10 |

---

## 4. Mécanique d'usage

### 4.1 Consommation directe

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action** | 2s (cru, T1-T2 — rare), 3s (cuit, T2-T6) | |
| **Possible en mouvement** | Marche oui, sprint non, saut non | |
| **Possible en combat** | **Bloqué** | |
| **Cumul** | 1 buff alimentaire actif ; plafond 3 buffs simultanés | |

### 4.2 Usage alchimique

> Le champignon comme intrant n'est pas consommé directement par le joueur — il entre dans une recette de [[Potion]] ou [[Boisson]] alchimique. La magnitude ci-dessus (§3.2) module la potion-mère.

### 4.3 Hallucinogène rituel

| Mécanique | Valeur |
|-----------|--------|
| **Préparation** | Mini-jeu Mycologue + cuisson rituelle (5-30 min selon tier) |
| **Cooldown effet vision** | 1 effet vision par 24h (anti-spam narratif) |
| **Risque** | Voir §3.3 — risques croissants par tier |

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Cueilli sous la pleine lune** | +20% magnitude si Voie active |
| 2 | **Trempé dans le miel** | Convertit toxicité en buff bénin |
| 3 | **Séché au soleil** | Conservation × 5 |
| 4 | **Verdoyant** ([[Les Ères\|Verdoiement]]) | Magnitude × 1.5 |
| 5 | **Spore vivace** | Replante automatiquement à la cueillette (+1 ressource régénérée) |
| 6 | **Onirique** ([[Cosmologie\|Somnix]]) | Buff persiste pendant le sommeil |
| 7 | **Toxique contrôlé** | +30% magnitude, mais 100% chance étourdi 5s |
| 8 | **Béni** ([[Lore/Religions/Foedus Animae]]) | +1 Reconnaissance Animari |
| 9 | **Ancien** | Effet vision (cf. §3.3) |
| 10 | **Soufflé** ([[L'Accord]]) | Résiste à la rouille post-Souffle |

> **Affixes négatifs** : *Pourri* (poison T1-T2), *Vénéneux* (poison T3 si pas neutralisé), *Sec* (durée /2).

---

## 6. Recettes (Cuisine + Alchimie — 1 par tier)

### 6.1 T1 — Champignon poêlé

| Aspect | Valeur |
|--------|--------|
| **Métier** | Cuisinier ou Mycologue |
| **Palier** | Novice |
| **Station** | Fourneau |
| **Intrants** | Champignon × 3, Sel × 1, Beurre × 1 |
| **Durée** | 30s |
| **Mini-jeu** | Timing cuisson |

### 6.2 T2 — Soupe aux cèpes

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Fourneau + Plan de travail |
| **Intrants** | Champignon × 4, Liquide × 2, Sel × 2, Herbe × 1, Pot × 1 |
| **Durée** | 60s |
| **Mini-jeu** | Dosage 2 jauges + timing cuisson |

### 6.3 T3 — Morille rituelle

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Fourneau + Plan de travail + (option) Mortier alchimique |
| **Intrants** | Champignon noble × 3, Beurre × 2, Herbes × 2, Liquide × 1, Récipient × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Dosage 3 jauges + timing cuisson 2 phases |

### 6.4 T4 — Truffe noire affinée

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Fourneau + Plan de travail + Atelier de pâtisserie |
| **Intrants** | Truffe rare × 2, Beurre raffiné × 2, Épices × 3, Sel rituel × 2, Liquide rare × 1 |
| **Durée** | 5 min |
| **Mini-jeu** | Dosage 4 jauges + séquence d'incorporation |

### 6.5 T5 — Champignon stellaire

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Fourneau + Cercle d'enchantement (mini) |
| **Intrants** | Champignon cosmique × 2, Beurre béni × 2, Cristal mineur × 1, Épices × 4, Larme × 1 |
| **Durée** | 10 min |
| **Mini-jeu** | Dosage 6 jauges + séquence rituelle |

### 6.6 T6 — Spore de l'Aube

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître + condition cachée 🔒 (récolté en grotte cosmique pendant ère onirique) |
| **Station** | Fourneau + Cercle d'enchantement + Mortier rituel |
| **Intrants** | Spore mythique × 1, Larme × 2, Cristal de Voie × 1, Beurre béni × 3, Épices × 5 |
| **Durée** | 1h (rituel) |
| **Mini-jeu** | Dosage 8 jauges + canalisation Voie palier Adepte |

> **Pattern recette canonique** : tier N = N intrants principaux + (N-1) secondaires + station ≥ T-1.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet |
|---------|-----|-------|
| **Shadow** | Ombre Longue | Cueilli nuit, +furtivité |
| **Spectral** | Échos Brisés | Buff anticipé |
| **Frost** | Sommeil de Glace | Conservation × 4 |
| **Verdoyant** | Verdoiement | Magnitude × 1.5 |
| **Brulé** | Feu Endormi | +rés. feu |
| **Pourpre** | Brume Mortelle | Immunité brume |
| **Doré** | Rêve Lumineux | +20% magnitude jour |
| **Brisé** | Échos Brisés | 50% double / 50% nul |
| **Onirique** | Sommeil Onirique | **Vision en rêve = vision réelle** (synergie majeure) |
| **Vénérable** | Présages | Effet oraculaire prolongé |

---

## 8. Exemples de signatures

- **Truffe Royale de Galenor** (T4, marchande)
  *Truffe noire de cave noble. Effet : Stamina + +10 Présence + 5 Esprit 12 min. Bonus narratif : badge gourmet.*

- **Morille des Caves d'Onara** (T3, [[Lore/Religions/Foedus Animae]])
  *Morille noire à effet médium. Effet : Stamina + +5 Esprit + voit les esprits 30s.*

- **Champignon Stellaire d'Astravia** (T5, [[Lore/Religions/Ordo Caelum]])
  *Cultivé sous lumière stellaire. Effet : Stamina + +18 Esprit + vision arcanique 30s.*

- **Spore de l'Aube Onarienne** (T6, cosmique)
  *Spore récoltée au lever d'une ère. Effet : Stamina + double stat + vision oraculaire.*

- **Champignon Vénéneux Vytharien** (T3, espionnage)
  *Toxique contrôlé. Effet (préparation antidote ou poison) : composant base poison T3.*

---

## 9. Conservation, stockage, dégradation

| Sous-type | Conservation T1 | Conservation T5 | Notes |
|-----------|-----------------|-----------------|-------|
| Frais | 1 jour | 5 jours | Cave fraîche |
| Cuit | 1 jour | 3 jours | Réfrigération |
| Séché | 30 jours | 90 jours | Pot scellé |
| Cosmique | 7 jours | 7 jours | Instable T5-T6 |

> **Pattern [[Pain]] §10** : champignon frais = ×0.5 Pain ; séché = ×7-10 Pain.

### Conditions spéciales

- **Verdoiement** : magnitude × 1.5 + spore qui repousse
- **Post-[[Le Souffle|Souffle]]** : champignons cosmiques T5-T6 perdent effet narratif pendant 2 semaines
- **Conservation en cave de Vytharia** : ×3 conservation gratuite (service Mycologue)

---

## 10. Décisions ouvertes

- [ ] **Frontière Cuisine/Alchimie** : champignon = double usage. Faut-il forcer un tag selon usage ? Penche pour **double tag autorisé**
- [ ] **Effet vision oraculaire T6** : narratif fort — limiter à 1 vision par personnage par mois ? Discuter en Phase 4
- [ ] **Cru vs cuit** : crus = aléatoire (50% bénéfique / 50% poison) — confirmer pour ne pas créer de griefing
- [ ] **Champignon hallucinogène** : effets narratifs uniquement, pas mécaniques — confirmer pour ne pas dériver vers magie de seconde main
- [ ] **Spore de l'Aube T6** : effet narratif > effet pur — équilibrage à playtester

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Potion]] · [[Pain]] · [[Herbes]]*
