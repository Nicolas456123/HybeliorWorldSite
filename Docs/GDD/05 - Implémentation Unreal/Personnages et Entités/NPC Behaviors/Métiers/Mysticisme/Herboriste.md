---
tags: [pnj, comportement, métier, herboriste, mysticisme, plantes, ia, template]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: "[[03 - Mécaniques/Métiers/Mysticisme/Herboriste]]"
mbti_typique: [ISFJ, INFP, ISTJ]
karma_typique: vert
voie_magique_principale: Spiritus (optionnelle, non-Lié fréquent)
religion_compatible: [Vael'Kurash, Foedus Animae, Somnium Vigil]
factions_compatibles: [Vael'Kurash, Foedus Animae, Cercles de Spiritus, Guildes d'herboristerie]
template_alternatif_souffle: false
ritual_pattern_religion: [RP_VAEL_KURASH (si Lié), RP_SOMNIUM_VIGIL (Vigili herboriste)]
needs_review_for: [calibration-playtest, pont-botaniste-apothicaire]
---

# 🌿 Template PNJ — Herboriste

> Comportement situationnel d'un PNJ Herboriste. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Pivot entre récolte (Botaniste M6 Exploration) et préparation (Apothicaire M5)**. Métier joueur correspondant : [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste]].
>
> **Particularité Mysticisme** : seul métier de Mysticisme où **Mémoire+Acuité dominent** (vs Esprit+Résonance). Souvent **non-Lié** — beaucoup d'Herboristes excellents sont purement terrestres. Routine bi-modale : **récolte en nature** (matin) + **cabinet** (après-midi).

---

## 1. Vue d'ensemble

L'Herboriste est le **connaisseur des plantes** d'Hybelior — médicinales, magiques, rituelles, alimentaires, hallucinogènes. Métier-pivot **hybride** entre la botanique pure et l'application mystique, **fournisseur essentiel** dans la chaîne mystique (Apothicaire, Alchimiste, Guérisseur, Prêtre, Mage de Spiritus).

- **Identité comportementale** : méthodique-curieux, MBTI dominants Sensing+Mémoire, attention aux détails écologiques, marche silencieuse
- **Position sociale** : respecté en village rural, pivot commercial avec Apothicaire/Alchimiste ; en capitale, métier de quartier
- **Slot Mode Marchand** : **fort** — vente plantes brutes, herbes séchées, infusions de base
- **Lien chaîne** : amont propres (récolte) · aval [[03 - Mécaniques/Métiers/Mysticisme/Apothicaire|Apothicaire]] (intrants principaux), [[Alchimiste]] (potions complexes), [[03 - Mécaniques/Métiers/Mysticisme/Prêtre|Prêtre]] (encens sacré), [[03 - Mécaniques/Métiers/Mysticisme/Guérisseur|Guérisseur]] (plantes rituelles), [[03 - Mécaniques/Métiers/Mysticisme/Mage|Mage]] de Spiritus (composantes)

---

## 2. Cycle quotidien — bi-modal récolte/cabinet

```
05:00  Lever, lecture du calendrier lunaire (cycles de récolte)
05:30  Petit-déjeuner léger
06:00  **Sortie en nature** — cueillette, identification, séchage
06:00-11:00  Cueillette en forêt/plaine/marécage selon saison + lecture animale (cf [[Prédiction]])
11:00  Retour atelier, tri des récoltes
12:00  Repas
13:00  **Cabinet d'herboristerie ouvert** — vente, préparation, conseil
13:00-18:00  Service clientèle, transformation primaire (séchage, infusion, mortier)
18:00  Inventaire de stocks, étiquetage
19:00  Repas
20:00  Étude carnet de plantes, cycles cosmiques (cf [[Les Ères]] si fleurs d'ère)
21:30  Coucher
```

### Boucle de récolte canonique (T1-T5 spécialisés)

```
[T1 Préparation — serpe, pochette, carnet]
   ↓
[T2 Pathfinding nature — chemin connu OU exploration]
   ↓
[T3 Identification — Acuité × Mémoire (qualité récolte)]
   ↓
[T4 Récolte rituelle (serpe + parole rituelle si Lié)]
   ↓
[T5 Stockage pochette → retour atelier → séchoir]
```

> Voir `atelier_herboristerie`, `sechoir`, `cabane_cueillette`, `jardin_herbes` pour ancres spatiales.

---

## 3. MBTI typique

| Type | Profil Herboriste | Note |
|------|-------------------|------|
| **ISFJ** | Herboriste de village, mémoire encyclopédique des familles malades | Profil dominant — défenseur communautaire |
| **INFP** | Herboriste poète-rêveur, dialogue avec plantes (Spiritus si Lié) | Profil rural-mystique |
| **ISTJ** | Herboriste rigoriste, carnet codifié, cueillette à horaire strict | Profil méthodique commerçant |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **S (ISFJ/ISTJ)** : focus pratique, mémoire des plantes concrète, identification précise
- **N (INFP)** : interprétation symbolique des plantes, dialogue avec elles si Spiritus
- **F (ISFJ/INFP)** : refuse de cueillir sans rituel/respect ; soin gratuit aux pauvres
- **T (ISTJ)** : commerce structuré, prix fixes, stocks rigoureux
- **J (ISFJ/ISTJ)** : routine de cueillette stricte, calendrier lunaire respecté
- **P (INFP)** : exploration spontanée, découverte de plantes rares aléatoire
- **I** (commun aux 3) : marche silencieuse en forêt, dialogues brefs avec clients

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **HarvestSeason** | Saison de plante rare en cours | Cueillette intensive (sortie 7h vs 5h standard) |
| **MoonPhaseRitual** | Phase lunaire spécifique (cueillette nocturne plantes) | Sortie nocturne exceptionnelle |
| **EraFlowerActive** | Fleur d'ère apparait (cf [[Les Ères]]) | Sortie urgente, mémoire `Memory.Public.EraFlowerSpotted` weight 60 |
| **ClientNeedsRare** | Client recherche plante rare en stock | `Social.Trade` +30, marchandage personnalisé |
| **ForestDangerNear** | Créature majeure dans zone récolte | `Routine.Continue` -50, retour atelier ; ISFJ refuse risque |
| **AnimalPredictionSign** | Lecture animale signale Souffle imminent | Mode Dialogue avec [[03 - Mécaniques/Métiers/Mysticisme/Oracle|Oracle]] / Prêtre, propage info |
| **PlanteRareDiscovered** | Identification plante rare lors récolte | Mood +20, mémoire individuelle weight 80 |
| **EraSouffleBroadcast** | Nouveau Souffle | Modulation : Verdoiement → +30% rendement, Effroi → -20% |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Récolte matin / cabinet après-midi | Cycle bi-modal |
| **Marchand** | Cabinet ouvert, client présent | Vente herbes brutes/séchées/infusions ; T = prix fixes, F = ajustables |
| **Dialogue** | Client demande conseil identification | Long, encyclopédique ; ISFJ = chaud familial, ISTJ = factuel |
| **Crise** | ThreatLevel ≥ 50 OU créature menaçante en récolte | Fuite vers atelier (pacifique) ; saturation Peur ≥ 80 fréquente |
| **Festivité** | Festival local (Vael'Kurash solstices) | Étal d'herbes festives, présence modérée |
| **Religieux** | RitualPattern Vael'Kurash / Somnium Vigil (si fidèle) | Office au bois sacré OU sieste rituelle |
| **Deuil** | Mort proche détectée | Cycle ralenti 14j, refus cueillette joyeuse |
| **Quête** | Donneur (chercher plante rare, soigner cas isolé) | Continue routine + dialogue spécifique |

Cascade : **Crise (fuite pacifique) > Religieux > Deuil > Marchand > Routine**.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur achète plantes au cabinet

- **Trigger** : Joueur < 5m + cabinet ouvert (13:00-18:00)
- **Branche BT** : `ModeSocial.HerbalistTrade`
- **Comportement** :
  - ISFJ : "Pour quel mal cherchez-vous remède ? J'ai de la sanguinaire fraîche."
  - INFP : "Cette plante vous appelle... regardez son aura."
  - ISTJ : "Inventaire à jour. 5 Éclats l'once de mousse-de-lumière."
- **Prix** : modulé Reconnaissance × T/F ; F = -10% pauvre, T = strict

### 6.2 Joueur sollicite conseil (identification plante)

- **Trigger** : Joueur présente plante non identifiée
- **Branche BT** : `ModeSocial.Identification`
- **Comportement** : examen Acuité × Mémoire ; rendu confiance modulée Mémoire stat
- **Réputation** : si conseil correct → +10 individuel ; si erreur (rare) → -5

### 6.3 Cueillette rituelle (Spiritus Vael'Kari)

- **Trigger** : Sortie matinale + Voie de Spiritus active (Herboriste-Lié)
- **Branche BT** : `Routine.RitualHarvest`
- **Comportement** :
  - Salutation à la plante ("merci pour ton don")
  - Récolte avec serpe rituelle (refus de l'arracher)
  - **Plantes "consentent"** narrativement → +20% qualité (canonique [[03 - Mécaniques/Métiers/Mysticisme/Herboriste]])
- **Tabou** : refuse de récolter sans rituel les plantes sacrées (sève d'arbre ancien, lotus de Foedus Animae)

### 6.4 Lecture animale (Prédiction §Imminence)

- **Trigger** : observations en cueillette (oiseaux migrant tôt, comportements anormaux)
- **Branche BT** : `Routine.AnimalReading`
- **Comportement** : note dans carnet, propage info au village, dialogue avec Oracle/Prêtre si présent
- **Mémoire village** : `Memory.Public.HerbalistAnimalSign` weight 50 (si signe avéré ensuite)

### 6.5 Découverte plante d'ère

- **Trigger** : `EraFlowerActive` + identification réussie
- **Branche BT** : sortie urgente non planifiée
- **Comportement** : excitation INFP (interprétation cosmique), récolte prioritaire, propagation info
- **Mood** : `Joy +20`, mémoire individuelle weight 100

### 6.6 Souffle / changement d'Ère

- **Effets paramétriques** :
  - **Verdoiement / Spiritus alignment** : +30% rendement récolte
  - **Effroi / Brume** : -20% rendement, refus sortie certaines zones
  - **Tempora (Échos Brisés)** : plantes "instables" (récolte 10% chance d'inverse propriété)
  - **Floraison** : nouvelles plantes apparaissent, mémoire enrichie

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (persistant, ~2-5 par village rural, 1-2 par capitale) ou Nommé authored (rare, "Doyenne X")
- **Mort transient/famille** : 7 jours → successeur (apprenti hérite cabinet et carnet de plantes)
- **Mort nommé authored** : permanente, side quest "Le carnet perdu" générée
- **Apprenti** (graphe §5) : 0-2 apprentis ; transmission orale + carnet
- **Héritage** : Doyenne Herboriste peut signer une **Encyclopédie de Plantes Héritage**

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par profil

| Profil | Religion | MBTI dominant | Spécialité |
|--------|----------|---------------|------------|
| **Herboriste-Lié Spiritus** | Vael'Kurash | INFP, INFJ | Dialogue plantes, récolte sans perte qualité, narratif fort |
| **Herboriste de Somnium Vigil** | Somnium Vigil | INFJ, INFP | **Plantes hallucinogènes sacrées** (Herbes de Somnix), karma jaune (substances illicites certaines cultures) |
| **Herboriste profane** | aucune | ISFJ, ISTJ | Récolte massive et commerce, vert standard |
| **Herboriste-Apothicaire (hybride)** | variable | ISFJ, ISTJ | Cumule récolte + préparation T1 traditionnelle |

### RitualPattern compatibles

- **Vael'Kurash** (si Lié) : offrande matinale + bois sacré 1×/sem (parfait alignement avec Spiritus)
- **Somnium Vigil** (si Vigili-Herboriste) : siestes longues + Herbes de Somnix
- **Foedus Animae** (rare) : offrande autel + lien aux plantes ancestrales

### Signatures PNJ (Phase 4 stub)

- **Mère Tirshara la Doyenne** (ISFJ Maître, Alkaran) — Vael'Kari, citation canonique du fichier source
- **Frère Sylven aux Champignons** (INFP Adepte, Vytharia) — Vigili Somnium Vigil, Herbes de Somnix
- **Maître Tobin le Rigoriste** (ISTJ Maître, Galenor) — Herboriste profane, guilde commerciale
- **Sœur Imrenna des Marais** (INFP Adepte, Onara) — récolte de plantes aquatiques rares

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste (archétype joueur)]] · [[03 - Mécaniques/Métiers/Mysticisme/Apothicaire|Apothicaire]] · [[Alchimiste]] · [[Prédiction]] · [[Le Lien]] · [[Cosmologie]]*
