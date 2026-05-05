---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# HitBoxes

`AHWHitboxGeneratorActor` : outil éditeur de pré-calcul de positions de hitboxes par animation. Génère une `UDataTable` consommée par les abilities de détection d'impact (non utilisé en runtime).

## Sources

- `HWHitboxGeneratorActor.h` / `.cpp`
- Asset généré : `DT_AnimHitBox` (DataTable) — consommé par `GA_TestMobAttack` (BP)

## Usage

Outil **offline** uniquement — l'acteur se place dans une scène d'édition, on appelle `GenerateHitboxes()` depuis le panneau Details, et une DataTable est remplie avec des positions socket par pas de temps.

## Structures

```cpp
struct FHitboxEntry {
    FVector Location;
    FRotator Rotation;
    float Time;  // secondes dans l'animation
};

struct FAnimationHitboxData : FTableRowBase {
    UAnimSequence* AnimSequence;
    TArray<FHitboxEntry> Hitboxes;
};
```

## Fonction CallInEditor

```cpp
void GenerateHitboxes(UAnimSequence* AnimSequence, FName SocketName,
                      float IntervalTime, UDataTable* OutDataTable);
```

Principe : échantillonne le socket `SocketName` sur `AnimSequence` toutes les `IntervalTime` secondes et enregistre (Location, Rotation, Time) dans la DataTable.

## Consommation runtime

- `DT_AnimHitBox` est consommé par les abilities (ex: `GA_TestMobAttack`) qui, à chaque frame d'animation, spawnent un overlap query à la position précalculée.
- Les [[Ability Tasks]] (`UHWAT_WaitMultiTraceForTargets`) offrent une alternative runtime-pure, sans DataTable.

## Voir aussi

*(Aucun lien retenu : `AHWHitboxGeneratorActor` est un utilitaire éditeur (`UFUNCTION CallInEditor GenerateHitboxes()`) sans dépendance C++ vers `UHWComboComponent`, `UHWWeaponMoveset`, `UHWAT_WaitMultiTraceForTargets` ou les AbilitySets — la DataTable générée `DT_AnimHitBox` n'est référencée par aucun `.cpp`, uniquement par des abilities BP non auditées.)*
