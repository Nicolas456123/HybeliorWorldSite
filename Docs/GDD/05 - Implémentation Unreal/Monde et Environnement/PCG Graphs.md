---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# PCG_GraphAssets

Graphs PCG de génération de végétation par biome + interface C++ vers le framework PCG UE5 + catalogue détaillé des assets PCG.

> Généré via MCP (unreal_python) — 2026-04-04
> Moteur : Unreal Engine 5.4 | Plugin : PCG + PCGBiomeCore + PCGBiomeSample

## Architecture

```
AHWTerrainManager (C++)
  ├── UHWTerrainBiomeMap
  ├── UHWBiomeVegetationConfig ← Data Asset : presets par biome
  └── UHWTerrainPCGDataProvider ← interface BPFunctionLibrary vers PCG
          ▼
Graphs PCG (UE5 PCG Framework)
  ├── PCG_Basic.uasset
  ├── PCG_TemperateForest.uasset
  ├── PCG_HotDesert.uasset
  └── PCG_MultiBiome.uasset
          ▼
Blueprints orchestrateurs : BP_BiomeGenerator, BP_PCGManager
          ▼
Assets instanciés : FoliageType (FT_*), StaticMesh roches, Matériaux saisonniers (MI_*_Summer/_Winter/_Snow/_Dry)
```

## Graphs PCG — Vue d'ensemble

Le projet contient **4 PCGGraphs** dans `/Game/Blueprints/PCG/` et **2 Blueprints** de gestion, complétés par le **plugin PCGBiomeCore** (Fab). Au total, **plus de 90 PCGGraphs** sont présents (plugin inclus).

| Asset | Biome | Chemin | Nodes |
|---|---|---|---|
| `PCG_Basic` | Tous/fallback | /Game/Blueprints/PCG/ | 10 |
| `PCG_TemperateForest` | TemperateForest, Taiga | /Game/Blueprints/PCG/ | **0 (vide)** |
| `PCG_HotDesert` | Desert, Savanna | /Game/Blueprints/PCG/ | 3 |
| `PCG_MultiBiome` | Transitions | /Game/Blueprints/PCG/ | 3 |
| `BP_PCGManager` | — | /Game/Blueprints/PCG/ | — (singleton, streaming) |
| `BP_BiomeGenerator` | — | /Game/Blueprints/PCG/ | — (orchestrateur) |
| `BiomeCore` | — | /PCGBiomeCore/ | 101 |
| `BiomeCoreRuntime` | — | /PCGBiomeCore/Runtime/ | 71 |
| `BiomesGenerator_SG_Sampler_Trees` | — | /PCGBiomeSample/ | 16 |
| `BiomesGenerator_SG_Sampler_Rocks` | — | /PCGBiomeSample/ | 4 |
| `BiomeGenerator_Template` | — | /PCGBiomeCore/.../Graphs/ | 13 |

> **Problème critique :** `PCG_TemperateForest` est vide. Les forêts tempérées ne génèrent aucune végétation procédurale.

## UHWTerrainPCGDataProvider (C++↔PCG)

**Source :** `Source/HybeliorWorld/Public/Terrain/HWTerrainPCGDataProvider.h`

| Méthode | Signature |
|---|---|
| `QueryTerrainData` | `(Location) → FHWTerrainPointData` |
| `QueryTerrainDataGrid` | `(Center, Extent, Resolution) → TArray<FHWTerrainPointData>` |
| `GetBiomesInArea` | `(Center, Radius) → TArray<EHWBiomeType>` |
| `GetSlopeAtLocation` | `(Location) → float` |
| `IsValidPlacementLocation` | `(Location, MinH, MaxH, MaxSlope, AllowedBiomes) → bool` |
| `GetTerrainNormalAtLocation` | `(Location) → FVector` |

`FHWTerrainPointData` : Location, Normal, Height, Slope, Moisture, Temperature, BiomeType, DistanceToWater, DistanceToRoad, bIsUnderwater.

## FHWBiomeVegetationPreset (par biome)

| Couche | Type | Paramètres clés |
|---|---|---|
| GrassLayers | `TArray<FHWGrassLayer>` | DensityPer100SqM, ScaleRange, MaxSlopeNormalized, AlignToSurface |
| Trees | `TArray<FHWTreeEntry>` | Density, Scale, MaxSlope, Min/MaxAltitudeCm, bCluster, ClusterRadius/Count |
| Rocks | `TArray<FHWRockEntry>` | Density, Scale, SlopePreference + Boost, bRandomPitchRoll |
| Bushes | `TArray<FHWBushEntry>` | Density, Scale, MaxSlope, bCluster |
| GroundScatter | `TArray<FHWScatterEntry>` | Density, Scale, Category (Flowers/Mushrooms/Debris...) |

Hints : `GroundFogDensity`, `FogTint`, `WindStrength`.

## Flux bout-en-bout (streaming tuile)

