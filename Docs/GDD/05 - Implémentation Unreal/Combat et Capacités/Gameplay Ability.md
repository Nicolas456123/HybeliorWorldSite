---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# GameplayAbility

`UHWGameplayAbility` : classe de base HybeliorWorld pour toutes les abilities. Définit les policies d'activation, groupes d'exclusivité et l'intégration avec le [[Ability Tag Relationship Mapping]].

## Sources

- `HWGameplayAbility.h` / `HWGameplayAbility.cpp`
- `GetFloatValueFromCombatData()` (cpp:152) — accès au `UHWCombatDataSubsystem`

## Enums

```cpp
enum class EHWAbilityActivationPolicy : uint8 {
    OnInputTriggered,   // Au press
    WhileInputActive,   // Maintenu
    Passive             // Toujours active
};

enum class EHWAbilityActivationGroup : uint8 {
    Independent,             // Coexiste
    Exclusive_Replaceable,   // Peut être annulée
    Exclusive_Blocking,      // Bloque les autres
    MAX
};
```

> **Note importante** : `EHWAbilityActivationGroup` est déclaré mais **non enforced** dans le code C++ d'activation. Le traitement d'activation ne consulte pas ce groupe.

## Configuration réseau (défaut)

- `InstancingPolicy` : `InstancedPerActor`
- `NetExecutionPolicy` : `LocalPredicted`
- `bServerRespectsRemoteAbilityCancellation` : `false`

## API publique

```cpp
AHWGASCharacter* GetHWAvatarActor() const;
float GetFloatValueFromCombatData(FString FloatCombatValueName);
void EndAbilityThisFrame();
bool DoesAbilitySatisfyTagRequirements(...) override;  // Consulte TagRelationshipMapping
```

## Abilities implémentées

### UHWGameplayAbility_Dodge

```cpp
UPROPERTY(EditAnywhere)
uint8 Direction;               // 0=Avant, 1=Droite, 2=Arrière, 3=Gauche
float Strength = 2000.0f;
float Duration = 0.2f;
UAnimMontage* DodgingAnimation;
float DodgingAnimationPlayRate = 1.0f;
float DelayDodgedRecentlyApplication = 0.0f;
TSubclassOf<UGameplayEffect> DodgedRecentlyGameplayEffect;
float DelayIFrameApplication = 0.0f;
TSubclassOf<UGameplayEffect> IFrameGameplayEffect;
```

Flow : `CommitAbility` → Save Friction → `SetFriction(0)` → [RootMotion + Montage + DelayTimers] → OnFinished → RestoreFriction → `EndAbility`.

### UHWGameplayAbility_MovementMode (3 modes)

- **Mode Start** (standard) : `CommitAbility` → `ApplyGameplayEffect` → `SetMovementParams` → `EndAbility`.
- **Mode Stop** (`bIsStopAbility = true`) : `CommitAbility` → `RemoveActiveEffects` → `SetMovementParams` → `EndAbility`.
- **Mode Toggle** (`bIsToggleAbility = true`) :

```
Si ToggleCheckTag présent :
  RemoveEffects + ApplyToggleOn + SetParams("on")
Sinon :
  ApplyToggleOff + RemoveToggleOnEffects + SetParams("off")
```

### UHWGameplayAbility_ToggleState

Toggle via tag : si `StateTag` présent → `RemoveEffects`, sinon → `ApplyGameplayEffect`.

### UHWGameplayAbility_ApplyEventDamage

Activée par événement (chute, piège). Extrait la magnitude via SetByCaller puis applique `DamageEffect`.

### UHWGameplayAbility_FakeProjectile

Template projectile (délai configurable avant spawn). Logique de spawn déléguée au Blueprint.

> Nommage trompeur : c'est un vrai projectile avec physique.

### UHWGameplayAbility_TraceSteps

Conteneur de `TArray<FTraceStep>`. Implémentation C++ vide — utilisé uniquement comme DataHolder pour [[Ability Tasks]] (`UHWAT_WaitMultiTraceForTargets`).

