---
tags: [item, arme, mêlée-2H, marteau, tier-5, signature-csv]
type: item-concret
category: Arme
subcategory: Mêlée 2H
parent_archetype: "[[_Description|Marteau à deux mains]]"
tier: 5
matériau_principal: Acier au tungstène + bois d'épine cosmique
mastery_required: Maître
craft_metier: Forgeron Maître
era_availability: [Verdoiement]
csv_source: "Objets.csv #37 (TypeObjet 78)"
status: drafted
last_review: 2026-05-01
---

# Épine

## Description

Marteau-pic à tête épineuse — la tête est un agglomérat d'épines de bois cosmique soudées en une masse compacte. L'arme **pousse** : chaque coup encrante une épine de plus, jusqu'à un cap de 50 épines/jour. Forgée pendant le **Verdoiement**.

## Stats

Dégâts 207 · Vitesse 0.86 · Stagger 73 · Durabilité 810 (auto-réparation)

## Affixes notables

- *Anti-armure +30%* natif
- *Saignement profond* (DoT 8% HP/s 5s par coup, lié aux épines)
- *Variant Verdoyant* permanent (+1 régen HP/s post-kill, dégâts contre faune +5%, malus −10% humanoïdes)
- *Auto-réparation* : −5 pts durabilité/coup compensés par +3 pts/min hors combat
- 1 Très rare : *Surgissement* — 1ère attaque par combat fait pousser 3 épines au sol qui infligent saignement aux adversaires marchant dessus pdt 10s

## Recette / source

```yaml
métier: Forgeron Maître
intrants:
  - Acier au tungstène × 2
  - Bois exotique de Verdoiement × 3 (variant cosmique)
  - Sève d'arbre ancien × 2
  - Cœur de plante × 1
durée: 1500 s
condition_cachée: 🔒 forger pendant Verdoiement
```

*Liens : [[_Description|Marteau à deux mains]] · [[Les Ères]]*
