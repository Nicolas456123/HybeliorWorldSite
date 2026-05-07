---
tags: [pnj, comportement, métier, exploration, chasseur, trésors, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Exploration/Chasseur de trésors|Chasseur de trésors]]"
mbti_typique: [ENTP, ESTP, INTJ]
karma_typique: vert
factions_compatibles: [Tempora cultes, Lex Petra archives, Lumasar académique, Mosrack libre, Catena Fracta marchand]
catégorie_métier: Exploration
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, branche-Traces-des-Eres, mode-Crise-piège-archéologique]
---

# 💰 Template PNJ — Chasseur de trésors

> Comportement situationnel d'un PNJ Chasseur de trésors. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Cible : ruines, donjons, reliques**. Mode Crise = piège archéologique. Branche [[Traces des Ères]].

---

## 1. Vue d'ensemble

Le Chasseur de trésors est le **fouilleur de profondeurs** — pas l'or de surface, mais reliques enfouies, coffres cachés, chambres scellées. Profil : **curieux, audacieux, opportuniste, érudit pratique**. Très **mobile** (sous-mode Itinérant fréquent — 5-30 jours en ruines), souvent en équipe d'expédition. Bascule **Mode Crise = piège archéologique** (désamorçage d'urgence, fuite si chambre s'effondre).

- **Identité comportementale** : aventurier érudit, opportuniste, méfiant des malédictions, bavard sur ses trouvailles
- **Position sociale** : ambivalent — héros pour certains (rapporte lore), pillard pour d'autres ([[Lore/Religions/Lex Petra]] désapprouve la profanation)
- **Slot Mode Marchand** : irrégulier — vente de reliques au [[Bibliothécaire]], [[Historien]], collectionneurs
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] (cartes ruines), [[Bibliothécaire]] (légendes) · aval [[Marchand]], [[Bijoutier]], musées, joueurs aventuriers

---

## 2. Cycle quotidien

### Cycle ville (entre expéditions, ~30% du temps)

```
08:00  Lever, étude des cartes/notes (mémoire individuelle)
09:00  Visite [[Bibliothécaire]] / [[Historien]] (recherche prochaine cible)
12:00  Déjeuner taverne (ESTP/ENTP brillent)
13:00  Préparation matériel (crochets, lampes, pinceaux)
15:00  Mode Marchand 2-3×/sem (vente reliques, négociation)
17:00  Échange avec [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] sur prochaine zone
19:00  Repas + lecture de tablettes/parchemins (INTJ étude)
22:00  Coucher (tard pour ENTP/ESTP)
```

### Cycle expédition (sous-mode Itinérant, 5-30j)

Voyage vers ruine identifiée — campement à proximité, fouille par cycles de 10-12h, retour ville quand cargo plein ou danger trop fort.

> Voir `expedition_camp`, `dig_site`, `unlock_chamber`, `treasure_storage`, `tri_dépôt` pour ancres.

---

## 3. MBTI typique

| Type | Profil chasseur trésors | Note |
|------|-------------------------|------|
| **ENTP** | Aventurier charmeur, théoricien des civilisations, raconteur | Le défaut canonique (Mosrack, Lumasar) |
| **ESTP** | Audacieux pragmatique, prend risques, opportuniste | Frontière hors-la-loi, [[Pyrtara]] |
| **INTJ** | Érudit stratège, planifie chaque expédition à long terme | Académique, [[Lumasar]] |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **N+T (ENTP/INTJ)** : forte spéculation cosmique, fascinés par les Ères et reliques temporelles
- **S+T (ESTP)** : focus pratique, valeur monétaire avant lore
- **P (ENTP/ESTP)** : improvise, opportuniste sur le terrain
- **J (INTJ)** : planification rigoureuse, refuse improvisation
- **E vs I** : ENTP/ESTP bavards (raconte exploits) ; INTJ silencieux et calculateur

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **MapAcquired** | Nouvelle carte de ruine reçue | Étude (mémoire), bascule planning expédition |
| **ExpeditionStart** | Date départ atteinte | Bascule sous-mode `Itinérant` (§5) |
| **ChamberDiscovered** | Nouvelle chambre détectée (Acuité check) | `Routine.Inspect`, recherche pièges |
| **TrapDetected** | Piège visible | `Routine.Disarm` (Maîtrise_Désarmement_Pièges) |
| **TrapTriggered** | **Mode Crise piège** : piège déclenché | Court-circuit P0 → `Combat.Dodge` ou `Combat.Flee` selon nature |
| **ChamberCollapse** | Effondrement détecté | P0 → `Combat.Flee` immédiat, sauve relique en main |
| **ChestUnlocked** | Coffre ouvert | Anim `examine_treasure`, mood +30 si valeur élevée |
| **MalédictionTriggered** | Relique maudite manipulée | Mood -40, retraite vers Apothicaire/Prêtre |
| **RivalChasseur** | Autre Chasseur de trésors présent | Tension — combat ou partage selon MBTI |
| **EraSouffleBroadcast** | Nouveau Souffle | Reliques `Tempora` plus actives, nouvelles ruines révélées |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Ville (étude) ou ruine (fouille) | Recherche, désarmement, fouille |
| **Itinérant** | Expédition active | Voyage, campement, fouille longue |
| **Marchand** | Retour avec butin | Négocie, ESTP marchande agressif, INTJ prix justes argumentés |
| **Dialogue** | Échange avec érudit ou client | Long (ENTP/INTJ raconte/expose), bref (ESTP) |
| **Crise** | **Piège archéologique** OU effondrement OU rival hostile | `Combat.Dodge`/`Combat.Flee`/`Combat.Engage` selon menace |
| **Festivité** | Festival ou retour de grande expédition | Présente trouvailles publiquement (ENTP/ESTP — INTJ discret) |
| **Religieux** | Souvent **distant** des religions ; parfois [[Lore/Religions/Lex Petra]] tendu (profane) ou [[Lore/Religions/Catena Fracta]] (rejet sacré) | Évite sites sacrés actifs |
| **Quête** | Donneur de quête fréquent (lore exclusif) | Continue routine + dialogue narratif riche |

