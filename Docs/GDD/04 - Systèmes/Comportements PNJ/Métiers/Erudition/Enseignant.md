---
tags: [pnj, comportement, métier, enseignant, erudition]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Erudition/Enseignant]]
mbti_typique: [ENFJ, ESFJ, INFJ]
karma_typique: vert
factions_compatibles: [Académies d'Astravia, Conservatoires, Maisons de Maîtres, Foedus Animae (mentor spirituel)]
needs_review_for: [calibration-playtest, gold-sink-formation-pnj]
---

# 🏫 Template PNJ — Enseignant

> Comportement PNJ pour un **Enseignant** (Verbe+Mémoire, Érudition). **Mode Dialogue prédominant**, **Verbe dominant** parmi les Erudition. Public d'enfants/apprentis (graphe social = mentors-apprentis cf §5). Métier social atypique pour la catégorie Erudition (très extraverti).
>
> Source métier : [[03 - Mécaniques/Métiers/Erudition/Enseignant]].

---

## 1. Vue d'ensemble

L'Enseignant PNJ est l'**exception sociale** de la catégorie Erudition : son métier exige **interaction constante**, **autorité bienveillante**, **transmission directe**. Sa journée est rythmée par des **leçons** (groupes ou particuliers), des **corrections**, des **conseils aux parents**.

**Particularités** :
- **Verbe dominant** parmi métiers Erudition (vs Mémoire pour les autres)
- **Mode Dialogue prédominant** : 60-70% du temps actif est de l'interaction
- **Graphe social riche** : mentors-apprentis hiérarchiques fréquents (cf §5 Concepts)
- **E majoritaire** : ENFJ, ESFJ — extraversion utile pour pédagogie
- **Gold sink majeur** (cf source métier) : facture des leçons aux joueurs pour accélérer Maîtrises

> [!important] Frontière comportementale
> - **Enseignant** = transmission directe, élèves nommés, paiement par leçon
> - **[[Barde]]** = transmission par chant, public anonyme
> - **[[Historien]]** = transmission par publication, sans interaction
> - **[[Bibliothécaire]]** = donne accès, ne transmet pas

---

## 2. Cycle quotidien typique

```
06:30 — Lever
07:00–08:00 — Préparation des leçons du jour, correction des cahiers
08:00–12:00 — Cours collectifs (école, académie, préau)
12:00–13:00 — Repas avec apprentis ou famille
13:00–16:00 — Cours particuliers (clients aisés, joueurs payants)
16:00–17:00 — Pause, café/thé avec collègues (E)
17:00–19:00 — Corrections, préparation lendemain
19:00–21:00 — Repas, vie sociale
21:00–22:30 — Lecture, mise à jour matière enseignée
23:00 — Coucher
```

**Modulation MBTI** :
- **ENFJ** (45%) : leader naturel, mentor charismatique, jour rempli
- **ESFJ** (30%) : hôte chaleureux, élèves comme famille
- **INFJ** (25%) : mentor philosophique, sessions plus intimes

**Sabbatique académique** : peut prendre 1-2 mois off pour étudier (recharge MBTI).

---

## 3. MBTI typique et variantes

### 3.1 ENFJ — Protagoniste (45%)
- Mentor charismatique, transforme la vie des élèves
- Donneur de quêtes émotionnelles ("Aide ce jeune talent")
- Mode Festivité : anime la fête de fin d'année avec les élèves

### 3.2 ESFJ — Consul (30%)
- Hôte chaleureux, leçons comme rituels familiaux
- Compatible [[Lore/Religions/Rota Mundi|Rota Mundi]] (cycles d'apprentissage)
- F : empathique, console les élèves découragés

### 3.3 INFJ — Avocat (25%)
- Mentor spirituel, sessions intimes
- Compatible [[Lore/Religions/Foedus Animae|Foedus Animae]]
- Profondeur > nombre d'élèves

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **StudentArrives** | Apprenti `subordinate` < 10m | Mode Dialogue activé immédiatement |
| **PlayerSeeksLessons** | Joueur demande formation | Mode Marchand-Pédagogique activé (vente leçons) |
| **StudentInDistress** | Apprenti F émotion saturée | Suspend leçon, écoute, conseille |
| **StudentBlunder** | Erreur grossière en cours | F = pédagogue patient ; T = sermon (rare T pour ce métier) |
| **GraduationCeremony** | Apprenti atteint palier | Cérémonie locale, Mood +30, Renom +5 |
| **ParentVisits** | Parent d'élève entre | Mode Dialogue diplomatique, conseille |
| **EraSouffleBroadcast** | Nouveau Souffle | Adapte matière enseignée (cf §5.5 modulation paramétrique) |

---

## 5. Modes superposables

| Mode | Comportement Enseignant | LOD requis |
|------|--------------------------|------------|
| **Routine** | Cycle leçons / corrections | Tous |
| **Marchand** | Vente de **leçons** (gold sink majeur). Tarification par palier visé | L0 |
| **Dialogue** | **Mode dominant** (60-70% du temps). Pédagogique, encourageant | L0 |
| **Crise** | Protège **élèves** en priorité (graphe social), évacue groupe ; Karma vert | L0 |
| **Festivité** | **Très actif** (E+F) : anime, organise pour élèves | Tous |
| **Religieux** | Mentor spirituel possible (INFJ + Foedus) | Tous |
| **Deuil** | Si élève proche mort = catastrophique, deuil ×1.5 | Tous |
| **Quête** | Donneur fréquent : "Trouve un livre rare pour mon cours", "Aide cet élève prometteur" | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur cherche formation (rep > 25)
- **Branche BT** : Mode Marchand-Pédagogique
- **Utility** : `Social.Trade` +40 (transaction formation), prix selon Maîtrise visée
- **MBTI** : ENFJ enthousiaste, ESFJ accueillant, INFJ évalue motivation
- **Effet** : leçon = animation 15-60 min, gain Maîtrise pour joueur, paiement Éclats
- **Couplage** : Maîtrise_Pédagogie ≥ Initié + Maîtrise enseignée ≥ palier visé

### 6.2 Mode Crise — attaque sur école
- **Branche BT** : 
  1. `BTTask_GatherStudents` (rassemble élèves)
  2. `BTTask_LeadEvacuation` (chemin sûr)
  3. Reste en arrière pour défendre passage si nécessaire
- **MBTI** : ENFJ courage paternel/maternel ; ESFJ protège comme mère ; INFJ leadership calme
- **Réputation** : si joueur défend → +30 individuelle + témoignage public

### 6.3 Élève en détresse (apprenti pleure, échec, etc.)
- **Branche BT** : Suspend tout, écoute
- **MBTI F** : empathique, conseil personnel
- **Effet** : graphe social `apprentice` renforcé, Mood +5

### 6.4 Festival local
- Mode Festivité **très actif** (E dominant)
- ENFJ : organise spectacle des élèves
- ESFJ : prépare le buffet collectif
- INFJ : observe, participe brièvement

### 6.5 Joueur Karma rouge dans école
- Réaction protective des élèves : interpose, gronde fermement
- Alerte Gardes immédiatement (E = cri d'alarme)
- Refuse formation absolument

### 6.6 Mort d'un élève (rare, marquant)
- Mood baseline -30 pendant 14 jours (cf §5.7 Actions Situationnelles, ×1.5 pour F)
- Routine ralentie ×0.5
- Cérémonie commémorative organisée (élément graphe + religion)

---

## 7. Lifecycle (§18)

- **Persistant** quasi-systématique (relations long-terme avec élèves)
- Maître Enseignant = nommé authored (académies majeures)
- **Mort permanente** si nommé : side quest "L'académie sans son maître" + impact Héritage
- **Successeur narratif 7j** : élève brillant devient maître si Maîtrise_Pédagogie ≥ Initié

---

## 8. Variantes et signatures PNJ

### 8.1 Le maître d'école de village
- ENFJ ou ESFJ, connaît tous les enfants par leur prénom
- Karma vert+, paiement souple selon famille
- Donneur de quêtes communautaires

### 8.2 Le maître d'académie d'Astravia
- INFJ ou ENFJ, prestige élevé
- Élèves rivaux pour son attention
- Mode Quête : donneur prestigieux (recherche, exploration)

### 8.3 Le précepteur de cour
- ENFJ, élève unique (héritier royal/noble)
- Affiliation Couronne, accès politique
- Donneur de quêtes politiques

### 8.4 Le sage retiré (mentor recherché)
- INFJ + I tirage retraité
- Refuse la plupart des élèves, choisit quelques disciples
- **Disciples** au palier Maître = Héritage permanent (cf [[L'Accord]])

---

*Liens : [[03 - Mécaniques/Métiers/Erudition/Enseignant]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Bibliothécaire]] · [[Historien]] · [[Barde]] · [[Lore/Religions/Foedus Animae]]*
