---
tags: [pnj, comportement, métier, barde, divertissements, pnj-clé-souffle]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Divertissements/Barde]]
mbti_typique: [ENFP, ENFJ, INFP]
karma_typique: vert
factions_compatibles: [Cours royales, Tavernes, Académies, Troupes foraines, Conseil des Augures (chroniqueurs)]
candidat_template_alternatif_souffle: true
needs_review_for: [calibration-playtest, calibrage-influence-Reconnaissance-épopées]
---

# 📜 Template PNJ — Barde

> Comportement PNJ pour un **Barde** (Verbe+Mémoire, Divertissements). **Conteur + Mémoire haute** = Pivot du lore narratif. **Candidat fréquent au template alternatif au Souffle** (cf §14 chroniqueurs PNJ-clé). Influence directe sur la [[Reconnaissance]] des joueurs/factions.
>
> Source métier : [[03 - Mécaniques/Métiers/Divertissements/Barde]].

---

## 1. Vue d'ensemble

Le Barde PNJ est le **gardien populaire** du lore d'Hybelior. Il chante les épopées, raconte les hauts faits, transmet les généalogies, conserve les chants des ères passées. **Pouvoir social majeur** : ses chants peuvent **élever** ou **briser** la réputation d'un joueur, d'une guilde, d'une faction.

**Particularités majeures** :
- **PNJ-clé fréquent au Souffle** : ~30% des Bardes Maître+ sont **chroniqueurs**, candidats prioritaires au template alternatif au Souffle (cf §5.5.2 + §14 D-PNJ-ERES)
- **Verbe + Mémoire haute** : combinaison unique parmi les Divertissements
- **Influence Reconnaissance** : action directe sur le système de réputation joueur (cf source métier)
- **Mode Dialogue + Festivité** prédominants
- **F+N majoritaire** : ENFP, ENFJ, INFP — émotionnel, narratif

> [!important] Frontière comportementale
> - **Barde** = narratif + chant + Lore. **Verbe + Mémoire**. Influence Reconnaissance.
> - **[[Musicien]]** = sonore pur. **Verbe + Présence**. Buffs régen Labeur.
> - **[[Acteur]]** = incarnation. **Verbe + Présence**.
> - **[[Historien]]** = écrit, contrôle véracité. Barde = oral, mémorabilité.

---

## 2. Cycle quotidien typique

```
09:00 — Lever
10:00–12:00 — Petit déjeuner, accord instrument, révision épopées du soir
12:00–13:00 — Repas
13:00–15:00 — Étude (lecture nouvelles, généalogies, rumeurs)
15:00–17:00 — Performance place publique (récit court)
17:00–18:00 — Pause + repas léger
18:00–23:00 — **PERFORMANCE TAVERNE** (épopée longue, cœur du métier)
23:00–01:00 — Vie sociale, écoute des nouvelles, rencontres
01:00 — Coucher
```

**Modulation MBTI** :
- **ENFP** (40%) : raconte tout ce qu'il vit, émotionnel
- **ENFJ** (30%) : barde-mentor, transmission éducative
- **INFP** (30%) : barde-poète, compositions originales

**Cycle Souffle** : pendant changement d'Ère, peut basculer en routine `Routine_Bard_Chronicler` (récits multiples par jour, public massif).

---

## 3. MBTI typique et variantes

### 3.1 ENFP — Inspirateur (40%)
- Enthousiaste social, conteur de taverne
- Improvise, embellit les histoires, sympathie immédiate
- Compatible duo avec [[Musicien]] / [[Acteur]]

### 3.2 ENFJ — Protagoniste (30%)
- Barde-mentor, transmission éducative
- Donneur de quêtes morales ("aide ce héros oublié à recevoir justice")
- Influence Reconnaissance forte

### 3.3 INFP — Médiateur (30%)
- Barde-poète, compositions originales lyriques
- Plus introverti que la moyenne du métier mais capable de performance publique
- Compatible [[Lore/Religions/Foedus Animae|Foedus Animae]] (mémoire des défunts)

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **TavernAudienceFormed** | > 5 spectateurs assis | **EPOPÉE LONGUE** activée (45-90 min performance) |
| **HeroDeedReported** | Joueur exploit notable | Possible nouveau chant : si rep > 25, **chant héroïque** = +20 Renom joueur |
| **BetrayalReported** | Joueur action infame | Possible **chant de honte** = -20 Renom (rare ; Barde Karma vert peut refuser) |
| **EraSouffleBroadcast** | Nouveau Souffle | **Mode Chroniqueur activé** (PNJ-clé) : récits multiples, public massif |
| **NewsArrived** | Caravane apporte nouvelles | Étude immédiate, intégration au répertoire |
| **PatronArrives** | Noble/mécène entre taverne | Performance dédiée, prix premium |
| **WeddingCalled** | Mariage local | Récit + chants célébratoires |

---

## 5. Modes superposables

