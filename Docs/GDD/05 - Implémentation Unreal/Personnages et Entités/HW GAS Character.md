---
tags: [implementation, ue5, character, gas]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [mapping-8-stats-brutes]
implements: [Le Souffle, L'Accord]
---

# HW GAS Character

Classe `AHWGASCharacter` — couche d'intégration GAS (Gameplay Ability System) au-dessus de [[HW Character]]. Toutes les entités et joueurs héritent de cette classe.

> [!info] Refonte 8 stats brutes — voir [[HW Character]]
> Cette classe pilote `UHWCombatAttributeSet`. Le mapping vers les 8 stats brutes canoniques (Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe) + 4 fondamentales (Vitalité, Souffle, Présence, Conscience) est documenté dans [[HW Character]] §"Refonte sémantique stats" et [[Combat Attribute Set]].

## Composants

- `UHWAbilitySystemComponent` (AbilitySystem) — composant ASC
- `UHWCombatAttributeSet` (CombatAttributeSet) — attributs de combat
- `MeleeHitBox` — boite de collision pour melee

## Initialisation GAS

- Cote serveur : `PossessedBy()` → init ASC + grant abilities
- Cote client : `OnRep_Controller()` → init ASC cote client

Ce double-init est requis par la replication GAS standard.

## Reactions elementaires

L'ASC ecoute les tags elementaires et applique des effets via des handlers :

| Tag / Effect | Role |
|--------------|------|
| `BurningEffect` | Damage over time Fire |
| `WetEffect` | Etat mouille (combos elementaires) |
| `ColdEffect` | Ralentissement |
| `ChargedEffect` | Electrified (combo avec Wet = Shock) |

Voir [[Elemental Reactions]] pour les formules completes.

## Formules de combat

```cpp
Attack   = min(Strength * 10, 9999)
CritRate = clamp(Agility * 0.5, 0, 100)
```

> **Note :** l'attribut `Constitution` est declare mais jamais utilise dans les formules actuelles (incoherence connue).

## Methode clef

| Methode | Role |
|---------|------|
| `HealthChanged()` | BlueprintImplementableEvent — override par widgets UI BP pour mettre a jour la barre HP |

## Lien AnimInstance

`AHWGASCharacter` est le type de cast utilise par [[Anim Instance]] via `TryGetPawnOwner()`. L'AnimInstance accede a l'ASC via `GetAbilitySystemComponent()`.

## Incoherences connues

- Source de verite attributs ambigue : `CalculateCombatAttributes` vs `UpdateChangeCharacterData`
- `UIRelatedTagsChanged` dispatche seulement cote client
- `Constitution` declare mais non utilise

## Voir aussi

- [[HW Character]] — classe parente declaree `AHWGASCharacter : public AHWCharacter` (`HWGASCharacter.h:69`) ; les structs `FHWOftenChangeCharacterData` / `FHWChangeCharacterData` du parent sont synchronisees via `UpdateOftenChangeCharacterDataWithAttribute()` et `UpdateChangeCharacterDataWithAttribute()` declarees ici.
- [[HW GAS Player Character]] — classe derivee declaree `AHWGASPlayerCharacter : public AHWGASCharacter` (`HWGASPlayerCharacter.h:37`) ; override `HealthChanged_Implementation` / `ManaChanged_Implementation` / `StaminaChanged_Implementation` / `EnergyChanged_Implementation` sur les BlueprintNativeEvent definis ici (`HWGASCharacter.h:184-200`).
- [[HW GAS Entity Character]] — classe derivee declaree `AHWGASEntityCharacter : public AHWGASCharacter` (`HWGASEntityCharacter.h:25`) ; override `OnHealthChange(const FOnAttributeChangeData&)` pour declencher `EntityDead()` et rafraichir la nameplate.
- [[Ability System Component]] — composant prive `AbilitySystem` (`TObjectPtr<UHWAbilitySystemComponent>`, `HWGASCharacter.h:231`) expose via `GetAbilitySystemComponent()` / `GetHWAbilitySystemComponent()` ; les handlers `FrozenTagChanged` / `WetTagChanged` / `ColdTagChanged` / `BurningTagChanged` / `CombatStateTagChanged` (`HWGASCharacter.h:219-223`) sont enregistres sur cet ASC.
- [[Anim Instance]] — `UHWPlayerAnimInstance::OwningHWCharacter` est declare `AHWGASCharacter*` (`HWPlayerAnimInstance.h:35`) ; `NativeInitializeAnimation` appelle `Cast<AHWGASCharacter>(TryGetPawnOwner())` puis recupere l'ASC via `GetAbilitySystemComponent()`.
