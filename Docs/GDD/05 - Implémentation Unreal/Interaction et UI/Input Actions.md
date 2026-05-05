---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InputActions_Assets

HybeliorWorld uses **Enhanced Input** (never legacy). All actions live as `UInputAction` assets (`IA_*`) under `Content/Input/Actions/`, grouped into `UInputMappingContext` (`IMC_*`), and bridged to GAS via [[Input Component]] + `UHWInputConfig`.

> Catalogue généré via MCP Python (unreal_python) — Date : 2026-04-04
> Source : `/Game/Input/` — UE5.4 Enhanced Input System

## Pipeline

```
Physical device
    → UInputMappingContext (IMC_Default_KBM / IMC_Default_Gamepad)
        (key → UInputAction)
    → UInputAction (IA_Move, IA_Jump, IA_Attack, …)
    → UHWInputConfig  (UInputAction ↔ FGameplayTag InputTag.*)
    → UHWInputComponent
         ├── BindNativeAction()   → C++ method on AHWGASPlayerCharacter
         └── BindAbilityActions() → AbilityInputTagPressed/Released → GAS
```

## Vue d'ensemble

Le projet utilise le **Enhanced Input System** d'Unreal Engine 5.4. L'architecture comprend :

- **28 InputActions** dans `/Game/Input/Actions/`
- **2 InputMappingContexts** dans `/Game/Input/Mappings/`
- **2 PlayerMappableInputConfigs** dans `/Game/Input/Configs/` (remapping joueur)
- **1 HWInputConfig** (`InputData_Player`) — données de configuration globale

## InputActions (IA_*) — `Content/Input/Actions/`

### Movement and locomotion

| Asset | GameplayTag | Type | Role |
|-------|-------------|------|------|
| `IA_Move` | `InputTag_Move` | Axis2D | WASD / left stick |
| `IA_Sprint` | `InputTag_Sprint` | Digital | Sprint — Started + Completed |
| `IA_Crouch` | `InputTag_Crouch` | Digital | Crouch — Started + Completed |
| `IA_WalkRun` | `InputTag_WalkRun` | Digital | Walk/run toggle |
| `IA_Jump` | `InputTag_Jump_Triggered` + `InputTag_Jump_Completed` | Digital | Jump — two events |
| `IA_Dodge` | *(AbilityInputAction)* | Digital | Dodge via GAS |
| `IA_Dash` | `InputTag_Dash` | Digital | Dash |

### Camera & aim

| Asset | GameplayTag | Type | Role |
|-------|-------------|------|------|
| `IA_Look_Mouse` | `InputTag_Look_Mouse` | Axis2D | Mouse camera |
| `IA_Look_Stick` | `InputTag_Look_Stick` | Axis2D | Right stick camera |
| `IA_ChangeCamera` | `InputTag_ChangeCamera` | Digital | Switch perspective |
| `IA_MouseWheelUp` | `InputTag_MouseWheelUp` | Digital | Wheel up |
| `IA_MouseWheelDown` | `InputTag_MouseWheelDown` | Digital | Wheel down |

### Target lock

| Asset | GameplayTag | Role |
|-------|-------------|------|
| `IA_Target` | `InputTag_Target` | Lock / unlock |
| `IA_NextTarget` | `InputTag_NextTarget` | Cycle next |
| `IA_PreviousTarget` | `InputTag_PreviousTarget` | Cycle previous |

### Combat

| Asset | GameplayTag | Role |
|-------|-------------|------|
| `IA_Weapon_Left` | `InputTag_Weapon_Left` + `InputTag_Abilities_WeaponLeft` | Left-hand / secondary weapon |
| `IA_Weapon_Right` | `InputTag_Weapon_Right` + `InputTag_Abilities_WeaponRight` | Right-hand / primary weapon |
| `IA_ReadyToFight` | `InputTag_Abilities_ReadyToFight` | Combat stance toggle (`Combat_State_ReadyToFight`) |
| `IA_NormalAbility1` | `InputTag_Abilities_NormalAbility1` | Normal ability 1 |
| `IA_NormalAbility2` | `InputTag_Abilities_NormalAbility2` | Normal ability 2 |
| `IA_SpecialAbility1` | `InputTag_Abilities_SpecialAbility1` | Special ability 1 |

