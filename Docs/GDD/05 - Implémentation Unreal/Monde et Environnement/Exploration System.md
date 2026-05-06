---
tags: [implementation, exploration, monde-ouvert, decouverte, points-interet, cartographie, balance]
status: drafted
last_review: 2026-05-07
needs_review_for: [densites-poi-playtest, taux-revelation-playtest, balance-tier-zones]
type: implementation
canonical_concept: "[[Exploration]]"
---

# Exploration System — Implémentation

> Page d'implémentation technique du concept narratif **[[Exploration]]**.
> Cette page contient les **chiffres, formules, règles de balance, spec serveur et data-driven** liés à l'exploration et au monde ouvert.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Exploration]].

---

## Échelle du monde — paramètres canoniques

| Paramètre | Valeur cible | Notes |
|---|---|---|
| **Nombre de continents** | 13 | voir [[Géographie]] |
| **Surface totale jouable** | ~2 500 km² (à plat équivalent) | streaming OWS multi-shard |
| **Surface moyenne d'un continent** | ~190 km² | variable selon biomes |
| **Tile streaming UE5** | 1 km × 1 km | géré par [[Clipmap System]] |
| **Vue distante max** | 8 km (sky-rendering) | [[Sky Surface Renderer]] |
| **Densité moyenne POI majeurs** | 1 / 6 km² | densité variable par tier |
| **Densité moyenne POI mineurs** | 1 / 1.5 km² | + variants procéduraux |
| **Durée typique de traversée à pied (continent)** | 60-120 min | sans monture |
| **Durée typique avec monture rapide** | 20-40 min | montures terrestres |

---

## Tiers de zones — balance par éloignement

L'éloignement des zones de départ structure la difficulté et la rareté. Pas de niveau de zone affiché : la difficulté se **lit** par les indices environnementaux.

| Tier | Distance approx. (capitale) | Difficulté faune | Densité POI cachés | Tier ressources max |
|---|---|---|---|---|
| **T0 — Marges sûres** | < 2 km | Très basse | Faible | Commun |
| **T1 — Périphérie** | 2-8 km | Basse à moyenne | Moyenne | Rare |
| **T2 — Zones tendues** | 8-25 km | Moyenne à haute | Élevée | Épique |
| **T3 — Frontières** | 25-60 km | Haute | Très élevée | Légendaire |
| **T4 — Zones extrêmes** | > 60 km, îles, abysses, montagnes hautes | Mortelle | Très élevée + uniques | Magistral, Mythique (unique-monde) |

**Règle d'arbitrage** :
```
Pour toute nouvelle zone ajoutée au monde :
  - sa difficulté faune doit s'aligner sur son tier (mortalité testée à équipement de tier-1)
  - sa densité de POI cachés doit dépasser celle du tier inférieur (récompense à l'éloignement)
  - au moins 1 ressource exclusive ou unique doit y être disponible
```

---

## Catégories de Points d'Intérêt (POI)

Chaque POI est un asset YAML versionné dans `Content/Data/POI/`.

| Catégorie | Densité cible / 100 km² | Visibilité par défaut | Tier typique |
|---|---|---|---|
| **Hameau / village PNJ** | 1-2 | 🟢 Visible (carte officielle) | T0-T2 |
| **Sanctuaire de Voie** | 0.5-1 | 🟡 Indicé | T1-T4 |
| **Donjon ouvert** | 1-2 | 🟢 Visible | T1-T3 |
| **Donjon à condition cachée** | 0.5 | 🔴 Cachée totale | T2-T4 |
| **Trace géologique majeure** | 0.5 | 🟢 Visible | T1-T4 (voir [[Traces des Ères]]) |
| **Ruine architecturale** | 1-2 | 🟡 Indicé (silhouette visible) | T1-T4 |
| **Site archéologique mineur** | 3-5 | 🔴 ou 🟡 selon profondeur | T1-T3 |
| **Brèche du Néant** | très rare, mobile | 🔴 | T3-T4 |
| **Spot de ressource exclusive d'Ère** | 2-4 (en Ère active) | 🟡 (signe environnemental) | T1-T4 |
| **Monument de joueur** | dépend de l'historique | 🟢 (dès posé) | toutes |
| **Source / Oasis / Refuge** | 5-8 | 🟢 | T0-T4 |

> Total POI cible monde entier : **~1 500 à 2 200 POI**, dont ~30% en visibilité 🟡 ou 🔴.

---

## Règles de découverte — taux de révélation

### Brouillard de carte (Fog of Map)

```
À l'ouverture d'une carte continentale (joueur neuf ou nouvelle Partie) :
  - Capitales et grandes villes : visibles d'office
  - Routes officielles : visibles d'office
  - Reste : caché (texture noire stylisée parchemin)

Révélation par présence :
  - Rayon de découverte automatique : 250 m autour du joueur
  - Révèle : topographie + POI 🟢
  - Ne révèle PAS : POI 🟡 sans interaction, POI 🔴 jamais
```

