---
tags: [implementation, ue5, ows, global-data, microservice]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [renommage-XPMultiplier]
implements: ["Migration Accord"]
---

# Global Data Service

> [!warning] DETTE TECHNIQUE — voir [[Migration Accord]]
> La clé `XPMultiplier` (multiplicateur d'XP serveur) doit être renommée à terme **`EraAccordMultiplier`** pour refléter la refonte. Pas de breaking change immédiat — la clé reste lisible en V3.

> Microservice OWSGlobalData : stockage cle/valeur partage a l'echelle du serveur. ASP.NET Core 6.0 + Dapper. Source : `OWS/src/OWSGlobalData/`.

## Architecture et pile technologique

```
OWSGlobalData
├── ASP.NET Core 6.0 (Web API)
├── SimpleInjector (IoC)
├── Dapper (acces BDD leger)
├── IMemoryCache (cache in-process, TTL 5 min)
├── Serilog (console + Elasticsearch)
├── Swashbuckle / Swagger UI
└── OWSData.dll (modeles partages + interfaces)
```

Microservice **sans etat** (stateless) sauf cache memoire en process. Conteneurise via Docker (image `mcr.microsoft.com/dotnet/aspnet:6.0`, Linux).

## Configuration et demarrage

Demarrage dans `Program.cs` via `IHostBuilder` avec Serilog bootstrap. `Startup.cs` orchestre SimpleInjector.

### `appsettings.json`

```json
{
  "OWSStorageConfig": {
    "OWSDBBackend": "mssql",
    "OWSDBConnectionString": "Server=host.docker.internal;Database=OpenWorldServer;..."
  },
  "OWSAPIPathConfig": {
    "InternalPublicApiURL": "http://host.docker.internal:44302/",
    "InternalInstanceManagementApiURL": "http://host.docker.internal:44328/",
    "InternalCharacterPersistenceApiURL": "http://host.docker.internal:44323/"
  },
  "RabbitMQOptions": {
    "RabbitMQHostName": "host.docker.internal",
    "RabbitMQPort": 5672
  }
}
```

En developpement : `https://localhost:7171` / `http://localhost:5171`. En Docker : ports 80/443.

## Modele de donnees

Table `GlobalData` — dictionnaire cle/valeur scope par tenant :

```csharp
public partial class GlobalData
{
    public Guid   CustomerGuid     { get; set; }  // Tenant (partition)
    public string GlobalDataKey    { get; set; }  // Cle unique par tenant
    public string GlobalDataValue  { get; set; }  // Valeur textuelle
}
```

**PK effective** : `(CustomerGuid, GlobalDataKey)`.

### Requetes SQL (GenericQueries.cs)

```sql
-- Lecture
SELECT CustomerGUID, GlobalDataKey, GlobalDataValue
FROM GlobalData GD
WHERE GD.CustomerGUID = @CustomerGUID
  AND GD.GlobalDataKey = @GlobalDataKey

-- Insertion
INSERT INTO GlobalData (CustomerGUID, GlobalDataKey, GlobalDataValue)
VALUES (@CustomerGUID, @GlobalDataKey, @GlobalDataValue)

-- Mise a jour
UPDATE GlobalData
SET GlobalDataValue = @GlobalDataValue
WHERE CustomerGUID = @CustomerGUID
  AND GlobalDataKey = @GlobalDataKey
```

`GlobalDataValue` est une chaine sans contrainte de format — JSON, entier, date ISO 8601, ou tout format textuel.

## Couche de persistance — multi-backend

| Backend (`OWSDBBackend`) | Implementation |
|---|---|
| `mssql` (defaut) | `OWSData.Repositories.Implementations.MSSQL.GlobalDataRepository` |
| `postgres` | `OWSData.Repositories.Implementations.Postgres.GlobalDataRepository` |
| `mysql` | `OWSData.Repositories.Implementations.MySQL.GlobalDataRepository` |

L'implementation MSSQL inclut un **cache memoire** 5 min absent des implementations Postgres et MySQL.

## API REST — Endpoints

Base : `http://<host>/api/GlobalData`

| Methode | Route | Corps | Retour | Description |
|---|---|---|---|---|
| `POST` | `/AddOrUpdateGlobalDataItem` | `{ GlobalDataKey, GlobalDataValue }` | `{ Success, ErrorMessage }` | Upsert atomique |
| `GET` | `/GetGlobalDataItem/{globalDataKey}` | cle dans URL | `{ CustomerGuid, GlobalDataKey, GlobalDataValue }` | Lecture par cle |

**Endpoint systeme (non authentifie)** :

| Methode | Route | Retour | Description |
|---|---|---|---|
| `GET` | `/api/System/Status` | `true` | Health check |

Format reponse d'ecriture :
```json
{ "Success": true, "ErrorMessage": "" }
```

Swagger UI : `/swagger`.

## Mecanisme de cache

Repository MSSQL utilise `IMemoryCache` :

- **TTL** : 5 minutes par entree
- **Cle cache** : `GlobalData_{CustomerGuid}_{GlobalDataKey}`
- **Invalidation** : automatique apres `AddOrUpdateGlobalData` via `_cache.Remove(cacheKey)`
- **Strategie** : cache-aside (lecture cache → BDD si absent)

> **Attention** : cache local au processus. En multi-instance (plusieurs pods Docker), caches non partages. Modification sur un pod peut ne pas etre visible sur un autre pendant jusqu'a 5 minutes. Voir [[Global Data Replication]] pour les solutions.

## Authentification

Toutes requetes (sauf `/api/System/Status`) requierent :

```
X-CustomerGUID: <votre-customer-guid>
```

Le middleware `StoreCustomerGUIDMiddleware` intercepte, extrait et propage via `IHeaderCustomerGUID`. GUID vide/absent : `401 Unauthorized`.

## Cas d'usage HybeliorWorld

Tableau de bord partage pour valeurs d'etat globales lisibles par tout client ou microservice.

### Heure mondiale

```
Cle    : "WorldTime"
Valeur : "{"day":142,"hour":14,"minute":37,"season":"Autumn"}"
```

Timer serveur ecrit periodiquement. Clients lisent au demarrage de zone + refresh periodique.

### Evenements serveur

```
Cle    : "ActiveEvent"
Valeur : "FestivalDesLanternesDeSel"

# Ou multi-evenements
Cle    : "ServerEvents"
Valeur : "[\"FestivalLanterne\",\"GuerreDeClans\",\"MeteoTempete\"]"
```

### Flags de maintenance

```
Cle    : "MaintenanceMode"
Valeur : "true"

Cle    : "MaintenanceMessage"
Valeur : "Maintenance prevue dans 30 minutes. Sauvegarde automatique en cours."
```

Client UE5 verifie le flag a la connexion → bandeau d'avertissement ou blocage acces.

### Parametres gameplay dynamiques

```
Cle    : "XPMultiplier"          → "2.0"
Cle    : "GlobalDropRateBonus"   → "1.5"
```

### Saison et meteo globale

```
Cle    : "CurrentSeason"         → "Winter"
Cle    : "GlobalWeatherOverride" → "Blizzard"
```

## Exemples HTTP depuis UE5

**Lecture** :
```
GET /api/GlobalData/GetGlobalDataItem/WorldTime
Headers: X-CustomerGUID: {votre-guid}

Reponse:
{
  "customerGuid": "...",
  "globalDataKey": "WorldTime",
  "globalDataValue": "{\"day\":142,\"hour\":14,\"minute\":37}"
}
```

**Ecriture (World Server UE5)** :
```
POST /api/GlobalData/AddOrUpdateGlobalDataItem
Headers: X-CustomerGUID: {votre-guid}
Body: { "globalDataKey": "WorldTime", "globalDataValue": "{\"day\":142,\"hour\":14,\"minute\":38}" }
```

## Voir aussi

- [[SQL Global Data]] — table `GlobalData` (CustomerGUID, GlobalDataKey, GlobalDataValue) ciblee par Dapper
- [[Global Data Replication]] — console OWSManagement + limites cache `IMemoryCache` multi-instance
- [[OWS Player Controller Component]] — `UOWSAPISubsystem::GetGlobalDataItem` / `AddOrUpdateGlobalDataItem` + `AOWSGameMode` (consommateurs UE5)
- [[OWS Architecture]] — place du service dans l'architecture 4 microservices + `X-CustomerGUID`
- [[SQL Users]] — `Customers.CustomerGUID` partitionne toutes les cles GlobalData (multi-tenant)
- [[Docker]] — image `mcr.microsoft.com/dotnet/aspnet:6.0` conteneurisee
- [[Kubernetes]] — deploiement multi-pod (expose probleme du cache non distribue)
