# Audit de cohérence carte / Atrium / jeu / livres — 12 octobre 2026

Demande Studio d97b48be3 (volet donnees-atrium-jeu). Lecture seule : aucune donnée modifiée. Scripts rejouables : `HybeliorWorldSite/scripts/audit/` (`node scripts/audit/run.js`, `node scripts/audit/rapport.js`, `python scripts/audit/cartes.py <dossier>`). Données complètes : `scripts/audit/audit_cas.json`.

## Règle de lecture (consigne de l'auteur)

La position affichée par la carte du site fait foi. Le site (`monde.html`, `js/monde.js`) place chaque lieu sur `data.coord_x/coord_y` de `kg-base.json` (overlay Turso vide) ; `position_estimee` n'est utilisée que par le calque des trajets, pas par les marqueurs. L'accueil (`js/map.js`) lit `coordinate_overrides` (écarts de 5-7 u connus, ignorés). Quand un continent, un `situe-dans` ou un texte contredit la position, ce sont le rattachement et le texte qui sont à corriger : les propositions vont toutes dans ce sens. Le point dans un polygone ne sert qu'à détecter ; les surfaces de pays (non validées) ne servent à rien ici, sauf une indication citée.

## Comptes par contrôle et par gravité

| Contrôle | Gravité 1 | Gravité 2 | Gravité 3 | Total |
|---|---|---|---|---|
| A1 lieu sur un autre continent que sa fiche | 0 | 0 | 0 | 0 |
| A2 lieu en mer hors port/île | 2 | 1 | 28 | 31 |
| A3 lieu dans un lac ou la mer intérieure | 0 | 0 | 0 | 0 |
| A4 lieu à plus de 20 km de toute terre | 0 | 0 | 1 | 1 |
| A5 lieu sans continent de fiche | 0 | 0 | 44 | 44 |
| B nation / villes | 0 | 21 | 73 | 94 |
| C1 texte : continent cité | 0 | 0 | 3 | 3 |
| C2 texte : point cardinal | 0 | 0 | 13 | 13 |
| C3 texte : tableau « Continent » | 0 | 0 | 0 | 0 |
| D1 lieux absents du gazetteer | 1 | 181 | 130 | 312 |
| D1b gazetteer périmé | 0 | 55 | 0 | 55 |
| D2 vides de peuplement | 0 | 2 | 0 | 2 |
| D3 réseau de routes 462 | 17 | 0 | 0 | 17 |

Le contrôle E (livres) ne compte pas de cas propres : chaque cas de gravité 1 et 2 porte ses ancres et ses chapitres (champ `livres`, listé plus bas).

## Les grands groupes (gravité 1)

| Groupe (fiche -> carte) | Lieux | Nations concernées | Preuves |
|---|---|---|---|

Nations dont la masse majoritaire de villes diffère de leur continent de fiche (B) :

| Nation | Fiche | Villes posées par masse | Surface de pays (indicatif, non validée) | Proposition |
|---|---|---|---|---|

Constat structurant : sur la carte, le nord d'Endora est occupé par Iskara (fiche Alkaran) et Thalmaris (fiche Evertia) ; les villes propres d'Endora sont au sud. Les intitulés de chapitre des Chroniques disent « Alkaran — Iskara, de Glintar aux mines de Myrilith » (C/8) et « Endora — Perivalis, Crestalis, Hekorinth » (C/13) : les livres suivent les fiches, pas la carte. Même schéma que Haldria (D47). Corriger dans le sens de la carte touche donc des chapitres de livre (voir E).

## A. Lieu et terre

