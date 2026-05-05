---
tags: [item, arme, mêlée-1H, épée, tier-1]
type: item-concret
category: Arme
subcategory: Mêlée 1H
parent_archetype: "[[../_Description|Épée à une main]]"
tier: 1
matériau_principal: Fer
mastery_required: Novice
craft_metier: Forgeron
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
---

# Épée commune en fer

## Description

Épée longue de soldat, lame de fer brut martelée par un Forgeron Novice, manche en bois standard, poignée enroulée de cuir tanné. **Référence baseline T1** — ce qu'un garde-ville ou milicien moyen reçoit de sa garnison. Pas de gravure, pas d'ornement, pas d'affixe : juste un acier honnête.

## Stats

| Aspect | Valeur |
|--------|--------|
| Dégâts/coup | 40 |
| Vitesse | 1.20 coups/s |
| Crit | 5% |
| Stagger | 25 |
| Durabilité | 200 pts |

Damage type : Tranchant 80% + Perçant 20%.

## Affixes notables

Aucun (T1 = 0 affixe).

## Recette / source

```yaml
métier: Forgeron
mastery_required: Novice
station: Forge à charbon + Enclume + Bac à trempe
intrants:
  - Lingot de fer × 2
  - Planche × 1
  - Cuir tanné × 1
durée: 90 s
mini_jeu: timing_température (3 frappes, fenêtre verte 1.5s)
```

Achetable dans toute armurerie de garnison pour ~25 [[Économie|Éclats]].

*Liens : [[_Description|Épée à une main]] · [[../_Description|Mêlée 1H]] · [[Armes et Maîtrise#Épée 1H]]*
