---
tags: [métier, archétype, exploration, acuité, mémoire]
type: archetype
category: Métier
catégorie_métier: Exploration
stat_principale: Acuité
stats_secondaires: [Mémoire, Endurance, Verbe, Vivacité]
craft_category: -
sources_ressources_accessibles: [-]
stations_principales: [Pont de navire, Cabine de navigation, Vigie / Nid de pie, Quai d'embarquement, Phare côtier, Plate-forme de dirigeable (Phase 4)]
outils_principaux: [Astrolabe, Sextant, Compas magnétique, Cartes marines, Sondeur de profondeur, Sablier, Octant, Loch (mesure de vitesse)]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
biomes_associés: [Maritime, Côtes, Océans, Lacs, Estuaires, Aérien (Phase 4)]
métiers_complémentaires: [Cartographe, Astronome, Explorateur, Marchand, Pêcheur, Capitaine, Charpentier de marine]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [navigation-aérienne-Phase-4]
---

# ⛵ Navigateur — Archétype Métier

> [!info] Entités tutélaires canoniques
> **[[Cosmologie|Navigor]]** (Éternel — *Passeur de mondes*, facilitateur entre les mondes) et **[[Cosmologie|Asterion]]** (Céleste — *Cartographe céleste*) pour la navigation par les étoiles. Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *"L'étoile dit où je suis. Le vent dit où je vais. La mer décide quand."*

---

## 1. Vue d'ensemble

Le **Navigateur** est l'**orienteur des grandes étendues**. Il pilote (ou seconde le pilote / capitaine) des **bateaux** sur mers, océans, fleuves, lacs ; il **trace la route**, **lit les étoiles**, **calcule la dérive**, **anticipe les courants et les vents**. Métier d'**astronomie pratique** — voir [[Astronome]], métier sœur, plus théorique. Le Navigateur calcule, l'Astronome prédit ; le Navigateur agit, l'Astronome conseille.

Hybelior, monde insulaire et continental, dépend lourdement de la navigation maritime : 13 continents, **archipels** ([[Cendara - Continent|Cendara]], [[Ulinor - Continent|Ulinor]]), **mers intérieures**, **routes commerciales** entre **Solena** ("Âge des Grandes Explorations"), **Tyndara** ("Ligue des Marchands"), **Haldria** ("Navigation astrale — Traversée des Brumes"). Sans Navigateur compétent, pas de commerce inter-continental, pas d'expédition océanique, pas de découverte des **Cités des Anciens** englouties d'[[Azoria - Continent|Azoria]].

> [!note] Navigation aérienne (Phase 4)
> Le frontmatter prévoit l'extension future à la **navigation aérienne** : pilotage de **dirigeables** (cf. [[Exploration]] §Locomotion §Dirigeable), de **montures aériennes** (Aerion / [[Onara - Continent|Onara]]), et potentiellement d'**îles volantes** ([[Astravia]]). Cette branche s'ouvrira lorsque les ères et le contenu aérien seront pleinement intégrés. Pour l'instant, l'archétype reste **maritime-dominant**.

Distinct du [[Pêcheur]] (qui exploite la mer mais ne la traverse pas longuement). Distinct de l'[[Explorateur]] (qui ouvre la zone à pied — branche cousine, échanges techniques d'orientation). Distinct du [[Cartographe]] (synthèse documentaire — le Navigateur est producteur de relevés maritimes pour le Cartographe, qui les traduit en **cartes des mers**).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Acuité** — précision du tracé, lecture des instruments, observation du ciel et de la mer
- **Stats secondaires** : **Mémoire** (cartes mentales des routes, étoiles, cycles, lore maritime), **Endurance** (longues veilles, traversées de plusieurs semaines), **Verbe** (commande à l'équipage, négociation portuaire), **Vivacité** (réagir à une tempête, à un récif soudain)
- **Maîtrises** :
  - `Maîtrise_Navigation_Maritime`
  - `Maîtrise_Astronomie_Pratique` (recoupe partiellement [[Astronome]])
  - `Maîtrise_Météorologie_Marine` — lire le vent, les nuages, la houle
  - `Maîtrise_Cartographie_Maritime` (recoupe [[Cartographe]])
  - `Maîtrise_Navigation_Aérienne` (Phase 4)

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2.

---

## 3. Sources de ressources & compétences

**Consomme** :
- **Cartes marines** ([[Cartographe]])
- **Instruments** (astrolabe, sextant, compas — [[Forgeron]] / [[Bijoutier]] / [[Verrier]] pour les lentilles)
- **Bois marin et voiles** ([[Charpentier]] / [[Tisserand]])
- **Provisions de mer** ([[Cuisinier]] / [[Pêcheur]] : poisson séché, biscuit de mer)
- **Tables astronomiques** ([[Astronome]])

**Produit (sortie principale)** :
- **Routes maritimes tracées** (relevés vendus à [[Cartographe]] et [[Marchand]])
- **Pilotage** (service rendu à un capitaine, un marchand, une faction)
- **Découverte de routes nouvelles** (très prisée — recoupe [[Explorateur]])
- **Lore maritime** (ports inconnus, courants invisibles, légendes — vendu à [[Bibliothécaire]])

→ Référence [[Sources de Ressources]] (consommation aval — pas extracteur direct).

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Pont de navire** | Pilotage actif | Novice |
| **Cabine de navigation** | Calcul de route, instruments | Initié |
| **Vigie / Nid de pie** | Observation longue distance | Novice |
| **Quai d'embarquement** | Préparation, chargement | Novice |
| **Phare côtier** | Signal, repérage des côtes (statique) | Initié |
| **Plate-forme de dirigeable** *(Phase 4)* | Navigation aérienne | Expert (futur) |

**Outils principaux** : astrolabe, sextant, compas magnétique, cartes marines, sondeur de profondeur (corde lestée + suif), sablier (mesure de temps), octant, loch (mesure de vitesse), longue-vue, cor de brume, fanal de signalisation.

→ Référence [[Crafts]] §Stations.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Navigation côtière (rester en vue de la côte), erreur de route ~25% |
| **Initié** | Navigation hauturière courte (24-72h hors de vue), instruments basiques, erreur ~12% |
| **Adepte** | Traversée régionale (1-2 semaines de mer), navigation astronomique, lecture des courants |
| **Expert** | Traversée transcontinentale, navigation par tempête, **première mondiale** sur route inconnue |
| **Maître** | **Condition cachée 🔒** — Traversée des **Brumes de Haldria**, navigation par "instinct cosmique" (post-[[Le Souffle]]), capacité à atteindre [[Azoria - Continent|Azoria]] et [[Baelor - Continent|Baelor]], **Phase 4** : navigation aérienne avancée |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle]] 1 semaine, −15% précision et lecture instruments.

