# Worker « hybelior-tiles »

Source du Cloudflare Worker qui sert **https://hybelior-tiles.nicolas-vollard.workers.dev** —
le proxy public, lecture seule, du bucket R2 `hybelior-tiles`.

C'est lui qui alimente :

| Chemin | Contenu | Consommé par |
| --- | --- | --- |
| `/HybeliorMap.dzi` | descripteur deep-zoom (XML) | `js/map.js` (OpenSeadragon), `js/monde.js` (fond de carte) |
| `/HybeliorMap_files/{niveau}/{x}_{y}.jpeg` | ~207k tuiles (~777 Mo) | idem |
| `/audio/chronique-XX.mp3` | narrations des Chroniques | lecteur audio du site |

## Ce que fait le Worker

- **CORS ouvert** (`Access-Control-Allow-Origin: *`) — requis par `crossOriginPolicy:
  'Anonymous'` d'OpenSeadragon (rendu WebGL) et par `Image.crossOrigin` dans `monde.js`.
- **Requêtes Range** (206) — pour chercher/reprendre dans les MP3.
- **304 / ETag** — revalidation navigateur sans re-téléchargement.
- **Cache** : tuiles `immutable` 1 an, audio 24 h, `.dzi` 1 h. Le cache edge
  (Cache API) est armé mais reste un no-op tant que le Worker vit sur
  `*.workers.dev` ; il prendra effet si un domaine custom est posé un jour.
- `GET`/`HEAD`/`OPTIONS` uniquement — aucune écriture possible via le Worker.

## Déployer

```bash
cd worker
npx wrangler deploy        # remplace le Worker actuellement en ligne
```

Le `name` de `wrangler.toml` doit rester `hybelior-tiles` : c'est lui qui fixe
l'URL `hybelior-tiles.nicolas-vollard.workers.dev` câblée dans le site
(`js/map.js`, `js/monde.js`, `sw.js`, CSP de `vercel.json`). Le bucket R2 est
lié en lecture via le binding `BUCKET` — rien d'autre à configurer.

## Alimenter le bucket

- **Tuiles** : générées localement dans `HybeliorFull/` (non versionné, voir
  `.gitignore`), poussées via `rclone` vers le bucket `hybelior-tiles`.
- **Audio** : `bash scripts/audio-merge-and-upload.sh <chapitre> <part>`
  (concatène les parts ElevenLabs puis `wrangler r2 object put`).

## Vérifier après déploiement

```bash
curl -sI https://hybelior-tiles.nicolas-vollard.workers.dev/HybeliorMap.dzi
# → 200, Content-Type: application/xml, Access-Control-Allow-Origin: *

curl -sI https://hybelior-tiles.nicolas-vollard.workers.dev/HybeliorMap_files/0/0_0.jpeg
# → 200, Cache-Control: public, max-age=31536000, immutable

curl -sI -H 'Range: bytes=0-1023' \
  https://hybelior-tiles.nicolas-vollard.workers.dev/audio/chronique-01.mp3
# → 206, Content-Range: bytes 0-1023/…
```
