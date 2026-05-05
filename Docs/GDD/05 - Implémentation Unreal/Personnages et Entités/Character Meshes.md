---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# CharacterMeshes

Meshes de corps, squelettes et mannequins des personnages.

### Changelog

| Date | Modification |
|------|-------------|
| 2026-04-07 | Dossier `CharacterEditorModify/` supprime, contenu deplace vers `Content/Assets/Characters/HW/Base/` et `HW/CharacterParts/`. |

## Anatomies supportees

L'enum `EHWAnatomy` (dans `HWCharacter.h`) declare **10 gabarits** :

| Identifiant | Affichage | Notes |
|-------------|-----------|-------|
| `HumanFemaleAdult` | Human Female Adult | `SKEL_fe_polyphoria` / `SK_ROG_Female` |
| `HumanFemaleChild` | Human Female Child | `SKEL_child` |
| `HumanMaleAdult` | Human Male Adult | `SKEL_ma_polyphoria` / `SK_ROG_Male` |
| `HumanMaleChild` | Human Male Child | `SKEL_child` |
| `DwarfFemaleAdult` | Dwarf Female Adult | assets a creer |
| `DwarfMaleAdult` | Dwarf Male Adult | assets a creer |
| `ElfFemaleAdult` | Elf Female Adult | assets a creer |
| `ElfMaleAdult` | Elf Male Adult | assets a creer |
| `OrcFemaleAdult` | Orc Female Adult | assets a creer |
| `OrcMaleAdult` | Orc Male Adult | assets a creer |

Chaque `FHWCharacterDataAsset` stocke un `TArray<EHWAnatomy> Anatomies` declarant quels gabarits acceptent cet asset.

## Meshes maitres (HW/Base)

| Asset | Type | Description |
|-------|------|-------------|
| `SK_ma_body_master` | SkeletalMesh | Corps masculin adulte (Polyphoria) |
| `SK_ma_head_master` | SkeletalMesh | Tete masculine adulte |
| `SK_fe_body_master` | SkeletalMesh | Corps feminin adulte (Polyphoria) |
| `SK_fe_head_master` | SkeletalMesh | Tete feminine adulte |
| `SK_fe_combine` | SkeletalMesh | Corps feminin unifie (corps+tete combines) |
| `SK_child_basebody` | SkeletalMesh | Corps enfant (unisexe) |

Squelettes : `SKEL_ma_polyphoria`, `SKEL_fe_polyphoria`, `SKEL_child`.
Physics assets : `PH_ma_PhysicsAsset`, `PH_fe_skirt` (simulation jupe), `PH_child_PhysicsAsset`.
Anim BP : `ABP_ma_CharacterEditor`, `ABP_fe_CharacterEditor`, `ABP_child_CharacterEditor`.

## Body parts modulaires ROG (6 segments)

Chaque squelette ROG dispose de **6 segments de corps** independants permettant un masquage selectif sous les armures :

| Segment | Convention | Exemple (CC_Male) |
|---------|-----------|-------------------|
| Tete | `_head` | `SK_CC_Male_head` |
| Torse | `_chest` | `SK_CC_Male_chest` |
| Bras | `_arms` | `SK_CC_Male_arms` |
| Mains | `_hands` | `SK_CC_Male_hands` |
| Jambes | `_legs` | `SK_CC_Male_legs` |
| Pieds | `_feet` | `SK_CC_Male_feet` |

Schema **identique pour 6 anatomies ROG** :

| Anatomie | Dossier | Squelette |
|----------|---------|-----------|
| CC Female | `CC_mlindborg/CC_Female/` | `SKEL_CC_Female` |
| CC Male | `CC_mlindborg/CC_Male/` | `SKEL_CC_Male` |
| ROG Female | `ROG_CC_CodeSpartan/ROG_Female/` | `SKEL_ROG_Female` |
| ROG Male | `ROG_CC_CodeSpartan/ROG_Male/` | *(non nomme)* |
| UCCS Female | `UCCS_FSCreations/UCCS_Female/` | *(non nomme)* |
| UCCS Male | `UCCS_FSCreations/UCCS_Male/` | *(non nomme)* |
| Mannequin UE4 | `Characters/Mannequin/` | `UE4_Mannequin_Skeleton` |

> Les meshes ROG Female disposent en plus d'un dossier `ORIGINAL/` (versions pre-retopo).

## Skeletons ROG

| Squelette | Fichier | Physics Asset | Anim BP |
|-----------|---------|---------------|---------|
| CC Female | `SK_CC_Female.uasset` | `PA_CC_Female_ClothSim_*` | `AnimBP_CC_Female` |
| CC Male | `SK_CC_Male.uasset` | `PA_CC_Male_ClothSim_*` | `AnimBP_CC_Male` |
| ROG Female | `SK_ROG_Female.uasset` | `PA_ROG_Female_ClothSim_*` | `ABP_ROG_Female` |
| ROG Male | *(dans ROG_Male/)* | — | — |
| UCCS Female | `SK_UCCS_Female.*` | — | — |
| UCCS Male | `SK_UCCS_Male.*` | — | — |
| Mannequin | `SK_Mannequin.uasset` | `SK_Mannequin_PhysicsAsset` | `ABP_Mannequin` |

Les Physics Assets cloth sim couvrent 3 zones par personnage : **Chest**, **Cloak**, **Robe**.

## Materiaux de peau (HW/Base/Materials/)

