---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# ClipmapSystem

> Système de LOD géométrique clipmap pour monde 1000 km. Sources : `Source/HybeliorWorld/Public/Terrain/Clipmap/`

## Headers

| Header | Rôle |
|--------|------|
| `HWClipmapSystem.h` | `UHWClipmapSystem` — gestion 12 anneaux LOD |
| `HWClipmapRenderer.h` | `AHWClipmapRenderer` — ProceduralMeshComponent |
| `HWClipmapMeshBuilder.h` | Construction mesh (anneaux creux + strips couture) |

## FHWClipmapRing

| Propriété | Description |
|-----------|-------------|
| LODLevel | Indice (0 = plus fin) |
| StepSize | `BaseTriangleSize × 2^LODLevel` |
| GridSize | `StepSize × Resolution` |
| SnappedCenter | Centre snappé à la grille |
| PreviousCenter | Frame précédent |
| SubPosition | Offset [0.0/1.0] dans l'anneau parent |
| bNeedsRegeneration | Marqueur dirty |
| MeshSectionIndex_Main | Grille complète (LOD0) ou anneau creux (LOD1+) |
| MeshSectionIndex_PatchA | Strip couture vertical |
| MeshSectionIndex_PatchB | Strip couture horizontal |

## Hiérarchie LOD (12 anneaux)

| LOD | StepSize | GridSize |
|-----|----------|----------|
| 0 | 100 cm | 6.4 m |
| 1 | 200 cm | 12.8 m |
| 2 | 400 cm | 25.6 m |
| 3 | 800 cm | 51.2 m |
| ... | 2× | ... |
| 11 | 204 800 cm | 13.1 km |

## Optimisations

- **Anneaux creux (LOD 1+)** : Réduisent les triangles de ~30% en supprimant le centre déjà couvert par LOD inférieur.
- **Strips de couture** : Éliminent les T-junctions aux transitions de LOD.
- **Regeneration budgétée** : `MaxRingUpdatesPerFrame = 4` (incohérence #7 — pas de budget dynamique).

## Vertex colors (packing)

| Canal | Donnée |
|-------|--------|
| R | Height [0, 1] |
| G | Temperature |
| B | Humidity |
| A | WaterMask |

Les matériaux terrain lisent ces valeurs pour paramétrer le blending (biome tint, snow coverage, wetness).

## Pipeline de mise à jour

```
AHWClipmapRenderer.Tick
    ↓
Pour chaque anneau LOD (0 → 11) :
  Calculer SnappedCenter en fonction de la caméra
  Si SnappedCenter != PreviousCenter :
    bNeedsRegeneration = true
    ↓
UHWClipmapSystem.ProcessDirtyRings()
  (max 4 par frame)
    ↓
HWClipmapMeshBuilder.BuildRingMesh()
    ↓
ProceduralMeshComponent.CreateMeshSection() / UpdateMeshSection()
```

## Voir aussi

- [[Terrain Manager]] — possède `TObjectPtr<UHWClipmapSystem> ClipmapSystem` et `TObjectPtr<AHWClipmapRenderer> ClipmapRenderer` comme UPROPERTY privés dans `HWTerrainManager.h` ; `AHWTerrainManager` propage `MaxLODLevels`, `ClipmapResolution` et `BaseTriangleSize` à `UHWClipmapSystem::Initialize()`.
- [[Terrain Erosion]] — l'érosion est appliquée aux heightmaps produites par le `UHWTerrainAsyncGenerator` avant d'alimenter les rings du clipmap ; elles partagent donc le même pipeline de génération déclenché par le TerrainManager.
