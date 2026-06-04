# Hybélior

Site web interactif dédié à l'univers d'Hybélior : carte du monde, chronologie, lore et gameplay.

## Architecture

Le site est une **Single Page Application** (SPA) avec routage par hash (`#accueil`, `#carte`, `#lore`, `#gameplay`, `#apprentissage`, `#frise`). Les pages sont chargées dynamiquement dans `index.html` depuis le dossier `pages/`.

### Structure du projet

```
index.html              – Point d'entrée SPA
server.js               – Serveur Node.js de développement (port 3001)
vercel.json             – Configuration de déploiement Vercel
js/
  router.js             – Routeur SPA hash-based
  map.js                – Carte interactive (OpenSeadragon, frontières, timeline)
  lore-reader.js        – Lecteur modal de contenu lore (Markdown)
  subtabs.js            – Navigation par sous-onglets
css/
  style.css             – Styles principaux
  map_adapted.css       – Styles spécifiques à la carte
pages/                  – Pages HTML chargées dynamiquement
  accueil.html          – Page d'accueil
  carte.html            – Carte interactive
  frise.html            – Frise chronologique
  lore.html             – Hub lore (sous-onglets : chronologie, cosmo, géo, religions, histoires)
  gameplay.html         – Hub gameplay (sous-onglets : combat, magie, métiers, progression, monde)
  apprentissage.html    – Section apprentissage
api/                    – Routes serverless Vercel
  auth.js               – Authentification éditeur
  borders.js            – CRUD frontières (Turso DB)
  overrides.js          – Surcharges lore/entités
  timeline.js           – Données de la timeline
scripts/                – Scripts de génération et peuplement de données
data/                   – Données de référence (timeline, noms historiques)
Data/                   – Fichiers CSV (continents, pays, régions, villes, capitales)
Docs/Lore/              – MIROIR du contenu lore (auto-généré, voir ci-dessous)
HybeliorFull/           – Tuiles Deep Zoom pour OpenSeadragon
Font/ & fonts/          – Polices personnalisées
```

## Fonctionnalités principales

### Carte interactive
- Rendu multi-couches basé sur [OpenSeadragon](https://openseadragon.github.io/) avec tuiles Deep Zoom
- Affichage adaptatif au zoom : continents → pays → régions → villes
- Système de frontières avec dessin, surbrillance et couleurs par pays
- Navigation temporelle avec slider par année et transitions entre ères
- Mode plein écran natif

### Frise chronologique
- Couvre ~10 200 ans d'histoire avec 63 civilisations disparues
- Slider par année avec résolution dynamique des noms par époque
- Lignées de civilisations et régimes politiques

### Lore
- Lecteur modal avec support Markdown (marked.js)
- Sous-sections : chronologie, cosmogonie, géographie, religions, histoires
- Préparation centralisée du contenu via `js/lore-content.js` :
  - retrait des sections **éditoriales internes** (`## Cadre interne — Patterns`,
    `## Données canoniques`) qui ne doivent jamais être servies au lecteur ;
  - sanitization du HTML rendu via [DOMPurify](https://github.com/cure53/DOMPurify).

### Gameplay
- Documentation du système de jeu : combat, magie, métiers, progression, monde

## Source du contenu Lore

> ⚠️ **Important** : `Docs/Lore/` est un **miroir auto-généré**.
>
> La **source de vérité** du lore est dans `H:/HybeliorWorld_Project/Documentation/Lore/`.
> Avant chaque déploiement Vercel, lancer le script de synchronisation :
>
> ```powershell
> H:\HybeliorWorld_Project\Documentation\sync-docs.ps1
> ```
>
> Le miroir local est exclu du git. Voir `Documentation/README.md` pour plus de détails.

## Lancer en local

```bash
node server.js
```

Le serveur démarre sur `http://localhost:3001`. Il fournit un fallback local (`local-db.json`) pour les API qui utilisent Turso en production.

Alternativement, ouvrir `index.html` directement dans un navigateur fonctionne pour la carte et la navigation, mais les fonctionnalités nécessitant les API (frontières, timeline DB) ne seront pas disponibles.

## Déploiement

Le site est déployé sur **Vercel** avec des fonctions serverless pour les routes `/api/*`. La base de données **Turso** stocke les frontières et les données de timeline.

## Qualité & CI

- **Lint** : `npm run lint` (ESLint, config plate `eslint.config.js`). Les règles
  « attrape-bug » sont en avertissement le temps de nettoyer la base existante.
- **Format** : `npm run format` / `npm run format:check` (Prettier).
- **CI** (`.github/workflows/ci.yml`) à chaque push/PR :
  - vérification de syntaxe Node sur le JS (`node --check`),
  - validation de tous les JSON suivis (`scripts/validate-json.js`),
  - ESLint (informatif).

## Dépendances

- [OpenSeadragon](https://openseadragon.github.io/) – Zoom et navigation sur la carte
- [marked.js](https://marked.js.org/) – Rendu Markdown pour le contenu lore
- [DOMPurify](https://github.com/cure53/DOMPurify) – Sanitization du HTML rendu
- [Turso](https://turso.tech/) (libSQL) – Base de données en production
