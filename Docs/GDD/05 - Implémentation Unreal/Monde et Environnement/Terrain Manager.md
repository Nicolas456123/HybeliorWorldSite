---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# TerrainManager

> Orchestrateur principal du terrain procédural. Source : `Source/HybeliorWorld/Public/Terrain/HWTerrainManager.h/.cpp`

`AHWTerrainManager` coordonne tous les sous-systèmes terrain (clipmap, biomes, caves, eau, PCG). Vit dans le **module principal** `HybeliorWorld` (pas de plugin séparé HWTerrain).

## Architecture

```
AHWTerrainManager (orchestrateur)
├─ UHWClipmapSystem (LOD)
├─ AHWClipmapRenderer (ProceduralMesh)
├─ UHWTerrainAsyncGenerator (threads)
├─ AHWTerrainCollisionSystem
├─ UHWTerrainModificationLayer
└─ Subsystèmes lazy :
   ├─ AHWTerrainWaterSystem
   ├─ AHWTerrainStructures
   ├─ AHWTerrainGameplayZones
   ├─ AHWTerrainCaveManager
   └─ AHWEnvironmentManager
```

## Paramètres mondiaux

| Paramètre | Défaut | Description |
|-----------|--------|-------------|
| WorldSize | 100 000 000 cm | Étendue totale (1 000 km) |
| WorldSeed | 42 | Graine maître |
| MinTileSize | 800 cm | Plus petite tuile (8 m) |
| MaxLODLevels | 12 | Anneaux clipmap |
| ClipmapResolution | 64 | Sommets par côté |
| BaseTriangleSize | 100 cm | Triangle LOD 0 |
| CollisionRadius | 512 000 cm | Rayon collision (5,12 km) |
| TileLoadRadius | 5 000 000 cm | Rayon chargement LOD élevé (50 km) |

## Headers principaux (`Source/HybeliorWorld/Public/Terrain/`)

| Header | Rôle |
|--------|------|
| `HWTerrainManager.h` | Orchestrateur principal (`AHWTerrainManager`) |
| `HWHybeliorWorldData.h` | DataAsset monde (seeds, paramètres globaux) |
| `HWTerrainStructures.h` | Structs partagées (`FHWClipmapRing`, `FHWTerrainChunk`...) |
| `HWTerrainCollisionSystem.h` | Collision dynamique autour du joueur |
| `HWTerrainDeformation.h` | Déformation runtime (impacts, explosions) |
| `HWTerrainEditorSubsystem.h` | Outils d'édition in-editor |
| `HWTerrainGameplayZones.h` | Zones scriptées (safe zones, raid zones) |
| `HWTerrainModificationLayer.h` | Couche modifs joueur (persistante manuellement) |
| `HWTerrainNaniteSystem.h` | Support Nanite pour props |
| `HWTerrainPCGDataProvider.h` | Pont données → PCG graphs |
| `HWTerrainWaterBridge.h` | Pont vers le système Water |
| `HWTerrainWaterSystem.h` | Rivières/lacs procéduraux carved dans terrain |
| `HWTerrainWorldMap.h` | Carte monde 2D (minimap, macro-map) |

## Génération de hauteur (FHWNoiseSettings)

```cpp
int32 Seed = 42;
// Continentale
double ContinentScale = 0.0005;
int32 ContinentOctaves = 6;
double ContinentAmplitude = 1.0;
// Montagneuse
double MountainScale = 0.002;
int32 MountainOctaves = 6;
double MountainAmplitude = 0.6;
double MountainLacunarity = 2.0;
double MountainPersistence = 0.5;
// Détail
double DetailScale = 0.01;
int32 DetailOctaves = 4;
double DetailAmplitude = 0.15;
// Domain Warp
double DomainWarpAmplitude = 50.0;
// Erosion intégrée
double ErosionStrength = 0.3;
double ErosionScale = 0.005;
```

## Chaîne de hauteur finale

```
BaseHeight = CombinedTerrainNoise(X, Y)
           += ModificationLayer.ApplyModifications()
           += WaterSystem.CarveRiver()
           += StructureSystem.ApplyInfluence()
           += Deformation.Apply()
```

## Incohérences (8)

| # | Problème | Statut |
|---|---------|--------|
| 1 | `FAutoDeleteAsyncTask` → dangling pointers | Actif, risque UAF |
| 2 | `TAtomic` dans USTRUCT alourdit copies | Optimisation recommandée |
| 3 | Thread-safety SDF (fonctions statiques) | Non-problème |
| 4 | Transition limitée à 2 biomes max | Limitation documentée |
| 5 | ModificationLayer sans persistance auto | Design actuel |
| 6 | SubPosition offset [0.0-1.0] | Documenté |
| 7 | MaxRingUpdatesPerFrame = 4 | Limitation connue |
| 8 | Érosion opt-in (`bApplyErosion`) | Normal |

## Voir aussi

- [[Biome System]] — composant `TObjectPtr<UHWBiomeVegetationConfig> VegetationConfig`
- [[Clipmap System]] — composants `TObjectPtr<UHWClipmapSystem>` + `TObjectPtr<AHWClipmapRenderer>`
- [[Caves SDF]] — sous-acteur `CaveSubsystemActor` (AHWTerrainCaveManager)
- [[Terrain Erosion]] — intégrée dans `UHWTerrainAsyncGenerator` (noise settings : ErosionStrength)
- [[Terrain Elements]] — `TArray<TObjectPtr<AHWTerrainElement>> RegisteredElements`
- [[PCG Graphs]] — consommés via `HWTerrainPCGDataProvider`
- [[Terrain Water Bridge]] — `AHWTerrainWaterSystem` comme `WaterSubsystemActor`
- [[HW Environment Manager]] — référence croisée (`AHWEnvironmentManager` comme `EnvironmentSubsystemActor`)
