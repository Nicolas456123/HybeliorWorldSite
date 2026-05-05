---
tags: [pnj, comportement, ia, concepts, fondations, système]
type: system
status: spec-en-cours
last_review: 2026-05-01
needs_review_for: [tous-les-20-concepts]
---

# 🧠 Concepts Fondamentaux — IA des PNJ

> **Document socle.** Toutes les ébauches de [[Routine Quotidienne]], [[Modes Sociaux]], [[Métiers - Forgeron]], [[Métiers - Boulanger]] présupposent un modèle d'IA, de cognition, de mémoire, de personnalité et de simulation qui n'est **pas encore tranché**.
>
> Ce fichier liste les **20 concepts à arbitrer** avant de produire les archétypes Phase 2. Chaque concept = 1 question, plusieurs options, considérations, recommandation initiale légère.
>
> Format de réponse attendu : décision ferme + brève justification, fichier par fichier ou en lot. Mettre la décision dans la table récapitulative en bas.

---

## 1. Modèle d'IA global

**Question** : Quel modèle d'IA fait tourner les PNJ d'Hybelior ?

| Option | Avantages | Inconvénients |
|--------|-----------|----------------|
| (a) **Behavior Tree pur** (UE5 BTService) | Standard UE5, outils éditeur, debug visuel | Décisions hard-codées, peu adaptatif |
| (b) **Utility AI** | Choix dynamique selon scores, naturel | Plus difficile à debug, calibration des scores |
| (c) **GOAP** (Goal-Oriented Action Planning) | Émergence, replanification | Coût CPU, complexe à designer |
| (d) **FSM** (Finite State Machine) | Simple, lisible | Inflexible pour la complexité |
| (e) **Hybride : BT racine + Utility AI pour choix de tâches** | Combine lisibilité BT et adaptativité Utility | Coût d'apprentissage |

**Recommandation initiale** : (e) hybride — BT racine pour la routine + Utility AI pour le choix entre options concurrentes (mode marchand vs dialogue vs continuer la tâche métier).

**Décision (2026-05-01) : (e) Hybride BT racine + Utility AI Service.**

L'implémentation UE5 actuelle ([[AI Controller]] / [[AI Blueprints]]) repose déjà sur `BehaviorTreeComponent` + `BlackboardComponent` natifs avec `BT_EnemyBase` et un fallback C++ `EvaluateCombatSituation()`. Capitaliser sur cet existant : **BT racine** pilote la machine d'état macro (routine, mode social, combat, retour maison), un **Utility AI Service** custom (BTService) score les options concurrentes (continuer tâche métier vs servir client vs pause vs dialogue) et écrit le choix dans le Blackboard. (a) BT pur trop rigide pour 16 personnalités MBTI, (b) Utility seul illisible pour la routine quotidienne, (c) GOAP coût CPU prohibitif sur ~30 000 PNJ, (d) FSM trop limitée. Persistance : voir §10.

### Implémentation §1

**Niveau racine — Behavior Tree** (`BT_NPCBase`, dérive de la structure `BT_EnemyBase` existante) :
- Selector racine : `RetourMaison` → `Combat` (réutilise branche existante) → `RoutineActive` (nouvelle) → `ModeSocial` (nouvelle) → `Patrol/Idle`
- Branche `RoutineActive` consomme une clé Blackboard `CurrentRoutineSlot` (index dans la routine quotidienne du PNJ — voir [[Routine Quotidienne]])
- Branche `ModeSocial` se déclenche via tag GAS `Social.State.<Mode>` (analogue à `Combat.State.ReadyToFight`)

**Couche Utility — BTService_UtilityScorer (nouveau, BP)** :
- Tick 1.0s (vs 0.5s pour update Blackboard combat — cf `UpdateBlackboardValues`)
- Score 0-100 par option : `score = base_priority + mood_modifier + mbti_modifier + context_modifier`
- Modulateurs MBTI déjà spécifiés §6 (rigidité, fréquence dialogue, etc.)
- Écrit le gagnant dans `BBKey_NextAction` (nouvelle clé Blackboard à ajouter à `BB_NPCBase`)
- Règles dures pré-utility (court-circuit) : HP < 20% → `Combat.Retreat` ; menace perçue → `Combat.React` (cohérent avec §8 à trancher)

**Persistance entre sessions (§10)** :
- État sauvé : `CurrentRoutineSlot`, `Mood`, `LastInteractedPlayer`, `MBTI`, position, inventaire, alive/dead
- Schéma OWS : étendre table `Persistence` avec colonne JSON `npc_state` (cf [[Backend OWS]] / [[Migration Accord]])
- Reload : au respawn pool, le `AHWAIController::OnPossess` lit le snapshot et restaure les clés Blackboard

**Coût CPU estimé** : ~0.3 ms / PNJ tick complet en L0 (BT + Utility scorer 4-6 options) → 50 PNJ L0 simultanés < 15ms/frame budget IA, conforme cible MMO.

---

## 2. Perception — comment le PNJ "voit" le monde

**Question** : Modèle de perception sensoriel des PNJ ?

| Option | Note |
|--------|------|
| (a) Raycasts UE5 (réaliste, coûteux) | PNJ proches uniquement |
| (b) Zones d'awareness (cônes, sphères, sans LOS) | Plus efficace, moins réaliste |
| (c) Hybride : zones pour comportement passif, raycasts pour combat | Recommandé pour MMO |

**Paramètres canoniques à fixer** :
- Rayon de vision (jour / nuit) — voir §[[Taxonomie des Créatures]] §Sens
- Rayon d'audition (silencieux / bruyant)
- Détection de menace : seuil d'arme dégainée, comportement agressif, présence de sang

**Décision (2026-05-01) : (c) Hybride — zones d'awareness pour passif, raycasts UE5 (`UAIPerceptionComponent` + `UAISenseConfig_Sight`) pour combat actif.**

L'AIController C++ (`AHWAIController`) configure déjà un `AIPerceptionComponent` avec `UAISenseConfig_Sight` (rayon 3000 = 30m, lose 3500, cône 90°, MaxAge 5s). On **conserve ce socle** pour la couche raycast combat et on **ajoute** une couche zones d'awareness via overlap sphères (`USphereComponent` ou query trace périodique) pour les détections passives à plus longue portée — moins coûteux qu'un raycast LOS continu sur 80m. Cohérent avec le `BB_EnemyBase` qui a déjà une clé `HeardNoiseLocation` non encore branchée : on l'active pour le hearing zone. Ajouter `UAISenseConfig_Hearing` pour les bruits ponctuels (combat à proximité, alarmes village).

### Implémentation §2

**Couche raycast (UAIPerceptionComponent — existant, à étendre)** :
- `UAISenseConfig_Sight` : conserver les valeurs actuelles 3000/3500/90°/5s comme **valeur défaut "humain"**, paramétrer par espèce dans Data Asset (cf [[Taxonomie des Créatures]])
- `UAISenseConfig_Hearing` : à ajouter — `HearingRange = 1500` (15m silencieux) / `LoSHearingRange = 4000` (40m bruyant)
- LOS strict pour combat (cible verrouillée, esquive, ciblage)

**Couche zones d'awareness (nouvelle, BTService_AwarenessZones)** :
- Tick 0.5s, `OverlapMultiByChannel` sur sphère centrée pawn
- Détecte joueurs, autres PNJ, événements taggés (sang, feu, combat) sans LOS
- Alimente `BBKey_PassiveAwareness` (TArray<AActor*>) pour décisions Utility

**Paramètres canoniques par profil créature** (Data Asset `DA_PerceptionProfile`) :

| Profil | Vision jour | Vision nuit | Audition silence | Audition bruit |
|--------|-------------|-------------|------------------|----------------|
| **Humain standard** (PNJ village) | 30 m | 9 m (30%) | 15 m | 40 m |
| **Humain veilleur** (garde, chasseur) | 50 m | 15 m (30%) | 25 m | 60 m |
| **Créature à vision nocturne** (loup, hibou) | 30 m | 24 m (80%) | 25 m | 50 m |
| **Prédateur de pointe** (boss, créature unique) | 80 m | 64 m (80%) | 40 m | 80 m |
| **Insecte / bête à ouïe fine** | 15 m | 12 m | 30 m | 80 m |

**Conversion UE5** : 1 m = 100 unités → `SightRadius (PNJ standard) = 3000` (déjà en place) ; `LoseSightRadius = SightRadius * 1.15`.

**Détection de menace (seuils écrits dans le Blackboard `BBKey_ThreatLevel` 0-100)** :
- Joueur arme dégainée dans rayon vision : +30
- Joueur en sprint vers PNJ : +20
- Joueur a déjà attaqué quelqu'un dans la mémoire de zone (§3) : +40
- Tag `Combat.State.Aggressive` sur joueur (ASC) : +50
- Présence sang (acteur tag `World.Trace.Blood`) dans rayon 5m : +15
- Seuil de réaction : `ThreatLevel >= 50` → bascule en Combat ou Fuite selon MBTI/§8

**Cycle jour/nuit** : multiplicateur `vision_factor` lu depuis `WorldTime` (heure 06:00-20:00 = jour). Multiplie `SightRadius` runtime via `SightConfig->SightRadius = Profile.day * vision_factor`.

---

## 3. Mémoire

