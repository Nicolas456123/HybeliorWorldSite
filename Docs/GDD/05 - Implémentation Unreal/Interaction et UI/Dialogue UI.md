---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# DialogueUI

`HWDialogueWidget` — renders dialogue nodes exposed by `HWDialogueComponent`.

## Bindings

Listens to the dialogue component delegates:

| Delegate | Payload |
|----------|---------|
| `OnDialogueNodeChanged` | Node text + choices |
| `OnDialogueEnded` | Dialogue session closed |

## Functions

- `ShowDialogueNode(SpeakerName, Text, Choices)` — main display entry
- `OnChoiceSelected(ChoiceIndex)` — forward player choice back to the component

The widget hosts the speaker name, body text, and a vertical list of choice buttons; the component handles branching and effects (quest triggers, GAS events, etc.).

## Voir aussi
- [[Quest Tracker UI]] — `UHWQuestTrackerWidget` écoute aussi `UHWQuestComponent` ; les deux widgets sont les deux consommateurs BP des delegates d'`UHWQuestComponent`/`UHWDialogueComponent` pour relayer vers l'UI.
