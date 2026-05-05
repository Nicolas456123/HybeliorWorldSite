---
tags: [pnj, comportement, métier, peintre, divertissements]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Divertissements/Peintre]]
mbti_typique: [ISFP, INFP, INTP]
karma_typique: vert
factions_compatibles: [Cours royales, Cathédrales (fresques religieuses), Académies de peinture, Ateliers privés, Foedus Animae]
needs_review_for: [calibration-playtest, pigments-d'ère-recettes, mood-baseline-par-ère]
---

# 🎨 Template PNJ — Peintre

> Comportement PNJ pour un **Peintre** (Acuité+Verbe, Divertissements). **ISFP/INFP introspectif**, atelier silencieux, **œuvres pour Héritage**. **Modèle d'inspiration et de mood** : mood baseline élevé en ère [[Verdoiement]], etc. (cohérent §5.5 modulation paramétrique).
>
> Source métier : [[03 - Mécaniques/Métiers/Divertissements/Peintre]].

---

## 1. Vue d'ensemble

Le Peintre PNJ est l'**œil silencieux** d'Hybelior. Métier **introspectif** par nature, contrastant avec les autres Divertissements (qui sont extravertis). Il produit fresques (monumentales), tableaux (portatifs), portraits, enluminures, décors de théâtre. **Héritage actif** : fresques monumentales = Œuvres signées qui survivent aux Souffles.

**Particularités majeures** :
- **ISFP/INFP introspectif** : exception parmi les Divertissements (E majoritaire ailleurs)
- **Atelier silencieux** : peu d'interactions, sessions longues
- **Mode Festivité atténué** : observe, peint la fête plutôt que d'y participer
- **Mood baseline modulé par ère** : Verdoiement = mood haut (couleurs vibrantes), Ombre Longue = mood bas (palettes sombres) — modèle d'inspiration
- **Héritage signé fréquent** : fresque monumentale palier Maître = œuvre permanente

> [!important] Frontières
> - **Peintre** = 2D (fresques, tableaux, portraits, enluminures). Acuité + Verbe.
> - **[[Sculpteur]]** (Artisanat M2) = 3D
> - Collaboration avec [[Acteur]] (décors), [[Bibliothécaire]] (enluminures), [[Cartographe]] (cartes illustrées)

---

## 2. Cycle quotidien typique

```
07:00 — Lever
07:30–09:00 — Petit déjeuner discret, préparation pigments (broyage matinal)
09:00–13:00 — **Atelier** : peinture (cœur du métier, lumière du matin idéale)
13:00–14:00 — Repas (souvent solo)
14:00–17:00 — Atelier : finition / commandes / portraits sur place
17:00–18:00 — Pause, sortie promenade observatoire (croquis, INFP)
18:00–20:00 — Repas, étude (modèles, traités d'art)
20:00–22:30 — Lecture, dessin libre, parfois conversation amis
23:00 — Coucher
```

**Modulation MBTI** :
- **ISFP** (45%) : artiste discret, performance émotionnelle silencieuse
- **INFP** (35%) : peintre-poète, compositions symboliques
- **INTP** (20%) : intellectuel, expérimentations techniques (perspective, pigments)

**Modulation Ère (modèle de mood)** :
- **Verdoiement** : Mood baseline +20, palettes vibrantes
- **Ombre Longue** : Mood -10, palettes sombres
- **Brume Mortelle** : Mood -20, mais inspiration symbolique forte (N+F)
- **Vents** : Mood +10, peintures aériennes lumineuses

---

## 3. MBTI typique et variantes

### 3.1 ISFP — Aventurier (45%)
- Artiste discret, sensible aux couleurs et textures
- Karma vert+, peu social mais accueillant
- Mode Festivité observateur (peint les festivités)

### 3.2 INFP — Médiateur (35%)
- Peintre-poète, compositions symboliques
- Compatible [[Lore/Religions/Foedus Animae|Foedus Animae]] (mémoire des défunts en portraits)
- Donneur de quêtes lyriques ("trouve-moi le bleu d'aurore parfait")

### 3.3 INTP — Logicien (20%)
- Intellectuel, perspective géométrique
- Fresques d'architecture, schémas, cartographies illustrées
- Compatible duo avec [[Cartographe]] / [[Architecte]]

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **CommissionReceived** | Commande tableau/fresque | Mode Quête (production), durée 1-30 jours |
| **ModelArrives** | Modèle pour portrait | Mode Dialogue intense, observation aiguë |
| **PigmentRare** | Pigment d'ère reçu | Mood +30, expérimentation immédiate |
| **PaintSpilled** | Accident atelier | Mood -15, nettoyage urgent |
| **EraSouffleBroadcast** | Nouveau Souffle | Adapte palette + sujets ; **mood baseline modulé** |
| **PatronVisits** | Mécène/noble visite atelier | Mode Dialogue diplomatique, présentation œuvres |
| **OutdoorLightOptimal** | Tag `Light.GoldenHour` | Sortie croquis paysages |

---

## 5. Modes superposables

| Mode | Comportement Peintre | LOD requis |
|------|--------------------------|------------|
| **Routine** | Atelier + sortie croquis | Tous |
| **Marchand** | Vente tableaux, portraits sur commande | L0/L1 |
| **Dialogue** | Lent, posé, observateur. Note les détails du visage de l'interlocuteur | L0 |
| **Crise** | **PRIORITÉ** : sauve fresque non sèche / tableau en cours, puis fuite | L0 |
| **Festivité** | **Atténué** : observe, croquis sur place, ne participe pas activement | Tous |
| **Religieux** | Fresques religieuses (Foedus, Rota Mundi) ; rituels iconographiques | Tous |
| **Deuil** | Compose **portrait posthume** ; mood -25 ×1.5 (F) | Tous |
| **Quête** | Donneur léger : "trouve pigment rare", "modèle pour mon tableau" | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur commande portrait (rep > 25)
- **Branche BT** : `Dialogue.PortraitCommission`
- **Utility** : `Social.Trade` +30, observation aiguë du visage joueur
- **MBTI** : ISFP capture émotion ; INFP saisit symbolisme ; INTP géométrie
- **Effet** : portrait livré 3-7 jours, prix selon palier (50-5000 Éclats)

### 6.2 Mode Crise — incendie atelier
- **Branche BT** : 
  1. `BTTask_GrabUnfinishedWork` (œuvre en cours)
  2. `BTTask_GrabRarePigments` (boîte à pigments rares)
  3. PUIS `Combat.Flee`
- **MBTI** : ISFP figé brièvement (Peur F) ; INFP émotionnel ; INTP rationnel
- Si fresque murale (immobile) : impossible à sauver, Mood -100 si destruction (Héritage perdu)

### 6.3 Festival local
- Mode Festivité **atténué** : Peintre s'installe à l'écart, **croque** la scène
- ISFP : silencieux observateur ; INFP émotionnel ressent l'ambiance ; INTP analyse compositions
- Effet possible : **œuvre festive** générée (tableau de la fête, vendable)

### 6.4 Phénomène cosmique
- **Branche BT** : observation + croquis (priorité données visuelles)
- **MBTI N+F** : exalté symboliquement, compose tableau d'ère
- **Mémoire** : événement w80 individuelle, source de futures œuvres signées

### 6.5 Souffle imminent / changement d'Ère
- **Branche BT** : `Routine.EraInspiration`
- **Effet** : recompositions de palettes, possible **série d'œuvres d'Ère** (Héritage activable)
- **Mood baseline modulé** : palette + sujets adaptés à l'Ère active (cohérent §5.5)

### 6.6 Joueur Karma rouge
- Civil → fige, baisse les yeux, range pinceaux
- Pas d'alerte (I dominant)
- Si pris pour cible : fuite immédiate (faible Vigueur)

### 6.7 Mort d'un proche (graphe `family`)
- Compose **portrait posthume** (rituel funéraire personnel)
- Mood -25 ×1.5 (F dominant), routine ralentie 14j
- Cohérent §5.7 + §13 funérailles

---

## 7. Lifecycle (§18)

- **Persistant** très fréquent (Peintre = identité d'atelier)
- Maître Peintre = nommé authored (~5-10 par grande ville)
- **Mort permanente** si nommé : side quest "L'œuvre inachevée" + tableau en cours devient relique
- **Héritage** : fresques monumentales survivent aux Souffles (Œuvre signée permanente)
- **Successeur narratif** : apprenti reprend atelier (Maîtrise -1)

---

## 8. Variantes et signatures PNJ

### 8.1 Le peintre de cour
- ISFP, élégant, accès royal
- Affiliation Couronne, portraits politiques
- Donneur de quêtes prestigieuses

### 8.2 Le fresquiste de cathédrale
- INFP, compatible [[Lore/Religions/Foedus Animae|Foedus Animae]]
- Œuvres monumentales, échafaudages
- Héritage actif : fresques permanentes

### 8.3 Le portraitiste itinérant
- ISFP, voyage de ville en ville
- Karma vert, accueille tous les modèles
- Donneur de quêtes "aide-moi à atteindre le prochain village"

### 8.4 Le peintre-théoricien (INTP)
- Recherches techniques (perspective, pigments d'ère)
- Compatible duo avec [[Chercheur]]
- Donneur de quêtes "trouve composant pour pigment cosmique"

---

*Liens : [[03 - Mécaniques/Métiers/Divertissements/Peintre]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Acteur]] · [[Sculpteur]] · [[Cartographe]] · [[Lore/Religions/Foedus Animae]] · [[Les Ères]] · [[Le Souffle]] · [[L'Accord]]*
