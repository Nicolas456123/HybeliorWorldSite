---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# TerrainElements

> Drag-and-drop des éléments de terrain dans l'éditeur. Sources : `Source/HybeliorWorld/Public/Terrain/Elements/`

Acteurs placés manuellement qui s'enregistrent automatiquement auprès du [[Terrain Manager]] pour déformer / peindre le terrain autour de leur position.

## Hiérarchie

| Header | Classe | Rôle |
|--------|--------|------|
| `HWTerrainElement.h` | `AHWTerrainElement` (abstract) | Base drag-and-drop — `InfluenceRadius`, `bIsActive` |
| `HWTerrainMountain.h` | `AHWTerrainMountain` | `PeakHeight`, `Falloff` |
| `HWTerrainLake.h` | `AHWTerrainLake` | Lac délimité |
| `HWTerrainRiver.h` | `AHWTerrainRiver` | Spline, `RiverWidth`, `RiverDepth`, `SampleSpacing` |
| `HWTerrainCave.h` | `AHWTerrainCave` | Zone de grotte (SDF shapes) — voir [[Caves SDF]] |
| `HWTerrainPOI.h` | `AHWTerrainPOI` | Point of Interest générique |
| `HWTerrainRoad.h` | `AHWTerrainRoad` | Route spline |
| `HWTerrainSettlement.h` | `AHWTerrainSettlement` | Village / cité |

## Enum EHWTerrainElementType

`Mountain, Lake, River, Settlement, Road, POI, Cave`

## AHWTerrainElement (classe mère abstraite)

Propriétés communes :
- `InfluenceRadius` (float) : rayon d'influence en cm
- `bIsActive` (bool) : activation / désactivation runtime
- `RegisterToTerrainManager()` (BeginPlay) : inscription auto
- `OnElementChanged` : callback éditeur pour regen terrain

## AHWTerrainMountain

- `PeakHeight` (float cm) : hauteur maximale du pic
- `Falloff` (float) : profil d'atténuation radiale (1.0 = linéaire)

Ajoute un dôme de hauteur au terrain selon `Falloff * PeakHeight` en fonction de la distance au centre.

## AHWTerrainRiver

- `USplineComponent* SplinePath` : tracé de la rivière
- `RiverWidth` (float) : largeur en cm
- `RiverDepth` (float) : profondeur de creusement
- `SampleSpacing` (float) : pas d'échantillonnage le long de la spline

Le `AHWTerrainWaterSystem` utilise la spline pour carver la rivière dans le terrain (`CarveRiver()` dans la chaîne de hauteur).

## AHWTerrainLake

Zone délimitée au sol qui abaisse le terrain à un niveau d'eau constant. Délègue à [[Infinite Ocean]] / `AHWLake` pour le rendu de la surface d'eau.

## AHWTerrainSettlement / AHWTerrainPOI

Définissent des zones spéciales avec comportements gameplay associés. Le Settlement peut être consommé par `BP_GenerateCity` (voir [[Level Design]]).

## AHWTerrainRoad

Spline définissant un tracé de route. Peut être consommée pour peindre le matériau `Dirt` ou `Gravel` sur le terrain environnant.

## Workflow éditeur

1. Placer un `AHWTerrain*` dans le niveau (drag-drop BP parent ou sous-classe)
2. L'acteur s'enregistre auto (`BeginPlay`)
3. Configurer les propriétés (PeakHeight, spline, etc.)
4. `OnElementChanged` déclenche regen du terrain impacté

## Voir aussi

- [[Terrain Manager]] — `AHWTerrainManager` maintient `TArray<TObjectPtr<AHWTerrainElement>> RegisteredElements` et expose `RegisterElement()` / `UnregisterElement()` / `OnElementDirty()` (déclarés dans `HWTerrainManager.h`) ; `AHWTerrainElement::FindAndRegisterWithManager()` peuple cette liste au BeginPlay.
- [[Caves SDF]] — `AHWTerrainCave` (sous-classe `AHWTerrainElement`, header `HWTerrainCave.h`) pousse ses `FHWSDFShape` configurés dans le `AHWTerrainCaveManager` retrouvé via `AHWTerrainManager::GetCaveSubsystem()`.
- [[Infinite Ocean]] — `AHWTerrainLake` délègue le rendu de sa surface au système Water ; `AHWTerrainManager::GetWaterSubsystem()` expose le `AHWTerrainWaterSystem` qui coexiste avec `AHWInfiniteOcean` pour les grandes étendues.
