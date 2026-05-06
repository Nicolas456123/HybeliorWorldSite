---
tags: [interface, ui, hud, immersion, philosophie-design, mécanique-centrale]
status: drafted
last_review: 2026-05-07
needs_review_for: []
type: mechanic-narrative
implementation: "[[UI Specifications]]"
---

# 🖥️ Interface — la transparence du regard

> *« La meilleure interface est celle qu'on oublie d'avoir vue. Ce qu'on retient, ce sont les choses du monde — la lumière qui change, le poids d'une lame, le silence qui suit un cri. Pas les barres et pas les chiffres. »*
>
> *— note d'intention, atelier de design d'Hybelior*

---

## L'idée d'interface chez Hybelior

Un MMO contemporain s'ouvre, le plus souvent, sur un mur. Mur de jauges, de mini-cartes, de timers, de quêtes empilées dans un coin, de tooltips qui débordent dès qu'on survole quoi que ce soit. Le monde 3D devient un fond, derrière la couche d'information. Le joueur passe en réalité plus de temps à lire son écran qu'à le **voir**.

Hybelior part du refus inverse. **L'interface doit servir l'immersion, pas la combattre.** Elle existe pour soutenir le joueur quand il en a besoin — et **disparaître** quand il n'en a pas besoin. Elle n'est pas une feuille de stats permanente, ni un tableau de bord. C'est une présence discrète, qui s'avance quand on la sollicite et se retire quand le monde reprend la parole.

Cette philosophie n'est pas une simplification. C'est une **exigence**. Concevoir une UI minimale est plus difficile que d'en empiler les couches : il faut décider, pour chaque information, si elle mérite vraiment d'être là, en permanence, sous les yeux du joueur. La plupart ne le méritent pas. C'est le travail du designer de le reconnaître.

---

## Ce qu'on voit, ce qu'on ne voit pas

Hybelior applique à son interface la même grille que ses [[Vision Rules]] appliquent au monde : trois régimes de visibilité. **Ce qui aide à vivre** est montré sans hésiter. **Ce qui aide à comprendre** se révèle à la demande. **Ce qui révélerait des chiffres bruts** — la mécanique nue derrière la fiction — est caché, ou traduit en signes vivants.

Un joueur n'a pas besoin de voir, en permanence, le pourcentage exact d'efficacité de sa Voie face à l'Ère en cours. Il a besoin de **sentir** que sa magie résonne, ou qu'elle peine. La friction se vit dans les corps avant de se lire dans les chiffres. Quand l'information mécanique apparaît, c'est qu'elle aide le joueur à choisir — pas à se rassurer sur des nombres.

Il y a, dans ce parti pris, une confiance dans le joueur. On ne lui sert pas tout sur un plateau ; on lui laisse le temps d'observer, de comprendre, de demander. L'écran n'est pas un cockpit qui affiche tous les voyants. C'est une **fenêtre** sur un monde qui, lui, sait ce qu'il fait.

> *« On ne montre au voyageur que ce dont il a besoin pour avancer. Le reste, il le découvrira en marchant. »*
>
> *— principe de design, atelier UI*

---

## L'UI comme gestuelle

L'interface d'Hybelior est pensée comme une **gestuelle** — un enchaînement de mouvements naturels, pas une bureaucratie. Quand le joueur a besoin de son inventaire, il y va d'un geste. Quand il en sort, le monde revient sans transition lourde. Pas de fenêtres qui s'ouvrent à la chaîne, pas de menus imbriqués où l'on se perd.

Cette gestuelle est aussi un acte de refus. Hybelior a écarté plusieurs patterns que les MMO traitent comme acquis. Pas de **barre de quêtes intrusive** scotchée en permanence sur le côté de l'écran : la quête active du joueur est sa propre intention, pas un objectif qu'on lui rappelle toutes les trois secondes. Pas de **mini-carte omniprésente** qui réduit le monde à une surface 2D consultée plus souvent que la 3D : la carte se consulte volontairement, comme on déplie une carte de papier. Pas de **tooltips qui spoilent** la statistique cachée d'un objet ou la condition rare d'une quête : ce qui est caché reste caché, parce que la découverte est une partie du jeu, pas un défaut à corriger.

Pas non plus de **marqueur ! ou ?** au-dessus des PNJ. À Hybelior, un PNJ n'est pas un distributeur de quêtes. C'est une présence. Pour savoir s'il a quelque chose à dire, il faut s'approcher, parler, écouter. C'est plus lent. C'est volontaire.

> *« Si je dois te dire que ce villageois a une quête en collant un point d'exclamation au-dessus de sa tête, alors j'ai déjà perdu : je viens de t'avouer que sans ce signe, tu serais passé sans le voir. Le bon design fait que tu t'arrêtes parce qu'il **mérite** ton arrêt, pas parce qu'un pictogramme te le commande. »*
>
> *— note d'atelier, Hybelior*

---

## Les écrans-paliers

Quand le joueur ouvre son inventaire, sa fiche de personnage, sa carte ou le panneau de sa guilde, ce ne sont pas des **menus**. Ce sont des **lieux**. Un changement de regard. Une pause dans la course du monde, où l'on s'assied un instant pour faire le point.

