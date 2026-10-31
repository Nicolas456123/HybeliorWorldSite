# Âme des villes — méthode et pilote : Ryndor

*Méthode validée par l'auteur le 31/10 (« Go pour Ryndor », demande d1935ad0e). **Ryndor est versée dans l'Atrium**
(`lie-0683`, `data.ame`, avec ses faits datés, ses figures et ses liens) : c'est l'Atrium qui fait foi, ce texte n'en garde
que la méthode et le plan. Deux noms ont changé au versement pour ne pas doubler des fiches existantes : Mervane l'Épierreuse
devient **Aveline l'Épierreuse** (trop proche des Marevanes) et Taldrin Veyl devient **Garin Ascle** (trop proche de Taldric
de Veylorn). Dates calées sur le canon : occupation de Sylthara vers 8 950 (`fac-0812`), Grande Famine vers 10 125
(`fac-0814`, `evt-0044`), an 251 du Sillage = ~10 200 ap.A.*

---

## 1. La méthode : une ville crédible se déduit, elle ne s'invente pas

Chaque élément de l'âme d'une ville doit pouvoir s'expliquer par ce que le canon sait déjà d'elle :

- **son site** (plateau, gué, port, col, frontière, marais drainé) : il dit de quoi on a manqué et de quoi on a eu peur ;
- **son économie** (fiche de la ville, métiers que Dédale y pose) : elle dit qui est riche, qui doit à qui ;
- **sa nation** (gouvernement, religion et fêtes, hiérarchie, coutumes) : la ville en est une variante locale, jamais une
  exception gratuite ;
- **son âge et sa taille** : un hameau a un souvenir, une ville en a plusieurs, une capitale a des archives ;
- **l'histoire datée de sa région** (guerres, famines, épidémies de la chronologie) : la ville y a vécu quelque chose, à sa
  manière.

Dosage, pour rester dans le vraisemblable :

| Élément | Combien | Règle |
|---|---|---|
| Raison d'être (fondation) | 1 | Toujours un besoin concret : se cacher, boire, passer, vendre, prier. |
| Événements marquants | 2 à 4 | Datés, rattachés à une ère ; au moins un est l'écho local d'un événement du canon. |
| Figures | 2 ou 3 | Une morte (dont on parle), une vivante (qu'on peut croiser), parfois une famille. |
| Coutumes | 1 ou 2 | Variante locale d'une coutume nationale, avec sa raison pratique (comme la Semaine des Premiers de Faldrin). |
| Tension actuelle | 1 | Matérielle d'abord (eau, dette, terre, héritage), jamais un complot mondial. |
| Secret ou rumeur | 1 | Petit, humain, vérifiable sur place. |
| Magie | au niveau de la nation | Une ville agricole de Sylthara n'a pas de prodige ; elle a des esprits du sol et des fêtes. |

Et trois règles de fond :

1. **L'histoire est racontée, pas donnée.** Chaque événement a sa vérité (dans l'Atrium, hors monde, comme les `verite` des
   mystères) et deux ou trois versions tenues par des groupes différents — anciens, semeurs, artisans, marchands, prêtres,
   voisins. Chacune voit juste quelque part et se trompe ailleurs : c'est la « vision erronée universelle » du canon, à
   l'échelle d'une rue. Le joueur recoupe.
2. **Tout ce qui se raconte se retrouve sur place.** Un nom de rue, une pierre gravée, un quartier rebâti, une citerne
   murée, un registre dans un coffre. Une histoire sans trace reste une rumeur ; une trace sans histoire reste un décor.
3. **Les villes se répondent.** Un événement régional se raconte autrement dans chaque ville ; chaque ville a au moins un
   voisin qu'elle aime, qu'elle méprise ou à qui elle doit quelque chose.

---

## 2. Pilote : Ryndor (Dyanos, Sylthara) — versé dans l'Atrium

Le texte fait foi dans l'Atrium (`lie-0683`, panneau « L'âme du lieu » de la fiche) ; en bref :
- **raison d'être** : un refuge devant les seigneurs de guerre (vers 8 950, la même fuite que Velthar), des citernes dans la
  roche, puis le pari d'**Aveline l'Épierreuse** (Première Terrasse, vers 10 030) ; l'argent de l'huile pendant la Grande
  Famine a fait du hameau une ville ;
- **événements** : la Première Terrasse, la Grande Famine à Ryndor (vers 10 125, écho de `evt-0044`), l'institution de la
  Première Huile (10 128), l'Été des Citernes Vides et la Loi des Seaux (10 170) ;
