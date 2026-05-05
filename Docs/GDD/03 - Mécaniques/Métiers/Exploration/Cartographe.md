---
tags: [métier, archétype, exploration, acuité, mémoire]
type: archetype
category: Métier
catégorie_métier: Exploration
stat_principale: Acuité
stats_secondaires: [Mémoire, Endurance, Verbe]
craft_category: -
sources_ressources_accessibles: [Pigment, Plaque de verre, Planche]
stations_principales: [Scriptorium, Table à dessin, Atelier de relevés, Chambre noire à camera obscura, Archive cartographique]
outils_principaux: [Compas, Équerre, Astrolabe portatif, Théodolite primitif, Plume de précision, Pinceaux fins, Encre indélébile, Vélin]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
biomes_associés: [Tempéré, Plaine, Montagne, Toundra, Tropical, Désert de sable, Mystique]
métiers_complémentaires: [Explorateur, Navigateur, Astronome, Scribe, Bibliothécaire, Marchand]
era_modulation: true
status: drafted
last_review: 2026-05-01
---

# 🗺️ Cartographe — Archétype Métier

> [!info] Entité tutélaire canonique
> **[[Cosmologie|Asterion]]** (Céleste — *Cartographe céleste*, mappeur des constellations et des cieux). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *"Une carte n'est jamais le territoire. Mais une bonne carte sauve plus de vies qu'une bonne épée."*

---

## 1. Vue d'ensemble

Le **Cartographe** est le **scribe de l'espace**. Il transforme les **observations brutes** rapportées par les [[Explorateur|Explorateurs]], les [[Navigateur|Navigateurs]] et les voyageurs anonymes en **cartes lisibles et vendables**. Il ne s'agit pas d'un aventurier de premier rang — il existe une frontière nette avec l'Explorateur : ce dernier **traverse** la zone inconnue (premier passage, danger physique), tandis que le Cartographe **synthétise**, **dessine** et **archive**. Beaucoup de cartographes sortent en expédition courte (vérifier un relevé, croquis sur le terrain), mais leur lieu de travail principal est le **scriptorium** ou l'atelier privé. Métier mêlant **science** (mesure, projection), **art** (cartouches, enluminures) et **commerce** (vente de cartes, contrats publics et privés).

