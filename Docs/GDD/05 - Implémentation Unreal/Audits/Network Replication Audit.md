---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# D01 — Audit Réseau : Réplication HybeliorWorld

**Date d'audit :** 2026-04-04  
**Portée :** `Source/HybeliorWorld/` — 361 fichiers .h/.cpp  
**Auditeur :** Claude Code (analyse statique automatisée)

---

## Sommaire Exécutif

Le projet présente une architecture réseau globalement saine pour un MMO UE5. Les patterns essentiels (GAS Mixed/Minimal, FastArraySerializer pour l'inventaire, COND_OwnerOnly sur les données sensibles) sont correctement appliqués. Plusieurs **risques de bande passante** ont été identifiés — notamment dans le système de nage — ainsi que des **incohérences de conditions** et quelques **propriétés critiques manquant de réplication** ou de callbacks OnRep.

---

## 1. Propriétés Répliquées — Inventaire Complet par Système

### 1.1 GAS — `UHWCombatAttributeSet`
Fichier : `Private/AbilitySystem/HWCombatAttributeSet.cpp`

| Attribut | Condition | Notification |
|---|---|---|
| `Health` | `COND_None` | `REPNOTIFY_Always` |
| `MaxHealth` | `COND_None` | `REPNOTIFY_Always` |
| `HealthRegenRate` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `Energy` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `MaxEnergy` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `EnergyRegenRate` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `Stamina` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `MaxStamina` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `StaminaRegenRate` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `Mana` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `MaxMana` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `ManaRegenRate` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `Strength` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `Agility` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `Constitution` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `CritRate` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `CritDamage` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `Attack` | `COND_OwnerOnly` | `REPNOTIFY_Always` |
| `Defense` | `COND_OwnerOnly` | `REPNOTIFY_Always` |

> **Note** : `Health` et `MaxHealth` sont en `COND_None` (envoyés à tous), ce qui est correct pour les barres de vie visibles par les autres joueurs. Tous les attributs de stats sont `COND_OwnerOnly`, cohérent avec un MMO.

### 1.2 Personnage — `AHWCharacter`
Fichier : `Private/Character/HWCharacter.cpp`

| Propriété | Condition |
|---|---|
| `OftenChangeCharacterData` | `COND_OwnerOnly` |
| `BaseCharacterSkills` | `COND_OwnerOnly` |
| `CharacterExperience` | `COND_OwnerOnly` |
| `ChangeCharacterData` | `COND_OwnerOnly` |
| `CharacterAppearance` | `COND_OwnerOnly` |
| `CharacterAppearanceCE` | `COND_OwnerOnly` |
| `RarelyChangeCharacterData` | `COND_OwnerOnly` |

> **Anomalie critique** : `CharacterAppearance` et `CharacterAppearanceCE` sont en `COND_OwnerOnly`. Cela signifie que les autres joueurs ne reçoivent **jamais** les données d'apparence d'un personnage. Les costumes et personnalisations visuelles ne sont donc pas visibles en multijoueur. Ce devrait être `COND_None` ou `COND_SkipOwner`.

### 1.3 Personnage Joueur — `AHWGASPlayerCharacter`
Fichier : `Private/Character/HWGASPlayerCharacter.cpp`

| Propriété | Condition |
|---|---|
| `bUpdateMeshEquipment` | `COND_None` (DOREPLIFETIME simple) |

### 1.4 Projectile — `AHWFakeProjectile`
Fichier : `Private/AbilitySystem/HWFakeProjectile.cpp`

| Propriété | Condition |
|---|---|
| `bProjectileStopped` | `COND_None` |

Déclaré avec `ReplicatedUsing = OnRep_ProjectileStopped` — correct pour synchroniser l'explosion/arrêt visuel sur tous les clients.

### 1.5 Maîtrise des Armes — `UHWWeaponMasteryComponent`
Fichier : `Private/Combat/HWWeaponMasteryComponent.cpp`

| Propriété | Condition |
|---|---|
| `WeaponMasteries` | `COND_None` (DOREPLIFETIME simple) |

> **Anomalie** : Le tableau `WeaponMasteries` contient des données sensibles (niveaux, XP, multiplicateurs de dégâts) qui ne concernent que le propriétaire. Utiliser `COND_None` diffuse ces informations à **tous les joueurs proches**, ce qui est une fuite d'information et un gaspillage de bande passante. Recommandé : `COND_OwnerOnly`.

### 1.6 Environnement — `AHWEnvironmentManager`
Fichier : `Private/Environment/HWEnvironmentManager.cpp`

| Propriété | Condition |
|---|---|
| `ReplicatedTimeOfDay` | `COND_None` |
| `ReplicatedMoonPhase` | `COND_None` |
| `ReplicatedDayLength` | `COND_None` |
| `ReplicatedNightLength` | `COND_None` |
| `ReplicatedCloudCoverage` | `COND_None` |
| `ReplicatedWeatherType` | `COND_None` |
| `ReplicatedWindSpeed` | `COND_None` |
| `ReplicatedWindDirection` | `COND_None` |
| `ReplicatedTemperature` | `COND_None` |
| `ReplicatedSeason` | `COND_None` |

Toutes en `COND_None` — correct, les données environnementales sont partagées à tous les clients.

### 1.7 GameState — `AHWGameState`
Fichier : `Private/Game/HWGameState.cpp`

| Propriété | Condition |
|---|---|
| `ZoneName` | `COND_None` |
| `ActivePlayerCount` | `COND_None` |
| `bIsZoneOpen` | `COND_None` |
| `ActiveWorldEvents` | `COND_None` |

Correct, le GameState est toujours en `COND_None`.

### 1.8 PlayerController — `AHWPlayerController`
Fichier : `Private/Game/HWPlayerController.cpp`

| Propriété | Condition (via DOREPLIFETIME_WITH_PARAMS_FAST) |
|---|---|
| `SupplyPodsOpened` (FFastArraySerializer) | `COND_OwnerOnly` |
| `ContainersOpened` (FFastArraySerializer) | `COND_OwnerOnly` |
| `HUDStatLIVE_RepCounter` | `COND_OwnerOnly` |

Correct — données de persistance privées au joueur.

### 1.9 Inventaire — `UHWInventoryComponent`
Fichier : `Private/Inventory/HWInventoryComponent.cpp`

| Propriété | Condition |
|---|---|
| `Inventory` (FFastArraySerializer) | `COND_OwnerOnly` |

Correct.

### 1.10 Progression — `UHWProgressionComponent`
Fichier : `Private/Progression/HWProgressionComponent.cpp`

| Propriété | Condition |
|---|---|
| `Rep_ProgressionData` | `COND_None` (DOREPLIFETIME simple) |
| `UnlockedIDs` | `COND_None` |
| `VisitedLocations` | `COND_None` |

> **Anomalie** : `Rep_ProgressionData`, `UnlockedIDs` et `VisitedLocations` sont envoyés à tous les clients sans restriction. Des données de progression individuelle (quêtes terminées, lieux visités) ne devraient être connues que du propriétaire. Recommandé : `COND_OwnerOnly`.

### 1.11 Quêtes — `UHWQuestComponent`
Fichier : `Private/Progression/HWQuestComponent.cpp`

| Propriété | Condition |
|---|---|
| `Rep_QuestStatuses` | `COND_None` |
| `Rep_QuestProgress` | `COND_None` |

> **Anomalie** : Même problème que la progression — les statuts de quêtes d'un joueur sont visibles par tous. Recommandé : `COND_OwnerOnly`.

### 1.12 Déformation Terrain — `AHWTerrainDeformation`
Fichier : `Private/Terrain/HWTerrainDeformation.cpp`

| Propriété | Condition |
|---|---|
| `ActiveDeformations` | `COND_None` |

Correct — les cratères et déformations sont visuels et doivent être synchronisés pour tous.

### 1.13 NPC — `UHWNPCComponent`
Fichier : `Private/Entity/HWNPCComponent.cpp`

| Propriété | Condition |
|---|---|
| `NPCName` | `COND_None` |

Correct.

### 1.14 Barre de Compétences UI — `UHWSkillBarComponent`
Fichier : `Private/UI/HUD/HWSkillBarComponent.cpp`

| Propriété | Condition |
|---|---|
| `Slots` | `COND_None` |

> **Anomalie** : La barre de compétences est une donnée purement UI/privée. Elle n'a aucune raison d'être envoyée aux autres clients. Recommandé : `COND_OwnerOnly`.

### 1.15 Interactions — `AHWContainer`, `AHWDoor`, `ASupplyPod`

| Acteur | Propriété | Condition |
|---|---|---|
| `AHWContainer` | `InteractableGUID` | `COND_None` |
| `AHWDoor` | `InteractableGUID` | `COND_None` |
| `ASupplyPod` | `InteractableGUID` | `COND_None` |

Correct — les GUIDs d'interactables sont nécessaires côté client pour identifier les objets.

### 1.16 Eau / Water HW — Composants

| Composant | Propriét��s répliquées | Condition |
|---|---|---|
| `UHWBuoyancyComponent` | `HWWater`, `HWWaterVolume`, `EnteredWaterVolume`, `CurrentWaveHeight` | `COND_None` |
| `UHWUnderwaterComponent` | `HWWater`, `UnderwaterMode`, `Underwater`, `VolumetricFog`, `MaskUnderwater`, `WaterProjection`, `BubblesSettings` | `COND_None` |
| `UHWSwimmingComponent` | 22 propriétés (états de nage, axes d'input, timers de noyade, etc.) | `COND_None` |
| `UHWGerstnerWaveSolverComponent` | `GlobalDisplacement`, `BaseOffset`, `Wave_1..4`, `Summarize` | `COND_None` |
| `AHWWaterParent` | `SurfaceScattering`, `Caustics`, `Refraction`, `HorizonCorrection`, `Flipbook`, `Foam`, `Folding`, `Procedural`, `RVT`, `Mask`, `ActorHeight`, `GGX` | `COND_None` |
| `AHWInfiniteOcean` | `Wetness` | `COND_None` |
| `AHWLake` | `GroundCaustics`, `WaterProjection` | `COND_None` |
| `AHWWaterVolume` | `HWWater` | `COND_None` |

> **Alerte** : Le composant `UHWSwimmingComponent` réplique 22 propriétés en `COND_None`, dont des axes d'input bruts (`MoveForwardBackwardAxis`, `LookUpAxis`, `MoveLeftRightAxis`, `SwimUpOrDownAxis`). Ces valeurs d'input ne sont pertinentes que pour le possesseur (et les proxies simulés pour l'animation). Voir section RPCs pour le problème de fréquence associé.

---

## 2. RPCs Server — Inventaire Complet

### 2.1 Tableau récapitulatif

| Classe | RPC | Fiabilité | Validation |
|---|---|---|---|
| `AHWGASPlayerCharacter` | `Server_SetFlySpeed(float)` | Reliable | Non |
| `AHWGASPlayerCharacter` | `Server_ChangeAppearanceNative(FHWCharacterAppearance)` | Reliable | Non |
| `AHWPlayerController` | `Server_OpenSupplyPod()` | **Unreliable** | Oui (true) |
| `AHWPlayerController` | `Server_OpenContainer()` | Reliable | Oui (true) |
| `AHWPlayerController` | `Server_TravelToZone(FString, FVector, FRotator)` | Reliable | Oui (true) |
| `AHWPlayerController` | `Server_TravelToDeadKingdom()` | Reliable | Oui (true) |
| `AHWInventoryComponent` | (Server RPC interne) | Reliable | Oui |
| `AHWTerrainDeformation` | `ServerCreateDeformation(FVector, float, float, float)` | Reliable | Non |
| `AHWWaterVolume` | `Server_ChangeOverlapStatus(AActor*, bool)` | Reliable | Non |
| `UHWSwimmingComponent` | `Server_SurfaceLockedSwimming(bool)` | Reliable | Oui |
| `UHWSwimmingComponent` | `Server_SwimFast(bool)` | Reliable | Oui |
| `UHWSwimmingComponent` | `Server_SwimUpOrDown(bool, double)` | Reliable | Oui |
| `UHWSwimmingComponent` | `Server_LookUp(double)` | Reliable | Oui |
| `UHWSwimmingComponent` | `Server_MoveForwardBackward(double)` | Reliable | Oui |
| `UHWSwimmingComponent` | `Server_MoveLeftRight(double)` | Reliable | Oui |
| `AHWEntitySpawner` | (2 Server RPCs avec Validation) | Reliable | Oui |

### 2.2 Anomalies identifiées

**[CRITIQUE] `Server_OpenSupplyPod` — Unreliable + action d'état permanent**  
Fichier : `Public/Game/HWPlayerController.h:216`  
Ce RPC est déclaré `Unreliable` alors qu'il modifie l'état persistant du jeu (ajout dans `SupplyPodsOpened`, sauvegarde OWS). En cas de perte de paquet, le joueur ne pourra pas ouvrir le pod ou sera dans un état incohérent. **Doit être `Reliable`.**

**[CRITIQUE] Validations triviales dans `UHWSwimmingComponent`**  
Fichier : `Private/Water/Components/HWSwimmingComponent.cpp:188-216`  
Toutes les fonctions `_Validate()` retournent `GetOwner()->HasAuthority()`. Or, un Server RPC ne s'exécute que sur le serveur — vérifier l'autorité dans la validation est redondant et n'empêche pas les appels malveillants. Une vraie validation (plage d'axe, état du joueur) serait utile.

**[RISQUE BANDWIDTH] RPCs de nage à haute fréquence — Reliable sur données d'input continu**  
Fichier : `Public/Water/Components/HWSwimmingComponent.h:262-296`  
Les RPCs `Server_LookUp`, `Server_MoveForwardBackward`, `Server_MoveLeftRight`, `Server_SwimUpOrDown` transmettent des valeurs d'axe d'input (doubles) et sont tous `Reliable`. En nage, ces fonctions peuvent être appelées à chaque frame (60+ fois/s). Des RPCs Reliable à cette fréquence créent une file d'attente de retransmission et peuvent saturer la connexion. **Recommandé : `Unreliable` pour les axes d'input continus.**

---

## 3. RPCs NetMulticast — Inventaire Complet

| Classe | RPC | Fiabilité |
|---|---|---|
| `UHWSwimmingComponent` | `NetMulticast_SurfaceLockedSwimming(bool)` | Reliable |
| `UHWSwimmingComponent` | `NetMulticast_SwimFast(bool)` | Reliable |
| `UHWSwimmingComponent` | `NetMulticast_SwimUpOrDown(bool, double)` | Reliable |
| `UHWSwimmingComponent` | `NetMulticast_LookUp(double)` | Reliable |
| `UHWSwimmingComponent` | `NetMulticast_MoveForwardBackward(double)` | Reliable |
| `UHWSwimmingComponent` | `NetMulticast_MoveLeftRight(double)` | Reliable |
| `AHWWaterVolume` | `NetMulticast_ChangeOverlapStatus(AActor*, bool)` | Reliable |

### Patron Server→Multicast dans HWSwimmingComponent

```
Client Input → Server_MoveLeftRight() → NetMulticast_MoveLeftRight() → [Tous clients]
```

Ce pattern est un **double gaspillage de bande passante** pour les valeurs d'input. Le serveur reçoit chaque mouvement du client, puis les rediffuse à **tous** les clients connectés dans la zone. Pour un joueur en train de nager, cela génère :
- 6 RPCs Server par frame (côté client→serveur)
- 6 RPCs Multicast par frame (côté serveur→tous clients)

Avec 20 joueurs nageant simultanément dans une zone, cela représente potentiellement **240 RPCs par frame** uniquement pour la nage. La solution correcte est d'utiliser la réplication de mouvement standard de `UCharacterMovementComponent` ou de conditionner les Multicast à `COND_SkipOwner`.

---

## 4. RPCs Client (Client→Unique)

| Classe | RPC | Fiabilité |
|---|---|---|
| `AHWGASPlayerCharacter` | `Client_InflictDamage(float, AActor*, bool)` | Reliable |
| `AHWPlayerController` | `OwningClient_ReadyToPlay()` | Reliable |

Ces deux RPCs sont corrects — envoyés uniquement au client possesseur, fiables, pour des événements ponctuels.

---

## 5. Modes de Réplication GAS (`SetReplicationMode`)

| Classe | Mode | Localisation |
|---|---|---|
| `AHWGASPlayerCharacter` | `EGameplayEffectReplicationMode::Mixed` | `Private/Character/HWGASPlayerCharacter.cpp:106` |
| `AHWGASMobCharacter` | `EGameplayEffectReplicationMode::Minimal` | `Private/Character/HWGASMobCharacter.cpp:41` |

### Analyse

**Joueurs — Mode `Mixed`** : Correct pour un MMO. Les GameplayEffects sont répliqués en `Full` vers le propriétaire et en résumé (`Minimal`) vers les autres. Les Gameplay Cues se déclenchent correctement pour tous. L'ASC est correctement marqué répliqué (`AbilitySystem->SetIsReplicated(true)`).

**Mobs — Mode `Minimal`** : Correct pour les entites. Seuls les GameplayTags sont répliqués, pas les GEs individuels. Cela réduit significativement la charge réseau pour les zones peuplées d'entites.

> **Attention** : En mode `Mixed`, les attributs partagés en `COND_OwnerOnly` (stats, ressources) ne seront jamais envoyés aux autres joueurs via GAS. Cela est cohérent avec le design actuel, mais signifie que les barres de ressources des adversaires ne sont accessibles que via `Health`/`MaxHealth` (qui sont `COND_None`). Les attributs de combat (Attack, Defense, Crit) des ennemis joueurs ne sont donc pas consultables depuis un autre client — choix de design à valider.

---

## 6. FFastArraySerializer — Inventaire des Structures

| Structure | Appartient à | Item | Delta Serialize | Callbacks Item |
|---|---|---|---|---|
| `FHWInventoryMaster` | `UHWInventoryComponent` | `FHWInventoryItem` | Oui | `PreReplicatedRemove`, `PostReplicatedAdd`, `PostReplicatedChange` actifs |
| `FHWSupplyPodMaster` | `AHWPlayerController` | `FHWSupplyPodOpenedItem` | Oui | `PreReplicatedRemove`, `PostReplicatedAdd`, `PostReplicatedChange` actifs |
| `FHWContainerMaster` | `AHWPlayerController` | `FHWContainerOpenedItem` | Oui | Non implémentés (commentés dans .h) |

### Analyse

`FHWInventoryMaster` et `FHWSupplyPodMaster` ont leurs callbacks item déclarés et vraisemblablement implémentés — bonne pratique pour les delta updates.

`FHWContainerMaster` n'a pas de callbacks item. Les modifications de conteneurs ouverts seront propagées correctement par le delta serializer de base, mais sans notification fine (pas de callback individuel par item ajouté/retiré). Acceptable si aucune logique n'est requise côté client à l'ajout d'un item.

---

## 7. Acteurs avec `bReplicates = true`

| Acteur | Fichier | Justification |
|---|---|---|
| `AHWFakeProjectile` | `Private/AbilitySystem/HWFakeProjectile.cpp` | Projectile visuel répliqué — correct |
| `AHWEnvironmentManager` | `Private/Environment/HWEnvironmentManager.cpp` | Gestionnaire météo/temps — correct |
| `ASupplyPod` | `Private/Interaction/SupplyPod.cpp` | Interactable monde — correct |
| `AHWContainer` | `Private/Interaction/HWContainer.cpp` | Interactable monde — correct |
| `AHWDoor` | `Private/Interaction/HWDoor.cpp` | Interactable monde — correct |
| `AHWInfiniteOcean` | `Private/Water/Actors/...cpp` | Acteur eau — correct |
| `AHWWaterParent` | `Private/Water/Actors/...cpp` | Acteur eau parent — correct |
| `AHWWaterVolume` | `Private/Water/Actors/...cpp` | Volume eau — correct |
| `AHWTerrainDeformation` | `Private/Terrain/HWTerrainDeformation.cpp` | Déformations terrain — correct |

> **Absence notable** : Les mobs (`AHWGASMobCharacter`) n'ont pas de `bReplicates = true` explicite dans leur constructeur visible. Ils héritent de `ACharacter` qui a la réplication activée par défaut, mais il est recommandé de le définir explicitement pour la lisibilité et la robustesse.

---

## 8. Composants Répliqués (`SetIsReplicatedByDefault` / `SetIsReplicated`)

| Composant | Mécanisme |
|---|---|
| `UHWWeaponMasteryComponent` | `SetIsReplicatedByDefault(true)` |
| `UHWComboComponent` | `SetIsReplicatedByDefault(true)` |
| `UHWInventoryComponent` | `SetIsReplicatedByDefault(true)` |
| `UHWProgressionComponent` | `SetIsReplicatedByDefault(true)` |
| `UHWQuestComponent` | `SetIsReplicatedByDefault(true)` |
| `UHWNPCComponent` | `SetIsReplicatedByDefault(true)` |
| `UHWSkillBarComponent` | `SetIsReplicatedByDefault(true)` |
| `UHWAbilitySystemComponent` (ASC) | `SetIsReplicated(true)` (dans HWGASCharacter) |
| ~~`UHWCharacterCustomComponent`~~ | ~~`SetIsReplicated(true)` (dans HWCharacter)~~ — **Supprimé** (2026-04-07) |
| `UHWUnderwaterComponent` | `SetIsReplicated(true)` (dans WaterParent) |
| `OceanWaveSolver` | `SetIsReplicated(true)` (dans WaterParent) |

> **Anomalie** : `UHWComboComponent` est marqué `SetIsReplicatedByDefault(true)` mais **n'a aucune propriété répliquée ni aucun RPC** dans son code source. Il n'implémente pas `GetLifetimeReplicatedProps`. La réplication est donc activée inutilement, ce qui consomme des ressources réseau (enregistrement de l'acteur dans le channel) sans bénéfice. Recommandé : désactiver ou ajouter les données nécessaires.

---

## 9. Désynchronisations Potentielles Identifiées

### 9.1 `CharacterAppearance` visible uniquement du propriétaire
**Fichier** : `Private/Character/HWCharacter.cpp:176-177`  
**Problème** : `CharacterAppearance` et `CharacterAppearanceCE` sont en `COND_OwnerOnly`. Un joueur rejoint une zone : son apparence n'est jamais envoyée aux autres joueurs. Les autres ne voient que le mesh par défaut.  
**Impact** : Visuel — cosmétiques invisibles pour les autres joueurs.  
**Correction** : Changer en `COND_None` ou `COND_SkipOwner`.

### 9.2 `Server_ChangeAppearanceNative` — composant visuel absent
**Fichier** : `Private/Character/HWGASPlayerCharacter.cpp:1201`  
`Server_ChangeAppearanceNative` RPC existe toujours en C++ et appelle `UpdateCharacterAppearance(Appearance)` côté serveur. Cependant, `UHWCharacterCustomComponent` a été supprimé (2026-04-07). `LoadCharacterCustomization` dans `HWPlayerController.cpp` ne fait plus appel au composant et un TODO a été ajouté pour le raccordement visuel futur. Le RPC fonctionne côté réseau mais la customisation visuelle n'est plus appliquée. Voir anomalie 9.1.

### 9.3 `UHWComboComponent` répliqué sans état
**Fichier** : `Private/Combat/HWComboComponent.cpp`  
Le composant combo gère `CurrentComboIndex`, `bInComboWindow`, `CurrentComboTag` — tous locaux (non répliqués). Dans un contexte multijoueur, la synchronisation du combo repose entièrement sur les animations et les GAS abilities. Si un client simulated proxy observe une attaque, il ne connaît pas l'index combo — l'animation peut désynchroniser avec le feedback serveur.

### 9.4 `ActiveDeformations` — TArray sans delta serialize
**Fichier** : `Public/Terrain/HWTerrainDeformation.h:59`  
`ActiveDeformations` est un `TArray<FHWTerrainDeformationEvent>` repliqué par `DOREPLIFETIME` standard (pas `FFastArraySerializer`). Chaque modification (ajout ou suppression de déformation) envoie le **tableau entier** aux clients. Avec `MaxActiveDeformations = 100`, chaque nouveau cratère envoie jusqu'à 100 structs. Recommandé : migrer vers `FFastArraySerializer`.

### 9.5 Axes d'input nage répliqués en Reliable
**Détaillé en section 3** — risque de congestion de la file reliable.

### 9.6 Noyade — `DrowningTimeCounter` et `DrowningTaskRunning` en `COND_None`
**Fichier** : `Private/Water/Components/HWSwimmingComponent.cpp:1146-1147`  
Les timers de noyade d'un joueur sont envoyés à tous les clients. En plus d'être une fuite d'information, le timer côté client simulated proxy ne pilote aucune logique — il n'est utilisé que pour l'UI du propriétaire. Recommandé : `COND_OwnerOnly`.

---

## 10. Résumé des Problèmes par Priorité

### Priorité 1 — Critique (correctness fonctionnelle)

| ID | Problème | Fichier | Impact |
|---|---|---|---|
| NET-001 | `CharacterAppearance` et `CharacterAppearanceCE` en `COND_OwnerOnly` | `HWCharacter.cpp:176-177` | Apparence des joueurs invisible pour les autres |
| NET-002 | `Server_OpenSupplyPod` déclaré `Unreliable` | `HWPlayerController.h:216` | Perte possible d'état persistant |

### Priorité 2 — Important (bande passante / sécurité)

| ID | Problème | Fichier | Impact |
|---|---|---|---|
| NET-003 | 6 RPCs Reliable à chaque frame pendant la nage | `HWSwimmingComponent.h:268-296` | Saturation de la file reliable en zone aquatique |
| NET-004 | `WeaponMasteries` en `COND_None` | `HWWeaponMasteryComponent.cpp:162` | Fuite stats privées + bande passante inutile |
| NET-005 | `Rep_ProgressionData`, `UnlockedIDs`, `VisitedLocations` en `COND_None` | `HWProgressionComponent.cpp:570-572` | Progression privée visible par tous |
| NET-006 | `Rep_QuestStatuses`, `Rep_QuestProgress` en `COND_None` | `HWQuestComponent.cpp:575-576` | Quêtes privées visibles par tous |
| NET-007 | `ActiveDeformations` non-delta, tableau complet | `HWTerrainDeformation.cpp:18` | Sérialisation lourde à chaque déformation |

### Priorité 3 — Mineur (optimisation / propreté)

| ID | Problème | Fichier | Impact |
|---|---|---|---|
| NET-008 | `UHWSkillBarComponent` en `COND_None` | `HWSkillBarComponent.cpp:46` | Données UI privées envoyées à tous |
| NET-009 | `UHWComboComponent` répliqué sans données | `HWComboComponent.cpp:14` | Overhead réseau inutile |
| NET-010 | Timers de noyade en `COND_None` | `HWSwimmingComponent.cpp:1146-47` | Fuite d'information, overhead |
| NET-011 | Validations triviales `GetOwner()->HasAuthority()` | `HWSwimmingComponent.cpp:188-216` | Sécurité illusoire, aucun anti-cheat réel |
| NET-012 | `bReplicates` non explicite sur les entites | `HWGASMobCharacter.cpp` | Lisibilité et robustesse |

---

## 11. Recommandations Techniques

### Correction NET-001 — Apparence multijoueur
```cpp
// HWCharacter.cpp — GetLifetimeReplicatedProps
DOREPLIFETIME_CONDITION(AHWCharacter, CharacterAppearance,   COND_None);  // ou COND_SkipOwner
DOREPLIFETIME_CONDITION(AHWCharacter, CharacterAppearanceCE, COND_None);  // ou COND_SkipOwner
```

### Correction NET-002 — SupplyPod Reliable
```cpp
// HWPlayerController.h:216
UFUNCTION(BlueprintCallable, Server, Reliable, WithValidation)  // Retirer Unreliable
void Server_OpenSupplyPod();
```

### Correction NET-003 — Axes de nage Unreliable
```cpp
// HWSwimmingComponent.h — Pour les axes continus
UFUNCTION(BlueprintCallable, Server, Unreliable, WithValidation, Category="Swimming|Controls")
void Server_LookUp(const double AxisValue);
// Idem pour MoveForwardBackward, MoveLeftRight, SwimUpOrDown
```

### Correction NET-007 — Déformations terrain avec FFastArraySerializer
Migrer `FHWTerrainDeformationEvent` vers `FFastArraySerializerItem` et `ActiveDeformations` vers un wrapper `FFastArraySerializer` sur le modèle de `FHWInventoryMaster`.

---

## 12. Points Positifs

- **Architecture GAS correcte** : Mixed pour joueurs, Minimal pour mobs — le meilleur compromis pour un MMO.
- **FFastArraySerializer bien utilisé** pour l'inventaire, les supply pods et les conteneurs — les trois systèmes les plus fréquemment modifiés.
- **COND_OwnerOnly systématique** sur toutes les stats combat et données de personnage privées.
- **`HasAuthority()` systématiquement vérifié** avant les mutations d'état (PlayerController, InventoryComponent, GASCharacter).
- **OnRep_ correctement déclarés** sur tous les attributs GAS avec `GAMEPLAYATTRIBUTE_REPNOTIFY`.
- **Projectiles `AHWFakeProjectile`** : pattern propre avec `bProjectileStopped` répliqué + `OnRep_` pour les effets visuels côté client.
- **`HUDStatLIVE_RepCounter`** : pattern élégant de dirty-flag pour déclencher les mises à jour UI sans répliquer les données entières.

---

*Fin de l'audit — 12 anomalies identifiées, 2 critiques, 5 importantes, 5 mineures.*

---

## Voir aussi

- [[Cross System GAS Combat]] — documente `HWGASPlayerCharacter.cpp:106` en mode `Mixed` et `HWGASMobCharacter.cpp:41` en `Minimal`, ainsi que l'anomalie NET-009 `UHWComboComponent` répliqué sans propriété (`HWComboComponent.cpp:14`).
- [[Cross System Character Inventory]] — décrit `bUpdateMeshEquipment`/`OnRep_UpdateMeshEquipment` sur `AHWGASPlayerCharacter` et l'anomalie 9.2 `Server_ChangeAppearanceNative` sans composant visuel après suppression de `UHWCharacterCustomComponent`.
- [[Cross System Framework World]] — confirme `AHWGameState::ZoneName`/`ActivePlayerCount`/`bIsZoneOpen`/`ActiveWorldEvents` tous en `COND_None` (réplication standard) détaillés en section 1.7 de cet audit.
- [[Performance Analysis]] — section P3 quantifie `AHWTerrainDeformation::ActiveDeformations` (anomalie NET-007, non-delta serialize sur tableau jusqu'à 100 structs) et l'impact CPU des updates réseau.
- [[Security Audit]] — couvre UE-02 (`Server_OpenSupplyPod` Unreliable + `_Validate` triviale, `HWPlayerController.h:216`, corrélé à NET-002) et UE-04 (validations `HasAuthority()` dans `HWSwimmingComponent.cpp:188-216`, corrélées à NET-011).
- [[Technical Debt Active]] — section 6 documente la race condition persistence logout affectant `BagInventory`/`EquipmentInventory` (HWPlayerController.cpp:151-154, ~1444) en lien avec les anomalies de réplication FastArray.
