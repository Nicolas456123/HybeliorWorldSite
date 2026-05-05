---
tags: [item, archétype, arme, mêlée-2H, épée]
type: archetype
category: Arme
subcategory: Mêlée 2H
source: Fabriqué
mastery: Épée 2H
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, conditions-cachées-Maître]
---

# 🗡️ Épée à deux mains — Archétype

> Variant lourd de [[Épée à une main]]. Réutilise les **patterns canoniques** posés par l'épée 1H (grille de tiers, formule de dégâts, 13 affixes baseline, 10 variants cosmiques, recettes Forge) en y appliquant le modificateur 2H : **+50% dégâts, −25% vitesse, +30% stagger, +15% allonge**, occupe les deux mains (pas de bouclier, pas de dual-wield). Voir aussi [[Catégories d'Items]] · [[Armes et Maîtrise]] · [[Combat]].

---

## 1. Vue d'ensemble

L'**épée à deux mains** est l'arme **polyvalente lourde** d'Hybelior. Là où l'épée 1H privilégie le combo et la défense partagée avec un bouclier, l'épée 2H mise sur **l'allonge, la frappe en zone et le stagger contrôlé**. Culturellement, c'est l'arme du **chevalier d'élite**, du **mercenaire chevronné**, du **garde-corps des maisons fortes** ; rare dans les milices ordinaires, prestigieuse dans les ordres militaires des grandes nations. Côté gameplay, sa Maîtrise [[Armes et Maîtrise#Épée 2H|Épée 2H]] structure un **moveset 3 coups étendu en cercle** (sweep latéral plus ample que l'épée 1H) et débloque dès l'Initié un **finisseur d'estoc lourd** capable de briser les gardes faibles.

> [!info] Position dans la mêlée canonique
> **Dégâts ×1.50 vs épée 1H · Vitesse ×0.75 · Stagger ×1.30 · Allonge ×1.15 · Stamina/coup ×1.30**.
> Reprend les pattern de l'épée 1H tels quels — c'est une **dérivation paramétrique**, pas une refonte.

---

## 2. Variations / sous-types

| Sous-type | Profil | Ancrage culturel | Modificateur baseline |
|-----------|--------|------------------|-----------------------|
| **Épée bâtarde** *(2H avec poignée 1H)* | Polyvalente, peut être tenue 1H par builds Vigueur très haute | Chevaliers errants, mercenaires | Dégâts ×0.95 · 1H possible si Vigueur > 75 (alors mode 1H = ×0.7 dégâts) |
| **Épée longue à 2H** *(baseline canonique)* | Référence neutre — toutes les valeurs des tables tier ci-dessous | Chevalerie d'élite, ordres militaires établis | Dégâts ×1.0 · Vitesse ×1.0 · Stagger ×1.0 |
| **Claymore** | Lame très longue, frappes verticales, allonge maximale | Highlanders, peuples du nord, soldats de montagne | Dégâts ×1.05 · Allonge ×1.10 · Vitesse ×0.95 |
| **Espadon** | Lame large à pointe acérée, perçant amplifié | Cités-États, gardes nobles, duels formels | Dégâts ×1.0 · Perçant 30% (vs 10% baseline) · Anti-armure +10% |
| **Flamberge** *(variant rare)* | Lame ondulée, blessures déchirantes | Ordres dévoyés, cultes anciens | Dégâts ×0.95 · *Saignement* gratuit T2+ · Inflige *Affolement* sur stagger |

---

## 3. Stats par tier — table chiffrée

> [!important] Dérivation depuis [[Épée à une main]] §3
> Multiplicateurs de tier identiques (×1.00/×1.30/×1.70/×2.20/×2.80/×3.60). Valeurs absolues = **épée 1H × 1.50 sur dégâts, ×0.75 sur vitesse, ×1.30 sur stagger, ×1.30 sur stamina**.

### Table absolue — Épée longue à 2H (baseline canonique)

