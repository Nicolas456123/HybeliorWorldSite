---
tags: [index, architecture, constructions, mécanique]
type: index
status: drafted
last_review: 2026-05-02
needs_review_for: [placement-mécaniques-vs-systèmes, métiers-construction-manquants, frontière-mobilier-items, archétypes-individuels]
aliases: [Architecture - Index]
---

# 🏛️ Architecture — Index

> Hub d'entrée pour tout ce qui concerne les **constructions** d'Hybelior : habitations, lieux de production, fortifications, infrastructure, mobilier, et constructions cosmiques. Branche soeur de [[Items - Index|Items]] dans la *Descente des couches concept→artefacts*.
>
> Source canonique du cadrage : sprint Phase 1 *Architecture* — 2026-05-01.

---

## Ancrage gameplay

L'architecture en Hybelior est une **mécanique de joueur** :

- Le joueur **construit** (via le métier [[Métiers#Architecte|Architecte]] et ses corps de métier supports)
- Le joueur **achète / loue / hérite** des constructions (économie joueur-driven, voir [[Économie]])
- Le joueur **possède** des biens immobiliers (habitations, ateliers, terres de guilde)
- Les **guildes** débloquent des structures par progression (voir [[Guildes]] §Construction)
- Les constructions sont **cibles d'archéologie** post-Souffle (voir [[Traces des Ères]] §Architecturales)

> ⚠️ **Décision de placement à valider (D-ARCHITECTURE-01)** : ce dossier est posé en `03 - Mécaniques\Architecture\` par cohérence avec `Items\` (mécanique gameplay du joueur). Une alternative serait `04 - Systèmes\Architecture\` si on considère que l'architecture est une couche transversale de génération de monde plutôt qu'une mécanique. Recommandation actuelle : **rester en Mécaniques** — la construction est un acte joueur, le rendu visuel et la génération procédurale relèvent de [[Architecture Data-Driven]] (déjà en Systèmes).

---

## Architecture en couches

| Couche | Contenu | Fichiers |
|--------|---------|----------|
| **Cadrage** *(Phase 1 — ce sprint)* | 10 catégories canoniques, 6 niveaux d'opulence, mapping matériaux et métiers | [[Catégories de Constructions]] · [[Échelles et Niveaux]] · [[Matériaux de Construction]] · [[Mapping Métiers de Construction]] |
| **Archétypes** *(Phase 2)* | 1 fichier par type majeur de construction (Maison, Forge, Taverne, Temple, Tour, Pont, Moulin, Coffre, Lit, Forteresse…) — ~130-180 archétypes en 3-4 sous-vagues | À créer après validation Nicolas |
| **Templates paramétriques** *(Phase 3)* | Variations branchées sur générateurs : `BuildingTemplate`, `RoomLayout`, `FurnitureSet`, `OrnamentPack` — voir [[Architecture Data-Driven]] | À brancher |
| **Signatures / authored** *(Phase 4)* | Constructions uniques narratives par pays/biome/époque (Caëspia d'Evertia, Cathédrale Engloutie d'Iskara, Tours d'Astravia…) | Étalé long terme |

---

## Liens canoniques

- [[Items - Index|Items]] — frontière à arbitrer pour le mobilier (D-ARCHITECTURE-03) et les stations de craft (D-ARCHITECTURE-04)
- [[Crafts]] — §Travail du bois et de la pierre (Forge architecturale, Verrerie, Maçonnerie) ; §Stations
- [[Sources de Ressources]] — §Fabrication (Brique, Planche, Pierre, Plaque de verre)
- [[Métiers]] — Architecte (chef de chantier), Menuisier, Sculpteur, Forgeron — corps de métier supports à compléter (D-ARCHITECTURE-02)
- [[Géographie]] — biomes et 13 cultures de pays modulent les variants régionaux
- [[Cosmologie]] — sanctuaires des 9 religions, monuments cosmiques (Cratères du Cardinal, Brèches du Néant)
- [[Guildes]] — §Construction & développement des structures (avant-postes, forts, villes de guilde)
- [[Le Souffle]] — §Traces 90/10 (10% des constructions deviennent permanentes via événement)
- [[Traces des Ères]] — §Architecturales (Cathédrale Engloutie, Tours d'Astravia, Murailles Rouges de Vermilis…)
- [[Architecture Data-Driven]] — générateurs `BuildingGenerator`, `OrnamentGenerator` à brancher Phase 3
- [[Économie]] — marché immobilier joueur, baux, achats

---

## Frontmatter Phase 2 (archétype de construction)

```yaml
---
tags: [archetype, architecture, <catégorie>]
type: building_archetype
catégorie: Habitation | Production | Social | Religieux | ...
échelle_min: 1   # Modeste
échelle_max: 5   # Magnifique (échelle 6 réservée Cosmique)
matériaux_principaux: [Pierre simple, Planche, Tuile]
métiers_principaux: [Architecte, Maçon, Charpentier]
station_de_craft: false   # true si la construction sert de station (forge, alambic intégré)
emprise_au_sol_m2: [20, 80]   # plage selon niveau
occupants_typiques: [1, 5]
coût_éclats: [100, 50000]
biomes_typiques: [tempéré, plaine]
cultures_variant: [Altram, Trinoria, Lythar]   # variants régionaux
era_modulation: false   # true si une ère module l'apparence (ex. ruines bleuies sous Crépuscule Pourpre)
status: drafted
---
```

---

## Catalogue dynamique *(à activer après Phase 2)*

```dataview
TABLE catégorie, échelle_min + "-" + échelle_max AS échelle, métiers_principaux, status
FROM "03 - Mécaniques/Architecture/Archétypes"
WHERE type = "building_archetype"
SORT catégorie ASC, file.name ASC
```

---

## Volumétrie estimée Phase 2

| Sous-vague | Cible | Volume |
|------------|-------|--------|
| 2.1 | Habitations + Mobilier de base | ~35-45 archétypes |
| 2.2 | Lieux de production + Stations + Infrastructure rurale | ~35-45 |
| 2.3 | Lieux sociaux + religieux + savoir + Fortifications | ~40-50 |
| 2.4 | Infrastructure urbaine + Constructions cosmiques + Signatures | ~20-40 |
| **Total** | | **~130-180 archétypes** |

À multiplier ensuite par variants culturels (13 pays signature) et par ère de Trace (Phase 4 long terme).

---

## Décisions ouvertes

| Code | Décision | État |
|------|----------|------|
| **D-ARCHITECTURE-01** | Placement Mécaniques vs Systèmes | Recommandation : Mécaniques. À valider Nicolas. |
| **D-ARCHITECTURE-02** | Métiers de construction manquants (Maçon, Charpentier, Couvreur, Vitrier, Tailleur de pierre) — ajouter aux 63 métiers ou les considérer comme sous-spécialisations de Menuisier/Sculpteur ? | À trancher avant Phase 2 |
| **D-ARCHITECTURE-03** | Mobilier (table, chaise, lit, coffre…) : sous-catégorie Architecture OU famille séparée dans [[Items - Index\|Items]] (équipement utilitaire) ? | Recommandation initiale : **Architecture** (le mobilier "appartient au lieu" plus qu'au joueur). À valider. |
| **D-ARCHITECTURE-04** | Stations de craft (forge, alambic, métier à tisser) : Architecture (lieu de production) OU Items §Outils (équipement) ? Cohérence avec [[Crafts]] §Stations. | Recommandation : **Architecture pour la station fixe**, [[Items]] pour l'outil portable. |
| **D-ARCHITECTURE-05** | Constructions de Guilde (avant-postes, forts, villes) : pivot vers [[Guildes]] §Construction OU archétypes propres dans Architecture ? | Recommandation : **archétypes Architecture**, [[Guildes]] référence. |
| **D-ARCHITECTURE-06** | Niveau 6 *Cosmique* : monnaie classique acceptée (10M+) ou strictement non-marchand (rituels, conditions cachées 🔒, traces) ? | Voir [[Échelles et Niveaux]] §Niveau 6 |
| **D-ARCHITECTURE-07** | Variants culturels par pays — combien de pays signature pour Phase 4 ? Les 13 cultures ou un sous-ensemble prioritaire (Altram, Trinoria, Lythar, Astravia) ? | Long terme |
| **D-ARCHITECTURE-08** | Frontmatter spécialisé `building_archetype` — champs définitifs à formaliser après validation des 5 fichiers de cadrage | Phase 2 |

---

*Liens : [[Items - Index]] · [[Catégories de Constructions]] · [[Échelles et Niveaux]] · [[Matériaux de Construction]] · [[Mapping Métiers de Construction]] · [[Métiers]] · [[Crafts]] · [[Guildes]] · [[Géographie]] · [[Traces des Ères]] · [[Architecture Data-Driven]]*
