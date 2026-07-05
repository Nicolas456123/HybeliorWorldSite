/**
 * site-search.js — Recherche globale du site Hybelior.
 *
 * Charge `/Docs/_search-index.json` (généré par scripts/gen-search-index.js)
 * et expose un module SiteSearch global :
 *
 *   SiteSearch.load()            -> Promise (charge l'index)
 *   SiteSearch.search(q, opts)   -> Array<Result>, max 20
 *   SiteSearch.render(q, el)     -> injecte le HTML dans `el`
 *   SiteSearch.init()            -> branche l'input #site-search-input
 *
 * Opts : { category: 'Mécaniques', limit: 20 }
 *
 * Scoring (par token de la requête) :
 *   - match dans title         : +10
 *   - bonus title commence par : +3
 *   - match dans subtitle      : +5
 *   - match exact dans tags    : +8
 *   - match exact dans keywords: +4
 *   - match partiel keywords   : +2
 *   - match dans snippet       : +1
 *   - distance Levenshtein ≤ 2 sur mots de 5+ lettres : +1
 *
 * Pas de dépendance externe. Insensible aux accents et à la casse.
 */
(function () {
    'use strict';

    var INDEX_URL = '/Docs/_search-index.json';
    var _entries = null;
    var _loadPromise = null;
    var _debounceTimer = null;

    // ============================================================
    // Helpers texte
    // ============================================================
    function normalize(s) {
        if (!s) return '';
        return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    }

    function tokenize(q) {
        return normalize(q).split(/\s+/).filter(function (t) { return t.length >= 2; });
    }

    // Levenshtein distance, early-exit > max
    function leven(a, b, max) {
        if (a === b) return 0;
        var la = a.length, lb = b.length;
        if (Math.abs(la - lb) > max) return max + 1;
        if (la === 0) return lb;
        if (lb === 0) return la;
        var prev = new Array(lb + 1), curr = new Array(lb + 1);
        for (var j = 0; j <= lb; j++) prev[j] = j;
        for (var i = 1; i <= la; i++) {
            curr[0] = i;
            var rowMin = i;
            for (var k = 1; k <= lb; k++) {
                var cost = a.charCodeAt(i - 1) === b.charCodeAt(k - 1) ? 0 : 1;
                curr[k] = Math.min(
                    curr[k - 1] + 1,
                    prev[k] + 1,
                    prev[k - 1] + cost
                );
                if (curr[k] < rowMin) rowMin = curr[k];
            }
            if (rowMin > max) return max + 1;
            var tmp = prev; prev = curr; curr = tmp;
        }
        return prev[lb];
    }

    function escHtml(s) {
        if (s == null) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Surligne les tokens dans le texte (préserve la casse d'origine, accents inclus)
    function highlight(text, tokens) {
        if (!text || !tokens || !tokens.length) return escHtml(text);
        var esc = escHtml(text);
        var normEsc = normalize(esc);
        // On construit des ranges à partir des tokens en travaillant sur la version normalisée
        var ranges = [];
        for (var i = 0; i < tokens.length; i++) {
            var tok = tokens[i];
            if (!tok || tok.length < 2) continue;
            var from = 0;
            while (from < normEsc.length) {
                var idx = normEsc.indexOf(tok, from);
                if (idx === -1) break;
                ranges.push([idx, idx + tok.length]);
                from = idx + tok.length;
            }
        }
        if (!ranges.length) return esc;
        // Fusion des ranges
        ranges.sort(function (a, b) { return a[0] - b[0]; });
        var merged = [ranges[0].slice()];
        for (var r = 1; r < ranges.length; r++) {
            var last = merged[merged.length - 1];
            if (ranges[r][0] <= last[1]) {
                if (ranges[r][1] > last[1]) last[1] = ranges[r][1];
            } else {
                merged.push(ranges[r].slice());
            }
        }
        // Re-injection des <mark>
        var out = '';
        var cursor = 0;
        for (var m = 0; m < merged.length; m++) {
            out += esc.slice(cursor, merged[m][0]);
            out += '<mark>' + esc.slice(merged[m][0], merged[m][1]) + '</mark>';
            cursor = merged[m][1];
        }
        out += esc.slice(cursor);
        return out;
    }

    // ============================================================
    // Load
    // ============================================================
    function load() {
        if (_entries) return Promise.resolve(_entries);
        if (_loadPromise) return _loadPromise;
        _loadPromise = fetch(INDEX_URL)
            .then(function (r) {
                if (!r.ok) throw new Error('search index HTTP ' + r.status);
                return r.json();
            })
            .then(function (j) {
                _entries = (j && j.entries) ? j.entries : [];
                // Pré-calcul des versions normalisées pour matcher rapidement.
                for (var i = 0; i < _entries.length; i++) {
                    var e = _entries[i];
                    e._n = {
                        title: normalize(e.title),
                        subtitle: normalize(e.subtitle || ''),
                        snippet: normalize(e.snippet || ''),
                        category: normalize(e.category || ''),
                        tags: (e.tags || []).map(normalize),
                        keywords: (e.keywords || []).map(normalize),
                    };
                }
                return _entries;
            })
            .catch(function (err) {
                console.warn('[SiteSearch] échec du chargement :', err);
                _entries = [];
                return _entries;
            });
        return _loadPromise;
    }

    // ============================================================
    // Search
    // ============================================================
    function scoreEntry(entry, tokens) {
        var n = entry._n;
        var score = 0;
        var matched = false;

        for (var t = 0; t < tokens.length; t++) {
            var tok = tokens[t];
            var hit = false;

            // title
            if (n.title.indexOf(tok) !== -1) {
                score += 10;
                if (n.title.startsWith(tok)) score += 3;
                hit = true;
            }
            // subtitle
            if (n.subtitle && n.subtitle.indexOf(tok) !== -1) {
                score += 5;
                hit = true;
            }
            // tags
            for (var i = 0; i < n.tags.length; i++) {
                if (n.tags[i] === tok) { score += 8; hit = true; }
                else if (n.tags[i].indexOf(tok) !== -1) { score += 3; hit = true; }
            }
            // keywords
            for (var k = 0; k < n.keywords.length; k++) {
                var kw = n.keywords[k];
                if (kw === tok) { score += 4; hit = true; }
                else if (kw.indexOf(tok) !== -1) { score += 2; hit = true; }
            }
            // snippet
            if (n.snippet && n.snippet.indexOf(tok) !== -1) {
                score += 1;
                hit = true;
            }
            // Levenshtein fuzzy (sur title uniquement, mots de 5+ lettres)
            if (!hit && tok.length >= 5) {
                var words = n.title.split(/\s+/);
                for (var w = 0; w < words.length; w++) {
                    if (words[w].length >= 4 && leven(tok, words[w], 2) <= 2) {
                        score += 1;
                        hit = true;
                        break;
                    }
                }
            }
            if (!hit) return 0; // tous les tokens doivent matcher
            matched = true;
        }
        return matched ? score : 0;
    }

    function search(query, opts) {
        opts = opts || {};
        if (!_entries) return [];
        var tokens = tokenize(query);
        if (!tokens.length) return [];
        var category = opts.category ? normalize(opts.category) : null;
        var limit = opts.limit || 20;

        var hits = [];
        for (var i = 0; i < _entries.length; i++) {
            var e = _entries[i];
            if (category && e._n.category !== category) continue;
            var sc = scoreEntry(e, tokens);
            if (sc > 0) hits.push({ entry: e, score: sc });
        }
        hits.sort(function (a, b) {
            if (b.score !== a.score) return b.score - a.score;
            return a.entry.title.localeCompare(b.entry.title, 'fr');
        });
        return hits.slice(0, limit).map(function (h) {
            return Object.assign({}, h.entry, { _score: h.score, _tokens: tokens });
        });
    }

    // ============================================================
    // Render
    // ============================================================
    function renderItem(entry, tokens) {
        var tagsHtml = '';
        if (entry.tags && entry.tags.length) {
            var slice = entry.tags.slice(0, 4);
            tagsHtml = '<div class="search-result-tags">' +
                slice.map(function (t) { return '<span>' + escHtml(t) + '</span>'; }).join('') +
                '</div>';
        }
        var subtitle = entry.subtitle || entry.snippet || '';
        return '<a class="search-result" href="' + escHtml(entry.route) + '" data-path="' + escHtml(entry.path) + '">' +
            '<div class="search-result-cat">' + escHtml(entry.category || '') + '</div>' +
            '<div class="search-result-title">' + highlight(entry.title, tokens) + '</div>' +
            (subtitle ? '<div class="search-result-snippet">' + highlight(subtitle, tokens) + '</div>' : '') +
            tagsHtml +
            '</a>';
    }

    function render(query, container) {
        if (!container) return;
        var results = search(query);
        if (!results.length) {
            if (!query || !query.trim()) {
                container.innerHTML = '';
                container.hidden = true;
                return;
            }
            container.innerHTML = '<div class="search-empty">Aucun résultat pour « ' + escHtml(query) + ' »</div>';
            container.hidden = false;
            return;
        }
        var tokens = tokenize(query);
        container.innerHTML = results.map(function (r) { return renderItem(r, tokens); }).join('');
        container.hidden = false;
    }

    // ============================================================
    // UI binding
    // ============================================================
    function init() {
        var input = document.getElementById('site-search-input');
        var results = document.getElementById('site-search-results');
        if (!input || !results) return;

        // Lazy-load à la 1ère interaction
        var loadedTriggered = false;
        function ensureLoaded() {
            if (loadedTriggered) return Promise.resolve();
            loadedTriggered = true;
            return load();
        }
        input.addEventListener('focus', function () { ensureLoaded(); });

        input.addEventListener('input', function () {
            var val = input.value;
            clearTimeout(_debounceTimer);
            _debounceTimer = setTimeout(function () {
                ensureLoaded().then(function () { render(val, results); });
            }, 150);
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                results.hidden = true;
                input.blur();
            } else if (e.key === 'Enter') {
                var first = results.querySelector('.search-result');
                if (first) {
                    e.preventDefault();
                    first.click();
                }
            } else if (e.key === 'ArrowDown') {
                var first2 = results.querySelector('.search-result');
                if (first2) {
                    e.preventDefault();
                    first2.focus();
                }
            }
        });

        // Navigation flèches dans les résultats
        results.addEventListener('keydown', function (e) {
            var items = Array.prototype.slice.call(results.querySelectorAll('.search-result'));
            var idx = items.indexOf(document.activeElement);
            if (e.key === 'ArrowDown' && idx < items.length - 1) {
                e.preventDefault();
                items[idx + 1].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (idx <= 0) input.focus();
                else items[idx - 1].focus();
            } else if (e.key === 'Escape') {
                results.hidden = true;
                input.focus();
            }
        });

        // Clic dehors -> ferme
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.site-search-wrapper')) {
                results.hidden = true;
            }
        });

        // Réouvre les résultats si focus retour avec contenu
        input.addEventListener('focus', function () {
            if (input.value.trim() && results.innerHTML) results.hidden = false;
        });

        // Sur navigation (clic résultat) : fermer le dropdown et reset
        results.addEventListener('click', function (e) {
            var a = e.target.closest('.search-result');
            if (a) {
                results.hidden = true;
                // Pas de input.value = '' pour permettre de revenir sur la recherche
            }
        });
    }

    window.SiteSearch = {
        load: load,
        search: search,
        render: render,
        init: init,
    };

    document.addEventListener('DOMContentLoaded', init);
})();