| Tier | Dégâts base/coup | Vitesse (coups/s) | Allonge (m) | Critique base | Stagger | Durabilité | Stamina/coup léger |
|------|------------------|-------------------|-------------|---------------|---------|------------|--------------------|
| **T1 Commun** | **60** | 0.90 | 2.0 | 5% | 33 | 220 | 11 |
| **T2 Façonné** | 78 | 0.92 | 2.0 | 5% | 35 | 310 | 11 |
| **T3 Œuvré** | 102 | 0.94 | 2.1 | 6% | 39 | 420 | 11 |
| **T4 Magistral** | 132 | 0.96 | 2.1 | 7% | 46 | 550 | 11 |
| **T5 Légendaire** | 168 | 0.99 | 2.2 | 8% | 55 | 720 | 11 |
| **T6 Mythique** | 216 | 1.02 | 2.3 | 10% | 65 | 940 | 10 |

### Formule de dégâts

Identique à [[Épée à une main]] §3 (`Base × (1 + Vigueur × 0.005) × Maîtrise × Crit × Variant × (1 - réduc)`). Le **scaling Vigueur reste à 0.005/pt** mais l'épée 2H atteint plus vite le plafond mou Vigueur 100 grâce à sa base élevée — c'est l'arme la plus *Vigueur-friendly* du catalogue.

### Durabilité

Mêmes règles que l'épée 1H. Perte par hit légèrement supérieure : 1 pt/léger, **3 pts/lourd** (vs 2 pour l'épée 1H), 4 pts/parade encaissée. Réparation = forgeron (5–60 Éclats selon tier).

---

## 4. Damage types

| Type | Pourcentage baseline | Modulation sous-type |
|------|----------------------|----------------------|
| **Tranchant** | ~90% | Claymore 95%, Flamberge 90% |
| **Perçant** | ~10% | Espadon 30%, Bâtarde 15% |

Pas de damage type élémentaire natif — accessible via affixe enchantement (voir §5).

### Mapping vers stats brutes

| Stat | Effet sur l'épée 2H |
|------|---------------------|
| **Vigueur** | Source principale du scaling dégâts (+0.5%/pt) — prérequis port ≥ 30 |
| **Vivacité** | Vitesse d'attaque + crit% (formule: Crit% = Vivacité ÷ 8 pour arme lourde) |
| **Endurance** | Pool stamina critique : combo 2H consomme +30% stamina vs 1H |
| **Acuité** | Multiplicateur critique (×1.5 + Acuité/20) |
| **Mémoire** | Vitesse de gain de Maîtrise *Épée 2H* |

> [!tip] Build canonique épée 2H
> **Vigueur prioritaire** (≥ 50), Endurance secondaire pour soutenir les combos, Vivacité pour ne pas trop pénaliser la vitesse, Acuité tertiaire. Profil "guerrier lourd".

---

## 5. Affixes typiques

> [!important] Catalogue = baseline mêlée + 2 spécifiques 2H
> Réutilise les **13 affixes baseline** de [[Épée à une main]] §5. Ajoute :

| Affixe | Effet | Tier min | Fréquence | Notes |
|--------|-------|----------|-----------|-------|
| **Sweep amplifié** | +10/15/20% rayon zone du coup latéral | T2 | Commun | Spécifique 2H |
| **Encaissement renforcé** | +10/15/25% durabilité, −5% perte par parade encaissée | T3 | Rare | Affixe défensif compensant l'absence de bouclier |

Règles d'apposition identiques à [[Épée à une main]] §5 (T1: 0 / T2: 1C / T3: 1C+1R / T4: 1C+2R possible / T5: 2R+1C+1TR / T6: 3R+1TR+1Sig).

---

## 6. Recettes (Forge)

> [!note] Pattern Forge identique à [[Épée à une main]] §6
> Mêmes durées (90s/180s/360s/900s/1800s/variable), même progression d'intrants. Différences spécifiques 2H ci-dessous.

