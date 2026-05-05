---
tags: [métier, archétype, érudition, acuité, mémoire, prédiction]
type: archetype
category: Métier
catégorie_métier: Erudition
stat_principale: Acuité
stats_secondaires: [Mémoire, Endurance, Esprit]
craft_category: 8 — Scriptorium et enchantement
sources_ressources_accessibles: [Parchemin, Encre, Cristal de Voie, Verre poli]
stations_principales: [Observatoire, Pupitre de scribe, Atelier cartographique, Cabinet d'étude]
outils_principaux: [Lunette astronomique, Astrolabe, Carte du ciel, Cadran nocturne, Sextant céleste, Almanach, Horloge à pendule]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Bibliothécaire, Historien, Cartographe, Scribe, Oracle, Mathématicien-Chercheur]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-fenêtres-prédiction-playtest]
---

# 🌌 Astronome — Archétype Métier

> [!info] Entités tutélaires canoniques
> **[[Cosmologie|Stellaris]]** (Cosmique — *Danseur des étoiles*, mouvements célestes) et **[[Cosmologie|Asterion]]** (Céleste — *Cartographe céleste*, mappeur des constellations). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *« Les étoiles tournent depuis avant les Éternels. Elles savent. Il ne nous reste qu'à apprendre leur langue. »*
> — **Maître Veylan**, Astronome d'Astravia, dernière entrée connue avant le Souffle d'Umbra

---

## 1. Vue d'ensemble

L'**Astronome** est l'une des **5 disciplines de [[Prédiction]]** d'Hybelior — celle qui prédit le **TIMING** des [[Le Souffle|Souffles]] avec la fiabilité la plus haute (★★★★☆). C'est le métier des **Lecteurs du Ciel** : observation des constellations, calcul des cycles, recoupement avec les archives de l'**Ère des Trois Royaumes**.

L'astronome ne dit pas *quoi* ni *pourquoi* — il dit *quand*. Et dans un monde où le rythme cosmique est la métrique centrale ([[L'Accord]]), savoir *quand* vaut une fortune. Les rois consultent. Les guildes paient. La **Bourse des Augures d'Astravia** (cf. [[Prédiction]] §Bourse) cote leurs prédictions publiques.

Métier **éminemment patrimonial** : un astronome reconnu peut faire inscrire ses observations dans les chroniques mondiales, devenir **personnage historique nommé** (cf. [[Prédiction]] §Postérité).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Acuité** — précision de l'observation, lecture des micro-variations célestes (formule canonique [[Prédiction]] : `Acuité × Maîtrise_Astronomie`)
- **Stats secondaires** :
  - **Mémoire** — recoupement avec les archives de Souffles passés, mémoire des cycles
  - **Endurance** — veilles nocturnes longues (8-12h, ciel dégagé)
  - **Esprit** — pour les méthodes hybrides cosmologie-magie (lecture des [[Stellaris|étoiles cosmiques]])
- **Maîtrise contextuelle** : `Maîtrise_Astronomie` — progresse à chaque observation publiée et à chaque prédiction validée. Sous-spécialités à partir d'Adepte : Cycles planétaires / Constellations / Éclipses / Comètes.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2. Discipline [[Prédiction]] §1 — Astronomie.

---

## 3. Sources de ressources

**Consomme** (faiblement matériel, fortement informationnel) :
- **[[Parchemin]]** et **Encre** (pour cartes du ciel, almanachs, prédictions publiées) — produits par [[Scribe]] / [[Bibliothécaire]]
- **Verre poli** ([[Verrier]]) pour lentilles
- **Cristal de Voie** (rare) pour les instruments alchimiquement augmentés
- **Composants abstraits** : observations, données partagées, fragments d'almanachs anciens

**Produit** :
- **Cartes du ciel** — parchemins consignant constellations à un instant T
- **Almanachs** — compilations annuelles vendues sur les marchés (cf. [[Bibliothécaire]])
- **Prédictions publiques** — fenêtres temporelles de Souffle (`Le prochain Souffle surviendra dans 47 ± 12 jours`)
- **Conseil sur mesure** — prédictions privées vendues à clients (caravanes, guildes, rois)

