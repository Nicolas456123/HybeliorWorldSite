---
tags: [implementation, ue5, environment, biome]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [mapping-biomes-eres]
implements: [Les Ères]
---

# Biome System

> Système de biomes 19 types + classification altitude/pente/côte. Sources : `Source/HybeliorWorld/Public/Terrain/Biome/`

> [!info] Mapping Biomes ↔ Ères — voir [[Les Ères]] et [[HW Environment Manager]]
> Chaque ère cosmique biaise la distribution des biomes générés (ex. ère Tempora favorise les biomes spectraux/brumeux ; ère Eldoria les volcaniques). Le mapping détaillé est documenté dans [[Les Ères]] §"Biomes & Ères". L'implémentation côté `HWEnvironmentManager` se fait via la phase `EraGenerator`.

## 19 types (EHWBiomeType)

### Biomes climatiques (13 — grille de Whittaker)

| # | Biome | Régions HybeliorWorld |
|---|-------|-----------------------|
| 1 | IceDesert | Cestra, Azoria, nord Celethor |
| 2 | Tundra | Bords Cestra, nord Alkaran |
| 3 | Taiga | Celethor, Nysaria, Alkaran |
| 4 | TemperateForest | Galenor, Evertia, Trinoria |
| 5 | Temperate | Galenor, Alkaran, Onara |
| 6 | Plains | Endora, Onara, Galenor |
| 7 | Savanna | Sud Galenor |
| 8 | Desert | Ouest Endora |
| 9 | Tropical | Ilthara, Est Endora, Ulinor |
| 10 | Swamp | Ilthara/Warenthor, Endora |
| 11 | Volcanic | Cendara, Myrtam/Alkaran |
| 12 | Coast | Toutes les côtes |
| 13 | Ocean | Eaux profondes |

### Biomes fantasy (6)

| # | Biome | Description |
|---|-------|-------------|
| 14 | CrystallineGrove | Forêts cristallines Baelor, grottes Luminarc |
| 15 | ConsciousForest | Evertia, Warenthor (végétation consciente) |
| 16 | EternalMist | Brume Baelor, brume violette Nysaria |
| 17 | TemporalFaille | Zones vitrifiées Gryndor, fissures temporelles |
| 18 | ShadowLands | Puits d'ombre, zones Noctis |
| 19 | AncientRuins | Cités-ciel écrasées, Navoria engloutie |

## Structures

### FHWBiomeData
```cpp
EHWBiomeType BiomeType;
FLinearColor MapColor;        // Couleur sur la macro map 2048x2048
float BaseHeight;             // Hauteur de base
float HeightVariation;        // Amplitude bruit (multiplicateur)
float MoistureLevel;          // [0.0-1.0] aride → saturé
float TemperatureLevel;       // [0.0-1.0] glacial → brûlant
FName MaterialLayerName;      // Couche matériau
```

### FHWBiomeSample (résultat de requête)
```cpp
EHWBiomeType PrimaryBiome;
EHWBiomeType SecondaryBiome;  // Pour transitions
float BlendWeight;             // Poids vers secondary [0.0-1.0]
float BaseHeight, Moisture, Temperature;
```

## Classification (UHWBiomeClassifier)

### Altitude (EHWAltitudeClass)

| Classe | Plage cm | Plage m |
|--------|----------|---------|
| Lowland | < 50 000 | < 500 m |
| Midland | 50 000 - 200 000 | 500 - 2 000 m |
| Highland | 200 000 - 400 000 | 2 000 - 4 000 m |
| Alpine | ≥ 400 000 | ≥ 4 000 m |

### Pente (EHWSlopeClass — normalisée 0-1)

| Classe | Plage | Degrés |
|--------|-------|--------|
| Flat | < 0.167 | < 9.6° |
| Moderate | 0.167 - 0.389 | 9.6° - 22.9° |
| Steep | 0.389 - 0.611 | 22.9° - 37.6° |
| Cliff | ≥ 0.611 | > 37.6° |

### Types de côte (EHWCoastType — 10)

SandyBeach, RockyShore, Cliff, Estuary, Delta, Lagoon, Mangrove, Fjord, IceShelf, CoralReef

## UHWTerrainBiomeMap

Lit une texture "MacroMap" 2048×2048 (pixels colorés → biomes) dessinée à la main.

```cpp
FHWBiomeSample SampleBiomeAtWorldPos(FVector2D WorldPos);
float GetHeightInfluence(FVector2D WorldPos);
TArray<EHWBiomeType> GetAllBiomesInRect(FBox2D Region);
```

## UHWBiomeVegetationConfig (DataAsset)

Presets par biome + altitude avec cascade de priorité :
1. Match exact (Biome + AltitudeFilter)
2. Wildcard altitude (Biome + AltitudeFilter == Lowland)
3. Preset vide si aucun match

Layers : GrassLayers, Trees, Rocks, Bushes, GroundScatter. Hints env : GroundFogDensity, FogTint, WindStrength.

Voir [[PCG Graphs]] pour la consommation côté PCG.

## Assets associés
- [[Foliage Assets]] — FoliageTypes/LandscapeGrassTypes par biome (Tropical, Temperate, Taiga, Desert, Savana)
- [[Levels]] — map TestScaleBiomeV3 validant les 17 biomes

## Voir aussi

- [[Terrain Manager]] — `TObjectPtr<UHWBiomeVegetationConfig> VegetationConfig` dans `AHWTerrainManager`
- [[PCG Graphs]] — consomme `UHWBiomeVegetationConfig` via `HWTerrainPCGDataProvider`
- [[HW Environment Manager]] — `#include "Terrain/Biome/HWTerrainBiomeMap.h"` dans son header
- [[Foliage Assets]] — presets de végétation par biome consommés par `UHWBiomeVegetationConfig`
- [[Seasons]] — modificateurs d'humidité/température appliqués aux biomes
- [[Level Design]] — placement macro-map 2048x2048 + Level_TestBiome
