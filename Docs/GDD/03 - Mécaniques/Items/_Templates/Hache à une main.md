---
tags: [item, archétype, arme, mêlée-1H, hache]
type: archetype
category: Arme
subcategory: Mêlée 1H
source: Fabriqué
mastery: Hache 1H
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-saignement-DoT, conditions-cachées-Maître]
---

# 🪓 Hache à une main — Archétype

> Variant tranchant agressif 1H de [[Épée à une main]]. **Saignement gratuit, dégâts +20%, vitesse −10%, +10% stagger**. Hérite des patterns canoniques. Voir [[Catégories d'Items]] · [[Armes et Maîtrise#Hache 1H]].

---

## 1. Vue d'ensemble

La **hache à une main** est l'**arme tranchante agressive 1H** d'Hybelior. Là où l'épée privilégie la finesse et le combo, la hache mise sur la **brutalité du coup unique** + DoT *Saignement* qui prolonge la pression. Culturellement, c'est l'arme du **bûcheron-soldat**, du **chasseur de gros gibier**, du **raider du nord**, du **mercenaire pragmatique** ; arme polyvalente outil/combat (la hache de bûcheron a la même Maîtrise *Hache 1H* mais des stats outil-réduites). Sa Maîtrise [[Armes et Maîtrise#Hache 1H|Hache 1H]] structure un moveset **lent en wind-up, vif en sortie**, avec une emphase sur le **cumul de saignements**.

> [!info] Position dans la mêlée canonique
> **Dégâts ×1.20 vs épée 1H · Vitesse ×0.90 · Stagger ×1.10 · Tranchant 95% + Perçant 5%** · Affixe natif *Saignement* (5% chance/hit, DoT 3%/s 5s).

---

## 2. Variations / sous-types

| Sous-type | Profil | Ancrage culturel | Modificateur baseline |
|-----------|--------|------------------|-----------------------|
| **Hache de guerre** *(baseline)* | Référence neutre | Soldats du nord, raiders | Dégâts ×1.0 · Vitesse ×1.0 |
| **Hachette** | Plus rapide, plus légère, jet possible | Éclaireurs, chasseurs | Dégâts ×0.85 · Vitesse ×1.15 · Jet possible (portée 8m) |
| **Hache d'abordage** | Crochet en pommeau, anti-cordage maritime | Corsaires de Cestra | Dégâts ×0.95 · Désarmement +10% chance · Bonus contre ennemis grappés |
| **Hache cérémonielle** | Lame sculptée, bonus social/Voie | Prêtres, juges, ambassadeurs | Dégâts ×0.85 · *Aura de présence* gratuit · Canalisation Voie +5% |
| **Tomahawk** *(rare)* | Hache jet pure, bois renforcé | Tribus nomades des plaines | Dégâts ×0.80 · Jet portée 12m · Coût Forge réduit (T1 = Bois ×3 + Lingot ×1) |

---

## 3. Stats par tier

> [!important] Dérivation depuis [[Épée à une main]] §3
> Multiplicateurs identiques. Valeurs absolues = épée 1H × 1.20 sur dégâts, ×0.90 sur vitesse, ×1.10 sur stagger.

### Table absolue — Hache de guerre (baseline)

| Tier | Dégâts/coup | Vitesse (coups/s) | Critique base | Stagger | Durabilité | Stamina/coup |
|------|-------------|-------------------|---------------|---------|------------|--------------|
| **T1 Commun** | **48** | 1.08 | 5% | 28 | 210 | 9 |
| **T2 Façonné** | 62 | 1.10 | 5% | 30 | 290 | 9 |
| **T3 Œuvré** | 82 | 1.13 | 6% | 33 | 400 | 9 |
| **T4 Magistral** | 106 | 1.15 | 7% | 39 | 530 | 9 |
| **T5 Légendaire** | 134 | 1.19 | 8% | 46 | 690 | 9 |
| **T6 Mythique** | 173 | 1.22 | 10% | 55 | 900 | 8 |

### Saignement gratuit — règle canonique

À chaque hit, **5% de chance d'appliquer *Saignement*** (DoT 3% HP/s sur 5s). **Stack jusqu'à 3 fois** (3 saignements = 9% HP/s pendant 5s = ~45% HP perdu sur la durée). Probabilité augmente par tier : **5% T1 → 7% T2 → 9% T3 → 12% T4 → 15% T5 → 20% T6**.

> [!tip] Synergie Saignement
> Avec affixe *Saignement* (booste la chance) + variant *Brulé* (DoT additionnel) + crit (chance triplée), la hache devient une arme **DoT-burst** très efficace contre boss à HP élevés.

---

## 4. Damage types

| Type | Pourcentage |
|------|-------------|
| **Tranchant** | 95% |
| **Perçant** | 5% (pointe en pommeau) |

**Forces** : faune (saignements démultipliés), humanoïdes en cuir/mailles, anti-cordage (sous-type abordage).
**Faiblesses** : armures plate (peu de perçant, pas anti-armure).

---

## 5. Affixes typiques

> [!important] Catalogue = baseline + Saignement natif + 2 spécifiques
> Hérite *Saignement* natif gratuit T1. Ajoute :

| Affixe | Effet | Tier min | Notes |
|--------|-------|----------|-------|
| **Saignement** *(natif)* | 5%→20% chance/hit selon tier | T1 | Gratuit |
| **Saignement profond** | DoT 5%/s (vs 3%/s base), durée +2s | T3 | Rare — anti-boss |
| **Hémorragie** | Si 3 saignements stackés sur cible, +100% dégâts au prochain coup | T4 | Très rare — burst signature |

Plus les 13 affixes baseline. Règles d'apposition identiques à l'épée 1H.

---

## 6. Recettes (Forge)

> [!note] Pattern Forge identique à [[Épée à une main]] §6
> Différences : moins de tranchant à fignoler (gain T1-T2), plus de masse à équilibrer (têtes asymétriques).

| Tier | Intrants spécifiques | Durée | Mini-jeu |
|------|----------------------|-------|----------|
| **T1** | Lingot fer ×2, Planche ×2 (manche court mais épais), Cuir tanné ×1 | 90 s | timing_température (3 frappes) |
| **T2** | Lingot acier ×2, Planche d'essence ×1, Cuir tanné ×1, Pigment ×1 | 180 s | + équilibrage_tête |
| **T3** | Alliage acier-trempé ×2, Lingot ×1, Planche d'essence noble ×1, Cuir tanné fin ×1, Fil métallique ×1 | 360 s | équilibrage + précision_tranchant |
| **T4** | Alliage rare ×3, Lingot précieux ×1, Planche noble ×1, Cuir tanné fin ×1, Cœur creature ×1, Gemme taillé ×1 | 900 s | chaîne complète |
| **T5** | Alliage légendaire ×3, Cœur creature ×2, Cristal de Voie ×1, Essence spirituelle ×1 | 1800 s | + condition cachée 🔒 |
| **T6** | Composants cosmiques + signature | variable | quête scénarisée |

---

## 7. Variants cosmiques

Mêmes 10 variants que [[Épée à une main]] §7. Adaptations hache 1H :
- **Brulé** : *Saignement* mute en *Brûlure-Saignement* combiné (DoT Feu + Tranchant cumulés, pas de stack — remplace)
- **Frost** : *Saignement* gelé → DoT s'étend en zone (les gouttes gèlent au sol, dégâts mineurs aux alliés ennemis adjacents)
- **Verdoyant** : la hache *Verdoyant* devient outil-arme (récolte Bois +30% bonus, comme [[Catégories d'Items|Hache de bûcheron]] mais avec dégâts combat préservés)

---

## 8. Exemples de signatures

### Signatures CSV (type 77 — Hache 1H)

> Tirées de `Objets.csv` AccessExport. Bonus narratifs = stubs Phase 4.

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Tourment, croisé du ciel** | Légendaire (T5) | Hache cérémonielle d'un templier déchu d'Endora, qui a renié l'Accord | Variant *Doré* + variant *Pourpre* simultanés (rare). +30% dégâts contre Liés (Voie active) |
| **Clair de lune, terreur de la rédemption** | Magistral (T4) | Hachette argentée, brille la nuit | Variant *Pourpre* permanent. *Saignement profond* gratuit. Bonus +20% dégâts en zone faible luminosité |
| **Spark, secret des rêves illuminés** | Légendaire (T5) | Hache électrifiée trouvée dans les Cratères, gravée d'éclats | Affixe *Élémentaire Foudre* gratuit. 10% chance stagger léger en zone par hit |
| **Gardien des sorts, conquérant de la couronne** | Mythique (T6) | Hache rituelle d'un ancien roi-mage de Veshrim | Affixe signature *Couronne brisée* : à chaque kill, vol 5 pts Mana. Héritage permanent |
| **La consécration, point crucial des veuves** | Légendaire (T5) | Hache de cérémonie funéraire, lame gravée des noms des veuves de la guerre des Sept Tours | Bonus +30% dégâts contre cibles à HP < 30%. Soigne 5 pts HP par kill |
| **Flamme d'âme** | Magistral (T4) | Hache forgée dans le feu d'un esprit ancestral | Variant *Brulé* permanent. Affixe *Élémentaire Feu* doublé |

### Signatures additionnelles

| Pays | Nom | Tier | Profil |
|------|-----|------|--------|
| Mosrack | **Hache du Maître-Bûcheron** | Œuvré (T3) | Standard outil-arme, +20% récolte Bois |
| Nord | **Tomahawk-Tonnerre** | Magistral (T4) | Tomahawk de raider, *Saignement* gratuit T4 + retour automatique en main 30s post-jet |
| Cestra | **Hache d'Abordage des Récifs** | Légendaire (T5) | Hache des corsaires, désarmement +25%, bonus contre cibles grappées |

---

## 9. Mini-jeu de combat

### Moveset baseline

- **Combo 3 coups (LMB)** : frappes diagonales-latérales-verticales — fenêtre combo **0.65s**
- **Attaque lourde (LMB tenu)** : grand wind-up + frappe verticale, applique *Saignement* garanti (vs 5-20% base) — 28 pts stamina
- **Parade tenue (RMB)** : drain 12 pts/s, absorbe 45% (manche court, garde réduite)
- **Parade parfaite** : fenêtre 0.20s
- **Esquive** : 4 directions, IFrames 0.40s

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Combo 3 coups, attaque lourde *Saignement garanti* |
| **Initié** | Finisseur *Coup de boucher* (4e coup, dégâts ×1.5) ; compétence *Crochet* (jet pommeau, désarme léger, 35 stamina, CD 8s) |
| **Adepte** | Passif *Sang appelle Sang* : +10% chance crit sur cible saignante. Compétence *Charge agressive* (charge 4m + frappe) |
| **Expert** | Combo 5 coups, finisseur *Hémorragie* (active l'affixe sans le posséder, conditionnel cible saignante). Compétence *Tourbillon* (rotation 360°) |
| **Maître** 🔒 | Technique signature *Boucherie du Cycle* (170 pts stamina, 100s CD, 5 frappes successives qui ne consomment pas de combo, *Saignement profond* garanti) |

### Synergies

- **Hache 1H + Bouclier** : combo classique du raider
- **Hache 1H + Hache 1H** : style "raider du nord", combo alterné, double saignement par cycle
- **Hache 1H + Dague** : duelliste agressif

---

## 10. Décisions ouvertes

> [!warning] Mécanique Saignement et plafond de stack
> Stack jusqu'à 3 = ~45% HP perdu sur durée. À playtest : trop fort sur boss à HP fixes ? Possibilité de plafonner stack à 2 sur boss.

> [!warning] Sous-type Tomahawk et catégorie Munition
> Le tomahawk fait office de munition rechargeable (revient en main après 30s, ou récupération manuelle). Décision Phase 3 : armée comme munition (consommable) ou comme arme spéciale (rejoint catégorie distance) ?

> [!warning] Conditions cachées 🔒 Maître
> - Tuer 100 ennemis avec *Saignement* (sans coup direct létal)
> - Stack 3 saignements sur 50 cibles différentes
> - Utiliser *Boucherie du Cycle* pour finir un boss mondial à 1% HP

---

*Liens : [[Épée à une main]] · [[Hache à deux mains]] · [[Catégories d'Items]] · [[Armes et Maîtrise]] · [[Combat]]*
