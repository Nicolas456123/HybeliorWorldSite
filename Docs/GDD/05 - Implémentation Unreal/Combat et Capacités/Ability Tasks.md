---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# AbilityTasks

Tasks custom HybeliorWorld qui étendent les capacités des [[Gameplay Ability]] : multi-traces timés, attentes d'événements de mouvement, target actors cone.

## Sources

- `HWAT_WaitMultiTraceForTargets.h` / `.cpp`
- `AbilityTask_WaitLanded.h` / `.cpp`
- `HWATA_ConeTrace.h` / `.cpp` (target actor)

## UHWAT_WaitMultiTraceForTargets

Exécute plusieurs traces avec timing précis via `FTraceStep`.

### FTraceStep

```cpp
float StartTimeInSeconds;                      // Quand déclencher
TSubclassOf<UGameplayEffect> AssociatedGE;     // GE à appliquer aux cibles
int32 CollisionShape;                          // 0=Sphere (seul implémenté), 1=Capsule, 2=Box
float Radius;                                  // Rayon
FVector OffsetFromOrigin;                      // Offset relatif
bool bCanHitSelf;
int32 MaxNumberOfTargetsToHit;
bool bDisabled;
bool bDebug;
```

### Delegates

```cpp
FWaitMultiTraceForTargetsDelegate ValidData;    // (TargetData, bStoppedOnFirstHit)
FWaitMultiTraceForTargetsFinishedDelegate Finished;
```

> **Note** : `PerformTrace()` (ligne 109) ne gère que `CollisionShape == 0` (Sphere). Capsule et Box sont déclarés dans la struct mais non routés.

Le DataHolder pour ces tasks est `UHWGameplayAbility_TraceSteps` (voir [[Gameplay Ability]]).

## UAbilityTask_WaitLanded

Bind `LandedDelegate` du `CharacterMovementComponent`. Gère le cas client replay (`bClientUpdating`).

Utilisé par `GA_ApplyFallingDamage` pour déclencher des dégâts de chute.

## AHWATA_ConeTrace (TargetActor)

Target actor filtrant un cône à partir d'une sphère overlap.

```cpp
float HalfAngle;       // Demi-angle du cône (degrés)
FVector ForwardVector; // Direction
float Radius;          // Rayon de la sphère (hérité)
```

**Logique** : Sphere Overlap + filtre angulaire post-overlap.

> **Note performance** : Une sphère complète est tracée, puis les acteurs hors du cône sont filtrés. Pour les cônes étroits, une SweepTrace directionnelle serait plus efficace.

## Voir aussi

- [[Gameplay Ability]] — `UHWGameplayAbility_TraceSteps` (`HWGameplayAbility_TraceSteps.h:16`) dérive de `UHWGameplayAbility` et expose `TArray<FTraceStep> TraceSteps` (`.h:22`) consommée par la fonction factory `UHWAT_WaitMultiTraceForTargets::WaitMultiTraceForTargets(UGameplayAbility* OwningAbility, ..., TArray<FTraceStep> TraceSteps, ...)` (`HWAT_WaitMultiTraceForTargets.h:74`) ; `UGameplayAbility*` sert d'`OwningAbility` pour toutes les tasks (`UHWAbilityTask_WaitLanded::WaitLanded`, `HWAbilityTask_WaitLanded.h:24`).
- [[Gameplay Effect]] — `FTraceStep::AssociatedGameplayEffect` est un `TSubclassOf<UGameplayEffect>` (`HWAT_WaitMultiTraceForTargets.h:33`) destiné à être appliqué sur les cibles retournées par le callback `OnTargetDataReadyCallback(FGameplayAbilityTargetDataHandle, bool)` (`.h:83`).
