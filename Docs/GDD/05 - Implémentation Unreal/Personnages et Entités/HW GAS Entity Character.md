---
tags: [implementation, ue5, character, entity, gas, variants]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [10-variants-cosmiques, scaling-era]
implements: [Les Ères]
---

# HW GAS Entity Character

Classe `AHWGASEntityCharacter` — entité non-joueur (mob hostile, PNJ amical, marchand, etc.). Hérite de [[HW GAS Character]].

> Le projet ne distingue plus mobs et NPCs : toute entité non-joueur est une "entité" — hostile ou amicale, avec ou sans dialogue, IA avancée ou non.

## Refonte variants cosmiques — 10 slots canoniques (au lieu de 6)

> Voir [[Les Ères]] (`Documentation_v2/03 - Mécaniques/Les Ères.md`).
>
> Le système actuel expose **6 slots Mesh randomisés** dans le Blueprint d'entité. Le canon GDD post-refonte impose **10 variants cosmiques** mappés aux entités cosmiques :
>
> | # | Variant | Entité cosmique |
> |---|---|---|
> | 1 | Shadow | Noctis |
> | 2 | Spectral | Tempora |
> | 3 | Burned | Eldoria (endormie / Mont Cendra) |
> | 4 | Frozen | Aetheris |
> | 5 | Stormborn | Vortex |
> | 6 | Verdant | Arborius (Céleste) |
> | 7 | Stone | Gravitas |
> | 8 | Tidal | Aquor |
> | 9 | Radiant | Stellaris |
> | 10 | Voidtouched | Etherius |
>
> (Le mapping exact dépend de la liste 12 Cosmiques canon GDD/17 — voir [[Les Ères]] pour la liste à jour. La liste ci-dessus est indicative ; ajuster en V4.)
>
> **Action requise** : étendre `EHWEntityVariant` de 6 → 10 valeurs et mettre à jour les `EntityDataAsset` pour exposer 10 slots Mesh. Documentation seule en V3.

## Scaling par Ère

L'entité doit aussi exposer un **scaling de stats** dépendant de l'ère active du serveur (`HWEnvironmentManager.CurrentEra`). Une entité Shadow génère plus de Souffle si l'ère active est Noctis. Voir [[HW Environment Manager]] phase EraGenerator.

## Lifecycle (4 etats)

```
1. InitializeEntity() [BlueprintNativeEvent]
   -> MaxHealth = EntityLevel x HealthPerLevel (450)
   -> MaxMana   = EntityLevel x ManaPerLevel  (200)
   -> GrantDefaultAbilities()
   -> ActivateEntityAI() -> RestartLogic() BT

2. Combat [IA actif]
   -> AIPerception -> Blackboard -> BT
   -> Attack() / Dodge() / Retreat() [BlueprintImplementableEvent]

3. EntityDead() [BlueprintNativeEvent]
   -> RollLoot() depuis LootTable
   -> DeactivateEntityAI() -> StopLogic()
   -> OwningSpawner->DeactivateSpecificEntity(this)

4. ResetEntity() [BlueprintNativeEvent]
   -> StopAllAbilities() + RemoveAllEffects()
   -> Restore Health/Mana
   -> Clear Blackboard references
   -> DeactivateEntityAI()
```

Voir [[Entity Pool Manager]] pour l'integration pool.

## Scaling stats

| Propriete | Defaut | Formule |
|-----------|--------|---------|
| HealthPerLevel | 450.0 | MaxHealth = EntityLevel * 450 |
| ManaPerLevel | 200.0 | MaxMana   = EntityLevel * 200 |

## Perception IA

`AIPerceptionComp` est un component direct sur la classe (lignes ~42-43 de `HWGASEntityCharacter.h`). Sight + Hearing. Configuration detaillee dans [[AI Controller]].

## Randomisation visuelle (6 slots)

Arrays de variantes mesh :
- `ChestMeshVariants`
- `HelmsMeshVariants`
- `CloakMeshVariants`
- `PantsMeshVariants`
- `BootsMeshVariants`
- `HairstyleMeshVariants`

`RandomizeAppearance()` → selection aleatoire au spawn.

## Collision personnalisee

```cpp
bool bOverrideCapsuleSize = false;
float EntityCapsuleRadius       = 42.0f;
float EntityCapsuleHalfHeight   = 96.0f;
```

Applique dans `BeginPlay()` si `bOverrideCapsuleSize = true`.

## Loot

`RollLoot()` est appelee dans `EntityDead()` via [[Entity Pool Manager|UHWLootTable]].

> **Bug connu :** `KillerLevel` utilise `EntityLevel` au lieu du niveau du joueur tueur.

## Methodes cles