### Flight

| Asset | GameplayTag | Role |
|-------|-------------|------|
| `IA_Flying` | `InputTag_Flying` | Toggle flight |
| `IA_FlyingUp` | `InputTag_FlyingUp` | Climb (held = Triggered) |
| `IA_FlyingDown` | `InputTag_FlyingDown` | Descend |

### UI & interaction

| Asset | GameplayTag | Role |
|-------|-------------|------|
| `IA_Interact` | `InputTag_Interact` | Interact (routed as GAS ability) |
| `IA_OpenInventory` | *(CommonUI)* | Toggle inventory |
| `IA_OpenMainMenu` | *(CommonUI)* | Open main menu |
| `IA_ShowMap` | *(CommonUI)* | Show map |

## Mapping contexts — `Content/Input/Mappings/`

### IMC_Default_KBM (Keyboard + Mouse)

Typical MMO/action bindings — Move: WASD, Jump: Space, Sprint: LShift, Crouch: Ctrl/C, Interact: E/F, Weapons: LMB/RMB, Target: Tab, Inventory: I, Map: M, Change camera: V.

### IMC_Default_Gamepad

Move = left stick, Look = right stick, Jump = A/X, Sprint = L3, Weapons = RT/LT, Target = RB, Dash = LB, ReadyToFight = X/Square.

## PlayerMappableInputConfigs — `Content/Input/Configs/`

`UPlayerMappableInputConfig` assets wrap an IMC for in-game remapping via CommonUI:

| Asset | IMC source | Usage |
|-------|-----------|-------|
| `PMI_Default_KBM` | `IMC_Default_KBM` | KBM options screen |
| `PMI_Default_Gamepad` | `IMC_Default_Gamepad` | Gamepad options screen |

Referenced in `AHWGASPlayerCharacter::DefaultInputConfigs` (`TArray<FMappableConfigPair>`). Entries with `bShouldActivateAutomatically=true` activate on `SetupPlayerInputComponent`.

## InputData_Player DataAsset

`Content/Input/InputData_Player.uasset` — asset of type `UHWInputConfig`. Two lists:
- **`NativeInputActions`** — C++ handled (movement, camera, sprint, crouch, target, etc.)
- **`AbilityInputActions`** — routed to GAS via `AbilityInputTagPressed/Released`

Referenced by `AHWGASPlayerCharacter::InputConfig`.

## CommonUI input data — `Content/UI/CommonUI/`

| Asset | Type | Role |
|-------|------|------|
| `CommonUIInputData` | `UCommonUIInputData` | Confirm/Cancel/Back for menu nav |
| `CommonInputMousAndKeyboardControllerData` | `UCommonInputBaseControllerData` | Keyboard/mouse glyphs |
| `CommonInputGamepadControllerData` | `UCommonInputBaseControllerData` | Gamepad glyphs |
| `NavigationInputActionDataTable` | `UDataTable` | UI nav actions |
| `MenuTabs`, `InventoryTab` | CommonUI Tab DataAsset | Menu tab definitions |
| `BaseUI` | Widget/DataAsset | CommonUI root |

## DefaultInput.ini

```ini
DefaultPlayerInputClass=/Script/EnhancedInput.EnhancedPlayerInput
DefaultInputComponentClass=/Script/HybeliorWorld.HWInputComponent
```

Mouse sensitivity 0.07 on all axes; smoothing on. Gamepad sticks: DeadZone 0.25, Sensitivity 1.0. Capture: permanent + lock on capture; console keys Tilde/Caret; DoubleClickTime 0.2s; `bEnableLegacyInputScales=True`; `bShouldFlushPressedKeysOnViewportFocusLost=True`.

---

## 28 InputActions — Paramètres complets (MCP scan)

### Légende des colonnes

| Colonne | Description |
|---|---|
| **ValueType** | Type de valeur retournée : `Boolean`, `Axis1D`, `Axis2D`, `Axis3D` |
| **ConsumeInput** | Si `true`, l'action absorbe l'input (empêche propagation) |
| **Modifiers (IA)** | Modificateurs appliqués au niveau de l'action (globaux) |
| **Triggers (IA)** | Conditions de déclenchement au niveau de l'action (globaux) |

