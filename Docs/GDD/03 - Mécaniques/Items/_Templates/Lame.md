---
tags: [item, archétype, arme, mêlée-1H, lame]
type: archetype
category: Arme
subcategory: Mêlée 1H
source: Fabriqué
mastery: Lame
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, fusion-éventuelle-avec-Épée-1H]
---

# 🔪 Lame — Archétype

> Catégorie générique des **armes coupantes 1H non-épées** d'Hybelior : couteau de combat, sabre court, scimitar, machette, kindjal, falchion. Hérite des **patterns canoniques** de [[Épée à une main]] (grille tier, formule, 13 affixes, 10 variants, recettes Forge), avec un profil **tranchant pur, vitesse +10%, dégâts −5%** vs épée 1H standard. Voir [[Catégories d'Items]] · [[Armes et Maîtrise#Lame]].

---

## 1. Vue d'ensemble

La **Lame** est la **catégorie fourre-tout des coupantes 1H** : tout ce qui tranche sans être une épée formelle, une rapière (perçant) ou une dague (courte+furtive). Culturellement, c'est l'**arme du peuple** : marin, bûcheron, miséricordieux, voleur de marché, soldat irrégulier, pirate. Sa Maîtrise [[Armes et Maîtrise#Lame|Lame]] partage **80% du moveset** avec l'épée 1H mais favorise les **coupes filées** plutôt que les estocs.

> [!info] Position dans la mêlée canonique
> **Dégâts ×0.95 vs épée 1H · Vitesse ×1.10 · Tranchant pur (100%) · Pas de perçant** · Stagger ×0.90.
> Catégorie déliberée pour absorber les variations culturelles (sabre, scimitar) qui ne méritent pas chacune leur Maîtrise.

> [!warning] CHANTIER : fusion possible avec Épée 1H
> La Lame partage beaucoup avec les sous-types *Sabre* et *Cimeterre* déjà listés dans [[Épée à une main]] §2. Décision Phase 3 : maintenir Lame comme Maîtrise distincte, ou fusionner avec Épée 1H et garder Lame uniquement comme tag culturel ? Recommandation initiale = maintenir distinct (le couteau de combat n'est pas une épée).

---

## 2. Variations / sous-types

| Sous-type | Profil | Ancrage culturel | Modificateur baseline |
|-----------|--------|------------------|-----------------------|
| **Couteau de combat** | Court, rapide, polyvalent quotidien | Soldats irréguliers, bûcherons, miséricordieux | Dégâts ×0.85 · Vitesse ×1.20 · Allonge ×0.7 |
| **Sabre** *(baseline)* | Tranchant pur, lame courbe | Cavalerie, corsaires, peuples nomades | Dégâts ×1.0 · Vitesse ×1.0 · *Saignement-prone* |
| **Scimitar / Cimeterre** | Lame courbe lourde, finisseurs amplifiés | Tribus du désert, ordres sacerdotaux antiques | Dégâts ×1.10 · Vitesse ×0.95 · Bonus finisseur +15% |
| **Falchion** | Lame large à un tranchant, dégâts contondants secondaires | Bûcherons-soldats, milices boisées | Dégâts ×1.05 · Vitesse ×0.95 · 20% Contondant secondaire |
| **Machette** | Lame de jungle/marais, polyvalente outil/arme | Cestra, peuples côtiers et de marais | Dégâts ×0.95 · Bonus contre flore/végétation +30% · Tag *outil* (récolte plante autorisée) |

---

## 3. Stats par tier

> [!important] Dérivation depuis [[Épée à une main]] §3
> Multiplicateurs de tier identiques. Valeurs absolues = épée 1H × 0.95 sur dégâts, ×1.10 sur vitesse.

### Table absolue — Sabre (baseline canonique Lame)

| Tier | Dégâts base/coup | Vitesse (coups/s) | Critique base | Stagger | Durabilité | Stamina/coup |
|------|------------------|-------------------|---------------|---------|------------|--------------|
| **T1 Commun** | **38** | 1.32 | 5% | 22 | 180 | 7 |
| **T2 Façonné** | 49 | 1.34 | 5% | 24 | 250 | 7 |
| **T3 Œuvré** | 65 | 1.37 | 6% | 27 | 340 | 7 |
| **T4 Magistral** | 84 | 1.40 *(plafond)* | 7% | 31 | 450 | 7 |
| **T5 Légendaire** | 106 | 1.40 *(plafond atteint)* | 8% | 38 | 580 | 7 |
| **T6 Mythique** | 137 | 1.40 *(plafond)* | 10% | 45 | 770 | 6 |

> [!note] Plafond vitesse atteint à T4
> La Lame est **la première arme du catalogue à toucher le plafond de vitesse +40%** ([[Combat]] §Plafonds) au T4. Au-delà, les bonus de vitesse de tier s'expriment uniquement via la cadence de combo et le coût stamina réduit.

### Formule de dégâts

Identique à [[Épée à une main]]. Stat brute principale = **Vivacité** (vs Vigueur pour l'épée standard) — exception ; à playtest, valider que le scaling 0.005/Vivacité reste cohérent (alternative : 0.004 Vivacité + 0.002 Vigueur).

---

## 4. Damage types

| Type | Pourcentage |
|------|-------------|
| **Tranchant** | 100% |
| **Perçant** | 0% (sauf affixe) |
| **Contondant** | 0% (sauf falchion 20%) |

L'absence de perçant est la **caractéristique différenciante de la Lame vs Épée**. Inutilisable contre armures plate sans affixe Perçant. Très efficace contre cuir, tissu, faune.

---

## 5. Affixes typiques

> [!important] Catalogue = baseline mêlée + 1 spécifique Lame
> Réutilise les **13 affixes baseline** de [[Épée à une main]] §5. Ajoute :

| Affixe | Effet | Tier min | Fréquence |
|--------|-------|----------|-----------|
| **Coupe filée** | Les coups latéraux infligent +5/10/15% dégâts en sweep court | T2 | Commun |

Saignement gratuit T1 sur sous-type Sabre. Règles d'apposition identiques à l'épée 1H.

---

## 6. Recettes (Forge)

> [!note] Pattern Forge identique à [[Épée à une main]] §6
> Mêmes durées, mêmes intrants principaux. Différences :
> - **Lame plus courte que l'épée** → 1 lingot de moins par recette T1-T2 (économie 10-15%)
> - **Étape de courbure** spécifique aux sabres/scimitars : intégrer un *Sève* T2+ pour le mini-jeu de cintrage à chaud

| Tier | Intrants spécifiques | Durée | Mini-jeu |
|------|----------------------|-------|----------|
| **T1** | Lingot fer ×1, Cuir tanné ×1, Planche ×1 | 75 s | timing_température (3 frappes) |
| **T2** | Lingot acier ×2, Sève ×1, Cuir tanné ×1 | 150 s | + cintrage_courbure |
| **T3** | Alliage acier-trempé ×2, Lingot ×1, Cuir tanné fin ×1, Fil métallique ×1 | 320 s | + équilibrage |
| **T4** | Alliage rare ×3, Lingot précieux ×1, Cuir tanné fin ×1, Cœur creature ×1, Gemme taillé ×1 | 800 s | chaîne complète |
| **T5** | Alliage légendaire ×3, Cœur creature ×2, Cristal de Voie ×1, Essence spirituelle ×1 | 1700 s | + condition cachée 🔒 |
| **T6** | Composants cosmiques + signature | variable | quête scénarisée |

---

## 7. Variants cosmiques

Mêmes 10 variants que [[Épée à une main]] §7. Effets identiques avec deux nuances spécifiques Lame :
- **Frost** : la lame courbe gèle les blessures filées → Saignement gelé (DoT Givre vs Tranchant) — synergie unique
- **Verdoyant** : la lame *Verdoyant + Machette* devient l'outil de récolte botanique de référence (récolte végétale +30%)

Voir [[Épée à une main]] §7 pour le tableau complet.

---

## 8. Exemples de signatures

> Pas d'item Lame nominé dans `Objets.csv`. Signatures inventées par grand pays.

### Cestra (côtes, marais, corsaires)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Sabre des Marées** | Légendaire (T5) | Sabre forgé par les corsaires de Cestra avec un alliage trempé dans l'eau de mer | Variant *Frost* permanent atténué. Bonus dégâts en zone aquatique +25%. *Coupe filée* gratuite |
| **Lame d'Algue** | Magistral (T4) | Machette utilisée par les chasseurs de marais ; le pommeau contient une algue luminescente vivante | Variant *Verdoyant* permanent. Récolte botanique +30%. Dégâts +15% contre faune des marais |

### Endora (cavalerie sud)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Cimeterre du Désert** | Légendaire (T5) | Cimeterre cérémoniel des cavaliers d'Avalor | Bonus dégâts en sprint/monture +25%. Affixe *Saignement* gratuit |
| **Sabre de la Garde Montée** | Magistral (T4) | Sabre standard des cavaliers royaux | +15% vitesse en mouvement. *Coupe filée* gratuite |

### Veshrim (anciens royaumes)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Kindjal de Veshrim** | Légendaire (T5) | Couteau de combat retrouvé dans les Cratères du Cardinal, lame noire | Variant *Spectral* permanent. Crit% +5%. Anti-bouclier (traverse partiellement) |

### Tribus nomades (Plaines)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Lame de la Course** | Œuvré (T3) | Standard des cavaliers nomades | Pas de malus crit en mouvement. Cadence +10% en sprint |

---

## 9. Mini-jeu de combat

### Moveset baseline

- **Combo 3 coups (LMB)** : tranches latérales rapides — fenêtre combo **0.55s** (vs 0.6s épée 1H — plus serré)
- **Attaque lourde (LMB tenu)** : taille filée en mouvement, applique *Saignement* sur sous-type Sabre/Cimeterre — 22 pts stamina
- **Parade tenue (RMB)** : drain 12 pts/s, absorbe 40% (lame moins large que l'épée → garde plus faible)
- **Parade parfaite** : fenêtre 0.22s (légèrement plus généreuse — récompense la rapidité)
- **Esquive** : 4 directions, IFrames 0.42s (+0.02s vs épée — la légèreté favorise l'esquive)

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Combo 3 coups |
| **Initié** | Finisseur *Coupe Sang* (4e coup, applique *Saignement* léger) ; compétence *Pas-glissé* (esquive offensive, 35 stamina, CD 6s) |
| **Adepte** | Passif *Cadence* : −10% stamina sur le 3e coup d'un combo. Compétence *Tornade de coupes* (rotation 270°, 70 stamina) |
| **Expert** | Combo 5 coups, dernier coup *Saignement profond*. Compétence *Filé fou* (charge avec 5 coupes en chaîne) |
| **Maître** 🔒 | Technique signature *Mille Coupes* (160 pts stamina, 100s CD, 10 hits ultra-rapides sur cible unique, applique *Saignement profond* + crit garanti) |

### Synergies

- **Lame + Lame (dual-wield)** : combo alterné, *Vol de papillon* hybride (compétence partagée avec Épée 1H + Épée 1H)
- **Lame + Bouclier** : autorisé mais peu intuitif — la lame ne brise pas les gardes lourdes
- **Lame + Dague** : style "Couteau-Sabre" très utilisé par les corsaires de Cestra

---

## 10. Décisions ouvertes

> [!warning] Fusion vs maintien Maîtrise distincte
> Voir §1 — décision majeure pour Phase 3.

> [!warning] Scaling stat brute
> Vivacité ou Vigueur+Vivacité hybride pour la Lame ? À playtest.

> [!warning] Conditions cachées Maître 🔒
> - Réussir 200 *Saignements* sans rater une seule esquive parfaite
> - Tuer 50 ennemis sans qu'ils touchent le sol (combo enchaîné en l'air)

---

*Liens : [[Épée à une main]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Armes et Maîtrise]] · [[Combat]] · [[Personnage]]*
