---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Persistance — Flux Save/Load

Toutes les clés de Custom Character Data utilisées côté serveur pour persister l'état du joueur via l'API OWS.

## Clés de persistance

| Clé OWS | Sauvegardé par | Chargé dans |
|---|---|---|
| `"OftenChangeCharacterData"` | `PersistCharacterData("OftenChangeCharacterData")` | `GetHWGASPlayerCharacter()->LoadOftenChangeCharacterDataFromJSON()` |
| `"ChangeCharacterData"` | `PersistCharacterData("ChangeCharacterData")` | `GetHWGASPlayerCharacter()->LoadChangeCharacterDataFromJSON()` |
| `"RarelyChangeCharacterData"` | `PersistCharacterData("RarelyChangeCharacterData")` | `GetHWGASPlayerCharacter()->LoadRarelyChangeCharacterDataFromJSON()` |
| `"CharacterAppearance"` | `PersistCharacterData("CharacterAppearance")` | `GetHWGASPlayerCharacter()->LoadCharacterAppearanceFromJSON()` |
| `"CharacterAppearanceCE"` | `PersistCharacterData("CharacterAppearanceCE")` | `GetHWGASPlayerCharacter()->LoadCharacterAppearanceCEFromJSON()` |
| `"BaseCharacterSkills"` | (via BP) | `GetHWGASPlayerCharacter()->LoadBaseCharacterSkillsFromJSON()` |
| `"CharacterCustomization"` | `SaveCharacterCustomization()` | `LoadCharacterCustomization()` |
| `"SupplyPodsOpened"` | `AddSupplyPodToOpenedList()` | `LoadSupplyPodsOpenedFromJSON()` |
| `"ContainersOpened"` | `AddContainerToOpenedList()` | `LoadContainersOpenedFromJSON()` |
| `"WeaponMastery"` | `SaveWeaponMastery()` | `LoadWeaponMastery()` → `UHWWeaponMasteryComponent::SetAllMasteryData()` |
| `"CharacterProgression"` | `SaveCharacterProgression()` | `LoadCharacterProgression()` → `UHWProgressionComponent::DeserializeProgression()` |
| `"SkillBar"` | `SaveSkillBar()` | `LoadSkillBar()` → `UHWSkillBarComponent::DeserializeSkillBar()` |
| `"QuestProgress"` | `SaveQuestProgress()` | `LoadQuestProgress()` → `UHWQuestComponent` |
| `"*Inventory*"` | `UHWInventoryComponent::PersistInventory()` | `UHWInventoryComponent::LoadInventorySerialize()` |

## Timers de persistance

| Timer | Période | Rôle |
|---|---|---|
| `PersistenceDataTimer` | 10 s (loop) | `RunPersistenceData()` côté serveur (OftenChangeCharacterData + inventaires) |
| `AutoSaveProgressionTimer` | 300 s / 5 min (loop) | `SaveAllProgression()` (mastery, progression, skill bar, quêtes) |
| `PersistChangeDelayTimer` | Délai unique | Déclenche `PersistChangeCharacterData()` avec un décalage dans `RunPersistenceData` |

`SaveAllProgression()` regroupe : `SaveWeaponMastery` + `SaveCharacterProgression` + `SaveSkillBar` + `SaveQuestProgress`.

## Flush au logout (`PawnLeavingGame`)

Ordre critique (évite la race condition) :
1. `BagInventory->PersistInventory()`
2. `EquipmentInventory->PersistInventory()`
3. `PersistCharacterData("OftenChangeCharacterData")`
4. `PersistCharacterData("ChangeCharacterData")`
5. `PersistCharacterData("RarelyChangeCharacterData")`
6. `SaveAllProgression()`
7. **Puis seulement** : annulation des timers.

## Structures Fast Array répliquées

### `FHWSupplyPodOpenedItem` / `FHWSupplyPodMaster`
Réplication différentielle pour les supply pods ouverts.

| Structure | Base | Description |
|---|---|---|
| `FHWSupplyPodOpenedItem` | `FFastArraySerializerItem` | Un item : `SupplyPodGUID` (FGuid) |
| `FHWSupplyPodMaster` | `FFastArraySerializer` | Tableau répliqué — `WithNetDeltaSerializer = true` |

### `FHWContainerOpenedItem` / `FHWContainerMaster`
Identique à Supply Pod pour les conteneurs du monde.

## Voir aussi
- [[Serialization Format]] — template `FHWJsonSerializer` utilisé pour toutes les clés
- [[Serialization Format]] — `FHWJsonSerializer<T>` utilisé pour tous les `Persist*`/`Load*FromJSON`
- [[Player Controllers]] — `AHWPlayerController::PersistCharacterData`, `RunPersistenceData`, `PawnLeavingGame`, timers (hub qui orchestre toutes les données listées ci-dessus)
- [[Initialization Sequence]] — étape `"CUSTOMCHARACTERDATA"` déclenche les `LoadXxxFromJSON`
- [[../03_Progression_Inventory/InventoryPersistence]] — pendant côté Inventory
- [[../08_Backend_OWS/OWSArchitecture]] — destination API OWS `CustomCharacterData`
