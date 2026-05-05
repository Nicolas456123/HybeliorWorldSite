---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# GameplayEffect

`UHWGameplayEffect` et ses sous-classes (notamment `UHWDamageGameplayEffect`) pilotent l'application de dégâts et de conditions. La formule de dégâts est exécutée par `UHWGameplayEffectExecutionCalc`.

## Sources

- `HWGameplayEffect.h` / `.cpp`
- `HWDamageGameplayEffect.h` / `.cpp`
- `HWGameplayEffectExecutionCalc.h` / `.cpp`

## UHWDamageGameplayEffect

Classe de base pour tous les GE de dégâts. Configure `UTargetTagRequirementsGameplayEffectComponent` pour ignorer les cibles avec tag `Combat_State_IFrame`.

## UHWGameplayEffectExecutionCalc

### Attributs capturés (source)

```cpp
Attack      (Source, Snapshot=true)
MaxHealth   (Source, Snapshot=true)
CritRate    (Source, Snapshot=true)
CritDamage  (Source, Snapshot=true)
```

### Formule (exécution serveur uniquement)

```cpp
// HWGameplayEffectExecutionCalc.cpp:84
float BaseDamage = Attack + MaxHealth;  // (!) Formule surprenante — somme des deux

// Critique ?
bool bIsCrit = (FRand() <= CritRate);
if (bIsCrit) {
    CritBonus = BaseDamage * CritDamage;
}
TotalDamage = BaseDamage + CritBonus;

// Encodage critique par parité (cpp:119-131) :
int32 AttackerSideTotalDamage = (int32)FMath::Floor(TotalDamage);
if (bIsCrit && AttackerSideTotalDamage % 2 == 0) {
    AttackerSideTotalDamage++;  // Force impair pour signaler critique
}
// Nombres impairs = critique, pairs = normal (détecté dans PreGameplayEffectExecute)
```

Le décodage côté [[Combat Attribute Set]] `PreGameplayEffectExecute()` lit la parité pour savoir si c'était un critique.

## Pipeline complet

```
GA_SwordAttack (BP) via UHWComboComponent::PlayAttackMontage()
    ↓ HitConfirmed → ApplyGameplayEffect
GE_DamageEffect (BP, hérite UHWDamageGameplayEffect C++)
    ↓
UHWGameplayEffectExecutionCalc::Execute_Implementation() [C++]
    ↓ BaseDamage = Attack + MaxHealth
UHWCombatAttributeSet::PreGameplayEffectExecute() [C++]
    ↓ CheckReaction() + ApplyReaction()
UHWCombatAttributeSet::PostGameplayEffectExecute() [C++]
    ↓ Health change → OnHealthChange → widget BP
```

## GEs élémentaires configurés via GameMode

`AHWGameMode` expose 6 `TSubclassOf<UGameplayEffect>` que `BP_HybeliorGameMode` doit configurer :

| Propriété C++ | GE BP configuré | Statut |
|--------------|----------------|--------|
| ApplyColdGameplayEffect | GE_ApplyColdFor6Seconds | ✓ |
| ApplyBurningGameplayEffect | GE_ApplyBurningFor10Seconds | ✓ (dure 6s malgré le nom) |
| ApplyWetGameplayEffect | GE_ApplyWetFor10Seconds | ✓ |
| ApplyElectrifiedGameplayEffect | **null** ⚠️ | ✗ Aucun GE BP existant |
| ApplyFrozenGameplayEffect | GE_ApplyFrozenFor4Seconds | ✓ |
| ApplyChargedGameplayEffect | **null** ⚠️ | ✗ Aucun GE BP existant |

> **Risque silent fail** : si `BP_HybeliorGameMode` n'est pas le GameMode actif, les GEs élémentaires ne se chargent pas.

## Assets BP associés

| Classe C++ | Assets BP | Chemin |
|-----------|-----------|--------|
| UHWDamageGameplayEffect | GE_FireballDamageEffect, GE_IcicleDamageEffect, GE_TestDamage50 | /Game/AbilitySystem/GEs/ |

## Incohérences connues

- **Encodage critique par parité** (fragile si la formule change).
- **BaseDamage = Attack + MaxHealth** : formule surprenante, perturbe l'équilibrage.

## Voir aussi

- [[Combat Attribute Set]] — `UHWGameplayEffectExecutionCalc` capture Attack/MaxHealth/CritRate/CritDamage et écrit `GetDamageAttribute()` ; `PreGameplayEffectExecute()` décode la parité
- [[Gameplay Tags]] — `Combat_State_IFrame` (ignoré par `UHWDamageGameplayEffect`) et `Combat_State_Invulnerable` (check dans l'ExecutionCalc)
- [[Game Mode]] — `AHWGameMode` expose les 6 `TSubclassOf<UGameplayEffect>` consommés par `UHWCombatAttributeSet::SetupGameplayEffects()`
- [[Elemental Reactions]] — la détection/multiplicateur de réaction est effectuée dans `HWCombatAttributeSet::HandlePreExecuteEffectDamage` (pas dans l'ExecutionCalc, pour éviter double-application)
- [[Effects Combat]] — assets BP `GE_*Damage` dérivés de `UHWDamageGameplayEffect`
- [[Effects Elemental States]] — assets BP `GE_ApplyWet/Burning/Cold/Frozen` configurés dans le GameMode
