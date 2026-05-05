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
            return `<a href="#md/${encodeURIComponent(target)}" class="md-link" data-md-target="${target}">${text}</a>`;
        });
    }

    /** Convertit les callouts Obsidian > [!type] Title \n > body en <div class="md-callout md-callout-type"> */
    function transformObsidianCallouts(md) {
        const lines = md.split('\n');
        const out = [];
        let i = 0;
        while (i < lines.length) {
            const line = lines[i];
            const m = line.match(/^>\s*\[!(\w+)\](?:\s+(.*))?$/i);
            if (m) {
                const type = m[1].toLowerCase();
                const title = m[2] || '';
                const body = [];
                i++;
                while (i < lines.length && /^>/.test(lines[i])) {
                    body.push(lines[i].replace(/^>\s?/, ''));
                    i++;
                }
                const titleHtml = title ? `<div class="md-callout-title">${title}</div>` : '';
                const bodyMd = body.join('\n');
                out.push(`<div class="md-callout md-callout-${type}">${titleHtml}<div class="md-callout-body" data-md="${encodeURIComponent(bodyMd)}"></div></div>`);
                continue;
            }
            out.push(line);
            i++;
        }
        return out.join('\n');
    }

    /** Post-processing : render le contenu des callouts (qui contient du markdown) */
    function postProcessCallouts(rootEl) {
        rootEl.querySelectorAll('.md-callout-body[data-md]').forEach(el => {
            const md = decodeURIComponent(el.dataset.md);
            const inner = transformObsidianLinks(md);
            el.innerHTML = (typeof marked !== 'undefined') ? marked.parse(inner) : inner;
            el.removeAttribute('data-md');
        });
    }

    /** Render markdown raw → HTML stylé */
    function renderMarkdownText(md) {
        // Ordre : strip frontmatter → callouts (avant les liens car contiennent du md inline) → liens Obsidian
        let body = stripFrontmatter(md);
        body = transformObsidianCallouts(body);
        body = transformObsidianLinks(body);
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
            // Post-traiter les callouts (rend leur body markdown)
            postProcessCallouts(targetEl);

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
    const _instances = {};
    function initTabs(instanceId, navSelector, contentSelector, tabs, defaultKey) {
        const nav  = navSelector ? document.querySelector(navSelector) : null;
        const area = document.querySelector(contentSelector);
        if (!area) return;

        if (nav) {
            nav.innerHTML = '';
            tabs.forEach(t => {
                const btn = document.createElement('button');
                btn.className = 'subtab-btn';
                btn.dataset.key = t.key;
                btn.textContent = t.label;
                nav.appendChild(btn);
            });
        }

        let current = null;
        const activate = async (key) => {
            if (key === current) return;
            current = key;
            if (nav) {
                nav.querySelectorAll('.subtab-btn').forEach(b =>
                    b.classList.toggle('active', b.dataset.key === key)
                );
            }
            const tab = tabs.find(t => t.key === key);
            if (!tab) return;
            await render(area, tab.src);
        };

        if (nav) {
            nav.addEventListener('click', e => {
                const btn = e.target.closest('.subtab-btn');
                if (btn) activate(btn.dataset.key);
            });
        }

        // Si le router a déjà un subkey en attente pour cette instance, l'utiliser
        const pending = window._pendingSubkey;
        const startKey = (pending && tabs.find(t => t.key === pending)) ? pending : defaultKey;
        activate(startKey);
        if (pending) window._pendingSubkey = null;

        _instances[instanceId] = { activate, tabs };
    }

    /** Active un sous-onglet depuis l'extérieur. Retourne true si l'instance existe. */
    function go(instanceId, key) {
        const inst = _instances[instanceId];
        if (!inst) return false;
        inst.activate(key);
        return true;
    }

    window.MdRenderer = { render, initTabs, go, renderMarkdownText };

})();
