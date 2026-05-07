---
tags: [item, archétype, armure, équipement, cuirasse, slot-torse]
type: archetype
category: Équipement
subcategory: Armure
slot: Torse
classes: [Tissu, Cuir, Mailles, Plate, Spécial-Exotique]
source: Fabriqué
mastery: [Tissage, Tannage, Forge, Joaillerie]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-chiffres-playtest, decision-set-bonuses, equilibrage-vs-armes-P2.1]
---

# 🛡 Cuirasse — Archétype-référence du slot Torse

> Archétype-pivot du système d'armures. La **Cuirasse** est le slot torse principal d'Hybelior — celui qui pèse le plus dans le calcul de défense (≈40% du total armure). Cet archétype pose le **pattern canonique slot × classe** que les 7 autres slots déclineront (Heaume, Pauldrons, Brassards, Gantelets, Ceinture, Jambières, Bottes).
>
> Le fichier couvre les **5 classes** (Tissu, Cuir, Mailles, Plate, Spécial-Exotique) en un seul archétype : ce sont des **variantes du même slot**, pas 5 archétypes distincts. Les chiffres posés ici sont **canoniques** — les autres slots s'aligneront sur les multiplicateurs.

---

## 1. Vue d'ensemble

### Concept

La **cuirasse** désigne la pièce d'armure couvrant le torse — terme générique qui prend des noms différents selon la classe (Cuirasse pour Plate, Plastron pour Mailles, Tunique pour Cuir, Robe pour Tissu, variable pour Spécial-Exotique). C'est le slot le plus visible, le plus lourd en stats défensives, et le plus marqueur d'identité visuelle d'un personnage.

Le slot Torse représente :

