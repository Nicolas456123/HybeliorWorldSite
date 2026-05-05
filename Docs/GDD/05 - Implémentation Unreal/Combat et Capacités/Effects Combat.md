---
tags: [implementation, ue5, gas, combat]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# MCP_GE_Combat — Documentation des GameplayEffects de Combat

> Généré via MCP Unreal Editor Python — HybeliorWorld 5.4
> Date : 2026-04-04
> Source : `/Game/AbilitySystem/GEs/`

## Classes C++ associées
- [[Gameplay Effect]] — classe C++ qui pilote ces GE_* (cooldowns, états, dégâts, regen, coûts)

---

## Résumé des types de durée utilisés

| Type | Description |
|------|-------------|
| `INSTANT` | Application instantanée, pas de durée |
| `INFINITE` | Actif jusqu'à retrait explicite |
| `HAS_DURATION` | Durée fixe (en secondes) |

---

## 1. GEs d'état de combat (Combat/*)

Ces effets sont appliqués pour taguer le personnage dans un état de combat particulier. Tous sont de type `INFINITE` et ne portent aucun modifier numérique — leur rôle est purement de gestion de tags.

---

### GE_ReadyToFight
- **Chemin** : `/Game/AbilitySystem/GEs/Combat/GE_ReadyToFight`
- **Durée** : `INFINITE`
- **Période** : 0.0 (pas de tick périodique)
- **Tags accordés (owned)** : `Combat.State.ReadyToFight`
- **Tags d'effet** : `Combat.State.ReadyToFight`
- **Modifiers** : aucun
- **Rôle** : Marqueur fondamental indiquant que le personnage est en posture de combat. Requis par la plupart des autres GEs de combat comme tag d'effet parent.

---

### GE_Aiming
- **Chemin** : `/Game/AbilitySystem/GEs/Combat/GE_Aiming`
- **Durée** : `INFINITE`
- **Période** : 0.0
- **Tags accordés (owned)** : `InputTag.Aiming`
- **Tags d'effet** : `Combat.State.ReadyToFight`
- **Modifiers** : aucun
- **Rôle** : Actif lorsque le joueur vise (arc, magie, arme à distance). Confère le tag `InputTag.Aiming` utilisé par les animations et les GAs de tir.

---

### GE_Blocking
- **Chemin** : `/Game/AbilitySystem/GEs/Combat/GE_Blocking`
- **Durée** : `INFINITE`
- **Période** : 0.0
- **Tags accordés (owned)** : `Combat.State.Blocking`
- **Tags d'effet** : `Combat.State.ReadyToFight`
- **Modifiers** : aucun
- **Rôle** : Actif lorsque le personnage bloque. Le tag `Combat.State.Blocking` est consulté par les GAs de dégâts pour appliquer la réduction de dommages au bouclier.

---

### GE_Bow
- **Chemin** : `/Game/AbilitySystem/GEs/Combat/GE_Bow`
- **Durée** : `INFINITE`
- **Période** : 0.0
- **Tags accordés (owned)** : `Combat.Set.Bow`
- **Tags d'effet** : `Combat.State.ReadyToFight`
- **Modifiers** : aucun
- **Rôle** : Identifie l'arme équipée comme un arc. Conditionne l'activation des GAs de tir à l'arc et les sets d'animation associés.

---

### GE_SwordAndShield
- **Chemin** : `/Game/AbilitySystem/GEs/Combat/GE_SwordAndShield`
- **Durée** : `INFINITE`
- **Période** : 0.0
- **Tags accordés (owned)** : `Combat.Set.SwordAndShield`
- **Tags d'effet** : `Combat.State.ReadyToFight`
- **Modifiers** : aucun
- **Rôle** : Identifie l'arme équipée comme une épée + bouclier. Débloque les GAs de blocage actif et les combos dédiés.

---

