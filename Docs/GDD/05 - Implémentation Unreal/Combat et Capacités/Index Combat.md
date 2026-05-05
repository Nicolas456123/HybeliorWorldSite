---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 01 — AbilitySystem & Combat

Gameplay Ability System (GAS) custom + combat (combos, mastery, réactions élémentaires).

Entrée recommandée par le cœur du système :

- [[Ability System Component]] — `UHWAbilitySystemComponent` (routeur d'input, exécuteur d'abilities)
- [[Gameplay Ability]] — classe base `UHWGameplayAbility` et toutes ses sous-classes (Dodge, Movement, Toggle, …)
- [[Combat Attribute Set]] — 15 attributs (Health/Mana/Stamina + stats combat)
- [[Combo System]] — `UHWComboComponent` (enchaînements)

Les autres pages du dossier (tags natifs, effets, réactions, tasks, movesets, hitboxes, catalogues d'assets) sont reliées depuis ces quatre hubs.
