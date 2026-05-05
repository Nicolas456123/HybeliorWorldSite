---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation MCP — FoliageTypes & GrassTypes
**HybeliorWorld UE5.4** | Généré via MCP Python | Date : 2026-04-04

## Classes C++ associées
- [[Biome System]] — définit les biomes qui choisissent les FoliageTypes/GrassTypes à spawner
- [[PCG Graphs]] — graphes PCG consommant les FoliageTypes procéduraux (Trees_Summer/Dry/Winter)

---

## Résumé

| Catégorie | Nombre |
|---|---|
| `FoliageType_InstancedStaticMesh` | 70 |
| `LandscapeGrassType` | 26 |
| **Total** | **96** |

Répartition des assets actifs par dossier source :

| Dossier | Type | Nb |
|---|---|---|
| `/Game/Environment/Water/Environments/FoliageType/` | FoliageType ISM | 23 |
| `/Game/World/Procedural/Foliage/Trees_Summer/` | FoliageType ISM | 9 |
| `/Game/World/Procedural/Foliage/Trees_Dry/` | FoliageType ISM | 9 |
| `/Game/World/Procedural/Foliage/Trees_Winter/` | FoliageType ISM | 9 |
| `/Game/World/Procedural/Foliage/Bushes_Summer/` | FoliageType ISM | 3 |
| `/Game/World/Procedural/Forest/FoliageTypes/` | FoliageType ISM | 4 |
| `/Game/World/Procedural/Grasslands/Cliffs/` | FoliageType ISM | 4 |
| `/Game/World/Procedural/Grasslands/Cliffs_Small/` | FoliageType ISM | 4 |
| `/Game/World/Procedural/Snow/Cliffs/` | FoliageType ISM | 2 |
| `/Game/World/Vegetation/Trees/` | FoliageType ISM | 9 |
| `/Game/World/Vegetation/Bushes/` | FoliageType ISM | 3 |
| `/Game/Environment/Landscape/ProceduralMeshes/Foliage/` | FoliageType ISM | 1 |
| `/Game/_Archive/Misc/_GENERATED/nicol/` | FoliageType ISM (archive) | 3 |
| `/Game/Assets/Materials/Landscape/GrassType/` | LandscapeGrassType | 8 |
| `/Game/Environment/Landscape/GrassTypes/` | LandscapeGrassType | 11 |
| `/Game/Environment/Water/Environments/Landscape/LandscapeGrassType/` | LandscapeGrassType | 2 |
| `/Game/ThirdParty/Medieval_Castle_Vol1/Materials/Landscape/` | LandscapeGrassType | 2 |
| `/Game/ThirdParty/Procedural_Ecosystem/Meshes/Ecosystem/Meadow/` | LandscapeGrassType | 1 |
| `/Game/ThirdParty/Procedural_Ecosystem/Meshes/Ecosystem/Meadow/` | LandscapeGrassType | 1 |

---

## 1. FoliageType_InstancedStaticMesh

### 1.1 Biome Côtier / Water HW (`/Game/Environment/Water/Environments/FoliageType/`)

Ces FoliageTypes proviennent du système **Water HW** et sont utilisés pour peupler les zones côtières et insulaires. Tous ont `align_to_normal = True` et `cast_shadow = True`.

