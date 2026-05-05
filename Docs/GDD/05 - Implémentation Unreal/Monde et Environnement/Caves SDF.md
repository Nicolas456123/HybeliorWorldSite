---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# CavesSDF

> Grottes procédurales via Signed Distance Fields + Marching Cubes. Sources : `Source/HybeliorWorld/Public/Terrain/Cave/`

## Headers

| Header | Rôle |
|--------|------|
| `HWTerrainCaveManager.h` | `AHWTerrainCaveManager` — zones grottes + meshes |
| `HWTerrainSDF.h` | Primitives/opérations SDF (`EHWSDFPrimitive`, `EHWSDFOperation`) |
| `HWMarchingCubes.h` | Extraction mesh depuis champ SDF (thread-safe, stateless) |

## Primitives SDF (EHWSDFPrimitive)

Sphere, Box, Capsule, Cylinder, Torus

## Opérations Boolean (EHWSDFOperation)

| Opération | Formule |
|-----------|---------|
| Union | `min(d1, d2)` |
| Subtraction | `max(d1, -d2)` — creuse |
| Intersection | `max(d1, d2)` |
| SmoothUnion | Transition lisse (SmoothRadius) |
| SmoothSubtraction | Transition lisse |

## FHWSDFShape

```cpp
EHWSDFPrimitive Primitive;
EHWSDFOperation Operation;
FVector Center, Extent;
FRotator Rotation;
float SmoothRadius;      // Pour smooth ops
float NoiseAmplitude;    // Perturbation 3D organique
int32 NoiseSeed;
```

## Marching Cubes (FHWMarchingCubes)

- **Résolution** : 64³ = 262 144 voxels
- **Tables** : EdgeTable[256] + TriTable[256][16]
- **Propriétés** : thread-safe, stateless, déterministe

Thread-safety confirmée (incohérence #3 du TerrainManager marquée non-problème) : fonctions statiques, pas de state partagé.

## AHWTerrainCaveManager

```cpp
TArray<FHWCaveZone> CaveZones;  // Nom, Bounds, Shapes[]
float MarchingStepSize = 50.0f;
int32 MarchingGridResolution = 64;
UMaterialInterface* CaveMaterial;
TArray<UProceduralMeshComponent*> ZoneMeshes;  // 1 PMC par zone
```

Chaque `FHWCaveZone` agrège une liste de `FHWSDFShape` avec leurs opérations. Le manager produit un mesh procédural par zone via marching cubes évalués sur le champ SDF combiné.

## Workflow éditeur

1. Placer un `AHWTerrainCave` (voir [[Terrain Elements]]) dans le niveau
2. L'acteur s'enregistre auto auprès du TerrainManager
3. Configurer les shapes SDF (primitives + opérations)
4. Le manager génère / met à jour le mesh procédural

## Intégration avec Clipmap

Les grottes sont générées **séparément** du clipmap principal — leurs meshes sont des `UProceduralMeshComponent` indépendants. Le clipmap ne "voit" pas les grottes (pas de trous dans le terrain de surface).

## Voir aussi

- [[Terrain Manager]] — instancie `AHWTerrainCaveManager` comme `CaveSubsystemActor` (UPROPERTY `TObjectPtr<AActor>`) lazy-spawné par `GetCaveSubsystem()` déclaré dans `HWTerrainManager.h`.
- [[Terrain Elements]] — `AHWTerrainCave` (sous-classe de `AHWTerrainElement`, header `HWTerrainCave.h`) fournit la liste des `FHWSDFShape` consommées par le `AHWTerrainCaveManager` décrit ici.
