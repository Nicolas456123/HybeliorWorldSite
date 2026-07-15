---
tags: [métier, archétype, artisanat, vivacité, endurance, tissage, fabriqué]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Vivacité
stats_secondaires: [Endurance, Acuité, Mémoire]
craft_category: Tissage et confection
sources_ressources_accessibles: [Laine plante, Laine creature, Soie (Bestiaire), Fil métallique, Pigment, Algue (lin marin)]
stations_principales: [Métier à tisser, Rouet, Cardeuse, Cuve à teinture, Étendoir]
outils_principaux: [Aiguille et fuseau, Navette, Cardes, Peigne tissage, Devidoir]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Tailleur, Métiers#Cordier, Métiers#Fileur, Métiers#Couturier, Métiers#Botaniste (lin/coton), Métiers#Berger (laine)]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Tisserand-Tailleur-Cordier-Fileur, soie-creature-spider-vs-ver, calibration-cadence-mini-jeu]
---

# 🧵 Archétype-Métier — Tisserand

> Métier **producteur du tissu intermédiaire**. Le Tisserand transforme les **fibres** ([[Sources de Ressources]] §Nature §Fibreux + §Créature §Laine creature) en **tissu** prêt à être assemblé par le [[Tailleur]] / [[Cordonnier]] / [[Métiers|Couturier]].

> **Frontière canonique avec [[Tailleur]] (M2)** : le **Tisserand fabrique le tissu** (intermédiaire de [[Sources de Ressources]] §Fabriqué) ; le **Tailleur le coupe et le coud** en vêtements. Distinction nette, pas concurrents — métiers en chaîne.

---

## 1. Vue d'ensemble

