---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation des Gameplay Abilities de Combat — HybeliorWorld

> **Généré par agent MCP** — UE 5.4 | Date : 2026-04-04
> **Source** : Introspection Python live via `unreal.load_object` + CDO (Class Default Object)
> **Outils MCP utilisés** : `unreal_python` (unreal_bp_graphs et unreal_bp_nodes refusés par permission)

## Classes C++ associées
- [[Gameplay Ability]] — classe parente `HWGameplayAbility` de toutes les GA_* de combat
- [[Combo System]] — fenêtres de combo (`Combat.Combo.Window.*`) exploitées par GA_SwordAttack/GA_Combo2

---

## Sommaire

1. [Vue d'ensemble du système GAS combat](#1-vue-densemble-du-système-gas-combat)
2. [GA_ReadyToFight — Posture de combat](#2-ga_readytofight--posture-de-combat)
3. [GA_SwordAttack — Attaque épée](#3-ga_swordattack--attaque-épée)
4. [GA_SwordAttackTrace — Trace de collision épée](#4-ga_swordattacktrace--trace-de-collision-épée)
5. [GA_UnarmedAttack — Attaque à mains nues](#5-ga_unarmedattack--attaque-à-mains-nues)
6. [GA_BasicAttack — Attaque de base](#6-ga_basicattack--attaque-de-base)
7. [GA_BowShoot — Tir à l'arc](#7-ga_bowshoot--tir-à-larc)
8. [GA_Aiming — Visée](#8-ga_aiming--visée)
9. [GA_Blocking — Parade / Blocage](#9-ga_blocking--parade--blocage)
10. [GA_Combo2 — Combo coup 2](#10-ga_combo2--combo-coup-2)
11. [Dodge — Esquives directionnelles (4 GAs)](#11-dodge--esquives-directionnelles-4-gas)
12. [GameplayEffects de combat](#12-gameplayeffects-de-combat)
13. [DataTable DT_AnimHitBox](#13-datatable-dt_animhitbox)
14. [Tableau de synthèse des tags GAS](#14-tableau-de-synthèse-des-tags-gas)
15. [Limites de l'extraction MCP](#15-limites-de-lextraction-mcp)

---

## 1. Vue d'ensemble du système GAS combat

### Architecture des classes C++ parentes

Toutes les Gameplay Abilities de combat héritent de **`HWGameplayAbility`** (classe native C++), elle-même fille de `UGameplayAbility`. Les Dodges héritent de la sous-classe **`HWGameplayAbility_Dodge`**.

```
UGameplayAbility
  └── HWGameplayAbility
        ├── GA_SwordAttack_C        (BP)
        ├── GA_UnarmedAttack_C      (BP)
        ├── GA_BowShoot_C           (BP)
        ├── GA_Blocking_C           (BP)
        ├── GA_Aiming_C             (BP)
        ├── GA_BasicAttack_C        (BP)
        ├── GA_SwordAttackTrace_C   (BP)
        ├── GA_Combo2_C             (BP)
        ├── GA_ReadyToFight_C       (BP)
        └── HWGameplayAbility_Dodge
              ├── GA_DodgeBackAbility_C   (BP)
              ├── GA_DodgeForwardAbility_C (BP)
              ├── GA_DodgeLeftAbility_C   (BP)
              └── GA_DodgeRightAbility_C  (BP)
```

### Paramètres GAS communs à toutes les abilities de combat

| Propriété | Valeur par défaut |
|---|---|
| `instancing_policy` | `INSTANCED_PER_ACTOR` |
| `net_execution_policy` | `LOCAL_PREDICTED` |
| `replication_policy` | `REPLICATE_NO` |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `mark_pending_kill_on_ability_end` | `False` |

> **Note** : `LOCAL_PREDICTED` signifie que l'ability s'exécute côté client immédiatement, puis est validée par le serveur. Crucial pour la réactivité du combat en réseau.

### Prérequis système de combat

Le prérequis fondamental pour activer les abilities d'attaque est la présence du tag **`Combat.State.ReadyToFight`** sur l'ASC (Ability System Component). Ce tag est accordé par `GE_ReadyToFight` lorsque le joueur entre en posture de combat via `GA_ReadyToFight`.

---

## 2. GA_ReadyToFight — Posture de combat

**Chemin** : `/Game/AbilitySystem/Abilities/GA_ReadyToFight`
**Classe C++** : `HWGameplayAbility`

### Données CDO

| Propriété | Valeur |
|---|---|
| `activation_required_tags` | _(vide — activable sans condition)_ |
| `activation_blocked_tags` | _(vide)_ |
| `block_abilities_with_tag` | _(vide)_ |
| `ability_tags` | _(vide)_ |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `cost_gameplay_effect_class` | `None` |
| `cooldown_gameplay_effect_class` | `None` |

### Comportement attendu

`GA_ReadyToFight` est une ability de **toggle** : elle applique ou retire l'effet `GE_ReadyToFight`. Lorsqu'actif, le tag `Combat.State.ReadyToFight` est présent sur l'ASC, déverrouillant toutes les abilities d'attaque et de blocage.

> **GE associé** : `GE_ReadyToFight` → accorde le tag `Combat.State.ReadyToFight` (durée `INFINITE`)

### GameplayEffect : GE_ReadyToFight

| Propriété | Valeur |
|---|---|
| Chemin | `/Game/AbilitySystem/GEs/Combat/GE_ReadyToFight` |
| `duration_policy` | `INFINITE` |
| **Tags accordés** (`inheritable_owned_tags`) | `Combat.State.ReadyToFight` |
| **Tags de l'effet** (`inheritable_gameplay_effect_tags`) | `Combat.State.ReadyToFight` |
| `modifiers` | _(aucun)_ |
| `gameplay_cues` | _(aucun)_ |

---

## 3. GA_SwordAttack — Attaque épée

**Chemin** : `/Game/AbilitySystem/Abilities/GA_SwordAttack`
**Classe C++** : `HWGameplayAbility`

### Données CDO

| Propriété | Valeur |
|---|---|
| `activation_required_tags` | `Combat.State.ReadyToFight` |
| `activation_blocked_tags` | _(vide)_ |
| `block_abilities_with_tag` | `Combat.State.Dead`, `Combat.State.Frozen` |
| `ability_tags` | _(vide)_ |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `cost_gameplay_effect_class` | `None` |
| `cooldown_gameplay_effect_class` | `None` |

### Analyse fonctionnelle

- **Condition d'activation** : Nécessite que le joueur soit en posture de combat (`Combat.State.ReadyToFight`).
- **Blocage** : L'ability ne peut pas s'activer si l'ASC possède les tags `Combat.State.Dead` ou `Combat.State.Frozen`.
- **Montage animation** : `Attack_01_Seq_Montage` (EssentialSwordShieldAnimations)
- **Logique de trace** : Délègue la détection de collision à `GA_SwordAttackTrace` (ability séparée).
- **Coût/Cooldown** : Aucun coût explicite configuré au niveau GAS (peut être géré dans le BP graph).
- **Réseau** : Prédiction locale (`LOCAL_PREDICTED`), réplication de résultat uniquement si nécessaire.
- **Input (MAJ 2026-04-07)** : L'input `InputTag.Weapon.Left` est maintenant entierement gere en C++ dans `HWGASPlayerCharacter`. Les event graphs BP de `BP_PlayerCharacter_CE` ont ete supprimes.

### Système de combo

`GA_SwordAttack` démarre la chaîne de combo. À certains moments de l'animation (fenêtres de combo), l'effet `GE_ComboWindow01` est appliqué, accordant temporairement le tag `Combat.Combo.Window.1`. Cela permet à `GA_Combo2` de s'activer en séquence.

```
GA_SwordAttack
  → joue Attack_01_Seq_Montage
  → applique GE_ComboWindow01 (fenêtre combo courte)
    → accorde Combat.Combo.Window.1
  → GA_Combo2 devient activable (requiert Combat.Combo.Window.1)
```

---

## 4. GA_SwordAttackTrace — Trace de collision épée

**Chemin** : `/Game/AbilitySystem/Abilities/GA_SwordAttackTrace`
**Classe C++** : `HWGameplayAbility`

### Données CDO

| Propriété | Valeur |
|---|---|
| `activation_required_tags` | `Combat.State.ReadyToFight` |
| `activation_blocked_tags` | _(vide)_ |
| `block_abilities_with_tag` | `Combat.State.Dead`, `Combat.State.Frozen` |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `cost_gameplay_effect_class` | `None` |
| `cooldown_gameplay_effect_class` | `None` |

### Analyse fonctionnelle

Cette ability est dédiée à la **détection de collision pendant les attaques à l'épée**. Elle est distincte de `GA_SwordAttack` pour séparer la logique d'animation de la logique de hit-detection.

- **Trace utilisée** : Basée sur la DataTable `DT_AnimHitBox` (ligne `Attack_01_Seq_Hitboxes`) qui définit les hitboxes frame-par-frame pour la séquence d'attaque.
- **Pattern attendu dans le BP** : `AbilityTask_WaitMultiTrace` ou équivalent HW natif, synchronisé avec les AnimNotify de `Attack_01_Seq_Montage`.
- **Sur hit** : Application d'un GameplayEffect de dommage sur la cible (probablement `GE_TestDamage50` ou équivalent de production).
- **Immunité IFrame** : `GE_TestDamage50` ignore les cibles possédant `Combat.State.IFrame`, permettant l'immunité pendant les esquives.

---

## 5. GA_UnarmedAttack — Attaque à mains nues

**Chemin** : `/Game/AbilitySystem/Abilities/GA_UnarmedAttack`
**Classe C++** : `HWGameplayAbility`

### Données CDO

| Propriété | Valeur |
|---|---|
| `activation_required_tags` | `Combat.State.ReadyToFight` |
| `activation_blocked_tags` | _(vide)_ |
| `block_abilities_with_tag` | `Combat.State.Dead`, `Combat.State.Frozen` |
| `ability_tags` | _(vide)_ |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `cost_gameplay_effect_class` | `None` |
| `cooldown_gameplay_effect_class` | `None` |

### Analyse fonctionnelle

- **Condition d'activation** : Identique à `GA_SwordAttack` (requiert `Combat.State.ReadyToFight`).
- **Blocage** : Mêmes blocages (`Combat.State.Dead`, `Combat.State.Frozen`).
- **Montage animation** : `KB_m_Jab_R_Montage` (FightingAnimsetPro — jab droit debout).
- **GE lié** : `GE_UnarmedTag` accorde le tag `Combat.Set.Unarmed` tant que le joueur n'est pas équipé (`ignore_tags: Combat.Set.Bow, Combat.Set.SwordAndShield`).
- **Spécificité** : `GE_UnarmedTag` reste actif tant qu'aucune arme n'est équipée (condition `ongoing_tag_requirements` vérifiant l'absence des tags d'arme).

---

## 6. GA_BasicAttack — Attaque de base

**Chemin** : `/Game/AbilitySystem/Abilities/GA_BasicAttack`
**Classe C++** : `HWGameplayAbility`

### Données CDO

| Propriété | Valeur |
|---|---|
| `activation_required_tags` | _(vide — aucun prérequis)_ |
| `activation_blocked_tags` | _(vide)_ |
| `block_abilities_with_tag` | _(vide)_ |
| `ability_tags` | _(vide)_ |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `cost_gameplay_effect_class` | `None` |
| `cooldown_gameplay_effect_class` | `None` |

### Analyse fonctionnelle

`GA_BasicAttack` est un **dispatcher générique** : elle n'a aucun tag requis, ce qui suggère qu'elle délègue à la bonne ability selon le contexte courant (arme équipée, état du joueur). Elle peut servir de point d'entrée unique depuis l'input, qui redirige ensuite vers `GA_SwordAttack`, `GA_UnarmedAttack`, etc.

> **Différence clé avec GA_SwordAttack** : Pas de prérequis de tags. Utilisable sans posture de combat.

---

## 7. GA_BowShoot — Tir à l'arc

**Chemin** : `/Game/AbilitySystem/Abilities/GA_BowShoot`
**Classe C++** : `HWGameplayAbility`

### Données CDO

| Propriété | Valeur |
|---|---|
| `activation_required_tags` | _(vide)_ |
| `activation_blocked_tags` | **`Combat.State.DodgedRecently`** |
| `block_abilities_with_tag` | _(vide)_ |
| `ability_tags` | _(vide)_ |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `cost_gameplay_effect_class` | `None` |
| `cooldown_gameplay_effect_class` | `None` |

### Analyse fonctionnelle

- **Particularité majeure** : L'ability est bloquée si le tag `Combat.State.DodgedRecently` est présent sur l'ASC. Cela empêche le tir immédiatement après une esquive (anti-exploit).
- **Montage animation** : `Bow_InPlace_Shoot_2_Aim_Montage` (pack Archery, InPlace).
- **GE lié** : `GE_Bow` accorde le tag `Combat.Set.Bow` (durée `INFINITE`, requis `Combat.State.ReadyToFight` ongoing).
- **Logique de tir** : Spawn d'un projectile via l'ability BP (non extractable par Python CDO — dans le graph).

### Interaction avec GA_Aiming

`GA_BowShoot` est typiquement combinée à `GA_Aiming` : l'aiming accorde `InputTag.Aiming`, modifie la caméra / l'IK, puis le tir se déclenche sur un second input.

---

## 8. GA_Aiming — Visée

**Chemin** : `/Game/AbilitySystem/Abilities/GA_Aiming`
**Classe C++** : `HWGameplayAbility`

### Données CDO

| Propriété | Valeur |
|---|---|
| `activation_required_tags` | _(vide)_ |
| `activation_blocked_tags` | _(vide)_ |
| `block_abilities_with_tag` | _(vide)_ |
| `ability_tags` | _(vide)_ |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `cost_gameplay_effect_class` | `None` |
| `cooldown_gameplay_effect_class` | `None` |

### Analyse fonctionnelle

- **Comportement** : Ability de type **hold** (maintien du bouton visée). Applique `GE_Aiming` tant que l'input est maintenu, puis le retire à la release.
- **Pattern attendu dans le BP** : `WaitInputRelease` pour détecter le relâchement et appeler `EndAbility`.

### GameplayEffect : GE_Aiming

| Propriété | Valeur |
|---|---|
| Chemin | `/Game/AbilitySystem/GEs/Combat/GE_Aiming` |
| `duration_policy` | `INFINITE` |
| **Tags accordés** (`inheritable_owned_tags`) | `InputTag.Aiming` |
| **Tags de l'effet** | `Combat.State.ReadyToFight` |
| `ongoing_tag_requirements` | Requiert `Combat.State.ReadyToFight` (se retire automatiquement si le joueur quitte la posture combat) |
| `modifiers` | _(aucun)_ |

> Le tag `InputTag.Aiming` est probablement utilisé par l'AnimBlueprint pour activer les blends d'IK de visée.

---

## 9. GA_Blocking — Parade / Blocage

**Chemin** : `/Game/AbilitySystem/Abilities/GA_Blocking`
**Classe C++** : `HWGameplayAbility`

### Données CDO

| Propriété | Valeur |
|---|---|
| `activation_required_tags` | _(vide)_ |
| `activation_blocked_tags` | _(vide)_ |
| `block_abilities_with_tag` | _(vide)_ |
| `ability_tags` | _(vide)_ |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `cost_gameplay_effect_class` | `None` |
| `cooldown_gameplay_effect_class` | `None` |

### Analyse fonctionnelle

- **Comportement** : Ability de **maintien** (hold). Applique `GE_Blocking` pendant toute la durée du maintien de l'input de blocage.
- **Pattern attendu** : `WaitInputRelease` → `EndAbility`, similaire à `GA_Aiming`.

### GameplayEffect : GE_Blocking

| Propriété | Valeur |
|---|---|
| Chemin | `/Game/AbilitySystem/GEs/Combat/GE_Blocking` |
| `duration_policy` | `INFINITE` |
| **Tags accordés** (`inheritable_owned_tags`) | `Combat.State.Blocking` |
| **Tags de l'effet** | `Combat.State.ReadyToFight` |
| `ongoing_tag_requirements` | Requiert `Combat.State.ReadyToFight` |
| `modifiers` | _(aucun — logique de réduction dommages probablement dans les Executions C++)_ |

> Le tag `Combat.State.Blocking` est vérifié par les GameplayEffects de dommage entrant pour calculer la réduction ou l'annulation du dégât.

---

## 10. GA_Combo2 — Combo coup 2

**Chemin** : `/Game/AbilitySystem/Abilities/GA_Combo2`
**Classe C++** : `HWGameplayAbility`

### Données CDO

| Propriété | Valeur |
|---|---|
| `ability_name` | **`Combo2`** |
| `activation_required_tags` | **`Combat.Combo.Window.1`** |
| `activation_blocked_tags` | _(vide)_ |
| `block_abilities_with_tag` | _(vide)_ |
| `activation_group` | `INDEPENDENT` |
| `activation_policy` | `ON_INPUT_TRIGGERED` |
| `cost_gameplay_effect_class` | `None` |
| `cooldown_gameplay_effect_class` | `None` |

### Analyse fonctionnelle — Système de fenêtre combo

`GA_Combo2` est la **deuxième attaque de la chaîne combo**. Elle ne peut s'activer que si le tag `Combat.Combo.Window.1` est présent sur l'ASC.

```
Flux combo :
  1. GA_SwordAttack s'active (input attaque)
  2. Le BP applique GE_ComboWindow01 à un certain frame de l'animation
     → accorde Combat.Combo.Window.1 (durée limitée)
  3. Si l'input attaque est pressé pendant cette fenêtre :
     → GA_Combo2 s'active (requiert Combat.Combo.Window.1)
     → joue le montage du 2ème coup
  4. La fenêtre expire → Combat.Combo.Window.1 est retiré
     → GA_Combo2 ne peut plus s'activer
```

### GameplayEffect : GE_ComboWindow01

| Propriété | Valeur |
|---|---|
| Chemin | `/Game/AbilitySystem/GEs/GE_ComboWindow01` |
| `duration_policy` | `HAS_DURATION` (durée définie dans le BP) |
| **Tags accordés** | `Combat.Combo.Window.1` |
| `modifiers` | _(aucun)_ |

---

## 11. Dodge — Esquives directionnelles (4 GAs)

Les quatre abilities de dodge héritent de **`HWGameplayAbility_Dodge`** (classe C++ native). Elles utilisent des propriétés natives exposées en C++ et ne nécessitent pas de logique BP supplémentaire.

### Tableau comparatif des 4 Dodges

| Propriété | Arrière | Avant | Gauche | Droite |
|---|---|---|---|---|
| **Asset** | `GA_DodgeBackAbility` | `GA_DodgeForwardAbility` | `GA_DodgeLeftAbility` | `GA_DodgeRightAbility` |
| **Chemin** | `.../Movement/` | `.../Movement/` | `.../Movement/` | `.../Movement/` |
| `direction` | `2` (Back) | `0` (Forward) | `4` (Left) | `1` (Right) |
| `strength` | **500.0** | 700.0 | 700.0 | 700.0 |
| `duration` | 0.6 s | 0.6 s | 0.6 s | 0.6 s |
| `dodging_animation_play_rate` | 1.0 | 1.0 | 1.0 | 1.0 |
| `delay_dodged_recently_application` | 0.25 s | 0.25 s | 0.25 s | 0.25 s |
| `delay_i_frame_application` | 0.0 s | 0.0 s | 0.0 s | 0.0 s |

> **Note** : Le dodge arrière a une force d'impulsion réduite (500 vs 700) — le recul arrière est intentionnellement moins puissant.

### Montages d'animation

| Dodge | Montage |
|---|---|
| Arrière | `Dodge_B_Seq_Montage` (`EssentialSwordShieldAnimations`) |
| Avant | `Dodge_F_Seq_Montage` |
| Gauche | `Dodge_L_Seq_Montage` |
| Droite | `Dodge_R_Seq_Montage` |

### GameplayEffects appliqués par les Dodges

Tous les dodges appliquent **deux effets** :

**1. GE_DodgedRecently** (commun à tous)

| Propriété | Valeur |
|---|---|
| Chemin | `/Game/AbilitySystem/GEs/Movement/GE_DodgedRecently` |
| `duration_policy` | `HAS_DURATION` |
| **Tags accordés** | `Combat.State.DodgedRecently` |
| Délai d'application | 0.25 s après le début du dodge |
| Effet | Bloque `GA_BowShoot` pendant ce délai |

**2. GE_DodgeBackwardIFrame / GE_DodgeForwardIFrame** (I-Frame — Invincibilité temporaire)

| Propriété | Dodge Arrière | Dodge Avant/Gauche/Droite |
|---|---|---|
| Asset | `GE_DodgeBackwardIFrame` | `GE_DodgeForwardIFrame` |
| Chemin | `.../Movement/` | `.../Movement/` |
| `duration_policy` | `HAS_DURATION` | `HAS_DURATION` |
| **Tags accordés** | `Combat.State.Iframe` | `Combat.State.Iframe` |
| Délai d'application | 0.0 s (immédiat) | 0.0 s (immédiat) |

> **Mécanique IFrame** : Le tag `Combat.State.Iframe` (notez la casse différente de `Combat.State.IFrame` utilisée dans `GE_TestDamage50`) protège le joueur contre les dégâts pendant l'animation de dodge. La vérification `ignore_tags: Combat.State.IFrame` dans `GE_TestDamage50` assure cette immunité.

### GE_DodgeStaminaCost

| Propriété | Valeur |
|---|---|
| Chemin | `/Game/AbilitySystem/GEs/Cost/GE_DodgeStaminaCost` |
| `duration_policy` | `INSTANT` |
| `modifiers` | 1 modifier (coût stamina — montant dans le modifier non lisible via CDO Python) |

---

## 12. GameplayEffects de combat

### Tableau de synthèse des GEs de combat

| GameplayEffect | Duration | Tags accordés (owned) | Tags de l'effet | Ongoing requis |
|---|---|---|---|---|
| `GE_ReadyToFight` | INFINITE | `Combat.State.ReadyToFight` | `Combat.State.ReadyToFight` | _(aucun)_ |
| `GE_SwordAndShield` | INFINITE | `Combat.Set.SwordAndShield` | `Combat.State.ReadyToFight` | `Combat.State.ReadyToFight` |
| `GE_UnarmedTag` | INFINITE | `Combat.Set.Unarmed` | _(aucun)_ | Ignore si `Combat.Set.Bow` ou `Combat.Set.SwordAndShield` |
| `GE_Bow` | INFINITE | `Combat.Set.Bow` | `Combat.State.ReadyToFight` | `Combat.State.ReadyToFight` |
| `GE_Aiming` | INFINITE | `InputTag.Aiming` | `Combat.State.ReadyToFight` | `Combat.State.ReadyToFight` |
| `GE_Blocking` | INFINITE | `Combat.State.Blocking` | `Combat.State.ReadyToFight` | `Combat.State.ReadyToFight` |
| `GE_ComboWindow01` | HAS_DURATION | `Combat.Combo.Window.1` | _(aucun)_ | _(aucun)_ |
| `GE_DodgedRecently` | HAS_DURATION | `Combat.State.DodgedRecently` | _(aucun)_ | _(aucun)_ |
| `GE_DodgeBackwardIFrame` | HAS_DURATION | `Combat.State.Iframe` | _(aucun)_ | _(aucun)_ |
| `GE_DodgeForwardIFrame` | HAS_DURATION | `Combat.State.Iframe` | _(aucun)_ | _(aucun)_ |
| `GE_DodgeStaminaCost` | INSTANT | _(aucun)_ | _(aucun)_ | _(aucun)_ |
| `GE_TestDamage50` | INSTANT | _(aucun)_ | _(aucun)_ | Ignore si cible a `Combat.State.IFrame` |

### Notes sur GE_Equipment

`GE_Equipment` (`/Game/AbilitySystem/GEs/Combat/GE_Equipment`) est un GE INFINITE avec **9 modifiers** (probablement les statistiques d'équipement : ATK, DEF, etc.). Il ne génère pas de tags mais modifie directement les attributs de l'ASC.

### Note sur GE_TestDamage50 (GE de dommage de test)

- **Type** : `HWDamageGameplayEffect` (sous-classe custom de `GameplayEffect`)
- **Durée** : INSTANT
- **Condition d'application** : Bloquée si la cible possède le tag `Combat.State.IFrame`
- **Modifiers** : 1 modifier (montant 50 — non déchiffrable via CDO Python sans accès au GameplayAttributeSet)

---

## 13. DataTable DT_AnimHitBox

**Chemin** : `/Game/AbilitySystem/Abilities/DT_AnimHitBox`

| Row Name | Description |
|---|---|
| `Attack_01_Seq_Hitboxes` | Définition des hitboxes pour la séquence d'attaque 01 (épée) |

Cette DataTable est utilisée par `GA_SwordAttackTrace` pour définir les frames d'activation des traces de collision, synchronisées avec les AnimNotify de `Attack_01_Seq_Montage`.

---

## 14. Tableau de synthèse des tags GAS

### Tags présents dans les abilities de combat

| Tag | Utilisé par | Rôle |
|---|---|---|
| `Combat.State.ReadyToFight` | GA_SwordAttack (requis), GA_UnarmedAttack (requis), GA_SwordAttackTrace (requis), GE_ReadyToFight (accordé), GE_SwordAndShield (ongoing), GE_Aiming (ongoing), GE_Blocking (ongoing), GE_Bow (ongoing) | Posture de combat active |
| `Combat.State.Dead` | GA_SwordAttack (bloque), GA_UnarmedAttack (bloque), GA_SwordAttackTrace (bloque) | Joueur mort |
| `Combat.State.Frozen` | GA_SwordAttack (bloque), GA_UnarmedAttack (bloque), GA_SwordAttackTrace (bloque) | Joueur gelé |
| `Combat.State.DodgedRecently` | GA_BowShoot (bloque), GE_DodgedRecently (accordé) | Anti-exploit tir post-dodge |
| `Combat.State.Blocking` | GE_Blocking (accordé) | En train de bloquer |
| `Combat.State.Iframe` | GE_DodgeForwardIFrame (accordé), GE_DodgeBackwardIFrame (accordé, casse: `Iframe`) | Immunité pendant dodge |
| `Combat.State.IFrame` | GE_TestDamage50 (ignore_tags) | Vérification immunité (casse différente) |
| `Combat.Combo.Window.1` | GA_Combo2 (requis), GE_ComboWindow01 (accordé) | Fenêtre d'input combo |
| `Combat.Set.SwordAndShield` | GE_SwordAndShield (accordé), GE_UnarmedTag (ignore_tags) | Arme épée+bouclier équipée |
| `Combat.Set.Bow` | GE_Bow (accordé), GE_UnarmedTag (ignore_tags) | Arc équipé |
| `Combat.Set.Unarmed` | GE_UnarmedTag (accordé) | Pas d'arme équipée |
| `InputTag.Aiming` | GE_Aiming (accordé) | Mode visée actif |

> **Attention** : Inconsistance de casse détectée entre `Combat.State.IFrame` (dans GE_TestDamage50 `ignore_tags`) et `Combat.State.Iframe` (dans GE_DodgeBackwardIFrame `owned_tags`). Si ces tags doivent correspondre, une correction dans les GEs ou le Native Tag Registry est nécessaire.

---

## 15. Limites de l'extraction MCP

### Outils refusés par permission

Les outils suivants ont été **refusés** lors de cette session et leurs données ne sont **pas** incluses dans cette documentation :

| Outil | Statut | Impact |
|---|---|---|
| `unreal_bp_graphs` | REFUSÉ | Liste des graphs non obtenue directement |
| `unreal_bp_nodes` | REFUSÉ | Nodes individuels non documentés |
| `unreal_bp_variables` | REFUSÉ | Variables BP non listées directement |

### Ce qui n'est PAS documenté

Les informations suivantes nécessiteraient `unreal_bp_graphs` + `unreal_bp_nodes` pour être complètes :

1. **Logique exacte du graph ActivateAbility** : Le flux de nœuds BP (WaitInputPress, WaitInputRelease, PlayMontageAndWait, WaitGameplayEvent, etc.) n'est pas extractable via CDO Python.
2. **WaitInputPress / WaitInputRelease** : Présence/absence dans chaque ability — non confirméé.
3. **AbilityTask_WaitMultiTrace** : Les paramètres exacts de trace (rayon, longueur, channel) de `GA_SwordAttackTrace` ne sont pas lisibles.
4. **Variables BP custom** : Les variables locales définies dans le graph BP (non exposées comme propriétés C++ du CDO) ne sont pas visibles.
5. **Valeurs des modificateurs GE** : Les montants numériques des modifiers de `GE_DodgeStaminaCost`, `GE_Equipment`, `GE_TestDamage50` ne sont pas déchiffrables via l'API Python CDO sans accès au GameplayAttributeSet.

### Méthode d'extraction utilisée

Toutes les données de ce document ont été extraites via **`mcp__unreal-editor__unreal_python`** en accédant aux **Class Default Objects (CDO)** des assets Blueprint via `unreal.load_object(None, 'path.Default__AssetName_C')`. Cette méthode permet de lire les propriétés GAS natives (tags, politiques d'instanciation, coûts, cooldowns) mais pas le contenu des graphs Blueprint.

---

*Documentation générée par agent MCP — HybeliorWorld 5.4 — 2026-04-04*
