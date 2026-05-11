---
tags: [inventaire, capacité, poids, banque, voyage, économie, narration]
status: drafted
last_review: 2026-05-12
needs_review_for: []
type: mechanic-narrative
implementation: "[[HW Inventory Component]]"
---

# 🎒 Inventaire — la bourse du voyageur

> *« On ne devient pas voyageur en sachant ce qu'on veut emporter. On le devient en apprenant ce qu'on accepte de laisser. »*
>
> *— Maître Veyran d'Astravia, lettre à un apprenti partant pour Onara*

---

## L'idée

Dans la plupart des mondes, l'inventaire est un **sac magique**. Un espace abstrait, presque infini, où l'on jette tout ce qu'on trouve sans peser, sans choisir, sans regretter. On peut traîner cent armures, mille fioles, des forêts entières de bois coupé — rien ne pèse, rien n'encombre, rien ne décide pour toi. Cette commodité a un nom : elle s'appelle **l'abstraction**, et elle vide le voyage de la moitié de son sens.

Hybelior a refusé ce sac magique. Pas pour punir le joueur, pas par souci de réalisme tatillon, mais parce que **ce qu'on porte raconte ce qu'on est prêt à perdre**. Un voyageur qui peut tout emporter ne choisit rien. Un voyageur qui doit choisir entre la deuxième potion et le troisième morceau de minerai **commence à exister**.

L'inventaire, ici, est une **bourse** — pas un coffre. Une bourse a une taille. Une bourse pèse à la ceinture. Une bourse force la main à trancher. Et c'est de ces tranchements répétés, mille fois par semaine, que se forme la silhouette d'un aventurier. Tu emportes ce que tu emportes — et le monde, ce faisant, te demande ce à quoi tu tiens.

> *« Le sage ne se demande pas ce qu'il a oublié au camp. Il se rappelle ce qu'il a choisi de laisser. »*
>
> *— proverbe de Mosrack*

---

## Ce qu'un voyageur porte

Hybelior reconnaît deux espaces distincts sur le corps d'un personnage, qui se complètent sans se confondre.

D'abord, le **sac** — la **bourse** proprement dite — où vivent tous les biens transportés mais pas portés. C'est là que s'entassent les potions à boire, les ressources récoltées, les pièces d'armure de rechange, les fragments de lore exhumés, les pièces de monnaie. Le sac est traversé du regard, on y plonge la main quand on cherche, on l'organise par habitude ou par soin.

Ensuite, l'**équipement** — ce qui est *porté*, et donc qui ne pèse plus dans le sac mais sur le corps. La cuirasse qu'on a sur le dos, l'épée qui pend à la ceinture, l'anneau au doigt, la cape qui suit le pas. Le passage entre les deux espaces — du sac vers le corps, du corps vers le sac — est un **geste**, jamais une trivialité. S'équiper d'une armure prend un instant ; ce n'est pas instantané, et ce n'est pas non plus dramatique. C'est simplement un moment où l'on **change ce qu'on porte**, et donc qui l'on est.

Pour la philosophie complète de l'équipement : voir [[Équipement et Armures]]. Cette page-ci se concentre sur le sac — sa capacité, son poids, son organisation, et tout ce qui s'y passe.

---

## La capacité — trois mesures qui se croisent

Une bourse ne se mesure pas en un seul chiffre. Hybelior connaît trois grandeurs distinctes, qui ensemble disent ce qu'un voyageur peut effectivement emporter.

### Les emplacements — la grille du sac

Le sac d'un personnage est, en première approximation, une **grille** d'emplacements. Chaque objet occupe une case (ou parfois plusieurs, pour les objets volumineux). Cette grille est lisible immédiatement : on voit ce qu'on a, on voit ce qu'on n'a plus de place pour. Cette dimension est la plus simple, la plus visuelle, et c'est elle qui structure l'interface.

À la création, un personnage dispose d'un sac modeste — quelques dizaines d'emplacements, assez pour vivre sa première saison sans angoisse mais pas assez pour traîner trois carrières simultanées. La capacité augmente avec les sacs et bagages qu'on acquiert : un sac à dos de bonne facture ouvre des emplacements supplémentaires, une sacoche de ceinture ajoute quelques cases, une besace de marchand multiplie l'espace mais ralentit la marche.

### Le poids — ce qui tire sur les épaules

