---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# UHWSettingsLocal — Paramètres locaux

Classe de paramètres locaux du jeu étendant `UGameUserSettings`. Gère l'enregistrement des configurations d'inputs mappables fournies par les Game Feature Plugins.

**Fichiers :**
- `Public/Core/HWSettingsLocal.h`
- `Private/Core/HWSettingsLocal.cpp`

**Héritage :** `UHWSettingsLocal` → `UGameUserSettings` (Engine)

> ⚠️ **Migration UE5.4** : `UPlayerMappableInputConfig` est marqué deprecated. Un TODO migration vers `UEnhancedInputUserSettings` est en place. Les avertissements sont supprimés via `PRAGMA_DISABLE_DEPRECATION_WARNINGS`.

## Propriétés

| Propriété | Type | Modificateurs | Description |
|---|---|---|---|
| `RegisteredInputConfigs` | `TArray<FLoadedMappableConfigPair>` | `VisibleAnywhere` | Configs d'input actuellement enregistrées. Peuplée par les Game Feature Plugins. |
| `CustomKeyboardConfig` | `TMap<FName, FKey>` | `Config` | Mappages de touches personnalisées par le joueur. Sauvegardé dans le fichier `.ini`. |

## Méthodes publiques

| Méthode | Description |
|---|---|
| `static UHWSettingsLocal* Get()` | Singleton — retourne l'instance globale via `GEngine->GetGameUserSettings()` |
| `const TArray<FLoadedMappableConfigPair>& GetAllRegisteredInputConfigs() const` | Accès en lecture aux configs enregistrées |
| `void RegisterInputConfig(const UPlayerMappableInputConfig* NewConfig, const bool bIsActive)` | Ajoute une config si pas déjà présente dans `RegisteredInputConfigs` |
| `int32 UnregisterInputConfig(const UPlayerMappableInputConfig* ConfigToRemove)` | Supprime une config. Retourne 1 si trouvée/supprimée, `INDEX_NONE` sinon |
| `const TMap<FName, FKey>& GetCustomPlayerInputConfig() const` | Accès en lecture aux touches personnalisées du joueur |

## Fonctionnement de `RegisterInputConfig`

Vérifie si la config est déjà enregistrée par prédicat sur `Pair.Config`. Si absente, ajoute via `RegisteredInputConfigs.Add(FLoadedMappableConfigPair(NewConfig, bIsActive))`.

## Déclaration .ini

```ini
GameUserSettingsClassName=/Script/HybeliorWorld.HWSettingsLocal
```

## Dépendances

- `PlayerMappableInputConfig.h`
- `EnhancedInputSubsystems.h`
- `Input/HWMappableConfigPair.h`

## Voir aussi
- [[Input System]] — `UHWInputComponent::AddInputMappings`/`RemoveInputMappings` appellent `UHWSettingsLocal::Get()`
- [[Config Files]] — déclaration `GameUserSettingsClassName=` dans `DefaultEngine.ini`
- [[Technical Debt Active]] — `UPlayerMappableInputConfig` déprécié, TODO migration `UEnhancedInputUserSettings`
- [[../05_Interaction_UI/InputComponent]] — hub UI input : vue BP côté joueur + assets `UPlayerMappableInputConfig` stockés via `RegisterInputConfig`
