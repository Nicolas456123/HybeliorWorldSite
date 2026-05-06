---
tags: [pnj, comportement, métier, artisanat, tailleur, ia, template]
type: behavior-template
métier_lié: "[[Tailleur]]"
mbti_typique: [ISFJ, ESFJ, ENFJ]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Avalor royal, Endora, Galenor uniformes, Onara cérémonie, Cestra, Vytharia funéraire]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-mode-festivité, frontière-Tisserand, robes-magiques-co-craft-Enchanteur]
---

# 👗 Template PNJ — Tailleur

> Comportement situationnel d'un PNJ Tailleur. Métier **précis-cosmétique** — vêtements civils, robes magiques, capes, tabards. Forte dimension sociale (les vêtements signent statut). Frontière nette avec [[Tisserand]] (qui produit le tissu). Métier joueur : [[Tailleur]].

---

## 1. Vue d'ensemble

Le Tailleur reçoit le tissu (livré par [[Tisserand]]) et le coupe/coud en vêtements. Atelier soigné, mannequins de mesure, patrons accrochés. Forte interaction client — chaque commande nécessite mesures, choix de tissu, négociation cosmétique. Mode Marchand-Service central.

- **Identité comportementale** : précis-chaleureux, geste minutieux, écoute attentive du client
- **Lien chaîne** : amont [[Tisserand]] (tissu), [[Forgeron]] (boucles), [[Bijoutier]] (boutons précieux), [[Tanneur]] (lacets) · aval joueurs (slot Vêtement, Cape, Tabard)

---

## 2. Cycle quotidien

```
07:00  Lever
08:00  Atelier (T1) — coupe, couture, broderie
12:00  Pause déjeuner
13:00  Reprise atelier
15:00  Mode Marchand-Service (RDV mesure + livraison)
19:00  Fermeture, rangement patrons
19:30  Repas + foyer (ISFJ) ou social (ESFJ/ENFJ)
22:00  Coucher
```

---

## 3. MBTI typique

| Type | Profil tailleur | Note |
|------|-----------------|------|
| **ISFJ** | Tailleur de quartier, fidélise clientèle, recettes traditionnelles | Le défaut canonique |
| **ESFJ** | Tailleur-conseil, anime atelier, propose tendances | Cités, modes |
| **ENFJ** | Tailleur-mentor, lit besoins émotionnels client, tenue symbolique | Endora, Onara cérémoniel |

Modulateurs :
- **F** + **J** (commun) : empathique, sens du devoir, planning rigoureux
- **I** (ISFJ) vs **E** (ESFJ/ENFJ) : ISFJ silencieux concentré ; ESFJ/ENFJ vocal-conseil
- **S** (ISFJ/ESFJ) vs **N** (ENFJ) : ISFJ/ESFJ focus pratique ; ENFJ symbolique-vision

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **CustomerWalkIn** | Client entre | Salutation chaleureuse, range outils |
| **MeasurementSession** | Commande nouvelle pièce | Mesure complète au mannequin (5-10 min) |
| **DeliveryReady** | Pièce signature terminée | Anim `présenter_œuvre` ; ENFJ discours symbolique |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30, Peur immédiate (F) |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → fuite |
| **TheftAttempt** | Vol tissu/pièce | Cri + alerte Garde (ne combat pas) |
| **RaidOnVillage** | Catastrophe | Mode Crise — fuite vers `home_location`, sauve patrons précieux |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul tendances mode, prix +/-10% |
| **WeddingCommission** | Commande mariage | Mode Quête + Festivité activé |

---

## 5. Modes superposables

| Mode | Activation | Spécificité tailleur |
|------|-----------|----------------------|
| **Routine** | Atelier | Cycle T1-T2 |
| **Marchand-Service** | RDV ou client direct | Conseil mode, mesures, choix tissu ; ESFJ/ENFJ très conseil |
| **Dialogue** | Avec Tisserand, Bijoutier | Technique étoffes, boutons |
| **Crise** | Attaque | Fuite, sauve patrons et pièces signature |
| **Festivité** | Festival, mariage, intronisation | **Pic activité** — tenues cérémonielles, prix x1.5-x2 |
| **Religieux** | Sabbat religion | Robes cérémonielles selon religion ; Onara : robes Foedus Animae |
| **Deuil** | Mort proche | Atelier fermé 1-3j, peut coudre tenue funéraire (ENFJ symbolique) |
| **Quête** | Tenue noble, robe magique co-craft Enchanteur | Projet long, RDV multiples |

