# Poétique — comment ces livres s'écrivent

Ce fichier porte ce que les bibles disaient de la **manière**. Il ne porte
aucun fait du monde : les noms, les dates, les itinéraires, les généalogies
sont dans l'**Atrium** (`data/kg-base.json`), et c'est l'Atrium qui tranche.
Si une phrase d'ici contredit l'Atrium sur un fait, l'Atrium a raison.

À lire en entier avant de toucher un chapitre. Les signatures de dialogue
sont à côté, dans `VOIX.md`.

---

## 1. Le pivot — l'interdiction centrale

**Un pivot, c'est nier X pour poser Y.** La phrase gagne son relief en
refusant d'abord quelque chose. Écrit une fois, c'est un effet ; en système,
c'est la signature d'une machine. Le corpus en portait plusieurs centaines,
ils ont tous été retirés chapitre par chapitre. **On n'en écrit plus aucun.**

### 1.1 Les dix formes

① **`Ce n'est pas X. C'est Y.`** — deux phrases. Singulier ou pluriel
  (« Ce n'étaient pas partout des lettres »). Les deux membres peuvent être
  séparés par jusqu'à deux phrases, explication intercalée comprise.
② **`non pas X, mais Y`**
③ **`n'était plus / n'était pas X mais Y`**, en incise.
④ **`non X, Y`** — apposition négative, le « mais » élidé.
⑤ **forme ② sans « pas »** : `non X, mais Y`.
⑥ **forme ① sans « ce »**, le verbe simplement repris — même verbe,
  complément différent : « Ils ne regardaient pas le ciel. Ils regardaient
  ses mains. » « Il ne connaissait pas son visage. Il connaissait sa main. »
⑦ **`non` + PRÉPOSITION … mais** : « non par ruse, mais par fatigue ».
⑧ **négation de CAUSE à deux-points** : « Il ne s'arrêta pas pour la vue :
  le sentier pliait. »
⑨ **forme ⑥ avec les deux membres en italiques.**
⑩ **négation et affirmation séparées par un POINT-VIRGULE**, même sujet
  repris, sans « mais » : « On ne raccompagnait pas ; on laissait l'homme
  seul avec la petite chose sombre. » Même famille : « ni X, ni Y ;
  affirmation ».

### 1.2 Ce qu'aucun grep ne voit

- la forme ③ avec un pronom glissé entre « ne » et le verbe : « ne le disait
  pas » casse tout motif bâti sur `ne \w+ pas` ;
- la forme ⑥ dont le verbe est repris par un synonyme, pas au mot ;
- la forme ① dont l'affirmation ne commence pas par « c'était » ;
- la forme ① au pluriel ;
- les deux membres séparés par une longue incise.

Mesuré sur le corpus, **le grep sous-estime d'un facteur 7 à 13** : un lot
annoncé à deux en portait vingt-six. Le scanner sert à trier, **jamais à
conclure**. Un scan qui rend zéro sur neuf chapitres est d'abord un scanner
cassé : on le relance sans filtre, puis on lit.

### 1.3 Ce qui n'est PAS un pivot

Huit familles de faux positifs, à écarter avec leur raison :

1. le dialogue (voir 1.4) ;
2. l'affirmation posée en tête, la négation venant après en commentaire ;
3. la relative descriptive ;
4. la précision de fait accompagnée de sa preuve ;
5. l'anaphore d'insistance, quand aucun terme n'est posé à la place ;
6. le devoir opposé au fait ;
7. la restrictive en « seulement » ;
8. **la négation portante** — celle qu'on ne peut pas retirer sans que la
   phrase suivante perde son appui. « Il la regarda quand même » n'existe
   plus si « il n'avait pas besoin de regarder » disparaît.

Et surtout : **une négation qui dit une absence, quand l'absence est le sujet
du chapitre, n'est pas un pivot.** Un chapitre peut porter quarante négations
et zéro pivot, parce que ce qui manque *est* son sujet.

### 1.4 Les exemptions

- **Les chapitres de voix protégée** (§5). Le chœur du T2 tâtonne et se
  corrige en parlant — « Je vois un mur. Non. Pas un mur. » La figure y est
  le dispositif, pas le tic. Idem pour la voix du T1 qui perd sa langue et
  celle du T3 qui cherche la sienne.
- **Les Fragments du journal de Thessan**, canon au mot près : ils portent la
  figure, on n'y touche pas.
- **La bouche d'un personnage dont c'est la méthode.** Vaskar Sorne aligne
  deux faits et corrige le prédicat : « Il ne manque pas douze coups. Il
  manque la ronde de minuit. Nuance. » C'est la concordance des Sorne. Un
  chapitre peut porter seize pivots en bouche et zéro en narration ; c'est
  alors la preuve qu'il est juste, pas qu'il est sale.

### 1.5 Comment on corrige

**Suppression sèche d'abord.** Vingt corrections sur vingt-six se font en
retirant le membre nié, parce que le membre posé disait déjà tout. On ne
réécrit que si la clausule ou la phrase suivante s'appuie sur le nié.

Une correction ne doit créer ni collision lexicale avec un autre chapitre, ni
refrain, ni paire de clausules. On vérifie ses propres retombées avant de
livrer.

---

## 2. La clausule

- Elle se mesure sur la **dernière phrase** du dernier paragraphe, **pas sur
  le paragraphe**. La clausule est l'échappée, pas le bloc qui la porte.
- **Deux clausules du corpus ne partagent pas cinq mots.** Cent soixante-trois
  chapitres, zéro paire. Quand une paire naît, on casse du côté où le mot
  partagé ne sert pas l'organe du chapitre.
- Elle naît de **l'organe du chapitre** (§3) : ce que ce personnage-là
  perçoit, son métier, la matière qu'il a dans les mains.
- Elle **dit à l'affirmatif** ce qu'une négation dirait.

**T1 — l'échappée.** Une seule phrase, en fin de chapitre POV, a le droit de
glisser hors de la focalisation limitée, vers le mont au sud, vers ce qui
tient le monde par en dessous et n'est jamais nommé. Jamais deux, jamais le
« je » du Lien, réservé aux seuils. **Calibrer la distance sur la position
réelle du POV** : « loin au sud » est juste pour qui regarde de Celethor ou
de Baelor, faux pour Drakhan à Cendral, au pied du Mont, dont la cendre tombe
sur les fenêtres.

**T3 — l'écoute.** Le geste inverse : la clausule glisse vers **le dessous**,
vers ce qui remonte et cherche la parole. Jamais nommé, jamais le « je » de
la voix. Le T1 clôt ses chapitres sur une chose qui descend dans la mort, le
T3 sur une chose qui remonte vers la bouche.

**Figures interdites en clausule**, usées ailleurs dans la trilogie :
l'anaphore en « sans » ; le tricolon « ni… ni » ; l'énumération négative ;
l'escalier « plus bas que X, plus bas que Y » ; l'anaphore « sous X, sous
Y » ; l'ouverture sur « Loin », « Ailleurs », « Au-delà ».

Trois clausules du texte, trois organes différents :

> **T1 ch. 01** (Thessan, l'archiviste qui écrit) — « Il ne l'entendit pas.
> Il écrivait. »
> **T2 ch. 02** (Kessane, la forgeronne) — « Sur l'herbe rase d'une plaine,
> un ouvrage se faisait en trois endroits ; les villages posés dessus
> dormaient d'une traite. »
> **T3 ch. 02** (Renna, celle qui entend) — « …un autre, plus lent et plus
> large, qui montait par la terre battue et cherchait encore où poser son
> second coup. »

---

## 3. L'organe du chapitre

**Chaque chapitre a le sien** : la matière, le métier, la perception qui lui
appartiennent et à aucun autre. C'est par là qu'il dit ce qu'il a à dire.

Le T3 ch. 40 énonce sa loi par une pierre qu'on pose : *« Une pierre qui
tombe entre dans le mou de travers… Celle-ci reposait le côté plat en
dessous. »* C'est exactement l'endroit où un pivot aurait écrit « Elle
n'était pas tombée. Elle avait été posée. » Le contraste se fait sans nier.

**Tests.**
- Si une phrase pourrait appartenir indifféremment à un autre chapitre du
  même livre, elle manque sa cible.
- Si deux chapitres partagent une image — le soufflet, le tisonnier à plat
  contre la cuisse, un homme qui « s'aperçut qu'il comptait » —, **le tardif
  cède**.
- Une substitution lexicale introduite en correction doit être unique sur le
  corpus.

---

## 4. Ce qui doit se répéter se répète

**Les fragments sont des copies fautives, et leur dégradation est le sujet du
livre.** Le Fragment #3 du journal de Thessan traverse dix mille ans intact
pendant que tout le reste s'érode : une copie l'altère, une meilleure le rend
juste, une troisième perd tout sauf lui. Ces répétitions-là ne se varient
pas : elles se tiennent au mot près, et leurs variantes sont voulues une par
une.

**Une répétition structurelle reste une répétition même quand aucun scanner
ne la voit.** Les chapitres se répondent par leur forme — un geste qui double
un geste vieux de quinze siècles, un dépôt qui double un dépôt. On les garde,
et **chaque chapitre garde malgré tout son propre organe** : c'est la
structure qui rime, jamais la phrase.

**À distinguer du refrain**, qui est une formule revenue dans plusieurs
bouches ou plusieurs chapitres sans que personne l'ait voulu. Celui-là se
casse (`SKILL.md` §5bis).

**Corollaire de propagation.** Si on réécrit une phrase qui est reprise
ailleurs — un autre chapitre qui s'en souvient, un document qui la cite —, on
corrige toutes ses reprises dans le même commit. Un écho cassé est une faute.

---

## 5. Les narrateurs impossibles et les chapitres de voix protégée

Un narrateur par livre, un seul, défectueux d'une manière différente à chaque
tome. **Il est la seule exception à la 3ᵉ personne limitée.**

**T1 — la voix du Lien.** Omnisciente, et elle meurt en parlant. Cinq paliers
de dégradation : pleine puissance avec une première fêlure, érosion
syntaxique (les subordonnées lâchent, les noms propres tombent et sont
remplacés par des fonctions), dénouement de la langue (propositions juxtaposées,
blancs typographiques qui *sont* le texte), presque muette, quasi-silence.
Elle ne dit **jamais** qui l'a tuée, et elle ne sait pas elle-même si elle
meurt d'un coup porté ou d'une vieillesse arrivée à terme. **Elle n'est jamais
entendue intacte** : le lecteur la rencontre déjà fêlée et ne saura jamais de
quoi elle avait l'air entière.
*Fichiers : 10, 20, 30, 37, 38 ; irruptions intégrées aux 42 et 50.*

**T2 — les Voix Déportées.** Un chœur de gens qu'une Faille a jetés ailleurs
dans le temps. Ce narrateur ne perd pas la grammaire, il perd le **quand**.
Voix bien ancrées (léger vertige) ; voix moyennement déportées vers
l'avant-Arrachement, aux temps verbaux qui flottent (« ma fille est morte
avant ma naissance ») ; voix profondément déportées vers un futur dont le
référent n'existe pas encore, les plus trouées ; voix qui reviennent,
amputées de ce qu'elles ont vu. **Aucune n'a la vue d'ensemble** : le
narrateur est structurellement incapable d'attribuer une cause.
*Fichiers : 00, 01, 12, 22, 27, 28, 32, 41, 46, 51.*

**T3 — la voix qui naît.** L'inverse exact du T1 : elle n'a jamais parlé et
elle apprend. Rien, puis un mot isolé qu'elle bute et qu'elle perd, puis la
syntaxe qui se cherche et les temps qui s'installent, puis des propositions
presque entières et un « je » qui affleure sans jamais se confirmer, puis une
voix presque pleine, puis **une phrase entière à la dernière page**. Elle ne
dit jamais ce qu'elle est.
*Fichiers : 00, 01, 12, 23, 34, 43, 47, 54.*

> **Règle dure : ces chapitres ne contiennent aucune narration.** Pas une
> ligne de récit tiers, pas de POV incarné, pas de scène. Tout y est la voix.
> Quand un chapitre de voix est « propre », ce n'est pas parce qu'un scanner
> n'a rien levé — c'est parce qu'il n'a pas de narration où loger la faute.

Le chœur du T2 et la voix du T3 se corrigent en parlant, et cette
autocorrection est leur langue (§1.4).

**Les Chroniques n'ont pas de narrateur impossible.** Elles ont un narrateur
non fiable, ce qui est une tout autre mécanique (§7).

---

## 6. Les dispositifs documentaires

Les quatre livres sont traversés par des textes écrits **dans** le monde. Ils
ne sont pas du décor : ce sont les organes du récit.

- **Les Fragments datés du journal de Thessan** (T1) scandent le livre et
  forment, lus d'affilée, un texte cohérent. Ils sont canon au mot près, y
  compris quand ils portent une figure interdite ailleurs. Le Fragment Zéro
  est de la main de l'Étudiant, pas de celle de Thessan.
- **Les strates de copie.** Une même phrase revient de tome en tome plus
  abîmée, d'une provenance plus douteuse : une copie fautive, une meilleure
  copie, une copie presque entièrement perdue. Le lecteur du tome précédent
  repère l'erreur ; les personnages, non.
- **Les notes de copiste.** Un volume in-world porte son colophon, et le
  colophon se tait sur ce qu'il ne sait pas : « Le copiste n'a rien à
  ajouter. » Un copiste ne glose jamais, ne corrige jamais, n'explique jamais.
- **Les marges, astérisques, ratures, pages blanches** (Chroniques). Ce sont
  la ponctuation intime de Sorin. L'astérisque marque ce qu'il ne veut pas
  laisser passer pour une certitude — il le dit lui-même : *« ceci est une
  pensée, pas un relevé. »* Le raisonnement barré est un sommet de la voix :
  *« La barre vaut mieux que la phrase. »* Les pages blanches restent blanches.
- **Règle commune : chaque dispositif est à la fois sincère et calculé.** La
  retenue est réelle *et* c'est un dispositif d'authentification que celui qui
  écrit sait poser. Les deux lectures coexistent ; aucune n'annule l'autre.

---

## 7. Le narrateur non fiable des Chroniques — fair-play absolu

1. **Aucune phrase frontalement fausse, jamais.** Relue, chaque phrase reste
   vraie et change de sens. On ment par **omission**, par **cadrage** (un acte
   prémédité présenté comme subi), par **orientation** (l'attention portée
   ailleurs).
2. **Au moins un double-fond FACTUEL par chapitre** : un objet, un chiffre, un
   nom, un geste, une date — littéralement exact, qui s'inverse à la
   relecture. Le manteau déjà sur les épaules, le service qu'on ne peut pas
   détailler. Une strate purement tonale (« il est trop calme ») ne compte
   pas : une attitude ne se retrouve pas, un fait bascule.
3. **Sorin ne qualifie jamais une mort d'inattendue, de fortuite ou de
   surprenante.** Il la note à plat, avec la sécheresse du cartographe. La
   « coïncidence » vient de la bouche des gens du lieu, ou du silence.
4. **Il peut tout dire de ce qu'il ignore, rien de ce qu'il prémédite.**
   L'humilité cosmique est entièrement sincère ; seule la naïveté sur sa
   propre agence est feinte. Il n'avoue pas son plan avant l'heure, et il ne
   le nie pas non plus : il l'entoure de silence.
5. **La preuve vient d'un tiers ou d'un document**, jamais d'un aveu du
   narrateur avant l'heure.
6. **Deux audiences, jamais confondues.** Le masque tombe pour le lecteur du
   roman. Dans le monde, le cartographe reste candide jusqu'au bout et son
   document reste irréfutable. Aucune scène ne produit, in-world, une preuve
   exploitable que le naïf était un stratège.
7. **Les mots-pièges se posent sans insistance.** On ne souligne jamais ; on
   laisse le relecteur trouver.

---

## 8. Coïncidence, jamais causalité

- On montre le geste **et** la catastrophe dans la même page. **Aucun passage
  narratif ne relie l'un à l'autre par une chaîne causale.** Les personnages y
  croient ; le texte ne confirme pas.
- **Le narrateur lui-même ne peut pas trancher** : celui du T1 doute de sa
  propre mort, celui du T2 ne sait pas quand il est, celui du T3 ne sait pas
  ce qu'il devient. C'est le garde-fou le plus solide du corpus.
- **Si les acteurs doutent, le lecteur ne peut pas conclure.** Chaque POV
  majeur porte une lecture et aucun n'a la preuve ; le doute les ronge tous.
- **Pas de méchant.** Chaque antagoniste a raison de son point de vue et tort
  dans le même geste. S'il devient cruel, sadique ou bête, la scène est ratée.
- **Les mystères protégés ne se résolvent jamais** : la cause de
  l'Arrachement, l'auteur de la Guerre de l'Ombre, la nature du Troisième
  Coup, le sort d'Aldric Valthen, la filiation de l'enfant qui entend, le
  Mangeur de Temps, l'heure exacte du geste. On les frôle, on les sème dans
  des bouches qui se contredisent, on ne les tranche pas. L'Atrium enregistre
  que la question se pose et qui porte quelle lecture ; jamais la réponse.
- **Ce qui commence à la dernière page ne s'explique pas.** Chaque tome finit
  sur un commencement : un battement dans la pierre, une oreille neuve, une
  bouche qui achève sa première phrase. Toute glose qui résoudrait tue le
  livre suivant.

---

## 9. Typographie, citations, gabarits

**Typographie.** Guillemets français « » ; tiret cadratin au changement de
tour de parole, **jamais en incise dans la prose** ; **jamais de parenthèses
dans la prose** (un aparté se rend en phrase pleine, en note de marge ou en
incise virgulée) ; espaces insécables avant `; : ! ?` et à l'intérieur des
guillemets, une seule, jamais doublée ; capitales accentuées.
`scripts/normalize-typo-livres.js` passe après coup ; il ne remplace pas la
vigilance.

**Gabarit Trois Coups.** Frontmatter (`tags`, `titre`, `type`, `partie`,
`pov`, `chapitre`, `status`), puis `# Titre` — ou `# Chapitre premier —
Titre` —, puis la prose. Pas d'exergue.

**Gabarit Chroniques.** Frontmatter (`chapitre`, `titre`, `acte`, `jour`,
`lieux`, `pov`, `status`), puis `# Chapitre N — Titre`, puis l'exergue en bloc
de citation avec son attribution, puis la ligne **lieu — jour** en gras, puis
un séparateur `---`, puis la prose. Les `---` suivants séparent les scènes.

**L'exergue** a droit à la formule, mais concrète et culturellement située :
un vrai dicton d'un vrai endroit sur une vraie chose, jamais un théorème.

**Les citations d'un texte in-world** — Fragment, cahier, rapport, colophon,
lettre — sont en italique et se tiennent au mot près là où elles sont canon.

---

## 10. Français, pas de l'anglais traduit

Quand une tournure anglaise n'a pas d'équivalent, **on ne traduit pas la
formule : on reformule l'idée** en français naturel.

**Calques lexicaux** à proscrire : *faire sens*, *adresser* un problème,
*réaliser que*, *juste* emphatique, *être supposé*, *en charge de*,
*supporter* au sens de soutenir, *opportunité*, *versatile*,
*éventuellement* au sens de *finalement*, *actuellement* au sens de *en
réalité*, *prétendre* au sens de faire semblant, *excité*, *initier* un
geste, *délivrer* un message, *compléter*, *une décade*, *rencontrer* un
objectif, *sauver du temps*, *en termes de*, *basé sur* en tête de phrase.

**Expressions décalquées** : *à la fin de la journée*, *le meilleur des deux
mondes*, *longue histoire courte*, *pour être honnête* en tic,
*littéralement* emphatique, *quelque part* émotionnel, *c'est à propos de*,
*embrasser* une idée, *faire une différence*, et la chute type « et d'une
certaine manière, c'était pire ».

**Clichés gestuels de fiction traduite** — le péché est la rafale : le souffle
qu'on ne savait pas avoir retenu, les yeux qui s'écarquillent, le frisson le
long de l'échine, le sourire qui n'atteint pas les yeux, les jointures qui
blanchissent, la main dans les cheveux, le muscle de la mâchoire, le sourcil
haussé, les épaules qui s'affaissent. Et leurs équivalents intérieurs :
« quelque chose passa dans son regard », « une part de lui », « il se
surprit à », « il ne put s'empêcher de », « la réalité le frappa ».

**Tics de rythme** : le silence qui s'étire ou qu'on couperait au couteau,
« un long moment », « Un battement. », le mot suspendu dans l'air, le temps
qui semble ralentir, les fragments dramatiques en rafale (« Il ouvrit la
porte. S'arrêta. Se retourna. »), les chutes en punchline d'un mot (« Pas
aujourd'hui. »), la cadence sujet-verbe-complément martelée.

Ces gestes se remplacent par une notation concrète, sobre et située. Le
modèle est la litote de Sorin : *« le papier était humide à un endroit. Je ne
notai pas autre chose. »*

**Test.** Un auteur français qui n'a jamais lu la phrase anglaise
l'écrirait-il ainsi ? Sinon, réécrire.

---

## 11. « Pas de magie »

Le mot **magie** n'existe jamais dans la voix d'un narrateur ni dans celle
d'un lettré. C'est un mot **du peuple** pour l'inexpliqué : on le rapporte,
on ne l'endosse pas (« au port, ils disent magie »).

Chaque culture nomme l'anormal dans son registre : *syndrome*, *remutation*,
*parasites de perception*, *anomalie*, *perturbation de la trame* côté
institution ; *miracle*, *sacrilège*, *Souffle* côté religion ; *dons*, *ceux
qui entendent*, *ce qui répond*, *l'oublié qui remonte* côté populaire.

**Ce qui est structurel se décrit, ne s'explique pas.** Le Lien, les Failles,
la pulsation, le battement : on note ce qu'on observe — un pouls dans le sol,
un son dans les galeries, une trame qui se modifie et qui se *mesure*. Ni
mécanisme, ni cause. Sorin, cartographe, **mesure** l'anormal ; il ne
l'exotise jamais.