### GE_UnarmedTag
- **Chemin** : `/Game/AbilitySystem/GEs/Combat/GE_UnarmedTag`
- **Durée** : `INFINITE`
- **Période** : 1.0 s (tick périodique actif)
- **Tags accordés (owned)** : `Combat.Set.Unarmed`
- **Tags d'effet** : aucun
- **Modifiers** : aucun
- **Note** : La période de 1 s est inhabituelle pour un GE de tag pur — probablement un vestige de test ou une base pour future logique de tick (progression maîtrise à mains nues ?).
- **Rôle** : Marqueur d'état sans arme équipée. Active les GAs de combat à mains nues.

---

### GE_Equipment
- **Chemin** : `/Game/AbilitySystem/GEs/Combat/GE_Equipment`
- **Durée** : `INFINITE`
- **Période** : 0.0
- **Tags accordés (owned)** : aucun (vide)
- **Tags d'effet** : aucun
- **Modifiers** : aucun
- **Rôle** : GE conteneur pour les effets liés à l'équipement. Les modifiers réels sont probablement injectés dynamiquement via C++ au moment de l'équipement (pattern SetByCaller ou Execution dynamique).

---

### GE_FirstCamera
- **Chemin** : `/Game/AbilitySystem/GEs/GE_FirstCamera`
- **Durée** : `INFINITE`
- **Période** : 0.0
- **Tags accordés (owned)** : `InputTag.FirstCamera`
- **Tags d'effet** : `Combat.State.ReadyToFight`
- **Modifiers** : aucun
- **Rôle** : Actif en mode caméra première personne. Le tag `InputTag.FirstCamera` conditionne les animations et la logique d'aiming FPS.

---

## 2. GEs de fenêtre de combo

### GE_ComboWindow01
- **Chemin** : `/Game/AbilitySystem/GEs/GE_ComboWindow01`
- **Durée** : `HAS_DURATION`
- **Période** : 0.0
- **Tags accordés (owned)** : `Combat.Combo.Window.1`
- **Tags d'effet** : aucun
- **Modifiers** : aucun
- **Rôle** : Ouvre la fenêtre de combo n°1. Pendant la durée de cet effet, le tag `Combat.Combo.Window.1` est présent, permettant à la GA suivante de s'enchaîner. La durée exacte est gérée par la GA parente (SetByCaller ou courbe d'animation).

---

## 3. GEs de dégâts (Damage/*)

Ces effets sont tous de type `INSTANT`. Ils s'appuient sur des **Executions C++** (classe `UDamageExecution` ou équivalent) pour calculer et appliquer les dégâts — les modifiers ScalableFloat sont vides car le calcul passe par des MMC/Executions non exposés au Python Blueprint CDO.

---

### GE_FireballDamageEffect
- **Chemin** : `/Game/AbilitySystem/GEs/Damage/GE_FireballDamageEffect`
- **Durée** : `INSTANT`
- **Période** : 0.0
- **Tags d'effet** : `Combat.DamageType.Water` *(tag présent — probablement Water/Feu à vérifier en éditeur)*
- **Tags accordés** : aucun
- **Modifiers** : aucun visible (Execution C++)
- **Rôle** : Dégâts instantanés de la boule de feu. Le type de dégât est tagué `Combat.DamageType.Water` — à vérifier si ce tag est correct ou s'il s'agit d'une coquille (Fire vs Water).

---

### GE_IcicleDamageEffect
- **Chemin** : `/Game/AbilitySystem/GEs/Damage/GE_IcicleDamageEffect`
- **Durée** : `INSTANT`
- **Période** : 0.0
- **Tags d'effet** : `Combat.DamageType.Ice`
- **Tags accordés** : aucun
- **Modifiers** : aucun visible (Execution C++)
- **Rôle** : Dégâts instantanés du sort Icicle. Type de dégât Glace — interagit avec les GEs `GE_ApplyFrozenFor4Seconds` / `GE_ApplyColdFor6Seconds` sur cibles mouillées.

---

### GE_FallingDamageEffect
- **Chemin** : `/Game/AbilitySystem/GEs/Damage/GE_FallingDamageEffect`
- **Durée** : `INSTANT`
- **Période** : 0.0
- **Tags d'effet** : `Combat.DamageType.Falling`
- **Tags accordés** : aucun
- **Modifiers** : aucun visible (Execution C++)
- **Rôle** : Dégâts de chute. Appliqué par la GA de chute en fonction de la vitesse d'impact. Type de dégât distinct (`Falling`) pour ignorer les résistances élémentaires.