- **40 %** du total de défense d'un set complet (vs 12-15 % pour Heaume, 8-10 % pour pièces secondaires)
- Le **point d'équilibre** entre protection et mobilité (toute pénalité de mouvement passe d'abord par lui)
- Le **support principal des affixes** (5 slots d'affixes max au tier 6, vs 1-3 sur les autres pièces)
- Le **vecteur d'identité visuelle** (silhouette du personnage déterminée à 60 % par le torse)

### Pourquoi 5 classes plutôt qu'une progression linéaire

Hybelior **rejette le modèle WoW** où Cuir < Mailles < Plate dans une hiérarchie unique. À la place : **5 archétypes parallèles**, chacun avec son profil de joueur cible, ses trade-offs, et sa progression complète Tier 1 → Tier 6.

| Modèle écarté | Pourquoi |
|---|---|
| Hiérarchie unique (Cuir → Mailles → Plate) | Réduit le choix de build à un palier ; les classes "légères" deviennent caduques en haut tier |
| Une seule classe, plusieurs visuels | Sape la lisibilité combat (ne sait pas si l'adversaire est Mage ou Tank) |
| Classes verrouillées (Mage = Tissu obligatoire) | Trop rigide ; un guerrier-mage hybride doit pouvoir choisir Mailles + Voie d'Aurion |

→ **5 progressions parallèles, identité préservée à tous les tiers.** Un Tissu Tier 6 reste un mage frêle ; un Plate Tier 6 reste un tank lourd. Le tier impacte la **puissance brute**, pas le **profil**.

---

## 2. Les 5 classes — profils canoniques

### 🧵 Tissu — la Robe du Lié

| Aspect | Détail |
|---|---|
| **Profil joueur cible** | Mage / Lié — pratiquant de [[Le Lien]], focus magique pur |
| **Matériaux primaires** | [[Sources de Ressources#Source 3 — Fabrication|Tissu]] (laine plante / laine creature / soie) + [[Sources de Ressources#Source 3 — Fabrication|Pigment]] + [[Sources de Ressources#Source 3 — Fabrication|Fil métallique]] (broderie) + [[Cristal de Voie]] (cousu) |
| **Métiers principaux** | [[Tisserand|Tisserand]] · [[Métiers - Couturier|Couturier]] · [[Métiers - Brodeur|Brodeur]] · [[Enchanteur|Enchanteur]] (post-craft) |
| **Stats brutes mises en valeur** | **Esprit** (+puissance Voie), **Résonance** (+intensité), **Mémoire** (+identification, +qualité enchantements) |
| **Bonus magiques natifs** | +Mana max · +Régen Mana · −Coût mana (selon tier) · Conduit magique amplifié |
| **Trade-offs** | **+30 % Mana max** ; **−60 % Défense physique** vs Plate équivalente ; pas de pénalité de mouvement ; **+5-10 % bonus Stamina** (légèreté) |
| **Synergie [[Le Lien]]** | **Conduit magique élevé** — la Voie active du joueur amplifie ses dégâts magiques de +5 à +15 % selon tier. Une Robe haut tier "résonne" avec la Voie. |
| **Vulnérabilité** | Stagger facile (poise faible), faiblesse aux dégâts physiques tranchants/contondants |

> [!note] Robe ≠ vêtement civil
> Une **Robe d'armure-tissu** est un équipement combat avec stats. Une **Robe simple civile** (voir [[Catégories d'Items#Sous-famille — Vêtements (non-armure)]]) est un vêtement social sans rôle combat.

### 🦬 Cuir — la Tunique de l'Éclaireur

| Aspect | Détail |
|---|---|
| **Profil joueur cible** | Éclaireur / Voleur / Archer / Assassin — agilité + furtivité |
| **Matériaux primaires** | [[Sources de Ressources#Source 2 — Récolte sur créature|Cuir]] tanné · Peau · Fourrure (selon biome) · Boucles métalliques · Fil de cuir |
| **Métiers principaux** | [[Tanneur|Tanneur]] · [[Métiers - Maroquinier|Maroquinier]] · [[Métiers - Sellier|Sellier]] |
| **Stats brutes mises en valeur** | **Vivacité** (+esquive, +vitesse attaque), **Acuité** (+critique, +détection), **Endurance** (Stamina prolongée) |
| **Bonus natifs** | +Vitesse mouvement · +Stamina max · −Bruit de pas · Bonus à l'esquive |
| **Trade-offs** | **Pas de pénalité mouvement** ; **+15 % IFrames esquive** ; **−40 % Défense physique** vs Plate ; faible défense magique |
| **Synergie [[Le Lien]]** | **Neutre** — le cuir ne canalise pas mais n'entrave pas. Les Liés mineurs (Voie d'Umbra, Spiritus discret) tolèrent le Cuir. |
| **Vulnérabilité** | Dégâts perforants élevés ; stagger moyen |

### ⛓ Mailles — le Plastron du Soldat

| Aspect | Détail |
|---|---|
| **Profil joueur cible** | Soldat / Combattant polyvalent / Guerrier-mage hybride |
| **Matériaux primaires** | [[Sources de Ressources#Source 3 — Fabrication|Fil métallique]] tressé en anneaux · [[Sources de Ressources#Source 3 — Fabrication|Lingot]] (renforts) · Cuir tanné (sangles) |
| **Métiers principaux** | [[Forgeron|Forgeron]] · [[Métiers - Métallurgiste|Métallurgiste]] · [[Métiers - Armurier|Armurier]] |
| **Stats brutes mises en valeur** | **Vigueur** (+HP, +défense), **Endurance** (+Stamina, +parade tenue) |
| **Bonus natifs** | +HP · +Défense physique · Résistance correcte aux trois types (tranchant/perforant/contondant) |
| **Trade-offs** | **Équilibre central** ; pénalité mouvement légère (−5 %) ; pas de bonus mana mais pas d'antagonisme magique fort |
| **Synergie [[Le Lien]]** | **Faible négatif** — −5 % efficacité Voie (le métal interfère). Tolérable pour Liés non-Apex. |
| **Vulnérabilité** | Dégâts contondants traversent les mailles ; bruyant (détection facilitée) |

### 🏛 Plate — la Cuirasse du Tank

| Aspect | Détail |
|---|---|
| **Profil joueur cible** | Tank / Chevalier / Encaisseur de boss |
| **Matériaux primaires** | [[Sources de Ressources#Source 3 — Fabrication|Lingot]] (acier, mithril, etc.) · [[Sources de Ressources#Source 3 — Fabrication|Alliage]] · Cuir tanné (sangles internes) · Pigment (heraldique) |
| **Métiers principaux** | [[Forgeron|Forgeron]] · [[Métiers - Armurier|Armurier]] · [[Métiers - Métallurgiste|Métallurgiste]] |
| **Stats brutes mises en valeur** | **Vigueur** (+HP, +défense, +stagger résistance) |
| **Bonus natifs** | +Défense physique max · +Résistance stagger · +Capacité de port · −Dégâts critiques reçus |
| **Trade-offs** | **+100 % Défense physique** vs Cuir équivalent ; **−15 à −20 % vitesse mouvement** ; **−10 à −20 % Stamina max** (lourdeur) ; régen Stamina réduite ; **−25 % efficacité Voie** (interférence métallique forte) |
| **Synergie [[Le Lien]]** | **Très négatif** — un Lié en Plate Tier 4+ subit interférence sévère. Builds magiques excluent la Plate au-dessus du Tier 3. |
| **Vulnérabilité** | Mobilité réduite (pas d'esquive prolongée) ; cibles statiques pour mages adverses |

### 💎 Spécial-Exotique — la Carapace de l'Atypique

| Aspect | Détail |
|---|---|
| **Profil joueur cible** | Build atypique · Endgame · Récompense post-Souffle · Set boss-loot |
| **Matériaux primaires** | [[Sources de Ressources#Source 2 — Récolte sur créature|Écaille]] · [[Sources de Ressources#Source 2 — Récolte sur créature|Carapace]] · [[Sources de Ressources#Source 2 — Récolte sur créature|Os]] · [[Sources de Ressources#Source 2 — Récolte sur créature|Essence spirituelle]] · Biométal (rare) · Cristaux énergétiques |
| **Métiers principaux** | [[Métiers - Joaillier|Joaillier]] · [[Lapidaire|Lapidaire]] · [[Enchanteur|Enchanteur]] · [[Métiers - Sertisseur|Sertisseur]] (et combinaison de 2-3 métiers selon recette) |
| **Stats brutes mises en valeur** | **Variable selon matériau** — Écaille de dragon = Vigueur, Carapace insectoïde = Endurance, Os de cosmique = Esprit/Résonance, Biométal = Acuité |
| **Bonus natifs** | **Affixe créature unique** systématique (résistance élémentaire, regen rare, proc spécial lié à la créature source) |
| **Trade-offs** | Stats brutes **comparables au Tier équivalent** mais **+1 affixe rare garanti** ; matériaux extrêmement rares (drop boss, événement post-Souffle, condition cachée 🔒) |
| **Synergie [[Le Lien]]** | **Variable selon matériau** — Os de cosmique = +20 % efficacité Voie alignée ; Écaille de dragon = +résistance feu mais −10 % efficacité Voie d'Aquor ; etc. |
| **Vulnérabilité** | Coût production prohibitif ; certains matériaux n'apparaissent que dans une seule [[Les Ères|ère]] |

---

## 3. Stats par tier × classe — la **table-pivot canonique**

> [!important] Référence canonique pour tous les autres slots
> Les multiplicateurs de tier (Tier 2 = ×1.30, Tier 3 = ×1.70, Tier 4 = ×2.20, Tier 5 = ×2.80, Tier 6 = ×3.60) sont **canoniques pour TOUTES les pièces d'armure**. Les 7 autres slots utilisent ces mêmes multiplicateurs sur leur propre baseline (~40 % de la cuirasse pour le heaume, ~25 % pour pauldrons, etc.). Voir §10 pour le détail.

### Multiplicateurs de tier (canoniques)

| Tier | Nom | Multiplicateur défense | Cumul affixes max |
|---|---|---|---|
| **1** | Commun | ×1.00 (baseline) | 1 |
| **2** | Façonné | ×1.30 | 2 |
| **3** | Œuvré | ×1.70 | 3 |
| **4** | Magistral | ×2.20 | 4 |
| **5** | Légendaire | ×2.80 | 5 |
| **6** | Mythique | ×3.60 | 5 + 1 affixe unique signature |

> Voir [[Items - Index#Tiers de rareté]].

### Ratios de défense par classe (baseline T1, slot Torse)

| Classe | Défense physique baseline T1 | Défense magique baseline T1 | Pénalité mouvement | Bonus stat brute associée |
|---|---|---|---|---|
| **Tissu** | 8 pts | 24 pts | 0 % | +12 Mana max · +Esprit (passif) |
| **Cuir** | 18 pts | 12 pts | 0 % | +15 Stamina max · +Vivacité (passif) |
| **Mailles** | 30 pts | 16 pts | −5 % | +20 HP max · +Vigueur (passif) |
| **Plate** | 45 pts | 10 pts | −15 % | +30 HP max · +Vigueur (passif fort) |
| **Spécial-Exotique** | 28 pts (variable) | 28 pts (variable) | variable | Affixe unique selon créature |

> [!note] Calibrage vs armes
> Une **attaque légère** d'arme T1 inflige ~12-15 dégâts bruts (à confirmer P2.1). Une cuirasse Tissu T1 absorbe ~8 pts → coup encaissé efficace ~5-7 HP perdus. Une Plate T1 absorbe ~45 pts → coup léger de T1 entièrement bloqué. **C'est voulu** : la Plate basse-tier négate les attaques légères, alors que le Tissu reste fragile par design.

### Table complète — Cuirasse 6 tiers × 5 classes

> Format de chaque cellule : **DéfPhys / DéfMag / Pénalité Mvt / Bonus stat brute / Slots affixes**

| Tier | **Tissu** (Robe) | **Cuir** (Tunique) | **Mailles** (Plastron) | **Plate** (Cuirasse) | **Spécial-Exotique** |
|---|---|---|---|---|---|
| **T1** Commun | 8 / 24 / 0 % / +12 Mana / 1 | 18 / 12 / 0 % / +15 Stam / 1 | 30 / 16 / −5 % / +20 HP / 1 | 45 / 10 / −15 % / +30 HP / 1 | 28 / 28 / var / +affixe / 1 |
| **T2** Façonné | 10 / 31 / 0 % / +16 Mana / 2 | 23 / 16 / 0 % / +20 Stam / 2 | 39 / 21 / −5 % / +26 HP / 2 | 59 / 13 / −15 % / +39 HP / 2 | 36 / 36 / var / +affixe / 2 |
| **T3** Œuvré | 14 / 41 / +1 % bonus | 31 / 20 / +1 % esquive | 51 / 27 / −5 % / +34 HP / 3 | 77 / 17 / −16 % / +51 HP / 3 | 48 / 48 / var / +affixe / 3 |
| (T3 détail Tissu) | 14 / 41 / 0 % / +20 Mana · +5 % efficacité Voie / 3 | — | — | — | — |
| (T3 détail Cuir) | — | 31 / 20 / 0 % / +26 Stam · +5 % esquive / 3 | — | — | — |
| **T4** Magistral | 18 / 53 / 0 % / +26 Mana · +10 % effi. Voie · +1 régen Mana/s / 4 | 40 / 26 / 0 % / +33 Stam · +10 % esquive · +1 % crit / 4 | 66 / 35 / −7 % / +44 HP · +5 % parade / 4 | 99 / 22 / −18 % / +66 HP · +10 % résist stagger / 4 | 62 / 62 / var / +2 affixes uniques / 4 |
| **T5** Légendaire | 22 / 67 / 0 % / +33 Mana · +15 % effi. Voie · +2 régen/s · proc résonance / 5 | 50 / 34 / 0 % / +42 Stam · +15 % esquive · +3 % crit · −10 % bruit / 5 | 84 / 45 / −7 % / +56 HP · +10 % parade · +5 % stagger / 5 | 126 / 28 / −20 % / +84 HP · +20 % résist stagger · +1 % thorns / 5 | 78 / 78 / var / +2-3 affixes uniques / 5 |
| **T6** Mythique | 29 / 86 / +0 % / +42 Mana · +20 % effi. Voie · +3 régen/s · proc résonance · *affixe unique signature* / 5+1 | 65 / 43 / +0 % / +54 Stam · +20 % esquive · +5 % crit · −20 % bruit · *signature* / 5+1 | 108 / 58 / −7 % / +72 HP · +15 % parade · +10 % stagger · *signature* / 5+1 | 162 / 36 / −20 % / +108 HP · +25 % stagger · thorns · *signature* / 5+1 | 100 / 100 / var / +3 affixes uniques · *signature cosmique* / 5+1 |

> [!info] Lecture rapide
> Au **Tier 6**, une **Robe Tissu** offre **86 pts** de défense magique (≈ ce qu'un Plate offre en physique au T2) et **+20 %** d'efficacité Voie. Une **Cuirasse Plate** T6 offre **162 pts** de défense physique mais **−20 %** de mobilité. **Le tier amplifie le profil ; il ne le rééquilibre pas.**

### Échelle des bonus de stat brute par tier (canoniques)

| Tier | Bonus stat brute primaire (cuirasse) | Bonus stat brute secondaire |
|---|---|---|
| T1 | +12-30 pts (selon classe) | — |
| T2 | +16-39 pts | +1-2 pts stat brute (passif) |
| T3 | +20-51 pts | +2-4 pts stat brute |
| T4 | +26-66 pts | +4-6 pts stat brute · +1 effet secondaire |
| T5 | +33-84 pts | +6-8 pts stat brute · +1 proc situationnel |
| T6 | +42-108 pts | +10-12 pts stat brute · proc + signature unique |

> [!warning] Plafond cosmique des stats brutes
> Les bonus de stat brute via équipement sont **temporaires** et ne s'inscrivent pas au-dessus du plafond mou 100 / dur 150 défini dans [[Personnage#COUCHE 1 — Stats brutes]]. Un personnage à Vigueur 100 + Cuirasse Plate T6 (+12 Vigueur effective) **peut** dépasser brièvement 100, mais le **Souffle compresse** la stat de base, pas le bonus armure ([[Le Souffle#Mécanique de compression]]).

---

## 4. Calcul de défense effective

### Formules canoniques

> [!important] Source : [[Personnage#Tableau des effets — comment les stats produisent du gameplay]] lignes 218-219.

```
Défense physique effective = Vigueur + (Défense_armure_phys × Multiplicateur_classe_phys)
Défense magique effective  = Esprit + Conscience + (Défense_armure_mag × Multiplicateur_classe_mag)
```

### Multiplicateurs de classe (canoniques)

| Classe | Mult. Défense physique | Mult. Défense magique |
|---|---|---|
| **Tissu** | ×0.5 (le tissu encaisse mal) | ×1.5 (conduit magique, absorption élevée) |
| **Cuir** | ×1.0 (référence) | ×1.0 (référence) |
| **Mailles** | ×1.2 (renfort métallique) | ×0.9 (interférence métallique faible) |
| **Plate** | ×1.5 (résistance maximale) | ×0.6 (interférence métallique forte) |
| **Spécial-Exotique** | ×1.1 (variable) | ×1.1 (variable) |

### Exemple concret — joueur Vigueur 60, Esprit 40, Conscience 50

| Cuirasse équipée | Défense phys effective | Défense mag effective |
|---|---|---|
| Robe Tissu T3 (14/41) | 60 + (14 × 0.5) = **67** | 90 + (41 × 1.5) = **151** |
| Tunique Cuir T3 (31/20) | 60 + (31 × 1.0) = **91** | 90 + (20 × 1.0) = **110** |
| Plastron Mailles T3 (51/27) | 60 + (51 × 1.2) = **121** | 90 + (27 × 0.9) = **114** |
| Cuirasse Plate T3 (77/17) | 60 + (77 × 1.5) = **176** | 90 + (17 × 0.6) = **100** |
| Spécial T3 (48/48) | 60 + (48 × 1.1) = **113** | 90 + (48 × 1.1) = **143** |

> [!tip] Profondeur tactique
> Un Lié en Robe T3 a **151** de défense magique (proche du seuil de résistance aux sorts T3). En Plate T3, il tombe à **100** — il devient cible facile pour un mage adverse, **même avec sa Vigueur élevée**. **Le choix de classe est tactique, pas cosmétique.**

### Réduction de dégâts (formule indicative à playtester)

```
Dégâts reçus = Dégâts bruts × (1 − Défense_effective / (Défense_effective + 100))
```

Exemple : Plate T3 (Défense phys 176) reçoit attaque légère 14 dégâts → `14 × (1 − 176/276) = 14 × 0.362 = 5 HP` perdus.
Tissu T3 même attaque (Défense phys 67) → `14 × (1 − 67/167) = 14 × 0.599 = 8.4 HP` perdus.

> [!note] Calibrage
> La formule maintient la **plate viable** sans la rendre invincible. À très haut tier (T6 Plate, défense 162 + Vigueur 100 = 262) la réduction tend vers **−72 %**, ce qui crée des "tanks de fer" lisibles.

---

## 5. Affixes spécifiques aux armures

> Les affixes sont posés sur les pièces via le **ItemModifier Generator** (voir [[Architecture Data-Driven]]). Chaque cuirasse a **1-5 slots d'affixes** selon le tier (voir §3). Liste canonique des affixes valides sur cuirasse :

### Affixes universels (toutes classes)

| Affixe | Effet (T3 référence) | Pondération T6 |
|---|---|---|
| **Régénération HP** | +1 HP/s hors combat | +3 HP/s hors et combat |
| **Régénération Stamina** | +5 % régen Stamina | +15 % régen |
| **Réduction stagger** | +5 % résistance stagger | +20 % |
| **Bonus parade** | Parade tenue −10 % drain Stamina | −30 % |
| **Capacité de port** | +20 kg | +60 kg |
| **Réduction dégâts critiques reçus** | −10 % | −30 % |
| **Vol de vie passif** | +0.5 % HP rendus par coup donné | +2 % |

### Affixes affinitaires (résistances élémentaires)

| Affixe | Source typique | Synergie ère |
|---|---|---|
| **Résistance Feu** | Cuir tanné en zone volcanique · Écaille dragon | [[Les Ères#🔥 Ère du Feu Endormi]] |
| **Résistance Glace** | Fourrure de mammifère arctique · Écaille de poisson abyssal | [[Les Ères#❄️ Ère du Sommeil de Glace]] |
| **Résistance Foudre** | Fil métallique enchanté · Plume d'aviens | [[Les Ères#🌪️ Ère des Vents Bouleversants]] |
| **Résistance Ombre** | Cuir tanné de nuit · Pigment noir-de-Noctis | [[Les Ères#🌑 Ère de l'Ombre Longue]] |
| **Résistance Lumière** | Fil d'or · Pigment d'Eldoria | [[Les Ères#✨ Ère du Rêve Lumineux]] |
| **Résistance Temporel** | Sève temporelle · Cristal Tempora | [[Les Ères#⏳ Ère des Échos Brisés]] |

### Affixes propres à une classe

#### Tissu uniquement

| Affixe | Effet T3 |
|---|---|
| **Conduit amplifié** | +5 % efficacité Voie (cumulable jusqu'à T6) |
| **Régen Mana** | +1 Mana/s |
| **Réduction coût Mana** | −3 % coût Mana sorts (plafond −15 % à T6) |
| **Résonance accrue** | +5 % durée des effets de Voie |

#### Cuir uniquement

| Affixe | Effet T3 |
|---|---|
| **Pas silencieux** | −15 % bruit de pas (cumul avec stat) |
| **IFrames étendues** | +0.05 s sur fenêtre d'esquive |
| **Bonus critique** | +2 % chance critique |
| **Bonus dague/arc** | +5 % dégâts armes légères équipées |

#### Mailles uniquement

| Affixe | Effet T3 |
|---|---|
| **Réflexion mineure** | 5 % dégâts contondants reçus renvoyés |
| **Bonus parade tenue** | +10 % absorption parade |

#### Plate uniquement

| Affixe | Effet T3 |
|---|---|
| **Aura de menace** | +15 % génération aggro |
| **Thorns** | 8 dégâts contondants renvoyés sur attaque mêlée subie |
| **Stabilité** | Immunité knockback (sur attaques < 3× Vigueur source) |
| **Bonus bouclier** | +10 % efficacité du Bouclier équipé |

#### Spécial-Exotique uniquement

| Affixe | Effet T3 |
|---|---|
| **Affixe créature signature** | Effet propre à la créature dont vient le matériau (ex. Écaille de dragon → +1 dégât feu/coup ; Os de cosmique → +1 % efficacité Voie passive) |
| **Proc rare** | Chance 5 % de déclencher un effet narratif (forme spectrale 2 s, etc.) |

### Affixes métiers (cuirasse de l'artisan)

> Les "cuirasses d'artisan" — variantes craft pure — portent des affixes orientés métier plutôt que combat.

| Affixe | Métier ciblé |
|---|---|
| **Précision craft** | +5 % qualité de craft (métier équipé en outil) |
| **Vitesse craft** | −10 % durée craft |
| **Économie d'intrants** | 5 % chance de craft sans consommer un intrant |
| **Résistance feu de forge** | +20 % résistance feu (utile au Forgeron) |

> [!todo] Affixes ères-spécifiques (REFONTE-NEEDED)
> Les affixes liés à une ère active (ex. *Bénédiction du Verdoiement* qui n'opère que pendant l'ère active) sont à arbitrer en P3. Question : permanents ou tournants avec l'ère ?

---

## 6. Recettes par classe — Tier 3 (Œuvré) référence

> Tier 3 démontre le pattern milieu-de-gamme. T1-T2 simplifient (moins d'intrants), T4-T6 enrichissent (intrants exotiques + affixes garantis). Recettes complètes générées par **Recipe Generator** ([[Architecture Data-Driven]]).

### 🧵 Tissu — Robe Œuvrée du Lié

| Champ | Valeur |
|---|---|
| **Métier** | [[Tisserand|Tisserand]] (principal) + [[Métiers - Brodeur|Brodeur]] (finition) |
| **Station** | Métier à tisser + Atelier de couture |
| **Intrants** | 4× [[Sources de Ressources#Source 3 — Fabrication\|Tissu]] (laine plante T2+) · 2× [[Sources de Ressources#Source 3 — Fabrication\|Pigment]] (couleur signature) · 1× [[Cristal de Voie]] (cousu en focus) · 6× [[Sources de Ressources#Source 3 — Fabrication\|Fil métallique]] (broderie protectrice) |
| **Palier de Maîtrise requis** | Adepte (palier 3) |
| **Durée** | 60 s |
| **Mini-jeu** | Cadence métier à tisser (rythme à respecter — battement régulier, accélération sur les phases brodées) |
| **Sortie** | Robe de Tissu T3 + bonus T4 si proc Maître |
| **Variations** | Voile (Voie d'Aerion) · Manteau (Voie de Noctis) · Stola (Voie de Celestia) · Soutane sombre (Voie d'Umbra) — selon Cristal de Voie utilisé |

### 🦬 Cuir — Tunique Œuvrée de l'Éclaireur

| Champ | Valeur |
|---|---|
| **Métier** | [[Tanneur|Tanneur]] (cuir tanné) → [[Métiers - Maroquinier|Maroquinier]] (assemblage) |
| **Station** | Cuve de tannage (préparation) → Établi cuir |
| **Intrants** | 6× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné T2+ · 2× [[Sources de Ressources#Source 3 — Fabrication\|Fil métallique]] (renforts internes) · 1× Boucle de fer · 2× [[Sources de Ressources#Source 3 — Fabrication\|Pigment]] (camouflage biome) |
| **Palier de Maîtrise requis** | Adepte |
| **Durée** | 90 s |
| **Mini-jeu** | Coupe précise (3 patrons à découper sans dévier ; bonus précision selon Acuité) |
| **Sortie** | Tunique de Cuir T3 |
| **Variations** | Tunique de Forêt (Verdoyant) · Veste de Plaine (Standard) · Cape épaisse (Frost) — selon biome de provenance du cuir |

### ⛓ Mailles — Plastron Œuvré du Soldat

| Champ | Valeur |
|---|---|
| **Métier** | [[Forgeron|Forgeron]] / [[Métiers - Métallurgiste|Métallurgiste]] |
| **Station** | Forge à charbon + Étau (anneaux) |
| **Intrants** | 8× [[Sources de Ressources#Source 3 — Fabrication\|Fil métallique]] (anneaux) · 2× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (renforts plaques) · 1× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné (sangles) · 1× Charbon |
| **Palier de Maîtrise requis** | Adepte |
| **Durée** | 120 s |
| **Mini-jeu** | Tressage anneaux (séquence rythmique long — précision sur ~40 anneaux à fermer manuellement, marge d'erreur) |
| **Sortie** | Plastron de Mailles T3 |
| **Variations** | Plastron à anneaux fins (Vivacité bonus) · Plastron à doubles mailles (Vigueur bonus) — selon technique de tressage |

### 🏛 Plate — Cuirasse Œuvrée du Chevalier

| Champ | Valeur |
|---|---|
| **Métier** | [[Forgeron|Forgeron]] (martelage) + [[Métiers - Armurier|Armurier]] (assemblage) |
| **Station** | Forge à charbon → Enclume → Bac à trempe → Établi armurier |
| **Intrants** | 6× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (acier ou supérieur) · 2× [[Sources de Ressources#Source 3 — Fabrication\|Alliage]] (renforts critiques) · 1× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné (sangles internes) · 4× Charbon · 1× Eau de trempe |
| **Palier de Maîtrise requis** | **Expert** (palier 4) — Plate exigeant techniquement |
| **Durée** | 180 s |
| **Mini-jeu** | Timing température (4 phases : forge initiale, modelage, trempe, finition — chaque phase = jauge de température à maintenir dans la zone optimale) |
| **Sortie** | Cuirasse de Plate T3 (proc T4 fréquent à palier Expert) |
| **Variations** | Cuirasse anatomique (mobilité +) · Cuirasse à plates lourdes (défense max) · Cuirasse héraldique (faction visible) |

### 💎 Spécial-Exotique — Carapace Œuvrée

| Champ | Valeur |
|---|---|
| **Métier** | [[Métiers - Joaillier|Joaillier]] OU [[Métiers - Sertisseur|Sertisseur]] OU **combinaison** (Tanneur+Joaillier+Enchanteur selon recette) |
| **Station** | Atelier de joaillerie + Cercle d'enchantement (rituel finition) |
| **Intrants** | **Variable** — exemple Carapace d'Insecte-Roi : 4× [[Sources de Ressources#Source 2 — Récolte sur créature\|Carapace]] (Insecte-Roi T3+) · 2× [[Sources de Ressources#Source 3 — Fabrication\|Fil métallique]] · 2× [[Sources de Ressources#Source 2 — Récolte sur créature\|Essence spirituelle]] · 1× [[Cristal de Voie]] aligné |
| **Palier de Maîtrise requis** | **Maître** (palier 5) 🔒 |
| **Durée** | 240 s + |
| **Mini-jeu** | **Rituel** (séquence de glyphes à tracer correctement, audio-pattern à reproduire — combinaison de plusieurs mini-jeux de métiers différents) |
| **Sortie** | Pièce Spécial-Exotique T3 + 1 affixe créature signature garanti |
| **Variations** | Aussi nombreuses que les créatures sources (Écaille de dragon, Os de cosmique, Biométal, Carapace insectoïde, Fourrure spectrale, etc.) |

> [!note] Coût économique des Spécial-Exotiques
> Les recettes Spécial sont **rares par construction** : intrants drop-only (boss / événement / condition cachée) + métier maître + temps d'exécution élevé. Une cuirasse Spécial T3 vaut typiquement **10× le prix d'une Plate T3** sur la [[Économie|Bourse]].

---

## 7. Variants cosmiques (10 par ère)

> Chaque cuirasse peut être déclinée en variant cosmique selon l'[[Les Ères|ère]] active de fabrication. Mêmes 10 variants visuels que pour les armes (P2.1) — la cohérence est maintenue. Ils ajoutent des **modificateurs gameplay propres aux armures** (différents de ceux des armes).

| Variant | Entité | Effet visuel cuirasse | Modificateur gameplay armure |
|---|---|---|---|
| **Shadow** | [[Cosmologie#Noctis\|Noctis]] | Tissu/cuir noirs animés d'ombre, plate ternie | +10 % résistance Ombre · −5 % dégâts Lumière reçus · proc 5 % invisibilité 1 s sur coup encaissé |
| **Spectral** | [[Cosmologie#Tempora\|Tempora]] | Translucide, scintille | **−10 % défense physique** (matériau partiellement absent) · **+20 % chance de phase à travers attaque** (immunité totale 0.3 s, cooldown 8 s) |
| **Frost** | [[Cosmologie#Aquor\|Aquor]] froid | Givre permanent visible | +15 % résistance Glace · cuirasse rend le porteur immunisé aux ralentissements · −5 % vitesse mouvement |
| **Verdoyant** | [[Cosmologie#Spiritus\|Spiritus]] + [[Cosmologie#Terranu\|Terranu]] | Mousse, vrilles vivantes | +1 régen HP/s en zone naturelle (forêt, marais, plaine) · neutre ailleurs · cuir/tissu se "réparent" passivement |
| **Brulé** | (Voie de Feu) | Cendres, braises, motifs ardents | +15 % résistance Feu · proc 10 % brûlure 5 s sur attaquant mêlée · −10 % résistance Glace |
| **Pourpre** | [[Cosmologie#Umbra\|Umbra]] | Brouillard pourpre stagnant autour | +10 % chance d'esquive (illusion) · ennemis subissent −5 % précision contre le porteur |
| **Doré** | [[Cosmologie#Eldoria\|Eldoria]] | Éclat lumineux constant | Soins reçus +15 % · révèle invisibles dans 5 m · −10 % défense Ombre (vulnérabilité Noctis) |
| **Brisé** | [[Cosmologie#Tempora\|Tempora]] aigu | Glitch visuel, fragments | Aléatoire — chaque combat applique un buff/malus différent (5 effets possibles) · variant chaotique |
| **Onirique** | [[Cosmologie#Somnix\|Somnix]] | Couleurs irréelles ondulantes | Confusion : ennemis ratent leur première attaque (1× par combat) · proc rêve 2 % (paralysie 1 s adversaire) |
| **Vénérable** | [[Cosmologie#Fatum\|Fatum]] | Marques runiques anciennes | +1 affixe slot supplémentaire · −5 % chances de proc des autres affixes (le destin pondère) |

> [!info] Stack avec affixes
> Les variants ne **remplacent pas** les affixes — ils s'**ajoutent** comme une couche thématique. Une *Robe Tissu T5 Spectrale* a ses 5 affixes normaux + l'effet Spectral en bonus. Mais on ne peut pas avoir 2 variants simultanément (une seule ère cosmique a forgé l'item).

> [!note] Disponibilité des variants
> - **Shadow / Pourpre** : forge possible pendant Ère de l'Ombre Longue ou Brume Mortelle
> - **Spectral / Brisé** : pendant Ère des Échos Brisés
> - **Doré** : Ère du Rêve Lumineux uniquement
> - **Verdoyant** : Verdoiement ou Communion
> - **Frost** : Sommeil de Glace
> - **Brulé** : Feu Endormi (si Voie de Feu active)
> - **Onirique** : Sommeil Onirique
> - **Vénérable** : Présages
>
> Une fois forgée, la cuirasse **garde son variant à vie** — pas de transformation rétroactive au Souffle suivant. Les cuirasses variantes deviennent des **reliques d'ère** (voir [[Le Souffle#Effets sociaux d'un Souffle]]).

---

## 8. Exemples de signatures (PHASE 4 stub)

> Items uniques nommés, ancrés narrativement. À développer en Phase 4 avec lore par pays. **2-3 par grand pays** est la cadence cible.

### Astravia (continent — voir [[Astravia]])

- **Plastron de la Sentinelle d'Astravia** (Mailles T5) — *« Forgé pour les gardes de la Tour-Mère ; chaque anneau porte un mot d'oraison. »* Bonus narratif : aggro forcé sur le porteur dans 10 m (les ennemis le reconnaissent comme menace prioritaire).
- **Cuirasse du Premier Veilleur** (Plate T6 Mythique) — *« Portée par le héros qui tint la passe pendant l'Arrachement. Inscriptions illisibles depuis 250 ans. »* Affixe signature : +30 % défense magique (jusque-là une Plate ne dépasse jamais 36 mag — celle-ci atteint ~47).

### Galenor (continent — voir [[Galenor - Continent|Galenor]])

- **Voile de la Veuve de Galenor** (Tissu T5 Doré) — *« La Veuve traversa la Brume Mortelle vêtue de blanc et en sortit indemne. Le voile a gardé sa lumière. »* Affixe : immunité totale aux dégâts Ombre 5 s par combat.
- **Tunique du Maître-Fauconnier** (Cuir T4) — *« Bordée des plumes du dernier Aigle d'Or. »* Bonus : monture aviaire +20 % vitesse · familier (si Voie de Spiritus) +1 niveau effectif.

### Cendara (continent — voir [[Cendara - Continent|Cendara]])

- **Carapace de l'Insecte-Roi** (Spécial-Exotique T6) — *« Récoltée sur la dépouille du Roi-Larve qui terrorisait Cendara depuis trois ères. »* Affixe signature : régen 5 HP/s constants · vulnérabilité +20 % aux dégâts Feu.
- **Plastron de la Légion Cendrée** (Mailles T4) — *« Les soldats qui marchèrent sur les volcans portaient ces mailles. Elles ont fondu sept fois. »* Affixe : +25 % résistance Feu · proc immunité brûlure 3 s.

### Onara (continent — voir [[Onara - Continent|Onara]])

- **Robe du Premier Lié à Aquor** (Tissu T6 Frost) — *« Tissée de fil de glace pérenne. La porter, c'est respirer sous l'eau. »* Affixe signature : respiration aquatique + nage +50 %.

### Ilthara (continent — voir [[Ilthara - Continent|Ilthara]])

- **Tunique d'Ombre du Marcheur** (Cuir T5 Shadow) — *« Les chamans des steppes savent rendre le cuir invisible. Personne ne sait comment. »* Affixe : invisibilité 3 s lors du sprint (cooldown 60 s).

> [!todo] Phase 4
> Étoffer les signatures par continent (objectif 2-3 par grand pays × 13 continents = ~30-40 cuirasses signature pour la Phase 4). Chaque entrée doit inclure : nom complet, contexte historique, lore tenseur, classe + tier, affixe(s) signature(s), conditions de drop / craft / quête.

---

## 9. Sets et synergies *(question ouverte)*

> [!todo] **REFONTE-NEEDED — décision design : adopter les set bonuses ou non ?**

### Le débat

| Pour adopter set bonuses | Contre |
|---|---|
| Récompense la cohérence d'équipement (vs slots disparates) | Réduit la flexibilité (le joueur "doit" porter le set complet) |
| Crée des paliers de progression endgame supplémentaires | Complexifie l'équilibrage (chaque set bonus à valider) |
| Donne une identité visuelle forte aux factions/dungeons | Peut écraser les builds personnalisés |
| Facilite la lecture sociale (« il porte le set des Sentinelles ») | Risque de devenir obligatoire en endgame |

### Proposition retenue (à valider playtest)

**Adopter set bonuses **light-touch** : palier 3/5/8 pièces, jamais obligatoire**.

| Pièces du même set | Bonus |
|---|---|
| **3/8** | Petit bonus thématique (+5 % d'une stat secondaire de la classe — ex. +5 % efficacité Voie pour set Tissu) |
| **5/8** | Bonus moyen (proc situationnel — ex. set Sentinelle 5/8 : génération aggro +20 %) |
| **8/8** | Bonus signature visible et unique (effet narratif — ex. set Veuve de Galenor 8/8 : tu laisses une traînée lumineuse en marchant) |

**Règles** :
- Les set bonuses sont **toujours optionnels** (un build mixte reste viable)
- Pas de set bonus qui **double** la défense ou les dégâts (max +20 % d'effet déjà existant)
- Sets signature limités aux **continents/factions/dungeons** (~30 sets totaux endgame)
- Les pièces individuelles d'un set restent **utilisables seules** (avec leur affixe propre)

> [!warning] À trancher
> **Décision finale par le Design Lead** : adopter ces set bonuses 3/5/8 ou rester sur affixes individuels uniquement ? Si adopté, les 7 autres slots devront prévoir le marqueur `set_id` dans leur frontmatter.

### Synergies non-set (toujours valides)

Indépendamment de la décision set : certaines synergies **émergentes** existent toujours, simplement par cumul d'affixes/variants :

- **Robe Spectrale + Bottes Spectrales** : 2 procs de phase indépendants → quasi-immunité 0.3 s/8 s × 2 = uptime ~7 %
- **Tunique Cuir Shadow + Capuche Cuir Shadow** : +2 procs invisibilité courte → playstyle assassin
- **Plate Pourpre + Heaume Doré** : combo paradoxal (esquive d'illusion + révélation) — ne s'annule pas mais variant Doré expose le porteur

→ Ces synergies sont **émergentes du système d'affixes/variants**, pas codifiées comme sets.

---

## 10. Décisions ouvertes / chantiers de profondeur

### Décisions tranchées (canoniques pour les autres slots)

> Les agents qui produiront les 7 autres slots d'armure DOIVENT s'aligner sur ces choix.

✅ **Multiplicateurs de tier** (Tier 1 = ×1.00, Tier 6 = ×3.60) — voir §3.
✅ **Multiplicateurs de classe** pour défense effective — voir §4.
✅ **5 classes parallèles**, pas hiérarchiques — voir §1.
✅ **10 variants cosmiques** (Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable) — alignés avec armes P2.1.
✅ **Slots d'affixes** : 1 (T1) à 5+1 (T6, signature unique).
✅ **Affixes universels** valables sur tous les slots ; **affixes propres à classe** valables sur tous les slots de cette classe.
✅ **Recettes** suivent le pattern : T1-T2 simple (Novice/Initié), T3 Adepte, T4-T5 Expert, T6 Maître + condition cachée 🔒 fréquente.
✅ **Variants disponibles selon ère active** au moment du craft — irréversibles ensuite.

### Décisions ouvertes (à trancher)

⚠️ **Set bonuses** : adopter ou non — voir §9. **REFONTE-NEEDED**.
⚠️ **Affixes ères-spécifiques** (effets actifs uniquement pendant une ère donnée) : permanents post-craft ou tournants ?
⚠️ **Stacking de variants** : un seul variant possible — confirmé. Mais que se passe-t-il si on enchante un variant existant avec un affixe d'ère différente ?
⚠️ **Réparation** : est-ce qu'une cuirasse se dégrade et se répare ? (lien avec [[Économie]] joueur-driven). Pas tranché ici.
⚠️ **Transmog / cosmétique** : peut-on porter visuellement un set tout en bénéficiant des stats d'un autre ? (lien avec [[Le Souffle#Effets sociaux d'un Souffle]] où les cosmétiques sont sacrés).
⚠️ **Craft à 2-3 métiers** : la Cuirasse Plate exige Forgeron + Armurier ; les Spécial peuvent exiger 3 métiers. **Comment cela s'orchestre-t-il dans l'UI** ? (transfert d'item entre joueurs/stations ? un seul joueur multi-métier ?)
⚠️ **Calibrage exact des chiffres** : à valider en playtest. Les valeurs posées sont **proportionnelles cohérentes** mais non playtestées.

### Notes pour les futurs agents armure (autres slots)

> Liste de contraintes pour P2.3 → P2.9 (les 7 autres slots).

#### Ce qui doit rester PAREIL

1. **Multiplicateurs de tier** (×1.00 → ×3.60) — non négociable.
2. **Multiplicateurs de classe** (Tissu ×0.5 phys, Plate ×1.5 phys, etc.) — non négociable.
3. **5 classes parallèles** sur tous les slots qui les supportent (voir tableau §2 [[Catégories d'Items]] — certains slots n'ont pas de Mailles ou Plate selon la liste canonique).
4. **10 variants cosmiques** identiques — mêmes effets visuels, modificateurs gameplay adaptés au slot.
5. **6 tiers** avec pattern affixes 1→5+1.
6. **Recettes** : pattern intrants × Maîtrise × durée × mini-jeu cohérent par classe (Tissu = métier à tisser cadence ; Plate = forge timing température ; etc.).

#### Ce qui doit VARIER

1. **Baseline défense par slot** — non égalitaire avec la cuirasse :

| Slot | Ratio défense / Cuirasse | Justification |
|---|---|---|
| Torse (Cuirasse) | **100 %** (référence, posée ici) | Surface couverte max, point d'impact principal |
| Tête (Heaume) | 30-35 % | Surface réduite mais critique (×2 dégâts crit reçus si non-protégé) |
| Jambes (Jambières) | 25-30 % | Surface importante mais coups moins fréquents |
| Épaules (Pauldrons) | 15-20 % | Petite surface, parade des coups latéraux |
| Bras (Brassards) | 12-15 % | Petite surface |
| Mains (Gantelets) | 10-12 % | Petite surface, mais bonus offensif (vol de vie, dégâts contondants si Plate) |
| Pieds (Bottes) | 10-12 % | Petite surface, mais bonus mobilité (pas silencieux Cuir, +mvt Plate inverse) |
| Taille (Ceinture) | 8-10 % | Plus petit slot, focus accessoires |

> Le **total armure** d'un set complet 8 pièces de la même classe à T3 ≈ Cuirasse T3 × 2.05 (somme des ratios). Le calcul de défense effective de §4 reste identique.

2. **Slots d'affixes par tier** — non égalitaires :

| Slot | Affixes max T6 |
|---|---|
| Cuirasse | 5+1 |
| Jambières / Heaume | 4+1 |
| Pauldrons / Gantelets / Bottes | 3+1 |
| Brassards / Ceinture | 2+1 |

3. **Bonus stats brutes spécialisés** par slot :
   - Heaume → **Acuité**, **Mémoire** (acuité visuelle, mémoire des combats)
   - Bottes → **Vivacité**, **Endurance** (mouvement, sprint)
   - Gantelets → **Vigueur** (force des coups), **Acuité** (précision)
   - Ceinture → **Endurance**, capacité de port
   - Pauldrons → **Vigueur** (encaissement), parade
   - Brassards → **Vigueur** (parade arme), critique
   - Jambières → **Endurance**, **Vivacité** (esquive)

4. **Variations de noms** : chaque slot a des termes différents par classe (Heaume Plate vs Casque Mailles vs Capuche Tissu) — voir [[Catégories d'Items#Sous-famille — Armures (8 slots canoniques)]].

5. **Mini-jeux de craft** : Forge timing température reste pour la Plate ; mais selon le slot, le **type de manipulation** varie (estampage Heaume, étirage Brassards, soudure Gantelets, etc.).

#### Patterns à reproduire intégralement

- Structure du fichier en 10 sections (Vue d'ensemble → Décisions ouvertes).
- Frontmatter complet avec `subcategory: Armure`, `slot: <Slot>`, `classes: [...]`.
- Tableau pivot 6 tiers × 5 classes obligatoire.
- Section Variants cosmiques avec les 10 mêmes variants (effets adaptés au slot).
- Stub Phase 4 pour les signatures (2-3 par grand pays).
- **Référence systématique à cet archétype Cuirasse** comme source canonique.

---

## Synthèse des patterns canoniques posés

> [!important] À retenir pour les autres archétypes d'armure
>
> 1. **Tier multipliers** : ×1.00 / ×1.30 / ×1.70 / ×2.20 / ×2.80 / ×3.60
> 2. **Class defense ratios (phys / mag)** : Tissu 0.5/1.5 · Cuir 1.0/1.0 · Mailles 1.2/0.9 · Plate 1.5/0.6 · Spécial 1.1/1.1
> 3. **Slot ratios** (Cuirasse = 100 %) : Heaume 30-35 · Jambières 25-30 · Pauldrons 15-20 · Brassards 12-15 · Gantelets 10-12 · Bottes 10-12 · Ceinture 8-10
> 4. **Affix slots** : T1 = 1 → T6 = 5+1 (signature unique)
> 5. **Mastery palier requis** : T1-T2 Novice/Initié · T3 Adepte · T4-T5 Expert · T6 Maître (+ condition cachée 🔒)
> 6. **10 variants cosmiques** mappés aux entités cosmologiques, irréversibles post-craft, disponibilité par ère active
> 7. **Compression du Souffle** : −10 % stats temporaires sur 2 semaines pour T4+ (voir [[Le Souffle#Ce qui est touché vs préservé]])

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Crafts]] · [[Sources de Ressources]] · [[Personnage]] · [[Combat]] · [[Le Lien]] · [[Le Souffle]] · [[Les Ères]] · [[Architecture Data-Driven]]*
