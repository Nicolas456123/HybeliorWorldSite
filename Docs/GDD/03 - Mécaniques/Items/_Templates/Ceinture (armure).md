---
tags: [item, archétype, armure, équipement, ceinture-armure, slot-taille]
type: archetype
category: Équipement
subcategory: Armure
slot: Taille
classes: [Tissu, Cuir, Mailles, Plate, Spécial-Exotique]
source: Fabriqué
mastery: [Tissage, Tannage, Forge, Joaillerie]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, decision-set-bonuses, distinction-ceinture-accessoire]
ratio_vs_cuirasse: 8-10%
distinction:
  - "Ceinture (armure) ≠ Ceinture-accessoire (autre archétype). Cette ceinture est PIÈCE D'ARMURE intégrée à un set, pas un accessoire focus stat."
---

# 🪢 Ceinture (armure) — Archétype slot Taille

> Slot Taille en tant que **pièce d'armure** d'un set complet. Suit le pattern canonique [[Cuirasse]] (§10) avec un ratio défense **8-10 %** vs Cuirasse — le **plus petit** des slots d'armure. Spécialité : capacité de port, endurance, support utilitaire (poches, fioles).
>
> Termes par classe : **Ceinturon de plate** (Plate), **Ceinture à mailles** (Mailles), **Ceinturon de cuir** (Cuir), **Cordon brodé / Sash** (Tissu), variable (Spécial).

> [!important] Distinction Ceinture-armure vs Ceinture-accessoire
> Ce fichier traite de la **Ceinture pièce d'armure** — fait partie d'un set d'armure, matériaux d'armure (cuir/mailles/plate), couplée stylistiquement au reste du set, contribue à la défense globale.
>
> La **Ceinture-accessoire** (archétype distinct, à produire séparément) est un slot d'**accessoire** plus petit, focus stat brute pure (pas de matériau armure), parallèle aux Anneau / Amulette. **Ne pas confondre.**

---

## 1. Vue d'ensemble

Le slot Taille (armure) représente :

- **2-3 %** du total défense (plus petit des slots armure)
- Le **support utilitaire** : capacité de port, slots de fioles, fixation des Bourses
- Bonus **stat brute spécialisé** : Endurance (Stamina prolongée), capacité de port
- Le **vecteur d'identité visuelle minor** (boucle ouvragée, accroche-cape, médaillon central)

---

## 2. Les 5 classes — déclinaisons

