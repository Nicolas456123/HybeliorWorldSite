---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# AssetManager

## UHWAssetManager
- Singleton C++ (pas de BP)
- Chargement synchrone/asynchrone des assets
- Pipeline d'initialisation :
  - `StartInitialLoading()` → `InitializeAbilitySystem()` → `InitializeNativeTags()` + `InitGlobalData()`

Déclaré dans `DefaultEngine.ini` :
```ini
AssetManagerClassName=/Script/HybeliorWorld.HWAssetManager
```

## Voir aussi
- [[Login Flow]] — `StartInitialLoading()` est l'étape 1 de la séquence
- [[Initialization Sequence]] — déclencheur amont du pipeline d'init du PlayerController
- [[Config Files]] — déclaration `AssetManagerClassName=` dans `DefaultEngine.ini`
- [[../01_AbilitySystem_Combat/AbilitySystemComponent]] — hub GAS : `InitializeAbilitySystem()` appelle `FHWGameplayTags::InitializeNativeTags()` + `UAbilitySystemGlobals::Get().InitGlobalData()`