| Gr | Ctrl | Continent (carte) | Id | Nom | Échelle | Position | Détail |
|---|---|---|---|---|---|---|---|
| 1 | A2 | Cendara | lie-0286 | Khoram | ville | -318, 213 (estimee) | 12.6 km de la côte de Cendara — **Proposition** : Vérifier le tracé de côte ou noter port/île dans la fiche ; la position est bonne. |
| 1 | A2 | Onara | lie-0877 | Starfall | bourg | 400.8, 179.3 (coord) | 14.6 km de la côte de Onara — **Proposition** : Vérifier le tracé de côte ou noter port/île dans la fiche ; la position est bonne. |
| 2 | A2 | Onara | lie-0808 | Zyloria | ville | 291.1, 163.8 (coord) | 5.8 km de la côte de Onara ; port/île dit |
| 3 | A2 | Alkaran | lie-0168 | Kelosar | bourg | 219.5, -183.6 (coord) | 0.9 km de la côte de Alkaran |
| 3 | A2 | Alkaran | lie-0676 | Xerathoris | ville | 230.4, -170.3 (coord) | 1.0 km de la côte de Alkaran |
| 3 | A2 | Alkaran | lie-0776 | Zyndrelis | bourg | 249.3, -173.1 (coord) | 0.5 km de la côte de Alkaran |
| 3 | A5 | Azoria | lie-0003 | Baelor | region | 70.4, 255.8 (coord) | posé sur île#41 (33 u², près de Azoria, 66 km) |
| 3 | A2 | Azoria | lie-0017 | Navoria (engloutie An 0) | cite | 262, 343 (estimee) | 2.7 km de la côte de Azoria |
| 3 | A5 | Azoria | lie-0040 | Tholmë | bourg | 68.9, 254.8 (estimee) | posé sur île#41 (33 u², près de Azoria, 66 km) |
| 3 | A2 | Azoria | lie-0181 | Duskoris | cite | 185.1, 329.6 (coord) | 2.0 km de la côte de Azoria |
| 3 | A2 | Azoria | lie-0183 | Vyntheris | bourg | 202.1, 326.4 (coord) | 0.6 km de la côte de Azoria |
| 3 | A2 | Azoria | lie-0224 | Tarnora | bourg | 297, 364.2 (coord) | 0.9 km de la côte de Azoria ; port/île dit |
| 3 | A2 | Azoria | lie-0228 | Zylarin | hameau | 68.1, 318.9 (coord) | 1.4 km de la côte de Azoria |
| 3 | A2 | Azoria | lie-0229 | Thylandor | bourg | 234.6, 334.2 (coord) | 0.9 km de la côte de Azoria |
| 3 | A2 | Azoria | lie-0238 | Thyldris | ville | 74, 257.6 (coord) | 0.8 km de la côte de Azoria ; port/île dit |
| 3 | A5 | Azoria | lie-1039 | La table des Cailloux (grève de Tholmë) | lieu | 68.1, 255.3 (estimee) | posé sur île#41 (33 u², près de Azoria, 66 km) |
| 3 | A2 | Azoria | lie-1042 | Le Sanctuaire de Navigor (Navoria) | lieu | 261.2, 342.3 (estimee) | 2.5 km de la côte de Azoria ; port/île dit |
| 3 | A2 | Azoria | lie-1043 | L'île de Corail (Navoria) | lieu | 262.8, 343.8 (estimee) | 2.8 km de la côte de Azoria |
| 3 | A2 | Azoria | lie-1044 | Corail-le-Haut | lieu | 264, 331 (estimee) | 12.4 km de la côte de Azoria |
| 3 | A2 | Azoria | lie-1045 | Sarn-du-Vent (archipel des Navories) | lieu | 287, 352 (estimee) | 3.3 km de la côte de Azoria ; port/île dit |
| 3 | A2 | Azoria | lie-1060 | Ce-qui-rend-le-ciel | lieu-dit | 67.3, 251.4 (coord) | 0.5 km de la côte de Azoria |
| 3 | A2 | Celethor | lie-0011 | Nysaria | region | 224.1, -385.6 (coord) | 9.5 km de la côte de Celethor ; port/île dit |
| 3 | A2 | Celethor | lie-0773 | Lysorn | ville | -46, -204.1 (coord) | 1.6 km de la côte de Celethor |
| 3 | A2 | Cendara | lie-0005 | Cendara | continent | -348.2, 290.7 (coord) | 7.6 km de la côte de Cendara ; port/île dit |
| 3 | A2 | Cendara | lie-0048 | Détroit de Suie | lieu-dit | -318.5, 222.5 (estimee) | 3.6 km de la côte de Cendara ; port/île dit |
| 3 | A2 | Cendara | lie-0272 | Mylarin | bourg | -373.8, 272.4 (coord) | 0.7 km de la côte de Cendara ; port/île dit |
| 3 | A5 | Cendara | lie-0982 | Les Basses-Ondes | bourg | -316, 290 (estimee) | posé sur Cendara |
| 3 | A5 | Cendara | lie-0983 | Le col des Genêts | lieu-dit | -313, 265 (estimee) | posé sur Cendara |
| 3 | A5 | Cendara | lie-0984 | La dernière forge du pied du Cendra | lieu-dit | -311.5, 258.5 (estimee) | posé sur Cendara |
| 3 | A5 | Cendara | lie-0989 | Cendre-Haute | hameau | -313, 272 (estimee) | posé sur Cendara |
| 3 | A4 | Cendara | lie-0990 | Le Fleuve-sous-la-Mer | lieu-dit | -425, 325 (estimee) | 52.1 km de la côte de Cendara |
| 3 | A5 | Cendara | lie-0993 | Les Chambres (Cendal'Horun) | lieu-dit | -321.6, 266.7 (estimee) | posé sur Cendara |
| 3 | A5 | Cendara | lie-0994 | La terrasse de Vanne (Vignes-Basses) | lieu-dit | -318.3, 265 (estimee) | posé sur Cendara |
| 3 | A5 | Cendara | lie-1058 | Le relais du Val-Rond | lieu | -322, 296 (estimee) | posé sur Cendara |
| 3 | A5 | Cendara | lie-1062 | Col des hautes terres de Sulvane (campement du Cercle) | lieu-dit | -327, 272 (estimee) | posé sur Cendara |
| 3 | A5 | Cendara | lie-1071 | Terre sans nom du sud-ouest | region | -380.7, 466.2 (coord) | posé sur île#8 (6013 u², près de Cendara, 65 km) |
| 3 | A2 | Cendara | pol-0037 | Arkhen | nation | -318, 213 (estimee) | 12.6 km de la côte de Cendara ; port/île dit |
| 3 | A2 | Cestra | lie-0298 | No Man's Land Cestra | region | -472.7, -398.4 (coord) | 16.3 km de la côte de Cestra ; port/île dit |
| 3 | A2 | Endora | lie-0796 | Fandor | ville | 266.1, 73.6 (coord) | 0.5 km de la côte de Endora |
| 3 | A2 | Endora | lie-0912 | Skaldoria | region | 167.3, -72.9 (coord) | 6.2 km de la côte de Endora |
| 3 | A2 | Endora | pol-0039 | Skaldoria | nation | 162.5, -70.4 (coord) | 3.6 km de la côte de Endora ; port/île dit |
| 3 | A2 | Evertia | lie-0991 | La passe du Corail-Mort | lieu-dit | -396, 186 (estimee) | 11.0 km de la côte de Evertia |
| 3 | A2 | Galenor | lie-0474 | Aquarith | bourg | -355, -151.1 (coord) | 2.8 km de la côte de Galenor ; port/île dit |
| 3 | A5 | Galenor | lie-0976 | Le passage de Vessine | lieu-dit | -298, -145 (estimee) | posé sur Galenor |
| 3 | A5 | Galenor | lie-0979 | Le relais des Trois Auges | lieu-dit | -303, -80 (estimee) | posé sur Galenor |
| 3 | A5 | Galenor | lie-0980 | Le relais de la Roue-Basse | lieu-dit | -302, -118 (estimee) | posé sur Galenor |
| 3 | A5 | Galenor | lie-0992 | Sarth | ville | -444, -53 (estimee) | posé sur Galenor |
| 3 | A5 | Galenor | lie-0996 | L'auberge des Voyageurs Lents | lieu-dit | -239.7, -120.1 (estimee) | posé sur Galenor |
| 3 | A5 | Galenor | lie-1053 | Roche-Longue | lieu | -300, -95 (estimee) | posé sur Galenor |
| 3 | A5 | Ilthara | lie-0015 | Drahk | cite | -143.5, 219.5 (estimee) | posé sur Ilthara |
| 3 | A5 | Ilthara | lie-0970 | Les Fonds | quartier | -143.5, 219.5 (estimee) | posé sur Ilthara |
| 3 | A5 | Ilthara | lie-0995 | L'auberge du Corbeau-Gris | lieu-dit | -288, 185 (estimee) | posé sur Ilthara |
| 3 | A5 | Ilthara | lie-1026 | Les cols du Veltrak | lieu | -168, 182 (estimee) | posé sur Ilthara |
| 3 | A5 | Ilthara | lie-1061 | Pyrion (ville du Dominat, Bureau des Concordances) | lieu-dit | -165, 97 (estimee) | posé sur Ilthara |
| 3 | A5 | Ilthara | lie-1063 | La marche haute (dernier relais avant le grand portail vers Galenor) | lieu-dit | -200, 60 (estimee) | posé sur Ilthara |
| 3 | A5 | Ilthara | lie-1066 | La grève du bras de Gryndor | lieu-dit | -208, 88 (estimee) | posé sur Ilthara |
| 3 | A5 | Ilthara | lie-1067 | La ferme prêtée aux marges de la Plaine | lieu-dit | -176, 88 (estimee) | posé sur Ilthara |
| 3 | A5 | Ilthara | pol-0051 | Dominat de Pyrion | nation | -164.5, 96.5 (estimee) | posé sur Ilthara |
| 3 | A2 | Onara | lie-0718 | Eryndoris | ville | 319.4, 164.7 (coord) | 2.7 km de la côte de Onara ; port/île dit |
| 3 | A5 | Onara | lie-0972 | Ostrevan | bourg | 320, 188 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-0974 | Mardanne | ville | 368, 160 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-0975 | Vireuil | ville | 385, 115 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-0977 | Le relais de Roshel | lieu-dit | 395, 75 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-0978 | Le moulin mort de Vèdre | lieu-dit | 285, 200 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-0981 | Corlhaven | ville | 430, 55 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1002 | Vannecize | bourg | 408, 22 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1003 | Mireuil | bourg | 350, 172 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1004 | Vellemont | bourg | 300, 190 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1005 | Tavelpast | ville | 380, 110 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1006 | Vronne | lieu-dit | 318, 188 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1008 | La Forge-Basse (quartier des marches d’Onara) | lieu-dit | 292, 200 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1051 | Roche-Fendue | lieu | 360, 60 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1055 | Le chemin des toucheurs de bêtes | lieu | 408, 85 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1064 | Le scriptorium d'Olven (marges d'Onara) | lieu-dit | 335, 180 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1065 | Le poste d'Inspection des confins d'Onara | lieu-dit | 360, 155 (estimee) | posé sur Onara |
| 3 | A5 | Onara | lie-1068 | Le bourg de Harn (bas de la vallée de la Forge-Basse) | lieu-dit | 296, 195 (estimee) | posé sur Onara |

