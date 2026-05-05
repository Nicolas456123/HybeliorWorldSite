---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Cross-System — GAS & Combat

Intégrations entre le GameplayAbilitySystem (GAS) et le système Combat (Combo, Mastery, Elemental Reactions).

---

## GAS (AbilitySystem)

### Fichiers analysés

- `AbilitySystem/HWAbilitySystemComponent.h`
- `AbilitySystem/HWGameplayAbility.h`
- `AbilitySystem/HWAttributeSet.h`
- `AbilitySystem/HWCombatAttributeSet.h`
- `AbilitySystem/HWGameplayAbilitySet.h`
- `AbilitySystem/HWGameplayEffectExecutionCalc.h`
- `AbilitySystem/HWGameplayTags.h`

### GAS → Character

```
HWCombatAttributeSet
  │  AHWGASCharacter* WhoAttackedUsLast   ──► direct pointer vers Character
  │
HWGameplayAbility
  │  GetHWAvatarActor() → AHWGASCharacter*  ──► cast direct
  │
HWAttributeSet
  │  GetHWAbilitySystemComponent()           ──► appel direct sur ASC
```

**Mode** : Appel direct / cast
**Risque** : **FORT** — `HWCombatAttributeSet` stocke un raw pointer `AHWGASCharacter* WhoAttackedUsLast`. Ce champ n'est ni `TWeakObjectPtr` ni répliqué correctement. En cas de mort/despawn du Character attaquant, le pointeur devient dangling.

### GAS → Combat

```
HWGameplayAbility
  │  GetFloatValueFromCombatData()  ──► UHWCombatDataSubsystem (GameInstance)
  │
HWCombatAttributeSet
  │  Tags élémentaux (Fire/Water/Ice/Lightning)
  │  Tags réactions (Wet/Burning/Cold/Electrified/Frozen/Charged)
  │  ApplyBurning/Cold/Wet/Electrified/Frozen/ChargedGameplayEffect  ──► GE injectées par GameMode
  │  PostGameplayEffectExecute()  ──► appelle HWElementalReactionSystem::CheckReaction()
```

**Mode** : Tags GameplayTags + GameplayEffects appliqués via ASC
**Risque** : **MOYEN** — Les `TSubclassOf<UGameplayEffect>` dans `HWCombatAttributeSet` ne sont jamais affectées en C++ pur (pas de constructeur visible) ; elles sont renseignées via le `AHWGameMode` au `StartPlay()`. Si le GameMode n'est pas `AHWGameMode`, les effets sont null.

### GAS → Inventory

```
HWInventoryComponent
  │  ApplyEquipmentStats(FHWInventoryItem)  ──► crée un dynamic GE et l'applique sur l'ASC
  │  RemoveEquipmentStats(FGuid)            ──► retire le GE via FActiveGameplayEffectHandle
  │  ActiveEquipmentEffects: TMap<FGuid, FActiveGameplayEffectHandle>
```

**Mode** : Appel direct vers ASC + `FActiveGameplayEffectHandle`
**Risque** : **MOYEN** — `HWInventoryComponent` doit localiser l'ASC du owner au runtime. Si le composant est sur un conteneur ou un NPC sans ASC, cela crashera silencieusement.

### GAS → Progression

```
HWProgressionComponent
  │  GetOwnerASC() : UAbilitySystemComponent*  ──► forward declare + cast
  │  ApplyRewards()  ──► si reward.RewardType == Ability → ASC->GiveAbility()
  │              ──► si reward.RewardType == PassiveEffect → ASC->ApplyGE()
```

**Mode** : Appel direct sur ASC
**Risque** : **FAIBLE** — Bien isolé derrière `GetOwnerASC()`.

---

## Combat

### Fichiers analysés

- `Combat/HWComboComponent.h`
- `Combat/HWWeaponMasteryComponent.h`
- `Combat/HWElementalReactionSystem.h`
- `Combat/HWCombatDataSubsystem.h`
- `Combat/HWWeaponMoveset.h`
- `Combat/HWHitboxGeneratorActor.h`

