---
tags: [item, archétype, équipement, outil, métier, forge, verre]
type: archetype
category: Équipement
subcategory: Outil
slot: Outil-support (passif en station)
métier: Forgeron
métiers_secondaires: [Verrier, Fondeur, Métallurgiste]
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [outil-support-vs-actif, soufflet-portable-T5]
---

# 🌬 Soufflet — Outil de support thermique

> Outil **support** du Forgeron, du Verrier, du Fondeur. Sa fonction : **maintenir et amplifier la température** du foyer (forge, four à verre, four de fonte). Outil **passif en station** : il agit en complément du Marteau de forge, pas à sa place.

---

## 1. Vue d'ensemble

Le Soufflet est unique parmi les outils de cette vague : c'est un **outil-support**. Il ne s'utilise pas dans un mini-jeu actif principal — il **équipe la station** (forge, four) et ajoute un effet passif sur **TOUS les crafts effectués à cette station**.

Ses bénéfices :
- **Élargit la zone optimale** de la jauge de température (mini-jeu *timing température* du Forgeron)
- **Réduit la consommation de charbon** par craft
- **Permet** d'atteindre les températures rares (acier mithril, verre cosmique) qui sinon nécessitent des conditions spéciales

> [!note] Soufflet portable (T5+)
> Un Soufflet T5+ devient **portable** : l'aventurier peut allumer un foyer sauvage et bénéficier des effets, sans station fixe. Permet le craft d'urgence en exploration.

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Soufflet d'Alkaran** | Forges-cités | Polyvalent, qualité standard |
| **Soufflet double de Galenor** | Galenor — deux poignées synchrones | Bonus *vitesse forge* +20 %, mais réduit qualité de 5 % |
| **Soufflet rituel d'Onara** | Onara — décoré de runes | Bonus *forge magique* (Voie de Feu) +15 % |
| **Soufflet à pédale de Cendara** | Cendara — actionné aux pieds | Permet forge mains-libres (mini-jeu modifié) |
| **Soufflet portatif d'Ilthara** | Steppes — petit, léger | T1-T3, sac aventurier (premier modèle portable) |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Bonus station | Économie charbon | Effet portable | Slots affixes |
|---|---|---|---|---|---|
| **T1** Commun | Soufflet apprenti | +5 % zone optimale temp. | base | — | 1 |
| **T2** Façonné | Soufflet initié | +10 % zone | −5 % | — | 1 |
| **T3** Œuvré | Soufflet adepte | +15 % zone · permet mithril T3 | −10 % · +5 % qualité | — | 2 |
| **T4** Magistral | Soufflet expert | +20 % zone · permet mithril T4 · proc *température parfaite* | −15 % · +10 % qualité | — | 3 |
| **T5** Légendaire | Soufflet légendaire | +25 % zone · permet acier exotique T5 | −20 % · +15 % qualité | **Portable** | 4 |
| **T6** Mythique | Soufflet-signature | +30 % zone · permet mithril cosmique T6 · *aura* | −30 % · +20 % qualité | Portable + signature | 4+1 |

---

## 4. Mini-jeu — Pompage rythmique (optionnel)

En **mode actif**, le joueur peut **pomper** le Soufflet en rythme pendant le mini-jeu de Forge :
- Pompage parfait : +5 % qualité bonus, +5 % vitesse
- Pompage standard : aucun bonus
- Pompage manqué : ralentit le craft

**En mode passif** (par défaut) : le Soufflet agit automatiquement avec son bonus de tier.

> Le mini-jeu de pompage est optionnel — le Forgeron peut se concentrer uniquement sur le martelage et laisser le Soufflet en passif.

---

## 5. Affixes outil-spécifiques

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Forgeron/Verrier** | +1 palier | +2 |
| **Vitesse forge** | −5 % durée | −20 % |
| **Qualité forge** | +5 % chance qualité+ | +20 % |
| **Chance affixe rare** | +3 % proc affixe rare sur item produit | +12 % |
| **Économie charbon** | −10 % charbon consommé | −40 % |
| **Bonus mini-jeu température** | +0.2 s tolérance | +0.6 s |
| **Foyer portable** | Permet usage hors-station | (intrinsèque T5+) |
| **Spécialisation feu/glace/foudre** | +10 % qualité affixe élémentaire | +30 % |
| **Souffle d'éveil** | Proc 5 % sur craft : éveille un cristal énergétique mineur | proc 15 % cristal majeur |

---

## 6. Recette Soufflet — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Métiers - Tanneur\|Tanneur]] (cuir-poumon) + [[Métiers - Menuisier\|Menuisier]] (cadre bois) + [[Métiers - Forgeron\|Forgeron]] (buse métal) |
| **Station** | Établi (multi) |
| **Intrants** | 2× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné épais (poumon) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Planche]] (cadre) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (buse) · 2× [[Sources de Ressources#Source 3 — Fabrication\|Fil métallique]] (sangles) |
| **Palier requis** | Adepte |
| **Durée** | 65 s (multi-station) |
| **Mini-jeu** | Couture cuir + assemblage |
| **Sortie** | Soufflet T3 |

---

## 7. Variants cosmiques

| Ère active | Effet utilitaire |
|---|---|
| Feu Endormi | +30 % efficacité ; débloque température cosmique |
| Sommeil de Glace | Permet forge sous-zéro (matériaux Frost) |
| Échos Brisés | Proc rare : items forgés gagnent affixe *Brisé* |
| Présages | +1 slot affixe |

---

## 8. Décisions ouvertes

- ⚠️ **Outil-support actif vs passif** : laisse-t-on le joueur pomper actif pour bonus, ou imposé passif ?
- ⚠️ **Soufflet portable T5+** : conditions de spawn d'un foyer sauvage (intrants : bois + pierre + charbon) ?
- ⚠️ **Cumul Soufflet + Marteau de forge** : les deux affixes *Vitesse forge* se cumulent-ils ? **Proposition** : oui mais plafond combiné −40 %.
- ⚠️ **Soufflet pour Verrier vs Forgeron** : variants spécifiques ou outil unifié ?

---

*Liens : [[Items - Index\|← Index Items]] · [[Crafts]] · [[Métiers]] · [[Catégories d'Items]] · [[Marteau de forge]]*
