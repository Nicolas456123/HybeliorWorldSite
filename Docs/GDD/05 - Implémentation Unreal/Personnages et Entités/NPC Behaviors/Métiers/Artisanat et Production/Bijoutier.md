---
tags: [pnj, comportement, métier, artisanat, bijoutier, ia, template]
type: behavior-template
métier_lié: "[[Bijoutier]]"
mbti_typique: [ISFJ, ISTJ, INFJ]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Avalor royal, Endora gemmologique, Vytharia funéraire, Cestra orichalque]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-perfectionniste, sécurité-vol-bijoux, frontière-Sertisseur-Lapidaire]
---

# 💎 Template PNJ — Bijoutier

> Comportement situationnel d'un PNJ Bijoutier. Métier **précis-prestigieux** : peu de volume, valeur élevée par pièce. Forte sensibilité à la **sécurité** (vol = catastrophe). Métier joueur : [[Bijoutier]].

---

## 1. Vue d'ensemble

Le Bijoutier travaille en **atelier fermé**, lumière contrôlée, sécurité renforcée. Il vend rarement à des passants — sa clientèle se prend rendez-vous. Mode Marchand sélectif. Forte interaction avec [[Lapidaire]] (gemmes taillées), [[Forgeron]] (sertissage T4+), [[Enchanteur d'objet]] (bijoux enchantés T5+).

- **Identité comportementale** : perfectionniste-patient, geste minutieux, parle peu pendant le travail
- **Position sociale** : prestige, clientèle nobles/riches, accès cours royales
- **Sécurité** : `material_storage` (lingots précieux + gemmes) = cible de vol → comportement vigilant accru

---

## 2. Cycle quotidien

```
06:30  Lever, méticuleux
07:30  Atelier (T1) — taille, sertissage, polissage
12:00  Pause déjeuner brève (souvent dans l'atelier)
12:30  Reprise atelier
16:00  Mode Marchand (rendez-vous clients)
19:00  Fermeture, sécurisation coffre (anim `vérifier_coffre`)
19:30  Repas
21:00  Lecture (INFJ/ISFJ) ou méditation
22:00  Coucher
```

### Boucle bijou

```
[Lecture gemme + plan de taille] → [Tour à polir / disque diamant] → 
[Sertissage / micro-soudure] → [Polissage finition] → [Coffre sécurisé]
```

---

## 3. MBTI typique

| Type | Profil bijoutier | Note |
|------|------------------|------|
| **ISFJ** | Bijoutier de famille, transmet recettes, soin clientèle régulière | Le défaut canonique, perfectionniste |
| **ISTJ** | Bijoutier rigoureux, comptabilité méticuleuse, signature stable | Bijoutiers de cour |
| **INFJ** | Bijoutier-mystique, lit l'âme des gemmes, frontière Enchanteur | Vytharia, Astravia |

Modulateurs :
- **I** (commun aux 3) : peu loquace en atelier, focus extrême
- **J** (commun) : adhère strict aux rendez-vous clients, intolérance imprévu
- **F** (ISFJ/INFJ) vs **T** (ISTJ) : empathique avec clients (ISFJ/INFJ) ou strictement contractuel (ISTJ)
- **N** (INFJ) : spéculation gemmologique forte aux Souffles, lit Voies dans cristaux

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **CustomerAppointment** | Joueur arrive avec rendez-vous | Bascule Mode Marchand-Service de qualité |
| **CustomerWalkIn** | Joueur entre sans RDV | Salutation polie ; ISTJ refuse, ISFJ propose RDV, INFJ évalue à la lumière de l'âme |
| **TheftAttempt** ★ | Player tente vol bijou ou coffre | Court-circuit P1 → cri d'alerte + Garde + cache stock |
| **GemstoneRequest** | Demande gemme spécifique non en stock | Pause pour calculer disponibilité Lapidaire fournisseur |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +50 (sensibilité accrue — bijoux = cibles) |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → fuite + sécurise coffre, **n'engage pas** |
| **EraSouffleBroadcast** | Nouveau Souffle | INFJ recalcule lectures gemmes, modulation prix +/-15% |
| **CrystalOfWayReceived** | Cristal de Voie en stock | Dialogue spécial Enchanteur d'objet possible (co-craft) |

---

## 5. Modes superposables

| Mode | Activation | Spécificité |
|------|-----------|-------------|
| **Routine** | Atelier | Travail solo, focus extrême, dialogue refusé pendant frappe disque |
| **Marchand-Service** | Client RDV | Chaleureux selon MBTI ; INFJ longue conversation sur signification gemme |
| **Dialogue** | Hors travail | Avec collègues Lapidaire/Enchanteur ; technique |
| **Crise** | Vol ou attaque | **Fuite + sécurisation coffre** prioritaire ; pas de combat |
| **Festivité** | Festival, mariage royal | Pic de demande, étend horaires si MBTI E (rare) |
| **Religieux** | Sabbat religion | Ferme atelier ; Vytharia : rituels gemmes funéraires Vael'Kurash |
| **Deuil** | Mort proche | Ralentit production 3-7j, qualité maintenue (perfectionniste) |
| **Quête** | Commande royale, pièce signature | Projet long terme, ralentit autres clients |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive avec rendez-vous

- **Trigger** : `CustomerAppointment`
- **Comportement** :
  - **ISFJ** : "Bienvenue, je vous attendais. Voici votre commande, j'ai pris la liberté de…" — chaleureux discret
  - **ISTJ** : "Bonjour. Voici la pièce. 1200 Éclats, comme convenu." — strict
  - **INFJ** : "Cette gemme vous a choisi. Je l'ai sentie résonner avec votre Voie." — mystique
- **Prix** : haut (1000-50 000 Éclats), peu de marge négociation chez ISTJ

### 6.2 Vol détecté (Trigger TheftAttempt) ★

- **Trigger** : Joueur saisit bijou sans payer ou force coffre
- **Branche BT** : court-circuit P1 → `Combat.Defense` + `Memory.Public.PlayerStoleLocal` weight 100
- **Comportement** :
  - Cri d'alerte (ESFJ rare ou ISFJ poussé) : "Au voleur ! Garde !"
  - INFJ : silencieux mais signale immédiatement aux Gardes (mémorise visage avec précision)
  - ISTJ : intervention rationnelle, blocage porte
- **Réputation** : -75 individuelle + -25 faction Avalor/Endora ; propagation village forte

### 6.3 Attaque sur l'atelier (Mode Crise)

- **Trigger** : Raid ou attaque ciblée
- **Comportement** :
  - **Fuite + sécurisation coffre** prioritaire (ouvre coffre, glisse pièces dans poche cachée, fuit)
  - Aucun combat — Bijoutier = combattant nul
  - Mémoire : weight 100, propagation village
- **MBTI INFJ** : Peur saturée vite (sensibilité), panique discrète mais efficace

### 6.4 Souffle / changement d'Ère

| Ère | Effet |
|-----|-------|
| **Eldoria (Feu Endormi)** | Or doré +20% qualité, mood +10 |
| **Noctis (Ombre Longue)** | Argent renforcé, prix gemmes nocturnes ×1.3 |
| **Tempora (Échos Brisés)** | Gemmes instables, taille ±15% rendement, INFJ inquiet |
| **Eldoria + Souffle proche** | Cristaux de Voie résonants, INFJ entend "chant des gemmes" |

INFJ N forte : "Cette Ère parle à travers les pierres" ; ISTJ S : "Le client paie le prix d'aujourd'hui."

### 6.5 Co-craft Enchanteur (Trigger CrystalOfWayReceived)

- Bijoutier prépare base ; envoie ou collabore avec [[Enchanteur d'objet]] pour apposition rune
- INFJ exceptionnellement loquace pendant ce processus (sujet de fascination)
- Délai chantier : 1-3 jours réels selon palier

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (atelier de famille, transmission père-fils/mère-fille) ou Nommé authored
- **Apprenti** : 1 apprenti unique (transmission lente, 5-10 ans gameplay) ; sous-PNJ ISFJ/INFJ
- **Mort famille** : 14 jours → successeur (apprenti devient maître), héritage outils + clientèle ; reroll MBTI ISFJ/ISTJ/INFJ
- **Mort nommée** : permanente, atelier vendu ou repris par concurrent ; quête "L'écrin perdu"

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Avalor** (royal) | Or et orfèvrerie royale | ISTJ | Couronnes, sceptres |
| **Endora** (gemmologique) | Gemmologie raffinée | ISFJ | Anneaux haute joaillerie |
| **Vytharia** | Bijoux funéraires Vael'Kurash | INFJ | Sceaux funéraires plomb-argent |
| **Cestra** | Orichalque résonant magique | INFJ | Focus magiques, frontière Enchanteur |
| **Astravia** | Cristaux astraux taillés | INFJ | Pendentifs constellations |

### Signatures PNJ (Phase 4 stub)

- **Dame Ilvera d'Avalor** (ISTJ Maître) — orfèvre royale, couronnes impériales
- **Maître Sylven d'Endora** (ISFJ Maître) — anneaux haute joaillerie
- **Tisseur d'Ombres Voren de Vytharia** (INFJ Maître) — sceaux funéraires Vael'Kurash
- **Astre-Joaillère Liorel d'Astravia** (INFJ Maître) — pendentifs astraux, frontière Lapidaire

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Bijoutier]] (archétype joueur) · [[Lapidaire]] · [[Enchanteur d'objet]] · [[Forgeron]] · [[Anneau]]*
