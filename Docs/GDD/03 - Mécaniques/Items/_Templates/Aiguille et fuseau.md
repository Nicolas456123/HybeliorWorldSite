---
tags: [item, archétype, équipement, outil, métier, textile]
type: archetype
category: Équipement
subcategory: Outil
slot: Main (outil de précision)
métier: Tisserand
métiers_secondaires: [Couturier, Tailleur, Brodeur, Cordier, Fileur]
craft_category: Tissage et confection
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [aiguille-vs-fuseau-distinction, couture-magique-T6]
---

# 🪡 Aiguille / Fuseau — Outil-pivot du textile

> Couple d'outils du **Tisserand** (fuseau, prépare le fil) et du **Couturier / Tailleur / Brodeur** (aiguille, assemble le tissu). Comme [[Plume|Plume / Stylet]], ces outils sont fonctionnellement traités comme **un archétype-couple** avec choix de forme au craft.

---

## 1. Vue d'ensemble

Aiguille et Fuseau opèrent en [[Crafts#4. Tissage et confection (textiles)]]. Ils interviennent en chaîne :
1. **Fuseau** (Fileur / Tisserand) : convertit laine plante / laine creature / soie en **fil** utilisable
2. **Aiguille** (Couturier / Tailleur / Brodeur) : assemble tissu et fil en **vêtement / robe / cape / tabard**

Outils signatures pour la fabrication des **vêtements non-armure** ([[Robe simple|Robe simple]], [[Tunique civile]], [[Cape]], [[Tabard]]) ainsi que des **armures Tissu** ([[Cuirasse]] §classe Tissu) et **armures Cuir légères**.

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Aiguille d'argent d'Alkaran** | Ateliers urbains | Polyvalente, qualité standard |
| **Aiguille d'os de Galenor** | Galenor — chasseurs-couturiers | Bonus *cuir* +15 % |
| **Fuseau d'Onara** | Onara — bois flottant | Bonus *fil végétal* (laine plante) +20 % |
| **Aiguille rituelle de Cendara** | Cendara — gravée de protection | Bonus *broderie magique* / enchantement vêtement |
| **Fuseau d'Ilthara** | Steppes — corne de cervidé | Économique, bonus *laine creature* +10 % |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Bonus production | Bonus mini-jeu cadence | Slots affixes |
|---|---|---|---|---|
| **T1** Commun | Aiguille apprenti | Plafond T1 (vêtements basiques) | base | 1 |
| **T2** Façonné | Aiguille initié | Plafond T2 · +5 % vitesse | +0.05 s tolérance | 1 |
| **T3** Œuvré | Aiguille adepte | Plafond T3 · +10 % vitesse · +5 % qualité couture | +0.1 s tolérance | 2 |
| **T4** Magistral | Aiguille experte | Plafond T4 · +15 % vitesse · +10 % qualité · proc *broderie ornée* | +0.15 s tolérance | 3 |
| **T5** Légendaire | Aiguille légendaire | Plafond T5 · +20 % vitesse · proc *signature couture* · *fil enchantable* | +0.2 s tolérance · proc *coup parfait* | 4 |
| **T6** Mythique | Aiguille-signature | Plafond T6 · +25 % vitesse · *broderie magique* (couture = enchantement direct) | +0.25 s · *aura magique* | 4+1 |

> [!note] Aiguille T6 = couture enchantée
> À T6, l'Aiguille permet d'**incorporer un enchantement** directement dans la couture (sans étape Enchanteur séparée). Robe T6 cousue avec une Aiguille T6 = +1 affixe magique gratuit. Mécanique signature endgame textile.

---

## 4. Mini-jeu textile

**Fuseau (filage)** : cadence rythmique — le joueur tourne le rouet en respectant un battement régulier. Tier élargit la zone-tempo.

**Aiguille (couture)** : précision points — chaque point est un mini-QTE pixel-précis. Combinaison de :
- Précision (Acuité [[Personnage]])
- Cadence (Vivacité)
- Mémorisation patron (Mémoire pour patrons complexes)

**Broderie** (Aiguille T3+) : composition motif libre — le joueur dessine un motif qui détermine l'**affixe cosmétique** + un **bonus social** ([[Robe simple]], [[Tabard]] reconnaissance faction).

---

## 5. Affixes outil-spécifiques

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Tisserand/Couturier** | +1 palier | +2 |
| **Vitesse couture** | −10 % durée | −30 % |
| **Qualité tissu produit** | +5 % chance qualité+ | +20 % |
| **Chance broderie rare** | +3 % proc motif rare | +12 % |
| **Réduction fil consommé** | −20 % | −60 % |
| **Bonus mini-jeu cadence** | +0.1 s tolérance | +0.3 s |
| **Économie d'intrants** | 5 % chance −1 intrant | 15 % |
| **Spécialisation soie/cuir/laine** | +10 % rendement famille | +25 % |
| **Aiguille de gravure** | Permet broderie sur cuir | broderie sur écaille (Spécial-Exotique) |
| **Pacte de couture** | Items cousus partagent +1 affixe entre 2 pièces du même set | +1 affixe pour 3 pièces |

---

## 6. Recette Aiguille / Fuseau — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Métiers - Forgeron\|Forgeron]] (aiguille acier) OU [[Métiers - Menuisier\|Menuisier]] (fuseau bois) |
| **Station** | Forge + Établi |
| **Intrants** | 1× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (mithril fin) OU 1× [[Sources de Ressources#Source 1 — Récolte nature\|Bois]] (frêne) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Pigment]] (mardre) · 1× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné (étui) |
| **Palier requis** | Adepte |
| **Durée** | 35 s (outil de précision, peu d'intrants) |
| **Mini-jeu** | Affûtage pointe + polissage |
| **Sortie** | Aiguille + Fuseau (paire) T3 |

---

## 7. Variants cosmiques

| Ère active | Effet utilitaire |
|---|---|
| Verdoiement | Bonus *fil végétal vivant* (cousu sur Verdoyant) |
| Sommeil Onirique | Couture *onirique* (pattern impossible) |
| Échos Brisés | Couture *temporelle* (item gagne charge décalée) |
| Présages | +1 slot affixe |

---

## 8. Décisions ouvertes

- ⚠️ **Aiguille vs Fuseau** : 2 archétypes ou 1 couple ? **Proposition** : 1 couple, choix au craft.
- ⚠️ **Broderie magique T6** : remplace-t-elle l'Enchanteur ou complète ? **Proposition** : complète (broderie = +1 affixe natif, Enchanteur = affixes additionnels).
- ⚠️ **Aiguille comme arme** : non — pointe trop fragile, dégâts dérisoires.
- ⚠️ **Fil consommable** : intrant séparé ou consommable du Fuseau ?

---

*Liens : [[Items - Index\|← Index Items]] · [[Crafts]] · [[Métiers]] · [[Catégories d'Items]] · [[Robe simple]] · [[Tunique civile]] · [[Cape]] · [[Tabard]] · [[Cuirasse]]*
