---
tags: [implementation, ue5, blueprint, gamemode]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Game Mode Blueprints

> Inspection MCP des Blueprints `BP_HybeliorGameMode` et `BP_LoginGameMode`.
> Source : `unreal_python` AssetRegistry + analyse binaire .uasset — 2026-04-04.
> Issu de la scission V3.3 de `FrameworkBlueprints.md`.

## Classes C++ associées
- [[Game Mode]] — `HWGameMode` parent de `BP_HybeliorGameMode` et `BP_LoginGameMode`

---

## 1. BP_HybeliorGameMode

**Chemin asset :** `/Game/Game/BP_HybeliorGameMode`
**Classe générée :** `BP_HybeliorGameMode_C`
**Classe parente native :** `HWGameMode` (`/Script/HybeliorWorld.HWGameMode`)
**Description :** *"GameMode Blueprint that defines default pawn to use."*
**Réplication :** 0 propriétés répliquées

### 1.1 Configuration des classes par défaut

| Propriété | Classe assignée |
|---|---|
| `DefaultPawnClass` | `BP_PlayerCharacter_CE` (`/Game/Character/BP_PlayerCharacter_CE`) |
| `PlayerControllerClass` | `BP_PlayerController` (`/Game/Game/BP_PlayerController`) |
| `HUDClass` | `BP_HUD` (`/Game/UI/HUD/BP_HUD`) |
| `PlayerStateClass` | `OWSPlayerState` |

> La `GameStateClass` et la `SpectatorClass` ne sont pas redéfinies dans le BP — elles héritent de `HWGameMode`.

### 1.2 Variables BP

| Nom | Description |
|---|---|
| `DebugCharacterName` | Nom du personnage utilisé en mode debug/test |
| `DebugStartLocation` | Position de départ en mode debug |

### 1.3 Fonctions et logique

| Nom | Nature |
|---|---|
| `ApplyBurningGameplayEffect` | Applique l'effet GAS Burning sur une cible |
| `ApplyColdGameplayEffect` | Applique l'effet GAS Cold (froid) |
| `ApplyFrozenGameplayEffect` | Applique l'effet GAS Frozen (gelé) |
| `ApplyWetGameplayEffect` | Applique l'effet GAS Wet (mouillé) |

Ces quatre fonctions constituent l'interface du GameMode pour déclencher les **états élémentaires** depuis la logique monde. Elles font le pont entre les événements de gameplay et le système GAS.

### 1.4 Notes

- Le GameMode ne contient **pas** de graph d'événements complexe — la logique de session, connexion et respawn est déléguée à `HWGameMode` en C++.
- Les effets élémentaires (`Apply*GameplayEffect`) sont probablement utilisés par des triggers de niveau ou des zones environnementales.
- `OWSPlayerState` est la classe fournie par le plugin OWS pour la gestion des données de session persistante.

---

## 2. BP_LoginGameMode

**Chemin asset :** `/Game/Game/BP_LoginGameMode`
**Classe parente native :** `HWGameMode`
**EventGraph :** Vide (BeginPlay et Tick désactivés) — toute la logique login est déléguée à `BP_LoginPlayerController` / `AHWLoginPlayerController` en C++.

---

## Effets élémentaires (GameMode)

`BP_HybeliorGameMode` expose 4 fonctions d'application d'effets GAS qui peuvent être appelées depuis n'importe quel BP :

```
ApplyBurningGameplayEffect  → État : En feu
ApplyColdGameplayEffect     → État : Froid
ApplyFrozenGameplayEffect   → État : Gelé
ApplyWetGameplayEffect      → État : Mouillé
```

Ces états s'intègrent avec le système de combat hybride.

## Liens

- [[Player Controller Blueprints]]
- [[World Blueprints]]
- [[Tools Blueprints]]
- [[Game Mode]]
