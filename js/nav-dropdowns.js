/**
 * nav-dropdowns.js — Génère et pilote les dropdowns de la nav principale.
 *
 * - À l'init, attache un panneau dropdown sous chaque item de la nav qui a des
 *   sous-onglets dans NavConfig.subtabs[route].
 * - Clic sur un item de dropdown => navigation vers `#route/subkey`.
 * - Le router se charge ensuite d'activer le bon sous-onglet sur la page.
 * - Sync de l'état actif (highlight de l'entrée courante dans le dropdown).
 */

(function () {
    'use strict';

    const NavDropdowns = {
        _opened: null,

        init() {
            if (!window.NavConfig) {
                console.error('NavDropdowns: NavConfig manquant');
                return;
            }

            const navUl = document.querySelector('.nav-links');
            if (!navUl) return;

            // Pour chaque entrée de la nav, on regarde si elle a des sous-onglets.
            navUl.querySelectorAll('li > a').forEach(link => {
                const href = link.getAttribute('href') || '';
                const route = href.replace(/^#/, '').split('/')[0];
                if (!NavConfig.hasSubtabs(route)) return;

                const li = link.parentElement;
                li.classList.add('has-dropdown');

                // Indicateur visuel "v"
                const caret = document.createElement('span');
                caret.className = 'nav-caret';
                caret.setAttribute('aria-hidden', 'true');
                caret.textContent = '▾'; // ▾
                link.appendChild(caret);

                // Panneau dropdown
                const panel = document.createElement('div');
                panel.className = 'nav-dropdown';
                panel.setAttribute('role', 'menu');
                panel.dataset.route = route;

                const cfg = NavConfig.subtabs[route];
                cfg.tabs.forEach(tab => {
                    const item = document.createElement('a');
                    item.className = 'nav-dropdown-item';
                    item.setAttribute('role', 'menuitem');
                    item.href = '#' + route + '/' + tab.key;
                    item.dataset.route = route;
                    item.dataset.subkey = tab.key;
                    item.textContent = tab.label;
                    item.addEventListener('click', (e) => {
                        e.stopPropagation(); // pas de fermeture immédiate par le doc-listener
                        this.close();
                    });
                    panel.appendChild(item);
                });

                li.appendChild(panel);

                // Toggle au clic sur le lien parent
                link.addEventListener('click', (e) => {
                    // Si déjà sur la route et qu'on a un dropdown => on ouvre/ferme
                    e.preventDefault();
                    this.toggle(li);
                });

                // Clavier : Echap ferme
                panel.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        link.focus();
                        this.close();
                    }
                });
            });

            // Fermer au clic en dehors
            document.addEventListener('click', (e) => {
                if (!this._opened) return;
                if (!this._opened.contains(e.target)) this.close();
            });

            // Fermer sur changement de route
            window.addEventListener('hashchange', () => this.close());
        },

        toggle(li) {
            if (this._opened === li) {
                this.close();
            } else {
                this.close();
                li.classList.add('open');
                this._opened = li;
            }
        },

        close() {
            if (!this._opened) return;
            this._opened.classList.remove('open');
            this._opened = null;
        },

        /** Met à jour l'état actif du dropdown courant (subkey actuelle) */
        setActive(route, subkey) {
            document.querySelectorAll('.nav-dropdown').forEach(panel => {
                const isThisRoute = panel.dataset.route === route;
                panel.querySelectorAll('.nav-dropdown-item').forEach(it => {
                    it.classList.toggle('active', isThisRoute && it.dataset.subkey === subkey);
                });
            });
        },
    };

    window.NavDropdowns = NavDropdowns;
})();
