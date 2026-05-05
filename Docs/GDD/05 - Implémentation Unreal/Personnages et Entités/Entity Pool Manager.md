---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# EntityPoolManager

Singleton `AHWEntityPoolManager` — pool global d'entites reutilisables. Reduit les couts de spawn en maintenant un pool d'entites desactivees reactivables a la volee.

## Architecture

```
AHWEntitySpawner (niveau)
    v Detecte joueur (sphere 500 unites)
    v
AHWEntityPoolManager (singleton)
    v GetPooledEntity() -> AHWGASEntityCharacter
         v
    AHWAIController (voir [[AI Controller]])
```

Voir [[Entity Spawner]] et [[HW GAS Entity Character]].

## InitializePool()

Parametres :
- `InitialPoolSize = 50` entites pre-allouees

> **Bug :** Spawn initial a `FVector::ZeroVector` (0,0,0). Les 50 entites apparaissent a l'origine du monde au demarrage.

> **Incoherence pool size :** C++ `InitialPoolSize = 50` vs BP_EntityPoolManager configure a 10 instances. La valeur BP ecrase la C++ au spawn.

## GetPooledEntity()

Cherche la premiere entite avec `!IsActorTickEnabled()`.
Si pool epuise → spawn dynamique (pas de limite max).

> **Incoherence :** pas de limite max sur le pool dynamique → creation infinie possible si pool epuise.

## ActivateEntity(Entity, Location)

```cpp
SetNetDormancy(DORM_Awake)
SetActorLocation(Location)
SetActorEnableCollision(true)
SetActorHiddenInGame(false)
SetActorTickEnabled(true)
AIPerceptionComp->SetSenseEnabled(Sight/Hearing, true)
InitializeEntity()  // Appel lifecycle
```

Voir [[HW GAS Entity Character]] pour le lifecycle `InitializeEntity()`.

## DeactivateEntity(Entity)

```cpp
SetActorEnableCollision(false)
SetActorHiddenInGame(true)
SetActorTickEnabled(false)
SetNetDormancy(DORM_DormantAll)
AIPerceptionComp->SetSenseEnabled(Sight/Hearing, false)
ResetEntity()  // Appel lifecycle
```

## Systeme de loot (UHWLootTable)

### FHWLootEntry

```cpp
FGameplayTag ItemTag;
float DropChance = 0.1f;         // [0.0-1.0]
int32 MinQuantity, MaxQuantity;
int32 MinPlayerLevel;
FGameplayTag HiddenConditionTag;  // Drops secrets
FGameplayTag RarityTag;           // Common, Rare, etc.
```

### UHWLootTable (DataAsset)

```cpp
FGameplayTag LootTableID;
TArray<FHWLootEntry> Entries;
int32 GuaranteedDropCount = 1;    // Min drops
int32 MaxDropCount       = 5;      // Max drops
```

`RollLoot(PlayerLevel, LuckMultiplier)` → retourne `TArray<FHWLootResult>`.

> **Bug :** dans `EntityDead()`, `KillerLevel` utilise `EntityLevel` au lieu du niveau du joueur tueur.

## Blueprint

| Classe C++ | Blueprint | Chemin |
|-----------|-----------|--------|
| AHWEntityPoolManager | BP_EntityPoolManager | /Game/Entity/ |

## Incoherences / memory leak potentiel

- `RespawnQueue` jamais videe si level unload
- `Replication controller` manquante pour SimulatedProxy → workaround `PostInitializeComponents` fragile
- `LastLocationSeen` mis a jour au spawn seulement (tracking obsolete)

## Voir aussi

- [[HW GAS Entity Character]] — `TSubclassOf<AHWGASEntityCharacter> EntityClass` (`HWEntityPoolManager.h:26`) et pool `TArray<AHWGASEntityCharacter*> EntityPool` (`HWEntityPoolManager.h:29`) ; `ActivateEntity(Entity, SpawnLocation)` et `DeactivateEntity(Entity)` (`HWEntityPoolManager.h:35-38`) declenchent les BlueprintNativeEvent `InitializeEntity()` / `ResetEntity()` de l'entite.
- [[Entity Spawner]] — le spawner decouvre ce singleton via `UGameplayStatics::GetAllActorsOfClass(this, AHWEntityPoolManager::StaticClass(), Found)` dans `AHWEntitySpawner::BeginPlay` (`HWEntitySpawner.cpp:45`) puis relaie les appels `GetPooledEntity()` / `ActivateEntity()` / `DeactivateEntity()` depuis ses RPC serveur.
- [[AI Controller]] — au cours de `ActivateEntity()` / `DeactivateEntity()`, les sens Sight/Hearing sur `Entity->AIPerceptionComp` (`AHWGASEntityCharacter::AIPerceptionComp`, declare `HWGASEntityCharacter.h:43`) sont bascules en meme temps que `CachedAIController->ActivateEntityAI()` / `DeactivateEntityAI()` appeles dans `InitializeEntity_Implementation`.
- [[Loot System]] — la `UHWLootTable* LootTable` portee par chaque entite est consommee dans `AHWGASEntityCharacter::EntityDead_Implementation` via `LootTable->RollLoot(KillerLevel, 1.0f)` (`HWGASEntityCharacter.cpp:226`), lifecycle declenche a la sortie du pool par ce manager.