À côté des emplacements, le **poids**. Chaque objet d'Hybelior a une masse, et la somme des masses portées détermine la **charge** d'un personnage. Un poids léger ne se sent pas — tu marches comme si tu ne portais rien. Un poids moyen commence à freiner — tes mouvements gagnent en lenteur, ton endurance descend plus vite. Un poids lourd te transforme — tu n'es plus le même voyageur, tu marches comme un cheval de bât, tes esquives perdent leur grâce.

Cette dimension est invisible dans la grille, et c'est précisément ce qui la rend dangereuse pour le novice. Tu peux avoir des emplacements libres et **être déjà trop chargé**. Le sac n'est pas plein, mais ton dos l'est. Beaucoup d'aventuriers font cet apprentissage à leurs dépens, lors d'une fuite ratée parce que le minerai accumulé pesait plus qu'il ne fallait.

### Le volume — la troisième mesure

Et puis, plus discrète, la troisième mesure : le **volume**. Certains objets, peu lourds mais encombrants, occupent plus d'emplacements qu'ils ne le devraient. Une cape pliée occupe deux cases. Un casque ne se met pas dans une case d'anneau. Cette dimension est moins critique que les deux premières — elle se gère par sens commun, sans calcul mental — mais elle existe, et c'est ce qui donne à l'inventaire de Hybelior sa **sensation tactile**.

> Pour les chiffres exacts (capacité de base, formules de progression, paliers de pénalité de poids) : voir [[HW Inventory Component]].

---

## Les catégories — ce qu'on emporte

Tout ce qui vit dans le sac d'un personnage se range, à Hybelior, dans cinq grandes catégories. Cette taxonomie n'est pas seulement un confort d'interface ; c'est une **manière de comprendre** ce qu'on transporte.

### Les consommables — ce qui s'épuise

Les potions, les nourritures, les boissons, les rouleaux, les onguents. Tout ce qui se boit, se mange, se lance, et qui **disparaît** dans l'usage. Les consommables sont la classe la plus dynamique du sac — ce qu'on en a à l'instant T n'a presque jamais le même contenu qu'une heure plus tard. Un aventurier qui part à l'aube avec dix potions de soin en aura, en fin de journée, trois ou aucune ; et la décision de quand les boire est, en soi, une part importante de la pratique.

Les consommables se distinguent par leur **fréquence de renouvellement**. Certaines ressources sont communes — l'eau, le pain, l'herbe sèche — et se trouvent partout. D'autres sont rares — les onguents de l'Ère, les rouleaux d'anciens — et se gardent pour les moments qui le méritent. La gestion des consommables est, pour beaucoup, l'apprentissage le plus continu de la vie d'aventurier.

### L'équipement — ce qui peut se porter

Tout ce qui peut s'attacher au corps, sans y être encore : armures de rechange, armes en réserve, bijoux trouvés, accessoires hérités. Cette catégorie occupe souvent une grosse part du sac, parce qu'elle persiste — un objet d'équipement reste, on ne le consomme pas. Et parce qu'il persiste, il **pèse**, parfois durablement.

C'est ici que la tension du sac se fait le plus sentir. Faut-il garder la deuxième épée *au cas où* ? Faut-il porter la cuirasse de rechange ? Faut-il revendre l'armure trouvée dans le coffre ? Ces questions, à Hybelior, n'ont pas de réponse universelle. Elles dépendent de **ce que le voyageur est en train de faire**, et c'est précisément ce qui rend la décision intéressante.

### Les ressources — ce que la main a récolté

Le bois coupé, la pierre extraite, le cuir tanné, l'herbe cueillie, le minerai sorti de la mine. Tout ce que la main a **prélevé** au monde, et qui attend d'être travaillé par un artisan — toi-même ou un autre. Les ressources sont le sang du système économique d'Hybelior. Elles circulent, se transforment, alimentent les ateliers, finissent en objets finis qui finiront eux-mêmes par alimenter d'autres ateliers.

Cette catégorie est aussi la plus **encombrante**. Un kilo de minerai est aussi lourd qu'un kilo d'épée, et infiniment moins utile en combat. Un voyageur qui s'aventure trop loin avec un sac à moitié plein de ressources fait souvent le choix difficile de **jeter une part de ce qu'il a récolté** pour pouvoir emporter ce qu'il trouvera plus loin. Ces sacrifices sont, à Hybelior, des **petits drames quotidiens** — et c'est ce qui les rend précieux.

### Le lore — ce qui se garde sans se consommer

