---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Cross-System — Progression, Quest & Entity/Dialogue

Intégrations entre le système Progression (unlocks), Quest et Entity/Dialogue (NPC, merchants).

---

## Progression

### Fichiers analysés

- `Progression/HWProgressionComponent.h`
- `Progression/HWUnlockDefinition.h`
- `Progression/HWUnlockableReward.h`
- `Progression/HWUnlockCondition.h`
- `Progression/HWLocationTrigger.h`

### Progression → GAS (récompenses)

```
HWProgressionComponent::ApplyRewards()
  │  EHWRewardType::Ability       ──► ASC->GiveAbility(Reward.AbilityClass)
  │  EHWRewardType::PassiveEffect ──► ASC->ApplyGameplayEffectToSelf(Reward.EffectClass)
  │  EHWRewardType::StatBonus     ──► (MANQUE : pas de mapping visible vers un GE ou attribut)
```

**Mode** : Appel direct sur ASC via `GetOwnerASC()`
**Risque** : **FORT** pour `StatBonus` — Le type `EHWRewardType::StatBonus` avec `BonusValue` n'a pas d'implémentation C++ visible pour son application sur les attributs GAS. C'est un trou fonctionnel.

### Progression → Quest

```
HWProgressionComponent
  │  EHWConditionType::QuestCompleted  ──► condition vérifiable via HWQuestComponent
  │  (pas de référence directe à HWQuestComponent dans ce header)
```

**Mode** : Data-driven via tags — Progression vérifie `IsQuestCompleted()` sur `HWQuestComponent` du owner
**Risque** : **MOYEN** — Le couplage est implicite. `HWProgressionComponent::AreConditionsMet()` doit localiser le `HWQuestComponent` par `GetOwner()->FindComponentByClass<UHWQuestComponent>()`.

### Progression → Combat (conditions)

```
HWProgressionComponent::IncrementProgress()
  │  EHWConditionType::KillCount      ──► doit être appelé après chaque kill
  │  EHWConditionType::ReactionCount  ──► doit être appelé après chaque réaction élémentaire
  │  EHWConditionType::MasteryLevel   ──► doit être mis à jour par WeaponMasteryComponent
```

**Mode** : Push (les systèmes appellent `IncrementProgress`) — unidirectionnel
**Risque** : **FORT** — Ce couplage repose entièrement sur une **convention** : chaque système doit se souvenir d'appeler `IncrementProgress`. Il n'y a pas de mécanisme centralisé (event bus, observer) garantissant que chaque kill notifie la progression.

### Delegate `OnUnlockAchieved`

```
HWProgressionComponent::OnUnlockAchieved
  │  Broadcast: (FGameplayTag UnlockID, TArray<FHWUnlockableReward> Rewards)
  │  ──► UI peut s'abonner pour afficher la notification
  │  ──► Quest peut s'abonner pour déclencher une quête cachée
```

**Mode** : Dynamic Multicast Delegate
**Risque** : **FAIBLE** — Pattern propre.

---

## Quest

### Fichiers analysés

- `Progression/HWQuestComponent.h`
- `Progression/HWQuestData.h`

### Quest → Progression

```
HWQuestComponent
  │  import: class UHWProgressionComponent  ──► forward declare
  │  UpdateQuestProgress() partage EHWConditionType avec HWProgressionComponent
  │  ApplyQuestRewards()  ──► FHWQuestReward contient:
  │    - ExperienceReward: int32  ──► MANQUE: pas d'appel visible à ProgressionComponent
  │    - GoldReward: int32        ──► MANQUE: pas de système monétaire natif visible
  │    - ItemRewards: TMap<FGameplayTag, int32>  ──► MANQUE: pas d'appel à HWInventoryComponent
  │    - UnlockReward: FGameplayTag  ──► MANQUE: pas d'appel à ProgressionComponent.Unlock()
  │    - ReputationRewards: TMap<FGameplayTag, int32>  ──► MANQUE: pas de système réputation
```

**Mode** : **PARTIELLEMENT MANQUANT** — voir [[Cross System Circular Deps]] pour les détails critiques
**Risque** : **CRITIQUE** — `ApplyQuestRewards()` est une méthode protected sans corps visible dans le header. Les récompenses de quête définies dans `FHWQuestReward` ne sont pas câblées nativement vers les systèmes cibles.

### Quest → Dialogue

```
HWQuestData
  │  AcceptDialogueID: FGameplayTag   ──► référence par tag (data-driven)
  │  CompleteDialogueID: FGameplayTag ──► référence par tag
  │  QuestGiverTag: FGameplayTag      ──► référence au NPC par tag
```

**Mode** : Tags GameplayTags (découplé)
**Risque** : **FAIBLE** — Pattern correct via DataAsset. Mais le résolvage tag→Entity→Dialogue n'est pas implémenté en C++ visible.

