---
tags: [index, systèmes, navigation]
type: index
status: living-doc
last_review: 2026-05-02
needs_review_for: []
---

# 04 — Systèmes

> Architectures **transversales** : ce qui n'est pas une mécanique jouable mais qui sous-tend toutes les mécaniques.
>
> Les **implémentations Unreal** correspondantes sont dans [[05 - Implémentation Unreal/Index|05 - Implémentation Unreal]].

---

## Fichiers du dossier

```dataview
TABLE status, last_review
FROM "04 - Systèmes"
WHERE file.name != "Index"
SORT file.name ASC
```

---

## Contenu

- [[Architecture Data-Driven]] — 12 générateurs paramétriques (Era, Variant, Material, Recipe, Quest, NPC, Loot, Event, Trace, ItemModifier, PlantDecoration, Behavior)
- [[PNJ]] — système et archétypes

## Sous-dossiers

- [[Bestiaire - Index|Bestiaire]] — créatures d'Hybelior (V2 — taxonomie biologique Catégorie → Famille → Sous-famille → Espèce + Écosystèmes)
  - [[Taxonomie des Créatures]] (cadrage 9 axes)
  - Espèces concrètes (branche principale V2)
  - Écosystèmes par biome (branche parallèle)
  - Templates paramétriques de référence (28 archétypes archive)
- [[Comportements PNJ - Index|Comportements PNJ]] — Phase 1 + Phase 2 livrées 2026-05-01
  - [[Concepts Fondamentaux IA PNJ]] — 20 décisions D-PNJ-* tranchées (Phase 1)
  - [[Actions Situationnelles]] — matrice contexte×action, 8 modes superposables, modulation MBTI (Phase 2 maître)
  - Ébauches narratives à réécrire en Phase 3 : [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Métiers - Forgeron]] · [[Métiers - Boulanger]]

---

*Liens : [[🏠 Hybelior]]*
