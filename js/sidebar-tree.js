/**
 * sidebar-tree.js — Arbre de navigation UNIQUE et PERSISTANT du panneau gauche.
 *
 * Objectif (demande UX « A ») : le panneau de gauche est TOUJOURS le même quelle
 * que soit la page. Il liste les 5 grands onglets (Accueil, Lore, Implémentation,
 * Carte, Frise). Le grand onglet de la section courante est ouvert ; les autres
 * sont repliés. En passant d'une grande page à une autre, l'onglet précédent se
 * referme et le nouveau s'ouvre.
 *
 * Détail des branches :
 *   - Lore           → les 8 catégories thématiques (NavConfig.loreCategories),
 *                      la catégorie active dépliée ; Nations → continents → nations,
 *                      Religions → liste des religions.
 *   - Implémentation → les sous-onglets (NavConfig.subtabs.implementation).
 *   - Accueil / Carte / Frise → feuilles (lien direct).
 *
 * Remplace l'ancien sidebar-lore-nav.js et la barre #global-subtab-nav (masquée).
 * Le « Sommaire » (TOC in-page) et le bloc « Ères » de la frise restent affichés
 * sous l'arbre, comme détail de la page courante.
 *
 * Cible : <aside id="site-sidebar"> (tout en haut, sous la recherche masquée).
 */

