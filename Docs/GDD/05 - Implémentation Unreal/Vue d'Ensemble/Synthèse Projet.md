---
tags: [implementation, ue5, synthesis, snapshot]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [reflechir-impacts-refonte-souffle-accord-eres]
implements: ["Le Souffle", "L'Accord", "Les Ères", "Migration Accord"]
---

> **2026-05-01 (V3.3)** : Documentation restructurée — `GameDoc/` migré vers `05 - Implémentation Unreal/` (11 sous-dossiers thématiques). Convention de nommage : anglais Title Case avec espaces. Voir [[Index Implémentation]] pour la nouvelle navigation et [[Migration Accord]] pour la stratégie de migration sémantique XP/Level → Accord.
>
> **2026-04-18** : Documentation initialement restructurée en 12 dossiers thématiques.

# HybeliorWorld — Rapport de Synthèse Global

> [!info] Refonte Souffle/Accord/Ères (2026-04/05) — voir [[Le Souffle]], [[L'Accord]], [[Les Ères]]
> Ce rapport reflète l'état du projet au 2026-04-08, **avant** la refonte du système de progression. Les sections décrivant XP/Level/D&D restent factuellement vraies pour le code actuel mais leur lecture gameplay a changé. La couche conceptuelle de progression visible est désormais l'Accord (0-100 % par ère) ; XP/Level deviennent techniques internes. Voir [[Migration Accord]].

**Référence principale pour toute nouvelle personne rejoignant l'équipe**

> Généré le : 4 avril 2026 | Dernière mise à jour : 8 avril 2026
> Basé sur : Documents 00_INDEX → 15_Plugins_Config (15 audits complets)
> Codebase analysée : 361 fichiers C++ client + ~50 fichiers C# backend

---

## Table des Matières

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Architecture globale](#2-architecture-globale)
3. [État de maturité par système](#3-état-de-maturité-par-système)
4. [Top 20 incohérences critiques](#4-top-20-incohérences-critiques)
5. [Roadmap technique recommandée](#5-roadmap-technique-recommandée)
6. [Risques majeurs](#6-risques-majeurs)
7. [Ce qui est remarquable](#7-ce-qui-est-remarquable)
8. [Checklist pré-production](#8-checklist-pré-production)
9. [Changelog](#9-changelog)

---

## 1. Vue d'ensemble du Projet

### Stack Technique

| Couche | Technologie | Version |
|--------|------------|---------|
| Client moteur | Unreal Engine | 5.4 |
| Client langage | C++ (native) + Blueprint | — |
| Gameplay system | Gameplay Ability System (GAS) | UE5.4 built-in |
| Backend | OWS (.NET microservices) | .NET 6 |
| Backend langage | C# | — |
| Base de données | MSSQL / PostgreSQL / MySQL | au choix |
| Cache | Redis 7 Alpine | 512 MB LRU |
| Message queue | RabbitMQ 3.x | — |
| Conteneurisation | Docker + Docker Compose | — |
| Reverse proxy | Nginx 1.25 | SSL |
| Observabilité | ELK Stack (Elastic 8.11) | — |
| Rendu | DirectX 12 / Shader Model 6 | — |
| GI / Ombres | Lumen GI + Lumen Reflections + VSM | — |
| Réseau UE | ReplicationGraph (MMO) | — |
| UI | CommonUI Framework | — |
| Terrain | Procédural clipmap + SDF caves | Custom C++ |
| Eau | Water (fusionné dans module) | Custom C++ |
| Environnement | Cycle jour/nuit + météo + saisons | Custom C++ |
| IA | Behavior Trees + AIPerception | UE5.4 |
| Bridge éditeur | UnrealMCP (Claude Code HTTP) | 1.0 |

### Taille du Projet

| Métrique | Valeur |
|----------|--------|
| Fichiers C++ client (headers + impl) | 361 |
| Fichiers C# backend | ~50 |
| Tables SQL | 33 |
| GameplayTags natifs | 122+ |
| Biomes | 19 (13 climatiques + 6 fantasy) |
| Types d'armes | 8 |
| Réactions élémentaires | 7 |
| Types météo | 11 |
| Saisons | 4 |
| Plugins actifs | 21 |
| Continents lore | 13 |
| Religions | 11 |
| Anatomies joueur | 10 |
| Tables de persistance (catégories) | 14 |

### Maturité Estimée Globale

Le projet est en **phase Alpha avancée** côté gameplay et **Alpha côté infrastructure**. Les fondations architecturales sont solides et bien conçues (GAS natif, ReplicationGraph, microservices OWS, terrain procédural custom), mais de nombreux systèmes sont des squelettes fonctionnels avec des pièces manquantes critiques (récompenses de quêtes non appliquées, sécurité backend insuffisante pour production, bugs IA bloquants). Il n'existe actuellement aucun contenu jouable : pas de dialogues créés, pas de quêtes instanciées, pas de zones jouables finalisées.

---

## 2. Architecture Globale

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                       HYBELIORWORLD — VUE SYSTÈME COMPLÈTE                   ║
╚══════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────┐
│                  CLIENT UE5.4                        │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │           AHWGASPlayerCharacter              │   │
│  │                                              │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │    Gameplay Ability System (GAS)    │    │   │
│  │  │  UHWAbilitySystemComponent          │    │   │
│  │  │  UHWCombatAttributeSet (15 attrs)   │    │   │
│  │  │  122+ GameplayTags natifs           │    │   │
│  │  │  7 réactions élémentaires           │    │   │
│  │  └─────────────────────────────────────┘    │   │
│  │                                              │   │
│  │  ┌────────────┐  ┌────────────────────────┐ │   │
│  │  │  Combat    │  │     Progression        │ │   │
│  │  │ UHWCombo   │  │  UHWProgression        │ │   │
│  │  │ Component  │  │  Component             │ │   │
│  │  │ UHWWeapon  │  │  UHWQuestComponent     │ │   │
│  │  │ Mastery    │  │  (11 types conditions) │ │   │
│  │  └────────────┘  └────────────────────────┘ │   │
│  │                                              │   │
│  │  ┌────────────┐  ┌────────────────────────┐ │   │
│  │  │ Inventaire │  │       NPC / Social     │ │   │
│  │  │ UHWInv     │  │  UHWNPCComponent       │ │   │
│  │  │ Component  │  │  UHWDialogueComponent  │ │   │
│  │  │ (x2: bag   │  │  (arbre dialogues)     │ │   │
│  │  │ + equip)   │  │                        │ │   │
│  │  └────────────┘  └────────────────────────┘ │   │
│  │                                              │   │
│  │  ┌────────────────────────────────────────┐ │   │
│  │  │             Gameplay                   │ │   │
│  │  │  UHWBuoyancyComponent               │ │   │
│  │  │  UHWSkillBarComponent (10 slots)       │ │   │
│  │  │  Input Enhanced (22+ tags modernes)    │ │   │
│  │  └────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌───────────────────┐  ┌────────────────────────┐  │
│  │  AHWGASMobChar    │  │    AHWAIController     │  │
│  │  Pool 50 mobs     │  │  BT + Blackboard       │  │
│  │  4 états lifecycle│  │  AIPerception Sight    │  │
│  │  UHWLootTable     │  │  SightRadius: 3000     │  │
│  └───────────────────┘  └────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │              Monde (Singletons)                │ │
│  │                                                │ │
│  │  AHWEnvironmentManager                         │ │
│  │  ├─ UHWTimeOfDaySystem  (24h, 150s/heure)     │ │
│  │  ├─ AHWSeasons          (4 saisons, 60min)    │ │
│  │  ├─ WeatherSystem       (11 types, 19 biomes) │ │
│  │  ├─ SkySurfaceRenderer  (~100 params matériaux│ │
│  │  └─ OceanBridge         (sync Water)          │ │
│  │                                                │ │
│  │  AHWTerrainManager                             │ │
│  │  ├─ UHWClipmapSystem    (12 LODs, 1000 km)    │ │
│  │  ├─ UHWBiomeClassifier  (19 biomes)           │ │
│  │  ├─ FHWMarchingCubes    (SDF caves 64³)       │ │
│  │  └─ Erosion Hydraulique (50 000 gouttes)       │ │
│  │                                                │ │
│  │  AHWInfiniteOcean                              │ │
│  │  ├─ Gerstner 4 groupes  (GPU waves)           │ │
│  │  ├─ QuadTree LOD        (64x64 tiles)         │ │
│  │  └─ Buoyancy + Swim + Drowning                │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │                      UI                        │ │
│  │  CommonUI ─ Login ─ HUD ─ Inventaire           │ │
│  │  Carte ─ Dialogues ─ QuestTracker              │ │
│  │  AHWHUD (floating damage + cooldowns)          │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │           Interaction / Monde                  │ │
│  │  IInteractable → AHWContainer / AHWDoor        │ │
│  │  ASupplyPod / AHWPortal / ADynamicContentMgr   │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
            │ HTTP REST (JSON)
            │ Ports: 44302, 44323, 44325, 44328
            ▼
┌─────────────────────────────────────────────────────┐
│              BACKEND OWS (.NET 6 — Docker)          │
│                                                      │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │  OWSPublicAPI    │  │  OWSCharacterPersistence  │ │
│  │  :44302          │  │  :44323                   │ │
│  │  Auth, Users     │  │  Stats, Inventaire        │ │
│  │  Sessions, Chars │  │  CustomCharData, Abilities│ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                      │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │ OWSInstanceMgmt  │  │    OWSGlobalData          │ │
│  │ :44328           │  │    :44325                 │ │
│  │ Zones, Instances │  │    Key/Value monde        │ │
│  │ SpinUp/ShutDown  │  │                           │ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │          Infrastructure Docker               │   │
│  │                                              │   │
│  │  Nginx 1.25 (80/443 SSL)                     │   │
│  │  ├─ MSSQL / PostgreSQL / MySQL               │   │
│  │  ├─ Redis 7 (512MB LRU, sessions)            │   │
│  │  ├─ RabbitMQ 3.x (SpinUp/ShutDown queues)    │   │
│  │  └─ ELK Stack 8.11 (logs)                   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  OWSInstanceLauncher (hors Docker)                   │
│  └─ Reçoit RabbitMQ → Lance processus UE Servers    │
└─────────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────┐
│      Serveurs de Zone UE5.4      │
│  (instances dédiées par zone)    │
│  HubWorld, SouthGate, ...        │
│  HardCap: 80 joueurs / instance  │
└──────────────────────────────────┘
```

---

## 3. État de Maturité par Système

| Système | Maturité | Notes |
|---------|----------|-------|
| **GAS Core** (AttributeSet, Tags, ASC) | Beta | Architecture solide, 15 attributs répliqués. Quelques bugs critiques (Stamina, encodage parité) |
| **Calcul des dégâts** | Alpha | Fonctionnel mais formule surprenante (Attack+MaxHealth), encodage critique fragile |
| **Réactions élémentaires** | Alpha | 4/7 fonctionnelles, 3 placeholder (Firestorm, Superconduct partiel, Shatter) |
| **Système de combo** | Alpha | Logique combo complète, maîtrise XP OK, mais Stamina non répliquée |
| **Maîtrise des armes** | Beta | Courbe XP exponentielle, 8 types, bonus calculés. Non connecté à BaseAttackSpeed |
| **Hiérarchie Personnages** | Beta | 4 niveaux de classes, 10 anatomies. BP_PlayerCharacter_CE nettoyé (0 vars/0 funcs). UHWCharacterCustomComponent supprimé. Assets réorganisés dans Content/Assets/Characters/HW/ (4472 assets) |
| **Entites** | Alpha | Behavior Tree OK, 3 bugs bloquants (pool spawn a (0,0,0), ActiveEntitiesCount jamais decremente, KillerLevel faux) |
| **Entity Pooling** | Alpha | Systeme pool 50 entites, lifecycle 4 etats. Pas de limite max pool dynamique |
| **Inventaire** | Beta | FastArray, équipement avec GAS, serialisation JSON OWS. Tables OWS legacy orphelines |
| **Progression cachée** | Beta | 11 types conditions, 4 visibilités, DataAsset, sérialisation. PrimaryAssetTypes non enregistrés |
| **Système de quêtes** | Alpha | Structure complète, mais récompenses XP/Gold jamais appliquées, TimeLimitSeconds ignoré |
| **Environnement/Météo** | Beta | 11 météos, 4 saisons, 7 périodes de lumière, simulation biome. Sync multi-serveur manquante |
| **Terrain procédural** | Beta | Clipmap 12 LODs, 19 biomes, SDF caves, érosion hydraulique. FAutoDeleteAsyncTask dangereux |
| **Eau** | Beta | Gerstner GPU, QuadTree LOD, flottabilité, nage, noyade. GameTimeInSeconds overflow possible |
| **Système d'interaction** | Alpha | Containers/Doors/Portals OK. Bug IsContainerOpened(), GetInteractableGUID() régénère GUID |
| **Interface utilisateur** | Alpha | Structure CommonUI en place, Login (widget créé en C++ via AHWLoginPlayerController::BeginPlay), HUD, Inventaire, Carte. Beaucoup de méthodes C++ vides (BP uniquement) |
| **Entités et Dialogues** | Prototype | Système fonctionnel mais aucun dialogue créé dans le projet. Contenu zéro |
| **Framework de Jeu** | Alpha | GameMode/State/Controllers OK. Race condition init, pas de timeout OWS, BlueprintFunctionLibrary vide |
| **Backend OWS** | Alpha | 6 microservices, 33 tables, Docker. Sécurité insuffisante pour production |
| **Configuration** | Beta | Multi-environnement (dev/prod/secrets), .gitignore secrets. Packaging configuré |

---

## 4. Top 20 Incohérences Critiques

Consolidées depuis les 15 audits. Classées par impact sur la jouabilité et la sécurité.

---

### CRITIQUE — Sécurité (Bloquants pour production)

**#1 — Pas de validation de propriété des personnages (OWS)**
- **Fichier** : `OWSCharacterPersistence` controllers C#
- **Problème** : N'importe quel utilisateur authentifié peut modifier les données d'un autre personnage en connaissant son nom. Il n'existe aucune vérification `CharacterId → UserSession`.
- **Impact** : Exploitation triviale permettant vol d'items, tricherie, corruption de données.
- **Correction** : Valider l'appartenance du personnage à la session avant toute action de persistance.

**#2 — Auth OWS par X-CustomGUID uniquement (pas de JWT)**
- **Fichier** : `DefaultGame.ini`, `OWSAPISubsystem`
- **Problème** : Le seul mécanisme d'authentification inter-services est le header `X-CustomGUID`. Pas de token JWT avec expiration, pas de refresh token.
- **Impact** : Sessions perpétuelles, impossible à révoquer, susceptible de replay attacks.
- **Correction** : Implémenter Bearer JWT avec expiration configurable.

**#3 — RabbitMQ avec credentials par défaut (guest/guest)**
- **Fichier** : `docker-compose.yml`
- **Problème** : Les credentials RabbitMQ sont `guest/guest` par défaut dans les variables d'environnement documentées.
- **Impact** : Accès non autorisé au broker de messages, possibilité de lancer/éteindre des serveurs de zone.
- **Correction** : Forcer des credentials forts via variables d'environnement sécurisées.

**#4 — CORS permissif (AllowAnyHeader + AllowAnyMethod)**
- **Fichier** : Configuration CORS OWS
- **Problème** : Le backend accepte toutes les origines, tous les headers, toutes les méthodes.
- **Impact** : Vulnérabilité CSRF, exposition aux attaques depuis n'importe quel domaine.
- **Correction** : Whitelist explicite des domaines autorisés.

---

### CRITIQUE — Bugs Gameplay Bloquants

**#5 — ActiveEntitiesCount jamais decremente dans AHWEntitySpawner**
- **Fichier** : `HWEntitySpawner.cpp:~106`
- **Probleme** : `ActiveEntitiesCount` est incremente a chaque spawn mais jamais decremente quand une entite meurt ou est desactivee. La condition `ActiveEntitiesCount < EntityNumber` devient donc toujours fausse apres le premier cycle.
- **Impact** : Plus aucun respawn d'entites apres la mort de la premiere entite. Zones videes definitivement.
- **Correction** : Decrementer dans `DeactivateSpecificEntity()` et `EntityDead()`.

**#6 — Pool d'entites spawne a FVector::ZeroVector (0,0,0)**
- **Fichier** : `HWEntityPoolManager.cpp` — `InitializePool()`
- **Probleme** : Les 50 entites pre-allouees sont creees a l'origine du monde (coordonnees 0,0,0), souvent dans la geometrie ou hors-limites.
- **Impact** : Crash potentiel au demarrage, entites visibles a l'origine, erreurs physique/collision.
- **Correction** : Utiliser une position hors-map dediee (ex: Z = -100 000) ou desactiver la collision immediatement.

**#7 — KillerLevel = EntityLevel dans le systeme de loot**
- **Fichier** : `HWGASMobCharacter.cpp` — `EntityDead()`
- **Probleme** : `RollLoot()` recoit `EntityLevel` comme `PlayerLevel` au lieu du niveau du joueur qui a tue l'entite.
- **Impact** : Loot scaling entierement faux. Une entite niveau 1 tuee par un joueur niveau 50 droppera du loot niveau 1. Les `MinPlayerLevel` sur les entrees de loot sont inoperants.
- **Correction** : Recuperer le niveau du joueur tueur (DamageInstigator) et le passer a `RollLoot()`.

**#8 — Stamina modifiée directement sur l'AttributeSet (contourne GAS)**
- **Fichier** : `HWComboComponent.cpp:286`
- **Problème** : La consommation de stamina lors d'un combo modifie directement l'attribut sur le serveur sans passer par un `GameplayEffect`. Cette modification n'est pas répliquée aux clients.
- **Impact** : Désynchronisation client/serveur de la stamina. L'UI affiche une valeur incorrecte. La stamina peut devenir négative sans validation.
- **Correction** : Créer un `GameplayEffect` de coût de stamina et l'appliquer via `ApplyGameplayEffectToSelf()`.

**#9 — Récompenses de quêtes XP/Gold loggées uniquement, jamais appliquées**
- **Fichier** : `HWQuestComponent.cpp` — `ApplyQuestRewards()`
- **Problème** : Les champs `ExperienceReward` et `GoldReward` de `FHWQuestReward` sont définis mais les commentaires dans le code indiquent explicitement `// TODO: Apply XP` et `// TODO: Apply Gold`. Seul `UnlockReward` est traité.
- **Impact** : Les quêtes ne donnent aucune récompense économique ou de progression de niveau.
- **Correction** : Connecter avec le système de stats du personnage et le système de progression.

**#10 — Pas de timeout OWS côté client (loading screen infini)**
- **Fichier** : `HWPlayerController.cpp` — flux `PartialInitializationComplete`
- **Problème** : La cascade d'initialisation en 3 étapes (GAS 25% + CustomData 50% + PlayerState 25%) n'a aucun timeout. Si le backend OWS est hors ligne ou lent, l'écran de chargement reste affiché indéfiniment sans message d'erreur.
- **Impact** : Expérience utilisateur bloquante. Impossible de diagnostiquer une panne backend depuis le client.
- **Correction** : Ajouter un `FTimerHandle` de timeout (ex: 30s) avec un message d'erreur et retour au menu.

---

### CRITIQUE — Formules et Logique de Combat

**#11 — BaseDamage = Attack + MaxHealth (formule surprenante)**
- **Fichier** : `HWGameplayEffectExecutionCalc.cpp:84`
- **Problème** : La formule de dégâts de base somme l'attaque ET la santé maximale de la source. Un personnage avec 1000 HP et 100 ATK inflige 1100 de dégâts de base. Intentionnel ou erreur ?
- **Impact** : L'équilibrage est impossible tant que cette formule n'est pas confirmée/corrigée. La Constitution (qui influence MaxHealth) devient indirectement une stat d'attaque.
- **Correction** : Confirmer ou corriger la formule, puis la documenter explicitement.

**#12 — Encodage des critiques par parité (nombres impairs = critique)**
- **Fichier** : `HWGameplayEffectExecutionCalc.cpp:119-131`
- **Problème** : Pour signaler un coup critique, le système force la magnitude de dégâts à être impaire. Ce hack est détecté côté réception en vérifiant `magnitude % 2 == 1`.
- **Impact** : Fragile : si la formule de dégâts change, si Defense arrondit différemment, ou si une autre source de dégâts utilise ce canal, les critiques deviennent non détectables ou des faux positifs apparaissent.
- **Correction** : Utiliser un `GameplayTag` dédié `Combat.Flags.CriticalHit` (déjà déclaré !) pour signaler les critiques.

**#13 — Constitution jamais utilisée dans les formules de combat**
- **Fichier** : `HWCombatAttributeSet.h` + `HWGASCharacter.cpp`
- **Problème** : `Constitution` influence `MaxHealth = Constitution × 100` dans les formules documentées, mais cette dérivation n'est pas appliquée automatiquement. `Constitution` existe comme attribut mais son effet n'est pas connecté.
- **Impact** : Investir des points en Constitution n'a aucun effet. Système de statistiques partiellement fonctionnel.

---

### CRITIQUE — Infrastructure et Données

**#14 — Tables OWS d'inventaire legacy jamais utilisées**
- **Fichier** : `OWS/SQL/Initialize.sql` — tables `CharInventoryItems`, `CharHasItems`
- **Problème** : Le code UE5 stocke l'inventaire via `CustomCharacterData` en JSON. Les tables SQL dédiées à l'inventaire (`CharInventoryItems`, `CharHasItems`) existent en base mais ne sont jamais lues ni écrites.
- **Impact** : Confusion sur la source de vérité des données d'inventaire. Impossibilité de faire des requêtes SQL sur l'inventaire des joueurs (analytics, support, anti-cheat).
- **Correction** : Soit migrer vers les tables SQL dédiées, soit les supprimer et documenter le choix JSON.

**#15 — Race condition dans la cascade d'initialisation**
- **Fichier** : `HWPlayerController.cpp` — `PartialInitializationComplete`
- **Problème** : L'initialisation du joueur en 3 phases (GAS → CustomData → PlayerState) utilise une cascade de callbacks sans aucune protection contre les timeouts, les doublons ou les appelants tardifs. Si un callback arrive deux fois (retransmission réseau), des données peuvent être appliquées deux fois.
- **Impact** : États de jeu corrompus possibles au login, particulièrement sur connexion lente.
- **Correction** : Machine à états avec flags `bInitialized_*` et timeouts par phase.

**#16 — GetInteractableGUID() génère un nouveau GUID à chaque appel**
- **Fichier** : `IInteractable.h` — implémentation par défaut
- **Problème** : L'implémentation par défaut de `GetInteractableGUID()` dans l'interface `IInteractable` appelle `FGuid::NewGuid()` à chaque invocation, retournant un GUID différent à chaque fois.
- **Impact** : Tout code vérifiant `IsContainerOpened(GetInteractableGUID())` ne trouvera jamais le container comme ouvert. La persistance de l'état des containers est brisée pour tout container qui n'override pas cette méthode.
- **Correction** : L'implémentation par défaut doit retourner `FGuid::InvalidGuid()` ou forcer les sous-classes à stocker un GUID persistant.

**#17 — IsContainerOpened() appelle IsSupplyPodOpened() (confusion de nommage)**
- **Fichier** : `HWContainer.cpp`
- **Problème** : La méthode `AHWContainer::IsContainerOpened()` appelle `HWPlayerController->IsSupplyPodOpened()` au lieu de `->IsContainerOpened()`. Idem pour `ASupplyPod`.
- **Impact** : Les containers et supply pods partagent la même liste d'état ouvert/fermé. Un container ouvert peut apparaître fermé, et vice versa.

**#18 — PrimaryAssetTypes non enregistrés dans AssetManager**
- **Fichier** : `DefaultGame.ini`
- **Problème** : Les DataAssets `QuestData` et `HWUnlockDefinition` ne sont pas déclarés dans `PrimaryAssetTypesToScan`. L'AssetManager ne peut pas les découvrir automatiquement.
- **Impact** : Chargement asynchrone des quêtes et unlocks impossible. Accès aux données uniquement si les assets sont référencés directement (hard references).
- **Correction** : Ajouter les entrées `PrimaryAssetTypesToScan` documentées dans le fichier 06.

**#19 — FAutoDeleteAsyncTask utilisé pour la génération de terrain**
- **Fichier** : `HWTerrainAsyncGenerator.cpp`
- **Problème** : L'utilisation de `FAutoDeleteAsyncTask` sans tracking des tâches en cours expose à des dangling pointers : si le `TerrainManager` est détruit avant la fin d'une tâche async, la tâche accèdera à de la mémoire libérée.
- **Impact** : Crash potentiel lors du déchargement d'une zone ou de la fermeture du jeu pendant la génération.
- **Correction** : Utiliser `TSharedPtr` ou un système de cancellation explicite avec `WeakPtr`.

**#20 — GameTimeInSeconds peut provoquer un overflow sur longue session MMO**
- **Fichier** : `HWInfiniteOcean` / vagues Gerstner
- **Problème** : Le temps de simulation des vagues Gerstner utilise `GameTimeInSeconds` sans remise à zéro. Sur une session MMO de longue durée (serveurs 24/7), la précision flottante se dégrade et un overflow peut survenir.
- **Impact** : Artefacts visuels progressifs sur l'océan, potentiellement plantage après plusieurs semaines.
- **Correction** : Utiliser un temps relatif remis à zéro périodiquement ou un offset de temps.

---

## 5. Roadmap Technique Recommandée

### P1 — Priorité Absolue (avant tout test multijoueur)

Ces éléments bloquent soit la sécurité, soit la jouabilité fondamentale.

| ID | Tâche | Système | Effort |
|----|-------|---------|--------|
| P1-01 | Corriger `ActiveMobsCount` (décrémenter à la mort) | Entités | 1h |
| P1-02 | Corriger le spawn du pool à FVector::ZeroVector | Entités | 2h |
| P1-03 | Corriger `KillerLevel = MobLevel` dans `MobDead()` | Entités | 1h |
| P1-04 | Passer la consommation Stamina via GameplayEffect | Combat / GAS | 4h |
| P1-05 | Corriger `GetInteractableGUID()` (retourner GUID stocké) | Interactions | 2h |
| P1-06 | Corriger `IsContainerOpened()` → `IsSupplyPodOpened()` | Interactions | 30min |
| P1-07 | Ajouter timeout OWS dans la cascade d'initialisation | Framework | 4h |
| P1-08 | Implémenter les récompenses XP/Gold des quêtes | Quêtes | 1 jour |
| P1-09 | Valider propriété personnage côté OWS (CharId → UserSession) | Backend / Sécurité | 2 jours |
| P1-10 | Changer credentials RabbitMQ (guest/guest → secrets sécurisés) | Infrastructure | 2h |

### P2 — Priorité Haute (avant bêta fermée)

Ces éléments bloquent l'équilibrage, la robustesse ou l'expérience de jeu complète.

| ID | Tâche | Système | Effort |
|----|-------|---------|--------|
| P2-01 | Confirmer / corriger formule `BaseDamage = Attack + MaxHealth` | GAS Combat | 4h |
| P2-02 | Remplacer l'encodage critique par parité par un GameplayTag | GAS Combat | 4h |
| P2-03 | Implémenter Constitution → MaxHealth dérivé automatiquement | GAS Attributs | 4h |
| P2-04 | Implémenter les 3 réactions élémentaires placeholder (Firestorm, Superconduct, Shatter) | Combat | 2 jours |
| P2-05 | Remplacer X-CustomGUID par JWT Bearer tokens | Backend Auth | 3 jours |
| P2-06 | Corriger CORS (whitelist de domaines) | Backend | 4h |
| P2-07 | Enregistrer PrimaryAssetTypes dans DefaultGame.ini | Framework | 1h |
| P2-08 | Corriger `FAutoDeleteAsyncTask` terrain (WeakPtr ou cancellation) | Terrain | 4h |
| P2-09 | Créer au minimum 5-10 dialogues entités de test | Contenu | 2 jours |
| P2-10 | ~~Unifier les deux systèmes d'apparence legacy/CE~~ **FAIT** (2026-04-07) | Personnages | ~~3 jours~~ |
| P2-11 | Implémenter la machine à états d'initialisation (anti-race condition) | Framework | 1 jour |
| P2-12 | Ajouter limiting réseau par endpoint et par utilisateur (OWS) | Backend | 1 jour |
| P2-13 | Connecter `BaseAttackSpeed` aux bonus de maîtrise d'armes | Combat | 4h |
| P2-14 | Corriger `GameTimeInSeconds` overflow dans Water | Eau | 2h |

### P3 — Priorité Normale (avant lancement public)

Ces éléments améliorent la robustesse, les performances ou complètent les systèmes secondaires.

| ID | Tâche | Système | Effort |
|----|-------|---------|--------|
| P3-01 | Mapper ECara élémentaires (FireDamage, *Resistance) vers GAS | Inventaire | 2 jours |
| P3-02 | Synchroniser TimeOfDay entre serveurs OWS | Environnement | 3 jours |
| P3-03 | Implémenter DiscoveryConditions de quêtes (auto-découverte) | Quêtes | 1 jour |
| P3-04 | Ajouter TimeLimitSeconds (quêtes temporisées qui échouent) | Quêtes | 1 jour |
| P3-05 | Implémenter mTLS entre services internes OWS | Infrastructure | 2 jours |
| P3-06 | Ajouter versioning API `/v1/` sur OWS | Backend | 4h |
| P3-07 | Documenter et implémenter les WorldEvents (thread-safety) | Framework | 1 jour |
| P3-08 | Corriger typo "PerentSocket" → "ParentSocket" | Personnages | 30min |
| P3-09 | Désactiver `bCanEverTick` sur `AHWDoor` et `ADynamicContentManager` | Interactions | 1h |
| P3-10 | Implémenter `Action.GiveItem` et `Action.OpenShop` dans les dialogues | Entités | 2 jours |
| P3-11 | Supprimer ou migrer les tables SQL orphelines (CharInventoryItems) | Backend | 1 jour |
| P3-12 | Object pool pour les floating damage textes (HUD) | UI | 4h |
| P3-13 | Implémenter la synchronisation météo biome dans EnvironmentManager | Environnement | 2 jours |
| P3-14 | Migration `PlayerMappableInputConfig` deprecated → UE5.4 | Input | 1 jour |
| P3-15 | Remplir `BlueprintFunctionLibrary` (fonctions utilitaires communes) | Framework | variable |

---

## 6. Risques Majeurs

### Sécurité

| Risque | Probabilité | Impact | Priorité |
|--------|------------|--------|----------|
| Vol de personnages / items (pas de validation propriété) | Haute | Critique | P1 immédiat |
| Exploitation RabbitMQ (credentials par défaut) | Haute | Critique | P1 immédiat |
| Sessions non révocables (pas de JWT) | Moyenne | Élevé | P2 |
| CORS permissif (CSRF possible) | Moyenne | Élevé | P2 |
| Communication HTTP non chiffrée inter-services | Faible | Moyen | P3 |

### Performance et Scalabilité

| Risque | Description | Mitigation |
|--------|-------------|------------|
| Terrain async unsafe | `FAutoDeleteAsyncTask` → dangling pointers possibles | Voir P2-08 |
| AI sans limite de pool | Création infinie si pool épuisé (50 mobs par spawner mais pas de max global) | Ajouter `MaxPoolSize` configuré |
| ReplicationGraph non configuré | Plugin activé mais configuration par classe inconnue | Vérifier et documenter |
| Tick() vides actifs | `AHWDoor`, `ADynamicContentManager` consomment du CPU inutilement | Désactiver (P3-09) |
| Floating damage sans pool | Allocation/désallocation widget à chaque coup (60+ mobs simultanés = pression GC) | Object pool (P3-12) |
| Water GameTime overflow | Sessions MMO longues (serveurs 24/7) | Voir P2-14 |
| TagRelationship O(n) sans cache | Acceptable ≤50 entrées, mais peut devenir problème si la liste grandit | Ajouter HashMap |

### Dette Technique

| Zone | Description |
|------|-------------|
| Code mort | `UHWCombatDataSubsystem` inutilisé, `SerializeInventoryCompact` commenté, `ExportBlueprintNodeToCode` DEPRECATED, `AHWATA_ConeTrace` sphere+filtre inefficace. `UHWCharacterCustomComponent` supprimé (2026-04-07). CharacterEditorModify supprimé. ROG Armor Blueprints supprimés (meshes/materials conservés). |
| Double système | ItemLibrary/ItemDataTable, `InSlotNumber`/`Order`, tags input legacy/modernes. Double système apparence legacy/CE **résolu** (CE nettoyé, 0 vars/0 funcs). |
| Méthodes vides C++ (BP only) | `ContainerOpened()`, `Interact_Implementation()`, `RefreshSlot()`, `RefreshActiveQuests()` — risque de perte si un ticket BP est recodé en C++ |
| Dossiers vides | Nettoyés : anciens dossiers CharacterCustom/Player supprimés ou réorganisés (2026-04-07) |
| Contenu zéro | Aucun dialogue créé, pas de quêtes instanciées, pas de zones jouables finalisées |

### Réseau

| Risque | Description |
|--------|-------------|
| Race condition login | Cascade 3 phases sans timeout → loading infini si OWS lent |
| Animations entite non repliquees | `BlueprintImplementableEvent` non replique → desync visuel pour les autres joueurs |
| Fallback IA incohérent | Seuil 30HP absolu vs 20% MaxHealth selon contexte |
| Sync mondiale manquante | `TimeOfDay` non synchronisé entre serveurs OWS → décalages visuels jour/nuit en traversant une porte |

---

## 7. Ce qui est Remarquable

### Architecture GAS de Haute Qualité

L'intégration du Gameplay Ability System est exemplaire : les 122 GameplayTags sont déclarés en C++ natif (aucun tag en `.ini`), l'`AbilitySystemComponent` custom gère le batching RPC (`FScopedServerAbilityRPCBatcher`), la prédiction locale est activée par défaut, et le `HWGameplayAbilitySet` permet une composition très propre des capacités par personnage.

### Terrain Procédural Ambitieux et Complet

Le système de terrain est remarquable : clipmap 12 niveaux de LOD couvrant 1 000 km², 19 biomes (dont 6 fantasy), classification altitude/pente/côte, érosion hydraulique 50 000 gouttes + érosion thermale, grottes SDF avec Marching Cubes 64³, strips de couture T-junction, matériaux triplanaires par biome. Tout cela est du C++ custom performant — pas de dépendance externe.

### Système d'Environnement / Météo Rigoureux

Le remplacement du système UDS Blueprint (1200+ nœuds) par du C++ pur gérant ~100 paramètres de matériaux est une décision technique excellente. Les calculs astronomiques (déclinaison solaire, équation du temps, phases lunaires), la simulation météo par biome avec gradients d'altitude, les DLWE (traces neige/boue), et les zones override avec splines forment un système de haute qualité rarement vu dans les projets indépendants.

### Système de Progression Cachée Unique

Le `UHWProgressionComponent` avec ses 11 types de conditions (dont `Hidden` pour les conditions Blueprint custom), 4 niveaux de visibilité, les `HiddenUnlockCondition` sur les attaques de combo, et la cascade automatique d'unlocks est un design de jeu profond et original. C'est l'élément de game design le plus distinctif du projet.

### Migration BP→C++ Réussie

La migration massive de 1500+ nœuds Blueprint vers C++ native (GAS, terrain, environnement, Water fusionné) est une décision stratégique excellente pour les performances et la maintenabilité d'un MMO. Le plugin `UnrealMCP` pour l'intégration Claude Code montre une culture d'outillage développeur avancée.

### Fastarray Partout où il le Faut

L'utilisation systématique de `FFastArraySerializer` (COND_OwnerOnly, push-based) pour l'inventaire, l'équipement, les containers ouverts et les supply pods montre une compréhension approfondie du réseau UE5 et une architecture réseau correcte dès la conception.

### Infrastructure Backend Professionnelle

6 microservices Docker indépendants, 3 SGBD supportés, stack ELK complète, rate limiting global, séparation réseau Docker (frontend/backend/database), support multi-providers d'auth (Epic, Xsolla), gestion des instances de zones via RabbitMQ — c'est une architecture backend production-grade pour un MMO indépendant.

### Lore Complet et Cohérent

12 continents avec biomes mapés, 11 religions, 10 anatomies de personnages (6 races × 2 genres), conventions de tags pour les lieux, quêtes et conditions — le lore est non seulement écrit mais architecturalement intégré dans les systèmes de jeu.

---

## 8. Checklist Pré-Production

Conditions à remplir avant de passer en production (serveurs ouverts au public).

### Sécurité (Bloquant)

- [ ] Validation d'appartenance personnage sur chaque endpoint OWS sensible
- [ ] JWT Bearer tokens avec expiration (remplacer X-CustomGUID seul)
- [ ] Credentials RabbitMQ remplacés par secrets forts
- [ ] CORS restreint à la liste blanche de domaines
- [ ] Rate limiting par endpoint et par utilisateur (pas seulement global 60 req/min)
- [ ] Audit complet des endpoints sans authentification
- [ ] mTLS entre services internes (ou VPN réseau privé)
- [ ] Variables d'environnement `DefaultGame_Secrets.ini` correctement ignorées en CI/CD
- [ ] Revue de sécurité du `CustomerGUID` et `EncryptionKey` en production

### Bugs Critiques Gameplay (Bloquant)

- [ ] `ActiveMobsCount` décrémenté correctement (respawn fonctionnel)
- [ ] Pool de mobs initialisé hors de l'origine du monde
- [ ] `KillerLevel` correct dans `RollLoot()`
- [ ] Stamina passée via GameplayEffect (réplication correcte)
- [ ] Récompenses XP/Gold des quêtes appliquées
- [ ] `GetInteractableGUID()` retourne un GUID persistant
- [ ] `IsContainerOpened()` n'appelle plus `IsSupplyPodOpened()`
- [ ] Timeout OWS implémenté (pas de loading infini)
- [ ] Race condition initialisation résolue (machine à états avec timeouts)

### Formules et Équilibrage (Fortement Recommandé)

- [ ] Formule `BaseDamage = Attack + MaxHealth` confirmée ou corrigée et documentée
- [ ] Encodage critique par parité remplacé par GameplayTag `Combat.Flags.CriticalHit`
- [ ] Constitution connectée aux formules de MaxHealth
- [ ] Réactions élémentaires placeholder implémentées (Firestorm, Superconduct, Shatter)
- [ ] `BaseAttackSpeed` connecté aux bonus de maîtrise d'armes
- [ ] Stats élémentaires items (FireDamage, *Resistance) mappées vers GAS

### Contenu Minimum Jouable (Bloquant)

- [ ] Au moins 1 zone jouable complète avec terrain, météo, mobs
- [ ] Au moins 5 NPC avec dialogues fonctionnels
- [ ] Au moins 3 quêtes complètes (accepter → objectif → complétion → récompense)
- [ ] Au moins 20 items dans la DataTable avec stats correctes
- [ ] Au moins 1 arme de chaque type avec moveset configuré
- [ ] Au moins 1 donjon/cave jouable avec loot

### Infrastructure (Bloquant)

- [ ] `PrimaryAssetTypesToScan` ajoutés dans `DefaultGame.ini` (QuestData, HWUnlockDefinition)
- [ ] Configuration multi-environnement testée (dev → staging → prod)
- [ ] Backup automatique de la base de données configuré
- [ ] Monitoring et alertes sur les services critiques
- [ ] Procédure de rollback documentée
- [ ] Tests de charge effectués (objectif : 80 joueurs/zone sans dégradation)

### Qualité et Maintenabilité (Recommandé)

- [ ] `FAutoDeleteAsyncTask` terrain corrigé (éviter dangling pointers)
- [ ] Tables SQL orphelines (`CharInventoryItems`, `CharHasItems`) documentées ou supprimées
- [x] Double système d'apparence legacy/CE unifié (2026-04-07 — BP_PlayerCharacter_CE nettoyé, UHWCharacterCustomComponent supprimé)
- [ ] `PlayerMappableInputConfig` deprecated migré vers UE5.4
- [ ] Tick() désactivé sur `AHWDoor` et `ADynamicContentManager`
- [ ] Typo "PerentSocket" corrigé
- [ ] `BlueprintFunctionLibrary` rempli avec les utilitaires communs

### Tests (Bloquant)

- [ ] Tests unitaires des formules de dégâts (GAS execution calc)
- [ ] Tests d'intégration login → jeu → sauvegarde → reconnexion
- [ ] Tests multijoueur : 2 joueurs minimum dans la même zone
- [ ] Tests de déconnexion/reconnexion (persistance vérifiée)
- [ ] Tests de stress backend OWS (connexions simultanées)
- [ ] Validation que la cascade d'initialisation fonctionne sur connexion lente (> 500ms)

---

## Annexe — Correspondance Documents de Référence

| Sujet | Document détaillé |
|-------|------------------|
| GAS, attributs, abilities, réactions | [01_GAS_AbilitySystem.md](../01_AbilitySystem_Combat/AbilityCombat.md) |
| Combat, combos, maîtrise armes, hitboxes | [02_Combat.md](../01_AbilitySystem_Combat/AbilityCombat.md) |
| Hiérarchie personnages, customisation, animations | [03_Characters.md](../02_Characters_Entities/CharactersEntities.md) |
| Entités, spawning, loot | [04_Entity.md](../02_Characters_Entities/CharactersEntities.md) |
| Inventaire, items, équipement, persistance | [05_Inventory.md](../03_Progression_Inventory/ProgressionInventory.md) |
| Progression cachée, quêtes, unlocks | [06_Progression_Quests.md](../03_Progression_Inventory/ProgressionInventory.md) |
| Environnement, météo, cycle jour/nuit | [07_Environment_Weather.md](../04_World_Environment/WorldEnvironment.md) |
| Terrain procédural, biomes, grottes | [08_Terrain.md](../04_World_Environment/WorldEnvironment.md) |
| Eau, flottabilité, nage | [09_Water.md](../04_World_Environment/WorldEnvironment.md) |
| Interactions, containers, portes, portails | [10_Interactions.md](../05_Interaction_UI/InteractionUI.md) |
| Interface utilisateur, HUD, dialogues UI | [11_UI.md](../05_Interaction_UI/InteractionUI.md) |
| GameMode, Controllers, Input, Framework | [12_GameFramework.md](../07_GameFramework_Plugins/FrameworkPlugins.md) |
| Backend OWS, microservices, API, SQL | [13_OWS_Backend.md](../08_Backend_OWS/BackendOWS.md) |
| Entités, dialogues, lore, conditions | [14_Entity_Dialogues.md](../02_Characters_Entities/CharactersEntities.md) |
| Plugins, configuration .ini, SQL, packaging | [15_Plugins_Config.md](../07_GameFramework_Plugins/FrameworkPlugins.md) |

---

## 9. Changelog

### 2026-04-07/08 — Character System Cleanup & Source Reorganization

#### BP_PlayerCharacter_CE Cleanup
- BP_PlayerCharacter_CE entierement nettoye : toute la logique migree en C++, 0 variables / 0 fonctions restantes
- `UHWCharacterCustomComponent` supprime du projet (code mort)

#### Character Assets Reorganization
- Assets personnage reorganises dans `Content/Assets/Characters/HW/` (4472 assets total) :
  - `HW/Base/` — meshes corps de base, materiaux, animations
  - `HW/CharacterParts/` — pieces d'habillement : meshes, materiaux, textures, DataAssets
  - `HW/Armor/` — 3588 assets ex-ROG Modular Armor (meshes/materiaux/textures uniquement)
  - `HW/DataTables/`, `HW/Structures/`, `HW/Enumerations/`
- Dossier `CharacterEditorModify` supprime (editor widgets, studio BPs, save games)
- Blueprints ROG Modular Armor supprimes (seuls les assets mesh/material/texture conserves)

#### Configuration Fixes
- `DefaultEngine.ini` : CoreRedirects UDS corriges (etaient inverses)
- `DefaultGame.ini` : OWS `CustomerGUID` configure

#### Login System
- Widget de login desormais cree en C++ (`AHWLoginPlayerController::BeginPlay`)

#### Gameplay Fixes
- `GA_SprintStart` : variable `Sprint Fly Speed` manquante corrigee

#### C++ Additions
- `SetupNameplate()` — creation nameplate en C++
- `TeleportToClosestRespawn()` — teleportation au respawn le plus proche
- `SprintFlySpeed` — vitesse de sprint en vol ajoutee
- Visibilite de l'arc geree dans `Tick()`
- Ciblage (targeting) gere dans `Tick()`

---

*Ce document est genere a partir de l'audit complet de la codebase HybeliorWorld (361 fichiers C++ client + ~50 fichiers C# backend) effectue le 4 avril 2026. Mis a jour le 8 avril 2026. Il doit etre mis a jour a chaque milestone significatif.*
