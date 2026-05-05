---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation MCP — Portails et Interactables (Blueprints)

> **Généré via MCP Python** — Date : 2026-04-04  
> **Source** : Export T3D via `unreal.Exporter.run_asset_export_task` + analyse `SubobjectDataSubsystem`  
> **Assets couverts** : 6 Blueprints dans `/Game/Blueprints/Portals` et `/Game/Interactables`

## Classes C++ associées
- [[Interactable Framework]] — interface d'interaction commune
- [[Containers]] — `HWContainer` parent de BP_Container / BP_Door / BP_SupplyPod01
- [[Doors]] — `HWDoor` parent de BP_DoorPortal
- [[Portals]] — `HWPortal` parent de BP_BoxPortal

---

## Sommaire

1. [BP_BoxPortal](#1-bp_boxportal)
2. [BP_DoorPortal](#2-bp_doorportal)
3. [BP_Door](#3-bp_door)
4. [BP_SupplyPod01](#4-bp_supplypod01)
5. [BP_Container](#5-bp_container)
6. [HubWorldContentManager](#6-hubworldcontentmanager)
7. [DT_InteractablesToSpawn (DataTable)](#7-dt_interactablestospawn)
8. [Hiérarchie des classes C++ parentes](#8-hiérarchie-des-classes-c-parentes)

---

## 1. BP_BoxPortal

| Champ | Valeur |
|---|---|
| **Chemin asset** | `/Game/Interaction/BP_BoxPortal` |
| **Classe parente C++** | `HWPortal` (module `HybeliorWorld`) |
| **BlueprintGuid** | `AA360DBC-4452-4BD0-9EBE-4EA95EBDC23E` |
| **Classe générée** | `BP_BoxPortal_C` |

### Composants

| Nom | Type |
|---|---|
| `Box` (BoxCollision) | `BoxComponent` |

> Pas de `StaticMeshComponent` — le portail utilise uniquement un volume de collision invisible.

### Graphes

| Graphe | Rôle |
|---|---|
| `EventGraph` | Logique principale d'interaction et d'overlaps |
| `UserConstructionScript` | Vide (pas de construction personnalisée) |
| `BndEvt__..._ComponentBeginOverlapSignature` | Gestionnaire interne d'overlap du composant Box |

### Logique d'interaction (EventGraph)

```
[Event BeginPlay]      ← DÉSACTIVÉ (node commenté "will not be called")
[Event ActorBeginOverlap] ← DÉSACTIVÉ
[Event Tick]           ← DÉSACTIVÉ

[Box.OnComponentBeginOverlap]
  └─> TravelThroughPortal(ActorFromOverlapEvent: Actor)
        Target: HWPortal (self)
```

**Flux principal actif** :  
Quand un acteur entre dans le `BoxCollision`, l'événement bound `OnComponentBeginOverlap` se déclenche et appelle directement `TravelThroughPortal(OtherActor)` sur `self` (méthode native C++ de `HWPortal`).

La logique de filtrage (ex: vérifier si l'OtherActor est bien un personnage joueur) est entièrement déléguée à la classe C++ `HWPortal::TravelThroughPortal`.

### Variables

Aucune variable Blueprint exposée. Toutes les données du portail (destination, ZoneID, etc.) sont gérées par les propriétés C++ héritées de `HWPortal`.

### Notes

- Les events `ReceiveBeginPlay`, `ReceiveActorBeginOverlap`, `ReceiveTick` sont présents mais **explicitement désactivés** (`EnabledState=Disabled`), laissant uniquement l'overlap de composant actif.
- BP minimal : sert uniquement de volume de déclenchement physique pour la logique C++ sous-jacente.

---

## 2. BP_DoorPortal

| Champ | Valeur |
|---|---|
| **Chemin asset** | `/Game/Interaction/BP_DoorPortal` |
| **Classe parente C++** | `HWDoor` (module `HybeliorWorld`) |
| **BlueprintGuid** | `02016193-411E-900B-1EE5-DAA21356362D` |
| **Classe générée** | `BP_DoorPortal_C` |

### Composants

| Nom | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine de la hiérarchie |
| `Box` (×2 instances) | `BoxComponent` | Volumes de collision (déclenchement + zone d'interaction) |
| `Cube` (×2 instances) | `StaticMeshComponent` | Panneaux visuels de la porte (battants ou encadrement) |

### Graphes

| Graphe | Rôle |
|---|---|
| `EventGraph` | Logique complète d'ouverture/fermeture + téléportation |
| `UserConstructionScript` | Vide |
| `RPC_MovePlayer` | Fonction RPC pour repositionner le joueur côté serveur/client |
| `CustomEvent` | Override de `HWContainer::CustomEvent` (fermeture) |
| `CustomEvent_1` | Override de `HWContainer::CustomEvent_1` (ouverture) |
| `CustomEvent_2` | Override de `HWContainer::CustomEvent_2` (action supplémentaire) |
| `Timeline__UpdateFunc` | Callback de mise à jour de la Timeline d'animation |
| `Timeline__FinishedFunc` | Callback de fin de la Timeline d'animation |

### Logique d'interaction (EventGraph)

```
[CustomEvent "CustomEvent" / "CustomEvent_1" / "CustomEvent_2"]  
  ← mappés sur HWContainer::ContainerClosed / ContainerOpened
  └─> IsContainerOpened()
        ├─ [true]  → Timeline Play (ouverture)
        └─ [false] → Timeline Reverse (fermeture)

[Timeline "Timeline"]
  ├─ UpdateFunc:  Lerp + K2_SetRelativeRotation(Cube) 
  │                ← rotation progressive du/des battants de porte
  └─ FinishedFunc: (finalisation état)

[Switch Has Authority] (Macro UE)
  ├─ Authority: (pas d'action supplémentaire BP)
  └─ Remote:
       └─> Branch(bIsCurrentlyOpen)
             ├─ true  → HWContainer::CustomEvent_1 (ouvrir)
             └─ false → HWContainer::CustomEvent   (fermer)
             └─> RPC_MovePlayer()

[RPC_MovePlayer] (CustomEvent RPC, FunctionFlags=203555008 → NetMulticast/Reliable)
  └─> K2_SetActorLocationAndRotation(NewLocation, NewRotation, bSweep=true, bTeleport=true)
```

**Variables BP exposées (dans le graph)** :

| Variable | Type | GUID | Flags |
|---|---|---|---|
| `New Location` | `FVector` | `CA89D07F-43F4-3F27-FC71-92B9E482419E` | `ExposeOnSpawn=true` |
| `New Rotation` | `FRotator` | `FEEE6C0B-4AC2-9C5F-5AFE-6C8218B21B42` | `ExposeOnSpawn=true` |

> **Note** : Ces variables sont marquées en erreur de compilation (`ErrorType=1`) car elles ne sont plus trouvées dans la classe compilée — probablement supprimées lors d'une migration C++. Elles restent référencées dans le graph mais les pins sont orphelines.

**Logique de déclenchement de l'animation** :
- `Lerp` (KismetMathLibrary) interpole la valeur de rotation entre état fermé et ouvert.
- `K2_SetRelativeRotation(Cube)` applique la rotation calculée aux mesh des battants.
- L'état est suivi par la variable héritée `bIsCurrentlyOpen` (bool, lue/écrite).

**Détection de présence** :
- `GetOverlappingActors(Box)` + `Array_IsNotEmpty` : vérifie si des acteurs sont encore dans la zone avant d'autoriser la fermeture.

### Timeline

| Nom | GUID |
|---|---|
| `Timeline` | `185496B5-417B-6827-7B87-A9B2DFDC6D32` |

---

## 3. BP_Door

| Champ | Valeur |
|---|---|
| **Chemin asset** | `/Game/Interaction/BP_Door` |
| **Classe parente C++** | `HWContainer` (module `HybeliorWorld`) |
| **BlueprintGuid** | `119D8966-40E4-8675-45D1-189BAF9D0A2F` |
| **Classe générée** | `BP_Door_C` |

### Composants

| Nom | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine |
| `Box` (×2 instances) | `BoxComponent` | Zones de collision |
| `Cube` (×2 instances) | `StaticMeshComponent` | Battants/panneaux visuels |

### Graphes

| Graphe | Rôle |
|---|---|
| `EventGraph` | Logique d'ouverture/fermeture identique à BP_DoorPortal |
| `UserConstructionScript` | Vide |
| `Interact` | Override de `HWContainer::Interact` (point d'entrée interaction joueur) |
| `ContainerOpened` | Override de `HWContainer::ContainerOpened` |
| `ContainerClosed` | Override de `HWContainer::ContainerClosed` |
| `Timeline__UpdateFunc` | Callback animation |
| `Timeline__FinishedFunc` | Callback fin animation |

### Logique d'interaction

```
[Event HWContainer::Interact]  ← déclenché par le système d'interaction C++
  └─> IsContainerOpened()
        ├─ false → ContainerOpened()  [ouvre la porte]
        └─ true  → ContainerClosed() [ferme la porte]

[Event HWContainer::ContainerOpened]
  └─> Timeline Play Forward

[Event HWContainer::ContainerClosed]  
  └─> Timeline Play Reverse

[Timeline__UpdateFunc]
  └─> K2_SetRelativeRotation(Cube, Lerp(closed_rot, open_rot, alpha))

[Event RPC_MovePlayer] (RPC réseau)
  └─> K2_SetActorLocationAndRotation(NewLocation, NewRotation, Sweep=true, Teleport=true)
```

**Différence avec BP_DoorPortal** :
- BP_Door hérite de `HWContainer` (pas `HWDoor`) → utilise l'interface `Interact()` standard plutôt que la détection d'overlap automatique.
- Possède explicitement un graph `Interact` qui route vers open/close selon l'état courant.
- Dispose du même `RPC_MovePlayer` pour le repositionnement réseau.

**Variables BP exposées** :

| Variable | Type | GUID | Flags |
|---|---|---|---|
| `New Location` | `FVector` | `CA89D07F-43F4-3F27-FC71-92B9E482419E` | `ExposeOnSpawn=true` |
| `New Rotation` | `FRotator` | `FEEE6C0B-4AC2-9C5F-5AFE-6C8218B21B42` | `ExposeOnSpawn=true` |

> Mêmes GUIDs que BP_DoorPortal — ces variables ont probablement été copiées entre les deux Blueprints.

**Variable d'état (héritée C++)** :
- `bIsCurrentlyOpen` (bool) — lue et écrite dans le graph pour contrôler la direction de la Timeline.
- `Box` (BoxComponent) — utilisée pour `GetOverlappingActors` (vérification présence avant fermeture).

---

## 4. BP_SupplyPod01

| Champ | Valeur |
|---|---|
| **Chemin asset** | `/Game/Interaction/BP_SupplyPod01` |
| **Classe parente C++** | `SupplyPod` (module `HybeliorWorld`) |
| **BlueprintGuid** | `B9FA24E6-4D9A-AD15-00B9-5BAC2B6A9CFA` |
| **Classe générée** | `BP_SupplyPod01_C` |

### Composants

| Nom | Type | Rôle |
|---|---|---|
| `ClosedSupplyPod` | `StaticMeshComponent` | Mesh du pod fermé (état initial) |
| `SphereCollision` (×2 instances) | `SphereComponent` | Sphère d'interaction + sphère interne |

> **Note** : Un seul mesh visible (`ClosedSupplyPod`). Le mesh ouvert est probablement géré via `SetMaterial` ou swap de matériau plutôt qu'un second mesh.

### Graphes

| Graphe | Rôle |
|---|---|
| `EventGraph` | Logique principale |
| `UserConstructionScript` | Vide |
| `Interact` | Override de `SupplyPod::Interact` |
| `SupplyPodOpened` | Override de `SupplyPod::SupplyPodOpened` |
| `SupplyPodClosed` | Override de `SupplyPod::SupplyPodClosed` |

### Logique d'interaction

```
[Event SupplyPod::Interact]   ← point d'entrée joueur
  └─> IsSupplyPodOpened()
        ├─ false → SupplyPodOpened()  [ouvrir]
        └─ (true → ne rien faire ou fermer)

[Event SupplyPod::SupplyPodOpened]  ← GUID: 2E04F305-4DAB-DE25-054A-5E95645A7DB6
  └─> SetMaterial(ClosedSupplyPod, index=slot_open, Material=...)
      [changement de matériau → effet visuel "ouverture"]

[Event SupplyPod::SupplyPodClosed]  ← GUID: 2CEFF058-4BA1-56B5-2E6B-57BD9802FD42
  └─> SetMaterial(ClosedSupplyPod, Material=matériau_fermé)
      [restauration du matériau fermé]
```

**Commentaires de nodes** :
- `"On Interact - If the Supply Pod is Closed, then Open it"`
- `"When the Container is Opened or Closed, then Change the Material"`

**Effets visuels** : Pas de Timeline ni d'animation de mesh. L'état ouvert/fermé est exprimé **uniquement par changement de matériau** sur le `StaticMeshComponent`. Cela indique que le mesh `ClosedSupplyPod` possède plusieurs slots de matériaux représentant les deux états.

**Events standard désactivés** :
- `ReceiveBeginPlay`, `ReceiveActorBeginOverlap`, `ReceiveTick` — présents mais tous `EnabledState=Disabled`.

---

## 5. BP_Container

| Champ | Valeur |
|---|---|
| **Chemin asset** | `/Game/Interaction/BP_Container` |
| **Classe parente C++** | `HWContainer` (module `HybeliorWorld`) |
| **BlueprintGuid** | `6E6BFD70-4A7E-CFAA-D453-EAAFD062FD18` |
| **Classe générée** | `BP_Container_C` |

### Composants

| Nom | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine |
| `ClosedSupplyPod` (×2 instances) | `StaticMeshComponent` | Mesh du container (fermé + ouvert ou LOD) |
| `SphereCollision` (×2 instances) | `SphereComponent` | Zone d'interaction sphérique |

### Graphes

| Graphe | Rôle |
|---|---|
| `EventGraph` | Logique principale + logique matériaux |
| `UserConstructionScript` | Vide |
| `Interact` | Override de `HWContainer::Interact` |
| `ContainerOpened` | Override de `HWContainer::ContainerOpened` |
| `ContainerClosed` | Override de `HWContainer::ContainerClosed` |

### Logique d'interaction

```
[Event HWContainer::Interact]    ← GUID: 3DA22B56-4E4C-EB8D-CA29-818ACD1ABCF3 (pour ContainerOpened)
  └─> IsContainerOpened()
        ├─ false → ContainerOpened()   [ouvre]
        └─ true  → ContainerClosed()  [ferme]

[Event HWContainer::ContainerOpened]
  └─> SetMaterial(ClosedSupplyPod, ElementIndex=2, Material=None)
      [Switch Has Authority → Remote:
        ├─ SetMaterial(ClosedSupplyPod, index=2, Material=matériau_ouvert)]

[Event HWContainer::ContainerClosed]
  └─> SetMaterial(ClosedSupplyPod, ElementIndex=X, Material=matériau_fermé)
```

**Commentaires de nodes** :
- `"On Interact - If the Supply Pod is Closed, then Open it"` (ligne 132)
- `"When the Container is Opened or Closed, then Change the Material"` (ligne 143)

**Macro réseau** :
- Utilise le macro `Switch Has Authority` (Engine/EditorBlueprintResources/ActorMacros) pour différencier le comportement Authority vs Remote.
- `MacroInstance_0`, `MacroInstance_1`, `MacroInstance_2` → trois vérifications d'autorité dans le graph.

**Effets visuels** :
- Comme BP_SupplyPod01, l'état est exprimé via `SetMaterial`. L'index de slot `2` sur `ClosedSupplyPod` reçoit un matériau `None` à l'ouverture — probablement pour révéler un slot transparent ou un mesh intérieur.

**GUIDs des fonctions overridées** :
| Fonction | GUID |
|---|---|
| `ContainerOpened` | `3DA22B56-4E4C-EB8D-CA29-818ACD1ABCF3` |
| `ContainerClosed` | `6983F028-4B25-5309-BA75-B69E9CD67B0E` |

---

## 6. HubWorldContentManager

| Champ | Valeur |
|---|---|
| **Chemin asset** | `/Game/Interaction/HubWorldContentManager` |
| **Classe parente C++** | `DynamicContentManager` (module `HybeliorWorld`) |
| **BlueprintGuid** | `2622439E-4146-7A19-D88C-258DFA3D1BAB` |
| **Classe générée** | `HubWorldContentManager_C` |

### Composants

| Nom | Type | Rôle |
|---|---|---|
| `DefaultSceneRoot` | `SceneComponent` | Racine uniquement |

### Graphes

| Graphe | Rôle |
|---|---|
| `EventGraph` | Uniquement des events désactivés |
| `UserConstructionScript` | Vide |

### Logique

```
[Event ReceiveBeginPlay]       ← DÉSACTIVÉ
[Event ReceiveActorBeginOverlap] ← DÉSACTIVÉ  
[Event ReceiveTick]            ← DÉSACTIVÉ
```

**Le Blueprint est entièrement délégué au C++** : `DynamicContentManager` gère la spawning du contenu dynamique dans le Hub World sans aucune logique Blueprint active. Le BP sert uniquement de wrapper pour configurer l'acteur via les propriétés exposées de la classe C++ dans l'éditeur.

### Notes

- Pas de variables Blueprint déclarées.
- `DynamicContentManager` est probablement en charge de lire `DT_InteractablesToSpawn` et de spawner les acteurs correspondants selon la configuration serveur OWS.

---

## 7. DT_InteractablesToSpawn

| Champ | Valeur |
|---|---|
| **Chemin asset** | `/Game/Interaction/DT_InteractablesToSpawn` |
| **Type** | `DataTable` |

Ce DataTable définit la liste des interactables à spawner dynamiquement (probablement utilisé par `HubWorldContentManager`/`DynamicContentManager`). La structure de ligne (RowStruct) n'a pas été extraite dans cette session — une analyse complémentaire via `get_assets_by_path` avec inspection du DataTable serait nécessaire.

---

## 8. Hiérarchie des classes C++ parentes

```
AActor
├── HWPortal
│   └── BP_BoxPortal_C          (portail de voyage immédiat par overlap)
│
├── HWDoor                       (probablement : HWContainer + logique porte)
│   └── BP_DoorPortal_C         (porte-portail avec Timeline + RPC)
│
├── HWContainer                  (interface Interact + états ouvert/fermé)
│   ├── BP_Door_C               (porte standard avec Timeline + RPC)
│   └── BP_Container_C          (conteneur / coffre avec SetMaterial)
│
├── SupplyPod                    (variante de conteneur supply)
│   └── BP_SupplyPod01_C        (pod ravitaillement avec SetMaterial)
│
└── DynamicContentManager
    └── HubWorldContentManager_C (gestionnaire de spawn Hub)
```

---

## Synthèse des patterns d'interaction

| Pattern | Utilisé par | Mécanisme |
|---|---|---|
| **Overlap automatique** | BP_BoxPortal | `OnComponentBeginOverlap` → `TravelThroughPortal()` C++ |
| **Interact() explicite** | BP_Door, BP_Container, BP_SupplyPod01 | Event C++ `Interact` → branchement ouvert/fermé |
| **Timeline d'animation** | BP_DoorPortal, BP_Door | `Lerp + SetRelativeRotation(Cube)` sur battants |
| **SetMaterial visuel** | BP_SupplyPod01, BP_Container | Swap de slot matériau (pas de mesh swap) |
| **RPC réseau** | BP_DoorPortal, BP_Door | `RPC_MovePlayer` (NetMulticast, FunctionFlags=203555008) |
| **Switch Has Authority** | BP_DoorPortal, BP_Container | Macro Engine pour logique serveur/client différenciée |
| **Délégation C++ totale** | BP_BoxPortal, HubWorldContentManager | BP sans logique propre |

---

## Variables d'état clés par classe

| Variable | Type | Blueprint(s) | Source |
|---|---|---|---|
| `bIsCurrentlyOpen` | `bool` | BP_DoorPortal, BP_Door | Héritée C++ (`HWContainer`/`HWDoor`) |
| `Box` | `BoxComponent` | BP_DoorPortal, BP_Door | Composant BP |
| `Cube` | `StaticMeshComponent` | BP_DoorPortal, BP_Door | Composant BP (battants de porte) |
| `ClosedSupplyPod` | `StaticMeshComponent` | BP_SupplyPod01, BP_Container | Composant BP |
| `SphereCollision` | `SphereComponent` | BP_SupplyPod01, BP_Container | Composant BP |
| `New Location` *(orpheline)* | `FVector` | BP_DoorPortal, BP_Door | Variable BP (ExposedOnSpawn, erreur compile) |
| `New Rotation` *(orpheline)* | `FRotator` | BP_DoorPortal, BP_Door | Variable BP (ExposedOnSpawn, erreur compile) |

---

## Points d'attention et dette technique

1. **Variables orphelines** (`New Location`, `New Rotation`) dans BP_DoorPortal et BP_Door : les nodes `K2Node_VariableGet` pointent vers des variables supprimées (ErrorType=1). Le RPC `RPC_MovePlayer` qui les utilise risque de mal compiler. À résoudre ou à migrer complètement en C++.

2. **BP_DoorPortal hérite de `HWDoor` mais appelle `HWContainer::IsContainerOpened/CustomEvent`** : confusion dans la hiérarchie — `HWDoor` est probablement une sous-classe de `HWContainer`. À confirmer.

3. **SetMaterial avec `Material=None`** (BP_Container, ElementIndex=2) : assignation d'un matériau null peut causer des artefacts visuels si le slot n'a pas de fallback.

4. **`HubWorldContentManager`** entièrement vide en BP : s'assurer que `DynamicContentManager::BeginPlay` C++ est bien implémenté et référence `DT_InteractablesToSpawn`.

5. **Doublons de composants** (`Box×2`, `Cube×2`, `SphereCollision×2`, `ClosedSupplyPod×2`) : l'analyse via SubobjectData retourne des instances en double — peut refléter une instance de template + instance CDO, ou un vrai doublon à investiguer dans l'éditeur.