| Mode | Comportement Barde | LOD requis |
|------|--------------------------|------------|
| **Routine** | Préparation + performance | Tous |
| **Marchand** | Pourboires + chants signés (achat) + recueils | L0/L1 |
| **Dialogue** | **Mode privilégié** : long, lyrique, captivant | L0 |
| **Crise** | Recul prudent, peut **témoigner** post-événement (futur chant !) | L0 |
| **Festivité** | **Mode dominant** durant festivals (50-70% du temps) | Tous |
| **Religieux** | [[Lore/Religions/Cantus Mundi]] compatible majeur ; chant rituel | Tous |
| **Deuil** | Compose **épopée funéraire** ; performance commémorative | Tous |
| **Quête** | Donneur ET donataire : "retrouve les paroles oubliées de cette chanson" | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur exploit notable (action héroïque)
- **Trigger** : `Memory.Public.PlayerSavedNPC` w100 OU `Memory.Public.PlayerHelpedLocal`
- **Effet** : Barde **compose chant** intégrant le joueur
  - Si rep > 25 → chant **élogieux** = +20 [[Renom]] joueur (cohérent influence métier)
  - Propagation continent par autres Bardes (rumeur lyrique)
- **MBTI** : ENFP enthousiaste immédiat ; ENFJ analyse moralité ; INFP poétique

### 6.2 Festival local (mode actif)
- **Branche BT** : `ModeFestivite.BardEpic`
- **Utility** : `Routine.Continue` (performance) +50, `Social.Talk` +30 (interactions)
- **MBTI** : ENFP raconte ses voyages ; ENFJ chante l'unité du village ; INFP poésie d'ère
- **Effet** :
  - Mémoire de village : `Memory.Public.FestivalCelebrated` enrichi par chant signé
  - Pourboires +60% en festival
  - Mood Barde +30 base

### 6.3 Souffle imminent / changement d'Ère (PNJ-clé)
> Cf. §5.5.2 Actions Situationnelles — templates alternatifs.

- **Branche BT** : si Maître+ chroniqueur → **template alternatif `Routine_Bard_Chronicler`** activé
- **Effet** :
  - Récits multiples par jour, public massif (place publique + tournée tavernes)
  - Annonce officielle Souffle au public, **propage** la prédiction de l'[[Astronome]]
  - Composition d'**épopée d'Ère** signée (Héritage permanent possible)
- **MBTI** : ENFJ leader naturel transition ; ENFP émotionnel exalté ; INFP compose en parallèle
- **Cohérent §14 D-PNJ-ERES** : 5% PNJ-clés ont template alternatif au Souffle

### 6.4 Mode Crise — bagarre dans taverne
- **Branche BT** : recule prudemment, observe (futur récit !)
- **MBTI** : ENFP figé entre deux émotions (Peur saturée possible) ; ENFJ tente médiation verbale ; INFP fuit
- **Pas de combat** : Barde noté comme témoin > combattant

### 6.5 Mort d'un héros local
- Compose **épopée funéraire** signée
- Performance lors funérailles (cohérent §13)
- Effet Héritage : si héros = nommé, chant peut survivre Souffle (Œuvre signée)

### 6.6 Joueur Karma rouge — chant de honte
- Si Karma rouge confirmé : Barde peut composer **chant de honte**
- Effet : -20 [[Renom]] joueur si chanté (mais Barde Karma vert peut refuser éthiquement)
- ENFJ refuse souvent (moral) ; ENFP refuse rarement (émotion immédiate) ; INFP réfléchit longuement

---

## 7. Lifecycle (§18)

- **Persistant** très fréquent (Barde local = identité de la taverne)
- Maître Barde = nommé authored (~20 par capitale)
- **Mort permanente** si nommé : side quest "Le chant inachevé" + perte épopées non transmises
- **Successeur narratif** : disciple bardique reprend (Maîtrise -1)
- **Héritage** : épopées signées survivent au Souffle (cf §6 Carrière source)

---

## 8. Variantes et signatures PNJ

### 8.1 Le barde de taverne
- ENFP, voix porteuse, répertoire riche
- Karma vert+, populaire localement
- Mode Festivité actif quotidien

### 8.2 Le barde de cour (poète royal)
- ENFJ, élégant, accès royal
- Affiliation Couronne, influence politique
- Donneur de quêtes politiques + héroïques
- **Candidat principal template alternatif au Souffle**

### 8.3 Le barde-chroniqueur (PNJ-clé)
- ENFJ ou INFP Maître+, archives orales
- **Template alternatif au Souffle activé systématiquement**
- Affiliation Conseil des Augures (chroniqueur officiel)
- Héritage actif : épopées d'ère signées

### 8.4 Le barde itinérant (poète errant)
- INFP, voyage seul, compositions originales
- Karma vert, mélancolique, populaire dans villages
- Donneur de quêtes lyriques ("aide-moi à finir cette chanson")

---

*Liens : [[03 - Mécaniques/Métiers/Divertissements/Barde]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Musicien]] · [[Acteur]] · [[Historien]] · [[Lore/Religions/Cantus Mundi]] · [[Lore/Religions/Foedus Animae]] · [[Le Souffle]] · [[Les Ères]] · [[Reconnaissance]] · [[Renom]]*
