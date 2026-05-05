---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# PropertyCache

> Cache d'interpolation pour transitions lisses. Source : `Source/HybeliorWorld/Public/Environment/HWPropertyCache.h/.cpp`

`UHWPropertyCache` lisse les transitions des paramètres d'environnement via `FInterpTo`. Évite les sauts brutaux lors des changements de météo/heure/saison.

## Capacité pré-allouée

| Type | Nombre |
|------|--------|
| Floats | 48 |
| Couleurs (FLinearColor) | 16 |
| Vecteurs (FVector) | 4 |

## Interpolation FInterpTo

Chaque paramètre dispose d'une vitesse d'interpolation configurable individuellement.

```cpp
float GetSmoothedFloat(int32 Index);
FLinearColor GetSmoothedColor(int32 Index);
FVector GetSmoothedVector(int32 Index);

void SetTargetFloat(int32 Index, float Target, float InterpSpeed);
void SetTargetColor(int32 Index, FLinearColor Target, float InterpSpeed);
```

## Tick en phase 5

Inclus dans [[Sky Surface Renderer]] — tick pendant la phase 5 du pipeline :
```
HWEnvironmentManager.Tick (phase 5)
    ↓
SkySurfaceRenderer.UpdateSkyMaterials()
    ↓
PropertyCache.TickInterpolations(DeltaTime)
    ↓
Matériaux ciel alimentés avec valeurs lissées
```

## Différence avec WeatherMPC

| Aspect | PropertyCache | WeatherMPC |
|--------|---------------|------------|
| Rôle | Lisse transitions sky | Publie valeurs globales matériaux |
| Phase tick | 5 | 10 |
| Consommateur | SkySurfaceRenderer | Tous matériaux (landscape/eau/foliage) |
| Type stockage | TArray pre-allouées | Material Parameter Collection |

Voir [[Weather MPC]] pour la distribution aux matériaux.

## Voir aussi

- [[Sky Surface Renderer]] — `UHWSkySurfaceRenderer` forward-declare `class UHWPropertyCache` dans son header et consomme les valeurs lissées (`GetSmoothedFloat`, `GetSmoothedColor`) pour peupler les ~100 paramètres matériaux ciel lors de la phase 5 du tick.
- [[Weather MPC]] — `UHWWeatherMPCManager` publie les valeurs finales (non lissées) en phase 10 vers les MPC globaux, consommant le résultat produit par `UHWPropertyCache` après la phase 5.
- [[HW Environment Manager]] — possède l'UPROPERTY `TObjectPtr<UHWPropertyCache> PropertyCache` (ligne 729 de `HWEnvironmentManager.h`) qu'il tick en phase 5 du pipeline.
