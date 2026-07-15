/**
 * timeline-data.js — Donnees chronologiques partagees d'Hybelior
 * Utilise par : frise.html, map.js
 *
 * Acces : window.HYBELIOR_TIMELINE.{ERAS, CIV, GLOBAL, CONN, ...}
 */

(function () {
    'use strict';

    /* =================================================================
       ERES (canon Lore \u2014 8 \u00E8res : 0 \u00E0 VII)
       Source : Documentation/GDD/Lore/Chronologie/ (Era 0 \u2192 Era 7)
       ================================================================= */
    const ERAS = [
        {
            id: 'vide', num: '0', name: 'Le Vide',
            dates: '\u221E \u2014 Avant-M\u00E9moire',
            desc: 'Avant tout : pas de temps, pas d\'espace, pas de mati\u00E8re. Une R\u00E9sonance traverse le Substrat et fait \u00E9merger en cascade les 5 \u00C9ternels : Celestia, Noctis, Tempora, Eldoria, Navigor. Aucun mortel ne se souvient du Vide.',
            color: '#5a4a30', bg: 'rgba(90,74,48,0.05)', accent: '#5a4a30',
            yMin: 0, yMax: 60
        },
        {
            id: 'genese', num: 'I', name: 'La Gen\u00E8se',
            dates: 'Avant-M\u00E9moire \u2014 ~45 000 av.A',
            desc: 'Naissance des 12 Cosmiques en 4 phases (Aquor, Terranu, Aerion\u2026 jusqu\'\u00E0 Etherius). Installation des 45 \u00C9th\u00E9r\u00E9s sur le Panghor, le supercontinent unique. La Fracture du Panghor en 3 phases produit les 12 continents actuels.',
            color: '#a07820', bg: 'rgba(160,120,30,0.05)', accent: '#a07820',
            yMin: 60, yMax: 150
        },
        {
            id: 'eveil', num: 'II', name: 'L\'\u00C9veil des Mortels',
            dates: '~45 000 \u2014 ~20 000 av.A',
            desc: 'Les premiers mortels \u00E9mergent dans les 5 Berceaux : Marcheurs de Cendre, Enfants de la Roche, Coureurs, Voix-sous-Bois, Gens de l\'Eau. Le Grand Gel (~30 000 av.A) \u00E9limine ~73 % de la population. Reconstruction et premi\u00E8res migrations.',
            color: '#6a8040', bg: 'rgba(100,130,60,0.05)', accent: '#6a8040',
            yMin: 150, yMax: 300
        },
        {
            id: 'lien', num: 'III', name: 'L\'\u00C2ge du Lien',
            dates: '~20 000 av.A \u2014 An 0',
            desc: 'Orvane, Khatun et Ildaran formalisent ind\u00E9pendamment le Lien. 7 grands empires se succ\u00E8dent (Pyrevaste, Celith, Alkarath, Solvenar, Endara, Ithalorn, Everthor). 9 grandes religions structurent la vie spirituelle. Apog\u00E9e : ~120 M habitants, 7 cit\u00E9s volantes, 200+ portails. Souffle Cardinal de la Fracture (~-1 500). Verithan publie le Trait\u00E9 du Vide.',
            color: '#3060a0', bg: 'rgba(48,96,160,0.05)', accent: '#3060a0',
            yMin: 300, yMax: 800
        },
        {
            id: 'arrachement', num: 'IV', name: 'L\'Arrachement',
            dates: 'An 0 du Sillage',
            desc: 'Souffle Cardinal observ\u00E9. Selon le r\u00E9cit Verithane, l\'\u00C9tudiant aurait sectionn\u00E9 son N\u0153ud au Mont Cendra ; six lectures coexistent. Navigor cesse d\'\u00EAtre atteignable, Eldoria se fait silencieuse, Tempora para\u00EEt bless\u00E9. Navoria est engloutie en ~40 minutes. 17 Br\u00E8ches du N\u00E9ant + Crat\u00E8res du Cardinal.',
            color: '#a02020', bg: 'rgba(160,30,30,0.07)', accent: '#a02020',
            yMin: 800, yMax: 960
        },
        {
            id: 'nuit', num: 'V', name: 'La Grande Nuit',
            dates: 'An 0 \u2014 ~3 000 ap.A',
            desc: '4 phases d\u00E9mographiques : choc imm\u00E9diat (~120M\u219290M), stabilisation longue (~60-70M), quasi-extinction par le Fl\u00E9au des Failles (~30M\u219218M, Tisses d\u00E9cim\u00E9s ~150 000\u2192~200-300), recovery lente. Trois royaumes interm\u00E9diaires : Tharnok, Forgon, Drahk\'Nor. Convention de Gryndor.',
            color: '#502060', bg: 'rgba(80,32,96,0.05)', accent: '#502060',
            yMin: 960, yMax: 1560
        },
        {
            id: 'nations', num: 'VI', name: 'L\'\u00C8re des Nations',
            dates: '~3 000 \u2014 ~9 500 ap.A',
            desc: '7 guerres majeures fa\u00E7onnent les fronti\u00E8res. 36 nations reconnues \u00E9mergent comme \u00EElots de civilisation \u2014 plus de la moiti\u00E9 du monde reste sauvage (wildlands, Failles r\u00E9siduelles). Drahk\'Nor s\'effondre. Trois artefacts (Fragment Z\u00E9ro, Carte du Silence, Inscription de Kharazir) deviennent objets d\'archive. Aucun cadre supranational n\'aboutit.',
            color: '#7a5020', bg: 'rgba(122,80,32,0.05)', accent: '#7a5020',
            yMin: 1560, yMax: 2560
        },
        {
            id: 'actuel', num: 'VII', name: 'Le Monde Actuel',
            dates: '~9 500 \u2014 10 200 ap.A (an 251 du Sillage)',
            desc: 'Monde diplomatiquement fragment\u00E9 \u2014 36 nations reconnues, aucun cadre supranational. La Catena Fracta recrute en cellules. La Guerre de l\'Ombre est active. Le C\u0153ur de Cendra pulse de plus en plus vite. Anomalies tardives : Enfants aux Yeux Blancs, \u00E9toiles mouvantes, Failles possiblement mobiles. T\u00E9moins encore vivants : Veyran d\'Astravia, In\u00E9a la Sept-fois-R\u00E9veill\u00E9e, La H\u00EAtraie d\'Os-Karash\u2026',
            color: '#7a4c0a', bg: 'rgba(122,76,10,0.06)', accent: '#7a4c0a',
            yMin: 2560, yMax: 3160
        },
    ];

    /* =================================================================
       DATE TICKS  (y-coordinate -> label)
       ================================================================= */
    const DATE_TICKS = [
        {y:0,   label:'\u221E'},
        {y:150, label:'~45 000 av.A'},
        {y:238, label:'~30 000 av.A'},
        {y:300, label:'~20 000 av.A'},
        {y:500, label:'~10 000 av.A'},
        {y:700, label:'~3 000 av.A'},
        {y:800, label:'An 0'},
        {y:960, label:'~200 ap.A'},
        {y:1195,label:'~1 500 ap.A'},
        {y:1540,label:'~2 950 ap.A'},
        {y:1560,label:'~3 000 ap.A'},
        {y:1660,label:'~3 800 ap.A'},
        {y:1720,label:'~4 200 ap.A'},
        {y:1780,label:'~4 600 ap.A'},
        {y:1837,label:'~4 800 ap.A'},
        {y:1898,label:'~5 200 ap.A'},
        {y:1960,label:'~5 800 ap.A'},
        {y:2010,label:'~6 200 ap.A'},
        {y:2060,label:'~6 600 ap.A'},
        {y:2110,label:'~7 050 ap.A'},
        {y:2160,label:'~7 200 ap.A'},
        {y:2210,label:'~7 400 ap.A'},
        {y:2252,label:'~7 500 ap.A'},
        {y:2310,label:'~7 800 ap.A'},
        {y:2360,label:'~8 100 ap.A'},
        {y:2410,label:'~8 400 ap.A'},
        {y:2455,label:'~8 800 ap.A'},
        {y:2490,label:'~9 000 ap.A'},
        {y:2520,label:'~9 100 ap.A'},
        {y:2540,label:'~9 200 ap.A'},
        {y:2560,label:'~9 500 ap.A'},
        {y:2620,label:'~9 600 ap.A'},
        {y:2680,label:'~9 700 ap.A'},
        {y:2740,label:'~9 800 ap.A'},
        {y:2800,label:'~9 850 ap.A'},
        {y:2868,label:'~9 900 ap.A'},
        {y:3056,label:'~10 142 ap.A'},
        {y:3100,label:'~10 200 ap.A'},
    ];

    /* =================================================================
       LIGNEES
       ================================================================= */
    const LIGNEES = {
        'ilthara':  {name:'Lign\u00E9e des Ombrils',     desc:'M\u00E9moire onirique, conqu\u00EAte et scission \u2014 des Songes aux nations d\'Ilthara'},
        'endora':   {name:'Lign\u00E9e des Syltharans',   desc:'Gr\u00E2ce arcane et cr\u00E9ation \u2014 du Saint-Empire aux royaumes sylvestres'},
        'galenor':  {name:'Lign\u00E9e des Ventori',      desc:'Vent, route et commerce \u2014 des Coureurs aux Quatre Couronnes'},
        'alkaran':  {name:'Lign\u00E9e des Petravins',    desc:'Pierre, forge et loi \u2014 des Enfants de la Roche au fer'},
        'celethor': {name:'Lign\u00E9e des N\u00E9bula\u00EFrs',    desc:'Pri\u00E8re, \u00E9toiles et savoir sacr\u00E9 \u2014 de Celith \u00E0 la lumi\u00E8re'},
        'cendara':  {name:'Lign\u00E9e des Kharavasts',   desc:'La flamme qui ne meurt pas \u2014 du feu primordial au C\u0153ur'},
        'onara':    {name:'Lign\u00E9e des Marevanes',    desc:'Routes maritimes et marchands \u2014 des flottes au Forgon'},
        'evertia':  {name:'Lign\u00E9e des Selvarins',    desc:'Communion avec la terre \u2014 continuit\u00E9 druidique et esprits-lieux'},
        'nysaria':  {name:"Lign\u00E9e des Vael'Somnix",  desc:'Le voile entre les mondes \u2014 r\u00EAves de Vytharia, masques de Nysaria'},
        'ind':      {name:'Lign\u00E9e des Panghoris',    desc:'Racines propres \u2014 nations auto-fond\u00E9es, ant\u00E9rieures aux empires'},
    };

    /* =================================================================
       EVENT TYPES
       ================================================================= */
    const TYPES = {
        fondation:   { c:'#8b6914', l:'Fondation' },
        conquete:    { c:'#b03030', l:'Guerre' },
        rebellion:   { c:'#c06010', l:'R\u00E9volte' },
        disparition: { c:'#706060', l:'Chute' },
        decouverte:  { c:'#2a7a5a', l:'D\u00E9couverte' },
        magie:       { c:'#7050a0', l:'Magie' },
        religion:    { c:'#9a8020', l:'Religion' },
        alliance:    { c:'#3a7a4a', l:'Alliance' },
        dynastie:    { c:'#b08020', l:'\u00C9poque' },
        exploration: { c:'#3080a0', l:'Exploration' },
        catastrophe: { c:'#8b0000', l:'Catastrophe' },
        commerce:    { c:'#4a8060', l:'Commerce' },
        traite:      { c:'#2060a0', l:'Trait\u00E9' },
        mystere:     { c:'#604080', l:'Myst\u00E8re' },
    };

    /* =================================================================
       GLOBAL EVENTS
       ================================================================= */
    const GLOBAL = [
        // ═══ Ères Primordiales ═══
        { y:40,  t:'magie',      era:'vide', title:'R\u00E9sonance Primordiale',
          desc:'Dans le Vide \u2014 la premi\u00E8re vibration du Substrat. Rien ne pr\u00E9c\u00E8de. Cause non rapport\u00E9e. La r\u00E9sonance produit, en cascade, les 5 \u00C9ternels.' },
        { y:65,  t:'magie',      era:'vide', title:'\u00C9mergence des 5 \u00C9ternels',
          desc:'Celestia (lumi\u00E8re, ordre), Noctis (ombre, profondeur), Tempora (temps, flux), Eldoria (mati\u00E8re, \u00E9toiles), Navigor (chemins, connexions) \u2014 \u00E9mergent en cascade depuis la R\u00E9sonance. Le Pacte Primordial est nou\u00E9 (termes inconnus).' },
        { y:95,  t:'magie',      era:'genese', title:'Naissance des 12 Cosmiques',
          desc:'4 phases canoniques (D-COSMO-4) : Phase 1 Aquor, Terranu, Aerion \u00B7 Phase 2 Climata, Gravitas, Vortex \u00B7 Phase 3 Judicar, Fatum, Spiritus \u00B7 Phase 4 Stellaris, Aetheron, Etherius. Enfants du monde, non cr\u00E9ateurs du monde.' },
        { y:125, t:'magie',      era:'genese', title:'Installation des 45 \u00C9th\u00E9r\u00E9s',
          desc:'Gelion (Cestra), Ignifex (Cendara), Venturis (Galenor), Coralis (Azoria)\u2026 Les \u00C9th\u00E9r\u00E9s sont les gardiens locaux des continents. Ils formeront la base de nombreuses religions.' },
        { y:148, t:'catastrophe',era:'genese', title:'Fracture du Panghor',
          desc:'Le supercontinent unique se divise en 3 phases sur ~10 000 ans, donnant naissance aux 12 continents actuels s\u00E9par\u00E9s par l\'Oc\u00E9an Primordial.' },
        // ═══ Éveil des Mortels ═══
        { y:162, t:'decouverte', era:'eveil', title:'Premiers mortels \u2014 5 Berceaux',
          desc:'Les premi\u00E8res formes de vie mortelle consciente apparaissent dans cinq zones simultan\u00E9ment : Flamme/Cendara, Pierre/Alkaran, Vent/Galenor, Brume/Celethor, Eau/Azoria.' },
        { y:178, t:'decouverte', era:'eveil', title:'Varak la Br\u00FBlante \u2014 1er nom historique', dl:2,
          desc:'~43 000 av.A \u2014 Premi\u00E8re personne nomm\u00E9e dans l\'Histoire. D\u00E9couvre que le m\u00E9tal r\u00E9pond \u00E0 la voix \u2014 pr\u00E9curseur de la forge et de la magie du son.' },
        { y:198, t:'exploration',era:'eveil', title:'5 Proto-empires \u00E9mergent',
          desc:'Ornakh-Vael, Moldra-Garak, Velkoran, Sylvarin, Thalorak. Les premi\u00E8res formes politiques organis\u00E9es apparaissent sur les 5 continents fondateurs.' },
        { y:238, t:'catastrophe',era:'eveil', title:'\u26A0 GRAND GEL \u2014 1\u00E8re quasi-extinction',
          desc:'~30 000 av.A \u2014 Climata, la Cosmique du Froid, provoque une glaciation mondiale. 80% de la population dispara\u00EEt. La quasi-totalit\u00E9 des proto-empires s\'effondre.' },
        { y:270, t:'catastrophe',era:'eveil', title:'Nadir du Gel \u2014 12 300 \u00E2mes survivantes', dl:2,
          desc:'~29 000 av.A \u2014 Point le plus bas de l\'histoire de l\'humanit\u00E9. 12 300 individus r\u00E9partis sur 12 continents. La reconstitution prendra 5 000 ans.' },
        { y:280, t:'decouverte', era:'eveil', title:'Reconstruction \u2014 premiers peuples hybrides', dl:2,
          desc:'~25 000 av.A \u2014 Les ponts de glace permettent les premi\u00E8res grandes migrations inter-continentales. Premi\u00E8res rencontres entre peuples diff\u00E9rents.' },
        // ═══ Âge du Lien ═══
        { y:312, t:'magie',      era:'lien', title:'Orvane, Khatun, Ildaran d\u00E9couvrent le Lien',
          desc:'~20 000 av.A \u2014 Trois individus sur trois continents diff\u00E9rents d\u00E9couvrent simultan\u00E9ment la magie du Lien \u2014 une \u00E9nergie cosmique qui relie toutes les choses vivantes.' },
        { y:350, t:'fondation',  era:'lien', title:'3 \u00C9coles du Lien fond\u00E9es', dl:2,
          desc:'Clairi\u00E8re des Fils (Celethor), Guilde du Souffle (Cendara), Congr\u00E9gation (Alkaran). Premi\u00E8res institutions de magie structur\u00E9e. Les praticiens sont appel\u00E9s Li\u00E9s.' },
        { y:412, t:'conquete',   era:'lien', title:'Guerre des Deux Lumi\u00E8res \u2014 40 ans', dl:2,
          desc:'Pyrevaste vs Celith. Premier grand conflit arm\u00E9 impliquant le Lien. Arbitr\u00E9e par la Conf\u00E9d\u00E9ration d\'Alkarath apr\u00E8s 40 ans de destruction.' },
        { y:435, t:'religion',   era:'lien', title:'Les 9 Grandes Religions',
          desc:'Ignis Aeternum, Vael\'Kurash, Rota Mundi, Noctari, Ordo Caelum, Via Ventus, Lex Petra, Somnium Vigil, Foedus Animae. Les grandes traditions spirituelles se formalisent.' },
        { y:480, t:'fondation',  era:'lien', title:'Code de Pierre \u2014 premier droit \u00E9crit', dl:2,
          desc:'Conf\u00E9d\u00E9ration d\'Alkarath. 400 articles fondant le droit commun entre nations. Restera la base juridique de r\u00E9f\u00E9rence jusqu\'\u00E0 l\'\u00C8re des Nations.' },
        { y:520, t:'religion',   era:'lien', title:'Schisme du Lien \u2014 200 ans de rupture', dl:2,
          desc:'Quatre empires s\'affrontent sur la d\u00E9finition officielle du Lien : est-il divin, naturel, ou un outil ? Le schisme laisse des cicatrices durables.' },
        { y:560, t:'alliance',   era:'lien', title:'Alliance Endara-Khalifat', dl:2,
          desc:'Mariage de Lyrana et Khar le Venteux. 50 ans de paix. Fondation de la Biblioth\u00E8que d\'Endara (40 000 rouleaux). Apog\u00E9e de la diplomatie m\u00E9di\u00E9vale.' },
        { y:600, t:'disparition',era:'lien', title:'Mort-de-R\u00EAve \u2014 chute d\'Ithalorn', dl:2,
          desc:'9 des 13 dirigeants d\'Ithalorn meurent dans un cauchemar partag\u00E9 en une seule nuit. La Vytharia onirique se s\u00E9pare d\u00E9finitivement. Origine inconnue.' },
        { y:618, t:'exploration',era:'lien', title:'6 Grands Empires dominent le monde', dl:2,
          desc:'~3 000 av.A \u2014 H\u00E9g\u00E9monie d\'Aethran, Dominat de Pyrion, Empire de Lithane, Sanctuaire d\'Orivane, Thalassocratie de Navoris, Union des Flammes. Ordre mondial stabilis\u00E9.' },
        { y:700, t:'decouverte', era:'lien', title:'\u00C2ge d\'Or \u2014 120M habitants, 7 cit\u00E9s volantes', dl:2,
          desc:'200+ portails actifs, 9 acad\u00E9mies du Lien, mortalit\u00E9 infantile \u00E0 12%, esp\u00E9rance de vie 65-90 ans. La civilisation n\'atteindra ce niveau qu\'apr\u00E8s 10 000 ans.' },
        // ═══ Graines de la Chute ═══
        { y:778, t:'religion',   era:'lien', title:'Verithan \u2014 Trait\u00E9 du Vide',
          desc:'~1 000 av.A \u2014 "Le Lien est une cha\u00EEne." Verithan publie ses 5 th\u00E8ses et fonde les Verithani. Premier mouvement anti-Lien organis\u00E9 de l\'histoire.' },
        { y:795, t:'magie',      era:'lien', title:"L'\u00C9tudiant rassemble le Cercle des Huit",
          desc:'~30 av.A \u2014 H\u00E9ritier intellectuel de Verithan. R\u00E9unit 8 disciples (Sera, Drakhan, Mirathis, Vorath, Aelindra, Thessan, Kayara, Iveth) de 5 nations diff\u00E9rentes au Mont Cendra.' },
        // ═══ L'Arrachement ═══
        { y:816, t:'catastrophe',era:'arrachement', title:'\u26A1 RUPTURE COSMIQUE \u2014 An 0',
          desc:'Selon le r\u00E9cit verithane, l\'\u00C9tudiant aurait sectionn\u00E9 son propre N\u0153ud de Lien au sommet du Mont Cendra \u00E0 l\'aube. Le d\u00E9chirement observable se propage en 7 heures \u00E0 travers tout Hyb\u00E9lior ; aucune lecture causale ne fait consensus.' },
        { y:830, t:'catastrophe',era:'arrachement', title:'7 cit\u00E9s volantes s\'\u00E9crasent en 7 heures', dl:2,
          desc:'Cendal\'Horun (800m de hauteur), Lithanel Haute (1200m), Pyranel, Althanar, Orivane Haute (1500m), Endral Flottant, Navoris C\u00E9leste. Des centaines de milliers de morts.' },
        { y:843, t:'disparition',era:'arrachement', title:'Navigor devient inatteignable',
          desc:'Les desservants de Transitum rapportent que l\'\u00C9ternel des passages cesse d\'\u00EAtre atteint. Les chemins entre dimensions paraissent se fermer ; les traditions divergent sur la cause et le statut r\u00E9el de Navigor.' },
        { y:855, t:'catastrophe',era:'arrachement', title:'Navoria engloutie \u2014 200 000 morts', dl:2,
          desc:'La Thalassocratie de Navoris. En ~40 minutes, la capitale c\u00F4ti\u00E8re s\'enfonce pendant les 7 heures de l\'Arrachement. 400 000 habitants. Les ruines sont aujourd\'hui \u00E0 40m de profondeur sous la mer.' },
        { y:868, t:'magie',      era:'arrachement', title:'Eldoria se fait silencieuse',
          desc:'Aucune naissance stellaire visible n\'est observ\u00E9e depuis. Ignis Aeternum parle de Grand Sommeil ; Ordo Caelum parle de retrait. Les lectures restent concurrentes.' },
        { y:892, t:'magie',      era:'arrachement', title:'Tempora para\u00EEt bless\u00E9 \u2014 Failles temporelles',
          desc:'Les traditions Rota Mundi lisent les discontinuit\u00E9s temporelles comme les cicatrices d\'une blessure de Tempora. D\'autres traditions y voient une signature naturelle ou une dissonance de la Polyphonie.' },
        { y:930, t:'catastrophe',era:'arrachement', title:'Famines et \u00E9pid\u00E9mies mondiales', dl:2,
          desc:'Ann\u00E9es 1 \u00E0 10. Premi\u00E8re \u00E9pid\u00E9mie : ~8M morts. Famines : ~20M morts. Sans le Lien, l\'agriculture magique s\'effondre. L\'infrastructure mondiale cesse de fonctionner.' },
        // ═══ Grande Nuit ═══
        { y:975, t:'disparition',era:'nuit', title:'La Grande Nuit \u2014 ~90M \u2192 ~60-70M',
          desc:'An 0-50. Famines, \u00E9pid\u00E9mies, effondrements d\'infrastructure, guerres tribales. La population passe d\'environ 90M apr\u00E8s l\'Arrachement \u00E0 ~60-70M durant la stabilisation longue.' },
        { y:1010,t:'fondation',  era:'nuit', title:'Seigneurs de Forge \u2014 premiers f\u00E9odaux', dl:2,
          desc:'Domaines de 5 000 \u00E0 20 000 personnes autour d\'une forge. Premiers codes de survie (~50 ap.A). La ma\u00EEtrise du m\u00E9tal remplace la magie comme fondement du pouvoir.' },
        { y:1050,t:'fondation',  era:'nuit', title:'Le Forgon \u2014 Pacte des Trois Ports', dl:2,
          desc:'Familles Forr, Gondal, Navar sur la c\u00F4te d\'Onara. Premi\u00E8re monnaie interr\u00E9gionale (~400 ap.A). Germe de ce qui deviendra Mosrack.' },
        { y:1089,t:'fondation',  era:'nuit', title:'Drahk fonde Drahk\'Nor', dl:2,
          desc:'40 ans de campagnes militaires. Unifie Ilthara et Endora (~800 ap.A). Possiblement lui-m\u00EAme Tiss\u00E9 \u2014 ce qui rendrait sa future pers\u00E9cution des Tiss\u00E9s d\'autant plus tragique.' },
        { y:1155,t:'conquete',   era:'nuit', title:'Grand Schisme Religieux',
          desc:'~1 000 ap.A \u2014 Trois camps : les Fid\u00E8les (les dieux dorment), les Abandonn\u00E9s (les dieux sont morts), les Accusateurs (les dieux ont trahi). Conflits sanglants.' },
        { y:1195,t:'catastrophe',era:'nuit', title:'\u26A0 FL\u00C9AU DES FAILLES \u2014 3\u00E8me quasi-extinction',
          desc:'~1 480 ap.A \u2014 Ph\u00E9nom\u00E8ne magique ciblant les Tiss\u00E9s via les Failles de Tempora. ~150 000 Tiss\u00E9s r\u00E9duits \u00E0 ~200-300 survivants en 200 ans. Population mondiale r\u00E9duite de 40%.' },
        { y:1345,t:'magie',      era:'nuit', title:'Pers\u00E9cution des Tiss\u00E9s', dl:2,
          desc:'~1 400-1 600 ap.A \u2014 Le Culte des Mangeurs de Temps et les Inspecteurs de Puret\u00E9 de Drahk\'Nor traquent les Tiss\u00E9s. \u00CAtre n\u00E9 sans Lien devient un crime.' },
        { y:1420,t:'conquete',   era:'nuit', title:'Tyrannie des Cendres \u2014 Drahk\'Nor', dl:2,
          desc:'~1 450-1 600 ap.A. P\u00E9riode la plus sombre de Drahk\'Nor. Euthanasie syst\u00E9matique des Tiss\u00E9s. Camps, registres, d\u00E9lations. P\u00E9riode dite la plus noire de l\'\u00E8re.' },
        { y:1540,t:'traite',     era:'nuit', title:'Convention de Gryndor', dl:2,
          desc:'~2 400 ap.A \u2014 Premier trait\u00E9 inter-empires depuis l\'Arrachement. Routes communes, arbitrage frontalier. Exclut d\u00E9lib\u00E9r\u00E9ment les Tiss\u00E9s renaissants \u2014 bombe \u00E0 retardement pour l\'\u00C8re des Nations.' },
        // ═══ Ère des Nations ═══
        { y:1600,t:'commerce',   era:'nations', title:'Routes commerciales continentales', dl:2,
          desc:'Route de l\'\u00C9pine (N-S), Route des Quatre Mers (maritime), Voie des Sommets (montagnarde). Premi\u00E8re infrastructure \u00E9conomique mondiale depuis l\'Arrachement.' },
        { y:1660,t:'commerce',   era:'nations', title:'Premi\u00E8res monnaies standardis\u00E9es', dl:2,
          desc:'Altram forge les premi\u00E8res pi\u00E8ces calibr\u00E9es (~4 200 ap.A). La standardisation mon\u00E9taire pr\u00E9figure l\'\u00E9talon de Lumasar.' },
        { y:1837,t:'conquete',   era:'nations', title:'\u2694 Guerre du Panghor Bris\u00E9',
          desc:'~4 800 ap.A \u2014 Drahk\'Nor s\'effondre apr\u00E8s 4 000 ans. Les Triumvirats de Khorrath et le Vo\u00EFvodat de Gryndhaar naissent de ses cendres en Ilthara. Les guildes marchandes d\'Endora obtiennent leur autonomie. (Drakora, Gryndor et Haldria n\'\u00E9mergeront que bien plus tard, de civilisations interm\u00E9diaires.)' },
        { y:1898,t:'conquete',   era:'nations', title:'\u2694 Guerre des Trois Couronnes',
          desc:'~5 200 ap.A \u2014 Galenthis s\'effondre. La Ligue \u00C9questre de Galenor et l\'H\u00E9g\u00E9monie de Solkethis \u00E9mergent de ses cendres. (Kharazir, Ventera, Seraphia et Lumasar ne se formeront que des si\u00E8cles plus tard.)' },
        { y:1975,t:'conquete',   era:'nations', title:'\u2694 Guerre des D\u00E9troits', dl:2,
          desc:'~5 700 ap.A \u2014 Mosrack vs coalition (Tyndara, Haldria, Caeloria). Premi\u00E8res lois maritimes internationales. Mosrack obtient des droits de passage mais pas la supr\u00E9matie.' },
        { y:2021,t:'conquete',   era:'nations', title:'\u2694 Guerre des Dieux Sourds', dl:2,
          desc:'~6 000 ap.A \u2014 Gryndor vs Drakora. Conflit entre le mod\u00E8le de gouvernance s\u00E9culier (Gryndor) et th\u00E9ocratique (Drakora). La guerre se termine sans vainqueur.' },
        { y:2098,t:'conquete',   era:'nations', title:'\u2694 Schismes d\'Endora', dl:2,
          desc:'~6 500 ap.A \u2014 Guerres religieuses internes \u00E0 Haldria. Avalor et Sanvara se s\u00E9parent. L\'Endora post-Arrachement finit de se fragmenter.' },
        { y:2160,t:'conquete',   era:'nations', title:'\u2694 Guerre des Cinq Vents', dl:2,
          desc:'~6 900 ap.A \u2014 Conflit entre les cinq puissances galenoriennes (Kharazir, Ventera, Seraphia, Lumasar, Solena). Aucun vainqueur. Trait\u00E9s de neutralisation.' },
        { y:2206,t:'conquete',   era:'nations', title:'\u2694 Guerre de l\'Ombre (ancienne)', dl:2,
          desc:'~7 200 ap.A \u2014 Schisme politique dans Gryndor. Naissance de Pyrtara, premier \u00C9tat s\u00E9culier revendiqu\u00E9. Les m\u00E9ritocraties militaires \u00E9mergent.' },
        { y:2252,t:'rebellion',  era:'nations', title:'R\u00E9volution des Plumes \u2014 Lumasar',
          desc:'~7 500 ap.A \u2014 Seule v\u00E9ritable r\u00E9volution r\u00E9publicaine d\'Hyb\u00E9lior. Le Code de Lumasar fonde les droits des citoyens. Lumasar devient la seule r\u00E9publique formelle.' },
        { y:2350,t:'commerce',   era:'nations', title:'\u00C9talon M\u00E9tallique de Lumasar', dl:2,
          desc:'~7 000 ap.A \u2014 40+ nations adoptent le standard mon\u00E9taire (l\'arkhen). Trois embl\u00E8mes : La Plume, le Marteau, la Forge. Int\u00E9gration \u00E9conomique mondiale.' },
        // ── Civilisations intermédiaires — fondations et chutes notables ──
        { y:1960,t:'fondation',  era:'nations', title:'Fondation du Drakhal (Empire des Cendres)', dl:2,
          desc:'~5 800 ap.A \u2014 L\'Empire des Cendres unifie le centre et le sud d\'Ilthara apr\u00E8s l\'effondrement du Vo\u00EFvodat de Gryndhaar. N\u00E9 sur les ruines des Triumvirats de Khorrath.' },
        { y:2010,t:'disparition',era:'nations', title:'Chute du Royaume de Varnath', dl:2,
          desc:'~6 200 ap.A \u2014 Le Royaume de Varnath s\'effondre en Alkaran apr\u00E8s une guerre civile dynastique d\u00E9vastatrice. D\u00E9bute l\'\u00C8re des Seigneurs de la Pierre.' },
        { y:2110,t:'catastrophe',era:'nations', title:'\u00C9ruption de Pyrathis \u2014 naissance des Cit\u00E9s du Sud', dl:2,
          desc:'~7 050 ap.A \u2014 L\'\u00E9ruption volcanique qui d\u00E9truit le Drakhal donne naissance aux Cit\u00E9s-\u00C9tats de Pyrathis. Le sud d\'Ilthara se fragmentera pendant deux si\u00E8cles avant de former l\'H\u00E9g\u00E9monie de Pyrannex.' },
        { y:2310,t:'disparition',era:'nations', title:'Concile de Veldros \u2014 chute de la Conf\u00E9d\u00E9ration Veldrane', dl:2,
          desc:'~7 800 ap.A \u2014 La Conf\u00E9d\u00E9ration Veldrane d\'Endora tient son dernier concile \u00E0 Veldros avant d\'\u00EAtre absorb\u00E9e. L\'Empire Kalvorn ach\u00E8ve son expansion sur tout Endora.' },
        { y:2455,t:'conquete',   era:'nations', title:'D\u00E9fense de la Porte de Fer \u2014 Protectorat des Passes',
          desc:'~8 800 ap.A \u2014 Le Protectorat des Passes (sous Aldren IV) repousse la coalition Drakora-Gryndor. Les fronti\u00E8res d\'Alkaran sont fix\u00E9es pour les si\u00E8cles suivants. Victoire d\u00E9cisive. (Altram ne sera fond\u00E9 qu\'en ~9 100, apr\u00E8s l\'Interr\u00E8gne des H\u00E9ritiers.)',
          dl:2 },
        { y:2455,t:'rebellion',  era:'nations', title:'R\u00E9volution des Surfaces \u2014 Cendara', dl:2,
          desc:'~8 900 ap.A \u2014 Les populations de surface de Cendara se soul\u00E8vent contre le Protectorat de la Main Noire qui gouvernait depuis les souterrains. Naissance de la Ligue des Villes Libres.' },
        { y:2490,t:'mystere',    era:'nations', title:'R\u00EAve Sans Convocation \u2014 Vytharia', dl:2,
          desc:'~9 100 ap.A \u2014 Un r\u00EAve collectif non invoqu\u00E9 traverse la Vytharia onirique en une seule nuit, abolissant la Conf\u00E9d\u00E9ration des R\u00EAves Nomm\u00E9s. Origine inconnue. La Conf\u00E9d\u00E9ration des R\u00EAves Nomm\u00E9s se dissout sans r\u00E9sistance.' },
        { y:2520,t:'fondation',  era:'nations', title:'Trois fondations simultan\u00E9es (~9 100)', dl:2,
          desc:'~9 100 ap.A \u2014 Altram (Trait\u00E9 de Vask), Kharazir (Cit\u00E9-\u00C9tat du Carrefour \u2192 f\u00E9d\u00E9ration), Drakora (Marches de Khorrath \u2192 Grand-Duch\u00E9) : trois nations \u00E9mergent en l\'espace d\'une g\u00E9n\u00E9ration, signalant la fin de l\'\u00E8re des civilisations interm\u00E9diaires.' },
        { y:2560,t:'disparition',era:'nations', title:'Dissolution de la Ligue \u00C9questre de Galenor', dl:2,
          desc:'~9 200 ap.A \u2014 La Ligue \u00C9questre se fragmente apr\u00E8s la s\u00E9cession des Cavaliers Libres. Ventera h\u00E9rite des plaines centrales et des traditions nomades ancestrales.' },
        // ═══ Ère Actuelle ═══
        { y:2570,t:'traite',     era:'actuel', title:'Conf\u00E9rences sans suite',
          desc:'~9 500 ap.A \u2014 plusieurs projets de cadre commun sont discut\u00E9s depuis Lumasar et Caeloria, mais aucun instrument supranational n\'aboutit. L\'\u00C8re actuelle s\'ouvre sur une diplomatie fragment\u00E9e.' },
        { y:2680,t:'decouverte', era:'actuel', title:'Presse \u00E0 caract\u00E8res mobiles \u2014 Lumasar', dl:2,
          desc:'~9 200 ap.A \u2014 Les livres deviennent accessibles au peuple. Bulletins quotidiens. D\u00E9mocratisation du savoir. R\u00E9volution culturelle silencieuse.' },
        { y:2753,t:'rebellion',  era:'actuel', title:'Catena Fracta \u2014 premiers rapports', dl:2,
          desc:'~9 750 ap.A \u2014 "Le Lien est une domination." H\u00E9ritiers radicaux de Verithan. Cellules clandestines dans 12 nations. Les assassinats commencent.' },
        { y:2830,t:'conquete',   era:'actuel', title:'Guerre de l\'Ombre \u2014 assassinats cibl\u00E9s', dl:2,
          desc:'~9 850+ ap.A \u2014 8 figures pro-Lien assassin\u00E9es. Aucune revendication. Les limites du Trait\u00E9 des Douze Continents sont test\u00E9es. Les enqu\u00EAtes n\'aboutissent pas.' },
        { y:2868,t:'mystere',    era:'actuel', title:'\u26A0 C\u0153ur de Cendra s\'acc\u00E9l\u00E8re',
          desc:'~9 900 ap.A \u2014 Les pulsations du C\u0153ur de Cendra s\'acc\u00E9l\u00E8rent : 1/saison \u2192 1/semaine. Les Li\u00E9s dans un rayon de 50 lieues re\u00E7oivent des visions. Les animaux fuient.' },
        { y:2940,t:'mystere',    era:'actuel', title:'Silence des Esprits d\'Evertia',
          desc:'200 des 300 esprits-lieux d\'Evertia cessent de communiquer. Le dernier message re\u00E7u (~10 130 ap.A) : "Ils arrivent par le dessous."' },
        { y:2995,t:'mystere',    era:'actuel', title:'Message de Mirathi \u2014 3 langues',
          desc:'~10 064 ap.A \u2014 Une sph\u00E8re de lumi\u00E8re appara\u00EEt simultan\u00E9ment \u00E0 Ulinor, Nysaria et Vytharia. M\u00EAme message en 3 langues superpos\u00E9es : "Les routes rouvrent\u2026 le guide revient par les marges."' },
        { y:3056,t:'catastrophe',era:'actuel', title:'\u26A0 Faille de Gryndor \u2014 Ordavan dispara\u00EEt',
          desc:'~10 142 ap.A \u2014 Le village d\'Ordavan (200 habitants) dispara\u00EEt en 3 minutes. Cercle de sol vitrifi\u00E9 de 40 m\u00E8tres de rayon. Faille de Tempora confirm\u00E9e. Aucun survivant.' },
    ];

    /* =================================================================
       CIVILISATIONS  (~130 entries — kept in original source order)
       ================================================================= */
    // NOTE: CIV data is loaded directly from the original frise.html source.
    // To avoid a 1000-line duplication here during initial extraction,
    // we use a deferred-load pattern: frise.html still defines CIV inline
    // and registers it here. Other pages can access it after frise has loaded,
    // or we can move CIV here fully in a follow-up.
    //
    // For now, CIV and CONN are set from frise.html via registerCivData().
    let CIV = [];
    let CONN = [];

    /* =================================================================
       UTILITY FUNCTIONS
       ================================================================= */

    function yToDate(y) {
        for (let i = 0; i < DATE_TICKS.length - 1; i++) {
            const a = DATE_TICKS[i], b = DATE_TICKS[i+1];
            if (y >= a.y && y <= b.y) {
                if (a.label === b.label) return a.label;
                return a.label + '\u2013' + b.label;
            }
        }
        if (y <= DATE_TICKS[0].y) return DATE_TICKS[0].label;
        return DATE_TICKS[DATE_TICKS.length-1].label;
    }

    function yToDateLabel(y) {
        for (let i = 0; i < DATE_TICKS.length - 1; i++) {
            const a = DATE_TICKS[i], b = DATE_TICKS[i+1];
            if (y <= a.y) return a.label;
            if (y >= a.y && y <= b.y) {
                if (a.y === y) return a.label;
                if (b.y === y) return b.label;
                return a.label;
            }
        }
        return DATE_TICKS[DATE_TICKS.length - 1].label;
    }

    function buildConnMap() {
        const map = {};
        CONN.forEach(conn => {
            const key = `${conn.from}|${conn.y}`;
            if (!map[key]) map[key] = [];
            map[key].push(`\u2192 ${conn.to} : ${conn.label}`);
        });
        return map;
    }

    function getEraCivsForRange(yMin, yMax) {
        return CIV.filter(c => c.y0 < yMax && c.y1 > yMin)
                   .sort((a, b) => {
                       const la = a.lignee || 'zzz', lb = b.lignee || 'zzz';
                       if (la < lb) return -1;
                       if (la > lb) return 1;
                       return a.y0 - b.y0;
                   });
    }

    /* =================================================================
       BRIDGE : Map year ↔ Frise y-coordinate
       ================================================================= */

    // Parse DATE_TICKS labels into numeric years for interpolation
    // "~45 000 av.A" -> -45000, "~3 000 ap.A" -> 3000, "An 0" -> 0, "∞" -> -999999
    const _parsedTicks = DATE_TICKS.map(tick => {
        let year;
        const label = tick.label.trim();
        if (label === '\u221E') {
            year = -999999;
        } else if (label === 'An 0') {
            year = 0;
        } else {
            // Extract number and direction
            const m = label.match(/~?([\d\s]+)\s*(av|ap)\.A/i);
            if (m) {
                const num = parseInt(m[1].replace(/\s/g, ''), 10);
                year = m[2].toLowerCase() === 'av' ? -num : num;
            } else {
                year = 0;
            }
        }
        return { y: tick.y, year };
    });

    function mapYearToFriseY(year) {
        // Clamp
        if (year <= _parsedTicks[0].year) return _parsedTicks[0].y;
        if (year >= _parsedTicks[_parsedTicks.length - 1].year) return _parsedTicks[_parsedTicks.length - 1].y;
        // Interpolate
        for (let i = 0; i < _parsedTicks.length - 1; i++) {
            const a = _parsedTicks[i], b = _parsedTicks[i + 1];
            if (year >= a.year && year <= b.year) {
                if (a.year === b.year) return a.y;
                const t = (year - a.year) / (b.year - a.year);
                return a.y + t * (b.y - a.y);
            }
        }
        return _parsedTicks[_parsedTicks.length - 1].y;
    }

    function friseYToMapYear(y) {
        if (y <= _parsedTicks[0].y) return _parsedTicks[0].year;
        if (y >= _parsedTicks[_parsedTicks.length - 1].y) return _parsedTicks[_parsedTicks.length - 1].year;
        for (let i = 0; i < _parsedTicks.length - 1; i++) {
            const a = _parsedTicks[i], b = _parsedTicks[i + 1];
            if (y >= a.y && y <= b.y) {
                if (a.y === b.y) return a.year;
                const t = (y - a.y) / (b.y - a.y);
                return a.year + t * (b.year - a.year);
            }
        }
        return _parsedTicks[_parsedTicks.length - 1].year;
    }

    /* =================================================================
       REGISTRATION (for CIV/CONN loaded from pages)
       ================================================================= */
    function registerCivData(civArray, connArray) {
        CIV = civArray;
        CONN = connArray;
    }

    /* =================================================================
       EXPORT
       ================================================================= */
    window.HYBELIOR_TIMELINE = {
        ERAS,
        DATE_TICKS,
        LIGNEES,
        TYPES,
        GLOBAL,
        get CIV() { return CIV; },
        get CONN() { return CONN; },
        yToDate,
        yToDateLabel,
        buildConnMap,
        getEraCivsForRange,
        mapYearToFriseY,
        friseYToMapYear,
        registerCivData,
    };

})();
