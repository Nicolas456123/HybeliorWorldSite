---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Documentation : Gameplay Abilities de Locomotion

**Projet :** HybeliorWorld 5.4
**Généré via :** MCP Unreal Editor (unreal_python + analyse binaire uasset + sources C++)
**Date :** 2026-04-04
**Auteur :** Agent Claude Code (documentation automatisée)

## Classes C++ associées
- [[Gameplay Ability]] — classes parentes `UHWGameplayAbility`, `UHWGameplayAbility_MovementMode` et `UHWGameplayAbility_Dodge`

---

## Sommaire

1. [Architecture globale](#architecture-globale)
2. [Tableau récapitulatif](#tableau-récapitulatif)
3. [Abilities de déplacement de base (MovementMode)](#abilities-de-déplacement-de-base)
4. [Abilities d'esquive (Dodge)](#abilities-desquive)
5. [Abilities de caméra et contrôle](#abilities-de-caméra-et-contrôle)
6. [Référence des tags natifs de locomotion](#référence-des-tags-natifs)

---

## Architecture globale

### Hiérarchie des classes C++

```
UGameplayAbility (GAS UE5)
  └── UHWGameplayAbility               (/Script/HybeliorWorld)
        ├── UHWGameplayAbility_MovementMode    ← 12 abilities de base
        ├── UHWGameplayAbility_Dodge           ← 4 abilities d'esquive
        └── UHWGameplayAbility (direct)        ← DoubleJump, FollowDir, Camera…
```

### Classe parente : `UHWGameplayAbility_MovementMode`

Classe abstraite C++ (`HWGameplayAbility_MovementMode.h/.cpp`) qui gère **trois modes de fonctionnement** configurables via propriétés :

| Mode | Condition | Comportement |
|------|-----------|--------------|
| **Start** | `bIsStopAbility=false`, `bIsToggleAbility=false` | CommitAbility → ApplyGE(EffectToApply) → SetMovementOverrides → EndAbility |
| **Stop**  | `bIsStopAbility=true` | CommitAbility → RemoveEffects(EffectTagsToRemove) → SetMovementOverrides → EndAbility |
| **Toggle** | `bIsToggleAbility=true` | Vérifie ToggleCheckTag sur ASC : si présent → branch Off, si absent → branch On → EndAbility |

Toutes les abilities de locomotion de base :
- **Instancing :** `INSTANCED_PER_ACTOR`
- **Net Execution :** `LOCAL_PREDICTED`
- **Activation Policy :** `ON_INPUT_TRIGGERED`
- **Coût / Cooldown GE :** `None` (aucun coût Stamina/Mana, aucun cooldown GE dédié)
- **Groupe d'activation :** `INDEPENDENT`

---

## Tableau récapitulatif

| Ability | Catégorie | InputTag associé | GE appliqué | Tags bloqués (activation) | Montage | Classe parente C++ |
|---------|-----------|-----------------|-------------|--------------------------|---------|-------------------|
| `GA_SprintStart` | Sprint | `InputTag.Sprint` | `GE_Sprinting` | `Combat.State.Blocking` | — | MovementMode |
| `GA_SprintStop` | Sprint | `InputTag.Sprint` (released) | — (remove) | `Combat.State.Blocking` | — | MovementMode |
| `GA_WalkRun` | Marche/Course | `InputTag.WalkRun` | `GE_Walking` / `GE_Running` | `MovementState.Sprinting` | — | MovementMode |
| `GA_Crouch` | Accroupissement | `InputTag.Crouch` | `GE_Crouching` | `MovementState.Crouching` | — | MovementMode |
| `GA_FlyingStart` | Vol | `InputTag.Flying` | `GE_Flying` | — | — | MovementMode |
| `GA_FlyingStop` | Vol | `InputTag.Flying` (released) | — (remove) | `MovementState.Flying` | — | MovementMode |
| `GA_SwimmingStart` | Nage | *(auto/trigger)* | `GE_Swimming` | `MovementState.Swimming` | — | MovementMode |
| `GA_SwimmingStop` | Nage | *(auto/trigger)* | — (remove) | — | — | MovementMode |
| `GA_DrivingStart` | Conduite | *(auto/trigger)* | `GE_Driving` | `MovementState.Driving` | — | MovementMode |
| `GA_DrivingStop` | Conduite | *(auto/trigger)* | — (remove) | — | — | MovementMode |
| `GA_OnBoatStart` | Bateau | *(auto/trigger)* | `GE_OnBoat` | `MovementState.OnBoat` | — | MovementMode |
| `GA_OnBoatStop` | Bateau | *(auto/trigger)* | — (remove) | — | — | MovementMode |
| `GA_DoubleJump` | Saut | `InputTag.Jump` | — | — | RootMotionForce | HWGameplayAbility |
| `GA_DodgeBack` | Esquive | `InputTag.Dash` | `GE_DodgedRecently` + `GE_DodgeBackwardIFrame` | — | `Dodge_B_Seq_Montage` | Dodge (C++) |
| `GA_DodgeForward` | Esquive | `InputTag.Dash` | `GE_DodgedRecently` + `GE_DodgeForwardIFrame` | — | `Dodge_F_Seq_Montage` | Dodge (C++) |
| `GA_DodgeLeft` | Esquive | `InputTag.Dash` | `GE_DodgedRecently` + `GE_DodgeForwardIFrame` | — | `Dodge_L_Seq_Montage` | Dodge (C++) |
| `GA_DodgeRight` | Esquive | `InputTag.Dash` | `GE_DodgedRecently` + `GE_DodgeForwardIFrame` | — | `Dodge_R_Seq_Montage` | Dodge (C++) |
| `GA_FollowDirectionInput` | Direction | `InputTag.Move` | — | — | — | HWGameplayAbility |
| `GA_FollowMouseDirection` | Direction | `InputTag.Look.Mouse` | — | — | — | HWGameplayAbility |
| `GA_FirstCameraOn` | Caméra | `InputTag.ChangeCamera` | `GE_FirstCamera` | — | — | MovementMode |
| `GA_FirstCameraOff` | Caméra | `InputTag.ChangeCamera` | — (remove) | `InputTag.FirstCamera` | — | MovementMode |

---

## Abilities de déplacement de base

### GA_SprintStart

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_SprintStart`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Start**)

**InputTag :** `InputTag.Sprint`

**GE appliqué :** `/Game/AbilitySystem/GEs/Movement/GE_Sprinting`

**Tags bloqués (ActivationBlockedTags) :**
- `Combat.State.Blocking` — impossible de sprinter en garde/blocage

**Overrides CMC (CDO) :** Aucun override direct (`-1.0` sur tous). Les valeurs de vitesse (`MaxWalkSpeed`, `MaxFlySpeed`, `MaxAcceleration`, `BrakingDecelerationFlying`) sont gérées **via le GE_Sprinting** (modifier d'attribut GAS).

**Logique principale (graph) :**
1. `K2_ActivateAbility` → CommitAbility
2. Vérifie `HasMatchingGameplayTag(MovementState.Flying)` — si volant : `MaxFlySpeed` est hardcode a **1200** (ne lit plus la variable BP "Sprint Fly Speed"). Le UPROPERTY `SprintFlySpeed` a ete ajoute a `HWGASPlayerCharacter` en C++.
3. Applique `GE_Sprinting` via `BP_ApplyGameplayEffectToOwner`
4. `K2_OnEndAbility` → `K2_EndAbility`

> **MAJ 2026-04-07 :** L'input sprint est maintenant gere en C++ (`HWGASPlayerCharacter`). Les event graphs BP de `BP_PlayerCharacter_CE` ont ete supprimes.

---

### GA_SprintStop

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_SprintStop`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Stop**)

**InputTag :** `InputTag.Sprint` (relâché)

**Tags bloqués (ActivationBlockedTags) :**
- `Combat.State.Blocking`

**Behavior (Stop mode) :** Retire le GE `GE_Sprinting` via `EffectTagsToRemove` (`MovementState.Sprinting`). Retourne à l'état `MovementState.Walking`.

**Logique :** Supprime les effets avec tag granted `MovementState.Sprinting` → restore la vitesse de marche normale → `EndAbility`.

---

### GA_WalkRun

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_WalkRun`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Toggle**)

**InputTag :** `InputTag.WalkRun`

**GE appliqués :**
- `/Game/AbilitySystem/GEs/Movement/GE_Walking`
- `/Game/AbilitySystem/GEs/Movement/GE_Running`

**Tags bloqués (ActivationBlockedTags) :**
- `MovementState.Sprinting` — désactivé pendant le sprint

**Behavior (Toggle mode) :** Bascule entre `GE_Walking` (tag `MovementState.Walking`) et `GE_Running` (tag `MovementState.Running`). Modifie `CMC.MaxWalkSpeed` selon l'état.

**Note :** Vérifie `ToggleCheckTag` sur l'ASC. Si `MovementState.Walking` présent → passe en Running ; sinon → passe en Walking.

---

### GA_Crouch

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_Crouch`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Start/Toggle**)

**InputTag :** `InputTag.Crouch`

**GE appliqué :** `/Game/AbilitySystem/GEs/Movement/GE_Crouching`

**Tags bloqués (ActivationBlockedTags) :**
- `MovementState.Crouching` — empêche double-activation

**Behavior :** Applique `GE_Crouching` (tag `MovementState.Crouching`), réduit `CMC.MaxWalkSpeed` à la valeur de marche accroupie définie dans le GE. Le graph BP gère l'appel natif `Crouch()` du CMC.

---

### GA_FlyingStart

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_FlyingStart`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Start**)

**InputTag :** `InputTag.Flying`

**GE appliqué :** `/Game/AbilitySystem/GEs/Movement/GE_Flying`

**Tags bloqués :** Aucun dans le CDO (le GE lui-même peut en avoir).

**Behavior :** Applique `GE_Flying` (tag `MovementState.Flying`). Typiquement, le GE change le mode CMC en `MOVE_Flying` et configure `MaxFlySpeed`.

---

### GA_FlyingStop

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_FlyingStop`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Stop**)

**InputTag :** `InputTag.Flying` (relâché)

**Tags bloqués (ActivationBlockedTags) :**
- `MovementState.Flying` — ne peut stopper que si l'état `Flying` est actif

> Note : la logique est inversée pour un Stop : `MovementState.Flying` en `ActivationBlockedTags` semble intentionnel pour n'activer ce Stop que dans certaines conditions. Vérifier la configuration du graph BP.

**Behavior :** Retire les effets avec tag granted `MovementState.Flying`. Restore le mode CMC `MOVE_Walking`.

---

### GA_SwimmingStart

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_SwimmingStart`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Start**)

**InputTag :** *(déclenché automatiquement via overlap de volume d'eau)*

**GE appliqué :** `/Game/AbilitySystem/GEs/Movement/GE_Swimming`

**Tags bloqués (ActivationBlockedTags) :**
- `MovementState.Swimming` — empêche double-activation

**Behavior :** Applique `GE_Swimming` (tag `MovementState.Swimming`). Change le CMC en `MOVE_Swimming`.

---

### GA_SwimmingStop

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_SwimmingStop`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Stop**)

**InputTag :** *(déclenché automatiquement à la sortie du volume d'eau)*

**Tags bloqués :** Aucun.

**Behavior :** Retire les effets avec tag `MovementState.Swimming`. Restore le mode Walking.

---

### GA_DrivingStart

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_DrivingStart`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Start**)

**InputTag :** *(déclenché par interaction avec un véhicule)*

**GE appliqué :** `/Game/AbilitySystem/GEs/Movement/GE_Driving`

**Tags bloqués (ActivationBlockedTags) :**
- `MovementState.Driving` — empêche double-activation

**Behavior :** Applique `GE_Driving` (tag `MovementState.Driving`). Configure les paramètres CMC pour la conduite.

---

### GA_DrivingStop

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_DrivingStop`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Stop**)

**InputTag :** *(déclenché à la sortie du véhicule)*

**Tags bloqués :** Aucun.

**Behavior :** Retire les effets avec tag `MovementState.Driving`. Restore le mode Walking.

---

### GA_OnBoatStart

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_OnBoatStart`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Start**)

**InputTag :** *(déclenché par embarquement sur une embarcation)*

**GE appliqué :** `/Game/AbilitySystem/GEs/Movement/GE_OnBoat`

**Tags bloqués (ActivationBlockedTags) :**
- `MovementState.OnBoat` — empêche double-activation

**Behavior :** Applique `GE_OnBoat` (tag `MovementState.OnBoat`). Configure les paramètres de mouvement sur l'eau.

---

### GA_OnBoatStop

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/Base/GA_OneBoatStop`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Stop**)

**InputTag :** *(déclenché au débarquement)*

**Tags bloqués :** Aucun.

**Behavior :** Retire les effets avec tag `MovementState.OnBoat`. Restore le mode Walking.

---

## Abilities d'esquive

### Architecture commune (UHWGameplayAbility_Dodge)

Classe C++ `HWGameplayAbility_Dodge.h/.cpp` — hérite directement de `UHWGameplayAbility`.

**Flux d'activation :**
1. `CommitAbility` → échec → `EndAbility`
2. Récupère le `CharacterMovementComponent`, sauvegarde `GroundFriction`, le met à `0`
3. Calcule `WorldDirection` selon `Direction` (0=avant, 1=droite, 2=arrière, 3=gauche)
4. Lance `AbilityTask_ApplyRootMotionConstantForce` (DashTask, `ClampVelocity` à 250 cm/s)
5. Lance `AbilityTask_PlayMontageAndWait` (animation de l'esquive)
6. Si `DodgedRecentlyGameplayEffect` défini : lance `AbilityTask_WaitDelay(DelayDodgedRecentlyApplication)` → applique le GE
7. Si `IFrameGameplayEffect` défini : lance `AbilityTask_WaitDelay(DelayIFrameApplication)` → applique le GE d'invulnérabilité
8. `OnFinished` : restore `GroundFriction` → `EndAbility`

---

### GA_DodgeBack (Esquive arrière)

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/GA_DodgeBackAbility`
**Classe C++ :** `UHWGameplayAbility_Dodge`

**InputTag :** `InputTag.Dash`

**Paramètres configurés (CDO) :**

| Propriété | Valeur |
|-----------|--------|
| `Direction` | `2` (arrière — Backward) |
| `Strength` | `500.0` cm/s |
| `Duration` | `0.6s` |
| `DodgingAnimationPlayRate` | `1.0` |
| `DelayDodgedRecentlyApplication` | `0.25s` |
| `DelayIFrameApplication` | `0.0s` (immédiat) |

**GEs appliqués :**
- `GE_DodgedRecently` — tag temporaire pour les combos, appliqué après 0.25s
- `GE_DodgeBackwardIFrame` — invulnérabilité (I-Frame) spécifique au dodge arrière, appliquée immédiatement

**Montage :** `/Game/Assets/Characters/Mannequin_UE4/Animations/EssentialSwordShieldAnimations/Dodge_B_Seq_Montage`

---

### GA_DodgeForward (Esquive avant)

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/GA_DodgeForwardAbility`
**Classe C++ :** `UHWGameplayAbility_Dodge`

**InputTag :** `InputTag.Dash`

**Paramètres configurés (CDO) :**

| Propriété | Valeur |
|-----------|--------|
| `Direction` | `0` (avant — Forward) |
| `Strength` | `700.0` cm/s |
| `Duration` | `0.6s` |
| `DodgingAnimationPlayRate` | `1.0` |
| `DelayDodgedRecentlyApplication` | `0.25s` |
| `DelayIFrameApplication` | `0.0s` |

**GEs appliqués :**
- `GE_DodgedRecently` — tag temporaire combo
- `GE_DodgeForwardIFrame` — invulnérabilité I-Frame (partagée avec Gauche et Droite)

**Montage :** `/Game/Assets/Characters/Mannequin_UE4/Animations/EssentialSwordShieldAnimations/Dodge_F_Seq_Montage`

---

### GA_DodgeLeft (Esquive gauche)

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/GA_DodgeLeftAbility`
**Classe C++ :** `UHWGameplayAbility_Dodge`

**InputTag :** `InputTag.Dash`

**Paramètres configurés (CDO) :**

| Propriété | Valeur |
|-----------|--------|
| `Direction` | `4` *(valeur custom — Left, RotateAngleAxis 180° sur ActorRightVector)* |
| `Strength` | `700.0` cm/s |
| `Duration` | `0.6s` |
| `DelayDodgedRecentlyApplication` | `0.25s` |

> **Note :** `Direction=4` n'est pas dans la spec originale (0-3). Vérifier si c'est une extension ou un alias.

**GEs :** `GE_DodgedRecently` + `GE_DodgeForwardIFrame`

**Montage :** `Dodge_L_Seq_Montage`

---

### GA_DodgeRight (Esquive droite)

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/GA_DodgeRightAbility`
**Classe C++ :** `UHWGameplayAbility_Dodge`

**InputTag :** `InputTag.Dash`

**Paramètres configurés (CDO) :**

| Propriété | Valeur |
|-----------|--------|
| `Direction` | `1` (droite — Right) |
| `Strength` | `700.0` cm/s |
| `Duration` | `0.6s` |
| `DelayDodgedRecentlyApplication` | `0.25s` |

**GEs :** `GE_DodgedRecently` + `GE_DodgeForwardIFrame`

**Montage :** `Dodge_R_Seq_Montage`

---

### Comparatif des esquives

| Ability | Direction | Strength | IFrame GE | Montage |
|---------|-----------|----------|-----------|---------|
| DodgeBack | Arrière (2) | 500 cm/s | `GE_DodgeBackwardIFrame` | Dodge_B |
| DodgeForward | Avant (0) | 700 cm/s | `GE_DodgeForwardIFrame` | Dodge_F |
| DodgeLeft | Gauche (4) | 700 cm/s | `GE_DodgeForwardIFrame` | Dodge_L |
| DodgeRight | Droite (1) | 700 cm/s | `GE_DodgeForwardIFrame` | Dodge_R |

> Le dodge arrière est moins puissant (500 vs 700) et utilise un GE d'IFrame distinct (`GE_DodgeBackwardIFrame`).

---

## Abilities de caméra et contrôle

### GA_DoubleJump

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/GA_DoubleJumpAbility`
**Classe C++ :** `UHWGameplayAbility` (direct, non-MovementMode)

**InputTag :** `InputTag.Jump` (second appui en air)

**GE appliqué :** Aucun GE de coût/cooldown (CDO vide)

**Logique principale :**
- Utilise `AbilityTask_ApplyRootMotionConstantForce` (`ApplyRootMotionJumpForceDelegate`)
- Pas de GE d'état, purement physique via RootMotion

**Tags bloqués :** Aucun dans le CDO.

---

### GA_FollowDirectionInput

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/GA_FollowDirectionInput`
**Classe C++ :** `UHWGameplayAbility_MovementMode`

**InputTag :** `InputTag.Move`

**Rôle :** Ability utilitaire qui oriente le personnage selon la direction d'entrée (axe de mouvement). Utilisée dans certains modes de contrôle alternatifs (caméra fixe, etc.).

**GE :** Aucun. **Tags bloqués :** Aucun.

---

### GA_FollowMouseDirection

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/GA_FollowMouseDirection`
**Classe C++ :** `UHWGameplayAbility_MovementMode`

**InputTag :** `InputTag.Look.Mouse`

**Rôle :** Oriente le personnage selon la direction de la souris. Mode de contrôle alternatif (vue top-down ou caméra fixe).

**GE :** Aucun. **Tags bloqués :** Aucun.

---

### GA_FirstCameraOn

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/GA_FirstCameraOn`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Start**)

**InputTag :** `InputTag.ChangeCamera`

**GE appliqué :** `/Game/AbilitySystem/GEs/GE_FirstCamera`

**Logique :** Applique `GE_FirstCamera` qui accorde le tag `InputTag.FirstCamera`. Bascule la caméra en vue première personne.

**Tags bloqués :** Aucun.

---

### GA_FirstCameraOff

**Chemin :** `/Game/AbilitySystem/Abilities/Movement/GA_FirstCameraOff`
**Classe C++ :** `UHWGameplayAbility_MovementMode` (mode **Stop**)

**InputTag :** `InputTag.ChangeCamera`

**Tags bloqués (ActivationBlockedTags) :**
- `InputTag.FirstCamera` — ne peut désactiver que si le tag est présent

**Logique :** Retire les effets accordant `InputTag.FirstCamera`. Restaure la vue troisième personne.

---

## Référence des tags natifs

### Tags de mouvement (MovementState)

| Tag | Signification | Accordé par |
|-----|--------------|-------------|
| `MovementState.Walking` | Personnage en marche | `GE_Walking` |
| `MovementState.Running` | Personnage en course | `GE_Running` |
| `MovementState.Sprinting` | Personnage en sprint | `GE_Sprinting` |
| `MovementState.Crouching` | Personnage accroupi | `GE_Crouching` |
| `MovementState.Swimming` | Personnage en nage | `GE_Swimming` |
| `MovementState.Flying` | Personnage en vol | `GE_Flying` |
| `MovementState.Driving` | Personnage conduit | `GE_Driving` |
| `MovementState.OnBoat` | Personnage sur bateau | `GE_OnBoat` |

### Tags de combat influant sur la locomotion

| Tag | Effet sur la locomotion |
|-----|------------------------|
| `Combat.State.Blocking` | Bloque Sprint Start et Sprint Stop |
| `Combat.State.IFrame` | Accordé par les GE d'esquive (invulnérabilité) |
| `InputTag.FirstCamera` | Vue première personne active |

### InputTags de locomotion

| InputTag | Touche typique | Ability liée |
|----------|---------------|-------------|
| `InputTag.Sprint` | Maj gauche | GA_SprintStart / GA_SprintStop |
| `InputTag.Crouch` | Ctrl | GA_Crouch |
| `InputTag.Jump` | Espace | GA_DoubleJump |
| `InputTag.Dash` | Shift/double dir. | GA_Dodge* (Back/Forward/Left/Right) |
| `InputTag.Flying` | Double Espace / V | GA_FlyingStart / GA_FlyingStop |
| `InputTag.WalkRun` | Alt | GA_WalkRun (toggle) |
| `InputTag.Move` | WASD | GA_FollowDirectionInput |
| `InputTag.Look.Mouse` | Souris | GA_FollowMouseDirection |
| `InputTag.ChangeCamera` | C / Tab | GA_FirstCameraOn / GA_FirstCameraOff |

### GEs de locomotion référencés

| GameplayEffect | Chemin | Rôle |
|---------------|--------|------|
| `GE_Walking` | `/Game/AbilitySystem/GEs/Movement/GE_Walking` | Tag + vitesse marche |
| `GE_Running` | `/Game/AbilitySystem/GEs/Movement/GE_Running` | Tag + vitesse course |
| `GE_Sprinting` | `/Game/AbilitySystem/GEs/Movement/GE_Sprinting` | Tag + vitesse sprint + fly speed |
| `GE_Crouching` | `/Game/AbilitySystem/GEs/Movement/GE_Crouching` | Tag + vitesse accroupi |
| `GE_Flying` | `/Game/AbilitySystem/GEs/Movement/GE_Flying` | Tag + mode vol CMC |
| `GE_Swimming` | `/Game/AbilitySystem/GEs/Movement/GE_Swimming` | Tag + mode nage CMC |
| `GE_Driving` | `/Game/AbilitySystem/GEs/Movement/GE_Driving` | Tag conduite |
| `GE_OnBoat` | `/Game/AbilitySystem/GEs/Movement/GE_OnBoat` | Tag bateau |
| `GE_DodgedRecently` | `/Game/AbilitySystem/GEs/Movement/GE_DodgedRecently` | Tag combo esquive temporaire |
| `GE_DodgeBackwardIFrame` | `/Game/AbilitySystem/GEs/Movement/GE_DodgeBackwardIFrame` | Invulnérabilité dodge arrière |
| `GE_DodgeForwardIFrame` | `/Game/AbilitySystem/GEs/Movement/GE_DodgeForwardIFrame` | Invulnérabilité dodge avant/lat |
| `GE_FirstCamera` | `/Game/AbilitySystem/GEs/GE_FirstCamera` | Tag caméra 1ère personne |

---

## Notes et observations

### Coût et cooldown
Aucune ability de locomotion ne possède de `CostGameplayEffectClass` ni de `CooldownGameplayEffectClass` configurés dans le CDO. Les abilities de locomotion sont **gratuites** (pas de coût Stamina/Mana) et sans cooldown GAS dédié. Seul le mécanisme naturel de `ActivationBlockedTags` (états mutuellement exclusifs) empêche les activations en double.

### Pattern Start/Stop
Toutes les transitions de mode de déplacement suivent un pattern binaire **Start/Stop** : une ability applique un GE accordant un tag d'état, l'autre retire ce GE en ciblant ses tags granted. Ce design évite les conflits grâce à `ActivationBlockedTags` — on ne peut pas passer à un état déjà actif.

### Esquives et IFrames
Les 4 esquives implémentent un système d'**invulnérabilité temporaire** (I-Frame) via GE :
- `DelayIFrameApplication = 0.0s` : l'IFrame est appliqué immédiatement au commit
- `DelayDodgedRecentlyApplication = 0.25s` : le tag de combo arrive légèrement après pour permettre des chaînes

### GA_DodgeLeft : valeur Direction=4
La valeur `Direction=4` dépasse le range documenté (0-3). Cela peut indiquer une extension de l'enum ou un défaut de configuration. Vérifier la logique C++ `HWGameplayAbility_Dodge::ActivateAbility` : actuellement seules les valeurs 0, 1, 2, 3 sont explicitement gérées.

### Overrides CMC
Pour les abilities MovementMode, tous les `OverrideMax*Speed` sont à `-1.0` (valeur sentinelle = "ne pas modifier"). La modification des vitesses est déléguée aux **Gameplay Effects** (via Attribute Modifiers sur les AttributeSet du CMC ou via le BP graph), sauf pour les abilities Dodge qui opèrent via RootMotion direct.

---

*Documentation générée automatiquement via MCP Unreal Editor — analyse des CDO, binaires uasset et sources C++ du projet HybeliorWorld 5.4.*
