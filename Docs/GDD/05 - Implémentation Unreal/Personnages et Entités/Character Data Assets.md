---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MCP — Character Data Assets (Système Apparel)

> **Généré via MCP Python · Unreal Editor 5.4**
> Date : 2026-04-04
> Source : `/Game/Assets/CharacterEditorModify/` → **Déplacé vers `/Game/Assets/Characters/HW/` le 2026-04-07**

## Classes C++ associées
- [[HW Character]] — structs `FHWCharacterAppearanceCE` / `FHWMaterialSet` référencées par les CDA
- [[Character Appearance]] — pipeline d'application de l'apparence (morph targets, matériaux)
- [[Character Customization]] — système de personnalisation consommateur des CDA

### Changelog
| Date | Modification |
|------|-------------|
| 2026-04-07 | Assets relocalisés de `CharacterEditorModify/` vers `Content/Assets/Characters/HW/`. CharacterEditorModify/ SUPPRIME. UHWCharacterCustomComponent SUPPRIME (structs conservées dans HWCharacter.h). Chemins Content Browser mis à jour. |

---

## Vue d'ensemble

Le système **Apparel** de HybeliorWorld repose sur des **Character Data Assets (CDA)**, des Blueprint instances héritant de classes de base spécialisées par slot vestimentaire. Chaque CDA encapsule un SkeletalMesh, un nom d'affichage localisé, une vignette Texture2D et une liste de variantes matériaux (`F_CDA_MaterialVariant`).

> **2026-04-07 :** Les 104 CDA ont été déplacés de `CharacterEditorModify/` vers `Content/Assets/Characters/HW/CharacterParts/DataAssets/`. Le composant `UHWCharacterCustomComponent` qui consommait ces CDA a été supprimé. Les CDA restent disponibles pour un futur système de customisation.

### Inventaire global

| Type de CDA | Classe Blueprint | Nb CDA | Enfant | Féminin | Masculin | Mixte |
|---|---|:---:|:---:|:---:|:---:|:---:|
| Haut du corps | `BP_CDA_Apparel_UpperBody` | **19** | 6 | 5 | 8 | — |
| Coiffure (tête) | `BP_CDA_Hairstyle_Head` | **18** | 6 | 5 | 7 | — |
| Chaussures | `BP_CDA_Apparel_Feet` | **14** | 5 | 5 | 3 | 1 |
| Chapeaux | `BP_CDA_Apparel_Hat` | **14** | 5 | 4 | 5 | — |
| Bas du corps | `BP_CDA_Apparel_LowerBody` | **11** | 2 | 5 | 4 | — |
| Chaussettes / Collants | `BP_CDA_Apparel_Socks` | **10** | 4 | 2 | 4 | — |
| Accessoires | `BP_CDA_Apparel_Accessory` | **8** | 4 | 4 | — | — |
| Lunettes | `BP_CDA_Apparel_Glasses` | **7** | 1 | 3 | 3 | — |
| Barbes | `BP_CDA_Hairstyle_Beard` | **2** | — | — | 2 | — |
| Attachements (main) | `BP_CDA_Attachment_SingleHanded` | **1** | — | — | — | 1 |
| **TOTAL** | | **104** | **33** | **33** | **36** | **2** |

> **Convention de nommage des préfixes anatomiques :**
> - `child_` — anatomie enfant
> - `fe_` — anatomie féminine adulte
> - `ma_` — anatomie masculine adulte
> - (sans préfixe ou `child_ma_`/`child_fe_`) — partagé entre genres

---

## Structure d'un CDA

### Propriétés communes (classe `BP_CDA_Apparel`)

| Propriété | Type | Description |
|---|---|---|
| `DisplayName` | `FText` | Nom localisé affiché dans le Character Editor |
| `SkeletalMesh` | `USkeletalMesh*` | Mesh squelettique du vêtement/accessoire |
| `MaterialVariants` | `TArray<F_CDA_MaterialVariant>` | Liste des coloris/matériaux disponibles |
| `Thumbnail` | `UTexture2D*` | Vignette affichée dans le picker UI |

### Structure `F_CDA_MaterialVariant`

Chaque entrée du tableau `MaterialVariants` contient :

| Champ (export text) | Description |
|---|---|
| `DisplayName_*` | Label du coloris (texte localisé, ex. : "Dark", "Red", "Stripes_yellow") |
| `Thumbnail_*` | Couleur RGBA de prévisualisation (souvent vide = noir par défaut) |
| `Materials_*` | Array de `MaterialInstanceConstant` — chemin vers le MI dans `/CharacterParts/Materials/` |

