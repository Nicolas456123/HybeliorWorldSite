---
tags: [item, archétype, armure, équipement, gantelets, slot-mains]
type: archetype
category: Équipement
subcategory: Armure
slot: Mains
classes: [Tissu, Cuir, Mailles, Plate, Spécial-Exotique]
source: Fabriqué
mastery: [Tissage, Tannage, Forge, Joaillerie]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, decision-set-bonuses, plate-degats-contondants]
ratio_vs_cuirasse: 10-12%
---

# ✊ Gantelets — Archétype slot Mains

> Slot Mains. Suit le pattern canonique [[Cuirasse]] (§10) avec un ratio défense **10-12 %** vs Cuirasse. Spécialité : bonus offensif (dégâts mêlée, vol de vie, contondants Plate) + dextérité.
>
> Termes par classe : **Gantelets** (Plate, lourdes plaques métal), **Gants à mailles** (Mailles), **Gants de cuir** (Cuir), **Mitaines / Manchettes** (Tissu), variable (Spécial).

---

## 1. Vue d'ensemble

Le slot Mains représente :

- **3-5 %** du total défense (très petite surface)
- Le **support offensif majeur** : bonus dégâts mêlée, vol de vie, dégâts contondants Plate
- Bonus **stat brute spécialisé** : Vigueur (force des coups), Acuité (précision frappe)
- L'**outil d'interaction** : ouverture, port, manipulation craft

> [!note] Gantelets Plate = arme accessoire
> Au tier élevé, des **Gantelets Plate** infligent des **dégâts contondants** propres en attaque mains nues — environ équivalents à une arme une-main T1. La Plate transforme le poing en arme.

---

## 2. Les 5 classes — déclinaisons

| Classe | Nom canonique | Profil | Stats brutes | Spécificité |
|---|---|---|---|---|
| **Tissu** | Mitaines brodées | Mage / Lié | **Esprit**, focus | +efficacité Voie ; gestes facilités |
| **Cuir** | Gants de cuir | Voleur / Archer / Artisan | **Vivacité**, **Acuité** | +crit, +crochetage, +précision |
| **Mailles** | Gants à mailles | Soldat | **Vigueur** | +dégâts mêlée modérés, polyvalent |
| **Plate** | Gantelets de plate | Tank / Brute | **Vigueur** | +dégâts contondants poings · −dextérité fine (−10 % vitesse craft) |
| **Spécial-Exotique** | Griffes / Serres | Endgame | Variable | Souvent infligent dégâts spéciaux (ex. griffes draconiques = +feu) |

> [!note] Variants culturels
> - **Gantelets de combat de Cendara** (Plate, Cendara) : surdimensionnés, +bonus contondants
> - **Mitaines de tisserand** (Tissu artisan, Onara) : +précision craft Tissage

---

## 3. Stats par tier × classe — table-pivot

> Baseline ajustée à **11 % de la cuirasse** (milieu fourchette 10-12 %).

### Table complète — Gantelets 6 tiers × 5 classes

> Format : **DéfPhys / DéfMag / Bonus offensif / Bonus stat brute / Slots affixes**

| Tier | **Tissu** (Mitaines) | **Cuir** (Gants) | **Mailles** (Gants) | **Plate** (Gantelets) | **Spécial-Exotique** |
|---|---|---|---|---|---|
| **T1** Commun | 1 / 2 / 0 / +1 Mana / 1 | 2 / 1 / +1 % crit / +2 Stam / 1 | 3 / 2 / +2 % dégâts mêlée / +2 HP / 1 | 5 / 1 / +5 contondants poing / +3 HP / 1 | 3 / 3 / var / +affixe / 1 |
| **T2** Façonné | 1 / 3 / 0 / +2 Mana / 1 | 3 / 2 / +2 % crit / +3 Stam · +1 Acuité / 1 | 4 / 2 / +3 % dégâts mêlée / +3 HP / 2 | 7 / 2 / +7 contondants / +5 HP / 2 | 4 / 4 / var / +affixe / 2 |
| **T3** Œuvré | 2 / 5 / 0 / +3 Mana · +5 % effi. Voie / 2 | 4 / 2 / +3 % crit · +5 % crochetage / +4 Stam · +2 Acuité / 2 | 5 / 3 / +5 % dégâts mêlée / +4 HP · +1 Vigueur / 2 | 9 / 2 / +10 contondants / +6 HP · +5 % bloc / 2 | 5 / 5 / var / +affixe / 2 |
| **T4** Magistral | 2 / 6 / 0 / +4 Mana · +10 % effi. Voie · −2 % temps cast / 2 | 5 / 3 / +5 % crit · +8 % crochetage · +1 % vol vie / 3 | 7 / 4 / +7 % dégâts mêlée · +2 % vol vie / +5 HP · +2 Vigueur / 3 | 11 / 3 / +14 contondants · +3 % vol vie / +8 HP · +8 % bloc / 3 | 7 / 7 / var / +2 affixes / 3 |
| **T5** Légendaire | 3 / 8 / 0 / +5 Mana · +15 % effi. Voie · −5 % temps cast / 3 | 7 / 4 / +7 % crit · +12 % crochetage · +2 % vol vie / 3 | 9 / 5 / +10 % dégâts mêlée · +3 % vol vie / +7 HP · +3 Vigueur / 3 | 14 / 4 / +18 contondants · +5 % vol vie / +11 HP · +12 % bloc / 3 | 9 / 9 / var / +2 affixes / 3 |
| **T6** Mythique | 4 / 10 / 0 / +6 Mana · +20 % effi. Voie · *signature* / 3+1 | 9 / 5 / +10 % crit · +15 % crochetage · +3 % vol vie · *signature* / 3+1 | 12 / 7 / +13 % dégâts mêlée · +5 % vol vie · *signature* / 3+1 | 18 / 5 / +24 contondants · +8 % vol vie · *signature* / 3+1 | 12 / 12 / var · *signature* / 3+1 |