## B. Nation et villes

| Gr | Id | Nom | Fiche | Répartition des villes | Catégorie | Détail |
|---|---|---|---|---|---|---|
| 2 | lie-0298 | No Man's Land Cestra | Cestra | {} | aucune ville positionnée | 3 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0003 | Ferrath | Endora | {} | aucune ville positionnée | 12 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0019 | Sanvara | Endora | {} | aucune ville positionnée | 30 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0027 | Elarath | Onara | {} | aucune ville positionnée | 8 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0028 | Azoral | Azoria | {} | aucune ville positionnée | 16 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0029 | Kethvar | Azoria | {} | aucune ville positionnée | 14 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0030 | Solmaris | Azoria | {} | aucune ville positionnée | 13 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0032 | Sylvara | Evertia | {} | aucune ville positionnée | 13 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0034 | Lunasar | Ilthara | {} | aucune ville positionnée | 5 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0035 | Mirathi | Ilthara | {} | aucune ville positionnée | 4 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0038 | Pyrevane | Cendara | {} | aucune ville positionnée | 12 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0041 | Dhalvoria | Ulinor | {} | aucune ville positionnée | 10 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0047 | Saint-Empire d'Endara | Endora | {} | aucune ville positionnée | 1 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0049 | Ligue Marchande d'Everthor | Evertia | {} | aucune ville positionnée | 1 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0050 | Hégémonie d'Aethran | Galenor | {} | aucune ville positionnée | 3 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0051 | Dominat de Pyrion | (aucun) | {} | aucune ville positionnée | 1 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0052 | Empire de Lithane | Alkaran | {} | aucune ville positionnée | 2 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0053 | Sanctuaire d'Orivane | (aucun) | {} | aucune ville positionnée | 2 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0054 | Thalassocratie de Navoris | (aucun) | {} | aucune ville positionnée | 4 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0058 | Drahk'Nor | (aucun) | {} | aucune ville positionnée | 1 lieux rattachés, aucun agglo avec coordonnées |
| 2 | pol-0039 | Skaldoria | Endora | {"Alkaran":1,"Endora":2} | dispersée sur plusieurs masses | Endora 2, Alkaran 1 — hors majoritaire : Skaldris (Alkaran) |

Organisations et conseils sans lieu rattaché (gravité 3) : Endrath ; Orvalis ; Halcyon ; Noravia ; Dominat de Pyrevaste ; Théocratie de Celith ; Confédération d'Alkarath ; Khalifat de Solvenar ; Royaume des Songes d'Ithalorn ; Union des Flammes ; Tharnok ; Forgon ; Galenthis ; Duché de Solenor ; Hégémonie de Solkethis ; Tyndareth ; Principauté de Caverana ; Cité-État du Carrefour ; Cavaliers de l'Ouest ; Marches de Khorrath ; Khaghanat de Gryndhaal ; Hégémonie de Pyrannex ; Confédération des Rêves Nommés ; Protectorat d'Oriven ; Fédération des Lisières ; Thalassocratie Azor-Kerev ; Protectorat d'Haldros ; Confédération Tacite du Sud ; Empire Kalvorn ; Protectorat des Passes ; Interrègne des Héritiers ; Ligue Yurrak ; Ligue des Villes Libres ; Principauté de Solvar ; Fédération de Morveth ; Concession de Thar-Sel ; Protectorat des Chenaux ; Syndicat des Profondeurs ; Conseil des Liés ; Le Cercle des Guérisseurs ; Cercle des Archidruides ; Le Cercle (Sylvara) ; Synarchie des Voiles ; Principautés de l'Éveil Interdit ; Empire Somnambule de Keth-Anur ; Oligarchie des Voiles ; Directoire Militaire ; Conseil des Forgerons-Juges ; Conseil des Quais ; Les Quarante ; Conseil des Neuf Guildes ; Guilde du Sel ; Guilde de la Solidarité Maritime ; Milice des Quais ; Guilde Maritime ; Conseil des Flammes ; Le Cercle des Masques ; Les Fils du Sol ; Royaume de Veshrim ; Conseil des Sept Feux ; Conseil des Cendres ; Assemblée des Quais ; Conseil de Maintien ; Les Anciens du Givre ; Conseil des Amiraux ; Fraternité des Mains Vides ; Ombres Souterraines ; La Préfecture des Cendres de Tavelpast ; La guilde des Grainiers ; La Flotte de la Constellation d’Argent ; Gardiens du Seuil ; La Chambre des Métiers (Cendral) ; Le corps des Vigiles.

