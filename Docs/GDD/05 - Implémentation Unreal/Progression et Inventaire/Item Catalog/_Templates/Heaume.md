---
tags: [item, archétype, armure, équipement, heaume, slot-tête]
type: archetype
category: Équipement
subcategory: Armure
slot: Tête
classes: [Tissu, Cuir, Mailles, Plate, Spécial-Exotique]
source: Fabriqué
mastery: [Tissage, Tannage, Forge, Joaillerie]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, decision-set-bonuses, variants-culturels]
ratio_vs_cuirasse: 30-35%
---

# 🪖 Heaume — Archétype slot Tête

> Slot Tête. Suit le pattern canonique posé par [[Cuirasse]] (§10) avec un ratio de défense de **30-35 %** vs Cuirasse. Surface réduite mais critique : sans heaume, les coups à la tête infligent ×2 dégâts critiques.
>
> Termes par classe : **Heaume** (Plate), **Casque** (Mailles), **Capuche cloutée** (Cuir), **Capuchon / Bandeau** (Tissu), variable (Spécial-Exotique).

---

## 1. Vue d'ensemble

Le slot Tête est le **second slot le plus important** après le Torse. Il représente :

- **12-15 %** du total de défense d'un set complet
- Le **bouclier anti-critique** principal (sans heaume → ×2 dégâts crit reçus)
- Un **support stat brute spécialisé** : Acuité (visée, détection), Mémoire (identification, cooldowns), Conscience (perception périphérique, parade magique)
- Un **vecteur d'identité visuelle secondaire** (silhouette tête = 25 % de la lecture combat)

