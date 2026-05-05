---
tags: [implementation, ue5, armor, items, tiers]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [aligner-6-tiers-rarete]
implements: []
---

# Armor System

Système modulaire d'armures et vêtements — ex-ROG Modular Armor, réorganisé sous `Content/Assets/Characters/HW/Armor/`.

## Tiers et raretés (D-GD-TIERS)

> Deux concepts coexistent et sont distincts :
>
> ### T1-T7 — catégorisation visuelle ROG (technique)
>
> Les **tiers T1 à T7** héritent du système visuel ROG Modular Armor : ce sont des **paliers de qualité de mesh / texture / shader** (silhouettes, complexité de matériau, niveau de détail). Ils servent à organiser les assets disque, pas à équilibrer le gameplay.
>
> ### 6 tiers de rareté gameplay (canon GDD)
>
> Les items du jeu utilisent une **échelle de rareté gameplay à 6 niveaux**, indépendante des T1-T7 :
>
> | Tier rareté | Couleur HUD typique |
> |---|---|
> | Commun | gris |
> | Inhabituel | vert |
> | Rare | bleu |
> | Épique | violet |
> | Légendaire | orange |
> | Mythique | rouge / doré |
>
> Une armure peut être **T3 visuel × Légendaire gameplay** : la qualité visuelle et la rareté de drop sont deux dimensions orthogonales.

### Changelog

| Date | Modification |
|------|-------------|
| 2026-04-07 | Assets reorganized to `Content/Assets/Characters/HW/`. `ROG_Modular_Armor/Blueprints/` DELETED (meshes/materials/textures kept under HW/Armor/). DataTables deplacees dans `HW/DataTables/`. |

## Vue d'ensemble

Le systeme visuel repose sur une **architecture modulaire a composants** : chaque region du corps est un `SkeletalMesh` independant skinne sur le squelette parent. Voir [[Character Meshes]] pour les squelettes supportes.

Le profil d'apparence `FHWCharacterAppearanceCE` decrit l'apparence complete — voir [[Character Appearance]].

## Structure des bibliotheques

| Bibliotheque | Chemin | Contenu |
|---|---|---|
| HW Base | `Content/Assets/Characters/HW/Base/` | 7 meshes, 57 materials, 10 MF, 41 textures, 36 animations |
| HW CharacterParts | `Content/Assets/Characters/HW/CharacterParts/` | 104 DataAssets, 182 materials, 114 meshes, 289 textures |
| HW Armor (ex-ROG) | `Content/Assets/Characters/HW/Armor/` | 3588 assets (meshes/materials/textures uniquement, BP supprimes) |
| HW DataTables | `Content/Assets/Characters/HW/DataTables/` | DT_AnatomyProfiles, DT_PresetCustomizationProfiles, etc. |
| HW Structures | `Content/Assets/Characters/HW/Structures/` | 30 files |
| HW Enumerations | `Content/Assets/Characters/HW/Enumerations/` | 15 files |

## Organisation ROG

Deux sous-bibliotheques principales :

- `Armor_Cloth/` → pieces portees (corps, casque, pantalon, bottes, chemise)
- `Accessories_Robes/` → accessoires souples (robes, capes, epaulieres, gants, brassards)

Chaque sous-bib est declinee pour chaque anatomie. Voir [[Character Meshes]] section squelettes ROG (6 squelettes).

## Slots — Armor_Cloth

| Slot | Dossier | Equivalent EHWAssetType |
|------|---------|-------------------------|
| Helm / Casque | `Helms/` | `Apparel_Hats` |
| Chest / Torse | `Chests/` | `Apparel_UpperBody` |
| Shirt / Chemise | `Shirts/` | `Apparel_UpperBody` |
| Pants / Jambes | `Pants/` | `Apparel_LowerBody` |
| Boots / Pieds | `Boots/` | `Apparel_Feet` |

### Convention nomenclature

Format : `SK_{Slot}{Index}_{Type}_{Tier}`

