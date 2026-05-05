---
tags: [implementation, ue5, vfx, audio, rendering]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MasterMaterials

Authoritative master materials (`M_`) and the function / layer building blocks they consume. Instances (`MI_*`) derive from these and override parameters per biome / zone (see [[Material Instances]]).

## Hierarchy

```
Master Material (M_)
    └── Material Instance (MI_)
            └── Parameters overridden per biome / zone
```

Material Functions (`MF_`) are reusable bricks inside masters; Material Layers (`ML_`) and configs (`MLC_`) stack surfaces.

## Masters — `Content/Assets/Materials/_Master/`

| File | Role |
|------|------|
| `M_Landscape_Master` | Landscape master — delegates to biome instances |
| `M_Surface_Master` | Generic PBR surfaces (walls, floors, props) |
| `M_NearMesh_Master` | Close-to-player meshes (high detail) |
| `M_DistanceMesh` | Distant meshes (simplified LOD) |
| `M_Foliage_Master` | Vegetation (trees, bushes, grass) |
| `M_Grass_Master` | Grass specifically (wind simulation) |
| `M_Frozen_Master01` | Frozen / ice-covered surfaces (see [[Character Effects]]) |

## Additional terrain masters — `Content/Assets/Materials/Landscape/`

| File | Role |
|------|------|
| `M_LandscapeBiomes` | Original multi-biome landscape master |
| `M_LandscapeBiomes1` | Experimental variant |
| `M_LandscapeBiomes_V2` | V2 in progress |
| `M_LandscapeBiomes_Inst*` | Main / secondary landscape instances |
| `M_LandscapeBiomes_Inst_Mountain_Center` | Mountain-center special |
| `M_LandscapeBiomes_NoLayer` / `_NoLayer_MainInst` | Variant without layer blend |
| `M_Empty` | Placeholder material |

## HW terrain master — `Content/World/Terrain/`

| File | Role |
|------|------|
| `M_HWTerrain_Master` | Procedural HW terrain — integrates `Texture2DArray` system driven by `UHWTerrainMaterialConfig` |

### UHWTerrainMaterialConfig (C++)

Source: `Source/HybeliorWorld/Public/Terrain/Material/HWTerrainMaterialConfig.h` — `UDataAsset` (BlueprintType).

- Layer enum `EHWTerrainLayer` = { `Rock`, `Grass`, `Sand`, `Snow`, `Dirt`, `Mud`, `Gravel` } — maps to 7 slices in Texture2DArrays.
- Packed arrays:
  - `AlbedoRoughnessArray` — RGB=Albedo, A=Roughness
  - `NormalAOArray` — RG=Normal XY, B=AO
  - `MacroVariationTexture` — world-space macro colour variation
- Global shader parameters: `TriplanarSharpness` (8.0), `MacroVariationScale` (0.00001), `DetailNoiseScale` (0.01), `DetailNoiseStrength` (0.1).
- Per-biome `FHWTerrainBiomeMaterial`: `PrimaryLayer`, `SecondaryLayer`, `SlopeLayer`, `SlopeThreshold` (dot-product, 0.7), `BlendSharpness`, `BiomeTint`, `HeightBlendStart/End`.

## Environment landscape masters — `Content/Environment/Landscape/`

| File | Role |
|------|------|
| `M_Landscape` | Main environment landscape master |
| `MI_Landscape` | Main instance |

## Sky masters — `Content/UltraDynamicSky/Materials/`

| File | Role |
|------|------|
| `Ultra_Dynamic_Sky_Mat` | Main atmospheric dome material (UDS) |
| `Volumetric_Clouds` | Volumetric Cloud Component |
| `Static_Clouds` | 2D fallback clouds |
| `Overcast_Turbulence` | Overcast turbulence |
| `Volumetric_Cloud_Shadows` | Cast shadows for volumetric clouds |
| `2D_Cloud_Shadows` | 2D shadow (simplified mode) |
| `Volumetric_Aurora` | Volumetric aurora borealis |
| `Cloud_Fog_PostProcess` | In-cloud fog post-process |
| `Inside_Clouds_Fog_Particle` | Particle fog inside clouds |
| `Lens_Flare` | Sun/moon halo |

HW custom sky — `Content/Environment/Sky/HW/`: `M_SkyHDR`, `MI_SkyHDR_Inst` + textures `T_Skydome_Sunset_D`, `T_Skydome_Sunset_02_D`, `T_Skydome_Sunset_04_D`, `T_Skydome_Cloudy_D`, `T_Skydome_Afternoon`.

## Fog masters — `Content/Environment/Fog/`

| File | Role |
|------|------|
| `M_FakeFog` | Simulated volumetric fog (plane) |
| `MI_Cloud_01` / `MI_Cloud_02` | Low fog cloud instances |

## Material Functions

