---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 05 — Interaction & UI

Interactables du monde, HUD + widgets, Enhanced Input.

Cœur :

- [[Interactable Framework]] — interface `IInteractable` + API persistance sur `AHWPlayerController`
- [[HUD]] — `AHWHUD` (floating damage, stats répliquées)
- [[Input Component]] — `UHWInputConfig` + `UHWInputComponent` (tag → InputAction → GA)

Les interactables concrets (Door, Container, Portal, SupplyPod) et les widgets d'UI (Inventory, Map, SkillBar, Quest, Dialogue, Nameplate) sont rattachés à ces trois hubs.