## C. Textes contre coordonnées

| Gr | Ctrl | Id | Nom | Carte | Fiche | Texte dit | Extrait |
|---|---|---|---|---|---|---|---|
| 3 | C2 | lie-0880 | Yaltar | Alkaran | Alkaran | nord de Altram ; carte : est de Altram (24 km) | Région côtière du nord d’Altram, ouverte sur les eaux glaciales ; commerce maritime limité mais stratégique, et garnisons face aux drakkars skaldoriens. |
| 3 | C1 | lie-0902 | Ardentia | Alkaran | Alkaran | Onara | Cœur volcanique de Myrtam, bâti sur un réseau de failles actives qui alimentent ses forges ; sol instable, séismes fréquents, températures de forge les plus hautes d’Onara. |
| 3 | C1 | pol-0026 | Myrtam | Alkaran | Alkaran | Onara | Aujourd'hui, Myrtam est le plus grand producteur de métaux rares d'Alkaran, et le premier fournisseur des marchés d'Onara. |
| 3 | C1 | pol-0039 | Skaldoria | Endora | Endora | Alkaran | Confédération clanique des îles à fjords du large de la côte nord d’Endora, jusqu’aux abords d’Alkaran : sept clans autonomes que seul le Ralthyn réunit face à une invasion ; son Cercle des Jarls décide à l’unanimité, donc rarement. |
| 3 | C2 | pol-0116 | Evertia | Evertia | Evertia | nord-est de Endora ; carte : ouest de Endora (609 km) | Nations habitées     2 (Evertia au centre, Sylvara à l'ouest) ; au sud-ouest, la cité-État cantorienne de Cëpias, fille de Thalmaris (nord-est d'Endora) |
| 3 | C2 | pol-0116 | Evertia | Evertia | Evertia | nord-est de Endora ; carte : ouest de Endora (609 km) | Le 12 octobre 2026 (D49), la carte faisant foi, Thalmaris est rendue au nord-est d'Endora, où sont ses dix-sept villes ; sa présence en Evertia est celle de Cëpias, cité-fille du Cantus. |
| 3 | C2 | lie-0065 | Montagnes de Voldenor | Galenor | Galenor | ouest de Galenor ; carte : sud de Galenor (13 km) | Massifs anciens de l'ouest de Galenor, où s'accrochent des citadelles bâties par les premiers habitants pour canaliser la puissance de volcans endormis, dont l'art est aujourd'hui perdu. |
| 3 | C2 | lie-0394 | Lagosaim | Galenor | Galenor | nord-ouest de Seraphia ; carte : nord-est de Seraphia (12 km) | Région côtière nord-ouest de Seraphia, villages d'artistes et de pêcheurs. |
| 3 | C2 | lie-0443 | Ondalith | Galenor | Galenor | ouest de Dromolia ; carte : nord de Dromolia (35 km) | Village de la lisière ouest de Dromolia où l'on communique, à cause de la brume, par un langage de cloches et de carillons. |
| 3 | C2 | lie-0546 | Brynthor | Galenor | Galenor | nord de Galenor ; carte : sud-est de Galenor (116 km) | Les entités géantes de bois et de pierre qui veillaient sur les forêts du nord de Galenor étaient des histoires pour enfants, des fables que les anciens de Brynthor racontaient pour justifier leurs superstitions. |
| 3 | C2 | lie-0937 | Cystara | Ilthara | Ilthara | nord de Vytharia ; carte : sud-ouest de Vytharia (16 km) | Région montagneuse du nord de Vytharia, la plus sombre : illusions inquiétantes, zone la plus active des Noctari. |
| 3 | C2 | lie-0940 | Sylvaris | Ilthara | Ilthara | sud de Drakora ; carte : nord-est de Drakora (17 km) | Vallées boisées du sud de Drakora, région la plus tempérée et la plus peuplée ; ses arbres noircissent sans jamais brûler. |
| 3 | C2 | lie-0885 | Valdran | Onara | Onara | ouest de Mosrack ; carte : nord-est de Mosrack (75 km) | Hauts plateaux de l’ouest de Mosrack, terrain d’essai des nouvelles machines de guerre ; zone militaire interdite aux civils. |
| 3 | C2 | lie-0964 | Nosford | Onara | Onara | sud de Mosrack ; carte : ouest de Mosrack (36 km) | Région minière du sud de Mosrack, fer et charbon des forges du pays ; ses mines de Reldarck, parmi les plus profondes, ont mis au jour des ossements gigantesques. |
| 3 | C2 | lie-0922 | Korrinor | Ulinor | Ulinor | est de Ulinor ; carte : sud de Ulinor (9 km) | Montagnes escarpées de l’est d’Ulinor, dont la roche veinée de cristaux résonne au vent — le « Chant des Montagnes » ; ses mines de cristaux s’exploitent par rituel strict. |
| 3 | C2 | lie-0923 | Elarion | Ulinor | Ulinor | nord-est de Ulinor ; carte : sud-est de Ulinor (24 km) | Côte nord-est d’Ulinor, criques et mangroves des navigateurs de l’archipel ; elle abrite les récifs chantants, dont les sons sous-marins s’entendent depuis la surface. |

