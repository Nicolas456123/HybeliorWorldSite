---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Editor Subsystems

> **Module C++** : `HybeliorWorldEditor` (Editor-only)
> **Fichiers** : `HybeliorEditorSubsystem.h` / `.cpp`, `HWTerrainEditorModule.h` / `.cpp`

Le module `HybeliorWorldEditor` est un **module éditeur pur** qui ne compile jamais en mode Shipping. Il regroupe trois responsabilités :

| Responsabilité | Classe principale |
|---|---|
| Intégration UI éditeur (toolbar, menus) | `FHybeliorWorldEditorModule` |
| Toutes les actions éditeur exposées Blueprint/Python | `UHybeliorEditorSubsystem` |
| Génération procédurale du matériau terrain maître | `UHWTerrainMaterialGenerator` |

---

## FHybeliorWorldEditorModule — Point d'entrée

```cpp
class HYBELIORWORLDEDITOR_API FHybeliorWorldEditorModule : public IModuleInterface
```

Au démarrage (`StartupModule`), enregistre un callback `UToolMenus::RegisterStartupCallback` qui appelle `RegisterToolbarExtension()` une fois les menus Slate prêts.

À la fermeture (`ShutdownModule`), il déregistre proprement callbacks et extensions via `UToolMenus::UnRegisterStartupCallback` / `UnregisterOwner`.

Déclaré via `IMPLEMENT_MODULE(FHybeliorWorldEditorModule, HybeliorWorldEditor)`.

---

## UHybeliorEditorSubsystem — Actions CallInEditor

```cpp
class HYBELIORWORLDEDITOR_API UHybeliorEditorSubsystem : public UEditorSubsystem
```

Toutes les méthodes publiques sont `UFUNCTION(BlueprintCallable, CallInEditor)`. Accessibles depuis :
- La barre d'outils Hybelior (Level Editor)
- Le menu `Tools > Hybelior World`
- Les Editor Utility Widgets Blueprint
- Python : `unreal.get_editor_subsystem(unreal.HybeliorEditorSubsystem)`

Deux helpers privés **créent automatiquement** l'acteur manquant :
- `FindOrSpawnTerrainManager()` : recherche ou crée `AHWTerrainManager` dans `HW_Environment`
- `FindOrSpawnEnvironmentManager()` : recherche ou crée `AHWEnvironmentManager` dans `HW_Environment`

### Catégorie World

| Fonction | Description |
|---|---|
| `ImportHybeliorWorld()` | Lit `../../HybeliorWorldSite/local-db.json`, importe optionnellement `city-index.json` et `lore-index.json`, résout la hiérarchie de localisation, puis appelle `SpawnAllAsTerrainElements` pour matérialiser ~688 locations comme éléments terrain. |
| `RegenerateTerrain()` | Appelle `ForceGenerateNow()` sur l'`AHWTerrainManager`. |
| `ClearAllTerrain()` | Appelle `ClearAllTiles()` sur l'`AHWTerrainManager`. |

**Flux de ImportHybeliorWorld** :
```
local-db.json
    └─► UHWHybeliorWorldData::ImportFromLocalDB()
         ├─► ImportCityIndex()
         ├─► ImportLoreIndex()
         ├─► ResolveLocationHierarchy()
         └─► SpawnAllAsTerrainElements(World, TerrainManager)
```

### Catégorie Environment

| Fonction | Description |
|---|---|
| `InitEnvironmentSystem()` | Crée ou active l'`AHWEnvironmentManager` et appelle `InitializeEnvironment()`. À appeler en premier. |
| `SetTimeOfDay(float)` | Définit l'heure du jour (0–24). |
| `ForceWeather(EHWWeatherType)` | Force un type météo : `Clear`, `Rain`, `Thunderstorm`, `Snow`, `Sandstorm`. |
| `ClearWeatherOverride()` | Supprime les overrides et revient à la météo automatique. |
| `ApplySkyConfig()` | Applique la configuration ciel (UDSConfig) à tous les sous-systèmes. |
| `PreviewTime(float)` | Prévisualise une heure (0–24) sans modifier l'état permanent. |
| `CycleWeather()` | Avance au preset météo suivant et logue le nom actif. |
| `SaveEnvironmentState()` | Capture l'état (heure + météo) dans `CachedSaveState`. |
| `RestoreEnvironmentState()` | Restaure `CachedSaveState` via `ApplySaveState`. |

### Catégorie Tools

| Fonction | Description |
|---|---|
| `GenerateMasterMaterial()` | Appelle `UHWTerrainMaterialGenerator::GenerateMasterMaterial()` pour générer `/HWTerrain/Materials/M_HWTerrain_Master`. |
| `ExportBlueprintNodeToCode()` | **Dépréciée** (`NodeToCode plugin removed`). Ne pas utiliser. |

---

## Console Python

```python
sub = unreal.get_editor_subsystem(unreal.HybeliorEditorSubsystem)

# World
sub.import_hybelior_world()
sub.regenerate_terrain()
sub.clear_all_terrain()

# Environment
sub.init_environment_system()
sub.set_time_of_day(12.0)
sub.force_weather(unreal.HWWeatherType.RAIN)
sub.preview_time(18.0)

# Tools
sub.generate_master_material()
```

---

## Dépendances (Build.cs)

| Type | Modules |
|---|---|
| **Public** | `Core`, `CoreUObject`, `Engine`, `HybeliorWorld` |
| **Private** | `UnrealEd`, `Slate`, `SlateCore`, `InputCore`, `EditorSubsystem`, `AssetTools`, `AssetRegistry`, `RenderCore`, `RHI`, `ToolMenus`, `LevelEditor`, `PropertyEditor` |

Le module runtime `HybeliorWorld` est une dépendance publique, permettant au code éditeur d'accéder directement aux classes runtime (`AHWTerrainManager`, `AHWEnvironmentManager`).

---

## Voir aussi

- [[Utility Widgets]] — décrit la toolbar `LevelEditor.LevelEditorToolBar.PlayToolBar` et le menu `LevelEditor.MainMenu.Tools` enregistrés par `FHybeliorWorldEditorModule` qui invoquent les méthodes `CallInEditor` de `UHybeliorEditorSubsystem` (`ImportHybeliorWorld`, `SetTimeOfDay`, `ForceWeather`, `GenerateMasterMaterial`).
- [[Terrain Editor Tools]] — documente `UHWTerrainMaterialGenerator::GenerateMasterMaterial()` appelé par `UHybeliorEditorSubsystem::GenerateMasterMaterial()` pour produire `/HWTerrain/Materials/M_HWTerrain_Master`.
- [[Python Scripts]] — montre l'accès via `unreal.get_editor_subsystem(unreal.HybeliorEditorSubsystem)` et indexe `init_unreal.py` qui charge `unreal_mcp_server.py` au démarrage éditeur.
- [[MCP Integration]] — décrit l'endpoint `POST /python` sur `127.0.0.1:3000` qui permet d'exécuter `sub.regenerate_terrain()` ou `sub.force_weather(...)` à distance via HTTP.
