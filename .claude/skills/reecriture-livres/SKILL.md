---
name: reecriture-livres
description: Écrire, réécrire ou relire la prose des livres d'Hybélior (Les Chroniques de l'Exilé, trilogie Les Trois Coups). Porte la poétique complète du corpus — voix, POV, narrateurs protégés, clausules, interdiction des pivots, dispositifs documentaires, typographie — et corrige le style sentencieux au profit d'une prose claire et immersive. À charger AVANT toute réécriture de chapitre, rédaction de scène narrative ou relecture stylistique des textes de fiction du projet.
---

# Écriture et réécriture des livres d'Hybélior

Ce skill est **la seule source de la manière**. Les bibles (`_bible.md`,
`_bible-v2.md`, `_arc-sorin.md`) ont été dépouillées : ce qu'elles disaient
de *comment on écrit ce monde* est ici, ce qu'elles disaient *du monde* est
dans l'**Atrium** (`data/kg-base.json`), qui tranche.

Trois fichiers, à lire dans cet ordre avant de toucher un chapitre :

1. **`SKILL.md`** (ici) — le diagnostic, la cible, les règles de réécriture,
   la méthode, la checklist.
2. **`POETIQUE.md`** — l'interdiction des pivots et ses dix formes, la
   clausule, l'organe du chapitre, les narrateurs protégés, les dispositifs
   documentaires, le fair-play du narrateur non fiable, la règle de
   coïncidence, la typographie, le français non calqué, « pas de magie ».
   **Obligatoire.**
3. **`VOIX.md`** — qui parle comment : signatures de dialogue, lignées,
   angles morts, la voix de Sorin, le régime du dialogue. À lire dès que le
   chapitre a un POV nommé.

Et la consigne qui gouverne tout le reste :

> **Aucune phrase n'est gardée au mot près, dans aucune bible** (consigne de
> l'auteur). Ce qui survit d'une citation, c'est sa **fonction** : le fait, le
> double-fond, le beat, l'écho. La formule, jamais. Une phrase creuse se
> réécrit, fût-elle « canon ». Les seules exceptions sont nommées dans
> `POETIQUE.md` §6 : les Fragments du journal de Thessan et les citations
> in-world tenues au mot près.

---

## 1. Le diagnostic — le tic sentencieux

Le symptôme, dans les mots de l'auteur : « plein de phrases qui veulent
paraître intelligentes mais qui ne veulent rien dire, et on ne se sent pas
bien dedans ». Six mécanismes le produisent.

### 1.1 La maxime en rafale

Chaque paragraphe se clôt sur une généralité au présent gnomique. Prise
isolément, chacune passe. En rafale — trois à cinq par page — le récit
devient un recueil de proverbes : le lecteur n'est plus dans la scène, il
assiste à un exposé de sagesse. Et la moitié sont creuses : la forme du
théorème sans le contenu.

### 1.2 La phrase-miroir creuse

Le chiasme ou la boucle qui mime la profondeur. Relues deux fois, ces phrases
ne disent rien, ou disent une chose simple en la rendant illisible.

### 1.3 L'inversion maniérée en système

L'antéposition du complément employée comme signature à chaque page. Une fois
par chapitre, c'est un effet ; en système, c'est une pose, et la lecture
devient une gymnastique.

### 1.4 Tout le monde parle en aphorismes

Chaque personnage secondaire livre sa punchline de sagesse. Résultat : tous
ont la même voix — celle de l'auteur — et le monde devient une usine à
proverbes. Personne n'y parle comme les gens parlent.

### 1.5 L'émotion commentée au lieu d'incarnée

Le narrateur n'éprouve rien qu'il n'analyse aussitôt. Chaque sensation est
convertie en observation sur soi, chaque moment chaud est refroidi dans la
phrase suivante. La retenue est canon ; la dissection ne l'est pas. C'est le
« on ne se sent pas bien dedans ».

### 1.6 Le pivot

Nier X pour poser Y. C'est le tic le plus coûteux du corpus, et le plus
invisible : plusieurs centaines d'occurrences y ont été retirées une par une,
là où les greps n'en voyaient qu'un dixième. **Il a son chapitre entier dans
`POETIQUE.md` §1, avec ses dix formes.** On n'en écrit plus.

---

## 2. La cible

L'idéal : la prose transparente des grands raconteurs modernes — l'influence,
jamais le pastiche. La phrase s'efface devant la scène.

1. **La phrase sert la scène, pas l'inverse.** Si une phrase attire
   l'attention sur sa propre intelligence, elle est suspecte.
2. **Une idée par phrase quand la tension monte.** Les subordonnées empilées
   se réservent aux moments calmes.
3. **Sujets concrets, verbes actifs.** L'abstraction en position de sujet est
   une alarme.