Cascade priorité : Crise (piège/effondrement) > Itinérant > Marchand > Routine.

### 5.bis Sous-mode Itinérant (expédition longue)

- Pas de domicile fixe pendant 5-30 jours
- Cycle adapté : réveil aube, fouille 10-12h, sommeil campement (souvent à proximité de la ruine)
- **MBTI J (INTJ)** : planifie itinéraire détaillé, étapes, ressources budgétées la veille
- **MBTI P (ENTP/ESTP)** : improvise, change cible si occasion, parfois en groupe d'aventuriers

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive (Mode Marchand)

- **Comportement** : ENTP "Vous cherchez quelque chose d'unique ? J'ai un calice du Premier Empire !" — INTJ "Ce que vous voyez, son contexte historique en justifie le prix." — ESTP "Bon prix, marché conclu ?"
- **Prix** : modulés `rigidité_prix +30` (T) mais ENTP/ESTP négocient avec plaisir
- **Reconnaissance +75** : propose donneurs de quêtes lore (carte exclusive)

### 6.2 Mode Crise piège archéologique

- **Trigger** : `TrapTriggered` ou `ChamberCollapse`
- **Branche BT** : `Combat.Dodge` (Vivacité) ou `Combat.Flee`
- **Comportement** :
  - **ENTP** : roule, esquive avec panache, sauve relique en main
  - **ESTP** : réflexe pur, peut blesser quelqu'un d'autre pour se sauver
  - **INTJ** : prévoit le piège souvent avant déclenchement (Acuité +Mémoire) — sinon recul calme
- **Mood** : `Peur +30`, `Colere +20` (rage post-déclenchement chez T)
- **Mémoire** : weight 80 (apprend de l'incident — Mémoire bestiaire-ruines)

### 6.3 Souffle / changement d'Ère

- **Tempora (Échos Brisés)** : reliques temporelles s'activent — opportunité majeure ; INTJ fasciné, ENTP enthousiaste
- **Eldoria** : ruines d'âges anciens plus accessibles (feu visible)
- **Noctis** : ruines obscurcies, gardiens spectraux apparaissent
- **Souffle = donneur de quête** : nouvelles cartes générées par EraGenerator → side-quest "Explorer la ruine émergée"

### 6.4 Découverte d'artefact maudit

- **Trigger** : `MalédictionTriggered`
- **Mood** : -40, panique brève
- **Comportement** : recule, isole l'objet (sac scellé), retour urgent à [[Lore/Religions/Lex Petra]] prêtre ou [[Apothicaire]] purificateur
- **Mémoire** : weight 100, change comportement avec items similaires futurs

### 6.5 Donneur de quête (Mode Quête)

- **Très fréquent** : Chasseur de trésors expert connaît des sites que joueur peut fouiller
- **Rumeur** "J'ai vu une cité enfouie sous Azoria, mais c'est trop pour moi seul" → side-quest générée
- ENTP raconte avec emphase, INTJ donne instructions précises, ESTP propose partenariat

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération ou Nommé authored (1-2 par capitale érudite)
- **Mort transient/famille** : 7 jours → coffre/relique en sa possession passe au successeur ou abandonné
- **Mort nommé authored** : permanente, side quest "La cache du chasseur" (joueur récupère son atelier secret)
- **Apprenti** : rare (métier solitaire) — 0-1
- **Héritage** : un Maître peut être lié à une **relique signature** trouvée par lui (musée Lumasar)

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Mosrack** (libre) | Aventurier indépendant, contrats privés | ENTP | Tous types ruines |
| **Lumasar** (académique) | Érudit, mandats musée | INTJ | Reliques pré-Effondrement |
| **Pyrtara** (frontières) | Hors-la-loi, pillard à la limite légale | ESTP | Tombes royales, profanation |
| **Endora** (sables) | Spécialiste cités enfouies | INTJ | Cités des Sables, hiéroglyphes |
| **Azoria** (frontière mystique) | Plongeur des cités englouies | ENTP | Cités des Anciens, glace |

### Signatures PNJ (Phase 4 stub)

- **Roderick le Charmeur** (ENTP Maître, Mosrack) — découvreur du Calice de Vermilis
- **Maître Sylvain** (INTJ Maître, Lumasar) — auteur du Catalogue des Reliques
- **Vexa la Lame-Sable** (ESTP Maître, Endora) — pillarde-aventurière du désert
- **Lyra l'Englacée** (ENTP Maître, Azoria) — première à atteindre la cité Vorzac

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de trésors|Chasseur de trésors (gameplay)]] · [[Traces des Ères]] · [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] · [[Bibliothécaire]] · [[Historien]] · [[03 - Mécaniques/Métiers/Exploration/Explorateur|Explorateur]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de créature|Chasseur de créature]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de primes|Chasseur de primes]]*
