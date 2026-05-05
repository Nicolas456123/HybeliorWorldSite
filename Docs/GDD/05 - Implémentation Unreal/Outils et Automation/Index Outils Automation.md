---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 09 — Tools & Automation

Outillage éditeur C++, scripts Python/PowerShell/Batch, intégrations MCP.

Cœur :

- [[Editor Subsystems]] — `UHybeliorEditorSubsystem` + module `FHybeliorWorldEditorModule` (actions CallInEditor)
- [[Python Scripts]] — index des scripts Python du projet
- [[MCP Integration]] — serveur MCP Python (port 3000) pour pilotage externe UE5

Les utilitaires spécialisés (TerrainEditorTools, BlueprintExportTools, AssetResaveTool, AssetMigrationScripts, BuildScripts, UtilityWidgets) sont rattachés à ces trois axes.
