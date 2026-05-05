---
tags: [item, archétype, arme, mêlée-1H, épée]
type: archetype
category: Arme
subcategory: Mêlée 1H
source: Fabriqué
mastery: Épée 1H
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, conditions-cachées-Maître, signatures-pays]
---

# ⚔️ Épée à une main — Archétype-référence

> Premier archétype d'arme livré dans la *Descente des couches concept→artefacts*. Pose les **patterns canoniques** des armes mêlée 1H et — par extension — la grille tier/affixes/recettes que les autres archétypes d'arme suivront. Voir [[Items - Index|Items]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Armes et Maîtrise]] · [[Combat]].

---

## 1. Vue d'ensemble

L'**épée à une main** est l'arme **polyvalente canonique** d'Hybelior. Elle équilibre dégâts, vitesse, parry et combo, sans exceller dans aucune direction extrême — elle est la **baseline** que les autres armes excèdent ou nuancent. Culturellement, c'est l'arme du **soldat formé**, du **chevalier**, du **garde-ville** ; elle équipe les armées régulières des grandes nations et structure la doctrine martiale de la plupart des académies. Côté gameplay, sa Maîtrise [[Armes et Maîtrise#Épée 1H|Épée 1H]] débloque un combo 3 coups + finisseur dès le palier Initié, permet le **dual-wield** avec une autre arme 1H ou une [[Catégories d'Items|Dague]], et autorise le port d'un [[Catégories d'Items|Bouclier]] en main gauche.

> [!info] Rôle dans le système
> L'épée 1H sert de **mètre étalon** des armes mêlée. Toutes les autres armes s'évaluent par leurs écarts à elle :
> - Hache 1H : +20% dégâts, −10% vitesse, accès à *Saignement* natif
> - Marteau 1H : +35% stagger, −15% vitesse, perçant inutile
> - Rapière : −15% dégâts, +20% vitesse, +crit, perçant pur
> - Dague : −25% dégâts, +30% vitesse, crit base ×1.5
>
> Donc **calibrer l'épée 1H = calibrer toute la mêlée 1H**.

---

## 2. Variations / sous-types

| Sous-type | Profil de gameplay | Ancrage culturel typique | Modificateur baseline |
|-----------|-------------------|--------------------------|-----------------------|
| **Épée courte** | Plus rapide, plus légère, allonge réduite | Soldats irréguliers, forestiers, milices | Dégâts ×0.9 · Vitesse ×1.10 · Stagger ×0.85 · Stamina ×0.9 |
| **Épée longue** *(baseline canonique)* | Référence neutre — toutes les valeurs des tables tier ci-dessous | Chevalerie, soldats réguliers, écoles classiques | Dégâts ×1.0 · Vitesse ×1.0 · Stagger ×1.0 · Stamina ×1.0 |
| **Sabre** | Tranchant pur, vitesse augmentée, perçant nul | Cavalerie, peuples nomades, corsaires | Dégâts ×0.95 (tranchant pur) · Vitesse ×1.08 · Stagger ×0.95 · *Saignement-prone* +affixe |
| **Cimeterre** | Lame courbe lourde, finisseurs amplifiés | Tribus du désert, ordres sacerdotaux antiques | Dégâts ×1.05 · Vitesse ×0.95 · Stagger ×1.05 · Bonus dégâts finisseur +15% |
| **Estoc** *(variant rare, à valider Phase 2)* | Lame fine quasi-rapière, perçant pur | Garde rapprochée, ducs et princes | Dégâts ×0.95 (perçant pur) · Vitesse ×1.0 · *Anti-armure légère* +20% |

> [!note] Pourquoi 4 sous-types canoniques + 1 variant
> Les sous-types ne sont **pas des armes différentes** au sens Maîtrise — ils partagent tous la Maîtrise *Épée 1H*. Ce sont des **variations stylistiques** qui modulent le profil baseline selon la culture du forgeron qui l'a faite. Cela évite l'inflation de Maîtrises et donne du grain narratif sans surcharge gameplay.

---

## 3. Stats par tier — table chiffrée canonique

> [!important] Référence canonique pour toute la mêlée 1H
> Cette table établit les **baselines numériques** de l'archétype. Les autres armes mêlée 1H (Hache 1H, Marteau 1H, Rapière, Dague) **dérivent** leurs valeurs de cette table via les modificateurs listés en §1.

### Échelle des multiplicateurs par tier