À côté des consommables et des ressources, une catégorie plus discrète : les **fragments de lore**. Tablettes anciennes, livres rares, parchemins exhumés, médailles d'un ordre disparu, dent d'une créature qu'on ne reverra plus. Ces objets ne se consomment pas, ne se vendent presque pas, ne servent souvent à rien d'autre qu'à **témoigner**. Et pourtant — c'est l'un des plis les plus chers à Hybelior — ils tiennent une place dans le sac, et certains aventuriers acceptent de porter moins de potions pour garder un livre.

Cette catégorie est volontaire. Elle dit, dans la mécanique même : *certaines choses ne valent rien en combat et tout en mémoire.* Elle force un choix qui ne se chiffre pas. Ceux qui transportent du lore le font par une **fidélité** qui leur appartient.

### Les monnaies — ce qui circule

Les éclats, les pièces, les jetons d'ordre, les marques de faveur. Toutes les monnaies d'Hybelior — il y en a plusieurs, parce qu'une économie polyphonique ne pourrait pas vivre d'un seul étalon — coexistent dans une partie dédiée du sac, qui ne déborde pas dans la grille principale. Une bourse à monnaies a sa propre capacité, ses propres règles, sa propre dynamique. Pour la philosophie monétaire complète : voir [[Économie]].

---

## La banque — la mémoire au repos

Une bourse ne peut pas tout porter. Et c'est tant mieux. Au-delà du sac qu'on transporte, Hybelior connaît un espace plus large, plus stable, plus permanent : la **banque**. C'est l'endroit où l'aventurier dépose ce qu'il ne veut pas perdre mais qu'il n'a pas envie de porter — ses œuvres signées, ses pièces d'apparat, ses ressources accumulées en vue d'un grand projet, ses souvenirs précieux.

La banque a une **capacité** elle aussi, mais elle est plus généreuse que celle du sac. C'est volontaire : la banque n'est pas faite pour pousser à choisir, elle est faite pour **garder**. Elle est l'extension stable de la mémoire matérielle d'un personnage. On y dépose, on y retire, on y revient à chaque cycle de vie — entre deux expéditions, entre deux Ères, entre deux saisons de la vie.

La banque est **ancrée dans le monde**. Chaque grande cité a sa banque, et l'on doit y revenir physiquement pour accéder à son contenu — il n'y a pas de banque magique transportable, pas de tiroir invocable au milieu d'une expédition. Cette ancrage géographique est délibéré : il fait de la banque un **rendez-vous**, un lieu où l'aventurier retourne, où il croise d'autres aventuriers, où il négocie avec les marchands voisins, où il **réécrit** sa configuration avant de repartir.

> *« On retourne à la banque comme on retourne chez soi. Pour déposer, pour reprendre, pour comprendre, à voir ce qu'on dépose, ce qu'on est devenu. »*
>
> *— inscription à l'entrée de la banque de Cendara*

---

## Les coffres de zone — la mémoire éparpillée

À côté de la banque centralisée, Hybelior connaît un autre dispositif — plus discret, plus géographique : les **coffres de zone**. Ce sont des contenants permanents placés dans certains lieux — auberges importantes, cabanes d'éclaireurs, sanctuaires des Voies — qui permettent de stocker localement quelques objets. Ils servent à ceux qui passent souvent par le même endroit, qui ont leur **base** dans une vallée précise, ou qui veulent laisser une cache pour leur prochain passage.

Les coffres de zone ne remplacent pas la banque ; ils la complètent. Une banque garde ce qui est précieux et qu'on veut sûr ; un coffre de zone garde ce qui est pratique et qu'on veut **proche du terrain**. Un éclaireur qui patrouille les forêts d'Argoth peut laisser dans la cabane du carrefour son haubert lourd qu'il ne porte qu'en cas de bataille, ses pelisses d'hiver qu'il n'utilise qu'en saison froide, sa réserve de potions qu'il alimente progressivement. Le coffre est une **autre couche** de la mémoire matérielle, plus modeste mais plus quotidienne.

---

## La monture — l'extension du voyageur

Et puis, pour ceux qui en ont mérité, il y a la **monture**. Un cheval, une bête de selle, une créature plus exotique selon les Ères et les Voies. Une monture n'est pas qu'un moyen de transport — c'est une **extension du sac**. Elle peut porter ce que le voyageur ne pourrait pas porter seul : des sacoches latérales chargées de ressources, un coffret derrière la selle, parfois même une seconde armure rangée sous une bâche imperméable.

