---
tags: [implementation, ue5, progression, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InventoryItems

> Types d'items, structures runtime, flux MoveItem et rendu visuel équipement.

## Types et énumérations

### EItemType
```cpp
None, Resource, Weapon, Consumable, Equipment
```

### EItemSubCategory (34 total)

**Ressources (21)** : Alloy, Bark, Bones, Cereal, Egg, Eye, Fabric, Feather, Flour, Flower, Fur, Gemstone, Leaf, Leather, Liquide, Mushroom, Oil, Ore, Paw, Plank, Plant, Powder, Root, Seed, Shell, Skin, Stone, Tail, Wing, Wood, Wool

**Armes (13)** : SwordOneHand, SwordTwoHands, HammerOneHand, HammerTwoHands, AxeOneHand, AxeTwoHands, Spear, Rapier, Bow, Scepter, Dagger, Shield, LongShield

**Consommables (16)** : Drink, Book, Container, Fish, Potion, Gift, Scroll, Fruits, Vegetables, Cheese, Mushrooms, Cakes, Spices, Herbs, UsableCrystal, MiscConsumables

**Équipements (14)** : Amulet, Backpack, Boots, Bracer, Chestplate, Cloak, Crystal, Helmet, Pants, Ring, Belt, Earring, Robe

## Structures de données

### FHWItemStaticDataStruct (DataTable — données statiques)
```cpp
FString Name, Description;
float Weight;
UTexture2D* Icon;
UStaticMesh* StaticMesh;
USkeletalMesh* SkeletalMesh;
EItemType ItemType;
EItemSubCategory SubCategory;
int32 StackSize;          // 0 = non empilable
int32 RequiredLevel;
int32 MaxUses;
int32 Durability;
TArray<FHWCara> Caracteristics;
int32 MasteryLevel;              // (non appliqué actuellement)
float MasteryExperience;
float MasteryExperienceToNextLevel;
```

### FHWInventoryItem (runtime — FastArraySerializerItem)
```cpp
FGuid ItemGUID;              // ID unique d'instance
int32 ItemTypeID;            // Clé lookup DataTable
int32 Quantity;
int32 InSlotNumber;          // Legacy, remplacé par Order
int32 NumberOfUsesLeft;
int32 Condition;             // Durabilité 0-100
int32 Order;                 // Position bag OU slot équipement

// Stats flat bonus
int32 FlatAttack, FlatDefense, FlatHP;
float AttackPercent, DefensePercent, HPPercent;
float CritRate, CritDamage;

TArray<FHWCara> ItemStats;
```

### FHWCara
```cpp
ECara CaraName;   // Type de stat
int32 CaraValue;
```

### FHWInventoryDisplayItem (UI — données combinées)

Concatène runtime (`FHWInventoryItem`) + static (`FHWItemStaticDataStruct`) pour affichage UI.

## Flux MoveItem (drag-and-drop)

```cpp
// Client-side wrapper (déclenche le RPC)
void MoveItem(const FGuid& ItemGUID, UHWInventoryComponent* TargetInventory);

// RPC Serveur
UFUNCTION(Server, Reliable, WithValidation)
void ServerMoveItem(const FGuid& ItemGUID, AActor* TargetInventoryOwner,
                    const FName& TargetInventoryName);
```

```
Client drag-drop → MoveItem(GUID, TargetInventory)
    ↓
ServerMoveItem [Validate + Implementation]
    ↓
FindItemIndexByGUID() → vérifie existence
IsItemEquippable() → vérifie type compatible
GetEquipmentSlotFromSubCategory() → détermine slot
    ↓
Slot libre ?
├─ OUI : RemoveItem(bag) → AddItem(equipment, slotOrder)
└─ NON : Swap → ancien item retourne au bag
    ↓
ApplyEquipmentStats(item) via GAS GameplayEffect
    ↓
MarkItemDirty() → FastArray delta → client
    ↓
OnRep_Inventory() → ReloadDisplayItems()
    ↓
UpdateMeshEquipment() → mise à jour visuelle
```

## Rendu visuel de l'équipement (UpdateMeshEquipment)

> Mis à jour 2026-04-07 — migration complète vers C++

**Localisation C++ :** `AHWGASPlayerCharacter::UpdateMeshEquipment()`
**Source :** `Source/HybeliorWorld/Public/Character/HWGASPlayerCharacter.h` (lignes ~96-122)

Mapping slot → USkeletalMeshComponent :

| Slot | Composant mesh |
|---|---|
| ChestSlot | Chest |
| PantsSlot | Pants |
| BootsSlot | Boots |
| HeadSlot | Helms |
| CloakSlot | Cloak |
| HandRightSlot (arme) | Sword_Mesh |
| HandLeftSlot (bouclier) | Shield_Mesh |

**Variables BP supprimées (2026-04-07) :** `EquipementMeshArray`, `ChestArray`, `HelmsArray`, `CloakArray`, `PantsArray`, `BootsArray`, fonction BP `UpdateMeshEquipement`.

Les composants sont créés dans le constructeur `AHWGASPlayerCharacter()` et assignés dynamiquement via lookup dans `DT_ItemData` → `FHWItemStaticDataStruct::SkeletalMesh`. `OnRep_UpdateMeshEquipment()` synchronise le rendu côté clients.

## ItemLibrary vs ItemDataTable

Deux DataTables coexistent (système hérité + système HW) :
- `DT_All_Items` / `DT_InventoryItemLibrary` (legacy OWS)
- `DT_ItemData` (HW, 249 items, mais `Caracteristics = []` sur tous → bonus non appliqués)

## Assets associés
- [[Data Tables Catalog]] — contenu réel des DataTables items (249 items, 4 types, 30 sous-catégories)

## Voir aussi

- [[HW Inventory Component]] — propriétaire du `FHWInventoryMaster Inventory` (UPROPERTY `ReplicatedUsing = OnRep_Inventory`) détaillé ici ; manipule les `FHWInventoryItem` via `AddItem()`, `RemoveItem()`, `FindItemIndexByGUID()` et `MoveItem()`.
- [[Data Tables Items]] — `ItemTypeID` de `FHWInventoryItem` résout les données statiques dans les DT `DT_All_Items` / `DT_ItemData` (struct `FHWItemStaticDataStruct` déclarée dans `HWItemStaticData.h`).
- [[Inventory Persistence]] — `FHWInventoryMaster` hérite de `FFastArraySerializer` et `FHWInventoryItem` de `FFastArraySerializerItem` ; le `NetDeltaSerialize` override délègue à `FastArrayDeltaSerialize`, et `UHWInventoryComponent::SerializeInventory()` convertit cette struct en JSON pour OWS.
- [[Loot System]] — `UHWLootTable::RollLoot()` retourne des `FHWLootResult` (tag + quantité) qui sont convertis en `FHWInventoryItem` avant d'être ajoutés au `FHWInventoryMaster` via `UHWInventoryComponent::AddItem()`.
