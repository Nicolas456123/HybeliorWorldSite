---
tags: [implementation, ue5, progression, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# DataTables_Misc

> DataAssets primaires, enums Blueprint, structs C++ et cartographie système ↔ données.

## DataAssets primaires (UPrimaryDataAsset)

Pas de DataTable UE — gérés par `UHWAssetManager` via `FPrimaryAssetId`.

| Classe | Header | Rôle |
|--------|--------|------|
| `UHWLootTable` | `HWLootTable.h` | Table de loot, roulée via `RollLoot()` |
| `UHWQuestData` | `HWQuestData.h` | Définition de quête (objectifs, récompenses, prérequis) |
| `UHWDialogueData` | `HWDialogueData.h` | Arbre dialogue NPC (nœuds + choix) |
| `UHWUnlockDefinition` | `HWUnlockDefinition.h` | Définition unlock caché (conditions → rewards) |
| `UHWWeaponMoveset` | `HWWeaponMoveset.h` | Moveset complet d'un type d'arme (combos, finishers, skills) |

## Enums Blueprint

Assets `.uasset` dans `Content/Data/Enums/` — complémentaires aux enums C++.

### E_CombatStyle

| Propriété | Valeur |
|-----------|--------|
| Fichier | `Content/Data/Enums/E_CombatStyle.uasset` |
| Equivalent C++ | `EHWWeaponType` (dans `HWWeaponMasteryComponent.h`) |

Styles de combat (Sword, Axe, Mace, Dagger, Bow, Staff, Spear, Shield). Version BP-friendly de `EHWWeaponType`.

**Usages :** `UHWWeaponMasteryComponent`, `UHWWeaponMoveset`, Animation BP.

### E_MovementType

| Propriété | Valeur |
|-----------|--------|
| Fichier | `Content/Data/Enums/E_MovementType.uasset` |
| Systèmes liés | `HWPlayerAnimInstance`, locomotion |

Types de déplacement (Marche, Course, Sprint, Saut, Vol, Nage).

**Usages :** AnimInstance state machine, coût stamina, `CheckForLandingWhileFlying()`.

## Structs C++ FTableRowBase

Récapitulatif complet des structs consommées par les DataTables :

| Struct | Header | DataTable(s) |
|--------|--------|--------------|
| `FHWItemStaticDataStruct` | `HWItemStaticData.h` | DT_All_Items, DT_ItemData |
| `FInventoryItemTypes` | `HWInventoryComponent.h` | DT_InventoryItemLibrary |
| `FHWCharacterDataAsset` | `HWCharacter.h` | DT_CharacterDataAsset |
| `FHWCharacterAppearanceCE` | `HWCharacter.h` | DT_CharacterAppearancePreset |
| `FHWAnatomyProfile` | `HWCharacterCustomComponent.h` | DT_AnatomyProfiles |
| `FCombatStateIconsDataTableRow` | `HWGASCharacter.h` | CombatStateIcons |

## Cartographie systèmes → DataTables

```
Système Inventaire
  ├─ DT_All_Items (FHWItemStaticDataStruct)
  ├─ DT_InventoryItemLibrary (FInventoryItemTypes)
  └─ DT_ItemData (FHWItemStaticDataStruct)

Système Équipement
  ├─ DT_All_Items → slots via EEquipmentSlot
  └─ GameplayEffects générés depuis FHWCara

Système Personnalisation (C++)
  ├─ DT_CharacterDataAsset
  ├─ DT_CharacterAppearancePreset
  └─ DT_AnatomyProfiles, DT_PresetCustomizationProfiles, DT_MorphTargetWrinkleParameters

Système Loot            → UHWLootTable (DataAsset)
Système Quêtes          → UHWQuestData (DataAsset)
Système Dialogues NPC   → UHWDialogueData (DataAsset)
Progression cachée      → UHWUnlockDefinition (DataAsset)
Combat Moveset          → UHWWeaponMoveset (DataAsset)
Combat States (UI)      → CombatStateIcons DataTable
Enums BP                → E_CombatStyle, E_MovementType
```

## Dossier Import (H:/HybeliorWorld_Project/HybeliorWorld_5.4/Import/)

Contenu actuel — **aucun CSV/JSON d'import DataTable**. Uniquement des images :
- `BurningIcon01.png` — icône Burning
- `logout_FILL0_wght400_GRAD0_opsz48.png` + variantes — icônes déconnexion

Les données de jeu sont gérées directement dans les `.uasset` via l'éditeur UE5.

## Notes d'architecture

### Chargement des DataAssets

`UPrimaryDataAsset` (LootTable, Quest, Dialogue, Unlock, Moveset) découverts par `UHWAssetManager::StartInitialLoading()`. Pas de référence directe nécessaire — l'AssetManager les retrouve par type.

### Enum C++ vs Enum Blueprint

Tous les enums C++ (`EItemType`, `EItemSubCategory`, `EEquipmentSlot`, `ECara`, `EHWWeaponType`, `EHWAnatomy`) sont exposés `BlueprintType`. Les deux assets `.uasset` (E_CombatStyle, E_MovementType) sont BP purs — vestiges avant migration C++ ou maintenance pour BP ne pouvant référencer les enums C++.

### Sérialisation OWS

Structs de personnage (`FHWCharacterAppearanceCE`, `FHWChangeCharacterData`, `FHWInventoryMaster`) disposent de méthodes JSON (`SerializeX` / `LoadXFromJSON`) pour la persistance OWS .NET.

## Voir aussi

- [[Data Tables Items]] — instances concrètes des structs `FHWItemStaticDataStruct` et `FInventoryItemTypes` déclarées ici dans `HWItemStaticData.h` / `HWInventoryComponent.h`, consommées par les trois DataTables d'items.
- [[Asset Manager]] — `UHWAssetManager::StartInitialLoading()` découvre tous les `UPrimaryDataAsset` listés ici (`UHWLootTable`, `UHWQuestData`, `UHWDialogueData`, `UHWUnlockDefinition`, `UHWWeaponMoveset`) via leur `FPrimaryAssetId` surchargé (ex. `UHWLootTable::GetPrimaryAssetId` retourne `FPrimaryAssetId("LootTable", GetFName())`).
- [[Quest System]] — consommateur de `UHWQuestData` dont `FHWQuestObjective` / `FHWQuestReward` sont détaillées dans la section DataAssets primaires ci-dessus.
- [[Loot System]] — consommateur de `UHWLootTable` (DataAsset primaire listé dans le tableau) qui expose `RollLoot(PlayerLevel, LuckMultiplier)`.
