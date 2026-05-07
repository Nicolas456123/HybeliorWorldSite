---
tags: [item, archétype, consommable, épices, modificateur, cuisine, alchimie]
type: archetype
category: Consommable
subcategory: Épices
consume: false
modifier: true
source: Récolté (Botaniste, Cueilleur) | Fabriqué (broyage, séchage)
mastery: Botanique / Cuisine / Alchimie
craft_category: Cuisine | Alchimie
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-bonus-modificateur, cumul-épices-recette, frontière-herbe-épice]
---

# 🌶️ Archétype — Épices

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]** — type **modificateur**, **non consommé directement**. Ajoutés à une recette parente ([[Pain]], [[Viande]], [[Boisson]], [[Potion]]) pour **modifier sa qualité, son effet ou son magnitude**.

---

## 1. Vue d'ensemble

Les **épices** sont des intrants **modificateurs** : graines, écorces, racines, fleurs aromatiques séchées et broyées. **Non consommables seuls** — leur usage est exclusivement comme **composant additionnel** dans une recette de cuisine ou d'alchimie (voir [[Crafts]] §Cuisine + §Alchimie).

**Ancrage gameplay :**
- **Pas un consommable direct** : `consume: false, modifier: true` dans le frontmatter
- Effet : **bonifie la recette parente** (magnitude +10-30%, durée +20%, ajoute statut secondaire, etc.)
- Cumul typique : 1-3 épices par recette ; cumul max selon palier de Maîtrise du cuisinier
- Composante centrale de l'**économie commerciale** : les épices rares valent leur poids en or

**Ancrage culturel :** la **Route des Épices** traverse Cendara → Galenor → Vytharia. Chaque pays a son épice signature. Les épices rituelles ([[Lore/Religions/Ignis Aeternum|Ignitari]] piment sacré, [[Lore/Religions/Ordo Caelum|Stellari]] safran nocturne) sont des objets de culte.

> **Frontière avec [[Herbes]]** : épice = partie sèche concentrée d'une plante (graine, écorce, racine séchée), souvent moulu/broyée. Herbe = partie verte fraîche ou séchée d'une plante. Beaucoup d'overlap — voir [[Herbes]] §1 pour arbitrage.

---

## 2. Variations / sous-types

| Sous-type | Origine | Bonus typique | Conservation |
|-----------|---------|---------------|--------------|
| **Épice de table** | Graine commune (poivre, sel) | +5-10% magnitude | 365 jours |
| **Épice fine** | Écorce/racine rare (cannelle, gingembre) | +15-20% magnitude OU statut secondaire | 365 jours |
| **Épice rare** | Plante exotique unique (safran, vanille rare) | +20-25% magnitude + effet thématique | 365 jours |
| **Épice rituelle** | Plante religieuse sacrée | Bonus thématique fort + Reconnaissance | 180 jours |
| **Épice cosmique** | Variant ère | Effet narratif unique | T5, 60 jours |

---

## 3. Effets par tier (table chiffrée canonique — bonus modificateur)

> **Loi modificateur** : le bonus s'applique à la recette parente, **pas à l'épice elle-même**. Magnitude bonus = **% appliqué à la potion/pain/viande/etc.** finale.

### 3.1 Bonus magnitude / durée

| Tier épice | Bonus magnitude recette | Bonus durée recette | Exemple |
|------------|-------------------------|---------------------|---------|
| 1 — Commun | +5% magnitude | +5% durée | Sel commun → Pain T1 +3 Stamina bonus |
| 2 — Façonné | +10% magnitude | +10% durée | Poivre noir → Viande T2 +12 Stamina bonus |
| 3 — Œuvré | +15% magnitude OU statut secondaire | +15% durée | Cannelle → Pain d'épices T3 +30 Stamina + buff Mémoire |
| 4 — Magistral | +20% magnitude + statut secondaire | +20% durée | Safran → Brioche T4 +60 Stamina + buff Présence supplémentaire |
| 5 — Légendaire | +25% magnitude + 2 statuts secondaires | +25% durée + effet narratif | Vanille rare → Pâtisserie T5 +120 Stamina + 2 effets bonus |

### 3.2 Effets thématiques (au-delà du chiffre)

| Épice typique | Effet thématique appliqué à la recette parente |
|---------------|-------------------------------------------------|
| **Cannelle** | +5 Mémoire bonus pendant la durée |
| **Gingembre** | +5% résistance maladie |
| **Clou de girofle** | +5% résistance poison |
| **Poivre noir** | +5 Vigueur bonus |
| **Cumin** | +5 Endurance bonus |
| **Safran** | +5 Présence bonus + Reconnaissance noble |
| **Vanille rare** | +5 Esprit bonus |
| **Piment volcanique** | +5% résistance feu + buff Vigueur |
| **Anis étoilé** | +5 Acuité bonus |
| **Cardamome cosmique** | Variant cosmique forcé sur recette parente |