> Les clés de champ contiennent un hash GUID généré par UE5 (ex. `DisplayName_21_290F90624A016C2458F750935512351D`). L'accès programmatique se fait via `export_text()` sur le struct.

---

## Chemins dans le Content Browser

> **2026-04-07 :** Nouvelle arborescence après réorganisation. L'ancien chemin `CharacterEditorModify/` est supprimé.

```
/Game/Assets/Characters/HW/
├── Base/                               ← 7 meshes, 57 materials, 10 MF, 41 textures, 36 animations
├── CharacterParts/
│   ├── DataAssets/                     ← 104 instances CDA par catégorie
│   │   ├── Accessories/
│   │   ├── Attachments/
│   │   ├── Feet/
│   │   ├── Glasses/
│   │   ├── Hairstyles/
│   │   ├── Hats/
│   │   ├── LowerBody/
│   │   ├── Socks/
│   │   └── UpperBody/
│   ├── Materials/                     ← 182 MaterialInstanceConstants (MI_*)
│   ├── Meshes/                        ← 114 SkeletalMeshes (SK_*)
│   └── Thumbnails/                    ← 289 Texture2D vignettes
├── Armor/                              ← 3588 assets (ex-ROG Modular Armor, meshes/materials/textures only)
├── DataTables/                         ← DT_AnatomyProfiles, DT_PresetCustomizationProfiles, etc.
├── Structures/                         ← 30 files
└── Enumerations/                       ← 15 files
```

---

## Catalogue détaillé par type

---

### 1. Haut du corps — `BP_CDA_Apparel_UpperBody` (19 CDA)

| Asset | Nom affiché | Mesh SK | Variantes mat. | Coloris |
|---|---|---|:---:|---|
| `CDA_child_chest_dress` | Dress | `SK_child_dress_collar` | 3 | Dark, Yellow, (dots) |
| `CDA_child_chest_hoody` | Hoody | `SK_child_hoody_open` | 3 | Dark, Yellow, (dark) |
| `CDA_child_chest_overall` | Overall | `SK_child_overall` | 3 | Dark, Yellow, (overall) |
| `CDA_child_chest_shirt` | Shirt | `SK_child_shirt` | 4 | Dark, Stripes_yellow, Red, (—) |
| `CDA_child_chest_shirt_open` | Shirt Open | `SK_child_longshirt_open` | 4 | Dark, Stripes_yellow, Red, (—) |
| `CDA_child_chest_vest_shirt` | Vest Shirt | `SK_child_vest_shirt` | 3 | Dark, Stripes_yellow, Red |
| `CDA_fe_chest_shirt_longsleve` | Longsleve | `SK_fe_chest_shirt_longsleve` | 5 | Dark, Stripes_yellow, Red, (wool b), (wool c) |
| `CDA_fe_chest_shirt_short` | Shirt | `SK_fe_chest_shirt_short` | 5 | Dark, Stripes_yellow, Red, (wool b), (wool c) |
| `CDA_fe_chest_shirt_v_neck` | Shirt V Neck | `SK_fe_chest_shirt_v_neck` | 5 | Dark, Stripes_yellow, Red, (wool b), (wool c) |
| `CDA_fe_chest_tanktop` | Tanktop | `SK_fe_chest_tanktop` | 3 | Dark, Red, Yellow |
| `CDA_fe_chest_tanktop_waist_sweater` | Tanktop Sweater | `SK_fe_chest_tanktop_sweater_waist` | 3 | Dark, Red, Yellow |
| `CDA_ma_chest_business_a` | Business A | `SK_ma_chest_business_a` | 2 | Blue, (grey) |
| `CDA_ma_chest_business_b` | Business B | `SK_ma_chest_business_b` | 2 | (dark_yellow1), (bright) |
| `CDA_ma_chest_hoody` | Hoody | `SK_ma_hoody_closed` | 3 | Dark, Yellow, (dark) |
| `CDA_ma_chest_hoody_cap` | Hoody Cap | `SK_ma_hoody_over_head` | 3 | Dark, Yellow, (dark) |
| `CDA_ma_chest_longsleeve_casual` | Longsleeve Casual | `SK_ma_chest_longsleeve_casual` | 3 | Dark, Red, (stripes) |
| `CDA_ma_chest_shirt_casual_b` | Shirt Casual | `SK_ma_chest_shirt_casual_b` | 5 | Dark, Yellow, Blue, (stripes), (wool) |
| `CDA_ma_chest_shirt_open_a` | Shirt Open | `SK_ma_chest_shirt_open` | 4 | Dark, Stripes_yellow, Red, (—) |
| `CDA_ma_tanktop` | Tanktop | `SK_ma_chest_tanktop` | 2 | Grey, Dark |

