---
tags: [item, archétype, armure, équipement, bottes, slot-pieds]
type: archetype
category: Équipement
subcategory: Armure
slot: Pieds
classes: [Tissu, Cuir, Mailles, Plate, Spécial-Exotique]
source: Fabriqué
mastery: [Tissage, Tannage, Forge, Joaillerie]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, decision-set-bonuses, variants-culturels-chausses]
ratio_vs_cuirasse: 10-12%
---

# 👢 Bottes — Archétype slot Pieds

> Slot Pieds. Suit le pattern canonique [[Cuirasse]] (§10) avec un ratio défense **10-12 %** vs Cuirasse. Spécialité : Vivacité, vitesse de mouvement, discrétion (Cuir) ou stabilité (Plate).
>
> Termes par classe : **Bottes de plate / Solerets** (Plate), **Bottes à mailles** (Mailles), **Bottes de cuir** (Cuir), **Sandales / Chausses tissées** (Tissu), variable (Spécial).

---

## 1. Vue d'ensemble

Le slot Pieds représente :

- **3-5 %** du total défense (petite surface)
- Le **support mobilité majeur** : vitesse de mouvement, discrétion (bruit de pas), stabilité
- Bonus **stat brute spécialisé** : Vivacité (réflexes, esquive), Endurance (sprint, distance parcourue)
- Le **point de friction sol** : terrain glissant, pièges au sol, sols difficiles (boue, glace, sable)

---

## 2. Les 5 classes — déclinaisons

| Classe | Nom canonique | Profil | Stats brutes | Spécificité |
|---|---|---|---|---|
| **Tissu** | Sandales / Chausses tissées | Mage / Lié | **Esprit**, **Vivacité** | légères, mais peu de protection ; +mvt sur surfaces stables |
| **Cuir** | Bottes de cuir | Éclaireur / Voleur | **Vivacité**, **Endurance** | +sprint, +discrétion (pas silencieux) |
| **Mailles** | Bottes à mailles | Soldat | **Vigueur**, **Endurance** | équilibré, modérément bruyant |
| **Plate** | Solerets / Bottes de plate | Tank | **Vigueur** | +défense ; **−5 % mvt additionnel** ; **+stabilité** (immunité glissade) |
| **Spécial-Exotique** | Bottes exotiques | Endgame | Variable | Bonus créature (ex. plumes aviennes = saut, écailles aquatiques = nage) |

> [!note] Variants culturels
> - **Bottes nordiques d'Alkaran** (Cuir doublé fourrure, Alkaran) : +résistance Glace, +stabilité neige
> - **Sandales hopliques d'Astravia** (Cuir/Mailles hybride) : style militaire grec, +sprint formation
> - **Chausses druidiques d'Onara** (Tissu, Onara) : tressées de feuilles, +mvt forêt
> - **Bottes du désert d'Ilthara** (Cuir, Ilthara) : semelles épaisses, immunité chaleur sol

---

## 3. Stats par tier × classe — table-pivot

> Baseline ajustée à **11 % de la cuirasse** (milieu fourchette 10-12 %).

### Table complète — Bottes 6 tiers × 5 classes

> Format : **DéfPhys / DéfMag / Bonus mobilité / Bonus stat brute / Slots affixes**

