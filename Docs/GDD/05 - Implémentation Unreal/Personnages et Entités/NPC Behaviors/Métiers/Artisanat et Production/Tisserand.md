---
tags: [pnj, comportement, métier, artisanat, tisserand, ia, template]
type: behavior-template
métier_lié: "[[Tisserand]]"
mbti_typique: [ISFJ, ISTJ]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Cestra côtier, Endora soie, Galenor laine, Alkaran laine épaisse, Onara lin sacré]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-rythme, frontière-Cordier-Fileur, soie-créature-spider]
---

# 🧵 Template PNJ — Tisserand

> Comportement situationnel d'un PNJ Tisserand. Métier **rythmique-endurant** — production tissu intermédiaire. **Infrastructure lourde** (métier à tisser immobile). Frontière nette avec [[Tailleur]] (qui coud le tissu). Métier joueur : [[Tisserand]].

---

## 1. Vue d'ensemble

Le Tisserand carde fibres, file le fil, tisse le tissu, le teint. Atelier rythmé par les claquements du métier à tisser. Production de masse pour alimenter [[Tailleur]] et [[Cordonnier]]. Cycle quotidien très régulier — sessions très longues, peu de variation.

- **Identité comportementale** : patient-rythmé, geste répétitif satisfaisant, parle peu en tissage
- **Lien chaîne** : amont [[Métiers|Botaniste]] (lin, coton), [[Métiers|Berger]] (laine), Bestiaire (soie), [[Métiers|Apothicaire]] (pigments) · aval [[Tailleur]] (principal), [[Cordonnier]] (lacets), [[Métiers|Cordier]] (cordes)

---

## 2. Cycle quotidien

```
06:30  Lever
07:30  Cardage / filage (T1) — préparer fibre
09:00  Tissage (T2) — métier à tisser, longue session
12:00  Pause déjeuner
13:00  Reprise tissage (T3)
17:00  Teinture (T4) — cuves de couleur, étendage
18:30  Mode Marchand (livraison Tailleurs/Cordonniers)
19:30  Repas + foyer
22:00  Coucher
```

### Boucle tissage

```
[Cardage fibre] → [Filage au rouet] → [Tissage métier (longue session)] →
[Teinture cuve] → [Étendoir séchage] → [Pliage rouleau] → [Livraison/stockage]
```

---

## 3. MBTI typique

| Type | Profil tisserand | Note |
|------|------------------|------|
| **ISFJ** | Tisserande de quartier, transmet recettes, motifs traditionnels | Le défaut canonique |
| **ISTJ** | Tisserand rigoureux, comptabilité, qualité standardisée | Galenor, manufacture |

Modulateurs :
- **I** + **S** + **J** (commun) : sédentaire extrême, méthodique, peu loquace, focus rythme métier
- **F** (ISFJ) vs **T** (ISTJ) : ISFJ relationnel avec clientèle régulière (Tailleurs/Cordonniers locaux) ; ISTJ contractuel-comptable

> Profil très homogène — peu de variations expressives.

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **FibreDelivery** | Botaniste/Berger livre fibre | Pause T2, inspecte, signe livraison |
| **TaillorPickup** | Tailleur vient chercher rouleau | Mode Marchand-Service bref |
| **DyeBatchReady** | Cuve teinture prête | Anim `tremper_tissu`, étendage |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30, Peur immédiate (F) |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → fuite (aiguilles inadéquates) |
| **TheftAttempt** | Vol rouleau tissu | Cri + Garde |
| **RaidOnVillage** | Catastrophe | Fuite, abrite rouleaux signature et patrons motifs |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul motifs/couleurs tendance |

---

## 5. Modes superposables

| Mode | Activation | Spécificité |
|------|-----------|-------------|
| **Routine** | Tissage continu | Cycle T1-T4 très régulier |
| **Marchand-Service** | Tailleur/Cordonnier collègue | Bref, technique ; livraison standardisée |
| **Dialogue** | Avec collègues chaîne | Technique fibre, motifs, rumeurs (ISFJ propage modérément) |
| **Crise** | Attaque | Fuite, sauve rouleaux précieux |
| **Festivité** | Festival | Tissus colorés cérémonie, +20% production prévue |
| **Religieux** | Sabbat religion | Onara : tissus rituels Foedus Animae ; sinon ferme |
| **Deuil** | Mort proche | Tissage ralenti, peut tisser drap funéraire |
| **Quête** | Commande tissu rare (soie créature, lin sacré) | Projet long, ingrédient spécifique |

---

## 6. Réactions situationnelles canoniques

### 6.1 Livraison Tailleur (Mode Marchand-Service)

- **Trigger** : `TaillorPickup`
- **Comportement** :
  - **ISFJ** : "Ah, Maître Sylven, votre commande. J'ai pensé à votre demande de bleu — j'ai testé la nouvelle teinture."
  - **ISTJ** : "Rouleau 12, lin 2x4 mètres, teinture indigo. 80 Éclats."
- **Lien social** : graphe §5 = `friends/colleagues` avec Tailleurs locaux

### 6.2 Tissage en cours (rythme constant)

- **Spécifique** : peu de réactivité aux passants, dialogue acceptable mais bref
- Le **claquement du métier** est constant — bruit ambiant signature de l'atelier

### 6.3 Attaque (Mode Crise)

- **Comportement** : fuite immédiate, sauve **rouleaux signature** + **patrons motifs** (savoir précieux)
- Aucun combat
- F : Peur saturée vite

### 6.4 Souffle / changement d'Ère

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | Fibres végétales abondantes, +20% production |
| **Eldoria** | Tissus dorés tendance noble |
| **Sommeil de Glace** | Laines épaisses Alkaran demandées, +30% prix |
| **Vents** (Aerion) | Voiles bateaux, pic demande Cestra |
| **Brume Mortelle** | Tissus funéraires, mood -10 |

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (atelier transmis)
- **Apprenti** : 1-2 (sous-PNJ ISFJ/ISTJ qui filent)
- **Mort famille** : 14 jours → successeur ; reroll MBTI ISFJ/ISTJ
- **Mort nommée** : permanente, side quest "Le métier silencieux"

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Cestra** (côtier) | Lin marin, voiles bateaux | ISFJ | Tissus voilier |
| **Endora** | Soies fines | ISFJ | Haute couture amont Tailleur |
| **Galenor** (impérial) | Laine impériale standard | ISTJ | Manufacture volume |
| **Alkaran** (Nord) | Laines épaisses nordiques | ISFJ | Vêtement hiver |
| **Onara** | Lin sacré rituel | ISFJ | Tissus religion Foedus Animae |
| **Cendara** (volcanique) | Fibres volcaniques exotiques | ISFJ | Tissu résistant chaleur |

### Signatures PNJ (Phase 4 stub)

- **Mère Olwen d'Endora** (ISFJ Maître) — soies fines pour cours
- **Vesna d'Alkaran** (ISFJ Maître) — laines nordiques
- **Sœur Avena d'Onara** (ISFJ Maître) — lin sacré rituel Foedus Animae
- **Maître Cendric de Galenor** (ISTJ Maître) — manufacture impériale

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Tisserand]] (archétype joueur) · [[Tailleur]] · [[Cordonnier]]*