### 3.3 Cumul d'épices dans une recette

> **Loi cumul** : cumul autorisé jusqu'à **(palier Maîtrise + 1) épices** par recette. Au-delà, magnitude cumulée plafonnée et risque effet secondaire (saveur déséquilibrée).

| Palier cuisinier | Cumul max épices | Notes |
|------------------|------------------|-------|
| Novice | 1 épice | T1-T2 |
| Initié | 2 épices | T2-T3 |
| Adepte | 3 épices | T3-T4 |
| Expert | 4 épices | T4-T5 |
| Maître | 5 épices | T5-T6 |

> **Plafond magnitude bonus** : cumul max **+50% magnitude recette** (pour empêcher le stack abusif). Au-delà, +0 supplémentaire.

---

## 4. Application en recette (équivalent §Mécanique d'usage)

> **Note méta** : cet archétype n'a **pas** de section "consommation directe" — il s'utilise dans le **mini-jeu craft** comme ajout à un dosage.

### 4.1 Mécanique d'ajout dans une recette parente

| Phase | Action |
|-------|--------|
| **Choix recette** | Le joueur sélectionne une recette de cuisine ou alchimie |
| **Ouverture slot épice** | Selon palier joueur, 1-5 slots d'épice s'ouvrent |
| **Choix épice** | Le joueur sélectionne 1 ou plusieurs épices depuis son inventaire |
| **Mini-jeu dosage épice** | Jauge supplémentaire à équilibrer (timing dans cuisson ou alchimie) |
| **Validation** | À la fin du craft, l'item produit reçoit les bonus cumulés des épices |

### 4.2 Conditions

- Une épice n'est utilisée **qu'à la cuisson/préparation**, jamais à la consommation finale
- Un item produit avec épices garde son sous-type (Pain, Potion, Viande…) avec affixe `Épicé` ou nom signature
- Retrait : **pas possible** une fois la recette validée

---

## 5. Affixes / modificateurs propres aux épices (10)

