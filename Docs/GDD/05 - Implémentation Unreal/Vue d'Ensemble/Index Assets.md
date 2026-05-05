---
tags: [implementation, ue5, overview]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MCP_00_INDEX — Index de Navigation et Inventaire MCP
## HybeliorWorld 5.4 — Document de Référence

**Généré le :** 2026-04-04  
**Source :** Inventaire live via `unreal_python` + Asset Registry  
**Total assets dans /Game/ :** **32 307 assets**

---

## Table des Matières

1. [Inventaire Global par Catégorie](#1-inventaire-global-par-catégorie)
2. [Inventaire Détaillé par Path](#2-inventaire-détaillé-par-path)
3. [Index des Documents MCP Existants](#3-index-des-documents-mcp-existants)
4. [Connexions entre Assets](#4-connexions-entre-assets)
5. [Lacunes Identifiées](#5-lacunes-identifiées)

---

## 1. Inventaire Global par Catégorie

### 1.1 Top 20 Classes d'Assets — /Game/ (32 307 total)

| Rang | Classe | Nombre | % du total |
|------|--------|--------|------------|
| 1 | Texture2D | 6 407 | 19,8 % |
| 2 | SoundWave | 4 017 | 12,4 % |
| 3 | SoundCue | 3 756 | 11,6 % |
| 4 | AnimSequence | 3 457 | 10,7 % |
| 5 | StaticMesh | 2 612 | 8,1 % |
| 6 | LandscapeStreamingProxy | 2 158 | 6,7 % |
| 7 | SkeletalMesh | 1 997 | 6,2 % |
| 8 | WorldPartitionHLOD | 1 378 | 4,3 % |
| 9 | InstancedFoliageActor | 1 223 | 3,8 % |
| 10 | MaterialInstanceConstant | 865 | 2,7 % |
| 11 | BP_House_C | 850 | 2,6 % |
| 12 | StaticMeshActor | 634 | 2,0 % |
| 13 | MaterialFunction | 423 | 1,3 % |
| 14 | PaperSprite | 288 | 0,9 % |
| 15 | Material | 287 | 0,9 % |
| 16 | Blueprint | 215 | 0,7 % |
| 17 | GroupActor | 134 | 0,4 % |
| 18 | DataTable | 109 | 0,3 % |
| 19 | AnimMontage | 99 | 0,3 % |
| 20 | FoliageType_InstancedStaticMesh | 92 | 0,3 % |

> **Note :** Les 850 instances de `BP_House_C` témoignent de la génération procédurale de villes active en world partition. Les 2 158 `LandscapeStreamingProxy` confirment le monde ouvert 50 km² découpé en tiles.

---

## 2. Inventaire Détaillé par Path

### 2.1 /Game/AbilitySystem — 99 assets

| Classe | Nombre | Contenu |
|--------|--------|---------|
| Blueprint (GE_*) | 50 | GameplayEffects : mouvement, combat, dégâts, coûts, statuts |
| GameplayAbilityBlueprint | 39 | Abilities joueur, IA, mouvements, équipement |
| DataTable | 6 | Tags GAS (Ability/Combat/Equipment/GameplayCue/Input) + DT_AnimHitBox |
| HWAbilityTagRelationshipMapping | 1 | AbilityTagRelationshipMapping |
| HWGameplayAbilitySet | 1 | Player_AbilitySet |
| TargetingPreset | 1 | SingleSphereTrace |
| EditorUtilityWidgetBlueprint | 1 | BP_UtilityWidget |

**Abilities par sous-catégorie :**

- **Combat :** `GA_BasicAttack`, `GA_SwordAttack`, `GA_SwordAttackTrace`, `GA_UnarmedAttack`, `GA_BowShoot`, `GA_Blocking`, `GA_Aiming`, `GA_ReadyToFight`, `GA_Combo1`, `GA_Combo2`, `GA_TestInputCombo01`, `GA_Fireball`, `GA_Icicle`, `GA_ElectricStormPrototype`, `GA_EntityFireball`
- **Mouvement (Base) :** `GA_SprintStart`, `GA_SprintStop`, `GA_Crouch`, `GA_WalkRun`, `GA_FlyingStart`, `GA_FlyingStop`, `GA_DrivingStart`, `GA_DrivingStop`, `GA_SwimmingStart`, `GA_SwimmingStop`, `GA_OnBoatStart`, `GA_OneBoatStop`
- **Mouvement (Avancé) :** `GA_DodgeBackAbility`, `GA_DodgeForwardAbility`, `GA_DodgeLeftAbility`, `GA_DodgeRightAbility`, `GA_DoubleJumpAbility`, `GA_FirstCameraOn`, `GA_FirstCameraOff`, `GA_FollowDirectionInput`, `GA_FollowMouseDirection`
- **Équipement :** `GA_Equip`, `GA_Unequip`, `GA_SetUpEquipment`, `GA_SwitchSwordAndBow`
- **IA :** `GA_Ai_ReadyToFight`, `GA_TestMobAttack`, `GA_EntityFireball`
- **Divers :** `GA_ApplyFallingDamage`, `GA_ApplyDamageToSelf`, `MyAbility1`

**GameplayEffects par sous-catégorie :**

- **Combat :** `GE_Aiming`, `GE_Blocking`, `GE_ReadyToFight`, `GE_Bow`, `GE_SwordAndShield`, `GE_UnarmedTag`, `GE_Equipment`, `GE_ComboWindow01`
- **Mouvement :** `GE_Sprinting`, `GE_Crouching`, `GE_Flying`, `GE_Running`, `GE_Walking`, `GE_Swimming`, `GE_Driving`, `GE_OnBoat`, `GE_DodgeBackwardIFrame`, `GE_DodgeForwardIFrame`, `GE_DodgedRecently`
- **Dégâts :** `GE_FireballDamageEffect`, `GE_IcicleDamageEffect`, `GE_LightningStormDamage`, `GE_FallingDamageEffect`, `GE_TestDamage50`
- **Coûts :** `GE_ManaCostFor_Fireball`, `GE_ManaCostFor_Icicle`, `GE_DodgeStaminaCost`
- **Régénération :** `GE_HPRegenEffect`, `GE_ManaRegenEffect`, `GE_StaminaRegenEffect`
- **Statuts :** `GE_BurningEffect`, `GE_ApplyBurningFor10Seconds`, `GE_ApplyColdFor6Seconds`, `GE_ApplyFrozenFor4Seconds`, `GE_ApplyWetFor10Seconds`
- **Divers :** `GE_FirstCamera`, `GA_NormalAbility1CooldownEffect`

---

### 2.2 /Game/Blueprints — 40 assets

| Classe | Nombre | Détail |
|--------|--------|--------|
| Blueprint | 29 | Voir ci-dessous |
| PCGGraph | 4 | PCG_TemperateForest, PCG_HotDesert, PCG_MultiBiome, PCG_Basic |
| BlackboardData | 3 | BB_EnemyBase, BB_Tuto, BB_General |
| BehaviorTree | 3 | BT_EnemyBase, BT_Tuto, BT_PNJ_General |
| StaticMesh | 1 | Cube (outil test) |

**Blueprints principaux :**

| Catégorie | Assets |
|-----------|--------|
| Personnage | `BP_PlayerCharacter_CE`, `BP_TestEntity`, `BP_HWEntity` |
| Contrôleurs | `BP_PlayerController`, `BP_EntityPlayerController`, `BP_HWAIController`, `BP_TestEntityAIController`, `BP_HWEntity_AIController` |
| GameMode | `BP_HybeliorGameMode` |
| AI Tasks/Services | `BTTask_Abilities`, `BTTask_ClearBlackboardEntry`, `BTTask_FindPointInRadiusOfHome`, `BTTask_FocusTarget`, `BTService_CheckDistanceToHome`, `BTService_CheckHasTag` |
| Entity | `BP_EntitySpawner`, `BP_EntityPoolManager`, `BP_SpawnTrainingDummy` |
| NPC | `BP_SpawnerPNJ` |
| PCG | `BP_BiomeGenerator`, `BP_PCGManager` |
| World | `BP_Ville`, `BP_GenerateCity`, `BP_InterestPointBase`, `BP_TargetLocation`, `BP_RespawnPoint` |
| Portails | `BP_BoxPortal` |
| Outils | `BP_SplineMesh`, `BP_Door` |

---

### 2.3 /Game/UI — 53 assets

| Classe | Nombre | Détail |
|--------|--------|--------|
| WidgetBlueprint | 23 | HUD, Inventaire, Login, Carte |
| Blueprint | 8 | Contrôleurs CommonUI, HUD, Login |
| CurveFloat | 5 | FloatingDamage (scale/speed/alpha) |
| Texture2D | 4 | Icônes HUD |
| DataTable | 3 | CommonInputActions, NavigationInputActions, CombatStateIcons |
| Font | 3 | Audiowide, BlackOpsOne |
| FontFace | 2 | Fichiers fonte source |
| MaterialParameterCollection | 2 | MapUiParameter |
| Material | 2 | M_MapUi, M_BurningIcon01 |
| MaterialInstanceConstant | 1 | M_MapUi_Inst |

**Widgets par catégorie :**

| Catégorie | Widgets |
|-----------|---------|
| HUD Combat | `ResourceBarsHUDWidget`, `AbilityCooldownsWidget`, `CombatStateIconEntry`, `EntityNameplateWidget`, `PlayerNamePlateWidget`, `UI_PlayerIcon` |
| Carte | `UW_Map`, `UW_Map1`, `UW_TargetPoint` |
| Inventaire | `BP_CommonInventoryListWidget`, `BP_InventoryEquipmentWidget`, `InventoryListWidget`, `InventoryButtonWidget`, `W_Test` |
| Login/Création | `UI_LoginWidget`, `UI_RegisterWidget`, `UI_CreateCharacterWidget`, `UI_CharacterDetailWidget`, `UI_FullScreenLoadingDialog`, `UI_MessageConfirmWidget` |
| CommonUI | `BaseUI`, `InventoryTab`, `MenuTabs` |

---

### 2.4 /Game/Input — 33 assets

| Classe | Nombre |
|--------|--------|
| InputAction | 28 |
| InputMappingContext | 2 |
| PlayerMappableInputConfig | 2 |
| HWInputConfig | 1 |

**Actions Input complètes :**

| Catégorie | InputActions |
|-----------|-------------|
| Mouvement | `IA_Move`, `IA_Sprint`, `IA_Dash`, `IA_Dodge`, `IA_Jump`, `IA_Crouch`, `IA_WalkRun` |
| Vol | `IA_Flying`, `IA_FlyingUp`, `IA_FlyingDown` |
| Combat | `IA_ReadyToFight`, `IA_Weapon_Left`, `IA_Weapon_Right`, `IA_NormalAbility1`, `IA_NormalAbility2`, `IA_SpecialAbility1` |
| Caméra | `IA_Look_Mouse`, `IA_Look_Stick`, `IA_ChangeCamera`, `IA_MouseWheelUp`, `IA_MouseWheelDown` |
| Cible | `IA_Target`, `IA_NextTarget`, `IA_PreviousTarget` |
| UI | `IA_OpenInventory`, `IA_OpenMainMenu`, `IA_ShowMap`, `IA_Interact` |

**Contexts :** `IMC_Default_KBM` (Clavier/Souris), `IMC_Default_Gamepad`  
**Configs :** `PMI_Default_KBM`, `PMI_Default_Gamepad`, `InputData_Player`

---

### 2.5 /Game/Data — 7 assets

| Asset | Classe | Contenu |
|-------|--------|---------|
| `DT_All_Items` | DataTable | Catalogue items global |
| `DT_CharacterAppearancePreset` | DataTable | Présets d'apparence personnage |
| `DT_CharacterDataAsset` | DataTable | Données de personnage (stats base) |
| `DT_InventoryItemLibrary` | DataTable | Bibliothèque d'items inventaire |
| `DT_ItemData` | DataTable | Données items détaillées |
| `E_CombatStyle` | UserDefinedEnum | Styles de combat (Unarmed/Sword/Bow…) |
| `E_MovementType` | UserDefinedEnum | Types de mouvement |

---

### 2.6 /Game/Maps — 68 assets (14 Worlds)

| Carte | Description |
|-------|-------------|
| `HybeliorWorld_50km_V3` | Monde principal 50 km² (World Partition) |
| `HybeliorWorld_20km_V2` | Version précédente 20 km² |
| `8m_Landscape_WC_Complete` | Paysage 8m haute résolution complet |
| `Login` | Carte écran de connexion |
| `HubWorldMap` | Hub joueurs |
| `Galenor` | Zone nommée Galenor |
| `DeadKingdom` | Zone Royaume Mort |
| `DeadZone` | Zone de danger |
| `Canyon` | Zone Canyon |
| `Concept_Map` | Carte de prototypage conceptuel |
| `Interior_Map` | Carte intérieure (bâtiments) |
| `M_GenerateCity_V2` | Test génération de ville V2 |
| `Map_Test_ProceduralGene` | Test génération procédurale |
| `TestScaleBiomeV3` | Test échelle biomes V3 |

---

### 2.7 /Game/Environment — 1 501 assets

| Classe | Nombre | Notes |
|--------|--------|-------|
| Texture2D | 485 | Textures environnement |
| MaterialInstanceConstant | 219 | Instances matériaux |
| MaterialFunction | 180 | Fonctions de matériaux |
| StaticMesh | 99 | Meshes statiques env. |
| Material | 68 | Matériaux master |
| SoundWave | 60 | Sons ambiance |
| AnimSequence | 52 | Animations (végétation, eau) |
| Blueprint | 33 | BP environnement |
| World | 30 | Cartes démo Water (Beaufort 0-9, etc.) |
| PoseAsset | 28 | Poses (végétation) |
| FoliageType_InstancedStaticMesh | 24 | Types de feuillage |
| UserDefinedEnum | 21 | Énumérations environnement |
| HWOceanPreset | 16 | Présets océan Water |

---

### 2.8 /Game/World — 158 assets

| Classe | Nombre | Notes |
|--------|--------|-------|
| FoliageType_InstancedStaticMesh | 65 | Types de végétation procédurale |
| MaterialInstanceConstant | 35 | Matériaux terrain |
| Texture2D | 30 | Textures terrain/monde |
| StaticMesh | 18 | Meshes monde |
| ProceduralFoliageSpawner | 9 | Spawners végétation procédurale |
| Material | 1 | Matériau master monde |

---

### 2.9 /Game/Assets — 18 764 assets (Banque d'assets principale)

| Sous-dossier | Nombre | Contenu |
|-------------|--------|---------|
| `Sound` | 7 621 | SoundWaves + SoundCues (musiques, ambiances, SFX) |
| `Icon` | 4 454 | PaperSprites (icônes UI items, compétences) |
| `Characters` | 3 377 | AnimSequences, SkeletalMeshes, Montages, ma_polyphoria |
| `CharacterEditorModify` | 1 163 | Assets éditeur de personnage |
| `Medieval_Castle_Vol1` | 449 | Pack château médiéval vol.1 |
| `MedievalCastleModularPack` | 392 | Pack château modulaire |
| `Tropical_Jungle_Pack` | 379 | Pack jungle tropicale |
| `SuperheroFlight` | 289 | Animations de vol superhéros (5 niveaux A-E) |
| `MSPresets` | 93 | Présets Megascans |
| `Materials` | 82 | Matériaux custom HW |
| `FX` | 75 | Effets visuels (VFX Niagara/Cascade) |
| `Weapon` | 75 | Assets d'armes |
| `Procedural_Ecosystem` | 75 | Écosystème procédural |
| `Megascans` | 62 | Assets Megascans importés |
| `PN_Pandanus` | 55 | Végétation Pandanus |
| `OldWest` | 54 | Pack style Far West |
| `EnterableMedievalHouses` | 32 | Maisons médiévales praticables |
| `Audio` | 15 | Audio divers |
| `Image` | 11 | Images UI |
| `WorldMap` | 9 | Assets carte du monde |

**AnimMontages dans Assets (99 total) — catégories clés :**

| Catégorie | Montages |
|-----------|----------|
| Esquive (4 directions) | `Dodge_F/B/L/R_Seq_Montage`, `AM_DodgeForwardMontage`, `AM_DodgeBackwardMontage` |
| Combat Épée/Bouclier | `Attack_01_Seq_Montage`, `Equip_02_Seq_Montage` |
| Archerie | `Bow_InPlace_Shoot_2_Aim_Montage`, `Bow_Equip/Unequip_Quick_Montage` |
| Combat à mains nues | `KB_m_Jab_R_Montage` |
| Vol (atterrissage) | `AM_SuperheroLanding_A/B/C/D/E` |
| Vol (esquive) | `AM_Flight_Dodge_[A-E]_[U/D/L/R]` (40 variantes) |
| Magie | `AM_Cast` |

---

### 2.10 /Game/Interactables — 6 assets

| Asset | Classe | Description |
|-------|--------|-------------|
| `BP_Door` | Blueprint | Porte interactable |
| `BP_DoorPortal` | Blueprint | Portail-porte |
| `BP_SupplyPod01` | Blueprint | Pod de ravitaillement |
| `BP_Container` | Blueprint | Conteneur (coffre/boîte) |
| `HubWorldContentManager` | Blueprint | Gestionnaire contenu Hub World |
| `DT_InteractablesToSpawn` | DataTable | Table de spawn des interactables |

---

## 3. Index des Documents MCP Existants

Le dossier `/Documentation/GameDoc/Extended/` contient **33 documents** répartis en 6 séries.

### Documents MCP GAS — GameplaySystem

| Document | Titre | Assets couverts |
|----------|-------|-----------------|
| `MCP_GA_Combat.md` | GameplayAbilities — Combat | GAs de combat, sorts, équipement |
| `MCP_GA_Locomotion.md` | GameplayAbilities — Locomotion | GAs de mouvement, vol, esquive |
| `MCP_GE_Combat.md` | **GameplayEffects — Combat** | **36 GEs : états, dégâts, coûts, statuts élémentaires, regen** |
| `MCP_GE_States_Elemental.md` | GameplayEffects — États & Élémentaires | GEs de mouvement et statuts |
| `MCP_AbilitySystem_Data.md` | AbilitySystem — Données | DataTables tags, AttributeSets |

---

### Série A — Architecture Technique

| Document | Titre | Assets couverts |
|----------|-------|-----------------|
| `A01_Animation.md` | Système d'Animation | AnimSequences, Montages (_Assets/Characters), ABP |
| `A02_Serialization_Settings_System.md` | Sérialisation & Paramètres | Config systèmes, Save/Load |
| `A03_Plugins_OWS_MCP.md` | Plugins, OWS & MCP | Plugin MCP éditeur, OWS intégration |
| `A04_Editor_Tools.md` | Outils Éditeur | BP_UtilityWidget, scripts Python |
| `A05_OWS_Tests_Benchmarks.md` | Tests & Benchmarks OWS | Métriques serveur OWS |
| `A06_Scripts_Automation.md` | Scripts d'Automatisation | Pipelines Python MCP |

### Série B — Contenu Blueprint & Données

| Document | Titre | Assets couverts |
|----------|-------|-----------------|
| `B01_Blueprints_Content.md` | Blueprints de Contenu | /Game/Blueprints (40 assets) |
| `B02_Input_Actions_Configs.md` | Input Actions & Configs | /Game/Input (33 assets) |
| `B03_DataTables_GameData.md` | DataTables & Données Jeu | /Game/Data + /Game/AbilitySystem/Tags |
| `B04_PCG_World_Content.md` | PCG & Génération de Monde | PCG_TemperateForest/HotDesert/MultiBiome/Basic, BP_BiomeGenerator |
| `B05_Maps_LevelDesign.md` | Cartes & Level Design | /Game/Maps (14 Worlds) |
| `B06_Interactables_Architecture_Assets.md` | Interactables | /Game/Interactables (6 assets) |

### Série C — Assets Visuels & Audio

| Document | Titre | Assets couverts |
|----------|-------|-----------------|
| `C01_Assets_Characters_Armor.md` | Assets Personnages & Armures | Assets/Characters, Assets/Weapons |
| `C02_VFX_Audio.md` | VFX & Audio | Assets/FX, Assets/Audio (7 621 sons) |
| `C03_Materials_Shaders.md` | Matériaux & Shaders | Assets/Materials, /Game/Environment (447 mat.) |
| `C04_Environment_Assets_UDS.md` | Assets Environnement & UDS | /Game/Environment, /Game/World, packs tiers |

### Série D — Qualité & Audit

| Document | Titre | Périmètre |
|----------|-------|-----------|
| `D01_Network_Replication_Audit.md` | Audit Réseau & Réplication | GAS replication, OWS sync |
| `D02_Performance_Analysis.md` | Analyse Performance | Profiling, LODs, World Partition |
| `D03_Security_Audit.md` | Audit Sécurité | Auth OWS, accès assets |
| `D04_CrossSystem_Integration.md` | Intégration Inter-Systèmes | GAS ↔ UI ↔ OWS ↔ Animation |
| `D05_TechnicalDebt_Archive.md` | Dette Technique | Assets legacy, BP à migrer |

### Série E — OWS Backend

| Document | Titre | Périmètre |
|----------|-------|-----------|
| `E01_OWS_SQL_Schema.md` | Schéma SQL OWS | Tables BDD (Character, Inventory, etc.) |
| `E02_OWS_InstanceLauncher.md` | Instance Launcher | Démarrage zones serveur |
| `E03_OWS_DevOps_K8s.md` | DevOps & Kubernetes | Déploiement microservices |
| `E04_OWS_ExternalLoginProviders.md` | Login Providers | OAuth, Steam, Epic |
| `E05_OWS_GlobalData_Management.md` | Gestion Données Globales | Persistance monde, OWS GlobalData |

### Série F — Site Web & Frontend

| Document | Titre | Périmètre |
|----------|-------|-----------|
| `F01_Site_Architecture.md` | Architecture Site | Frontend HybeliorWorld.com |
| `F02_Site_Data_LoreDB.md` | Lore Database | Base de données lore narratif |
| `F03_Site_Frontend.md` | Frontend Site | UI web, composants |

### Exports de Données (JSON)

| Fichier | Contenu |
|---------|---------|
| `DT_CharacterAppearancePreset_export.json` | Export complet DataTable apparences |
| `DT_CharacterDataAsset_export.json` | Export complet DataTable personnages |
| `DT_InventoryItemLibrary_export.json` | Export complet bibliothèque items |
| `DT_ItemData_export.json` | Export complet données items |

---

## 4. Connexions entre Assets

### 4.1 Chaîne Sprint

```
IA_Sprint (InputAction)
  → IMC_Default_KBM / IMC_Default_Gamepad (binding clavier/gamepad)
  → InputData_Player (HWInputConfig — mapping IA → Tag GAS)
  → GA_SprintStart / GA_SprintStop (GameplayAbilityBlueprint)
    → GE_Sprinting (GameplayEffect — applique tag Movement.Sprinting)
    → AM_Sprint_* (AnimMontage dans Assets/Characters)
```

### 4.2 Chaîne Esquive

```
IA_Dodge (InputAction)
  → GA_DodgeForwardAbility / GA_DodgeBackAbility / GA_DodgeLeft / GA_DodgeRight
    → GE_DodgeForwardIFrame / GE_DodgeBackwardIFrame (invincibilité pendant esquive)
    → GE_DodgedRecently (cooldown tag)
    → GE_DodgeStaminaCost (coût stamina)
    → Dodge_F/B/L/R_Seq_Montage ou AM_DodgeForwardMontage (animation)
```

### 4.3 Chaîne Combat Épée

```
IA_Weapon_Right (InputAction)
  → GA_SwordAttack / GA_SwordAttackTrace (GameplayAbilityBlueprint)
    → GE_SwordAndShield (GameplayEffect — tag combat)
    → Attack_01_Seq_Montage (AnimMontage)
    → DT_AnimHitBox (DataTable — frames actives hitbox)
    → BP_HitBoxActor (Blueprint — collision combat)
    → GE_TestDamage50 (GameplayEffect — calcul dégâts)
  → GA_Combo1 / GA_Combo2 → GE_ComboWindow01 (fenêtre combo)
```

### 4.4 Chaîne Combat Arc

```
IA_Weapon_Left + IA_ReadyToFight (InputActions)
  → GA_ReadyToFight → GE_ReadyToFight (mode combat)
  → GA_Aiming → GE_Aiming (visée)
  → GA_BowShoot
    → GE_Bow (tag équipement)
    → Bow_InPlace_Shoot_2_Aim_Montage
    → BP_BowProjectile (Blueprint projectile)
```

### 4.5 Chaîne Magie Feu

```
IA_NormalAbility1 (InputAction)
  → GA_Fireball (GameplayAbilityBlueprint)
    → GE_ManaCostFor_Fireball (coût mana)
    → GA_NormalAbility1CooldownEffect (cooldown)
    → AM_Cast (AnimMontage)
    → BP_FireProjectile01 (Blueprint projectile)
    → GE_FireballDamageEffect (dégâts à l'impact)
    → GE_ApplyBurningFor10Seconds → GE_BurningEffect (statut brûlure)
    → GC_LightningStrike (GameplayCue — VFX/SFX)
```

### 4.6 Chaîne Équipement

```
GA_Equip / GA_Unequip (GameplayAbilityBlueprint)
  → GA_SetUpEquipment (configuration initiale)
  → GA_SwitchSwordAndBow (swap d'arme)
  → GE_Equipment (GameplayEffect — tags d'équipement)
  → DT_All_Items / DT_InventoryItemLibrary (DataTables)
  → BP_InventoryEquipmentWidget (UI inventaire/équipement)
```

### 4.7 Chaîne IA Ennemis

```
BP_TestEntity (Blueprint)
  → BP_HWAIController / BP_TestEntityAIController (contrôleurs)
  → BT_EnemyBase (BehaviorTree)
    → BB_EnemyBase (Blackboard)
    → BTService_CheckDistanceToHome / BTService_CheckHasTag (services)
    → BTTask_Abilities / BTTask_FocusTarget / BTTask_FindPointInRadiusOfHome (tasks)
  → GA_Ai_ReadyToFight / GA_TestMobAttack / GA_EntityFireball (abilities IA)
  → Player_AbilitySet (HWGameplayAbilitySet — set GAS)
  → AbilityTagRelationshipMapping (blocage/annulation abilities)
```

### 4.8 Chaîne UI → GAS

```
ResourceBarsHUDWidget → observe attributs GAS (HP/Mana/Stamina)
  ← GE_HPRegenEffect / GE_ManaRegenEffect / GE_StaminaRegenEffect
AbilityCooldownsWidget → observe cooldowns GAS (GA_NormalAbility1CooldownEffect)
CombatStateIconEntry ← DT_CombatStateIcons (icônes états combat)
EntityNameplateWidget ← BP_TestEntity (HUD ennemi)
```

### 4.9 Chaîne Vol

```
IA_Flying / IA_FlyingUp / IA_FlyingDown (InputActions)
  → GA_FlyingStart / GA_FlyingStop (GameplayAbilityBlueprint)
    → GE_Flying (tag Movement.Flying)
    → AM_Flight_Dodge_[A-E]_[U/D/L/R] (40 montages de vol/esquive)
    → AM_SuperheroLanding_[A-E] (5 variantes atterrissage)
```

### 4.10 Chaîne Génération de Ville

```
BP_GenerateCity / BP_Ville (Blueprints)
  → BP_BiomeGenerator / BP_PCGManager (PCG)
    → PCG_TemperateForest / PCG_HotDesert / PCG_MultiBiome / PCG_Basic (PCGGraphs)
  → BP_House_C (850 instances en world partition — auto-généré)
  → BP_SpawnerPNJ → BP_HWEntity + BP_HWEntity_AIController + BT_PNJ_General (PNJ en ville)
  → BP_EntitySpawner + BP_EntityPoolManager (pool d'entites)
```

---

## 5. Lacunes Identifiées

### 5.1 Assets sans documentation directe

| Asset / Groupe | Type | Lacune |
|----------------|------|--------|
| `GA_ElectricStormPrototype` | GameplayAbility | Prototype non documenté, connexions GAS incomplètes |
| `MyAbility1` | GameplayAbility | Asset de test sans documentation |
| `DodgeAbilityTest01` | Blueprint | Asset test, pas dans la chaîne officielle |
| `BP_HWObject` | Blueprint | Rôle unclear — base object GAS ? |
| `E_CombatStyle` / `E_MovementType` | UserDefinedEnum | Valeurs non documentées (plan migration C++ ?) |
| `Assets/Icons` (4 454 sprites) | PaperSprite | Aucun inventaire d'icônes disponible |
| `Assets/CharacterEditorModify` (1 163 assets) | Divers | Éditeur de personnage non documenté |
| `BP_SpawnTrainingDummy` | Blueprint | Dummy d'entraînement sans doc combat |
| `SingleSphereTrace` | TargetingPreset | Utilisé où ? (GA_SwordAttackTrace probable) |
| `GC_LightningStrike` | Blueprint (GameplayCue) | Seul GameplayCue — VFX/SFX pipeline incomplet |

### 5.2 Systèmes partiellement couverts

| Système | Couverture estimée | Manque |
|---------|-------------------|--------|
| Système de Vol | ~70 % | Intégration des 40 montages AM_Flight_Dodge avec le movement component |
| Système de Combo | ~50 % | GA_Combo1/2 + GE_ComboWindow01 — logique de séquence non documentée |
| Sélection de Cible | ~40 % | IA_Target/NextTarget/PreviousTarget → aucun BP de targeting visible |
| GameplayCues (VFX/SFX) | ~20 % | Seul GC_LightningStrike documenté, pas de pipeline complet |
| CharacterEditorModify | ~10 % | 1 163 assets, DT_CharacterAppearancePreset exporté mais pipeline UI non documenté |
| Météo/Océan (Water) | ~60 % | 16 présets océan + 30 cartes démo présents, intégration au monde principal non documentée |
| Système de Portails | ~30 % | BP_BoxPortal + BP_DoorPortal sans documentation de flux zone |
| Progression/Quêtes | ~20 % | Aucun asset Quest/Progression visible dans l'Asset Registry — implémenté côté OWS uniquement ? |

### 5.3 Documents MCP à créer en priorité

| Priorité | Document proposé | Contenu |
|----------|-----------------|---------|
| HAUTE | `MCP_01_GAS_CompletePipeline.md` | Toutes les chaînes GA→GE→Montage avec les connexions complètes |
| HAUTE | `MCP_02_CharacterEditor.md` | Pipeline éditeur de personnage (1 163 assets + DTs) |
| MOYENNE | `MCP_03_CombatComboSystem.md` | GA_Combo1/2, GE_ComboWindow01, DT_AnimHitBox, hitbox timing |
| MOYENNE | `MCP_04_TargetingSystem.md` | Pipeline de ciblage (IA_Target → BP targeting → GAS) |
| MOYENNE | `MCP_05_GameplayCues_VFX.md` | Pipeline complet VFX/SFX via GameplayCues |
| BASSE | `MCP_06_FlightSystem.md` | Vol + 40 montages esquive vol + landing |
| BASSE | `MCP_07_PortalZoneSystem.md` | BP_BoxPortal, BP_DoorPortal, BP_RespawnPoint, flux de zones |

---

## 6. Résumé Statistique

| Path | Assets | Documenting Status |
|------|--------|--------------------|
| /Game/Assets | 18 764 | Partiel (C01, C02, C03) |
| /Game/Environment | 1 501 | Couvert (C04) |
| /Game/Maps | 68 | Couvert (B05) |
| /Game/World | 158 | Partiel (C04) |
| /Game/AbilitySystem | 99 | Couvert (01_GAS, D04) |
| /Game/UI | 53 | Couvert (11_UI) |
| /Game/Blueprints | 40 | Couvert (B01) |
| /Game/Input | 33 | Couvert (B02) |
| /Game/Data | 7 | Couvert (B03) |
| /Game/Interactables | 6 | Couvert (B06) |
| **TOTAL inventorié** | **20 729** | — |
| **Total /Game/** | **32 307** | — |
| **Non inventorié** | **~11 578** | LandscapeProxy, HLOD, instances monde |

> Les ~11 578 assets non inventoriés correspondent principalement aux `LandscapeStreamingProxy` (2 158), `WorldPartitionHLOD` (1 378), `InstancedFoliageActor` (1 223), `StaticMeshActor` (634) et `GroupActor` (134) — tous des objets de niveau générés automatiquement par World Partition, sans besoin de documentation séparée.

---

*Document généré automatiquement via Asset Registry MCP — HybeliorWorld 5.4*  
*Chemins de référence : `/Game/` (racine projet), `/Game/Assets/` (banque assets), `/Game/AbilitySystem/` (GAS)*