**Casques (exemples CC_Female) :**
| Mesh | Style | Tier |
|------|-------|------|
| `SK_Helm0_Light_T1` | Light | T1 |
| `SK_Helm0_Medium_T1` a `T4` | Medium | T1-T4 |
| `SK_Helm0_Barb_T1`, `T3`, `T4` | Barb | T1-T4 |
| `SK_Helm0_Bsmth_T1` | Blacksmith | T1 |
| `SK_Helm0_Hunt_T2` a `T4` | Hunting | T2-T4 |
| `SK_Helm0_MOS_T1` a `T6` | MOS | T1-T6 |
| `SK_Helm0_Necr_T2`, `T6` | Necromancer | T2, T6 |

**Torses (Chests) :**
- Styles : Barb, Bsmth, Heavy (T1-T5), Light, Medium (T1-T5), Hunt (T2-T4), Crus (T5 + Dark/Dark_Red), Necr (T6)
- Variantes couleur (`_Dark`, `_Light`, `_Red`, `_Black`, etc.)

**Pantalons :** Light T1-T5, Medium T1-T4, Heavy T1-T6 (+ `_Dark`)

**Bottes :** Light (T2-T7), Medium (T1-T6), Heavy (T1-T6), Necromancer

> Progression : **Light < Medium < Heavy** pour l'armure physique. **Barb, Hunt, Necr, MOS, Crus, Bsmth** sont des styles thematiques.

## Slots — Accessories_Robes

| Slot | Dossier | EHWAssetType |
|------|---------|--------------|
| Cape / Manteau | `Cloaks/` | `Apparel_Accessories` |
| Robe | `Robes/` | `Apparel_UpperBody` |
| Epaulieres | `Shoulders/` | `Apparel_Accessories` |
| Gants | `Gloves/` | `Apparel_Hands` |
| Brassard gauche | `Bracers/` (`SK_L_`) | `Apparel_Accessories` |
| Brassard droit | `Bracers/` (`SK_R_`) | `Apparel_Accessories` |
| Armure additionnelle | *(DT AdditionalArmor)* | `Apparel_Accessories` |

### Capes (Cloaks — CC_Female)

