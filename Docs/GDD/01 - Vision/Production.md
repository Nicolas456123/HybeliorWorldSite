---
tags: [production, philosophie, pipeline, équipe, narration]
status: drafted
last_review: 2026-05-12
needs_review_for: [validation-équipe]
type: vision
implementation: "[[Production Spec]]"
---

# 🎬 Produire Hybelior — la philosophie d'un monde modulaire

> *« Imagine grand dans le lore. Implémente petit dans le code. Le reste, c'est de la recombinaison. »*

---

## L'idée de production

Hybélior ne sera **jamais** produit comme les grands mondes partagés du commerce. Ces mondes-là allouent leur budget à du contenu massif et linéaire : zones modélisées une à une, créatures uniques, quêtes scriptées. Cette approche est financièrement insoutenable pour une équipe indépendante visant un monde vivant qui change à chaque saison cosmique.

La stratégie d'Hybelior repose sur trois principes simples et exigeants. **Lore riche, implémentation modulaire** : le monde a une profondeur narrative immense, mais cette richesse est encodée comme données et générateurs paramétriques, pas comme assets uniques. **Recombinaison paramétrique** : la majorité du contenu vient de la combinaison de blocs fondamentaux — une créature, un variant cosmique, un comportement, un contexte d'ère — pour produire un encounter unique sans créer un seul nouveau modèle. **L'effort va vers la profondeur, pas la quantité** : on préfère un cheptel restreint d'excellentes créatures déclinées en variants cosmiques à une multitude médiocre.

La conséquence philosophique est claire : la sensation de *« monde qui change »* doit venir, dans son immense majorité, de modifications gratuites ou peu coûteuses (sky, post-process, audio, spawn tables) ; une fraction plus modeste vient de réutilisation outillée (variants visuels, comportements IA) ; et seule une petite minorité est réservée à de la création coûteuse — nouveaux modèles, traces permanentes, cinématiques.

> *« Un voyageur se souviendra du Dragon Glaciaire pendant des années ; il oubliera deux cents loups génériques en une semaine. Investir là où la mémoire se forme. »*
>
> *— note d'atelier de conception*

---

## Trois rangs de coût, une seule discipline

Hybélior pense sa fabrication en **rangs de coût**.

Le **premier rang** rassemble tout ce qui peut être configuré sans création de matière neuve : ciel, lumière, ambiance, particules, mixage sonore, peuplement, courbes jour/nuit, densité de végétation, palettes. C'est le **gros** de la sensation d'ère, et c'est presque gratuit.

Le **deuxième rang** rassemble ce qui se réutilise par traitement outillé : repigmentation d'une créature, variante de matériau de terrain, aura ajoutée, variante de comportement, recette éphémère, filtre sonore. C'est le **goût** distinct d'une ère — ce qui fait qu'un loup d'Ombre n'est pas un loup tinté en violet, mais une présence singulière.

Le **troisième rang**, enfin, rassemble la **création coûteuse** : nouveau modèle complet, nouvelle zone modélisée, trace géologique permanente, cinématique unique, créature majeure avec son répertoire d'animations. Ce rang est rare, réservé aux moments mémorables, et discipliné par un refus catégorique d'y tomber par paresse.

Cette discipline tient à une seule conviction : un monde habité par des voyageurs adultes, qui change à chaque saison cosmique, ne peut pas être produit à coup de pièces uniques. Il doit être produit comme un **instrument** — quelques bons matériaux, un outillage solide, et une vie infinie de combinaisons.

Pour le détail des tableaux d'effort, des outils mobilisés et des ratios cibles, voir [[Production Spec]].

---

## Une banque d'œuvres pensée comme socle