→ Référence [[Crafts]] §8 — Scriptorium et enchantement. Output documentaire principalement.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Pupitre de scribe** | Consigne d'observations, dessin de cartes | Novice |
| **Observatoire** | Lieu permanent d'observation (toit ouvert, instruments fixes) | Initié |
| **Atelier cartographique** | Synthèse des cartes du ciel | Adepte |
| **Cabinet d'étude** | Croisement avec les archives, calculs | Expert |
| **Observatoire Étoilé d'Astravia** *(POI mondial)* | Carte des constellations permanente, accès Maître+ | Maître |

**Outils signature** :
- **Lunette astronomique** — craft Maître ([[Verrier]] + [[Bijoutier]] + Astronome) — voir [[Prédiction]] §Outils
- **Astrolabe** — calcul des positions, palier Adepte+
- **Astrolabe d'Astravia** — artefact rare, +40% Astronomie (cf. [[Prédiction]])
- **Sextant céleste** — mesures angulaires, Initié+
- **Cadran nocturne** — heure exacte par les étoiles
- **Horloge à pendule** — précision temporelle, Expert+

→ Référence [[Crafts]] §Stations §Pupitre de scribe. POI mondiaux [[Prédiction]] §Lieux dédiés.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Observation des constellations majeures, fenêtre Souffle ±60 jours, fiabilité ★☆☆☆☆ |
| **Initié** | Cycle planétaire suivi sur 1 an, fenêtre ±30 jours, prédictions privées vendables |
| **Adepte** | Croisement avec almanachs anciens, fenêtre ±15 jours, sous-spécialité déclarable |
| **Expert** | Astrolabe d'Astravia maîtrisé, fenêtre ±5 jours, cotation à la Bourse des Augures |
| **Maître** | **Condition cachée 🔒** — Fenêtre ±2 jours, accès au Conseil des Augures (cf. [[Prédiction]]), titre **« Prophète »** possible |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Une couverture nuageuse prolongée peut compromettre des semaines d'observation (limite intrinsèque [[Prédiction]] §Astronomie).

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Identifier les Sept Voyageuses · Lire les phases de la double-lune · Tenir un journal d'observation |
| **Initié** | Carte du ciel saisonnière · Prédiction privée à 30 jours · Vendre un almanach simple |
| **Adepte** | Recoupement avec les calendriers de l'Ère des Trois Royaumes · Carte du ciel signée · Conseil aux caravanes |
| **Expert** | Prédiction de fenêtre fine ±5j · Cotation à la Bourse des Augures · Prédiction d'éclipse double-lune (annonce mondiale) |
| **Maître** | **Œuvre signée** : Almanach perpétuel (Héritage), titre Prophète (3 Souffles successifs prédits avec exactitude), entrée au Conseil des Augures |

→ Cross-réf [[Prédiction]] §Conditions cachées 🔒.

---

## 7. Carrière et débouchés

- **Démarrage** : étudiant à l'Observatoire d'Astravia, ou apprenti d'un astronome de cour. Apprentissage des constellations majeures, copie de cartes anciennes
- **Progression** : observatoire mobile (caravane), publications dans les almanachs
- **Établissement** :
  - **Astronome de cour** (royaume) — conseille le souverain
  - **Astronome de guilde** — prédiction stratégique pour campagnes/sièges
  - **Astronome de cabinet** — collabore avec [[Oracle]], [[Historien]], [[Bibliothécaire]] pour prédictions croisées (cf. [[Prédiction]] §Croisement)
  - **Astronome public** — vit de la Bourse des Augures
- **Réseau** :
  - **Discipline-amont** : [[Bibliothécaire]] (archives), [[Historien]] (calendriers anciens)
  - **Discipline-pair** (croisement [[Prédiction]]) : [[Oracle]], [[Bibliothécaire]], [[Historien]], chasseurs/dresseurs (lecture animale)
  - **Aval** : [[Marchand]] (caravanes), guildes, factions, [[Cartographe]]