La capacité supplémentaire qu'une monture offre n'est jamais infinie. C'est, là encore, une affaire de **poids** — le cheval lui aussi se fatigue, et un cheval trop chargé devient plus lent, plus vulnérable, plus rétif. Mais elle change profondément la **portée** d'une expédition. Sans monture, on emporte le minimum vital et l'on revient vite. Avec monture, on tient plusieurs jours sur le terrain, on rapporte plus, on étend l'horizon.

La monture, à Hybelior, est aussi un **compagnon**. Elle a son nom, sa robe, parfois son tempérament. Elle se perd, parfois — par une chute, par un combat trop intense, par un Souffle qui la prend d'une étrange manière. Et quand elle se perd, elle se pleure. Une monture qui a porté un voyageur pendant trois Ères n'est pas remplaçable par un simple achat ; elle est, à sa manière, une **œuvre commune** entre le voyageur et le monde qui l'a portée.

---

## La conservation au Souffle — tout reste

Voici l'engagement le plus ferme qu'Hybelior tient envers l'inventaire de ses joueurs : **rien ne disparaît au passage d'un Souffle**. Pas une pièce d'armure, pas une potion, pas un éclat, pas un fragment de lore. Tout ce qui était dans ton sac, dans ta banque, dans tes coffres de zone, sur ta monture, le sera encore après que le ciel se sera fendu et que la nouvelle Ère se sera installée.

Cette promesse est l'inverse exact de ce que le Souffle fait aux Maîtrises — qui, elles, subissent une **rouille** temporaire. Les biens matériels, à Hybelior, sont du côté de la **mémoire** ; et la mémoire, le Souffle la respecte. Pour la philosophie complète de ce partage : voir [[Le Souffle]] §"Ce que le Souffle préserve, ce qu'il rend".

Cette conservation n'est pas neutre. Elle dit, sans détour, que **ce qu'on accumule à travers les Ères s'accumule vraiment**. Un voyageur qui traverse cinq Ères avec discipline aura, à la cinquième, un sac et une banque pleins de tout ce qu'il a su garder — sans qu'aucun reset périodique ne soit venu lui voler ses acquis. C'est l'une des manières dont l'Héritage **se voit**, jour après jour — pas dans un titre affiché, mais dans la **richesse matérielle** qu'on a su tenir.

> *« Le Souffle te demande de t'accorder à nouveau, mais il ne te prend pas ton manteau. C'est, dans cette cosmologie, la promesse la plus simple — et la plus solide. »*
>
> *— Ilthani Vael, Cendara*

---

## Les pertes possibles — le prix du voyage

Si le Souffle ne prend rien, le monde, lui, peut prendre. Hybelior n'est pas un monde aseptisé. Certaines situations, choisies ou subies, peuvent prélever sur le sac d'un voyageur. Ces pertes sont **rares**, parce qu'elles seraient injustes si elles étaient communes ; elles sont **réelles**, parce que sans elles le voyage n'aurait pas son poids.

### La mort en zone hostile

Mourir, à Hybelior, n'est pas anodin. Selon la zone, le contexte, et le type de mort, certains objets peuvent **tomber** du sac du défunt — soit au sol près de son corps, soit dans une bourse de mort que d'autres aventuriers pourraient récupérer. Cette mécanique n'est pas systématique : la plupart des morts ordinaires n'entraînent qu'une perte modeste, et le matériel essentiel — équipement porté, monnaies principales — est généralement préservé.

Mais dans certaines zones plus dangereuses — les marges sauvages, les sanctuaires anciens, les profondeurs de l'Astrasiltis — la mort devient plus coûteuse. Une part plus large du sac peut tomber. Cette friction est volontaire : elle est ce qui rend l'expédition vraiment **risquée**, et donc vraiment **mémorable**. Pour les règles exactes : voir [[Mort]].

### Le pillage PvP

Dans les territoires qui autorisent le combat entre joueurs — voir [[PvP]] — vaincre un adversaire peut donner droit à **prélever** une part de son sac. Cette mécanique est strictement encadrée : elle ne s'applique qu'à des zones explicitement marquées, elle ne touche jamais les biens essentiels d'un personnage, et elle est toujours **réversible** dans une certaine mesure — les bourses de mort restent accessibles à leur propriétaire pendant un certain temps avant que les pillards ne puissent les vider.