4. **L'émotion passe par le corps, le geste, le détail — puis on la laisse
   tranquille.** Un moment de chaleur a le droit d'être bon quelques phrases
   avant que l'ironie ne revienne. Le lecteur a besoin d'endroits où
   respirer.
5. **Le dialogue sonne parlé** (`VOIX.md` §7).
6. **L'élan.** Chaque scène tire vers la suivante. Couper toute glose qui
   suspend le récit pour méditer.
7. **La version plate gagne toujours.** Quand deux formulations se valent —
   l'une à pointe, à pivot, à retournement ; l'autre qui dit simplement la
   chose —, prendre la plate, même si la pointe se « déplie » en énoncé vrai.
   Le mordant du livre vient des scènes et du sous-texte, jamais des
   tournures.

   > Tranché sur pièce : « On leur avait confié la besogne parce qu'entre des
   > mains armées, elle aurait eu l'air de ce qu'elle était » → retenu : « On
   > leur avait confié la besogne pour que la saisie garde l'air d'une
   > formalité. »

---

## 3. Ce qui se garde

1. **Les faits.** Noms, lieux, dates, jours, itinéraires, phénomènes
   observés, ce que chaque personnage sait ou ignore, l'ordre des scènes. Ils
   sont dans l'Atrium et **l'Atrium tranche** : si un chapitre le contredit,
   c'est le chapitre qui a tort ; si c'est l'Atrium qui a tort, on le corrige
   là et le reste suit. **La réécriture est stylistique, jamais
   scénaristique.**
2. **La fonction des phrases-pièges.** Le double-fond doit rester lisible
   deux fois — la lettre exacte, non. Au moins un double-fond **factuel** par
   chapitre des Chroniques (`POETIQUE.md` §7).
3. **La voix du narrateur** : retenue, précision, lexique du métier, marges,
   ratures, astérisques, pages blanches. On corrige la sentence, pas le
   tempérament.
4. **Les échos, au sens et non à la lettre.** Réécrire une phrase reprise
   ailleurs oblige à **propager** la nouvelle version partout, dans le même
   commit. Un écho cassé est une faute ; une formule figée n'est pas une
   vertu.
5. **Les répétitions voulues** — les fragments et leurs copies fautives
   (`POETIQUE.md` §4). Celles-là se tiennent au mot près.
6. **La structure des fichiers** : frontmatter, titre, exergue et ligne
   lieu/jour pour les Chroniques, séparateurs de scène, guillemets français,
   longueur cible ±15 % de l'original. Gabarits en `POETIQUE.md` §9.

---

## 4. Les règles de réécriture

### R1 — Quota de maximes : deux par chapitre, maximum.

Et seulement si la maxime (a) dit quelque chose de vrai et de vérifiable dans
la scène, (b) est payée par ce qui précède, (c) appartient à la compétence de
celui qui la dit. L'étalon d'une maxime **gagnée**, prise au ch. 1 des
Chroniques :

> « Une carte bien rangée se saisit vite. Une saisie qui va vite ne fouille
> pas. »

Elle a l'air d'un aphorisme, c'est une **tactique** : concrète, vérifiable,
elle explique un geste qu'on vient de voir. Toutes les autres généralités :
les couper, ou les **redescendre dans le concret**.

> Avant : « Les cartographes gardent les phrases comme les altitudes : on ne
> sait jamais laquelle finira par situer un lieu. »
> Après : « J'ai noté sa phrase dans le carnet, sous l'altitude du col. »

Le geste dit la même chose, et il fait avancer la scène.

### R2 — Phrases-miroirs : interdites.

Tout chiasme, toute boucle auto-référente se réécrit en disant la chose.

> Avant : « je fermai le cahier, comme on ferme une chose qu'on n'a rien à
> cacher de fermer. »
> Après : « Je fermai le cahier sans hâte, et je laissai la sangle dénouée.
> Qu'elle voie que je ne le verrouillais pas. »

L'intention survit — en geste.

### R3 — Inversions : une antéposition marquée par chapitre, grand maximum.

Le reste se remet à l'endroit. « Elle ne me demanda pas mon nom » et non
« Mon nom, elle ne me le demanda pas ». La variété des attaques de phrase
s'obtient par le rythme, les incises à la française, les longueurs — pas par
la contorsion. Viser au plus ~15 % de phrases commençant par Il / Elle / Iel
/ Je.

### R4 — Un seul personnage mémorable par chapitre.

Au plus un secondaire a droit à une réplique qui reste. Les autres parlent
leur métier : prix, distances, bêtes, méfiance, fatigue. Leur sagesse se
montre dans ce qu'ils **font** — la cuisinière plante une seconde galette
dans le bol sans demander si on peut payer, et c'est mieux que sa punchline.

### R5 — Laisser vivre les bons moments.

