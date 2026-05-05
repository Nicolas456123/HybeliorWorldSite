---
tags: [item, archétype, arme, distance, arc]
type: archetype
category: Arme
subcategory: Distance 2H
source: Fabriqué
mastery: Arc
craft_category: Travail du bois
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, archétype-Flèche-à-produire, conditions-cachées-Maître]
---

# 🏹 Arc — Archétype-référence

> Deuxième archétype d'arme livré dans la *Descente des couches concept→artefacts*. Pose les **patterns canoniques** des armes à distance et de la catégorie de craft *Travail du bois*. Cousin direct de [[Épée à une main]] : reprend la même grille de tiers, les mêmes 10 variants cosmiques, et les mêmes 13 affixes baseline (en y ajoutant 4 affixes spécifiques distance).

> [!important] Note transversale — Flèches
> Les **Flèches** sont une **catégorie d'item munition séparée** ([[Catégories d'Items]] §Munitions). Cet archétype Arc **ne couvre PAS** le détail des flèches : un futur archétype dédié *Flèche* doit être produit (par P2.X — voir [[Items - Index]] §Phase 2). Les renvois explicites *(→ Archétype Flèche)* dans ce document marquent les zones de complément à venir.

---

## 1. Vue d'ensemble

L'**arc** est l'arme de **distance canonique** d'Hybelior. Là où l'épée définit le **mètre étalon de la mêlée**, l'arc définit celui du **distance physique** : tempo posé, contrôle de l'espace, dépendance à la munition (Flèche), forte récompense à l'investissement Vivacité+Acuité. Culturellement, c'est l'arme du **chasseur**, du **tireur d'élite**, de l'**éclaireur** ; certaines tribus en font l'arme de cérémonie (mariages, rites de passage). Côté gameplay, sa Maîtrise [[Armes et Maîtrise#Arc|Arc]] structure une école entièrement basée sur **le timing d'armement** (charge en tension), **la lecture de distance** et **la gestion de munitions**.

> [!info] Rôle dans le système
> L'arc est **l'unique arme de distance physique de l'archétype** (les Sceptres font le distance magique via le [[Le Lien|Lien]]). Il ne se compare pas directement à l'épée 1H — il se compare à **lui-même au cours des tiers**. C'est pour ça qu'il pose le **pattern référence** des armes 2H Distance, à dériver vers d'éventuelles arbalètes ou frondes ajoutées plus tard.

---

## 2. Variations / sous-types

| Sous-type | Profil de gameplay | Ancrage culturel typique | Modificateur baseline |
|-----------|-------------------|--------------------------|-----------------------|
| **Arc court** | Cadence rapide, portée réduite, mobilité élevée (peut tirer en marchant) | Éclaireurs, traqueurs, archers à cheval | Dégâts ×0.85 · Cadence ×1.25 · Portée ×0.7 · Stamina/tir ×0.85 |
| **Arc long** *(baseline canonique)* | Référence neutre — toutes les valeurs des tables tier ci-dessous | Archers de guerre, tireurs réguliers | Dégâts ×1.0 · Cadence ×1.0 · Portée ×1.0 · Stamina ×1.0 |
| **Arc composite** | Lent à armer mais dégâts amplifiés, perçant accru | Forgerons-archers nobles, ordres militaires établis | Dégâts ×1.20 · Cadence ×0.85 · Portée ×1.10 · Stamina ×1.15 · Anti-armure +15% |
| **Arc de chasse** | Optimisé pour faune, applique *Saignement* léger natif | Chasseurs civils, peuples des bois | Dégâts ×0.95 · Cadence ×1.05 · Bonus dégâts faune +20% · *Saignement* gratuit T1 |
| **Arc cérémoniel** *(rare)* | Dégâts faibles, mais bonus social + canalisation Voie | Prêtres, danseurs rituels, ambassades | Dégâts ×0.75 · Cadence ×1.0 · *Affixe Aura de présence* gratuit · Canalisation Voie +5% |

> [!note] Pourquoi 5 sous-types
> L'arc admet une **variabilité culturelle plus forte** que l'épée parce qu'il est **moins standardisé en doctrine martiale** (chaque culture chasseuse a son propre profil). On garde quand même l'**Arc long** comme baseline canonique pour rester aligné avec l'épée longue de [[Épée à une main]] §2.

---

## 3. Stats par tier — table chiffrée canonique

> [!important] Cohérence avec [[Épée à une main]]
> Cette table **réutilise la grille de multiplicateurs de tier** posée par l'épée 1H (×1.00 / ×1.30 / ×1.70 / ×2.20 / ×2.80 / ×3.60 sur les dégâts). Les valeurs absolues sont **différentes** (tempo de l'arc différent du tempo épée), mais la **courbe** est identique pour cohérence inter-armes.

### Table absolue — Arc long (baseline canonique)

| Tier | Dégâts base/flèche | Cadence (tirs/s, sans armement) | Temps d'armement plein | Critique base | Portée effective | Durabilité (pts) | Coût Stamina/tir |
|------|--------------------|----|----|---------------|------------------|------------------|------------------|
| **T1 Commun** | **55** | 0.80 | 1.4 s | 8% | 30 m | 180 | 12 |
| **T2 Façonné** | 72 | 0.82 | 1.35 s | 8% | 35 m | 250 | 12 |
| **T3 Œuvré** | 94 | 0.85 | 1.30 s | 9% | 42 m | 340 | 12 |
| **T4 Magistral** | 121 | 0.88 | 1.25 s | 10% | 50 m | 450 | 11 |
| **T5 Légendaire** | 154 | 0.92 | 1.20 s | 12% | 60 m | 580 | 11 |
| **T6 Mythique** | 198 | 0.96 | 1.15 s | 14% | 75 m | 770 | 10 |

> [!note] Pourquoi dégâts base arc > dégâts base épée 1H
> Une flèche tirée ne touche **pas systématiquement** sa cible (mouvement, distance, lecture du tir). L'épée 1H, elle, frappe à chaque coup donné. Pour compenser le **risque de rater**, on monte le dégât-au-touché de l'arc d'environ **+35% vs épée 1H** au tier équivalent. À playtest, ce ratio peut bouger, mais la philosophie reste : *arc = haut risque / haute récompense par tir*.

### Critique sur arc — règle spécifique

L'arc bénéficie d'un **bonus crit zone** :
- **Tir à la tête / point faible** : ×2.5 dégâts (vs ×1.5 + Acuité/20 standard)
- **Tir à pleine tension** : crit% +5% (vs cadence libre)
- **Tir en mouvement** : crit% −3% (sauf Maîtrise Expert+ qui annule ce malus)

Ces règles font de l'arc l'arme la plus **récompensante en Acuité brute** ([[Personnage]]).

### Formule de dégâts canonique (s'applique à l'arc)

```
Dégâts effectifs = (Dégâts base arc × Mult. flèche) × (1 + Vivacité × 0.003 + Acuité × 0.003)
                                                    × Maîtrise_Arc
                                                    × Mult. crit éventuel
                                                    × Mult. tension d'armement
                                                    × Mult. variant cosmique
                                                    × (1 - Réduction armure cible)
```

Détail des termes (différences vs formule épée 1H) :
- **Mult. flèche** : 0.7 (flèche entraînement) → 1.0 (flèche standard) → 1.3 (flèche perçante T3) → ... — *(détail dans Archétype Flèche, à produire)*
- **Vivacité × 0.003 + Acuité × 0.003** : l'arc scale sur **deux stats à parts égales** (vs Vigueur seule pour l'épée). Total 0.6%/pt cumulé ≈ même magnitude que les 0.5%/pt Vigueur de l'épée
- **Mult. tension d'armement** : 0.5 (relâché immédiatement) → 1.0 (mi-tension) → 1.4 (pleine tension, fenêtre verte 0.3s)