### Conditions de révélation par catégorie

| Catégorie POI | Condition de révélation sur carte joueur |
|---|---|
| 🟢 Visible | Présence dans le rayon 250 m |
| 🟡 Indicé (icône `🔒` sans détail) | Présence + indice contextuel observé (PNJ, fragment, signe environnemental) |
| 🔴 Cachée totale | Découverte effective sur place (interaction, condition, séquence) |

### Vitesse d'exploration ressentie

| Profil joueur | Surface explorée moyenne / heure | POI découverts moyens / heure |
|---|---|---|
| Cartographe dédié | 2-3 km² | 4-6 POI |
| Aventurier généraliste | 1-2 km² | 2-3 POI |
| Joueur "main quest" | 0.5-1 km² | 1-2 POI |

**Cible design** : un continent ne se vide pas en moins de **40-80 heures** de jeu actif d'exploration dédiée.

---

## Cartographie — règles et tarifs

### Métier Cartographe

Voir [[Métiers]] pour les niveaux du métier. Effets sur l'exploration :

| Niveau Cartographe | Effet d'exploration |
|---|---|
| Niveau 1 | Rayon de révélation +10% (275 m) |
| Niveau 2 | Cartes vendables (basiques) ; voit les routes secondaires |
| Niveau 3 | Détecte présence d'un POI 🟡 dans rayon 100 m (sans le révéler) |
| Niveau 4 | Cartes vendables (détaillées) ; trace altitude et points d'eau |
| Niveau 5 (Maître) | 🔒 — variable, conditions cachées spécifiques (voir [[Vision Rules]]) |

### Tarifs de cartographie (économie marché)

| Type de carte | Prix plancher (marché PNJ) | Prix joueur typique |
|---|---|---|
| Carte basique de continent (POI 🟢) | 50 éclats | 80-150 |
| Carte détaillée (avec topographie) | 200 éclats | 400-800 |
| Carte d'Ère (POI éphémères) | 500 éclats | 1 500-3 000 |
| Carte stellaire (alignements) | 1 200 éclats | 3 000-8 000 |
| Carte d'une zone T3-T4 | non vendue PNJ | 5 000-25 000 |
| Carte d'une Brèche du Néant | non vendue PNJ | 30 000+ (rareté Mythique) |

> Les cartes joueur sont des **objets transférables** ; leur révélation chez l'acheteur applique les mêmes règles qu'une découverte propre, sauf qu'elle ne consomme pas de présence sur le terrain.

---

## Conditions cachées de zones

### Plafond de balance

```
Pour toute zone explorable (continent / sous-zone) :
  Part de POI en 🔴 Cachée totale ≤ 25% du total des POI de la zone
```

