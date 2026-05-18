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

        /** Rendu spécifique aux routes nation/histoires : continents groupant les nations. */
        _renderNationNav(route, subkey) {
            if (!Array.isArray(NavConfig.nationContinents)) return '';

            // Continent actif : déduit de la nation courante si on est sur #nation/<slug>,
            // ou null si on est sur la landing #histoires/histoires.
            let activeContinentKey = null;
            let activeNation = null;
            if (route === 'nation' && subkey) {
                const meta = NavConfig.findNationBySlug(subkey);
                if (meta) {
                    activeContinentKey = meta.continentKey;
                    activeNation = meta.nation;
                }
            }

            let html = '<div class="sidebar-lore-nav-title">Nations et régions</div>';
            html += '<ul class="sidebar-lore-nav-list">';
            for (const cont of NavConfig.nationContinents) {
                const isActive = activeContinentKey === cont.key;
                const firstSlug = cont.nations[0]
                    ? NavConfig.slugifyNation(cont.nations[0])
                    : null;
                const headHref = firstSlug ? '#nation/' + firstSlug : '#histoires/histoires';
                html += '<li class="sidebar-lore-nav-item' + (isActive ? ' active' : '') + '">';
                html += '  <a class="sidebar-lore-nav-head" href="' + headHref + '">';
                html += '    <span class="sidebar-lore-nav-label">' + this._escape(cont.label) + '</span>';
                html += '  </a>';
                if (isActive) {
                    html += '  <ul class="sidebar-lore-nav-sublinks">';
                    for (const nation of cont.nations) {
                        const slug = NavConfig.slugifyNation(nation);
                        const linkActive = nation === activeNation;
                        html += '    <li><a href="#nation/' + slug + '"' +
                                (linkActive ? ' class="active"' : '') + '>' +
                                this._escape(nation) + '</a></li>';
                    }
                    html += '  </ul>';
                }
                html += '</li>';
            }
            html += '</ul>';
            return html;
        },

        render() {
            const { route, subkey } = this._currentRouteAndSubkey();
            if (!this._shouldShow(route)) {
                this._container.hidden = true;
                this._container.innerHTML = '';
                return;
            }
            this._container.hidden = false;

            // Routes nation/* et histoires/histoires (la landing Nations) : on
            // affiche la quick-nav par continent. Sur histoires/chroniques, on
            // retombe sur la quick-nav lore classique.
            const isNationRoute = route === 'nation';
            const isNationLanding = route === 'histoires' && subkey === 'histoires';
            if (isNationRoute || isNationLanding) {
                this._container.innerHTML = this._renderNationNav(route, subkey);
                return;
            }

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