| Nom | Mesh référencé | Densité | Cull max | Remarques |
|---|---|---|---|---|
| `SM_MountainRocks_FoliageType` | `SM_MountainRocks` | 100 | 100 000 | Rochers montagneux |
| `SM_MountainRocks_Alternative_FoliageType` | `SM_MountainRocks_Alternative` | 100 | 100 000 | Variante rochers |
| `SM_Heather_Mesh_Clumps2_WorldPopulate_FoliageType` | `SM_Heather_Mesh_Clumps2_WorldPopulate` | 10 | 0 (désactivé) | Bruyère world populate |
| `SM_Heather_Mesh_Clumps2_FoliageType` | `SM_Heather_Mesh_Clumps2` | 10 | 0 (désactivé) | Bruyère dense |
| `SM_FieldGrass_01_FoliageType` | `SM_FieldGrass_01` | 100 | 0 (désactivé) | Herbe de champs |
| `SM_Buttercup_Patch_01_FoliageType` | `SM_Buttercup_Patch_01` | 100 | 0 (désactivé) | Boutons d'or |
| `SM_BigRock_FoliageType` | `SM_BigRock` | 100 | 25 003 | Grandes roches |
| `QueenPalmSeedling_FoliageType` | `SM_QueenPalmSeedling` | 100 | 25 000 | Palmier Queen — semis |
| `QueenPalmSapling_FoliageType` | `SM_QueenPalmSapling` | 100 | 25 000 | Palmier Queen — jeune |
| `QueenPalmHeroForest_FoliageType` | `SM_QueenPalmHeroForest` | 100 | 100 000 | Palmier Queen — héros forêt |
| `QueenPalmDesktopForest_FoliageType` | `SM_QueenPalmDesktopForest` | 100 | 100 000 | Palmier Queen — forêt desktop |
| `QueenPalmDesktopField_FoliageType` | `SM_QueenPalmDesktopField` | 100 | 100 000 | Palmier Queen — champ desktop |
| `PalmSagoSapling_FoliageType` | `SM_PalmSagoSapling` | 100 | 25 000 | Sagoutier — jeune |
| `PalmSagoHeroField_FoliageType` | `SM_PalmSagoHeroField` | 100 | 25 000 | Sagoutier — héros champ |
| `PalmSagoDesktopForest_FoliageType` | `SM_PalmSagoDesktopForest` | 100 | 25 000 | Sagoutier — forêt |
| `PalmSagoDesktopField_FoliageType` | `SM_PalmSagoDesktopField` | 100 | 15 000 | Sagoutier — champ |
| `PalmDesktopForest_FoliageType` | `SM_PalmDesktopForest` | 100 | 15 000 | Palmier générique forêt |
| `GrassEuropeanBeachWeedySpread_FoliageType` | `SM_GrassEuropeanBeachWeedySpread` | 100 | 25 000 | Herbe de plage — éparse |
| `GrassEuropeanBeachOrnamentalClump_FoliageType` | `SM_GrassEuropeanBeachOrnamentalClump` | 100 | 25 000 | Herbe de plage — touffes ornementales |
| `GrassEuropeanBeachLawnClump_FoliageType` | `SM_GrassEuropeanBeachLawnClump` | **200** | 25 000 | Herbe de plage — gazon (densité max) |
| `GingerRedDesktopField_FoliageType` | `SM_GingerRedDesktopField` | 100 | 15 000 | Gingembre rouge |
| `BushOctopusHero_FoliageType` | `SM_BushOctopusHero` | 100 | 100 000 | Buisson poulpe — héros |
| `BushOctopusHeroField_FoliageType` | `SM_BushOctopusHeroField` | 100 | 100 000 | Buisson poulpe — champ héros |

> **Note LOD Water HW :** La plupart des palmiers ont des cull distances différenciées selon leur stade (seedling=25k, héros=100k), reflétant une hiérarchie LOD intentionnelle par taille de mesh.

---

### 1.2 Arbres Été (`/Game/World/Procedural/Foliage/Trees_Summer/FoliageTypes/`)

FoliageTypes procéduraux pour végétation estivale. `align_to_normal = False`, `cast_shadow = True`. Mesh non référencé directement (assigné via PCG Spawner ou FoliageSpawner Blueprint).

