---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# OWSArchitecture

> Vue d'ensemble du backend Open World Server (OWS) : microservices .NET 6, infrastructure Docker, flux de connexion, modèle de données résumé.

## Architecture Microservices (.NET 6)

| Service | Port | Rôle |
|---------|------|------|
| **OWSPublicAPI** | 44302 | Auth, users, sessions, personnages |
| **OWSCharacterPersistence** | 44323 | Stats, inventaire, custom data, abilities |
| **OWSInstanceManagement** | 44328 | Serveurs, zones, instances |
| **OWSGlobalData** | 44325 | Données monde (key/value) |
| **OWSManagement** | Interne (80/443 via Nginx) | Dashboard React/Vue admin |
| **OWSInstanceLauncher** | Non dockerisé | Lance processus UE servers via RabbitMQ |

## Infrastructure Docker

**Réseaux** : frontend (public), backend (internal), database (internal), elk (internal)

| Service | Version | Port | Rôle |
|---------|---------|------|------|
| Nginx | 1.25 | 80, 443 | Reverse proxy SSL |
| Database | MSSQL/PostgreSQL/MySQL | variable | Base de données principale |
| RabbitMQ | 3.x | 5672, 15672 | Queue SpinUp/ShutDown instances |
| Redis | 7 Alpine | 6379 | Cache sessions (512MB LRU) |
| Elasticsearch | 8.11.0 | 9200, 9300 | Indexation logs |
| Logstash | 8.11.0 | 5044 | Pipeline logs |
| Kibana | 8.11.0 | 5601 | Dashboard logs |

## Variables d'Environnement Essentielles

```bash
DATABASE=MSSQL|PostgreSQL|MySQL
DATABASE_CONNECTION_STRING=Server=...

# URLs services (noms Docker DNS internes)
InternalPublicApiURL=http://owspublicapi:80
InternalInstanceManagementApiURL=http://owsinstancemanagement:80
InternalCharacterPersistenceApiURL=http://owscharacterpersistence:80

# RabbitMQ
RabbitMQHostName=messaging
RabbitMQPort=5672
RabbitMQUserName=user
RabbitMQPassword=password

# ELK
ELASTIC_VERSION=8.11.0
ELASTIC_PASSWORD=password
```

## API Endpoints principaux

### OWSPublicAPI (/api/Users/)

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `LoginAndCreateSession` | POST | Login + création session |
| `RegisterUser` | POST | Inscription + auto-login |
| `ExternalLoginAndCreateSession` | POST | Epic/Xsolla login |
| `GetAllCharacters` | POST | Liste personnages utilisateur |
| `CreateCharacter` | POST | Créer personnage depuis classe |
| `CreateCharacterUsingDefaultCharacterValues` | POST | Créer depuis valeurs défaut |
| `UserSessionSetSelectedCharacter` | POST | Sélectionner personnage |
| `GetServerToConnectTo` | GET | Trouver serveur de zone |
| `GetPlayerGroupsCharacterIsIn` | POST | Groupes du personnage |
| `Logout` | POST | Déconnexion |

> **Note** : Pas d'endpoint `RemoveCharacter` trouvé dans CharactersController.

### OWSCharacterPersistence

- `/api/Characters/` : UpdateCharacterStats, UpdateAllPlayerPositions, AddOrUpdateCustomData, GetCustomData, GetByName, PlayerLogout
- `/api/Abilities/` : GetAbilities, GetCharacterAbilities, AddAbilityToCharacter, UpdateAbilityOnCharacter, RemoveAbilityFromCharacter, GetAbilityBars, GetAbilityBarsAndAbilities

### OWSInstanceManagement (/api/Instance/, /api/Zones/)

RegisterLauncher, SpinUpServerInstance, ShutDownServerInstance, StartInstanceLauncher, ShutDownInstanceLauncher, SetZoneInstanceStatus, GetServerToConnectTo, GetZoneInstancesForZone, UpdateNumberOfPlayers, AddZone

### OWSGlobalData (/api/GlobalData/)

```
POST /api/GlobalData/AddOrUpdateGlobalDataItem
GET  /api/GlobalData/GetGlobalDataItem/{key}
```

## Modèle de Données (33 Tables)

| Domaine | Tables principales |
|---------|--------------------|
| Authentification | Users, UserSessions, Customers, UsersInQueue |
| Personnages (100+ col) | Characters, CustomCharacterData, DefaultCharacterValues |
| Abilities | CharHasAbilities, CharAbilityBars, CharAbilityBarAbilities, Abilities, AbilityTypes |
| Inventaire | CharInventory, CharInventoryItems, CharHasItems, Items, ItemTypes |
| Monde | Maps, MapInstances, WorldServers, AreaOfInterest |
| Social | PlayerGroup, PlayerGroupTypes, PlayerGroupCharacters, ChatGroups, ChatGroupUsers, ChatMessages |
| Divers | GlobalData, DebugLog |