(function () {
    'use strict';

    const NATIONS_LINK_HREF    = '#histoires/histoires';
    const RELIGIONS_LINK_HREF  = '#monde/religions';
    const CONTINENTS_LINK_HREF = '#monde/continents';

    // Les 5 grands onglets. `routes` = routes qui appartiennent à la section.
    const SECTIONS = [
        { key: 'accueil',        label: 'Accueil',        href: '#accueil',        routes: ['accueil'] },
        { key: 'lore',           label: 'Lore',           href: '#lore',           routes: ['lore', 'vision', 'monde', 'mecaniques', 'systemes', 'histoires', 'nation', 'continent', 'histoire', 'religion'], kind: 'lore' },
        { key: 'roman',          label: '📖 Romans',      href: '#roman',          routes: ['roman'], kind: 'roman' },
        { key: 'implementation', label: 'Implémentation', href: '#implementation', routes: ['implementation'], kind: 'subtabs' },
        { key: 'carte',          label: 'Carte',          href: '#carte',          routes: ['carte'] },
        { key: 'frise',          label: 'Frise',          href: '#frise',          routes: ['frise'] },
    ];

    const SidebarTree = {
        _container: null,

        init() {
            if (!window.NavConfig) return;
            const sidebar = document.getElementById('site-sidebar');
            if (!sidebar) return;

            this._container = document.createElement('nav');
            this._container.id = 'sidebar-tree';
            this._container.className = 'sidebar-tree';
            this._container.setAttribute('aria-label', 'Navigation principale');

            // Insère tout en haut du panneau, après l'éventuelle recherche masquée.
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

        /** route + subkey courants depuis le hash. */
        _current() {
            const raw = window.location.hash.slice(1);
            if (!raw) return { route: 'accueil', subkey: null };
            if (raw.startsWith('md/')) return { route: 'md', subkey: raw.slice(3) };
            const parts = raw.split('/');
            return { route: parts[0], subkey: parts.slice(1).join('/') || null };
        },

        /** Section active pour la route courante. */
        _activeSectionKey(route, subkey) {
            if (route === 'md' && subkey) {
                try {
                    if (decodeURIComponent(subkey).startsWith('Lore/')) return 'lore';
                } catch (_) { /* noop */ }
                return 'lore';
            }
            const s = SECTIONS.find(sec => sec.routes.includes(route));
            return s ? s.key : 'accueil';
        },

        render() {
            const { route, subkey } = this._current();
            const activeKey = this._activeSectionKey(route, subkey);

            let html = '<ul class="sidebar-tree-list">';
            for (const sec of SECTIONS) {
                const isOpen = sec.key === activeKey;
                const hasChildren = sec.kind === 'lore' || sec.kind === 'subtabs' || sec.kind === 'roman';

                html += '<li class="sidebar-tree-item' + (isOpen ? ' open' : '') + '">';
                html += '  <a class="sidebar-tree-head' + (isOpen ? ' active' : '') + '" href="' + sec.href + '">';
                html += '    <span class="sidebar-tree-label">' + this._escape(sec.label) + '</span>';
                if (hasChildren) {
                    html += '    <span class="sidebar-tree-caret" aria-hidden="true">' + (isOpen ? '▾' : '▸') + '</span>';
                }
                html += '  </a>';

                if (isOpen && sec.kind === 'lore') {
                    html += this._renderLoreBranch(route, subkey);
                } else if (isOpen && sec.kind === 'subtabs') {
                    html += this._renderSubtabsBranch(sec.routes[0], subkey);
                } else if (isOpen && sec.kind === 'roman') {
                    html += this._renderRomanBranch(route, subkey);
                }
                html += '</li>';
            }
            html += '</ul>';
            this._container.innerHTML = html;
        },

        /** Branche Implémentation : liste plate des sous-onglets. */
        _renderSubtabsBranch(route, subkey) {
            const cfg = NavConfig.subtabs && NavConfig.subtabs[route];
            if (!cfg || !Array.isArray(cfg.tabs)) return '';
            const current = subkey || cfg.defaultKey;
            let html = '<ul class="sidebar-lore-nav-sublinks">';
            for (const tab of cfg.tabs) {
                const active = tab.key === current;
                html += '<li><a href="#' + route + '/' + tab.key + '"' +
                        (active ? ' class="active"' : '') + '>' +
                        this._escape(tab.label) + '</a></li>';
            }
            html += '</ul>';
            return html;
        },

        /** Branche Romans : trilogie → tome → parties → chapitres (#roman/<key>).
         *  subkey = clé du chapitre courant (null sur le sommaire #roman). */
        _renderRomanBranch(route, subkey) {
            const roman = NavConfig.roman;
            if (!roman || !Array.isArray(roman.parties)) return '';
            const activeKey = (route === 'roman') ? subkey : null;
            const tomeLabel = 'T' + roman.tome + ' — ' + roman.titre;

            let html = '<ul class="sidebar-lore-nav-subtree">';
            // Niveau trilogie
            html += '<li class="sidebar-lore-nav-subitem active">';
            html += '  <a class="sidebar-lore-nav-subhead active" href="#roman">' +
                    this._escape(roman.trilogie) + '</a>';
            // Niveau tome
            html += '  <ul class="sidebar-lore-nav-subleaves">';
            html += '    <li class="sidebar-lore-nav-subitem active">';
            html += '      <a class="sidebar-lore-nav-subhead active" href="#roman">' +
                    this._escape(tomeLabel) + '</a>';
            // Lecture continue + audio du tome entier
            html += '      <a class="sidebar-roman-lire" href="#livre/t' + roman.tome + '">' +
                    '▶ Lire le T1 en entier (audio)</a>';
            // Tome 2 : lecture continue (le sommaire par chapitre reste T1 pour l\'instant)
            html += '      <a class="sidebar-roman-lire" href="#livre/t2">' +
                    '▶ Lire le T2 — L’Heure qui se Referme (audio)</a>';
            // Niveau parties → chapitres
            for (const partie of roman.parties) {
                html += '<div class="sidebar-roman-partie">' + this._escape(partie.titre) + '</div>';
                html += '<ul class="sidebar-lore-nav-subleaves">';
                for (const ch of (partie.chapitres || [])) {
                    const linkActive = ch.key === activeKey;
                    html += '<li><a href="' + NavConfig.romanHref(ch.key) + '"' +
                            (linkActive ? ' class="active"' : '') + '>' +
                            this._escape(ch.label) + '</a></li>';
                }
                html += '</ul>';
            }
            html += '    </li>';
            html += '  </ul>';
            html += '</li>';
            html += '</ul>';
            return html;
        },

        /** Branche Lore : 8 catégories, l'active dépliée (cf. ancien sidebar-lore-nav). */
        _renderLoreBranch(route, subkey) {
            if (!Array.isArray(NavConfig.loreCategories)) return '';

            const activeCat  = NavConfig.findLoreCategory(route, subkey);
            const activeHash = '#' + route + (subkey ? '/' + subkey : '');

            // ── Côté CHRONIQUES / Nations (récit) : #histoires/histoires ou #histoire/<slug> ──
            const onHistoire      = route === 'histoire' && !!subkey;
            const onNationLanding = route === 'histoires' && subkey === 'histoires';
            const isOnNations     = onNationLanding || onHistoire;
            let activeNationMeta = onHistoire ? NavConfig.findNationBySlug(subkey) : null;

            // ── Côté LE MONDE / Continents (factuel) : table #monde/continents, fiche
            //    continent (#continent/<key>), ou Description d'une nation (#nation/<slug>) ──
            const onContinentsHub = route === 'monde' && subkey === 'continents';
            const onContinent     = route === 'continent' && !!subkey;
            const onNationDesc     = route === 'nation' && !!subkey;
            const isOnContinents   = onContinentsHub || onContinent || onNationDesc;
            let activeContKey = null, activeNationSlug = null;
            if (onNationDesc) {
                const meta = NavConfig.findNationBySlug(subkey);
                if (meta) { activeContKey = meta.continentKey; activeNationSlug = subkey; }
            } else if (onContinent) {
                activeContKey = subkey;
            }

            const isOnReligionsHub = route === 'monde' && subkey === 'religions';
            const onReligionRoute  = route === 'religion' && !!subkey;
            const isOnReligions    = isOnReligionsHub || onReligionRoute;
            const activeReligion   = onReligionRoute ? NavConfig.findReligionByKey(subkey) : null;

            let html = '<ul class="sidebar-lore-nav-list sidebar-tree-sublist">';
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
                        if (link.href === NATIONS_LINK_HREF && isOnNations) linkActive = true;
                        if (link.href === RELIGIONS_LINK_HREF && isOnReligions) linkActive = true;
                        if (link.href === CONTINENTS_LINK_HREF && isOnContinents) linkActive = true;

                        html += '<li>';
                        html += '<a href="' + link.href + '"' +
                                (linkActive ? ' class="active"' : '') + '>' +
                                this._escape(link.label) + '</a>';
                        if (link.href === NATIONS_LINK_HREF && isOnNations) {
                            html += this._renderNationsTree(activeNationMeta);
                        }
                        if (link.href === RELIGIONS_LINK_HREF && isOnReligions) {
                            html += this._renderReligionsTree(activeReligion);
                        }
                        if (link.href === CONTINENTS_LINK_HREF && isOnContinents) {
                            html += this._renderContinentsTree(activeContKey, activeNationSlug);
                        }
                        html += '</li>';
                    }
                    html += '  </ul>';
                }
                html += '</li>';
            }
            html += '</ul>';
            return html;
        },

        /** Lien vers le RÉCIT (Histoire) d'une nation — côté Chroniques (route propre). */
        _histHref(nation) {
            return '#histoire/' + NavConfig.slugifyNation(nation);
        },

        /** Lien vers la FICHE du continent (route propre #continent/<key>). */
        _continentFicheHref(key) {
            return '#continent/' + key;
        },

        /** Arbre Continents → pays (côté LE MONDE / factuel). Le continent ouvre sa
         *  fiche ; chaque pays ouvre sa DESCRIPTION (#nation/<slug>). */
        _renderContinentsTree(activeContinentKey, activeNationSlug) {
            if (!Array.isArray(NavConfig.nationContinents)) return '';
            let html = '<ul class="sidebar-lore-nav-subtree">';
            for (const cont of NavConfig.nationContinents) {
                const isActive = activeContinentKey === cont.key;
                html += '<li class="sidebar-lore-nav-subitem' + (isActive ? ' active' : '') + '">';
                html += '  <a class="sidebar-lore-nav-subhead' + (isActive ? ' active' : '') + '" href="' +
                        this._continentFicheHref(cont.key) + '">' + this._escape(cont.label) + '</a>';
                if (isActive) {
                    html += '  <ul class="sidebar-lore-nav-subleaves">';
                    for (const nation of cont.nations) {
                        const slug       = NavConfig.slugifyNation(nation);
                        const linkActive = slug === activeNationSlug;
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

        _renderNationsTree(activeNationMeta) {
            if (!Array.isArray(NavConfig.nationContinents)) return '';
            const activeContinentKey = activeNationMeta ? activeNationMeta.continentKey : null;
            const activeNation       = activeNationMeta ? activeNationMeta.nation : null;

            let html = '<ul class="sidebar-lore-nav-subtree">';
            for (const cont of NavConfig.nationContinents) {
                const isActive  = activeContinentKey === cont.key;
                const headHref  = cont.nations[0] ? this._histHref(cont.nations[0]) : NATIONS_LINK_HREF;

                html += '<li class="sidebar-lore-nav-subitem' + (isActive ? ' active' : '') + '">';
                html += '  <a class="sidebar-lore-nav-subhead' + (isActive ? ' active' : '') + '" href="' +
                        headHref + '">' + this._escape(cont.label) + '</a>';
                if (isActive) {
                    html += '  <ul class="sidebar-lore-nav-subleaves">';
                    for (const nation of cont.nations) {
                        const linkActive = nation === activeNation;
                        html += '<li><a href="' + this._histHref(nation) + '"' +
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

        _renderReligionsTree(activeReligion) {
            if (!Array.isArray(NavConfig.religions)) return '';
            let html = '<ul class="sidebar-lore-nav-subtree">';
            for (const rel of NavConfig.religions) {
                const linkActive = activeReligion && activeReligion.key === rel.key;
                const href       = NavConfig.religionHref(rel.key);
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

    window.SidebarTree = SidebarTree;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SidebarTree.init());
    } else {
        SidebarTree.init();
    }
})();
