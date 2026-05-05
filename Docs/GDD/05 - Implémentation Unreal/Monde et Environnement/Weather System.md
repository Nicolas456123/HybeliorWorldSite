---
tags: [implementation, ue5, environment, weather]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: [Les Ères]
---

# Weather System

> Système météo par biome. Sources : `Source/HybeliorWorld/Public/Environment/HWWeather*.h` + `UHWWeatherEffectsSystem`

> [!info] Coexistence Saisons / Ères — voir [[Seasons]]
> La météo est modulée par les saisons (cycle court 60 min) et par l'ère cosmique active (cycle long 3-9 mois — voir [[Les Ères]] et [[HW Environment Manager]] phase EraGenerator). Les deux signaux composent l'état météo final.

Simule la météo dynamique par biome, déclenche les particules Niagara, les effets écran et les zones override.

## 11 types de météo (EHWWeatherType)

Clear, PartlyCloudy, Cloudy, Overcast, Fog, Rain, HeavyRain, Thunderstorm, Snow, Blizzard, Sandstorm

## Configuration par biome

Chaque biome définit :
- `BaseTemperature` (°C)
- `BaseHumidity` [0-1]
- `WeatherProbabilities` (map type → poids)
- `BaseWindSpeed` (m/s)

## Gradients physiques

- **Altitude** : -0.65°C par 100m (gradient atmosphérique standard)
- **Oscillation diurne** : ±10°C (variation jour/nuit)
- **Modificateurs saisonniers** : voir [[Seasons]]

## Systèmes Niagara (UHWWeatherEffectsSystem)

| Effet | Système Niagara | Chemin |
|-----|------------------|--------|
| Pluie (Screen Droplets) | Rain | `/Game/Environment/Sky/Particles/Rain` |
| Neige | Snow | `/Game/Environment/Sky/Particles/Snow` |
| Précipitations mixtes | Rain_and_Snow | `/Game/Environment/Sky/Particles/` |
| Vent/débris | Wind_Debris | `/Game/Environment/Sky/Particles/` |
| Tempête poussière | Dust | `/Game/Environment/Sky/Particles/` |
| Brouillard nuage | Inside_Cloud_Fog | `/Game/Environment/Sky/Particles/` |
| Foudre | Lightning_Strike, Obscured_Lightning | `/Game/Environment/Sky/Particles/` |

## Effets météo avancés

- **DLWE (Dynamic Landscape Weather Effects)** : traces neige/boue persistantes sur le terrain
- **Screen Droplets** : gouttes de pluie écran + essuyage
- **Rainbow** : visible après pluie + soleil 5-60° au-dessus horizon
- **Overcast Turbulence** : ombres nuages animées sur paysage
- **Inside Cloud Fog** : brouillard dans couche nuageuse (vol)

## Zones Override (AHWWeatherOverrideVolume)

Permet de forcer un type de météo dans une zone définie.

```cpp
USplineComponent* BoundarySpline;   // 2D fermée
int32 Priority;                      // Résolution conflits
EHWOverrideMode Mode;                // SingleWeatherType | RandomWeatherVariation
float TransitionWidth;              // Fondu progressif
```

## Masques météo (AHWWeatherMaskBrush)

Protection contre pluie/neige sous abris (auvents, cavernes, intérieurs).

| Forme | Description |
|-------|-------------|
| RadialGradient | Cercle avec fondu centre→bord |
| PyramidGradient | Carré avec fondu centre→bord |
| SoftSquare | Carré à arêtes douces |
| SoftCircle | Cercle à arêtes douces |
| LinearFalloff | Dégradé linéaire |
| Solid | Masque 100% |

## Flux runtime

```
AHWEnvironmentManager.Tick (phase 2)
    ↓
WeatherSystem.SimulateWeather() [TODO: .cpp non visible]
    ↓
Biome config + Season + Location → EHWWeatherType
    ↓ phase 4
Precipitation → Niagara spawn
    ↓ phase 8
WeatherEffects → DLWE, ScreenDroplets, Rainbow
    ↓ phase 9
OceanBridge → SetOceanPreset (Beaufort)
```

## Incohérence

- `SimulateWeather()` non visible dans `.cpp` (probablement héritée d'un parent ou inline).

## Assets associés
- [[Ocean Environment Presets]] — UDS/UDW enums et structs pilotant cycle météo/saisons

## Voir aussi

- [[HW Environment Manager]] — possède `TObjectPtr<UHWWeatherEffectsSystem> WeatherEffects` + orchestre les phases 2/4/8
- [[Weather MPC]] — `UHWWeatherMPCManager` reçoit l'état météo et le pousse vers le MPC (phase 10)
- [[Seasons]] — modificateurs saisonniers de température/humidité
- [[Biome System]] — configuration météo par biome (probabilités, BaseTemperature)
- [[Terrain Water Bridge]] — reçoit `EHWWeatherType` et `FHWWindState` via `UpdateOceanFromEnvironment()`
- [[Water Presets]] — presets Beaufort sélectionnés par type météo
