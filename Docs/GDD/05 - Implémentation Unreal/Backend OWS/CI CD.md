---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# CICD

> Variables d'env, health checks, monitoring, logging ELK, backup, strategies deploiement.

## Variables d'environnement — `.env` Docker Compose

```bash
# BASE DE DONNEES (config dev locale : postgres only depuis 2026-04-20)
DATABASE=postgres
DATABASE_PASSWORD=YourStrongPassword123!
DATABASE_CONNECTION_STRING="Host=database;Port=5432;Database=openworldserver;Username=postgres;Password=YourStrongPassword123!;"

# RABBITMQ
RabbitMQHostName=messaging
RabbitMQPort=5672
RabbitMQUserName=owsuser
RabbitMQPassword=YourRabbitPassword123!

# URLS INTERNES (Docker — noms de services)
InternalPublicApiURL=http://owspublicapi/
InternalInstanceManagementApiURL=http://owsinstancemanagement/
InternalCharacterPersistenceApiURL=http://owscharacterpersistence/

# STACK ELK
ELASTIC_VERSION=8.7.0
ELASTIC_PASSWORD=YourElasticPassword123!
LOGSTASH_INTERNAL_PASSWORD=YourLogstashPassword123!
KIBANA_SYSTEM_PASSWORD=YourKibanaPassword123!

# REGISTRY DOCKER
REGISTRY=ows
PLATFORM=linux
TAG=latest

# BACKUP
SA_PASSWORD=YourStrongPassword123!
POSTGRES_PASSWORD=YourStrongPassword123!
```

## Variables ASP.NET Core (injectees par Docker/K8s)

| Variable | Description | Exemple |
|---|---|---|
| `ASPNETCORE_ENVIRONMENT` | Environnement | `Development` / `Production` |
| `ASPNETCORE_URLS` | URLs Kestrel | `http://+:80` |
| `OWSStorageConfig__OWSDBBackend` | Type BDD | `postgres` (dev), `mssql` (prod K8s) |
| `OWSStorageConfig__OWSDBConnectionString` | Chaine connexion | `Server=...` |
| `OWSAPIPathConfig__InternalPublicApiURL` | URL Public API | `http://owspublicapi/` |
| `OWSAPIPathConfig__InternalInstanceManagementApiURL` | URL Instance Mgmt | `http://owsinstancemanagement/` |
| `OWSAPIPathConfig__InternalCharacterPersistenceApiURL` | URL Char Persist | `http://owscharacterpersistence/` |
| `RabbitMQOptions__RabbitMQHostName` | Hostname RabbitMQ | `messaging` / `rabbitmq.ows.svc.cluster.local` |
| `RabbitMQOptions__RabbitMQPort` | Port AMQP | `5672` |
| `RabbitMQOptions__RabbitMQUserName` / `RabbitMQPassword` | Credentials | — |
| `Redis__ConnectionString` | Connexion Redis | `redis:6379` |

> **Notation ASP.NET Core** : `__` = hierarchie JSON (`RabbitMQOptions:RabbitMQHostName`).

## ConfigMap vs Secret (K8s)

| Variable | Source | Sensible |
|---|---|---|
| `ASPNETCORE_ENVIRONMENT`, `ASPNETCORE_URLS` | ConfigMap | Non |
| `Internal*ApiURL`, `RabbitMQHostName`, `RabbitMQPort` | ConfigMap | Non |
| `OWSDBConnectionString`, `RabbitMQUserName`, `RabbitMQPassword` | Secret | **Oui** |
| `SA_PASSWORD`, `ELASTIC_PASSWORD` | Secret | **Oui** |

## Health checks

### Applicatifs (ASP.NET Core)

Chaque microservice expose `/health` gere par ASP.NET Core Health Checks. Verifie typiquement : connectivite BDD, RabbitMQ, Redis, latence des dependances.

### K8s

**Liveness** redemarre le pod si bloque :

```yaml
livenessProbe:
  httpGet: { path: /health, port: 80 }
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3
```

**Readiness** retire du LB s'il n'est pas pret :

```yaml
readinessProbe:
  httpGet: { path: /health, port: 80 }
  initialDelaySeconds: 15
  periodSeconds: 5
  failureThreshold: 3
```

**RabbitMQ** : `rabbitmq-diagnostics -q ping` (liveness), `-q check_running` (readiness).

**Nginx** (Docker Compose) : `curl -f http://localhost/nginx-health`.

## Stack ELK — Logging centralise

| Service | Role | Port |
|---|---|---|
| Elasticsearch | Stockage/indexation (single-node dev) | 9200 |
| Logstash | Ingestion, transformation, routage | 5044, 9600 |
| Kibana | Dashboards | 5601 |
| Heartbeat | Disponibilite | — |

Config ES :
```yaml
ES_JAVA_OPTS: -Xmx256m -Xms256m       # Augmenter en prod
ELASTIC_PASSWORD: ${ELASTIC_PASSWORD}
discovery.type: single-node            # Dev
```

> **Production** : cluster ES 3+ nodes, `discovery.type` HA.

