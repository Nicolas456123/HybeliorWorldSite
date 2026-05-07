---
tags: [métier, archétype, exploration, acuité, mémoire]
type: archetype
category: Métier
catégorie_métier: Exploration
stat_principale: Acuité
stats_secondaires: [Mémoire, Vivacité, Endurance, Esprit]
craft_category: -
sources_ressources_accessibles: [Gemme brut, Gemme taillé, Pièces anciennes, Reliques (catégorie spéciale)]
stations_principales: [Camp d'expédition, Atelier de fouille, Dépôt de tri, Salle de déverrouillage de coffres]
outils_principaux: [Pioche fine, Pelle, Pinceau de fouille, Crochets de serrurier, Lampe à huile, Métronome de pression, Ressort à dégondages, Bandelettes]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
biomes_associés: [Désolation, Désert de sable, Mystique, Volcanique, Souterrain, Montagne, Ruines, Marécages]
métiers_complémentaires: [Explorateur, Cartographe, Bibliothécaire, Historien, Archéologue, Identificateur, Marchand]
era_modulation: true
status: drafted
last_review: 2026-05-01
---

# 💰 Chasseur de trésors — Archétype Métier

> *"Sous chaque ruine, une chambre. Dans chaque chambre, un coffre. Dans chaque coffre, un mystère."*

---

## 1. Vue d'ensemble

Le **Chasseur de trésors** est le **fouilleur de profondeurs** — pas l'or de surface (qu'on prend en passant), mais les **reliques enfouies**, les **coffres cachés**, les **chambres scellées des Anciens**, les ruines des civilisations disparues. Sa cible : **objets manufacturés exceptionnels** (Magistral, Légendaire, Mythique), **pièces d'or de civilisations effondrées**, **lore exclusif** ([[Traces des Ères]]), parfois **artefacts de pouvoir** (avec risques associés).

> [!important] Trois chasseurs distincts
> - **[[Chasseur de créature]]** — cible = créatures, gain = loot/contrats
> - **Chasseur de trésors** *(ce fichier)* — cible = **reliques, ruines, butins enfouis**, gain = trésors et lore
> - **[[Chasseur de primes]]** — cible = personnes (PNJ ou joueurs karma rouge), gain = bounty

Distinct de l'[[Explorateur]] (qui ouvre la zone — premier passage) : le Chasseur de trésors **revient** sur les zones connues pour les fouiller en profondeur. Distinct du [[Mineur]] (qui extrait du minerai brut sans contexte historique) : le Chasseur de trésors fouille **dans le contexte d'une civilisation** ou d'une légende. Distinct du [[Bibliothécaire]] / [[Historien]] : il **récupère matériellement**, eux **interprètent**.

