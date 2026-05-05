---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# WaterBuoyancy

> Flottabilité des objets physiques via pontoons. Source : `Source/HybeliorWorld/Public/Water/HWBuoyancyComponent.h/.cpp`

`UHWBuoyancyComponent` applique la poussée d'Archimède + les forces des vagues sur un acteur en fonction de pontoons placés le long du mesh.

## Paramètres physiques

| Paramètre | Défaut | Description |
|-----------|--------|-------------|
| DefaultMeshDensity | 700.0 kg/m³ | Densité objet |
| WaterFluidDensity | 1030.0 kg/m³ | Eau salée |
| WaterFluidLinearDamping | 1.0 | Amortissement linéaire |
| WaterFluidAngularDamping | 2.5 | Amortissement angulaire |
| WaterVelocityDamper | (0.1, 0.1, 0.1) | Par axe |
| GlobalWaveForceMultiplier | 2.0 | Force des vagues sur flottaison |
| GlobalWaveForceEnabled | false | Activation |
| LimitUnderwaterMaxVelocity | true | — |
| MaxUnderwaterVelocity | 100.0 | UE/s |
| BuoyancyUpdateInterval | 0 | 0=temps réel |

## FOceanBuoyancyPontoon

```cpp
FName Socket;
FVector Pontoon;
double Radius;           // Défaut : 10.0
double DensityOverride;  // 0 = utiliser DefaultMeshDensity
EOceanBuoyancyPontoonMode Mode;  // Buoyancy ou WaterEnterExitEventOnly
```

**Mode `WaterEnterExitEventOnly`** : Déclenche events sans appliquer de forces (utile pour déclencher splash, bruit, etc.).

**Défaut** : 1 pontoon (sans avertissement si non configuré — incohérence #7).

## Events

```cpp
FOceanOnEnteredWater OnEnteredWater;  // (Socket, bUnderwater)
FOceanOnExitedWater OnExitedWater;
```

Permet de brancher les systèmes Niagara (splash, bulles) et audio (entrée/sortie d'eau) aux événements pontoon.

## Courants (flow control)

```cpp
SetFlowControlSpline(USplineComponent* Spline, double UnscaledSplineWidth);
```

Permet de définir un courant le long d'une spline (rivière, fleuve) qui pousse les objets flottants. La largeur détermine la zone d'influence.

## Configuration recommandée bateau

- Placer 4+ pontoons aux coins de la coque (Socket ou Pontoon FVector)
- DefaultMeshDensity 400-600 (bois)
- GlobalWaveForceEnabled = true pour bouger avec la houle
- 1 pontoon central au sommet du mât : Mode = WaterEnterExitEventOnly pour détecter naufrage

## Réplication

Non répliqué — chaque client simule la flottabilité localement. Les positions/rotations sont répliquées via le `UPrimitiveComponent` parent. Risque de désync si simulation diffère.

## Incohérences

- #5 : Enum non-scoped pour `EOceanBuoyancyPontoonMode`
- #7 : 1 pontoon par défaut sans avertissement (silencieux)

## Voir aussi

- [[Infinite Ocean]] — `TObjectPtr<AHWWaterParent> HWWater` pointe typiquement vers `AHWInfiniteOcean`
- [[Water Swimming]] — `UHWSwimmingComponent` s'abonne à `OnEnteredWater` / `OnExitedWater` via `OceanBuoyancyComponent`
- [[HW GAS Player Character]] — owner (`CreateDefaultSubobject<UHWBuoyancyComponent>(TEXT("OceanBuoyancyComponent"))`)
- [[Terrain Water Bridge]] — met à jour les paramètres de vagues de l'océan sous-jacent
- [[Water Presets]] — pilotent les paramètres de vagues appliqués par les solvers