Voir les pages SQL pour le détail de chaque domaine.

## Flux de Connexion Complet

```
1. Client → POST /api/Users/LoginAndCreateSession
   → Reçoit UserSessionGuid

2. Client → POST /api/Users/UserSessionSetSelectedCharacter
   → Sélectionne CharacterName

3. Client → GET /api/Users/GetServerToConnectTo (zone "Forest")
   ↓
4. PublicAPI → InstanceManagement : instance existe ?
   ├─ Status=2 (ready) → retourne ServerIP:Port directement
   └─ Absent → publie message RabbitMQ "SpinUp"
   ↓
5. OWSInstanceLauncher (externe) reçoit → lance processus UE
   ↓
6. Serveur UE → POST /api/Instance/SetZoneInstanceStatus (Status=2)
   ↓
7. Client reçoit ServerIP:Port → ClientTravel
```

**Statuts MapInstance** : 0=off/waiting, 1=starting, 2=ready, 3=full

## Auth Externe

**Interface** : `IExternalLoginProvider`. **Providers** : EpicOnlineServices, Xsolla. **Grant types** : Password, AuthorizationCode, ExchangeCode, DeviceToken, TwoFactorAuthentication.

## Exemples Request/Response

**Login** :
```json
POST http://localhost:44302/api/Users/LoginAndCreateSession
Header: X-CustomGUID: {customerGuid}
Body: {"email": "player@example.com", "password": "hash"}

Response: {"userSessionGuid": "550e8400-...", "success": true}
```

## Incohérences de Sécurité

| # | Problème | Sévérité |
|---|---------|---------|
| 1 | Pas de validation propriété personnage (CharacterId → UserSession) | Haute |
| 2 | Header X-CustomGUID seul (pas JWT) | Haute |
| 3 | Rate limiting global (60 req/min) | Moyenne |
| 4 | CORS `AllowAnyHeader + AllowAnyMethod` | Haute |
| 5 | HTTP inter-services (pas TLS) | Moyenne |
| 6 | RabbitMQ credentials par défaut (`guest/guest`) | Haute |
| 7 | Pas de versioning API (`/v1/`) | Faible |
| 8 | Pas de correlation ID pour tracing cross-service | Faible |
| 9 | Typo `UserGu` dans UserSessions | Cosmétique |
| 10 | Redondance CharHasItems vs CharInventoryItems | Design |

## Deploiement Local

**Docker Compose** : `H:/HybeliorWorld_Project/OWS/src/docker-compose.yml`
Demarrage : `docker-compose up -d` depuis `H:/HybeliorWorld_Project/OWS/src/`

**OWSAPICustomerKey** : Configuré dans `DefaultGame.ini`.

## Voir aussi

- [[OWS Player Controller Component]] — client UE5 (`UOWSGameInstance`, `UOWSPlayerControllerComponent`, `AOWSGameMode`, `UOWSAPISubsystem`) consommateur des 4 microservices
- [[Instance Launcher]] — microservice qui recoit `SpinUp`/`ShutDown` RabbitMQ et lance les processus UE (etape 5 du flux)
- [[Instance Launcher Ops]] — queues `ows.serverspinup` / `ows.servershutdown`, securite CustomerGUID
- [[Global Data Service]] — microservice OWSGlobalData (`/api/GlobalData/*`) decrit ici
- [[Global Data Replication]] — console OWSManagement + replication cache multi-instance
- [[SQL Users]] — tables `Users`, `UserSessions`, `Customers` (flux LoginAndCreateSession)
- [[SQL Characters]] — table `Characters` (100+ colonnes) + `DefaultCharacterValues`
- [[SQL Abilities]] — tables `Abilities`, `CharHasAbilities`, `CharAbilityBars`
- [[SQL Inventory]] — tables `Items`, `CharHasItems`, `CharInventory`, `CharInventoryItems`
- [[SQL Maps Social]] — tables `Maps`, `WorldServers`, `MapInstances` (statuts 0-3)
- [[SQL Global Data]] — tables `GlobalData`, `WorldSettings`, `OWSVersion` + migrations
- [[Login OAuth]] — `IExternalLoginProvider` (Epic, Xsolla) mentionne en Auth Externe
- [[Docker]] — compose Nginx + DB + RabbitMQ + Redis + ELK
- [[Kubernetes]] — deploiement production
