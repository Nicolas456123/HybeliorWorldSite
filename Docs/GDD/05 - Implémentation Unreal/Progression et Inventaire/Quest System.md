---
tags: [implementation, ue5, quest, accord]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [refonte-FHWQuestReward]
implements: [L'Accord]
---

# Quest System

> Structures de données des quêtes : objectifs, récompenses, DataAsset. Voir [[HW Quest Component]] pour l'API runtime.

## Refonte sémantique récompenses (Souffle/Accord/Ères)

> [!warning] DETTE TECHNIQUE — voir [[Migration Accord]]
> Les structs `FHWQuestReward` exposent toujours `ExperienceReward` (int) et `GoldReward` (int). Conceptuellement, la refonte impose la translation suivante :
>
> - `ExperienceReward` → **`AccordGain`** (FLOAT 0-100 — % d'Accord gagné dans l'ère en cours, voir [[L'Accord]])
> - `GoldReward` → conservé tel quel (monnaie reste valide)
> - **Nouveaux champs cibles** :
>   - `FHWHeritageGain` (titres, recettes, lore entries, accès zones — alimente [[HW Progression Component]] couche 4)
>   - `ItemRewards` (existant) — items concrets (rareté gameplay 6 tiers : Commun, Inhabituel, Rare, Épique, Légendaire, Mythique — distincte de la catégorisation visuelle T1-T7 ROG)
>
> Aucune réécriture du code en V3 — la refonte est documentaire. L'implémentation des nouveaux champs est planifiée post-V4.

## FHWQuestObjective

```cpp
FText Description;
EHWConditionType ConditionType;
FGameplayTag SubjectTag;
float TargetValue;
EHWConditionVisibility Visibility;
FGameplayTag RequiredLocation;    // TODO : non validé au runtime
float CurrentProgress;            // Runtime
```

## FHWQuestReward

```cpp
int32 ExperienceReward;           // Loggé uniquement, jamais appliqué
int32 GoldReward;                 // Loggé uniquement
TMap<FGameplayTag, int32> ItemRewards;
FGameplayTag UnlockReward;        // Déverrouillage progression (intégré)
TMap<FGameplayTag, int32> ReputationRewards;
```

## DataAsset UHWQuestData

**Type :** `UPrimaryDataAsset`
**Source header :** `Source/HybeliorWorld/Public/Progression/HWQuestData.h`

```cpp
FGameplayTag QuestID;
FText QuestName, QuestDescription;
EHWQuestType QuestType;
int32 RecommendedLevel;
TArray<FHWQuestObjective> Objectives;
FHWQuestReward Rewards;
TArray<FGameplayTag> PrerequisiteQuests;
FGameplayTag NextQuestInChain;        // Découverte auto après complétion
TArray<FHWUnlockCondition> DiscoveryConditions;  // Jamais vérifiées (TODO)
FGameplayTag QuestGiverTag;
FGameplayTag AcceptDialogueID;
FGameplayTag CompleteDialogueID;
float TimeLimitSeconds;               // Jamais utilisé
bool bRepeatable;
```

## Configuration AssetManager requise

PrimaryAssetTypes non enregistrés (incohérence). À ajouter dans `DefaultGame.ini` :

```ini
[/Script/Engine.AssetManagerSettings]
+PrimaryAssetTypesToScan=(PrimaryAssetType="QuestData",
  AssetBaseClass="/Script/HybeliorWorld.HWQuestData",
  Directories=((Path="/Game/Data/Quests")))
+PrimaryAssetTypesToScan=(PrimaryAssetType="HWUnlockDefinition",
  AssetBaseClass="/Script/HybeliorWorld.HWUnlockDefinition",
  Directories=((Path="/Game/Data/Unlocks")))
```

## Arbre de quête (Chain)

`NextQuestInChain` permet d'enchaîner des quêtes automatiquement après complétion. La découverte est auto (DiscoverQuest appelée) mais **DiscoveryConditions ne sont pas vérifiées** — TODO non résolu.

## Flux complet accept → complete

```
NPC QuestGiver
    ↓ [Dialogue AcceptDialogueID]
AcceptQuest(QuestID)
    ↓
FHWQuestObjective initialisés à 0.0
    ↓
Gameplay events → UpdateQuestProgress()
    ↓
CurrentProgress >= TargetValue pour tous les objectifs ?
    ↓ OUI
Status = Completed
    ↓
ApplyQuestRewards() (Log XP/Gold + IncrementProgress QuestCompleted)
    ↓
DiscoverQuest(NextQuestInChain) si défini
```

## Voir aussi

- [[HW Quest Component]] — API runtime qui charge les `UHWQuestData` dans `QuestDataCache` (TMap<FGameplayTag, TObjectPtr<UHWQuestData>>) via `LoadQuestDefinitions()` puis expose `AcceptQuest()`, `UpdateQuestProgress()`, `GetQuestObjectives()`.
- [[HW Progression Component]] — consommateur des `FHWQuestReward::UnlockReward` : quand `UHWQuestComponent::ApplyQuestRewards()` se termine, il appelle `IncrementProgress(EHWConditionType::QuestCompleted, QuestID)` pour déclencher les unlocks dépendants.
- [[Data Tables Misc]] — `UHWQuestData` est listée dans le tableau des DataAssets primaires ; les structs `FHWQuestObjective` / `FHWQuestReward` de ce document proviennent de `HWQuestData.h`.
- [[Asset Manager]] — `UHWQuestComponent::LoadQuestDefinitions()` appelle `UAssetManager::Get()` (ligne 449 de `HWQuestComponent.cpp`) pour découvrir tous les `UHWQuestData` déclarés via `PrimaryAssetTypesToScan`.
