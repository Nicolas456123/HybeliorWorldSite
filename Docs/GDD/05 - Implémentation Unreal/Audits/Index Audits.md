---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 11 — Audits

Audits techniques du projet réalisés par analyse statique des headers C++ (`Source/HybeliorWorld/Public/`).

Cinq axes :

- [[Cross System Overview]] — audit des intégrations inter-systèmes (+ 5 sous-pages détaillées)
- [[Network Replication Audit]] — réplication UE5, RPCs, FFastArraySerializer (12 anomalies)
- [[Performance Analysis]] — ticks, timers, loops O(n²), async loading, data races
- [[Security Audit]] — vulnérabilités UE5 (RPC, data) + OWS (auth, data, infra)
- [[Technical Debt Active]] — TODOs, API dépréciées, code mort, race conditions

Chaque audit référence les classes concernées par `Fichier:ligne`.
