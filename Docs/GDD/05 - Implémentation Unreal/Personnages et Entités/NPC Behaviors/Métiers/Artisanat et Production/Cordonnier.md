---
tags: [pnj, comportement, métier, artisanat, cordonnier, ia, template]
type: behavior-template
métier_lié: "[[Cordonnier]]"
mbti_typique: [ISFJ, ISTJ]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Galenor impérial, Avalor royal, Alkaran fourrure, Onara sandales]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, frontière-Maroquinier-Sellier]
---

# 👢 Template PNJ — Cordonnier

> Comportement situationnel d'un PNJ Cordonnier. Métier **précis-léger** — bottes, chaussures, sandales, ceintures cuir. Forte identité cosmétique (les bottes signent un statut). Métier joueur : [[Cordonnier]].

---

## 1. Vue d'ensemble

Le Cordonnier reçoit du cuir tanné (livré par [[Tanneur]]) et le coupe/coud en bottes/chaussures. Atelier petit, calme, focus précision. Mode Marchand soutenu : clientèle régulière (réparation) + commandes signature.

- **Identité comportementale** : minutieux-discret, geste répété, conversation tranquille
- **Lien chaîne** : amont [[Tanneur]] (cuir), [[Forgeron]] (boucles), [[Bijoutier]] (boucles précieuses) · aval joueurs (slot Pieds)

---

## 2. Cycle quotidien

```
07:00  Lever
08:00  Atelier (T1) — coupe, couture, montage
12:00  Pause déjeuner
13:00  Reprise atelier
16:00  Mode Marchand (clients réparation/commande)
19:00  Fermeture
19:30  Repas + foyer
22:00  Coucher
```

---

## 3. MBTI typique

| Type | Profil cordonnier | Note |
|------|-------------------|------|
| **ISFJ** | Cordonnier de quartier, fidélise clientèle, soin minutieux | Le défaut canonique |
| **ISTJ** | Cordonnier strict, recettes traditionnelles, tarifs fixes | Galenor impérial |

Modulateurs :
- **I** + **S** + **J** : le profil est très homogène (sédentaire, méthodique, peu loquace)
- **F** (ISFJ) vs **T** (ISTJ) : ISFJ se souvient des pointures de chaque client, ISTJ tient un livre comptable strict

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **CustomerWalkIn** | Joueur entre | Salutation polie, range outils |
| **RepairRequest** | Joueur apporte bottes usées | Bascule mini-mode `réparation` (15-30 min gameplay) |
| **CustomMeasurement** | Commande nouvelle paire | Anim `prendre_mesure` au mannequin de mesure |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30, Peur immédiate |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → fuite (pas de combat — alêne inadéquate) |
| **RaidOnVillage** | Catastrophe imminente | Mode Crise — fuite vers `home_location` |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul styles tendance, prix +/-10% |

---

## 5. Modes superposables

| Mode | Activation | Spécificité |
|------|-----------|-------------|
| **Routine** | Atelier | Cycle calme, dialogue acceptable mais bref |
| **Marchand** | Heures ouverture | Clientèle régulière, ISFJ se souvient des pointures |
| **Dialogue** | Avec Tanneur, Forgeron | Technique cuir, bref |
| **Crise** | Attaque | Fuite prioritaire, sécurise ouvrages en cours |
| **Festivité** | Festival | Étend horaires, propose chaussures décorées |
| **Religieux** | Sabbat religion | Ferme pendant créneau ; Onara : sandales sacrées Foedus Animae |
| **Deuil** | Mort proche | Boutique fermée 1-3j, qualité maintenue |
| **Quête** | Bottes signature commandées | Projet long, commande noble |

---

## 6. Réactions situationnelles canoniques

### 6.1 Client de réparation

- **Trigger** : `RepairRequest`
- **Comportement** :
  - **ISFJ** : "Ah, vos bottes habituelles ! Le talon ? Je le vois venir." — chaleureux, mémoire pointures
  - **ISTJ** : "Réparation talon : 8 Éclats. Délai : 2 jours."
- **Prix réparation** : 5-50 Éclats selon usure + tier botte

### 6.2 Commande signature (Mesure complète)

- **Trigger** : `CustomMeasurement`
- **Comportement** : prend mesure pied au mannequin, dialogue 5-10 min, choix matériaux (fourrure pour Alkaran, cuir doré Avalor)
- **Délai** : 3-7 jours réels selon palier

### 6.3 Attaque (Mode Crise)

- **Comportement** : fuite immédiate, abandonne outils, sauve ouvrages en cours signature (objets précieux)
- Aucun combat (alêne inadéquate)
- Mémoire individuelle weight 80

### 6.4 Souffle / changement d'Ère

- **Eldoria (Feu Endormi)** : bottes dorées tendance, ISFJ heureux des nouvelles modes
- **Sommeil de Glace** : bottes fourrées Alkaran demandées, +20% prix
- **Vents** (Aerion) : bottes de voyage légères, pic de demande

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération, transmission atelier
- **Apprenti** : 0-1 (volume bas)
- **Mort famille** : 14 jours → successeur, atelier transmis ; reroll MBTI ISFJ/ISTJ
- **Mort nommée** : permanente, side quest "La paire inachevée"

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | Spécialité |
|--------|-------|------------|
| **Avalor** (royal) | Bottes royales en cuir doré | ISTJ |
| **Galenor** | Bottes militaires fonctionnelles | ISTJ |
| **Alkaran** (Nord) | Bottes fourrées épaisses | ISFJ |
| **Onara** | Sandales sacrées Foedus Animae | ISFJ |
| **Cendara** | Bottes volcaniques résistantes chaleur | ISTJ |

### Signatures PNJ (Phase 4 stub)

- **Maître Telven d'Avalor** (ISTJ) — bottes royales en cuir doré
- **Mira la Fourreuse d'Alkaran** (ISFJ) — bottes fourrées du Nord
- **Frère Ilkan d'Onara** (ISFJ) — sandales sacrées Foedus Animae

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Cordonnier]] (archétype joueur) · [[Tanneur]] · [[Forgeron]] · [[Bottes]]*