Le pillage n'est pas une cruauté ; c'est une **dimension du risque**. Un voyageur qui traverse une zone PvP avec sa cuirasse mythique sait qu'il met cette pièce en jeu. C'est ce qui rend les territoires hostiles intéressants. Et c'est aussi ce qui pousse les sages à **laisser leur précieux à la banque** avant de s'aventurer dans ces marges.

### L'usure et la corrosion

Plus modeste, plus quotidienne : les objets s'**usent**. Une armure portée des mois finit par perdre de sa résistance ; une arme utilisée jour après jour s'émousse. Cette usure n'est pas une perte au sens strict — elle n'efface pas l'objet — mais elle réduit son efficacité, et elle demande une **réparation** par un artisan. Cette friction est, à Hybelior, l'un des moteurs économiques les plus stables : tant qu'il y a des aventuriers qui usent leurs armes, il y a du travail pour les armuriers qui les réparent.

Et puis, plus rare encore, la **corrosion exceptionnelle**. Certaines créatures de l'Astrasiltis dévorent le métal lui-même. Certaines ambiances cosmiques rongent le cuir. Une pièce d'équipement insuffisamment entretenue, exposée trop longtemps à ces conditions, peut **se détruire** sans recours. Ces destructions sont rarissimes, et c'est tant mieux. Mais elles existent, et elles font partie du prix qu'un voyage long peut coûter.

---

## L'organisation — l'art de ranger sa bourse

Une bourse pleine, à Hybelior, n'est pas une bourse en désordre. Les vieux voyageurs développent, à force d'expéditions, des **manières de ranger** — chacun la sienne, chacune cohérente. Les uns rangent par catégorie : potions à gauche, ressources à droite, lore au fond. D'autres rangent par **fréquence d'usage** : ce qu'on saisit souvent près de la main, ce qu'on garde rarement au fond. D'autres encore rangent par **rituel** : un emplacement précis pour chaque chose, comme un musicien qui pose toujours ses instruments au même endroit avant un concert.

Cette dimension n'a pas d'effet mécanique direct. Mais elle a un effet **vécu**. Un sac bien rangé est un sac qu'on **lit** d'un regard ; un sac en désordre est un sac qu'on fouille en panique. Au moment où une potion peut sauver la vie, savoir où elle est dans le sac change tout. Cette pratique du rangement est, à Hybelior, l'une des disciplines silencieuses qu'on apprend en jouant — sans qu'aucun PNJ vous l'enseigne, parce qu'elle ne s'enseigne pas. Elle se sédimente.

L'interface d'Hybelior facilite cette pratique sans la dicter. Tu peux glisser, trier, regrouper. Tu peux **épingler** certains objets pour les retrouver d'un coup d'œil. Tu peux marquer une potion en **favori** pour qu'un raccourci la rende immédiate. Mais tout cela reste **optionnel**. Le sac désorganisé du débutant a sa dignité, et c'est par l'usage qu'il deviendra peut-être, un jour, un sac de Maître.

---

## Le poids de ce qu'on n'utilise pas

Une réflexion mérite d'être posée — parce qu'elle revient dans toutes les conversations entre joueurs et qu'elle est, en réalité, la plus profonde du système d'inventaire à Hybelior. Pourquoi limiter, au fond ? Pourquoi ne pas tout laisser garder ?

La réponse tient en une phrase : **le poids de ce qu'on n'utilise pas est ce qui donne sa valeur à ce qu'on utilise**.

Un voyageur qui a vingt-cinq potions dans son sac ne boit pas la trentième avec la même intensité que celui qui en a deux. Un aventurier qui traîne quinze armures de rechange ne **choisit** pas vraiment celle qu'il porte ; il **enfile** celle qui semble la mieux. Un artisan qui peut emporter toutes les ressources du monde ne **trie** pas — il accumule, et il accumule mal. La limite n'est pas une punition. C'est la **condition de la décision**. C'est ce qui transforme un trajet vers la cité en occasion de réfléchir : *« qu'est-ce que je laisse au camp ? qu'est-ce que je rapporte ? qu'est-ce que je vends ? »*.

Hybelior tient à ces moments. Ils sont, dans la vie d'un voyageur, ce que la respiration cyclique du Souffle est dans la vie du monde : un **petit Souffle quotidien**, un mouvement de redistribution qui empêche l'accumulation aveugle, qui rend le matériel **vivant**.

> *« Tu ne possèdes vraiment que ce que tu portes. Tout le reste, tu le ranges, tu l'oublies, tu l'attends. »*
>
> *— Karzal d'Onara, vétéran de trois Ères*

