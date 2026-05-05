---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# WeatherMPC

> Pousse les valeurs globales vers les Material Parameter Collections. Source : `Source/HybeliorWorld/Public/Environment/HWWeatherMPCManager.h/.cpp`

`UHWWeatherMPCManager` publie en phase 10 du pipeline les valeurs finales d'environnement à tous les matériaux du monde via MPC.

## MPC gérés

| MPC | Rôle |
|-----|------|
| `WeatherMPC` | Paramètres météo principaux (pluie, neige, vent, température) |
| `UDWParametersMPC` | Compatibilité UDW héritée (foliage tint, snow coverage) |

## Pipeline phase 10

```
HWEnvironmentManager.Tick (phase 10)
    ↓
WeatherMPCManager.PushToMaterialCollections()
    ↓
Lecture : WeatherSystem + TimeOfDay + Seasons + PropertyCache(final)
    ↓
MPC WeatherMPC.RainIntensity = X
MPC WeatherMPC.SnowCoverage = Y
MPC UDWParametersMPC.FoliageTint = Color
    ↓
Tous matériaux lisent les MPC à leur prochain draw call
```

## Paramètres distribués

- RainIntensity, SnowCoverage, WindSpeed (floats)
- FoliageTint, GroundWetness (vecteurs)
- Temperature, Humidity (floats)
- Time01 (progression jour 0.0-1.0)

## Différence avec PropertyCache

| Aspect | PropertyCache | WeatherMPC |
|--------|---------------|------------|
| Portée | Local à SkySurfaceRenderer | Global (tous matériaux) |
| Phase tick | 5 | 10 |
| Stockage | Cache C++ interne | UMaterialParameterCollectionInstance |
| Lissage | Oui (FInterpTo) | Non (valeurs finales) |

Les deux systèmes ne se chevauchent pas : PropertyCache prépare le ciel, MPCManager publie au reste du monde.

## Consommation par les matériaux

- **Terrain** : `M_HWTerrain_Master` lit snow coverage, wetness
- **Eau** : `M_HWOcean_Master`, `M_HWLake_Master` lisent wind, foam
- **Foliage** : tous `MI_*Leaves_*` lisent FoliageTint, WindStrength
- **Landscape legacy** : `M_LandscapeBiomes_Inst` lit les paramètres saisonniers

## Voir aussi

- [[Property Cache]] — consommé en phase 5 pour lisser les valeurs sky ; `UHWWeatherMPCManager` lit les résultats finaux après `UHWPropertyCache.TickInterpolations()` pour les publier en phase 10 dans les MPC globaux.
- [[HW Environment Manager]] — possède l'UPROPERTY `TObjectPtr<UHWWeatherMPCManager> MPCManager` (ligne 725 de `HWEnvironmentManager.h`) et l'UPROPERTY `TObjectPtr<UMaterialParameterCollection> WeatherMPC` (ligne 342) ; la méthode `SetWeatherMPC(UMaterialParameterCollection*)` du Manager relaie ensuite l'asset au `UHWWeatherMPCManager`.
- [[Seasons]] — `AHWSeasons::GetSeasonalFoliageTint()` fournit la FLinearColor lerpée publiée par `UHWWeatherMPCManager` dans `UDWParametersMPC.FoliageTint` en phase 10.
