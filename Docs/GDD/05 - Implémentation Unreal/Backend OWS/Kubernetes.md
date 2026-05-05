---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Kubernetes

> Manifestes K8s OWS, Kustomize, Deployments, StatefulSets, Ingress, HPA, variables ConfigMap/Secret. Kubernetes 1.28+.

## Organisation — Kustomize

```
k8s/
├── kustomization.yaml          # Point d'entree Kustomize
├── namespace.yaml              # Namespace "ows"
├── configmap.yaml              # Config non sensible
├── secret.yaml                 # Secrets (placeholders)
├── ingress.yaml                # Ingress nginx avec TLS
├── deployments/
│   ├── owspublicapi.yaml
│   ├── owsinstancemanagement.yaml
│   ├── owscharacterpersistence.yaml
│   ├── owsglobaldata.yaml
│   └── owsmanagement.yaml
└── statefulsets/
    ├── mssql.yaml
    └── rabbitmq.yaml
```

Deploiement : `kubectl apply -k k8s/`.

## Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ows
  labels:
    app.kubernetes.io/part-of: ows
```

Tous les objets K8s OWS isoles dans `ows`.

## ConfigMap `ows-config`

Variables injectees dans tous les pods :

| Cle | Valeur |
|---|---|
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `ASPNETCORE_URLS` | `http://+:80` |
| `InternalPublicApiURL` | `http://owspublicapi.ows.svc.cluster.local:80/` |
| `InternalInstanceManagementApiURL` | `http://owsinstancemanagement.ows.svc.cluster.local:80/` |
| `InternalCharacterPersistenceApiURL` | `http://owscharacterpersistence.ows.svc.cluster.local:80/` |
| `InternalGlobalDataApiURL` | `http://owsglobaldata.ows.svc.cluster.local:80/` |
| `RabbitMQHostName` | `rabbitmq.ows.svc.cluster.local` |
| `RabbitMQPort` | `5672` |

DNS K8s : `<service>.<namespace>.svc.cluster.local`.

## Secret `ows-secrets`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ows-secrets
  namespace: ows
type: Opaque
stringData:
  OWSDBConnectionString: "CHANGE_ME"
  RabbitMQUserName: "CHANGE_ME"
  RabbitMQPassword: "CHANGE_ME"
  SA_PASSWORD: "CHANGE_ME"
  ELASTIC_PASSWORD: "CHANGE_ME"
```

> **Important** : en prod, utiliser **External Secrets Operator** (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault) ou **Sealed Secrets**. Ne jamais committer de vraies valeurs.

## Deployments — Microservices OWS

| Service | Replicas | Particularite |
|---|---|---|
| `owspublicapi` | 2 | Auth |
| `owsinstancemanagement` | 2 | Zones actives |
| `owscharacterpersistence` | 2 | I/O BDD frequentes |
| `owsglobaldata` | 2 | Lecture majoritaire |
| `owsmanagement` | 1 | Console admin, pas HA |

**Ressources par pod** (identiques) :

```yaml
resources:
  requests: { memory: "256Mi", cpu: "250m" }
  limits:   { memory: "512Mi", cpu: "500m" }
```

**Health checks** :

```yaml
livenessProbe:
  httpGet: { path: /health, port: 80 }
  initialDelaySeconds: 30    # Demarrage .NET
  periodSeconds: 10
readinessProbe:
  httpGet: { path: /health, port: 80 }
  initialDelaySeconds: 15
  periodSeconds: 5
```

Config chargee via :

```yaml
envFrom:
  - configMapRef: { name: ows-config }
  - secretRef:    { name: ows-secrets }
```

Services K8s associes : tous `ClusterIP` port 80.

## StatefulSets

### MSSQL Server 2022

```yaml
kind: StatefulSet
spec:
  serviceName: mssql
  replicas: 1
  containers:
  - image: mcr.microsoft.com/mssql/server:2022-latest
    env:
    - name: ACCEPT_EULA
      value: "Y"
    - name: SA_PASSWORD
      valueFrom:
        secretKeyRef: { name: ows-secrets, key: SA_PASSWORD }
    - name: MSSQL_PID
      value: "Developer"   # A changer en Standard/Enterprise en prod
    volumeMounts:
    - name: mssql-data
      mountPath: /var/opt/mssql
  resources:
    requests: { memory: "1Gi",  cpu: "500m" }
    limits:   { memory: "2Gi",  cpu: "1000m" }
  volumeClaimTemplates:
  - accessModes: ["ReadWriteOnce"]
    storage: 20Gi
