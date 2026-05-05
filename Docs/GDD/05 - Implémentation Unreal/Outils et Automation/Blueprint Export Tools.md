---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Blueprint Export Tools

Scripts Python qui exportent la structure complète d'un Blueprint en JSON. Conçus pour l'analyse, la documentation ou la migration vers C++.

---

## export_all_bp_graphs.py

**Chemin** : `Scripts/export_all_bp_graphs.py`
**Sortie** : `Saved/BPExport/<NomBP>_full.json`

Exporte les graphes, variables et composants d'un Blueprint en JSON. Version allégée sans détails de connexion inter-pins.

### Ligne de commande

```bash
UnrealEditor-Cmd.exe "Project.uproject" \
    -ExecutePythonScript="Scripts/export_all_bp_graphs.py" \
    "-bptarget=/Game/BP/Game/BP_PlayerCharacter_CE" \
    -nullrhi -nosplash -unattended
```

### Console Python

```python
exec(open('H:/HybeliorWorld_Project/HybeliorWorld_5.4/Scripts/export_all_bp_graphs.py').read())
# BP par défaut : BP_PlayerCharacter_CE
```

### Arguments

| Argument | Valeur par défaut | Description |
|---|---|---|
| `-bptarget=` | `BP_PlayerCharacter_CE` | Blueprint à exporter |

### Structure JSON

```json
{
  "name": "BP_PlayerCharacter_CE",
  "parent_class": "HWPlayerCharacter",
  "blueprint_type": "BPTYPE_Normal",
  "variables": [ { "name": "", "type": "", "category": "", "replication": "" } ],
  "components": [ { "name": "", "class": "", "parent": "" } ],
  "graphs": [
    {
      "name": "EventGraph",
      "type": "EventGraph|Function|Macro",
      "nodes": [ { "class": "", "name": "", "title": "", "function": "", "pins": [] } ]
    }
  ]
}
```

### Contenu exporté

| Section | Description |
|---|---|
| `name`, `parent_class`, `blueprint_type` | Métadonnées du Blueprint |
| `variables` | Variables déclarées (nom, type, catégorie, réplication) |
| `components` | Composants du SCS (SimpleConstructionScript) |
| `graphs` | Tous les graphes avec nœuds et pins |

---

## export_full_bp.py

**Chemin** : `Scripts/export_full_bp.py`
**Sortie** : `Saved/BPExport/<NomBP>_full.json`

Version enrichie incluant les **connexions complètes entre pins**, les timelines, les délégués, les interfaces implémentées et un résumé quantitatif. Utilise la réflexion UE directe (sans plugin NodeToCode).

### Ligne de commande

```bash
UnrealEditor-Cmd.exe "Project.uproject" \
    -ExecutePythonScript="Scripts/export_full_bp.py" \
    "-bptarget=/Game/BP/Game/BP_PlayerCharacter_CE" \
    -nullrhi -nosplash -unattended
```

### Console Python

```python
exec(open('H:/HybeliorWorld_Project/HybeliorWorld_5.4/Scripts/export_full_bp.py').read())
```

### Champs supplémentaires

| Champ | Contenu |
|---|---|
| `event_graphs` | Graphes d'événements avec nœuds complets |
| `functions` | Graphes de fonctions avec `"graph_type": "Function"` |
| `macros` | Graphes de macros |
| `delegates` | Signatures de délégués |
| `interfaces` | Interfaces implémentées (noms) |
| `timelines` | Timelines : nom, longueur, looping, auto_play |
| `summary` | Compteurs : variables, composants, graphs, fonctions, macros, délégués, interfaces, timelines, total nœuds |

### Détails des pins

Chaque pin inclut : `name`, `direction` (Input/Output), `type` (format `Cat<SubCat>` ou `Array(Cat)`), `default`, `default_object`, `default_text`, `linked_to` (format `"NodeName.PinName"`).

### Détail par nœud

Pour chaque nœud : classe UE, titre complet, commentaire, `member_name` (appels de fonction), `variable_name` (nœuds de variable), liste complète des pins avec direction, type, valeur par défaut et connexions.

---

## Cas d'usage

| Objectif | Script recommandé |
|---|---|
| Audit rapide des variables/composants | `export_all_bp_graphs.py` |
| Préparation à migration C++ | `export_full_bp.py` (connexions complètes) |
| Documentation d'API Blueprint | `export_full_bp.py` (delegates + interfaces) |
| Comparaison avant/après refactoring | `export_full_bp.py` avec diff JSON |

---

## Voir aussi

- [[Python Scripts]] — répertorie `export_all_bp_graphs.py` et `export_full_bp.py` sous la catégorie « Export Blueprint » avec leurs chemins `Scripts/export_*.py` et leur sortie commune `Saved/BPExport/<NomBP>_full.json`.
- [[Asset Migration Scripts]] — décrit les scripts `nativize_*.py` qui consomment la cible `BP_PlayerCharacter_CE` exportée par défaut dans ces scripts d'export (parent `HWPlayerCharacter`).
- [[MCP Integration]] — expose l'endpoint `POST /python` sur `127.0.0.1:3000` qui permet d'exécuter `exec(open('.../export_full_bp.py').read())` à distance sur le game thread.