## D1. Lieux de l'Atrium absents du gazetteer de jeu

| Gr | Id | Nom | Échelle | Fiche | Pourquoi |
|---|---|---|---|---|---|
| 1 | lie-0969 | Velmaris (Seraphia) | bourg | Galenor | position présente mais non exportée — agglomération (bourg) absente du jeu ; parent positionné : Seraphia |
| 2 | lie-0014 | Lithanel | cite | Alkaran | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Altram |
| 2 | lie-0016 | Orivanel | cite | Celethor | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Astravia |
| 2 | lie-0047 | Cendra | cite | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Cendara |
| 2 | lie-0069 | Caëspia | ville | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Evertia |
| 2 | lie-0083 | Caelum Prima | cite | Celethor | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Astravia |
| 2 | lie-0084 | Frostheim | bourg | Celethor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Elarian |
| 2 | lie-0085 | Brynda-le-Refus | hameau | Celethor | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-0087 | Caeloria-Mineure | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Caeloria |
| 2 | lie-0088 | Caeloria-Forte | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Caeloria |
| 2 | lie-0089 | Endora-Mineure | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Endora |
| 2 | lie-0091 | Kytheris-Mineure | ville | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0111 | Halfras | ville | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Onara |
| 2 | lie-0154 | Olkanor | cite | Alkaran | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Torkam |
| 2 | lie-0169 | Vythoris | cite | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0170 | Goren-Bas | ville | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0171 | Ulthral | ville | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0172 | Selvaris | ville | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0174 | Selthar | ville | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0175 | Caverne-Mère | hameau | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0176 | Tombarn | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0177 | Mara-Vieille | hameau | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0178 | Vorn-Trel | ville | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0179 | Sourd-Sour | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Ferrath |
| 2 | lie-0187 | Korval | cite | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu |
| 2 | lie-0188 | Velkar | ville | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0189 | Brisivar | ville | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0190 | Hjorvik | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0191 | Sterevor | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0192 | Skraal | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0193 | Tamarvik | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0194 | Eltrassa | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0195 | Norvalt | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0196 | Vorgrad | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0197 | Falskvar | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0198 | Brisborg | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0199 | Hjormvik | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0200 | Eldjar | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0201 | Kethdar | cite | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu |
| 2 | lie-0202 | Vraskvar | ville | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0203 | Skarvar | ville | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0204 | Kethmar | ville | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0205 | Tresk | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0206 | Volgvar | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0207 | Korven | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0208 | Drask | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0209 | Ethvar | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0210 | Hjorgvik | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0211 | Verstrum | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0212 | Astralis | cite | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0213 | Solnir | ville | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0215 | Krasvar | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0216 | Velkmis-Refuge | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0217 | Astralis-Bas | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0218 | Krasmar | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0219 | Solnir-Vyk | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0220 | Velmaris-Haut | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0221 | Astralis-Marin | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0222 | Solnir-Brume | bourg | Azoria | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Solmaris |
| 2 | lie-0239 | Velkadra | bourg | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Baelor |
| 2 | lie-0240 | Sarun | bourg | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Baelor |
| 2 | lie-0241 | Olfra | bourg | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Baelor |
| 2 | lie-0274 | Pyrevane-Mère | cite | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu |
| 2 | lie-0275 | Vorrask | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0276 | Vesthrim | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0277 | Caldethor | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0278 | Verre-Fondu | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0279 | Ashenor | bourg | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0280 | Cinderhold | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0281 | Suie-Haute | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0282 | Vethros | bourg | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0284 | Tessarin | hameau | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-0285 | Kerthos | bourg | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0287 | Cendrelis | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Arkhen |
| 2 | lie-0288 | Aïmar | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Arkhen |
| 2 | lie-0289 | Vorsalt | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Arkhen |
| 2 | lie-0290 | Khalath | ville | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Arkhen |
| 2 | lie-0291 | Tess-Volange | bourg | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Arkhen |
| 2 | lie-0292 | Karthos-le-Bas | bourg | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Arkhen |
| 2 | lie-0293 | Stephar | hameau | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu ; parent positionné : Arkhen |
| 2 | lie-0294 | Caldegris | hameau | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu ; parent positionné : Arkhen |
| 2 | lie-0295 | Suie-Basse | bourg | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Arkhen |
| 2 | lie-0296 | Karendis | bourg | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0303 | Galorin | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Haldria |
| 2 | lie-0304 | Andivar | cite | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0305 | Khessit | cite | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0306 | Soltarin | cite | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0307 | Murahal | cite | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0308 | Yaderis | cite | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0309 | Ket-Anvel | cite | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0310 | Tarvanis | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0311 | Amerith | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0312 | Skerren | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0313 | Voldra | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0314 | Hesran | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0315 | Olarin | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0316 | Kerset | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0317 | Brassa | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0318 | Idrenval | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0319 | Yamoth | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0320 | Vassir | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0321 | Tholdir | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0322 | Anker | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0323 | Olythes | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0324 | Maranth | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0325 | Korvendis | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0326 | Tabren | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0327 | Welaris | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0328 | Aphradan | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0329 | Senthar | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0330 | Mordrhin | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Sanvara |
| 2 | lie-0336 | Racinéal | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0337 | Créciel | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0338 | Orévandis | ville | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0339 | Sélyandris | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0340 | Ondévaris | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0341 | Verdantis | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0342 | Ventsylve | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0343 | Lithécrine | ville | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu |
| 2 | lie-0344 | Sombreval | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0345 | Selvacour | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0346 | Coralvine | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0347 | Brumalith | bourg | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0348 | Pyracine | hameau | Cendara | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-0382 | Vorenhal | hameau | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-0383 | Caraline | hameau | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-0384 | Belindre | hameau | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-0385 | Aerith | hameau | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu ; parent positionné : Evertia |
| 2 | lie-0387 | Vellinor | hameau | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-0388 | Solinhal | hameau | Evertia | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-0511 | Nyralith | ville | Galenor | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Ventera |
| 2 | lie-0521 | Felmarith | bourg | Galenor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Ventera |
| 2 | lie-0585 | Thyrath | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Warenthor |
| 2 | lie-0586 | Verdrath | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Warenthor |
| 2 | lie-0587 | Canavel | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Warenthor |
| 2 | lie-0588 | Sorothar | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Warenthor |
| 2 | lie-0589 | Ryvalorn | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Warenthor |
| 2 | lie-0591 | Tholmë-en-haut | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Mirathi |
| 2 | lie-0592 | Vrenith | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Mirathi |
| 2 | lie-0593 | Échelle-de-Vrenith | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Mirathi |
| 2 | lie-0594 | Sondaris | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0595 | Velhar | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0597 | Mirhand-Bourg | bourg | Ilthara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0598 | Frostmar | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Mosrack |
| 2 | lie-0599 | Kelthor | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Mosrack |
| 2 | lie-0600 | Thrymar | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Mosrack |
| 2 | lie-0601 | Vorneth | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Mosrack |
| 2 | lie-0602 | Dyrnathor | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Mosrack |
| 2 | lie-0603 | Myrklor | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Mosrack |
| 2 | lie-0604 | Velmara | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0605 | Ostrabis | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0606 | Pélandre | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0611 | Comptoir de Drelmais | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Tyndara |
| 2 | lie-0612 | Vornaeth | bourg | Onara | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Tyndara |
| 2 | lie-0617 | Jentaris | cite | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu |
| 2 | lie-0619 | Brennvar | ville | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Skaldoria |
| 2 | lie-0620 | Hjelmgar | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Skaldoria |
| 2 | lie-0621 | Faelmar | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Skaldoria |
| 2 | lie-0622 | Drakkengarde | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Skaldoria |
| 2 | lie-0623 | Aaslund | bourg | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu ; parent positionné : Skaldoria |
| 2 | lie-0624 | Kaltvik | hameau | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu ; parent positionné : Skaldoria |
| 2 | lie-0625 | Dhalvora | bourg | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0626 | Yltharkenn | bourg | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0627 | Kerwhelm | bourg | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0628 | Velkharra | bourg | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0629 | Yltarkhen | bourg | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0630 | Brundherna | bourg | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0631 | Esselrenn | bourg | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0632 | Khairsenn | hameau | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-0633 | Drentvar | bourg | Ulinor | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0644 | Lithanel Haute | cite | Alkaran | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu |
| 2 | lie-0645 | Pyranel | cite | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu ; parent positionné : Dominat de Pyrion |
| 2 | lie-0646 | Althanar | cite | Galenor | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu |
| 2 | lie-0648 | Navoris Céleste | cite | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu |
| 2 | lie-0649 | Endral Flotant | cite | Endora | ni coord_x/y ni position_estimee dans la fiche — agglomération (cite) absente du jeu |
| 2 | lie-0997 | Sève-Basse | bourg | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0998 | Vieille-Anse | bourg | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-0999 | Rives-Sourdes | bourg | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-1000 | Vaumielle | bourg | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-1001 | Fenoy | hameau | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (hameau) absente du jeu |
| 2 | lie-1007 | Herrec | bourg | (aucun) | ni coord_x/y ni position_estimee dans la fiche — agglomération (bourg) absente du jeu |
| 2 | lie-1073 | Kryndor (Kryostra) | ville | Celethor | ni coord_x/y ni position_estimee dans la fiche — agglomération (ville) absente du jeu ; parent positionné : Elarian |