---

### GE_LightningStormDamage
- **Chemin** : `/Game/AbilitySystem/GEs/Damage/GE_LightningStormDamage`
- **Durée** : `INSTANT`
- **Période** : 0.0
- **Tags d'effet** : aucun
- **Tags accordés** : aucun
- **Modifiers** : aucun visible
- **Rôle** : Dégâts de la tempête de foudre. Le type élémentaire Foudre n'est pas encore taggué — à compléter avec `Combat.DamageType.Lightning` pour les interactions élémentaires (eau + foudre).

---

### GE_TestDamage50
- **Chemin** : `/Game/AbilitySystem/GEs/Damage/GE_TestDamage50`
- **Durée** : `INSTANT`
- **Période** : 0.0
- **Tags d'effet** : aucun
- **Tags accordés** : aucun
- **Modifiers** : aucun visible
- **Rôle** : GE de test appliquant 50 points de dégâts. Usage en développement / debug uniquement. À supprimer avant production.

---

## 4. GEs d'états élémentaires (Dot / Status)

Ces effets appliquent des états persistants liés aux interactions élémentaires. Ils sont tous de type `HAS_DURATION` avec stacking `AGGREGATE_BY_TARGET`.

---

### GE_ApplyBurningFor10Seconds
- **Chemin** : `/Game/AbilitySystem/GEs/GE_ApplyBurningFor10Seconds`
- **Durée** : `HAS_DURATION` — 10 secondes
- **Période** : 0.0
- **Stacking** : `AGGREGATE_BY_TARGET` (une seule instance par cible)
- **Tags accordés (owned)** : `Combat.State.Burning`
- **Tags d'effet** : aucun
- **Modifiers** : aucun (tick de dégâts géré par `GE_BurningEffect`)
- **Rôle** : Applique le statut Brûlure sur la cible. Déclenche `GE_BurningEffect` en parallèle pour les dégâts périodiques.

---

### GE_BurningEffect
- **Chemin** : `/Game/AbilitySystem/GEs/GE_BurningEffect`
- **Durée** : `HAS_DURATION`
- **Période** : 1.0 s (tick de dégâts chaque seconde)
- **Stacking** : `NONE`
- **Tags accordés (owned)** : `Combat.State.Burning`
- **Tags d'effet** : `Combat.State.Burning`
- **Modifiers** : aucun visible (Execution C++ pour les dégâts de feu périodiques)
- **Rôle** : Effet de brûlure avec tick de dégâts par seconde. Séparé de `GE_ApplyBurningFor10Seconds` pour permettre une gestion indépendante de la durée d'état vs. les dégâts.

---

### GE_ApplyColdFor6Seconds
- **Chemin** : `/Game/AbilitySystem/GEs/GE_ApplyColdFor6Seconds`
- **Durée** : `HAS_DURATION` — 6 secondes
- **Période** : 0.0
- **Stacking** : `AGGREGATE_BY_TARGET`
- **Tags accordés (owned)** : `Combat.State.Cold`
- **Tags d'effet** : aucun
- **Modifiers** : aucun
- **Rôle** : Applique l'état Froid. Ralentit potentiellement la cible (via modifier sur Speed dans une Execution). Prérequis pour déclencher Gelé si une cible Mouillée reçoit des dégâts de Glace.

---

### GE_ApplyFrozenFor4Seconds
- **Chemin** : `/Game/AbilitySystem/GEs/GE_ApplyFrozenFor4Seconds`
- **Durée** : `HAS_DURATION` — 4 secondes
- **Période** : 0.0
- **Stacking** : `AGGREGATE_BY_TARGET`
- **Tags accordés (owned)** : `Combat.State.Frozen`
- **Tags d'effet** : aucun
- **Modifiers** : aucun
- **Rôle** : Applique l'état Gelé (immobilisation). Durée plus courte que Froid — état sévère à courte fenêtre. Interaction élémentaire Eau+Glace ou Froid+Glace.

