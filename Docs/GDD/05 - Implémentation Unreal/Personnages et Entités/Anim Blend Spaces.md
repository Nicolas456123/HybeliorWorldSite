---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# AnimBlendSpaces

Machine d'etats et blend spaces de l'Animation Blueprint, pilotes par les variables de [[Anim Instance]].

## Machine d'etats — UpdateMovementState

Implementee en C++ dans `UHWPlayerAnimInstance::UpdateMovementState()`. Les etats suivent une priorite decroissante (cascade `if / else if`).

### Priorites

```
1 ── Tag GAS: MovementState.Flying      -> Flying
2 ── Tag GAS: MovementState.Crouching   -> Crouch
3 ── Tag GAS: MovementState.Swimming    -> Swimming
4 ── bIsInAir && Velocity.Z > 0         -> Jumping  (bWasInAir=true)
5 ── bIsInAir && Velocity.Z <= 0        -> Falling  (bWasInAir=true)
6 ── !bIsInAir && bWasInAir             -> Landing  (bWasInAir=false)
7 ── !bIsInAir && GroundSpeed > 0       -> Moving
8 ── !bIsInAir && GroundSpeed == 0      -> Idle
Default                                  -> NoMovement
```

### Description des etats

#### Flying (1)
- Condition : ASC a `MovementState.Flying`
- Declencheur : `GA_FlyingStartClass`
- Annulation : `GA_FlyingStopClass`
- Particularite : priorite absolue

#### Crouch (2)
- Condition : ASC a `MovementState.Crouching`
- Declencheurs : `GA_CrouchClass` / `GA_UncrouchClass`

#### Swimming (3)
- Condition : ASC a `MovementState.Swimming`
- Declencheurs : `GA_SwimmingStartClass` / `GA_SwimmingStopClass`
- Liens : callbacks `OnEnteredWater` / `OnExitedWater` via [[Water Buoyancy|UHWBuoyancyComponent]]

#### Jumping (4)
- Condition : `bIsInAir == true` && `Velocity.Z > 0`
- Phase montante du saut

#### Falling (5)
- Condition : `bIsInAir == true` && `Velocity.Z <= 0`
- Phase descendante / chute libre (inclut `Velocity.Z == 0`)

#### Landing (6)
- Condition : `!bIsInAir && bWasInAir == true`
- Side effect : `bWasInAir = false`
- Etat transitoire — une seule frame logique

#### Moving (7)
- Condition : `!bIsInAir` && `GroundSpeed > 0`
- Couvre marche, course, sprint. Distinction marche/sprint geree par tags `MovementState.Walking/Running/Sprinting` disponibles dans l'Anim BP mais **non evalues** ici

#### Idle (8)
- Condition : `!bIsInAir` && `GroundSpeed == 0`
- Note : egalite stricte a `0.0f` peut ne jamais se verifier (friction residuelle). Preferer `bShouldMove` (seuil `3.f`) dans l'Anim BP

#### NoMovement (default)
- Etat d'initialisation ou situation imprevue

## Blend Spaces (cote BP)

Les blend spaces consomment les variables suivantes (exposees par [[Anim Instance]]) :

| Variable | Usage typique |
|----------|---------------|
| `GroundSpeed` | Speed axis (idle → walk → run → sprint) |
| `ForwardBackwardMovement` | Axe Y (strafe) |
| `LeftRightMovement` | Axe X (strafe) |
| `AimOffsetYaw` / `Pitch` | Aim offset blend spaces |
| `SmoothedAimOffsetYaw` / `Pitch` | Version lissee (preferee) |

### Assets BP typiques

Blend spaces listes dans [[Anim BP Catalog]] :
- `BS_Unarmed_WalkRun`
- `BS_Locomotion` (Manny/Quinn)
- Variantes par stance (`Combat.Set.Bow`, etc.)

## Anim BP principale

`AB_HWMannequin` (BP, `/Game/Assets/`) utilise `UHWPlayerAnimInstance` comme parent C++. Contient :
- State Machine principale (Idle/Moving/Air/Crouch/Swim/Fly)
- Blend spaces de locomotion
- Aim Offset blend
- Slots pour les montages (voir [[Animation Montages]])

## Variables Blueprint supplementaires

Le Blueprint peut ajouter :
- `bAccelerating` / `bAcceleratingLast` (declares en C++ mais non calcules nativement)
- Variables de combat additionnelles
- Calculs d'inertia pour transitions douces

## Voir aussi

- [[Anim Instance]] — expose les variables `GroundSpeed`, `ForwardBackwardMovement`, `LeftRightMovement`, `Velocity` (`HWPlayerAnimInstance.h:59-68`) lues par les BlendSpaces ; `UpdateMovementState()` pilote les transitions de la State Machine decrites ici.
- [[Animation Montages]] — `bIsMontagePlaying` (`HWPlayerAnimInstance.h:118`) expose par l'AnimInstance gate les transitions vers/depuis les slots de montages listes dans la State Machine.
- [[Anim Instance]] — les variables `LeftFootLastDown` / `LeftPlantLastFrame` / `RightPlantLastFrame` (`HWPlayerAnimInstance.h:107-114`) alimentees via les sync markers `WalkRun/LeftDown` et `WalkRun/RightDown` servent a choisir l'animation de stop et serviront a un futur Foot IK.
- [[Anim BP Catalog]] — AB_HWMannequin et ABP_Player sont les AnimBlueprints qui consomment concretement cette State Machine et ces BlendSpaces ; AB_HWMannequin a `UHWPlayerAnimInstance` pour parent C++.
