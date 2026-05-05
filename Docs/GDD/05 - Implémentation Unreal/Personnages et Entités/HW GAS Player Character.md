---
tags: [implementation, ue5, character, player, gas]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [mapping-8-stats-brutes]
implements: [Le Souffle, L'Accord]
---

# HW GAS Player Character

Classe `AHWGASPlayerCharacter` — personnage joueur. Hérite de [[HW GAS Character]].

> [!info] Refonte 8 stats brutes — voir [[HW Character]]
> Le personnage joueur expose les 4 stats fondamentales (Vitalité, Souffle, Présence, Conscience) auto-calculées et les 8 stats brutes par usage. La progression visible côté joueur est l'**Accord** (0-100 % par ère) — voir [[L'Accord]] et [[Migration Accord]].

### Changelog

| Date | Modification |
|------|-------------|
| 2026-04-07 | BP_PlayerCharacter_CE fully cleaned (0 vars, 0 logic). `UHWCharacterCustomComponent` REMOVED. `SprintFlySpeed` added as UPROPERTY. Login widget created in C++. C++ BeginPlay / Tick now handle nameplate, respawn, bow visibility, targeting. |

## Composants

### Cameras
- 2 cameras (FPS / TPS) avec SpringArm

### Meshes apparel (9 skeletal mesh slots)
Bow, Chest, Pants, Cloak, Helms, Boots, Head, Hairstyle, Shoulders

### Scenes d'armes
Weapon + Shield scene components

### Composants gameplay
- Progression
- Quest
- Combo — voir [[Combo System]]
- WeaponMastery
- [[Dialogue Component]]
- SkillBar
- Buoyancy (`UHWBuoyancyComponent`) — voir [[Water Buoyancy]]

### UPROPERTY C++
- `SprintFlySpeed` — vitesse en mode vol sprint

## BeginPlay / Tick (C++)

Depuis 2026-04-07, la logique auparavant dans le Blueprint a ete migree en C++ :

**BeginPlay :**
- Nameplate setup (voir [[Nameplate]])
- Respawn teleport
- Creation du Login widget

**Tick :**
- Visibilite arc (conditionnelle selon stance)
- Update du systeme de ciblage — voir [[Targeting System]]

## Input

20+ input functions (move, look, jump, sprint, dodge, attack, interact, etc.).

## Abilities configurables

Array d'abilities accordees par defaut :

`GA_ReadyToFight`, `GA_UnarmedAttack`, `GA_BowShoot`, `GA_SwordAttack`,
`GA_Swimming*`, `GA_Flying*`, `GA_Sprint*`, `GA_Dodge*` (4 directions),
`GA_DoubleJump`, `GA_Crouch`, `GA_Blocking`, `GA_Aiming`, `GA_SwitchSwordAndBow`

Voir [[Index Combat]] pour details de chaque ability.

## Degats de chute

- Seuil : `Velocity.Z <= -100` cm/s
- Formule : `max(0, -Velocity.Z - 100) * 0.1`

> **Incoherence :** formule simpliste, ne tient pas compte de la defense.

## Blueprint lien

| Classe C++ | Blueprint | Chemin | Notes |
|-----------|-----------|--------|-------|
| AHWGASPlayerCharacter | BP_PlayerCharacter_CE | /Game/Character/ | Coquille vide depuis 2026-04-07 (0 vars, 0 logique) |

## Assets associés
- [[Character Blueprints]] — catalogue de `BP_PlayerCharacter_CE` et des BP entités

## Voir aussi

- [[HW GAS Character]] — classe parente declaree `AHWGASPlayerCharacter : public AHWGASCharacter` (`HWGASPlayerCharacter.h:37`) ; override les BlueprintNativeEvent `HealthChanged_Implementation` / `ManaChanged_Implementation` / `StaminaChanged_Implementation` / `EnergyChanged_Implementation` / `OnInflictDamage_Implementation` (`HWGASPlayerCharacter.h:198-202`).
- [[Dialogue Component]] — composant `TObjectPtr<UHWDialogueComponent> DialogueComponent` (`HWGASPlayerCharacter.h:148`) instancie via `CreateDefaultSubobject<UHWDialogueComponent>(TEXT("DialogueComponent"))` dans le constructeur (`HWGASPlayerCharacter.cpp:97`).
- [[Combo System]] — composants `TObjectPtr<UHWComboComponent> ComboComponent` et `TObjectPtr<UHWWeaponMasteryComponent> WeaponMasteryComponent` (`HWGASPlayerCharacter.h:142-145`) crees dans le constructeur (`HWGASPlayerCharacter.cpp:95-96`).
- [[HW Progression Component]] — composants `TObjectPtr<UHWProgressionComponent> ProgressionComponent` et `TObjectPtr<UHWQuestComponent> QuestComponent` (`HWGASPlayerCharacter.h:136-139`) crees dans le constructeur (`HWGASPlayerCharacter.cpp:93-94`).
- [[Water Buoyancy]] — composant `TObjectPtr<UHWBuoyancyComponent> OceanBuoyancyComponent` (`HWGASPlayerCharacter.h:342`) cree dans le constructeur (`HWGASPlayerCharacter.cpp:101`) ; `BindWaterEvents()` branche `OnEnteredWater` / `OnExitedWater` via `AddDynamic` sur les delegues du composant (`HWGASPlayerCharacter.cpp:1292-1293`).
- [[Nameplate]] — composant `UHWEntityNameplateWidgetComponent* NameplateWidgetComponent` (`HWGASPlayerCharacter.h:74`) cree et attache au RootComponent dans le constructeur (`HWGASPlayerCharacter.cpp:32-33`) ; `SetupNameplate()` appelle `RefreshLinkToParent()` et masque le widget pour le LocalPlayer.
- [[Targeting System]] — herite des APIs `TargetDetectionSphere` / `LockOnTarget()` / `UpdateTargetingSystem(float)` de `AHWCharacter` ; le `Tick(float DeltaTime)` override (`HWGASPlayerCharacter.h:195`) relaie la mise a jour du targeting chaque frame.
- [[Anim Instance]] — `UHWPlayerAnimInstance` s'attache au `GetMesh()` herite ; son cast `Cast<AHWGASCharacter>(TryGetPawnOwner())` resout sur cette classe et expose l'ASC/les tags `MovementState.*` utilises par la State Machine.
