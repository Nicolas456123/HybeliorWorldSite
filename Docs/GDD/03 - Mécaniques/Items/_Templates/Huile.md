---
tags: [item, archétype, ressource, fabriqué, intermédiaire, huile, alchimie, cuisine]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Pressier / Apothicaire
intrants_typiques: [Graine, Fruit, Graisse animale, Fleur (huiles essentielles)]
craft_category: Alchimie | Cuisine
métiers_consommateurs: [Cuisinier, Apothicaire, Alchimiste, Métallurgiste (lubrification), Lampiste]
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [huile-magique-T6-existence, frontière-huile-essentielle-extrait]
---

# 🛢 Archétype — Huile

> Liquide gras pressé à partir de graines, fruits oléagineux, graisses animales ou fleurs. Intermédiaire **transversal** : cuisine, alchimie, lubrification métallurgique, lampes à huile, cosmétique.

---

## 1. Vue d'ensemble

Le **Pressier** (sous-spécialité Apothicaire / Cuisinier selon le contexte) extrait l'huile par **pression mécanique** (graines, fruits) ou **fonte douce** (graisse animale) ou **distillation** (fleurs → huiles essentielles). Le résultat est un liquide gras stocké en cruche.

**Rôle d'intermédiaire :**
- **Sortie** : 1 lot d'oléagineux → 1 cruche d'huile selon palier
- **Entrée** : Cuisine (friture, sauces — voir [[Champignons]] §6 *Beurre*), Alchimie (base de potions [[Potion]] §recettes), Lampes (éclairage, voir Architecture Phase 4), Lubrification ([[Fil métallique]] §recette), Cosmétique (parfumerie)

---

## 2. Variations / matériaux

| Source | Tier plancher | Huile produite | Usage principal |
|--------|---------------|------------------|------------------|
| **Olives / fruits oléagineux** | T1 | Huile végétale | Cuisine, cosmétique |
| **Tournesol / colza (graines)** | T1 | Huile de graines | Cuisine, friture |
| **Lin (graines)** | T2 | Huile de lin | Lubrification, peinture |
| **Noix nobles (noix, amande)** | T2 | Huile de noix | Pâtisserie, cosmétique haut tier |
| **Graisse animale** | T1 | Huile de graisse | Lampes, savonnerie, cuir gras |
| **Fleur (rose, lavande)** | T3 | Huile essentielle | Parfumerie, alchimie haute |
| **Fleur cosmique** | T4 | Huile essentielle rare | Alchimie focus, encens magique |
| **Graine de Cœur de plante** | T4 | Huile magique | Alchimie potions T4-T5 |
| **Larme** ([[Sources de Ressources]] §Créature) | T5 | Huile de Larme | Onguents oraculaires |

---

## 3. Tier × Qualité

| Tier | Nom | Source × | Cruches produites | Maîtrise | Durée |
|------|-----|----------|---------------------|----------|-------|
| T1 | Huile commune | 4 | 1 | Novice | 120 s |
| T2 | Huile façonnée (vierge, première pression) | 4 | 1 | Initié | 240 s |
| T3 | Huile œuvrée (essentielle) | 4 + Liquide × 2 | 0.5 | Adepte | 480 s |
| T4 | Huile magistrale (essentielle rare) | 4 + composant rare | 0.5 | Expert | 900 s |
| T5 | Huile légendaire (Larme, fleur cosmique) | 2 + composant ère | 0.25 | Maître | 1800 s |

> Pas de T6 : l'huile plafonne T5. Au-delà, on entre dans les **Émulsions alchimiques** (voir [[Émulsion alchimique]]).

---

## 4. Recette de production

> Catégorie : **Alchimie** (huiles essentielles) ou **Cuisine** (huiles alimentaires). Station : **Pressoir** (oléagineux) ou **Alambic** (essentielle) ou **Marmite à fondre** (graisse).

### Recette canonique T2 — Huile d'olive vierge

```yaml
tier: 2
métier: Pressier (sous-spécialité Cuisinier ou Apothicaire)
mastery_required: Initié
station: Pressoir + Cruche
intrants:
  - Fruits oléagineux (olives) × 4 (T1-T2)
durée: 240 s
mini_jeu: pression_progressive (3 paliers de force)
sortie: Huile d'olive vierge × 1 cruche (T2)
notes:
  - Sous-produit : Pâte d'olive (résidu, valeur basse — animaux, savonnerie)
  - Proc Maître : 1.5 cruche sortie
```

### Recette signature — Huile essentielle de rose magistrale

