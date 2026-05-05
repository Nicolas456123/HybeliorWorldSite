---
tags: [implementation, ue5, gas, combat, attributes]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [compression-souffle, mapping-8-stats]
implements: [Le Souffle, L'Accord]
---

# Combat Attribute Set

`UHWCombatAttributeSet` hérite de `UHWAttributeSet` → `UAttributeSet`. Définit 15 attributs répliqués : ressources vitales, stats de combat, et attributs transitoires de dégât/soin.

## Refonte sémantique — Compression Souffle + 5 paliers Maîtrise

> Voir [[Le Souffle]] et [[Migration Accord]] §"Phase D".
>
> ### Compression Souffle (à implémenter dans `UHWGameplayEffectExecutionCalc`)
>
> Toute stat brute (couche 1 — Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe) doit subir une compression linéaire :
>
> - Si `RawStat > 50` : appliquer `RawStat = 50 + (RawStat - 50) × 0.7`
> - Autrement dit : ramener 30 % de l'excès vers 50.
>
> Cette compression est une contrainte de gameplay évitant le power creep. Elle se déclenche **à chaque [[Le Souffle]]** (cycle Petit/Grand/Cardinal). Le code reste à implémenter en `UHWGameplayEffectExecutionCalc` post-V4.
>
> ### 5 paliers Maîtrise (au lieu de la courbe `XP × 1.15^N`)
>
> La progression de maîtrise se fait par 5 paliers discrets (Novice → Apprenti → Adepte → Expert → Maître) — voir [[Weapon Mastery]] pour le détail. La courbe XP exponentielle actuelle (`UHWWeaponMasteryComponent`) doit être remplacée par une table de seuils + une **rouille post-Souffle** (-15 % à chaque Souffle, dissipée par usage).
>
> Refonte sémantique seule en V3 — pas d'implémentation.

## Sources

- `HWCombatAttributeSet.h` / `HWCombatAttributeSet.cpp`
- `PreGameplayEffectExecute()` / `PostGameplayEffectExecute()` — hooks serveur

## Ressources vitales

| Attribut | Défaut | Regen (/5s) | Réplication |
|----------|--------|-------------|-------------|
| Health | 100 | HealthRegenRate (100) | COND_None |
| MaxHealth | 1000 | - | COND_None |
| HealthRegenRate | 100 | - | COND_OwnerOnly |
| Mana | 130 | ManaRegenRate (200) | COND_OwnerOnly |
| MaxMana | 1500 | - | COND_OwnerOnly |
| ManaRegenRate | 200 | - | COND_OwnerOnly |
| Stamina | 100 | StaminaRegenRate (10) | COND_OwnerOnly |
| MaxStamina | 100 | - | COND_OwnerOnly |
| StaminaRegenRate | 10 | - | COND_OwnerOnly |
| Energy | 100 | EnergyRegenRate (0) | COND_OwnerOnly |
| MaxEnergy | 100 | - | COND_OwnerOnly |
| EnergyRegenRate | 0 | - | COND_OwnerOnly |

## Statistiques de combat

| Attribut | Défaut | Réplication | Formule |
|----------|--------|-------------|---------|
| Strength | 10 | COND_OwnerOnly | → Attack = min(Strength × 10, 9999) |
| Agility | 10 | COND_OwnerOnly | → CritRate = clamp(Agility × 0.5, 0, 100) |
| Constitution | 10 | COND_OwnerOnly | → MaxHealth = Constitution × 100 |
| Attack | 0 | COND_OwnerOnly | Puissance d'attaque |
| Defense | 0 | COND_OwnerOnly | [0.0-1.0] réduction dégâts |
| CritRate | 0.05 | COND_OwnerOnly | 5% de base |
| CritDamage | 0.5 | COND_OwnerOnly | 50% bonus critique |

## Attributs transitoires (non répliqués)

- `Damage` : appliqué comme `-Health` dans `PostGameplayEffectExecute`.
- `Healing` : appliqué comme `+Health`.

## Accesseurs auto-générés

```cpp
// Pour chaque attribut X :
float HWGetX() const;
void  HWSetX(float NewVal);
void  HWInitX(float NewVal);
static FGameplayAttribute GetXAttribute();
```

## Tags de conditions élémentaires

Privés, initialisés dans `SetupGameplayTags()` :

```cpp
FGameplayTag DeadTag;
FGameplayTag WetTag, BurningTag, ColdTag, ElectrifiedTag;
FGameplayTag ChargedTag, FrozenTag;
FGameplayTag CriticalHitTag, InvulnerableTag;
FGameplayTag FireDamageTag, WaterDamageTag, IceDamageTag, LightningDamageTag;
```

## PreGameplayEffectExecute (serveur)

1. **Check invulnérabilité** : tag `Combat_State_Invulnerable` → magnitude forcée à 0.
2. **Détection critique** : magnitude impaire = critique (voir [[Gameplay Effect]] pour encodage).
3. **Type de dégât élémentaire** : cherche enfant de `Combat_DamageType` dans les tags GE.
4. **Réactions élémentaires** : `UHWElementalReactionSystem::CheckReaction()` → multiplicateur.
5. **Suppression conditions** : `RemoveActiveEffectsWithGrantedTags()`.
6. **Application conditions** : loose tags ou GameplayEffects pour Frozen/Charged.
7. **Réduction Defense** : `Dégâts -= Dégâts × Clamp(Defense, 0.0, 1.0)`.

## Incohérences connues

- Stamina est parfois modifiée directement sur l'AttributeSet par [[Combo System]] (`HWComboComponent.cpp:286`), contournant GAS → non répliqué.

## Voir aussi

- [[Gameplay Effect]] — `UHWGameplayEffectExecutionCalc` capture Attack/MaxHealth/CritRate/CritDamage de cet AttributeSet ; `TSubclassOf<UGameplayEffect>` des conditions (Wet/Cold/Burning/Electrified/Frozen/Charged) appliqués depuis `HandlePreExecuteEffectDamage`
- [[Elemental Reactions]] — `UHWElementalReactionSystem::CheckReaction()` + `ApplyReaction()` appelés dans `HandlePreExecuteEffectDamage`
- [[Gameplay Tags]] — `FHWGameplayTags` lus dans `SetupGameplayTags()` (damage types, conditions, invulnerable, critical hit)
- [[HW GAS Player Character]] — hub domaine 02 : cast en killer pour notifier progression/quest dans `PostGameplayEffectExecute` (HWGASCharacter et HWGASEntityCharacter accessibles transitivement)
- [[Game Mode]] — `AHWGameMode` source les `TSubclassOf<UGameplayEffect>` des conditions via `SetupGameplayEffects()`
- [[HW Progression Component]] — hub domaine 03 : notifié sur réaction/kill (`IncrementProgress`) ; HWQuestComponent accessible transitivement
- [[Combo System]] — `UHWComboComponent::ConsumeStamina()` mute directement `Stamina` de cet AttributeSet (hors GAS)
