---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MCPPluginDetail

> Plugin UnrealMCP (HybeliorWorld) — serveur HTTP embarque dans l'editeur UE5 sur le port 3001 pour outils externes (agents IA, scripts Python).

Source : `Plugins/UnrealMCP/Source/`.

## Vue d'ensemble

UnrealMCP est un plugin HybeliorWorld qui embarque un serveur HTTP sur le port **3001** au demarrage de l'editeur. Permet a des agents IA ou clients HTTP de :

- Verifier l'etat de l'editeur
- Lire les logs en temps reel
- Declencher une compilation Live Coding
- Manipuler des Blueprints (graphes, noeuds, connexions, variables, compilation)

Le serveur demarre via `StartupModule()` et s'arrete via `ShutdownModule()`.

## FUnrealMCPModule — Serveur HTTP embarque

Fichiers : `UnrealMCPModule.h / UnrealMCPModule.cpp`. Base : `IModuleInterface`. Port : **3001** (constante `MCP_PORT`).

**Membres prives** : `Router` (TSharedPtr<IHttpRouter>), `RouteHandles` (TArray<FHttpRouteHandle>), `bServerRunning`, `LogBuffer` (TArray<FString>, max 2000), `LogLock` (FCriticalSection), `MaxLogLines` constexpr 2000.

**Cycle de vie** :

| Methode | Description |
|---|---|
| `StartupModule()` | Cree `FMCPLogDevice`, l'enregistre dans `GLog`, demarre le serveur HTTP |
| `ShutdownModule()` | Arrete serveur, retire `FMCPLogDevice` de `GLog` |
| `StartHttpServer()` | Obtient routeur sur port 3001, enregistre les 4 routes, `StartAllListeners()` |
| `StopHttpServer()` | Deregistre routes, vide `RouteHandles` |

**Helpers internes** : `SendJson(OnComplete, Data, bSuccess)`, `SendError(OnComplete, Error)`, `ParseBody(Request)`.

## Routes HTTP exposees

### GET /status

Verifier etat editeur/plugin. Reponse :
```json
{
  "status": "connected",
  "server": "UnrealMCP C++ Plugin",
  "port": 3001,
  "engine": "UE 5.4",
  "blueprint_tools": true,
  "log_capture": true,
  "livecoding": true
}
```

### GET /log

Lit derniers logs. Parametre `?lines=N` (defaut 100, max 2000). Format ligne : `[Categorie][Verbosity] Message`.

Reponse :
```json
{
  "success": true,
  "total_captured": 1547,
  "returned": 100,
  "lines": ["[LogTemp][Display] Message...", "[OWS][Warning] ..."]
}
```

### POST /livecoding

Execute `LiveCoding.Compile` via `GEngine->Exec()` sur Game Thread. Corps vide. Reponse succes : `{"success": true, "message": "Live Coding compile triggered"}`. Reponse erreur : `{"success": false, "error": "No world available for console command"}`.

### POST /bp

Action sur un Blueprint. Corps : JSON avec `"action"` et `"blueprint"` (chemin content). Timeout Game Thread 30s.

**Actions disponibles** :

| Action | Champs requis | Description |
|---|---|---|
| `list_graphs` | blueprint | Liste graphes avec nombre de noeuds |
| `list_nodes` | blueprint, graph | Liste noeuds d'un graphe avec pins |
| `add_node` | blueprint, graph, node_type, x, y | Ajoute noeud |
| `delete_node` | blueprint, graph, node_id | Supprime par GUID ou titre |
| `connect` | blueprint, graph, source_node, source_pin, target_node, target_pin | Connecte deux pins |
| `disconnect` | blueprint, graph, node_id, pin_name | Deconnecte liaisons d'un pin |
| `set_default` | blueprint, graph, node_id, pin_name, value | Valeur par defaut pin |
| `add_variable` | blueprint, var_name, var_type, is_array (opt) | Ajoute variable |
| `remove_variable` | blueprint, var_name | Supprime variable |
| `list_variables` | blueprint | Liste avec type, defaut, flags |
| `compile` | blueprint | Compile |
| `add_event` | blueprint, graph, event_name, x, y | Ajoute CustomEvent |
| `add_function` | blueprint, function_name | Cree graphe de fonction |
| `delete_function` | blueprint, graph | Supprime (pas EventGraph) |
| `rename_asset` | source, dest | Renomme asset |
| `rename_directory` | source, dest | Renomme repertoire |

**Types de noeuds supportes par `add_node`** : `CallFunction`, `VariableGet`, `VariableSet`, `Branch`, `Self`, `CustomEvent`, `DynamicCast`, `SpawnActor`, ou toute classe K2Node.

**Types de variables supportes** : `bool`, `int`, `float`, `string`, `text`, `name`, `vector`, `rotator`, `transform`, ou chemin de classe UObject.

**Format noeud dans reponses** :
```json
{
  "id": "GUID", "title": "...", "class": "K2Node_CallFunction",
  "comment": "", "x": 400, "y": 200,
  "pins": [{
    "name": "execute", "display_name": "", "type": "exec",
    "sub_type": "", "direction": "input", "default_value": "",
    "connected": true,
    "linked_to": [{"node_id": "...", "pin_name": "..."}]
  }]
}
```

## FMCPLogDevice — Capture des logs

