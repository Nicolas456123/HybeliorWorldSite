---
tags: [item, archétype, arme, mêlée-2H, lance]
type: archetype
category: Arme
subcategory: Mêlée 2H
source: Fabriqué
mastery: Lance
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-allonge-anti-charge, conditions-cachées-Maître]
---

# 🔱 Lance — Archétype

> Arme 2H **d'allonge et d'anti-charge**. Hérite des patterns de [[Épée à une main]] (grille tier, formule, 13 affixes, 10 variants). **Dégâts +25%, vitesse −5%, stagger +5%, allonge +50%, perçant pur 100%, anti-charge gratuit**. Recettes Forge (tête) + [[Crafts]] §Travail du bois (hampe). Voir [[Catégories d'Items]] · [[Armes et Maîtrise#Lance]].

---

## 1. Vue d'ensemble

La **lance** est l'arme de **contrôle d'espace** d'Hybelior. Là où les autres armes mêlée se définissent par leur dégât ou leur stagger, la lance se définit par sa **portée** : 50% d'allonge supplémentaire en fait l'arme la plus longue du catalogue mêlée. Culturellement, c'est l'arme du **soldat de phalange**, du **garde-mur**, du **chasseur de gros gibier**, du **piquier d'élite** ; elle structure les doctrines de défense urbaine et les formations de combat. Sa Maîtrise [[Armes et Maîtrise#Lance|Lance]] privilégie le **timing d'estoc** et l'**anti-charge** (multiplicateur de dégâts ×2 sur cible chargeant le porteur).

> [!info] Position dans la mêlée canonique
> **Dégâts ×1.25 vs épée 1H · Vitesse ×0.95 · Stagger ×1.05 · Allonge ×1.50 · Perçant 100%** · Affixe natif *Anti-charge* (×2 dégâts sur cible en sprint vers le porteur).

---

## 2. Variations / sous-types

| Sous-type | Profil | Ancrage culturel | Modificateur baseline |
|-----------|--------|------------------|-----------------------|
| **Lance courte** *(javelot épaissi)* | Allonge réduite, jet possible | Éclaireurs, chasseurs de plaine | Dégâts ×0.85 · Allonge ×1.25 · Jet possible (10m) |
| **Lance de soldat** *(baseline)* | Référence neutre — phalange | Soldats réguliers, gardes urbains | Dégâts ×1.0 · Allonge ×1.0 |
| **Pique** *(longue)* | Allonge maximale, anti-cavalerie | Phalangistes, défenseurs de mur | Dégâts ×1.05 · Allonge ×1.20 · Vitesse ×0.85 · Anti-monture +50% |
| **Hallebarde** *(hybride)* | Tête combinée pointe+lame, polyvalente | Gardes royaux, bourreaux d'élite | Dégâts ×1.15 · 60% Perçant + 40% Tranchant · Anti-armure +10% |
| **Trident** *(rare)* | Tête trifide, désarmement amélioré | Cestra, gladiateurs | Dégâts ×0.95 · Désarmement +15% · Bonus contre cibles aquatiques +20% |

---

## 3. Stats par tier

> [!important] Dérivation depuis [[Épée à une main]] §3
> Multiplicateurs identiques. Valeurs absolues = épée 1H × 1.25 dégâts, ×0.95 vitesse. Mais : **lance = arme 2H** → on prend la base **épée 2H × 0.85 dégâts** pour rester cohérent (lance = épée 2H allégée + allonge).

### Table absolue — Lance de soldat

| Tier | Dégâts/coup | Vitesse (coups/s) | Allonge (m) | Critique base | Stagger | Durabilité | Stamina/coup |
|------|-------------|-------------------|-------------|---------------|---------|------------|--------------|
| **T1 Commun** | **50** | 1.14 | 3.0 | 5% | 26 | 200 | 9 |
| **T2 Façonné** | 65 | 1.16 | 3.0 | 5% | 28 | 280 | 9 |
| **T3 Œuvré** | 85 | 1.19 | 3.1 | 6% | 31 | 380 | 9 |
| **T4 Magistral** | 110 | 1.22 | 3.2 | 7% | 36 | 500 | 9 |
| **T5 Légendaire** | 140 | 1.26 | 3.3 | 8% | 43 | 650 | 9 |
| **T6 Mythique** | 180 | 1.30 | 3.4 | 10% | 51 | 850 | 8 |

### Anti-charge canonique

Si une cible **sprint vers le porteur** dans un cône frontal de 60°, une attaque légère ou lourde réussie inflige **×2 dégâts** + applique *Stagger lourd* automatique. Mécanique unique au catalogue. Annulé si la cible parade ou esquive le coup.

---

## 4. Damage types

| Type | Pourcentage |
|------|-------------|
| **Perçant** | 100% (sauf hallebarde 60%/40%) |

**Forces** : armures plate (perçant pur), cibles chargeant, gros gibier (allonge), cavalerie ennemie (anti-monture).
**Faiblesses** : combat rapproché (allonge devient pénalité), zones étroites.

---

## 5. Affixes typiques

> [!important] Catalogue = baseline + Anti-charge natif + 2 spécifiques
> Réutilise les **13 affixes baseline**. Ajoute :

| Affixe | Effet | Tier min | Notes |
|--------|-------|----------|-------|
| **Anti-charge** *(natif)* | ×2 dégâts contre cible chargeant | T1 | Gratuit |
| **Allonge accrue** | +5/10/15% allonge effective | T2 | Commun |
| **Pied de mur** | Si immobile depuis 2s, +30% dégâts au prochain coup | T3 | Rare — signature phalange |

---

## 6. Recettes (Forge + Travail du bois hybride)

> [!important] Recette hybride 2 catégories de craft
> La lance combine **tête métallique** (Forge) et **hampe en bois** (Travail du bois). Soit le joueur fait les deux Maîtrises, soit il achète/échange l'un des deux composants.

| Tier | Tête (Forge) | Hampe (Bois) | Durée totale | Mini-jeu |
|------|--------------|--------------|--------------|----------|
| **T1** | Lingot fer ×1 + Bois ×1 (douille) | Bois ×3 | 100 s | timing_température + coupe_précise |
| **T2** | Lingot acier ×2 + Bois ×1 | Planche ×2 + Sève ×1 | 200 s | + cintrage_hampe |
| **T3** | Alliage acier-trempé ×2 + Lingot ×1 | Planche d'essence noble ×2 + Cuir tanné fin ×1 | 380 s | + équilibrage_lance |
| **T4** | Alliage rare ×3 + Lingot précieux ×1 + Cœur creature ×1 + Gemme taillé ×1 | Planche d'essence noble ×3 + Cœur de plante ×1 + Cire raffinée ×1 | 1000 s | chaîne complète |
| **T5** | Alliage légendaire ×3 + Cœur creature ×2 + Cristal de Voie ×1 | Planche cosmique ×3 + Essence spirituelle ×1 | 2000 s | + condition cachée 🔒 |
| **T6** | Composants cosmiques + signature | Bois d'Arbre-Cœur (asset cosmique) | variable | quête scénarisée |

---

## 7. Variants cosmiques

Mêmes 10 variants que [[Épée à une main]] §7. Adaptations Lance :
- **Frost** : la pointe gelée applique *Frost* en zone 1.5m sur estoc lourd
- **Verdoyant** : la hampe pousse → allonge +0.3m permanent (sur durée de la session)
- **Vénérable** : *Anti-charge* devient ×3 (vs ×2) sur le premier kill du combat

---

## 8. Exemples de signatures

> Pas d'item Lance nominé dans `Objets.csv`. Signatures inventées par grand pays.

### Endora (garde royale, phalange)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Pique du Mur d'Avalor** | Mythique (T6) | Pique cérémonielle de la garde de la cité | *Pied de mur* doublé (+60%). Héritage. Allonge +0.5m |
| **Lance de la Phalange** | Légendaire (T5) | Standard de la garde royale | *Anti-charge* gratuit ×3 (vs ×2). Bonus stagger en formation +25% |
| **Hallebarde du Bourreau** | Magistral (T4) | Arme rituelle des juges-bourreaux | Dégâts +30% contre cibles désarmées. *Aura de présence* gratuit |

### Cestra (côtes, gladiateurs)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Trident du Récif** | Légendaire (T5) | Trident des chasseurs de créatures aquatiques | Bonus +30% contre faune aquatique. Désarmement +20% |

### Galenor (chasseurs)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Lance de la Communion** | Légendaire (T5) | Lance cérémonielle des druides chasseurs | Variant *Verdoyant* permanent. Bonus dégâts faune +25% |
| **Lance Courte de Vellen** | Magistral (T4) | Lance-javelot du chasseur historique Vellen | Jet portée +5m. Retour automatique 30s |

### Veshrim (anciens royaumes)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Lance des Sept Tours** | Légendaire (T5) | Une des sept lances rituelles | +1 palier effectif Maîtrise pendant ère Tempora-dominante |

---

## 9. Mini-jeu de combat

### Moveset baseline

- **Combo 3 coups (LMB)** : estoc-balayage-estoc — fenêtre combo **0.65s**, coups successifs alternent allonge max et coup recadré
- **Attaque lourde (LMB tenu)** : grand estoc en avant, allonge max + perçant amplifié, brise les gardes faibles — 30 pts stamina
- **Parade tenue (RMB)** : drain 12 pts/s, absorbe 40% (l'arme garde mal en mêlée rapprochée)
- **Parade parfaite** : fenêtre 0.20s
- **Esquive** : 4 directions, IFrames 0.40s
- **Plant (Shift + RMB)** : plante la lance au sol, **immobile mais +50% dégâts anti-charge** pendant 3s — *signature phalange*

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Combo 3 coups, estoc lourd, plant |
| **Initié** | Finisseur *Estoc traversant* (touche jusqu'à 2 cibles alignées) ; compétence *Repli défensif* (recule 2m + estoc 35 stamina) |
| **Adepte** | Passif *Garde longue* : ennemis à 2m+ ne peuvent pas attaquer en mêlée sans subir un estoc d'opportunité. Compétence *Sweep en cercle* (1.5m, 80 stamina) |
| **Expert** | Combo 5 coups, finisseur *Empalement* (immobilise cible 1s). Compétence *Charge à la lance* (sprint + estoc, *Anti-charge* sur soi-même) |
| **Maître** 🔒 | Technique signature *Lance du Cycle* (170 stamina, 100s CD, estoc qui traverse jusqu'à 5 cibles alignées, *Anti-charge* ×4 contre la première) |

### Synergies

- **Pas de dual-wield** (2H)
- **Synergie Bouclier "long"** : interdit (lance + bouclier = pertinence rompue, choix Phase 3)
- **Synergie Voie de Tempora / Vivacité** : compétences accélèrent le wind-up

---

## 10. Décisions ouvertes

> [!warning] Lance courte et catégorie Munition (jet)
> Si jetée, la lance courte devient un consommable jusqu'à récupération. Décision Phase 3 : système de récupération automatique 30s ? Manuelle ? Ou réelle perte (consommable) ?

> [!warning] Plant et zones étroites
> *Plant* immobilise le porteur 3s — risque dans les couloirs étroits, malus mobilité. À playtest pour calibrer la fenêtre.

> [!warning] Conditions cachées 🔒 Maître
> - Tuer 50 cibles chargeant via *Anti-charge*
> - *Pied de mur* + *Empalement* combo : 100 réussites
> - Tuer un boss mondial uniquement avec *Plant* (immobile pendant tout le combat)

---

*Liens : [[Épée à une main]] · [[Arc]] · [[Catégories d'Items]] · [[Armes et Maîtrise]] · [[Combat]]*