- **Faction** : Conseil des Augures d'Astravia · [[Ordo Caelum]] (autorité historique mais en crise depuis le silence de [[Celestia]])

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|des Présages]]** | Astronomie +30% précision, Bourse des Augures suractive |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Constellations modifiées (ombre obscurcit), Astronomie -10% précision mais nouvelles lectures Noctari débloquées |
| **Ère [[Les Ères|Brume Mortelle]]** | -30% observation (couverture permanente) ; recettes alternatives via [[Lecture animale]] |
| **Ère [[Les Ères|Vents]] (Aerion)** | Ciel dégagé permanent +20% précision ; recettes "Carte des Vents Stellaires" |
| **Post-[[Le Souffle]] semaine 1** | Reset des cycles → recalibrage forcé. Astronome bien préparé = +20% Accord rapide |
| **[[L'Accord]] ≥ 75%** | Accès aux prédictions publiques cotées à la Bourse |
| **[[L'Accord]] = 100%** | Œuvre signée : Almanach permanent (Héritage, [[L'Accord]] §Héritage) |
| **Religion [[Ordo Caelum]]** | Bonus traditionnel mais autorité contestée depuis silence de [[Celestia]] |
| **Religion [[Rota Mundi]]** | Lecture cyclique amplifiée, prédictions de retour d'ères analogues |
| **Couverture nuageuse prolongée** | Aucune progression observation, l'astronome doit voyager |

---

## 9. Économie

**Gold sinks générés** :
- Lentilles de [[Verrier]] : 200-2 000 Éclats selon qualité
- Cartes du ciel sur parchemin : 50-500 Éclats / unité (papier de qualité)
- Loyer d'observatoire : 500-5 000 Éclats / mois selon emplacement
- Cotisation Conseil des Augures : 1 000 Éclats / ère (Maître+ uniquement)

**Prix indicatifs** :
- Almanach commun : 10-30 Éclats
- Prédiction privée Initié : 50-200 Éclats
- Prédiction privée Adepte : 500-1 500 Éclats
- Prédiction privée Expert (fenêtre ±5j) : 5 000-20 000 Éclats
- Œuvre signée Maître (Almanach perpétuel) : 50 000+ Éclats, voire échange contre Héritage social

**Bourse des Augures** : revenus variables, voir [[Prédiction]] §Bourse des Augures. Un astronome public reconnu peut tirer 60% de ses revenus de la Bourse.

**Chaîne économique** :
```
Observations + Archives ([[Bibliothécaire]]) → Astronome (Prédiction TIMING)
                                              ↘ Cabinet de Prédiction (croisement [[Oracle]], [[Historien]])
                                              ↘ Bourse des Augures (cotation)
                                              ↘ [[Marchand]] (caravanes, spéculation ressources)
                                              ↘ Roi / Guilde / Faction (conseil stratégique)
```

Cross-réf [[Économie]] : la prédiction est une **marchandise** majeure d'Hybelior.

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 14:00 lever (rythme inversé) — étude des observations de la nuit
- 16:00-19:00 — calculs, mise à jour de l'almanach, courrier aux confrères
- 19:00-21:00 — repas, préparation des instruments
- 21:00-04:00 — observation (cœur du métier)
- 04:00-06:00 — consignation des observations sur parchemin
- 06:00 coucher

**Signatures de PNJ archétypaux** :
- **Le vieux veilleur** — yeux fatigués, dos voûté, mémoire encyclopédique, parle des étoiles comme d'amies
- **L'astronome de cour** — habits sombres brodés d'étoiles, voix posée, dit ce qu'il voit même quand le roi ne veut pas l'entendre
- **L'astronome itinérant** — caravane équipée, va d'observatoire en observatoire, vend ses prédictions en route
- **Le Prophète** — titre rare (cf. [[Prédiction]] §Conditions cachées), entrée au Conseil des Augures, presque mythique

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Maître Veylan d'Astravia* — historique, dernière entrée connue avant le Souffle d'Umbra (cf. citation d'ouverture [[Prédiction]])
- *Dame Solenne, Astronome de la Couronne de Galenor* — conseillère des rois sur 3 ères
- *L'Aveugle de Mosrack* — ironie mythique, prétend lire les étoiles à travers ses paupières closes

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Prédiction]] · [[Cosmologie]] · [[Bibliothécaire]] · [[Historien]] · [[Oracle]] · [[Cartographe]] · [[Scribe]]*
