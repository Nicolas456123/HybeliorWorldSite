---
tags: [item, archétype, arme, mêlée-2H, hache]
type: archetype
category: Arme
subcategory: Mêlée 2H
source: Fabriqué
mastery: Hache 2H
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-anti-bouclier, conditions-cachées-Maître]
---

# 🪓 Hache à deux mains — Archétype

> Variant berserker 2H de la [[Hache à une main]]. **Saignement gratuit, anti-bouclier massif, dégâts +75%, vitesse −30%, stagger +50%** vs épée 1H. Hérite des patterns canoniques. Voir [[Catégories d'Items]] · [[Armes et Maîtrise#Hache 2H]].

---

## 1. Vue d'ensemble

La **hache à deux mains** est l'**arme berserker** par excellence : énorme tête tranchante, swing dévastateur, **anti-bouclier canonique** (briser un bouclier en 2 coups). Culturellement, c'est l'arme des **chefs de raid du nord**, des **bûcherons de combat**, des **gardiens de portes**, des **berserkers tribaux** ; elle évoque la fureur, l'agressivité contrôlée, la rupture brutale des défenses adverses. Sa Maîtrise [[Armes et Maîtrise#Hache 2H|Hache 2H]] mise sur la **gestion de stamina** (les coups lourds drainent), le **timing de wind-up** et le **cumul de saignements en zone**.

> [!info] Position dans la mêlée canonique
> **Dégâts ×1.75 vs épée 1H · Vitesse ×0.70 · Stagger ×1.50 · Tranchant 95% + Perçant 5% · Anti-bouclier (brise en 2 coups)**.

---

## 2. Variations / sous-types

| Sous-type | Profil | Ancrage culturel | Modificateur baseline |
|-----------|--------|------------------|-----------------------|
| **Grande hache** *(baseline)* | Référence neutre | Berserkers, raiders d'élite | Dégâts ×1.0 · Stagger ×1.0 |
| **Hache à double tranchant** | Tête bilatérale, sweep amplifié | Tribus, mercenaires | Dégâts ×1.05 · Sweep zone +10% · Vitesse ×0.95 |
| **Hache d'exécution** | Lame très large, finisseurs amplifiés | Bourreaux, gardiens de portes | Dégâts ×1.10 · Bonus finisseur +25% · Vitesse ×0.90 |
| **Hache cérémonielle 2H** | Sculptures rituelles, social/Voie | Chefs spirituels, juges-haches | Dégâts ×0.85 · *Aura de présence* gratuit · Canalisation Voie +5% |
| **Hache fendoir** | Spécialisée bois (mais utilisable au combat) | Bûcherons-combattants des forêts de Galenor | Dégâts ×0.95 · Récolte Bois +50% · Tag *outil* |

---

## 3. Stats par tier

> [!important] Dérivation depuis [[Épée à une main]] §3
> Multiplicateurs identiques. Valeurs absolues = épée 1H × 1.75 dégâts, ×0.70 vitesse, ×1.50 stagger.

### Table absolue — Grande hache

| Tier | Dégâts/coup | Vitesse (coups/s) | Critique base | Stagger | Durabilité | Stamina/coup |
|------|-------------|-------------------|---------------|---------|------------|--------------|
| **T1 Commun** | **70** | 0.84 | 4% | 38 | 240 | 13 |
| **T2 Façonné** | 91 | 0.85 | 4% | 41 | 335 | 13 |
| **T3 Œuvré** | 119 | 0.88 | 5% | 45 | 455 | 13 |
| **T4 Magistral** | 154 | 0.90 | 6% | 53 | 600 | 13 |
| **T5 Légendaire** | 196 | 0.92 | 7% | 63 | 780 | 13 |
| **T6 Mythique** | 252 | 0.95 | 9% | 75 | 1020 | 12 |

### Anti-bouclier canonique

La hache 2H **brise un bouclier en 2 coups lourds** (T1-T3) ou **3 coups légers**. Sur boucliers T4+, 3 coups lourds. Sur grand bouclier T5+, 4-5 coups lourds. Mécanique unique au catalogue (l'épée 2H en demande 4, le marteau 2H en demande 2 mais sans le saignement).

### Saignement gratuit (hérité Hache 1H)

5% chance/hit T1 → 20% T6, DoT 3%/s 5s, stack ×3 max. **+ rayon zone** : sur sweep amplifié (sous-type bilatéral), 1 hit peut appliquer Saignement à 2-3 cibles simultanément.

---

## 4. Damage types

| Type | Pourcentage |
|------|-------------|
| **Tranchant** | 95% |
| **Perçant** | 5% |

Anti-bouclier : ignore complètement la valeur du bouclier en parade tenue (l'attaque traverse partiellement) — variante du *Spectral* gratuite contre boucliers spécifiquement.

---

## 5. Affixes typiques

> [!important] Catalogue = baseline + Saignement natif + 2 spécifiques 2H
> Hérite *Saignement* natif, *Saignement profond*, *Hémorragie* de la Hache 1H. Ajoute :

| Affixe | Effet | Tier min | Notes |
|--------|-------|----------|-------|
| **Brise-bouclier** | Brise un bouclier en 1 coup lourd (au lieu de 2) | T3 | Spécifique 2H |
| **Sweep saignant** | Le coup latéral applique *Saignement* à TOUTES les cibles touchées (vs 1) | T4 | Rare |

---

## 6. Recettes (Forge)

> [!note] Pattern Forge identique à [[Épée à une main]] §6
> Plus de Lingots (+1 par tier), grand manche en bois noble.

| Tier | Intrants spécifiques | Durée | Mini-jeu |
|------|----------------------|-------|----------|
| **T1** | Lingot fer ×3, Planche ×2 (manche long), Cuir tanné ×1 | 120 s | timing_température (4 frappes) |
| **T2** | Lingot acier ×3, Planche d'essence ×2, Cuir tanné ×1 | 220 s | + équilibrage_tête_2H |
| **T3** | Alliage acier-trempé ×3, Lingot ×1, Planche noble ×2, Cuir tanné fin ×1, Fil métallique ×1 | 420 s | équilibrage + précision_tranchant |
| **T4** | Alliage rare ×4, Lingot précieux ×1, Planche noble ×2, Cœur creature ×1, Gemme taillé ×1 | 1080 s | chaîne complète |
| **T5** | Alliage légendaire ×4, Cœur creature ×2, Cristal de Voie ×1, Essence spirituelle ×1 | 2100 s | + condition cachée 🔒 |
| **T6** | Composants cosmiques + signature | variable | quête scénarisée |

---

## 7. Variants cosmiques

Mêmes 10 variants que [[Épée à une main]] §7. Adaptations Hache 2H :
- **Spectral** : *Anti-bouclier* devient absolu (1 coup lourd brise tout bouclier T1-T3)
- **Brulé** : sweep enflamme le sol 2s sur la trajectoire
- **Brisé** : *Saignement* RNG (parfois 0, parfois ×3 instantané)

---

## 8. Exemples de signatures

### Signatures CSV (type 78 — Hache 2H)

> Tirées de `Objets.csv` AccessExport. Bonus narratifs = stubs Phase 4.

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Bibelot de remords** | Légendaire (T5) | Hache trouvée sur le squelette d'un berserker repenti, à l'orée des Cratères | Variant *Pourpre* permanent. Soigne 3 HP par kill. Malus −5 Verbe (PNJ se méfient) |
| **Épine** | Magistral (T4) | Hache à pointes le long de la lame, forgée par un cultiste | *Saignement* gratuit T4 (12% chance, vs 7%). *Hémorragie* gratuite |
| **Relieur de rêves** | Légendaire (T5) | Hache d'un onirurge déchu, gravée de glyphes oniriques | Variant *Onirique* permanent. 5% chance d'endormir cible 1.5s par hit |
| **Oracle** | Mythique (T6) | Hache rituelle des oracles de Veshrim avant l'Arrachement | Affixe signature *Présage* : crit garanti sur la cible la plus faible HP du combat. Héritage permanent |
| **Terrefeu, terreur des rêves illuminés** | Légendaire (T5) | Hache des seigneurs de guerre d'une nation oubliée, lame de feu | Variant *Brulé* permanent. *Sweep saignant* gratuit. Zone de feu post-sweep |
| **Mystère** | Magistral (T4) | Hache sans inscription, sans poinçon, sans origine connue | Affixe RNG : effet aléatoire au début de chaque combat (parmi 13 baseline) |

### Signatures additionnelles

| Pays | Nom | Tier | Profil |
|------|-----|------|--------|
| Nord | **Hache du Chef-Raider** | Légendaire | Sweep amplifié × *Sweep saignant*, signature des chefs de raid |
| Galenor | **Fendoir de la Forêt** | Œuvré (T3) | Outil-arme, +50% récolte Bois, dégâts combat préservés |

---

## 9. Mini-jeu de combat

### Moveset baseline

- **Combo 3 coups (LMB)** : sweep latéral large + frappe verticale + recouvrement — fenêtre combo **0.80s**
- **Attaque lourde (LMB tenu)** : wind-up 1.2s + frappe diagonale dévastatrice, *Saignement garanti* + **Brise-bouclier 1 coup** (avec affixe) — 45 pts stamina
- **Parade tenue (RMB)** : drain 16 pts/s, absorbe 60% (manche long fait office de garde)
- **Parade parfaite** : fenêtre 0.18s
- **Esquive** : 4 directions, IFrames 0.32s

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Combo 3 coups, attaque lourde anti-bouclier |
| **Initié** | Finisseur *Boucher en chaîne* (4e coup, *Saignement profond*) ; compétence *Charge brutale* (60 stamina, ignore stagger faible) |
| **Adepte** | Passif *Sang qui appelle* : *Saignement* sur 1 cible double la chance sur les voisins. Compétence *Tourbillon* (rotation 360°) |
| **Expert** | Combo 5 coups, finisseur applique *Hémorragie*. Compétence *Frappe du géant* (saut + smash, 110 stamina) |
| **Maître** 🔒 | Technique signature *Hache du Cycle* (180 pts stamina, 110s CD, 3 sweep en zone 5m, *Saignement profond* sur tous, *Brise-bouclier* absolu) |

### Synergies

- **Pas de dual-wield** (occupe les deux mains)
- **Anti-bouclier dominant** : meilleure arme du catalogue contre porteurs de bouclier
- **Synergie Voie de Vigueur / Ferveur** : le berserk amplifie via cri de guerre

---

## 10. Décisions ouvertes

> [!warning] Anti-bouclier et équilibrage PvP
> Si la hache 2H brise les boucliers trop facilement en PvP, ça invalide les builds bouclier. Plafond proposé : *Brise-bouclier* à 1 coup réservé aux T5+ avec affixe explicite.

> [!warning] Stack saignement zone (sweep saignant)
> Avec *Sweep saignant* + variant *Brulé*, on stacke 3 saignements + Brûlure sur 5 cibles en 1 sweep. À playtest : trop fort en PvE de masse ?

> [!warning] Conditions cachées 🔒 Maître
> - Briser 50 boucliers en une saison
> - Réussir 100 sweep saignants (3+ cibles à chaque fois)
> - Tuer un boss mondial uniquement par DoT *Saignement* (aucun coup direct létal)

---

*Liens : [[Épée à une main]] · [[Hache à une main]] · [[Catégories d'Items]] · [[Armes et Maîtrise]] · [[Combat]]*