| Tier | Nom | Mult. dégâts vs T1 | Mult. global | Justification |
|------|-----|---------------------|--------------|---------------|
| **1** | Commun | ×1.00 *(baseline)* | ×1.00 | Fer brut, façonnage Novice. Référence d'un humain équipé sans rien de spécial |
| **2** | Façonné | ×1.30 | ×1.20 | Forge soignée par Initié. +30% dégâts cohérent avec coût ×1.5 du tier en Forge ([[Crafts]] §Forge) |
| **3** | Œuvré | ×1.70 | ×1.45 | Acier de qualité, Adepte. Atteignable par tout joueur normal |
| **4** | Magistral | ×2.20 | ×1.75 | Alliage, Expert. Prérequis Accord 50%+ ([[Personnage]] §Prérequis d'équipement) |
| **5** | Légendaire | ×2.80 | ×2.10 | Alliage rare + composant créature, Maître. Prérequis Accord 75%+ |
| **6** | Mythique | ×3.60 | ×2.55 | Composant cosmique + condition cachée 🔒, Maître + signature. **Non craftable hors événement d'ère** |

> Courbe **logarithmique douce** (×1.30 → ×1.30 → ×1.29 → ×1.27 → ×1.29 par tier). Évite le power creep brutal entre tiers, reste cohérent avec la compression du [[Le Souffle|Souffle]] (qui ramène les écarts de stats brutes au-dessus de 50).

### Table absolue — Épée longue (baseline canonique)

| Tier | Dégâts base/coup | Vitesse attaque (coups/s) | Critique base | Stagger (jauge) | Durabilité (pts) | Coût Stamina/coup léger |
|------|------------------|---------------------------|---------------|-----------------|------------------|-------------------------|
| **T1 Commun** | **40** | 1.20 | 5% | 25 | 200 | 8 (canonique [[Combat]]) |
| **T2 Façonné** | 52 | 1.22 | 5% | 27 | 280 | 8 |
| **T3 Œuvré** | 68 | 1.25 | 6% | 30 | 380 | 8 |
| **T4 Magistral** | 88 | 1.28 | 7% | 35 | 500 | 8 |
| **T5 Légendaire** | 112 | 1.32 | 8% | 42 | 650 | 8 |
| **T6 Mythique** | 144 | 1.36 | 10% | 50 | 850 | 8 |

> [!note] Pourquoi la vitesse ne monte pas autant que les dégâts
> La vitesse d'attaque a un **plafond dur à +40%** ([[Combat]] §Plafonds). Faire monter la vitesse autant que les dégâts saturerait le plafond dès le T4 et casserait les builds Vivacité. On préfère faire monter les dégâts proprement.

### Formule de dégâts canonique (s'applique à toutes les armes mêlée)

```
Dégâts effectifs = Dégâts base (table) × (1 + Vigueur × 0.005) × Maîtrise_Arme × Mult. crit éventuel × Mult. variant cosmique × (1 - Réduction armure cible)
```

Détail des termes :
- **Vigueur × 0.005** : +0.5% dégâts par point de Vigueur ([[Personnage]] §Tableau des effets — `Dégâts physiques = Vigueur × Maîtrise_Arme`). Plafond mou à 100, dur à 150.
- **Maîtrise_Arme** : multiplicateur 1.0 (Novice) → 1.10 (Initié) → 1.22 (Adepte) → 1.36 (Expert) → 1.55 (Maître). Voir [[Armes et Maîtrise]].
- **Mult. crit** : 1.50 baseline + Acuité ÷ 20 (ex. Acuité 60 → ×1.80). Voir [[Personnage]].
- **Mult. variant cosmique** : ±10 à ±25% selon variant (voir §7).

### Durabilité — règle canonique

- **Perte par hit donné** : 1 pt (coup léger), 2 pts (coup lourd), 3 pts (parade encaissée), 5 pts (parade parfaite *du défenseur*).
- **À 50% de durabilité** : −10% dégâts, l'arme commence à émettre un son métallique d'usure.
- **À 0 de durabilité** : arme cassée, ne peut plus être équipée jusqu'à réparation.
- **Réparation** : forgeron PNJ (5–50 Éclats selon tier — [[Économie]] §Gold sinks), ou forgeron joueur avec recette de réparation (Phase 2 séparée).

> [!warning] CHANTIER : courbe d'usure Magistral+
> La durabilité brute monte avec le tier mais l'**usure post-Souffle** (10% sur 2 sem — [[Le Souffle]]) ne touche que Magistral+. Proposition de travail : la perte de 10% s'applique sur les **dégâts**, pas sur la durabilité maximale, pour rester lisible. À valider playtest.

---

## 4. Damage types

L'épée 1H produit **deux types de dégâts physiques** par défaut :

| Type | Quand | Pourcentage |
|------|-------|-------------|
| **Tranchant** | Coups latéraux, combo 1-2-3, finisseur de combo | ~80% des dégâts moyens |
| **Perçant** | Estoc en avant, attaque lourde dirigée pointe-en-avant, finisseur "pointe" | ~20% des dégâts moyens (modulable selon sous-type) |

Modulation par sous-type :
- **Sabre** : 100% tranchant, 0% perçant — pénalité contre armure plate
- **Cimeterre** : 95% tranchant, 5% perçant — bonus contre armures de cuir/tissu
- **Estoc** : 0% tranchant, 100% perçant — bonus contre plate, malus contre tissu

### Mapping vers stats brutes

| Stat | Effet sur l'épée 1H |
|------|---------------------|
| **Vigueur** | Source principale du scaling dégâts (+0.5%/pt) — encaissement des chocs |
| **Vivacité** | Vitesse d'attaque + esquive + crit% (formule [[Personnage]] : Crit% = Vivacité ÷ 5 pour épée 1H, qui est une arme rapide) |
| **Endurance** | Pool de stamina pour combos longs, parade tenue |
| **Acuité** | Multiplicateur critique (×1.5 + Acuité/20), ouverture des fenêtres de parade parfaite |
| **Mémoire** | Vitesse de gain de Maîtrise *Épée 1H* (×2 si Mémoire focus) |

> [!tip] Build canonique épée 1H
> *"Vigueur + Vivacité"* est le binôme évident. Acuité en troisième pour l'amplification crit. Endurance suit naturellement par usage. C'est le profil "duelliste classique" — voir [[Personnage]] §Profil 2 pour comparaison.

### Damage types élémentaires (via affixes)

L'épée 1H n'est **pas naturellement élémentaire**, mais peut acquérir un type élémentaire **via affixe d'enchantement** ([[Crafts]] §Scriptorium et enchantement). Voir §5.

---

## 5. Affixes typiques (catalogue spécifique)

> [!important] Catalogue canonique — réutilisable par toutes les armes mêlée
> Ces 13 affixes sont la **liste de référence** pour les armes mêlée 1H. Les armes spécialisées (Hache 1H, Marteau 1H…) ajoutent 1-2 affixes signature à cette base. Affixes magie/distance livrés dans les autres archétypes.

| Affixe | Effet | Tier min | Fréquence | Notes |
|--------|-------|----------|-----------|-------|
| **Tranchant +X%** | +5/10/15/20% dégâts tranchant | T1 | Commun | L'affixe par défaut. Stack avec sous-type Sabre/Cimeterre |
| **Perçant +X%** | +5/10/15/20% dégâts perçant | T1 | Commun | Anti-armure plate |
| **Vampirisme** | Soigne X% des dégâts infligés (1/3/5/7/10%) | T3 | Rare | Synergie avec builds Vigueur basse |
| **Saignement** | 5% de chance par hit d'appliquer Saignement (DoT 3% HP/s sur 5s) | T2 | Commun *(rare ≥ T4)* | Natif sur Hache 1H, affixe sur épée |
| **Critique +X%** | +2/4/6/8% chance de crit | T2 | Commun | Stack avec Vivacité/Acuité |
| **Multiplicateur critique +X%** | +20/30/40% sur le mult crit | T3 | Rare | Build crit-burst |
| **Stagger renforcé +X%** | +15/25/40% jauge de stagger générée | T2 | Commun | Anti-boss, anti-armure lourde |
| **Bonus de Maîtrise +1 palier effectif** | Comme si Maîtrise +1 (cap au palier 5) | T4 | Rare | Très puissant — réservé Magistral+ |
| **Élémentaire — Feu** | 20% des dégâts deviennent Feu, +DoT 1%/s 3s | T3 | Rare | Synergies Voie [[Le Lien]] |
| **Élémentaire — Foudre** | 25% des dégâts deviennent Foudre, chance 10% stagger léger | T3 | Rare | Synergies Voie |
| **Élémentaire — Givre** | 20% des dégâts deviennent Givre, ralentit la cible 15% pendant 2s | T3 | Rare | Synergies Voie Aquor froid / Climata |
| **Résonance d'âme** *(spécial)* | Récupère 2 pts Mana / hit (si Voie active) | T4 | Très rare | Hybride combat + magie, [[Le Lien]] |
| **Aura de présence** | +X Verbe pendant 30s après un kill | T3 | Rare | Pour duellistes-marchands (cf. [[Personnage]] Profil 1) |

### Règles d'apposition d'affixes

- **T1 Commun** : 0 affixe
- **T2 Façonné** : 1 affixe Commun
- **T3 Œuvré** : 1 Commun + 1 Rare possible (~30% de chance au craft)
- **T4 Magistral** : 1 Commun + 1 Rare (garanti) + chance d'un 2e Rare
- **T5 Légendaire** : 2 Rares + 1 Commun + 1 *Très rare* possible
- **T6 Mythique** : 3 Rares minimum + 1 Très rare + 1 affixe **signature unique** (lié au lore de l'item)

> Les affixes Très rare et signature ne sont **pas accessibles via Recipe Generator standard** — ils nécessitent une [[Crafts]] §Scriptorium et enchantement avec composants d'ère + condition cachée 🔒.

---

## 6. Recettes (Forge)

> [!note] Recettes paramétriques — pattern canonique
> Une recette par tier. Chaque recette est ciblée sur **Épée longue** (baseline). Les autres sous-types (courte, sabre, cimeterre) utilisent les **mêmes intrants** mais une **étape de mise en forme** différente au mini-jeu (donc même recette générique, paramétrée par sous-type au moment du craft).

Catégorie de craft : **Forge** ([[Crafts]] §Forge). Métiers : Forgeron + Armurier. Stations : Four à fondre + Forge à charbon + Enclume + Bac à trempe.

### Recette T1 — Épée longue de fer

```yaml
tier: 1
métier: Forgeron
mastery_required: Novice (palier 1)
station: Forge à charbon + Enclume + Bac à trempe
intrants:
  - Lingot de fer × 2
  - Planche × 1            # manche en bois standard
  - Cuir tanné × 1         # poignée
durée: 90 s gameplay
mini_jeu: timing_température (3 frappes, fenêtre verte 1.5s)
sortie: Épée longue de fer (T1 Commun)
sortie_qualité: Commun (Novice peut produire jusqu'à T2 sur proc rare)
```

### Recette T2 — Épée longue façonnée

```yaml
tier: 2
métier: Forgeron
mastery_required: Initié (palier 2)
station: idem + Étau (pour finition tranchant)
intrants:
  - Lingot d'acier × 2     # acier = alliage fer+carbone, voir Sources
  - Planche × 1
  - Cuir tanné × 1
  - Pigment × 1            # gravure légère / tabard signature optionnel
durée: 180 s
mini_jeu: timing_température (5 frappes, fenêtre verte 1.0s) + précision_tranchant
sortie: Épée longue façonnée (T2)
```

### Recette T3 — Épée longue œuvrée

```yaml
tier: 3
métier: Forgeron + Lapidaire (sertissage optionnel)
mastery_required: Adepte (palier 3) en Forge
station: Forge à charbon + Enclume + Bac à trempe + Établi de bijoutier (si serti)
intrants:
  - Alliage acier-trempé × 2  # acier + composant secondaire (voir Sources)
  - Lingot × 1
  - Planche d'essence noble × 1  # bois de cœur, sève rare
  - Cuir tanné fin × 1
  - Fil métallique × 1     # ligature poignée
  - (Gemme taillé × 1, optionnel — ajoute affixe Critique +X%)
durée: 360 s
mini_jeu: timing_température + précision_tranchant + équilibrage_lame (3 mini-étapes)
sortie: Épée longue œuvrée (T3)
```

### Recette T4 — Épée longue magistrale

```yaml
tier: 4
métier: Forgeron + (Lapidaire ou Enchanteur)
mastery_required: Expert (palier 4) en Forge
station: idem + Cercle d'enchantement (si enchanté)
intrants:
  - Alliage rare × 3       # ex. acier + minerai d'ère
  - Lingot précieux × 1    # argent, mithril-like, etc.
  - Planche d'essence noble × 1
  - Cuir tanné fin × 1
  - Cœur de creature × 1   # composant rare créature (voir Sources)
  - Gemme taillé × 1
  - (Cristal de Voie × 1, optionnel — pour affixe élémentaire)
durée: 900 s (15 min)
mini_jeu: timing_température (8 frappes, fenêtre verte 0.6s, échec gaspille 1 lingot)
            + précision_tranchant + équilibrage_lame + sertissage
sortie: Épée longue magistrale (T4) — prérequis Accord 50%+ pour équiper
```

### Recette T5 — Épée longue légendaire

```yaml
tier: 5
métier: Forgeron Maître (palier 5) + Enchanteur (palier 4+)
mastery_required: Maître Forge + Expert Enchantement
station: Forge à charbon + Enclume + Bac à trempe + Cercle d'enchantement + composant ère
intrants:
  - Alliage légendaire × 3 (ex. acier + alliage cosmique de l'ère active)
  - Lingot précieux × 2
  - Planche cosmique × 1   # bois d'ère, voir variants
  - Cœur de creature × 2 (créature haut tier, voir [[Bestiaire - Index]] Phase 4)
  - Gemme taillé × 2 (l'une = Cristal de Voie)
  - Essence spirituelle × 1
durée: 1800 s (30 min) — réparti sur plusieurs sessions possibles
mini_jeu: chaîne complète + condition cachée 🔒 (parfois : forger pendant ère spécifique)
sortie: Épée longue légendaire (T5) — prérequis Accord 75%+ pour équiper
```

### Recette T6 — Épée longue mythique

```yaml
tier: 6
métier: Forgeron Maître + Enchanteur Maître + condition cachée 🔒
mastery_required: Maître + œuvre signée déjà existante au palier 5
station: Forge unique d'une nation (ex. forges de Mosrack — voir Phase 4)
intrants:
  - Alliage cosmique × 3 (composants d'ère, dont 1 hors-ère via Bourse des Augures)
  - Lingot mythique × 1 (ex. larme d'un Éternel — drop event mondial)
  - Planche d'essence cosmique × 1
  - Cœur d'un boss mondial × 1
  - Cristal de Voie maître × 1
  - Composant **signature** lié au lore de la pièce (à inventer par le forgeron)
durée: variable, souvent plusieurs ères de préparation
mini_jeu: aucun mini-jeu standard — quête de fabrication scénarisée
sortie: Épée mythique signée — devient Héritage permanent ([[L'Accord]] §Héritage)
```

> [!note] Pattern réutilisable
> La progression d'intrants (Lingot × 2 / Alliage × 2 / Alliage rare × 3 / Alliage légendaire × 3 / Alliage cosmique × 3) et la durée (90s → 180s → 360s → 900s → 1800s → variable) deviennent **canoniques** pour toutes les armes Forge. Hache, Marteau, Lance, Rapière, Dague, Sceptre suivent la même progression d'intrants/durée, en remplaçant les composants secondaires par leurs spécificités.

---

## 7. Variants cosmiques (10 variants par ère)

> Mappage canonique des [[Les Ères|10 variants cosmiques]] sur l'épée 1H. Chaque variant peut **remplacer** un affixe slot ou s'**additionner** selon le tier de l'arme. Variants visibles uniquement quand l'ère correspondante est active **OU** quand l'arme a été forgée pendant cette ère et conserve son sceau.

| Variant | Ère/Entité | Effet visuel | Modificateur gameplay |
|---------|------------|--------------|------------------------|
| **Shadow** *(Noctis)* | Ombre Longue, Brume Mortelle | Lame noire absorbe la lumière, particules d'ombre | +15% dégâts si cible en mouvement, −10% en plein soleil. Affixe gratuit *Saignement* léger |
| **Spectral** *(Tempora)* | Échos Brisés | Lame translucide, échos fantômes des coups | +15% chance de **traverser une garde**, dégâts −10%. Anti-bouclier |
| **Frost** *(Aquor froid / Climata)* | Sommeil de Glace | Givre permanent sur la lame, vapeur | +20% dégâts Givre, ralentit cibles 15% pdt 2s. Brisée plus facilement à chaud (durabilité −20% en zone volcanique) |
| **Verdoyant** *(Spiritus + Terranu)* | Verdoiement, Communion | Lierre vivant enroulé sur la lame, pousse selon l'usage | Régen HP +0.5%/s pendant 5s après kill, dégâts contre faune +5% mais −10% contre humanoïdes (l'âme végétale "hésite") |
| **Brulé** *(Voie de Feu / Eldoria)* | Feu Endormi | Braises vivantes, lame rouge incandescente | +25% dégâts Feu, applique *Brûlure* DoT 1%/s 3s. Consomme 1 pt durabilité supp/coup |
| **Pourpre** *(Umbra)* | Crépuscule Pourpre, Brume Mortelle | Aura pourpre épaisse, brume sortant de la garde | +10% dégâts en zone faible luminosité, +5% évasion détection (synergie [[Le Lien]] Voie de Noctis/Umbra) |
| **Doré** *(Eldoria)* | Rêve Lumineux, Crépuscule | Lame dorée brillante, halo solaire | +15% dégâts contre Shadow/Spectral/Pourpre, soigne 2 pts HP par hit (*mini-vampirisme lumineux*) |
| **Brisé** *(Tempora aigu)* | Échos Brisés en pic | Lame craquelée qui se "répare" et se "brise" alternativement | Dégâts variables ±30% (RNG par hit), affixe *Critique +5%* gratuit. Risque de *self-stagger* léger 5% |
| **Onirique** *(Somnix)* | Sommeil Onirique | Couleurs irréelles, traînée de sons amortis | Endort cible 5% du temps (1.5s), dégâts contre cibles éveillées −10%. Synergie Sommeil dans Voies oniriques |
| **Vénérable** *(Fatum)* | Présages | Marques runiques sur la lame, gravures vivantes | Crit% +5% gratuit, et le premier crit de chaque combat est garanti (Mémoire Acuité scaling pertinent) |

> [!tip] Combinatoire variants × tier
> Une **épée mythique Doré** + affixe *Stagger renforcé* + sous-type *Cimeterre* = arme qui finit les boss en stagger lourd avec un mini-vampirisme par hit. Les builds émergent de la combinaison, pas d'un arbre figé.

---

## 8. Exemples de signatures (PHASE 4 stub — exemples par grand pays)

> [!warning] CHANTIER PHASE 4 : ces signatures sont des **stubs** narratifs
> Phase 4 produira des **dossiers complets** par item signature (lore, quête de fabrication, condition cachée, animation). Ici on pose seulement le **placeholder + bonus narratif spécifique** pour ancrer dans le lore.

### Endora (royaume méridional, capitale Avalor — chevalerie)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **La Lame d'Avalor** | Mythique (T6) | Forgée par Maître Élvein lors du dernier Crépuscule, dans le sang d'un Délié vaincu. La lame chante quand elle frappe un parjure | Affixe signature *Détection du parjure* : révèle les PNJ qui ont menti dans les 24h IRL. +25% dégâts contre joueurs Délié-aligned |
| **Garde-Aurore** | Légendaire (T5) | Standard de la garde royale. Chaque garde-capitaine en hérite une lors de sa promotion | Affixe *Aura de présence* (+10 Verbe pdt 30s post-kill) doublée pour le porteur Concordant 100% |
| **Cimeterre du Crépuscule** | Magistral (T4) | Cimeterre forgé par les forgerons d'Avalor pendant l'Ère du Crépuscule | +20% dégâts pendant les heures crépusculaires (ouverture matin, fermeture soir) |

### Veshrim (territoire de l'ancien royaume oriental, ruines d'âge avant l'Arrachement)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Aiguillon de Veshrim** | Légendaire (T5) | Estoc retrouvé dans les Cratères du Cardinal de l'Arrachement. Inscriptions illisibles | Variant *Spectral* permanent (traverse les gardes) + affixe *Résonance d'âme* +3 Mana/hit |
| **Lame des Sept Tours** | Magistral (T4) | Une des sept épées rituelles de l'ancien royaume — six perdues, une retrouvée | Bonus +1 palier effectif Maîtrise *Épée 1H* tant que portée pendant ère Tempora-dominante |

### Mosrack (cité-forge des plaines centrales)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Marteau-Lame d'Aldric** | Légendaire (T5) | Œuvre signée du forgeron-aventurier Aldric de Mosrack ([[Personnage]] §Profil 1) | Héritage permanent du joueur qui la crafte — voir [[L'Accord]] §Œuvres signées |
| **Acier-Mosrack** | Œuvré (T3) | Standard de qualité. Toute épée certifiée Mosrack porte le poinçon | Bonus marchand : +10% prix de revente dans les villes alliées de Mosrack |

### Cestra (cité côtière, architecture souterraine, marais)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Sabre du Récif** | Magistral (T4) | Sabre des corsaires de Cestra, lame courbe dans laquelle est emprisonné un fragment d'algue luminescente | Variant *Verdoyant* atténué + bonus contre faune aquatique +20% |
| **Lame-Brume** | Légendaire (T5) | Forgée pendant la Brume Mortelle, ne brille jamais | Variant *Pourpre* permanent — devient invisible 1s après chaque parade parfaite |

> [!note] Pattern signatures par pays
> Chaque grand pays a 2-3 signatures épée 1H : une T5/T6 *iconique nationale*, une T4 *culturelle*, parfois une T3 *standard de qualité*. Reproductible pour les autres archétypes d'arme.

---

## 9. Mini-jeu de combat (branchement [[Combat]])

### Moveset baseline (Maîtrise Novice)

- **Attaque légère (LMB)** : combo 3 coups (gauche-droite-tranche) — fenêtre combo **0.6s** entre chaque ([[Combat]] canonique)
- **Attaque lourde (LMB tenu)** : estoc en avant, perçant amplifié, brise les gardes faibles — coût 25 pts stamina
- **Parade tenue (RMB)** : drain 10 pts/s, absorbe 50% des dégâts ([[Combat]])
- **Parade parfaite (RMB pulse fenêtre 0.20s)** : annule le coup + stagger l'attaquant 0.5s ([[Combat]])
- **Esquive (Espace + direction)** : 4 directions, IFrames 0.40s ([[Combat]])
- **Saut + attaque (Espace + LMB en saut)** : 30 pts stamina, dégâts +30% sur cible immobile

### Combos débloqués par palier de Maîtrise

| Palier | Combo / capacité débloquée |
|--------|----------------------------|
| **Novice** | Combo 3 coups standard |
| **Initié** | Finisseur de combo (4e coup spécial) ; 1ère compétence active *Frappe en croix* (40 pts stamina, dégâts ×1.5, cooldown 8s) |
| **Adepte** | Passif *Reprise* : régénère 5 pts stamina à chaque parade parfaite. Compétence *Riposte* (déclenchable post-parade parfaite, ignore armure) |
| **Expert** | Combo 5 coups étendu, dernier coup garantit crit. Compétence *Tourbillon* (zone, 80 pts stamina) |
| **Maître** 🔒 | Technique signature *Lame du Cycle* (150 pts stamina, 90s CD, frappe à travers les gardes, applique *Saignement profond* — DoT 8% HP/s 5s) |

### Coûts stamina (référence canonique [[Combat]])

- Léger : 8 pts (plancher 4 pts à Maîtrise Maître + Vivacité haute)
- Lourd : 25 pts (plancher 12)
- Combo finisseur : 12 pts (plancher 5)
- Esquive : 20 pts (plancher 14)
- Compétence basique (*Frappe en croix*) : 30 pts, CD 5s

### Synergies (dual-wield)

- **Épée 1H + Bouclier** : ouvre *Bash* (push 50 pts stamina, stagger 0.5s) — voir [[Catégories d'Items|Bouclier]] (Phase 2)
- **Épée 1H + Épée 1H** : combo alterné (Maîtrise conjointe), capacité *Vol de papillon* (compétence hybride à débloquer)
- **Épée 1H + [[Catégories d'Items|Dague]]** : style "duelliste" — voir [[Personnage]] §Profil 2

---

## 10. Décisions ouvertes / chantiers de profondeur

### Décisions actées par cet archétype (canon pour les autres armes)

- ✅ Multiplicateurs de tier : T1=×1.0 / T2=×1.30 / T3=×1.70 / T4=×2.20 / T5=×2.80 / T6=×3.60 (sur dégâts)
- ✅ Formule dégâts physiques : `Base × (1 + Vigueur × 0.005) × Maîtrise × Mult.crit × Variant × (1 - réduc armure)`
- ✅ Durabilité par tier : 200 / 280 / 380 / 500 / 650 / 850 pts. Perte 1pt/léger, 2/lourd, 3/parade encaissée
- ✅ Perte 10% dégâts (pas durabilité max) post-Souffle pour items Magistral+ pendant 2 sem
- ✅ Affixes : 13 baseline (T1: 0 / T2: 1C / T3: 1C+1R30% / T4: 1C+1R+chance2eR / T5: 2R+1C+1TR / T6: 3R+1TR+1Sig)
- ✅ Recettes : courbe 90s/180s/360s/900s/1800s/variable. Intrants ×2/×2/×2-3/×3/×3+composant unique/composant cosmique
- ✅ 10 variants cosmiques mappés sur les 10 ères-entités canoniques de [[Les Ères]]
- ✅ Pattern signatures pays : 1 T5/T6 nationale + 1 T4 culturelle + parfois 1 T3 standard

### Chantiers ouverts pour cet archétype

> [!warning] CHANTIER : conditions cachées 🔒 du palier Maître
> [[Armes et Maîtrise]] mentionne des conditions cachées au palier 5. Pour épée 1H, propositions de travail (à choisir/affiner Phase 3) :
> - Tuer 100 ennemis humanoïdes sans être touché (par run de combat)
> - Réussir 50 parades parfaites consécutives sans rater
> - Tuer un boss mondial à l'épée seule, sans bouclier ni dague
> - Forger sa propre épée magistrale et tuer avec elle un Délié

> [!warning] CHANTIER : équilibrage du sous-type Estoc
> Le sous-type Estoc (perçant pur) peut empiéter sur le territoire de la Rapière. Décision à trancher : soit on garde Estoc comme variant rare d'épée 1H, soit on le bascule comme variant signature de Rapière (à valider avec l'agent Rapière).

> [!warning] CHANTIER : interaction avec mécanique de poise/posture
> [[Combat]] §Propositions ouvertes mentionne un système posture/poise façon Sekiro à trancher. Si retenu, le stagger de l'épée 1H devra être recalibré (notre table parle d'une jauge "stagger 25-50" ; à mapper si poise est implémenté).

### Notes pour les autres agents Phase 2 armes

> [!important] Pattern à propager
>
> **Épée 1H = baseline neutre.** Les autres armes mêlée se positionnent **par écart** :
>
> | Arme | vs Épée 1H | Affixe natif | Damage type pur |
> |------|-----------|--------------|------------------|
> | Épée 2H | Dégâts +60%, vitesse −25%, stagger +30%, allonge +15% | aucun (généraliste lourd) | Tranchant (90%) + Perçant (10%) |
> | Hache 1H | Dégâts +20%, vitesse −10%, stagger +10% | *Saignement* gratuit | Tranchant (95%) + Perçant (5%) |
> | Hache 2H | Dégâts +75%, vitesse −30%, stagger +50% | *Anti-bouclier* (briser bouclier en 2 coups) | Tranchant (95%) |
> | Marteau 1H | Dégâts +15%, vitesse −15%, stagger +35% | *Stagger renforcé* gratuit | Contondant (100%) |
> | Marteau 2H | Dégâts +85%, vitesse −35%, stagger +75% | *Anti-armure* (ignore 30% réduc) | Contondant (100%) |
> | Lance | Dégâts +25%, vitesse −5%, stagger +5%, allonge +50% | *Anti-charge* (dégâts ×2 sur cible chargeant) | Perçant (100%) |
> | Rapière | Dégâts −15%, vitesse +20%, stagger −20% | *Critique +5%* gratuit | Perçant (100%) |
> | Dague | Dégâts −25%, vitesse +30%, stagger −40% | *Critique base ×1.5* gratuit | Perçant (60%) + Tranchant (40%) |
> | Sceptre | Dégâts −30% (physique) + capacité magique | *Résonance d'âme* (+Mana) gratuit | Contondant + magique |
> | Arc | (voir archétype dédié) | (voir Arc) | Perçant pur (distance) |
>
> Ces écarts permettent à chaque arme de partager **les mêmes affixes baseline** (les 13 listés en §5) sans casser l'équilibre. Les autres agents complètent cette table avec **1-2 affixes signature spécifiques** seulement.
>
> **Réutilisez la table de tiers** (§3) telle quelle. Multipliez les valeurs absolues d'épée 1H par vos modificateurs.
>
> **Réutilisez les 10 variants cosmiques** (§7) tels quels. Ce sont les 10 mappings canoniques de [[Les Ères]], indépendants de l'arme.
>
> **Réutilisez la grille de recettes** (§6) telle quelle pour toutes les armes Forge. Adaptez seulement les composants secondaires (manche en bois pour épée → manche court pour hache, etc.) et le mini-jeu spécifique au sous-type.
>
> **Pour les armes Travail du bois (Arc, et hampe d'armes hybrides)** : voir l'archétype [[Arc]] qui pose la grille recettes Travail du bois en parallèle.

### Cross-références à venir

- [[Bestiaire - Index]] (Phase 4) : créatures qui drop *Cœur de creature* / *Essence spirituelle* haut tier pour recettes T4-T6
- [[Métiers]] : Forgeron + Armurier (Phase 2 séparée) pour mini-jeux de précision
- [[Architecture Data-Driven]] : Recipe Generator + ItemModifier Generator paramétreront les variations de cette base

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Armes et Maîtrise]] · [[Combat]] · [[Personnage]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Économie]] · [[Arc]]*
