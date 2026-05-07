---
tags: [métier, archétype, exploration, vivacité, acuité]
type: archetype
category: Métier
catégorie_métier: Exploration
stat_principale: Vivacité
stats_secondaires: [Acuité, Vigueur, Endurance, Mémoire]
craft_category: -
sources_ressources_accessibles: [Os, Cuir, Peau, Fourrure, Plume, Écaille, Carapace, Corne, Griffe, Œil, Cœur de creature, Sang, Venin, Larme, Sécrétion, Graisse animale]
stations_principales: [Camp de chasse, Affût, Piège lourd, Tente de dépeçage, Foyer de boucan]
outils_principaux: [Arc lourd, Arbalète, Lance, Épieu de chasse, Couteau de dépeçage, Pièges divers, Cor de chasse, Appeau]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
biomes_associés: [Tempéré, Forêt, Taïga, Toundra, Tropical, Savanne, Montagne, Désert de sable, Volcanique, Mystique]
métiers_complémentaires: [Dresseur, Dépéceur, Boucher, Apothicaire, Tanneur, Cartographe]
era_modulation: true
status: drafted
last_review: 2026-05-01
---

# 🏹 Chasseur de créature — Archétype Métier

> *"On ne tue pas pour tuer. On tue pour le cuir, la corne, le venin. Et parfois pour la prime."*

---

## 1. Vue d'ensemble

Le **Chasseur de créature** est le **prédateur professionnel** d'Hybelior. Sa cible : le **bestiaire** non-humain. Son gain : **loot rare**, **contrats** (extermination, tête mise à prix sur monstre, fourniture régulière de matières), **gloire**. C'est l'un des **trois "chasseurs"** d'Hybelior — frontières strictes :

> [!important] Trois chasseurs distincts
> - **Chasseur de créature** *(ce fichier)* — cible = **créatures du bestiaire**, gain = loot/contrats sur monstres
> - **[[Chasseur de trésors]]** — cible = **reliques, ruines, butins enfouis**, gain = trésors et lore
> - **[[Chasseur de primes]]** — cible = **personnes** (PNJ ou joueurs karma rouge), gain = bounty

Le Chasseur de créature recoupe partiellement le **Dépéceur** (qui dépèce sur place) — beaucoup de chasseurs maîtrisent les deux compétences à un palier minimal, mais un Chasseur professionnel **vend la carcasse entière** ou les pièces clés (cœur, venin), laissant souvent le dépeçage fin à un partenaire spécialisé. Distinct du [[Dresseur]] (qui prend vivant) et de l'[[Eleveur de créature]] (qui élève en captivité).