| # | Nom | ValueType | ConsumeInput | Modifiers (IA) | Triggers (IA) |
|---|---|---|---|---|---|
| 1 | `IA_Interact` | Boolean | Oui | — | `InputTriggerDown` |
| 2 | `IA_ChangeCamera` | Boolean | Oui | — | — |
| 3 | `IA_Crouch` | Boolean | Oui | — | — |
| 4 | `IA_Dash` | Boolean | Oui | — | — |
| 5 | `IA_Dodge` | Boolean | Oui | — | — |
| 6 | `IA_Flying` | Boolean | Oui | — | — |
| 7 | `IA_FlyingDown` | Boolean | Oui | — | — |
| 8 | `IA_FlyingUp` | Boolean | Oui | — | — |
| 9 | `IA_Jump` | Boolean | Oui | — | `InputTriggerPressed` |
| 10 | `IA_Look_Mouse` | Axis2D | Oui | — | — |
| 11 | `IA_Look_Stick` | Axis2D | Oui | `InputModifierDeadZone` | — |
| 12 | `IA_MouseWheelDown` | Boolean | Oui | — | `InputTriggerDown` |
| 13 | `IA_MouseWheelUp` | Boolean | Oui | — | `InputTriggerDown` |
| 14 | `IA_Move` | Axis2D | Oui | `InputModifierDeadZone` | — |
| 15 | `IA_NextTarget` | Boolean | Oui | — | `InputTriggerDown` |
| 16 | `IA_NormalAbility1` | Boolean | Oui | — | `InputTriggerDown` |
| 17 | `IA_NormalAbility2` | Boolean | Oui | — | `InputTriggerDown` |
| 18 | `IA_PreviousTarget` | Boolean | Oui | — | `InputTriggerDown` |
| 19 | `IA_ReadyToFight` | Boolean | Oui | — | `InputTriggerDown` |
| 20 | `IA_SpecialAbility1` | Boolean | Oui | — | `InputTriggerDown` |
| 21 | `IA_Sprint` | Boolean | Oui | — | — |
| 22 | `IA_Target` | Boolean | Oui | — | `InputTriggerPressed` |
| 23 | `IA_WalkRun` | Boolean | Oui | — | `InputTriggerPressed` |
| 24 | `IA_Weapon_Left` | Boolean | Oui | — | `InputTriggerDown` |
| 25 | `IA_Weapon_Right` | Boolean | Oui | — | `InputTriggerPressed`, `InputTriggerReleased` |
| 26 | `IA_ShowMap` | Boolean | Oui | — | `InputTriggerDown` |
| 27 | `IA_OpenMainMenu` | Boolean | Oui | — | `InputTriggerPressed` |
| 28 | `IA_OpenInventory` | Boolean | Oui | — | `InputTriggerPressed` |

### Observations

- **Toutes les IA ont `ConsumeInput = true`** — aucun input ne se propage à d'autres handlers.
- **Seules `IA_Look_Mouse` et `IA_Move` sont en Axis2D** — les 26 autres sont Boolean.
- **`IA_Look_Stick` et `IA_Move`** portent `InputModifierDeadZone` au niveau IA (avant remapping).
- **`IA_Weapon_Right`** est la seule action avec à la fois `Pressed` et `Released` au niveau IA (gestion hold/release).

## IMC_Default_KBM — Bindings Clavier/Souris

Chemin : `/Game/Input/Mappings/IMC_Default_KBM`

### Bindings principaux

