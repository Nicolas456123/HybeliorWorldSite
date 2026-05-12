---
tags: [item, archétype, équipement, outil, métier, scriptorium, enchantement]
type: archetype
category: Équipement
subcategory: Outil
slot: Main (outil de précision)
métier: Scribe
métiers_secondaires: [Enchanteur, Cartographe, Calligraphe, Compositeur de sorts, Relieur]
craft_category: Scriptorium et enchantement
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [stylet-vs-plume-distinction, encre-comme-affixe]
---

# 🪶 Plume / Stylet — Outil de précision du Scriptorium

> Plume taillée pour [[Crafts#8. Scriptorium et enchantement (savoirs et magie)]]. Outil le plus délicat du jeu : sa **qualité conditionne la lisibilité** d'un parchemin, la **stabilité** d'un sort encapsulé, la **durabilité** d'une carte. À très haut tier, la Plume devient un **conduit magique** capable de *graver des sorts* sur des objets.

---

## 1. Vue d'ensemble

La Plume / Stylet est l'outil-pivot de :
- **Scribe** : rédaction de parchemins, archives, documents
- **Enchanteur** : tracé de glyphes sur items (sorts encapsulés sur armes, armures, bijoux)
- **Cartographe** : tracés cartographiques précis
- **Calligraphe** : pièces d'art (lien [[Métiers]] §Divertissements)
- **Compositeur de sorts** : élaboration de nouveaux sorts (recherche)

> [!note] Plume vs Stylet
> - **Plume** : pointe organique (plume d'oiseau taillée, calame), idéale pour parchemin → fluide, large
> - **Stylet** : pointe métallique (acier, mithril, alliage), idéal pour gravure dure (cuir, métal, bois) → précis, fin
> Les deux sont fonctionnellement le même archétype-outil — variation de pointe selon support. T4+ sont souvent **convertibles** (pointe interchangeable).

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Plume d'aigle d'Alkaran** | Aigles montagne | Bonus *vitesse écriture* +15 % |
| **Stylet de Galenor** | Galenor — métallique | Bonus *gravure dure* (armes, armures) |
| **Plume-encre-vivante d'Onara** | Onara — réservoir d'encre auto-régénérant | −90 % besoin de re-tremper, T4+ uniquement |
| **Plume de cygne de Cendara** | Cendara — fragile mais luminescente | Bonus *enchantement Lumière* / Voie d'Eldoria |
| **Calame d'Ilthara** | Steppes — roseau taillé | Économique, qualité standard |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Bonus production | Bonus enchantement | Slots affixes |
|---|---|---|---|---|
| **T1** Commun | Plume apprenti | Plafond T1 (parchemins simples) | aucun | 1 |
| **T2** Façonné | Plume initié | Plafond T2 · +5 % qualité tracé | +5 % qualité enchantement T1 | 1 |
| **T3** Œuvré | Plume adepte | Plafond T3 · +10 % qualité · +5 % vitesse | +10 % qualité enchantement T1-T2 | 2 |
| **T4** Magistral | Plume experte | Plafond T4 · +15 % qualité · +10 % vitesse · proc *belle main* | +20 % qualité ; T3 enchantements possibles | 3 |
| **T5** Légendaire | Plume légendaire | Plafond T5 · +20 % qualité · proc *signature* | +25 % qualité ; T4 enchantements ; **réserve mana** −10 % | 4 |
| **T6** Mythique | Plume-signature | Plafond T6 (Mythique) · *signature de scribe* visible | +30 % qualité ; T5-T6 enchantements ; **mana réserve** −20 % ; *aura magique* | 4+1 |

> [!important] Plume T6 = +30 % qualité d'enchantement
> À T6, la Plume devient un véritable **conduit magique**. Un Enchanteur Maître + Plume T6 produit des items enchantés que personne ne peut reproduire avec une Plume inférieure. Ancrage économique fort.

---

## 4. Mini-jeu de tracé

L'écriture/tracé est un mini-jeu de **précision pixel** :
- Le joueur trace le glyphe / lettre / ligne en suivant un guide
- Précision pixel + vitesse → score combiné
- Tier de la Plume → assouplit la marge d'erreur
- **Acuité** ([[Personnage]]) du joueur → améliore la précision visuelle
- **Stat brute Mémoire** → débloque glyphes complexes (T4+)

Pour les **enchantements** : séquence de glyphes à tracer dans l'ordre + dans la **fenêtre temporelle** (rituel). La Plume T6 octroie une zone-de-grâce de 0.5 s par glyphe.

---

## 5. Affixes outil-spécifiques

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Scribe/Enchanteur** | +1 palier | +2 |
| **Vitesse écriture** | −10 % durée tracé | −30 % |
| **Qualité tracé** | +5 % chance qualité+ | +20 % |
| **Chance enchantement rare** | +3 % proc affixe rare | +12 % |
| **Réduction encre consommée** | −20 % | −60 % |
| **Bonus mini-jeu glyphe** | +0.1 s tolérance | +0.5 s |
| **Réservoir d'encre étendu** | +50 % avant rechargement | +200 % |
| **Spécialisation école magique** | +10 % qualité enchantements d'une Voie | +30 % |
| **Pacte runique** | Glyphe T6 produit garde 1 charge supplémentaire | +3 charges |

---

## 6. Recette Plume / Stylet — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Forgeron\|Forgeron]] (pointe métal, stylet) OU plume taillée (auto-fabrication par Scribe) |
| **Station** | Pupitre de scribe + Atelier de précision |
| **Intrants** | 1× [[Sources de Ressources#Source 2 — Récolte sur créature\|Plume]] (cygne, aigle, etc.) OU 1× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (mithril ou acier fin) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Pigment]] · 1× [[Sources de Ressources#Source 1 — Récolte nature\|Bois]] (manche fin) |
| **Palier requis** | Adepte |
| **Durée** | 40 s |
| **Mini-jeu** | Précision taille/affûtage |
| **Sortie** | Plume / Stylet T3 |

---

## 7. Variants cosmiques

| Ère active | Effet utilitaire |
|---|---|
| Ombre Longue | Permet écriture *invisible* (texte révélé sous condition) |
| Rêve Lumineux | +20 % qualité enchantement Voie de Lumière |
| Échos Brisés | Proc rare : enchantement *temporel* (effet décalé) |
| Présages | +1 slot affixe |

---

## 8. Décisions ouvertes

- ⚠️ **Plume vs Stylet** : 2 archétypes distincts ou 1 avec variants ? **Proposition** : 1 archétype, choix de pointe au craft.
- ⚠️ **Encre comme intrant** ou comme affixe Plume ? **Proposition** : encre = consommable [[Sources de Ressources]] + slot fiole sur Plume.
- ⚠️ **Plume comme arme improvisée** : non, dégâts dérisoires.
- ⚠️ **Récolte plume sur créatures volantes** : interaction [[Bûcheron]] / Chasseur.

---

*Liens : [[Items/Index\|← Index Items]] · [[Crafts]] · [[Métiers]] · [[Catégories d'Items]] · [[Parchemin]] · [[Tome]] · [[Bandeau frontal]]*