Hybelior connaît trois traditions principales : le **chasseur des plaines** (Onara, Galenor — arc, cor, meute de chiens), le **traqueur des forêts** (Trinoria — flèches, embuscades), et le **tueur de monstres** ([[Drakora]], frontières du [[No man's land]] — armes lourdes, contrats officiels).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Vivacité** — réaction, esquive, frappes rapides, corps-à-corps mobile
- **Stats secondaires** : **Acuité** (pistage, lecture des traces, viser, critiques), **Vigueur** (frapper assez fort pour percer la peau d'un monstre), **Endurance** (longues traques sur plusieurs jours), **Mémoire** (apprendre les comportements et points faibles de chaque espèce — cf. [[Bestiary/Index]])
- **Maîtrises** :
  - `Maîtrise_Pistage` — détection et suivi de traces
  - `Maîtrise_Chasse` — abattage efficace, exploitation des points faibles
  - Maîtrise d'arme dédiée (arc, arbalète, lance, épieu) — voir [[Armes et Maîtrise]]
  - `Maîtrise_Dépeçage` (option, montée par usage)

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2.

---

## 3. Sources de ressources & compétences

**Consomme** :
- **Munitions** (flèches, carreaux) — [[Forgeron]], [[Menuisier]]
- **Pièges** — [[Forgeron]], [[Menuisier]]
- **Appâts, leurres, appeaux** — auto-produits ou [[Apothicaire]]
- **Carte de chasse** — [[Cartographe]]

**Produit (Source 2 Créature, dépeçage primaire)** :
- **Cuir, Peau, Fourrure** (basiques massifs)
- **Os, Plume, Écaille, Carapace, Corne, Griffe** (selon espèce)
- **Œil, Cœur de creature, Sang, Venin, Larme, Sécrétion** (composants alchimiques recherchés)
- **Graisse animale** — cuisson, lubrification

→ Référence [[Sources de Ressources]] §Source 2 Créature et §Mapping créature ↔ ressource. Loot tables Phase 2 [[Bestiary/Index]].

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Camp de chasse** | Bivouac mobile | Novice |
| **Affût** | Poste fixe d'attente | Novice |
| **Piège lourd** | Capture / abattage à distance | Initié |
| **Tente de dépeçage** | Travail post-abattage | Initié |
| **Foyer de boucan** | Conservation viande, peaux | Adepte |
| **Embuscade fortifiée** | Chasse au gros (ours, dragons mineurs) | Expert |

**Outils principaux** : arc lourd, arbalète, lance, épieu de chasse, couteau de dépeçage, pièges (à mâchoires, à fosse, à filet), cor de chasse, appeaux par espèce, lampes pour traques nocturnes, sels de conservation.

→ Référence [[Crafts]] §Stations.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Petit gibier (lapin, perdrix, sanglier juvénile), traque sur 1 km, taux d'abattage 60% |
| **Initié** | Gibier moyen (cerf, sanglier, loup solitaire), pistage 5 km, embuscades simples |
| **Adepte** | Gros gibier (ours, élan, meutes coordonnées), traques sur plusieurs jours, contrats privés |
| **Expert** | Créatures rares (panthère, aurochs, premières créatures cosmiques), contrats publics rémunérés |
| **Maître** | **Condition cachée 🔒** — Chasse de créatures **mythiques** (cf. [[Bestiary/Index]] tier élevé), contrats internationaux, capacité de chasse de **boss mondiaux** rares (cf. [[Exploration]] §Événements) |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle]] 1 semaine, −15% précision et pistage.

---

## 6. Activités/Récoltes débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Lapin · Perdrix · Sanglier juvénile · Renard · Cuir commun |
| **Initié** | Cerf · Loup solitaire · Élan · Faucon · Cuir robuste · Plumes de chasse |
| **Adepte** | Ours · Meute de loups · Sanglier-roi · Cerf-fantôme ([[Onara - Continent|Onara]]) · Carapace de scolopendre · Venin de serpent royal |
| **Expert** | Panthère · Aurochs · Tigre de [[Ilthara - Continent|Ilthara]] · Phénix juvénile ([[Cendara - Continent|Cendara]]) · Cœur de leviathan · Larme de licorne |
| **Maître** | Dragon mineur ([[Drakora]]) · Léviathan ([[Azoria - Continent|Azoria]]) · Variant post-[[Le Souffle]] · Boss mondial rare · Créature cosmique abattue (avec [[Le Lien]]) |

→ Loot tables individuelles : Phase 2 Bestiaire Generator.

---

## 7. Carrière et débouchés

- **Démarrage** : guide de chasse pour seigneurs, abattage de nuisibles agricoles
- **Progression** : contrats privés (fourniture de cuir/cornes à un [[Tanneur]] / [[Forgeron]]), inscription à une **Guilde des Chasseurs**
- **Établissement** : pas de lieu fixe — base éventuelle dans une ville-frontière. Beaucoup d'**aventuriers** issus de ce métier
- **Réseau** : [[Tanneur]] / [[Boucher]] (clients de matières), [[Apothicaire]] / [[Alchimiste]] (composants alchimiques), [[Forgeron]] (armes, pièges), [[Cartographe]] (cartes de chasse), [[Marchand]] (export)
- **Faction** : Guildes des Chasseurs ([[Trinoria]], [[Galenor - Continent|Galenor]]), Tueurs de Monstres ([[Drakora]] — chasse aux dragons), Confréries silencieuses ([[Onara - Continent|Onara]] — Chasseurs de la Glace)
- **Note PvP** : un Chasseur de créature ne tue pas de joueurs — karma vert. S'il devait être attaqué, il a la stamina et l'arsenal pour se défendre. **Distinct du [[Chasseur de primes]]** qui chasse des humains.

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères\|Verdoiement]] (Terranu)** | +30% gibier, prix bas (saturation) |
| **Ère [[Les Ères\|Sommeil de Glace]] (Climata)** | Gibier rare, traques longues, prix x1.5 |
| **Ère [[Les Ères\|Brume Mortelle]]** | Variants morbides : très dangereux mais très rentables |
| **Post-[[Le Souffle]]** | **Variants** apparaissent — pic d'activité, primes spéciales |
| **[[L'Accord]] ≥ 75%** | Chasse aux créatures cosmiques débloquée |
| **Religion [[Foedus Animae]]** | Conflit moral — certains [[Foedus Animae]] refusent de chasser ; d'autres chassent rituellement |
| **Migration saisonnière** ([[Exploration]] §Événements) | Pic de chasse de masse |
| **Boss mondial** ([[Exploration]] §Événements) | Contrat exceptionnel, récompense unique |
| **Continent [[Drakora]]** | Spécialisation chasse aux dragons (école nationale) |

---

## 9. Économie

**Gold sinks générés** :
- Munitions (flèches, carreaux) : 1-10 Éclats / unité
- Pièges : 50-500 Éclats / piège (réparation/re-pose)
- Carte de chasse : 200-1 000 Éclats
- Réparation arc/arbalète : 50-500 Éclats
- Taxe HV sur trophées : 5% (voir [[Économie]])

**Prix indicatifs** :
- Cuir commun : 5-20 Éclats / pièce
- Cuir d'ours : 200-500 Éclats
- Corne de cerf : 50-200 Éclats
- Cœur de creature rare : 1 000-10 000 Éclats
- Larme de licorne : 50 000+ Éclats
- Contrat extermination meute (privé) : 500-5 000 Éclats
- Contrat tête mise à prix (boss mondial) : 100 000+ Éclats

**Chaîne économique** :
```
Chasseur de créature ─→ [[Boucher]] / [[Tanneur]] (Cuir, Viande)
                    ─→ [[Apothicaire]] / [[Alchimiste]] (Cœur, Sang, Venin)
                    ─→ [[Forgeron]] (Os, Corne, Écaille → équipement)
                    ─→ [[Marchand]] (Export trophées)
                    ─→ Guilde / Faction / Seigneur (Contrats)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]].*

**Cycle quotidien typique** (en mission) :
- 03:00-05:00 traque pré-aube (gibier crépusculaire)
- 05:00-10:00 — chasse principale (animation `viser`, `tirer`, `pister`)
- 10:00-14:00 — dépeçage primaire, conservation
- 14:00-18:00 — nouvelle traque ou retour camp
- 18:00-22:00 — boucan, repas, entretien armes
- En ville : vente, recharge munitions, contrats

**Signatures de PNJ archétypaux** :
- **Le chasseur-meute** — accompagné de chiens dressés, cor au cou
- **La traqueuse silencieuse** — arc seul, peintures sombres, [[Trinoria]]
- **Le tueur de dragons** — armures lourdes, lance enchantée, [[Drakora]]
- **Le chasseur-rituel** — [[Foedus Animae]], bénédiction de chaque proie
- **Le contractor moderne** — guilde organisée, devis, factures

**PNJ célèbres** *(Phase 4)* :
- *Karim de [[Trinoria]]* — Maître chasseur, "L'Œil des Bois"
- *Vorgan le Tueur* — Chasseur de dragons légendaire de [[Drakora]]
- *Sœur Aëlia* — [[Foedus Animae]], chasseresse rituelle de [[Ilthara - Continent|Ilthara]]

---

*Liens : [[Métiers]] · [[Personnage]] · [[Combat]] · [[Bestiary/Index]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Exploration]] · [[Chasseur de trésors]] · [[Chasseur de primes]] · [[Dresseur]] · [[Tanneur]] · [[Boucher]] · [[Apothicaire]] · [[Forgeron]]*
