---
tags: [implementation, ue5, blueprint, world]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# World Blueprints

> Inspection MCP des Blueprints World (`/Game/Blueprints/World/`).
> Source : `unreal_python` AssetRegistry + analyse binaire .uasset — 2026-04-04.
> Issu de la scission V3.3 de `FrameworkBlueprints.md`.

## Classes C++ associées
- [[Game Mode]] — `HWGameMode` (utilise BP_RespawnPoint)
- [[NPC System]] — BP_HWEntity spawné via BP_InterestPointBase

---

## 1. BP_Ville

**Chemin asset :** `/Game/Blueprints/World/BP_Ville`
**Classe parente :** `Actor`
**Réplication :** 0

### Composants

| Composant | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine de la scène |
| `SphereComponent` | `SphereComponent` | Zone de détection de la ville (overlap) |
| `TextRender` | `TextRenderComponent` | Affichage du nom de la ville en monde |

### Variables BP

| Nom | Type | Exposition | Rôle |
|---|---|---|---|
| `CityName` | Name/Text | `ExposeOnSpawn` | Nom de la ville |
| `WorldSize` | Float/Vector | — | Taille de la ville dans le monde |
| `AreaClass` | Class Reference | — | Classe de zone associée |
| `SphereRadius` | Float | — | Rayon de la sphère de détection |
| `HorizontalAlignment` | EHorizTextAlignment | — | Alignement du texte affiché |

### Logique

- À `BeginPlay`, le `TextRenderComponent` est configuré avec le `CityName`.
- L'overlap `ActorBeginOverlap` déclenche probablement des effets de zone (musique, UI de ville, restrictions de combat).
- La `SphereComponent` définit la zone d'influence de la ville.

---

## 2. BP_SpawnerPNJ

**Chemin asset :** `/Game/Blueprints/World/BP_SpawnerPNJ`
**Classe parente :** `Actor`
**Réplication :** 0

### Variables BP

| Nom | Type | Rôle |
|---|---|---|
| `ActorClass` | Class Reference | Classe de l'acteur à spawner (Entity) |
| `Condition` | Variable | Condition requise pour le spawn |
| `Completed` | Bool/Flag | Indique si le spawn est terminé/accompli |

### Logique globale

À `BeginPlay`, le spawner vérifie si la `Condition` est remplie et s'il n'a pas déjà spawné (`Completed`). Si les conditions sont valides, il utilise `GetAllActorsOfClass` pour éviter les doublons, puis itère pour spawner les acteurs manquants. La référence à `BP_InterestPointBase` suggère que chaque spawner est attaché à un point d'intérêt.

---

## 3. BP_RespawnPoint

**Chemin asset :** `/Game/Blueprints/World/BP_RespawnPoint`
**Classe parente :** `Actor`
**Réplication :** 0

### Composants

| Composant | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine |
| `Arrow` | `ArrowComponent` | Indicateur de direction de respawn |

### Logique

- L'`ArrowComponent` indique la **direction de spawn** du joueur à la résurrection.
- L'`ActorBeginOverlap` permet au BP de détecter quand un joueur entre dans la zone et d'enregistrer ce point comme dernier point de respawn actif.
- Marqueur de position : pas de logique complexe, expose sa `Transform` pour `HWGameMode`.

---

## 4. BP_InterestPointBase

**Chemin asset :** `/Game/Blueprints/World/BP_InterestPointBase`
**Classe parente :** `Actor`
**Réplication :** 0
**Tick activé :** `bCanEverTick = true`

### Composants

| Composant | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine |
| `TextRender` | `TextRenderComponent` | Affichage du nom du point d'intérêt |
| `StaticMeshComponent` | `StaticMeshComponent` | 6 instances mesh (`Cube` à `Cube5`) pour la structure |

> Asset mesh utilisé : `/Engine/BasicShapes/Cube`

### Variables BP

