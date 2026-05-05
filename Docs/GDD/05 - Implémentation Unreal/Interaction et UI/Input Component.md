---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InputComponent

C++ classes that bridge Enhanced Input to native C++ handlers and to GAS.

## UHWInputConfig

**Files**: `Source/HybeliorWorld/Public/Input/HWInputConfig.h` / `Private/Input/HWInputConfig.cpp`

```cpp
UCLASS(BlueprintType, Const)
class HYBELIORWORLD_API UHWInputConfig : public UDataAsset
```

### FHWInputAction

```cpp
USTRUCT(BlueprintType)
struct FHWInputAction
{
    TObjectPtr<const UInputAction> InputAction;  // the IA_* asset
    FGameplayTag InputTag;                        // InputTag.* tag
};
```

### Exposed properties

| Property | Type | Role |
|----------|------|------|
| `NativeInputActions` | `TArray<FHWInputAction>` | Bound to native C++ functions (non-GAS) |
| `AbilityInputActions` | `TArray<FHWInputAction>` | Routed to GAS abilities |

### Lookup methods

| Method | Purpose |
|--------|---------|
| `FindNativeInputActionForTag(InputTag)` | Returns the native `UInputAction*` for a tag |
| `FindAbilityInputActionForTag(InputTag)` | Returns the GAS `UInputAction*` for a tag |

Both iterate their respective arrays and log an error when the tag is missing (`bLogNotFound=true` default).

## UHWInputComponent

**Files**: `Source/HybeliorWorld/Public/Input/HWInputComponent.h` / `Private/Input/HWInputComponent.cpp`

```cpp
UCLASS()
class HYBELIORWORLD_API UHWInputComponent : public UEnhancedInputComponent
```

Registered as `DefaultInputComponentClass` in `DefaultInput.ini` (see [[Input Actions]]).

### AddInputMappings / RemoveInputMappings

```cpp
void AddInputMappings(const UHWInputConfig* InputConfig,
                      UEnhancedInputLocalPlayerSubsystem* InputSubsystem) const;
void RemoveInputMappings(const UHWInputConfig* InputConfig,
                         UEnhancedInputLocalPlayerSubsystem* InputSubsystem) const;
```

Register / unregister `UPlayerMappableInputConfig` in the local player's Enhanced Input subsystem.

### BindNativeAction (template)

```cpp
template<class UserClass, typename FuncType>
void BindNativeAction(const UHWInputConfig* InputConfig,
                      const FGameplayTag& InputTag,
                      ETriggerEvent TriggerEvent,
                      UserClass* Object, FuncType Func, bool bLogIfNotFound);
```

Looks up via `FindNativeInputActionForTag` then `BindAction` to a C++ method on the character.

### BindAbilityActions (template)

```cpp
template<class UserClass, typename PressedFuncType, typename ReleasedFuncType>
void BindAbilityActions(const UHWInputConfig* InputConfig,
                        UserClass* Object,
                        PressedFuncType PressedFunc,
                        ReleasedFuncType ReleasedFunc,
                        TArray<uint32>& BindHandles);
```

Iterates every `AbilityInputAction` and binds:
- `ETriggerEvent::Triggered` → `PressedFunc` → `AbilityInputTagPressed`
- `ETriggerEvent::Completed` → `ReleasedFunc` → `AbilityInputTagReleased`

Handles are stored for later `RemoveBinds`.

## GameplayTags (complete list)

Defined in `Source/HybeliorWorld/Public/AbilitySystem/HWGameplayTags.h` (struct `FHWGameplayTags`).

### Native tags → C++ functions

