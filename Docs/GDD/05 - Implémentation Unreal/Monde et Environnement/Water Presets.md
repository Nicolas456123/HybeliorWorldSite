---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# WaterPresets

> DataAssets Water (Ocean + Lake) avec transitions Lerp et presets Beaufort.

## UHWWaterPreset (base)

DataAsset de base regroupant tous les paramètres eau :
- Vagues Gerstner (4 groupes)
- FHWWaterGlobalDisplacement
- Couleurs (shallow, deep, foam, scattering)
- Caustics, refraction
- Paramètres underwater

```cpp
static void LerpPreset(
    const UHWWaterPreset* A,
    const UHWWaterPreset* B,
    float Alpha,
    UHWWaterPreset* OutResult);
```

Permet des transitions lisses entre deux presets (ex: passage calme → tempête).

## UHWOceanPreset

Hérite de `UHWWaterPreset` + `FHWWaterWetness` (humidité côtière via décal).

### Beaufort presets (échelle des vents 0-9)

| Preset BP | GlobalAmplitude | SizeM | Choppiness |
|-----------|-----------------|-------|-----------|
| 00_Beaufort_Calm | 0.25 | 4.0 | 3.0 |
| 05_Beaufort_FreshBreeze | 0.90 | 7.0 | 3.0 |
| 09_Beaufort_SevereGale | 6.00 | 16.0 | 3.0 |
| RealColor_Hurican | 6.00 | 16.0 | 3.0 |

**Total : 19 presets Ocean** (voir [[Ocean Environment Presets]] pour la liste complète dont BloodOcean, RealColor variants).

### Application par AHWInfiniteOcean

```cpp
AHWInfiniteOcean::SetPreset(UHWOceanPreset* NewPreset);
```

Appelée par [[Terrain Water Bridge]] depuis la phase 9 du [[HW Environment Manager]] selon `EHWWeatherType`.

## UHWLakePreset

Hérite de `UHWWaterPreset` + `FHWWaterGroundCaustics` (caustics projetées au sol).

**Presets disponibles** : BloodLake, TestLakePreset, 02_Stylized

### Application

```cpp
AHWLake::SetPreset(UHWLakePreset* NewPreset);
```

## Intégration pipeline

```
HWEnvironmentManager.Tick (phase 9)
    ↓
WeatherSystem.CurrentWeatherType
    ↓
TerrainWaterBridge.MapWeatherToBeaufortPreset()
    ↓
AHWInfiniteOcean.SetPreset(OceanPreset)
    ↓
UHWGerstnerWaveSolverComponent → amplitude, choppiness, speed
    ↓
MID matériaux océan
```

## Transitions lisses

Pour éviter les sauts brutaux lors des changements météo, deux stratégies :
1. Utiliser `LerpPreset` côté C++ et re-SetPreset à chaque frame avec Alpha croissant
2. Laisser le [[Property Cache]] interpoler les paramètres individuellement

Actuellement le code utilise surtout (1) pour les transitions Ocean.

## Voir aussi

- [[Infinite Ocean]] — `AHWInfiniteOcean` expose l'UPROPERTY `TObjectPtr<UHWOceanPreset> Preset` et `EHWWaterPresetMode PresetMode` dans `HWInfiniteOceanActor.h` ; la méthode `LoadPreset(UHWOceanPreset*)` applique ce DataAsset à l'acteur et à ses composants vague/matériau.
- [[Terrain Water Bridge]] — `UHWTerrainWaterBridge::UpdateOceanFromEnvironment()` lit l'`EHWWeatherType` et le `FHWWindState` courants puis sélectionne un preset Beaufort dont les paramètres sont propagés à `AHWInfiniteOcean` via `UpdateOceanWaves` / `UpdateOceanColor` / `UpdateOceanFoam`.
- [[Ocean Environment Presets]] — énumère les 19 presets `UHWOceanPreset` (00_Beaufort_Calm à 09_Beaufort_SevereGale + variants RealColor/Blood) chargés par le Bridge selon la météo.
