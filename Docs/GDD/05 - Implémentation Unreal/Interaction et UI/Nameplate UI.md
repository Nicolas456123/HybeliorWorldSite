---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# NameplateUI

Character / mob floating nameplate, rendered in world space.

## UHWEntityNameplateWidget

HP text + health bar + level + combat-state TileView.

- `RefreshSource()` is BP-callable — historically needed manually, now wired from C++.

## UHWEntityNameplateWidgetComponent

3D widget component attached to the actor.

## Setup flow (C++)

**[2026-04-07]** `AHWGASPlayerCharacter::SetupNameplate()` (called during `BeginPlay`) wires the widget to the owning character — no more manual `RefreshSource()` needed.

## Pure-BP companions

- `PlayerNamePlateWidget` — Audiowide-Regular font; `txtPlayerName`, `txtLevel`.

## BP binding

| C++ class | Widget BP | Path |
|-----------|-----------|------|
| UHWEntityNameplateWidget | MobNameplate WBP | /Game/Assets/ or /UI/HUD/ |

## Voir aussi
- [[HW GAS Player Character]] — `SetupNameplate()` appelé depuis `BeginPlay` wire le widget au character ; `OwningHWGASCharacter` lit `CombatStateDisplayItems` dans `RefreshSource()` ; hub domaine 02 (routed via HWGASPlayerCharacter — couvre HWGASCharacter/Nameplate)
- [[HUD]] — `AHWHUD` (rendu 2D Canvas) — complémentaire du nameplate world-space
- [[HUD Widgets]] — catalogue des widgets HUD dont MobNameplate / PlayerNamePlateWidget
