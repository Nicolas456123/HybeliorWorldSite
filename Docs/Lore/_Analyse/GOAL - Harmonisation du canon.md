---
tags: [goal, chantier, harmonisation, cohérence, canon, méta, gdd, lore, romans]
type: meta-goal
status: arbitré — exécution en cours
date: 2026-07-15
phase-0-arbitrée: 2026-07-15
portée: [GDD, Lore/Chronologie, Lore/Pays, Lore/Histoires, Lore/Religions, Romans, artefacts-site]
dépend_de: [Audit cohérence 2026-07-05.md]
---

# GOAL — Harmonisation du canon d'Hybelior
### Rendre les articles raccord entre eux, puis corriger les romans et leur histoire

> **En une phrase.** Le monde d'Hybelior existe désormais sur trois couches — le GDD (règles et cosmologie), le Lore (Chronologie, Pays, Histoires, Religions) et les quatre livres (les *Chroniques de l'Exilé* et la trilogie *Les Trois Coups*). Ces couches ont grandi à des rythmes différents ; elles se contredisent aujourd'hui sur des points structurants. Ce document est le plan de bataille pour les remettre d'accord, dans l'ordre : d'abord les articles entre eux, ensuite les romans contre les articles, enfin le site.

---

## 1. Objectif

Obtenir un canon où :

- **les articles ne se contredisent plus entre eux** — un lecteur qui ouvre deux fiches sur le même sujet lit la même chose ;
- **les romans ne contredisent plus les articles** — les quatre livres se déroulent dans le monde décrit par le GDD et la Chronologie, sans y ouvrir de trous ni de collisions ;
- **le site reflète l'état réel du corpus** — plus d'index ni de pages figés sur une version périmée ;
- **et les mystères voulus restent intacts.** Harmoniser ne veut pas dire tout expliquer. Le monde repose sur des ambiguïtés délibérées ; les aplatir serait une régression, pas un progrès. La section 3 les protège explicitement.

Ce goal ne « corrige » rien encore. Il établit *quoi* corriger, *dans quel ordre*, et *ce qui doit d'abord passer par toi*.

---

## 2. Comment ce goal a été bâti

Le corpus complet a été relu et audité : les quatre livres dans leur intégralité (environ 800 000 mots), toute la Chronologie, les fiches Pays/Histoires/Religions, la pile GDD et les artefacts du site. Quatorze axes de cohérence ont été examinés en parallèle, chaque constat étant ensuite soumis à un **contre-examen adversarial** chargé de le réfuter avant de le retenir — la même méthode que l'audit du 5 juillet, qui avait ainsi écarté 21 fausses alertes sur 360.

| Résultat de l'audit | Nombre |
|---|---|
| Constats bruts examinés | 214 |
| **Confirmés après contre-examen** | **124** |
| — dont sévérité haute | 29 |
| — dont sévérité moyenne | 79 |
| — dont sévérité basse | 16 |
| À arbitrer (contre-examen non tranchant) | 5 |
| **Écartés (réfutés par la contre-lecture)** | 12 |
| Non re-vérifiés (basse sévérité, hors échantillon) | 73 |

Les 124 confirmés et les 5 à arbitrer forment l'inventaire de l'**Annexe A** (129 entrées numérotées). Les 12 écartés sont en **Annexe B** — je les liste pour transparence, ils ne demandent aucun travail. Les 73 non re-vérifiés sont des points de basse sévérité (renvois wikilink cassés, anglicismes résiduels, graphies flottantes) ; ils seront ramassés au fil des phases sans les instruire un par un.

**Niveau de confiance.** Haut sur les contradictions dures (dates en collision, listes rivales, homonymies confirmées par citation). Les cinq « à arbitrer » sont précisément les cas où la contre-lecture n'a pas pu trancher sans toi — ils remontent en section 4.

---

## 3. Principe directeur : la hiérarchie et les mystères à protéger

### La hiérarchie d'arbitrage (héritée du 5 juillet, toujours en vigueur)

Quand deux sources se contredisent, l'ordre de priorité est :

**Chronologie** (`Docs/Lore/Chronologie/`) > **majorité du corpus** > **plus petit retcon**.

Avec deux nuances que l'audit a fait ressortir et qui demandent ton arbitrage explicite (section 4) :

1. Certaines décisions **postérieures** à la refonte de la Chronologie (les décisions « D-COSMO » du 7 mai, côté GDD) sont plus récentes et paraissent délibérées. Sur le roster des Cosmiques, la règle mécanique « Chronologie d'abord » détruirait des pans entiers du gameplay. La hiérarchie reste la règle par défaut, mais elle cède devant une décision d'auteur récente et assumée.
2. Le **texte publié des romans prime** sur les bibles quand il n'y a pas de conflit avec le canon supérieur : les bibles sont des documents de fabrication, elles doivent rattraper le texte, pas l'inverse.

### Les mystères à ne jamais harmoniser

L'audit a cartographié les ambiguïtés délibérées du monde. **Elles ne sont pas des incohérences à corriger ; les corriger serait l'erreur.** La liste complète est en Annexe C. Les principales :

- **Les six lectures de l'Arrachement** — aucune ne s'impose ; on ne corrige que la *taxonomie* (est-ce un Souffle Cardinal ?), jamais la *cause*.
- **La causalité du geste de l'Étudiant** — jamais établie en fait. Le roman *incarne* la lecture verithane (les Huit *croient* agir) sans jamais prouver que leur rituel a causé l'Arrachement. Le delta de Mirathis et la « silhouette de plus » de Velkar sont les garde-fous.
- **« Revenir ou commencer »** — la voix qui naît au tome 3 ne sait pas si elle est le Lien qui revient ou une naissance neuve, et ce n'est jamais tranché, jusqu'à la dernière page.
- **L'auteur de la Guerre de l'Ombre** — jamais révélé ; Sanne meurt « sans visage, sans revendication ». La « troisième chose qui ne signe rien » reste sans réponse.
- **Les termes du Pacte Primordial**, **la cause des Souffles Cardinaux**, **le retrait de Navigor**, **le sort d'Aldric** (les « trois cartes »), **la filiation de l'enfant qui entend**, **l'identité du Panghor / du dessous** — tous flous par décision.
- **Le double calendrier** lui-même (an 251 du Sillage = ~10 200 ap.A) : « quinze siècles » (T2) et « dix mille ans » (T3) sont des usages *conformes* du temps profond, pas des erreurs.

Chaque chantier ci-dessous porte, quand c'est nécessaire, un rappel « ne pas trancher tel mystère ».

---

## 4. Les décisions qui te reviennent — le point de départ

Rien de lourd ne peut être exécuté proprement avant ces arbitrages, parce qu'ils commandent des dizaines de corrections en aval. **C'est ici que le chantier commence.** Pour chacun je donne une recommandation, mais la décision est tienne.

### 4.1 — Décisions structurantes (bloquantes)

**D1. Le roster des douze Cosmiques.** Deux listes rivales coexistent : celle de la Chronologie (Aquor, Terranu, Aerion, Climata, Gravitas, Vortex, Judicar, Fatum, Spiritus, Stellaris, Aetheron, Etherius) et celle du GDD / décision D-COSMO-4 (Aerion, Aquor, Aurion, Umbra, Spiritus, Fatum, Terranu, Somnix, Ignara, Sanguis, Resonia, Vermis). Cinq noms seulement sont communs. **C'est la décision-mère** : elle commande les Voies jouables, la chimie élémentaire (feu/eau/ombre/rêve), les dominantes d'Ère, les rubriques doctrinales des neuf religions.
→ *Recommandation : adopter la liste GDD (D-COSMO-4) comme canon, et amender la Chronologie en conséquence.* C'est la décision la plus récente, elle est délibérée, et elle porte tout le système jouable — l'appliquer à l'envers casserait sept Voies et la chimie du combat. Les entités de la liste Chronologie qui disparaissent (Climata, Gravitas, Stellaris…) seraient reversées au rang des entités « Astrales/Célestes ».

**D2. Le mot « Céleste ».** Il désigne aujourd'hui deux choses incompatibles : un *rang d'entités* natives (« 21 Célestes » de la Chronologie, avec Arborius, Cantor, Somnix) et un *mortel élevé à un siège* (Cosmologie.md). Il faut en réserver un seul sens.
→ *Recommandation : « Céleste » = le mortel élevé ; renommer le rang d'entités « Astral » (déjà présent dans la Chronologie).* Cascade sur « sièges Célestes » vs « sièges Éthérés » (D3).

**D3. Les sièges tenus par des mortels.** Les mêmes sièges (Arcana, Forgion, Cura, Asterion, Explorator) sont appelés « sièges Célestes » dans Cosmologie.md et « sièges Éthérés » dans le Spec + tout le catalogue métiers, qui pointent vers une section `§Sièges Éthérés` qui n'existe pas.
→ *Recommandation : une seule appellation (« sièges Célestes »), et réintroduire dans Cosmologie.md la liste canonique des sièges + des entités que le catalogue cite, pour réparer les ancres mortes.*

**D4. Le système Lien / Délié entre GDD et romans.** C'est le point que tu avais toi-même flairé. La réconciliation *existe déjà* côté Chronologie et romans (décision D-COSMO-3 : tripartition héréditaire Lié / non-Lié / Délié-sevré, ~70/30, avec l'usage politique abusif du mot « Délié » par les Lois du Sol). Mais les pages GDD Vision et Mécaniques (`Univers.md`, `Le Lien.md`) décrivent encore un système binaire, intemporel, jamais rompu — sans Arrachement, sans Tisses, avec la Voie de Navigor praticable alors que Navigor est inatteignable depuis l'An 0.
→ *Recommandation : aligner les pages GDD sur D-COSMO-3, ajouter à `Le Lien.md` une section « Le Lien après l'Arrachement » (trame originelle → fragment mono-Voie actuel, Tisses, statut des cinq Voies au Sillage), et créer une page de concordance du lexique du Lien (Vide → Tisse → non-Lié → « Délié »).* Ne pas toucher aux romans : la confusion des mots y est *in-world* et voulue.

