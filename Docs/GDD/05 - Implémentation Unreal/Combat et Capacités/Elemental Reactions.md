---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# ElementalReactions

`UHWElementalReactionSystem` : système statique centralisé de 7 réactions élémentaires entre 4 éléments (Feu, Eau, Glace, Électricité) et 6 conditions (Burning, Wet, Cold, Frozen, Electrified, Charged).

## Sources

- `HWElementalReactionSystem.h` / `.cpp`
- Consommé par [[Combat Attribute Set]]::`PreGameplayEffectExecute()`
- Conditions appliquées via GEs configurés dans [[Gameplay Effect]] (GameMode)

## EHWElementalReaction

8 valeurs : `None, Vaporize, Melt, Overload, Freeze, Superconduct, ElectroCharge, Firestorm(⚠️), Shatter(⚠️)`.

## Matrice de réactions

| Cible | + Feu | + Eau | + Glace | + Électricité |
|-------|-------|-------|---------|---------------|
| **Enflammé** | — | Vaporize (1.5×) | Melt (1.3×) | Firestorm ⚠️ |
| **Mouillé** | Vaporize (1.5×) | — | Freeze → Gelé | ElectroCharge (1.2×) |
| **Froid** | Melt (1.3×) | Freeze → Gelé | — | Superconduct (-30% Def) ⚠️ |
| **Gelé** | Melt (1.3×) → Mouillé | — | — | — |
| **Électrifié** | Firestorm ⚠️ | ElectroCharge (1.2×) | Superconduct ⚠️ | — |
| **Chargé** | Overload (1.5× AoE r=500) | — | Superconduct (-30% Def) ⚠️ | — |

⚠️ **Placeholders** : Firestorm, Superconduct (certains cas), Shatter non implémentés.

## FHWElementalReactionResult

```cpp
EHWElementalReaction ReactionType;
float DamageMultiplier = 1.0f;
bool bRemoveExistingCondition;
FGameplayTag ConditionToRemove;
bool bApplyAoE;
float AoERadius = 0.f;
FGameplayTag ConditionToApply;
float DefenseReductionPercent = 0.f;   // Superconduct : 30.0
bool bSuppressIncomingCondition;
bool bApplyWetAfterReaction;           // Melt sur Gelé
bool bApplyFrozen;
bool bApplyCharged;
```

## API statique

```cpp
static FHWElementalReactionResult CheckReaction(
    const FGameplayTag& IncomingDamageType,
    const FGameplayTagContainer& TargetActiveConditions);

static void ApplyReaction(
    UAbilitySystemComponent* TargetASC,
    const FHWElementalReactionResult& Reaction);
```

## Flow d'exécution

1. Un GE de dégât est appliqué à une cible (serveur).
2. [[Combat Attribute Set]] appelle `CheckReaction(IncomingDamageType, TargetConditions)`.
3. Le résultat modifie le multiplicateur de dégâts et peut appliquer/retirer des conditions via `ApplyReaction()`.
4. Les conditions (Burning, Wet...) sont appliquées comme GEs timés (voir [[Gameplay Effect]]).

## Incohérences connues

- 3 réactions placeholder (Firestorm, Superconduct partiel, Shatter).
- `bShouldApply*` : certains flags de condition sont présents mais non consommés (code mort).
- Relation **Cold vs Frozen** floue : design à clarifier.
- Dépendances GEs manquantes : `ApplyElectrifiedGameplayEffect` et `ApplyChargedGameplayEffect` sont `null` dans le GameMode par défaut.

## Voir aussi

- [[Combat Attribute Set]] — seul consommateur C++ : appelle `CheckReaction()` puis `ApplyReaction()` dans `HandlePreExecuteEffectDamage()`
- [[Gameplay Tags]] — `FHWGameplayTags` lus pour `Combat_DamageType_*` et `Combat_State_*`
- [[Gameplay Effect]] — les conditions Frozen/Charged/Wet/etc. sont appliquées via `TSubclassOf<UGameplayEffect>` côté AttributeSet (pas ici)
- [[Reactions Integration]] — vue d'ensemble du pipeline combat → réaction
- [[Effects Elemental States]] — assets BP des GEs d'état appliqués après réaction
