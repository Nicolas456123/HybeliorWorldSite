/**
 * Lore Reader — ouvre un modal pour lire les fichiers .md des nations
 * Sources: /lore/Pays/<continent>/<file>.md et /lore/Histoires/<continent>/<file>.md
 *
 * Note: Le découpage continent ↔ nation reflète la structure réelle du miroir
 * Docs/Lore/ après refonte 2026 (D-LORE-NATIONS-CHEVAL : Iskara→Alkaran,
 * Myrtam→Onara, Skaldoria→Ulinor, Thalmaris→Evertia, Haldria→Endora).
 * Les fichiers Histoires/ n'utilisent PAS le suffixe `_Histoires` — c'est
 * juste `<Nation>.md` au même nom que dans Pays/.
 */

const NATIONS = {
    // Alkaran
    'Altram':    { continent: 'Alkaran', pays: 'Pays/Alkaran/Altram.md',    histoires: 'Histoires/Alkaran/Altram.md' },
    'Torkam':    { continent: 'Alkaran', pays: 'Pays/Alkaran/Torkam.md',    histoires: 'Histoires/Alkaran/Torkam.md' },
    'Iskara':    { continent: 'Alkaran', pays: 'Pays/Alkaran/Iskara.md',    histoires: 'Histoires/Alkaran/Iskara.md' },
    'Ferrath':   { continent: 'Alkaran', pays: 'Pays/Alkaran/Ferrath.md',   histoires: null },

    // Azoria
    'Caeloria':              { continent: 'Azoria', pays: 'Pays/Azoria/Caeloria.md',            histoires: 'Histoires/Azoria/Caeloria.md' },
    'Azoral':                { continent: 'Azoria', pays: 'Pays/Azoria/Azoral.md',              histoires: null },
    'Kethvar':               { continent: 'Azoria', pays: 'Pays/Azoria/Kethvar.md',             histoires: null },
    'Solmaris':              { continent: 'Azoria', pays: 'Pays/Azoria/Solmaris.md',            histoires: null },
    'No Man\'s Land Azoria': { continent: 'Azoria', pays: 'Pays/Azoria/No Man\'s Land Azoria.md', histoires: 'Histoires/Azoria/No Man\'s Land Azoria.md' },

    // Baelor
    'Baelor': { continent: 'Baelor', pays: 'Pays/Baelor/Baelor.md', histoires: 'Histoires/Baelor/Baelor.md' },

    // Celethor
    'Astravia':                { continent: 'Celethor', pays: 'Pays/Celethor/Astravia.md',              histoires: 'Histoires/Celethor/Astravia.md' },
    'Elarian':                 { continent: 'Celethor', pays: 'Pays/Celethor/Elarian.md',               histoires: 'Histoires/Celethor/Elarian.md' },
    'Ryldor':                  { continent: 'Celethor', pays: 'Pays/Celethor/Ryldor.md',                histoires: 'Histoires/Celethor/Ryldor.md' },
    'No Man\'s Land Celethor': { continent: 'Celethor', pays: 'Pays/Celethor/No Man\'s Land Celethor.md', histoires: 'Histoires/Celethor/No Man\'s Land Celethor.md' },
    // Nysaria : petite île au large de la côte est de Celethor (anciennement faux continent).
    'Nysaria':                 { continent: 'Celethor', pays: 'Pays/Celethor/Nysaria.md',                histoires: 'Histoires/Celethor/Nysaria.md' },

    // Cendara
    'Cendara':  { continent: 'Cendara', pays: 'Pays/Cendara/Cendara.md',  histoires: 'Histoires/Cendara/Cendara.md' },
    'Arkhen':   { continent: 'Cendara', pays: 'Pays/Cendara/Arkhen.md',   histoires: null },
    'Pyrevane': { continent: 'Cendara', pays: 'Pays/Cendara/Pyrevane.md', histoires: null },

    // Cestra
    'Cestra':                  { continent: 'Cestra', pays: null,                                     histoires: 'Histoires/Cestra/Cestra.md' },
    'Noravia':                 { continent: 'Cestra', pays: 'Pays/Cestra/Noravia.md',                 histoires: null },
    'No Man\'s Land Cestra':   { continent: 'Cestra', pays: 'Pays/Cestra/No Man\'s Land Cestra.md',   histoires: null },

    // Endora
    'Avalor':  { continent: 'Endora', pays: 'Pays/Endora/Avalor.md',  histoires: 'Histoires/Endora/Avalor.md' },
    'Haldria': { continent: 'Endora', pays: 'Pays/Endora/Haldria.md', histoires: 'Histoires/Endora/Haldria.md' },
    'Sanvara': { continent: 'Endora', pays: 'Pays/Endora/Sanvara.md', histoires: null },

    // Evertia
    'Evertia':   { continent: 'Evertia', pays: 'Pays/Evertia/Evertia.md',   histoires: 'Histoires/Evertia/Evertia.md' },
    'Thalmaris': { continent: 'Evertia', pays: 'Pays/Evertia/Thalmaris.md', histoires: 'Histoires/Evertia/Thalmaris.md' },
    'Sylvara':   { continent: 'Evertia', pays: 'Pays/Evertia/Sylvara.md',   histoires: null },

    // Galenor
    'Kharazir': { continent: 'Galenor', pays: 'Pays/Galenor/Kharazir.md', histoires: 'Histoires/Galenor/Kharazir.md' },
    'Lumasar':  { continent: 'Galenor', pays: 'Pays/Galenor/Lumasar.md',  histoires: 'Histoires/Galenor/Lumasar.md' },
    'Seraphia': { continent: 'Galenor', pays: 'Pays/Galenor/Seraphia.md', histoires: 'Histoires/Galenor/Seraphia.md' },
    'Solena':   { continent: 'Galenor', pays: 'Pays/Galenor/Solena.md',   histoires: 'Histoires/Galenor/Solena.md' },
    'Trinoria': { continent: 'Galenor', pays: 'Pays/Galenor/Trinoria.md', histoires: 'Histoires/Galenor/Trinoria.md' },
    'Valoria':  { continent: 'Galenor', pays: 'Pays/Galenor/Valoria.md',  histoires: 'Histoires/Galenor/Valoria.md' },
    'Ventera':  { continent: 'Galenor', pays: 'Pays/Galenor/Ventera.md',  histoires: 'Histoires/Galenor/Ventera.md' },

    // Ilthara
    'Ackerna':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Ackerna.md',   histoires: 'Histoires/Ilthara/Ackerna.md' },
    'Drakora':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Drakora.md',   histoires: 'Histoires/Ilthara/Drakora.md' },
    'Gryndor':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Gryndor.md',   histoires: 'Histoires/Ilthara/Gryndor.md' },
    'Lythar':    { continent: 'Ilthara', pays: 'Pays/Ilthara/Lythar.md',    histoires: 'Histoires/Ilthara/Lythar.md' },
    'Pyrtara':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Pyrtara.md',   histoires: 'Histoires/Ilthara/Pyrtara.md' },
    'Sylthara':  { continent: 'Ilthara', pays: 'Pays/Ilthara/Sylthara.md',  histoires: 'Histoires/Ilthara/Sylthara.md' },
    'Vytharia':  { continent: 'Ilthara', pays: 'Pays/Ilthara/Vytharia.md',  histoires: 'Histoires/Ilthara/Vytharia.md' },
    'Warenthor': { continent: 'Ilthara', pays: 'Pays/Ilthara/Warenthor.md', histoires: 'Histoires/Ilthara/Warenthor.md' },
    // Lunasar (Monarchie Lunaire) et Mirathi (port-sanctuaire des Oracles) :
    // provinces historiques de Vytharia, rapatriées en Ilthara (ex-faux continent Nysaria).
    'Lunasar':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Lunasar.md',   histoires: 'Histoires/Ilthara/Lunasar.md' },
    'Mirathi':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Mirathi.md',   histoires: 'Histoires/Ilthara/Mirathi.md' },

    // Onara
    'Mosrack': { continent: 'Onara', pays: 'Pays/Onara/Mosrack.md', histoires: 'Histoires/Onara/Mosrack.md' },
    'Tyndara': { continent: 'Onara', pays: 'Pays/Onara/Tyndara.md', histoires: 'Histoires/Onara/Tyndara.md' },
    'Myrtam':  { continent: 'Onara', pays: 'Pays/Onara/Myrtam.md',  histoires: 'Histoires/Onara/Myrtam.md' },
    'Elarath': { continent: 'Onara', pays: 'Pays/Onara/Elarath.md', histoires: null },

    // Ulinor
    'Ulinor':    { continent: 'Ulinor', pays: 'Pays/Ulinor/Ulinor.md',    histoires: 'Histoires/Ulinor/Ulinor.md' },
    'Skaldoria': { continent: 'Ulinor', pays: 'Pays/Ulinor/Skaldoria.md', histoires: 'Histoires/Ulinor/Skaldoria.md' },
    'Dhalvoria': { continent: 'Ulinor', pays: 'Pays/Ulinor/Dhalvoria.md', histoires: null },
};

