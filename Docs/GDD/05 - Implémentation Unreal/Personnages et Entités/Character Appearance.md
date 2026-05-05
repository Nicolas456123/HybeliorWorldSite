---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# CharacterAppearance

Systeme d'apparence des personnages. Deux structs coexistent actuellement (migration en cours).

## Systeme dual (legacy + CE)

Depuis 2026-04-18, les deux structs coexistent dans `HWCharacter.h` :

| Struct | Ligne | Role |
|--------|-------|------|
| `FHWCharacterAppearance` | 237 | Systeme legacy (Genre, taille, couleurs) |
| `FHWCharacterAppearanceCE` | 299 | Systeme nouveau (Anatomie, morphs, materiaux, apparel) |

Les deux sont :
- UPROPERTY repliquees sur `AHWCharacter`
- Exposees via `UpdateCharacterAppearance()` et `UpdateCharacterAppearanceCE()`

> **La migration vers CE n'est pas complete** — le systeme legacy reste maintenu en parallele.

## FHWCharacterAppearanceCE (detail)

Conteneur de donnees transmis au pipeline de customisation :

| Champ | Type | Description |
|-------|------|-------------|
| `Anatomy` | `EHWAnatomy` | Gabarit anatomique (determine quel squelette charger) |
| `Age` | `float` | Morph target age (0-1) |
| `Size` | `float` | Morph target taille (0-1) |
| `SkinMaterialIndex` | `int32` | Index dans `SkinMaterialSets` du profil anatomique |
| `SkinScalarParam` / `SkinHDR` | Arrays | Parametres shader peau (couleur, grains...) |
| `EyesScalarParam` / `EyesHDR` | Arrays | Parametres yeux |
| `MorphTargets` | Array | Morphs visage (rides, machoire, nez...) |
| `HairstylesRawName` | `TArray<FName>` | Noms des DataAssets coiffure a charger |
| `ApparelDataAsset` | `TArray<FHWDataAssetApparel>` | Noms + variant index de chaque piece d'apparel |
| `AttachmentDataAsset` | `TArray<FHWDataAssetAttachment>` | Noms + socket + transform des attachements |

## Slots d'apparel (EHWAssetType)

Enum dans `HWCharacter.h` — 10 slots de customisation :

| Valeur | Slot | Assets correspondants |
|--------|------|----------------------|
| `Apparel_Feet` | Pieds / bottes | `Armor/*/Boots/` |
| `Apparel_Accessories` | Accessoires | `Cloaks/`, `Shoulders/`, `Bracers/` |
| `Apparel_Socks` | Chaussettes | a creer |
| `Apparel_Glasses` | Lunettes | a creer |
| `Apparel_LowerBody` | Bas du corps | `Armor/*/Pants/` |
| `Apparel_Hands` | Mains / gants | `Gloves/` |
| `Apparel_Hats` | Casques | `Armor/*/Helms/` |
| `Apparel_UpperBody` | Haut du corps | `Armor/*/Chests/`, `Shirts/`, `Robes/` |
| `Hairstyles` | Coiffures | assets cheveux HW/Base |
| `Attachments` | Attachements | BP_CDA_Attachment, armes |

Voir [[Armor System]] pour la liste complete des assets.

## Incoherences

- Double systeme apparence (legacy + CE) — migration incomplete
- Typo `PerentSocket` (au lieu de `Parent`)
- Commentaires francais/anglais melanges

## Assets associés
- [[Character Data Assets]] — 104 CDA (vêtements, coiffures, accessoires) alimentant l'apparence

## Voir aussi

- [[HW Character]] — porte les deux UPROPERTY Replicated d'apparence : `FHWCharacterAppearance CharacterAppearance` (legacy, `HWCharacter.h:593`) et `FHWCharacterAppearanceCE CharacterAppearanceCE` (nouveau, `HWCharacter.h:597`), setters `UpdateCharacterAppearance()` / `UpdateCharacterAppearanceCE()` (`HWCharacter.h:609,617`) et loaders JSON `LoadCharacterAppearanceFromJSON` / `LoadCharacterAppearanceCEFromJSON`.
- [[Character Customization]] — historiquement consommee par `UHWCharacterCustomComponent` (supprime 2026-04-07) ; les structs preservees `FHWMaterialSet` (`HWCharacter.h:505`) et `FHWAnatomyProfile` (`HWCharacter.h:517`) restent les DataTable rows utilisees par la future pipeline de customisation.
- [[Character Meshes]] — l'enum `EHWAnatomy` (`HWCharacter.h:12-24`) reference par `FHWCharacterAppearanceCE::Anatomy` determine quel squelette/mesh charger via `FHWAnatomyProfile::BodyMesh` / `HeadMesh` (`HWCharacter.h:522-525`).
- [[Armor System]] — `TArray<FHWDataAssetApparel> ApparelDataAsset` (`HWCharacter.h:292`, chaque entree contient `RawName` + `MaterialVariantIndex`) liste les 10 slots `EHWAssetType` (`HWCharacter.h:27-39`) que les assets d'armure HW/Armor peuvent occuper.
- [[HW GAS Player Character]] — expose la RPC serveur `Server_ChangeAppearanceNative(const FHWCharacterAppearance& Appearance)` (`HWGASPlayerCharacter.h:327`) pour appliquer une nouvelle apparence cote authority, et `UpdateMeshEquipment()` (`HWGASPlayerCharacter.h:309`) lit l'equipment inventory pour alimenter les composants mesh d'apparel declares ici.