Hybelior connaît trois traditions cartographiques principales : la **carte royale** (Galenor, Lumasar — précision géodésique, échelle), la **carte spirituelle** (Alkaran, Ilthara — superpositions de lieux sacrés et de routes spirituelles), et la **carte de marchand** (Solena, Tyndara — itinéraires, douanes, vents).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Acuité** — précision du tracé, lecture de paysage, détection de détails (déformations, points remarquables)
- **Stats secondaires** : **Mémoire** (mémorisation de paysages traversés, archive mentale, lore de zones), **Endurance** (longues sessions de tracé, expéditions de relevé), **Verbe** (négocier l'achat de relevés bruts auprès des explorateurs, vendre des cartes)
- **Maîtrise contextuelle** : `Maîtrise_Cartographie` — montée par chaque carte tracée et validée. Sous-spécialités : `Maîtrise_Cartographie_Terrestre`, `Maîtrise_Cartographie_Maritime` (recoupe avec [[Navigateur]]), `Maîtrise_Cartographie_Souterraine` (donjons, grottes, mines).

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2.

---

## 3. Sources de ressources & compétences

**Consomme** :
- **Pigment** (Source 3 Fabrication, métier amont [[Teinturier]]) — encres colorées, durables
- **Plante / Sève** — fixateurs, vernis (intrants [[Botaniste]])
- **Vélin / Parchemin** — produit dérivé du [[Tanneur]] / [[Boucher]]
- **Planche fine** (Source 3 Fabrication, [[Menuisier]]) — supports rigides, étuis
- **Relevés bruts** (intrants narratifs) — achetés aux [[Explorateur|Explorateurs]] et [[Navigateur|Navigateurs]]

**Produit** :
- **Cartes** (catégorie d'item à part — pas une ressource brute) : régionales, mondiales, marines, donjons
- **Atlas reliés** (Maître+) — ouvrages de référence vendus aux bibliothèques et nobles
- **Cartes spéciales** : cartes de ressources, cartes d'événements (migration, météo), cartes de routes commerciales

→ Référence [[Sources de Ressources]] (intrants). Pas de récolte directe — métier de **synthèse documentaire**.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Table à dessin** (atelier privé) | Tracé final | Novice |
| **Scriptorium** (collectif) | Travail collaboratif, archives | Initié |
| **Chambre noire / camera obscura** | Projection paysage pour relevé | Adepte |
| **Atelier de relevés (terrain)** | Croquis sur place, plateau pliable | Initié |
| **Archive cartographique** | Stockage, comparaison, mise à jour | Expert |
| **Presse à cartes** (gravure sur bois) | Reproduction série | Adepte |

**Outils principaux** : compas, équerre, astrolabe portatif, théodolite primitif (Adepte+), plume de précision, pinceaux fins, encre indélébile, vélin, règle graduée, fil à plomb.

→ Référence [[Crafts]] §Stations.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Carte de quartier / village, échelle approximative, taux d'erreur ~30% |
| **Initié** | Carte régionale (rayon ~10 km), légendes basiques, projection plate, erreur ~15% |
| **Adepte** | Carte de pays, projections corrigées (déformations connues), cartouches enluminés, vente en HV |
| **Expert** | Carte continentale, atlas, cartes thématiques (ressources, météo), cartes de donjon précises |
| **Maître** | **Condition cachée 🔒** — Carte d'**Œuvre signée** : cartes "vivantes" qui se mettent à jour passivement quand de nouveaux relevés sont apportés, cartes des ères (montrent les variations [[Les Ères]]) |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle]] 1 semaine, −15% précision.

---

## 6. Activités/Récoltes débloquées

> Note : "récoltes" = relevés et cartes commercialisables.

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Plan de quartier · Carte de village · Croquis de route locale |
| **Initié** | Carte régionale · Carte de seigneurie · Plan de bataille tactique |
| **Adepte** | Carte de pays · Carte routière commerciale · Carte minière (avec [[Mineur]]) · Carte de chasse (avec [[Chasseur de créature]]) |
| **Expert** | Carte continentale · Atlas régional relié · Carte de donjon (avec [[Chasseur de trésors]]) · Carte des courants ([[Navigateur]]) · Carte des esprits ([[Explorateur]] zones [[Géographie\|mystiques]]) |
| **Maître** | Atlas mondial signé · Carte vivante (auto-update) · Carte d'ère ([[Les Ères]]) · Carte des Souffles passés (mémoire des transformations) · Carte des [[Traces des Ères]] |

→ Recettes individuelles : Phase 2 Recipe Generator.

---

## 7. Carrière et débouchés

- **Démarrage** : apprenti scribe ou copiste, recopier des cartes existantes pour s'exercer
- **Progression** : commandes locales (seigneur, guilde marchande, [[Marchand|marchand]]), achat systématique de relevés auprès des aventuriers
- **Établissement** : atelier en ville majeure (Lumasar, Solena, Tyndara — capitales académiques ou marchandes), ou rattachement à une [[Bibliothécaire|bibliothèque]] / une académie
- **Réseau** : [[Explorateur]] et [[Navigateur]] (intrants), [[Astronome]] (calage céleste), [[Marchand]] (clients), [[Scribe]] et [[Bibliothécaire]] (collègues), [[Chasseur de trésors]] (cartes de ruines)
- **Faction** : Guildes cartographiques (Lumasar, Solena), Société des Géographes (Galenor), Ordre des Voiles ([[Navigateur|maritime]])

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 9 — Exploration). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Cartographe maître

> Source canonique : `Role.csv` (cat 9, role n°42).

- **Description** : titre canonique du palier 5 — Cartographe reconnu d'envergure académique ou nationale, ses cartes signées font autorité (consultées par les Sociétés d'Exploration, achetées par les souverains, intégrées au [[Le Souffle|Héritage]]).
- **Conditions** : palier Maître + ≥ 1 carte signée déposée et reconnue + Reconnaissance ≥ Adepte capitale académique + 🔒 condition cachée (avoir produit une carte d'une zone post-[[Le Souffle|Souffle]] dans la première semaine OU avoir cartographié une [[Les Ères|trace cosmique]]).
- **Notes** : peut être pluri-rôle avec [[Explorateur]]-Maître (Guide des contrées sauvages). Frontière avec [[Bibliothécaire]] (archivage des cartes) et [[Astronome]] (calage céleste).

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères\|Vents]] (Aerion)** | Cartes maritimes et aériennes prisées, +20% prix |
| **Ère [[Les Ères\|Verdoiement]] (Terranu)** | Cartes de ressources nature très demandées |
| **Ère [[Les Ères\|Brume Mortelle]]** | Cartes deviennent partiellement obsolètes — opportunité de re-relevés payants |
| **Post-[[Le Souffle]]** | Une partie des cartes nécessite mise à jour (territoires altérés) — pic d'activité |
| **[[L'Accord]] ≥ 75%** | Cartes d'ère débloquées (visualisent la modulation cosmique) |
| **Religion [[Rota Mundi]]** | Cartes cycliques (équinoxes, solstices) intégrant les cycles |
| **Continent Baelor** | Cartographie impossible classique — projections **mystiques** uniquement |
| **Continent Azoria** | Zones non-cartographiées — opportunité de gloire et fortune (premier mondial) |
| **Faction marchande Solena** | Recettes de cartes commerciales sécurisées (routes confidentielles) |

---

## 9. Économie

**Gold sinks générés** :
- Achat de relevés à un [[Explorateur]] : 50-500 Éclats / relevé
- Vélin de qualité : 5-50 Éclats / feuille
- Encre indélébile : 20 Éclats / fiole
- Loyer scriptorium en ville : 500 Éclats / mois
- Taxe HV sur cartes vendues : 5% (voir [[Économie]] §Taxe HV)

**Prix indicatifs** :
- Carte de village : 10-30 Éclats
- Carte régionale : 100-500 Éclats
- Carte de pays : 1 000-5 000 Éclats
- Atlas continental : 10 000-50 000 Éclats
- Carte vivante signée (Maître) : 100 000+ Éclats
- Carte de donjon vérifiée : 500-3 000 Éclats

**Chaîne économique** :
```
[[Explorateur]] (relevés) ─┐
[[Navigateur]] (relevés mer)├─→ Cartographe (Carte) ─→ [[Marchand]] / [[Bibliothécaire]]
[[Chasseur de trésors]]    ┘                       ─→ [[Aventurier]] / Joueur
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seule.*

**Cycle quotidien typique** :
- 06:00 lever, organisation des relevés reçus la veille
- 07:00-12:00 — tracé fin (animation `dessiner_carte`, `consulter_relevés`)
- 12:00-13:00 pause
- 13:00-15:00 — réception de visiteurs (explorateurs, clients)
- 15:00-18:00 — enluminure, finitions, copies pour la vente
- 18:00-20:00 — étude d'astronomie (caler les longitudes), lecture
- 22:00 coucher

**Signatures de PNJ archétypaux** :
- **Le cartographe-érudit** — atelier en ville académique, lunettes, encre sur les doigts
- **La cartographe-aventurière** — sort souvent en expédition courte, croquis tachés de boue, hybride avec [[Explorateur]]
- **Le cartographe-espion** — vend des cartes pour une nation, agent secret pour une autre — recoupe [[Espion]]
- **Le moine-cartographe** — Baelor, cartes spirituelles, méditation comme méthode

**PNJ célèbres** *(Phase 4)* :
- *Vasselen d'Edrim* — Lumasar, Maître cartographe, atlas continental signé
- *Maîtresse Aldris* — Solena, cartes des routes commerciales secrètes
- *Frère Iolen* — Baelor, cartes mystiques de la Source de l'Éternité

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Géographie]] · [[Explorateur]] · [[Navigateur]] · [[Astronome]] · [[Scribe]] · [[Bibliothécaire]] · [[Marchand]] · [[Traces des Ères]]*
