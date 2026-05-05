---
tags: [implementation, ue5, progression, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# HWInventoryComponent

> Source : `Source/HybeliorWorld/Public/Inventory/HWInventoryComponent.h/.cpp`

Composant inventaire principal (UHWInventoryComponent) monté sur `AHWPlayerController` en deux instances : `BagInventory` et `EquipmentInventory`.

## Architecture

```
AHWPlayerController
├─ BagInventory (UHWInventoryComponent)
│  └─ Inventory (FHWInventoryMaster)
│     └─ Items[] (TArray<FHWInventoryItem>)
│
├─ EquipmentInventory (UHWInventoryComponent)
│  ├─ Inventory (FHWInventoryMaster)
│  ├─ ActiveEquipmentEffects (TMap<FGuid, FActiveGameplayEffectHandle>)
│  └─ ItemStaticData (UHWItemStaticData*)
│
└─ OWSPlayerControllerComponent (persistance JSON → OWS)
```

## Slots d'équipement (EEquipmentSlot — 17 valeurs)

```cpp
None
HeadSlot, EarringRightSlot, EarringLeftSlot, NecklaceSlot
ChestSlot, BeltSlot, CloakSlot
BracerLeftSlot, BracerRightSlot
HandLeftSlot, HandRightSlot
RingLeftSlot, RingRightSlot
PantsSlot, BootsSlot
CrystalSlot
```

## API principale

### Gestion d'items

```cpp
void AddItemToTest(int32 ItemTypeID, int32 Quantity, int32 Uses, int32 Condition,
                   TArray<FHWCara> Stats);
void AddNewItem(const FHWInventoryItem& ItemToAdd);     // + MarkItemDirty()
void AddItem(FHWInventoryItem ItemToAdd);
void RemoveItem(const FHWInventoryItem& ItemToRemove);  // Réajuste Order du BagInventory

FGuid GenerateInventoryItem();
int32 FindItemIndexByGUID(const FGuid& ItemGUID) const;
const FHWInventoryItem& FindItemInInventoryWithRoomInStack(int32 ItemTypeID, int32 SpaceNeeded);
```

### Équipement (voir [[Inventory Items]] pour MoveItem)

```cpp
bool IsItemEquippable(int32 ItemID) const;
bool IsSlotEmpty(UHWInventoryComponent* TargetInventory, int32 SlotOrder);
EEquipmentSlot GetSlotFromOrder(int32 Order);
void EquipAllItems();    // Appelé au spawn pour restaurer l'équipement
```

### Intégration GAS

```cpp
void ApplyEquipmentStats(const FHWInventoryItem& EquippedItem);
void RemoveEquipmentStats(const FGuid& ItemGUID);
```

## Réplication

```cpp
FDoRepLifetimeParams Params;
Params.bIsPushBased = true;
Params.Condition = COND_OwnerOnly;
DOREPLIFETIME_WITH_PARAMS_FAST(UHWInventoryComponent, Inventory, Params);
```

- **Stratégie** : `FastArrayDeltaSerialize` (push-based, `COND_OwnerOnly`)
- **Callback** : `OnRep_Inventory()` → `ReloadDisplayItems()` → mise à jour UI

## Mapping ECara → GAS Attributes

22 caractéristiques (ECara) mappées vers `UHWCombatAttributeSet` via `CaraToAttribute()`. Ressources vitales, attributs primaires, stats combat supportés. Dégâts/résistances élémentaires définis mais non implémentés (voir incohérences).

| ECara | GAS Attribute | Supporté |
|-------|--------------|---------|
| MaxHealth, HealthRegenRate | GetMaxHealthAttribute() | oui |
| Strength, Agility, Constitution | GetStrengthAttribute()... | oui |
| Attack, Defense, CritRate, CritDamage | GetAttackAttribute()... | oui |
| FireDamage, WaterDamage, *Resistance | Non implémentés | non |

## Widgets UI liés

- `WBP_Inventory` (BP) → `UHWCommonInventoryListWidget` (C++) via `SetInventoryComponent()`
- `WBP_Equipment` (BP) → `UHWEquipmentWidget` (C++) via `SetInventoryComponent()`
- `UHWInventoryEntry` (C++) → entrée réutilisable dans la grille BP

## Incohérences connues

1. `FindItemInInventoryWithRoomInStack()` jamais appelée dans `AddItem()` → stacks multiples
2. `InSlotNumber` legacy (non utilisé, `Order` est la vraie position)
3. `SerializeInventoryCompact`/`DeserializeInventoryCompact` commentés (code mort)
4. `ItemLibrary` (FInventoryItemTypes) coexiste avec `ItemDataTable` (FHWItemStaticDataStruct) — double système

## Assets associés
- [[Data Tables Catalog]] — contenu réel des DataTables items (DT_ItemData 249 lignes, DT_All_Items)

## Voir aussi

- [[Inventory Items]] — structures item (FHWInventoryItem, FHWCara) consommées
- [[Inventory Persistence]] — sérialisation JSON via `SerializeInventory()` / `LoadInventorySerialize()`
- [[Loot System]] — produit des `FHWInventoryItem` injectés via `AddItem()`
- [[Data Tables Items]] — source de `ItemDataTable` / `ItemLibrary` (UPROPERTY UDataTable*)
- [[Combat Attribute Set]] — hub domaine 01 : cible GAS de `ApplyEquipmentStats()` / `RemoveEquipmentStats()` via `GameplayEffect` dynamique
