---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Editor Utility Widgets & Toolbar

Le module `HybeliorWorldEditor` enregistre deux points d'entrée UI dans l'éditeur UE5.

---

## Bouton combo dans la barre d'outils Play

**Cible** : `LevelEditor.LevelEditorToolBar.PlayToolBar` — section `HybeliorWorld`

Le clic direct sur le bouton déclenche `ImportHybeliorWorld`. Le menu déroulant expose trois sections.

### Section World

| Entrée menu | Action |
|---|---|
| Import Hybelior World | `ImportHybeliorWorld()` |
| Force Regenerate Terrain | `RegenerateTerrain()` |
| Clear All Terrain | `ClearAllTerrain()` |

### Section Environment

| Entrée menu | Action |
|---|---|
| Start Environment System | `InitEnvironmentSystem()` |
| Set Time: Dawn (6h) | `SetTimeOfDay(6.0f)` |
| Set Time: Noon (12h) | `SetTimeOfDay(12.0f)` |
| Set Time: Sunset (18h) | `SetTimeOfDay(18.0f)` |
| Set Time: Night (0h) | `SetTimeOfDay(0.0f)` |
| Force Weather: Clear | `ForceWeather(EHWWeatherType::Clear)` |
| Force Weather: Rain | `ForceWeather(EHWWeatherType::Rain)` |
| Force Weather: Thunderstorm | `ForceWeather(EHWWeatherType::Thunderstorm)` |
| Force Weather: Snow | `ForceWeather(EHWWeatherType::Snow)` |
| Force Weather: Sandstorm | `ForceWeather(EHWWeatherType::Sandstorm)` |
| Clear Weather Override | `ClearWeatherOverride()` |

### Section Tools

| Entrée menu | Action |
|---|---|
| Generate Master Material | `GenerateMasterMaterial()` |
| Export BP (NodeToCode) | `ExportBlueprintNodeToCode()` *(dépréciée)* |

---

## Menu principal Tools

**Cible** : `LevelEditor.MainMenu.Tools` — section `HybeliorWorldTools`

| Entrée menu | Action |
|---|---|
| Import Hybelior World | `ImportHybeliorWorld()` |
| Force Regenerate Terrain | `RegenerateTerrain()` |

---

## Arborescence complète de la toolbar

```
Bouton "Hybelior"
├── [clic direct]      → ImportHybeliorWorld
├── World
│   ├── Import Hybelior World
│   ├── Force Regenerate Terrain
│   └── Clear All Terrain
├── Environment
│   ├── Start Environment System
│   ├── Set Time: Dawn/Noon/Sunset/Night
│   ├── Force Weather: Clear/Rain/Thunderstorm/Snow/Sandstorm
│   └── Clear Weather Override
└── Tools
    ├── Generate Master Material
    └── Export BP (NodeToCode) [DÉPRÉCIÉE]
```

---

## Editor Utility Widgets Blueprint

Les widgets Blueprint utilisateur peuvent invoquer toutes les fonctions `CallInEditor` exposées par `UHybeliorEditorSubsystem` en obtenant le subsystem via le nœud `Get Editor Subsystem` (catégorie `Hybelior World`).

Pattern typique :
1. Créer un Editor Utility Widget.
2. Nœud `Get Editor Subsystem` → classe `HybeliorEditorSubsystem`.
3. Appeler les méthodes (Import, SetTimeOfDay, ForceWeather, etc.).
4. Exposer des contrôles UMG (sliders, boutons) liés à ces appels.

---

## Voir aussi

- [[Editor Subsystems]] — documente `UHybeliorEditorSubsystem` dont les méthodes `CallInEditor` (`ImportHybeliorWorld`, `SetTimeOfDay`, `ForceWeather`, `GenerateMasterMaterial`) sont câblées aux entrées de menu listées ici.
- [[Terrain Editor Tools]] — décrit `UHWTerrainMaterialGenerator::GenerateMasterMaterial()` invoqué par l'entrée « Generate Master Material » sous la section Tools de la toolbar Hybelior.
- [[Python Scripts]] — propose l'alternative `unreal.get_editor_subsystem(unreal.HybeliorEditorSubsystem)` permettant d'appeler les mêmes fonctions que la toolbar depuis le menu `Tools > Execute Python Script`.
