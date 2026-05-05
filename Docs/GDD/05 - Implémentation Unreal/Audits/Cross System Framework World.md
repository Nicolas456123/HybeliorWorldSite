---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Cross-System — GameFramework, Environment & Terrain

Intégrations du GameFramework (GameMode, PlayerController, GameState) avec Environment et Terrain.

---

## GameFramework

### Fichiers analysés

- `Game/HWGameMode.h`
- `Game/HWGameState.h`
- `Game/HWPlayerController.h`
- `Game/HWAssetManager.h`

### GameMode → OWS

```
AHWGameMode extends AOWSGameMode
  │  HWSaveAllPlayerLocations()  ──► timer périodique, appelle OWS save
  │  StartPlay()                 ──► injecte les GE élémentaux dans HWCombatAttributeSet
  │  ApplyColdGameplayEffect / ApplyBurningGameplayEffect / ...  ──► TSubclassOf<UGameplayEffect>
```

**Mode** : Héritage OWSGameMode + injection de GEs
**Risque** : **MOYEN** — Le mécanisme d'injection des GEs depuis GameMode vers `HWCombatAttributeSet` n'est pas visible en header (probablement en .cpp). Si cette injection échoue, toutes les réactions élémentaires ne fonctionnent plus.

### PlayerController — Hub central

```
AHWPlayerController
  │  OWSPlayerControllerComponent  ──► persistence OWS
  │  BagInventory / EquipmentInventory: UHWInventoryComponent*
  │  GetHWAbilitySystemComponent()  ──► délègue au Character possédé
  │
  │  // Persistence OWS
  │  SaveWeaponMastery() / LoadWeaponMastery()
  │  SaveCharacterProgression() / LoadCharacterProgression()
  │  SaveSkillBar() / LoadSkillBar()
  │  SaveQuestProgress() / LoadQuestProgress()
  │  SaveAllProgression()  ──► agrège tous les saves
  │
  │  // Dialogue → Quest mediation
  │  HandleDialogueAction(ActionTag, ActionParameter)
  │
  │  // UI
  │  SetupHUD() / UpdateHealthBar() / UpdateManaBar() / UpdateStaminaBar()
  │  AddFloatingDamage()
  │  ToggleMainMenu() / ToggleMap()
  │
  │  // Travel
  │  Server_TravelToZone() / Server_TravelToDeadKingdom()  ──► Server RPC
```

**Mode** : Hub centralisé (God Object pattern — risque)
**Risque** : **FORT** — `AHWPlayerController` est un hub avec trop de responsabilités : persistence, UI, dialogue, travel, équipement. Toute modification d'un sous-système (ex: Quest) nécessite des changements dans ce fichier. Fort couplage.

> **Mise à jour 2026-04-07** : Un timer BeginPlay (0.2s delay) a été ajouté pour le setup nameplate + respawn teleport, afin de garantir que les composants soient initialisés avant ces opérations.

### GameState → Zones

```
AHWGameState
  │  ZoneName / ActivePlayerCount / bIsZoneOpen  ──► repliqués via OnRep
  │  ActiveWorldEvents: TArray<FHWActiveWorldEvent>
  │  OnWorldEventStarted / OnWorldEventEnded delegates
```

**Mode** : Replication standard + delegates
**Risque** : **FAIBLE** — Architecture propre.

### AssetManager

```
HWProgressionComponent::LoadUnlockDefinitions()  ──► UAssetManager::Get().LoadAssets(UHWUnlockDefinition)
HWQuestComponent::LoadQuestDefinitions()         ──► UAssetManager::Get().LoadAssets(UHWQuestData)
```

**Mode** : Async loading via AssetManager
**Risque** : **MOYEN** — Si les DataAssets ne sont pas déclarés dans `DefaultGame.ini` sous `[/Script/Engine.AssetManager]`, le loading échoue silencieusement. Les composants démarrent alors avec zéro définitions.

---

## Environment

### Fichiers analysés

- `Environment/HWEnvironmentManager.h`
- `Environment/HWEnvironmentTypes.h`
- `Environment/HWEnvironmentConfig.h`
- `Environment/Weather/HWWeatherInteractionComponent.h`
- `Environment/Weather/HWWeatherEffectsSystem.h`

### Environment → Terrain

```
AHWEnvironmentManager
  │  AHWTerrainManager* (forward declare)  ──► référencé pour biome queries
  │  HWTerrainBiomeMap include             ──► EHWBiomeType pour les biome ambiances
  │  FHWBiomeAmbianceSettings[]            ──► settings par biome (fog, light, wind, audio)
```

**Mode** : Appel direct vers TerrainManager
**Risque** : **FAIBLE** — Dépendance unidirectionnelle propre.

### Environment → Water

```
AHWEnvironmentManager
  │  UHWTerrainWaterBridge*  ──► pont vers Water pour sync météo/ocean
```

**Mode** : Bridge component
**Risque** : **FAIBLE** — Le système Water est intégré dans le module HybeliorWorld.

### Environment → Character (météo)

```
UHWWeatherInteractionComponent
  │  Placé sur: Character (ou tout Actor avec des pieds)
  │  WeatherEffects: TWeakObjectPtr<UHWWeatherEffectsSystem>  ──► localisé via FindActor au BeginPlay
  │  Tick: line trace vers le sol → détecte neige/puddle/poussière
  │  CompressDLWESnow() / RippleDLWEPuddle()  ──► appels vers WeatherEffectsSystem
```

