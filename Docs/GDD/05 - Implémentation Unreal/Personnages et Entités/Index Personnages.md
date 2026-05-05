---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 02 — Characters & Entities

Hiérarchie de classes personnage (joueur + entités IA), animation, apparence, dialogues.

Cœur :

- [[HW Character]] — classe base (tous les personnages)
- [[HW GAS Character]] — intégration GAS, réactions élémentaires, formule de dégâts
- [[HW GAS Player Character]] — joueur (cameras, équipement, inputs)
- [[HW GAS Entity Character]] — mob/PNJ avec AIPerception
- [[AI Controller]] — BT/Blackboard + AIPerceptionComponent

Les sous-systèmes (animation, apparence, armure, entity pool, dialogue, nameplate, targeting) sont liés depuis ces classes racines.
