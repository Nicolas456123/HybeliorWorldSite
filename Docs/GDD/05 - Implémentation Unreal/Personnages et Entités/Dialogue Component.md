---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# DialogueComponent

Composant `UHWDialogueComponent` — etat de dialogue cote joueur + DataAsset `HWDialogueData` pour la structure de dialogue.

## Architecture

```
PlayerCharacter
  +- UHWDialogueComponent (etat dialogue cote joueur)
  +- UHWProgressionComponent (conditions)
  +- UHWQuestComponent (quetes)
```

Cote entite : voir [[NPC System]] (`UHWNPCComponent`).

## HWDialogueData (DataAsset)

### FHWDialogueNode

| Champ | Role |
|-------|------|
| `SpeakerText` | Texte du noeud |
| `SpeakerName` | Nom du locuteur |
| `Choices[]` | `FHWDialogueChoice` — options disponibles |
| `AutoNextNodeIndex` | `-1` = fin, sinon noeud suivant automatique |
| `EmoteTag` | Tag d'emote a jouer |
| `RequiredConditionTag` | Condition pour afficher ce noeud |
| `OnReachEventTag` | Event declenche a l'arrivee sur ce noeud |

### FHWDialogueChoice

| Champ | Role |
|-------|------|
| `ChoiceText` | Texte du choix |
| `NextNodeIndex` | `-1` = fin, sinon noeud suivant |
| `RequiredConditionTag` | Condition pour voir ce choix |
| `ActionTag` | Tag d'action (ex: `Action.AcceptQuest`) |
| `ActionParameter` | Parametre (ex: QuestID) |

## HWDialogueComponent — Flow

```
1. StartDialogue()
   -> bInDialogue = true
   -> DisableMovement
   -> GoToNode(0)

2. GoToNode(Index)
   -> Valide RequiredConditionTag
   -> Broadcast OnDialogueNodeChanged

3. SelectChoice(Index)
   -> ProcessDialogueAction()
   -> GoToNode(NextNodeIndex)

4. EndDialogue()
   -> EnableMovement
   -> Broadcast OnDialogueEnded
```

## Actions de dialogue

| Tag d'action | Comportement |
|--------------|--------------|
| `Action.AcceptQuest` | `UHWQuestComponent::AcceptQuest(QuestID)` |
| `Action.GiveItem` | A implementer |
| `Action.OpenShop` | A implementer |

## Integration Quetes

- `Entity.AvailableQuests[]` → indicateur visuel (`!` ou `?`)
- Convention tags :
  - `Quest.<Name>.InProgress`
  - `Quest.<Name>.Completable`
  - `Quest.<Name>.Completed`
- `AcceptDialogueID` / `CompleteDialogueID` sur `UHWQuestData`

Voir [[Quest System]] (si existe) et [[NPC System]].

## Incoherences

1. **Aucun dialogue cree** dans le projet (systeme fonctionnel mais vide)
2. **Ordre TMap non garanti** pour ConditionalDialogues cote [[NPC System]]
3. **Pas de dialogues ramifies complexes** (convergence impossible)
4. **Replication incomplete** (dialogues cote client dependent de progression)
5. **Pas de persistence etat dialogue** (perte si crash)
6. **Condition noeud non remplie = fin abrupte** (pas de fallback)
7. **Types entite limites** (dialogue standard ou marchand seulement)
8. **Pas de reputation entite**
9. **EmoteTag defini mais jamais execute**
10. **OnReachEventTag non documente**

## Voir aussi

- [[NPC System]] — membre prive `TObjectPtr<UHWNPCComponent> CurrentNPC` (`HWDialogueComponent.h:77`) alimente par `StartDialogue(UHWDialogueData* DialogueData, UHWNPCComponent* NPCComponent)` (`HWDialogueComponent.h:27`) ; `ProcessDialogueAction` notifie le NPC via `CurrentNPC->OnDialogueAction.Broadcast(OwnerCharacter, Choice.ActionTag, Choice.ActionParameter)` (`HWDialogueComponent.cpp:178`).
- [[HW GAS Player Character]] — composant proprietaire `TObjectPtr<UHWDialogueComponent> DialogueComponent` (`HWGASPlayerCharacter.h:148`) instancie via `CreateDefaultSubobject<UHWDialogueComponent>(TEXT("DialogueComponent"))` dans le constructeur (`HWGASPlayerCharacter.cpp:97`).
- [[HW Progression Component]] — `IsConditionMet(const FGameplayTag&)` (`HWDialogueComponent.h:85`) interroge le `UHWProgressionComponent` du joueur pour filtrer `FHWDialogueNode::RequiredConditionTag` et `FHWDialogueChoice::RequiredConditionTag` ; les actions `Action.AcceptQuest` routent vers `UHWQuestComponent::AcceptQuest(QuestID)` via le dispatch de tags.
- [[Dialogue UI]] — les widgets se lient aux trois delegates multicast declares ici : `FOnDialogueNodeChanged OnDialogueNodeChanged`, `FOnDialogueEnded OnDialogueEnded`, `FOnDialogueActionTriggered OnDialogueActionTriggered` (`HWDialogueComponent.h:55-64`).