L'**Inventaire** est une bourse dépliée — on y voit ce qu'on porte, ce qu'on a accumulé, le poids des choix qu'on a faits. Le **Personnage** est un miroir — la silhouette qu'on est devenu, les disciplines qu'on a apprises, les titres qu'on a gagnés, les Ères qu'on a traversées. La **Carte** est un parchemin — ce qu'on connaît, ce qu'on devine, ce qu'on n'a pas encore vu. La **Guilde** est une salle commune — qui est là, qui ne l'est pas, qui prépare quoi.

Ces écrans-paliers sont conçus pour qu'on s'y attarde sans y rester coincé. Ils répondent vite, ils ferment vite, ils n'imposent jamais une lecture exhaustive. On y entre pour une chose précise, on en sort dès qu'on l'a faite. Mais quand on choisit d'y rester — pour réorganiser sa bourse, pour relire ses titres, pour rêver sur une zone encore inexplorée — l'écran se laisse habiter.

> *« Mon inventaire n'est pas une grille. C'est un sac. J'y range mes choses comme je rangerais mes affaires sur une table de campement, après une longue journée. »*
>
> *— Maël, joueuse, journal d'expérience*

---

## Le HUD comme bruit minimal

En combat, le **HUD** doit accompagner sans étourdir. Hybelior a tranché net : trois barres de ressources, et c'est tout. Pas de cinq, pas de huit. Pas d'interface superposée qui transforme l'écran en cabine de pilotage.

La règle est simple : **ce qui est vital reste visible**, le reste s'efface. Le joueur a besoin de voir sa vie ; il a besoin de sentir son endurance ; s'il manie une Voie, il a besoin de sa réserve. Le reste — les buffs détaillés, les cooldowns secondaires, les statistiques d'attaque — se révèle au moment où il devient pertinent, et redisparaît dès qu'il cesse de l'être.

Cette discipline se paie. Les joueurs habitués aux interfaces saturées doivent **réapprendre à lire le combat dans le combat** — dans la posture de l'ennemi, dans le poids de leur propre arme, dans le son qui change quand quelque chose va arriver. Cet apprentissage n'est pas un coût. C'est le **but**. Quand on combat à Hybelior, on combat un adversaire, pas une feuille Excel animée.

Et au-dessus des barres, un seul indicateur permanent : le **bandeau d'Accord** de l'Ère en cours. Pas une barre d'XP, pas un niveau global, pas un compteur de puissance. Juste cette petite jauge qui dit, en un coup d'œil, à quel point on est accordé au monde tel qu'il est *aujourd'hui*. Parce que c'est, à Hybelior, la seule forme de progression qui mérite d'être affichée en permanence.

---

## L'accessibilité

Une interface qui se veut transparente doit l'être pour **tous les regards**. Hybelior assume une posture inclusive : un joueur daltonien doit voir les menaces aussi clairement qu'un autre ; un joueur malvoyant doit pouvoir agrandir le texte sans que la mise en page se désagrège ; un joueur sourd doit pouvoir traduire en signe visuel ce que d'autres entendent ; un joueur dont les mains fatiguent vite doit pouvoir simplifier les inputs sans qu'on lui retire pour autant la profondeur du jeu.

Cette inclusivité n'est pas une couche ajoutée à la fin. C'est une **dimension du design dès l'origine**. Une menace n'est jamais signalée par sa seule couleur — toujours par une forme, un mouvement, un son qui la double. Un combo n'a jamais une fenêtre temporelle si serrée qu'elle exclut les mains lentes. Un dialogue est lisible sans audio.

Hybelior considère qu'un monde qui prétend être un foyer commun doit l'être pour tout le monde, pas seulement pour ceux dont les sens et les réflexes correspondent à la moyenne. Cette exigence rejoint celle, plus large, du [[Souffle]] : un monde qui respire avec ceux qui le peuplent ne peut pas commencer par en exclure une partie.

> *« L'accessibilité, ce n'est pas un mode pour les autres. C'est le test de sincérité d'un design qui prétend penser au joueur. »*
>
> *— note d'atelier, Hybelior*

---

## Synthèse

L'interface d'Hybelior n'est pas une vitrine. C'est une **porte**. Elle laisse entrer dans le monde, et elle laisse le monde s'exprimer sans que sa propre présence ne fasse écran. Quand elle est là, c'est qu'on en a besoin. Quand on n'en a plus besoin, elle s'efface.

Ce parti pris coûte cher en effort de design. Il refuse les solutions de facilité, les automatismes du genre, les habitudes acquises. Il oblige à se demander, à chaque pixel, *« est-ce que ça mérite vraiment d'être là ? »*. La plupart du temps, la réponse est non.

Et c'est dans ce **non** que se joue, silencieusement, la promesse d'Hybelior : un monde qui se laisse regarder.

> *« Le monde d'abord. L'interface ensuite. Toujours dans cet ordre. »*
>
> *— premier principe de l'atelier UI d'Hybelior*

---

*Liens narratifs : [[Personnage]] | [[Combat]] | [[Progression]] | [[L'Accord]] | [[Vision Rules]] | [[Le Souffle]]*

*Implémentation technique (mockups, raccourcis, layouts, accessibilité chiffrée) : [[UI Specifications]]*