| Materiau | Cible |
|----------|-------|
| `MI_Skin_Male_01_Body` a `04_Body` | Corps masculin (4 tons) |
| `MI_Skin_Male_01_Head` a `04_Head` | Tete masculine (4 tons) |
| `MI_Skin_Male_01_Body_Swim` | Corps masculin (maillot) |
| `MI_Skin_Female_01_Body` a `03_Body` | Corps feminin (3 tons) |
| `MI_Skin_Female_01_Head` a `03_Head` | Tete feminine (3 tons) |
| `MI_Skin_Female_01_Swim_Body` | Corps feminin (maillot) |
| `MI_SkinAdvanced_MaleBase`, `FemaleBase` | Skin avance (masque RGBA) |
| `MI_fe_skin_child_body` / `head` | Peau enfant feminine |
| `MI_skin_child_body` / `head` (deep) | Peau enfant profonde |
| `MI_Eye`, `MI_Hair`, `MI_Teeth` | Yeux, cheveux, dents |
| `MI_Eyelashes_Female` / `Male` | Cils |

> Les materiaux `_deep` ont un subsurface scattering renforce.

## Mannequins UE5

### Meshes (`Assets/Characters/Mannequins/Meshes/`)

| Asset | Description |
|-------|-------------|
| `SKM_Manny` | Mannequin masculin UE5 (haute def) |
| `SKM_Manny_Simple` | Mannequin masculin simplifie (LOD basse) |
| `SKM_Quinn` | Mannequin feminin UE5 |
| `SKM_Quinn_Simple` | Mannequin feminin simplifie |
| `SK_Mannequin` | Mannequin UE4 legacy (compat ROG) |
| `Mannequin_LODSettings` | Profil LOD partage |

### Rigs et controles

| Asset | Description |
|-------|-------------|
| `IK_Mannequin` | IK Rig principal |
| `RTG_Mannequin` | Retargeting source |
| `CR_Mannequin_Body` | Control Rig corps |
| `CR_Mannequin_BasicFootIK` | IK pied simplifie |
| `CR_Mannequin_Procedural` | Rig procedural avance |
| `ABP_Manny`, `ABP_Manny1` | Animation Blueprint Manny |
| `ABP_Quinn` | Animation Blueprint Quinn |
| `ABP_Manny_PostProcess`, `ABP_Quinn_PostProcess` | Post-process rigs |
| `PA_Mannequin` | Pose Asset |

### Animations de base

- **Manny :** Idle, Walk_Fwd, Run_Fwd, Jump, Land, Fall_Loop, BlendSpace WalkRun (+ Giant), Dodge Forward/Backward, Cast
- **Quinn :** Idle (MF_Idle), Walk_Fwd, Run_Fwd, BS Unarmed WalkRun

### Mannequin_UE4 — Archerie

`Mannequin_UE4/Animations/Archery/` :
- **AimOffset** : 9 directions x 3 etats (Idle, Aim, Crouch) = 27 animations LookAt
- **InPlace** : deplacements accroupis avant/arriere avec 45 deg variants

## Nomenclature

### Prefixes

| Prefixe | Signification |
|---------|--------------|
| `SK_` | Skeletal Mesh |
| `SKM_` | Skeletal Mesh (convention UE5) |
| `SM_` | Static Mesh |
| `SKEL_` | Skeleton Asset |
| `PA_` | Physics Asset |
| `ABP_` | Animation Blueprint |
| `BS_` | Blend Space |
| `AM_` | Animation Montage |
| `DT_` | Data Table |
| `MI_` | Material Instance |
| `M_` | Material |
| `T_` | Texture |

### Codes d'anatomie

| Code | Anatomie |
|------|----------|
| `CC_Female` / `CC_Male` | CC mlindborg |
| `ROG_Female` / `ROG_Male` | ROG CodeSpartan |
| `UCCS_Female` / `UCCS_Male` | UCCS FSCreations |
| `fe_` | Female Polyphoria |
| `ma_` | Male Polyphoria |
| `child` | Enfant |

## Voir aussi

- [[HW Character]] — enum `EHWAnatomy` (`HWCharacter.h:12-24`) qui declare les 10 gabarits documentes ici ; struct `FHWAnatomyProfile : public FTableRowBase` (`HWCharacter.h:517`) porte `TObjectPtr<USkeletalMesh> BodyMesh` / `HeadMesh` et `TSubclassOf<UAnimInstance> AnimInstanceClass` associes a chaque squelette.
- [[Armor System]] — les 6 segments de corps modulaires par squelette ROG sont les cibles des slots `EHWAssetType::Apparel_Hats` / `Apparel_UpperBody` / `Apparel_LowerBody` / `Apparel_Feet` / `Apparel_Hands` / `Apparel_Accessories` (`HWCharacter.h:27-39`) consommes par `FHWDataAssetApparel` dans `FHWCharacterAppearanceCE::ApparelDataAsset`.
- [[Character Appearance]] — `FHWCharacterAppearanceCE::Anatomy` (`HWCharacter.h:250`) est l'index de selection de squelette ; combine aux `SkinMaterialSets[SkinMaterialIndex]` (`HWCharacter.h:258`) pour piloter l'application des materiaux de peau listes dans HW/Base/Materials.
- [[Anim Instance]] — `FHWAnatomyProfile::AnimInstanceClass` (`HWCharacter.h:528`) pointe vers la sous-classe de `UHWPlayerAnimInstance` instanciee sur le `USkeletalMeshComponent` du corps ; chaque squelette ROG a son propre AnimBP parent (`ABP_CC_Female`, `ABP_ROG_Female`, etc.) designe via ce champ.
- [[Anim Instance]] — les assets UE5 `IK_Mannequin`, `CR_Mannequin_BasicFootIK`, `CR_Mannequin_Procedural` listes ici pour le squelette `SK_Mannequin` sont disponibles mais non branches dans `UHWPlayerAnimInstance` C++ (voir preparation des variables `LeftFootLastDown` / `LeftPlantLastFrame`).
