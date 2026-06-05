// Hybélior PWA service worker.
// Bumping VERSION invalidates all caches on next visit, forcing a refresh.
const VERSION = '2026-06-05-clean-routes';
const PRECACHE = `hybelior-precache-${VERSION}`;
const RUNTIME  = `hybelior-runtime-${VERSION}`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/css/style.css',
  '/icons/favicon.svg',
  '/icons/favicon-16.png',
  '/icons/favicon-32.png',
  '/icons/apple-touch-icon.png',
  '/js/highlights.js',
  '/js/lore-content.js',
  '/js/lore-reader.js',
  '/js/lore-search.js',
  '/js/map.js',
  '/js/md-renderer.js',
  '/js/nav-config.js',
  '/js/nav-dropdowns.js',
  '/js/router.js',
  '/js/sidebar-tree.js',
  '/js/site-search.js',
  '/js/subtabs.js',
  '/js/timeline-data.js',
  '/openseadragon-bin-5.0.0/openseadragon.min.js',
  '/openseadragon-bin-5.0.0/openseadragon-svg-overlay.js'
];

// Tuiles de carte (Cloudflare Worker) : trop volumineuses, on n'intercepte pas.
const NEVER_INTERCEPT_HOSTS = new Set([
  'hybelior-tiles.nicolas-vollard.workers.dev'
]);

// Endpoints dynamiques : toujours direct réseau (s'il y a du réseau).
const NETWORK_ONLY_PATHS = ['/api/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== PRECACHE && k !== RUNTIME)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (NEVER_INTERCEPT_HOSTS.has(url.host)) return;
  if (url.origin === self.location.origin &&
      NETWORK_ONLY_PATHS.some((p) => url.pathname.startsWith(p))) return;

  // Network-first pour TOUT (HTML, JS, CSS, .md) : on sert toujours la dernière
  // version en ligne, avec repli sur le cache uniquement hors-ligne. L'ancien
  // staleWhileRevalidate servait du contenu périmé même après un hard-refresh.
  event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(RUNTIME);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
    return fresh;
  } catch (err) {
    const cached = await cache.match(req) || await caches.match(req);
    if (cached) return cached;
    const shell = await caches.match('/index.html') || await caches.match('/');
    if (shell) return shell;
    throw err;
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(RUNTIME);
  const cached = await caches.match(req);
  const network = fetch(req)
    .then((resp) => {
      if (resp && (resp.ok || resp.type === 'opaque')) {
        cache.put(req, resp.clone()).catch(() => {});
      }
      return resp;
    })
    .catch(() => cached);
  return cached || network;
}