| Nom | Densité | Cull max | Seed initiale | Remarques |
|---|---|---|---|---|
| `FT_Maple_Small` | 1.0 | 0 | 0.30 | Érable petit |
| `FT_Maple_Medium` | 1.0 | 0 | 0.30 | Érable moyen |
| `FT_Maple_Large` | 1.0 | 0 | 0.30 | Érable grand |
| `FT_Birch_Small` | 100.0 | 0 | 0.30 | Bouleau petit (densité élevée) |
| `FT_Birch_Medium` | 100.0 | 0 | 0.30 | Bouleau moyen (densité élevée) |
| `FT_Birch_Large` | 100.0 | 0 | 0.30 | Bouleau grand (densité élevée) |
| `FT_Cedar_Small` | 0.40 | 0 | 0.30 | Cèdre petit (rare) |
| `FT_Cedar_Medium` | 0.40 | 0 | 0.30 | Cèdre moyen (rare) |
| `FT_Cedar_Large` | 0.40 | 0 | 0.30 | Cèdre grand (rare) |
| `FT_GenericBush_Small` | 1.0 | 0 | 0.30 | Buisson générique petit |
| `FT_GenericBush_Medium` | 15.0 | 0 | 0.30 | Buisson générique moyen |
| `FT_GenericBush_Large` | 15.0 | 0 | 0.30 | Buisson générique grand |

---

### 1.3 Arbres Saison Sèche (`/Game/World/Procedural/Foliage/Trees_Dry/FoliageTypes/`)

Variantes automnales/sèches des mêmes espèces. Mêmes réglages que l'été sauf densité.

| Nom | Densité | Cull max | Seed initiale |
|---|---|---|---|
| `FT_Maple_Small_Dry` | 1.0 | 0 | 0.20 |
| `FT_Maple_Medium_Dry` | 1.0 | 0 | 0.30 |
| `FT_Maple_Large_Dry` | 1.0 | 0 | 0.30 |
| `FT_JuniperBush_Small_Dry` | 15.0 | 0 | 0.30 |
| `FT_JuniperBush_Medium_Dry` | 15.0 | 0 | 0.30 |
| `FT_JuniperBush_Large_Dry` | 15.0 | 0 | 0.30 |
| `FT_Cedar_Small_Dry` | 1.0 | 0 | 0.30 |
| `FT_Cedar_Medium_Dry` | 1.0 | 0 | 0.30 |
| `FT_Cedar_Large_Dry` | 1.0 | 0 | 0.30 |
| `FT_Birch_Small_Dry` | 1.0 | 0 | 0.30 |
| `FT_Birch_Medium_Dry` | 1.0 | 0 | 0.30 |
| `FT_Birch_Large_Dry` | 1.0 | 0 | 0.30 |

---

### 1.4 Arbres Hiver (`/Game/World/Procedural/Foliage/Trees_Winter/FoliageTypes/`)

Variantes hivernales avec neige. Mêmes densités que `_Dry`.

| Nom | Densité | Cull max | Seed initiale |
|---|---|---|---|
| `FT_Maple_Small_Snow` | 1.0 | 0 | 0.20 |
| `FT_Maple_Medium_Snow` | 1.0 | 0 | 0.30 |
| `FT_Maple_Large_Snow` | 1.0 | 0 | 0.30 |
| `FT_GenericBush_Small_Snow` | 15.0 | 0 | 0.30 |
| `FT_GenericBush_Medium_Snow` | 15.0 | 0 | 0.30 |
| `FT_GenericBush_Large_Snow` | 15.0 | 0 | 0.30 |
| `FT_Cedar_Small_Snow` | 1.0 | 0 | 0.30 |
| `FT_Cedar_Medium_Snow` | 1.0 | 0 | 0.30 |
| `FT_Cedar_Large_Snow` | 1.0 | 0 | 0.30 |
| `FT_Birch_Small_Snow` | 1.0 | 0 | 0.30 |
| `FT_Birch_Medium_Snow` | 1.0 | 0 | 0.30 |
| `FT_Birch_Large_Snow` | 1.0 | 0 | 0.30 |

---

### 1.5 Buissons Été (`/Game/World/Procedural/Foliage/Bushes_Summer/FoliageTypes/`)

| Nom | Densité | Cull max | Seed initiale | Remarques |
|---|---|---|---|---|
| `FT_JuniperBush_Small` | 500.0 | 5 000 | 1.0 | Genévrier petit — haute densité proche |
| `FT_JuniperBush_Medium` | 500.0 | 5 000 | 1.0 | Genévrier moyen — haute densité proche |
| `FT_JuniperBush_Large` | 15.0 | 14 000 | 1.0 | Genévrier grand — visible à distance |

