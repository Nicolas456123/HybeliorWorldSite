---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Cross-System — Dépendances Circulaires & Manques d'Intégration

Dépendances circulaires identifiées et manques d'intégration critiques entre systèmes.

---

## Dépendances circulaires

### Circulaire confirmée : GAS ↔ Character

```
HWCombatAttributeSet  ──► AHWGASCharacter* WhoAttackedUsLast   (forward declared, raw ptr)
HWGameplayAbility     ──► GetHWAvatarActor() → AHWGASCharacter* (forward declared, cast)
HWAttributeSet        ──► AHWGASCharacter  (forward declared, commentaire "stop circular")

AHWGASCharacter       ──► UHWAbilitySystemComponent*
                      ──► UHWCombatAttributeSet*
```

**Verdict** : Circulaire gérée par forward declare. Le commentaire `//Forward declare to stop circular reference` dans `HWAttributeSet.h` confirme que l'équipe en est consciente. Risque contenu tant que les pointeurs sont `TObjectPtr` ou `TWeakObjectPtr`, mais `WhoAttackedUsLast` est un raw pointer.

### Circulaire potentielle : Quest ↔ Progression

```
HWQuestComponent ──► UHWProgressionComponent (forward declare dans .h)
HWProgressionComponent
  │  CheckAllUnlocks() vérifie EHWConditionType::QuestCompleted
  │    └──► doit appeler HWQuestComponent::IsQuestCompleted()
```

**Verdict** : Circulaire bidirectionnelle si `HWProgressionComponent` inclut `HWQuestComponent`. Actuellement gérée par forward declare dans Quest. À surveiller lors de l'implémentation de `AreConditionsMet()` côté Progression.

### Circulaire : Inventory ↔ UI

```
HWInventoryComponent ──► UHWCommonInventoryListWidget* InventoryWidget
                      ──► UHWEquipmentWidget* EquipmentWidget

UHWInventoryListWidget [UI]  ──► probablement HWInventoryComponent*
```

**Verdict** : Circulaire forte. Un composant de gameplay (`UActorComponent`) tient des références vers des widgets UMG. Les widgets tiennent probablement une référence arrière vers le composant. **C'est l'anti-pattern MVP le plus problématique du projet.**

### Circulaire : Combat (Elemental) ↔ GAS (AttributeSet)

```
HWCombatAttributeSet::PostGameplayEffectExecute()
  └──► UHWElementalReactionSystem::CheckReaction()  ──► prend FGameplayTagContainer
  └──► UHWElementalReactionSystem::ApplyReaction()  ──► prend UAbilitySystemComponent*
       └──► ASC->AddLooseGameplayTag() / RemoveActiveGameplayEffect()
       └──► ASC->ApplyGameplayEffectToSelf()  ──► déclenche nouveau PostGameplayEffectExecute()
```

**Verdict** : Circulaire d'exécution potentielle. Une réaction élémentaire appliquée via GE peut déclencher une nouvelle exécution de `PostGameplayEffectExecute`, qui pourrait ré-évaluer les réactions. `HWElementalReactionSystem` définit `bSuppressIncomingCondition` pour rompre ce cycle, mais la garantie repose sur la logique applicative, pas sur un mécanisme UE5 natif.

---

## Manques d'intégration identifiés

### CRITIQUE — Récompenses de quête non connectées à l'inventaire

```
FHWQuestReward::ItemRewards: TMap<FGameplayTag, int32>
  │  ──► AUCUN appel à HWInventoryComponent::AddItem() visible dans HWQuestComponent.h
```

**Impact** : Les items définis comme récompenses de quête dans `UHWQuestData` ne seront jamais ajoutés à l'inventaire du joueur à moins d'une implémentation Blueprint dans `ApplyQuestRewards()`.

**Solution proposée** :
```cpp
// Dans HWQuestComponent.cpp - ApplyQuestRewards()
if (auto* PC = Cast<AHWPlayerController>(GetOwner()->GetController()))
{
    if (PC->BagInventory)
    {
        for (auto& [ItemTag, Qty] : QuestData->Rewards.ItemRewards)
        {
            // résoudre ItemTag → ItemTypeID via DataTable
            // PC->BagInventory->AddItem(...)
        }
    }
}
```

### CRITIQUE — Récompenses de quête XP non connectées à Progression

```
FHWQuestReward::ExperienceReward: int32
  │  ──► AUCUN appel à HWProgressionComponent::IncrementProgress() visible
```

**Impact** : L'XP des quêtes n'influence pas le système de progression cachée.

### FORT — WeaponMastery ne notifie pas Progression

```
HWWeaponMasteryComponent::AddMasteryExperience()
  │  Met à jour MasteryData[WeaponType].MasteryLevel
  │  ──► N'appelle PAS HWProgressionComponent::SetProgress(EHWConditionType::MasteryLevel, ...)
```

**Impact** : Les unlocks conditionnels sur `EHWConditionType::MasteryLevel` ne se déclenchent jamais automatiquement via le système de progression.

### FORT — StatBonus reward sans implémentation GAS

