---
tags: [métier, archétype, exploration, endurance, acuité]
type: archetype
category: Métier
catégorie_métier: Exploration
stat_principale: Endurance
stats_secondaires: [Acuité, Vivacité, Vigueur, Mémoire]
craft_category: -
sources_ressources_accessibles: [-]
stations_principales: [Camp d'expédition mobile, Bivouac haute altitude, Station-relais inter-zone, Avant-poste de pionniers]
outils_principaux: [Boussole, Sextant primitif, Cordes et grappins, Sac d'expédition (3 semaines), Carnet de relevés, Pierre à feu, Filtre à eau, Vêtements adaptables]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
biomes_associés: [Toundra, Désert de glace, Désolation, Mystique, Volcanique, Tropical, Marécages, Montagne]
métiers_complémentaires: [Cartographe, Navigateur, Chasseur de trésors, Dresseur, Botaniste, Mineur, Astronome]
era_modulation: true
status: drafted
last_review: 2026-05-01
---

# 🧭 Explorateur — Archétype Métier

> [!info] Entités tutélaires canoniques
> **[[Cosmologie|Explorator]]** (Céleste — *Voyageur des mondes perdus*), **[[Cosmologie|Abyssus]]** (Céleste — *Aventurier des abysses*, profondeurs et mystères sous-marins), **[[Cosmologie|Mentor]]** (Astral — *Guide spirituel*) et **[[Cosmologie|Navigor]]** (Éternel — *Passeur de mondes*). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *"Je ne suis pas le premier à le voir — l'arbre, le rocher, l'étoile l'ont vu avant moi. Mais je suis le premier à le rapporter."*

---

## 1. Vue d'ensemble

L'**Explorateur** est l'**ouvreur de zones**. Sa mission : **traverser**, le premier, des territoires que personne (ou personne de civilisé) n'a encore traversés ; **survivre** aux conditions extrêmes ; **rapporter** des relevés bruts (paysages, traces, points d'eau, dangers, ressources, événements) qui seront ensuite **transformés** par le [[Cartographe]] en cartes vendables. Il est le **bras armé de la cartographie** — sans lui, pas de carte de continent intérieur, pas de route commerciale nouvelle, pas de découverte.

> [!important] Frontière Explorateur vs Cartographe
> - **Explorateur** *(ce fichier)* — **traversée physique**, premier passage, danger physique, métier d'aventure mobile
> - **[[Cartographe]]** — **synthèse documentaire**, dessin, archive, métier de scriptorium
>
> Ils sont **complémentaires** et travaillent souvent en partenariat formel : l'Explorateur fournit les relevés (vendus 50-500 Éclats à l'unité), le Cartographe les transforme en cartes (vendues 100 à 50 000 Éclats).

L'Explorateur partage le terrain mais pas la mission avec : le [[Chasseur de trésors]] (fouille les zones connues, ne les ouvre pas), le [[Mineur]] (extrait, n'explore pas en profondeur), le [[Navigateur]] (mer, pas terre — mais branche cousine), le [[Dresseur]] (capture, ne cartographie pas).

Hybelior offre des terrains d'exploration légendaires : **Azoria** (Cités des Anciens enfouies), **Baelor** (île au brouillard), **Cendara** (volcanique, Phénix), forêts conscientes d'**Ilthara**, jungles d'**Esperia** ([[Endora - Continent|Endora]]).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Endurance** — voyages de plusieurs semaines, conditions extrêmes (froid, chaud, faim, manque d'eau)
- **Stats secondaires** : **Acuité** (lecture du terrain, danger, traces, observation pour relevés), **Vivacité** (esquiver dangers, traverser obstacles), **Vigueur** (charges lourdes 25-30 kg, escalade), **Mémoire** (mémoriser le paysage pour relevé fidèle)
- **Maîtrises** :
  - `Maîtrise_Survie_Froid`, `Maîtrise_Survie_Chaud`, `Maîtrise_Survie_Marécage`, etc.
  - `Maîtrise_Escalade`
  - `Maîtrise_Pistage` (recoupe avec [[Chasseur de créature]])
  - `Maîtrise_Cartographie` mineure (croquis sur le terrain — passe à [[Cartographe]] pour le tracé fin)
  - `Maîtrise_Orientation` — étoiles, soleil, magnétisme

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2.

---

## 3. Sources de ressources & compétences

**Consomme** :
- **Provisions longue durée** ([[Cuisinier]], [[Boulanger]] : pain de seigle, viande boucanée — voir [[Chasseur de créature]])
- **Vêtements adaptables** ([[Tailleur]], [[Cordonnier]])
- **Outils de navigation** ([[Forgeron]], [[Astronome]] pour les sextants)
- **Cordes et grappins** ([[Tisserand]], [[Forgeron]])
- **Filtre à eau, pierre à feu, lampes**

**Produit (sortie principale — pas une "ressource brute" mais un livrable)** :
- **Relevés bruts** (croquis, descriptions textuelles, échantillons de plantes/sol/minéraux)
- **Premières cartographies** (vendues à un [[Cartographe]] pour transformation)
- **Lore inédit** (rencontres, légendes locales — vendu au [[Bibliothécaire]] / [[Historien]])
- **Échantillons** (plantes pour [[Botaniste]], minerais pour [[Mineur]] — petits prélèvements de prospection)

