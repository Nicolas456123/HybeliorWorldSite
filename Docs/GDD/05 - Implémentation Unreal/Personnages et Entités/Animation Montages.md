---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# AnimationMontages

Structures C++ et logiques de lecture des montages d'animation (dodge, combos, moveset d'arme) + catalogue complet des AnimMontages du projet.

> Catalogue généré via MCP Python (unreal_python) — Date : 2026-04-04
> Moteur : Unreal Engine 5.4
> Périmètre : `/Game/Assets` (récursif)
> **Total brut** : 99 entrées (doublons inter-squelettes inclus) → **~33 montages uniques**

## Classes C++ associées
- [[Anim Instance]] — joueur runtime des `UAnimMontage` (PlayMontageAndWait, montage slots)

## Montages de dodge (UHWGameplayAbility_Dodge)

**Fichiers :**
- `Public/AbilitySystem/HWGameplayAbility_Dodge.h`
- `Private/AbilitySystem/HWGameplayAbility_Dodge.cpp`

La capacite de dodge utilise `UAbilityTask_PlayMontageAndWait` (GAS) pour jouer un montage synchronise a la physique Root Motion.

### Proprietes

| Propriete | Type | Description |
|-----------|------|-------------|
| `DodgingAnimation` | `UAnimMontage*` | Montage a jouer (direction) |
| `DodgingAnimationPlayRate` | `float` | Vitesse de lecture (defaut : `1.f`) |

### Directions

| Valeur | Direction |
|--------|-----------|
| `0` | Avant (`GetActorForwardVector()`) |
| `1` | Droite (`GetActorRightVector()`) |
| `2` | Arriere (forward 180 deg) |
| `3` | Gauche (right 180 deg) |

### Physique Root Motion

`UAbilityTask_ApplyRootMotionConstantForce` :
- `Strength` : defaut `2000.f`
- `Duration` : defaut `0.2f`
- Mode fin velocite : `ClampVelocity` a `250.f`
- Friction sol = `0.f` pendant dodge, restauree a la fin

### Gameplay Effects lies

- `DodgedRecentlyGameplayEffect` — applique apres `DelayDodgedRecentlyApplication` sec
- `IFrameGameplayEffect` — applique apres `DelayIFrameApplication` sec (invulnerabilite)

### Capacites disponibles

```
GA_DodgeForwardClass
GA_DodgeBackClass
GA_DodgeLeftClass
GA_DodgeRightClass
```

## Montages d'attaque combo (UHWComboComponent)

**Fichiers :**
- `Public/Combat/HWComboComponent.h`
- `Private/Combat/HWComboComponent.cpp`

Les attaques portent un `FHWComboAttack` joue via `AnimInstance::Montage_Play()`.

### Struct FHWComboAttack

| Champ | Type | Description |
|-------|------|-------------|
| `AttackMontage` | `TObjectPtr<UAnimMontage>` | Montage attaque |
| `DamageMultiplier` | float | Multiplicateur (defaut `1.0f`) |
| `DamageType` | `FGameplayTag` | Type elementaire (optionnel) |
| `ComboWindowDuration` | float | Fenetre enchainement (defaut `0.8f`) |
| `StaminaCost` | float | Cout stamina (defaut `10.f`) |
| `RequiredMasteryLevel` | int32 | Niveau de maitrise requis |
| `HiddenUnlockCondition` | `FGameplayTag` | Tag cache (attaques secretes) |
| `OnHitEffect` | `TSubclassOf<UGameplayEffect>` | Effet sur hit |
| `bCanCharge` | bool | Permet la charge (hold) |
| `ChargedMultiplier` | float | Multiplicateur charge max (`2.0f`) |

### Logique de lecture

```cpp
void UHWComboComponent::PlayAttackMontage(const FHWComboAttack& Attack)
{
    // Character->GetMesh()->GetAnimInstance()
    const float PlayRate = ActiveMoveset
        ? ActiveMoveset->BaseAttackSpeed
        : 1.0f;
    AnimInstance->Montage_Play(Attack.AttackMontage, PlayRate);
}
```

Vitesse modulee par `BaseAttackSpeed` du moveset actif.

### Struct FHWComboChain

Sequence de `FHWComboAttack` + un `Finisher`.

