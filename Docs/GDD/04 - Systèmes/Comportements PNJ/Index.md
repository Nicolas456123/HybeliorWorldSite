---
tags: [systemes, pnj, comportements, ia, présence, monde-vivant, narration]
status: drafted
last_review: 2026-05-12
type: system-narrative
implementation: "[[NPC System]]"
---

# Comportements PNJ — vivre sa journée, pas attendre le joueur

> *« Le mauvais PNJ attend le joueur derrière son comptoir. Le bon PNJ est déjà parti boire un verre, et il faudra l'y suivre si l'on a quelque chose à lui dire. »*
>
> *— Sennar le Vieux, conteur ambulant, taverne du Pont-Long, Mosrack*

---

## L'idée

Un comportement de PNJ, à Hybelior, ne se programme pas comme un automate. On ne décrit pas *« quand le joueur s'approche, dire telle phrase »*, on décrit *« cet homme vit ici, il a soixante ans, il forge depuis quarante, sa femme est morte il y a deux Ères et son apprenti est lent — voici comment il occupe sa journée »*. La différence est radicale. Dans le premier cas, on écrit une réaction ; dans le second, on écrit une **présence**, et la réaction n'est plus qu'une de ses conséquences possibles.

Le PNJ d'Hybelior n'attend pas. Il dort, il se lève, il déjeune, il salue son voisin, il travaille, il s'irrite contre un client, il fait une pause, il pense à sa femme, il oublie son outil, il rit d'une blague entendue la veille. Quand le joueur entre dans son champ de vision, le PNJ ne **devient pas vivant** — il l'était déjà — il **adapte simplement sa trajectoire** pour intégrer ce nouvel élément du contexte. Le joueur n'est pas le déclencheur du PNJ ; il est un parmi tant d'autres signaux que le PNJ doit lire pour décider de la prochaine seconde de sa vie.

Cette inversion fonde tout le système qui suit. Là où la plupart des MMO traitent le comportement comme **réactif** (l'IA est un répondeur), Hybelior le traite comme **autonome** (l'IA est un habitant). Les conséquences techniques et narratives sont si profondes qu'il faut un système entier pour les soutenir — et c'est ce système que cette page expose.

> *« Quand j'arrive à Veyr, je ne cherche plus les PNJ. Je laisse passer une heure, et je regarde lesquels se croisent, lesquels s'évitent, lesquels reviennent au même endroit. Ce sont eux qui m'apprennent qui parler. »*
>
> *— carnet de voyage de Maréa Sennar, Cendara*

---

## La décision PNJ — quatre voix qui parlent en même temps

Une décision de PNJ n'est pas le résultat d'un arbre de scripts plat — c'est une **conversation** entre quatre voix qui parlent en même temps, et dont l'accord ou le désaccord produit l'action suivante. Comprendre ces voix, c'est comprendre pourquoi deux PNJ placés dans la même situation peuvent agir différemment, et pourquoi un même PNJ peut agir différemment d'un jour à l'autre.

**La voix du contexte.** Quelle heure est-il, quel temps fait-il, qui est présent dans la pièce, quel est le niveau de menace, quelle est l'Ère active, quelle saison cosmique le Souffle joue-t-il en ce moment ? Le contexte est la **partition** que le monde joue autour du PNJ — il dicte une grande part de ce qui est possible. À midi, un forgeron sera plus probablement à la forge qu'à l'auberge ; un jour d'orage, il pliera peut-être l'atelier plus tôt. La voix du contexte est le rythme commun à tous les habitants d'une région.

**La voix de la personnalité.** Le contexte propose des actions, mais la personnalité **choisit parmi elles**. Un PNJ extraverti, joyeux, sociable, dans un contexte de marché animé, ira vers la foule ; un PNJ introverti placé dans le même marché restera au seuil de son étal et observera. La personnalité ne change pas avec les Ères — c'est la signature stable d'un PNJ, celle qui fait qu'on le reconnaît même après de longs mois d'absence.

**La voix de la mémoire.** Ce que le PNJ a vu, vécu, retenu — surtout les autres et notamment **toi**. Si tu lui as sauvé son neveu hier, il te tutoie aujourd'hui. Si tu lui as volé sa bourse il y a deux mois, il appellera la garde dès qu'il te verra. La mémoire est ce qui fait que les actions accumulées ont une **conséquence dans le tissu social** — pas une stat invisible, mais une attitude visible, lisible, négociable.

**La voix de la présence du joueur.** Pas pour réagir au joueur — pour le **prendre en compte** comme on prend en compte n'importe quelle entité sociale entrée dans son champ. Le PNJ n'est pas obligé de te parler. Il peut continuer son travail sans lever les yeux. Il peut détourner son chemin pour t'éviter, parce qu'il sait qui tu es. Il peut s'arrêter net parce qu'il t'attendait. Cette voix dit : *tu n'es pas central, tu es un fait*.

L'action choisie est la **résonance** entre ces quatre voix. Aucune ne décide seule. Et c'est précisément parce qu'aucune ne décide seule que les PNJ d'Hybelior produisent cette texture vivante — imprévisible mais cohérente, modulée mais reconnaissable.

