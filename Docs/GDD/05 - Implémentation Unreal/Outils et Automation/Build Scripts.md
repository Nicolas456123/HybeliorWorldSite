---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Build & Infrastructure Scripts

Scripts batch et d'infrastructure pour le démarrage du backend OWS et des outils adjacents.

---

## _RunDotnet.bat — OWSInstanceLauncher

**Chemin** : `OWSInstanceLauncher/_RunDotnet.bat`

Script batch minimal pour démarrer le **OWSInstanceLauncher**, microservice .NET du backend **Open World Server (OWS)**. Ce launcher est responsable du démarrage et de la gestion des instances de serveur de jeu.

### Contenu

```bat
dotnet owsinstancelauncher.dll
```

### Exécution

```bat
cd H:\HybeliorWorld_Project\HybeliorWorld_5.4\OWSInstanceLauncher
_RunDotnet.bat
```

Ou depuis une fenêtre quelconque :
```bat
"H:\HybeliorWorld_Project\HybeliorWorld_5.4\OWSInstanceLauncher\_RunDotnet.bat"
```

### Prérequis

- SDK .NET (version compatible OWS) installé et accessible via `PATH`
- Fichier `owsinstancelauncher.dll` présent dans `OWSInstanceLauncher/`

### Effets

- Lance un processus .NET en arrière-plan (`owsinstancelauncher.dll`)
- Ne modifie aucun fichier du projet
- Arrêt : `Ctrl+C` dans la fenêtre, ou kill `dotnet` via le Gestionnaire des tâches

---

## Pipeline de démarrage OWS (vue d'ensemble)

```
Démarrage manuel
  └─► _RunDotnet.bat
       └─► dotnet owsinstancelauncher.dll
            └─► OWSInstanceLauncher (service .NET)
                 ├─► Connexion OWS API REST
                 ├─► Gestion des instances de monde
                 └─► Spawn UE5 dedicated servers à la demande
```

Le OWSInstanceLauncher communique avec l'API OWS pour recevoir les demandes de spawn d'instances de serveur de jeu. Il lance ensuite les processus `UnrealServer.exe` avec les bons arguments (port, map, zone ID) et surveille leur santé.

---

## Scripts hors dépôt UE

Certains scripts vivent dans des projets adjacents au dépôt UE5 :

| Script | Projet parent | Rôle |
|---|---|---|
| `gen-sql.js` | `HybeliorWorldSite/scripts/` | Génère des instructions SQL |
| `_RunDotnet.bat` | `OWSInstanceLauncher/` | Couvert ci-dessus |

---

## Prérequis globaux

### OWS Backend

- **.NET Runtime** installé
- Fichiers DLL OWS compilés dans `OWSInstanceLauncher/`
- Connexion réseau vers l'API OWS (local ou distant)

### Site web (contexte build)

- Node.js installé (pour les scripts de build du site)
- Variables d'environnement `TURSO_URL`, `TURSO_AUTH_TOKEN` pour les déploiements prod

---

## Voir aussi

- [[MCP Integration]] — distingue le plugin UnrealMCP C++ (port `3001`) et le serveur Python (`unreal_mcp_server.py`, port `3000`) utilisés en parallèle du workflow de démarrage OWS documenté ici (`_RunDotnet.bat` → `dotnet owsinstancelauncher.dll`).
