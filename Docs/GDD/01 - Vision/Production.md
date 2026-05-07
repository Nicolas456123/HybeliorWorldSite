---
tags: [production, philosophie, pipeline, équipe, narration]
status: drafted
last_review: 2026-05-07
needs_review_for: [validation-équipe]
type: vision
implementation: "[[Production Spec]]"
---

# 🎬 Produire Hybelior — la philosophie d'un monde modulaire

> *« Imagine grand dans le lore. Implémente petit dans le code. Le reste, c'est de la recombinaison. »*

---

## L'idée de production

Hybelior ne sera **jamais** produit comme un MMO classique. Un MMO classique alloue son budget à du contenu massif et linéaire : zones modélisées une à une, créatures uniques, quêtes scriptées. Cette approche est financièrement insoutenable pour une équipe indépendante visant un monde vivant qui change à chaque saison cosmique.

La stratégie d'Hybelior repose sur trois principes simples et exigeants. **Lore riche, implémentation modulaire** : le monde a une profondeur narrative immense, mais cette richesse est encodée comme données et générateurs paramétriques, pas comme assets uniques. **Recombinaison paramétrique** : la majorité du contenu vient de la combinaison de blocs fondamentaux — une créature, un variant cosmique, un comportement, un contexte d'ère — pour produire un encounter unique sans créer un seul nouveau modèle. **L'effort va vers la profondeur, pas la quantité** : on préfère un cheptel restreint d'excellentes créatures déclinées en variants cosmiques à une multitude médiocre.

La conséquence philosophique est claire : la sensation de *« monde qui change »* doit venir, dans son immense majorité, de modifications gratuites ou peu coûteuses (sky, post-process, audio, spawn tables) ; une fraction plus modeste vient de réutilisation outillée (variants visuels, comportements IA) ; et seule une petite minorité est réservée à de la création coûteuse — nouveaux modèles, traces permanentes, cinématiques.

> *« Un joueur se souviendra du Dragon Glaciaire pendant des années ; il oubliera deux cents loups génériques en une semaine. Investir là où la mémoire se forme. »*
>
> *— note d'atelier de design*

---

## Trois tiers de coût, une seule discipline

L'équipe d'Hybelior pense la production en **tiers de coût**. Le premier tier rassemble tout ce qui peut être configuré sans création d'asset — ciel, lumière, post-process, particules ambiantes, audio mix, tables de spawn, courbes jour/nuit, densité de foliage, palettes. C'est le **gros** de la sensation d'ère ; et c'est presque gratuit. Le deuxième tier rassemble ce qui se réutilise par traitement codé — reskin de créature par shader cosmique, variant matériau de terrain, aura Niagara attachée, variante de comportement IA, recette éphémère, filtre audio. C'est le **goût** distinct d'une ère, ce qui fait qu'un loup d'Ombre n'est pas un loup tinté en violet mais une présence singulière. Le troisième tier, enfin, rassemble la **création coûteuse** — nouveau modèle 3D complet, nouvelle zone modélisée, trace géologique permanente, cinématique unique, boss avec son set d'animations. Ce tier est rare, réservé aux moments mémorables, et discipliné par un refus catégorique d'y tomber par paresse.

Cette discipline tient à une seule conviction : un monde habité par des joueurs adultes, qui changent à chaque saison cosmique, ne peut pas être produit à coup d'assets uniques. Il doit être produit comme un **instrument** — quelques bons matériaux, un outillage solide, et une vie infinie de combinaisons.

Pour le détail des tableaux d'effort, des outils Unreal mobilisés et des ratios cibles, voir [[Production Spec]].

---

## Une banque d'assets pensée comme socle

À l'origine de cette stratégie, il y a une banque d'assets initiale — modèles, animations, matériaux, sons, effets, sky presets — pensée non comme un catalogue à étoffer indéfiniment, mais comme un **socle** sur lequel s'appuie toute la suite. Quelques dizaines de créatures de référence, quelques dizaines de matériaux de base, quelques dizaines d'effets Niagara, quelques presets de ciel — et l'on tient, par recombinaison, des centaines voire des milliers d'expériences distinctes.

Le rôle de cette banque n'est pas d'être complète. Il est d'être **cohérente** — chaque pièce y trouve sa place, chaque variant y trouve sa logique, chaque traitement cosmique y trouve une signature. Une banque incohérente produit du bruit ; une banque cohérente produit des Ères qu'on reconnaît à l'œil avant même de les nommer.

Pour la composition exacte de la banque (créatures par catégorie, variants visuels, palettes de matériaux, banques sonores, sky presets), voir [[Production Spec]].

---

## L'éditeur d'Ère — le designer libéré du code

La pièce maîtresse de cette philosophie de production tient en un outil : **l'Éditeur d'Ère**. C'est un éditeur visuel intégré à UE5 où *designer une ère revient à remplir des sliders et des listes*, plutôt qu'à coder. Le designer ne touche jamais au code. Il choisit une voix dominante, une voix secondaire, un état du monde, un mood social, une tension cosmique, des variants à activer, des recettes à autoriser, une atmosphère. Et le viewport répond, en temps réel.

Cette intuition d'outillage est la clé. Sans elle, la production d'ères devient le travail d'une poignée de programmeurs — et donc rare, lente, fragile. Avec elle, la production d'ères devient le travail des designers — et donc féconde, rapide, scalable. Un Tech Designer dédié maintient l'éditeur ; les designers s'en servent. Le rôle du Tech Designer, le plus sous-estimé en MMO, est ici **central**. Sans lui, l'éditeur devient un outil mort.

Pour la maquette d'interface, les fonctionnalités détaillées et les règles de validation, voir [[Production Spec]].

---

## Une roadmap par phases

