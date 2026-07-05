/**
 * Router SPA hash-based pour Hybelior
 * Routes : NavConfig.routes() (ex: #accueil, #lore, #implementation/combat)
 *
 * Format des routes :
 *   #route                — page principale, sous-onglet par défaut
 *   #route/subkey         — page principale + sous-onglet `subkey`
 *   #anchor               — ancre dans la page courante
 */

const Router = {
    defaultRoute: 'accueil',
    container: null,
    currentRoute: null,
    currentSubkey: null,
    cache: {},

    routes() {
        return window.NavConfig ? window.NavConfig.routes() : [
            'accueil', 'vision', 'monde', 'mecaniques', 'systemes',
            'implementation', 'lore', 'carte', 'frise',
        ];
    },

    init() {
        this.container = document.getElementById('page-container');
        window.addEventListener('hashchange', () => this.navigate());
        this.navigate();
    },

    /** Parse `#route/subkey` → { route, subkey } */
    parseHash() {
        const raw = window.location.hash.slice(1);
        if (!raw) return { route: this.defaultRoute, subkey: null, anchor: null, mdPath: null };

        // Route spéciale `#md/{path/to/file.md}` : rendu direct d'un .md
        // arbitraire (utilisée notamment par la recherche globale pour atteindre
        // les fiches catalogues qui ne sont pas dans nav-config).
        if (raw.startsWith('md/')) {
            return { route: 'md', subkey: null, anchor: null, mdPath: decodeURIComponent(raw.slice(3)) };
        }

        const [first, ...rest] = raw.split('/');
        const known = this.routes();
        if (known.includes(first)) {
            return { route: first, subkey: rest.length ? rest.join('/') : null, anchor: null, mdPath: null };
        }
        // Pas une route connue → traité comme ancre dans la page courante
        return { route: null, subkey: null, anchor: raw, mdPath: null };
    },

    async navigate() {
        const parsed = this.parseHash();

        // Cas ancre in-page
        if (parsed.anchor) {
            const el = document.getElementById(parsed.anchor);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }

        // Cas spécial : rendu direct d'un .md via #md/path
        if (parsed.mdPath && window.MdRenderer) {
            this.container.className = 'page-container page-md';
            this.container.innerHTML = '<div class="page-content"><div class="md-content"></div></div>';
            const mdContainer = this.container.querySelector('.md-content');
            await MdRenderer.render(mdContainer, parsed.mdPath);
            this.currentRoute = 'md';
            this.currentSubkey = parsed.mdPath;
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Highlight Lore en top-nav (les .md sont du lore au sens large)
            document.querySelectorAll('.nav-links > li > a').forEach(a => {
                const linkRoute = (a.getAttribute('href') || '').replace(/^#/, '').split('/')[0];
                a.classList.toggle('active', linkRoute === 'lore');
            });
            return;
        }

        const route = parsed.route || this.defaultRoute;
        const subkey = parsed.subkey;

        // Update nav active state (lien principal).
        // Quand on navigue vers une sous-route lore (vision, monde, mecaniques,
        // systemes, histoires), c'est l'onglet "Lore" qui doit rester actif.
        const loreSubroutes = (window.NavConfig && window.NavConfig.loreSubroutes) || [];
        document.querySelectorAll('.nav-links > li > a').forEach(a => {
            const linkRoute = (a.getAttribute('href') || '').replace(/^#/, '').split('/')[0];
            const isActive = linkRoute === route ||
                             (linkRoute === 'lore' && loreSubroutes.includes(route));
            a.classList.toggle('active', isActive);
        });

        // Sync dropdown active state
        if (window.NavDropdowns) NavDropdowns.setActive(route, subkey);

        // Si on est déjà sur la route mais avec un nouveau subkey
        if (route === this.currentRoute) {
            if (subkey && subkey !== this.currentSubkey) {
                this.currentSubkey = subkey;
                this._activateSubtab(route, subkey);
            } else if (!subkey) {
                // Même page, scroll en haut
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        // Charger le contenu de la page
        try {
            if (!this.cache[route]) {
                const resp = await fetch(`/pages/${route}.html`);
                if (!resp.ok) throw new Error(`Page introuvable: ${route}`);
                this.cache[route] = await resp.text();
            }

            // Détache le surlignage de la page précédente (sera réattaché si la
            // nouvelle page rend du markdown via MdRenderer).
            if (window.Highlights) Highlights.detach();

            this.container.className = 'page-container page-' + route;
            this.container.innerHTML = `<div class="page-content">${this.cache[route]}</div>`;
            this.currentRoute = route;
            this.currentSubkey = subkey;

            window.scrollTo({ top: 0, behavior: 'instant' });

            // Réinitialiser la nav des sous-onglets globaux (sidebar)
            const globalNav = document.getElementById('global-subtab-nav');
            if (globalNav) globalNav.innerHTML = '';

            // Pré-positionner le subkey demandé pour que les pages le lisent
            window._pendingSubkey = subkey;

            // Réexécuter les scripts inline
            this.container.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                oldScript.replaceWith(newScript);
            });

            // Auto-init carte
            if (route === 'carte' && typeof window.initMap === 'function') {
                window.initMap();
            }

            // Show/hide lore search
            const loreSearchEl = document.getElementById('lore-search-wrapper');
            if (loreSearchEl) {
                loreSearchEl.style.display = (route === 'lore') ? '' : 'none';
                if (route === 'lore' && window.LoreSearch) LoreSearch.load();
            }

            // Pages sans sous-onglets : construire le TOC à partir de la page directement
            if (!window.NavConfig || !NavConfig.hasSubtabs(route)) {
                if (window.SidebarTOC) {
                    const sidebar  = document.getElementById('site-sidebar');
                    const content  = this.container.querySelector('.page-content');
                    if (sidebar && content) {
                        setTimeout(() => SidebarTOC.build(sidebar, content), 50);
                    }
                }
            }

            // Si on a un subkey, on s'assure de l'activer une fois les scripts ayant initialisé les sous-onglets
            if (subkey) {
                setTimeout(() => this._activateSubtab(route, subkey), 60);
            }

        } catch (err) {
            this.container.innerHTML = `
                <div class="page-content">
                    <div class="placeholder">
                        <div class="placeholder-icon">⚠</div>
                        <p>Erreur de chargement</p>
                    </div>
                </div>`;
            console.error(err);
        }
    },

    /**
     * Active un sous-onglet en délégant au moteur correspondant.
     * Le router ne sait pas quel moteur utiliser pour quelle route, donc il
     * essaie les deux (MdRenderer + SubTabs) avec l'instanceId == route.
     */
    _activateSubtab(route, subkey) {
        if (!subkey) return;
        if (window.MdRenderer && typeof MdRenderer.go === 'function') {
            if (MdRenderer.go(route, subkey)) return;
        }
        if (window.SubTabs && typeof SubTabs.go === 'function') {
            SubTabs.go(route, subkey);
        }
    },
};

// ── Mobile sidebar drawer ────────────────────────────────────────────────
// Sur mobile, le sidebar est masqué par défaut. Un bouton hamburger l'ouvre,
// un backdrop semi-transparent le ferme. Toute navigation referme aussi.
const SidebarDrawer = {
    init() {
        const toggle   = document.getElementById('sidebar-toggle');
        const close    = document.getElementById('sidebar-close');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (!toggle) return;

        const open = () => {
            document.body.classList.add('sidebar-open');
            toggle.setAttribute('aria-expanded', 'true');
        };
        const dismiss = () => {
            document.body.classList.remove('sidebar-open');
            toggle.setAttribute('aria-expanded', 'false');
        };

        toggle.addEventListener('click', open);
        if (close)    close.addEventListener('click', dismiss);
        if (backdrop) backdrop.addEventListener('click', dismiss);

        // Fermer quand on clique un lien à l'intérieur du sidebar (sauf header/cards
        // qui ne mènent pas ailleurs).
        const sidebar = document.getElementById('site-sidebar');
        if (sidebar) {
            sidebar.addEventListener('click', e => {
                const a = e.target.closest('a[href^="#"]');
                if (a) dismiss();
            });
        }

        // Fermer aussi à chaque hashchange (navigation top-nav, deep links, etc.)
        window.addEventListener('hashchange', dismiss);

        // Escape ferme le drawer
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && document.body.classList.contains('sidebar-open')) dismiss();
        });
    },
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.NavDropdowns) NavDropdowns.init();
    SidebarDrawer.init();
    Router.init();
});
