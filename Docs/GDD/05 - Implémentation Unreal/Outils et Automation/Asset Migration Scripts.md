---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Asset Migration & Nativization Scripts

Scripts de migration Blueprint → C++ et de réorganisation massive du Content Browser.

---

## Nativisation Blueprint → C++

Ces scripts utilisent le plugin **Blueprint Nativization V2** (`NativizationV2Subsystem`). Le plugin doit être activé dans les plugins du projet.

### nativize_bp.py — Flexible et paramétrable

**Chemin** : `Scripts/nativize_bp.py`

Script **générique** pouvant cibler un asset unique, une liste d'assets ou un répertoire entier. Sert également de bibliothèque importable.

**Paramètres de `run()`** :

| Paramètre | Type | Description |
|---|---|---|
| `target_path` | `str` ou `list[str]` | Un ou plusieurs chemins d'assets |
| `target_dir` | `str` | Répertoire à convertir récursivement |
| `with_dependencies` | `bool` | Inclure les dépendances |

**Ligne de commande** :
```bat
UnrealEditor-Cmd.exe "Project.uproject" ^
  -ExecutePythonScript="Scripts/nativize_bp.py" ^
  -bptarget="/Game/BP/Game/BP_HybeliorGameMode" ^
  -nullrhi -nosplash -unattended
```

**Console Python** :
```python
import nativize_bp
nativize_bp.run("/Game/BP/Game/BP_HybeliorGameMode")
nativize_bp.run("/Game/BP/Game/BP_PlayerCharacter_CE", with_dependencies=True)
nativize_bp.run(target_dir="/Game/BP/Game/")
```

**Arguments CLI** :

| Argument | Exemple | Rôle |
|---|---|---|
| `-bptarget=` | `-bptarget="/Game/BP/Game/BP_Xxx"` | Cible unique |
| `-bpdir=` | `-bpdir="/Game/BP/Game/"` | Répertoire récursif |
| `-bpdeps` | `-bpdeps` | Inclure dépendances |

---

### nativize_one.py — Un seul BP

**Chemin** : `Scripts/nativize_one.py`

Script minimal pour nativiser **un seul** Blueprint. Conçu pour être appelé par `nativize_all.sh`.

```bash
UnrealEditor-Cmd.exe "Project.uproject" \
    -ExecutePythonScript="Scripts/nativize_one.py" \
    -bptarget=/Game/BP/Game/BP_PlayerCharacter_CE \
    -nullrhi -nosplash -unattended
```

En cas de succès : `CONVERTED: <chemin> in X.XXs`.

---

### nativize_batch.py — Séquentiel anti-crash

**Chemin** : `Scripts/nativize_batch.py`

Convertit les Blueprints **un par un dans le même processus** pour limiter les crashs. Si un BP échoue, le script continue.

**Blueprints ciblés (32)** :

| Catégorie | Blueprints |
|---|---|
| Core | `BP_HybeliorGameMode`, `BP_PlayerCharacter_CE`, `BP_PlayerController`, `BP_HWAIController` |
| Entity | `BP_TestEntity`, `BP_TestEntityAIController`, `BP_EntitySpawner`, `BP_EntityPoolManager`, `BP_EntityPlayerController`, `BP_SpawnTrainingDummy` |
| PNJ | `BP_HWEntity`, `BP_HWEntity_AIController` |
| World | `BP_GenerateCity`, `BP_Ville`, `BP_RespawnPoint`, `BP_SpawnerPNJ`, `BP_TargetLocation`, `BP_Door`, `BP_SplineMesh` |
| PCG | `BP_BiomeGenerator`, `BP_PCGManager` |
| Portails | `BP_BoxPortal` |
| Interactables | `BP_Container`, `BP_Door`, `BP_DoorPortal`, `BP_SupplyPod01` |
| Combat | `BP_HitBoxActor`, `BP_HWObject` |
| Projectiles | `BP_BowProjectile`, `BP_FireProjectile01`, `BP_IceProjectile01` |
| Login | `BP_LoginGameMode`, `BP_LoginPlayerController` |

---

### nativize_all.py — Batch parallèle

**Chemin** : `Scripts/nativize_all.py`

Charge **toutes les cibles simultanément** et appelle `run_nativization_for_all_objects()` en une passe. Plus rapide que `nativize_batch.py` mais potentiellement moins stable.