> [!tip] Build canonique arc
> *"Vivacité + Acuité"* est le binôme évident. Endurance suit pour le pool stamina (12 pts/tir × cadence ≈ 9.6 pts/s). Mémoire pour la maîtrise. Vigueur reste utile pour le port de charge (carquois lourd).

### Mapping vers stats brutes

| Stat | Effet sur l'arc |
|------|-----------------|
| **Vigueur** | Permet de bander un arc lourd (composite). Capacité de port flèches | 
| **Vivacité** | Source principale du scaling dégâts (avec Acuité) + cadence + vitesse de marche en tirant |
| **Endurance** | Pool stamina pour rafales longues, tenue à pleine tension |
| **Acuité** | Source co-principale du scaling dégâts + crit% + multiplicateur crit |
| **Esprit / Résonance** | Sans effet direct sauf arc cérémoniel (canalisation Voie) |
| **Mémoire** | Vitesse de gain de Maîtrise *Arc* (×2 si Mémoire focus) |
| **Verbe** | Sans effet direct |

### Durabilité — règle canonique

- **Perte par tir** : 1 pt (tir standard), 2 pts (tir à pleine tension), 3 pts (tir relâché en mouvement, désalignement de la corde)
- **Climat** : durabilité réduite −0.5%/heure en zones humides ou très chaudes (synergie variants)
- **À 50% durabilité** : −10% portée et dégâts, corde émet un grincement
- **À 0** : corde casse — l'arc reste équipé mais inutilisable jusqu'à recordage (≈10% du coût d'origine)

> [!warning] CHANTIER : recordage vs réparation forgeron
> L'arc ne se *répare* pas en forge — il se **recorde** (changement de corde) chez un menuisier ou par soi-même avec une *Corde* (composant fabriqué — voir [[Sources de Ressources]] §Fabrication ; à ajouter explicitement Phase 3). Coût à fixer : proposition de travail = 1 *Corde* + 5–30 Éclats selon tier.

---

## 4. Damage types

L'arc produit **un seul type de dégâts physiques par défaut** :

| Type | Quand | Pourcentage |
|------|-------|-------------|
| **Perçant** | Tout tir standard, peu importe le sous-type | 100% |

> [!note] Pas de tranchant à l'arc
> La pointe de flèche est par nature perçante. Le *tranchant* n'existe que via flèches spécialisées (flèche-lame). Voir → Archétype Flèche.

### Damage types via flèche (extensible)

L'arc **délègue son damage type à la flèche**. Une flèche élémentaire (Feu, Givre, Foudre) transforme une partie des dégâts. Une flèche-lame ajoute du tranchant. Une flèche perforante amplifie l'anti-armure.

→ **Voir Archétype Flèche** (à produire) pour le détail. Cet archétype Arc précise seulement que **toute interaction flèche-élémentaire ou flèche-spéciale** passe par la **table de damage types de la flèche**, multipliée par le mult arc.

### Damage types via affixes (sur l'arc lui-même)

L'arc peut être enchanté pour ajouter un type élémentaire **fixe**, indépendant de la flèche utilisée. Voir §5.

---

## 5. Affixes typiques (catalogue spécifique)

> [!important] Catalogue arc = baseline mêlée + 4 spécifiques distance
> Réutilise les **13 affixes baseline** définis dans [[Épée à une main]] §5 (Tranchant adapté en Perçant, Saignement, Critique, Stagger renforcé, Bonus Maîtrise, 3 Élémentaires, Résonance d'âme, Aura de présence). Voir tableau là-bas pour le détail.

### Affixes spécifiques distance (additions à la baseline)

| Affixe | Effet | Tier min | Fréquence | Notes |
|--------|-------|----------|-----------|-------|
| **Vol de la flèche +X%** | +5/10/15/20% portée effective | T1 | Commun | L'affixe par défaut de l'arc — équivalent du Tranchant pour l'épée |
| **Tension rapide** | Temps d'armement −10/15/20/25% | T2 | Commun | Synergie avec builds Vivacité |
| **Œil d'aigle** | Bonus crit% en zone *tête/point faible* +10/15/20% | T3 | Rare | Build sniper |
| **Carquois sans fond** *(rare)* | 5% chance de ne pas consommer la flèche | T4 | Rare | Très puissant économiquement |
| **Tir multiple** *(spécial signature)* | Tire 2 flèches simultanément (chacune fait 60% des dégâts) | T5 | Très rare | Affixe signature — niche, build crowd-control |
| **Tir traceur** *(spécial)* | La flèche s'oriente vers la cible verrouillée (anti-mouvement) | T4 | Rare | Synergie avec [[Combat]] §Lock-on |

### Règles d'apposition d'affixes

Identiques à [[Épée à une main]] §5 (mêmes paliers d'apposition par tier). Les 13 affixes baseline + les 6 affixes distance = pool de **19 affixes** dans lesquels piocher pour un arc craft. Au tier T6 Mythique, l'affixe **signature** est forcément un affixe distance (Tir multiple, Tir traceur, ou un nouveau créé pour la signature spécifique).

---

## 6. Recettes (Travail du bois)

> [!note] Recettes Travail du bois — pattern canonique
> L'arc est l'archétype-référence de la catégorie [[Crafts]] §Travail du bois et de la pierre. Il pose la grille équivalente à celle de [[Épée à une main]] §6 mais pour les **menuisiers / luthiers d'arc**. Métiers : Menuisier (principal), Charpentier (renfort), Bûcheron (intrants).

### Recette T1 — Arc long de bois commun

```yaml
tier: 1
métier: Menuisier
mastery_required: Novice (palier 1)
station: Établi de menuiserie + Scie
intrants:
  - Bois × 3              # essence commune (chêne, frêne)
  - Cuir tanné × 1        # poignée
  - Corde × 1             # voir Sources fabrication (à formaliser)
durée: 90 s gameplay
mini_jeu: coupe_précise (séquencement 3 entailles, fenêtre verte 1.5s)
sortie: Arc long de bois (T1 Commun)
sortie_qualité: Commun
```

### Recette T2 — Arc long façonné

```yaml
tier: 2
métier: Menuisier
mastery_required: Initié (palier 2)
station: Établi de menuiserie + Scie + Étuve (chauffe vapeur pour cintrage)
intrants:
  - Planche × 2           # bois travaillé, courbure préparée
  - Bois × 1              # noyau
  - Cuir tanné × 1
  - Corde × 1
  - Sève × 1              # imperméabilisation
durée: 180 s
mini_jeu: cintrage_vapeur (timing température) + coupe_précise + tension_corde
sortie: Arc long façonné (T2)
```

### Recette T3 — Arc long œuvré

```yaml
tier: 3
métier: Menuisier (palier Adepte) + Tanneur (corde renforcée)
mastery_required: Adepte (palier 3) en Travail du bois
station: idem T2 + Établi cuir
intrants:
  - Planche d'essence noble × 2  # cœur de chêne, if, tisser-bois
  - Bois × 1
  - Cuir tanné fin × 1
  - Corde renforcée × 1   # corde tressée fil métallique + soie
  - Sève traitée × 1
  - Plume × 1             # encoche, équilibrage tir
durée: 360 s
mini_jeu: cintrage_vapeur + tension_corde + équilibrage_arc (3 mini-étapes)
sortie: Arc long œuvré (T3)
```

### Recette T4 — Arc long magistral

```yaml
tier: 4
métier: Menuisier (Expert) + Enchanteur (optionnel)
mastery_required: Expert (palier 4) en Travail du bois
station: idem + Cercle d'enchantement (si enchanté)
intrants:
  - Planche d'essence noble × 3
  - Bois cosmique × 1     # bois d'ère active (verdoyant, brulé, frost...)
  - Cuir tanné fin × 1
  - Corde maître × 1      # tressage soie + fil métallique précieux
  - Sève traitée × 1
  - Cœur de plante × 1    # composant magique végétal
  - Plume cosmique × 1    # plume créature haut tier
  - (Cristal de Voie × 1, optionnel — pour affixe élémentaire)
durée: 900 s (15 min)
mini_jeu: cintrage_vapeur (5 cycles, fenêtre 0.6s) + tension_corde
            + équilibrage_arc + (rituel d'enchantement si applicable)
sortie: Arc long magistral (T4) — prérequis Accord 50%+ pour équiper
```

### Recette T5 — Arc long légendaire

```yaml
tier: 5
métier: Menuisier Maître (palier 5) + Enchanteur (palier 4+)
mastery_required: Maître Travail du bois + Expert Enchantement
station: Atelier de luthier d'arc + Cercle d'enchantement + composant ère
intrants:
  - Planche cosmique × 3 (essence d'ère active)
  - Bois cosmique × 2
  - Cuir tanné fin × 2
  - Corde mythique × 1    # tressage soie + fil cosmique + essence spirituelle
  - Cœur de creature × 1 (créature haut tier — voir [[Bestiaire - Index]] Phase 4)
  - Plume cosmique × 2
  - Essence spirituelle × 1
  - Cristal de Voie × 1
durée: 1800 s (30 min)
mini_jeu: chaîne complète + condition cachée 🔒 (parfois : crafter dans un bosquet sacré pendant ère Verdoyant/Communion)
sortie: Arc long légendaire (T5) — prérequis Accord 75%+
```

### Recette T6 — Arc long mythique

```yaml
tier: 6
métier: Menuisier Maître + Enchanteur Maître + condition cachée 🔒
mastery_required: Maître + œuvre signée déjà existante au palier 5
station: Atelier unique d'une nation (ex. luthiers de Galenor — Phase 4)
intrants:
  - Bois d'un Arbre-Cœur (asset cosmique unique, drop event)
  - Corde mythique forgée × 1
  - Cœur d'un boss mondial × 1
  - Cristal de Voie maître × 1
  - Composant signature lié au lore
durée: variable, plusieurs ères de préparation
mini_jeu: aucun standard — quête de fabrication scénarisée
sortie: Arc mythique signé — Héritage permanent ([[L'Accord]])
```

> [!note] Pattern réutilisable Travail du bois
> La progression d'intrants (Bois ×3 / Planche ×2+Bois / Planche noble ×2 / Planche noble ×3+cosmique / Planche cosmique ×3 / asset unique) et la durée (90s → 180s → 360s → 900s → 1800s → variable) sont les **canoniques Travail du bois**. À reprendre pour l'archétype Bouclier (lame plate de bois recouverte) et pour la hampe des armes hybrides (Lance, Hache, Marteau — où la hampe en bois représente une recette parallèle à la tête métal). Pour l'archétype Bouclier toutefois, la **classe matériau** dominante peut basculer vers la Forge (boucliers métal) ou Maroquinerie (boucliers cuir) — à arbitrer par l'agent Bouclier.

### Lien avec les Flèches (recettes parallèles)

> [!important] Renvoi : Archétype Flèche
> Les flèches ont leur **propre catégorie de recettes** (Travail du bois pour la hampe + Forge pour la pointe + parfois Plumeur pour l'empennage). C'est un sujet à part entière. → **À produire dans un archétype dédié *Flèche*** par un futur agent Phase 2.

---

## 7. Variants cosmiques (10 variants par ère)

> Mappage canonique des [[Les Ères|10 variants cosmiques]] sur l'arc. Réutilise la liste des entités/ères posée par [[Épée à une main]] §7 ; les **modificateurs gameplay** sont adaptés au tempo et à la nature distance de l'arc.

| Variant | Ère/Entité | Effet visuel | Modificateur gameplay |
|---------|------------|--------------|------------------------|
| **Shadow** *(Noctis)* | Ombre Longue, Brume Mortelle | Bois noir, corde absorbant la lumière | +20% dégâts en ombre, −15% en plein soleil. Affixe gratuit *Tir traceur* léger (ne s'oriente pas mais pardonne 5° d'erreur visée) |
| **Spectral** *(Tempora)* | Échos Brisés | Arc translucide, corde spectrale, flèches laissent un écho derrière elles | +20% chance de **traverser une garde** (les flèches passent à travers boucliers à coup % près). Dégâts −10%. Anti-bouclier |
| **Frost** *(Aquor froid / Climata)* | Sommeil de Glace | Givre permanent sur l'arc, corde rigide | +20% dégâts Givre. Ralentit cible 15% pdt 2s. Cadence −10% (rigidité) mais portée +10% |
| **Verdoyant** *(Spiritus + Terranu)* | Verdoiement, Communion | Lierre vivant enroulé, l'arc "respire" | Régen Stamina +1 pt/s pendant 5s après chaque kill (économie de tirs). Dégâts contre faune +10%, −10% contre humanoïdes |
| **Brulé** *(Voie de Feu / Eldoria)* | Feu Endormi | Braises sur la lame d'arc, flèches s'enflamment au tir | +25% dégâts Feu. Applique *Brûlure* DoT 1%/s 3s. Consomme 1 pt durabilité supp/tir |
| **Pourpre** *(Umbra)* | Crépuscule Pourpre, Brume Mortelle | Aura pourpre, brume sortant à chaque tir | +15% dégâts en zone faible luminosité. Premier tir d'un combat +20% dégâts (élément surprise) |
| **Doré** *(Eldoria)* | Rêve Lumineux, Crépuscule | Arc doré, corde lumineuse, flèches laissent une traînée solaire | +20% dégâts contre Shadow/Spectral/Pourpre. Soigne 3 pts HP par crit. Visible à très longue distance (malus furtivité) |
| **Brisé** *(Tempora aigu)* | Échos Brisés en pic | Arc craquelé qui semble se réparer/casser à chaque tir | Dégâts variables ±35% (RNG par tir), affixe *Critique +8%* gratuit. 5% chance de tir double aléatoire (vs *Tir multiple* contrôlé) |
| **Onirique** *(Somnix)* | Sommeil Onirique | Couleurs irréelles, sons amortis, flèches semblent flotter | Endort cible 5% du temps (1.5s). Dégâts contre cibles éveillées −10%. Synergie Voie onirique |
| **Vénérable** *(Fatum)* | Présages | Marques runiques sur l'arc, gravures vivantes | Crit% +5% gratuit. Premier tir de chaque combat = crit garanti (synergie Acuité) |

> [!tip] Combo arc cosmique
> Un **arc long Doré** + flèche élémentaire Feu + affixe *Œil d'aigle* + tir tête → ×2.5 crit zone × 1.20 doré × 1.25 brulé × 1.15 œil d'aigle ≈ **dégâts ×4.3 sur le bon tir**. Le snipe critique devient un véritable burst.

---

## 8. Exemples de signatures (PHASE 4 stub — exemples par grand pays)

> [!warning] CHANTIER PHASE 4 : ces signatures sont des **stubs** narratifs
> Phase 4 produira des **dossiers complets** par item signature.

### Galenor (continent boisé central, peuples chasseurs)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Le Long-Souffle de Galenor** | Mythique (T6) | Arc taillé dans un Arbre-Cœur tombé à l'Arrachement. Sa corde est faite des cheveux d'une Cosmique disparue | Affixe signature *Souffle de Spiritus* : régénère 5 pts Mana par tir si Voie de Spiritus active. Portée +20m. Ne peut être perdu (ne tombe jamais à la mort) |
| **Œil-de-Forêt** | Légendaire (T5) | Arc cérémoniel des druides de Galenor. La corde chante quand la cible est masquée | Détection des cibles invisibles dans 30m. *Tir traceur* gratuit. Bonus dégâts contre faune corrompue +30% |
| **Arc-de-Chasse de Vellen** | Magistral (T4) | Arc nominé du chasseur historique Vellen, conservé au temple de la Communion | +25% dégâts au premier tir d'un combat (ouverture de chasse) |

### Endora (royaume méridional, garde royale)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Garde-Vigil** | Légendaire (T5) | Arc des sentinelles d'Avalor, jamais perdu en bataille | +30% dégâts contre cibles non-alignées avec l'ère active (Délié-leaning). Affixe *Aura de présence* gratuit |
| **Arc Composite Royal** | Magistral (T4) | Arc d'apparat de la garde montée d'Endora | Dégâts +15% en sprint ou monture |

### Veshrim (territoire ancien royaume oriental)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Aiguille-de-Veshrim** | Légendaire (T5) | Arc spectral retrouvé dans les Cratères du Cardinal | Variant *Spectral* permanent (traverse les gardes). +20% dégâts contre boss/élites |
| **Arc des Sept Tours** | Magistral (T4) | Un des sept arcs cérémoniels de l'ancien royaume | Bonus +1 palier effectif Maîtrise *Arc* tant que porté pendant ère Tempora-dominante |

### Cestra (côtes, marais, corsaires)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Arc-Brume de Cestra** | Magistral (T4) | Arc fait par les chasseurs des marais, corde traitée à l'algue | Variant *Pourpre* atténué + bonus dégâts en zone marécageuse +20% |
| **Récif-Long** | Légendaire (T5) | Arc utilisé pour la chasse aux créatures aquatiques rares | Bonus contre faune aquatique +30%. Tir au-dessus de l'eau ne perd pas en portée |

### Tribu nomade des Plaines (peuples sans pays canonique)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Arc court de la Course** | Œuvré (T3) | Standard de qualité des cavaliers nomades | Cadence +15% en mouvement. Pas de malus crit en mouvement |

> [!note] Pattern signatures arc — diversité accrue
> L'arc admet **plus de variation par culture** que l'épée (chaque peuple chasseur a son archétype d'arc spécifique). Les autres agents qui produiront des armes plus universelles (épée 2H, marteau, lance) peuvent revenir à 2-3 signatures par pays comme l'épée 1H. L'arc est une **exception légitime**.

---

## 9. Mini-jeu de combat (branchement [[Combat]])

### Moveset baseline (Maîtrise Novice)

- **Tir simple (LMB)** : encoche + relâche immédiate, dégâts ×0.5 (tension faible). Coût stamina 12, cadence 0.8/s
- **Tir armé (LMB tenu)** : maintien du LMB → jauge de tension monte → relâcher dans la **fenêtre verte 0.3s** = pleine tension (dégâts ×1.4). Coût stamina 12 + 1 pt/0.5s tenu
- **Tir lourd (Shift + LMB)** : tension forcée pleine, ne peut pas être interrompu. Coût stamina 25
- **Esquive (Espace + direction)** : 4 directions, IFrames 0.40s ([[Combat]]). Annule le tir armé en cours
- **Mêlée d'arc (RMB)** : coup de bois en mêlée si ennemi colle. Dégâts contondants 30% des dégâts d'arc, coût 15 stamina. *Anti-rush* canonique de l'archer

### Combos / capacités débloqués par palier de Maîtrise

| Palier | Combo / capacité débloquée |
|--------|----------------------------|
| **Novice** | Tir simple, tir armé, mêlée d'arc |
| **Initié** | Tir lourd disponible. 1ère compétence active : *Tir précis* (tir avec viseur ralenti 2s, coût 40 stamina, CD 8s, garantit pas de dispersion) |
| **Adepte** | Passif *Anticipation* : la jauge de tension se charge 15% plus vite. Compétence *Tir empoisonné* (utilise 1 *Venin* du carquois, applique *Poison* DoT 2%/s 5s) |
| **Expert** | Suppression du malus crit en mouvement. Compétence *Pluie de flèches* (zone 5m, 4 flèches consommées, 80 stamina, 25s CD) |
| **Maître** 🔒 | Technique signature *Flèche du Cycle* (150 stamina, 90s CD, tir qui traverse jusqu'à 5 cibles alignées, applique *Saignement profond* + *Stagger lourd* sur la dernière) |

### Coûts stamina (référence canonique [[Combat]])

- Tir simple : 12 pts (plancher 6 à Maîtrise Maître + Vivacité haute)
- Tir armé pleine tension : 12 + 2 (au relâchement) = 14 pts
- Tir lourd : 25 pts (plancher 12)
- Esquive : 20 pts (plancher 14)
- Compétence basique (*Tir précis*) : 40 pts, CD 8s

### Fenêtres temporelles spécifiques arc

| Fenêtre | Durée | Effet |
|---------|-------|-------|
| **Tension faible → mi-tension** | 0.0–0.7s | Dégâts ×0.5 → ×0.85 (interpolé linéaire) |
| **Mi-tension → pleine tension** | 0.7–1.4s | Dégâts ×0.85 → ×1.0 |
| **Fenêtre verte** *(pleine tension parfaite)* | 1.4–1.7s | Dégâts ×1.4 (×0.4 bonus pleine tension) — **le sweet spot canonique de l'arc** |
| **Surtension** | >1.7s | La main tremble — dispersion +5° + stamina drain 2 pts/s |

> [!tip] Arc = arme de timing
> Là où l'épée 1H récompense le **rythme combo**, l'arc récompense le **timing de relâchement**. C'est l'**anti-spam canonique** : un joueur qui mitraille à tension faible fait moitié dégâts pour le même coût stamina. La maîtrise = tenir la tension.

### Synergies (loadout)

- **Arc + Dague (en main gauche, swap rapide)** : préparé à l'attaque rapprochée si rush. Style "éclaireur"
- **Arc + Sceptre (alterné)** : build hybride distance physique/magique pour Liés ([[Le Lien]])
- **Arc cérémoniel + Voie active** : les flèches deviennent canalisateur de sort ; sortilèges à coût Mana réduit −10% pendant 5s post-tir

---

## 10. Décisions ouvertes / chantiers de profondeur

### Décisions actées par cet archétype (canon pour les autres armes distance / Travail du bois)

- ✅ Multiplicateurs de tier identiques à [[Épée à une main]] : ×1.0 / ×1.30 / ×1.70 / ×2.20 / ×2.80 / ×3.60 sur les dégâts
- ✅ Dégâts arc ≈ +35% vs épée 1H au tier équivalent (compense risque de rater)
- ✅ Formule arc : `Base × Mult.flèche × (1 + Vivacité×0.003 + Acuité×0.003) × Maîtrise × Crit × Tension × Variant × (1 - réduc)`
- ✅ Scale stat brute : **Vivacité + Acuité à parts égales** (vs Vigueur seule pour mêlée)
- ✅ Crit zone : ×2.5 (vs ×1.5 + Acuité/20 standard mêlée)
- ✅ Mécanique de tension d'armement : 4 fenêtres (faible/mi/pleine/surtension), pleine tension = sweet spot ×1.4
- ✅ Durabilité par tier : 180 / 250 / 340 / 450 / 580 / 770 pts. Réparation = recordage chez menuisier (vs forgeron pour épée)
- ✅ Affixes : 13 baseline (héritées de l'épée) + 6 spécifiques distance = 19 dans le pool
- ✅ Recettes Travail du bois : intrants Bois ×3 / Planche ×2 / Planche noble ×2 / Planche noble ×3+cosmique / Planche cosmique ×3 / asset unique. Durées identiques épée (90/180/360/900/1800/variable)
- ✅ 10 variants cosmiques mappés (mêmes 10 que l'épée mais effets adaptés au distance)
- ✅ 5 sous-types canoniques (vs 4 + 1 variant pour épée — l'arc admet plus de variabilité culturelle)

### Chantiers ouverts pour cet archétype

> [!warning] CHANTIER MAJEUR : Archétype Flèche à produire séparément
> Cet archétype renvoie **massivement** vers un futur archétype *Flèche* (catégorie munition). Sans lui, l'arc est partiellement spec-only. À assigner Phase 2 à un agent dédié. Suggestion structure : 1 archétype Flèche couvrant **types de pointes** (perçante / large / élémentaires) + **hampes** (bois standard / bois noble / hampe creuse) + **empennages** (plume standard / plume cosmique). Multiplicateurs flèche → arc : 0.7 (entraînement) → 1.0 (standard) → 1.3 (perçante T3) → 1.5 (cosmique T5) à valider.

> [!warning] CHANTIER : Corde comme ressource fabriquée
> [[Sources de Ressources]] §Fabrication ne liste pas explicitement *Corde*. Proposition : ajouter **Corde** (16e ressource fabriquée) avec recette Tisserand (Laine plante + Fil métallique → Corde) ou Cordier dédié. Tiers de corde alignés sur tier d'arc. À arbitrer Phase 3.

> [!warning] CHANTIER : conditions cachées 🔒 du palier Maître
> Propositions de travail (à choisir/affiner Phase 3) :
> - Toucher 100 cibles à pleine tension consécutivement sans rater
> - Tuer un boss mondial à plus de 50m de distance, sans esquive nécessaire
> - Réussir 50 tirs critiques tête sans toucher une seule cible ailleurs
> - Crafter son propre arc magistral et tuer avec lui un Délié

> [!warning] CHANTIER : interactions arc + monture
> [[Combat]] et [[Personnage]] mentionnent les montures comme partie de l'héritage. L'arc à cheval (cadence +15%, malus précision −15% sauf Maîtrise Expert) est un cas particulier à formaliser quand l'archétype *Monture* sera produit (Phase 2 ou 3).

> [!warning] CHANTIER : équilibrage de l'Arc cérémoniel
> Le sous-type *Arc cérémoniel* a un profil très niche (dégâts faibles, social/Voie). Risque que personne ne l'utilise. Proposition : en faire un item à **forte valeur narrative** sans valeur combat (cosmétique-leaning), pour éviter de le devoir balance comme arme de combat principal.

### Notes pour les autres agents Phase 2 armes

> [!important] Pattern arc → autres armes distance (futures arbalètes / frondes / armes de jet)
>
> L'arc est l'unique arme de distance physique de l'archétype catalogue. Si plus tard on ajoute :
> - **Arbalète** : utiliser le pattern arc, mais ×0.5 cadence, ×1.5 dégâts, suppression de la mécanique de tension (remplacée par armement en 2 phases : armer puis tirer). Forge **et** Travail du bois (intrants mixtes).
> - **Fronde** : utiliser le pattern arc avec ×2 cadence, ×0.6 dégâts, perçant remplacé par contondant. Catégorie de craft : Travail du cuir + Travail du bois.
> - **Couteau de jet** : non-archétype distance dédié — relève d'une variante de Dague (à arbitrer avec l'agent Dague).
>
> **Pour les agents armes mêlée** (épée 2H, hache 1H/2H, marteau 1H/2H, lance, rapière, dague, sceptre) :
> - **Reprenez la grille de tiers** posée par [[Épée à une main]] §3 (multiplicateurs identiques)
> - **Reprenez les 13 affixes baseline** de [[Épée à une main]] §5
> - **Reprenez la grille de recettes Forge** de [[Épée à une main]] §6 (durées et progression d'intrants)
> - **Reprenez les 10 variants cosmiques** de §7 (mêmes 10 ères-entités, effets à adapter à votre arme)
> - **Pour la table d'écarts vs épée 1H**, voir [[Épée à une main]] §10
>
> **Pour l'agent Sceptre** : cas spécial — arme physique 1H **+ amplificateur magique**. Reprendre baseline mais ajouter un axe **bonus canalisation Voie** (cf. arc cérémoniel pour la philosophie). Métier de craft hybride : Forge (tête métal/cristal) + Travail du bois (hampe) + Scriptorium (gravures rituelles).
>
> **Pour l'agent Bouclier** : arme défensive plutôt qu'offensive — la table tier porte sur **Block %, Stagger absorbé, Durabilité, Stamina drain en parade tenue** plutôt que sur dégâts. À reprendre une grille distincte mais cohérente avec les multiplicateurs de tier ×1.30/×1.70/×2.20…

### Cross-références à venir

- **Archétype Flèche** (Phase 2, à assigner) — bloque l'usabilité complète d'arc
- **Archétype Bouclier** (Phase 2) — comparaison défensive
- **Archétype Sceptre** (Phase 2) — distance magique, complément
- **Métier Menuisier** (Phase 2) — détaillera le mini-jeu *coupe précise* + *cintrage vapeur*
- [[Bestiaire - Index]] (Phase 4) — créatures qui drop *Plume cosmique* / *Cœur de creature* haut tier
- [[Architecture Data-Driven]] — Recipe Generator + ItemModifier Generator paramètreront

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Armes et Maîtrise]] · [[Combat]] · [[Personnage]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Économie]] · [[Épée à une main]]*