| Tier | **Tissu** (Sandales) | **Cuir** (Bottes) | **Mailles** (Bottes) | **Plate** (Solerets) | **Spécial-Exotique** |
|---|---|---|---|---|---|
| **T1** Commun | 1 / 2 / +3 % mvt / +1 Mana / 1 | 2 / 1 / +3 % mvt · −10 % bruit / +2 Stam / 1 | 3 / 2 / 0 % / +2 HP / 1 | 5 / 1 / −3 % mvt · +stabilité / +3 HP / 1 | 3 / 3 / var / +affixe / 1 |
| **T2** Façonné | 1 / 3 / +4 % mvt / +2 Mana / 1 | 3 / 2 / +4 % mvt · −12 % bruit / +3 Stam · +1 Vivacité / 2 | 4 / 2 / 0 % / +3 HP / 2 | 7 / 2 / −3 % mvt · +stabilité / +5 HP / 2 | 4 / 4 / var / +affixe / 2 |
| **T3** Œuvré | 2 / 4 / +5 % mvt / +3 Mana · +5 % effi. Voie / 2 | 4 / 3 / +5 % mvt · −15 % bruit · +2 % esquive / +4 Stam · +2 Vivacité / 2 | 5 / 3 / 0 % / +4 HP · +1 Vigueur / 2 | 9 / 2 / −5 % mvt · +stabilité · +5 % résist trip / +6 HP · +5 % parade / 2 | 5 / 5 / var / +affixe / 2 |
| **T4** Magistral | 2 / 6 / +7 % mvt / +4 Mana · +10 % effi. Voie / 3 | 5 / 4 / +7 % mvt · −20 % bruit · +5 % esquive / +6 Stam · +3 Vivacité · +3 % sprint / 3 | 7 / 4 / +1 % mvt / +5 HP · +2 Vigueur · +3 % stabilité / 3 | 11 / 3 / −5 % mvt · +immunité glissade / +9 HP · +8 % parade · +5 % stagger / 3 | 7 / 7 / var / +2 affixes / 3 |
| **T5** Légendaire | 3 / 7 / +9 % mvt / +5 Mana · +15 % effi. Voie / 3 | 7 / 5 / +10 % mvt · −25 % bruit · +8 % esquive / +8 Stam · +5 Vivacité · +5 % sprint / 3 | 9 / 5 / +2 % mvt / +7 HP · +3 Vigueur · +5 % stabilité / 3 | 14 / 4 / −5 % mvt · +immunité glissade · +stab fort / +12 HP · +12 % parade · +8 % stagger / 3 | 9 / 9 / var / +2 affixes / 3 |
| **T6** Mythique | 4 / 9 / +12 % mvt / +6 Mana · +20 % effi. Voie · *signature* / 3+1 | 9 / 7 / +14 % mvt · −30 % bruit · +12 % esquive · *signature* / 3+1 | 12 / 7 / +3 % mvt / +9 HP · +5 Vigueur · +8 % stabilité · *signature* / 3+1 | 18 / 5 / −5 % mvt · +immunité glissade/knock down · *signature* / 3+1 | 12 / 12 / var · *signature* / 3+1 |

> [!info] Lecture
> Bottes Cuir T6 = **+14 % vitesse** + **−30 % bruit** + **+12 % esquive** — voleur silencieux. Solerets Plate T6 = **immunité totale glissade/knockdown** mais **−5 % mvt** : tank inébranlable.

---

## 4. Calcul de défense — rappel

