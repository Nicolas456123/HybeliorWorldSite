---
tags: [item, archétype, armure, équipement, jambières, slot-jambes]
type: archetype
category: Équipement
subcategory: Armure
slot: Jambes
classes: [Tissu, Cuir, Mailles, Plate, Spécial-Exotique]
source: Fabriqué
mastery: [Tissage, Tannage, Forge, Joaillerie]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, decision-set-bonuses, variants-culturels-pantalon]
ratio_vs_cuirasse: 25-30%
---

# 🦵 Jambières — Archétype slot Jambes

> Slot Jambes. Suit le pattern canonique [[Cuirasse]] (§10) avec un ratio défense **25-30 %** vs Cuirasse — le **second slot le plus important** après Torse en couverture défensive. Spécialité : Vigueur défense + Endurance déplacement.
>
> Termes par classe : **Jambières / Cuissardes** (Plate), **Chausses à mailles** (Mailles), **Pantalon de cuir** (Cuir), **Robe basse / Pantalon léger** (Tissu), variable (Spécial).
>
> Note : "Pantalon" (TypeObjet #9) = **synonyme** de Jambières. Les **Jambières** sont la dénomination canonique. Le terme **Pantalon** est utilisé comme **variant culturel** (notamment Galenor — pantalon de tireur — voir §2).

---

## 1. Vue d'ensemble

Le slot Jambes représente :

- **20-25 %** du total défense (deuxième après Torse)
- Le **support de mobilité** : pénalité de mouvement principalement issue des jambières
- Bonus **stat brute spécialisé** : Vigueur défense, Endurance déplacement (sprint), résistance Stagger bas
- Le **vecteur d'identité visuelle secondaire** (silhouette inférieure 30 %)

---

## 2. Les 5 classes — déclinaisons

| Classe | Nom canonique | Profil | Stats brutes | Spécificité |
|---|---|---|---|---|
| **Tissu** | Robe basse / Pantalon léger | Mage / Lié | **Esprit**, **Endurance** | +Mana ; mobilité libre |
| **Cuir** | Pantalon de cuir | Éclaireur / Voleur | **Vivacité**, **Endurance** | +sprint, +esquive |
| **Mailles** | Chausses à mailles | Soldat | **Vigueur**, **Endurance** | équilibré |
| **Plate** | Jambières / Cuissardes | Tank | **Vigueur** | +défense max ; **−15 % vitesse mvt** ; **−10 % portée saut** |
| **Spécial-Exotique** | Cuissardes exotiques | Endgame | Variable | Bonus créature (ex. tendons aviens = +saut) |

> [!note] Variants culturels — Pantalon
> - **Pantalon de tireur galenor** (Cuir, Galenor) : poches latérales, +précision tir debout
> - **Sarouel d'Onara** (Tissu, Onara) : ample, +Endurance déplacement en zone humide
> - **Cuissardes nordiques d'Alkaran** (Plate, Alkaran) : doublure fourrure, +résistance Glace native

---

## 3. Stats par tier × classe — table-pivot

> Baseline ajustée à **27 % de la cuirasse** (milieu fourchette 25-30 %).

### Table complète — Jambières 6 tiers × 5 classes

> Format : **DéfPhys / DéfMag / Pénalité Mvt / Bonus stat brute / Slots affixes**

| Tier | **Tissu** (Robe basse) | **Cuir** (Pantalon) | **Mailles** (Chausses) | **Plate** (Cuissardes) | **Spécial-Exotique** |
|---|---|---|---|---|---|
| **T1** Commun | 2 / 6 / 0 % / +3 Mana / 1 | 5 / 3 / 0 % / +4 Stam / 1 | 8 / 4 / −3 % / +5 HP / 1 | 12 / 3 / −10 % / +8 HP / 1 | 8 / 8 / var / +affixe / 1 |
| **T2** Façonné | 3 / 8 / 0 % / +4 Mana / 2 | 6 / 4 / 0 % / +5 Stam · +1 Endurance / 2 | 11 / 6 / −3 % / +7 HP / 2 | 16 / 4 / −10 % / +11 HP / 2 | 10 / 10 / var / +affixe / 2 |
| **T3** Œuvré | 4 / 11 / 0 % / +5 Mana · +5 % effi. Voie / 2 | 8 / 5 / +2 % esquive / +7 Stam · +2 Endurance · +3 % sprint / 3 | 14 / 7 / −3 % / +9 HP · +2 Vigueur / 3 | 21 / 5 / −12 % / +14 HP · +5 % résist stagger bas / 3 | 13 / 13 / var / +affixe / 3 |
| **T4** Magistral | 5 / 14 / 0 % / +7 Mana · +10 % effi. Voie · +1 régen Mana/s / 3 | 11 / 7 / +5 % esquive / +9 Stam · +3 Endurance · +5 % sprint / 3 | 18 / 9 / −5 % / +12 HP · +3 Vigueur · +3 % stagger / 3 | 27 / 6 / −14 % / +18 HP · +10 % stagger · −5 % saut / 4 | 17 / 17 / var / +2 affixes / 4 |
| **T5** Légendaire | 6 / 18 / 0 % / +9 Mana · +15 % effi. Voie / 4 | 14 / 9 / +8 % esquive / +12 Stam · +5 Endurance · +8 % sprint / 4 | 23 / 12 / −5 % / +15 HP · +5 Vigueur · +5 % stagger / 4 | 35 / 8 / −16 % / +23 HP · +15 % stagger · −10 % saut / 4 | 22 / 22 / var / +2-3 affixes / 4 |
| **T6** Mythique | 8 / 23 / 0 % / +12 Mana · +20 % effi. Voie · *signature* / 4+1 | 18 / 12 / +12 % esquive / +15 Stam · +7 Endurance · +12 % sprint · *signature* / 4+1 | 29 / 16 / −5 % / +19 HP · +7 Vigueur · +8 % stagger · *signature* / 4+1 | 44 / 10 / −18 % / +30 HP · +20 % stagger · *signature* / 4+1 | 28 / 28 / var · *signature* / 4+1 |

> [!info] Lecture
> Cuissardes Plate T6 = **+44 défense phys** (≈ une Cuirasse Plate T2 !) mais **−18 % mvt**. Pantalon Cuir T6 = **+12 % esquive** + **+12 % sprint** : escapade.

---

## 4. Calcul de défense — rappel

Formules [[Cuirasse#4. Calcul de défense effective]] inchangées.

> [!note] Pénalités de mouvement cumulatives
> La pénalité de Cuirasse + Jambières + Bottes Plate **cumule mais avec courbe diminishing return** : −15 % (Cuir) + −15 % (Jamb) + −5 % (Bot) ≠ −35 %. Formule : `pénalité_totale = 1 - (1 - p1)(1 - p2)(1 - p3)` (multiplicatif). Plafond global **−40 % vitesse mvt** sur set Plate complet T6 (à playtester).

---

## 5. Affixes spécifiques aux Jambières

| Affixe (universel slot) | Effet T3 |
|---|---|
| **Foulée allongée** | +5 % vitesse mvt |
| **Sprint prolongé** | +10 % durée sprint |
| **Anti-trip** | Immunité 50 % aux trip / chute |
| **Saut renforcé** | +10 % portée saut |
| **Bonus genou** | +5 % résistance stagger bas |

### Affixes par classe (propres Jambières)

| Classe | Affixe |
|---|---|
| **Tissu** | *Pantalon flottant* — −2 % coût Mana sorts de mouvement (téléport, dash) |
| **Cuir** | *Pantalon de tireur* — +5 % précision tir en mouvement |
| **Mailles** | *Chausses renforcées* — +5 % parade tenue |
| **Plate** | *Cuissardes lourdes* — Immunité knockdown · réduit le saut à 50 % |
| **Spécial-Exotique** | *Tendons aviens* — +20 % portée saut (si matériau avien) |

---

## 6. Recettes — Tier 3 (Œuvré) référence

Intrants ~60-70 % vs Cuirasse (deuxième plus grand slot).

| Classe | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Tissu** | Tisserand + Brodeur | 3× Tissu · 1× Pigment · 1× Cristal mineur · 4× Fil métallique | Adepte · 50 s · cadence métier à tisser (moyenne) |
| **Cuir** | Tanneur → Maroquinier | 4× Cuir tanné · 2× Fil métallique · 1× Boucle · 1× Pigment | Adepte · 75 s · coupe précise (2 jambes symétriques) |
| **Mailles** | Forgeron | 6× Fil métallique · 1× Lingot · 1× Cuir · 1× Charbon | Adepte · 100 s · tressage long anneaux |
| **Plate** | Forgeron + Armurier | 4× Lingot · 1× Alliage · 1× Cuir · 3× Charbon · 1× Eau trempe | **Expert** · 150 s · timing température (4 phases : forge, modelage cuissard, articulation genou, trempe) |
| **Spécial-Exotique** | Joaillier / Sertisseur | Variable (carapace, écaille, tendon) | **Maître** 🔒 · 200 s · rituel long |

---

## 7. Variants cosmiques

10 variants identiques [[Cuirasse#7. Variants cosmiques (10 par ère)]]. Effets adaptés Jambes :

| Variant | Effet propre Jambières |
|---|---|
| **Shadow** | Pas silencieux · −20 % bruit |
| **Spectral** | Phase à travers obstacles bas (clôtures, bancs) 1× par combat |
| **Frost** | +25 % résistance Glace · ne glisse pas sur glace |
| **Verdoyant** | +5 % vitesse mvt en zone naturelle |
| **Brulé** | +25 % résistance Feu · proc 5 % brûlure sur ennemi mêlée frappant les jambes |
| **Pourpre** | +5 % esquive (illusion bas de corps) |
| **Doré** | Halo bas · révèle pièges au sol dans 5 m |
| **Brisé** | Aléatoire · vitesse mvt fluctue 0-200 % |
| **Onirique** | 1× par combat ralentit ennemi qui touche |
| **Vénérable** | +1 slot affixe |

Disponibilité par ère : [[Cuirasse]].

---

## 8. Exemples de signatures (PHASE 4 stub)

- **Cuissardes du Premier Veilleur** (Plate T6, **Astravia**) — *« Inscriptions illisibles, pareil que la cuirasse. »* Affixe : Immunité knockdown · pénalité mvt réduite à −10 %.
- **Pantalon de tireur galenor** (Cuir T5, **Galenor**) — *« Cousu pour les Falaises. »* Affixe : +20 % précision tir debout · +15 % portée arc.
- **Sarouel d'Onara** (Tissu T4 Verdoyant, **Onara**) — Affixe : +1 régen Mana/s en zone humide · +Endurance déplacement.
- **Chausses de la Légion Cendrée** (Mailles T4 Brulé, **Cendara**) — Affixe : +30 % résistance Feu · +5 HP/s en zone volcanique.
- **Cuissardes nordiques d'Alkaran** (Plate T5 Frost, **Alkaran**) — Affixe : +35 % résistance Glace · ne glisse pas.

> [!todo] Phase 4 : 2-3 par grand pays × 13 continents.

---

## 9. Sets et synergies

Voir [[Cuirasse#9. Sets et synergies (question ouverte)]] — **`[REFONTE-NEEDED]`** cohérent avec Cuirasse.

Synergies émergentes :
- **Cuissardes Plate + Cuirasse Plate + Heaume Plate** : tank lourd, défense max, mobilité minimum
- **Pantalon Cuir Shadow + Bottes Cuir Shadow + Capuche Cuir Shadow** : ninja-build, multiples procs invisibilité
- **Robe basse Tissu + Robe Tissu (cuirasse)** : silhouette mage classique, +bonus efficacité Voie cumulé

---

## 10. Décisions ouvertes

- ⚠️ **Cumul pénalités mvt** : formule multiplicative confirmée mais **plafond global à playtester**.
- ⚠️ **Saut réduit Plate** : nuit à la verticalité du gameplay → confirmer acceptabilité.
- ⚠️ **Pantalon vs Jambières** : noms parallèles ou seul "Jambières" canonique avec "Pantalon" comme variant culturel ? → retenu : **Jambières canonique, Pantalon = variant Galenor**.
- ⚠️ Variants culturels (Galenor, Onara, Alkaran) → P4.

---

*Liens : [[Items - Index\|← Index Items]] · [[Cuirasse]] · [[Catégories d'Items]] · [[Crafts]] · [[Personnage]] · [[Combat]]*
