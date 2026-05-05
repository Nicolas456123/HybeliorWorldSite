---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# GameplayTags

Singleton C++ `FHWGameplayTags` : 93 tags natifs initialisés au chargement, couvrant inputs, états, dégâts, réactions, armes, ressources, UI.

## Sources

- `HWGameplayTags.h` / `HWGameplayTags.cpp` — définition du singleton
- `FHWGameplayTags::InitializeNativeTags()` — appelé depuis `UHWAssetManager::StartInitialLoading()`

## API

```cpp
// Recherche d'un tag par string (partial match optionnel)
static FGameplayTag FindTagByString(FString TagString, bool bMatchPartialString = false);
```

## Décompte par catégorie (93 tags)

| Catégorie | Nombre | Exemples |
|-----------|--------|----------|
| Ability Activation Failures | 8 | IsDead, Cooldown, Cost, TagsBlocked, TagsMissing, Networking, ActivationGroup, SurvivesDeath |
| Input Tags (modernes) | 22 | Move, Look.Mouse, Look.Stick, Jump, Sprint, Dash, Crouch, Target, Flying, FlyingUp/Down, Weapon.Left/Right... |
| Input Tags (legacy) | 9 | Interact, Abilities.Dash, Abilities.Jump... (compatibilité DataAssets) |
| Gameplay Events | 3 | Death, Reset, RequestReset |
| Status | 5 | Crouching, AutoRunning, Death, Death_Dying, Death_Dead |
| Movement States | 8 | Walking, Running, Sprinting, Crouching, Swimming, Flying, Driving, OnBoat |
| Combat States | 10 | Invulnerable, IFrame, ReadyToFight, Dead, Burning, Wet, Cold, Electrified, Frozen, Charged |
| Combat (autres) | 6 | Set, DamageType, Flags.CriticalHit, Cooldowns, ActivateFromEvent (x2) |
| Damage Types | 4 | Fire, Water, Ice, Lightning |
| Elemental Reactions | 7 | Vaporize, Melt, Freeze, Overload, Superconduct, ElectroCharge, Shatter |
| Weapon Types | 8 | Sword, Axe, Mace, Dagger, Bow, Staff, Spear, Shield |
| Combo Types | 3 | Light, Heavy, Special |
| Resources | 3 | Mana, Stamina, Energy |
| NPC Indicators | 3 | QuestAvailable, QuestInProgress, QuestComplete |
| Item Rarities | 5 | Common, Uncommon, Rare, Epic, Legendary |
| Unlock System | 4 | Weapon.Sword.Combo1, etc. |
| Dialogue Actions | 3 | AcceptQuest, GiveItem, OpenShop |
| Quest/Location | 4 | IDs questes, locations |
| GameplayCue Tags | 12 | Combat.Hit, Combat.Critical, Combat.Death, Reaction.Vaporize... |

## Notes

- Les Input Tags legacy subsistent pour compatibilité avec des DataAssets non migrés.
- La plupart des tags critiques (Combat.State.*, Combat.DamageType.*) sont consommés par [[Combat Attribute Set]] et [[Elemental Reactions]].

## Voir aussi

- [[Ability System Component]] — `UHWAbilitySystemComponent::AbilityInputTagPressed(const FGameplayTag& InputTag)` résout les `InputTag_*` de `FHWGameplayTags` contre les `DynamicAbilityTags` des specs ; le tag natif `TAG_Gameplay_AbilityInputBlocked` (défini dans `HWAbilitySystemComponent.cpp:4` via `UE_DEFINE_GAMEPLAY_TAG`) est testé dans `ProcessAbilityInput()` pour bloquer toutes les activations.
- [[Ability Tag Relationship Mapping]] — la struct `FHWAbilityTagRelationship` (`HWAbilityTagRelationshipMapping.h:21`) déclare ses `FGameplayTag`/`FGameplayTagContainer` avec la meta `Categories = "Gameplay.Action"`, filtrant l'éditeur sur une sous-hiérarchie des tags exposés par `FHWGameplayTags`.
- [[Elemental Reactions]] — `UHWElementalReactionSystem::CheckReaction` lit les 4 `Combat_DamageType_*` et les 6 `Combat_State_*` (Burning/Wet/Cold/Frozen/Electrified/Charged) depuis `FHWGameplayTags::Get()` (`HWElementalReactionSystem.cpp:16-27`) pour dériver `bIsFire/bIsWater/bTargetWet/...`.
- [[Combat Attribute Set]] — `UHWCombatAttributeSet::SetupGameplayTags()` copie 15 membres de `FHWGameplayTags::Get()` (DeadTag, FireDamageTag, WetTag, BurningTag, ColdTag, ChargedTag, FrozenTag, CriticalHitTag, InvulnerableTag, etc.) dans ses champs privés pour usage dans `HandlePreExecuteEffectDamage`.
