---
tags: [item, archétype, consommable, herbes, modificateur, alchimie, cuisine]
type: archetype
category: Consommable
subcategory: Herbes
consume: false
modifier: true
source: Récolté (Botaniste, Herboriste, Cueilleur) | Fabriqué (séchage)
mastery: Botanique / Herboristerie / Alchimie / Cuisine
craft_category: Alchimie | Cuisine
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-bonus-modificateur, cumul-herbe-épice-recette, frontière-épice]
---

# 🌿 Archétype — Herbes

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]** — type **modificateur**, **non consommé directement**. Sœur des [[Épices]] : ajoutée à une recette parente ([[Potion]], [[Pain]], [[Boisson]], [[Viande]]) pour **bonifier ou orienter son effet**. Profil typique **alchimie** (légèrement + qu'épices, qui penchent cuisine).

---

## 1. Vue d'ensemble

Les **herbes** sont des plantes vertes (feuilles, tiges, fleurs fraîches ou séchées) — **non consommables seules** mais utilisées comme **modificateurs** dans une recette parente. Elles sont récoltées par les [[Métiers|Botaniste]], [[Métiers|Herboriste]] et [[Métiers|Cueilleur]] (voir [[Sources de Ressources]] §Nature).

**Ancrage gameplay :**
- **Pas un consommable direct** : `consume: false, modifier: true`
- Effet : bonifie magnitude ou ajoute statut secondaire à la recette parente
- **Profil alchimie** : les herbes sont les composants **clé** des potions et philtres (cf. [[Potion]] §6 — "Plante × N"). Cuisine secondaire (infusions, marinades).
- Conservation moyenne fraîche (1 jour), longue séchée (90+ jours)

**Ancrage culturel :** chaque biome a ses herbes. Sanguinaire d'Alkaran, hémostine de Galenor, mandragore de Vytharia, sève sacrée d'Onara, lavande d'Astravia. Les **Herboristes** sont des PNJ clés.

> **Frontière avec [[Épices]]** : épice = partie sèche concentrée d'une plante (graine, écorce, racine) souvent broyée — **Cuisine** majoritaire. Herbe = partie verte/feuille de plante, fraîche ou séchée — **Alchimie** majoritaire. Beaucoup de plantes ont les deux (ex. coriandre = feuille + graine = 2 entrées). Décision : double tag autorisé selon partie utilisée.

---

## 2. Variations / sous-types

| Sous-type | Origine | Bonus typique | Conservation |
|-----------|---------|---------------|--------------|
| **Herbe commune** | Plante de pré (camomille, menthe) | +5-10% magnitude alchimie | 1 jour fraîche, 60j séchée |
| **Herbe alchimique** | Plante rare (sanguinaire, hémostine) | +15-20% magnitude potion | 1 jour fraîche, 90j séchée |
| **Herbe rituelle** | Plante religieuse | Bonus thématique fort + Reconnaissance | 30j séchée |
| **Herbe rare** | Plante exotique unique | +20-25% magnitude + effet thématique | 1 jour fraîche, 120j séchée |
| **Herbe cosmique** | Variant ère | Effet narratif unique | T5, 30 jours |

---

## 3. Effets par tier (table chiffrée canonique)

> **Loi modificateur** : bonus appliqué à la recette parente. Magnitude bonus = % appliqué à potion/pain/etc. finale.

### 3.1 Bonus magnitude / durée

| Tier herbe | Bonus magnitude recette | Bonus durée | Profil principal |
|------------|-------------------------|-------------|------------------|
| 1 — Commun | +5% magnitude | +5% durée | Alchimie basique |
| 2 — Façonné | +10% magnitude | +10% durée | Alchimie / cuisine |
| 3 — Œuvré | +15% + statut secondaire | +15% durée | Alchimie potion T2-T3 |
| 4 — Magistral | +20% + statut secondaire | +20% durée | Potion T3-T4 |
| 5 — Légendaire | +25% + 2 statuts | +25% durée + effet narratif | Potion T4-T5 |

### 3.2 Effets thématiques

| Herbe typique | Effet thématique appliqué |
|---------------|---------------------------|
| **Sanguinaire** | Conversion partielle effet → soin (Potion / Viande) |
| **Hémostine** | +5% magnitude soin |
| **Mandragore** | +5 Esprit + risque sommeil 5% |
| **Camomille** | +10% durée buff |
| **Menthe** | +5 Acuité bonus |
| **Lavande** | +5 Esprit + résistance distorsion mentale |
| **Sève sacrée** | +1 Reconnaissance religion |
| **Mousse stellaire** | +5 Mana bonus |
| **Pétale onirique** | Effet persiste pendant sommeil |
| **Racine de mémoire** | +5 Mémoire bonus |

### 3.3 Cumul herbes + épices

> **Loi cumul** : herbes et épices se cumulent dans une même recette, partageant le **même plafond de slots** (palier Maîtrise + 1, voir [[Épices]] §3.3). Bonus magnitudes plafonné à **+50%**.

| Palier cuisinier/alchimiste | Slots herbes + épices combinés |
|------------------------------|--------------------------------|
| Novice | 1 |
| Initié | 2 |
| Adepte | 3 |
| Expert | 4 |
| Maître | 5 |

---

## 4. Application en recette

### 4.1 Mécanique d'ajout dans une recette parente

| Phase | Action |
|-------|--------|
| **Choix recette** | Joueur sélectionne potion ou plat |
| **Slots modificateurs** | 1-5 slots selon palier — **partagés herbes / épices** |
| **Choix herbe** | Sélection inventaire |
| **Mini-jeu dosage herbe** | Jauge supplémentaire ; alchimie = mortier broyage, cuisine = tri-effeuillage |
| **Validation** | Item produit reçoit bonus cumulés |

### 4.2 Conditions

- Une herbe est utilisée **à la cuisson/distillation**, jamais à la consommation finale
- Item produit garde son sous-type avec affixe `Aux herbes` ou nom signature
- **Fraîche vs séchée** : fraîche = +5% bonus supplémentaire, mais conservation très courte (1j)

---

## 5. Affixes / modificateurs propres aux herbes (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Cueillie à l'aube** | +10% bonus magnitude |
| 2 | **Cueillie de nuit** ([[Cosmologie\|Stellaris]]) | +5 Mana bonus appliqué |
| 3 | **Séchée à l'ombre** | Conservation × 2 |
| 4 | **Verdoyante** ([[Les Ères\|Verdoiement]]) | +50% bonus magnitude |
| 5 | **Bénie** ([[Lore/Religions/Foedus Animae]]/autre) | +1 Reconnaissance religion |
| 6 | **Mélange parfumé** | Pack 3 herbes = 1 slot |
| 7 | **Glaçée** ([[Cosmologie\|Aquor]]) | Conservation × 3 |
| 8 | **Doré** ([[Cosmologie\|Eldoria]]) | Slots +1 si jour |
| 9 | **Fraîche cueillette** | +5% bonus magnitude (mais 1 jour conservation) |
| 10 | **Soufflée** ([[L'Accord]]) | Résiste à la rouille post-Souffle |

> **Affixes négatifs** : *Flétrie* (bonus −50%), *Moisi* (poison T1), *Sec* (durée /2).

---

## 6. Recettes (Botanique + Alchimie — 1 par tier)

> Les herbes sont **récoltées** ([[Sources de Ressources]] §Nature) ; recettes ci-dessous = transformations (séchage, broyage, infusion concentrée).

### 6.1 T1 — Herbe séchée

| Aspect | Valeur |
|--------|--------|
| **Métier** | Botaniste ou Apothicaire |
| **Palier** | Novice |
| **Station** | Étendoir |
| **Intrants** | Herbe fraîche × 4 |
| **Sortie** | 4× Herbe séchée |
| **Durée** | 30s |
| **Mini-jeu** | Tri simple |

### 6.2 T2 — Herbe broyée

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Mortier et pilon |
| **Intrants** | Herbe séchée × 3, Pot × 1 |
| **Durée** | 60s |
| **Mini-jeu** | Broyage 2 jauges |

### 6.3 T3 — Mélange alchimique

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Mortier + Plan de travail |
| **Intrants** | Herbes × 4 (3 espèces différentes), Liquide × 1, Pot × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Dosage 3 jauges + équilibre olfactif |

### 6.4 T4 — Concentré d'herbes rares

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Mortier + Alambic |
| **Intrants** | Herbes rares × 4, Liquide × 2, Émulsion × 1, Pot scellé × 1 |
| **Durée** | 5 min |
| **Mini-jeu** | Distillation 3 phases + dosage 4 jauges |

### 6.5 T5 — Sève sacrée distillée

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Alambic + Cercle d'enchantement (mini) |
| **Intrants** | Sève sacrée × 4 (cosmique), Liquide rare × 2, Émulsion × 2, Cristal mineur × 1, Pot rituel × 1 |
| **Durée** | 15 min |
| **Mini-jeu** | Distillation 4 phases + séquence rituelle |

> **Pas de T6** : modificateur, pas effet seul.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet |
|---------|-----|-------|
| **Shadow** | Ombre Longue | Cueillie nuit, +furtivité sur recette |
| **Spectral** | Échos Brisés | Bonus appliqué 3s avant fin craft |
| **Frost** | Sommeil de Glace | Conservation × 4 |
| **Verdoyant** | Verdoiement | Bonus magnitude × 1.5 |
| **Brulé** | Feu Endormi | +rés. feu |
| **Pourpre** | Brume Mortelle | Immunité brume sur recette |
| **Doré** | Rêve Lumineux | +20% bonus magnitude jour |
| **Brisé** | Échos Brisés | 50% double / 50% nul |
| **Onirique** | Sommeil Onirique | Bonus persiste pendant sommeil |
| **Vénérable** | Présages | Bonus +50% durée si quête active |

---

## 8. Exemples de signatures

- **Sanguinaire d'Alkaran** (T3, identité Vael'Kurash)
  *Plante rouge sang des fjords. Bonus alchimique : +15% magnitude + conversion partielle en soin sur potion parente.*

- **Hémostine de Galenor** (T2, marchande)
  *Plante commune des plaines. Bonus alchimique : +10% magnitude soin.*

- **Mandragore de Vytharia** (T4, espionnage)
  *Récoltée en cave secrète. Bonus alchimique : +20% magnitude + +5 Esprit + risque sommeil 5% sur potion.*

- **Lavande d'Astravia** (T3, [[Lore/Religions/Ordo Caelum]])
  *Cultivée près observatoires. Bonus : +15% magnitude + résistance distorsion mentale.*

- **Sève Sacrée d'Onara** (T5, [[Lore/Religions/Foedus Animae]])
  *Récoltée d'arbres anciens. Bonus : +25% magnitude + +1 Reconnaissance Animari + variant cosmique forcé.*

---

## 9. Conservation, stockage, dégradation

| Sous-type | Conservation T1 | Conservation T5 | Notes |
|-----------|-----------------|-----------------|-------|
| Fraîche | 1 jour | 1 jour | Très fragile |
| Séchée | 60 jours | 120 jours | Pot scellé |
| Broyée | 90 jours | 150 jours | Pot scellé sec |
| Cosmique | 30 jours | 30 jours | Instable |

> **Pattern** : herbes séchées = conservation longue, fraîches = très courtes (équivalent fruits frais).

### Conditions spéciales

- **Post-[[Le Souffle|Souffle]]** : herbes T4-T5 perdent 30% bonus pendant 2 semaines
- **[[Les Ères|Ère du Verdoiement]]** : récolte × 2 + magnitude × 1.5
- **[[Les Ères|Ère du Sommeil de Glace]]** : conservation × 2 (séchage parfait)

---

## 10. Décisions ouvertes

- [ ] **Frontière épices/herbes** : double-tag pour plante hybride (coriandre) — confirmer Phase 4
- [ ] **Plafond cumul +50% magnitude** : équilibrage à playtester (mêmes règles qu'épices)
- [ ] **Pas de T6** : confirmé (modificateur)
- [ ] **Herbe rituelle** : ouvre recettes alchimiques rituelles ? Penche pour **oui**
- [ ] **Récolte fraîche dans recette** : avantage de fraîcheur à playtester (incite à craft proche du lieu de récolte)

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Potion]] · [[Pain]] · [[Épices]]*
