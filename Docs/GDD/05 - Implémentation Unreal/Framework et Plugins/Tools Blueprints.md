---
tags: [implementation, ue5, blueprint, tools]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Tools Blueprints

> Inspection MCP des Blueprints utilitaires (`/Game/Blueprints/Tools/`).
> Source : `unreal_python` AssetRegistry + analyse binaire .uasset — 2026-04-04.
> Issu de la scission V3.3 de `FrameworkBlueprints.md`.

---

## 1. BP_Door

**Chemin asset :** `/Game/Blueprints/Tools/BP_Door`
**Classe parente :** `Actor`
**Réplication :** 0

### Composants

| Composant | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine |
| `Cube_GEN_VARIABLE` | `StaticMeshComponent` | Mesh de la porte |
| `Box_GEN_VARIABLE` | `BoxComponent` | Zone de déclenchement (trigger) |

### Variables BP

| Nom | Type | Rôle |
|---|---|---|
| `DoorFloat` | Float | Valeur d'ouverture (0–1) |
| `OpenDoorTime` | Timeline | Timeline d'animation d'ouverture |
| `AreaClass` | Class Reference | Classe de zone NavMesh |
| `CurveFloat` | `CurveFloat` | Courbe d'animation pour l'ouverture |

### Timeline

| Timeline | Float Track | Durée |
|---|---|---|
| `OpenDoorTime` | `DoorFloat` | Définie par `CurveFloat` |

La timeline `OpenDoorTime` utilise un `FloatCurve` avec une `RichCurve` pour animer l'ouverture/fermeture de la porte via le `DoorFloat`.

### Fonctions définies

| Nom | Déclencheur | Rôle |
|---|---|---|
| `OpenDoor` | `OnComponentBeginOverlap` | Lance la timeline (porte s'ouvre) |
| `CloseDoor` | `OnComponentEndOverlap` | Inverse la timeline (porte se ferme) |

### Logique d'animation

À chaque update de la timeline (`OpenDoorTime__UpdateFunc`), `K2_SetRelativeRotation` applique une rotation au mesh. Les pins `NewRotation_Pitch/Roll/Yaw` indiquent une rotation en **Yaw** (axe Z). La timeline supporte `PlayFromStart`, `Reverse`, `ReverseFromEnd` et `SetNewTime`.

---

## 2. BP_SplineMesh

**Chemin asset :** `/Game/Blueprints/Tools/BP_SplineMesh`
**Classe parente :** `Actor`
**Réplication :** 0

### Composants

| Composant | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine |
| `Billboard` | `BillboardComponent` | Marqueur visuel éditeur |
| `RoadSpline` | `SplineComponent` | Spline principale du chemin |

### Variables BP

| Nom | Type | Exposition | Rôle |
|---|---|---|---|
| `RoadPartMesh` | Static Mesh | `ExposeOnSpawn` | Mesh de section de route |
| `NewPartMesh` | Static Mesh | — | Mesh alternatif |
| `NewMesh` | Static Mesh | — | Mesh courant |
| `NewType` | Enum/Int | — | Type de section |
| `Material` | Material Interface | — | Matériau appliqué |
| `CollisionType` | ECollisionEnabled | — | Type de collision |
| `CoordinateSpace` | ESplineCoordinateSpace | — | Espace de coordonnées |
| `DIstanceStart` (sic) | Float | — | Distance de début |
| `DIstanceEnd` (sic) | Float | — | Distance de fin |
| `SectionLenght` (sic) | Float | — | Longueur d'une section |
| `SectionsRarity` | Float | — | Espacement/rareté |
| `NumOfParts` | Int | — | Nombre de parties générées |
| `MeshBoundSize` | Float/Vector | — | Taille des bounds |
| `NodeHeight` / `NodeWidth` | Float | — | Dimensions des nœuds |

### Construction dynamique

Ce BP génère des **SplineMeshComponents** procéduralement via `UserConstructionScript` :

| Nœud | Rôle |
|---|---|
| `AddComponent` + `SplineMeshComponent` | Ajoute dynamiquement des sections |
| `GetSplineLength` | Récupère la longueur totale |
| `GetLocationAtDistanceAlongSpline` | Position à distance |
| `GetTangentAtDistanceAlongSpline` | Tangente (direction) |
| `GetRollAtDistanceAlongSpline` | Roll à distance |
| `GetScaleAtDistanceAlongSpline` | Scale à distance |
| `SetStartAndEnd` | Définit début/fin de section |
| `SetStartRoll` / `SetEndRoll` | Roll aux extrémités |
| `SetStartScale` / `SetEndScale` | Scale aux extrémités |
| `SetStaticMesh` | Mesh par section |
| `SetMaterial` | Matériau |
| `SetCollisionEnabled` | Active/désactive collision par section |
| `ForLoop` | Itère sur les sections |
| `GetBoundingBox` | Calcule la bounding box |
| `ClampVectorSize` | Évite les déformations |

> Outil de génération procédurale de **routes et chemins**. Suit le pattern standard UE5 spline mesh.

---

## Liens

- [[Game Mode Blueprints]]
- [[Player Controller Blueprints]]
- [[World Blueprints]]
- [[Doors]]
