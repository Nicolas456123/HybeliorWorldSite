---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InstanceLauncher

> Microservice OWSInstanceLauncher (ASP.NET Core 6/.NET 6) deploye sur chaque machine hebergeant des instances UE. Ecoute RabbitMQ et lance/tue des processus UE. Source : `OWS/src/OWSInstanceLauncher/`.

## Role

- **Ecouter** queues RabbitMQ `ServerSpinUp` et `ServerShutDown`
- **Lancer** un processus UE5/UE4 (serveur dedie ou editeur en mode serveur)
- **Tuer** le processus correspondant sur ShutDown
- **Monitorer** zones vides trop longtemps (voir [[Instance Launcher Ops]])
- **Se declarer** aupres de `OWSInstanceManagement` au demarrage

Il n'est **pas** responsable du routage des joueurs ni de la logique de jeu.

## Structure des fichiers

```
OWSInstanceLauncher/
├── Program.cs                        # Serilog, Kestrel port 8181
├── Startup.cs                        # DI, pipeline, validation config
├── OWSInstanceLauncher.csproj
├── appsettings.json                  # Configuration principale
├── Properties/launchSettings.json
├── Pages/                            # Razor Pages minimalistes
│   ├── Index.cshtml / .cs
│   ├── Home/Index.cshtml / .cs
│   ├── Error.cshtml / .cs
│   └── Shared/_Layout.cshtml
└── Services/
    ├── ServerLauncherMQListener.cs   # RabbitMQ + lancement/arret UE
    ├── ServerLauncherHealthMonitoring.cs
    ├── ServerLauncherShutDown.cs     # Stub vide
    └── TimedHostedService.cs         # Timer generique
```

## Couches et DI

Le projet utilise **SimpleInjector** v5.4 en complement du conteneur `IServiceCollection`.

| Enregistrement | Type | Duree de vie |
|---|---|---|
| `IZoneServerProcessesRepository` | `InMemory.ZoneServerProcessesRepository` | Singleton |
| `IOWSInstanceLauncherDataRepository` | `InMemory.OWSInstanceLauncherDataRepository` | Singleton |
| `IInstanceLauncherJob` | `ServerLauncherMQListener` | Singleton |
| `IServerHealthMonitoringJob` | `ServerLauncherHealthMonitoring` | Singleton |

Deux `TimedHostedService<T>` :

| Service | Intervalle | RunOnce | Role |
|---|---|---|---|
| `TimedHostedService<IInstanceLauncherJob>` | 10s (initial) | **true** | Lance `ServerLauncherMQListener.DoWork()` une seule fois (abonnement RabbitMQ) |
| `TimedHostedService<IServerHealthMonitoringJob>` | Configurable | **false** | Monitoring periodique |

## Configuration — appsettings.json

```json
{
  "RabbitMQOptions": {
    "RabbitMQHostName": "host.docker.internal",
    "RabbitMQPort": 5672,
    "RabbitMQUserName": "dev",
    "RabbitMQPassword": "test"
  },
  "OWSInstanceLauncherOptions": {
    "OWSAPIKey": "",
    "LauncherGuid": "",
    "ServerIP": "127.0.0.1",
    "MaxNumberOfInstances": 10,
    "InternalServerIP": "127.0.0.1",
    "StartingInstancePort": 7778,
    "IsServerEditor": true,
    "PathToDedicatedServer": "C:\\Program Files\\Epic Games\\UE_4.27\\Engine\\Binaries\\Win64\\UE4Editor.exe",
    "RunServerHealthMonitoringFrequencyInSeconds": 30,
    "PathToUProject": "C:\\OWS\\OpenWorldStarterPlugin\\OpenWorldStarter.uproject",
    "UseServerLog": true,
    "UseNoSteam": true,
    "OtherCustomFlags": ""
  },
  "OWSAPIPathConfig": {
    "InternalPublicApiURL": "http://localhost:44302/",
    "InternalInstanceManagementApiURL": "http://localhost:44328/",
    "InternalCharacterPersistenceApiURL": "http://localhost:44323/"
  },
  "Kestrel": { "Endpoints": { "Http": { "Url": "http://localhost:8181" } } }
}
```

### Parametres cles

