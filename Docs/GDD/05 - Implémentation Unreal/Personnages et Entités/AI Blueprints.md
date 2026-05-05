---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation IA – Blueprints & C++ (HybeliorWorld)

> Généré via MCP Unreal Editor — Inspection directe des assets UE5.4  
> Date : 2026-04-04  
> Moteur : Unreal Engine 5.4  
> Projet : HybeliorWorld

## Classes C++ associées
- [[AI Controller]] — `AHWAIController` possède les BP `BP_HWAIController` / `BP_TestEntityAIController`
- [[HW GAS Entity Character]] — pawn contrôlé par l'IA (BT_EnemyBase, perception Sight/Hearing)

---

## Table des matières

1. [Vue d'ensemble de l'architecture IA](#1-vue-densemble-de-larchitecture-ia)
2. [Blackboards](#2-blackboards)
3. [Behavior Trees](#3-behavior-trees)
4. [BTTasks (Tâches)](#4-bttasks-tâches)
5. [BTServices (Services)](#5-btservices-services)
6. [AI Controllers (Blueprints)](#6-ai-controllers-blueprints)
7. [Classe C++ : AHWAIController](#7-classe-c-ahwaicontroller)
8. [Classe C++ : AHWGASMobCharacter](#8-classe-c-ahwgasmobcharacter)
9. [Système de Spawn (Pool & Spawner)](#9-système-de-spawn-pool--spawner)
10. [Abilities IA (GAS)](#10-abilities-ia-gas)
11. [Diagramme de flux IA](#11-diagramme-de-flux-ia)
12. [Références des assets](#12-références-des-assets)

---

## 1. Vue d'ensemble de l'architecture IA

L'IA de HybeliorWorld repose sur une architecture en couches :

```
BP_TestEntity (AHWGASMobCharacter)
    └─ AIControllerClass: BP_HWAIController (AHWAIController)
           ├─ AIPerceptionComponent (Sight + Hearing)
           ├─ BlackboardComponent → BB_EnemyBase
           └─ BehaviorTreeComponent → BT_EnemyBase
                  ├─ BTService_CheckDistanceToHome  (tick: mise à jour BB)
                  ├─ BTService_CheckHasTag          (tick: vérifie Combat.State.ReadyToFight)
                  ├─ BTTask_FocusTarget             (focus acteur cible)
                  ├─ BTTask_Abilities               (active une GameplayAbility)
                  ├─ BTTask_FindPointInRadiusOfHome (patrol aléatoire)
                  ├─ BTTask_ClearBlackboardEntry    (réinitialise clé BB)
                  └─ BTDecorator_Blackboard         (conditions sur clés BB)
```

**Chaîne de possession :**  
`AHWEntitySpawner` → `AHWEntityPoolManager` → `AHWGASMobCharacter::InitializeMob()` → `AHWAIController::OnPossess()` → `RunBehaviorTree(BT_EnemyBase)`.

**Cycle de vie entite :**  
`ActivateMob` → `InitializeMob` → `GrantDefaultAbilities` → AI active  
`DeactivateMob` → `ResetMob` → `DeactivateMobAI` (BrainComponent.StopLogic("Dead")) → retour au pool.

---

## 2. Blackboards

### 2.1 `BB_EnemyBase`

> Chemin : `/Game/Blueprints/Entity/BB_EnemyBase`  
> Classe : `BlackboardData`  
> Parent : aucun (pas d'héritage de blackboard)

Blackboard principal utilisé par `BT_EnemyBase`. Contient 8 clés :

| Clé               | Type                      | Rôle                                                                 |
|-------------------|---------------------------|----------------------------------------------------------------------|
| `HomeLocation`    | `BlackboardKeyType_Vector` | Position d'origine de l'entite (point de retour au domicile)              |
| `MoveToPoint`     | `BlackboardKeyType_Vector` | Destination de déplacement (patrol ou chasse)                        |
| `Target`          | `BlackboardKeyType_Object` | Référence vers l'acteur cible (joueur détecté par perception)        |
| `HeardNoiseLocation` | `BlackboardKeyType_Vector` | Position du bruit détecté via hearing                           |
| `IsRunningHome`   | `BlackboardKeyType_Bool`   | Vrai si l'entite est en train de retourner à sa position de spawn       |
| `SelfActor`       | `BlackboardKeyType_Object` | Référence à l'acteur entite lui-même                                    |
| `IsReadyToFight`  | `BlackboardKeyType_Bool`   | Vrai si la GameplayTag `Combat.State.ReadyToFight` est présente      |
| `IsAiActive`      | `BlackboardKeyType_Bool`   | Vrai si l'IA est active (BT en cours d'exécution)                   |

> **Note :** La clé `Target` est également mise à jour directement par `AHWAIController::OnPerceptionUpdated()` dès qu'un joueur (`AHWGASPlayerCharacter`) est détecté par le sens Sight.

---

### 2.2 `BB_Tuto`

> Chemin : `/Game/Blueprints/Entity/BB_Tuto`  
> Classe : `BlackboardData`  
> Parent : aucun  
> Utilisé par : `BT_Tuto`

Blackboard minimaliste pour scénario tutoriel :

| Clé          | Type                      | Rôle                        |
|--------------|---------------------------|-----------------------------|
| `SelfActor`  | `BlackboardKeyType_Object` | Référence à l'acteur entite   |

> Les deux Behavior Trees (`BT_Tuto` et `BT_EnemyBase`) référencent le même Blackboard `BB_EnemyBase` selon les données lues depuis les assets — `BT_Tuto` utilise `BB_EnemyBase` comme asset Blackboard assigné.

---

## 3. Behavior Trees

### 3.1 `BT_EnemyBase`

> Chemin : `/Game/Blueprints/Entity/BT_EnemyBase`  
> Classe : `BehaviorTree`  
> Blackboard : `BB_EnemyBase`

Behavior Tree principal de combat. Structure reconstruite depuis les données binaires de l'asset :

**Composants utilisés :**
- Composites : `BTComposite_Selector`, `BTComposite_Sequence`
- Tâches : `BTTask_MoveTo`, `BTTask_Wait`, `BTTask_FocusTarget`, `BTTask_FindPointInRadiusOfHome`, `BTTask_ClearBlackboardEntry`, `BTTask_Abilities`
- Services : `BTService_CheckDistanceToHome`, `BTService_CheckHasTag`
- Décorateurs : `BTDecorator_Blackboard`
- Abilities référencées : `GA_Ai_ReadyToFight`, `GA_TestMobAttack`

**Conditions de décorateurs détectées (clés Blackboard) :**

| Condition détecter                    | Signification                                               |
|---------------------------------------|-------------------------------------------------------------|
| `IsRunningHome is Is Set`             | Le mob est en cours de retour au domicile                   |
| `IsRunningHome is Is Not Set`         | Le mob n'est pas en train de rentrer                        |
| `Target is Is Set`                    | Une cible est enregistrée dans le BB                        |
| `Target is Is Not Set`                | Aucune cible — mode patrol ou idle                          |
| `MoveToPoint is Is Set`               | Un point de déplacement est défini                          |
| `IsReadyToFight is Is Not Set`        | Le mob n'est pas encore dans l'état combat                  |
| `HeardNoiseLocation is Is Set`        | Une localisation de bruit a été perçue                      |
| `HeardNoiseLocation is Is Not Set`    | Aucun bruit récent                                          |

**Propriétés de flux notables :**
- `FlowAbortMode::Both` — les décorateurs peuvent interrompre aussi bien la branche courante que les branches inférieures
- `EBasicKeyOperation::NotSet` — utilisé pour tester l'absence d'une clé

**Reconstruction logique approximative :**

```
Root
└─ Selector (racine)
   ├─ [Déco: IsRunningHome is Is Set] Sequence "Retour au domicile"
   │    ├─ BTTask_MoveTo (clé: HomeLocation)
   │    └─ BTTask_ClearBlackboardEntry (clé: IsRunningHome)
   │
   ├─ [Déco: Target is Is Set] Selector "Combat"
   │    ├─ [Déco: IsReadyToFight is Is Not Set] BTTask_Abilities (GA_Ai_ReadyToFight)
   │    ├─ Sequence "Attaque"
   │    │    ├─ BTTask_FocusTarget (clé: Target)
   │    │    ├─ BTTask_MoveTo "Move To Target" (clé: Target)
   │    │    └─ BTTask_Abilities (GA_TestMobAttack)
   │    └─ BTTask_Wait
   │
   ├─ [Déco: HeardNoiseLocation is Is Set] Sequence "Investigation bruit"
   │    ├─ BTTask_MoveTo (clé: HeardNoiseLocation)
   │    └─ BTTask_ClearBlackboardEntry (clé: HeardNoiseLocation)
   │
   └─ Selector "Patrol"
        ├─ [Déco: MoveToPoint is Is Set] BTTask_MoveTo (clé: MoveToPoint)
        └─ BTTask_FindPointInRadiusOfHome → BTTask_Wait

Services actifs (toute la durée) :
- BTService_CheckDistanceToHome  → met à jour IsRunningHome
- BTService_CheckHasTag          → met à jour IsReadyToFight
```

---

### 3.2 `BT_Tuto`

> Chemin : `/Game/Blueprints/Entity/BT_Tuto`  
> Classe : `BehaviorTree`  
> Blackboard : `BB_EnemyBase`

Behavior Tree simplifié pour le tutoriel. Structure minimale :

```
Root
└─ Sequence
     ├─ BTTask_PlaySound
     └─ BTTask_Wait
```

Pas de services ni de décorateurs. Utilisé pour démonstration ou introduction des mécaniques IA.

---

## 4. BTTasks (Tâches)

Toutes les tâches héritent de `BTTask_BlueprintBase` (`/Script/AIModule`).  
L'event d'entrée est `ReceiveExecuteAI` (version AI) ou `ReceiveExecute`.

---

### 4.1 `BTTask_FocusTarget`

> Chemin : `/Game/Blueprints/Entity/BTTask_FocusTarget`  
> Parent natif : `BTTask_BlueprintBase`

**Logique (reconstituée depuis le binaire) :**

1. Event : `ReceiveExecuteAI` — reçoit `OwnerController` (AIController) et `ControlledPawn` (Pawn)
2. Appelle `GetBlackboardValueAsActor` sur la clé `Target`
3. Appelle `K2_SetFocus(NewFocus)` sur l'AIController avec l'acteur récupéré
4. Appelle `FinishExecute(bSuccess=true)`

**Pins / Variables détectées :**
- `OwnerController` : AIController Object Reference (pin entrée via event ReceiveExecuteAI)
- `ControlledPawn` : Pawn Object Reference
- `Target` : clé Blackboard (BlackboardKeySelector)
- `NewFocus` : acteur récupéré du BB, passé à SetFocus

---

### 4.2 `BTTask_FindPointInRadiusOfHome`

> Chemin : `/Game/Blueprints/Entity/BTTask_FindPointInRadiusOfHome`  
> Parent natif : `BTTask_BlueprintBase`

**Variables Blueprint :**
- `Radius` : float — rayon de patrol autour de `HomeLocation`
- `MoveToPoint` : BlackboardKeySelector — clé de destination

**Logique :**

1. Event : `ReceiveExecute` — reçoit `OwnerActor`
2. Cast vers `BP_TestEntityAIController`
3. Lit `HomeLocation` depuis le Blackboard via `GetValueAsVector`
4. Appelle `K2_GetRandomReachablePointInRadius(Origin: HomeLocation, Radius)` (NavigationSystem)
5. Appelle `SetBlackboardValueAsVector(MoveToPoint, RandomLocation)`
6. Calcule `Vector_Distance` (debug)
7. Appelle `FinishExecute(true)`

**Dépendances :**
- `NavigationSystemV1::K2_GetRandomReachablePointInRadius`
- `BlackboardComponent::GetValueAsVector` / `SetBlackboardValueAsVector`
- `KismetMathLibrary::VSize` (calcul distance)

---

### 4.3 `BTTask_ClearBlackboardEntry`

> Chemin : `/Game/Blueprints/Entity/BTTask_ClearBlackboardEntry`  
> Parent natif : `BTTask_BlueprintBase`

**Logique :**

1. Event : `ReceiveExecute` — reçoit `OwnerActor`
2. Appelle `ClearBlackboardValue` sur la clé sélectionnée (BlackboardKeySelector)
3. Appelle `FinishExecute(true)`

**Note :** Pas de cast ni de logique conditionnelle — tâche utilitaire simple. Utilisée pour effacer `IsRunningHome`, `HeardNoiseLocation`, etc.

---

### 4.4 `BTTask_Abilities`

> Chemin : `/Game/Blueprints/Entity/BTTask_Abilities`  
> Parent natif : `BTTask_BlueprintBase`

**Variables Blueprint :**
- `Ability to Activate` (`InAbilityToActivate`) : `TSubclassOf<UGameplayAbility>` — classe de la GameplayAbility à activer, configurable dans l'éditeur

**Logique :**

1. Event : `ReceiveExecute` — reçoit `OwnerActor`
2. Appelle `K2_GetPawn()` sur l'AIController
3. Cast vers `BP_TestEntityAIController`
4. En cas d'échec du cast : branche `CastFailed`
5. Accède au composant `HWAbilitySystemComponent` (via cast vers `HWGASCharacter`)
6. Appelle `TryActivateAbilityByClass(InAbilityToActivate, bAllowRemoteActivation=true)`
7. Appelle `FinishExecute(ReturnValue)`

**Usage dans BT_EnemyBase :**
- Instancié deux fois : une fois avec `GA_Ai_ReadyToFight`, une fois avec `GA_TestMobAttack`

**Dépendances :**
- `/Script/GameplayAbilities::AbilitySystemComponent::TryActivateAbilityByClass`
- `HWAbilitySystemComponent` (C++ natif HybeliorWorld)

---

## 5. BTServices (Services)

Tous les services héritent de `BTService_BlueprintBase` (`/Script/AIModule`).  
L'event principal est `ReceiveTick(DeltaSeconds)`.

---

### 5.1 `BTService_CheckDistanceToHome`

> Chemin : `/Game/Blueprints/Entity/BTService_CheckDistanceToHome`  
> Parent natif : `BTService_BlueprintBase`

**Variables Blueprint :**
- `DistanceToHome` : float (ou double) — seuil de distance configuré dans l'éditeur
- `BBEntryToClear` : BlackboardKeySelector — clé BB à effacer si distance > seuil
- `BBEntryToSetTrue` : BlackboardKeySelector — clé BB à mettre à vrai (= `IsRunningHome`)
- `HomeLocation` : BlackboardKeySelector — clé BB de la position d'origine

**Logique (tick) :**

1. Event : `ReceiveTick(DeltaSeconds)` — reçoit `OwnerActor`
2. Cast vers `BP_TestEntityAIController` (IsValid check)
3. Lit `HomeLocation` via `GetBlackboardValueAsVector`
4. Appelle `K2_GetActorLocation()` sur l'OwnerActor (pawn)
5. Calcule `Subtract_VectorVector` → `VSize` pour obtenir la distance réelle
6. Opération `Greater_DoubleDouble(Distance, DistanceToHome)` :
   - Si vrai → `SetBlackboardValueAsBool(BBEntryToSetTrue, true)` + `ClearBlackboardValue(BBEntryToClear)`
   - Si faux → rien (ou logique inverse)
7. `IsValid` macro guard sur le résultat du cast

**Tooltips des variables :**
- `Home Location` : position d'origine de l'entite
- `Distance to Home` : distance seuil déclenchant le retour
- `BBEntry to Clear` : clé BB à effacer (ex: `Target`)
- `BBEntry to Set True` : clé BB à activer (ex: `IsRunningHome`)

---

### 5.2 `BTService_CheckHasTag`

> Chemin : `/Game/Blueprints/Entity/BTService_CheckHasTag`  
> Parent natif : `BTService_BlueprintBase`

**Variables Blueprint :**
- `TagToCheck` : `FGameplayTag` — tag à vérifier sur l'ASC de l'entite  
  Valeur par défaut observée : `(TagName="Combat.State.ReadyToFight")`
- `BoolToUpdate` : BlackboardKeySelector — clé BB booléenne à mettre à jour (= `IsReadyToFight`)

**Logique (tick) :**

1. Event : `ReceiveTick(DeltaSeconds)` — reçoit `OwnerActor`
2. Cast vers `BP_TestEntityAIController` (IsValid check)
3. Accède à `HWAbilitySystemComponent` du pawn (`HWGASCharacter`)
4. Appelle `HasMatchingGameplayTag(TagToCheck)` sur l'ASC (interface `GameplayTagAssetInterface`)
5. Appelle `SetBlackboardValueAsBool(BoolToUpdate, ReturnValue)`

**GameplayTag utilisée :** `Combat.State.ReadyToFight`

**Dépendances :**
- `/Script/GameplayTags::GameplayTagAssetInterface::HasMatchingGameplayTag`
- `HWAbilitySystemComponent` natif
- `KismetSystemLibrary::IsValid` (macro guard)

---

## 6. AI Controllers (Blueprints)

### 6.1 `BP_HWAIController`

> Chemin : `/Game/Blueprints/Entity/BP_HWAIController`  
> Parent natif : `AHWAIController` (`/Script/HybeliorWorld`)  
> Classe générée : `BP_HWAIController_C`

**Rôle :** Blueprint-shell au-dessus du contrôleur C++. Expose les événements UE5 (`BeginPlay`, `Tick`) pour extensions BP si nécessaire.

**Composants SCS :**
- `AIPerceptionComponent` (ref : `PerceptionComponentCustom`, configuré en C++ dans `ConfigurePerceptionComponent`)
- `PathFollowingComponent` (hérité)
- `TransformComponent` (DefaultSceneRoot)

**Variables BP détectées :**
- `ControlledCharacter` : `AHWGASMobCharacter*` (VisibleAnywhere, ReadOnly — hérité C++)
- `PerceptionComponentCustom` : `UAIPerceptionComponent*` (hérité C++)

**Fonctions et Events dans le graph :**
- `BeginPlay` : event présent (commentaire : "This node is disabled and will not be called. Drag off pins to build functionality.")
- `Tick` : event présent mais désactivé (`ENodeEnabledState::Disabled`)
- `ReceiveTick` : présent
- `ExecuteUbergraph_BP_HWAIController` : ubergraph principal

> **Note :** Le contrôleur BP est actuellement quasi-vide côté Blueprint ; toute la logique est en C++ (`AHWAIController`).

---

### 6.2 `BP_TestEntityAIController`

> Chemin : `/Game/Blueprints/Entity/BP_TestEntityAIController`  
> Parent natif : `AAIController` (`/Script/AIModule`) — **pas** `AHWAIController`  
> Classe générée : `BP_TestEntityAIController_C`  
> Behavior Tree assigné : `BT_EnemyBase`

**Rôle :** Contrôleur de test utilisé pour l'entite `BP_TestEntity`. Implémente toute la logique AI directement en Blueprint (sans hériter de `HWAIController`).

**Variables BP détectées :**
- `IsAiActive` : bool — flag d'activation du cerveau AI
- `IsPaused` : bool — état de pause
- `BrainComponent` : référence au BehaviorTreeComponent (hérité AAIController)
- `BTAsset` : référence au BehaviorTree asset à lancer

**Fonctions Custom Events :**

| Fonction / Event           | Rôle                                                                 |
|----------------------------|----------------------------------------------------------------------|
| `ActivateMobAiController`  | Appelle `RunBehaviorTree(BT_EnemyBase)`, initialise `HomeLocation` dans le BB via `K2_GetActorLocation`, met `IsAiActive = true` |
| `DeactivateMobAiController` | Appelle `BrainComponent.StopLogic("Dead")`, met `IsAiActive = false` |
| `SetTarget`                | Custom Event — reçoit un `Object`, appelle `SetValueAsObject("Target", ObjectValue)` sur le Blackboard |
| `SetHeardNoiseLocation`    | Custom Event (`K2Node_CustomEvent_HeardNoiseLocation`) — reçoit une `FVector`, appelle `SetValueAsVector("HeardNoiseLocation", VectorValue)` |

**Logique BeginPlay :**
1. Vérifie `IsValid(BrainComponent)`
2. Si valide → appelle `RunBehaviorTree` → log "Brain VALID STOP"
3. Si invalide → log "Brain Not VALID"
4. Initialise `HomeLocation` dans le BB = position actuelle du pawn

**Logique SetTarget :**
1. Appelle `IsVectorValueSet(Blackboard, "HomeLocation")` — vérifie si HomeLocation est définie
2. Cast du pawn vers `BP_TestEntity`
3. `SetValueAsObject("Target", ObjectValue)` → met à jour la clé BB `Target`

**Debug strings trouvées dans l'asset :**  
`"OKKKKKKKKKKKKEYYYYYYYYY"`, `"PROBLEME"`, `"Brain VALID STOP"`, `"Brain Not VALID"` — strings de debug développeur, non utilisées en production.

---

## 7. Classe C++ : AHWAIController

> Source : `Source/HybeliorWorld/Private/Entity/Controllers/HWAIController.cpp`  
> Header : `Source/HybeliorWorld/Public/Entity/Controllers/HWAIController.h`  
> Hérite de : `AAIController`

### 7.1 Propriétés

| Propriété                  | Type                          | Accès            | Description                                              |
|----------------------------|-------------------------------|------------------|----------------------------------------------------------|
| `ControlledCharacter`      | `AHWGASMobCharacter*`         | BP ReadOnly       | Pointeur vers le pawn contrôlé                           |
| `PerceptionComponentCustom` | `UAIPerceptionComponent*`    | BP ReadOnly       | Perception liée au pawn (configurée depuis son composant)|
| `BehaviorTreeAsset`        | `UBehaviorTree*`              | BP ReadWrite (ED) | Behavior Tree à lancer lors de la possession             |
| `BlackboardAsset`          | `UBlackboardData*`            | BP ReadWrite (ED) | Blackboard associé                                       |
| `SightConfig`              | `UAISenseConfig_Sight*`       | Privé             | Configuration du sens Sight                              |
| `TargetPlayer`             | `TWeakObjectPtr<AActor>`      | Privé             | Référence faible vers le joueur ciblé                    |
| `BlackboardUpdateTimer`    | `FTimerHandle`                | Privé             | Timer de mise à jour périodique du Blackboard (0.5s)     |

### 7.2 Clés Blackboard C++ (constantes statiques)

| Constante                  | Valeur FName       | Usage                                          |
|----------------------------|--------------------|------------------------------------------------|
| `BBKey_TargetActor`        | `"TargetActor"`    | Acteur cible (joueur détecté)                  |
| `BBKey_TargetLocation`     | `"TargetLocation"` | Position de la cible                           |
| `BBKey_Health`             | `"Health"`         | Santé courante de l'entite (mis à jour par timer)   |
| `BBKey_ShouldRetreat`      | `"ShouldRetreat"`  | Vrai si HP < 20% du MaxHP                      |
| `BBKey_IsInCombat`         | `"IsInCombat"`     | Vrai si une cible est active                   |
| `BBKey_PatrolLocation`     | `"PatrolLocation"` | Position de patrol (non implémenté dans BB_EnemyBase actuel) |

> **Note :** Ces clés C++ (`TargetActor`, `IsInCombat`, `ShouldRetreat`, `Health`, `PatrolLocation`) sont définies dans `HWAIController` mais ne correspondent pas directement aux clés de `BB_EnemyBase` (qui utilise `Target`, `IsRunningHome`, etc.). Elles sont destinées à une version future ou utilisées si un Blackboard dédié est assigné à `BP_HWAIController`.

### 7.3 Configuration de la Perception (Sight)

```cpp
SightConfig->SightRadius                    = 3000.0f;   // Distance de détection
SightConfig->LoseSightRadius                = 3500.0f;   // Distance de perte de contact
SightConfig->PeripheralVisionAngleDegrees   = 90.0f;     // Angle de vision périphérique
SightConfig->SetMaxAge(5.0f);                            // Durée de mémoire du stimulus
SightConfig->DetectionByAffiliation.bDetectEnemies      = true;
SightConfig->DetectionByAffiliation.bDetectFriendlies   = false;
SightConfig->DetectionByAffiliation.bDetectNeutrals     = false;
// Sens dominant : UAISenseConfig_Sight
```

### 7.4 Flux OnPerceptionUpdated

```
AActor* UpdatedActor détecté par Sight
    ├─ Si AHWGASPlayerCharacter && WasSuccessfullySensed()
    │    ├─ TargetPlayer = UpdatedActor
    │    ├─ BB.SetValueAsObject(BBKey_TargetActor, UpdatedActor)
    │    ├─ BB.SetValueAsVector(BBKey_TargetLocation, Location)
    │    ├─ BB.SetValueAsBool(BBKey_IsInCombat, true)
    │    └─ Si pas de BT → EvaluateCombatSituation() [fallback C++]
    └─ Si perte de contact (TargetPlayer == UpdatedActor && !Sensed)
         ├─ TargetPlayer = nullptr
         ├─ BB.ClearValue(BBKey_TargetActor)
         └─ BB.SetValueAsBool(BBKey_IsInCombat, false)
```

### 7.5 Timer UpdateBlackboardValues (0.5s)

Mis à jour toutes les 0.5 secondes lors de la possession :
- `BBKey_TargetActor` / `BBKey_TargetLocation` / `BBKey_IsInCombat`
- `BBKey_Health` ← `HWCombatAttributeSet::HWGetHealth()`
- `BBKey_ShouldRetreat` ← true si `HP < MaxHP * 0.2`

### 7.6 Logique de fallback C++ (sans BehaviorTree)

Si `BehaviorTreeAsset` est null, `EvaluateCombatSituation()` prend le relais :

| Condition                        | Action              |
|----------------------------------|---------------------|
| `HP < 30`                        | `CommandRetreat()`  |
| `IsPlayerNearby()` (dist ≤ 300)  | `CommandAttack()`   |
| Sinon                            | `CommandDodge()`    |

- `CommandRetreat()` : calcule une position de retraite à 500 unités dans la direction opposée au joueur
- `PatrolToRandomLocation(Radius)` : utilise `NavigationSystemV1::GetRandomPointInNavigableRadius`

---

## 8. Classe C++ : AHWGASMobCharacter

> Source : `Source/HybeliorWorld/Private/Character/HWGASMobCharacter.cpp`  
> Header : `Source/HybeliorWorld/Public/Character/HWGASMobCharacter.h`  
> Hérite de : `AHWGASCharacter`

### 8.1 Composants

| Composant                      | Type                               | Description                                         |
|--------------------------------|------------------------------------|-----------------------------------------------------|
| `EntityNameplateWidgetComponent`  | `UHWEntityNameplateWidgetComponent*`  | Widget de barre de vie / nameplate au-dessus de l'entite |
| `AIPerceptionComp`             | `UAIPerceptionComponent*`          | Perception AI (utilisée par le AIController)        |

### 8.2 Propriétés principales

| Propriété               | Type                                 | Valeur par défaut | Description                                      |
|-------------------------|--------------------------------------|-------------------|--------------------------------------------------|
| `DefaultAbilities`      | `TArray<TSubclassOf<UGameplayAbility>>` | —              | Abilities accordées à la possession              |
| `HealthPerLevel`        | float                                | 450.0             | HP accordés par niveau d'entite                    |
| `ManaPerLevel`          | float                                | 200.0             | Mana accordé par niveau d'entite                   |
| `MobCapsuleRadius`      | float                                | 42.0              | Rayon capsule override                           |
| `MobCapsuleHalfHeight`  | float                                | 96.0              | Demi-hauteur capsule override                    |
| `bOverrideCapsuleSize`  | bool                                 | false             | Applique les overrides capsule au BeginPlay      |
| `MobLevel`              | int32                                | —                 | Niveau défini par le spawner à l'activation       |
| `MobTag`                | `FGameplayTag`                       | —                 | Tag identifiant le type de mob (quêtes/kills)     |
| `LootTable`             | `UHWLootTable*`                      | —                 | Table de loot associée                           |
| `CachedAIController`    | `AHWAIController*`                   | —                 | Référence au contrôleur AI (set dans PossessedBy)|
| `OwningSpawner`         | `AHWEntitySpawner*`                       | —                 | Spawner propriétaire                             |

### 8.3 Variants visuels (Randomisation)

Tableaux de mesh pour randomisation à l'apparition :

| Tableau                 | Slot équipement     |
|-------------------------|---------------------|
| `ChestMeshVariants`     | Torse               |
| `HelmsMeshVariants`     | Casque              |
| `CloakMeshVariants`     | Cape                |
| `PantsMeshVariants`     | Pantalon            |
| `BootsMeshVariants`     | Bottes              |
| `HairstyleMeshVariants` | Coiffure            |

Méthode : `RandomizeAppearance()` → `ApplyRandomMesh(Variants, MeshComp)` (statique).

### 8.4 Lifecycle BlueprintNativeEvent

| Méthode              | Déclencheur                                      | Implémentation         |
|----------------------|--------------------------------------------------|------------------------|
| `InitializeMob()`    | Appelé par `AHWEntitySpawner::ActivateMob()`          | C++ + override BP possible |
| `ResetMob()`         | Appelé lors du retour au pool                    | C++ + override BP possible |
| `MobDead()`          | Appelé lors de la mort (via `OnHealthChange`)    | C++ + override BP possible |

### 8.5 Dispatch de la Perception

```
AIPerceptionComp.OnTargetPerceptionUpdated → HandlePerceptionUpdated()
    ├─ Sight détecté → OnSightTargetDetected(Target) [BlueprintNativeEvent]
    └─ Hearing détecté → OnHearingNoiseDetected(NoiseLocation) [BlueprintNativeEvent]
```

### 8.6 Actions IA (BlueprintImplementableEvent)

Ces méthodes sont **définies en Blueprint** et appelées depuis le C++ :

| Méthode     | Appelé depuis                         |
|-------------|---------------------------------------|
| `Attack()`  | `AHWAIController::CommandAttack()`    |
| `Dodge()`   | `AHWAIController::CommandDodge()`     |
| `Retreat()` | `AHWAIController::CommandRetreat()`   |

---

## 9. Système de Spawn (Pool & Spawner)

### 9.1 `AHWEntityPoolManager`

> Source : `Source/HybeliorWorld/Public/Entity/Spawning/AHWEntityPoolManager.h`  
> Hérite de : `AActor`  
> Blueprint : `BP_EntityPoolManager` (`/Game/Blueprints/Entity/BP_EntityPoolManager`)

**Propriétés :**

| Propriété          | Type                                    | Valeur par défaut | Description                              |
|--------------------|------------------------------------------|-------------------|------------------------------------------|
| `InitialPoolSize`  | int32                                    | 50                | Nombre de mobs pré-instanciés au départ  |
| `MobClass`         | `TSubclassOf<AHWGASMobCharacter>`        | —                 | Classe de mob à pooler                   |
| `MobPool`          | `TArray<AHWGASMobCharacter*>`            | —                 | Liste des instances du pool              |

**Méthodes :**
- `GetPooledMob()` → renvoie un mob disponible (désactivé)
- `ActivateMob(Mob, SpawnLocation)` → active et repositionne le mob
- `DeactivateMob(Mob)` → remet le mob dans le pool
- `InitializePool()` → instancie `InitialPoolSize` mobs au BeginPlay

---

### 9.2 `AHWEntitySpawner`

> Source : `Source/HybeliorWorld/Public/Entity/Spawning/AHWEntitySpawner.h`  
> Hérite de : `AActor`  
> Blueprint : `BP_EntitySpawner` (`/Game/Blueprints/Entity/BP_EntitySpawner`)

**Propriétés configurables :**

| Propriété            | Type                                  | Expose | Description                               |
|----------------------|---------------------------------------|--------|-------------------------------------------|
| `MobToSpawnClass`    | `TSubclassOf<AHWGASMobCharacter>`     | Non    | Classe de mob à spawner                   |
| `MobNumber`          | int32 [1-100]                         | Oui    | Nombre de mobs à spawner                  |
| `MobLevelSpawner`    | int32                                 | Oui    | Niveau des mobs spawnés                   |
| `RespawnDelay`       | float (≥0)                            | Oui    | Délai avant respawn après mort            |
| `PlayerCheckInterval` | float                                | Non    | Intervalle de vérification joueur         |
| `MobPoolManager`     | `AHWEntityPoolManager*`                    | Non    | Référence au pool manager                 |
| `DetectionSphere`    | `USphereComponent*`                   | —      | Sphère de détection du joueur             |

**Méthodes Server (RPC) :**
- `ActivateMob()` — Server, Reliable, WithValidation
- `DeactivateMob()` — Server, Reliable, WithValidation

**Callbacks :**
- `OnPlayerEnterSphere()` → démarre les spawns
- `OnPlayerExitSphere()` → désactive les spawns
- `RespawnMob()` → appelé par le `RespawnTimerHandle`
- `DeactivateSpecificMob(Mob)` → désactive un mob individuel

**Logique de respawn :**  
`TQueue<float> RespawnQueue` — file d'attente des délais de respawn pour gérer les morts multiples simultanées.

---

## 10. Abilities IA (GAS)

### 10.1 `GA_Ai_ReadyToFight`

> Chemin : `/Game/AbilitySystem/Abilities/AI/GA_Ai_ReadyToFight`  
> Classe : `GameplayAbilityBlueprint`

**Rôle :** Prépare le mob au combat — équipe l'arme appropriée selon le tag actif (`Combat.Set.SwordAndShield` ou `Combat.Set.Bow`), applique l'effet GE et entre en état "prêt au combat".

**GameplayTags vérifiées :**
- `Combat.Set.SwordAndShield` → joue `Equip_02_Seq_Montage`
- `Combat.Set.Bow` → joue `Bow_Equip_Quick_Montage` / `Bow_Unequip_Quick_Montage`
- `InputTag.FirstCamera` — tag vérifié (usage caméra)

**GameplayEffect appliqué :** `GE_ReadyToFight` (`/Game/AbilitySystem/GEs/Combat/GE_ReadyToFight`)

**Tag résultant :** `Combat.State.ReadyToFight` — ajouté par `GE_ReadyToFight`, lu par `BTService_CheckHasTag`

**Animations :**
- `/Game/Assets/Characters/Mannequin_UE4/Animations/Archery/RootMotion/Bow_Equip_Quick_Montage`
- `/Game/Assets/Characters/Mannequin_UE4/Animations/Archery/RootMotion/Bow_Unequip_Quick_Montage`
- `/Game/Assets/Characters/Mannequin_UE4/Animations/EssentialSwordShieldAnimations/Equip_02_Seq_Montage`

**Task GAS :** `AbilityTask_PlayMontageAndWait`

**Abilities bloquées pendant l'exécution :**
- `GA_FollowDirectionInput` (`/Game/AbilitySystem/Abilities/Movement/`)
- `GA_FollowMouseDirection`

---

### 10.2 `GA_TestMobAttack`

> Chemin : `/Game/AbilitySystem/Abilities/AI/GA_TestMobAttack`  
> Classe : `GameplayAbilityBlueprint`

**Rôle :** Attaque au corps à corps — joue un montage d'attaque, vérifie la hitbox, applique des dégâts.

**Tags d'activation requis :** `Combat.State.ReadyToFight` (ActivationRequiredTags)

**Animation :** `/Game/Assets/Characters/Mannequin_UE4/Animations/FightingAnimsetPro/InPlace/KB_m_Jab_R_Montage`

**GameplayEffect dégâts :** `GE_FireballDamageEffect` (`/Game/AbilitySystem/GEs/Damage/GE_FireballDamageEffect`)

**Fonctions de hitbox :**
- `GetAllActorsInMeleeHitbox()` — retourne tous les acteurs dans la hitbox de mêlée
- `GetClosestActorInMeleeHitbox()` — retourne l'acteur le plus proche

**Task GAS :** `AbilityTask_PlayMontageAndWait`  
**Callbacks :** `OnCompleted`, `OnBlendOut`, `OnInterrupted`, `OnCancelled`

**Application des dégâts :** `BP_ApplyGameplayEffectToTarget(GE_FireballDamageEffect)`

---

### 10.3 `GA_EntityFireball`

> Chemin : `/Game/AbilitySystem/Abilities/AI/GA_EntityFireball`  
> Classe : `GameplayAbilityBlueprint`

**Rôle :** Attaque à distance — lance un projectile (fire ou ice) après montage de cast.

**Tags bloquant l'activation :** `Combat.State.DodgedRecently` (ActivationBlockedTags)

**GameplayEffect de coût :** `GE_ManaCostFor_Fireball` (`/Game/AbilitySystem/GEs/Cost/GE_ManaCostFor_Fireball`)

**GameplayEffect dégâts :** `GE_FireballDamageEffect`

**Animation :** `/Game/Assets/Characters/Mannequins/Animations/Manny/Montages/AM_Cast`

**Projectiles :**
- `BP_FireProjectile01` (`/Game/AbilitySystem/Projectiles/BP_FireProjectile01`)
- `BP_IceProjectile01` (`/Game/AbilitySystem/Projectiles/BP_IceProjectile01`)

**Variable :** `ProjectileActor` — classe du projectile à spawner (configurable)

**Task GAS :** `AbilityTask_PlayMontageAndWait`  
**Callbacks :** `OnCompleted`, `OnBlendOut`, `OnInterrupted`, `OnCancelled`

**Flag :** `bCanHitSelf = false`

---

## 11. Diagramme de flux IA

```
[Joueur entre dans DetectionSphere]
        │
        ▼
AHWEntitySpawner::ActivateMob() [Server RPC]
        │
        ▼
AHWEntityPoolManager::GetPooledMob() → ActivateMob(Mob, Location)
        │
        ▼
AHWGASMobCharacter::InitializeMob()
  ├─ Scaling stats (HP = HealthPerLevel × MobLevel)
  ├─ GrantDefaultAbilities()
  └─ RandomizeAppearance()
        │
        ▼
AHWAIController::OnPossess(Pawn)
  ├─ Cast → ControlledCharacter
  ├─ ConfigurePerceptionComponent()
  │    └─ Sight: radius=3000, loseRadius=3500, angle=90°, maxAge=5s
  ├─ UseBlackboard(BB_EnemyBase)
  ├─ RunBehaviorTree(BT_EnemyBase)
  └─ Timer 0.5s → UpdateBlackboardValues()
        │
        ▼
[BT_EnemyBase en cours d'exécution]
        │
  ┌─────┴────────────────────────────────────────────┐
  │   Services (tick continu)                        │
  │   ├─ BTService_CheckDistanceToHome               │
  │   │    → IsRunningHome = dist > seuil            │
  │   └─ BTService_CheckHasTag                       │
  │        → IsReadyToFight = HasTag(ReadyToFight)   │
  └──────────────────────────────────────────────────┘
        │
  ┌─────┴────────────────────────────────────────────┐
  │   Sélecteur principal                            │
  │   ├─ IsRunningHome → BTTask_MoveTo(Home)         │
  │   ├─ Target Set → Combat Flow                    │
  │   │    ├─ !IsReadyToFight → GA_Ai_ReadyToFight   │
  │   │    ├─ BTTask_FocusTarget                     │
  │   │    ├─ BTTask_MoveTo(Target)                  │
  │   │    └─ GA_TestMobAttack                       │
  │   ├─ HeardNoise → BTTask_MoveTo(Noise)           │
  │   └─ Patrol → FindPointInRadius → MoveTo → Wait  │
  └──────────────────────────────────────────────────┘
        │
[Mob mort → OnHealthChange → MobDead()]
        │
AHWAIController::DeactivateMobAI()
        └─ BrainComponent.StopLogic("Dead")
AHWEntitySpawner → StartRespawnTimer(RespawnDelay)
AHWEntityPoolManager::DeactivateMob(Mob)
```

---

## 12. Références des assets

### Assets IA (`/Game/Blueprints/Entity/`)

| Nom                            | Type                   | Description                                     |
|--------------------------------|------------------------|-------------------------------------------------|
| `BB_EnemyBase`                 | BlackboardData         | Blackboard principal (8 clés)                   |
| `BB_Tuto`                      | BlackboardData         | Blackboard tutoriel (1 clé)                     |
| `BT_EnemyBase`                 | BehaviorTree           | BT principal de combat                          |
| `BT_Tuto`                      | BehaviorTree           | BT tutoriel simplifié                           |
| `BTTask_FocusTarget`           | Blueprint (BTTask)     | Focus caméra/rotation vers la cible             |
| `BTTask_FindPointInRadiusOfHome` | Blueprint (BTTask)   | Calcul point de patrol autour du spawn          |
| `BTTask_ClearBlackboardEntry`  | Blueprint (BTTask)     | Efface une clé Blackboard                       |
| `BTTask_Abilities`             | Blueprint (BTTask)     | Active une GameplayAbility via GAS              |
| `BTService_CheckHasTag`        | Blueprint (BTService)  | Vérifie tag GameplayTag → met à jour IsReadyToFight |
| `BTService_CheckDistanceToHome` | Blueprint (BTService) | Vérifie distance spawn → met à jour IsRunningHome |
| `BP_HWAIController`            | Blueprint (AIController) | Shell BP de AHWAIController (C++)             |
| `BP_TestEntityAIController`       | Blueprint (AIController) | Contrôleur de test BP pur (AAIController)     |

### Assets Entity (`/Game/Blueprints/Entity/`)

| Nom                   | Type                    | Parent C++              |
|-----------------------|-------------------------|-------------------------|
| `BP_TestEntity`          | Blueprint               | `AHWGASMobCharacter`    |
| `BP_EntitySpawner`       | Blueprint               | `AHWEntitySpawner`           |
| `BP_EntityPoolManager`   | Blueprint               | `AHWEntityPoolManager`       |
| `BP_SpawnTrainingDummy` | Blueprint             | —                       |

### Abilities IA (`/Game/AbilitySystem/Abilities/AI/`)

| Nom                   | Type                       | Tags requis                     |
|-----------------------|----------------------------|---------------------------------|
| `GA_Ai_ReadyToFight`  | GameplayAbilityBlueprint   | —                               |
| `GA_TestMobAttack`    | GameplayAbilityBlueprint   | `Combat.State.ReadyToFight`     |
| `GA_EntityFireball`      | GameplayAbilityBlueprint   | Bloqué par `Combat.State.DodgedRecently` |

### Sources C++ IA

| Fichier                                                    | Rôle                                   |
|------------------------------------------------------------|----------------------------------------|
| `Public/Entity/Controllers/HWAIController.h`                  | Interface du contrôleur IA C++         |
| `Private/Entity/Controllers/HWAIController.cpp`               | Implémentation complète                |
| `Public/Entity/Spawning/AHWEntityPoolManager.h`                     | Interface du pool manager              |
| `Private/Entity/Spawning/AHWEntityPoolManager.cpp`                  | Logique de pooling                     |
| `Public/Entity/Spawning/AHWEntitySpawner.h`                         | Interface du spawner                   |
| `Private/Entity/Spawning/AHWEntitySpawner.cpp`                      | Logique de spawn/respawn               |
| `Public/Character/HWGASMobCharacter.h`                     | Base class des mobs                    |
| `Private/Character/HWGASMobCharacter.cpp`                  | Lifecycle, perception, nameplate       |

---

*Documentation générée via inspection directe des assets UE5.4 par MCP Unreal Editor — extraction Python sur binaire uasset + lecture des sources C++.*
