---
tags: [implementation, geography, world, continents, biomes, reference-data]
status: drafted
last_review: 2026-05-07
needs_review_for: [surfaces-continents-playtest, climats-detailles]
type: implementation
canonical_concept: "[[Géographie]]"
---

# Geography Tables — Implémentation

> Page d'implémentation technique du concept narratif **[[Géographie]]**.
> Cette page contient les **tables de référence factuelles** : continents, pays, biomes, surfaces, climats, impacts gameplay.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Géographie]].

---

## Couche d'autorité

> [!warning] Source canonique des continents/pays
> La **table maître canonique** des 12 continents (+ îles notables dont Nysaria) et de leurs nations est tenue par [[Continents/Index]].
> Toute divergence entre ce document et `Continents/Index.md` doit être résolue **en faveur de `Continents/Index.md`**.
> Les fiches détaillées par continent (`Continents/<Nom>/_Index.md`) et par nation (`Continents/<Nom>/<Nation>.md`) sont les sources canoniques pour les données politiques, démographiques et historiques de chaque entité.

Cette page **n'est pas une duplication** de `Continents/Index.md`. Elle agrège uniquement :

1. Une vue tabulaire compacte continent → nations (synchronisée sur l'index canonique).
2. Une table des biomes avec impacts gameplay (responsabilité d'implémentation).
3. Une table des caractéristiques techniques par continent (surface, climat dominant, biomes principaux).

---

## Table maître — 12 continents et leurs nations

> Synchronisée sur [[Continents/Index]] (autorité). Total : **12 continents** (+ îles notables, dont **Nysaria**, petite île au large de la côte est de Celethor), **47 nations** dont 3 zones « No Man's Land ».

| # | Continent | Nb nations | Nations |
|---|-----------|------------|---------|
| 1 | [[Alkaran/_Index\|Alkaran]] | 4 | Altram, Ferrath, Iskara, Torkam |
| 2 | [[Azoria/_Index\|Azoria]] | 5 | Azoral, Caeloria, Kethvar, No Man's Land Azoria, Solmaris |
| 3 | [[Baelor/_Index\|Baelor]] | 1 | Baelor |
| 4 | [[Celethor/_Index\|Celethor]] | 4 | Astravia, Elarian, No Man's Land Celethor, Ryldor |
| 5 | [[Cendara/_Index\|Cendara]] | 3 | Arkhen, Brumaria, Pyrevane |
| 6 | [[Cestra/_Index\|Cestra]] | 2 | No Man's Land Cestra, Noravia |
| 7 | [[Endora/_Index\|Endora]] | 3 | Avalor, Haldria, Sanvara |
| 8 | [[Evertia/_Index\|Evertia]] | 3 | Evertia, Sylvara, Thalmaris |
| 9 | [[Galenor/_Index\|Galenor]] | 7 | Kharazir, Lumasar, Seraphia, Solena, Trinoria, Valoria, Ventera |
| 10 | [[Ilthara/_Index\|Ilthara]] | 8 | Ackerna, Drakora, Gryndor, Lythar, Pyrtara, Sylthara, Vytharia (+ provinces Lunasar & Mirathi), Warenthor |
| 11 | [[Onara/_Index\|Onara]] | 4 | Elarath, Mosrack, Myrtam, Tyndara |
| 12 | [[Ulinor/_Index\|Ulinor]] | 3 | Dhalvoria, Skaldoria, Ulinor |

**Total nations** : 47

> [!note] Îles notables
> **Nysaria** n'est plus un continent : c'est une **petite île au large de la côte est de Celethor** (l'Île aux Masques, ville Nysoris ; brumes d'accès difficile). Voir [[Celethor/_Index]].
> **Lunasar** (province côtière, « Monarchie Lunaire », capitale Lunaris) et **Mirathi** (port-sanctuaire des Oracles, source du « Message de Mirathi ») sont des **provinces/dépendances de Vytharia** (Ilthara), et non plus des entités d'un « continent Nysaria ». Voir [[Ilthara/_Index]].

---

## Table des biomes (10 biomes climatiques canoniques)

> Mapping étendu (19 types — climatiques + fantasy) côté moteur : voir [[Biome System]].
> La table ci-dessous est la grille de référence **gameplay** sur les 10 biomes climatiques que le joueur rencontre.

| Biome | Code (EHWBiomeType) | Climat | Impact mouvement | Impact ressources | Impact combat / dégâts environnementaux |
|-------|---------------------|--------|------------------|-------------------|------------------------------------------|
| **Désert de glace** | IceDesert | Froid extrême, sec | Vitesse -25%, endurance -15% | Faune rare, gemmes/cristaux glaciaires | Tick froid (-2 PV/s sans abri/équipement Tier ≥ 2) |
| **Toundra** | Tundra | Froid modéré | Vitesse -10% | Mousses, herbes médicinales rares | Tick froid léger (-1 PV/s la nuit) |
| **Taïga** | Taiga | Tempéré-froid | Vitesse -5% en sous-bois | Bois (résineux), fourrures, gibier | Visibilité réduite ; embuscades faune |
| **Tempéré** | TemperateForest / Temperate | Tempéré | Aucun | Bois mixte, fruits, gibier moyen | Aucun (biome de référence) |
| **Plaine** | Plains | Tempéré-sec | Vitesse +5% | Cultures, élevage, herbes | Visibilité maximale ; faible couvert |
| **Savane** | Savanna | Chaud sec saisonnier | Aucun | Gibier de grande taille, herbes médicinales | Tick chaleur léger (-1 PV/s en plein soleil) |
| **Désert (sable)** | Desert | Chaud extrême sec | Vitesse -20%, endurance -25% | Minéraux rares, ambre | Tick chaleur (-2 PV/s sans abri) ; tempêtes de sable |
| **Tropical** | Tropical | Chaud humide | Vitesse -15% en jungle dense | Fruits exotiques, plantes magiques, faune unique | Maladies, parasites, faune agressive |
| **Marécage** | Swamp | Chaud humide stagnant | Vitesse -30% | Herbes alchimiques rares, créatures venimeuses | Maladies ; vision réduite ; piégeage terrain |
| **Volcanique** | Volcanic | Chaud sec instable | Vitesse -10% | Métaux rares, obsidienne, soufre | Tick feu zonal (-3 PV/s lave) ; bonus forge x1.25 |

**Biomes spéciaux (fantasy / Souffle)** non comptés ici, voir [[Biome System]] : CrystallineGrove, ConsciousForest, EternalMist, TemporalFaille, ShadowLands, AncientRuins, Coast, Ocean.

---

## Table des caractéristiques techniques par continent

> Surfaces estimées, climats dominants, biomes principaux. **Provisoire — playtest requis** sur la calibration des surfaces relatives.

| Continent | Surface relative | Climat dominant | Biomes principaux | Régions estimées | Statut exploration |
|-----------|------------------|-----------------|-------------------|------------------|---------------------|
| **Alkaran** | Grande | Tempéré-froid | Tempéré, Toundra, Taïga | ~14 | Civilisé, accessible |
| **Azoria** | Très grande | Polaire | Désert de glace | ~8 | Majoritairement « No Man's Land » — end-game |
| **Baelor** | Petite (île) | Mystique tempéré | Brume Éternelle, CrystallineGrove | ~3 | Mid-game, accès rituel |
| **Celethor** | Grande | Polaire à boréal | Désert de glace, Taïga | ~10 | Mixte (civilisé sud, NML nord) |
| ↳ *Nysaria (île)* | Petite (île) | Boréal-mystique | Taïga, Brume violette (EternalMist) | ~3 | Île au large côte est ; accès difficile (brumes) |
| **Cendara** | Moyenne (archipel) | Volcanique chaud | Volcanique, Tropical | ~7 | Civilisé, dangereux |
| **Cestra** | Moyenne | Polaire à toundra | Toundra, Désert de glace | ~6 | Mixte (Noravia + NML) |
| **Endora** | Grande | Continental contrasté | Désert, Plaine, Tropical | ~12 | Civilisé |
| **Evertia** | Moyenne (île) | Tempéré humide | Tempéré, ConsciousForest | ~6 | Civilisé hostile (esclavage des intrus) |
| **Galenor** | Très grande | Tempéré varié | Tempéré, Savane, Désert, Tropical, Taïga | ~24 | Civilisé, hub central |
| **Ilthara** | Très grande | Tropical magique | Tropical, EternalMist, Marécage | ~22 | Civilisé, dense (inclut Vytharia + provinces Lunasar & Mirathi) |
| **Onara** | Grande | Tempéré-froid venté | Tempéré, Taïga, Plaine | ~12 | Civilisé |
| **Ulinor** | Moyenne (archipel) | Tropical aride | Tropical, Plaine aride, Montagne | ~8 | Civilisé, mystique |

**Total régions estimées** : ~139 (cible DB : 142 régions, 509+ villes — voir [[Continents/Index]] et fiches `_Index` par continent).

---

## Mapping continents ↔ Lignées civilisationnelles

> Source canonique : [[Lignées]].

Cette page n'établit pas la correspondance — elle renvoie. Voir `Continents/<Nom>/_Index.md` champ « Lignée principale » pour chaque continent, et [[Lignées]] pour le détail des 10 lignées canoniques.

---

## Mapping biomes ↔ Ères cosmiques

> Source canonique : [[Les Ères]] §"Biomes & Ères". Implémentation : [[Biome System]] §"Mapping Biomes ↔ Ères".

Chaque Ère cosmique biaise la distribution des biomes générés (ex. ère Tempora favorise EternalMist et TemporalFaille ; ère Eldoria amplifie Volcanic). Le bias est appliqué côté `HWEnvironmentManager` via la phase `EraGenerator`. Voir [[HW Environment Manager]] pour le pipeline.

---

## Cartes de référence

Ressources visuelles dans `02 - Monde/Cartes/` :

| Fichier | Contenu |
|---------|---------|
| `Hybelior Continent.png` | Vue continents (silhouette + noms) |
| `Hybelior Pays.png` | Vue pays (frontières politiques) |
| `Hybelior biome.png` | Vue biomes (couleur par EHWBiomeType) |

Embed Obsidian : `![[Hybelior Continent.png]]` (résolution par nom court).

---

## Dépendances système

| Composant | Rôle |
|-----------|------|
| [[Biome System]] | Implémentation des 19 types de biomes (climatiques + fantasy) |
| [[HW Environment Manager]] | Application des biomes selon Ère / position |
| [[Terrain Manager]] | Génération macro-map (2048×2048) à partir des biomes |
| [[PCG Graphs]] | Population de la végétation par biome |
| [[Foliage Assets]] | Banque de végétation par biome |
| [[Weather System]] | Météo biome-dependent (tempêtes de sable, blizzards…) |
| [[Time Of Day]] | Modulation lumière par biome |

---

## Points de calibrage à playtester

- [ ] Surfaces relatives des continents — équilibre exploration vs traversée
- [ ] Tick dégâts environnementaux (froid -2 PV/s, chaleur -2 PV/s) — punition vs immersion
- [ ] Vitesse -30% en marécage — frustration vs justification
- [ ] Bonus forge x1.25 en biome Volcanique — incentive géographique
- [ ] Densité de régions par continent (~139 cible) — couverture quêtes vs charge contenu

---

## Décisions actées

- Compte canonique : **12 continents** (+ îles notables, dont Nysaria au large de Celethor), **47 nations** (incluant 3 No Man's Land).
- Source canonique structurelle : [[Continents/Index]].
- Source canonique gameplay biomes : ce document + [[Biome System]] (codes moteur).
- Source canonique mapping biome ↔ Ère : [[Les Ères]].
- Total cible DB : 142 régions, 509+ villes.

---

*Liens narratifs : [[Géographie]] | [[Continents/Index]] | [[Lignées]] | [[Cosmologie]] | [[Traces des Ères]]*
*Liens techniques : [[Biome System]] | [[HW Environment Manager]] | [[Terrain Manager]] | [[PCG Graphs]] | [[Foliage Assets]]*
