---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# InstanceLauncherOps

> Aspects operationnels de l'OWSInstanceLauncher : queues RabbitMQ, health monitoring, securite, logs, flux complet. Voir [[Instance Launcher]] pour la config et les services.

## Consommation des queues RabbitMQ

### Initialisation (`InitRabbitMQ`)

```csharp
var factory = new ConnectionFactory {
    HostName = ..., Port = ...,
    UserName = ..., Password = ...,
    DispatchConsumersAsync = true
};
connection = factory.CreateConnection();
```

Deux canaux (channels) sur la meme connexion.

### Canal ServerSpinUp

| Propriete | Valeur |
|---|---|
| Exchange | `ows.serverspinup` |
| Type | `direct` |
| Durabilite | `durable: false` |
| Auto-delete | `false` |
| Nom queue | GUID genere a l'execution |
| Queue exclusive | `true` |
| Queue auto-delete | `true` |
| Routing key | `ows.serverspinup.{worldServerId}` |
| QoS prefetch | 1 message |

### Canal ServerShutDown

Meme config mais exchange `ows.servershutdown` et routing key `ows.servershutdown.{worldServerId}`.

La routing key utilise le `WorldServerID` : chaque launcher ne recoit que les messages qui lui sont destines, isolant les machines.

## Structure des messages

### `MQSpinUpServerMessage`

```csharp
public class MQSpinUpServerMessage {
    public Guid   CustomerGUID { get; set; }    // Cle de securite
    public int    WorldServerID { get; set; }    // ID de ce launcher
    public int    ZoneInstanceID { get; set; }   // ID instance a demarrer
    public string MapName { get; set; }          // Ex: "Zone_Forest"
    public int    Port { get; set; }             // Port UDP
}
```

### `MQShutDownServerMessage`

```csharp
public class MQShutDownServerMessage {
    public Guid CustomerGUID { get; set; }
    public int  WorldServerID { get; set; }
    public int  ZoneInstanceID { get; set; }
}
```

Serialisation : JSON UTF-8 via `System.Text.Json`.

## Acquittement et evenements

Les deux consumers utilisent `autoAck: true`. Les messages sont acquittes des reception, **avant** le lancement/arret effectif du processus. Pas de requeue en cas d'echec.

Quatre evenements par canal sont abonnes sans comportement (retournent `Task.CompletedTask`) : `Shutdown`, `Registered`, `Unregistered`, `ConsumerCancelled`. `ConnectionShutdown` abonne mais vide.

## Health Monitoring

### Comportement `ServerLauncherHealthMonitoring`

Declenche periodiquement (`RunServerHealthMonitoringFrequencyInSeconds`, defaut 30s) :

```
DoWork()
    1. GetWorldServerID()
       └─ Si < 1 : Log.Warning + return
    2. GetZoneInstancesForWorldServer(worldServerID)
       → POST api/Instance/GetZoneInstancesForWorldServer
       → List<GetZoneInstancesForWorldServer>
    3. Pour chaque instance :
       └─ Si LastServerEmptyDate < DateTime.Now - MinutesToShutdownAfterEmpty
          → [bloc vide — non implemente]
```

La logique d'arret automatique des zones vides est **non implementee** (bloc `if` vide). La condition est calculee mais aucune action n'est effectuee.

### Modele `GetZoneInstancesForWorldServer`

Defini dans `OWSData.Models.StoredProcs`. Contient au minimum :
- `LastServerEmptyDate` (DateTime) — derniere date vide
- `MinutesToShutdownAfterEmpty` (int) — delai de grace

## Securite — validation RabbitMQ

### Verification CustomerGUID

Chaque message (SpinUp/ShutDown) contient un champ `CustomerGUID`. Comparaison avant toute action :

```csharp
if (_customerGUID != customerGUID) {
    Log.Error("HandleServerSpinUpMessage - Incoming CustomerGUID does not match OWSAPIKey in appsettings.json");
    return;   // Action annulee silencieusement
}
```

**Seule couche de securite** sur les messages RabbitMQ. Protege contre les messages mal routes ou d'un autre tenant partageant le meme broker.

### Isolation par routing key

Queue liee avec `ows.serverspinup.{worldServerId}`. Un message destine a un autre launcher ne sera jamais livre.

### Authentification HTTP vers l'API

Headers d'identification sur les appels vers `OWSInstanceManagement` :
- `X-CustomerGUID` : configure globalement sur le `HttpClient` nomme `OWSInstanceManagement`
- `X-LauncherGUID` : ajoute manuellement sur `StartInstanceLauncher` et `ShutDownInstanceLauncher`

### Points d'attention

