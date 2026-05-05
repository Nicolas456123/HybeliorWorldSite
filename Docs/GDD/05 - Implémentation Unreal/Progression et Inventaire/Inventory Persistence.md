---
tags: [implementation, ue5, progression, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InventoryPersistence

> Sérialisation JSON de l'inventaire via `UOWSPlayerControllerComponent::AddOrUpdateCustomCharacterData()`.

## API de persistance

**Source :** `UHWInventoryComponent` (voir [[HW Inventory Component]])

```cpp
void PersistInventory();                                 // → OWS AddOrUpdateCustomCharacterData
void LoadInventorySerialize(const FString& InventoryJSON);
FString SerializeInventory();                            // JSON via FJsonObjectConverter
void ReloadDisplayItems();                               // Appelé par OnRep_Inventory()
```

## Clés OWS (CustomCharacterData)

| Clé | Contenu | Fréquence |
|-----|---------|-----------|
| `BagInventory` | JSON `FHWInventoryMaster` (bag) | 10s |
| `EquipmentInventory` | JSON `FHWInventoryMaster` (équipement) | 10s |

## Tables OWS legacy (inutilisées)

Les tables SQL OWS suivantes existent en base mais **jamais lues ni écrites** par le code UE5 :
- `CharInventory`
- `CharInventoryItems`
- `CharHasItems`

Le stockage actuel se fait exclusivement via `CustomCharacterData` (couche JSON).

## Flux de chargement au spawn

```
AHWPlayerController::BeginPlay()
    ↓
OWS GetCustomCharacterData("BagInventory")
    ↓
UHWInventoryComponent::LoadInventorySerialize(JSON)
    ↓
FJsonObjectConverter → FHWInventoryMaster
    ↓
Items[] reconstitué (GUID préservés)
    ↓
OnRep_Inventory() → ReloadDisplayItems() → UI
    ↓
EquipAllItems() → restaure équipement actif (GE)
```

## Sérialisation multi-serveur

La persistance se fait par personnage, mais les incohérences OWS restent :
- Sync TimeOfDay entre serveurs OWS incomplète (voir [[HW Environment Manager]])
- Pas de verrouillage à la sérialisation concurrente (theoretical race si perso transit)

## Voir aussi

- [[HW Inventory Component]] — fournit `PersistInventory()` / `LoadInventorySerialize()` / `SerializeInventory()`
- [[Inventory Items]] — structures `FHWInventoryMaster` / `FHWInventoryItem` sérialisées
- [[OWS Architecture]] — cible de `AddOrUpdateCustomCharacterData` (OWSPlayerState)
- [[HW Progression Component]] — partage le même canal `CustomCharacterData` via `SerializeProgression()` / `DeserializeProgression()`
- [[Player Controllers]] — `AHWPlayerController::BeginPlay()` déclenche le chargement
