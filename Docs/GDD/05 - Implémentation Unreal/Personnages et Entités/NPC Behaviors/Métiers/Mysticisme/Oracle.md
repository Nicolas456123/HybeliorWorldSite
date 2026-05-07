---
tags: [pnj, comportement, métier, oracle, mysticisme, prédiction, ia, template]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: "[[03 - Mécaniques/Métiers/Mysticisme/Oracle]]"
mbti_typique: [INFJ, INTP, INFP]
karma_typique: jaune
voie_magique_principale: Fatum (canonique) | Tempora (rare)
religion_compatible: [Foedus Animae, Rota Mundi, Somnium Vigil, Ordo Caelum]
factions_compatibles: [Foedus Animae, Conseil des Augures (Astravia), Rota Mundi, Bourse des Augures]
template_alternatif_souffle: true
ritual_pattern_religion: [RP_FOEDUS_ANIMAE, RP_ROTA_MUNDI, RP_SOMNIUM_VIGIL]
needs_review_for: [calibration-playtest, équilibrage-fiabilité-prédiction, biais-religieux]
---

# 🎴 Template PNJ — Oracle

> Comportement situationnel d'un PNJ Oracle. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Discipline canonique de [[Prédiction]] §Oracle, donneur de quête narrative forte**. Métier joueur correspondant : [[03 - Mécaniques/Métiers/Mysticisme/Oracle|Oracle]].
>
> **Particularité Mysticisme** : **karma jaune typique** (méfiance sociale forte — "ceux qui manipulent le destin"). **PNJ-clé** = template alternatif au Souffle (§14 D-PNJ-RÉACTION-ÈRE). Fonction narrative = donneur de quête principal lors des Souffles, prophétie active.

---

## 1. Vue d'ensemble

L'Oracle est le pratiquant de la **Voie de Fatum** (Cosmique des destins) ou — plus rarement — de la **Voie de Tempora** (Éternel du temps). Spécialiste de la **lecture des fils du destin**, l'une des **5 disciplines de Prédiction** d'Hybelior (cf. [[Prédiction]] §Oracle). Apporte la **distribution probabiliste sur les natures possibles** de la prochaine ère.

