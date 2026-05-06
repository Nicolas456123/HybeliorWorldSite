---
tags: [pnj, comportement, métier, artisanat, dresseur, ia, template, transversal-bestiaire]
type: behavior-template
métier_lié: "[[Dresseur de créature]]"
mbti_typique: [ENFP, ESFP, INFJ]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Galenor cavalerie, Alkaran meute, Onara Foedus Animae, Cestra créatures marines]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-créatures, lien-Présence-stat, frontière-dressage-pacte-magique]
---

# 🐺 Template PNJ — Dresseur de créature

> Comportement situationnel d'un PNJ Dresseur. Métier **transversal** ([[Bestiaire - Index|Bestiaire]] / [[Exploration]] / Artisanat). Cycle long (jours réels par dressage). Forte interaction avec créatures vivantes — comportement adapté autour de l'enclos. Métier joueur : [[Dresseur de créature]].

---

## 1. Vue d'ensemble

Le Dresseur travaille à l'**enclos de dressage** ou à la **carrière**. Sessions terrain longues, lien comportemental fort avec les animaux. Il vend des montures/compagnons dressés à des prix élevés (dressage = jours réels). Souvent en plein air, accès direct au [[Bestiaire - Index|Bestiaire]].

- **Identité comportementale** : charismatique animal, observation patiente, voix calme et autoritaire
- **Lien chaîne** : amont [[Métiers|Chasseur]] (capture vivante), [[Métiers|Éleveur de créature]], [[Métiers|Berger]] · aval joueurs (montures), [[Cordonnier]] §Sellier (selles), [[Factions]] cavalerie

---

## 2. Cycle quotidien

```
06:00  Lever, soins matinaux créatures (T1 — nourriture, eau, inspection)
08:00  Sessions de dressage (T2) — par créature, 30-60 min chacune
12:00  Pause déjeuner près enclos
13:00  Reprise dressage (T3)
16:00  Présentation aux clients potentiels (Mode Marchand)
18:00  Soins du soir (T4) + sécurisation enclos pour la nuit
19:00  Repas + foyer
22:00  Coucher
```

Cycle particulier : un dressage T3+ s'étend sur **3-7 jours réels** (avancement progressif par session).

---

## 3. MBTI typique

| Type | Profil dresseur | Note |
|------|-----------------|------|
| **ENFP** | Dresseur passionné, joue avec créatures, charisme animal naturel | Le défaut canonique |
| **ESFP** | Dresseur-spectacle, présente créatures dressées en démonstration | Cirques, festivals |
| **INFJ** | Dresseur-mystique, lit l'âme animale, pacte profond, frontière Foedus Animae | Onara, lien spirituel |

Modulateurs :
- **F** (commun) : empathie animale forte, refus violence dressage
- **P** (ENFP/ESFP) vs **J** (INFJ) : ENFP/ESFP improvise selon réaction créature ; INFJ ritualise le dressage
- **N** (ENFP/INFJ) vs **S** (ESFP) : ENFP/INFJ lit signaux subtils ; ESFP focus comportement direct
- **E** (ENFP/ESFP) vs **I** (INFJ) : ENFP/ESFP vocal avec créatures ; INFJ silencieux, geste fin

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **CreatureNervous** | Créature dressée stress > seuil | Pause session, calme par voix/gestes |
| **CreatureBreakthrough** | Progression palier dressage | Mood +20, anim `caresser_créature_félicitation` |
| **CustomerInquiry** | Joueur s'intéresse à monture | Bascule Mode Marchand-Service, présente créature |
| **CapturedCreatureDelivery** | Chasseur livre créature sauvage vivante | Évalue, signe contrat, démarre apprivoisement |
| **PlayerArmDrawnNearCreature** | Player arme < 30m près enclos | ThreatLevel +50 (créature en danger), intervention immédiate |
| **CreatureEscape** ★ | Créature s'échappe enclos | Court-circuit P0 — poursuite immédiate, prévient garde si dangereuse |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → utilise créature dressée pour défense (frontière combat compagnon) |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalibration créatures (Tempora : créatures perturbées, spéciales) |

---

## 5. Modes superposables

| Mode | Activation | Spécificité |
|------|-----------|-------------|
| **Routine** | Soins + dressage | Cycle T1-T4 |
| **Marchand-Service** | Client intéressé monture | Présentation, démonstration, contrat (prix élevé) |
| **Dialogue** | Avec collègue Chasseur/Berger/Éleveur | Technique animal, anecdotes |
| **Crise** | Évasion, attaque enclos | Poursuite créature OU défense (utilise compagnons) |
| **Festivité** | Festival, démonstration | ESFP brille, anim parade créatures dressées |
| **Religieux** | Sabbat religion | Onara : rituels Foedus Animae avec créatures sacrées (faucons) |
| **Deuil** | Mort créature compagnon ★ | Mode Deuil ×2 intensité (lien §5 fort), 14j minimum |
| **Quête** | Apprivoisement créature spéciale | Projet 7-30 jours, défi narratif |

