/**
 * Lore Search — recherche globale dans les nations et villes d'Hybélior
 * Données: lore-index.json (37 nations) + city-index.json (661 villes)
 */
var LoreSearch = (function() {
    var _nations = null;
    var _cities = null;
    var _loaded = false;

    function load() {
        if (_loaded) return Promise.resolve();
        return Promise.all([
            fetch('/lore/lore-index.json').then(function(r) { return r.json(); }),
            fetch('/lore/city-index.json').then(function(r) { return r.json(); })
        ]).then(function(results) {
            var loreData = results[0];
            var cityData = results[1];
            _nations = Object.keys(loreData).map(function(name) { return { name: name }; });
            _cities = Object.entries(cityData).map(function(entry) {
                return { name: entry[0], nation: entry[1] };
            });
            _loaded = true;
        }).catch(function(e) {
            console.warn('LoreSearch: échec du chargement', e);
        });
    }

    function search(query) {
        if (!_loaded || !query || query.length < 2) return { nations: [], cities: [] };
        var q = query.toLowerCase();
        var nations = _nations.filter(function(n) {
            return n.name.toLowerCase().indexOf(q) !== -1;
        }).slice(0, 8);
        var cities = _cities.filter(function(c) {
            return c.name.toLowerCase().indexOf(q) !== -1;
        }).slice(0, 12);
        return { nations: nations, cities: cities };
    }

    function escHtml(str) {
        var d = document.createElement('div');
        d.textContent = str || '';
        return d.innerHTML;
    }

    function openNation(loreIndexName) {
        // Résout vers un nom de nation canonique connu de NATIONS, puis navigue
        // vers la page dédiée #nation/<slug>.
        var resolved = null;
        if (window.LoreReader && window.LoreReader.NATIONS) {
            if (window.LoreReader.NATIONS[loreIndexName]) {
                resolved = loreIndexName;
            } else {
                var keys = Object.keys(window.LoreReader.NATIONS);
                for (var i = 0; i < keys.length; i++) {
                    if (loreIndexName.toLowerCase().indexOf(keys[i].toLowerCase()) !== -1 ||
                        keys[i].toLowerCase().indexOf(loreIndexName.toLowerCase()) !== -1) {
                        resolved = keys[i];
                        break;
                    }
                }
            }
        }
        if (!resolved) resolved = loreIndexName;

        // Si la nation a une page dédiée (slug connu), on navigue. Sinon fallback modal.
        if (window.NavConfig && typeof NavConfig.slugifyNation === 'function') {
            var slug = NavConfig.slugifyNation(resolved);
            if (NavConfig.findNationBySlug(slug)) {
                window.location.hash = 'nation/' + slug;
                return;
            }
        }
        if (window.LoreReader && window.LoreReader.open) {
            window.LoreReader.open(resolved);
        }
    }

    function init() {
        var input = document.getElementById('lore-search-input');
        var results = document.getElementById('lore-search-results');
        if (!input || !results) return;

        // Move results dropdown to body so it escapes sidebar overflow:auto
        document.body.appendChild(results);

        function positionResults() {
            var rect = input.getBoundingClientRect();
            results.style.top = rect.bottom + 'px';
            results.style.left = rect.left + 'px';
            results.style.width = rect.width + 'px';
        }

        input.addEventListener('input', function() {
            var val = input.value.trim();
            var res = search(val);
            if (res.nations.length === 0 && res.cities.length === 0) {
                results.style.display = 'none';
                return;
            }
            var html = '';
            if (res.nations.length > 0) {
                html += '<div class="lore-search-category">Nations</div>';
                res.nations.forEach(function(n) {
                    html += '<div class="lore-search-item" data-type="nation" data-name="' + escHtml(n.name) + '">' + escHtml(n.name) + '</div>';
                });
            }
            if (res.cities.length > 0) {
                html += '<div class="lore-search-category">Villes</div>';
                res.cities.forEach(function(c) {
                    html += '<div class="lore-search-item" data-type="city" data-name="' + escHtml(c.name) + '" data-nation="' + escHtml(c.nation) + '">'
                        + escHtml(c.name) + ' <span class="lore-search-hint">\u2014 ' + escHtml(c.nation) + '</span></div>';
                });
            }
            results.innerHTML = html;
            positionResults();
            results.style.display = 'block';
        });

        results.addEventListener('click', function(e) {
            var item = e.target.closest('.lore-search-item');
            if (!item) return;
            var nationName = item.dataset.type === 'city' ? item.dataset.nation : item.dataset.name;
            openNation(nationName);
            results.style.display = 'none';
            input.value = '';
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                results.style.display = 'none';
                input.blur();
            }
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.lore-search-wrapper')) {
                results.style.display = 'none';
            }
        });
    }

    return { init: init, load: load };
})();

document.addEventListener('DOMContentLoaded', function() {
    LoreSearch.init();
});
