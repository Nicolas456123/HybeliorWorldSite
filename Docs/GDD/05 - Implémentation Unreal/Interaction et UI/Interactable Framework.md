---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InteractableFramework

Base contract shared by all manually-interactable actors in HybeliorWorld. Implemented in C++ at `Source/HybeliorWorld/Public/Interaction/Interactable.h`.

## Architecture

```
IInteractable (interface)
├── AHWContainer   (loot chests/crates)
├── AHWDoor        (zone travel doors)
└── ASupplyPod     (single-use supply pods)

AHWPortal (auto-overlap travel — does NOT implement IInteractable)
ADynamicContentManager (spawns from DataTable FHWInteractableDataTableRow)
```

## IInteractable (Interface)

| Method | Behaviour |
|--------|-----------|
| `Interact()` | Entry point for player interaction (C++ body empty — implemented in BP) |
| `GetInteractableGUID()` | **Returns a NEW `FGuid::NewGuid()` on every call** (default) |
| `SetInteractableGUID(FGuid)` | No-op by default |

## FHWInteractableDataTableRow

```cpp
FGuid InteractableGUID;
FTransform InteractableTransform;
TSubclassOf<AActor> InteractableToSpawn;
bool bIsPlayerInstanced;
```

Used by [[Dynamic Content Manager]] to spawn interactables from DataTables at runtime.

## Persistence API on AHWPlayerController

FastArray serializers track which containers / supply pods a given player has already opened:

```cpp
struct FHWSupplyPodOpenedItem : FFastArraySerializerItem { FGuid SupplyPodGUID; };
struct FHWSupplyPodMaster : FFastArraySerializer { TArray<FHWSupplyPodOpenedItem> SupplyPods; };

struct FHWContainerOpenedItem : FFastArraySerializerItem { FGuid ContainerGUID; };
struct FHWContainerMaster : FFastArraySerializer { TArray<FHWContainerOpenedItem> Containers; };
```

Replicated `COND_OwnerOnly` (implicit for PlayerController).

### Exposed API

```cpp
bool IsSupplyPodOpened(FGuid SupplyPodGUID);
bool IsContainerOpened(FGuid ContainerGUID);
void AddSupplyPodToOpenedList(FGuid);
void AddContainerToOpenedList(FGuid);
FString SerializeSupplyPodsOpened() const;
FString SerializeContainersOpened() const;
void LoadSupplyPodsOpenedFromJSON(FString JSON);
void LoadContainersOpenedFromJSON(FString JSON);
void RefreshStateOfRelevantSuppplyPods();
void RefreshStateOfRelevantContainers();
```

## Full persistence cycle

```
Player interacts
    → [Client] Interact()
    → [Server] Server_OpenContainer / Server_OpenSupplyPod RPC
    → [Server] AddContainerToOpenedList(GUID)
    → [Network] FastArray Delta replication
    → [Client] OnRep_ContainersOpened()
    → RefreshStateOfRelevantContainers()
    → Per-container RefreshContainerState()
    → [BP] ContainerOpened() → animation + FX
    → [OWS] SerializeContainersOpened() → JSON save
```

## Known incoherences

| # | Severity | Issue |
|---|----------|-------|
| 1 | Red | `GetInteractableGUID()` default generates a new GUID on every call |
| 2 | Red (FIX REQUIRED) | `AHWContainer::IsContainerOpened()` calls `IsSupplyPodOpened()` (HWContainer.cpp:52) |
| 3 | Yellow | `AHWDoor::OnRep_InteractableGUID()` empty — GUID replicated for nothing |
| 4 | Green | `AHWPortal` intentionally skips `IInteractable` (auto-overlap design) |
| 5 | Green | All `Interact_Implementation()` empty — delegated to Blueprints |
| 6 | Green | `bIsCurrentlyOpen` never modified in C++ (Container) |
| 7 | Green | `ADynamicContentManager::Tick()` empty (`bCanEverTick=true` wasted) |
| 8 | Green | `AHWDoor::Tick()` empty (`bCanEverTick=true` wasted) |
| 9 | Yellow | No authority validation in `Interact_Implementation()` |
| 10 | Yellow | Different patterns between `RefreshContainerState()` and `RefreshSupplyPodState()` |

## Assets associés
- [[Interactable Blueprints]] — BP_BoxPortal, BP_Door, BP_DoorPortal, BP_Container, BP_SupplyPod01

## Voir aussi
- [[Containers]] — `AHWContainer` implémente `IHWInteractable` (HWContainer.h:12)
- [[Doors]] — `AHWDoor` implémente `IHWInteractable` (HWDoor.h:11)
- [[Supply Pods]] — `AHWSupplyPod` implémente `IHWInteractable` (HWSupplyPod.h:12)
- [[Portals]] — `AHWPortal` hérite `AActor` uniquement (n'implémente PAS l'interface, design overlap)
- [[Dynamic Content Manager]] — cast `IHWInteractable*` et appelle `SetInteractableGUID()` sur acteurs spawnés depuis `FHWInteractableDataTableRow`
- [[Player Controllers]] — `AHWPlayerController` tient les FastArrays de persistance (`IsSupplyPodOpened` / `IsContainerOpened`) consommés par les interactables