| InputAction | Touche | Triggers (binding) | Notes |
|---|---|---|---|
| `IA_Weapon_Left` | `LeftMouseButton` | — | Attaque principale gauche |
| `IA_Weapon_Right` | `RightMouseButton` | — | Attaque principale droite |
| `IA_NormalAbility1` | `A` | — | Compétence normale 1 |
| `IA_NormalAbility2` | `F` | — | Compétence normale 2 |
| `IA_SpecialAbility1` | `R` | — | Compétence spéciale 1 |
| `IA_Interact` | `E` | — | Interaction monde |
| `IA_Jump` | `SpaceBar` | — | Saut |
| `IA_ReadyToFight` | `X` | — | Posture combat |
| `IA_WalkRun` | `LeftAlt` | — | Basculer marche/course |
| `IA_Sprint` | `LeftShift` | `InputTriggerPressed`, `InputTriggerReleased` | Sprint (maintien) |
| `IA_Crouch` | `LeftControl` | `InputTriggerPressed`, `InputTriggerReleased` | Accroupissement (maintien) |
| `IA_Target` | `MiddleMouseButton` | — | Ciblage ennemi |
| `IA_NextTarget` | *(non assigné)* | — | Cible suivante |
| `IA_PreviousTarget` | *(non assigné)* | — | Cible précédente |
| `IA_Flying` | `H` | `InputTriggerPressed` | Activer vol |
| `IA_FlyingUp` | `SpaceBar` | `InputTriggerDown` | Montée en vol |
| `IA_FlyingDown` | `LeftControl` | `InputTriggerDown` | Descente en vol |
| `IA_ChangeCamera` | `G` | `InputTriggerPressed` | Changer vue caméra |
| `IA_ShowMap` | `,` (Comma) | — | Afficher carte |
| `IA_OpenInventory` | `Tab` | — | Ouvrir inventaire |
| `IA_OpenMainMenu` | `Escape` | — | Menu principal |

### Bindings de déplacement (IA_Move — AZERTY)

> `IA_Move` est en Axis2D. Chaque touche contribue à un axe via des modificateurs de mapping.

| Touche | Modifiers (binding) | Effet |
|---|---|---|
| `Z` | `InputModifierSwizzleAxis` | Avancer (axe Y positif) |
| `S` | `InputModifierSwizzleAxis`, `InputModifierNegate` | Reculer (axe Y négatif) |
| `Q` | `InputModifierSwizzleAxis`, `InputModifierNegate` | Gauche (axe X négatif) |
| `D` | `InputModifierSwizzleAxis` | Droite (axe X positif) |

> Disposition **AZERTY** confirmée (Z/Q au lieu de W/A).

### Bindings souris (IA_Look_Mouse)

| Touche | Modifiers (binding) | Effet |
|---|---|---|
| `Mouse2D` | `InputModifierNegate` | Regard souris (inversion Y) |

### Bindings molette (double mapping)

| InputAction | Touche (binding 1) | Touche (binding 2) |
|---|---|---|
| `IA_MouseWheelUp` | `MouseScrollUp` | `Gamepad_RightTriggerAxis` |
| `IA_MouseWheelDown` | `MouseScrollDown` | `Gamepad_LeftTriggerAxis` |

> Les deux bindings Gamepad pour la molette sont dans l'IMC KBM (pas dans le Gamepad dédié).

### Bindings Gamepad partiels dans l'IMC KBM

| InputAction | Touche | Triggers (binding) | Notes |
|---|---|---|---|
| `IA_Sprint` | `Gamepad_RightShoulder` | `InputTriggerPressed`, `InputTriggerReleased` | Sprint manette (doublon) |
| `IA_Flying` | `Gamepad_DPad_Up` | `InputTriggerPressed` | Vol manette |
| `IA_ChangeCamera` | `Gamepad_DPad_Down` | `InputTriggerPressed` | Caméra manette |

### Binding Dash (IA_Dash)

| Touche | Triggers (binding) | Notes |
|---|---|---|
| `ComboKey` | `InputTriggerCombo` | Dash via combo de touches |

> `IA_Dash` utilise un **InputTriggerCombo** — le déclenchement dépend d'une séquence combinée définie dans le trigger.

## IMC_Default_Gamepad — Bindings Manette

Chemin : `/Game/Input/Mappings/IMC_Default_Gamepad`