| Champ | Role |
|-------|------|
| `ComboName` | Nom affiche |
| `ComboTag` | ex. `Combo.Light`, `Combo.Heavy`, `Combo.Special` |
| `Attacks[]` | Array d'attaques enchainables |
| `Finisher` | Derniere attaque plus puissante |
| `RequiredMasteryLevel` | Pour acceder au combo entier |

## Moveset d'arme (UHWWeaponMoveset)

**Fichier :** `Public/Combat/HWWeaponMoveset.h`

DataAsset centralisant tous les montages d'une arme :

| Montage | Propriete |
|---------|-----------|
| Stance inactive | `IdleStanceMontage` |
| Degainage | `DrawMontage` |
| Rengainage | `SheatheMontage` |
| Attaques combo | `ComboChains[n].Attacks[n].AttackMontage` |
| Skills d'arme | `WeaponSkills[n].AttackMontage` |

### Types d'armes (EHWWeaponType)

`Sword`, `Axe`, `Mace`, `Dagger`, `Bow`, `Staff`, `Spear`, `Shield`

## Courbe MeleeTwist

Les montages d'attaque incluent typiquement la courbe `MeleeTwist` lue par [[Anim Instance]]. Elle controle la torsion du torse/hanche pour ajouter de la lisibilite cinetique aux coups.

---

## Catalogue des AnimMontages — Résumé exécutif

Les AnimMontages du projet sont répartis en **5 catégories fonctionnelles** couvrant le combat au sol, le vol/esquive aérienne, l'atterrissage héroïque, l'arc et le pugilat. La majorité des montages existent en **deux copies squelette** : `HWSK_Mannequin_Skeleton` (personnage principal HW) et `SK_Mannequin` (Manny UE5 template), plus une troisième copie dans `SuperheroFlight/` pour les montages de vol.

### Squelettes référencés

| Identifiant squelette | Description | Usage |
|---|---|---|
| `HWSK_Mannequin_Skeleton` | Squelette principal HybeliorWorld (Mannequin UE4 retaggué) | Personnages jouables principaux |
| `SK_Mannequin` | Squelette Manny UE5 (template Epic) | Prototypage / tests en éditeur |

## Catégories de montages

### 1. Esquive au sol — `AM_Dodge_` / `Dodge_*_Seq_Montage`

Montages d'esquive directionnelle pour le gameplay au sol. Deux familles coexistent : la famille `AM_Dodge*` (Manny/SK_Mannequin) utilisée en prototypage et la famille `Dodge_*_Seq_Montage` (HWSK, pack EssentialSwordShield) utilisée en production.

| Nom du montage | Durée (s) | Squelette | Chemin source | Ability GAS associée |
|---|---|---|---|---|
| `AM_DodgeBackwardMontage` | 1.933 | `SK_Mannequin` | `.../Mannequins/Animations/Manny/Montages/` | `GA_Dodge` (backward) |
| `AM_DodgeForwardMontage` | 1.933 | `SK_Mannequin` | `.../Mannequins/Animations/Manny/Montages/` | `GA_Dodge` (forward) |
| `AM_DodgeForwardMontage02` | 0.033 | `SK_Mannequin` | `.../Mannequins/Animations/Manny/Montages/` | Variation / test (durée anormalement courte) |
| `Dodge_B_Seq_Montage` | 1.000 | `HWSK_Mannequin_Skeleton` | `.../EssentialSwordShieldAnimations/` | `GA_Dodge` (arrière) |
| `Dodge_F_Seq_Montage` | 1.000 | `HWSK_Mannequin_Skeleton` | `.../EssentialSwordShieldAnimations/` | `GA_Dodge` (avant) |
| `Dodge_L_Seq_Montage` | 1.000 | `HWSK_Mannequin_Skeleton` | `.../EssentialSwordShieldAnimations/` | `GA_Dodge` (gauche) |
| `Dodge_R_Seq_Montage` | 1.000 | `HWSK_Mannequin_Skeleton` | `.../EssentialSwordShieldAnimations/` | `GA_Dodge` (droite) |

> **Note** : `AM_DodgeForwardMontage02` a une durée de 0.033 s — probablement un asset vide ou un placeholder à supprimer.

### 2. Esquive en vol — `AM_Flight_Dodge_*`

20 montages d'esquive directionnelle pour le mode vol superhéroïque (pack SuperheroFlight). Chaque montage existe en **3 copies** (Mannequin_UE4, ma_polyphoria, SuperheroFlight/Mannequin). Format de nommage : `AM_Flight_Dodge_[Série]_[Direction]` où la direction est L/R/U/D (Left/Right/Up/Down).