---

### 2. Coiffures (tête) — `BP_CDA_Hairstyle_Head` (18 CDA)

> Les hairstyles ne possèdent pas de variantes matériaux (`MaterialVariants` absent). La couleur de cheveux est gérée par d'autres systèmes (morphs ou paramètres de matériau global).

| Asset | Nom affiché | Mesh SK | Anatomie |
|---|---|---|---|
| `CDA_child_hair_afro` | Afro | `SK_child_hair_afro` | Enfant |
| `CDA_child_hair_long` | Long | `SK_child_hair_long` | Enfant |
| `CDA_child_hair_ponytail` | Ponytail | `SK_child_fe_hair_ponytail` | Enfant |
| `CDA_child_hair_short` | Short | `SK_child_hair_short` | Enfant |
| `CDA_child_hair_surfer` | Surfer | `SK_child_hair_surfer` | Enfant |
| `CDA_child_hair_the_bob` | The Bob | `SK_child_fe_hair` | Enfant |
| `CDA_fe_hair_a_line_bob` | A Line Bob | `SK_fe_hair_a_line_bob` | Féminin |
| `CDA_fe_hair_long2` | Beach | `SK_fe_hair_beach` | Féminin |
| `CDA_fe_hair_medium` | Medium | `SK_fe_hair_bob` | Féminin |
| `CDA_fe_hair_short` | Short | `SK_fe_hair_punky` | Féminin |
| `CDA_fe_hair_the_bob` | The Bob | `SK_fe_hair_the_bob` | Féminin |
| `CDA_ma_hair_long` | Long | `SK_ma_hair_long` | Masculin |
| `CDA_ma_hair_modern_side` | Modern Side | `SK_ma_hair_modern_side` | Masculin |
| `CDA_ma_hair_old` | Old | `SK_ma_hair_old` | Masculin |
| `CDA_ma_hair_spiky_short` | Spiky Short | `SK_ma_hair_spiky_short` | Masculin |
| `CDA_ma_hair_surfer` | Surfer | `SK_ma_hair_surfer` | Masculin |
| `CDA_ma_hair_tough` | Tough | `SK_ma_hair_tough` | Masculin |
| `CDA_ma_hair_used_look` | Used Look | `SK_ma_hair_used_look` | Masculin |

---

### 3. Chaussures — `BP_CDA_Apparel_Feet` (14 CDA)

| Asset | Nom affiché | Mesh SK | Variantes | Coloris |
|---|---|---|:---:|---|
| `CDA_child_feet_boot_casual` | Casual Boots | `SK_child_feet_boot_casual` | 0 | — |
| `CDA_child_feet_clean` | Clean | `SK_child_feet_clean` | 0 | — |
| `CDA_child_feet_sandals` | Sandals | `SK_child_feet_sandals` | 0 | — |
| `CDA_child_feet_sneaker` | Sneaker | `SK_child_feet_sneaker` | 3 | Dark, (red_white), Yellow |
| `CDA_child_feet_sport` | Sport | `SK_child_feet_sport` | 0 | — |
| `CDA_fe_feet_boot_casual` | Casual | `SK_fe_feet_boot_casual` | 0 | — |
| `CDA_fe_feet_boot_high` | High Boots | `SK_fe_boot_01_a` | 5 | Grey, Red, (fine), Dark Croc, Beige |
| `CDA_fe_feet_highheels` | High Heels | `SK_fe_feet_highheels_02` | 0 | — |
| `CDA_fe_feet_sandals` | Sandals | `SK_fe_feet_sandals` | 2 | (bright), (red) |
| `CDA_fe_feet_sneaker` | Sneaker | `SK_fe_feet_sneaker` | 3 | Dark, (red_white), Yellow |
| `CDA_ma_feet_boot_casual` | Casual Boots | `SK_ma_feet_boot_casual` | 0 | — |
| `CDA_ma_feet_sandals` | Sandals | `SK_ma_feet_sandals` | 0 | — |
| `CDA_ma_feet_sneaker` | Sneaker | `SK_ma_feet_shoe_sneaker` | 3 | Dark, (red_white), Yellow |
| `ma_feet_business` | Business | `SK_ma_feet_business` | 0 | — |

