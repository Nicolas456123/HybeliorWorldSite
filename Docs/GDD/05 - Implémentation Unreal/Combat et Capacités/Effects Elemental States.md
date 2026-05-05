---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Gameplay Effects — États et Élémentaires (HybeliorWorld GAS)

> **Source :** Extraction MCP live depuis l'éditeur Unreal Engine 5.4  
> **Date :** 2026-04-04  
> **Chemin Unity :** `/Game/AbilitySystem/GEs/`

## Classes C++ associées
- [[Gameplay Effect]] — classe C++ des GE_Apply*/DoT élémentaires et IFrames d'esquive
- [[Elemental Reactions]] — moteur de réactions (Wet+Lightning, Wet+Ice, etc.) consommant ces états

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [GEs d'états élémentaires](#ges-détats-élémentaires)
   - [GE_BurningEffect (DoT Brûlure)](#ge_burningeffect--dot-brûlure)
   - [GE_ApplyBurningFor10Seconds (Applicateur Brûlure)](#ge_applyburningfor10seconds--applicateur-brûlure)
   - [GE_ApplyWetFor10Seconds (État Mouillé)](#ge_applywetfor10seconds--état-mouillé)
   - [GE_ApplyColdFor6Seconds (État Froid)](#ge_applycoldfor6seconds--état-froid)
   - [GE_ApplyFrozenFor4Seconds (État Gelé)](#ge_applyfrozenfor4seconds--état-gelé)
3. [États Electrified / Charged (en attente)](#états-electrified--charged-en-attente)
4. [GEs d'invulnérabilité (IFrame) et Esquive](#ges-dinvulnérabilité-iframe-et-esquive)
   - [GE_DodgeForwardIFrame](#ge_dodgeforwardiframe)
   - [GE_DodgeBackwardIFrame](#ge_dodgebackwardiframe)
   - [GE_DodgedRecently](#ge_dodgedrecently)
5. [GEs de combat (états passifs)](#ges-de-combat-états-passifs)
6. [GEs de régénération (AbilitySet)](#ges-de-régénération-abilityset)
7. [GEs de dégâts instantanés](#ges-de-dégâts-instantanés)
8. [GEs de mouvement](#ges-de-mouvement)
9. [Player_AbilitySet](#player_abilityset)
10. [AbilityTagRelationshipMapping](#abilitytagrelationshipmapping)
11. [Tags Combat — Inventaire complet (CombatTags DataTable)](#tags-combat--inventaire-complet)
12. [Architecture et patterns GAS](#architecture-et-patterns-gas)

---

## Vue d'ensemble

Le système GAS de HybeliorWorld utilise deux couches pour les états élémentaires :

| Couche | Rôle | Exemple |
|--------|------|---------|
| **Applicateur** (`Apply*`) | Accorde le tag d'état, durée fixe, stacking AGGREGATE_BY_TARGET | `GE_ApplyBurningFor10Seconds` |
| **Effet actif** (DoT/état) | Applique les modificateurs d'attributs (dégâts/tick, debuffs) | `GE_BurningEffect` |

Les GEs d'état accordent leurs tags via `InheritableOwnedTagsContainer` (propriété C++ exposée).  
Tous les **applicateurs** utilisent le pattern stacking `AGGREGATE_BY_TARGET` avec `REFRESH_ON_SUCCESSFUL_APPLICATION` — la durée se réinitialise à chaque nouvelle application.

---

## GEs d'états élémentaires

### GE_BurningEffect — DoT Brûlure

**Chemin :** `/Game/AbilitySystem/GEs/GE_BurningEffect`  
**Classe parente :** `UGameplayEffect` (Blueprint)

| Propriété | Valeur |
|-----------|--------|
| **Duration Policy** | `HAS_DURATION` |
| **Durée** | **10.0 secondes** |
| **Période (tick)** | **1.0 seconde** |
| **Stacking** | `NONE` (pas de stacking propre — géré par l'applicateur) |
| **Tag accordé** | `Combat.State.Burning` |

**Modificateurs d'attributs :**

| Attribut | Opération | Valeur |
|----------|-----------|--------|
| `Damage` | `ADDITIVE` | `+1.0` par tick |

**Comportement :** Inflige 1 point de dégât brut sur l'attribut `Damage` toutes les secondes. L'attribut `Damage` est ensuite traité par le `UHWDamageExecution` ou l'`AttributeSet` pour calculer les dégâts réels. Durée totale : 10 ticks = 10 dégâts bruts minimum.

**Conditions de suppression :** Expiration naturelle (10s). Aucun `removal_tag_requirements` configuré. La suppression de l'état Burning peut être gérée en retirant le GE_BurningEffect par code.

---

### GE_ApplyBurningFor10Seconds — Applicateur Brûlure

**Chemin :** `/Game/AbilitySystem/GEs/GE_ApplyBurningFor10Seconds`

> **Note :** Malgré son nom, la durée effective configurée est **6 secondes**. Le nom du Blueprint est probablement un héritage d'une version antérieure.

| Propriété | Valeur |
|-----------|--------|
| **Duration Policy** | `HAS_DURATION` |
| **Durée effective** | **6.0 secondes** (scalable float) |
| **Période** | `0.0` (non périodique — rôle de tag uniquement) |
| **Stacking** | `AGGREGATE_BY_TARGET` — limite 1 stack |
| **Stack Expiration** | `CLEAR_ENTIRE_STACK` |
| **Stack Duration Refresh** | `REFRESH_ON_SUCCESSFUL_APPLICATION` |
| **Stack Period Reset** | `RESET_ON_SUCCESSFUL_APPLICATION` |
| **Tag accordé** | `Combat.State.Burning` |
| **Modificateurs** | Aucun |

**Rôle :** Cet applicateur accorde et maintient le tag `Combat.State.Burning`. Il est appliqué par les capacités de feu (ex. `GA_Fireball`). La durée se réinitialise à chaque nouvelle application, empêchant les accumulations multiples.

**Conditions de suppression :**
- Expiration naturelle (6s sans nouvelle application)
- Pas de `removal_tag_requirements` configuré
- Le stack entier est effacé à l'expiration (`CLEAR_ENTIRE_STACK`)

---

### GE_ApplyWetFor10Seconds — État Mouillé

**Chemin :** `/Game/AbilitySystem/GEs/GE_ApplyWetFor10Seconds`

| Propriété | Valeur |
|-----------|--------|
| **Duration Policy** | `HAS_DURATION` |
| **Durée** | **10.0 secondes** |
| **Période** | `0.0` |
| **Stacking** | `AGGREGATE_BY_TARGET` — limite 1 stack |
| **Stack Duration Refresh** | `REFRESH_ON_SUCCESSFUL_APPLICATION` |
| **Tag accordé** | `Combat.State.Wet` |
| **Modificateurs** | Aucun |

**Rôle :** Marque la cible comme mouillée. État nécessaire aux combos élémentaires (Wet + Lightning = Électrocuté, Wet + Cold = Gelé). Aucun dégât direct.

**Conditions de suppression :**
- Expiration naturelle (10s)
- Peut être supprimé si la mécanique de transition vers `Frozen` retire le GE

---

### GE_ApplyColdFor6Seconds — État Froid

**Chemin :** `/Game/AbilitySystem/GEs/GE_ApplyColdFor6Seconds`

| Propriété | Valeur |
|-----------|--------|
| **Duration Policy** | `HAS_DURATION` |
| **Durée** | **6.0 secondes** |
| **Stacking** | `AGGREGATE_BY_TARGET` — limite 1 stack |
| **Stack Duration Refresh** | `REFRESH_ON_SUCCESSFUL_APPLICATION` |
| **Tag accordé** | `Combat.State.Cold` |
| **Modificateurs** | Aucun |

**Rôle :** Marque la cible comme refroidie. État préliminaire avant la transition vers `Frozen`. Peut réduire la vitesse (à implémenter via modificateurs ou Execution).

**Conditions de suppression :**
- Expiration naturelle (6s)
- Transition vers `Frozen` (logique dans l'Execution ou la GA)

---

### GE_ApplyFrozenFor4Seconds — État Gelé

**Chemin :** `/Game/AbilitySystem/GEs/GE_ApplyFrozenFor4Seconds`

| Propriété | Valeur |
|-----------|--------|
| **Duration Policy** | `HAS_DURATION` |
| **Durée** | **4.0 secondes** |
| **Stacking** | `AGGREGATE_BY_TARGET` — limite 1 stack |
| **Stack Expiration** | `CLEAR_ENTIRE_STACK` |
| **Stack Duration Refresh** | `REFRESH_ON_SUCCESSFUL_APPLICATION` |
| **Tag accordé** | `Combat.State.Frozen` |
| **Modificateurs** | Aucun |

**Rôle :** État de gel complet. En pratique, devrait bloquer les déplacements et actions de la cible (à implémenter via `activation_blocked_tags` sur les GAs ou un modificateur de vitesse).

**Conditions de suppression :**
- Expiration naturelle (4s)
- `CLEAR_ENTIRE_STACK` à l'expiration

---

## États Electrified / Charged (en attente)

Les tags `Combat.State.Electrified` et `Combat.State.Charged` sont **enregistrés** dans le DataTable `CombatTags` mais **aucun GE Blueprint dédié n'existe encore** dans `/Game/AbilitySystem/GEs/`.

Le GE `GE_LightningStormDamage` existe pour les dégâts de foudre instantanés mais ne gère pas d'état persistant.

**Tags existants sans GE associé :**
- `Combat.State.Electrified` (CombatStateElectrified)
- `Combat.State.Charged` (CombatStateCharged)

**À créer :**
- `GE_ApplyElectrifiedForXSeconds` — état électrifié (interaction avec Wet)
- `GE_ApplyChargedForXSeconds` — état chargé (accumulation de charges électriques)

---

## GEs d'invulnérabilité (IFrame) et Esquive

### GE_DodgeForwardIFrame

**Chemin :** `/Game/AbilitySystem/GEs/Movement/GE_DodgeForwardIFrame`

| Propriété | Valeur |
|-----------|--------|
| **Duration Policy** | `HAS_DURATION` |
| **Durée** | **0.5 seconde** |
| **Stacking** | `NONE` |
| **Tag accordé** | `Combat.State.Iframe` |
| **Modificateurs** | Aucun |

**Rôle :** Accorde l'invulnérabilité pendant la roulade avant (0.5s). Le tag `Combat.State.Iframe` doit être utilisé comme `IgnoreTags` dans les `ApplicationTagRequirements` des GEs de dégâts pour annuler les hits.

---

### GE_DodgeBackwardIFrame

**Chemin :** `/Game/AbilitySystem/GEs/Movement/GE_DodgeBackwardIFrame`

| Propriété | Valeur |
|-----------|--------|
| **Duration Policy** | `HAS_DURATION` |
| **Durée** | **~0.6 seconde** (0.6000000238418579) |
| **Stacking** | `NONE` |
| **Tag accordé** | `Combat.State.Iframe` |
| **Modificateurs** | Aucun |

**Rôle :** Identique à DodgeForwardIFrame mais pour la roulade arrière, durée légèrement plus longue (+0.1s).

---

### GE_DodgedRecently

**Chemin :** `/Game/AbilitySystem/GEs/Movement/GE_DodgedRecently`

| Propriété | Valeur |
|-----------|--------|
| **Duration Policy** | `HAS_DURATION` |
| **Durée** | **0.5 seconde** |
| **Stacking** | `NONE` |
| **Tag accordé** | `Combat.State.DodgedRecently` |
| **Modificateurs** | Aucun |

**Rôle :** Marque le personnage comme "ayant esquivé récemment". Ce tag est utilisé dans l'`AbilityTagRelationshipMapping` comme `activation_required_tags` — certaines capacités ne peuvent s'activer qu'après une esquive récente (ex. attaque de contre après esquive).

**Usage dans TagRelationshipMapping :** Le seul `ability_tag_relationships` configuré requiert `Combat.State.DodgedRecently` dans `activation_required_tags`.

---

## GEs de combat (états passifs)

Ces GEs accordent des tags d'état de combat, sont en `INFINITE` et sont gérés manuellement par les GAs.

| GE | Tag accordé | Durée | Usage |
|----|-------------|-------|-------|
| `GE_ReadyToFight` | `Combat.State.ReadyToFight` | `INFINITE` | Posture de combat active |
| `GE_Blocking` | `Combat.State.Blocking` | `INFINITE` | Bouclier levé |
| `GE_Aiming` | `InputTag.Aiming` | `INFINITE` | Mode visée (arc) |
| `GE_ComboWindow01` | `Combat.Combo.Window.1` | `HAS_DURATION` (0s config.) | Fenêtre de combo |
| `GE_UnarmedTag` | `Combat.Set.Unarmed` | `INFINITE` | Équipement : mains nues |
| `GE_SwordAndShield` | *(à vérifier)* | `INFINITE` | Équipement : épée + bouclier |
| `GE_Bow` | *(à vérifier)* | `INFINITE` | Équipement : arc |

> **Note :** `GE_ComboWindow01` a une durée configurée à 0.0 dans le scalable float. La durée réelle est probablement passée via SetByCaller ou une courbe dans le Blueprint Graph.

---

## GEs de régénération (AbilitySet)

Ces trois GEs sont accordés au démarrage par le `Player_AbilitySet` (INFINITE, période 1s).

| GE | Attribut | Valeur/tick | Durée |
|----|----------|-------------|-------|
| `GE_HPRegenEffect` | `Healing` | `+0.0` (placeholder) | `INFINITE` |
| `GE_ManaRegenEffect` | `Mana` | `+0.0` (placeholder) | `INFINITE` |
| `GE_StaminaRegenEffect` | `Stamina` | `+10.0` | `INFINITE` |

> **Note :** Les valeurs HP et Mana regen sont à `0.0`. Les valeurs réelles sont probablement définies via une CurveTable ou passées par SetByCaller en jeu. La régénération Stamina est opérationnelle à +10/seconde.

---

## GEs de dégâts instantanés

| GE | Type | Durée | Attribut | Valeur |
|----|------|-------|----------|--------|
| `GE_FallingDamageEffect` | `INSTANT` | — | `Damage` | `+0.0` (SetByCaller) |
| `GE_FireballDamageEffect` | `INSTANT` | — | *(Execution)* | — |
| `GE_IcicleDamageEffect` | `INSTANT` | — | *(Execution)* | — |
| `GE_LightningStormDamage` | `INSTANT` | — | `Damage` | `+50.0` |
| `GE_TestDamage50` | `INSTANT` | — | *(à vérifier)* | 50 |
| `GE_DodgeStaminaCost` | `INSTANT` | — | `Stamina` | `-33.33` |

**Coûts de mana (sorts) :**

| GE | Attribut | Valeur |
|----|----------|--------|
| `GE_ManaCostFor_Fireball` | `Mana` | *(scalable float)* |
| `GE_ManaCostFor_Icicle` | `Mana` | *(scalable float)* |

---

## GEs de mouvement

Tous `INFINITE`, aucun modificateur d'attribut — accordent uniquement le tag d'état de mouvement.

| GE | Tag accordé |
|----|-------------|
| `GE_Walking` | `MovementState.Walking` |
| `GE_Running` | `MovementState.Running` |
| `GE_Sprinting` | `MovementState.Sprinting` |
| `GE_Crouching` | `MovementState.Crouching` |
| `GE_Flying` | `MovementState.Flying` |
| `GE_Swimming` | `MovementState.Swimming` |
| `GE_Driving` | *(à vérifier)* |
| `GE_OnBoat` | *(à vérifier)* |
| `GE_FirstCamera` | *(tag caméra première personne)* |

---

## Player_AbilitySet

**Chemin :** `/Game/AbilitySystem/AbilitySet/Player_AbilitySet`  
**Classe :** `HWGameplayAbilitySet`

### GEs accordés au démarrage (4)

| # | Gameplay Effect | Niveau |
|---|----------------|--------|
| 1 | `GE_HPRegenEffect` | 1 |
| 2 | `GE_StaminaRegenEffect` | 1 |
| 3 | `GE_ManaRegenEffect` | 1 |
| 4 | `GE_UnarmedTag` | 1 |

### Capacités accordées au démarrage (38)

| Capacité | Input Tag |
|----------|-----------|
| `GA_Icicle` | *(aucun)* |
| `GA_ApplyFallingDamage` | *(aucun)* |
| `GA_DodgeForwardAbility` | *(aucun)* |
| `GA_DodgeBackAbility` | *(aucun)* |
| `GA_DoubleJumpAbility` | `InputTag.Jump` |
| `GA_Combo2` | *(aucun)* |
| `GA_Combo1` | *(aucun)* |
| `GA_Fireball` | `InputTag.Abilities.NormalAbility2` |
| `GA_BasicAttack` | `InputTag.Abilities.SpecialAbility1` |
| `GA_ReadyToFight` | `InputTag.Abilities.ReadyToFight` |
| `GA_Equip` | *(aucun)* |
| `GA_Unequip` | *(aucun)* |
| `GA_SetUpEquipment` | *(aucun)* |
| `GA_SwordAttack` | *(aucun)* |
| `GA_WalkRun` | `InputTag.WalkRun` |
| `GA_Blocking` | *(aucun)* |
| `GA_SprintStart` | *(aucun)* |
| `GA_SprintStop` | *(aucun)* |
| `GA_SwitchSwordAndBow` | *(aucun)* |
| `GA_SwordAttackTrace` | *(aucun)* |
| `GA_Crouch` | *(aucun)* |
| `GA_Aiming` | *(aucun)* |
| `GA_BowShoot` | *(aucun)* |
| `GA_UnarmedAttack` | *(aucun)* |
| `GA_FlyingStart` | *(aucun)* |
| `GA_FlyingStop` | *(aucun)* |
| `GA_DodgeRightAbility` | *(aucun)* |
| `GA_DodgeLeftAbility` | *(aucun)* |
| `GA_FollowDirectionInput` | *(aucun)* |
| `GA_FollowMouseDirection` | *(aucun)* |
| `GA_FirstCameraOff` | *(aucun)* |
| `GA_FirstCameraOn` | *(aucun)* |
| `GA_SwimmingStart` | *(aucun)* |
| `GA_SwimmingStop` | *(aucun)* |
| `GA_DrivingStart` | *(aucun)* |
| `GA_DrivingStop` | *(aucun)* |
| `GA_OnBoatStart` | *(aucun)* |
| `GA_OneBoatStop` | *(aucun)* |

**AttributeSets accordés :** Aucun (les AttributeSets sont probablement attachés via le Character Blueprint directement).

---

## AbilityTagRelationshipMapping

**Chemin :** `/Game/AbilitySystem/AbilitySet/AbilityTagRelationshipMapping`  
**Classe :** `HWAbilityTagRelationshipMapping`

### Relations configurées (1 entrée active)

| ability_tag | AbilityTagsToBlock | AbilityTagsToCancel | ActivationRequiredTags | ActivationBlockedTags |
|-------------|-------------------|--------------------|-----------------------|-----------------------|
| *(vide)* | *(vide)* | *(vide)* | `Combat.State.DodgedRecently` | *(vide)* |

**Interprétation :** La seule relation active n'a pas de tag de capacité source défini (`ability_tag` vide), mais requiert `Combat.State.DodgedRecently` pour l'activation. Cela correspond probablement à une capacité de contre-attaque ou de dash-cancel qui ne peut s'activer qu'immédiatement après une esquive.

> **Attention :** Le mapping est peu rempli — la majorité des règles de blocage/annulation de capacités sont probablement gérées directement dans les `ActivationBlockedTags` de chaque GA Blueprint.

---

## Tags Combat — Inventaire complet

Source : DataTable `/Game/AbilitySystem/Tags/CombatTags`

### Tags d'état (`Combat.State.*`)

| Clé DataTable | Tag GameplayTag | GE associé |
|---------------|----------------|------------|
| `CombatStateDead` | `Combat.State.Dead` | *(pas de GE — état mort)* |
| `CombatStateBurning` | `Combat.State.Burning` | `GE_ApplyBurningFor10Seconds` / `GE_BurningEffect` |
| `CombatStateWet` | `Combat.State.Wet` | `GE_ApplyWetFor10Seconds` |
| `CombatStateCold` | `Combat.State.Cold` | `GE_ApplyColdFor6Seconds` |
| `CombatStateFrozen` | `Combat.State.Frozen` | `GE_ApplyFrozenFor4Seconds` |
| `CombatStateElectrified` | `Combat.State.Electrified` | **PAS DE GE** (tag seul) |
| `CombatStateCharged` | `Combat.State.Charged` | **PAS DE GE** (tag seul) |
| `CombatStateIframe` | `Combat.State.Iframe` | `GE_DodgeForwardIFrame` / `GE_DodgeBackwardIFrame` |
| `CombatStateDodgedRecently` | `Combat.State.DodgedRecently` | `GE_DodgedRecently` |
| `CombatStateReadyToFight` | `Combat.State.ReadyToFight` | `GE_ReadyToFight` |
| `Blocking` | `Combat.State.Blocking` | `GE_Blocking` |

### Tags de type de dégât (`Combat.DamageType.*`)

| Clé DataTable | Tag |
|---------------|-----|
| `CombatDamageTypeFire` | `Combat.DamageType.Fire` |
| `CombatDamageTypeWater` | `Combat.DamageType.Water` |
| `CombatDamageTypeIce` | `Combat.DamageType.Ice` |
| `CombatDamageTypeLightning` | `Combat.DamageType.Lightning` |
| `CombatDamageTypeFalling` | `Combat.DamageType.Falling` |

### Tags de flags combat

| Clé DataTable | Tag | Usage |
|---------------|-----|-------|
| `CombatFlagsCriticalHit` | `Combat.Flags.CriticalHit` | Marqueur coup critique |
| `CombatCooldownNormalAbility1` | `Combat.Cooldown.NormalAbility1` | Cooldown skill 1 |
| `CombatCooldownNormalAbility2` | `Combat.Cooldown.NormalAbility2` | Cooldown skill 2 |
| `CombatComboWindow1` | `Combat.Combo.Window.1` | Fenêtre combo 1 |

### Tags SetByCaller (magnitudes dynamiques)

| Clé DataTable | Tag SetByCaller |
|---------------|----------------|
| `SetByCallerStrength` | Force |
| `SetByCallerAttack` | Attaque |
| `SetByCallerSpeed` | Vitesse |
| `SetByCallerAgility` | Agilité |
| `SetByCallerCritDamage` | Dégâts critiques |
| `SetByCallerIntelligence` | Intelligence |
| `SetByCallerConstitution` | Constitution |
| `SetByCallerMaxStamina` | Stamina max |
| `SetByCallerMaxHealth` | HP max |
| `SetByCallerMaxMana` | Mana max |
| `SetByCallerDefense` | Défense |

### Tags d'équipement (`Combat.Set.*`)

| Clé DataTable | Tag |
|---------------|-----|
| `CombatSetUnarmed` | `Combat.Set.Unarmed` |
| `CombatSetSwordAndShield` | `Combat.Set.SwordAndShield` |
| `CombatSetBow` | `Combat.Set.Bow` |

---

## Architecture et patterns GAS

### Pattern Applicateur + DoT (Burning)

```
GA_Fireball
  └─ ApplyGE: GE_ApplyBurningFor10Seconds   → accorde Combat.State.Burning (6s, refreshable)
  └─ ApplyGE: GE_BurningEffect              → Damage +1/sec pendant 10s (DoT indépendant)
```

Les deux GEs sont appliqués séparément. L'applicateur maintient le tag d'état (pour les réactions
élémentaires), tandis que le DoT gère les dégâts périodiques. Cette séparation permet de :
- Vérifier `Combat.State.Burning` sans dépendre de l'activation du DoT
- Configurer des durées différentes entre le marqueur d'état et les dégâts

### Pattern Tag-Only (Wet, Cold, Frozen)

```
GA_WaterSpell
  └─ ApplyGE: GE_ApplyWetFor10Seconds       → accorde Combat.State.Wet (10s)
  
GA_IceSpell
  └─ ApplyGE: GE_ApplyColdFor6Seconds       → accorde Combat.State.Cold (6s)
  └─ IF target has Combat.State.Wet:
       RemoveGE: GE_ApplyWetFor10Seconds
       ApplyGE:  GE_ApplyFrozenFor4Seconds  → accorde Combat.State.Frozen (4s)
```

Les états Wet, Cold et Frozen n'ont pas de DoT — ils servent uniquement de marqueurs pour
les interactions élémentaires et les modificateurs de gameplay (vitesse réduite, CC).

### Stacking AGGREGATE_BY_TARGET

Tous les applicateurs utilisent `AGGREGATE_BY_TARGET` avec `stack_limit=1`. Ce choix garantit :
- **Une seule instance** de l'effet par cible (pas d'accumulation)
- **Refresh automatique** à chaque nouvelle application (`REFRESH_ON_SUCCESSFUL_APPLICATION`)
- **Suppression complète** à l'expiration (`CLEAR_ENTIRE_STACK`)

### IFrames d'esquive

Les IFrames sont des GEs à durée courte qui accordent `Combat.State.Iframe`. Pour qu'ils soient
fonctionnels comme invulnérabilité, les GEs de dégâts doivent vérifier l'absence de ce tag :

```
GE_FireballDamageEffect
  └─ application_tag_requirements:
       ignore_tags: [ Combat.State.Iframe ]   ← à configurer si pas encore fait
```

> **Point d'attention :** Les `application_tag_requirements` des GEs de dégâts actuels ne
> configurent pas encore de `ignore_tags` pour le tag Iframe — à vérifier et corriger.

---

*Document généré par agent MCP — HybeliorWorld_5.4 — 2026-04-04*
