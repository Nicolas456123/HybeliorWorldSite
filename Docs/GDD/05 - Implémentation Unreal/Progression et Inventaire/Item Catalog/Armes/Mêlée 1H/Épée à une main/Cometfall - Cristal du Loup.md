---
tags: [item, arme, mêlée-1H, épée, tier-5, signature-csv, légendaire]
type: item-concret
category: Arme
subcategory: Mêlée 1H
parent_archetype: "[[../_Description|Épée à une main]]"
tier: 5
matériau_principal: Bliysium + Cristal alpha
mastery_required: Maître
craft_metier: Forgeron Maître + Enchanteur Expert
era_availability: [toutes]
csv_source: "Objets.csv #21 (TypeObjet 74 = Épée à une main signature)"
status: drafted
last_review: 2026-05-01
---

# Cometfall — Cristal du Loup

## Description

Lame légendaire taillée à partir d'un cristal tombé du ciel pendant un événement cosmique — "Cometfall" — et serti d'un fragment d'œil de **Loup-Patriarche** abattu lors de la même nuit. La lame est translucide, glaciale au toucher, et émet un grondement bas quand le porteur est en colère. Portée par la lignée **Vorshyn** des plaines orientales depuis trois générations.

## Stats

| Aspect | Valeur |
|--------|--------|
| Dégâts/coup | 112 |
| Vitesse | 1.32 |
| Crit | 8% |
| Stagger | 42 |
| Durabilité | 650 |

Prérequis [[L'Accord|Accord 75%+]] pour être équipée.

## Affixes notables

- *Variant Frost* permanent (givre sur lame, +20% dégâts Givre, ralentit 15% pdt 2s)
- *Critique +8%* (signature alpha)
- *Saignement profond* (DoT 5%/s 5s sur crit)
- *Aura de présence* (+10 Verbe pendant 30s post-kill)
- 1 affixe Très rare : *Hurlement* — premier kill par combat applique stagger en zone 4m

## Recette / source

Drop unique de la quête narrative *La Tombée de Cometfall* (chaîne signature lignée Vorshyn) **OU** craft signature :

```yaml
métier: Forgeron Maître + Enchanteur Expert
mastery_required: Maître Forge + Expert Enchantement
station: Forge à charbon + Enclume + Bac à trempe + Cercle d'enchantement
intrants:
  - Bliysium × 3
  - Lingot précieux × 2
  - Planche cosmique × 1
  - Cœur de Loup-Patriarche × 2
  - Gemme taillée × 2 (1 = Cristal de Voie aligné)
  - Essence spirituelle × 1
durée: 1800 s
mini_jeu: chaîne complète + condition cachée 🔒 (forger pendant nuit étoilée d'Aerion)
```

## Lore / signature

> *« Le ciel tombe une fois par siècle ; un loup chante une fois par vie ; cette lame retient les deux. »*
> — Inscription rituelle de la lignée Vorshyn

L'arme **résonne** quand un loup-créature meurt à moins de 100m — court bonus narratif et +5% dégâts pendant 60s. Voir [[Bestiary/Index]] (Phase 4) pour les liens créatures.

*Liens : [[_Description|Épée à une main]] · [[../../../Ressources/Fabriqué/Alliages/Bliysium]] · [[L'Accord]] · [[Les Ères]]*
