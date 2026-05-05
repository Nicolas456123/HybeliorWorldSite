---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InventoryUI

Widgets for inventory, equipment paperdoll and entry tiles.

## UHWCommonInventoryListWidget

Grid layout — 4 items per line, filter by item type. ListView component is currently commented out in C++ but the class stays in use via its `InventoryComponent` property reference.

## UHWEquipmentWidget

16-slot paperdoll widget for the character's equipped items.

## UHWInventoryEntry (entry tile)

Icon + quantity + tooltip. Right-click menu is not implemented yet (known incoherence).

## Menus

### UHWMenuTabsWidget

- `SetActiveTab()`, `QuitToMenu()`, `QuitGame()`
- `PlayFadeIn()` / `PlayFadeOut()` (Blueprint)
- Toggled by `AHWPlayerController::ToggleMainMenu()` (HWPlayerController.h:549) and `ToggleMap()` (HWPlayerController.h:553).

## BP binding

| C++ class | Widget BP | Path |
|-----------|-----------|------|
| UHWEquipmentWidget | WBP_Equipment / BP_Equipment | /Game/UI/Inventory/ |
| UHWCommonInventoryListWidget | WBP_Inventory | /Game/UI/Inventory/ |
| UHWMenuTabsWidget | BP_MenuTabs | /Game/UI/ |

Pure-BP widgets (no C++ HW parent) in the ecosystem: `ResourceBarsHUDWidget` (HPBar, ManaBar, 3× StaminaBars), `AbilityCooldownsWidget` (references [[Skill Bar UI]] component).

## Assets associés
- [[UI Other Widgets]] — widgets d'inventaire (HWEquipmentWidget, HWCommonInventoryListWidget, InventoryButtonWidget)

## Voir aussi
- [[Skill Bar UI]] — `AbilityCooldownsWidget` (widget BP pur de l'écosystème inventaire/HUD) est couplé au `UHWSkillBarComponent` via `OnCooldownStarted` ; référencé explicitement dans le corps de page.
- [[Map UI]] — `AHWPlayerController::ToggleMap()` (HWPlayerController.h:553) est le pendant de `ToggleMainMenu()` (549) appelé par `UHWMenuTabsWidget` ; flux d'ouverture/fermeture UI symétrique.
