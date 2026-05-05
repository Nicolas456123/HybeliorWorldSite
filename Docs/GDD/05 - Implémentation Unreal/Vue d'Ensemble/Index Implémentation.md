---
tags: [implementation, ue5, index, navigation]
type: implementation
status: living-doc
last_review: 2026-05-01
needs_review_for: []
implements: ["Migration Accord"]
---

# Index Implémentation Unreal

MMO fantasy-open-world sous **Unreal Engine 5.4** + backend **OWS** (.NET microservices).

Ce dossier `05 - Implémentation Unreal/` contient l'intégralité de la documentation technique UE5/OWS post-refonte 2026-05-01 (V3.3). La structure reflète le découpage thématique du codebase.

> Pour la **vision/concept** (mécaniques, lore systémique, refonte Souffle/Accord/Ères), voir `01 - Vision/` à `_Pilotage/`.
> Pour le **lore narratif** (Pays, Histoires, Chroniques, Religions), voir `Lore/`.

## Navigation par domaine

- [[Index Combat]] — GAS custom, combat, combos, réactions élémentaires
- [[Index Personnages]] — personnages (joueur + entités), IA, animation, apparence, dialogues
- [[Index Progression Inventaire]] — inventaire, progression, quêtes, DataTables
- [[Index Monde Environnement]] — environnement dynamique, terrain procédural, système water, biomes, ères
- [[Index Interaction UI]] — interactables du monde, HUD + widgets, input
- [[Index VFX Audio]] — Niagara, audio, matériaux, shaders
- [[Index Framework Plugins]] — GameMode, PlayerController, flows login/persistance, plugins, config
- [[Index Backend OWS]] — microservices .NET, SQL, DevOps, login providers, Migration Accord
- [[Index Outils Automation]] — outils éditeur, scripts, MCP bridge, plugin MCP éditeur
- [[Index Audits]] — audits transverses (réseau, perf, sécu, dette technique active/résolue)

## Pages transverses

- [[Synthèse Projet]] — synthèse du projet et bugs critiques (snapshot 2026-04-08)
- [[Index Assets]] — catalogue des assets Unreal (inventaires MCP)
- [[Migration Accord]] — stratégie de migration sémantique XP/Level → Accord (D-MIGRATION-SQL)

## Refonte 2026-05-01 (V3.3)

Cette documentation a été restructurée le 2026-05-01 :
- 174 fichiers GameDoc renommés et ré-organisés en 11 sous-dossiers thématiques (anglais Title Case avec espaces — D-ARBRE-4)
- 3 scissions effectuées : `FrameworkBlueprints` → 4 fichiers ; `OWSPluginDetail` → 3 fichiers ; `TechnicalDebt_Archive` → Active + Resolved
- 4 archivages : `ROG_Widgets`, `FrameworkIncoherences` (fusionné), `CharacterCustomization`, `AnimIK` (fusionné dans `Anim Instance`)
- `MCPPluginDetail` rapatrié dans `Outils et Automation/`
- Refonte sémantique de la progression : Souffle/Accord/Ères documentée sur tous les fichiers concernés (Progression, Quest, Character, Combat Attribute Set, Weapon Mastery, etc.)
- 9 religions canoniques alignées (D-GD-9-RELIGIONS)
- Distinction T1-T7 visuel vs 6 tiers gameplay (D-GD-TIERS)

Voir `_chantier/rapports/V3.3-Refonte-GameDoc.md` pour le rapport complet.
