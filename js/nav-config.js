/**
 * nav-config.js — Configuration centrale de la navigation et des sous-onglets
 *
 * Source de vérité unique :
 *   - Le router lit `routes` pour les routes valides.
 *   - L'index.html génère les dropdowns de la nav principale depuis `subtabs`.
 *   - Les pages-coquilles (vision.html, monde.html, …) lisent leurs onglets depuis ici
 *     pour éviter la duplication.
 *
 * Convention :
 *   - `key`    : identifiant URL (slug). Ex: #implementation/combat
 *   - `label`  : libellé bouton/menu
 *   - `src`    : chemin du .md à rendre (relatif à /Docs/)
 *   - `engine` : 'md' (MdRenderer) ou 'html' (SubTabs sur fragment HTML)
 *
 * Pour les pages 'html' (Lore notamment), `src` pointe vers une page HTML
 * (lore-cosmo.html, etc.) au lieu d'un .md.
 */

const NavConfig = {
    /** Routes principales (ordre = ordre dans la nav du haut) */
    mainNav: [
        { route: 'accueil',        label: 'Accueil',        icon: 'home' },
        { route: 'lore',           label: 'Lore',           icon: 'book' },
        { route: 'implementation', label: 'Implémentation', icon: 'code' },
        { route: 'carte',          label: 'Carte',          icon: 'map' },
        { route: 'frise',          label: 'Frise',          icon: 'clock' },
    ],

    /** Routes internes accessibles via deep-link (pas dans le top nav).
        Quand on navigue vers ces routes, le top-nav highlight 'lore'. */
    loreSubroutes: ['vision', 'monde', 'mecaniques', 'systemes', 'histoires', 'nation'],

    /** Continents et nations — source unique pour :
        - la landing lore-histoires (cartes par continent)
        - la quick-nav latérale sur les routes histoires/nation
        - la résolution slug → nom de nation pour la page nation.html
        Liste TOUTES les nations qui ont une fiche (Pays/ et/ou Histoires/).
        Les nations sans fichier Histoires/ ouvrent quand même leur fiche Pays
        (l'onglet « Histoires » est masqué automatiquement par lore-reader.js). */
    nationContinents: [
        { key: 'alkaran',  label: 'Alkaran',  intro: '4 nations',    nations: ['Altram', 'Iskara', 'Torkam', 'Ferrath'] },
        { key: 'azoria',   label: 'Azoria',   intro: '4 nations',    nations: ['Caeloria', 'Azoral', 'Kethvar', 'Solmaris', "No Man's Land Azoria"] },
        { key: 'baelor',   label: 'Baelor',   intro: '1 nation',     nations: ['Baelor'] },
        { key: 'celethor', label: 'Celethor', intro: '4 nations',    nations: ['Astravia', 'Elarian', 'Ryldor', "No Man's Land Celethor"] },
        { key: 'cendara',  label: 'Cendara',  intro: '3 nations',    nations: ['Cendara', 'Arkhen', 'Pyrevane'] },
        { key: 'cestra',   label: 'Cestra',   intro: '2 nations',    nations: ['Cestra', 'Noravia', "No Man's Land Cestra"] },
        { key: 'endora',   label: 'Endora',   intro: '3 nations',    nations: ['Avalor', 'Haldria', 'Sanvara'] },
        { key: 'evertia',  label: 'Evertia',  intro: '3 nations',    nations: ['Evertia', 'Thalmaris', 'Sylvara'] },
        { key: 'galenor',  label: 'Galenor',  intro: '7 nations',    nations: ['Kharazir', 'Lumasar', 'Seraphia', 'Solena', 'Trinoria', 'Valoria', 'Ventera'] },
        { key: 'ilthara',  label: 'Ilthara',  intro: '8 nations',    nations: ['Ackerna', 'Drakora', 'Gryndor', 'Lythar', 'Pyrtara', 'Sylthara', 'Vytharia', 'Warenthor'] },
        { key: 'nysaria',  label: 'Nysaria',  intro: '3 nations',    nations: ['Nysaria', 'Lunasar', 'Mirathi'] },
        { key: 'onara',    label: 'Onara',    intro: '4 nations',    nations: ['Mosrack', 'Myrtam', 'Tyndara', 'Elarath'] },
        { key: 'ulinor',   label: 'Ulinor',   intro: '3 nations',    nations: ['Skaldoria', 'Ulinor', 'Dhalvoria'] },
    ],

    /** Slug URL-safe à partir d'un nom de nation. Inverse via findNationBySlug. */
    slugifyNation(name) {
        return String(name).toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    /** Retrouve { nation, continent, continentKey } depuis un slug, ou null. */
    findNationBySlug(slug) {
        if (!slug) return null;
        const conts = this.nationContinents || [];
        for (const cont of conts) {
            for (const nation of cont.nations) {
                if (this.slugifyNation(nation) === slug) {
                    return { nation, continent: cont.label, continentKey: cont.key };
                }
            }
        }
        return null;
    },

    /** Continent qui contient une nation donnée (par nom), ou null. */
    findContinentForNation(name) {
        const conts = this.nationContinents || [];
        for (const cont of conts) {
            if (cont.nations.includes(name)) return cont;
        }
        return null;
    },

    /** Religions — source unique pour le sidebar et la page de hub. */
    religions: [
        { key: 'systeme',  label: 'Système religieux',   md: 'Lore/Religions/00 - Système Religieux.md',     special: true },
        { key: 'histoire', label: 'Histoire & schismes', md: 'Lore/Religions/_Histoire des Religions.md',    special: true },
        { key: 'foedus',   label: 'Foedus Animae',       md: 'Lore/Religions/Foedus Animae.md' },
        { key: 'ignis',    label: 'Ignis Aeternum',      md: 'Lore/Religions/Ignis Aeternum.md' },
        { key: 'lex',      label: 'Lex Petra',           md: 'Lore/Religions/Lex Petra.md' },
        { key: 'noctari',  label: 'Noctari',             md: 'Lore/Religions/Noctari.md' },
        { key: 'ordo',     label: 'Ordo Caelum',         md: 'Lore/Religions/Ordo Caelum.md' },
        { key: 'rota',     label: 'Rota Mundi',          md: 'Lore/Religions/Rota Mundi.md' },
        { key: 'somnium',  label: 'Somnium Vigil',       md: 'Lore/Religions/Somnium Vigil.md' },
        { key: 'vael',     label: "Vael'Kurash",         md: "Lore/Religions/Vael'Kurash.md" },
        { key: 'via',      label: 'Via Ventus',          md: 'Lore/Religions/Via Ventus.md' },
        { key: 'aqua',     label: 'Aqua Nigra',          md: 'Lore/Religions/_Mineures/Aqua Nigra.md',     mineure: true },
        { key: 'cantus',   label: 'Cantus Mundi',        md: 'Lore/Religions/_Mineures/Cantus Mundi.md',   mineure: true },
        { key: 'catena',   label: 'Catena Fracta',       md: 'Lore/Religions/_Mineures/Catena Fracta.md',  mineure: true },
        { key: 'filii',    label: 'Filii Fornacis',      md: 'Lore/Religions/_Mineures/Filii Fornacis.md', mineure: true },
        { key: 'taciti',   label: 'Taciti',              md: 'Lore/Religions/_Mineures/Taciti.md',         mineure: true },
    ],

    /** URL hash pour ouvrir une religion en page-md autonome. */
    religionMdHref(md) {
        return '#md/' + encodeURIComponent(md);
    },

    /** Retrouve la religion correspondant à un chemin md (subkey du route 'md'). */
    findReligionByMdPath(path) {
        if (!path) return null;
        const norm = decodeURIComponent(path);
        return (this.religions || []).find(r => r.md === norm) || null;
    },

    /** Les 8 catégories de la landing Lore. Source unique consommée par :
        - pages/lore.html (les 8 cartes thématiques)
        - js/sidebar-lore-nav.js (quick-nav du sidebar, switch rapide entre cats)
        Pour chaque catégorie : icon, label, intro courte, et liste de liens. */
    loreCategories: [
        {
            key: 'souffle',
            icon: '🌬️',
            label: 'Le souffle du monde',
            intro: "La respiration cosmique d'Hybélior. Le monde change parce qu'il vit.",
            links: [
                { label: 'Le Souffle',           href: '#mecaniques/souffle' },
                { label: "L'Accord",             href: '#mecaniques/accord' },
                { label: 'Les Ères',             href: '#mecaniques/eres' },
                { label: 'Le Lien',              href: '#mecaniques/lien' },
            ],
        },
        {
            key: 'monde',
            icon: '🌍',
            label: 'Le monde et son histoire',
            intro: "Continents, cosmologie, lignées, dépôts d'Ères passées.",
            links: [
                { label: 'Cosmologie',           href: '#monde/cosmologie' },
                { label: 'Géographie',           href: '#monde/geographie' },
                { label: 'Continents',           href: '#monde/continents' },
                { label: "Histoire d'Hybélior",  href: '#monde/histoire' },
                { label: 'Lignées',              href: '#monde/lignees' },
                { label: 'Frise',                href: '#monde/frise' },
                { label: 'Traces des Ères',      href: '#monde/traces' },
            ],
        },
        {
            key: 'vivre',
            icon: '🏛️',
            label: 'Vivre dans Hybélior',
            intro: "Ce que c'est qu'être un voyageur d'Hybélior, traverser ses heures.",
            links: [
                { label: 'Vision',               href: '#vision/pitch' },
                { label: "L'Univers",            href: '#vision/univers' },
                { label: 'La Partie',            href: '#vision/partie' },
                { label: 'Personnage',           href: '#mecaniques/personnage' },
                { label: 'Mort',                 href: '#mecaniques/mort' },
                { label: 'Exploration',          href: '#mecaniques/exploration' },
                { label: 'Dialogue & Interactions', href: '#mecaniques/dialogue' },
            ],
        },
        {
            key: 'combat',
            icon: '⚔️',
            label: 'Combat et magie',
            intro: "L'art du combat, les Voies du Lien, la chimie cosmique des éléments.",
            links: [
                { label: 'Combat',               href: '#mecaniques/combat' },
                { label: 'Armes et Maîtrise',    href: '#mecaniques/armes' },
                { label: 'Réactions Élémentaires', href: '#mecaniques/reactions' },
                { label: 'PvP',                  href: '#mecaniques/pvp' },
            ],
        },
        {
            key: 'faire',
            icon: '🔨',
            label: 'Faire, troquer, bâtir',
            intro: "Les mains qui façonnent le monde. Métiers, marchés, ateliers, constructions.",
            links: [
                { label: 'Métiers',              href: '#mecaniques/metiers' },
                { label: 'Économie',             href: '#mecaniques/economie' },
                { label: 'Items',                href: '#mecaniques/items' },
                { label: 'Architecture',         href: '#mecaniques/architecture' },
                { label: 'Équipement et Armures', href: '#mecaniques/equipement' },
                { label: 'Inventaire',           href: '#mecaniques/inventaire' },
                { label: 'Labeur',               href: '#mecaniques/labeur' },
                { label: 'Progression',          href: '#mecaniques/progression' },
            ],
        },
        {
            key: 'presences',
            icon: '👥',
            label: 'Présences et entités',
            intro: "Les habitants, les bêtes, les esprits, les cosmiques qui peuplent le monde.",
            links: [
                { label: 'PNJ — présence et identité', href: '#systemes/pnj' },
                { label: 'Bestiaire',            href: '#systemes/bestiaire' },
                { label: 'Comportements PNJ',    href: '#systemes/comportements' },
            ],
        },
        {
            key: 'liens',
            icon: '🤝',
            label: 'Liens et alliances',
            intro: "Comment les voyageurs se rassemblent, se promettent, se déchirent.",
            links: [
                { label: 'Factions',             href: '#mecaniques/factions' },
                { label: 'Guildes',              href: '#mecaniques/guildes' },
            ],
        },
        {
            key: 'chroniques',
            icon: '📜',
            label: 'Chroniques et lecture du monde',
            intro: "Les récits de voyageurs, les religions, la chronologie, les augures.",
            links: [
                { label: 'Chroniques de Sorin Valthen', href: '#histoires/chroniques' },
                { label: 'Nations',              href: '#histoires/histoires' },
                { label: 'Religions',            href: '#monde/religions' },
                { label: 'Chronologie',          href: '#monde/chronologie' },
                { label: 'Prédiction',           href: '#mecaniques/prediction' },
            ],
        },
    ],

    /** Étant donné une route (ex: 'mecaniques') + subkey (ex: 'souffle'),
        retourne la catégorie Lore correspondante, ou null. */
    findLoreCategory(route, subkey) {
        if (!route) return null;

        // Routes spéciales sans entrée directe dans loreCategories :
        //   - #nation/<slug>             → catégorie Chroniques (sous le lien "Nations")
        //   - #md/Lore/Religions/*       → catégorie Chroniques (sous le lien "Religions")
        if (route === 'nation') {
            return (this.loreCategories || []).find(c => c.key === 'chroniques') || null;
        }
        if (route === 'md' && subkey) {
            const path = decodeURIComponent(subkey);
            if (path.startsWith('Lore/Religions/')) {
                return (this.loreCategories || []).find(c => c.key === 'chroniques') || null;
            }
        }

        const hash = '#' + route + (subkey ? '/' + subkey : '');
        const cats = this.loreCategories || [];
        for (const cat of cats) {
            if (cat.links.some(l => l.href === hash)) return cat;
        }
        // Fallback : match juste le route si pas de subkey exact
        for (const cat of cats) {
            if (cat.links.some(l => l.href.startsWith('#' + route + '/'))) return cat;
        }
        return null;
    },

    /** Sous-onglets par route. Une route absente ici => pas de dropdown. */
    subtabs: {
        vision: {
            engine: 'md',
            defaultKey: 'index',
            tabs: [
                { key: 'index',      label: "Vue d'ensemble", src: 'GDD/01 - Vision/Index.md' },
                { key: 'pitch',      label: 'Pitch',       src: 'GDD/01 - Vision/Vision.md' },
                { key: 'univers',    label: "L'Univers",   src: 'GDD/01 - Vision/Univers.md' },
                { key: 'partie',     label: 'La Partie',   src: 'GDD/01 - Vision/La Partie.md' },
                { key: 'production', label: 'Production',  src: 'GDD/01 - Vision/Production.md' },
            ],
        },

        monde: {
            engine: 'md',
            defaultKey: 'index',
            tabs: [
                { key: 'index',       label: "Vue d'ensemble", src: 'GDD/02 - Monde/Index.md' },
                { key: 'cosmologie',  label: 'Cosmologie',     src: 'GDD/02 - Monde/Cosmologie.md' },
                { key: 'geographie',  label: 'Géographie',     src: 'GDD/02 - Monde/Géographie.md' },
                { key: 'continents',  label: 'Continents',     src: 'GDD/02 - Monde/Continents/Index.md' },
                { key: 'lignees',     label: 'Lignées',        src: 'GDD/02 - Monde/Lignées.md' },
                { key: 'histoire',    label: 'Histoire',       src: "GDD/02 - Monde/Histoire d'Hybelior.md" },
                { key: 'chronologie', label: 'Chronologie',    src: '/pages/lore-chronologie.html', engine: 'html' },
                { key: 'religions',   label: 'Religions',      src: '/pages/lore-religions.html',   engine: 'html' },
                { key: 'frise',       label: 'Frise',          src: 'GDD/02 - Monde/Frise.md' },
                { key: 'traces',      label: 'Traces des Ères', src: 'GDD/02 - Monde/Traces des Ères.md' },
            ],
        },

        mecaniques: {
            engine: 'md',
            defaultKey: 'index',
            tabs: [
                { key: 'index',        label: "Vue d'ensemble",  src: 'GDD/03 - Mécaniques/Index.md' },
                { key: 'souffle',      label: 'Le Souffle',      src: 'GDD/03 - Mécaniques/Le Souffle.md' },
                { key: 'accord',       label: "L'Accord",        src: "GDD/03 - Mécaniques/L'Accord.md" },
                { key: 'eres',         label: 'Les Ères',        src: 'GDD/03 - Mécaniques/Les Ères.md' },
                { key: 'personnage',   label: 'Personnage',      src: 'GDD/03 - Mécaniques/Personnage.md' },
                { key: 'progression',  label: 'Progression',     src: 'GDD/03 - Mécaniques/Progression.md' },
                { key: 'labeur',       label: 'Labeur',          src: 'GDD/03 - Mécaniques/Labeur.md' },
                { key: 'combat',       label: 'Combat',          src: 'GDD/03 - Mécaniques/Combat.md' },
                { key: 'armes',        label: 'Armes',           src: 'GDD/03 - Mécaniques/Armes et Maîtrise.md' },
                { key: 'lien',         label: 'Le Lien (magie)', src: 'GDD/03 - Mécaniques/Le Lien.md' },
                { key: 'reactions',    label: 'Réactions Élémentaires', src: 'GDD/03 - Mécaniques/Réactions Élémentaires.md' },
                { key: 'equipement',   label: 'Équipement et Armures',  src: 'GDD/03 - Mécaniques/Équipement et Armures.md' },
                { key: 'inventaire',   label: 'Inventaire',      src: 'GDD/03 - Mécaniques/Inventaire.md' },
                { key: 'dialogue',     label: 'Dialogue et Interactions', src: 'GDD/03 - Mécaniques/Dialogue et Interactions.md' },
                { key: 'mort',         label: 'Mort',            src: 'GDD/03 - Mécaniques/Mort.md' },
                { key: 'metiers',      label: 'Métiers',         src: 'GDD/03 - Mécaniques/Métiers.md' },
                { key: 'metiers-cat',  label: 'Métiers — catalogue', src: 'GDD/03 - Mécaniques/Métiers/Index.md' },
                { key: 'economie',     label: 'Économie',        src: 'GDD/03 - Mécaniques/Économie.md' },
                { key: 'exploration',  label: 'Exploration',     src: 'GDD/03 - Mécaniques/Exploration.md' },
                { key: 'items',        label: 'Items',           src: 'GDD/03 - Mécaniques/Items/Index.md' },
                { key: 'architecture', label: 'Architecture',    src: 'GDD/03 - Mécaniques/Architecture/Index.md' },
                { key: 'guildes',      label: 'Guildes',         src: 'GDD/03 - Mécaniques/Guildes.md' },
                { key: 'factions',     label: 'Factions',        src: 'GDD/03 - Mécaniques/Factions.md' },
                { key: 'pvp',          label: 'PvP',             src: 'GDD/03 - Mécaniques/PvP.md' },
                { key: 'prediction',   label: 'Prédiction',      src: 'GDD/03 - Mécaniques/Prédiction.md' },
            ],
        },

        systemes: {
            engine: 'md',
            defaultKey: 'index',
            tabs: [
                { key: 'index',         label: "Vue d'ensemble",    src: 'GDD/04 - Systèmes/Index.md' },
                { key: 'pnj',           label: 'PNJ',               src: 'GDD/04 - Systèmes/PNJ.md' },
                { key: 'bestiaire',     label: 'Bestiaire',         src: 'GDD/04 - Systèmes/Bestiaire/Index.md' },
                { key: 'comportements', label: 'Comportements PNJ', src: 'GDD/04 - Systèmes/Comportements PNJ/Index.md' },
            ],
        },

        implementation: {
            engine: 'md',
            defaultKey: 'index',
            tabs: (function () {
                const base = 'GDD/05 - Implémentation Unreal/';
                return [
                    { key: 'index',       label: "Vue d'ensemble",            src: base + 'Index.md' },
                    { key: 'overview',    label: 'Architecture',              src: base + "Vue d'Ensemble/Index.md" },
                    { key: 'combat',      label: 'Combat & Capacités',         src: base + 'Combat et Capacités/Index.md' },
                    { key: 'entities',    label: 'Personnages & Entités',      src: base + 'Personnages et Entités/Index.md' },
                    { key: 'progression', label: 'Progression & Inventaire',   src: base + 'Progression et Inventaire/Index.md' },
                    { key: 'monde',       label: 'Monde & Environnement',      src: base + 'Monde et Environnement/Index.md' },
                    { key: 'ui',          label: 'Interaction & UI',           src: base + 'Interaction et UI/Index.md' },
                    { key: 'vfx',         label: 'VFX / Audio / Rendu',        src: base + 'VFX Audio Rendu/Index.md' },
                    { key: 'framework',   label: 'Framework & Plugins',        src: base + 'Framework et Plugins/Index.md' },
                    { key: 'backend',     label: 'Backend OWS',                src: base + 'Backend OWS/Index.md' },
                    { key: 'tools',       label: 'Outils & Automation',        src: base + 'Outils et Automation/Index.md' },
                    { key: 'audits',      label: 'Audits',                     src: base + 'Audits/Index.md' },
                    { key: 'items-cat',   label: "Catalogue d'Items",          src: base + 'Progression et Inventaire/Item Catalog/_Index.md' },
                    { key: 'metiers-cat', label: 'Catalogue Métiers',          src: base + 'Métiers Catalog/Index.md' },
                ];
            })(),
        },

        histoires: {
            engine: 'html',
            defaultKey: 'chroniques',
            tabs: [
                { key: 'chroniques',  label: 'Chroniques',  src: '/pages/lore-chroniques.html' },
                { key: 'histoires',   label: 'Nations',     src: '/pages/lore-histoires.html' },
            ],
        },
    },

    /** Vrai si la route a des sous-onglets */
    hasSubtabs(route) {
        return !!this.subtabs[route] && Array.isArray(this.subtabs[route].tabs);
    },

    /** Récupère la liste de TOUTES les routes valides (top nav + sous-routes lore).
        Le router s'en sert pour distinguer route vs ancre. */
    routes() {
        return this.mainNav.map(n => n.route).concat(this.loreSubroutes || []);
    },

    /** Récupère le label d'une route */
    label(route) {
        const entry = this.mainNav.find(n => n.route === route);
        return entry ? entry.label : route;
    },
};

window.NavConfig = NavConfig;
