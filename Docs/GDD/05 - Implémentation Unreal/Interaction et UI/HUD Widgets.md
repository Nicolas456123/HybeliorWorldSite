---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation des Widget Blueprints du HUD — HybeliorWorld

> Généré par MCP (unreal_python + analyse des .uasset et sources C++) — UE5.4  
> Date : 2026-04-04  
> Outil : Claude Code + MCP Unreal Editor Plugin

## Classes C++ associées
- [[HUD]] — `AHWHUD` qui orchestre les widgets (FloatingDamage, ResourceBars, Cooldowns, nameplates)

---

## Sommaire

1. [Architecture générale du HUD](#1-architecture-générale-du-hud)
2. [BP_HUD — HUD principal](#2-bp_hud--hud-principal)
3. [ResourceBarsHUDWidget — Barres de ressources](#3-resourcebarshudwidget--barres-de-ressources)
4. [AbilityCooldownsWidget — Cooldowns des compétences](#4-abilitycooldownswidget--cooldowns-des-compétences)
5. [PlayerNamePlateWidget — Plaque de nom joueur](#5-playernameplatewidget--plaque-de-nom-joueur)
6. [EntityNameplateWidget — Plaque de nom des ennemis](#6-mobnameplatwidget--plaque-de-nom-des-ennemis)
7. [CombatStateIconEntry — Entrée d'état de combat](#7-combatstateiconentry--entrée-détat-de-combat)
8. [UW_Map / UW_Map1 — Mini-carte](#8-uw_map--uw_map1--mini-carte)
9. [UI_PlayerIcon — Icône du joueur sur la carte](#9-ui_playericon--icône-du-joueur-sur-la-carte)
10. [UW_TargetPoint — Indicateur de point cible](#10-uw_targetpoint--indicateur-de-point-cible)
11. [HWSkillBarComponent + HWSkillBarWidget — Barre de compétences](#11-hwskillbarcomponent--hwskillbarwidget--barre-de-compétences)
12. [Ressources associées](#12-ressources-associées)
13. [Tableau récapitulatif](#13-tableau-récapitulatif)

---

## 1. Architecture générale du HUD

### Organisation des assets

```
/Game/UI/HUD/
├── BP_HUD.uasset                        # HUD principal (AHUD → AHWHUD)
├── ResourceBarsHUDWidget.uasset         # HP / Mana / Stamina
├── AbilityCooldownsWidget.uasset        # Barre de cooldowns GAS
├── PlayerNamePlateWidget.uasset         # Plaque nom + niveau + combat rating
├── UI_PlayerIcon.uasset                 # Icône joueur sur la carte (tourne en temps réel)
├── UW_Map.uasset                        # Conteneur UI de la mini-carte
├── UW_Map1.uasset                       # Rendu de la mini-carte (matériau + overlay)
├── UW_TargetPoint.uasset                # Indicateur de cible à l'écran
├── Icons/
│   └── CombatStateIconEntry.uasset      # Entrée de TileView pour icônes d'état de combat
└── MobNameplate/
    └── EntityNameplateWidget.uasset        # Plaque de nom flottante sur les ennemis
```

### Hiérarchie des classes C++

```
AHUD (Engine)
└── AHWHUD                               # BP_HUD_C (HUD principal, floating damage)

UUserWidget (UMG)
├── UHWEntityNameplateWidget                # EntityNameplateWidget_C
├── UHWSkillBarWidget                    # (WBP_SkillBar à créer, non présent en .uasset HUD)
├── UHWPlayerIconWidget                  # UI_PlayerIcon_C
└── UHWCombatStateIconEntry              # CombatStateIconEntry_C (IUserObjectListEntry)

UWidgetComponent (Engine)
└── UHWEntityNameplateWidgetComponent       # Composant attaché sur les AHWGASCharacter
```

### Flux de mise à jour général

```
AHWGASCharacter / PlayerController
    │
    ├── UHWAbilitySystemComponent (GAS)
    │       ├── GameplayEffects (cooldowns, coûts)
    │       └── AttributeSets (HWAttributeSet, HWCombatAttributeSet)
    │
    ├── UHWSkillBarComponent
    │       ├── OnSlotChanged → UHWSkillBarWidget::HandleSlotChanged
    │       └── OnCooldownStarted → UHWSkillBarWidget::HandleCooldownStarted
    │
    └── UHWEntityNameplateWidgetComponent
            └── RefreshLinkToParent() → UHWEntityNameplateWidget::OwningHWGASCharacter
```

---

## 2. BP_HUD — HUD principal

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/BP_HUD` |
| **Classe générée** | `BP_HUD_C` |
| **Classe parente C++** | `AHWHUD` (`/Script/HybeliorWorld.HWHUD`) |
| **Classe Engine** | `AHUD` |

### Fonctions Blueprint exposées

| Fonction | Catégorie | Description |
|----------|-----------|-------------|
| `ReceiveDrawHUD(SizeX, SizeY)` | Event | Appelé chaque frame par DrawHUD |
| `RenderFloatingDamage` | Damage | Rendu du texte flottant (dégâts/soins) |
| `CleanUpFloatingDamageItems` | Damage | Nettoyage des items expirés |
| `AddFloatingDamageItem(...)` | Damage | Ajouter un item de texte flottant |
| `NormalAbility1CooldownBegin` | Cooldowns | BlueprintNativeEvent |
| `NormalAbility1CooldownEnd` | Cooldowns | BlueprintNativeEvent |

### Propriétés de configuration (Floating Damage)

Le HUD gère 4 catégories de texte flottant avec des propriétés configurables en éditeur :

**Floating Damage (dégâts normaux)**
- `FloatingDamageFont` / `FloatingDamageOutlineFont` : Fonte principale (Audiowide-Regular)
- `FloatingDamageFontColor` / `FloatingDamageOutlineColor`
- `FloatingDamageDropShadowOffsetX/Y`
- `FloatingDamageFadeOutSpeed`
- `FloatingDamageMinimumDisplayTime`
- `FloatingDamageScaleCurve` → `/Game/UI/HUD/FloatingDamageScale`
- `FloatingDamageSpeedCurve` → `/Game/UI/HUD/FloatingDamageSpeed`
- `FloatingDamageTextAlphaCurve` → `/Game/UI/HUD/FloatingDamageAlpha`

**Floating Critical Damage (dégâts critiques)**
- Mêmes propriétés avec préfixe `FloatingCriticalDamage`
- `FloatingCriticalDamageScaleCurve` → `/Game/UI/HUD/FloatingCriticalDamageScale`
- `FloatingCriticalDamageSpeedCurve` → `/Game/UI/HUD/FloatingCriticalDamageSpeed`

**Floating Healing / Floating Critical Healing** : même structure.

### Struct FHWFloatingDamage

Chaque item de dégât flottant est un `FHWFloatingDamage` (BlueprintType) avec :

```cpp
FString  DamageText             // Texte affiché
float    DamageTextLength       // Largeur calculée (GetTextSize)
float    TimeLeft               // Temps restant
float    TextAlpha              // Opacité actuelle
float    Scale                  // Échelle actuelle
FVector  InitialDamagedActorLocation
FVector  InitialDamagedActorProjection
FVector2D DisplayLocation
FVector2D DisplayLocationOffset
AActor*  DamagedActor
bool     IsHealing
bool     IsCritical
bool     MarkedForDeletion
bool     ShowDropShadow
bool     ShowOutline
```

### Logique DrawHUD

Chaque frame : `DrawHUD() → RenderFloatingDamage(DeltaTime) → CleanUpFloatingDamageItems()`

- La position est projetée depuis l'espace monde via `Project(InitialDamagedActorLocation)`
- L'animation de montée/descente utilise la courbe `FloatingDamageSpeedCurve` (si définie) ou une vitesse fixe
- L'alpha suit `FloatingDamageTextAlphaCurve` ou un `FadeOutSpeed` fixe
- Support drop shadow et outline (rendu en 3 passes : outline → shadow → texte)

---

## 3. ResourceBarsHUDWidget — Barres de ressources

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/ResourceBarsHUDWidget` |
| **Classe générée** | `ResourceBarsHUDWidget_C` |
| **Classe parente** | `UUserWidget` (`/Script/UMG.UserWidget`) |
| **Nom d'affichage** | "Resource Bars HUDWidget" |

### Hiérarchie des widgets UMG

```
CanvasPanel (CanvasPanel_325)
└── Overlay
    ├── VerticalBox
    │   ├── HorizontalBox
    │   │   ├── ProgressBar  [HPBar]         ← Barre de vie
    │   │   └── TextBlock    [HealthText]    ← Texte "HP actuel / HP max"
    │   ├── HorizontalBox
    │   │   ├── ProgressBar  [ManaBar]       ← Barre de mana
    │   │   └── TextBlock    [ManaText]      ← Texte mana
    │   ├── ProgressBar      [StaminaBarPart1]  ← Stamina (segment 1)
    │   ├── ProgressBar      [StaminaBarPart2]  ← Stamina (segment 2)
    │   └── ProgressBar      [StaminaBarPart3]  ← Stamina (segment 3)
```

### Variables UMG identifiées

| Variable | Type | Description |
|----------|------|-------------|
| `HPBar` | `UProgressBar*` | Barre de progression santé (valeur 0..1) |
| `ManaBar` | `UProgressBar*` | Barre de progression mana (valeur 0..1) |
| `StaminaBarPart1` | `UProgressBar*` | Segment 1 de stamina |
| `StaminaBarPart2` | `UProgressBar*` | Segment 2 de stamina |
| `StaminaBarPart3` | `UProgressBar*` | Segment 3 de stamina |
| `HealthText` | `UTextBlock*` | Texte "HP courant / HP max" |
| `ManaText` | `UTextBlock*` | Texte mana courant |

### Bindings GAS

La mise à jour des barres est gérée via des bindings de propriétés UMG (`PropertyBindings`) connectés aux attributs GAS :
- `HPBar.Percent` → attribut `HWAttributeSet::Health / MaxHealth`
- `ManaBar.Percent` → attribut `HWAttributeSet::Mana / MaxMana`
- Stamina découpée en 3 segments (affichage visuel stylisé MMO)

### Événements Blueprint

- `EventGraph` : initialisation et bindings au `NativeConstruct` / `Construct`
- Mise à jour via `ETextJustify::Right` pour l'alignement des TextBlocks numériques

---

## 4. AbilityCooldownsWidget — Cooldowns des compétences

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/AbilityCooldownsWidget` |
| **Classe générée** | `AbilityCooldownsWidget_C` |
| **Classe parente** | `UUserWidget` (`/Script/UMG.UserWidget`) |
| **Nom d'affichage** | "Ability Cooldowns Widget" |
| **Tick** | `WontTick` (optimisation) |

### Hiérarchie des widgets UMG

```
RootWidget
└── HorizontalBox
    └── VerticalBox
        └── Border (fond circular, texture Circle01)
            └── Image (icône d'ability)
                ↳ Image_56  / Image_137 / Image_256 (slots d'icônes)
```

### Notes de conception

- Utilise la texture `/Game/UI/HUD/Circle01` comme fond des slots de compétence
- Le widget est **statique visuellement** (`TickPrediction: WontTick`) — les mises à jour se font via events (delegates du `UHWSkillBarComponent`)
- Architecture : ce widget Blueprint est destiné à être remplacé ou couplé avec `UHWSkillBarWidget` (classe C++ native)
- La connexion aux cooldowns GAS passe par `UHWSkillBarComponent::OnCooldownStarted`

### Relation avec UHWSkillBarComponent

```
UHWSkillBarComponent (TickInterval: 50ms / ~20Hz)
    │
    ├── UpdateCooldowns()
    │       └── ASC->GetActiveEffectsTimeRemainingAndDuration(CooldownTagQuery)
    │               → Slot.CooldownRemaining / Slot.CooldownDuration / Slot.bCanActivate
    │
    ├── OnSlotChanged → AbilityCooldownsWidget::RefreshSlot(SlotIndex)
    └── OnCooldownStarted → AbilityCooldownsWidget::OnCooldownStarted(SlotIndex, Duration)
```

---

## 5. PlayerNamePlateWidget — Plaque de nom joueur

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/PlayerNamePlateWidget` |
| **Classe générée** | `PlayerNamePlateWidget_C` |
| **Classe parente** | `UUserWidget` (`/Script/UMG.UserWidget`) |
| **Nom d'affichage** | "Player Name Plate Widget" |
| **Police** | Audiowide-Regular (`/Game/UI/HUD/Audiowide-Regular_Font`) |

### Hiérarchie des widgets UMG

```
CanvasPanel
└── SizeBox (auto-size activé : bAutoSize = true)
    └── VerticalBox
        ├── TextBlock  [txtPlayerName]     ← Nom du joueur (valeur par défaut : "Unknown Player")
        ├── TextBlock  [txtLevel]          ← Niveau du personnage
        └── TextBlock  [txtCombatRating]   ← Combat Rating (cote de combat)
```

### Variables UMG identifiées

| Variable | Type | Description |
|----------|------|-------------|
| `txtPlayerName` | `UTextBlock*` | Nom du joueur (bindé via BP) |
| `txtLevel` | `UTextBlock*` | Niveau du joueur |
| `txtCombatRating` | `UTextBlock*` | Cote de combat (attribut GAS ou calculé) |

### Événements Blueprint

- `EventGraph` : binding au `PlayerState` ou aux données OWS du joueur
- Valeur par défaut du nom : `"Unknown Player"`
- La `SizeBox` s'adapte automatiquement au contenu (`bAutoSize`)

---

## 6. EntityNameplateWidget — Plaque de nom des ennemis

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/EntityNameplate/EntityNameplateWidget` |
| **Classe générée** | `EntityNameplateWidget_C` |
| **Classe parente C++** | `UHWEntityNameplateWidget` (`/Script/HybeliorWorld.HWEntityNameplateWidget`) |
| **Nom d'affichage** | "Mob Nameplate Widget" |
| **Police** | Audiowide-Regular |
| **Tick** | `WillTick` (nécessaire pour mise à jour HP) |

### Hiérarchie des widgets UMG

```
CanvasPanel
└── VerticalBox
    ├── GridPanel
    │   └── TileView  [CombatStateTileView]  ← Icônes d'états de combat (bindé C++)
    ├── ProgressBar   [HealthBar]            ← Barre de vie du mob (bindé C++)
    ├── TextBlock     [HP]                   ← Texte "HP courant / HP max" (bindé C++)
    └── TextBlock     [TxtLevel]             ← Niveau du mob (bindé C++)
```

### Variables C++ (BindWidget)

| Variable | Type | Binding | Description |
|----------|------|---------|-------------|
| `HP` | `UTextBlock*` | `BindWidgetOptional` | Texte santé "1200 / 4500" |
| `HealthBar` | `UProgressBar*` | `BindWidgetOptional` | Progression santé 0..1 |
| `TxtLevel` | `UTextBlock*` | `BindWidgetOptional` | Niveau affiché |
| `CombatStateTileView` | `UTileView*` | `BindWidget` (obligatoire) | Liste des icônes d'état |

### Variable non-UMG

| Variable | Type | Description |
|----------|------|-------------|
| `OwningHWGASCharacter` | `AHWGASCharacter*` | Référence au personnage propriétaire |

### Flux de mise à jour

```
UHWEntityNameplateWidgetComponent::RefreshLinkToParent()
    └── EntityNameplateWidget->OwningHWGASCharacter = Cast<AHWGASCharacter>(GetOwner())

NativeConstruct()
    └── RefreshSource()
            └── CombatStateTileView->SetListItems(OwningHWGASCharacter->CombatStateDisplayItems)
```

> **[2026-04-07]** `UpdateNameplate` BP function has been removed. Nameplate setup is now handled entirely in C++ via `SetupNameplate()` called in `BeginPlay`. The `RefreshSource()` path above remains for runtime updates.

### Composant d'attachement

`UHWEntityNameplateWidgetComponent` (hérite de `UWidgetComponent`) :
- Attaché sur chaque `AHWGASCharacter` (mobs/PNJ)
- `RefreshLinkToParent()` : établit la liaison widget ↔ personnage
- Position en espace monde au-dessus du personnage (comportement standard `UWidgetComponent`)
- **[2026-04-07]** Initial setup now driven by C++ `SetupNameplate()` in `BeginPlay` (no longer BP `UpdateNameplate`)

---

## 7. CombatStateIconEntry — Entrée d'état de combat

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/Icons/CombatStateIconEntry` |
| **Classe générée** | `CombatStateIconEntry_C` |
| **Classe parente C++** | `UHWCombatStateIconEntry` (`/Script/HybeliorWorld.HWCombatStateIconEntry`) |
| **Nom d'affichage** | "Combat State Icon Entry" |
| **Tick** | `WillTick` |
| **Interface** | `IUserObjectListEntry` |

### Hiérarchie des widgets UMG

```
RootWidget
└── Image  [IconImage]    ← Icône d'état de combat (BindWidget C++)
```

### Variable C++ (BindWidget)

| Variable | Type | Binding | Description |
|----------|------|---------|-------------|
| `IconImage` | `UImage*` | `BindWidget` (obligatoire) | Image de l'icône d'état |

### Interface IUserObjectListEntry

```cpp
void NativeOnListItemObjectSet(UObject* ListItemObject)
{
    UHWCombatStateDisplayItemObject* Item = Cast<...>(ListItemObject);
    IconImage->SetBrushFromTexture(Item->Data.ItemIcon.LoadSynchronous());
}
```

Ce widget est utilisé comme **entrée de la TileView** dans le `EntityNameplateWidget`.  
Chaque entrée représente un état actif sur le personnage (buff, debuff, état de combat).

### DataTable associée

`/Game/UI/HUD/Icons/DT_CombatStateIcons` — Table de données des icônes d'états de combat.

---

## 8. UW_Map / UW_Map1 — Mini-carte

### UW_Map — Conteneur de la carte

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/UW_Map` |
| **Classe générée** | `UW_Map_C` |
| **Classe parente** | `UUserWidget` |
| **Nom d'affichage** | "UW Map" |

#### Hiérarchie des widgets UMG

```
CanvasPanel
└── HorizontalBox
    ├── UW_Map1          ← Widget de rendu carte (référence vers /Game/UI/HUD/UW_Map1)
    └── TextBlock        ← Affichage textuel (coordonnées ?)
```

#### Variables Blueprint

| Variable | Type | Description |
|----------|------|-------------|
| `Zoom` | `float` (UInt64) | Niveau de zoom de la carte |

#### Bindings et événements

- `BndEvt__UW_Map_ZoomSlider_OnFloatValueChangedEvent` → `K2Node_VariableSet_Zoom` : le slider de zoom met à jour la variable `Zoom`
- `BndEvt__UW_Map_DimSlider_OnFloatValueChangedEvent` : contrôle de la dimension d'affichage
- `GetText` : conversion `Double → Text` via `Conv_DoubleToText` pour affichage

#### Dépendances

- Référence `/Script/CommonUI` (intégration CommonUI)
- Contient une référence au widget enfant `UW_Map1`

---

### UW_Map1 — Rendu de la mini-carte

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/UW_Map1` |
| **Classe générée** | `UW_Map1_C` |
| **Classe parente** | `UUserWidget` |
| **Nom d'affichage** | "UW Map 1" |
| **Tick** | `WillTick` |

#### Hiérarchie des widgets UMG

```
Overlay  [MapOverlay]
├── Image  [Map]          ← Image de fond de la carte (matériau M_MapUi_Inst)
└── Overlay               ← Overlay pour les icônes de joueurs
    └── UI_PlayerIcon     ← Créé dynamiquement (K2Node_CreateWidget)
```

#### Variables Blueprint

| Variable | Type | Description |
|----------|------|-------------|
| `Map` | `UImage*` (bIsVariable) | Image de fond de la carte |
| `MapOverlay` | `UOverlay*` (bIsVariable) | Conteneur overlay |
| `OwningPlayer` | référence pawn | Pawn local (via `GetOwningPlayerPawn`) |
| `PlayerIcon` | `UI_PlayerIcon` instance | Icône joueur instanciée sur la carte |

#### Fonction Blueprint : AddPlayerIcon

```
FunctionGraph: AddPlayerIcon
    GetOwningPlayerPawn()
    → K2Node_CreateWidget (UI_PlayerIcon_C)
    → AddChildToOverlay(MapOverlay)
    → SetHorizontalAlignment / SetVerticalAlignment
```

#### Matériau de la carte

- Matériau : `/Game/UI/HUD/MapUi/M_MapUi_Inst` (MaterialInstanceConstant)
- Collection de paramètres : `/Game/UI/HUD/MapUi/MapUiParameter`
- Mis à jour via `K2Node_CallMaterialParameterCollectionFunction` (position, zoom, rotation)

#### Mise à jour chaque tick

Le widget tourne chaque frame pour : mettre à jour la position du joueur sur la carte, ajuster les paramètres du matériau (zoom, offset).

---

## 9. UI_PlayerIcon — Icône du joueur sur la carte

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/UI_PlayerIcon` |
| **Classe générée** | `UI_PlayerIcon_C` |
| **Classe parente C++** | `UHWPlayerIconWidget` (`/Script/HybeliorWorld`) |
| **Nom d'affichage** | "UI Player Icon" |
| **Tick** | `WillTick` |

### Hiérarchie des widgets UMG

```
Overlay
└── Image  [IconImage]    ← Flèche de direction (T_UI_Arrow)
```

### Variable C++ (BindWidget)

| Variable | Type | Binding | Description |
|----------|------|---------|-------------|
| `IconImage` | `UImage*` | `BindWidgetOptional` | Icône flèche du joueur |
| `PlayerIconTexture` | `UTexture2D*` | EditAnywhere | Texture de l'icône (T_UI_Arrow par défaut) |

### Comportement tick C++

```cpp
void NativeTick(const FGeometry& MyGeometry, float InDeltaTime)
{
    APawn* OwningPawn = GetOwningPlayerPawn();
    const float Yaw = OwningPawn->GetActorRotation().Yaw;
    SetRenderTransformAngle(Yaw);  // Rotation de l'icône selon l'orientation du joueur
}
```

### Texture par défaut

`/Game/Assets/CharacterEditorModify/Base/Textures/T_UI_Arrow`

### Binding Blueprint

- `PropertyBinding` → `PlayerIcon` (lié à la propriété de l'image dans le Blueprint parent)
- Binding de l'`ImageSize` via `K2Node_MakeStruct_ImageSize_ImplicitCast`

---

## 10. UW_TargetPoint — Indicateur de point cible

| Propriété | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/UW_TargetPoint` |
| **Classe générée** | `UW_TargetPoint_C` |
| **Classe parente** | `UUserWidget` (`/Script/UMG.UserWidget`) |

### Hiérarchie des widgets UMG

```
CanvasPanel
└── Image    ← Indicateur visuel de point de ciblage (curseur ou reticule)
```

### Notes

- Widget minimal : un `CanvasPanel` contenant une `Image`
- Utilisé comme indicateur de point de ciblage en espace écran (projeté depuis la position 3D de la cible)
- Aucune variable BP personnalisée exposée
- Tick prédit : `Disabled` dans l'EventGraph (nodes désactivés)

---

## 11. HWSkillBarComponent + HWSkillBarWidget — Barre de compétences

> **Note** : La barre de compétences n'a pas de WBP associé présent dans `/Game/UI/HUD/` au moment de la documentation. L'architecture C++ est complète et prête pour un Blueprint enfant de `UHWSkillBarWidget`.

### UHWSkillBarComponent (ActorComponent)

| Propriété | Valeur |
|-----------|--------|
| **Source** | `Public/UI/HUD/HWSkillBarComponent.h` |
| **Tick** | 50ms (~20Hz) |
| **Réplication** | `Slots` répliqué (DOREPLIFETIME) |

#### Struct FHWSkillSlot

```cpp
int32                        SlotIndex         // Index 0–9
TSubclassOf<UGameplayAbility> AssignedAbility   // Ability assignée
FGameplayTag                 AbilityTag         // Tag de l'ability
TSoftObjectPtr<UTexture2D>   Icon               // Icône (soft reference)
FText                        DisplayName        // Nom affiché
float                        CooldownDuration   // Durée totale du cooldown (runtime)
float                        CooldownRemaining  // Cooldown restant (runtime, ~20Hz)
bool                         bCanActivate       // Peut activer (pas en cooldown + spec trouvé)
float                        ResourceCost       // Coût en ressource
FGameplayTag                 ResourceType       // "Resource.Mana" / "Resource.Stamina" / etc.
FText                        KeybindText        // "1", "2", "Q", "E"...
```

#### Méthodes principales

| Méthode | Description |
|---------|-------------|
| `AssignAbilityToSlot(SlotIndex, AbilityClass, AbilityTag, IconTexture, Name)` | Assigne une ability à un slot |
| `ClearSlot(SlotIndex)` | Vide un slot |
| `ActivateSlot(SlotIndex)` | Active l'ability du slot via ASC |
| `SwapSlots(SlotA, SlotB)` | Échange deux slots (conserve indices + keybinds) |
| `GetSlotData(SlotIndex)` | Retourne les données d'un slot |
| `UpdateCooldowns()` | Tick 20Hz : interroge l'ASC pour les cooldowns GAS |
| `SerializeSkillBar()` | Sérialise en JSON (AbilityTag, KeybindText, ResourceCost, ResourceType) |
| `DeserializeSkillBar(JSON)` | Désérialise depuis JSON |

#### Query GAS des cooldowns

```cpp
FGameplayEffectQuery Query = FGameplayEffectQuery::MakeQuery_MatchAnyOwningTags(*CooldownTags);
TArray<TPair<float, float>> DurationAndRemaining = 
    ASC->GetActiveEffectsTimeRemainingAndDuration(Query);
```

#### Delegates

| Delegate | Signature | Déclencheur |
|----------|-----------|-------------|
| `OnSlotChanged` | `(int32 SlotIndex, const FHWSkillSlot& NewSlotData)` | Assign / Clear / Swap / Deserialize |
| `OnCooldownStarted` | `(int32 SlotIndex, float Duration)` | Transition PreviousRemaining ≤ 0 → TimeRemaining > 0 |

---

### UHWSkillBarWidget (UserWidget C++)

| Propriété | Valeur |
|-----------|--------|
| **Source** | `Public/UI/HUD/HWSkillBarWidget.h` |
| **Tick** | `NativeTick` actif (refresh cooldowns chaque frame) |

#### Méthodes Blueprint

| Méthode | Type | Description |
|---------|------|-------------|
| `InitializeSkillBar(SkillBarComponent)` | BlueprintCallable | Initialise + bind les delegates |
| `RefreshAllSlots()` | BlueprintCallable | Refresh visuel de tous les slots |
| `RefreshSlot(SlotIndex)` | BlueprintCallable | Refresh visuel d'un slot (override en BP) |
| `OnCooldownStarted(SlotIndex, Duration)` | BlueprintImplementableEvent | Animation de cooldown (à implémenter en BP) |
| `OnSlotChanged(SlotIndex)` | BlueprintImplementableEvent | Changement de slot (à implémenter en BP) |

#### Variable protégée

```cpp
UPROPERTY(BlueprintReadOnly, Category = "Skill Bar")
TObjectPtr<UHWSkillBarComponent> SkillBarComponent;
```

#### Cycle de vie

```
NativeConstruct → InitializeSkillBar(Component) → bind delegates + RefreshAllSlots
NativeTick → RefreshAllSlots() (chaque frame si SkillBarComponent valide)
NativeDestruct → RemoveDynamic des deux delegates
```

---

## 12. Ressources associées

### Polices

| Asset | Chemin |
|-------|--------|
| Audiowide-Regular | `/Game/UI/HUD/Audiowide-Regular_Font` |
| BlackOpsOne-Regular | `/Game/UI/HUD/BlackOpsOne-Regular_Font` |
| BlackOpsOne-Large | `/Game/UI/HUD/BlackOpsOne-Large_Font` |

### Textures

| Asset | Chemin | Usage |
|-------|--------|-------|
| Circle01 | `/Game/UI/HUD/Circle01` | Fond des slots de compétence |
| T_UI_Arrow | `/Game/Assets/.../T_UI_Arrow` | Icône joueur sur la carte |
| BurningIcon01 | `/Game/UI/HUD/BurningIcon01` | Icône état "Brûlure" |
| logout icon | `/Game/UI/HUD/logout_FILL0_wght400...` | Bouton de déconnexion |

### Courbes d'animation (FloatingDamage)

| Asset | Chemin | Usage |
|-------|--------|-------|
| FloatingDamageScale | `/Game/UI/HUD/FloatingDamageScale` | Échelle du texte de dégâts |
| FloatingDamageSpeed | `/Game/UI/HUD/FloatingDamageSpeed` | Vitesse de montée |
| FloatingDamageAlpha | `/Game/UI/HUD/FloatingDamageAlpha` | Opacité |
| FloatingCriticalDamageScale | `/Game/UI/HUD/FloatingCriticalDamageScale` | Critique |
| FloatingCriticalDamageSpeed | `/Game/UI/HUD/FloatingCriticalDamageSpeed` | Critique |

### Matériaux

| Asset | Chemin | Usage |
|-------|--------|-------|
| M_MapUi_Inst | `/Game/UI/HUD/MapUi/M_MapUi_Inst` | Rendu de la mini-carte |
| M_BurningIcon01 | `/Game/UI/HUD/M_BurningIcon01` | Icône état brûlure (matériau) |
| MapUiParameter | `/Game/UI/HUD/MapUi/MapUiParameter` | Collection de paramètres (position, zoom) |

### DataTables

| Asset | Chemin | Usage |
|-------|--------|-------|
| DT_CombatStateIcons | `/Game/UI/HUD/Icons/DT_CombatStateIcons` | Icônes des états de combat |

---

## 13. Tableau récapitulatif

| Widget | Classe C++ parente | Tick | Variables clés | Liaison GAS |
|--------|--------------------|------|----------------|-------------|
| `BP_HUD` | `AHWHUD` | `DrawHUD()` chaque frame | FloatingDamageItems[] | `AddFloatingDamageItem` |
| `ResourceBarsHUDWidget` | `UUserWidget` | Non (bindings UMG) | HPBar, ManaBar, StaminaBarPart1/2/3, HealthText, ManaText | PropertyBindings → AttributeSet |
| `AbilityCooldownsWidget` | `UUserWidget` | Non (WontTick) | Image_56/137/256 | Via `UHWSkillBarComponent::OnCooldownStarted` |
| `PlayerNamePlateWidget` | `UUserWidget` | Non | txtPlayerName, txtLevel, txtCombatRating | OWS PlayerState |
| `EntityNameplateWidget` | `UHWEntityNameplateWidget` | Oui (WillTick) | HP, HealthBar, TxtLevel, CombatStateTileView, OwningHWGASCharacter | AHWGASCharacter::CombatStateDisplayItems |
| `CombatStateIconEntry` | `UHWCombatStateIconEntry` | Oui (WillTick) | IconImage | NativeOnListItemObjectSet → DT_CombatStateIcons |
| `UW_Map` | `UUserWidget` | Non | Zoom | Slider bindings |
| `UW_Map1` | `UUserWidget` | Oui (WillTick) | Map, MapOverlay, PlayerIcon | M_MapUi_Inst (paramètres position joueur) |
| `UI_PlayerIcon` | `UHWPlayerIconWidget` | Oui (NativeTick) | IconImage, PlayerIconTexture | GetOwningPlayerPawn().Rotation.Yaw |
| `UW_TargetPoint` | `UUserWidget` | Non (Disabled) | Image | Projection 3D → 2D |

---

*Fin de document — Généré par analyse MCP des assets UE5.4 et des sources C++.*
