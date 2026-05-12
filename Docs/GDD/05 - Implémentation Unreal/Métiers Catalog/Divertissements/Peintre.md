---
tags: [métier, archétype, divertissements, acuité, verbe]
type: archetype
category: Métier
catégorie_métier: Divertissements
stat_principale: Acuité
stats_secondaires: [Verbe, Mémoire, Vivacité]
craft_category: 8 — Scriptorium et enchantement (partiel)
sources_ressources_accessibles: [Pigment, Liquide, Huile, Toile, Bois, Plâtre, Cire raffinée, Métal poli]
stations_principales: [Atelier de peintre, Mur de fresque, Cabinet privé, Place publique, Façade extérieure, Cour royale]
outils_principaux: [Pinceaux, Palette, Chevalet, Toile montée, Pigments broyés, Huile de lin, Truelle (fresque), Spatule]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Teinturier, Sculpteur, Cartographe, Calligraphe, Acteur, Architecte]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [pigments-d'ère-recettes, fresques-monumentales-Héritage]
---

# 🎨 Peintre — Archétype Métier

> *« La pierre garde les noms. Le parchemin garde les mots. Mais c'est ma fresque qui retient le visage du roi quand tous les autres l'ont oublié. »*
> — **Maître Calianor de Galenor**, fresquiste de la cathédrale de [[Foedus Animae]]

---

## 1. Vue d'ensemble

Le **Peintre** est le métier des **œuvres visuelles 2D** d'Hybelior. Il produit fresques (monumentales, fixes), tableaux (portatifs), enluminures (sur manuscrit), portraits (cours nobles), décors de théâtre (collaboration [[Acteur]]). C'est le **gardien du visuel** dans une civilisation où peu d'images circulent : un visage peint vaut une légende.

> [!important] Cross-réf [[Pigment]]
> Le Peintre est le **principal consommateur** de [[Pigment]] (Source 3 Fabrication, métier amont [[Teinturier]]). Il peut aussi **broyer ses propres pigments** à partir des sources brutes ([[Plante]], [[Fleur]], [[Minerai]] broyé). Cf. [[Sources de Ressources]] §Fabrication.

> [!important] Frontière Peintre / Sculpteur
> - **Peintre (M4 — Divertissements)** : œuvres **2D** (fresques, tableaux, enluminures, portraits). Stat : Acuité + Verbe.
> - **[[Sculpteur]] (M2 — Artisanat)** : œuvres **3D** (statues, bas-reliefs, talismans). Stat différente.
> - Frontière nette par dimension. Collaborations possibles : sculpteur sculpte, peintre peint la sculpture.

Métier **patrimonial** : une fresque monumentale d'un Maître peut survivre à plusieurs Souffles → **Œuvre signée** (cf. [[L'Accord]] §Héritage).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Acuité** — précision du trait, perception des couleurs, observation du modèle
- **Stats secondaires** :
  - **Verbe** — négociation des commandes, lecture du commanditaire, pédagogie d'apprentis
  - **Mémoire** — recettes de pigments, techniques classiques, modèles iconographiques
  - **Vivacité** — virtuosité du geste, fresque rapide (la chaux sèche vite)
- **Maîtrise contextuelle** : `Maîtrise_Peinture` — progresse à chaque œuvre achevée. Sous-spécialités à partir d'Adepte : Fresque / Tableau / Portrait / Enluminure / Décor de théâtre / Cartographie illustrée.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** :
- **[[Pigment]]** (Source 3 Fabrication, intrant principal, fourni par [[Teinturier]] ou auto-produit)
- **Sources brutes pour pigments** : [[Plante]], [[Fleur]], [[Minerai]] broyé, [[Poudre naturel]] (pigments cosmiques rares)
- **[[Liquide]]** — eau, médiums
- **[[Huile]]** — huile de lin pour peinture à l'huile (Source 3 Fabrication, [[Apothicaire]] / Pressier)
- **Toile** — [[Tisserand]] (montée sur châssis [[Menuisier]])
- **[[Bois]]** — panneaux pour tableaux (Menuisier)
- **Plâtre** — fresques ([[Maçon]])
- **[[Cire raffinée]]** — encaustique (peinture à la cire)
- **Métal poli** — feuille d'or, d'argent (palier Expert+, [[Bijoutier]] / [[Orfèvre]])

**Produit** :
- **Fresques** — œuvres monumentales fixes (Héritage localisé)
- **Tableaux** — œuvres portatives, marchandes
- **Portraits** — sur commande (cours nobles)
- **Enluminures** — décor de manuscrits ([[Bibliothécaire]] / [[Calligraphe]])
- **Décors de théâtre** — collaboration [[Acteur]]
- **Cartes illustrées** — collaboration [[Cartographe]]
- **Cosmétiques peints** — palier Expert+ (peinture corporelle rituelle, costumes décorés)
- **Œuvres signées** — palier Maître (Héritage permanent)