| Série | Directions | Durée (s) | Squelette | Description |
|---|---|---|---|---|
| A | L, R, U, D | 1.833 | `HWSK_Mannequin_Skeleton` | Esquive vol — variante A |
| B | L, R, U, D | 1.833 | `HWSK_Mannequin_Skeleton` | Esquive vol — variante B |
| C | L, R, U, D | 1.833 | `HWSK_Mannequin_Skeleton` | Esquive vol — variante C |
| D | L, R, U, D | 1.833 | `HWSK_Mannequin_Skeleton` | Esquive vol — variante D |
| E | L, R, U, D | 1.833 | `HWSK_Mannequin_Skeleton` | Esquive vol — variante E |

**Chemin source (canonique)** : `/Game/Assets/Characters/Mannequin_UE4/Animations/Flight/Dodge/`
**Ability GAS** : `GA_FlightDodge` ou équivalent (direction passée en paramètre)
**Total** : 20 montages uniques (5 séries × 4 directions), chacun en 3 exemplaires squelette = 60 assets

### 3. Atterrissage héroïque — `AM_SuperheroLanding_*`

5 variantes d'atterrissage depuis le vol superhéroïque. Chacune existe en 3 copies squelette.

| Nom du montage | Durée (s) | Squelette | Description |
|---|---|---|---|
| `AM_SuperheroLanding_A` | 2.000 | `HWSK_Mannequin_Skeleton` | Atterrissage — variante A |
| `AM_SuperheroLanding_B` | 2.000 | `HWSK_Mannequin_Skeleton` | Atterrissage — variante B |
| `AM_SuperheroLanding_C` | 2.000 | `HWSK_Mannequin_Skeleton` | Atterrissage — variante C |
| `AM_SuperheroLanding_D` | 2.000 | `HWSK_Mannequin_Skeleton` | Atterrissage — variante D |
| `AM_SuperheroLanding_E` | 2.000 | `HWSK_Mannequin_Skeleton` | Atterrissage — variante E |

**Chemin source** : `/Game/Assets/Characters/Mannequin_UE4/Animations/Flight/Land/`
**Ability GAS** : `GA_SuperheroLanding` / déclenchée à la sortie du mode vol (impact au sol)

### 4. Combat mêlée — Épée & Bouclier / Pugilat

Montages d'attaque et d'équipement issus du pack EssentialSwordShield et FightingAnimsetPro.

| Nom du montage | Durée (s) | Squelette | Catégorie | Ability GAS associée |
|---|---|---|---|---|
| `Attack_01_Seq_Montage` | 1.667 | `HWSK_Mannequin_Skeleton` | Attaque épée | `GA_MeleeAttack` (combo 1) |
| `Equip_02_Seq_Montage` | 0.833 | `HWSK_Mannequin_Skeleton` | Équipement arme | `GA_EquipWeapon` |
| `KB_m_Jab_R_Montage` | 0.933 | `HWSK_Mannequin_Skeleton` | Jab droit (pugilat) | `GA_PunchJab` / `GA_Unarmed` |

**Chemins source** :
- `.../EssentialSwordShieldAnimations/` — épée/bouclier
- `.../FightingAnimsetPro/InPlace/` — pugilat corps-à-corps

### 5. Arc — `Bow_*_Montage`

3 montages dédiés au système d'arc (pack Archery).

| Nom du montage | Durée (s) | Squelette | Description | Ability GAS associée |
|---|---|---|---|---|
| `Bow_Equip_Quick_Montage` | 1.583 | `HWSK_Mannequin_Skeleton` | Équipement rapide de l'arc | `GA_EquipBow` |
| `Bow_InPlace_Shoot_2_Aim_Montage` | 1.483 | `HWSK_Mannequin_Skeleton` | Tir en place avec visée | `GA_BowShoot` |
| `Bow_Unequip_Quick_Montage` | 1.317 | `HWSK_Mannequin_Skeleton` | Déséquipement rapide de l'arc | `GA_UnequipBow` |

**Chemin source** :
- `.../Archery/RootMotion/` — équipement/déséquipement (avec root motion)
- `.../Archery/InPlace/` — tir sur place

### 6. Magie / Incantation — `AM_Cast`

| Nom du montage | Durée (s) | Squelette | Description | Ability GAS associée |
|---|---|---|---|---|
| `AM_Cast` | 0.967 | `SK_Mannequin` | Animation de lancer de sort | `GA_Cast` / `GA_SpellCast` |

