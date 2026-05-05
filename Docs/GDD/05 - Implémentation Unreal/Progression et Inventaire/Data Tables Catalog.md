---
tags: [implementation, ue5, progression, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MCP — Contenu Réel des DataTables HybeliorWorld

> **Projet :** HybeliorWorld — Unreal Engine 5.4  
> **Source :** Extraction directe via MCP Python (`unreal.load_asset` + export JSON)  
> **Date :** 2026-04-04  
> **Auteur :** Agent de documentation MCP  

## Classes C++ associées
- [[HW Inventory Component]] — consomme `DT_ItemData` / `DT_All_Items` pour instancier les items
- [[Inventory Items]] — struct `FHWInventoryItem` correspondant aux lignes de DataTables

---

## Sommaire

1. [Vue d'ensemble des tables](#vue-densemble-des-tables)
2. [DataTables — /Game/Data/DataTables](#datatables--gamedata-datatables)
   - [DT_ItemData](#dt_itemdata)
   - [DT_All_Items](#dt_all_items)
   - [DT_CharacterDataAsset](#dt_characterdataasset)
   - [DT_CharacterAppearancePreset](#dt_characterappearancepreset)
   - [DT_InventoryItemLibrary](#dt_inventoryitemlibrary)
3. [DataTables — /Game/AbilitySystem](#datatables--gameabilitysystem)
   - [CombatTags](#combattags)
   - [EquipementTags](#equipementtags)
   - [InputTags](#inputtags)
   - [AbilityTags](#abilitytags)
   - [GameplayCueTags](#gameplaycuetags)
   - [DT_AnimHitBox](#dt_animhitbox)
4. [UserDefinedEnums — /Game/Data/Enums](#userdefinedEnums--gamedata-enums)
   - [E_MovementType](#e_movementtype)
   - [E_CombatStyle](#e_combatstyle)
5. [Synthèse et observations](#synthèse-et-observations)

---

## Vue d'ensemble des tables

| DataTable | Chemin | Nb Lignes | Export réussi |
|-----------|--------|-----------|---------------|
| DT_ItemData | /Game/Data/DataTables/DT_ItemData | **249** | Oui (JSON) |
| DT_All_Items | /Game/Data/DataTables/DT_All_Items | **96** | Non (RowStruct null) |
| DT_CharacterDataAsset | /Game/Data/DataTables/DT_CharacterDataAsset | **103** | Oui (JSON) |
| DT_CharacterAppearancePreset | /Game/Data/DataTables/DT_CharacterAppearancePreset | **1** | Oui (JSON) |
| DT_InventoryItemLibrary | /Game/Data/DataTables/DT_InventoryItemLibrary | **2** | Oui (JSON) |
| CombatTags | /Game/AbilitySystem/Tags/CombatTags | **36** | Oui (JSON+CSV) |
| EquipementTags | /Game/AbilitySystem/Tags/EquipementTags | **22** | Oui (JSON+CSV) |
| InputTags | /Game/AbilitySystem/Tags/InputTags | **24** | Oui (JSON+CSV) |
| AbilityTags | /Game/AbilitySystem/Tags/AbilityTags | **7** | Oui (JSON+CSV) |
| GameplayCueTags | /Game/AbilitySystem/Tags/GameplayCueTags | **2** | Oui (JSON+CSV) |
| DT_AnimHitBox | /Game/AbilitySystem/Abilities/DT_AnimHitBox | **1** | Oui (JSON+CSV) |

---

## DataTables — /Game/Data/DataTables

### DT_ItemData

**Chemin :** `/Game/Data/DataTables/DT_ItemData`  
**Lignes :** 249  
**Description :** Table maîtresse des items du jeu. Contient armes, équipements, consommables et ressources.

#### Structure des colonnes

| Colonne | Type | Description |
|---------|------|-------------|
| `Name` | String (ID numérique) | Identifiant unique de la ligne |
| `Description` | String | Description en français de l'objet |
| `Weight` | Float | Poids en unités arbitraires |
| `ItemType` | String (Enum) | Catégorie principale : `Weapon`, `Equipment`, `Consumable`, `Resource` |
| `SubCategory` | String (Enum) | Sous-catégorie détaillée |
| `StackSize` | Int | Quantité maximale par pile d'inventaire |
| `RequiredLevel` | Int | Niveau minimum requis pour utiliser l'item |
| `MaxUses` | Int | Nombre d'utilisations max (0 = illimité) |
| `Durability` | Int | Durabilité max (0 pour les consommables/ressources) |
| `Icon` | Soft Object Path | Référence à la texture icône (souvent `None`) |
| `StaticMesh` | Soft Object Path | Mesh statique (souvent `None`) |
| `SkeletalMesh` | Soft Object Path | Mesh skeletonique (souvent `None`) |
| `Caracteristics` | Array | Tableau de caractéristiques de l'item (vide actuellement) |
| `MasteryLevel` | Int | Niveau de maîtrise actuel |
| `MasteryExperience` | Int | XP de maîtrise actuel |
| `MasteryExperienceToNextLevel` | Int | XP requis pour le prochain niveau (défaut : 100) |

#### Répartition par ItemType

| ItemType | Nombre | Sous-catégories |
|----------|--------|-----------------|
| Resource | 90 | Wood, Ore, Leather, Fur, Feather, Flower, Leaf, Root, Fabric, Plank, Stone, Gemstone, Seed, Wool, Egg, Bones, Paw, Skin, Tail, Powder, Eye, Wing, Shell, Bark, Flour, Oil, Liquide, Alloy, Mushroom, Cereal, Plant |
| Consumable | 55 | Potion, Drink, Scroll, Book, Fish, Cakes, Cheese, Fruits, Vegetables, Mushrooms, Gift, UsableCrystal, MiscConsumables, Container |
| Weapon | 52 | Bow, Shield, Dagger, SwordTwoHands, SwordOneHand, LongShield, AxeTwoHands, AxeOneHand, Spear, HammerTwoHands, HammerOneHand, Rapier, Scepter |
| Equipment | 52 | Amulet, Ring, Boots, Earring, Bracer, Belt, Cloak, Crystal, Helmet, Pants, Chestplate, Robe, Backpack, Wing |

#### Échantillon de données réelles (10 items)

| ID | Description | Type | Sous-cat. | Poids | Niv.Req | Durabilité | Stack |
|----|-------------|------|-----------|-------|---------|------------|-------|
| 1 | Arc puissant a longue portee | Weapon | Bow | 1.5 | 8 | 100 | 1 |
| 5 | Bouclier solide en fer | Weapon | Shield | 5.0 | 8 | 200 | 1 |
| 9 | Dague legere et furtive | Weapon | Dagger | 1.0 | 5 | 80 | 1 |
| 13 | Grande Epee lourde | Weapon | SwordTwoHands | 6.0 | 15 | 200 | 1 |
| 17 | Epee tranchante pour chevaliers | Weapon | SwordOneHand | 3.5 | 10 | 150 | 1 |
| 33 | Lance legere pour la chasse | Weapon | Spear | 2.5 | 8 | 130 | 1 |
| 37 | Marteau massif a deux mains | Weapon | HammerTwoHands | 8.0 | 20 | 250 | 1 |
| 49 | Sceptre canalisant la magie | Weapon | Scepter | 2.0 | 12 | 100 | 1 |
| 53 | Boisson rafraichissante | Consumable | Drink | 0.5 | 1 | 0 | 50 |
| 89 | Livre contenant des sorts anciens | Consumable | Book | 1.0 | 5 | 0 | 1 |
| 101 | Potion regenerant la sante | Consumable | Potion | 0.2 | 1 | 0 | 20 |
| 109 | Amulette conferant une force accrue | Equipment | Amulet | 0.2 | 10 | 100 | 1 |
| 141 | Casque lourd pour la bataille | Equipment | Helmet | 4.0 | 13 | 180 | 1 |
| 161 | Aile delicate d'un papillon | Resource | Wing | 0.01 | 1 | 0 | 100 |
| 167 | Bois leger provenant d'un pin | Resource | Wood | 2.0 | 1 | 0 | 100 |
| 230 | Pierre precieuse verte | Resource | Gemstone | 0.2 | 5 | 0 | 10 |

#### Observations
- Les IDs ne sont pas contiguës : sauts observés (ex : 80-81, 96-97, 97-101, 101-103...).
- Aucun item ne possède de `Caracteristics` renseignées pour l'instant (tableau vide partout).
- Les références Mesh et Icon sont systématiquement `None` : les assets visuels ne sont pas encore liés.
- Le système de maîtrise (`MasteryLevel`, `MasteryExperience`) est présent structurellement mais inactif.
- Chaque arme/équipement a `StackSize = 1` ; les ressources et consommables peuvent s'empiler (20 à 200).

---

### DT_All_Items

**Chemin :** `/Game/Data/DataTables/DT_All_Items`  
**Lignes :** 96  
**Export JSON/CSV :** Echoue (`RowStruct = None`)

#### Remarque sur le RowStruct null

Cette table retourne `RowStruct = None` via l'API Python et refuse l'export JSON/CSV. Ce comportement indique que le `ScriptStruct` de base a été défini en Blueprint ou UserDefinedStruct et que la réflexion Python ne peut pas le résoudre au moment de l'export. Les données sont présentes (96 lignes accessibles via `get_row_names()`), mais le contenu des colonnes n'est pas lisible sans désérialisation manuelle.

#### IDs présents

IDs connus : 1 à 81, 84 à 96, 103, 104 (lacunes aux IDs 82, 83, 97-102).

**Hypothèse :** Cette table est un sous-ensemble ou une vue filtrée de DT_ItemData (249 lignes), ne conservant que les items déjà assignés à des assets visuels ou des slots de jeu actifs. Les IDs 103 et 104 correspondent à des items hors de la plage séquentielle principale.

---

### DT_CharacterDataAsset

**Chemin :** `/Game/Data/DataTables/DT_CharacterDataAsset`  
**Lignes :** 103  
**Description :** Catalogue des parts de personnage pour le Character Editor. Chaque ligne correspond à un élément d'apparence (vêtement, coiffure, accessoire, etc.) avec ses meshes, matériaux et compatibilités anatomiques.

#### Structure des colonnes

| Colonne | Type | Description |
|---------|------|-------------|
| `Name` | String | Identifiant unique (ex : `child_acc_armring_01`, `ma_chest_longsleeve_casual`) |
| `AssetType` | String (Enum) | Catégorie de l'asset d'apparence |
| `Tumbnail` | Soft Texture2D | Texture de miniature dans l'éditeur de personnage |
| `DisplayName` | String | Nom d'affichage dans l'UI |
| `Collection` | String | Collection thématique (souvent vide) |
| `Anatomies` | Array String | Anatomies compatibles |
| `HiddenCDA_Placeholder` | String | Placeholder pour masquage conditionnel |
| `SkeletalMesh` | Soft SkeletalMesh | Mesh principal de la pièce |
| `AdditionalMorphTargets` | Array | Morph targets additionnels |
| `MaterialVariants` | Array (struct) | Variantes de matériau disponibles (couleur + MI) |
| `BasebodyMask` | Soft Texture2D | Masque de corps de base |
| `UseAlternativeSkinTextures` | Bool | Utiliser les textures de peau alternatives |
| `RootOffset` | Float | Décalage de la racine |
| `FootRotation` | Float | Rotation du pied |
| `BallRotation` | Float | Rotation de la bille du pied |
| `CustomAnimBlueprint` | Soft AnimBP | Blueprint d'animation personnalisé (souvent None) |
| `StaticMesh` | Soft StaticMesh | Mesh statique alternatif (souvent None) |

#### Répartition par AssetType

| AssetType | Nombre | Description |
|-----------|--------|-------------|
| Apparel_UpperBody | 18 | Hauts, robes, vestes |
| Hairstyles | 20 | Coiffures |
| Apparel_Feet | 14 | Chaussures, bottes, sandales |
| Apparel_Hats | 14 | Chapeaux, casquettes |
| Apparel_Socks | 10 | Chaussettes |
| Apparel_LowerBody | 11 | Bas, pantalons, jupes |
| Apparel_Glasses | 7 | Lunettes |
| Apparel_Accessories | 8 | Bagues, montres, boucles d'oreilles |
| Attachments | 1 | Outils et accessoires portés (ex : marteau) |

#### Anatomies disponibles

- `HumanFemaleAdult` — Femme adulte
- `HumanMaleAdult` — Homme adulte
- `HumanFemaleChild` — Fille enfant
- `HumanMaleChild` — Garçon enfant

#### Variantes de matériau

Chaque item peut exposer jusqu'à 4 variantes de couleur. Exemple sur `child_acc_armring_01` :

| Variant | Couleur RGBA | Material Instance |
|---------|-------------|-------------------|
| Red | (R=0.79, G=0.008, B=0.0) | MI_accesories_01_red |
| Colorfull | (R=0.76, G=0.60, B=0.14) | MI_accesories_01_colorfull |
| Dark | (R=0.0, G=0.0, B=0.0) | MI_accesories_01_black |
| Silver | (R=0.0, G=0.14, B=1.0) | MI_accesories_01_silver |

#### Échantillon de données réelles (par AssetType)

| Name | DisplayName | AssetType | Anatomies | Variantes |
|------|-------------|-----------|-----------|-----------|
| child_acc_armring_01 | Arm Ring 03 | Apparel_Accessories | FemChild, MaleChild | 4 |
| child_acc_watch | Watch | Apparel_Accessories | FemChild, MaleChild | 4 |
| fe_acc_earring_01_triple | Triple | Apparel_Accessories | HumanFemaleAdult | 4 |
| tool_hammer_01 | Hammer | Attachments | (tous) | 0 |
| child_feet_boot_casual | Casual Boots | Apparel_Feet | FemChild, MaleChild | 0 |
| fe_feet_highheels | High Heels | Apparel_Feet | HumanFemaleAdult | 0 |
| ma_feet_boot_casual | Casual Boots | Apparel_Feet | HumanMaleAdult | 0 |
| child_eyeglass | Eye Glasses | Apparel_Glasses | FemChild, MaleChild | 3 |
| child_hair_afro | Afro | Hairstyles | MaleChild, FemChild | 0 |
| child_fe_hat_summer | Summer Hat | Apparel_Hats | HumanFemaleChild | 2 |
| child_chest_dress | Dress | Apparel_UpperBody | HumanFemaleChild | 3 |
| child_pants_jeans | Long | Apparel_LowerBody | FemChild, MaleChild | 3 |
| child_feet_socks_long | Long | Apparel_Socks | FemChild, MaleChild | 5 |

---

### DT_CharacterAppearancePreset

**Chemin :** `/Game/Data/DataTables/DT_CharacterAppearancePreset`  
**Lignes :** 1  
**Description :** Preset d'apparence de personnage préconfiguré. Actuellement un seul preset : `Matthew`, personnage masculin adulte de référence.

#### Structure des colonnes (principales)

| Colonne | Type | Description |
|---------|------|-------------|
| `Name` | String | Identifiant du preset |
| `Anatomy` | String | Anatomie du personnage |
| `Age` | Int | Age (0 = défaut) |
| `Size` | Float | Taille relative (0.5 = standard) |
| `SkinMaterialIndex` | Int | Index du matériau de peau |
| `SkinScalarParam` | Array | Paramètres scalaires de matériau peau |
| `SkinHDR` | Array | Paramètres HDR couleur peau (Eye Tint, Lips Tint, Skin Tint, Iris Hue Tint) |
| `EyesScalarParam` | Array | Paramètres scalaires des yeux |
| `EyesHDR` | Array | Paramètres HDR des yeux |
| `MorphTargets` | Array | Valeurs des morph targets du visage et corps |
| `MorphTargetGroups` | Array | Groupes de morph targets actifs par index |
| `HairstyleGlobalScalarParam` | Array | Paramètres scalaires coiffure |
| `HairstyleGlobalHDRvectParam` | Array | Couleur coiffure (TipColor, RootColor) |
| `ApparelGlobalScalarParam` | Array | Paramètres scalaires vêtements |
| `ApparelDataAsset` | Array | Liste des pièces d'habillement équipées |
| `AttachmentDataAsset` | Array | Liste des attachements |

#### Données du preset "Matthew"

- **Anatomy :** HumanMaleAdult
- **Size :** 0.5 (standard)
- **Skin Tint :** HSV (14.3, 0.55, 1.0) — teinte peau légèrement orangée
- **Iris Hue Tint :** HSV (219.9, 0.80, 0.50) — iris bleu-gris
- **Coiffure (TipColor/RootColor) :** HSV (21.97, 0.75, 0.078) — brun foncé
- **Tenue portée :**
  - `ma_chest_longsleeve_casual` (variante par défaut)
  - `ma_leg_jeans` (variante par défaut)
  - `ma_feet_business` (variante par défaut)
- **Morph targets actifs (face) :**
  - `chin_size`: 0.449, `chin_width`: -0.154, `jaw_width`: 0.931
  - `mouth_size`: 0.538, `nose_curve`: 0.508, `nose_size`: 0.414
  - `eyes_size`: -0.339, `eyes_depth`: -0.804
  - `face_None`: 1.0 (preset facial neutre actif)

---

### DT_InventoryItemLibrary

**Chemin :** `/Game/Data/DataTables/DT_InventoryItemLibrary`  
**Lignes :** 2  
**Description :** Table héritée du système OWS (Open World Server). Contient des items de démonstration/test. Probablement un vestige de l'intégration initiale OWS avant la migration vers DT_ItemData.

#### Structure des colonnes

| Colonne | Type | Description |
|---------|------|-------------|
| `Name` | String | ID numérique |
| `ItemName` | String | Nom d'affichage |
| `ItemDescription` | String | Description |
| `ItemIcon` | Soft Object Path | Icône de l'item |
| `bCanStack` | Bool | Peut s'empiler |
| `StackSize` | Int | Taille max de la pile |

#### Données complètes

| ID | ItemName | Description | Icon | CanStack | StackSize |
|----|----------|-------------|------|----------|-----------|
| 1 | Item 1 | Item 1 Description | android_Icon (Engine tutorial) | true | 20 |
| 2 | Item 2 | Item 2 Description | AICON-Green (Engine resources) | false | 0 |

> **Note :** Cette table utilise des assets Engine par défaut comme icônes. Elle ne doit pas être utilisée en production et est conservée pour compatibilité OWS.

---

## DataTables — /Game/AbilitySystem

Toutes ces tables partagent la même structure à 3 colonnes (`Name`, `Tag`, `DevComment`) et servent de registre de Gameplay Tags typés.

### CombatTags

**Chemin :** `/Game/AbilitySystem/Tags/CombatTags`  
**Lignes :** 36  
**Description :** Tags de combat pour le système GAS. Couvre les états de personnage, types de dégâts, drapeaux de combat et modificateurs d'attributs (SetByCaller).

#### Catégories de tags

| Catégorie | Préfixe | Exemples |
|-----------|---------|---------|
| États | `Combat.State.*` | Dead, Wet, Burning, Cold, Charged, Electrified, Frozen, Iframe, DodgedRecently, ReadyToFight, Blocking |
| Types de dégâts | `Combat.DamageType.*` | Fire, Water, Ice, Lightning, Falling |
| Drapeaux | `Combat.Flags.*` | CriticalHit |
| Cooldowns | `Combat.Cooldown.*` | NormalAbility1, NormalAbility2 |
| SetByCaller | `SetByCaller.*` | Strength, Attack, Speed, Agility, CritDamage, Intelligence, Constitution, MaxStamina, MaxHealth, MaxMana, Defense |
| Événements | `Combat.ActivateFromEvent.*` | ApplyFallingDamage |
| Sets d'armes | `Combat.Set.*` | Unarmed, SwordAndShield, Bow |
| Combo | `Combat.Combo.Window.*` | 1 (fenêtre combo 1) |

#### Tous les tags CombatTags (36 lignes)

| Name | Tag GAS | DevComment |
|------|---------|------------|
| CombatStateDead | Combat.State.Dead | — |
| CombatDamageTypeFire | Combat.DamageType.Fire | Fire Damage |
| CombatDamageTypeWater | Combat.DamageType.Water | Water Damage |
| CombatDamageTypeIce | Combat.DamageType.Ice | Ice Damage |
| CombatDamageTypeLightning | Combat.DamageType.Lightning | Lightning Damage |
| CombatStateWet | Combat.State.Wet | Wet state |
| CombatStateBurning | Combat.State.Burning | Burning state |
| CombatStateCold | Combat.State.Cold | Cold state |
| CombatStateCharged | Combat.State.Charged | Charged state |
| CombatFlagsCriticalHit | Combat.Flags.CriticalHit | Was a critical hit? |
| CombatCooldownNormalAbility1 | Combat.Cooldown.NormalAbility1 | Normal Ability 1 Cooldown |
| CombatCooldownNormalAbility2 | Combat.Cooldown.NormalAbility2 | Normal Ability 2 Cooldown |
| CombatDamageTypeFalling | Combat.DamageType.Falling | Falling Damage |
| CombatSetByCallingFallingDamage | Combat.SetByCaller.FallingDamage | Set by Caller Falling Damage |
| CombatActivateFromEventApplyFallingDamage | Combat.ActivateFromEvent.ApplyFallingDamage | Activate from Event |
| CombatStateIframe | Combat.State.Iframe | Invulnerability Frames |
| CombatStateDodgedRecently | Combat.State.DodgedRecently | A dodge was performed recently |
| CombatStateElectrified | Combat.State.Electrified | Electrified state |
| CombatStateFrozen | Combat.State.Frozen | Frozen state |
| CombatComboWindow1 | Combat.Combo.Window.1 | 1st combo window |
| CombatStateReadyToFight | Combat.State.ReadyToFight | Ready To Fight |
| SetByCallerStrength | SetByCaller.Strength | Modifie Strength Attribute |
| SetByCallerAttack | SetByCaller.Attack | Modifie Attack Attribute |
| SetByCallerSpeed | SetByCaller.Speed | Modifie Speed Attribute |
| SetByCallerAgility | SetByCaller.Agility | Modifie Agility Attribute |
| SetByCallerCritDamage | SetByCaller.CritDamage | Modifie CritDamage Attribute |
| SetByCallerIntelligence | SetByCaller.Intelligence | Modifie Intelligence Attribute |
| SetByCallerConstitution | SetByCaller.Constitution | Modifie Constitution Attribute |
| SetByCallerMaxStamina | SetByCaller.MaxStamina | Modifie MaxStamina Attribute |
| SetByCallerMaxHealth | SetByCaller.MaxHealth | Modifie MaxHealth Attribute |
| SetByCallerMaxMana | SetByCaller.MaxMana | Modifie MaxMana Attribute |
| SetByCallerDefense | SetByCaller.Defense | Modifie Defense Attribute |
| Blocking | Combat.State.Blocking | Blocking |
| CombatSetUnarmed | Combat.Set.Unarmed | Unarmed |
| CombatSetSwordAndShield | Combat.Set.SwordAndShield | SwordAndShield |
| CombatSetBow | Combat.Set.Bow | Bow |

---

### EquipementTags

**Chemin :** `/Game/AbilitySystem/Tags/EquipementTags`  
**Lignes :** 22  
**Description :** Tags définissant les slots d'équipement et les types d'armes.

#### Tous les tags EquipementTags (22 lignes)

| Name | Tag GAS | Type |
|------|---------|------|
| HeadSlot | EquipementSlot.Head | Slot |
| NecklaceSlot | EquipementSlot.Necklace | Slot |
| ChestSlot | EquipementSlot.Chest | Slot |
| CloakSlot | EquipementSlot.Cloak | Slot |
| BeltSlot | EquipementSlot.Belt | Slot |
| BracerLeftSlot | EquipementSlot.BracerLeft | Slot |
| BracerRightSlot | EquipementSlot.BracerRight | Slot |
| HandLeftSlot | EquipementSlot.HandLeft | Slot |
| HandRightSlot | EquipementSlot.HandRight | Slot |
| RingLeftSlot | EquipementSlot.RingLeft | Slot |
| RingRightSlot | EquipementSlot.RingRight | Slot |
| PantsSlot | EquipementSlot.Pants | Slot |
| BootsSlot | EquipementSlot.Boots | Slot |
| CristalSlot | EquipementSlot.Cristal | Slot |
| EarringLeftSlot | EquipementSlot.EarringLeft | Slot |
| EarringRightSlot | EquipementSlot.EarringRight | Slot |
| WeaponType.Unarmed | WeaponType.Unarmed | Type d'arme |
| WeaponType.Bow | WeaponType.Bow | Type d'arme |
| WeaponType.HandLeftAlone | WeaponType.HandLeftAlone | Type d'arme |
| WeaponType.HandRightAlone | WeaponType.HandRightAlone | Type d'arme |
| WeaponType.TwoWeapon | WeaponType.TwoWeapon | Type d'arme |
| WeaponType.GreatSword | WeaponType.GreatSword | Type d'arme |

> **Note :** La faute d'orthographe `EquipementSlot` (un seul 'p') est présente dans les tags GAS et doit être conservée pour la cohérence.

---

### InputTags

**Chemin :** `/Game/AbilitySystem/Tags/InputTags`  
**Lignes :** 24  
**Description :** Tags d'input pour le système GAS Enhanced Input. Combine les tags d'action (`InputTag.*`) et les états de mouvement (`MovementState.*`).

#### Tous les tags InputTags (24 lignes)

| Name | Tag GAS | DevComment |
|------|---------|------------|
| NormalAbility1 | InputTag.Abilities.NormalAbility1 | Normal Ability 1 |
| NormalAbility2 | InputTag.Abilities.NormalAbility2 | Normal Ability 2 |
| SpecialAbility1 | InputTag.Abilities.SpecialAbility1 | Special Ability 1 |
| Dash | InputTag.Abilities.Dash | Dash |
| WeaponLeft | InputTag.Abilities.WeaponLeft | WeaponLeft |
| WeaponRight | InputTag.Abilities.WeaponRight | WeaponRight |
| ReadyToFight | InputTag.Abilities.ReadyToFight | Ready to fight |
| Crouch | InputTag.Crouch | Crouch |
| Move | InputTag.Move | Movement |
| Interact | InputTag.Interact | Interact |
| Sprint | InputTag.Sprint | Sprint |
| WalkRun | InputTag.WalkRun | WalkRun |
| Aiming | InputTag.Aiming | Aiming |
| FirstCamera | InputTag.FirstCamera | FirstCamera |
| Running | MovementState.Running | Running |
| Walking | MovementState.Walking | Walking |
| Sprinting | MovementState.Sprinting | Sprinting |
| Crawing | MovementState.Crawing | Crawing |
| Ragdoll | MovementState.Ragdoll | Ragdoll |
| Crouching | MovementState.Crouching | Ragdoll *(commentaire erroné)* |
| Flying | MovementState.Flying | Flying |
| Swimming | MovementState.Swimming | Swimming |
| Driving | MovementState.Driving | Driving |
| OnBoat | MovementState.OnBoat | OnBoat |

---

### AbilityTags

**Chemin :** `/Game/AbilitySystem/Tags/AbilityTags`  
**Lignes :** 7  
**Description :** Tags d'activation et d'échec des abilities GAS.

#### Tous les tags AbilityTags (7 lignes)

| Name | Tag GAS | DevComment |
|------|---------|------------|
| AbilityActivateFailIsDead | Ability.ActivateFail.IsDead | Failed because the player is dead |
| AbilityActivateFailCooldown | Ability.ActivateFail.Cooldown | Failed because of a cooldown |
| AbilityActivateFailCost | Ability.ActivateFail.Cost | Failed because a cost wasn't met |
| AbilityActivateFailTagsBlocked | Ability.ActivateFail.TagsBlocked | — |
| AbilityActivateFailTagsMissing | Ability.ActivateFail.TagsMissing | — |
| AbilityActivateFailNetworking | Ability.ActivateFail.Networking | — |
| AbilityEventCombo | Ability.Event.Combo | — |

---

### GameplayCueTags

**Chemin :** `/Game/AbilitySystem/Tags/GameplayCueTags`  
**Lignes :** 2  
**Description :** Tags de GameplayCue pour les effets visuels et sonores déclenchés par le GAS.

| Name | Tag GAS | DevComment |
|------|---------|------------|
| GameplayCueTest | GameplayCue.Test | — |
| GameplayCueLightningStormStrike | GameplayCue.LightningStorm.Strike | Gameplay Cue for Striking a Target |

---

### DT_AnimHitBox

**Chemin :** `/Game/AbilitySystem/Abilities/DT_AnimHitBox`  
**Lignes :** 1  
**Description :** Table de hitboxes animées. Chaque ligne associe une animation à une série de positions/rotations de hitbox horodatées.

#### Structure des colonnes

| Colonne | Type | Description |
|---------|------|-------------|
| `Name` | String | Identifiant de la séquence (ex: `Attack_01_Seq_Hitboxes`) |
| `AnimSequence` | Soft AnimSequence | Référence à l'animation UE5 |
| `Hitboxes` | Array (struct) | Tableau de positions/rotations/timestamps |

#### Données de la ligne unique

**Name :** `Attack_01_Seq_Hitboxes`  
**AnimSequence :** `/Game/Assets/Characters/Mannequin_UE4/Animations/EssentialSwordShieldAnimations/Attack_01_Seq`  
**Hitboxes (9 frames) :**

| Timestamp | Location (X, Y, Z) | Rotation (Pitch, Yaw, Roll) |
|-----------|--------------------|-----------------------------|
| 0.0s | (-25.88, 30.60, 85.02) | (58.35, 92.16, 76.10) |
| 0.2s | (-60.76, -57.84, 169.23) | (-61.84, 120.82, 167.52) |
| 0.4s | (-15.51, 33.41, 176.20) | (-66.78, -32.98, -117.06) |
| 0.6s | (28.73, -40.97, 56.15) | (29.84, 104.59, 144.29) |
| 0.8s | (36.99, -43.07, 60.33) | (34.87, 131.52, 168.02) |
| 1.0s | (81.71, -11.17, 74.28) | (56.86, 229.93, -45.20) |
| 1.2s | (65.12, 29.26, 86.83) | (44.12, -49.98, 32.64) |
| 1.4s | (-0.68, 46.64, 86.99) | (50.62, 19.63, 64.16) |
| 1.6s | (-25.34, 32.27, 84.71) | (57.96, 86.36, 75.74) |

> **Note :** La hitbox revient à sa position initiale à t=1.6s, indiquant une animation cyclique ou une attaque avec retour au repos. Cette table n'est pas encore peuplée pour les autres animations de combat.

---

## UserDefinedEnums — /Game/Data/Enums

### E_MovementType

**Chemin :** `/Game/Data/Enums/E_MovementType`  
**Type :** UserDefinedEnum (Blueprint)  
**Valeurs :** 18  

| Index | Valeur | Description |
|-------|--------|-------------|
| 0 | Idle | Personnage immobile |
| 1 | Sprint | Course rapide |
| 2 | Crouch | Accroupi |
| 3 | Crawling | Rampant |
| 4 | Falling | En chute |
| 5 | Jump | Saut |
| 6 | ShortClimb | Escalade courte |
| 7 | Roll | Roulade |
| 8 | Dodge | Esquive |
| 9 | Cover | Derrière une couverture |
| 10 | Swim | Nage |
| 11 | Vault | Franchissement d'obstacle |
| 12 | Ladder | Échelle |
| 13 | Boat | Bateau |
| 14 | Horse | Cheval / monture |
| 15 | NoMovement | Sans mouvement (bloqué) |
| 16 | Gliding | Planeur / deltaplane |
| 17 | Ragdoll | Ragdoll physique |

> **Note :** L'index interne est `UniqueNameIndex=19` (19 entrées au maximum, une est réservée ou supprimée). Cet enum est utilisé dans le système d'animation et correspond directement aux `MovementState.*` tags dans InputTags.

---

### E_CombatStyle

**Chemin :** `/Game/Data/Enums/E_CombatStyle`  
**Type :** UserDefinedEnum (Blueprint)  
**Valeurs :** 3  

| Index | Valeur | Description |
|-------|--------|-------------|
| 0 | Unarmed | Combat sans arme (mains nues) |
| 1 | SwordAndShield | Épée et bouclier |
| 2 | Bow | Arc |

> **Note :** Cet enum est minimal (3 styles seulement) mais correspond aux sets d'armes définis dans CombatTags (`Combat.Set.Unarmed`, `Combat.Set.SwordAndShield`, `Combat.Set.Bow`). D'autres styles (SwordTwoHands, Dagger, Spear, etc.) existent dans DT_ItemData mais ne sont pas encore déclarés ici, confirmant que le système de combat est en cours d'expansion.

---

## Synthèse et observations

### Cohérence des données

1. **Corrélation E_CombatStyle / CombatTags / DT_ItemData :** Les 3 styles de combat de l'enum sont confirmés dans CombatTags (`Combat.Set.*`) et dans les sous-catégories d'armes de DT_ItemData. Les 10 autres types d'armes (Dagger, Spear, Rapier, etc.) sont définis dans DT_ItemData mais manquent de tags GAS correspondants — confirmation que le système combat est en WIP actif.

2. **Corrélation E_MovementType / InputTags / MovementState :** Les 18 valeurs de E_MovementType correspondent quasi-parfaitement aux `MovementState.*` tags dans InputTags (Running, Walking, Sprinting, Crawing, Ragdoll, Crouching, Flying, Swimming, Driving, OnBoat). Quelques valeurs de l'enum n'ont pas encore de tag correspondant (Idle, Jump, ShortClimb, Roll, Dodge, Cover, Vault, Ladder, Horse, NoMovement, Gliding).

3. **DT_ItemData vs DT_All_Items :** DT_ItemData (249 lignes) est la table maîtresse. DT_All_Items (96 lignes, export bloqué) semble être un sous-ensemble actif ou une table en cours de migration. La lacune aux IDs 82-83 et 97-102 dans DT_All_Items suggère des items supprimés ou réservés.

4. **DT_CharacterDataAsset vs apparences joueur :** La table couvre 4 anatomies (FemAdult, MaleAdult, FemChild, MaleChild), avec 10 items pour les adultes et 93 pour les enfants. Les contenus enfants sont nettement plus développés que les adultes, indication d'une priorité de contenu.

5. **DT_InventoryItemLibrary :** Table vestige OWS à 2 items de test. Non utilisée en production.

### Points d'attention

- `DT_All_Items` : RowStruct null — nécessite une vérification du Blueprint struct sous-jacent ou une migration vers un C++ struct.
- `DT_CharacterDataAsset` : Faute de frappe dans le nom de colonne `Tumbnail` (au lieu de `Thumbnail`) — à conserver pour compatibilité binaire.
- `EquipementTags` : `EquipementSlot` (un seul 'p') — typo propagée dans toutes les tables de tags.
- `InputTags` : Le DevComment de `Crouching` est `"Ragdoll"` par erreur de copie.
- `DT_AnimHitBox` : Une seule animation référencée (Attack_01_Seq). La table devra être peuplée pour chaque animation de combat.
- Champ `Caracteristics` de DT_ItemData : Prévu pour les stats d'items (dégâts, défense, etc.) mais universellement vide — en attente d'implémentation.
