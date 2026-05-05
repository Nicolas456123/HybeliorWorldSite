---
tags: [item, archétype, équipement, vêtement, civil, dorsal]
type: archetype
category: Équipement
subcategory: Vêtement
slot: Dorsal
non_armure: true
materials: [Tissu, Cuir, Fourrure, Soie, Spécial-magique]
craft_category: Tissage et confection
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [conflit-slot-sac-a-dos, cape-armure-ou-non]
---

# 🧥 Cape — Vêtement dorsal situationnel

> Vêtement non-armure porté sur le dos. **Slot dorsal** — partagé avec [[Sac à dos]] (conflit, voir §8). La Cape n'apporte **pas de défense** combat brute, mais des **modificateurs situationnels** : résistance climat, camouflage, signature de faction, bonus social.

---

## 1. Vue d'ensemble

La Cape opère comme **modificateur situationnel** :
- En **Toundra/froid** : résistance froid (−10 °C tolérée par tier)
- En **forêt/désert** : camouflage (réduction détection)
- En **ville/événement social** : signature visuelle de faction, bonus Verbe / Présence
- En **rituel** : conduit magique léger (Spécial-magique uniquement)

> [!important] Conflit slot dorsal — Cape vs Sac à dos
> **Un seul slot dorsal** par défaut. Le joueur choisit : utilité (Sac à dos, capacité de port) OU situationnel (Cape).
>
> Voir [[Sac à dos#10. Décisions ouvertes]] pour la décision en cours :
> - Option A (proposée) : 1 seul slot, choix exclusif
> - Option B : slots séparés (sac dorsal + cape sur épaules) → permet cumul, plus complexe visuellement
> - Affixe spécial *Sac-cape* (T5+) débloquant cumul rare → P3
>
> **Ce fichier réaffirme l'Option A par défaut.**

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Cape de voyage d'Alkaran** | Routes du sud | Cuir léger · résistance pluie · bonus *route longue* |
| **Cape de soie de Galenor** | Galenor noble | Soie fine · bonus *Verbe / Présence* en cour |
| **Cape de fourrure d'Onara** | Onara — climat froid | Fourrure lourde · résistance froid +30 % |
| **Cape rituelle de Cendara** | Cendara — pour cérémonies de feu | Tissu rouge · bonus *cérémonies* + résistance feu |
| **Manteau de l'Ilthara** | Steppes — peau de yack | Bonus *vent et tempête* · capuche intégrée |
| **Cape de mage** | Toutes nations — coupe magique | Spécial-magique · conduit Voie léger |

---

## 3. Tier × qualité × bonus situationnel

| Tier | Nom | Bonus principal | Bonus secondaire | Slots affixes |
|---|---|---|---|---|
| **T1** Commun | Cape simple | +5 % résistance froid OU +1 Verbe en social | base | 1 |
| **T2** Façonné | Cape façonnée | +10 % résistance climat OU +2 Verbe | +5 % discrétion en zone matchée | 1 |
| **T3** Œuvré | Cape œuvrée | +15 % résistance OU +3 Verbe · +1 Présence | +10 % discrétion · proc *vent favorable* | 2 |
| **T4** Magistral | Cape magistrale | +20 % résistance OU +5 Verbe · +2 Présence | +15 % discrétion · proc *invisibilité brève* (Cuir Shadow uniquement) | 3 |
| **T5** Légendaire | Cape légendaire | +25 % résistance OU +7 Verbe · +3 Présence · *signature de faction visible* | +20 % discrétion · effet narratif unique | 4 |

> [!note] Pas de T6
> Les vêtements non-armure plafonnent à **T5** (rareté Légendaire). Les vêtements signature uniques (héritage, quête) peuvent atteindre T6 mais ce sont des **items signatures**, pas un tier de craft accessible.

---

## 4. Stats brutes affectées

La Cape n'apporte pas de défense physique/magique, mais influence des **stats sociales** ou **environnementales** :

| Stat | Impact Cape |
|---|---|
| **Verbe** | Cape de soie/noble : +1 à +7 selon tier (en interaction sociale uniquement) |
| **Présence** | Cape de cérémonie : +1 à +3 (effets narratifs, reconnaissance) |
| **Vivacité** | Cape légère : aucun bonus mais pénalité 0 % (vs cape lourde −2 %) |
| **Endurance** | Cape de fourrure / climat : prolonge stamina en froid extrême |

> Les Capes lourdes (fourrure) infligent une **légère pénalité de mouvement** (−2 % à −5 %) ; les Capes légères (soie) sont neutres ou +1 % esquive.

---

## 5. Affixes vêtements

| Affixe | Effet T3 | Plafond T5 |
|---|---|---|
| **Charisme renforcé** | +5 % efficacité interactions sociales | +20 % |
| **Camouflage urbain/forestier** | −15 % détection en zone matchée | −40 % |
| **Résistance climat** | +15 % résistance froid/chaud | +40 % |
| **Reconnaissance faction** | Affiche couleurs / armoiries | Effet visuel narratif majeur |
| **Discrétion** | −10 % bruit pas | −30 % |
| **Conduit léger** | +2 % efficacité Voie (Spécial-magique uniquement) | +8 % |
| **Cape lestée** | +5 % parade tenue (vent) | +15 % |
| **Aile de brume** | Proc 3 % esquive supplémentaire | proc 10 % |
| **Honneur** | +5 % réputation après combat héroïque | +20 % |

---

## 6. Recettes par matériau — T3 référence

| Matériau | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Tissu** | [[Métiers - Tisserand\|Tisserand]] + [[Métiers - Couturier\|Couturier]] | 4× Tissu · 2× Pigment · 1× Fil métallique | Adepte · 60 s · cadence métier à tisser |
| **Cuir** | [[Métiers - Tanneur\|Tanneur]] → [[Métiers - Maroquinier\|Maroquinier]] | 3× Cuir tanné · 2× Fil de cuir · 1× Boucle | Adepte · 70 s · découpe + couture |
| **Fourrure** | Tanneur + Maroquinier | 4× Fourrure · 1× Cuir tanné (doublure) · 2× Boucle | Adepte · 80 s · couture lourde |
| **Soie** | Tisserand + [[Métiers - Brodeur\|Brodeur]] | 3× Soie · 2× Pigment précieux · 1× Fil d'or | Expert · 90 s · broderie complexe |
| **Spécial-magique** | Tisserand + [[Métiers - Enchanteur\|Enchanteur]] | 3× Tissu T3 · 1× Cristal de Voie · 1× Essence spirituelle | **Maître** 🔒 · 150 s · rituel |

---

## 7. Variants cosmiques

Contrairement aux outils, les **Capes acceptent les 10 variants cosmiques** (à l'identique de [[Cuirasse#7. Variants cosmiques (10 par ère)]]) — la Cape est un vêtement à forte signature visuelle, donc compatible avec les modificateurs d'ère.

| Variant | Effet Cape spécifique |
|---|---|
| **Shadow** | +20 % camouflage nuit · proc 5 % invisibilité 1 s sur sprint |
| **Frost** | +30 % résistance froid · ne se mouille pas |
| **Doré** | Affichage social bonus +30 % en zone Eldoria · révèle invisibles 3 m |
| **Spectral** | Translucide · proc 15 % phase à travers attaque |
| **Verdoyant** | Camouflage forêt +50 % |
| **Vénérable** | +1 affixe slot (variant utilitaire) |
| Autres | Voir [[Cuirasse#7]] |

---

## 8. Décisions ouvertes

- ⚠️ **Conflit slot dorsal** : Cape vs Sac à dos — Option A (exclusif) ou B (slots séparés) ? **Aligné Option A** par défaut. Voir [[Sac à dos#10]].
- ⚠️ **Cape comme armure mineure ?** Une Cape peut-elle absorber un coup (défense très faible) ou est-elle 100 % situationnelle ? **Proposition** : 100 % situationnelle, pas d'absorption combat.
- ⚠️ **Capuche intégrée vs Capuche seule** : si la Cape a une capuche, conflit avec [[Capuche seule]] ? **Proposition** : Cape avec capuche occupe les 2 slots (dorsal + tête), Cape sans capuche libère le slot tête.
- ⚠️ **Tabard porté sur Cape** : possible ? **Proposition** : non, le Tabard est sur la cuirasse.
- ⚠️ **Cape destructible** ? Peut-elle se déchirer en combat ?

---

*Liens : [[Items - Index\|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Sac à dos]] · [[Tabard]] · [[Capuche seule]] · [[Cuirasse]]*
