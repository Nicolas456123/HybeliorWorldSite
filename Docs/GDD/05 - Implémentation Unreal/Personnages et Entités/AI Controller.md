---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# AIController

Classe `AHWAIController` — controller IA des entites. Herite de `AAIController`.

## Role

- Possession d'une [[HW GAS Entity Character]]
- Configuration du `AIPerceptionComponent` (Sight)
- Maintien du Blackboard
- Execution du Behavior Tree (fallback C++ si pas de BT)

## Configuration Perception (Sight)

| Parametre | Valeur |
|-----------|--------|
| SightRadius | 3000 unites |
| LoseSightRadius | 3500 unites |
| PeripheralVisionAngleDegrees | 90 deg |
| MaxAge | 5 secondes |
| DetectEnemies | true |
| DetectFriendlies / Neutrals | false |

## Blackboard (6 cles — MAJ toutes 0.5s)

| Cle | Type | Description |
|-----|------|-------------|
| `TargetActor` | Object (AActor*) | Cible detectee |
| `TargetLocation` | Vector | Position cible |
| `Health` | Float | Sante actuelle |
| `ShouldRetreat` | Bool | `Health < 20% MaxHealth` |
| `IsInCombat` | Bool | Cible presente |
| `PatrolLocation` | Vector | Reserve usage futur |

## Fallback C++ (sans Behavior Tree)

`EvaluateCombatSituation()` :

```
Health < 30 (HP absolu)           -> CommandRetreat()  (distance x 500 unites)
Distance joueur <= 300            -> CommandAttack()
sinon                              -> CommandDodge()
```

> **Incoherence :** Fallback utilise 30 HP absolu, Blackboard `ShouldRetreat` utilise 20% MaxHealth. Comportements divergents.

## Behavior Tree Tasks (C++)

### BTTask_HWAttackTarget

```cpp
float AttackRange     = 200.0f;
float AttackCooldown  = 1.5f;   // Reserve usage futur
```

Logique :
1. Recupere `TargetActor` du Blackboard
2. Si absent → Failed
3. Si `Distance > AttackRange` → Failed
4. Sinon → `Entity->Attack()` → Succeeded

### BTTask_HWRetreat

```cpp
float RetreatDistance = 800.0f;
```

Logique :
1. Calcule `AwayDir = (EntityPos - CiblePos).Normalize()`
2. `RetreatLoc = EntityPos + AwayDir * 800`
3. Projette sur NavMesh
4. `AIController->MoveToLocation(RetreatLoc)` → Succeeded

## Services BP (Blueprint)

- `BTService_CheckHasTag` → verifie `Combat.State.ReadyToFight` via ASC C++
- `BTService_CheckDistanceToHome` → seuil distance → cle `IsRunningHome` Blackboard

## Blueprints / BT assets

| Asset | Chemin |
|-------|--------|
| `BT_EnemyBase` (BP) | /Game/Entity/ |
| `BB_EnemyBase` (BP) | /Game/Entity/ |
| `BP_HWAIController` | /Game/Entity/ |
| `BP_TestEntityAIController` | /Game/Entity/ |

## Voir aussi

- [[HW GAS Entity Character]] — pawn possede `AHWGASEntityCharacter* ControlledCharacter` (`HWAIController.h:28`) assigne dans `OnPossess(APawn*)` ; les commandes C++ `CommandAttack()` / `CommandDodge()` / `CommandRetreat()` (`HWAIController.h:86-88`) appellent les BlueprintImplementableEvent `Attack()` / `Dodge()` / `Retreat()` exposes par l'entite.
- [[HW GAS Player Character]] — filtre de detection dans `OnPerceptionUpdated(AActor*, FAIStimulus)` qui teste `UpdatedActor->IsA(AHWGASPlayerCharacter::StaticClass())` avant de remplir les cles BB `BBKey_TargetActor` / `BBKey_TargetLocation` / `BBKey_IsInCombat`.
- [[Combat Attribute Set]] — `UpdateBlackboardValues()` (`HWAIController.h:71`, timer 0.5s) lit `HWGetHealth()` / `HWGetMaxHealth()` sur le `UHWCombatAttributeSet` du pawn pour alimenter `BBKey_Health` et calculer `BBKey_ShouldRetreat` (`Health < MaxHealth * 0.2`).
- [[Entity Spawner]] — fournit les entites que ce controller possede : `AHWEntitySpawner::ActivateEntity_Implementation` (`HWEntitySpawner.cpp:113`) obtient l'entite via `EntityPoolManager->GetPooledEntity()` puis le pool-manager assigne l'AIControllerClass pointant vers `BP_HWAIController` (parent natif `AHWAIController`).
- [[Entity Pool Manager]] — le manager active/desactive la logique IA en appelant `Entity->CachedAIController->ActivateEntityAI()` / `DeactivateEntityAI()` (declares `HWAIController.h:47,51`) via les wrappers `InitializeEntity_Implementation` / `ResetEntity_Implementation` de l'entite.
- [[AI Blueprints]] — BT/BB/Services BP consommes via les UPROPERTY `UBehaviorTree* BehaviorTreeAsset` et `UBlackboardData* BlackboardAsset` (`HWAIController.h:56,59`) ; si `BehaviorTreeAsset` est null, `EvaluateCombatSituation()` prend le relais en pur C++.
