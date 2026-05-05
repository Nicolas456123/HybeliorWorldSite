---
tags: [implementation, ue5, loot, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [refonte-PlayerLevel-Accord]
implements: [L'Accord]
---

# Loot System

> Table de loot (`UHWLootTable`) en DataAsset primaire, consommée par les entités mobiles lors de leur mort.

> [!warning] DETTE TECHNIQUE — voir [[Migration Accord]]
> Les pondérations actuelles utilisent `PlayerLevel` comme entrée pour le scaling de loot. La cible canonique post-refonte est de scaler sur **Accord** (couche 3) + **stats brutes** (couche 1) + **rareté gameplay 6 tiers** (Commun → Mythique — voir [[Armor System]] D-GD-TIERS). Refonte sémantique seule en V3.

## Classe UHWLootTable

**Type :** `UPrimaryDataAsset`
**Source header :** `Source/HybeliorWorld/Public/Inventory/HWLootTable.h`

Chaque loot table définit un ensemble d'items avec probabilités et quantités, identifiés par `FGameplayTag`. Rouletté via `RollLoot()`.

## Intégration runtime

| Acteur | Rôle |
|---|---|
| `AHWGASMobCharacter` | Possède une `TSoftObjectPtr<UHWLootTable>` — rouletté à la mort (voir [[Gameplay Effect]]) |
| `UHWAssetManager` | Découvre les `UHWLootTable` via `StartInitialLoading()` |

## Flux mort → loot

```
AHWGASMobCharacter::OnDeath() [C++]
    ↓
UHWLootTable::RollLoot() → TArray<FHWLootEntry>
    ↓
Spawn items dans monde ou ajout à l'inventaire du tueur
    ↓
UHWInventoryComponent::AddItem() par item droppé
```

## Identification par GameplayTag

Contrairement au runtime inventaire qui utilise `ItemTypeID` (int32), les loot tables référencent les items par `FGameplayTag`. Cohérent avec les systèmes GAS modernes (Quêtes, Dialogues, Unlocks).

## Découverte par l'AssetManager

Les `UPrimaryDataAsset` (LootTable, Quest, Dialogue, Unlock, Moveset) sont découverts automatiquement via `UHWAssetManager` au démarrage. Ils ne nécessitent pas de référence directe dans le code — l'AssetManager les retrouve par type (`FPrimaryAssetId`).

**Config requise dans `DefaultGame.ini`** :
```ini
[/Script/Engine.AssetManagerSettings]
+PrimaryAssetTypesToScan=(PrimaryAssetType="HWLootTable",
  AssetBaseClass="/Script/HybeliorWorld.HWLootTable",
  Directories=((Path="/Game/Data/LootTables")))
```

## Voir aussi

- [[HW Inventory Component]] — destinataire final des drops : chaque `FHWLootResult` retourné par `UHWLootTable::RollLoot()` est converti en `FHWInventoryItem` puis injecté via `UHWInventoryComponent::AddItem()`.
- [[Inventory Items]] — décrit la conversion entre `FHWLootResult` (identifié par `FGameplayTag ItemTag`) et `FHWInventoryItem` (identifié par `ItemTypeID` int32) ; mapping tag→ID nécessaire côté consommateur.
- [[Data Tables Misc]] — `UHWLootTable` est listée dans le tableau des DataAssets primaires ; ses `FHWLootEntry::ItemTag` / `RequiredMasteryType` / `HiddenConditionTag` sont des `FGameplayTag` résolus contre les DT d'items.
- [[Asset Manager]] — `UHWAssetManager` découvre automatiquement les `UHWLootTable` (UPrimaryDataAsset avec `FPrimaryAssetId("LootTable", GetFName())`) déclarés dans `DefaultGame.ini` via `PrimaryAssetTypesToScan`.
