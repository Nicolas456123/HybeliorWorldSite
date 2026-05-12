---
tags: [item, archétype, arme, mêlée-1H, marteau]
type: archetype
category: Arme
subcategory: Mêlée 1H
source: Fabriqué
mastery: Marteau 1H
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-stagger-playtest, conditions-cachées-Maître]
---

# 🔨 Marteau à une main — Archétype

> Variant contondant 1H de [[Épée à une main]]. **Stagger gratuit, anti-armure légère, dégâts +15%, vitesse −15%, +35% stagger**. Hérite des patterns canoniques (grille tier, formule, 13 affixes, 10 variants, recettes Forge). Voir [[Catégories d'Items]] · [[Armes et Maîtrise#Marteau 1H]].

---

## 1. Vue d'ensemble

Le **marteau à une main** est l'**arme contondante canonique 1H** d'Hybelior. Là où l'épée tranche et la rapière perce, le marteau **écrase** : déstabilise, brise les gardes, fissure les armures plate. Culturellement, c'est l'arme du **forgeron-soldat**, du **prêtre-guerrier**, de l'**ouvrier mobilisé** ; arme symbolique des guildes de Mosrack et des ordres de templiers d'Endora. Sa Maîtrise [[Armes et Maîtrise#Marteau 1H|Marteau 1H]] structure un moveset **lent mais punitif**, axé sur le timing et la lecture des ennemis lourds.

> [!info] Position dans la mêlée canonique
> **Dégâts ×1.15 vs épée 1H · Vitesse ×0.85 · Stagger ×1.35 · Contondant pur (100%)** · Affixe natif *Stagger renforcé*.

---

## 2. Variations / sous-types

| Sous-type | Profil | Ancrage culturel | Modificateur baseline |
|-----------|--------|------------------|-----------------------|
| **Marteau de guerre** *(baseline)* | Référence neutre — toutes les valeurs des tables tier | Soldats lourds, gardes urbains | Dégâts ×1.0 · Vitesse ×1.0 · Stagger ×1.0 |
| **Masse cloutée** | Dégâts +5%, applique micro-saignements (clous) | Mercenaires, bandes irrégulières | Dégâts ×1.05 · *Saignement-prone* light · Stagger ×0.95 |
| **Maillet de forge** | Tête massive, frappe lente mais dévastatrice | Forgerons de Mosrack, ordres ouvriers | Dégâts ×1.10 · Vitesse ×0.90 · Stagger ×1.10 · Anti-armure +5% |
| **Marteau cérémoniel** | Pommeau gravé, bonus social/Voie | Prêtres, templiers, juges-bourreaux | Dégâts ×0.90 · *Aura de présence* gratuit · Canalisation Voie +5% |
| **Étoile du matin** | Boule à pointes au bout d'une chaîne | Cavaliers d'Endora, exécuteurs | Dégâts ×1.05 · Allonge ×1.10 · Parade −10% (chaîne mal alignée) |

---

## 3. Stats par tier

> [!important] Dérivation depuis [[Épée à une main]] §3
> Multiplicateurs de tier identiques. Valeurs absolues = épée 1H × 1.15 sur dégâts, ×0.85 sur vitesse, ×1.35 sur stagger.

### Table absolue — Marteau de guerre (baseline)

| Tier | Dégâts/coup | Vitesse (coups/s) | Critique base | Stagger | Durabilité | Stamina/coup |
|------|-------------|-------------------|---------------|---------|------------|--------------|
| **T1 Commun** | **46** | 1.02 | 4% | 34 | 230 | 9 |
| **T2 Façonné** | 60 | 1.04 | 4% | 36 | 320 | 9 |
| **T3 Œuvré** | 78 | 1.06 | 5% | 41 | 440 | 9 |
| **T4 Magistral** | 101 | 1.09 | 5% | 47 | 580 | 9 |
| **T5 Légendaire** | 129 | 1.12 | 6% | 57 | 750 | 9 |
| **T6 Mythique** | 166 | 1.16 | 8% | 68 | 980 | 8 |

> [!note] Stagger = stat différenciante
> Le marteau a la **plus haute jauge de stagger** du catalogue 1H. À T6, 68 pts → suffit à *Stagger lourd* la plupart des ennemis humanoïdes en 2-3 coups. Les boss requièrent 5-7 coups. Synergie évidente avec l'affixe *Stagger renforcé*.

### Anti-armure plate

Le marteau **ignore 25% de la réduction d'armure** des armures **plate uniquement** (pas mailles, pas cuir). Mécanique canonique du contondant.

### Formule de dégâts

Identique à [[Épée à une main]]. Stat brute principale = **Vigueur** (idem épée).

---

## 4. Damage types

| Type | Pourcentage |
|------|-------------|
| **Contondant** | 100% |
| Tranchant / Perçant | 0% |

**Forces** : armures plate (anti-armure 25%), boss à structures osseuses, ennemis blindés.
**Faiblesses** : armures cuir/tissu (réduction inversée −5% vs cuir mou qui absorbe), faune à carapaces souples (le marteau "rebondit").

---

## 5. Affixes typiques

> [!important] Catalogue = baseline mêlée + affixe natif Stagger renforcé + 2 spécifiques
> Le marteau a **affixe *Stagger renforcé* gratuit T1** (équivalent du *Saignement* gratuit pour la Hache).

| Affixe | Effet | Tier min | Notes |
|--------|-------|----------|-------|
| **Stagger renforcé** *(natif)* | +25% jauge stagger générée | T1 | Gratuit |
| **Brise-armure** | Ignore 35/50/65% réduction armure plate | T2 | Commun (étend l'anti-armure native) |
| **Onde de choc** | Coup lourd applique *Stagger léger* en zone 1.5m | T3 | Rare — anti-groupe |

Plus les 13 affixes baseline. Règles d'apposition identiques à l'épée 1H.

---

## 6. Recettes (Forge)

> [!note] Pattern Forge identique à [[Épée à une main]] §6
> Différences spécifiques marteau : moins de tranchant à affûter (gain de temps T1-T2), plus de masse à équilibrer (gain de Lingots, perte de finesse).

| Tier | Intrants spécifiques | Durée | Mini-jeu |
|------|----------------------|-------|----------|
| **T1** | Lingot fer ×3 (vs ×2 épée), Planche ×1, Cuir tanné ×1 | 90 s | timing_température (3 frappes lourdes) |
| **T2** | Lingot acier ×3, Planche d'essence ×1, Cuir tanné ×1 | 180 s | + équilibrage_masse |
| **T3** | Alliage acier-trempé ×3, Lingot ×1, Planche d'essence noble ×1, Cuir tanné fin ×1, Fil métallique ×1 | 360 s | équilibrage_masse + sertissage tête |
| **T4** | Alliage rare ×4, Lingot précieux ×1, Planche d'essence noble ×1, Cœur creature ×1, Gemme taillé ×1 | 900 s | chaîne complète |
| **T5** | Alliage légendaire ×4, Cœur creature ×2, Cristal de Voie ×1, Essence spirituelle ×1 | 1800 s | + condition cachée 🔒 |
| **T6** | Composants cosmiques + signature | variable | quête scénarisée |

---

## 7. Variants cosmiques

Mêmes 10 variants que [[Épée à une main]] §7. Adaptations spécifiques marteau :
- **Frost** : chaque hit applique micro-gel — la jauge de stagger reste *gelée* 0.5s post-coup (l'ennemi staggeré reste figé plus longtemps)
- **Brulé** : pas de saignement, mais zone d'impact reste enflammée 1.5s (DoT zone)
- **Vénérable** : le premier *Stagger lourd* d'un combat applique *Sourd* (l'ennemi ne suit plus les sons 5s)

Voir tableau complet [[Épée à une main]] §7.

---

## 8. Exemples de signatures

> Pas d'item nominé Marteau 1H dans `Objets.csv`. Signatures inventées par grand pays.

### Mosrack (cité-forge centrale)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Maillet d'Aldric** | Mythique (T6) | Maillet de forge cérémoniel d'Aldric, fondateur de la Guilde de Mosrack | *Brise-armure* gratuit T6. Permet de réparer les armes ennemies désarmées (loot bonus). Héritage permanent |
| **Marteau de la Guilde** | Légendaire (T5) | Standard des contremaîtres de forge | Affixe *Onde de choc* gratuit. Bonus craft Forge +10% qualité quand porté sur soi (hors combat) |
| **Acier-Mosrack lourd** | Œuvré (T3) | Standard de qualité, poinçon Mosrack | +10% prix de revente dans villes alliées Mosrack |

### Endora (templiers, garde royale)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Marteau de Justice** | Légendaire (T5) | Marteau cérémoniel des juges-bourreaux d'Avalor | Bonus dégâts contre PNJ marqués *Criminel* +30%. *Aura de présence* doublée |
| **Étoile du Crépuscule** | Magistral (T4) | Étoile du matin de la cavalerie d'Endora | Bonus dégâts pendant les heures crépusculaires +20% |

### Tribus nomades / Plaines

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Masse-Tonnerre** | Magistral (T4) | Masse cloutée des chasseurs de plaines | Variant *Vénérable* atténué. Crit = stagger lourd garanti |

### Veshrim

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Marteau des Sept Tours** | Légendaire (T5) | Un des sept marteaux rituels de l'ancien royaume | +1 palier effectif Maîtrise pendant ère Tempora-dominante |

---

## 9. Mini-jeu de combat

### Moveset baseline

- **Combo 3 coups (LMB)** : frappes verticales-latérales-horizontales — fenêtre combo **0.7s** (vs 0.6s épée 1H — plus de wind-up)
- **Attaque lourde (LMB tenu)** : frappe verticale écrasante, applique *Stagger lourd* sur cibles humanoïdes T1-T2 — 30 pts stamina
- **Parade tenue (RMB)** : drain 14 pts/s, absorbe 50% (le manche du marteau peut servir de garde)
- **Parade parfaite** : fenêtre 0.22s (généreuse — l'arme lente ne peut pas exiger un timing épée)
- **Esquive** : 4 directions, IFrames 0.40s

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Combo 3 coups, attaque lourde stagger |
| **Initié** | Finisseur *Frappe au sol* (zone 1m, applique *Stagger lourd*) ; compétence *Choc épaule* (push, 40 stamina, CD 8s) |
| **Adepte** | Passif *Lourd qui sait* : −15% wind-up des coups lourds. Compétence *Onde sismique* (zone 3m frontale, 80 stamina) |
| **Expert** | Combo 5 coups, *Stagger lourd* garanti au 5e coup. Compétence *Marteau du juge* (saut + frappe verticale, 100 stamina) |
| **Maître** 🔒 | Technique signature *Marteau du Cycle* (170 pts stamina, 100s CD, frappe qui ignore TOUTE armure et applique *Stun lourd* 3s sur cible unique) |

### Synergies

- **Marteau 1H + Bouclier** : combo défensif canonique (templier d'Endora) — Bash bouclier + frappe marteau enchaînés ouvrent des combos hybrides
- **Marteau 1H + Marteau 1H** : possible mais peu pratiqué (poids cumulé pénalisant)
- **Anti-bouclier** : 3 coups suffisent à briser un bouclier T1-T2 (vs 5 pour l'épée 1H)

---

## 10. Décisions ouvertes

> [!warning] CHANTIER : interaction stagger / poise
> Si [[Combat]] §Posture-Poise est implémenté, le marteau aura un rôle pivot. À recalibrer en bonne intelligence.

> [!warning] Conditions cachées 🔒 Maître
> - Briser 50 boucliers ennemis dans une seule run de combat
> - Tuer un boss mondial uniquement à coups lourds (aucun coup léger)
> - Forger son marteau magistral et l'utiliser pour briser une *Pierre du Cycle* (asset narratif Phase 4)

---

*Liens : [[Épée à une main]] · [[Catégories d'Items]] · [[Armes et Maîtrise]] · [[Combat]] · [[Personnage]] · [[Marteau à deux mains]]*