| Parametre | Description | Obligatoire |
|---|---|---|
| `OWSAPIKey` | CustomerGUID, cle d'authentification + securite messages RabbitMQ | Oui |
| `LauncherGuid` | Unique par instance, genere auto au premier demarrage et persiste via `IWritableOptions` | Non (auto) |
| `ServerIP` / `InternalServerIP` | IP publique + IP interne LAN/Docker | Oui |
| `MaxNumberOfInstances` | Limite instances UE | Oui |
| `StartingInstancePort` | Port UDP de depart | Oui |
| `IsServerEditor` | Si true : exec `UnrealEditor.exe`, requiert `PathToUProject` | Oui |
| `PathToDedicatedServer` | Chemin exec UE, verifie `File.Exists` | Oui |
| `PathToUProject` | `.uproject` (si `IsServerEditor = true`) | Conditionnel |
| `RunServerHealthMonitoringFrequencyInSeconds` | Frequence monitoring | Oui |
| `UseServerLog` / `UseNoSteam` / `OtherCustomFlags` | Flags supplementaires de lancement UE | Non |

### Persistance du LauncherGuid

Gere via `IWritableOptions<OWSInstanceLauncherOptions>` (OWSShared). Si vide : `Guid.NewGuid()` genere et **reecrit dans `appsettings.json`** pour persistance.

## Cycle de demarrage

### Program.cs

```
Main()
  └─ ConfigurationBuilder (appsettings + env-specific)
  └─ Serilog.SelfLog → stderr
  └─ CreateHostBuilder (UseSerilog, UseUrls "http://*:8181", UseStartup<Startup>)
  └─ Build().Run()
  └─ finally: Log.CloseAndFlush()
```

### Validations dans Startup (constructor)

Chaine de verifications — toute erreur : `Environment.Exit(-1)`.

```
1. OWSAPIKey vide? → Error + Exit(-1)
2. PathToDedicatedServer vide? → Error + Exit(-1)
3. File.Exists(PathToDedicatedServer)? → non: Error + Exit(-1)
4. IsServerEditor (detection par nom d'exe)?
   ├─ Windows: contient "Editor.exe"
   ├─ macOS:   se termine par "UnrealEditor"
   └─ Linux:   se termine par "Editor"
   → Si editeur: PathToUProject doit matcher ^.*.uproject
     └─ File.Exists(PathToUProject)? → non: Error + Exit(-1)
```

### Enregistrement aupres de l'API

Dans `ServerLauncherMQListener` (constructor) :

1. `RegisterLauncher()` — POST `api/Instance/RegisterLauncher`
   - Body : `launcherGUID`, `ServerIP`, `MaxNumberOfInstances`, `InternalServerIP`, `StartingInstancePort`
   - Retourne 1 (ok) ou -1 (echec)
2. `GetWorldServerID()` — GET `api/Instance/StartInstanceLauncher`
   - Header `X-LauncherGUID`
   - Recoit un `int` : `WorldServerID` attribue par l'orchestrateur
   - Stocke dans `IOWSInstanceLauncherDataRepository`

## Lancement des processus UE (SpinUp)

### Construction arguments

```csharp
string serverArguments =
    (IsServerEditor ? "\"" + PathToUProject + "\" " : "")
    + "{0}?listen -server "
    + (UseServerLog ? "-log " : "")
    + (UseNoSteam  ? "-nosteam " : "")
    + "-port={1} "
    + "-zoneinstanceid={2}";
```

**Exemple editeur** : `"C:\OWS\OpenWorldStarter.uproject" Zone_Forest?listen -server -log -nosteam -port=7778 -zoneinstanceid=42`

**Exemple packaged** : `Zone_Forest?listen -server -log -nosteam -port=7778 -zoneinstanceid=42`

Conversion `Encoding.Default.GetString(Encoding.UTF8.GetBytes(...))` pour normaliser.

### Process.Start

```csharp
var proc = new Process {
    StartInfo = new ProcessStartInfo {
        FileName = PathToDedicatedServer,
        Arguments = <args>,
        UseShellExecute = false,
        RedirectStandardOutput = false,
        CreateNoWindow = false
    }
};
proc.Start();
```

