/**
 * sidebar-lore-nav.js — Quick-nav Lore en haut du sidebar.
 *
 * Sur les routes Lore (loreSubroutes), affiche un menu compact des 8
 * catégories thématiques (icon + label). Quand on est sur une page,
 * la catégorie active est mise en évidence et ses sous-liens sont
 * dépliés ; les autres restent collapse (juste icon + label).
 *
 * Données : NavConfig.loreCategories
 * Cible : <aside id="site-sidebar"> (au-dessus du TOC).
 */

(function () {
    'use strict';

    const SidebarLoreNav = {
        _container: null,

        init() {
            if (!window.NavConfig || !Array.isArray(NavConfig.loreCategories)) return;
            const sidebar = document.getElementById('site-sidebar');
            if (!sidebar) return;

            // Crée le conteneur juste après lore-search-wrapper, avant le reste.
            this._container = document.createElement('div');
            this._container.id = 'sidebar-lore-nav';
            this._container.className = 'sidebar-lore-nav';
            this._container.hidden = true;

            const searchWrap = sidebar.querySelector('#lore-search-wrapper');
            if (searchWrap && searchWrap.nextSibling) {
                sidebar.insertBefore(this._container, searchWrap.nextSibling);
            } else if (searchWrap) {
                sidebar.appendChild(this._container);
            } else {
                sidebar.insertBefore(this._container, sidebar.firstChild);
            }

            // Rendu initial + hashchange
            this.render();
            window.addEventListener('hashchange', () => this.render());
        },

        /** Détermine si la route courante mérite la quick-nav. */
        _shouldShow(route) {
            const subs = (NavConfig.loreSubroutes || []);
            return route === 'lore' || subs.includes(route);
        },

        /** Récupère la route + subkey courants depuis le hash. */
        _currentRouteAndSubkey() {
            const raw = window.location.hash.slice(1);
            if (!raw) return { route: 'accueil', subkey: null };
            const parts = raw.split('/');
            return { route: parts[0], subkey: parts.slice(1).join('/') || null };
        },

        render() {
            const { route, subkey } = this._currentRouteAndSubkey();
            if (!this._shouldShow(route)) {
                this._container.hidden = true;
                this._container.innerHTML = '';
                return;
            }
            this._container.hidden = false;

            const activeCat = NavConfig.findLoreCategory(route, subkey);
            const activeHash = '#' + route + (subkey ? '/' + subkey : '');

            let html = '<div class="sidebar-lore-nav-title">Parcourir le lore</div>';
            html += '<ul class="sidebar-lore-nav-list">';

            for (const cat of NavConfig.loreCategories) {
                const isActive = activeCat && activeCat.key === cat.key;
                const firstHref = cat.links[0] ? cat.links[0].href : '#lore';
                html += '<li class="sidebar-lore-nav-item' + (isActive ? ' active' : '') + '">';
                html += '  <a class="sidebar-lore-nav-head" href="' + firstHref + '">';
                html += '    <span class="sidebar-lore-nav-icon" aria-hidden="true">' + cat.icon + '</span>';
                html += '    <span class="sidebar-lore-nav-label">' + cat.label + '</span>';
                html += '  </a>';
                if (isActive) {
                    html += '  <ul class="sidebar-lore-nav-sublinks">';
                    for (const link of cat.links) {
                        const linkActive = link.href === activeHash;
                        html += '    <li><a href="' + link.href + '"' +
                                (linkActive ? ' class="active"' : '') + '>' +
                                this._escape(link.label) + '</a></li>';
                    }
                    html += '  </ul>';
                }
                html += '</li>';
            }
            html += '</ul>';
            this._container.innerHTML = html;
        },

        _escape(s) {
            const d = document.createElement('div');
            d.textContent = s == null ? '' : String(s);
            return d.innerHTML;
        },
    };

    window.SidebarLoreNav = SidebarLoreNav;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SidebarLoreNav.init());
    } else {
        SidebarLoreNav.init();
    }
})();
