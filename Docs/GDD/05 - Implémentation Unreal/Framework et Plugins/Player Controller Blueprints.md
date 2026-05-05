---
tags: [implementation, ue5, blueprint, controller]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Player Controller Blueprints

> Inspection MCP des Blueprints de PlayerController : `BP_PlayerController`, `BP_LoginPlayerController`, `BP_EntityPlayerController`.
> Source : `unreal_python` AssetRegistry + analyse binaire .uasset — 2026-04-04.
> Issu de la scission V3.3 de `FrameworkBlueprints.md`.

## Classes C++ associées
- [[Player Controllers]] — `HWPlayerController` et `AHWLoginPlayerController` pilotant les BP de controller

---

## 1. BP_PlayerController

**Chemin asset :** `/Game/Game/BP_PlayerController`
**Classe générée :** `BP_PlayerController_C`
**Classe parente native :** `HWPlayerController` (`/Script/HybeliorWorld.HWPlayerController`)
**Réplication :** 1 propriété répliquée

### 1.1 Variables BP

| Nom | Type estimé | Rôle |
|---|---|---|
| `BaseUIWidget` | Widget Reference | Widget HUD de base, racine de l'UI |
| `AbilityCooldownsWidget` | Widget Reference | Affichage des cooldowns de compétences |
| `MenuTabsWidget` | Widget Reference | Onglets de menu principal |
| `PlayerNamePlateWidget` | Widget Reference | Plaque nom du joueur |
| `ResourceBarsHUDWidget` | Widget Reference | Barres de ressources (HP, Endurance…) |
| `CommonInventoryListWidget` | Widget Reference | Liste d'inventaire commun |
| `InventoryListWidget` | Widget Reference | Inventaire principal |
| `BagInventory` | Référence composant/objet | Inventaire type sac |
| `Bonnus` | Texte/Variable | Valeur de bonus affiché |
| `BonnusTitre` | Texte/Variable | Titre du bonus affiché |
| `bShowMouseCursor` | Bool | Contrôle la visibilité du curseur souris |

### 1.2 Assets UI référencés

| Chemin asset | Widget |
|---|---|
| `/Game/UI/HUD/AbilityCooldownsWidget` | Cooldowns de compétences |
| `/Game/UI/HUD/PlayerNamePlateWidget` | Plaque de nom |
| `/Game/UI/HUD/ResourceBarsHUDWidget` | Barres de ressources |
| `/Game/UI/Inventory/BP_CommonInventoryListWidget` | Liste inventaire commune |
| `/Game/UI/Inventory/BP_InventoryEquipmentWidget` | Inventaire équipement |
| `/Game/UI/Inventory/InventoryListWidget` | Liste d'inventaire |

### 1.3 Input Actions

| Action | Chemin |
|---|---|
| `IA_Interact` | `/Game/Input/Actions/IA_Interact` |

> Le binding utilise le système **Enhanced Input** (`BlueprintEnhancedInputActionBinding`). Un seul IA est bindé directement dans le BP Controller — les autres inputs sont gérés par `HWPlayerController` en C++ ou via un `InputMappingContext`.

### 1.4 Graphs / Événements

| Nom | Nature |
|---|---|
| `EventGraph` | Graph principal |
| `SetupHUD` | Fonction — crée et attache les widgets HUD |
| `OnRep_UpdateHUDStatLIVE` | RepNotify — met à jour les stats du HUD en temps réel |
| `UpdateHUDStatLIVE` | Fonction — logique de mise à jour HUD |

### 1.5 Détail de la logique HUD

Le graph contient :
- Un cast vers `BP_HUD` (`K2Node_DynamicCast_AsBP_HUD`) pour accéder au HUD
- Un `K2Node_CreateWidget` pour instancier les widgets
- Des nodes de format de texte (`K2Node_FormatText`) affichant des données comme `Endurance`, `EnduranceMax`, `EnduranceRegen`, `EnduranceRegenValue`
- Un pattern RepNotify (`OnRep_UpdateHUDStatLIVE`) qui synchronise les stats de HUD lors de la réplication
- Un binding de `IA_Interact` qui récupère la valeur de l'action (`InputActionValue`) et la convertit en bool

