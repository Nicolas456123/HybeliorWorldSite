---
tags: [architecture, systemes, data-driven, generateurs, production, philosophie, polyphonie, ères]
status: drafted
last_review: 2026-05-12
needs_review_for: []
type: system-narrative
implementation: "[[Architecture Data-Driven]]"
---

# 🏗️ Architecture Data-Driven — un monde qui se recompose

> *« Nous n'avons pas bâti Hybelior comme on bâtit une cathédrale — pierre après pierre, jusqu'à ce que la pierre soit posée et qu'on ne la déplace plus. Nous l'avons bâti comme on accorde un orchestre. On a écrit les voix, on a réglé les instruments, on a confié des partitions ; et le monde, lui, joue ce qu'il joue ce soir. Demain, il jouera autre chose. Et nous n'aurons pas à reconstruire la cathédrale. »*
>
> *— attribué à Maître Garven d'Orelth, dit le Maître de Production, ouverture des Cahiers de la Forge*

---

## L'idée

Il y a deux manières de fabriquer un monde de jeu. La première — la plus ancienne, la plus respectée, la plus coûteuse — consiste à le bâtir **à la main puis à le figer**. On dessine chaque créature, on écrit chaque quête, on pose chaque rocher, et l'on signe l'ensemble comme un peintre signe une toile. Le résultat tient. Il a sa beauté. Mais ce qui tient ne respire pas, et ce qui ne respire pas, à Hybelior, n'a pas droit de cité.

L'autre manière — celle que nous avons choisie — consiste à fabriquer non pas un monde mais ses **conditions de possibilité**. On produit des matières premières. On écrit des règles de combinaison. On laisse l'instance, le particulier, le visage présent des choses, **émerger** de la rencontre entre les matières et les règles, à l'instant où le joueur en a besoin. Le monde n'est plus une œuvre achevée. Il est une **partition jouée**.

Cette décision n'est pas une optimisation déguisée en philosophie. C'est l'inverse : c'est une philosophie qui se trouve, par bonheur, être aussi une optimisation. Si la cosmologie d'Hybelior promet que le monde se recompose par configurations de voix — voir [[Le Souffle]], voir [[Les Ères]] — alors la production technique qui prétend incarner cette promesse ne peut pas, elle, être en dur. Un cosmos polyphonique ne peut pas être servi par un moteur monophonique. La forme du contenant doit honorer la forme du contenu.

> *« On nous a longtemps demandé pourquoi nous refusions de "finir" le bestiaire avant la sortie. Nous avons répondu : parce que le bestiaire ne finit pas. Il respire, comme le monde. Le bestiaire fini, c'est le bestiaire mort. »*
>
> *— Sœur Lirevin, archiviste de la Forge d'Astravia*

---

## La règle d'or

> [!important] Le principe fondateur
> *« Le contenu fini est petit. Les règles de combinaison sont nombreuses. Les variations émergent. »*

Cette équation paraît banale tant qu'on la lit comme une consigne d'ingénieur. Elle devient autre chose dès qu'on la lit comme une **proposition cosmologique**. Elle dit, sous l'apparence d'une discipline de production, que **le monde ne se compose pas d'objets mais de configurations**. Une biche d'Hybelior n'est jamais simplement une biche : selon l'Ère, son pelage prend des reflets sombres, des éclats dorés, une translucidité qu'on ne lui connaissait pas. Ce qui change n'est pas la biche — c'est la *configuration* dans laquelle elle apparaît. L'asset est une matière première stable ; ce que le joueur perçoit est le **résultat d'un croisement** entre cet asset, l'Ère qui parle, et la voix qui domine ce soir.

La même logique s'applique à tout. Un fer minable. Une recette de craft. Un PNJ rencontré dans une auberge. Une quête reçue à la croisée des chemins. Aucune de ces choses n'est inscrite dans le marbre comme une réalité figée ; chacune est **calculée à la demande** par la rencontre entre une matière (l'archétype) et une règle (le générateur), à un moment précis (l'état du monde). Le monde n'a pas besoin d'avoir précompté toutes ses créatures. Il lui suffit de savoir comment les composer quand on les rencontre.

Cette inversion change tout. Elle fait passer la production d'une logique **multiplicative** — où chaque nouvelle Ère exigeait de reproduire chaque variation à la main — à une logique **additive** — où chaque nouvel asset enrichit toutes les Ères passées et futures à la fois. C'est, en termes de production, l'équivalent technique de la promesse philosophique du Souffle : *ce qui est mémoire reste, ce qui est puissance se rejoue*. Ici : *ce qui est matière première reste, ce qui est instance se rejoue*.

---

## Trois couches qui se croisent

Le monde, vu depuis sa production, est composé de **trois couches** qui ne se confondent jamais et qui se croisent toujours. Cette tripartition n'est pas un choix d'architecture parmi d'autres — c'est la traduction structurelle de la cosmologie polyphonique. Les Éternels chantent, les Cosmiques répondent, les Célestes interjectent : trois registres distincts qui composent le tissu du monde. La production reflète cette nature.

On pourrait dire que cette tripartition est une **archéologie inversée**. L'archéologue, devant une cité, descend dans le sol pour trouver, sous la cité présente, la cité d'avant ; sous la cité d'avant, la cité d'encore avant ; et tout en bas, le sol vierge. À Hybelior, nous procédons à l'inverse : nous posons le sol d'abord (Couche A, les matières premières), nous écrivons par-dessus les règles qui peuvent l'habiter (Couche B, les générateurs), et nous laissons les cités successives s'élever et s'effacer (Couche C, les instances). Quand le voyageur traverse Caldegar, il marche sur cette même Couche A que dix Souffles auparavant. Ce qui change, c'est ce que la Couche B a fait, ce mois-ci, de cette Couche A.

### Couche A — les matières premières

> *« Une lame de métal ne sait pas si elle servira à un cavalier de Pendragoria ou à un brigand de Caldegar. Elle sait seulement qu'elle est en acier, qu'elle a la longueur qu'elle a, et que sa surface peut accueillir n'importe quelle patine. C'est précisément cette ignorance qui la rend utile. »*
>
> *— Aldric, forgeron de Mosrack, à un apprenti pressé*

La première couche est celle des **matières premières**. Meshes de créatures, shaders maîtres, banques d'animations, émetteurs Niagara, sons impactants, presets atmosphériques, archétypes de comportement. Ces assets coûtent — vraiment. Une créature 3D bien faite, c'est des semaines de travail d'un artiste senior. Mais on ne la produit **qu'une seule fois**, et elle servira à tout le reste du projet, à toutes les Ères passées et à venir.

C'est la couche la plus lente, la plus exigeante, la plus humaine. C'est aussi celle qu'on touche le moins. Un mesh de loup, à Hybelior, peut traverser cinq Ères et dix Souffles sans qu'on y revienne — parce que ce qui le distingue, d'Ère en Ère, n'est pas sa forme mais ce qu'on lui applique : un shader d'ombre, un effet de givre, une voix particulière. La forme reste ; l'apparition change. Comme le squelette d'un musicien qui n'a pas changé entre deux concerts, mais qui ne jouera pas, ce soir, la même musique.

Cette couche est volontairement **ignorante** de ce qui se joue au-dessus d'elle. Le mesh ne sait pas dans quelle Ère il sera invoqué. Le shader maître ne sait pas quelle teinte recevra son paramètre de couleur. L'archétype IA ne sait pas s'il sera utilisé pour un loup paisible ou un loup d'embuscade. Cette ignorance est précieuse — c'est elle qui permet la recombinaison. Si la matière savait à quoi elle sert, elle ne pourrait servir qu'à cela.

### Couche B — les générateurs

> *« Le générateur, c'est l'unité de design. On ne dessine pas cent quêtes. On écrit *un* générateur de quêtes, et on lui apprend ce qu'est une bonne quête à Hybelior. Puis on le laisse en composer cent, ou mille, ou autant que le monde en demande. »*
>
> *— Maître Garven d'Orelth, Cahiers de la Forge, livre II*

La couche médiane est celle des **générateurs**. C'est, philosophiquement parlant, la plus importante des trois — celle qui porte la signature du studio sans porter aucune signature visible. Un générateur n'est pas un asset. Ce n'est pas non plus une instance. C'est une **règle de composition** : une fonction qui prend en entrée l'état du monde et un archétype, et qui produit en sortie une instance jouable, cohérente, vivante.

