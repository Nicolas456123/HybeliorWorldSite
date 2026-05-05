---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InfiniteOcean

> Océan infini avec vagues Gerstner. Source : `Source/HybeliorWorld/Public/Water/HWInfiniteOcean.h/.cpp`

`AHWInfiniteOcean` suit la caméra et génère une surface d'eau infinie avec vagues Gerstner calculées en GPU.

## Architecture Water

```
Acteurs eau :
├─ AHWInfiniteOcean  (suit la caméra)
├─ AHWLake           (lac délimité, collision)
├─ AHWWaterVolume    (physique gameplay)
└─ AHWWaterManager   (RVT heightmaps)

Composants :
├─ UHWWaterMeshComponent          (rendu QuadTree)
├─ UHWGerstnerWaveSolverComponent (GPU waves)
├─ UHWBuoyancyComponent           (flottabilité pontoons)
├─ UHWSwimmingComponent           (nage/drowning)
├─ UHWUnderwaterComponent         (post-process)
├─ UHWInfiniteComponent           (follow camera)
└─ UHWWaterAudioComponent         (audio spatial)
```

## Vagues Gerstner (4 groupes)

### EHWGerstnerWaveSummarize

4, 8 (défaut), 12, 16, 20 ondes calculées.

### Valeurs par défaut

| Groupe | Amplitude | Steepness | Speed | WaveLength | Direction |
|--------|-----------|-----------|-------|-----------|-----------|
| Wave_1 | 50.0 | 1.0 | 1000.0 | 8192.0 | 0.425 rad |
| Wave_2 | 20.0 | 1.0 | 1000.0 | 4096.0 | 0.45 rad |
| Wave_3 | 10.0 | 1.0 | 500.0 | 2048.0 | 0.475 rad |
| Wave_4 | 5.0 | 1.0 | 250.0 | 1024.0 | 0.5 rad |

### FHWWaterGlobalDisplacement

```cpp
double SizeM = 8.0;
double OverallLength = 1.0;
double GlobalAmplitude = 1.0;
double GlobalSpeed = 1.0;
double Choppiness = 3.0;
double GlobalWaveDirection = 1.0;
```

**Mise à jour** : Via Material Parameter Collection (GPU) ou MID direct.

## QuadTree LOD (UHWWaterMeshComponent)

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| TileSize | 2400 UE | Taille tuile de base |
| ExtentInTiles | 64×64 | Étendue de la grille |
| TessellationFactor | 6 | ~65 vertices par côté |
| LODScale | 1.0 | Multiplicateur distances |
| ForceUpdateCount | 10 | Mises à jour forcées |

## Volume physique (AHWWaterVolume)

```cpp
AHWWaterParent* HWWater;  // Référence obligatoire
bool EnableBuoyancyInArea = true;
bool EnableSwimmingInArea = true;
float PhysicsVolumeTerminalVelocity = 4000.0;
float PhysicsVolumePriority = 0;
float PhysicsVolumeFluidFriction = 0.3;
```

## Underwater (UHWUnderwaterComponent)

### Modes

```cpp
enum class EHWUnderwaterMode {
    Underwater = 0,      // Post-process classique
    VolumetricFog = 1    // God rays volumétriques
};
```

**Paramètres** : Caustics, Refraction, Distortion, Fog, Vignette, Wet Effect, Water Line

## Utilitaires Water

- **`UHWWaterRuntimeSettings`** (UDeveloperSettings, config=Engine) : paramètres projet dans *Project Settings → HW Water*. Solver classes (lake/ocean), meshes, 14 matériaux, MPC_Waves, sons, RVT heightmap + 5 RT SDF. Source : `Source/HybeliorWorld/Public/Water/HWWaterRuntimeSettings.h`
- **`UHWWaterBPLibrary`** (UBlueprintFunctionLibrary) : stub actuel, point d'extension helpers Blueprint
- **`FHWWaterRVTBaker`** (utilitaire C++) : `BakeRVTIntoTexture()` — bake RVT dans Texture2D persistante. Source : `Source/HybeliorWorld/Public/Water/Utils/HWWaterRVTBaker.h`

## Incohérences (13)

| # | Problème |
|---|---------|
| 1 | Typo catégorie "OLake" (doit être "Material\|Lake") |
| 2 | Responsabilité RVT floue (Manager vs HeightmapComponent) |
| 3 | `GetWaveHeightAtLocation()` retourne ZeroVector par défaut |
| 4 | Inclusion groups asymétriques Océan/Lac |
| 6 | DefaultSceneRoot non réplicable |
| 8 | HWWater répliqué mais non synchronisé entre composants |
| 10 | WaveTimeMode vs PresetMode interaction floue |
| 11 | ActorHeight jamais utilisé |
| 12 | GameTimeInSeconds peut overflow sur longue session MMO |

## Assets associés
- [[Ocean Environment Presets]] — 16 presets Beaufort / Custom / Lake appliqués sur l'océan

## Voir aussi

- [[Water Buoyancy]] — `UHWBuoyancyComponent::HWWater` pointe vers `AHWWaterParent` (base de `AHWInfiniteOcean`)
- [[Water Swimming]] — `UHWSwimmingComponent::HWWater` consomme aussi `AHWWaterParent`
- [[Terrain Water Bridge]] — `FindOceanActor()` retourne `AHWInfiniteOcean*`, mutations via `UpdateOceanWaves/Color/Foam`
- [[Water Presets]] — `TObjectPtr<UHWOceanPreset> Preset` appliqué via `LoadPreset()`
- [[HW Environment Manager]] — pilote l'ocean via `OceanBridge` (phase 9 Tick)
- [[Ocean Environment Presets]] — 16 presets Beaufort/Custom/Lake chargés comme `UHWOceanPreset`