**Chemin source** : `/Game/Assets/Characters/Mannequins/Animations/Manny/Montages/`

## Tableau récapitulatif complet

| # | Nom du montage | Catégorie | Durée (s) | Squelette principal | Copies |
|---|---|---|---|---|---|
| 1 | `AM_Cast` | Magie | 0.967 | `SK_Mannequin` | 1 |
| 2 | `AM_DodgeBackwardMontage` | Esquive sol | 1.933 | `SK_Mannequin` | 1 |
| 3 | `AM_DodgeForwardMontage` | Esquive sol | 1.933 | `SK_Mannequin` | 1 |
| 4 | `AM_DodgeForwardMontage02` | Esquive sol (test) | 0.033 | `SK_Mannequin` | 1 |
| 5 | `AM_Flight_Dodge_A_D` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 6 | `AM_Flight_Dodge_A_L` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 7 | `AM_Flight_Dodge_A_R` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 8 | `AM_Flight_Dodge_A_U` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 9 | `AM_Flight_Dodge_B_D` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 10 | `AM_Flight_Dodge_B_L` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 11 | `AM_Flight_Dodge_B_R` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 12 | `AM_Flight_Dodge_B_U` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 13 | `AM_Flight_Dodge_C_D` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 14 | `AM_Flight_Dodge_C_L` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 15 | `AM_Flight_Dodge_C_R` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 16 | `AM_Flight_Dodge_C_U` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 17 | `AM_Flight_Dodge_D_D` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 18 | `AM_Flight_Dodge_D_L` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 19 | `AM_Flight_Dodge_D_R` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 20 | `AM_Flight_Dodge_D_U` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 21 | `AM_Flight_Dodge_E_D` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 22 | `AM_Flight_Dodge_E_L` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 23 | `AM_Flight_Dodge_E_R` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 24 | `AM_Flight_Dodge_E_U` | Esquive vol | 1.833 | `HWSK_Mannequin_Skeleton` | 3 |
| 25 | `AM_SuperheroLanding_A` | Atterrissage vol | 2.000 | `HWSK_Mannequin_Skeleton` | 3 |
| 26 | `AM_SuperheroLanding_B` | Atterrissage vol | 2.000 | `HWSK_Mannequin_Skeleton` | 3 |
| 27 | `AM_SuperheroLanding_C` | Atterrissage vol | 2.000 | `HWSK_Mannequin_Skeleton` | 3 |
| 28 | `AM_SuperheroLanding_D` | Atterrissage vol | 2.000 | `HWSK_Mannequin_Skeleton` | 3 |
| 29 | `AM_SuperheroLanding_E` | Atterrissage vol | 2.000 | `HWSK_Mannequin_Skeleton` | 3 |
| 30 | `Attack_01_Seq_Montage` | Combat mêlée | 1.667 | `HWSK_Mannequin_Skeleton` | 2 |
| 31 | `Bow_Equip_Quick_Montage` | Arc | 1.583 | `HWSK_Mannequin_Skeleton` | 2 |
| 32 | `Bow_InPlace_Shoot_2_Aim_Montage` | Arc | 1.483 | `HWSK_Mannequin_Skeleton` | 2 |
| 33 | `Bow_Unequip_Quick_Montage` | Arc | 1.317 | `HWSK_Mannequin_Skeleton` | 2 |
| 34 | `Dodge_B_Seq_Montage` | Esquive sol | 1.000 | `HWSK_Mannequin_Skeleton` | 2 |
| 35 | `Dodge_F_Seq_Montage` | Esquive sol | 1.000 | `HWSK_Mannequin_Skeleton` | 2 |
| 36 | `Dodge_L_Seq_Montage` | Esquive sol | 1.000 | `HWSK_Mannequin_Skeleton` | 2 |
| 37 | `Dodge_R_Seq_Montage` | Esquive sol | 1.000 | `HWSK_Mannequin_Skeleton` | 2 |
| 38 | `Equip_02_Seq_Montage` | Équipement | 0.833 | `HWSK_Mannequin_Skeleton` | 2 |
| 39 | `KB_m_Jab_R_Montage` | Pugilat | 0.933 | `HWSK_Mannequin_Skeleton` | 2 |

## Mapping GAS (Gameplay Ability System)