- Queues `durable: false` : ne survivent pas a un redemarrage du broker. Messages en transit perdus.
- `autoAck: true` : message considere traite des reception, meme si le lancement echoue (pas de requeue).
- Pas de chiffrement des messages (pas de TLS).
- Interface web Razor Pages (port 8181) sans authentification ; vide mais surface exposee.

## Gestion des erreurs et logs

### Framework — Serilog

| Parametre | Valeur |
|---|---|
| Niveau minimum | `Debug` |
| Surcharge Microsoft | `Information` |
| Sinks | Console + DurableHttpUsingFileSizeRolledBuffers |
| Enrichers | `FromLogContext`, `WithExceptionDetails`, `WithMachineName`, `WithCorrelationId` |
| Propriete applicative | `Application: "OWSInstanceLauncher"` |
| Sink HTTP | `http://localhost:50000` (Elasticsearch JSON format, bufferise) |

### Inventaire des evenements logues

| Niveau | Evenement |
|---|---|
| Info | Demarrage, verif appsettings, enregistrement launcher (LauncherGUID), succes, connexion RabbitMQ |
| Info | Reception SpinUp/ShutDown, demarrage serveur (customerGUID : worldServerID : mapName : port), serveur demarre, arret instances, arret launcher |
| Warning | Health monitoring en attente d'un WorldServerID valide |
| Error | OWSAPIKey vide, PathToDedicatedServer vide ou introuvable, .uproject introuvable, echec enregistrement, connexion RabbitMQ echouee, CustomerGUID invalide, erreur API Instance Management |
| Fatal | Erreur de demarrage → `Environment.Exit(-1)` |

### Gestion des exceptions

- `InitRabbitMQ` : exception de connexion capturee, loguee, methode retournee (continue sans RabbitMQ)
- `RegisterInstanceLauncherRequest` / `StartInstanceLauncherRequest` : `Log.Error`, retour -1
- `TimedHostedService.DoWork()` : exceptions capturees **silencieusement** (catch vide)
- `Dispose()` : exceptions capturees silencieusement
- `HandleServerShutDownMessage` : si `Process.GetProcessById()` null ou exception (PID inexistant) : pas de protection explicite, potentiel `ArgumentException`

## Flux complet — diagramme de sequence

```
Demarrage OWSInstanceLauncher
    │
    ├─ Validation appsettings.json
    │      └─ Erreur → Exit(-1)
    │
    ├─ ServerLauncherMQListener (constructor)
    │      ├─ POST api/Instance/RegisterLauncher
    │      ├─ GET  api/Instance/StartInstanceLauncher → WorldServerID
    │      └─ InitRabbitMQ → 2 canaux lies a WorldServerID
    │
    └─ (en boucle) TimedHostedService<HealthMonitoring> toutes les 30s
               └─ POST api/Instance/GetZoneInstancesForWorldServer

Evenement : Orchestrateur publie SpinUp
    │
    RabbitMQ "ows.serverspinup" (routing: ows.serverspinup.{id})
    │
    └─ HandleServerSpinUpMessage()
           ├─ Verif CustomerGUID
           ├─ Construction arguments UE
           ├─ Process.Start(UE4Editor.exe / UEServer.exe)
           └─ ZoneServerProcessesRepository.Add(...)

Evenement : Orchestrateur publie ShutDown
    │
    RabbitMQ "ows.servershutdown" (routing: ows.servershutdown.{id})
    │
    └─ HandleServerShutDownMessage()
           ├─ Verif CustomerGUID
           ├─ FindZoneServerProcessId(zoneInstanceID) → PID
           └─ Process.GetProcessById(PID).Kill()

Arret OWSInstanceLauncher (SIGTERM / Ctrl+C)
    │
    └─ TimedHostedService.Dispose()
           └─ ServerLauncherMQListener.Dispose()
                  ├─ POST api/Instance/ShutDownInstanceLauncher (Wait)
                  ├─ Kill() toutes instances connues
                  └─ Fermeture canaux + connexion RabbitMQ
```

## Voir aussi

- [[Instance Launcher]] — config, DI SimpleInjector, cycle de demarrage et fichiers sources
- [[OWS Architecture]] — place du launcher dans le flux connexion (etape 5)
- [[SQL Maps Social]] — `GetZoneInstancesForWorldServer` lit `MapInstances.LastServerEmptyDate` + `Maps.MinutesToShutdownAfterEmpty`
- [[SQL Users]] — `Customers.CustomerGUID` = `OWSAPIKey` utilise pour la verif des messages RabbitMQ
- [[Docker]] — RabbitMQ + Kestrel 8181 dans le compose
- [[Kubernetes]] — isolation par routing key `ows.serverspinup.{worldServerId}` permet multi-noeud
- [[CI CD]] — build et deploiement du launcher
