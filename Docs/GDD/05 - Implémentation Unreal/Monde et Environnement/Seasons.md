---
tags: [implementation, ue5, environment, seasons, eras]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [coexistence-saisons-eres]
implements: [Les Ères]
---

# Seasons

> Système saisonnier. Source : `Source/HybeliorWorld/Public/Environment/HWSeasons.h/.cpp`

`AHWSeasons` gère la progression saisonnière et les modificateurs appliqués à la météo, la végétation et le terrain.

## Coexistence Saisons (court) vs Ères (long)

> Voir [[Les Ères]] et [[HW Environment Manager]] §"phase EraGenerator".
>
> Les **4 saisons** (Spring / Summer / Autumn / Winter) restent un **cycle court visuel** (~60 min in-game par saison) qui pilote la végétation, la palette diurne et les variantes météo. Elles **ne portent pas la dramaturgie** du jeu.
>
> Les **Ères** sont un **cycle long thématique** (3 à 9 mois IRL — paramétriques) qui définissent l'identité cosmique de la session : entités spawnées, palette de teinte globale, types d'événements possibles, biomes biaisés. Voir [[Les Ères]] pour la liste des archétypes (Noctis, Tempora, Eldoria, etc.).
>
> Les deux systèmes fonctionnent **en parallèle** — pas de conflit, ils opèrent à des échelles temporelles disjointes. La saison module l'arbre rose au printemps, l'ère module l'apparition de mobs Shadow et le brouillard violet.

## Paramètres globaux

| Paramètre | Valeur |
|-----------|--------|
| Nombre de saisons | 4 (Spring, Summer, Autumn, Winter) |
| SeasonDurationMinutes | 60 (4h IRL par cycle complet) |
| SnowLine | ±1km selon saison |

## Modificateurs par saison

### Température

| Saison | Modifier |
|--------|----------|
| Spring | +0.0 |
| Summer | +0.3 |
| Autumn | 0.0 |
| Winter | -0.3 |

### Humidité (Moisture)

| Saison | Modifier |
|--------|----------|
| Spring | +0.2 (asymétrique — incohérence #10) |
| Summer | -0.1 |
| Autumn | +0.1 |
| Winter | -0.2 |

### Foliage Tint (teinte végétation)

| Saison | Couleur cible |
|--------|---------------|
| Spring | Vert vif |
| Summer | Vert saturé |
| Autumn | Orange |
| Winter | Gris-brun |

Transition visuelle continue via MPC `UDWParametersMPC.FoliageTint`.

## Intégration météo

Les modificateurs s'ajoutent à la configuration de biome (`BaseTemperature + SeasonModifier`). Affecte :
- Probabilités de types météo (Snow plus probable en Winter)
- Densité précipitations
- SnowLine altitude (plus basse en Winter)

## API

```cpp
EHWSeason GetCurrentSeason() const;
float GetSeasonalTemperatureModifier() const;
float GetSeasonalMoistureModifier() const;
FLinearColor GetFoliageTint() const;
float GetSnowLine() const;         // Altitude en cm
```

## Pipeline phase 11

La phase finale du tick pousse la config saisonnière aux sous-systèmes via `AHWEnvironmentManager` :
```
EnvironmentManager.Tick
    ↓ phase 11
AHWSeasons → pousse FoliageTint, SnowLine, modifiers
    ↓
WeatherSystem, TerrainMaterialManager, MPCManager
```

## Voir aussi

- [[HW Environment Manager]] — détient la référence faible `TWeakObjectPtr<AHWSeasons> SeasonsActor` (ligne 739 de `HWEnvironmentManager.h`), découverte via `EngineUtils` et configurée en phase 11 du tick pour pousser `SeasonDurationMinutes` et synchroniser les modifiers.
- [[Biome System]] — `AHWSeasons::GetSeasonalTemperatureModifier()` / `GetSeasonalMoistureModifier()` retournent des offsets documentés (ex. Winter=-0.3, Summer=+0.3) qui s'ajoutent aux `TemperatureLevel` et `MoistureLevel` du `FHWBiomeData` pour moduler la génération.
- [[Weather MPC]] — `AHWSeasons::GetSeasonalFoliageTint()` fournit une `FLinearColor` lerpée entre 4 teintes ; cette valeur est publiée via `UHWWeatherMPCManager` en phase 10 vers `UDWParametersMPC.FoliageTint`.
