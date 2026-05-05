---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# TerrainWaterBridge

> Pont Environnement ↔ Eau. Source : `Source/HybeliorWorld/Public/Terrain/HWTerrainWaterBridge.h`

`UHWTerrainWaterBridge` est un `UObject` (BlueprintType) qui expose un couplage **typé** (direct-call, pas de `FindFunction`/`ProcessEvent`) entre [[HW Environment Manager]] et les acteurs `AHWInfiniteOcean` / `AHWWaterParent`.

Instancié comme UPROPERTY sous le nom `OceanBridge` dans l'`AHWEnvironmentManager`.

## API publique

| Méthode | Rôle |
|---------|------|
| `AHWInfiniteOcean* FindOceanActor(UWorld*)` | Recherche le 1er acteur Infinite Ocean du niveau |
| `float GetOceanHeightAtLocation(OceanActor, FVector2D WorldPos)` | Hauteur Z surface (vagues incluses) |
| `void SetOceanMask(OceanActor, UTexture2D* LandMask)` | Passe un masque terre/mer (N&B) à l'océan |
| `bool ShouldRenderOceanAtLocation(WorldPos, TerrainHeight, OceanLevel)` | false si terrain > niveau océan |
| `void UpdateOceanWaves(OceanActor, FHWWindState&, bIsStorm)` | Amplitude vagues selon le vent |
| `void UpdateOceanColor(OceanActor, SunColor, CloudCoverage, WeatherType)` | Couleur eau selon météo |
| `void UpdateOceanFoam(OceanActor, FHWWindState&)` | Écume selon vent |
| `void UpdateOceanFromEnvironment(...)` | Convenience : waves + color + foam en un appel |

## Paramètres pilotés par l'environnement

| Propriété | Défaut | Rôle |
|-----------|--------|------|
| `WaveHeightPerWindSpeed` | 0.01 | Mult. hauteur vague par m/s de vent |
| `MaxWaveHeight` | 1500.0 | Plafond hauteur vague (UE) |
| `StormSwellMultiplier` | 2.5 | Mult. en cas de tempête |

## Pipeline phase 9

```
AHWEnvironmentManager.Tick (phase 9)
    ↓
OceanBridge.UpdateOceanFromEnvironment(
    OceanActor, WindState, SunColor,
    CloudCoverage, WeatherType, bIsStorm)
    ↓
UpdateOceanWaves()  → amplitude selon vent + storm
UpdateOceanColor()  → couleur selon soleil + nuages + type météo
UpdateOceanFoam()   → écume selon vent
    ↓
Helpers privés SetFloatProperty() / SetColorProperty()
    ↓
MID matériaux AHWWaterParent
```

## Pourquoi "typé" ?

Contrairement à une approche BP `FindFunction` / `ProcessEvent`, ce pont appelle directement les méthodes C++ de `AHWInfiniteOcean` (non-reflexion). Performance + type-safety.

## Intégration presets Beaufort

Voir [[Water Presets]] pour les 19 presets (00_Beaufort_Calm → 09_Beaufort_SevereGale + RealColor_Hurican).

Le pont appelle `AHWInfiniteOcean::SetPreset(PresetName)` avec le preset adapté au `EHWWeatherType` courant :

| EHWWeatherType | Preset Beaufort |
|---------------|-----------------|
| Clear, PartlyCloudy | 00 à 02 |
| Cloudy, Overcast | 03 à 05_Beaufort_FreshBreeze |
| Rain, HeavyRain | 06 à 07 |
| Thunderstorm | 08_Beaufort_FreshGale |
| Blizzard | 09_Beaufort_SevereGale / RealColor_Hurican |

## Voir aussi

- [[Infinite Ocean]] — `FindOceanActor()` retourne `AHWInfiniteOcean*` ; appelle méthodes typées sur `AHWWaterParent`
- [[Water Presets]] — presets Beaufort appliqués en fonction du `EHWWeatherType`
- [[HW Environment Manager]] — instancie ce pont comme UPROPERTY `OceanBridge` et l'appelle en phase 9 du Tick
- [[Weather System]] — source de `EHWWeatherType` / `FHWWindState` passés à `UpdateOceanFromEnvironment()`
- [[Terrain Manager]] — module frère Terrain; header situé dans `Public/Terrain/`, pas de dépendance runtime directe
