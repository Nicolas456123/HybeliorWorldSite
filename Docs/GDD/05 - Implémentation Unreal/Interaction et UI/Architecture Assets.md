---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# ArchitectureAssets

Third-party medieval architecture packs used alongside the HW interactable framework. These meshes feed the visual side of [[Doors]], [[Portals]] and [[Containers]].

## EnterableMedievalHouses — `Content/ThirdParty/EnterableMedievalHouses/`

Enterable medieval houses with interior access.

```
EnterableMedievalHouses/
├── BP_House.uasset                  ← enterable house BP
├── Materials/                       ← dedicated materials
├── Meshes/
│   ├── Doors/
│   │   └── SM_door_001.uasset
│   └── Houses/
│       ├── SM_house_001.uasset
│       └── SM_house_008.uasset
└── Textures/
```

- **`BP_House`**: likely embeds a `BP_Door` or `BP_BoxPortal` for interior/exterior transition. Primary candidate for village-level [[Doors]] integration.
- **`SM_door_001`**: door mesh compatible with `BP_Door`.
- Only two house variants (001, 008) — partial pack.

## MedievalCastleModularPack — `Content/ThirdParty/MedievalCastleModularPack/`

Complete modular castle kit. Designed for procedural or manual assembly.

### Demo scenes
`Scene/ExampleScene.umap`, `ExampleScene1.umap`, `MedievallCastle.umap`.

### Mesh catalogue (`Assets/Models/`)

| Category | Assets | Notes |
|----------|--------|-------|
| Battlements | `SM_Battlement_01`–`_09`, `SM_BattlementTowerWall_01` | 10 crenellation variants |
| Walls | `SM_CastleWall_01`–`_13`, `SM_CastleWallCorner`–`Corner5` | 13 walls + 5 corners |
| Tower modules | `SM_TowerModule_01`–`_20` (no 19) | 19 stackable modules |
| Castle doors | `SM_CastleDoor_Door`, `SM_CastleDoor_DoorFrame` | Door + frame separate |
| Gates / portcullis | `SM_CastleGate_A`, `_B`, `_Frame`, `SM_iron_castle_gate` | 3 gates + iron portcullis |
| Wood stairs / ladder | `SM_WoodStair`, `SM_Ladder` | |
| Stone stairs | `SM_Stair_01`–`_06`, `SM_TowerModule_Stair` | 7 variants |
| Floor | `SM_CastleFloor_01`–`_08`, `SM_RocksFloor` | 9 variants |
| Stone floor | `SM_StonesFloor`–`StonesFloor4` | 5 variants |
| Bricks | `SM_StoneBricks_01`–`_07` | 7 tiles |
| Mechanisms | `SM_ChainMechanism` | Chains for portcullis / drawbridge |
| Balcony | `SM_Balcony` | |
| Wall details | `SM_WallDetail_01`–`_12` | 12 ornaments |
| Tower detail | `SM_TowerDetail` | |
| Props | `SM_Barrel`, `SM_Bench`, `SM_Box`, `SM_Bucket`, `SM_Table`, `SM_Trough`, `SM_Waterwell` | 7 props |
| Lighting | `SM_Torch`, `SM_TorchBase_TorchBase` | |
| Fences | `SM_Fence_04`–`_07`, `SM_WoodFence`–`_03` | 7 fences |
| Straw | `SM_Straw_01`, `_02` | |
| Vegetation | `SM_Grass`, `SM_WallLeaves`, `_01`, `_02`, `SM_MountainRock`, `SM_MountainRock2` | |
| Rocks | `SM_Rocks1`–`SM_Rocks30` | 30 variants |

### Materials (42 families)
Barrel, Bricks, Bucket, CastleGate, Cement, ChainMechanism, Door, Flag, Grass, IronCastleGate, LandscapeMaterial, Metal, MountainRock/2, Rocks, RocksFloor, RockWall/2, RoofTiles, Rope, StoneBricks (1–5), StoneFloor/1/2, Straw, Torch, TorchBase, Trough, WallLeaves, WaterWellRope, WaterwellWood, Wood, Wood2, WoodCut, WoodTiles.

## Medieval_Castle_Vol1 — `Content/ThirdParty/Medieval_Castle_Vol1/`

Higher-granularity castle kit using `SM_CF_01_*` nomenclature, aimed at piece-by-piece construction.

### Demo scenes
`Maps/Demo_Scene.umap`, `Maps/Overview.umap`, `Maps/Overview_StaticLight.umap`.

