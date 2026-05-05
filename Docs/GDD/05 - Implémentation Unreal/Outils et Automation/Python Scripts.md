---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Python Scripts Index

Index complet des scripts Python du projet HybeliorWorld, répartis en trois dossiers selon leur rôle.

---

## Dossiers de scripts

| Dossier | Rôle | Exécution |
|---|---|---|
| `Content/Python/` | Scripts auto-exécutés par le Python Script Plugin | Automatique au démarrage éditeur |
| `Content/EditorScripts/` | Scripts utilitaires de configuration d'assets | Manuelle via menu éditeur |
| `Scripts/` | Outils développeur (CLI + éditeur) | Manuelle ou ligne de commande |

---

## Content/Python/ — Auto-démarrage

### init_unreal.py

**Chemin** : `Content/Python/init_unreal.py`
**Exécution** : Automatique au démarrage de l'éditeur

Point d'entrée automatique de l'éditeur. Enregistre un tick callback Slate (`register_slate_post_tick_callback`) qui attend ~150 frames (≈5 secondes à 30fps) avant de charger le serveur MCP.

**Mécanisme de démarrage différé** :

```
Démarrage éditeur
    └─► register_slate_post_tick_callback(_try_launch_mcp)
         └─► tick 150x (~5s)
              └─► importlib.util.spec_from_file_location("unreal_mcp_server", script_path)
                   └─► spec.loader.exec_module(mod)
```

Le délai de 5 secondes garantit que l'éditeur est pleinement initialisé avant le démarrage du serveur HTTP. En cas d'échec, l'erreur est loguée avec `traceback` complet mais n'interrompt pas l'éditeur.

| Variable | Défaut | Rôle |
|---|---|---|
| `_mcp_launch_countdown` | `150` | Nombre de ticks avant lancement (~5s à 30fps) |

Pour désactiver le démarrage automatique, retirer ou renommer le fichier.

---

## Content/EditorScripts/ — Setup d'assets

### SetupGameplayAssets.py

Création de GE et listing des DataAssets manquants. Voir la page dédiée [[Asset Resave Tool]].

---

## Scripts/ — Outils développeur

### Catégorie MCP

| Script | Rôle |
|---|---|
| `unreal_mcp_server.py` | Serveur HTTP sur `127.0.0.1:3000` — voir [[MCP Integration]] |

### Catégorie Nativisation

| Script | Rôle |
|---|---|
| `nativize_bp.py` | Nativisation générique flexible (liste, dossier, dépendances) |
| `nativize_all.py` | Nativisation batch de tous les BPs en une passe |
| `nativize_batch.py` | Nativisation séquentielle anti-crash |
| `nativize_one.py` | Nativisation minimale ligne de commande |
| `nativize_all.sh` | Un processus par BP (Bash) |

Voir la page dédiée [[Asset Migration Scripts]].

### Catégorie Export Blueprint

| Script | Rôle |
|---|---|
| `export_all_bp_graphs.py` | Export JSON allégé (graphes, variables, composants) |
| `export_full_bp.py` | Export complet (connexions, timelines, délégués, interfaces) |

Voir la page dédiée [[Blueprint Export Tools]].

---

## Récapitulatif des chemins

| Script | Chemin complet |
|---|---|
| `init_unreal.py` | `Content/Python/init_unreal.py` |
| `unreal_mcp_server.py` | `Scripts/unreal_mcp_server.py` |
| `SetupGameplayAssets.py` | `Content/EditorScripts/SetupGameplayAssets.py` |
| `nativize_bp.py` | `Scripts/nativize_bp.py` |
| `nativize_all.py` | `Scripts/nativize_all.py` |
| `nativize_batch.py` | `Scripts/nativize_batch.py` |
| `nativize_one.py` | `Scripts/nativize_one.py` |
| `export_all_bp_graphs.py` | `Scripts/export_all_bp_graphs.py` |
| `export_full_bp.py` | `Scripts/export_full_bp.py` |

---

## Prérequis communs

### Python UE5

- **Unreal Engine 5.4** ouvert avec `HybeliorWorld.uproject`
- **Python Script Plugin** activé (`Edit > Plugins > Scripting > Python Editor Script Plugin`)
- Pour la nativisation : **Blueprint Nativization V2 Plugin** activé

### Serveur MCP Python

- Port `3000` libre sur `127.0.0.1`
- Aucune dépendance externe (bibliothèque standard + module `unreal`)

---

## Voir aussi

- [[MCP Integration]] — détaille `Scripts/unreal_mcp_server.py` lancé automatiquement par `init_unreal.py` sur `127.0.0.1:3000` avec ses endpoints `/status`, `/actor/spawn`, `/python`.
- [[Asset Migration Scripts]] — documente les cinq scripts de nativisation (`nativize_bp.py`, `nativize_all.py`, `nativize_batch.py`, `nativize_one.py`, `nativize_all.sh`) et `run_asset_reorganize.ps1` qui réorganise `/Game/BP/` via le plugin MCP C++ port `3001`.
- [[Blueprint Export Tools]] — décrit `export_all_bp_graphs.py` et `export_full_bp.py` avec leurs sorties `Saved/BPExport/<NomBP>_full.json` et la cible par défaut `BP_PlayerCharacter_CE`.
- [[Asset Resave Tool]] — détaille `Content/EditorScripts/SetupGameplayAssets.py` qui duplique `GE_DodgeForwardIFrame` → `GE_IFrame_Invulnerable` et liste les DataAssets à créer manuellement.
- [[Build Scripts]] — couvre `OWSInstanceLauncher/_RunDotnet.bat` (hors Python) pour le démarrage du microservice .NET backend OWS.