```
ClipmapSystem.OnRingDirty(ring)
    ↓
BP_PCGManager.OnTileLoad(bounds)
    ↓
UHWTerrainPCGDataProvider.GetBiomesInArea(center, radius)
    ↓
Pour chaque biome : activer PCG_<Biome>
    ↓
PCG.Execute : Générer grille → IsValidPlacementLocation() → UHWBiomeVegetationConfig → Spawner FoliageTypes
```

Voir [[Foliage Assets]] pour l'inventaire complet (19 biomes × spawners × graphs × matériaux cliff).

---

## Graphs du projet (détail)

### PCG_Basic — 10 nodes

3 chaînes parallèles. Flux :
```
[WorldRayHitQuery_19]
    ├── → SurfaceSampler_0 → TransformPoints_4 → StaticMeshSpawner_20
    ├── → SurfaceSampler_1 → TransformPoints_24 → StaticMeshSpawner_22
    └── → SurfaceSampler_3 → TransformPoints_5 → StaticMeshSpawner_7
```

**SurfaceSampler_0/_3** (grands) : `0.01` pts/m², extents `(75,75,75)`, steepness `0.5`. **_1** (petits) : `0.5` pts/m², extents `(10,10,10)`.
**TransformPoints_4** : scale `2.0→2.5`, yaw `0→360°`. **_24** : scale `1.0` constant. **_5** : scale `1.0→4.0`.
**StaticMeshSpawner_{20,22,7}** : `PCGMeshSelectorWeighted`, mesh slots configurés mais `static_mesh: None` — à assigner.

### PCG_HotDesert — 3 nodes

Filtrage contextuel désert chaud via propriété d'acteur.
```
[DefaultInputNode] → ToPoint_1 → AttributeFilter_0
[GetActorProperty_2] (non connecté au flux principal)
```
**AttributeFilter_0** : `operator: GREATER`, seuil dynamique, `use_spatial_query: True`.
**GetActorProperty_2** : `Self`, `ByTag`, `always_requery_actors: True`.

### PCG_MultiBiome — 3 nodes

```
[DefaultInputNode] → Subgraph_0 → FilterDataByType_2 → Subgraph_1
```
**FilterDataByType_2** : `target_type: SPATIAL (1022)`. Branche entre deux sous-graphs (biome A / biome B).

### PCG_TemperateForest — 0 nodes (vide)

Paramètres enregistrés : `generation_radius: 4294967296` (illimité), `generation_radius400: 800`, `generation_radius800: 1600`, `cleanup_radius_multiplier: 1.1`. À développer.

## Plugin PCGBiomeCore

### BiomeCore (101 nodes)

Orchestrateur principal. Répartition : `PCGSubgraphSettings` ×18, `PCGUserParameterGetSettings` ×12, `PCGRerouteSettings` ×7, `PCGNamedRerouteUsageSettings` ×7, `PCGLoopSettings` ×6, `PCGFilterByTagSettings` ×5, `PCGHiGenGridSizeSettings` ×4, `PCGCollapseSettings` ×4, `PCGBranchSettings` ×4, `PCGDataFromActorSettings` ×4, `PCGFilterByTypeSettings` ×4, et ×1-2 pour : Spline, Bounds, Difference, MetadataPartition, StaticMeshSpawner, SpawnActor, PointExtents, MutateSeed, MatchAndSet, MergeAttrs, PrintElement.

### BiomeCoreRuntime (71 nodes)

Runtime — distances, culling. `PCGMetadataMathsSettings` ×12, `PCGHiGenGridSizeSettings` ×4, `PCGFilterByTypeSettings` ×4, `PCGCreateAttributeSetSettings` ×4, `PCGCullPointsOutsideActorBoundsSettings` ×3.

**SurfaceSampler_21** : `150.0` pts/m² (pour calculs runtime, pas spawn), extents `(1,1,1)`.
**Distance_{0,56}** : `max: 500u`, `set_density: True`, `CENTER → SPHERE_BOUNDS`.
**CullPointsOutsideActorBounds** : `bounds_expansion: 0.0 / 500.0 / 1600.0` (grilles HiGen).

### BiomesGenerator_SG_Sampler_Trees (16 nodes)

```
[Input] → FilterByTag_1 ──┐
[GetLandscapeData_1] ─────┼→ SurfaceSampler_0 → Proxy_0 → DensityRemap_5 → AttributeNoise_0 → DensityFilter_4 → TransformPoints_0
[GraphParameter_0..3] ────┘
```

**SurfaceSampler_0** : `0.05` pts/m² (1 arbre/20 m²), extents `(100,100,500)`, `looseness: 1.25`.
**DensityRemap_5** : `0→1` remappé vers `1→0` (inversion intentionnelle).
6 paramètres utilisateur exposés.

### BiomesGenerator_SG_Sampler_Rocks (4 nodes)

```
[Input] → FilterByTag_0 ─┐
[GetLandscapeData_0] ────┴→ SurfaceSampler_0 → TransformPoints_1
```

**SurfaceSampler_0** : `0.1` pts/m² (1 rocher/10 m²), extents `(400,400,400)`, `looseness: 3.0` (très relâché).

