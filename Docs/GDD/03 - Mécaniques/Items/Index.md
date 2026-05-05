---
tags: [index, items, mécanique]
type: index
status: drafted
last_review: 2026-05-02
needs_review_for: [archétypes-par-type, tier-mapping-canonique]
aliases: [Items - Index]
---

# 🎒 Items — Index

> Hub d'entrée pour tout ce qui concerne les **items** : consommables, équipements, ressources brutes/fabriquées, armes. Branche centrale du sprint pilote *Descente des couches concept→artefacts*.
>
> Source canonique du cadrage : [[Cadrage Items Créatures PNJ - Brain Dump 2026-05-01]]

---

## Architecture en couches

| Couche | Contenu | Fichiers |
|--------|---------|----------|
| **Cadrage** | 4 catégories, ~70 types, sources de production, processus de craft | [[Catégories d'Items]] · [[Types d'Items]] · [[Sources de Ressources]] · [[Crafts]] |
| **Catalogue arborescent** *(Phase 2bis — actuel)* | Catégories → sous-catégories → **items concrets** au niveau des feuilles | [[Catalogue/_Index]] (actuel) |
| **Templates paramétriques** *(archive Phase 2)* | 70+ fichiers archétypes paramétriques originaux : grilles tier × multiplicateurs, affixes baseline, variants cosmiques | [[_Templates/_README]] |
| **Générateurs Phase 3** | Recipe Generator + ItemModifier Generator consomment les templates pour produire variations paramétriques | À brancher sur [[Architecture Data-Driven]] |
| **Signatures / authored** *(Phase 4)* | Items uniques narratifs par pays/biome/époque (~65 CSV intégrés ; ~30-40 supplémentaires par continent en Phase 4) | Étalé sur des mois |

## Liens canoniques

- [[L'Accord]] — les items haut tier subissent une légère perte stats temporaire (~10% sur 2 sem) post-Souffle
- [[Économie]] — économie joueur-driven, 6 tiers de rareté
- [[Combat]] — items équipables (armes, armures) en combat
- [[Métiers]] — 63 métiers fabriquent / récoltent les ressources et items
- [[Le Souffle]] — la rouille post-Souffle s'applique aux items haut tier
- [[Architecture Data-Driven]] — 12 générateurs (dont Material, Recipe, Loot, ItemModifier) qui produisent les items à grande échelle

## Tiers de rareté (rappel)

| Tier | Nom |
|------|-----|
| 1 | Commun |
| 2 | Façonné |
| 3 | Œuvré |
| 4 | Magistral |
| 5 | Légendaire |
| 6 | Mythique |

## Catalogue dynamique

> Voir [[Catalogue/_Index]] pour la structure arborescente.

```dataview
TABLE category, subcategory, tier, parent_archetype, status
FROM "03 - Mécaniques/Items/Catalogue"
WHERE type = "item-concret"
SORT category, subcategory, tier ASC
```

```dataview
LIST
FROM "03 - Mécaniques/Items/Catalogue"
WHERE type = "catalogue-node"
SORT file.path ASC
```

## Décisions ouvertes

- Les **Outils** (catégorie ambiguë) : item ? équipement ? ressource ? — à trancher en archétypes
- Les **Cristaux** : ressource ou catégorie spéciale (énergétique) ? — voir [[Le Lien]]
- **Frontmatter spécialisé items** : champs `category`, `type`, `tier`, `source`, `craft_recipe`, `mastery_required`, `era_availability` — à formaliser en Phase 2