- **figures** : Aveline l'Épierreuse, **Garin Ascle** (Gardien des Citernes), la **Famille Doral** (Hestan Doral aujourd'hui) ;
- **coutumes** : la pierre de naissance (variante du Don de la Graine), la Première Huile (variante de la Grande Moisson) ;
- **tension** : les bassins des Doral contre la Loi des Seaux ; **mémoire disputée** : ce que Ryndor a fait de son huile
  pendant la famine (cinq versions, et la vérité : vendue, puis la Première Huile en pénitence) ; **rumeur** : les os de la
  citerne murée ;
- **11 traces**, **4 toponymes**, **7 groupes** d'habitants, **13 répliques**, **un voisin** (Velthar).

## 3. Ce que la méthode demandait (format et contrôle faits le 31/10, voir §4)
1. **Le format dans l'Atrium** : sur chaque lieu, une partie `ame` (raison d'être, coutumes, tension, traces) ; les événements en
   faits datés (`fact_type` existants, `era_id`) ; les figures en personnes rattachées au lieu ; la mémoire disputée en
   question locale avec ses lectures (`readings`) et sa vérité, sur le modèle des treize mystères protégés.
2. **Un contrôle**, comme `verifier-raccord.js` : dates dans l'histoire de la région, rien qui contredise un fait du canon,
   noms au style de la nation, chaque récit avec au moins une trace et au moins un groupe qui le raconte.
3. **Dans le jeu** : les répliques des habitants tirées de la fiche selon leur groupe (classe, métier, quartier, âge) ; Dédale
   qui nomme les rues et pose les traces (pierres marquées, citernes, plaques, objets à fouiller) ; les tensions comme
   amorces de quêtes.

---

## 4. À l'échelle : le reste du monde

**L'outil** (`scripts/ame-des-villes.js`) : `verser` une fiche d'âme (JSON), `extraire` pour la reprendre, `verifier` (dosage
par échelle, dates dans l'ère et avant le présent, écho d'un événement du canon, une trace pour chaque récit et un récit pour
chaque trace, groupes d'habitants dans le vocabulaire de Dédale, répliques, voisins qui se répondent, noms qui ne doublent pas
une fiche), `jeu` pour la fiche que lisent Dédale et Unreal (`HybeliorPrototype/Monde/ames/<lieu>.json`). Le site montre le
panneau « L'âme du lieu » sur la fiche ; une âme `proposée` y porte la mention « à valider par l'auteur ».

**Le volume** : 707 lieux habités (58 cités, 247 villes, 382 bourgs, 20 hameaux) dans 54 nations, plus 76 sans nation ;
les 114 lieux-dits n'ont besoin que d'une ligne. Le dosage suit la taille : un hameau a un souvenir, un bourg une coutume et
une mémoire, une ville deux à quatre événements, une cité davantage.

**La manière** :
1. **Par nation, jamais ville par ville.** D'abord une fiche de nation : les événements datés de sa chronologie que chaque
   ville a vécus à sa façon, la toile des voisinages (qui aime, méprise ou doit quoi à qui), les groupes d'habitants (la
   hiérarchie de la nation traduite en âge, classe, métier, rôle de Dédale), les coutumes nationales à décliner, le niveau
   de magie. C'est ce qui empêche les villes de se ressembler et les fait se répondre.
2. **Écriture par sous-agents Sonnet**, cinq au plus en parallèle, chacun quelques villes d'une même région : la méthode,
   la fiche de nation, les fiches existantes de ses villes, Ryndor en exemple. Le contrôle refuse ce qui ne tient pas.
3. **Relecture d'ensemble par Claude** avant tout versement : contradictions avec le canon et les livres, farfelu, magie
   hors dosage, villes interchangeables, voisins qui ne se répondent pas. Versement en `proposée`.
4. **Validation de l'auteur par nation**, sur le site ; puis `validée`.
5. **Ordre** : les villes jouables de Dédale et celles où passent les livres d'abord. Après Ryndor : **Sylthara** (16 lieux :
   6 villes, 9 bourgs, 1 hameau), où Velthar doit répondre à Ryndor et où le canon est riche ; elle donnera le vrai rythme.
6. **Dans le jeu, une fois pour toutes** (construit sur Ryndor, puis automatique pour chaque ville qui a une âme) : Dédale
   nomme les rues d'après les toponymes et pose les traces (pierres marquées, inscriptions, citerne murée, objets dans les
   coffres) ; les habitants disent les répliques de leur groupe ; « fouiller » montre le texte de la trace ; les tensions
   deviennent des amorces de quêtes.
