---
tags: [implementation, ue5, audit, debt, resolved, archive]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Technical Debt Resolved

> Dette technique **résolue ou archivée** : assets/dossiers `_Archive/` mortels, fonctionnalités retirées proprement, code commenté à supprimer.
> Issu de la scission V3.3 de `TechnicalDebt_Archive.md`.
> Date d'analyse de référence : 2026-04-04.

---

## 1. Fichiers et dossiers dans `_Archive`

### 1.1 Vue d'ensemble

| Dossier | Contenu | Nature |
|---------|---------|--------|
| `Content/_Archive/BP/` | Sous-dossiers vides : `Game/`, `HUD/`, `Inventory_UI/`, `Login/`, `Portals/` | Dossiers BP archivés |
| `Content/_Archive/OldBlueprints/` | `BP_PlayerCharacter.uasset`, `BP_PlayerCharacter1.uasset` | Ancien BP player character — remplacé par C++ (`HWGASPlayerCharacter`) |
| `Content/_Archive/Root/` | `NewEditorUtilityWidgetBlueprint.uasset` ×2, `Plan_appart.uasset`, `Plan_appart_Mat.uasset` | Prototypes UI éditeur + appartement de test |
| `Content/_Archive/Maps/` | 12 maps + assets HLOD | Cartes de test et versions obsolètes |
| `Content/_Archive/Misc/` | Collections, développeur, TestMaskMesh, assets générés (VoxelBoolean, Merge) | Résidus d'outils de prototypage |
| `Content/_Archive/Assets/` | Tuiles Nanite Galenor (Export9), Galenor Tiles V1/V2, LevelPrototyping, Starships | Assets terrain exportés en version antérieure |
| `Content/_Archive/Interactables/` | (vide) | Dossier vidé lors d'une migration |

**Total assets :** ~5 420 fichiers `.uasset` / `.umap`, dont ~496 assets "significatifs" (hors `__ExternalActors__`, HLOD, _GENERATED, Nanite tiles).

### 1.2 Maps archivées (détail)

| Map | Statut estimé |
|-----|--------------|
| `ThirdPersonMap.umap` | Template de départ UE5 — mort |
| `TestMap.umap` | Map de test générique — mort |
| `HybeliorWorld_20km_V1.umap` | Version 1 du monde 20km — remplacée |
| `HybeliorWorld_20km_V2_House.umap` | Version 2 avec maison test — remplacée |
| `M_GenerateCity.umap` | Test génération de ville procédurale — prototype |
| `Galenor_Test_Export_8.umap` | Export test du continent Galenor (version 8) |
| `NewGalenorTestMesh.umap` / `_V2.umap` | Tests de mesh Galenor — supercédés par Export9 |
| `TestScaleBiomeV2/` | Tests de biomes (2 maps + 15 LayerInfo) — prototype |
| `Nouveau_logement.umap` | Prototype de logement — mort |
| `Maps/Brushify/` | Test d'intégration Brushify Forest — mort (plugin retiré) |

### 1.3 Assets archivés

| Dossier | Contenu | Statut |
|---------|---------|--------|
| `Galenor_Export/Export9/Nanite/` | ~60 meshes Nanite (Desert, GrassLand) | Ancienne version d'export terrain — supercédée |
| `Galenor_Tiles/` + `Galenor_Tiles_V2/` | Tuiles terrain Galenor V1 et V2 | Remplacées par génération procédurale C++ |
| `LevelPrototyping/` | Matériaux, meshes, textures de prototypage | Code mort — early-stage |
| `Starships/DartCruiser/` | Assets vaisseau spatial | Hors-sujet pour MMO médiéval-fantasy |

### 1.4 Blueprints archivés

- **`OldBlueprints/BP_PlayerCharacter.uasset`** + `BP_PlayerCharacter1.uasset` : remplacés par `AHWGASPlayerCharacter` (C++ + GAS). Migration BP→C++ complète.
- **`BP/Game/`, `BP/HUD/`, `BP/Inventory_UI/`, `BP/Login/`, `BP/Portals/`** : dossiers vides — Blueprints déplacés ou supprimés lors de la migration BP→C++.

---

## 2. Synthèse : En cours de migration vs. Vraiment mort

### En cours de migration (ne pas supprimer — voir [[Technical Debt Active]])

| Élément | Nature | Avancement |
|---------|--------|------------|
| `UPlayerMappableInputConfig` → `UEnhancedInputUserSettings` | Migration API UE 5.4 | Bloqué — 6 fichiers |
| `FAutoDeleteAsyncTask` → `FAsyncTask` (terrain) | Sécurité mémoire async | Identifié |
| `FindFunction/ProcessEvent` Water → API directe | Robustesse bridge | Identifié |
| `NativizeBPCommandlet` | Outil de migration BP→C++ | En service |
| Loot drop entité (`HWGASMobCharacter`) | Fonctionnalité incomplète | À implémenter |
| Race condition persistence logout | Bug critique OWS | Correctifs documentés non appliqués |

### Vraiment mort (candidats à la suppression)

| Élément | Fichier / Dossier | Raison |
|---------|-------------------|--------|
| `ExportBlueprintNodeToCode()` | `HybeliorEditorSubsystem.h/.cpp` + `HWTerrainEditorModule.cpp` | Plugin NodeToCode retiré |
| Bloc CommonUI commenté | `HWMappableConfigPair.cpp` (lignes 18–30) | CommonUI retiré |
| `BP_PlayerCharacter.uasset` / `BP_PlayerCharacter1.uasset` | `Content/_Archive/OldBlueprints/` | Remplacé par C++ |
| `ThirdPersonMap.umap`, `TestMap.umap` | `Content/_Archive/Maps/` | Templates inutiles |
| `Nouveau_logement.umap`, `Plan_appart.uasset` | `Content/_Archive/Maps/`, `_Archive/Root/` | Prototypes sans lien |
| `Starships/DartCruiser/` | `Content/_Archive/ThirdParty/Starships/` | Hors-sujet projet |
| `LevelPrototyping/` | `Content/_Archive/ThirdParty/LevelPrototyping/` | Prototypage early-stage |
| `Maps/Brushify/` | `Content/_Archive/Maps/Brushify/` | Plugin Brushify retiré |
| Assets VoxelBoolean + Merge générés | `Content/_Archive/Misc/_GENERATED/` | Résidus auto-générés |
| `NewEditorUtilityWidgetBlueprint.uasset` ×2 | `Content/_Archive/Root/` | Widgets éditeur anonymes |
| `TestMaskMesh_*.uasset` | `Content/_Archive/Misc/TestMaskMesh/` | Meshes de test |
| Galenor tiles V1/V2 + Export9 Nanite | `Content/_Archive/ThirdParty/Galenor_*` | Supercédés |

---

## Voir aussi

- [[Technical Debt Active]] — issues actuelles à corriger
- [[Index Audits]]
