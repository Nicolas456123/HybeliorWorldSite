---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Portals

`AHWPortal` — automatic zone-travel volume. **Inherits `AActor` directly** (does NOT implement `IInteractable` — design intentional).

Files: `Source/HybeliorWorld/Public/Interaction/HWPortal.h` / `Private/Interaction/HWPortal.cpp`.
Blueprint: `Content/Interaction/BP_BoxPortal.uasset` (and `BP_DoorPortal.uasset` hybrid).

## Components

```cpp
UBoxComponent* BoxCollision;  // 100×100×100 default, ECC_Pawn Overlap
```

## Properties

```cpp
FString ZoneName;          // OWS destination zone
FVector StartingLocation;  // Spawn location in target
FRotator StartingRotation; // Spawn rotation in target
```

## Flow

```
BeginPlay() → BoxCollision.OnComponentBeginOverlap → OnBoxOverlap()
  → TravelThroughPortal(OtherActor)
     [HasAuthority check]
     → Cast<AHWGASPlayerCharacter>
     → CapsuleComponent->IsOverlappingActor(this)  (extra validation)
     → IsTransferringBetweenZones latch
     → SetIsTransferringBetweenZones(true)
     → StopMovementImmediately() + DisableMovement()
     → PlayerController->ShowLoadingScreen()
     → PlayerController->GetZoneServerToTravelTo(...)
```

The additional capsule overlap test avoids firing on collision proxies that touch the box but are not the pawn capsule itself.

Same OWS zone-travel semantics as [[Doors]] (`MapWithFewestPlayers` strategy, server-only, anti-double-trigger latch).

## BP binding

| Base class | Blueprint | Path | Notes |
|-----------|-----------|------|-------|
| AHWPortal | BP_BoxPortal | /Game/Interaction/ | Box volume, editor-configurable — used for tunnels, dungeon entrances, zone frontiers |
| AHWPortal / AHWDoor | BP_DoorPortal | /Game/Interaction/ | Hybrid; overlap OR manual Interact |

No BP logic on pure `BP_BoxPortal` — 100% C++ delegated.

## Assets associés
- [[Interactable Blueprints]] — BP_BoxPortal (basé sur `HWPortal`) — délégation C++ totale via overlap

## Voir aussi
- [[Interactable Framework]] — n'implémente PAS `IHWInteractable` (design : overlap pur)
- [[Doors]] — même flow OWS zone-travel (`GetZoneServerToTravelTo`, `MapWithFewestPlayers`) mais déclenché par `Interact()` manuel
- [[HW GAS Player Character]] — cast `Cast<AHWGASPlayerCharacter>`, vérif `GetCapsuleComponent()->IsOverlappingActor(this)` + `GetIsTransferringBetweenZones` (HWPortal.cpp:62-107)
- [[Player Controllers]] — `GetController<AHWPlayerController>()` + `GetPlayerState<AOWSPlayerState>()` + `GetZoneServerToTravelTo(...)` / `ShowLoadingScreen()` (HWPortal.cpp:83-114) ; hub domaine 07 (routed via PlayerControllers — couvre ZoneTravel)
- [[Interactable Blueprints]] — BP_BoxPortal (overlap C++ pur), BP_DoorPortal (hybride)
