---
tags: [métier, archétype, agriculture-élevage, verbe, acuité]
type: archetype
category: Métier
catégorie_métier: Agriculture et élevage
stat_principale: Verbe
stats_secondaires: [Acuité, Mémoire, Endurance, Présence]
craft_category: 9 — Récolte et transformation primaire
sources_ressources_accessibles: [Œuf, Lait, Laine creature, Cuir, Sécrétion, Cœur de creature, Sang, Plume, Fourrure]
stations_principales: [Étable, Volière, Enclos, Couvoir, Mangeoire spécialisée, Pâturage clôturé]
outils_principaux: [Lasso, Licol, Aiguillon, Sifflet de dressage, Grille de tri génétique, Carnet de lignée]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Berger, Dresseur de créature, Boucher, Cuir-tanneur, Cuisinier, Apothicaire]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-playtest, branche-créatures-rares-post-Souffle]
---

# 🐎 Éleveur de créature — Archétype Métier

> [!info] Entité tutélaire canonique
> **[[Cosmologie|Mythanos]]** (Céleste — *Éleveur de créatures mythiques*, cultivateur de légendes vivantes). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Distincte de **[[Cosmologie|Mythica]]** (Céleste vétérinaire, cf. métier [[Médecin]]/[[Apothicaire]]). Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *"Ce qui marche, ce qui rampe, ce qui vole — je connais leur rythme. Et eux connaissent ma voix."*

---

## 1. Vue d'ensemble

L'**Éleveur de créature** sélectionne, reproduit et élève le bétail, les **montures** et les **créatures rares** d'Hybelior. Métier de **patience et de lignées** — un éleveur célèbre est connu pour la souche qu'il maintient sur 3-5 générations. Il se distingue du [[Berger]] (garde au quotidien, troupeaux mobiles) par son **focus reproduction et sélection** ; et du [[Dresseur de créature]] (apprivoisement de spécimens sauvages adultes) par son travail **dès la naissance**. Branche fortement [[Bestiary/Index|Bestiaire]] : **équidés** (cavalerie, courrier), **bovidés** (lait, viande, traction), **aviens** (œufs, plumes, courrier rapide), **créatures rares post-[[Le Souffle|Souffle]]** (montures variants, créatures cosmiques apprivoisables).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Verbe** — communication animale, commandes, rapport de confiance
- **Stats secondaires** : **Acuité** (lecture du comportement, détection maladie/portée), **Mémoire** (lignées, registres), **Endurance** (journées longues), **Présence** (autorité naturelle sur les créatures dominantes)
- **Maîtrise contextuelle** : `Maîtrise_Élevage` — montée par cycle de reproduction réussi. Sous-spécialités : `Maîtrise_Élevage_Équidés`, `Maîtrise_Élevage_Bovidés`, `Maîtrise_Élevage_Aviens`, `Maîtrise_Élevage_Rares` (post-[[Le Souffle]]).

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** :
- **Céréale, Son, Foin** (intrants alimentaires, métiers amont [[Agriculteur]] et [[Meunier]])
- **Liquide** (eau de boisson)
- **Plante / Herbe** ([[Herboriste]] / [[Botaniste]] : phytothérapie animale)

**Produit** :
- **Œuf** (Source 2 Créature) — alimentation, alchimie, [[Cuisine]]
- **Lait** (Source 2 Créature) — [[Cuisinier|Fromager]], [[Cuisinier]]
- **Laine creature** — [[Tisserand]]
- **Cuir / Peau / Fourrure** (à la mort, abattage par [[Boucher]])
- **Sécrétion / Sang / Cœur de creature** (rares, alchimie haut tier — [[Alchimiste]])
- **Animaux vivants** : montures, animaux de trait, créatures de combat, créatures de compagnie