Formules [[Cuirasse#4. Calcul de défense effective]] inchangées.

> [!note] Bonus mvt cumulatifs
> Le bonus mvt des Bottes s'**ajoute** linéairement (additif) aux pénalités multiplicatives de Cuirasse/Jambières. Exemple : Cuirasse Plate (−15 %) + Cuissardes Plate (−15 %) + Solerets Plate (−5 %) = **base ~−32 %** ; ajout d'affixe *Foulée allongée* +5 % → ~−27 % final.

---

## 5. Affixes spécifiques aux Bottes

| Affixe (universel slot) | Effet T3 |
|---|---|
| **Vitesse de mouvement** | +5 % mvt |
| **Pas silencieux** | −15 % bruit (cumul Cuir) |
| **Saut renforcé** | +10 % portée saut |
| **Anti-piège** | Immunité 50 % aux pièges au sol |
| **Stabilité** | +5 % résistance knockdown |

### Affixes par classe (propres Bottes)

| Classe | Affixe |
|---|---|
| **Tissu** | *Pas léger* — +5 % mvt additionnel sur sols stables |
| **Cuir** | *Pas du voleur* — invisibilité 1 s sur premier pas après combat (cooldown 30 s) |
| **Mailles** | *Bottes renforcées* — +3 % parade tenue |
| **Plate** | *Solerets enracinés* — Immunité totale knockdown (au-delà du cumul) ; **mais** −20 % portée saut |
| **Spécial-Exotique** | *Plumes aviennes* — +30 % portée saut (si matériau avien) ou *Écaille aquatique* (nage +50 %, si matériau aquatique) |

---

## 6. Recettes — Tier 3 (Œuvré) référence

Intrants ~20-25 % vs Cuirasse.

| Classe | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Tissu** | Tisserand + Cordonnier | 1× Tissu · 1× Pigment · 1× Fil métallique · 1× Semelle de cuir | Adepte · 30 s · cadence courte |
| **Cuir** | Tanneur → Maroquinier → **Cordonnier** | 3× Cuir tanné · 2× Fil métallique · 1× Boucle · 2× Semelles de cuir | Adepte · 50 s · coupe précise + assemblage tige/semelle |
| **Mailles** | Forgeron + Cordonnier | 3× Fil métallique · 1× Lingot · 2× Cuir · 1× Semelle · 1× Charbon | Adepte · 70 s · tressage anneaux fins + montage semelle |
| **Plate** | Forgeron + Armurier + Cordonnier | 2× Lingot · 1× Alliage · 1× Cuir · 1× Semelle · 2× Charbon | **Expert** · 100 s · timing température + ferrage semelle |
| **Spécial-Exotique** | Joaillier / Sertisseur | Variable (plumes, écailles) | **Maître** 🔒 · 130 s · rituel |

> [!note] Métier "Cordonnier"
> Cordonnier = sous-spécialité du Maroquinier ([[Métiers - Maroquinier]]) ou métier dédié — à arbitrer en P3 [[Crafts]].

---

## 7. Variants cosmiques

10 variants identiques [[Cuirasse#7. Variants cosmiques (10 par ère)]]. Effets adaptés Pieds :

| Variant | Effet propre Bottes |
|---|---|
| **Shadow** | Pas d'ombre · −40 % bruit (cumul Cuir Shadow → ~−60 % bruit total T6) |
| **Spectral** | Phase à travers pièges 1× par combat |
| **Frost** | Glace permanente sous pieds · ne glisse pas sur sols mouillés/gelés |
| **Verdoyant** | +5 % mvt en zone naturelle · plantes poussent dans les empreintes (cosmétique) |
| **Brulé** | Pas de feu · 2 dégâts feu/s à ennemi corps à corps adjacent |
| **Pourpre** | Empreintes brouillées · ennemis ne traquent pas le porteur |
| **Doré** | Halo · révèle pièges au sol dans 5 m + lévitation cosmétique 5 cm |
| **Brisé** | Aléatoire · pas peut téléporter le joueur 1 m aléatoirement (rare bug ludique) |
| **Onirique** | Confusion · ennemis ratent leur premier coup |
| **Vénérable** | +1 slot affixe |

Disponibilité par ère : [[Cuirasse]].

---

## 8. Exemples de signatures (PHASE 4 stub)

- **Bottes du Marcheur d'Ombre** (Cuir T6 Shadow, **Ilthara**) — *« Pas silencieux et invisibilité brève. »* Affixe : invisibilité 3 s sur sprint (cooldown 60 s) · −50 % bruit total.
- **Solerets du Premier Veilleur** (Plate T6, **Astravia**) — Affixe : immunité knockdown totale · ne peut être déplacé contre sa volonté.
- **Chausses druidiques d'Onara** (Tissu T5 Verdoyant, **Onara**) — Affixe : +15 % mvt forêt · 1 régen HP/s en zone naturelle.
- **Bottes de la Veuve** (Cuir T5 Doré, **Galenor**) — Affixe : pas qui guérit · +5 % efficacité soins par seconde de marche.

> [!todo] Phase 4 : 2-3 par grand pays × 12 continents.

---

## 9. Sets et synergies

Voir [[Cuirasse#9. Sets et synergies (question ouverte)]] — **`[REFONTE-NEEDED]`** cohérent avec Cuirasse.

Synergies émergentes :
- **Bottes Cuir Shadow + Pantalon Cuir Shadow + Cuirasse Cuir Shadow + Capuche Cuir Shadow** : ninja max
- **Solerets Plate + Cuissardes Plate + Cuirasse Plate** : roc inébranlable, mvt minimum

---

## 10. Décisions ouvertes

- ⚠️ **Cordonnier comme métier dédié** : sous-spé Maroquinier ou métier propre ? → P3 [[Crafts]].
- ⚠️ **Plafond bonus mvt** : un Cuir T6 + variant Verdoyant + affixe *Foulée allongée* + Sprint pourrait dépasser +30 % mvt — équilibrer ? → playtest.
- ⚠️ **Saut Plate -20 %** affixe Solerets enracinés : design accepte que le Tank ne saute pas ? → confirmer.
- ⚠️ Variants culturels (Alkaran/Onara/Astravia/Ilthara) → P4.

---

*Liens : [[Items/Index\|← Index Items]] · [[Cuirasse]] · [[Catégories d'Items]] · [[Crafts]] · [[Personnage]] · [[Combat]]*
