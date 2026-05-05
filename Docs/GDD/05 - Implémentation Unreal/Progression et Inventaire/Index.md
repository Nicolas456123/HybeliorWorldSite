---
tags: [index, implementation, progression, inventory, navigation]
type: index
status: living-doc
last_review: 2026-05-01
needs_review_for: []
---

# Progression et Inventaire

> Implémentation UE5 de la progression et de l'inventaire : HW Progression Component, Quest System, Loot System, DataTables.
>
> **Refonte canonique** : `ExperienceReward` → `AccordGain` ; `GoldReward` conservé ; `FHWHeritageGain` (titres/recettes/lore) ; 6 tiers gameplay (Commun → Mythique). Voir [[Migration Accord]].

---

## Fichiers

```dataview
TABLE status, last_review, implements
FROM "05 - Implémentation Unreal/Progression et Inventaire"
WHERE file.name != "Index"
SORT file.name ASC
```

---

## Implements (traçabilité GDD)

- [[Progression]] (GDD canonique)
- [[L'Accord]] — métrique 0-100% par ère
- [[Migration Accord]] — stratégie SQL/UE

---

*Retour : [[05 - Implémentation Unreal/Index|↑ 05 - Implémentation Unreal]]*