- **Identité comportementale** : intuitif-mystique (N+I dominants), MBTI majoritaires Intuitifs+Introvertis, dialogue énigmatique, attitude sibylline
- **Position sociale** : **ambivalente** — vénéré dans Foedus Animae/Rota Mundi, **banni** ou clandestin dans Lex Petra (destins fixes contredits) et Ignis Aeternum (présage = sorcellerie tabou)
- **Slot Mode Marchand** : **fort** mais services rituels (cabinet d'oracle) plutôt que stock fixe
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Mysticisme/Apothicaire|Apothicaire]] / [[Alchimiste]] (encens d'augure), [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste]] (Herbes de Somnix si Vigili) · aval clients en quête de prédiction, [[Astronome]] (collab croisement), [[03 - Mécaniques/Métiers/Mysticisme/Prêtre|Prêtre Foedus Animae/Rota Mundi]]

---

## 2. Cycle quotidien

```
07:00  Lever, méditation rituelle (Conscience perception fils Fatum)
07:30  Entretien Lien Voie de Fatum (45 min — léger comparable Guérisseur)
08:30  Petit-déjeuner solitaire (souvent silencieux)
09:00  **Cabinet d'oracle ouvert** — réception clients (tirages simples)
12:00  Repas léger
13:00  Tirages complexes sur rendez-vous (cartes, scrying ; 30min-2h chacun)
17:00  Étude personnelle des cartes, croisement avec autres disciplines
18:00  Office religieux selon religion compatible (cf §8)
19:00  Repas
20:00  **Augure rituel** (1×/sem max) ou méditation lectures du jour
22:00  Coucher
```

### Boucle de tirage canonique

```
[T1 Client présente sa question — précision essentielle]
   ↓
[T2 Choix de l'outil (osselets / cartes 24 lames / miroir sombre / augure rituel)]
   ↓
[T3 Encens d'augure allumé — Conscience perception fils]
   ↓
[T4 Lancement / tirage rituel (5min-2h selon outil)]
   ↓
[T5 Lecture probabiliste — formulation énigmatique des résultats]
   ↓
[T6 Inscription dans carnet d'oracle (mémoire personnelle)]
```

> Voir `cabinet_oracle`, `pierres_fatum`, `sanctuaire_fatum`, `salle_miroirs_sombres` pour ancres spatiales.

---

## 3. MBTI typique

| Type | Profil Oracle | Note |
|------|---------------|------|
| **INFJ** | Oracle contemplatif-prophétique, Voie de Fatum, idéal Foedus Animae | Profil dominant — empathie + intuition |
| **INTP** | Oracle théoricien des probabilités, croisement disciplines, Voie de Tempora rare | Profil rare-érudit |
| **INFP** | Oracle poète-rêveur, lecture symbolique forte, Voie de Somnix (Vigili) | Profil rural-mystique |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **N** (commun aux 3) : interprétation symbolique forte, dialogues énigmatiques (jamais affirmation directe)
- **I** (commun) : présence calme, voix grave, dialogues longs et profonds
- **F (INFJ/INFP)** : empathie envers client, ressent le destin émotionnellement
- **T (INTP)** : analyse rationnelle des probabilités, fiabilité statistique
- **J (INFJ)** : adhère strict au RitualPattern, cabinet ouvert horaires fixes
- **P (INTP/INFP)** : sessions imprévisibles, augure spontané selon inspiration

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **OracleConsultRequest** | Client < 5m + cabinet ouvert | Bascule rituel de tirage (cf §6.1) |
| **EraSouffleImminent** | Signes cosmiques convergent (lecture animale, astronome) | **Augure rituel d'urgence** — prédiction publique |
| **EraSouffleBroadcast** | Nouveau Souffle | **Templates alternatifs** (PNJ-clé) — voir §6.6 |
| **AccusationOfManipulation** | Joueur/PNJ accuse Oracle de manipuler destins | Mood -30, refus de service, possible bannissement |
| **DangerousReadingResult** | Tirage révèle risque mortel pour client | Avertissement explicite, refuse paiement si client paniqué |
| **PersecutionRisk** | Lex Petra/Ignitari hostile < 50m | Mode dissimulation (Cabinet caché) |
| **BourseAuguresEvent** | Mise sur prochaine ère [[Prédiction]] §Bourse | Participe à la mise rituelle |
| **OracleNetworkConsult** | Autre Oracle/Astronome demande croisement | Dialogue technique, partage lectures |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Cabinet / étude / méditation | Cycle de tirage + clients |
| **Marchand** | Client sollicite tirage payant | Service rituel cher (10-200 Éclats selon outil) ; T = strict, F = ajustable |
| **Dialogue** | Client en consultation | Long, énigmatique, questions retournées ("Que cherchez-vous vraiment ?") |
| **Crise** | ThreatLevel ≥ 50 OU persécution | Fuite/dissimulation (pacifique) ; sauf si Foedus Animae légitime → invocation Fatum |
| **Festivité** | Festival local + jour augural Rota Mundi | Tirage public théâtral, présence centrale |
| **Religieux** | RitualPattern Foedus/Rota/Somnium Vigil | Office selon religion compatible |
| **Deuil** | Mort proche détectée | Refus tirage 7j (deuil interfère avec lecture pure) |
| **Quête** | Donneur (mission prophétique, retrouver objet annoncé en augure) | **Donneur narratif fort** — voir §6.5 |

Cascade : **Crise > Religieux > Deuil > Marchand > Routine**.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur sollicite tirage

- **Trigger** : `OracleConsultRequest`
- **Branche BT** : `ModeSocial.OracleReading`
- **Comportement** :
  - INFJ : "Asseyez-vous. Respirez. Posez votre question — pas vos mots, votre question vraie."
  - INTP : "Probabilistique ou analogique ? Précisez l'horizon temporel."
  - INFP : "Les fils résonnent étrangement aujourd'hui... voyons ce qu'ils chantent."
- **Outil selon paiement** :
  - Osselets (rapide, peu fiable) : 5 Éclats, 5 min
  - Cartes Fatum (moyen) : 30 Éclats, 30-60 min
  - Scrying miroir sombre (cher, drain Mana) : 100 Éclats, 1h, 1×/jour
  - Augure rituel amplifié : 200 Éclats + sacrifice symbolique, 1×/semaine
- **Résultat** : formulation énigmatique (jamais affirmation directe), distribution probabiliste

### 6.2 Donneur de quête narrative (rôle narratif fort)

- **Trigger** : Joueur entre dans cabinet + Reconnaissance > 0
- **Branche BT** : `ModeSocial.OracleQuestGiver`
- **Comportement** :
  - INFJ : quête émotionnelle ("Je vois un fil qui se romprait — un proche en danger... allez-y")
  - INTP : quête analytique ("Trois échos convergent sur Mosrack. Allez vérifier.")
  - INFP : quête lyrique ("Une lumière oubliée appelle dans les ruines de l'est")
- **Quêtes typiques** :
  - "Empêcher l'événement annoncé" (timer + risque échec)
  - "Confirmer un présage par enquête"
  - "Récupérer une carte de Fatum perdue"
- **Modulation Ère** : quêtes augmentées en intensité aux Souffles (cf §6.6)

### 6.3 Augure d'urgence avant Souffle

- **Trigger** : `EraSouffleImminent`
- **Branche BT** : `Routine.EmergencyAugur`
- **Comportement** :
  - Sortie publique (place du village ou parvis temple Foedus Animae)
  - Tirage public avec sacrifice symbolique
  - Annonce formelle aux fidèles/curieux
- **Mémoire village** : `Memory.Public.OraclePublicAugur` weight 80
- **Réputation** : si prédiction se confirme → +30 individuel, +20 faction ; si erreur → -20

### 6.4 Persécution (Lex Petra, Ignitari)

- **Trigger** : `PersecutionRisk`
- **Branche BT** : Mode Crise — fuite/dissimulation
- **Comportement** :
  - Cache cartes Fatum (dans manteau)
  - Bascule en routine "ermite ordinaire"
  - Refuse tout tirage en zone hostile
- **Mood** : `Peur +30`, `Colere +10`
- **Mémoire individuelle** : `PersecutedByLexPetra` weight 70

### 6.5 Bourse des Augures (mise rituelle)

- **Trigger** : `BourseAuguresEvent` (cf [[Prédiction]] §Bourse)
- **Branche BT** : `Routine.AugurMarketBet`
- **Comportement** : se rend à la Bourse (Astravia ou capitale Rota Mundi), parie sur prochaine ère
- **Stake** : Éclats + Reconnaissance ; gain narratif si juste, perte si faux
- **MBTI** : INTP plus rationnel sur paris, INFJ moins (refus de spéculer émotionnellement)

### 6.6 Souffle / changement d'Ère — Template alternatif (PNJ-clé)

> **Critère PNJ-clé** : Oracle Adepte+ nommé authored. ~30-50 par monde (cf §17 D-PNJ-AUTHORING).

- **Trigger** : `EraSouffleBroadcast` + match dans `era_alternative_templates`
- **Branche BT** : substitution du `routine_replacement` + `authored_dialogues` activés
- **Cas concrets** :
  - **Oracle à l'Ère de Tempora (Échos Brisés)** : `Routine_Oracle_TemporaActive` — visions amplifiées, Voie Tempora éveillée, dialogues prophétiques denses
  - **Oracle à l'Ère de Fatum** : `Routine_Oracle_FatumApogee` — augures publics quotidiens, prédictions amplifiées, donneur de quêtes principal
  - **Oracle à l'Ère du Voile (Brume Mortelle)** : `Routine_Oracle_VeilDefensive` — refus de tirages prolongés (fils brouillés), avertissements urgents
  - **Oracle à l'Ère du Rêve Lumineux (Eldoria)** : `Routine_Oracle_DreamReadings` — tirages oniriques (Vigili), collab Somnium Vigil
- **Pour Oracle standard (rare ; 95% sont nommés authored)** : modulation paramétrique uniquement

### 6.7 Tirage révèle danger mortel pour client

- **Trigger** : `DangerousReadingResult`
- **Branche BT** : `ModeSocial.OracleWarning`
- **Comportement** : avertissement direct (rare contraste avec énigmatique habituel), refuse parfois paiement (F empathique)
- **Side quest possible** : quête générée pour **éviter** la mort prédite (timer narratif)

---

## 7. Lifecycle PNJ

- **Catégorie** : **Nommé authored** majoritairement (1-3 par capitale Foedus Animae/Rota Mundi/Somnium Vigil) ; rare en famille de génération
- **Mort transient/famille** (rare) : 7 jours → successeur (apprenti hérite des cartes Fatum)
- **Mort nommé authored** : permanente, side quest "Le tirage interrompu" générée — cartes Fatum reliques
- **Apprenti** (graphe §5) : 0-1 apprenti (rare, transmission ésotérique)
- **Héritage** : Oracle-Maître nommé peut signer un **Recueil de Tirages Héritage** (24 lames signées)

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par Voie + religion

| Voie | Religion | MBTI dominant | Karma | Spécificité |
|------|----------|---------------|-------|-------------|
| **Voie de Fatum** | Foedus Animae (canonique) | INFJ | jaune | Lecture des fils, malédictions mineures, augures, **alignement parfait avec Animari** |
| **Voie de Fatum** | Rota Mundi | INTJ, INFJ | jaune | Vénère Fatum comme Cosmique des destins, praticien légitime |
| **Voie de Tempora (rare)** | Rota Mundi | INTP | jaune | Lecture par échos passés, vision rétroactive |
| **Voie de Somnix** | Somnium Vigil (Vigili) | INFP, INFJ | jaune | Oracle onirique, lecture pendant sommeil rituel |
| **Oracle d'Ordo Caelum (rare)** | Ordo Caelum | INTP | gris | Erreur théologique fréquente — vrai Oracle distinct des Stellari (cf [[03 - Mécaniques/Métiers/Mysticisme/Oracle]] §3) |

### RitualPattern compatibles

- **Foedus Animae** : offrande autel 19:00 + repas avec morts (parfait alignement avec Fatum)
- **Rota Mundi** : marquage Calendrier matinal + sabbat hebdo (Oracle officie augures publics)
- **Somnium Vigil** : siestes longues + Herbes de Somnix (Vigili-Oracle = oracle onirique)

### Méfiance sociale (cohérent [[03 - Mécaniques/Métiers/Mysticisme/Oracle]] §3)

- **Bannis** dans : Cendara (Ignitari), Pyrtara, parties de Galenor (Lex Petra)
- **Suspectés** dans : Caeloria (Ordo Caelum considère leurs vrais Stellari supérieurs), Mosrack (lapidaire pur)
- **Vénérés** dans : Torkam, Skaldoria (Foedus Animae), Sylthara, Ventera (Rota Mundi), Astravia (Conseil des Augures académique)

### Signatures PNJ (Phase 4 stub) — **PNJ-clés**

- **Dame Velna des Trois Fils** (INFJ Maître, Torkam) — Animari Oracle Foedus Animae, candidate template alternatif
- **Maître Tarkin l'Errant** (INTP Maître, Astravia) — Conseil des Augures académique, Voie de Tempora rare
- **Sœur Lyrena des Rêves** (INFP Adepte, Lumasar) — Vigili-Oracle Somnium Vigil
- **Augure Korven le Sibyllin** (INFJ Maître, Sylthara) — Roteri-Oracle Rota Mundi, donneur principal de quêtes Souffle
- **Mère Zelda des Cendres** (INFJ Légende, Skaldoria) — PNJ-clé majeur, Oracle de tradition orale tribale

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Mysticisme/Oracle|Oracle (archétype joueur)]] · [[Prédiction]] · [[Le Lien]] · [[Cosmologie]] · [[Le Souffle]] · [[Les Ères]] · [[Lore/Religions/Foedus Animae|Foedus Animae]] · [[Lore/Religions/Rota Mundi|Rota Mundi]]*