`proc.WaitForInputIdle()` est commente : pas d'attente readiness avant de repondre. Enregistrement immediat dans `_zoneServerProcessesRepository.AddZoneServerProcess({ZoneInstanceId, MapName, Port, ProcessId=proc.Id, ProcessName})`.

## Arret des processus UE (ShutDown)

### Arret individuel

```
Message ShutDown recu
    └─ Verif CustomerGUID
    └─ FindZoneServerProcessId(zoneInstanceID)
         ├─ -1 → rien
         └─ > 0 → Process.GetProcessById(processId).Kill()  // SIGKILL immediat
```

Arret brutal, pas de tentative gracieuse prealable. L'entree n'est pas supprimee du repository apres kill.

### Arret global (Dispose)

```csharp
foreach (var zone in _zoneServerProcessesRepository.GetZoneServerProcesses())
    if (zone.ProcessId > 0)
        Process.GetProcessById(zone.ProcessId).Kill();
```

Sequence Dispose de `ServerLauncherMQListener` :

1. `ShutDownInstanceLauncherRequest(_worldServerId)` → POST `api/Instance/ShutDownInstanceLauncher` (synchrone)
2. `ShutDownAllZoneServerInstances()` → Kill() sur tous
3. `serverSpinUpChannel.Close()`
4. `serverShutDownChannel.Close()`
5. `connection.Close()`

`UpdateZoneServerStatusReady` (statut 2 = Ready) est definie mais **commentee** dans `HandleServerSpinUpMessage` — non appelee.

## Gestion des ProcessIDs

### `ZoneServerProcessesRepository` (InMemory)

```csharp
public class ZoneServerProcess {
    public int    ZoneInstanceId;
    public string MapName;
    public int    Port;
    public int    ProcessId;   // PID OS
    public string ProcessName;
}
```

| Methode | Description |
|---|---|
| `AddZoneServerProcess(process)` | Sans verif de doublon |
| `GetZoneServerProcesses()` | Liste complete |
| `FindZoneServerProcessId(zoneInstanceId)` | Cherche par ID, retourne PID ou -1 |

**Limite** : liste jamais purgee. Entrees de processus tues restent en memoire jusqu'au redemarrage. Si launcher redemarre : connaissance des processus anterieurs perdue.

### `OWSInstanceLauncherDataRepository` (InMemory)

Bus singleton stockant `WorldServerID` et `LauncherGuid` partages entre services.

## Reference fichiers sources

| Fichier | Role |
|---|---|
| `OWS/src/OWSInstanceLauncher/Program.cs` | Point d'entree, Serilog, Kestrel 8181 |
| `OWS/src/OWSInstanceLauncher/Startup.cs` | DI, validation, enregistrement |
| `OWS/src/OWSInstanceLauncher/appsettings.json` | Configuration |
| `OWS/src/OWSInstanceLauncher/Services/ServerLauncherMQListener.cs` | RabbitMQ + lancement/arret |
| `OWS/src/OWSInstanceLauncher/Services/ServerLauncherHealthMonitoring.cs` | Monitoring |
| `OWS/src/OWSInstanceLauncher/Services/TimedHostedService.cs` | Timer generique + RunOnce |
| `OWS/src/OWSShared/Messages/MQSpinUpServerMessage.cs` | DTO SpinUp |
| `OWS/src/OWSShared/Messages/MQShutDownServerMessage.cs` | DTO ShutDown |
| `OWS/src/OWSData/Repositories/Implementations/InMemory/ZoneServerProcessesRepository.cs` | Depot processus |

## Voir aussi

- [[Instance Launcher Ops]] — volet ops : queues RabbitMQ, health monitoring, securite, logs Serilog
- [[OWS Architecture]] — etape 5 du flux connexion (orchestrateur → launcher), vue microservices
- [[SQL Maps Social]] — tables `WorldServers`, `MapInstances` lues/ecrites via `api/Instance/*` (RegisterLauncher, StartInstanceLauncher, SpinUp, ShutDown)
- [[OWS Player Controller Component]] — consommateur cote UE5 (`GetZoneServerToTravelTo`, `LaunchZoneInstance`) declencheur indirect du SpinUp
- [[Docker]] — integration RabbitMQ + Kestrel 8181 dans le compose
- [[Kubernetes]] — deploiement multi-machine (un launcher par noeud)