// ── Modal state ──────────────────────────────────────────────
let _currentNation = null;
let _currentTab = 'pays';
let _cache = {};

// ── DOM refs ─────────────────────────────────────────────────
const modal       = () => document.getElementById('lore-modal');
const modalTitle  = () => document.getElementById('lore-modal-title');
const modalBody   = () => document.getElementById('lore-modal-body');
const tabHistoires = () => document.getElementById('lore-tab-histoires');

// ── Open / close ─────────────────────────────────────────────
function openLoreModal(nationName, defaultTab = 'pays') {
    const nation = NATIONS[nationName];
    if (!nation) return;

    _currentNation = nationName;

    // Vérifier que le tab demandé est disponible
    const startTab = (defaultTab === 'histoires' && nation.histoires) ? 'histoires' : 'pays';
    _currentTab = startTab;

    const m = modal();
    m.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    modalTitle().textContent = nationName;

    // Reset tabs et activer le bon
    document.querySelectorAll('.lore-tab').forEach(t => t.classList.remove('active'));
    const activeTabEl = document.querySelector(`.lore-tab[data-tab="${startTab}"]`);
    if (activeTabEl) activeTabEl.classList.add('active');

    // Hide histoires tab if no file
    const tabH = tabHistoires();
    tabH.style.display = nation.histoires ? '' : 'none';

    loadTab(startTab);
}

