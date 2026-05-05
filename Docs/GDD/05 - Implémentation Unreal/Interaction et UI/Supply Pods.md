---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# SupplyPods

`ASupplyPod` — single-use supply drop implementing [[Interactable Framework]] (`IInteractable`). Functionally a sibling of [[Containers]] with distinct persistence lists and BP events.

Files: `Source/HybeliorWorld/Public/Interaction/SupplyPod.h` / `Private/Interaction/SupplyPod.cpp`.
Blueprint: `Content/Interaction/BP_SupplyPod01.uasset`.

## Properties

```cpp
int32 LootTableID;              // Supply-pod specific loot table
FGuid InteractableGUID;         // REPLICATED
```

Helper: `RefreshSupplyPodState()` — resync after replication.

## BlueprintNativeEvents

| Method | Behaviour |
|--------|-----------|
| `Interact()` | C++ empty — BP drives |
| `SupplyPodOpened()` | C++ empty — BP animation / `SetMaterial` swap |
| `SupplyPodClosed()` | C++ empty — BP close |

## Differences vs AHWContainer

- Persistence list uses `FHWSupplyPodMaster` FastArray (distinct from containers).
- API: `IsSupplyPodOpened(FGuid)` — **correct, no bug on this side**.
- Single-use semantics: once opened, the GUID stays in the serialized list per-player.

## Opening flow

Same as [[Containers]] but via `Server_OpenSupplyPod` RPC → `AddSupplyPodToOpenedList`.

`BP_SupplyPod01` calls `SetMaterial(slot 2, newMaterial)` on open — produces the visual "cracked/open" look.

## BP binding

| Base class | Blueprint | Path |
|-----------|-----------|------|
| ASupplyPod | BP_SupplyPod01 | /Game/Blueprints/ or /Interactables/ |

## Voir aussi
- [[Interactable Framework]] — implémente `IHWInteractable` (HWSupplyPod.h:12)
- [[Containers]] — sibling, même pattern RefreshState/OnRep_InteractableGUID
- [[Dynamic Content Manager]] — spawne les `AHWSupplyPod` depuis `FHWInteractableDataTableRow`
- [[Player Controllers]] — `HWPlayerController->IsSupplyPodOpened(InteractableGUID)` (HWSupplyPod.cpp:54)
- [[Interactable Blueprints]] — BP_SupplyPod01 (override `SupplyPodOpened`, `SetMaterial` slot 2)
