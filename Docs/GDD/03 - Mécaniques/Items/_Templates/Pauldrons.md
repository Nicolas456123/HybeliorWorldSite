---
tags: [item, archétype, armure, équipement, pauldrons, slot-épaules]
type: archetype
category: Équipement
subcategory: Armure
slot: Épaules
classes: [Tissu, Cuir, Mailles, Plate, Spécial-Exotique]
source: Fabriqué
mastery: [Tissage, Tannage, Forge, Joaillerie]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, decision-set-bonuses, integration-slot-cuir-tissu]
ratio_vs_cuirasse: 15-20%
---

# 🪶 Pauldrons — Archétype slot Épaules

> Slot Épaules. Suit le pattern canonique [[Cuirasse]] (§10) avec un ratio défense **15-20 %** vs Cuirasse. Spécialité : résistance stagger latéral + parade des coups d'épaules.
>
> Termes par classe : **Pauldrons** (Plate), **Espauliers** (Mailles), **Spallières** (Cuir), **Mantelet épaule** (Tissu, surtout cosmétique), variable (Spécial). En **Tissu et Cuir**, les pauldrons sont souvent **intégrés à la cuirasse** plutôt que slot distinct.

---

## 1. Vue d'ensemble

Le slot Épaules représente :

- **5-7 %** du total défense (petite surface)
- Le **bouclier latéral** : intercepte coups venant de côté ou en plongée (charge ennemie)
- Bonus **stat brute spécialisé** : Vigueur défense, résistance stagger
- **Cas particulier** : pour les classes **Tissu** et **Cuir**, les pauldrons sont fréquemment **intégrés** à la pièce de torse (renforts d'épaules de la robe ou de la tunique). Le slot est alors **optionnel/inactif** — le joueur peut équiper un pauldron Cuir/Tissu indépendant si désiré, mais beaucoup de cuirasses légères incluent déjà la couverture épaule.

> [!note] Slot optionnel pour armures légères
> En lore et en gameplay : Tissu et Cuir **n'exigent pas** un pauldron séparé. La cuirasse Tissu/Cuir inclut généralement les épaules. Le joueur peut **ajouter** un pauldron Cuir/Tissu pour bonus supplémentaires (cumul autorisé). En revanche, **Mailles et Plate** ont des pauldrons distincts par construction (assemblage articulé impossible à intégrer).

---

## 2. Les 5 classes — déclinaisons

| Classe | Nom canonique | Profil | Stats brutes mises en valeur | Spécificité |
|---|---|---|---|---|
| **Tissu** | Mantelet épaule (souvent décoratif) | Mage / Lié | **Esprit**, broderie focus | Optionnel ; +5 % efficacité Voie si présent |
| **Cuir** | Spallières | Éclaireur | **Vivacité**, **Endurance** | Optionnel ; +parade légère |
| **Mailles** | Espauliers | Soldat | **Vigueur**, résistance stagger | Slot obligatoire |
| **Plate** | Pauldrons | Tank / Chevalier | **Vigueur**, stagger | Slot obligatoire ; **+aggro latéral** |
| **Spécial-Exotique** | Carapace d'épaule | Build atypique | Variable | Souvent issu de défense de créature (épines, plaques) |

> [!note] Variants culturels
> - **Pauldrons à pointes des Cendrés** (Plate, Cendara) : pointes saillantes, +thorns latéral
> - **Espauliers à plumes** (Mailles, Galenor) : plumes héraldiques, neutre stat mais cosmétique fort
> - **Spallières d'écaille** (Cuir + écaille, Onara) : variant aquatique semi-Spécial

---

## 3. Stats par tier × classe — table-pivot

> Multiplicateurs hérités. Baseline ajustée à **17 % de la cuirasse** (milieu fourchette 15-20 %).

### Table complète — Pauldrons 6 tiers × 5 classes

> Format : **DéfPhys / DéfMag / Résist stagger latéral / Bonus stat brute / Slots affixes**

| Tier | **Tissu** (Mantelet) | **Cuir** (Spallières) | **Mailles** (Espauliers) | **Plate** (Pauldrons) | **Spécial-Exotique** |
|---|---|---|---|---|---|
| **T1** Commun | 1 / 4 / 0 % / +2 Mana / 1 | 3 / 2 / +3 % / +3 Stam / 1 | 5 / 3 / +8 % / +3 HP / 1 | 8 / 2 / +12 % / +5 HP / 1 | 5 / 5 / var / +affixe / 1 |
| **T2** Façonné | 2 / 5 / 0 % / +3 Mana / 1 | 4 / 3 / +4 % / +4 Stam / 2 | 7 / 4 / +10 % / +4 HP / 2 | 10 / 2 / +14 % / +7 HP / 2 | 6 / 6 / var / +affixe / 2 |
| **T3** Œuvré | 2 / 7 / 0 % / +4 Mana · +5 % effi. Voie / 2 | 5 / 3 / +5 % / +5 Stam · +1 Vivacité / 2 | 9 / 5 / +12 % / +6 HP · +1 Vigueur / 2 | 13 / 3 / +18 % / +9 HP · +5 % parade / 2 | 8 / 8 / var / +affixe / 2 |
| **T4** Magistral | 3 / 9 / 0 % / +5 Mana · +10 % effi. Voie / 2 | 7 / 4 / +6 % / +6 Stam · +2 Vivacité · +3 % esquive / 3 | 11 / 6 / +14 % / +8 HP · +2 Vigueur · +3 % parade / 3 | 17 / 4 / +22 % / +11 HP · +8 % parade · +5 % aggro / 3 | 11 / 11 / var / +2 affixes / 3 |
| **T5** Légendaire | 4 / 11 / 0 % / +6 Mana · +15 % effi. Voie / 3 | 9 / 6 / +8 % / +8 Stam · +3 Vivacité · +5 % esquive / 3 | 14 / 8 / +16 % / +10 HP · +3 Vigueur · +5 % parade / 3 | 21 / 5 / +25 % / +14 HP · +12 % parade · +8 % aggro / 3 | 14 / 14 / var / +2 affixes / 3 |
| **T6** Mythique | 5 / 15 / 0 % / +8 Mana · +20 % effi. Voie · *signature* / 3+1 | 11 / 7 / +10 % / +10 Stam · +5 Vivacité · +8 % esquive · *signature* / 3+1 | 18 / 10 / +18 % / +13 HP · +5 Vigueur · +7 % parade · *signature* / 3+1 | 27 / 7 / +30 % / +18 HP · +15 % parade · +12 % aggro · *signature* / 3+1 | 18 / 18 / var · *signature* / 3+1 |

> [!info] Lecture
> Pauldrons Plate T6 = **+30 %** résistance stagger latéral. Combinés avec affixe Plate *Stabilité* sur Cuirasse → personnage **inébranlable** face aux charges latérales.

---

## 4. Calcul de défense — rappel

Formules canoniques de [[Cuirasse#4. Calcul de défense effective]]. Les multiplicateurs de classe restent identiques.

> [!note] Stagger latéral
> La résistance stagger des pauldrons s'applique **spécifiquement aux coups venant de côté** (angle > 45° du regard). Stagger frontal/dos relèvent du Heaume / Cuirasse. → mécanique tactique : positionner le joueur face à la menace.

---

## 5. Affixes spécifiques aux Pauldrons

### Affixes propres au slot Épaules

| Affixe | Effet T3 |
|---|---|
| **Pointes d'épaules** | 3 dégâts perforants à tout ennemi qui tente une saisie (grab) |
| **Aile de soutien** | +5 % portée Stamina sprint |
| **Cape ondulante** | +3 % esquive contre attaques à distance (par derrière uniquement) |
| **Charge accentuée** | +5 % dégâts charge d'épaule |
| **Stabilité latérale** | Immunité knockback latéral (si attaque < 2× Vigueur source) |

### Affixes par classe (propres Pauldrons)

| Classe | Affixe |
|---|---|
| **Tissu** | *Voile flottant* — −5 % chance d'être pris pour cible primaire (les sorts AoE ratent +) |
| **Cuir** | *Spallières moelleuses* — +5 % discrétion sprint |
| **Mailles** | *Anneaux articulés* — +3 % parade tenue |
| **Plate** | *Pauldrons-bouclier* — bloque les attaques venant directement de côté (1 attaque/10 s) |
| **Spécial-Exotique** | *Plaque dorsale étendue* — étend la défense au haut du dos (rare) |

---

## 6. Recettes — Tier 3 (Œuvré) référence

Pattern hérité de [[Cuirasse#6. Recettes par classe — Tier 3 (Œuvré) référence]]. Intrants ~30-40 % vs Cuirasse.

| Classe | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Tissu** | Tisserand + Brodeur | 1× Tissu · 1× Pigment · 2× Fil métallique · 1× Cristal mineur | Adepte · 30 s · cadence courte |
| **Cuir** | Tanneur → Maroquinier | 2× Cuir tanné · 1× Fil métallique · 2× Boucles · 1× Pigment | Adepte · 50 s · coupe précise |
| **Mailles** | Forgeron | 3× Fil métallique · 1× Lingot · 1× Cuir (sangles) · 1× Charbon | Adepte · 70 s · tressage articulé (séquence ~30 anneaux + jointures) |
| **Plate** | Forgeron + Armurier | 2× Lingot · 1× Alliage · 1× Cuir · 2× Charbon · 1× Eau trempe | **Expert** · 100 s · timing température (3 phases : forge, articulation, trempe) |
| **Spécial-Exotique** | Joaillier / Sertisseur | Variable (carapace, écaille, etc.) · 1× Cristal aligné | **Maître** 🔒 · 140 s · rituel court |

---

## 7. Variants cosmiques

10 variants identiques à [[Cuirasse#7. Variants cosmiques (10 par ère)]]. Effets adaptés au slot Épaules :

| Variant | Effet propre Pauldrons |
|---|---|
| **Shadow** | Cape ombrale étend l'invisibilité 1 s additionnelle quand cumul avec Cuir Shadow |
| **Spectral** | Pauldrons translucides absorbent 1 attaque latérale par combat (phase 0.3 s) |
| **Frost** | Givre permanent · ralentit les ennemis qui touchent les épaules de −10 % 2 s |
| **Verdoyant** | Mousse vivante · +1 régen HP/s en zone naturelle |
| **Brulé** | Braises · 5 dégâts feu/s sur ennemi en saisie |
| **Pourpre** | Brouillard ; ennemis ratent saisies latérales |
| **Doré** | Halo épaules ; +10 % résistance contre coups par derrière |
| **Brisé** | Aléatoire — épaules glitchent, position ennemie incertaine |
| **Onirique** | Couleur ondulante · 1× par combat pacifie un ennemi mineur 2 s |
| **Vénérable** | +1 slot affixe |

Disponibilité par ère : voir [[Cuirasse]].

---

## 8. Exemples de signatures (PHASE 4 stub)

- **Pauldrons à pointes du Cendré** (Plate T5 Brulé, **Cendara**) — *« Les Légionnaires de Cendre les forgeaient dans la cendre du volcan endormi. »* Affixe : 8 dégâts feu sur attaquant mêlée.
- **Espauliers de la Tour-Mère** (Mailles T4, **Astravia**) — *« Insignes de la garde rapprochée. »* Affixe : +20 % aggro latéral · +5 % parade.
- **Spallières du Marcheur d'Ombre** (Cuir T5 Shadow, **Ilthara**) — *« Cape d'épaule qui s'effiloche en fumée. »* Affixe : +1 s invisibilité sur sprint.

> [!todo] Phase 4 : 2-3 par grand pays × 13 continents.

---

## 9. Sets et synergies

Voir [[Cuirasse#9. Sets et synergies (question ouverte)]] — **`[REFONTE-NEEDED]`** cohérent avec Cuirasse.

Synergies émergentes :
- **Pauldrons Plate Stabilité + Cuirasse Plate Stabilité** : immunité knockback robuste
- **Spallières Cuir Shadow + Cuirasse Cuir Shadow + Capuche Cuir Shadow** : 3 procs invisibilité = playstyle ninja

---

## 10. Décisions ouvertes

- ⚠️ **Slot optionnel pour Tissu/Cuir** : confirmer en playtest. Si confirmé, prévoir **flag UI** "épaules intégrées à la cuirasse" et bonus de set inchangé.
- ⚠️ **Stagger latéral séparé** stagger frontal : exige détection d'angle d'attaque côté code → vérifier faisabilité.
- ⚠️ **Charge d'épaule** comme attaque dédiée (avec affixe *Charge accentuée*) : nécessite mécanique de combat. Lien [[Combat]].
- ⚠️ Variants culturels (Cendrés, Galenor, Onara) : skin pur ou bonus stat ? → P4.

---

*Liens : [[Items - Index\|← Index Items]] · [[Cuirasse]] · [[Catégories d'Items]] · [[Crafts]] · [[Combat]]*
