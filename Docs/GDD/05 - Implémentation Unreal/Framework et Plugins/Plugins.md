---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Plugins

Décompte exact vérifié contre `HybeliorWorld_5.4.uproject` :
- **19 plugins** déclarés dans le bloc `Plugins`
- **2 modules** projet dans le bloc `Modules` : `HybeliorWorld` (Runtime) + `HybeliorWorldEditor` (Editor)

> La version précédente de cette doc listait `Oceanology_Plugin` comme plugin actif — **il ne l'est pas**. Le système Water (ex-Oceanology) est intégralement fusionné dans le module `HybeliorWorld`. Voir [[Core Redirects]] pour l'état de la migration (l'historique complet est aussi suivi dans la mémoire projet `project_oceanology_purge.md`).

## Disque vs .uproject — Comparatif

| Dossier dans `Plugins/` | Déclaré dans .uproject ? | Statut |
|-------------------------|--------------------------|--------|
| `OWSPlugin` | Oui | Actif (framework MMO) |
| `GASAttachEditor` | Oui | Actif (debug GAS) |
| `LowEntryExtStdLib` | Oui | Actif (utilitaires BP) |
| `UnrealMCP` | Oui | Actif (bridge Claude Code) |
| `Oceanology_Plugin` | **Non** | Content-only legacy (11 GB assets) — à purger après resave complet |
| `BlueprintNativizationV2` | **Non** | Présent sur disque, non déclaré — non chargé au runtime |
| `LiveBlueprintVariableDebugging` | **Non** | Présent sur disque, non déclaré — non chargé au runtime |

## Plugins activés confirmés

| Plugin | Version | Plateforme | Rôle |
|--------|---------|-----------|------|
| **OWSPlugin** | 5.4 | All | Framework MMO backend (Open World Server) |
| **GameplayAbilities** | 5.4 | All | GAS — Système d'abilities |
| **ReplicationGraph** | 5.4 | All | Optimisation réseau MMO |
| **GASAttachEditor** | 1.9 | All | Debug GAS (attributs, tags, effets) |
| **CommonUI** | 5.4 | All | Framework UI commun |
| **TargetingSystem** | 5.4 | All | Ciblage gameplay |
| **LowEntryExtStdLib** | 5.3 | All | Utilitaires Blueprint |
| **ProceduralMeshComponent** | 5.4 | All | Maillages procéduraux |
| **Niagara** | 5.4 | All | Effets visuels particules |
| **PCG** | 5.4 | All | Procedural Content Generation |
| **PCGBiomeCore** | 5.4 | All | Framework biomes PCG |
| **PCGBiomeSample** | 5.4 | All | Exemples biomes |
| **PCGGeometryScriptInterop** | 5.4 | All | Interopérabilité PCG/Geometry |
| **GeometryScripting** | 5.4 | All | Scripts géométrie |
| **LiveLink** | 5.4 | All | Motion capture temps réel |
| **ModelingToolsEditorMode** | 5.4 | Editor | Outils modélisation |
| **BlockoutToolsPlugin** | 5.4 | All | Level design blockout |
| **VisualStudioTools** | 5.4 | Win64 | Intégration VS2022 |
| **UnrealMCP** | 1.0 | Win64 | Bridge Claude Code HTTP :3001 |

## Modules projet

| Module | Type | LoadingPhase | Rôle |
|--------|------|--------------|------|
| **HybeliorWorld** | Runtime | PostConfigInit | Module runtime principal (gameplay, GAS, Water, Terrain, Environnement) |
| **HybeliorWorldEditor** | Editor | PostEngineInit | Subsystèmes éditeur (Terrain, Environnement, Tools) |

## OWSPlugin — Détail
- **LoadingPhase** : PreDefault
- **Dépendances** : GameplayAbilities, ReplicationGraph
- **Documentation** : https://www.openworldserver.com
- **Classes principales** : `OWSGameInstance`, `OWSGameMode`, `OWSPlayerState`, `OWSPlayerControllerComponent`, `OWSAPISubsystem`

Voir [[../08_Backend_OWS/OWSPluginDetail]] pour l'architecture complète.

## UnrealMCP — Bridge Claude Code
- **Version** : 1.0
- **Type** : Plugin Éditeur (PostEngineInit)
- **Plateforme** : Win64 uniquement
- **Port HTTP** : 3001

| Route | Méthode | Description |
|-------|---------|-------------|
| `/status` | GET | État du plugin |
| `/log` | GET | Logs éditeur (N dernières lignes) |
| `/livecoding` | POST | Déclenche compilation Live Coding |
| `/bp/*` | POST | Manipulation Blueprints nodaux |

## Voir aussi
- [[Config Files]] — `DefaultEngine.ini` fixe `GameInstanceClass=/Script/OWSPlugin.OWSGameInstance`, `AssetManagerClassName=/Script/HybeliorWorld.HWAssetManager`, `GameUserSettingsClassName=/Script/HybeliorWorld.HWSettingsLocal` qui activent concrètement les plugins listés ici.
- [[Core Redirects]] — explique le statut legacy de `Plugins/Oceanology_Plugin/Content/` (11 GB, non déclaré dans `.uproject`) via 104 `+PackageRedirects=`/`+ClassRedirects=` Oceanology → HW.
- [[../08_Backend_OWS/OWSArchitecture]] — détaille le microservice backend consommé par les 5 classes `UOWSGameInstance`/`UOWSPlayerControllerComponent`/`AOWSGameMode`/`UOWSAPISubsystem`/`AOWSPlayerState` exposées par `OWSPlugin` (LoadingPhase PreDefault).
- [[../09_Tools_Automation/MCPIntegration]] — décrit l'autre bout du bridge HTTP :3001 ouvert par `UnrealMCP` (4 routes `/status`, `/log`, `/livecoding`, `/bp/*`) listées dans la section UnrealMCP ci-dessus.