→ Référence [[Crafts]] §8 — Scriptorium et enchantement (partiel : enluminures). Le reste relève de la création artistique sui generis.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Atelier de peintre** | Atelier privé, tableaux, broyage de pigments | Novice |
| **Cabinet privé** | Petits formats, portraits intimes | Novice |
| **Place publique** | Œuvres de rue, enseignes peintes | Initié |
| **Mur de fresque** | Fresques en intérieur (église, palais) | Adepte |
| **Façade extérieure** | Fresques en extérieur (rare, durabilité limitée) | Expert |
| **Cour royale** | Portraits royaux, fresques de salle d'apparat | Expert |

**Outils signature** :
- **Pinceaux** — variés par taille (poil de [[Sécrétion|fourrure]], soie, plume) ([[Tanneur]], [[Tisserand]])
- **Palette** — bois ou cuir
- **Chevalet** — [[Menuisier]]
- **Toile montée** — [[Tisserand]] + [[Menuisier]]
- **Pigments broyés** — auto-produits ou achetés au [[Teinturier]]
- **Huile de lin** — médium principal
- **Truelle** — fresque sur enduit frais
- **Spatule** — application épaisse, palier Adepte+

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Tableau simple, enseigne peinte, broyage de pigments basiques. Taux d'échec ~15% (couleurs sales, proportion fausse) |
| **Initié** | Portrait basique, enluminure simple, pigments à 5 couleurs. Premières commandes payées |
| **Adepte** | Fresque intérieure, portrait reconnu, enluminure complexe, sous-spécialité déclarable. Pigments d'ère accessibles |
| **Expert** | Fresque monumentale, portraits de cour, feuille d'or, décors de théâtre. Proc qualité Magistrale 5% |
| **Maître** | **Condition cachée 🔒** — Œuvre signée (fresque permanente, Héritage), commande royale d'État, capacité de **« faire entrer un visage dans la mémoire collective »** (PNJ historique inscrit) |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Sans pratique, la main perd sa précision (rouille -15%). Les fresques anciennes peuvent **s'effacer** progressivement entre les ères → demande de restauration récurrente.

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Enseigne d'auberge · Tableau d'apprentissage · Broyage de pigments simples |
| **Initié** | Portrait de famille · Enluminure de manuscrit mineur · Décor d'atelier |
| **Adepte** | Fresque intérieure (chapelle locale) · Portrait reconnu · Enluminure de tome |
| **Expert** | Fresque monumentale (cathédrale, palais) · Portrait royal · Décor de théâtre permanent |
| **Maître** | **Œuvre signée** : fresque nommée d'après le Peintre (Héritage permanent), portrait d'État, restauration de fresque pré-Souffle |

→ Cross-réf : un Peintre Maître peut « immortaliser » un héros de joueur en peinture monumentale — entrée à l'Héritage d'Hybelior.

---

## 7. Carrière et débouchés

- **Démarrage** : apprenti dans un atelier urbain, enlumineur dans un scriptorium religieux, ou peintre d'enseignes de quartier
- **Progression** : ateliers → fresques d'église → cour royale
- **Établissement** :
  - **Peintre de quartier** — enseignes, petits tableaux, paye-en-nature accepté
  - **Peintre d'atelier** — engagé par un maître, salaire + part
  - **Peintre de cour** — engagement noble, portraits, fresques
  - **Peintre rituel** — fresques religieuses ([[Foedus Animae]], [[Rota Mundi]])
  - **Peintre cartographe** — collaboration permanente avec [[Cartographe]]
  - **Maître fresquiste** — œuvres monumentales d'État (palier Maître)
- **Réseau** :
  - **Pair-amont** : [[Teinturier]] (pigments), [[Tisserand]] (toile), [[Menuisier]] (panneaux, châssis), [[Maçon]] (enduit pour fresque), [[Apothicaire]] (huile, médiums), [[Bijoutier]] / [[Orfèvre]] (feuille d'or)
  - **Pair-collaboration** : [[Sculpteur]] (peinture sur sculpture), [[Calligraphe]] (manuscrits enluminés), [[Architecte]] (intégration fresque-bâtiment), [[Acteur]] (décors), [[Cartographe]] (cartes illustrées)
  - **Aval** : cours nobles, temples, particuliers, [[Bibliothécaire]] (enluminures)
- **Faction** : Confrérie des Peintres, Guildes d'enlumineurs religieux, Académie des Beaux-Arts d'Astravia

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 7 — Divertissements). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Maître des arts

> Source canonique : `Role.csv` (cat 7, role n°32).

