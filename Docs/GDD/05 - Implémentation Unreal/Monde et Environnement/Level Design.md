---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# LevelDesign

> Inventaire des maps `.umap`, configuration startup, zones OWS, World Partition.

## Configuration de démarrage

Source : `Config/DefaultEngine.ini` — `[/Script/EngineSettings.GameMapsSettings]`

| Paramètre | Valeur |
|-----------|--------|
| `EditorStartupMap` | `/Game/Maps/TestMap.TestMap` |
| `GameDefaultMap` | `/Game/Maps/TestMap.TestMap` |
| `TransitionMap` | (vide) |
| `GlobalDefaultGameMode` | `BP_HybeliorGameMode_C` |
| `GlobalDefaultServerGameMode` | None |
| `GameInstanceClass` | `/Script/OWSPlugin.OWSGameInstance` |

> **Note** : `TestMap` référencée comme startup mais absente de `Content/Maps/` — probablement archivée.

## Inventaire complet des maps

### Monde ouvert — Production

| Map | Rôle | Taille |
|-----|------|--------|
| `HybeliorWorld_50km_V3.umap` | Map principale V3 | 50 km × 50 km |
| `HybeliorWorld_20km_V2.umap` | Version intermédiaire | 20 km × 20 km |

**Couches de peinture terrain (V3)** : Desert, Desolation, GlacierPermanents, Grassland, Savanna, Taiga, Temperate, Tropical, Tundra (9 biomes).

### Zones nommées (gameplay)

| Map | Rôle |
|-----|------|
| `HubWorldMap.umap` | Zone centrale / ville de départ — **spawn par défaut** (`HubWorld`, X=1510, Y=-160, Z=100) |
| `Canyon.umap` | Zone canyon — environnement rocheux, combat |
| `Galenor.umap` | Region lore — exportée World Partition |
| `DeadKingdom.umap` | Royaume Mort — zone haute niveau |
| `DeadZone.umap` | Zone inhospitalière / désertique |

### Interface / Session

| Map | Rôle |
|-----|------|
| `Login.umap` | Écran connexion / auth OWS — `BP_LoginGameMode`, `UI_LoginWidget` |

### Développement / Test

| Map | Rôle |
|-----|------|
| `TestScaleBiomeV3.umap` | Validation biomes V3 — 18 couches peinture |
| `M_GenerateCity_V2.umap` | Génération procédurale ville (V2) |
| `Map_Test_ProceduralGene.umap` | Tests PCG |
| `8m_Landscape_WC_Complete.umap` | Carte monde 8m/pixel — référence cartographique |

### Maquettes / Concept

| Map | Rôle |
|-----|------|
| `Concept_Map.umap` | Prototype layout monde |
| `Interior_Map.umap` | Test intérieurs bâtiments |

**Total : 14 maps `.umap`** dans `Content/Maps/`.

## Zones OWS (SQL)

Source : `SQL/Initialize.sql` (MSSQL, MySQL, Postgres)

| ZoneName | MapName | SoftCap | HardCap | Shutdown | Spawn défaut |
|----------|---------|---------|---------|----------|--------------|
| HubWorld | HubWorldMap | 60 | 80 | 1 min | Oui — X=1510, Y=-160, Z=100 |
| SouthGate | HubWorldMap | 60 | 80 | 1 min | Non |

> Canyon, Galenor, DeadKingdom, etc. sont à ajouter manuellement à la table OWS `Maps` lors de leur mise en production.

### DefaultCharacterValues

```json
DefaultSetName : "Default"
StartingMapName : "HubWorld"
Position spawn  : X=1510, Y=-160, Z=100
BaseCharacterStats : { "Strength": 10, "Agility": 10, "Constitution": 10 }
BaseCharacterSkills: { "Skill1": 1 }
BagInventory       : { "items": [] }
```

## ExternalActors — World Partition (One File Per Actor)

Maps utilisant OFPA (acteurs répartis en grille hexadécimale `__ExternalActors__/Maps/<MapName>/`) :

Canyon, DeadKingdom, DeadZone, Galenor, HybeliorWorld_20km_V2, HybeliorWorld_50km_V3, M_GenerateCity_V2, Map_DeadKingdom, ThirdPersonMap

> `ThirdPersonMap` présent uniquement dans `__ExternalActors__` — vestige du template UE5.

## Paramètres de rendu (DefaultEngine.ini)

| Paramètre | Valeur | Impact |
|-----------|--------|--------|
| `r.DynamicGlobalIlluminationMethod=1` | Lumen | Tous mondes ouverts |
| `r.ReflectionMethod=1` | Lumen Reflections | Eau, métal |
| `r.Shadow.Virtual.Enable=1` | Virtual Shadow Maps | Grandes étendues |
| `r.GenerateMeshDistanceFields=True` | Distance Fields | Lumen + AO |
| `bNewMapsEnableWorldPartition=False` | WP non auto | Activation manuelle |
| `NearClipPlane=2.0` | Plan proche 2cm | Intérieurs |
| `TilePoolSize=200000` | NavMesh pool | 200k tuiles nav |

## Flux de connexion joueur

```
Joueur lance le jeu
    ↓
Login.umap (BP_LoginGameMode + UI_LoginWidget)
    ↓
OWS: LoginAndCreateSession
OWS: GetAllCharacters / CreateCharacter
    ↓
OWS: GetServerToConnectTo(ZoneName='HubWorld')
    ↓
HubWorldMap.umap — Zone OWS 'HubWorld'
Spawn : X=1510, Y=-160, Z=100
    ↓
Travel → Canyon / Galenor / DeadKingdom / DeadZone
```

## Voir aussi

- [[Terrain Manager]] — `AHWTerrainManager` est l'acteur principal à placer dans les maps de production (`HybeliorWorld_50km_V3.umap`) ; ses UPROPERTY `WorldSize=100000000cm` et `MacroMap` (UTexture2D) pilotent l'étendue et le dessin de biomes des niveaux listés.
- [[Biome System]] — `UHWTerrainBiomeMap::Initialize(MacroMap)` lit la texture macro 2048x2048 référencée dans les maps via l'UPROPERTY `MacroMap` de `AHWTerrainManager`, résolvant chaque couleur vers un `FHWBiomeData`.
- [[Levels]] — map hub dédiée listée dans l'inventaire de cette page.
- [[Levels]] — map de validation des 17 biomes listée dans l'inventaire.