> **Note :** `ma_feet_business` ne respecte pas la convention de nommage `CDA_` — il manque le préfixe.

---

### 4. Chapeaux — `BP_CDA_Apparel_Hat` (14 CDA)

| Asset | Nom affiché | Mesh SK | Variantes | Coloris |
|---|---|---|:---:|---|
| `CDA_child_fe_hat_summer` | Summer Hat | `SK_child_fe_hat_summer` | 2 | (summer_01), (bright_yellow) |
| `CDA_child_hat_beenie` | Beenie | `SK_child_hat_benee` | 0 | — |
| `CDA_child_hat_cap` | Cap | `SK_child_hat_cap` | 2 | (darkblue), (brownblue) |
| `CDA_child_hat_country` | Country | `SK_child_hat_country` | 2 | (dark), (purple) |
| `CDA_child_ma_hat_summer` | Cap | `SK_child_ma_hat_summer` | 2 | (darkblue), (bright_yellow) |
| `CDA_fe_hat_basecap_sport` | Basecap Sport | `fe_hat_basecap_sport` | 2 | (darkblue), (brownblue) |
| `CDA_fe_hat_benee` | Benee | `fe_hat_benee` | 0 | — |
| `CDA_fe_hat_beret` | Beret | `fe_hat_beret` | 2 | Dark, Red |
| `CDA_fe_hat_country` | Country | `SK_fe_country_hat_01` | 2 | (dark), (purple) |
| `CDA_ma_hat_beenie` | Beenie | `SK_ma_hat_beenie_01` | 0 | — |
| `CDA_ma_hat_beret` | Beret | `SK_ma_hat_beret_01` | 2 | Dark, Red |
| `CDA_ma_hat_cap_02` | Cap | `SK_ma_hat_cap_02` | 2 | (darkblue), (brownblue) |
| `CDA_ma_hat_country` | Country | `SK_ma_hat_country_02_a` | 2 | (dark), (purple) |
| `CDA_ma_hat_flatcap` | Flatcap | `SK_ma_hat_flatcap_01` | 2 | (leather), (grey) |

> **Note :** Certains meshes chapeaux femme/enfant (`fe_hat_beret`, `fe_hat_benee`, `fe_hat_basecap_sport`) n'ont pas de préfixe `SK_` — assets issus d'une convention d'import différente.

---

### 5. Bas du corps — `BP_CDA_Apparel_LowerBody` (11 CDA)

| Asset | Nom affiché | Mesh SK | Variantes | Coloris |
|---|---|---|:---:|---|
| `CDA_child_pants_jeans` | Long | `SK_child_pants_jeans` | 3 | Dark_trousers, Dark blue, Light grey |
| `CDA_child_pants_short` | Short | `SK_child_pants_short` | 2 | (white), (blue) |
| `CDA_fe_pants_business` | Business | `SK_fe_pants_business` | 1 | Dark |
| `CDA_fe_pants_jeans` | Jeans | `SK_fe_pants_jeans` | 1 | Dark |
| `CDA_fe_pants_jeans_short` | Short | `SK_fe_pants_jeans_short` | 0 | — |
| `CDA_fe_pants_tulip` | Tulip | `SK_fe_pants_tulip` | 2 | Dark, (brown) |
| `CDA_fe_skirt` | Skirt | `SK_fe_skirt_` | 3 | (wool), Dark, Checker |
| `CDA_ma_leg_jeans` | Jeans | `SK_ma_leg_jeans` | 3 | Dark_trousers, Dark blue, Light grey |
| `CDA_ma_leg_pants_business` | Business | `SK_ma_leg_pants_business` | 3 | (black), (dark), Bright |
| `CDA_ma_pants_short_casual` | Short Casual | `SK_ma_pants_short_casual` | 0 | — |
| `CDA_ma_pants_three_quarter` | Three Quarters | `SK_ma_pants_three_quarter` | 0 | — |

---

### 6. Chaussettes et Collants — `BP_CDA_Apparel_Socks` (10 CDA)

