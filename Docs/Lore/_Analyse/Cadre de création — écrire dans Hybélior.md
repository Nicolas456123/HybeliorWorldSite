# Cadre de création — écrire dans Hybélior sans tout lire

*Méthode, pas canon. Proposée le 17/11/2026 à la demande de l'auteur : « il faut un cadre, et que ce soit simple de créer quelque chose
dans l'univers qui respecte le lore sans avoir à tout lire […] des histoires de PNJ cohérentes avec le lore, le lieu, la culture, des quêtes,
tout ce qui demandera des histoires pour le jeu, plus ou moins haut niveau : le plus bas c'est la vie de tous les jours, le plus haut les
entités, les Éternels. » Elle généralise « Âme des villes — méthode et pilote Ryndor » à tous les niveaux.*

---

## 1. Le principe : on écrit vers le bas

Tout ce qu'on crée **se déduit de ce qui est au-dessus**, jamais l'inverse.

- Un niveau peut **s'appuyer** sur tout ce qui est au-dessus de lui.
- Il **n'invente jamais un fait** d'un niveau au-dessus. Un PNJ ne crée pas un dieu, une quête de village ne change pas l'histoire d'une nation.
- Il peut en revanche **en raconter une version fausse** : un paysan croit qu'un Éternel a sauvé sa récolte, une confrérie se trompe sur la
  fondation de sa ville. C'est la *vision erronée universelle* du canon, à hauteur d'homme. La vérité reste écrite dans l'Atrium.
- Plus on monte, plus il faut l'accord de l'auteur. Plus on descend, plus on est libre.

Conséquence pratique : pour écrire au niveau N, on ne lit **que** le dossier de contexte du lieu et les règles des niveaux au-dessus (§2).
Jamais tout le corpus.

---

## 2. Les six niveaux