Hybelior offre des terrains de chasse exceptionnels : les **Cités des Anciens** ([[Azoria - Continent|Azoria]], enfouies sous la glace), les **Cités des Sables** ([[Endora - Continent|Endora]], labyrinthes), les **cités perdues** d'Esperia, les **forteresses souterraines** de [[Celethor - Continent|Thalendil]], les ruines sacrées d'[[Ulinor - Continent|Ulinor]], et les **donjons** ([[Exploration]] §Donjons).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Acuité** — détecter les anomalies dans les murs (chambres cachées), lire les indices, désamorcer pièges
- **Stats secondaires** : **Mémoire** (lore des civilisations, identification d'artefacts, langues mortes), **Vivacité** (esquiver les pièges), **Endurance** (longues fouilles), **Esprit** (utile pour les sites magiques — détection arcane)
- **Maîtrises** :
  - `Maîtrise_Fouille` — efficacité de fouille, taux de découverte
  - `Maîtrise_Désarmement_Pièges`
  - `Maîtrise_Crochetage` — coffres et serrures complexes
  - `Maîtrise_Identification` (recoupe [[Bibliothécaire]] / [[Identificateur]])
  - `Maîtrise_Langues_Mortes` (Adepte+)

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2.

---

## 3. Sources de ressources & compétences

**Consomme** :
- **Cartes de ruines** ([[Cartographe]], [[Bibliothécaire]])
- **Outils de fouille** ([[Forgeron]], [[Menuisier]])
- **Lampes à huile, torches** ([[Apothicaire]])
- **Provisions longue durée** ([[Cuisinier]] / [[Boulanger]])
- **Compétences linguistiques** (Adepte+) — étudier auprès d'un [[Bibliothécaire]] / [[Historien]]

**Produit (catégories spéciales)** :
- **Items finis rares** (Magistral à Mythique) — équipements anciens, armes signées
- **Gemmes** (brutes et taillées trouvées en bijoux anciens)
- **Pièces anciennes** (monnaie de civilisations effondrées — convertibles en Éclats avec décote)
- **Reliques** (catégorie d'item à part — pouvoir narratif, parfois maudit)
- **Lore** — pierres gravées, parchemins, vendus au [[Bibliothécaire]] et à l'[[Historien]]

→ Référence [[Sources de Ressources]] (consommation aval). Référence [[Traces des Ères]] (lore).

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Camp d'expédition** | Bivouac longue durée | Novice |
| **Atelier de fouille (sur site)** | Tri, croquis | Initié |
| **Dépôt de tri** (en ville) | Cataloguer la trouvaille | Adepte |
| **Salle de déverrouillage** | Crochetage de coffres complexes | Adepte |
| **Atelier de désamorçage** (mini-jeu) | Pièges récupérés vivants | Expert |

**Outils principaux** : pioche fine, pelle, pinceau de fouille, crochets de serrurier, lampe à huile, métronome de pression (pour pièges sensibles à la masse), ressort à dégondages, bandelettes pour pièges acides, miroir d'angle, sondes magnétiques (Expert+ — détection métal).

→ Référence [[Crafts]] §Stations.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Fouille de ruines de surface, coffres simples, taux de découverte 30% |
| **Initié** | Crochetage avancé, lecture d'indices basiques, ruines partiellement effondrées |
| **Adepte** | Désamorçage de pièges, langues mortes (1-2), donjons mineurs (cf. [[Exploration]] §Donjons) |
| **Expert** | Détection de chambres cachées, désamorçage magique, donjons majeurs, sites des [[Traces des Ères]] |
| **Maître** | **Condition cachée 🔒** — Accès aux **Cités des Anciens** ([[Azoria - Continent|Azoria]]), reliques de tier Mythique, capacité à manipuler les **artefacts maudits** sans contamination grave |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle]] 1 semaine, −15% taux de désamorçage.

---

## 6. Activités/Récoltes débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Coffre paysan abandonné · Cache de bandits · Ruines de surface (rendement faible) |
| **Initié** | Tombe d'un noble mineur · Donjon de niveau 1 · Réseau de caves · Cache de marchand |
| **Adepte** | Tombe royale · Donjon majeur · Ruine de civilisation effondrée · Sanctuaire abandonné |
| **Expert** | Cité perdue d'[[Ilthara - Continent\|Esperia]] · Forteresse de [[Celethor - Continent\|Thalendil]] · Cités des Sables ([[Endora - Continent|Endora]]) · Site [[Traces des Ères]] |
| **Maître** | Cité des Anciens ([[Azoria - Continent|Azoria]]) · Sanctuaire des [[Cosmologie\|Cosmiques]] · Reliques mythiques · Coffre du **Souffle Originel** |

→ Loot tables individuelles : Phase 2.

---

## 7. Carrière et débouchés

