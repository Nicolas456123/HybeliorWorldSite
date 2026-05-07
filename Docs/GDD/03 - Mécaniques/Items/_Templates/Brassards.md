---
tags: [item, archétype, armure, équipement, brassards, slot-bras]
type: archetype
category: Équipement
subcategory: Armure
slot: Bras
classes: [Tissu, Cuir, Mailles, Plate, Spécial-Exotique]
source: Fabriqué
mastery: [Tissage, Tannage, Forge, Joaillerie]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, decision-set-bonuses, mecaniques-parade-arme]
ratio_vs_cuirasse: 12-15%
---

# 🦾 Brassards — Archétype slot Bras (avant-bras)

> Slot Bras / avant-bras. Suit le pattern canonique [[Cuirasse]] (§10) avec un ratio défense **12-15 %** vs Cuirasse. Spécialité : parade d'arme + visée stable + bonus offensif léger.
>
> Termes par classe : **Brassards** (Plate), **Avant-bras à mailles** (Mailles), **Brassards de cuir** (Cuir), **Manches brodées / Bandelettes** (Tissu), variable (Spécial).

---

## 1. Vue d'ensemble

Le slot Bras représente :

- **4-6 %** du total défense (petite surface)
- Le **point de parade** principal pour les armes (l'avant-bras absorbe les coups d'arme parés)
- Bonus **stat brute spécialisé** : Vivacité (réflexes), Acuité (visée stable arc/arme à distance)
- Le **support critique mineur** (visée, précision)

> [!note] Bras vs Mains
> Les **Brassards** couvrent l'avant-bras. Les **Gantelets** couvrent les mains/poignets. Slots distincts mais souvent stylistiquement liés (set complet bras+mains visuellement cohérent).

---

## 2. Les 5 classes — déclinaisons

| Classe | Nom canonique | Profil | Stats brutes | Spécificité |
|---|---|---|---|---|
| **Tissu** | Manches brodées | Mage / Lié | **Esprit**, focus brodé | +efficacité Voie ; faible défense |
| **Cuir** | Brassards de cuir | Archer / Voleur | **Vivacité**, **Acuité** | +précision arc, +stabilité visée |
| **Mailles** | Avant-bras à mailles | Soldat | **Vigueur**, **Endurance** | +parade tenue |
| **Plate** | Brassards de plate | Tank | **Vigueur** | +parade max, +bloc |
| **Spécial-Exotique** | Bracelets exotiques | Endgame | Variable | Bonus créature (ex. tendons aviens = +précision arc) |

> [!note] Variants culturels
> - **Brassards de tireur galenor** (Cuir, Galenor) : renforcés pour l'arc long
> - **Manches d'oraison** (Tissu, Astravia) : runes brodées, +Mémoire

---

## 3. Stats par tier × classe — table-pivot

> Baseline ajustée à **13 % de la cuirasse** (milieu fourchette 12-15 %).

### Table complète — Brassards 6 tiers × 5 classes

> Format : **DéfPhys / DéfMag / Bonus parade ou visée / Bonus stat brute / Slots affixes**

| Tier | **Tissu** (Manches) | **Cuir** (Brassards) | **Mailles** (Avant-bras) | **Plate** (Brassards) | **Spécial-Exotique** |
|---|---|---|---|---|---|
| **T1** Commun | 1 / 3 / 0 % / +1 Mana / 1 | 2 / 2 / +3 % visée arc / +2 Stam / 1 | 4 / 2 / +5 % parade / +2 HP / 1 | 6 / 1 / +10 % parade / +4 HP / 1 | 4 / 4 / var / +affixe / 1 |
| **T2** Façonné | 1 / 4 / 0 % / +2 Mana / 1 | 3 / 2 / +4 % visée / +3 Stam · +1 Acuité / 1 | 5 / 3 / +7 % parade / +3 HP / 2 | 8 / 2 / +13 % parade / +5 HP / 2 | 5 / 5 / var / +affixe / 2 |
| **T3** Œuvré | 2 / 5 / 0 % / +3 Mana · +5 % effi. Voie / 2 | 4 / 3 / +5 % visée · +1 % crit / +4 Stam · +2 Acuité / 2 | 7 / 4 / +9 % parade / +5 HP · +1 Vigueur / 2 | 10 / 2 / +16 % parade / +7 HP · +5 % bloc / 2 | 6 / 6 / var / +affixe / 2 |
| **T4** Magistral | 2 / 7 / 0 % / +4 Mana · +10 % effi. Voie / 2 | 5 / 4 / +7 % visée · +2 % crit / +6 Stam · +3 Acuité / 2 | 9 / 5 / +11 % parade · +3 % bloc / +6 HP · +2 Vigueur / 2 | 13 / 3 / +20 % parade · +5 % bloc / +9 HP · +8 % bloc / 2 | 9 / 9 / var / +2 affixes / 2 |
| **T5** Légendaire | 3 / 9 / 0 % / +5 Mana · +15 % effi. Voie / 2 | 7 / 5 / +10 % visée · +3 % crit / +8 Stam · +5 Acuité / 2 | 12 / 6 / +13 % parade · +5 % bloc / +8 HP · +3 Vigueur / 2 | 17 / 4 / +24 % parade · +8 % bloc / +12 HP · +12 % bloc / 2 | 11 / 11 / var / +2 affixes / 2 |
| **T6** Mythique | 4 / 11 / 0 % / +6 Mana · +20 % effi. Voie · *signature* / 2+1 | 9 / 6 / +12 % visée · +5 % crit · *signature* / 2+1 | 14 / 8 / +16 % parade · +7 % bloc · *signature* / 2+1 | 22 / 5 / +28 % parade · +12 % bloc · *signature* / 2+1 | 14 / 14 / var · *signature* / 2+1 |