### 1.6 Notes architecturales

- Ce BP Controller est centré sur la **gestion de l'UI** et le binding du seul input `IA_Interact` au niveau Blueprint.
- Toute la logique de caméra, mouvement et autres inputs est gérée dans la classe C++ parente `HWPlayerController`.
- La propriété répliquée (NumReplicatedProperties = 1) est probablement liée à l'état HUD ou à une variable de statut de session.
- **Note (2026-04-07)** : `LoadCharacterCustomization` dans `HWPlayerController.cpp` n'utilise plus `UHWCharacterCustomComponent` (retiré, TODO en place).

---

## 2. BP_LoginPlayerController

**Chemin asset :** `/Game/Game/BP_LoginPlayerController`
**Classe parente native :** `AHWLoginPlayerController` (`/Script/HybeliorWorld.HWLoginPlayerController`)

### 2.1 Logique C++ (BeginPlay override)

`AHWLoginPlayerController::BeginPlay()` :
1. Crée le widget login via `LoginWidgetClass` (`TSubclassOf<UHWLoginWidget>`) → stocke dans `LoginWidget`
2. `SetInputMode(FInputModeUIOnly)` — input restreint à l'UI
3. `bShowMouseCursor = true`

Toute la logique de login (auth OWS, sélection personnage, travel) est pilotée par ce controller et ses délégates OWS (`NotifyGetAllCharacters`, `NotifyCreateCharacter`, etc.). Le `BP_LoginGameMode` associé à ce controller a un EventGraph vide.

---

## 3. BP_EntityPlayerController

**Chemin asset :** `/Game/Game/BP_EntityPlayerController`
**Classe générée :** `BP_EntityPlayerController_C`
**Classe parente native :** `HWPlayerController` (`/Script/HybeliorWorld.HWPlayerController`)
**Réplication :** 0 propriétés répliquées

### 3.1 Variables BP

| Nom | Type | Rôle |
|---|---|---|
| `BagInventory` | Référence composant | Inventaire sac du mob/entité contrôlée |
| `EquipmentInventory` | Référence composant | Inventaire équipement du mob |

### 3.2 Composants natifs

| Composant | Classe | Rôle |
|---|---|---|
| `OWSPlayerControllerComponent` | `OWSPlayerControllerComponent` | Composant OWS pour la gestion session serveur |
| `HWInventoryComponent` | `HWInventoryComponent` | Gestion inventaire côté C++ |

### 3.3 Notes architecturales

- Ce BP est un **controller minimaliste** pour les entités non-joueurs qui nécessitent un `PlayerController` (bots, entités OWS).
- Les inventaires `BagInventory` et `EquipmentInventory` permettent aux mobs de posséder des objets lootables.
- Partage la même base C++ que `BP_PlayerController`, ce qui facilite la gestion unifiée côté OWS.

---

## Hiérarchie de classes

```
HWPlayerController (C++)
├── BP_PlayerController (joueur humain)
│     ├── UI: BP_HUD, AbilityCooldownsWidget, ResourceBarsHUDWidget, etc.
│     └── Input: IA_Interact (Enhanced Input)
└── BP_EntityPlayerController (entités serveur/IA)
      ├── OWSPlayerControllerComponent
      └── HWInventoryComponent

HWLoginPlayerController (C++)
└── BP_LoginPlayerController
      └── BeginPlay C++ : LoginWidget + InputModeUIOnly + ShowCursor
```

## Liens

- [[Game Mode Blueprints]]
- [[World Blueprints]]
- [[Tools Blueprints]]
- [[Player Controllers]]
