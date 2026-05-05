---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Cross-System Integration — Overview

**Version :** 1.0
**Date :** 2026-04-04
**Scope :** UE5.4 Client — `Source/HybeliorWorld/Public/`
**Méthodologie :** Analyse statique des headers C++

Vue d'ensemble des intégrations cross-système entre les modules principaux d'HybeliorWorld, avec le tableau global des risques de couplage.

---

## Vue d'ensemble macro

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         HYBELIORWORLD — GRAPH GLOBAL                    │
│                                                                         │
│  ┌──────────┐   GE/Tags    ┌──────────┐   Delegates   ┌─────────────┐  │
│  │   GAS    │◄────────────►│ Combat   │◄──────────────►│ Progression │  │
│  │ (ASC/AS) │              │(Combo/   │                │ (Unlock/    │  │
│  └──────────┘              │Mastery/  │                │  Quest)     │  │
│       ▲                    │Elemental)│                └─────────────┘  │
│       │ IAbilitySystem     └──────────┘                      ▲          │
│       │ Interface              ▲  Direct call                │ Delegates │
│  ┌──────────┐                  │                       ┌─────────────┐  │
│  │Character │──────────────────┘                       │    Quest    │  │
│  │(GASPlayer│  Owns Combo,Mastery,                     │ Component   │  │
│  │ Char)    │  Dialogue,Skill,Quest,                   └─────────────┘  │
│  └──────────┘  Progression,Inventory                         ▲          │
│       ▲        Components                                     │Tags      │
│       │                                    ┌─────────────┐   │          │
│       │ OWS persistence                    │   Entity    │───┘          │
│  ┌──────────┐         ┌──────────┐         │  (Dialogue/ │              │
│  │ GameFW   │         │Inventory │         │   Quests)   │              │
│  │ (PC/GM/  │◄────────│(GE stats,│         └─────────────┘              │
│  │  GS)     │  Server │ OWS per- │                                      │
│  └──────────┘  RPC    │ sistence)│                                      │
│       ▲                └──────────┘                                     │
│       │ World context                                                    │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │              Environment / Terrain / Water                        │   │
│  │  (TerrainManager ──► EnvironmentManager ──► WeatherInteraction)  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Systèmes couverts

Le document complet est découpé en pages thématiques :

| Page | Systèmes analysés |
|---|---|
| [[Cross System GAS Combat]] | GAS (AbilitySystem), Combat (Combo, Mastery, Elemental Reactions) |
| [[Cross System Character Inventory]] | Character (hiérarchie), Inventory (GE stats, UI, OWS) |
| [[Cross System Progression Quest]] | Progression (rewards, unlocks), Quest, Entity/Dialogue |
| [[Cross System Framework World]] | GameFramework (GameMode/PlayerController/GameState), Environment, Terrain |
| [[Cross System Circular Deps]] | Dépendances circulaires + manques d'intégration |

---

## Tableau global de risques de couplage