> [!info] Lecture
> Brassards Plate T6 = **+28 % parade** + **+12 % bloc** au bouclier. Le tank devient un mur. Brassards Cuir T6 = **+12 % visée arc** + **+5 % crit** : sniper.

---

## 4. Calcul de défense — rappel

Formules de [[Cuirasse#4. Calcul de défense effective]] inchangées.

> [!note] Bonus parade et visée
> - **Parade** s'applique sur la **fenêtre de parade** (le timing reste fixe ; le bonus parade augmente la **réussite** d'une parade serrée).
> - **Visée** réduit le **wobble** de l'arc/arbalète et augmente la précision distante.

---

## 5. Affixes spécifiques aux Brassards

| Affixe (universel slot) | Effet T3 |
|---|---|
| **Garde renforcée** | +5 % parade tenue |
| **Visée stable** | −20 % wobble arc |
| **Riposte** | 5 % chance contre-attaque sur parade |
| **Précision lancer** | +5 % précision armes de jet |
| **Anti-désarmement** | Immunité 50 % aux désarmements |

### Affixes par classe (propres Brassards)

| Classe | Affixe |
|---|---|
| **Tissu** | *Manche d'incantation* — −2 % temps incantation sorts |
| **Cuir** | *Bracelet de tireur* — +5 % dégâts arc/arbalète |
| **Mailles** | *Riposte renforcée* — riposte parée inflige +20 % dégâts |
| **Plate** | *Bouclier de bras* — l'avant-bras seul peut bloquer (sans bouclier) 1 attaque/15 s |
| **Spécial-Exotique** | *Tendon avien* — +10 % précision distance (si matériau avien) |

---

## 6. Recettes — Tier 3 (Œuvré) référence

Intrants ~25-30 % vs Cuirasse.

| Classe | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Tissu** | Tisserand + Brodeur | 1× Tissu · 1× Pigment · 2× Fil métallique | Adepte · 30 s · cadence courte |
| **Cuir** | Tanneur → Maroquinier | 2× Cuir tanné · 1× Fil métallique · 2× Boucles | Adepte · 45 s · coupe précise |
| **Mailles** | Forgeron | 2× Fil métallique · 1× Lingot · 1× Cuir | Adepte · 60 s · tressage anneaux courts |
| **Plate** | Forgeron + Armurier | 2× Lingot · 1× Cuir · 2× Charbon · 1× Eau trempe | **Expert** · 90 s · **étirage** (extension du métal sur enclume cintreuse) |
| **Spécial-Exotique** | Joaillier / Sertisseur | Variable (carapace, tendon, etc.) | **Maître** 🔒 · 120 s · rituel |

---

## 7. Variants cosmiques

10 variants identiques [[Cuirasse#7. Variants cosmiques (10 par ère)]]. Effets adaptés Bras :

| Variant | Effet propre Brassards |
|---|---|
| **Shadow** | Voile autour des bras · +5 % chance crit Ombre infligé |
| **Spectral** | Bras translucides · +20 % chance phase à travers attaque-arme parée |
| **Frost** | Givre · ralentit l'arme parée (l'attaquant subit −10 % vitesse 1 s) |
| **Verdoyant** | Vrilles · attrape automatiquement 1 ennemi/combat sur parade (immobilise 1 s) |
| **Brulé** | Braises · brûle l'arme parée (3 dégâts feu/s à l'attaquant 3 s) |
| **Pourpre** | Brouillard · ennemis ratent leur attaque parée +5 % |
| **Doré** | Halo · soigne +5 HP par parade réussie |
| **Brisé** | Aléatoire · parade peut renvoyer 0-200 % dégâts |
| **Onirique** | Couleurs ondulantes · 1× par combat parade un sort magique |
| **Vénérable** | +1 slot affixe · −5 % autres procs |

Disponibilité par ère : [[Cuirasse]].

---

## 8. Exemples de signatures (PHASE 4 stub)

- **Brassards du Tireur Galenor** (Cuir T5, **Galenor**) — *« Forgés pour les archers de la Falaise. »* Affixe : +20 % portée arc · −30 % wobble.
- **Manches du Premier Lié** (Tissu T6 Doré, **Astravia**) — *« Brodées de runes pré-Souffle. »* Affixe : −5 % temps incantation toutes Voies.
- **Avant-bras de la Légion Cendrée** (Mailles T4 Brulé, **Cendara**) — Affixe : riposte sur parade inflige +30 % et brûlure 5 s.

> [!todo] Phase 4 : 2-3 par grand pays × 13 continents.

---

## 9. Sets et synergies

Voir [[Cuirasse#9. Sets et synergies (question ouverte)]] — **`[REFONTE-NEEDED]`** cohérent avec Cuirasse.

Synergies émergentes :
- **Brassards Plate + Cuirasse Plate + bouclier** : tank-mur avec triple bonus parade/bloc
- **Brassards Cuir + Gantelets Cuir + arc** : sniper avec wobble minimal et crit max

---

## 10. Décisions ouvertes

- ⚠️ **Mécanique parade** : la fenêtre de parade reste-t-elle fixe ou les Brassards la **modifient** ? → décision [[Combat]].
- ⚠️ **Bouclier de bras** affixe Plate : se cumule-t-il avec un bouclier équipé ou est-il **alternatif** (pas de bouclier en main) ? → P3.
- ⚠️ **Désarmement** : la mécanique de désarmement existe-t-elle déjà ou affixe préventif ? → confirmer P3.
- ⚠️ Variants culturels Galenor/Astravia → P4.

---

*Liens : [[Items/Index\|← Index Items]] · [[Cuirasse]] · [[Catégories d'Items]] · [[Crafts]] · [[Combat]]*