Le **Tisserand** carde les fibres, file le fil, tisse le tissu, le teint, l'apprête. Il est le **maillon producteur** de la fibre brute au tissu utilisable. Sa production est l'intrant principal du [[Tailleur]] et alimente aussi [[Cordonnier]] (lacets, doublures), [[Métiers|Cordier]] (cordes), [[Métiers|Apothicaire]] (gaze, bandages).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Métiers|Botaniste]] (laine plante = coton, lin), [[Métiers|Berger]] (laine animale = mouton, alpaca-like), [[Bestiary/Index|Bestiaire]] / Chasseur (soie d'arachnides ou similaires, laine de créatures rares), [[Métiers|Pêcheur]] (algue marine pour lin marin), [[Métiers|Apothicaire]] (pigments)
- **Aval** :
  - **[[Tailleur]]** (tissu pour vêtements) — débouché principal
  - **[[Cordonnier]]** (lacets, fil cuir)
  - **[[Métiers|Cordier]]** (cordes — frontière partagée)
  - **[[Métiers|Apothicaire]]** (gaze, bandages)
  - **[[Métiers|Voilier]]** *(stub Phase suivante)* (voiles bateaux — Cestra, Aerion)

**Identité gameplay :**
- Métier **rythmique-endurant** — `Vivacité` (cadence métier à tisser, gestes répétés rapides), `Endurance` (sessions très longues), `Acuité` (régularité du tissage), `Mémoire` (motifs, patrons textiles)
- Métier **production de masse** : un tisserand alimente plusieurs tailleurs/cordonniers
- Métier **infrastructure lourde** : métier à tisser = station immobile, peu d'aventure mobile

**Frontière canonique :**
- **Tisserand ≠ Tailleur** : Tisserand produit le **tissu** ; Tailleur le **coud**. Frontière stricte, pas de chevauchement.
- **Tisserand ≠ Couturier** : Couturier = sous-spé Tailleur (couture seulement)
- **Tisserand vs Cordier** : Cordier = cordes (frontière partagée — voir §11)
- **Tisserand vs Fileur** : Fileur = sous-spé palier Initié+ (filage du fil seulement, en amont du tissage)

**Ancrage culturel :** Cestra (lin marin et voiles), Endora (soies fines), Galenor (laine impériale standard), Alkaran (laines épaisses nordiques), Onara (lin sacré rituel), Cendara (fibres volcaniques exotiques).

---

## 2. Stats & Maîtrises

| Stat | Rôle |
|------|------|
| **Vivacité** *(principale)* | Cadence métier à tisser, gestes répétés rapides |
| **Endurance** *(principale)* | Sessions très longues (un mètre de tissu = heures) |
| **Acuité** *(secondaire)* | Régularité du tissage, détection défauts |
| **Mémoire** *(secondaire)* | Motifs, patrons textiles, signatures |
| Verbe | Vente brut au Tailleur, négoce |

### Maîtrises contextuelles

- **`Maîtrise_Tissage`** — racine
- **`Maîtrise_Filage`** — sous-spé fil (palier Initié+, frontière [[Métiers|Fileur]])
- **`Maîtrise_Teinture`** — sous-spé pigment (palier Adepte+, frontière Teinturier)
- **`Maîtrise_Soie_Rare`** — sous-spé fibres exotiques Bestiaire (palier Expert+)
- **`Maîtrise_Tissage_Rituel`** — tissus sacrés (palier Maître)

---

## 3. Sources de ressources accessibles

### Intrants

| Intrant | Source | Notes |
|---------|--------|-------|
| **Laine plante** *(coton, lin)* | Nature ([[Métiers|Botaniste]]) | T1-T3, base universelle |
| **Laine creature** | Créature ([[Métiers|Berger]] / Chasseur) | Mouton, alpaca-like — voir [[Sources de Ressources]] §Créature |
| **Soie creature** *(arachnides, vers magiques)* | Créature (Chasseur/Dépéceur) | T3+ rare — Bestiaire |
| **Fil métallique** | Fabriqué (Métallurgiste / Bijoutier) | Brocard, dorure tissu (palier Adepte+) |
| **Pigment** | Fabriqué (Teinturier / Apothicaire) | Coloration |
| **Algue / Lin marin** | Nature (Pêcheur côtier) | Cestra, voiles, tissus marins |

### Sortie

- 1 session (Labeur ~30%) → 5-10 unités de tissu T1-T2 OU 2-3 unités T3 OU 1 unité de tissu rare T4-T5

### Variantes de tissu canoniques

| Tissu | Tier plancher | Tier plafond | Source | Usage typique |
|-------|---------------|---------------|---------|----------------|
| **Coton** | T1 | T2 | Laine plante (Botaniste) | Vêtements communs |
| **Lin** | T1 | T3 | Laine plante / Algue | Vêtements, voiles |
| **Laine** | T1 | T3 | Laine creature (Berger) | Vêtements chauds, capes |
| **Brocart** | T3 | T4 | Coton/Lin + Fil métallique | Vêtements de cour |
| **Soie** | T3 | T5 | Soie creature (rare Bestiaire) | Vêtements raffinés, robes magiques |
| **Tissu cosmique** *(variant ère)* | T5 | T6 | Fibres rares + Cristal de Voie | Robes Légendaires |

---

## 4. Stations + outils

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Métier à tisser** | Tissage principal — lourd, immobile | T1+ |
| **Rouet** | Filage du fil | T1+ |
| **Cardeuse** | Préparation fibre | T1+ |
| **Cuve à teinture** | Coloration | T2+ |
| **Étendoir** | Séchage tissu teint | T2+ |
| **Métier à broder** *(frontière Tailleur)* | Motifs (palier Adepte+) | T3+ |

### Outils

| Outil | Notes |
|-------|-------|
| **[[Aiguille et fuseau]]** | Outil canonique [[Catégories d'Items]] §Outils — partagé Tailleur |
| **Navette** | Tissage |
| **Cardes** | Démêlage fibre |
| **Peigne tissage** | Tassage trame |
| **Dévidoir** | Mise en pelote |

---

## 5. Paliers de Maîtrise

| Palier | Capacités | Conditions |
|--------|-----------|------------|
| **1 — Novice** | Tissus T1 (coton, lin, laine basique). Échec 12% (mailles défaillantes) | Défaut |
| **2 — Initié** | Tissus T2, premières teintures unie. Filage propre | Usage : 50 m de tissu |
| **3 — Adepte** | Tissus T3 (brocart simple, motif teint). Soie débloquée | Usage : 200 m + commande |
| **4 — Expert** | Tissus T4 Magistral (brocart complexe, soie raffinée, motifs signatures). Tissage rituel débloqué | Usage : 500 m + signature reconnue |
| **5 — Maître** 🔒 | T5 Légendaire (tissu cosmique, soie d'Éternel-créature). T6 Mythique sur quête. Héritage | **Condition cachée** : ex. tisser une voile pour un navire mythique, fournir le tissu d'une robe royale d'intronisation, tisser pendant un événement d'ère exceptionnel |

---

## 6. Crafts / recettes débloqués

### Productions par palier

| Palier | Tissus communs | Tissus fins | Tissus rares | Spécial |
|--------|------------------|----------------|----------------|----------|
| Novice | Coton T1, lin T1, laine T1 | — | — | — |
| Initié | T2 + teinture unie | Lin Cestra | — | Voiles basiques |
| Adepte | T3 + motifs teints | Brocart simple, laine fine | Soie T3 | Tissu de cour |
| Expert | T4 broderie | Brocart complexe T4 | Soie raffinée T4-T5 | Tissu rituel |
| Maître | T5 patrimoniaux | Tissu cosmique T5-T6 | Soie d'Éternel | Voile mythique, tissu de Roi |

### Pattern recette canonique Tissage

> Tier N = **N×3 fibres T-N** + **(N-1) pigments** (si teint) + **station T-1** + **Mastery requis**.

> Mini-jeu canonique : **cadence métier à tisser** (T1-T3) + **précision motif** (T4+) + **canalisation rituelle** (T5-T6).

| Recette type | Tier | Intrants | Durée | Mini-jeu | Sortie |
|--------------|------|----------|-------|----------|--------|
| Tissu coton T1 | 1 | Laine plante × 3 | 30 min | Cadence (1 jauge) | 5× Tissu Commun |
| Tissu lin teint T2 | 2 | Laine plante × 4, Pigment × 1 | 1h | Cadence + dosage teinture | 4× Tissu Façonné |
| Brocart T4 | 4 | Soie × 3, Fil métallique × 2, Pigment × 2 | 4h | 4 jauges (cadence + motif + teinture + finition) | 1× Brocart Magistral |
| Tissu cosmique T5 | 5 | Fibres rares × 5, Cristal de Voie × 1, Pigment cosmique × 2 | 8h | 5 jauges + canalisation | 1× Tissu cosmique Légendaire |

### Affixes signature tissu (10)

1. **Tissage serré** — durabilité ×1.5
2. **Imperméable** *(traitement)* — résiste pluie/humidité
3. **Doublure-mémoire** — confort tenue (sans gêne)
4. **Lin marin** *(Cestra)* — résistance sel/humidité (voiles)
5. **Laine épaisse** *(Alkaran)* — résistance froid +20%
6. **Brocart royal** — bonus prestige tenue de cour
7. **Soie raffinée** — magnitude affixes Tailleur ×1.2
8. **Doré** ([[Les Ères|Rêve Lumineux]]) — fil or, prestige
9. **Spectral** ([[Les Ères|Échos Brisés]]) — tissu translucide
10. **Cosmique** — survit au [[Le Souffle|Souffle]] sans dégradation

---

## 7. Carrière et débouchés

```
[Apprenti] → [Tisserand de bourg] → [Tisserand de cité] → [Tisserand-Maître / Soie de cour] → [Tisserand-Légende patrimonial]
```

### Spécialisations

- **Tisserand commun** — production de masse coton/laine
- **Soyeux** — soie raffinée (frontière Bestiaire)
- **Voilier** *(stub futur)* — voiles de bateau (Cestra)
- **Cordier** — cordes (frontière)
- **Tisserand rituel** — tissus sacrés religion

### Débouchés

- **Boutique de tissu** — vente brut au [[Tailleur]] et autres
- **Tisserand de cour** — soie/brocart exclusif (Adepte+)
- **Tisserand de [[Guildes|guilde]]** — fournisseur tabards/uniformes
- **Voilier de port** — alimente flotte ([[Métiers|Navigateur]])

### Métiers complémentaires

- **[[Tailleur]]** — débouché principal (chaîne directe)
- **[[Métiers|Botaniste]]** / **[[Métiers|Berger]]** — fournisseurs amont
- **[[Métiers|Apothicaire]]** / Teinturier — pigments
- **[[Cordonnier]]** — débouché secondaire (lacets)
- **[[Métiers|Cordier]]** — frontière partagée (cordes)

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | +25% rendement laines plante (coton/lin abondant) |
| **Sommeil de Glace** (Aquor) | Demande laines épaisses +50%, fibre creature précieuse |
| **Vents** (Aerion) | Demande voiles +100%, lin marin bonifié |
| **Brume Mortelle** (Umbra) | Tissus *Pourpres* (variant) |
| **Échos Brisés** (Tempora) | Tissus Spectraux |

### Par contexte

- **Saison** — printemps/été = laine plante, automne = laine creature (tonte)
- **Faction** — commande tissus tabards/uniformes en série
- **Religion** — tissus rituels par religion (9 styles canoniques)
- **Pénurie fibre** — prix flambés

---

## 9. Économie

### Ratios canoniques

| Palier | Coût intrants par mètre | Vente | Marge | Volume |
|--------|----------------------------|-------|-------|--------|
| Novice | 2-5 Éclats | 8 Éclats | ~50% | 5 m / jour |
| Adepte | 20-50 | 80-300 | ~70% | 3-4 m / jour |
| Expert | 200-1000 | 1500-8000 | ~80% | 1-2 m / jour |
| Maître | 5000-50 000 | 50 000-500 000 | ~85% | 1 m / 2 jours (tissu cosmique) |

### Boucle de valeur

- Le Tisserand vend **brut** au Tailleur ou directement à l'hôtel des ventes (marges plus faibles que Tailleur, mais volume élevé)
- Tissu rare (soie) = haute marge

---

## 10. Comportement IA + signatures PNJ

### Routine Tisserand PNJ (Phase 2)

```
[Lever 06:00] → [Cardage / filage matin]
              → [09:00 : tissage continu sur métier (séances longues)]
              → [Mi-journée : pause + teinture si applicable]
              → [Après-midi : suite tissage]
              → [Fin de journée : étendage tissu / livraison Tailleur]
              → [Coucher 21:00]
```

### Signatures PNJ (Phase 4)

- **Maître Sirena de Cestra** — voilier-Maître, lin marin
- **Doyenne Aelis d'Endora** — soie raffinée
- **Vasta la Bordée d'Alkaran** — laines épaisses nordiques
- **Padre Iolan d'Onara** — lin sacré Foedus Animae
- **Maître Théron du Cratère** *(Cendara)* — fibres volcaniques exotiques

---

## 11. Décisions ouvertes

- [ ] **Frontière Tisserand / Cordier / Fileur** : 1 racine **Tisserand** + sous-spé Filage palier Initié+ + Cordier comme métier séparé (cordes ≠ tissu, mais matière commune). Validation : Cordier = sous-spé Adepte+ ou métier séparé Phase suivante
- [ ] **Soie creature** : exact mécanisme (Bestiaire) — quelles créatures produisent de la soie ? Phase 2 [[Taxonomie des Créatures]]
- [ ] **Voilier** *(Phase suivante)* : sous-spé Tisserand-Maître ou métier séparé ?
- [ ] **Calibration mini-jeu cadence** : exact rythme à playtester
- [ ] **Tissu rituel par religion** : 9 religions × Tisserand — Phase 4
- [ ] **Tissu cosmique** : drop ère seulement ou production continue avec composants rares ? Proposition : production rare avec Cristal de Voie (drop périodique)

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Tailleur]] · [[Cordonnier]] · [[Métiers|Apothicaire]] · [[Bestiary/Index]] · [[Économie]] · [[Les Ères]] · [[Lore/Religions/00 - Système Religieux]]*
