---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MapUI

`UHWMapWidget` — in-game map widget (UMG).

File: `Source/HybeliorWorld/Public/UI/Panels/HWMapWidget.h` — C++ base for `UW_Map1`.

## Parameters

| Property | Type | Description |
|----------|------|-------------|
| `MapMPC` | `UMaterialParameterCollection*` | `PlayerPosition` MPC pushed each tick |
| `Zoom` | `float` | Zoom level (default 1.0) |
| `MapDimension` | `float` | World extents represented (default 20480 UU — hardcoded, known incoherence) |

## Behaviour

`NativeTick` feeds the player XY into the `PlayerPosition` MPC so the map material can position the icon and crop the view.

The material bound to `UImage MapImage` samples the MPC to place the player icon and scroll the view.

See [[Material Instances]] for related material assets.

## Player icon

Pure-BP widget `UI_PlayerIcon` — rotates each Tick to match the player's Yaw. Shown on top of the minimap.

## BP binding

| C++ class | Widget BP | Path |
|-----------|-----------|------|
| UHWMapWidget | UW_Map / UW_Map1 | /Game/UI/ |

## Voir aussi
- [[Material Instances]] — `UHWMapWidget::MapMPC` est le MPC `PlayerPosition` documenté dans MaterialInstances ; poussé chaque tick via `NativeTick` pour alimenter le matériau de la minimap (HWMapWidget.h:28-37).
- [[Inventory UI]] — `AHWPlayerController::ToggleMap()` et `ToggleMainMenu()` (HWPlayerController.h:549/553) partagent le même flow d'ouverture/fermeture des widgets (carte vs menu/inventaire).