---

### 1.6 Rochers Forêt (`/Game/World/Procedural/Forest/FoliageTypes/`)

`align_to_normal = True`, cull différencié selon saison.

| Nom | Densité | Cull max | Seed initiale | Saison |
|---|---|---|---|---|
| `FT_ForestRock_01_Summer` | 100.0 | 3 000 | 1.0 | Été |
| `FT_ForestRock_02_Summer` | 100.0 | 3 000 | 1.0 | Été |
| `FT_ForestRock_01_Winter` | 100.0 | 30 000 | 1.0 | Hiver (cull x10) |
| `FT_ForestRock_02_Winter` | 100.0 | 30 000 | 1.0 | Hiver (cull x10) |

> **Note :** Le cull distance hivernal est 10x supérieur à l'été, probablement car le manteau neigeux rend les rochers moins nombreux visuellement à courte distance.

---

### 1.7 Falaises Prairies (`/Game/World/Procedural/Grasslands/Cliffs/` et `Cliffs_Small/`)

`align_to_normal = True`. Deux tailles de rochers (grandes et petites falaises).

| Nom | Densité | Cull max | Seed | Contexte |
|---|---|---|---|---|
| `FT_Rock_02` (Cliffs) | 100.0 | 30 000 | 0.60 | Grande falaise |
| `FT_Rock_03` (Cliffs) | 100.0 | 30 000 | 0.60 | Grande falaise |
| `FT_Rock_04` (Cliffs) | 2.0 | 20 000 | 0.60 | Grande falaise — épars |
| `FT_Rock_05` (Cliffs) | 2.0 | 20 000 | 0.60 | Grande falaise — épars |
| `FT_Rock_02` (Cliffs_Small) | 100.0 | 30 000 | 0.60 | Petite falaise |
| `FT_Rock_03` (Cliffs_Small) | 100.0 | 30 000 | 0.60 | Petite falaise |
| `FT_Rock_04` (Cliffs_Small) | 2.0 | 20 000 | 0.60 | Petite falaise — épars |
| `FT_Rock_05` (Cliffs_Small) | 2.0 | 20 000 | 0.60 | Petite falaise — épars |

---

### 1.8 Dalles Neige (`/Game/World/Procedural/Snow/Cliffs/FoliageTypes/`)

`align_to_normal = True`, seed = 0.40.

| Nom | Densité | Cull max |
|---|---|---|
| `FT_Cliff_Slab_01` | 100.0 | 30 000 |
| `FT_Cliff_Slab_02` | 100.0 | 30 000 |

---

### 1.9 Végétation Statique — Arbres (`/Game/World/Vegetation/Trees/`)

FoliageTypes liés directement aux assets d'arbres (hors procédural PCG).

| Nom | Densité | Cull max | Seed | Remarques |
|---|---|---|---|---|
| `FT_Birch_Small` | 5.0 | 0 | 1.0 | Bouleau ref directe |
| `FT_Birch_Medium` | 5.0 | 0 | 1.0 | Bouleau ref directe |
| `FT_Birch_Large` | 5.0 | 0 | 1.0 | Bouleau ref directe |
| `FT_Cedar_Small` | 1.0 | 0 | 1.0 | Cèdre ref directe |
| `FT_Cedar_Medium` | 1.0 | 0 | 1.0 | Cèdre ref directe |
| `FT_Cedar_Large` | **0.25** | 0 | 1.0 | Cèdre grand — très rare |
| `FT_Maple_Small` | 1.0 | 0 | 1.0 | Érable ref directe |
| `FT_Maple_Medium` | 1.0 | 0 | 1.0 | Érable ref directe |
| `FT_Maple_Large` | 1.0 | **100 000 min** | 1.0 | Cull forcé (toujours visible) |

---

### 1.10 Végétation Statique — Buissons (`/Game/World/Vegetation/Bushes/GenericBush/FoliageTypes/`)