### BiomeGenerator_Template (13 nodes)

```
[Input] → FilterDataByTag_0 ────────────────────────────┐
[WorldRayHitQuery_4] ────┐                              │
[GetLandscapeData_0] ────┴→ Select_3 → SurfaceSampler_5 → Branch_2 → TransformPoints_1
[GraphParameter_0] ──────┘              ↑                    ↑
[GraphParameter_4..7] ─────────────────┘      [GraphParameter_3]
```

**SurfaceSampler_5** : `0.25` pts/m², extents `(250,250,250)`, `looseness: 0.0` (Poisson-disk strict).
**Select_3** : `PCGBooleanSelectSettings` — choisit entre WorldRayHit/Landscape.

### Core graphs annexes

- **BiomeCore_RunGenerators** (28 nodes) : exécution générateurs, tags, attributs.
- **BiomeCore_Filters** (10 nodes) : conditions d'application.
- **BiomeCore_ApplyBiomes** (18 nodes) : application finale.

## Paramètres de densité — SurfaceSamplers

| Graph | points/m² | extents | looseness | steepness | Usage |
|---|---|---|---|---|---|
| PCG_Basic SS_0 | 0.01 | 75,75,75 | 1.0 | 0.5 | Arbres/grands |
| PCG_Basic SS_1 | 0.5 | 10,10,10 | 1.0 | 0.5 | Sous-bois |
| PCG_Basic SS_3 | 0.01 | 75,75,75 | 1.0 | 0.5 | Moyens |
| Trees SS_0 | 0.05 | 100,100,500 | 1.25 | 1.0 | Arbres biome |
| Rocks SS_0 | 0.1 | 400,400,400 | 3.0 | 1.0 | Rochers biome |
| Template SS_5 | 0.25 | 250,250,250 | 0.0 | 1.0 | Générique |
| Runtime SS_21 | 150.0 | 1,1,1 | 1.0 | 1.0 | Calcul runtime |

## Conditions d'application

| Condition | Mécanisme |
|---|---|
| Filtre biome | `PCGFilterByTagSettings` |
| Filtre pente | `PCGAttributeFilteringSettings` (GREATER, seuil dyn.) |
| Filtre distance eau | `PCGDistanceSettings` (500u, set_density: True) |
| Filtre densité | `PCGDensityFilterSettings` |
| Bruit densité | `PCGAttributeNoiseSettings` + `PCGDensityRemapSettings` inv. |
| Propriété acteur | `PCGGetActorPropertySettings` (Self, ByTag, always_requery) |
| Culling hors zone | `PCGCullPointsOutsideActorBoundsSettings` (0/500/1600) |
| LOD procédural | `PCGHiGenGridSizeSettings` |
| Partition tile | `BiomeCore_TilePartitioner` |
| Texture biome | `BiomeCache_InitFromLandscapeAndBiomeTexture` |

## Rayons de génération

| Grille | Génération | Cleanup |
|---|---|---|
| 400 | 800u | 880u |
| 800 | 1600u | 1760u |
| 1600 | 3200u | 3520u |
| 3200 | 6400u | 7040u |
| 6400 | 12800u | 14080u |
| Illimité | 4294967296 | — |

## Notes et recommandations

- **PCG_TemperateForest vide** : à développer via `BiomeGenerator_Template` ou PCGBiomeCore.
- **StaticMeshSpawners de PCG_Basic** : slots configurés sans mesh assigné.
- **PCGBiomeCore** est la colonne vertébrale. Les graphs du projet sont complémentaires.
- `PCGDensityRemapSettings` inverse la densité (intentionnel).
- `SurfaceSampler` à 150 pts/m² de BiomeCoreRuntime sert aux calculs internes (pas spawn).

**Ajouter un biome :** dupliquer `BiomesGenerator_SG_Sampler_Trees` ou `BiomeGenerator_Template` → ajuster densité/extents/looseness → configurer meshes (`PCGMeshSelectorWeighted`) → ajouter filtre tag biome → référencer depuis `BiomeCore_RunGenerators`.

## Voir aussi

- [[Terrain Manager]] — `AHWTerrainManager` expose l'UPROPERTY `TObjectPtr<UHWBiomeVegetationConfig> VegetationConfig` consommée par `UHWTerrainPCGDataProvider` (UBlueprintFunctionLibrary déclarée dans `HWTerrainPCGDataProvider.h`) qui alimente les graphs PCG listés.
- [[Biome System]] — `UHWBiomeVegetationConfig` fournit par `EHWBiomeType` les presets de vegetation (GrassLayers, Trees, Rocks) récupérés par le `UHWTerrainPCGDataProvider` et injectés dans chaque `PCG_*Biome` graph.
- [[Foliage Assets]] — assets FoliageType/LandscapeGrassType physiques référencés dans `UHWBiomeVegetationConfig` puis instanciés par les nodes des PCGGraphs listés dans l'architecture ci-dessus.
