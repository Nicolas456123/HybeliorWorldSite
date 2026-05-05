---
tags: [index, implementation, backend, ows, sql, navigation]
type: index
status: living-doc
last_review: 2026-05-01
needs_review_for: []
---

# Backend OWS

> Implémentation backend OWS : microservices, SQL schema, DevOps, login providers, OWS Player Controller / Login Subsystem / Network Replication.
>
> **Dette technique active** : tout le SQL bootstrap encode encore `CharacterLevel` / `XP` / `BaseCharacterStats={Strength:10,...}` / fonctions `AbilityMod` `RollDice`. Voir [[Migration Accord]] (stratégie de migration parallèle, pas de breaking change OWS).

---

## Fichiers

```dataview
TABLE status, last_review, implements
FROM "05 - Implémentation Unreal/Backend OWS"
WHERE file.name != "Index"
SORT file.name ASC
```

---

## Pivots

- [[Migration Accord]] — stratégie en 6 phases (A à F)
- [[OWS Network Replication]] — struct FUserCharacter (avec warning Migration Accord)
- [[OWS Login Subsystem]] — auth + GlobalData
- [[OWS Player Controller Component]] — composant client OWS

---

*Retour : [[05 - Implémentation Unreal/Index|↑ 05 - Implémentation Unreal]]*
