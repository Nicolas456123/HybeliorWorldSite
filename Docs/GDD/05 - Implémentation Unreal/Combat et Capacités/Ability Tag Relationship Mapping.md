---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# AbilityTagRelationshipMapping

`UHWAbilityTagRelationshipMapping` : DataAsset qui définit les relations de blocage, d'annulation et de prérequis entre tags d'abilities. Consulté par [[Ability System Component]]::`GetAdditionalActivationTagRequirements()`.

## Sources

- `HWAbilityTagRelationshipMapping.h` / `.cpp`
- Asset : `/Game/AbilitySystem/Tags/AbilityTagRelationshipMapping`

## Structure

```cpp
UPROPERTY(EditAnywhere)
TArray<FHWAbilityTagRelationship> AbilityTagRelationships;   // privé

// FHWAbilityTagRelationship :
FGameplayTag AbilityTag;
FGameplayTagContainer AbilityTagsToBlock;
FGameplayTagContainer AbilityTagsToCancel;
FGameplayTagContainer ActivationRequiredTags;
FGameplayTagContainer ActivationBlockedTags;
```

## API publique (3 méthodes)

```cpp
// Itère AbilityTagRelationships ; pour chaque entrée dont AbilityTag ∈ AbilityTags,
// append AbilityTagsToBlock / AbilityTagsToCancel aux sorties (pointeurs nullable).
void GetAbilityTagsToBlockAndCancel(
    const FGameplayTagContainer& AbilityTags,
    FGameplayTagContainer* OutTagsToBlock,
    FGameplayTagContainer* OutTagsToCancel) const;

// Même parcours ; remplit ActivationRequiredTags / ActivationBlockedTags.
// Appelé depuis UHWAbilitySystemComponent::GetAdditionalActivationTagRequirements().
void GetRequiredAndBlockedActivationTags(
    const FGameplayTagContainer& AbilityTags,
    FGameplayTagContainer* OutActivationRequired,
    FGameplayTagContainer* OutActivationBlocked) const;

// Retourne true si une entrée (AbilityTag == ActionTag) possède
// AbilityTagsToCancel.HasAny(AbilityTags).
bool IsAbilityCancelledByTag(
    const FGameplayTagContainer& AbilityTags,
    const FGameplayTag& ActionTag) const;
```

## Notes

- **Performance** : lookup en O(n) avec boucle linéaire. Acceptable pour ≤50 entrées, mais envisager un cache si la table grossit.
- Le mapping est assigné à l'ASC via `UHWAbilitySystemComponent::SetTagRelationshipMapping()`.

## Assets associés
- [[GAS Data Assets]] — asset `AbilityTagRelationshipMapping` et tag DataTables associées

## Voir aussi

- [[Ability System Component]] — stocke ce mapping en `UPROPERTY` et appelle `GetRequiredAndBlockedActivationTags()`
- [[Gameplay Ability]] — `DoesAbilitySatisfyTagRequirements()` passe par l'ASC qui consulte ce mapping
- [[Gameplay Tags]] — `FGameplayTag`/`FGameplayTagContainer` dans `FHWAbilityTagRelationship` (catégorie `Gameplay.Action`)
- [[GAS Data Assets]] — asset BP `AbilityTagRelationshipMapping` référencé via `HWGASPlayerCharacter.h`
