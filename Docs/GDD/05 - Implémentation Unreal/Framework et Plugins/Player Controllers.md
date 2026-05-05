---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# PlayerControllers

Deux PlayerControllers distincts : un pour la phase de login, un pour la session de jeu.

## AHWLoginPlayerController
- Contient `OWSPlayerControllerComponent`
- **BeginPlay C++** : crée le widget login (`LoginWidgetClass → LoginWidget`), `SetInputModeUIOnly`, `bShowMouseCursor=true`
- **UPROPERTY** :
  - `LoginWidgetClass` (`TSubclassOf<UHWLoginWidget>`)
  - `LoginWidget` (`UHWLoginWidget*`)
- Events : `NotifyGetAllCharacters`, `NotifyCreateCharacter`, `NotifyGetCharacterData`

## AHWPlayerController
- **2 inventaires** : `BagInventory` + `EquipmentInventory`
- **Initialisation multi-step** : GAS (25%) + CUSTOMCHARACTERDATA (50%) + PLAYERSTATE (25%)
- **Persistance 10s** : `OftenChangeCharacterData`, inventaires
- **Persistance 5min** : `WeaponMastery`, `Progression`, `SkillBar`, `QuestProgress`
- **HUD** : ResourceBars, BaseUI, MenuTabs, AbilityCooldowns, PlayerNamePlate, Map
- **Interactions** : `SupplyPods`, `Containers` (FastArray répliqué)
- **Equipment abilities** : Equip/Unequip/SetUp via GAS

## Assets BP référencés (via BP_PlayerController)

```
BP_PlayerController (BP) stocke les classes widgets :
├─ ResourceBarsWidgetClass → ResourceBarsHUDWidget
├─ BaseUIWidgetClass → UI_BaseHUD
├─ MenuTabsWidgetClass → UHWMenuTabsWidget C++ / BP
├─ AbilityCooldownsWidgetClass → AbilityCooldownsWidget (BP)
├─ PlayerNamePlateWidgetClass → PlayerNamePlateWidget (BP)
└─ MapWidgetClass → UW_Map (BP, hérite UHWMapWidget C++)
```

## Liaison BP ↔ C++

| Classe C++ | Blueprint |
|-----------|-----------|
| `AHWPlayerController` | `BP_PlayerController` (6 classes widgets UI référencées) |
| `AHWLoginPlayerController` | `BP_LoginPlayerController` (BeginPlay C++ crée LoginWidget, input UI only, curseur visible) |

## Assets associés
- [[Game Mode Blueprints]] — BP_PlayerController, BP_LoginPlayerController, BP_EntityPlayerController

## Voir aussi
- [[Game Mode]] — `AHWGameMode` instancie et cast `AHWPlayerController` dans `HWSaveAllPlayerLocations`
- [[Login Flow]] — cascade d'initialisation déclenchée depuis le login
- [[Initialization Sequence]] — détail des étapes `FHWInitializationPart` (GAS/CUSTOMCHARACTERDATA/PLAYERSTATE)
- [[Persistence Flow]] — `PersistCharacterData`, `RunPersistenceData`, timers 10s / 5min
- [[Zone Travel]] — `TravelToZone`, `TravelToMap`, `Server_TravelToZone`, `Server_TravelToDeadKingdom`
- [[Serialization Format]] — `FHWJsonSerializer` inclus dans `HWPlayerController.cpp`
- [[Game Mode Blueprints]] — BP_PlayerController / BP_LoginPlayerController
- [[../02_Characters_Entities/HWGASPlayerCharacter]] — hub personnage : membre `GetHWGASPlayerCharacter()`, include direct
- [[../03_Progression_Inventory/HWInventoryComponent]] — hub progression/inventaire : `BagInventory`/`EquipmentInventory` + ponts vers `HWProgressionComponent` (SaveCharacterProgression) et `HWQuestComponent` (SaveQuestProgress)
- [[../01_AbilitySystem_Combat/AbilitySystemComponent]] — hub GAS : membre `GetHWAbilitySystemComponent()` + `WeaponMastery` (Save/LoadWeaponMastery)
- [[../05_Interaction_UI/HUD]] — hub UI : `SetupHUD()` crée les 6 widgets + LoginUI, SupplyPods, Containers, InteractableFramework (`Interact()`, `GetOverlappedInteractables`) tous orchestrés par ce PC
- [[../08_Backend_OWS/OWSArchitecture]] — `OWSPlayerControllerComponent` membre, `OWSAPICustomerKey`, `OWS2APIPath`
