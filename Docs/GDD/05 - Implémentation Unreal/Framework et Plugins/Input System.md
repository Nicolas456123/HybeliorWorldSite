---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InputSystem (Enhanced Input)

## UHWInputConfig
DataAsset mappant `GameplayTag ↔ UInputAction`.

## UHWInputComponent
- `BindNativeAction` — lie une action à une fonction C++
- `BindAbilityActions` — lie une action à une ability via son tag

## Custom keymappings
Gérés via `UHWSettingsLocal`.

## Chaîne de résolution InputAction → Ability

```
UHWInputConfig (DataAsset C++) ← InputData_Player (BP asset)
    ↓ FindAbilityInputActionForTag()
IA_Weapon_Left (BP InputAction asset) ← IMC_Default_KBM binding: LMB
    ↓ UHWInputComponent::BindAbilityActions()
Tag InputTag.Weapon.Left → GA_SwordAttack (BP ability)
```

## Incohérence connue
`PlayerMappableInputConfig` est deprecated (migration UE5.4 requise). Voir [[Technical Debt Active]].

## Voir aussi
- [[Settings System]] — `UHWSettingsLocal::Get()` appelé par `UHWInputComponent::AddInputMappings`/`RemoveInputMappings`
- [[Technical Debt Active]] — `UPlayerMappableInputConfig` déprécié UE5.4
- [[../05_Interaction_UI/InputComponent]] — hub UI input : vue BP côté joueur + assets `InputData_Player`, `IA_Weapon_Left` consommés
- [[../02_Characters_Entities/HWGASPlayerCharacter]] — consommateur principal (bind les actions via `BindAbilityActions`)
- [[../01_AbilitySystem_Combat/GameplayAbility]] — hub GAS : cible finale de la chaîne via `BindAbilityActions` + `FGameplayTag InputTag` dans `FHWInputAction`
