---
tags: [pnj, comportement, métier, artisanat, enchanteur, ia, template, magique]
type: behavior-template
métier_lié: "[[Enchanteur d'objet]]"
mbti_typique: [INTP, INFJ, INTJ]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Vytharia funéraire, Endora, Astravia Ordo Caelum, Cestra orichalque, Lumasar académique]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-méditatif, prérequis-Lié-impact-comportement, durée-rituels-enchantement]
---

# 🔮 Template PNJ — Enchanteur d'objet

> Comportement situationnel d'un PNJ Enchanteur. Métier **magique-érudit**. Cycle marqué par phases de **méditation/canalisation** longues, scriptorium silencieux. Forte distinction avec [[Sculpteur]] (artiste matière) — l'Enchanteur travaille la **matière magique**, voies du [[Le Lien]]. Métier joueur : [[Enchanteur d'objet]].

---

## 1. Vue d'ensemble

L'Enchanteur d'objet est **Lié** ([[Le Lien]] §Liés). Il travaille en **scriptorium** ou **cercle d'enchantement** — atelier silencieux, isolé, avec pupitre, runes, cristaux. Sessions longues de canalisation. Vend un **service** (apposition d'enchantement) plus qu'un produit. Cycle quotidien atypique : médite plutôt qu'il ne "produit en boucle".

- **Identité comportementale** : méditatif-érudit, voix posée, longs silences, parole choisie
- **Lien chaîne** : amont [[Forgeron]] / [[Bijoutier]] / [[Tailleur]] (objets bases) + Cristal de Voie + Essence spirituelle · aval joueurs équipement haut tier, [[Métiers|Mage]] (parchemins-sorts)
- **Distinction Sculpteur** : Enchanteur = matière magique (Voies, runes, cristaux, scriptorium silencieux) ; [[Sculpteur]] = matière brute (pierre, bois, atelier physique bruyant)

---

## 2. Cycle quotidien

```
07:00  Lever, méditation matinale (T1) — 30-60 min, alignement Voie
08:00  Étude grimoires (T2) — recherches, préparation runes
10:00  Session canalisation (T3) — apposition d'un enchantement (1-3h selon palier)
13:00  Pause repas léger
14:00  Réception clients sur RDV (Mode Marchand-Service)
17:00  Seconde session canalisation (T4) si commande active
19:00  Repas + lecture
21:00  Méditation du soir (alignement Voie)
22:00  Coucher
```

> Pas de "boucle de production" classique : chaque enchantement est un projet unique de 1-12h selon palier.

---

## 3. MBTI typique

| Type | Profil enchanteur | Note |
|------|-------------------|------|
| **INTP** | Théoricien des Voies, fascination glyphes, divague techniquement | Le défaut canonique |
| **INFJ** | Enchanteur-mystique, lit l'âme des objets, frontière Bijoutier | Vytharia, Onara |
| **INTJ** | Enchanteur-stratège, plans long terme, projets signature | Astravia Ordo Caelum |

Modulateurs :
- **I** + **N** (commun) : forte spéculation cosmique aux Souffles, lit signes Voies
- **T** (INTP/INTJ) vs **F** (INFJ) : INTP/INTJ technique pure ; INFJ symbolique-empathique
- **J** (INTJ/INFJ) vs **P** (INTP) : INTJ/INFJ ritualise canalisation ; INTP improvise selon résonance Voie
- **I** (commun) : extrême focus en canalisation, **dialogue refusé pendant rituel** (court-circuit)

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **MeditationStart** | Heure T1 ou T-meditation soir | Bascule mode immobile, animation `méditer`, dialogue bloqué |
| **CanalisationStart** ★ | Démarre apposition enchantement | **Mode Crise mineur** = NE PAS interrompre (voix forte → échec rituel) |
| **CustomerAppointment** | Client RDV | Bascule Mode Marchand-Service |
| **RitualInterruption** ★ | Voix forte ou contact pendant canalisation | Court-circuit P0 — annule rituel, perte cristal/essence ; Colère +50 |
| **CrystalReceived** | Cristal de Voie livré | Étude minutieuse, dialogue spécial s'il vient d'une zone rare |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30 ; INFJ Peur saturée vite (sensible) |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → fuite (peu d'arme physique ; INTJ peut canaliser sort si Voie offensive) |
| **EraSouffleBroadcast** | Nouveau Souffle | **Forte spéculation cosmique** (N), recalcul Voies actives, dialogue prophétique |

---

## 5. Modes superposables

| Mode | Activation | Spécificité |
|------|-----------|-------------|
| **Routine** | Méditation + canalisation | Cycle T1-T4 silencieux |
| **Marchand-Service** | Client RDV | Vend service apposition ; INTP technique, INFJ symbolique |
| **Dialogue** | Avec Bijoutier/Forgeron co-craft | Concentré, technique ; refuse interruption pendant méditation |
| **Crise** | Attaque OU rituel interrompu | Fuite (combat) ou rage canalisée (rituel cassé) |
| **Festivité** | Festival cosmique (rare) | INFJ peut bénir objets fête ; INTJ profite pour étude |
| **Religieux** | Sabbat religion | Peut rejoindre rituels Voie spécifique (Foedus Animae : pacte ; Ordo Caelum : alignement astral) |
| **Deuil** | Mort proche | Méditation prolongée, peut graver sceau funéraire (Vytharia spécialité) |
| **Quête** | Apposition signature commandée | Projet 3-7 jours, ingrédients rares à trouver |

---

## 6. Réactions situationnelles canoniques

### 6.1 Client RDV (Mode Marchand-Service)

- **Trigger** : `CustomerAppointment`
- **Comportement** :
  - **INTP** : "L'objet… mmm. Sa structure résonne en F majeur, j'imagine que vous voulez une protection ? Saviez-vous que la rune Iyeth est compatible avec…" — divague techniquement
  - **INFJ** : "Cette épée a déjà tué. Elle se souvient. Voulez-vous l'apaiser ou la nourrir davantage ?" — mystique
  - **INTJ** : "Affixe demandé : Rapidité +12. Coût : 3 cristaux mineurs + 800 Éclats. Délai : 4 jours. Acceptez-vous ?" — stratégique direct
- **Prix** : 200-50 000 Éclats selon palier ; les enchantements temporaires sont **sources de revenu récurrent** ([[Économie]] §Cat. 3)

### 6.2 Canalisation en cours (Trigger CanalisationStart) ★

- **Branche BT** : verrouillage social — refuse interruption
- **Comportement** :
  - Animation `tracer_runes`, voix murmurée, focus extrême
  - **Voix forte ou contact** = `RitualInterruption` → cri d'arrêt, perte ressources
- **Durée** : 1-3h gameplay selon palier T2-T5
- **MBTI** : tous immobiles, mais INFJ/INTJ légère transe ; INTP gestuelle plus expressive

### 6.3 Souffle / changement d'Ère ★

- **Trigger** : `EraSouffleBroadcast`
- **Comportement spécial Enchanteur** :
  - **INTP** : analyse rationnelle des Voies réalignées, prépare rune adaptée
  - **INFJ** : entre en transe légère, "lit" la nouvelle vibration, dialogue prophétique avec clients
  - **INTJ** : recalcule plans long terme, peut anticiper recettes spéciales Ère
- **Effet** : enchantements temporaires **rechargent** ou **dévient** selon Ère ; valeur économique fluctue

### 6.4 Attaque (Mode Crise)

- **Branche BT** : **fuite prioritaire** chez INTP/INFJ ; INTJ peut canaliser sort offensif (selon Voie)
- **Comportement** :
  - INTP : fuit avec grimoires (objets précieux)
  - INFJ : Peur saturée vite, abrite cristaux dans coffre
  - INTJ : si Voie Igni/Tempest, peut tenir sort en main pour dissuader (rare, niveau Maître)
- **Aucun ne combat à l'arme physique**

### 6.5 Co-craft avec Bijoutier (objet enchanté T5+)

- **Trigger** : Bijoutier livre base avec gemme
- **Comportement** : projet 3-7 jours, sessions multiples
- INFJ exceptionnellement loquace pendant ce processus (sujet de fascination)

### 6.6 Cristal de Voie reçu (Trigger CrystalReceived)

- **Comportement** : étude minutieuse à la loupe, dialogue spécial avec porteur
- INFJ peut "écouter" le cristal et raconter d'où il vient (lore de Trace, Ère)
- INTP analyse propriétés, propose recettes innovantes

---

## 7. Lifecycle PNJ

- **Catégorie** : Nommé authored préférentiellement (5-10 par capitale, ~150 monde) — métier rare et prestigieux
- **Apprenti** : 0-1 (transmission lente, prérequis Lié)
- **Mort nommée** : permanente, side quest "Les runes inachevées" + perte savoir spécifique de la signature
- **Héritage** : objets enchantés signature peuvent survivre Parties (cf. [[Le Souffle]] §Héritage)

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Vytharia** | Sceaux funéraires Vael'Kurash | INFJ | Bijoux funéraires, scellés tombeaux |
| **Endora** | Calligraphie raffinée | INTP | Parchemins-sorts haut tier |
| **Astravia** | Glyphes Ordo Caelum / astrologie | INTJ | Enchantements astraux |
| **Cestra** | Orichalque résonant | INFJ | Focus magiques, frontière Bijoutier |
| **Lumasar** | Académie érudite | INTP | Recherche fondamentale Voies |
| **Eldoria** (rumeur) | Mithril enchanté | INTJ | Recettes oubliées, mythiques |

### Signatures PNJ (Phase 4 stub)

- **Tisseur d'Ombres Voren de Vytharia** (INFJ Maître) — sceaux funéraires Vael'Kurash
- **Maître Iaron de Lumasar** (INTP Maître) — académicien des Voies
- **Astre-Lié Sereneth d'Astravia** (INTJ Maître) — enchantements astraux Ordo Caelum
- **Calame d'Endora** (INTP Maître) — parchemins-sorts haut tier

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Enchanteur d'objet]] (archétype joueur) · [[Le Lien]] · [[Bijoutier]] · [[Sculpteur]] (distinction)*
