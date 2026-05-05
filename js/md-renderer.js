/**
 * md-renderer.js — Rendu markdown depuis Docs/GDD/ avec support sous-onglets
 *
 * Utilisé par les pages-coquilles (vision.html, monde.html, mecaniques.html, etc.)
 * pour charger dynamiquement les .md de Documentation/GDD/ sans avoir à dupliquer
 * le contenu en HTML.
 *
 * API :
 *   MdRenderer.render(targetEl, mdPath)         — rend un .md dans un élément
 *   MdRenderer.initTabs(navSel, contentSel,     — sous-onglets pilotés par .md
 *                       tabs, defaultKey)
 *
 * Format tabs : [{ key, label, src: 'GDD/02 - Monde/Cosmologie.md' }]
 *
 * Le renderer applique automatiquement :
 *   - parsing markdown (marked.js déjà chargé dans index.html)
 *   - réécriture des liens [[X]] et [[X|Y]] Obsidian → liens cliquables
 *   - réécriture des images relatives → chemins corrects
 *   - styling parchemin (classes CSS .md-content)
 *   - construction du TOC via SidebarTOC
 */

(function () {
    'use strict';

    /** Strip frontmatter YAML et retourne le markdown body */
    function stripFrontmatter(md) {
        if (!md.startsWith('---')) return md;
        const end = md.indexOf('\n---', 3);
        if (end === -1) return md;
        return md.slice(end + 4).replace(/^\n+/, '');
    }

    /** Convertit [[X]] et [[X|Y]] en HTML (lien interne ou span) */
    function transformObsidianLinks(md) {
        return md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, target, label) => {
            const text = label || target.split('/').pop();
            const slug = target.toLowerCase()
                .replace(/[^\w\s\-/]/g, '')
                .replace(/\s+/g, '-');
            return `<a href="#md/${encodeURIComponent(target)}" class="md-link" data-md-target="${target}">${text}</a>`;
        });
    }

    /** Render markdown raw → HTML stylé */
    function renderMarkdownText(md) {
        const body = transformObsidianLinks(stripFrontmatter(md));
        if (typeof marked === 'undefined') {
            return `<pre>${body.replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}</pre>`;
        }
        marked.setOptions({ breaks: false, gfm: true, headerIds: true, mangle: false });
        return marked.parse(body);
    }

    /** Fetch + render dans targetEl */
    async function render(targetEl, mdPath) {
        if (!targetEl) return;
        targetEl.innerHTML = '<div class="subtab-loading">Chargement…</div>';
        try {
            const url = '/Docs/' + mdPath.replace(/^\/?(Docs\/)?/, '');
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(`HTTP ${resp.status} sur ${url}`);
            const md = await resp.text();
            const html = renderMarkdownText(md);
            targetEl.innerHTML = `<div class="md-content">${html}</div>`;

            // Construire le TOC sidebar
            const sidebar = document.getElementById('site-sidebar');
            if (sidebar && window.SidebarTOC) {
                setTimeout(() => SidebarTOC.build(sidebar, targetEl), 50);
            }

            window.scrollTo({ top: 0, behavior: 'instant' });
        } catch (e) {
            targetEl.innerHTML = `<div class="subtab-error">Erreur de chargement : ${e.message}</div>`;
        }
    }

    /** Sous-onglets pilotés par .md (analogue à SubTabs.init mais pour markdown) */
    function initTabs(instanceId, navSelector, contentSelector, tabs, defaultKey) {
        const nav  = document.querySelector(navSelector);
        const area = document.querySelector(contentSelector);
        if (!nav || !area) return;

        nav.innerHTML = '';
        tabs.forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'subtab-btn';
            btn.dataset.key = t.key;
            btn.textContent = t.label;
            nav.appendChild(btn);
        });

        let current = null;
        const activate = async (key) => {
            if (key === current) return;
            current = key;
            nav.querySelectorAll('.subtab-btn').forEach(b =>
                b.classList.toggle('active', b.dataset.key === key)
            );
            const tab = tabs.find(t => t.key === key);
            if (!tab) return;
            await render(area, tab.src);
        };

        nav.addEventListener('click', e => {
            const btn = e.target.closest('.subtab-btn');
            if (btn) activate(btn.dataset.key);
        });

        activate(defaultKey);
    }

    window.MdRenderer = { render, initTabs, renderMarkdownText };

})();