---

### GE_ApplyWetFor10Seconds
- **Chemin** : `/Game/AbilitySystem/GEs/GE_ApplyWetFor10Seconds`
- **Durée** : `HAS_DURATION` — 10 secondes
- **Période** : 0.0
- **Stacking** : `AGGREGATE_BY_TARGET`
- **Tags accordés (owned)** : `Combat.State.Wet`
- **Tags d'effet** : aucun
- **Modifiers** : aucun
- **Rôle** : Applique l'état Mouillé. Prérequis pour les interactions élémentaires : Foudre (dégâts amplifiés), Glace (gel immédiat), Feu (extinction et retrait de Wet).

---

## 5. GEs de régénération

Tous de type `INFINITE` avec période de tick 1.0 s. Actifs en permanence sur le personnage vivant. Les modifiers réels (valeurs de regen) sont probablement calculés via Execution ou SetByCaller depuis les DataAssets de statistiques.

| GE | Durée | Période | Rôle |
|----|-------|---------|------|
| `GE_HPRegenEffect` | `INFINITE` | 1.0 s | Régénération de Points de Vie |
| `GE_ManaRegenEffect` | `INFINITE` | 1.0 s | Régénération de Mana |
| `GE_StaminaRegenEffect` | `INFINITE` | 1.0 s | Régénération d'Endurance |

**Note** : Aucun modifier ScalableFloat visible depuis Python. Les valeurs de régénération sont probablement lues depuis les attributs `RegenRate` de l'`AttributeSet` via une Execution C++ ou une `ModifierMagnitudeCalculation`.

---

## 6. GEs de coût (Cost/*)

Tous de type `INSTANT`. Consomment une ressource au moment de l'activation d'une GA.

| GE | Durée | Ressource consommée | Rôle |
|----|-------|---------------------|------|
| `GE_ManaCostFor_Fireball` | `INSTANT` | Mana | Coût en mana du sort Fireball |
| `GE_ManaCostFor_Icicle` | `INSTANT` | Mana | Coût en mana du sort Icicle |
| `GE_DodgeStaminaCost` | `INSTANT` | Endurance | Coût en stamina d'une esquive |

**Note** : Les valeurs numériques (montant consommé) ne sont pas visibles depuis les modifiers Python — elles sont définies via `SetByCaller` ou `ScalableFloat` lié à un DataTable de balance. À documenter depuis l'éditeur Blueprint directement.

---

## Carte des interactions élémentaires (basée sur les tags)

```
Mouillé (Wet)  +  Foudre  →  Dégâts amplifiés
Mouillé (Wet)  +  Glace   →  Gelé (Frozen, 4s)
Mouillé (Wet)  +  Feu     →  Extinction (retire Wet)
Froid  (Cold)  +  Glace   →  Gelé (Frozen, 4s)
Brûlant        +  Eau     →  Extinction (retire Burning)
```

---

## Points d'attention et anomalies détectées

| GE | Anomalie | Priorité |
|----|----------|----------|
| `GE_FireballDamageEffect` | Tag d'effet `Combat.DamageType.Water` suspect (Feu ≠ Eau ?) | Haute |
| `GE_LightningStormDamage` | Aucun tag de type de dégât — interactions élémentaires non fonctionnelles | Haute |
| `GE_TestDamage50` | GE de test présent en production | Moyenne |
| `GE_UnarmedTag` | Période de 1.0 s sur un GE de tag pur (inutile ou vestige ?) | Basse |
| `GE_Equipment` | GE vide — logique dépend entièrement du C++ d'équipement | Info |
| GEs Regen / Cost | Valeurs numériques non visibles (SetByCaller ou Execution) | Info |

---

*Fichier généré automatiquement via MCP Unreal Editor Python. Pour les valeurs de magnitude non accessibles depuis Python (SetByCaller, Executions C++), consulter directement les Blueprints dans l'éditeur UE5.*
