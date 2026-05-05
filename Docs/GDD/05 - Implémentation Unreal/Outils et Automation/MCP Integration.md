---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MCP Integration — Unreal Editor Remote Control

Serveur HTTP minimal qui expose l'éditeur UE5 via une API REST JSON. Utilisé par Claude Code (MCP) et tout outil externe nécessitant de piloter l'éditeur programmatiquement.

---

## unreal_mcp_server.py

**Chemin** : `Scripts/unreal_mcp_server.py`
**Port** : `127.0.0.1:3000`

Serveur HTTP lancé automatiquement par [[Python Scripts|init_unreal.py]] ~5 secondes après le démarrage de l'éditeur.

### Architecture

Le serveur résout la contrainte fondamentale d'UE5 : toutes les opérations sur les assets et acteurs **doivent s'exécuter sur le game thread**. Une file de commandes (`queue.Queue`) assure le transit thread-safe entre le thread HTTP et le game thread via un callback tick.

```
Thread HTTP (daemon)          Game Thread (tick callback)
    MCPHandler                    _tick_poll()
        do_GET / do_POST              dépile _cmd_queue
            run_on_game_thread()          exécute la fonction
                _cmd_queue.put()          stocke dans _cmd_results
                polling 20ms          ←── renvoie le résultat
```

```
Client HTTP (Claude Code / curl)
        ↓  HTTP Request
  MCPHandler (thread HTTP)
        ↓  _cmd_queue.put(...)
  _tick_poll() [game thread, callback Slate]
        ↓  Exécution UE5
  _cmd_results[cmd_id] = résultat
        ↓  run_on_game_thread() poll (timeout 120s)
  Réponse HTTP JSON
```

### Variables configurables

| Variable | Valeur | Rôle |
|---|---|---|
| `MCP_PORT` | `3000` | Port HTTP d'écoute |
| `timeout` dans `run_on_game_thread` | `120s` | Délai max d'attente game thread |

---

## Endpoints GET

| Route | Paramètres query | Description |
|---|---|---|
| `/status` | — | Nom du projet, version moteur, niveau courant |
| `/actors` | `class_filter` | Liste tous les acteurs avec position et rotation |
| `/actors/selected` | — | Acteurs sélectionnés dans le viewport |
| `/level` | — | Nom du monde et nombre de niveaux |
| `/assets/search` | `path`, `filter`, `max` | Recherche d'assets dans le Content Browser |

---

## Endpoints POST (body JSON)

| Route | Champs | Description |
|---|---|---|
| `/actor/spawn` | `class`, `label`, `location`, `rotation` | Crée un acteur |
| `/actor/move` | `label`\|`name`, `location`, `rotation` | Déplace/rotation un acteur |
| `/actor/delete` | `label`\|`name` | Supprime un acteur |
| `/property/get` | `label`\|`name`, `property` | Lit une propriété éditeur |
| `/property/set` | `label`\|`name`, `property`, `value` | Modifie une propriété éditeur |
| `/console` | `command` | Exécute une commande console (bloque : `quit`, `exit`, `crash`, `shutdown`) |
| `/python` | `code` | Exécute du code Python arbitraire sur le game thread |
| `/assets/search` | `path`, `filter`, `max` | Aussi disponible en POST |

---

## Démarrage et arrêt manuels

**Démarrer manuellement** (si `init_unreal.py` désactivé) :
```python
exec(open('H:/HybeliorWorld_Project/HybeliorWorld_5.4/Scripts/unreal_mcp_server.py').read())
```

**Ou via le menu éditeur** :
```
Edit > Execute Python Script > Scripts/unreal_mcp_server.py
```

**Arrêter** :
```python
import unreal_mcp_server
unreal_mcp_server.stop_server()
```

---

## Exemples curl

```bash
# Vérifier que le serveur est actif
curl http://127.0.0.1:3000/status

# Lister les acteurs
curl http://127.0.0.1:3000/actors

# Rechercher des assets
curl "http://127.0.0.1:3000/assets/search?path=/Game/&filter=BP_Player&max=10"

# Exécuter une commande console
curl -X POST http://127.0.0.1:3000/console \
     -H "Content-Type: application/json" \
     -d '{"command": "stat fps"}'

# Exécuter du Python arbitraire
curl -X POST http://127.0.0.1:3000/python \
     -H "Content-Type: application/json" \
     -d '{"code": "result = unreal.SystemLibrary.get_project_directory()"}'
```

---

## Effets sur l'éditeur

- Aucune modification de fichier sur disque par défaut
- Peut modifier les acteurs du niveau ouvert selon les requêtes
- Logs dans l'Output Log sous le préfixe `[UnrealMCP]` / `[MCP]`
- Ouvre le port TCP `3000` sur `127.0.0.1` (local uniquement)

---

## Distinction MCP Python vs MCP C++

| Serveur | Port | Langue | Rôle |
|---|---|---|---|
| `unreal_mcp_server.py` (Python) | `3000` | Python | Pilotage éditeur, Claude Code |
| Plugin UnrealMCP C++ | `3001` | C++ | Opérations Content Browser massives (voir [[Asset Migration Scripts]]) |

Les deux serveurs coexistent et ont des usages distincts. Le serveur Python est plus léger et flexible (exécution de code arbitraire) ; le plugin C++ est plus performant pour les opérations de masse sur les assets.

---

## Voir aussi

- [[Python Scripts]] — décrit `init_unreal.py` qui enregistre un `register_slate_post_tick_callback` et lance `Scripts/unreal_mcp_server.py` après 150 ticks (≈5s) via `importlib.util.spec_from_file_location`.
- [[Asset Migration Scripts]] — documente le plugin UnrealMCP C++ sur le port `3001` utilisé par `run_asset_reorganize.ps1` en parallèle du serveur Python sur `3000` décrit ici.
- [[Editor Subsystems]] — expose `UHybeliorEditorSubsystem` dont les méthodes (`ImportHybeliorWorld`, `GenerateMasterMaterial`) sont accessibles via l'endpoint `POST /python` de ce serveur.
- [[Blueprint Export Tools]] — décrit `export_full_bp.py` déclenchable à distance via `POST /python` avec `exec(open('.../export_full_bp.py').read())` sur le game thread.