- **Démarrage** : guide de touriste-pillard pour les ruines de surface, vente de babioles
- **Progression** : reconnaissance par une **Société d'Exploration** (Lumasar, Solena), contrats privés (collectionneurs)
- **Établissement** : pas de lieu fixe — **aventurier**. Souvent en équipe (1 Cartographe + 1 Explorateur + 2-3 Chasseurs de trésors + 1 combattant)
- **Réseau** : [[Explorateur]] (ouvre la zone), [[Cartographe]] (cartes), [[Bibliothécaire]] / [[Historien]] (interprète et achète le lore), [[Marchand]] (revente de butin), [[Identificateur]] (services HV — voir [[Économie]] §Identification 200-1000 Éclats)
- **Faction** : Société d'Exploration (Lumasar), Confrérie des Pillards de Tombeaux (officieuse, [[Endora - Continent|Endora]]), Ordre du Voile (gardiens vs pillards — adversaires fréquents)
- **Note morale** : certains pays interdisent le pillage de leurs ruines sacrées — peut générer du **karma jaune/orange** dans certaines régions selon les lois locales (voir [[PvP]] §Karma — kill non-consenti exclu, mais réputation entamée)

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères\|Brume Mortelle]]** | Sites cachés se révèlent — pic de découvertes |
| **Ère [[Les Ères\|Verdoiement]]** | Végétation envahit les ruines, fouille plus difficile |
| **Ère [[Les Ères\|Sommeil de Glace]]** | Glaces fondent par endroits — accès à des sites enfouis ([[Azoria - Continent|Azoria]]) |
| **Post-[[Le Souffle]]** | Certaines ruines réapparaissent ou s'effondrent — pic d'activité |
| **[[L'Accord]] ≥ 75%** | Reliques à condition d'Accord équipables |
| **Religion [[Veritas]]** | Conflit : interdit de toucher aux sites sacrés sans permission |
| **Continent [[Azoria - Continent|Azoria]]** | Saint Graal — Cités des Anciens (Maître requis) |
| **Donjon avec condition cachée** ([[Exploration]]) | Chasseur de trésors maître = découvre les conditions |
| **[[Traces des Ères]]** | Sites historiques uniques, lore précieux |

---

## 9. Économie

**Gold sinks générés** :
- Outils de fouille : 100-500 Éclats / set
- Cartes de ruines : 200-2 000 Éclats
- Provisions longue durée : 50 Éclats / semaine d'expédition
- Identification d'item rare : 200-1 000 Éclats (voir [[Économie]] §Identification)
- Désenchantement / réparation reliques : 100-1 000 Éclats
- Taxe HV sur trésors : 5% (voir [[Économie]])

**Prix indicatifs** :
- Babiole de surface : 5-50 Éclats
- Bijou ancien (trouvé dans tombe) : 200-2 000 Éclats
- Arme Magistrale ancienne : 5 000-50 000 Éclats
- Relique majeure : 100 000+ Éclats
- Pages de [[Traces des Ères]] : 1 000-10 000 Éclats (vente [[Bibliothécaire]])
- Contrat de fouille (privé) : 500-5 000 Éclats / mission

**Chaîne économique** :
```
Chasseur de trésors ─→ [[Marchand]] / HV (objets manufacturés)
                   ─→ [[Identificateur]] / [[Bibliothécaire]] (lore)
                   ─→ [[Historien]] (Traces des Ères)
                   ─→ Collectionneur privé (relique signée)
                   ─→ Joueur direct (équipement)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché.*

**Cycle quotidien typique** (en mission) :
- 06:00 lever, repas chaud
- 07:00-12:00 — fouille principale (animation `creuser`, `crocheter`, `lire_runes`)
- 12:00-13:00 pause
- 13:00-17:00 — exploration des couloirs adjacents
- 17:00-19:00 — tri des trouvailles, croquis
- 20:00-22:00 — repas, archive, repos
- En ville : revente, identification, lecture d'archives, négociation contrats

**Signatures de PNJ archétypaux** :
- **L'aventurier-fouilleur** — chapeau de cuir, sacoches, pioche fine
- **La savante-pillarde** — issue d'académie ([[Lumasar]]), lunettes, lit le pré-altarien
- **Le pilleur de tombeaux** — réputation sulfureuse, méprisé par les autorités, riche en fragments
- **Le moine-chercheur** — [[Veritas]] / [[Rota Mundi]], fouille rituellement, restitue aux temples

**PNJ célèbres** *(Phase 4)* :
- *Eldris Vance* — "Le Premier des Sables", fouilleur des Cités d'[[Endora - Continent|Endora]]
- *Mère Selthar* — Lumasar, Maîtresse de la Société d'Exploration
- *Korven le Voilé* — pilleur masqué, Mythe vivant des [[Azoria - Continent\|Glaces Éternelles]]

---

*Liens : [[Métiers]] · [[Personnage]] · [[Exploration]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Traces des Ères]] · [[Bestiary/Index]] · [[Chasseur de créature]] · [[Chasseur de primes]] · [[Explorateur]] · [[Cartographe]] · [[Bibliothécaire]] · [[Historien]] · [[Marchand]]*
