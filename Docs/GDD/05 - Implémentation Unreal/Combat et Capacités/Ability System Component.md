---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# AbilitySystemComponent

`UHWAbilitySystemComponent` : ASC custom HybeliorWorld, hérite de `UAbilitySystemComponent`. Gère le routage des inputs GAS, le batch RPC serveur et la consultation du TagRelationshipMapping.

## Sources

- `HWAbilitySystemComponent.h` / `HWAbilitySystemComponent.cpp`
- Override `ShouldDoServerAbilityRPCBatch()` → `true` (batch RPC activé)

## Propriétés

```cpp
UPROPERTY()
UHWAbilityTagRelationshipMapping* TagRelationshipMapping;

TArray<FGameplayAbilitySpecHandle> InputPressedSpecHandles;
TArray<FGameplayAbilitySpecHandle> InputReleasedSpecHandles;
TArray<FGameplayAbilitySpecHandle> InputHeldSpecHandles;
```

## API publique

```cpp
void AbilityInputTagPressed(const FGameplayTag& InputTag);
void AbilityInputTagReleased(const FGameplayTag& InputTag);
void ProcessAbilityInput(float DeltaTime, bool bGamePaused);
void ClearAbilityInput();
bool TryActivateAbilityBatchedAndEndInSameFrame(FGameplayAbilitySpecHandle);
void GetAdditionalActivationTagRequirements(const FGameplayTagContainer& AbilityTags,
    FGameplayTagContainer& OutRequiredTags, FGameplayTagContainer& OutBlockedTags) const;
void SetTagRelationshipMapping(UHWAbilityTagRelationshipMapping* NewMapping);
void AbilityLocalInputConfirm();
void AbilityLocalInputCancel();
```

## Flow de traitement d'entrée

1. `AbilityInputTagPressed()` : trouve l'ability via DynamicAbilityTag → alimente `InputPressedSpecHandles`.
2. `ProcessAbilityInput()` :
   - Vérifie `TAG_Gameplay_AbilityInputBlocked` avant toute activation.
   - `WhileInputActive` : `TryActivateAbility()` sur les handles maintenus.
   - `OnInputTriggered` : `TryActivateAbility()` sur les presses.
3. Vide les arrays d'entrée après traitement.

## Batch RPC

`ShouldDoServerAbilityRPCBatch()` retourne `true` pour permettre `TryActivateAbilityBatchedAndEndInSameFrame()`, utile pour les abilities à cycle court (projectile spawn + EndAbility même frame).

## Voir aussi

- [[Gameplay Ability]] — cast en `UHWGameplayAbility` dans `ProcessAbilityInput()` pour lire `ActivationPolicy` / `GetEndAbilityThisFrame()`
- [[Ability Tag Relationship Mapping]] — stocké en `UPROPERTY TagRelationshipMapping`, consulté par `GetAdditionalActivationTagRequirements()`
- [[GAS Data Assets]] — `UHWGameplayAbilitySet::GiveToAbilitySystem()` prend ce composant en paramètre
- [[HW GAS Player Character]] — propriétaire principal (hub domaine 02 ; HWGASEntityCharacter accessible transitivement)
- [[Gameplay Tags]] — `TAG_Gameplay_AbilityInputBlocked` testé avant activation
