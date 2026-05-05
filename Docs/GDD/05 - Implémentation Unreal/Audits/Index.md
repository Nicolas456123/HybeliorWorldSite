---
tags: [index, implementation, audits, technical-debt, navigation]
type: index
status: living-doc
last_review: 2026-05-01
needs_review_for: []
---

# Audits

> Audits transverses : réseau, performance, sécurité, dette technique active vs résolue, intégration.
>
> **Scission V3.3** : `TechnicalDebt_Archive.md` éclaté en `Technical Debt Active` (incluant ex-`FrameworkIncoherences`) + `Technical Debt Resolved`.

---

## Fichiers

```dataview
TABLE status, last_review, implements
FROM "05 - Implémentation Unreal/Audits"
WHERE file.name != "Index"
SORT file.name ASC
```

---

## Pivots

- [[Technical Debt Active]] — TODOs, API dépréciées, race condition logout, incohérences framework
- [[Technical Debt Resolved]] — assets `_Archive/` morts, code commenté à supprimer

---

*Retour : [[05 - Implémentation Unreal/Index|↑ 05 - Implémentation Unreal]]*
