---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation des Blueprints de Personnages — HybeliorWorld

> Généré via MCP Unreal Editor Python  
> Date : 2026-04-04  
> Projet : HybeliorWorld 5.4

## Classes C++ associées
- [[HW GAS Player Character]] — classe parente de `BP_PlayerCharacter_CE` (coquille vide depuis 2026-04-07)
- [[HW GAS Entity Character]] — classe parente de `BP_TestEntity` et `BP_HWEntity`

### Changelog
| Date | Modification |
|------|-------------|
| 2026-04-07 | BP_PlayerCharacter_CE fully cleaned: 0 variables, 0 logic (empty shell). All gameplay logic migrated to C++ HWGASPlayerCharacter. UHWCharacterCustomComponent REMOVED from all BPs. C++ BeginPlay handles nameplate/respawn, C++ Tick handles bow visibility/targeting. SprintFlySpeed added as UPROPERTY. Login widget created in C++ (AHWLoginPlayerController::BeginPlay). |

---

## Table des matières

1. [Hiérarchie des classes C++](#1-hiérarchie-des-classes-c)
2. [BP_PlayerCharacter_CE](#2-bp_playercharacter_ce)
3. [BP_TestEntity](#3-bp_testmob)
4. [BP_HWEntity](#4-bp_pnj)
5. [BP_PlayerController](#5-bp_playercontroller)
6. [BP_HWAIController](#6-bp_hwaicontroller)
7. [Système de spawn des Mobs](#7-système-de-spawn-des-mobs)
8. [Blackboard & Behavior Tree IA](#8-blackboard--behavior-tree-ia)
9. [HWCombatAttributeSet — Valeurs par défaut](#9-hwcombatattributeset--valeurs-par-défaut)

---

## 1. Hiérarchie des classes C++

```
UObject
└── AActor
    └── APawn
        └── ACharacter
            └── AHWGASCharacter          (C++ — base commune joueur + mob)
                ├── AHWGASPlayerCharacter (C++ — joueur)
                │   └── BP_PlayerCharacter_CE  (Blueprint)
                └── AHWGASMobCharacter    (C++ — mob & PNJ)
                    ├── BP_TestEntity             (Blueprint)
                    └── BP_HWEntity                 (Blueprint)
```

Les trois Blueprints de personnages héritent tous de `AHWGASCharacter` via deux branches C++ spécialisées. La totalité de la logique gameplay est en C++.

> **2026-04-07 :** `BP_PlayerCharacter_CE` est désormais une **coquille vide** : 0 variables, 0 logique Blueprint. Toute la logique gameplay a été migrée vers `AHWGASPlayerCharacter` en C++. `UHWCharacterCustomComponent` a été supprimé de tous les personnages.

---

## 2. BP_PlayerCharacter_CE

**Chemin :** `/Game/Character/BP_PlayerCharacter_CE`  
**Classe C++ parente :** `HWGASPlayerCharacter` (hérite de `HWGASCharacter`)  
**Fichier :** `Content/Character/BP_PlayerCharacter_CE.uasset`

### 2.1 Composants

> **2026-04-07 :** BP_PlayerCharacter_CE est maintenant une coquille vide. Tous les composants ci-dessous sont définis en C++ sur `AHWGASPlayerCharacter`. Le Blueprint n'ajoute plus aucun composant ni variable. `CharacterCustom (HWCharacterCustomComponent)` a été **supprimé**.

#### Composants C++ (tous hérités, aucun ajouté par le BP)

| Nom variable | Classe UE | Rôle |
|---|---|---|
| `Mesh` | `SkeletalMeshComponent` | Mesh du corps principal |
| `CapsuleComponent` | `CapsuleComponent` | Collision physique |
| `CharacterMovement` | `CharacterMovementComponent` | Déplacement |
| `ThirdSpringArm` | `SpringArmComponent` | Bras caméra TPS |
| `ThirdCamera` | `CameraComponent` | Caméra TPS |
| `FirstSpringArm` | `SpringArmComponent` | Bras caméra FPS |
| `FirstCamera` | `CameraComponent` | Caméra FPS |
| `TargetDetectionSphere` | `SphereComponent` | Sphère de détection cibles |
| `MeleeHitBox` | `BoxComponent` | Zone de frappe mêlée |
| `AbilitySystem` | `HWAbilitySystemComponent` | Gameplay Ability System |
| ~~`CharacterCustom`~~ | ~~`HWCharacterCustomComponent`~~ | **SUPPRIME 2026-04-07** |
| `ComboComponent` | `HWComboComponent` | Gestion des combos |
| `ProgressionComponent` | `HWProgressionComponent` | XP, niveaux, progression |
| `QuestComponent` | `HWQuestComponent` | Quêtes |
| `WeaponMasteryComponent` | `HWWeaponMasteryComponent` | Maîtrise des armes |
| `DialogueComponent` | `HWDialogueComponent` | Dialogues |
| `SkillBarComponent` | `HWSkillBarComponent` | Barre de compétences |
| `OceanBuoyancyComponent` | `UHWBuoyancyComponent` | Flottabilité océan (variable non renommée — cf. rename todo) |
| `NameplateWidgetComponent` | `HWEntityNameplateWidgetComponent` | Nameplate (setup en C++ BeginPlay) |
| `ArrowComponent` | `ArrowComponent` | Indicateur de direction |
| `Weapon` | `SceneComponent` | Racine socket arme |
| `Shield` | `SceneComponent` | Racine socket bouclier |
| **Équipement (mesh visuel)** | | |
| `Sword_Mesh` | `SkeletalMeshComponent` | Mesh épée |
| `Bow` | `SkeletalMeshComponent` | Mesh arc (visibilité gérée en C++ Tick) |
| `Shield_Mesh` | `SkeletalMeshComponent` | Mesh bouclier |
| `Chest` | `SkeletalMeshComponent` | Torse |
| `Pants` | `SkeletalMeshComponent` | Jambes |
| `Boots` | `SkeletalMeshComponent` | Bottes |
| `Shoulders` | `SkeletalMeshComponent` | Épaulières |
| `Helms` | `SkeletalMeshComponent` | Casque |
| `Head` | `SkeletalMeshComponent` | Tête |
| `Hairstyle` | `SkeletalMeshComponent` | Coiffure |
| `Cloak` | `SkeletalMeshComponent` | Cape |

#### Composants anciennement ajoutés par le Blueprint (SUPPRIMÉS 2026-04-07)

> Les composants ci-dessous existaient dans le BP avant le nettoyage. Ils ont été soit migrés en C++, soit supprimés :

| Nom variable | Classe | Statut |
|---|---|---|
| ~~`PawnNoiseEmitter`~~ | `PawnNoiseEmitterComponent` | Supprimé du BP |
| ~~`BP_CharacterEditor_HW`~~ | `BP_CharacterEditor_HW_C` | Supprimé du BP |
| ~~`OceanSwimming`~~ | `HWSwimmingComponent` | Supprimé du BP |
| ~~`OceanBuoyancy`~~ | `UHWBuoyancyComponent` | Supprimé du BP |

### 2.2 Variables configurables (CDO)

> **2026-04-07 :** Le BP ne contient plus aucune variable. Toutes les valeurs ci-dessous sont maintenant des UPROPERTY C++ sur `AHWGASPlayerCharacter` avec leurs valeurs par défaut dans le constructeur C++. `SprintFlySpeed` a été ajouté comme nouveau UPROPERTY.

#### Abilities GAS

| Variable | Valeur par défaut | Description |
|---|---|---|
| `ability_sets` | `[Player_AbilitySet]` | Set de capacités GAS accordées au spawn |
| `ability_tag_relationship_mapping` | `AbilityTagRelationshipMapping` | Mapping des relations entre tags d'abilities |
| `ga_crouch_class` / `ga_uncrouch_class` | `GA_Crouch` | Ability d'accroupissement |
| `ga_sprint_start_class` | `GA_SprintStart` | Ability de sprint |
| `ga_sword_attack` | `None` | Ability attaque épée (non assignée) |
| `ga_unarmed_attack` | `None` | Ability attaque à mains nues |
| `ga_bow_shoot` | `None` | Ability tir à l'arc |
| `ga_aiming_class` | `None` | Ability visée |
| `ga_blocking_class` | `None` | Ability parade |
| `ga_dodge_*_class` | `None` (×4) | Abilities d'esquive |
| `ga_double_jump_class` | `None` | Ability double saut |
| `ga_flying_start/stop_class` | `None` | Abilities de vol |
| `ga_swimming_start/stop_class` | `None` | Abilities de nage |
| `ga_switch_sword_and_bow_class` | `None` | Switch arme |
| `ga_ready_to_fight` | `None` | Stance de combat |

#### Mouvement & Physique

| Variable | Valeur | Description |
|---|---|---|
| `jump_max_count` | `1` | Nombre de sauts autorisés |
| `jump_max_hold_time` | `0.0` | Durée max de maintien saut |
| `falling_damage_multiplier` | `0.10` | Multiplicateur de dégâts de chute |
| `falling_damage_threshold` | `-100.0` | Vitesse seuil de dégâts de chute |
| `falling_damage_tag` | `{}` (vide) | GameplayTag des dégâts de chute |
| `length_trace_check_fly` | `200.0` | Longueur de trace pour vérifier le vol |
| `limit_speed_stop_fly` | `600.0` | Vitesse limite d'arrêt du vol |
| `sprint_fly_speed` | *(C++ default)* | Vitesse de vol en sprint (ajouté 2026-04-07) |

#### Input

| Variable | Valeur |
|---|---|
| `input_config` | `InputData_Player` |
| `respawn_point_class` | `BP_RespawnPoint` |

#### Données de personnage (valeurs par défaut du CDO)

| Struct | Contenu |
|---|---|
| `often_change_character_data` | `vie=500, mana=2500, endurance=200, energy=10` |
| `rarely_change_character_data` | `metier="Bucheron", lieu_apparition="Merias", team_number=1, guilde="Les Lames de l'Ombre"` |
| `character_experience` | `xp=10, number_of_kills=10` |

#### Apparence (HWCharacterAppearanceCE — valeurs par défaut)

```
name: "Matthew"
anatomy: HumanMaleAdult
age: 0.0
size: 0.5
skin_material_index: 1
morph_targets: chin_size, jaw_width, mouth_size, nose_curve, eyes_size... (40+ morph targets)
apparel_data_asset: ma_chest_longsleeve_casual, ma_leg_jeans, ma_feet_business
```

#### Effets visuels (status)

| Variable | Valeur |
|---|---|
| `burning_effect` | `GE_BurningEffect` |
| `charged_effect` | `None` |
| `cold_effect` | `None` |
| `wet_effect` | `None` |
| `frozen_material` | `None` |

#### Ciblage

| Variable | Valeur |
|---|---|
| `is_target_detection_active` | `True` |
| `is_targeting_active` | `False` |

### 2.3 Événements et fonctions (interface C++)

> **2026-04-07 :** Aucun event graph ni fonction Blueprint ne subsiste dans BP_PlayerCharacter_CE. Toute la logique est en C++ :
> - **BeginPlay (C++)** : nameplate widget setup, respawn teleport vers le spawn point
> - **Tick (C++)** : bow mesh visibility toggle, targeting system update
> - **Login widget** : créé en C++ dans `AHWLoginPlayerController::BeginPlay`

La liste complète des méthodes exposées sur `HWGASPlayerCharacter` inclut notamment :

**Événements de cycle de vie (C++ uniquement) :**
- `BeginPlay` — Nameplate setup, respawn teleport (migré du BP 2026-04-07)
- `Tick` — Bow visibility, targeting update (migré du BP 2026-04-07)
- `EndPlay`
- `PossessedBy` / `UnPossessed` — Possession par controller

**Événements de dégâts :**
- `receive_any_damage` / `on_take_any_damage`
- `receive_point_damage` / `on_take_point_damage`
- `receive_radial_damage` / `on_take_radial_damage`
- `on_take_damage`
- `on_inflict_damage`
- `on_death`

**Événements de mouvement :**
- `on_landed` / `on_landed_from_flying`
- `on_launched`
- `on_movement_mode_changed`
- `on_end_crouch` / `on_start_crouch`
- `on_jumped` / `on_reached_jump_apex`
- `on_walking_off_ledge`

**Événements de combat :**
- `on_reset`
- `on_boat_offset_move` / `on_boat_offset_move_y`
- `update_targeting_system`
- `update_target_detection`

**Fonctions de personnage :**
- `change_character_data`
- `update_character_appearance` / `update_character_appearance_ce`
- `update_mesh_equipment`
- `update_custom_movement`
- `calculate_combat_attributes`
- `reload_combat_state_display_items`
- `add_combat_state_display_item` / `remove_combat_state_display_item`
- `lock_on_target` / `release_target`
- `select_next_target` / `select_previous_target`
- `grant_ability` / `grant_ability_key_bind`

**Fonctions de chargement (JSON/OWS) :**
- `load_base_character_skills_from_json`
- `load_character_appearance_from_json` / `load_character_appearance_ce_from_json`
- `load_character_experience_from_json`
- `load_often_change_character_data_from_json`
- `load_rarely_change_character_data_from_json`
- `load_change_character_data_from_json`

**Callbacks GAS :**
- `health_changed`
- `mana_changed`
- `stamina_changed`
- `energy_changed`

**Fonctions navales :**
- `boat_move_forward` / `boat_move_right`
- `on_boat_offset_move`
- `quit_ship`

---

## 3. BP_TestEntity

**Chemin :** `/Game/Blueprints/Entity/BP_TestEntity`  
**Classe C++ parente :** `HWGASMobCharacter` (hérite de `HWGASCharacter`)  
**Fichier :** `Content/Blueprints/Entity/BP_TestEntity.uasset`

> Blueprint d'entite standard servant de référence pour tous les entites. Utilisé directement par `BP_EntitySpawner` et `BP_EntityPoolManager`.

### 3.1 Composants

| Nom variable | Classe | Héritage |
|---|---|---|
| `Mesh` | `SkeletalMeshComponent` | C++ hérité |
| `CapsuleComponent` | `CapsuleComponent` | C++ hérité |
| `CharacterMovement` | `CharacterMovementComponent` | C++ hérité |
| `MeleeHitBox` | `BoxComponent` | C++ hérité |
| `FirstMeleeHitBox` | `BoxComponent` | C++ hérité |
| `TargetDetectionSphere` | `SphereComponent` | C++ hérité |
| `EntityNameplateWidgetComponent` | `HWEntityNameplateWidgetComponent` | C++ hérité |
| `AbilitySystem` | `HWAbilitySystemComponent` | C++ hérité |
| ~~`CharacterCustom`~~ | ~~`HWCharacterCustomComponent`~~ | **SUPPRIME 2026-04-07** |
| `AIPerceptionComp` | `AIPerceptionComponent` | C++ hérité |
| `ArrowComponent` | `ArrowComponent` | C++ hérité |
| `Shield` | `SceneComponent` | C++ hérité |
| `Shield_Mesh` | `StaticMeshComponent` | C++ hérité |
| `Weapon` | `SceneComponent` | C++ hérité |
| `Sword_Mesh` | `StaticMeshComponent` | C++ hérité |
| `Head` | `SkeletalMeshComponent` | C++ hérité |
| `Helms` | `SkeletalMeshComponent` | C++ hérité |
| `Hairstyle` | `SkeletalMeshComponent` | C++ hérité |
| `Chest` | `SkeletalMeshComponent` | C++ hérité |
| `Pants` | `SkeletalMeshComponent` | C++ hérité |
| `Boots` | `SkeletalMeshComponent` | C++ hérité |
| `Cloak` | `SkeletalMeshComponent` | C++ hérité |

> Remarque : le joueur a `Shoulders` et `Bow` ; le mob a `FirstMeleeHitBox` en plus mais pas de caméras ni de composants d'inventaire.

### 3.2 Variables spécifiques à HWGASMobCharacter

| Variable | Valeur par défaut | Description |
|---|---|---|
| `mob_level` | `0` | Niveau du mob |
| `mob_tag` | `{}` (vide) | GameplayTag d'identification |
| `mob_capsule_half_height` | `96.0` | Demi-hauteur capsule (si override) |
| `mob_capsule_radius` | `42.0` | Rayon capsule |
| `override_capsule_size` | `False` | Active le resize de la capsule |
| `loot_table` | `None` | Table de loot (non assignée) |
| `health_per_level` | `450.0` | HP ajoutés par niveau |
| `mana_per_level` | `200.0` | Mana ajoutée par niveau |
| `default_abilities` | `[]` | Abilities accordées par défaut |
| `is_target_detection_active` | `False` | Détection de cibles active |
| `ai_controller_class` | `BP_HWAIController` | Controller IA utilisé |
| `owning_spawner` | `None` | Référence au spawner propriétaire |
| `boots_mesh_variants` | `[]` | Variantes de mesh pour bottes |
| `chest_mesh_variants` | `[]` | Variantes de mesh torse |
| `cloak_mesh_variants` | `[]` | Variantes de mesh cape |
| `hairstyle_mesh_variants` | `[]` | Variantes de coiffure |
| `helms_mesh_variants` | `[]` | Variantes de casque |
| `pants_mesh_variants` | `[]` | Variantes de pantalon |

#### Données partagées (HWGASCharacter)

| Struct | Valeurs |
|---|---|
| `often_change_character_data` | `vie=500, mana=2500, endurance=200, energy=10` |
| `base_character_skills` | `skill1=0` |
| `character_experience` | `xp=10, number_of_kills=10` |

#### CombatAttributeSet (composant inline `HWCombatAttributeSet`)

| Attribut GAS | Base | Max |
|---|---|---|
| `health` | 100 | 1000 |
| `mana` | 130 | 1500 |
| `stamina` | 100 | 100 |
| `energy` | 100 | 100 |
| `health_regen_rate` | 100 | — |
| `mana_regen_rate` | 200 | — |
| `stamina_regen_rate` | 10 | — |
| `energy_regen_rate` | 0 | — |
| `attack` | 0 | — |
| `defense` | 0 | — |
| `agility` | 10 | — |
| `strength` | 10 | — |
| `constitution` | 10 | — |
| `crit_rate` | 0.05 (5%) | — |
| `crit_damage` | 0.50 (150%) | — |
| `damage` | 0 | — |
| `healing` | 0 | — |
| `who_attacked_us_last` | `None` | référence acteur |

> Note : Le CombatAttributeSet est directement inliné dans le CDO du Mob (propriété `combat_attributes`). Le joueur (`BP_PlayerCharacter_CE`) a `combat_attributes = None` car ses attributs sont gérés différemment via le `Player_AbilitySet`.

### 3.3 Méthodes spécifiques au Mob

Fonctions supplémentaires présentes sur `HWGASMobCharacter` (non présentes sur le joueur) :

- `initialize_mob` — Initialisation du mob (niveau, apparence, capacités)
- `reset_mob` — Réinitialisation complète (respawn)
- `attack` — Déclenche l'attaque
- `dodge` — Esquive
- `retreat` — Retraite/fuite
- `on_sight_target_detected` — Callback vision (AIPerception)
- `on_hearing_noise_detected` — Callback audition (AIPerception)

---

## 4. BP_HWEntity

**Chemin :** `/Game/Blueprints/Entity/BP_HWEntity`  
**Classe C++ parente :** `HWGASMobCharacter` (même que BP_TestEntity)  
**Fichier :** `Content/Blueprints/Entity/BP_HWEntity.uasset`

> Le PNJ hérite de `HWGASMobCharacter` et non d'une classe NPC dédiée. La différence principale est le controller IA et le Behavior Tree utilisés.

### 4.1 Composants

Le BP_HWEntity possède un sous-ensemble réduit de composants par rapport au Mob (pas de composants de mesh d'équipement visuel définis) :

| Nom variable | Classe |
|---|---|
| `Mesh` | `SkeletalMeshComponent` |
| `CapsuleComponent` | `CapsuleComponent` |
| `CharacterMovement` | `CharacterMovementComponent` |
| `MeleeHitBox` | `BoxComponent` |
| `FirstMeleeHitBox` | `BoxComponent` |
| `TargetDetectionSphere` | `SphereComponent` |
| `EntityNameplateWidgetComponent` | `HWEntityNameplateWidgetComponent` |
| `AbilitySystem` | `HWAbilitySystemComponent` |
| `CharacterCustom` | `HWCharacterCustomComponent` |
| `AIPerceptionComp` | `AIPerceptionComponent` |
| `ArrowComponent` | `ArrowComponent` |

### 4.2 Variables configurées

| Variable | Valeur |
|---|---|
| `ai_controller_class` | `BP_HWEntity_AIController` |
| `is_target_detection_active` | `False` |
| `often_change_character_data` | `vie=500, mana=2500, endurance=200, energy=10` |

#### Apparence par défaut (HWCharacterAppearanceCE)

```
name: "" (non défini — à configurer par BP_SpawnerPNJ)
anatomy: HumanMaleAdult
age: 0.0
size: 0.0
skin_material_index: 0
```

> L'apparence du PNJ est vide par défaut ; elle doit être configurée via `BP_SpawnerPNJ` ou une instance en niveau.

### 4.3 Behavior Tree PNJ

Le PNJ utilise `BP_HWEntity_AIController` avec :
- **BehaviorTree :** `BT_PNJ_General` (`/Game/Blueprints/Entity/BT_PNJ_General`)
- **Blackboard :** `BB_General` (`/Game/Blueprints/Entity/BB_General`)

---

## 5. BP_PlayerController

**Chemin :** `/Game/Game/BP_PlayerController`  
**Classe C++ parente :** `HWPlayerController`

### 5.1 Composants

| Nom variable | Classe | Description |
|---|---|---|
| `BagInventory` | `HWInventoryComponent` | Inventaire principal (sac) |
| `EquipmentInventory` | `HWInventoryComponent` | Inventaire équipement actif |
| `OWSPlayerControllerComponent` | `OWSPlayerControllerComponent` | Composant réseau OWS |

### 5.2 Variables

| Variable | Valeur | Description |
|---|---|---|
| `ability_cooldowns_widget_class` | `None` | Widget des cooldowns de skills |
| `base_ui_widget_class` | `None` | Widget UI de base (HUD) |
| `equip_ability_class` | `None` | Ability d'équipement d'items |
| `all_items_data_table` | `None` | DataTable des items (référence globale) |

### 5.3 Fonctions de cycle de vie

- `bp_post_setup_hud` — Post-configuration du HUD
- `bp_show_loading_screen` / `bp_hide_loading_screen` — Écran de chargement
- `can_restart_player` — Autorise le respawn

---

## 6. BP_HWAIController

**Chemin :** `/Game/Blueprints/Entity/BP_HWAIController`  
**Classe C++ parente :** `HWAIController`  
**Utilisé par :** `BP_TestEntity` (via `ai_controller_class`)

### 6.1 Composants

| Nom | Classe |
|---|---|
| `TransformComponent` | `SceneComponent` |
| `ActionsComp` | `PawnActionsComponent` |
| `PathFollowingComponent` | `PathFollowingComponent` |

### 6.2 Propriétés

| Variable | Valeur | Description |
|---|---|---|
| `behavior_tree_asset` | `None` (configurer par instance) | BT à exécuter |
| `blackboard_asset` | `None` | Blackboard associé |
| `perception_component_custom` | `None` | Perception AIPerception customisée |

> `BP_TestEntityAIController` hérite directement d'`AIController` (non `HWAIController`) — il s'agit d'un controller de test distinct.

### 6.3 BP_HWEntity_AIController

**Chemin :** `/Game/Blueprints/Entity/BP_HWEntity_AIController`  
**Classe C++ parente :** `AIController` (non HWAIController)

Composants identiques à `BP_HWAIController`. Utilise `BT_PNJ_General` et `BB_General`.

---

## 7. Système de spawn des Mobs

### 7.1 BP_EntitySpawner

**Chemin :** `/Game/Blueprints/Entity/BP_EntitySpawner`  
**Classe C++ parente :** `HWEntitySpawner`

#### Composants

| Nom | Classe |
|---|---|
| `DetectionSphere` | `SphereComponent` |
| `Billboard` | `BillboardComponent` |

#### Variables

| Variable | Valeur par défaut | Description |
|---|---|---|
| `mob_to_spawn_class` | `BP_TestEntity` | Classe du mob à spawner |
| `mob_number` | `0` | Nombre de mobs à maintenir en vie |
| `mob_level_spawner` | `0` | Niveau des mobs spawnés |
| `respawn_delay` | `5.0 s` | Délai avant respawn après mort |
| `entity_pool_manager` | `None` | Référence au pool manager |
| `active_mobs_count` | `0` | Compteur mobs actifs (runtime) |
| `spawned_mobs` | `[]` | Liste des mobs spawnés (runtime) |
| `spawn_collision_handling_method` | `ALWAYS_SPAWN` | Gestion collision au spawn |

### 7.2 BP_EntityPoolManager

**Chemin :** `/Game/Blueprints/Entity/BP_EntityPoolManager`  
**Classe C++ parente :** `HWEntityPoolManager`

#### Variables

| Variable | Valeur par défaut | Description |
|---|---|---|
| `mob_class` | `BP_TestEntity` | Classe du mob géré dans le pool |
| `initial_pool_size` | `10` | Nombre d'instances pré-allouées |
| `spawn_collision_handling_method` | `ALWAYS_SPAWN` | Gestion collision |

### 7.3 BP_SpawnTrainingDummy

**Chemin :** `/Game/Blueprints/Entity/BP_SpawnTrainingDummy`  
**Classe C++ parente :** `Actor` (simple)

Cible d'entraînement statique avec sphère de déclenchement et texte de rendu. Spawne automatiquement quand le joueur entre dans le rayon (`SpawnWhenInRadius`).

#### Composants

| Nom | Classe |
|---|---|
| `DefaultSceneRoot` | `SceneComponent` |
| `SpawnWhenInRadius` | `SphereComponent` |
| `TextRender` (×2) | `TextRenderComponent` |

---

## 8. Blackboard & Behavior Tree IA

### 8.1 BB_EnemyBase

**Chemin :** `/Game/Blueprints/Entity/BB_EnemyBase`

| Clé Blackboard | Type | Description |
|---|---|---|
| `HomeLocation` | `Vector` | Position de départ/home du mob |
| `MoveToPoint` | `Vector` | Point de déplacement cible |
| `Target` | `Object` | Cible actuelle (acteur) |
| `HeardNoiseLocation` | `Vector` | Position du bruit détecté |
| `IsRunningHome` | `Bool` | Le mob rentre à sa base |
| `SelfActor` | `Object` | Référence à soi-même |
| `IsReadyToFight` | `Bool` | Mob prêt au combat |
| `IsAiActive` | `Bool` | IA activée |

### 8.2 Assets AI disponibles

| Asset | Type | Description |
|---|---|---|
| `BT_EnemyBase` | `BehaviorTree` | BT de base pour les entites |
| `BT_Tuto` | `BehaviorTree` | BT tutoriel |
| `BB_EnemyBase` | `BlackboardData` | Blackboard ennemi de base |
| `BB_Tuto` | `BlackboardData` | Blackboard tutoriel |
| `BTTask_FocusTarget` | `Blueprint` | Task : focuser la cible |
| `BTTask_FindPointInRadiusOfHome` | `Blueprint` | Task : trouver point dans rayon du home |
| `BTTask_ClearBlackboardEntry` | `Blueprint` | Task : effacer une entrée BB |
| `BTTask_Abilities` | `Blueprint` | Task : déclencher une ability GAS |
| `BTService_CheckHasTag` | `Blueprint` | Service : vérifier tag GameplayTag |
| `BTService_CheckDistanceToHome` | `Blueprint` | Service : vérifier distance au home |

---

## 9. HWCombatAttributeSet — Valeurs par défaut

> Ces valeurs sont celles du CDO de `BP_TestEntity`. Les mobs level 0 partagent ces valeurs de base. La progression est calculée via `health_per_level` (450 HP/niveau) et `mana_per_level` (200 mana/niveau).

| Attribut | Valeur de base | Valeur max | Regen/s |
|---|---|---|---|
| `health` | 100 | 1 000 | 100 |
| `mana` | 130 | 1 500 | 200 |
| `stamina` | 100 | 100 | 10 |
| `energy` | 100 | 100 | 0 |
| `attack` | 0 | — | — |
| `defense` | 0 | — | — |
| `agility` | 10 | — | — |
| `strength` | 10 | — | — |
| `constitution` | 10 | — | — |
| `crit_rate` | 0.05 (5%) | — | — |
| `crit_damage` | 0.50 (+50%) | — | — |
| `damage` | 0 | — | — |
| `healing` | 0 | — | — |

> Les attributs `who_attacked_us_last` (référence acteur) sont aussi présents pour le système de threat/aggro.

---

## Notes techniques

1. **Pas de composants BP_HWEntity dédiés** : Le PNJ n'a pas de `DialogueComponent` ou `QuestComponent` définis en C++ sur `HWGASMobCharacter` ; ces composants sont exclusifs à `HWGASPlayerCharacter`. L'interaction NPC passe par une autre logique (Behavior Tree, interaction zones).

2. **Sérialisation OWS** : Le joueur expose des variables `serialized_*` (JSON) pour la persistance via le backend OWS : `serialized_character_appearance`, `serialized_often_change_character_data`, `serialized_rarely_change_character_data`, `serialized_character_experience`, `serialized_base_character_skills`.

3. **Apparence modulaire** : Le système d'apparence repose sur deux structs (conservées dans `HWCharacter.h`) :
   - `HWCharacterAppearance` : apparence de base (genre, taille, couleurs)
   - `HWCharacterAppearanceCE` : apparence complète CE (morph targets, matériaux, vêtements par DataAsset)
   - **2026-04-07 :** `UHWCharacterCustomComponent` supprimé. Structs `FHWMaterialSet` et `FHWAnatomyProfile` préservées dans `HWCharacter.h`.

4. **Pool de mobs** : `BP_EntityPoolManager` pré-instancie 10 entites. `BP_EntitySpawner` pointe vers ce pool via `entity_pool_manager`. Le respawn automatique a un délai de 5 secondes par défaut.

5. **GAS sur les mobs** : Les mobs ont un `HWAbilitySystemComponent` mais pas de `Player_AbilitySet`. Leurs abilities sont accordées via `default_abilities` (tableau vide par défaut sur `BP_TestEntity`) et potentiellement via `BTTask_Abilities`.
