/**
 * hybelior-tiles — proxy lecture seule du bucket R2 « hybelior-tiles ».
 *
 * Contenu servi (chemins consommés par le site) :
 *   /HybeliorMap.dzi                        — descripteur deep-zoom (XML)
 *   /HybeliorMap_files/{niveau}/{x}_{y}.jpeg — ~207k tuiles OpenSeadragon
 *   /audio/chronique-XX.mp3                 — narrations des Chroniques
 *
 * Contrat côté site :
 *   - CORS ouvert : js/map.js (crossOriginPolicy 'Anonymous') et js/monde.js
 *     (Image.crossOrigin) exigent Access-Control-Allow-Origin, sinon OSD
 *     retombe sur Canvas2D (~5-10x plus lent) et le fond de carte de monde.html
 *     ne se dessine pas.
 *   - Requêtes Range : indispensables pour chercher/reprendre dans les MP3.
 *   - Cache agressif : les tuiles sont immuables (ré-upload = nouveaux fichiers),
 *     le descripteur et l'audio se revalident plus souvent.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range, ETag',
};

// Repli si l'objet R2 n'a pas de contentType stocké (upload rclone ancien).
const TYPES = {
  dzi: 'application/xml',
  xml: 'application/xml',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  mp3: 'audio/mpeg',
  json: 'application/json',
};

function typePour(cle, stocke) {
  if (stocke && stocke !== 'application/octet-stream') return stocke;
  const ext = cle.slice(cle.lastIndexOf('.') + 1).toLowerCase();
  return TYPES[ext] || 'application/octet-stream';
}

function cachePour(cle) {
  if (cle.startsWith('HybeliorMap_files/')) return 'public, max-age=31536000, immutable';
  if (cle.startsWith('audio/')) return 'public, max-age=86400';
  return 'public, max-age=3600'; // .dzi et divers : revalidation horaire
}

// Range simple « bytes=a-b » → R2Range. Multi-ranges ignorés (réponse 200 pleine).
function parseRange(entete) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(entete || '');
  if (!m || (!m[1] && !m[2])) return undefined;
  if (!m[1]) return { suffix: Number(m[2]) };
  if (!m[2]) return { offset: Number(m[1]) };
  const offset = Number(m[1]);
  const fin = Number(m[2]);
  if (fin < offset) return undefined;
  return { offset, length: fin - offset + 1 };
}

function contentRange(range, taille) {
  let offset, longueur;
  if (range.suffix !== undefined) {
    longueur = Math.min(range.suffix, taille);
    offset = taille - longueur;
  } else {
    offset = range.offset ?? 0;
    longueur = range.length ?? taille - offset;
  }
  const fin = Math.min(offset + longueur, taille) - 1;
  return `bytes ${offset}-${fin}/${taille}`;
}

function entetesPour(objet, cle) {
  const h = new Headers(CORS);
  objet.writeHttpMetadata(h);
  h.set('ETag', objet.httpEtag);
  h.set('Content-Type', typePour(cle, h.get('Content-Type')));
  h.set('Cache-Control', cachePour(cle));
  h.set('Accept-Ranges', 'bytes');
  return h;
}

function refus(statut, texte, extra) {
  return new Response(texte, { status: statut, headers: { ...CORS, ...extra } });
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          ...CORS,
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers':
            request.headers.get('Access-Control-Request-Headers') || 'Range, If-None-Match',
          'Access-Control-Max-Age': '86400',
        },
      });
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return refus(405, 'Méthode non autorisée', { Allow: 'GET, HEAD, OPTIONS' });
    }

    let cle;
    try { cle = decodeURIComponent(new URL(request.url).pathname).slice(1); }
    catch { return refus(400, 'Chemin illisible'); }
    if (!cle) return refus(404, 'Rien ici — voir HybeliorMap.dzi');

    if (request.method === 'HEAD') {
      const objet = await env.BUCKET.head(cle);
      if (!objet) return refus(404, null);
      return new Response(null, { headers: entetesPour(objet, cle) });
    }

    // Cache edge : les 200 stockés répondent aussi aux Range/If-None-Match
    // suivants (le cache Cloudflare découpe et revalide tout seul).
    // NB : no-op sur *.workers.dev — prend effet si un domaine custom est posé.
    const cache = caches.default;
    const enCache = await cache.match(request);
    if (enCache) return enCache;

    const range = parseRange(request.headers.get('Range'));
    let objet;
    try {
      objet = await env.BUCKET.get(cle, { onlyIf: request.headers, range });
    } catch {
      // Range hors de l'objet (offset >= taille) : 416 avec la taille réelle.
      const tete = await env.BUCKET.head(cle);
      if (!tete) return refus(404, 'Introuvable');
      return refus(416, null, { 'Content-Range': `bytes */${tete.size}` });
    }
    if (objet === null) return refus(404, 'Introuvable');

    const entetes = entetesPour(objet, cle);

    // onlyIf non satisfait (If-None-Match du navigateur) : objet sans corps.
    if (objet.body === undefined) return new Response(null, { status: 304, headers: entetes });

    if (objet.range && range) {
      entetes.set('Content-Range', contentRange(objet.range, objet.size));
      return new Response(objet.body, { status: 206, headers: entetes });
    }

    const reponse = new Response(objet.body, { status: 200, headers: entetes });
    ctx.waitUntil(cache.put(request, reponse.clone()));
    return reponse;
  },
};
