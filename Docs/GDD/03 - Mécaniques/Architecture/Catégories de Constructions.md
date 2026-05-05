---
tags: [architecture, catégories, taxonomie, mécanique]
type: mechanic
status: drafted
last_review: 2026-05-01
needs_review_for: [arbitrage-mobilier-vs-items, arbitrage-stations-vs-items, validation-10-catégories]
---

# 🗂 Catégories de Constructions — 10 grandes familles

> Toute construction d'Hybelior se classe en **10 catégories** canoniques. Cette taxonomie est la première couche du système Architecture : tout archétype de construction appartient à exactement UNE catégorie principale (avec possibilité de tag secondaire pour les cas hybrides — taverne+auberge, forge+atelier).
>
> Les **catégories** définissent le rôle gameplay et la fonction sociale ; les [[Échelles et Niveaux|niveaux d'opulence]] (1-6) sont **transversaux** à toutes les catégories.

---

## Les 10 catégories

| # | Catégorie | Définition courte | Échelle dominante |
|---|-----------|-------------------|-------------------|
| 1 | **Habitations** | Lieux de vie privés (du sans-abri à la cour royale) | Personnel → Élite |
| 2 | **Lieux de production** | Ateliers et stations productives des métiers d'artisanat | Économique |
| 3 | **Lieux sociaux** | Rassemblement public, commerce, divertissement | Communautaire |
| 4 | **Lieux religieux** | Pratique spirituelle des 9 religions + cultes locaux | Sacré |
| 5 | **Lieux de savoir** | Érudition, archives, transmission des connaissances | Intellectuel |
| 6 | **Fortifications** | Défense militaire, contrôle territorial | Stratégique |
| 7 | **Infrastructure urbaine** | Aménagements collectifs civiques | Civique |
| 8 | **Infrastructure rurale** | Production agricole et élevage | Subsistance |
| 9 | **Mobilier et aménagement** | À l'intérieur des bâtiments (frontière à arbitrer — voir D-ARCHITECTURE-03) | Intérieur |
| 10 | **Constructions cosmiques** | Lieux uniques liés au cosmique, traces, monuments signature | Mythique |

---

## 1. Habitations

> Lieux de vie privés. Du sans-abri à la cour royale. **L'échelle module entièrement** : niveau 1 = hutte rurale, niveau 5 = palais.

| Aspect | Détail |
|--------|--------|
| **Description** | Hébergement privé, propriété individuelle ou familiale. Peut héberger 1 à plusieurs dizaines d'occupants selon niveau. |
| **Exemples typiques** | Abri de fortune · Hutte · Maisonnette · Maison de ville · Manoir · Demeure noble · Palais |
| **Échelles d'opulence couvertes** | 1-6 (toutes) |
| **Métiers principaux** | [[Métiers#Architecte\|Architecte]], Charpentier *(D-ARCHITECTURE-02)*, [[Métiers#Menuisier\|Menuisier]], Maçon *(D-ARCHITECTURE-02)*, Couvreur *(D-ARCHITECTURE-02)* |
| **Matériaux typiques** | Bois, [[Brique]], [[Pierre]], [[Planche]], [[Tissu]] (tentures), [[Plaque de verre]] (niveaux ≥3) |
| **Particularités** | Peuvent héberger un ou plusieurs **Foyers** (Igniculus, Éthéré du foyer — voir [[Cosmologie]]). Module économique [[Économie]] : achat / location / héritage. |

---

## 2. Lieux de production

> Ateliers de métiers d'artisanat. Une **construction-atelier** héberge ses **stations de craft** (forge, métier à tisser, alambic — voir [[Crafts]] §Stations) et son artisan/PNJ.

| Aspect | Détail |
|--------|--------|
| **Description** | Lieu où un métier d'artisanat est exercé, abritant ses stations dédiées. Le bâtiment est l'enveloppe ; les stations sont les outils intégrés (D-ARCHITECTURE-04). |
| **Exemples typiques** | Forge · Atelier de tisserand · Tannerie · Échoppe d'apothicaire · Boulangerie · Brasserie · Atelier de menuiserie · Bijouterie · Verrerie · Scriptorium · Moulin (à eau / à vent) |
| **Échelles d'opulence couvertes** | 1-5 (le 6 est exceptionnel — atelier-cathédrale d'un Maître absolu) |
| **Métiers principaux pour la *construire*** | Architecte, Maçon, Charpentier (charpente lourde si four), Forgeron architectural (D-ARCHITECTURE-02 : variant spécialisé du Forgeron pour pièces de structure métalliques) |
| **Métier qui *l'occupe*** | Le métier productif (Forgeron, Tisserand, Apothicaire…) — voir [[Crafts]] |
| **Matériaux typiques** | Pierre + Brique réfractaire (forges, fours), Planche + Bois ouvragé (ateliers bois), Cuivre/Bronze (alambics) |
| **Particularités** | **Frontière à arbitrer** : le bâtiment-atelier est Architecture ; les **outils portables** (marteau de forge, mortier, plume) restent en [[Items]] §Outils. La station fixe (forge complète, four à pain, métier à tisser monumental) est en Architecture. |

> Cf. [[AccessExport/TypeLieu.csv]] §Catégorie 8 *(Artisanal)* : Mine · Carrière · Forge · Fonderie · Scierie · Tannerie · Filature · Boulangerie · Brasserie · Atelier d'alchimie · Atelier de calligraphie · Marché · Banque · Ferme · Verger · Moulin à vent · Moulin à eau · Écurie · Élevage · Serre. **Confirme la pertinence des catégories 2 et 8 du présent système.**

---

## 3. Lieux sociaux

> Rassemblement public. Commerce, divertissement, hospitalité. Cœur de la vie communautaire et de la rencontre PNJ/joueurs.

| Aspect | Détail |
|--------|--------|
| **Description** | Espaces de socialisation et de transit. Souvent ouverts au public, parfois payants ou réservés à une faction. |
| **Exemples typiques** | Taverne · Auberge · Place publique · Marché couvert · Halle · Théâtre · Arène · Bains publics · Hôtel des ventes · Échoppe de marchand · Maison de jeu |
| **Échelles d'opulence couvertes** | 2-5 (le niveau 1 *Modeste* est marginal — un appentis-buvette ; le 6 est exceptionnel — théâtre impérial d'Evertia) |
| **Métiers principaux pour la *construire*** | Architecte, Maçon, Charpentier, Sculpteur (ornement) |
| **Métier qui *l'occupe*** | [[Métiers#Tavernier\|Tavernier]], [[Métiers#Aubergiste\|Aubergiste]], [[Métiers#Marchand\|Marchand]], Acteur, Musicien, Banquier |
| **Matériaux typiques** | Bois + Pierre (tavernes), Pierre noble + Marbre (théâtres haut tier), Tissu (tentures, scènes) |
| **Particularités** | Souvent **lieu d'événements émergents** (rencontres PNJ, quêtes, rumeurs, Bourse des Augures). L'échelle module la qualité du buff de repos ([[Métiers#Aubergiste\|Aubergiste]] : régénération Labeur accélérée). |

---

## 4. Lieux religieux

> Pratique spirituelle des 9 religions canoniques + cultes locaux (5 mineures + cultes ancestraux). Voir [[Cosmologie]] §Religions.

| Aspect | Détail |
|--------|--------|
| **Description** | Édifice consacré au culte d'une ou plusieurs entités cosmiques. Peut être public (temple, cathédrale) ou caché (sanctuaire, reliquaire). |
| **Exemples typiques** | Sanctuaire (niveau 1-2) · Chapelle · Temple · Basilique · Cathédrale (niveau 5) · Reliquaire · Crypte · Cercle druidique · Monastère · Oratoire de pèlerin |
| **Échelles d'opulence couvertes** | 1-6 (le 6 est réservé aux édifices liés à un Cosmique ou Éternel — Temple des Flammes Éternelles de Cendara, Cathédrale Engloutie d'Iskara) |
| **Métiers principaux** | Architecte, Maçon, Sculpteur (statues d'entités), Verrier (vitraux), Enchanteur (rituels d'inauguration), Prêtre (consécration) |
| **Matériaux typiques** | Pierre noble (Marbre), Plaque de verre teintée (vitraux), Bois précieux (autels), Métal précieux (ornements), Cristal (cathédrales du Lien) |
| **Particularités** | Chaque religion a sa **signature architecturale** (D-ARCHITECTURE-07). Variants par culture — un temple de [[Lex Petra]] à Altram diffère d'un temple de [[Lex Petra]] à Lumasar. Lien direct avec [[Métiers#Prêtre\|Prêtre]] et [[Prédiction]] §Maîtrise_Foi. |

---

## 5. Lieux de savoir

> Érudition et archives. Transmission de connaissances. Souvent liés aux sièges Éthérés *Legatus, Lingua, Luxa* ([[Cosmologie]] §Sièges Éthérés).

| Aspect | Détail |
|--------|--------|
| **Description** | Lieu de conservation, d'étude et de transmission du savoir. |
| **Exemples typiques** | Bibliothèque · Scriptorium · Observatoire astronomique · École · Académie · Université · Salle de cartes · Salle de prédiction · Cabinet de curiosités |
| **Échelles d'opulence couvertes** | 2-6 (rares en niveau 1 — un scriptorium minimal ; les Académies de Lumasar atteignent 5-6) |
| **Métiers principaux** | Architecte, Maçon, Menuisier (étagères, pupitres), Verrier (lentilles d'observatoire), Vitrier (D-ARCHITECTURE-02) |
| **Métier qui *l'occupe*** | [[Métiers#Bibliothécaire\|Bibliothécaire]], [[Métiers#Astronome\|Astronome]], [[Métiers#Scribe\|Scribe]], [[Métiers#Cartographe\|Cartographe]], [[Métiers#Historien\|Historien]], [[Métiers#Enseignant\|Enseignant]] |
| **Matériaux typiques** | Bois ouvragé + Bois précieux (étagères, pupitres), Pierre fine, Plaque de verre (lentilles, fenêtres), Pigment (cartes), Parchemin (contenu) |
| **Particularités** | **Cibles d'archéologie privilégiées** ([[Traces des Ères]] §Architecturales — Tours d'Astravia alignées sur constellations disparues). |

---

## 6. Fortifications

> Défense militaire et contrôle territorial. Couvre les structures **purement défensives**, les **structures mixtes habitation+défense** (château) et les **éléments défensifs urbains** (murs, portes).

| Aspect | Détail |
|--------|--------|
| **Description** | Structures conçues pour résister à un siège ou contrôler un point stratégique. Échelle majeure du gameplay [[Guildes]] §Sièges. |
| **Exemples typiques** | Tour de guet · Avant-poste · Bastion · Mur d'enceinte · Porte fortifiée · Caserne · Fort · Citadelle · Forteresse · Donjon (au sens médiéval : tour-maîtresse) · Châtelet |
| **Échelles d'opulence couvertes** | 2-6 (niveau 1 marginal — palissade de bois ; niveau 6 : Citadelle Volante mythique d'Aerion) |
| **Métiers principaux** | Architecte (chef de chantier militaire), Maçon (murs porteurs), Tailleur de pierre, Forgeron architectural (herses, ponts-levis), Charpentier (échafaudages, machines de siège) |
| **Métier qui *l'occupe*** | [[Métiers#Soldat\|Soldat]], [[Métiers#Garde\|Garde]], [[Métiers#Chevalier\|Chevalier]] |
| **Matériaux typiques** | Pierre simple + Pierre taillée (murs), Brique réfractaire (intérieur), Métal (herses, charnières, machines), Bois lourd (charpentes, machines de siège) |
| **Particularités** | **Pivot fort** vers [[Guildes]] §Construction & développement (D-ARCHITECTURE-05). Les forts/forteresses de guilde sont des archétypes d'Architecture instanciés selon le niveau de guilde. Cibles privilégiées des [[Guildes]] §Sièges. |

> Cf. [[AccessExport/TypeLieu.csv]] §Catégorie 2 *(Militaire)* : Forteresse · Château · Bastion · Avant-poste · Rempart · Camp militaire · Prison · Tour de guet. **Liste à intégrer en Phase 2.**

---

## 7. Infrastructure urbaine

> Aménagements collectifs civiques. Ce qui rend une ville **vivable et belle** au-delà des bâtiments individuels.

| Aspect | Détail |
|--------|--------|
| **Description** | Éléments de la voirie, du réseau et du paysage urbain. Souvent gérés par la municipalité ou la guilde occupante. |
| **Exemples typiques** | Pont · Route pavée · Fontaine · Aqueduc · Égouts · Lampadaire · Banc public · Statue commémorative · Place pavée · Quai · Phare · Horloge publique |
| **Échelles d'opulence couvertes** | 1-5 (le niveau 6 est rare — Pont des Astres, Phare de Solena enchanté) |
| **Métiers principaux** | Architecte, Maçon (ponts, aqueducs), Tailleur de pierre, Sculpteur (statues), Verrier (lampadaires haut tier), Forgeron architectural (charpentes métalliques de pont) |
| **Matériaux typiques** | Pierre simple + Pierre taillée (ponts, routes), Métal (lampadaires, horloges), Plaque de verre (phares, lampes) |
| **Particularités** | **Module la perception de richesse d'une ville** — une ville niveau 4 a des routes pavées et des fontaines ; une ville niveau 1 a des sentiers de terre. Lien direct avec [[Économie]] et la grille [[AccessExport/TailleVille.csv]]. |

---

## 8. Infrastructure rurale

> Production agricole et élevage. **Distincte des Lieux de production** (artisanat) car elle exploite la **terre vivante**.

| Aspect | Détail |
|--------|--------|
| **Description** | Constructions liées à l'agriculture, l'élevage, et la transformation primaire végétale/animale. |
| **Exemples typiques** | Grange · Étable · Écurie · Bergerie · Poulailler · Verger (clos planté) · Champ cultivé · Vigne · Rucher · Serre · Moulin (à eau / à vent) · Pressoir · Cellier |
| **Échelles d'opulence couvertes** | 1-4 (le niveau 5 est rare — domaine viticole impérial d'Evertia) |
| **Métiers principaux pour la *construire*** | Architecte, Charpentier, Couvreur (chaume), Maçon (cellier en pierre) |
| **Métier qui *l'occupe*** | [[Métiers#Agriculteur\|Agriculteur]], [[Métiers#Berger\|Berger]], [[Métiers#Apiculteur\|Apiculteur]], [[Métiers#Éleveur de créature\|Éleveur de créature]], [[Métiers#Meunier\|Meunier]] |
| **Matériaux typiques** | Bois + Chaume (granges, étables), Pierre simple (celliers, fondations), Argile / Torchis (constructions populaires) |
| **Particularités** | **Pivot vers [[Sources de Ressources]]** — c'est ici que sont récoltés/produits les intrants alimentaires (Céréale, Miel, Œuf, Laine creature, Lait). Le Verger et le Champ cultivé sont à mi-chemin entre construction et zone de récolte (à arbitrer Phase 2). |

> Cf. [[AccessExport/TypeLieu.csv]] §Catégorie 8 (mélange Artisanal+Rural) : Ferme · Verger · Moulin à vent · Moulin à eau · Écurie · Élevage · Serre. **Question à arbitrer (D-ARCHITECTURE-09)** : la catégorie 8 du CSV mélange artisanal et rural — recommander un split en Phase 2.

---

## 9. Mobilier et aménagement

> ⚠️ **Frontière à arbitrer (D-ARCHITECTURE-03)** : le mobilier appartient-il à Architecture (sous-catégorie "ce qui est *à l'intérieur* d'une construction") ou à [[Items]] §Équipement utilitaire (objet possédé par le joueur, déplaçable) ?
>
> **Recommandation initiale** : Architecture pour le mobilier **fixe / lié au lieu** (foyer, four à pain intégré, lit-cabane, étagère murale), [[Items]] pour le mobilier **portable / personnel** (tabouret, coffre de voyage, malle, escabeau). Critère pratique : *« peut-on le ranger dans un sac à dos ? »* → Items. *« Est-il scellé/encombrant ? »* → Architecture.

| Aspect | Détail |
|--------|--------|
| **Description** | Éléments d'aménagement intérieur des bâtiments. Module la fonctionnalité (lit = repos, foyer = cuisine domestique) et l'opulence perçue. |
| **Exemples typiques (fixes — Architecture)** | Foyer · Cheminée · Four à pain (domestique) · Lit-cabane · Lit à baldaquin · Étagère murale · Pupitre fixe · Bibliothèque encastrée · Bain (cuve scellée) · Forge domestique miniature · Autel domestique · Coffre encastré |
| **Exemples typiques (portables — [[Items]])** | Tabouret · Chaise simple · Petite table · Coffre de voyage · Malle · Escabeau · Paravent · Lit pliant |
| **Échelles d'opulence couvertes** | 1-6 (le mobilier suit l'échelle de la construction qui l'héberge) |
| **Métiers principaux** | [[Métiers#Menuisier\|Menuisier]] (l'essentiel), Sculpteur (ornements), Tisserand (tentures, baldaquins), Forgeron (ferronnerie, serrures), Tapissier *(à proposer ?)* |
| **Matériaux typiques** | Bois + Bois ouvragé (l'essentiel), Tissu (tentures, sièges), Pierre (foyers, bains), Métal (charnières, serrures), Cuir tanné (sièges haut tier) |
| **Particularités** | Une **construction se livre nue ou meublée** ; le mobilier (au sens Architecture) est inclus dans le coût d'achat. Le joueur peut ajouter du mobilier portable (Items) par-dessus. |

---

## 10. Constructions cosmiques

> Lieux uniques liés au cosmique. Sortent du cadre marchand standard. Souvent **uniques-monde**, **traces permanentes** (voir [[Traces des Ères]]).

| Aspect | Détail |
|--------|--------|
| **Description** | Constructions exceptionnelles soit liées à un Éternel/Cosmique, soit générées par un Souffle Cardinal, soit signature joueur reconnue par le monde. **Hors barème de prix standard.** |
| **Exemples typiques (lore canonique)** | Porte de Voyage de [[Cosmologie\|Navigor]] (disparues) · Brèche du Néant · Cratère du Cardinal · Monument signature joueur · Citadelle Volante d'Aerion · Cathédrale Engloutie d'Iskara · Tours d'Astravia · Anneau de Pierre de Pyrtara · Falaises Chantantes de Baelor · Phare des Astres |
| **Exemples typiques (générés)** | Statue commémorative d'un boss vaincu · Forteresse "du Souffle de [date]" baptisée par tenue de siège · Monument inscrit dans toutes les Parties suivantes |
| **Échelles d'opulence couvertes** | 6 *(Cosmique, voir [[Échelles et Niveaux]])* exclusivement |
| **Métiers principaux** | Architecte (Maître), Sculpteur (Maître), Enchanteur (consécration), parfois plusieurs métiers en collaboration rituelle. **Conditions cachées 🔒** souvent requises. |
| **Matériaux typiques** | Matériaux exotiques uniquement : Bliysium (légendaire de Myrtam), Acier Éternel, Spuelium, Cristaux cosmiques, Filaments du Vide, Pierres-cicatrices, Sève d'Argent, Bois pétrifié — voir [[Matériaux de Construction]] §Niveau 6 |
| **Particularités** | Souvent **non-marchandes** (D-ARCHITECTURE-06) : se gagnent par condition cachée, accomplissement d'ère, ou Trace permanente. Sont des **POIs explorables** ([[Traces des Ères]] §1 Géologiques + §2 Architecturales). |

---

## Échelle d'urbanisme typique par catégorie

> Croise les 10 catégories avec les 5 paliers d'urbanisme ([[Échelles et Niveaux]] §Échelles d'urbanisme, source [[AccessExport/TailleVille.csv]]). Indique pour chaque catégorie l'**échelle d'urbanisme minimum** où elle apparaît typiquement, et l'**échelle maximum** où elle s'épanouit. Ce n'est pas une contrainte dure — un mécène peut faire bâtir une cathédrale à un hameau — mais c'est le **mode statistique** attendu pour la génération procédurale et le peuplement des localités.

| # | Catégorie | Échelle min | Échelle max | Notes |
|---|-----------|-------------|-------------|-------|
| 1 | **Habitations** | Maison isolée | Grande Ville | Toutes échelles ; l'opulence varie du taudis au palais. |
| 2 | **Lieux de production** | Hameau (atelier rural, forge de carrefour) | Grande Ville (manufactures impériales) | Le niveau 1 *Modeste* peut apparaître en Maison isolée (forge personnelle d'ermite-forgeron) mais c'est marginal. |
| 3 | **Lieux sociaux** | Village (taverne, place, auberge modeste) | Grande Ville (théâtre impérial, halle marchande) | Le niveau 1 *Modeste* (buvette de bord de route) existe en Hameau ou même Maison isolée (relais), mais la fonction sociale véritable commence au Village. |
| 4 | **Lieux religieux** | Hameau (sanctuaire, oratoire de carrefour) | Grande Ville (cathédrale capitale) | Niveau 1 (pierre dressée consacrée, niche votive) possible en Maison isolée. |
| 5 | **Lieux de savoir** | Village (école, scriptorium minimal) | Grande Ville (académie, université, observatoire majeur) | Rares en Hameau sauf cas signature (ermitage d'astronome). |
| 6 | **Fortifications** | Ville (remparts, garde permanente) | Grande Ville (citadelle, forteresse capitale) | Tour de guet isolée possible hors urbanisme civil (sur route, frontière) — relève alors de l'infrastructure militaire pure. |
| 7 | **Infrastructure urbaine** | Village (place pavée, fontaine, pont communal) | Grande Ville (aqueduc, égouts, phare, horloge) | La présence et qualité de l'infrastructure urbaine **est l'indicateur direct de l'échelle d'urbanisme** (Village = sentiers + 1 fontaine ; Grande Ville = pavage + aqueduc + lampadaires). |
| 8 | **Infrastructure rurale** | Maison isolée | Village (au-delà l'agriculture est péri-urbaine, hors enceinte) | Présente jusqu'en Grande Ville en péri-urbain (vergers attenants, pressoirs collectifs), mais le **cœur** de la catégorie reste Maison isolée → Village. |
| 9 | **Mobilier et aménagement** | Maison isolée | Grande Ville | Suit l'échelle de la construction qui l'héberge ; pas de seuil propre. |
| 10 | **Constructions cosmiques** | Variable (peut être totalement isolée) | Variable (souvent dans/près d'une Grande Ville) | Les Cratères du Cardinal, Brèches du Néant, Anneau de Pierre de Pyrtara peuvent apparaître en pleine campagne (donc Maison isolée par défaut sur l'échelle d'urbanisme) ; Caëspia est attachée à une Grande Ville signature. **Hors barème standard.** |

> Croisement avec densité PNJ : voir [[Concepts Fondamentaux IA PNJ#9. Population — spawn, density, lifecycle|Concepts Fondamentaux IA PNJ §9 Population]] qui chiffre le nombre de PNJ persistants/transients par échelle d'urbanisme.

---

## Cas hybrides à arbitrer (Phase 2)

| Cas | Tension | Recommandation initiale |
|-----|---------|--------------------------|
| **Auberge** | Habitation (chambres) + Social (taverne au rez) ? | Tag principal = Social, secondaire = Habitation. Une auberge **héberge des PNJ/joueurs de passage**, c'est sa fonction première. |
| **Château** | Habitation noble + Fortification ? | Tag principal = Fortification, secondaire = Habitation. Un château est *avant tout* un édifice défensif. |
| **Manoir** | Habitation + parfois Domaine rural ? | Habitation. Si attaché à des infrastructures rurales (étables, vergers), celles-ci sont des constructions distinctes. |
| **Maison du forgeron** *(cf. [[AccessExport/Batiment.csv]])* | Habitation + Lieu de production ? | Si la forge est intégrée au logis : tag principal = Lieu de production, secondaire = Habitation. Cas fréquent dans les villages. |
| **Tour de sorcier** *(cf. [[AccessExport/Batiment.csv]])* | Habitation + Lieu de savoir + Lieu religieux ? | Tag principal = Habitation, secondaires = Savoir + parfois Religieux. Variant signature pour [[Métiers#Mage\|Mages]]. |
| **Marché du parchemin** *(cf. [[AccessExport/Batiment.csv]])* | Social (commerce) + Savoir (parchemins = savoir) ? | Tag principal = Social, secondaire = Savoir. |
| **Ruines / Temple abandonné / Tombeau / Catacombes** *(cf. [[AccessExport/TypeLieu.csv]] §4 Non-habité)* | État dégradé d'autres catégories ? | **Pas une catégorie distincte** — ce sont des **états** d'autres catégories (Religieux abandonné, Habitation effondrée). Modélisation Phase 2 : flag `state: ruined / restored / active`. |

---

## Variants culturels (Phase 4 long terme)

Chaque pays a sa **signature architecturale**. Mention rapide pour 4 cultures emblématiques (les autres seront cadrées Phase 4) :

| Pays | Signature |
|------|-----------|
| **Altram** ([[Lore/Pays/Alkaran/Altram\|Altram]]) | Forge omniprésente, pierre noire, fer apparent, foyers monumentaux |
| **Trinoria** | Hauts-perchoirs forestiers, charpentes en bois clair, palissades dynamiques |
| **Lythar** | Architecture nomade — tentes-lourdes, structures démontables, ornements cuir/os |
| **Astravia** | Tours alignées sur constellations, vitraux astronomiques, îles flottantes (lore) |
| **Lumasar** | Académies de pierre blanche, dômes de verre, observatoires |
| **Mosrack** | Murailles rougies, fortins de cendre compactée, industrialisation prudente |
| **Cendara** | Volcanique — pierre noire, basalte, intégration au flux de lave |
| **Evertia** | Impérial — marbre, cascades architecturales, Caëspia signature |

---

*Liens : [[Architecture - Index|← Index Architecture]] · [[Échelles et Niveaux]] · [[Matériaux de Construction]] · [[Mapping Métiers de Construction]] · [[Métiers]] · [[Crafts]] · [[Géographie]] · [[Guildes]] · [[Traces des Ères]] · [[AccessExport/TailleVille.csv]] · [[Concepts Fondamentaux IA PNJ]]*
