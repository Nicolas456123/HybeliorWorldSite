---
tags: [implementation, ue5, progression, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 03 — Progression & Inventory

Progression joueur (XP caché, déblocages, quêtes) et inventaire (items, équipement, persistance OWS).

Cœur :

- [[HW Inventory Component]] — composant inventaire + slots équipement
- [[HW Progression Component]] — progression cachée + 11 conditions de déblocage
- [[HW Quest Component]] — API quêtes (Accept/Complete/Discover)
- [[Inventory Persistence]] — sérialisation JSON ↔ OWS CustomCharacterData

Les items, loot tables, DataTables et structures de quêtes sont rattachés à ces composants.
