---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# DynamicContentManager

`ADynamicContentManager` — actor that spawns all interactables of a level from a `UDataTable` at `BeginPlay()`, server-side only.

Files: `Source/HybeliorWorld/Public/Interaction/DynamicContentManager.h` / `Private/Interaction/DynamicContentManager.cpp`.
Asset: `Content/Interaction/DT_InteractablesToSpawn.uasset` (DataTable of `FHWInteractableDataTableRow`).

## Properties

```cpp
UDataTable* InteractablesToSpawn;   // Row type: FHWInteractableDataTableRow
```

## SpawnInteractables() [Server only, BeginPlay]

```cpp
for (Row in InteractablesToSpawn->GetRowMap())
{
    AActor* Actor = SpawnActor(ClassToSpawn, Transform);
    IInteractable* Interactable = Cast<IInteractable>(Actor);
    if (Interactable)
        Interactable->SetInteractableGUID(Row->InteractableGUID);
}
```

Each row of `FHWInteractableDataTableRow` (see [[Interactable Framework]]) provides:
- `InteractableGUID` — persistent identity
- `InteractableTransform` — placement
- `InteractableToSpawn` — class to instance
- `bIsPlayerInstanced` — per-player instancing flag

## Usage

1. Create / edit `DT_InteractablesToSpawn.uasset`, add one row per interactable.
2. Drop an `ADynamicContentManager` (or BP child) in the level.
3. Assign the DataTable to `InteractablesToSpawn`.
4. `SpawnInteractables()` fires automatically at `BeginPlay()`.

## BP binding

| Base class | Blueprint | Path | Notes |
|-----------|-----------|------|-------|
| ADynamicContentManager | HubWorldContentManager | /Game/Blueprints/World/ | BP is empty — spawn 100% driven from C++ |

`HubWorldContentManager` is the Hub World specialization; likely a trivial subclass assigned to `DT_InteractablesToSpawn`.

## Recommendation

`Tick()` is empty while `bCanEverTick=true` — **disable** ticking to save CPU.

## Voir aussi
- [[Interactable Framework]] — `#include "Interaction/HWInteractable.h"` ; cast `IHWInteractable*` + `SetInteractableGUID()` (HWDynamicContentManager.cpp:5,57-60) ; consomme `FHWInteractableDataTableRow`
- [[Containers]] — cible spawnable via `InteractableToSpawn`
- [[Supply Pods]] — cible spawnable via `InteractableToSpawn`
- [[Doors]] — cible spawnable via `InteractableToSpawn`
- [[Interactable Blueprints]] — BP enfants spawnés depuis `DT_InteractablesToSpawn`