---

## 6. Activités/Récoltes débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Pilotage barque côtière · Navigation lacustre · Cabotage local |
| **Initié** | Traversée d'un détroit · Pilotage caboteur · Cargaison régionale |
| **Adepte** | Traversée d'une mer intérieure · Première carte de courants régionale · Convoi commercial international |
| **Expert** | Traversée transcontinentale (Solena → Tyndara) · Découverte d'une île non-cartée · Pilotage de tempête |
| **Maître** | Traversée des Brumes ([[Haldria]]) · Atteinte de [[Baelor - Continent|Baelor]] · Navigation cosmique post-Souffle · *(Phase 4)* Pilotage de dirigeable transcontinental |

→ Routes individuelles : Phase 2.

---

## 7. Carrière et débouchés

- **Démarrage** : matelot, mousse, apprenti pilote
- **Progression** : second du capitaine, puis Navigateur reconnu d'une compagnie marchande ou d'une marine d'État
- **Établissement** : pas de lieu fixe — basé sur un **navire** ou un **port d'attache**. Beaucoup à **Solena** (port libre, exploration), **Tyndara** (commerce), **Haldria** (Traversée des Brumes — mystique)
- **Réseau** : [[Cartographe]] (échange de relevés/cartes), [[Astronome]] (consultations), [[Pêcheur]] (informations locales), [[Marchand]] (employeur principal), [[Charpentier]] (réparations navire), [[Capitaine]] (supérieur direct)
- **Faction** : Ligue des Marchands ([[Tyndara]]), Société d'Exploration ([[Solena]]), Ordre des Voiles, Marines royales (Galenor, Onara), Confrérie de la Brume ([[Haldria]])

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères\|Vents]] (Aerion)** | +30% vitesse maritime, navigation aérienne facilitée (Phase 4) |
| **Ère [[Les Ères\|Verdoiement]] (Terranu)** | Mers calmes, vents stables, +15% sécurité |
| **Ère [[Les Ères\|Sommeil de Glace]] (Climata)** | Routes nordiques bloquées par les glaces, ouverture de routes spéciales |
| **Ère [[Les Ères\|Brume Mortelle]]** | Brouillards permanents, navigation à l'instinct, danger accru |
| **Post-[[Le Souffle]]** | Routes maritimes altérées (courants modifiés, îles déplacées) — pic d'activité |
| **[[L'Accord]] ≥ 75%** | Navigation cosmique débloquée (atteindre [[Baelor - Continent|Baelor]], [[Azoria - Continent|Azoria]]) |
| **Religion [[Rota Mundi]]** | Calage cyclique (équinoxes, marées) maîtrisé |
| **Phénomène météo extrême** ([[Exploration]]) | Risque mortel, mais opportunité de raccourci ou découverte |
| **Migration de créatures marines** | Risque (krakens, léviathans) ou ressource (suivre la migration) |

---

## 9. Économie

**Gold sinks générés** :
- Instruments (astrolabe, sextant, compas) : 500-5 000 Éclats / set
- Cartes marines à jour : 200-2 000 Éclats
- Réparations navire (transmis au [[Charpentier]]) : 1 000-50 000 Éclats / mois en mer
- Provisions de mer : 500-2 000 Éclats / mois d'équipage
- Salaire équipage (transmis depuis le capitaine) : 5-50 Éclats / jour / matelot
- Taxe portuaire / douane : 2-10% de la valeur du chargement (voir [[Économie]] §Catégorie 4)
- Taxe HV sur cartes maritimes : 5%

**Prix indicatifs (services de Navigateur)** :
- Pilotage côtier (1 jour) : 20-100 Éclats
- Pilotage régional (1 semaine) : 200-1 000 Éclats
- Pilotage transcontinental : 2 000-10 000 Éclats
- Navigateur Maître pour expédition extrême (Brumes, Azoria) : 50 000+ Éclats
- Vente de relevé maritime : 100-3 000 Éclats / route

**Chaîne économique** :
```
Navigateur ─→ [[Cartographe]] (Cartes maritimes)
          ─→ [[Marchand]] / [[Capitaine]] (employeurs directs)
          ─→ [[Bibliothécaire]] / [[Historien]] (lore maritime)
          ─→ Joueur direct (pilotage, escorte navale)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché.*

**Cycle quotidien typique (en mer)** :
- 04:00 — relève de quart, observation étoiles avant l'aube
- 05:00-12:00 — pilotage / calcul de position (animation `regarder_astrolabe`, `tenir_barre`, `consulter_carte`)
- 12:00 — relève point midi (mesure soleil)
- 12:00-13:00 — repas, pause
- 13:00-19:00 — navigation continue, observation météo
- 19:00-21:00 — repas, journal de bord, calcul du lendemain
- 21:00-04:00 — quart de nuit (alternance avec second)

**Signatures de PNJ archétypaux** :
- **Le vieux loup de mer** — barbe sel et poivre, pipe, pull marin, vocabulaire dédié
- **La navigatrice astronome** — Lumasar / Solena, méthodique, journal de bord exemplaire
- **Le pilote des Brumes** ([[Haldria]]) — silencieux, tatouages spirituels, intuition Lien
- **Le navigateur-marchand** — sait à la fois piloter et négocier, [[Tyndara]]
- **Le pilote de dirigeable** *(Phase 4)* — moderne, instruments avancés

**PNJ célèbres** *(Phase 4)* :
- *Captaine Aldros de Solena* — premier à avoir navigué jusqu'à [[Azoria - Continent|Azoria]]
- *Mère Veska* — Tyndara, Ligue des Marchands, route commerciale Tyndara-Galenor
- *Frère Ioran* — Haldria, traversée rituelle des Brumes

---

*Liens : [[Métiers]] · [[Personnage]] · [[Exploration]] · [[Géographie]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Cartographe]] · [[Astronome]] · [[Explorateur]] · [[Marchand]] · [[Pêcheur]] · [[Charpentier]]*