**Mode** : Weak pointer + FindActor (find-by-class au BeginPlay)
**Risque** : **MOYEN** — `FindWeatherEffectsSystem()` itère tous les acteurs au BeginPlay. Si `AHWEnvironmentManager` n'est pas encore spawné (ordre de BeginPlay non garanti), le composant reste inactif sans erreur.

### Diagramme Environment

```
AHWEnvironmentManager
  ├── UHWTimeOfDaySystem          (soleil, lune, heure)
  ├── UHWWeatherEffectsSystem     (précipitation, particules)
  ├── UHWWeatherMPCManager        (Material Parameter Collection sync)
  ├── UHWSkySurfaceRenderer       (sky material)
  ├── UHWPropertyCache            (cache propriétés pour perf)
  ├── UHWTerrainWaterBridge  ──► Water
  └── AHWSeasons                  (saisons → biome ambiance transitions)

UHWWeatherInteractionComponent [sur Character]
  └──► WeatherEffects: TWeakPtr → UHWWeatherEffectsSystem
```

---

## Terrain

### Fichiers analysés

- `Terrain/HWTerrainManager.h`
- `Terrain/HWTerrainPCGDataProvider.h`
- `Terrain/HWTerrainGameplayZones.h`
- `Terrain/Biome/HWBiomeClassifier.h`
- `Terrain/HWTerrainWaterBridge.h`

### Terrain → Environment

```
AHWTerrainManager
  │  GetEnvironmentSubsystem()  ──► lazy-spawn AHWEnvironmentManager
  │  EnvironmentSubsystemActor: TObjectPtr<AActor>  ──► stored as raw AActor
```

**Mode** : Lazy spawn + soft downcast vers AActor
**Risque** : **MOYEN** — Le type est stocké comme `AActor*` et non `AHWEnvironmentManager*`. Chaque accès requiert un cast.

### Terrain → Water

```
AHWTerrainManager
  │  GetWaterSubsystem()  ──► lazy-spawn AHWTerrainWaterSystem
  │  HWTerrainWaterBridge  ──► sync heightmap terrain → Water waterplane
```

**Mode** : Lazy spawn + bridge Water
**Risque** : **FAIBLE** — Le système Water est intégré dans le module HybeliorWorld.

### Terrain → PCG

```
UHWTerrainPCGDataProvider
  │  QueryTerrainData(WorldLocation)  ──► FindTerrainManager(World) + GetHeightAtLocation()
  │  QueryTerrainDataGrid()           ──► batch sampling
  │  GetBiomesInArea()                ──► biome filtering pour PCG graphs
  │  IsValidPlacementLocation()       ──► filtrage placement PCG
```

**Mode** : Static function library, find-by-class
**Risque** : **FAIBLE** — Pattern correct pour intégration PCG.

### Terrain → Character (zones gameplay)

```
AHWTerrainGameplayZones
  │  POIs, entity areas, safe zones  ──► chevauchement avec Character
  │  (pas de header direct disponible dans la liste analysée)
```

**Mode** : Overlap volumes (supposé)

### Diagramme Terrain

```
AHWTerrainManager
  ├── UHWClipmapSystem          (LOD rings)
  ├── AHWClipmapRenderer        (ProceduralMesh rendering)
  ├── UHWTerrainAsyncGenerator  (génération background thread)
  ├── AHWTerrainCollisionSystem (collision near player)
  ├── UHWTerrainModificationLayer (modifications runtime)
  │
  ├── [lazy] AHWTerrainWaterSystem     ──► Water bridge
  ├── [lazy] AHWTerrainStructures      (villages, forts, routes)
  ├── [lazy] AHWTerrainGameplayZones   (POI, zones entity, safe zones)
  ├── [lazy] AHWTerrainCaveManager     (tunnels SDF + marching cubes)
  └── [lazy] AHWEnvironmentManager     ──► Environment system

UHWTerrainPCGDataProvider [BPFunctionLibrary]
  └──► FindTerrainManager() → GetHeightAtLocation() / GetBiomeAtLocation()
```

---

## Voir aussi

- [[Cross System Overview]] — classe `PlayerController (God Object)` en FORT et `WeatherInteraction → Environment` en MOYEN (FindActor au BeginPlay, ordre non garanti) dans le tableau global.
- [[Cross System Character Inventory]] — documente `AHWPlayerController::BagInventory/EquipmentInventory: UHWInventoryComponent*` traversés par `AHWGASPlayerCharacter::UpdateMeshEquipment()` et le timer BeginPlay 0.2s pour setup nameplate + respawn.
- [[Cross System Progression Quest]] — décrit `AHWPlayerController::HandleDialogueAction(ActionTag, ActionParameter)` comme mediator central pour résoudre `Action.AcceptQuest` → `HWQuestComponent::AcceptQuest()`.
- [[Cross System Circular Deps]] — identifie `HWProgressionComponent::AreConditionsMet()` qui doit localiser `UHWQuestComponent` par `GetOwner()->FindComponentByClass` (circulaire Quest↔Progression gérée par forward declare).
- [[Performance Analysis]] — section P1.3 chiffre le calcul `DayOfYear` dans `AHWEnvironmentManager::Tick` (HWEnvironmentManager.cpp:542–560) et section 4 liste les lazy-spawn dans `AHWTerrainManager::EnsureInitialized()` (HWTerrainManager.cpp:65,85,114,135,155,244,303).
- [[Network Replication Audit]] — section 1.7 confirme `AHWGameState` (`ZoneName`, `ActivePlayerCount`, `bIsZoneOpen`, `ActiveWorldEvents`) en `COND_None` et section 1.6 `AHWEnvironmentManager` avec 10 propriétés répliquées en `COND_None`.
