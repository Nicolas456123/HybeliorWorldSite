---
tags: [pnj, comportement, métier, artisanat, menuisier, ia, template]
type: behavior-template
métier_lié: "[[Menuisier]]"
mbti_typique: [ISTJ, ISTP, ESTP]
karma_typique: [neutre, gris-clair]
factions_compatibles: [Galenor, Trinoria forestier, Alkaran, Mosrack, Onara]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, frontière-Charpentier-Sculpteur, arcs-vs-armes]
---

# 🪵 Template PNJ — Menuisier

> Comportement situationnel d'un PNJ Menuisier. Métier **physique-précis** du bois — mobilier, manches d'outils, hampes d'armes, arcs. Pivot vers Architecture (livre la planche standardisée). Métier joueur : [[Menuisier]].

---

## 1. Vue d'ensemble

Le Menuisier scie, rabote, assemble le bois. Atelier rangé, copeaux au sol, odeur résineuse. Manie déjà scie/maillet → bascule combat possible mais limitée (outils contondants/tranchants T1). Travaille souvent en collaboration avec [[Forgeron]] (manches), [[Architecte]] (planches), [[Cordonnier]] §Sellier (cadres).

- **Identité comportementale** : pragmatique-méthodique, parle peu pendant le travail, satisfait du bois bien lu
- **Lien chaîne** : amont [[Métiers|Bûcheron]] (bois brut), [[Forgeron]] (clous, ferrures), [[Tanneur]] (lacets) · aval joueurs (mobilier, [[Arc]]), [[Architecte]] / [[Métiers|Charpentier]] (planches), [[Forgeron]] (manches)

---

## 2. Cycle quotidien

```
06:00  Lever
07:00  Atelier (T1) — sciage, rabotage, assemblage
12:00  Pause déjeuner
13:00  Reprise atelier (T2)
17:00  Mode Marchand (clients, commandes)
19:00  Fermeture
19:30  Repas + foyer (ISTJ/ISTP) ou taverne (ESTP)
22:00  Coucher
```

### Boucle menuiserie

```
[Sélection planche] → [Tracé + sciage] → [Rabotage] → 
[Assemblage tenon-mortaise] → [Finition lime/vernis] → [Présentation]
```

---

## 3. MBTI typique

| Type | Profil menuisier | Note |
|------|------------------|------|
| **ISTJ** | Menuisier de village, recettes traditionnelles, mobilier familial | Le défaut canonique |
| **ISTP** | Menuisier-virtuose, arcs et armes en bois, atelier solitaire | Trinoria, Alkaran |
| **ESTP** | Menuisier-vendeur, atelier en ville, commande noble | Galenor, Mosrack |

Modulateurs :
- **S** + **T** (commun) : focus pratique, peu de spéculation cosmique, prix rationnels
- **J** (ISTJ) vs **P** (ISTP/ESTP) : ISTJ planifie projets ; ISTP/ESTP improvise selon arrivages bois
- **I** (ISTJ/ISTP) vs **E** (ESTP) : ISTJ/ISTP silencieux atelier ; ESTP bavard avec clients

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **WoodDelivery** | Bûcheron livre grumes/planches | Pause T1, inspecte qualité, signe livraison |
| **CustomerApproach** | Joueur < 5m + heures ouverture | Bascule Mode Marchand, montre stock |
| **ArchitectOrder** | Architecte commande planches structurées | Mode Quête, projet long terme (jours) |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30 ; saisit maillet/scie (déjà en main partiellement) |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → `Combat.Defense` (maillet T1) |
| **TheftAttempt** | Vol planche/outil | Cri + intervention |
| **RaidOnVillage** | Catastrophe | Mode Crise — combat limité (outils inadéquats armes) ou fuite |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul styles mobilier tendance, prix +/-10% |

---

## 5. Modes superposables

| Mode | Activation | Spécificité |
|------|-----------|-------------|
| **Routine** | Atelier | Cycle T1-T2 |
| **Marchand** | Heures ouverture | ISTP/ISTJ laconique, ESTP bavard avec anecdotes |
| **Dialogue** | Avec Forgeron, Architecte | Technique bois, assemblage |
| **Crise** | Attaque, raid | Combat limité (maillet T1), souvent fuite |
| **Festivité** | Festival | Fabrique tréteaux, étend horaires |
| **Religieux** | Sabbat religion | Ferme atelier ; peu de liens religieux profonds (S, T) |
| **Deuil** | Mort proche | Atelier fermé 1-3j, qualité maintenue |
| **Quête** | Commande Architecte ou noble | Projet long terme |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive (Mode Marchand)

- **Trigger** : `CustomerApproach`
- **Comportement** :
  - **ISTJ** : "Quelle pièce cherchez-vous ?" — efficace
  - **ISTP** : pose le rabot, regarde, "Mobilier ? Arc ? Manche ?" — laconique
  - **ESTP** : "Eh, regardez cette table en chêne, jamais vu plus belle ! 50 Éclats !" — vocal
- **Prix** : standard, marges modérées (matériau abordable)

### 6.2 Commande Architecte (Trigger ArchitectOrder)

- **Comportement** : projet long (3-10 jours réels), planches structurées spécifiques
- Suspension partielle Mode Marchand pour clients standards
- Lien social fort avec [[Architecte]] local (graphe §5 = `friends/rivals` selon dynamique)

### 6.3 Attaque (Mode Crise)

- **Comportement** : combat limité — maillet T1 contondant peu efficace
- **MBTI ISTP** : peut tenir position en virtuose ; ISTJ analyse, fuit si désavantage ; ESTP charge agressif
- Souvent fuite vers `home_location`, abandonne outils

### 6.4 Souffle / changement d'Ère

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | Bois abondant, +20% qualité |
| **Vents** (Aerion) | Arcs et hampes demandés (caravanes), pic prix |
| **Eldoria** | Mobilier doré tendance noble |
| **Tempora** | Bois instable, ±15% rendement |

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération, transmission atelier
- **Apprenti** : 1-2 selon palier
- **Mort famille** : 7 jours → successeur ; reroll MBTI ISTJ/ISTP/ESTP
- **Mort nommée** : permanente, side quest "Le projet inachevé"

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Trinoria** (forestier) | Mobilier en bois clair, perchoirs | ISTP | Architecture forestière |
| **Galenor** | Mobilier impérial standardisé | ISTJ | Volume noble |
| **Alkaran** (Nord) | Mobilier robuste, fourrures incluses | ISTJ | Bois denses |
| **Mosrack** | Manches d'outils Forgeron | ESTP | Frontière Forgeron |
| **Onara** | Mobilier rituel, autels | ISTJ | Frontière Sculpteur sacré |

### Signatures PNJ (Phase 4 stub)

- **Maître Olav d'Alkaran** (ISTJ) — mobilier nordique robuste
- **Caelan de Trinoria** (ISTP) — arcs forestiers signature
- **Brorvic de Mosrack** (ESTP) — manches d'outils, fournisseur Forgerons

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Menuisier]] (archétype joueur) · [[Forgeron]] · [[Architecte]] · [[Charpentier]] · [[Sculpteur]] · [[Arc]]*