À l'origine de cette stratégie, il y a une banque d'œuvres initiale — modèles, animations, matériaux, sons, effets, présages de ciel — pensée non comme un catalogue à étoffer indéfiniment, mais comme un **socle** sur lequel s'appuie toute la suite. Quelques dizaines de créatures de référence, quelques dizaines de matériaux de base, quelques dizaines d'effets, quelques présages de ciel — et l'on tient, par recombinaison, des centaines voire des milliers d'expériences distinctes.

Le rôle de cette banque n'est pas d'être complète. Il est d'être **cohérente** — chaque pièce y trouve sa place, chaque variante y trouve sa logique, chaque traitement cosmique y trouve une signature. Une banque incohérente produit du bruit ; une banque cohérente produit des Ères qu'on reconnaît à l'œil avant même de les nommer.

Pour la composition exacte de la banque (créatures par catégorie, variantes visuelles, palettes de matériaux, banques sonores, présages de ciel), voir [[Production Spec]].

---

## L'atelier d'Ère — la conception libérée de l'écriture brute

La pièce maîtresse de cette philosophie tient en un outil : **l'Atelier d'Ère**. C'est un établi visuel où *concevoir une ère revient à régler des curseurs et choisir dans des listes*, plutôt qu'à écrire du code. Le concepteur ne touche jamais à la machinerie. Il choisit une voix dominante, une voix secondaire, un état du monde, un climat social, une tension cosmique, des variantes à activer, des recettes à autoriser, une atmosphère. Et la fenêtre répond, à l'instant.

Cette intuition d'outillage est la clé. Sans elle, la production d'ères devient le travail d'une poignée d'artisans techniques — et donc rare, lente, fragile. Avec elle, la production d'ères devient le travail des conteurs et des concepteurs — et donc féconde, rapide, démultipliable. Un artisan dédié maintient l'Atelier ; les concepteurs s'en servent. Ce rôle, le plus sous-estimé dans les grands mondes partagés, est ici **central**. Sans lui, l'Atelier devient un outil mort.

Pour la maquette d'interface, les fonctionnalités détaillées et les règles de validation, voir [[Production Spec]].

---

## Une marche en étapes

La réalisation se déploie en étapes successives.

La **fondation** vise un système d'ère paramétrique fonctionnel, restreint au seul rang le moins coûteux, avec une banque minimale et une démo interne. La **variation** ouvre les variantes visuelles complètes, applique le système à un premier archétype d'ère pleinement thématique, et livre une démo externe. L'**enrichissement** étend le catalogue à plusieurs archétypes d'ère, ajoute les générateurs de quêtes et d'habitants, et propose un cycle d'ères jouable. La **première ouverture publique** ouvre toutes les disciplines de prédiction, la Bourse des Augures, plusieurs archétypes d'ère, et une première Partie partagée.

Au-delà, l'enrichissement devient **continu** : une ou deux œuvres signature par grande ère, de nouveaux archétypes ajoutés au catalogue, des conditions cachées qui s'éveillent.

L'esprit de cette marche n'est pas un calendrier figé. C'est une **discipline d'étapes** — on ne passe à la suivante que quand la précédente tient. Une banque incomplète, une dette technique non réglée, un outil non adopté par les concepteurs : autant de raisons de ne pas avancer. La règle est simple — on ne prétend pas livrer ce qu'on n'a pas validé.

Pour le détail des livrables par étape, des durées estimées et des banques cibles, voir [[Production Spec]].

---

## Un atelier taillé pour la modularité

Cette stratégie demande un atelier particulier. Pas la pyramide classique du grand studio, où des artistes nombreux produisent un contenu massif. Un atelier plus resserré, où l'architecte des systèmes, le conteur du monde, l'artisan outilleur, le coloriste, le bâtisseur de machinerie et le tisseur des coulisses sont essentiels — au sens littéral : sans eux, rien ne tient. Autour d'eux, des sculpteurs, des illustrateurs d'effets, des compositeurs, des graveurs d'interface, et des veilleurs de qualité forment le tissu d'atelier qui transforme la machine en monde habité.

