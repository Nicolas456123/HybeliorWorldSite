---
tags: [item, archétype, équipement, outil, métier, mineur]
type: archetype
category: Équipement
subcategory: Outil
slot: Main (outil) / Deux mains
métier: Mineur
métiers_secondaires: [Tailleur de pierre, Maçon]
craft_category: Récolte et transformation primaire
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-durabilite, profondeur-veine]
---

# ⛏ Pioche — Outil-roi du Mineur

> Outil de récolte des **minerais**, **pierres**, **gemmes brutes**. Le tier de la Pioche **plafonne le tier de minerai exploitable** : impossible d'attaquer une veine de mithril (T5) avec une Pioche T2. Outil dont la **durabilité** est la plus critique du jeu — fragile par design.

---

## 1. Vue d'ensemble

La Pioche opère en [[Crafts#9. Récolte et transformation primaire]]. Son rôle est triple :
- **Récolter** minerai, pierre, charbon, gemme brut
- **Plafonner** le tier de veine exploitable (Pioche T3 → T3 max)
- **Procurer** un mini-jeu *frappe précise* (voir §4)

La durabilité est **délibérément fragile** : une Pioche s'use ~2× plus vite qu'un Marteau de forge ou une Hache. C'est un trade-off économique : le Mineur consomme régulièrement des Pioches → flux pour Forgeron → boucle économique [[Économie]].

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Pioche d'Alkaran** | Mines profondes — courte, dense | Bonus *durabilité* +30 %, vitesse standard |
| **Pioche longue de Galenor** | Galenor — galeries hautes | Bonus *vitesse* +15 %, durabilité standard |
| **Pic de Cendara** | Cendara — un seul pic affilé | Bonus *gemmes* +10 %, mais −10 % rendement minerai standard |
| **Pioche d'Ilthara** | Steppes — manche en os | T1-T2 uniquement, sac aventurier |
| **Pioche cristalline d'Onara** | Onara — lame en cristal | Bonus *cristaux énergétiques* +20 %, durabilité fragile −20 % |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Tier veine max exploitable | Vitesse | Chance gemme rare | Durabilité (frappes) | Slots affixes |
|---|---|---|---|---|---|---|
| **T1** Commun | Pioche d'apprenti | T1 | base | 0 % | 80 | 1 |
| **T2** Façonné | Pioche d'initié | T2 | +10 % | +2 % | 110 | 1 |
| **T3** Œuvré | Pioche d'adepte | T3 | +20 % | +5 % | 150 | 2 |
| **T4** Magistral | Pioche experte | T4 | +30 % | +10 % | 200 | 3 |
| **T5** Légendaire | Pioche légendaire | T5 | +40 % | +15 % · proc minerai exotique | 280 | 4 |
| **T6** Mythique | Pioche-signature | T6 | +50 % | +25 % · garantie minerai rare/jour | 400 · *auto-réparation* | 4+1 |

> [!important] Plafond strict
> Tenter d'extraire une veine T4 avec une Pioche T2 : la veine **résiste** (frappes inutiles, durabilité consommée). Message UI : *« Cette pioche est trop fragile pour cette veine »*.

---

## 4. Mini-jeu de récolte — Frappe précise

Une **veine** affiche un point d'impact lumineux (le "filon") qui se déplace après chaque frappe. Le joueur clique sur le filon :
- **Touche pleine** : minerai standard
- **Touche centre** (proc) : minerai qualité+, +5 % chance gemme
- **Touche partielle** : minerai dégradé (−1 tier)
- **Manqué** : durabilité consommée, rien récolté

Le tier de la Pioche **agrandit la zone-cible** et la **fait bouger plus lentement**. T1 = 0.6 s/cycle, T6 = 1.5 s/cycle + zone-cible 3× plus grande.

---

## 5. Affixes outil-spécifiques

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Mineur** | +1 palier effectif | +2 paliers |
| **Vitesse extraction** | −10 % durée frappe | −30 % |
| **Qualité minerai** | +5 % chance qualité+ | +20 % |
| **Chance gemme rare** | +3 % proc gemme | +12 % |
| **Réduction durabilité** | −20 % usure | −60 % |
| **Bonus mini-jeu** | +0.1 s zone précise | +0.3 s · zone +50 % |
| **Récolte aire** | Proc 10 % bonus minerai sur veine adjacente | proc 25 % |
| **Spécialisation gemmes/charbon/mithril** | +10 % rendement famille | +25 % |
| **Détection veines cachées** | Révèle 1 veine cachée par zone (T4+) | révèle 3 veines |

---

## 6. Recette de la Pioche — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Métiers - Forgeron\|Forgeron]] (lame) + [[Métiers - Menuisier\|Menuisier]] (manche) |
| **Station** | Forge + Établi |
| **Intrants** | 2× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (acier dur) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Planche]] (chêne) · 1× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné · 1× Charbon |
| **Palier requis** | Adepte |
| **Durée** | 60 s |
| **Mini-jeu** | Timing température (tête) + précision rivetage |
| **Sortie** | Pioche T3 |

---

## 7. Variants cosmiques

| Ère active | Effet utilitaire |
|---|---|
| Feu Endormi | +20 % chance gemme ardente (Rubis flamboyant) |
| Sommeil de Glace | Permet extraction de glace pérenne (matériau Frost) |
| Échos Brisés | Proc rare : extrait minerai *spectral* (matériau exotique) |
| Présages | Révèle 1 veine cachée supplémentaire / zone |

---

## 8. Décisions ouvertes

- ⚠️ **Durabilité critique** : si la Pioche casse en cours de veine, perd-on le minerai déjà extrait ? **Proposition** : non, ne perd que la suite.
- ⚠️ **Réparation vs renouvellement** : peut-on réparer une Pioche ou faut-il en re-craft ? Lien [[Économie]].
- ⚠️ **Pioche comme arme improvisée** : dégâts ? **Proposition** : 60 % d'un Marteau 1H (la Pioche est un outil-arme historique).
- ⚠️ **Veines T6** : conditions de spawn (boss-loot uniquement ? ère cosmique active ?). À résoudre avec [[Sources de Ressources]].

---

*Liens : [[Items - Index\|← Index Items]] · [[Crafts]] · [[Métiers]] · [[Catégories d'Items]] · [[Hache de bûcheron]] · [[Faux]]*