Gravité 3 (130) : lieux-dits, régions, ruines, lieux sans échelle, non positionnés, hors critère « agglomération » : Clairière des Fils (lie-0021) ; Forêts de Selvara (lie-0022) ; Cavernes de Vytharia (lie-0023) ; Tour Sans Lumière (lie-0024) ; Crypte des Astres Tournés (lie-0025) ; Tours d'Astravia (lie-0026) ; Archives de l'Ordo Caelum (lie-0027) ; Tours-Cadran d'Othen-Cael (lie-0028) ; Cercle des Saisons d'Evertia (lie-0029) ; Calendrier Cyclique de Sylthara (lie-0030) ; Anneau de Pierre de Pyrtara (lie-0031) ; Tours du Vent de Solena (lie-0032) ; Falaises de Tyndara (lie-0033) ; Mât-Sacré de Lythar (lie-0034) ; Crypte d'Inéa (lie-0035) ; Académie Onirique de Lumasar (lie-0036) ; Champs de Lune Glas (lie-0037) ; Forêt des Ombres-Marchantes (lie-0038) ; Citadelle des Marqués (lie-0039) ; Conservatoire intérieur de Nysaria (lie-0041) ; Observatoire de Caeloria (lie-0042) ; Trinoria (lie-0043) ; Valoria (lie-0044) ; Mont Saurthen (lie-0051) ; Ilnara (lie-0052) ; Temple des Flammes Éternelles (lie-0053) ; Les Terres Brisées (lie-0054) ; Montagnes de Thalendil (lie-0055) ; Lac des Rêves (lie-0056) ; Marécages de Noyrath (lie-0057) ; Massif des Cendres Rouges (lie-0058) ; Pics des Vents Hurlants (lie-0059) ; Grand Canyon de l'Écho (lie-0061) ; Nylor (lie-0062) ; Serenth (lie-0063) ; Valmera (lie-0066) ; Esperia (lie-0067) ; Cités des Sables (lie-0068) ; Lithéa (lie-0070) ; Sanctuaire de la Première Enclume (lie-0071) ; Skraalia (lie-0073) ; Korvaria (lie-0074) ; Solniria (lie-0075) ; Kethmaria (lie-0076) ; Kethdaria (lie-0077) ; Col du Veilleur (lie-0078) ; Récif de Mira (lie-0079) ; Salle du Silence (lie-0081) ; Salle Scellée (lie-0082) ; La Caldera Grise (lie-0086) ; Kytheris (lie-0090) ; Cabinet d'Archive (lie-0092) ; Grande Bibliothèque de Hekorinth (lie-0093) ; Observatoire Royal (Hekorinth) (lie-0094) ; Phare de Galorin (lie-0095) ; Le Trône Vide (lie-0096) ; Le Sylvain Primordial (lie-0097) ; Le Grand Orme de Ralorin (lie-0098) ; La bibliothèque de Vyndarin (lie-0099) ; Palais du Chant (lie-0100) ; Académie d'Ostarith (lie-0101) ; Terres Muettes (lie-0102) ; Château de la Cascade (lie-0103) ; Grand Verger Impérial (lie-0104) ; Lac des Miroirs (lie-0105) ; Le Grand Racineal (lie-0106) ; La Grande Forge (lie-0108) ; Hôtel des Guildes (lie-0109) ; Pointes Noires (lie-0110) ; Îles du Cordon (lie-0112) ; Grand Fjord (lie-0113) ; Place des Stèles (lie-0114) ; Cairn collectif d'Aaslund (lie-0115) ; Cités des Anciens (lie-0180) ; Velkmis (lie-0223) ; La Grande Île (lie-0243) ; Aïkhar (lie-0244) ; Archipel des Tessons (lie-0245) ; Glacier Central (lie-0299) ; Massif de Givre (lie-0300) ; Sanctuaires Enfouis (lie-0301) ; La Paroi (lie-0302) ; Vaelcendia (lie-0331) ; Orvandis (lie-0332) ; Brumalis (lie-0333) ; Selvandor (lie-0334) ; Le Cœur (lie-0376) ; Lisière du Nord (lie-0377) ; Ruelles Vertes (lie-0378) ; Marge Thalmarienne (lie-0379) ; Hauteurs de Vorenhal (lie-0380) ; Marvet (lie-0386) ; Bosquet Primordial (lie-0583) ; Hauts-Estuaires (lie-0596) ; Hameau du Sirdal (lie-0607) ; Hameau de Korven (lie-0608) ; Hameau des Pointes Salées (lie-0609) ; Hameau de Tarsell (lie-0610) ; Sanctuaire de l'Écho (lie-0618) ; Les Forêts de Nysaria (lie-0653) ; Les Côtes de Celethor (lie-0655) ; Le Mont-Gris (lie-0656) ; Les coffres des vieux fonds de Drahk'Nor (lie-0971) ; La Porte de l'Aval (lie-0973) ; La Table de Baelor (lie-0985) ; La Chambre de l'Arbre-Mère (lie-0986) ; La Source Haute (lie-0987) ; La Maison de la Cendre (lie-0988) ; Le Prisme et la Plume (lie-1012) ; La taverne des Trois Vents (lie-1013) ; Yrath-qui-plie (lie-1015) ; Lassith (lie-1016) ; Velros (lie-1018) ; Le Charbonnier (lie-1020) ; Le Second Observatoire (Hekorinth) (lie-1024) ; L’auberge du Souffleur (lie-1025) ; Le Nid Royal (lie-1028) ; Mareth (lie-1029) ; Rynel-haut (lie-1030) ; auberge des Voiles (lie-1035) ; Plaines de Mirondal (lie-1036) ; Le jardin du Vieux Cloître (Cendal'Horun) (lie-1038) ; La mer des Azories (lie-1040) ; Vellombre (lie-1041) ; Sanavir (lie-1046) ; Rukhan (lie-1047) ; Rives-Claires (lie-1048) ; Basse-Vaugue (lie-1052) ; La Porte des Fondeurs (Astravia) (lie-1054) ; Hybélior (lie-1059).