## HWGameplayAbilitySet (DataAsset)

Bundle d'abilities/effects/attributeSets pour initialisation d'un personnage.

```cpp
TArray<FHWAbilitySet_GameplayAbility>  GrantedGameplayAbilities;
TArray<FHWAbilitySet_GameplayEffect>   GrantedGameplayEffects;
TArray<FHWAbilitySet_AttributeSet>     GrantedAttributes;

void GiveToAbilitySystem(UHWAbilitySystemComponent* ASC,
    FHWAbilitySet_GrantedHandles* OutGrantedHandles,
    UObject* SourceObject = nullptr) const;
```

`FHWAbilitySet_GrantedHandles::TakeFromAbilitySystem()` révoque tous les grants.

## Assets BP associés

| Classe C++ | Assets BP | Chemin |
|-----------|-----------|--------|
| UHWGameplayAbility_MovementMode | GA_SprintStart, GA_SprintStop, GA_CrouchClass, GA_FlyingStart... | /Game/AbilitySystem/Abilities/ |
| UHWGameplayAbility_Dodge | GA_DodgeForward, GA_DodgeBack, GA_DodgeLeft, GA_DodgeRight | /Game/AbilitySystem/Abilities/ |
| UHWGameplayAbility_ToggleState | GA_ReadyToFight, GA_Aiming, GA_Blocking | /Game/AbilitySystem/Abilities/ |
| UHWGameplayAbilitySet | Player_AbilitySet | /Game/AbilitySystem/AbilitySet/ |

### Paramètres Dodge (MCP confirmé)

| Ability BP | direction | strength | duration | Montage | IFrame GE |
|-----------|-----------|----------|----------|---------|-----------|
| GA_DodgeBack | 2 | 500 | 0.6s | Dodge_B_Seq_Montage | GE_DodgeBackwardIFrame |
| GA_DodgeForward | 0 | 700 | 0.6s | Dodge_F_Seq_Montage | GE_DodgeForwardIFrame |
| GA_DodgeLeft | **4** ⚠️ | 700 | 0.6s | Dodge_L_Seq_Montage | GE_DodgeForwardIFrame |
| GA_DodgeRight | 1 | 700 | 0.6s | Dodge_R_Seq_Montage | GE_DodgeForwardIFrame |

⚠️ `GA_DodgeLeft.direction=4` est hors range (0-3) — bug confirmé.

## Assets associés
- [[GAS Data Assets]] — `Player_AbilitySet` et DataTables de tags (38 abilities accordées)
- [[Abilities Combat]] — catalogue des GA_* de combat (SwordAttack, BowShoot, Dodges, etc.)
- [[Abilities Locomotion]] — catalogue des GA_* de locomotion (Sprint, Crouch, Flying, Swimming)

## Voir aussi

- [[Ability System Component]] — consultée dans `DoesAbilitySatisfyTagRequirements()` via `GetAdditionalActivationTagRequirements()`
- [[Ability Tag Relationship Mapping]] — consultée indirectement via l'ASC pour les required/blocked tags
- [[Gameplay Effect]] — `TSubclassOf<UGameplayEffect>` (IFrame, DodgedRecently, DamageEffect) appliqués par les subclasses Dodge/ApplyEventDamage/MovementMode/ToggleState
- [[Ability Tasks]] — `UHWGameplayAbility_TraceSteps` sert de DataHolder `TArray<FTraceStep>` pour `UHWAT_WaitMultiTraceForTargets`
- [[HW GAS Player Character]] — hub domaine 02 : retourné par `GetHWAvatarActor()` via HWGASCharacter (accessible transitivement)
- [[Abilities Combat]] — catalogue des GA BP dérivées (combat)
- [[Abilities Locomotion]] — catalogue des GA BP dérivées (locomotion)
- [[GAS Data Assets]] — `UHWGameplayAbilitySet` bundle ces GA via `TSubclassOf<UHWGameplayAbility>`
