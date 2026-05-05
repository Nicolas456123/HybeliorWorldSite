---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Docker

> Architecture Docker Compose complete de OWS. Reseaux isoles, reverse proxy Nginx, multi-BDD, ELK. Source : `OWS/src/docker-compose.yml`.

## Services principaux

| Service | Role | Port interne | Port hote (dev) |
|---|---|---|---|
| `owspublicapi` | Auth, users | 80 | 44302 |
| `owsinstancemanagement` | Zones et instances | 80 | 44328 |
| `owscharacterpersistence` | Sauvegarde perso | 80 | 44323 |
| `owsglobaldata` | Donnees globales | 80 | 44325 |
| `owsmanagement` | Console admin | 80/443 | interne |
| `database` | PostgreSQL 16 | 5432 | 5432 |
| `messaging` | RabbitMQ 3.13 | 5672/15672 | 5672/15672 |
| `redis` | Cache distribue | 6379 | interne |
| `nginx` | Reverse proxy HTTPS | 80/443 | 80/443 |
| `elasticsearch` | Logs | 9200/9300 | 9200/9300 |
| `logstash` | Pipeline logs | 5044/9600 | 5044/9600 |
| `kibana` | Dashboards logs | 5601 | 5601 |
| `heartbeat` | Disponibilite services | — | interne |

## Reseaux

```yaml
networks:
  frontend:    # bridge — expose a Nginx
    driver: bridge
  backend:     # bridge + internal: true
    driver: bridge
    internal: true
  elk:         # bridge + internal
    driver: bridge
    internal: true
  database:    # bridge + internal
    driver: bridge
    internal: true
```

> **Securite** : `backend`, `elk`, `database` sont `internal: true` — aucun acces direct hote, trafic externe via Nginx obligatoire.

## Volumes nommes

| Volume | Nom reel | Usage |
|---|---|---|
| `setup` | `ows2-setup` | Etat init ELK |
| `elasticsearch` | `ows2-elasticsearch` | Donnees ES |
| `postgres_data` | `ows2-postgres-data` | Donnees Postgres |
| `messaging` | `ows2-messaging` | Donnees RabbitMQ |
| `redis_data` | `ows2-redis-data` | Donnees Redis (AOF) |