→ Référence [[Sources de Ressources]] (intrants pour la chaîne, pas extracteur lui-même).

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Camp d'expédition mobile** | Bivouac de base | Novice |
| **Bivouac haute altitude / extrême** | Conditions hostiles | Adepte |
| **Station-relais inter-zone** | Stockage cache pour le retour | Initié |
| **Avant-poste de pionniers** | Base semi-permanente, hub pour suivants | Expert |

**Outils principaux** : boussole, sextant primitif (Adepte+), cordes et grappins, sac d'expédition 3 semaines, carnet de relevés (vélin imperméable), pierre à feu, filtre à eau, vêtements adaptables (couches), couteau polyvalent, longue-vue (Adepte+), lanterne tempête.

→ Référence [[Crafts]] §Stations.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Expéditions courtes (1-3 jours) en biome connu, premières routes améliorées, pas de surnaturel |
| **Initié** | Expéditions 1-2 semaines, biomes hostiles modérés (toundra, désert), survie autonome |
| **Adepte** | Expéditions longues 3-6 semaines, biomes extrêmes (désert de glace, volcanique), première traversée régionale |
| **Expert** | **Première mondiale** sur un continent (vrai prestige), traversée de zones magiques (Mystique, Désolation), ouverture d'avant-postes |
| **Maître** | **Condition cachée 🔒** — Exploration des zones impossibles ([[Baelor - Continent|Baelor]], [[Azoria - Continent|Azoria]]), traversée des Souffles passés (cf. [[Le Souffle]]), capacité à ouvrir une route à travers un événement météo extrême |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle]] 1 semaine, −15% endurance et survie.

---

## 6. Activités/Récoltes débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Relevé de chemin forestier · Plan d'une vallée · Identification d'un point d'eau |
| **Initié** | Traversée d'un col montagneux · Repérage de ruine isolée · Échantillon flore inconnue |
| **Adepte** | Traversée d'un désert · Première carte d'une vallée vierge · Identification d'événement saisonnier · Détection migration ([[Exploration]] §Événements) |
| **Expert** | Première mondiale sur continent secondaire · Avant-poste fonctionnel · Cartographie d'une zone magique · Découverte de site [[Traces des Ères]] |
| **Maître** | Pénétration d'[[Azoria - Continent|Azoria]] · Traversée du brouillard de [[Baelor - Continent|Baelor]] · Premier mortel à voir la **Source de l'Éternité** · Découverte d'une zone post-[[Le Souffle]] inédite |

→ Récompenses individuelles : Phase 2.

---

## 7. Carrière et débouchés

- **Démarrage** : guide local, ranger d'une frontière de pays
- **Progression** : reconnaissance par une **Société d'Exploration** ([[Lumasar]], **Solena** — "Âge des Grandes Explorations"), contrats publics ou privés
- **Établissement** : **aventurier permanent**. Pas de lieu fixe. Souvent membre d'une équipe (Explorateur + [[Cartographe]] + [[Chasseur de créature]] + [[Dresseur]] + 1-2 combattants/mages)
- **Réseau** : [[Cartographe]] (client direct des relevés), [[Navigateur]] (cousin maritime, échanges de techniques d'orientation), [[Astronome]] (calage céleste), [[Botaniste]] / [[Mineur]] (clients d'échantillons), [[Marchand]] (financement contre exclusivité commerciale)
- **Faction** : Société d'Exploration de **Solena**, Pionniers de [[Galenor - Continent|Galenor]], Cercles de Voyageurs ([[Onara - Continent|Onara]], "Foires des Vents"), Aventuriers libres
- **Note PvP** : karma vert. Souvent ciblé par **bandits** en zone sauvage — l'expédition doit s'auto-défendre.

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 9 — Exploration). Deux rôles canoniques se rattachent à l'Explorateur (palier Maître+).

#### Sous-spécialisation Maître+ : Maître des expéditions

> Source canonique : `Role.csv` (cat 9, role n°41).

- **Description** : Explorateur-Maître à la tête de **grandes expéditions** mandatées par une nation, une société savante ou une guilde marchande — recrute et dirige une équipe complète (Cartographe, Chasseur de créature, Dresseur, mages, combattants), planifie l'itinéraire, négocie les financements.
- **Conditions** : palier Maître + ≥ 1 expédition majeure menée à terme avec rapport déposé + ≥ 1 zone inconnue cartographiée + Reconnaissance ≥ Adepte multi-nations + 🔒 condition cachée (avoir survécu à un [[Le Souffle|Souffle]] en pleine expédition OU découvert une Trace [[Traces des Ères]]).
- **Notes** : équivalent canonique du **chef d'équipe permanent** de l'échelle d'évolution (§7). Frontière forte avec [[Marchand]] (financement, exclusivités commerciales).

#### Sous-spécialisation Maître+ : Guide des contrées sauvages

