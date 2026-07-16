/**
 * SubTabs — moteur de sous-onglets avec sidebar TOC et suivi de progression
 * Utilisé par les pages à sous-onglets du site
 */

// ── SubTabs ──────────────────────────────────────────────────────────────────
const SubTabs = {
    _instances: {},

    /**
     * Initialise un système de sous-onglets
     * @param {string}   instanceId  Identifiant unique de l'instance
     * @param {string}   navSelector Sélecteur de la barre de sous-onglets (.subtab-nav)
     * @param {string}   contentSelector Sélecteur de la zone de contenu (.subtab-content)
     * @param {Array}    tabs        [{ key, label, src }]
     * @param {string}   defaultKey  Clé du sous-onglet par défaut
     * @param {Function} [onLoad]    Callback(html, key) après chargement
     */
    init(instanceId, navSelector, contentSelector, tabs, defaultKey, onLoad) {
        const nav  = navSelector ? document.querySelector(navSelector) : null;
        const area = document.querySelector(contentSelector);
        if (!area) return;

        const cache = {};
        let current = null;

        if (nav) {
            // Toujours recréer les boutons (la nav peut contenir des boutons d'une instance précédente)
            nav.innerHTML = '';
            tabs.forEach(t => {
                const btn = document.createElement('button');
                btn.className = 'subtab-btn';
                btn.dataset.key = t.key;
                btn.textContent = t.label;
                nav.appendChild(btn);
            });
        }

        const activate = async (key) => {
            if (key === current) return;
            current = key;

            // Mise à jour des boutons
            if (nav) {
                nav.querySelectorAll('.subtab-btn').forEach(b =>
                    b.classList.toggle('active', b.dataset.key === key)
                );
            }

            // Chargement du contenu
            if (!cache[key]) {
                const tab = tabs.find(t => t.key === key);
                if (!tab) return;

                area.innerHTML = '<div class="subtab-loading">Chargement…</div>';

                try {
                    const resp = await fetch(tab.src);
                    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                    cache[key] = await resp.text();
                } catch (e) {
                    area.innerHTML = `<div class="subtab-error">Erreur de chargement : ${e.message}</div>`;
                    return;
                }
            }

            area.innerHTML = cache[key];

            // Exécuter les scripts inline si présents
            area.querySelectorAll('script').forEach(old => {
                const s = document.createElement('script');
                s.textContent = old.textContent;
                old.replaceWith(s);
            });

            // Scroll en haut
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Callback
            if (typeof onLoad === 'function') onLoad(cache[key], key);
        };

        // Délégation des clics
        if (nav) {
            nav.addEventListener('click', e => {
                const btn = e.target.closest('.subtab-btn');
                if (btn) activate(btn.dataset.key);
            });
        }

        // Démarrage : si le router a un subkey en attente, on l'utilise.
        const pending = window._pendingSubkey;
        const startKey = (pending && tabs.find(t => t.key === pending)) ? pending : defaultKey;
        activate(startKey);
        if (pending) window._pendingSubkey = null;

        this._instances[instanceId] = { activate, nav, area };
    },

    /** Active un sous-onglet depuis l'extérieur */
    go(instanceId, key) {
        const inst = this._instances[instanceId];
        if (inst) inst.activate(key);
    }
};

// ── SidebarTOC ────────────────────────────────────────────────────────────────
const SidebarTOC = {
    _observer: null,
    _progressBar: null,
    _scrollTarget: null,

    /**
     * Construit le TOC à partir des h2/h3 dans la zone de contenu
     * @param {HTMLElement} sidebar   Élément sidebar
     * @param {HTMLElement} content   Zone de contenu scrollable (window pour scroll global)
     */
    build(sidebar, contentEl) {
        // Nettoyer l'ancien observer
        if (this._observer) { this._observer.disconnect(); this._observer = null; }

        const tocList = sidebar.querySelector('.toc-list');
        const progress = sidebar.querySelector('.toc-progress-fill');
        if (!tocList) return;

        // Collecter les titres h2 et h3
        const headings = Array.from(contentEl.querySelectorAll('h2[id], h3[id], [id].section-header, .era-banner-name[id]'));

        // Fallback : si aucun id, chercher tous les h2/h3 et leur en assigner
        if (headings.length === 0) {
            contentEl.querySelectorAll('h2, h3, .section-header h2').forEach((h, i) => {
                if (!h.id) h.id = `section-${i}`;
                headings.push(h);
            });
        }

        if (headings.length === 0) {
            tocList.innerHTML = '<li class="toc-empty">Aucune section</li>';
            return;
        }

        // Construire les items TOC
        tocList.innerHTML = '';
        headings.forEach(h => {
            const id    = h.id || h.closest('[id]')?.id;
            const level = h.tagName === 'H3' ? 'toc-sub' : '';
            const text  = h.textContent.trim().replace(/^[—–-]\s*/, '');
            if (!id || !text) return;

            const li = document.createElement('li');
            li.className = `toc-item ${level}`;
            li.dataset.id = id;
            li.innerHTML = `<a href="#${id}" class="toc-link">${text}</a>`;
            li.querySelector('a').addEventListener('click', e => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            tocList.appendChild(li);
        });

        // IntersectionObserver pour le suivi de section active
        const items = tocList.querySelectorAll('.toc-item[data-id]');
        const setActive = (id) => {
            items.forEach(li => li.classList.toggle('active', li.dataset.id === id));
        };

        const headingEls = headings.filter(h => h.id);
        if (headingEls.length > 0 && 'IntersectionObserver' in window) {
            this._observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

            headingEls.forEach(h => this._observer.observe(h));
        }

        // Barre de progression au scroll
        if (progress) {
            const onScroll = () => {
                const docH  = document.documentElement.scrollHeight - window.innerHeight;
                const pct   = docH > 0 ? Math.round((window.scrollY / docH) * 100) : 0;
                progress.style.width = `${pct}%`;
            };
            window.removeEventListener('scroll', this._onScroll);
            this._onScroll = onScroll;
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        // Activer le premier item par défaut
        if (headingEls[0]) setActive(headingEls[0].id);
    }
};

window.SubTabs   = SubTabs;
window.SidebarTOC = SidebarTOC;
