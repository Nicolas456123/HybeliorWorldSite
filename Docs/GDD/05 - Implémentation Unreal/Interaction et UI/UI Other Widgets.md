---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation MCP — Widget Blueprints UI (HybeliorWorld UE5.4)

> Généré via MCP Python (unreal_python) le 2026-04-04  
> Chemin de référence : `/Game/UI/`  
> Méthode : introspection des CDO (Class Default Objects) via `generated_class()` + `get_editor_property()`

## Classes C++ associées
- [[HUD]] — `AHWHUD` hôte des widgets HUD (ResourceBars, cooldowns, nameplates, map)
- [[Inventory UI]] — widgets d'inventaire (`HWEquipmentWidget`, `HWCommonInventoryListWidget`)

---

## Table des matières

1. [Widgets de Connexion (Login)](#1-widgets-de-connexion-login)
   - [UI_LoginWidget](#11-ui_loginwidget)
   - [UI_RegisterWidget](#12-ui_registerwidget)
   - [UI_CreateCharacterWidget](#13-ui_createcharacterwidget)
   - [UI_CharacterDetailWidget](#14-ui_characterdetailwidget)
   - [UI_FullScreenLoadingDialog](#15-ui_fullscreenloadingdialog)
   - [UI_MessageConfirmWidget](#16-ui_messageconfirmwidget)
2. [Widgets d'Inventaire](#2-widgets-dinventaire)
   - [BP_InventoryEquipmentWidget](#21-bp_inventoryequipmentwidget)
   - [BP_CommonInventoryListWidget](#22-bp_commoninventorylistwidget)
   - [InventoryListWidget](#23-inventorylistwidget)
   - [InventoryButtonWidget](#24-inventorybuttonwidget)
3. [Widgets CommonUI / Navigation](#3-widgets-commonui--navigation)
   - [BaseUI](#31-baseui)
   - [InventoryTab](#32-inventorytab)
   - [MenuTabs](#33-menutabs)
4. [Widgets HUD](#4-widgets-hud)
   - [UW_Map / UW_Map1](#41-uw_map--uw_map1)
   - [AbilityCooldownsWidget](#42-abilitycooldownswidget)
   - [ResourceBarsHUDWidget](#43-resourcebarshudwidget)
   - [EntityNameplateWidget](#44-mobnameplatewidget)
   - [PlayerNamePlateWidget](#45-playernameplatewidget)
   - [CombatStateIconEntry](#46-combatstateiconentry)
   - [UW_TargetPoint](#47-uw_targetpoint)
   - [UI_PlayerIcon](#48-ui_playericon)
5. [Synthese et relations entre widgets](#5-synthese-et-relations-entre-widgets)

---

## 1. Widgets de Connexion (Login)

Chemin : `/Game/UI/Login/`

---

### 1.1 UI_LoginWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Login/UI_LoginWidget` |
| **Classe generee** | `HWLoginWidget` (C++ natif) |
| **Classe parente** | `UUserWidget` |

#### Fonctions / Evenements specifiques

| Fonction | Type | Description |
|----------|------|-------------|
| `validate_and_login` | Methode BP/C++ | Valide les champs (username, password) et declenche la requete d'authentification OWS |
| `on_login_success` | Evenement | Appele quand le serveur OWS retourne un token valide ; navigue vers la selection de personnage |
| `on_login_error` | Evenement | Appele en cas d'echec d'authentification ; affiche un message d'erreur |

#### Variables / Proprietes CDO

| Variable | Type | Valeur par defaut | Description |
|----------|------|-------------------|-------------|
| `is_focusable` | bool | `False` | Le widget ne capture pas le focus clavier par defaut |
| `visibility` | SlateVisibility | `SELF_HIT_TEST_INVISIBLE` | Invisible aux tests de hit |
| `color_and_opacity` | LinearColor | `{1,1,1,1}` | Opacite complete blanche |

#### Notes d'integration

- Classe C++ : `HWLoginWidget` expose `ValidateAndLogin()`, `OnLoginSuccess()` et `OnLoginError()` en tant que fonctions Blueprint-callable ou overridables.
- Le flux de connexion passe par le plugin OWS (OpenWorldServer) : l'appel reseau est gere en C++ ; le widget reagit aux callbacks.
- Pas de variables BP personnalisees detectees au niveau du CDO : les champs de saisie (TextBox username/password) sont des liaisons de widgets UMG internes.

> **[2026-04-07] Mises a jour :**
> - **Creation du widget** : desormais cree en C++ par `AHWLoginPlayerController::BeginPlay` (au lieu du BP `SetupDialogs`).
> - **NativeConstruct** : ne bind plus les boutons — le BP gere les boutons via des evenements `OnClicked`.
> - **BindWidget renommes** : `LoginButton`→`btnLogin`, `ExitButton`→`btnExit`, `CreateAccountButton`→`btnCreateAccount`. Tous passes en `BindWidgetOptional`.
> - **ValidateAndLogin** : lit la config OWS depuis `GGameIni` au lieu de `OWSGameInstance`.

---

### 1.2 UI_RegisterWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Login/UI_RegisterWidget` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Pas de classe C++ native detectable — le widget est entierement Blueprint.
- Aucun evenement ou variable personnalise expose au niveau CDO.
- Role presume : formulaire de creation de compte (email, pseudo, mot de passe) avec bouton de soumission vers OWS.

> **[2026-04-07]** Ce widget a des erreurs de compilation pre-existantes : les pins de la fonction `Register` sont perdus. Necessite une correction manuelle dans le BP.

#### Variables / Proprietes CDO

Proprietes standard UUserWidget uniquement (visibility, opacity, etc.). Aucune variable BP specifique detectee.

---

### 1.3 UI_CreateCharacterWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Login/UI_CreateCharacterWidget` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Entierement Blueprint sans surcharge C++.
- Role presume : interface de creation de personnage (nom, classe, apparence) apres inscription ou connexion.
- Liens probables avec les DataTables `DT_CharacterAppearancePreset` et `DT_CharacterDataAsset`.

#### Variables / Proprietes CDO

Proprietes standard uniquement. Voir `DT_CharacterAppearancePreset_export.json` pour les presets d'apparence associes.

---

### 1.4 UI_CharacterDetailWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Login/UI_CharacterDetailWidget` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Entierement Blueprint.
- Role presume : affichage des details d'un personnage existant sur l'ecran de selection (stats, niveau, classe, derniere zone).
- Affiche probablement les donnees retournees par OWS `GetCharacterByName` ou `GetUserSession`.

---

### 1.5 UI_FullScreenLoadingDialog

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Login/UI_FullScreenLoadingDialog` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Widget de chargement plein ecran, utilise pendant les transitions (login -> selection de personnage, changement de zone, etc.).
- Affiche probablement une barre de progression ou une animation de chargement.
- Declenche et retire depuis le HUD/GameMode en fonction des etats de chargement asynchrone.

---

### 1.6 UI_MessageConfirmWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Login/UI_MessageConfirmWidget` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Boite de dialogue modale generique (confirmation / annulation).
- Utilisee pour les confirmations critiques : suppression de personnage, deconnexion, etc.
- Probablement parametre dynamiquement via des fonctions BP qui setent le texte et les callbacks des boutons.

---

## 2. Widgets d'Inventaire

Chemin : `/Game/UI/Inventory/`

---

### 2.1 BP_InventoryEquipmentWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Inventory/BP_InventoryEquipmentWidget` |
| **Classe generee** | `HWEquipmentWidget` (C++ natif) |
| **Classe parente** | `UUserWidget` (etendu CommonUI) |

#### Fonctions / Evenements specifiques

| Fonction | Type | Description |
|----------|------|-------------|
| `populate_slots` | Methode | Peuple les slots d'equipement a partir du composant inventaire associe |
| `set_inventory_component` | Setter | Lie le widget a un `UHWInventoryComponent` |
| `register_scroll_recipient_external` | CommonUI | Enregistre le widget pour la gestion du scroll via le systeme CommonUI |
| `unregister_scroll_recipient_external` | CommonUI | Desenregistre du scroll CommonUI |

#### Variables / Proprietes CDO

| Variable | Type | Valeur par defaut | Description |
|----------|------|-------------------|-------------|
| `inventory_component` | Object ref | `None` | Reference au composant inventaire du joueur ; injecte a la creation |
| `display_in_action_bar` | bool | `False` | Controle CommonUI pour afficher l'action dans la barre d'actions |
| `consume_pointer_input` | bool | `False` | Si True, consomme les evenements souris et evite la propagation |

#### Notes d'integration

- `HWEquipmentWidget` est une classe C++ native qui expose `PopulateSlots()` et `SetInventoryComponent()`.
- Les slots d'equipement (tete, torse, mains, pieds, arme principale, secondaire) sont probablement des sous-widgets lies dynamiquement.
- La reference `inventory_component` doit etre injectee avant l'affichage (depuis le HUD ou le PlayerController).

---

### 2.2 BP_CommonInventoryListWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Inventory/BP_CommonInventoryListWidget` |
| **Classe generee** | `HWCommonInventoryListWidget` (C++ natif) |
| **Classe parente** | `UUserWidget` (etendu CommonUI) |

#### Fonctions / Evenements specifiques

| Fonction | Type | Description |
|----------|------|-------------|
| `populate_grid_panel` | Methode | Remplit la grille d'items a partir du composant inventaire et du filtre actif |
| `set_filter_type` | Setter | Applique un filtre par type d'item (`ItemType` enum) |
| `set_inventory_component` | Setter | Lie le widget a un `UHWInventoryComponent` |
| `register_scroll_recipient_external` | CommonUI | Gestion du scroll CommonUI |

#### Variables / Proprietes CDO

| Variable | Type | Valeur par defaut | Description |
|----------|------|-------------------|-------------|
| `inventory_component` | Object ref | `None` | Composant inventaire source des donnees |
| `current_filter_type` | ItemType enum | `NONE` (0) | Filtre actif : NONE = tous les items |
| `display_in_action_bar` | bool | `False` | Integration CommonUI barre d'actions |
| `consume_pointer_input` | bool | `False` | Propagation input souris |

#### Notes d'integration

- Le filtre `ItemType` correspond tres probablement a l'enum defini dans `DT_ItemData` ou `DT_InventoryItemLibrary`.
- `populate_grid_panel` est appele a l'ouverture de l'inventaire et a chaque changement de filtre.
- Systeme de grille scrollable via CommonUI plutot qu'un ListView natif UMG.

---

### 2.3 InventoryListWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Inventory/InventoryListWidget` |
| **Classe generee** | `HWInventoryListWidget` (C++ natif) |
| **Classe parente** | `UUserWidget` |

#### Fonctions / Evenements specifiques

| Variable/Fonction | Type | Description |
|----------|------|-------------|
| `inventory_component` | Propriete | Reference a `UHWInventoryComponent` — detectee dans les attributs |

#### Notes d'integration

- Version anterieure ou alternative a `BP_CommonInventoryListWidget`, sans integration CommonUI scroll.
- Classe C++ `HWInventoryListWidget` avec reference directe au composant inventaire.
- Probablement la liste de base utilisee dans une version precedente ou comme sous-composant.

---

### 2.4 InventoryButtonWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/Inventory/InventoryButtonWidget` |
| **Classe generee** | `CommonButtonBase` (CommonUI) |
| **Classe parente** | `UCommonButtonBase` |

#### Fonctions / Evenements specifiques (CommonButtonBase)

| Fonction | Type | Description |
|----------|------|-------------|
| `bp_on_clicked` | Evenement BP | Override du clic — logique de selection d'item |
| `bp_on_hovered` | Evenement BP | Affichage tooltip de l'item au survol |
| `bp_on_selected` | Evenement BP | Etat selectionne (mode comparaison ou action) |
| `bp_on_double_clicked` | Evenement BP | Double-clic : equiper directement ou utiliser l'item |
| `on_button_base_clicked` | Delegate multicast | Signal externe de clic |
| `on_selected_changed_base` | Delegate multicast | Signal de changement d'etat selectionne |
| `disable_button_with_reason` | Methode | Desactive le bouton avec message (item non utilisable, conditions non remplies) |

#### Variables / Proprietes CDO

| Variable | Type | Valeur par defaut | Description |
|----------|------|-------------------|-------------|
| `style` | ButtonStyle | `None` | Style visuel CommonUI (defini dans DataTable de styles) |
| `selectable` | bool | `False` | Le bouton peut etre maintenu selectionne |
| `toggleable` | bool | `False` | Mode toggle (on/off) |
| `requires_hold` | bool | `False` | Necessite appui long pour declencher |
| `trigger_clicked_after_selection` | bool | `False` | Declenche clicked apres la selection |
| `interactable_when_selected` | bool | `False` | Reste interactif en etat selectionne |
| `display_in_action_bar` | bool | `False` | Affiche le raccourci dans la barre CommonUI |
| `locked` | bool | `False` | Etat verrouille (item inaccessible) |
| `min_width` / `min_height` | int | `0` / `0` | Dimensions minimales du bouton |
| `click_method` | ButtonClickMethod | `DOWN_AND_UP` | Mode de declenchement du clic |
| `press_method` | ButtonPressMethod | `DOWN_AND_UP` | Mode d'appui |
| `should_use_fallback_default_input_action` | bool | `True` | Fallback input action CommonUI |
| `simulate_hover_on_touch_input` | bool | `True` | Emulation hover sur ecran tactile |
| `triggering_enhanced_input_action` | Object | `None` | Action Enhanced Input liee |
| `triggering_input_action` | DataTableRowHandle | `{None, ""}` | Ligne DataTable input action |
| `hold_data` | Object | `None` | Donnees pour le mode appui long |

#### Notes d'integration

- `InventoryButtonWidget` herite de `CommonButtonBase` — integration complete dans le systeme CommonUI de gestion d'input.
- Represente un slot d'item cliquable dans la grille d'inventaire.
- Le `style` None par defaut signifie que le style est applique a l'instance ou via un DataTable de styles CommonUI.
- Les sons (`hovered_slate_sound_override`, `pressed_slate_sound_override`, etc.) sont tous non configures par defaut — attendent la configuration via un style.

---

## 3. Widgets CommonUI / Navigation

Chemin : `/Game/UI/CommonUI/`

---

### 3.1 BaseUI

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/CommonUI/BaseUI` |
| **Classe generee** | `HWCommonActivatableWidget` (C++ natif) |
| **Classe parente** | `UCommonActivatableWidget` |

#### Fonctions / Evenements specifiques

| Fonction | Type | Description |
|----------|------|-------------|
| `activate_widget` | Methode | Active le widget dans le stack CommonUI (declenche animation d'entree) |
| `deactivate_widget` | Methode | Desactive et retire du stack (animation de sortie) |
| `bp_on_activated` | Evenement BP overridable | Logique a executer a l'activation |
| `bp_on_deactivated` | Evenement BP overridable | Logique a executer a la desactivation |
| `bp_on_handle_back_action` | Evenement BP overridable | Gestion du bouton "retour" (B/Escape) |
| `bp_get_desired_focus_target` | Fonction BP overridable | Retourne le widget qui doit recevoir le focus a l'activation |
| `bp_get_desired_input_config` | Fonction BP overridable | Retourne la configuration d'input (mode GameAndUI, etc.) |
| `request_refresh_focus` | Methode | Force le rafraichissement du focus |
| `set_bind_visibilities` | Methode | Lie la visibilite du widget a son etat d'activation |

#### Variables / Proprietes CDO

| Variable | Type | Valeur par defaut | Description |
|----------|------|-------------------|-------------|
| `is_active` | bool | `False` | Etat d'activation courant |
| `override_action_domain` | bool | `False` | Si True, utilise `action_domain_override` au lieu du domaine parent |
| `action_domain_override` | Object | `None` | Domaine d'action CommonUI personnalise |
| `menu_stack` | Object | `None` | Reference au stack de menus parent |
| `prompt_stack` | Object | `None` | Reference au stack de prompts |
| `bind_visibility_to_activation` | bool (implicite) | controle via `set_bind_visibilities` | Synchronise visibilite et etat actif |
| `bp_on_widget_activated` | Delegate | Unbound | Notification d'activation pour les abonnes externes |
| `bp_on_widget_deactivated` | Delegate | Unbound | Notification de desactivation |
| `display_in_action_bar` | bool | `False` | Integration barre d'actions CommonUI |
| `consume_pointer_input` | bool | `False` | Consommation input souris |

#### Notes d'integration

- `BaseUI` est le widget racine de tout menu principal — tous les widgets de menus complexes (inventaire, quetes, carte) devraient en heriter ou en etre des enfants dans le stack.
- Le systeme `CommonActivatableWidget` gere automatiquement l'historique de navigation (back stack).
- `HWCommonActivatableWidget` est la classe C++ qui personalise ce comportement pour HybeliorWorld.

---

### 3.2 InventoryTab

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/CommonUI/InventoryTab` |
| **Classe generee** | `CommonTabListWidgetBase` (CommonUI) |
| **Classe parente** | `UCommonTabListWidgetBase` |

#### Fonctions / Evenements specifiques

| Fonction | Type | Description |
|----------|------|-------------|
| `register_tab` | Methode | Enregistre un onglet avec son ID et la classe de bouton associee |
| `remove_tab` | Methode | Retire un onglet de la liste |
| `remove_all_tabs` | Methode | Vide tous les onglets |
| `select_tab_by_id` | Methode | Selectionne l'onglet identifie par son Name |
| `get_active_tab` | Getter | Retourne l'onglet actif |
| `get_selected_tab_id` | Getter | Retourne le Name de l'onglet selectionne |
| `get_tab_count` | Getter | Nombre total d'onglets |
| `get_tab_id_at_index` | Getter | ID de l'onglet a l'index donne |
| `get_tab_button_base_by_id` | Getter | Retourne le bouton CommonButton de l'onglet |
| `disable_tab_with_reason` | Methode | Desactive un onglet avec raison affichee |
| `set_tab_enabled` | Methode | Active/desactive un onglet |
| `set_tab_visibility` | Methode | Affiche/masque un onglet |
| `handle_tab_creation` | Overridable | Hook de creation d'onglet |
| `handle_tab_removal` | Overridable | Hook de suppression d'onglet |

#### Delegates

| Delegate | Description |
|----------|-------------|
| `on_tab_selected` | Declenche quand un onglet est selectionne (passe l'ID) |
| `on_tab_list_rebuilt` | La liste d'onglets a ete reconstruite |
| `on_tab_button_creation` | Un bouton d'onglet vient d'etre cree |
| `on_tab_button_removal` | Un bouton d'onglet vient d'etre retire |

#### Variables / Proprietes CDO

| Variable | Type | Valeur par defaut | Description |
|----------|------|-------------------|-------------|
| `next_tab_input_action_data` | DataTableRowHandle | `NavigationInputActionDataTable` | Raccourci pour onglet suivant (R1/Tab) |
| `previous_tab_input_action_data` | DataTableRowHandle | `NavigationInputActionDataTable` | Raccourci pour onglet precedent (L1/Shift+Tab) |
| `next_tab_enhanced_input_action` | Object | `None` | Version Enhanced Input |
| `previous_tab_enhanced_input_action` | Object | `None` | Version Enhanced Input |

#### Notes d'integration

- Gere la navigation par onglets de l'inventaire : Tout / Armes / Armures / Consommables / Ressources / Quete.
- Les raccourcis `next_tab` et `previous_tab` sont lus depuis le DataTable `/Game/UI/CommonUI/NavigationInputActionDataTable`.
- Chaque onglet est un `CommonButtonBase` (cf. `InventoryButtonWidget`).

---

### 3.3 MenuTabs

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/CommonUI/MenuTabs` |
| **Classe generee** | `CommonUserWidget` (CommonUI) |
| **Classe parente** | `UCommonUserWidget` |

#### Observations

- Widget de navigation des menus principaux (Inventaire, Equipement, Quetes, Carte, Parametres).
- `CommonUserWidget` est la base legere de CommonUI sans stack d'activation.
- Aucune variable ou evenement C++ specifique detecte : la logique est entierement en Blueprint.
- Utilise probablement `InventoryTab` (CommonTabListWidgetBase) comme sous-composant pour la liste d'onglets.
- Integration CommonUI : `consume_pointer_input`, `display_in_action_bar`, `register_scroll_recipient_external` disponibles.

---

## 4. Widgets HUD

Chemin : `/Game/UI/HUD/`

---

### 4.1 UW_Map / UW_Map1

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/UW_Map` et `/Game/UI/HUD/UW_Map1` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Deux versions de la carte du monde existent : `UW_Map` (version principale) et `UW_Map1` (variante ou iteration).
- Entierement Blueprint, aucune classe C++ native.
- Aucune variable CDO specifique detectee — les donnees de carte (zones, POI, position joueur) sont probablement bindees dynamiquement depuis le BP.
- Role : minimap ou carte plein ecran affichant la zone actuelle, les points d'interet, la position du joueur.
- Probablement affichee/masquee via `BaseUI` (CommonActivatableWidget stack).

---

### 4.2 AbilityCooldownsWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/AbilityCooldownsWidget` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Affiche les icones de competences avec leur cooldown restant.
- Entierement Blueprint — les donnees de cooldown viennent probablement du GAS (GameplayAbilitySystem) via des attributs ou des GameplayTags.
- Aucune variable CDO specifique : les bindings d'abilitees sont probablement configures dans le BP EventGraph via `GetAbilitySystemComponent()`.
- Lien avec le systeme GAS : consulter la migration C++ (`session_bp_migration.md`) pour les classes GAS associees.

---

### 4.3 ResourceBarsHUDWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/ResourceBarsHUDWidget` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Barres de ressources du joueur : HP, Mana/Energie, Stamina (selon le design combat).
- Entierement Blueprint — les valeurs sont bindees aux `GameplayAttributes` via GAS.
- Probablement des `ProgressBar` UMG avec bindings sur les attributs `Health`, `MaxHealth`, `Mana`, `MaxMana`, etc.
- Mise a jour via le systeme de delegates GAS `OnAttributeValueChanged` ou via Tick optimise.

---

### 4.4 EntityNameplateWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/EntityNameplate/EntityNameplateWidget` |
| **Classe generee** | `HWEntityNameplateWidget` (C++ natif) |
| **Classe parente** | `UUserWidget` |

#### Fonctions / Evenements specifiques

| Fonction | Type | Description |
|----------|------|-------------|
| `refresh_source` | Methode | Rafraichit les donnees depuis le mob source (nom, niveau, HP) |

#### Variables / Proprietes CDO

| Variable | Type | Valeur par defaut | Description |
|----------|------|-------------------|-------------|
| `health_bar` | Widget ref | `None` | Reference a la ProgressBar de HP du mob |
| `hp` | Widget ref | `None` | Reference au TextBlock affichant les HP |
| `txt_level` | Widget ref | `None` | Reference au TextBlock affichant le niveau |

#### Notes d'integration

- `HWEntityNameplateWidget` est une classe C++ qui expose `RefreshSource()` pour mettre a jour le nameplate depuis les donnees du mob.
- Les sous-widgets (`health_bar`, `hp`, `txt_level`) sont des references a des composants UMG lies par nom dans le Blueprint.
- Ce widget est instancie en World Space (via `WidgetComponent` sur l'Actor mob) et scale automatiquement en fonction de la distance.
- Appele depuis `MobNameplate` (cf. `HWEntityNameplateWidget`) quand la cible change ou que les HP varient.
- **[2026-04-07]** `UpdateNameplate` BP function removed — C++ `SetupNameplate()` in `BeginPlay` handles initial setup.

---

### 4.5 PlayerNamePlateWidget

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/PlayerNamePlateWidget` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Nameplate des autres joueurs (MMO — visible au-dessus des personnages en jeu).
- Entierement Blueprint, aucune classe C++ native (contrairement aux nameplates de mobs).
- Affiche probablement : pseudo, niveau, guilde, barre HP (en combat ou toujours visible selon le parametre).
- Instance en World Space via `WidgetComponent` sur le Pawn joueur.

---

### 4.6 CombatStateIconEntry

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/Icons/CombatStateIconEntry` |
| **Classe generee** | `HWCombatStateIconEntry` (C++ natif) |
| **Classe parente** | `UUserWidget` (avec interface IUserObjectListEntry) |

#### Fonctions / Evenements specifiques

| Fonction | Type | Description |
|----------|------|-------------|
| `on_list_item_object_set` | Interface | Appele quand un objet de donnees est associe a cette entree de liste |
| `bp_on_entry_released` | Evenement BP | L'entree est liberee et retournee au pool |
| `bp_on_item_expansion_changed` | Evenement BP | Etat d'expansion de l'entree modifie (ListView) |
| `bp_on_item_selection_changed` | Evenement BP | Etat de selection de l'entree modifie |

#### Variables / Proprietes CDO

| Variable | Type | Valeur par defaut | Description |
|----------|------|-------------------|-------------|
| `icon_image` | Image ref | `None` | Reference a l'Image UMG affichant l'icone d'etat de combat |

#### Notes d'integration

- `HWCombatStateIconEntry` implemente `IUserObjectListEntry` — c'est une entree d'un `ListView` ou `TileView` CommonUI.
- Utilise dans le HUD pour afficher les icones d'etats de combat actifs (buffs, debuffs, etats speciaux).
- Le `icon_image` est rempli via `on_list_item_object_set` a partir d'un objet de donnees contenant la texture et les meta-donnees de l'etat.
- Lien avec le systeme GAS : les `GameplayEffects` actifs alimentent la liste via un composant ou un subsystem.

---

### 4.7 UW_TargetPoint

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/UW_TargetPoint` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Widget de marqueur de cible — affiche un indicateur visuel sur la cible actuelle du joueur (mob, joueur, objet interactif).
- Entierement Blueprint.
- Probablement positionne en Screen Space via `Project()` ou via un `WidgetComponent` en mode Screen Space.
- Affiche potentiellement : reticule de cible, distance, indicateur de lock.

---

### 4.8 UI_PlayerIcon

| Propriete | Valeur |
|-----------|--------|
| **Asset** | `/Game/UI/HUD/UI_PlayerIcon` |
| **Classe generee** | `UserWidget` (Blueprint pur) |
| **Classe parente** | `UUserWidget` |

#### Observations

- Icone du joueur pour le HUD (probablement portrait du personnage avec miniature de la barre de vie).
- Entierement Blueprint.
- Affiche probablement : avatar/portrait du personnage, niveau, HP en miniature.
- Positionnee dans le coin superieur gauche du HUD selon les conventions MMO.

---

## 5. Synthese et relations entre widgets

### Hierarchie et flux de navigation

```
BaseUI (HWCommonActivatableWidget)
├── MenuTabs (CommonUserWidget) ─── navigation entre menus
│   └── InventoryTab (CommonTabListWidgetBase) ─── onglets Tout/Armes/Armures...
│       └── InventoryButtonWidget (CommonButtonBase) ─── bouton par onglet
├── BP_CommonInventoryListWidget (HWCommonInventoryListWidget) ─── grille items
│   └── [InventoryButtonWidget par item]
└── BP_InventoryEquipmentWidget (HWEquipmentWidget) ─── slots equipement
    └── [slots individuels]

Flux Login (hors BaseUI stack) :
UI_LoginWidget (HWLoginWidget)
├── [LoginSuccess] → UI_CharacterDetailWidget / UI_CreateCharacterWidget
├── [LoginError] → UI_MessageConfirmWidget
└── [En cours] → UI_FullScreenLoadingDialog

HUD (toujours visible en jeu) :
ResourceBarsHUDWidget ─── HP/Mana/Stamina joueur
AbilityCooldownsWidget ─── cooldowns GAS
UW_Map / UW_Map1 ─── carte minimap
UW_TargetPoint ─── indicateur de cible
UI_PlayerIcon ─── portrait joueur
CombatStateIconEntry ─── liste etats de combat (ListView)

World Space (WidgetComponents sur Actors) :
EntityNameplateWidget (HWEntityNameplateWidget) ─── sur chaque mob
PlayerNamePlateWidget ─── sur chaque joueur
```

### Classes C++ natives identifiees

| Classe C++ | Widget BP associe | Role |
|------------|-------------------|------|
| `HWLoginWidget` | `UI_LoginWidget` | Authentification OWS |
| `HWEquipmentWidget` | `BP_InventoryEquipmentWidget` | Gestion equipement |
| `HWCommonInventoryListWidget` | `BP_CommonInventoryListWidget` | Liste inventaire avec filtre |
| `HWInventoryListWidget` | `InventoryListWidget` | Liste inventaire de base |
| `HWCommonActivatableWidget` | `BaseUI` | Widget de menu activable CommonUI |
| `HWEntityNameplateWidget` | `EntityNameplateWidget` | Nameplate mob World Space |
| `HWCombatStateIconEntry` | `CombatStateIconEntry` | Entree liste etats de combat |

### Points d'integration importants

| Systeme | Widgets concernes | Note |
|---------|-------------------|------|
| **OWS (OpenWorldServer)** | `UI_LoginWidget`, `UI_RegisterWidget`, `UI_CreateCharacterWidget` | Le login passe par les API REST OWS |
| **GAS (GameplayAbilitySystem)** | `AbilityCooldownsWidget`, `ResourceBarsHUDWidget`, `CombatStateIconEntry` | Bindings sur GameplayAttributes et GameplayEffects |
| **Composant Inventaire** | `BP_InventoryEquipmentWidget`, `BP_CommonInventoryListWidget`, `InventoryListWidget` | Injection de `UHWInventoryComponent` requise |
| **CommonUI** | `BaseUI`, `InventoryTab`, `MenuTabs`, `InventoryButtonWidget`, `BP_InventoryEquipmentWidget` | Stack de navigation, input routing, scroll |
| **DataTables** | `DT_ItemData`, `DT_InventoryItemLibrary`, `DT_CharacterDataAsset`, `NavigationInputActionDataTable` | Donnees items, personnages, raccourcis |
| **World Space** | `EntityNameplateWidget`, `PlayerNamePlateWidget` | Rendu via `UWidgetComponent` sur les Actors |

---

*Documentation generee via MCP unreal_python — introspection des Class Default Objects (CDO)*  
*Fichier : `MCP_UI_Other_Widgets.md`*  
*Projet : HybeliorWorld UE5.4*
