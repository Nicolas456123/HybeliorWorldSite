---
tags: [pnj, comportement, métier, astronome, erudition, pnj-clé-souffle]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Erudition/Astronome]]
mbti_typique: [INTJ, INTP, ISTJ]
karma_typique: vert
factions_compatibles: [Conseil des Augures d'Astravia, Ordo Caelum, Cabinets de Prédiction, Bourse des Augures]
candidat_template_alternatif_souffle: true
needs_review_for: [calibration-playtest, fenêtres-prédiction-pnj-clé]
---

# 🌌 Template PNJ — Astronome

> Comportement PNJ pour un **Astronome** (Acuité+Mémoire, Érudition). **Cycle inversé nuit/jour**. Discipline canonique de [[Prédiction]] §1 (TIMING des Souffles). **Pivot pour annonce du Souffle** — peut être un PNJ-clé avec template alternatif au Souffle (cohérent §14 D-PNJ-ERES).
>
> Source métier : [[03 - Mécaniques/Métiers/Erudition/Astronome]].

---

## 1. Vue d'ensemble

L'Astronome PNJ vit **à contre-temps** : il dort le jour, observe la nuit. Cycle quotidien fortement inversé, ce qui le rend **invisible** aux joueurs diurnes — sauf si l'on monte à l'observatoire la nuit. Son métier est **patient**, **silencieux** et **profondément lié au lore cosmique** d'Hybelior.

**Particularités majeures** :
- **Cycle inversé** : lever 14h, coucher 06h. Modulé par couverture nuageuse (s'il pleut → décalage)
- **PNJ-clé fréquent** : ~50 astronomes nommés monde, beaucoup sont **candidats au template alternatif au Souffle** (cf §5.5.2 Actions Situationnelles)
- **Stat Acuité dominante** mais Mémoire forte (recoupement archives)
- **Patrimoniaux** : un Astronome reconnu peut devenir personnage historique nommé

> [!important] Pivot Souffle
> Un Astronome Maître+ (palier Expert+ avec ★★★★☆ fiabilité) est l'**annonceur officiel** du prochain Souffle. À l'Ère des Présages, il est **suractivé**. Voir §14 templates alternatifs : un Astronome de cour peut devenir Prophète et passer en routine `Routine_Prophet_Public`.

---

## 2. Cycle quotidien typique (INVERSÉ)

```
06:00 — Coucher (sauf veille en cours)
06:00–14:00 — Sommeil
14:00 — Lever — étude des observations de la nuit
14:00–16:00 — Petit déjeuner-déjeuner, courrier confrères
16:00–19:00 — Calculs, mise à jour almanach, dessin cartes du ciel
19:00–21:00 — Repas, préparation des instruments (lunettes, astrolabe)
21:00–04:00 — Observation (cœur du métier, ne pas déranger)
04:00–06:00 — Consignation des observations sur parchemin
```

**Modulation MBTI** :
- **INTJ** : observation rigide tronc 21:00-04:00 ; tolère mal les visiteurs
- **INTP** : flexible, peut prolonger jusqu'à 06:00 si découverte ; veille longue
- **ISTJ** : adhérence stricte, journal méticuleux

**Couverture nuageuse** : si tag `Weather.Cloudy` actif > 6h → Astronome **frustré** (Mood -10), passe en mode `Routine.Voyage` (cherche ciel dégagé) si MBTI P, ou `Routine.ArchivesStudy` si MBTI J.

**Cycle jour/nuit§2 perception** : profil "Humain veilleur" partiel — vision nuit améliorée par instruments.

---

## 3. MBTI typique et variantes

### 3.1 INTJ — Architecte (45%)
- Stratège silencieux, planifie les observations sur des mois
- **Donneur de quête fréquent** : "trouve-moi un fragment d'almanach de l'Ère des Trois Royaumes"
- Mode Festivité : absent (dort)
- Candidat #1 PNJ-clé Astronome de cour

### 3.2 INTP — Logicien (35%)
- Curieux théoricien, parle peu mais profond
- Compatible avec [[Lore/Religions/Ordo Caelum|Ordo Caelum]]
- Découvertes spontanées → side quests (cf §15 Quest Generator)

### 3.3 ISTJ — Logisticien (20%)
- Méthodique fiable, almanachs irréprochables
- Astronome de guilde, prédictions stratégiques

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **CelestialEventDetected** | Comète, éclipse, alignement planétaire | Suspend tout, observation prioritaire 4h+, Mood +30 |
| **PredictionWindowClosing** | Souffle attendu < 7j (palier Expert+) | Mode `Routine.PreSouffle_Watch` activé : observation continue, peu de sommeil |
| **CloudCoverProlonged** | Weather.Cloudy > 6h | Mood -10, frustration ; J = archives, P = voyage |
| **AssistantInterrupts** | Apprenti ou visiteur entre 21:00-04:00 | Colère +20 (interruption observation), MBTI INTJ +1.3 |
| **EraSouffleBroadcast** | Nouveau Souffle confirmé | **PNJ-clé** : annonce publique, foule attendue ; **non-clé** : recalibrage 1 semaine |
| **PredictionValidated** | Souffle prédit avec exactitude | Mood +50, gain Reconnaissance auprès Conseil des Augures |

---

## 5. Modes superposables

| Mode | Comportement Astronome | LOD requis |
|------|--------------------------|------------|
| **Routine** | Cycle inversé strict | Tous |
| **Marchand** | Rare — vente almanachs/prédictions à des marchands ou clients privés. Comptoir = pupitre de scribe | L0/L1 |
| **Dialogue** | Lent, poétique. Voix basse. Aborde souvent le sujet du ciel | L0 |
| **Crise** | **Faible défense** : fuit en emportant son **astrolabe** (objet sacré). Mood -50 si abandonné | L0/L1 |
| **Festivité** | Absent (dort sauf festival nocturne) | Tous |
| **Religieux** | [[Lore/Religions/Ordo Caelum]] : observation = rituel ; [[Lore/Religions/Rota Mundi]] : cycles célébrés | Tous |
| **Deuil** | Sessions silencieuses ; consigne le ciel comme **mémoire** du défunt | Tous |
| **Quête** | Donneur fréquent (recherche composants, archives) ; **objectif clé** pour quêtes Souffle | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur monte à l'observatoire de nuit
- **Branche BT** : si rep > 0 → `Dialogue.AstronomyShare` (long, lyrique)
- **Utility** : `Social.Talk` +20 si rep > 25, `Routine.Continue` -10 (dérangé mais accepte)
- **MBTI** : INTJ bref puis intéressé ; INTP enthousiaste si question pertinente
- **Effet** : peut **vendre prédiction privée** (cf §6 Carrière Astronome.md)

### 6.2 Souffle imminent (palier Expert+ détecte)
- **Branche BT** : `Routine.PreSouffle_PublicAnnounce`
- **Effet** : Astronome se rend en place publique, lit prédiction publique → propagation rumeur Memory.Public.SouffleAnnounced w100
- **MBTI** : INTJ posé et solennel ; INTP émerveillé ; ISTJ factuel
- **PNJ-clé** : déclenche Mode Quête pour joueurs (préparation du Souffle)

### 6.3 Couverture nuageuse prolongée
- **Branche BT** : `Routine.Voyage` (P) OU `Routine.ArchivesStudy` (J)
- **MBTI P** : voyage vers observatoire d'altitude, peut quitter zone (LOD L2)
- **MBTI J** : ronge son frein, augmente travail archives, irritable

### 6.4 Mode Crise — raid sur observatoire
- **Branche BT** : sécurise instruments (astrolabe, lunette) PUIS fuit
- **MBTI** : INTJ tente de cacher carnets ; INTP fuit immédiatement ; ISTJ tente résistance brève
- **Mémoire** : événement weight 80, propagation Conseil des Augures

### 6.5 Phénomène cosmique (Brume Mortelle)
- **Branche BT** : observation **passionnée** (override Peur partielle)
- **MBTI** : INTP+N : exalté, +30 Mood (scientifique avant terrifié)
- **Memory** : `Memory.Public.CosmicPhenomenonObserved` w100, source Héritage

### 6.6 Joueur Karma rouge à l'observatoire
- Astronome civil → fuit ou se cache derrière instruments
- I dominant → signale silencieusement à un compagnon ou apprenti
- Pas de combat (faible Vigueur)

---

## 7. Lifecycle (§18) — PNJ-clé fréquent

- **Persistant authored** (Maître+) : ~50 astronomes nommés monde
- **Mort permanente** si nommé : déclenche side quest "Le télescope sans œil" (apprenti reprend, Carnet d'observation à retrouver)
- **Successeur narratif 7 jours** : apprenti devient maître si formé (cf [[Enseignant]])
- **Conseil des Augures** : remplacement formel par cooptation à la prochaine ère

---

## 8. Variantes et signatures PNJ

### 8.1 Le vieux veilleur (INTJ)
- Yeux fatigués, dos voûté, mémoire encyclopédique
- Parle des étoiles comme d'amies
- Karma vert, donneur de quêtes émotionnelles ("J'ai vu un présage il y a 50 ans...")

### 8.2 L'astronome de cour (INTJ/ISTJ)
- Habits sombres brodés d'étoiles, voix posée
- Affiliation Couronne, prédictions politiques
- **Candidat principal template alternatif au Souffle** : à l'annonce d'un Souffle, devient figure publique majeure
- Mode Quête : donneur stratégique, deadlines fines

### 8.3 L'astronome itinérant (INTP+P)
- Caravane équipée, va d'observatoire en observatoire
- Vend prédictions en route, partenaire fréquent [[Cartographe]] / [[Marchand]]
- Karma vert, accueille les voyageurs

### 8.4 Le Prophète (palier Maître authored)
- **Titre rare** (cf [[Prédiction]] §Conditions cachées)
- Entrée au Conseil des Augures, presque mythique
- **Template alternatif activé** systématiquement : routine remplacée par `Routine_Prophet_Public` à chaque Souffle annoncé
- Héritage actif : Almanach perpétuel signé

---

*Liens : [[03 - Mécaniques/Métiers/Erudition/Astronome]] · [[03 - Mécaniques/Prédiction]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Routine Quotidienne]] · [[02 - Monde/Cosmologie]] · [[Le Souffle]] · [[Les Ères]] · [[Lore/Religions/Ordo Caelum]] · [[Lore/Religions/Rota Mundi]] · [[Bibliothécaire]] · [[Historien]] · [[Cartographe]]*
