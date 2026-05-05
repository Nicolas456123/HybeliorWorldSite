---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# QuestTrackerUI

`UHWQuestTrackerWidget` — lightweight quest tracker shown in the HUD.

## Configuration

- `MaxDisplayedQuests`: 5

## Events (BlueprintImplementableEvent)

| Event | Trigger |
|-------|---------|
| `OnQuestAdded` | New quest enters the tracker |
| `OnObjectiveUpdated` | Any objective progress change |
| `OnQuestCompleted` | Quest marked complete |
| `OnQuestDiscovered` | Hidden-quest discovery — fired from `HandleQuestDiscovered`, bound to `UHWQuestComponent::OnQuestDiscovered` |

The C++ `RefreshActiveQuests()` is intentionally minimal — the BP subclass `WBP_QuestTracker` overrides for real rendering.

## BP binding

| C++ class | Widget BP | Path |
|-----------|-----------|------|
| UHWQuestTrackerWidget | WBP_QuestTracker | /Game/UI/ |

## Voir aussi
- [[Dialogue UI]] — `UHWDialogueWidget` partage le même pattern d'écoute d'un composant joueur (`UHWDialogueComponent`) avec bind/unbind dans `NativeConstruct`/`NativeDestruct`, miroir exact de `UHWQuestTrackerWidget` sur `UHWQuestComponent` (HWQuestTrackerWidget.h:57-58).
