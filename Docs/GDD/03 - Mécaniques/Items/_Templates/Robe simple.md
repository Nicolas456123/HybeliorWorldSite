---
tags: [item, archétype, équipement, vêtement, civil, torse]
type: archetype
category: Équipement
subcategory: Vêtement
slot: Torse (non-armure)
non_armure: true
materials: [Tissu, Soie, Lin, Laine plante]
craft_category: Tissage et confection
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [robe-civile-vs-armure-tissu, distinction-tunique]
---

# 👘 Robe simple — Vêtement civil de torse

> Vêtement long, ample, porté **au torse**. **Civile** par définition : pas d'armure, fort caractère social. Distincte de la **Robe armure-tissu** ([[Cuirasse]] §classe Tissu) qui a stats combat + bonus magique. La Robe simple est **vêtement de tous les jours**, **occasion sociale**, **rituel**, **profession** (érudit, marchand, dirigeant).

---

## 1. Vue d'ensemble

> [!important] Robe simple ≠ Robe armure-tissu
> | Aspect | Robe simple (civile) | Robe (armure Tissu — voir [[Cuirasse#🧵 Tissu]]) |
> |---|---|---|
> | Catégorie | Équipement / Vêtement | Équipement / Armure |
> | Stats combat | Aucune | Défense magique élevée + bonus Voie |
> | Slot | Torse (non-armure) | Torse (armure Tissu) |
> | Bonus | Verbe, Présence (social) | Mana, Esprit, conduit magique |
> | Valeur | Sociale / cosmétique | Combat / magie |
> | Tier max | T5 | T6 |
>
> **Une Robe simple ne canalise pas le Lien**. Un Lié peut la porter pour passer inaperçu, mais perd ses bonus magiques d'armure-tissu.

La Robe simple opère comme **vêtement social** : elle signale **rang**, **profession**, **occasion**. Sa qualité (tier) reflète le **statut social** du porteur.

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Robe d'Onara** | Onara — coupe ample, claire | Légère, lin/coton pâle, bonus *climat humide* |
| **Robe de Cendara** | Cendara — épaisse, rouge | Laine, coupe protective, bonus *climat chaud* |
| **Robe de Galenor** | Galenor — coupe noble courte | Soie ouvragée, bonus *cour / négociation* |
| **Robe d'Alkaran** | Alkaran — coupe courte, sans manches | Lin léger, polyvalent, bonus *commerce* |
| **Robe de l'Ilthara** | Steppes — robe courte + ceinture épaisse | Bonus *voyage* |
| **Robe d'érudit** | Universités — coupe longue noire | Bonus *bibliothèque, scriptorium* +Mémoire |
| **Robe rituelle** | Religions diverses | Bonus *cérémonie religieuse* |

---

## 3. Tier × qualité × bonus situationnel

| Tier | Nom | Bonus social | Bonus contextuel | Slots affixes |
|---|---|---|---|---|
| **T1** Commun | Robe paysanne | +1 Verbe en interactions civiles | base | 1 |
| **T2** Façonné | Robe d'artisan | +2 Verbe · +1 Présence | +5 % réputation par interaction | 1 |
| **T3** Œuvré | Robe de marchand | +3 Verbe · +2 Présence | +10 % efficacité commerce · proc *éloquence* | 2 |
| **T4** Magistral | Robe de cour | +5 Verbe · +3 Présence · *signature noble* | +15 % réputation · proc *parlote bonifiée* | 3 |
| **T5** Légendaire | Robe de cérémonie | +10 Verbe · +5 Présence · *signature unique* | +25 % réputation · effet narratif unique (auditeurs captivés) | 4 |

> [!note] Robe T5 = +10 Verbe en social
> Au T5, un négociateur en Robe légendaire devient quasi-incontournable en cour. Mais la Robe **n'aide pas** en combat ; un combat la déchire (perte permanente possible si endommagée à T1-T2, réparable T3+).

---

## 4. Stats brutes affectées

| Stat | Impact Robe simple |
|---|---|
| **Verbe** | +1 à +10 (en interaction sociale, rituel, négociation) |
| **Présence** | +1 à +5 (statut social signalé) |
| **Mémoire** | +0 à +3 (Robe d'érudit uniquement) |
| **Vivacité** | −2 % à −5 % (longueur, ample, gêne mouvement) |
| **Endurance** | Neutre |

> Une Robe est **incompatible** avec une activité physique intense — un joueur qui sprinte en Robe T1 risque de la déchirer (perte −1 tier). Robe T3+ a tissu renforcé, pas de déchirement.

---

## 5. Affixes spécifiques

| Affixe | Effet T3 | Plafond T5 |
|---|---|---|
| **Charisme renforcé** | +5 % efficacité dialogues | +20 % |
| **Reconnaissance noble** | +10 % accès lieux nobles | +30 % |
| **Bonus négociation** | −5 % prix négociation | −15 % |
| **Bonus cour** | +5 % réputation après tournoi/cérémonie | +20 % |
| **Robe d'érudit** | +5 % qualité étude | +15 % |
| **Robe rituelle** | +5 % efficacité prière / rituel | +15 % |
| **Tissu pérenne** | Empêche déchirement Robe en activité | Auto-réparation lente |
| **Coupe d'apparat** | +1 Présence supplémentaire en zone formelle | +3 |
| **Sertissage discret** | Permet 1 affixe magique (broderie cachée) | 2 affixes |

---

## 6. Recettes par matériau — T3 référence

| Matériau | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Tissu** | [[Métiers - Tisserand\|Tisserand]] + [[Métiers - Couturier\|Couturier]] | 5× Tissu · 2× Pigment · 2× Fil métallique | Adepte · 70 s · cadence + couture |
| **Soie** | Tisserand + [[Métiers - Brodeur\|Brodeur]] | 4× Soie · 3× Pigment précieux · 2× Fil d'or | Expert · 90 s · broderie ornée |
| **Lin** | Tisserand + Couturier | 6× Tissu de lin · 2× Pigment clair · 1× Fil simple | Initié · 60 s · cadence simple |
| **Laine plante** | Tisserand + Couturier | 5× Laine · 2× Pigment · 1× Fil de laine | Initié · 65 s · cadence |

---

## 7. Variants cosmiques

| Variant | Effet Robe simple |
|---|---|
| **Doré** | +30 % rayonnement social ; +Présence en cour |
| **Spectral** | Robe ondulante ; effet narratif intriguant (PNJ curieux) |
| **Pourpre** | Bonus *séduction* ; aura ambiguë |
| **Verdoyant** | Coupe de prêtresse-druide ; bonus *nature* |
| **Vénérable** | Robe ancienne ; effet narratif fort (héritage) |
| **Onirique** | Couleurs irréelles ; bonus *artiste / barde* |
| Autres | Voir [[Cuirasse#7]] (effets atténués vs armure) |

---

## 8. Décisions ouvertes

- ⚠️ **Robe simple vs Robe armure** : confirmé deux archétypes distincts. Mais un seul slot Torse → ne peut porter qu'un.
- ⚠️ **Déchirement combat** : Robe T1-T2 se déchire en combat — confirmé ? Réparable ?
- ⚠️ **Affixes magiques** : Robe simple peut-elle porter affixes magiques (via *Sertissage discret*) ou est-ce strictement social ? **Proposition** : oui mais limité (1-2 max), bonus magique mineur.
- ⚠️ **Bonus statut social** : impact concret sur PNJ et interactions ? Lien [[Concepts Fondamentaux IA PNJ]].

---

*Liens : [[Items - Index\|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Cuirasse]] · [[Tunique civile]] · [[Tabard]] · [[Cape]]*
