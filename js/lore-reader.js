/**
 * Lore Reader — ouvre un modal pour lire les fichiers .md des nations
 * Sources: /lore/Pays/<continent>/<file>.md et /lore/Histoires/<continent>/<file>_Histoires.md
 */

const NATIONS = {
    // Alkaran
    'Altram':    { continent: 'Alkaran', pays: 'Pays/Alkaran/Altram.md',    histoires: 'Histoires/Alkaran/Altram_Histoires.md' },
    'Torkam':    { continent: 'Alkaran', pays: 'Pays/Alkaran/Torkam.md',    histoires: 'Histoires/Alkaran/Torkam_Histoires.md' },
    'Myrtam':    { continent: 'Alkaran', pays: 'Pays/Alkaran/Myrtam.md',    histoires: 'Histoires/Alkaran/Myrtam_Histoires.md' },
    'Skaldoria': { continent: 'Alkaran', pays: 'Pays/Alkaran/Skaldoria.md', histoires: 'Histoires/Alkaran/Skaldoria_Histoires.md' },

    // Azoria
    'Caeloria':               { continent: 'Azoria', pays: 'Pays/Azoria/Caeloria.md',           histoires: 'Histoires/Azoria/Caeloria_Histoires.md' },
    'No Man\'s Land Azoria':  { continent: 'Azoria', pays: 'Pays/Azoria/NoMansLand_Azoria.md',  histoires: 'Histoires/Azoria/NoMansLand_Azoria_Histoires.md' },

    // Baelor
    'Baelor': { continent: 'Baelor', pays: 'Pays/Baelor/Baelor.md', histoires: 'Histoires/Baelor/Baelor_Histoires.md' },

    // Celethor
    'Astravia':              { continent: 'Celethor', pays: 'Pays/Celethor/Astravia.md',            histoires: 'Histoires/Celethor/Astravia_Histoires.md' },
    'Elarian':               { continent: 'Celethor', pays: 'Pays/Celethor/Elarian.md',             histoires: 'Histoires/Celethor/Elarian_Histoires.md' },
    'Ryldor':                { continent: 'Celethor', pays: 'Pays/Celethor/Ryldor.md',              histoires: 'Histoires/Celethor/Ryldor_Histoires.md' },
    'No Man\'s Land Celethor': { continent: 'Celethor', pays: 'Pays/Celethor/NoMansLand_Celethor.md', histoires: 'Histoires/Celethor/NoMansLand_Celethor_Histoires.md' },

    // Cendara
    'Cendara': { continent: 'Cendara', pays: 'Pays/Cendara/CendaraPays.md', histoires: 'Histoires/Cendara/CendaraPays_Histoires.md' },

    // Cestra
    'Cestra': { continent: 'Cestra', pays: 'Pays/Cestra/Cestra.md', histoires: 'Histoires/Cestra/Cestra_Histoires.md' },

    // Endora
    'Avalor':    { continent: 'Endora', pays: 'Pays/Endora/Avalor.md',    histoires: 'Histoires/Endora/Avalor_Histoires.md' },
    'Iskara':    { continent: 'Endora', pays: 'Pays/Endora/Iskara.md',    histoires: 'Histoires/Endora/Iskara_Histoires.md' },
    'Thalmaris': { continent: 'Endora', pays: 'Pays/Endora/Thalmaris.md', histoires: 'Histoires/Endora/Thalmaris_Histoires.md' },

    // Evertia
    'Evertia': { continent: 'Evertia', pays: 'Pays/Evertia/EvertiaPays.md', histoires: 'Histoires/Evertia/EvertiaPays_Histoires.md' },

    // Galenor
    'Kharazir': { continent: 'Galenor', pays: 'Pays/Galenor/Kharazir.md', histoires: 'Histoires/Galenor/Kharazir_Histoires.md' },
    'Lumasar':  { continent: 'Galenor', pays: 'Pays/Galenor/Lumasar.md',  histoires: 'Histoires/Galenor/Lumasar_Histoires.md' },
    'Seraphia': { continent: 'Galenor', pays: 'Pays/Galenor/Seraphia.md', histoires: 'Histoires/Galenor/Seraphia_Histoires.md' },
    'Solena':   { continent: 'Galenor', pays: 'Pays/Galenor/Solena.md',   histoires: 'Histoires/Galenor/Solena_Histoires.md' },
    'Trinoria': { continent: 'Galenor', pays: 'Pays/Galenor/Trinoria.md', histoires: 'Histoires/Galenor/Trinoria_Histoires.md' },
    'Valoria':  { continent: 'Galenor', pays: 'Pays/Galenor/Valoria.md',  histoires: 'Histoires/Galenor/Valoria_Histoires.md' },
    'Ventera':  { continent: 'Galenor', pays: 'Pays/Galenor/Ventera.md',  histoires: 'Histoires/Galenor/Ventera_Histoires.md' },

    // Ilthara
    'Ackerna':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Ackerna.md',   histoires: 'Histoires/Ilthara/Ackerna_Histoires.md' },
    'Drakora':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Drakora.md',   histoires: 'Histoires/Ilthara/Drakora_Histoires.md' },
    'Gryndor':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Gryndor.md',   histoires: 'Histoires/Ilthara/Gryndor_Histoires.md' },
    'Haldria':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Haldria.md',   histoires: 'Histoires/Ilthara/Haldria_Histoires.md' },
    'Lythar':    { continent: 'Ilthara', pays: 'Pays/Ilthara/Lythar.md',    histoires: 'Histoires/Ilthara/Lythar_Histoires.md' },
    'Pyrtara':   { continent: 'Ilthara', pays: 'Pays/Ilthara/Pyrtara.md',   histoires: 'Histoires/Ilthara/Pyrtara_Histoires.md' },
    'Sylthara':  { continent: 'Ilthara', pays: 'Pays/Ilthara/Sylthara.md',  histoires: 'Histoires/Ilthara/Sylthara_Histoires.md' },
    'Vytharia':  { continent: 'Ilthara', pays: 'Pays/Ilthara/Vytharia.md',  histoires: 'Histoires/Ilthara/Vytharia_Histoires.md' },
    'Warenthor': { continent: 'Ilthara', pays: 'Pays/Ilthara/Warenthor.md', histoires: 'Histoires/Ilthara/Warenthor_Histoires.md' },

    // Nysaria
    'Nysaria': { continent: 'Nysaria', pays: 'Pays/Nysaria/Nysaria.md', histoires: 'Histoires/Nysaria/Nysaria_Histoires.md' },

    // Onara
    'Mosrack': { continent: 'Onara', pays: 'Pays/Onara/Mosrack.md', histoires: 'Histoires/Onara/Mosrack_Histoires.md' },
    'Tyndara': { continent: 'Onara', pays: 'Pays/Onara/Tyndara.md', histoires: 'Histoires/Onara/Tyndara_Histoires.md' },

    // Ulinor
    'Ulinor': { continent: 'Ulinor', pays: 'Pays/Ulinor/UlinorPays.md', histoires: 'Histoires/Ulinor/UlinorPays_Histoires.md' },
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
function openLoreModal(nationName) {
    const nation = NATIONS[nationName];
    if (!nation) return;

    _currentNation = nationName;
    _currentTab = 'pays';

    const m = modal();
    m.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    modalTitle().textContent = nationName;

    // Reset tabs
    document.querySelectorAll('.lore-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.lore-tab[data-tab="pays"]').classList.add('active');

    // Hide histoires tab if no file
    const tabH = tabHistoires();
    tabH.style.display = nation.histoires ? '' : 'none';

    loadTab('pays');
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
    // Strip Obsidian wiki links: [[File|Display]] → Display, [[File]] → File
    const clean = text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, file, display) => display || file);
    const html = marked.parse(clean, { breaks: true });
    container.innerHTML = `<div class="lore-md-content">${html}</div>`;
    container.scrollTop = 0;
}

// ── Event delegation ──────────────────────────────────────────
document.addEventListener('click', e => {
    // Nation links (delegated — lore.html may not be loaded yet)
    const nationLink = e.target.closest('.nation-link');
    if (nationLink) {
        e.preventDefault();
        openLoreModal(nationLink.dataset.nation);
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
