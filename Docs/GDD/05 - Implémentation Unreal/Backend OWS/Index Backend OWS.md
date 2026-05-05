---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 08 — Backend OWS

Open World Server : microservices .NET 6, plugins UE5, base SQL multi-moteurs, infra Docker/K8s.

Cœur :

- [[OWS Architecture]] — vue d'ensemble 6 microservices + ports + flux connexion
- [[OWS Player Controller Component]] — plugin UE5 `OWSPlugin` (`UOWSGameInstance`, `UOWSPlayerControllerComponent`, `AOWSGameMode`)
- [[Instance Launcher]] — microservice lançant les processus UE (RabbitMQ, config, DI)
- [[Global Data Service]] — microservice données globales (clé/valeur, cache 5 min)

Le schéma SQL (6 sous-domaines), DevOps (Docker/K8s/CI-CD), login providers et replication sont rattachés à ces quatre hubs.