### Brushify — `_MF/Brushify_Functions/`
`MF_BaseTextures`, `MF_BiomeEffects`, `MF_DetailMapping`, `MF_DetailShadows`, `MF_DistanceFade`, `MF_DistanceShrink`, `MF_Height`, `MF_PBR`, `MF_PlayerInteraction`, `MF_Tiling`.

### General HW — `_MF/`
`MF_BrightnessAdjust`, `MF_MapAdjustments`, `MF_ObjAdjustments`, `MF_Tiling`.

### Environment landscape — `Content/Environment/Landscape/Functions/`
- Advanced: `MF_CoverLayer`, `MF_Flowmaps`, `MF_LandscapePOM`, `MF_ObjectBlending`, `MF_ReduceTiling`, `MF_Tessellation`.
- Utilities: `MF_SlopeMask`, `MF_FlipNormals`, `MF_ExplicitNormals`, `MF_DerivePBR`, `MF_CheapContrast`, `MF_LandscapeTilingAndDistance`, `MF_LandscapeLayers`, `MF_LandscapeCamera`, `MF_LandscapeBlend`.
- RVT: `MF_RVT_Landscape`, `MF_RVT_Blending`.
- Triplanar: `MF_Triplanar`, `MF_Triplanar_Normals`.
- Surface-typed: `MF_Grass` / `Forest` / `Mud` / `Puddles` / `Rock` / `Craters*` / `Desert*` / `Dunes` / `Beach` / `CoastRock` / `Snow` / `RockSnow` (+ `_Normals`, `_Height`, `_Roughness` variants), plus `MF_Noise`.

### UDS functions — `Content/UltraDynamicSky/Materials/Material_Functions/`
`Base_Sky_Color`, `Cloud_Layer`, `Cloud_Distribution`, `Composite_Cloud_Layers`, `Volumetric_Clouds_Extinction`, `Volumetric_Clouds_Conservative_Density`, `Global_Lighting_Gradient`, `Horizon_Gradient`, `Moon`, `Moon_Composite`, `Sun_Disk`, `Sun_Shine_Edges`, `Stars`, `Aurora`, `Aurora_Time`, `DLWE_SnowCoverage`, `DLWE_PuddleMask`, `DLWE_Parallax`, `DLWE_MapRenderTargets`, `Wind_Fog_Layer`, `Screen_Droplet_Sample`, `2D_Cloud_Shadows_MF`, `Volumetric_Cloud_Shadows_MF`, `Sample_Weather_Mask_Brushes`.

## Material Layers — `Content/Assets/Materials/_ML/`

| File | Role |
|------|------|
| `ML__Blank` | Neutral blank layer |
| `ML_blue_Metal` | Blue metal layer (tech equipment) |

### Layer Configs

| File | Role |
|------|------|
| `MLC_Standard` | Albedo + normal + roughness + metallic |
| `MLC_ScratchAndGrime` | Scratches + grime overlay |

## Effect / misc masters — `Content/Assets/Materials/`

| File | Role |
|------|------|
| `M_Lightball` | Light sphere (magic, portals) |
| `M_InvisibleCollision` | Debug / blocking-volume visualization |
| `Widget3DPassThrough_Masked_OneSided` | Diegetic 3D widget |
| `M_SnowForLandscape01` | Snow overlay on landscape (`Snow/`) |

## Naming conventions

| Prefix | Type | Example |
|--------|------|---------|
| `M_` | Master Material | `M_Landscape_Master` |
| `MI_` | Material Instance | `MI_ColdDesert` |
| `MF_` | Material Function | `MF_SlopeMask` |
| `ML_` | Material Layer | `ML_blue_Metal` |
| `MLC_` | Material Layer Config | `MLC_Standard` |
| `GT_` | Grass Type | `GT_Desert_Tree` |
| `LG_` | Landscape Grass Type | `LG_Snow` |
| `T_` | Texture | `T_Aurora_Crystal_N_01` |
| `_D` / `_N` / `_O` | Suffix: Albedo / Normal / Opacity-AO | `T_Skydome_Sunset_D` |
| `UDS_` | UltraDynamicSky | `UDS_TTTTT` |
| `DLWE_` | Dynamic Landscape Weather Effect | `DLWE_PuddleMask` |

## Voir aussi
- [[Material Instances]] — `MI_*` dérivées des `M_*` listés ici
- [[Water Shader]] — pipeline ocean (vertex factory HLSL) complète les masters
- [[Character Effects]] — `M_Frozen_Master01` et fonctions associées (`MF_CharacterEffects`)
- [[Hit Flash]] — masters consommés par le flash combat (`MF_HitFlash`)
- [[../04_World_Environment/TerrainManager]] — hub monde : `M_HWTerrain_Master` piloté par `UHWTerrainMaterialConfig` + UDS masters (Ultra_Dynamic_Sky_Mat, Volumetric_Clouds) pilotés par `AHWEnvironmentManager`
