---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation : AnimBlueprints et BlendSpaces — HybeliorWorld

**Généré via MCP (unreal_python) — UE5.4**
**Date :** 2026-04-04
**Scope :** `/Game/Assets` (récursif)

## Classes C++ associées
- [[Anim Instance]] — runtime exécutant les AnimBP (`AB_HWMannequin`, `ABP_Manny`, etc.)
- [[Anim Blend Spaces]] — nœuds BS_* consommés par les State Machines des AnimBP

---

## Sommaire

- [Vue d'ensemble](#vue-densemble)
- [AnimBlueprints (13)](#animblueprints)
  - [AB_HWMannequin — Mannequin principal HW](#ab_hwmannequin--mannequin-principal-hw)
  - [ABP_fe / ABP_ma / ABP_child — Character Editor](#abp_fe--abp_ma--abp_child--character-editor)
  - [ABP_Manny / ABP_Manny1 — Mannequin UE5](#abp_manny--abp_manny1--mannequin-ue5)
  - [ABP_Quinn — Mannequin UE5 féminin](#abp_quinn--mannequin-ue5-féminin)
  - [ABP_Manny_PostProcess / ABP_Quinn_PostProcess](#abp_manny_postprocess--abp_quinn_postprocess)
  - [ABP_Minion / ABP_Minion1 — Minion Dusk Melee](#abp_minion--abp_minion1--minion-dusk-melee)
  - [ABP_Player — SuperheroFlight](#abp_player--superhero-flight)
- [BlendSpaces (50)](#blendspaces)
  - [Mobilité au sol — Mannequin UE4](#mobilité-au-sol--mannequin-ue4)
  - [Sauts — Mannequin UE4](#sauts--mannequin-ue4)
  - [Natation — Mannequin UE4](#natation--mannequin-ue4)
  - [Character Editor](#character-editor)
  - [Mannequins UE5 (Manny / Quinn)](#mannequins-ue5-manny--quinn)
  - [Minion Dusk Melee](#minion-dusk-melee)
  - [Vol — SuperheroFlight (Fast Move)](#vol--superhero-flight-fast-move)
  - [Vol — SuperheroFlight (Hover Move)](#vol--superhero-flight-hover-move)
  - [Vol — ma_polyphoria](#vol--ma_polyphoria)

---

## Vue d'ensemble

| Catégorie | Nombre |
|---|---|
| AnimBlueprints | 13 |
| BlendSpaces 2D | 25 |
| BlendSpaces 1D | 25 |
| **Total BlendSpaces** | **50** |

Les AnimBPs couvrent trois familles de personnages :
- **Mannequin UE4 HW** (`AB_HWMannequin`) : personnage joueur principal avec locomotion complète sol/air/eau/vol
- **Mannequins UE5** (`ABP_Manny`, `ABP_Quinn`) : assets Epic standard intégrés au projet
- **Character Editor** (`ABP_fe/ma/child_CharacterEditor`) : prévisualisation dans l'éditeur de personnage
- **Minion** (`ABP_Minion`) : ennemi de base
- **ABP_Player** (`SuperheroFlight`) : système de vol superpuissance complet

---

## AnimBlueprints

### AB_HWMannequin — Mannequin principal HW

| Propriété | Valeur |
|---|---|
| **Chemin** | `/Game/Assets/Characters/Mannequin_UE4/Animations/AB_HWMannequin` |
| **Variante polyphoria** | `/Game/Assets/Characters/ma_polyphoria/AB_HWMannequin` |
| **Squelette cible** | `HWSK_Mannequin_Skeleton` |
| **Nombre de graphes** | 23 |
| **Type** | AnimBlueprint |

#### State Machine principale — Locomotion complète

```
AnimGraph
└── State Machine (locomotion)
    ├── NoMovement          ← état repos / sans déplacement
    │   ├── Idle            ← idle debout
    │   └── Transition → Move
    ├── Move                ← déplacement au sol
    │   ├── AnimationTransitionGraph_0/1
    │   └── Transition → Falling / Jump / Crouch
    ├── Falling             ← chute libre
    │   └── AnimationTransitionGraph_1
    ├── Jump                ← saut actif
    │   └── AnimationTransitionGraph_0/1
    ├── Land                ← atterrissage
    ├── FinishLand          ← fin de l'atterrissage
    ├── Crouch              ← accroupi
    │   └── AnimationTransitionGraph_0
    ├── Fly                 ← mode vol (standard)
    │   └── AnimationTransitionGraph_0
    └── Swim                ← mode nage
        └── AnimationTransitionGraph_0
```

**États principaux :** `NoMovement`, `Falling`, `Land`, `Idle`, `Move`, `Jump`, `FinishLand`, `Transition (×4)`, `Crouch`, `Fly`, `Swim`

**Transitions identifiées (via graphes de transition) :**
- `NoMovement ↔ Move` : via `AnimationTransitionGraph_1` (x2)
- `Move → Falling` : condition de chute détectée
- `Move → Jump` : input saut
- `Falling → Land` : détection sol
- `Land → FinishLand` : fin d'anim d'atterrissage
- `Move ↔ Crouch` : toggle accroupi
- `Move ↔ Fly` : activation mode vol
- `Move ↔ Swim` : entrée dans l'eau

> Note : Les deux variantes `AB_HWMannequin` (Mannequin_UE4 et ma_polyphoria) partagent la même structure de 23 graphes.

---

### ABP_fe / ABP_ma / ABP_child — Character Editor

| Propriété | Valeur |
|---|---|
| **Chemin (féminin)** | `/Game/Assets/CharacterEditorModify/Base/Animations/ABP_fe_CharacterEditor` |
| **Chemin (masculin)** | `/Game/Assets/CharacterEditorModify/Base/Animations/ABP_ma_CharacterEditor` |
| **Chemin (enfant)** | `/Game/Assets/CharacterEditorModify/Base/Animations/Child/ABP_child_CharacterEditor` |
| **Nombre de graphes** | 9 (chaque) |
| **Type** | AnimBlueprint |

#### State Machine — Prévisualisation éditeur

```
AnimGraph
└── State Machine (preview)
    ├── Idle/Run            ← pose combinée idle + run (via BS 1D)
    ├── JumpStart           ← début saut
    ├── JumpLoop            ← boucle en l'air
    ├── JumpEnd             ← atterrissage
    └── Transitions (×4)
        ├── Idle/Run → JumpStart
        ├── JumpStart → JumpLoop
        ├── JumpLoop → JumpEnd
        └── JumpEnd → Idle/Run
```

**Usage :** AnimBPs dédiés à la prévisualisation temps réel dans l'éditeur de personnage. Structure simplifiée 4 états. Chaque variante (fe/ma/child) utilise son propre BlendSpace 1D (`BS_fe/ma/child_ThirdPerson_IdleRun`).

---

### ABP_Manny / ABP_Manny1 — Mannequin UE5

| Propriété | Valeur |
|---|---|
| **Chemin ABP_Manny** | `/Game/Assets/Characters/Mannequins/Animations/ABP_Manny` |
| **Chemin ABP_Manny1** | `/Game/Assets/Characters/Mannequins/Animations/ABP_Manny1` |
| **Nombre de graphes** | 15 (chaque) |
| **Type** | AnimBlueprint |

#### State Machine — Locomotion UE5

```
AnimGraph
└── State Machine "Locomotion"
    ├── Idle                ← pose idle
    ├── Walk / Run          ← marche et course (BS 1D BS_MM_WalkRun)
    ├── Jump                ← saut
    ├── Fall Loop           ← chute en boucle
    ├── Land                ← atterrissage
    └── Transitions (×5)
        ├── Idle → Walk/Run
        ├── Walk/Run → Jump
        ├── Jump → Fall Loop
        ├── Fall Loop → Land
        └── Land → Idle
```

> `ABP_Manny` et `ABP_Manny1` partagent la même structure de 15 graphes. `ABP_Manny1` est probablement une variante de test/itération.

---

### ABP_Quinn — Mannequin UE5 féminin

| Propriété | Valeur |
|---|---|
| **Chemin** | `/Game/Assets/Characters/Mannequins/Animations/ABP_Quinn` |
| **Nombre de graphes** | 0 |
| **Type** | AnimBlueprint (Child BP) |

> `ABP_Quinn` est un **AnimBP enfant** (Child AnimBlueprint) qui hérite de `ABP_Manny`. Il ne définit pas ses propres graphes et délègue entièrement à son parent. L'animation spécifique Quinn passe par le BlendSpace `BS_MF_Unarmed_WalkRun`.

---

### ABP_Manny_PostProcess / ABP_Quinn_PostProcess

| Propriété | Valeur |
|---|---|
| **Chemin Manny** | `/Game/Assets/Characters/Mannequins/Rigs/ABP_Manny_PostProcess` |
| **Chemin Quinn** | `/Game/Assets/Characters/Mannequins/Rigs/ABP_Quinn_PostProcess` |
| **Nombre de graphes** | 1 (AnimGraph uniquement) |
| **Type** | AnimBlueprint (Post-Process) |

> Ces AnimBPs sont des **post-process** appliqués sur le mesh après le calcul principal. Ils contiennent uniquement un `AnimGraph` sans State Machine, typiquement utilisés pour des corrections de rig (IK, corrections de pose, retargeting).

---

### ABP_Minion / ABP_Minion1 — Minion Dusk Melee

| Propriété | Valeur |
|---|---|
| **Chemin ABP_Minion** | `/Game/Assets/Characters/MinionDuskMelee/Animations/ABP_Minion` |
| **Chemin ABP_Minion1** | `/Game/Assets/Characters/MinionDuskMelee/Animations/ABP_Minion1` |
| **Nombre de graphes** | 1 (AnimGraph uniquement) |
| **Type** | AnimBlueprint |

> Structure minimale — `AnimGraph` seul sans State Machine dédiée. La locomotion est probablement pilotée directement via un nœud BlendSpace (`BS_IdleWalkForward`) dans l'AnimGraph, sans gestion d'états complexe. `ABP_Minion1` est une variante itérative.

---

### ABP_Player — Superhero Flight

| Propriété | Valeur |
|---|---|
| **Chemin** | `/Game/ThirdParty/SuperheroFlight/Characters/Mannequin/Animations/ABP_Player` |
| **Nombre de graphes** | 31 |
| **Type** | AnimBlueprint |

#### State Machine — Système de vol complet

```
AnimGraph
├── State Machine "Ground"
│   ├── MovementConduit     ← conduit de transition entre modes
│   └── Transition → InAir
│
├── State Machine "InAir"
│   ├── JumpStart           ← début saut
│   ├── JumpLoop            ← boucle air
│   ├── Land                ← atterrissage
│   └── Transitions (×4)
│
└── State Machine "Flying"
    ├── Start               ← activation du vol
    ├── MoveLoop            ← boucle de vol actif
    ├── Idle / Hover        ← vol stationnaire (hover)
    ├── Land                ← atterrissage depuis le vol
    └── Transitions (×5)
        ├── Start → MoveLoop / Idle/Hover
        ├── MoveLoop → Idle/Hover
        ├── Idle/Hover → MoveLoop
        └── MoveLoop / Idle/Hover → Land
```

#### Sous-états additifs — Vol rapide (FastFlightBase + Additive)

| Sous-état | Rôle |
|---|---|
| `FastFlightBase` | Pose de base en vol rapide |
| `FastFlightLeanAdd` | Couche additive : inclinaison (lean) en vol rapide |
| `FastFlightMoveAdd` | Couche additive : direction de déplacement en vol rapide |
| `HoverFlightIdle` | Hover stationnaire |
| `HoverFlightMove` | Hover avec déplacement |
| `HoverFlightMoveAdd` | Couche additive : direction en hover |
| `HoverFlightUpDownAdd` | Couche additive : montée/descente en hover |
| `HoverFlightLeanAdd` | Couche additive : inclinaison en hover |

> Architecture layered : une State Machine principale (Ground/InAir/Flying) et des couches additives séparées pour le lean, le mouvement et la verticalité. Cela permet de combiner indépendamment chaque dimension du vol.

---

## BlendSpaces

### Mobilité au sol — Mannequin UE4

**Chemin de base :** `/Game/Assets/Characters/Mannequin_UE4/Animations/Mobility/`

#### BS_WalkRun

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Speed` (grille : 4) |
| **Axe Y** | *(non nommé)* |
| **Nombre de samples** | 2 |
| **Samples** | `MOB1_Walk_F_Loop_IPC` (Speed=0) → `MOB1_Run_F_Loop_IPC` (Speed=500) |
| **Usage** | Transition marche/course en ligne droite |

#### BS_WalkRunCombat

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Speed` (grille : 4) |
| **Nombre de samples** | 2 |
| **Samples** | `Walk_F_Seq` (Speed=0) → `Run_Seq` (Speed=500) |
| **Usage** | Locomotion en posture de combat |

#### BS_StrafeMove

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Rotation` (grille : 8, plage : -180° à +180°) |
| **Axe Y** | `Speed` (grille : 5, plage : 0 à 800) |
| **Nombre de samples** | 30 |
| **Samples clés** | `MOB1_Walk_F_Loop_IPC` (0°, 160), `MOB1_Run_F_Loop_IPC` (0°, 800), `MOB1_Jog_F_Loop_IPC` (0°, 480), `MOB1_Stand_Relaxed_Idle_WalkPose` (0°/−90°, 0) |
| **Usage** | Déplacement omnidirectionnel (strafe) combinant direction et vitesse |

#### BS_Unarmed

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Rotation` (grille : 8, plage : -180° à +180°) |
| **Axe Y** | `Speed` (grille : 5) |
| **Nombre de samples** | 16 |
| **Samples clés** | `KB_WalkPose` (0° à 180°, 0), `KB_Idle_1` (180°, 0) |
| **Usage** | Déplacement sans arme, posture combat à mains nues |

#### BS_CrouchMove

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Rotation` (grille : 8, plage : -180° à +180°) |
| **Axe Y** | `Speed` (grille : 2, max : 150) |
| **Nombre de samples** | 18 |
| **Samples clés** | `MOB1_CrouchWalk_F_Loop_IPC`, `MOB1_CrouchWalk_B_Loop_IPC`, `MOB1_CrouchWalk_BR/BL_BkPd_Loop_IPC` |
| **Usage** | Déplacement accroupi omnidirectionnel |

#### BS_CrouchMoveUnarmed

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Rotation` (grille : 8) |
| **Axe Y** | `Speed` (grille : 2, max : 150) |
| **Nombre de samples** | 16 |
| **Samples clés** | `KB_crouch_WalkFwd`, `KB_crouch_WalkBwd`, `KB_crouch_WalkLeft45/135` |
| **Usage** | Déplacement accroupi, posture combat sans arme |

#### BS_CrouchMoveBow

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Rotation` (grille : 8) |
| **Axe Y** | `Speed` (grille : 2, max : 150) |
| **Nombre de samples** | 18 |
| **Samples clés** | `Bow_InPlace_Crouch_Fwd`, `Bow_InPlace_Crouch_Bwd`, `Bow_InPlace_Crouch_Bwd_45_L/R` |
| **Usage** | Déplacement accroupi avec arc |

#### BS_BowStrafeMove

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Rotation` (grille : 8, plage : -180° à +180°) |
| **Axe Y** | `Speed` (grille : 5, max : 800) |
| **Nombre de samples** | 28 |
| **Samples clés** | `Run_Seq` (0°, 800), `Bow_PoseWalk` (0°/45°/90°/135°, 0) |
| **Usage** | Déplacement omnidirectionnel avec arc équipé |

#### BS_SwordShieldStrafeMove

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Rotation` (grille : 8, plage : -180° à +180°) |
| **Axe Y** | `Speed` (grille : 5, max : 800) |
| **Nombre de samples** | 22 |
| **Samples clés** | `Idle_WalkPose` (−180°/0°/+180°, 0), `Run_Seq` (0°, 800), `Jog_B_Seq` (−180°, 480) |
| **Usage** | Déplacement omnidirectionnel épée + bouclier |

---

### Sauts — Mannequin UE4

**Chemin de base :** `/Game/Assets/Characters/Mannequin_UE4/Animations/Mobility/`

#### BS_JumpStart

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Direction` (grille : 2, plage : -90° à +90°) |
| **Axe Y** | `Speed` (grille : 4, plage : 0 à 600) |
| **Nombre de samples** | 10 |
| **Samples clés** | `MOB1_Walk_F/L/R_Jump_RU_Start_IPC` (Speed=200), `MOB1_Jog_F/L/R_Jump_RU_Start_IPC` (Speed=400) |
| **Usage** | Amorce de saut selon direction et vitesse de départ |

#### BS_JumpAir

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Direction` (grille : 2, plage : -90° à +90°) |
| **Axe Y** | `Speed` (grille : 4) |
| **Nombre de samples** | 10 |
| **Samples clés** | `MOB1_Walk_F/L/R_Jump_RU_Air_IPC` (Speed=200), `MOB1_Jog_F/L/R_Jump_RU_Air_IPC` (Speed=400) |
| **Usage** | Boucle de vol en l'air selon direction et vitesse |

#### BS_JumpLand

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Direction` (grille : 2, plage : -90° à +90°) |
| **Axe Y** | `Speed` (grille : 4, max : 600) |
| **Nombre de samples** | 10 |
| **Samples clés** | `MOB1_Run_F_Jump_RU_Land_IPC` (Speed=600), `MOB1_Walk_F/L/R_Jump_RU_Land_IPC` (Speed=200), pose statique (Speed=0) |
| **Usage** | Atterrissage selon direction et vitesse d'impact |

---

### Natation — Mannequin UE4

**Chemin de base :** `/Game/Assets/Characters/Mannequin_UE4/Animations/SwimmingAnimations/BlendSpace/`

#### BS_Swim_BlendSpace

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Direction` (grille : 12, plage : -180° à +180°) |
| **Axe Y** | `Speed` (grille : 4, plage : 0 à 400) |
| **Nombre de samples** | 15 |
| **Samples clés** | `Anim_Swim_BackFast` (−180°, 400), `Anim_Swim_Backwards` (±180°, 200), `Anim_Swim` (0°, 200), `Anim_SwimFast` (0°, 400) |
| **Usage** | Nage 2D — direction et vitesse. Grille direction dense (12 divisions) pour fluidité |

#### BS_1D_VerticleSwim

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 1D |
| **Axe** | `Angle` (grille : 7, plage : ~0° à 257°) |
| **Nombre de samples** | 4 |
| **Samples clés** | `Anim_swim_Idle` (0°), `Anim_Swim_Up_02` (51°), `Anim_Swim_120_02` (154°), `Anim_Swim_240_02` (257°) |
| **Usage** | Nage verticale — angle de plongée/remontée |

#### BS_Flight_HoverMove_A (Mannequin UE4)

| Propriété | Valeur |
|---|---|
| **Chemin** | `/Game/Assets/Characters/Mannequin_UE4/Animations/BS_Flight_HoverMove_A` |
| **Type** | BlendSpace 2D |
| **Axe X** | `Rotation` (grille : 4, plage : 0° à 175°) |
| **Axe Y** | `Speed` (grille : 5, max : 160) |
| **Nombre de samples** | 10 |
| **Samples clés** | `A_Flight_HoverMove_A_Add` (repos), `A_Flight_HoverMove_A_F/B/R_Add` |
| **Usage** | Vol en hover (mode lévitation), combinant rotation et vitesse pour le mannequin UE4 |

---

### Character Editor

**Chemin de base :** `/Game/Assets/CharacterEditorModify/Base/Animations/`

#### BS_fe_ThirdPerson_IdleRun

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 1D |
| **Axe** | `Speed` (grille : 4, plage : 0 à 375) |
| **Nombre de samples** | 3 |
| **Samples** | `A_Idle_4` (0) → `A_fe_ThirdPersonWalk` (93.75) → `A_fe_ThirdPersonRun` (375) |
| **Usage** | Prévisualisation féminine — idle → marche → course |

#### BS_ma_ThirdPerson_IdleRun

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 1D |
| **Axe** | `Speed` (grille : 4, plage : 0 à 375) |
| **Nombre de samples** | 2 |
| **Samples** | `A_Idle_2` (0) → `A_ma_ThirdPersonRun` (375) |
| **Usage** | Prévisualisation masculine — idle → course (sans interpolation marche) |

#### BS_child_ThirdPerson_IdleRun

| Propriété | Valeur |
|---|---|
| **Chemin** | `/Game/Assets/CharacterEditorModify/Base/Animations/Child/BS_child_ThirdPerson_IdleRun` |
| **Type** | BlendSpace 1D |
| **Axe** | `Speed` (grille : 4, plage : 0 à 375) |
| **Nombre de samples** | 3 |
| **Samples** | `A_child_idle` (0) → `A_child_ThirdPersonWalk` (93.75) → `A_child_ThirdPersonRun` (375) |
| **Usage** | Prévisualisation enfant — idle → marche → course |

---

### Mannequins UE5 (Manny / Quinn)

**Chemin de base :** `/Game/Assets/Characters/Mannequins/Animations/`

#### BS_MM_WalkRun (Manny)

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 1D |
| **Axe** | `Speed` (grille : 4, plage : 0 à 500) |
| **Nombre de samples** | 3 |
| **Samples** | `MM_Walk_InPlace` (0) → `MM_Walk_Fwd` (230) → `MM_Run_Fwd` (500) |
| **Usage** | Locomotion linéaire masculine UE5 |

#### BS_MM_WalkRunGiant (Manny — variante géant)

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 1D |
| **Axe** | `Speed` (grille : 5, plage : 0 à 5000) |
| **Nombre de samples** | 6 |
| **Samples** | `MM_Walk_InPlace` (0) → `MM_Walk_Fwd` (200) → `MM_Walk_Fwd` (1000) → `MM_Walk_Fwd` (2000) → `MM_Run_Fwd` (5000) |
| **Usage** | Locomotion pour personnage de très grande taille — plage de vitesse étendue ×10 |

#### BS_MF_Unarmed_WalkRun (Quinn)

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 1D |
| **Axe** | `Speed` (grille : 4, plage : 0 à 500) |
| **Nombre de samples** | 3 |
| **Samples** | `MM_Walk_InPlace` (0) → `MF_Walk_Fwd` (230) → `MF_Run_Fwd` (500) |
| **Usage** | Locomotion féminine UE5 sans arme |

---

### Minion Dusk Melee

**Chemin :** `/Game/Assets/Characters/MinionDuskMelee/Animations/`

#### BS_IdleWalkForward

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Speed` (grille : 4, plage : 0 à 500) |
| **Axe Y** | *(non utilisé, grille : 1)* |
| **Nombre de samples** | 3 |
| **Samples** | `NonCombat_Idle` (0) → `MM_Walk_Fwd1` (125) → `MM_Walk_Fwd1` (500) |
| **Usage** | Locomotion simple avant pour minion ennemi |

---

### Vol — SuperheroFlight (Fast Move)

**Chemin de base :** `/Game/ThirdParty/SuperheroFlight/Characters/Mannequin/Animations/Flight/`

#### BS_ThirdPerson_IdleRun_2D

| Propriété | Valeur |
|---|---|
| **Chemin** | `/Game/ThirdParty/SuperheroFlight/Characters/Mannequin/Animations/BS_ThirdPerson_IdleRun_2D` |
| **Type** | BlendSpace 1D |
| **Axe** | `Speed` (grille : 6, plage : 0 à 1000) |
| **Nombre de samples** | 4 |
| **Samples** | `ThirdPersonWalk` (0 et 166) → `ThirdPersonRun` (500 et 1000) |
| **Usage** | Locomotion terrestre du personnage volant (sol) |

#### BS_Flight_FastMove_A à E — Vol rapide vertical

| BlendSpace | Axe | Samples | Usage |
|---|---|---|---|
| `BS_Flight_FastMove_A` | `Speed_Z` (grille:4, −1 à +1) | 3 : `A_FM_A_Pose` (0), `_D` (−1), `_U` (+1) | Pose de base vol rapide A, vertical |
| `BS_Flight_FastMove_B` | `Speed_Z` (grille:4, −1 à +1) | 3 : `A_FM_B_Pose` (0), `_D` (−1), `_U` (+1) | Pose de base vol rapide B, vertical |
| `BS_Flight_FastMove_C` | `Speed_Z` (−1 à +1) | 3 (même structure) | Variante C |
| `BS_Flight_FastMove_D` | `Speed_Z` (−1 à +1) | 3 (même structure) | Variante D |
| `BS_Flight_FastMove_E` | `Speed_Z` (−1 à +1) | 3 (même structure) | Variante E |

> Les 5 variantes A–E correspondent à 5 styles de vol rapide sélectionnables. Chacun blend verticalement entre pose neutre, montée (`_U`) et descente (`_D`).

#### BS_Flight_FastMove_Lean_A à E — Inclinaison vol rapide

| BlendSpace | Axes | Samples | Usage |
|---|---|---|---|
| `BS_Flight_FastMove_Lean_A` | `LeanX` (−1 à +1) × `LeanY` (−1 à +1) | 5 : neutre + D/U/L/R | Inclinaison gauche/droite + haut/bas en vol rapide A |
| `BS_Flight_FastMove_Lean_B–E` | Même structure | 5 chacun | Variantes correspondantes |

> BlendSpaces 2D pour la couche additive de lean. Les axes LeanX et LeanY pilotent l'inclinaison latérale et frontale du corps en vol rapide.

---

### Vol — SuperheroFlight (Hover Move)

**Chemin de base :** `/Game/ThirdParty/SuperheroFlight/Characters/Mannequin/Animations/Flight/HoverMove/`

#### BS_Flight_HoverMove_A à E — Hover directionnel

| BlendSpace | Axes | Samples clés | Usage |
|---|---|---|---|
| `BS_Flight_HoverMove_A` (Move) | `Speed_Y` (−1/+1) × `Speed_X` (−1/+1) | 5 : `HoverMove_A_Add` (0,0), `_B` (Y=−1), `_L` (X=−1), `_R` (X=+1) | Déplacement hover avant/arrière/gauche/droite (A) |
| `BS_Flight_HoverMove_B–E` | Même structure | 5 chacun | Variantes B à E |

> BlendSpaces 2D en espace normalisé (−1 à +1). Speed_Y = avant/arrière, Speed_X = gauche/droite.

#### BS_Flight_HoverMove_A_Lean à E_Lean — Inclinaison hover

| BlendSpace | Axe | Samples | Usage |
|---|---|---|---|
| `BS_Flight_HoverMove_A_Lean` | `Lean` (−1 à +1) | 3 : neutre (0) + `_L` (−1) + `_R` (+1) | Inclinaison latérale en hover A |
| `BS_Flight_HoverMove_B–E_Lean` | Même structure | 3 chacun | Variantes B à E |

> BlendSpaces 1D pour la couche additive lean en hover. Pilote uniquement le roulis gauche/droite.

#### BS_Flight_HoverMove_A_UaD à E_UaD — Hover verticalité

| BlendSpace | Axe | Samples | Usage |
|---|---|---|---|
| `BS_Flight_HoverMove_A_UaD` | `Speed_Z` (−1 à +1) | 3 : neutre (0) + `_D` (−1) + `_U` (+1) | Montée/descente en hover A |
| `BS_Flight_HoverMove_B–E_UaD` | Même structure | 3 chacun | Variantes B à E |

> BlendSpaces 1D pour la couche additive montée/descente en hover.

---

### Vol — ma_polyphoria

**Chemin de base :** `/Game/Assets/Characters/ma_polyphoria/Animation/`

#### BS_Flight_FastMove (polyphoria)

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 1D |
| **Axe** | `Speed` (grille : 4, plage : 0 à 5000) |
| **Nombre de samples** | 3 |
| **Samples** | `A_Flight_HoverMove_A` (0) → `A_Flight_HoverMove_A` (600) → `A_Flight_FastMove_A` (5000) |
| **Usage** | Transition hover → vol rapide pour le personnage ma_polyphoria |

#### BS_Flight_HoverMove_A (polyphoria)

| Propriété | Valeur |
|---|---|
| **Type** | BlendSpace 2D |
| **Axe X** | `Rotation` (grille : 4, plage : 0° à 175°) |
| **Axe Y** | `Speed` (grille : 5, max : 160) |
| **Nombre de samples** | 10 |
| **Samples clés** | `A_Flight_HoverMove_A_Add`, `A_Flight_HoverMove_A_F/B/R_Add` |
| **Usage** | Identique à la variante Mannequin UE4, adaptée au squelette polyphoria |

---

## Récapitulatif des axes par famille

| Famille de BS | Axe principal | Axe secondaire | Remarque |
|---|---|---|---|
| Locomotion sol (marche/course) | Speed (0–500) | — | 1D |
| Locomotion sol (strafe) | Rotation (−180° à +180°) | Speed (0–800) | 2D omnidirectionnel |
| Locomotion accroupi | Rotation (−180° à +180°) | Speed (0–150) | 2D, vitesse réduite |
| Saut (Start/Air/Land) | Direction (−90° à +90°) | Speed (0–600) | 2D |
| Natation 2D | Direction (−180° à +180°) | Speed (0–400) | 2D, grille dense |
| Natation verticale | Angle (0° à 257°) | — | 1D |
| Hover (mouvement) | Speed_Y (−1/+1) | Speed_X (−1/+1) | 2D normalisé |
| Hover (lean) | Lean (−1/+1) | — | 1D additif |
| Hover (vertical) | Speed_Z (−1/+1) | — | 1D additif |
| Vol rapide (vertical) | Speed_Z (−1/+1) | — | 1D additif |
| Vol rapide (lean) | LeanX (−1/+1) | LeanY (−1/+1) | 2D additif |

---

## Notes techniques

1. **Architecture additive du vol** : Le système SuperheroFlight sépare le mouvement en couches orthogonales (base + lean + UpDown). Les BlendSpaces `_Lean` et `_UaD` sont des couches additives appliquées par-dessus la pose de base, permettant des combinaisons libres en temps réel.

2. **5 variantes de style de vol (A–E)** : Chaque style (A, B, C, D, E) dispose de son propre jeu complet de BlendSpaces (UpDown + Lean + HoverMove + HoverLean + HoverUaD), soit 15 BlendSpaces SuperheroFlight au total pour cette famille.

3. **AB_HWMannequin vs ABP_Player** : Le mannequin principal (`AB_HWMannequin`, 23 graphes) gère locomotion, crouch, vol et nage dans une seule State Machine. `ABP_Player` (31 graphes) étend cette logique avec un système de vol superhéros multi-couches plus sophistiqué.

4. **Conventions de nommage animations** :
   - `MOB1_*` : animations de mobilité Mannequin UE4 HW
   - `KB_*` : animations combat sans arme (Kicking/Boxing ?)
   - `MM_*` : Manny (masculin UE5)
   - `MF_*` : féminin UE5 (Quinn)
   - `A_Flight_*` : animations de vol
   - `A_FM_*` : animations Fast Move (vol rapide)
