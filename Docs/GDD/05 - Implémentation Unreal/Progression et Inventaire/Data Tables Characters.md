---
tags: [implementation, ue5, progression, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# DataTables_Characters

> DataTables liées à la personnalisation et à l'apparence des personnages.

## DT_CharacterDataAsset

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `Content/Data/DataTables/DT_CharacterDataAsset.uasset` |
| **Struct de ligne** | `FHWCharacterDataAsset` |
| **Header source** | `Public/Character/HWCharacter.h` |
| **Lignes** | 103 |

**Description :** Bibliothèque d'assets visuels pour la personnalisation. Chaque ligne représente un élément de garde-robe (vêtement, coiffure, accessoire, attachement).

### Champs principaux de `FHWCharacterDataAsset`

| Champ | Type | Description |
|-------|------|-------------|
| `AssetType` | `EHWAssetType` | Feet, Accessories, LowerBody, UpperBody, Hairstyles, Attachments... |
| `Tumbnail` | `UTexture2D*` | Miniature UI |
| `DisplayName` | `FString` | Nom dans l'éditeur |
| `Collection` | `FString` | Set d'items associés |
| `Anatomies` | `TArray<EHWAnatomy>` | Races/genres compatibles (Human M/F, Dwarf, Elf, Orc, enfants) |
| `SkeletalMesh` | `USkeletalMesh*` | Mesh skeletal |
| `AdditionalMorphTargets` | `TArray<FHWAdditionalMorphTarget>` | Morph targets additionnels |
| `MaterialVariants` | `TArray<FHWMaterialVariant>` | Variantes couleur/matériau |
| `BasebodyMask` | `UTexture2D*` | Masque occultation zones peau |
| `UseAlternativeSkinTextures` | `bool` | Textures peau alternatives |
| `RootOffset`, `FootRotation`, `BallRotation` | `float` | Corrections chaussures |
| `CustomAnimBlueprint` | `TSubclassOf<UAnimInstance>` | AnimBP custom (coiffures) |
| `StaticMesh` | `UStaticMesh*` | Mesh statique (attachements) |

### Consommateurs

- `UHWCharacterCustomComponent::ApparelDataTable`
- `GetAdvancedApparelOptions()` — filtre vêtement/anatomie
- Éditeur de personnage UI

> **2026-04-07 :** Les 34 fonctions CE Blueprint ont été supprimées. Logique exclusivement C++ dans `UHWCharacterCustomComponent`.

---

## DT_CharacterAppearancePreset

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `Content/Data/DataTables/DT_CharacterAppearancePreset.uasset` |
| **Struct de ligne** | `FHWCharacterAppearanceCE` |
| **Header source** | `Public/Character/HWCharacter.h` |

**Description :** Préréglages d'apparence complète (joueurs ou NPCs) — profils encodant anatomie, peau, morph targets, vêtements, accessoires.

### Champs par groupe

| Groupe | Champs | Description |
|--------|--------|-------------|
| **Métadonnées** | `Name`, `Anatomy` | Preset + anatomie (EHWAnatomy) |
| **Corps** | `Age`, `Size` | Curseurs 0.0-1.0 |
| **Peau** | `SkinMaterialIndex`, `SkinScalarParam[]`, `SkinHDR[]` | Index + scalaires + couleurs HDR |
| **Yeux** | `EyesScalarParam[]`, `EyesHDR[]` | Paramètres matériau yeux |
| **Morph Targets** | `MorphTargets[]`, `MorphTargetGroups[]` | Déformations faciales/corporelles |
| **Coiffure** | `HairstylesRawName[]`, `HairstyleGlobalScalarParam[]`, `HairstyleGlobalHDRvectParam[]` | Coiffures actives + couleur |
| **Vêtements** | `ApparelDataAsset[]`, `ApparelGlobalScalarParam[]`, `ApparelGlobalHDRvectParam[]` | Items + teintures |
| **Attachements** | `AttachmentDataAsset[]`, `AttachmentsGlobalScalarParam[]`, `AttachmentsGlobalHDRvectParam[]` | Accessoires + socket + transform |

### Consommateurs

- `AHWCharacter::CharacterAppearanceCE` — champ répliqué
- `UHWCharacterCustomComponent::ApplyCustomizationProfile()` (C++ uniquement depuis 2026-04-07)
- `AHWCharacter::LoadCharacterAppearanceCEFromJSON()` / `UpdateCharacterAppearanceCE()` — OWS

---

## DataTables Characters déplacées (2026-04-07)

Déplacées dans `Content/Assets/Characters/HW/DataTables/` :

| DataTable | Struct | Description |
|-----------|--------|-------------|
| `DT_AnatomyProfiles` | `FHWAnatomyProfile` | Profils anatomiques par race/genre (skeleton size, offsets, morph targets) |
| `DT_PresetCustomizationProfiles` | `FHWCharacterAppearanceCE` | Presets personnalisation (templates par défaut) |
| `DT_MorphTargetWrinkleParameters` | (interne) | Paramètres rides faciales/corporelles |

### Consommateurs

- `UHWCharacterCustomComponent::AnatomyDataTable` → `DT_AnatomyProfiles`
- `UHWCharacterCustomComponent::ApplyCustomizationProfile()` → `DT_PresetCustomizationProfiles`

---

## DataTables supprimées (2026-04-07)

| DataTable | Raison |
|-----------|--------|
| `DT_LightStudioProfiles` | Editor-only Character Editor, plus nécessaire |
| DataTables ROG | Plugin Realistic Organic Ground, nettoyés |

## Voir aussi

- [[Data Tables Misc]] — recense les mêmes structs Characters dans le tableau des `FTableRowBase` (`FHWCharacterDataAsset`, `FHWCharacterAppearanceCE`, `FHWAnatomyProfile`) avec leurs DataTables associées et notes sur la sérialisation OWS `SerializeX` / `LoadXFromJSON`.
- [[HW Character]] — hub domaine 02 : `AHWCharacter::CharacterAppearanceCE` (répliqué) consomme `FHWCharacterAppearanceCE` ; `AHWCharacter::LoadCharacterAppearanceCEFromJSON()` / `UpdateCharacterAppearanceCE()` implémentent la couche OWS listée dans les consommateurs.
- [[OWS Architecture]] — destinataire du JSON produit par `AHWCharacter::LoadCharacterAppearanceCEFromJSON()` et des DataTables `DT_AnatomyProfiles` / `DT_PresetCustomizationProfiles` synchronisées via `CustomCharacterData`.
