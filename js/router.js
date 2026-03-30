/**
 * Router SPA hash-based pour Hybélior
 * Routes : #accueil, #carte, #lore, #gameplay
 */

const Router = {
    routes: ['accueil', 'carte', 'lore', 'gameplay', 'lejeu', 'frise', 'frise-v2', 'lignees'],
    defaultRoute: 'accueil',
    container: null,
    currentRoute: null,
    cache: {},

    init() {
        this.container = document.getElementById('page-container');
        window.addEventListener('hashchange', () => this.navigate());
        this.navigate();
    },

    getRoute() {
        const hash = window.location.hash.slice(1);
        return this.routes.includes(hash) ? hash : (hash ? this.defaultRoute : this.defaultRoute);
    },

    async navigate() {
        const hash = window.location.hash.slice(1);
        const isRoute = this.routes.includes(hash);

        // Ancre in-page : hash non reconnu comme route ET élément existe dans la page
        if (!isRoute && hash) {
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        }

        const route = isRoute ? hash : this.defaultRoute;

        // Même page : remonter en haut (bouton de la page active)
        if (route === this.currentRoute) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Update nav active state
        document.querySelectorAll('.nav-links a').forEach(a => {
            const linkRoute = a.getAttribute('href').slice(1);
            a.classList.toggle('active', linkRoute === route);
        });

        // Load page content
        try {
            if (!this.cache[route]) {
                const resp = await fetch(`/pages/${route}.html`);
                if (!resp.ok) throw new Error(`Page introuvable: ${route}`);
                this.cache[route] = await resp.text();
            }

            // Apply page-specific class
            this.container.className = 'page-container page-' + route;
            this.container.innerHTML = `<div class="page-content">${this.cache[route]}</div>`;
            this.currentRoute = route;

            // Remonter en haut de page à chaque navigation
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Réinitialiser la nav des sous-onglets pour la nouvelle page
            const globalNav = document.getElementById('global-subtab-nav');
            if (globalNav) globalNav.innerHTML = '';

            // Execute any inline scripts in the loaded page
            this.container.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                oldScript.replaceWith(newScript);
            });

            // Auto-init map when navigating to carte
            if (route === 'carte' && typeof window.initMap === 'function') {
                window.initMap();
            }

            // Show/hide lore search
            var loreSearchEl = document.getElementById('lore-search-wrapper');
            if (loreSearchEl) {
                loreSearchEl.style.display = (route === 'lore') ? '' : 'none';
                if (route === 'lore') LoreSearch.load();
            }

            // Pour les pages sans sous-onglets, construire le TOC automatiquement
            const subtabPages = ['lore', 'gameplay', 'lejeu', 'apprentissage'];
            if (!subtabPages.includes(route) && window.SidebarTOC) {
                const sidebar  = document.getElementById('site-sidebar');
                const content  = this.container.querySelector('.page-content');
                if (sidebar && content) {
                    // Petit délai pour laisser le DOM se stabiliser
                    setTimeout(() => SidebarTOC.build(sidebar, content), 50);
                }
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
    }
};

document.addEventListener('DOMContentLoaded', () => Router.init());