## Metriques — Prometheus/Grafana

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace --set grafana.enabled=true
```

Ajouter package NuGet `prometheus-net.AspNetCore` dans les projets .NET. `ServiceMonitors` pour les microservices OWS.

**Dashboards recommandes** : Kubernetes overview (ID 315), ASP.NET Core (10915), RabbitMQ (10991), MSSQL (7793).

## Alerting recommande

| Alerte | Condition | Severite |
|---|---|---|
| Pod CrashLoopBackOff | `kube_pod_container_status_restarts_total > 3` | Critical |
| Pod non pret | `kube_pod_status_ready == 0` sur > 2 min | Critical |
| CPU eleve | > 80% sur > 5 min | Warning |
| Memoire elevee | > 85% sur > 5 min | Warning |
| Espace disque MSSQL | PVC > 80% | Warning |
| RabbitMQ queue profonde | > 10000 messages | Warning |
| Latence API elevee | p95 > 1s | Warning |

## Backup

### Strategie 3-2-1

```
Planification :
- Full backup    : 1x/jour (02h00)
- Diff backup    : 4x/jour (06h, 12h, 18h, 00h)
- Log backup     : 1x/heure
- Retention      : 30 jours
- Copies distantes : 2 (S3 + autre region)
```

### MSSQL

Types supportes : Full (`./backup.sh full`), Differential (`./backup.sh diff`), Log (`./backup.sh log`).

```bash
BACKUP DATABASE [OpenWorldServer]
  TO DISK = '/var/opt/mssql/backup/OpenWorldServer_full_20260404_020000.bak'
  WITH COMPRESSION, CHECKSUM, INIT
```

Nettoyage auto > 30 jours. Sorties : `.bak` (full/diff), `.trn` (log) dans `/var/opt/mssql/backup`.

**Restauration** :
```bash
docker exec -it MSSQL /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" \
  -Q "RESTORE DATABASE [OpenWorldServer]
       FROM DISK = '/var/opt/mssql/backup/OpenWorldServer_full_20260404_020000.bak'
       WITH RECOVERY, REPLACE"
```

### PostgreSQL

```bash
pg_dump -U postgres -Fc openworldserver > /backup/openworldserver_20260404.dump
gzip openworldserver_20260404.dump
```

**Restauration** :
```bash
docker exec -it PostgreSQL pg_restore -U postgres -d openworldserver --clean --if-exists /backup/openworldserver_20260404.dump
```

### Docker Compose — execution

```bash
docker compose -f docker-compose.yml -f .docker/backup/docker-compose.backup.yml run --rm mssql-backup
docker compose -f docker-compose.yml -f .docker/backup/docker-compose.backup.yml run --rm postgres-backup
```

Fichier `.docker/backup/docker-compose.backup.yml` : services avec `profiles: ["backup"]`, reseau BDD partage, volumes RO.

### K8s — Velero pour volumes PVC

```bash
velero install --provider aws \
  --plugins velero/velero-plugin-for-aws:v1.9.0 \
  --bucket my-velero-backups \
  --backup-location-config region=eu-west-1

velero backup create ows-backup-$(date +%Y%m%d) --include-namespaces ows --snapshot-volumes

velero schedule create ows-daily --schedule="0 2 * * *" --include-namespaces ows --ttl 720h
```

**Recovery** :
```bash
velero restore create --from-backup ows-backup-20260404
kubectl -n ows rollout restart deployment
kubectl -n ows rollout restart statefulset
```

## Checklist deploiement production

### Avant

- [ ] Images Docker buildees et poussees
- [ ] Secrets K8s via `kubectl create secret` (pas YAML committe)
- [ ] `MSSQL_PID` : `Developer` → `Standard`/`Enterprise`
- [ ] Certificat TLS pour `api.hybelior.world` (cert-manager)
- [ ] `kustomization.yaml` : tags d'images prod
- [ ] Ressources K8s dimensionnees selon trafic attendu
- [ ] StorageClass disponible pour PVCs
- [ ] Ingress Controller nginx fonctionnel

### Apres

- [ ] Tous les pods `Running` (`kubectl -n ows get pods`)
- [ ] Health checks OK (`curl https://api.hybelior.world/api/users/health`)
- [ ] Ingress accessible (`kubectl -n ows describe ingress ows-ingress`)
- [ ] RabbitMQ console via port-forward
- [ ] Backup automatique (Velero/cron)
- [ ] Prometheus/Grafana connectes au namespace `ows`
- [ ] Alertes configurees dans Grafana/AlertManager
- [ ] Logs visibles dans Kibana

## Voir aussi

- [[Docker]] — les variables `OWSStorageConfig__OWSDBConnectionString`, `OWSAPIPathConfig__Internal*ApiURL`, `RabbitMQOptions__*` listées ici sont injectées dans les services du `docker-compose.yml` (section "Services OWS — patron commun").
- [[Kubernetes]] — la table ConfigMap/Secret de cette page correspond directement à `envFrom: [configMapRef: ows-config, secretRef: ows-secrets]` des Deployments OWS.
- [[OWS Architecture]] — les health checks `/health` sont exposés par les 4 microservices `owspublicapi`, `owsinstancemanagement`, `owscharacterpersistence`, `owsglobaldata` décrits dans ce hub.
- [[Instance Launcher Ops]] — les logs Serilog + health monitoring du launcher suivent le même modèle Kestrel/liveness/readiness que les microservices couverts ici.
- [[OWS Benchmarks]] — complémentaire côté perf : `OWSBenchmarks` utilise `WebApplicationFactory` sans Docker alors que ce CICD décrit le pipeline complet jusqu'à prod.