| Nom | Densité | Cull max | Seed |
|---|---|---|---|
| `FT_JuniperBush_Small` | **1 000.0** | 100 000 | 1.0 |
| `FT_JuniperBush_Medium` | 25.0 | 0 | 1.0 |
| `FT_JuniperBush_Large` | 1.0 | 0 | 1.0 |

---

### 1.11 Herbe Sèche Procédurale (`/Game/Environment/Landscape/ProceduralMeshes/Foliage/GrassDry/FoliageTypes/`)

| Nom | Densité | Cull max | Align | Shadow |
|---|---|---|---|---|
| `FT_GrassDry` | 250.0 | 10 000 | True | True |

---

### 1.12 Archive (`/Game/_Archive/Misc/_GENERATED/nicol/`)

Assets générés automatiquement (merge de meshes), non utilisés en production.

| Nom |
|---|
| `Merge_F4EF7AF3_FoliageType` |
| `Merge_B71A5834_FoliageType` |
| `Merge_5233F363_FoliageType` |

---

## 2. LandscapeGrassType

Les LandscapeGrassTypes contiennent des **grass_varieties** — tableaux de variétés d'herbe/végétation reliées à des couches de peinture du Landscape. Chaque variété a son propre mesh, densité et plage de culling.

### 2.1 Biomes HWAssets — GrassTypes par Biome (`/Game/Assets/Materials/Landscape/GrassType/`)

#### GT_Tropical_Tree
Biome **tropical**. 13 variétés d'arbres et palmiers.

| Mesh | Densité | Cull start | Cull end |
|---|---|---|---|
| `SM_Tree_Tropic_01` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Tropic_01_novines` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Tropic_02` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Tropic_02_novines` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Tropic_03` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Tropic_03_novines` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Medium_01` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Medium_02` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Fern_01` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Fern_02` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Banana_01` | 0.10 | 20 000 | 20 000 |
| `SM_Tree_Banana_02` | 0.10 | 20 000 | 20 000 |
| `SM_PalmCoconut_01` | 0.10 | 20 000 | 20 000 |

#### GT_Tropical_Rock
Biome tropical — rochers. 6 variétés.

| Mesh | Densité | Cull start | Cull end |
|---|---|---|---|
| `SM_Rock_01` | 0.10 | 10 000 | 20 000 |
| `SM_Rock_cliff_01` | 0.10 | 10 000 | 20 000 |
| `SM_Rock_cliff_02` | 0.10 | 10 000 | 20 000 |
| `SM_Rock_Flat_01` | 0.10 | 10 000 | 20 000 |
| `SM_Rock_Sharp_01` | 0.10 | 10 000 | 20 000 |
| `SM_Rock_sharp_02` | 0.10 | 10 000 | 20 000 |

#### GT_Tropical_Grass
Biome tropical — végétation basse. **32 variétés** (le GrassType le plus riche du projet).

Inclut : troncs tombés (`SM_FallenTree`, `SM_DeadTrunk`, `SM_BranchDry_01`), herbes hautes (`SM_Grass_01` à `SM_GrassTall_01`), buissons (`SM_BushA_01` à `SM_BushA_04`), trèfles (`SM_Clover_01–04`), fougères (`SM_Fern_01–04`), monsteras (`SM_Monstera_01–02`), plantes tropicales (`SM_Plant01–02`, `SM_Rafflesia`, `SM_RedGinger_01–03`, `SM_SaplinSmall_01`, `SM_TaroPlant_01–02`), feuilles (`SM_LeafPlane`).

> Densités variées : herbes hautes = 10.0, grands éléments = 0.1, buissons = 1.0. Cull entre 1 000 et 4 000 unités (végétation très proche).

#### GT_Temperate_Tree
Biome **tempéré**. 6 variétés de bouleaux (été, sec, automne).

| Mesh | Densité | Cull end |
|---|---|---|
| `SM_birch_a_summer` | 0.50 | 100 000 |
| `SM_birch_b_summer` | 0.50 | 100 000 |
| `SM_birch_b_dry` | 0.50 | 100 000 |
| `SM_birch_b_fall` | 0.50 | 100 000 |
| `SM_birch_c_dry` | 0.50 | 100 000 |
| `SM_birch_c_fall` | 0.50 | 100 000 |

