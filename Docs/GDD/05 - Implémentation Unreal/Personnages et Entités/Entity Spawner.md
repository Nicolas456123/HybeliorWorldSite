---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# EntitySpawner

Classe `AHWEntitySpawner` — actor place dans le niveau pour detecter les joueurs a proximite et activer des entites depuis le [[Entity Pool Manager]].

## Proprietes

| Propriete | Valeur/Type | Description |
|-----------|-------------|-------------|
| `DetectionSphere` | USphereComponent (r=500) | Zone detection joueurs |
| `EntityToSpawnClass` | TSubclassOf | Classe d'entite a spawner |
| `EntityNumber` | int32 | Entites simultanees max |
| `EntityLevelSpawner` | int32 | Niveau attribue aux entites spawnees |
| `RespawnDelay` | float (5s) | Delai de respawn apres mort |
| `PlayerCheckInterval` | float (1s) | Frequence de verif joueur |
| `ActiveEntitiesCount` | int32 | **Jamais decremente (bug)** |

## Spawn offset

Aleatoire : +/- 200 unites sur XY autour du spawner.

## Logique principale

### CheckForPlayerPresence() — toutes 1s

```
Si plus de joueur dans la DetectionSphere :
    -> DeactivateEntity() sur toutes les entites spawnees
```

### RespawnEntity()

```cpp
if (ArePlayersInZone() && ActiveEntitiesCount < EntityNumber) {
    // WARNING: ActiveEntitiesCount jamais decremente
    ActivateEntity();
    ActiveEntitiesCount++;
}
```

> **Bug critique :** `ActiveEntitiesCount` jamais decremente a la mort → respawn bloque apres la premiere entite tuee.

## Warning de compilation

**BP_EntitySpawner** presente un avertissement pre-existant (type mismatch). Non bloquant mais a corriger.

## Blueprint

| Classe C++ | Blueprint | Chemin |
|-----------|-----------|--------|
| AHWEntitySpawner | BP_EntitySpawner | /Game/Entity/ |

## Voir aussi

- [[Entity Pool Manager]] — propriete `AHWEntityPoolManager* EntityPoolManager` (`HWEntitySpawner.h:77`) resolue dans `BeginPlay()` via `UGameplayStatics::GetAllActorsOfClass(this, AHWEntityPoolManager::StaticClass(), Found)` (`HWEntitySpawner.cpp:45`) ; `ActivateEntity_Implementation` appelle `EntityPoolManager->GetPooledEntity()` puis `EntityPoolManager->ActivateEntity(SpawnedEntity, SpawnLocation)` (`HWEntitySpawner.cpp:127,139`).
- [[HW GAS Entity Character]] — `TSubclassOf<AHWGASEntityCharacter> EntityToSpawnClass` (`HWEntitySpawner.h:33`) et liste runtime `TArray<AHWGASEntityCharacter*> SpawnedEntities` (`HWEntitySpawner.h:37`) ; chaque entite recoit une ref inverse `OwningSpawner` assignee a la sortie du pool et consultee dans `AHWGASEntityCharacter::EntityDead_Implementation` pour appeler `OwningSpawner->DeactivateSpecificEntity(this)`.
- [[HW GAS Player Character]] — detection via `USphereComponent* DetectionSphere` (`HWEntitySpawner.h:29`) ; les callbacks `OnPlayerEnterSphere` / `OnPlayerExitSphere` (`HWEntitySpawner.h:92,98`) et `ArePlayersInZone()` filtrent les overlaps vers les pawns joueurs pour declencher `ActivateEntity()` serveur.
- [[AI Controller]] — apres `EntityPoolManager->ActivateEntity()`, l'entite sortie du pool est possedee par le `BP_HWAIController` (parent natif `AHWAIController`) via l'AIControllerClass de `AHWGASEntityCharacter` ; le spawner lui-meme ne manipule pas le controller directement mais declenche la chaine.
