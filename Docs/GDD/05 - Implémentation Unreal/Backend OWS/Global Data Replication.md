---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# GlobalDataReplication

> Console d'administration OWSManagement (ASP.NET Core 6 + SPA Vue.js 3). Flux de replication cache/donnees, interactions UE5, limites multi-instance. Source : `OWS/src/OWSManagement/`.

## Architecture OWSManagement

Hybride : backend ASP.NET Core 6.0 (API REST admin) + frontend SPA Vue.js 3 servi statiquement.

```
OWSManagement
├── Backend ASP.NET Core 6.0
│   ├── UsersController   (CRUD utilisateurs)
│   ├── SystemController  (health check)
│   ├── SimpleInjector    (IoC)
│   └── SpaStaticFiles    (sert le dist Vue.js depuis wwwroot/dist)
└── Frontend wwwroot/
    ├── Vue 3 + Vuetify 3 + TypeScript
    ├── Vite (bundler)
    ├── Vue Router 4 (SPA routing)
    └── Axios (client HTTP vers l'API backend)
```

En dev : SPA Vite proxy via `Microsoft.AspNetCore.SpaProxy`. En prod : `vite build` → `wwwroot/dist` servi par .NET.

## Backend — Startup.cs

- `services.AddSpaStaticFiles(options => options.RootPath = "wwwroot/dist")` : integration SPA
- `services.AddHttpClient("OWSPublicApi")` : client HTTP prefconfigure vers OWSPublicAPI avec header `X-CustomerGUID` depuis `OWSManagementOptions.OWSAPIKey`
- Deux repositories : `ICharactersRepository` et `IUsersRepository`
- Auth : header `X-CustomerGUID` (meme mecanique que les autres services)

### `appsettings.json`

```json
{
  "OWSManagementOptions": {
    "OWSAPIKey": ""
  },
  "OWSAPIPathConfig": {
    "InternalPublicApiURL": "http://localhost:44302/"
  },
  "OWSStorageConfig": {
    "OWSDBBackend": "mssql",
    "OWSDBConnectionString": "..."
  }
}
```

`OWSAPIKey` = CustomerGUID automatiquement ajoute aux requetes vers OWSPublicApi.

## Frontend — pile Vue.js

| Dependance | Version | Role |
|---|---|---|
| Vue 3 | ^3.2.47 | Framework reactif |
| Vuetify 3 | ^3.1.3 | Material Design |
| Vue Router 4 | ^4.1.6 | Navigation SPA |
| Axios | ^1.3.2 | Client HTTP |
| TypeScript | ^4.9.3 | Typage |
| Vite | ^4.1.0 | Bundler |

### `App.vue`

Layout deux colonnes :
- `v-navigation-drawer` : menu lateral (`SideNav.vue`)
- `v-app-bar` : barre superieure "OWS Management"
- `router-view` : contenu principal

### Menu (`SideNav.vue`)

| Section | Route | Icone | Etat |
|---|---|---|---|
| Dashboard | `/` | `mdi-view-dashboard` | Statique OWS |
| Users | `/users` | `mdi-account-box` | Fonctionnel (CRUD complet) |
| Characters | `/characters` | `mdi-account-group` | Interface, donnees non chargees |
| World Servers | `/worldservers` | `mdi-earth` | Interface, donnees non chargees |
| Zones | `/zones` | `mdi-map` | Interface, donnees non chargees |
| Zone Instances | `/zoneinstances` | `mdi-animation` | Interface, donnees non chargees |
| Global Data | `/globaldata` | `mdi-database` | Interface, donnees non chargees |
| Settings | `/settings` | `mdi-cog` | Non implemente |

## Composants Vue.js detailles

### `UsersGrid.vue` — seule section complete

- Chargement auto au `onMounted`
- Tableau pagine (5 par page) : Actions, First Name, Last Name, Email, Role
- **Edition** : dialog modal → `PUT /api/Users`
- **Ajout** : bascule vers `UsersAdd.vue`
- **Suppression** : dialog present, operation "not implemented yet"

### `UsersAdd.vue`

Validation cote client : `firstName`/`lastName` (obligatoires, max 20), `email` (regex RFC), `password` (min 6, non editable apres creation). POST `/api/Users`.

### `GlobalDataGrid.vue`

Interface **non connectee a l'API**. `data.rows` et `data.headers` reactifs mais vides, pas d'appel vers OWSGlobalData. Point d'extension pour un editeur visuel.

### `CharactersGrid.vue`, `WorldServersGrid.vue`, `ZonesGrid.vue`, `ZoneInstancesGrid.vue`

Tableau Vuetify avec headers + rows vides, sans appel API. Squelettes prets a cabler.

## Client API TypeScript

`owsApiClient.ts` encapsule Axios :

- `baseURL` configurable (par defaut `/api`)
- Header `X-CustomerGUID` vide cote frontend (configure cote backend via `OWSManagementOptions.OWSAPIKey`)
- Intercepteur reponses :
  - `401` → redirection `/`
  - `500` → alerte utilisateur
  - Timeout → redirection `/`
- Timeout global : 60s

`owsApi.ts` expose :
```typescript
getUsers()               // GET  /Users
addUser(data)            // POST /Users
updateUser(data)         // PUT  /Users
```

## Flux de communication UE5 ↔ GlobalData

