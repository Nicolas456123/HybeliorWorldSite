---
tags: [implementation, ue5, environment, weather, eras]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [phase-eragenerator]
implements: [Les Ères]
---

# HW Environment Manager

> Orchestrateur principal du pipeline environnement. Source : `Source/HybeliorWorld/Public/Environment/HWEnvironmentManager.h/.cpp`

`AHWEnvironmentManager` tick chaque frame selon un pipeline ordonné strict, coordonnant tous les sous-systèmes (temps, météo, ciel, eau, lumière).

## Refonte — phase EraGenerator (à ajouter)

> Voir [[Les Ères]] (`Documentation_v2/03 - Mécaniques/Les Ères.md`).
>
> Le pipeline tick actuel comporte 12 phases (TimeOfDay, Weather, Sky, etc.) mais **aucune phase ne représente l'Ère cosmique active**. Le canon GDD post-refonte impose l'ajout d'une **phase `EraGenerator`** (recommandée en tête de pipeline ou juste après `TimeOfDay`) :
>
> - Maintient `CurrentEra` (réf à un `UHWEraDefinition` data asset)
> - Maintient `EraProgress` (0-1) — progression dans la durée de l'ère (3-9 mois IRL)
> - Détecte les **signes d'annonce** (faibles puis forts) précédant un [[Le Souffle]]
> - Émet des deltas que les phases en aval consomment : modificateurs météo, palette de couleur ciel, biomes biaisés, spawn d'entités cosmiques associées
>
> Coexistence avec [[Seasons]] : les **4 saisons** restent un cycle court visuel (60 min in-game). Les **Ères** sont un cycle long thématique (3-9 mois IRL). Les deux fonctionnent en parallèle — l'Ère module le ton/spawn, la saison module la végétation/lumière diurne.
>
> Action V3 : documenté seulement. Implémentation en post-V4 (lié au "Era Generator" identifié comme générateur paramétrique #1 dans la roadmap production — voir `Documentation_v2/01 - Vision/Production.md`).

## Pipeline Tick (12 phases)

1. **TimeOfDay** — positions astronomiques soleil/lune
2. **Weather** — simulation météo par biome
3. **Clouds** — couverture nuageuse
4. **Precipitation** — particules Niagara (voir [[Weather System]])
5. **SkySurfaceRenderer** — ~100 paramètres matériaux ciel (PropertyCache tick inclus)
6. **Lighting** — soleil, lune, SkyLight
7. **WeatherAudio** — sons météo
8. **WeatherEffects** — effets écran/paysage
9. **OceanBridge** — synchronisation Water HW
10. **MPCManager** — sync Material Parameter Collection (WeatherMPC + UDWParametersMPC)
11. **Seasons config push** — vers `AHWSeasons`

> **OceanBridge** est le nom de la variable membre (`UPROPERTY TObjectPtr<UHWTerrainWaterBridge>`). La classe effective est `UHWTerrainWaterBridge` (voir [[Terrain Water Bridge]]).

## PropertyCache vs WeatherMPC

Les deux coexistent et ne sont pas redondants :

- **`UHWPropertyCache`** : cache C++ d'interpolation FInterpTo (48 floats / 16 couleurs / 4 vecteurs), tick en phase 5, alimente `UHWSkySurfaceRenderer`. Lisse les transitions des paramètres sky.
- **`UHWWeatherMPCManager`** : pousse les valeurs finales vers le Material Parameter Collection. Tick en phase 10. Consomme le résultat final, pas les valeurs cache.

**Précédence :** PropertyCache alimente le rendu ciel, puis MPCManager publie les valeurs globales aux matériaux paysage/eau. Pas de conflit.

## Intégration Ocean (étape 9)

La variable `OceanBridge` (type `UHWTerrainWaterBridge*`) appelle `AHWInfiniteOcean::SetPreset()` avec les presets Beaufort selon la météo :

| EHWWeatherType | Preset Beaufort recommandé |
|---------------|---------------------------|
| Clear, PartlyCloudy | 00_Beaufort_Calm à 02 |
| Cloudy, Overcast | 03 à 05_Beaufort_FreshBreeze |
| Rain, HeavyRain | 06 à 07 |
| Thunderstorm | 08_Beaufort_FreshGale |
| Blizzard | 09_Beaufort_SevereGale / RealColor_Hurican |

## UDS Assets BP consommés

Héritage : les assets BP UDS originaux (`UltraDynamicSky`, `UltraDynamicWeather`) sont purges du projet, mais quelques enums BP legacy subsistent pour compat levels :

- `UDS_Weather_Override_Mode` (enum BP) → lu par `AHWWeatherOverrideVolume` (C++)
- `UDS_SeasonMode` (enum BP) → lu par `AHWSeasons::GetSeasonalMoistureModifier()` (C++)
- `UDS_DLWE_Mode` (enum BP) → contrôle DLWE dans `UHWWeatherEffectsSystem` (C++)
- `UDS_and_UDW_State` (struct BP) → synchronisation état météo C++ → BP Ultra_Dynamic_Sky

## Incohérences (10)

| # | Problème |
|---|---------|
| 1 | `FHWEnvironmentConfig` massive (~50 sub-structures) non documentée |
| 2 | `SimulateWeather()` non visible dans .cpp |
| 3 | Sync multi-serveur OWS incomplet pour TimeOfDay |
| 4 | ~~PropertyCache/WeatherMPC conflit~~ — résolu (phases différentes) |
| 5 | Configuration biome non chargée dans EnvironmentManager |
| 6 | Nuages 2D + Volumetriques tous deux actifs (overlap ?) |
| 7 | 3 SkyLightComponents (capture, cubemap, realtime) — quand quel ? |
| 8 | DLWE RT centering peut causer artifacts |
| 9 | Paramètres UDS orbit non utilisés par TimeOfDay |
| 10 | Spring moisture asymétrique (+0.2 vs ±0.1 autres) |

## Voir aussi

- [[Time Of Day]] — sous-système `TObjectPtr<UHWTimeOfDaySystem> TimeOfDaySystem` (phase 1 Tick)
- [[Seasons]] — `AHWSeasons` découvert via `EngineUtils` et configuré en phase 11
- [[Weather System]] — simulation météo (phases 2/4/8)
- [[Sky Surface Renderer]] — composant `TObjectPtr<UHWSkySurfaceRenderer>` (phase 5)
- [[Property Cache]] — composant `TObjectPtr<UHWPropertyCache>` alimentant SkySurfaceRenderer
- [[Weather MPC]] — composant `TObjectPtr<UHWWeatherMPCManager> MPCManager` (phase 10)
- [[Terrain Water Bridge]] — composant `TObjectPtr<UHWTerrainWaterBridge> OceanBridge` (phase 9)
- [[Terrain Manager]] — `TWeakObjectPtr<AHWTerrainManager>` référencée via `#include` .cpp
