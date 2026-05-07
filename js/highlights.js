/**
 * highlights.js — Surlignage de passages globalisé pour tout le site
 *
 * Permet de surligner du texte dans n'importe quel conteneur (pages markdown,
 * lecteur de chroniques, modale de lore, etc.) avec :
 *   - 4 couleurs (jaune général, rouge à modifier, vert vérifié, bleu à explorer)
 *   - notes optionnelles attachées à un surlignage
 *   - persistance localStorage + sync auto Turso (cross-device, password-gated)
 *   - panneau latéral listant les surlignages (page courante / toutes pages)
 *   - export JSON
 *
 * API publique :
 *   Highlights.attach(container, pageKey, { title, onAfterChange })
 *     - Active le surlignage sur `container`. `pageKey` identifie la page
 *       (ex: 'chronique:5', 'GDD/02 - Monde/Cosmologie.md').
 *     - `onAfterChange` est appelé après ajout/suppression — utilisé par
 *       le lecteur de chroniques pour repager.
 *   Highlights.detach()
 *     - Désactive le surlignage et nettoie les listeners de sélection.
 */
(function () {
    'use strict';

    var STORAGE_KEY            = 'hybelior_highlights';
    var STORAGE_KEY_OLD_CHRON  = 'hybelior_chroniques_highlights';
    var STORAGE_KEY_LASTSYNC   = 'hybelior_highlights_lastsync';
    var SESSION_PASSWORD       = 'hybelior_editor_password';
    var COLORS                 = ['yellow', 'red', 'green', 'blue'];
    var DEFAULT_COLOR          = 'yellow';
    var SYNC_DEBOUNCE_MS       = 800;

    var uiInjected = false;
    var ctx = null;            // { container, pageKey, title, onAfterChange }
    var pendingSel = null;     // { range, start, end, text }
    var activeId = null;       // currently-clicked highlight id
    var noteCtx = null;        // 'create' | 'edit'
    var notePending = null;    // pending highlight or selection
    var hlPanelTab = 'page';   // 'page' | 'all'

    var syncTimer = null;
    var syncInflight = false;
    var syncPending = false;

    // ── Storage ─────────────────────────────────────────────
    function loadAll() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
    }
    function loadActive() {
        return loadAll().filter(function (h) { return h && !h.deleted; });
    }
    function saveAll(arr) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch (e) {}
    }
    function highlightsForPage(pageKey) {
        return loadActive().filter(function (h) { return h.pageKey === pageKey; });
    }

    // Migration : importe les anciens surlignages du lecteur de chroniques
    // (clé `hybelior_chroniques_highlights`) en convertissant `chapterNum`
    // en `pageKey: 'chronique:<n>'`. Idempotent.
    function migrateOldChronicle() {
        try {
            var oldRaw = localStorage.getItem(STORAGE_KEY_OLD_CHRON);
            if (!oldRaw) return;
            var oldArr = JSON.parse(oldRaw);
            if (!Array.isArray(oldArr) || oldArr.length === 0) return;
            var current = loadAll();
            var byId = {};
            current.forEach(function (h) { byId[h.id] = true; });
            var added = 0;
            oldArr.forEach(function (h) {
                if (!h || !h.id || byId[h.id]) return;
                if (h.chapterNum != null && !h.pageKey) {
                    h.pageKey = 'chronique:' + h.chapterNum;
                    h.pageTitle = h.chapterTitle || ('Chapitre ' + h.chapterNum);
                }
                current.push(h); added++;
            });
            if (added > 0) saveAll(current);
            // On garde l'ancienne clé pour permettre rollback si besoin ;
            // un futur cleanup pourra la supprimer.
        } catch (e) {}
    }

    function genId() {
        return 'h_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
    }

    // ── Range / offset utilities ────────────────────────────
    function rangeToOffsets(range, container) {
        var pre = document.createRange();
        pre.selectNodeContents(container);
        pre.setEnd(range.startContainer, range.startOffset);
        var start = pre.toString().length;
        var end = start + range.toString().length;
        return { start: start, end: end };
    }
    function offsetsToRange(start, end, container) {
        var range = document.createRange();
        var charIndex = 0, foundStart = false;
        var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        var node;
        while ((node = walker.nextNode())) {
            var nodeLen = node.nodeValue.length;
            var next = charIndex + nodeLen;
            if (!foundStart && start >= charIndex && start <= next) {
                range.setStart(node, start - charIndex); foundStart = true;
            }
            if (foundStart && end >= charIndex && end <= next) {
                range.setEnd(node, end - charIndex); return range;
            }
            charIndex = next;
        }
        return null;
    }
    function wrapRangeWithMark(range, hl) {
        if (range.collapsed) return [];
        var marks = [];
        var startContainer = range.startContainer, endContainer = range.endContainer;
        var startOffset = range.startOffset, endOffset = range.endOffset;
        var common = range.commonAncestorContainer;
        if (common.nodeType === Node.TEXT_NODE) common = common.parentNode;

        var nodes = [];
        var walker = document.createTreeWalker(common, NodeFilter.SHOW_TEXT, {
            acceptNode: function (n) {
                try { return range.intersectsNode(n) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
                catch (e) { return NodeFilter.FILTER_REJECT; }
            }
        });
        var n;
        while ((n = walker.nextNode())) nodes.push(n);

        nodes.forEach(function (node) {
            var nr = document.createRange();
            nr.selectNodeContents(node);
            if (node === startContainer) nr.setStart(node, startOffset);
            if (node === endContainer)   nr.setEnd(node, endOffset);
            if (nr.collapsed) return;
            var mark = document.createElement('mark');
            mark.className = 'hl-mark hl-color-' + (hl.color || DEFAULT_COLOR);
            mark.setAttribute('data-hl-id', hl.id);
            if (hl.note) mark.setAttribute('data-hl-note', '1');
            try { nr.surroundContents(mark); marks.push(mark); }
            catch (e) {}
        });
        return marks;
    }

    function applyHighlight(hl) {
        if (!ctx || !ctx.container || !document.body.contains(ctx.container)) return;
        if (ctx.container.querySelector('mark[data-hl-id="' + hl.id + '"]')) return;
        var range = offsetsToRange(hl.start, hl.end, ctx.container);
        if (!range) {
            var plain = ctx.container.textContent || '';
            var idx = plain.indexOf(hl.text || '');
            if (idx === -1 || !hl.text) return;
            range = offsetsToRange(idx, idx + hl.text.length, ctx.container);
            if (!range) return;
        }
        wrapRangeWithMark(range, hl);
    }
    function applyAllForCurrentPage() {
        if (!ctx) return;
        var list = highlightsForPage(ctx.pageKey);
        list.sort(function (a, b) { return b.start - a.start; });
        list.forEach(applyHighlight);
        updateToggleBadge();
    }
    function reapplyForCurrentPage() {
        if (!ctx || !ctx.container) return;
        ctx.container.querySelectorAll('mark.hl-mark').forEach(function (m) {
            var p = m.parentNode;
            while (m.firstChild) p.insertBefore(m.firstChild, m);
            p.removeChild(m);
            p.normalize();
        });
        applyAllForCurrentPage();
        if (ctx.onAfterChange) try { ctx.onAfterChange(); } catch (e) {}
    }

    // ── CRUD ───────────────────────────────────────────────
    function createHighlight(start, end, text, color, note) {
        if (!ctx) return null;
        var now = Date.now();
        var hl = {
            id: genId(),
            pageKey: ctx.pageKey,
            pageTitle: ctx.title || ctx.pageKey,
            start: start, end: end, text: text,
            color: color || DEFAULT_COLOR,
            note: note || '',
            timestamp: now,
            updatedAt: now
        };
        var arr = loadAll();
        arr.push(hl);
        saveAll(arr);
        scheduleSync();
        return hl;
    }
    function updateHighlight(id, patch) {
        var arr = loadAll();
        var idx = -1;
        for (var i = 0; i < arr.length; i++) { if (arr[i].id === id) { idx = i; break; } }
        if (idx === -1) return null;
        for (var k in patch) if (Object.prototype.hasOwnProperty.call(patch, k)) arr[idx][k] = patch[k];
        arr[idx].updatedAt = Date.now();
        saveAll(arr);
        var marks = document.querySelectorAll('mark[data-hl-id="' + id + '"]');
        marks.forEach(function (m) {
            COLORS.forEach(function (c) { m.classList.remove('hl-color-' + c); });
            m.classList.add('hl-color-' + (arr[idx].color || DEFAULT_COLOR));
            if (arr[idx].note) m.setAttribute('data-hl-note', '1');
            else m.removeAttribute('data-hl-note');
        });
        if (panelOpen()) renderPanelList();
        scheduleSync();
        return arr[idx];
    }
    function deleteHighlight(id) {
        var arr = loadAll();
        var found = false, now = Date.now();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                arr[i] = { id: id, deleted: true, updatedAt: now };
                found = true; break;
            }
        }
        if (!found) arr.push({ id: id, deleted: true, updatedAt: now });
        saveAll(arr);
        document.querySelectorAll('mark[data-hl-id="' + id + '"]').forEach(function (m) {
            var p = m.parentNode;
            while (m.firstChild) p.insertBefore(m.firstChild, m);
            p.removeChild(m);
            p.normalize();
        });
        updateToggleBadge();
        if (panelOpen()) renderPanelList();
        if (ctx && ctx.onAfterChange) try { ctx.onAfterChange(); } catch (e) {}
        scheduleSync();
    }

    function updateToggleBadge() {
        var btn = document.getElementById('hl-toggle');
        var count = document.getElementById('hl-toggle-count');
        if (!btn) return;
        if (!ctx) { btn.style.display = 'none'; return; }
        btn.style.display = '';
        var n = highlightsForPage(ctx.pageKey).length;
        if (count) count.textContent = n > 0 ? ' ' + n : '';
        btn.classList.toggle('hl-has-items', n > 0);
    }

    // ── UI overlay injection ───────────────────────────────
    var UI_HTML =
        '<button id="hl-toggle" class="hl-toggle" aria-label="Surlignages" title="Surlignages" hidden>' +
            '<span aria-hidden="true">📝</span><span id="hl-toggle-count"></span>' +
        '</button>' +
        '<div id="hl-select-toolbar" class="hl-select-toolbar" hidden>' +
            '<button class="hl-color-btn" data-color="yellow" title="Surligner — jaune (général)" aria-label="Jaune"></button>' +
            '<button class="hl-color-btn" data-color="red" title="Surligner — rouge (à modifier)" aria-label="Rouge"></button>' +
            '<button class="hl-color-btn" data-color="green" title="Surligner — vert (vérifié)" aria-label="Vert"></button>' +
            '<button class="hl-color-btn" data-color="blue" title="Surligner — bleu (à explorer)" aria-label="Bleu"></button>' +
            '<button class="hl-select-note-btn" id="hl-select-note" title="Surligner avec une note">📝</button>' +
        '</div>' +
        '<div id="hl-menu" class="hl-menu" hidden>' +
            '<div class="hl-menu-note" id="hl-menu-note" hidden></div>' +
            '<div class="hl-menu-colors">' +
                '<button class="hl-color-btn" data-color="yellow" aria-label="Jaune"></button>' +
                '<button class="hl-color-btn" data-color="red" aria-label="Rouge"></button>' +
                '<button class="hl-color-btn" data-color="green" aria-label="Vert"></button>' +
                '<button class="hl-color-btn" data-color="blue" aria-label="Bleu"></button>' +
            '</div>' +
            '<button class="hl-menu-btn" id="hl-menu-edit-note">📝 Note</button>' +
            '<button class="hl-menu-btn" id="hl-menu-delete">🗑️ Supprimer</button>' +
        '</div>' +
        '<aside id="hl-panel" class="hl-panel" aria-label="Surlignages">' +
            '<div class="hl-panel-header">' +
                '<div class="hl-panel-title">Surlignages</div>' +
                '<div class="hl-panel-actions">' +
                    '<button id="hl-panel-sync" title="Synchroniser">Sync</button>' +
                    '<button id="hl-panel-export" title="Exporter en JSON">Export</button>' +
                    '<button id="hl-panel-close" title="Fermer">×</button>' +
                '</div>' +
            '</div>' +
            '<div class="hl-panel-tabs">' +
                '<button class="hl-panel-tab active" data-tab="page">Cette page</button>' +
                '<button class="hl-panel-tab" data-tab="all">Toutes</button>' +
            '</div>' +
            '<div class="hl-panel-syncinfo" id="hl-panel-syncinfo" hidden></div>' +
            '<div class="hl-panel-list" id="hl-panel-list"></div>' +
        '</aside>' +
        '<div id="hl-note-dialog" class="hl-note-dialog" hidden>' +
            '<div class="hl-note-dialog-panel">' +
                '<div class="hl-note-dialog-title">Note de modification</div>' +
                '<div class="hl-note-dialog-snippet" id="hl-note-dialog-snippet"></div>' +
                '<textarea class="hl-note-dialog-textarea" id="hl-note-dialog-textarea" placeholder="Ex. : reformuler, vérifier la date, ajouter une référence…"></textarea>' +
                '<div class="hl-note-dialog-actions">' +
                    '<button id="hl-note-dialog-cancel">Annuler</button>' +
                    '<button id="hl-note-dialog-save" class="hl-primary">Enregistrer</button>' +
                '</div>' +
            '</div>' +
        '</div>';

    function ensureUI() {
        if (uiInjected) return;
        document.body.insertAdjacentHTML('beforeend', UI_HTML);
        uiInjected = true;
        wireUI();
    }

    function wireUI() {
        // Selection toolbar — color buttons
        document.querySelectorAll('#hl-select-toolbar .hl-color-btn').forEach(function (btn) {
            btn.addEventListener('mousedown', function (e) { e.preventDefault(); });
            btn.addEventListener('click', function () {
                if (!pendingSel) return;
                var hl = createHighlight(pendingSel.start, pendingSel.end, pendingSel.text, btn.dataset.color, '');
                if (hl) applyHighlight(hl);
                window.getSelection && window.getSelection().removeAllRanges();
                hideSelectToolbar();
                updateToggleBadge();
                if (ctx && ctx.onAfterChange) try { ctx.onAfterChange(); } catch (e) {}
            });
        });
        var noteBtn = document.getElementById('hl-select-note');
        if (noteBtn) {
            noteBtn.addEventListener('mousedown', function (e) { e.preventDefault(); });
            noteBtn.addEventListener('click', function () {
                if (!pendingSel) return;
                openNoteDialog('create', null, pendingSel.text);
            });
        }

        // Highlight context menu
        var menu = document.getElementById('hl-menu');
        menu.querySelectorAll('.hl-color-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (!activeId) return;
                updateHighlight(activeId, { color: btn.dataset.color });
                hideMenu();
            });
        });
        document.getElementById('hl-menu-edit-note').addEventListener('click', function (e) {
            e.stopPropagation();
            if (!activeId) return;
            var hl = loadAll().find(function (x) { return x.id === activeId; });
            if (!hl) return;
            openNoteDialog('edit', hl, hl.text);
            hideMenu();
        });
        document.getElementById('hl-menu-delete').addEventListener('click', function (e) {
            e.stopPropagation();
            if (!activeId) return;
            if (!confirm('Supprimer ce surlignage ?')) return;
            deleteHighlight(activeId);
            hideMenu();
        });

        // Document-level click : click sur un highlight → menu, click ailleurs → ferme menu
        document.addEventListener('click', function (e) {
            var mark = e.target.closest && e.target.closest('mark.hl-mark');
            if (mark) {
                e.stopPropagation();
                var id = mark.getAttribute('data-hl-id');
                var hl = loadAll().find(function (h) { return h.id === id; });
                if (!hl) return;
                showMenu(mark.getBoundingClientRect(), hl);
                return;
            }
            if (!menu.contains(e.target)) hideMenu();
        });

        // Toggle button (panel)
        var toggle = document.getElementById('hl-toggle');
        toggle.addEventListener('click', function () {
            var panel = document.getElementById('hl-panel');
            if (panel.classList.contains('open')) closePanel();
            else openPanel();
        });

        // Panel
        document.getElementById('hl-panel-close').addEventListener('click', closePanel);
        document.getElementById('hl-panel-sync').addEventListener('click', manualSync);
        document.getElementById('hl-panel-export').addEventListener('click', exportJSON);
        document.querySelectorAll('.hl-panel-tab').forEach(function (t) {
            t.addEventListener('click', function () {
                document.querySelectorAll('.hl-panel-tab').forEach(function (x) { x.classList.remove('active'); });
                t.classList.add('active');
                hlPanelTab = t.dataset.tab;
                renderPanelList();
            });
        });

        // Note dialog
        document.getElementById('hl-note-dialog-cancel').addEventListener('click', closeNoteDialog);
        document.getElementById('hl-note-dialog-save').addEventListener('click', saveNoteDialog);
        document.getElementById('hl-note-dialog').addEventListener('click', function (e) {
            if (e.target === this) closeNoteDialog();
        });

        // Selection change
        document.addEventListener('selectionchange', onSelectionChange);
    }

    // ── Selection toolbar ─────────────────────────────────
    function showSelectToolbar(rect) {
        var bar = document.getElementById('hl-select-toolbar');
        if (!bar) return;
        var x = rect.left + rect.width / 2;
        var y = rect.top;
        x = Math.max(80, Math.min(window.innerWidth - 80, x));
        if (y < 60) y = rect.bottom + 50;
        bar.style.left = x + 'px';
        bar.style.top = y + 'px';
        bar.removeAttribute('hidden');
    }
    function hideSelectToolbar() {
        var bar = document.getElementById('hl-select-toolbar');
        if (bar) bar.setAttribute('hidden', '');
        pendingSel = null;
    }
    function onSelectionChange() {
        if (!ctx || !ctx.container) { hideSelectToolbar(); return; }
        var sel = window.getSelection();
        if (!sel || sel.isCollapsed || sel.rangeCount === 0) { hideSelectToolbar(); return; }
        var range = sel.getRangeAt(0);
        if (!ctx.container.contains(range.startContainer) || !ctx.container.contains(range.endContainer)) {
            hideSelectToolbar(); return;
        }
        var text = sel.toString();
        if (!text || !text.trim()) { hideSelectToolbar(); return; }
        var offs = rangeToOffsets(range, ctx.container);
        pendingSel = { range: range.cloneRange(), start: offs.start, end: offs.end, text: text };
        var rect = range.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) { hideSelectToolbar(); return; }
        showSelectToolbar(rect);
    }

    // ── Menu ───────────────────────────────────────────────
    function showMenu(rect, hl) {
        activeId = hl.id;
        var menu = document.getElementById('hl-menu');
        var noteEl = document.getElementById('hl-menu-note');
        if (hl.note) { noteEl.textContent = hl.note; noteEl.removeAttribute('hidden'); }
        else noteEl.setAttribute('hidden', '');
        var x = rect.left + rect.width / 2;
        var y = rect.top;
        x = Math.max(110, Math.min(window.innerWidth - 110, x));
        if (y < 100) y = rect.bottom + 60;
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.removeAttribute('hidden');
    }
    function hideMenu() {
        var menu = document.getElementById('hl-menu');
        if (menu) menu.setAttribute('hidden', '');
        activeId = null;
    }

    // ── Note dialog ────────────────────────────────────────
    function openNoteDialog(mode, hl, snippet) {
        noteCtx = mode;
        var ta = document.getElementById('hl-note-dialog-textarea');
        var sn = document.getElementById('hl-note-dialog-snippet');
        if (mode === 'create') {
            notePending = pendingSel ? { start: pendingSel.start, end: pendingSel.end, text: pendingSel.text } : null;
            if (ta) ta.value = '';
        } else {
            notePending = hl;
            if (ta) ta.value = (hl && hl.note) || '';
        }
        if (sn) sn.textContent = snippet || '';
        document.getElementById('hl-note-dialog').removeAttribute('hidden');
        setTimeout(function () { if (ta) ta.focus(); }, 30);
    }
    function closeNoteDialog() {
        document.getElementById('hl-note-dialog').setAttribute('hidden', '');
        noteCtx = null; notePending = null;
    }
    function saveNoteDialog() {
        var ta = document.getElementById('hl-note-dialog-textarea');
        var note = (ta && ta.value || '').trim();
        if (noteCtx === 'create') {
            if (!notePending) { closeNoteDialog(); return; }
            var hl = createHighlight(notePending.start, notePending.end, notePending.text, DEFAULT_COLOR, note);
            if (hl) applyHighlight(hl);
            window.getSelection && window.getSelection().removeAllRanges();
            hideSelectToolbar();
            updateToggleBadge();
            if (ctx && ctx.onAfterChange) try { ctx.onAfterChange(); } catch (e) {}
        } else if (noteCtx === 'edit' && notePending) {
            updateHighlight(notePending.id, { note: note });
        }
        closeNoteDialog();
    }

    // ── Panel ──────────────────────────────────────────────
    function panelOpen() { var p = document.getElementById('hl-panel'); return p && p.classList.contains('open'); }
    function openPanel() {
        var p = document.getElementById('hl-panel');
        if (!p) return;
        p.classList.add('open');
        renderPanelList();
        refreshSyncInfo();
        if (sessionStorage.getItem(SESSION_PASSWORD)) try { autoPull(); } catch (e) {}
    }
    function closePanel() { var p = document.getElementById('hl-panel'); if (p) p.classList.remove('open'); }

    function escHtml(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }
    function truncate(s, n) { s = s || ''; return s.length > n ? s.slice(0, n) + '…' : s; }
    function colorSwatch(c) {
        switch (c) {
            case 'red': return 'rgba(220, 80, 80, 0.85)';
            case 'green': return 'rgba(120, 200, 100, 0.85)';
            case 'blue': return 'rgba(80, 150, 220, 0.85)';
            default: return 'rgba(255, 220, 80, 0.85)';
        }
    }

    function renderPanelList() {
        var list = document.getElementById('hl-panel-list');
        if (!list) return;
        var all = loadActive();
        var items;
        if (hlPanelTab === 'page') {
            items = ctx ? all.filter(function (h) { return h.pageKey === ctx.pageKey; }) : [];
        } else {
            items = all.slice();
        }
        items.sort(function (a, b) {
            if (a.pageKey !== b.pageKey) return a.pageKey.localeCompare(b.pageKey, 'fr');
            return (a.start || 0) - (b.start || 0);
        });
        if (items.length === 0) {
            var msg = hlPanelTab === 'page'
                ? 'Aucun surlignage sur cette page.<br><small>Sélectionne un passage pour le surligner.</small>'
                : 'Aucun surlignage enregistré.<br><small>Sélectionne un passage pour le marquer en vue d’une modification future.</small>';
            list.innerHTML = '<div class="hl-panel-empty">' + msg + '</div>';
            return;
        }
        var html = '';
        items.forEach(function (h) {
            html += '<div class="hl-panel-item hl-color-' + (h.color || DEFAULT_COLOR) + '" data-id="' + h.id + '">';
            html += '<div class="hl-panel-item-header">';
            html += '<span class="hl-panel-item-color" style="background:' + colorSwatch(h.color) + '"></span>';
            html += '<span class="hl-panel-item-page">' + escHtml(truncate(h.pageTitle || h.pageKey, 80)) + '</span>';
            html += '</div>';
            html += '<div class="hl-panel-item-text">' + escHtml(truncate(h.text, 240)) + '</div>';
            if (h.note) html += '<div class="hl-panel-item-note">' + escHtml(h.note) + '</div>';
            html += '<div class="hl-panel-item-actions">';
            html += '<button data-action="note">' + (h.note ? 'Modifier la note' : 'Ajouter une note') + '</button>';
            html += '<button data-action="delete">Supprimer</button>';
            html += '</div>';
            html += '</div>';
        });
        list.innerHTML = html;
        list.querySelectorAll('.hl-panel-item').forEach(function (item) {
            item.addEventListener('click', function (e) {
                var action = e.target && e.target.dataset && e.target.dataset.action;
                var id = item.dataset.id;
                var h = loadAll().find(function (x) { return x.id === id; });
                if (!h) return;
                if (action === 'delete') {
                    e.stopPropagation();
                    if (!confirm('Supprimer ce surlignage ?')) return;
                    deleteHighlight(id);
                    return;
                }
                if (action === 'note') {
                    e.stopPropagation();
                    openNoteDialog('edit', h, h.text);
                    return;
                }
                jumpToHighlight(h);
            });
        });
    }

    function jumpToHighlight(h) {
        // Si on est déjà sur la bonne page, scrolle simplement
        if (ctx && ctx.pageKey === h.pageKey) {
            var mark = document.querySelector('mark[data-hl-id="' + h.id + '"]');
            if (mark) {
                mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
                mark.classList.add('hl-flash');
                setTimeout(function () { mark.classList.remove('hl-flash'); }, 1500);
                return;
            }
        }
        // Sinon : naviguer. Pour les chroniques (pageKey 'chronique:N') on
        // déclenche une ouverture dédiée si l'API est exposée par la page.
        if (/^chronique:/.test(h.pageKey)) {
            if (window.HybeliorChroniques && window.HybeliorChroniques.openChapter) {
                window.HybeliorChroniques.openChapter(parseInt(h.pageKey.slice('chronique:'.length), 10));
            } else {
                location.hash = '#lore/chroniques';
            }
            return;
        }
        // Page markdown : pageKey est un chemin .md → on déclenche le rendu via router
        if (/\.md$/.test(h.pageKey)) {
            location.hash = '#md/' + encodeURIComponent(h.pageKey);
            return;
        }
        // Fallback : tente comme route
        location.hash = '#' + h.pageKey;
    }

    // ── Sync ──────────────────────────────────────────────
    function getStoredPassword() {
        try { return sessionStorage.getItem(SESSION_PASSWORD) || ''; } catch (e) { return ''; }
    }
    function setStoredPassword(p) { try { sessionStorage.setItem(SESSION_PASSWORD, p); } catch (e) {} }
    function clearStoredPassword() { try { sessionStorage.removeItem(SESSION_PASSWORD); } catch (e) {} }

    function showSyncInfo(msg, kind) {
        var el = document.getElementById('hl-panel-syncinfo');
        if (!el) return;
        el.textContent = msg;
        el.classList.remove('error', 'success');
        if (kind) el.classList.add(kind);
        el.removeAttribute('hidden');
    }
    function setLastSync(ts) { try { localStorage.setItem(STORAGE_KEY_LASTSYNC, String(ts)); } catch (e) {} }
    function getLastSync() {
        try { var v = localStorage.getItem(STORAGE_KEY_LASTSYNC); return v ? parseInt(v, 10) : 0; }
        catch (e) { return 0; }
    }
    function relTime(ts) {
        if (!ts) return 'jamais';
        var d = Date.now() - ts;
        if (d < 60000) return 'à l’instant';
        if (d < 3600000) return Math.floor(d / 60000) + ' min';
        if (d < 86400000) return Math.floor(d / 3600000) + ' h';
        return Math.floor(d / 86400000) + ' j';
    }
    function refreshSyncInfo() {
        var el = document.getElementById('hl-panel-syncinfo');
        if (!el) return;
        var ts = getLastSync();
        if (ts) showSyncInfo('Dernière sync : ' + relTime(ts), null);
        else el.setAttribute('hidden', '');
    }

    function ensurePassword(silent) {
        var p = getStoredPassword();
        if (p) return Promise.resolve(p);
        if (silent) return Promise.reject(new Error('no-pwd'));
        var entered = prompt('Mot de passe éditeur :');
        if (!entered) return Promise.reject(new Error('annulé'));
        return fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: entered })
        }).then(function (r) {
            if (!r.ok) throw new Error('Mot de passe incorrect');
            setStoredPassword(entered);
            return entered;
        });
    }

    function pushAPI(pwd) {
        return fetch('/api/highlights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: pwd, entries: loadAll() })
        }).then(function (r) {
            if (r.status === 403) { clearStoredPassword(); var e = new Error('Mot de passe rejeté'); e.code = 'auth'; throw e; }
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        }).then(function (data) {
            var serverList = (data && data.highlights) || [];
            saveAll(serverList);
            setLastSync(Date.now());
            return serverList;
        });
    }
    function pullAPI(pwd) {
        return fetch('/api/highlights?password=' + encodeURIComponent(pwd))
            .then(function (r) {
                if (r.status === 403) { clearStoredPassword(); var e = new Error('Mot de passe rejeté'); e.code = 'auth'; throw e; }
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            }).then(function (data) {
                var serverList = (data && data.highlights) || [];
                var local = loadAll();
                var byId = {};
                serverList.forEach(function (h) { byId[h.id] = h; });
                local.forEach(function (h) {
                    if (!byId[h.id] || (h.updatedAt || 0) > (byId[h.id].updatedAt || 0)) byId[h.id] = h;
                });
                var merged = [];
                for (var k in byId) merged.push(byId[k]);
                saveAll(merged);
                setLastSync(Date.now());
                return merged;
            });
    }

    function setSyncing(state, msg) {
        var btn = document.getElementById('hl-toggle');
        if (btn) {
            btn.classList.remove('hl-syncing', 'hl-sync-error');
            if (state === 'syncing') btn.classList.add('hl-syncing');
            if (state === 'error' || state === 'auth') btn.classList.add('hl-sync-error');
        }
        if (state === 'syncing') showSyncInfo(msg || 'Synchronisation…', null);
        else if (state === 'synced') showSyncInfo(msg || ('Synchronisé · ' + relTime(getLastSync())), 'success');
        else if (state === 'error') showSyncInfo(msg || 'Erreur de synchronisation', 'error');
        else if (state === 'auth') showSyncInfo(msg || 'Cliquer "Sync" pour activer la synchronisation', 'error');
        else refreshSyncInfo();
    }

    function scheduleSync() {
        if (!getStoredPassword()) return;
        if (syncTimer) clearTimeout(syncTimer);
        syncTimer = setTimeout(doAutoPush, SYNC_DEBOUNCE_MS);
    }
    function doAutoPush() {
        if (syncInflight) { syncPending = true; return; }
        var pwd = getStoredPassword(); if (!pwd) return;
        syncInflight = true; setSyncing('syncing');
        pushAPI(pwd).then(function () {
            setSyncing('synced');
            renderPanelList();
            updateToggleBadge();
            reapplyForCurrentPage();
        }).catch(function (err) {
            setSyncing(err.code === 'auth' ? 'auth' : 'error', err.code === 'auth' ? null : ('Erreur : ' + err.message));
        }).finally(function () {
            syncInflight = false;
            if (syncPending) { syncPending = false; scheduleSync(); }
        });
    }
    function autoPull() {
        var pwd = getStoredPassword(); if (!pwd) return;
        if (syncInflight) { syncPending = true; return; }
        syncInflight = true; setSyncing('syncing', 'Récupération…');
        pullAPI(pwd).then(function () {
            setSyncing('synced');
            updateToggleBadge();
            reapplyForCurrentPage();
            scheduleSync();
        }).catch(function (err) {
            setSyncing(err.code === 'auth' ? 'auth' : 'error', err.code === 'auth' ? null : ('Erreur : ' + err.message));
        }).finally(function () {
            syncInflight = false;
            if (syncPending) { syncPending = false; scheduleSync(); }
        });
    }
    function manualSync() {
        var btn = document.getElementById('hl-panel-sync');
        if (btn) btn.disabled = true;
        setSyncing('syncing');
        ensurePassword(false).then(function (pwd) { return pushAPI(pwd); })
            .then(function (list) {
                renderPanelList();
                updateToggleBadge();
                reapplyForCurrentPage();
                setSyncing('synced', 'Synchronisé · ' + list.length + ' surlignages');
                setTimeout(function () { setSyncing('idle'); }, 3000);
            })
            .catch(function (err) {
                if (err && err.message === 'annulé') setSyncing('idle');
                else setSyncing(err.code === 'auth' ? 'auth' : 'error', err.code === 'auth' ? null : ('Erreur : ' + (err.message || 'inconnue')));
            })
            .finally(function () { if (btn) btn.disabled = false; });
    }

    function exportJSON() {
        var arr = loadActive();
        if (!arr.length) { alert('Aucun surlignage à exporter.'); return; }
        var blob = new Blob([JSON.stringify(arr, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'hybelior-surlignages-' + new Date().toISOString().slice(0, 10) + '.json';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ── Public API ─────────────────────────────────────────
    window.Highlights = {
        attach: function (container, pageKey, options) {
            ensureUI();
            options = options || {};
            ctx = {
                container: container,
                pageKey: pageKey,
                title: options.title || pageKey,
                onAfterChange: options.onAfterChange || null
            };
            applyAllForCurrentPage();
            updateToggleBadge();
            if (sessionStorage.getItem(SESSION_PASSWORD)) {
                try { autoPull(); } catch (e) {}
            }
        },
        detach: function () {
            ctx = null;
            hideSelectToolbar();
            hideMenu();
            updateToggleBadge();
        },
        // Pour le lecteur de chroniques : besoin de réappliquer après pagination
        reapply: reapplyForCurrentPage
    };

    migrateOldChronicle();
})();