---

## 6. Réactions situationnelles canoniques

### 6.1 Mesure pour commande (Trigger MeasurementSession)

- **Comportement** :
  - **ISFJ** : "Levez les bras, parfait. Je me souviens, vous étiez 38 l'an dernier. Toujours autant de marche ?"
  - **ESFJ** : "Tournez, oh ! Cette couleur va vous sublimer ! Nous sommes en pleine mode dorée à Avalor !"
  - **ENFJ** : "Vous portez quelque chose. Une joie, ou une peine ? Je sentais qu'il fallait vous proposer un bleu profond."
- **Délai** : 3-7 jours selon palier ; 7-14 jours pour pièce signature

### 6.2 Mode Festivité (mariage, intronisation)

- **Trigger** : `WeddingCommission`, `FestivalLocalStarts`
- **Comportement** : pic activité, tenues cérémonielles, prix x1.5-x2
- **MBTI ENFJ** : projet symbolique fort, refuse parfois clients moins méritants pour se concentrer
- **MBTI ESFJ** : adore l'effervescence, propose mille variations
- **MBTI ISFJ** : surchargé mais loyal à clients réguliers

### 6.3 Co-craft robe magique (avec Enchanteur d'objet)

- **Trigger** : commande robe enchantée
- **Comportement** : projet 7-21 jours, livraison Tailleur → Enchanteur pour apposition
- **MBTI ENFJ** : exceptionnellement loquace pendant collaboration, symbolique partagée

### 6.4 Attaque (Mode Crise)

- **Comportement** : fuite immédiate, abrite **patrons signature** (objets précieux) et tissus rares
- Aucun combat (ciseaux T1 dérisoire)
- **MBTI F** : Peur saturée vite

### 6.5 Souffle / changement d'Ère

| Ère | Effet |
|-----|-------|
| **Eldoria (Feu Endormi)** | Robes dorées tendance, demande nobles +30% |
| **Verdoiement** (Terranu) | Tissus organiques, motifs floraux, +20% qualité |
| **Vents** (Aerion) | Robes voyage légères, capes longues, pic |
| **Brume Mortelle** | Robes funéraires, prêtres en peur ; ENFJ symbolique fort |
| **Sommeil de Glace** | Vêtements épais, fourrures, +30% prix Alkaran |

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération + Nommé authored (Maîtres-Tailleurs cours royales)
- **Apprenti** : 1-3 (sous-PNJ ISFJ/ESFJ)
- **Mort famille** : 14 jours → successeur, atelier transmis ; reroll MBTI ISFJ/ESFJ/ENFJ
- **Mort nommée** : permanente, side quest "La robe inachevée"

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Avalor** (royal) | Robes royales en or | ESFJ | Cour, mariages royaux |
| **Endora** (raffiné) | Vêtements raffinés, coutures fines | ENFJ | Haute couture |
| **Galenor** (impérial) | Uniformes, tabards, livrées | ISFJ | Volume noble + militaire |
| **Onara** | Robes cérémonielles Foedus Animae | ENFJ | Symboles religieux |
| **Cestra** | Vêtements marins en lin | ISFJ | Côtier-pratique |
| **Vytharia** | Robes funéraires Vael'Kurash | ENFJ | Tenues deuil, sceaux brodés |
| **Alkaran** | Vêtements épais bordés fourrure | ISFJ | Hiver durable |

### Signatures PNJ (Phase 4 stub)

- **Dame Sylven d'Avalor** (ESFJ Maître) — robes royales, cour
- **Maître Calame d'Endora** (ENFJ Maître) — haute couture symbolique
- **Mère Olwen d'Onara** (ENFJ Maître) — robes Foedus Animae cérémonielles
- **Tisseuse Iolwena de Vytharia** (ENFJ Maître) — robes funéraires Vael'Kurash

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Tailleur]] (archétype joueur) · [[Tisserand]] · [[Forgeron]] · [[Bijoutier]] · [[Enchanteur d'objet]]*