La réalisation se déploie en phases. La **fondation** vise un système d'ère paramétrique fonctionnel, restreint au seul tier le moins coûteux, avec une banque minimale et une démo interne. La **variation** ouvre les variants visuels complets, applique le système à un premier archétype d'ère pleinement thématique, et livre une démo externe. La **library** étend le catalogue à plusieurs archétypes d'ère, ajoute les générateurs de quêtes et de PNJ, et propose un cycle d'ères jouable. La **pré-alpha publique** ouvre toutes les disciplines de prédiction, la Bourse des Augures, plusieurs archétypes d'ère, et une première Partie publique. Et au-delà, l'enrichissement devient **continu** — un ou deux assets signature par grande ère, de nouveaux archétypes ajoutés au catalogue, des conditions cachées qui s'éveillent.

L'esprit de cette roadmap n'est pas un calendrier figé. C'est une **discipline d'étapes** — on ne passe à la suivante que quand la précédente tient. Une banque incomplète, une dette technique non réglée, un outil non adopté par les designers : autant de raisons de ne pas avancer. La règle est simple — on ne prétend pas livrer ce qu'on n'a pas validé.

Pour le détail des livrables par phase, des durées estimées et des banques d'assets cibles, voir [[Production Spec]].

---

## Une équipe taillée pour la modularité

Cette stratégie demande une équipe particulière. Pas la pyramide classique du studio de MMO, où des artistes nombreux produisent un contenu massif. Une équipe plus resserrée, où le **Designer Système**, le **Designer Lore**, le **Tech Designer**, l'**Artist Tech (shaders)**, le **Programmeur Engine** et le **Programmeur Backend** sont critiques — au sens littéral : sans eux, rien ne tient. Autour d'eux, des Artistes 3D, VFX, audio, UI/UX, et des QA forment le tissu de production qui transforme la machine en monde habité.

Cette équipe n'est pas hiérarchique au sens militaire du terme. Elle est **interdépendante**. Le Tech Designer dépend du Programmeur Engine pour les générateurs ; le Designer Lore dépend du Tech Designer pour incarner ses ères ; les Artistes dépendent de l'Artist Tech pour leur master shader ; tous dépendent du QA pour valider la balance. Casser un maillon, c'est casser la chaîne.

Pour le détail des profils, missions et niveaux de criticité, voir [[Production Spec]].

---

## Risques et discipline

Toute production d'envergure connaît ses risques, et il vaut la peine de les nommer. Le **dérapage de scope** sur les variants — vouloir en ajouter encore et encore — peut tuer le pipeline ; il se contre par une liste fermée et un refus discipliné. L'**équilibrage désordonné** des Ères se contre par l'éditeur lui-même, qui permet tests rapides et métriques. La **cohérence narrative** entre Ères se contre par un arc planifié à grandes mailles et une revue obligatoire avant publication. L'**explosion combinatoire** des recettes se contre par la matérialisation paresseuse — on ne génère que ce qu'un joueur utilise vraiment. La **dette de banque initiale** se contre par le verrouillage des phases.

Le risque le plus pernicieux, et le plus probable à long terme, est la **dérive vers le tier le plus coûteux**. C'est la tentation perpétuelle des productions MMO : créer plutôt que recombiner. Y céder, c'est perdre la stratégie. Une revue régulière du ratio entre tiers, et une alerte au moindre déséquilibre, est la discipline qui maintient l'édifice.

Pour le tableau complet des risques et mitigations, voir [[Production Spec]].

---

## Métriques et pipeline d'intégration

La santé du pipeline se mesure par quelques indicateurs simples : le temps de création d'une nouvelle ère, la taille du payload réseau, le taux de réutilisation des modules, le nombre de bugs critiques à la sortie, la satisfaction joueurs sur la sensation de changement, la cadence d'enrichissement du catalogue. Ces indicateurs ne sont pas des trophées ; ce sont des **alarmes**. Quand ils dérivent, on sait qu'il faut corriger.

Et chaque ère, avant d'être lâchée en Partie publique, passe par un pipeline d'intégration continue : validation automatique de la config, test isolé en zone de playtest, revue narrative pour la cohérence d'arc, test serveur de staging à plusieurs joueurs, revue technique pour la performance, et approbation finale. Cette discipline a un coût en heures ; elle est infiniment moins coûteuse qu'une ère ratée vue par toute la communauté.

Pour les seuils chiffrés, les paliers du pipeline et les responsables de chaque étape, voir [[Production Spec]].

---

## Synthèse

Produire Hybelior, c'est tenir une seule conviction à travers toutes les décisions : **un monde vivant ne se fabrique pas à coup d'assets uniques**. Il se cultive, par recombinaison, par outillage, par discipline. Cette conviction a un coût d'ingénierie initial — il faut bâtir l'éditeur, soigner la banque, former les designers à l'usage de l'outil. Mais ce coût initial est le prix d'une **scalabilité** qu'aucune production traditionnelle n'atteint. Une fois la machine en marche, une nouvelle ère se conçoit en quelques semaines par un designer seul — et le monde, à chaque cycle, change vraiment, sans que la dette technique s'accumule.

C'est, peut-être, la chose la plus difficile à comprendre pour qui n'a vu que des MMO classiques : un monde qui respire ne demande pas plus d'assets. Il demande de **meilleurs outils**.

> *« Bâtissez l'instrument. Ensuite, vous jouerez avec lui pendant des années. »*
>
> *— principe de l'atelier production*

---

*Liens narratifs : [[Vision]] | [[La Partie]] | [[Univers]] | [[Cosmologie]]*

*Implémentation technique (chiffres, tableaux, mockups, métriques, roadmap chiffrée) : [[Production Spec]]*