> *« Demande-toi pourquoi un homme agit. Tu trouveras quatre raisons en désaccord. Voilà pourquoi il hésite avant chaque geste. »*
>
> *— Ilthani Vael, théoricienne de la Polyphonie, Cendara*

---

## Les huit piliers d'un comportement

Tout comportement de PNJ d'Hybelior repose sur huit piliers qui se composent, se modulent, s'interrompent les uns les autres. Aucun n'est suffisant à lui seul. Aucun n'est négligeable. Leur conjugaison est ce qui rend la présence **épaisse**.

### 1. Routine quotidienne

Chaque PNJ d'Hybelior a une journée. Pas une boucle scriptée d'animations qui se rejoue identique, mais un **ensemble d'intentions** qui s'expriment selon le contexte : *« vers six heures du matin, j'ai envie de me lever ; vers sept, j'ai envie de manger ; vers huit, j'ai envie d'être à l'atelier »*. Si rien ne contrarie ces intentions, elles se réalisent à peu près à l'heure. Mais si l'apprenti est en retard, si une dispute traîne, si le voisin a besoin d'un coup de main, la routine **se déforme** — elle ne casse pas, elle plie.

Cette plasticité est essentielle. Un PNJ qui ouvre sa boutique chaque matin à huit heures précises, quel que soit le contexte, est un automate. Un PNJ qui *vise* huit heures mais peut ouvrir à sept et demie ou à neuf selon les circonstances, est un habitant. La routine est un **squelette d'intentions**, pas une horloge.

> Détail technique : voir [[Routine Quotidienne]] pour les phases canoniques (sommeil, lever, déjeuner, travail, repas du midi, après-midi, repas du soir, social, repos, coucher) et leurs horaires moyens par archétype.

### 2. Personnalité

Sur la même routine, deux PNJ ne se comporteront pas pareil. La personnalité — codifiée à Hybelior selon un modèle MBTI-like à seize archétypes psychologiques — module les choix dans chaque situation. Un INFJ va prolonger les conversations avec un sens du sens caché ; un ESTP va trancher vite, parfois trop vite. Cette signature stable n'évolue presque jamais, sauf événement majeur.

La personnalité est ce qui fait qu'**on reconnaît** un PNJ. Pas son apparence, pas son nom — sa manière. Le forgeron qui ronchonne toujours après l'apprenti, le tavernier qui te demande deux fois si ça va, la gardienne qui ne sourit jamais mais te salue d'un signe précis — toutes ces signatures sont la marque MBTI au travail dans les micro-décisions.

### 3. Mémoire sociale

Un PNJ retient ce qui compte. Il retient les visages, les noms, les services rendus, les trahisons subies. Cette mémoire est **double** : courte (les dernières 24 à 72 heures, riche en détails) et longue (les événements marquants, lossy mais persistante). Le forgeron se souviendra dans un mois que tu lui as offert un verre ; il aura oublié dans une semaine que tu as renversé sa caisse.

La mémoire alimente l'**Affinity** — un scalaire de -1 à +1 par joueur rencontré — et un ensemble de **MemoryFlags** persistants qui marquent les événements pivots (premier rencontré, sauvé, trahi, volé). C'est cette mémoire qui transforme les actions répétées en **relation**.

> Détail technique : `FNPCMemoryRecord` côté serveur ; décroissance d'`Affinity` de 5% par mois réel vers zéro. Voir [[NPC Spec]] §3.

### 4. Réputation

Au-delà de la mémoire individuelle, il y a la **réputation collective** — ce que la communauté pense de toi, agrégée à partir de tout ce que ses membres ont vu, entendu, raconté. Si tu as volé un marchand de Mosrack en plein marché, la garde locale le sait avant la fin de la journée ; les autres marchands relèveront les yeux quand tu reviendras. La réputation est l'**onde sociale** de la mémoire.

Elle s'agrège par **cercle** : ce hameau te connaît différemment de cette ville, et cette ville différemment du continent. Elle se construit lentement (un service rendu ne renverse pas une mauvaise réputation en un jour) et se perd vite (une trahison peut effacer des mois de bonne volonté). La restauration est possible, mais demande des actions longues, visibles, coûteuses — comme dans la vie.

### 5. Modes superposables

