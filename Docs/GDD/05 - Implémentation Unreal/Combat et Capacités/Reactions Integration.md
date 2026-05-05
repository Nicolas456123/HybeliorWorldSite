---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# ReactionsIntegration

Page-pont expliquant comment le système de combat (combos + moveset) déclenche les [[Elemental Reactions]] via le pipeline GAS.

## Chaîne de déclenchement

```
FHWComboAttack (Movesets)
    │   DamageType = Combat.DamageType.Fire
    │   OnHitEffect = GE_FireballDamageEffect
    ▼
ComboSystem (TryAttack) → PlayMontage → Hit event
    ▼
ApplyGameplayEffect(GE_*DamageEffect) sur ASC cible
    ▼
UHWGameplayEffectExecutionCalc (serveur)
    ▼
UHWCombatAttributeSet::PreGameplayEffectExecute
    ▼
UHWElementalReactionSystem::CheckReaction(DamageType, TargetConditions)
    ↓
FHWElementalReactionResult (multiplier, condition à appliquer/retirer...)
    ▼
ApplyReaction(TargetASC, Result)
    ↓ Applique GE de condition (Burning, Wet, Frozen, etc.)
Target Health modifié, conditions mises à jour.
```

## Points d'intégration clés

1. **Moveset** définit `DamageType` et `OnHitEffect` par attaque (voir [[Movesets]]).
2. **ComboSystem** applique le GE via la chaîne BP `GA_SwordAttack` → `ApplyGameplayEffect` (voir [[Combo System]]).
3. **ExecutionCalc** calcule le dégât de base (voir [[Gameplay Effect]]).
4. **PreGameplayEffectExecute** sur [[Combat Attribute Set]] invoque [[Elemental Reactions]] et applique le multiplicateur avant l'effet final sur Health.
5. Les GEs de condition (Burning, Cold, Wet, etc.) sont configurés via le GameMode (voir [[Gameplay Effect]]).

## Exemples

- Attaque Fire sur cible Wet → `Vaporize` (×1.5) + retire Wet.
- Attaque Ice sur cible Wet → `Freeze` (applique Frozen).
- Attaque Electric sur cible Wet → `ElectroCharge` (×1.2) + applique Electrified.

Voir la matrice complète dans [[Elemental Reactions]].

## Voir aussi

- [[Elemental Reactions]] — cible finale du pipeline : `UHWElementalReactionSystem::CheckReaction(IncomingDamageType, TargetActiveConditions)` et `ApplyReaction(TargetASC, Reaction)` sont appelés depuis `UHWCombatAttributeSet::HandlePreExecuteEffectDamage` (`HWCombatAttributeSet.cpp:183,190`) pour produire le `FHWElementalReactionResult` consommé par ce pipeline.
- [[Combo System]] — point d'entrée côté serveur : `UHWComboComponent::TryAttack()` déclenche `PlayAttackMontage()` puis laisse l'ability BP parente appliquer le GE de dégât ; le composant s'appuie sur `UHWCombatAttributeSet::GetStamina()` via `GASChar->GetCombatAttributes()` (`HWComboComponent.cpp:274`) avant la mise en file.
- [[Movesets]] — `FHWComboAttack::DamageType` (`HWWeaponMoveset.h:30`) est le `FGameplayTag` élémentaire que le GE de dégât doit asset-tagger pour être détecté par la boucle `Tag.MatchesTag(Combat_DamageType)` dans `HandlePreExecuteEffectDamage` (`HWCombatAttributeSet.cpp:160-167`).
- [[Combat Attribute Set]] — hôte du hook pre-execute : `UHWCombatAttributeSet::PreGameplayEffectExecute` filtre `GetDamageAttribute()`, détecte la parité de magnitude (crit) et appelle `HandlePreExecuteEffectDamage(bool, Data)` qui orchestre le pipeline complet (`HWCombatAttributeSet.cpp:104-127`).
- [[Gameplay Effect]] — `UHWGameplayEffectExecutionCalc::Execute_Implementation` calcule `BaseDamage = Attack + MaxHealth` et pose la magnitude finale via `OutExecutionOutput.AddOutputModifier(GetDamageAttribute(), Override, AttackerSideTotalDamage)` (`HWGameplayEffectExecutionCalc.cpp:133-134`) ; les GEs de condition (`ApplyWet/Burning/Cold/Frozen/Charged/Electrified`) sourcés du `AHWGameMode` sont appliqués dans `HandlePreExecuteEffectDamage` via `ApplyGameplayEffectToSelf` (`HWCombatAttributeSet.cpp:239-280`).
