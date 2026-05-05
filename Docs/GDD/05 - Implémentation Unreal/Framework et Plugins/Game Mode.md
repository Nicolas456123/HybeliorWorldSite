---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# GameMode & GameState

Classes centrales orchestrant la logique de session côté serveur.

## AHWGameMode
- Hérite `AOWSGameMode`
- 6 GameplayEffects élémentaires exposés en `TSubclassOf<UGameplayEffect>` : Cold, Burning, Wet, Electrified, Frozen, Charged
- Timer `HWSaveAllPlayerLocations()` : sauvegarde positions par lots

## AHWGameState
- Propriétés répliquées : `ZoneName`, `ActivePlayerCount`, `bIsZoneOpen`
- `ActiveWorldEvents[]` : événements temporaires avec `TimeRemaining`
- Delegates : `OnWorldEventStarted`, `OnWorldEventEnded`

## Liaison BP ↔ C++

| Classe C++ | Blueprint | Classes par défaut |
|-----------|-----------|-------------------|
| `AHWGameMode` | `BP_HybeliorGameMode` | Pawn=`BP_PlayerCharacter_CE`, Controller=`BP_PlayerController`, HUD=`BP_HUD`, GameState=`AHWGameState` (set in C++ ctor) |

Chemin BP : `/Game/Game/BP_HybeliorGameMode.BP_HybeliorGameMode_C` (cf. `DefaultEngine.ini:11`).

## Assets associés
- [[Game Mode Blueprints]] — BP_HybeliorGameMode, BP_LoginGameMode et catalogue des controllers/world BPs

## Voir aussi
- [[Player Controllers]] — appelé via `Cast<AHWPlayerController>` dans `HWSaveAllPlayerLocations()`
- [[Game Mode Blueprints]] — BP_HybeliorGameMode (classe dérivée)
- [[Technical Debt Active]] — AOWSGameMode: code mort commenté, NextSaveGroupIndex hérité
- [[../01_AbilitySystem_Combat/AbilitySystemComponent]] — hub GAS : 6 `TSubclassOf<UGameplayEffect>` exposés (Cold/Burning/Wet/Electrified/Frozen/Charged) consommés par `ElementalReactions`
- [[../08_Backend_OWS/OWSArchitecture]] — hérite `AOWSGameMode`, appelle `ProcessOWS2POSTRequest` pour UpdateAllPlayerPositions