> Source canonique : `Role.csv` (cat 9, role n°40).

- **Description** : Explorateur-Maître spécialisé dans la **traversée et le pilotage** d'expéditions tierces à travers les zones les plus dangereuses (zones d'ère active, frontières post-[[Le Souffle|Souffle]], terres cosmiquement instables). Ne dirige pas l'expédition mais en garantit la survie.
- **Conditions** : palier Maître + ≥ 5 traversées guidées sans perte critique + connaissance experte d'au moins 2 biomes extrêmes + 🔒 condition cachée (avoir guidé une caravane à travers une [[Les Ères|Brume Mortelle]] OU établi un sentier nommé survivant à un Souffle).
- **Notes** : peut être pluri-rôle avec [[Cartographe]]-Maître (un Guide des contrées sauvages produit souvent ses propres cartes). Frontière avec [[Mercenaire]] / [[Garde]] (escorte armée).

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères\|Vents]] (Aerion)** | Voyages aériens facilités, +30% vitesse |
| **Ère [[Les Ères\|Sommeil de Glace]] (Climata)** | Routes gelées, accès à zones précédemment infranchissables |
| **Ère [[Les Ères\|Verdoiement]] (Terranu)** | Forêts denses, ralentissement, mais flore extraordinaire |
| **Ère [[Les Ères\|Brume Mortelle]]** | Zones cachées se révèlent — opportunité historique |
| **Post-[[Le Souffle]]** | **Le monde change** — zones autrefois inexplorables ouvertes, nouvelles routes nécessaires, **demande explose** |
| **[[L'Accord]] ≥ 75%** | Capacité de naviguer dans les "anciens" du monde (cf. [[Traces des Ères]]) |
| **Événements météo extrêmes** ([[Exploration]]) | Risque de mort élevé, mais récompenses uniques |
| **Continent [[Azoria - Continent|Azoria]]** | Saint Graal — Maître requis |
| **Continent [[Baelor - Continent|Baelor]]** | Brouillard permanent — orientation classique impossible, [[Le Lien\|Voie]] requise |
| **Religion [[Foedus Animae]]** | Pacte avec esprits locaux pour traversée |

---

## 9. Économie

**Gold sinks générés** :
- Provisions longue durée : 100-500 Éclats / expédition
- Vêtements adaptés : 500-5 000 Éclats / set complet
- Outils (sextant, longue-vue) : 200-3 000 Éclats
- Réparation et remplacement : 100-500 Éclats / semaine de mission
- Mercenaire d'escorte ([[Mercenaire]]) : 50-500 Éclats / mission
- Taxe HV sur relevés : 5% (voir [[Économie]])

**Prix indicatifs** :
- Relevé court (paysage, croquis) : 10-50 Éclats
- Relevé long (vallée, route) : 100-500 Éclats
- Relevé de zone vierge : 500-5 000 Éclats
- Première mondiale (continent secondaire) : 50 000+ Éclats + titre permanent
- Lore inédit : 100-2 000 Éclats / fragment

**Chaîne économique** :
```
Explorateur (relevé brut) ─→ [[Cartographe]] (Carte) ─→ [[Marchand]] / Public
                         ─→ [[Bibliothécaire]] / [[Historien]] (lore)
                         ─→ [[Botaniste]] / [[Mineur]] (échantillons)
                         ─→ Faction / État (rapport sécurité)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché.*

**Cycle quotidien typique** (en expédition) :
- 05:00 lever, repas chaud (rare luxe)
- 06:00-11:00 — marche / progression (animation `marcher`, `escalader`, `traverser`)
- 11:00-13:00 — pause sécurisée, repas
- 13:00-17:00 — progression suite ou exploration latérale
- 17:00-19:00 — installation bivouac, relevés du jour, croquis
- 19:00-21:00 — repas, observation des étoiles (orientation)
- 21:00 garde tournante / sommeil
- En ville : repos prolongé (régen Labeur), vente, recharge, planification

**Signatures de PNJ archétypaux** :
- **Le pionnier endurci** — barbe gelée, cape épaisse, visage tanné
- **La pionnière scientifique** — académie de [[Lumasar]], carnet, échantillons sous verre
- **L'explorateur-Lié** ([[Le Lien\|Voie de Spiritus]] ou Tempora) — guide spirituel par les esprits du lieu
- **Le solitaire des marges** — vit en avant-poste, mépris des villes, hub de rumeurs précieux

**PNJ célèbres** *(Phase 4)* :
- *Captaine Aldros* — Solena, premier à avoir traversé la mer du sud d'[[Azoria - Continent|Azoria]]
- *Ven la Pionnière* — Galenor, ouverture de la route nord-sud transcontinentale
- *Frère Iolar* — Spiritus, traversée des brouillards de [[Baelor - Continent|Baelor]]

---

*Liens : [[Métiers]] · [[Personnage]] · [[Exploration]] · [[Géographie]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Cartographe]] · [[Navigateur]] · [[Chasseur de trésors]] · [[Dresseur]] · [[Astronome]] · [[Marchand]] · [[Mercenaire]]*
