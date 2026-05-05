---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# NPCSystem

Systeme NPC base sur `UHWNPCComponent` — ajoute a toute [[HW GAS Entity Character]] qui offre du dialogue, des quetes ou du commerce.

> Les dossiers NPC/ et AI/ ont ete fusionnes dans Entity/. Toute entite non-joueur (hostile, amicale, marchande, avec ou sans dialogue) est desormais une "entite". Le NPC est un composant, pas une classe separee.

## Architecture

```
Entity Actor (AHWGASEntityCharacter)
  +- UHWNPCComponent
     +- NPCName, NPCTag, DefaultDialogue
     +- ConditionalDialogues (TMap<Tag, DialogueData>)
     +- AvailableQuests[], bIsMerchant, ShopInventoryTag
```

## Proprietes du composant

| Propriete | Type | Role |
|-----------|------|------|
| `NPCName` | FText | Nom affiche |
| `NPCTag` | FGameplayTag | Identifiant unique |
| `DefaultDialogue` | UHWDialogueData* | Dialogue par defaut |
| `ConditionalDialogues` | TMap<FGameplayTag, UHWDialogueData*> | Dialogues conditionnes |
| `AvailableQuests` | TArray<UHWQuestData*> | Quetes proposees |
| `bIsMerchant` | bool | Si true, ouvre un shop |
| `ShopInventoryTag` | FGameplayTag | Reference shop |

## Methodes cles

### GetDialogueForPlayer(Player)

```
1. Cherche ProgressionComponent sur joueur
2. Parcourt ConditionalDialogues dans l'ordre TMap
3. Premier dialogue dont condition IsUnlocked() -> retourne
4. Sinon -> DefaultDialogue
```

> **Incoherence :** Ordre TMap non garanti → comportement non deterministe.

### GetNPCIndicator(Player)

Retourne un indicateur visuel au-dessus du NPC :

| Indicateur | Condition |
|------------|-----------|
| `!` (QuestAvailable) | Quete non acceptee existe |
| `?` (QuestInProgress) | Quete acceptee en cours |
| `?*` (QuestComplete) | Quete completable |
| *(vide)* | Rien |

## Flow interaction

1. Joueur s'approche d'une entite avec `UHWNPCComponent`
2. Widget de prompt affiche (selon indicateur)
3. Interaction (touche E ou similaire)
4. `GetDialogueForPlayer()` → `UHWDialogueData`
5. Transmis au [[Dialogue Component]] cote joueur
6. `StartDialogue()` lance le flux

## Types d'entites

Limites actuellement :
- Dialogue standard
- Marchand (`bIsMerchant = true`)

> **Incoherence :** Pas de reputation entite, pas de types etendus (guide, quest-giver specialise, etc.).

## Voir aussi

- [[Dialogue Component]] — signature `UHWDialogueComponent::StartDialogue(UHWDialogueData* DialogueData, UHWNPCComponent* NPCComponent)` (`HWDialogueComponent.h:27`) qui stocke le NPC dans `CurrentNPC` (`HWDialogueComponent.cpp:29`) ; `ProcessDialogueAction` broadcaste ensuite `CurrentNPC->OnDialogueAction.Broadcast(OwnerCharacter, ActionTag, ActionParameter)` (`HWDialogueComponent.cpp:178`).
- [[HW Progression Component]] — `GetDialogueForPlayer()` (`HWNPCComponent.cpp:21`), `HasQuestForPlayer()` (`HWNPCComponent.cpp:64`) et `GetNPCIndicator()` (`HWNPCComponent.cpp:90`) appellent tous `ProgressionComp->IsUnlocked(Tag)` pour filtrer `ConditionalDialogues` et `AvailableQuests[]` selon les etats de quetes du joueur.
- [[Gameplay Tags]] — les UPROPERTY `FGameplayTag NPCTag` (`HWNPCComponent.h:29`), `TArray<FGameplayTag> AvailableQuests` (`HWNPCComponent.h:41`), `FGameplayTag ShopInventoryTag` (`HWNPCComponent.h:49`) et la valeur de retour `FGameplayTag` de `GetNPCIndicator()` (`HWNPCComponent.h:61`) consomment le registre de tags centralise.
