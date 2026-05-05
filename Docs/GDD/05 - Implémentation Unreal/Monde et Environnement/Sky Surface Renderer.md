---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# SkySurfaceRenderer

> Rendu du ciel. Source : `Source/HybeliorWorld/Public/Environment/HWSkySurfaceRenderer.h/.cpp`

`UHWSkySurfaceRenderer` a remplacé (2026-04-06) les 1200+ nœuds BP UDS par du C++ performant. Pousse ~100 paramètres aux matériaux ciel à chaque tick (phase 5 du pipeline).

## Paramètres exposés

| Groupe | Paramètres |
|--------|-----------|
| **Soleil** | 7 floats + 2 couleurs |
| **Lune** | 7 floats + 3 couleurs |
| **Étoiles / Aurora** | 2 floats + couleurs |
| **Ciel** | 10 floats + 3 couleurs |
| **Nuages 2D** | Texture UVs, vitesse, opacité |
| **Nuages volumétriques** | Densité, scattering, couverture |
| **Brouillard / Atmosphère** | Distance, hauteur, teinte |

## Purge UDS

Les assets BP UDS originaux (`UltraDynamicSky`, `UltraDynamicWeather`) ont été purgés le 2026-04-06. Voir archive : `Archive/2026-04-06_UDS_Plugin_Purge/`.

Les enums BP legacy persistent pour compat levels :
- `UDS_Weather_Override_Mode` → consommé par `AHWWeatherOverrideVolume`
- `UDS_SeasonMode` → consommé par `AHWSeasons`
- `UDS_DLWE_Mode` → consommé par `UHWWeatherEffectsSystem`
- `UDS_and_UDW_State` → sync C++ vers `Ultra_Dynamic_Sky` BP

## Alimentation via PropertyCache

La phase 5 exploite [[Property Cache]] pour lisser les transitions :
```
SkySurfaceRenderer.Tick
    ↓
Pour chaque paramètre :
  TargetValue = WeatherSystem + TimeOfDay + Season
  CachedValue = FInterpTo(Cached, Target, DeltaTime, Speed)
    ↓
Materials.SetScalarParameterValue() / SetVectorParameterValue()
```

## Incohérences

- Nuages 2D et Volumétriques tous deux actifs (overlap visuel possible — incohérence #6)
- 3 SkyLightComponents coexistent (capture, cubemap, realtime) — politique d'usage non documentée (#7)
- Paramètres UDS orbit non utilisés par [[Time Of Day]] (#9)

## Voir aussi

- [[HW Environment Manager]] — possède l'UPROPERTY `TObjectPtr<UHWSkySurfaceRenderer> SkySurfaceRenderer` (ligne 717 de `HWEnvironmentManager.h`) qu'il tick en phase 5 ; le SkyRenderer consomme à son tour `SunIntensityCurve`, `SkyLightIntensityCurve`, `FogDensityCurve` et les MIDs `SkyDomeMID` / `VolumetricCloudMID` exposés par le Manager.
- [[Property Cache]] — `UHWSkySurfaceRenderer` forward-declare `class UHWPropertyCache` en tête de `HWSkySurfaceRenderer.h` ; chaque target value (Sun, Moon, Stars, Fog) passe par `PropertyCache.SetTargetFloat()`/`SetTargetColor()` puis est lu via `GetSmoothedFloat()` avant d'être poussé dans les matériaux ciel.
- [[Time Of Day]] — `UHWSkySurfaceRenderer` forward-declare `class UHWTimeOfDaySystem` dans son header ; lit chaque frame azimut/élévation soleil et phase lunaire pour échantillonner les curves `SunIntensityCurve`, `MoonIntensityCurve`, `StarsIntensityCurve`.