Statistiques D : ```{"D1_par_echelle":{"cite":22,"lieu-dit":69,"region":36,"ville":29,"bourg":115,"hameau":16,"ruine":3,"(aucune)":21,"monde":1},"D1_total":312,"D2_km2_vide_par_masse":{"Celethor":860.9515999999999,"Onara":4085.8719999999994,"Azoria":569.1035999999999,"Cestra":10871.338,"Cendara":5486.742399999999},"D2_km2_terre_par_masse":{"Galenor":35109,"Celethor":32731,"Ilthara":26558,"Onara":20123,"Endora":19977,"Azoria":14563,"Cestra":10871,"Alkaran":10448,"Cendara":8128,"Evertia":2218,"Ulinor":1795},"D3":{"agglo_sur_masse_Ilthara":90,"dans_reseau":73,"composantes":1}}```

## D1b, D2 et D3. Gazetteer périmé, vides de peuplement, routes 462

| Gr | Ctrl | Id | Nom | Détail |
|---|---|---|---|---|
| 1 | D3 | lie-0660 | Hekorinth | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0679 | Raldir | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0685 | Thyrin | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0686 | Uldarin | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0687 | Kandorin | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0688 | Feldris | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0689 | Ravindor | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0827 | Talrin | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0850 | Ylloris | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0851 | Tyrolis | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0852 | Myrdan | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0853 | Galdrion | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0854 | Zaldrin | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0855 | Sylthros | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0856 | Sylradis | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0857 | Valdren | sur la masse Ilthara, absente du réseau de routes 462 |
| 1 | D3 | lie-0858 | Fyndor | sur la masse Ilthara, absente du réseau de routes 462 |
| 2 | D1b | lie-0072 | Porte de Fer (défilé d’Iskara) | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0116 | Glintaris | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0117 | Valyria | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0118 | Myrilith | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0119 | Kalvorn | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0120 | Zyndaris | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0121 | Feldoris | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0122 | Lusharis | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0123 | Valryn | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0124 | Galdar | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0125 | Mytharis | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0126 | Zarathor | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0127 | Falron | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0128 | Helionis | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0129 | Galornis | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0130 | Kaeloria | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0131 | Taldaris | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0132 | Zelrith | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0133 | Galathor | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0134 | Morvalis | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0135 | Ysolith | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0136 | Zyndrel | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0173 | Volnir | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0349 | Azuralis | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0350 | Zylar | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0351 | Nalmir | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0352 | Ostaris | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0353 | Rylthos | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0355 | Ostarith | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0356 | Galdaris | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0357 | Azuralith | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0358 | Valornis | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0359 | Galrinor | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0360 | Zylarith | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0361 | Nalmiris | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0362 | Myrdoris | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0363 | Elarinor | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0364 | Velrith | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0365 | Faloria | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0366 | Rylthoris | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0367 | Thaloria | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0368 | Galdaroth | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0369 | Zyldoris | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0370 | Nythoria | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0371 | Valorin | continent gazetteer Evertia ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0693-port | marine de Nectoria | dans le gazetteer, absent de l'Atrium |
| 2 | D1b | lie-0782 | Skaldris | continent gazetteer Ulinor ≠ fiche actuelle Alkaran/Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0783 | Sylthor | continent gazetteer Ulinor ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0784 | Vyndar | continent gazetteer Ulinor ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0912 | Skaldoria | continent gazetteer Ulinor ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0913 | Lushara | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0914 | Helionar | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0915 | Ysolia | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-0916 | Glintar | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D1b | lie-1019 | Verthal | continent gazetteer Alkaran ≠ fiche actuelle Endora (gazetteer périmé ?) |
| 2 | D2 | - | vide Cendara @(-381, 466) | 5487 km² sans agglomération à moins de 35 km (point le plus isolé : 198 km), sur Cendara |
| 2 | D2 | - | vide Cestra @(-432, -458) | 10871 km² sans agglomération à moins de 35 km (point le plus isolé : 283 km), sur Cestra |