```
┌─────────────────────────────────────┬────────────┬─────────────────────────────────────────────┐
│ Lien                                │ Risque     │ Mécanisme                                   │
├─────────────────────────────────────┼────────────┼─────────────────────────────────────────────┤
│ CombatAttributeSet → Character      │ FORT       │ Raw pointer WhoAttackedUsLast               │
│ Inventory → UI (Widgets)            │ FORT       │ Direct ptr vers UMG widgets dans ActorComp  │
│ PlayerController (God Object)       │ FORT       │ Hub centralisé, trop de responsabilités     │
│ Quest rewards → Inventory           │ CRITIQUE   │ Non connecté nativement                     │
│ Quest XP → Progression              │ CRITIQUE   │ Non connecté nativement                     │
│ Mastery → Progression notify        │ FORT       │ Non connecté nativement                     │
│ StatBonus reward → GAS              │ FORT       │ Non implémenté                              │
│ Entity Merchant → Inventory         │ FORT       │ Non implémenté                              │
│ Kill events → Progression/Quest     │ MOYEN      │ Convention BP, pas garanti en C++           │
│ GAS → Character (circulaire)        │ MOYEN      │ Forward declare, géré mais fragile          │
│ Progression ↔ Quest (circulaire)    │ MOYEN      │ Forward declare, surveiller                 │
│ Elemental reactions (exéc. circu.)  │ MOYEN      │ bSuppressIncomingCondition, logique app     │
│ WeatherInteraction → Environment    │ MOYEN      │ FindActor au BeginPlay, ordre non garanti   │
│ Inventory → OWS                     │ MOYEN      │ Passage via PlayerController/BP             │
│ GameMode → CombatAttributeSet GEs   │ MOYEN      │ Injection StartPlay, si raté = réactions off│
│ Terrain subsystems → AActor base    │ MOYEN      │ Stockés comme AActor*, cast requis          │
│ Character → Water                   │ FAIBLE     │ API intégrée dans module HybeliorWorld       │
│ Environment → Water                 │ FAIBLE     │ API intégrée dans module HybeliorWorld       │
│ Combat → GAS (ElementalReaction)    │ FAIBLE     │ Paramètre ASC passé, stateless, propre      │
│ GAS → Progression (ApplyRewards)    │ FAIBLE     │ GetOwnerASC(), bien isolé                   │
│ Dialogue → Quest (HandleAction)     │ FAIBLE     │ Mediator via PlayerController, propre       │
│ Terrain → PCG                       │ FAIBLE     │ Static library, find-by-class               │
│ Quest delegates                     │ FAIBLE     │ Dynamic multicast, découplé                 │
│ Progression delegates               │ FAIBLE     │ Dynamic multicast, découplé                 │
│ Combo → Mastery                     │ FAIBLE     │ Co-localisé sur même Actor, TObjectPtr      │
└─────────────────────────────────────┴────────────┴─────────────────────────────────────────────┘
```

---

## Classification des risques

- **CRITIQUE** : fonctionnalité gameplay affectée, pas de chemin natif
- **FORT** : dangling pointer potentiel, anti-pattern structurel, God Object
- **MOYEN** : couplage implicite, ordre de BeginPlay, fragile en cas de modif
- **FAIBLE** : pattern propre, découplage correct, risque contenu

---

## Voir aussi

- [[Cross System GAS Combat]] — détaille le raw pointer `AHWGASCharacter* WhoAttackedUsLast` de `HWCombatAttributeSet` (risque FORT du tableau) et l'injection des `TSubclassOf<UGameplayEffect>` via `AHWGameMode::StartPlay()`.
- [[Cross System Character Inventory]] — documente le couplage FORT Inventory→UI (`UHWCommonInventoryListWidget* InventoryWidget` dans `UHWInventoryComponent`) et la traversée `BagInventory`/`EquipmentInventory` via `AHWPlayerController`.
- [[Cross System Progression Quest]] — analyse les manques CRITIQUES `FHWQuestReward::ExperienceReward`/`ItemRewards` non câblés dans `HWQuestComponent::ApplyQuestRewards()` et le mediator `AHWPlayerController::HandleDialogueAction`.
- [[Cross System Framework World]] — décrit le God Object `AHWPlayerController` (hub persistence + UI + dialogue + travel) et la lazy-spawn `AHWTerrainManager::GetEnvironmentSubsystem()` stockée en `AActor*`.
- [[Cross System Circular Deps]] — confirme la circulaire GAS↔Character gérée par forward declare (commentaire `//Forward declare to stop circular reference` dans `HWAttributeSet.h`) et la rupture par `bSuppressIncomingCondition` dans `HWElementalReactionSystem`.
- [[Performance Analysis]] — quantifie l'impact des loose tags (section 1.2 `HasMatchingGameplayTag` x3 dans `AHWGASPlayerCharacter::Tick`) et des réactions en chaîne dans `HWCombatAttributeSet::PostGameplayEffectExecute`.
- [[Network Replication Audit]] — chiffre les anomalies du tableau (`WeaponMasteries` en `COND_None`, `Server_OpenSupplyPod` Unreliable, `CharacterAppearance` en `COND_OwnerOnly`).
- [[Security Audit]] — couvre les vulnérabilités UE-02/UE-03 (RPC `Server_OpenSupplyPod`/`OpenContainer` avec `_Validate` triviale) et OWS-07 (`UpdateCharacterStats` sans vérification de propriété).
- [[Technical Debt Active]] — recense les TODOs liés aux manques d'intégration (loot drop `HWGASMobCharacter.cpp:232`, Shatter reaction `HWElementalReactionSystem.cpp:155`).