L'unité de design, à Hybelior, n'est pas la quête. C'est le **générateur de quêtes**. Le designer ne dessine pas cinquante PNJ pour la prochaine Ère ; il enseigne au **générateur de PNJ** comment habiller un aubergiste sous une Ère de l'Ombre Longue. La différence n'est pas une différence d'échelle — c'est une différence de **nature**. On passe d'une discipline d'écriture (où chaque pièce est unique et signée) à une discipline d'orchestration (où l'on règle les conditions de production de mille pièces qui ne sont jamais écrites en toutes lettres).

Cette translation est exigeante. Elle demande au designer de **penser comme une voix qui en chante d'autres** — d'écrire des règles assez précises pour produire de la beauté, assez souples pour ne pas se répéter, assez attentives à la cosmologie pour ne jamais produire de dissonance. C'est l'art le plus discret du projet. Personne, dans le jeu fini, ne verra jamais les générateurs. Mais sans eux, le jeu fini serait soit infiniment petit, soit infiniment cher.

### Couche C — les instances

> *« Une instance, c'est ce qui apparaît, vit, agit, et s'éteint. Ne lui demande pas de durer. Demande-lui seulement d'être juste, ici, maintenant, pour le joueur qui la rencontre. »*
>
> *— inscription au sanctuaire des Calculs, Astravia*

La couche supérieure est celle des **instances** : ce qui est calculé en jeu, vécu par le joueur, et qui n'a pas besoin d'être stocké quelque part de façon permanente. Le Loup-Ombre qui surgit ce soir dans la brume de Caldegar n'existait pas hier ; il n'existera plus demain. Il a été composé à l'instant de sa rencontre, à partir du mesh Loup_Base de la Couche A, traversé par le variant Shadow de la Couche B, modulé par les paramètres de l'Ère du Voile en cours. Sa vie est brève — quelques minutes, peut-être moins. Et c'est très bien ainsi.

Cette **jetabilité assumée** des instances est ce qui, paradoxalement, donne au monde sa profondeur. Si chaque créature devait être inscrite dans une base permanente, le monde s'alourdirait à chaque Souffle d'une couche de données morte. À Hybelior, on a refusé cette dette. L'instance est éphémère. Ce qui survit, ce sont les **traces** — les invariants joueurs (Renom, recettes connues, items acquis), les œuvres signées qui circulent, les monuments érigés, et plus tard, dans certaines Ères, les ruines déposées par le passage du temps lui-même (voir [[Traces des Ères]]).

Cette distinction entre instance jetable et trace persistante est la signature philosophique de l'architecture entière. Elle dit, dans la production même, ce que le Souffle dit dans la cosmologie : *l'éphémère et le permanent ne s'opposent pas, ils se complètent. L'éphémère habite le présent. Le permanent porte la mémoire. Aucun monde ne tient sans les deux.*

### La jetabilité comme acte de respect

Il y a, dans la jetabilité des instances, quelque chose qui peut surprendre — une apparente brutalité. *Comment ?* dira le joueur novice, *cette créature que je viens d'affronter n'aura pas existé hier et n'existera plus demain ? Qu'est-ce qui me dit qu'elle a "compté" ?* La réponse, à Hybelior, est philosophique avant d'être technique. **Ce qui compte n'est pas la permanence de l'instance, mais la fidélité de sa composition**. Une créature qui surgit cette nuit est exactement ce qu'elle doit être dans la voix présente du monde. Elle est juste, ici, maintenant. Sa brièveté n'est pas un mépris ; c'est une **présence pleine**.

C'est exactement la promesse qu'un orchestre fait à un public : *cette note que tu entends ce soir ne sonnera jamais plus comme cela. Elle ne se rejoue pas. Mais elle est, dans l'instant où elle sonne, parfaitement ce qu'elle est.* Personne ne reproche à un concert d'être éphémère. Personne n'exige qu'un acteur de théâtre prenne la pose pour toujours après son dernier acte. La beauté de la rencontre vient précisément du fait qu'elle est *cette* rencontre, dans *cet* instant, dans *cette* configuration. La jetabilité de l'instance, à Hybelior, n'est pas une mort prématurée — c'est l'**honnêteté du présent**.

---

## Les douze générateurs canoniques

> *« Douze voix d'orchestre. Aucune ne joue seule. Chacune sait quand entrer, chacune sait quand se taire. C'est leur tissage qui fait le monde. »*
>
> *— Chroniqueur des Ères, Annales d'Hybelior, fragment 47*

Hybelior connaît douze générateurs canoniques. Ce chiffre n'a rien de mystique — il pourrait demain être onze, ou treize. Mais à ce jour, douze suffisent à composer la totalité du monde sensible. Chacun a un **rôle philosophique** propre, qui dépasse sa fonction technique. Voici ce qu'ils sont, vus de l'intérieur de la cosmologie qu'ils servent.

### 1. EraGenerator — le chef d'orchestre

Le premier générateur, le seul qui parle à tous les autres. Au moment d'un Souffle, c'est lui qui lit la nouvelle configuration cosmique — la voix dominante, la voix secondaire, l'état du monde, le mood, la tension, le continent qui se concentre — et qui prévient les onze autres. Sans lui, le monde basculerait sans bascule, l'Ère changerait sans qu'on s'en aperçoive. Il est le **moment de la conscience** dans l'architecture : ce qui sait qu'un changement vient d'avoir lieu, et qui en informe tout ce qui doit s'adapter.

### 2. VariantGenerator — les visages d'une même créature

Une biche n'est jamais simplement une biche. Selon l'Ère, son pelage prend des reflets sombres, des éclats dorés, une translucidité étrange. Le VariantGenerator applique à un mesh donné le **vêtement cosmologique** de l'Ère en cours — shader, particules, son d'ambiance, aura comportementale. Il est la **traduction sensible** des voix dominantes : ce qui fait qu'un loup, sous Noctis, n'a pas la même présence qu'un loup sous Eldoria. La forme reste ; l'âme de l'apparition change.

### 3. MaterialGenerator — ce qui apparaît, ce qui disparaît

Toutes les ressources ne sont pas disponibles tout le temps. Le Fer-Ombre n'existe pas sous une Ère du Verdoiement ; le Fer-Solaire dort quand Noctis chante. Le MaterialGenerator est ce qui **rend possible cette respiration des ressources** — qui les ouvre quand l'Ère les porte, qui les ferme quand elle s'en détourne. C'est la couche par laquelle l'économie du monde devient cosmologiquement honnête : ce qu'on extrait dépend de ce que le monde, en cette saison, accepte de donner.

### 4. RecipeGenerator — le craft comme dialogue

Une recette n'est pas un acquis abstrait. C'est un **dialogue entre voix** : tel matériau croisant tel autre, sous telle Ère, produit tel objet. Le RecipeGenerator calcule, à chaque Ère, l'ensemble des recettes craftables, leurs coûts, leurs résultats. Certaines sont publiques ; d'autres sont des conditions cachées (voir [[Armes et Maîtrise]]) que les artisans découvrent en expérimentant. Ce générateur incarne, dans la production, l'idée que **le savoir technique n'est pas universel mais saisonnier** — qu'on apprend à forger autrement selon ce que le monde, à ce moment-là, autorise.

### 5. QuestGenerator — l'événement narratif comme composition

Pas de fabrique infinie. Une bibliothèque de **templates** — quarante à quatre-vingts archétypes narratifs — filtrés par l'état du monde et alimentés par les PNJ réellement présents. Le QuestGenerator est la couche par laquelle une même structure narrative ("retrouver un objet perdu") peut résonner différemment selon l'Ère : la lanterne perdue d'un frère, sous l'Ombre Longue, n'est pas la même quête que sous le Verdoiement, même si le template est identique. La **modulation par le mood** suffit à donner à chaque instance sa voix propre.

### 6. NPCGenerator — l'habillage d'un visage

L'identité des PNJ majeurs est écrite à la main (voir [[PNJ]]). Mais leur **habillage saisonnier** — la tenue qu'ils portent ce mois-ci, les dialogues d'ambiance qu'ils tiennent, la posture qu'ils adoptent, l'humeur qu'ils laissent transparaître — est composée par le NPCGenerator. Ce générateur dit, dans la production, ce que toute la cosmologie dit ailleurs : *on est ce qu'on est, et on est aussi de quelle saison.* L'aubergiste de Caldegar reste l'aubergiste de Caldegar à travers toutes les Ères ; mais sous l'Effroi, il ferme tôt, et sous la Floraison, il garde sa porte ouverte tard.

### 7. LootGenerator — l'empreinte laissée

Ce que la créature laisse comme empreinte lorsqu'elle tombe. Le LootGenerator décide, à chaque mise à mort, ce que la rencontre dépose dans le monde du joueur. Drops conditionnés par le type de créature, son variant, l'Ère en cours, le niveau du joueur, et toujours ce **facteur d'incertitude** qui empêche la prévisibilité totale. Il est la couche par laquelle l'acte de chasser devient cosmologiquement signifiant : *ce qu'on tue laisse une trace de ce qu'on a vécu, pas seulement de ce qu'on a tué.*

### 8. EventGenerator — les accents cosmiques

Les événements mondiaux. Boucle continue, pour chaque sous-zone : *y a-t-il quelque chose à lancer ici, maintenant ?* L'EventGenerator est la couche des **accents** — ces moments où, dans la trame ordinaire, le monde élève la voix : une embuscade qui surgit de la brume, un phénomène atmosphérique inattendu, l'apparition d'une créature rare. Aucun de ces accents n'est anodin : chacun colore la session d'un joueur d'une intensité particulière. C'est ce générateur qui empêche le monde, à l'échelle de l'heure, de devenir prévisible.

### 9. TraceGenerator — les ruines comme dépôts d'Ères mortes

> *« Toute Ère qui s'achève dépose quelque chose. Une fissure dans une muraille, un autel à demi recouvert de mousse, un mot inscrit sur une pierre que plus personne ne lit. Ce sont les ruines des saisons d'avant. Et c'est par elles qu'on sait, longtemps après, qu'elles ont existé. »*
>
> *— Chroniqueur des Ères*

Le TraceGenerator est, philosophiquement, le plus poignant des douze. Lorsqu'une Ère s'achève, il décide **quelles cicatrices déposer** dans le monde — quels overlays visuels, quels lieux nouveaux, quelles entrées de codex, quels monuments. Certaines traces durent une Ère, d'autres toute la Partie, d'autres au-delà d'un Grand Souffle. C'est par lui que le monde se **stratifie temporellement** — qu'il devient, au fil des saisons, un palimpseste où chaque couche d'Ère laisse sa marque sur celles d'en dessous. Voir [[Traces des Ères]] pour le détail narratif.

### 10. ItemModifierGenerator — les affixes comme résonances temporaires

Un item n'est pas seulement ce qu'il est intrinsèquement ; il est aussi **ce que l'Ère lui ajoute**, le temps qu'elle dure. Une lame forgée sous le Voile gagne, sous le Voile, un éclat particulier — une aura de Noctis qui la fait résonner avec la voix dominante. Au Souffle suivant, cette aura s'éteint : la lame reste, mais sa résonance change. L'ItemModifierGenerator est la couche par laquelle les objets **respirent avec le monde**, sans pour autant changer de substance. C'est, à l'échelle de l'inventaire, la traduction de la promesse du Souffle : *ce qui est mémoire reste, ce qui est puissance se rejoue*.

### 11. PlantDecorationGenerator — la végétation comme témoin

La forêt n'est pas la même sous le Verdoiement et sous le Sommeil de Glace. Le PlantDecorationGenerator pilote le PCG du moteur — densités de foliage, choix de pousses, props secondaires, palette de teintes. Sans intervention humaine. C'est la couche par laquelle l'**écosystème végétal témoigne** de la saison cosmique en cours : les fleurs prolifèrent ou s'éteignent, les troncs morts s'accumulent ou disparaissent, le sous-bois s'éclaircit ou s'épaissit. Le joueur ne regarde pas ce générateur ; il regarde la forêt. Et il voit, sans qu'on lui dise, que la forêt n'est plus celle d'hier.

### 12. BehaviorGenerator — l'IA comme expression d'un mood

Les comportements détaillés sont écrits à la main — un BehaviorTree, ça se compose, ça se teste, ça se débogue. Mais le **choix** du comportement, à un moment donné, pour une créature donnée, dans une Ère donnée, revient au BehaviorGenerator. Un loup, sous une Ère d'Effroi haute tension, prendra son profil agressif en meute d'embuscade. Le même loup, sous une Ère de Floraison apaisée, prendra son profil de patrouille lente et indifférente. C'est par ce générateur que l'**IA devient l'expression d'un mood** — pas seulement d'une fonction. La créature ne change pas de cerveau ; elle change d'humeur. Comme le monde autour d'elle.

---

## L'orchestration — comment les douze conversent

> *« Aucun générateur ne travaille seul. C'est leur conversation, plus que leur travail individuel, qui produit le monde. »*
>
> *— Chroniqueur des Ères*

On a parlé des douze générateurs comme s'ils étaient des entités isolées. C'est une commodité pédagogique ; la réalité est plus tissée. Chaque générateur **consomme la sortie** d'autres générateurs et **alimente** ceux qui viennent après. L'EraGenerator déclenche tout — il publie la configuration cosmique nouvelle, et les onze autres l'écoutent. Le MaterialGenerator publie la liste des matériaux disponibles ; le RecipeGenerator la consomme pour calculer les recettes craftables. Le VariantGenerator publie le pool actif de variants ; le LootGenerator y puise pour décider de l'empreinte d'une créature donnée. Le TraceGenerator écoute, en fin d'Ère, ce que les autres ont produit, et dépose les cicatrices proportionnellement.

Cette **conversation** entre générateurs n'est pas un détail d'implémentation. Elle est l'**équivalent technique de la Polyphonie cosmologique**. De même que dans le monde d'Hybelior, les voix Éternelles parlent les unes aux autres et composent ensemble la tonalité présente, dans la production, les générateurs s'écoutent mutuellement et composent ensemble la cohérence du moment. Aucun ne possède la vérité de l'Ère ; chacun apporte sa part. Ce que le joueur perçoit, à la fin, est l'**émergence** de cette conversation — pas la somme de douze rendus séparés.

Cette analogie justifie une discipline d'implémentation précise : les générateurs ne se contournent pas. On ne demande pas au LootGenerator de connaître l'état d'Ère par lui-même ; il consulte ce que l'EraGenerator a publié. On ne demande pas au RecipeGenerator de deviner la liste des matériaux ; il interroge le MaterialGenerator. Cette **discipline du protocole** est ce qui maintient la conversation lisible. Quand un nouveau générateur est ajouté au système, il prend sa place dans le concert ; il ne court-circuite jamais ses voisins.

### Le moment du Souffle, vu de l'architecture

Quand un Souffle survient, l'architecture entière entre en **séquence orchestrée**. L'EraGenerator détecte le déclenchement (qu'il soit programmé ou émergent), lit ou tire la nouvelle configuration d'Ère, et publie ses six dimensions. Les générateurs de pool — Material, Variant, Recipe, NPC, Plant — recalculent leurs tables actives en consommant cette nouvelle configuration. Les générateurs continus — Quest, Event, Loot, Behavior — ajustent leurs filtres en conséquence. L'ItemModifierGenerator fait un **sweep** sur les inventaires actifs pour mettre à jour les auras temporaires. Enfin, le TraceGenerator finalise les cicatrices de l'Ère qui s'achève — déposant les traces qu'elle a méritées.

Tout cela se résout, côté serveur, en quelques secondes. Puis se diffuse aux clients via une **petite configuration** — quelques kilo-octets de JSON qui décrivent la nouvelle Ère et que chaque client utilise pour rejouer localement les mêmes générateurs avec les mêmes seeds. La transition d'Ère, vue du réseau, est presque silencieuse. Vue du joueur, elle est un événement visuel mondial — un moment où le ciel se fend et où la composition cosmique change sous ses yeux.

Cette dissymétrie — événement spectaculaire pour le joueur, transmission discrète pour le moteur — est précisément ce que l'architecture data-driven rend possible. Sans elle, chaque Souffle exigerait de transmettre des centaines de mégaoctets de nouveaux assets aux clients. Avec elle, on transmet une grammaire ; les clients composent.

---

## Tableau des douze

| # | Générateur | Couche | Fréquence d'invocation | Voix Éternelle thématiquement liée |
|---|------------|--------|------------------------|-----------------------------------|
| 1 | **EraGenerator** | B (chef d'orchestre) | À chaque Souffle | Fatum (le destin qui se reconfigure) |
| 2 | **VariantGenerator** | B | Par spawn | Spiritus (l'âme qui se pose sur la forme) |
| 3 | **MaterialGenerator** | B | Au début d'Ère | Terranu (ce que la terre consent à donner) |
| 4 | **RecipeGenerator** | B | Au début d'Ère | Eldoria (la lumière qui éclaire les savoirs) |
| 5 | **QuestGenerator** | B | Continu | Tempora (le temps qui pousse à l'action) |
| 6 | **NPCGenerator** | B | Au début d'Ère | Foedus (le lien social qui se renoue) |
| 7 | **LootGenerator** | B | Par mise à mort | Vael (l'empreinte des morts sur les vivants) |
| 8 | **EventGenerator** | B | Cycles courts | Tempora (les accents du temps qui passe) |
| 9 | **TraceGenerator** | B | Fin d'Ère | Fatum (ce que le destin laisse derrière lui) |
| 10 | **ItemModifierGenerator** | B | Par drop / par sweep | Spiritus (l'aura qui imprègne la matière) |
| 11 | **PlantDecorationGenerator** | B | Au début d'Ère | Terranu / Spiritus (la vie végétale) |
| 12 | **BehaviorGenerator** | B | Par spawn | Noctis / Eldoria selon le mood |

Aucune de ces correspondances n'est doctrinale. Les théologiens d'Hybelior en débattront sans fin — et c'est très bien. Ce qui compte, c'est que **chaque générateur a une coloration cosmologique** qui rend son rôle lisible dans la grande conversation du monde.

### Une dette envers les Cosmiques

Il faut le dire : ces douze générateurs ne couvrent pas tout. Certaines voix Cosmiques — celles dont la trace dans le tissu du monde est plus diffuse, plus oblique — exigent des dispositifs qui débordent la liste canonique. Le **temps cyclique**, la **météo**, les **saisons astronomiques** ne sont pas chacun un générateur ; ils sont une **trame** qui traverse les douze. C'est délibéré. Tout n'est pas un générateur ; certains aspects du monde sont mieux servis par des systèmes de simulation continue qui se contentent de moduler, en aval, ce que les générateurs produisent.

Cette modestie de l'architecture est elle-même cosmologiquement juste. La Polyphonie d'Hybelior ne se réduit pas à douze voix ; elle en a davantage, et plusieurs encore qu'on n'a pas nommées. Pareillement, l'architecture data-driven ne se réduit pas à ses douze générateurs ; elle s'augmente de systèmes auxiliaires, de modulations transverses, de couches d'ambiance — tout ce qui fait que, dans le jeu fini, on ne sent jamais la couture entre ce qui est "généré" et ce qui est "simulé". Le tissu paraît continu. C'est qu'il l'est, malgré ses étapes de fabrication distinctes.

---

## La conséquence productive

> *« On nous a demandé combien il fallait d'artistes pour produire cent créatures distinctes. Nous avons répondu : autant qu'il en faut pour produire dix vraies créatures, et un peu plus pour produire dix vraies voix. Le reste, c'est de la combinatoire — et la combinatoire est gratuite. »*
>
> *— Maître Garven d'Orelth*

Tout cela ne serait qu'un raffinement philosophique sans une conséquence productive massive : **la production scale en O(A+B) au lieu de O(A×B)**. Si l'on a cinquante créatures dans la Couche A et dix variants visuels dans la Couche B, on obtient cinq cents créatures perçues — sans avoir produit cinq cents modèles. Ajouter un onzième variant ne coûte pas cinquante nouvelles créatures à produire ; il coûte un variant, et **les cinquante créatures de Couche A s'enrichissent automatiquement** de ce nouveau visage possible.

Ce n'est pas un trick d'ingénieur. C'est une **décision éthique** déguisée en équation. Un monde fini en dur, où chaque variation aurait dû être produite à la main, serait condamné à deux choses : ou bien à rester pauvre (par manque de moyens), ou bien à devenir un MMO de blockbuster où le studio brûle ses équipes pour produire chaque saison à la pelle. Hybelior refuse ce dilemme. La combinatoire est notre manière de tenir notre promesse : *un monde qui respire, sans que ses créateurs s'épuisent à la respirer pour lui*.

Cette discipline a une face cachée : elle impose une **retenue** sur la création coûteuse. Quand un designer dit "il faudrait un nouveau dragon de feu pour cette Ère", la première question est : *peut-on l'obtenir avec un variant et un comportement modulé sur un mesh existant ?* Neuf fois sur dix, oui. La dixième fois — celle qui produit l'événement vraiment iconique — on investit. Mais on l'investit en sachant qu'on a la liberté de le faire **parce que** les neuf autres fois, on ne l'a pas fait.

### Investir la Couche A plutôt que multiplier les instances

Une conséquence opérationnelle de cette discipline est simple à énoncer, exigeante à tenir : *pour rendre les Ères plus distinctes, on n'écrit pas plus d'instances ; on investit Couche A et B*. Un nouveau shader maître, ajouté à la banque, multiplie la combinatoire de toutes les Ères futures. Un nouveau template de quête enrichit toutes les saisons qui suivront. Un nouveau preset atmosphérique colore tout ce qui se passera sous lui. **Chaque ajout à la base agit comme un multiplicateur, pas comme une addition.** Cette logique est l'inverse de celle qu'imposent les MMO de blockbuster, où l'on produit chaque saison son lot d'assets jetables qui ne servent qu'une fois. À Hybelior, ce qu'on produit doit servir à plus d'une Ère ; sinon, on ne le produit pas.

Cette règle se vérifie dans les chiffres. Un variant supplémentaire en Couche A — disons un onzième variant visuel — coûte une à deux semaines d'un artiste senior. Mais ces deux semaines, une fois investies, **enrichissent toutes les créatures du bestiaire** d'un visage nouveau possible. Cinquante créatures × un nouveau variant = cinquante nouvelles instances perçues, pour deux semaines de travail. La même somme de travail, dépensée à produire une créature unique, donnerait une instance unique. Le ratio est de un à cinquante — et il augmente à chaque créature qu'on ajoute par ailleurs à la Couche A.

### La discipline du non

Mais cette mathématique de l'investissement n'est pas la partie la plus difficile. La partie la plus difficile, c'est la **discipline du non**. Dire à un designer enthousiaste : *non, cette Ère n'aura pas son dragon unique*. Dire à un narrateur ambitieux : *non, cette quête principale ne mérite pas une cinématique scénarisée ; un événement modulé suffira*. Dire à un artiste talentueux : *non, ne produis pas ce mesh ; trouve la combinaison de variants qui donnera la même impression*. Ces "non" sont, pour beaucoup, plus difficiles à porter que les "oui". Mais ils sont ce qui permet aux "oui" rares de **compter vraiment**. Quand, une fois dans une Partie, on dit oui à un investissement Tier 3 — un nouveau modèle iconique, une cinématique signée, une trace géologique majeure — ce oui retentit. Il retentit parce qu'on a su, mille fois auparavant, dire non.

---

## Conventions de nommage et discipline d'écriture

> *« Donne un nom propre à ce qui mérite un nom propre. Donne un nom de catégorie à ce qui sert à composer. Et ne confonds jamais les deux. »*
>
> *— Cahiers de la Forge, livre I*

L'architecture data-driven ne tient que si elle est lisible. Et la lisibilité, à cette échelle, est une affaire de **conventions**. Hybelior s'est doté d'une discipline d'écriture qui se respecte sans exception, parce qu'elle est ce qui permet à un designer entrant dans le projet en cinquième année de comprendre ce qu'il lit en quelques minutes.

Le **préfixe** marque la nature du contenu. `HW_` pour les data tables du jeu (Hybelior World). `M_` pour les materials. `NS_` pour les Niagara systems. `BT_` pour les behavior trees. Le préfixe n'est pas un caprice d'archiviste — c'est ce qui permet, à l'œil nu, de savoir à quelle **couche** appartient ce qu'on regarde.

Le **slug** est en minuscules, séparé par des underscores. `iron_shadow` plutôt que `Iron-Shadow` ou `IronShadow`. Cette uniformité paraît mineure ; elle est en réalité ce qui rend possible la composition automatique des chemins, des références croisées, des recherches dans le repository. Une seule majuscule mal placée, et un pipeline d'import casse.

La **séparation par domaines** organise les data tables en sous-arbres clairs : `Combat/`, `World/`, `Lore/`, `Economy/`, `Cosmologie/`. Chaque domaine a ses gardiens implicites. On ne mélange pas les recettes de craft avec les behavior trees. On ne range pas les variants visuels dans le dossier des dialogues. Cette séparation n'est pas une rigidité administrative — c'est la **carte mentale partagée** qui permet à plusieurs auteurs de travailler ensemble sans se marcher dessus.

> [!info] Une discipline qui se voit peu
> Ces conventions ne sont jamais visibles dans le jeu fini. Le joueur ne voit pas que la créature qu'il combat s'appelle `HW_Creature_Wolf_Base` dans la data table. Mais sans cette discipline, le studio aurait depuis longtemps cessé de comprendre ce qu'il fabrique. La lisibilité interne est une condition de la cohérence externe.

### Le préfixe comme déclaration ontologique

Choisir un préfixe, ce n'est pas une décision technique parmi d'autres. C'est une **déclaration ontologique**. Quand on écrit `HW_Variant_Shadow`, on dit explicitement : *ceci est un objet qui appartient à Hybelior World, qui est de la classe des variants visuels, et qui porte la signature Shadow*. Cette explicitation est ce qui permet à un développeur, un designer, un artiste, de comprendre ce qu'il a sous les yeux sans avoir à ouvrir le fichier. Le préfixe est une promesse de catégorie ; il est respecté ou il ne l'est pas, et son non-respect a des conséquences en chaîne.

Cette discipline s'étend aux **versions cosmologiques** mentionnées plus haut. Une recette créée sous l'Ère du Voile portera un marqueur `era:voile_03` qui dira, pour toujours, dans quelle configuration elle est née. Ce marqueur ne sert à rien dans 99% des cas — la recette se comporte normalement. Mais le jour où, deux ans plus tard, un designer voudra comprendre pourquoi cette recette existe, il regardera le marqueur et lira : *« ah oui, elle vient du Voile, c'est pour cela qu'elle a cette aura »*. La traçabilité est, dans le temps long, un acte de respect envers nos futurs nous-mêmes.

---

## Lisibilité publique et secrets cachés

> *« Tout ce que le monde fait est lisible. Mais tout ce qui est lisible n'est pas dit. Cette distinction est ce qui fait, à Hybelior, qu'on continue à découvrir des choses après mille heures de jeu. »*
>
> *— Maître Garven d'Orelth*

Une question délicate se pose, à propos de toute architecture paramétrique : *jusqu'où documente-t-on, côté joueur, ce que fait le système ?* Si on documente tout, le mystère meurt — chaque joueur connaît la formule exacte de chaque drop, la condition exacte de chaque déclenchement, la composition exacte de chaque Ère. Si on ne documente rien, le système devient opaque — le joueur a l'impression de subir un caprice de la machine, sans pouvoir y répondre.

Hybelior choisit, comme toujours, une troisième voie. Le studio maintient **deux registres** soigneusement distingués.

### Le registre public — ce qui peut s'apprendre en jeu

Tout ce qui constitue les **règles générales** de fonctionnement du monde est publiquement apprenable. Un joueur attentif, en quelques semaines de jeu, comprendra que le Souffle existe, que les Ères ont une dominante et une secondaire, que certains items perdent leur aura au Souffle suivant, que les variants visuels sont mappés sur la cosmologie. Cette compréhension n'est pas cachée derrière un wiki extérieur ; elle est tissée dans le jeu lui-même — par les dialogues des PNJ, les enseignements des Oracles et des Astronomes, les annotations des marchands, les chants des bardes. Le monde **se raconte** à qui veut bien l'écouter.

Cette transparence des règles générales est une **dignité offerte au joueur**. Hybelior ne joue pas le mystère gratuit. Le joueur a le droit de comprendre comment fonctionne le monde dans lequel il vit. Cette compréhension est même ce qui lui permet de **prédire**, d'**anticiper**, de **se préparer** — et donc de devenir un acteur du monde plutôt qu'un consommateur passif. Le savoir n'est pas un piège ; il est une condition de la participation.

### Le registre caché — ce qui se découvre par tâtonnement

Mais à l'intérieur de ce cadre public, beaucoup de choses demeurent **secrètes** — pas par mauvaise foi du studio, mais parce que leur découverte fait partie du jeu. Les **recettes débloquées par interactions précises**, que seuls quelques artisans senior trouvent par tâtonnement. Les **critères de déclenchement** de certains événements signature. Les **probabilités exactes** de drop ou de spawn. Les **conditions de résurgence** d'Eldoria, qui annoncent un Grand Souffle. Les **traces permanentes** dont l'apparition dépend de comportements collectifs joueurs.

Cette opacité n'est pas un défaut de documentation. C'est une **mécanique en elle-même**. Le mystère, à Hybelior, est ce qui transforme l'exploration en aventure véritable. Si tout était documenté, le joueur saurait quoi faire pour obtenir tel résultat — et l'obtention ne serait plus qu'une formalité. En laissant des zones d'ombre, on rend la **découverte** précieuse. Le premier joueur qui débloque une recette cachée porte, dans la communauté, une trace que personne ne lui retire. Sa découverte enrichit le savoir collectif. Et le savoir collectif, à son tour, devient un patrimoine culturel d'Hybelior — quelque chose que les anciens transmettent aux nouveaux, comme on transmet une tradition.

> [!warning] Discipline du studio
> Ce qui est documenté côté joueur ne doit jamais inclure la liste exhaustive des paramètres. Le mystère est une mécanique, pas un oubli. Quand un designer publie un patch note, il dit *ce qui change*, pas *les chiffres exacts qui le pilotent*. Cette retenue est une discipline collective ; elle se perd si on n'y veille pas.

### Le contrat implicite avec la communauté

Cette dualité — règles publiques et secrets cachés — repose sur un **contrat implicite** avec la communauté. Le studio dit, en substance : *« nous vous donnons les règles générales ; vous découvrez les particularités. Nous ne vous mentirons pas sur les mécaniques ; mais nous ne vous dirons pas tout. »* Ce contrat est inhabituel dans le MMO contemporain, où la tendance est plutôt à la transparence totale (datamining accepté, wiki exhaustifs, leaderboards de drop rates). Hybelior parie l'inverse : une **opacité légitime**, qui n'humilie pas le joueur (il connaît le cadre) mais qui ne le prive pas de son droit à découvrir (il ne connaît pas tout).

L'architecture data-driven est ce qui rend cette opacité tenable. Parce que les conditions cachées sont nombreuses, dispersées dans des générateurs distincts, modulées par des paramètres croisés, **personne — pas même le studio — ne peut prétendre les connaître toutes en mémoire**. Le système devient, en un sens, **plus grand que ses créateurs**. C'est, paradoxalement, ce qui le rend honnête : il n'est pas une farce où le studio fait semblant de ne pas savoir ce qu'il a programmé. Il est une création qui dépasse, par sa propre combinatoire, ce que tout esprit individuel peut tenir entièrement.

> *« Nous avons écrit le système. Mais le système, à force, nous échappe — au sens où il produit des configurations que nous ne connaissons pas par cœur. C'est cette part qui nous échappe qui rend Hybelior habitable. Un monde que ses créateurs maîtrisent intégralement n'est pas un monde, c'est une horloge. »*
>
> *— Maître Garven d'Orelth*

---

## Le pipeline d'import — du YAML au runtime

> *« Le designer écrit en YAML. Le pipeline traduit en data table. Le runtime résout en instance. Trois étapes, trois métiers, trois langages. Et le joueur, lui, voit une biche dans la clairière. »*
>
> *— inscription au mur de la salle de production, Astravia*

Le workflow d'auteur, à Hybelior, suit une chaîne courte mais nette. Le **designer** écrit en YAML — un format texte simple, lisible, versionnable. C'est dans ce langage qu'il compose une Ère, qu'il définit un variant, qu'il décrit une recette. Le YAML est son atelier ; il y travaille sans toucher au moteur.

Le **pipeline d'import** traduit ce YAML en **DataTable Unreal** — la structure interne que le moteur sait consommer. Cette traduction est automatisée, idempotente, et se rejoue à chaque modification. Le designer ne voit jamais la DataTable directement ; il voit son YAML, et il fait confiance au pipeline pour faire le pont.

Le **runtime** — l'EraGenerator et ses onze frères — lit ces DataTables au moment où il en a besoin, et résout les instances. C'est là que la composition cosmologique a lieu : le runtime croise l'archétype, le variant, l'état d'Ère, et produit ce que le joueur perçoit.

Cette chaîne en trois étapes a une vertu cachée : elle **sépare les responsabilités**. Le designer peut écrire sans craindre de casser le moteur. Le pipeline peut évoluer sans imposer au designer d'apprendre le C++. Le runtime peut être réécrit sans toucher au format d'auteur. Chaque couche peut **muer** sans que les autres aient à muer avec elle.

> Pour le détail technique de ces flux — schémas exacts de DataTables, format YAML précis, séquences d'import — voir la spec en [[Architecture Data-Driven]] (05 - Implémentation Unreal).

---

## Versioning et rétro-compatibilité au Souffle

> *« Une DataTable ne meurt pas entre les Ères. Elle **mue**. Comme un serpent. Comme un musicien qui change de tessiture. Comme une voix qui, sans cesser d'être elle-même, apprend à dire autre chose. »*
>
> *— Chroniqueur des Ères*

Une question revient toujours : si le monde se recompose à chaque Souffle, qu'arrive-t-il aux données du joueur ? À ses items forgés sous l'Ère précédente ? À ses recettes apprises ? À ses cosmétiques d'une saison morte ?

La réponse est philosophique avant d'être technique. Les DataTables, à Hybelior, **ne meurent pas** au Souffle. Elles **muent**. Un item forgé sous le Voile garde sa signature de Voile — son nom, son origine, son histoire — même quand le Voile s'est éteint depuis trois Ères. Ce qui change, c'est la résonance présente : l'aura saisonnière s'éteint, certains bonus contextuels disparaissent, mais l'objet en lui-même demeure. Il devient une **relique d'Ère** — un témoin matériel d'une saison qui n'est plus.

Cette continuité est garantie par une discipline de versioning stricte. Chaque DataTable porte une **version cosmologique** — un marqueur qui dit : *cette entrée a été créée sous telle configuration*. Quand un Souffle survient, les nouvelles entrées s'ajoutent sans écraser les anciennes ; les anciennes restent **lisibles**, simplement non actives dans le pool présent. Un Fer-Solaire forgé sous une Ère d'Eldoria ne disparaît pas quand Noctis prend la parole ; il devient juste inminable, et son aura solaire s'amortit. La trace persiste.

Cette discipline est ce qui permet, après plusieurs années de Partie, de retrouver dans le coffre d'un vétéran des objets de quatre Ères différentes, chacun avec sa signature, chacun avec son histoire. Le monde se recompose ; **la mémoire matérielle, elle, ne se recompose pas**. Elle s'enrichit.

### Les Ères mortes ne sont pas effacées

Il faut le dire avec netteté : à Hybelior, **rien de ce qui a existé sous une Ère n'est purgé** lorsque l'Ère s'achève. Les recettes apprises restent inscrites dans les carnets de leurs apprenants — même si elles ne sont plus craftables. Les noms des PNJ rencontrés, des lieux visités, des événements traversés demeurent dans les journaux. Les items continuent d'exister, simplement modifiés dans leur résonance. Cette persistance n'est pas une indulgence du moteur ; c'est une **doctrine de mémoire**. Un monde qui efface ce qu'il a été à chaque tournant ne peut pas devenir un monde habité. Hybelior tient au contraire le pari inverse : *plus le monde dure, plus il s'épaissit*.

Cette épaisseur a un coût technique modéré — il faut stocker, il faut versionner, il faut tenir des index qui n'oublient pas. Mais ce coût est proportionnel au **temps vécu**, pas au temps écoulé. Une Partie de deux ans n'accumulera pas une dette de données monstrueuse, parce que la majorité des instances reste éphémère. Seules les **traces**, les **œuvres signées**, les **savoirs acquis** s'inscrivent durablement. Tout le reste — les milliers de loups affrontés, les centaines de quêtes secondaires accomplies, les milliers de PNJ croisés — s'évanouit dans la statistique du joueur, comme nos propres journées s'évanouissent dans notre souvenir vague. Ce qui demeure, c'est ce qui mérite de demeurer. Le reste a passé. Et c'est exactement comme cela qu'une mémoire vivante fonctionne.

---

## La tension entre cosmologie et production

> *« Le danger n'est pas technique. Le danger est qu'on permette tant de combinaisons que le monde, à force, perde sa voix. Un générateur qui ne sait pas refuser n'est plus un générateur. C'est un dé. »*
>
> *— Maître Garven d'Orelth, Cahiers de la Forge, livre III*

Il faut le dire honnêtement : l'architecture data-driven est une promesse exigeante. Le danger réel n'est pas que le système soit incapable de produire de la variété — il l'est, immensément. Le danger est qu'il en produise **trop**, et que cette surabondance dilue la voix du monde.

Un générateur de quêtes qui combinerait librement n'importe quel template avec n'importe quel PNJ et n'importe quel objet produirait, certes, un nombre stupéfiant de quêtes différentes. Mais beaucoup seraient **incohérentes** — un aubergiste demandant à un héros de pourchasser un dragon, ou une recette demandant des matériaux qui ne devraient pas coexister dans la même Ère. Le générateur doit savoir **refuser** certaines combinaisons. Plus exactement : il doit connaître la cosmologie assez intimement pour ne proposer que des combinaisons qui ont du sens dans la voix du monde présent.

Cette connaissance prend la forme de **contraintes cosmologiques** : règles de compatibilité entre voix, exclusions automatiques quand une Éternelle dort, restrictions liées au mood de l'Ère, blocages de templates inadaptés à la tension présente. Ces contraintes ne sont pas des limitations honteuses qu'on cache au designer ; elles sont, au contraire, **l'âme du générateur**. C'est par elles qu'il devient un compositeur plutôt qu'un dé. C'est par elles que la combinatoire infinie reste **lisible** comme un monde, plutôt que de devenir le bruit blanc d'un chaos paramétrique.

La tâche du designer, dans cette architecture, est de **calibrer cette tension**. Trop de contraintes, et le monde redevient pauvre — les Ères se ressemblent, les rencontres deviennent prévisibles. Trop peu, et le monde se dissout — chaque session devient une expérience inédite mais désorientée. L'art, c'est de tenir le **point d'équilibre**, et cet art se cultive saison après saison, comme on cultive son oreille musicale. Aucun pipeline ne le remplace.

> *« Ce n'est pas la combinatoire qui produit un monde. C'est la combinatoire **disciplinée par une cohérence narrative**. Sans cette discipline, on n'a qu'un générateur ; avec elle, on a Hybelior. »*
>
> *— Sœur Lirevin, archiviste de la Forge*

### Le rôle des règles de cohérence cosmologique

Concrètement, ces contraintes prennent la forme de **règles de cohérence cosmologique** inscrites dans les générateurs eux-mêmes. Quelques exemples, énoncés sans prétendre à l'exhaustivité :

- *Une voix endormie n'alimente pas le pool présent.* Si Eldoria dort, le MaterialGenerator refusera de proposer Fer-Solaire, le VariantGenerator écartera la teinte Dorée, le QuestGenerator ne tirera pas de templates dont l'aura est solaire. Cette exclusion n'est pas une punition pour le joueur ; c'est une **conséquence ontologique**. La voix dort ; ses effets dorment avec elle.
- *Deux voix antagonistes ne dominent pas en même temps.* Noctis ne peut pas être dominante et Eldoria secondaire simultanément ; ce serait une dissonance cosmique inadmissible. Le générateur d'Ères refuse, par construction, ces configurations contradictoires.
- *Une voix Cosmique blessée ne se rétablit pas par décret de l'algorithme.* Tempora, si elle est blessée dans le canon narratif présent, restera blessée jusqu'à ce qu'un événement scénarisé en décide autrement. Aucun roll aléatoire ne remettra une Cosmique en pleine santé.
- *Le mood d'une Ère filtre les templates de quêtes.* Une quête comique ne sera pas tirée sous un mood d'Effroi. Une quête de pèlerinage solaire ne sera pas générée sous Noctis dominante. Le QuestGenerator vérifie la **compatibilité tonale** avant de proposer une instance.

Ces règles, additionnées, font que le générateur n'est pas une boîte aléatoire. Il est un **compositeur sous contraintes** — comme un musicien de jazz qui improvise, mais dans la grille harmonique d'un morceau précis. La liberté est réelle ; elle est encadrée. C'est cet encadrement qui produit la **lisibilité** du monde, et la lisibilité est ce qui sépare un cosmos d'un chaos.

### Quand une contrainte se révèle absente

Il arrive — c'est le risque assumé — qu'une contrainte manquante se révèle au playtest. Une combinaison apparaît qui n'aurait pas dû apparaître, et brise la cohérence d'une scène. Un PNJ aubergiste se met à parler d'un événement qui ne s'est pas produit. Une recette débloquée propose un matériau qui ne devrait pas exister dans l'Ère présente. Ces accidents arrivent, et leur diagnostic est révélateur : à chaque fois, ils pointent vers une **règle implicite** qui n'a pas été écrite. L'architecture data-driven, en ce sens, est un système qui **apprend de ses erreurs** — chaque incohérence détectée s'inscrit comme une nouvelle contrainte explicite, et le générateur en sort plus sage qu'auparavant.

C'est l'une des vertus discrètes de cette architecture : elle est **améliorable** par accumulation de règles. Là où un monde fait à la main exige, pour corriger une incohérence, de retoucher chaque instance affectée, l'architecture data-driven corrige en amont — une seule règle ajoutée empêche, pour toujours, la classe entière d'incohérences dont elle relevait. C'est, sur le temps long, ce qui rend le système robuste : il converge.

---

## Ce que ce système est, ce qu'il n'est pas

> [!note] Honnêteté productive
> L'architecture data-driven n'est pas une baguette magique. Elle a ses puissances et ses limites, et il faut savoir nommer les unes et les autres.

L'architecture **ne génère pas de nouvelles formes**. Si une Ère demande une créature cosmique inédite, il faut produire un nouveau mesh — il n'y a pas de mesh à inventer dans la combinatoire. Ce que l'architecture sait faire, c'est faire **vivre différemment** les formes existantes. Si la Couche A est pauvre, les générateurs sont pauvres ; *garbage in, garbage out*. L'architecture **n'écrit pas la narration principale**. Les arcs de PNJ majeurs, les événements signature, les cinématiques iconiques restent écrits à la main, par une voix humaine. Ce que l'architecture module, c'est la **bande son** narrative — les dialogues d'ambiance, les quêtes secondaires, les événements de zone. La grande voix, elle, reste humaine. L'architecture **ne sait pas faire l'émotion fine**. Une réplique drôle, un instant poétique, une révélation poignante — tout cela demande une intention que les paramètres ne savent pas porter seuls. Le générateur peut **soutenir** l'émotion (en modulant le mood, en colorant la scène), mais il ne peut pas la créer ex nihilo.

Ces limites ne sont pas des faiblesses honteuses. Elles sont, au contraire, la **carte claire** des endroits où le travail humain reste irremplaçable. Loin d'amputer le projet, elles l'orientent : voilà où nous, humains, mettons notre énergie ; et voilà où nous laissons les générateurs travailler pour nous.

### Une géographie qui ne bouge pas

Un dernier point, qui mérite d'être nommé pour qu'on n'en attende pas trop : **la géographie d'Hybelior ne change pas** au gré des Souffles. Les treize continents (voir [[Géographie]]) sont figés à la heightmap près. Aucun générateur ne déplace une montagne ; aucun Souffle ordinaire ne creuse une vallée nouvelle. Cette stabilité est délibérée. Elle est ce qui permet au joueur de **conserver une carte mentale fiable** d'une Ère à l'autre — de savoir, en revenant à Caldegar après six mois d'absence, qu'il retrouvera les routes, les ports, les passages qu'il a appris.

Ce qui change, c'est tout ce qui n'est pas heightmap : la **lumière** qui frappe les pierres, le **foliage** qui couvre les sols, la **faune** qui peuple les forêts, le **mood** qui imprègne les villages, les **ressources** qui affleurent ou se cachent, les **événements** qui surgissent à la croisée des chemins. Tout cela bouge, change, respire. Et la sensation, pour le joueur, est saisissante : *l'endroit est le même, et l'endroit a changé*. C'est, dans la production technique, l'exacte équivalente de la promesse cosmologique du Souffle : *ce qui est mémoire reste, ce qui est puissance se rejoue*. La carte mentale est mémoire. L'apparition sensible est puissance.

Seul un événement très rare — un **Souffle Cardinal**, à l'échelle des âges, hors d'une Partie joueur — peut reconfigurer la géographie elle-même. Mais cet événement est si rare, si lourd narrativement, qu'il sort du cadre de l'architecture ordinaire. Quand il advient, on ne le génère pas : on l'écrit, à la main, comme on écrit une page d'histoire.

---

## Pourquoi cette architecture est philosophiquement nécessaire

Si l'on devait dire en une phrase pourquoi Hybelior, dès le premier jour, a choisi cette architecture plutôt qu'une autre, ce serait celle-ci : *un monde fini en dur ne peut pas vraiment respirer*. Un monde dont chaque créature, chaque quête, chaque objet, chaque dialogue est inscrit dans le marbre à la sortie, et ne change plus jamais, peut être beau — il peut même être magnifique — mais il ne respire pas. Il **dure**. Et le durer, à Hybelior, n'est pas ce qu'on cherche.

L'architecture data-driven est ce qui permet au monde de tenir sa promesse cosmologique. La promesse du Souffle (voir [[Le Souffle]]) — *le monde respire, à intervalles que les mortels ne maîtrisent pas*. La promesse des Ères (voir [[Les Ères]]) — *aucune Ère ne se répète tout à fait ; chacune nous demande d'apprendre à nouveau le poids du jour*. La promesse de l'Accord (voir [[L'Accord]]) — *tu n'es pas grand parce que tu es ancien dans le monde ; tu es grand parce que tu t'accordes au monde tel qu'il est*. Toutes ces promesses, dans un monde fait à la main puis figé, seraient **invérifiables**. Le joueur les lirait dans la documentation, mais ne les éprouverait pas dans son corps. La cosmologie serait un décor, et tout décor finit par se voir tel qu'il est : posé, faux, mort.

Avec l'architecture data-driven, ces promesses deviennent **éprouvables**. Le monde respire parce qu'il *peut* respirer — parce qu'à chaque Souffle, douze générateurs reconfigurent ses couleurs, ses sons, ses créatures, ses recettes, ses humeurs. L'Ère est différente parce qu'elle l'est *mécaniquement*, pas seulement dans le texte d'un patch note. Le joueur qui revient à Caldegar après six mois sent qu'il n'est plus le même endroit, alors que la heightmap n'a pas bougé d'un mètre — parce que **tout ce qui n'est pas heightmap** a bougé : la lumière, la faune, la végétation, le mood des PNJ, les ressources, les quêtes, les événements.

### Le serment cosmologique honoré dans le code

On peut aller plus loin. On peut dire que cette architecture est, à proprement parler, **le serment cosmologique inscrit dans le code source**. Quand un développeur ouvre le projet et lit l'EraGenerator, il ne lit pas seulement du C++ ; il lit, sous une autre forme, ce que disent les Chroniqueurs des Ères dans le livre des temps. Quand un designer écrit en YAML une nouvelle configuration d'Ère, il ne saisit pas seulement des paramètres ; il **compose une saison cosmique**, exactement comme un théologien d'Hybelior composerait une lecture du monde présent.

Cette identité entre le geste technique et le geste cosmologique n'est pas un hasard heureux. C'est ce que nous avons cherché. Nous avons voulu un projet où **l'ingénieur, l'artiste, le designer, le narrateur** servent la même promesse — chacun dans son langage, mais tous dans la même direction. L'architecture data-driven est ce qui permet cette convergence. Sans elle, chacun aurait fini par travailler dans son coin, en espérant que la couture finale tiendrait. Avec elle, la couture est dans la structure même du projet : elle est ce que nous fabriquons, à chaque ligne de code, à chaque YAML, à chaque mesh.

### Ce que la philosophie change concrètement

Quelqu'un pourrait dire : *tout cela est très beau, mais à quoi est-ce que cela change, concrètement, le jeu fini ?* La réponse tient en trois faits observables. **Premièrement**, l'architecture permet de tenir un monde réellement varié sans s'épuiser à le produire à la main, ce qui veut dire que le studio survit. Un studio mort, c'est un monde figé ; nous voulons un studio qui dure, parce que nous voulons un monde qui dure. **Deuxièmement**, l'architecture permet de répondre rapidement aux signaux du jeu vivant — un Souffle imprévu, une condition cachée déclenchée par les joueurs, une dérive de l'économie qui demande une correction. Là où un monde fait à la main mettrait des mois à corriger, l'architecture data-driven corrige en quelques heures. **Troisièmement**, l'architecture rend le jeu *honnête*. Ce que nous promettons dans le lore, nous le tenons mécaniquement. Pas de fossé entre la fiction et la mécanique. C'est, à notre sens, la plus grande rareté.

Cette cohérence entre **ce qu'on dit du monde** et **ce que le moteur en fait** est rare. La plupart des MMO promettent un monde vivant et livrent un monde figé décoré de patches saisonniers. Hybelior parie l'inverse : un monde dont la **structure productive elle-même** porte la promesse de vie. Si nous y arrivons, ce sera parce que nous avons accepté, dès le premier jour, que la forme du contenant honore la forme du contenu.

> *« Un monde qui se recompose ne peut pas être en dur. Cette phrase, qui ressemble à un slogan, est notre serment de production. »*
>
> *— Maître Garven d'Orelth, dernière page des Cahiers de la Forge*

---

## Trois portraits de la production

> *« Pour comprendre ce que cette architecture change vraiment, il faut regarder ce que font, à Hybelior, ceux qui la servent. Trois métiers, trois rapports au monde, trois manières de respirer avec lui. »*
>
> *— Maître Garven d'Orelth*

Pour rendre cette architecture moins abstraite, il faut imaginer ceux qui la pratiquent. Trois portraits, trois rapports différents au système data-driven.

### L'artiste de Couche A — celui qui pose les fondations

Lyana est artiste senior à la Forge d'Astravia. Elle a, ces six derniers mois, produit trois nouveaux meshes de créatures — un grand cerf, un oiseau-pêcheur lacustre, un fauve montagnard inédit. Elle ne sait pas dans quelle Ère ils apparaîtront en premier. Elle ne sait pas quels variants leur seront appliqués. Elle ne sait pas si le grand cerf sera, l'an prochain, un cerf paisible ou une apparition spectrale. Et c'est exactement parce qu'elle ne le sait pas qu'elle peut bien faire son travail. Son cerf doit être un **bon cerf** — anatomiquement juste, animé proprement, riggé pour accepter n'importe quel shader. Son cerf doit être prêt à être habillé de mille manières, parce qu'il le sera. Quand elle finit un mesh, elle le pose comme on pose une pierre dans une cathédrale qu'on ne verra jamais finie. Sa fierté n'est pas qu'on le reconnaisse comme *son* cerf ; sa fierté est qu'il **dure**, qu'il **serve**, qu'il porte, dans les Ères à venir, les compositions que d'autres feront avec lui.

### Le designer de Couche B — celui qui écrit les règles

Théomar est designer système. Il ne dessine pas de quêtes individuelles. Il écrit, jour après jour, les règles du QuestGenerator — quels templates, quelles modulations par mood, quelles compatibilités, quels filtres. C'est un travail invisible : aucun joueur ne saura jamais qu'il a écrit la règle qui empêche un PNJ de proposer une quête de pèlerinage solaire sous Noctis. Mais cette règle, multipliée par les milliers de PNJ et les centaines de templates, **structure la cohérence du monde** d'une manière qu'aucune écriture individuelle de quête ne pourrait égaler. Théomar pense à son métier comme à celui d'un compositeur classique qui n'écrit pas la mélodie de chaque concert, mais qui définit la grammaire harmonique dans laquelle tous les concerts à venir auront lieu. *Une bonne règle dure des années*, dit-il. *Une quête individuelle est oubliée le mois suivant.* Et cette préférence du durable sur l'éphémère est, dans son métier, une **éthique du travail bien fait**.

### Le narrateur de cas particuliers — celui qui écrit ce qui ne peut être généré

Eslina est narratrice senior. Elle écrit les arcs de PNJ majeurs, les cinématiques signature, les événements iconiques que la communauté retient. Son travail est, en apparence, le plus traditionnel des trois — elle écrit, comme on écrivait avant les générateurs, à la main, ligne par ligne. Mais elle sait quelque chose que ses prédécesseurs des MMO classiques ne savaient pas : son travail n'a de valeur que parce que **tout le reste est généré**. Si chaque quête, chaque dialogue, chaque événement devait être écrit à la main, son travail à elle se diluerait dans un volume écrasant. Parce que le tout-venant est confié aux générateurs, ce qu'elle écrit, elle, **se voit**. Sa cinématique de la Fin du Verdoiement n'est pas perdue dans des milliers d'autres cinématiques ; elle est l'un des trois événements signature de l'Ère, et la communauté en parlera des années. *Le générateur libère ma plume*, dit-elle. *Il fait le métier que je ne voulais pas faire ; il me laisse faire celui pour lequel je suis là.*

Ces trois portraits ne sont pas seulement des descriptions de métiers. Ce sont trois manières dont l'architecture data-driven **se vit, de l'intérieur**. Trois rapports au temps long, trois rapports à la signature, trois rapports à la collaboration. Aucun ne pourrait exister sans les autres. Ensemble, ils composent la Forge d'Hybelior — ce lieu où, depuis le premier jour, on essaie de tenir ensemble la promesse cosmologique et la possibilité concrète de la servir.

---

## Le rapport au temps long

> *« Un MMO se mesure en années. Une Partie d'Hybelior dure un an ou deux. Une Ère, plusieurs mois. Un Souffle, un instant. Et tout cela se compose, sans que personne, jamais, n'ait l'impression que le temps s'aplatit. »*
>
> *— Chroniqueur des Ères, Annales d'Hybelior*

Une question revient souvent, lorsqu'on présente cette architecture : *tient-elle dans le temps ?* C'est-à-dire : un système data-driven, riche en générateurs et en variants, ne finit-il pas par se répéter ? Le joueur ne reconnaît-il pas, au bout de quelques Ères, les patterns sous-jacents ? Et si oui, la promesse cosmologique ne s'effondre-t-elle pas — révélant, sous la polyphonie, une mécanique combinatoire ennuyeuse ?

La réponse est nuancée. **Oui**, sur le très long terme, un joueur attentif finit par lire la grammaire. Il reconnaît qu'une Ère de Noctis avec Umbra produit telle ambiance, et qu'on en a déjà vu une variante il y a deux ans. **Non**, cette reconnaissance ne ruine pas l'expérience — au contraire, elle l'enrichit. Le joueur ancien à Hybelior n'est pas celui qui voit toujours du nouveau ; c'est celui qui **lit le monde plus profondément** parce qu'il en a vu plusieurs versions. Comme un musicien qui a écouté cent symphonies n'entend pas la cent unième de la même manière qu'un débutant — non parce qu'il s'ennuie, mais parce qu'il **comprend ce qu'il entend**.

L'architecture data-driven est conçue pour récompenser cette lecture profonde. Les conditions cachées 🔒, les traces d'Ères mortes, les recettes anciennes redevenues utiles quand une voix oubliée se réveille, les corrélations subtiles entre événements collectifs et déclenchements de Souffles — tout cela est invisible au joueur débutant. Mais le vétéran, lui, en perçoit les fils. Il devient capable de **prédire** ce qui vient, non parce qu'on lui a donné la formule, mais parce qu'il a appris à entendre la voix du monde présent. C'est, pour Hybelior, l'horizon ultime de l'engagement long : *un joueur qui, après des années, lit le monde mieux que le designer qui l'a paramétré*.

### La culture communautaire comme lecture distribuée

Cette lecture n'est jamais solitaire. À Hybelior, elle est **communautaire**. Les guildes documentent les Ères qu'elles traversent. Les Oracles consignent les configurations qu'ils ont vues. Les archivistes joueurs construisent, au fil des saisons, un savoir collectif qui dépasse celui d'un individu seul. Cette documentation parallèle, écrite par les joueurs eux-mêmes, est l'une des plus belles conséquences indirectes de l'architecture data-driven : parce que le monde est **lisible** (il a une grammaire), il devient **lisable** (on peut écrire dessus), et cette écriture communautaire enrichit, en retour, l'expérience de tous.

Le studio ne contrôle pas cette documentation, et c'est très bien. Au contraire, il l'**alimente** discrètement — en laissant des conditions cachées non documentées, en posant des indices que personne ne déchiffrera seul, en variant suffisamment les configurations pour qu'il y ait toujours quelque chose à découvrir. C'est, en termes de design, l'inverse de la transparence totale : on parie sur l'**opacité partielle**, sur le mystère, sur le fait que le monde **a plus à dire** que ce qu'il dit explicitement. Et cette opacité, c'est l'architecture data-driven qui la rend tenable — parce qu'elle peut multiplier les configurations sans coût exponentiel, et donc multiplier les mystères sans dette de production.

### Pourquoi le système doit pouvoir muer

Il y a, dans le temps long, une exigence supplémentaire : **l'architecture elle-même doit pouvoir muer**. Un projet qui dure dix ans ne peut pas se contenter de l'architecture qu'il avait au lancement. De nouveaux générateurs apparaîtront. D'anciens seront refactorisés. Les contraintes cosmologiques s'affineront. Les variants se multiplieront. Et tout cela doit se faire **sans casser** ce qui a été produit.

Cette exigence est ce qui justifie, in fine, la **séparation stricte des couches**. Si la Couche A est isolée des générateurs, on peut ajouter un mesh sans toucher au reste. Si les générateurs sont isolés du runtime, on peut réécrire un générateur sans casser les autres. Si les YAML sont isolés du moteur, on peut faire évoluer le moteur sans réécrire les YAML. Chaque couche peut muer **indépendamment**, à son rythme, selon ses propres exigences. C'est cette indépendance qui rend le système robuste dans la durée — et qui transforme l'architecture data-driven, non pas en un état figé du studio, mais en un **organisme** qui apprend de ses propres saisons.

> *« Nous ne fabriquons pas un monde achevé. Nous fabriquons les conditions pour qu'un monde puisse continuer à se fabriquer après nous. »*
>
> *— Sœur Lirevin, archiviste de la Forge*

---

## Hybride humain et machine — la question du partage

Une question politique se pose, à propos de cette architecture : *qui décide vraiment ce que le monde joue ?* L'algorithme, ou l'humain qui le programme ? Si tout est généré, le designer n'est-il pas, au fond, devenu un simple opérateur de paramètres, abdiquant l'autorité créative au profit d'une machine combinatoire ?

La réponse d'Hybelior est nuancée et claire à la fois. Le partage est explicitement **hybride** : l'IA — ou plus précisément la combinatoire algorithmique — propose ; le designer dispose. L'IA peut composer un draft d'Ère en consultant l'état du monde, l'historique des Ères passées, les contraintes cosmologiques, les humeurs récentes des joueurs. Elle peut suggérer une configuration : *« sous le mood actuel, après deux Ères sombres, le monde gagnerait à passer en Floraison avec Spiritus dominante »*. Le designer regarde, juge, ajuste — ou refuse. Il garde la **main finale**, parce qu'il porte une responsabilité que l'algorithme ne porte pas : la cohérence narrative sur **l'horizon long** d'une Partie.

Pourquoi pas full-auto ? Parce qu'une IA pourrait enchaîner trois Ères sombres parfaitement justifiées par les paramètres locaux, et tuer la Partie sur le moyen terme. La sensibilité au rythme dramatique, à la fatigue émotionnelle, à la **lassitude communautaire**, est un savoir que l'algorithme n'a pas. Le designer, lui, l'a — par son expérience, son contact avec la communauté, son intuition de ce qui tient ou ne tient pas.

Pourquoi pas full-manuel ? Parce que paramétrer quatre à six Ères par Partie à la main, sur treize continents, sans assistance, serait un goulot d'étranglement insoutenable. L'IA fait le **travail mécanique** — vérification des contraintes, génération de variantes plausibles, repérage d'incohérences potentielles. Elle libère le designer du tout-venant pour qu'il puisse se concentrer sur ce qui compte : le geste de signature, le moment iconique, la décision narrative qui fera basculer l'Ère vers ce qu'elle doit devenir.

> *« L'algorithme propose. Le designer dispose. Et le joueur vit. C'est ce partage qui fait Hybelior. »*
>
> *— Maître Garven d'Orelth*

---

## Métriques de santé du système

> [!note] Indicateurs à monitorer
> Une architecture, aussi élégante soit-elle, doit prouver qu'elle tient. Hybelior monitore plusieurs indicateurs qui disent, semaine après semaine, si la promesse productive est honorée.

Sans entrer dans les chiffres exacts (voir la spec 05/), quelques **indicateurs philosophiques** méritent d'être nommés :

- **Le coût de production par Ère**. Si une Ère exige plus de cinq jours-homme de production nouvelle, c'est que la Couche B n'est pas assez riche. La solution n'est pas de produire plus en Couche C ; c'est d'investir en Couche B (ajouter un template, étoffer un générateur, écrire une nouvelle règle de modulation).
- **La part de "Tier 3" dans une Ère**. Le Tier 3 — les créations coûteuses, irréductibles à la combinatoire — doit rester minoritaire (idéalement moins d'un cinquième de l'effort total d'une Ère). Si cette part dérive vers le haut, c'est le signe que la discipline du non s'est relâchée.
- **L'identifiabilité d'une Ère par le joueur**. Au bout de cinq minutes dans une Ère donnée, un joueur expérimenté devrait pouvoir nommer la dominante, la secondaire, l'état du monde. Si cette identifiabilité est faible, c'est que les variants ne sont pas assez tranchés ou que la modulation n'est pas assez sensible.
- **La diversité perçue par session**. Sur une session moyenne, combien de variants différents le joueur a-t-il croisés ? Si la diversité est faible, c'est que le pool actif est trop restreint ; c'est un signe pour activer plus de variants en parallèle.

Ces métriques ne sont pas des KPI honteux. Elles sont la **conscience opérationnelle** de l'architecture — ce qui dit, sans qu'on ait à le demander, si la promesse philosophique est mécaniquement tenue. Un studio qui les surveille tient son serment. Un studio qui les ignore, à terme, le brise sans s'en apercevoir.

---

## Une humilité revendiquée

Il y a, dans cette architecture, une humilité qu'on revendique. Aucun système ne remplace la pensée humaine qui le compose. Aucun générateur ne devient sage par lui-même. Aucune combinatoire ne produit du sens sans qu'un auteur, quelque part, ait défini ce qu'est le sens dans cet univers. Ce que l'architecture data-driven nous donne, ce n'est pas un monde tout fait. C'est la **capacité** de tenir un monde vivant sans s'épuiser à le respirer pour lui.

Et c'est précisément cette humilité — cette reconnaissance que le système est un outil, pas une fin — qui en fait, paradoxalement, un système puissant. Un studio qui croirait avoir résolu la production par le data-driven se tromperait. Un studio qui se sert du data-driven pour libérer le temps de ses auteurs et le concentrer là où il importe vraiment — voilà ce qui peut, peut-être, fabriquer un monde qui respire.

Cette humilité est aussi une **promesse au joueur**. Quand il rencontrera, ce soir, un Loup-Ombre dans la brume de Caldegar, nous voulons qu'il ressente une présence — pas une procédure. Nous voulons que ce loup ait l'air d'avoir une vie, d'avoir choisi de surgir maintenant, d'avoir quelque chose à dire dans la voix présente du monde. Et pour que cette impression soit honnête, il faut que **derrière l'instance jetable**, il y ait un travail humain accumulé — un mesh patient, un shader cosmologiquement juste, un comportement écrit avec soin, une règle de cohérence qui veille à ce que ce loup soit bien à sa place ici. Le joueur ne verra pas ce travail. Mais il en sentira le sérieux. Et c'est ce sérieux qui transforme la combinatoire en monde.

> *« Nous n'avons pas inventé un système. Nous avons inventé une **manière de travailler** qui honore le monde que nous voulons servir. »*
>
> *— Maître Garven d'Orelth*

---

## Récapitulatif — l'essentiel en quelques propositions

> [!success] Ce qu'il faut retenir
> Les sept propositions qui résument l'architecture data-driven d'Hybelior.

1. **Le monde se compose, il n'est pas figé**. Trois couches — matières premières, générateurs, instances — qui se croisent à chaque moment du jeu pour produire ce que le joueur perçoit.
2. **Le contenu fini est petit, les règles sont nombreuses, les variations émergent**. Cette équation est la clé de tout. Elle permet la scalabilité productive, et plus profondément, elle reflète la nature polyphonique du cosmos d'Hybelior.
3. **Douze générateurs canoniques** composent la totalité du monde sensible — chacun avec un rôle philosophique propre, chacun en conversation avec les autres, chacun coloré par une voix cosmologique.
4. **L'éphémère et le permanent se complètent**. Les instances sont jetables ; les traces, les œuvres signées, les savoirs persistent. Cette dualité reflète la promesse cosmologique du Souffle.
5. **La discipline du non protège les oui rares**. Refuser la production coûteuse 99 fois sur 100 est ce qui permet, la centième fois, d'investir vraiment dans un moment iconique.
6. **L'opacité légitime fait partie du contrat**. Les règles générales sont publiques ; les conditions précises restent cachées. Le mystère est une mécanique, pas un oubli.
7. **Le système doit pouvoir muer**. Chaque couche évolue à son rythme, sans casser les autres. C'est cette modularité qui permet à l'architecture de tenir dans le temps long.

---

## Voir aussi

*Liens narratifs — la cosmologie que cette architecture sert :* [[Le Souffle]] | [[Les Ères]] | [[L'Accord]] | [[Traces des Ères]] | [[Cosmologie]] | [[Polyphonie]]

*Liens systémiques — autres pièces du dispositif :* [[Armes et Maîtrise]] | [[PNJ]] | [[Géographie]] | [[Production]]

*Implémentation technique (chiffres, formules, specs Unreal, YAML d'exemple, conventions DataTable, roadmap, métriques) :* [[Architecture Data-Driven]] dans `05 - Implémentation Unreal/Vue d'Ensemble/`
