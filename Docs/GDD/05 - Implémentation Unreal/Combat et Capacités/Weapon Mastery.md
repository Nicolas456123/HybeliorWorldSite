---
tags: [implementation, ue5, mastery, weapon, souffle]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [refonte-5-paliers, rouille-post-souffle]
implements: [Le Souffle, Armes et Maîtrise]
---

# Weapon Mastery

`UHWWeaponMasteryComponent` : composant de progression par type d'arme. Gère XP, niveau, et applique des bonus (dégâts, vitesse, crit) par `EHWWeaponType`.

## Refonte sémantique — 5 paliers + rouille post-Souffle

> Voir [[Armes et Maîtrise]] (`Documentation_v2/03 - Mécaniques/Armes et Maîtrise.md`), [[Le Souffle]] et [[Migration Accord]] §"Phase E".
>
> ### 5 paliers (au lieu de la courbe `XP × 1.15^N`)
>
> Le canon GDD post-refonte impose **5 paliers de Maîtrise** discrets, par activité contextuelle (couche 2 — ne se transfèrent pas) :
>
> | Palier | Bonus indicatifs | Seuil approx. (à calibrer) |
> |---|---|---|
> | Novice | Aucun | 0 |
> | Apprenti | +5 % dégâts | XP > X1 |
> | Adepte | +10 % dégâts, déblocage combos | XP > X2 |
> | Expert | +15 % dégâts, vitesse +5 % | XP > X3 |
> | Maître | +20 % dégâts, crit +5 %, mouvements signature | XP > X4 |
>
> La table de transposition `MasteryLevel int32 → palier` est documentée dans [[Migration Accord]] §"Phase E".
>
> ### Rouille post-Souffle
>
> À chaque déclenchement de [[Le Souffle]] (Petit / Grand / Cardinal), la maîtrise courante subit **-15 %** (rouille). Cette rouille se **dissipe par usage** (le joueur récupère son niveau effectif en utilisant à nouveau l'arme).
>
> - Implémentation cible : flag `bRusty: bool` + `RustAmount: float` (0..0.15) sur `FHWWeaponMasteryData`.
> - À chaque hit confirmé, `RustAmount -= 0.001` (par exemple) jusqu'à 0.
>
> Refonte sémantique seule en V3 — pas d'implémentation.

## Sources

- `HWWeaponMasteryComponent.h` / `.cpp`
- Source XP : `UHWComboComponent::NotifyHitConfirmed()` (+10 XP par hit)

## FHWWeaponMasteryData

```cpp
EHWWeaponType WeaponType;
int32 MasteryLevel = 0;
float CurrentExperience = 0.f;
float ExperienceToNextLevel;
float DamageMultiplier = 1.0f;   // 1.0 + (Level × 0.02)
float AttackSpeedBonus = 0.f;    // Level × 0.5
float CritRateBonus = 0.f;       // Level × 0.1
```

## Progression XP exponentielle

```
XP_pour_Level(N) = 100 × 1.15^N
Level 0 → 1   : 100 XP
Level 10 → 11 : ~405 XP
Level 20 → 21 : ~1637 XP
```

**Source XP** : +10 XP par hit confirmé via `UHWComboComponent::NotifyHitConfirmed()`.

## API

```cpp
void AddMasteryExperience(EHWWeaponType WeaponType, float Experience);
FHWWeaponMasteryData GetMasteryData(EHWWeaponType WeaponType) const;
float GetCurrentDamageMultiplier(EHWWeaponType WeaponType) const;
float GetCurrentCritBonus(EHWWeaponType WeaponType) const;
```

## Application des bonus

- **DamageMultiplier** : appliqué lors du calcul de dégâts (voir [[Gameplay Effect]]).
- **CritRateBonus** : additionné au CritRate de base.
- **AttackSpeedBonus** : ⚠️ **non appliqué en production** — le `PlayRate` de [[Movesets]] ignore ce bonus (`HWComboComponent.cpp:318`).

## Voir aussi

- [[Combo System]] — `UHWComboComponent::BeginPlay` cache ce composant via `Owner->FindComponentByClass<UHWWeaponMasteryComponent>()` dans `CachedMasteryComponent` (`HWComboComponent.cpp:24`) ; `NotifyHitConfirmed()` appelle `CachedMasteryComponent->AddMasteryExperience(ActiveMoveset->WeaponType, 10.f)` (`HWComboComponent.cpp:161`) et `GetCurrentMasteryLevel()` lit `GetMasteryData(...).MasteryLevel` (`HWComboComponent.cpp:337`) pour filtrer les attaques par `RequiredMasteryLevel`.
- [[Movesets]] — `EHWWeaponType` est défini dans `HWWeaponMasteryComponent.h:10` et consommé par `UHWWeaponMoveset::WeaponType` (`HWWeaponMoveset.h:94`) ; `FHWWeaponMasteryData::WeaponType` (`.h:28`) sert de clé de lookup dans `GetMasteryData()` (`HWWeaponMasteryComponent.cpp:120`).
- [[Gameplay Tags]] — la fonction anonyme `WeaponTypeToTag()` (`HWWeaponMasteryComponent.cpp:10`) mappe `EHWWeaponType` vers `FHWGameplayTags::Weapon_Sword/Axe/Mace/Dagger/Bow/Staff/Spear/Shield` ; le tag résultant est passé à `ProgComp->SetProgress(EHWConditionType::MasteryLevel, WeaponTag, ...)` au level-up (`HWWeaponMasteryComponent.cpp:112`).