**D5. La géographie du théâtre T2/T3.** Les tomes 2 et 3 font traverser à pied, en quelques jours et sans une seule traversée maritime, des lieux que le canon place sur des continents différents (Plaine de Gryndor sur Ilthara atteinte depuis les marges d'Onara ; Drakora → Mont Cendra → Prismalith d'un seul tenant). S'ajoutent deux collisions de table dans la Chronologie elle-même : **Caeloria** (Celethor selon la Chronologie, Azoria partout ailleurs) et **Torkam** (Ulinor selon la Chronologie, Alkaran partout ailleurs).
→ *Recommandation en deux temps : (a) corriger les deux lignes de la table Chronologie (Caeloria → Azoria, Torkam → Alkaran), la majorité du corpus et la géométrie des voyages l'exigent ; (b) recentrer le théâtre T2/T3 sur un bloc continental cohérent plutôt que d'ajouter des traversées maritimes — le plus petit retcon consiste à déplacer la Forge-Basse et les marges de Kessane sur Ilthara (canon « Chamanes de Mémoire : Alkaran, Ilthara »), en gardant l'homonymie voulue Plaine de Gryndor ↔ future nation Gryndor.* À trancher **avant** toute publication du T3.

**D6. « Treize continents » dans les Chroniques.** Le texte réécrit et la bible v2 disent « treize » (voire « quatorze » au ch. 33), en comptant Vytharia et Caeloria comme des continents — contre la décision « 12 continents partout ». Un axe le confirme comme erreur, un autre le remonte comme arbitrage.
→ *Recommandation : corriger « treize » → « douze » (ou une formule non comptée) dans les ~7 occurrences des Chroniques et de la bible v2.* Aucune occurrence de « douze continents » n'existe dans les Chroniques : la correction est quasi mécanique, et la Chronologie (qui prime) dit douze.

**D7. La fin du Fléau — date et forme de « l'Heure ».** Le tome 2 met une refermeture instantanée (l'Heure, ~1480) ; la Chronologie hésite entre extinction ~1600 et fermeture « progressive » ~1700, avec des Failles statiques résiduelles jusqu'à l'Ère VII.
→ *Recommandation : dater l'Heure ~1600, comme un instant unique qui referme les Failles* mobiles* (celles du Fléau) « en un souffle », en laissant subsister des Failles statiques ailleurs ; réécrire Era 5 en ce sens et corriger le « vingt ans » de Drahvel dans le roman.* Compatible avec le « 8 600 ans » du T3 et la mémoire négative déjà canonisée.

**D8. Le « Grand Silence » d'Histoire d'Hybelior.** Ce fichier GDD raconte une veille d'Arrachement où la magie est déjà moribonde et les Éternels déjà retirés *avant* l'An 0 — ce qui contredit frontalement la Frise, la Chronologie et le prologue du tome 1 (le Lien à pleine puissance, cités volantes, cent vingt millions d'âmes, juste avant la rupture).
→ *Recommandation : réécrire le § Grand Silence en déclin local/religieux qui n'entame pas le pic magique global, et déplacer le retrait des Éternels à l'An 0 (comme lectures).* Aligner du même coup la position de la Fracture (~-1 500, ancre Chronologie).

### 4.2 — Décisions locales (plus légères, mais à toi)

- **Cendara à trois étages.** Le continent Cendara, la nation Cendara (Brumaris, des Chroniques) et le bourg Cendara (pied du Mont, du T3, ex-Cendral) forment une triple homonymie dont le troisième niveau n'existe dans aucune fiche. → *Assumer et gloser l'homonymie ; créer la fiche du bourg ; décider si la nation Cendara des Chroniques est une entité à part ou se subordonne à Arkhen/Pyrevane.*
- **Le Cardinal-Élu de Caeloria** (Chroniques ch. 29, T3 ch. 03) n'existe pas dans la fiche (Haute-Prêtresse Velmira à Duskoris). → *Créer l'office comme tête religieuse distincte de la cheffe d'État, siégeant à Vyntheris ; corriger « Serathis, Cardinal-Élu de Caeloria » en « de Seraphia » dans le T3.*
- **Le « Silence » de Lunasar** : la fiche dit « midi à minuit », le ch. 28 des Chroniques bâtit son climax sur trois jours de masques et d'anonymat — ce qui cannibalise la signature de Nysaria. → *Aligner la fiche sur le texte en différenciant explicitement le masque temporaire lunasarien du masque permanent nysarien, ou réécrire le chapitre.*
- **Le Mont Jumeau** : la Chronologie dit « aucune expédition documentée », les ch. 33-34 des Chroniques en documentent une. → *Nuancer la Chronologie (« aucune expédition parvenue aux académies avant le dépôt de Sorin ») plutôt que reflouter le texte.*
- **« Velkar » Sorne** (antagoniste du T1) porte le nom d'un port canon d'Azoria. → *Renommer l'inquisiteur, ou assumer l'homonymie et retirer la justification phonologique de la bible.*
- **La chaîne terminologique du Lien** (Vide → Tisse → non-Lié → « Délié ») et **le chantier différé « scission-religions-V4 »** (origines temps-profond vs schismes récents des fiches) restent ouverts depuis juillet. → *À instruire, voir chantiers B et F.*

---

## 4bis. Journal de Phase 0 — arbitrages actés (2026-07-15)

Décisions prises par l'auteur (Nicolas). Elles font désormais foi et commandent l'exécution.

**Cosmologie du GDD**
- **D1 — Roster des douze Cosmiques : la liste GDD / D-COSMO-4 fait foi** (Aerion, Aquor, Aurion, Umbra, Spiritus, Fatum, Terranu, Somnix, Ignara, Sanguis, Resonia, Vermis). La Chronologie (Era 1a, Index) est amendée pour l'adopter ; les entités de l'ancienne liste Chronologie qui disparaissent (Climata, Gravitas, Vortex, Judicar, Stellaris, Aetheron, Etherius) sont reversées au rang **Astral**.
- **D2 — « Céleste » = rang d'entités natives**, uniquement. Ce n'est plus un mortel élevé.
- **D3 — Suppression de la notion de siège tenu par un mortel. Aucun mortel n'a de siège.** Conséquences : retirer de `Cosmologie.md` la section « Les Célestes — quand un mortel devient voix » et la remplacer par une description des rangs d'entités (Célestes, Astraux, Éthérés) ; retirer de `L'Accord.md` la promesse d'accession à un siège (l'Accord reste une résonance/attunement, pas une ascension) ; reformuler les titres du catalogue métiers (Arcana, Forgion, Cura, Asterion, Explorator…) en **honneurs / attributions légendaires liées aux entités**, pas en sièges atteignables.
- **D4 — Aligner le GDD sur la réconciliation Lien/Délié déjà actée côté Chronologie (D-COSMO-3).** Mettre à jour `Univers.md` et `Le Lien.md` (tripartition héréditaire, trame historique, Tisses, statut des Voies au Sillage) + créer une page de concordance du lexique du Lien. Les romans ne bougent pas.
- **D-bis** — Pacte Primordial : parties = **Éternels ET Cosmiques**. Blessure de Tempora : **lecture disputée** (pas un fait). Catena Fracta : **deux courants internes assumés** (rupturistes / carcéralistes).

**Monde & Histoire**
- **D5a — Corriger la table Chronologie : Caeloria → Azoria, Torkam → Alkaran.**
- **D5b — Recentrer le théâtre des tomes 2 et 3 sur un bloc continental** : Forge-Basse et marges de Kessane déplacées sur Ilthara (plus petit retcon).
- **D6 — « treize continents » → « douze »** dans les Chroniques et la bible v2.
- **D7 — L'Heure (fin du Fléau) datée ~1600** : referme d'un coup les Failles *mobiles*, les statiques subsistent ; corriger le « vingt ans » de Drahvel.
- **D8 — Le « Grand Silence » réécrit en déclin local/religieux** qui n'entame pas le pic magique global ; les Éternels tombent à l'An 0.

**Décisions locales**
- **L1 — Pas d'homonymie : noms distincts.** Continent **Cendara** / nation **Brumaria** (ex-« nation Cendara » des Chroniques, capitale Brumaris) / bourg **Cendral** (au pied du Mont, sur les cendres de l'ancienne cité). Carte politique de référence = **Arkhen + Pyrevane** (Chronologie/T3). *Principe général : les homonymies accidentelles se renomment ; les homonymies délibérées de l'Annexe C (Plaine de Gryndor ↔ nation Gryndor, Panghor supercontinent ↔ entité, les deux Portes de Fer, les deux Lunaris) restent, glosées.*
- **L2 — Créer l'office du Cardinal-Élu de Caeloria** : tête religieuse siégeant à Vyntheris, distincte de la Haute-Prêtresse de Duskoris.
- **L3 — Aligner la fiche Lunasar sur le texte** : Silence de trois jours, masque temporaire, distinct du masque permanent de Nysaria.
- **L4 — Nuancer la Chronologie sur le Mont Jumeau** (« aucune expédition parvenue aux académies avant le dépôt de Sorin »).
- **L5 — Renommer l'inquisiteur du T1** (Velkar → **Verkan Sorne**, le patronyme Sorne conservé pour la lignée), rechercher-remplacer dans le T1.
- **L6 — Normaliser « Tisse »** dans les 13 chapitres du T2.

**Exécution & livraison**
- **E1 — Une passe** : correctifs sûrs + arbitrages ci-dessus, dans l'ordre GDD → Lore → romans → site.
- **E2 — L'auteur revoit les ~110 correctifs mécaniques** avant application (liste de revue fournie).
- **E3 — Livraison : push direct sur `main`** (pas de PR), **après la revue E2**. Reconciliation E2/E3 : travail sur la branche `claude/four-books-summary-f9fi76`, revue en fil, puis push sur `main`.