**Question** : Le PNJ se souvient-il du joueur (et d'autres événements) ? Combien de temps ? Mémoire individuelle ou partagée ?

| Option | Implication |
|--------|-------------|
| (a) Pas de mémoire (réinitialisée à chaque interaction) | Simple, mais immersion brisée |
| (b) Mémoire courte individuelle (24-48h gameplay) | Le PNJ se rappelle des dernières interactions |
| (c) Mémoire longue individuelle (persistante dans le temps, modulée par Souffle) | Cohérence narrative forte |
| (d) Mémoire partagée par village / faction (commérages) | Réputation se propage |
| (e) Hybride : mémoire courte individuelle + propagation lente vers le village | Recommandation |

**Considération** : la **Reconnaissance** (privée, factions/guildes) et le **Renom** (publique, classements globaux) — voir [[Registre des Décisions]] §D-GDD-RECONNAISSANCE — sont déjà des systèmes de réputation. La mémoire individuelle des PNJ s'y branche.

**Décision (2026-05-01) : (e) Hybride — mémoire courte individuelle (24-48h gameplay) + propagation lente vers une mémoire de village partagée, branchée sur Reconnaissance/Renom.**

L'option (a) brise l'immersion (un marchand qui ne se souvient pas qu'on lui a sauvé la vie hier), (c) seule alourdit la BDD OWS pour des PNJ génériques sans valeur narrative, (d) seule efface l'individualité MBTI (§6) puisque tous les PNJ d'un village réagiraient identiquement. L'hybride (e) capitalise sur les systèmes Reconnaissance/Renom déjà actés (D-GDD-RECONNAISSANCE) : la **mémoire individuelle** stocke les événements personnels du PNJ avec le joueur (24-48h), la **mémoire de village** (`UVillageMemorySubsystem`) reçoit les événements taggés "publics" (combat, vol, sauvetage) et les redistribue aux PNJ à proximité comme rumeurs. Décroissance douce > 30 jours pour éviter une explosion de la BDD. Compatible avec la persistance §10 et le LOD §11 (mémoire snapshot survit en L2/L3).

### Implémentation §3

**Mémoire individuelle (par PNJ)** :
- Struct C++ `FNPCIndividualMemory` (USTRUCT) sérialisée en JSON dans `npc_state` (cf §1 Persistance OWS) :
  ```
  TArray<FNPCMemoryEntry> RecentEvents;   // capacité ring-buffer = 16
  FDateTime LastInteractionWithPlayer;
  TMap<FName, float> PlayerOpinionScores; // par PlayerId, -100..+100
  ```
- `FNPCMemoryEntry` : `{ EEventType, FGameplayTag, ActorId, Location, Timestamp, Weight 0-100 }`
- **Durée individuelle** : `MemoryDuration = 24h` gameplay défaut, étendu à `48h` pour PNJ MBTI **J** (mémoire structurée), réduit à `12h` pour MBTI **P** (mémoire labile)
- **Décroissance** : entrée Weight × 0.9 par 6h ; supprimée à Weight < 5
- Branche §1 Utility Scorer : `mood_modifier += PlayerOpinionScores[PlayerId] * 0.3`

**Mémoire de village (partagée)** :
- `UHWVillageMemorySubsystem` (UWorldSubsystem, instancié par zone) :
  ```
  TMap<FName /*VillageId*/, FVillageMemoryStore> Stores;
  ```
- `FVillageMemoryStore` : `TArray<FNPCMemoryEntry> SharedRumors` (capacité 64) + `TMap<FName /*PlayerId*/, FPlayerReputationLocal>`
- **Propagation** : événements taggés `Memory.Public.*` (ex. `Memory.Public.PlayerKilledLocal`, `.PlayerHelpedLocal`, `.PlayerStoleLocal`, `.PlayerSavedNPC`) déclenchés par `BroadcastVillageEvent(Tag, Player, Location)` → ajoutés au `FVillageMemoryStore` du village dans rayon 200m
- **Diffusion vers PNJ** : à chaque réveil (L1→L0) ou tick 30s, le PNJ pull les rumeurs récentes du village qu'il n'a pas encore entendues (filtrage MBTI : **N** propage 1.5×, **S** 0.7× ; **E** propage 1.5×, **I** 0.7×)
- **Compression rumeur > 30 jours** : entry Weight passe à `Weight * 0.3` puis tag converti en `Memory.Rumor.Old.*` (impact divisé par 3)
- **Effet sur réputation locale** : `FPlayerReputationLocal` alimente directement la **Reconnaissance** par faction du village (D-GDD-RECONNAISSANCE), via `URecognitionSubsystem::AddDelta(PlayerId, FactionId, Delta)`

**Cohérence Reconnaissance/Renom** :
- Mémoire individuelle = couche personnelle PNJ (volatile, 24-48h)
- Mémoire village = relai vers **Reconnaissance** (privée par faction, persistante)
- Renom (public global) reste piloté par les exploits déclarés (Héritage), pas par les rumeurs PNJ
- Une mort PNJ provoquée par le joueur ajoute `Memory.Public.PlayerKilledLocal` Weight 80 → propagation sur tout le village → -50 Reconnaissance faction du village

**Coût mémoire estimé** :
- Mémoire individuelle : ~512 octets / PNJ (16 entries × 32 octets)
- Mémoire village : ~4 KB / village (64 rumeurs + 50 joueurs trackés)
- Pour 50 villages × 200 PNJ = 100 KB village + 100 KB individuels en RAM

---

## 4. Émotions / Mood

**Question** : Modèle émotionnel pour moduler les choix ?

| Option | Implication |
|--------|-------------|
| (a) Pas d'émotions, juste états (sain, blessé, mort) | Simple |
| (b) 4-6 émotions (peur, colère, joie, tristesse, fatigue, surprise) avec scores 0-100 | Riche |
| (c) Modèle PAD (Pleasure-Arousal-Dominance) à 3 axes continus | Académique, expressif |
| (d) Mood global agrégé (humeur du jour) + déclencheurs ponctuels | Pragmatique |

**Recommandation initiale** : (d) mood global modulé par événements + (b) léger (peur/colère/fatigue suffisent pour la plupart des décisions).

**Décision (2026-05-01) : (d)+(b) hybride — Mood global agrégé + 3 émotions ponctuelles canoniques (peur, colère, fatigue), modulés par MBTI, alimentent le Utility Scorer §1.**

(a) trop pauvre pour rendre les PNJ vivants, (b) seul produit un cocktail trop riche à debug (4-6 émotions × 16 MBTI = 96 combinaisons à équilibrer), (c) PAD purement académique sans gain ergonomique, (d) seul ne suffit pas pour les pics ponctuels (PNJ qui voit son ami se faire tuer doit avoir un pic colère immédiat). L'hybride pragmatique : un **mood général** (humeur de la journée, lent, dérive) + **3 émotions courtes** (peur/colère/fatigue, pics rapides, decay rapide). Branchement direct sur §1 Utility Scorer (déjà spec : `score = base_priority + mood_modifier + mbti_modifier + context_modifier`). Reset au matin gameplay (§10 décide qu'on ne persiste pas le mood, signature MBTI suffit). Cohérent avec D-PNJ-PERSONNALITÉ : MBTI = signature stable, mood = état conjoncturel.

### Implémentation §4

**4 dimensions canoniques (struct C++ `FNPCMoodState`)** :
```
float MoodGeneral;   // 0-100, neutre = 50 (humeur du jour, lent)
float Peur;          // 0-100, pic rapide, decay rapide
float Colere;        // 0-100, pic rapide, decay moyen
float Fatigue;       // 0-100, monte avec activité, baisse au sommeil
```

**Baselines par MBTI (calcul `MoodGeneral_init` au matin)** :
- Extraverti **E** : baseline 60 (joyeux par défaut)
- Introverti **I** : baseline 45
- Sentiment **F** : baseline 55, amplitude variations × 1.3
- Pensée **T** : baseline 50, amplitude variations × 0.7
- Perception **P** : variations spontanées ±10 random au matin
- Jugement **J** : variations stables ±2 random au matin

**Decay constants (par seconde gameplay)** :
- `MoodGeneral` : tend lentement vers baseline MBTI, vitesse 0.1/s (retour total ~15 min)
- `Peur` : decay 2.0/s (disparait en ~50s après stimulus)
- `Colere` : decay 0.5/s (persiste ~3 min)
- `Fatigue` : monte 0.05/s en activité, descend 0.2/s au sommeil/repos

**Triggers d'émotions (déclencheurs canoniques)** :
| Événement | Mood | Peur | Colere | Fatigue |
|-----------|------|------|--------|---------|
| Témoin combat à proximité | -10 | +30 | +10 | — |
| Allié tué (mémoire individuelle §3) | -25 | +50 | +60 | — |
| Joueur arme dégainée (ThreatLevel ≥ 50) | — | +40 | — | — |
| Pacte/contrat cassé par joueur | -15 | — | +70 | — |
| Lieu sacré profané (zone tag) | — | — | +50 | — |
| Sauvé par joueur (Eldoria rez §Mort) | +30 | -20 | -30 | — |
| Combat actif | — | +5/s | +3/s | +0.5/s |
| Sommeil 6h (routine) | +10 | — | — | -100 (full reset) |
| Faim / soif (routine) | -5 | — | — | +5 |

**Influence sur Utility Scorer §1 (modifiers chiffrés)** :
- `mood_modifier` Utility Service :
  - Action `Combattre` : `+ (Colere - 50) * 0.5 - Peur * 0.3`
  - Action `Fuir` : `+ Peur * 0.6 - (Colere - 50) * 0.4`
  - Action `Aider PNJ` : `+ (MoodGeneral - 50) * 0.4 + (F_modifier ? +10 : 0)`
  - Action `Dialoguer joueur` : `+ (MoodGeneral - 50) * 0.3 - Peur * 0.5`
  - Action `Continuer tâche métier` : `- Fatigue * 0.3 - Peur * 0.7`
- **Saturations** : `Peur >= 80` → court-circuit Utility, force action `Fuite` (cohérent §8)
- **Saturations** : `Fatigue >= 90` → court-circuit, force action `Repos`
- **Saturations** : `Colere >= 90` chez MBTI **T** → court-circuit `Defense agressive`

**Stockage runtime** :
- Composant `UHWNPCMoodComponent` attaché au pawn `AHWGASMobCharacter`
- Tick 1.0s (synchrone Utility Scorer)
- Exposé Blackboard via 4 nouvelles clés : `BBKey_MoodGeneral`, `BBKey_Peur`, `BBKey_Colere`, `BBKey_Fatigue`
- Non persisté entre sessions (§10) — recalculé au respawn depuis baseline MBTI

---

## 5. Modèle social — graphe de relations

**Question** : Comment représenter les relations PNJ↔PNJ (famille, amis, rivaux, hiérarchies) ?

| Option | Note |
|--------|------|
| (a) Pas de relations (PNJ atomiques) | Inadéquat pour un monde vivant |
| (b) Graphe explicite (chaque PNJ a une liste typée : `family: [...]`, `friends: [...]`, `enemies: [...]`, `boss: ...`) | Standard, ergonomique |
| (c) Modèle social procédural (Dwarf Fortress-like : chaque PNJ a des opinions individuelles sur chaque autre) | Très riche, coûteux |
| (d) Graphe par village + relations clés authored | Pragmatique pour MMO |

**Recommandation initiale** : (d) — chaque village a un graphe social pré-généré (familles, hiérarchie marchande, rivalités), enrichissable par authoring pour les PNJ nommés.

**Décision (2026-05-01) : (d) Graphe par village pré-généré + relations clés authored pour PNJ nommés.**

Chaque village possède un **graphe social typé** instancié à la génération du village (NPC Generator de [[Architecture Data-Driven]]). Le graphe est un ensemble de listes typées par PNJ — `family`, `friends`, `enemies`, `boss`, `mentor`, `apprentice`, `spouse` — qui constitue le tissu narratif de la localité. Pour les PNJ nommés (cf §17), le graphe est enrichi à la main par l'authoring tool. Les relations sont **modulées par MBTI** (cf §6) à la génération : Extravertis ont +50% de relations `friends`, Introvertis -40% ; Intuitifs ont 2× plus de chances d'avoir un `mentor` ou un `apprentice` ; les couples Feeling se forment plus facilement (Feeling↔Feeling probabilité ×1.5). Persistance : voir §10 (sprint Lifecycle).

### Implémentation §5

**Schéma du graphe social par PNJ** (struct `FNPCSocialGraph` sérialisée dans `npc_state` JSON OWS) :

```yaml
social_graph:
  family:
    parents: [npc_id_001, npc_id_002]   # 0-2
    siblings: [npc_id_010]               # 0-4
    children: [npc_id_050, npc_id_051]   # 0-6
    spouse: npc_id_005                   # 0-1
  friends: [npc_id_020, npc_id_021]      # 0-8 (modulé MBTI)
  enemies: [npc_id_030]                  # 0-3
  rivals: [npc_id_031]                   # 0-2 (rivalité professionnelle, pas haine)
  hierarchy:
    boss: npc_id_100                     # 0-1 (employeur, capitaine de garde, etc.)
    subordinates: [npc_id_110, ...]      # 0-N
    mentor: npc_id_200                   # 0-1
    apprentice: [npc_id_300]             # 0-3
  faction_role: "marchand_secondaire"    # rôle dans la hiérarchie de faction §12
```

**Pipeline de génération (NPC Village Generator)** :
1. **Pose des familles** : génère N foyers (3-5 PNJ par foyer en moyenne, distribution démographique pondérée par pays).
2. **Pose des hiérarchies de métier** : pour chaque métier présent (forgeron, boulanger, garde, etc.), choisit un *Maître* (boss), 0-3 *Apprentis* selon palier de Maîtrise.
3. **Pose des amitiés** : tirage probabiliste pondéré par voisinage géographique (mêmes maisons adjacentes), métier (forgeron ↔ marchand), MBTI compatible (E↔E +30%, T↔T +15%).
4. **Pose des rivalités** : 1-2 par village majeur — métiers concurrents (deux forgerons), conflits doctrinaux (Vael'Kari ↔ Ignitari), exclus sociaux.
5. **Authoring overlay** : pour les PNJ nommés du village (5-15 selon §17), l'authoring tool écrase ou complète les liens autogénérés.

**Modulateurs MBTI sur le graphe** :

| Dichotomie | Effet sur graphe |
|------------|------------------|
| **E** (Extraverti) | `friends.length` cible ×1.5, fréquence d'initiation de relations +40% |
| **I** (Introverti) | `friends.length` cible ×0.6, mais profondeur (force lien) +20% |
| **N** (Intuition) | Probabilité `mentor`/`apprentice` ×2 ; relation transgénérationnelle privilégiée |
| **S** (Sensation) | Relations ancrées dans la pratique métier (collègues > confidents) |
| **F** (Sentiment) | Probabilité `spouse` plus tôt, attache émotionnelle aux `enemies` (rancune) |
| **T** (Pensée) | Plus de `rivals` (rivalité professionnelle) que `enemies` (haine personnelle) |
| **J** (Jugement) | Hiérarchie `boss`/`subordinates` plus rigide (respect strict) |
| **P** (Perception) | Hiérarchie souple, relations plus fluides, change d'employeur plus facilement |

**Usage runtime (BT/Utility)** :
- Greeting check : si PNJ rencontre membre de `family` ou `friends` → animation salutation chaleureuse + dialogue spécifique
- Mode social : un PNJ libre choisit prioritairement d'aller voir `friends` (Utility scorer §1 +20 si target ∈ friends)
- Réaction à mort/blessure : si témoin de blessure d'un membre `family` → mood -30 (§4), event marquant ajouté en mémoire individuelle (§3) et `enemies` +1 vers l'agresseur
- Dialogue : ton modulé par type de relation (formel pour `boss`, familier pour `friends`, hostile pour `enemies`)

**Coût** : génération village = O(N²) sur appariement amitiés, mais N typique ≤ 200 (village moyen) → < 50 ms one-shot, négligeable. Stockage : ~2 KB / PNJ (graphe + IDs).

---

## 6. ⭐ Personnalité — modèle MBTI

**Question** : Comment représenter la personnalité d'un PNJ ?

> **Choix retenu (Nicolas, 2026-05-01)** : utiliser le modèle **MBTI** (Myers-Briggs Type Indicator) — 16 types issus de 4 dichotomies binaires.

> **Source canonique** : `AccessExport/Personnalite.csv` (16 types × 8 traits chiffrés + descriptions psychologiques) + `AccessExport/Tics.csv` (17 tics) + `AccessExport/PersonnalitéTics.csv` (mapping MBTI×Tic) + 7 tables de mapping (`VitesseMarche`, `StyleMarche`, `DistanceSociale`, `StyleDiscours`, `ChoixDialogue`, `Agressivite`, `FuiteBravoure`). Toutes ces données sont **intégrées** dans cette section §6.

### Les 4 dichotomies MBTI

| Dichotomie | Pôles | Influence comportementale dans Hybelior |
|------------|-------|------------------------------------------|
| **I / E** | Introverti / Extraverti | Fréquence d'interaction sociale ; mode marchand bavard ou laconique ; loisirs (lecture seul vs taverne) |
| **N / S** | Intuition / Sensation | Réactions aux événements cosmiques ; spéculation sur l'ère vs focus sur le travail concret ; sensibilité au lore |
| **T / F** | Pensée / Sentiment | Rigidité des prix marchands ; empathie face au malheur ; tonalité des dialogues |
| **J / P** | Jugement / Perception | Adhérence à la routine quotidienne ; réaction aux imprévus ; organisation du travail |

### Tables de référence des 8 traits canoniques

Les 8 traits chiffrés de chaque type MBTI s'expriment via les tables canoniques suivantes (issues de `AccessExport/`) :

| Trait | Valeurs canoniques |
|-------|-------------------|
| **VitesseMarche** | 1=Rapide, 2=Très rapide, 3=Lente, 4=Très Lente, 5=Normale |
| **StyleMarche** | 1=Confiante, 2=Hésitante, 3=Décidée, 4=Discrète, 5=Balancement, 7=Maladroite |
| **DistanceSociale** | 1=Très Proche, 2=Proche, 3=Normal, 4=Distant, 5=Très distant |
| **StyleDiscours** | 1=Formel, 2=Décontracté, 3=Agressif, 4=Diplomate, 5=Vocabulaire riche, 6=Familier, 7=Chaleureux |
| **ChoixDialogue** | 1=Amical, 2=Hostile, 3=Réservé |
| **Agressivite** | 1=Ne se défend pas, 2=Se défend un peu, 3=Se défend, 4=Se défend beaucoup, 5=Attaque doucement, 6=Attaque agressive |
| **FuiteBravoure** | 1=Prend la fuite, 2=Paralysé, 3=Courageux, 4=Reste calme |

### 16 types MBTI — table enrichie (8 traits chiffrés + libellés)

Format des cellules : `N° (libellé)` issu directement de `Personnalite.csv`.

| Type | Surnom | Trait dominant Hybelior | VitesseMarche | StyleMarche | DistanceSociale | StyleDiscours | ChoixDialogue | Agressivite | FuiteBravoure |
|------|--------|-------------------------|---------------|-------------|-----------------|---------------|---------------|-------------|---------------|
| **ISTJ** | Logisticien | Méthodique fiable ; idéal pour PNJ administrateurs, scribes, gardes vétérans | 3 (Lente) | 1 (Confiante) | 3 (Normal) | 1 (Formel) | 3 (Réservé) | 2 (Se défend un peu) | 4 (Reste calme) |
| **ISFJ** | Défenseur | Soignant discret ; idéal pour PNJ guérisseurs, mères, hôteliers | 5 (Normale) | 2 (Hésitante) | 2 (Proche) | 7 (Chaleureux) | 1 (Amical) | 2 (Se défend un peu) | 2 (Paralysé) |
| **INFJ** | Avocat | Idéaliste réservé ; idéal pour PNJ religieux contemplatifs ([[Lore/Religions/Foedus Animae]]) | 3 (Lente) | 4 (Discrète) | 1 (Très Proche) | 4 (Diplomate) | 3 (Réservé) | 1 (Ne se défend pas) | 4 (Reste calme) |
| **INTJ** | Architecte | Stratège silencieux, planifie sa journée ; rare et précieux pour quêtes complexes | 4 (Très Lente) | 3 (Décidée) | 4 (Distant) | 5 (Vocabulaire riche) | 3 (Réservé) | 5 (Attaque doucement) | 4 (Reste calme) |
| **ISTP** | Virtuose | Bricoleur indépendant ; idéal pour PNJ artisans solitaires (forgeron de montagne) | 1 (Rapide) | 5 (Balancement) | 3 (Normal) | 2 (Décontracté) | 2 (Hostile) | 5 (Attaque doucement) | 3 (Courageux) |
| **ISFP** | Aventurier | Artiste discret ; idéal pour PNJ peintres, ménestrels ambulants | 5 (Normale) | 7 (Maladroite) | 2 (Proche) | 6 (Familier) | 1 (Amical) | 2 (Se défend un peu) | 2 (Paralysé) |
| **INFP** | Médiateur | Rêveur sensible ; idéal pour PNJ poètes, jardiniers, jeunes apprentis | 4 (Très Lente) | 5 (Balancement) | 5 (Très distant) | 4 (Diplomate) | 3 (Réservé) | 1 (Ne se défend pas) | 4 (Reste calme) |
| **INTP** | Logicien | Curieux théoricien, parle peu mais profond ; idéal pour PNJ astronomes / oracles ([[Prédiction]]) | 5 (Normale) | 4 (Discrète) | 4 (Distant) | 5 (Vocabulaire riche) | 3 (Réservé) | 5 (Attaque doucement) | 4 (Reste calme) |
| **ESTP** | Entrepreneur | Audacieux pragmatique ; idéal pour PNJ contrebandiers, chasseurs de prime | 2 (Très rapide) | 1 (Confiante) | 1 (Très Proche) | 3 (Agressif) | 2 (Hostile) | 6 (Attaque agressive) | 3 (Courageux) |
| **ESFP** | Animateur | Spontané social ; idéal pour PNJ acrobates, vendeurs de marché, danseurs | 1 (Rapide) | 2 (Hésitante) | 2 (Proche) | 6 (Familier) | 1 (Amical) | 2 (Se défend un peu) | 2 (Paralysé) |
| **ENFP** | Inspirateur | Enthousiaste social ; idéal pour PNJ animateurs de fête, conteurs de taverne | 5 (Normale) | 5 (Balancement) | 1 (Très Proche) | 4 (Diplomate) | 1 (Amical) | 1 (Ne se défend pas) | 3 (Courageux) |
| **ENTP** | Innovateur | Inventeur charmeur ; idéal pour PNJ marchands itinérants, escrocs sympathiques | 2 (Très rapide) | 3 (Décidée) | 4 (Distant) | 5 (Vocabulaire riche) | 2 (Hostile) | 5 (Attaque doucement) | 3 (Courageux) |
| **ESTJ** | Directeur | Organisateur strict ; idéal pour PNJ contremaîtres, capitaines de port, juges | 1 (Rapide) | 1 (Confiante) | 3 (Normal) | 1 (Formel) | 3 (Réservé) | 5 (Attaque doucement) | 4 (Reste calme) |
| **ESFJ** | Consul | Hôte chaleureux ; idéal pour PNJ aubergistes, prêtres communautaires ([[Lore/Religions/Rota Mundi]]) | 3 (Lente) | 7 (Maladroite) | 2 (Proche) | 7 (Chaleureux) | 1 (Amical) | 2 (Se défend un peu) | 2 (Paralysé) |
| **ENFJ** | Protagoniste | Mentor charismatique ; idéal pour PNJ donneurs de quêtes émotionnels | 5 (Normale) | 3 (Décidée) | 1 (Très Proche) | 4 (Diplomate) | 1 (Amical) | 1 (Ne se défend pas) | 3 (Courageux) |
| **ENTJ** | Commandant | Leader ferme ; idéal pour PNJ chefs de guilde, capitaines de garde | 1 (Rapide) | 1 (Confiante) | 3 (Normal) | 3 (Agressif) | 2 (Hostile) | 6 (Attaque agressive) | 3 (Courageux) |

### Descriptions psychologiques canoniques (par type)

Reprises intégralement de `Personnalite.csv` colonne `Description`. Ces descriptions servent de **brief comportemental canonique** au générateur de PNJ et au système de dialogues.

<details>
<summary><b>ISTJ — Logisticien</b></summary>

Les ISTJ sont des individus méthodiques et précis. Leur démarche est lente et calculée, reflétant leur approche méticuleuse de la vie. Ils maintiennent une distance sociale normale, privilégiant des interactions formelles et réservées. Leur style de discours est formel, utilisant un vocabulaire précis. Dans le choix du dialogue, ils sont souvent réservés. En cas de confrontation, ils se défendent avec modération, évitant l'agressivité. Face au danger, les ISTJ restent calmes, évaluant la situation avec sang-froid.
</details>

<details>
<summary><b>ISFJ — Défenseur</b></summary>

Les ISFJ sont chaleureux et empathiques. Leur démarche est normale et attentionnée, reflétant leur préoccupation pour le bien-être des autres. Ils maintiennent une distance sociale proche, cherchant à établir des connexions personnelles. Leur style de discours est chaleureux et attentionné, privilégiant les interactions amicales. Dans le choix du dialogue, ils sont amicaux. En cas de confrontation, ils se défendent légèrement pour protéger leurs proches. Face au danger, les ISFJ peuvent être paralysés par la peur de mettre en danger ceux qu'ils aiment.
</details>

<details>
<summary><b>INFJ — Avocat</b></summary>

Les INFJ sont introspectifs et empathiques. Leur démarche est lente et prudente, reflétant leur nature réfléchie. Ils maintiennent une distance sociale très proche, cherchant à établir des liens profonds. Leur style de discours est diplomatique, favorisant la compréhension des émotions des autres. Dans le choix du dialogue, ils sont amicaux et évitent les confrontations. En cas de confrontation, ils évitent généralement les conflits et cherchent des solutions pacifiques. Face au danger, les INFJ restent calmes, essayant de résoudre les problèmes de manière réfléchie.
</details>

<details>
<summary><b>INTJ — Architecte</b></summary>

Les INTJ sont analytiques et stratégiques. Leur démarche est très lente, car ils préfèrent prendre leur temps pour réfléchir. Ils maintiennent une distance sociale distante en raison de leur nature réservée. Leur style de discours est caractérisé par un vocabulaire riche, exprimant des idées complexes de manière précise. Dans le choix du dialogue, ils optent souvent pour un style diplomatique et logique. En cas de confrontation, ils utilisent des arguments pour défendre leurs idées sans recourir à une agressivité excessive. Face au danger, les INTJ restent calmes, évaluant la situation avec rationalité et stratégie.
</details>

<details>
<summary><b>ISTP — Virtuose</b></summary>

Les ISTP sont aventureux et pragmatiques. Leur démarche est rapide et déterminée, reflétant leur propension à l'action. Ils maintiennent une distance sociale normale, adaptés aux normes sociales. Leur style de discours est décontracté et direct, privilégiant des interactions informelles. Dans le choix du dialogue, ils sont généralement amicaux et directs. En cas de confrontation, ils réagissent de manière réfléchie sans recourir à une agressivité excessive. Face au danger, les ISTP sont courageux, prêts à agir dans des situations dangereuses.
</details>

<details>
<summary><b>ISFP — Aventurier</b></summary>

Les ISFP sont expressifs et artistiques. Leur démarche est normale et créative, reflétant leur nature authentique. Ils maintiennent une distance sociale proche, cherchant à établir des connexions personnelles. Leur style de discours est familier, mettant en avant leur authenticité. Dans le choix du dialogue, ils sont généralement amicaux. En cas de confrontation, ils sont généralement calmes mais peuvent se défendre légèrement. Face au danger, les ISFP peuvent être paralysés par la peur, en particulier lorsque leur créativité est en jeu.
</details>

<details>
<summary><b>INFP — Médiateur</b></summary>

Les INFP sont rêveurs et contemplatifs. Leur démarche est très lente et rêveuse, reflétant leur nature imaginative. Ils maintiennent une distance sociale normale, préférant parfois garder leurs distances pour se ressourcer intérieurement. Leur style de discours est diplomate, cherchant à comprendre les autres. Dans le choix du dialogue, ils sont amicaux et évitent généralement les confrontations. En cas de confrontation, ils évitent généralement les conflits et cherchent des solutions pacifiques. Face au danger, les INFP restent calmes, cherchant à maintenir une atmosphère harmonieuse.
</details>

<details>
<summary><b>INTP — Logicien</b></summary>

Les INTP sont logiques et analytiques. Leur démarche est normale et calme, reflétant leur réflexion constante. Ils maintiennent une distance sociale distante en raison de leur nature introvertie. Leur style de discours est caractérisé par un vocabulaire riche, expliquant leurs idées complexes en détail. Dans le choix du dialogue, ils sont généralement diplomatiques et préfèrent des conversations réfléchies. En cas de confrontation, ils utilisent la logique pour défendre leurs idées plutôt que d'être agressifs. Face au danger, les INTP restent calmes, évaluant la situation avec rationalité.
</details>

<details>
<summary><b>ESTP — Entrepreneur</b></summary>

Les ESTP sont impulsifs et aiment l'action. Leur démarche est très rapide et énergique, reflétant leur volonté d'agir rapidement. Ils maintiennent une distance sociale normale, adaptés aux normes sociales. Leur style de discours est direct et parfois agressif, car ils sont prêts à relever n'importe quel défi. Dans le choix du dialogue, ils sont souvent directs et parfois hostiles. En cas de confrontation, ils réagissent de manière agressive face aux défis. Face au danger, les ESTP sont courageux, prêts à agir de manière audacieuse.
</details>

<details>
<summary><b>ESFP — Animateur</b></summary>

Les ESFP sont expressifs et vivent dans l'instant présent. Leur démarche est rapide et enthousiaste, reflétant leur énergie et leur désir de s'amuser. Ils maintiennent une distance sociale proche, cherchant à établir des connexions personnelles. Leur style de discours est familier, mettant en avant leur authenticité. Dans le choix du dialogue, ils sont généralement amicaux. En cas de confrontation, ils sont généralement calmes mais peuvent se défendre légèrement. Face au danger, les ESFP peuvent être paralysés par la peur ou l'incertitude dans des situations stressantes.
</details>

<details>
<summary><b>ENFP — Inspirateur</b></summary>

Les ENFP sont optimistes et cherchent de nouvelles expériences. Leur démarche est normale et curieuse, reflétant leur nature enthousiaste. Ils maintiennent une distance sociale proche, cherchant à établir des connexions personnelles. Leur style de discours est diplomatique, favorisant des interactions positives. Dans le choix du dialogue, ils sont généralement amicaux et enthousiastes. En cas de confrontation, ils préfèrent éviter les conflits et chercher des solutions pacifiques. Face au danger, les ENFP restent généralement courageux, cherchant des solutions créatives.
</details>

<details>
<summary><b>ENTP — Innovateur</b></summary>

Les ENTP sont curieux et aiment les défis intellectuels. Leur démarche est très rapide et confiante, reflétant leur désir de découvrir de nouvelles idées. Ils maintiennent une distance sociale normale, cherchant à comprendre les concepts complexes. Leur style de discours est caractérisé par un vocabulaire riche pour discuter de sujets intellectuels. Dans le choix du dialogue, ils sont souvent amicaux et confiants. En cas de confrontation, ils défendent leurs idées avec confiance sans être excessivement agressifs. Face au danger, les ENTP sont courageux, prêts à affronter les défis intellectuels avec audace.
</details>

<details>
<summary><b>ESTJ — Directeur</b></summary>

Les ESTJ sont pratiques et organisés. Leur démarche est rapide et déterminée, reflétant leur approche pragmatique de la vie. Ils maintiennent une distance sociale normale, privilégiant des interactions formelles et pragmatiques. Leur style de discours est formel, utilisant un vocabulaire précis pour exprimer leur sérieux. Dans le choix du dialogue, ils sont directs et préfèrent des conversations résolues. En cas de confrontation, ils évitent généralement l'agressivité excessive. Face au danger, les ESTJ restent calmes, évaluant la situation avec une approche pragmatique.
</details>

<details>
<summary><b>ESFJ — Consul</b></summary>

Les ESFJ sont attentionnés et préoccupés par les autres. Leur démarche est lente et prévenante, reflétant leur désir de faire plaisir et de prendre soin des autres. Ils maintiennent une distance sociale proche, cherchant à établir des connexions personnelles. Leur style de discours est chaleureux et attentionné, favorisant des interactions amicales. Dans le choix du dialogue, ils sont amicaux et préoccupés par les besoins des autres. En cas de confrontation, ils se défendent légèrement pour protéger les autres. Face au danger, les ESFJ peuvent être paralysés par la peur de mettre en danger ceux qu'ils aiment.
</details>

<details>
<summary><b>ENFJ — Protagoniste</b></summary>

Les ENFJ sont empathiques et cherchent à établir des connexions profondes. Leur démarche est normale et amicale, reflétant leur désir de créer des liens positifs avec les autres. Ils maintiennent une distance sociale proche, cherchant à comprendre les émotions des autres. Leur style de discours est diplomatique, favorisant des interactions amicales et compréhensives. Dans le choix du dialogue, ils sont amicaux et empathiques. En cas de confrontation, ils cherchent à résoudre les conflits de manière pacifique. Face au danger, les ENFJ sont courageux, prêts à protéger ceux qu'ils aiment.
</details>

<details>
<summary><b>ENTJ — Commandant</b></summary>

Les ENTJ sont déterminés et cherchent à atteindre leurs objectifs. Leur démarche est rapide et confiante, reflétant leur désir de prendre des décisions éclairées. Ils maintiennent une distance sociale normale, privilégiant des interactions formelles et déterminées. Leur style de discours est formel, exprimant leurs idées avec confiance et assurance. Dans le choix du dialogue, ils sont souvent directs et confiants. En cas de confrontation, ils sont déterminés à défendre leurs idées et objectifs. Face au danger, les ENTJ réagissent de manière audacieuse pour résoudre les problèmes et atteindre leurs objectifs.
</details>

### 6.bis Tics canoniques — 17 types + mapping MBTI

Source : `AccessExport/Tics.csv` + `AccessExport/PersonnalitéTics.csv`. Chaque PNJ se voit assigner **un tic principal** (déterminé par son MBTI) qui s'exprime via animation procedurale en idle/dialogue/stress. Les tics sont des **micro-animations** déclenchées par `BTService_TicTrigger` (tick 4-8s, probabilité modulée par mood §4 : Peur ×2, Colère ×1.5, Fatigue ×1.3).

#### Catalogue des 17 Tics canoniques

| N° | Tic | Description physique | Contexte d'expression |
|----|-----|---------------------|----------------------|
| 1 | **Bégaiement** | Hésitation vocale, répétition syllabe initiale | Dialogue stressant ; PNJ timide face autorité |
| 2 | **Toussotement** | Raclement de gorge bref | Avant prise de parole ; gêne sociale |
| 3 | **Murmure tout seul** | Lèvres bougent, son inaudible | Idle réflexion ; introspection |
| 4 | **Balancement** | Léger transfert poids gauche/droite | Idle prolongé ; rêverie ; attente |
| 5 | **Claquement de doigts** | Doigts main dominante claquent rythmiquement | Impatience ; idée naissante |
| 6 | **Réajuste les lunettes** | Touche bord supérieur des lunettes (ou geste équivalent si pas de lunettes : pince l'arête du nez) | Concentration ; précision |
| 7 | **Se gratte le menton** | Index/pouce sur menton, regard pensif | Réflexion ; doute |
| 8 | **Aucun** | Pas de tic visible | Stoïcisme ; maîtrise de soi |
| 9 | **Touche ses bijoux** | Effleure collier/bague/boucle d'oreille | Vanité ; rappel d'un proche ; nostalgie |
| 10 | **Main sur le front** | Paume ou dos de la main sur le front | Préoccupation ; soin pour autrui ; fatigue mentale |
| 11 | **Geste avec ses mains** | Mouvements amples des mains pendant parole | Expression animée ; pédagogie |
| 12 | **Penche la tête** | Tête légèrement inclinée latéralement | Curiosité ; écoute attentive |
| 13 | **Se frotte les mains** | Paumes l'une contre l'autre | Anticipation ; froid ; calcul |
| 14 | **Caresse son épaule** | Main opposée passe sur l'épaule, mouvement réconfortant | Tendresse ; soutien émotionnel ; gêne |
| 15 | **Mordille son pouce** | Ongle ou phalange du pouce contre la lèvre | Anxiété ; concentration intense |
| 16 | **Joue avec un objet** | Manipule petit objet (pièce, pendentif, plume) | Créativité ; ennui productif |
| 17 | **Bras croisés** | Avant-bras croisés sur poitrine | Posture défensive ; jugement ; attente impatiente |

#### Mapping MBTI × Tic principal

D'après `PersonnalitéTics.csv` — assignation canonique 1 tic par type MBTI.

| MBTI | Tic principal | N° | Justification psychologique |
|------|---------------|----|-----------------------------|
| **ISTJ** | Réajuste les lunettes | 6 | Méthodiques et attentifs aux détails — tic de réajustement reflète leur souci du détail et de la précision |
| **ISFJ** | Main sur le front | 10 | Préoccupés par le bien-être des autres — toucher le front exprime une préoccupation ou un souci |
| **INFJ** | Murmure tout seul | 3 | Introspectifs et réflexifs profonds — murmure de pensées ou de réflexions intérieures |
| **INTJ** | Aucun | 8 | Rationnels et réservés, avec peu de tics visibles — maîtrise stoïque |
| **ISTP** | Geste avec ses mains | 11 | Pragmatiques et travaillent avec leurs mains — leurs gestes reflètent leur rapport au matériel |
| **ISFP** | Joue avec un objet | 16 | Créatifs et apprécient l'art et les objets — manipuler un objet exprime leur créativité |
| **INFP** | Balancement | 4 | Contemplatifs et rêveurs — balancement doux reflète leur nature imaginative |
| **INTP** | Réajuste les lunettes | 6 | Logiques et analytiques — tic de réajustement reflète leur attention aux détails et à la précision |
| **ESTP** | Claquement de doigts | 5 | Énergiques et aventureux — claquement reflète leur impatience ou leur excitation |
| **ESFP** | Geste avec ses mains | 11 | Expressifs et au centre de l'attention — gestes animés théâtralisent leur présence |
| **ENFP** | Caresse son épaule | 14 | Extravertis cherchant connexions — caresser l'épaule exprime de l'affection |
| **ENTP** | Main sur le front | 10 | Curieux cherchant à comprendre — toucher le front reflète leur réflexion profonde |
| **ESTJ** | Aucun | 8 | Pratiques et directs, avec peu de tics visibles — sobriété de leader |
| **ESFJ** | Main sur le front | 10 | Attentionnés et préoccupés par autrui — geste exprime préoccupation pour leurs proches |
| **ENFJ** | Caresse son épaule | 14 | Empathiques cherchant liens émotionnels — caresser l'épaule exprime affection et soutien |
| **ENTJ** | Aucun | 8 | Leaders rationnels et déterminés, avec peu de tics visibles — autorité posée |

**Note de design** : 3 types (INTJ / ESTJ / ENTJ) ont `Aucun` comme tic — c'est intentionnel et reflète une signature de **maîtrise visible** (les types T-J dominants). 2 tics partagés multi-types : tic #6 (ISTJ + INTP), tic #10 (ISFJ + ENTP + ESFJ), tic #11 (ISTP + ESFP), tic #14 (ENFP + ENFJ) — économie de production animations (~13 anims uniques pour 16 types).

**Tics secondaires Phase 2** : un PNJ peut hériter d'un **tic secondaire** issu de son métier (ex. forgeron → #13 Se frotte les mains ; bibliothécaire → #6 Réajuste les lunettes systématique) ou de sa religion (ex. moine Lex Petra → #7 Se gratte le menton).

### Implémentation paramétrique

**Frontmatter PNJ** :
```yaml
personality_mbti: INTJ          # un des 16 types
mbti_strength: 70              # 0-100, force du type (faible = comportement neutre)
```

**Modulation des templates** : chaque template de comportement (Routine, Modes, Métier) déclare des **modulateurs MBTI** :

```yaml
# Exemple dans Routine Quotidienne
modulateurs_mbti:
  J: { adhérence_horaires: +30, tolérance_imprévu: -20 }
  P: { adhérence_horaires: -30, tolérance_imprévu: +30 }
  I: { temps_loisir_seul: +50, fréquence_dialogue_initié: -40 }
  E: { temps_loisir_seul: -40, fréquence_dialogue_initié: +50 }
  T: { rigidité_prix: +30, ton_dialogue: factuel }
  F: { rigidité_prix: -20, ton_dialogue: empathique }
  N: { fréquence_spéculation: +40, intérêt_ères: +30 }
  S: { fréquence_spéculation: -30, intérêt_ères: -20 }
```

**Distribution par village** : chaque village a une distribution MBTI (par défaut quasi-uniforme + biais culturels par nation — un village d'Onara penche peut-être sur les types F (sensibles, religieux), un village d'Alkaran sur les types T (factuels, durs)).

### Implémentation Utility Scorer §1 — modulation des 8 traits chiffrés

Cette sous-section formalise comment les **8 traits chiffrés** lus depuis `Personnalite.csv` (1 ligne par MBTI) modulent concrètement le score Utility évalué dans `BTService_UtilityScorer` (§1). Cohérent avec la chaîne de décision §8 (règles dures → saturations émotions → Utility Scorer).

#### Formule canonique du score Utility

```
score_final = score_base
            + dichotomy_modifier(I/E, N/S, T/F, J/P)   // modulateurs §6 ci-dessus (±20 à ±50)
            + agressivite_modifier                       // -20 à +30 selon niveau 1-6
            + fuite_modifier                             // -50 à +30 selon FuiteBravoure 1-4
            + distance_modifier                          // -10 à +10 selon DistanceSociale 1-5
            + vitesse_marche_modifier                    // -5 à +5 sur options nécessitant déplacement
            + style_discours_modifier                    // ±10 sur options dialogue
            + choix_dialogue_modifier                    // -30 à +20 sur options Social
            + mood_modifier (§4)
            + memory_modifier (§3)
```

#### Tables de modificateurs Utility par trait

| Agressivite (1-6) | Modifier sur Combat.Engage | Modifier sur Combat.Retreat | Modifier sur Combat.Defense |
|-------------------|---------------------------|----------------------------|----------------------------|
| 1 (Ne se défend pas) | -20 | +30 | -20 |
| 2 (Se défend un peu) | -10 | +10 | +10 |
| 3 (Se défend) | 0 | 0 | +15 |
| 4 (Se défend beaucoup) | +5 | -10 | +25 |
| 5 (Attaque doucement) | +20 | -20 | +20 |
| 6 (Attaque agressive) | +30 | -30 | +15 |

| FuiteBravoure (1-4) | Modifier Combat.Engage | Modifier Combat.Retreat | Modifier Combat.Hide | Modifier Combat.Surrender |
|---------------------|-----------------------|-------------------------|---------------------|---------------------------|
| 1 (Prend la fuite) | -50 | +40 | +30 | +20 |
| 2 (Paralysé) | -30 | -20 | +10 | +30 |
| 3 (Courageux) | +30 | -20 | -10 | -20 |
| 4 (Reste calme) | 0 | 0 | 0 | 0 |

| DistanceSociale (1-5) | Modifier Social.Greet (target dans 2m) | Modifier Social.Greet (target 5-10m) | Modifier Routine.Continue (target ≤1m) |
|----------------------|----------------------------------------|--------------------------------------|----------------------------------------|
| 1 (Très Proche) | +20 | +10 | 0 |
| 2 (Proche) | +10 | +5 | 0 |
| 3 (Normal) | 0 | 0 | -5 |
| 4 (Distant) | -10 | -5 | -10 |
| 5 (Très distant) | -20 | -10 | -15 |

| ChoixDialogue (1-3) | Modifier Social.Talk | Modifier Social.Trade | Modifier Combat.Surrender |
|---------------------|---------------------|----------------------|---------------------------|
| 1 (Amical) | +20 | +10 | -10 |
| 2 (Hostile) | -30 | -20 | -20 |
| 3 (Réservé) | -10 | 0 | 0 |

| StyleDiscours (1-7) | Tonalité dialogue généré | Modifier Social.Talk |
|---------------------|--------------------------|---------------------|
| 1 (Formel) | vouvoiement, vocabulaire soutenu | 0 |
| 2 (Décontracté) | tutoiement, contractions | +5 |
| 3 (Agressif) | impératifs, ton sec | -10 |
| 4 (Diplomate) | nuances, formules de politesse | +10 |
| 5 (Vocabulaire riche) | métaphores, références cultivées | +5 |
| 6 (Familier) | argot, tutoiement immédiat | +5 |
| 7 (Chaleureux) | diminutifs affectueux, empathie | +15 |

| VitesseMarche (1-5) | MaxWalkSpeed (cm/s) | Modifier sur options déplacement |
|---------------------|---------------------|----------------------------------|
| 1 (Rapide) | 220 | +5 sur Patrol/Move |
| 2 (Très rapide) | 280 | +10 sur Patrol/Move/Engage |
| 3 (Lente) | 140 | -5 sur options Move |
| 4 (Très Lente) | 100 | -10 sur options Move |
| 5 (Normale) | 180 | 0 |

#### Pseudo-code C++ (extrait `UBTService_UtilityScorer::CalculateScore`)

```cpp
float UBTService_UtilityScorer::CalculateScore(EUtilityOption Option, const FNPCPersonality& P) const
{
    float Score = GetBaseScore(Option);

    // 1. MBTI dichotomies (§6 modulateurs déjà existants)
    Score += GetMBTIDichotomyModifier(Option, P.MBTI);

    // 2. Traits chiffrés issus de Personnalite.csv
    Score += GetAgressiviteModifier(Option, P.Agressivite);       // table ci-dessus
    Score += GetFuiteBravoureModifier(Option, P.FuiteBravoure);   // table ci-dessus
    Score += GetDistanceSocialeModifier(Option, P.DistanceSociale, GetTargetDistance());
    Score += GetChoixDialogueModifier(Option, P.ChoixDialogue);
    Score += GetStyleDiscoursModifier(Option, P.StyleDiscours);
    Score += GetVitesseMarcheModifier(Option, P.VitesseMarche);

    // 3. Modulation par mood (§4) et memory (§3)
    Score += MoodComponent->GetUtilityDelta(Option);
    Score += MemoryComponent->GetUtilityDelta(Option);

    return FMath::Clamp(Score, -100.f, +200.f);
}
```

#### Frontmatter PNJ étendu

```yaml
# Identité MBTI (immutable, §10)
personality_mbti: ISTJ          # un des 16 types
mbti_strength: 70              # 0-100, force du type

# Traits chiffrés issus de Personnalite.csv (lookup via N° ligne MBTI)
trait_vitesse_marche: 3        # 1-5 (cf table VitesseMarche)
trait_style_marche: 1          # 1-7 (cf table StyleMarche)
trait_distance_sociale: 3      # 1-5 (cf table DistanceSociale)
trait_style_discours: 1        # 1-7 (cf table StyleDiscours)
trait_choix_dialogue: 3        # 1-3 (cf table ChoixDialogue)
trait_agressivite: 2           # 1-6 (cf table Agressivite)
trait_fuite_bravoure: 4        # 1-4 (cf table FuiteBravoure)
trait_tic_principal: 6         # 1-17 (cf table Tics, hérité du MBTI)
```

> **Note d'optimisation** : les 8 traits sont **dérivés du MBTI** par défaut (lookup statique dans `DT_PersonalityTraits` Data Table importée depuis `Personnalite.csv`). Un PNJ authored peut **surcharger** un ou plusieurs traits dans son frontmatter (ex. INTJ avec `trait_agressivite: 6` pour un boss caché). La force `mbti_strength` module l'intensité des modificateurs (×0 à ×1).

### À approfondir Phase 2

- Distribution MBTI par nation / pays (biais culturels)
- Compatibilité MBTI avec les religions (un INTJ rejoint Lex Petra, un ENFP Via Ventus, etc.)
- MBTI et arc narratif d'un PNJ (peut-il évoluer ? probablement non — c'est une signature)
- Influence MBTI sur les **dialogues générés** (ton, longueur, vocabulaire)
- **Calibration playtest** des tables de modificateurs Utility ci-dessus (CAL-MBTI-UTILITY) : valeurs ±20/±30/±50 à valider sur scénarios canoniques (combat 1vN, dialogue marchand, fuite ours, festival)
- **Animations de tics** : 13 anims uniques à produire (8 = "Aucun" donc 0 anim ; 17 - 8 - 4 partagées = 13 distinctes)

**Décision** : ✅ MBTI retenu. 8 traits chiffrés + 17 tics + descriptions psychologiques absorbés depuis `AccessExport/`. Modalités d'implémentation à affiner Phase 2.

---

## 7. Réactivité au joueur — réputation locale

**Question** : Comment la réputation du joueur module-t-elle le comportement des PNJ ?

| Option | Note |
|--------|------|
| (a) Réputation globale (un score unique) | Simple, peu nuancé |
| (b) Réputation par faction / village | Standard MMO |
| (c) Réputation par individu (chaque PNJ a une opinion) | Riche, coûteux |
| (d) Hybride : faction + individus clés (PNJ nommés) | Recommandation |

**Branchement** : sur Reconnaissance (privée) + Renom (publique) — voir [[Registre des Décisions]] §D-GDD-RECONNAISSANCE.

**Décision (2026-05-01) : (d) Hybride — réputation par faction (couche large) + réputation par individu pour PNJ nommés clés.**

La réactivité PNJ s'articule en **deux couches superposées** alignées sur D-GDD-RECONNAISSANCE :
1. **Reconnaissance par faction** (privée, -100 → +100) : score persistant joueur×faction, branche directement sur la Reconnaissance canonique. Tous les PNJ génériques affiliés à cette faction (cf §12) **héritent** de ce score à l'interaction.
2. **Réputation individuelle** (-100 → +100) : uniquement pour les **PNJ nommés clés** (5-10 par ville majeure, cf §17), avec mémoire de leurs interactions personnelles avec le joueur (branche §3 Mémoire individuelle).

Le **Renom public** (classements globaux) reste un overlay informatif — il colore les premiers contacts (un Renom de héros déclenche +10 réputation initiale auprès des factions alliées) mais n'écrase pas la Reconnaissance privée. Modulation comportement chiffrée : prix marchands, salutations, services, hostilité, accès donjons — tout scalé selon réputation effective au moment de l'interaction.

### Implémentation §7

**Calcul de la réputation effective ressentie par un PNJ** :

```
rep_effective(PNJ, Joueur) =
    si PNJ ∈ named_npcs[ville] et rep_individuelle(PNJ, Joueur) ≠ null :
        0.7 × rep_individuelle(PNJ, Joueur) + 0.3 × rep_faction(PNJ.faction, Joueur)
    sinon :
        rep_faction(PNJ.faction, Joueur) + bias_renom(Joueur)

bias_renom(Joueur) = clamp(Joueur.Renom / 1000 × ±10, -10, +10)  # signe selon alignement faction
```

**Seuils canoniques de modulation comportement** (lus par BT/Utility et dialogues) :

| Seuil rep_effective | Comportement marchand | Salutation | Services | Combat |
|---------------------|----------------------|------------|----------|--------|
| **+75 à +100** (Allié) | Prix -30%, propose items rares cachés | Chaleureuse, dialogue long | Tous services + quêtes exclusives | PNJ aide en combat (§3 named only) |
| **+25 à +75** (Ami) | Prix -10% | Cordiale | Tous services standards | Neutre |
| **-25 à +25** (Neutre) | Prix standard | Polie minimale | Standard | Neutre |
| **-50 à -25** (Méfiant) | Prix +20% | Froide, courte | Refuse services premium (banque, quêtes) | Méfiant, alerte gardes proches si comportement louche |
| **-75 à -50** (Hostile) | Prix +50% | Refuse de parler | Refuse tout service | Garde appelle les gardes ; civil fuit |
| **< -75** (Ennemi) | Refuse de servir | Insulte / cri d'alerte | Aucun | Garde attaque à vue ; civil signale immédiatement |

**Modulateurs MBTI** (appliqués par-dessus les seuils) :
- **F** (Sentiment) : seuils décalés de +5 dans le sens favorable (plus pardonnant)
- **T** (Pensée) : seuils décalés de -5 dans le sens favorable (plus calculateur, garde rancune)
- **J** (Jugement) : amplitude × 1.2 (jugement tranché — ami chaleureux ou ennemi déclaré)
- **P** (Perception) : amplitude × 0.8 (plus tolérant en moyenne)
- **E** (Extraverti) : multiplicateur d'expression sociale ×1.3 (un PNJ +75 E sera très expansif)
- **I** (Introverti) : multiplicateur ×0.7 (même un PNJ allié reste réservé)

**Hooks d'événements (modificateurs de réputation)** :

| Action joueur | Δ rep_individuelle (témoin) | Δ rep_faction (zone) |
|---------------|------------------------------|----------------------|
| Donne objet rare en cadeau | +15 | +1 |
| Aide gratuite (quête mineure) | +10 | +2 |
| Bénédiction / rituel auprès d'un Prêtre | +5 | +5 (faction religieuse) |
| Vol détecté (témoin) | -25 | -10 |
| Agression PNJ neutre (témoin) | -40 | -20 |
| Meurtre PNJ (Karma rouge §PvP) | -100 | -50 |
| Don à œuvre faction (≥ 500 Éclats) | — | +5 / 500 Éclats |
| Quête principale faction terminée | +30 | +25 |

**Branchement technique** :
- `URecognitionSubsystem::GetEffectiveReputation(PNJ_Id, Player_Id)` → score consolidé runtime
- Marchand : `BTService_PriceModifier` lit le score → applique multiplicateur sur `Inventory.BasePrice`
- Dialogue : `DialogueSelector` choisit la branche (chaleureuse / standard / hostile) selon le seuil
- Combat : `BTDecorator_ShouldEngageHostile` retourne true si rep_effective < -75 et profil PNJ = combattant

**Persistance** :
- `rep_faction` : table OWS `player_faction_reputation` (player_id, faction_id, score, last_updated) — déjà prévue par D-GDD-RECONNAISSANCE
- `rep_individuelle` : étendue de `npc_state.individual_reputation` JSON (uniquement pour PNJ nommés, ~1-3 KB / PNJ nommé)

**Coût** : ~50 PNJ nommés × 13 pays × 5 capitales = ~3 250 PNJ nommés à tracker individuellement → table `named_npc_reputation` ~3 lignes max par joueur (un joueur n'interagit pas avec tous), volume négligeable BDD.

---

## 8. Modèle de décision — choix entre options concurrentes

**Question** : Comment un PNJ choisit-il entre fuir/cacher/combattre/aider ?

| Option | Note |
|--------|------|
| (a) Priorité hard-codée par template | Simple, prévisible |
| (b) Utility-based (chaque option scorée selon contexte) | Émergence |
| (c) Hybride : règles dures (mort imminente → fuite) + utility pour le reste | Recommandation |

**Décision (2026-05-01) : (c) Hybride — court-circuits hard-codés (priorités vitales) + Utility Scorer §1 pour le reste, modulé par Mood §4 et MBTI §6.**

(a) seul produit des PNJ trop prévisibles (toujours fuir à 20% HP, jamais d'héroïsme), (b) seul rend l'analyse `pourquoi le PNJ a fait ça ?` quasi impossible et fait risquer des décisions absurdes en edge cases (PNJ qui continue à boire à la taverne pendant qu'on l'attaque). L'hybride (c) est **strictement cohérent avec §1 D-PNJ-IA-GLOBAL** déjà acté : règles dures = court-circuits pré-Utility (déjà mentionnés `HP < 20% → Combat.Retreat`), Utility Scorer = choix entre options non-vitales. La section ci-dessous fixe la **liste exhaustive des règles dures + les seuils chiffrés** déjà annoncés en §1 et §4.

### Implémentation §8

**Architecture de décision (3 couches dans l'ordre d'évaluation)** :

```
1. RÈGLES DURES (court-circuits, priorité absolue, eval avant Utility)
        ↓ si aucune ne match
2. ÉMOTIONS SATURÉES (§4, override Utility si saturation > seuil)
        ↓ si pas saturé
3. UTILITY SCORER §1 (BTService_UtilityScorer, score 0-100 par option)
```

**Couche 1 — Règles dures (évaluation séquentielle, tick 0.5s synchro `UpdateBlackboardValues`)** :

| Priorité | Condition | Action forcée | Source canonique |
|----------|-----------|---------------|------------------|
| P0 | `Health < MaxHealth * 0.20` | `Combat.Retreat` | `BBKey_ShouldRetreat` existant ([[AI Controller]]) |
| P0 | `Health < MaxHealth * 0.10` && pas de chemin de fuite | `Combat.Surrender` (nouveau) | — |
| P1 | Allié direct attaqué dans rayon 10m | `Combat.Defense` | §5 social (à venir) |
| P1 | Pacte/contrat avec joueur cassé (Memory.Public.PactBroken) | `Combat.Aggressive` (vs ce joueur) | §3 mémoire |
| P1 | Lieu sacré profané dans rayon 15m (tag `World.Sacred.Profaned`) | `Combat.Defense` | §13 religion (à venir) |
| P2 | `Peur >= 80` (§4 saturation) | `Combat.Flee` (panique) | §4 |
| P2 | `Fatigue >= 90` && hors combat | `Routine.RestNow` (force repos) | §4 |
| P2 | `Colere >= 90` && MBTI T | `Combat.Defense` (agression défensive) | §4 + §6 |
| P3 | `ThreatLevel >= 50` (§2 perception) | Bascule sous-arbre Combat (§16) | §2 |
| P3 | Joueur attaque PNJ directement | Bascule sous-arbre Combat (§16) | §2 + §16 |

> **Cohérence avec fallback C++ existant** : `EvaluateCombatSituation()` utilise actuellement `HP < 30 absolu`, divergence avec `BBKey_ShouldRetreat` (HP < 20% MaxHP). **À harmoniser** : adopter partout `MaxHealth * 0.20`. Patch C++ trivial dans `HWAIController.cpp::EvaluateCombatSituation()`.

**Couche 2 — Émotions saturées** :
- Lookup direct des saturations §4 (déjà chiffrées : `Peur >= 80`, `Fatigue >= 90`, `Colere >= 90` MBTI T)
- Si match, écrit directement `BBKey_NextAction` sans passer par Utility

**Couche 3 — Utility Scorer §1** :
- BTService 1.0s tick (déjà spec §1)
- Options scorées en parallèle, gagnant écrit dans `BBKey_NextAction`
- Score = `base_priority + mood_modifier (§4) + mbti_modifier (§6) + context_modifier`
- Liste canonique des options (extensible) : `Combat.Engage`, `Combat.Retreat`, `Combat.Defense`, `Combat.Surrender`, `Combat.Hide`, `Routine.Continue`, `Routine.Pause`, `Social.Greet`, `Social.Trade`, `Social.Talk`, `Help.Ally`, `Help.Player`

**Pondération MBTI sur les options (modifiers, non exhaustif)** :
- MBTI **F** (Feeling) : `Help.Ally` +20, `Combat.Surrender` +10, `Combat.Aggressive` -15
- MBTI **T** (Thinking) : `Combat.Defense` +15, `Help.Player` -10 (sauf compensation Reconnaissance)
- MBTI **E** : `Social.Greet` +30, `Routine.Pause` (pour discuter) +20
- MBTI **I** : `Social.Greet` -25, `Routine.Continue` +15
- MBTI **J** : `Routine.Continue` +25 (rigidité), `Routine.Pause` -20
- MBTI **P** : `Routine.Pause` +20, opportunités de dialogue +15
- MBTI **N** : `Combat.Hide` +15 (analyse avant action)
- MBTI **S** : `Combat.Engage` +10 (réaction directe)

**Cas critiques (ratifiés par cette décision)** :
- **Joueur dégaine arme près d'un marchand pacifique INFP** : couche 1 P3 → bascule combat ; couche 2 `Peur` saturée probable (introvertis F + N panique vite) → `Combat.Flee`. Verdict : il fuit.
- **Garde ESTJ pendant raid bandit** : couche 1 P1 (allié attaqué) → `Combat.Defense` immédiat. Pas de scoring nécessaire.
- **Vieux paysan ISTP voit un loup** : couche 3 Utility → `Combat.Hide` dominant (S - réaction directe à la menace, P + opportunité, low Vigueur). Verdict : il se cache.
- **Forgeron ENTJ, joueur sauve son fils** : `Memory.Public.PlayerSavedNPC` Weight 100 → +30 Mood individuel pour ce joueur → Utility donne `Help.Player` ou `Social.Trade` discount.

---

## 9. Population — spawn, density, lifecycle

**Question** : Comment la population PNJ est-elle générée et maintenue ?

- PNJ persistants (toujours les mêmes, savent qui tu es) vs transients (anonymes, regénérés) ?
- Combien de PNJ dans une ville moyenne ? (ordre de grandeur : 30 ? 100 ? 500 ?)
- Renaissance après mort (nouveau PNJ remplace, ou mort permanente) ?
- Cycle générationnel (enfants deviennent adultes) ?

**Considération** : impact mémoire serveur OWS (voir [[Backend OWS]]) — chaque PNJ persistant = état en BDD.

**Décision (2026-05-01) : (hybride) Persistants + Transients selon contexte. Persistants nommés/familles authored (5-10 par ville majeure cf §17) + Transients foule générique regénérée par `AHWEntityPoolManager`.**

L'option "100% persistants" sature la BDD OWS (cf [[Migration Accord]]) sans valeur narrative pour les passants ; l'option "100% transients" tue la mémoire individuelle (§3) et les arcs de quête (§15). La séparation **persistants vs transients** s'aligne sur le pipeline UE5 existant : le `AHWEntityPoolManager` gère déjà un pool d'entités réutilisables (`InitialPoolSize = 50`) **idéal pour la foule transient**, tandis que les persistants vivent en BDD via la table `npc_persisted` (voir §10) et sont matérialisés en L0/L1 quand un joueur entre dans leur zone. Cohérent avec [[La Partie]] continue : la population se renouvelle sans wipe, et les PNJ nommés ont une mort narrative permanente (§18).

### Implémentation §9

**Catégorisation des PNJ** (tag GAS `NPC.Category.<X>` posé à la création) :

| Catégorie | Persistance | Sous-types | Durée de vie monde |
|-----------|-------------|------------|---------------------|
| **Nommé authored** | Persistant (BDD) | Notables, chefs, donneurs main quest, signature culturelle | Mort permanente (§18) |
| **Famille de génération** persistant | Persistant (BDD) | Artisans clés, donneurs side quest secondaires, garde nommée | Mort = successeur narratif après ~7 jours (§18) |
| **Foule transient** | Pas de BDD individuelle | Passants, gardes lambda, paysans aux champs, pèlerins, foule de marché | Pool Manager respawn instant |
| **Faune transient** | Pas de BDD individuelle | Loups, sangliers, etc. (hors scope §9 PNJ humanoïdes mais même pipeline pool) | Pool Manager + LootGen |

**Densité cible canonique par taille de localité** :

| Type localité | Persistants | Transients pic | Transients creux | Total perçu pic |
|---------------|-------------|----------------|------------------|------------------|
| **Capitale** (Astravia, Bel-Karad) | 50-100 | 200-400 | 80-150 | 250-500 |
| **Ville majeure** (chef-lieu de pays) | 25-50 | 100-200 | 40-80 | 125-250 |
| **Bourg / port** | 10-25 | 40-100 | 20-40 | 50-125 |
| **Village** | 5-10 | 20-40 | 10-20 | 25-50 |
| **Hameau / camp** | 2-5 | 5-15 | 2-8 | 7-20 |
| **Solitaire / ermite** | 1-3 | 0-3 | 0-1 | 1-6 |

#### Densité par échelle d'urbanisme canonique (source : [[AccessExport/TailleVille.csv]])

> Cohérent avec [[Échelles et Niveaux#Échelles d'urbanisme (source : AccessExport/TailleVille.csv)|Architecture/Échelles et Niveaux §Échelles d'urbanisme]] — 5 paliers canoniques `Maison Isolée` · `Hameau` · `Village` · `Ville` · `Grande Ville`. Cette table est la **vue PNJ** de la même grille (la table ci-dessus mélange paliers d'urbanisme et rôles narratifs comme "port" ou "ermite"). Les deux coexistent et se référencent : un "Bourg / port" se mappe typiquement sur l'échelle **Ville** ; un "Solitaire / ermite" sur **Maison isolée** ; une "Capitale" est toujours classée **Grande Ville** côté Architecture.

| Échelle d'urbanisme | PNJ persistants typiques | PNJ transients pic | Total perçu pic | Mapping `DescriptionVille` (Ville.csv) |
|---------------------|--------------------------|---------------------|------------------|----------------------------------------|
| **Maison isolée** | 1-3 | 0-1 | 1-4 | (pas d'entrée Ville.csv ; toponymes Lore/Pays) |
| **Hameau** | 5-15 | 2-5 | 7-20 | (pas d'entrée Ville.csv ; villages déclassés en Hameau si pop <50) |
| **Village** | 15-40 | 10-30 | 25-70 | `Village` |
| **Ville** | 50-150 | 50-200 | 100-350 | `Ville` |
| **Grande Ville** | 150-300+ | 200-500+ | 350-800+ | `Capitale` (toujours) ; `Ville` si métropole majeure |

> Total cible monde **inchangé** (~3 000-5 000 persistants total monde, cf [[Registre des Décisions]] §D-PNJ-POPULATION). Cette ventilation par urbanisme **complète** les fourchettes par rôle narratif ci-dessus pour les calculs de spawn dans `UHWPopulationSubsystem`. Les rôles narratifs (port, capitale, bourg) deviennent des **modificateurs** sur l'échelle d'urbanisme de base : Capitale = Grande Ville × 1.0 ; Ville-port = Ville × 1.2 transients (commerce) ; Ville-garnison = Ville × 1.0 persistants + 50-100 soldats transients en plus.

**Volumétrie totale monde estimée** :
- ~3 000-5 000 PNJ persistants (BDD `npc_persisted`) sur 13 pays × ~50 localités majeures
- Capacité transients dynamique : pool L0+L1 par zone, jamais > 500 entités actives simultanément (budget LOD §11)
- En activité simultanée : ~2 000-4 000 PNJ persistants vivants en RAM (L0/L1/L2) + ~5 000-15 000 transients potentiels selon densité joueurs

**Pipeline de spawn** :
1. `UHWPopulationSubsystem` (UWorldSubsystem) lit la **table de densité** par zone au load
2. Pour chaque localité, instancie d'abord les **persistants** vivants (lecture `npc_persisted` → `AHWEntityPoolManager::GetPooledEntity()` puis injection du snapshot via `InitializeEntity()`)
3. Puis comble jusqu'à la cible avec des **transients** générés par `NPCGenerator` ([[Architecture Data-Driven]] §6) — archétype + variant + tenue + dialogues d'ambiance modulés par ère active
4. Cycle jour/nuit : densité transients module ×0.4 la nuit (plupart des PNJ génériques rentrent), ×1.0 le jour, ×1.3 jours de marché

**Renaissance après mort** :
- **Transient** : remplacement instantané (pool retourne l'instance désactivée au pool, `NPCGenerator` rerolle un nouveau passant à un point de spawn voisin) — cohérent avec `RespawnDelay = 5s` du [[Entity Spawner]] existant
- **Persistant "famille de génération"** : à la mort, `bIsAlive = false` enregistré dans `npc_persisted`, déclenchement d'un timer de 7 jours gameplay → `NPCSuccessionService` instancie un **successeur narratif** (apprenti devient maître, fils prend la forge, voisin promu garde-chef) avec **héritage partiel** de la mémoire de village (§3) et nouvelle MBTI rerollée
- **Persistant nommé** : **mort permanente** (§18). Pas de successeur automatique. Entrée chronique [[Lore]] et déclenchement potentiel de side quests "L'héritier disparu", "La forge muette" via Quest Generator (§15)

**Pas de cycle générationnel** : pas de naissance procédurale, pas de vieillissement temps-réel sur la durée d'une Partie continue (§18). La population se renouvelle uniquement par **succession narrative** ou **respawn pool**.

**Coût BDD estimé** :
- ~5 000 persistants × 4 KB JSON snapshot moyen = 20 MB en `npc_persisted` (très léger pour PostgreSQL OWS)
- 0 octet pour les transients (pas de persistance individuelle ; archétype rerollé à chaque spawn)

---

## 10. Persistance — quel état survit ?

**Question** : Quel état d'un PNJ persiste entre sessions/redémarrages serveur ?

| État | Doit persister ? |
|------|-----------------|
| Position dans le monde | Oui |
| Inventaire (marchand) | Oui |
| Relations sociales | Oui (graphe village) |
| Mémoire du joueur | Selon §3 |
| Mood / émotions actuels | Probablement non (reset au matin) |
| MBTI | Oui (signature) |
| Quêtes données | Oui |
| Alive / dead | Oui |

**Branche** : sur [[Migration Accord]] et [[Backend OWS]] — schéma SQL à étendre pour stocker l'état PNJ.

**Décision (2026-05-01) : Persistance stratifiée selon catégorie §9. Persistants → tout l'état en BDD (table `npc_persisted` JSON) ; Transients → pas de persistance individuelle ; mood quotidien reset au matin ; mémoire joueur compressée à >30j (§3).**

Le tableau ci-dessus est **canonique** mais a besoin de précision sur **où** ça persiste et **quand** ça décroît. Cohérent avec [[Migration Accord]] : on ajoute UNE table `npc_persisted` (ne casse pas le schéma OWS existant) qui stocke un blob JSON par PNJ persistant, indexé par `npc_id` (FName) + `zone_id`. Aucun champ atomique éclaté en colonnes — la flexibilité JSON est nécessaire vu la diversité d'archétypes (forgeron a inventaire, prêtre a état rituel, garde a tour de garde). Le **mood quotidien** (§4) reset au matin permet d'éviter de polluer la BDD avec un état émotionnel volatile et garantit la fraîcheur narrative chaque jour. La **mémoire joueur** (§3) suit déjà sa propre décroissance documentée (Weight × 0.9 par 6h, conversion `Memory.Rumor.Old.*` après 30j).

### Implémentation §10

**Schéma SQL OWS (`npc_persisted`, ajout simple, pas de breaking change)** :

```sql
CREATE TABLE npc_persisted (
  npc_id          VARCHAR(64) PRIMARY KEY,    -- FName unique du PNJ (ex. "alkaran_ironforge_master_001")
  archetype       VARCHAR(64) NOT NULL,        -- "forgeron_master", "innkeeper", "guard_captain", etc.
  zone_id         VARCHAR(32) NOT NULL,        -- localité de rattachement
  is_named        BOOLEAN     NOT NULL DEFAULT false,
  is_alive        BOOLEAN     NOT NULL DEFAULT true,
  death_timestamp TIMESTAMP,                   -- pour timer succession 7j (§9)
  json_state      JSONB       NOT NULL,        -- voir struct ci-dessous
  last_save       TIMESTAMP   NOT NULL DEFAULT NOW(),
  schema_version  INT         NOT NULL DEFAULT 1
);
CREATE INDEX idx_npc_zone ON npc_persisted(zone_id);
CREATE INDEX idx_npc_alive ON npc_persisted(is_alive);
```

**Contenu canonique de `json_state`** (struct C++ `FNPCPersistedState`, sérialisée) :

```yaml
position:
  location: { x, y, z }
  rotation_yaw: float
  current_zone_id: "altram_village_alpha"
  home_location: { x, y, z }            # point de retour
identity:
  name: "Maître Erwen"                  # affichage
  mbti: "ESTJ"                           # signature §6 (immutable)
  mbti_strength: 75
  age_apparent: 52                       # cosmétique, pas vieillit (§18)
  gender: "male"
  mesh_variant_id: "human_male_03"
  outfit_id: "blacksmith_apron"
  voice_pitch: 0.92
faction:
  primary: "altram_kingdom"
  secondary: "lex_petra"
  tertiary: null
  loyalty_score: 75
inventory:
  shop_items: [ {tag, count, price}, ... ]   # marchands uniquement
  personal: [ {tag, count}, ... ]
  currency: { eclats: 1240 }
relations:
  family: [ {npc_id, relation_type}, ... ]    # cf §5 graphe social
  friends: [ npc_id, ... ]
  rivals: [ npc_id, ... ]
  hierarchy_boss: npc_id
  hierarchy_subordinates: [ npc_id, ... ]
memory_individual:
  player_opinions: { player_id: float -100..100 }
  recent_events: [ FNPCMemoryEntry, ... ]     # ring-buffer 16 (§3)
  last_interaction_with_player: timestamp
mood_baseline:
  baseline_joy: 50
  baseline_fatigue: 20
  baseline_fear: 0
  baseline_anger: 10
  # mood quotidien actuel : NON persisté (reset au matin §4)
quests_given:
  authored: [ quest_id, ... ]                # main quests assignées (§15)
  generated_active: [ quest_id, ... ]        # side quests en cours
  completed_with_player: { player_id: [quest_id, ...] }
era_state:
  current_era_modulation_profile: "EraModProfile_Forgeron"  # §14
  alternative_template_active: null          # ou ID template alternatif (5% PNJ-clés §14)
  era_dialogue_overrides: { ... }
routine:
  current_routine_template_id: "Routine_Forgeron_Default"
  current_slot_index: 4                       # heure actuelle dans routine
  schedule_overrides: [ {day, hour, override}, ... ]
masteries:
  weapon_masteries: { tag: tier }            # 5 paliers (cf [[Armes et Maîtrise]])
  craft_masteries: { tag: tier }
  faith_mastery: { religion_id: tier }
```

**Politique de persistance par champ** :

| Élément | Persisté ? | Quand ? | Raison |
|---------|------------|---------|--------|
| Position | ✅ | À chaque changement de zone OU toutes 5min | Cohérence après reboot |
| Inventaire marchand | ✅ | À chaque transaction | Anti-dupe |
| Inventaire personnel | ✅ | À chaque modification | — |
| Currency PNJ | ✅ | À chaque transaction | — |
| Relations | ✅ | À chaque modification | Stable mais structurel |
| Mémoire individuelle (§3) | ✅ | À chaque ajout/décroissance | Décroît selon §3 |
| Mémoire de village (§3) | ✅ | Stockée dans table `village_memory` séparée | — |
| Mood baseline | ✅ | Modifié rarement (events majeurs) | — |
| **Mood quotidien actuel** | ❌ | Reset au matin (06:00 in-game) | Volatile, narratif |
| MBTI | ✅ | Immutable | Signature §6 |
| Quêtes données | ✅ | À chaque assign/complete | Cohérence narrative |
| Alive/dead | ✅ | À chaque changement | Critique (§18) |
| State BT runtime | ❌ | Recalculé au respawn L0 | Trop volatil |
| Threat level (§2) | ❌ | Recalculé via perception | — |

**Hooks de sauvegarde** :
- `UHWNPCPersistenceComponent::SaveNow()` : appelé sur événements critiques (mort, transaction, dialogue terminé)
- Auto-save toutes 5 min pour position/routine
- Save batch par zone toutes 10 min (réduit charge BDD)
- Save forcé au passage L1 → L2 → L3 (cohérent avec hibernation §11)

**Reload au respawn** :
- Quand un joueur entre dans une zone, `UHWPopulationSubsystem` (cf §9) :
  1. Lit toutes les rangées `npc_persisted` WHERE `zone_id = current` AND `is_alive = true`
  2. Pour chaque, allocate via `AHWEntityPoolManager::GetPooledEntity()` 
  3. Appelle `InitializeEntity(json_state)` pour injecter le snapshot
  4. AIController possede l'instance, restore Blackboard depuis `routine.current_slot_index`
  5. Mood baseline + mémoire individuelle relus, mood quotidien recalculé

**Cohérence avec Souffle/Accord** :
- Souffle (§14) **ne reset pas** la `npc_persisted`. Seule `era_state.current_era_modulation_profile` change (broadcast EraGenerator).
- Une mort narrative durant un Souffle reste persistée — la mort traverse les Ères.
- Le successeur narratif (§9, §18) est instancié comme un nouveau row `npc_persisted` avec `archetype` similaire et héritage partiel via `relations.hierarchy_subordinates` du défunt.

**Coût BDD** :
- ~4 KB JSON moyen / persistant × 5 000 = 20 MB
- ~10-50 transactions/sec en peak (sauvegardes batch) = OK PostgreSQL/OWS
- Index sur `zone_id` permet load-zone < 50ms pour 200 PNJ persistants

**Schema migration (cohérent [[Migration Accord]])** : Phase B-D ajoute `npc_persisted` ; aucun `DROP COLUMN` requis. Versionné via `schema_version` pour upgrades futurs.

---

## 11. LOD AI — niveaux de simulation

**Question** : PNJ proches du joueur simulés finement, lointains abstraits. Quels seuils ?

| Niveau | Rayon | Simulation |
|--------|-------|-----------|
| L0 — Pleine simulation | < 50 m | BT complet, animations, perception, dialogue |
| L1 — Simulation simplifiée | 50-200 m | BT simplifié, pas de perception fine |
| L2 — État abstrait | 200 m - même zone | Position + état, pas de tick BT |
| L3 — Hibernation | Hors zone | Aucun tick, reprise via snapshot |

**Considération** : MMO avec des centaines de joueurs et milliers de PNJ → LOD AI essentiel.

**Décision (2026-05-01) : 4 niveaux L0 → L3 avec hystérésis ±5m, branchés sur le système de pool/spawner existant.**

Le pipeline UE5 actuel (`AHWEntitySpawner` + `AHWEntityPoolManager`) gère déjà un pool d'entités activées/désactivées via `DetectionSphere` (joueur entre/sort) qui correspond déjà à un binaire L0/L3. On **étend** ce système à 4 niveaux pour passer de "activé/désactivé" à une simulation graduée. Les seuils proposés (50/200m + zone) sont alignés sur les valeurs MMO de référence (WoW classic ~30m sim active, FFXIV ~50m, ESO ~100m). L'hystérésis ±5m (proposée) est conservatrice : on monte de palier à `seuil + 5m`, descend à `seuil - 5m`, évite les oscillations près des frontières. Pleinement compatible avec la persistance §10.

### Implémentation §11

**Architecture** : nouveau `UHWAILODManager` (UWorldSubsystem) qui tick 0.25s, calcule pour chaque PNJ actif `min_distance = min(distance to all players in zone)` puis bascule le niveau via les seuils ci-dessous.

| Niveau | Seuil entrée | Seuil sortie (hystérésis) | Tick BT | Tick perception | Animation | Coût CPU /PNJ |
|--------|--------------|---------------------------|---------|-----------------|-----------|---------------|
| **L0** Pleine simulation | < 45 m | > 55 m | 100% (chaque frame autorisé) | Sight + Hearing + Awareness Zones | AnimBP complet, Blend Spaces | ~0.3 ms |
| **L1** Simulation simplifiée | 45-195 m | 55-205 m | 250 ms (4 Hz) | Sight uniquement (rayon réduit ×0.5) | AnimBP réduit (idle/walk/run, pas de blend fin) | ~0.05 ms |
| **L2** État abstrait | 195 m - frontière zone | 205 m - frontière zone | Aucun tick BT, update via `RoutineTicker` global toutes les 5s | Désactivée | Squelette en T-pose ou mesh masqué selon `bIsRendered` | ~0.005 ms |
| **L3** Hibernation | Hors zone (différent zone load) | Re-load zone | Aucun tick | Aucune | Acteur détruit, snapshot persisté | 0 (RAM seule) |

**Règles de transition** :
1. **Hystérésis ±5m** sur tous les seuils (entrée à `seuil_base`, retour au niveau précédent à `seuil_base + 10m` pour redescendre vers L0, `-10m` pour remonter vers L3).
2. **Cap par frame** : max 5 promotions L1→L0 par frame (évite spike CPU quand un joueur sprint à travers un village). Les autres restent en L1 jusqu'à la frame suivante.
3. **Promotion forcée** : si PNJ devient cible Combat (`BBKey_TargetActor` set par perception d'un autre PNJ relayée) → promotion immédiate L0 quel que soit la distance.
4. **L2 → L1 anticipé** : si vélocité joueur dirigée vers PNJ et ETA < 3s → promotion L1 avant entrée seuil.
5. **L3 entry** : utiliser le `OnPlayerExitSphere` existant du `AHWEntitySpawner` ; étendre pour persister le snapshot avant `DeactivateMob`.

**Coût mémoire estimé** :
- L0 : ~25 KB / PNJ (BT instance + Blackboard + AnimInstance + skeletal mesh state)
- L1 : ~12 KB / PNJ (Blackboard + AnimInstance simplifiée)
- L2 : ~2 KB / PNJ (struct snapshot en RAM)
- L3 : ~512 B / PNJ (BDD OWS, RAM négligeable)

**Budget cible (1 zone, 30 joueurs simultanés en moyenne)** :
- ~50 PNJ L0 → 1.25 MB + 15 ms CPU = OK
- ~300 PNJ L1 → 3.6 MB + 15 ms CPU = OK
- ~2000 PNJ L2 → 4 MB + 0.5 ms CPU = OK
- Reste en L3 : illimité (BDD)

**Branchement existant** :
- `AHWEntityPoolManager::GetPooledEntity()` reste source d'allocation L0/L1
- Étendre `AHWEntitySpawner::ActivateEntity()` pour accepter un `EAILODLevel` paramètre
- Nouveau `UHWAILODManager::PromoteEntity(Entity, NewLevel)` orchestre la transition (réactive AnimInstance, change Tick interval BT, etc.)

---

## 12. Factions — affiliations et bascules

**Question** : Comment un PNJ s'affilie à une faction ? Statique ou dynamique ?

- Affiliation statique (PNJ généré avec sa faction, ne change jamais) — simple
- Affiliation dynamique (peut changer selon événements, conflits, séduction du joueur) — riche

**Considération** : impact sur hostilités, dialogues, prix marchands. Voir [[Factions]].

**Recommandation initiale** : statique pour PNJ génériques, dynamique pour PNJ nommés clés.

**Décision (2026-05-01) : Affiliation statique pour PNJ génériques, dynamique pour PNJ nommés.**

La frontière statique/dynamique épouse la frontière authoring/généré (cf §17), créant une cohérence structurelle forte. Les **PNJ génériques** (paysans, gardes ordinaires, marchands de quartier — ~95% du volume) reçoivent **une faction principale immutable** au spawn (héritée du pays, du métier et du quartier), ce qui simplifie drastiquement le runtime et la persistance. Les **PNJ nommés** (5-10 par ville majeure) peuvent **basculer** de faction sous l'effet d'événements scriptés, de quêtes joueur, ou de conflits doctrinaux. La compatibilité MBTI module la résistance/inertie au changement : les **F** (Sentiment) sont 2× plus susceptibles à une bascule sous séduction émotionnelle, les **T** (Pensée) plus stables (changent uniquement sous argument logique ou intérêt rationnel) ; les **J** (Jugement) résistent à la bascule (loyaux), les **P** (Perception) y sont ouverts.

### Implémentation §12

**Schéma d'affiliation par PNJ** (struct `FNPCFactionAffiliation` dans `npc_state`) :

```yaml
faction_affiliation:
  primary: "lex_petra"           # faction principale (religion / politique / commerciale)
  secondary: "altram_kingdom"    # faction politique (pays) — toujours présente, héritée
  tertiary: null                 # 0-1 affiliations supplémentaires (guildes marchandes)
  is_named: false                # true = PNJ nommé, peut basculer
  loyalty_score: 65              # 0-100, force de l'affiliation primaire
  switch_history: []             # only for is_named=true ; trace narratif
```

**Pose à la génération** (NPC Generator) :
1. **Pays (faction politique secondaire)** : déterministe selon zone de spawn ([[Géographie]])
2. **Religion (faction primaire si religion-dominante)** : tirage pondéré par "Religion dominante par pays" (cf [[Lore/Religions/00 - Système Religieux]] §Religion dominante par pays). Ex. à Altram : Lex Petra 70%, Filii Fornacis 20%, autres 10%.
3. **Faction commerciale (tertiaire)** : tirage pour les métiers marchands selon réseau de routes commerciales actives.
4. **PNJ nommé** : `is_named = true` ; les bascules sont actives (pipeline ci-dessous).

**Bascule de faction (PNJ nommés uniquement)** :

| Déclencheur | Δ loyalty_score | Condition de bascule |
|-------------|-----------------|----------------------|
| Quête joueur "convaincre" terminée | -30 si target faction | loyalty < 30 → switch primaire vers faction-cible |
| Conflit doctrinal (faction-rivale victorieuse localement) | -15 | si secondary > primary → swap automatique |
| Événement Souffle (cf §14) modifie alignement Ère ↔ Religion | ±20 | si religion-active désalignée à l'Ère, +20 chez religions alignées |
| Mort d'un proche `family` membre d'une autre faction | +25 vers faction-victime ou -25 vers faction-tueur | conflit narratif scripté |
| Pacte avec joueur (Foedus Animae §13) | +40 vers Foedus Animae | switch direct si MBTI = F |

**Modulateurs MBTI sur la bascule** :

| Dichotomie | Effet sur résistance/inertie |
|------------|------------------------------|
| **F** (Sentiment) | Δ × 1.5 sur déclencheurs émotionnels (mort proche, séduction) |
| **T** (Pensée) | Δ × 0.7 sur déclencheurs émotionnels, ×1.3 sur déclencheurs rationnels (intérêt) |
| **J** (Jugement) | loyalty_score initial +20 (loyaux), seuil de bascule à loyalty < 15 (au lieu de 30) |
| **P** (Perception) | loyalty_score initial -10, seuil de bascule à loyalty < 45 (plus fluide) |
| **N** (Intuition) | Sensibilité aux conflits doctrinaux (×1.5) — questionne plus la doctrine |
| **S** (Sensation) | Sensibilité aux faits concrets (mort, conflit local) ×1.3 |

**Conflits multi-factions** : un PNJ nommé peut avoir une primaire ET une secondaire en conflit (ex. Vael'Kari de Pyrtara vivant en territoire Ignis Aeternum dominant) → mood (§4) marqué "tension" en permanence (-10), risque de bascule augmenté de 30% si déclencheur survient.

**Branchement runtime** :
- `UFactionSubsystem::GetPrimaryFaction(NPC_Id)` → renvoie la primaire actuelle
- Hostilité : matrice `factions × factions` lue par `BTDecorator_IsHostileToTarget`
- Réputation : calculée par §7 sur la primaire, possiblement scalée par secondaire (réduction 50%)

**Persistance** :
- PNJ générique : 1 byte (ID faction), immutable, en RAM par défaut, BDD seulement si modifié par événement majeur
- PNJ nommé : ~64 octets (struct complète), persisté en BDD à chaque bascule

---

## 13. Religion — pratique quotidienne

**Question** : Comment les 9 religions canoniques [[Lore/Religions/00 - Système Religieux]] se traduisent en comportement ?

- Prières quotidiennes (heures fixes selon religion) ?
- Jeûnes / fêtes religieuses ?
- Rituels collectifs (processions, offrandes) ?
- Refus de manipuler certains items (ex. Lex Petra refuse d'utiliser des objets temporels) ?

**Décision (2026-05-01) : Pattern par religion (RitualPattern canonique) intégré dans la routine quotidienne.**

Chaque religion possède un **RitualPattern** spécifique injecté en surcouche de la routine quotidienne du PNJ ([[Routine Quotidienne]] §Tâches), avec : (1) pratiques quotidiennes/hebdomadaires (prières, offrandes, méditations) injectées comme tâches dans la routine, (2) tabous comportementaux (règles dures court-circuit dans le BT), (3) rituels collectifs (sabbats, fêtes saisonnières) qui rassemblent les fidèles, (4) modulation MBTI Sensing = pratique rituelle stricte, Intuition = interprétation mystique. Cohérent avec [[Métiers/Mysticisme/Prêtre]] (RitualPattern = pratique laïque, Prêtre = pratique cléricale enrichie) et D-COSMO-3 (jamais imposé aux non-Liés ; Catena Fracta a son propre pattern de rejet).

### Implémentation §13

**Schéma religieux par PNJ** (struct `FNPCReligionState`) :

```yaml
religion:
  primary: "ignis_aeternum"      # 1 des 9 + 2 mineures + Catena Fracta + null (athée)
  secondary: "lex_petra"         # 0-1 (syncrétisme courant — cf 00-Système Religieux §Syncrétisme)
  faith_intensity: 60            # 0-100, intensité de la pratique
  ritual_pattern_id: "RP_IGNIS_AETERNUM_v1"  # référence Data Asset
```

**RitualPattern canoniques (1 Data Asset par religion)** :

| Religion | Pratiques quotidiennes | Pratiques hebdo / occasionnelles | Tabous comportementaux | Rituel collectif |
|----------|------------------------|-----------------------------------|------------------------|------------------|
| **Vael'Kurash** | Offrande matinale à l'esprit local (5 min, 06:30) | Visite au bois sacré 1×/sem | Refuse d'abattre arbre ancien sans rituel | Solstice/équinoxe collectif |
| **Ignis Aeternum** | Prière à l'aube face au feu (06:00), entretien flamme domestique | Veillée pleine lune (forge ouverte la nuit) | **Abstinence par temps de pluie** (sortie réduite) ; refus inhumation (crémation obligatoire) | Forge rituelle collective 1×/an |
| **Ordo Caelum** | Prière midi (Celestia, 5 min) + prière nuit (étoiles, 10 min) | Lecture astrale hebdo, jeûne lors des éclipses | Refuse décision majeure sans consulter horoscope | Procession aux observatoires (mensuelle) |
| **Noctari** | **Activité dominante nocturne** (inversion cycle) — sommeil journée, travail/social nuit | Méditation obscurité totale 1×/sem | Refuse d'allumer feux vifs ; conversation à voix basse en public | Veillée d'ombre (mensuelle) |
| **Rota Mundi** | Marquage rituel matinal de la date du Calendrier | **Repos sabbatique 1×/sem** (jour fixe, refus de travail) | Refus de stagnation prolongée (>3j sans bouger d'activité) | Fête saisonnière collective (4×/an) |
| **Via Ventus** | Offrande au vent matinale (depuis hauteur ou fenêtre) | **Voyage occasionnel obligatoire (1×/an min)** — pèlerinage ou caravane | Refus d'enracinement permanent (clergé toujours en mouvement) | Chant marin pré-traversée |
| **Lex Petra** | Serment matinal sur pierre (2 min) | Tribunal sacré hebdomadaire (présence obligatoire) | **Refuse de manipuler items temporels** (sabliers, mécanismes Tempora) ; refus mouvement non-nécessaire (PNJ très sédentaire) | Procession lapidaire (mensuelle) |
| **Somnium Vigil** | **Siestes longues** (2-3h après-midi), méditation onirique au coucher | Rituel onirique collectif 1×/sem (Herbes de Somnix) | Refus de se réveiller brutalement ; activité onirique privilégiée | Rêve partagé mensuel |
| **Foedus Animae** | Offrande quotidienne à l'autel familial (5 min, 19:00) | Repas partagé avec les morts 1×/mois | **Pacte avec compagnon vivant (animal/PNJ allié)** ; refus absolu profanation tombe | Veillée funéraire familiale |
| **Taciti** *(mineure)* | Vœu de silence partiel ou total | Méditation silence + obscurité hebdo | Refuse de parler ; expression par calligraphie/gestes | Méditation collective silencieuse |
| **Cantus Mundi** *(mineure)* | **L'Heure du Chant** matinale (improvisation collective) | Composition hebdo dédiée | Refuse de débuter activité importante sans chant rituel | Performance collective improvisée |
| **Catena Fracta** *(antagoniste)* | Rejet visible des pratiques dominantes | Réunions clandestines | **Refus de tout serment religieux**, hostilité aux clergés | Aucun rituel collectif déclaré |

**Injection dans la routine quotidienne** :
- Le `URoutineGenerator` lit `RitualPattern.daily_tasks[]` et insère les créneaux dans la routine au spawn
- Les pratiques quotidiennes ont **priorité forte** dans l'Utility AI Scorer (§1) : score base +30 vs tâche métier ordinaire à l'heure du rituel
- `faith_intensity` module : si < 30, rituels skippés (PNJ tiède) ; si > 70, pratiques surérogatoires ajoutées

**Tabous comportementaux (court-circuits BT)** :
- `BTDecorator_ReligiousTaboo` consulte la liste de tags interdits du RitualPattern
- Ex. Lex Petra avec `World.Item.TemporalArtifact` taggé → refus d'interagir, mood -20
- Ex. Ignis Aeternum sous `Weather.State.Rain` → réduit `outdoor_tasks` de 70%

**Compatibilité MBTI ↔ Religion (biais à la génération)** :

| Religion | MBTI privilégiés (×2 probabilité) | MBTI rares (×0.5 probabilité) |
|----------|------------------------------------|-------------------------------|
| Vael'Kurash | INFP, ISFP (sensibles, naturalistes) | ESTJ, ENTJ |
| Ignis Aeternum | ESTP, ENTJ (action, autorité) | INFP |
| Ordo Caelum | INTJ, INTP (analystes) | ESFP |
| Noctari | INTJ, INTP, ISTJ (réservés, secrets) | ESFP, ENFP |
| Rota Mundi | ISTJ, ESTJ (méthodiques) | ENTP |
| Via Ventus | ENFP, ESTP (mouvement, exploration) | ISTJ, ISFJ |
| Lex Petra | ESTJ, ISTJ (ordre, autorité) | ENFP, ESFP |
| Somnium Vigil | INFJ, INFP (mystiques) | ESTJ |
| Foedus Animae | ISFJ, INFJ (lien affectif fort) | ESTP |
| Cantus Mundi | ENFP, ISFP (créatifs) | ISTJ |
| Catena Fracta | ENTP, INTP (rebelles intellectuels) | ESFJ, ISFJ |

**Modulation Sensing/Intuition** :
- **S** (Sensation) : adhérence rituelle stricte (×1.3 sur ponctualité), interprétation littérale des textes
- **N** (Intuition) : ajout de pratiques mystiques personnelles (méditation libre), interprétation symbolique

**Cross-réf** : §14 Ères/Souffle module l'intensité des rituels (alignement religion ↔ Ère active +25% efficacité, désalignement -20% — cf [[Métiers/Mysticisme/Prêtre]] §9).

---

## 14. Réaction aux Ères et au Souffle

**Question** : Quand l'ère change, le PNJ change-t-il son comportement ?

- (a) Modulation paramétrique : la routine reste, mais des paramètres changent (heures de réveil, mood, paroles)
- (b) Templates alternatifs par ère : un PNJ a 2-3 versions de comportement, switch à chaque Souffle

**Branchement** : sur [[Le Souffle]] et [[Les Ères]].

**Décision (2026-05-01) : (a) Modulation paramétrique pour ~95% des PNJ + (b) templates alternatifs majeurs pour ~5% PNJ-clés religieux/oraculaires/cosmiques.**

L'option (a) seule sous-utilise la richesse cosmologique : un Prêtre de Noctari devrait *visiblement* changer de comportement quand l'Ère de l'Ombre Longue arrive (rituels nocturnes, processions, prophéties). L'option (b) seule explose la charge d'authoring (chaque PNJ × 11+ archétypes d'Ères = milliers de templates). Le **mix 95/5** capitalise sur le **NPCGenerator** (Architecture Data-Driven §6) qui module déjà tenue/dialogues/posture par mood d'Ère, et réserve les **templates alternatifs** aux PNJ dont la fonction narrative *est* cosmique (Oracles, Prêtres senior, Bardes-chroniqueurs, Astronomes). Cohérent avec la **promesse Souffle = compression et coloration** ([[Le Souffle]]) : le monde change visiblement, mais le boulanger reste boulanger — il fait juste un pain noirci à l'Ère du Voile, parle plus bas, salue différemment. Cohérent aussi avec le payload léger 2-6 KB ([[Architecture Data-Driven]]) : le `EraModulationProfile` est un Data Asset déjà installé client-side ; seul l'`era_id` est broadcast.

### Implémentation §14

**Couche A — Modulation paramétrique (95% des PNJ)** :

`EraModulationProfile` (UPrimaryDataAsset, par archétype PNJ) déclare comment chaque archétype réagit aux 6 dimensions d'Ère :

```yaml
DA_EraModProfile_Forgeron:
  base_archetype: "blacksmith"
  modulations_per_era_dimension:
    dominant_force:
      noctis:
        wake_hour_offset: +1               # se lève 1h plus tard
        mood_baseline_delta: { fear: +15, joy: -10 }
        ambient_lines_pool: "AmbientLines_Forgeron_Noctis"
        outfit_tint: "#1A0830"
        forge_rituals: "noctari_purification_at_dawn"
      eldoria:
        wake_hour_offset: -1               # se lève plus tôt
        mood_baseline_delta: { joy: +20, fear: -15 }
        ambient_lines_pool: "AmbientLines_Forgeron_Eldoria"
        outfit_tint: "#FFEB99"
      tempora:
        utility_modifier: { Routine.Continue: -10, Combat.Hide: +15 }   # nervosité
        ambient_lines_pool: "AmbientLines_Forgeron_Tempora"
    state:
      degenerescence:
        prices_modifier: +10%             # tout coûte plus cher
        recipe_pool: "Recipes_Era_Degenerescence"
      floraison:
        prices_modifier: -5%
        gifts_chance: +10%                # plus généreux
    mood_social:
      effroi:
        ambient_dialog_frequency: -30%
        forge_open_hours: "10-16"          # raccourci
      ferveur:
        ambient_dialog_frequency: +30%
        forge_open_hours: "06-20"          # rallongé
    tension_cosmique:
      critique:
        threat_threshold_override: 30      # plus prompt à fuir/combattre (§8 P3)
```

**Application runtime** : à chaque broadcast Souffle, le `EraGenerator` envoie les nouveaux paramètres aux clients/serveur. Le `UHWNPCEraModulationSubsystem` lit le profil de chaque PNJ persistant et recalcule :
- `mood_baseline` (§4) : applique les deltas
- `routine.current_routine_template_id` : substitution si l'override prescrit (ex. boulanger en mode "ferveur" rallonge sa journée)
- `ambient_lines_pool` (§3 dialogues) : nouveau pool actif
- `outfit_id` + tint : NPC Generator regénère (cohérent §6 Architecture Data-Driven)
- `prices_modifier` : appliqué directement aux transactions
- `utility_modifier` : injecté dans BTService_UtilityScorer (§1)
- `threat_threshold_override` : remplace le 50 par défaut (§2)

**Pas de réécriture du BT** : le `BT_NPCBase` est inchangé. Seules les *valeurs* lues par le BT changent.

**Couche B — Templates alternatifs (5% PNJ-clés)** :

Pour les PNJ-clés cosmologiques (Prêtres, Oracles, Bardes-chroniqueurs, Astronomes officiels), un **set de templates alternatifs** est authored :

```yaml
NPC_Authored_PrêtreNoctari_Astravia:
  base_template: "priest_senior"
  era_alternative_templates:
    era_archetype_ombre_longue:           # cf [[Les Ères]] catalogue
      template_id: "PrêtreNoctari_OmbreLongue_Active"   # rituels nocturnes, processions
      routine_replacement: "Routine_Priest_Nocturnal"
      authored_dialogues: [ "OmbreLongue_Sermon_01", ... ]
      ambient_aura: "Spectral_Calm"
    era_archetype_reve_lumineux:
      template_id: "PrêtreNoctari_RêveLumineux_Defensive"  # prêcheur défensif (Eldoria contredit Noctis)
      routine_replacement: "Routine_Priest_Combat_Doctrinal"
      authored_dialogues: [ "RêveLumineux_Réfutation_01", ... ]
    default:
      # si aucune correspondance, retombe sur modulation paramétrique
      use_paramétrique: true
```

**Granularité** : 2-4 templates alternatifs par PNJ-clé, pas plus (sinon coût d'authoring explose). Si l'Ère active n'a pas de template explicite, on retombe sur modulation paramétrique.

**Critères d'éligibilité aux templates alternatifs** :
- PNJ persistant nommé (§9) ET
- Rôle religieux senior (Prêtre, Oracle, Hierarch) OU astronome officiel d'une cour OU barde-chroniqueur de cour
- Pas plus de **~250 PNJ-clés total monde** (5% de 5 000 persistants), répartis 1-3 par capitale

**Branchement Souffle** :
- Au déclenchement Souffle, `EraGenerator.RollNewEra()` produit le `era_config`
- `UHWNPCEraModulationSubsystem::OnSouffleBroadcast(era_config)` :
  1. Itère sur tous les PNJ persistants (en BDD, pas seulement ceux en RAM)
  2. Pour chaque : lit `era_alternative_templates` → si match, charge le template alternatif et réécrit `era_state.alternative_template_active`
  3. Sinon : applique modulation paramétrique
  4. Transitions visuelles : décrément/incrément progressif sur 1 semaine (cohérent rouille post-Souffle [[Le Souffle]] §Rouille)
- L'**Accord** PNJ (analogue de l'Accord joueur) n'existe pas — les PNJ vivent les Ères mais ne sont pas mesurés comme les joueurs.

**Cohérence avec religions §13** (à venir) : le `EraModulationProfile` peut être enrichi par des modulateurs religieux. Un Prêtre Foedus Animae a une réaction différente d'un Prêtre Lex Petra à l'Ère de Tempora, même si tous deux sont de la 5% authored.

**Persistance** : le `era_state` du PNJ (§10) stocke quel template/profil est actif. Reload après reboot serveur : on relit l'ère active globale + le template stocké. Pas de recalcul lourd.

---

## 15. Quêtes — comment un PNJ devient donneur de quête

**Question** : Quel est le pipeline pour qu'un PNJ propose une quête ?

| Option | Note |
|--------|------|
| (a) Authored : scriptwriter assigne explicitement les quêtes au PNJ | Linéaire, qualité haute |
| (b) Procédural : Quest Generator [[Architecture Data-Driven]] génère des quêtes selon contexte (ère, pays, état du monde, personnalité MBTI) | Émergent, qualité variable |
| (c) Hybride : quêtes principales authored + side-quests procédurales | Recommandation |

**Décision (2026-05-01) : (c) Hybride — Main quests authored assignées explicitement aux PNJ nommés (1-3 par PNJ nommé, ~50-100 main quests par grand pays) ; side quests procédurales générées par Quest Generator sur tous les PNJ persistants éligibles (incluant la "famille de génération") ; PNJ transients ne donnent pas de quêtes.**

(a) seul ne scale pas (13 pays × 50+ villes × ~10 PNJ donneurs potentiels = 6 500 quêtes à écrire, impossible). (b) seul tue la voix d'auteur sur les arcs principaux et produit des quêtes plates "récupère X dans la zone Y". L'hybride (c) **mappe directement** sur la décision §17 (PNJ nommés authored / persistants génération / transients pool) et sur le `QuestGenerator` déjà documenté ([[Architecture Data-Driven]] §5) : 40-80 templates × `npc_giver` × `era_mood` × `era_state` × pool d'objectifs disponibles. Les **PNJ MBTI Feeling** (F) sont préférentiellement donneurs de quêtes émotionnelles ("Aide ma fille perdue dans la forêt"), les **MBTI Thinking** (T) de quêtes logiques/transactionnelles ("Livre ce courrier en échange de 10 Éclats"). La cohérence avec [[L'Accord]] est forte : les quêtes générées par l'ère contribuent directement à l'Accord du joueur.

### Implémentation §15

**Volumétrie cible** :

| Type | Volume cible | Producteur | Stockage |
|------|--------------|------------|----------|
| **Main quests authored** | ~50-100 par grand pays × 13 pays = ~650-1 300 | Scriptwriter humain | `Content/Quests/Authored/...` (Data Asset) |
| **Side quests procédurales** | Infini (générées à la demande) | `UQuestGeneratorSubsystem` | `quests_active` (BDD), purgées après complétion ou expiration |
| **Quêtes ère-thématiques** | ~5-15 par Ère (génération à chaque Souffle) | `QuestGenerator` × `EraGenerator` | `Content/Quests/Era/<archetype>/...` |

**Catégorisation par type de PNJ** :

| Type PNJ (cf §9) | Donne main ? | Donne side ? | Volume max simultané |
|------------------|--------------|--------------|-----------------------|
| **Nommé authored** | ✅ Oui (1-3 main authored par PNJ) | ✅ Oui (Quest Generator) | 1 main + 2-3 side actives |
| **Famille de génération** persistant | ❌ Non | ✅ Oui (Quest Generator) | 0-2 side actives |
| **Foule transient** | ❌ Non | ❌ Non | 0 |

**Pipeline Main Quest Authored** :

```yaml
DA_MainQuest_AltarRevenant:
  quest_id: "altar_revenant_01"
  giver_npc_id: "altram_capital_priest_arnos"      # PNJ nommé persistant spécifique
  prerequisites:
    player_recognition_min_with_lex_petra: 30
    era_active_state_excludes: ["floraison"]       # absurde dans une Ère de floraison
  authored_dialogue: "Quest_AltarRevenant_Dialogue.md"
  objectives:
    - find_relic_at_location: "altram_old_temple_ruin"
    - return_to_giver
  rewards:
    eclats: 50
    accord_contribution: 5%                         # contribue à L'Accord
    reconnaissance_lex_petra: +20
    item: "Reliquaire_Mineur"
  failure_consequences:
    reconnaissance_lex_petra: -10
```

**Pipeline Side Quest procédurale (QuestGenerator)** :

Cohérent avec [[Architecture Data-Driven]] §5 ; on étend les inputs :

```yaml
QuestGenerator.Roll(npc_giver):
  inputs:
    npc_id: "altram_village_inn_keeper_marie"     # PNJ persistant
    npc_archetype: "innkeeper"
    npc_mbti: "ESFJ"                              # F dominant → quête émotionnelle
    npc_faction_primary: "rota_mundi"
    npc_recent_memory: [ "PlayerHelpedNPC_yesterday", ... ]   # §3 mémoire
    era_active: "ombre_longue"
    era_mood: "Effroi"
    region: "Altram_North"
    available_template_pool: 40                    # filtré par mood + faction + MBTI

  filter_rules:
    if mbti contains "F": prioritize templates [ T_FindLost, T_HelpFamily, T_RescueAnimal ]
    if mbti contains "T": prioritize templates [ T_DeliverGoods, T_RetrieveSomething, T_Investigate ]
    if mood == "Effroi": prioritize templates [ T_BanishShadow, T_ProtectFromCreature ]
    if faction == "rota_mundi": prioritize templates [ T_HelpPilgrim, T_RestoreCycle ]
    if recent_memory has "PlayerHelpedNPC": +20% rare reward chance

  output:
    template: "T_FindLost"
    title: "La lanterne de mon frère"             # généré par QuestGenerator NPC voice profile
    objective: récupérer "Lantern_Brass" dans "Altram_OldRuins_East"
    reward:
      eclats: 4
      recipe_chance: 0.10 ("Recipe_LightOilCommon")
      reconnaissance_local: +5
      accord_contribution: 1%
    flavor_lines: 3 lignes (modulées par MBTI ESFJ + mood Effroi)
    expiration: 7 jours gameplay
```

**Modulation MBTI sur le donneur** :

| MBTI dominant | Templates favorisés | Tonalité dialogue |
|---------------|---------------------|--------------------|
| **F + N** (NFP/NFJ) | T_FindLost, T_RestoreLove, T_SaveAnimal, T_PreserveBeauty | Lyrique, empathique, indirecte |
| **F + S** (SFP/SFJ) | T_HelpFamily, T_ProtectChild, T_BringFood, T_TendInjured | Chaleureuse, concrète, maternelle |
| **T + N** (NTP/NTJ) | T_Investigate, T_SolvePuzzle, T_DiscoverTruth, T_StrategicMission | Analytique, longue, orientée logique |
| **T + S** (STP/STJ) | T_DeliverGoods, T_RetrieveSomething, T_CollectMaterials, T_Patrol | Factuelle, brève, transactionnelle |

**Modulation par Ère active** :
- Ère **Effroi** : +30% quêtes "défense/exorcisme/banissement"
- Ère **Sérénité** : +30% quêtes "récolte/livraison/mariage"
- Ère **Méfiance** : +30% quêtes "investigation/espionnage/pacte"
- Ère **Ferveur** : +30% quêtes "pèlerinage/rituel/serment"
- Ère **Curiosité** : +30% quêtes "exploration/découverte/lecture"

**Modulation par Religion (§13 à venir)** :
- Donneur Lex Petra → quêtes "rejeter le temporel/préserver l'immuable"
- Donneur Foedus Animae → quêtes "scellement de pacte/rachat de promesse"
- Donneur Noctari → quêtes "contemplation des ombres/initiation aux mystères"

**Branchement avec impacts narratifs (§9, §17)** :
- Mort d'un PNJ donneur de main quest non encore complétée : quête échoue, déclenche side quest "Découvrir ce qu'il voulait" disponible chez ses proches (relations §5)
- Mort d'un donneur de side quest pendant la quête : quête disponible chez son héritier après 7 jours (§9 succession)
- Joueur sauve un PNJ : `Memory.Public.PlayerSavedNPC` Weight 100 → ce PNJ devient donneur prioritaire pour main quest "rare" si éligible

**Persistance** : `quests_given.authored` et `quests_given.generated_active` dans `npc_persisted` (§10). Statut côté joueur dans une table `player_quests` séparée (cf [[Quest System]]).

**Cohérence avec [[Le Souffle]]** : au Souffle, **les quêtes en cours ne sont pas wipées**. Une quête de l'Ère précédente reste réalisable jusqu'à expiration normale (typiquement 7-14 jours). Cohérent avec **Souffle = compression pas reset** : le savoir et les engagements survivent.

---

## 16. Combat AI — architecture distincte ?

**Question** : L'IA de combat est-elle un BT distinct ou une branche du BT principal ?

- (a) BT distinct dédié au combat, switch quand `in_combat == true`
- (b) Branche "combat" dans le BT principal du PNJ
- (c) Hybride : BT principal pour décider d'engager / fuir, BT combat pour le combat lui-même

**Décision (2026-05-01) : (c) Hybride — BT principal `BT_NPCBase` (§1) détecte engagement et bascule sur sous-arbre Combat dédié (`BT_NPCCombat`, dérivé de `BT_EnemyBase` existant). Retour BT principal après statut "5s sans dégât" (cohérent [[Combat]]).**

(a) BT entièrement distinct = duplication de logique perception/mémoire/mood (qu'on relit déjà en non-combat), (b) tout dans BT principal = arbre énorme et illisible mélangeant routine et combat. L'hybride (c) capitalise **directement** sur l'asset `BT_EnemyBase` qui contient déjà toute la logique de combat (`BTTask_FocusTarget`, `BTTask_Abilities`(`GA_Ai_ReadyToFight`/`GA_TestMobAttack`), `BTTask_MoveTo` cible, FlowAbortMode::Both, services `BTService_CheckHasTag`/`CheckDistanceToHome`). On le **renomme `BT_NPCCombat`** comme sous-arbre référencé par décorateur depuis le racine `BT_NPCBase`. Le passage combat→post-combat est piloté par le timer 5s déjà spec dans [[Combat]] § "Sortie de combat". Cohérent avec le `EvaluateCombatSituation()` C++ qui sert de fallback si le BT est null. Le `BBKey_ThreatLevel` (§2) déclenche l'entrée combat.

### Implémentation §16

**Architecture deux étages** :

```
BT_NPCBase (racine, §1)
├─ Selector
│   ├─ [Décorateur: ThreatLevel >= 50 OU IsInCombat] → RunBehaviorTree(BT_NPCCombat)
│   ├─ [Déco: IsRunningHome] → Sequence retour maison (existant)
│   ├─ [Déco: HeardNoiseLocation] → Investigation bruit (existant)
│   ├─ [Déco: ModeSocial actif] → Branche sociale
│   ├─ [Déco: RoutineActive] → Branche routine
│   └─ Patrol/Idle (existant)
│
└─ Service: BTService_UtilityScorer (1.0s tick, §1)
└─ Service: BTService_CombatExitTimer (0.5s tick, vérifie 5s sans dégât)


BT_NPCCombat (dérive de BT_EnemyBase existant)
├─ Selector "Survie d'abord"
│   ├─ [Déco: ShouldRetreat OU Peur >= 80] → BTTask_Retreat (existant) → BTTask_Hide (nouveau)
│   ├─ [Déco: HP < 10% && pas de fuite possible] → BTTask_Surrender (nouveau)
│   └─ Sequence "Combat actif"
│       ├─ [Déco: !IsReadyToFight] → BTTask_Abilities(GA_Ai_ReadyToFight)
│       ├─ BTTask_FocusTarget(Target)
│       ├─ Selector "Tactique"
│       │   ├─ [Déco: Distance > 800 && peut tirer] → BTTask_Abilities(GA_EntityFireball ou ranged)
│       │   ├─ [Déco: Distance > 200] → BTTask_MoveTo(Target)
│       │   ├─ [Déco: TargetIsAttacking] → BTTask_Dodge ou BTTask_Block
│       │   └─ BTTask_Abilities(GA_TestMobAttack ou attaque mêlée)
│       └─ BTTask_Wait(0.3-0.8s, varie selon Vivacité)
```

**Bascule entrée Combat** :
- Trigger 1 : `BBKey_ThreatLevel >= 50` (§2 perception, écrit par `OnPerceptionUpdated` ou couche zones)
- Trigger 2 : Reçoit dégâts (`AHWGASCharacter::HandleDamage` → set `BBKey_IsInCombat = true` + `BBKey_TargetActor = instigateur`)
- Trigger 3 : Allié à proximité bascule combat (§5 propagation)
- Effet : décorateur sur `BT_NPCCombat` devient true → racine sélectionne ce sous-arbre
- Concrètement : `RunBehaviorTree(BT_NPCCombat)` via tâche `BTTask_RunBehavior` (UE5 standard) — préserve le Blackboard partagé `BB_NPCBase`

**Bascule sortie Combat (5s sans dégât, cohérent [[Combat]])** :
- Nouveau service `BTService_CombatExitTimer` :
  - Tick 0.5s sur racine `BT_NPCBase`
  - Reset timer à chaque dégât subi/donné (event ASC) ou à chaque update `BBKey_TargetActor`
  - Si `LastDamageTime + 5s < Now` && `BBKey_IsInCombat == true` :
    - Set `BBKey_IsInCombat = false`
    - Clear `BBKey_TargetActor`
    - Reset `BBKey_ThreatLevel = 0` puis recalcul perception
    - Décorateur de `BT_NPCCombat` redevient false → fallback racine
    - Optionnel : trigger `Memory.Public.CombatEnded` (§3)

**Réutilisation des assets existants** :
- `BT_EnemyBase` reste inchangé pour les créatures hostiles "stupides" (loups, gobelins) — son comportement actuel correspond déjà à un sous-arbre combat minimal
- Pour les PNJ humains avec routine, on **dérive un nouveau** `BT_NPCCombat` qui ajoute esquive/parade/fuite/reddition au-dessus de `BT_EnemyBase`
- Tous les `BTTask_Abilities`, `BTService_CheckHasTag`, `BTTask_FocusTarget` existants sont réutilisés tels quels
- Le `BB_EnemyBase` reste le Blackboard parent ; `BB_NPCBase` (nouveau, §1) en hérite et ajoute clés routine/social/mood

**Ciblage / parade / esquive (paramètres canoniques)** :
- **Parade fenêtre** : `BTTask_Block` détecte telegraph attaque ennemi (animation notify `Combat.Telegraph.Heavy`) ; PNJ lance `Combat.Block` si Vigueur > 50 OU MBTI **J** (rigidité défensive)
- **Esquive timing** : `BTTask_Dodge` lance esquive si Vivacité > 60 ET telegraph détecté ; IFrames 0.4s ([[Combat]])
- **Parade parfaite IA** : très rare (proba `Vivacité * 0.5%` par telegraph, capped 30%) — récompense les builds de PNJ rapides type ISFP/ESTP
- **Stamina checks** : refuse esquive/parade si Stamina < 25 pts (cohérent coûts [[Combat]])
- **Choix attaque légère vs lourde** : Utility intra-combat — légère si Vivacité > Vigueur, lourde si Vigueur > Vivacité ET ouverture détectée

**Fallback C++ (`EvaluateCombatSituation()`)** : reste actif si `BehaviorTreeAsset == null`. **Patch nécessaire** pour cohérence : remplacer `Health < 30` (HP absolu) par `Health < MaxHealth * 0.20` ([[AI Controller]] §incohérence).

**Coût CPU** : sous-arbre Combat = ~0.4 ms/PNJ L0 (vs 0.3 ms hors combat) — surcoût acceptable, généralement <10 PNJ en combat actif simultané par zone.

---

## 17. Authoring model — ratio authored vs généré

**Question** : Combien d'effort d'authoring par village ?

- 100% authored : chaque PNJ écrit à la main → qualité maximale, scaling impossible (13 pays × 50+ villes × 50 PNJ = 30 000 PNJ)
- 100% généré : NPC Generator paramétré → scaling immédiat, qualité variable
- **Hybride** : ~5-10 PNJ "nommés" authored par ville majeure (notables, donneurs de quête, signature) + reste généré paramétriquement

**Recommandation initiale** : hybride — 5-10 PNJ authored par ville majeure, jusqu'à 100% généré dans villages mineurs.

**Décision (2026-05-01) : Stratégie hybride — 5-50 PNJ nommés authored par ville selon classe, reste 100% généré.**

Authoring concentré sur **les PNJ structurants narratifs** (notables, donneurs de quête, figures de chronique, autorités politiques/religieuses), généré pour la masse vivante. Volume cible total **~3 000-5 000 PNJ nommés** sur l'ensemble du monde, en cohérence avec l'estimation Pré-Alpha de [[Registre des Décisions]] §Phase 2 archétypes (3 000-5 000 fichiers). La frontière authored/généré épouse la frontière statique/dynamique des factions (§12) et offre une heuristique unique pour décider de la profondeur de mémoire individuelle (§3) et de la réputation individuelle (§7) — un PNJ nommé bénéficie de **toutes les couches profondes** ; un PNJ générique bénéficie des couches superficielles. Pipeline : authoring tool dédié à designer Phase 4 (cf [[Registre des Décisions]] §Approche en 4 phases).

### Implémentation §17

**Classification des localités et budget authoring** :

| Classe localité | Volume / monde | PNJ totaux / localité | PNJ nommés authored | PNJ génériques générés | Exemples |
|-----------------|---------------|------------------------|---------------------|------------------------|----------|
| **Capitale (continent)** | 5 (1 par continent majeur) | 200-500 | **30-50** | 150-450 | Ergonia (capitale Altram), Ignaria (Pyrtara) |
| **Capitale (nationale)** | ~13 (1 par pays) | 100-300 | **15-25** | 80-275 | Cendara, Astravia, Vytharia |
| **Ville secondaire** | ~50 par continent (~250 monde) | 50-150 | **10-15** | 35-135 | Villes commerciales, ports, cités d'étude |
| **Bourg / petite ville** | ~500 monde | 30-80 | **3-7** | 25-75 | Chefs-lieux ruraux, étapes de caravane |
| **Village** | ~2000 monde | 15-40 | **0-3** | 15-37 | Hameaux, villages frontière |
| **Hameau / camp / ruine** | ~5000 monde | 0-15 | 0 | 0-15 | Tout généré, possiblement vide |

**Volume cible cumulé** : ~3 250 PNJ nommés authored + ~50 000-100 000 PNJ générés actifs (LOD-dépendant).

**Frontmatter PNJ nommé (authored)** — étend le frontmatter de base :

```yaml
---
type: npc
authored: true                         # marqueur authored
npc_class: notable                     # notable | donneur_quete | autorite | figure_chronique | signature
nom: "Hierona Cendara"
pays: "Pyrtara"
ville: "Cendara"
metier: "pretre"
religion_primaire: "ignis_aeternum"
faction_primaire: "ignis_aeternum"
faction_secondaire: "pyrtara_kingdom"
mbti: "ENTJ"
mbti_strength: 85
relations_authored:
  family: ["..."]
  rivals: ["..."]
quetes_associees: [...]
dialogues_signature: [...]
era_modulation: true                   # variantes selon Ère active
---
```

**Frontmatter PNJ générique** (généré, beaucoup plus léger) :

```yaml
---
type: npc
authored: false
npc_id: "altram_ergonia_npc_00427"     # ID stable
village_id: "altram_ergonia"
metier_id: "forgeron"                  # rôle dans la ville
mbti: "ISTJ"                           # tirage à la génération
religion_primaire: "lex_petra"
faction_primaire: "lex_petra"
faction_secondaire: "altram_kingdom"
seed: 7493847                          # reproductibilité
---
```

**Critères de promotion en PNJ nommé** (au moment de l'authoring d'un village) :
1. **Rôle de pouvoir** : maire, capitaine de garde, archiviste, hiérarque religieux local
2. **Rôle économique clé** : Maître forgeron du bourg, aubergiste principal, marchand-relai inter-régional
3. **Rôle narratif** : témoin d'événement historique (lié à [[Histoire d'Hybelior]]), porteur d'une quête principale, signature [[Métiers]]
4. **Rôle dramatique** : antagoniste local, victime potentielle d'une quête, oracle/Prêtre majeur
5. **Heuristique villages** : maire (toujours), aubergiste (si présent), forgeron-Maître (si présent), 0-1 figure narrative selon importance

**Pipeline authoring (Phase 4)** :
- **Outil dédié** : éditeur visuel (UE5 plugin ou external tool) qui produit des fichiers `.md` frontmatter + des Data Assets liés (DialogueTrees, QuestTables)
- **Templates de classes** : 5 classes (notable, donneur_quete, autorite, figure_chronique, signature) avec champs requis
- **Validation** : un linter Python vérifie que les `relations_authored` pointent vers des PNJ existants ; que `mbti` est valide ; que `religion_primaire` ∈ liste canonique
- **Génération overlay** : le NPC Village Generator skip les PNJ nommés du village et complète seulement les rôles non couverts

**Coût estimé d'authoring** :
- 1 PNJ nommé "notable simple" : ~30 min (frontmatter + 3-5 dialogues + 1 quête mineure)
- 1 PNJ nommé "signature majeure" (ex. Hierona Cendara) : ~4-8h (lore profond, 10-20 dialogues, arc narratif)
- Volume Pré-Alpha 3 250 PNJ × moyenne ~1h = **3 250h de travail authoring** → étalé sur Phase 4 (équipes locales par pays/biome).

**Branchement runtime** :
- `UNPCManager::IsAuthored(npc_id)` → routing vers loader Data Asset authored ou générateur procédural
- Mémoire (§3), Réputation individuelle (§7), Faction dynamique (§12), Mort permanente (§18 à venir) → activées **uniquement** si `authored = true`

---

## 18. Lifecycle — vieillissement, mort, naissance

**Question** : Les PNJ vieillissent-ils ? Meurent-ils ? Naissent-ils ?

| Option | Implication |
|--------|-------------|
| (a) Pas de lifecycle (PNJ statiques) | Simple, faux MMO vivant |
| (b) Mort permanente (PNJ peut être tué et ne revient pas) | Risque d'érosion population, écho narratif fort |
| (c) Mort + remplacement (un nouveau PNJ paraît) | Compromis pragmatique |
| (d) Cycle générationnel complet (vieillissement, naissance d'enfants) | Très riche, très coûteux — Dwarf Fortress-tier |

**Considération** : durée d'une Partie = 1-2 ans gameplay. Cycle générationnel sur cette durée = peu réaliste. Mort + remplacement plus simple.

**Recommandation initiale** : (c) pour PNJ génériques, (b) pour PNJ nommés (mort permanente narrative).

**Décision (2026-05-01) : Mix (b) + (c) selon catégorie §9. Pas de vieillissement procédural. Pas de naissance simulée.**

- **Transients (foule)** : (c) Mort + remplacement instantané par pool
- **Persistants "famille de génération"** : (c) Mort + successeur narratif après ~7 jours gameplay
- **Persistants nommés authored** : (b) Mort permanente — entrée chronique [[Lore]] + impact narratif (peut déclencher side quests "L'héritier disparu" §15)
- **Pas de vieillissement procédural** : (d) explicitement écarté — Dwarf Fortress-tier hors scope, et incohérent avec [[La Partie]] continue (le joueur ne joue pas 50 ans réels, le monde traverse des Ères mais les PNJ ne vieillissent pas en temps réel)
- **Pas de naissance simulée** : pas de moteur de génération d'enfants, pas de croissance d'âge. Population renouvelée par succession narrative + spawn pool

L'option (d) cycle générationnel a été explicitement écartée : sur une Partie de 1-2 ans gameplay (cf [[La Partie]]), aucun enfant n'a le temps de devenir adulte de façon crédible, et la simulation démographique distrait du cœur de jeu (Souffle/Accord/Ères). Les PNJ ont un **âge apparent** cosmétique (`age_apparent` dans `npc_persisted` §10) qui sert au mesh/voice mais ne s'incrémente pas. La cohérence avec [[Le Souffle]] (Souffle = compression pas reset) impose : la mort d'un PNJ persiste à travers les Ères, le successeur survient indépendamment du Souffle.

### Implémentation §18

**Cycle de vie par catégorie** :

| Catégorie | Naissance | Mort | Vieillissement | Successeur |
|-----------|-----------|------|----------------|------------|
| **Transient foule** | Spawn pool (NPCGen + Pool Manager) | Instant | ❌ | Replacement instantané (autre archétype rerollé) |
| **Persistant "famille de génération"** | Spawn initial au load zone OU successeur narratif d'un autre persistant | Marquée `is_alive = false` (BDD) | ❌ (age_apparent figé) | Apprenti / fils / voisin promu après ~7 jours (`NPCSuccessionService`) |
| **Persistant nommé authored** | Authored au seed du monde OU introduit par event scripté | Permanente, BDD `is_alive = false` immuable | ❌ | ❌ Pas de succession automatique. Side quests narratives possibles |

**Succession narrative (`NPCSuccessionService`)** :

Pour un PNJ persistant non-nommé qui meurt :

```yaml
NPCSuccessionService::OnNPCDied(npc_id):
  1. Marker persistant : npc_persisted.is_alive = false, death_timestamp = now
  2. Identifier les candidats successeurs :
     - hierarchy_subordinates (apprentis) → priorité 1
     - relations.family[type=child] → priorité 2
     - relations.family[type=spouse] → priorité 3
     - voisin de même métier dans la zone → priorité 4
     - sinon : NPCGenerator rerolle un nouvel archétype identique → priorité 5
  3. Schedule SuccessionTimer = 7 jours gameplay
  4. À l'expiration :
     - Promouvoir le candidat sélectionné OU spawn nouveau persistant
     - Hériter : zone_id, archetype, position (home), inventory.shop_items partial (50%)
     - Reroll : MBTI (mais biais hérédité parent ±20% sur dichotomies similaires si famille), age_apparent (jeune)
     - Conserver : relations restantes du défunt (hiérarchie, alliés)
     - Notifier mémoire de village (§3) : Memory.Public.SuccessionNarrated → rumeur
     - Optionnel : si quête main authored était assignée au défunt, déclencher side quest "Le successeur de X" (§15)
```

**Mort permanente (PNJ nommé)** :

```yaml
OnNamedNPCDied(npc_id):
  1. npc_persisted.is_alive = false, death_timestamp = now (immuable, pas de successeur)
  2. Inscription chronique : ajouter entrée [[Lore]] (table lore_entries, type "obituary")
     - Inclut : nom, accomplissements, circonstances de mort, joueur impliqué (si applicable)
  3. Renom : si joueur tueur, +/-X selon karma et alignement faction
  4. Memory.Public.NamedNPCDied : weight 100, propagation tout le pays/continent
  5. Quêtes en cours du défunt : abandonnées + side quest "Découvrir ce qu'il voulait" générée chez les proches (relations §5)
  6. Si role critique (chef de faction, hierarch religieux) : déclenchement event narratif majeur (élection, schisme, vacance)
  7. Pas de successeur automatique — c'est aux scriptwriters d'introduire un successeur narratif via patch/event scripté futur
```

**Pas de vieillissement procédural — règles** :
- `age_apparent` : champ cosmétique, fixé à la création, ne change PAS
- Pas de mort par "vieillesse" — un PNJ persistant ne meurt que par mécanique de jeu (combat, événement, mort scriptée)
- Le mesh/voice/dialogue restent cohérents avec l'âge apparent indéfiniment
- Cohérent avec [[La Partie]] : le monde évolue par Ères, pas par horloge biologique

**Pas de naissance procédurale — règles** :
- Pas de simulation grossesse/croissance/maturation
- Pas de "chambre d'enfant" dans les maisons PNJ
- Si la population baisse trop dans une zone (mort en chaîne, par exemple raid joueur), le `UHWPopulationSubsystem` (§9) **spawn de nouveaux persistants** depuis archétypes (justifiés narrativement comme "voyageurs venus s'installer", pas comme "nouveau-nés")

**Cas particulier : mort de masse (raid joueur, événement catastrophique)** :
- Si > 30% des persistants d'une localité meurent en < 24h gameplay → trigger `Population.Catastrophe` (tag broadcast)
- Pas de remplacement automatique pendant 14 jours (deuil)
- Après 14j : succession + spawn de "nouveaux arrivants" (5-10 par jour) jusqu'à recouvrement densité cible (§9)
- Trace persistante (TraceGen [[Architecture Data-Driven]] §9) : monument funéraire ou ruine commémorative
- Chronique [[Lore]] : entrée "événement" automatique

**Cohérence Souffle/Accord/Ères** :
- Une mort PNJ traverse les Ères — `is_alive = false` n'est jamais reset par Souffle
- Le successeur peut spawner avant ou après un Souffle indifféremment (timer 7 jours absolu)
- Si le défunt avait `era_alternative_templates` (§14), le successeur **n'hérite PAS** de ces templates — il aura ses propres modulations paramétriques par défaut, sauf si nommé authored remplaçant
- L'**impact narratif d'une mort nommée** (event majeur) peut accélérer ou retarder un Souffle (cf [[Le Souffle]] §Cadence : "actions des joueurs modulent")

**Persistance** (§10) : tous les changements de lifecycle sont écrits dans `npc_persisted` immédiatement (mort = transaction critique).

**Audit chronique** : la table `lore_entries` permet à n'importe quel joueur (Bibliothécaire, Chroniqueur) de consulter l'histoire des PNJ disparus. Cohérent avec [[Traces des Ères]] règle 90/10 (10% des morts produisent traces durables visibles à long terme).

---

## 19. NPC ↔ NPC — interactions autonomes

**Question** : Les PNJ interagissent-ils entre eux quand le joueur n'est pas là ?

- (a) Non — les PNJ sont des piliers, animations préprogrammées
- (b) Oui, scripté : à certaines heures, certains PNJ jouent une scène ensemble (boulanger livre auberge à 06:30)
- (c) Oui, émergent : Utility AI permet aux PNJ de choisir d'interagir entre eux selon leurs MBTI / relations

**Décision (2026-05-01) : (b) Scripté pour scènes clés + (c) émergence légère via Utility AI pour PNJ nommés.**

Combinaison **(b)** scènes scriptées pour la vie quotidienne du village (livraisons, salutations rituelles, prières collectives) qui donne **prévisibilité et lisibilité** au monde, et **(c)** émergence légère pour les PNJ nommés MBTI-compatibles qui se croisent (animation de discussion 30s, impact relationnel mineur). On **rejette explicitement la simulation profonde Dwarf-Fortress-tier** : sur 30 000+ PNJ avec LOD AI 4 niveaux (§11), une simulation sociale émergente complète serait prohibitive (>100 ms CPU/frame, intractable). La frontière scripté/émergent se branche sur les LOD : scripté à tous niveaux (déclenché par horloge globale), émergent uniquement L0 (joueur présent à <45m, donc PNJ pleinement simulés).

### Implémentation §19

**Couche A — Scènes scriptées (toutes échelles, tous LOD)** :

Définies en Data Assets `DA_VillageScene` au niveau village. Chaque scène a :
- **Trigger horloge** : heure(s) précise(s) ou créneau, jour de la semaine, ère active
- **Acteurs requis** : roles (boulanger / aubergiste / garde / Prêtre) — résolus dynamiquement vers PNJ disponibles du village
- **Actions** : déplacements, anim, dialogue scripté, échange d'items
- **Visibilité LOD** : peut s'exécuter en L2 (snapshot, pas de visuel) ou L0/L1 (animation visible)

**Catalogue de scènes scriptées canoniques** (templates injectés dans tous les villages) :

| Scène | Heure | Acteurs | Action | Effet |
|-------|-------|---------|--------|-------|
| **Livraison du pain** | 06:30 | boulanger → aubergiste | boulanger transporte sac, échange dialogue 10s | Stock pain auberge +N |
| **Ouverture du marché** | 07:00 | marchands × N | déballent étals | Marché ouvert ce jour |
| **Garde change quart** | 06:00 / 18:00 | garde sortant ↔ garde entrant | salutation 5s | Roulement persistant |
| **Salutation matinale entre voisins** | 07:00-09:00 | voisins (graphe §5 `friends`) | rencontre fortuite + dialogue court | +2 relation |
| **Prière collective sabbat** | jour religieux + 11:00 | tous fidèles religion X | rassemblement temple, animation prière 5min | Faith_intensity +5 cette semaine |
| **Marchand annuel des récoltes** | jour 90 calendrier (Rota Mundi) | tous fermiers | rassemblement place centrale | Économie locale |
| **Funérailles** | sur événement (mort PNJ) | clergé local + family du défunt | procession + rituel selon religion | Reconnaissance faction +Δ |
| **Tribunal lapidaire** | jour Lex Petra hebdo | Petrani + accusés (PNJ flag) | rassemblement, jugement scripté | Justice locale |
| **Veillée funéraire familiale** | sur événement (Foedus Animae) | family du défunt | rassemblement domicile, dialogues nostalgie | Mémoire collective |

**Architecture technique** :
- `UVillageSceneScheduler` (UWorldSubsystem) : tick 1 min, parcourt les scènes du village, déclenche celles dont les conditions match
- Pour chaque scène : `ResolveActors()` cherche les PNJ correspondant aux rôles dans le village ; si manquant → fallback (skip ou substitut)
- L'exécution est **temporellement compressée en L2** : pas d'animation, juste mise à jour des états (stock, mood, relations)

**Couche B — Émergence légère (PNJ nommés en L0 uniquement)** :

Tick `BTService_SocialEncounter` 1.0s sur PNJ nommés en L0 :
1. Scan PNJ proches dans rayon 8m
2. Si target ∈ `friends`/`family` du graphe social (§5) ET `last_chat[target] > 12h game-time` → score "discuter" = 60 + MBTI_bonus
3. MBTI_bonus :
    - **Compatibilité MBTI** : E↔E +20, I↔I +10, F↔F +15 (empathie), T↔T +10 (factuel)
    - **Incompatibilité forte** : I face à E inconnu -30 (introverti évite extraverti étranger)
4. Si score > 55 → trigger `NPCChat` : les 2 PNJ se rencontrent, animation parlent 30s, +1 relation/jour cap

**Bornes anti-explosion** :
- Cap **5 rencontres émergentes / village / minute** (file de priorité globale)
- Désactivation si nombre PNJ L0 > 80 dans un rayon 100m (zone bondée — joueur major event en cours)
- Aucun impact sur économie ou inventaire (purement social/relationnel)

**Coût estimé** :
- Scènes scriptées : ~20 scènes / village × 2000 villages = 40k scènes — mais évalués 1×/min → ~700/s — négligeable (lookup tag-based)
- Émergence : 5-15 PNJ nommés L0 simultanés × tick 1s × scan 8m = ~50 raycasts/s — négligeable
- Mémoire : ajout de `last_chat: TMap<NPC_Id, GameTime>` ~32 octets / PNJ nommé

**Branchement** :
- Scènes : `UVillageSceneSubsystem::RegisterScene(VillageId, SceneAsset)` au load du village
- Émergence : `BTTask_ApproachAndChat` ajouté à la branche `ModeSocial` du BT (§1)
- Impact relations : `URelationsSubsystem::IncrementRelation(NPC_A, NPC_B, +1)` cap 100/relation
- Compatible avec §11 : émergence skipée à L1+ (animation invisible donc inutile à simuler)

**Cohérence avec §3 Mémoire** : une rencontre émergente entre PNJ A et PNJ B nommés peut générer une entrée mémoire individuelle si trigger event spécial (ex. PNJ A a vu PNJ B avec un objet rare → mémoire propagée).

---

## 20. Pathfinding & navigation dynamique

**Question** : Comment les PNJ se déplacent-ils ?

- Recast UE5 / NavMesh standard pour la nav ?
- Réagissent-ils aux obstacles dynamiques (joueur, autre PNJ, événement, pluie) ?
- Routes habituelles vs replanification continue ?

**Décision (2026-05-01) : Recast UE5 / NavMesh natif + RVO Avoidance pour les obstacles dynamiques principaux + Crowd Manager pour les zones denses (villages). Routes habituelles via `PreferredRoute` Blackboard avec replanification adaptative selon LOD §11.**

Capitalise sur l'existant UE5 : `NavigationSystemV1` est **déjà utilisé** par `BTTask_FindPointInRadiusOfHome` (`K2_GetRandomReachablePointInRadius`), par `BTTask_HWRetreat` (`AIController->MoveToLocation` + projection NavMesh), et `TilePoolSize=200000` est **déjà configuré** dans le DefaultEngine.ini ([[Level Design]] §navigation). Pas de plugin externe nécessaire. **RVO Avoidance** (intégré au `UCharacterMovementComponent` via `bUseRVOAvoidance`) couvre l'évitement local des autres PNJ et joueurs sans coût CPU significatif. Pour les villages denses (50+ PNJ proches, marchés, taverne), bascule sur **Crowd Manager** (`UCrowdManager`/`UCrowdFollowingComponent`) qui mutualise le pathfollowing. Routes habituelles (boulanger maison→four→auberge) cachées en `PreferredRoute` (TArray<FVector>) pour éviter recompute path tick — invalidées si obstacle bloque > 2s.

### Implémentation §20

**NavMesh statique (config existante)** :
- Recast UE5 standard via `RecastNavMesh-Default` (asset placé en éditeur dans chaque level/zone)
- Génération en éditeur (pré-bake), `bRebuildAtRuntime = false` pour zones stables
- `TilePoolSize = 200000` ([[Level Design]] déjà configuré)
- `CellSize = 19` (défaut UE5), `AgentRadius = 35`, `AgentHeight = 144` (capsule humanoïde HW : `MobCapsuleRadius = 42`, `MobCapsuleHalfHeight = 96`)
- Multi-agent : 2 profils nav (`AgentSmall` rayon 25 pour insectes/rongeurs, `AgentHuman` rayon 35 par défaut)

**Évitement dynamique (RVO Avoidance)** :
- Activation par PNJ : `UCharacterMovementComponent::bUseRVOAvoidance = true` (set dans `AHWGASMobCharacter::InitializeMob_Implementation`)
- `AvoidanceConsiderationRadius = 500` (5m)
- `AvoidanceWeight = 0.5` (équilibre entre objectif et évitement)
- **Désactivé en L2/L3** (économie CPU, trop loin pour être visible)
- **Réduit en L1** : `AvoidanceConsiderationRadius = 200`, weight 0.3

**Crowd Manager (zones denses uniquement)** :
- Activation conditionnelle : si `OverlapSphere(50m, NPC)` retourne > 20 PNJ → bascule pathfollowing sur `UCrowdFollowingComponent` (au lieu de `UPathFollowingComponent` standard)
- Géré par nouveau `UHWCrowdActivator` subsystem qui surveille la densité par village toutes les 5s
- Crowd Manager mutualise les calculs de séparation/évitement → ~3× moins coûteux pour 50 PNJ proches

**Routes habituelles (`PreferredRoute`)** :
- Nouvelle clé Blackboard `BBKey_PreferredRoute` (TArray<FVector>) sur `BB_NPCBase`
- Cachée par PNJ : générée à la première exécution réussie d'un trajet (boulanger maison→four), stockée dans état persistant (§10)
- Tâche `BTTask_FollowPreferredRoute` :
  - Itère sur les waypoints
  - Si waypoint inaccessible (NavMesh raycast échoue) > 2s → flag `RouteInvalidated = true` → fallback sur `MoveToLocation` standard puis recompute la route
- Économie CPU : un PNJ ISTJ/J qui fait son trajet quotidien ne pathfind plus chaque jour

**Replanification adaptative (cap selon LOD §11)** :

| Niveau LOD | Path query autorisé | Stratégie |
|------------|---------------------|-----------|
| **L0** (<45m) | Max **1× / seconde** par PNJ | Replan permis, RVO activé |
| **L1** (45-195m) | Max **1× / 5 secondes** | RVO réduit, crowd manager si dense |
| **L2** (>195m, en zone) | **Aucun** | Position interpolée linéaire vers target, pas de NavMesh query |
| **L3** (hors zone) | **Gel total** | Snapshot position + état persisté |

- Cap implémenté dans `UHWAILODManager` (§11) : maintient un compteur `LastPathQueryTime` par PNJ, refuse un nouveau `MoveTo` si le delta < threshold du LOD courant
- En cas de blocage (PNJ contre obstacle > 2s sans progression `velocity < 5cm/s`) : force replan **immédiate** quel que soit le cap (sécurité anti-blocage)

**Réactivité aux obstacles** :
- **Joueur stationnaire sur le chemin** : RVO contourne automatiquement (rayon 5m)
- **Autre PNJ stationnaire** : idem RVO
- **Obstacle dynamique majeur** (porte fermée, barricade, projectile spawné `BP_FireProjectile01`) : utilise `NavLinkProxy` ou `NavigationInvoker` pour invalider la tile NavMesh runtime → PNJ replanifie
- **Pluie / météo** : pas d'effet pathfinding (pas de modificateur de coût NavMesh) ; effet uniquement comportemental (PNJ rentre se mettre à l'abri via §1 routine)

**Fuite intelligente (`BTTask_HWRetreat` existant + extension)** :
- L'implémentation actuelle calcule `RetreatLoc = EntityPos + AwayDir * 800` puis projection NavMesh, ce qui peut faire fuir vers une impasse
- Extension proposée (Phase 2) : tester 3-5 candidats `RetreatLoc` à 800/1200/1600 unités dans un cône 90° opposé à la cible, retenir celui qui maximise distance au target ET reachability (PathLength fini)
- Pas de blocking change sur l'existant — extension dans `BTTask_HWRetreat` C++

**Performances** :
- 1 path query Recast humanoïde standard ≈ 0.1-0.3 ms
- 50 PNJ L0 × 1 query/s = 5-15 ms/s = 0.083-0.25 ms/frame en moyenne (dilué)
- 300 PNJ L1 × 0.2 query/s = 6-18 ms/s = 0.1-0.3 ms/frame
- Crowd Manager village dense (50 PNJ regroupés) ≈ 1.5 ms/frame total (mutualisé)
- Budget total IA navigation < 2 ms/frame en cas pire — conforme cible MMO

**Plugins existants à valider** : `Navigation System` (toujours activé par défaut UE5), `AIModule` (activé), `GameplayTasks` (activé). Aucun plugin tiers requis.

---

## 📋 Synthèse — table récapitulative des décisions

| # | Concept | Décision | Date |
|---|---------|----------|------|
| 1 | Modèle d'IA global | ✅ **Hybride BT racine + Utility AI Service** | 2026-05-01 |
| 2 | Perception | ✅ **Hybride zones d'awareness + raycasts UE5 (Sight + Hearing)** | 2026-05-01 |
| 3 | Mémoire | ✅ **Hybride individuelle (24-48h, MBTI-modulé) + village partagé (Memory.Public.* → Reconnaissance)** | 2026-05-01 |
| 4 | Émotions / Mood | ✅ **Mood global (baseline MBTI) + 3 émotions (Peur/Colère/Fatigue), modulent Utility Scorer** | 2026-05-01 |
| 5 | Modèle social | ✅ **(d) Graphe par village pré-généré + relations clés authored** (typage `family/friends/enemies/boss/mentor/apprentice/spouse`, modulé MBTI) | 2026-05-01 |
| 6 | **Personnalité** | ✅ **MBTI** (16 types + force 0-100) | 2026-05-01 |
| 7 | Réactivité au joueur | ✅ **(d) Hybride faction (Reconnaissance) + individus clés** (rep 0.7 indiv + 0.3 faction, 6 seuils +75/+25/-25/-50/-75, modulé MBTI) | 2026-05-01 |
| 8 | Modèle de décision | ✅ **Hybride règles dures (P0-P3, court-circuits) + saturations émotions + Utility Scorer §1** | 2026-05-01 |
| 9 | Population | ✅ **Hybride Persistants + Transients** (5-10 nommés/ville majeure + foule pool ; densité capitale 250-500 / village 25-50 ; ~3-5k persistants monde) | 2026-05-01 |
| 10 | Persistance | ✅ **Stratifiée selon §9** (table `npc_persisted` JSONB ; persistants → tout l'état ; transients → 0 ; mood quotidien reset au matin ; mémoire compressée >30j) | 2026-05-01 |
| 11 | LOD AI | ✅ **4 niveaux L0-L3, hystérésis ±5m** (L0<45m / L1 45-195m / L2 195m-zone / L3 hors zone) | 2026-05-01 |
| 12 | Factions | ✅ **Statique pour génériques / dynamique pour nommés** (loyalty_score 0-100, bascule sur quête/conflit/Souffle, modulé MBTI F/T/J/P) | 2026-05-01 |
| 13 | Religion | ✅ **RitualPattern par religion** (12 patterns canoniques injectés dans la routine, tabous BT court-circuit, biais MBTI, intégration Prêtre) | 2026-05-01 |
| 14 | Réaction Ères / Souffle | ✅ **Modulation paramétrique 95% + Templates alternatifs 5% PNJ-clés** (Oracles, Prêtres senior, Bardes-chroniqueurs ; `EraModulationProfile` Data Asset) | 2026-05-01 |
| 15 | Quêtes | ✅ **Hybride Authored main + Procédural side** (~50-100 main authored par grand pays × 1-3 par PNJ nommé ; Quest Generator pour side filtré par MBTI×Ère×Faction×Religion ; transients ne donnent pas) | 2026-05-01 |
| 16 | Combat AI | ✅ **Hybride — `BT_NPCBase` racine bascule sur sous-arbre `BT_NPCCombat` (dérivé `BT_EnemyBase`), exit 5s sans dégât** | 2026-05-01 |
| 17 | Authoring model | ✅ **Hybride 5-50 PNJ nommés authored par localité selon classe + reste 100% généré** (~3000-5000 PNJ nommés monde, pipeline Phase 4) | 2026-05-01 |
| 18 | Lifecycle | ✅ **Mort+remplacement transients & génération / Mort permanente nommés / Pas de vieillissement procédural / Pas de naissance simulée** (successeur narratif après 7j ; chronique Lore pour nommés) | 2026-05-01 |
| 19 | NPC ↔ NPC | ✅ **(b) Scènes scriptées (toutes échelles) + (c) émergence légère pour nommés L0** (catalogue 9 scènes canoniques, cap 5 rencontres/min/village, pas de Dwarf-Fortress-tier) | 2026-05-01 |
| 20 | Pathfinding | ✅ **Recast UE5 + RVO Avoidance + Crowd Manager (zones denses) + PreferredRoute, replan capé par LOD** | 2026-05-01 |

---

## Stratégie suggérée

**Sprint 1 — Fondations IA (2-4 semaines)**
3-4 agents/spécialistes répondent à : §1 (modèle IA), §2 (perception), §3 (mémoire), §4 (émotions), §6 ✅ déjà acté MBTI, §11 (LOD), §16 (combat), §20 (pathfinding). Couche **technique**.

**Sprint 2 — Fondations Sociales (2-4 semaines)**
2-3 agents/spécialistes répondent à : §5 (graphe social), §7 (réputation), §12 (factions), §13 (religion), §17 (authoring), §19 (NPC↔NPC). Couche **narrative**.

**Sprint 3 — Fondations Lifecycle (1-2 semaines)**
2 agents répondent à : §9 (population), §10 (persistance), §14 (ères), §15 (quêtes), §18 (lifecycle). Couche **simulation longue durée**.

Une fois les 20 concepts tranchés, **Phase 2 archétypes** peut démarrer avec une vraie spec implémentable. Les ébauches Forgeron/Boulanger seront alors **réécrites comme specs techniques solides** branchées sur le modèle d'IA et MBTI choisis.

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Métiers - Forgeron]] · [[Métiers - Boulanger]] · [[PNJ]] · [[Architecture Data-Driven]] · [[Registre des Décisions]]*