Quand une scène est chaude, écrire au moins quelques phrases de pur présent
sensoriel **sans** conversion analytique. L'ironie revient après, et elle en
sort plus forte. De même pour la peur, la fatigue, le soulagement : d'abord
le corps, ensuite seulement, et pas toujours, la note du cartographe.

### R6 — Grammaire irréprochable.

Le français des livres est un français naturel de naissance : subjonctifs
justes, négations complètes, pas d'archaïsme de décor. Le passé simple est la
norme du récit dans la trilogie ; il doit être correct partout. Les
Chroniques alternent le passé du journal et le présent de scène aux ouvertures
de chapitre, sans lourdeur.

### R7 — Aucun pivot.

`POETIQUE.md` §1. On lit, on ne se fie pas au grep. Correction par
suppression sèche d'abord.

### R8 — L'exergue reste, mais concret.

L'exergue de chapitre est un paratexte : il a droit à la formule. Même là,
préférer le concret et le culturellement situé à l'abstraction.

---

## 5. Méthode — écrire ou réécrire un chapitre

1. **Lire dans l'ordre** : ce fichier, `POETIQUE.md`, `VOIX.md` pour les POV
   du chapitre ; les fiches de l'Atrium qui concernent les personnages, les
   lieux et les faits du chapitre ; le chapitre voisin de chaque côté ; puis
   le chapitre original en entier. Pour les Chroniques, lire aussi le ch. 1 :
   c'est l'étalon de voix.
   *Une grille reste en dehors de ce skill parce qu'elle sert tout le lore et
   pas seulement les livres :* `Docs/Lore/_Analyse/Veines philosophiques -
   Référence.md`. *Elle donne le lexique de travail — Charge, Voile, Rouille,
   Tranchant, Sablier — qui n'apparaît jamais dans la prose des livres.*
2. **Inventaire de survie**, avant d'écrire : lister les faits, les beats, le
   double-fond factuel, les échos inter-chapitres, les répétitions voulues,
   la clausule et l'organe du chapitre, les deux maximes gagnées qu'on garde.
   Tout le reste est réécrivable.
3. **Nommer l'organe du chapitre** en une phrase, avant la première ligne.
   S'il ne se nomme pas, le chapitre n'en a pas encore.
4. **Réécrire scène par scène**, dans l'ordre. Ne pas paraphraser phrase à
   phrase : réécrire la scène comme si on la racontait soi-même, inventaire
   sous les yeux. La paraphrase garde le squelette du tic ; la réécriture le
   remplace.
5. **Écrire la clausule en dernier**, depuis l'organe, et la vérifier contre
   le corpus.
6. **Auto-contrôle** avec la checklist §7, puis
   `node scripts/normalize-typo-livres.js`.
7. **Ne toucher à rien d'autre** : pas de renommage de fichier, pas d'édition
   des index (`chroniques-index.json`, `roman-index.json`), pas de
   modification de l'Atrium sans mandat explicite.

---

## 5bis. Le refrain — le tic qui ne se voit pas chapitre par chapitre

Après réécriture chapitre par chapitre, le creux ne survit plus dans la
phrase isolée mais dans le **motif répété** : la même formule dans cinq
bouches, le même pivot en ouverture de deux chapitres consécutifs, le même
refrain du narrateur cinq fois en cinq chapitres, le même « Toute sa vie,
il avait… » trois fois dans un lot. Un relecteur par chapitre ne le voit pas.

Donc, après le lot : **grep de chaque formule marquante sur tout le corpus**.
Une formule appartient à une seule bouche et ne revient qu'en écho voulu, au
plus deux fois, loin l'une de l'autre. Attention : une incise suffit à cacher
un refrain d'un grep (« Toute sa vie **d'homme**, il avait… ») — on relit.

Une relecture linéaire par tranches de sept à huit chapitres, avec rapport et
corrections locales, coûte peu et attrape ce que le lot a laissé.

---

## 6. Méthode d'édition — l'insécable qui fait échouer en silence

Les fichiers contiennent des **espaces insécables** (avant `; : ! ?`, dans
les guillemets). Un remplacement littéral copié-collé depuis un affichage
échoue donc **sans erreur** : il ne trouve rien, et on croit avoir corrigé.

On passe par un motif tolérant aux blancs, et **on vérifie le compte** :

```python
import re
motif = re.compile(r"\s+".join(map(re.escape, texte.split())))
nouveau, n = motif.subn(remplacement, contenu)
assert n == 1, f"{n} occurrences au lieu de 1"
```

`n == 0` veut dire que le motif est faux, jamais que la phrase est absente.
`n > 1` veut dire qu'on s'apprête à toucher autre chose.