Un PNJ peut être dans plusieurs modes en même temps. Un forgeron peut être en mode **Travail** (il martèle) et en mode **Social** (il discute avec son apprenti) simultanément — la conversation est secondaire mais réelle. Si tu entres, il peut basculer en mode **Service** (il interrompt brièvement le travail pour t'écouter) sans quitter le mode Travail. Si une bagarre éclate à la porte, le mode **Combat** ou **Fuite** prend la priorité et suspend tout le reste.

Ces modes ne sont pas exclusifs — ils ont des **priorités** et des **compatibilités**. Combat l'emporte sur tout. Fuite l'emporte sur tout sauf Combat (un PNJ peut combattre pour fuir). Travail et Social coexistent à bas niveau. Sommeil prime sur Social mais pas sur Combat (on se réveille pour défendre sa maison). Cette logique de **piles superposées** produit une fluidité que les machines à états strictes ne savent pas atteindre.

### 6. Triggers narratifs

Certains événements ne sont pas du contexte ordinaire — ils sont **historiques** pour ce PNJ. Un Souffle qui change l'Ère ; la mort d'un proche ; une quête narrative résolue ; un grand rituel ; l'arrivée d'un Concordant. Ces triggers narratifs modifient **durablement** le comportement : un PNJ qui a perdu son fils dans une rixe ne reverra plus jamais le bourg sous la même lumière ; son humeur de base se déplace, ses dialogues changent, certaines routes lui deviennent insupportables.

Les triggers narratifs sont la **mémoire dramatique** du PNJ. Ils sont rares — un PNJ ordinaire en accumule peut-être une dizaine au long de sa vie — mais leurs effets sont profonds, et certains résistent même au Souffle.

### 7. Décisions contextuelles immédiates

Au plus fin grain, le comportement du PNJ doit aussi répondre à des **stimuli ici-maintenant** : un orage qui éclate, un prédateur qui apparaît, le crépuscule qui tombe, un cri dans la rue voisine. Ces décisions de courte portée sont l'IA réactive classique — détection, évaluation, réponse — mais branchées sur l'ensemble du système : un PNJ courageux et armé ira voir ce qui crie, un PNJ timide se barricadera.

C'est ce niveau qui produit la **vie observable** : les passants qui rentrent quand il pleut, les marchands qui couvrent leurs étals, les enfants qui courent après un cerf-volant emporté par le vent. Le niveau qui dit que le monde est **réactif au monde**, pas seulement au joueur.

### 8. Modulation par la Voie du Lien et par l'Accord

Enfin, chaque PNJ vibre selon sa propre proximité à une [[Le Lien|Voie du Lien]]. Un PNJ proche de la Voie de la Lumière sera attiré par les joueurs qui rayonnent dans cette même tonalité — il les saluera plus facilement, leur fera plus volontiers crédit, leur parlera plus longtemps. Un PNJ proche de la Voie de l'Ombre, à l'inverse, regardera de travers un porteur de Lumière, sans hostilité mais avec une réserve sentie.

De même, l'**Accord** du joueur avec l'[[L'Accord|Ère présente]] est perçu par les PNJ. Un Concordant inspire un respect particulier — pas par déférence aveugle, mais parce que son énergie résonne avec ce que le monde joue en ce moment. Cette modulation est subtile mais omniprésente : elle fait que **ta posture cosmique** est lue par le tissu humain, et que le tissu humain te répond en conséquence.

---

## Machines à états — la structure macroscopique

Sous tout ce système souple, il faut une **colonne vertébrale technique** : une machine à états macros qui orchestre les transitions entre les grands modes de vie d'un PNJ. Cette machine n'est pas le comportement — elle en est le squelette. C'est elle qui dit *« maintenant on dort »*, *« maintenant on travaille »*, *« maintenant on fuit »*, et qui s'assure que ces transitions soient cohérentes.

### Les états macros

| État | Description | Animations typiques |
|---|---|---|
| **Sommeil** | PNJ dort, dans son lit ou son refuge. Désactivation partielle de la perception. | Idle couché, respiration |
| **Lever / Coucher** | Transition courte, soins matinaux / soir | Toilette, repas, change |
| **Métier / Travail** | Activité productive principale — pilotée par le sous-arbre du métier | Forge, semis, écriture |
| **Repas** | Mange, seul ou en groupe | Assis, gestes alimentaires |
| **Social** | Discussion, oisiveté, présence en place publique | Posture détendue, gestes |
| **Service** | Sert un client (joueur ou PNJ) — interruption courte du métier | Comptoir, transaction |
| **Dialogue** | Conversation dirigée vers un interlocuteur précis | Focus caméra, posture engagée |
| **Combat** | Engagement armé, BT partagé avec entités (`BT_EnemyBase`) | Pris en charge par [[AI Controller]] |
| **Fuite** | Distance maximale par rapport à la menace, recherche d'un refuge | Course, regards en arrière |
| **Retraite / Repli** | Retour à un point d'ancrage sûr (maison, sanctuaire) | Marche soutenue, vigilance |
| **Curiosité** | Observe un événement, ne participe pas mais s'oriente vers lui | Regard tourné, déplacement lent |
| **Deuil / Trauma** | État durable suite à trigger narratif majeur | Posture courbée, humeur biaisée |

### Les transitions floues

Le point crucial est que **ces transitions sont floues**. Un PNJ ne passe pas brusquement de *Métier* à *Social* — il commence à ralentir le travail, à lever les yeux plus souvent, à répondre plus longuement à une question, jusqu'à ce que l'observateur ne sache plus exactement à quel moment le PNJ a cessé de forger pour bavarder. Ce flou n'est pas un défaut d'implémentation : c'est **la signature du vivant**. Les états sont des centres de gravité, pas des cases hermétiques.

Techniquement, cette fluidité est obtenue par des **modes superposés** (voir pilier 5) plutôt que par une vraie FSM stricte. Le PNJ peut tenir *Métier* à 70% et *Social* à 30% pendant quelques secondes — la sortie animée est un mélange, le dialogue disponible appartient à la zone de mélange, et c'est l'Affinity ou l'urgence du moment qui finit par faire basculer la balance.

> **Implémentation** : la couche basse utilise `BT_EnemyBase` partagé pour le combat (cf. [[AI Blueprints]]) ; les états non-combat sont gérés par un BT spécifique `BT_NPCBase` (à créer) qui pondère les modes via un score plutôt qu'un sélecteur strict.

---

## Routines quotidiennes — trois portraits détaillés

Pour ancrer l'abstraction, voici trois journées concrètes — trois archétypes différents, trois rythmes différents, et la manière dont le système les produit.

### Aldric, forgeron de Mosrack (Artisan sédentaire, MBTI ISTJ)

**05h30** — Aldric s'éveille. Le mode *Sommeil* relâche le PNJ, qui passe en *Lever* pendant huit minutes (toilette, vêtements, premier coup d'œil sur la rue par la fenêtre).

**06h00** — Petit-déjeuner court, debout dans la cuisine. Pain, eau coupée d'un peu de vin. Pas de social — sa femme est morte au dernier Souffle, ses fils dorment encore. Le mode *Repas* dure quinze minutes.

**06h20** — Descente à l'atelier. Mode *Métier* engagé : il allume la forge, prépare les outils, examine les commandes en cours. L'apprenti arrive à 07h, en retard de dix minutes — Aldric ronchonne (MBTI ISTJ : ordre, ponctualité, désapprobation des écarts) mais ne sanctionne pas.

**07h00 à 11h30** — Travail dense. Aldric s'interrompt rarement, sauf si un client entre (mode *Service* superposé, durée 3 à 8 minutes). Si le client est un joueur, le sous-système de dialogue est activé.

**11h30 à 12h00** — Pause courte. Aldric ressort dans la rue, échange quelques mots avec le voisin tonnelier. Le mode *Social* prend la priorité pour 25 minutes, le mode *Métier* est en pause.

**12h00 à 13h00** — Repas du midi à la maison. Soupe préparée par sa belle-fille. Conversation brève avec elle et son fils aîné.

**13h00 à 17h30** — Reprise du métier. Densité un peu moindre qu'au matin, plus de tolérance pour les visites. Vers 16h, un orage éclate — décision contextuelle : Aldric ferme à demi la grande porte de l'atelier, accélère le travail en cours pour profiter de la fin de journée.

**17h30 à 18h30** — Fin de journée, rangement, comptes. Mode *Métier* à basse intensité, posture détendue.

**18h30 à 20h00** — Auberge. Une chope, parfois deux, peu de paroles, beaucoup d'écoute. Si un conteur est présent, Aldric reste plus longtemps.

**20h00 à 22h00** — Maison. Conversations familiales, lecture rare (Aldric ne lit que les comptes). Le mode *Repos* domine.

**22h00** — Coucher. Mode *Sommeil* engagé jusqu'au lendemain matin, sauf cri dans la rue, alerte de garde, ou Souffle.

### Vesna, garde de patrouille à Cendara (Garde, MBTI ESTJ)

**04h30** — Lever. Mode *Lever* expédié — Vesna est en service à 05h.

**05h00 à 11h00** — Patrouille matinale. Itinéraire fixe : poste nord, ruelle des tanneurs, place du marché en formation, retour poste. Mode *Métier* (= patrouille) en continu. Toute anomalie (cri, bagarre, présence suspecte) déclenche un mode *Service* armé : Vesna intervient, calme, sanctionne si besoin, broadcast une alerte aux autres gardes dans un rayon de 50 mètres si la situation l'exige (cf. [[NPC Spec]] §7.3).

**11h00 à 12h00** — Pause repas au corps de garde. Mode *Social* avec collègues, dense.

**12h00 à 16h00** — Patrouille de l'après-midi. Variante : passage au marché central, où elle salue les marchands qu'elle connaît (les marchands en retour ont une `Affinity` positive avec elle, ce qui débloque certains dialogues conditionnels).

**16h00 à 17h00** — Rapport au capitaine. Mode *Service hiérarchique*. Si un joueur a été observé commettre un délit, l'information remonte ici et alimente la **réputation collective**.

**17h00 à 22h00** — Hors service. Maison, taverne, jeux de dés avec d'autres gardes. Mode *Social* et *Repos*.

**22h00 à 04h30** — *Sommeil*.

### Tessar, voyageur conditionnel (Pèlerin / Voyageur, MBTI INFP)

Tessar n'a pas de routine fixe au sens des sédentaires. Sa journée est une **succession de microscopiques décisions** : marcher tant que la fatigue le permet, s'arrêter dès qu'un sanctuaire ou une auberge se présente, repartir dès que l'envie le reprend.

**Aube** — Lever où qu'il soit. Si dans une auberge, mode *Repas* puis *Voyage*. Si en chemin, mode *Voyage* immédiat avec arrêt court pour grignoter.

**Matin et midi** — Marche soutenue, mode *Voyage* dominant. Détection contextuelle : si un orage menace, il accélère vers le prochain refuge ; si un autre voyageur le rejoint, mode *Social* superposé.

**Après-midi** — Variable. Si proche d'un sanctuaire, il s'y rend (mode *Dévotion* spécifique aux Pèlerins). Si proche d'un village, il y entre, dort à l'auberge, échange des nouvelles, repart le lendemain.

**Souffle** — Si un nouveau Souffle se déclenche pendant son voyage, Tessar **change de destination**. Le sanctuaire qu'il visait n'est plus celui que l'Ère présente illumine ; il consulte mentalement son itinéraire et bifurque. C'est un comportement spécifique aux Pèlerins, codé comme réaction systémique au Souffle (cf. [[NPC Spec]] §5).

---

## Réputation et confiance — l'économie sociale

La mémoire individuelle d'un PNJ est une chose ; la réputation collective en est une autre. Les deux interagissent constamment, mais selon des règles distinctes qu'il faut tenir au clair.

### Comment la réputation se construit

Chaque action visible du joueur émet un **signal social** capté par les PNJ témoins. Une transaction loyale émet un signal positif faible ; un sauvetage public, un signal positif fort ; un vol détecté, un signal négatif fort ; une trahison documentée, un signal négatif très fort. Ces signaux alimentent à la fois les `Affinity` individuelles des témoins et la **réputation agrégée** dans le cercle géographique (hameau, village, ville, région, continent).

Plus le cercle est large, plus la propagation est **lente** : ce que tu as fait à Mosrack ce matin est connu à Mosrack à midi, dans les villages voisins en une semaine (par les voyageurs, marchands, pèlerins qui font circuler les rumeurs), à Cendara en un mois, sur le continent en plusieurs Ères. Cette inertie est volontaire — elle rend la réputation **navigable** : tu peux fuir une réputation locale, tu ne peux pas fuir une réputation continentale.

### Comment la confiance se perd

La confiance se perd vite et de manière non symétrique. Une trahison ne s'efface pas avec un service rendu équivalent — elle s'efface avec **un effort disproportionné**, ou avec **du temps**, ou avec **un acte symbolique** (réparation publique, gage, serment scellé). C'est le rapport humain réel : on pardonne, mais le pardon a un prix.

| Événement | Δ Affinity témoins | Δ Réputation locale | Δ Réputation régionale |
|---|---|---|---|
| Vol non détecté | 0 | 0 (flag suspicion 30%) | 0 |
| Vol détecté en flagrant | -0.30 (témoins directs) | -10 à -25 | dérive lente -2 à -5 |
| Agression non létale d'un PNJ | -0.50 (témoins) | -25 à -50 | -5 à -10 |
| Meurtre d'un PNJ | -1.00 (témoins) | -100 (hostile) | -30 |
| Sauvetage public d'un PNJ | +0.40 (témoins) | +20 | +5 |
| Service rendu à un notable | +0.30 (notable) | +10 (par halo) | +2 |
| Trahison de quête PNJ | -0.40 (PNJ trahi) | -15 | -5 |
| Don visible à un mendiant | +0.10 (témoins) | +3 | 0 |

### Comment la confiance se restaure

La restauration passe par trois chemins, qui peuvent se cumuler :

1. **Le temps** : la décroissance naturelle d'`Affinity` (5% par mois réel vers zéro) érode les rancœurs si rien ne les rappelle. Mais les `MemoryFlags` persistants (Stolen, Betrayed, etc.) ne s'effacent pas seuls — ils demandent un acte.
2. **L'acte de réparation** : rendre l'objet volé, payer une amende publique, accomplir une quête de pénitence, soigner les blessés d'une rixe que l'on a déclenchée. Ces actes effacent les flags spécifiques et restaurent un palier de réputation.
3. **Le rituel symbolique** : auprès de certaines factions ou cultes, une cérémonie publique de purification scelle la restauration. Coûteuse, lente, mais définitive.

---

## Dialogues conditionnels — qui parle, où, quand

Ce qu'un PNJ te dit dépend de **qui parle, où, quand, et dans quelle Ère**. Aucun de ces facteurs ne peut être ignoré sans appauvrir la présence. Le système de dialogue d'Hybelior (cf. [[Dialogue Component]] côté technique) consulte plusieurs canaux à chaque interaction :

**Qui parle** : ton identité, ton historique avec ce PNJ (Affinity, MemoryFlags), tes titres, tes appartenances de faction, ta Voie du Lien dominante, ton statut de Concordant éventuel, et même ton apparence générale (un PNJ noble pourra refuser de parler à un personnage en haillons).

**Où** : un même PNJ ne dit pas la même chose dans son atelier, dans la rue, dans une auberge, ou la nuit dans une ruelle. Le lieu module la **disponibilité conversationnelle** (long en privé, court en public), le **registre** (familier ou formel), et parfois le **contenu** (un PNJ ne te révèle un secret qu'à l'écart).

**Quand** : l'heure du jour module l'humeur (un PNJ très fatigué le soir parle plus brièvement) et la disponibilité (on ne réveille pas un dormeur sans conséquence). La saison cosmique et l'Ère active modulent quant à elles le **fond** des conversations : les rumeurs en cours, les inquiétudes du moment, les espoirs cultivés.

**Dans quelle Ère** : à chaque Souffle, le `EraConfig` injecte de nouveaux **biais de sujet** dans les pools de dialogue. Une Ère de Crépuscule Pourpre fait remonter les conversations sur les ombres, les rêves troubles, les disparitions ; une Ère de Verdoiement les fait remonter sur les récoltes, les fêtes, l'abondance. Le PNJ ne change pas de personnage — il **parle de ce qui se passe**.

### Architecture des pools

| Pool | Source | Activation |
|---|---|---|
| Salutations par archétype | `DT_Greetings_<Archetype>` | Toute interaction |
| Variantes selon humeur | `DT_Mood_<CurrentMood>` | Modulation transverse |
| Rumeurs d'Ère | Généré IA, biais `EraConfig` | Modulation passive |
| Reconnaissance (Affinity > 0.5) | `DT_RecognitionLines` | Priorité quand connu |
| Dialogue conditionnel | `ConditionalDialogues` ordonnée | Premier match |
| Silence / mime | `DT_SilentReactions` | Archetype Silent uniquement |

La sélection à l'interaction parcourt ces pools dans l'ordre, parfois les compose. La parole générée par IA n'est jamais un substitut à la parole canonique des PNJ majeurs — elle est la **respiration autour** de ces lignes fixes, le grain qui empêche que la conversation se répète identique deux soirs de suite.

> Détail technique : voir [[NPC Spec]] §4 et [[Dialogue Component]].

---

## Le PNJ et le Souffle — vivre les Ères

Que devient un PNJ entre deux Ères ? Cette question n'est pas anodine. Si les PNJ ne réagissaient pas au Souffle, le monde dirait qu'il change pendant que ses habitants resteraient figés — incohérence intolérable. Si les PNJ disparaissaient tous au Souffle pour être remplacés, la mémoire et la continuité humaines seraient brisées. La réponse d'Hybelior est **modulée**.

### Trois destins possibles

Au moment d'un Souffle, chaque PNJ peut suivre trois trajectoires :

**Rester et se transformer.** La majorité des PNJ — surtout les sédentaires, les notables, les artisans établis — restent dans leur lieu et **adaptent leur vie** à la nouvelle Ère. Le forgeron change sa recette dominante ; le marchand reconfigure son inventaire ; le scribe consigne ce qui change ; le mendiant rêve plus fort. Les `MemoryRecord` persistent : les PNJ se souviennent des Ères passées, et de toi.

**Migrer.** Certains PNJ — surtout les Pèlerins, les Voyageurs, les Conteurs — **prennent la route** après un Souffle. Le sanctuaire qui les appelait hier ne brille plus ; un autre les attire. Ils disparaissent de la région pendant des jours ou des semaines, puis réapparaissent là où l'Ère les fixe. Pour un joueur, ce voyage peut devenir une quête : *« où est passé le vieux Sennar qui me racontait l'histoire des Eslaviens ? »*

**Disparaître.** De rares PNJ — généralement liés à une Ère spécifique, ou ayant accompli leur arc narratif — **s'éteignent** au Souffle. Pas dramatiquement : ils partent, ils meurent paisiblement, ils s'évanouissent dans une rumeur. Leur trace persiste (monuments, récits, mémoires d'autres PNJ), mais leur instance disparaît.

### Les comportements résiduels

Un PNJ qui a vécu trois Ères porte en lui les **résidus** des Ères précédentes. Un forgeron qui a connu l'Ère du Verdoiement et qui vit maintenant dans une Ère de Glace gardera certaines habitudes — il continuera à ouvrir l'atelier tôt comme on le faisait alors, il dira parfois *« autrefois on travaillait le bronze plus que le fer »*. Ces résidus comportementaux donnent l'**épaisseur temporelle** d'un PNJ. Ils sont visibles dans les dialogues (lignes de mémoire), dans les rituels personnels (gestes anachroniques), et parfois dans les choix de routine.

Plus un PNJ a vécu d'Ères, plus son comportement est **strate**. Et plus il devient précieux pour le joueur — comme on s'attache aux vieux qui ont connu d'autres siècles.

> *« J'ai connu trois Souffles. Le premier m'a pris ma femme, le deuxième m'a rendu mon fils, le troisième m'a laissé seul à l'atelier. Si tu me demandes ce que je fais, je dirai : j'attends le quatrième. »*
>
> *— Veslan, tonnelier, Veyr*

---

## Effets en groupe — l'intelligence collective

Un PNJ seul a un comportement individuel ; un groupe de PNJ a un **comportement collectif** qui n'est pas la somme des individus. Cette dimension est essentielle pour les patrouilles de gardes, les troupes militaires, les familles, les communautés religieuses.

### Préséance hiérarchique

Dans un groupe, certains PNJ ont une **autorité** reconnue par les autres. Un capitaine de garde peut donner des ordres à sa patrouille qui priment sur leurs comportements individuels. Une mère de famille peut rappeler ses enfants à l'ordre. Un prêtre peut imposer un silence rituel. Ces autorités sont matérialisées par des **liens de subordination** dans le graphe social du PNJ, et elles modifient sa table de décision : un soldat sous ordre n'hésite pas comme un soldat libre.

### Cohésion et alerte

Un groupe cohérent partage certains états. Si un membre d'une patrouille de gardes détecte un danger, les autres membres dans un rayon de 50 mètres reçoivent un broadcast d'alerte (cf. [[NPC Spec]] §7.3) et basculent en mode *Combat* avec la même cible. Si une famille subit un deuil, tous ses membres ont une **humeur biaisée** vers `Grieving` pendant plusieurs jours.

Cette intelligence collective évite l'effet ridicule des PNJ isolés qui ignorent ce qui se passe à dix mètres d'eux. Elle produit aussi des **comportements de groupe** observables : les patrouilles qui se serrent à l'approche du danger, les familles qui se rassemblent au seuil d'un deuil, les fidèles qui se taisent ensemble pendant un rituel.

### Bêtes grégaires

Pour les entités non humaines (cf. [[Bestiaire/Index]]), des comportements grégaires spécifiques existent : meutes de loups qui chassent en coordination, troupeaux qui fuient en formation, oiseaux qui décollent ensemble. Ces comportements partagent le même système de broadcast d'alerte que les gardes, avec des paramètres différents (rayon plus court ou plus long selon l'espèce, type de signal sensoriel).

---

## Détection du joueur — pas d'omniscience

Un PNJ d'Hybelior **ne sait pas** que tu es là tant qu'il ne t'a pas perçu. Cette règle est non négociable. Aucun PNJ ne se retourne magiquement vers toi à travers un mur. Aucun marchand ne te salue avant que tu sois dans son champ de vision. Aucun garde ne t'arrête avant de t'avoir vu, ou entendu, ou senti.

### Les sens disponibles

Chaque archétype a un **profil sensoriel** distinct :

| Archétype | Vue (rayon) | Ouïe (rayon) | Odorat | Notes |
|---|---|---|---|---|
| Humain ordinaire | 30 m, cône 90° | 15 m | non | Modulé par l'éclairage |
| Garde / Soldat | 40 m, cône 110° | 20 m | non | Entraîné, vigilance permanente |
| Chasseur | 50 m, cône 120° | 25 m | non | Sens affûtés |
| Bête prédatrice | 25 m, cône 270° | 30 m | 40 m | Olfactif dominant |
| Bête grégaire | 20 m, cône 320° | 20 m | 15 m | Détection latérale forte |
| Cosmique reclus | variable | variable | variable | Modulé par l'Ère |

La vue est modulée par l'éclairage (nuit divisée par 2 ou 3), la météo (pluie battante divisée par 1.5), les obstacles (mur = pas de vue). L'ouïe traverse les obstacles mais s'atténue. L'odorat suit le vent.

### Conséquences de design

Ces limites de perception ne sont pas des handicaps — ce sont des **opportunités narratives**. Un joueur furtif peut traverser une ville la nuit sans être vu. Un voleur peut profiter du tumulte du marché pour agir sous le bruit. Un chasseur peut suivre une bête à l'odorat pour la débusquer. Toute une **strate de gameplay** repose sur le fait que les PNJ ne sont pas omniscients.

> Détail technique : l'`AIPerceptionComponent` (Sight, Hearing, sens custom Smell) est configuré par archétype. Voir [[AI Controller]] §Configuration Perception.

---

## Tableau des modes

| Mode | Trigger d'entrée | Trigger de sortie | Priorité | Compatibilités |
|---|---|---|---|---|
| **Sommeil** | Heure de coucher atteinte + lieu = lit | Heure de lever ou stimulus fort (cri, secousse, Souffle) | 2 | Aucune (sauf Combat forcé) |
| **Métier** | Heure de travail + lieu de travail | Fin de plage horaire ou interruption | 5 | Social (bas), Service |
| **Social** | Présence d'interlocuteur + disponibilité | Fin de conversation ou priorité supérieure | 4 | Métier (bas), Repas |
| **Service** | Client (PNJ ou joueur) sollicite | Transaction conclue ou refusée | 6 | Métier (suspension partielle) |
| **Repas** | Heure de repas + lieu adapté | Repas terminé (timer) | 5 | Social |
| **Repos** | Fatigue cumulée ou plage horaire | Sommeil ou nouvel objectif | 3 | Social |
| **Dialogue** | Interaction joueur engagée explicitement | Fin de dialogue (joueur ou PNJ) | 7 | Aucune (focus exclusif) |
| **Combat** | Menace détectée + courage suffisant | Menace neutralisée ou fuite déclenchée | 10 | Aucune (override total) |
| **Fuite** | Menace détectée + courage insuffisant | Distance de sécurité atteinte | 9 | Aucune (override sauf Combat involontaire) |
| **Retraite** | Blessures graves ou perte de cible | Refuge atteint | 8 | Aucune |
| **Curiosité** | Événement inhabituel à portée + personnalité curieuse | Événement résolu ou attention captée ailleurs | 4 | Social (faible) |
| **Deuil / Trauma** | Trigger narratif fort (perte) | Durée écoulée ou rituel de résolution | 3 (modulation) | Tous (modulateur d'humeur) |

> Lecture : un PNJ en mode *Métier* (priorité 5) bascule en mode *Service* (priorité 6) si un client le sollicite, puis revient en *Métier* en sortie. S'il subit une attaque pendant le *Service*, *Combat* (priorité 10) prime sur tout. Le *Deuil* n'est pas un mode actif mais un **modulateur** qui colore tous les autres pendant sa durée.

---

## Tableau des archétypes — synthèse comportementale

| Archétype | Sédentarité | Routine type | Réaction au joueur | Réaction au Souffle | Détection |
|---|---|---|---|---|---|
| **Forgeron sédentaire** | Très haute (atelier) | Cycle artisan dense (06h-18h) | Service court, dialogue selon Affinity | Change recette dominante, +rumeurs | Vue normale, ouïe affûtée (forge) |
| **Garde de patrouille** | Itinéraire fixe sur 150-400 m | Patrouille / pause / patrouille | Salutation, surveillance, intervention si délit | Aucun changement comportemental | Vue +, vigilance permanente |
| **Marchand itinérant** | Caravane sur routes inter-régionales | Marche / installation étal / négoce | Approche commerciale, dialogue de marchandage | Reconfigure inventaire, change route | Vue normale, sociale forte |
| **Chasseur solitaire** | Faible (cabane + forêt) | Aube : départ chasse / retour soir | Méfiance puis échange si Affinity > 0.3 | Migre selon biome activé | Vue +, ouïe +, odorat + |
| **Mendiant de sanctuaire** | Haute (parvis fixe) | Position quasi-stationnaire, sollicite passants | Demande d'aumône, dialogue prophétique rare | Mood biaisé Anxious / Grieving 1 sem | Vue limitée, ouïe forte |
| **Voyageur conditionnel** | Nulle (mobile continental) | Marche / arrêt / repart | Échange de nouvelles, dialogue informatif | Repart 24-72h après Souffle vers nouvelle destination | Vue +, sociale moyenne |
| **Bête sauvage grégaire** | Territoriale | Cycle proie/repos/social | Évite si seul, attaque si meute provoquée | Migration possible selon Ère | Ouïe +, odorat +, vue cône large |
| **Cosmique reclus** | Quasi-statique (sanctuaire / grotte) | Présence muette, rituels rares | Indifférence apparente, dialogue cryptique si abordé | Reçoit augure pré-Souffle (ligne de rêve) | Modulé par Ère, parfois omniscient |

> Cette table est une **synthèse**. Le mapping complet vers les 63 [[Métiers]] et les sous-types comportementaux est documenté dans [[NPC Behaviors/Index]].

---

## Architecture technique en bref

Pour le détail complet, voir les pages d'implémentation. Voici la chaîne minimale :

```
HW GAS Entity Character (pawn PNJ)
  ├─ UHWNPCComponent       → identité, dialogues, mémoire, commerce
  ├─ AHWAIController       → perception, BB, BT
  │    └─ BT_NPCBase (à créer) ou BT_EnemyBase (combat)
  └─ Modulation systémique :
       ├─ Souffle System    → EraConfig (mood, économie, rumeurs)
       ├─ Accord System     → reconnaissance Concordants
       └─ Lien System       → modulation Voie joueur/PNJ
```

Le composant `UHWNPCComponent` porte l'identité narrative (nom, archétype, mémoire). Le `AHWAIController` porte la perception et l'orchestration des modes. Les sous-systèmes globaux (Souffle, Accord, Lien) **modulent** les paramètres en lecture sans changer le code du PNJ.

> Décisions actées : 12 archétypes canoniques (`NPC.Archetype.*`), MemoryRecord par joueur, décroissance 5%/mois réel, ConditionalDialogues en TArray ordonné, humeur 50% Ère + 30% MBTI + 20% local, IA combat partagée via `BT_EnemyBase`. Détail dans [[NPC Spec]] §10.

---

## Points de calibrage

| Calibrage | Question ouverte |
|---|---|
| Densité PNJ active (60-120 en ville) | Ressenti "vivant" vs performance serveur |
| Décroissance Affinity (5%/mois réel) | Oubli trop rapide ou trop lent ? |
| Rayon broadcast alerte combat (50 m) | Débordement réaliste ou frustrant ? |
| Seuil reconnaissance dialogue (Affinity > 0.5) | Trigger trop facile ou trop difficile ? |
| Lignes de rêve pré-Souffle (5-15% PNJ Scribe / Pèlerin / Conteur / Ermite) | Détectabilité par joueurs attentifs |
| Profondeur des résidus d'Ère (combien d'Ères mémorables par PNJ ?) | Épaisseur narrative vs charge mémoire |
| Flou des transitions de mode | Naturel ou confus pour le joueur ? |

---

## Voir aussi

- [[PNJ]] — philosophie de la présence (référence directe, à lire d'abord)
- [[L'Accord]] — résonance joueur ↔ Ère, modulation des dialogues
- [[Le Souffle]] — cycles cosmiques, déclencheur des transformations PNJ
- [[Le Lien]] — Voies du Lien, modulation des affinités
- [[Bestiaire/Index]] — entités non humaines, comportements grégaires partagés
- [[Métiers]] — 63 métiers couverts par PNJ artisans
- [[NPC System]] — composant `UHWNPCComponent` (architecture technique)
- [[NPC Spec]] — chiffres, formules, balance (implémentation)
- [[AI Controller]] — perception, Blackboard, fallback C++
- [[AI Blueprints]] — BT/BB/Tasks/Services partagés avec entités
- [[Dialogue Component]] — flux de dialogue côté joueur
- [[Routine Quotidienne]] — détail des phases canoniques de journée
- [[Modes Sociaux]] — interactions sociales superposables
- [[Actions Situationnelles]] — matrice contexte × action (Phase 2)
- [[Concepts Fondamentaux IA PNJ]] — 20 décisions architecturales (D-PNJ-*)
- [[Architecture Data-Driven]] — NPC Generator + Behavior Generator

---

*Implémentation technique (chiffres, formules, BT/BB) : [[NPC Spec]] · [[AI Controller]] · [[AI Blueprints]]*
*Philosophie de la présence : [[PNJ]]*
