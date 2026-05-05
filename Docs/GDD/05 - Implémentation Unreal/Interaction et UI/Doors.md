---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Doors

`AHWDoor` — manually-triggered interactable that performs an OWS zone travel. Implements [[Interactable Framework]].

Files: `Source/HybeliorWorld/Public/Interaction/HWDoor.h` / `Private/Interaction/HWDoor.cpp`.
Blueprints: `Content/Interaction/BP_Door.uasset`, `BP_DoorPortal.uasset`.

## Properties

```cpp
FString ZoneName;              // OWS destination zone name
FVector StartingLocation;      // Spawn location in target zone
FRotator StartingRotation;     // Spawn orientation in target zone
FGuid InteractableGUID;        // REPLICATED — OnRep_InteractableGUID() is EMPTY
```

## TravelThroughDoor(AHWGASPlayerCharacter*) [Server only]

Validations:
- `HasAuthority()`, `ZoneName` non-empty, `Character` valid
- `!Character->GetIsTransferringBetweenZones()` (anti-double-trigger)

Sequence:
1. `SetIsTransferringBetweenZones(true)` + `StopMovementImmediately()`
2. `PlayerController->ShowLoadingScreen()`
3. `PlayerController->GetZoneServerToTravelTo(...)` [OWS RPC, `MapWithFewestPlayers` strategy]

The `IsTransferringBetweenZones` latch is cleared automatically — do NOT reset it client-side.

## BP binding

| Base class | Blueprint | Path | Notes |
|-----------|-----------|------|-------|
| AHWDoor | BP_Door | /Game/Interaction/ | Canonical child |
| AHWDoor | BP_DoorPortal | /Game/Interaction/ | Timeline Lerp + RPC_MovePlayer implemented in BP |

`BP_DoorPortal` historically had orphan duplicate variables (`New Location`, `New Rotation`, `ExposedOnSpawn`) with identical GUIDs triggering compile errors. Recheck the editor after `refactor/source-reorganization` migration.

## Recommendations

- `Tick()` is empty and `bCanEverTick=true` — **disable `bCanEverTick` to save CPU**.
- `OnRep_InteractableGUID()` is empty; either remove the RepNotify or actually use it.
- Add authority validation in `Interact_Implementation()`.

## Assets associés
- [[Interactable Blueprints]] — BP_DoorPortal (basé sur `HWDoor`) avec Timeline d'ouverture et RPC_MovePlayer

## Voir aussi
- [[Interactable Framework]] — implémente `IHWInteractable` (HWDoor.h:11)
- [[Portals]] — même sémantique zone-travel OWS (`GetZoneServerToTravelTo`, `MapWithFewestPlayers`) mais déclenché par overlap
- [[HW GAS Player Character]] — `TravelThroughDoor(AHWGASPlayerCharacter*)` lit/écrit `GetIsTransferringBetweenZones` et stoppe `CharacterMovement` (HWDoor.cpp:57-111)
- [[Player Controllers]] — cast `GetController<AHWPlayerController>()` + `OWSPlayerState` + `GetZoneServerToTravelTo(...)` / `ShowLoadingScreen()` (HWDoor.cpp:85-118) ; hub domaine 07 (routed via PlayerControllers — couvre ZoneTravel/LoginFlow)
- [[Interactable Blueprints]] — BP_Door, BP_DoorPortal (Timeline + RPC_MovePlayer)
