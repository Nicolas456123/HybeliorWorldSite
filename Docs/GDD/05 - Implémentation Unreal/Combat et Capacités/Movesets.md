---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Movesets

`UHWWeaponMoveset` : DataAsset qui décrit un ensemble complet de combos et skills pour un type d'arme. Consommé par [[Combo System]] via `SetActiveMoveset()`.

## Sources

- `HWWeaponMoveset.h` / `.cpp`
- Consommateur : `UHWComboComponent::SetActiveMoveset()`

## EHWWeaponType (8 valeurs)

`Sword, Axe, Mace, Dagger, Bow, Staff, Spear, Shield`

## FHWComboAttack

```cpp
TObjectPtr<UAnimMontage> AttackMontage;
float DamageMultiplier = 1.0f;
FGameplayTag DamageType;              // Combat.DamageType.Fire, etc.
float ComboWindowDuration = 0.8f;
float StaminaCost = 10.f;
int32 RequiredMasteryLevel = 0;
FGameplayTag HiddenUnlockCondition;   // Tag secret requis (optionnel)
TSubclassOf<UGameplayEffect> OnHitEffect;
bool bCanCharge = false;
float ChargedMultiplier = 2.0f;
```

## FHWComboChain

```cpp
FText ComboName;
FGameplayTag ComboTag;               // "Combo.Light", "Combo.Heavy", etc.
TArray<FHWComboAttack> Attacks;       // Séquence
FHWComboAttack Finisher;             // Dernière attaque
int32 RequiredMasteryLevel = 0;
```

## UHWWeaponMoveset

```cpp
EHWWeaponType WeaponType;
FText WeaponTypeName;
TArray<FHWComboChain> ComboChains;
TArray<FHWComboAttack> WeaponSkills;  // Compétences débloquées par mastery
float BaseAttackSpeed = 1.0f;         // PlayRate multiplicateur
float AttackRange = 200.f;
TObjectPtr<UAnimMontage> IdleStanceMontage;
TObjectPtr<UAnimMontage> DrawMontage;
TObjectPtr<UAnimMontage> SheatheMontage;
```

## Formule de PlayRate (actuel)

```
PlayRate = ActiveMoveset->BaseAttackSpeed
```

> **Incohérence** : le `AttackSpeedBonus` de [[Weapon Mastery]] (`FHWWeaponMasteryData`) n'est **jamais ajouté** au PlayRate (`HWComboComponent.cpp:318`). Le bonus mastery est donc ignoré en production.

## Assets BP associés

| Asset BP | Type | Consommateur |
|----------|------|-------------|
| Movesets (UHWWeaponMoveset DataAssets) | PrimaryDataAsset | `UHWComboComponent::SetActiveMoveset()` |
| Attack_01_Seq_Montage | AnimMontage | `UHWComboComponent::PlayAttackMontage()` |
| Dodge_B/F/L/R_Seq_Montage | AnimMontage | `UHWGameplayAbility_Dodge` via AbilityTask |

## Voir aussi

- [[Combo System]] — `UHWComboComponent` stocke `TObjectPtr<UHWWeaponMoveset> ActiveMoveset` (`HWComboComponent.h:72`) ; `FindComboChainByTag()` itère `ActiveMoveset->ComboChains` (`HWComboComponent.cpp:258`), `PlayAttackMontage()` lit `ActiveMoveset->BaseAttackSpeed` comme PlayRate (`HWComboComponent.cpp:318`) et `NotifyHitConfirmed()` transmet `ActiveMoveset->WeaponType` à `AddMasteryExperience()` (`HWComboComponent.cpp:161`).
- [[Weapon Mastery]] — `HWWeaponMoveset.h:9` inclut `Combat/HWWeaponMasteryComponent.h` pour réutiliser l'enum `EHWWeaponType` ; `FHWComboAttack::RequiredMasteryLevel` (`HWWeaponMoveset.h:42`) et `FHWComboChain::RequiredMasteryLevel` (`.h:83`) sont comparés au niveau retourné par `UHWWeaponMasteryComponent::GetMasteryData()` dans `UHWComboComponent::GetCurrentMasteryLevel()` (`HWComboComponent.cpp:337`).
- [[Gameplay Tags]] — `FHWComboAttack::DamageType` et `HiddenUnlockCondition` (`HWWeaponMoveset.h:30,46`) ainsi que `FHWComboChain::ComboTag` (`.h:71`) sont des `FGameplayTag` ; `HiddenUnlockCondition` est testé via `ASC->HasMatchingGameplayTag()` dans `GetAccessibleAttacks` (`HWComboComponent.cpp:233`).