Tier 1 : neutre + Black, Red, Dark_Grey, Rich, Yellow
Tier 2 : meme gamme
Tier 7 : `_Crow`, `_Fox`, `_Wolf` (skins d'animaux — style "ranger/chasseur")

### Epaulieres
Light, Medium, Heavy : T1-T7 (+ variantes Dark / Light)
Barb : T1-T5
Necr : unique

### Gants
Light T1-T5, Medium T1-T4, Heavy T1-T5, Necr unique

### Brassards (paires L+R)
- Pack Barb : T1, T5
- Pack1 : T1, T3, T4, T5, T7
- Pack2 : T4, T7, T7_1, T7_2

> Les brassards CC_Male ont en plus des `SM_` (StaticMesh) en miroir des `SK_`.

## DataAssets d'apparel (BP_CDA_*)

Dans `HW/CharacterParts/DataAssets/` — 104 DataAssets Blueprint :

| DataAsset | Slot logique |
|-----------|--------------|
| `BP_CDA_Apparel` | Base generique |
| `BP_CDA_Apparel_Accessory` | Accessoires (epaules, capes...) |
| `BP_CDA_Apparel_Feet` | Pieds / bottes |
| `BP_CDA_Apparel_Glasses` | Lunettes |
| `BP_CDA_Apparel_Hands` | Mains / gants |
| `BP_CDA_Apparel_Hat` | Casques |
| `BP_CDA_Apparel_LowerBody` | Pantalons |
| `BP_CDA_Apparel_Socks` | Chaussettes |
| `BP_CDA_Apparel_UpperBody` | Torse |
| `BP_CDA_Attachment` | Attachement generique |
| `BP_CDA_Attachment_SingleHanded` | Arme une main |
| `BP_CDA_Hairstyle` | Coiffure generique |
| `BP_CDA_Hairstyle_Beard` | Barbe |
| `BP_CDA_Hairstyle_Head` | Cheveux tete |

Voir [[Character Data Assets]] pour l'inventaire exhaustif.

## Armes

### Archerie (`Assets/Weapons/Archerie/`)

| Asset | Type | Description |
|-------|------|-------------|
| `SK_Bow` | SkeletalMesh | Arc — squelette `Bow_SK_Skeleton`, physics `Bow_SK_Physics` |
| `SM_Arrow` | StaticMesh | Fleche |
| `SM_Quiver` | StaticMesh | Carquois (attachement dos) |

Materiaux : `M_Bow`, `M_Arrow`, `M_Quiver`. Textures PBR (BC/N/AO/R/M/MT).

60+ animations arc dans `BowAnimation/` : idle, aim, shoot, pull, crouch variants, hit reactions (8 directions), deaths, jump down.

### Corps a corps (prototypes)
`Sword.uasset`, `Shield.uasset` — placeholders a developper.

## Codes de tier

| Code | Description |
|------|-------------|
| `T1`-`T7` | Niveau de progression (T1=debutant, T7=legendaire) |
| `_Dark`, `_Light` | Variante couleur |
| `_Red`, `_Black`, `_Green`, `_Yellow`, `_Rich` | Coloris nommes |
| `_1`, `_2`, `_3` | Sous-variantes |

## Tableau recap slots

| Slot | Nb styles (CC_F SK_) | Tiers | Anatomies |
|------|----------------------|-------|-----------|
| Helms | ~12 (Light, Medium, Heavy, Barb, Hunt, MOS, Necr, Bsmth, Crus) | T1-T6+ | 6 ROG + Mannequin |
| Chests | ~15 styles | T1-T7 | idem |
| Pants | ~10 (Light/Medium/Heavy) | T1-T6 | idem |
| Boots | ~15 (Light/Medium/Heavy/Necr) | T1-T7 | idem |
| Shoulders | ~30 (Light/Medium/Heavy/Barb/Necr) | T1-T7 | idem |
| Cloaks | ~20 + 3 T7 animaux | T1-T7 | idem |
| Gloves | ~15 (Light/Medium/Heavy/Necr) | T1-T5 | idem |
| Bracers L+R | ~22 paires (Barb/Pack1/Pack2) | T1-T7 | idem |
| Robes | ~15 (Light + couleurs) | T1-T7 | idem |

## Voir aussi

- [[Character Meshes]] — squelettes ROG modulaires (6 segments _head/_chest/_arms/_hands/_legs/_feet) consommes par les slots d'armure ; cibles des anatomies declarees par l'enum `EHWAnatomy` (`HWCharacter.h:12-24`) via `FHWAnatomyProfile::BodyMesh`/`HeadMesh`.
- [[Character Appearance]] — enum `EHWAssetType` (`HWCharacter.h:27-39`) dont les 10 valeurs (`Apparel_Hats`, `Apparel_UpperBody`, `Apparel_LowerBody`, `Apparel_Feet`, `Apparel_Hands`, `Apparel_Accessories`, etc.) mappent les slots d'armure documentes ici vers les slots consommes par `FHWCharacterAppearanceCE::ApparelDataAsset`.
- [[Character Customization]] — l'ex-pipeline `UpdateApparel()` detruisait les anciens `ApparelMeshComponents` puis recreait depuis `ApparelDataAsset` en s'appuyant sur le `FHWCharacterDataAsset::SkeletalMesh` (`HWCharacter.h:105`) de chaque armure.
- [[Character Data Assets]] — la struct `FHWCharacterDataAsset : public FTableRowBase` (`HWCharacter.h:71`) avec ses champs `AssetType` (enum `EHWAssetType`), `SkeletalMesh`, `MaterialVariants[]`, `Anatomies[]` est la forme serialisee de chaque piece d'armure ROG ; 104 BP_CDA_* l'instancient.
