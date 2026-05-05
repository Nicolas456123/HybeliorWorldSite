---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# ComboSystem

`UHWComboComponent` : composant de personnage qui gère les chaînes de combos via un moveset actif, la fenêtre de combo, le filtrage par mastery, et les notifications d'événements.

## Sources

- `HWComboComponent.h` / `HWComboComponent.cpp`
- Stamina directe : `HWComboComponent.cpp:286`
- PlayRate : `HWComboComponent.cpp:318`

## API publique

```cpp
void SetActiveMoveset(UHWWeaponMoveset* NewMoveset);
UHWWeaponMoveset* GetActiveMoveset() const;
bool TryAttack(FGameplayTag ComboTag);       // true si attaque lancée
void NotifyHitConfirmed();                    // +10 XP mastery
bool IsInComboWindow() const;
void ResetCombo();
int32 GetCurrentComboIndex() const;          // -1 si hors combo
bool GetCurrentAttack(FHWComboAttack& OutAttack) const;
```

## Delegates

```cpp
FOnComboAttack OnComboAttack;       // (ComboIndex, Attack) à chaque attaque
FOnComboFinished OnComboFinished;   // Quand le finisher est lancé
FOnComboReset OnComboReset;         // (ReachedIndex) au reset/timeout
```

## Flow de TryAttack(ComboTag)

1. Vérifier moveset actif (voir [[Movesets]]).
2. Trouver la chaîne combo (`FHWComboChain`) avec ce tag.
3. Vérifier `MasteryLevel` joueur ≥ `RequiredMasteryLevel` de la chaîne (voir [[Weapon Mastery]]).
4. Filtrer les attaques (`RequiredMasteryLevel` + `HiddenUnlockCondition`).
5. Déterminer index suivant :
   - Dans fenêtre ET même tag → `NextIndex = CurrentComboIndex + 1`
   - Dans fenêtre ET tag différent → reset + `NextIndex = 0`
   - Hors fenêtre → `NextIndex = 0`
6. Si `NextIndex >= Attacks.Num()` → c'est le finisher.
7. Vérifier/consommer stamina.
8. Jouer montage avec `PlayRate = BaseAttackSpeed`.
9. Démarrer timer fenêtre (`ComboWindowDuration`, défaut 0.8s).
10. Broadcaster les délégués.

## Intégration chaîne combat (C++ → BP → C++)

```
InputTag.Weapon.Left (C++ HWGASPlayerCharacter) → GA_SwordAttack (BP)
    ↓ GA_SwordAttack::ActivateAbility()
UHWComboComponent::TryAttack(Combo.Light) [C++]
    ↓ FHWComboChain::Attacks[CurrentIndex]
Attack_01_Seq_Montage (BP asset) → AnimInstance
    ↓ Notify → NotifyHitConfirmed()
UHWWeaponMasteryComponent::AddMasteryExperience(Sword, 10) [C++]
```

> **MAJ 2026-04-07** : tous les inputs combat (weapon left/right, dash, sprint, crouch, etc.) sont maintenant gérés entièrement en C++ dans `HWGASPlayerCharacter`. Les event graphs BP de `BP_PlayerCharacter_CE` ont été supprimés. La visibilité de l'arc (bow) et la mise à jour du targeting sont également gérées dans le Tick C++.

## Delegates combo (C++ → BP)

```cpp
OnComboAttack(ComboIndex, Attack)  // Broad. → BP UI SkillBarWidget
OnComboFinished()                   // Broad. → BP feedback finisher
OnComboReset(ReachedIndex)          // Broad. → BP reset animations
```

## GA_SwordAttack (MCP confirmé)

- `ActivationRequiredTags = {Combat.State.ReadyToFight}`
- `ActivationBlockedTags = {Combat.State.Dead, Combat.State.Frozen}`
- Montage → `Attack_01_Seq_Montage`

## GA_Combo2 (mécanique combo window)

- `ActivationRequiredTags = {Combat.Combo.Window.1}` — set par `GE_ComboWindow01` (0.8s)
- `ability_name = "Combo2"` — clé consommée par `GetFloatValueFromCombatData()` (voir [[Gameplay Ability]])

## Incohérences connues

- **Stamina modifiée directement** sur l'AttributeSet sans GameplayEffect → non répliquée aux clients.
- `BaseAttackSpeed` fixe, **ignore bonus mastery** (`PlayRate = ActiveMoveset->BaseAttackSpeed` uniquement, `AttackSpeedBonus` jamais ajouté).
- `HiddenUnlockCondition` ET `RequiredMasteryLevel` : filtres dupliqués (mineur).
- `CurrentComboIndex = -1` convention fragile (mineur).
- Delegates sans abonnés visibles en C++ (BP uniquement), considéré normal.

## Voir aussi

- [[Movesets]] — `TObjectPtr<UHWWeaponMoveset> ActiveMoveset`, itère `ComboChains` pour résoudre `FHWComboChain`/`FHWComboAttack`
- [[Weapon Mastery]] — `CachedMasteryComponent->GetMasteryData()` lit le niveau, `AddMasteryExperience()` appelé par `NotifyHitConfirmed()`
- [[Combat Attribute Set]] — `GASChar->GetCombatAttributes()` pour lire/muter `Stamina` (`HasEnoughStamina` / `ConsumeStamina`)
- [[Ability System Component]] — `GASChar->GetHWAbilitySystemComponent()->HasMatchingGameplayTag()` pour filtrer `HiddenUnlockCondition`
- [[HW GAS Player Character]] — hub domaine 02 : instancie ce composant via `CreateDefaultSubobject<UHWComboComponent>` (HWGASCharacter accessible transitivement)
- [[Reactions Integration]] — ce composant amorce le pipeline documenté dans ReactionsIntegration : `TryAttack()` déclenche `PlayAttackMontage()` (`HWComboComponent.cpp:304`), puis `FHWComboAttack::DamageType` (via Movesets) est porté par le GE appliqué, et finit dans `UHWCombatAttributeSet::HandlePreExecuteEffectDamage` qui appelle `UHWElementalReactionSystem::CheckReaction`.
- [[Abilities Combat]] — les GA BP du catalogue (GA_SwordAttack, GA_UnarmedAttack, GA_BasicAttack) sont le consommateur principal de `UHWComboComponent::TryAttack(FGameplayTag ComboTag)` (`HWComboComponent.h:33`) qui à son tour utilise `ActiveMoveset` pour résoudre la séquence d'attaques.