```
FHWUnlockableReward::RewardType == StatBonus
  │  BonusValue: float
  │  ──► HWProgressionComponent::ApplyRewards() n'a pas de cas StatBonus visible
  │      (ni création de GE permanent, ni modification directe d'attribut)
```

### FORT — Marchand NPC sans inventaire

```
HWNPCComponent::ShopInventoryTag: FGameplayTag
  │  ──► Aucun HWInventoryComponent sur les NPCs
  │  ──► Aucun résolvage tag → loot table → interface d'achat/vente
```

**Impact** : Les NPCs marqués `bIsMerchant = true` n'ont pas de système commercial fonctionnel en C++ natif.

### MOYEN — Combat: kills ne notifient pas automatiquement Progression/Quest

```
HWCombatAttributeSet::PostGameplayEffectExecute()
  │  Gère la mort (Health <= 0)
  │  ──► N'appelle PAS HWProgressionComponent::IncrementProgress(KillCount, ...)
  │  ──► N'appelle PAS HWQuestComponent::UpdateQuestProgress(KillCount, ...)
```

**Impact** : Les objectifs "tuer X de Y" dans les quêtes et les conditions de unlock "KillCount" reposent sur des appels Blueprint depuis `OnDeath`.

### MOYEN — Réputation non implémentée

```
FHWQuestReward::ReputationRewards: TMap<FGameplayTag, int32>
  │  ──► Aucun système de réputation/faction visible dans le codebase
```

### FAIBLE — Dialogue conditions non résolues côté C++

```
HWDialogueComponent::IsConditionMet(FGameplayTag ConditionTag)
  │  ──► Aucune implémentation visible dans le header
  │  ──► Doit vérifier quest status, progression, etc.
  │  ──► Risque : implémentation triviale (return true) en attendant
```

---

## Annexe — Flux de données pour les cas critiques

### Flux : Mort d'un ennemi (état actuel vs souhaité)

```
ÉTAT ACTUEL
───────────
HWCombatAttributeSet::PostGameplayEffectExecute()
  └─► Health <= 0 → appelle AHWGASCharacter::OnDeath() (BlueprintNativeEvent)
        └─► [Blueprint] notifie manuellement Quest, Progression, Drops
            (fragile, non garanti, ordre variable)

ÉTAT SOUHAITÉ
─────────────
HWCombatAttributeSet::PostGameplayEffectExecute()
  └─► Health <= 0 → appelle AHWGASCharacter::OnDeath()
        ├─► QuestComponent->UpdateQuestProgress(KillCount, VictimTag, 1.f)
        ├─► ProgressionComponent->IncrementProgress(KillCount, VictimTag, 1.f)
        ├─► WeaponMasteryComponent->AddMasteryExperience(CurrentWeaponType, XP)
        │     └─► ProgressionComponent->SetProgress(MasteryLevel, WeaponTag, NewLevel)
        └─► Spawn loot (via HWLootTable → HWInventoryComponent)
```

### Flux : Complétion de quête (état actuel vs souhaité)

```
ÉTAT ACTUEL
───────────
HWQuestComponent::CheckQuestCompletion()
  └─► Tous objectifs remplis → OnQuestCompleted.Broadcast(QuestID, Rewards)
        └─► [Blueprint listener] applique manuellement les récompenses

ÉTAT SOUHAITÉ
─────────────
HWQuestComponent::ApplyQuestRewards()
  ├─► ExperienceReward → ProgressionComponent->IncrementProgress(TimePlayed/Misc, ...)
  ├─► GoldReward → Système monétaire (à créer ou via Inventory)
  ├─► ItemRewards → PlayerController->BagInventory->AddItem(per item)
  ├─► UnlockReward → ProgressionComponent -> force unlock via tag
  └─► ReputationRewards → Système réputation (à créer)
```

---

## Voir aussi

- [[Cross System Overview]] — classe `Quest rewards → Inventory` et `Quest XP → Progression` en CRITIQUE (non connecté nativement) dans le tableau global des couplages.
- [[Cross System GAS Combat]] — détaille le raw pointer `AHWGASCharacter* WhoAttackedUsLast` dans `HWCombatAttributeSet` et le cycle `PostGameplayEffectExecute → ElementalReactionSystem → ASC->ApplyGameplayEffectToSelf` rompu par `bSuppressIncomingCondition`.
- [[Cross System Character Inventory]] — documente les références directes `HWInventoryComponent::InventoryWidget: UHWCommonInventoryListWidget*` et `EquipmentWidget: UHWEquipmentWidget*` (source de la circulaire Inventory↔UI).
- [[Cross System Progression Quest]] — confirme `FHWQuestReward::ItemRewards` sans appel à `HWInventoryComponent::AddItem()` et `HWNPCComponent::ShopInventoryTag` sans inventaire résolu.
- [[Technical Debt Active]] — section 1.1 (`HWGASMobCharacter.cpp:232` TODO loot drop) et section 8 (tableau « En cours de migration » listant le loot entity comme « À implémenter — inventory system requis »).
- [[Performance Analysis]] — section P1.2 chiffre le coût `HasMatchingGameplayTag` dans le Tick, pertinent pour évaluer l'impact des loose tags appliqués par `HWElementalReactionSystem::ApplyReaction()`.
