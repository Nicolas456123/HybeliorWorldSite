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
        { route: 'accueil',        label: 'Accueil',       icon: 'home' },
        { route: 'vision',         label: 'Vision',        icon: 'eye' },
        { route: 'monde',          label: 'Monde',         icon: 'globe' },
        { route: 'mecaniques',     label: 'Mécaniques',    icon: 'cog' },
        { route: 'systemes',       label: 'Systèmes',      icon: 'grid' },
        { route: 'implementation', label: 'Implémentation', icon: 'code' },
        { route: 'lore',           label: 'Histoires',     icon: 'book' },
        { route: 'carte',          label: 'Carte',         icon: 'map' },
        { route: 'frise',          label: 'Frise',         icon: 'clock' },
    ],

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
                { key: 'interface',    label: 'Interface',       src: 'GDD/03 - Mécaniques/Interface.md' },
            ],
        },

        systemes: {
            engine: 'md',
            defaultKey: 'index',
            tabs: [
                { key: 'index',         label: "Vue d'ensemble",    src: 'GDD/04 - Systèmes/Index.md' },
                { key: 'data',          label: 'Architecture Data', src: 'GDD/04 - Systèmes/Architecture Data-Driven.md' },
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

        lore: {
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

    /** Récupère la liste des routes valides */
    routes() {
        return this.mainNav.map(n => n.route);
    },

    /** Récupère le label d'une route */
    label(route) {
        const entry = this.mainNav.find(n => n.route === route);
        return entry ? entry.label : route;
    },
};

window.NavConfig = NavConfig;