| Tier | Intrants spécifiques 2H vs épée 1H | Durée | Mini-jeu |
|------|------------------------------------|-------|----------|
| **T1** | Lingot de fer ×3 (vs ×2), Planche ×1 (manche long), Cuir tanné ×1 | 120 s | timing_température (4 frappes, fenêtre 1.5s) |
| **T2** | Lingot d'acier ×3, Planche d'essence ×1, Cuir tanné ×1, Pigment ×1 | 220 s | timing_température + précision_tranchant |
| **T3** | Alliage acier-trempé ×3, Lingot ×1, Planche d'essence noble ×1, Cuir tanné fin ×1, Fil métallique ×1 | 420 s | + équilibrage_lame (allonge complique) |
| **T4** | Alliage rare ×4, Lingot précieux ×1, Planche d'essence noble ×1, Cuir tanné fin ×1, Cœur de creature ×1, Gemme taillé ×1 | 1080 s | + sertissage |
| **T5** | Alliage légendaire ×4, Lingot précieux ×2, Planche cosmique ×1, Cœur de creature ×2, Gemme taillé ×2, Essence spirituelle ×1 | 2100 s | chaîne complète + condition cachée 🔒 |
| **T6** | Alliage cosmique ×4, Lingot mythique ×1, Planche d'essence cosmique ×1, Cœur boss mondial ×1, Cristal de Voie maître ×1, composant signature | variable | quête scénarisée |

> Métiers : Forgeron + Armurier. Stations : Forge à charbon + Enclume large + Bac à trempe. Au T3+, étape supplémentaire d'équilibrage poignée-lame (centre de gravité critique pour les armes 2H).

---

## 7. Variants cosmiques

> Mêmes 10 variants mappés que [[Épée à une main]] §7 (Shadow / Spectral / Frost / Verdoyant / Brulé / Pourpre / Doré / Brisé / Onirique / Vénérable). Effets gameplay **identiques** — adaptés mécaniquement à l'arme 2H :

- Les variants à effet de **zone ou trail** (Brulé, Spectral) bénéficient de la sweep amplifiée 2H : la zone d'effet s'étend de +20% sur les coups latéraux.
- Le variant **Frost** ralentit toutes les cibles touchées par un même coup (sweep multi-cibles).
- Le variant **Doré** soigne 3 pts/hit (vs 2 pour l'épée 1H — compensation de l'arme la plus exposée car sans bouclier).

Voir [[Épée à une main]] §7 pour le tableau complet, applicable tel quel.

---

## 8. Exemples de signatures

### Signatures CSV (type 74 — Épée 2H)

> Tirées de `Objets.csv` AccessExport. Les bonus narratifs ci-dessous sont des **stubs Phase 4**.

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Ebony, défenseur des échos** | Légendaire (T5) | Lame d'ébène forgée pendant les Échos Brisés ; protégeait un temple où les voix des morts résonnent encore | Variant *Spectral* permanent. Régen Mana +2/hit si Voie active. Affixe *Encaissement renforcé* gratuit |
| **Navire malveillant** | Magistral (T4) | Épée arrachée au capitaine d'un navire fantôme échoué sur les côtes de Cestra | Bonus dégâts en zone marécageuse/maritime +25%. Variant *Pourpre* atténué. Inflige *Mal de mer* (stagger léger) sur boss |
| **Cometfall, Cristal du Loup** | Mythique (T6) | Lame tombée du ciel pendant l'Arrachement, gravée d'un cristal-cœur de loup-stellaire | Affixe signature *Chute cosmique* : 1er coup du combat fait +100% dégâts mais consomme 2 pts durabilité. Héritage permanent |
| **Noyau assoiffé** | Légendaire (T5) | Lame qui boit l'âme de ses victimes, forgée par un cultiste banni de Veshrim | *Vampirisme* gratuit (+10% HP des dégâts) mais drain HP −1/s hors combat. Variant *Pourpre* permanent |
| **Torrent, la boule des fous** | Magistral (T4) | Épée à pommeau sphérique, brandie par un fou déchu d'un asile de Cestra | Sweep zone +30%. Affixe *Stagger renforcé* gratuit. Malus Verbe −5 (PNJ se méfient du porteur) |

### Signatures additionnelles par grand pays

