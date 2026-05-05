---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation Water HW — Presets Océan, Lac et Environnement (UDS)

> Généré automatiquement via MCP Python — UE5.4 — HybeliorWorld
> Date : 2026-04-04
> Système : HW Water (Ocean / Lake Presets), Ultra Dynamic Sky (enums/structs)

## Classes C++ associées
- [[Infinite Ocean]] — surface d'océan infinie appliquant ces `HWOceanPreset`
- [[Water Presets]] — classes C++ `UHWOceanPreset` / `UHWLakePreset`
- [[Weather System]] — UDS/UDW pilote la météo (enums `UDS_*`, structs partagées)

---

## Table des matières

1. [Architecture des presets Water HW](#1-architecture-des-presets-water-hw)
2. [Presets Océan — Échelle de Beaufort (10 presets)](#2-presets-océan--échelle-de-beaufort-10-presets)
3. [Presets Océan — Custom (4 presets)](#3-presets-océan--custom-4-presets)
4. [Presets Océan — Stylisé et Test (2 presets)](#4-presets-océan--stylisé-et-test-2-presets)
5. [Presets Lac — HWLakePreset (3 presets)](#5-presets-lac--hwlakepreset-3-presets)
6. [Structure des paramètres de vagues](#6-structure-des-paramètres-de-vagues)
7. [Enums Ultra Dynamic Sky (UDS)](#7-enums-ultra-dynamic-sky-uds)
8. [Structs UserDefined (UDS)](#8-structs-userdefined-uds)
9. [Résumé des chemins de contenu](#9-résumé-des-chemins-de-contenu)

---

## 1. Architecture des presets Water HW

### Classes impliquées

| Classe | Description | Préfixe Asset |
|--------|-------------|---------------|
| `HWOceanPreset` | Preset pour les surfaces d'océan ouvert | Tous les presets hors lac |
| `HWLakePreset` | Preset pour les lacs (ajoute `ground_caustics`) | BloodLake, TestLakePreset, 02_Beaufort_Stylized |

### Propriétés de haut niveau (membres communs)

Chaque preset expose les blocs de propriétés suivants, accessibles via `get_editor_property()` :

| Propriété | Type | Description |
|-----------|------|-------------|
| `wave_1` | `HWWaterWave_1` | Composante de vague primaire (grande longueur d'onde) |
| `wave_2` | `HWWaterWave_2` | Composante de vague secondaire |
| `wave_3` | `HWWaterWave_3` | Composante de vague tertiaire |
| `wave_4` | `HWWaterWave_4` | Composante de vague quaternaire (micro-détails) |
| `global_displacement` | `HWWaterGlobalDisplacement` | Paramètres globaux de déplacement (amplitude, vitesse, taille) |
| `base_offset` | `HWWaterBaseOffset` | Vague de fond sous-jacente |
| `surface_scattering` | Struct | Couleur de scattering, absorption, rugosité, fresnel |
| `foam` | Struct | Textures et UV de mousse et bulles |
| `folding` | Struct | Opacité mousse, boost, contraste, depth min |
| `caustics` | Struct | Brightness, scale, fade distance, parallaxe |
| `underwater` | Struct | Paramètres vue sous-marine |
| `underwater_mode` | Enum | `NONE`, `UNDERWATER`, `VOLUMETRIC_FOG` |
| `volumetric_fog` | Struct | Configuration du brouillard volumétrique |
| `procedural` | Struct | `turbulance`, `noise_tiling` |
| `refraction` | Struct | Paramètres de réfraction |
| `ggx` | Struct | Spécularité GGX |
| `rvt` | Struct | Runtime Virtual Texture |
| `mask` / `mask_underwater` | Struct | Masques de rendu |
| `flipbook` | Struct | Animation flipbook des vagues |
| `bubbles_settings` | Struct | Configuration des bulles de surface |
| `water_projection` | Struct | Projection de l'eau |
| `horizon_correction` | Struct | Correction d'horizon |
| `ground_caustics` | Struct | (Lac uniquement) Caustics sur le fond |
| `enable_wetness` | bool | Active le système de mouillure |

### Paramètres de vague individuels (structure par index)

Chaque bloc `wave_N` utilise des noms de propriétés suffixés par l'index :

| Propriété | Description |
|-----------|-------------|
| `amplitude_N` | Hauteur de crête de la vague (unités UE) |
| `speed_N` | Vitesse de propagation de la vague |
| `wave_length_N` | Longueur d'onde spatiale |
| `steepness_N` | Raideur de la vague (0.0 = sinusoïde pur, 1.0 = crête pointue) |
| `direction_N` | Direction de propagation (valeur normalisée) |

### Paramètre `base_offset` (vague de fond commune à tous les presets)

Tous les presets partagent les mêmes valeurs de base_offset :

| Paramètre | Valeur |
|-----------|--------|
| `amplitude` | 80.0 |
| `steepness` | 1.0 |
| `speed` | 1500.0 |
| `wave_length` | 16384.0 |
| `direction` | 0.4 |
| `direction_offset` | 0.5 |
| `direction_offset2` | 0.75 |

---

## 2. Presets Océan — Échelle de Beaufort (10 presets)

**Chemin :** `/Game/Environment/Water/Presets/Beaufort/`
**Classe :** `HWOceanPreset`

Les presets Beaufort modélisent les conditions météorologiques marines selon l'échelle de Beaufort internationale (force 0 à 9). Le facteur discriminant principal est `global_displacement` qui contrôle l'amplitude visuelle globale, la taille effective des vagues et la vitesse de défilement du pattern.

### 2.1 Paramètres de vagues fixes (communs à tous les presets Beaufort)

Les quatre composantes de vague partagent les mêmes valeurs de base entre les presets. La différenciation s'opère uniquement via `global_displacement`.

| Composante | Amplitude | Vitesse | Longueur d'onde | Raideur | Direction |
|------------|-----------|---------|-----------------|---------|-----------|
| Wave 1 | 50.0 | 1000.0 | 8192.0 | 1.0 | 0.425 |
| Wave 2 | 20.0 | 1000.0 | 4096.0 | 1.0 | — |
| Wave 3 | 10.0 | 500.0 | 2048.0 | 1.0 | — |
| Wave 4 | 5.0 | 250.0 | 1024.0–2048.0 | 1.0 | — |

> Note : Wave 4 utilise `wave_length = 2048.0` pour les forces 0 à 5, et `1024.0` pour les forces 6 à 9.

### 2.2 Paramètres `global_displacement` — Tableau comparatif

Le bloc `global_displacement` est le principal vecteur de différenciation entre les forces. Les paramètres `global_amplitude` et `size_m` croissent de manière significative avec la force.

| Force | Nom Asset | Description FR | `global_amplitude` | `global_speed` | `size_m` | `overall_length` |
|-------|-----------|----------------|--------------------|----------------|----------|------------------|
| 0 | `00_Beaufort_Calm` | Calme — mer comme un miroir | 0.25 | 0.50 | 4.0 | 1.0 |
| 1 | `01_Beaufort_LightAir` | Air léger — ondulations sans crêtes | 0.35 | 0.75 | 4.0 | 1.0 |
| 2 | `02_Beaufort_LightBreeze` | Légère brise — petits flots | 0.50 | 0.85 | 6.0 | 1.0 |
| 3 | `03_Beaufort_GentleBreeze` | Petite brise — moutons apparaissent | 0.70 | 0.90 | 6.0 | 1.0 |
| 4 | `04_Beaufort_ModerateBreeze` | Jolie brise — vagues courtes | 0.85 | 1.00 | 6.0 | 1.0 |
| 5 | `05_Beaufort_FreshBreeze` | Bonne brise — vagues modérées | 0.90 | 0.75 | 7.0 | 1.0 |
| 6 | `06_Beaufort_StrongBreeze` | Vent frais — grosses vagues | 1.00 | 1.00 | 8.0 | 1.0 |
| 7 | `07_Beaufort_NearGale` | Grand frais — vagues déferlantes | 1.25 | 0.80 | 10.0 | 1.0 |
| 8 | `08_Beaufort_FreshGale` | Coup de vent — crêtes en écume | 2.00 | 0.70 | 12.0 | 1.5 |
| 9 | `09_Beaufort_SevereGale` | Fort coup de vent — très grosses vagues | 6.00 | 0.70 | 16.0 | 4.0 |

**Paramètres constants :** `choppiness = 3.0`, `global_wave_direction = 1.0` pour tous les presets.

### 2.3 Observations et usages recommandés

- **Forces 0–3** : Zones côtières protégées, lagons, ports abrités. Amplitude visuelle très faible.
- **Forces 4–6** : Océan ouvert en conditions normales. Amplitude 0.85–1.0, taille effective 6–8m.
- **Forces 7–8** : Conditions tempétueuses. Augmentation notable du `size_m` (10–12m), légère réduction de vitesse pour simuler la lourdeur des vagues.
- **Force 9** : Conditions extrêmes / événements narratifs. `global_amplitude = 6.0`, `size_m = 16.0`, `overall_length = 4.0` — déformation très marquée du mesh.

---

## 3. Presets Océan — Custom (4 presets)

**Chemin :** `/Game/Environment/Water/Presets/Custom/`
**Classe :** `HWOceanPreset`

Ces presets sont des créations originales HybeliorWorld, dérivées des Beaufort standards avec modifications visuelles (couleur, scattering) pour des effets narratifs spéciaux.

### 3.1 BloodOcean

**Chemin :** `/Game/Environment/Water/Presets/Custom/BloodOcean`

Océan aux teintes sombres et profondes — zone maudite ou surnaturelle. Couleur bleu-nuit très désaturée.

| Paramètre | Valeur |
|-----------|--------|
| `global_amplitude` | 1.0 |
| `global_speed` | 1.0 |
| `size_m` | 8.0 |
| `choppiness` | 3.0 |
| Scattering (RGB) | (0.0037, 0.1248, 0.2232) — bleu nuit profond |
| Absorption (RGB) | (20.0, 30.0, 25.0) — forte absorption |
| `water_roughness` | 0.05 |

> Usage : Zones de mort, malédictions maritimes, approches de donjons sous-marins.

### 3.2 BloodOcean1

**Chemin :** `/Game/Environment/Water/Presets/Custom/BloodOcean1`

Variante rouge sang intense — teintes chaudes pour un effet de bain de sang ou source magique corrompue.

| Paramètre | Valeur |
|-----------|--------|
| `global_amplitude` | 1.0 |
| `global_speed` | 1.0 |
| `size_m` | 8.0 |
| `choppiness` | 3.0 |
| Scattering (RGB) | (0.200, 0.000, 0.005) — rouge vif dominant |
| Absorption (RGB) | (30.0, 15.0, 8.0) — absorption forte, biais rouge |
| `water_roughness` | 0.075 (légèrement plus rugueux) |

> Usage : Rituels, volcans sous-marins, sources de corruptions élémentaires.

### 3.3 RealColor_Hurican

**Chemin :** `/Game/Environment/Water/Presets/Custom/RealColor_Hurican`

Ouragan en couleurs réalistes — basé sur les valeurs de force 9 Beaufort avec scattering neutre (eau naturelle).

| Paramètre | Valeur |
|-----------|--------|
| `global_amplitude` | 6.0 (identique à B9) |
| `global_speed` | 0.7 |
| `size_m` | 16.0 |
| `choppiness` | 3.0 |
| Scattering (RGB) | (1.0, 1.0, 1.0) — blanc neutre (laisse le matériau calculer) |
| Absorption (RGB) | (2.0, 2.0, 2.0) — absorption faible |
| `water_roughness` | 0.05 |

> Usage : Tempêtes narratives majeures, événements météo extrêmes PvE.

### 3.4 RealColor_Beaufort_LightBreeze

**Chemin :** `/Game/Environment/Water/Presets/Custom/RealColor_Beaufort_LightBreeze`

Légère brise en couleurs réalistes — eau grise-bleue naturelle avec rendu photoréaliste.

| Paramètre | Valeur |
|-----------|--------|
| `global_amplitude` | 0.5 (équivalent B2) |
| `global_speed` | 0.85 |
| `size_m` | 6.0 |
| `choppiness` | 3.0 |
| Scattering (RGB) | (0.1615, 0.1615, 0.1615) — gris neutre |
| Absorption (RGB) | (28.75, 29.25, 30.0) — absorption maximale, eau très claire |
| `water_roughness` | 0.05 |

> Usage : Zones côtières ouvertes, traversées maritimes standard, zones hub.

---

## 4. Presets Océan — Stylisé et Test (2 presets)

### 4.1 06_Beaufort_Stylized

**Chemin :** `/Game/Environment/Water/Presets/Stylized/06_Beaufort_Stylized`
**Classe :** `HWOceanPreset`

Version stylisée de la force 6 Beaufort — rendu cartoon/fantastique sans réalisme physique.

| Paramètre | Valeur |
|-----------|--------|
| `global_amplitude` | 1.0 |
| `global_speed` | 1.0 |
| `size_m` | 8.0 |
| `choppiness` | 3.0 |

### 4.2 TestOceanPreset

**Chemin :** `/Game/Environment/Water/Presets/Ocean/TestOceanPreset`
**Classe :** `HWOceanPreset`

Preset de test — valeurs par défaut du plugin, à ne pas utiliser en production.

| Paramètre | Valeur |
|-----------|--------|
| `global_amplitude` | 1.0 |
| `global_speed` | 1.0 |
| `size_m` | 8.0 |
| `choppiness` | 3.0 |

---

## 5. Presets Lac — HWLakePreset (3 presets)

**Chemin :** `/Game/Environment/Water/Presets/` (Custom/ et Lake/ et Stylized/)
**Classe :** `HWLakePreset`

La classe `HWLakePreset` étend `HWOceanPreset` en ajoutant la propriété `ground_caustics` — caustics projetés sur le fond du lac (absent des presets océan).

### Paramètres communs (Wave 1 — identiques pour tous les lacs)

| Composante | Amplitude | Vitesse | Longueur d'onde | Raideur | Direction |
|------------|-----------|---------|-----------------|---------|-----------|
| Wave 1 | 50.0 | 1000.0 | 8192.0 | 1.0 | 0.425 |
| Wave 2 | 20.0 | 1000.0 | 4096.0 | 1.0 | — |
| Wave 3 | 10.0 | 500.0 | 2048.0 | 1.0 | — |
| Wave 4 | 5.0 | 250.0 | 1024.0 | 1.0 | — |

### 5.1 BloodLake

**Chemin :** `/Game/Environment/Water/Presets/Custom/BloodLake`

Lac aux teintes sombres (identique au scattering de BloodOcean) — version plan d'eau fermé.

| Paramètre | Valeur |
|-----------|--------|
| `global_amplitude` | 1.0 |
| `global_speed` | 1.0 |
| `size_m` | 8.0 |
| `choppiness` | 3.0 |
| Scattering (RGB) | (0.0037, 0.1248, 0.2232) — bleu nuit |
| Absorption (RGB) | (20.0, 30.0, 25.0) |
| `water_roughness` | 0.05 |

> Usage : Lacs maudits, sources d'eau sombre, plans d'eau dans zones de malédiction.

### 5.2 TestLakePreset

**Chemin :** `/Game/Environment/Water/Presets/Lake/TestLakePreset`

Preset de test lac — valeurs identiques à BloodLake, à remplacer par un preset définitif.

| Paramètre | Valeur |
|-----------|--------|
| `global_amplitude` | 1.0 |
| `global_speed` | 1.0 |
| `size_m` | 8.0 |
| Scattering (RGB) | (0.0037, 0.1248, 0.2232) |

### 5.3 02_Beaufort_Stylized (Lac)

**Chemin :** `/Game/Environment/Water/Presets/Stylized/02_Beaufort_Stylized`

Version stylisée d'un lac calme — rendu non-réaliste, force 2 Beaufort en plan d'eau fermé.

| Paramètre | Valeur |
|-----------|--------|
| `global_amplitude` | 1.0 |
| `global_speed` | 1.0 |
| `size_m` | 8.0 |
| Scattering (RGB) | (0.0037, 0.1248, 0.2232) |

---

## 6. Structure des paramètres de vagues

### 6.1 Bloc `global_displacement`

Ce bloc est le principal levier de contrôle de l'intensité visuelle globale. Il agit comme un multiplicateur appliqué à toutes les composantes de vague.

| Propriété | Description | Plage observée |
|-----------|-------------|----------------|
| `global_amplitude` | Multiplicateur d'amplitude global | 0.25 (calme) — 6.0 (ouragan) |
| `global_speed` | Multiplicateur de vitesse global | 0.5 — 1.0 |
| `global_wave_direction` | Direction globale des vagues | 1.0 (constant) |
| `overall_length` | Facteur d'allongement des vagues | 1.0 — 4.0 |
| `size_m` | Taille effective des vagues en mètres | 4.0 — 16.0 |
| `choppiness` | Raideur globale / aspect haché | 3.0 (constant) |

### 6.2 Bloc `surface_scattering`

Contrôle la couleur visuelle de la surface de l'eau.

| Propriété | Description |
|-----------|-------------|
| `scattering` | LinearColor — couleur de diffusion de la lumière dans l'eau |
| `scattering_far` | LinearColor — scattering à grande distance |
| `absorption` | LinearColor — absorption de la lumière (RGB + A = profondeur) |
| `absorption_far` | LinearColor — absorption distante |
| `water_roughness` | Rugosité de surface (0.05–0.075 observé) |
| `water_specular` | Intensité spéculaire |
| `water_fresnel_roughness` | Rugosité dans la réflexion de Fresnel |
| `water_fresnel_specular` | Spécularité de Fresnel |
| `water_fresnel_exponenth` | Exposant de l'équation de Fresnel |
| `surface_scattering_intensity` | Intensité du scattering de surface |
| `surface_scattering_power` | Puissance de l'exposant de scattering |
| `phase_g_high` / `phase_g_low` | Paramètres de phase de Henyey-Greenstein |
| `top_down_exp` | Exposant de vue top-down |

### 6.3 Bloc `caustics`

| Propriété | Description |
|-----------|-------------|
| `caustics_brightness` | Intensité des caustics |
| `caustics_scale` | Échelle du pattern de caustics |
| `caustics_fade_in_distance` | Distance d'apparition des caustics |
| `fade_distance` | Distance de disparition |
| `light_parallax` | Effet de parallaxe lumineuse |
| `multiply_refraction` | Multiplie l'effet de réfraction |
| `t_caustics` | Texture de caustics |

### 6.4 Bloc `folding` (écume de déferlement)

| Propriété | Description |
|-----------|-------------|
| `foam_opacity` | Opacité de la mousse (0.5 par défaut) |
| `foam_boost` | Intensité de la mousse (1.0 par défaut) |
| `foam_contrast` | Contraste du pattern de mousse |
| `foam_depth_min` | Profondeur minimum pour l'apparition (500.0 par défaut) |
| `foam_power` | Exposant de la mousse |
| `foam_roughness` | Rugosité de la surface de mousse |
| `foam_emissive_low/high` | Plage d'émissivité de la mousse |
| `scattered_luminance` | Luminance diffusée par la mousse |
| `smooth_min/max` | Limites de lissage du déferlement |

---

## 7. Enums Ultra Dynamic Sky (UDS)

**Chemin :** `/Game/Environment/Sky/Blueprints/Enum/`
**Classe :** `UserDefinedEnum`
**Plugin :** Ultra Dynamic Sky (UDS) — système de ciel et météo dynamique.

### 7.1 Liste complète des enums

| Nom Asset | Rôle fonctionnel | Chemin |
|-----------|------------------|--------|
| `UDS_SkyMode` | Mode de rendu du ciel (atmosphère, HDRI, statique, etc.) | `/Enum/UDS_SkyMode` |
| `UDS_SeasonMode` | Saisons (printemps, été, automne, hiver, cycle automatique) | `/Enum/UDS_SeasonMode` |
| `UDS_Weather_Override_Mode` | Mode de forçage météo (automatique, manuel, volume) | `/Enum/UDS_Weather_Override_Mode` |
| `UDS_Weather_Display_Names` | Noms d'affichage des types de météo | `/Enum/UDS_Weather_Display_Names` |
| `UDS_TemperatureType` | Unité de température (Celsius, Fahrenheit, Kelvin) | `/Enum/UDS_TemperatureType` |
| `UDS_FogColorMode` | Mode de couleur du brouillard (automatique, manuel, scattering) | `/Enum/UDS_FogColorMode` |
| `UDS_SkyLightMode` | Mode de la sky light (capture temps réel, baked, mixte) | `/Enum/UDS_SkyLightMode` |
| `UDS_FeatureToggle` | Activation/désactivation de features (On, Off, Auto) | `/Enum/UDS_FeatureToggle` |
| `UDS_VolRT_Mode` | Mode du Volumetric Ray Tracing | `/Enum/UDS_VolRT_Mode` |
| `UDS_PropertyType` | Type de propriété exposée dans les interfaces BP | `/Enum/UDS_PropertyType` |
| `UDS_Occlusion_Mode` | Mode d'occlusion des volumes météo | `/Enum/UDS_Occlusion_Mode` |
| `UDS_OcclusionShape` | Forme des volumes d'occlusion (sphère, boîte, capsule) | `/Enum/UDS_OcclusionShape` |
| `UDS_NoiseType` | Type de bruit utilisé pour les nuages procéduraux | `/Enum/UDS_NoiseType` |
| `UDS_LensFlareType` | Type de lens flare du soleil | `/Enum/UDS_LensFlareType` |
| `UDS_DLWE_Mode` | Mode du système DLWE (Dynamic Lighting Weather Effects) | `/Enum/UDS_DLWE_Mode` |
| `UDS_ControlPointMode` | Mode des points de contrôle de trajectoire solaire | `/Enum/UDS_ControlPointMode` |
| `UDS_ColorMode` | Mode de calcul des couleurs de l'atmosphère | `/Enum/UDS_ColorMode` |
| `UDS_CityPresets` | Presets de localisation géographique (coordonnées solaires) | `/Enum/UDS_CityPresets` |
| `UDS_CachedProperties` | Propriétés mises en cache pour les performances | `/Enum/UDS_CachedProperties` |
| `UDW_CachedProperties` | Propriétés Weather mises en cache (UDW = Ultra Dynamic Weather) | `/Enum/UDW_CachedProperties` |
| `UDS_Weather_Mask_Brush` | Pinceau de masque météo (formes et patterns) | `/Enum/UDS_Weather_Mask_Brush` |

### 7.2 Enums les plus utilisés en Blueprint

Les enums suivants sont les plus référencés dans les Blueprints `Ultra_Dynamic_Sky` et `Ultra_Dynamic_Weather` :

**UDS_SkyMode** — Modes de ciel disponibles :
- Mode atmosphère physique (Unreal Atmospheric Scattering)
- Mode HDRI (ciel statique via texture cubemap)
- Mode statique (pas de cycle jour/nuit)
- Mode dynamique (cycle complet avec lerp)

**UDS_SeasonMode** — Contrôle visuel des saisons :
- Printemps / Été / Automne / Hiver (4 états)
- Mode automatique (progression selon calendrier in-game)

**UDS_Weather_Override_Mode** — Contrôle de la météo :
- `Auto` : météo générée aléatoirement selon les paramètres
- `Manual` : météo forcée via propriété directe
- `Volume` : météo contrôlée par un `Weather_Override_Volume` dans la scène

---

## 8. Structs UserDefined (UDS)

**Chemin :** `/Game/Environment/Sky/Blueprints/System/`
**Classe :** `UserDefinedStruct`

### 8.1 UDS_Post_Process_Stage

**Chemin :** `/Game/Environment/Sky/Blueprints/System/UDS_Post_Process_Stage`

Struct décrivant un stage de post-processing dans le pipeline UDS. Utilisé pour enchaîner les effets de post-process liés aux conditions météorologiques (pluie sur l'objectif, brume, etc.).

Membres accessibles via l'interface Blueprint — structure interne non exposée via Python API (UserDefinedStruct sans propriétés réflexives).

### 8.2 UDS_and_UDW_State

**Chemin :** `/Game/Environment/Sky/Blueprints/System/UDS_and_UDW_State`

Struct d'état partagé entre Ultra Dynamic Sky (UDS) et Ultra Dynamic Weather (UDW). Capture l'état courant du système (heure, météo active, saison, intensité de chaque paramètre) pour la sauvegarde et la réplication réseau.

Usage HybeliorWorld : utilisé pour synchroniser les conditions environnementales entre le serveur OWS et les clients UE5.

### 8.3 RandomWeatherVariation_State

**Chemin :** `/Game/Environment/Sky/Blueprints/System/RandomWeatherVariation_State`

Struct d'état pour le système de variations météo aléatoires. Stocke les paramètres de la variation en cours (durée, intensité cible, courbe de transition) pour permettre des transitions fluides entre états météo.

---

## 9. Résumé des chemins de contenu

### Presets Water HW

```
/Game/Environment/Water/
├── Presets/
│   ├── Beaufort/          (10 presets HWOceanPreset — forces 0 à 9)
│   │   ├── 00_Beaufort_Calm
│   │   ├── 01_Beaufort_LightAir
│   │   ├── 02_Beaufort_LightBreeze
│   │   ├── 03_Beaufort_GentleBreeze
│   │   ├── 04_Beaufort_ModerateBreeze
│   │   ├── 05_Beaufort_FreshBreeze
│   │   ├── 06_Beaufort_StrongBreeze
│   │   ├── 07_Beaufort_NearGale
│   │   ├── 08_Beaufort_FreshGale
│   │   └── 09_Beaufort_SevereGale
│   ├── Custom/            (4 presets narratifs HybeliorWorld)
│   │   ├── BloodOcean           (HWOceanPreset)
│   │   ├── BloodOcean1          (HWOceanPreset)
│   │   ├── RealColor_Hurican    (HWOceanPreset)
│   │   ├── RealColor_Beaufort_LightBreeze (HWOceanPreset)
│   │   └── BloodLake            (HWLakePreset)
│   ├── Lake/              (1 preset lac de test)
│   │   └── TestLakePreset       (HWLakePreset)
│   ├── Ocean/             (1 preset océan de test)
│   │   └── TestOceanPreset      (HWOceanPreset)
│   └── Stylized/          (2 presets stylisés)
│       ├── 06_Beaufort_Stylized (HWOceanPreset)
│       └── 02_Beaufort_Stylized (HWLakePreset)
```

### Environnement Ultra Dynamic Sky (UDS)

```
/Game/Environment/Sky/
├── Blueprints/
│   ├── Enum/              (21 UserDefinedEnum)
│   └── System/            (3 UserDefinedStruct)
```

### Matériaux et paramètres

```
/Game/Environment/Sky/
├── UltraDynamicWeather_Parameters  (MaterialParameterCollection)
```

---

## Notes d'implémentation

### Recommandations d'usage

1. **Transitions météo** : Utiliser `lerp_preset` sur `UHWOceanPreset` pour interpoler entre presets. Préférer B3 → B7 pour une tempête progressive.
2. **Presets narratifs** : `BloodOcean1` (rouge) et `BloodOcean` (bleu sombre) se distinguent par leur canal de scattering. Ne pas les utiliser avec UDS en mode réaliste.
3. **Lac vs Océan** : Toujours utiliser `UHWLakePreset` pour les plans d'eau fermés — le `ground_caustics` améliore significativement la lisibilité des fonds peu profonds.
4. **Force 9 uniquement pour événements** : `global_amplitude = 6.0` et `size_m = 16.0` imposent un coût GPU élevé. À réserver aux séquences scriptées ou cinématiques.
5. **RealColor vs Standard** : Les presets `RealColor_*` utilisent un scattering calculé (valeurs neutres ou grises), laissant le matériau base calculer la couleur. Les presets standard Beaufort utilisent aussi le scattering neutre blanc — la différenciation est uniquement physique (amplitude/vitesse).
