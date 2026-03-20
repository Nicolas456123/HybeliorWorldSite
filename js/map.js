function initMap() {
    // Configuration globale
    const CONFIG = {
        worldWidthKm: 1000,
        layers: [
            { fontSize: "0.03", storage: "continentsElements", xOffset: 0, yOffset: 0, zoomRange: [0, 2] },
            { fontSize: "0.01", storage: "paysElements", xOffset: 0, yOffset: 0, zoomRange: [2, 4] },
            { fontSize: "0.004", storage: "regionElements", xOffset: 0, yOffset: 0, zoomRange: [4, 10] },
            { fontSize: "0.0015", storage: "capitalesElements", xOffset: 0, yOffset: -0.002, showMarker: true, zoomRange: [10, Infinity] },
            { fontSize: "0.0011", storage: "citesElements", xOffset: 0, yOffset: -0.0015, showMarker: true, zoomRange: [14, Infinity] },
            { fontSize: "0.0006", storage: "villesElements", xOffset: 0, yOffset: -0.0014, showMarker: true, zoomRange: [16, Infinity] },
            { fontSize: "0.0004", storage: "villagesElements", xOffset: 0, yOffset: -0.001, showMarker: true, zoomRange: [18, Infinity] }
        ]
    };

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
    let markersVisible = true;
    let measureMode = null;
    let measurePoints = [];
    let currentGridSize = 10;
    let gridVisible = false;
    let wrappingEnabled = true;

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
    let addPointMode = false;

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
            tileSources: "./HybeliorFull/HybeliorMap.dzi",
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
    function initLayers() {
        // Couche pour les frontières
        bordersLayer = createSVGGroup('bordersLayer');
        bordersLayer.style.display = 'none';
        
        // Couche pour les mesures
        measureLayer = createSVGGroup('measureLayer');
        
        // Couche pour la grille
        gridLayer = createSVGGroup('gridLayer');
        gridLayer.classList.add('grid-overlay');
        gridLayer.style.display = 'none';
        
        // Exemple de frontière
        createSampleBorder();
        
        // Timeline
        initTimeline();
    }

    function createSVGGroup(id) {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute('id', id);
        svgOverlay.node().appendChild(group);
        return group;
    }

    function createSampleBorder() {
        const borderShapes = {
            0: '0.45,0.45 0.55,0.45 0.55,0.55 0.45,0.55',
            1: '0.40,0.45 0.60,0.45 0.60,0.55 0.40,0.55',
            2: '0.40,0.40 0.60,0.40 0.60,0.60 0.40,0.60'
        };

        const sampleBorders = [];

        // Déterminer les positions selon l'état du wrapping
        const positions = wrappingEnabled ? [
            {x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 0},
            {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 1},
            {x: -1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}
        ] : [{x: 0, y: 0}]; // Seulement position originale si pas de wrapping

        positions.forEach(offset => {
            const sampleBorder = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            sampleBorder.setAttribute('points', borderShapes[0]);
            sampleBorder.setAttribute('stroke', 'red');
            sampleBorder.setAttribute('fill', 'transparent');
            sampleBorder.setAttribute('transform', `translate(${offset.x}, ${offset.y})`);
            bordersLayer.appendChild(sampleBorder);

            // Événements hover
            sampleBorder.addEventListener('mouseover', () => {
                sampleBorder.setAttribute('fill', 'rgba(255,0,0,0.3)');
            });
            sampleBorder.addEventListener('mouseout', () => {
                sampleBorder.setAttribute('fill', 'transparent');
            });

            sampleBorders.push(sampleBorder);
        });

        // Timeline pour les frontières
        window.updateBorders = function() {
            const val = parseInt(document.getElementById('timeline').value, 10);
            const points = borderShapes[val];
            if (points) {
                sampleBorders.forEach(border => {
                    border.setAttribute('points', points);
                });
            }
        };
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
                        startYear: e.startYear,
                        endYear: e.endYear,
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
                            startYear: e.startYear,
                            endYear: e.endYear,
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

        // Boutons de contrôle
        document.getElementById('toggleText').addEventListener('click', toggleTextVisibility);
        document.getElementById('toggleBorders').addEventListener('click', toggleBorders);
        document.getElementById('toggleWrapping').addEventListener('click', toggleWrapping);
        document.getElementById('clickZoomRange').addEventListener('input', (e) => {
            const pct = parseInt(e.target.value);
            clickZoomMultiplier = 1.5 * (pct / 100); // 100% = 1.5x, 50% = 0.75x, 200% = 3x
            document.getElementById('clickZoomValue').textContent = pct + '%';
        });
        document.getElementById('measureDistance').addEventListener('click', () => startMeasure('distance'));
        document.getElementById('measureArea').addEventListener('click', () => startMeasure('area'));
        document.getElementById('toggleEditor').addEventListener('click', toggleEditor);
        document.getElementById('toggleMarkers').addEventListener('click', toggleMarkers);
        document.getElementById('toggleGrid').addEventListener('click', toggleGrid);

        // Navigation personnalisée
        document.getElementById('navZoomIn').addEventListener('click', () => {
            viewer.viewport.zoomBy(1.5);
            viewer.viewport.applyConstraints();
        });
        document.getElementById('navZoomOut').addEventListener('click', () => {
            viewer.viewport.zoomBy(0.667);
            viewer.viewport.applyConstraints();
        });
        document.getElementById('navHome').addEventListener('click', () => {
            viewer.viewport.goHome();
        });
        document.getElementById('navFullscreen').addEventListener('click', () => {
            if (viewer.isFullPage()) {
                viewer.setFullPage(false);
            } else {
                viewer.setFullPage(true);
            }
        });

        // Mesure : boutons barre
        document.getElementById('measureCancel').addEventListener('click', cancelMeasure);
        document.getElementById('measureClear').addEventListener('click', clearAllMeasures);
        document.getElementById('measureUndo').addEventListener('click', undoMeasurePoint);

        // Escape pour annuler la mesure
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && measureMode) {
                cancelMeasure();
            }
        });

        // Contrôles de grille
        initGridControls();

        // Événements de zoom, pan et resize
        viewer.addHandler('zoom', throttledUpdateVisibility);
        viewer.addHandler('zoom', updateMeasureScaling);
        viewer.addHandler('pan', throttledUpdateVisibility);
        viewer.addHandler('resize', updateTextVisibility);
        viewer.addHandler('animation-finish', updateTextVisibility);
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
                    allTextElements.push(elements.text);
                    allRectElements.push(elements.rect);
                });
                updateTextVisibility();
                console.log(`Base de données chargée: ${entries.length} entrées`);
            })
            .catch(err => console.error('Erreur chargement base de données:', err));
    }

    function createTextAndRect(name, coord, config, item) {
        const fontSize = parseFloat(config.fontSize);
        const strokeWidth = fontSize * 0.06;
        const allTexts = [];
        const allRects = [];
        const allMarkers = [];

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
            textElement.setAttribute("fill", "white");
            textElement.setAttribute("stroke", "black");
            textElement.setAttribute("stroke-width", strokeWidth);
            textElement.setAttribute("font-size", fontSize);
            textElement.setAttribute("text-anchor", "middle");
            textElement.setAttribute("font-family", "Copperplate Gothic Std, sans-serif");
            textElement.setAttribute("pointer-events", "none");
            textElement.textContent = name;

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

            // Marqueur central (point doré) pour entités ponctuelles
            if (config.showMarker) {
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", coord.x + offset.x);
                circle.setAttribute("cy", coord.y + offset.y);
                circle.setAttribute("r", fontSize * 0.35);
                circle.setAttribute("fill", "#c9a84c");
                circle.setAttribute("stroke", "rgba(0,0,0,0.6)");
                circle.setAttribute("stroke-width", fontSize * 0.08);
                circle.setAttribute("pointer-events", "none");
                svgOverlay.node().appendChild(circle);
                allTexts.push(circle); // Suit la visibilité zoom
                allMarkers.push(circle);
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
        if (!textVisibilityEnabled) {
            allTextElements.forEach(el => el.style.display = 'none');
            allRectElements.forEach(el => el.style.display = 'none');
            return;
        }

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
    function toggleGrid() {
        gridVisible = !gridVisible;
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
        document.getElementById('addPointBtn').style.display = '';
        document.getElementById('addPointOptions').style.display = 'none';

        // Bouton ajouter un point
        function onAddPointClick() {
            addPointMode = !addPointMode;
            document.getElementById('addPointBtn').classList.toggle('active', addPointMode);
            document.getElementById('addPointOptions').style.display = addPointMode ? 'block' : 'none';
            viewer.canvas.style.cursor = addPointMode ? 'crosshair' : '';
        }
        document.getElementById('addPointBtn').addEventListener('click', onAddPointClick);
        editorTrackers.push({ destroy: () => {
            document.getElementById('addPointBtn').removeEventListener('click', onAddPointClick);
        }});

        // Handler pour placer un nouveau point sur clic canvas
        const origCanvasClick = viewer.getHandler('canvas-click');
        function addPointCanvasHandler(event) {
            if (!addPointMode || !editorMode) return;
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

            // Sauvegarder en DB
            const csvX = coord.x * 1047 - 527.5;
            const csvY = coord.y * 1047 - 535;
            saveOverride(name.trim(), storage, csvX, csvY);

            // Attacher drag au nouveau marqueur
            if (window._attachDragToElement) window._attachDragToElement(el);

            // Rendre visible
            updateTextVisibility();

            // Désactiver le mode ajout
            addPointMode = false;
            document.getElementById('addPointBtn').classList.remove('active');
            document.getElementById('addPointOptions').style.display = 'none';
            viewer.canvas.style.cursor = '';
        }
        viewer.addHandler('canvas-click', addPointCanvasHandler);
        editorTrackers.push({ destroy: () => {
            viewer.removeHandler('canvas-click', addPointCanvasHandler);
        }});

        let dragEl = null;       // element being dragged
        let dragMarker = null;   // circle being dragged

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
            // Auto-save
            const csvX = dragEl.coord.x * 1047 - 527.5;
            const csvY = dragEl.coord.y * 1047 - 535;
            saveOverride(dragEl.name, dragEl.storage, csvX, csvY);
            viewer.setMouseNavEnabled(true);
            dragEl = null;
            dragMarker = null;
        }

        document.addEventListener('pointermove', onPointerMove, true);
        document.addEventListener('pointerup', onPointerUp, true);
        editorTrackers.push({ destroy: function() {
            document.removeEventListener('pointermove', onPointerMove, true);
            document.removeEventListener('pointerup', onPointerUp, true);
        }});

        // Fonction pour attacher le drag à un élément (réutilisable pour nouveaux points)
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
                if (!editorMode) return;
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
            editorTrackers.push({ destroy: function() {
                handle.removeEventListener('pointerdown', onPointerDown);
            }});
        }

        // Rendre la fonction accessible depuis le handler d'ajout de point
        window._attachDragToElement = attachDragToElement;

        // Attach pointerdown to all draggable elements (markers or rects)
        CONFIG.layers.forEach(config => {
            const storage = elementStorage[config.storage];
            if (!storage) return;
            storage.forEach(el => attachDragToElement(el));
        });
    }

    function disableEditorMode() {
        editorMode = false;
        addPointMode = false;
        document.getElementById('toggleEditor').classList.remove('active');
        document.getElementById('addPointBtn').style.display = 'none';
        document.getElementById('addPointBtn').classList.remove('active');
        document.getElementById('addPointOptions').style.display = 'none';
        viewer.canvas.style.cursor = '';
        window._attachDragToElement = null;

        // Remove all editor trackers
        editorTrackers.forEach(t => t.destroy());
        editorTrackers = [];

        // Reset marker/rect styles
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
