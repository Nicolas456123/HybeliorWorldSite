---
tags: [implementation, ue5, animation, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Anim Instance

Classe C++ `UHWPlayerAnimInstance` — pilote l'Animation Blueprint depuis le code natif. Chaque frame, interroge le `CharacterMovementComponent` et l'`AbilitySystemComponent` (GAS) pour calculer l'état de mouvement, la vitesse, la direction, et les paramètres d'aim offset.

> [!note] Section IK absorbée (V3.3)
> Le fichier `AnimIK.md` originalement séparé documentait que **aucun code IK natif** n'est présent dans les fichiers C++. Les 4 bool de préparation (`LeftFootLastDown`, `StopLeftFootLastDown`, `LeftPlantLastFrame`, `RightPlantLastFrame`) déclarés ici (`HWPlayerAnimInstance.h:107-114`) alimentent un futur Foot IK qui doit être implémenté **exclusivement dans l'Animation Blueprint** (`ABP_HWPlayer` ou équivalent). Les assets Control Rig template UE5 (`IK_Mannequin`, `CR_Mannequin_BasicFootIK`, `CR_Mannequin_Procedural`) sont disponibles mais non branchés. Pour une internalisation C++ future : ajouter `FVector LeftFootIKLocation/RightFootIKLocation` + `FRotator ...IKRotation`, calculer via line traces dans `NativeUpdateAnimation()`, exposer en `BlueprintReadWrite`.

## Hierarchie

```
UObject
  +-- UAnimInstance (Engine)
        +-- UHWPlayerAnimInstance (HYBELIORWORLD_API)
```

**Fichiers :**
- `Source/HybeliorWorld/Public/Character/HWPlayerAnimInstance.h`
- `Source/HybeliorWorld/Private/Character/HWPlayerAnimInstance.cpp`

**Dependances d'inclusion :**
- `Animation/AnimInstance.h` (UE5)
- `Character/HWGASCharacter.h` (cast Pawn owner)
- `AbilitySystem/HWGameplayTags.h` (tags GAS)
- `GameFramework/CharacterMovementComponent.h`
- `Kismet/KismetMathLibrary.h` (`VSizeXY`)

## Flux de donnees

```
AHWGASPlayerCharacter
  +-- USkeletalMeshComponent (GetMesh())
        +-- UHWPlayerAnimInstance
              +-- UCharacterMovementComponent  -> vitesse, vol, chute
              +-- UHWAbilitySystemComponent    -> tags MovementState.*
              +-- Courbes d'animation          -> MeleeTwist
                                                -> Sync Markers (WalkRun / LeftDown / RightDown)
```

Les montages d'attaque et de dodge sont joues via GAS (tasks `UAbilityTask_PlayMontageAndWait` et `AnimInstance::Montage_Play`), pas par l'AnimInstance elle-meme. Voir [[Animation Montages]].

## Enum EMovementState

```cpp
UENUM(BlueprintType)
enum class EMovementState : uint8
{
    NoMovement, Idle, Crouch, Falling,
    Jumping, Landing, Moving, Flying, Swimming
};
```

| Valeur | Condition |
|--------|-----------|
| `Flying` | Tag GAS `MovementState.Flying` actif (priorite max) |
| `Crouch` | Tag GAS `MovementState.Crouching` |
| `Swimming` | Tag GAS `MovementState.Swimming` |
| `Jumping` | `bIsInAir` && `Velocity.Z > 0` |
| `Falling` | `bIsInAir` && `Velocity.Z <= 0` |
| `Landing` | `!bIsInAir && bWasInAir` (transition) |
| `Moving` | Au sol, `GroundSpeed > 0` |
| `Idle` | Au sol, `GroundSpeed == 0` |
| `NoMovement` | Etat par defaut |

## Variables lues par l'Anim BP

### Locomotion (`EditAnywhere, BlueprintReadWrite`)

| Variable | Type | Description |
|----------|------|-------------|
| `Velocity` | FVector | Velocite 3D (`GetVelocity()`) |
| `ForwardBackwardMovement` | float | Dot(forward, velocity) |
| `LeftRightMovement` | float | Dot(right, velocity) |
| `GroundSpeed` | float | `VSizeXY(Velocity)` |
| `RawSpeed` | float | `Velocity.Size()` |
| `RawSpeedLast` | float | RawSpeed frame precedente |
| `bShouldMove` | bool | `GroundSpeed > 3.f` && accel != 0 |

### Saut

| Variable | Type | Description |
|----------|------|-------------|
| `bIsInAir` | bool | `MovementComponent->IsFalling()` |
| `bWasInAir` | bool | Memorise etat precedent (declenche Landing) |

### Aim Offset

| Variable | Type | Description |
|----------|------|-------------|
| `AimOffsetPitch` / `AimOffsetYaw` | float | Angles bruts (alimentes par BP) |
| `SmoothedAimOffsetPitch` / `SmoothedAimOffsetYaw` | float | Valeurs lissees |
| `AimOffsetPitchDampening` / `AimOffsetYawDampening` | float | Init a **15.0** dans `NativeInitializeAnimation` |

### Stop Walking (Sync Markers)

| Variable | Type | Description |
|----------|------|-------------|
| `LeftFootLastDown` | bool | Pied gauche au sol cette frame (`WalkRun`/`LeftDown`) |
| `StopLeftFootLastDown` | bool | Copie persistante (BP) |
| `LeftPlantLastFrame` / `RightPlantLastFrame` | bool | Etats precedents |

### Combat

| Variable | Type | Description |
|----------|------|-------------|
| `bIsMontagePlaying` | bool | `IsAnyMontagePlaying()` |
| `MeleeTwist` | float | `GetCurveValue("MeleeTwist")` — torsion torse |

## NativeInitializeAnimation

```cpp
Super::NativeInitializeAnimation();
MeleeTwistCurveName = "MeleeTwist";
AimOffsetPitchDampening = 15.f;
AimOffsetYawDampening   = 15.f;
OwningHWCharacter = Cast<AHWGASCharacter>(TryGetPawnOwner());
if (OwningHWCharacter)
    AbilitySystem = OwningHWCharacter->GetAbilitySystemComponent();
```

## NativeUpdateAnimation (sequence)

```
1. Super::NativeUpdateAnimation(DeltaTimeX)
2. Guard: if (!OwningHWCharacter) return
3. Cast MovementComponent
4. bIsInAir <- MovementComponent->IsFalling()
5. Velocity <- OwningHWCharacter->GetVelocity()
6. GroundSpeed <- VSizeXY(Velocity)
7. bShouldMove <- (GroundSpeed > 3.f && Acceleration != Zero)
8. RawSpeedLast <- RawSpeed
9. RawSpeed <- Velocity.Size()
10. HasMarkerBeenHitThisFrame("WalkRun", "LeftDown" / "RightDown")
11. LeftRightMovement <- Dot(Right, Velocity)
12. ForwardBackwardMovement <- Dot(Forward, Velocity)
13. bIsMontagePlaying <- IsAnyMontagePlaying()
14. MeleeTwist <- GetCurveValue("MeleeTwist")
15. UpdateMovementState()
```

## UpdateMovementState — priorites

```
1. Tag MovementState.Flying          -> Flying
2. Tag MovementState.Crouching       -> Crouch
3. Tag MovementState.Swimming        -> Swimming
4. bIsInAir && Velocity.Z > 0        -> Jumping   (bWasInAir=true)
5. bIsInAir && Velocity.Z <= 0       -> Falling   (bWasInAir=true)
6. !bIsInAir && bWasInAir            -> Landing   (bWasInAir=false)
7. !bIsInAir && GroundSpeed > 0      -> Moving
8. !bIsInAir && GroundSpeed == 0     -> Idle
default                              -> NoMovement
```

## Sync Markers (WalkRun)

Detection utilisee pour choisir l'animation de stop correcte (`Stop_LeftFoot` vs `Stop_RightFoot`) :

```cpp
if (HasMarkerBeenHitThisFrame(FName("WalkRun"), FName("LeftDown")))
    LeftFootLastDown = true;
else if (HasMarkerBeenHitThisFrame(FName("WalkRun"), FName("RightDown")))
    LeftFootLastDown = false;
```

**Prerequis :** animations de marche/course dans le slot `WalkRun` doivent avoir ces marqueurs places sur les frames d'impact pied.

## Aim Offset

Les valeurs brutes (`AimOffsetPitch`, `AimOffsetYaw`) sont alimentees par le Blueprint. Les smoothed values sont calculees via nodes d'interpolation BP.

- Dampening = `15.f` → suivi rapide
- Baisser a `5.f` → effet de "lag" de tete
- Clamp typique : [-90°, +90°] horizontal et vertical

## Courbe MeleeTwist

Courbe flottante dans les montages d'attaque melee. Controle la torsion du torse/hanche pendant les attaques.

```cpp
MeleeTwistCurveName = "MeleeTwist";          // NativeInitializeAnimation
MeleeTwist = GetCurveValue(MeleeTwistCurveName); // NativeUpdateAnimation
```

Usage BP : brancher sur `Transform (Modify) Bone` ou `Layered Blend per Bone`. Retourne `0.f` si aucun montage actif.

## URO (Update Rate Optimizations)

`AHWCharacter::SetupURO()` dans constructeur :

```cpp
GetMesh()->AnimUpdateRateParams->bShouldUseLodMap = true;
GetMesh()->AnimUpdateRateParams->BaseNonRenderedUpdateRate = 4;
GetMesh()->AnimUpdateRateParams->LODToFrameSkipMap.Add(0, 0);
GetMesh()->AnimUpdateRateParams->LODToFrameSkipMap.Add(1, 1);
GetMesh()->AnimUpdateRateParams->LODToFrameSkipMap.Add(2, 2);
GetMesh()->AnimUpdateRateParams->LODToFrameSkipMap.Add(3, 3);
GetMesh()->AnimUpdateRateParams->MaxEvalRateForInterpolation = 10;
```

| LOD | Frames sautees |
|-----|----------------|
| 0 | 0 (qualite max) |
| 1 | 1 (1/2 frames) |
| 2 | 2 (1/3 frames) |
| 3 | 3 (1/4 frames) |

S'applique a tous les `AHWCharacter` (joueurs et entites). Essentiel pour les zones denses.

## AnimInstance par anatomie

`FHWAnatomyProfile` (DataTable) contient `TSubclassOf<UAnimInstance> AnimInstanceClass` pour chaque anatomie. `FHWCharacterDataAsset` inclut aussi `CustomAnimBlueprint` pour les hairstyles (animations cape/cheveux).

## Integration GAS — Tags mouvement consommes

Nativement evalues dans `UpdateMovementState` :
- `MovementState.Flying`
- `MovementState.Crouching`
- `MovementState.Swimming`

Definis mais non evalues ici (dispo Anim BP) :
- `MovementState.Walking`, `.Running`, `.Sprinting`, `.Driving`, `.OnBoat`

Tags combat pertinents :
- `Combat.State.ReadyToFight`
- `Combat.State.IFrame`
- `Combat.Set.Unarmed`, `.SwordAndShield`, `.Bow`

## Liaison BP

`UHWPlayerAnimInstance` (C++) <-> `AB_HWMannequin` (BP, `/Game/Assets/`)

## Inverse Kinematics — etat actuel

Aucun code IK natif dans les sources C++ actuelles. Les variables `LeftFootLastDown` / `LeftPlantLastFrame` / `RightPlantLastFrame` sont preparees pour un systeme Foot IK dans l'Anim BP. Voir [[Anim Instance]].

## Assets associés
- [[Anim BP Catalog]] — catalogue des AnimBlueprints (AB_HWMannequin, ABP_Player) et BlendSpaces
- [[Animation Montages]] — catalogue des AnimMontages (dodges, combat, arc, vol)

## Voir aussi

- [[HW GAS Character]] — propriete `AHWGASCharacter* OwningHWCharacter` (`HWPlayerAnimInstance.h:35`) remplie dans `NativeInitializeAnimation` via `Cast<AHWGASCharacter>(TryGetPawnOwner())` ; l'ASC est recupere immediatement apres par `OwningHWCharacter->GetAbilitySystemComponent()` et stocke dans `AbilitySystem`.
- [[HW Character]] — ancetre accessible via `OwningHWCharacter` ; `FHWAnatomyProfile::AnimInstanceClass` (`HWCharacter.h:528`) determine quelle sous-classe de cette `UHWPlayerAnimInstance` est instanciee, et l'URO configuree par `AHWCharacter::SetupURO()` (`HWCharacter.h:653`) regit le throttle des `NativeUpdateAnimation` ici.
- [[Gameplay Tags]] — `UpdateMovementState()` (`HWPlayerAnimInstance.h:46`) teste les tags `MovementState.Flying` / `.Crouching` / `.Swimming` sur `AbilitySystem` pour piloter l'enum `EMovementState` (`HWPlayerAnimInstance.h:16-27`).
- [[Animation Montages]] — `bIsMontagePlaying` (`HWPlayerAnimInstance.h:118`) est alimente par `IsAnyMontagePlaying()` chaque frame ; la courbe `MeleeTwist` (`HWPlayerAnimInstance.h:120`) est lue via `GetCurveValue(MeleeTwistCurveName)` et publie la torsion exposee par les montages d'attaque.
- [[Anim Blend Spaces]] — les axes `GroundSpeed` / `ForwardBackwardMovement` / `LeftRightMovement` (`HWPlayerAnimInstance.h:62-68`) calcules dans `NativeUpdateAnimation` pilotent les BlendSpaces, et les sync markers `WalkRun/LeftDown` / `WalkRun/RightDown` sont testes via `HasMarkerBeenHitThisFrame` pour `LeftFootLastDown`.
- [[Anim Instance]] — variables preparatoires `LeftFootLastDown` / `StopLeftFootLastDown` / `LeftPlantLastFrame` / `RightPlantLastFrame` (`HWPlayerAnimInstance.h:107-114`) exposees `BlueprintReadWrite` pour un futur Foot IK (aucun node IK C++ actuel).
- [[Anim BP Catalog]] — `AB_HWMannequin` (BP, `/Game/Assets/`) utilise `UHWPlayerAnimInstance` comme parent C++ ; sa State Machine consomme directement `EMovementState MovementState` expose ici.
