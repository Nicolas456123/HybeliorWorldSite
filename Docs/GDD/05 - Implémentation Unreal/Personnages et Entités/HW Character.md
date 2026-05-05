---
tags: [implementation, ue5, character, base]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [mapping-8-stats-brutes]
implements: [Le Souffle, L'Accord]
---

# HW Character

Base class `AHWCharacter` commune à tous les personnages (joueurs et entités). Hérite de `ACharacter` (UE).

## Refonte sémantique stats — 8 stats brutes + 4 fondamentales

> Voir [[Migration Accord]] §"Phase C". Le canon GDD post-refonte impose deux couches de stats :
>
> - **Couche 0 — 4 stats fondamentales** (auto, calculées) : Vitalité, Souffle, Présence, Conscience
> - **Couche 1 — 8 stats brutes** (par usage, 0-150, compressées au-dessus de 50) : Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe
>
> Mapping actuel UE5 (7 attributs `UHWCombatAttributeSet`) → 8 brutes GDD :
>
> | Attribut UE actuel | Stat GDD canonique | Statut |
> |---|---|---|
> | `Strength` | Vigueur | mappable |
> | `Agility` | Vivacité | mappable |
> | `Constitution` | Endurance | mappable |
> | `Attack` / `Defense` / `CritRate` / `CritDamage` | (dérivés combat) | gardés tels quels — pas une stat brute |
> | (manquant) | Acuité | **À ajouter** |
> | (manquant) | Esprit | **À ajouter** |
> | (manquant) | Résonance | **À ajouter** |
> | (manquant) | Mémoire | **À ajouter** |
> | (manquant) | Verbe | **À ajouter** |
>
> `FHWCharacterExperience` (struct progression XP/Level) doit être renommée à terme `FHWCharacterHistory` côté code (refonte sémantique post-V4). Le code C++ reste valide tel quel en V3.

## Hierarchie de classes

```
ACharacter (UE)
  +-- AHWCharacter (base commune)
        +-- AHWGASCharacter (integration GAS)
              +-- AHWGASPlayerCharacter (joueurs)
              +-- AHWGASEntityCharacter (creatures/PNJ)
```

## Structures de donnees repliquees

| Struct | Role |
|--------|------|
| `FHWOftenChangeCharacterData` | Vie, Mana, Endurance, Energie (valeurs actuelles) |
| `FHWChangeCharacterData` | Maxima, regen, attributs, niveau |
| `FHWCharacterExperience` | XP, kills |
| `FHWBaseCharacterSkills` | Skill1 |
| `FHWCharacterAppearance` | Genre, taille, couleurs (legacy) |
| `FHWCharacterAppearanceCE` | Anatomie, morphs, materiaux, apparel (nouveau) |
| `FHWRarelyChangeCharacterData` | Metier, religion, guilde, peurs, titres |

Voir [[Character Appearance]] pour les details du systeme dual legacy/CE.

## 10 anatomies supportees

HumanFemale / HumanMale (Adult + Child), Dwarf F/M, Elf F/M, Orc F/M.

L'enum `EHWAnatomy` est definie dans `HWCharacter.h`. Voir [[Character Meshes]] pour les squelettes et meshes.

## URO (Update Rate Optimizations)

`AHWCharacter::SetupURO()` configure la frequence d'animation par LOD — applique a tous les personnages, joueurs et entites. Voir [[Anim Instance]] section URO.

## Structs preservees apres refactor

Depuis 2026-04-07 :
- `FHWMaterialSet` : set de materiaux de peau
- `FHWAnatomyProfile` : profil anatomique (BodyMesh, HeadMesh, AnimInstanceClass, SkinMaterialSets)

Ces structs etaient precedemment dans `UHWCharacterCustomComponent` (supprime). Elles sont maintenant dans `HWCharacter.h`.

## Fichiers sources

| Fichier | Role |
|---------|------|
| `Public/Character/HWCharacter.h` | Declaration classe base, structs, enums |
| `Private/Character/HWCharacter.cpp` | Implementation (URO setup, replication) |

## Changelog

| Date | Modification |
|------|-------------|
| 2026-04-07 | Structs `FHWMaterialSet` / `FHWAnatomyProfile` deplacees depuis `UHWCharacterCustomComponent` (supprime) vers `HWCharacter.h`. |

## Assets associés
- [[Character Data Assets]] — CDA (Apparel, Hairstyle, Accessory) consommant les structs d'apparence

## Voir aussi

- [[HW GAS Character]] — classe derivee directe declaree `class HYBELIORWORLD_API AHWGASCharacter : public AHWCharacter, public IAbilitySystemInterface` dans `HWGASCharacter.h:69` ; ajoute l'ASC et le `UHWCombatAttributeSet` au-dessus des structs repliquees definies ici.
- [[Anim Instance]] — consomme `FHWAnatomyProfile::AnimInstanceClass` (`TSubclassOf<UAnimInstance>`, `HWCharacter.h:528`) ; l'URO configuree par `AHWCharacter::SetupURO()` (declaree `HWCharacter.h:653`) s'applique a l'AnimInstance attachee au `GetMesh()` de tout descendant.
- [[Targeting System]] — l'ensemble de l'API ciblage est expose ici : `TargetDetectionSphere` (`HWCharacter.h:685`), `LockOnTarget()` / `ReleaseTarget()` / `SelectNextTarget()` / `SelectPreviousTarget()` / `UpdateTargetingSystem(float)` (`HWCharacter.h:691-708`) et callbacks `OnTargetEnterSphere` / `OnTargetExitSphere`.
- [[Character Appearance]] — les UPROPERTY Replicated `CharacterAppearance` (`FHWCharacterAppearance`) et `CharacterAppearanceCE` (`FHWCharacterAppearanceCE`) vivent sur `AHWCharacter` (`HWCharacter.h:593-597`), avec leurs setters `UpdateCharacterAppearance()` / `UpdateCharacterAppearanceCE()`.
- [[Character Data Assets]] — la struct `FHWCharacterDataAsset : public FTableRowBase` est declaree ici (`HWCharacter.h:71`) ; les 104 CDA BP consomment ses champs `SkeletalMesh`, `MaterialVariants[]`, `AssetType` (enum `EHWAssetType` `HWCharacter.h:27`).