| Methode | Role |
|---------|------|
| `UpdateEntityNameplate()` | Met a jour widget nameplate (HP, HP%, niveau) — voir [[Nameplate]] |
| `GrantDefaultAbilities()` | Accorde les abilities de `DefaultAbilities[]` depuis `PossessedBy()` |
| `HandlePerceptionUpdated(AActor*, FAIStimulus)` | UFUNCTION liee a `OnPerceptionUpdated` — dispatche vers Sight/Hearing |
| `OnSightTargetDetected(AHWGASCharacter* Target)` | BlueprintNativeEvent — callback detection visuelle |
| `OnHearingNoiseDetected(FVector NoiseLocation)` | BlueprintNativeEvent — callback detection sonore |

## Abilities GAS accordees

Dans `DefaultAbilities[]` (accordees par `GrantDefaultAbilities()`) :

- `GA_Ai_ReadyToFight` → accorde `Combat.State.ReadyToFight` + GE_ReadyToFight
- `GA_TestMobAttack` → attaque melee + hitbox (DT_AnimHitBox)
- `GA_EntityFireball` → projectile + cout mana

## Blueprints lies

| Classe C++ | Blueprint | Chemin |
|-----------|-----------|--------|
| AHWGASEntityCharacter | BP_TestEntity | /Game/Entity/ |
| AHWGASEntityCharacter | BP_HWEntity | /Game/Entity/ |

## BlueprintImplementableEvent

| Methode C++ | Implementation dans BP |
|-------------|----------------------|
| `InitializeEntity()` | BP_TestEntity : init stats, effets spawn, activer IA |
| `EntityDead()` | BP_TestEntity : drop loot, anim mort, sons |
| `ResetEntity()` | BP_TestEntity : retour pool, reset composants |
| `Attack()` | BP_TestEntity : montage + GA_TestMobAttack |
| `Dodge()` | BP_TestEntity : esquive + I-frames |
| `Retreat()` | BP_TestEntity : fuite NavMesh |

> **Incoherence :** animations entite non repliquees (BlueprintImplementableEvent).

## Assets associés
- [[AI Blueprints]] — catalogue des BP IA (BB_EnemyBase, BT_EnemyBase, BTTasks/Services)
- [[Character Blueprints]] — catalogue des BP personnages (BP_TestEntity, BP_HWEntity)

## Voir aussi

- [[HW GAS Character]] — classe parente declaree `AHWGASEntityCharacter : public AHWGASCharacter` (`HWGASEntityCharacter.h:25`) ; override `OnHealthChange(const FOnAttributeChangeData&)` (`HWGASEntityCharacter.h:226`) pour declencher `EntityDead()` quand la Health de l'ASC passe a 0.
- [[AI Controller]] — reference `TObjectPtr<AHWAIController> CachedAIController` (`HWGASEntityCharacter.h:167`) assignee dans `PossessedBy()` via `Cast<AHWAIController>(NewController)` (`HWGASEntityCharacter.cpp:120`) ; `InitializeEntity_Implementation` appelle `CachedAIController->ActivateEntityAI()` et `ResetEntity_Implementation` appelle `DeactivateEntityAI()`.
- [[Entity Spawner]] — propriete `AHWEntitySpawner* OwningSpawner` (`HWGASEntityCharacter.h:175`) ; `EntityDead_Implementation` appelle `OwningSpawner->DeactivateSpecificEntity(this)` (`HWGASEntityCharacter.cpp:239`) et `UpdateLastLocationSeen()` ecrit `OwningSpawner->LastLocationSeen`.
- [[Entity Pool Manager]] — pool `TArray<AHWGASEntityCharacter*> EntityPool` (`HWEntityPoolManager.h:29`) ; les methodes `ActivateEntity(Entity, Location)` et `DeactivateEntity(Entity)` du manager invoquent les lifecycle events `InitializeEntity()` / `ResetEntity()` declares ici (`HWGASEntityCharacter.h:50-57`).
- [[Nameplate]] — composant `UHWEntityNameplateWidgetComponent* EntityNameplateWidgetComponent` (`HWGASEntityCharacter.h:39`) rafraichi par `UpdateEntityNameplate()` (`HWGASEntityCharacter.h:69`), appele a chaque `OnHealthChange`.
- [[Loot System]] — propriete `TObjectPtr<UHWLootTable> LootTable` (`HWGASEntityCharacter.h:187`) ; `EntityDead_Implementation` appelle `LootTable->RollLoot(KillerLevel, 1.0f)` (`HWGASEntityCharacter.cpp:226`) pour produire `TArray<FHWLootResult>`.
- [[Anim Instance]] — herite de `AHWGASCharacter` donc compatible avec le cast `Cast<AHWGASCharacter>(TryGetPawnOwner())` fait dans `UHWPlayerAnimInstance::NativeInitializeAnimation` ; les entites peuvent ainsi reutiliser l'AnimInstance partagee.
