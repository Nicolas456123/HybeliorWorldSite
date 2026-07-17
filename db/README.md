# Le graphe de connaissances canonique d'Hybélior

Le **site est la source de vérité unique** de l'univers. Chaque information
(personne, empire, ville, événement, concept, religion, espèce, objet…)
n'existe qu'à **un seul endroit** — un enregistrement du graphe — et est
*projetée* partout ailleurs : fiche, chronologie, arbre, liste de dirigeants,
carte. La non-duplication n'est pas une discipline : elle est structurelle.

## Modèle base ⊕ overlay

```
   data/kg-base.json              overlay (Turso)             projections
   ┌────────────────────┐   ┌────────────────────────┐   ┌──────────────────┐
   │ TOUTES les données │   │ UNIQUEMENT ce qui est  │   │ Fiche            │
   │ de base, committées│ ⊕ │ créé / édité / supprimé│ → │ Chronologie      │
   │ dans le repo       │   │ APRÈS coup (+ tombst.) │   │ Dirigeants/Arbre │
   └────────────────────┘   └────────────────────────┘   │ Carte / Cohérence│
        servi direct              écriture seule          └──────────────────┘
                    fusionnés en mémoire (lib/kg-core.js, JS pur)
```

- **`data/kg-base.json`** est committé : les données sont **sur le site
  directement**. Les **lectures fonctionnent sans Turso**.
- **Turso** ne stocke QUE la surcouche — les modifications faites ensuite.
  Un magasin générique `id → enregistrement` + des *tombstones* de suppression.
- **Lecture** = base ⊕ overlay fusionnés en mémoire ; **écriture** = overlay seul.
- **Aucun mot de passe** : accès direct (outil personnel).

## Les pièces

| Fichier | Rôle |
|---|---|
| `lib/kg-core.js` | **Le cœur** — moteur de graphe en mémoire (JS pur) : catalogues, validation, cohérence, projections, fusion base ⊕ overlay. Aucun SQL. |
| `lib/kg-overlay-turso.js` | Magasin de surcouche Turso (`kg_overlay` + `kg_deletes`). |
| `lib/kg-overlay-file.js` | Magasin de surcouche en dev (fichier `local-kg-overlay.json`). |
| `lib/turso-adapter.js` | Exécuteur SQL Turso (via HTTP) utilisé par le magasin overlay. |
| `api/kg.js` | Fonction serverless Vercel — fusionne base + overlay, projette / écrit. |
| `server.js` | Serveur de dev — expose `/api/kg` (overlay fichier). |
| `atelier.html` + `js/atelier.js` | L'Atelier : édition + consultation, sans verrou. |
| `scripts/migrate-kg.js` | Génère `data/kg-base.json` (`npm run kg:build`). |
| `db/schema.sql` | Le schéma de l'overlay Turso. |

## Le modèle

- **Identité stable** : chaque entité a un `id` opaque et permanent (`per-0001`,
  `pol-0042`…), **jamais** son nom d'affichage. Renommer ne casse aucune
  référence — c'est ce qui protège les renommages et les homonymies. Les faits,
  relations, alias et lectures ont aussi des ids stables (`fac-`, `rel-`, `ali-`,
  `rea-`), pour que l'overlay puisse en éditer/supprimer un de la base.
- **Noms datés** (aliases) : période de validité (`from_year`, `to_year`) + statut.
- **Faits datés** : naissance, mort, règne, fondation, chute, frontière… avec
  date-objet (année, précision, `circa`), ordre de départage (`seq`), provenance
  et statut épistémique.
- **Relations** typées et dirigées, saisies une fois (arête inverse projetée).
- **Mystères protégés** : entités `question` à **lectures concurrentes**, jamais
  aplaties en un fait unique.
- **Statut épistémique** partout : `canon` › `lecture-disputee` › `rumeur` › `retconne`.

## Projections

- **Fiche** — alias, faits, relations, lectures agrégés à la lecture.
- **Chronologie** — tous les faits triés par (date, seq).
- **Dirigeants** — *calculés* depuis les faits « regne » (trous/chevauchements).
- **Arbre généalogique** — ascendance/descendance via « parent-de », conjoints, vies.
- **Cohérence** — intégrité référentielle, cohérence de vie, continuité des
  successions, provenance, sanctuaire des mystères. Une contradiction est *visible*.
- **Timeline** (`action=timeline`) — reconstruit la forme year-based de
  `timeline-names.json` depuis le graphe ; la **carte** (`js/map.js`) la consomme
  en source primaire, avec repli sur `data/timeline-names.json`.

  > La **frise** reste sur ses données statiques (jeu d'ères et coordonnées
  > distincts) — réconciliation reportée pour ne pas casser l'existant.

## Lancer en local

```bash
npm run kg:build   # (re)génère data/kg-base.json depuis timeline-names + canon
npm run dev        # sert le site + /api/kg (overlay = local-kg-overlay.json)
# ouvrir http://localhost:3001/atelier.html   — accès direct, sans mot de passe
```

## Production (Vercel)

`data/kg-base.json` est servi tel quel : **les lectures marchent sans configurer
Turso**. Pour activer les **écritures**, définir `TURSO_URL` et `TURSO_AUTH_TOKEN`
côté Vercel — les tables d'overlay se créent seules au premier appel. Sans Turso,
`/api/kg` reste en **lecture seule** (les POST renvoient 503).

> ⚠ Sans mot de passe, l'API d'écriture est ouverte à qui connaît l'URL. Outil
> personnel assumé ; pour re-protéger, on peut ré-introduire un secret côté POST.