**Correction de trame (2026-07-15) — la déchirure du Lien est cyclique, non unique**
- **D9 — La trame du Lien « respire ».** Objection de l'auteur : trop de faits sont « un peu trop unique pour être réaliste ». Si la rupture du Lien est un phénomène naturel (et non un acte volontaire justifié — ce que le canon refuse déjà comme cause, cf. Era 4 §3.1), alors elle a dû se produire avant et pourra se reproduire quand les conditions seront réunies. **Décision de trame :** le Lien n'est pas une structure posée une fois pour toutes qui se serait brisée à l'An 0 ; c'est une **trame vivante** qui se tend et se relâche au rythme le plus lent du monde (les Souffles Cardinaux). Elle se remplit sur des millénaires (les **Âges du Lien** = ses hautes marées), se **déchire** quand un Cardinal assez profond passe sur une trame assez pleine, puis se **remute** lentement (la réémergence des Liés au Sillage = ce retissage en cours). L'Arrachement devient **un tour de la roue** (Rota Mundi : « ce qui revient n'a jamais cessé d'être »), cohérent avec la lecture en trois temps Fracture → Arrachement → Fléau — ni la première déchirure, ni la dernière. **Ce qui reste unique et protégé, ce n'est jamais *le fait* de la déchirure (récurrent par nature), mais *sa cause* à chaque tour** — les six lectures concurrentes (Annexe C) sont intactes. Fichiers touchés : `Le Lien.md` §"Le Lien après l'Arrachement" (reformulation focale), `Era 4 - L'Arrachement.md` §1.4 (note), `Histoire d'Hybelior.md` §Sillage (clause). `Frise.md` et `Chronologie - Index.md` portaient déjà le cadre cyclique (trois phases, remutation, « un Cardinal était déjà là »).

---

## 5. Les chantiers

Les 129 constats se regroupent en sept chantiers. Chaque constat garde son numéro d'Annexe A. Un chantier est soit **mécanique** (exécutable sans toi, une fois D1–D8 tranchés), soit **arbitrage** (dépend d'une décision de section 4), soit **création** (comble un trou de canon).

### A. Cohérence interne du GDD — la cosmologie (Annexe A, §Cosmologie GDD + §Système magique)

Le cœur dur. Tout part du **roster des Cosmiques (D1)**, qui, une fois tranché, débloque en cascade : les dominantes d'Ère incohérentes (Sommeil de Glace : Aquor vs Climata ; Verdoiement : Spiritus vs Terranu), le double sens de « Céleste » (D2), les sièges Célestes/Éthérés (D3), le mécanisme de dominance non uniforme (une dominante + une seconde vs argmax + top-3), l'origine des Failles (Cardinaux seuls vs modulation continue de Tempora), et la doctrine Déliés/Catena Fracta (Pacte « rompu » vs « prison en vigueur »). *Nature : arbitrage (D1–D3) puis mécanique en cascade.*

### B. Cohérence interne du Lore / Chronologie (Annexe A, §Chronologie + §Religions + §Tome 1 vs canon)

