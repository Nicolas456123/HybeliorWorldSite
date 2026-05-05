---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Containers

`AHWContainer` — chests and loot crates implementing [[Interactable Framework]] (`IInteractable`).

Files: `Source/HybeliorWorld/Public/Interaction/HWContainer.h` / `Private/Interaction/HWContainer.cpp`.
Blueprint: `Content/Interaction/BP_Container.uasset`.

## Properties

```cpp
int32 LootTableID;
FGuid InteractableGUID;    // REPLICATED — OnRep_InteractableGUID
bool bIsCurrentlyOpen;     // ⚠️ Never modified in C++
UDataTable* ItemDataTable;
```

Replication: `bReplicates = true`, `DOREPLIFETIME(AHWContainer, InteractableGUID)`. Open state is driven server-side with an OnRep callback.

## BlueprintNativeEvents

| Method | C++ body | BP responsibility |
|--------|----------|-------------------|
| `Interact()` | empty | Delegates to BP to drive animation + call `Server_OpenContainer` |
| `ContainerOpened()` | empty | BP opens the lid / plays VFX |
| `ContainerClosed()` | empty | BP plays close animation |

Accessors: `IsContainerOpened()`, `RefreshContainerState()` (called after replication to resync).

## Open flow

1. `Interact()` → BP → `Server_OpenContainer()` [RPC]
2. Server: `AddContainerToOpenedList(GUID)` (see [[Interactable Framework]])
3. FastArray delta replication → `OnRep_ContainersOpened()`
4. `RefreshStateOfRelevantContainers()` → per-container `RefreshContainerState()`
5. BP: `ContainerOpened()` — animation + FX

## BP binding

| Base class | Blueprint | Path | Notes |
|-----------|-----------|------|-------|
| AHWContainer | BP_Container | /Game/Interaction/ | Canonical child |
| AHWContainer | BP_Door | /Game/Blueprints/World/ | ⚠️ Wrong parent class (should be `AHWDoor`) |

## Known bugs

- **FIX REQUIRED**: `AHWContainer::IsContainerOpened()` wrongly calls `HWPlayerController->IsSupplyPodOpened()` instead of `IsContainerOpened()` (HWContainer.cpp:52). Containers therefore check the supply-pod opened list — persistent open state is always stale client-side.
- **SetMaterial bug**: `BP_Container` calls `SetMaterial(index=2, Material=None)` on open → slot 2 material is cleared, producing a visual artefact.
- `bIsCurrentlyOpen` is declared but never written from C++ — all state flows through the GUID FastArray.

## Assets associés
- [[Interactable Blueprints]] — BP_Container, BP_Door, BP_SupplyPod01 dérivés de `HWContainer`

## Voir aussi
- [[Interactable Framework]] — implémente `IHWInteractable` (HWContainer.h:12)
- [[Supply Pods]] — sibling direct ; `IsContainerOpened()` appelle par erreur `IsSupplyPodOpened()` sur le PlayerController (HWContainer.cpp:52)
- [[Dynamic Content Manager]] — spawne les `AHWContainer` depuis `FHWInteractableDataTableRow` et pose le GUID
- [[Player Controllers]] — `AHWPlayerController::IsSupplyPodOpened()` consulté dans `IsContainerOpened()` (HWContainer.cpp:48-54)
- [[Interactable Blueprints]] — BP_Container, BP_Door (parent erroné), BP_SupplyPod01 dérivés
