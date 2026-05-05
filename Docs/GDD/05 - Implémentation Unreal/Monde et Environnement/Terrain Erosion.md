---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# TerrainErosion

> Érosion hydraulique + thermale pour lisser le terrain généré. Source : `Source/HybeliorWorld/Public/Terrain/Generation/HWTerrainErosion.h`

## Érosion hydraulique (FHWErosionSettings)

Simule 50 000 gouttes d'eau s'écoulant le long des pentes, érodant / déposant des sédiments.

| Paramètre | Défaut | Rôle |
|-----------|--------|------|
| NumIterations | 50 000 | Gouttes simulées |
| Inertia | 0.05 | [0=suit gradient strict, 1=ignore] |
| SedimentCapacityFactor | 4.0 | Mult. capacité sédiments |
| MinSedimentCapacity | 0.01 | Évite division par zéro |
| DepositSpeed | 0.3 | Fraction déposée par pas |
| ErodeSpeed | 0.3 | Fraction érodée par pas |
| EvaporateSpeed | 0.01 | Évaporation par pas |
| Gravity | 4.0 | Accélération vers le bas |
| MaxDropletLifetime | 30 | Pas max par goutte |
| ErosionRadius | 3.0 | Brush radius (cellules) |

## Érosion thermale (FHWThermalErosionSettings)

Matériaux s'écoulant sur les pentes > angle de repos (talus).

| Paramètre | Défaut |
|-----------|--------|
| NumIterations | 10 |
| TalusAngle | 0.5 rad (~28.6°) |
| ErosionRate | 0.5 |

## Configuration opt-in

L'érosion est activée via `bApplyErosion = true` sur le TerrainManager (incohérence #8, normale).

Le paramètre `ErosionStrength` dans [[Terrain Manager]] `FHWNoiseSettings` (défaut 0.3) pondère l'effet combiné.

## Génération async

L'érosion est coûteuse (50 000 gouttes). Exécutée via `UHWTerrainAsyncGenerator` sur threads background pour ne pas bloquer le game thread.

```
TerrainManager.GenerateChunk()
    ↓
UHWTerrainAsyncGenerator (thread background)
    ↓
Base heightmap (noise)
    ↓
FHWErosionSettings.Apply() (hydraulique)
    ↓
FHWThermalErosionSettings.Apply() (thermale)
    ↓
GameThread : UpdateMeshSection()
```

## Incohérence connue

- `FAutoDeleteAsyncTask` → dangling pointers (TODO dans code) — incohérence #1 TerrainManager. Risque use-after-free si le task est détruit avant de poster ses résultats.

## Voir aussi

- [[Terrain Manager]] — `FHWNoiseSettings` (déclarée dans `HWTerrainNoiseSettings.h`, UPROPERTY `NoiseSettings` de `AHWTerrainManager`) expose `ErosionStrength=0.3` et `ErosionScale=0.005` qui pondèrent les passes d'érosion décrites ici.
- [[Clipmap System]] — les heightmaps érodées par `UHWTerrainErosion::ApplyHydraulicErosion()` / `ApplyThermalErosion()` (déclenchées depuis `UHWTerrainAsyncGenerator`) alimentent directement les rings du `UHWClipmapSystem` avant le rendu mesh.