---

## 6. Réactions situationnelles canoniques

### 6.1 Présentation de monture (Mode Marchand)

- **Trigger** : `CustomerInquiry`
- **Comportement** :
  - **ENFP** : "Regardez ! Cette pouliche, elle a un caractère extraordinaire ! Elle adore galoper au crépuscule !" — passion débordante
  - **ESFP** : démonstration immédiate, fait galoper créature, pose acrobatique
  - **INFJ** : "Cette créature vous regarde déjà différemment. Elle vous a choisi avant que vous n'arriviez." — mystique
- **Prix** : 500-50 000 Éclats selon créature et palier dressage

### 6.2 Évasion d'une créature (Trigger CreatureEscape) ★

- **Branche BT** : court-circuit P0 — poursuite immédiate
- **Comportement** :
  - Sprint, voix calme appelant créature par nom
  - Lasso ou sifflet selon dressage atteint
  - Si créature dangereuse : alerte garde + civils
- **Mood** : `Peur +30` (créature peut être perdue), `Colere +20` chez INFJ (responsabilité personnelle)

### 6.3 Mort de créature compagnon ★ (Mode Deuil ×2)

- **Trigger** : Créature attachée meurt (graphe §5 spécifique compagnon animal)
- **Branche BT** : Mode Deuil intensité ×2
- **Comportement** :
  - 14j routine ralentie (×0.5 cadence)
  - Aucune session dressage 7 premiers jours
  - **INFJ** : rituel funéraire personnel, peut commander stèle/talisman à [[Sculpteur]]
  - **ENFP** : tristesse expressive, parle à voix haute du compagnon
- **Mémoire** : weight 100 individuelle permanent

### 6.4 Attaque sur l'enclos (Mode Crise spéciale)

- **Trigger** : Raid bandit ciblant créatures
- **Branche BT** : **Combat indirect** — utilise compagnons dressés pour défense
- **Comportement** :
  - Lâche créatures combatives (chiens de meute Alkaran, faucons Onara)
  - Recule pour donner ordres
  - Le Dresseur lui-même fuit en sécurisant créatures précieuses
- **MBTI INFJ** : peut entrer en transe-pacte si compagnon de pacte ([[Le Lien]] frontière)

### 6.5 Souffle / changement d'Ère

- **Tempora (Échos Brisés)** : créatures perturbées, comportements imprévisibles, sessions ralenties
- **Verdoiement** (Terranu) : abondance créatures sauvages, captures fréquentes
- **Eldoria** : créatures dorées tendance, demande nobles
- **Brume Mortelle** : créatures hybrides étranges, INFJ alerté ; ENFP intrigué

INFJ N : entend "le chant des bêtes" différemment selon Ère ; ESFP S : "Le cheval est cheval, l'Ère ne change rien."

### 6.6 Témoin maltraitance animale

- **Trigger** : Joueur ou PNJ frappe créature
- **Branche BT** : intervention immédiate, court-circuit dialogue agressif
- **MBTI F** (commun) : Colère +50 ; INFJ peut menacer pacte ([[Foedus Animae]])
- **Réputation joueur** : -50 individuelle + propagation Foedus Animae faction

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération + Nommé authored (Maîtres-Dresseurs prestigieux)
- **Apprenti** : 1-2 (jeunes apprivoiseurs)
- **Mort famille** : 14 jours → successeur (créatures transmises) ; reroll MBTI ENFP/ESFP/INFJ
- **Mort nommée** : permanente, créatures dispersées, side quest "Le compagnon orphelin"

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | Spécialité |
|--------|-------|------------|
| **Galenor** (impérial) | Cavaliers impériaux, chevaux militaires | ESFP |
| **Alkaran** (Nord) | Chiens de meute, cerfs nordiques | ENFP |
| **Cendara** | Créatures volcaniques exotiques | ESFP |
| **Onara** | Faucons sacrés Foedus Animae | INFJ |
| **Cestra** | Créatures marines (frontière Pêcheur) | INFJ |
| **Endora** | Compagnons exotiques de cour | ENFP |

### Signatures PNJ (Phase 4 stub)

- **Capitaine Aldric de Galenor** (ESFP) — école cavalerie impériale
- **Vahld le Loup d'Alkaran** (ENFP) — meutes de chasse nordiques
- **Sœur Avena d'Onara** (INFJ) — faucons sacrés Foedus Animae
- **Tezar le Volcanique de Cendara** (ESFP) — wyrms volcaniques exotiques

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Dresseur de créature]] (archétype joueur) · [[Bestiaire - Index]] · [[Métiers|Chasseur]] · [[Cordonnier]] · [[Foedus Animae]]*
