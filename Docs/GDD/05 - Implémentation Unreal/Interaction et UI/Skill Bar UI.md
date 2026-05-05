---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# SkillBarUI

`HWSkillBarComponent` (actor component on PlayerController) + `HWSkillBarWidget` (visual).

## Slot data

10 slots, each with:

| Field | Description |
|-------|-------------|
| `AssignedAbility` | GameplayAbility reference |
| `AbilityTag` | `FGameplayTag` identifying the ability |
| `Icon` | Slot icon texture |
| `CooldownDuration` | Max cooldown (seconds) |
| `ResourceCost` | Cost in mana / stamina |
| `KeybindText` | Displayed key hint |

JSON serialization for persistence (per-character skill bar layout).

## Cooldown loop

- Tick interval: 50 ms (~20 Hz)
- Reads `ASC->GetCooldownTimeRemainingAndDuration()` from GAS (see [[Gameplay Ability]])
- Broadcasts `OnCooldownStarted(SlotIndex, Duration)` — C++ multicast delegate

## UI flow

```
UHWSkillBarComponent::UpdateCooldowns()   [C++, tick 50ms]
    → reads GAS ASC cooldowns
    → OnCooldownStarted.Broadcast(SlotIndex, Duration)   [C++ delegate]
        → AbilityCooldownsWidget::OnCooldownStarted()    [BlueprintImplementableEvent]
            → BP cooldown sweep animation
```

## Minimal base in C++

`UHWSkillBarWidget::RefreshSlot()` is intentionally minimal — the BP subclass `WBP_SkillBar` overrides for actual rendering.

## BP binding

| C++ class | Widget BP | Path |
|-----------|-----------|------|
| (pure BP) | AbilityCooldownsWidget | /Game/UI/HUD/ |
| UHWSkillBarWidget | WBP_SkillBar | /Game/UI/HUD/ |

## Voir aussi
- [[Ability System Component]] — `UpdateCooldowns()` interroge `ASC->GetActiveEffectsTimeRemainingAndDuration()` + `TryActivateAbilityByClass()` (HWSkillBarComponent.cpp:162,248) + lecture `GetCooldownTags()` sur CDO `UGameplayAbility` ; hub domaine 01 (routed via AbilitySystemComponent — couvre GameplayAbility)
- [[HW GAS Character]] — owner attendu du component ; `GetHWAbilitySystemComponent()` utilisé pour cacher l'ASC (HWSkillBarComponent.cpp:56-60)
- [[Input Actions]] — IA pressées par l'utilisateur appellent `ActivateSlot()` sur le component
- [[HUD]] — `WBP_SkillBar` est ajouté au viewport par-dessus l'`AHWHUD`