#### GT_Taiga_Tree
Biome **taïga**. 6 variétés de pins.

| Mesh | Densité | Cull start | Cull end |
|---|---|---|---|
| `SM_pine_a` | 1.0 | 10 000 | 10 000 |
| `SM_pine_b` | 1.0 | 10 000 | 10 000 |
| `SM_pine_c` | 1.0 | 10 000 | 10 000 |
| `SM_pine_d` | 1.0 | 10 000 | 10 000 |
| `SM_pine_e` | 1.0 | 10 000 | 10 000 |
| `SM_pine_f` | 1.0 | 10 000 | 10 000 |

#### GT_Savana_Rock
Biome **savane** — rochers. 1 variété.

| Mesh | Densité | Cull end |
|---|---|---|
| `S_Mud_Rock_xd0mcf2_lod3_Var1` | 0.10 | 100 000 |

#### GT_Savana_Grass
Biome **savane** — herbes. 5 variétés de Leafy Nineawn.

| Mesh | Densité | Cull start | Cull end |
|---|---|---|---|
| `S_Leafy_Nineawn_tlijciuia_Var1_lod1` | 100.0 | 10 000 | 30 000 |
| `S_Leafy_Nineawn_tlijciuia_Var4_lod1` | 100.0 | 10 000 | 30 000 |
| `S_Leafy_Nineawn_tlijciuia_Var5_lod1` | 100.0 | 10 000 | 30 000 |
| `S_Leafy_Nineawn_tlijciuia_Var6_lod1` | 100.0 | 10 000 | 30 000 |
| `S_Leafy_Nineawn_tlijciuia_Var7_lod1` | 100.0 | 10 000 | 30 000 |

#### GT_Desert_Tree
Biome **désert**. 5 variétés de Joshua Tree.

| Mesh | Densité | Cull start | Cull end |
|---|---|---|---|
| `SM_Joshua_Tree_01a` | 0.05 | 10 000 | 100 000 |
| `SM_Joshua_Tree_02a` | 0.05 | 10 000 | 100 000 |
| `SM_Joshua_Tree_03a` | 0.05 | 10 000 | 100 000 |
| `SM_Joshua_Tree_04a` | 0.05 | 10 000 | 100 000 |
| `SM_Joshua_Tree_05a` | 0.05 | 10 000 | 100 000 |

---

### 2.2 LandscapeGrassTypes Génériques (`/Game/Environment/Landscape/GrassTypes/`)

Ces GrassTypes utilisent des meshes non assignés directement dans l'asset (mesh = None — référencés via composant Landscape ou Material Layer). Les densités et cull distances sont la donnée principale.

| Nom | Nb variétés | Densités (default) | Cull end (min–max) | Biome |
|---|---|---|---|---|
| `LG_Grass` | 9 | 0.5 à 200 | 200 à 3 300 | Prairies tempérées |
| `LG_GrassDry` | 2 | 140 à 300 | 700 à 3 300 | Prairies sèches |
| `LG_ShortGrass` | 4 | 45 à 1 000 | 2 500 à 5 000 | Herbe courte |
| `LG_Forest` | 8 | 6 à 40 | 3 à 3 500 | Sous-bois forêt |
| `LG_Mud` | 2 | 50 | 1 000 | Boue/marécage |
| `LG_Beach` | 2 | 10 à 80 | 1 000 à 2 000 | Plage sablonneuse |
| `LG_Desert` | 3 | 15 à 300 | 1 000 à 2 000 | Désert |
| `LG_DesertRocks` | 7 | 4 à 400 | 1 500 à 6 500 | Rochers désert |
| `LG_Rocks` | 8 | 4 à 400 | 1 500 à 6 500 | Rochers génériques |
| `LG_FlatRocks` | 4 | 40 à 150 | 50 à 5 000 | Dalles plates |
| `LG_Craters` | 1 | 70 | 1 500 | Cratères |
| `LG_Snow` | 2 | 5 à 50 | 500 | Neige |
| `LG_SnowRocks` | 8 | 4 à 400 | 500 à 6 500 | Rochers enneigés |

