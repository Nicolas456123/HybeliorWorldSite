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

    /**
     * Détecte les blocs ```dataview ... ``` et les remplace par un placeholder div.
     * On extrait le chemin FROM "X" pour le passer en attribut data-from.
     * Les autres clauses (TABLE, WHERE, SORT) sont ignorées : on liste les
     * fichiers du dossier en excluant Index.md (déjà fait par le script
     * gen-doc-manifest.js).
     */
    function transformObsidianDataview(md) {
        const re = /```dataview\s*\n([\s\S]*?)\n```/g;
        return md.replace(re, (full, body) => {
            const fromMatch = body.match(/^\s*FROM\s+"([^"]+)"/im);
            const from = fromMatch ? fromMatch[1] : '';
            // Si la clause WHERE explicite "Index" → on signale qu'on liste tout sauf Index
            return `<div class="md-dataview" data-from="${encodeURIComponent(from)}"></div>`;
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
        // Ordre : strip frontmatter → dataview (avant marked qui rendrait en code) →
        //         callouts (avant les liens car contiennent du md inline) → liens Obsidian
        let body = stripFrontmatter(md);
        body = transformObsidianDataview(body);
        body = transformObsidianCallouts(body);
        body = transformObsidianLinks(body);
        if (typeof marked === 'undefined') {
            return `<pre>${body.replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}</pre>`;
        }
        marked.setOptions({ breaks: false, gfm: true, headerIds: true, mangle: false });
        return marked.parse(body);
    }

    /** Cache du manifeste des fichiers de doc */
    let _manifestPromise = null;
    function getManifest() {
        if (_manifestPromise) return _manifestPromise;
        _manifestPromise = fetch('/Docs/_manifest.json')
            .then(r => r.ok ? r.json() : {})
            .catch(() => ({}));
        return _manifestPromise;
    }

    /**
     * Détecte si la page courante est un hub (un Index.md d'un dossier qui
     * contient d'autres .md). Si oui, injecte une bandelette de sous-onglets
     * sous le H1 pour accès rapide aux pages-enfants.
     *
     * Hub heuristique : nom de fichier = "Index.md", "_Index.md" ou commence
     * par "_" (description/template), ET le dossier contient ≥2 .md.
     */
    async function postProcessHubTabs(rootEl, mdPath) {
        const md = rootEl.querySelector('.md-content');
        if (!md) return;

        // Détecte le segment de chemin et le nom de fichier
        const cleanPath = mdPath.replace(/^\/?(Docs\/)?/, '');
        const lastSlash = cleanPath.lastIndexOf('/');
        if (lastSlash === -1) return; // racine, pas de hub
        const folderPath = cleanPath.slice(0, lastSlash);
        const fileName = cleanPath.slice(lastSlash + 1);
        const baseName = fileName.replace(/\.md$/i, '');

        const isHubFile = (
            baseName === 'Index' ||
            baseName === '_Index' ||
            baseName === '_Description' ||
            baseName.startsWith('_')
        );
        if (!isHubFile) return;

        // Récupère les entrées du manifest pour ce dossier
        const manifest = await getManifest();
        const entries = Array.isArray(manifest[folderPath]) ? manifest[folderPath] : [];

        // Liste les frères (hors le fichier courant lui-même et hors fichiers
        // techniques _Description / _Index dupliqués)
        const siblings = entries.filter(e =>
            e.file !== fileName &&
            !e.file.toLowerCase().endsWith('_description.md') &&
            !e.file.toLowerCase().endsWith('_index.md')
        );

        // Vérifie aussi les sous-dossiers : un hub peut avoir des enfants
        // qui sont des dossiers (chacun avec son propre Index.md). On les
        // détecte en cherchant des entrées de manifest dont le path
        // commence par folderPath + '/'.
        const subFolders = [];
        const prefix = folderPath + '/';
        for (const key of Object.keys(manifest)) {
            if (key.startsWith(prefix) && key !== folderPath) {
                // Ne garder que les enfants directs (un seul segment de plus)
                const tail = key.slice(prefix.length);
                if (!tail.includes('/')) {
                    const idxEntry = manifest[key].find(e =>
                        e.file === 'Index.md' || e.file === '_Index.md' || e.file === '_Description.md'
                    );
                    if (idxEntry) {
                        subFolders.push({
                            name: tail,
                            title: idxEntry.title || tail,
                            folder: key,
                            file: idxEntry.file,
                        });
                    }
                }
            }
        }

        // Si rien à montrer, abandonner
        if (siblings.length === 0 && subFolders.length === 0) return;

        // Construit le HTML de la bandelette
        const tabs = [];
        for (const sf of subFolders) {
            tabs.push({
                label: sf.title,
                href: '#md/' + encodeURIComponent(sf.folder + '/' + sf.file),
            });
        }
        for (const s of siblings) {
            tabs.push({
                label: s.title || s.name,
                href: '#md/' + encodeURIComponent(folderPath + '/' + s.file),
            });
        }

        // Trie : sous-dossiers d'abord (plus haut niveau), puis siblings
        // Cap à 20 entrées max pour ne pas exploser l'UI
        const capped = tabs.slice(0, 20);

        const stripHtml = [
            '<nav class="md-hub-tabs" aria-label="Sous-pages de ce hub">',
            '  <div class="md-hub-tabs-label">Dans cette branche</div>',
            '  <ul class="md-hub-tabs-list">',
            ...capped.map(t =>
                `<li><a href="${t.href}">${escHtml(t.label)}</a></li>`
            ),
            '  </ul>',
            '</nav>',
        ].join('');

        // Insère après le H1 (si présent), sinon en début de md
        const h1 = md.querySelector('h1');
        if (h1 && h1.nextSibling) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = stripHtml;
            h1.parentNode.insertBefore(wrapper.firstChild, h1.nextSibling);
        } else {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = stripHtml;
            md.insertBefore(wrapper.firstChild, md.firstChild);
        }
    }

    /**
     * Construit la grille de cartes pour un bloc dataview.
     * `from` est le chemin Obsidian (ex: "05 - Implémentation Unreal/Combat et Capacités")
     * → on tente plusieurs préfixes de manifest pour le résoudre.
     */
    async function postProcessDataview(rootEl, currentMdPath) {
        const blocks = rootEl.querySelectorAll('.md-dataview[data-from]');
        if (blocks.length === 0) return;

        const manifest = await getManifest();

        blocks.forEach(block => {
            const from = decodeURIComponent(block.dataset.from || '');
            if (!from) {
                block.remove();
                return;
            }

            // Tenter de résoudre la clé du manifeste : on essaie le from tel quel,
            // puis avec préfixes "GDD/" et "Lore/" (les deux racines courantes).
            // On accepte aussi un dossier qui n'a que des sous-dossiers (pas de .md
            // direct dans le manifeste) — ils seront listés comme cartes "dossier".
            const candidates = [from, 'GDD/' + from, 'Lore/' + from];
            let entries = null, resolvedKey = null;
            for (const k of candidates) {
                if (manifest[k]) {                       // existe (peut être vide)
                    entries = manifest[k];
                    resolvedKey = k;
                    break;
                }
                // Folder may have no direct files but exist via subdirs
                for (const mk in manifest) {
                    if (mk.startsWith(k + '/')) { resolvedKey = k; entries = []; break; }
                }
                if (resolvedKey) break;
            }

            if (!resolvedKey) {
                block.innerHTML = `<div class="md-dataview-empty">Aucun fichier trouvé pour <code>${from}</code></div>`;
                return;
            }
            if (!entries) entries = [];

            // Sous-dossiers (enfants directs) qui ont un Index.md/_Index.md.
            // On les liste comme cartes "dossier" pour permettre la navigation
            // arborescente automatique depuis n'importe quel Index.
            const subdirs = [];
            for (const k in manifest) {
                if (!k.startsWith(resolvedKey + '/')) continue;
                const rel = k.slice(resolvedKey.length + 1);
                if (rel.includes('/')) continue;   // enfant direct uniquement
                const idx = manifest[k].find(e => e.isIndex && (e.name === 'Index' || e.name === '_Index'));
                if (idx) subdirs.push({ folder: k, name: rel, title: idx.title, file: idx.file });
            }
            subdirs.sort((a, b) => a.name.localeCompare(b.name, 'fr'));

            // Construit la grille — exclut les entrées Index/_Index (le manifeste
            // les inclut pour la résolution wikilink mais on ne les liste pas).
            const grid = document.createElement('div');
            grid.className = 'md-dataview-grid';
            // 1. Sous-dossiers (avec une icône) en premier
            subdirs.forEach(sd => {
                const card = document.createElement('a');
                card.className = 'md-dataview-card md-dataview-card-folder';
                const fullPath = sd.folder + '/' + sd.file;
                card.href = '#md/' + encodeURIComponent(fullPath);
                card.dataset.mdTarget = fullPath;
                card.innerHTML = `
                    <div class="md-dataview-card-title">📁 ${escHtml(sd.title || sd.name)}</div>
                    <div class="md-dataview-card-name">${escHtml(sd.name)}/</div>
                `;
                grid.appendChild(card);
            });
            // 2. Fichiers .md du dossier (hors Index)
            entries.filter(e => !e.isIndex).forEach(entry => {
                const card = document.createElement('a');
                card.className = 'md-dataview-card';
                // Lien : on encode le chemin complet du .md pour le router md/
                const fullPath = resolvedKey + '/' + entry.file;
                card.href = '#md/' + encodeURIComponent(fullPath);
                card.dataset.mdTarget = fullPath;
                card.innerHTML = `
                    <div class="md-dataview-card-title">${escHtml(entry.title || entry.name)}</div>
                    <div class="md-dataview-card-name">${escHtml(entry.name)}</div>
                `;
                grid.appendChild(card);
            });

            block.innerHTML = '';
            block.appendChild(grid);
        });

        // Délégation : ouvrir les cartes md → rendre le .md dans le conteneur courant
        rootEl.querySelectorAll('.md-dataview-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const target = card.dataset.mdTarget;
                if (!target) return;
                // Render dans le conteneur parent (md-content) en remplaçant l'ensemble
                const container = rootEl;
                render(container, target);
            });
        });
    }

    function escHtml(s) {
        const d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /** Coloration syntaxique des blocs ```lang``` via highlight.js (si chargé). */
    function postProcessHighlight(rootEl) {
        if (typeof window.hljs === 'undefined') return;
        rootEl.querySelectorAll('pre > code').forEach(code => {
            // Si pas de classe language-X mais qu'on devine du JSON/YAML/etc., on auto-detecte.
            try {
                if (code.dataset.highlighted === 'yes') return;
                hljs.highlightElement(code);
            } catch (e) { /* highlight.js peut throw sur du code invalide */ }
        });
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
            // Post-traiter les blocs dataview (grille de cartes)
            postProcessDataview(targetEl, mdPath);
            // Post-traiter les liens Obsidian (résolution via manifeste)
            postProcessObsidianLinks(targetEl, mdPath);
            // Coloration syntaxique des blocs code (highlight.js)
            postProcessHighlight(targetEl);

            // Si la page est un hub (Index.md d'un dossier qui contient
            // d'autres fichiers .md), injecter une bandelette de sous-onglets
            // sous le H1 pour accès rapide aux pages enfants.
            await postProcessHubTabs(targetEl, mdPath);

            // Construire le TOC sidebar
            const sidebar = document.getElementById('site-sidebar');
            if (sidebar && window.SidebarTOC) {
                setTimeout(() => SidebarTOC.build(sidebar, targetEl), 50);
            }

            // Activer le surlignage sur le contenu rendu (pageKey = chemin .md)
            if (window.Highlights) {
                const contentEl = targetEl.querySelector('.md-content') || targetEl;
                const titleEl = contentEl.querySelector('h1');
                window.Highlights.attach(contentEl, mdPath, {
                    title: (titleEl && titleEl.textContent.trim()) || mdPath
                });
            }

            window.scrollTo({ top: 0, behavior: 'instant' });
        } catch (e) {
            targetEl.innerHTML = `<div class="subtab-error">Erreur de chargement : ${e.message}</div>`;
        }
    }

    /**
     * Résout un target wiki-link (`[[X]]`) en chemin de manifeste.
     * X peut être : un nom court ("Combat Attribute Set"), un sous-chemin
     * ("Items/Catalogue/Mug"), ou un titre de section ("Univers#La Polyphonie").
     */
    function resolveWikilink(target, manifest) {
        // Strip section anchor
        const hashIdx = target.indexOf('#');
        const filePart = hashIdx === -1 ? target : target.slice(0, hashIdx);
        const baseName = filePart.split('/').pop();

        // 1. Path-aware match : folder + entry.name doit se terminer par filePart.
        //    Évite l'ambiguïté quand plusieurs dossiers ont un fichier "Index".
        if (filePart.includes('/')) {
            for (const folder in manifest) {
                for (const entry of manifest[folder]) {
                    const fullPath = folder + '/' + entry.name;
                    if (fullPath === filePart || fullPath.endsWith('/' + filePart)) {
                        return folder + '/' + entry.file;
                    }
                }
            }
        }

        // 2. Fallback : match sur entry.name seul (basename)
        for (const folder in manifest) {
            for (const entry of manifest[folder]) {
                if (entry.name === baseName || entry.name === filePart) {
                    return folder + '/' + entry.file;
                }
            }
        }
        // Tentative de match partiel (sous-chemin)
        for (const folder in manifest) {
            for (const entry of manifest[folder]) {
                const fullPath = folder + '/' + entry.name;
                if (fullPath.endsWith('/' + filePart) || fullPath === filePart) {
                    return folder + '/' + entry.file;
                }
            }
        }
        return null;
    }

    async function postProcessObsidianLinks(rootEl, currentMdPath) {
        const links = rootEl.querySelectorAll('a.md-link[data-md-target]');
        if (links.length === 0) return;

        const manifest = await getManifest();

        links.forEach(link => {
            const target = link.dataset.mdTarget;
            const resolved = resolveWikilink(target, manifest);
            if (!resolved) {
                link.classList.add('md-link-broken');
                link.title = 'Lien non résolu : ' + target;
                link.addEventListener('click', e => e.preventDefault());
                return;
            }
            link.dataset.mdResolved = resolved;
            link.href = '#md/' + encodeURIComponent(resolved);
            link.addEventListener('click', e => {
                e.preventDefault();
                render(rootEl, resolved);
            });
        });
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

        const htmlCache = {};
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
            // Engine 'html' : fetch + inject (avec exécution des scripts inline)
            if (tab.engine === 'html') {
                if (!htmlCache[key]) {
                    area.innerHTML = '<div class="subtab-loading">Chargement…</div>';
                    try {
                        const resp = await fetch(tab.src);
                        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                        htmlCache[key] = await resp.text();
                    } catch (e) {
                        area.innerHTML = `<div class="subtab-error">Erreur de chargement : ${e.message}</div>`;
                        return;
                    }
                }
                area.innerHTML = htmlCache[key];
                area.querySelectorAll('script').forEach(old => {
                    const s = document.createElement('script');
                    s.textContent = old.textContent;
                    old.replaceWith(s);
                });
                window.scrollTo({ top: 0, behavior: 'instant' });
                return;
            }
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
