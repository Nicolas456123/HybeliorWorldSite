---
tags: [item, arme, mêlée-2H, marteau, tier-5, signature-csv]
type: item-concret
category: Arme
subcategory: Mêlée 2H
parent_archetype: "[[_Description|Marteau à deux mains]]"
tier: 5
matériau_principal: Bliysium
mastery_required: Maître
craft_metier: Forgeron Maître + Enchanteur
era_availability: [Sommeil Onirique]
csv_source: "Objets.csv #38 (TypeObjet 78)"
status: drafted
last_review: 2026-05-01
---

# Relieur de rêves

## Description

Marteau cérémoniel utilisé par les **prêtres-juges des temples de Somnix**. Tête en Bliysium gravée d'un sceau onirique. Frapper avec ce marteau **endort temporairement** la cible — c'est moins une arme qu'un outil rituel pour pacifier les hérétiques sans les tuer.

## Stats

Dégâts 207 · Vitesse 0.86 · Stagger 73 · Durabilité 810

## Affixes notables

- *Variant Onirique* permanent (endort cible 5% du temps, 1.5s)
- *Anti-armure +30%*
- *Résonance d'âme +5 Mana/hit*
- 1 Très rare *Endormissement* : 3 coups consécutifs sur la même cible lui appliquent *Sommeil* 5s (immobilité, vulnérabilité crit ×2)

## Recette / source

```yaml
métier: Forgeron Maître + Enchanteur
intrants:
  - Bliysium × 3
  - Lingot précieux × 1
  - Cristal de Voie de Somnix × 1
  - Essence spirituelle × 2
durée: 1800 s
condition_cachée: 🔒 forger pendant Sommeil Onirique
```

*Liens : [[_Description|Marteau à deux mains]]*