### Combat → GAS

```
HWElementalReactionSystem::ApplyReaction()
  │  param: UAbilitySystemComponent* TargetASC  ──► applique/retire loose tags
  │  statique — pas de couplage à l'instance

HWComboComponent::ConsumeStamina()
  │  doit trouver l'ASC du owner pour modifier l'attribut Stamina  ──► indirect via Character

HWComboComponent::HasEnoughStamina()
  │  doit lire l'attribut Stamina  ──► accès à HWCombatAttributeSet
```

**Mode** : Passage d'ASC en paramètre (stateless) / accès indirect
**Risque** : **FAIBLE** pour `ElementalReactionSystem` (pattern propre). **MOYEN** pour `ComboComponent` (accès attributs implicite).

### Combat → WeaponMastery

```
HWComboComponent
  │  CachedMasteryComponent: TObjectPtr<UHWWeaponMasteryComponent>  ──► direct reference
  │  GetCurrentMasteryLevel()  ──► lecture MasteryData
  │  GetAccessibleAttacks()    ──► filtre les attaques selon mastery level
  │  NotifyHitConfirmed()      ──► appelle MasteryComponent->AddMasteryExperience()
```

**Mode** : Référence directe entre composants co-localisés
**Risque** : **FAIBLE** — Couplage justifié, composants sur le même pawn. Cachée au BeginPlay.

### Combat → Progression

```
HWWeaponMasteryComponent
  │  AddMasteryExperience()  → pas d'appel direct à Progression en header
  │  (MANQUE)
```

**Mode** : **MANQUANT** — La mastery accumule de l'XP mais ne notifie pas `HWProgressionComponent::IncrementProgress(EHWConditionType::MasteryLevel)`.

### Combat → Quest

**Mode** : **INDIRECT** — Via `HWQuestComponent::UpdateQuestProgress(EHWConditionType::KillCount)` appelé depuis le code métier de mort (dans `OnDeath`, implémenté en Blueprint ou dans `HWCombatAttributeSet::PostGameplayEffectExecute`).

**Risque** : **FORT** — Aucun appel natif visible dans les headers. La mise à jour des objectifs "tuer X ennemis" repose entièrement sur une implémentation Blueprint ou une convention non vérifiable en C++.

---

## Voir aussi

- [[Cross System Overview]] — positionne les risques FORT `CombatAttributeSet → Character` (raw pointer `WhoAttackedUsLast`) et MOYEN `GameMode → CombatAttributeSet GEs` (injection `StartPlay`) dans le tableau global.
- [[Cross System Character Inventory]] — documente `AHWGASPlayerCharacter` qui possède `ComboComponent` / `WeaponMasteryComponent` (couplage direct sur le même pawn) et applique `GA_ReadyToFight`/`GA_UnarmedAttack` via l'ASC.
- [[Cross System Progression Quest]] — confirme l'absence d'appel natif de `HWWeaponMasteryComponent::AddMasteryExperience()` vers `HWProgressionComponent::SetProgress(EHWConditionType::MasteryLevel, ...)` (MANQUE FORT).
- [[Cross System Circular Deps]] — confirme la circulaire `GAS ↔ Character` gérée par forward declare (commentaire `//Forward declare to stop circular reference` dans `HWAttributeSet.h`) et le cycle potentiel `PostGameplayEffectExecute → ElementalReactionSystem → ASC->ApplyGameplayEffectToSelf`.
- [[Network Replication Audit]] — documente le mode `Mixed` sur `AHWGASPlayerCharacter.cpp:106` et `Minimal` sur `AHWGASMobCharacter.cpp:41`, plus l'anomalie `UHWComboComponent` répliqué sans propriété (`HWComboComponent.cpp:14`).
- [[Performance Analysis]] — section P1.2 chiffre 3 `HasMatchingGameplayTag` par frame dans `AHWGASPlayerCharacter::Tick` (HWGASPlayerCharacter.cpp:542–603) et recommande le passage à `OnGameplayTagChanged`.
