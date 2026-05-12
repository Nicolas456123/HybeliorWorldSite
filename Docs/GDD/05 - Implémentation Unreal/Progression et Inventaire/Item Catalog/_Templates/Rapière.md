---
tags: [item, archétype, arme, mêlée-1H, rapière]
type: archetype
category: Arme
subcategory: Mêlée 1H
source: Fabriqué
mastery: Rapière
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [scaling-Vivacité-vs-Vigueur, conditions-cachées-Maître]
---

# 🤺 Rapière — Archétype

> Variant **précision et parade améliorée** de [[Épée à une main]]. **Dégâts −15%, vitesse +20%, stagger −20%, perçant pur 100%, +5% crit gratuit**. Scaling **Vivacité** (vs Vigueur). Hérite des patterns canoniques. Voir [[Catégories d'Items]] · [[Armes et Maîtrise#Rapière]].

---

## 1. Vue d'ensemble

La **rapière** est l'arme de **précision-duel** d'Hybelior. Là où l'épée mise sur la polyvalence et la dague sur la furtivité, la rapière mise sur **le timing parfait, la parade-riposte, la pénétration sélective**. Culturellement, c'est l'arme du **duelliste noble**, du **garde rapproché**, du **maître d'armes**, de l'**ambassadeur en armes** ; elle évoque la finesse, l'éducation martiale, le code d'honneur. Sa Maîtrise [[Armes et Maîtrise#Rapière|Rapière]] structure un moveset **vif et précis** axé sur l'estoc et la parade-riposte (*Riposte* débloquée dès l'Initié, vs Adepte pour l'épée 1H).

> [!info] Position dans la mêlée canonique
> **Dégâts ×0.85 vs épée 1H · Vitesse ×1.20 · Stagger ×0.80 · Perçant 100%** · Affixe natif *Critique +5%*. Anti-armure légère +20% (variant Estoc canonique).

---

## 2. Variations / sous-types

| Sous-type | Profil | Ancrage culturel | Modificateur baseline |
|-----------|--------|------------------|-----------------------|
| **Rapière de duel** *(baseline)* | Référence neutre, équilibre estoc/parade | Duellistes nobles, maîtres d'armes | Dégâts ×1.0 · Vitesse ×1.0 |
| **Estoc** *(épée fine)* | Lame très fine, anti-armure plate amplifié | Garde rapprochée des ducs, chevaliers d'élite | Dégâts ×1.05 · Anti-armure plate +30% · Vitesse ×0.95 |
| **Fleuret** *(léger)* | Très rapide, dégâts faibles | Écoles martiales, jeunes nobles | Dégâts ×0.85 · Vitesse ×1.15 · Crit% +3% additionnel |
| **Rapière à cape** | Conçue pour le duel main gauche tenant cape | Cestra (corsaires nobles), Endora (duellistes) | Dégâts ×0.95 · Bonus *Pas-de-côté* (esquive offensive) +10% |
| **Épée fine cérémonielle** | Lame gravée, social/Voie | Ambassades, juges, maîtres d'armes | Dégâts ×0.80 · *Aura de présence* gratuit · Bonus social ambassadeur |

---

## 3. Stats par tier

> [!important] Dérivation depuis [[Épée à une main]] §3
> Multiplicateurs identiques. Valeurs absolues = épée 1H × 0.85 dégâts, ×1.20 vitesse, ×0.80 stagger.

### Table absolue — Rapière de duel

| Tier | Dégâts/coup | Vitesse (coups/s) | Critique base | Stagger | Durabilité | Stamina/coup |
|------|-------------|-------------------|---------------|---------|------------|--------------|
| **T1 Commun** | **34** | 1.44 | 10% | 20 | 170 | 7 |
| **T2 Façonné** | 44 | 1.46 | 10% | 22 | 240 | 7 |
| **T3 Œuvré** | 58 | 1.40 *(plafond)* | 11% | 24 | 320 | 7 |
| **T4 Magistral** | 75 | 1.40 *(plafond)* | 12% | 28 | 425 | 7 |
| **T5 Légendaire** | 95 | 1.40 *(plafond)* | 13% | 34 | 555 | 7 |
| **T6 Mythique** | 122 | 1.40 *(plafond)* | 15% | 40 | 720 | 6 |

> [!note] Plafond vitesse atteint à T3
> La rapière touche le plafond de vitesse +40% ([[Combat]]) dès T3. Au-delà, gain en cadence de combo et stamina réduite.

### Crit base élevé

Crit base = **2× celui de l'épée 1H** (5% → 10% T1, 10% → 15% T6). Synergie évidente avec Acuité et affixe *Critique +X%*.

### Formule de dégâts — scaling Vivacité

```
Dégâts = Base × (1 + Vivacité × 0.005) × Maîtrise × Crit × Variant × (1 - réduc)
```

**La rapière est l'unique arme mêlée à scaler sur Vivacité (vs Vigueur).** Cohérent avec son profil "duelliste agile". Vigueur reste utile pour le HP global mais ne booste pas les dégâts rapière.

---

## 4. Damage types

| Type | Pourcentage |
|------|-------------|
| **Perçant** | 100% |

Anti-armure plate +20% (mécanique perçant pur), bonus contre tissu/cuir −5%.

---

## 5. Affixes typiques

> [!important] Catalogue = baseline + Crit gratuit + 2 spécifiques
> Hérite *Critique +5%* gratuit T1. Ajoute :

| Affixe | Effet | Tier min | Notes |
|--------|-------|----------|-------|
| **Critique +5%** *(natif)* | +5% chance crit | T1 | Gratuit |
| **Riposte amplifiée** | *Riposte* (post-parade parfaite) inflige +30/50/75% dégâts | T2 | Commun |
| **Estoc traversant** | Le coup lourd traverse 1 ennemi (le 2e prend 70% des dégâts) | T3 | Rare |

---

## 6. Recettes (Forge)

> [!note] Pattern Forge identique à [[Épée à une main]] §6
> Lame fine et longue → moins de Lingot, plus de précision_tranchant.

| Tier | Intrants | Durée | Mini-jeu |
|------|----------|-------|----------|
| **T1** | Lingot fer ×1 (lame fine), Planche ×1 (manche), Cuir tanné ×1, Fil métallique ×1 (garde) | 100 s | timing_température + précision_tranchant (fenêtre 1.0s) |
| **T2** | Lingot acier ×2, Planche d'essence ×1, Cuir tanné fin ×1, Fil métallique ×1 | 190 s | + équilibrage_pointe |
| **T3** | Alliage acier-trempé ×2, Lingot ×1, Planche noble ×1, Cuir tanné fin ×1, Fil métallique précieux ×1 | 380 s | équilibrage + sertissage_garde |
| **T4** | Alliage rare ×3, Lingot précieux ×1, Planche noble ×1, Cœur creature ×1, Gemme taillé ×2 (garde + pommeau) | 920 s | chaîne complète |
| **T5** | Alliage légendaire ×3, Cœur creature ×2, Cristal de Voie ×1, Essence spirituelle ×1 | 1850 s | + condition cachée 🔒 |
| **T6** | Composants cosmiques + signature | variable | quête scénarisée |

---

## 7. Variants cosmiques

Mêmes 10 variants que [[Épée à une main]] §7. Adaptations Rapière :
- **Vénérable** : crit garanti du 1er coup devient un *Crit profond* (×3 au lieu ×2 du Doré)
- **Spectral** : *Estoc traversant* étendu (3 ennemis)
- **Brisé** : crit% RNG ±10% (parfois 0, parfois +25%)

---

## 8. Exemples de signatures

> Pas d'item Rapière nominé dans `Objets.csv`. Signatures inventées par grand pays.

### Endora (duellistes nobles)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Fleuret du Roi** | Mythique (T6) | Rapière de cérémonie du roi d'Avalor, lame gravée des duels remportés | *Riposte amplifiée* triplée. Héritage. Bonus social +Verbe |
| **Lame du Maître d'Armes** | Légendaire (T5) | Récompense pour Maîtrise Rapière palier 5 ; signature du tuteur d'Avalor | Bonus enseignement +30% (les apprentis du porteur gagnent Maîtrise plus vite — synergie [[Personnage]] Profil 1) |

### Cestra (corsaires nobles, duellistes côtiers)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Rapière à Cape** | Magistral (T4) | Standard des duellistes du port de Cestra | Bonus *Pas-de-côté* doublé. Esquive dans 6 directions (vs 4) |
| **Estoc du Récif** | Légendaire (T5) | Estoc forgé pour percer les écailles des créatures côtières | Anti-armure plate amplifié (+50%). Bonus contre faune écaillée +25% |

### Veshrim (anciens royaumes)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Aiguillon de Veshrim** *(estoc)* | Légendaire (T5) | Estoc retrouvé dans les Cratères, gravures illisibles | Variant *Spectral* permanent. *Estoc traversant* étendu à 3 ennemis |

### Endora (ambassades)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Épée fine de l'Ambassade** | Œuvré (T3) | Standard des ambassadeurs d'Avalor | Bonus social +5 Verbe quand portée. Réduit hostilité PNJ neutres |

---

## 9. Mini-jeu de combat

### Moveset baseline

- **Combo 3 coups (LMB)** : estoc-feinte-estoc — fenêtre combo **0.50s** (la plus serrée du catalogue, exigeante)
- **Attaque lourde (LMB tenu)** : estoc plongeant, anti-armure +20%, brise les gardes faibles — 22 pts stamina
- **Parade tenue (RMB)** : drain 8 pts/s (la plus efficace du catalogue 1H), absorbe 35% mais ouvre **fenêtre Riposte** garantie post-parade parfaite
- **Parade parfaite** : fenêtre **0.25s** (la plus généreuse — récompense la lecture)
- **Esquive** : 4 directions, IFrames 0.45s (+0.05s vs épée — la légèreté)
- **Pas-de-côté (Shift + Espace)** : esquive offensive 1m, ouvre estoc bonus, 25 stamina

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Combo 3 coups, estoc lourd |
| **Initié** | Finisseur *Riposte foudre* ; compétence *Estoc rapide* (35 stamina, ignore stagger) |
| **Adepte** | Passif *Œil aiguisé* : crit% +5% sur cible immobile. Compétence *Estoc-feinte-estoc* (combo automatique 3 coups) |
| **Expert** | Combo 5 coups, dernier coup applique *Hémorragie légère*. Compétence *Pas du Maître* (esquive offensive amplifiée) |
| **Maître** 🔒 | Technique signature *Lame du Duelliste* (140 pts stamina, 80s CD, 5 estocs successifs, chacun crit garanti, applique *Saignement profond* sur le 5e) |

### Synergies

- **Rapière + Dague (main gauche)** : style "duelliste classique" — combos hybrides très puissants
- **Rapière + Cape** : (sous-type cape) cape main gauche fait office de mini-bouclier (parade légère)
- **Rapière + Bouclier** : rare mais autorisé (peu intuitif)

---

## 10. Décisions ouvertes

> [!warning] Scaling Vivacité — exception au pattern mêlée
> La rapière est la seule arme mêlée à scaler Vivacité. À playtest : risque de "casser" le binôme canonique mêlée Vigueur+Vivacité ? Alternative : 0.003 Vivacité + 0.002 Vigueur hybride.

> [!warning] Empiètement avec sous-type Estoc d'épée 1H
> [[Épée à une main]] §10 mentionne déjà l'arbitrage Estoc → Rapière vs sous-type Épée. Tranchage Phase 3 : Estoc bascule définitivement chez Rapière (ce qui est fait dans le présent archétype).

> [!warning] Conditions cachées 🔒 Maître
> - Réussir 100 *Ripostes* consécutives sans rater une parade parfaite
> - Tuer un boss mondial uniquement par crit (aucun coup non-crit létal)
> - Réussir un duel d'honneur publique contre un PNJ Maître d'armes (quête scénarisée)

---

*Liens : [[Épée à une main]] · [[Dague]] · [[Catégories d'Items]] · [[Armes et Maîtrise]] · [[Combat]]*
