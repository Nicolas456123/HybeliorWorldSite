/**
 * Router SPA hash-based pour Hybélior
 * Routes : #accueil, #carte, #lore, #gameplay
 */

const Router = {
    routes: ['accueil', 'carte', 'lore', 'gameplay'],
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
        return this.routes.includes(hash) ? hash : this.defaultRoute;
    },

    async navigate() {
        const route = this.getRoute();
        if (route === this.currentRoute) return;

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