| Asset | Nom affiché | Mesh SK | Variantes | Coloris |
|---|---|---|:---:|---|
| `CDA_child_feet_socks_long` | Long | `SK_child_socks_long` | 5 | Grey, Red, Dark, (blue), (yellow) |
| `CDA_child_feet_socks_medium` | Medium | `SK_child_socks_medium` | 5 | Grey, Red, Dark, (blue), (yellow) |
| `CDA_child_feet_socks_short` | Short | `SK_child_socks_short` | 5 | Grey, Red, Dark, (blue), (yellow) |
| `CDA_child_feet_tights` | Tights | `SK_childs_tights` | 5 | Dark, Skin, Skin_dark, Dark, (yellow) |
| `CDA_fe_feet_socks` | Socks | `SK_fe_socks_01_a` | 3 | Grey, Red, Dark |
| `CDA_fe_feet_tights` | Tights | `SK_fe_tights_01_a` | 7 | Dark, Skin, Skin_dark, Dark, (yellow), (dots_stripes_dark), (—) |
| `CDA_ma_feet_socks_double` | Double Socks | `SK_ma_socks_double` | 6 | Grey, Stripes-Dark, Bright-Stripes, Turqouise, Purple-Yellow, Blue |
| `CDA_ma_feet_socks_long` | Long Socks | `SK_ma_socks_long` | 7 | Grey, Stripes-Dark, Bright-Stripes, Turqouise, Purple-Yellow, Blue, (red_white) |
| `CDA_ma_feet_socks_medium` | Medium Socks | `SK_ma_socks_medium` | 7 | Grey, Stripes-Dark, Bright-Stripes, Turqouise, Purple-Yellow, Blue, (red_white) |
| `CDA_ma_feet_socks_short` | Short Socks | `SK_ma_socks_short` | 6 | Grey, Stripes-Dark, Bright-Stripes, Turqouise, Purple-Yellow, Blue |

---

### 7. Accessoires — `BP_CDA_Apparel_Accessory` (8 CDA)

| Asset | Nom affiché | Mesh SK | Variantes | Coloris |
|---|---|---|:---:|---|
| `CDA_child_acc_armring_01` | Arm Ring 01 | `SK_child_acc_armrings_04` | 4 | Red, Colorfull, Dark, (silver) |
| `CDA_child_acc_armring_02` | Arm Ring 02 | `SK_child_acc_armring_02` | 4 | Red, Colorfull, Dark, (silver) |
| `CDA_child_acc_armring_03` | Arm Ring 03 | `SK_child_acc_armrings_03` | 4 | Red, Colorfull, Dark, (silver) |
| `CDA_child_acc_watch` | Watch | `SK_child_acc_watch_analog` | 4 | Red, Colorfull, Dark, (silver) |
| `CDA_fe_acc_earring_01_triple` | Triple | `SK_fe_earring_01` | 4 | Red, Colorfull, Dark, (blue_evening) |
| `CDA_fe_acc_earring_02__round_star` | Round Star | `SK_fe_earring_02` | 3 | Red, Colorfull, Dark |
| `CDA_fe_acc_earring_03_round` | Round | `SK_fe_earring_06` | 3 | Red, Colorfull, Dark |
| `CDA_fe_acc_earring_04_triangle` | Triangle | `SK_fe_earring_04` | 3 | Red, Colorfull, Dark |

> Les accessoires enfant (bracelets, montre) partagent le pool de matériaux `MI_accesories_01_*`, identique à celui des boucles d'oreilles féminines.

---

### 8. Lunettes — `BP_CDA_Apparel_Glasses` (7 CDA)

| Asset | Nom affiché | Mesh SK | Variantes | Coloris |
|---|---|---|:---:|---|
| `CDA_child_eyeglass` | Eye Glasses | `SK_child_eyeglasses` | 3 | Blue, Yellow, Dark |
| `CDA_fe_acc_eyeglass_01` | Glass 01 | `SK_fe_glass_01` | 3 | Blue, Yellow, Dark |
| `CDA_fe_acc_eyeglass_02` | Glass 02 | `SK_fe_glass_02` | 3 | Blue, Yellow, Dark |
| `CDA_fe_acc_eyeglass_03` | Glass 03 | `SK_fe_glass_03` | 3 | Blue, Yellow, Dark |
| `CDA_ma_acc_eyeglass_01` | Glass 01 | `SK_ma_glass_01` | 3 | Blue, Yellow, Dark |
| `CDA_ma_acc_eyeglass_02` | Glass 02 | `SK_ma_glass_02` | 3 | Blue, Yellow, Dark |
| `CDA_ma_acc_eyeglass_03` | Glass 03 | `SK_ma_glass_03` | 3 | Blue, Yellow, Dark |

---

### 9. Barbes — `BP_CDA_Hairstyle_Beard` (2 CDA)