---

## Tableau de référence — capacités initiales et progression

Pour les architectes du système et pour les joueurs qui aiment les chiffres, voici la grille indicative des capacités d'inventaire à Hybelior. Les valeurs exactes vivent dans l'implémentation et sont susceptibles d'ajustement.

| Étape | Emplacements sac | Charge max (indicatif) | Banque | Coffres de zone |
|---|---|---|---|---|
| Création | modeste (sac de base) | faible | accès à une banque | aucun |
| Première saison | élargi (sac à dos) | moyenne | banque ouverte | premier coffre disponible |
| Voyageur confirmé | substantiel (sac + sacoches) | élevée | banque étoffée | plusieurs coffres possibles |
| Vétéran | important (sac + sacoches + monture) | élevée + extension monture | banque large | réseau de coffres |
| Concordant / Maître | maximum atteignable | maximale (mais jamais infinie) | banque la plus large | réseau étendu |

> Les chiffres exacts, les formules de progression et les paliers de pénalité de poids vivent dans : voir [[HW Inventory Component]] §"Architecture" et §"Slots d'équipement".

Cette progression n'est pas une course. La plupart des aventuriers atteignent la capacité de **voyageur confirmé** assez vite, et y restent — parce que c'est assez pour vivre. Au-delà, on étend pour des raisons précises : un artisan veut transporter plus de ressources, un explorateur veut tenir plus longtemps sur le terrain, un commerçant veut transporter sa propre boutique itinérante. Mais aucun chemin n'oblige à viser le maximum. Il y a, à Hybelior, des aventuriers qui voyagent toute leur vie avec le sac de base — et qui le font très bien.

---

## Trois bourses

Pour donner chair à ce qui précède, voici trois bourses qu'on pourrait fouiller, dans une seule auberge de Mosrack, à condition que leur porteur le permette.

### La bourse de Karzal, vétéran d'Onara

Karzal porte un sac à dos de cuir patiné, deux sacoches de ceinture, une besace en bandoulière. À l'intérieur — sept potions de soin (jamais moins, parce qu'on ne sait pas), trois rations de pain dur, une gourde de vin coupé, une dague de rechange (parce qu'on l'a héritée et qu'on ne s'en sépare pas), un haubert plié dans un coin (au cas où), une bourse de monnaies bien remplie, deux carnets reliés (le sien et celui d'un ami mort), et une petite boîte de bois fermée que personne n'a jamais ouverte. Karzal sait, sans regarder, où chaque chose se trouve. Le sac est rangé comme il rangeait son atelier, jadis — par fréquence d'usage.

### La bourse de Iola, Concordante de Cendara

Iola porte peu. Une sacoche de cuir noir, fermée par une boucle d'argent. À l'intérieur — trois potions, mais d'une rareté qui justifie qu'elle n'en ait pas davantage, un parchemin scellé d'un sceau qu'aucun marchand ordinaire ne saurait reconnaître, sa propre bourse de monnaies (modeste, parce qu'à Cendara on lui fait crédit), un fragment de Spiritus pétrifié enveloppé dans un linge, et une lame courte qu'elle a fait forger pour son seul usage. Iola ne s'encombre pas. Sa banque, à Cendara, déborde de ce qu'elle ne porte pas. Mais sur le terrain, elle voyage **léger**.

### La bourse de Théo, casual fidèle

Théo porte un sac de capacité moyenne, parce qu'il n'en a jamais eu besoin de plus. À l'intérieur — deux potions de soin (oubliées depuis la semaine dernière), un quartier de fromage, une lettre de sa guilde, quelques éclats, un anneau qu'il n'a jamais réussi à équiper parce qu'il n'a pas la stat requise (mais qu'il garde, on ne sait jamais), et un livret de chants qu'il aime relire le soir. Théo n'a pas de banque pleine, parce qu'il ne s'en occupe pas. Il vit de ce qu'il porte, et c'est précisément ce qu'il voulait. Le monde le **laisse**, et c'est très bien ainsi.

Aucune de ces bourses n'est *meilleure* qu'une autre. Toutes trois racontent une **manière de vivre**. C'est exactement ce que le système cherche à permettre.

---

## L'échange — quand un sac s'ouvre à un autre

Une bourse, à Hybelior, n'est pas seulement une affaire personnelle. C'est aussi un **organe d'échange**. À tout moment, deux aventuriers peuvent ouvrir leurs sacs face à face, déposer ce qu'ils veulent céder, prendre ce qui leur revient. Ce geste — l'**échange** — est l'un des plus quotidiens du monde, et il a sa propre dignité.

