---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# WaterSwimming

> Nage + noyade du personnage joueur. Source : `Source/HybeliorWorld/Public/Water/HWSwimmingComponent.h/.cpp`

`UHWSwimmingComponent` gère la nage, la noyade et les effets Niagara associés. Monté sur `AHWGASPlayerCharacter`.

## Paramètres vitesse

| Paramètre | Défaut |
|-----------|--------|
| SwimMaxSpeed | 300.0 UE/s |
| SwimFastMaxSpeed | 600.0 UE/s |
| SwimmingBuoyancyForceMultiplier | 0.03 |
| Immersion | 100.0 UE |
| SwimUpLimiter | 10.0 |
| SurfaceLockedSwimmingLimiter | 50.0 |

## Noyade (Drowning)

| Paramètre | Défaut |
|-----------|--------|
| DrowningEnabled | true |
| DrowningTimeWarningInSeconds | 7s |
| DrowningTimeDeathInSeconds | 5s (après warning) |

**Total avant mort** : 12s (7s warning + 5s death phase)

## Effets Niagara

| Effet | Socket | Note |
|-------|--------|------|
| HeadBubblesEffect | "head_Socket" | Arrêt si SwimFast |
| RightFootBubblesEffect | "foot_r_Socket" | Arrêt si SwimFast |
| LeftFootBubblesEffect | "foot_l_Socket" | Arrêt si SwimFast |
| SwimFastTrailEffect | "swim_fast_trail_Socket" | + son |

### Systèmes Niagara BP

| Système Niagara BP | Socket | Condition |
|-------------------|--------|-----------|
| NS_Head_Bubbles | head_Socket | Nage, non-SwimFast |
| NS_Foot_Bubbles | foot_r_Socket, foot_l_Socket | Nage, non-SwimFast |
| NS_SwimFast_Trail | swim_fast_trail_Socket | SwimFast=true + son |

## Events

```cpp
OnStartSwimming, OnStopSwimming
OnUnderwaterEnter, OnUnderwaterExit, OnUnderwaterTask(int32 SecondsUnderwater)
OnStartDrowning, OnStopDrowning, OnDrowningTask(int32 SecondsDrowning), OnDrownDeath
```

## Réplication réseau (complète)

```cpp
// Server-validated + NetMulticast_*
Server_SurfaceLockedSwimming(bool Value)
Server_SwimFast(bool Value)
Server_SwimUpOrDown(bool Value, double AxisValue)
Server_LookUp(double AxisValue)
Server_MoveForwardBackward(double AxisValue)
Server_MoveLeftRight(double AxisValue)
```

Chaque input client passe par un RPC Server validé, puis NetMulticast pour broadcast aux autres clients.

## Flux état nage

```
Personnage entre dans AHWWaterVolume
    ↓
OnEnteredWater → UHWSwimmingComponent.StartSwimming()
    ↓
CharacterMovement.MovementMode = MOVE_Swimming
    ↓
Niagara bubbles spawn aux sockets
    ↓
Si tête sous eau > 7s → OnStartDrowning + warning UI
    ↓
Si tête sous eau > 12s → OnDrownDeath (GameplayEvent kill)
    ↓
Si sort de l'eau → StopSwimming + stop Niagara
```

## Incohérence

- #13 : `EnterExitWaterTolerance = -35.0` hardcodé, non documenté (marge détection entrée/sortie d'eau).

## Voir aussi

- [[Water Buoyancy]] — `UHWSwimmingComponent` s'abonne à `OceanBuoyancyComponent->OnEnteredWater / OnExitedWater`
- [[Infinite Ocean]] — `TObjectPtr<AHWWaterParent> HWWater` / `AHWWaterVolume` (cf. AHWInfiniteOcean)
- [[HW GAS Player Character]] — monté côté joueur (emplacement logique avec OceanBuoyancyComponent)