## E. Livres : ancres et chapitres touchant les cas de gravité 1 et 2

`node scripts/verifier-raccord.js --detail` : 1 820 citations ancrées, 1 809 exactes, 11 introuvables ; aucune des 11 ne touche un cas de cet audit. Ancres = `data.preuve/source/recit_uid` de la fiche et de ses faits ; chapitres = chapitres des livres qui nomment le lieu (recherche de nom, homonymes possibles).

| Id | Nom | Contrôle | Ancres | Chapitres nommant | Phrase spatiale |
|---|---|---|---|---|---|
| pol-0003 | Ferrath | B |  | C/8, C/9 | C/8 : Le lendemain, j’ai franchi la passe nord-est vers les hauts plateaux que les gens d’ici appellent Ferrath. |
| pol-0019 | Sanvara | B |  | C/12, C/13 | C/12 : lieux: [Endora, Sarandel, Forêt de Sanvara] |
| pol-0030 | Solmaris | B |  | C/33 |  |
| pol-0032 | Sylvara | B | C/25 | C/24, C/25, C/26, T3/7, T3/16 | C/24 : Je restai encore quatre jours à Thalenvir, à attendre la marée de Sylvara. |
| pol-0034 | Lunasar | B | C/28 | C/28, C/29, C/31, C/37 | C/28 : Restait à le comparer à ce que Lunasar conservait de plus ancien. |
| pol-0035 | Mirathi | B |  | C/20, C/27, C/28, C/30, C/34, C/35, C/37 | C/27 : **Ilthara — Vytharia, de Nectoria à Mirathi — Jour 660** |
| pol-0038 | Pyrevane | B | T3/27, T3/35, T3/48 | C/22, T1/8, T1/52, T3/27, T3/35, T3/40 | C/22 : Les envoyés de Pyrevane disent qu’il faut renforcer les digues de lave au nord. |
| pol-0049 | Ligue Marchande d'Everthor | B |  | T1/21 |  |
| pol-0051 | Dominat de Pyrion | B |  | T1/8, T1/9, T1/19, T1/52 | T1/8 : lieu: Dominat de Pyrion / Celethor |
| pol-0054 | Thalassocratie de Navoris | B |  | T1/25, T1/33, T1/49 | T1/25 : lieu: Navoria (Thalassocratie de Navoris, Azoria) |
| pol-0058 | Drahk'Nor | B |  | T2/8, T2/30, T2/31, T3/3 |  |
| lie-0660 | Hekorinth | D3 |  | C/13, C/21 | C/13 : **Endora — Perivalis, Crestalis, Hekorinth — jours 276 à 300** |

## Hypothèse inverse : le nom des masses est-il juste ?

Vérifié le 12 octobre. Les 11 marqueurs de continents (`coord_x/y` des fiches de continents, ceux dont `monde.js` tire les étiquettes de la carte) tombent tous dans la masse de `monde-contours.json` qui porte le même nom (Cendara et Ilthara : marqueur en mer, à quelques unités, repère de nom). Les masses sont donc bien nommées. Les 54 villes d'Altram, Torkam et Myrtam sont sur la masse Alkaran, celles d'Avalor sur Endora. Les surfaces de pays extraites de la carte peinte (non validées, simple indice) placent aussi Iskara (x 106 à 204, y -46 à 37) et Thalmaris (x 206 à 322, y -10 à 56) sur la masse Endora : l'image de l'auteur les dessine là, ce n'est pas un artefact du calcul. Deux continents ne partagent pas une masse : Alkaran (11 617 u²) est une masse distincte, au nord, qui contient déjà Altram, Torkam et Myrtam. Conclusion : erreur de rattachement des fiches (ou de leur continent écrit), pas de nommage des masses. Réserve : la taille d'Alkaran (11 617 u²) est inférieure à la surface peinte d'Altram seul (21 185 u², unités du pays non comparables à celles des masses) ; seule l'auteur peut dire si Iskara est « d'Alkaran » par la culture et « sur Endora » par la géographie.

## Limites de la méthode

- Les côtes sont validées, les surfaces de pays non : aucun rattachement n'en est tiré. Les îles sans nom dans `monde-contours.json` sont rattachées au continent le plus proche (indication).
- Une position `estimee` (non affichée sur la carte) pèse un cran de moins ; les nations sans marqueur sont jugées sur le barycentre de leurs villes posées.
- Le continent « de la fiche » vient de `data.continent` et de la remontée `situe-dans` / `capitale-de` (8 niveaux) ; un rattachement multiple n'est pas signalé s'il contient la masse de la carte.
- C est lexical : mentions « d'<Continent> » après un nom de fonction, mentions de continent dans le résumé, tableau « Continent » du corps, « au nord/sud/est/ouest de <lieu connu> » (écart de plus de 100 degrés). Les corps de fiche ne sont lus que pour les phrases qui nomment l'entité. Des faux positifs existent (échanges entre continents) ; des contradictions non lexicales échappent.
- Les centres de continents et de nations sont des barycentres, pas des frontières.
- D2 : grille de 4 u, rayon 35 km autour d'une agglomération positionnée ; D3 ne juge que la masse Ilthara (le réseau 462 ne couvre qu'elle).
- E : recherche par nom (homonymes, noms courts exclus) ; les citations ancrées ne sont pas comparées une à une aux cas.