Rendre les Eras d'accord entre elles et avec la Frise :
- **La pulse du Mont Cendra** est décrite « Ralentie » à l'Index et « Accélérée » en Era 7 : une ligne inversée, à corriger vers l'accélération (que confirment Chroniques et T3). *Mécanique.*
- **Le Cercle des Huit** a deux jeux de portraits incompatibles (l'Annexe d'Era 4 contre Era 3b et le tome 1) : documenter Era 3b comme lignée consignée, Era 4 comme déformation de transmission tardive. *Mécanique, cadré par la bible T1.*
- **La Fracture** et **le Grand Silence** (D8), la **blessure de Tempora** présentée comme fait au lieu de lecture, les **parties au Pacte** (5 Éternels vs Éternels+Cosmiques). *Arbitrage léger.*
- **Le chantier « scission-religions-V4 »** : trancher le schéma des origines religieuses (temps profond d'Era 3b vs racines/cristallisation des fiches), puis répercuter sur Era 3b, `_Histoire des Religions` et les treize fiches ; corriger au passage Flamara « Éternelle » → figure sans rang, l'attribution Foedus (Spiritus vs Anima), les Taciti « sans clergé », les présences Noctari/Taciti (Lunasar/Vytharia vs Nysaria). *Arbitrage (dépend de toi) — c'est le gros morceau religieux resté ouvert depuis juillet.*

### C. Le pont GDD ↔ romans : Lien, Délié, lexique (Annexe A, §Lien & Délié + §Lexique)

Le chantier que tu avais pressenti. Une fois **D4** tranché : réécrire `Kharazir.md` (qui contredit frontalement Era 7 et les Chroniques sur le tissu jaune et la Loi du Sol), nuancer « les Liés sont rares » d'Histoire d'Hybelior (ils sont ~30 % et forment une caste), et **créer deux pages de référence** : un *Lexique du Lien à travers les Ères* et un *glossaire des homonymies* (« Délié », « Cardinal » à quatre sens, « Vide », « Souffle », « Silencieux », « Panghor », « Concordance/Concordants », « Mirathi/Mirathis », graphie « Era/Ère »). *Arbitrage (D4) puis création.*

### D. Continuité et exactitude des romans (Annexe A, §Bibles vs textes + §Continuité inter-tomes + §Tomes vs canon)

Corriger les livres eux-mêmes, une fois le canon stabilisé :
- **La seule vraie contradiction interne d'un roman** : au tome 3, Vaskar ouvre et lit la copie d'Olven (ch. 28) mais le ch. 51 affirme qu'il ne l'a « jamais » lue. À réécrire. *Mécanique (retouche de texte).*
- **Ysolde a 35 ans dans les Chroniques et 53 dans le T3**, à quelques mois d'écart : corriger l'âge du T3. *Mécanique.*
- **Datations** : le voyage de Sorin daté « an 251 → 253/254 » par la couche Pays/Histoires alors que la bible et le T3 exigent « fin 248 → début 251 » (et `Kharazir.md` réintroduit toute la route v1 périmée) ; les dates de la Guerre de l'Ombre (Era 7 vs T3) ; les « trois siècles / mille ans » du T3 pour une strate vieille de ~8 600 ans. *Arbitrage léger + mécanique.*
- **La phrase-canon** est verbatim dans ses ~45 occurrences (vérifié) ; ne reste que la mise au point du Fragment #3 (antidaté volontairement) à consigner dans la bible. *Maj bible.*
- **Les bibles** rattrapent le texte partout où il a évolué (Sanne « Kessane de son nom long », arc de Vaenor, chapitre S9 coupé, copie de Teor, numérotation de chapitres périmée dans la bible T3 et l'annexe T1). *Maj bibles.*

### E. Géographie (Annexe A, §Géographie)

Piloté par **D5**. Une fois les continents de Caeloria/Torkam corrigés et le théâtre T2/T3 recentré : retoucher les trajets impossibles (Myrtam par mer au ch. 9 des Chroniques ; « Gryndor donne la main à Haldria » et « huit nations cousues » au T1 ch. 19), régénérer `city-index.json` et `lore-structure.json` (périmés, toute la couche Pays y manque), et **combler les trous** (fiche du bourg Cendara, section « Plaine de Gryndor » dans la fiche Gryndor, fiches des marches d'Onara / vallée du Mont). *Arbitrage (D5) puis mécanique + création.*

### F. Trous de canon à combler (transverse)

Des éléments que les romans utilisent mais que le canon n'enregistre pas — à *ajouter* (pas à corriger), sans trancher les mystères associés :
- **Les inscriptions du dessous / la doctrine des Ancrages** (cœur des Chroniques) → entrée « Mystères actuels » d'Era 7, en lecture-parmi-plusieurs.
- **Le mensonge fondateur** (« le Fléau a cédé sous l'action des Inspecteurs »), **l'Édit de Pureté**, le registre des foyers, le marquage des portes → Era 5, § Tyrannie des Cendres.
- **Le dépôt de Prismalith** et ses suites → Era 7.
- **Le Souffle de Cantor** → fiche `Cantus Mundi`. **Le Panghor-entité** (homonymie avec le supercontinent) → Era 7, sans identifier le référent. **Le Dominat / Drahk'Nor-ville** → une ligne dans Era 5.
*Nature : création, faible risque, mais chaque entrée doit rester au conditionnel là où un mystère est en jeu.*

### G. Index & artefacts du site (Annexe A, §Index & artefacts)

Purement mécanique, à faire **en dernier** (une fois le fond stable), car ces fichiers dérivent du Lore :
- **La frise affiche encore « An 0 (= -250 du Sillage) »** — l'erreur n°1 que l'audit de juillet était censé avoir corrigée, restée dans `js/timeline-data.js`.
- `data/timeline-names.json`, `accueil.html`, `manifest.webmanifest` : « treize continents », « 37 nations », « HYBÉLIOR » accentué, « 40 chapitres » — à régénérer.
- `roman-reader-index.json` **absent pour T2 et T3** (asymétrie avec T1) ; `roman-index.json` du T2 avec parties sans titres et coda éclatée ; atlas des Chroniques figé sur la route v1 (40 ch.) ; fallbacks HTML sur l'ancienne prémisse ; `_manifest.json`/`_search-index.json` à rafraîchir.

---

## 6. Plan de travail en phases

L'ordre respecte ta consigne : **les articles d'abord, raccord entre eux ; les romans ensuite ; le site en dernier.** Chaque phase peut être une pull request distincte.

**Phase 0 — Arbitrages (toi).** Trancher D1 à D8 et les décisions locales (4.2). Rien de lourd ne démarre avant. *Livrable : tes réponses, consignées dans ce fichier.*

**Phase 1 — Cohérence interne du GDD (chantier A).** Appliquer D1–D3 : roster des Cosmiques, « Céleste », sièges, dominantes, mécanisme de dominance, Failles, doctrine des Déliés. Les articles du GDD deviennent raccord entre eux.

**Phase 2 — Cohérence interne du Lore / Chronologie (chantier B).** Pulse, Cercle des Huit, Fracture, Grand Silence, blessure de Tempora, Pacte ; puis la passe « scission-religions-V4 ». Les Eras et la Frise deviennent raccord.

**Phase 3 — Le pont GDD ↔ Lore (chantier C).** Aligner `Le Lien.md`/`Univers.md`/`Kharazir.md`, créer le lexique du Lien et le glossaire des homonymies. Les deux couches se rejoignent.

**Phase 4 — Les romans (chantiers D + E + F).** Le canon étant stable, corriger les livres contre lui : contradictions internes (Vaskar), âges et dates, géographie, bibles rattrapées, trous comblés. C'est « corriger les romans et leur histoire ».

**Phase 5 — Index & site (chantier G).** Régénérer tous les artefacts dérivés. Le site reflète enfin le canon.

**Ordre de traitement à l'intérieur d'une phase** : sévérité haute d'abord, puis moyenne ; les fixes purement mécaniques d'un même fichier groupés en un passage.

---

## 7. Suivi et garde-fous

- **Tenir ce fichier à jour** : cocher les constats traités (numéros d'Annexe A), consigner chaque arbitrage sous la décision correspondante (comme le « Journal des décisions » de l'audit du 5 juillet).
- **Ne jamais harmoniser un mystère de l'Annexe C.** En cas de doute sur « est-ce une incohérence ou un flou voulu ? », c'est un flou voulu — vérifier l'Annexe C avant de corriger.
- **Re-vérifier après coup.** Chaque phase close devrait passer un contre-examen ciblé (comme celui qui a bâti ce goal) pour attraper les régressions — l'audit de juillet avait laissé repasser l'erreur « -250 » dans la frise, preuve qu'une correction non re-vérifiée peut survivre.
- **Les 73 constats de basse sévérité non instruits** (renvois cassés, anglicismes, graphies flottantes « Tisse/Tissé », statuts `draft`) se ramassent au fil de l'eau, pas en chantier dédié.

---

## Annexe A — Inventaire des 129 constats retenus

Grav. : ●●● haute · ●● moyenne · ● basse. « à arbitrer » = le contre-examen n'a pas tranché sans toi.
#### Cosmologie GDD (Souffle/Éternels/Ères)

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 1 | ●●● Haute | contradiction | confirmé | Deux listes canoniques rivales des 12 Cosmiques (Chronologie vs Cosmologie/Cosmology Spec) | `Cosmologie.md`, `Cosmology Spec.md`, `Era 1a - Les Cosmiques.md` |
| 2 | ●●● Haute | contradiction | confirmé | Dominante du Sommeil de Glace : Aquor (Les Ères, Era System) vs Climata (L'Accord, Accord System, catalogues) | `Les Ères.md`, `L'Accord.md`, `Era System.md` |
| 3 | ●●● Haute | contradiction | confirmé | Quand les Éternels sont-ils tombés ? À l'Arrachement (Frise + Chronologie) vs échelonné sur le Grand Silence (Histoire) | `Frise.md`, `Histoire d'Hybelior.md`, `Era 4 - L'Arrachement.md` |
| 4 | ●●● Haute | divergence-bible-texte | confirmé | Sièges « Célestes » (Cosmologie) vs sièges « Éthérés » (Spec + tout le catalogue) — et §Cosmologie fantômes | `Cosmologie.md`, `Cosmology Spec.md`, `Guérisseur.md` |
| 5 | ●●● Haute | terme-double-sens | confirmé | « Céleste » désigne deux choses incompatibles : rang d'entités (21 Célestes) vs mortel élevé à un siège | `Cosmologie.md`, `Era 1a - Les Cosmiques.md`, `Les Ères.md` |
| 6 | ●● Moyenne | contradiction | confirmé | Dominante du Verdoiement : Spiritus (Les Ères, Era System) vs « dominante de Terranu » (L'Accord) | `L'Accord.md`, `Les Ères.md`, `Era System.md` |
| 7 | ●● Moyenne | contradiction | confirmé | La Fracture : simple avertissement peu avant l'Arrachement (Frise) vs Cardinal blessant Tempora deux Ères plus tôt (Histoire) | `Frise.md`, `Histoire d'Hybelior.md`, `Era 1b - Éthérés et Panghor.md` |
| 8 | ●● Moyenne | ambiguite-a-arbitrer | confirmé | La blessure de Tempora : lecture contestée (Cosmologie, Chronologie) tranchée en fait accompli ailleurs — et genre flottant | `Cosmologie.md`, `Les Ères.md`, `Prédiction.md` |
| 9 | ●● Moyenne | contradiction | confirmé | Le mécanisme de dominance n'est pas uniforme : 1 dominante + 1 seconde vs argmax Éternel + top-3 Cosmiques vs enum de ~20 avec Célestes | `Les Ères.md`, `Le Souffle.md`, `Cosmology Spec.md` |
| 10 | ●● Moyenne | contradiction | confirmé | Les Déliés / Catena Fracta : Pacte « rompu jadis » (Cosmologie) vs « prison en vigueur dont il faut se sevrer » (Univers) — et réversibilité contradictoire | `Cosmologie.md`, `Univers.md`, `Factions.md` |
| 11 | ●● Moyenne | contradiction | confirmé | Origine des Failles Temporelles : « rien d'autre que les Cardinaux » (Traces) vs modulation continue par Tempora (Spec, Ères) | `Traces des Ères.md`, `Cosmologie.md`, `Cosmology Spec.md` |
| 12 | ●● Moyenne | ambiguite-a-arbitrer | confirmé | Parties au Pacte Primordial : les cinq Éternels seuls (Univers, Histoire) vs Éternels ET Cosmiques (Cosmologie) | `Univers.md`, `Cosmologie.md`, `Histoire d'Hybelior.md` |
| 13 | ● Basse | trou-canon | à arbitrer | Entités vénérées et voix d'Ère sans rang canonique : Lumen, Terra, Animae, Calor, Anima, Umbralis, Realis, Ancestralis... | `Factions.md`, `Era System.md`, `Cosmologie.md` |

#### Lien & Délié (GDD↔romans)

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 14 | ●●● Haute | contradiction | confirmé | Deux définitions incompatibles de « Lié »/« Délié » : GDD Vision-Mécaniques (binaire, par choix) vs Chronologie D-COSMO-3 + romans (tripartition héréditaire) | `Univers.md`, `Le Lien.md`, `L'Accord.md` |
| 15 | ●●● Haute | contradiction | confirmé | Kharazir.md contredit frontalement Era 7 et les Chroniques sur le tissu jaune, la Loi du Sol et le sens même de « Lien »/« Non-Lié » | `Kharazir.md`, `Era 7 - Le Monde Actuel.md`, `Chapitre 01 - Les Murs Jaunes de Kharazir.md` |
| 16 | ●●● Haute | contradiction | confirmé | Le Lien.md décrit un système intemporel jamais rompu : aucun Arrachement, aucun Tisse, et la Voie de Navigor praticable alors que Navigor est inatteignable depuis l'An 0 | `Le Lien.md`, `Cosmologie.md`, `Era 4 - L'Arrachement.md` |
| 17 | ●● Moyenne | trou-canon | confirmé | Aucune page ne consigne la chaîne terminologique historique Vide → Tisse → non-Lié/« Délié » : la concordance lexicale de l'axe Lien manque | `Era 3b - Religions Verithan et la Chute.md`, `Era 7 - Le Monde Actuel.md`, `Le Lien.md` |
| 18 | ●● Moyenne | contradiction | confirmé | Cendara/_Index situe l'Étudiant « à plusieurs continents de distance » du Mont Cendra au moment du geste — le rituel a lieu AU Mont Cendra dans tout le reste du corpus | `_Index.md`, `Frise.md`, `12 - Montrer et faire.md` |
| 19 | ●● Moyenne | obsolescence | confirmé | Deux jeux de portraits du Cercle des Huit incompatibles dans la Chronologie : l'Annexe d'Era 4 contredit Era 3b et le tome 1 (et se contredit elle-même) | `Era 4 - L'Arrachement.md`, `Era 3b - Religions Verithan et la Chute.md`, `_bible.md` |
| 20 | ●● Moyenne | divergence-bible-texte | confirmé | Graphie flottante « Tisses » / « Tissés » dans le tome 2 (13 chapitres divergent du canon) | `02 - La Forge-Basse.md`, `30 - L'interrogatoire.md`, `_bible.md` |
| 21 | ●● Moyenne | ambiguite-a-arbitrer | confirmé | La règle mono-Voie du GDD est présentée comme physique intemporelle alors que le canon historique décrit un Lien-trame unique puis des connexions multiples — l'émergence du régime actuel n'est datée nulle part | `Le Lien.md`, `Era 3a - Le Lien et les Empires.md`, `Era 4 - L'Arrachement.md` |
| 22 | ●● Moyenne | trou-canon | confirmé | Le réseau d'inscriptions pré-Arrachement sur les Déliés-« ancrages » — cœur des Chroniques — n'est enregistré nulle part dans la Chronologie | `Era 7 - Le Monde Actuel.md`, `Chapitre 01 - Les Murs Jaunes de Kharazir.md`, `Chapitre 21 - Le Cœur qui Pulse.md` |
| 23 | ●● Moyenne | obsolescence | confirmé | « Les Liés sont rares... précieux, surveillés, cachés » (Histoire d'Hybelior, présent du Sillage) vs ~30% de population Liée formant une caste privilégiée (Era 7, Chroniques) | `Histoire d'Hybelior.md`, `Era 7 - Le Monde Actuel.md` |

#### Chronologie & datations

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 24 | ●●● Haute | contradiction | confirmé | Datation du voyage de Sorin : la couche Histoires/Pays le date « an 251 → 253/254 », la bible-v2 et le T3 exigent « fin 248 → début 251 » | `Kharazir.md`, `Lumasar.md`, `Elarath.md` |
| 25 | ●●● Haute | contradiction | confirmé | Histoire d'Hybelior (GDD) raconte une veille d'Arrachement incompatible avec Frise, Chronologie et T1 : magie moribonde et Éternels retirés AVANT l'An 0 | `Histoire d'Hybelior.md`, `Frise.md`, `Chronologie - Index.md` |
| 26 | ●● Moyenne | contradiction | confirmé | Fin du Fléau : Era 5 hésite entre ~1 600 et ~1 700 et décrit une fermeture « progressive » là où T2 met un instant unique (l'Heure), avec les Failles de Gryndor à la fois fermées et résiduelles | `Era 5 - La Grande Nuit.md`, `Chronologie - Index.md`, `Era 6 - L'Ère des Nations.md` |
| 27 | ●● Moyenne | divergence-bible-texte | confirmé | Guerre de l'Ombre : Era 7 date Davan « ~9 944 » et Uveth « ~10 081 », le T3 les date « il y a quatre ans » et « sept ans plus tôt » | `Era 7 - Le Monde Actuel.md`, `03 - Les coffres qu'on n'ouvre pas.md`, `40 - La montee qui tourne mal.md` |
| 28 | ●● Moyenne | contradiction | confirmé | Histoire d'Hybelior tranche une ambiguïté voulue : « L'Éternel du Temps se blesse » présenté comme fait universellement reconnu | `Histoire d'Hybelior.md`, `Chronologie - Index.md`, `Era 3a - Le Lien et les Empires.md` |
| 29 | ●● Moyenne | contradiction | confirmé | L'horloge de la pulse du Mont Cendra existe en quatre versions incompatibles (dont une inversée) | `Chronologie - Index.md`, `Era 7 - Le Monde Actuel.md`, `Chapitre 21 - Le Cœur qui Pulse.md` |
| 30 | ●● Moyenne | obsolescence | confirmé | Obsolescence : _arc-sorin.md, _atlas-voyage.md et l'audit du 2026-07-05 décrivent la route v1 en 40 chapitres, plus le livre publié (38 ch.) | `_arc-sorin.md`, `_atlas-voyage.md`, `Audit cohérence 2026-07-05.md` |
| 31 | ●● Moyenne | contradiction | confirmé | Position de la Fracture incohérente dans le corpus GDD : « clôt l'Alliance », Trois Royaumes « ~-3 000 », Fracture « ~-1 500 », Frise « plusieurs générations avant l'Arrachement » | `Histoire d'Hybelior.md`, `Frise.md`, `Chronologie - Index.md` |
| 32 | ●● Moyenne | contradiction | confirmé | T3 date la copie d'Olven et Vaenor de « trois siècles / dix siècles / mille ans » alors que son propre canon exige ~8 600 ans | `28 - Deux fers, une seule fois.md`, `24 - Lire les absences.md`, `32 - Ce que l'ombre demande.md` |

#### Religions & cultes

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 33 | ●●● Haute | contradiction | confirmé | Deux listes incompatibles des « 12 Cosmiques » — la même décision D-COSMO-4 racontée en sens inverse, et toutes les rubriques doctrinales des fiches Religions reposent sur une seule des deux versions | `Era 1a - Les Cosmiques.md`, `Chronologie - Index.md`, `Cosmologie.md` |
| 34 | ●●● Haute | ambiguite-a-arbitrer | confirmé | Inventaire du chantier différé « scission-religions-V4 » : origines temps-profond (Era 3b) vs arbre à quatre traditions et schismes en Sillage négatif (Religions/) — drapeaux réels et divergences en attente | `Era 3b - Religions Verithan et la Chute.md`, `_Histoire des Religions.md`, `00 - Système Religieux.md` |
| 35 | ●● Moyenne | divergence-bible-texte | confirmé | Caeloria : le « Cardinal-Élu » des Chroniques (ch.29, siège à Vyntheris) n'existe ni dans la fiche pays (Haute-Prêtresse Velmira, siège à Duskoris) ni dans la fiche Ordo Caelum | `Chapitre 29 - L'Escale du Cardinal-Élu.md`, `Caeloria.md`, `Ordo Caelum.md` |
| 36 | ●● Moyenne | contradiction | confirmé | Entités vénérées par Foedus Animae : « Spiritus (aspect ancestral) » dans Era 3b vs « Anima · Mentor · Ancestralis » partout ailleurs — substitution d'entité, pas simple abréviation | `Era 3b - Religions Verithan et la Chute.md`, `00 - Système Religieux.md`, `Foedus Animae.md` |
| 37 | ●● Moyenne | divergence-bible-texte | confirmé | Le « Silence » de Lunasar : la fiche Pays dit « midi à minuit », le chapitre 28 des Chroniques construit son climax sur trois jours de masques et d'anonymat | `Lunasar.md`, `Chapitre 28 - Le Masque de Nécessité.md` |
| 38 | ●● Moyenne | contradiction | confirmé | Présences Noctari et Taciti : « Lunasar » et « Vytharia » (Era 3b) vs « Nysaria » (00-Système + fiches) — séquelle non répercutée des décisions géographiques de l'audit, avec anachronisme | `Era 3b - Religions Verithan et la Chute.md`, `00 - Système Religieux.md`, `Noctari.md` |
| 39 | ●● Moyenne | divergence-bible-texte | confirmé | T1 date la tradition des Silencieux de Baelor à « quatre cents ans » à l'An 0 — le roman prend parti dans la question différée des datations, contre le ~5 000 av.A du canon | `15 - Ce que le silence garde.md`, `16 - Le vote.md`, `Taciti.md` |
| 40 | ●● Moyenne | contradiction | confirmé | Taciti dans Era 3b : « pas de prêtres formels, pas de temples » — contredit par le même fichier (Vorath « prêtre des Silencieux »), par la fiche Taciti (cloîtres et Abbés dès ~4 600 av.A) et par T1 | `Era 3b - Religions Verithan et la Chute.md`, `Taciti.md`, `15 - Ce que le silence garde.md` |
| 41 | ●● Moyenne | terme-double-sens | confirmé | « Silencieux » : terme surchargé — religion Taciti de Baelor, contemplatifs de Foedus Animae à Skaldoria (GDD), « Silencieux d'Alkaran » (Era 3b), « Silencieux Égaux » du Vael'Kurash (Era 7), épithète d'Iveth | `Cosmologie.md`, `Taciti.md`, `00 - Système Religieux.md` |
| 42 | ● Basse | contradiction | confirmé | Era 3b qualifie Flamara d'« Éternelle du feu souterrain » — contre le statut canon « rumeur populaire, pas au canon » et la liste close des 5 Éternels | `Era 3b - Religions Verithan et la Chute.md`, `Era 1a - Les Cosmiques.md`, `Chronologie - Index.md` |

#### Chroniques de l’Exilé vs canon

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 43 | ●●● Haute | obsolescence | confirmé | Fiches Cestra : passage de Sorin daté « an 231 » (et Aldric « an 220, haldrien, ~30 ans ») — vingt ans d'écart avec le canon an 248-251 | `Noravia.md`, `Noravia.md`, `_bible-v2.md` |
| 44 | ●●● Haute | contradiction | confirmé | Le « Silence » de Lunasar du ch. 28 (trois jours, masques blancs, anonymat) contredit la fiche canon (midi à minuit, sans masques) et cannibalise la signature de Nysaria | `Chapitre 28 - Le Masque de Nécessité.md`, `Lunasar.md`, `Nysaria.md` |
| 45 | ●●● Haute | contradiction | confirmé | Myrtam (Haliandris, Cendres Rouges) déplacée d'Onara vers Alkaran par la route v2 et le texte | `Chapitre 09 - Les Cendres Rouges.md`, `Chapitre 10 - Le Marteau et l'Ancre.md`, `_bible-v2.md` |
| 46 | ●●● Haute | contradiction | confirmé | « Treize » et même « quatorze » continents dans le texte réécrit et la bible v2 — la décision « 12 continents partout » n'est pas respectée | `Chapitre 33 - L'Approche Polaire.md`, `Chapitre 35 - Les Routes Rouvrent.md`, `Chapitre 36 - La Dernière Saisie.md` |
| 47 | ●● Moyenne | contradiction | confirmé | Chronologie Index : « Mont Cendra — Pulsation Ralentie (décélération) » contredit Era 7, les Chroniques et le T3 (accélération) | `Chronologie - Index.md`, `Era 7 - Le Monde Actuel.md`, `Chapitre 21 - Le Cœur qui Pulse.md` |
| 48 | ●● Moyenne | contradiction | confirmé | Le ch. 27 compte Vytharia et Caeloria comme des « continents » — contre la décision Lunasar/Mirathi → Vytharia (Ilthara) | `Chapitre 27 - Le Voile des Rêves.md`, `Index.md`, `_atlas-voyage.md` |
| 49 | ●● Moyenne | contradiction | confirmé | Le « Cardinal-Élu » de Caeloria (ch. 29) contredit la fiche canon : théocratie dirigée par la Haute-Prêtresse Velmira depuis Duskoris, Vyntheris n'étant qu'un village | `Chapitre 29 - L'Escale du Cardinal-Élu.md`, `Caeloria.md`, `Era 7 - Le Monde Actuel.md` |
| 50 | ●● Moyenne | ambiguite-a-arbitrer | à arbitrer | Mont Jumeau : la Chronologie dit « aucune expédition documentée, aucune carte vérifiable », mais les ch. 33-34 documentent l'expédition Vane et la montée de Sorin | `Chronologie - Index.md`, `Era 1b - Éthérés et Panghor.md`, `Chapitre 33 - L'Approche Polaire.md` |
| 51 | ●● Moyenne | obsolescence | confirmé | _arc-sorin.md (status « référence », non marqué legacy) décrit la v1 à 40 chapitres et contredit frontalement la bible v2 et le texte | `_arc-sorin.md`, `_bible-v2.md`, `Chapitre 13 - Les Yeux Saisonniers.md` |

#### Tome 1 vs canon

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 52 | ●● Moyenne | divergence-bible-texte | confirmé | Baelor / les Silencieux : « quatre siècles » dans T1 contre ~5 000 av.A en canon (axe religions différé) | `15 - Ce que le silence garde.md`, `16 - Le vote.md`, `54 - Le silence est revenu.md` |
| 53 | ●● Moyenne | contradiction | confirmé | Fiches du Cercle des Huit : la collision Era 3b vs Era 4 reste une contradiction nue dans la Chronologie | `Era 3b - Religions Verithan et la Chute.md`, `Era 4 - L'Arrachement.md`, `_bible.md` |
| 54 | ●● Moyenne | divergence-bible-texte | confirmé | La bible attribue au canon une composition des Huit (avec l'Étudiant) que TOUTE la Chronologie contredit | `_bible.md`, `Era 3b - Religions Verithan et la Chute.md`, `Era 4 - L'Arrachement.md` |
| 55 | ●● Moyenne | contradiction | confirmé | Le Gouffre d'Endora : « s'ouvre » à l'Arrachement selon Era 4, existe « depuis le commencement du monde » selon T1 | `Era 4 - L'Arrachement.md`, `47 - H3 - Le Gouffre d'Endora.md` |
| 56 | ●● Moyenne | ambiguite-a-arbitrer | confirmé | Le roman objectivise ce que la Chronologie garde en « lecture » : sustentation des cités volantes et propagation H0→H7 | `Era 4 - L'Arrachement.md`, `Chronologie - Index.md`, `00 - Ce que je tiens.md` |
| 57 | ●● Moyenne | divergence-bible-texte | confirmé | Le résumé de quatrième de couverture tranche deux points : « huit à gravir le Mont » et le Mythe du Troisième Coup affirmé comme fait | `_resume.md`, `_bible.md`, `Era 4 - L'Arrachement.md` |
| 58 | ●● Moyenne | contradiction | confirmé | Verithan « mort mille ans plus tôt » (ch. 15) contredit sa mort canon ~500 av.A — et le ch. 01 du même roman | `15 - Ce que le silence garde.md`, `01 - Les lecteurs.md`, `Era 3b - Religions Verithan et la Chute.md` |
| 59 | ●● Moyenne | terme-double-sens | confirmé | « Velkar » : l'antagoniste pyrionais porte le nom d'un port canon… d'Azoria, à rebours de la phonologie revendiquée par la bible | `_bible.md`, `Azoral.md` |
| 60 | ● Basse | divergence-bible-texte | confirmé | Fragment #3 : la bible le date/écrit à J-51, le ch. 36 dramatise sa composition à J-1 (antidatage volontaire) | `_bible.md`, `36 - La phrase qui attendait.md` |

#### Tome 2 vs canon

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 61 | ●● Moyenne | contradiction | confirmé | Date et forme de la fin du Fléau : refermeture instantanée ~1480 (roman) vs extinction ~1600 et fermeture progressive ~1700 (Chronologie) | `50 - Le rapport que l'on croira.md`, `45 - L'Heure.md`, `_bible.md` |
| 62 | ●● Moyenne | contradiction | confirmé | Géographie impossible du théâtre du tome : Alkaran, marges d'Onara et Plaine de Gryndor (Ilthara) traités comme un seul pays de marche | `20 - Le vieux, la forgeronne et l'enfant.md`, `35 - Le deuil et la fuite.md`, `38 - L'Édit de Pureté.md` |
| 63 | ●● Moyenne | contradiction | confirmé | La Frise tranche la cause des Failles (« blessures temporelles laissées par Tempora ») contre la règle des lectures plurielles | `Frise.md`, `Era 5 - La Grande Nuit.md` |
| 64 | ●● Moyenne | trou-canon | confirmé | Le mensonge fondateur (« le Fléau a cédé sous l'action des Inspecteurs ») n'existe nulle part dans le canon des Ères 5-7 | `50 - Le rapport que l'on croira.md`, `Era 5 - La Grande Nuit.md`, `Era 6 - L'Ère des Nations.md` |
| 65 | ●● Moyenne | contradiction | confirmé | Origine de la remutation : trois mécanismes canon incompatibles, et le T2 s'appuie sur l'un d'eux | `Era 5 - La Grande Nuit.md`, `Era 7 - Le Monde Actuel.md`, `_bible.md` |
| 66 | ● Basse | trou-canon | confirmé | L'Édit de Pureté, le registre des foyers et le marquage des portes absents d'Era 5 ; la Frise parle de « camps » que rien n'atteste | `38 - L'Édit de Pureté.md`, `24 - Le registre des foyers.md`, `Era 5 - La Grande Nuit.md` |
| 67 | ● Basse | terme-double-sens | confirmé | Nomenclature de l'État : le roman dit « le Dominat » et fait de « Drahk'Nor » une ville — non documenté au canon | `47 - Le témoin extérieur.md`, `50 - Le rapport que l'on croira.md`, `Era 5 - La Grande Nuit.md` |
| 68 | ● Basse | contradiction | confirmé | Portée de la refermeture : « toutes les Failles » (bible T2) vs survie canonique des Failles statiques jusqu'à l'Ère VII | `_bible.md`, `Era 5 - La Grande Nuit.md`, `Era 6 - L'Ère des Nations.md` |

#### Tome 3 & continuité Chroniques→T3

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 69 | ●●● Haute | contradiction | confirmé | T3 re-date toute la table canonique des victimes de la Guerre de l'Ombre dans la dernière décennie | `03 - Les coffres qu'on n'ouvre pas.md`, `40 - La montee qui tourne mal.md`, `Era 7 - Le Monde Actuel.md` |
| 70 | ●●● Haute | contradiction | confirmé | Ysolde : 35 ans dans les Chroniques, 53 ans dans le T3, à quelques mois d'écart | `Chapitre 37 - Le Cartographe Sans Carte.md`, `26 - Le copiste de Prismalith.md` |
| 71 | ●● Moyenne | divergence-bible-texte | confirmé | Deux 'dalles scellées' à Rukhsar : le T3 invente une Dalle ancestrale à la Porte d'Azur qui absorbe la dalle des tunnels et l'inscription du huitième pilier | `46 - Sous la dalle.md`, `Chapitre 38 - Les Murs Tombent.md`, `Kharazir.md` |
| 72 | ●● Moyenne | contradiction | confirmé | Douze ou treize continents : les Chroniques v2 disent 'treize', le T3 et la Chronologie disent 'douze' | `Chapitre 37 - Le Cartographe Sans Carte.md`, `_bible-v2.md`, `26 - Le copiste de Prismalith.md` |
| 73 | ●● Moyenne | trou-canon | confirmé | Era 7 ignore le dépôt de Prismalith et ses suites, pourtant contemporains et publics dans les deux romans | `Era 7 - Le Monde Actuel.md`, `Chapitre 37 - Le Cartographe Sans Carte.md`, `25 - La ou il pourra se passer d'elle.md` |
| 74 | ●● Moyenne | obsolescence | confirmé | Era 7 renvoie à des numéros de chapitres des Chroniques qui ne correspondent plus à rien | `Era 7 - Le Monde Actuel.md`, `Chapitre 23 - Les Enfants aux Yeux Blancs.md`, `Chapitre 29 - L'Escale du Cardinal-Élu.md` |
| 75 | ●● Moyenne | obsolescence | confirmé | La bible T3 cite partout 'ch. 39-40' des Chroniques : la numérotation est périmée (le livre a 38 chapitres) | `_bible.md`, `Chapitre 37 - Le Cartographe Sans Carte.md`, `Chapitre 38 - Les Murs Tombent.md` |
| 76 | ●● Moyenne | contradiction | confirmé | Serathis : Cardinal-Élu de Caeloria (T3) contre Cardinal-Élu de Seraphia (Era 7) | `03 - Les coffres qu'on n'ouvre pas.md`, `Era 7 - Le Monde Actuel.md` |
| 77 | ● Basse | terme-double-sens | confirmé | 'Seconde copie' : le titre/tags du ch. 20 et la bible confondent la synthèse de 20 pages (remise par Sorin) et la seconde copie des 17 cahiers (livrée par Prismalith un an après) | `20 - La seconde copie.md`, `Chapitre 38 - Les Murs Tombent.md`, `_bible.md` |

#### Continuité inter-tomes

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 78 | ●●● Haute | contradiction | confirmé | Pulse du Mont Cendra : « toutes les 46 secondes » (fiche Continent) contre saison→semaine (Era 7) et l'horloge entière de la trilogie | `Cendara - Continent.md`, `Era 7 - Le Monde Actuel.md`, `_resume.md` |
| 79 | ●●● Haute | contradiction | confirmé | T3 : Vaskar ouvre et lit la copie d'Olven (ch. 28) mais le ch. 51 affirme qu'il ne l'a « jamais » ouverte ni lue | `28 - Deux fers, une seule fois.md`, `51 - Le rapport que le monde croira.md`, `_bible.md` |
| 80 | ●● Moyenne | trou-canon | confirmé | Le bourg « Cendara » du T3 (pied du Mont) n'existe dans aucun document canon : homonymie continent/nation/bourg dont le troisième niveau n'est acté nulle part | `02 - Celle qui entend.md`, `Cendara.md`, `Era 3a - Le Lien et les Empires.md` |
| 81 | ●● Moyenne | divergence-bible-texte | confirmé | Phrase-canon : le Fragment #3 (J-51) et la bible T1 contredisent la scène-source (fichier 17) sur qui pose la question et ce qui fut répondu | `17 - Ce que les rêves savaient.md`, `21 - Seuil de la Partie II - La voix du Lien.md`, `_bible.md` |
| 82 | ●● Moyenne | contradiction | confirmé | T3 date la strate Olven/Vaenor « mille ans plus tôt » / « des siècles » alors qu'elle est de l'Ère V (~8 700 ans avant le présent) | `32 - Ce que l'ombre demande.md`, `28 - Deux fers, une seule fois.md` |
| 83 | ● Basse | trou-canon | à arbitrer | Jonction T2→T3 du cahier de la guilde : muré dans une grange pour des inconnus (T2) mais « passé de mère en mère » sans rupture (T3) — le ramassage n'est documenté nulle part | `49 - Là où d'autres pourront le ramasser.md`, `_bible.md`, `04 - La relique de maison.md` |
| 84 | ● Basse | divergence-bible-texte | confirmé | « Kessa. Kessane. Sanne. » récités en toutes lettres (T3 ch. 04) alors que la bible T3 interdit les « noms littéraux » et pose que Sanne ignore d'où vient son nom | `04 - La relique de maison.md`, `_bible.md`, `_bible.md` |

#### Géographie

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 85 | ●●● Haute | contradiction | confirmé | Caeloria : Celethor selon la Chronologie, Azoria selon Pays/atlas/romans | `Chronologie - Index.md`, `Era 6 - L'Ère des Nations.md`, `Caeloria.md` |
| 86 | ●●● Haute | contradiction | confirmé | T2 : la Plaine de Gryndor (Ilthara) atteinte à pied en 4 jours depuis le delta d'Onara-sud | `35 - Le deuil et la fuite.md`, `_bible.md`, `_atlas-voyage.md` |
| 87 | ●●● Haute | contradiction | confirmé | T3 : routes terrestres continues Drakora→Mont Cendra et marges d'Onara→Cendara→Prismalith, sans une seule traversée maritime | `42 - Vers le Mont.md`, `21 - Ce qui suit sans visage.md`, `18 - Le suspect commode.md` |
| 88 | ●●● Haute | contradiction | confirmé | Torkam : Ulinor selon la Chronologie, Alkaran selon Pays/GDD/atlas/Chroniques | `Chronologie - Index.md`, `Era 6 - L'Ère des Nations.md`, `Torkam.md` |
| 89 | ●● Moyenne | contradiction | confirmé | Chroniques ch.9 : Myrtam soudé par voie de terre au désert de Torkam et exclu d'Onara | `Chapitre 09 - Les Cendres Rouges.md`, `Chronologie - Index.md`, `Myrtam.md` |
| 90 | ●● Moyenne | ambiguite-a-arbitrer | confirmé | Deux cartes politiques du continent Cendara : nation « Cendara » (Brumaris) des Chroniques vs Arkhen·Pyrevane de la Chronologie et du T3 | `Cendara.md`, `Chronologie - Index.md`, `Chapitre 21 - Le Cœur qui Pulse.md` |
| 91 | ●● Moyenne | trou-canon | confirmé | La fiche Pays/Ilthara/Gryndor.md ignore la Plaine de Gryndor, les 3 Failles et la Convention — l'événement fondateur de son propre toponyme | `Gryndor.md`, `Era 5 - La Grande Nuit.md`, `28 - Trois Failles sur la Plaine.md` |
| 92 | ●● Moyenne | trou-canon | confirmé | Le bourg « Cendara » du T3 (ex-Cendral / « Cendara-ville ») n'existe dans aucune fiche ni index | `36 - Le depot.md`, `Era 3a - Le Lien et les Empires.md`, `city-index.json` |
| 93 | ●● Moyenne | contradiction | confirmé | T1 ch.19 : « Gryndor donne la main à Haldria » — Haldria posée limitrophe sur Ilthara | `19 - Vytharia, l'automne d'avant.md`, `Haldria.md`, `Chapitre 13 - Les Yeux Saisonniers.md` |
| 94 | ●● Moyenne | contradiction | confirmé | T1 ch.19 : « huit nations cousues ensemble » — la carte politique moderne d'Ilthara projetée 10 000 ans avant sa fondation | `19 - Vytharia, l'automne d'avant.md`, `_bible.md`, `Era 6 - L'Ère des Nations.md` |
| 95 | ●● Moyenne | trou-canon | confirmé | Trou-canon : les lieux-pivots des T2/T3 n'existent nulle part au canon (la Forge-Basse en tête) | `02 - La Forge-Basse.md`, `18 - Le suspect commode.md`, `07 - La concordance qu'on refuse.md` |
| 96 | ●● Moyenne | divergence-bible-texte | confirmé | Vytharia appelée « continent » dans les Chroniques (texte ch.27 + chroniques-index.json) | `Chapitre 27 - Le Voile des Rêves.md`, `chroniques-index.json`, `_atlas-voyage.md` |
| 97 | ●● Moyenne | obsolescence | confirmé | city-index.json et lore-structure.json périmés : toute la couche « Pays » post-audit y manque | `city-index.json`, `lore-structure.json`, `lore-index.json` |

#### Index & artefacts du site

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 98 | ●●● Haute | obsolescence | confirmé | La frise affiche encore « An 0 (= -250 du Sillage) » pour l'Arrachement — l'erreur n°1 corrigée par l'audit | `timeline-data.js`, `frise.html` |
| 99 | ●●● Haute | obsolescence | confirmé | Page d'accueil et webmanifest : « Treize continents », stat « 13 Continents », « HYBÉLIOR » accentué et « 40 chapitres » | `accueil.html`, `manifest.webmanifest` |
| 100 | ●●● Haute | obsolescence | confirmé | data/timeline-names.json non régénéré après le retcon Nysaria/Vytharia : 13 continents, Lunasar et Mirathi nations actuelles du « continent Nysaria » | `timeline-names.json`, `map.js`, `frise.html` |
| 101 | ●● Moyenne | obsolescence | confirmé | Atlas des Chroniques : route_v1 (40 chapitres, jours v1) jamais remplacée par une route v2 après la réécriture (38 chapitres, calendrier recalé) | `_atlas-donnees.json`, `_atlas-voyage.md` |
| 102 | ●● Moyenne | divergence-bible-texte | confirmé | Chroniques v2 : ch. 30 et ch. 31 portent le même `jour: 748` (la bible v2 date le ch. 31 au jour 775) — répliqué dans chroniques-index.json | `Chapitre 31 - Le Grand Saut Nord.md`, `chroniques-index.json`, `_bible-v2.md` |
| 103 | ●● Moyenne | obsolescence | confirmé | Frise : le « Message de Mirathi » y apparaît « simultanément à Ulinor, Nysaria et Vytharia » — le canon le fait recevoir à Mirathi seul | `timeline-data.js`, `Era 7 - Le Monde Actuel.md` |
| 104 | ●● Moyenne | divergence-bible-texte | confirmé | T2 roman-index.json : parties sans les titres canon de la bible, coda éclatée en trois parties « coda/Coda/coda » | `roman-index.json`, `_bible.md` |
| 105 | ●● Moyenne | obsolescence | confirmé | lore-chroniques.html : texte de repli v1 (« banni pour avoir cartographié des lieux interdits », « treize continents d'Hybélior ») et placeholder « Chapitre 1/40 » | `lore-chroniques.html`, `roman.html` |
| 106 | ●● Moyenne | obsolescence | confirmé | nav-config.js : Lunasar et Mirathi absents de nationContinents alors que leurs fiches Pays ET Histoires existent | `nav-config.js`, `Lunasar.md`, `Mirathi.md` |
| 107 | ●● Moyenne | ambiguite-a-arbitrer | à arbitrer | « Treize continents » dans les Chroniques v2 et sa bible vs « douze continents » (T3, Chronologie, GDD) — à arbitrer avant de régénérer les artefacts | `_bible-v2.md`, `Chapitre 37 - Le Cartographe Sans Carte.md`, `26 - Le copiste de Prismalith.md` |
| 108 | ● Basse | contradiction | confirmé | T2 roman-index.json : le « Seuil déporté III » (fichier 22) est placé APRÈS le premier chapitre de la Partie III, contre la convention du tome | `roman-index.json` |
| 109 | ● Basse | obsolescence | confirmé | roman-reader-index.json absent pour T2 et T3 (asymétrie avec T1) | `roman-index.json`, `roman-index.json`, `roman.html` |
| 110 | ● Basse | terme-double-sens | confirmé | « Mirathi » a trois référents (province-sanctuaire d'Ilthara, Écho-Guide d'Ulinor « Mirathi Voix-d'Ambre », disciple « Mirathis » du Cercle des Huit) | `Mirathi.md`, `Ulinor.md`, `Era 4 - L'Arrachement.md` |

#### Bibles vs textes

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 111 | ●●● Haute | contradiction | confirmé | « Treize continents » dans les Chroniques v2 (bible + 4 chapitres) contre le canon « 12 continents » | `_bible-v2.md`, `Chapitre 33 - L'Approche Polaire.md`, `Chapitre 35 - Les Routes Rouvrent.md` |
| 112 | ●● Moyenne | obsolescence | confirmé | Chroniques : _arc-sorin.md décrit toujours la V1 à 40 chapitres (Feraldir/Tiras, Nysaria en ch. 24) alors que le livre est passé à la route v2 en 38 chapitres | `_arc-sorin.md`, `_bible-v2.md`, `Chapitre 13 - Les Yeux Saisonniers.md` |
| 113 | ●● Moyenne | obsolescence | confirmé | T1 : l'annexe « Concordance des numérotations » de la bible décrit l'état pré-expansion (fichiers 00-36, « 31 chapitres POV ») | `_bible.md` |
| 114 | ●● Moyenne | divergence-bible-texte | confirmé | T1 : le chapitre S9 « L'homme qu'on ne recrute pas » et les deux Fragments intercalaires A/B (donnés VERBATIM par la bible) n'existent pas dans le texte | `_bible.md` |
| 115 | ●● Moyenne | divergence-bible-texte | confirmé | T2 : la copie du journal qui « mord » Vaenor est celle de Teor (ch. 16), pas celle d'Olven comme l'affirme la bible ; trois copies en scène, pas deux | `_bible.md`, `16 - Le journal d'un homme qui doutait.md`, `31 - La clef du coffre.md` |
| 116 | ●● Moyenne | ambiguite-a-arbitrer | confirmé | T2 : refermeture générale « en une heure » ~15 siècles après l'An 0, contre Era 5 (Fléau jusqu'à 1600, fermeture progressive ~1700, Failles statiques résiduelles) | `_bible.md`, `45 - L'Heure.md`, `50 - Le rapport que l'on croira.md` |
| 117 | ●● Moyenne | contradiction | confirmé | T3 ch. 32 : Vaenor située « mille ans plus tôt » au lieu de ~8 700 ans | `32 - Ce que l'ombre demande.md` |
| 118 | ● Basse | divergence-bible-texte | confirmé | T2/T3 : la règle « ne jamais expliciter les descendances » est contournée par des clins d'œil du narrateur (Kessa, « un autre Sorne », « un homme de son nom ») | `26 - La coupure.md`, `50 - Le rapport que l'on croira.md`, `42 - Vers le Mont.md` |
| 119 | ● Basse | divergence-bible-texte | confirmé | T3 : « Sanne — Kessane de son nom long » contre la bible (« Sanne est une usure de Kessane ; elle ne sait pas d'où vient son nom ») | `04 - La relique de maison.md`, `_bible.md` |

#### Lexique & homonymies

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 120 | ●● Moyenne | divergence-bible-texte | confirmé | « Acier Éternel » : alliage en production continue (GDD) vs lame unique jamais reforgée (Chroniques ch.7) | `Matériaux de Construction.md`, `Forgeron-Cœur de Myrtam.md`, `Chapitre 07 - L'Acier Éternel.md` |
| 121 | ●● Moyenne | terme-double-sens | confirmé | « Délié » : deux sens canoniques opposés (sevré volontaire GDD vs non-Lié stigmatisé des romans), la clé D-COSMO-3 invisible depuis les pages GDD | `Univers.md`, `Le Lien.md`, `Cosmologie.md` |
| 122 | ●● Moyenne | ambiguite-a-arbitrer | confirmé | « Mirathis » (devin·e du Cercle, Vytharia) / « Mirathi » (province de Vytharia, Message de Mirathi) : quasi-homonymie canon jamais documentée | `Era 3b - Religions Verithan et la Chute.md`, `Chronologie - Index.md`, `Mirathi.md` |
| 123 | ●● Moyenne | contradiction | confirmé | « Silencieux » / « Taciti » : Cosmologie.md place un « sanctuaire de Taciti » à Skaldoria et fusionne deux groupes distincts | `Cosmologie.md`, `Taciti.md` |
| 124 | ● Basse | terme-double-sens | confirmé | « Cardinal » : quatre emplois canon non glosés (Souffle Cardinal, « post-Cardinal » absolu, Cardinaux célestes, Cardinal-Élu) | `Cosmologie.md`, `Catena Fracta.md`, `_Histoire des Religions.md` |
| 125 | ● Basse | contradiction | confirmé | « Cardinal » appliqué à l'Arrachement : fait observé pour la Chronologie, simple lecture disputée pour la Frise GDD | `Frise.md`, `Chronologie - Index.md`, `Era 4 - L'Arrachement.md` |
| 126 | ● Basse | trou-canon | confirmé | « Panghor » : supercontinent (canon) vs entité « Sommeil-sous-les-Sommeils » (Chroniques) — l'équivalence avec la « Profondeur Première » (Vael'Ur) n'est posée nulle part | `Era 1b - Éthérés et Panghor.md`, `Chapitre 24 - L'Île Consciente.md`, `Era 7 - Le Monde Actuel.md` |
| 127 | ● Basse | trou-canon | confirmé | « Souffle de Cantor » (Chroniques) : absent du canon et morphologiquement lisible comme une variété du Souffle cosmologique GDD | `Chapitre 12 - La Forêt qui Chante.md`, `Cantus Mundi.md`, `Le Souffle.md` |

#### Système magique

| # | Grav. | Type | Verdict | Constat | Fichiers clés |
|---|---|---|---|---|---|
| 128 | ●●● Haute | contradiction | confirmé | Deux listes incompatibles des « 12 Cosmiques » : tout le GDD (Voies, Réactions, specs Unreal) contre la Chronologie D-COSMO-4 | `Le Lien.md`, `Cosmologie.md`, `Lien System.md` |
| 129 | ● Basse | trou-canon | à arbitrer | La doctrine des Ancrages (« Les Déliés sont les Ancrages du monde », Sorin qui « sent ») n'existe dans aucun document canon hors romans | `Chapitre 24 - L'Île Consciente.md`, `_bible-v2.md`, `Era 7 - Le Monde Actuel.md` |

## Annexe B — Les 12 constats écartés (réfutés au contre-examen)

Listés pour transparence : la contre-lecture des sources les a invalidés. **Aucun travail requis.**
- (Tome 1 vs canon) Chronologie de l'Étudiant intenable : banni ~60 av.A / Cercle formé ~30 av.A vs âges des Huit et texte du roman
- (Tome 3 & continuité Chroniques→T3) Porte d'Azur : le geste des tissus jaunes existe dans les deux livres mais avec des versions inconciliables et sans lien entre elles
- (Continuité inter-tomes) Era 3b cite un « fragment » du journal qui ne correspond plus au journal écrit du T1 (scène, date, mots, accents)
- (Continuité inter-tomes) Genèse des copies du journal : l'original est muré intact et jamais retrouvé, mais des copies verbatim vieilles de quinze siècles circulent au T2 — premier maillon jamais établi
- (Bibles vs textes) T1 : Fragment #3 daté J-51 au seuil de la Partie II, mais composé à J-1 au ch. 36 — et attribution de la question privée inversée entre ch. 17 et ch. 36
- (Bibles vs textes) T3 : cadence de la pulsation non monotone entre ch. 33 (« répit au quart d'heure ») et ch. 35 (recompte « à l'heure pleine » → « au quart »)
- (Bibles vs textes) T3 : le fil documentaire diverge de la bible sur trois points (cahier « manuel du geste » devenu délavé, rencontre des deux cahiers jamais physique, dépôt muré et non « déposé »)
- (Lexique & homonymies) « Vael'Kurash » réutilisé comme statut de bibliothèque à Gryndor (Chroniques ch.14) alors que c'est une des 9 grandes religions
- (Système magique) Esprits d'Evertia : T3 ch.16 recopie l'état exact des Chroniques ch.24 (189/217, 28 restants, 1 parlant, « trois dernières années ») environ un an plus tard — arithmétiquement impossible
- (Système magique) « Voie de Khatun » (T1) : une Voie nommée d'après une mortelle canon, sans entité derrière — la chaîne du feu (Khatun → Flamara/Eldoria vs Ignara GDD) n'est jamais raccordée
- (Système magique) La « Voie de théorie/mémoire » de Thessan n'a d'équivalent dans aucune des 17 Voies canon et aucune entité ne la porte
- (Système magique) Sustentation des cités volantes : « hypothèse théologique non attestée » selon Era 4, mais fait narratif attesté par T1 (Porteurs de Cendal'Horun, voix du Lien)

## Annexe C — Les mystères protégés (référence)

À ne jamais « corriger ». Avant toute retouche, vérifier qu'elle ne tranche aucun de ces points.
Les entrées ci-dessous sont des flous **délibérés**. La liste condense la cartographie de l'audit.

- **Les six lectures de l'Arrachement** — aucune ne s'impose. Ne corriger que la classe de l'événement (Souffle Cardinal ?), jamais la cause.
- **La causalité du geste de l'Étudiant** — jamais établie en fait. Le roman incarne la lecture verithane sans la prouver ; le delta de Mirathis (T1 ch. 17-18) et la « silhouette de plus » de Velkar (T1 ch. 44) sont les garde-fous.
- **« Revenir ou commencer »** — la voix qui naît au T3 (prologue → « Je viens à toi ») ne tranche jamais entre le Lien qui revient et une naissance neuve ; ni qui parle à la dernière page (Ilex ou le dessous).
- **L'auteur de la Guerre de l'Ombre** — jamais révélé. Sanne meurt « sans visage, sans revendication » ; la note anonyme du T3 ch. 37 reste sans suite ; les Fils de l'Abîme restent le « suspect commode » ; la « troisième chose qui ne signe rien » demeure sans réponse.
- **La cause du Fléau et de « l'Heure »** — les lectures rivales (blessure qui suppure, roue faussée, purge, l'Étranger des Heures) sont incarnées sans être tranchées ; l'Heure « n'explique rien » et il n'y a « aucun donc » entre extinction des Tisses et fermeture des Failles (coïncidence, jamais causalité).
- **La cause des Souffles Cardinaux** (Premier Don, Fracture, Arrachement) — « aucune lecture ne s'est imposée comme canon ».
- **Les termes exacts du Pacte Primordial** — « personne ne sait exactement ce qui a été promis ». (Seul le point des *contractants* — 5 Éternels vs Éternels+Cosmiques — est une divergence à arbitrer, cf. D-locale.)
- **Le retrait de Navigor** — « retiré » vs « il chuchote seulement » vs « poussé par quelqu'un que nous n'avons pas vu » (vision de Vorath). L'entité qui l'aurait aidé (fil DAR-07) reste un mystère intentionnel.
- **Le sort d'Aldric Valthen** — les « trois cartes » des Chroniques ch. 38 (mort / attendant au-delà d'un seuil / hors du temps) : superposition voulue, jamais résolue, y compris dans le T3. Idem le sort de Mira Dasthen (« mutée, ou pire »).
- **La filiation de « l'enfant qui entend »** (coda T2) et l'identité de la fileuse au cahier — laissées ouvertes.
- **Le Panghor / le dessous / la Profondeur Première** — « cinq noms, peut-être, pour une même chose, ou cinq peurs sans objet commun ». Documenter l'homonymie (supercontinent / entité) sans identifier le référent.
- **Le Mangeur de Temps** (créature vs culte) — jamais vu ni expliqué, montré par ses seuls effets ; les Mangeurs jouent volontairement de la confusion.
- **Le statut de Flamara** — « rumeur populaire, pas au canon » ; ses occurrences en bouche de personnages sont conformes. Ne pas lui donner de rang d'entité.
- **Le double calendrier** — an 251 du Sillage = ~10 200 ap.A. « Quinze siècles » (T2) et « dix mille ans » (T3) sont des usages *conformes* du temps profond ; « mille ans, dix mille, on ne compte plus » en bouche de personnage est voulu. Seules les datations en *voix narrative ferme* qui se contredisent sont des erreurs.
- **L'heure exacte du geste de l'An 0** (aube / minuit / midi selon les traditions) — coexistence voulue, ne pas fixer d'horloge.
- **Homonymies assumées et déjà arbitrées** : les deux Portes de Fer (commémoratif), les deux Lunaris d'Ilthara (coïncidence de toponymes, `Drakora.md`), Plaine de Gryndor ↔ future nation Gryndor, Mirathi ↔ Mirathis (lié au delta de Mirathis) — à *gloser*, pas à renommer.
