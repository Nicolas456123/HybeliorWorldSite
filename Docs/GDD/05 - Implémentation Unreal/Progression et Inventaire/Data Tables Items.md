---
tags: [implementation, ue5, progression, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# DataTables_Items

> DataTables du système d'inventaire et d'items.

## DT_All_Items

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `Content/Data/DataTables/DT_All_Items.uasset` |
| **Struct de ligne** | `FHWItemStaticDataStruct` |
| **Header source** | `Public/Inventory/HWItemStaticData.h` |
| **Lignes** | 96 items |

Table maîtresse de tous les items. `RowName` (ID numérique ou tag) identifie chaque item. Référence principale pour toutes les données statiques d'item.

### Champs de `FHWItemStaticDataStruct`

| Champ | Type | Description |
|-------|------|-------------|
| `Name` | `FString` | Nom affiché |
| `Description` | `FString` | Description |
| `Weight` | `float` | Poids (kg) |
| `ItemType` | `EItemType` | Resource / Weapon / Consumable / Equipment |
| `SubCategory` | `EItemSubCategory` | 34 sous-catégories |
| `StackSize` | `int32` | Taille max pile |
| `RequiredLevel` | `int32` | Niveau minimum |
| `MaxUses` | `int32` | Utilisations max |
| `Durability` | `int32` | Durabilité |
| `Icon` | `UTexture2D*` | Icône UI |
| `StaticMesh` | `UStaticMesh*` | Mesh drop au sol |
| `SkeletalMesh` | `USkeletalMesh*` | Mesh arme portée |
| `Caracteristics` | `TArray<FHWCara>` | Bonus ECara + valeur |
| `MasteryLevel` | `int32` | Niveau de maîtrise |
| `MasteryExperience` | `float` | XP maîtrise actuelle |
| `MasteryExperienceToNextLevel` | `float` | XP pour niveau suivant (100) |

### Consommateurs

- `UHWInventoryComponent` — via `ItemTypeID` (index ligne)
- `UHWItemStaticData::GetEquipmentSlotFromSubCategory()`
- UI (`HWInventoryEntry`, `HWEquipmentWidget`)

> **Bug confirmé :** `RowStruct = None` → `FindRow()` retourne nullptr, lookup impossible.

---

## DT_InventoryItemLibrary

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `Content/Data/DataTables/DT_InventoryItemLibrary.uasset` |
| **Struct de ligne** | `FInventoryItemTypes` |
| **Header source** | `Public/Inventory/HWInventoryComponent.h` |

Bibliothèque légère d'items pour le système OWS hérité. Complément ou alternative à `DT_All_Items` pour la compatibilité OWS.

### Champs de `FInventoryItemTypes`

| Champ | Type | Description |
|-------|------|-------------|
| `ItemName` | `FString` | Nom |
| `ItemDescription` | `FString` | Description courte |
| `ItemIcon` | `TSoftObjectPtr<UTexture2D>` | Icône (async) |
| `bCanStack` | `bool` | Empilable ? |
| `StackSize` | `int32` | Taille max |

### Consommateurs

- `UHWInventoryComponent::ItemLibrary`
- `HWInventoryListWidget`, `HWInventoryEntry`

---

## DT_ItemData

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `Content/Data/DataTables/DT_ItemData.uasset` |
| **Struct de ligne** | `FHWItemStaticDataStruct` |
| **Header source** | `Public/Inventory/HWItemStaticData.h` |
| **Lignes** | 249 items |

Table d'items complémentaire (référencée par `UHWInventoryComponent::ItemDataTable`). Probablement données brutes d'items organisées différemment.

### Consommateurs

- `UHWInventoryComponent::ItemDataTable` (référence protégée)
- `ApplyEquipmentStats()` / `RemoveEquipmentStats()` via GameplayEffects

> **Bug confirmé :** Champ `Caracteristics = []` sur **tous les 249 items** → `ApplyEquipmentStats()` n'applique aucun bonus.

---

## Double système d'items

Le projet maintient deux couches :

1. **OWS legacy** (`DT_InventoryItemLibrary` / `FInventoryItemTypes`) — héritage Sabre Dart Studios, données légères, référencé par ID entier.
2. **Nouveau HW** (`DT_All_Items` / `FHWItemStaticDataStruct`) — données enrichies GAS, maîtrise, slots. **Préférer** pour tout nouveau contenu.

## Identification des items

| Contexte | Identifiant |
|----------|-------------|
| Runtime réseau (`FHWInventoryItem`) | `ItemTypeID` (int32) |
| LootTable / Quest / Dialogue / Unlock | `FGameplayTag` |

## Voir aussi

- [[HW Inventory Component]] — consomme ces DataTables via les UPROPERTY `UDataTable* ItemLibrary` (pointe sur `DT_InventoryItemLibrary`) et `UDataTable* ItemDataTable` (pointe sur `DT_ItemData`) déclarées dans `HWInventoryComponent.h`.
- [[Inventory Items]] — décrit la struct runtime `FHWInventoryItem` dont `ItemTypeID` sert d'index dans la DataTable pour retrouver une ligne `FHWItemStaticDataStruct` ou `FInventoryItemTypes`.
- [[Data Tables Misc]] — récapitule toutes les structs `FTableRowBase` (`FHWItemStaticDataStruct`, `FInventoryItemTypes`) et leurs DT associées, enrichissant cette page avec les DataAssets primaires (`UHWLootTable`, `UHWQuestData`).
- [[Loot System]] — `UHWLootTable::RollLoot()` produit des `FHWLootResult` dont `ItemTag` (FGameplayTag) doit être résolu contre `DT_All_Items` pour trouver un `FHWItemStaticDataStruct` complet.