### Delegates Quest

```
HWQuestComponent::OnQuestAccepted   (QuestID, QuestData)
HWQuestComponent::OnQuestCompleted  (QuestID, FHWQuestReward)
HWQuestComponent::OnQuestObjectiveUpdated (QuestID, ObjectiveIndex, NewProgress)
HWQuestComponent::OnQuestDiscovered (QuestID, QuestData)
```

**Mode** : Dynamic Multicast Delegates — broadcast vers UI, NPC
**Risque** : **FAIBLE** — Pattern correct.

---

## Entity / Dialogue

### Fichiers analysés

- `Entity/HWEntityComponent.h`
- `Entity/HWDialogueData.h`
- `Entity/HWDialogueComponent.h`

### Entity → Quest

```
HWNPCComponent
  │  AvailableQuests: TArray<FGameplayTag>  ──► liste des quêtes offrables
  │  HasQuestForPlayer(ACharacter*)         ──► vérifie HWQuestComponent sur le joueur
  │  GetNPCIndicator(ACharacter*)           ──► !, ?, ou rien selon état des quêtes
  │    └─► cast ACharacter → AHWGASPlayerCharacter → QuestComponent
```

**Mode** : Appel direct castant vers Character
**Risque** : **MOYEN** — `GetDialogueForPlayer(ACharacter*)` et `HasQuestForPlayer(ACharacter*)` prennent un `ACharacter*` générique mais doivent caster vers `AHWGASPlayerCharacter` pour accéder au `QuestComponent`.

### Entity → Dialogue

```
HWNPCComponent
  │  DefaultDialogue: UHWDialogueData*
  │  ConditionalDialogues: TMap<FGameplayTag, UHWDialogueData*>  ──► condition → dialogue
  │  OnDialogueStarted delegate  ──► (Player, Dialogue)
  │  OnDialogueAction delegate   ──► (Player, ActionTag, ActionParameter)
```

**Mode** : Ownership direct + delegate
**Risque** : **FAIBLE**

### Dialogue → Quest (actions)

```
HWDialogueComponent::ProcessDialogueAction()
  │  FHWDialogueChoice::ActionTag = "Action.AcceptQuest"
  │    └─► DOIT appeler HWQuestComponent::AcceptQuest(ActionParameter)
  │  ActionTag = "Action.OpenShop"
  │    └─► DOIT ouvrir l'UI marchand via PlayerController
  │
AHWPlayerController::HandleDialogueAction(ActionTag, ActionParameter)
  │  ──► point d'entrée centralisé pour toutes les actions dialogue
```

**Mode** : Appel via PlayerController (Mediator pattern)
**Risque** : **FAIBLE** — `HandleDialogueAction()` existe en C++ dans `HWPlayerController`. C'est le point d'intégration Quest↔Dialogue. Correctement architecturé.

### Dialogue → Inventory (marchand)

```
HWNPCComponent
  │  bIsMerchant: bool
  │  ShopInventoryTag: FGameplayTag  ──► référence au stock marchand
  │  (MANQUE: pas de HWInventoryComponent sur le NPC ni de résolvage ShopInventoryTag→Inventory)
```

**Mode** : **MANQUANT** — voir [[Cross System Circular Deps]].

---

## Voir aussi

- [[Cross System Overview]] — classe `Quest rewards → Inventory` et `Quest XP → Progression` en CRITIQUE, `Mastery → Progression notify` en FORT et `StatBonus reward → GAS` en FORT dans le tableau global.
- [[Cross System GAS Combat]] — confirme l'absence d'appel natif depuis `HWCombatAttributeSet::PostGameplayEffectExecute()` vers `HWProgressionComponent::IncrementProgress(KillCount, ...)` ou `HWQuestComponent::UpdateQuestProgress(KillCount, ...)` (dépendance Blueprint non garantie).
- [[Cross System Character Inventory]] — documente `AHWPlayerController::BagInventory` (cible des `FHWQuestReward::ItemRewards`) et le couplage FORT Inventory→UMG Widget qui impacte la chaîne de récompenses.
- [[Cross System Framework World]] — détaille `AHWPlayerController::HandleDialogueAction(ActionTag, ActionParameter)` comme point d'entrée du mediator pattern Dialogue→Quest (correctement architecturé).
- [[Cross System Circular Deps]] — expose les manques CRITIQUES `FHWQuestReward::ItemRewards/ExperienceReward` non câblés dans `ApplyQuestRewards()` et FORT `HWWeaponMasteryComponent::AddMasteryExperience()` sans notification Progression.
- [[Technical Debt Active]] — section 1.1 (`HWGASMobCharacter.cpp:232` TODO loot drop) et résumé exécutif recensant 9 occurrences `// TODO` dont plusieurs touchent la chaîne Progression/Quest.