Hybelior tient à ce que l'échange entre joueurs reste **direct**. Pas d'enchères automatiques abstraites, pas de marché global sans visage où l'on dépose un objet et où il disparaît dans une grande machine économique. Quand tu vends ton épée à Karzal, tu regardes Karzal ; tu vois sa silhouette ; tu lis ce qu'il porte ; tu comprends à qui tu confies ton arme. Et Karzal, en retour, te regarde. Cette **vis-à-vis** transforme l'échange en relation — pas en transaction.

Les grands marchés de Mosrack, de Cendara, de Galenor ne sont pas pour autant des chaos. Des maisons de commerce structurent les flux, des courtiers facilitent les rencontres, des registres tiennent compte des transactions importantes. Mais au moment précis de l'échange, ce sont toujours **deux sacs** qui s'ouvrent l'un à l'autre. Cette permanence du geste manuel est l'une des manières dont Hybelior empêche son économie de devenir abstraite.

### Le don, le troc, la vente

L'échange prend, à Hybelior, trois formes principales. Le **don** d'abord — gratuit, sans contrepartie, parfois cérémoniel. Donner à un ami, à un disciple, à un Concordant qu'on respecte. Ces dons ne sont pas anecdotiques ; ils tiennent le tissu social aussi solidement que les ventes. Le **troc** ensuite — un objet contre un autre, sans monnaie qui circule. On l'utilise quand les valeurs sont reconnues sans qu'on ait besoin de les chiffrer : un minerai contre une potion, une arme contre une armure, un fragment de lore contre un autre. La **vente** enfin — la transaction chiffrée, médiée par une monnaie, qui structure l'essentiel des flux commerciaux.

Aucune de ces formes n'est plus noble qu'une autre. Une vente bien faite peut être plus respectueuse qu'un don mal placé. Un troc franc peut tisser une amitié plus solide qu'une vente classique. Le système ne hiérarchise pas — il permet, et il laisse le tissu social inscrire ses propres normes.

> Pour la philosophie complète des monnaies, des prix, et des marchés : voir [[Économie]].

---

## La friction de l'organisation — ce que le sac apprend

Une chose mérite d'être dite, qu'on apprend en jouant à Hybelior et qu'aucun didacticiel ne formule : **le sac t'apprend à devenir qui tu es**. Et il l'apprend par sa friction même.

Tu commences avec un sac modeste. Très vite, il déborde. Tu n'arrives plus à trouver tes potions parce qu'elles sont mélangées aux fleurs que tu as cueillies. Tu te perds entre trois épées que tu n'utilises plus. Tu jures que tu trieras *plus tard*, et plus tard tu ne tries pas. Et un jour, dans un combat important, tu ne trouves pas la potion à temps. Tu meurs, ou tu perds une partie de ton équipement, ou tu fuis humilié. Ce moment — qui revient, immanquablement, à tous les voyageurs — est un **moment fondateur**.

Après ce moment, on commence à ranger. On apprend à dire **non**. On apprend à jeter, à vendre, à laisser au coffre. On apprend que tenir un sac, c'est moins une question de capacité que de **discipline du choix**. Et au bout de quelques mois de jeu, le sac d'un joueur ressemble à sa silhouette : structuré, lisible, **fidèle à un projet**.

Cette pédagogie silencieuse n'est inscrite dans aucune ligne de code explicite. Elle émerge de la simple présence des limites. C'est ce que la friction du sac, à Hybelior, **enseigne** — sans avoir l'air d'enseigner.

> *« Donne à un débutant un sac infini, et tu fais de lui un accumulateur. Donne-lui un sac borné, et tu lui apprends à choisir. La différence, c'est toute la pédagogie qu'un monde peut offrir. »*
>
> *— Maître Veyran d'Astravia*

---

## L'inventaire et l'Accord — résonance subtile

Une dimension plus discrète, dont la plupart des joueurs ne prennent conscience qu'après plusieurs Ères. Le contenu de ton sac n'est pas neutre vis-à-vis de l'**Accord**. Pas au sens où il modifierait la jauge d'Accord directement — l'Accord se cultive par les pratiques, pas par l'accumulation matérielle. Mais au sens où ce que tu portes habituellement **dit** au monde quelle est ton orientation, et le monde, à sa manière, en tient compte.