Pourquoi 5 classes (cf. [[Cuirasse#1. Vue d'ensemble]]) — même justification : 5 progressions parallèles, identité préservée à tous les tiers.

---

## 2. Les 5 classes — déclinaisons

| Classe | Nom canonique | Profil | Stats brutes mises en valeur | Trade-offs |
|---|---|---|---|---|
| **Tissu** | Capuchon / Bandeau du Lié | Mage / Lié — focus magique | **Esprit**, **Mémoire**, **Conscience** | +Mana, +efficacité Voie ; pas de défense crit physique |
| **Cuir** | Capuche cloutée de l'Éclaireur | Éclaireur / Voleur / Archer | **Vivacité**, **Acuité** | +détection, +bonus arc/dague ; défense moyenne |
| **Mailles** | Casque du Soldat | Soldat / Polyvalent | **Vigueur**, **Endurance** | équilibré ; bruit léger |
| **Plate** | Heaume du Chevalier | Tank / Chevalier | **Vigueur** | +résistance crit max ; **−10 % vision périphérique** (champ visuel réduit) |
| **Spécial-Exotique** | Carapace crânienne | Build atypique / Endgame | Variable selon matériau | +1 affixe créature signature |

> [!note] Variants culturels (lore)
> - **Heaume nordique d'Alkaran** (Plate) : grand heaume à cornes, +résistance Glace native
> - **Casque hopliques d'Astravia** (Mailles) : crête latérale, +aggro légère
> - **Capuche druidique d'Onara** (Tissu) : couronne de feuilles tissées, +1 régen Mana en zone naturelle
> - **Bandeau steppique d'Ilthara** (Cuir/Tissu hybride) : bandeau frontal léger, +Acuité

---

## 3. Stats par tier × classe — table-pivot

> Multiplicateurs de tier hérités de [[Cuirasse#3. Stats par tier × classe — la table-pivot canonique]] : ×1.00 / ×1.30 / ×1.70 / ×2.20 / ×2.80 / ×3.60. Baseline ajustée à **32 % de la cuirasse** (milieu de fourchette 30-35 %).

### Baseline T1 (32 % Cuirasse)

| Classe | Défense phys T1 | Défense mag T1 | Pénalité spécifique |
|---|---|---|---|
| Tissu | 3 pts | 8 pts | 0 % mvt · pas de réduction crit |
| Cuir | 6 pts | 4 pts | 0 % mvt · −5 % crit reçus |
| Mailles | 10 pts | 5 pts | −1 % mvt · −15 % crit reçus |
| Plate | 14 pts | 3 pts | −2 % mvt · **−10 % vision périphérique** · −25 % crit reçus |
| Spécial-Exotique | 9 pts | 9 pts | variable |

### Table complète — Heaume 6 tiers × 5 classes

> Format : **DéfPhys / DéfMag / Réduction crit reçus / Bonus stat brute / Slots affixes**

| Tier | **Tissu** (Capuchon) | **Cuir** (Capuche) | **Mailles** (Casque) | **Plate** (Heaume) | **Spécial-Exotique** |
|---|---|---|---|---|---|
| **T1** Commun | 3 / 8 / 0 % / +4 Mana / 1 | 6 / 4 / −5 % / +5 Stam / 1 | 10 / 5 / −15 % / +6 HP / 1 | 14 / 3 / −25 % / +10 HP / 1 | 9 / 9 / var / +affixe / 1 |
| **T2** Façonné | 4 / 10 / 0 % / +5 Mana · +1 Acuité / 2 | 8 / 5 / −7 % / +7 Stam · +1 Acuité / 2 | 13 / 7 / −18 % / +8 HP / 2 | 18 / 4 / −28 % / +13 HP / 2 | 12 / 12 / var / +affixe / 2 |
| **T3** Œuvré | 5 / 13 / 0 % / +7 Mana · +2 Mémoire · +5 % effi. Voie / 2 | 10 / 6 / −10 % / +9 Stam · +2 Acuité · +3 % détection / 2 | 16 / 9 / −20 % / +11 HP · +2 Vigueur / 3 | 25 / 5 / −32 % / +16 HP · +5 % résist stagger / 3 | 15 / 15 / var / +affixe / 3 |
| **T4** Magistral | 6 / 17 / 0 % / +9 Mana · +3 Mémoire · +10 % effi. Voie · +1 régen Mana/s / 3 | 13 / 8 / −12 % / +11 Stam · +3 Acuité · +5 % détection · +1 % crit / 3 | 21 / 11 / −22 % / +14 HP · +3 Vigueur · +3 % parade / 3 | 32 / 7 / −38 % / +21 HP · +10 % stagger · −10 % vision / 4 | 20 / 20 / var / +2 affixes / 4 |
| **T5** Légendaire | 7 / 22 / 0 % / +11 Mana · +5 Mémoire · +15 % effi. Voie · +2 régen/s / 4 | 17 / 11 / −15 % / +14 Stam · +5 Acuité · +8 % détection · +2 % crit / 4 | 27 / 14 / −24 % / +18 HP · +5 Vigueur · +5 % parade / 4 | 40 / 9 / −42 % / +27 HP · +15 % stagger / 4 | 25 / 25 / var / +2-3 affixes / 4 |
| **T6** Mythique | 9 / 28 / 0 % / +14 Mana · +7 Mémoire · +20 % effi. Voie · proc résonance · *signature* / 4+1 | 21 / 14 / −18 % / +18 Stam · +7 Acuité · +12 % détection · +3 % crit · *signature* / 4+1 | 35 / 19 / −26 % / +23 HP · +7 Vigueur · +8 % parade · *signature* / 4+1 | 52 / 12 / −50 % / +35 HP · +20 % stagger · *signature* / 4+1 | 32 / 32 / var · *signature cosmique* / 4+1 |

> [!info] Lecture
> Un **Heaume Plate T6** réduit les dégâts critiques reçus de **−50 %** — c'est le slot anti-crit par excellence. Une **Capuche Cuir T6** offre **+12 % détection** (utile pour repérer assassins / pièges).

---

## 4. Calcul de défense — rappel

Formules canoniques posées par [[Cuirasse#4. Calcul de défense effective]] :

```
Défense physique effective = Vigueur + (Défense_armure_phys × Multiplicateur_classe_phys)
Défense magique effective  = Esprit + Conscience + (Défense_armure_mag × Multiplicateur_classe_mag)
```

Multiplicateurs de classe identiques à Cuirasse (Tissu ×0.5/×1.5 phys/mag, Plate ×1.5/×0.6, etc.).

> [!note] Réduction crit spécifique au Heaume
> La **réduction des dégâts critiques reçus** est un effet propre au slot Tête — appliquée **après** la défense effective. Sans heaume, un coup critique inflige `dégâts_normal × 2`. Avec Heaume Plate T6 : `dégâts_normal × 2 × (1 − 0.50) = dégâts_normal × 1.0` (le critique est neutralisé).

---

## 5. Affixes spécifiques au Heaume

> Universels et de classe hérités de [[Cuirasse#5. Affixes spécifiques aux armures]]. Affixes spécifiques au slot Tête ci-dessous.

### Affixes propres au Heaume (universels)

| Affixe | Effet T3 |
|---|---|
| **Vision élargie** | +5 m portée détection |
| **Vue perçante** | +5 % chance critique infligé |
| **Mémoire affûtée** | −5 % cooldowns Voie |
| **Conscience aiguisée** | +5 % parade magique réussie |
| **Anti-aveuglement** | Immunité 50 % aux effets visuels (flash, brume) |

### Affixes par classe (propres Heaume)

| Classe | Affixe spécifique |
|---|---|
| **Tissu** | *Conduit crânien* — +5 % portée des sorts |
| **Cuir** | *Capuche silencieuse* — −10 % bruit + immunité aux dégâts auditifs |
| **Mailles** | *Bourdonnière* — +10 % résistance aux sorts de confusion |
| **Plate** | *Visière fermée* — Immunité totale aux flashs lumineux ; **mais** −15 % vision périphérique additionnelle |
| **Spécial-Exotique** | *Sens primordial* — révèle invisibles dans 3 m (selon matériau) |

---

## 6. Recettes — Tier 3 (Œuvré) référence

> Pattern hérité de [[Cuirasse#6. Recettes par classe — Tier 3 (Œuvré) référence]] avec intrants **réduits** (~50-60 % vs Cuirasse) car surface plus petite.

### 🧵 Capuchon de Tissu Œuvré

| Champ | Valeur |
|---|---|
| **Métier** | [[Tisserand\|Tisserand]] + [[Métiers - Brodeur\|Brodeur]] |
| **Intrants** | 2× Tissu (laine) · 1× Pigment · 1× Cristal de Voie mineur · 3× Fil métallique |
| **Maîtrise** | Adepte (palier 3) · 40 s · mini-jeu cadence métier (court) |

### 🦬 Capuche cloutée de Cuir

| Champ | Valeur |
|---|---|
| **Métier** | [[Tanneur\|Tanneur]] → [[Métiers - Maroquinier\|Maroquinier]] |
| **Intrants** | 3× Cuir tanné T2+ · 1× Fil métallique · 4× Boucle/Clou · 1× Pigment |
| **Maîtrise** | Adepte · 60 s · mini-jeu coupe précise (1 patron) |

### ⛓ Casque de Mailles

| Champ | Valeur |
|---|---|
| **Métier** | [[Forgeron\|Forgeron]] |
| **Intrants** | 4× Fil métallique · 1× Lingot (calotte) · 1× Cuir (mentonnière) · 1× Charbon |
| **Maîtrise** | Adepte · 80 s · mini-jeu tressage anneaux (séquence courte ~20 anneaux) |

### 🏛 Heaume de Plate

| Champ | Valeur |
|---|---|
| **Métier** | [[Forgeron\|Forgeron]] + [[Métiers - Armurier\|Armurier]] |
| **Intrants** | 3× Lingot · 1× Alliage (visière) · 1× Cuir (intérieur) · 2× Charbon · 1× Eau de trempe |
| **Maîtrise** | **Expert** (palier 4) · 120 s · mini-jeu **estampage** (4 phases : forge, modelage calotte, ajustement visière, trempe) |

### 💎 Carapace crânienne Spécial-Exotique

| Champ | Valeur |
|---|---|
| **Métier** | [[Métiers - Joaillier\|Joaillier]] / [[Métiers - Sertisseur\|Sertisseur]] (combinaisons possibles) |
| **Intrants** | Variable — ex. 2× Carapace insectoïde · 1× Fil métallique · 1× Essence spirituelle · 1× Cristal de Voie aligné |
| **Maîtrise** | **Maître** 🔒 · 160 s · mini-jeu rituel (glyphes courts) |

---

## 7. Variants cosmiques (10 par ère)

Mêmes 10 variants que [[Cuirasse#7. Variants cosmiques (10 par ère)]] — effets visuels adaptés à la tête (auras autour du heaume, gravures sur le casque, runes brodées sur le capuchon). Modificateurs gameplay **adaptés au slot Tête** :

| Variant | Effet gameplay propre au Heaume |
|---|---|
| **Shadow** | +5 % chance d'esquive contre coups au flanc/dos (l'ombre dévie) · proc 5 % invisibilité 1 s sur crit reçu |
| **Spectral** | Vision spectrale : révèle les Liés ennemis dans 8 m · −10 % réduction crit reçus |
| **Frost** | +20 % résistance Glace · cuir/tissu humide ne gèle pas |
| **Verdoyant** | +1 régen Mana/s en zone naturelle · feuilles vivantes sur le heaume |
| **Brulé** | +20 % résistance Feu · proc 10 % brûlure 5 s sur attaquant mêlée |
| **Pourpre** | +5 % esquive (illusion) · ennemis subissent −5 % précision |
| **Doré** | Soins reçus +10 % · révèle invisibles dans 8 m · halo visible |
| **Brisé** | Aléatoire — buff/malus crâne différent à chaque combat |
| **Onirique** | Confusion 1× par combat sur première attaque ennemie |
| **Vénérable** | +1 slot d'affixe supplémentaire · −5 % autres procs |

Disponibilité par ère active : voir [[Cuirasse#7. Variants cosmiques (10 par ère)]].

---

## 8. Exemples de signatures (PHASE 4 stub)

> Cadence cible 2-3 par grand pays (étoffer en Phase 4).

- **Heaume du Premier Veilleur** (Plate T6, **Astravia**) — *« Pendant l'Arrachement, le Veilleur ne ferma jamais sa visière. »* Affixe signature : crit reçus −60 % (au-delà du plafond standard).
- **Capuche de la Veuve** (Tissu T5 Doré, **Galenor**) — *« La Veuve voyait dans le brouillard mortel. »* Affixe : révèle invisibles dans 15 m + immunité Ombre 5 s par combat.
- **Heaume cornu d'Alkaran** (Plate T4 Frost, **Alkaran nordique**) — *« Forgé dans la glace pérenne. »* Affixe : +30 % résistance Glace · proc 5 % gel sur attaquant.
- **Capuche druidique d'Onara** (Tissu T5 Verdoyant, **Onara**) — *« Tissée à la frontière des trois forêts. »* Affixe : +2 régen Mana/s en zone naturelle.
- **Casque hoplique d'Astravia** (Mailles T4, **Astravia**) — *« Crête de la garde de la Tour-Mère. »* Affixe : +25 % aggro · +5 % parade tenue.

> [!todo] Phase 4 : étoffer 2-3 par grand pays × 13 continents.

---

## 9. Sets et synergies

Voir [[Cuirasse#9. Sets et synergies (question ouverte)]] — décision set bonuses 3/5/8 pièces en attente. **`[REFONTE-NEEDED]`** cohérent avec Cuirasse.

Synergies émergentes locales :
- **Heaume Tissu T5 + Capuche Cuir T5 Shadow** : impossible (2 slots Tête)
- **Heaume Plate Pourpre + Cuirasse Plate Pourpre** : esquive d'illusion cumulée jusqu'à plafond +15 %

---

## 10. Décisions ouvertes

- ⚠️ Plafond cumulatif **réduction crit reçus** : doit être borné à **−75 %** (sinon Plate full crit-reduce devient absurde) → à valider playtest.
- ⚠️ **Champ visuel réduit** Plate (−10 % vision périphérique) — gameplay 1ère personne ? overlay caméra ? À discuter avec Game Design.
- ⚠️ **Variants culturels** (Heaume nordique, Casque hoplique, Capuche druidique, Bandeau steppique) : restent-ils cosmétiques (skins) ou portent-ils un **bonus stat léger** ? → P4 décision.
- ⚠️ **Bandeau** Cuir/Tissu hybride : nouvelle classe ou variant ? → resté variant pour l'instant.

---

*Liens : [[Items/Index\|← Index Items]] · [[Cuirasse]] · [[Catégories d'Items]] · [[Crafts]] · [[Personnage]] · [[Combat]]*