Conforme au plafond souple de [[Vision Rules]] §Cadre des conditions cachées (modulation +5% pour l'exploration, justifiée par le pilier "Liberté et découverte").

### Exemples canoniques de conditions cachées de zones

| Zone / POI | Condition de déblocage | Tier |
|---|---|---|
| Donjon-fantôme de Cendara | Visiter 3 cimetières sous lune Glas + porter Voie de Noctis niv 4 | T3 |
| Île au-delà du Voile (Baelor) | Naviguer un cap précis pendant un Souffle | T4 |
| Cave-Cathédrale d'Akmoral | Chanter une syllabe correcte à l'entrée (lore Bardes) | T2 |
| Source du Premier Aquor | Boire à 7 fontaines sacrées dans l'ordre | T3 |
| Forêt-au-dessus-de-Galenor | Atteindre une altitude > 1500 m avec monture aérienne | T3 |
| Mausolée de l'Oracle Perdue | Posséder l'Œil de Fatum + lire 3 calendriers | T4 |
| Brèche du Néant stable | Accomplir une condition de Voie d'Umbra niveau 5 | T4 |
| Citadelle Volante d'Aerion | Survivre 5 Petits Souffles consécutifs en altitude | Mythique |

> Liste complète : `Content/Data/HiddenConditions/Exploration/*.uasset`. Documentation interne, **jamais affichée en jeu**.

---

## Spawns d'événements aléatoires

Les événements dynamiques se déclenchent selon une table de probabilités modulée par l'Ère active (voir [[Era System]]) et l'état du monde.

### Table de spawn — fréquences de base

| Événement | Probabilité de spawn / heure / zone | Modulateurs |
|---|---|---|
| 🐉 Boss mondial rare | 0.001 (1 sur 1 000 h-zone) | × tension cosmique de l'Ère |
| 👹 Invasion de créatures | 0.05 | × densité joueurs (max ×3) |
| 🚚 Caravane marchande | 0.15 | × proximité route officielle |
| ⛈️ Phénomène météo extrême | 0.10 | × archétype d'Ère ([[Weather System]]) |
| 🦅 Migration de créatures | 0.02 | saisonnier, × Ère |
| 🌸 Événement saisonnier | 0.08 | × phase de Saison ([[Seasons]]) |
| 🗝️ Caravane suspecte (combat) | 0.04 | × tension cosmique |
| 🔥 Feu de forêt | 0.03 | × biome forestier + Ère Calor |
| 💎 Affleurement de ressource rare | 0.05 | × tier zone |
| 👤 PNJ errant à quête | 0.10 | × densité POI 🟡 |

### Cooldowns globaux

| Événement | Cooldown global (monde) |
|---|---|
| Boss mondial rare | 7-21 jours |
| Invasion ville | 24-72 h par ville |
| Caravane suspecte | 1 h par zone |
| Phénomène météo extrême | 6-24 h par continent |

### Effet du Souffle sur les spawns

Voir [[Souffle System]] pour le déclenchement. À chaque Souffle :
- Reset des cooldowns d'événements rares
- Reroll des spawns rares de la nouvelle Ère
- Migration immédiate de la faune (variants)

---

## Locomotion — vitesses et coûts

| Moyen | Vitesse (m/s) | Stamina/Mana | Tier d'accès |
|---|---|---|---|
| Marche | 3.0 | aucun | T0 |
| Course | 5.5 | -2 stamina/s au-delà de 8s | T0 |
| Sprint | 8.0 | -5 stamina/s | T0 (compétence dédiée) |
| Nage | 2.0 | aucun (longue tenue) | T0 |
| Plongée magique | 3.5 | -1 mana/s | T1 (Voie d'Aquor niv 2) |
| Monture terrestre commune | 8-10 | aucun | T1 (achat) |
| Monture terrestre rare | 11-13 | aucun | T2 (capture / élevage) |
| Monture aquatique | 7-9 | aucun | T1 |
| Monture aérienne | 14-18 + altitude | aucun (timer endurance vol 5-15 min) | T3 (🔒) |
| Deltaplane | 12 (planage), -1 m/s descente | aucun | T1 (objet) |
| Bateau | 6-12 selon type | équipage / vent | T1-T2 |
| Dirigeable | 10-14 | équipage + carburant | T3 (collectif) |
| Calèche | 8 | aucun | T1 (PNJ / guilde) |
| Transformation animale | variable (5-12) | -3 mana/s | T3 (🔒, Voie de Spiritus avancée) |
| Portail dimensionnel | téléportation | coût élevé en mana + composant | T4 (🔒) |

> Aucune téléportation rapide bon marché. Les **distances doivent rester ressenties**. Voir [[Vision Rules]] pilier "Liberté et découverte".

### Endurance de vol

```
Endurance de vol (monture aérienne) :
  - Réservoir de base : 600 secondes (10 min)
  - Recharge au sol : 60 sec / min
  - Recharge en planage : 0.3 × vitesse normale
  - Au-delà : descente forcée
```

---

## Cross-links géographie

| Élément du monde | Système porteur |
|---|---|
| Carte des continents | [[Géographie]] |
| Biomes et états d'Ère | [[Biome System]] / [[Era System]] |
| Météo et phénomènes | [[Weather System]] |
| Saisons et cycles | [[Seasons]] |
| Cycle jour/nuit | [[Time Of Day]] |
| Streaming terrain | [[Clipmap System]] / [[Terrain Manager]] |
| Caves et souterrains | [[Caves SDF]] |
| Eau et navigation | [[Infinite Ocean]] / [[Water Buoyancy]] / [[Water Swimming]] / [[Terrain Water Bridge]] |
| Foliage | [[Foliage Assets]] |
| Niveaux et sub-levels | [[Levels]] / [[Level Design]] |
| Sky distant | [[Sky Surface Renderer]] |
| Spawn faune | [[Entity Spawner]] |
| Traces et archéologie | [[Traces des Ères]] |
| Quêtes ambiantes | [[Quest System]] |

---

## Architecture data-driven

```
Content/
  Data/
    POI/
      DA_POI_<id>.uasset            (un asset par POI majeur)
      DT_POI_Categories.uasset      (densités, visibilités, règles)
    Maps/
      DT_FogOfMap_Rules.uasset
      DT_MapPriceTable.uasset
    HiddenConditions/
      Exploration/
        DA_HC_<id>.uasset           (1 fichier par condition cachée)
    Locomotion/
      DT_LocomotionProfiles.uasset
      DT_MountStats.uasset
    Events/
      DT_RandomEventSpawnRules.uasset
      DT_EventCooldowns.uasset
    Tiers/
      DT_ZoneTiers.uasset           (mapping zone → tier T0..T4)
```

### Flux serveur — découverte d'un POI

```
1. Présence joueur dans rayon → MapDiscoveryComponent évalue
2. Si POI 🟢 dans rayon 250 m :
   → MarkAsDiscovered(player, poi_id)
   → Sync World State (persistance par joueur)
   → UI : icône s'affiche sur carte
3. Si POI 🟡 :
   → Évalue prérequis indice (lore, item, dialogue PNJ)
   → Si validé : MarkAsDiscovered ; sinon, indice ambiant ajouté
4. Si POI 🔴 :
   → Évalue HiddenCondition associée (DA_HC_<id>)
   → Si validée : événement scripté + révélation
   → Si non : aucun feedback visuel sur la carte
```

---

## Conditions cachées 🔒 liées à l'exploration

| Condition | Récompense |
|---|---|
| Visiter 100% des POI 🟢 d'un continent | Titre "Cartographe Complet" + bonus rayon de révélation +20% |
| Découvrir 50 POI 🟡 (toutes zones confondues) | Titre "Œil Aiguisé" |
| Découvrir 10 POI 🔴 | Titre "Ouvreur de Voie" |
| Visiter les 13 continents | Titre "Voyageur des Treize" |
| Visiter les 7 grandes Traces géologiques | Titre "Marcheur des Ères" (voir [[Traces des Ères]]) |
| Survivre 1 mois en zone T4 sans rentrer en T0 | Titre "Errant des Frontières" |
| Cartographier 3 Brèches du Néant stables | Titre "Lecteur du Vide" |
| Posséder une carte de chaque archétype d'Ère | Titre "Atlas Vivant" |

---

## Dépendances système

| Composant | Rôle dans l'exploration |
|---|---|
| [[Clipmap System]] | Streaming terrain longue distance |
| [[Terrain Manager]] | LOD et altitude |
| [[Sky Surface Renderer]] | Lecture du ciel à grande distance |
| [[Caves SDF]] | Exploration souterraine |
| [[Infinite Ocean]] / [[Water Swimming]] | Exploration maritime et sous-marine |
| [[Time Of Day]] / [[Weather System]] | Conditions visuelles d'exploration |
| [[Seasons]] | Modulateur d'événements aléatoires |
| [[Era System]] / [[Souffle System]] | Bias spawn et révélation par Ère |
| [[Entity Spawner]] | Spawn POI, faune, événements |
| [[Quest System]] | Quêtes ambiantes liées à exploration |
| [[OWS Architecture]] | Sync World State, persistance carte joueur |
| [[Global Data Service]] | Distribution des règles POI |

---

## Points de calibrage à playtester

- [ ] Densité POI majeurs 1/6 km² — sentiment "monde plein" vs "monde aéré" ?
- [ ] Rayon de révélation 250 m — assez généreux sans trivialiser ?
- [ ] Plafond 25% POI 🔴 — sentiment de mystère vs frustration ?
- [ ] Vitesses montures aériennes 14-18 m/s + endurance 10 min — utile mais pas trivialisante ?
- [ ] Tarifs cartes joueur 1 500-3 000 (Ère) — économie viable ?
- [ ] Difficulté T4 — accessible à un solo équipé T3 ou réservé groupe ?
- [ ] Durée de "vidage" d'un continent (40-80 h) — trop long pour casual / trop court pour hardcore ?

---

## Décisions actées (techniques)

- ✅ 13 continents, ~2 500 km² total, streaming clipmap 1 km
- ✅ 5 tiers de zones (T0-T4) basés sur éloignement et difficulté
- ✅ 3 niveaux de visibilité POI (🟢 / 🟡 / 🔴) alignés sur [[Vision Rules]]
- ✅ Plafond souple 25% POI 🔴 par zone (modulation +5% justifiée pilier découverte)
- ✅ Brouillard de carte avec rayon de révélation 250 m
- ✅ Cartes joueur transférables, prix plancher PNJ + marché libre
- ✅ Locomotion sans téléportation rapide bon marché (distances ressenties)
- ✅ Endurance de vol limitée (10 min réservoir)
- ✅ Spawns d'événements modulés par Ère, tension cosmique, densité joueurs
- ✅ Architecture data-driven YAML, conditions cachées en assets versionnés

---

*Liens narratifs : [[Exploration]] | [[Vision]] | [[Le Souffle]] | [[Les Ères]] | [[L'Accord]] | [[Traces des Ères]] | [[Géographie]]*
*Liens techniques : [[Vision Rules]] | [[Souffle System]] | [[Era System]] | [[Biome System]] | [[Weather System]] | [[Seasons]] | [[Time Of Day]] | [[Clipmap System]] | [[Terrain Manager]] | [[Caves SDF]] | [[Infinite Ocean]] | [[Water Swimming]] | [[Entity Spawner]] | [[Quest System]] | [[OWS Architecture]]*
