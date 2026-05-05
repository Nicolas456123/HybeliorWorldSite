---
tags: [implementation, ue5, progression, accord]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [refonte-semantique-accord, ajout-types-EraConcorded]
implements: [L'Accord, Le Souffle, Les Ères]
---

# HW Progression Component

> Progression cachée automatique. Source : `Source/HybeliorWorld/Public/Progression/HWProgressionComponent.h/.cpp`

## Refonte Souffle/Accord/Ères : ce que ce composant représente désormais

> Le composant `UHWProgressionComponent` reste **techniquement** identique : il pilote les unlocks cachés via la table `EHWConditionType` (kills, réactions, combos, visites, stats) et la table `EHWRewardType` (titres, abilities, recettes, etc.).
>
> **Conceptuellement**, il devient le **moteur d'Héritage** ([[L'Accord]] couche 4) : c'est ici qu'on déclenche les `Title`, `LoreEntry`, `AccessToArea` qui jalonnent la progression visible du joueur.
>
> La progression "vraie" du joueur (couche 3) — `CurrentEraAccord` 0-100 % et `ConcordedErasCount` — ne vit pas dans cette enum mais doit y être branchée via 3 nouveaux types à ajouter (recommandation V3, à implémenter post-V4) :
>
> - `AccordReached` : déclenché quand `CurrentEraAccord` atteint un palier (ex. 25 / 50 / 75 / 100)
> - `EraConcorded` : déclenché à la fin d'une ère où l'Accord a atteint 100 % → titre permanent
> - `SouffleSurvived` : déclenché à chaque [[Le Souffle]] traversé → trace dans Héritage
>
> Voir [[Migration Accord]] pour la stratégie d'ajout de ces colonnes côté SQL et leur exposition côté UI.

Monté sur `AHWGASPlayerCharacter`. Gère les unlocks cachés déclenchés automatiquement par les événements gameplay (kills, réactions, combos, visites, stats).

## EHWConditionType (11 valeurs)

| Type | Description | Mise à jour |
|------|-------------|-------------|
| MasteryLevel | Maîtrise arme >= X | SetProgress() |
| KillCount | Kills avec arme/élément | IncrementProgress() |
| ReactionCount | Réactions élémentaires | IncrementProgress() |
| AbilityUseCount | Utilisations d'une ability | IncrementProgress() |
| LocationVisited | Lieu visité | MarkLocationVisited() |
| ItemObtained | Posséder item spécifique | IncrementProgress() |
| QuestCompleted | Quête terminée | IncrementProgress() |
| StatThreshold | Attribut >= valeur | SetProgress() |
| TimePlayed | Temps joué avec arme | IncrementProgress() |
| ComboAchieved | Combo exécuté | MarkComboAchieved() |
| Hidden | Condition Blueprint custom | — |

## EHWConditionVisibility (4 valeurs)

| Valeur | Affichage joueur |
|--------|-----------------|
| Visible | "10/50 kills d'orcs" |
| Hint | "Maîtrisez davantage l'épée..." |
| Hidden | Rien (révélé au déverrouillage) |
| RevealOnProgress | Caché → révélé à 50% |

## Stockage interne (clé composite)

```
"ConditionType_SubjectTag"
"0_Weapon.Sword" → 42
"4_Location.Village" → 1.0
"1_Element.Fire" → 15
```

Workaround réplication : TMap runtime + TArray repliqué (`Rep_ProgressionData`).

## DataAsset UHWUnlockDefinition

```cpp
FGameplayTag UnlockID;
EHWConditionOperator ConditionOperator;  // AND ou OR
TArray<FHWUnlockCondition> Conditions;
TArray<FHWUnlockableReward> Rewards;
TArray<FGameplayTag> PrerequisiteUnlocks;
bool bCompletelyHidden;
```

**Flux automatique** : `IncrementProgress()` → `CheckAllUnlocks()` → cascade si nouveaux unlocks

## EHWRewardType (10 valeurs)

Ability, PassiveEffect, WeaponCombo, Recipe, Title, Emote, LoreEntry, StatBonus, AccessToArea, CustomReward

## API principale

```cpp
void IncrementProgress(EHWConditionType Type, FGameplayTag SubjectTag, float Amount);
void SetProgress(EHWConditionType Type, FGameplayTag SubjectTag, float Value);
bool IsUnlocked(FGameplayTag UnlockID) const;
float GetProgress(EHWConditionType Type, FGameplayTag SubjectTag) const;
void MarkLocationVisited(FGameplayTag LocationTag);
void MarkComboAchieved(FGameplayTag ComboTag);
FString SerializeProgression() const;
void DeserializeProgression(const FString& JSON);
```

## Délégués

```cpp
FOnUnlockAchieved OnUnlockAchieved;          // (UnlockID, Rewards[])
FOnProgressUpdated OnProgressUpdated;         // (ConditionType, SubjectTag, NewProgress)
```

## JSON de persistance

```json
{
  "progression": {"0_Weapon.Sword": 42, "4_Location.Village": 1.0},
  "unlocked": ["Unlock.OrcSlayer"],
  "visitedLocations": ["Location.Village", "Location.Forest"]
}
```

## Intégration combat

```cpp
// Kill ennemi
ProgressionComponent->IncrementProgress(KillCount, EnemyTag, 1.0f);

// Réaction élémentaire
ProgressionComponent->IncrementProgress(ReactionCount, ElementTag, 1.0f);

// Mise à jour mastery (valeur absolue)
ProgressionComponent->SetProgress(MasteryLevel, WeaponTag, 25.0f);
```

## Voir aussi

- [[HW Quest Component]] — appelle `IncrementProgress(QuestCompleted, ...)` depuis `HWQuestComponent.cpp`
- [[Quest System]] — cadre global quêtes/unlocks
- [[HW GAS Player Character]] — owner (`CreateDefaultSubobject<UHWProgressionComponent>`)
- [[Combat Attribute Set]] — hub domaine 01 : source principale de `IncrementProgress(KillCount/ReactionCount, ...)` ; `WeaponMasteryComponent` et rewards `StatBonus` (`GameplayEffect` applique via `GetOwnerASC`) passent par la meme pipeline GAS
- [[Inventory Persistence]] — `SerializeProgression()` stocké via le même flux OWS CustomCharacterData