| Classe | Nom canonique | Profil | Stats brutes | Spécificité |
|---|---|---|---|---|
| **Tissu** | Cordon / Sash brodé | Mage / Lié | **Esprit**, focus | +Mana, +slots fioles tissus |
| **Cuir** | Ceinturon de cuir | Aventurier polyvalent | **Endurance**, **Vivacité** | +slots fioles, +capacité port |
| **Mailles** | Ceinture à mailles | Soldat | **Endurance**, **Vigueur** | +HP, +parade hanche |
| **Plate** | Ceinturon de plate | Tank | **Vigueur**, **Endurance** | +HP, +capacité port max |
| **Spécial-Exotique** | Ceinture exotique | Endgame | Variable | Bonus créature (ex. anneau d'os = +Esprit) |

> [!note] Variants culturels
> - **Sash brodé d'Astravia** (Tissu, Astravia) : couleur Tour-Mère, +Mémoire
> - **Ceinturon de chasse galenor** (Cuir, Galenor) : 2 slots fioles supplémentaires

---

## 3. Stats par tier × classe — table-pivot

> Baseline à **9 % de la cuirasse** (milieu fourchette 8-10 %).

### Table complète — Ceinture (armure) 6 tiers × 5 classes

> Format : **DéfPhys / DéfMag / Capacité port supplémentaire / Bonus stat brute / Slots affixes**

| Tier | **Tissu** (Sash) | **Cuir** (Ceinturon) | **Mailles** (Ceinture) | **Plate** (Ceinturon) | **Spécial-Exotique** |
|---|---|---|---|---|---|
| **T1** Commun | 1 / 2 / +5 kg / +1 Mana / 1 | 2 / 1 / +8 kg · 1 slot fiole / +2 Stam / 1 | 3 / 1 / +10 kg / +2 HP / 1 | 4 / 1 / +12 kg / +3 HP / 1 | 3 / 3 / var / +affixe / 1 |
| **T2** Façonné | 1 / 3 / +7 kg / +2 Mana / 1 | 2 / 2 / +10 kg · 1 slot / +2 Stam · +1 Endurance / 1 | 4 / 2 / +13 kg / +3 HP / 1 | 5 / 1 / +16 kg / +4 HP / 1 | 4 / 4 / var / +affixe / 1 |
| **T3** Œuvré | 2 / 4 / +10 kg / +3 Mana · +5 % effi. Voie / 2 | 3 / 2 / +14 kg · 2 slots / +4 Stam · +2 Endurance / 2 | 5 / 3 / +17 kg / +4 HP · +1 Vigueur / 2 | 7 / 2 / +21 kg / +6 HP · +5 % parade hanche / 2 | 5 / 5 / var / +affixe / 2 |
| **T4** Magistral | 2 / 6 / +13 kg / +4 Mana · +10 % effi. Voie / 2 | 4 / 3 / +18 kg · 2 slots · +3 % esquive / +5 Stam · +3 Endurance / 2 | 7 / 4 / +22 kg / +5 HP · +2 Vigueur · +3 % parade / 2 | 9 / 3 / +27 kg / +8 HP · +8 % parade / 2 | 7 / 7 / var / +2 affixes / 2 |
| **T5** Légendaire | 3 / 7 / +17 kg / +5 Mana · +15 % effi. Voie / 2 | 5 / 4 / +24 kg · 3 slots · +5 % esquive / +7 Stam · +5 Endurance / 2 | 8 / 5 / +28 kg / +7 HP · +3 Vigueur / 2 | 11 / 4 / +35 kg / +10 HP · +12 % parade / 2 | 8 / 8 / var / +2 affixes / 2 |
| **T6** Mythique | 4 / 9 / +22 kg / +6 Mana · +20 % effi. Voie · *signature* / 2+1 | 7 / 5 / +31 kg · 3 slots · +8 % esquive · *signature* / 2+1 | 11 / 7 / +36 kg / +9 HP · +5 Vigueur · *signature* / 2+1 | 14 / 5 / +45 kg / +13 HP · +15 % parade · *signature* / 2+1 | 11 / 11 / var · *signature* / 2+1 |

> [!info] Lecture
> Ceinture Plate T6 = **+45 kg** capacité port + **+13 HP** + **+15 % parade hanche**. Ceinture Cuir T6 = **+31 kg** + **3 slots fioles** (combat-ready alchemy).

---

## 4. Calcul de défense — rappel

Formules de [[Cuirasse#4. Calcul de défense effective]] inchangées.

> [!note] Capacité de port
> La capacité de port supplémentaire s'**ajoute à l'inventaire** ou réduit la pénalité d'encombrement. Synergie forte avec affixe Cuirasse *Capacité de port*. Plafond de port total à arbitrer ([[Personnage]] / [[Inventaire]]).

> [!note] Slots fioles (combat-ready)
> Les **slots fioles** permettent une utilisation **rapide de potions en combat** sans pause d'inventaire. 1 slot = 1 potion accessible en raccourci. Mécanique d'accès rapide : à confirmer [[Combat]].

---

## 5. Affixes spécifiques aux Ceintures (armure)

| Affixe (universel slot) | Effet T3 |
|---|---|
| **Capacité étendue** | +15 kg port supplémentaire |
| **Slot fiole supplémentaire** | +1 slot fiole accessible combat |
| **Bourse profonde** | +5 % chance de loot supplémentaire (loot tables) |
| **Endurance accrue** | +5 % Stamina max |
| **Stabilité hanche** | +5 % résistance knockback frontal |

### Affixes par classe (propres Ceinture)

| Classe | Affixe |
|---|---|
| **Tissu** | *Cordon de focus* — +5 % efficacité Voie additionnelle |
| **Cuir** | *Sangle d'arquebusier* — +1 munition récupérable par combat (arc/arbalète) |
| **Mailles** | *Ceinture renforcée* — +5 HP additionnels |
| **Plate** | *Ceinturon de port* — +20 kg additionnels (cumulable avec affixe universel) |
| **Spécial-Exotique** | *Anneau ossifié* — +1 affixe créature signature |

---

## 6. Recettes — Tier 3 (Œuvré) référence

Intrants ~15-20 % vs Cuirasse — **plus petite** pièce.

| Classe | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Tissu** | Tisserand + Brodeur | 1× Tissu · 1× Pigment · 2× Fil métallique | Adepte · 25 s · cadence courte |
| **Cuir** | Tanneur → Maroquinier | 2× Cuir tanné · 1× Boucle de fer · 1× Fil de cuir | Adepte · 35 s · coupe ceinturon + boucle |
| **Mailles** | Forgeron | 2× Fil métallique · 1× Lingot (boucle) · 1× Cuir (sangle interne) | Adepte · 50 s · tressage anneaux + montage boucle |
| **Plate** | Forgeron + Armurier | 1× Lingot (plaque centrale) · 1× Alliage (boucle) · 1× Cuir · 1× Charbon | **Expert** · 70 s · timing température (court) + sertissage boucle |
| **Spécial-Exotique** | Joaillier / Sertisseur | Variable (anneau d'os, écaille, etc.) | **Maître** 🔒 · 100 s · rituel |

---

## 7. Variants cosmiques

10 variants identiques [[Cuirasse#7. Variants cosmiques (10 par ère)]]. Effets adaptés Taille :

| Variant | Effet propre Ceinture |
|---|---|
| **Shadow** | Boucle d'ombre · +1 slot fiole "potion d'invisibilité" rapide |
| **Spectral** | Translucide · objets transportés peuvent traverser barrières (rare proc) |
| **Frost** | Givre · les fioles ne se brisent pas par chute |
| **Verdoyant** | Vrille · 1 plante/ressource cueillie passivement par jour |
| **Brulé** | Braises · résiste à la combustion accidentelle de fioles inflammables |
| **Pourpre** | Brouillard · −5 % chances que les ennemis remarquent objets transportés (vol caché) |
| **Doré** | Halo · +5 % efficacité potions consommées |
| **Brisé** | Aléatoire · slot fiole ouvre une potion aléatoire de l'inventaire en combat |
| **Onirique** | Couleurs · 1 potion/jour offre un effet rêve aléatoire bonus |
| **Vénérable** | +1 slot affixe |

Disponibilité par ère : [[Cuirasse]].

---

## 8. Exemples de signatures (PHASE 4 stub)

- **Ceinturon du Maître-Forgeron de Cendara** (Plate T5, **Cendara**) — *« Boucle frappée du sceau du Maître. »* Affixe : +30 kg · +5 % qualité craft Forge si équipé.
- **Sash de la Tour-Mère** (Tissu T6 Doré, **Astravia**) — *« Couleur or et bleu de la Tour. »* Affixe : +25 % efficacité Voie de Lumière.
- **Ceinturon de chasse galenor** (Cuir T4, **Galenor**) — Affixe : +3 slots fioles + +1 munition récupérée par combat.

> [!todo] Phase 4 : 2-3 par grand pays × 13 continents.

---

## 9. Sets et synergies

Voir [[Cuirasse#9. Sets et synergies (question ouverte)]] — **`[REFONTE-NEEDED]`** cohérent avec Cuirasse.

> [!note] Cumul Ceinture-armure + Ceinture-accessoire
> Si le Game Design autorise les **deux ceintures** simultanément (slot armure Taille + slot accessoire dédié), elles cumulent leurs bonus. Si **un seul slot Taille**, le joueur choisit entre armure (défense + utilitaire) et accessoire (focus stat). → décision design ouverte.

---

## 10. Décisions ouvertes

- ⚠️ **Slot Taille unique vs double** : 1 slot pour les deux ceintures ou slots séparés ? → P3 design.
- ⚠️ **Capacité de port total** : plafond ? mécanique d'encombrement ? → [[Personnage]] / [[Inventaire]].
- ⚠️ **Slots fioles combat** : raccourcis clavier dédiés ? quelles potions y sont éligibles ? → [[Combat]].
- ⚠️ Variants culturels (Astravia/Galenor/Onara) → P4.

---

*Liens : [[Items - Index\|← Index Items]] · [[Cuirasse]] · [[Catégories d'Items]] · [[Crafts]] · [[Personnage]] · [[Combat]]*
