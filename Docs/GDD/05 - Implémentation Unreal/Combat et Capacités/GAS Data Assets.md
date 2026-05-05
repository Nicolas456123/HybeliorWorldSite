---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MCP AbilitySystem — Documentation des DataTables et Assets GAS

> Généré via MCP Python (unreal_python) — Date : 2026-04-04  
> Projet : HybeliorWorld UE5.4  
> Source : `/Game/AbilitySystem/` (récursif)

## Classes C++ associées
- [[Ability Tag Relationship Mapping]] — `HWAbilityTagRelationshipMapping` configuré par l'asset du même nom
- [[Gameplay Ability]] — abilities accordées par le `Player_AbilitySet`

---

## Sommaire

1. [Vue d'ensemble des assets AbilitySystem](#1-vue-densemble-des-assets-abilitysystem)
2. [DataTables — Tags](#2-datatables--tags)
   - [AbilityTags](#21-abilitytags)
   - [CombatTags](#22-combattags)
   - [EquipementTags](#23-equipementtags)
   - [InputTags](#24-inputtags)
   - [GameplayCueTags](#25-gameplaycuetags)
3. [DataTable — DT_AnimHitBox](#3-datatable--dt_animhitbox)
4. [Player_AbilitySet (HWGameplayAbilitySet)](#4-player_abilityset-hwgameplayabilityset)
   - [Abilities accordées (38)](#41-abilities-accordées-38)
   - [GameplayEffects accordés (4)](#42-gameplayeffects-accordés-4)
5. [AbilityTagRelationshipMapping](#5-abilitytagrelationshipmapping)
6. [Inventaire complet des assets](#6-inventaire-complet-des-assets)

---

## 1. Vue d'ensemble des assets AbilitySystem

| Catégorie | Nombre | Description |
|---|---|---|
| `Blueprint` (GE + divers) | 50 | GameplayEffects, Projectiles, GameplayCues |
| `GameplayAbilityBlueprint` | 39 | Abilities BP (GA_*) |
| `DataTable` | 6 | Tags + HitBox |
| `HWGameplayAbilitySet` | 1 | `Player_AbilitySet` |
| `HWAbilityTagRelationshipMapping` | 1 | `AbilityTagRelationshipMapping` |
| `TargetingPreset` | 1 | `SingleSphereTrace` |
| `EditorUtilityWidgetBlueprint` | 1 | `BP_UtilityWidget` |

---

## 2. DataTables — Tags

Les DataTables de tags définissent les `GameplayTag` natifs utilisés dans tout le système GAS. Elles servent de source unique de vérité (Single Source of Truth) pour les tags enregistrés en C++ via `UGameplayTagsManager`.

---

### 2.1 AbilityTags

**Chemin :** `/Game/AbilitySystem/Tags/AbilityTags`  
**Struct :** `GameplayTagTableRow`  
**Rôle :** Tags d'échec d'activation et événements d'abilities.

| Nom | Tag | Commentaire |
|---|---|---|
| AbilityActivateFailIsDead | `Ability.ActivateFail.IsDead` | Échec : le personnage est mort |
| AbilityActivateFailCooldown | `Ability.ActivateFail.Cooldown` | Échec : cooldown actif |
| AbilityActivateFailCost | `Ability.ActivateFail.Cost` | Échec : coût non satisfait |
| AbilityActivateFailTagsBlocked | `Ability.ActivateFail.TagsBlocked` | Échec : tag bloquant présent |
| AbilityActivateFailTagsMissing | `Ability.ActivateFail.TagsMissing` | Échec : tag requis manquant |
| AbilityActivateFailNetworking | `Ability.ActivateFail.Networking` | Échec : politique réseau |
| AbilityEventCombo | `Ability.Event.Combo` | Événement déclencheur de combo |

**Total : 7 entrées**

---

### 2.2 CombatTags

**Chemin :** `/Game/AbilitySystem/Tags/CombatTags`  
**Struct :** `GameplayTagTableRow`  
**Rôle :** États de combat, types de dégâts, cooldowns, SetByCaller pour attributs, flags.

#### États de combat (`Combat.State.*`)

| Nom | Tag | Commentaire |
|---|---|---|
| CombatStateDead | `Combat.State.Dead` | Personnage mort |
| CombatStateWet | `Combat.State.Wet` | État mouillé |
| CombatStateBurning | `Combat.State.Burning` | État enflammé |
| CombatStateCold | `Combat.State.Cold` | État froid |
| CombatStateCharged | `Combat.State.Charged` | État chargé électriquement |
| CombatStateElectrified | `Combat.State.Electrified` | État électrifié |
| CombatStateFrozen | `Combat.State.Frozen` | État gelé |
| CombatStateIframe | `Combat.State.Iframe` | Invincibilité (I-frames) |
| CombatStateDodgedRecently | `Combat.State.DodgedRecently` | Esquive récente |
| CombatStateReadyToFight | `Combat.State.ReadyToFight` | En posture de combat |
| Blocking | `Combat.State.Blocking` | En train de bloquer |

#### Types de dégâts (`Combat.DamageType.*`)

| Nom | Tag | Commentaire |
|---|---|---|
| CombatDamageTypeFire | `Combat.DamageType.Fire` | Dégâts de feu |
| CombatDamageTypeWater | `Combat.DamageType.Water` | Dégâts d'eau |
| CombatDamageTypeIce | `Combat.DamageType.Ice` | Dégâts de glace |
| CombatDamageTypeLightning | `Combat.DamageType.Lightning` | Dégâts de foudre |
| CombatDamageTypeFalling | `Combat.DamageType.Falling` | Dégâts de chute |

#### Cooldowns (`Combat.Cooldown.*`)

| Nom | Tag | Commentaire |
|---|---|---|
| CombatCooldownNormalAbility1 | `Combat.Cooldown.NormalAbility1` | Cooldown Ability normale 1 |
| CombatCooldownNormalAbility2 | `Combat.Cooldown.NormalAbility2` | Cooldown Ability normale 2 |

#### SetByCaller (`SetByCaller.*`) — Modificateurs d'attributs

| Nom | Tag | Attribut modifié |
|---|---|---|
| SetByCallerStrength | `SetByCaller.Strength` | Force |
| SetByCallerAttack | `SetByCaller.Attack` | Attaque |
| SetByCallerSpeed | `SetByCaller.Speed` | Vitesse |
| SetByCallerAgility | `SetByCaller.Agility` | Agilité |
| SetByCallerCritDamage | `SetByCaller.CritDamage` | Dégâts critiques |
| SetByCallerIntelligence | `SetByCaller.Intelligence` | Intelligence |
| SetByCallerConstitution | `SetByCaller.Constitution` | Constitution |
| SetByCallerMaxStamina | `SetByCaller.MaxStamina` | Endurance maximale |
| SetByCallerMaxHealth | `SetByCaller.MaxHealth` | Santé maximale |
| SetByCallerMaxMana | `SetByCaller.MaxMana` | Mana maximale |
| SetByCallerDefense | `SetByCaller.Defense` | Défense |

#### Divers

| Nom | Tag | Commentaire |
|---|---|---|
| CombatFlagsCriticalHit | `Combat.Flags.CriticalHit` | Coup critique |
| CombatSetByCallingFallingDamage | `Combat.SetByCaller.FallingDamage` | SetByCaller dégâts de chute |
| CombatActivateFromEventApplyFallingDamage | `Combat.ActivateFromEvent.ApplyFallingDamage` | Activation via événement chute |
| CombatComboWindow1 | `Combat.Combo.Window.1` | Fenêtre de combo 1 |
| CombatSetUnarmed | `Combat.Set.Unarmed` | Set de combat : mains nues |
| CombatSetSwordAndShield | `Combat.Set.SwordAndShield` | Set de combat : épée et bouclier |
| CombatSetBow | `Combat.Set.Bow` | Set de combat : arc |

**Total : 35 entrées**

---

### 2.3 EquipementTags

**Chemin :** `/Game/AbilitySystem/Tags/EquipementTags`  
**Struct :** `GameplayTagTableRow`  
**Rôle :** Slots d'équipement et types d'armes.

#### Slots d'équipement (`EquipementSlot.*`)

| Nom | Tag | Commentaire |
|---|---|---|
| HeadSlot | `EquipementSlot.Head` | Tête |
| NecklaceSlot | `EquipementSlot.Necklace` | Collier |
| ChestSlot | `EquipementSlot.Chest` | Torse |
| CloakSlot | `EquipementSlot.Cloak` | Cape |
| BeltSlot | `EquipementSlot.Belt` | Ceinture |
| BracerLeftSlot | `EquipementSlot.BracerLeft` | Brassard gauche |
| BracerRightSlot | `EquipementSlot.BracerRight` | Brassard droit |
| HandLeftSlot | `EquipementSlot.HandLeft` | Main gauche |
| HandRightSlot | `EquipementSlot.HandRight` | Main droite |
| RingLeftSlot | `EquipementSlot.RingLeft` | Anneau gauche |
| RingRightSlot | `EquipementSlot.RingRight` | Anneau droit |
| PantsSlot | `EquipementSlot.Pants` | Pantalon |
| BootsSlot | `EquipementSlot.Boots` | Bottes |
| CristalSlot | `EquipementSlot.Cristal` | Cristal |
| EarringLeftSlot | `EquipementSlot.EarringLeft` | Boucle d'oreille gauche |
| EarringRightSlot | `EquipementSlot.EarringRight` | Boucle d'oreille droite |

#### Types d'armes (`WeaponType.*`)

| Nom | Tag | Commentaire |
|---|---|---|
| WeaponType.Unarmed | `WeaponType.Unarmed` | Mains nues |
| WeaponType.Bow | `WeaponType.Bow` | Arc |
| WeaponType.HandLeftAlone | `WeaponType.HandLeftAlone` | Arme main gauche seule |
| WeaponType.HandRightAlone | `WeaponType.HandRightAlone` | Arme main droite seule |
| WeaponType.TwoWeapon | `WeaponType.TwoWeapon` | Double arme |
| WeaponType.GreatSword | `WeaponType.GreatSword` | Grande épée |

**Total : 22 entrées**

---

### 2.4 InputTags

**Chemin :** `/Game/AbilitySystem/Tags/InputTags`  
**Struct :** `GameplayTagTableRow`  
**Rôle :** Tags d'input pour les abilities et les états de mouvement.

#### Tags d'input pour abilities (`InputTag.Abilities.*`)

| Nom | Tag | Commentaire |
|---|---|---|
| NormalAbility1 | `InputTag.Abilities.NormalAbility1` | Ability normale 1 |
| NormalAbility2 | `InputTag.Abilities.NormalAbility2` | Ability normale 2 |
| SpecialAbility1 | `InputTag.Abilities.SpecialAbility1` | Ability spéciale 1 |
| Dash | `InputTag.Abilities.Dash` | Dash |
| WeaponLeft | `InputTag.Abilities.WeaponLeft` | Arme gauche |
| WeaponRight | `InputTag.Abilities.WeaponRight` | Arme droite |
| ReadyToFight | `InputTag.Abilities.ReadyToFight` | Posture de combat |

#### Tags d'input divers (`InputTag.*`)

| Nom | Tag | Commentaire |
|---|---|---|
| Crouch | `InputTag.Crouch` | Accroupissement |
| Move | `InputTag.Move` | Mouvement |
| Interact | `InputTag.Interact` | Interaction |
| Sprint | `InputTag.Sprint` | Sprint |
| WalkRun | `InputTag.WalkRun` | Marche/course |
| Aiming | `InputTag.Aiming` | Visée |
| FirstCamera | `InputTag.FirstCamera` | Vue première personne |

#### États de mouvement (`MovementState.*`)

| Nom | Tag | Commentaire |
|---|---|---|
| Running | `MovementState.Running` | En train de courir |
| Walking | `MovementState.Walking` | En train de marcher |
| Sprinting | `MovementState.Sprinting` | En train de sprinter |
| Crawing | `MovementState.Crawing` | En train de ramper |
| Ragdoll | `MovementState.Ragdoll` | Ragdoll |
| Crouching | `MovementState.Crouching` | Accroupi |
| Flying | `MovementState.Flying` | En vol |
| Swimming | `MovementState.Swimming` | En nage |
| Driving | `MovementState.Driving` | En conduite |
| OnBoat | `MovementState.OnBoat` | Sur un bateau |

**Total : 24 entrées**

---

### 2.5 GameplayCueTags

**Chemin :** `/Game/AbilitySystem/Tags/GameplayCueTags`  
**Struct :** `GameplayTagTableRow`  
**Rôle :** Tags pour les GameplayCues (effets visuels/sonores déclenchés par GAS).

| Nom | Tag | Commentaire |
|---|---|---|
| GameplayCueTest | `GameplayCue.Test` | Cue de test |
| GameplayCueLightningStormStrike | `GameplayCue.LightningStorm.Strike` | Impact de l'orage électrique |

**Total : 2 entrées**

---

## 3. DataTable — DT_AnimHitBox

**Chemin :** `/Game/AbilitySystem/Abilities/DT_AnimHitBox`  
**Rôle :** Définit les hitboxes positionnées dans le temps pour les animations d'attaque (détection de collision frame-par-frame).

### Entrée : `Attack_01_Seq_Hitboxes`

**Animation référencée :**  
`/Game/Assets/Characters/Mannequin_UE4/Animations/EssentialSwordShieldAnimations/Attack_01_Seq`

**Hitboxes (9 keyframes) :**

| # | Time (s) | Location (X, Y, Z) | Rotation (Pitch, Yaw, Roll) |
|---|---|---|---|
| 1 | 0.000 | (-25.88, 30.60, 85.02) | (58.35, 92.16, 76.10) |
| 2 | 0.200 | (-60.76, -57.84, 169.23) | (-61.84, 120.82, 167.52) |
| 3 | 0.400 | (-15.51, 33.41, 176.20) | (-66.78, -32.98, -117.06) |
| 4 | 0.600 | (28.73, -40.97, 56.15) | (29.84, 104.59, 144.29) |
| 5 | 0.800 | (37.00, -43.07, 60.33) | (34.87, 131.52, 168.02) |
| 6 | 1.000 | (81.71, -11.17, 74.28) | (56.86, 229.93, -45.20) |
| 7 | 1.200 | (65.12, 29.26, 86.83) | (44.12, -49.98, 32.64) |
| 8 | 1.400 | (-0.68, 46.64, 86.99) | (50.62, 19.63, 64.16) |
| 9 | 1.600 | (-25.34, 32.27, 84.71) | (57.96, 86.36, 75.74) |

> Les hitboxes décrivent la trajectoire d'un volume de détection (probablement une sphère ou capsule) attaché à l'arme pendant l'animation d'attaque principale à l'épée. La durée totale est de 1.6 secondes avec 9 échantillons régulièrement espacés de 0.2s.

---

## 4. Player_AbilitySet (HWGameplayAbilitySet)

**Chemin :** `/Game/AbilitySystem/AbilitySet/Player_AbilitySet`  
**Classe C++ :** `HWGameplayAbilitySet`  
**Rôle :** Asset de configuration central qui définit l'ensemble des abilities et effets accordés automatiquement au joueur lors de l'initialisation de l'ASC (Ability System Component).

### 4.1 Abilities accordées (38)

Toutes les abilities sont accordées au niveau 1 (`AbilityLevel=1`).

#### Combat

| Ability | InputTag associé |
|---|---|
| `GA_BasicAttack` | `InputTag.Abilities.SpecialAbility1` |
| `GA_SwordAttack` | *(aucun)* |
| `GA_SwordAttackTrace` | *(aucun)* |
| `GA_UnarmedAttack` | *(aucun)* |
| `GA_BowShoot` | *(aucun)* |
| `GA_Aiming` | *(aucun)* |
| `GA_ReadyToFight` | `InputTag.Abilities.ReadyToFight` |
| `GA_Blocking` | *(aucun)* |
| `GA_SwitchSwordAndBow` | *(aucun)* |

#### Combos

| Ability | InputTag associé |
|---|---|
| `GA_Combo1` | *(aucun)* |
| `GA_Combo2` | *(aucun)* |

#### Magie

| Ability | InputTag associé |
|---|---|
| `GA_Fireball` | `InputTag.Abilities.NormalAbility2` |
| `GA_Icicle` | *(aucun)* |

#### Équipement

| Ability | InputTag associé |
|---|---|
| `GA_Equip` | *(aucun)* |
| `GA_Unequip` | *(aucun)* |
| `GA_SetUpEquipment` | *(aucun)* |

#### Mouvement — Base

| Ability | InputTag associé |
|---|---|
| `GA_WalkRun` | `InputTag.WalkRun` |
| `GA_SprintStart` | *(aucun)* |
| `GA_SprintStop` | *(aucun)* |
| `GA_Crouch` | *(aucun)* |
| `GA_FlyingStart` | *(aucun)* |
| `GA_FlyingStop` | *(aucun)* |
| `GA_SwimmingStart` | *(aucun)* |
| `GA_SwimmingStop` | *(aucun)* |
| `GA_DrivingStart` | *(aucun)* |
| `GA_DrivingStop` | *(aucun)* |
| `GA_OnBoatStart` | *(aucun)* |
| `GA_OneBoatStop` | *(aucun)* |

#### Mouvement — Esquive et direction

| Ability | InputTag associé |
|---|---|
| `GA_DodgeForwardAbility` | *(aucun)* |
| `GA_DodgeBackAbility` | *(aucun)* |
| `GA_DodgeLeftAbility` | *(aucun)* |
| `GA_DodgeRightAbility` | *(aucun)* |
| `GA_DoubleJumpAbility` | `InputTag.Jump` |
| `GA_FollowDirectionInput` | *(aucun)* |
| `GA_FollowMouseDirection` | *(aucun)* |

#### Caméra

| Ability | InputTag associé |
|---|---|
| `GA_FirstCameraOn` | *(aucun)* |
| `GA_FirstCameraOff` | *(aucun)* |

#### Dégâts passifs

| Ability | InputTag associé |
|---|---|
| `GA_ApplyFallingDamage` | *(aucun)* |

### 4.2 GameplayEffects accordés (4)

Ces effets sont appliqués automatiquement à la création du personnage et persistent.

| GameplayEffect | Niveau | Rôle |
|---|---|---|
| `GE_HPRegenEffect` | 1.0 | Régénération automatique des PV |
| `GE_StaminaRegenEffect` | 1.0 | Régénération automatique de l'endurance |
| `GE_ManaRegenEffect` | 1.0 | Régénération automatique du mana |
| `GE_UnarmedTag` | 1.0 | Applique le tag `Combat.Set.Unarmed` (état initial mains nues) |

> **Note :** La propriété `GrantedAttributes` est vide — les AttributeSets sont accordés ailleurs (probablement directement dans le code C++ de l'ASC ou via un autre mécanisme d'initialisation).

---

## 5. AbilityTagRelationshipMapping

**Chemin :** `/Game/AbilitySystem/AbilitySet/AbilityTagRelationshipMapping`  
**Classe C++ :** `HWAbilityTagRelationshipMapping`  
**Rôle :** Définit les relations entre tags d'abilities : quelles abilities se bloquent mutuellement, s'annulent, ou requièrent certains états.

### Entrées de relation configurées (1)

#### Entrée 1 — NormalAbility1

| Champ | Valeur |
|---|---|
| **AbilityTag** | `InputTag.Abilities.NormalAbility1` |
| AbilityTagsToBlock | *(vide)* |
| AbilityTagsToCancel | *(vide)* |
| **ActivationRequiredTags** | `Combat.State.DodgedRecently` |
| ActivationBlockedTags | *(vide)* |

> **Interprétation :** L'ability `NormalAbility1` ne peut s'activer que si le personnage vient d'effectuer une esquive (`Combat.State.DodgedRecently` est actif). Cela implémente une mécanique de **combo post-esquive** — une ability déclenchable uniquement après un dodge réussi, cohérent avec le système de combat hybride action+skills du projet.

---

## 6. Inventaire complet des assets

### GameplayAbilityBlueprints (39)

#### Combat
- `GA_BasicAttack`, `GA_SwordAttack`, `GA_SwordAttackTrace`, `GA_UnarmedAttack`
- `GA_BowShoot`, `GA_Aiming`, `GA_Blocking`, `GA_ReadyToFight`
- `GA_SwitchSwordAndBow`

#### Combos
- `GA_Combo1` (Blueprint), `GA_Combo2`

#### Magie / Sorts
- `GA_Fireball`, `GA_Icicle`, `GA_ElectricStormPrototype`

#### Équipement
- `GA_Equip`, `GA_Unequip`, `GA_SetUpEquipment`

#### Mouvement — Base (`/Movement/Base/`)
- `GA_WalkRun`, `GA_SprintStart`, `GA_SprintStop`
- `GA_Crouch`, `GA_FlyingStart`, `GA_FlyingStop`
- `GA_SwimmingStart`, `GA_SwimmingStop`
- `GA_DrivingStart`, `GA_DrivingStop`
- `GA_OnBoatStart`, `GA_OneBoatStop`

#### Mouvement — Dodge & Direction (`/Movement/`)
- `GA_DodgeForwardAbility`, `GA_DodgeBackAbility`
- `GA_DodgeLeftAbility`, `GA_DodgeRightAbility`
- `GA_DoubleJumpAbility`, `GA_FollowDirectionInput`, `GA_FollowMouseDirection`

#### Caméra (`/Movement/`)
- `GA_FirstCameraOn`, `GA_FirstCameraOff`

#### Dégâts passifs
- `GA_ApplyFallingDamage`

#### IA (`/Entity/`)
- `GA_Ai_ReadyToFight`, `GA_TestMobAttack`, `GA_EntityFireball`

#### Tests / Prototypes
- `GA_TestInputCombo01`, `MyAbility1`, `GA_ApplyDamageToSelf`

### GameplayEffects Blueprints (50)

#### États de combat (`/GEs/Combat/`)
- `GE_Aiming`, `GE_Blocking`, `GE_ReadyToFight`
- `GE_SwordAndShield`, `GE_Bow`, `GE_UnarmedTag`, `GE_Equipment`

#### Dégâts (`/GEs/Damage/`)
- `GE_FireballDamageEffect`, `GE_IcicleDamageEffect`
- `GE_FallingDamageEffect`, `GE_TestDamage50`, `GE_LightningStormDamage`

#### Coûts (`/GEs/Cost/`)
- `GE_ManaCostFor_Fireball`, `GE_ManaCostFor_Icicle`
- `GE_DodgeStaminaCost`

#### Mouvement (`/GEs/Movement/`)
- `GE_Crouching`, `GE_Flying`, `GE_Sprinting`, `GE_Running`, `GE_Walking`
- `GE_Swimming`, `GE_Driving`, `GE_OnBoat`
- `GE_DodgeBackwardIFrame`, `GE_DodgeForwardIFrame`, `GE_DodgedRecently`

#### Régénération
- `GE_HPRegenEffect`, `GE_ManaRegenEffect`, `GE_StaminaRegenEffect`

#### États altérés
- `GE_BurningEffect`
- `GE_ApplyBurningFor10Seconds`, `GE_ApplyColdFor6Seconds`
- `GE_ApplyFrozenFor4Seconds`, `GE_ApplyWetFor10Seconds`

#### Divers
- `GE_ComboWindow01`, `GE_FirstCamera`
- `GA_NormalAbility1CooldownEffect`

### Projectiles
- `BP_BowProjectile`, `BP_FireProjectile01`, `BP_IceProjectile01`

### GameplayCue
- `GC_LightningStrike`

### Targeting
- `SingleSphereTrace` (TargetingPreset)

---

*Documentation générée automatiquement via MCP Python — unreal_python*