> Modificateurs intrinsèques aux épices, **avant** application en recette.

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Récolté à maturité** | +10% bonus magnitude appliqué |
| 2 | **Broyé fin** | Bonus appliqué entièrement (pas de risque mauvais dosage) |
| 3 | **Mélange parfumé** | Pack pré-mélangé : 3 épices = 1 slot |
| 4 | **Verdoyant** ([[Les Ères\|Verdoiement]]) | +50% bonus magnitude appliqué |
| 5 | **Béni** ([[Lore/Religions/Ignis Aeternum]] / autre) | +1 Reconnaissance religion lors du craft |
| 6 | **Importé** | +tag culturel : reconnu marchand pays |
| 7 | **Glaçé** ([[Cosmologie\|Aquor]]) | Conservation × 3 |
| 8 | **Doré** ([[Cosmologie\|Eldoria]]) | Cumul max +1 (slots supplémentaires en jour) |
| 9 | **Soufflé** ([[L'Accord]]) | Résiste à la rouille post-Souffle |
| 10 | **Rare provenance** | +effet thématique unique |

> **Affixes négatifs** : *Vieillie* (bonus −50%), *Humide* (bonus annulé), *Frelatée* (poison T1 sur recette parente).

---

## 6. Recettes (récolte, transformation — 1 par tier)

> Les épices sont **récoltées** par les Botanistes et Cueilleurs ([[Sources de Ressources]] §Nature). Les recettes ci-dessous = **transformation** (séchage, broyage, mélange).

### 6.1 T1 — Sel raffiné

| Aspect | Valeur |
|--------|--------|
| **Métier** | Botaniste ou Apothicaire |
| **Palier** | Novice |
| **Station** | Mortier et pilon |
| **Intrants** | Sel brut × 3 |
| **Sortie** | 5× Sel raffiné |
| **Durée** | 30s |
| **Mini-jeu** | Broyage simple (1 jauge) |

### 6.2 T2 — Poivre moulu

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Mortier |
| **Intrants** | Graine × 4 (poivre brut), Récipient × 1 |
| **Durée** | 60s |
| **Mini-jeu** | Broyage 2 jauges + tamisage |

### 6.3 T3 — Mélange d'épices

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Mortier + Plan de travail |
| **Intrants** | Épices × 3 (cannelle, gingembre, anis), Récipient × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Dosage 3 jauges + équilibre (mini-jeu dégustation virtuelle) |

### 6.4 T4 — Safran d'Astravia

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Étendoir + Mortier + Plan de travail |
| **Intrants** | Pistil de safran × 8 (rare), Sel × 1, Pot scellé × 1 |
| **Durée** | 5 min |
| **Mini-jeu** | Découpe précise (pistils) + séchage 2 phases |

### 6.5 T5 — Vanille de l'Aube

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Étendoir + Mortier + Cercle d'enchantement (mini) |
| **Intrants** | Gousse de vanille rare × 4 (cosmique), Sel rituel × 1, Pot rituel × 1 |
| **Durée** | 15 min |
| **Mini-jeu** | Découpe 5 jauges + séquence séchage rituel |

> **Pas de T6** : épice = modificateur, pas un effet en soi. Atteignable seulement via recette parente T6 dont l'épice T5 module +25%.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet sur l'épice |
|---------|-----|-------------------|
| **Shadow** | Ombre Longue | Cueillie nuit, +furtivité 5 min sur recette parente |
| **Spectral** | Échos Brisés | Bonus appliqué 3s avant fin craft |
| **Frost** | Sommeil de Glace | Conservation × 4 |
| **Verdoyant** | Verdoiement | Bonus magnitude × 1.5 |
| **Brulé** | Feu Endormi | +rés. feu sur recette parente |
| **Pourpre** | Brume Mortelle | Immunité brume sur recette parente |
| **Doré** | Rêve Lumineux | +20% bonus magnitude jour |
| **Brisé** | Échos Brisés | 50% double bonus / 50% nul |
| **Onirique** | Sommeil Onirique | Bonus persiste pendant sommeil consommateur |
| **Vénérable** | Présages | Bonus +50% durée si quête active |

---

## 8. Exemples de signatures

- **Safran d'Astravia** (T4, [[Lore/Religions/Ordo Caelum]])
  *Pistils récoltés sous la Voie lactée. Bonus : +20% magnitude + +5 Présence sur recette parente. Bonus narratif : +1 Reconnaissance Stellari.*

- **Piment Volcanique de Cendara** (T3, [[Lore/Religions/Ignis Aeternum]])
  *Cultivé sur cendres. Bonus : +15% magnitude + +5% rés. feu sur recette parente.*

- **Cannelle de Galenor** (T2, identité commerçante)
  *Importée par les marchands galenoriens. Bonus : +10% magnitude + buff Mémoire mineur.*

- **Cardamome Cosmique d'Onara** (T5, [[Les Ères\|Verdoiement]])
  *Récoltée pendant ère verdoyante. Bonus : variant cosmique forcé sur recette parente + +25% magnitude.*

- **Vanille de l'Aube** (T5, [[Les Ères\|Rêve Lumineux]])
  *Gousse rare cosmique. Bonus : +25% magnitude + 2 statuts secondaires sur recette parente.*

---

## 9. Conservation, stockage, dégradation

| Tier | Conservation par défaut | Conditions optimales | Dégradation |
|------|--------------------------|----------------------|-------------|
| 1 | 365 jours | Pot scellé sec | −10% bonus après J365 |
| 2 | 365 jours | Idem | Idem |
| 3 | 365 jours | Idem | Idem |
| 4 | 180 jours | Pot rituel scellé | −15% bonus après J180 |
| 5 | 60 jours | Pot rituel | −20% bonus après J60 |

> **Pattern unique** : épice séchée et scellée = **conservation très longue** (×30+ vs Pain). Mais les épices rares cosmiques se dégradent plus vite (T5 60j) car la magie volatile les déstabilise.

### Conditions spéciales

- **Post-[[Le Souffle|Souffle]]** : épices T4-T5 perdent 30% bonus pendant 2 semaines
- **[[Les Ères|Ère du Sommeil de Glace]]** : conservation × 2 (séchage parfait)
- **Banques d'épices Galenor** : coffre marchand × 2 conservation (service)

---

## 10. Décisions ouvertes

- [ ] **Plafond cumul magnitude +50%** : équilibrage à playtester
- [ ] **Frontière avec [[Herbes]]** : si une plante a une partie graine + partie verte (ex. coriandre = épice + herbe), 2 entrées séparées ?
- [ ] **Pas de T6** : confirmé (modificateur)
- [ ] **Épice rituelle religion** : ouvre des recettes spéciales rituelles ? Penche pour **oui** (cohérent Pain rituel)
- [ ] **Épice cosmique forçant variant** : équilibrage à valider — ne pas court-circuiter le système d'ères

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Pain]] · [[Potion]] · [[Herbes]]*
