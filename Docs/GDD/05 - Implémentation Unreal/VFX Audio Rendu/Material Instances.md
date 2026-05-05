---
tags: [implementation, ue5, vfx, audio, rendering]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MaterialInstances

Per-biome, per-zone and per-weather material instances — derive from [[Master Materials]].

## Biome instances — `Content/Assets/Materials/Landscape/Biomes/`

| Instance | Biome |
|----------|-------|
| `MI_ColdDesert` | Cold desert |
| `MI_ConiferousForest` | Coniferous forest |
| `MI_HotDesert` | Hot desert |
| `MI_MixedForest` | Mixed forest |
| `MI_Savana` | Savana |
| `MI_Steppe` | Steppe |
| `MI_Taiga` | Taiga |
| `MI_TemperateForest` | Temperate forest |
| `MI__Tropical` | Tropical |

## Landscape resolution presets — `Content/Environment/Landscape/Presets/`

`MI_Landscape_505`, `MI_Landscape_1017`, `MI_Landscape_2041`, `MI_Landscape_4081`, `MI_Landscape_8161` — selected by heightmap resolution.

## Terrain LayerInfos — `Content/Environment/Landscape/LayerInfos/`

| LayerInfo | Surface |
|-----------|---------|
| `Grass_LayerInfo` | Green grass |
| `GrassDry_LayerInfo` | Dry grass |
| `Forest_LayerInfo` | Forest floor |
| `ForestDry_LayerInfo` | Dry forest floor |
| `Desert_LayerInfo` | Desert sand |
| `Snow_LayerInfo` | Snow |
| `Slope_LayerInfo` | Rock slope |
| `RockSlope_LayerInfo` | Steep cliff / rock |

## Grass Types — procedural vegetation

- `Content/Environment/Landscape/GrassTypes/` (12 types): `LG_Grass`, `LG_GrassDry`, `LG_Forest`, `LG_Desert`, `LG_DesertRocks`, `LG_Snow`, `LG_SnowRocks`, `LG_Mud`, `LG_Rocks`, `LG_FlatRocks`, `LG_Beach`, `LG_Craters`.
- `Content/Assets/Materials/Landscape/GrassType/` (HW biomes): `GT_Desert_Tree`, `GT_Savana_Grass`, `GT_Savana_Rock`, `GT_Taiga_Tree`, `GT_Temperate_Tree`, `GT_Tropical_Grass`, `GT_Tropical_Rock`, `GT_Tropical_Tree`.

## Terrain decals — `Content/Environment/Landscape/Decals/`

| File | Role |
|------|------|
| `M_Decals` | Base decal material (translucent) |
| `M_Decals_Inst` | Main instance |
| `M_Decals_Opaque` | Opaque variant |
| `MI_WetnessDecal` | Wetness decal (rain-activated) |

## Ice / metal instances — `Content/Assets/Materials/Ice/` & `Metal/`

| File | Role |
|------|------|
| `MI_Frozen01` | Standard ice (see [[Character Effects]]) |
| `MI_FrozenLake01` | Frozen lake |
| `MI_Starship_Metal01` | Starship metal (high-tech gear) |

## UDS material instances — `Content/UltraDynamicSky/Materials/Material_Instances/`

Compiled instances with feature-flag combinations. The 5-letter suffix encodes the 5 main features (T/F):
- `UDS_TFFFF`, `UDS_TTTTT`, etc. (22 combinations total)
- Volumetric cloud variants: `Volumetric_Clouds_default` / `_default_S`, `_2L` / `_2L_S`, `_FCE` / `_FCE_2L` + smooth variants
- `Static_Clouds_SC`
- Lens flare instances: `35mm_Prime`, `Anamorphic`, `Zoom_Chromatic`

## UDW weather materials — `Content/UltraDynamicSky/Materials/Weather/`

