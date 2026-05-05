---
tags: [item, archétype, équipement, vêtement, civil, faction, overlay]
type: archetype
category: Équipement
subcategory: Vêtement
slot: Overlay (sur cuirasse)
non_armure: true
materials: [Tissu, Soie, Tissu brodé]
craft_category: Tissage et confection
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [overlay-vs-slot-propre, faction-dynamique]
---

# 🟦 Tabard — Couche d'allégeance par-dessus l'armure

> Vêtement **par-dessus la cuirasse** : pas de slot propre, mais **overlay** sur le slot Torse. Affiche couleurs, armoiries, signature de **faction / guilde / nation**. Sa fonction est principalement **sociale et narrative** (reconnaissance), avec quelques bonus mineurs.

---

## 1. Vue d'ensemble

Le Tabard est l'item-marqueur d'allégeance par excellence. Visuellement, c'est une **étoffe rectangulaire** posée par-dessus le torse, brodée des armoiries d'une faction ou guilde. Mécaniquement, il :
- ne **remplace pas** la cuirasse (overlay cosmétique avec bonus mineurs)
- ne **bloque pas** les autres slots (peut être combiné avec n'importe quelle armure)
- offre des **bonus de faction** (réputation, accès, bonus en territoire allié)
- est **dynamique** : un joueur peut changer de Tabard pour signaler une nouvelle allégeance (avec délai narratif)

> [!important] Pas de slot propre
> Le Tabard est une **couche overlay** appliquée sur la Cuirasse. Le joueur peut le **toggle on/off** (afficher ou cacher), permettant l'infiltration / la furtivité d'allégeance.

---

## 2. Variations — par faction et style

| Variation | Origine | Profil |
|---|---|---|
| **Tabard de garde** | Garde urbaine (Alkaran, Galenor, etc.) | Bonus *autorité* en zone urbaine |
| **Tabard de chevalier** | Ordres chevaleresques | Bonus *honneur* + résistance peur |
| **Tabard de guilde marchande** | Guildes commerciales | Bonus *prix marché* (−5 % achat, +5 % vente) |
| **Tabard religieux** | Ordres religieux ([[Religions]]) | Bonus *rituel* selon religion portée |
| **Tabard de mercenaire** | Compagnies mercenaires | Bonus *recrutement contrats* |
| **Tabard rebelle / sans-faction** | Brigands, hors-la-loi | Bonus *zone hostile* mais malus en ville |
| **Tabard tournoi** | Festivals, joutes | Cosmétique pure, signature personnelle |

---

## 3. Tier × qualité × bonus situationnel

| Tier | Nom | Bonus faction | Bonus social | Slots affixes |
|---|---|---|---|---|
| **T1** Commun | Tabard simple | +1 réputation faction par action | +1 Verbe en zone alliée | 1 |
| **T2** Façonné | Tabard façonné | +2 réputation | +2 Verbe · +1 Présence | 1 |
| **T3** Œuvré | Tabard œuvré | +3 réputation · accès locaux faction | +3 Verbe · +2 Présence | 2 |
| **T4** Magistral | Tabard magistral | +5 réputation · réduction prix gouvernance | +5 Verbe · +3 Présence · proc *parlote bonifiée* | 3 |
| **T5** Légendaire | Tabard légendaire | +8 réputation · accès rangs supérieurs faction · *signature visible* | +7 Verbe · +5 Présence · effet narratif unique | 4 |

> Le Tabard ne dépasse pas T5 (vêtement civil). Les Tabards de **héros nationaux** (T6) sont des items signatures uniques, pas des produits de craft.

---

## 4. Stats brutes affectées

| Stat | Impact Tabard |
|---|---|
| **Verbe** | +1 à +7 (en zone alliée à la faction du Tabard) |
| **Présence** | +1 à +5 (quand l'allégeance est respectée par les PNJ alentour) |
| **Mémoire** | +0 (le Tabard ne porte pas de magie) |

> [!note] Mécanique double-tranchant
> Porter un Tabard de faction X en territoire ennemi = **−5 à −10 Verbe / Présence** en zone hostile (attire l'hostilité, méfiance). Le Tabard est puissant **chez soi** et risqué **ailleurs**.

---

## 5. Affixes spécifiques

| Affixe | Effet T3 | Plafond T5 |
|---|---|---|
| **Reconnaissance faction renforcée** | +5 % réputation gagnée | +20 % |
| **Charisme renforcé** | +5 % efficacité dialogues | +20 % |
| **Anti-fanfare** | Cache l'allégeance à distance > 30 m (les ennemis ne reconnaissent pas) | Cache > 10 m |
| **Bénédiction de guilde** | +1 % stat brute aléatoire en zone alliée | +5 % |
| **Tabard tournoi** | +10 % réputation post-victoire en duel | +30 % |
| **Discrétion sociale** | Permet retirer le Tabard rapidement (−1 s) | Instantané |
| **Tabard double face** | Permet 2 factions encartées (toggle entre les deux) | (T5 uniquement) |
| **Honneur** | +5 % résistance peur | +15 % |

---

## 6. Recettes par matériau — T3 référence

| Matériau | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Tissu brodé** | [[Métiers - Tisserand\|Tisserand]] + [[Métiers - Brodeur\|Brodeur]] | 3× Tissu · 3× Pigment (couleurs faction) · 2× Fil métallique (broderie armoiries) | Adepte · 70 s · broderie composition motif (armoiries faction) |
| **Soie** | Tisserand + Brodeur | 2× Soie · 3× Pigment précieux · 1× Fil d'or | Expert · 90 s · broderie complexe |

> Note : pour qu'un Tabard soit reconnu d'une faction, le **Brodeur** doit avoir accès aux **armoiries officielles** (acquises via réputation, mission, ou achat licence Faction).

---

## 7. Variants cosmiques

Le Tabard, étant un overlay textile dédié à l'identité visuelle, accepte les variants cosmiques **avec parcimonie** : seuls 4-5 variants sont pertinents.

| Variant | Effet Tabard |
|---|---|
| **Doré** | +30 % visibilité ; reconnaissance même en mêlée chaotique |
| **Shadow** | Le Tabard se voile dans l'ombre (caché par défaut, révélé sur volonté) |
| **Spectral** | Tabard translucide ; allégeance ambiguë (réputation +50 % moindre) |
| **Vénérable** | Affiche un héritage historique (effet narratif fort, réactions PNJ uniques) |
| **Brisé** | Tabard partiellement déchiré (effet narratif post-conflit) |

---

## 8. Décisions ouvertes

- ⚠️ **Overlay vs slot propre** : confirmé overlay ? Si oui, comment l'UI gère-t-elle ? **Proposition** : slot dédié *Tabard* dans l'UI, mais visuellement par-dessus la cuirasse.
- ⚠️ **Faction dynamique** : peut-on changer d'allégeance en plein combat ? **Proposition** : non, délai 5 s + cooldown 10 min.
- ⚠️ **Acquisition armoiries** : licence d'usage du blason — comment ? Réputation, achat, mission ?
- ⚠️ **Tabard double face** (T5) : tactique de spy / infiltrateur ? Risque équilibrage.
- ⚠️ **Tabard sans cuirasse** : peut-on porter le Tabard sur Tunique civile ? **Proposition** : oui, reconnu mais visuel approximatif.

---

*Liens : [[Items - Index\|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Cuirasse]] · [[Cape]] · [[Factions]] · [[Religions]]*
