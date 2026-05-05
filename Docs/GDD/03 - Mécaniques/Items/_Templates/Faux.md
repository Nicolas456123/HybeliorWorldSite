---
tags: [item, archétype, équipement, outil, métier, agriculture]
type: archetype
category: Équipement
subcategory: Outil
slot: Main (outil) / Deux mains
métier: Fermier
métiers_secondaires: [Cueilleur, Herboriste, Botaniste]
craft_category: Récolte et transformation primaire
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-vitesse-recolte, mini-jeu-cadence]
---

# 🌾 Faux — Outil de récolte céréalière et herboriste

> Lame courbe à long manche, utilisée par le **Fermier** pour récolter céréales, et par le **Cueilleur / Herboriste** pour les herbes denses et plantes hautes. Distincte de la faucille (version courte, à une main, à dériver en archétype futur).

---

## 1. Vue d'ensemble

La Faux opère dans la catégorie [[Crafts#9. Récolte et transformation primaire (premier traitement)]]. Son tier détermine :
- la **largeur de coupe** (nombre de tiges/plants par swing)
- la **vitesse** de récolte sur un nœud
- la **chance de proc** ressource rare (épi doré, herbe-mère, etc.)
- le **bonus mini-jeu cadence** (rythme à maintenir, voir §4)

Outil non-arme par design : la frappe est lente, la portée mêlée trop courte pour le combat. Mais un joueur peut équiper la Faux comme **arme improvisée** avec dégâts dérisoires (plafond 30 % d'un sabre équivalent — voir §8).

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Faux courte d'Alkaran** | Plaines céréalières du sud | Manche court, lame large — récolte rapide céréales |
| **Faux longue de Galenor** | Galenor | Manche très long, lame fine — bonus herbes hautes |
| **Faux à dents d'Onara** | Régions humides — denté pour roseaux/algues | Bonus *plantes aquatiques* |
| **Faux de combat de Cendara** | (Quasi-arme — utilisée par milices rurales) | Dégâts +50 % en arme improvisée mais −20 % récolte |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Largeur de coupe | Vitesse | Chance ressource rare | Slots affixes |
|---|---|---|---|---|---|
| **T1** Commun | Faux d'apprenti | 1 tige | base | 0 % | 1 |
| **T2** Façonné | Faux d'initié | 2 tiges | +10 % | +2 % | 1 |
| **T3** Œuvré | Faux d'adepte | 3 tiges | +20 % | +5 % | 2 |
| **T4** Magistral | Faux experte | 4 tiges | +30 % | +8 % | 3 |
| **T5** Légendaire | Faux légendaire | 5 tiges · récolte 2 nœuds simultanés | +40 % | +12 % | 4 |
| **T6** Mythique | Faux-signature | 6 tiges · récolte 3 nœuds · *signature* | +50 % | +18 % · garantit 1 ressource exotique/jour | 4+1 |

---

## 4. Mini-jeu de récolte — Cadence rythmique

Le joueur swing la Faux en rythme. Trois zones sur la jauge :
- **Zone verte** (cadence parfaite) : récolte +20 % qualité, +10 % chance rare
- **Zone jaune** (acceptable) : récolte standard
- **Zone rouge** (trop rapide ou trop lent) : risque de manquer la coupe (−20 % rendement, −5 % chance ressource rare)

Le tier de la Faux **élargit la zone verte** (T1 = 0.2 s, T6 = 0.6 s de tolérance). Combine avec [[Personnage]] (Vivacité élargit aussi la zone, Acuité augmente la précision visuelle de la jauge).

---

## 5. Affixes outil-spécifiques

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Récolte** | +1 palier effectif Fermier/Cueilleur | +2 paliers |
| **Vitesse récolte** | −10 % durée swing | −30 % |
| **Qualité de récolte** | +5 % chance qualité+ sur ressource | +20 % |
| **Chance herbe rare** | +3 % drop herbe d'alchimie rare | +10 % |
| **Réduction durabilité** | −20 % usure outil | −60 % |
| **Bonus mini-jeu cadence** | +0.1 s zone verte | +0.3 s |
| **Récolte en aire** | Récolte aussi 1 plant adjacent (proc 10 %) | proc 25 % |
| **Spécialisation céréales/herbes** | +10 % rendement sur famille spécifique | +25 % |

---

## 6. Recette de la Faux — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Métiers - Forgeron\|Forgeron]] (lame) + [[Métiers - Menuisier\|Menuisier]] (manche) |
| **Station** | Forge + Établi de menuiserie |
| **Intrants** | 1× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (acier trempé) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Planche]] (frêne ou bois flexible) · 1× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné (poignée) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Fil métallique]] |
| **Palier requis** | Adepte |
| **Durée** | 50 s |
| **Mini-jeu** | Timing température (lame) + assemblage (manche) |
| **Sortie** | Faux T3 |

---

## 7. Variants cosmiques (utilitaires)

| Ère active | Effet utilitaire |
|---|---|
| Verdoiement | +30 % rendement plantes ; +5 % chance herbe rare |
| Sommeil de Glace | Récolte herbe gelée intacte (consommables conservation x2) |
| Vents Bouleversants | Récolte plante volante (+1 plumeplume / nœud) |
| Présages | +1 slot affixe (variant Vénérable utilitaire) |

---

## 8. Décisions ouvertes

- ⚠️ **Faux comme arme improvisée** : autorisée mais dégâts plafonnés ?
- ⚠️ **Faux à 1 main vs 2 mains** : la Faux courte (faucille) à part ou variation T1 ?
- ⚠️ **Récolte automatique en aire** : interaction avec [[Sac à dos]] *Récolte automatique* ?
- ⚠️ **Variants nationaux** : effets distincts ou cosmétique pure ?

---

*Liens : [[Items - Index\|← Index Items]] · [[Crafts]] · [[Métiers]] · [[Catégories d'Items]] · [[Pioche]] · [[Hache de bûcheron]]*