Cet atelier n'est pas hiérarchique au sens militaire du terme. Il est **interdépendant**. L'outilleur dépend du bâtisseur de machinerie pour les générateurs ; le conteur dépend de l'outilleur pour incarner ses ères ; les sculpteurs dépendent du coloriste pour leur matière commune ; tous dépendent des veilleurs pour valider l'équilibre. Casser un maillon, c'est casser la chaîne.

Pour le détail des profils, missions et niveaux de criticité, voir [[Production Spec]].

---

## Risques et discipline

Toute production d'envergure connaît ses risques, et il vaut la peine de les nommer.

Le **gonflement** des variantes — vouloir en ajouter encore et encore — peut tuer la chaîne ; il se contre par une liste fermée et un refus discipliné. L'**équilibrage désordonné** des Ères se contre par l'Atelier lui-même, qui permet essais rapides et mesures. La **cohérence narrative** entre Ères se contre par un arc planifié à grandes mailles et une revue obligatoire avant publication. La **prolifération** des recettes se contre par la matérialisation paresseuse — on ne fait apparaître que ce qu'un voyageur utilise vraiment. La **dette de banque initiale** se contre par le verrouillage des étapes.

Le risque le plus pernicieux, et le plus probable à long terme, est la **dérive vers le rang le plus coûteux**. C'est la tentation perpétuelle des grands mondes partagés : créer plutôt que recombiner. Y céder, c'est perdre la stratégie. Une revue régulière du ratio entre rangs, et une alerte au moindre déséquilibre, est la discipline qui maintient l'édifice.

Pour le tableau complet des risques et parades, voir [[Production Spec]].

---

## Mesures et passage de l'œuvre au monde

La santé de la chaîne se mesure par quelques indicateurs simples : le temps de création d'une nouvelle ère, la charge transmise au monde partagé, le taux de réutilisation des modules, le nombre de défauts critiques à la sortie, la satisfaction des voyageurs sur la sensation de changement, la cadence d'enrichissement du catalogue. Ces indicateurs ne sont pas des trophées ; ce sont des **alarmes**. Quand ils dérivent, on sait qu'il faut corriger.

Et chaque ère, avant d'être ouverte en Partie partagée, passe par un seuil d'intégration continue : validation automatique du réglage, essai isolé en zone d'épreuve, revue narrative pour la cohérence d'arc, essai en monde de répétition à plusieurs voyageurs, revue technique pour la fluidité, et approbation finale. Cette discipline a un coût en heures ; elle est infiniment moins coûteuse qu'une ère ratée vue par toute la communauté.

Pour les seuils chiffrés, les paliers du passage et les responsables de chaque étape, voir [[Production Spec]].

---

## Synthèse

Produire Hybélior, c'est tenir une seule conviction à travers toutes les décisions : **un monde vivant ne se fabrique pas à coup de pièces uniques**. Il se cultive, par recombinaison, par outillage, par discipline. Cette conviction a un coût initial — il faut bâtir l'Atelier, soigner la banque, former les concepteurs à l'usage de l'outil. Mais ce coût initial est le prix d'un **passage à l'échelle** qu'aucune production traditionnelle n'atteint. Une fois la machine en marche, une nouvelle ère se conçoit en quelques semaines par un concepteur seul — et le monde, à chaque cycle, change vraiment, sans que la dette technique s'accumule.

C'est, peut-être, la chose la plus difficile à comprendre pour qui n'a vu que les grands mondes partagés du commerce : un monde qui respire ne demande pas plus de matière neuve. Il demande de **meilleurs outils**.

> *« Bâtissez l'instrument. Ensuite, vous en jouerez pendant des années. »*
>
> *— principe d'atelier*

---

*Liens narratifs : [[Vision]] | [[La Partie]] | [[Univers]] | [[Cosmologie]]*

*Implémentation technique (chiffres, tableaux, mockups, métriques, roadmap chiffrée) : [[Production Spec]]*
