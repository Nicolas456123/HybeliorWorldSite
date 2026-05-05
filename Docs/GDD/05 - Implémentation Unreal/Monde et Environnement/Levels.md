---
tags: [implementation, ue5, world, levels]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [content-refresh-after-blockout-validation]
implements: [Exploration]
---

# Levels (Maps UE5)

> Catalogue des niveaux UE5 actuellement présents dans le projet : `HubWorldMap` (hub jouable principal) et `TestScaleBiomeV3` (banc d'essai biomes). Source MCP `unreal_python` / `unreal_get_actors` — extraction 2026-04-04.
> Fichier issu de la fusion `Level_HubWorld.md` + `Level_TestBiome.md` (V3.3).

## Classes C++ associées
- [[Level Design]] — conventions de layout, zones fonctionnelles, bornage du hub
- [[Biome System]] — 17 biomes validés par TestScaleBiomeV3 (LayerInfo TestScaleBiomeV3_sharedassets)
- [[HW Environment Manager]] — pilotage atmosphérique global

---

# Partie 1 — HubWorldMap

> Chemin UE5 : `/Game/Maps/HubWorldMap`

## 1.1 Vue d'ensemble

La **HubWorldMap** est la carte centrale de HybeliorWorld. Elle sert de point de départ pour les joueurs, de zone d'entrainement au combat, et de hub de navigation vers d'autres cartes via des portails de transport.

| Propriété | Valeur |
|---|---|
| Chemin asset | `/Game/Maps/HubWorldMap.HubWorldMap` |
| Total acteurs dans le niveau | **184** |
| StaticMeshActors | 165 |
| Landscape (1 actor, étendue ~2 km) | 203 200 x 203 200 UU |
| PlayerStart | Aucun (0) |
| Aucun World Partition | Niveau classique |

### Environnement atmosphérique

| Acteur | Classe | Position |
|---|---|---|
| SkyAtmosphere | SkyAtmosphere | X=700, Y=-220, Z=230 |
| ExponentialHeightFog | ExponentialHeightFog | X=610, Y=-430, Z=190 |
| DirectionalLight | DirectionalLight | X=710, Y=70, Z=340 |
| SkyLight | SkyLight | X=660, Y=290, Z=250 |
| PostProcessVolume | PostProcessVolume | X=575 970, Y=181 600, Z=1 990 (volume global distant) |

## 1.2 Terrain (Landscape)

Un unique acteur `Landscape` couvre la zone jouable principale.

| Label | Position (origine) | Étendue |
|---|---|---|
| Landscape | X=-101 600, Y=-101 600, Z=100 | ±101 600 UU (~1 016 m) en X et Y |

> L'étendue totale couvre environ **2 km x 2 km** de terrain jouable depuis le centre.

## 1.3 Gestionnaire de contenu Hub

### HubWorldContentManager

Acteur Blueprint singleton gérant le contenu dynamique du hub (zones actives, transitions, état).

| Label | Classe | Position |
|---|---|---|
| HubWorldContentManager1 | HubWorldContentManager_C | X=2 160, Y=-510, Z=1 320 |

- Positionné en hauteur (Z=1 320) au-dessus de la zone centrale, hors de la ligne de vue joueur.
- Aucune propriété UPROPERTY exposée directement via l'API Python (variables BP internes).

## 1.4 Portails (BP_BoxPortal)

3 portails de type `BP_BoxPortal_C` sont placés dans le niveau. Ils fonctionnent comme des zones de déclenchement volumétriques permettant la transition vers d'autres cartes ou zones.

| Label | Position | Orientation (Yaw) | Volume (extent UU) | Zone fonctionnelle |
|---|---|---|---|---|
| BP_BoxPortal | X=3 510, Y=-360, Z=400 | 0° (face Est) | 200 x 600 x 1 000 | Portail Zone Entraînement — entrée Ouest |
| BP_BoxPortal2 | X=3 640, Y=-360, Z=400 | 180° (face Ouest) | 200 x 600 x 1 000 | Portail Zone Entraînement — sortie Est |
| BP_BoxPortal3 | X=1 590, Y=-3 260, Z=180 | -90° (face Nord) | 600 x 200 x 475 | Portail Zone Sud / accès secondaire |

**Analyse de disposition :**
- `BP_BoxPortal` et `BP_BoxPortal2` sont placés côte à côte (130 UU d'écart en X), formant un couloir de portail bidirectionnel.
- `BP_BoxPortal3` est isolé au sud, encadré par des cubes prototypes.

## 1.5 Zone d'Entraînement au Combat

3 spawners de mannequins d'entraînement forment un triangle dans la zone nord-est de la map.

| Label | Position |
|---|---|
| BP_SpawnTrainingDummy | X=5 410, Y=1 980, Z=220 |
| BP_SpawnTrainingDummy2 | X=5 660, Y=1 980, Z=220 |
| BP_SpawnTrainingDummy3 | X=5 530, Y=1 740, Z=220 |

## 1.6 Structure architecturale (SM_Cube — géométrie prototype)

19 acteurs `StaticMeshActor` constituent les murs, sols et structures de test du hub (Groupes A à D détaillés dans la doc d'origine ; voir aussi le rendu 3D Editor).

## 1.7 Décor environnemental — Falaises de glace

| Catégorie | Mesh base | Nombre |
|---|---|---|
| Falaise glace type A (horizontale) | `S_Ice_Cliff_uhpocesfa_high` | 36 |
| Falaise glace type B (horizontale, variante) | `S_Ice_Cliff_vdfjegtdb_high` | 31 |
| Falaise glace type C (verticale, haute) | `S_Ice_Cliff_vd4hbizcb_high` | 46 |

**Total falaises de glace : 113 acteurs.** Plus 19 congères de neige et 13 rochers enneigés (12 lointains pour le décor d'horizon).

## 1.8 Élément spécial — Dart_Cruiser

Mesh d'un vaisseau placé en hauteur (X=-22 225, Y=-5 175, Z=13 550) servant d'élément décoratif sci-fi cohérent avec l'univers.

## 1.9 Audio

- `Music` (AmbientSound) à l'origine, asset `C_Beautifull`.
- `BP_OceanInfiniteWaveAudio` à Y=4 180 000 UU (ambiance océan lointain).

## 1.10 Liaison BP ↔ C++

| Blueprint/Acteur placé | Classe C++ héritée | Fichier source |
|---|---|---|
| HubWorldContentManager_C | `ADynamicContentManager` | `Interaction/DynamicContentManager.h` |
| BP_BoxPortal_C (×3) | `AHWPortal` | `Interaction/HWPortal.h` |
| BP_SpawnTrainingDummy_C | `AActor` (référence BP_EntitySpawner) | — |

### Portails configurés

| Actor | ZoneName | Destination |
|---|---|---|
| BP_BoxPortal | 'SouthGate' | X=4080, Y=-320 |
| BP_BoxPortal2 | 'HubWorld' | X=3120, Y=-340 (retour) |
| BP_BoxPortal3 | 'TestMap' | X=-5340, Y=5140 |

Ces ZoneNames correspondent aux entrées de la table `Maps` côté OWS.

> `AHWTerrainManager` (C++) n'est **pas** dans cette map. Le terrain est un `Landscape` statique UE5, pas procédural.

## 1.11 Synthèse — Inventaire complet

| Catégorie | Quantité |
|---|---|
| Gestionnaire Hub (`HubWorldContentManager_C`) | 1 |
| Portails (`BP_BoxPortal_C`) | 3 |
| Spawners mannequins (`BP_SpawnTrainingDummy_C`) | 3 |
| Cibles téléportation (`BP_TargetLocation_C`) | 3 |
| Audio (Music + Ocean) | 2 |
| Terrain (Landscape) | 1 |
| Falaises de glace (3 types) | 113 |
| Congères / rochers de neige | 32 |
| Cubes prototype (SM_Cube) | 19 |
| Vaisseau Dart_Cruiser | 1 |
| Lighting / Atmosphère / Post-process | 5 |
| Systèmes internes UE | 4 |
| **TOTAL** | **184** |

---

# Partie 2 — TestScaleBiomeV3

> Chemin UE : `/Game/Maps/TestScaleBIomeV3/TestScaleBiomeV3` — banc d'essai biomes.

## 2.1 Vue d'ensemble

`TestScaleBiomeV3` est une map de test dédiée à la **validation visuelle et technique du système de biomes à grande échelle**. Elle ne contient pas d'environnement de jeu finalisé.

| Propriété | Valeur |
|---|---|
| Nom interne | `TestScaleBiomeV3` |
| Chemin package | `/Game/Maps/TestScaleBIomeV3/TestScaleBiomeV3` |
| Acteurs total | **16** |
| Landscapes | 6 |
| StaticMeshActors | 4 |
| Blueprints spéciaux | 5 |

## 2.2 Configuration du terrain

6 instances Landscape distinctes (Landscape0 à Landscape5), toutes positionnées à l'origine, partageant l'échelle XY de **200 UU/quads** (résolution 2 m/pixel) et l'échelle Z ~1178.85.

| Label | Matériau | Echelle XY | Echelle Z |
|---|---|---|---|
| Landscape0 | `M_LandscapeBiomes_Inst` | 200.0 | 1178.85 |
| Landscape1 | `M_LandscapeBiomes_Inst` | 200.0 | 1178.84 |
| Landscape2 | *(aucun — non assigné)* | 200.0 | 1178.85 |
| Landscape3-5 | `M_LandscapeBiomes_Inst` | 200.0 | 1178.85 |

> `Landscape2` sans matériau — probablement un tile en cours de configuration.

### Matériau principal

- `M_LandscapeBiomes_Inst` (`/Game/Assets/Materials/Landscape/`) — Material Instance pilotant la distribution des biomes via `LayerInfo`.

## 2.3 Layers biomes (17)

Layers déclarés dans `TestScaleBiomeV3_sharedassets/` :

| Catégorie | Biomes |
|---|---|
| Polaires / Froids | PolarIce, Snow, Tundra, ColdLand, ColdDesert |
| Tempérés | MixedForest, ConiferousForest, DecidiousForest, Steppe, Chaparral |
| Chauds / Arides | HotDesert, Savana |
| Tropicaux | TropicalForest, TropicalSeason |
| Aquatiques | Ocean |
| Distribution | ForestDistribution |
| Base | Base |

(+ 1 layer de visibilité masque `__LANDSCAPE_VISIBILITY___LayerInfo`).

## 2.4 Acteurs placés

| Classe | Nombre | Rôle |
|---|---|---|
| `Landscape` | 6 | Terrains multi-tuiles biomes |
| `StaticMeshActor` | 4 | Géométrie de référence de scale (Cube + 3 Plane à scale planétaire) |
| `BP_TargetLocation_C` | 3 | Points de téléportation de test |
| `PostProcessVolume` | 1 | Post-process global |
| `BP_OceanInfiniteWaveAudio_C` | 1 | Audio ambiant d'océan |
| `AmbientSound` | 1 | Musique de fond |
| **Total** | **16** | |

## 2.5 Observations et notes techniques

- **Landscape2 sans matériau** : produira un rendu gris par défaut. À corriger ou intentionnel.
- **Bounds nulles** : tous les landscapes retournent `(0, 0, 0)` — heightmap vide ou tiles non initialisés.
- **Plans à scale planétaire** : `Plane` à scale 1 000 000 UU teste la représentation continentale.
- **Absence de lights** : pas de `DirectionalLight` / `SkyLight` / `SkyAtmosphere` — utilise les lights par défaut UE5 ou hérite d'un template.
- **Casse du chemin** : `TestScaleBIomeV3` (I majuscule) ≠ nom de map `TestScaleBiomeV3`. Attention aux références sensibles à la casse.

---

## Liens documentaires

- [[Level Design]]
- [[Biome System]]
- [[HW Environment Manager]]
- [[Interactable Framework]] (`AHWPortal`, `ADynamicContentManager`)
- [[Index Backend OWS]] (table `Maps`)