Après édition, vérifier que **rien d'autre n'a bougé** : frontmatter, titre,
exergue, séparateurs, blocs cités, nombre de lignes et de paragraphes
identiques à `HEAD`, et clausules identiques sauf quand on les a voulues
changées.

---

## 7. Checklist finale (avant de rendre un chapitre)

**Le style**
- [ ] Généralités au présent gnomique : ≤ 2, toutes gagnées.
- [ ] Zéro phrase-miroir. Motifs suspects : « C'est le propre de », « On ne …
      pas ; on », « Un homme qui … est un homme qui », « comme on … ce qu'on
      … », « ce que … dit à qui sait ».
- [ ] **Zéro pivot en narration.** Les dix formes relues une par une, pas
      seulement grepées ; les faux positifs écartés avec leur raison ; les
      pivots en bouche vérifiés comme appartenant à la méthode du personnage.
- [ ] Antépositions marquées : ≤ 1. Attaques en Il/Elle/Je : ≤ ~15 %.
- [ ] Aucun calque de l'anglais, aucun cliché gestuel de fiction traduite
      (`POETIQUE.md` §10).
- [ ] Le mot « magie » n'est dans aucune bouche savante ni dans le narrateur.

**La structure**
- [ ] L'organe du chapitre se nomme en une phrase, et la clausule en sort.
- [ ] Clausule : mesurée sur la **dernière phrase** ; aucune autre clausule du
      corpus ne partage cinq mots avec elle ; aucune figure interdite.
- [ ] ≥ 70 % de temps de scène ; 2 à 4 confrontations parlées à sous-texte ;
      un seul personnage à réplique mémorable.
- [ ] Au moins un moment sensoriel laissé en paix, non analysé.
- [ ] Si c'est un chapitre de voix protégée : **aucune narration**, et la
      dégradation ou l'acquisition est au bon palier.

**Le canon**
- [ ] Le double-fond factuel du chapitre est intact et se lit deux fois —
      dans les mots retenus. Si une phrase citée ailleurs a été réécrite, la
      nouvelle version est propagée partout.
- [ ] Aucun mystère protégé n'a été résolu, ni frôlé de trop près
      (`POETIQUE.md` §8).
- [ ] Aucune chaîne causale narrée là où le texte ne montre qu'une
      coïncidence. Aucun antagoniste devenu méchant.
- [ ] Les faits concordent avec l'Atrium.

**La forme**
- [ ] Frontmatter, titre, exergue, ligne lieu/jour, séparateurs : intacts.
- [ ] Longueur : ±15 % de l'original (`wc -w`).
- [ ] Typographie française vérifiée après
      `node scripts/normalize-typo-livres.js` ; aucune parenthèse dans la
      prose ; tirets longs réservés aux dialogues.
- [ ] Grep des formules marquantes du chapitre sur tout le corpus : aucune ne
      revient dans une autre bouche (§5bis).
- [ ] Aucune retombée créée : pas de nouvelle collision lexicale avec un
      autre chapitre, pas de nouveau refrain.
- [ ] Relecture à voix haute d'un passage au hasard : si une phrase demande
      deux lectures pour être comprise, la simplifier.

---

## 8. Mécanique du dépôt

- Le site lit les `.md` directement depuis `Docs/` : régénérer les index après
  un lot de chapitres —
  `node scripts/gen-doc-manifest.js && node scripts/gen-search-index.js`.
- Committer en français, par lots cohérents (un acte = un commit), sur la
  branche de travail désignée ; pousser aussi sur `main` en fast-forward
  vérifié.
- Les versions audio (`Docs/Lore/_Audio/`) deviennent obsolètes pour tout
  chapitre réécrit : le signaler, ne pas les régénérer sans demande.

---

## 9. Organisation du travail (sous-agents)

- **Modèle imposé par l'auteur : Opus 5** (`model: "opus"`) pour tout
  sous-agent de réécriture. Ne pas déléguer un chapitre à un modèle plus
  petit.
- Un agent par chapitre ; **lots de 5 agents au plus** en parallèle.
- Le prompt d'un agent contient : ce skill et ses deux compagnons, le
  chapitre étalon validé par l'auteur, les fiches de l'Atrium utiles, les
  chapitres voisins, l'original, et la consigne de réécrire en place puis de
  passer `scripts/normalize-typo-livres.js` et la checklist §7.
- **Ne jamais croire un rapport d'agent sur parole.** Un lot annoncé à zéro
  pivot en portait trente-cinq ; un scanner mal filtré rend zéro sur neuf
  chapitres. Avant de committer, vérifier soi-même : `wc -w` contre
  `git show HEAD:`, la fin du fichier (brouillon complet ?), le frontmatter,
  les insécables, les clausules, les greps de la checklist.
- Un agent interrompu laisse parfois un brouillon complet sur le disque : le
  récupérer après ces mêmes contrôles plutôt que relancer.
