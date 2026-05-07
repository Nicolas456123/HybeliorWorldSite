---
tags: [index, bestiaire, créatures, système]
type: index
status: drafted
last_review: 2026-05-02
needs_review_for: [archétypes-créatures, variants-cosmiques-mapping]
aliases: [Bestiaire - Index]
---

# 🐉 Bestiaire — Index

> Hub d'entrée pour tout ce qui concerne les **créatures** d'Hybelior : taxonomie, archétypes, variants cosmiques, loot tables, comportements, écologie. Branche du sprint pilote *Descente des couches concept→artefacts*.
>
> Source canonique du cadrage : [[Cadrage Items Créatures PNJ - Brain Dump 2026-05-01]]

---

## Architecture en couches (V2 — réorganisation taxonomique)

| Couche | Contenu | Fichiers |
|--------|---------|----------|
| **Cadrage** | Taxonomie sur 9 axes (Morphologie, Cognition, Habitat, Cycle de vie, Écologie, Rôle, Capacités, Stats, Récompenses) | [[Taxonomie des Créatures]] |
| **Espèces concrètes** *(branche principale V2)* | Vraie taxonomie biologique : Catégorie → Famille → Sous-famille → Espèce | [[Espèces/_Index]] |
| **Templates paramétriques** *(archive)* | 28 archétypes paramétriques de référence — patrons de production | [[_Templates/_Description]] |
| **Écosystèmes** *(branche parallèle)* | Chaînes alimentaires par biome — agent en parallèle | [[Écosystèmes]] |
| **Variants cosmiques** *(intégrés dans espèces)* | 10 variants par espèce concernée (Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable) | Branché sur [[Les Ères]] |
| **Signatures / créatures uniques** *(intégrées dans espèces)* | Boss nommés (Antérix, Feopsingale, Ceapeecu, Loumatée, Fallilla, Zastalo, Zocshawk, Paboucs, Sparutor + autres) — fichiers d'espèces dédiés | Voir CSV AccessExport |

## Liens canoniques

- [[Les Ères]] — les 10 variants visuels mappent les entités cosmiques (Shadow=Noctis, Spectral=Tempora, etc.)
- [[Le Souffle]] — chaque Souffle peut altérer les créatures (variants nouveaux activés, comportements modifiés)
- [[Architecture Data-Driven]] — NPC Generator + Variant Generator + Behavior Generator
- [[Sources de Ressources]] — les 25 ressources de récolte sur créature et leurs créatures sources
- [[PNJ]] — les créatures intelligentes (Sapient cognitif) recoupent partiellement les PNJ
- [[Combat]] — combat contre créatures (CR, attaques, IA combat)
- [[Géographie]] · `Lore/Pays/` — biomes et régions où chaque créature évolue

## Mapping créature ↔ ressource (rappel)

| Ressource | Créatures sources typiques *(à enrichir Phase 2)* |
|-----------|---------------------------------------------------|
| Os | Toutes créatures vertébrées |
| Cuir / Peau | Mammifères, reptiles |
| Fourrure | Mammifères biomes froids |
| Plume | Aviens, dragons-aviens |
| Écaille | Reptiles, dragons, poissons |
| Carapace | Insectoïdes, crustacés |
| Antenne | Insectoïdes |
| Aile | Aviens, insectoïdes, démons |
| Corne | Bovidés, démons, licornes |
| Griffe | Prédateurs |
| Œil | Composant alchimique rare |
| Cœur de creature | Composant haut tier |
| Sang / Bave / Venin / Larme | Composants alchimiques |
| Sécrétion | Glandes spécialisées |
| Œuf | Aviens, reptiles |
| Graisse animale | Mammifères |
| Laine creature | Mammifères tondus |
| Essence spirituelle | Créatures cosmiques / fantomatiques |

## Catalogue dynamique

```dataview
TABLE famille, sous_famille, biomes, cr_range, status
FROM "04 - Systèmes/Bestiaire/Espèces"
WHERE type = "espece"
SORT famille ASC, sous_famille ASC
```

## Décisions ouvertes

- **Frontmatter spécialisé créature** à formaliser (champs : `forme`, `taille`, `milieu`, `cognition`, `socialité`, `locomotion`, `trophicité`, `pouvoirs`, `élément`, `cr`, `pv`, `loot_table`)
- **Mapping 10 variants ↔ 12 Cosmiques** : valider que `Shadow=Noctis`, `Spectral=Tempora`, etc. (8 variants connus, 2 à confirmer) — voir [[Les Ères]]
- **Niveau de détail** des stats de combat (CR D&D-style ou gradation Hybelior-spécifique ?)
- **Réutilisation entre PNJ et créatures** pour les humanoïdes intelligents (sapient + bipède + socialité humaine = PNJ ou créature ?)

---

*Liens : [[Taxonomie des Créatures]] · [[PNJ]] · [[Les Ères]] · [[Combat]] · [[Architecture Data-Driven]]*