Defini dans `UnrealMCPModule.cpp` (classe interne). Base : `FOutputDevice`.

```cpp
class FMCPLogDevice : public FOutputDevice {
    TArray<FString>& Buffer;
    FCriticalSection& Lock;
    int32 MaxLines;
    virtual void Serialize(const TCHAR* V, ELogVerbosity::Type, const FName& Category) override;
};
```

**Comportement** : enregistre dans `GLog` via `GLog->AddOutputDevice(GLogDevice.Get())`, intercepte tous les messages. Format : `[Categorie][Verbosity] Message`. Buffer circulaire (max 2000 lignes). Thread-safe via `FScopeLock`.

Instance globale : `static TUniquePtr<FMCPLogDevice> GLogDevice`.

## FMCPBlueprintTools

Fichiers : `MCPBlueprintTools.h / MCPBlueprintTools.cpp`. Classe statique (pas de UCLASS). Centralise toute la logique de manipulation du graphe BP via les API editeur (Kismet2, EdGraph, K2Nodes). Toutes methodes sur Game Thread.

**Point d'entree unique** :
```cpp
static TSharedPtr<FJsonObject> Dispatch(const FString& Action, const TSharedPtr<FJsonObject>& Params);
```

Dispatche vers la bonne methode privee, charge le BP via `LoadBP(BPPath)`. Les actions `rename_asset`/`rename_directory` ne necessitent pas de BP.

**Methodes d'action** :

| Methode | Description |
|---|---|
| `ListGraphs(BP)` | Itere `UbergraphPages`, `FunctionGraphs`, `MacroGraphs` |
| `ListNodes(BP, GraphName)` | Itere `Graph->Nodes`, `NodeToJson` chacun |
| `AddNode(BP, GraphName, Params)` | Cree noeud, `CreateNewGuid`, `AllocateDefaultPins`, `AddNode`, `MarkBlueprintAsModified` |
| `DeleteNode(BP, GraphName, NodeId)` | `Graph->RemoveNode` |
| `ConnectPins(BP, Params)` | `Schema->TryCreateConnection` |
| `DisconnectPin(BP, Params)` | `Pin->BreakAllPinLinks()` |
| `SetPinDefault(BP, Params)` | `Schema->TrySetDefaultValue` |
| `AddVariable(BP, Params)` | `FEdGraphPinType`, supporte struct, tableau, objet. `FBlueprintEditorUtils::AddMemberVariable` |
| `RemoveVariable(BP, VarName)` | `FBlueprintEditorUtils::RemoveMemberVariable` |
| `ListVariables(BP)` | Itere `BP->NewVariables` |
| `CompileBP(BP)` | `FKismetEditorUtilities::CompileBlueprint`. Status : `up_to_date`, `error`, `dirty` |
| `AddEventNode(BP, GraphName, Params)` | `UK2Node_CustomEvent` |
| `AddFunctionGraph(BP, FuncName)` | `FBlueprintEditorUtils::CreateNewGraph` |
| `DeleteFunctionGraph(BP, GraphName)` | Verifie dans `FunctionGraphs` (pas EventGraph). `RemoveGraph` |
| `RenameAsset(Params)` | `IAssetTools::RenameAssets` |
| `RenameDirectory(Params)` | Renomme via `IAssetTools` |

**Helpers** : `LoadBP(Path)` via `LoadObject<UBlueprint>`, `FindGraph(BP, GraphName)`, `FindNodeById(Graph, NodeId)` (GUID ou titre fallback), `FindPin(Node, PinName, Direction)`, `NodeToJson`, `PinToJson`, `MakeResult(bSuccess, Message)`.

## Dispatch sur Game Thread

```cpp
static TSharedPtr<FJsonObject> RunOnGameThread(TFunction<TSharedPtr<FJsonObject>()> Func)
```

Si sur Game Thread : execute direct. Sinon : poste via `AsyncTask(ENamedThreads::GameThread)`, attend `FEvent` avec timeout 30s. Si timeout : `{"success": false, "error": "Game thread timeout"}`.

Necessaire car le serveur HTTP UE5 traite les requetes sur thread pool, alors que la manipulation BP doit etre sur Game Thread.

## Integration dans HybeliorWorld

UnrealMCP permet a Claude Code (via le plugin MCP editeur configure) de piloter les BP restants non encore migres en C++. OWSPlugin et UnrealMCP fonctionnent en tandem.

## Voir aussi

- [[OWS Architecture]] — positionne UnrealMCP comme outil transverse éditeur/agents IA complémentaire aux 4 microservices .NET du backend OWS.
- [[OWS Player Controller Component]] — `OWSPlugin` (LoadingPhase PreDefault) et `UnrealMCP` (LoadingPhase PostEngineInit, Editor-only) cohabitent dans `Plugins/` ; les BP restants pilotés via `/bp/*` incluent `BP_PlayerController`/`BP_HybeliorGameMode` qui héritent des classes C++ décrites dans ce hub.
- [[Instance Launcher]] — les compilations Live Coding déclenchées via `POST /livecoding` (route `FUnrealMCPModule`) permettent de recompiler les builds de zone server avant relance par le launcher.
- [[OWS Tests]] — le pipeline de tests xUnit OWS ne couvre pas UnrealMCP (plugin UE, pas .NET), mais `rename_asset`/`rename_directory` exposés ici restent validables manuellement via les 17 tests OWSShared.