```yaml
tier: 4
métier: Apothicaire Expert + Parfumeur
mastery_required: Expert Apothicairerie
station: Alambic + Cucurbite + Cornue
intrants:
  - Fleur (rose noble) × 4 (T3-T4)
  - Liquide (eau pure) × 4
  - Charbon × 4 (chauffe distillation)
durée: 900 s (15 min)
mini_jeu: timing_distillation (3 phases) + dosage_eau
sortie: Huile essentielle de rose × 0.5 cruche (T4) — concentrée
notes:
  - Sous-produit : Eau de rose (parfumerie standard)
  - Échec timing : sortie eau aromatisée seulement (T1)
```

---

## 5. Variants par ère

| Variant | Effet huile |
|---------|--------------|
| **Verdoyant** | Huile vivace : régen mineure +0.2 HP/s en cuisine |
| **Brulé** | Huile inflammable : +30% dégâts feu en projectile lampe |
| **Frost** | Huile congèle à froid : usage limité hors été |
| **Doré** | Huile dorée : prestige cuisine, +5% prix |
| **Onirique** | Huile persiste en rêve : onguents rêve-cohérents |
| **Vénérable** | Huile rituelle : 1 effet alchimique gratuit en potion |
| **Pourpre** | Huile brume : encens signalétiques |
| **Spectral** | Huile translucide : lampes spectrales (faible-lumière) |
| **Brisé** | Huile RNG : qualité variable par usage |
| **Shadow** | Huile noire opaque : lampes furtives, masquent |

---

## 6. Crafts / items destinés

| Destination | Type huile | Quantité | Référence |
|-------------|------------|----------|-----------|
| **Cuisine** (friture, sauces, [[Pain]] enrichi) | Olive, graines | 0.1-0.5 cruche / plat | [[Pain]], [[Gâteaux]] |
| **Potion** ([[Potion]] base liquide) | Essentielle, magique | 0.2 cruche / potion | [[Potion]] §recettes |
| **Onguent** (Apothicaire, soins) | Olive, Larme | 0.3 cruche / onguent | TBD Phase 4 |
| **Lampe à huile** (éclairage) | Graisse, olive | 0.5 cruche / 8h éclairage | Architecture Phase 4 |
| **Lubrification métallurgique** ([[Fil métallique]] étirage) | Lin, graisse | 0.1 cruche / étirage | [[Fil métallique]] §recette |
| **Savonnerie** (hygiène) | Graisse + Cendre | 1 cruche → 4 savons | TBD |
| **Parfumerie** | Essentielle de fleur | 0.1 cruche / flacon parfum | TBD Phase 4 |
| **Encens** (alchimie / religion) | Essentielle cosmique, Résine traitée | 0.1 cruche / bâton | [[Résine traitée]] §6 |

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet |
|-----------|------|------------|-------|
| **Huile d'olive de Galenor** | Huile vierge T2 | Galenor (royaume méridional) | Standard cuisine méridionale, +5% magnitude buffs alimentaires |
| **Huile de rose d'Avalor** | Essentielle T4 | Endora | Parfumerie royale, +Verbe en audience |
| **Huile de Larme d'Hibel** | Larme T5 | Hibel (académie alchimique) | Onguents oraculaires, +5 Esprit, vision mineure |
| **Huile de graisse de Vytharia** | Graisse T1 | Vytharia (chasseurs de caves) | Lampes furtives, standard espionnage |
| **Huile de Cœur d'Onara** | Cœur de plante T4 | Onara | Alchimie haut tier, base potions Cœur |

---

## 8. Décisions ouvertes

- [ ] **Frontière huile / extrait alchimique** : une huile essentielle est déjà presque une potion. Confirmer : huile = liquide gras (lipidique), extrait alchimique = liquide aqueux/alcoolique (voir [[Émulsion alchimique]])
- [ ] **Conservation** : huiles s'oxydent. Proposition : conservation T1 = 30 j, T3 = 90 j (cruche scellée), T5 = stable
- [ ] **Sous-produits** : pâte d'olive, eau de rose, son d'oléagineux — tous récupérables. Confirmer économie sous-produits
- [ ] **Huile cosmique T6** : pas T6, la frontière passe à Émulsion alchimique
- [ ] **Lampes à huile en gameplay** : éclairage simulé jour/nuit ? Proposition : oui en Phase 4 architecture (consommation passive d'huile pour éclairer un bâtiment)

---

*Liens : [[Items/Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Potion]] · [[Émulsion alchimique]] · [[Résine traitée]] · [[Fil métallique]]*