---

### 2.3 LandscapeGrassTypes Water HW (`/Game/Environment/Water/Environments/Landscape/LandscapeGrassType/`)

#### LGT_LandscapeGrassType
5 variétés liées à la végétation côtière Water HW.

| Mesh | Densité | Cull end |
|---|---|---|
| `SM_GrassEuropeanBeachLawnClump` | 500.0 | 10 000 |
| `SM_GrassEuropeanBeachOrnamentalClump` | 25.0 | 10 000 |
| `SM_GrassEuropeanBeachWeedySpread` | 10.0 | 10 000 |
| `SM_PalmSagoDesktopForest` | 0.50 | 10 000 |
| `SM_GingerRedDesktopField` | 0.50 | 10 000 |

#### LGT_LandscapeDirtType
1 variété (mesh non assigné). Densité = 100, cull end = 10 000. Couche de sol nu.

---

### 2.4 Medieval Castle (`/Game/ThirdParty/Medieval_Castle_Vol1/Materials/Landscape/`)

Deux GrassTypes identiques (différentes couches de matériau) : `M_Grass_01_GrassType` et `M_Grass_02_GrassType`.

| Mesh | Densité | Cull end |
|---|---|---|
| `SM_Grass_01` | 40.0 | 10 000 |
| `SM_Bush_01` | 1.0 | 8 000 |

---

### 2.5 Procedural Ecosystem Meadow (`/Game/ThirdParty/Procedural_Ecosystem/Meshes/Ecosystem/Meadow/`)

#### summer_grass_a
5 variétés de végétation estivale de prairies.

| Mesh | Densité | Cull start | Cull end |
|---|---|---|---|
| `SM_grass_dist_summer` | 50.0 | 6 000 | 10 000 |
| `SM_grass_summer` | 110.0 | 2 000 | 4 000 |
| `SM_papaver_summer` | 25.0 | 2 000 | 3 000 |
| `SM_summer_plant_a` | 25.0 | 2 000 | 3 000 |
| `SM_dandelion_summer` | 25.0 | 10 000 | 10 000 |

---

## 3. Analyse & Observations

### 3.1 Répartition par Biome

| Biome | FoliageTypes ISM | LandscapeGrassTypes |
|---|---|---|
| Tropical / Côtier | 23 (Ocean) + 1 (GrassDry) | GT_Tropical_Tree/Rock/Grass, LGT_Landscape* |
| Tempéré / Forêt | 12 (Trees_Summer) + 9 (Veg) + 3 (Buissons) | LG_Grass, LG_Forest, GT_Temperate, M_Grass_* |
| Désert / Savane | — | GT_Desert_Tree, GT_Savana_Rock/Grass, LG_Desert, LG_DesertRocks |
| Taïga / Conifère | 9 (Cedar Dry+Snow) | GT_Taiga_Tree |
| Hiver / Neige | 9 (Trees_Winter) + 4 (Snow Cliffs) | LG_Snow, LG_SnowRocks |
| Prairies / Falaises | 4 (Forest Rocks) + 8 (Grasslands) | LG_Rocks, LG_FlatRocks, LG_ShortGrass |
| Prairie Estivale | — | summer_grass_a |
| Plage / Marécage | — | LG_Beach, LG_Mud |

### 3.2 Patterns de Densité

- **Très haute densité (> 500)** : `FT_JuniperBush_Small` (1 000), `LG_ShortGrass` (1 000), `GrassEuropeanBeachLawnClump_FT` (200), herbes courtes LandscapeGrassType. Ces assets peuplent des surfaces continues visibles au sol.
- **Densité haute (100–500)** : Palmiers Ocean, bouleaux `_Summer` (100), gazon `summer_grass_a` (110), herbes beach (100–200).
- **Densité faible (< 1)** : `FT_Cedar_Large` (0.25), Joshua Trees (0.05), `GT_Desert_Tree` — arbres grands et rares.
- **Densité unitaire (1.0)** : Standard PCG procédural pour les arbres Maple/Birch/Cedar dans World/Procedural.