```bash
UnrealEditor-Cmd.exe "Project.uproject" \
    -ExecutePythonScript="Scripts/nativize_all.py" \
    -nullrhi -nosplash -unattended
```

Logue séparément les échecs de chargement (`FAILED: <chemin>`).

---

### nativize_all.sh — Un processus par BP

**Chemin** : `Scripts/nativize_all.sh`

Script Bash Windows (Git Bash / MSYS2) qui lance **un processus `UnrealEditor-Cmd.exe` distinct par Blueprint** pour garantir l'isolation maximale. Vérifie la réussite en cherchant `CONVERTED` dans le fichier log.

```bash
bash Scripts/nativize_all.sh
```

| Variable | Défaut |
|---|---|
| `UE` | `H:/Unreal Engine/UE_5.4/Engine/Binaries/Win64/UnrealEditor-Cmd.exe` |
| `PROJ` | `H:/HybeliorWorld_Project/HybeliorWorld_5.4/HybeliorWorld_5.4.uproject` |
| `SCRIPT` | `Scripts/nativize_one.py` |

Traite 29 Blueprints (liste `nativize_batch.py` moins Login). Résumé final `OK` / `FAILED` par BP.

---

## Réorganisation du Content Browser

### run_asset_reorganize.ps1

**Chemin** : `run_asset_reorganize.ps1` (racine UE)

Réorganise la structure du Content Browser en déplaçant les Blueprints depuis `/Game/BP/` vers une structure par catégorie. Les opérations s'effectuent via HTTP POST vers le **plugin UnrealMCP C++** (port `3001`, distinct du Python MCP sur `3000`).

> **Prérequis** : Plugin UnrealMCP C++ compilé + éditeur UE5 ouvert + serveur actif sur `http://127.0.0.1:3001`.

**Opérations** :

| Catégorie | Assets | Destination |
|---|---|---|
| Character | `BP_PlayerCharacter_CE`, `BP_PlayerCharacter` (archivé) | `/Game/Character/`, `/Game/_Archive/OldBlueprints/` |
| Controllers | `BP_PlayerController`, `BP_EntityPlayerController` | `/Game/Game/` |
| GameMode | `BP_HybeliorGameMode` | `/Game/Game/` |
| Entity AI | `BP_HWAIController`, `BP_TestEntityAIController`, BB/BT/services/tasks | `/Game/Blueprints/Entity/` |
| Entity | `BP_TestEntity`, `BP_SpawnTrainingDummy`, `BP_EntitySpawner`, `BP_EntityPoolManager` | `/Game/Blueprints/Entity/` |
| Entity | `BP_HWEntity`, `BP_HWEntity_AIController`, `BB_General`, `BT_PNJ_General` | `/Game/Blueprints/Entity/` |
| Login | `/Game/BP/Login/` | `/Game/UI/Login/` |

**Exécution** :
```powershell
powershell -ExecutionPolicy Bypass -File "H:\HybeliorWorld_Project\HybeliorWorld_5.4\run_asset_reorganize.ps1"
```

Ou :
```powershell
Set-ExecutionPolicy Bypass -Scope Process
& "H:\HybeliorWorld_Project\HybeliorWorld_5.4\run_asset_reorganize.ps1"
```

**Rapport** :
- `[OK]  <Label>` vert — réussite
- `[FAIL] <Label> : <message>` rouge — échec
- `[ERR] <Label> : <message>` jaune — erreur réseau

**Effets** :
- Déplace des assets (équivalent "Rename Asset" / "Move To Folder")
- Références internes mises à jour automatiquement par UE5
- Redirectors à nettoyer via `Tools > Fix Up Redirectors in Folder`

---

## Voir aussi

- [[Python Scripts]] — indexe les cinq scripts de nativisation (`nativize_bp.py`, `nativize_all.py`, `nativize_batch.py`, `nativize_one.py`, `nativize_all.sh`) dans la catégorie « Nativisation » sous `Scripts/`.
- [[Blueprint Export Tools]] — décrit `export_full_bp.py` (`Scripts/export_full_bp.py`) dont la sortie JSON sert de check avant la nativisation des 32 Blueprints listés dans `nativize_batch.py`.
- [[MCP Integration]] — documente le plugin UnrealMCP C++ sur le port `3001` appelé en HTTP POST par `run_asset_reorganize.ps1` pour déplacer les assets `/Game/BP/` vers `/Game/Character/`, `/Game/Blueprints/Entity/`, `/Game/UI/Login/`.
