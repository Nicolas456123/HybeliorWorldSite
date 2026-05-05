---
tags: [implementation, ue5, quest, component]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [aligner-recompenses-accord]
implements: [L'Accord]
---

# HW Quest Component

> Composant quêtes visibles joueur. Source : `Source/HybeliorWorld/Public/Progression/HWQuestComponent.h/.cpp`

> [!warning] REFONTE SÉMANTIQUE — voir [[Quest System]] et [[Migration Accord]]
> Le composant continue d'appliquer les `Reward` de la struct `FHWQuestReward` au moment de la complétion. Conceptuellement, l'application de `ExperienceReward` (int) doit être réinterprétée comme **`AccordGain`** dans `UHWProgressionComponent::CurrentEraAccord` (couche 3) ; les items et titres alimentent le **Héritage** (couche 4).

Monté sur `AHWGASPlayerCharacter`. Gère acceptation, progression et complétion des quêtes déclarées en `UHWQuestData` DataAssets.

## EHWQuestType (6 valeurs)

MainStory, Side, Daily, Weekly, Hidden, Chain

## EHWQuestStatus (6 états)

```
Unknown → Discovered → Active → Completed
                     ↓
               Abandoned / Failed
```

Codes : 0=Unknown, 1=Discovered, 2=Active, 3=Completed, 4=Failed, 5=Abandoned

## API principale

```cpp
bool AcceptQuest(FGameplayTag QuestID);
bool AbandonQuest(FGameplayTag QuestID);
void UpdateQuestProgress(EHWConditionType Type, FGameplayTag SubjectTag, float Amount = 1.0f);
void DiscoverQuest(FGameplayTag QuestID);

// Queries
EHWQuestStatus GetQuestStatus(FGameplayTag QuestID) const;
bool IsQuestActive(FGameplayTag QuestID) const;
bool IsQuestCompleted(FGameplayTag QuestID) const;
TArray<FGameplayTag> GetActiveQuests() const;
TArray<FGameplayTag> GetCompletedQuests() const;
TArray<FHWQuestObjective> GetQuestObjectives(FGameplayTag QuestID) const;

// Sérialisation
FString SerializeQuests() const;
void DeserializeQuests(const FString& JSON);
```

## Délégués

```cpp
FOnQuestAccepted OnQuestAccepted;                // (QuestID, QuestData*)
FOnQuestCompleted OnQuestCompleted;              // (QuestID, Rewards)
FOnQuestObjectiveUpdated OnQuestObjectiveUpdated; // (QuestID, ObjectiveIndex, NewProgress)
FOnQuestDiscovered OnQuestDiscovered;            // (QuestID, QuestData*)
```

## Flux AcceptQuest()

1. Valider QuestID et QuestData
2. Vérifier statut (pas Active ou Completed/!Repeatable)
3. Vérifier PrerequisiteQuests (tous Completed)
4. Définir Status = Active
5. Init progression objectifs à 0.0 (clé `"QuestID_ObjectiveIndex"`)
6. Broadcast `OnQuestAccepted`

## Flux CheckQuestCompletion()

```
1. Pour chaque objectif : CurrentProgress >= TargetValue ?
2. Si tous : Status = Completed
3. ApplyQuestRewards() → Log (XP/Gold TODO) + IncrementProgress(QuestCompleted)
4. Broadcast OnQuestCompleted
5. Si NextQuestInChain valide → DiscoverQuest(NextQuestInChain)
```

## Convention de tags de quête

```
Quest.NomQuete              → identifiant base
Quest.NomQuete.InProgress   → quête acceptée
Quest.NomQuete.Completable  → conditions remplies
Quest.NomQuete.Completed    → quête terminée
```

## Triggers de localisation (AHWLocationTrigger)

```cpp
FGameplayTag LocationTag;     // "Location.Continent.Zone.Area"
FText LocationName;
UBoxComponent* TriggerBox;    // 500x500x200 cm
```

**OnOverlap (serveur uniquement)** :
1. `ProgressionComponent->MarkLocationVisited(LocationTag)`
2. `QuestComponent->UpdateQuestProgress(LocationVisited, LocationTag, 1.0f)`

## Incohérences (8)

| # | Problème | Impact |
|---|---------|--------|
| 1 | Récompenses XP/Gold loggées seulement | Jamais accordées au joueur |
| 2 | DiscoveryConditions jamais vérifiées | Quêtes Hidden jamais découvertes auto |
| 3 | TimeLimitSeconds jamais utilisé | Quêtes temporisées ne peuvent pas échouer |
| 4 | RequiredLocation commenté TODO | Objectif progressable partout |
| 5 | PrimaryAssetType non enregistrés | AssetManager peut ne pas découvrir les assets |
| 6 | DiscoveryConditions + NextQuestInChain non liés | Hidden-chain jamais découvertes |
| 7 | Unlock → Quête non notifié | Progression↔quêtes unidirectionnel |
| 8 | TMap non répliquée nativement | Workaround TArray |

## Voir aussi

- [[Quest System]] — vue d'ensemble workflow quêtes
- [[HW Progression Component]] — appelé par `ApplyQuestRewards()` via `IncrementProgress(QuestCompleted, ...)`
- [[HW GAS Player Character]] — hub domaine 02 : owner (`CreateDefaultSubobject<UHWQuestComponent>`) ; `UHWNPCComponent::HasQuestForPlayer()` partage la convention de tags `Quest.XXX.InProgress/Completable`
- [[Data Tables Misc]] — référence `UHWQuestData` DataAssets chargés via AssetManager
- [[Asset Manager]] — `LoadQuestDefinitions()` utilise `UAssetManager::Get()`