| Catégorie | Montage(s) | Tag GAS probable | Ability Blueprint |
|---|---|---|---|
| Magie | `AM_Cast` | `Ability.Cast` / `Ability.Magic` | `GA_SpellCast` |
| Esquive sol | `Dodge_[B/F/L/R]_Seq_Montage` | `Ability.Dodge` | `GA_Dodge` |
| Esquive sol (proto) | `AM_DodgeBackwardMontage`, `AM_DodgeForwardMontage` | `Ability.Dodge` | Tests Manny |
| Esquive vol | `AM_Flight_Dodge_[A-E]_[L/R/U/D]` | `Ability.Flight.Dodge` | `GA_FlightDodge` |
| Atterrissage vol | `AM_SuperheroLanding_[A-E]` | `Ability.Flight.Land` | `GA_SuperheroLanding` |
| Attaque épée | `Attack_01_Seq_Montage` | `Ability.Melee.Attack` | `GA_MeleeAttack` |
| Équipement | `Equip_02_Seq_Montage` | `Ability.Equip` | `GA_EquipWeapon` |
| Arc équipement | `Bow_Equip_Quick_Montage` | `Ability.Equip.Bow` | `GA_EquipBow` |
| Arc tir | `Bow_InPlace_Shoot_2_Aim_Montage` | `Ability.Bow.Shoot` | `GA_BowShoot` |
| Arc déséquipement | `Bow_Unequip_Quick_Montage` | `Ability.Unequip.Bow` | `GA_UnequipBow` |
| Pugilat | `KB_m_Jab_R_Montage` | `Ability.Unarmed.Jab` | `GA_PunchJab` |

## Points d'attention et recommandations

| Problème | Montage concerné | Action suggérée |
|---|---|---|
| Durée anormale (0.033 s) | `AM_DodgeForwardMontage02` | Vérifier si placeholder — supprimer ou compléter |
| Doublons squelettes | Tous les montages Flight/Land/EssentialSword | Conserver uniquement la copie `HWSK_Mannequin_Skeleton` en production ; archiver SK_Mannequin |
| Magie limitée | `AM_Cast` uniquement | Prévoir des montages distincts par type de sort (feu, glace, foudre…) |
| Attaque mêlée unique | `Attack_01_Seq_Montage` uniquement | Ajouter combo 2/3, heavy attack, finisher |
| Pugilat partiel | `KB_m_Jab_R_Montage` uniquement | Compléter avec jab gauche, crochet, uppercut, esquive corps |
| Vol sans transitions | Pas de montage `AM_Flight_TakeOff` ni `AM_Flight_Idle_Start` | Ajouter montages de décollage et d'entrée en vol |

## Structure des dossiers sources

```
/Game/Assets/
├── Characters/
│   ├── Mannequins/Animations/Manny/Montages/          ← Prototypes SK_Mannequin (UE5)
│   ├── Mannequin_UE4/Animations/
│   │   ├── Flight/Dodge/                              ← 20 montages AM_Flight_Dodge_*
│   │   ├── Flight/Land/                               ← 5 montages AM_SuperheroLanding_*
│   │   ├── EssentialSwordShieldAnimations/            ← Épée, bouclier, esquive sol
│   │   ├── Archery/RootMotion/ + InPlace/             ← Arc
│   │   └── FightingAnimsetPro/InPlace/                ← Pugilat
│   └── ma_polyphoria/Animation/                       ← Copies polyphoria (doublon)
└── SuperheroFlight/Characters/Mannequin/Animations/   ← Copies pack SuperheroFlight (doublon)
```

## Voir aussi

- [[Anim Instance]] — `bIsMontagePlaying` (`HWPlayerAnimInstance.h:118`) alimente par `IsAnyMontagePlaying()` chaque frame ; la courbe `MeleeTwist` (`MeleeTwistCurveName = "MeleeTwist"`, `HWPlayerAnimInstance.h:120,124`) embarquee dans les montages melee est lue via `GetCurveValue` et publiee pour piloter la torsion torse/hanche.
- [[Combo System]] — `UHWComboComponent::PlayAttackMontage(const FHWComboAttack&)` recupere l'AnimInstance via `Character->GetMesh()->GetAnimInstance()` et appelle `Montage_Play(Attack.AttackMontage, PlayRate)` en modulant la vitesse par `ActiveMoveset->BaseAttackSpeed` ; les `FHWComboAttack::AttackMontage` / `FHWWeaponMoveset` (Draw/Sheathe/Idle) pointent vers les montages catalogues ici.