| Nom | Type | Rôle |
|---|---|---|
| `UUID` | UInt64/String | Identifiant unique du point d'intérêt |
| `TextRenderColor` | LinearColor | Couleur du texte affiché |
| `SpawnTransform` | Transform | Transform pour le spawn des PNJs liés |
| `Condition` | Variable | Condition d'activation |
| `Completed` | Bool | État d'accomplissement |
| `Duration` | Float | Durée (cooldown ou activation) |

### Référence BP NPC

- `/Game/Blueprints/Entity/BP_HWEntity` — ce point d'intérêt référence et peut spawner des PNJs de type `BP_HWEntity`

### Logique globale

Base de tous les points d'intérêt du monde. À `BeginPlay`, initialise UUID et état. En tick, met à jour position/état. Lorsqu'un acteur entre en overlap, peut spawner des PNJs via `K2Node_SpawnActorFromClass` avec placement aléatoire autour du `SpawnTransform`. Le champ `Completed` signale traitement/activation.

---

## 5. BP_GenerateCity

**Chemin asset :** `/Game/Blueprints/World/BP_GenerateCity`
**Classe parente :** `Actor`
**Réplication :** 0

### Variables BP

| Nom | Type | Rôle |
|---|---|---|
| `CityName` | Name/Text | Nom de la ville à générer |
| `WorldSize` | Float/Vector | Taille de la zone de génération |
| `AreaClass` | Class Reference | Classe de zone NavMesh/Area |
| `SphereRadius` | Float | Rayon de la sphère de génération |
| `BuildingType` | Enum/Class | Type de bâtiment |
| `Buldingname` (sic) | Name/Text | Nom du bâtiment |
| `AllLocation` | Array de Vectors | Tableau des positions générées |
| `Center` | Vector | Centre de la ville |
| `Extent` | Vector | Extension de la boîte |

### Fonctions définies

| Nom | Nature | Rôle |
|---|---|---|
| `GenerateCity` | Fonction BP | Génère la structure de la ville |
| `GenerateVillage` | Fonction BP | Variante village |
| `ClearHouse` | Fonction BP | Supprime les bâtiments générés |

> `CallInEditor` présent → fonctions appelables depuis l'éditeur UE5.

### Types de bâtiments référencés (codés en dur)

`Maison`, `Forge`, `Boulangerie`

### Noms de villes précodés (lore HybeliorWorld)

`Durnhollow`, `Iseldra`, `Korveth`, `Lirandel`, `Myrralis`, `Oskavarn`, `Tharnor`, `Valendreth`, `Velmorin`, `Zepharun`

### Logique de génération

`BeginDeferredActorSpawnFromClass` + `FinishSpawningActor` pour spawn différé ; `RandomPointInBoundingBox` pour position aléatoire ; spawne `BP_Ville_C` et `BP_InterestPointBase_C`.

---

## 6. BP_TargetLocation

**Chemin asset :** `/Game/Blueprints/World/BP_TargetLocation`
**Classe parente :** `Actor`
**Réplication :** 0

### Composants

| Composant | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine |
| `BillboardComponent` | `BillboardComponent` | Marqueur visuel dans l'éditeur |

### Usage

Marqueur de navigation/cible placé dans le niveau. 3 instances en level actif (`BP_TargetLocation`, `BP_TargetLocation2`, `BP_TargetLocation3`). Sert de destination pour systèmes d'IA, téléportation, ou quête.

---

## Hiérarchie

```
Actor (C++)
├── BP_Ville → Détection zones de ville (Overlap)
├── BP_SpawnerPNJ → Spawn conditionnel de PNJs
├── BP_RespawnPoint → Marqueur de respawn (Arrow)
├── BP_InterestPointBase → Point d'intérêt avec spawn de BP_HWEntity
│     └── Référencé par BP_SpawnerPNJ
├── BP_GenerateCity → Génération procédurale
│     └── Spawne BP_Ville et BP_InterestPointBase
└── BP_TargetLocation → Marqueur de navigation (3 instances en level)
```

## Liens

- [[Game Mode Blueprints]]
- [[Player Controller Blueprints]]
- [[Tools Blueprints]]
- [[Levels]]