| Pays | Nom | Tier | Profil |
|------|-----|------|--------|
| Endora | **Lame-Trône d'Avalor** | Mythique | Espadon cérémoniel des rois, +Aura de présence doublée, *Sweep amplifié* gratuit |
| Mosrack | **Acier-Bâtard de Mosrack** | Œuvré (T3) | Standard de qualité — bâtarde forgée selon le poinçon Mosrack |
| Veshrim | **Flamberge des Sept Tours** | Légendaire | Lame ondulée des cultistes anciens, *Saignement profond* gratuit |
| Nord (Highlanders) | **Claymore-Souffle** | Magistral | Claymore traditionnelle, +20% dégâts en zone enneigée |

---

## 9. Mini-jeu de combat

### Moveset baseline (Maîtrise Novice)

- **Attaque légère (LMB)** : combo 3 coups en cercle (sweep gauche / sweep droit / estoc avant) — fenêtre combo **0.7s** (vs 0.6s épée 1H)
- **Attaque lourde (LMB tenu)** : frappe verticale plongeante, brise les gardes faibles et moyennes — coût 35 pts stamina
- **Parade tenue (RMB)** : drain 15 pts/s (vs 10 épée 1H), absorbe 60% des dégâts (sans bouclier, l'épée seule fait office de garde large)
- **Parade parfaite** : fenêtre 0.18s (vs 0.20s épée 1H — plus exigeant car l'arme est plus lente)
- **Esquive** : 4 directions, IFrames 0.35s (vs 0.40s — l'armure 2H ralentit légèrement)
- **Saut + attaque** : 40 pts stamina, dégâts +40% sur cible immobile

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Combo 3 coups en cercle |
| **Initié** | Finisseur *Estoc Lourd* (4e coup, brise les gardes moyennes) ; compétence *Charge épaule* (50 pts stamina, push, CD 10s) |
| **Adepte** | Passif *Garde large* : la parade tenue absorbe 70% (vs 60%). Compétence *Tournoi* (rotation 360°, 90 pts stamina) |
| **Expert** | Combo 5 coups étendu, dernier coup garantit stagger lourd. Compétence *Frappe sismique* (zone 3m, contondant secondaire) |
| **Maître** 🔒 | Technique signature *Faucheuse* (180 pts stamina, 120s CD, sweep 360° qui traverse les gardes et applique *Saignement profond* sur tous les ennemis touchés) |

### Synergies

- **Pas de dual-wield** : l'épée 2H occupe les deux mains
- **Synergie Voie de Vigueur** : si Lié, certaines compétences de Voie se canalisent dans la lame (ex. cri amplifié, charge enflammée)
- **Anti-bouclier** : l'attaque lourde verticale brise les boucliers en T3- en 3 coups (vs 4 pour l'épée 1H)

---

## 10. Décisions ouvertes / chantiers

> [!warning] CHANTIER : épée bâtarde et bascule 1H
> Le sous-type **Épée bâtarde** propose une bascule 1H si Vigueur > 75. Mécaniquement, ça crée une troisième Maîtrise floue (joueur formé Épée 1H qui veut "tâter du 2H sans perdre tout"). Décision Phase 3 : soit on accepte la bascule (et on partage la Maîtrise entre les deux modes), soit on la supprime et la bâtarde reste 2H pure.

> [!warning] CHANTIER : conditions cachées 🔒 du palier Maître
> Propositions de travail :
> - Tuer un boss mondial à l'épée 2H seule, sans esquive (uniquement parade)
> - Réussir 50 finisseurs de combo à pleine vitesse sans rater le timing
> - Forger sa propre épée 2H magistrale et tuer avec elle 100 ennemis humanoïdes

> [!note] Cohérence avec [[Épée à une main]]
> Tous les patterns canoniques sont hérités tels quels. Cet archétype est volontairement **plus court** que le mètre étalon — il pose seulement les **écarts** spécifiques 2H. Voir épée 1H pour les détails de fond.

---

*Liens : [[Épée à une main]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Crafts]] · [[Armes et Maîtrise]] · [[Combat]] · [[Personnage]] · [[Les Ères]]*
