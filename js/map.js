function initMap() {
    if (window._mapInitialized) return;
    window._mapInitialized = true;

    // Configuration globale
    const CONFIG = {
        worldWidthKm: 1000,
        layers: [
            { fontSize: "0.03", storage: "continentsElements", xOffset: 0, yOffset: 0, zoomRange: [0, 2] },
            { fontSize: "0.01", storage: "paysElements", xOffset: 0, yOffset: 0, zoomRange: [2, 4] },
            { fontSize: "0.004", storage: "regionElements", xOffset: 0, yOffset: 0, zoomRange: [4, 10] },
            { fontSize: "0.011", storage: "capitalesElements", xOffset: 0, yOffset: 0.020, showMarker: true, iconScale: 1.5, zoomRange: [10, Infinity] },
            { fontSize: "0.010", storage: "citesElements", xOffset: 0, yOffset: 0.016, showMarker: true, iconScale: 1.2, zoomRange: [14, Infinity] },
            { fontSize: "0.010", storage: "villesElements", xOffset: 0, yOffset: 0.012, showMarker: true, iconScale: 0.8, zoomRange: [16, Infinity] },
            { fontSize: "0.010", storage: "villagesElements", xOffset: 0, yOffset: 0.011, showMarker: true, iconScale: 0.6, zoomRange: [18, Infinity] }
        ]
    };

    // === Icônes SVG par tier — style médiéval hand-drawn ===
    // viewBox 0 0 32 32, mises à l'échelle dynamiquement.
    // Palette :
    //   parchemin clair  #F5EBD8  (corps des bâtiments)
    //   parchemin ombre  #E0D2B6  (façades de pierre dans l'ombre)
    //   encre brune      #3a2a1f  (contours, fenêtres, portes)
    //   tuile claire     #C26A3A  (toits exposés au soleil)
    //   tuile sombre     #8B3F1F  (toits dans l'ombre)
    //   bannière dorée   #C9A84C
    //   bannière cramoisie #8E2A2A
    //   pierre grise     #B8AC9A
    const ICON_SVG = {
        capitalesElements: `
            <!-- CAPITALE : grande cité fortifiée — donjon central + 2 corps de logis + bannière -->
            <!-- Logis arrière gauche (corps en pierre, toit pentu) -->
            <path d="M4 13 L8 9 L12 13 L12 17 L4 17 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.5"/>
            <path d="M5 14 L8 11 L11 14" fill="none" stroke="#8B3F1F" stroke-width="0.4"/>
            <rect x="4" y="16" width="8" height="11" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="6" y="19" width="1.5" height="2" fill="#3a2a1f"/>
            <rect x="8.5" y="19" width="1.5" height="2" fill="#3a2a1f"/>
            <!-- Logis arrière droit -->
            <path d="M20 13 L24 9 L28 13 L28 17 L20 17 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.5"/>
            <path d="M21 14 L24 11 L27 14" fill="none" stroke="#8B3F1F" stroke-width="0.4"/>
            <rect x="20" y="16" width="8" height="11" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="22" y="19" width="1.5" height="2" fill="#3a2a1f"/>
            <rect x="24.5" y="19" width="1.5" height="2" fill="#3a2a1f"/>
            <!-- Donjon central — corps de pierre -->
            <rect x="12" y="6" width="8" height="21" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.7"/>
            <rect x="12" y="6" width="8" height="2" fill="#E0D2B6" stroke="none"/>
            <!-- Crenelations du donjon -->
            <path d="M12 5 L13.5 5 L13.5 6 L15 6 L15 5 L17 5 L17 6 L18.5 6 L18.5 5 L20 5 L20 6" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5" stroke-linejoin="miter"/>
            <!-- Fenêtre meurtrière -->
            <rect x="15" y="11" width="2" height="3" fill="#3a2a1f"/>
            <rect x="15.5" y="13" width="1" height="2" fill="#3a2a1f"/>
            <!-- Pierres de moellons -->
            <line x1="12" y1="13" x2="20" y2="13" stroke="#3a2a1f" stroke-width="0.2" stroke-dasharray="0.5 0.5" opacity="0.6"/>
            <line x1="12" y1="17" x2="20" y2="17" stroke="#3a2a1f" stroke-width="0.2" stroke-dasharray="0.5 0.5" opacity="0.6"/>
            <line x1="12" y1="21" x2="20" y2="21" stroke="#3a2a1f" stroke-width="0.2" stroke-dasharray="0.5 0.5" opacity="0.6"/>
            <!-- Mât + bannière dorée triangulaire -->
            <line x1="16" y1="0" x2="16" y2="5" stroke="#3a2a1f" stroke-width="0.5"/>
            <path d="M16 0.5 L23 2 L16 3.5 Z" fill="#C9A84C" stroke="#3a2a1f" stroke-width="0.4"/>
            <!-- Murailles devant -->
            <rect x="2" y="20" width="28" height="7" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="2" y="20" width="28" height="1.5" fill="#E0D2B6"/>
            <!-- Crenelations muraille -->
            <path d="M2 20 L4 20 L4 18 L6 18 L6 20 L9 20 L9 18 L11 18 L11 20 L21 20 L21 18 L23 18 L23 20 L26 20 L26 18 L28 18 L28 20 L30 20" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5" stroke-linejoin="miter"/>
            <!-- Tours d'angle -->
            <rect x="0" y="15" width="4" height="12" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="0" y="15" width="4" height="1.5" fill="#E0D2B6"/>
            <path d="M0 15 L1 15 L1 13 L2 13 L2 15 L3 15 L3 13 L4 13 L4 15" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.4" stroke-linejoin="miter"/>
            <rect x="28" y="15" width="4" height="12" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="28" y="15" width="4" height="1.5" fill="#E0D2B6"/>
            <path d="M28 15 L29 15 L29 13 L30 13 L30 15 L31 15 L31 13 L32 13 L32 15" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.4" stroke-linejoin="miter"/>
            <!-- Porte d'entrée arquée -->
            <path d="M14 27 L14 23 Q14 21.5 16 21.5 Q18 21.5 18 23 L18 27 Z" fill="#3a2a1f"/>
            <line x1="16" y1="22" x2="16" y2="27" stroke="#5a3a2a" stroke-width="0.3"/>
        `,
        citesElements: `
            <!-- CITÉ : ville murée moyenne — clocher, beffroi, maisons à pignon -->
            <!-- Maison gauche (pignon visible derrière la muraille) -->
            <path d="M5 13 L8 9 L11 13 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.45"/>
            <rect x="5" y="13" width="6" height="8" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.45"/>
            <rect x="7" y="15" width="1" height="2" fill="#3a2a1f"/>
            <!-- Beffroi/tour avec coupole -->
            <rect x="20" y="8" width="6" height="13" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.55"/>
            <rect x="20" y="8" width="6" height="1.5" fill="#E0D2B6"/>
            <path d="M20 8 L23 5 L26 8 Z" fill="#8B3F1F" stroke="#3a2a1f" stroke-width="0.4"/>
            <line x1="23" y1="2" x2="23" y2="5" stroke="#3a2a1f" stroke-width="0.4"/>
            <circle cx="23" cy="5" r="0.5" fill="#C9A84C" stroke="#3a2a1f" stroke-width="0.3"/>
            <rect x="22" y="13" width="2" height="3" fill="#3a2a1f"/>
            <!-- Clocher d'église -->
            <path d="M13 11 L15 7 L17 11 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.4"/>
            <rect x="13.5" y="11" width="3" height="9" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.4"/>
            <line x1="15" y1="5" x2="15" y2="7" stroke="#3a2a1f" stroke-width="0.4"/>
            <path d="M14 6 L16 6 M15 5 L15 7" stroke="#3a2a1f" stroke-width="0.4"/>
            <rect x="14.5" y="14" width="1" height="2" fill="#3a2a1f"/>
            <!-- Muraille frontale -->
            <rect x="3" y="21" width="24" height="6" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="3" y="21" width="24" height="1.2" fill="#E0D2B6"/>
            <path d="M3 21 L4.5 21 L4.5 19.5 L6 19.5 L6 21 L8 21 L8 19.5 L9.5 19.5 L9.5 21 L17.5 21 L17.5 19.5 L19 19.5 L19 21 L21 21 L21 19.5 L22.5 19.5 L22.5 21 L24 21 L24 19.5 L25.5 19.5 L25.5 21 L27 21" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.4" stroke-linejoin="miter"/>
            <!-- Porte arquée -->
            <path d="M12 27 L12 23.5 Q12 22.5 13.25 22.5 Q14.5 22.5 14.5 23.5 L14.5 27 Z" fill="#3a2a1f"/>
        `,
        villesElements: `
            <!-- VILLE : groupement de 4 maisons (pas de muraille) avec église -->
            <!-- Maison gauche -->
            <path d="M3 17 L6 12 L9 17 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.5"/>
            <path d="M3 17 L4 13 M9 17 L8 13" fill="none" stroke="#8B3F1F" stroke-width="0.3" opacity="0.6"/>
            <rect x="3" y="17" width="6" height="10" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="5" y="20" width="1.5" height="2" fill="#3a2a1f"/>
            <rect x="3.5" y="23" width="1" height="1.5" fill="#3a2a1f"/>
            <!-- Maison-église centrale (avec petit clocher) -->
            <rect x="13" y="11" width="2" height="4" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.4"/>
            <path d="M13 11 L14 9 L15 11 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.4"/>
            <line x1="14" y1="7.5" x2="14" y2="9" stroke="#3a2a1f" stroke-width="0.4"/>
            <path d="M13.3 8.3 L14.7 8.3 M14 7.5 L14 9" stroke="#3a2a1f" stroke-width="0.3"/>
            <path d="M10 16 L14 11 L18 16 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="10" y="16" width="8" height="11" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <path d="M13 22 L13 27 L15 27 L15 22 Q14 21 13 22 Z" fill="#3a2a1f"/>
            <rect x="11" y="19" width="1.5" height="2" fill="#3a2a1f"/>
            <rect x="15.5" y="19" width="1.5" height="2" fill="#3a2a1f"/>
            <!-- Maison droite haute -->
            <path d="M19 16 L22 11 L25 16 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.5"/>
            <path d="M19 16 L20 13 M25 16 L24 13" fill="none" stroke="#8B3F1F" stroke-width="0.3" opacity="0.6"/>
            <rect x="19" y="16" width="6" height="11" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="21" y="19" width="1.5" height="2" fill="#3a2a1f"/>
            <rect x="23" y="22" width="1.5" height="3" fill="#3a2a1f"/>
            <!-- Petite maison droite (front) -->
            <path d="M25 19 L27.5 16 L30 19 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="25" y="19" width="5" height="8" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="26" y="22" width="1" height="2" fill="#3a2a1f"/>
            <rect x="27.5" y="24" width="1" height="2.5" fill="#3a2a1f"/>
        `,
        villagesElements: `
            <!-- VILLAGE : 3 maisonnettes simples -->
            <!-- Maison gauche -->
            <path d="M3 18 L6 14 L9 18 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="3" y="18" width="6" height="9" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="5" y="22" width="1.2" height="2" fill="#3a2a1f"/>
            <rect x="3.5" y="20" width="1" height="1" fill="#3a2a1f"/>
            <!-- Maison centrale (un peu plus haute) -->
            <path d="M11 17 L15 11 L19 17 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="11" y="17" width="8" height="10" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <path d="M13 22 L13 27 L15 27 L15 22 Q14 21.3 13 22 Z" fill="#3a2a1f"/>
            <rect x="16" y="20" width="1.5" height="2" fill="#3a2a1f"/>
            <!-- Petit cheminée fumant -->
            <rect x="13" y="13" width="1" height="3" fill="#3a2a1f"/>
            <!-- Maison droite -->
            <path d="M21 19 L24 15 L27 19 Z" fill="#C26A3A" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="21" y="19" width="6" height="8" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.5"/>
            <rect x="23" y="22" width="1.2" height="2" fill="#3a2a1f"/>
            <rect x="25" y="20" width="1" height="1" fill="#3a2a1f"/>
        `,
        ruineElements: `
            <!-- RUINE : tour brisée + restes de murailles -->
            <!-- Restes de mur gauche -->
            <path d="M2 27 L2 21 L4 21 L4 19 L6 19 L6 22 L8 22 L8 27 Z" fill="#B8AC9A" stroke="#3a2a1f" stroke-width="0.5"/>
            <!-- Tour principale brisée -->
            <path d="M11 27 L11 7 L13 5 L14 8 L16 4 L18 7 L19 9 L21 7 L21 18 L19 19 L21 21 L21 27 Z" fill="#F5EBD8" stroke="#3a2a1f" stroke-width="0.6"/>
            <path d="M11 27 L11 7 L13 5 L14 8 L16 4 L18 7" fill="none" stroke="#8B3F1F" stroke-width="0.3" opacity="0.5"/>
            <!-- Fenêtres écroulées -->
            <rect x="13" y="12" width="2" height="3" fill="#3a2a1f"/>
            <path d="M13 15 L15 15 L14.5 16 Z" fill="#3a2a1f"/>
            <rect x="15.5" y="20" width="2" height="3" fill="#3a2a1f"/>
            <!-- Pierres tombées au sol -->
            <ellipse cx="9" cy="26.5" rx="1.5" ry="0.7" fill="#B8AC9A" stroke="#3a2a1f" stroke-width="0.3"/>
            <ellipse cx="23" cy="26.7" rx="1.2" ry="0.6" fill="#B8AC9A" stroke="#3a2a1f" stroke-width="0.3"/>
            <ellipse cx="25.5" cy="26.5" rx="1" ry="0.5" fill="#B8AC9A" stroke="#3a2a1f" stroke-width="0.3"/>
            <!-- Restes de mur droit -->
            <path d="M24 27 L24 22 L26 22 L26 24 L28 24 L28 27 Z" fill="#B8AC9A" stroke="#3a2a1f" stroke-width="0.5"/>
        `
    };

    function createTierIcon(tier, cx, cy, fontSize, scale, offsetX, offsetY) {
        const ns = "http://www.w3.org/2000/svg";
        const g = document.createElementNS(ns, "g");
        const iconSize = fontSize * (scale || 8);
        // L'icône est ancrée par sa BASE (les bâtiments reposent sur le sol au point cx,cy)
        const tx = cx + offsetX - (iconSize / 2);
        const ty = cy + offsetY - iconSize;
        const s = iconSize / 32;
        g.setAttribute("transform", `translate(${tx} ${ty}) scale(${s})`);
        g.setAttribute("pointer-events", "none");
        const content = ICON_SVG[tier] || ICON_SVG.villagesElements;
        const parser = new DOMParser();
        const doc = parser.parseFromString(
            `<svg xmlns="http://www.w3.org/2000/svg">${content}</svg>`,
            'image/svg+xml'
        );
        const root = doc.documentElement;
        while (root.firstChild) g.appendChild(root.firstChild);
        return g;
    }

    // Variables globales
    let viewer;
    let svgOverlay;
    let bordersLayer;
    let measureLayer;
    let gridLayer;
    
    // Stockage des éléments
    const elementStorage = {};
    const allNames = [];
    const allTextElements = [];
    const allRectElements = [];
    
    // États
    let textVisibilityEnabled = true;
    let markersVisible = false;
    let measureMode = null;
    let measurePoints = [];
    let currentGridSize = 10;
    let gridVisible = false;
    let wrappingEnabled = false;

    // Lore system
    let loreIndex = {};
    let loreCache = {};

    // Timeline system
    let timelineData = null;
    let currentEraId = 'actuelle';

    // Editor mode
    let editorMode = false;
    let editorAuthenticated = false;
    let editorTrackers = [];
    let editorDragTrackers = [];
    let addPointMode = false;
    let editorActiveMode = 'none'; // 'none' | 'move' | 'borders' | 'addPoint'

    // Border system
    let bordersData = {};
    let borderDrawMode = false;
    let borderDrawPoints = [];
    let borderDrawPreview = [];
    let colorFilterMode = false;
    let highlightedBorder = null;

    // Borders panel system
    let borderPanelVisible = false;
    let selectedBorderKey = null;
    let borderEditHandles = [];
    let borderMidHandles = [];
    let borderEditLayer = null;
    let borderAddPointMode = false;
    let borderDeletePointMode = false;
    let borderDragIdx = -1;
    let borderDragHandle = null;
    let borderSnapEnabled = true;

    const BORDER_TYPE_COLORS = {
        continentsElements: { stroke: 'rgba(231, 76, 60, 0.8)', fill: 'rgba(231, 76, 60, 0.15)', dot: '#e74c3c', label: 'Continent' },
        paysElements:       { stroke: 'rgba(52, 152, 219, 0.8)', fill: 'rgba(52, 152, 219, 0.15)', dot: '#3498db', label: 'Pays' },
        regionElements:     { stroke: 'rgba(46, 204, 113, 0.8)', fill: 'rgba(46, 204, 113, 0.15)', dot: '#2ecc71', label: 'R\u00e9gion' },
        coastlineElements:  { stroke: 'rgba(139, 90, 43, 0.9)', fill: 'transparent', dot: '#8b5a2b', label: 'C\u00f4te' },
        lakeElements:       { stroke: 'rgba(70, 130, 180, 0.8)', fill: 'rgba(70, 130, 180, 0.25)', dot: '#4682b4', label: 'Lac' },
        riverElements:      { stroke: 'rgba(30, 100, 180, 0.85)', fill: 'none', dot: '#1e64b4', label: 'Rivi\u00e8re', isLine: true }
    };

    const SNAP_THRESHOLD_PX = 12;

    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const COUNTRY_COLORS = [
        'rgba(231, 76, 60, 0.25)',   'rgba(46, 204, 113, 0.25)',
        'rgba(52, 152, 219, 0.25)',  'rgba(155, 89, 182, 0.25)',
        'rgba(241, 196, 15, 0.25)',  'rgba(230, 126, 34, 0.25)',
        'rgba(26, 188, 156, 0.25)',  'rgba(22, 160, 133, 0.25)',
        'rgba(192, 57, 43, 0.25)',   'rgba(41, 128, 185, 0.25)',
        'rgba(142, 68, 173, 0.25)',  'rgba(39, 174, 96, 0.25)',
        'rgba(211, 84, 0, 0.25)',    'rgba(44, 62, 80, 0.25)',
        'rgba(243, 156, 18, 0.25)',  'rgba(127, 140, 141, 0.25)'
    ];

    // Initialisation du viewer OpenSeadragon
    function initViewer() {
        // Vérifier l'état du wrapping depuis les paramètres URL
        const urlParams = new URLSearchParams(window.location.search);
        const wrappingParam = urlParams.get('wrapping');
        if (wrappingParam !== null) {
            wrappingEnabled = wrappingParam === 'true';
        }

        viewer = OpenSeadragon({
            id: "openseadragon1",
            prefixUrl: "./images/",
            tileSources: "https://hybelior-tiles.nicolas-vollard.workers.dev/HybeliorMap.dzi",
            // Options pour le wrapping infini (selon l'état)
            wrapHorizontal: wrappingEnabled,
            wrapVertical: wrappingEnabled,
            visibilityRatio: wrappingEnabled ? 0 : 0.5, // Permet de voir en dehors des limites si wrapping activé
            constrainDuringPan: !wrappingEnabled, // Autorise le pan libre si wrapping activé
            // Options d'optimisation
            showNavigationControl: false,
            preserveImageSizeOnResize: true,
            // Gestion des gestes pour une navigation fluide
            gestureSettingsMouse: {
                flickEnabled: true,
                clickToZoom: false
            }
        });
        window._viewer = viewer; // expose for debug/external navigation

        svgOverlay = viewer.svgOverlay();
        initLayers();
        initEventHandlers();
        loadFromDatabase();
        loadLoreIndex();
        loadTimelineData();

        // Afficher l'état du wrapping dans le bouton
        updateWrappingButton();
    }

    // Initialisation des couches SVG
    var geoLayer = null; // Coastlines, lakes, rivers — always visible

    function initLayers() {
        // Couche géographique (côtes, lacs, rivières) — toujours visible
        geoLayer = createSVGGroup('geoLayer');

        // Couche pour les frontières (visible par défaut pour les continents colorés)
        bordersLayer = createSVGGroup('bordersLayer');

        // Couche pour les handles d'édition de frontières
        borderEditLayer = createSVGGroup('borderEditLayer');
        
        // Couche pour les mesures
        measureLayer = createSVGGroup('measureLayer');
        
        // Couche pour la grille
        gridLayer = createSVGGroup('gridLayer');
        gridLayer.classList.add('grid-overlay');
        gridLayer.style.display = 'none';
        
        // Chargement des frontières depuis la DB
        loadBorders();
        
        // Timeline
        initTimeline();
    }

    function createSVGGroup(id) {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute('id', id);
        svgOverlay.node().appendChild(group);
        return group;
    }

    // === Border System ===

    function loadBorders() {
        function parseBorders(borders) {
            bordersData = {};
            borders.forEach(b => {
                const key = b.name + '|' + (b.era_id || 'actuelle');
                const pts = typeof b.points === 'string' ? JSON.parse(b.points) : b.points;
                const paths = b.paths ? (typeof b.paths === 'string' ? JSON.parse(b.paths) : b.paths) : null;
                bordersData[key] = {
                    ...b,
                    points: pts,
                    paths: paths,
                    parent_name: b.parent_name || null,
                    svgElements: []
                };
            });
            renderAllBorders();
        }

        // Load all borders from API (merges static + user-edited borders server-side)
        fetch('/api/borders')
            .then(r => r.json())
            .then(borders => parseBorders(borders))
            .catch(err => console.warn('Chargement frontières:', err));

        // Timeline hook
        window.updateBorders = function() {
            renderAllBorders();
        };
    }

    function getCountryColor(name) {
        const key = name + '|' + (currentEraId || 'actuelle');
        if (bordersData[key] && bordersData[key].color) return bordersData[key].color;
        let hash = 0;
        for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash) + name.charCodeAt(i);
        return COUNTRY_COLORS[Math.abs(hash) % COUNTRY_COLORS.length];
    }

    function renderAllBorders() {
        while (bordersLayer.firstChild) bordersLayer.removeChild(bordersLayer.firstChild);
        while (geoLayer.firstChild) geoLayer.removeChild(geoLayer.firstChild);

        // Ocean background when color filter is active
        if (colorFilterMode) {
            const ocean = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            ocean.setAttribute('x', '-1');
            ocean.setAttribute('y', '-1');
            ocean.setAttribute('width', '3');
            ocean.setAttribute('height', '3');
            ocean.setAttribute('fill', 'rgba(52, 152, 219, 0.10)');
            ocean.setAttribute('pointer-events', 'none');
            bordersLayer.appendChild(ocean);
        }

        const positions = wrappingEnabled ? [
            {x:0,y:0},{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},
            {x:1,y:1},{x:-1,y:1},{x:1,y:-1},{x:-1,y:-1}
        ] : [{x:0,y:0}];

        Object.values(bordersData).forEach(border => {
            const eraId = border.era_id || 'actuelle';
            if (eraId !== 'actuelle' && eraId !== currentEraId) return;
            if (!border.points || border.points.length < 2) return;
            const typeColors = BORDER_TYPE_COLORS[border.entity_type] || BORDER_TYPE_COLORS.paysElements;
            const isLineType = typeColors.isLine || false;
            if (!isLineType && border.points.length < 3) return;
            border.svgElements = [];

            // Build SVG path data: supports multiple subpaths for islands
            const allPaths = border.paths || [border.points];
            const pathD = allPaths.map(pts => {
                if (!pts || pts.length < 3) return '';
                return 'M' + pts.map(p => p.x + ' ' + p.y).join('L') + 'Z';
            }).filter(Boolean).join(' ');
            const pointsStr = border.points.map(p => p.x + ',' + p.y).join(' ');
            const usePathElement = allPaths.length > 1 && pathD;
            const borderKey = border.name + '|' + eraId;
            const isSelected = borderKey === selectedBorderKey;

            // Per-continent color + geographic features support
            const hasOwnColor = border.color && border.entity_type === 'continentsElements';
            const isGeoFeature = ['coastlineElements','lakeElements','riverElements'].includes(border.entity_type);
            let strokeColor, strokeWidth, fillColor;

            // Adaptive stroke width: thinner when zoomed in
            const zoom = viewer ? viewer.viewport.getZoom(true) : 1;
            const baseWidth = 0.0015 / Math.max(1, Math.sqrt(zoom));

            if (hasOwnColor && !borderPanelVisible) {
                strokeColor = hexToRgba(border.color, 0.85);
                strokeWidth = String(baseWidth);
                fillColor = hexToRgba(border.color, 0.10);
            } else if (isGeoFeature) {
                strokeColor = typeColors.stroke;
                strokeWidth = border.entity_type === 'coastlineElements' ? '0.003' : (border.entity_type === 'lakeElements' ? '0.002' : '0.0015');
                fillColor = isLineType ? 'none' : typeColors.fill;
            } else {
                strokeColor = borderPanelVisible ? typeColors.stroke : 'rgba(178, 148, 96, 0.6)';
                strokeWidth = String(baseWidth * 0.8);
                fillColor = 'transparent';
            }

            if (isLineType) fillColor = 'none';
            if (isSelected) {
                strokeColor = hasOwnColor ? hexToRgba(border.color, 1) : typeColors.stroke;
                strokeWidth = '0.003';
                fillColor = (hasOwnColor ? hexToRgba(border.color, 0.25) : typeColors.fill);
                if (isLineType) fillColor = 'none';
            }

            if (colorFilterMode && !isGeoFeature && !isLineType) fillColor = getCountryColor(border.name);

            positions.forEach(offset => {
                const tagName = isLineType ? 'polyline' : (usePathElement ? 'path' : 'polygon');
                const poly = document.createElementNS("http://www.w3.org/2000/svg", tagName);
                if (usePathElement && !isLineType) {
                    poly.setAttribute('d', pathD);
                    poly.setAttribute('fill-rule', 'evenodd');
                } else {
                    poly.setAttribute('points', pointsStr);
                }
                poly.setAttribute('stroke', strokeColor);
                poly.setAttribute('stroke-width', strokeWidth);
                poly.setAttribute('fill', fillColor);
                poly.setAttribute('stroke-linejoin', 'round');
                if (isLineType) {
                    poly.setAttribute('stroke-linecap', 'round');
                }
                if (offset.x !== 0 || offset.y !== 0) {
                    poly.setAttribute('transform', `translate(${offset.x}, ${offset.y})`);
                }
                poly.setAttribute('pointer-events', 'all');
                poly.style.cursor = 'pointer';

                poly.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (borderPanelVisible) {
                        selectBorder(borderKey);
                    } else {
                        highlightBorder(border.name);
                        showInfoPanel(border.name, { '': border.name });
                    }
                });
                poly.addEventListener('mouseover', () => {
                    if (!colorFilterMode && highlightedBorder !== border.name && !isSelected) {
                        const hoverFill = hasOwnColor ? hexToRgba(border.color, 0.22) : (borderPanelVisible ? typeColors.fill : 'rgba(178, 148, 96, 0.12)');
                        poly.setAttribute('fill', hoverFill);
                    }
                });
                poly.addEventListener('mouseout', () => {
                    if (!colorFilterMode && highlightedBorder !== border.name && !isSelected) {
                        const baseFill = hasOwnColor && !borderPanelVisible ? hexToRgba(border.color, 0.12) : 'transparent';
                        poly.setAttribute('fill', baseFill);
                    }
                });

                // Geographic features go in always-visible geoLayer
                var targetLayer = isGeoFeature ? geoLayer : bordersLayer;
                targetLayer.appendChild(poly);
                border.svgElements.push(poly);
            });
        });
    }

    function highlightBorder(name) {
        // Clear previous highlight
        if (highlightedBorder) {
            const prevKey = Object.keys(bordersData).find(k => bordersData[k].name === highlightedBorder);
            if (prevKey && bordersData[prevKey]) {
                bordersData[prevKey].svgElements.forEach(el => {
                    el.setAttribute('fill', colorFilterMode ? getCountryColor(highlightedBorder) : 'transparent');
                });
            }
        }
        // Apply new highlight
        highlightedBorder = name;
        const key = Object.keys(bordersData).find(k => bordersData[k].name === name);
        if (key && bordersData[key]) {
            bordersData[key].svgElements.forEach(el => {
                el.setAttribute('fill', 'rgba(201, 168, 76, 0.3)');
                el.setAttribute('stroke', 'rgba(201, 168, 76, 0.9)');
                el.setAttribute('stroke-width', '0.002');
            });
        }
    }

    function clearHighlight() {
        if (highlightedBorder) {
            const key = Object.keys(bordersData).find(k => bordersData[k].name === highlightedBorder);
            if (key && bordersData[key]) {
                bordersData[key].svgElements.forEach(el => {
                    el.setAttribute('fill', colorFilterMode ? getCountryColor(highlightedBorder) : 'transparent');
                    el.setAttribute('stroke', 'rgba(178, 148, 96, 0.6)');
                    el.setAttribute('stroke-width', '0.001');
                });
            }
            highlightedBorder = null;
        }
    }

    function toggleColorFilter() {
        colorFilterMode = !colorFilterMode;
        const btn = document.getElementById('toggleColorFilter');
        if (btn) btn.classList.toggle('active', colorFilterMode);
        if (colorFilterMode) bordersLayer.style.display = 'block';
        renderAllBorders();
    }

    // ===== BORDERS PANEL =====

    function openBordersPanel() {
        borderPanelVisible = true;
        document.getElementById('bordersPanel').style.display = 'block';
        // Close info panel if open
        document.getElementById('infoPanel').style.display = 'none';
        document.body.classList.remove('info-panel-visible');
        // Show borders
        bordersLayer.style.display = 'block';
        document.getElementById('toggleBorders').classList.add('active');
        renderAllBorders();
        populateBordersTree();
        populateParentDropdown();
        // Zoom handler to adapt handle sizes
        viewer.addHandler('zoom', updateHandleRadii);
    }

    function closeBordersPanel() {
        borderPanelVisible = false;
        deselectBorder();
        document.getElementById('bordersPanel').style.display = 'none';
        cancelBorderDraw();
        document.getElementById('borderDrawHint').style.display = 'none';
        viewer.removeHandler('zoom', updateHandleRadii);
        renderAllBorders();
    }

    function populateBordersTree() {
        const tree = document.getElementById('bordersTree');
        tree.innerHTML = '';
        const era = currentEraId || 'actuelle';

        // Build hierarchy: continents → pays → regions, plus geo features
        const continents = [];
        const orphans = [];
        const geoFeatures = []; // coastlines, lakes, rivers

        Object.keys(bordersData).forEach(key => {
            const b = bordersData[key];
            const bEra = b.era_id || 'actuelle';
            if (bEra !== 'actuelle' && bEra !== era) return;
            if (b.entity_type === 'continentsElements') {
                continents.push({ key, border: b, children: [] });
            }
        });

        // Attach pays to continents
        Object.keys(bordersData).forEach(key => {
            const b = bordersData[key];
            const bEra = b.era_id || 'actuelle';
            if (bEra !== 'actuelle' && bEra !== era) return;
            if (b.entity_type === 'paysElements') {
                const parent = continents.find(c => c.border.name === b.parent_name);
                if (parent) {
                    parent.children.push({ key, border: b, children: [] });
                } else {
                    orphans.push({ key, border: b, children: [] });
                }
            }
        });

        // Attach regions to pays
        Object.keys(bordersData).forEach(key => {
            const b = bordersData[key];
            const bEra = b.era_id || 'actuelle';
            if (bEra !== 'actuelle' && bEra !== era) return;
            if (b.entity_type === 'regionElements') {
                let attached = false;
                for (const cont of continents) {
                    const parentPays = cont.children.find(p => p.border.name === b.parent_name);
                    if (parentPays) { parentPays.children.push({ key, border: b }); attached = true; break; }
                }
                if (!attached) {
                    for (const orph of orphans) {
                        if (orph.border.name === b.parent_name) { orph.children.push({ key, border: b }); attached = true; break; }
                    }
                }
                if (!attached) orphans.push({ key, border: b, children: [] });
            }
        });

        // Collect geographic features (coastlines, lakes, rivers)
        Object.keys(bordersData).forEach(key => {
            const b = bordersData[key];
            const bEra = b.era_id || 'actuelle';
            if (bEra !== 'actuelle' && bEra !== era) return;
            if (['coastlineElements', 'lakeElements', 'riverElements'].includes(b.entity_type)) {
                geoFeatures.push({ key, border: b, children: [] });
            }
        });

        function createItem(node, level) {
            const item = document.createElement('div');
            item.className = 'border-tree-item' + (node.key === selectedBorderKey ? ' selected' : '');
            item.style.paddingLeft = (8 + level * 16) + 'px';

            const hasChildren = node.children && node.children.length > 0;
            const toggle = document.createElement('span');
            toggle.className = 'tree-toggle';
            toggle.textContent = hasChildren ? '\u25BC' : '';
            item.appendChild(toggle);

            const dot = document.createElement('span');
            dot.className = 'border-type-dot';
            const typeClassMap = {
                continentsElements: 'continent',
                paysElements: 'pays',
                regionElements: 'region',
                coastlineElements: 'coastline',
                lakeElements: 'lake',
                riverElements: 'river'
            };
            dot.classList.add(typeClassMap[node.border.entity_type] || 'region');
            item.appendChild(dot);

            const label = document.createElement('span');
            label.textContent = node.border.name;
            item.appendChild(label);

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                selectBorder(node.key);
            });

            return item;
        }

        function renderNode(container, node, level) {
            container.appendChild(createItem(node, level));
            if (node.children && node.children.length > 0) {
                const childContainer = document.createElement('div');
                childContainer.className = 'border-tree-children';
                node.children.forEach(child => renderNode(childContainer, child, level + 1));
                container.appendChild(childContainer);
            }
        }

        continents.forEach(c => renderNode(tree, c, 0));

        // Orphans under "Ocean" group
        if (orphans.length > 0) {
            const oceanHeader = document.createElement('div');
            oceanHeader.className = 'border-tree-item';
            oceanHeader.style.paddingLeft = '8px';
            oceanHeader.style.color = 'var(--text-muted)';
            oceanHeader.style.fontStyle = 'italic';
            const oceanDot = document.createElement('span');
            oceanDot.className = 'border-type-dot ocean';
            oceanHeader.appendChild(oceanDot);
            const oceanLabel = document.createElement('span');
            oceanLabel.textContent = 'Non rattach\u00e9s';
            oceanHeader.appendChild(oceanLabel);
            tree.appendChild(oceanHeader);
            orphans.forEach(o => renderNode(tree, o, 1));
        }

        // Geographic features (coastlines, lakes, rivers)
        if (geoFeatures.length > 0) {
            const geoHeader = document.createElement('div');
            geoHeader.className = 'border-tree-item';
            geoHeader.style.paddingLeft = '8px';
            geoHeader.style.color = 'var(--text-muted)';
            geoHeader.style.fontStyle = 'italic';
            const geoDot = document.createElement('span');
            geoDot.className = 'border-type-dot coastline';
            geoHeader.appendChild(geoDot);
            const geoLabel = document.createElement('span');
            geoLabel.textContent = 'G\u00e9ographie';
            geoHeader.appendChild(geoLabel);
            tree.appendChild(geoHeader);
            geoFeatures.forEach(g => renderNode(tree, g, 1));
        }

        if (tree.children.length === 0) {
            tree.innerHTML = '<div style="font-size:11px; color:var(--text-muted); padding:8px;">Aucune fronti\u00e8re</div>';
        }
    }

    function selectBorder(key) {
        if (selectedBorderKey === key) {
            deselectBorder();
            return;
        }
        deselectBorder();
        selectedBorderKey = key;
        const border = bordersData[key];
        if (!border) return;

        // Update edit section
        document.getElementById('borderEditSection').style.display = 'block';
        document.getElementById('borderEditName').textContent = border.name;
        const typeColors = BORDER_TYPE_COLORS[border.entity_type] || BORDER_TYPE_COLORS.paysElements;
        document.getElementById('borderEditDot').style.background = typeColors.dot;
        document.getElementById('borderEditType').textContent = typeColors.label;
        document.getElementById('borderEditPointCount').textContent = border.points ? border.points.length : 0;

        if (border.parent_name) {
            document.getElementById('borderEditParentInfo').style.display = 'block';
            document.getElementById('borderEditParent').textContent = border.parent_name;
        } else {
            document.getElementById('borderEditParentInfo').style.display = 'none';
        }

        if (border.color) {
            document.getElementById('borderEditColor').value = border.color;
        }

        renderAllBorders();
        renderBorderEditHandles(key);
        populateBordersTree();
    }

    function deselectBorder() {
        selectedBorderKey = null;
        borderAddPointMode = false;
        borderDeletePointMode = false;
        clearBorderEditHandles();
        document.getElementById('borderEditSection').style.display = 'none';
        document.getElementById('borderAddPointBtn').classList.remove('active');
        document.getElementById('borderDeletePointBtn').classList.remove('active');
        viewer.canvas.style.cursor = '';
    }

    function clearBorderEditHandles() {
        while (borderEditLayer.firstChild) borderEditLayer.removeChild(borderEditLayer.firstChild);
        borderEditHandles = [];
        borderMidHandles = [];
    }

    function getBorderHandleRadius() {
        const zoom = viewer.viewport.getZoom();
        const containerWidth = viewer.container.clientWidth;
        return Math.max(0.001, Math.min(0.008, 6 / (zoom * containerWidth)));
    }

    function renderBorderEditHandles(key) {
        clearBorderEditHandles();
        const border = bordersData[key];
        if (!border || !border.points) return;

        const r = getBorderHandleRadius();
        const points = border.points;
        const typeColors = BORDER_TYPE_COLORS[border.entity_type] || BORDER_TYPE_COLORS.paysElements;

        // Vertex handles
        points.forEach((pt, idx) => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute('cx', pt.x);
            circle.setAttribute('cy', pt.y);
            circle.setAttribute('r', r);
            circle.setAttribute('fill', '#c9a84c');
            circle.setAttribute('stroke', '#1a1a2e');
            circle.setAttribute('stroke-width', r * 0.3);
            circle.setAttribute('pointer-events', 'all');
            circle.setAttribute('cursor', 'grab');
            circle.style.touchAction = 'none';
            circle.dataset.idx = idx;

            circle.addEventListener('pointerdown', (evt) => onBorderHandleDown(evt, idx, circle));

            // Right-click to delete point
            circle.addEventListener('contextmenu', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                deleteBorderPoint(key, idx);
            });

            if (borderDeletePointMode) {
                circle.setAttribute('cursor', 'pointer');
                circle.setAttribute('fill', '#e07070');
                circle.addEventListener('click', (evt) => {
                    evt.stopPropagation();
                    deleteBorderPoint(key, idx);
                });
            }

            borderEditLayer.appendChild(circle);
            borderEditHandles.push(circle);
        });

        // Midpoint handles (for inserting new points)
        for (let i = 0; i < points.length; i++) {
            const next = (i + 1) % points.length;
            const mx = (points[i].x + points[next].x) / 2;
            const my = (points[i].y + points[next].y) / 2;

            const mid = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            mid.setAttribute('cx', mx);
            mid.setAttribute('cy', my);
            mid.setAttribute('r', r * 0.55);
            mid.setAttribute('fill', 'rgba(201, 168, 76, 0.4)');
            mid.setAttribute('stroke', 'rgba(201, 168, 76, 0.6)');
            mid.setAttribute('stroke-width', r * 0.2);
            mid.setAttribute('pointer-events', 'all');
            mid.setAttribute('cursor', 'pointer');
            mid.style.touchAction = 'none';

            mid.addEventListener('pointerdown', (evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                // Insert new point at this position
                const insertIdx = next === 0 ? points.length : next;
                border.points.splice(insertIdx, 0, { x: mx, y: my });
                renderAllBorders();
                renderBorderEditHandles(key);
                updateBorderEditInfo(key);
                // Start dragging the new point immediately
                const newHandle = borderEditHandles[insertIdx];
                if (newHandle) {
                    onBorderHandleDown(evt, insertIdx, newHandle);
                }
            });

            borderEditLayer.appendChild(mid);
            borderMidHandles.push(mid);
        }
    }

    function onBorderHandleDown(evt, idx, handle) {
        if (borderDeletePointMode) return;
        evt.preventDefault();
        evt.stopPropagation();
        borderDragIdx = idx;
        borderDragHandle = handle;
        handle.setAttribute('cursor', 'grabbing');
        handle.setAttribute('fill', '#e74c3c');
        handle.setPointerCapture(evt.pointerId);
        viewer.setMouseNavEnabled(false);

        function onMove(e) {
            if (borderDragIdx < 0) return;
            e.preventDefault();
            e.stopPropagation();
            const viewerRect = viewer.container.getBoundingClientRect();
            const pixelPt = new OpenSeadragon.Point(e.clientX - viewerRect.left, e.clientY - viewerRect.top);
            const newPt = viewer.viewport.pointFromPixel(pixelPt);

            // Snap check
            if (borderSnapEnabled) {
                const snap = findSnapTarget(newPt, selectedBorderKey);
                if (snap) {
                    newPt.x = snap.x;
                    newPt.y = snap.y;
                    handle.setAttribute('fill', '#3498db');
                } else {
                    handle.setAttribute('fill', '#e74c3c');
                }
            }

            bordersData[selectedBorderKey].points[borderDragIdx] = { x: newPt.x, y: newPt.y };
            handle.setAttribute('cx', newPt.x);
            handle.setAttribute('cy', newPt.y);

            // Update polygon live
            updateSelectedBorderPolygon();
        }

        function onUp(e) {
            if (borderDragIdx < 0) return;
            handle.releasePointerCapture(e.pointerId);
            viewer.setMouseNavEnabled(true);
            borderDragIdx = -1;
            borderDragHandle = null;
            renderAllBorders();
            renderBorderEditHandles(selectedBorderKey);
        }

        handle.addEventListener('pointermove', onMove);
        handle.addEventListener('pointerup', onUp);
        handle.addEventListener('pointercancel', onUp);
    }

    function updateSelectedBorderPolygon() {
        if (!selectedBorderKey || !bordersData[selectedBorderKey]) return;
        const border = bordersData[selectedBorderKey];
        const pointsStr = border.points.map(p => p.x + ',' + p.y).join(' ');
        border.svgElements.forEach(poly => {
            poly.setAttribute('points', pointsStr);
        });
    }

    function findSnapTarget(point, excludeKey) {
        const zoom = viewer.viewport.getZoom();
        const containerWidth = viewer.container.clientWidth;
        const threshold = SNAP_THRESHOLD_PX / (zoom * containerWidth);

        let closest = null;
        let closestDist = threshold;

        Object.keys(bordersData).forEach(key => {
            if (key === excludeKey) return;
            const border = bordersData[key];
            if (!border.points) return;
            const eraId = border.era_id || 'actuelle';
            if (eraId !== 'actuelle' && eraId !== currentEraId) return;

            border.points.forEach((pt, idx) => {
                const dx = pt.x - point.x;
                const dy = pt.y - point.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = { x: pt.x, y: pt.y, borderKey: key, pointIdx: idx };
                }
            });
        });

        return closest;
    }

    function updateHandleRadii() {
        const r = getBorderHandleRadius();
        borderEditHandles.forEach(h => {
            h.setAttribute('r', r);
            h.setAttribute('stroke-width', r * 0.3);
        });
        borderMidHandles.forEach(h => {
            h.setAttribute('r', r * 0.55);
            h.setAttribute('stroke-width', r * 0.2);
        });
    }

    function deleteBorderPoint(key, idx) {
        const border = bordersData[key];
        if (!border || !border.points || border.points.length <= 3) {
            alert('Une fronti\u00e8re doit avoir au moins 3 points.');
            return;
        }
        border.points.splice(idx, 1);
        renderAllBorders();
        renderBorderEditHandles(key);
        updateBorderEditInfo(key);
    }

    function updateBorderEditInfo(key) {
        const border = bordersData[key];
        if (!border) return;
        document.getElementById('borderEditPointCount').textContent = border.points ? border.points.length : 0;
    }

    function saveBorder(key) {
        const border = bordersData[key];
        if (!border) return;

        const colorInput = document.getElementById('borderEditColor').value;
        border.color = colorInput;

        fetch('/api/borders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: window._editorPassword,
                action: 'upsert',
                data: {
                    name: border.name,
                    entity_type: border.entity_type,
                    era_id: border.era_id || 'actuelle',
                    points: JSON.stringify(border.points),
                    color: border.color,
                    parent_name: border.parent_name
                }
            })
        }).then(r => r.json()).then(result => {
            if (result.ok) {
                console.log('Fronti\u00e8re sauvegard\u00e9e:', border.name);
                renderAllBorders();
                if (selectedBorderKey === key) renderBorderEditHandles(key);
            } else {
                alert('Erreur: ' + (result.error || 'inconnu'));
            }
        }).catch(err => alert('Erreur r\u00e9seau: ' + err.message));
    }

    function deleteBorder(key) {
        const border = bordersData[key];
        if (!border) return;
        if (!confirm('Supprimer la fronti\u00e8re "' + border.name + '" ?')) return;

        fetch('/api/borders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: window._editorPassword,
                action: 'delete',
                data: {
                    name: border.name,
                    entity_type: border.entity_type,
                    era_id: border.era_id || 'actuelle'
                }
            })
        }).then(r => r.json()).then(result => {
            if (result.ok) {
                delete bordersData[key];
                deselectBorder();
                renderAllBorders();
                populateBordersTree();
            } else {
                alert('Erreur: ' + (result.error || 'inconnu'));
            }
        }).catch(err => alert('Erreur r\u00e9seau: ' + err.message));
    }

    function populateParentDropdown() {
        const type = document.getElementById('borderNewType').value;
        const parentGroup = document.getElementById('borderParentGroup');
        const parentSelect = document.getElementById('borderNewParent');

        if (type === 'continentsElements') {
            parentGroup.style.display = 'none';
            return;
        }

        parentGroup.style.display = 'block';
        parentSelect.innerHTML = '<option value="">-- Choisir --</option>';

        const era = currentEraId || 'actuelle';

        if (type === 'paysElements') {
            // List all continents
            Object.values(bordersData).forEach(b => {
                const bEra = b.era_id || 'actuelle';
                if (bEra !== 'actuelle' && bEra !== era) return;
                if (b.entity_type === 'continentsElements') {
                    const opt = document.createElement('option');
                    opt.value = b.name;
                    opt.textContent = b.name;
                    parentSelect.appendChild(opt);
                }
            });
        } else if (type === 'regionElements') {
            // List all pays
            Object.values(bordersData).forEach(b => {
                const bEra = b.era_id || 'actuelle';
                if (bEra !== 'actuelle' && bEra !== era) return;
                if (b.entity_type === 'paysElements') {
                    const opt = document.createElement('option');
                    opt.value = b.name;
                    opt.textContent = b.name + (b.parent_name ? ' (' + b.parent_name + ')' : '');
                    parentSelect.appendChild(opt);
                }
            });
        }
    }

    function startBorderDrawFromPanel() {
        const type = document.getElementById('borderNewType').value;
        const parent = document.getElementById('borderNewParent').value;
        const name = document.getElementById('borderNewName').value.trim();

        if (!name) {
            alert('Veuillez entrer un nom pour la fronti\u00e8re.');
            return;
        }

        // Check if name already exists
        const era = currentEraId || 'actuelle';
        const existingKey = name + '|' + era;
        if (bordersData[existingKey]) {
            alert('Une fronti\u00e8re avec ce nom existe d\u00e9j\u00e0.');
            return;
        }

        // Validate parent requirement
        if (type === 'paysElements' && !parent) {
            alert('Un pays doit avoir un continent parent.');
            return;
        }
        if (type === 'regionElements' && !parent) {
            alert('Une r\u00e9gion doit avoir un pays parent.');
            return;
        }

        // Enter draw mode
        borderDrawMode = true;
        borderDrawPoints = [];
        document.getElementById('borderStartDraw').classList.add('active');
        document.getElementById('borderDrawHint').style.display = 'block';
        viewer.canvas.style.cursor = 'crosshair';

        // Store metadata for when drawing finishes
        window._borderDrawMeta = { name, type, parent: parent || null, era };
    }

    function finishBorderDrawPanel() {
        const meta = window._borderDrawMeta;
        if (!meta || borderDrawPoints.length < 3) return;

        const savedPoints = [...borderDrawPoints];

        // Clean up preview
        borderDrawPreview.forEach(el => el.remove());
        borderDrawPreview = [];
        borderDrawPoints = [];
        borderDrawMode = false;
        document.getElementById('borderStartDraw').classList.remove('active');
        document.getElementById('borderDrawHint').style.display = 'none';
        viewer.canvas.style.cursor = '';

        const key = meta.name + '|' + meta.era;

        // Save to API
        fetch('/api/borders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: window._editorPassword,
                action: 'upsert',
                data: {
                    name: meta.name,
                    entity_type: meta.type,
                    era_id: meta.era,
                    points: JSON.stringify(savedPoints),
                    parent_name: meta.parent
                }
            })
        }).then(r => r.json()).then(result => {
            if (result.ok) {
                bordersData[key] = {
                    name: meta.name,
                    entity_type: meta.type,
                    era_id: meta.era,
                    points: savedPoints,
                    color: null,
                    parent_name: meta.parent,
                    svgElements: []
                };
                renderAllBorders();
                populateBordersTree();
                selectBorder(key);
                // Clear form
                document.getElementById('borderNewName').value = '';
                console.log('Fronti\u00e8re cr\u00e9\u00e9e:', meta.name);
            } else {
                alert('Erreur: ' + (result.error || 'inconnu'));
            }
        }).catch(err => alert('Erreur r\u00e9seau: ' + err.message));

        window._borderDrawMeta = null;
    }

    // ===== TIMELINE V4 : Monotonic year-based slider =====
    let currentDisplayYear = 10200;
    let isTimelinePlaying = false;
    let timelineAnimFrame = null;
    let lastPlayTimestamp = null;
    const SLIDER_MAX = 10000;
    let effectiveRanges = []; // [{start, end}] per era, monotonic no-gap

    // Compute non-overlapping monotonic year ranges for each era
    function computeEffectiveRanges() {
        const eras = timelineData.eras;
        effectiveRanges = [];
        let cursor = eras[0].startYear;

        for (let i = 0; i < eras.length; i++) {
            const start = cursor;
            let end;
            if (i < eras.length - 1) {
                end = eras[i].endYear;
                const nextStart = eras[i + 1].startYear;
                if (nextStart < end && nextStart <= cursor) {
                    end = cursor; // overlapping child era, give parent minimal range
                } else if (nextStart < end) {
                    end = nextStart; // split at next era boundary
                }
            } else {
                end = eras[i].endYear;
            }
            if (end <= start) end = start + 1;
            effectiveRanges.push({ start, end });
            cursor = end;
        }
    }

    // Slider position (0..SLIDER_MAX) → year (monotonic)
    function sliderToYear(sliderVal) {
        if (!effectiveRanges || effectiveRanges.length === 0) return 0;
        const n = effectiveRanges.length;
        const unitsPerEra = SLIDER_MAX / n;
        const eraIdx = Math.min(Math.floor(sliderVal / unitsPerEra), n - 1);
        const fraction = (sliderVal - eraIdx * unitsPerEra) / unitsPerEra;
        const r = effectiveRanges[eraIdx];
        if (!r || r.start === undefined || r.end === undefined) return 0;
        const year = r.start + fraction * (r.end - r.start);
        if (isNaN(year) || !isFinite(year)) return 0;
        return Math.round(year);
    }

    // Year → slider position
    function yearToSlider(year) {
        if (effectiveRanges.length === 0) return 0;
        const n = effectiveRanges.length;
        const unitsPerEra = SLIDER_MAX / n;

        let eraIdx = n - 1;
        for (let i = 0; i < n; i++) {
            if (year <= effectiveRanges[i].end || i === n - 1) {
                eraIdx = i;
                break;
            }
        }

        const r = effectiveRanges[eraIdx];
        const span = r.end - r.start || 1;
        const fraction = Math.max(0, Math.min(1, (year - r.start) / span));
        return eraIdx * unitsPerEra + fraction * unitsPerEra;
    }

    // Year → era index (for display purposes)
    function yearToEraIdx(year) {
        for (let i = 0; i < effectiveRanges.length; i++) {
            if (year <= effectiveRanges[i].end || i === effectiveRanges.length - 1) return i;
        }
        return 0;
    }

    function initTimeline() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        // Slider continu
        timeline.min = 0;
        timeline.max = SLIDER_MAX;
        timeline.value = SLIDER_MAX;
        timeline.step = 1;

        // Slider : glissement fluide → year-based
        timeline.addEventListener('input', function() {
            const val = parseFloat(this.value);
            currentDisplayYear = sliderToYear(val);
            syncMapToYear();
            updateSliderTrack(this);
        });

        // Boutons ±
        document.querySelectorAll('.tl-year-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const delta = parseInt(this.getAttribute('data-delta'));
                stepYears(delta);
            });
        });

        // Play
        const playBtn = document.getElementById('timelinePlayBtn');
        if (playBtn) playBtn.addEventListener('click', toggleTimelinePlay);

        // Toggle collapse
        const toggleBtn = document.getElementById('timelineToggleBtn');
        const header = document.getElementById('timelineHeader');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                document.getElementById('timelineContainer').classList.toggle('collapsed');
            });
        }
        if (header) {
            header.addEventListener('click', function() {
                document.getElementById('timelineContainer').classList.toggle('collapsed');
            });
        }

        // Keyboard
        document.addEventListener('keydown', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); stepYears(-100); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); stepYears(100); }
            else if (e.key === ' ') { e.preventDefault(); toggleTimelinePlay(); }
        });

        // Initial display update will happen in initTimelineUI → syncMapToYear
    }

    // Synchronise la carte avec l'année courante (year-based, pas era-based)
    function syncMapToYear() {
        if (!timelineData || !timelineData.eras) return;
        const eraIdx = yearToEraIdx(currentDisplayYear);
        updateTimelineDisplay(eraIdx);
        updateTimelineMarkerActive(eraIdx);
        updateYearDisplay();
        // Mise à jour des noms par année (pas par ère)
        updateContinentNamesForYear(currentDisplayYear);
        updateCountryVisibilityForYear(currentDisplayYear);
        updateTextVisibility();
    }

    function stepYears(delta) {
        if (!timelineData || effectiveRanges.length === 0) return;

        const globalMin = effectiveRanges[0].start;
        const globalMax = effectiveRanges[effectiveRanges.length - 1].end;
        currentDisplayYear = Math.max(globalMin, Math.min(globalMax, currentDisplayYear + delta));

        const timeline = document.getElementById('timeline');
        if (timeline) {
            timeline.value = yearToSlider(currentDisplayYear);
            updateSliderTrack(timeline);
        }
        syncMapToYear();
        if (window.updateBorders) window.updateBorders();
    }

    // ===== PLAY ANIMATION =====
    function toggleTimelinePlay() {
        isTimelinePlaying = !isTimelinePlaying;
        const playBtn = document.getElementById('timelinePlayBtn');
        if (!playBtn) return;

        if (isTimelinePlaying) {
            playBtn.innerHTML = '&#x23F8;';
            playBtn.classList.add('playing');
            const globalMax = effectiveRanges.length > 0 ? effectiveRanges[effectiveRanges.length - 1].end : 10200;
            if (currentDisplayYear >= globalMax - 1) {
                currentDisplayYear = effectiveRanges.length > 0 ? effectiveRanges[0].start : -999999;
            }
            lastPlayTimestamp = null;
            timelineAnimFrame = requestAnimationFrame(playTick);
        } else {
            playBtn.innerHTML = '&#x25B6;';
            playBtn.classList.remove('playing');
            if (timelineAnimFrame) {
                cancelAnimationFrame(timelineAnimFrame);
                timelineAnimFrame = null;
            }
        }
    }

    function playTick(timestamp) {
        if (!isTimelinePlaying) return;
        if (!lastPlayTimestamp) lastPlayTimestamp = timestamp;

        const elapsed = timestamp - lastPlayTimestamp;
        lastPlayTimestamp = timestamp;

        const speedSelect = document.getElementById('timelineSpeed');
        const msPerYear = speedSelect ? parseFloat(speedSelect.value) : 10;
        const yearsToAdd = Math.max(1, Math.round(elapsed / msPerYear));

        currentDisplayYear += yearsToAdd;

        const globalMax = effectiveRanges.length > 0 ? effectiveRanges[effectiveRanges.length - 1].end : 10200;
        if (currentDisplayYear >= globalMax) {
            currentDisplayYear = globalMax;
            isTimelinePlaying = false;
            const playBtn = document.getElementById('timelinePlayBtn');
            if (playBtn) {
                playBtn.innerHTML = '&#x25B6;';
                playBtn.classList.remove('playing');
            }
        }

        const timeline = document.getElementById('timeline');
        if (timeline) {
            timeline.value = yearToSlider(currentDisplayYear);
            updateSliderTrack(timeline);
        }
        syncMapToYear();

        if (isTimelinePlaying) {
            timelineAnimFrame = requestAnimationFrame(playTick);
        }
    }

    function updateYearDisplay() {
        const yearEl = document.getElementById('timelineCurrentYear');
        const suffixEl = document.getElementById('timelineYearSuffix');
        if (!yearEl) return;

        if (currentDisplayYear === undefined || currentDisplayYear === null || isNaN(currentDisplayYear)) {
            yearEl.textContent = '—';
            if (suffixEl) suffixEl.textContent = '';
            return;
        }
        const year = Math.round(currentDisplayYear);
        const abs = Math.abs(year);
        yearEl.textContent = abs.toLocaleString('fr-FR');
        if (suffixEl) suffixEl.textContent = year < 0 ? 'av.A' : 'ap.A';
    }

    function loadTimelineData() {
        fetch('/api/timeline')
            .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(data => {
                timelineData = data.timelineData;
                if (!timelineData || !timelineData.eras || timelineData.eras.length === 0) {
                    console.warn('Timeline DB empty, trying local fallback');
                    return loadTimelineFromFile();
                }
                console.log('Timeline data loaded from Turso:', timelineData.eras.length, 'eras');
                normalizeTimelineData();
                initTimelineUI();
            })
            .catch(err => {
                console.warn('Timeline API failed, trying local fallback:', err);
                loadTimelineFromFile();
            });
    }

    function loadTimelineFromFile() {
        fetch('/data/timeline-names.json')
            .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(data => {
                timelineData = data.timelineData;
                normalizeTimelineData();
                console.log('Timeline data loaded from file:', timelineData.eras.length, 'eras,', (timelineData.continents||[]).length, 'continents,', (timelineData.countries||[]).length, 'countries');
                initTimelineUI();
            })
            .catch(err => {
                console.warn('No timeline data available, using legacy mode:', err);
                updateTimelineLegacy();
            });
    }

    function normalizeTimelineData() {
        if (!timelineData || !timelineData.eras) return;

        // 1. Normaliser les champs des ères
        timelineData.eras.forEach(era => {
            // Ensure startYear/endYear are numbers (DB may return strings)
            if (era.startYear !== undefined) era.startYear = Number(era.startYear);
            if (era.endYear !== undefined) era.endYear = Number(era.endYear);
            if (!era.label && era.name) era.label = era.name;
            if (!era.date) era.date = formatEraDate(era.startYear, era.endYear);
        });

        // 2. Compute monotonic effective ranges for the slider
        computeEffectiveRanges();

        // 3. Construire la structure plate des continents
        // Priorité : utiliser continentTimelines (year-based) si disponible
        if (timelineData.continentTimelines && timelineData.continentTimelines.length > 0) {
            timelineData.continents = timelineData.continentTimelines.map(ct => ({
                currentName: ct.currentName,
                yearRanges: (ct.timeline || [])
                    .filter(e => e.startYear !== undefined && e.endYear !== undefined)
                    .map(e => ({
                        startYear: Number(e.startYear),
                        endYear: Number(e.endYear),
                        name: e.name || ct.currentName
                    }))
                    .sort((a, b) => a.startYear - b.startYear)
            }));
            console.log('Built continent map from continentTimelines:', timelineData.continents.map(c => c.currentName));
        }
        // Fallback : construire depuis les données imbriquées par ère
        else if (!timelineData.continents || timelineData.continents.length === 0) {
            const allNord = ['Alkaran', 'Celethor', 'Galenor', 'Ilthara', 'Cestra'];
            const allSud = ['Onara', 'Endora', 'Azoria', 'Cendara', 'Evertia'];
            const continentMap = {};
            timelineData.eras.forEach((era) => {
                if (!era.continents) return;
                era.continents.forEach(c => {
                    const names = c.currentName.split('+').map(n => n.trim());
                    names.forEach(name => {
                        if (name === 'ALL' || name === 'ALL_NORD' || name === 'ALL_SUD') return;
                        if (!continentMap[name]) continentMap[name] = { currentName: name, eraNames: {} };
                        continentMap[name].eraNames[era.id] = c.historicalName;
                    });
                });
                era.continents.forEach(c => {
                    let targetNames = [];
                    if (c.currentName === 'ALL') targetNames = Object.keys(continentMap);
                    else if (c.currentName === 'ALL_NORD') targetNames = allNord;
                    else if (c.currentName === 'ALL_SUD') targetNames = allSud;
                    targetNames.forEach(name => {
                        if (!continentMap[name]) continentMap[name] = { currentName: name, eraNames: {} };
                        if (!continentMap[name].eraNames[era.id]) continentMap[name].eraNames[era.id] = c.historicalName;
                    });
                });
            });
            // Build year ranges from effective ranges (contiguous, no gaps)
            timelineData.continents = Object.values(continentMap).map(c => {
                const yearRanges = [];
                let lastKnownName = c.currentName;
                timelineData.eras.forEach((era, eraIdx) => {
                    const eff = effectiveRanges[eraIdx];
                    if (!eff) return;
                    const name = c.eraNames[era.id] || lastKnownName;
                    lastKnownName = name;
                    const prev = yearRanges[yearRanges.length - 1];
                    if (prev && prev.name === name) {
                        prev.endYear = eff.end;
                    } else {
                        yearRanges.push({ startYear: eff.start, endYear: eff.end, name });
                    }
                });
                return { currentName: c.currentName, yearRanges };
            });
            console.log('Built continent map (fallback):', timelineData.continents.map(c => c.currentName));
        }

        // 4. Construire la structure plate des pays avec rawTimeline pour lookup par année
        if (timelineData.countries && timelineData.countries.length > 0 && !timelineData.countries[0].rawTimeline) {
            const rawCountries = timelineData.countries;
            timelineData.countries = rawCountries
                .filter(country => country.currentName)
                .map(country => ({
                    name: country.currentName,
                    continent: country.continent,
                    rawTimeline: (country.timeline || [])
                        .filter(e => e.startYear !== undefined && e.endYear !== undefined)
                        .map(e => ({
                            startYear: Number(e.startYear),
                            endYear: Number(e.endYear),
                            name: e.name || country.currentName
                        }))
                }));
            console.log('Built country map:', timelineData.countries.length, 'countries');
        }
    }

    function formatEraDate(startYear, endYear) {
        function fmtYear(y) {
            if (y === undefined || y === null) return '?';
            const abs = Math.abs(y);
            const formatted = abs.toLocaleString('fr-FR');
            return '~' + formatted + (y < 0 ? ' av.A' : ' ap.A');
        }
        if (startYear !== undefined && endYear !== undefined) {
            return fmtYear(startYear) + ' → ' + fmtYear(endYear);
        }
        return fmtYear(startYear || endYear);
    }

    function initTimelineUI() {
        const maxIdx = timelineData.eras.length - 1;
        const timeline = document.getElementById('timeline');
        if (timeline) {
            timeline.max = SLIDER_MAX;
            timeline.value = SLIDER_MAX;
            timeline.step = 1;
        }
        currentDisplayYear = timelineData.eras[maxIdx].endYear || 10200;
        updateTimelineDisplay(maxIdx);
        buildTimelineMarkers();
        buildTimelineLabels();
        if (timeline) updateSliderTrack(timeline);
        syncMapToYear();
    }

    function updateSliderTrack(slider) {
        if (!slider) return;
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 10;
        const val = parseFloat(slider.value) || 0;
        const pct = ((val - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, var(--accent) ${pct}%, var(--input-bg) ${pct}%)`;
    }

    function updateTimelineLegacy() {
        // Comportement original hardcodé comme fallback
        const timelineYears = ['1000', '1500', '2000'];
        const timeline = document.getElementById('timeline');
        const timelineLabel = document.getElementById('timelineLabel');
        if (!timeline || !timelineLabel) return;
        timeline.max = 2;
        timeline.value = 0;

        function updateTimeline() {
            const val = parseInt(timeline.value, 10);
            if (timelineLabel) timelineLabel.textContent = timelineYears[val];
            if (window.updateBorders) window.updateBorders();
        }
        updateTimeline();
        timeline.addEventListener('input', updateTimeline);
    }

    function updateTimelineDisplay(idx) {
        const eraNameEl = document.getElementById('timelineEraName');
        const eraDateEl = document.getElementById('timelineEraDate');

        if (timelineData && timelineData.eras && timelineData.eras[idx]) {
            const era = timelineData.eras[idx];
            // Extraire le nom sans les dates entre parenthèses ex: "(~9 500 → ~10 200 ap.A)"
            let cleanName = (era.label || era.name || '').replace(/\s*\([^)]*\d[^)]*\)\s*/g, '').trim();
            if (eraNameEl) eraNameEl.textContent = cleanName;
            if (eraDateEl) eraDateEl.textContent = era.date || '';
        } else {
            if (eraNameEl) eraNameEl.textContent = 'Ère VII — Actuelle';
            if (eraDateEl) eraDateEl.textContent = '~10 200 ap.A';
        }
    }

    function buildTimelineMarkers() {
        const markersContainer = document.getElementById('timelineMarkers');
        if (!markersContainer || !timelineData) return;

        markersContainer.innerHTML = '';
        timelineData.eras.forEach((era, idx) => {
            const marker = document.createElement('div');
            marker.className = 'timeline-marker';
            marker.setAttribute('data-idx', idx);
            marker.setAttribute('title', (era.label || '') + '\n' + (era.date || ''));

            const tick = document.createElement('div');
            tick.className = 'timeline-tick';
            marker.appendChild(tick);

            marker.addEventListener('click', function() {
                if (effectiveRanges[idx]) {
                    currentDisplayYear = effectiveRanges[idx].start;
                }
                const timeline = document.getElementById('timeline');
                if (timeline) {
                    timeline.value = yearToSlider(currentDisplayYear);
                    updateSliderTrack(timeline);
                }
                syncMapToYear();
            });

            markersContainer.appendChild(marker);
        });
        updateTimelineMarkerActive(timelineData.eras.length - 1);
    }

    function buildTimelineLabels() {
        const labelsRow = document.getElementById('timelineLabelsRow');
        if (!labelsRow || !timelineData) return;

        labelsRow.innerHTML = '';
        timelineData.eras.forEach((era, idx) => {
            const label = document.createElement('div');
            label.className = 'tl-label';
            // Extraire un label court (numéro d'ère ou abréviation)
            const shortLabel = extractShortEraLabel(era.label, era.id);
            label.textContent = shortLabel;
            label.setAttribute('data-idx', idx);

            label.addEventListener('click', function() {
                if (effectiveRanges[idx]) {
                    currentDisplayYear = effectiveRanges[idx].start;
                }
                const timeline = document.getElementById('timeline');
                if (timeline) {
                    timeline.value = yearToSlider(currentDisplayYear);
                    updateSliderTrack(timeline);
                }
                syncMapToYear();
            });

            labelsRow.appendChild(label);
        });
        updateTimelineLabelsActive(timelineData.eras.length - 1);
    }

    function extractShortEraLabel(label, eraId) {
        // Utiliser l'id pour des labels courts distincts
        if (eraId) {
            const idLabels = {
                'era1_panghor': 'I·P',
                'era1_fracture1': 'I·F1',
                'era1_fracture2': 'I·F2',
                'era1_fracture3': 'I·F3',
                'era2_berceaux': 'II·B',
                'era2_gel_reconstruction': 'II·G',
                'era3_lien_empires': 'III',
                'era5_grande_nuit': 'V',
                'era6_nations': 'VI',
                'era7_actuelle': 'VII'
            };
            if (idLabels[eraId]) return idLabels[eraId];
        }
        // Fallback sur le label textuel
        if (!label) return '?';
        const fMatch = label.match(/Fracture\s*(\d)/i);
        if (fMatch) return 'I·F' + fMatch[1];
        const match = label.match(/[ÈEe]re\s+([\dIVXLCDM]+)/i);
        if (match) return match[1];
        return label.substring(0, 4);
    }

    function updateTimelineLabelsActive(idx) {
        const labels = document.querySelectorAll('.tl-label');
        labels.forEach((l, i) => {
            l.classList.toggle('active', i === idx);
            l.classList.toggle('past', i < idx);
        });
    }

    function updateTimelineMarkerActive(idx) {
        const markers = document.querySelectorAll('.timeline-marker');
        markers.forEach((m, i) => {
            m.classList.toggle('active', i === idx);
            m.classList.toggle('past', i < idx);
        });
        updateTimelineLabelsActive(idx);
    }

    // ===== SYSTEME TEMPOREL PRINCIPAL (YEAR-BASED) =====

    // Lookup nom de continent pour une année donnée (yearRanges triées et contiguës)
    function getContinentNameForYear(continentDef, year) {
        if (!continentDef.yearRanges || continentDef.yearRanges.length === 0) {
            return continentDef.currentName;
        }
        for (const range of continentDef.yearRanges) {
            if (year >= range.startYear && year <= range.endYear) {
                return range.name;
            }
        }
        // Fallback: last range or current name
        const last = continentDef.yearRanges[continentDef.yearRanges.length - 1];
        return (last && year > last.endYear) ? last.name : continentDef.currentName;
    }

    // Lookup info pays pour une année donnée
    function getCountryInfoForYear(countryDef, year) {
        if (!countryDef.rawTimeline || countryDef.rawTimeline.length === 0) {
            return { exists: false, name: countryDef.name };
        }
        // Find matching timeline entry (last match wins if multiple)
        let bestMatch = null;
        for (const entry of countryDef.rawTimeline) {
            if (year >= entry.startYear && year <= entry.endYear) {
                bestMatch = entry;
            }
        }
        if (!bestMatch) return { exists: false, name: countryDef.name };

        return {
            exists: true,
            name: bestMatch.name,
            isCurrent: bestMatch.name === countryDef.name,
            isPredecessor: bestMatch.name !== countryDef.name
        };
    }

    function updateContinentNamesForYear(year) {
        if (!timelineData || !timelineData.continents) return;
        const continentElements = elementStorage['continentsElements'] || [];

        timelineData.continents.forEach(continentDef => {
            const name = getContinentNameForYear(continentDef, year);

            const element = continentElements.find(el =>
                el.name && el.name.toLowerCase() === continentDef.currentName.toLowerCase()
            );

            if (element && element.texts) {
                element.texts.forEach(el => {
                    if (el.tagName === 'text') {
                        el.textContent = name;
                        el.removeAttribute('font-style');
                        el.style.opacity = '';
                    }
                });
            }
        });
    }

    function updateCountryVisibilityForYear(year) {
        if (!timelineData || !timelineData.countries) return;
        const countryElements = elementStorage['paysElements'] || [];

        timelineData.countries.forEach(countryDef => {
            if (!countryDef || !countryDef.name) return;
            const element = countryElements.find(el =>
                el && el.name && el.name.toLowerCase() === countryDef.name.toLowerCase()
            );
            if (!element) return;

            const info = getCountryInfoForYear(countryDef, year);

            if (info.exists && info.isCurrent) {
                // Le pays existe sous son nom actuel
                element._eraHidden = false;
                element.texts.forEach(el => {
                    if (el.tagName === 'text') {
                        el.textContent = info.name;
                        el.removeAttribute('font-style');
                        el.style.opacity = '';
                    }
                });
            } else if (info.exists && info.isPredecessor) {
                // Prédécesseur : nom historique en italique
                element._eraHidden = false;
                element.texts.forEach(el => {
                    if (el.tagName === 'text') {
                        el.textContent = info.name;
                        el.setAttribute('font-style', 'italic');
                        el.style.opacity = '0.7';
                    }
                });
            } else {
                // Le pays n'existe pas encore : masquer
                element._eraHidden = true;
            }
        });
    }

    // Gestionnaires d'événements
    function initEventHandlers() {
        // Fermeture du panneau d'info
        document.getElementById('closeInfoPanel').addEventListener('click', () => {
            document.getElementById('infoPanel').style.display = 'none';
            document.body.classList.remove('info-panel-visible');
            clearHighlight();
        });

        // Lore links — event delegation
        document.querySelector('.info-panel-content').addEventListener('click', (e) => {
            const link = e.target.closest('.lore-link, .lore-parent-link');
            if (link) {
                e.preventDefault();
                const placeName = link.getAttribute('data-name');
                if (placeName) navigateToPlace(placeName);
            }
        });

        // Recherche
        initSearchHandlers();

        // Boutons de contrôle (onclick= pour éviter les doublons si initMap() est appelé plusieurs fois)
        document.getElementById('toggleText').onclick = toggleTextVisibility;
        document.getElementById('toggleBorders').onclick = toggleBorders;
        document.getElementById('toggleBorders').classList.add('active');
        const colorFilterBtn = document.getElementById('toggleColorFilter');
        if (colorFilterBtn) colorFilterBtn.onclick = toggleColorFilter;
        document.getElementById('toggleWrapping').onclick = toggleWrapping;
        document.getElementById('clickZoomRange').oninput = (e) => {
            const pct = parseInt(e.target.value);
            clickZoomMultiplier = 1.5 * (pct / 100);
            document.getElementById('clickZoomValue').textContent = pct + '%';
            // Refresh zoom bar to match new multiplier
            refreshZoomBarLayout();
            updateZoomLevelBar();
        };
        document.getElementById('measureDistance').onclick = () => startMeasure('distance');
        document.getElementById('measureArea').onclick = () => startMeasure('area');
        document.getElementById('toggleEditor').onclick = toggleEditor;
        document.getElementById('toggleMarkers').onclick = toggleMarkers;
        document.getElementById('toggleGrid').onclick = toggleGrid;

        // Navigation personnalisée
        document.getElementById('navZoomIn').onclick = () => {
            viewer.viewport.zoomBy(1.5);
            viewer.viewport.applyConstraints();
        };
        document.getElementById('navZoomOut').onclick = () => {
            viewer.viewport.zoomBy(0.667);
            viewer.viewport.applyConstraints();
        };
        document.getElementById('navHome').onclick = () => {
            viewer.viewport.goHome();
        };
        document.getElementById('navTimeline').onclick = () => {
            const tc = document.getElementById('timelineContainer');
            tc.classList.toggle('visible');
            document.getElementById('navTimeline').classList.toggle('active', tc.classList.contains('visible'));
        };

        document.getElementById('navFullscreen').onclick = () => {
            const el = document.getElementById('openseadragon1');
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                el.requestFullscreen().catch(err => {
                    console.warn('Fullscreen non supporté:', err);
                });
            }
        };

        // Track fullscreen state on body for CSS
        document.addEventListener('fullscreenchange', () => {
            document.body.classList.toggle('map-fullscreen', !!document.fullscreenElement);
        });

        // Mesure : boutons barre
        document.getElementById('measureCancel').onclick = cancelMeasure;
        document.getElementById('measureClear').onclick = clearAllMeasures;
        document.getElementById('measureUndo').onclick = undoMeasurePoint;

        // Escape pour annuler la mesure
        document.onkeydown = function(e) {
            if (e.key === 'Escape' && measureMode) {
                cancelMeasure();
            }
        };

        // Contrôles de grille
        initGridControls();

        // Zoom level bar
        initZoomLevelBar();

        // Editor panel events
        document.getElementById('closeEditorPanel').onclick = () => disableEditorMode();
        document.getElementById('editorModeMove').onclick = () => setEditorMode('move');
        document.getElementById('editorModeBorders').onclick = () => setEditorMode('borders');
        document.getElementById('editorModeAddPoint').onclick = () => setEditorMode('addPoint');

        // Borders panel events
        document.getElementById('closeBordersPanel').onclick = () => setEditorMode('none');
        document.getElementById('borderNewType').onchange = populateParentDropdown;
        document.getElementById('borderStartDraw').onclick = startBorderDrawFromPanel;
        document.getElementById('borderAddPointBtn').onclick = () => {
            borderAddPointMode = !borderAddPointMode;
            borderDeletePointMode = false;
            document.getElementById('borderAddPointBtn').classList.toggle('active', borderAddPointMode);
            document.getElementById('borderDeletePointBtn').classList.remove('active');
            if (selectedBorderKey) renderBorderEditHandles(selectedBorderKey);
        };
        document.getElementById('borderDeletePointBtn').onclick = () => {
            borderDeletePointMode = !borderDeletePointMode;
            borderAddPointMode = false;
            document.getElementById('borderDeletePointBtn').classList.toggle('active', borderDeletePointMode);
            document.getElementById('borderAddPointBtn').classList.remove('active');
            if (selectedBorderKey) renderBorderEditHandles(selectedBorderKey);
        };
        document.getElementById('borderSaveBtn').onclick = () => {
            if (selectedBorderKey) saveBorder(selectedBorderKey);
        };
        document.getElementById('borderDeleteBtn').onclick = () => {
            if (selectedBorderKey) deleteBorder(selectedBorderKey);
        };

        // Événements de zoom, pan et resize
        viewer.addHandler('zoom', throttledUpdateVisibility);
        viewer.addHandler('zoom', updateMeasureScaling);
        viewer.addHandler('pan', throttledUpdateVisibility);
        viewer.addHandler('resize', updateTextVisibility);
        viewer.addHandler('animation-finish', updateTextVisibility);
        // Update border stroke width on zoom change
        viewer.addHandler('animation-finish', () => {
            if (bordersLayer.style.display !== 'none') renderAllBorders();
        });
        window.addEventListener('orientationchange', () => setTimeout(updateTextVisibility, 300));
        viewer.addHandler('canvas-click', handleCanvasClick);
        viewer.addHandler('canvas-double-click', handleCanvasDoubleClick);

        // Mouse move pour preview en temps réel
        viewer.addHandler('canvas-drag', function() {}); // keep default
        new OpenSeadragon.MouseTracker({
            element: viewer.canvas,
            moveHandler: handleCanvasMove
        });
    }

    function initSearchHandlers() {
        const searchInput = document.getElementById('searchInput');
        const suggestionsContainer = document.getElementById('suggestions');

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            suggestionsContainer.innerHTML = '';

            if (query.length === 0) {
                suggestionsContainer.style.display = 'none';
                return;
            }

            const suggestions = allNames.filter(name => 
                name && name.toLowerCase().includes(query)
            ).slice(0, 10); // Limiter à 10 suggestions

            if (suggestions.length > 0) {
                suggestionsContainer.style.display = 'block';
                suggestions.forEach(suggestion => {
                    const suggestionElement = document.createElement('div');
                    suggestionElement.textContent = suggestion;
                    suggestionElement.addEventListener('click', () => {
                        searchInput.value = suggestion;
                        suggestionsContainer.style.display = 'none';
                        performSearch(suggestion);
                    });
                    suggestionsContainer.appendChild(suggestionElement);
                });
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });

        document.getElementById('searchButton').addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }

    function initGridControls() {
        const gridSizeInput = document.getElementById('gridSizeInput');
        const gridTextSizeSlider = document.getElementById('gridTextSize');
        const gridLineWidthSlider = document.getElementById('gridLineWidth');
        const originSelector = document.getElementById('originSelector');

        gridSizeInput.addEventListener('input', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 5) value = 5;
            if (value > 300) value = 300;
            this.value = value;
            currentGridSize = value;
            if (gridVisible) updateGrid();
        });

        gridTextSizeSlider.addEventListener('input', function() {
            const textSizePercent = parseInt(this.value);
            document.getElementById('gridTextSizeValue').textContent = textSizePercent + '%';
            if (gridVisible) updateGrid();
        });

        gridLineWidthSlider.addEventListener('input', function() {
            const lineWidthPercent = parseInt(this.value);
            document.getElementById('gridLineWidthValue').textContent = lineWidthPercent + '%';
            if (gridVisible) updateGrid();
        });

        originSelector.addEventListener('change', function() {
            if (gridVisible) updateGrid();
        });

        // Initialiser les valeurs affichées
        document.getElementById('gridTextSizeValue').textContent = '20%';
        document.getElementById('gridLineWidthValue').textContent = '10%';
    }

    // Fonctions utilitaires
    function convertCoordinates(x, y) {
        return {
            x: (x + 527.5) / 1047,
            y: (y + 535) / 1047
        };
    }

    function calculateGridCoordinates(gridX, gridY) {
        const origin = document.getElementById('originSelector').value;
        const maxX = currentGridSize - 1;
        const maxY = currentGridSize - 1;
        
        switch(origin) {
            case 'top-left': return { x: gridX, y: gridY };
            case 'top-right': return { x: maxX - gridX, y: gridY };
            case 'bottom-left': return { x: gridX, y: maxY - gridY };
            case 'bottom-right': return { x: maxX - gridX, y: maxY - gridY };
            default: return { x: gridX, y: gridY };
        }
    }

    // Chargement des données depuis la base de données
    function loadFromDatabase() {
        // Initialiser les storages
        CONFIG.layers.forEach(config => {
            elementStorage[config.storage] = [];
        });

        // Créer un index storage → config pour accès rapide
        const configByStorage = {};
        CONFIG.layers.forEach(config => {
            configByStorage[config.storage] = config;
        });

        fetch('/api/overrides')
            .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(entries => {
                entries.forEach(entry => {
                    const config = configByStorage[entry.storage];
                    if (!config) return;

                    const convertedCoord = convertCoordinates(entry.coord_x, entry.coord_y);
                    if (isNaN(convertedCoord.x) || isNaN(convertedCoord.y)) return;

                    const item = { '': entry.name };
                    const elements = createTextAndRect(entry.name, convertedCoord, config, item);
                    elementStorage[config.storage].push({
                        name: entry.name,
                        storage: config.storage,
                        coord: convertedCoord,
                        textCoord: { x: convertedCoord.x + (config.xOffset || 0), y: convertedCoord.y + (config.yOffset || 0) },
                        texts: elements.texts,
                        rects: elements.rects,
                        markers: elements.markers,
                        xOffset: config.xOffset || 0,
                        yOffset: config.yOffset || 0,
                        zoomRange: config.zoomRange,
                        fontSize: parseFloat(config.fontSize)
                    });

                    allNames.push(entry.name);
                    elements.texts.forEach(t => allTextElements.push(t));
                    elements.rects.forEach(r => allRectElements.push(r));
                });
                updateTextVisibility();
                console.log(`Base de données chargée: ${entries.length} entrées`);
            })
            .catch(err => console.error('Erreur chargement base de données:', err));
    }

    function createTextAndRect(name, coord, config, item) {
        const fontSize = parseFloat(config.fontSize);
        const allTexts = [];
        const allRects = [];
        const allMarkers = [];

        // Style par type d'entité
        const storageType = config.storage || '';
        let textFill, textStroke, strokeWidth, fontWeight, letterSpacing, displayName;
        if (storageType === 'continentsElements') {
            textFill = '#c9a84c';
            textStroke = 'rgba(20, 12, 5, 0.85)';
            strokeWidth = fontSize * 0.12;
            fontWeight = 'bold';
            letterSpacing = fontSize * 0.15;
            displayName = name.toUpperCase();
        } else if (storageType === 'paysElements') {
            textFill = '#e0c97f';
            textStroke = 'rgba(25, 15, 5, 0.8)';
            strokeWidth = fontSize * 0.1;
            fontWeight = 'bold';
            letterSpacing = fontSize * 0.08;
            displayName = name;
        } else if (storageType === 'regionElements') {
            textFill = '#d4b87a';
            textStroke = 'rgba(30, 18, 8, 0.75)';
            strokeWidth = fontSize * 0.1;
            fontWeight = 'normal';
            letterSpacing = fontSize * 0.05;
            displayName = name;
        } else if (storageType === 'capitalesElements') {
            textFill = '#f0d890';
            textStroke = 'rgba(20, 12, 5, 0.85)';
            strokeWidth = fontSize * 0.12;
            fontWeight = 'bold';
            letterSpacing = 0;
            displayName = name;
        } else {
            textFill = '#e8d5a3';
            textStroke = 'rgba(25, 15, 5, 0.8)';
            strokeWidth = fontSize * 0.1;
            fontWeight = 'normal';
            letterSpacing = 0;
            displayName = name;
        }

        // Déterminer les positions selon l'état du wrapping
        const positions = wrappingEnabled ? [
            {x: 0, y: 0},    // Position originale
            {x: 1, y: 0},    // Droite
            {x: -1, y: 0},   // Gauche
            {x: 0, y: 1},    // Bas
            {x: 0, y: -1},   // Haut
            {x: 1, y: 1},    // Bas-droite
            {x: -1, y: 1},   // Bas-gauche
            {x: 1, y: -1},   // Haut-droite
            {x: -1, y: -1}   // Haut-gauche
        ] : [{x: 0, y: 0}]; // Seulement position originale si pas de wrapping

        positions.forEach(offset => {
            // Création du texte
            const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textElement.setAttribute("x", coord.x + config.xOffset + offset.x);
            textElement.setAttribute("y", coord.y + config.yOffset + offset.y);
            textElement.setAttribute("fill", textFill);
            textElement.setAttribute("stroke", textStroke);
            textElement.setAttribute("stroke-width", strokeWidth);
            textElement.setAttribute("font-size", fontSize);
            textElement.setAttribute("text-anchor", "middle");
            textElement.setAttribute("font-family", "'Copperplate Gothic Std', 'Copperplate', 'Cinzel', serif");
            textElement.setAttribute("font-weight", fontWeight);
            textElement.setAttribute("pointer-events", "none");
            textElement.setAttribute("paint-order", "stroke");
            textElement.setAttribute("stroke-linejoin", "round");
            textElement.setAttribute("dominant-baseline", "central");
            textElement.setAttribute("text-rendering", "geometricPrecision");
            if (letterSpacing > 0) {
                textElement.setAttribute("letter-spacing", letterSpacing);
            }
            textElement.textContent = displayName;

            // Création du rectangle de collision
            const textWidth = name.length * fontSize * 0.6;
            const textHeight = fontSize * 1.1;

            const rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectElement.setAttribute("x", coord.x + config.xOffset + offset.x - textWidth / 2);
            rectElement.setAttribute("y", coord.y + config.yOffset + offset.y - textHeight + (fontSize * 0.3));
            rectElement.setAttribute("width", textWidth);
            rectElement.setAttribute("height", textHeight);
            rectElement.setAttribute("fill", "transparent");
            rectElement.setAttribute("pointer-events", "all");

            // Icône stylisée par tier (capitale/cité/ville/village)
            // Note : l'icône n'est PAS poussée dans allTexts → reste visible
            // indépendamment du zoomRange du tier (contrairement aux labels texte).
            // Seul markersVisible la masque.
            if (config.showMarker) {
                const iconGroup = createTierIcon(
                    config.storage,
                    coord.x + offset.x,
                    coord.y + offset.y,
                    fontSize,
                    config.iconScale,
                    0,
                    0
                );
                if (!markersVisible) iconGroup.style.display = 'none';
                svgOverlay.node().appendChild(iconGroup);
                allMarkers.push(iconGroup);
            }

            // Ajout des éléments au SVG
            svgOverlay.node().appendChild(rectElement);
            svgOverlay.node().appendChild(textElement);

            // Gestionnaire de clic
            const clickFontSize = parseFloat(config.fontSize);
            const textCenterX = coord.x + config.xOffset;
            const textCenterY = coord.y + config.yOffset;
            const tracker = new OpenSeadragon.MouseTracker({
                element: rectElement,
                clickHandler: function(event) {
                    event.preventDefaultAction = true;
                    showInfoPanel(name, item);
                    const pt = new OpenSeadragon.Point(coord.x, coord.y);
                    panToWithPanelOffset(pt, getTargetZoom(clickFontSize));
                }
            });

            allTexts.push(textElement);
            allRects.push(rectElement);
            allTextElements.push(textElement);
            allRectElements.push(rectElement);
        });

        return { texts: allTexts, rects: allRects, markers: allMarkers };
    }

    // === Lore System ===

    function loadLoreIndex() {
        fetch('/lore/lore-index.json')
            .then(r => r.json())
            .then(data => { loreIndex = data; })
            .catch(err => console.warn('Lore index not found:', err));

        fetch('/lore/city-index.json')
            .then(r => r.json())
            .then(data => { cityToCountry = data; })
            .catch(err => console.warn('City index not found:', err));
    }

    function fetchLore(name) {
        if (loreCache[name]) return Promise.resolve(loreCache[name]);
        const path = loreIndex[name];
        if (!path) return Promise.resolve(null);
        return fetch('/lore/' + path)
            .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
            .then(md => { loreCache[name] = md; return md; })
            .catch(() => null);
    }

    function parseLoreMD(md) {
        // Convertir les liens Obsidian AVANT tout parsing
        // [[Fichier\|Nom]], [[Fichier|Nom]], [[Nom]] → Nom affiché
        md = md.replace(/\[\[([^\]]+)\]\]/g, function(m, inner) {
            var clean = inner.replace(/\\\|/g, '|');
            var parts = clean.split('|');
            return parts.length > 1 ? parts[parts.length - 1].trim() : parts[0].split('/').pop().trim();
        });

        // Extract title subtitle (after # Title — Subtitle)
        const titleMatch = md.match(/^#\s+(.+?)(?:\s*—\s*(.+))?$/m);
        const subtitle = titleMatch ? (titleMatch[2] || '') : '';

        // Extract epigraph (blockquote at the top)
        const epigraphMatch = md.match(/^(?:#[^\n]+\n+)((?:>\s*[^\n]*\n?)+)/m);
        let epigraph = '';
        if (epigraphMatch) {
            epigraph = epigraphMatch[1].replace(/^>\s?/gm, '').trim();
        }

        // Extract info table (first table after "Informations générales")
        const infoTableMatch = md.match(/##\s*Informations générales\s*\n+((?:\|[^\n]+\n?)+)/);
        let infoTable = [];
        if (infoTableMatch) {
            const rows = infoTableMatch[1].trim().split('\n');
            rows.forEach(row => {
                if (row.match(/^\|[\s-|]+\|$/)) return; // skip separator
                const cells = row.split('|').map(c => c.trim()).filter(c => c);
                if (cells.length >= 2 && cells[0].startsWith('**')) {
                    const key = cells[0].replace(/\*\*/g, '');
                    const val = cells[1].replace(/\*\*/g, '');
                    if (key) infoTable.push({ key, val });
                }
            });
        }

        // Split into major sections (## headings)
        const sections = [];
        const sectionRegex = /^##\s+(.+)$/gm;
        const sectionStarts = [];
        let match;
        while ((match = sectionRegex.exec(md)) !== null) {
            sectionStarts.push({ title: match[1], index: match.index, end: match.index + match[0].length });
        }

        for (let i = 0; i < sectionStarts.length; i++) {
            const s = sectionStarts[i];
            const nextIndex = (i + 1 < sectionStarts.length) ? sectionStarts[i + 1].index : md.length;
            const body = md.substring(s.end, nextIndex).trim();
            // Skip "Informations générales" since we handle it as table
            if (s.title.match(/Informations\s+générales/i)) continue;
            if (body) sections.push({ title: s.title, body });
        }

        return { subtitle, epigraph, infoTable, sections };
    }

    function renderLoreHTML(parsed) {
        let html = '';

        // Epigraph
        if (parsed.epigraph) {
            html += `<div class="lore-epigraph">${renderMD(parsed.epigraph)}</div>`;
        }

        // Info table
        if (parsed.infoTable.length > 0) {
            html += '<table class="lore-info-table">';
            parsed.infoTable.forEach(row => {
                html += `<tr><td>${escHTML(row.key)}</td><td>${escHTML(row.val)}</td></tr>`;
            });
            html += '</table>';
        }

        // Sections as collapsible details
        parsed.sections.forEach(section => {
            html += `<details><summary>${escHTML(section.title)}</summary>`;
            html += `<div class="section-body">${renderMD(section.body)}</div>`;
            html += `</details>`;
        });

        return html;
    }

    function renderMD(text) {
        // Convertir les liens Obsidian [[Fichier\|Nom]], [[Fichier|Nom]], [[Nom]]
        text = text.replace(/\[\[([^\]]+)\]\]/g, function(m, inner) {
            var clean = inner.replace(/\\\|/g, '|');
            var parts = clean.split('|');
            return parts.length > 1 ? parts[parts.length - 1].trim() : parts[0].split('/').pop().trim();
        });
        if (typeof marked !== 'undefined' && marked.parse) {
            return marked.parse(text, { breaks: true });
        }
        // Fallback: basic rendering
        return text.replace(/\n/g, '<br>');
    }

    function escHTML(s) {
        const d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    // === City-to-Country Index & Cross-linking ===

    let cityToCountry = {};
    let placeNameSet = null;

    function extractCitySection(md, cityName) {
        // Find ### CityName (with optional — suffix) and extract until next ### or ##
        const escaped = cityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp('^###\\s+' + escaped + '\\b[^\\n]*\\n', 'gm');
        const match = regex.exec(md);
        if (!match) return null;

        const startContent = match.index + match[0].length;
        // Find end: next ### or ## or end of string
        const rest = md.substring(startContent);
        const endMatch = rest.match(/^##/m);
        const section = endMatch ? rest.substring(0, endMatch.index).trim() : rest.trim();
        const heading = match[0].trim();

        return { heading, body: section };
    }

    function getPlaceNameSet() {
        if (placeNameSet) return placeNameSet;
        placeNameSet = new Set();
        // Add all map names
        allNames.forEach(n => { if (n && n.length > 2) placeNameSet.add(n); });
        // Add country names from lore index
        Object.keys(loreIndex).forEach(n => placeNameSet.add(n));
        return placeNameSet;
    }

    function linkifyPlaceNames(html, excludeName) {
        const names = getPlaceNameSet();
        // Sort by length descending to match longer names first
        const sorted = [...names].filter(n => n !== excludeName && n.length > 2).sort((a, b) => b.length - a.length);
        if (sorted.length === 0) return html;

        // Parse HTML to avoid replacing inside tags
        const div = document.createElement('div');
        div.innerHTML = html;
        linkifyTextNodes(div, sorted, excludeName);
        return div.innerHTML;
    }

    function linkifyTextNodes(node, names, excludeName) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            // Build a regex matching any known place name
            let found = false;
            for (const name of names) {
                if (text.includes(name)) { found = true; break; }
            }
            if (!found) return;

            // Replace first occurrence of each name
            const frag = document.createDocumentFragment();
            let remaining = text;
            let changed = false;

            while (remaining.length > 0) {
                let earliest = null;
                let earliestIdx = remaining.length;
                for (const name of names) {
                    const idx = remaining.indexOf(name);
                    if (idx !== -1 && idx < earliestIdx) {
                        earliestIdx = idx;
                        earliest = name;
                    }
                }
                if (!earliest) {
                    frag.appendChild(document.createTextNode(remaining));
                    break;
                }
                if (earliestIdx > 0) {
                    frag.appendChild(document.createTextNode(remaining.substring(0, earliestIdx)));
                }
                const link = document.createElement('a');
                link.className = 'lore-link';
                link.setAttribute('data-name', earliest);
                link.textContent = earliest;
                frag.appendChild(link);
                remaining = remaining.substring(earliestIdx + earliest.length);
                changed = true;
            }
            if (changed && node.parentNode) {
                node.parentNode.replaceChild(frag, node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Skip headings and existing links
            const tag = node.tagName.toLowerCase();
            if (tag === 'a' || tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4') return;
            // Iterate children (copy list since we modify DOM)
            const children = [...node.childNodes];
            children.forEach(child => linkifyTextNodes(child, names, excludeName));
        }
    }

    // Zoom cible pour que le texte ait toujours la même taille visuelle
    // Référence: pays (fontSize=0.01) à zoom 3 sur écran 1280px → constante = 0.03
    const VISUAL_SIZE_REF = 0.03;
    const REF_WIDTH = 1280;
    let clickZoomMultiplier = 1.5; // défaut: 1.5x plus zoomé qu'avant
    function getTargetZoom(fontSize) {
        // Zoom OSD ajusté à la largeur courante, avec multiplicateur réglable
        const visualZoom = (VISUAL_SIZE_REF / fontSize) * clickZoomMultiplier;
        const osdZoom = visualZoom * REF_WIDTH / viewer.container.clientWidth;
        return Math.min(osdZoom, viewer.viewport.getMaxZoom());
    }
    // Convertir zoom OSD → zoom visuel (indépendant de la largeur)
    function toVisualZoom(osdZoom) {
        return osdZoom * viewer.container.clientWidth / REF_WIDTH;
    }

    // Pan so that the point is centered on screen
    function panToWithPanelOffset(point, targetZoom) {
        // Sur mobile, décaler pour centrer dans la moitié haute (au-dessus du panel)
        const isMobile = window.innerWidth <= 600;
        if (isMobile) {
            // Appliquer le zoom d'abord, puis calculer l'offset au bon zoom
            const zoom = targetZoom || viewer.viewport.getZoom();
            if (targetZoom) viewer.viewport.zoomTo(targetZoom);
            // Offset en pixels = 25% de la hauteur du container
            const containerH = viewer.container.clientHeight;
            const containerW = viewer.container.clientWidth;
            const shiftPx = containerH * 0.25;
            // En OSD: 1 unité viewport horizontale = zoom * containerW pixels
            // Donc offsetY en viewport = shiftPx / (zoom * containerW)
            const offsetY = shiftPx / (zoom * containerW);
            viewer.viewport.panTo(new OpenSeadragon.Point(point.x, point.y + offsetY));
        } else {
            if (targetZoom) viewer.viewport.zoomTo(targetZoom);
            viewer.viewport.panTo(point);
        }
    }

    function navigateToPlace(name) {
        let foundElement = null;
        let foundItem = null;
        let foundIndex = -1;

        const storageKeys = Object.keys(elementStorage);
        for (let i = 0; i < storageKeys.length; i++) {
            const elements = elementStorage[storageKeys[i]];
            for (const el of elements) {
                if (el.name && el.name.toLowerCase() === name.toLowerCase()) {
                    foundElement = el;
                    foundIndex = i;
                    break;
                }
            }
            if (foundElement) break;
        }

        showInfoPanel(name, { '': name });

        if (foundElement) {
            const point = new OpenSeadragon.Point(foundElement.coord.x, foundElement.coord.y);
            const targetZoom = getTargetZoom(foundElement.fontSize);
            panToWithPanelOffset(point, targetZoom);
        }
    }

    function showInfoPanel(name, item) {
        const nameEl = document.getElementById('cityName');
        const subtitleEl = document.getElementById('loreSubtitle');
        const infoEl = document.getElementById('cityInfo');
        const panel = document.getElementById('infoPanel');

        nameEl.textContent = name;
        subtitleEl.textContent = '';
        infoEl.innerHTML = '<p style="color:var(--text-muted);font-size:12px;">Chargement...</p>';
        panel.style.display = 'block';
        document.body.classList.add('info-panel-visible');
        // Scroll content to top
        document.querySelector('.info-panel-content').scrollTop = 0;

        // 1. Country with its own lore file
        if (loreIndex[name]) {
            fetchLore(name).then(md => {
                if (!md) return;
                const parsed = parseLoreMD(md);
                subtitleEl.textContent = parsed.subtitle;
                infoEl.innerHTML = renderLoreHTML(parsed);
                applyLinkify(infoEl, name);
            });
            _updateLoreBtn(name);
            return;
        }

        // 2. City/village/region → extract from parent country's lore
        const parentCountry = cityToCountry[name];
        if (parentCountry) {
            fetchLore(parentCountry).then(md => {
                if (!md) { showFallbackCSV(infoEl, subtitleEl, item); return; }

                const section = extractCitySection(md, name);
                let html = '';

                // Parent link
                html += `<a class="lore-parent-link" data-name="${escHTML(parentCountry)}">&#x2190; Voir ${escHTML(parentCountry)}</a>`;

                if (section) {
                    // Extract subtitle from heading (### Name — Type)
                    const headingMatch = section.heading.match(/###\s+.+?\s*[—–-]\s*(.+)/);
                    if (headingMatch) subtitleEl.textContent = headingMatch[1].trim();

                    html += renderMD(section.body);
                } else {
                    // City is in the index but no dedicated ### section found
                    html += `<p class="simple-desc">${escHTML(item['Description'] || 'Information disponible dans la fiche pays.')}</p>`;
                }

                infoEl.innerHTML = html;
                applyLinkify(infoEl, name);
            });
            _updateLoreBtn(parentCountry);
            return;
        }

        // 3. Fallback to CSV data
        showFallbackCSV(infoEl, subtitleEl, item);

        // Bouton "Lire le lore" — affiché si la nation a une fiche dans le lore reader
        _updateLoreBtn(name);
    }

    function _updateLoreBtn(name) {
        const btn = document.getElementById('infoPanelLoreBtn');
        if (!btn) return;
        const hasLore = window.LoreReader && window.LoreReader.NATIONS && window.LoreReader.NATIONS[name];
        btn.style.display = hasLore ? 'block' : 'none';
        if (hasLore) btn.onclick = () => window.LoreReader.open(name, 'histoires');
    }

    function showFallbackCSV(infoEl, subtitleEl, item) {
        subtitleEl.textContent = '';
        const fallback = `
            <p class="simple-desc">${escHTML(item['Description'] || 'Non disponible')}</p>
            <details>
                <summary>Gouvernement</summary>
                <div class="section-body"><p>${escHTML(item['Gouvernement'] || 'Non disponible')}</p></div>
            </details>
            <details>
                <summary>Culture</summary>
                <div class="section-body"><p>${escHTML(item['Culture'] || 'Non disponible')}</p></div>
            </details>
            <details>
                <summary>Histoire Marquante</summary>
                <div class="section-body"><p>${escHTML(item['Histoire marquante'] || 'Non disponible')}</p></div>
            </details>
        `;
        infoEl.innerHTML = fallback;
    }

    function applyLinkify(container, excludeName) {
        const names = getPlaceNameSet();
        const sorted = [...names].filter(n => n !== excludeName && n.length > 2).sort((a, b) => b.length - a.length);
        linkifyTextNodes(container, sorted, excludeName);
    }

    // Gestion de la visibilité
    let _visibilityTimer = null;
    function throttledUpdateVisibility() {
        if (_visibilityTimer) return;
        _visibilityTimer = requestAnimationFrame(() => {
            _visibilityTimer = null;
            updateTextVisibility();
        });
    }

    function updateTextVisibility() {
        if (!textVisibilityEnabled) return;

        // Utiliser le zoom visuel normalisé (indépendant de la largeur fenêtre)
        const visualZoom = toVisualZoom(viewer.viewport.getZoom());

        // Viewport bounds avec marge pour le culling
        const bounds = viewer.viewport.getBounds(true);
        const margin = 0.1; // 10% de marge
        const vLeft = bounds.x - margin;
        const vRight = bounds.x + bounds.width + margin;
        const vTop = bounds.y - margin;
        const vBottom = bounds.y + bounds.height + margin;

        Object.values(elementStorage).forEach(elements => {
            elements.forEach(element => {
                const [minZoom, maxZoom] = element.zoomRange;
                // Ajuster les seuils de visibilité selon le multiplicateur de zoom clic
                const adjMin = minZoom * clickZoomMultiplier;
                const adjMax = maxZoom * clickZoomMultiplier;
                const inZoomRange = visualZoom >= adjMin && visualZoom < adjMax;

                // Masquer les entités cachées par le filtre temporel
                if (element._eraHidden) {
                    if (element._visible !== false) {
                        element.texts.forEach(el => el.style.display = 'none');
                        element.rects.forEach(el => el.style.display = 'none');
                        element._visible = false;
                    }
                    return;
                }

                if (!inZoomRange) {
                    if (element._visible !== false) {
                        element.texts.forEach(el => el.style.display = 'none');
                        element.rects.forEach(el => el.style.display = 'none');
                        element._visible = false;
                    }
                    return;
                }

                // Viewport culling : vérifier si l'élément est dans la vue
                const cx = element.coord.x;
                const cy = element.coord.y;
                let inView = false;

                if (wrappingEnabled) {
                    // Vérifier position originale et les 8 copies wrapping
                    for (let ox = -1; ox <= 1 && !inView; ox++) {
                        for (let oy = -1; oy <= 1 && !inView; oy++) {
                            if (cx + ox >= vLeft && cx + ox <= vRight && cy + oy >= vTop && cy + oy <= vBottom) {
                                inView = true;
                            }
                        }
                    }
                } else {
                    inView = cx >= vLeft && cx <= vRight && cy >= vTop && cy <= vBottom;
                }

                const display = inView ? 'block' : 'none';
                if (element._visible !== inView) {
                    element.texts.forEach(el => el.style.display = display);
                    element.rects.forEach(el => el.style.display = display);
                    // Respecter le toggle marqueurs
                    if (!markersVisible && element.markers) {
                        element.markers.forEach(m => m.style.display = 'none');
                    }
                    element._visible = inView;
                }
            });
        });
    }

    function toggleTextVisibility() {
        textVisibilityEnabled = !textVisibilityEnabled;
        document.getElementById('toggleText').classList.toggle('active', !textVisibilityEnabled);
        if (!textVisibilityEnabled) {
            allTextElements.forEach(el => el.style.display = 'none');
            allRectElements.forEach(el => el.style.display = 'none');
            Object.values(elementStorage).forEach(elements => {
                elements.forEach(el => { el._visible = false; });
            });
            return;
        }
        updateTextVisibility();
    }

    function toggleMarkers() {
        markersVisible = !markersVisible;
        const btn = document.getElementById('toggleMarkers');
        btn.classList.toggle('active', !markersVisible);
        Object.values(elementStorage).forEach(elements => {
            elements.forEach(el => {
                if (el.markers) {
                    el.markers.forEach(m => {
                        m.style.display = markersVisible ? '' : 'none';
                    });
                }
            });
        });
    }

    function toggleBorders() {
        bordersLayer.style.display = bordersLayer.style.display === 'none' ? 'block' : 'none';
    }

    function toggleWrapping() {
        wrappingEnabled = !wrappingEnabled;
        
        // Recharger la page pour appliquer les nouveaux paramètres de wrapping
        // (OpenSeadragon ne permet pas de changer wrapHorizontal/wrapVertical à la volée)
        if (confirm('Le changement du mode infini nécessite de recharger la page. Continuer ?')) {
            // Stocker temporairement l'état dans l'URL pour persister le changement
            const url = new URL(window.location);
            url.searchParams.set('wrapping', wrappingEnabled);
            window.location.href = url.toString();
        }
    }

    function updateWrappingButton() {
        const button = document.getElementById('toggleWrapping');
        button.innerHTML = '<span class="icon">&#x1F310;</span> ' + (wrappingEnabled ? 'Mode infini: ON' : 'Mode infini: OFF');
        if (wrappingEnabled) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }

    // Fonction de recherche
    function performSearch(query) {
        const lowerQuery = query.toLowerCase();
        let found = false;

        Object.values(elementStorage).forEach((elements, index) => {
            elements.forEach(element => {
                if (element.name && element.name.toLowerCase() === lowerQuery) {
                    found = true;
                    const point = new OpenSeadragon.Point(element.coord.x, element.coord.y);

                    showInfoPanel(element.name, { '': element.name });

                    const targetZoom = getTargetZoom(element.fontSize);
                    panToWithPanelOffset(point, targetZoom);
                }
            });
        });

        if (!found) {
            alert("Aucun résultat trouvé pour " + query);
        }
    }

    // Gestion de la grille
    // === Zoom Level Bar ===

    // Font sizes matching each bar icon (Global has no fontSize → zoom 0)
    // Icons: 🌍Global(0), 🏔Continents(0.03), 🚩Pays(0.01), 🏰Régions(0.004), ⚔Cités(0.0015), 🏠Villes(0.0011), 🌿Villages(0.0006)
    const ZOOM_BAR_FONT_SIZES = [null, 0.03, 0.01, 0.004, 0.0015, 0.0011, 0.0006];

    // Compute adjusted stops: same formula as getTargetZoom → (VISUAL_SIZE_REF / fontSize) * clickZoomMultiplier
    function getAdjustedStops() {
        return ZOOM_BAR_FONT_SIZES.map(fs => {
            if (fs === null) return 0; // Global = zoom min
            return (VISUAL_SIZE_REF / fs) * clickZoomMultiplier;
        });
    }

    function initZoomLevelBar() {
        const bar = document.getElementById('zoomLevelBar');
        if (!bar) return;

        const stops = bar.querySelectorAll('.zlb-stop');
        const tracks = bar.querySelectorAll('.zlb-track');

        // Update track heights and data-zoom attributes
        refreshZoomBarLayout();

        // Click on a stop → zoom to that level
        stops.forEach((stop, idx) => {
            stop.onclick = () => {
                const adjusted = getAdjustedStops();
                const targetVisual = adjusted[idx];
                const osdZoom = targetVisual * REF_WIDTH / viewer.container.clientWidth;
                const clampedZoom = Math.max(viewer.viewport.getMinZoom(), Math.min(osdZoom, viewer.viewport.getMaxZoom()));
                viewer.viewport.zoomTo(clampedZoom);
                viewer.viewport.applyConstraints();
            };
        });

        // Click on a track → zoom to proportional point between adjacent stops
        tracks.forEach((track, i) => {
            track.onclick = (e) => {
                e.stopPropagation();
                const adjusted = getAdjustedStops();
                const rect = track.getBoundingClientRect();
                const pct = (e.clientY - rect.top) / rect.height;
                const lowZoom = adjusted[i];
                const highZoom = adjusted[i + 1];
                const targetVisual = lowZoom + (highZoom - lowZoom) * pct;
                const osdZoom = targetVisual * REF_WIDTH / viewer.container.clientWidth;
                const clampedZoom = Math.max(viewer.viewport.getMinZoom(), Math.min(osdZoom, viewer.viewport.getMaxZoom()));
                viewer.viewport.zoomTo(clampedZoom);
                viewer.viewport.applyConstraints();
            };
        });

        // Update on zoom change
        viewer.addHandler('zoom', updateZoomLevelBar);
        viewer.addHandler('animation-finish', updateZoomLevelBar);
        updateZoomLevelBar();
    }

    function refreshZoomBarLayout() {
        const bar = document.getElementById('zoomLevelBar');
        if (!bar) return;
        const tracks = bar.querySelectorAll('.zlb-track');
        const adjusted = getAdjustedStops();
        const totalSpan = adjusted[adjusted.length - 1] - adjusted[0];
        const TOTAL_TRACK_PX = 120;
        tracks.forEach((track, i) => {
            const span = adjusted[i + 1] - adjusted[i];
            track.style.height = Math.max(6, Math.round((span / totalSpan) * TOTAL_TRACK_PX)) + 'px';
        });
    }

    function updateZoomLevelBar() {
        const bar = document.getElementById('zoomLevelBar');
        if (!bar) return;

        const visualZoom = toVisualZoom(viewer.viewport.getZoom());
        const stops = bar.querySelectorAll('.zlb-stop');
        const tracks = bar.querySelectorAll('.zlb-track');
        const adjusted = getAdjustedStops();

        // Update stop highlights
        stops.forEach((stop, idx) => {
            stop.classList.toggle('active', visualZoom >= adjusted[idx]);
        });

        // Update track fills
        tracks.forEach((track, i) => {
            const low = adjusted[i];
            const high = adjusted[i + 1];
            const fill = track.querySelector('.zlb-fill');
            if (!fill) return;

            if (visualZoom <= low) {
                fill.style.height = '0%';
            } else if (visualZoom >= high) {
                fill.style.height = '100%';
            } else {
                const pct = ((visualZoom - low) / (high - low)) * 100;
                fill.style.height = pct + '%';
            }
        });
    }

    function toggleGrid() {
        gridVisible = !gridVisible;
        document.getElementById('toggleGrid').classList.toggle('active', gridVisible);
        const gridBlock = document.getElementById('gridControlsBlock');
        if (gridBlock) gridBlock.style.display = gridVisible ? 'block' : 'none';
        if (gridVisible) {
            createGrid();
            gridLayer.style.display = 'block';
        } else {
            gridLayer.style.display = 'none';
        }
    }

    function createGrid() {
        // Vider la grille existante
        while (gridLayer.firstChild) {
            gridLayer.removeChild(gridLayer.firstChild);
        }

        const textSizePercent = parseInt(document.getElementById('gridTextSize').value);
        const lineWidthPercent = parseInt(document.getElementById('gridLineWidth').value);
        const tileSize = 1 / currentGridSize;
        const textSize = (textSizePercent / 100) * tileSize;
        const lineWidth = (lineWidthPercent / 100) * tileSize;

        // Optimisation pour les grandes grilles
        const isLargeGrid = currentGridSize > 125;
        const labelStep = isLargeGrid ? Math.ceil(currentGridSize / 50) : 1;

        // Créer la grille sur toutes les positions wrappées
        const worldPositions = [
            {x: 0, y: 0},    // Position originale
            {x: 1, y: 0},    // Droite
            {x: -1, y: 0},   // Gauche
            {x: 0, y: 1},    // Bas
            {x: 0, y: -1},   // Haut
            {x: 1, y: 1},    // Bas-droite
            {x: -1, y: 1},   // Bas-gauche
            {x: 1, y: -1},   // Haut-droite
            {x: -1, y: -1}   // Haut-gauche
        ];

        worldPositions.forEach(worldOffset => {
            // Créer les lignes de grille
            for (let i = 0; i <= currentGridSize; i++) {
                // Lignes horizontales
                const hLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                hLine.setAttribute('x1', worldOffset.x);
                hLine.setAttribute('y1', worldOffset.y + i / currentGridSize);
                hLine.setAttribute('x2', worldOffset.x + 1);
                hLine.setAttribute('y2', worldOffset.y + i / currentGridSize);
                hLine.setAttribute('stroke', 'rgba(255,255,255,0.5)');
                hLine.setAttribute('stroke-width', lineWidth);
                gridLayer.appendChild(hLine);

                // Lignes verticales
                const vLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                vLine.setAttribute('x1', worldOffset.x + i / currentGridSize);
                vLine.setAttribute('y1', worldOffset.y);
                vLine.setAttribute('x2', worldOffset.x + i / currentGridSize);
                vLine.setAttribute('y2', worldOffset.y + 1);
                vLine.setAttribute('stroke', 'rgba(255,255,255,0.5)');
                vLine.setAttribute('stroke-width', lineWidth);
                gridLayer.appendChild(vLine);
            }

            // Créer les étiquettes de grille (optimisées pour les grandes grilles)
            if (!isLargeGrid || textSize > 0.0001) {
                for (let x = 0; x < currentGridSize; x += labelStep) {
                    for (let y = 0; y < currentGridSize; y += labelStep) {
                        const coords = calculateGridCoordinates(x, y);
                        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
                        
                        label.setAttribute("x", worldOffset.x + (x + 0.5) / currentGridSize);
                        label.setAttribute("y", worldOffset.y + (y + 0.5) / currentGridSize);
                        label.setAttribute("fill", "yellow");
                        label.setAttribute("font-size", textSize);
                        label.setAttribute("text-anchor", "middle");
                        label.setAttribute("dominant-baseline", "middle");
                        label.setAttribute("font-family", "Verdana, sans-serif");
                        label.setAttribute("pointer-events", "none");
                        label.setAttribute("text-rendering", "geometricPrecision");
                        label.textContent = `${coords.x},${coords.y}`;
                        
                        gridLayer.appendChild(label);
                    }
                }
            }
        });

        // Afficher un message d'optimisation si nécessaire
        if (isLargeGrid) {
            console.log(`Grille infinie optimisée (${currentGridSize}x${currentGridSize}): labels affichés avec un pas de ${labelStep}`);
        }
    }

    function updateGrid() {
        if (gridVisible) {
            createGrid();
        }
    }

    // ===== Outils de mesure améliorés =====
    let previewLine = null;
    let previewPoly = null;
    let measureFinished = false;
    const measureMarkers = [];
    const measureTrackers = [];
    let draggingMarkerIndex = -1;

    // Zoom-adaptive sizing for measurement elements
    // === Editor Mode ===

    function toggleEditor() {
        if (!editorMode) {
            if (!editorAuthenticated) {
                const pwd = prompt('Mot de passe éditeur :');
                if (!pwd) return;
                // Verify password via API
                fetch('/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: pwd })
                }).then(r => {
                    if (r.ok) {
                        editorAuthenticated = true;
                        window._editorPassword = pwd;
                        enableEditorMode();
                    } else {
                        alert('Mot de passe incorrect');
                    }
                }).catch(() => alert('Erreur de connexion au serveur'));
                return;
            }
            enableEditorMode();
        } else {
            disableEditorMode();
        }
    }

    function enableEditorMode() {
        editorMode = true;
        document.getElementById('toggleEditor').classList.add('active');
        document.getElementById('editorPanel').style.display = 'block';

        // Border draw canvas handler
        function borderDrawCanvasHandler(event) {
            if (!borderDrawMode || !editorMode || editorActiveMode !== 'borders') return;
            event.preventDefaultAction = true;
            const vp = viewer.viewport.pointFromPixel(event.position);
            borderDrawPoints.push({ x: vp.x, y: vp.y });

            const r = getBorderHandleRadius();

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", vp.x);
            circle.setAttribute("cy", vp.y);
            circle.setAttribute("r", r);
            circle.setAttribute("fill", "#c9a84c");
            circle.setAttribute("stroke", "rgba(0,0,0,0.5)");
            circle.setAttribute("stroke-width", r * 0.2);
            borderEditLayer.appendChild(circle);
            borderDrawPreview.push(circle);

            if (borderDrawPoints.length > 1) {
                const prev = borderDrawPoints[borderDrawPoints.length - 2];
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", prev.x);
                line.setAttribute("y1", prev.y);
                line.setAttribute("x2", vp.x);
                line.setAttribute("y2", vp.y);
                line.setAttribute("stroke", "rgba(201, 168, 76, 0.8)");
                line.setAttribute("stroke-width", 0.001);
                borderEditLayer.appendChild(line);
                borderDrawPreview.push(line);
            }
        }
        viewer.addHandler('canvas-click', borderDrawCanvasHandler);
        editorTrackers.push({ destroy: () => {
            viewer.removeHandler('canvas-click', borderDrawCanvasHandler);
        }});

        // Double-click to close polygon
        function borderDrawDblClick(event) {
            if (!borderDrawMode || borderDrawPoints.length < 3) return;
            event.preventDefaultAction = true;
            finishBorderDrawPanel();
        }
        viewer.addHandler('canvas-double-click', borderDrawDblClick);
        editorTrackers.push({ destroy: () => {
            viewer.removeHandler('canvas-double-click', borderDrawDblClick);
        }});

        // Escape to cancel
        function borderDrawKeyHandler(e) {
            if (e.key === 'Escape' && borderDrawMode) cancelBorderDraw();
        }
        document.addEventListener('keydown', borderDrawKeyHandler);
        editorTrackers.push({ destroy: () => {
            document.removeEventListener('keydown', borderDrawKeyHandler);
        }});

        // Add point canvas handler
        function addPointCanvasHandler(event) {
            if (!addPointMode || !editorMode || editorActiveMode !== 'addPoint') return;
            event.preventDefaultAction = true;
            const viewportPoint = viewer.viewport.pointFromPixel(event.position);
            const name = prompt('Nom du nouveau lieu :');
            if (!name || !name.trim()) return;

            const storage = document.getElementById('addPointType').value;
            const configByStorage = {};
            CONFIG.layers.forEach(c => { configByStorage[c.storage] = c; });
            const config = configByStorage[storage];
            if (!config) return;

            const coord = { x: viewportPoint.x, y: viewportPoint.y };
            const item = { '': name.trim() };
            const elements = createTextAndRect(name.trim(), coord, config, item);
            const el = {
                name: name.trim(),
                storage: storage,
                coord: coord,
                textCoord: { x: coord.x + (config.xOffset || 0), y: coord.y + (config.yOffset || 0) },
                texts: elements.texts,
                rects: elements.rects,
                markers: elements.markers,
                xOffset: config.xOffset || 0,
                yOffset: config.yOffset || 0,
                zoomRange: config.zoomRange,
                fontSize: parseFloat(config.fontSize)
            };
            elementStorage[config.storage].push(el);
            allNames.push(name.trim());

            const csvX = coord.x * 1047 - 527.5;
            const csvY = coord.y * 1047 - 535;
            saveOverride(name.trim(), storage, csvX, csvY);

            updateTextVisibility();
        }
        viewer.addHandler('canvas-click', addPointCanvasHandler);
        editorTrackers.push({ destroy: () => {
            viewer.removeHandler('canvas-click', addPointCanvasHandler);
        }});
    }

    // === Drag system (separate from editor mode for mode isolation) ===

    let dragEl = null;
    let dragMarker = null;

    function onPointerMove(evt) {
        if (!dragEl) return;
        evt.preventDefault();
        evt.stopPropagation();
        const viewerRect = viewer.container.getBoundingClientRect();
        const pixelPt = new OpenSeadragon.Point(
            evt.clientX - viewerRect.left,
            evt.clientY - viewerRect.top
        );
        const newPt = viewer.viewport.pointFromPixel(pixelPt);

        dragEl.coord.x = newPt.x;
        dragEl.coord.y = newPt.y;
        dragEl.textCoord.x = newPt.x + dragEl.xOffset;
        dragEl.textCoord.y = newPt.y + dragEl.yOffset;

        const fontSize = dragEl.fontSize;
        const textWidth = dragEl.name.length * fontSize * 0.6;
        const textHeight = fontSize * 1.1;

        if (dragMarker.tagName === 'circle') {
            dragMarker.setAttribute("cx", newPt.x);
            dragMarker.setAttribute("cy", newPt.y);
        }

        dragEl.texts.forEach(t => {
            if (t.tagName === 'text') {
                t.setAttribute("x", newPt.x + dragEl.xOffset);
                t.setAttribute("y", newPt.y + dragEl.yOffset);
            }
        });
        dragEl.rects.forEach(r => {
            if (r.tagName === 'rect') {
                r.setAttribute("x", newPt.x + dragEl.xOffset - textWidth / 2);
                r.setAttribute("y", newPt.y + dragEl.yOffset - textHeight + (fontSize * 0.3));
            }
        });
    }

    function onPointerUp(evt) {
        if (!dragEl) return;
        dragMarker.setAttribute("cursor", "grab");
        if (dragMarker.tagName === 'circle') dragMarker.setAttribute("fill", "#c9a84c");
        dragMarker.releasePointerCapture(evt.pointerId);
        const csvX = dragEl.coord.x * 1047 - 527.5;
        const csvY = dragEl.coord.y * 1047 - 535;
        saveOverride(dragEl.name, dragEl.storage, csvX, csvY);
        viewer.setMouseNavEnabled(true);
        dragEl = null;
        dragMarker = null;
    }

    function attachDragToElement(el) {
        let handle;
        if (el.markers && el.markers.length > 0) {
            handle = el.markers[0];
        } else if (el.rects && el.rects.length > 0) {
            handle = el.rects[0];
        } else {
            return;
        }

        handle.setAttribute("pointer-events", "all");
        handle.setAttribute("cursor", "grab");
        handle.style.touchAction = "none";

        function onPointerDown(evt) {
            if (!editorMode || editorActiveMode !== 'move') return;
            evt.preventDefault();
            evt.stopPropagation();
            dragEl = el;
            dragMarker = handle;
            handle.setAttribute("cursor", "grabbing");
            if (handle.tagName === 'circle') handle.setAttribute("fill", "#e74c3c");
            handle.setPointerCapture(evt.pointerId);
            viewer.setMouseNavEnabled(false);
        }

        handle.addEventListener('pointerdown', onPointerDown);
        editorDragTrackers.push({ destroy: function() {
            handle.removeEventListener('pointerdown', onPointerDown);
        }});
    }

    function attachAllDragHandlers() {
        document.addEventListener('pointermove', onPointerMove, true);
        document.addEventListener('pointerup', onPointerUp, true);
        editorDragTrackers.push({ destroy: function() {
            document.removeEventListener('pointermove', onPointerMove, true);
            document.removeEventListener('pointerup', onPointerUp, true);
        }});

        window._attachDragToElement = attachDragToElement;

        CONFIG.layers.forEach(config => {
            const storage = elementStorage[config.storage];
            if (!storage) return;
            storage.forEach(el => attachDragToElement(el));
        });
    }

    function detachAllDragHandlers() {
        editorDragTrackers.forEach(t => t.destroy());
        editorDragTrackers = [];
        window._attachDragToElement = null;
        dragEl = null;
        dragMarker = null;

        CONFIG.layers.forEach(config => {
            const storage = elementStorage[config.storage];
            if (!storage) return;
            storage.forEach(el => {
                if (el.markers) {
                    el.markers.forEach(m => {
                        m.setAttribute("pointer-events", "none");
                        m.removeAttribute("cursor");
                    });
                }
                if (!config.showMarker && el.rects) {
                    el.rects.forEach(r => {
                        r.removeAttribute("cursor");
                    });
                }
            });
        });
    }

    function setEditorMode(mode) {
        // Clean up previous mode
        if (editorActiveMode === 'move') {
            detachAllDragHandlers();
        }
        if (editorActiveMode === 'borders') {
            closeBordersPanel();
        }
        if (editorActiveMode === 'addPoint') {
            addPointMode = false;
            viewer.canvas.style.cursor = '';
            document.getElementById('addPointOptions').style.display = 'none';
        }

        // Update buttons
        document.querySelectorAll('.editor-mode-btn').forEach(b => b.classList.remove('active'));

        // Toggle: if same mode, deactivate
        if (editorActiveMode === mode) {
            editorActiveMode = 'none';
            return;
        }

        editorActiveMode = mode;

        // Activate new mode
        if (mode === 'move') {
            attachAllDragHandlers();
            document.getElementById('editorModeMove').classList.add('active');
        }
        if (mode === 'borders') {
            openBordersPanel();
            document.getElementById('editorModeBorders').classList.add('active');
        }
        if (mode === 'addPoint') {
            addPointMode = true;
            viewer.canvas.style.cursor = 'crosshair';
            document.getElementById('editorModeAddPoint').classList.add('active');
            document.getElementById('addPointOptions').style.display = 'block';
        }
    }

    function cancelBorderDraw() {
        borderDrawPoints = [];
        borderDrawPreview.forEach(el => el.remove());
        borderDrawPreview = [];
        borderDrawMode = false;
        const startBtn = document.getElementById('borderStartDraw');
        if (startBtn) startBtn.classList.remove('active');
        const hint = document.getElementById('borderDrawHint');
        if (hint) hint.style.display = 'none';
        viewer.canvas.style.cursor = '';
        window._borderDrawMeta = null;
    }

    function disableEditorMode() {
        setEditorMode('none');
        editorMode = false;
        cancelBorderDraw();
        document.getElementById('toggleEditor').classList.remove('active');
        document.getElementById('editorPanel').style.display = 'none';
        viewer.canvas.style.cursor = '';

        // Remove all editor trackers
        editorTrackers.forEach(t => t.destroy());
        editorTrackers = [];

        // Force markers hidden
        markersVisible = false;
        document.getElementById('toggleMarkers').classList.remove('active');
        Object.values(elementStorage).forEach(elements => {
            elements.forEach(el => {
                if (el.markers) {
                    el.markers.forEach(m => { m.style.display = 'none'; });
                }
            });
        });
    }

    function saveOverride(name, storage, csvX, csvY) {
        console.log('Saving override:', name, storage, csvX, csvY);
        fetch('/api/overrides', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                storage: storage,
                coord_x: csvX,
                coord_y: csvY,
                password: window._editorPassword
            })
        })
        .then(r => {
            if (!r.ok) return r.text().then(t => { throw new Error('Save failed: ' + r.status + ' ' + t); });
            console.log('Override saved OK:', name);
        })
        .catch(err => {
            console.error('Override save error:', err);
            alert('Erreur de sauvegarde: ' + err.message);
        });
    }

    // === Mesure ===

    function mScale() {
        const zoom = viewer.viewport.getZoom();
        return 1 / zoom;
    }

    function startMeasure(mode) {
        if (measureMode) cancelMeasure();
        measureMode = mode;
        measurePoints = [];
        measureFinished = false;
        clearPreview();
        document.body.classList.add('measuring');
        updateMeasureBar();
        document.getElementById('menuToggle').classList.remove('open');
        document.getElementById('controlsPanel').classList.remove('open');
    }

    function cancelMeasure() {
        measureMode = null;
        measurePoints = [];
        measureFinished = false;
        clearPreview();
        clearMarkers();
        clearMeasureLayer();
        document.body.classList.remove('measuring');
        updateMeasureBar();
    }

    function finishMeasure() {
        measureFinished = true;
        clearPreview();
        document.body.classList.remove('measuring');
        updateMeasureBar();
        // Enable dragging on markers
        enableMarkerDrag();
    }

    function clearAllMeasures() {
        measureMode = null;
        measurePoints = [];
        measureFinished = false;
        clearPreview();
        clearMarkers();
        clearMeasureLayer();
        document.body.classList.remove('measuring');
        updateMeasureBar();
    }

    function undoMeasurePoint() {
        if (measurePoints.length === 0) return;
        measurePoints.pop();
        const m = measureMarkers.pop();
        if (m && m.parentNode) m.parentNode.removeChild(m);
        const t = measureTrackers.pop();
        if (t) t.destroy();
        redrawMeasureProgress();
        updateMeasureBar();
        if (measurePoints.length === 0) {
            clearPreview();
        }
    }

    function clearMeasureLayer() {
        while (measureLayer.firstChild) {
            measureLayer.removeChild(measureLayer.firstChild);
        }
    }

    function clearPreview() {
        if (previewLine && previewLine.parentNode) previewLine.parentNode.removeChild(previewLine);
        if (previewPoly && previewPoly.parentNode) previewPoly.parentNode.removeChild(previewPoly);
        previewLine = null;
        previewPoly = null;
    }

    function clearMarkers() {
        measureMarkers.forEach(m => { if (m.parentNode) m.parentNode.removeChild(m); });
        measureMarkers.length = 0;
        measureTrackers.forEach(t => t.destroy());
        measureTrackers.length = 0;
    }

    function addMarker(point, index) {
        const s = mScale();
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", 0.004 * s);
        circle.setAttribute("fill", "#c9a84c");
        circle.setAttribute("stroke", "rgba(0,0,0,0.6)");
        circle.setAttribute("stroke-width", 0.001 * s);
        circle.setAttribute("pointer-events", "all");
        circle.setAttribute("cursor", "grab");
        circle.dataset.index = index;
        measureLayer.appendChild(circle);
        measureMarkers.push(circle);

        // Make marker draggable via OSD MouseTracker
        const tracker = new OpenSeadragon.MouseTracker({
            element: circle,
            dragHandler: function(e) {
                if (!measureFinished) return;
                e.preventDefaultAction = true;
                const newPt = viewer.viewport.pointFromPixel(e.position);
                const idx = parseInt(circle.dataset.index);
                measurePoints[idx] = newPt;
                circle.setAttribute("cx", newPt.x);
                circle.setAttribute("cy", newPt.y);
                rebuildMeasureResult();
            },
            pressHandler: function(e) {
                if (!measureFinished) return;
                e.preventDefaultAction = true;
                circle.setAttribute("cursor", "grabbing");
            },
            releaseHandler: function(e) {
                circle.setAttribute("cursor", "grab");
            }
        });
        measureTrackers.push(tracker);
    }

    function enableMarkerDrag() {
        // Markers are already draggable via their trackers, just ensure pointer-events
        measureMarkers.forEach(m => m.setAttribute("pointer-events", "all"));
    }

    function rebuildMeasureResult() {
        // Clear everything except markers
        const markers = [...measureMarkers];
        const children = [...measureLayer.children];
        children.forEach(child => {
            if (!markers.includes(child)) {
                measureLayer.removeChild(child);
            }
        });
        // Re-insert markers at the end (on top)
        markers.forEach(m => measureLayer.appendChild(m));

        const s = mScale();

        if (measureMode === 'distance' && measurePoints.length === 2) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute('x1', measurePoints[0].x);
            line.setAttribute('y1', measurePoints[0].y);
            line.setAttribute('x2', measurePoints[1].x);
            line.setAttribute('y2', measurePoints[1].y);
            line.setAttribute('stroke', '#c9a84c');
            line.setAttribute('stroke-width', 0.003 * s);
            line.setAttribute('pointer-events', 'none');
            measureLayer.insertBefore(line, measureLayer.firstChild);

            const dist = distanceKm(measurePoints[0], measurePoints[1]);
            const midX = (measurePoints[0].x + measurePoints[1].x) / 2;
            const midY = (measurePoints[0].y + measurePoints[1].y) / 2;
            showMeasureLabel(dist.toFixed(2) + ' km', { x: midX, y: midY - 0.015 * s });
            document.getElementById('measureLive').textContent = dist.toFixed(2) + ' km';
        }

        if (measureMode === 'area' && measurePoints.length > 2) {
            const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly.setAttribute('points', measurePoints.map(p => p.x + ',' + p.y).join(' '));
            poly.setAttribute('stroke', '#c9a84c');
            poly.setAttribute('fill', 'rgba(201,168,76,0.15)');
            poly.setAttribute('stroke-width', 0.002 * s);
            poly.setAttribute('pointer-events', 'none');
            measureLayer.insertBefore(poly, measureLayer.firstChild);

            const area = polygonArea(measurePoints);
            const cx = measurePoints.reduce((s, p) => s + p.x, 0) / measurePoints.length;
            const cy = measurePoints.reduce((s, p) => s + p.y, 0) / measurePoints.length;
            showMeasureLabel(area.toFixed(2) + ' km²', { x: cx, y: cy });
            document.getElementById('measureLive').textContent = area.toFixed(2) + ' km²';
        }
    }

    function updateMeasureScaling() {
        if (!measureMode && !measureFinished) return;
        const s = mScale();
        // Update marker sizes
        measureMarkers.forEach(m => {
            m.setAttribute("r", 0.004 * s);
            m.setAttribute("stroke-width", 0.001 * s);
        });
        // If finished, rebuild to rescale lines and labels
        if (measureFinished) {
            rebuildMeasureResult();
        } else {
            // Update progress lines
            const progressLines = measureLayer.querySelectorAll('.measure-progress');
            progressLines.forEach(line => {
                line.setAttribute('stroke-width', 0.002 * s);
                line.setAttribute('stroke-dasharray', (0.006 * s) + ',' + (0.004 * s));
            });
        }
    }

    function redrawMeasureProgress() {
        const toRemove = measureLayer.querySelectorAll('.measure-progress');
        toRemove.forEach(el => el.parentNode.removeChild(el));

        const s = mScale();

        if (measureMode === 'area' && measurePoints.length >= 2) {
            for (let i = 0; i < measurePoints.length - 1; i++) {
                const seg = document.createElementNS("http://www.w3.org/2000/svg", "line");
                seg.classList.add('measure-progress');
                seg.setAttribute('x1', measurePoints[i].x);
                seg.setAttribute('y1', measurePoints[i].y);
                seg.setAttribute('x2', measurePoints[i+1].x);
                seg.setAttribute('y2', measurePoints[i+1].y);
                seg.setAttribute('stroke', '#c9a84c');
                seg.setAttribute('stroke-width', 0.002 * s);
                seg.setAttribute('stroke-dasharray', (0.006 * s) + ',' + (0.004 * s));
                seg.setAttribute('pointer-events', 'none');
                measureLayer.appendChild(seg);
            }
        }
    }

    function updateMeasureBar() {
        const bar = document.getElementById('measureBar');
        const icon = document.getElementById('measureBarIcon');
        const hint = document.getElementById('measureHint');
        const live = document.getElementById('measureLive');
        const clearBtn = document.getElementById('measureClear');
        const undoBtn = document.getElementById('measureUndo');
        const cancelBtn = document.getElementById('measureCancel');

        if (!measureMode && !measureFinished) {
            bar.classList.remove('visible');
            document.body.classList.remove('measure-bar-visible');
            return;
        }

        bar.classList.add('visible');
        document.body.classList.add('measure-bar-visible');

        if (measureFinished) {
            icon.textContent = '\u2714';
            hint.textContent = 'Mesure termin\u00e9e';
            cancelBtn.textContent = 'Fermer';
            clearBtn.style.display = 'inline-block';
            undoBtn.style.display = 'none';
            return;
        }

        clearBtn.style.display = 'none';
        cancelBtn.textContent = 'Esc - Annuler';

        if (measureMode === 'distance') {
            icon.textContent = '\uD83D\uDCCF';
            if (measurePoints.length === 0) {
                hint.textContent = 'Cliquez le point de d\u00e9part';
                live.textContent = '';
            } else {
                hint.textContent = 'Cliquez le point d\u2019arriv\u00e9e';
            }
            undoBtn.style.display = measurePoints.length > 0 ? 'inline-block' : 'none';
        } else if (measureMode === 'area') {
            icon.textContent = '\u2B1B';
            if (measurePoints.length === 0) {
                hint.textContent = 'Cliquez pour placer les sommets';
                live.textContent = '';
            } else if (measurePoints.length < 3) {
                hint.textContent = 'Continuez \u00e0 placer des sommets (' + measurePoints.length + ')';
            } else {
                hint.textContent = measurePoints.length + ' sommets \u2014 double-clic pour terminer';
            }
            undoBtn.style.display = measurePoints.length > 0 ? 'inline-block' : 'none';
        }
    }

    function distanceKm(p1, p2) {
        const dx = (p2.x - p1.x) * CONFIG.worldWidthKm;
        const dy = (p2.y - p1.y) * CONFIG.worldWidthKm;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function polygonArea(points) {
        let area = 0;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            area += (points[j].x * points[i].y) - (points[i].x * points[j].y);
        }
        area = Math.abs(area / 2);
        return area * CONFIG.worldWidthKm * CONFIG.worldWidthKm;
    }

    function showMeasureLabel(text, coord) {
        const s = mScale();
        const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", coord.x);
        label.setAttribute("y", coord.y);
        label.setAttribute("fill", "#1c1814");
        label.setAttribute("font-size", 0.012 * s);
        label.setAttribute("font-family", "Segoe UI, system-ui, sans-serif");
        label.setAttribute("font-weight", "600");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("pointer-events", "none");
        label.textContent = text;

        const padding = 0.004 * s;
        const textW = text.length * 0.006 * s;
        bg.setAttribute("x", coord.x - textW / 2 - padding);
        bg.setAttribute("y", coord.y - 0.011 * s - padding / 2);
        bg.setAttribute("width", textW + padding * 2);
        bg.setAttribute("height", 0.016 * s);
        bg.setAttribute("rx", 0.004 * s);
        bg.setAttribute("fill", "#c9a84c");
        bg.setAttribute("pointer-events", "none");

        measureLayer.appendChild(bg);
        measureLayer.appendChild(label);
    }

    function handleCanvasMove(event) {
        if (!measureMode || measureFinished) return;
        if (measurePoints.length === 0) return;

        const point = viewer.viewport.pointFromPixel(event.position);
        const last = measurePoints[measurePoints.length - 1];
        const s = mScale();

        if (measureMode === 'distance') {
            if (!previewLine) {
                previewLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                previewLine.setAttribute('stroke', '#c9a84c');
                previewLine.setAttribute('pointer-events', 'none');
                measureLayer.appendChild(previewLine);
            }
            previewLine.setAttribute('stroke-width', 0.003 * s);
            previewLine.setAttribute('stroke-dasharray', (0.008 * s) + ',' + (0.005 * s));
            previewLine.setAttribute('x1', last.x);
            previewLine.setAttribute('y1', last.y);
            previewLine.setAttribute('x2', point.x);
            previewLine.setAttribute('y2', point.y);

            const dist = distanceKm(last, point);
            document.getElementById('measureLive').textContent = dist.toFixed(1) + ' km';
        }

        if (measureMode === 'area') {
            if (!previewLine) {
                previewLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                previewLine.setAttribute('stroke', '#c9a84c');
                previewLine.setAttribute('pointer-events', 'none');
                measureLayer.appendChild(previewLine);
            }
            previewLine.setAttribute('stroke-width', 0.002 * s);
            previewLine.setAttribute('stroke-dasharray', (0.006 * s) + ',' + (0.004 * s));
            previewLine.setAttribute('x1', last.x);
            previewLine.setAttribute('y1', last.y);
            previewLine.setAttribute('x2', point.x);
            previewLine.setAttribute('y2', point.y);

            if (measurePoints.length >= 2) {
                if (!previewPoly) {
                    previewPoly = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    previewPoly.setAttribute('stroke', 'rgba(201,168,76,0.4)');
                    previewPoly.setAttribute('pointer-events', 'none');
                    measureLayer.appendChild(previewPoly);
                }
                previewPoly.setAttribute('stroke-width', 0.002 * s);
                previewPoly.setAttribute('stroke-dasharray', (0.006 * s) + ',' + (0.004 * s));
                previewPoly.setAttribute('x1', point.x);
                previewPoly.setAttribute('y1', point.y);
                previewPoly.setAttribute('x2', measurePoints[0].x);
                previewPoly.setAttribute('y2', measurePoints[0].y);
            }

            // Live area
            if (measurePoints.length >= 2) {
                const tempPts = [...measurePoints, point];
                const area = polygonArea(tempPts);
                document.getElementById('measureLive').textContent = area.toFixed(1) + ' km\u00b2';
            }
        }
    }

    function handleCanvasClick(event) {
        if (!measureMode || measureFinished) return;
        event.preventDefaultAction = true;

        const point = viewer.viewport.pointFromPixel(event.position);
        measurePoints.push(point);
        addMarker(point, measurePoints.length - 1);
        const s = mScale();

        if (measureMode === 'distance') {
            if (measurePoints.length === 2) {
                clearPreview();
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute('x1', measurePoints[0].x);
                line.setAttribute('y1', measurePoints[0].y);
                line.setAttribute('x2', measurePoints[1].x);
                line.setAttribute('y2', measurePoints[1].y);
                line.setAttribute('stroke', '#c9a84c');
                line.setAttribute('stroke-width', 0.003 * s);
                line.setAttribute('pointer-events', 'none');
                measureLayer.appendChild(line);

                const dist = distanceKm(measurePoints[0], measurePoints[1]);
                const midX = (measurePoints[0].x + measurePoints[1].x) / 2;
                const midY = (measurePoints[0].y + measurePoints[1].y) / 2;
                showMeasureLabel(dist.toFixed(2) + ' km', { x: midX, y: midY - 0.015 * s });
                finishMeasure();
                document.getElementById('measureLive').textContent = dist.toFixed(2) + ' km';
            } else {
                updateMeasureBar();
            }
        }

        if (measureMode === 'area') {
            redrawMeasureProgress();
            updateMeasureBar();
        }
    }

    function handleCanvasDoubleClick(event) {
        if (measureMode === 'area' && measurePoints.length > 2 && !measureFinished) {
            event.preventDefaultAction = true;
            clearPreview();
            measureLayer.querySelectorAll('.measure-progress').forEach(el => el.parentNode.removeChild(el));

            const s = mScale();
            const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly.setAttribute('points', measurePoints.map(p => p.x + ',' + p.y).join(' '));
            poly.setAttribute('stroke', '#c9a84c');
            poly.setAttribute('fill', 'rgba(201,168,76,0.15)');
            poly.setAttribute('stroke-width', 0.002 * s);
            poly.setAttribute('pointer-events', 'none');
            measureLayer.appendChild(poly);

            const area = polygonArea(measurePoints);
            // Place label at centroid
            const cx = measurePoints.reduce((s, p) => s + p.x, 0) / measurePoints.length;
            const cy = measurePoints.reduce((s, p) => s + p.y, 0) / measurePoints.length;
            showMeasureLabel(area.toFixed(2) + ' km\u00b2', { x: cx, y: cy });
            finishMeasure();
            document.getElementById('measureLive').textContent = area.toFixed(2) + ' km\u00b2';
        }
    }

    // Fullscreen iOS - pseudo-fullscreen pour les appareils qui ne supportent pas l'API Fullscreen
    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }

    function initIOSFullscreen() {
        if (!isIOS()) return;

        const btn = document.getElementById('iosFullscreenBtn');
        btn.style.display = 'block';

        let isFullscreen = false;

        btn.addEventListener('click', function() {
            isFullscreen = !isFullscreen;

            if (isFullscreen) {
                document.body.classList.add('ios-fullscreen');
                btn.textContent = '\u2716 Quitter plein écran';
                // Scroll pour masquer la barre d'adresse Safari
                window.scrollTo(0, 1);
            } else {
                document.body.classList.remove('ios-fullscreen');
                btn.textContent = '\u26F6 Plein écran';
            }

            // Forcer le redimensionnement du viewer
            if (viewer) {
                setTimeout(function() {
                    viewer.viewport.goHome(true);
                }, 100);
            }
        });

        // Si lancé depuis l'écran d'accueil (mode standalone), masquer le bouton
        if (window.navigator.standalone) {
            btn.style.display = 'none';
        }
    }

    // Menu hamburger
    function initMenu() {
        const toggle = document.getElementById('menuToggle');
        const panel = document.getElementById('controlsPanel');
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('open');
            panel.classList.toggle('open');
        });
    }

    // Initialisation
    initMenu();
    initViewer();
    initIOSFullscreen();
}

// Auto-expose
if (typeof window !== 'undefined') window.initMap = initMap;
