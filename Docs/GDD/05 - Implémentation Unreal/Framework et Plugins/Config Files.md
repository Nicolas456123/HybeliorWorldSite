---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Fichiers de configuration (.ini)

## Stratégie multi-environnement

| Fichier | Contenu | Commité ? |
|---------|---------|-----------|
| `DefaultGame.ini` | URLs `http://localhost:44302/` etc. | Oui |
| `DefaultGame_Dev.ini` | Template développeurs (placeholders) | Oui (template) |
| `DefaultGame_Prod.ini` | Variables `${OWS_*}` pour CI/CD | Oui (template) |
| `DefaultGame_Secrets.ini` | Vraies clés (CustomerGUID, EncryptionKey) | **Non (.gitignored)** |

## DefaultGame.ini — Configuration OWS

```ini
[/Script/EngineSettings.GeneralProjectSettings]
OWSAPICustomerKey="F9B16963-DC44-4E9C-9635-257FA18D4D41"  ; placeholder — remplacer en production via DefaultGame_Secrets.ini (gitignored)
OWS2APIPath="http://localhost:44302/"
OWS2InstanceManagementAPIPath="http://localhost:44328/"
OWS2CharacterPersistenceAPIPath="http://localhost:44323/"
OWS2GlobalDataAPIPath="http://localhost:44325/"
OWSEncryptionKey="YOUR_OWS_ENCRYPTION_KEY_HERE"
```

## DefaultEngine.ini — Points clés

### Rendu
```ini
DefaultGraphicsRHI=DefaultGraphicsRHI_DX12   ; DirectX 12
+D3D12TargetedShaderFormats=PCD3D_SM6        ; Shader Model 6
r.DynamicGlobalIlluminationMethod=1          ; Lumen GI
r.ReflectionMethod=1                         ; Lumen Reflections
r.Shadow.Virtual.Enable=1                    ; Virtual Shadow Maps
r.GenerateMeshDistanceFields=True
```

### Gameplay et Navigation
```ini
NearClipPlane=2.0
bFixedTilePoolSize=True
TilePoolSize=200000                          ; Large monde ouvert
```

### Réseau HTTP
```ini
HttpConnectionTimeout=300.0
HttpActivityTimeout=3600.0                   ; 1h pour OWS API
```

### Classes personnalisées
```ini
GameInstanceClass=/Script/OWSPlugin.OWSGameInstance
AssetManagerClassName=/Script/HybeliorWorld.HWAssetManager
GameUserSettingsClassName=/Script/HybeliorWorld.HWSettingsLocal
GlobalDefaultGameMode=/Game/Game/BP_HybeliorGameMode.BP_HybeliorGameMode_C
```

## DefaultInput.ini
```ini
DefaultInputComponentClass=/Script/HybeliorWorld.HWInputComponent
DefaultPlayerInputClass=/Script/EnhancedInput.EnhancedPlayerInput
DefaultViewportMouseCaptureMode=CapturePermanently_IncludingInitialMouseDown

; Sensibilités
MouseX/Y Sensitivity: 0.07
Gamepad DeadZone: 0.25

; Console
+ConsoleKeys=Tilde
+ConsoleKeys=Caret   ; Accent grave FR
```

## GameplayAbilities
```ini
[/Script/GameplayAbilities.AbilitySystemGlobals]
+GameplayCueNotifyPaths=/Game/AbilitySystem/Abilities
+GameplayCueNotifyPaths=/Game/AbilitySystem/GameplayCueNotifies
+GameplayCueNotifyPaths=/Game/AbilitySystem/GameplayCues
ActivateFailIsDeadName=Ability.ActivateFail.IsDead
ActivateFailCooldownName=Ability.ActivateFail.Cooldown
; ... 4 autres tags failure
```

> **Note** : `DefaultGameplayTags.ini` ne contient que les settings globaux (`ImportTagsFromConfig`, `WarnOnInvalidTags`, `FastReplication`, `NumBitsForContainerSize`, `NetIndexFirstBitSegment`) — **aucun tag n'y est déclaré**. Les tags GAS sont déclarés en C++ natifs dans `Source/HybeliorWorld/Public/AbilitySystem/HWGameplayTags.h/.cpp` — l'INI est **intentionnellement vide de tags**.

## CommonUI
```ini
InputData=/Game/BP/CommonUI/CommonUIInputData.CommonUIInputData_C
DefaultInputType=MouseAndKeyboard
bSupportsMouseAndKeyboard=True
bSupportsGamepad=True
+ControllerData=/Game/BP/CommonUI/CommonInputMousAndKeyboardControllerData_C
+ControllerData=/Game/BP/CommonUI/CommonInputGamepadControllerData_C
```

## Packaging
```ini
BlueprintNativizationMethod=Disabled
UsePakFile=True
bUseIoStore=True
bCookMapsOnly=True
PackageCompressionFormat=Oodle
PackageCompressionMethod=Kraken
+MapsToCook=(FilePath="/Game/Maps/TestScaleBiomeV2/TestScaleBiome")
```

## Voir aussi
- [[Plugins]] — énumère les 19 plugins déclarés dans `HybeliorWorld_5.4.uproject` dont `OWSPlugin` (LoadingPhase PreDefault), référencé par la clé `GameInstanceClass=/Script/OWSPlugin.OWSGameInstance` de `DefaultEngine.ini`.
- [[Core Redirects]] — détaille les 104 `+PackageRedirects=`/`+ClassRedirects=` ajoutés à `DefaultEngine.ini` pour la purge Oceanology → HW.
- [[SQL Bootstrap]] — les URLs OWS (`OWS2APIPath`, `OWS2InstanceManagementAPIPath`, etc.) de la section `DefaultGame.ini` pointent vers les microservices qui consomment les scripts `Initialize.sql`.
- [[../01_AbilitySystem_Combat/GameplayTags]] — la note sur `DefaultGameplayTags.ini` (réduit aux settings `ImportTagsFromConfig`/`FastReplication`) renvoie à la déclaration native des tags dans `HWGameplayTags.h/.cpp`.
- [[Input System]] — `DefaultInputComponentClass=/Script/HybeliorWorld.HWInputComponent` et `DefaultPlayerInputClass=/Script/EnhancedInput.EnhancedPlayerInput` de `DefaultInput.ini` configurent l'Enhanced Input pipeline décrit dans cette page.
- [[../05_Interaction_UI/HUD]] — les `+ControllerData=/Game/BP/CommonUI/*` et `InputData=/Game/BP/CommonUI/CommonUIInputData` de la section CommonUI orchestrent les widgets HUD listés dans `SetupHUD()`.
