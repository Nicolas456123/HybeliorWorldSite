/**
 * sidebar-lore-nav.js — Quick-nav Lore en haut du sidebar.
 *
 * Sur les routes Lore (loreSubroutes + #md/Lore/...), affiche un menu
 * compact des 8 catégories thématiques. La catégorie active est
 * dépliée ; ses sous-liens sont listés ; un sous-lien peut lui-même
 * porter un sous-arbre (Nations → continents → nations, Religions
 * → liste des religions).
 *
 * Données : NavConfig.loreCategories + NavConfig.nationContinents + NavConfig.religions
 * Cible : <aside id="site-sidebar"> (au-dessus du TOC).
 */

(function () {
    'use strict';

    const NATIONS_LINK_HREF   = '#histoires/histoires';
    const RELIGIONS_LINK_HREF = '#monde/religions';

    const SidebarLoreNav = {
        _container: null,

        init() {
            if (!window.NavConfig || !Array.isArray(NavConfig.loreCategories)) return;
            const sidebar = document.getElementById('site-sidebar');
            if (!sidebar) return;

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

            this.render();
            window.addEventListener('hashchange', () => this.render());
        },

        /** Détermine si la route courante mérite la quick-nav. */
        _shouldShow(route, subkey) {
            const subs = (NavConfig.loreSubroutes || []);
            if (route === 'lore' || subs.includes(route)) return true;
            // Pages Lore servies via #md/Lore/...
            if (route === 'md' && subkey) {
                try {
                    return decodeURIComponent(subkey).startsWith('Lore/');
                } catch (_) { return false; }
            }
            return false;
        },

        /** Récupère la route + subkey courants depuis le hash. */
        _currentRouteAndSubkey() {
            const raw = window.location.hash.slice(1);
            if (!raw) return { route: 'accueil', subkey: null };
            if (raw.startsWith('md/')) {
                return { route: 'md', subkey: raw.slice(3) };
            }
            const parts = raw.split('/');
            return { route: parts[0], subkey: parts.slice(1).join('/') || null };
        },

        render() {
            const { route, subkey } = this._currentRouteAndSubkey();
            if (!this._shouldShow(route, subkey)) {
                this._container.hidden = true;
                this._container.innerHTML = '';
                return;
            }
            this._container.hidden = false;

            const activeCat = NavConfig.findLoreCategory(route, subkey);
            const activeHash = '#' + route + (subkey ? '/' + subkey : '');

            // Contextes spéciaux
            const onNationRoute    = route === 'nation' && !!subkey;
            const onNationLanding  = route === 'histoires' && subkey === 'histoires';
            const isOnNations      = onNationRoute || onNationLanding;
            const activeNationMeta = onNationRoute
                ? NavConfig.findNationBySlug(subkey)
                : null;

            const isOnReligionsHub = route === 'monde' && subkey === 'religions';
            const isOnMdReligion   = route === 'md' && subkey &&
                                     decodeURIComponent(subkey).startsWith('Lore/Religions/');
            const isOnReligions    = isOnReligionsHub || isOnMdReligion;
            const activeReligion   = isOnMdReligion
                ? NavConfig.findReligionByMdPath(subkey)
                : null;

            let html = '<div class="sidebar-lore-nav-title">Parcourir le lore</div>';
            html += '<ul class="sidebar-lore-nav-list">';

            for (const cat of NavConfig.loreCategories) {
                const isActive  = activeCat && activeCat.key === cat.key;
                const firstHref = cat.links[0] ? cat.links[0].href : '#lore';

                html += '<li class="sidebar-lore-nav-item' + (isActive ? ' active' : '') + '">';
                html += '  <a class="sidebar-lore-nav-head" href="' + firstHref + '">';
                html += '    <span class="sidebar-lore-nav-icon" aria-hidden="true">' + cat.icon + '</span>';
                html += '    <span class="sidebar-lore-nav-label">' + this._escape(cat.label) + '</span>';
                html += '  </a>';

                if (isActive) {
                    html += '  <ul class="sidebar-lore-nav-sublinks">';
                    for (const link of cat.links) {
                        let linkActive = link.href === activeHash;
                        // Lien Nations actif sur les routes nation/* et la landing
                        if (link.href === NATIONS_LINK_HREF && isOnNations) linkActive = true;
                        // Lien Religions actif sur #md/Lore/Religions/* et le hub
                        if (link.href === RELIGIONS_LINK_HREF && isOnReligions) linkActive = true;

                        html += '<li>';
                        html += '<a href="' + link.href + '"' +
                                (linkActive ? ' class="active"' : '') + '>' +
                                this._escape(link.label) + '</a>';

                        // Sous-arbres
                        if (link.href === NATIONS_LINK_HREF && isOnNations) {
                            html += this._renderNationsTree(activeNationMeta);
                        }
                        if (link.href === RELIGIONS_LINK_HREF && isOnReligions) {
                            html += this._renderReligionsTree(activeReligion);
                        }

                        html += '</li>';
                    }
                    html += '  </ul>';
                }
                html += '</li>';
            }
            html += '</ul>';
            this._container.innerHTML = html;
        },

        /** Arbre continents → nations, avec le continent de la nation active déplié. */
        _renderNationsTree(activeNationMeta) {
            if (!Array.isArray(NavConfig.nationContinents)) return '';
            const activeContinentKey = activeNationMeta ? activeNationMeta.continentKey : null;
            const activeNation       = activeNationMeta ? activeNationMeta.nation : null;

            let html = '<ul class="sidebar-lore-nav-subtree">';
            for (const cont of NavConfig.nationContinents) {
                const isActive  = activeContinentKey === cont.key;
                const firstSlug = cont.nations[0] ? NavConfig.slugifyNation(cont.nations[0]) : null;
                const headHref  = firstSlug ? '#nation/' + firstSlug : NATIONS_LINK_HREF;

                html += '<li class="sidebar-lore-nav-subitem' + (isActive ? ' active' : '') + '">';
                html += '  <a class="sidebar-lore-nav-subhead' + (isActive ? ' active' : '') + '" href="' +
                        headHref + '">' + this._escape(cont.label) + '</a>';
                if (isActive) {
                    html += '  <ul class="sidebar-lore-nav-subleaves">';
                    for (const nation of cont.nations) {
                        const slug       = NavConfig.slugifyNation(nation);
                        const linkActive = nation === activeNation;
                        html += '<li><a href="#nation/' + slug + '"' +
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

        /** Liste plate des religions. Une religion active est mise en évidence. */
        _renderReligionsTree(activeReligion) {
            if (!Array.isArray(NavConfig.religions)) return '';
            let html = '<ul class="sidebar-lore-nav-subtree">';
            for (const rel of NavConfig.religions) {
                const linkActive = activeReligion && activeReligion.key === rel.key;
                const href       = NavConfig.religionMdHref(rel.md);
                const classes    = 'sidebar-lore-nav-subhead' +
                                   (rel.mineure ? ' mineure' : '') +
                                   (rel.special ? ' special' : '') +
                                   (linkActive ? ' active' : '');
                html += '<li class="sidebar-lore-nav-subitem">';
                html += '  <a class="' + classes + '" href="' + href + '">' +
                        this._escape(rel.label) + '</a>';
                html += '</li>';
            }
            html += '</ul>';
            return html;
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