function closeLoreModal() {
    const m = modal();
    m.setAttribute('hidden', '');
    document.body.style.overflow = '';
    _currentNation = null;
}

// ── Tab loading ───────────────────────────────────────────────
async function loadTab(tab) {
    _currentTab = tab;
    const nation = NATIONS[_currentNation];
    if (!nation) return;

    const url = tab === 'pays' ? nation.pays : nation.histoires;
    const cacheKey = url;

    const body = modalBody();
    body.innerHTML = '<div class="lore-modal-loading">Chargement…</div>';

    if (_cache[cacheKey]) {
        renderMarkdown(body, _cache[cacheKey]);
        return;
    }

    try {
        const resp = await fetch(`/lore/${url}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const text = await resp.text();
        _cache[cacheKey] = text;
        renderMarkdown(body, text);
    } catch (err) {
        body.innerHTML = `<div class="lore-modal-error">Impossible de charger le fichier.<br><small>${err.message}</small></div>`;
    }
}

function renderMarkdown(container, text) {
    // Retire les sections éditoriales internes avant tout traitement.
    let src = (window.LoreContent ? LoreContent.stripInternalSections(text) : text);
    // Strip Obsidian wiki links: [[File|Display]] → Display, [[File]] → File
    const clean = src.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, file, display) => display || file);
    let html = marked.parse(clean, { breaks: true });
    if (window.LoreContent) html = LoreContent.sanitizeHtml(html);
    container.innerHTML = `<div class="lore-md-content">${html}</div>`;
    container.scrollTop = 0;
}

// ── Event delegation ──────────────────────────────────────────
document.addEventListener('click', e => {
    // Nation links (delegated — lore.html may not be loaded yet).
    // Si la nation a une page dédiée (#nation/<slug>), on navigue ; sinon modal.
    const nationLink = e.target.closest('.nation-link');
    if (nationLink) {
        e.preventDefault();
        const name = nationLink.dataset.nation;
        if (window.NavConfig && typeof NavConfig.slugifyNation === 'function') {
            const slug = NavConfig.slugifyNation(name);
            if (NavConfig.findNationBySlug(slug)) {
                window.location.hash = 'nation/' + slug;
                return;
            }
        }
        openLoreModal(name);
        return;
    }

    // Close button
    if (e.target.closest('.lore-modal-close')) {
        closeLoreModal();
        return;
    }

    // Backdrop click
    if (e.target.classList.contains('lore-modal-backdrop')) {
        closeLoreModal();
        return;
    }

    // Tab switch
    const tab = e.target.closest('.lore-tab');
    if (tab && modal() && !modal().hidden) {
        document.querySelectorAll('.lore-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        loadTab(tab.dataset.tab);
        return;
    }
});

// Close on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal() && !modal().hasAttribute('hidden')) closeLoreModal();
});

// Expose for debugging
window.LoreReader = { open: openLoreModal, close: closeLoreModal, NATIONS };
