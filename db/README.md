# Le graphe de connaissances canonique d'Hybélior

Le **site est la source de vérité unique** de l'univers. Chaque information
(personne, empire, ville, événement, concept, religion, espèce, objet…)
n'existe qu'à **un seul endroit** — une ligne du graphe — et est *projetée*
partout ailleurs : fiche, chronologie, arbre, liste de dirigeants, carte.
La non-duplication n'est pas une discipline : elle est structurelle.

```
      TU ÉDITES DANS L'ATELIER            STOCKÉ                 PROJETÉ
   ┌───────────────────────────┐   ┌──────────────────┐   ┌──────────────────┐
   │  /atelier.html            │   │  Turso (prod)    │   │  Fiche            │
   │  (éditeur + projections)  │──▶│  node:sqlite(dev)│──▶│  Chronologie      │
   │  privé, pour l'auteur      │   │  = MÊME schéma    │   │  Dirigeants       │
   └───────────────────────────┘   └──────────────────┘   │  Cohérence        │
              │  /api/kg (lib/kg-core.js)                  └──────────────────┘
```

## Les pièces

| Fichier | Rôle |
|---|---|
| `lib/kg-core.js` | **Le cœur** — schéma, catalogues, validation, cohérence, projections. Backend-agnostique. Toute la logique vit ici, écrite une seule fois. |
| `lib/turso-adapter.js` | Adaptateur de stockage Turso (production, via HTTP). |
| `lib/sqlite-adapter.js` | Adaptateur `node:sqlite` (dev + seed). Le **même SQL** que Turso. |
| `api/kg.js` | Fonction serverless Vercel — route les lectures/écritures, protège par mot de passe. |
| `server.js` | Serveur de dev — expose `/api/kg` sur `node:sqlite`. |
| `atelier.html` + `js/atelier.js` | L'Atelier : l'interface d'édition et de consultation. |
| `scripts/migrate-kg.js` | Seed initial depuis `data/timeline-names.json`. |
| `db/schema.sql` | Instantané lisible du schéma (régénéré par `npm run kg:schema`). |

## Le modèle

- **Identité stable** : chaque entité a un `id` opaque et permanent (`per-0001`,
  `pol-0042`…), **jamais** son nom d'affichage. Renommer une entité ne casse
  aucune référence — c'est ce qui protège les renommages et les homonymies.
- **Noms datés** (`kg_aliases`) : un nom a une période de validité (`from_year`,
  `to_year`) et un statut (`visible`, `predecessor`, `vanished`…).
- **Faits datés** (`kg_facts`) : naissance, mort, règne, fondation, chute,
  frontière… avec date-objet (`start_year`, `precision`, `circa`), ordre de
  départage (`seq`), provenance (`source_id`) et statut épistémique.
- **Relations** (`kg_relations`) typées et dirigées, saisies une seule fois
  (l'arête inverse est calculée à la projection).
- **Mystères protégés** : entités `question` portant plusieurs **lectures
  concurrentes** (`kg_readings`) qu'on ne collapse jamais en un fait unique.
- **Statut épistémique** partout : `canon` › `lecture-disputee` › `rumeur` ›
  `retconne`. Le graphe dit ce qu'on sait *et* à quel degré.

## Cohérence garantie

L'onglet **Cohérence** (et `getConsistencyReport`) scanne tout le graphe :
intégrité référentielle (aucun lien vers le vide), cohérence de vie (nul ne
meurt avant de naître), continuité des successions (ni trou ni chevauchement),
provenance du canon, sanctuaire des mystères. Une contradiction est *visible*,
jamais silencieuse.

## Lancer en local

```bash
npm run dev              # sert le site + /api/kg sur node:sqlite (local-kg.sqlite)
npm run kg:migrate       # (optionnel) seed depuis timeline-names.json  [--reset]
# ouvrir http://localhost:3001/atelier.html  — mot de passe : EDITOR_PASSWORD (défaut « local »)
```

## Production (Vercel + Turso)

Variables d'environnement : `TURSO_URL`, `TURSO_AUTH_TOKEN`, `EDITOR_PASSWORD`.
Le schéma se crée tout seul au premier appel (`initSchema`). Pour semer la base
Turso, lancer la migration avec ces variables présentes.

> Le graphe est **privé** : l'Atelier et l'API `/api/kg` exigent le mot de passe
> (en-tête `X-Editor-Password` en lecture, corps en écriture).