| File | Role |
|------|------|
| `Dynamic_Landscape_Weather_Effects` | DLWE master — dynamic weather on landscape |
| `Wet_Weather_Effects` | Wetness / runoff |
| `Snow_And_Dust_Weather_Effects` | Snow + dust accumulation |
| `Rain_ParticleMat` | Rain particle |
| `Snow_ParticleMat` | Snow particle |
| `RainSnow_ParticleMat` | Rain/snow mix |
| `Fog_ParticleMat` | Fog particle |
| `Dust_ParticleMat` / `Dust_Spot_ParticleMat` | Dust |
| `LightningBolt_ParticleMat`, `LightningBranch_ParticleMat`, `LightningFlare_ParticleMat`, `Lightning_Ball_ParticleMat`, `Lightning_Glow` | Lightning |
| `Post_Process_Wind_Fog` | Wind fog post-process |
| `GlassWindow_Rain_Drips` | Window rain drips |
| `Screen_Droplets` | Camera droplets |
| `Rain_Spot_Decal` | Rain impact decal |
| `WaterSurface_Rain_Ripples` | Water ripples from rain |
| `Rainbow_Mat` / `Rainbow_Mat_Volumetric` | Rainbow |
| `Snow_Fade_Target_Mat` | Snow fade target |
| `Snow_Trail_Particle` | Snow trail |
| `Splash_ParticleMat` / `_Top` | Splash |
| `Splash_Droplet_Particle` | Splash droplet |
| `Wind_Debris` | Wind debris |
| `DLWE_Brush`, `DLWE_Raindrops_Brush`, `DLWE_VHFM_RVTStage` | DLWE painting |
| `Cloud_Altitude_Mask` | Cloud altitude mask |
| `WOV_Target_Brush` | Weather Override Volume brush |

## Material Parameter Collections (MPC)

### OrionGlobalGameplayCollection
Path: `Content/Assets/Materials/_ParameterCollections/OrionGlobalGameplayCollection.uasset`.
Global gameplay collection — cross-cutting status effects, ambience.

### PlayerPosition
Path: `Content/Environment/Landscape/Collections/PlayerPosition.uasset`.
Used by `UHWMapWidget` (see [[Map UI]]) to push player XY to the minimap material each tick.

### UltraDynamicWeather_Parameters
Path: `Content/UltraDynamicSky/Materials/Weather/UltraDynamicWeather_Parameters.uasset`.
Master weather MPC — **22 parameters** pushed by `UHWWeatherMPCManager` every tick from `HWEnvironmentManager`.

| Category | Parameters |
|----------|-----------|
| Rain/Snow | Wetness, SnowCoverage, RainIntensity |
| Puddles | PuddleCoverage, DLWEPuddleCoverage |
| Dust | DustCoverage, DustDepth, DustTextureScale |
| DLWE | DLWESnow, DLWEWet, DLWENormalIntensity, DLWEBaseWetness, DLWEWetRoughness, DLWEStepSize |
| Wind | WindDirection (vector), WindSpeed |
| Clouds | CloudBottomAltitude |
| Atmosphere | AmbientFogColor (vector), Temperature |
| Animation | RippleFrame (24 fps) |

### HWWeatherMPCManager (C++)

Source: `Source/HybeliorWorld/Public/Environment/Weather/HWWeatherMPCManager.h` — `UObject` (BlueprintType).

Writes to two MPCs simultaneously:
1. `UltraDynamicWeather_Parameters` (above) — used by UDS DLWE functions.
2. HW internal MPC — backwards-compat with legacy weather.

Called each tick from `HWEnvironmentManager::Update()` with `FHWLocalWeather`, `FHWWindState`, wetness, snow, dust, temperature. Dedicated `UpdateDLWEParams()` for DLWE-specific values. Ripple counter driven at 24 fps (`RippleFrameInterval = 1/24s`).

## Voir aussi
- [[Master Materials]] — les `MI_*` listées (`MI_ColdDesert`, `MI_Landscape_*`, `MI_Frozen01`, etc.) dérivent des masters `M_Landscape_Master`, `M_Frozen_Master01`, `M_LandscapeBiomes*` documentés côté masters.
- [[Water Shader]] — le matériau `WaterSurface_Rain_Ripples` de cette page lit le MPC `UltraDynamicWeather_Parameters` (paramètre `RainIntensity`/`RippleFrame`) composité par-dessus le vertex factory ocean.
- [[Character Effects]] — `MI_Frozen01` / `MI_FrozenLake01` sont référencés comme pendants environnementaux du look frost character (`MF_IcyNoise`).
- [[../05_Interaction_UI/HUD]] — MPC `PlayerPosition` poussé par `UHWMapWidget::NativeTick` (HWMapWidget.h:29) vers le matériau de la minimap affichée au-dessus de l'`AHWHUD`.