| Asset | Nom affiché | Mesh SK | Variantes |
|---|---|---|:---:|
| `CDA_ma_beard_01` | Beard 01 | `SK_ma_beard_01` | 0 |
| `CDA_ma_beard_02` | Beard 02 | `SK_ma_beard_02` | 0 |

> Comme les coiffures, les barbes ne comportent pas de variantes matériaux séparées dans le CDA. La couleur est probablement synchronisée avec la couleur de cheveux.

---

### 10. Attachements main unique — `BP_CDA_Attachment_SingleHanded` (1 CDA)

| Asset | Nom affiché | Mesh SK | Variantes |
|---|---|---|:---:|
| `CDA_tool_hammer_01` | Hammer | *(non défini)* | 0 |

> La propriété `SkeletalMesh` n'est pas renseignée sur ce CDA (utilise probablement un StaticMesh ou un mesh défini dans la classe enfant `BP_CDA_Attachment_SingleHanded`). La vignette pointe vers `AICON-Green` (icône générique Engine), indiquant une configuration incomplète.

---

## Statistiques des variantes matériaux

| Type | Total CDA | CDA avec variantes | Total coloris | Moy. coloris/CDA |
|---|:---:|:---:|:---:|:---:|
| UpperBody | 19 | 19 | 60 | 3,2 |
| Feet | 14 | 6 | 19 | 1,4 |
| Hat | 14 | 11 | 22 | 1,6 |
| LowerBody | 11 | 8 | 20 | 1,8 |
| Socks | 10 | 10 | 56 | 5,6 |
| Accessory | 8 | 8 | 30 | 3,8 |
| Glasses | 7 | 7 | 21 | 3,0 |
| Hairstyle_Head | 18 | 0 | 0 | — |
| Hairstyle_Beard | 2 | 0 | 0 | — |
| Attachment | 1 | 0 | 0 | — |

---

## Widgets associés au système CDA

Anciennement dans `/Game/Assets/CharacterEditorModify/Base/Widgets/`, maintenant dans `/Game/Assets/Characters/HW/Base/Widgets/` :

| Widget | Rôle |
|---|---|
| `WBP_CDA_ApparelPicker` | Picker principal de sélection d'apparel par slot |
| `WBP_CDA_ApparelPicker_MainButton` | Bouton d'item principal dans le picker |
| `WBP_CDA_ApparelPicker_VariantButton` | Bouton de sélection d'un coloris/variant |
| `WBP_CDA_CollectionPicker` | Sélecteur de collection/ensemble complet |
| `WBP_CDA_Loader` | Chargement asynchrone des CDA |
| `WBP_CDA_ThumbnailStudio` | Studio de rendu des vignettes CDA |
| `WBP_CDA_ThumbnailStudio_Preview` | Prévisualisation dans le ThumbnailStudio |

---

## Observations et points d'attention

1. **Asset sans préfixe CDA** : `ma_feet_business` ne respecte pas la convention de nommage `CDA_` — à renommer en `CDA_ma_feet_business`.

2. **Meshes chapeaux sans préfixe SK_** : `fe_hat_beret`, `fe_hat_benee`, `fe_hat_basecap_sport` référencent des meshes sans préfixe `SK_` — probablement des assets importés depuis un pack externe sans renommage.

3. **Labels de variants incomplets** : plusieurs variantes ont leur `DisplayName` vide ou non résolu (affiché `?`) dans l'export text. Ces variants sont fonctionnels (le matériau MI est bien référencé) mais n'auront pas de label dans l'UI si la localisation n'est pas renseignée.

4. **Hairstyles sans variantes matériaux** : les 18 coiffures et 2 barbes n'ont pas de `MaterialVariants` configurés dans leur CDA. La gestion des couleurs de cheveux doit passer par un autre mécanisme (paramètre de matériau dynamique, scalar parameter global, ou système de teinture séparé).

5. **Attachment incomplet** : `CDA_tool_hammer_01` est le seul CDA de type `BP_CDA_Attachment_SingleHanded` et sa configuration est incomplète (pas de mesh, vignette générique). Ce slot est en cours de développement.

6. **Accessoires uniquement Enfant et Féminin** : aucun accessoire (boucles d'oreilles, bracelets) n'est configuré pour l'anatomie masculine adulte — les bracelets enfant partagent leurs matériaux avec les boucles d'oreilles féminines.

---

*Documentation générée automatiquement via MCP Python / Unreal Editor 5.4. Mise à jour 2026-04-07 : chemins relocalisés vers `Content/Assets/Characters/HW/`. À mettre à jour lors de l'ajout de nouveaux CDA.*