```

Service `ClusterIP: None` (headless) — acces `mssql.ows.svc.cluster.local:1433`.

### RabbitMQ 3 Management

```yaml
kind: StatefulSet
spec:
  serviceName: rabbitmq
  replicas: 1
  containers:
  - image: rabbitmq:3-management
    ports:
    - containerPort: 5672   # AMQP
    - containerPort: 15672  # Console
    env:
    - name: RABBITMQ_DEFAULT_USER
      valueFrom: { secretKeyRef: { name: ows-secrets, key: RabbitMQUserName } }
    - name: RABBITMQ_DEFAULT_PASS
      valueFrom: { secretKeyRef: { name: ows-secrets, key: RabbitMQPassword } }
  resources:
    requests: { memory: "512Mi", cpu: "250m" }
    limits:   { memory: "1Gi",   cpu: "500m" }
  volumeClaimTemplates:
  - accessModes: ["ReadWriteOnce"]
    storage: 10Gi
```

**Health checks natifs** :

```yaml
livenessProbe:
  exec: { command: ["rabbitmq-diagnostics", "-q", "ping"] }
readinessProbe:
  exec: { command: ["rabbitmq-diagnostics", "-q", "check_running"] }
```

Service headless, ports 5672 + 15672.

## Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ows-ingress
  namespace: ows
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "60"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
spec:
  ingressClassName: nginx
  tls:
  - hosts: [api.hybelior.world]
    secretName: ows-tls-secret
```

| Path | Service K8s | Port |
|---|---|---|
| `/api/users` | `owspublicapi` | 80 |
| `/api/characters` | `owscharacterpersistence` | 80 |
| `/api/zones` | `owsinstancemanagement` | 80 |
| `/api/globaldata` | `owsglobaldata` | 80 |
| `/manage` | `owsmanagement` | 80 |

Secret TLS `ows-tls-secret` — en prod, utiliser **cert-manager** avec Let's Encrypt.

## HPA — scaling automatique

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: owspublicapi-hpa
  namespace: ows
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: owspublicapi
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target: { type: Utilization, averageUtilization: 70 }
  - type: Resource
    resource:
      name: memory
      target: { type: Utilization, averageUtilization: 80 }
```

## Recommandations scaling

| Joueurs simultanes | publicapi | charpersist | instancemgmt | globaldata |
|---|---|---|---|---|
| < 100 | 2 | 2 | 2 | 2 |
| 100–500 | 3 | 3 | 3 | 2 |
| 500–1000 | 5 | 4 | 5 | 3 |
| 1000–5000 | 8 | 6 | 8 | 4 |
| > 5000 | 12+ | 8+ | 12+ | 6+ |

**BDD** : MSSQL Always On (read replicas) + failover auto, ou Azure SQL Managed / Amazon RDS. **RabbitMQ** : passer a cluster 3 nodes avec `RabbitMQ Cluster Operator`.

## Deploiement production

### Prerequis

- Cluster K8s 1.28+ (AKS, GKE, EKS, k3s)
- `kubectl`, `kustomize` v5+
- Ingress Controller nginx
- `cert-manager` (pour TLS auto)
- Registry Docker accessible

### Etapes

1. Build et push images (`docker compose build` puis `docker push`)
2. Creer secrets via `kubectl create secret generic ows-secrets --from-literal=...`
3. Installer cert-manager + ClusterIssuer Let's Encrypt
4. Mettre a jour `kustomization.yaml` (images + tags prod)
5. `kubectl apply -k k8s/` (avec `--dry-run=client` d'abord)
6. Surveiller : `kubectl -n ows get pods -w`
7. Verifier : `curl -k https://api.hybelior.world/api/users/health`

### Rolling update

```bash
kubectl -n ows set image deployment/owspublicapi owspublicapi=ghcr.io/votre-org/owspublicapi:v1.1.0
kubectl -n ows rollout status deployment/owspublicapi
kubectl -n ows rollout undo deployment/owspublicapi  # Rollback
```

## Voir aussi

- [[Docker]] — les services `docker-compose.yml` (`owspublicapi`, `database`, `messaging`, `redis`) décrits là-bas deviennent ici Deployments + StatefulSets (`mssql.yaml`, `rabbitmq.yaml`) dans `k8s/`.
- [[CI CD]] — les variables `ASPNETCORE_ENVIRONMENT`, `InternalPublicApiURL`, `RabbitMQHostName`, `OWSDBConnectionString` documentées côté CI/CD sont injectées via `envFrom: [configMapRef: ows-config, secretRef: ows-secrets]`.
- [[OWS Architecture]] — les 5 routes Ingress (`/api/users`, `/api/characters`, `/api/zones`, `/api/globaldata`, `/manage`) correspondent exactement aux 4 microservices + console admin décrits dans ce hub.
- [[Instance Launcher Ops]] — le launcher non déployé dans K8s (un par machine hôte) interagit avec RabbitMQ du cluster via routing keys `ows.serverspinup.{worldServerId}`.
- [[Global Data Replication]] — met en évidence le problème du cache `IMemoryCache` non distribué quand `owsglobaldata` est scalé à 2+ replicas via HPA dans cette page.