### Included Blueprint

| Asset | Role |
|-------|------|
| `Blueprints/BP_Chains_01` | Chain animation (drawbridge / portcullis) |

### Mesh catalogue

#### Gates & access
| Asset | Description |
|-------|-------------|
| `SM_CF_01_Gate_01` | Monolithic gate |
| `SM_CF_01_Gate_02_Left_01` / `_Right_01` | Double-gate halves |
| `SM_CF_01_Gate_Drawbridge_01` | Drawbridge deck |
| `SM_CF_01_Gate_Drawbridge_Chains_01` | Drawbridge chains |
| `SM_CF_01_Gate_Drawbridge_Fixations_01` | Drawbridge fixtures |

#### Roofing (Shingle Roof — 14+ variants)
`SM_CF_01_Shingle_Roof_*` — `01`, `1m`, `2m`, `Angle`, `Corner`, `End_*`, `Half`, `Intersection`, `Round`, `Round_End`, `Top_*`.

#### Battlement walls (30+ variants)
`SM_CF_01_Stone_Wall_Battlements_01_*` — Straight, 1m, 2m, Half, Corner (1/2/3), Diagonal L/R (1–4), Oblique L/R (1–3), Round, Slit (arrowslit). Thick merged segments `SM_Stone_Wall_Thick_12m_01`–`_08`.

#### Floor
`SM_CF_01_Stone_Floor_*` (standard + Half, Diagonal, Oblique, Round, Round_Half/Quarter), `SM_CF_01_Stone_Floor_Tile_01`–`_06`, `SM_CF_01_FlagStone_01`.

#### Machicolations
`SM_CF_01_Stone_Machicolation_*` — standard, 1m/2m, Corner, Half, Diagonal L/R, Oblique L/R, Round, Slope L/R, Triangle.

#### Stairs
| Asset | Description |
|-------|-------------|
| `SM_CF_01_Stone_Stairs_01` | Straight |
| `SM_CF_01_Stone_Stairs_Round_01` | Spiral |
| `SM_CF_01_Stone_Stairs_Thick_01/02` | Thick |
| `SM_CF_01_Stone_Stairs_Thin_01/02` + Half | Thin (+ half) |

#### Borders & finishing
`SM_CF_01_Stone_Border_01`–`_04`.

#### Pre-assembled
`SM_Wood_Chemin_01` — wooden walkway.

#### Vegetation
Spruce trees, bushes, ferns, grass.

### Materials
FlagStone, Gate_02 Left/Right, Plaster, Stone Floor/Wall (+DUPLI variant), Wood, Wood Shingle. Master materials `M_CF_01_Master_01`, `M_CF_01_Master_Vertex_Painting_01`; landscape materials `M_CF_01_Landscape_*`.

## Integration matrix

| Use case | Blueprint | Mesh |
|----------|-----------|------|
| Village door | `BP_Door` | `SM_door_001` (EnterableMedievalHouses) |
| Castle door | `BP_Door` | `SM_CastleDoor_Door` + `SM_CastleDoor_DoorFrame` (Modular) |
| Castle gate / portcullis | `BP_BoxPortal` | `SM_CastleGate_A/B` + `SM_ChainMechanism` (Modular) |
| Drawbridge | `BP_BoxPortal` + `BP_Chains_01` | `SM_CF_01_Gate_Drawbridge_*` (Vol1) |
| Loot chest | `BP_Container` | `SM_Box` props (Modular) |
| Barrels / crates | `BP_Container` | `SM_Barrel` / `SM_Box` (Modular) |
| Enterable house | `BP_House` | `SM_house_001` / `SM_house_008` |
| Supply pod | `BP_SupplyPod01` | Specific asset TBD |

## Voir aussi
- [[Doors]] — ces packs (SM_door_001, SM_CastleDoor_Door/Frame) fournissent les meshes statiques montés sur `BP_Door` (parent `AHWDoor`) ; voir la matrice d'intégration "Village door" / "Castle door" ci-dessus.
- [[Portals]] — `SM_CastleGate_A/B`, `SM_ChainMechanism` et `SM_CF_01_Gate_Drawbridge_*` sont les meshes consommés par `BP_BoxPortal` (parent `AHWPortal`) pour la variante "Castle gate / portcullis" / "Drawbridge".
- [[Containers]] — `SM_Box` et `SM_Barrel` du MedievalCastleModularPack sont référencés par `BP_Container` (parent `AHWContainer`) pour les variantes "Loot chest" / "Barrels / crates".