| Tag | IA | Event | C++ function |
|-----|-----|-------|--------------|
| `InputTag_Move` | `IA_Move` | Triggered | `Input_Move` |
| `InputTag_Look_Mouse` | `IA_Look_Mouse` | Triggered | `Input_LookMouse` |
| `InputTag_Look_Stick` | `IA_Look_Stick` | Triggered | `Input_LookStick` |
| `InputTag_Jump_Triggered` / `_Completed` | `IA_Jump` | Triggered / Completed | `Input_Jump_Triggered` / `_Completed` |
| `InputTag_Sprint` | `IA_Sprint` | Started / Completed | `Input_SprintStarted` / `_Completed` |
| `InputTag_Crouch` | `IA_Crouch` | Started / Completed | `Input_CrouchStarted` / `_Completed` |
| `InputTag_Dash` | `IA_Dash` | Started | `Input_Dash` |
| `InputTag_ChangeCamera` | `IA_ChangeCamera` | Started | `Input_ChangeCamera` |
| `InputTag_Target` / `_NextTarget` / `_PreviousTarget` | `IA_Target*` | Started | `Input_Target` / `_NextTarget` / `_PreviousTarget` |
| `InputTag_Weapon_Left` / `_Right` | `IA_Weapon_*` | Started | `Input_WeaponLeft` / `_WeaponRight` |
| `InputTag_Flying` / `_FlyingUp` / `_FlyingDown` | `IA_Flying*` | Started / Triggered | `Input_Flying*` |
| `InputTag_MouseWheelUp` / `_Down` | `IA_MouseWheel*` | Started | `Input_MouseWheel*` |
| `InputTag_SwitchWeapon` | (via wheel up/down) | Started | `Input_SwitchWeapon` |

`InputTag_AutoRun` is declared but its `BindNativeAction` call is currently commented out.

### Ability tags

| Tag | IA | GAS role |
|-----|-----|----------|
| `InputTag_Abilities_WeaponLeft` / `_Right` | `IA_Weapon_*` | Routed to GAS |
| `InputTag_Abilities_Dash` | `IA_Dash` | Dash as GAS ability |
| `InputTag_Abilities_NormalAbility1/2` | `IA_NormalAbility1/2` | Normal abilities |
| `InputTag_Abilities_SpecialAbility1` | `IA_SpecialAbility1` | Special ability 1 |
| `InputTag_Abilities_ReadyToFight` | `IA_ReadyToFight` | Combat stance toggle |
| `InputTag_Interact` | `IA_Interact` | Interact as GAS ability |
| `InputTag_WalkRun` | `IA_WalkRun` | Walk/run via GAS |

Some actions exist in **both** lists (`IA_Weapon_Left/Right`) — native handles the instant effect (combo, animation) while the GAS side activates the ability (damage, cooldown).

## End-to-end flow example (attack)

```
1. Player presses LMB (KBM) or RT (Gamepad)
2. IMC resolves to IA_Weapon_Right
3. UEnhancedInputComponent (HWInputComponent) fires ETriggerEvent::Started
4a. Native bind:  InputTag_Weapon_Right → Input_WeaponRight()
    → immediate C++ animation / combo
4b. Ability bind: InputTag_Abilities_WeaponRight → AbilityInputTagPressed(tag)
    → UHWAbilitySystemComponent finds GA_WeaponRight → activates it
5. On release (ETriggerEvent::Completed):
    → AbilityInputTagReleased(tag)
    → ASC notifies the active ability
```

## Voir aussi
- [[Input Actions]] — assets IA_*, IMC_* référencés par `UHWInputConfig::NativeInputActions` / `AbilityInputActions`
- [[HW GAS Player Character]] — binde tout via `UHWInputComponent::BindNativeAction` / `BindAbilityActions` dans `SetupPlayerInputComponent()`
- [[Ability System Component]] — cible de `BindAbilityActions` → `AbilityInputTagPressed/Released` ; hub domaine 01 (routed via AbilitySystemComponent — couvre GameplayTags `InputTag.*`)
- [[Input System]] — vue d'ensemble Enhanced Input au niveau framework (domaine 07)
- [[Interactable Framework]] — `InputTag_Interact` routé vers GAS pour déclencher `Interact()`
