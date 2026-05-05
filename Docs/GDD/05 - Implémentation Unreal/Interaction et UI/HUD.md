---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# HUD

`AHWHUD` — custom HUD driven through `DrawHUD()` (2D Canvas, no UMG widget). Hosts floating damage text and the cooldown canvas.

## Floating Damage

Uses `FHWFloatingDamage`: text, alpha, scale, position, critical/healing flags.

Animation driven by curves:
- `FloatingDamageScaleCurve` — pop-then-shrink
- `FloatingDamageSpeedCurve` — vertical rise speed
- `FloatingDamageTextAlphaCurve` — fade out

Four colour categories: normal damage, critical damage, normal heal, critical heal — each with its own font + shadow + outline parameters (`FloatingDamageFont`, `FloatingCriticalDamageFont`, `FloatingHealingFont`, `FloatingCriticalHealingFont`, `FloatingDamageFontColor`, `FloatingDamageDropShadowColor`, `FloatingDamageOutlineColor`, `FloatingDamageMinimumDisplayTime`).

### Main function

```cpp
void AddFloatingDamageItem(
    FString DamageText,
    AActor* DamagedActor,
    FVector2D InitialDisplayLocationOffset,
    bool IsHealing = false,
    bool IsCritical = false,
    bool ShowDropShadow = false,
    bool ShowOutline = false
);
```

No object pool — each hit allocates a new struct. See [[Hit Flash]] for Niagara-side damage feedback.

## HUD stat LIVE replication (AHWPlayerController)

`HUDStatLIVE_RepCounter` (`int32`, `ReplicatedUsing=OnRep_HUDStatLIVEChanged`): server counter incremented via `IncrementHUDStatLIVE()`. The RepNotify triggers client-side refresh of stats-related widgets (HWPlayerController.h:575-586). The canonical way to push authoritative stat changes without directly replicating every stat.

## BP binding

| C++ class | BP | Path |
|-----------|-----|------|
| AHWHUD | BP_HUD | /Game/Game/ |

Cooldowns for Ability1 are hardcoded at the HUD layer (non-generic) — known incoherence.

## Assets associés
- [[HUD Widgets]] — widgets HUD (ResourceBars, AbilityCooldowns, Nameplates, UW_Map)
- [[UI Other Widgets]] — widgets Login, Inventory, CommonUI et HUD (vue d'ensemble élargie)

## Voir aussi
- [[Player Controllers]] — `HUDStatLIVE_RepCounter` + `OnRep_HUDStatLIVEChanged` définis dans `AHWPlayerController` (HWPlayerController.h:575-586)
- [[Hit Flash]] — feedback Niagara côté acteur, complémentaire au floating damage Canvas d'`AHWHUD`
- [[HUD Widgets]] — widgets overlay HUD (ResourceBars, AbilityCooldowns, Nameplates, Map)
- [[Skill Bar UI]] — `WBP_SkillBar` ajouté au viewport par-dessus l'`AHWHUD`
- [[Nameplate UI]] — `UHWEntityNameplateWidget` en world-space, rendu hors du Canvas HUD