| Niveau | Ce qu'on y crée | Ancrages obligatoires | Libre d'inventer | Interdit | Qui valide |
|---|---|---|---|---|---|
| **0. Quotidien** | Un habitant, son métier, sa journée, ses repas, ses petites joies et peurs, une dispute de voisins | Le lieu, un métier qui y existe, une coutume de la nation | Noms, caractères, souvenirs privés, objets usuels | Tout fait public nommé (événement, figure connue) | Personne : libre |
| **1. Local** | Une famille, une rumeur, une petite quête, un petit lieu (moulin, auberge, tombe), une fête de rue | La ville et son âme, une tension matérielle du lieu | Lignées locales, petits secrets vérifiables sur place | Changer la fondation, les figures ou les dates de la ville | Relecture (Claude) |
| **2. Ville et région** | L'âme d'une ville, une figure notable, un conflit entre villes, une quête régionale, une confrérie | Méthode « Âme des villes » : site, économie, nation, âge, histoire datée de la région | Événements locaux datés, coutumes locales (variante de la nation), figures mortes et vivantes | Changer une nation, une religion, une ère | L'auteur, en lot (tableau) |
| **3. Nation, ordres, religions** | Un ordre, une guilde nationale, un schisme, une guerre, un héros national, une loi | Fiche de la nation, sa religion, la chronologie | Épisodes de l'histoire d'une nation qui ne contredisent pas la chronologie | Toucher aux ères, au Pacte, aux rangs des entités | L'auteur, un à un |
| **4. Mythique** | Une légende du monde, une merveille, un monstre unique, un artefact, une figure mythique (héros, demi-dieu au sens grec : un mortel touché par une entité), les Anciens bâtisseurs | Ère, entité(s) concernée(s), mystères protégés | Rien sans l'auteur ; on propose | Créer un rang, élever un mortel au rang d'entité (« Aucun mortel n'a de siège ») | L'auteur seul |
| **5. Éternels et entités** | Une entité, un domaine, la cosmologie, le Pacte Primordial, la Polyphonie | Canon — décisions actées, Partie 1 | Rien : Claude propose, l'auteur décide | Tout changement sans l'auteur | L'auteur seul |

**Rangs des entités** (canon, à respecter au niveau 4 et 5) : Éternels ; douze Cosmiques (Aerion, Aquor, Aurion, Umbra, Spiritus, Fatum,
Terranu, Somnix, Ignara, Sanguis, Resonia, Vermis) ; Astraux ; Célestes (entités natives, jamais un mortel élevé). Une « nouvelle divinité »
est donc presque toujours **un culte local d'une entité existante sous un autre nom**, ou un **Astral** mineur : c'est ce qu'il faut proposer
d'abord.

---

## 3. Les quatre questions d'ancrage

Avant d'écrire quoi que ce soit, répondre en une ligne à chacune. Si une réponse manque, l'objet n'est pas prêt.

1. **Où ?** Le lieu précis (id de l'Atrium). Le dossier de contexte en donne tout le reste.
2. **Quand ?** L'ère, et une date ou un « il y a » rattaché à un événement daté du dossier.
3. **Qui ?** Le groupe : métier, lignée, croyance, classe sociale de la nation. Personne n'existe hors d'un groupe.
4. **Quelle trace ?** Ce qui se retrouve sur place : un nom de rue, une pierre, un registre, une tombe, un objet, une chanson. Une histoire
   sans trace reste une rumeur ; une trace sans histoire reste un décor.

---

## 4. Le dosage (rester vraisemblable)

| | Quotidien | Local | Ville | Nation | Mythique |
|---|---|---|---|---|---|
| Magie visible | aucune ou un geste de foi | une chose étrange, petite | au niveau de la nation | celle de sa religion | une seule merveille |
| Enjeu | une journée, un repas, une dette | une famille, un champ, une source | la ville, l'eau, le commerce | une nation, un ordre | le monde, un mystère |
| Méchant | aucun, des gens qui ont tort | un voisin, un créancier | un rival, une faction | un ordre, une nation | une entité (jamais révélée en clair) |
| Durée | un jour | une saison | une génération | un règne | une ère |

Règle de fond : **la tension est matérielle d'abord** (eau, terre, dette, héritage, récolte, métier), jamais un complot mondial au bas de
l'échelle.

---

## 5. Les fiches modèles

Chaque fiche commence par l'**en-tête d'ancrage** : `Niveau · Où (id) · Quand (ère, date) · Qui (groupe) · Trace`.

### 5.1 PNJ (niveaux 0 à 2)
- **Nom** (table des noms de la culture : `HybeliorPrototype/Scripts/pnj/noms`), âge, métier, foyer.
- **Ce qu'il veut maintenant** (concret, une phrase) et **ce qui l'en empêche**.
- **Ce qu'il croit** : sa version d'un événement du dossier (vraie en partie, fausse ailleurs).
- **Un lien** : à une figure, une lignée ou un voisin du dossier ; et un voisin d'une autre ville qu'il aime, méprise ou à qui il doit.
- **Une habitude** liée à une coutume de la nation (fête, prière, repas).
- **Une trace** de lui sur place, et ce qu'il dit au joueur la première fois (deux phrases).
- **Secret** (facultatif) : petit, humain, vérifiable sur place.

### 5.2 Quête (niveaux 1 à 3)
- **Déclencheur** : qui demande, et pourquoi lui, pourquoi maintenant.
- **Besoin concret** (eau, dette, objet, personne disparue, message) et **tension** (qui perd si ça réussit).
- **Versions** : deux ou trois personnes racontent l'affaire autrement ; le joueur recoupe.
- **Lieux** : où aller (lieux du dossier, au plus trois), ce qu'on y trouve (traces).
- **Issues** : au moins deux, aucune sans coût ; ce qui change sur place ensuite (une rumeur, une porte ouverte, un PNJ qui part).
- **Liens au-dessus** : quel fait du niveau supérieur elle effleure sans le changer.
- Pour le jeu : métier du donneur (les quêtes du monde partent d'un habitant selon son métier), récompense, durée.

### 5.3 Légende ou rumeur (tous niveaux, racontée au niveau 0 à 2)
- **La vérité** (pour l'Atrium seulement, `verite`), puis **deux ou trois versions** tenues par des groupes nommés.
- **Ce que chaque version a de juste et de faux.** Où on l'entend (taverne, temple, veillée), qui ne la raconte jamais.

### 5.4 Événement local daté (niveau 1 à 2)
- Date, ère, lieu ; **cause matérielle** ; **écho d'un événement du dossier** (famine, guerre, Faille…) ; ce qu'il a laissé (trace, coutume,
  rancune) ; qui s'en souvient comment.

### 5.5 Figure mythique (niveau 4, sur proposition)
- Mortel touché par une entité existante : laquelle, pourquoi, à quel prix ; ce que les cultes en racontent (versions) ; ce qu'il n'est **pas**
  (jamais une entité, jamais un siège) ; une trace dans le monde (tombe, constellation, épée, lignée).

### 5.6 Entité ou culte (niveau 5, sur proposition)
- D'abord : est-ce une entité **existante** vue autrement par un peuple ? (le cas normal). Sinon : rang (Astral au plus, sauf décision de
  l'auteur), domaine, place dans le Pacte Primordial, ce qu'elle n'est pas, culte (où, qui, rites), un mystère protégé à son sujet.

---

## 6. L'atelier : comment produire

1. **Dossier de contexte** du lieu ou de la nation :
   `python -X utf8 HybeliorPrototype/Scripts/lore/dossier_contexte.py <lieu ou nation>` → `HybeliorPrototype/Saved/Hybelior/lore_dossiers/<id>.md`
   (le lieu et son âme, son concept de ville, sa région et ses voisins, sa nation : gouvernement, religion, culture, secrets ; ses personnes, son
   histoire datée, les protégés 🔒, les ères et les entités). C'est la seule lecture nécessaire jusqu'au niveau 2.
2. **Fiche** du §5, en-tête d'ancrage rempli.
3. **Contrôle** (§7). Pour les niveaux 3 à 5, joindre la ligne « Canon à changer » si une phrase de fiche serait contredite.
4. **Versement** : niveau 0 et 1 dans les tables du jeu (habitants, quêtes) ; à partir du niveau 2, dans l'Atrium en statut `propose`, puis
   `canon` après l'accord de l'auteur ; la vérité d'une légende en `verite`.

Un écrivain (l'auteur ou une IA) n'a donc jamais à lire plus que : ce cadre + un dossier de contexte (2 000 mots environ) + la fiche qu'il remplit.

---

## 7. Contrôle de cohérence (dix questions)

1. Chaque nom, lieu, date cité existe dans le dossier, ou est créé au bon niveau ?
2. Rien ne change un fait d'un niveau au-dessus ?
3. La magie est-elle au niveau de la nation et du §4 ?
4. La tension est-elle matérielle avant d'être mystique ?
5. Y a-t-il une trace sur place ?
6. Les croyances des personnages sont-elles des versions, et la vérité est-elle écrite à part ?
7. Aucun mystère protégé 🔒 n'est révélé en clair ?
8. Les rangs des entités sont respectés (aucun mortel élevé, aucun nouveau Cosmique) ?
9. Les noms suivent la culture (table des noms, lexique, homonymes à éviter : « Glossaire des homonymies ») ?
10. Le lieu répond à un voisin (lien, rivalité, dette) ?

---

## 8. Ce qui reste à faire pour que ce soit vraiment rapide

- Brancher le dossier de contexte dans Studio (un bouton sur chaque ville de l'onglet « Concepts de villes »).
- Des générateurs par niveau qui remplissent une fiche du §5 à partir du dossier (PNJ du quotidien d'abord : métier, nom, coutume, croyance
  tirés des tables), relus ensuite.
- Une table des métiers et des groupes sociaux par nation, et une table des coutumes et fêtes, extraites des fiches des nations.
- Un contrôle automatique des points 1, 7, 8 et 9 du §7 sur une fiche écrite.