| InputAction | Touche Gamepad | Modifiers (binding) | Équivalent Xbox / PS |
|---|---|---|---|
| `IA_NormalAbility1` | `Gamepad_FaceButton_Right` | — | B / Cercle |
| `IA_NormalAbility2` | `Gamepad_LeftShoulder` | — | LB / L1 |
| `IA_SpecialAbility1` | `Gamepad_FaceButton_Top` | — | Y / Triangle |
| `IA_Weapon_Left` | `Gamepad_FaceButton_Bottom` | — | A / Croix (attaque) |
| `IA_Weapon_Right` | *(non mappé dans cet IMC)* | — | — |
| `IA_Dash` | `Gamepad_RightShoulder` | — | RB / R1 |
| `IA_Interact` | `Gamepad_FaceButton_Left` | — | X / Carré |
| `IA_Move` | `Gamepad_Left2D` | `InputModifierDeadZone` | Joystick gauche |
| `IA_Look_Stick` | `Gamepad_Right2D` | `InputModifierDeadZone` | Joystick droit |
| `IA_Jump` | `Gamepad_FaceButton_Bottom` | — | A / Croix (saut) |
| `IA_OpenMainMenu` | `Gamepad_Special_Right` | — | Start / Options |

> **Note :** `IA_Weapon_Left` et `IA_Jump` sont tous deux sur `Gamepad_FaceButton_Bottom` (A / Croix). Le contexte de jeu (combat vs exploration) détermine quelle action est active via la priorité des IMC.

## Notes techniques

### Architecture des déclencheurs (Triggers)

Les triggers peuvent être définis à deux niveaux :

1. **Au niveau de l'InputAction (IA)** — s'appliquent à tous les bindings de cette action.
2. **Au niveau du binding dans l'IMC** — s'appliquent uniquement à cette touche spécifique.

Quand les deux niveaux sont présents, ils s'additionnent (logique AND par défaut).

### Types de triggers utilisés

| Trigger | Comportement |
|---|---|
| `InputTriggerPressed` | Déclenche une seule fois au moment de l'appui |
| `InputTriggerReleased` | Déclenche une seule fois au moment du relâchement |
| `InputTriggerDown` | Déclenche en continu tant que la touche est maintenue |
| `InputTriggerCombo` | Déclenche sur une séquence combinée de touches |

### Modificateurs notables

| Modificateur | Application | Rôle |
|---|---|---|
| `InputModifierDeadZone` | `IA_Move` (IA), `IA_Look_Stick` (IA), `IA_Move` Gamepad (binding) | Filtre les valeurs de stick proches de zéro |
| `InputModifierSwizzleAxis` | Touches ZQSD (binding) | Réorganise les axes X/Y pour mapper des touches séparées sur un Axis2D |
| `InputModifierNegate` | Touches S, Q, Mouse2D (binding) | Inverse la valeur pour les directions négatives |

### InputActions sans binding assigné

Les actions suivantes n'ont **aucune touche assignée** dans les IMC actuels :

- `IA_NextTarget` — ciblage suivant (KBM non assigné)
- `IA_PreviousTarget` — ciblage précédent (KBM non assigné)
- `IA_Dodge` — esquive (absente des deux IMC)
- `IA_Weapon_Right` — attaque droite manette (absente IMC Gamepad)

### PMI (PlayerMappableInputConfig)

Deux configs de remapping joueur existent :
- `PMI_Default_KBM` — remapping clavier/souris
- `PMI_Default_Gamepad` — remapping manette

Ces assets permettent aux joueurs de reconfigurer leurs touches en jeu via le système de **Key Remapping** natif UE5.

## Voir aussi
- [[Input Component]] — consomme ces assets via `UHWInputConfig::NativeInputActions` / `AbilityInputActions` ; `UHWInputComponent::BindNativeAction` et `BindAbilityActions` (HWInputComponent.h:31,34) binds les `UInputAction*` listés ici.
- [[Skill Bar UI]] — `InputTag_Abilities_NormalAbility1/2` + `SpecialAbility1` listés ci-dessus sont routés vers `UHWSkillBarComponent::ActivateSlot()` via `AbilityInputTagPressed` sur l'ASC.
- [[Interactable Framework]] — `IA_Interact` / `InputTag_Interact` est listé dans `AbilityInputActions` et déclenche `IHWInteractable::Interact()` via GAS.