> [!info] Lecture
> Gantelets Plate T6 = **+24 dégâts contondants** sur attaque poing nu — équivalent à un gourdin T2-T3. Combinés à Vigueur 100 → poings = arme viable au corps à corps.

---

## 4. Calcul de défense — rappel

Formules de [[Cuirasse#4. Calcul de défense effective]] inchangées.

> [!note] Dégâts contondants poing Plate
> Les dégâts contondants des Gantelets Plate s'**ajoutent à l'attaque mêlée** si le joueur attaque sans arme **ou** sont déclenchés par une animation dédiée "coup de poing" (à arbitrer [[Combat]]).

---

## 5. Affixes spécifiques aux Gantelets

| Affixe (universel slot) | Effet T3 |
|---|---|
| **Poigne ferme** | +10 % résistance désarmement |
| **Vol de vie** | +1 % HP rendus par coup donné |
| **Précision frappe** | +3 % chance critique mêlée |
| **Crochetage** | +10 % réussite crochetage serrures |
| **Manipulation rapide** | −10 % temps utilisation potions |

### Affixes par classe (propres Gantelets)

| Classe | Affixe |
|---|---|
| **Tissu** | *Mitaine d'incantation* — −5 % temps incantation toutes Voies |
| **Cuir** | *Doigts agiles* — +20 % réussite crochetage / pickpocket |
| **Mailles** | *Coup ferré* — +5 % dégâts contondants armes une-main |
| **Plate** | *Poing de fer* — coup de poing inflige stagger léger |
| **Spécial-Exotique** | *Griffes* — coup de poing inflige saignement (3/s 5 s) |

---

## 6. Recettes — Tier 3 (Œuvré) référence

Intrants ~20-25 % vs Cuirasse.

| Classe | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Tissu** | Tisserand + Brodeur | 1× Tissu · 1× Pigment · 1× Fil métallique | Adepte · 25 s · cadence courte |
| **Cuir** | Tanneur → Maroquinier | 2× Cuir tanné · 1× Fil de cuir · 1× Boucle | Adepte · 40 s · coupe doigts (5 patrons fins) |
| **Mailles** | Forgeron | 2× Fil métallique · 1× Cuir (paume) · 1× Charbon | Adepte · 55 s · tressage anneaux fins |
| **Plate** | Forgeron + Armurier | 2× Lingot · 1× Alliage (articulations) · 1× Cuir · 2× Charbon | **Expert** · 80 s · **soudure** (assemblage articulations digitales) |
| **Spécial-Exotique** | Joaillier / Sertisseur | Variable (griffe, écaille, etc.) | **Maître** 🔒 · 110 s · rituel |

---

## 7. Variants cosmiques

10 variants identiques [[Cuirasse#7. Variants cosmiques (10 par ère)]]. Effets adaptés Mains :

| Variant | Effet propre Gantelets |
|---|---|
| **Shadow** | Mains noires · +5 % crit Ombre infligé |
| **Spectral** | Mains translucides · 5 % chance traverser bouclier ennemi |
| **Frost** | Givre · poing ralentit la cible touchée −10 % 2 s |
| **Verdoyant** | Mousse · +1 régen Stam/s en zone naturelle |
| **Brulé** | Braises · poing inflige +3 dégâts feu |
| **Pourpre** | Brouillard · ennemis ratent les contre-attaques mêlée +5 % |
| **Doré** | Halo · +10 % efficacité soins lancés à mains |
| **Brisé** | Aléatoire · poing inflige 0-200 % dégâts |
| **Onirique** | Couleurs · 1× par combat poing endort 1 s |
| **Vénérable** | +1 slot affixe |

Disponibilité par ère : [[Cuirasse]].

---

## 8. Exemples de signatures (PHASE 4 stub)

- **Gantelets de la Brute Cendrée** (Plate T5 Brulé, **Cendara**) — *« Surdimensionnés, gauche aussi grand qu'un casque. »* Affixe : +30 contondants · stagger garanti sur ennemi non-tank.
- **Mitaines du Maître-Brodeur** (Tissu T4, **Onara**) — *« Cousues par le Maître-Brodeur lui-même. »* Affixe : +15 % précision craft Tissage · −10 % temps cast.
- **Gants du Voleur de Galenor** (Cuir T6 Shadow, **Galenor**) — Affixe : +30 % crochetage · invisibilité 2 s sur pickpocket réussi.

> [!todo] Phase 4 : 2-3 par grand pays × 13 continents.

---

## 9. Sets et synergies

Voir [[Cuirasse#9. Sets et synergies (question ouverte)]] — **`[REFONTE-NEEDED]`** cohérent avec Cuirasse.

Synergies émergentes :
- **Gantelets Plate + Brassards Plate + Cuirasse Plate** : tank brute, bonus contondants stack
- **Gants Cuir + Brassards Cuir + arc** : sniper crit-build

---

## 10. Décisions ouvertes

- ⚠️ **Mécanique poing nu** : animation dédiée ou simple ajout dégâts à l'attaque sans arme ? → [[Combat]] P3.
- ⚠️ **Pénalité dextérité Plate** (−10 % vitesse craft) : applique-t-elle au crochetage et à toutes les manipulations ? → P3.
- ⚠️ **Crochetage** comme stat propre vs Acuité brute : système distinct ou simple bonus % ? → P3 [[Compétences]].
- ⚠️ Variants culturels (Cendara surdimensionnés, Onara craft) → P4.

---

*Liens : [[Items - Index\|← Index Items]] · [[Cuirasse]] · [[Catégories d'Items]] · [[Crafts]] · [[Combat]]*
