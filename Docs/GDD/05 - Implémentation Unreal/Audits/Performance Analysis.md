---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# D02 — Analyse de Performance : HybeliorWorld

**Date d'audit :** 2026-04-04  
**Périmètre :** `HybeliorWorld_5.4/Source/` (361 fichiers .h/.cpp)  
**Moteur :** Unreal Engine 5.4 — contexte MMO serveur dédié + clients

---

## Table des matières

1. [Tick() non vides — inventaire et fréquence](#1-tick-non-vides)
2. [Timers (SetTimer) — fréquence, looping, thread](#2-timers-settimer)
3. [Boucles imbriquées et complexité O(n²)](#3-boucles-imbriquees-et-complexite-on²)
4. [SpawnActor en runtime sans pool](#4-spawnactor-en-runtime-sans-pool)
5. [CreateDefaultSubobject appelés dynamiquement](#5-createdefaultsubobject-dynamiques)
6. [LoadSynchronous et LoadObject bloquants](#6-loadsynchronous-et-loadobject-bloquants)
7. [FAutoDeleteAsyncTask — risques et patterns](#7-fautodeletetasyncasync)
8. [Synthèse et priorités](#8-synthese-et-priorites)

---

## 1. Tick() non vides

### Inventaire complet

| Classe | Fichier | Fréquence estimée | Contenu actif |
|---|---|---|---|
| `AHWGASPlayerCharacter` | `Character/HWGASPlayerCharacter.cpp:531` | 60 Hz (par joueur) | HasMatchingGameplayTag x3, SizeSquared, SetVisibility, lambda flying-check |
| `AHWEnvironmentManager` | `Environment/HWEnvironmentManager.cpp:470` | 60 Hz (serveur + éditeur) | Smooth client time, debug log timer, calcul RealSecondsPerGameHour, DayOfYear loop |
| `UHWPropertyCache` | `Environment/HWPropertyCache.cpp:16` | 60 Hz | 3 boucles d'interpolation (Floats, Colors, Vectors) |
| `AHWSeasons` | `Environment/HWSeasons.cpp:11` | **2 Hz** (TickInterval=0.5) | AdvanceSeason() |
| `AHWGASCharacter` | `Character/HWGASCharacter.cpp:72` | 60 Hz | Corps **vide** — Super::Tick() uniquement |
| `AHWCharacter` | `Character/HWCharacter.cpp:44` | 60 Hz | Corps **vide** — Super::Tick() uniquement |
| `ADynamicContentManager` | `Interaction/DynamicContentManager.cpp:29` | 60 Hz | Corps **vide** — Super::Tick() uniquement |
| `AHWDoor` | `Interaction/HWDoor.cpp:124` | 60 Hz | Corps **vide** — Super::Tick() uniquement |
| `AHWFakeProjectile` | `AbilitySystem/HWFakeProjectile.cpp:101` | 60 Hz | Corps **vide** — Super::Tick() uniquement |
| `AHWGameState` | `Game/HWGameState.cpp:49` | 60 Hz | Boucle décroissante sur ActiveWorldEvents (Authority seulement) |
| `AHWWeatherOverrideVolume` | `Environment/Weather/HWWeatherOverrideVolume.cpp:61` | 60 Hz (auto-désactivation si non-RandomVariation) | Weighted random weather selection |
| `AHWTerrainDeformation` | `Terrain/HWTerrainDeformation.cpp:21` | **4 Hz** (TickInterval=0.25) | Healing loop sur ActiveDeformations |
| `AHWTerrainManager` | `Terrain/HWTerrainManager.cpp:373` | 60 Hz | ClipmapSystem update + dispatch async tasks + collect results + CollisionSystem update |
| `AHWInfiniteOcean` | `Water/Actors/HWInfiniteOceanActor.cpp:246` | 60 Hz | Corps **vide** (délégué à Super) |
| `AHWWaterParent` | `Water/Actors/HWWaterParentActor.cpp:346` | 60 Hz | Corps **vide** (délégué à Super) |
| `UHWBuoyancyComponent` | `Water/Components/HWBuoyancyComponent.cpp:155` | Variable (`BuoyancyUpdateInterval`) | ApplyBuoyancyToMesh + ApplyFlowToMesh (physique par pontoon) |

### Problèmes identifiés

#### P1.1 — Ticks vides inutiles (FAIBLE → MOYEN selon le nombre d'instances)

**Fichiers :** `HWGASCharacter.cpp:72`, `HWCharacter.cpp:44`, `DynamicContentManager.cpp:29`, `HWDoor.cpp:124`, `HWFakeProjectile.cpp:101`, `HWInfiniteOceanActor.cpp:246`, `HWWaterParentActor.cpp:346`

**Impact :** Chaque `AActor` avec `bCanEverTick = true` est inscrit dans le `FTickTaskSequencer` d'UE5 et est appelé chaque frame, même si le corps est vide. Avec N instances d'entites ou de portes, le coût s'accumule (overhead de dispatch, cache misses sur la vtable).

**Recommandation :**
```cpp
// Dans le constructeur de chaque classe concernée :
PrimaryActorTick.bCanEverTick = false;
// Si la classe parent en a besoin, surcharger dans le constructeur enfant uniquement.
```

---

#### P1.2 — `AHWGASPlayerCharacter::Tick` — 3 appels `HasMatchingGameplayTag` par frame

**Fichier :** `Character/HWGASPlayerCharacter.cpp:542–603`

**Impact :** `HasMatchingGameplayTag` traverse le conteneur de tags du `FGameplayTagCountContainer` chaque appel. 3 appels × 60 Hz × N joueurs = surcharge croissante. Les blocs `DoOnce` limitent partiellement les effets secondaires, mais l'évaluation reste exécutée chaque frame.

**Recommandation :** Abonner ces transitions à `OnGameplayTagChanged` (delegate GAS). Les blocs `bWeaponShowDoOnce` / `bWeaponHideDoOnce` / `bFlyingCheckDoOnce` deviennent alors des handlers d'événement — plus de Tick nécessaire pour ces features. Utiliser `SetActorTickEnabled(false)` une fois les bindings en place.

---

#### P1.3 — `AHWEnvironmentManager::Tick` — calcul DayOfYear en Tick

**Fichier :** `Environment/HWEnvironmentManager.cpp:542–560` (boucle `DaysInMonth`)

**Impact :** Une boucle de 12 éléments s'exécute à 60 Hz. Coût minimal en isolation, mais ce gestionnaire tourne aussi en mode éditeur, et le calcul est identique frame après frame tant que la date ne change pas.

**Recommandation :** Cacher le `DayOfYear` calculé et ne le recalculer que sur `OnRep_ReplicatedDate` ou quand `UDSConfig.Time.Year/Month/Day` change (comparer avec la valeur précédente avant de refaire le calcul).

---

#### P1.4 — `UHWPropertyCache::Tick` — boucles d'interpolation non throttlées

**Fichier :** `Environment/HWPropertyCache.cpp:16`

**Impact :** 3 boucles indépendantes sur des tableaux de taille variable (Floats, Colors, Vectors) à 60 Hz. Si l'EnvironmentManager instancie ce cache avec de nombreuses entrées, le coût devient perceptible. Pas de sortie anticipée globale si toutes les valeurs sont déjà à leur cible.

**Recommandation :** Ajouter un compteur `bAnyDirty` mis à true quand `SetFloat/Color/Vector` est appelé, remis à false en fin de Tick si tout est interpolé. Appeler `SetComponentTickEnabled(false)` quand `!bAnyDirty`.

---

#### P1.5 — `AHWTerrainManager::Tick` — dispatch et collecte async à 60 Hz

**Fichier :** `Terrain/HWTerrainManager.cpp:373`

**Impact :** Sain dans sa conception, mais la vérification de `AsyncGenerator->GetPendingCount()` et `CollectCompletedResults()` implique un accès à un `TArray` partagé entre threads sans mutex visible. Voir aussi section 7.

**Recommandation :** Acceptable, mais réduire le `TickInterval` à 0.1s (10 Hz) — le terrain ne nécessite pas une mise à jour par frame. Vérifier la thread-safety de `PendingResults` (section 7).

---

## 2. Timers (SetTimer)

### Inventaire complet

| Classe | Fichier (ligne approx.) | Intervalle | Looping | Thread | Usage |
|---|---|---|---|---|---|
| `AHWAIController` | `Entity/Controllers/HWAIController.cpp:57` | 0.5s | oui | GameThread | `UpdateBlackboardValues()` |
| `UHWComboComponent` | `Combat/HWComboComponent.cpp:130` | `ComboWindowDuration` (variable) | non | GameThread | Expiration fenêtre combo |
| `AHWEntitySpawner` | `Entity/Spawning/HWEntitySpawner.cpp:67` | `PlayerCheckInterval` (variable) | oui | GameThread | `CheckForPlayerPresence()` |
| `AHWEntitySpawner` | `Entity/Spawning/HWEntitySpawner.cpp:206` | `RespawnDelay` (variable) | non | GameThread | `RespawnMob()` |
| `AHWEntitySpawner` | `Entity/Spawning/HWEntitySpawner.cpp:245` | `NextRespawnDelay` (variable) | non | GameThread | `RespawnMob()` (2ème path) |
| `AHWGASPlayerCharacter` | `Character/HWGASPlayerCharacter.cpp:799` | 0.5s | non | GameThread | Reset `bSwitchWeaponDoOnce` |
| `AHWPlayerController` | `Game/HWPlayerController.cpp:96` | 10s | oui | GameThread | `RunPersistenceData()` |
| `AHWPlayerController` | `Game/HWPlayerController.cpp:293` | 300s (5 min) | oui | GameThread | `SaveAllProgression()` |
| `AHWPlayerController` | `Game/HWPlayerController.cpp:1458` | 10s | non | GameThread | Persist OftenChangeCharacterData + inventaires |
| `AHWGameMode` | `Game/HWGameMode.cpp:39` | `GetCharactersOnlineIntervalInSeconds` | oui | GameThread | `GetAllCharactersOnline()` |
| `AHWGameMode` | `Game/HWGameMode.cpp:44` | `UpdateServerStatusEveryXSeconds` | oui | GameThread | `UpdateNumberOfPlayers()` |
| `AHWGameMode` | `Game/HWGameMode.cpp:49` | `SaveIntervalInSeconds` | oui | GameThread | `HWSaveAllPlayerLocations()` |
| `AHWFakeProjectile` | `AbilitySystem/HWFakeProjectile.cpp:38` | `LifeTime` (variable) | non | GameThread | Autodestruction projectile |
| `UHWSwimmingComponent` | `Water/Components/HWSwimmingComponent.cpp:938` | variable | selon usage | GameThread | Logique nage |
| `UHWSwimmingComponent` | `Water/Components/HWSwimmingComponent.cpp:1002` | variable | selon usage | GameThread | Logique nage (2ème path) |
| `AHWWaterVolume` | `Water/Actors/HWWaterVolumeActor.cpp:261` | variable | selon usage | GameThread | Logique volume eau |

> Tous les timers utilisent le `FTimerManager` du GameThread (comportement standard UE5). Aucun timer hors-thread détecté.

### Problèmes identifiés

#### P2.1 — `AHWPlayerController` : double timer de persistence (10s loop + 10s one-shot)

**Fichier :** `Game/HWPlayerController.cpp:96` et `:1458`

**Impact :** Le timer à 10s looping (`RunPersistenceData`) lance à son tour un one-shot à 10s, soit une latence totale de ~20s pour persister les données après une action. Plus problématique : si `RunPersistenceData` est appelé alors que le one-shot précédent est encore en attente, un second one-shot est créé, écrasant le handle et perdant potentiellement une mise à jour. Le handle `PersistChangeDelayTimer` n'est pas vérifié avant d'être réutilisé.

**Recommandation :** Vérifier `GetWorldTimerManager().IsTimerActive(PersistChangeDelayTimer)` avant de créer le one-shot. Considérer un seul timer à 15s avec logique séquentielle interne.

---

#### P2.2 — `AHWAIController` : timer Blackboard actif même si l'entite est en dormance réseau

**Fichier :** `Entity/Controllers/HWAIController.cpp:57`

**Impact :** Avec un grand nombre d'entites actives (AHWEntityPoolManager peut spawner des centaines d'entites), chaque `HWAIController` possède un timer 0.5s looping. Si les mobs ne sont pas en `DORM_DormantAll` quand le joueur est loin, ces timers tournent inutilement.

**Recommandation :** Vérifier que le timer est bien nettoyé dans `OnUnPossess()` (c'est fait — ligne 70), mais s'assurer aussi que l'AI est correctement dépossédée quand l'entite passe en dormance réseau (`SetNetDormancy(DORM_DormantAll)`).

---

#### P2.3 — `AHWEntitySpawner::CheckForPlayerPresence` : `GetOverlappingActors` dans un timer looping

**Fichier :** `Entity/Spawning/HWEntitySpawner.cpp:91–105`

**Impact :** `GetOverlappingActors` effectue une requête sur le `PhysicsScene` ou l'`OverlapManager` d'UE5 à chaque tick de timer. Si `PlayerCheckInterval` est court (< 1s) et que le nombre de spawners est élevé, le coût s'accumule.

**Recommandation :** Utiliser les callbacks d'overlap (`OnComponentEndOverlap`) plutôt qu'un polling. L'événement de sortie `OnPlayerExitSphere` existe déjà mais ne fait rien — c'est là que la logique de désactivation devrait se trouver.

---

## 3. Boucles imbriquées et complexité O(n²)

### P3.1 — `HWTerrainCollisionSystem::UpdateCollision` — double boucle O(n²) sur les chunks

**Fichier :** `Terrain/HWTerrainCollisionSystem.cpp:67–110`

**Complexité :** O(DesiredPositions × ActiveChunks) pour la suppression, puis O(DesiredPositions × ActiveChunks) pour la vérification d'existence. Avec `CollisionGridSize = 5`, DesiredPositions = 25 et ActiveChunks ≤ 25, soit 625 comparaisons × 2 = 1 250 per-frame (appelé depuis le Tick du TerrainManager).

```cpp
// Bloc problématique (ligne 68–101) : deux for imbriqués sur les mêmes tableaux
for (int32 i = ActiveChunks.Num() - 1; i >= 0; --i)
{
    bool bStillNeeded = false;
    for (const FVector2D& Pos : DesiredPositions)  // O(n²)
    { ... }
}
for (const FVector2D& Pos : DesiredPositions)
{
    bool bAlreadyExists = false;
    for (const FHWCollisionChunk& Chunk : ActiveChunks)  // O(n²)
    { ... }
}
```

**Impact :** Moyen en l'état (n≤25), mais si `CollisionGridSize` augmente, le coût explose quadratiquement.

**Recommandation :** Utiliser un `TSet<FIntPoint>` ou `TMap<FIntPoint, FHWCollisionChunk*>` keyed sur la position snappée pour des lookups O(1) :
```cpp
TMap<FIntPoint, int32> ChunkIndexMap; // rebuild à chaque UpdateCollision
```

---

#### P3.2 — `FHWMarchingCubes::Generate` — triple boucle + TMap lookup par vertex

**Fichier :** `Terrain/Cave/HWMarchingCubes.cpp:362–500`

**Complexité :** O(Resolution³) pour l'évaluation du champ SDF, puis O(Resolution³ × 8) pour la marche des cubes, avec un `TMap<FIntVector, int32>` `Find/Add` par vertex généré (vertex welding). La complexité totale est O(n³ × log n) dans le pire cas.

**Impact :** Élevé en runtime si `MarchingGridResolution` est grand. Ce calcul s'exécute dans `BeginPlay` de `AHWTerrainCaveManager::GenerateAllCaveMeshes()` — synchrone sur le GameThread.

**Recommandation :**
- S'assurer que `GenerateAllCaveMeshes()` est appelé via un `FAutoDeleteAsyncTask` ou un `AsyncTask(ENamedThreads::AnyBackgroundHiPriTask, ...)`.
- Limiter `MarchingGridResolution` à des valeurs ≤ 32 pour les zones non visibles.
- Considérer le précalcul offline (bake des meshes de grottes en éditeur).

---

#### P3.3 — `HWTerrainSDF::EvaluateShapeList` — boucle linéaire appelée O(n³) fois

**Fichier :** `Terrain/Cave/HWTerrainSDF.cpp` (appelée depuis `HWMarchingCubes.cpp:368`)

**Impact :** Pour chaque point de grille (Resolution+1)³, le SDF évalue **toutes** les shapes de la zone. Avec 10 shapes et Resolution=32, cela représente 33³ × 10 = 359 370 évaluations SDF. Chaque évaluation de `EvaluateBox` inclut une rotation inverse (`FRotator::GetInverse().RotateVector`).

**Recommandation :** Précalculer les rotations inverses hors de la boucle. Utiliser un BVH ou un BoundingBox test pour court-circuiter les shapes dont la bounding box ne couvre pas le point évalué.

---

#### P3.4 — `AHWGameState::AddWorldEvent` — recherche linéaire pour doublon

**Fichier :** `Game/HWGameState.cpp:92–99`

**Impact :** Faible actuellement (peu d'events actifs), mais `FString` comparison dans une boucle. Utiliser un `TSet<FString>` ou `TMap<FString, FHWActiveWorldEvent>` pour O(1).

---

## 4. SpawnActor en runtime sans pool

### Inventaire

| Localisation | Fichier (ligne approx.) | Classe spawnée | Contexte |
|---|---|---|---|
| `AHWEntityPoolManager::GetPooledMob` | `Entity/Spawning/HWEntityPoolManager.cpp:82` | `AHWGASMobCharacter` | **Fallback pool épuisée** — spawn dynamique |
| `AHWEntityPoolManager::InitializePool` | `Entity/Spawning/HWEntityPoolManager.cpp:53` | `AHWGASMobCharacter` | BeginPlay — acceptable |
| `ADynamicContentManager::SpawnInteractables` | `Interaction/DynamicContentManager.cpp:49` | `AActor` (générique) | BeginPlay — acceptable |
| `AHWEnvironmentManager::InitializeEnvironment` | `Environment/HWEnvironmentManager.cpp:1435` | Acteur environnement | Init — acceptable |
| `AHWHybeliorWorldData` | `Terrain/HWHybeliorWorldData.cpp:342,379` | `AHWTerrainSettlement`, `AHWTerrainPOI` | Chargement monde — acceptable si unique |
| `AHWTerrainManager` | `Terrain/HWTerrainManager.cpp:65,85,114,135,155,244,303` | Multiples managers | `EnsureInitialized()` — one-shot, acceptable |

### Problèmes identifiés

#### P4.1 — `AHWEntityPoolManager::GetPooledMob` — SpawnActor en fallback runtime

**Fichier :** `Entity/Spawning/HWEntityPoolManager.cpp:75–90`

**Impact :** Si la pool est épuisée pendant le gameplay, un `SpawnActor` synchrone sur le GameThread est déclenché. `SpawnActor` pour un `AHWGASMobCharacter` implique : allocation mémoire, construction des composants (ASC, AIPerceptionComp, EntityNameplateWidgetComponent, etc.), BeginPlay, registration physics, réseau. Coût typique : 2–15 ms selon la machine.

**Recommandation :** Augmenter `InitialPoolSize` avec une marge confortable. Implémenter une **pré-expansion asynchrone** : quand la pool descend sous un seuil (ex: 20%), spawner des entites supplémentaires en arrière-plan via `AsyncTask` et les ajouter en dormance. Loguer un warning pour tracker les cas de pool vide.

---

#### P4.2 — `AHWHybeliorWorldData` — multiples SpawnActor dans une boucle

**Fichier :** `Terrain/HWHybeliorWorldData.cpp:331–385`

**Impact :** Les settlements et POIs sont spawnés dans une boucle de chargement. Si le nombre de settlements est élevé (le lore mentionne 12 continents avec de nombreuses agglomérations), cette boucle peut causer un pic de stutter au chargement.

**Recommandation :** Étaler les spawns sur plusieurs frames via un timer ou une `TQueue` traitée à raison de N spawns par tick.

---

## 5. CreateDefaultSubobject dynamiques

**Verdict global : AUCUN problème critique détecté.**

Tous les `CreateDefaultSubobject` identifiés sont appelés dans des constructeurs de classe (pattern valide UE5). Il n'existe pas d'appel hors constructeur dans le code source.

### Observations

- **`AHWGASPlayerCharacter`** : 14 `USkeletalMeshComponent` (Chest, Pants, Cloak, Helms, Boots, Head, Hairstyle, Shoulders, Sword_Mesh, Shield_Mesh, Bow, Weapon, Shield + base) créés à la construction. Coût de construction élevé, mais c'est le pattern standard pour la customisation de personnage. S'assurer que tous ces composants ont leur `SetRelativeTransform` correctement configuré et que les composants non utilisés ont `SetVisibility(false)` plutôt que d'être détruits.

- **`UHWDamageGameplayEffect`** : `CreateDefaultSubobject<UTargetTagRequirementsGameplayEffectComponent>` — pattern correct pour les GE UE5.4.

---

## 6. LoadSynchronous et LoadObject bloquants

### Inventaire par criticité

#### CRITIQUE — LoadSynchronous dans une boucle ou appelé fréquemment

| Fichier | Ligne approx. | Asset | Contexte |
|---|---|---|---|
| `UI/Elements/HWInventoryEntry.cpp:117` | 117 | `ItemIcon` (UTexture2D) | `UpdateUI()` — appelé à chaque refresh d'entrée d'inventaire |
| `UI/Elements/HWCombatStateIconEntry.cpp:12` | 12 | `ItemIcon` (UTexture2D) | Initialisation widget état de combat |
| `Water/Components/HWSwimmingComponent.cpp:688` | 688 | `BubblesMaterial` | Entrée dans l'eau |
| `Water/Components/HWUnderwaterComponent.cpp:179,247` | 179, 247 | `BubblesEffect`, `BubblesMaterial` | Init composant underwater |

#### ÉLEVÉ — LoadSynchronous massif à l'init (HWWaterRuntimeSettings)

**Fichier :** `Water/HWWaterRuntimeSettings.cpp:217–392`

**30+ appels `LoadSynchronous()`** pour charger meshes, matériaux, sons, effets Niagara, render targets. Ces appels se font probablement à l'accès du singleton `GetDefault<UHWWaterRuntimeSettings>()` depuis `AHWInfiniteOcean`.

**Impact :** Si ce singleton est accédé plusieurs fois ou sur différents threads, les `LoadSynchronous` bloquent le thread appelant. En runtime, cela peut provoquer des freeze de plusieurs centaines de millisecondes lors de l'initialisation de la première étendue d'eau.

#### ÉLEVÉ — LoadObject de Niagara Systems dans `InitializeEnvironment`

**Fichier :** `Environment/HWEnvironmentManager.cpp:1196–1204`

5 appels `LoadObject<UNiagaraSystem>()` conditionnels. Protégés par `if (!RainNiagaraSystem)`, donc appelés une seule fois. Acceptable si `InitializeEnvironment` s'exécute sur le GameThread pendant le chargement, pas pendant le gameplay actif.

#### MOYEN — LoadObject de courbes et matériaux dans `HWSkySurfaceRenderer`

**Fichier :** `Environment/HWSkySurfaceRenderer.cpp:66–93`

11 appels `LoadObject` (UCurveFloat, UCurveLinearColor). Contexte : probablement `BeginPlay` ou `Initialize`. Acceptable si one-shot, mais ces assets devraient être déclarés comme `TSoftObjectPtr` et référencés dans le DataAsset de configuration.

### Problèmes détaillés

#### P6.1 — `HWInventoryEntry::UpdateUI` — LoadSynchronous par entrée d'inventaire

**Fichier :** `UI/Elements/HWInventoryEntry.cpp:117`

**Impact :** Chaque fois qu'une entrée d'inventaire est affichée ou mise à jour, l'icône est chargée de manière synchrone. Si l'inventaire contient 50 items et que le joueur ouvre rapidement le panneau, 50 `LoadSynchronous` s'exécutent en rafale sur le GameThread, provoquant un freeze perceptible (20–200 ms selon le nombre de textures non chargées).

**Recommandation :**
```cpp
// Remplacer par un chargement asynchrone avec callback :
ItemIcon.RequestAsyncLoad([WeakThis = TWeakObjectPtr<UHWInventoryEntry>(this), Item](void)
{
    if (UHWInventoryEntry* Self = WeakThis.Get())
    {
        Self->IconImage->SetBrushFromTexture(Cast<UTexture2D>(Item->Data.ItemIcon.Get()));
    }
});
```
Utiliser `UAssetManager::GetStreamableManager().RequestAsyncLoad()` ou `UHWAssetManager::LoadAsset()` déjà présent dans le projet.

---

#### P6.2 — `HWWaterRuntimeSettings` — 30+ LoadSynchronous au premier accès

**Fichier :** `Water/HWWaterRuntimeSettings.cpp:217–392`

**Impact :** Freeze garanti à la première initialisation de l'océan. En MMO, si un joueur change de zone et découvre pour la première fois une zone maritime, le freeze sera visible.

**Recommandation :** Convertir en chargement asynchrone dans `UHWWaterRuntimeSettings::PostLoad()` ou utiliser un `FStreamableManager::RequestAsyncLoad` groupé. À minima, s'assurer que ces assets sont inclus dans le bundle de chargement de la zone (Primary Asset Bundle).

---

#### P6.3 — `HWGASPlayerCharacter::SetupPlayerInputComponent` — LoadSynchronous dans une boucle

**Fichier :** `Character/HWGASPlayerCharacter.cpp:175`

**Impact :** `Pair.Config.LoadSynchronous()` dans une boucle sur `DefaultInputConfigs`. Appelé lors de `SetupPlayerInputComponent` (au moment de la possession du pawn). Pour un seul joueur local c'est marginal, mais en contexte MMO avec repossession fréquente, vérifier que la boucle ne contient pas plus de 2–3 configs.

**Recommandation :** Pré-charger les configs d'input lors du chargement de la zone via `FStreamableManager::RequestAsyncLoad`, avant que le joueur ne prenne le contrôle.

---

## 7. FAutoDeleteAsyncTask

### Inventaire

| Fichier | Ligne | Task | Thread cible |
|---|---|---|---|
| `Terrain/Generation/HWTerrainAsyncGenerator.cpp:208` | 208–212 | `FHWTerrainGenerationTask` | `AnyBackgroundHiPriTask` (via `StartBackgroundTask()`) |

### Analyse

#### P7.1 — Dangling pointers dans `ActiveTasks`

**Fichier :** `Terrain/Generation/HWTerrainAsyncGenerator.cpp:246–258`

`FAutoDeleteAsyncTask` se supprime lui-même à la fin de `DoWork()`. Le tableau `ActiveTasks` contient des raw pointers `FAutoDeleteAsyncTask<FHWTerrainGenerationTask>*` qui peuvent être **déjà détruits** au moment où `CancelAll()` est appelé.

Le code le commente lui-même :
```cpp
// FAutoDeleteAsyncTask deletes itself on completion, so the raw pointers in
// ActiveTasks may already be dangling. We cannot safely call methods on them.
// TODO: Consider switching to FAsyncTask (non-auto-delete) so we can safely
// call EnsureCompletion() and manually delete.
```

**Impact :** Lors d'`EndPlay` ou d'un changement de zone, si des tâches sont en cours et que `CancelAll()` est appelé, les pointeurs dans `ActiveTasks` sont potentiellement corrompus. Risque de crash difficile à reproduire.

**Recommandation :** Migrer vers `FAsyncTask<FHWTerrainGenerationTask>` (non-auto-delete), stocker dans un `TArray<TUniquePtr<FAsyncTask<...>>>`, et appeler `EnsureCompletion()` avant destruction. Le commentaire TODO dans le code source confirme cette intention.

---

#### P7.2 — Absence de limit sur les tâches concurrentes

**Fichier :** `Terrain/HWTerrainManager.cpp:390`

Le throttle `AsyncGenerator->GetPendingCount() < MaxLODLevels` est correct. Cependant, `MaxLODLevels` n'est pas visible dans ce contexte — vérifier que sa valeur par défaut ne permet pas de saturer le thread pool UE5 (`FQueuedThreadPool::GetNumQueuedJobs()`).

**Recommandation :** Plafonner explicitement à `FTaskGraphInterface::Get().GetNumWorkerThreads() / 2` pour ne jamais saturer le thread pool et impacter les tâches de streaming ou de physique.

---

#### P7.3 — `FHWTerrainGenerationTask::DoWork` — accès à `TSharedPtr` depuis un background thread

**Fichier :** `Terrain/Generation/HWTerrainAsyncGenerator.cpp:19–31`

`Result` est un `TSharedPtr<FHWTerrainGenerationResult>`. Le flag `Result->bComplete` est écrit depuis le background thread (ligne 30) et lu depuis le GameThread dans `CollectCompletedResults()` (ligne 221). Sans `std::atomic<bool>` ou `FThreadSafeCounter`, c'est une **data race** potentielle sur architectures avec reordering mémoire (ARM/Apple Silicon).

**Recommandation :** Remplacer `bool bComplete` par `TAtomic<bool>` ou `std::atomic<bool>` dans `FHWTerrainGenerationResult`.

---

## 8. Synthèse et priorités

### Tableau de criticité

| ID | Problème | Criticité | Effort | Impact Runtime |
|---|---|---|---|---|
| P7.3 | Data race sur `bComplete` (async terrain) | **CRITIQUE** | Faible | Crash potentiel |
| P7.1 | Dangling pointers `FAutoDeleteAsyncTask` | **CRITIQUE** | Moyen | Crash à EndPlay |
| P6.1 | `LoadSynchronous` dans UpdateUI inventaire | **ÉLEVÉ** | Faible | Freeze UI |
| P6.2 | 30+ `LoadSynchronous` Water HW au premier accès | **ÉLEVÉ** | Moyen | Freeze zone maritime |
| P4.1 | `SpawnActor` fallback pool entity épuisée | **ÉLEVÉ** | Moyen | Spike 5–15ms |
| P3.2 | Marching Cubes synchrone sur GameThread | **ÉLEVÉ** | Moyen | Freeze BeginPlay caves |
| P1.2 | 3x `HasMatchingGameplayTag` par frame/joueur | **MOYEN** | Faible | Scalabilité MMO |
| P2.3 | `GetOverlappingActors` polling dans timer | **MOYEN** | Faible | Coût physique |
| P3.1 | O(n²) chunks collision system | **MOYEN** | Faible | Futur si grid agrandie |
| P2.1 | Double timer persistence (race condition) | **MOYEN** | Faible | Perte donnée potentielle |
| P1.1 | Ticks vides non désactivés | **FAIBLE** | Très faible | Overhead dispatch |
| P1.3 | Calcul DayOfYear à 60 Hz | **FAIBLE** | Très faible | Négligeable |
| P6.3 | `LoadSynchronous` input configs loop | **FAIBLE** | Faible | Marginal |
| P3.4 | Recherche linéaire `AddWorldEvent` | **FAIBLE** | Très faible | Négligeable |

### Plan d'action recommandé (par sprint)

**Sprint 1 — Bugs de stabilité (1–2 jours)**
1. `P7.3` : Passer `bComplete` en `std::atomic<bool>` dans `FHWTerrainGenerationResult`
2. `P7.1` : Migrer `FAutoDeleteAsyncTask` vers `FAsyncTask` + `TUniquePtr`
3. `P2.1` : Ajouter `IsTimerActive()` check avant le second SetTimer dans RunPersistenceData

**Sprint 2 — Performance UI et chargement (2–3 jours)**
4. `P6.1` : Async load des icônes d'inventaire via `RequestAsyncLoad`
5. `P6.2` : Préchargement groupé Water HW dans le bundle de zone
6. `P4.2` : Étalement des SpawnActor HybeliorWorldData sur plusieurs frames

**Sprint 3 — Scalabilité MMO (3–5 jours)**
7. `P1.2` : Remplacement Tick par événements GAS (`OnGameplayTagChanged`)
8. `P4.1` : Pré-expansion asynchrone de la entity pool
9. `P2.3` : Remplacement polling `GetOverlappingActors` par callbacks overlap
10. `P3.2` : Déplacement Marching Cubes vers background thread

**Sprint 4 — Optimisations mineures**
11. `P3.1` : `TMap<FIntPoint>` pour la collision system
12. `P1.1` : Désactivation des Ticks vides
13. `P1.4` : Flag `bAnyDirty` dans HWPropertyCache

---

*Audit réalisé par analyse statique du code source. Les lignes indiquées sont approximatives (±5 lignes selon la version). Certains problèmes (notamment les data races) ne seront visibles qu'en environnement multi-thread sous charge MMO.*

---

## Voir aussi

- [[Cross System GAS Combat]] — décrit `HWElementalReactionSystem::ApplyReaction()` qui applique loose tags via ASC et peut déclencher des cycles `PostGameplayEffectExecute` pertinents pour l'anomalie P1.2 (3x `HasMatchingGameplayTag` dans `AHWGASPlayerCharacter::Tick`).
- [[Cross System Framework World]] — documente le lazy-spawn `AHWTerrainManager::GetEnvironmentSubsystem()` stocké en `AActor*` et `UHWWeatherInteractionComponent` avec FindActor au BeginPlay, en lien avec les SpawnActor de section 4 (HWTerrainManager.cpp:65,85,...).
- [[Network Replication Audit]] — anomalie NET-007 (`AHWTerrainDeformation::ActiveDeformations` non-delta, HWTerrainDeformation.cpp:18) corrélée à la logique Tick 4 Hz de section 1 de cet audit.
- [[Technical Debt Active]] — section 1.8 confirme le TODO `FAutoDeleteAsyncTask → FAsyncTask` (HWTerrainAsyncGenerator.cpp:255, HWTerrainAsyncGenerator.h:171) qui est l'anomalie P7.1 critique de cet audit perf.