- **Description** : Peintre-Maître élevé au rang de figure artistique majeure — œuvres monumentales d'État, fresques de palais et de temples, portraits royaux, autorité reconnue par l'Académie des Beaux-Arts d'Astravia. Le titre peut aussi viser un [[Sculpteur]]-Maître.
- **Conditions** : palier Maître + ≥ 1 œuvre monumentale d'État (fresque, retable, statue) signée + Reconnaissance ≥ Expert capitale + 🔒 condition cachée (avoir produit une œuvre incluse au [[Le Souffle|Héritage]] persistant post-Souffle OU enseigné à l'Académie).
- **Notes** : équivalent canonique du **Maître fresquiste** dans l'échelle d'évolution (§7). `[REFONTE-NEEDED — frontière Divertissements (Peintre) / Artisanat (Sculpteur cat 2). Le rôle « Maître des arts » est trans-métier — un PNJ peut être Peintre-Maître + Sculpteur-Maître. Voir aussi [[Sculpteur]] §7 (note miroir).]`

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Pigments végétaux abondants, fresques de jardin, prix pigment baisse |
| **Ère [[Les Ères|Sommeil de Glace]] (Climata)** | Pigments minéraux valorisés, fresques d'intérieur, conservation facilitée |
| **Ère [[Les Ères|Vents]] (Aerion)** | Fresques exposées au vent dégradent x2, peintres itinérants avantagés |
| **Ère [[Les Ères|Brume Mortelle]]** | Pigments rares disponibles (couleurs putrides), demande de fresques mémorielles x3 |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Pigments noctari (encres révélatrices), fresques aux effets cachés |
| **Post-[[Le Souffle]] semaine 1** | Restauration urgente des fresques abimées par le Souffle (effacement partiel) |
| **[[L'Accord]] ≥ 75%** | Pigments d'ère débloqués (couleurs uniques) |
| **[[L'Accord]] = 100%** | Œuvre signée : fresque permanente d'ère (Héritage, [[L'Accord]] §Héritage) |
| **Religion (toute)** | Théâtre rituel propre, fresques cérémonielles, accès aux fonds religieux |
| **Cour noble** | Portraits, fresques d'apparat, paie haute |

---

## 9. Économie

**Gold sinks générés** :
- [[Pigment|Pigments]] ([[Teinturier]]) : 50-2 000 Éclats / lot (couleurs courantes → couleurs rares)
- Toile + châssis ([[Tisserand]] + [[Menuisier]]) : 50-300 Éclats / unité
- Huile de lin ([[Apothicaire]]) : 30-100 Éclats / lot
- Feuille d'or ([[Orfèvre]]) : 500-5 000 Éclats / lot (Expert+)
- Loyer atelier : 200-2 000 Éclats / mois

**Prix indicatifs** :
- Enseigne peinte : 10-100 Éclats
- Tableau d'apprentissage : 50-300 Éclats
- Portrait Adepte : 200-2 000 Éclats
- Portrait royal Expert : 5 000-50 000 Éclats
- Fresque monumentale Maître : 50 000-500 000 Éclats (gold sink majeur, commande d'État)
- Œuvre signée Maître : Héritage social principalement, redevances copies

**Chaîne économique** :
```
[[Teinturier]] / [[Tisserand]] / [[Menuisier]] / [[Maçon]] / [[Apothicaire]] (matériel) → Peintre (Œuvre)
                                                                                          ↘ Particulier (tableau, portrait)
                                                                                          ↘ Temple (fresque rituelle)
                                                                                          ↘ Cour noble (fresque d'État, portrait royal)
                                                                                          ↘ [[Bibliothécaire]] (enluminure)
                                                                                          ↘ [[Acteur]] (décor de théâtre)
                                                                                          ↘ [[Cartographe]] (carte illustrée)
                                                                                          ↘ Héritage d'Hybelior (Œuvre signée)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 06:00 lever — broyage de pigments, préparation des médiums (lumière du matin idéale)
- 07:00-12:00 — peinture (lumière naturelle valorisée)
- 12:00-13:00 — pause
- 13:00-17:00 — peinture, séances avec modèle (portrait), fresque sur chantier
- 17:00-19:00 — nettoyage des outils, préparation des panneaux pour le lendemain
- 19:00-21:00 — étude (modèles iconographiques, recettes de pigments, correspondance)

**Signatures de PNJ archétypaux** :
- **Le peintre d'enseignes** — métier urbain commun, paye-en-nature, mains tachées
- **Le portraitiste de cour** — habit soigné, voix posée, sait lire les commanditaires
- **Le fresquiste itinérant** — chantier en chantier, échafaudages, voyage avec apprentis
- **L'enlumineur monastique** — moine ou nonne dans un scriptorium, métier méditatif
- **Le Maître d'Astravia** — œuvres dans 4 nations, on vient le consulter de loin

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Maître Calianor de Galenor, fresquiste de la cathédrale de [[Foedus Animae]]* (cf. citation d'ouverture)
- *Dame Iselie d'Astravia* — portraitiste de 3 rois successifs, 4 ères Concordées
- *Frère Vethell le Patient* — enlumineur monastique, 47 ans pour un tome, signature inégalée

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Pigment]] · [[Teinturier]] · [[Tisserand]] · [[Menuisier]] · [[Maçon]] · [[Sculpteur]] · [[Calligraphe]] · [[Cartographe]] · [[Acteur]] · [[Architecte]]*