```
[UE5 Client / World Server]
        | HTTP POST/GET + Header: X-CustomerGUID
        v
[OWSGlobalData :5171 / :443]
        | Dapper SQL
        v
[Base de donnees OpenWorldServer]
        | Cache 5 min (MSSQL uniquement)
        v
[IMemoryCache in-process]
```

## Replication entre zones — approche recommandee

Pour HybeliorWorld, designer un **World Server autoritaire** (zone hub ou processus dedie) responsable de la MAJ de l'heure mondiale. Les autres zones lisent cette valeur periodiquement.

```
[World Server Autoritaire - UE5]
  Timer 60s : ecriture de "WorldTime" dans GlobalData
        |
        v
[GlobalData DB / Cache]
        |
        v
[Toutes les zones UE5 connectees]
  Au BeginPlay et toutes les 5 minutes :
  lecture de "WorldTime" → synchronisation locale
```

**Evenements serveur globaux** : admin via OWSManagement (ou script) ecrit la cle `ServerEvents` → clients lisent a la connexion + interval regulier → GAS active des `GameplayEffects` selon la valeur.

**Maintenance planifiee** :
1. Admin ecrit `MaintenanceMode="true"` + `MaintenanceETA="2026-04-05T03:00:00Z"`
2. Client UE5 verifie au login
3. Si `true` : widget maintenance avec ETA
4. World Servers refusent nouvelles connexions joueurs (mais laissent passer admin)

## Securite multi-tenant

OWS utilise **multi-tenant par CustomerGUID** :

- Chaque requete porte `X-CustomerGUID` avec GUID valide
- Toutes les donnees en base partitionnees par `CustomerGUID` — un tenant ne peut jamais acceder aux donnees d'un autre
- `StoreCustomerGUIDMiddleware` valide avant chaque action
- GUID vide (`Guid.Empty`) : `401 Unauthorized` immediat

Pour HybeliorWorld : `CustomerGUID` = GUID unique de l'instance OWS du projet. Stocker securement cote UE5 (variable de config, non hardcode dans assets).

## Ports et URLs de reference

| Service | Dev local | Docker interne | Description |
|---|---|---|---|
| OWSGlobalData | `https://localhost:7171` / `http://localhost:5171` | 80/443 | API + Swagger |
| OWSManagement | `http://localhost:5205` | 80/443 | API admin + SPA |
| OWSPublicAPI | `http://localhost:44302/` | `http://host.docker.internal:44302/` | Public |
| OWSInstanceManagement | `http://host.docker.internal:44328/` | idem | Instances |
| OWSCharacterPersistence | `http://host.docker.internal:44323/` | idem | Perso |
| RabbitMQ | `localhost:5672` | `host.docker.internal:5672` | Broker |
| Serilog HTTP sink | `http://host.docker.internal:50000` | idem | Logs → ES |
| Swagger GlobalData | `http://localhost:5171/swagger` | `/swagger` | API docs |
| Swagger Management | `http://localhost:5205/swagger` | `/swagger` | API admin docs |

## Limites actuelles et pistes d'extension

### Limites

| Limite | Detail |
|---|---|
| **GlobalDataGrid non cablee** | Pas d'edition depuis la console admin |
| **Cache non distribue** | `IMemoryCache` local — coherence non garantie 5 min apres ecriture en multi-instance |
| **Pas de liste des cles** | Seule la lecture par cle exacte est disponible |
| **Valeur texte libre** | Pas de validation format — JSON mal forme accepte |
| **Suppression non implementee** | Pas d'endpoint pour supprimer une entree |
| **UsersGrid delete non implemente** | Interface sans cablage |
| **Pas d'auth admin** | Acces controle uniquement par header `X-CustomerGUID` reseau |
| **Postgres sans cache** | Le repository PG n'a pas le cache 5 min du MSSQL |

### Pistes d'extension

1. **Cabler `GlobalDataGrid.vue`** vers l'API pour edition visuelle
2. **Endpoint `GetAllGlobalDataItems`** pour lister toutes les cles du tenant
3. **Endpoint `DeleteGlobalDataItem`** pour nettoyer les cles obsoletes
4. **Cache distribue via Redis** (`IDistributedCache`) pour coherence multi-instance
5. **Souscription push via RabbitMQ** (deja configure) pour notifier les changements plutot que polling
6. **Typer les valeurs** avec champ optionnel `GlobalDataType` (`string`, `int`, `float`, `json`, `bool`)
7. **Auth admin JWT/session** independante du CustomerGUID

## Voir aussi

- [[Global Data Service]] — microservice source des ecritures/lectures repliquees
- [[SQL Global Data]] — table `GlobalData` (source de verite partagee) + `WorldSettings` (heure monde)
- [[SQL Users]] — `Users` CRUD expose dans `UsersGrid.vue` via `/api/Users`
- [[OWS Player Controller Component]] — `UOWSAPISubsystem` + `AOWSGameMode` ecrivent `WorldTime`, `ServerEvents`
- [[OWS Architecture]] — multi-tenant `X-CustomerGUID` et liste des 6 microservices
- [[Docker]] — OWSManagement + SPA Vue.js conteneurises
- [[Kubernetes]] — multi-pod expose le probleme du cache `IMemoryCache` non distribue
- [[CI CD]] — build Vite `wwwroot/dist` pour la SPA
