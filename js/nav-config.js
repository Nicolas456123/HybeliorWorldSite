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
 * (lore-chronologie.html, etc.) au lieu d'un .md.
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
        Quand on navigue vers ces routes, le top-nav highlight 'lore'.
        - #continent/<key> : fiche continent (factuel)
        - #nation/<slug>   : fiche Description d'une nation (factuel)
        - #histoire/<slug> : récit (Histoire) d'une nation (Chroniques) */
    loreSubroutes: ['vision', 'monde', 'mecaniques', 'systemes', 'histoires', 'nation', 'continent', 'histoire', 'religion', 'roman'],

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
        { key: 'celethor', label: 'Celethor', intro: '4 nations + île', nations: ['Astravia', 'Elarian', 'Ryldor', 'Nysaria', "No Man's Land Celethor"] },
        { key: 'cendara',  label: 'Cendara',  intro: '3 nations',    nations: ['Cendara', 'Arkhen', 'Pyrevane'] },
        { key: 'cestra',   label: 'Cestra',   intro: '2 nations',    nations: ['Cestra', 'Noravia', "No Man's Land Cestra"] },
        { key: 'endora',   label: 'Endora',   intro: '3 nations',    nations: ['Avalor', 'Haldria', 'Sanvara'] },
        { key: 'evertia',  label: 'Evertia',  intro: '3 nations',    nations: ['Evertia', 'Thalmaris', 'Sylvara'] },
        { key: 'galenor',  label: 'Galenor',  intro: '7 nations',    nations: ['Kharazir', 'Lumasar', 'Seraphia', 'Solena', 'Trinoria', 'Valoria', 'Ventera'] },
        { key: 'ilthara',  label: 'Ilthara',  intro: '8 nations',    nations: ['Ackerna', 'Drakora', 'Gryndor', 'Lythar', 'Pyrtara', 'Sylthara', 'Vytharia', 'Warenthor'] },
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

    /** Continent par clé (slug), ou null. */
    findContinentByKey(key) {
        return (this.nationContinents || []).find(c => c.key === key) || null;
    },

    /** Href de route PROPRE pour un nom de nation ou de continent (sinon null).
        Sert à transformer les wikilinks [[X]] des fiches en liens cliquables :
        nation → #nation/<slug>, continent → #continent/<key>. */
    linkHrefForName(name) {
        if (!name) return null;
        const slug = this.slugifyNation(name);
        if (this.findNationBySlug(slug)) return '#nation/' + slug;
        const cont = (this.nationContinents || []).find(c => c.label === name || c.key === slug);
        if (cont) return '#continent/' + cont.key;
        const rel = (this.religions || []).find(r => r.label === name);
        if (rel) return '#religion/' + rel.key;
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

    /** Route PROPRE pour une religion : #religion/<key>. */
    religionHref(key) {
        return '#religion/' + key;
    },

    /** Retrouve une religion par sa clé. */
    findReligionByKey(key) {
        if (!key) return null;
        return (this.religions || []).find(r => r.key === key) || null;
    },

    /** URL hash pour ouvrir une religion en page-md autonome (legacy / fallback). */
    religionMdHref(md) {
        return '#md/' + encodeURIComponent(md);
    },

    /** Retrouve la religion correspondant à un chemin md (subkey du route 'md'). */
    findReligionByMdPath(path) {
        if (!path) return null;
        const norm = decodeURIComponent(path);
        return (this.religions || []).find(r => r.md === norm) || null;
    },

    /** Roman « La Septième Heure » — source unique pour le sommaire et le sidebar. */
    roman: {
        "trilogie": "Les Trois Coups",
        "tome": 1,
        "titre": "La Septième Heure",
        "sousTitre": "L'Arrachement — An 0",
        "statut": "tome 1 V2 complet — ~56 fichiers",
        "dossier": "Lore/Romans/Les Trois Coups/T1 - La Septième Heure",
        "parties": [
            {
                "titre": "Prologue",
                "chapitres": [
                    {
                        "key": "ce-que-je-tiens",
                        "file": "00 - Ce que je tiens.md",
                        "label": "Ce que je tiens"
                    }
                ]
            },
            {
                "titre": "Partie I — Les lecteurs",
                "chapitres": [
                    {
                        "key": "les-lecteurs",
                        "file": "01 - Les lecteurs.md",
                        "label": "Les lecteurs"
                    },
                    {
                        "key": "la-derniere-question-de-l-academie",
                        "file": "02 - La dernière question de l'Académie.md",
                        "label": "La dernière question de l'Académie"
                    },
                    {
                        "key": "le-fil-et-le-vide",
                        "file": "03 - Le fil et le vide.md",
                        "label": "Le fil et le vide"
                    },
                    {
                        "key": "la-lettre-non-ecrite",
                        "file": "04 - La lettre non écrite.md",
                        "label": "La lettre non écrite"
                    },
                    {
                        "key": "la-gardienne-du-seuil",
                        "file": "05 - La gardienne du seuil.md",
                        "label": "La gardienne du seuil"
                    },
                    {
                        "key": "ce-qui-ne-plie-pas",
                        "file": "06 - Ce qui ne plie pas.md",
                        "label": "Ce qui ne plie pas"
                    },
                    {
                        "key": "la-forge-et-la-fille",
                        "file": "07 - La forge et la fille.md",
                        "label": "La forge et la fille"
                    },
                    {
                        "key": "deux-ans-pour-une-faille",
                        "file": "08 - Deux ans pour une faille.md",
                        "label": "Deux ans pour une faille"
                    },
                    {
                        "key": "le-rapport",
                        "file": "09 - Le rapport.md",
                        "label": "Le rapport"
                    },
                    {
                        "key": "la-concordance-manquante",
                        "file": "10 - La concordance manquante.md",
                        "label": "La concordance manquante"
                    },
                    {
                        "key": "seuil-de-la-partie-i-la-voix-du-lien",
                        "file": "11 - Seuil de la Partie I - La voix du Lien.md",
                        "label": "Seuil de la Partie I - La voix du Lien"
                    }
                ]
            },
            {
                "titre": "Partie II — Ce que le Lien a coûté",
                "chapitres": [
                    {
                        "key": "montrer-et-faire",
                        "file": "12 - Montrer et faire.md",
                        "label": "Montrer et faire"
                    },
                    {
                        "key": "la-part-des-vides",
                        "file": "13 - La part des Vides.md",
                        "label": "La part des Vides"
                    },
                    {
                        "key": "ceux-qui-tiennent-la-ville",
                        "file": "14 - Ceux qui tiennent la ville.md",
                        "label": "Ceux qui tiennent la ville"
                    },
                    {
                        "key": "ce-que-le-silence-garde",
                        "file": "15 - Ce que le silence garde.md",
                        "label": "Ce que le silence garde"
                    },
                    {
                        "key": "le-vote",
                        "file": "16 - Le vote.md",
                        "label": "Le vote"
                    },
                    {
                        "key": "ce-que-les-reves-savaient",
                        "file": "17 - Ce que les rêves savaient.md",
                        "label": "Ce que les rêves savaient"
                    },
                    {
                        "key": "ce-que-les-reves-montrent-d-autre",
                        "file": "18 - Ce que les rêves montrent d'autre.md",
                        "label": "Ce que les rêves montrent d'autre"
                    },
                    {
                        "key": "vytharia-l-automne-d-avant",
                        "file": "19 - Vytharia, l'automne d'avant.md",
                        "label": "Vytharia, l'automne d'avant"
                    },
                    {
                        "key": "ce-que-l-agent-ne-dit-plus",
                        "file": "20 - Ce que l'agent ne dit plus.md",
                        "label": "Ce que l'agent ne dit plus"
                    },
                    {
                        "key": "seuil-de-la-partie-ii-la-voix-du-lien",
                        "file": "21 - Seuil de la Partie II - La voix du Lien.md",
                        "label": "Seuil de la Partie II - La voix du Lien"
                    }
                ]
            },
            {
                "titre": "Partie III — Le voyage",
                "chapitres": [
                    {
                        "key": "la-barre-et-le-fil",
                        "file": "22 - La barre et le fil.md",
                        "label": "La barre et le fil"
                    },
                    {
                        "key": "ceux-de-l-eau",
                        "file": "23 - Ceux de l'eau.md",
                        "label": "Ceux de l'eau"
                    },
                    {
                        "key": "la-forge-qu-on-laisse",
                        "file": "24 - La forge qu'on laisse.md",
                        "label": "La forge qu'on laisse"
                    },
                    {
                        "key": "le-gite-trop-propre",
                        "file": "25 - Le gîte trop propre.md",
                        "label": "Le gîte trop propre"
                    },
                    {
                        "key": "la-ville-qui-respire",
                        "file": "26 - La ville qui respire.md",
                        "label": "La ville qui respire"
                    },
                    {
                        "key": "la-premiere-personne-du-singulier",
                        "file": "27 - La première personne du singulier.md",
                        "label": "La première personne du singulier"
                    },
                    {
                        "key": "la-vision-et-la-lame",
                        "file": "28 - La vision et la lame.md",
                        "label": "La vision et la lame"
                    },
                    {
                        "key": "sulvane-apres-l-appareillage",
                        "file": "29 - Sulvane, après l'appareillage.md",
                        "label": "Sulvane, après l'appareillage"
                    },
                    {
                        "key": "les-morts-qui-poussent",
                        "file": "30 - Les morts qui poussent.md",
                        "label": "Les morts qui poussent"
                    },
                    {
                        "key": "seuil-de-la-partie-iii-la-voix-du-lien",
                        "file": "31 - Seuil de la Partie III - La voix du Lien.md",
                        "label": "Seuil de la Partie III - La voix du Lien"
                    }
                ]
            },
            {
                "titre": "Partie IV — La veille",
                "chapitres": [
                    {
                        "key": "ce-que-les-morts-ne-disent-pas",
                        "file": "32 - Ce que les morts ne disent pas.md",
                        "label": "Ce que les morts ne disent pas"
                    },
                    {
                        "key": "ce-qu-on-ne-dit-pas-a-une-s-ur",
                        "file": "33 - Ce qu'on ne dit pas à une sœur.md",
                        "label": "Ce qu'on ne dit pas à une sœur"
                    },
                    {
                        "key": "ce-qu-un-homme-peut-tenir",
                        "file": "34 - Ce qu'un homme peut tenir.md",
                        "label": "Ce qu'un homme peut tenir"
                    },
                    {
                        "key": "le-feu-encore-chaud",
                        "file": "35 - Le feu encore chaud.md",
                        "label": "Le feu encore chaud"
                    },
                    {
                        "key": "la-phrase-qui-attendait",
                        "file": "36 - La phrase qui attendait.md",
                        "label": "La phrase qui attendait"
                    },
                    {
                        "key": "la-quille-dans-le-sable-noir",
                        "file": "37 - La quille dans le sable noir.md",
                        "label": "La quille dans le sable noir"
                    },
                    {
                        "key": "seuil-de-la-partie-iv-la-voix-du-lien",
                        "file": "38 - Seuil de la Partie IV - La voix du Lien.md",
                        "label": "Seuil de la Partie IV - La voix du Lien"
                    }
                ]
            },
            {
                "titre": "Partie V — La septième heure",
                "chapitres": [
                    {
                        "key": "seuil-de-la-partie-v-la-voix-du-lien",
                        "file": "39 - Seuil de la Partie V - La voix du Lien.md",
                        "label": "Seuil de la Partie V - La voix du Lien"
                    },
                    {
                        "key": "h-7",
                        "file": "40 - H-7.md",
                        "label": "H-7"
                    },
                    {
                        "key": "h-5",
                        "file": "41 - H-5.md",
                        "label": "H-5"
                    },
                    {
                        "key": "h-2",
                        "file": "42 - H-2.md",
                        "label": "H-2"
                    },
                    {
                        "key": "h0",
                        "file": "43 - H0.md",
                        "label": "H0"
                    },
                    {
                        "key": "au-pied-de-la-montagne",
                        "file": "44 - Au pied de la montagne.md",
                        "label": "Au pied de la montagne"
                    },
                    {
                        "key": "h1",
                        "file": "45 - H1.md",
                        "label": "H1"
                    },
                    {
                        "key": "h2",
                        "file": "46 - H2.md",
                        "label": "H2"
                    },
                    {
                        "key": "h3-le-gouffre-d-endora",
                        "file": "47 - H3 - Le Gouffre d'Endora.md",
                        "label": "H3 - Le Gouffre d'Endora"
                    },
                    {
                        "key": "h4",
                        "file": "48 - H4.md",
                        "label": "H4"
                    },
                    {
                        "key": "h5-la-cite-qui-prie-en-tombant",
                        "file": "49 - H5 - La cité qui prie en tombant.md",
                        "label": "H5 - La cité qui prie en tombant"
                    },
                    {
                        "key": "h6",
                        "file": "50 - H6.md",
                        "label": "H6"
                    },
                    {
                        "key": "h7",
                        "file": "51 - H7.md",
                        "label": "H7"
                    }
                ]
            },
            {
                "titre": "Coda — Le premier jour de la Grande Nuit",
                "chapitres": [
                    {
                        "key": "la-marque-qui-reste",
                        "file": "52 - La marque qui reste.md",
                        "label": "La marque qui reste"
                    },
                    {
                        "key": "le-rapport-que-personne-ne-lira",
                        "file": "53 - Le rapport que personne ne lira.md",
                        "label": "Le rapport que personne ne lira"
                    },
                    {
                        "key": "le-silence-est-revenu",
                        "file": "54 - Le silence est revenu.md",
                        "label": "Le silence est revenu"
                    },
                    {
                        "key": "qu-il-attende-quelqu-un-de-meilleur",
                        "file": "55 - Qu'il attende quelqu'un de meilleur.md",
                        "label": "Qu'il attende quelqu'un de meilleur"
                    }
                ]
            }
        ]
    },

    /** Route PROPRE pour un chapitre de roman : #roman/<key>. */
    romanHref(key) {
        return '#roman/' + key;
    },

    /** Liste À PLAT de tous les chapitres du roman, dans l'ordre de lecture.
        Chaque entrée : { key, label, file, partie, md, index }.
        `md` = chemin complet avec préfixe "Lore/" (comme religions.md). */
    romanChapitres() {
        const out = [];
        const roman = this.roman || {};
        const dossier = roman.dossier || '';
        (roman.parties || []).forEach(partie => {
            (partie.chapitres || []).forEach(ch => {
                out.push({
                    key: ch.key,
                    label: ch.label,
                    file: ch.file,
                    partie: partie.titre,
                    md: dossier + '/' + ch.file,
                    index: out.length,
                });
            });
        });
        return out;
    },

    /** Retrouve un chapitre de roman par sa clé (avec prev/next dans l'ordre à plat). */
    findRomanChapitreByKey(key) {
        if (!key) return null;
        const flat = this.romanChapitres();
        const i = flat.findIndex(c => c.key === key);
        if (i === -1) return null;
        const ch = flat[i];
        return Object.assign({}, ch, {
            prev: i > 0 ? flat[i - 1] : null,
            next: i < flat.length - 1 ? flat[i + 1] : null,
            total: flat.length,
        });
    },

    /** Les 8 catégories de la landing Lore. Source unique consommée par :
        - pages/lore.html (les 8 cartes thématiques)
        - js/sidebar-tree.js (arbre de navigation du sidebar)
        Pour chaque catégorie : icon, label, intro courte, et liste de liens. */
    loreCategories: [
        {
            key: 'souffle',
            icon: '🌬️',
            label: 'Le souffle du monde',
            intro: "La respiration cosmique d'Hybelior. Le monde change parce qu'il vit.",
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
                { label: "Histoire d'Hybelior",  href: '#monde/histoire' },
                { label: 'Lignées',              href: '#monde/lignees' },
                { label: 'Frise',                href: '#monde/frise' },
                { label: 'Traces des Ères',      href: '#monde/traces' },
            ],
        },
        {
            key: 'vivre',
            icon: '🏛️',
            label: 'Vivre dans Hybelior',
            intro: "Ce que c'est qu'être un voyageur d'Hybelior, traverser ses heures.",
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
                { label: 'La Septième Heure (roman)', href: '#roman' },
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
        // Côté FACTUEL (Le monde) : fiche continent (#continent/) et fiche Description (#nation/)
        if (route === 'nation' || route === 'continent') {
            return (this.loreCategories || []).find(c => c.key === 'monde') || null;
        }
        // Côté CHRONIQUES : récit (Histoire) d'une nation (#histoire/), religions
        // (#religion/) et le roman « La Septième Heure » (#roman/…).
        if (route === 'histoire' || route === 'religion' || route === 'roman') {
            return (this.loreCategories || []).find(c => c.key === 'chroniques') || null;
        }
        if (route === 'md' && subkey) {
            const path = decodeURIComponent(subkey);
            // Récits (Histoires) + religions → Chroniques ; fiches Pays/continent → Le monde.
            if (path.startsWith('Lore/Religions/') || path.startsWith('Lore/Histoires/')) {
                return (this.loreCategories || []).find(c => c.key === 'chroniques') || null;
            }
            if (path.startsWith('Lore/Pays/')) {
                return (this.loreCategories || []).find(c => c.key === 'monde') || null;
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