> Les noms reels sont hardcodes via `name: "ows2-..."` dans `docker-compose.yml` — partages entre lancement CLI et Visual Studio (voir section [Visual Studio vs CLI](#visual-studio-vs-cli)).

## Services OWS — patron commun

```yaml
image: ${REGISTRY:-ows}/owspublicapi:${PLATFORM:-linux}-${TAG:-latest}
build:
  context: .
  dockerfile: OWSPublicAPI/Dockerfile
environment:
  - OWSStorageConfig__OWSDBBackend=${DATABASE}
  - OWSStorageConfig__OWSDBConnectionString=${DATABASE_CONNECTION_STRING}
  - OWSAPIPathConfig__InternalPublicApiURL=${InternalPublicApiURL}
  - OWSAPIPathConfig__InternalInstanceManagementApiURL=${InternalInstanceManagementApiURL}
  - OWSAPIPathConfig__InternalCharacterPersistenceApiURL=${InternalCharacterPersistenceApiURL}
  - Redis__ConnectionString=redis:6379
healthcheck:
  test: ["CMD-SHELL", "bash -c 'exec 3<>/dev/tcp/127.0.0.1/80' 2>/dev/null && echo OK"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

Les services `owsinstancemanagement`, `owscharacterpersistence`, `owsglobaldata` ajoutent les variables `RabbitMQOptions__*`.

## Redis

```yaml
redis:
  image: redis:7-alpine
  command: redis-server --appendonly yes --maxmemory 512mb --maxmemory-policy allkeys-lru
  restart: unless-stopped
```

Mode **AOF** (Append-Only File), limite 512 Mo, eviction `allkeys-lru`.

## Nginx

```yaml
nginx:
  image: nginx:1.25-alpine
  ports: ["80:80", "443:443"]
  volumes:
    - ./.docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    - ./.docker/nginx/certs:/etc/nginx/certs:ro
```

### Config `.docker/nginx/nginx.conf`

- Redirection HTTP → HTTPS (301)
- TLS 1.2 + 1.3 uniquement
- Headers securite : X-Frame-Options, X-Content-Type-Options, HSTS, X-XSS-Protection
- Rate limiting 2 zones : `api` (30 req/s, burst 20), `auth` (5 req/s, burst 5-10) pour login/register
- Gzip niveau 6

| Route Nginx | Upstream |
|---|---|
| `/api/users/login`, `/api/users/register` | `owspublicapi:80` (zone auth) |
| `/api/users` | `owspublicapi:80` (zone api) |
| `/api/characters` | `owscharacterpersistence:80` |
| `/api/zones`, `/api/instances` | `owsinstancemanagement:80` |
| `/api/globaldata` | `owsglobaldata:80` |
| `/manage` | `owsmanagement:80` |
| `/nginx-health` | 200 OK |

## Base de donnees — PostgreSQL

Config dev locale : **PostgreSQL 16** uniquement (MSSQL et MySQL retires de `.docker/databases.yml` le 2026-04-20 pour simplifier l'infra Hybelior).

```yaml
database:
  extends:
    file: .docker/databases.yml
    service: ${DATABASE}    # postgres
```

Le code OWS upstream (`OWSData/Repositories/Implementations/{MSSQL,Postgres,MySQL}/`) supporte toujours les 3 moteurs ; seule la config Docker locale est reduite. Pour reactiver MSSQL/MySQL : restaurer les services correspondants dans `.docker/databases.yml` et les dossiers `.docker/mssql/` / `.docker/mysql/` depuis l'historique git.

Le schema initial est injecte au premier demarrage par `.docker/postgres/setup.sql` (35 tables : users, characters, maps, worldservers, itemtypes, ...).

## Stack ELK

Services `setup`, `elasticsearch`, `logstash`, `kibana`, `heartbeat` definis dans `.docker/logging.yml` et etendus dans le `docker-compose.yml` principal. Reseau `elk` isole.

## Overrides par plateforme

### Windows — `docker-compose.override.windows.yml`

```yaml
environment:
  - ASPNETCORE_ENVIRONMENT=Development
  - ASPNETCORE_URLS=https://+:443;http://+:80
volumes:
  - ${APPDATA}/Microsoft/UserSecrets:/root/.microsoft/usersecrets:ro
  - ${APPDATA}/ASP.NET/Https:/root/.aspnet/https:ro
```

### Linux — `docker-compose.override.linux.yml`

```yaml
environment:
  - ASPNETCORE_URLS=https://+:443;http://+:80
  - ASPNETCORE_Kestrel__Certificates__Default__Password=
  - ASPNETCORE_Kestrel__Certificates__Default__Path=/root/.aspnet/https/localhost.pfx
volumes:
  - ~/.microsoft/usersecrets:/root/.microsoft/usersecrets:ro
  - /usr/.aspnet/https:/root/.aspnet/https:ro
extra_hosts:
  - "host.docker.internal:host-gateway"
```

Specificite Linux : `host.docker.internal` non natif → ajoute via `extra_hosts`.

### macOS — `docker-compose.override.osx.yml`

Similaire Windows avec paths Unix `~/.microsoft/usersecrets` et `~/.aspnet/https`.

### Defaut — `docker-compose.override.yml`

HTTP uniquement, pas de HTTPS — pour VS Code ou sans certificat.

## Dockerfiles — multi-stage

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY [...].csproj ...
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OWSPublicAPI.dll"]
```

Chaque microservice partage `OWSShared`, `OWSData`, `OWSExternalLoginProviders`.

## Guide deploiement local

### Prerequis

- Docker Desktop 4.x ou Docker Engine 24+
- Docker Compose v2 (`docker compose`)
- .NET 6 SDK (pour certificats dev)

### Windows

```powershell
git clone <repo_url>
cd OWS/src
dotnet dev-certs https --export-path "$env:APPDATA\ASP.NET\Https\localhost.pfx" --password ""
dotnet dev-certs https --trust
cp .env.example .env
docker compose -f docker-compose.yml -f docker-compose.override.windows.yml up -d
docker compose ps
docker compose logs -f owspublicapi
```

Acces : `https://localhost:44302` (Public), `44328` (Instance Mgmt), `44323` (Char Persistence), `44325` (GlobalData), Kibana `http://localhost:5601`, RabbitMQ `http://localhost:15672`.

### Linux / macOS

Meme demarche avec override correspondant. Sur Linux : `mkdir -p /usr/.aspnet/https` avant generation certs.

### Configuration DB via .env

```bash
DATABASE=postgres
DATABASE_PASSWORD=yourStrong(!)Password
DATABASE_CONNECTION_STRING="Host=database;Port=5432;Database=openworldserver;Username=postgres;Password=${DATABASE_PASSWORD};"
```

### Commandes utiles

```bash
docker compose down                       # Arret
docker compose down -v                    # + volumes (perte donnees)
docker compose build owspublicapi         # Rebuild
docker compose logs -f owsinstancemanagement
docker compose exec owspublicapi bash     # Shell
docker inspect --format='{{json .State.Health}}' $(docker compose ps -q owspublicapi)
```

### Demarrage minimal (sans ELK)

```bash
docker compose up -d database messaging redis owspublicapi owsinstancemanagement owscharacterpersistence owsglobaldata owsmanagement nginx
```

## Visual Studio vs CLI

Les 13 conteneurs peuvent etre lances soit via `docker compose up` en ligne de commande, soit via F5 sur le projet `docker-compose.dcproj` dans Visual Studio. **Un seul des deux a la fois** — les ports hote (5432, 80, 443, 5672, 44302-44328, ...) sont exclusifs.

### Preambule — retrait des `container_name`

Depuis le 2026-04-20, **aucun conteneur n'a de `container_name:` hardcode**. Les noms prennent automatiquement le prefixe du nom de projet Docker Compose :

| Lancement | Prefixe conteneurs | Source du prefixe |
|---|---|---|
| CLI (`docker compose up`) | `ows2-*` | `COMPOSE_PROJECT_NAME=ows2` dans `.env` |
| Visual Studio | `dockercompose<hash>-*` | Hash genere par VS par machine |

Avant le retrait, des noms globaux (`MSSQL`, `Setup`, `RabbitMQ`, `ElasticSearch`, `Logstash`, `Kibana`, `Heartbeat`) causaient l'erreur DT1001 `container name already in use` quand VS tentait de recreer apres un lancement CLI.

### Volumes partages

Les volumes Docker ont leur nom hardcode (`name: "ows2-..."`) — donc CLI et VS **partagent les donnees** (postgres, redis, rabbitmq, elasticsearch). Switcher d'un mode a l'autre preserve l'etat applicatif.

### En cas d'erreur de conflit apres crash VS

Si VS s'est ferme brutalement et qu'un `F5` echoue avec un conflit de nom :

```bash
# Lister les conteneurs orphelins
docker ps -a --filter "name=dockercompose" --format "table {{.Names}}\t{{.Status}}"

# Supprimer ceux exites
docker container prune
```

## Voir aussi

- [[Kubernetes]] — équivalent prod du compose : les 5 deployments `owspublicapi`/`owsinstancemanagement`/`owscharacterpersistence`/`owsglobaldata`/`owsmanagement` + StatefulSets MSSQL/RabbitMQ remplacent les services Docker listés dans cette page.
- [[CI CD]] — détaille les variables `.env` (`DATABASE`, `RabbitMQHostName`, `OWSStorageConfig__*`) consommées par les services Docker décrits ici et leur rotation ConfigMap/Secret pour K8s.
- [[OWS Architecture]] — expose les 4 microservices accessibles via Nginx (`/api/users` → `owspublicapi:80`, `/api/characters` → `owscharacterpersistence:80`, etc.) dans la section "Upstream Nginx" de cette page.
- [[Instance Launcher]] — utilise RabbitMQ 3.13 (service `messaging`, ports 5672/15672) listé dans les services principaux du compose.
- [[Global Data Service]] — conteneurisé via l'image `mcr.microsoft.com/dotnet/aspnet:6.0` du Dockerfile multi-stage décrit dans la section "Dockerfiles — multi-stage".