### 3.3 Configuration LOD Culling

| Contexte | Cull max typique | Interprétation |
|---|---|---|
| Végétation proche / herbe | 500 – 5 000 | Culling agressif, haute densité |
| Rochers moyens | 5 000 – 30 000 | Visible à distance intermédiaire |
| Arbres moyens | 20 000 – 100 000 | Forêts visibles à l'horizon |
| Palmiers héros | 100 000 | Toujours visibles (landmarks) |
| Procédural World (cull=0) | 0 (désactivé) | Aucun culling — géré par le PCG Spawner |

> **Important :** Les FoliageTypes dans `/World/Procedural/` ont souvent `cull_distance = (0,0)`, ce qui signifie que le culling est délégué au système PCG (ProceduralFoliageSpawner ou PCG Graph) et non géré au niveau de l'asset FoliageType.

### 3.4 Saisonnalité — Structure des Triplettes

Les arbres du monde procédural suivent un pattern **Small / Medium / Large × Summer / Dry / Snow** :

```
FT_{Espece}_{Taille}           → Summer (vert)
FT_{Espece}_{Taille}_Dry       → Automne/Sec
FT_{Espece}_{Taille}_Snow      → Hiver
```

Espèces couvertes : **Maple** (érable), **Birch** (bouleau), **Cedar** (cèdre), **GenericBush** (été/hiver), **JuniperBush** (été/sec).

### 3.5 Meshes les Plus Utilisés

| Mesh | Utilisé dans |
|---|---|
| `SM_QueenPalmHeroForest` | FT Ocean + LGT Ocean |
| `SM_GrassEuropeanBeachLawnClump` | FT Ocean + LGT Ocean |
| `SM_Grass_01` | M_Grass_01/02_GrassType |
| `SM_pine_a–f` | GT_Taiga_Tree |
| `SM_birch_*` | GT_Temperate_Tree |
| `SM_Joshua_Tree_0*a` | GT_Desert_Tree |

---

## 4. Chemins de Référence Complets

### FoliageType_InstancedStaticMesh
```
/Game/Environment/Landscape/ProceduralMeshes/Foliage/GrassDry/FoliageTypes/
/Game/Environment/Water/Environments/FoliageType/
/Game/World/Procedural/Foliage/Bushes_Summer/FoliageTypes/
/Game/World/Procedural/Foliage/Trees_Dry/FoliageTypes/
/Game/World/Procedural/Foliage/Trees_Summer/FoliageTypes/
/Game/World/Procedural/Foliage/Trees_Winter/FoliageTypes/
/Game/World/Procedural/Forest/FoliageTypes/Summer/
/Game/World/Procedural/Forest/FoliageTypes/Winter/
/Game/World/Procedural/Grasslands/Cliffs/FoliageTypes/
/Game/World/Procedural/Grasslands/Cliffs_Small/FoliageTypes/
/Game/World/Procedural/Snow/Cliffs/FoliageTypes/
/Game/World/Vegetation/Bushes/GenericBush/FoliageTypes/
/Game/World/Vegetation/Trees/Birch/FoliageTypes/
/Game/World/Vegetation/Trees/Cedar/FoliageTypes/
/Game/World/Vegetation/Trees/Maple/FoliageTypes/
/Game/_Archive/Misc/_GENERATED/nicol/  [ARCHIVE]
```

### LandscapeGrassType
```
/Game/Assets/Materials/Landscape/GrassType/
/Game/ThirdParty/Medieval_Castle_Vol1/Materials/Landscape/
/Game/ThirdParty/Procedural_Ecosystem/Meshes/Ecosystem/Meadow/
/Game/Environment/Landscape/GrassTypes/
/Game/Environment/Water/Environments/Landscape/LandscapeGrassType/
```

---

*Documentation générée par agent MCP Python — Asset Registry + get_editor_property() — 96 assets analysés.*