→ Référence [[Sources de Ressources]] §Source 2 Créature et §Bestiaire.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Étable** | Logement bovidés, équidés | Novice |
| **Volière** | Aviens, créatures volantes | Initié |
| **Enclos extérieur** | Bétail au pâturage clôturé | Novice |
| **Couvoir / Maternité** | Naissances, premières semaines | Initié |
| **Mangeoire spécialisée** | Régimes alimentaires différenciés | Adepte |
| **Pâturage clôturé** | Gros bétail, chevaux | Novice |
| **Salle de reproduction** | Sélection croisements | Adepte |
| **Carnet de lignée (livre)** | Registre généalogique | Initié |

→ Référence [[Crafts]] §Catégorie 9. Pas de mini-jeu de craft classique : **mini-jeu de gestion temporelle et d'observation**.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Élevage de base d'1 espèce commune (poule, chèvre), taux de mortalité jeunes ~25% |
| **Initié** | 2-3 espèces, sélection des meilleures portées, taux mortalité ~12%, premiers traits hérités |
| **Adepte** | Croisements simples, lignées stables, montures de qualité Façonné, mortalité ~5% |
| **Expert** | Lignées signées (ex. "cheval d'Aldraan"), traits exceptionnels (vitesse, endurance, couleur), créatures rares apprivoisables |
| **Maître** | **Condition cachée 🔒** — Élevage de **créatures rares post-Souffle** (variants d'ère), création d'une lignée nommée historique (Héritage [[L'Accord]]) |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle|Souffle]] 1 semaine : -15% chance de réussite des portées.

---

## 6. Crafts/recettes débloqués

> Note : "recettes" = plans de croisement et préparations alimentaires spécialisées.

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Élevage poule pondeuse · Élevage chèvre laitière · Mangeoire de base |
| **Initié** | Élevage canard · Croisement vache laitière + viande · Régime hivernal · Couvoir tempéré |
| **Adepte** | Cheval de selle (Façonné) · Bœuf de trait · Faucon de chasse · Régime "haute lactation" · Lignée stabilisée |
| **Expert** | Cheval de course (Œuvré+) · Chien de garde de race · Aigle messager · Bovin de prestige · Créature rare ([[Bestiary/Index|cervidé d'ère]]) |
| **Maître** | Monture variant post-[[Le Souffle|Souffle]] · Lignée Concordée · Créature cosmique apprivoisable (cf. [[Le Lien]]) · Cheval éclair (signature) |

---

## 7. Carrière et débouchés

- **Démarrage** : valet d'écurie, vacher rural — apprendre à reconnaître les chaleurs, les portées, les maladies
- **Progression** : reprise d'élevage familial OU contrat avec une noblesse / une guilde marchande pour fournir des montures
- **Établissement** : ferme isolée (besoin pâturage), proche d'une route pour la vente, ou domaine seigneurial
- **Réseau** : [[Berger]] (garde quotidienne), [[Boucher]] (abattage), [[Marchand]] (export montures), [[Apothicaire]] (santé animale)
- **Faction** : Guilde des Élevages (Galenor), Cavaliers du Vent (Aerion), Maisons aristocratiques équestres
- **Branche post-[[Le Souffle|Souffle]]** : éleveurs spécialisés en **créatures rares** apparues lors d'une ère — rares, recherchés, prix d'or

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 1 — Agriculture et élevage). Ces rôles correspondent à des **paliers Maître+** absorbés du legacy AccessExport.

#### Sous-spécialisation Maître+ : Maître des créatures magiques

> Source canonique : `Role.csv` (cat 1, role n°1).

- **Description** : éleveur d'élite spécialisé dans la reproduction et l'apprivoisement de **créatures cosmiques / variants post-[[Le Souffle|Souffle]]** (cf. §6 — créature cosmique apprivoisable, [[Le Lien]]).
- **Conditions** : palier Maître + 1 lignée Concordée stabilisée + apprivoisement réussi d'au moins 1 créature post-Souffle marquée par une Ère + 🔒 condition cachée (pacte [[Foedus Animae]] OU découverte d'une Trace [[Traces des Ères]] liée au Bestiaire).
- **Notes** : titre rarissime (~1 par grand pays), tend à graviter autour des Maisons aristocratiques équestres et des Cavaliers du Vent. Frontière potentielle avec [[Dresseur de créature]] (apprivoisement) et [[Mage]] (lien magique).

#### Sous-spécialisation Maître+ : Maître éleveur

> Source canonique : `Role.csv` (cat 1, role n°3).

- **Description** : titre générique du palier Maître pour l'Éleveur de créature — reconnaissance d'une lignée signature stabilisée et reproductible.
- **Conditions** : palier Maître + ≥ 5 ans cumulés en activité + 1 lignée signée déposée (Héritage permanent, [[L'Accord]] ≥ 75%).
- **Notes** : équivalent du « Forgeron-Maître reconnu » côté élevage — donne accès aux commandes nobles et aux festivals d'élevage.

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | +30% fertilité, naissances abondantes, herbe nutritive |
| **Ère [[Les Ères|Sommeil de Glace]] (Aquor)** | -25% naissances, mortalité jeunes +15%, focus animaux résistants |
| **Ère [[Les Ères|Vents]] (Aerion)** | Aviens +30% performance, lignées de courrier ailé |
| **Ère [[Les Ères|Brume Mortelle]]** | Variants morbides apparaissent — opportunité éleveurs experts |
| **Post-[[Le Souffle]]** | **Variants** dans les portées : rare chance de naissance "marquée par l'Ère" (créature rare) |
| **[[L'Accord]] ≥ 75%** | Lignées signées débloquables (Héritage permanent) |
| **Religion [[Foedus Animae]]** | Pacte avec créatures intelligentes (chevaux marqués) |
| **Faction Cavaliers du Vent** | Recettes exclusives de croisement aviens |

---

## 9. Économie

**Gold sinks générés** :
- Entretien étable / volière : 100 Éclats / mois / animal moyen
- Vétérinaire / [[Apothicaire]] : 50-500 Éclats par soin
- Saillie d'étalon de prestige : 1 000-5 000 Éclats
- Achat lignée importée : 10 000+ Éclats
- Taxe HV sur monture rare : 5% (voir [[Économie]])

**Prix indicatifs** :
- Poule : 5 Éclats · Chèvre : 50 Éclats
- Cheval de selle Façonné : 500-1 500 Éclats
- Cheval Œuvré (race) : 5 000-15 000 Éclats
- Monture variant post-Souffle : 50 000+ Éclats
- Lait : 1 Éclat / pinte · Œuf : 0.5 Éclat / pièce
- Laine creature : 10 Éclats / kg

**Chaîne économique** :
```
[[Agriculteur]] (Céréale) → Éleveur → Animaux vivants (Marchand)
                                    → [[Boucher]] (Viande, Cuir)
                                    → [[Tisserand]] (Laine)
                                    → [[Cuisinier]] (Lait, Œuf)
                                    → [[Apothicaire]] / [[Alchimiste]] (composants rares)
```

---

## 10. Comportement IA / signatures PNJ

**Cycle quotidien typique** :
- 05:00 lever — traite, ouverture étables
- 06:00-09:00 — soins, alimentation, observation portées
- 09:00-12:00 — sortie au pâturage, dressage de base
- 12:00-13:00 pause
- 13:00-17:00 — entretien enclos, suivi reproduction, registre
- 17:00-19:00 — rentrée du bétail, dernier nourrissage
- 20:00-22:00 dîner / loisir / coucher

**Signatures de PNJ archétypaux** :
- **L'éleveur-patriarche** — connaît chaque bête par son nom, lignée tenue depuis 4 générations
- **La cavalière des plaines** — élève des chevaux légers, [[Aerion]], voyageuse
- **L'éleveur-sorcier** — soupçonné de pacte (créatures rares post-Souffle), proche [[Foedus Animae]]
- **Le veuf aux poules** — petite échelle, économie locale, hub de rumeurs

**PNJ célèbres** *(Phase 4)* :
- *Master Yorwen d'Aldraan* — chevaux de course de prestige international
- *Vespera la Cosmique* — éleveuse de créatures variants post-Souffle, controversée

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Bestiary/Index]] · [[Berger]] · [[Boucher]] · [[Apothicaire]] · [[Marchand]] · [[Le Lien]]*