Un joueur dont le sac est plein de fragments d'Ignis pétrifiés, de potions élémentaires, de parchemins liés à la Voie du feu, **paraît** lié à Ignis. Les PNJ qui partagent cette affinité le reconnaissent ; ceux qui s'y opposent le tiennent à distance. Et lors des transitions cosmiques, lors d'une Ère qui valorise Ignis, ce joueur sent — de manière subtile, jamais brutale — que le monde le reconnaît un peu mieux.

Cette résonance n'est pas une mécanique d'optimisation. Elle est trop ténue pour qu'on la **vise**. Mais elle existe, et elle fait que ton sac, à Hybelior, n'est jamais seulement un sac — c'est aussi un **portrait** que le monde lit en filigrane.

Pour la philosophie complète de l'Accord : voir [[L'Accord]]. Pour les conditions cachées qui peuvent récompenser certaines collections : voir [[L'Accord]] §"Les Titres Célestes" et [[Le Souffle]] §"Pour ceux qui le comprennent".

---

## L'inventaire et l'artisanat — la matière qui vit

Pour tous les joueurs qui pratiquent un métier, l'inventaire prend une dimension supplémentaire : il devient l'**antichambre de l'atelier**. Un artisan qui forge a, dans son sac et dans sa banque, les ressources de ce qu'il forgera demain. Un alchimiste a ses herbes, ses fioles, ses poudres. Un tailleur a ses tissus, ses fils, ses teintures. Cette **densité matérielle** de la vie d'artisan transforme la relation au sac.

Les ressources d'artisanat occupent souvent la plus grande partie du sac et de la banque d'un artisan sérieux. Ce sont elles qui pèsent, qui encombrent, qui demandent à être organisées avec rigueur. Un artisan expérimenté tient sa banque comme un cuisinier tient son garde-manger : par catégories, par fraîcheur, par rotation. Il sait, sans regarder, combien il a de minerai brut, combien d'alloyage en cours, combien d'objets finis prêts à la vente.

Cette discipline matérielle est l'une des **vertus silencieuses** de l'artisan d'Hybelior. Elle n'est pas spectaculaire — elle ne fait pas l'objet de chants — mais elle est la condition pour que l'atelier ne se ferme jamais faute de matière. Et elle est, dans son détail, l'une des dimensions qui font qu'un Maître artisan reste un Maître à travers les Ères : non parce qu'il sait mieux frapper, mais parce qu'il sait toujours **avoir sous la main** ce dont il aura besoin.

Pour la philosophie complète des métiers : voir [[Métiers]] et [[Labeur]].

---

## L'inventaire comme journal silencieux

Si l'on devait dire, en une phrase, ce que l'inventaire de Hybelior cherche à être, ce serait peut-être ceci : **un journal silencieux**. Un endroit où chaque objet raconte un fragment de la vie de son porteur, où chaque emplacement vide est une décision, où chaque accumulation est un témoignage.

Tu ouvres ton sac, à Hybelior, et tu y vois trois mois de ta vie. La potion qu'un ami t'a donnée avant un combat dont vous êtes revenus tous les deux vivants. Le minerai que tu n'as pas eu le temps de vendre. La lettre que tu n'as pas eu le courage de lire. Le fragment de carte que tu gardes pour la prochaine expédition. Toutes ces choses ne sont pas que des items. Ce sont des **traces**, et le sac qui les contient est, à sa manière, un objet narratif.

C'est cette densité-là que la mécanique tente de tenir. Pas un sac magique infini où tout disparaît dans l'abstraction. Une bourse réelle, limitée, vivante — qui pèse, qui se remplit, qui se vide, qui te suit, et qui, le jour où tu n'es plus, racontera encore quelque chose de toi à qui en héritera.

> *« On ouvre la bourse d'un mort, et l'on apprend, en silence, tout ce qu'il n'a pas eu le temps de dire. »*
>
> *— Maître Veyran d'Astravia, dernière entrée du livre des voyages*

---

## Voir aussi

*Liens narratifs : [[Équipement et Armures]] | [[Économie]] | [[Mort]] | [[PvP]] | [[Le Souffle]] | [[L'Accord]] | [[Personnage]] | [[Métiers]] | [[Labeur]] | [[Exploration]]*

*Implémentation technique (capacités, persistance, RPC, sérialisation JSON) : [[HW Inventory Component]] | [[Inventory Items]] | [[Inventory Persistence]]*
