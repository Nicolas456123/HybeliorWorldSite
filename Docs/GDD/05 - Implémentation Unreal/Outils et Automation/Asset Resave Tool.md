---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Asset Setup & Resave Tools

Scripts d'automatisation de création et configuration d'assets gameplay.

---

## SetupGameplayAssets.py

**Chemin** : `Content/EditorScripts/SetupGameplayAssets.py`
**Exécution** : `Tools > Execute Python Script` ou `py "Content/EditorScripts/SetupGameplayAssets.py"` dans l'Output Log

Script de setup initial du projet. Automatise la création des **assets gameplay manquants** en utilisant le pattern Duplication + Modification CDO (Class Default Object). Crée des Gameplay Effects (GE) par duplication de templates existants, puis tente de modifier leurs propriétés via l'API Python.

> L'éditeur **doit être ouvert** — ce script ne fonctionne pas en standalone.

### Fonctions du script

| Fonction | Rôle | Automatique |
|---|---|---|
| `create_invulnerable_ge()` | Duplique `GE_DodgeForwardIFrame` → `GE_IFrame_Invulnerable`, tente `duration_policy=HAS_DURATION` et `duration_magnitude=0.3s` | Partiel — tag `Combat.State.Invulnerable` manuel |
| `create_charged_ge()` | Duplique `GE_ApplyBurningFor10Seconds` → `GE_ApplyChargedFor6Seconds`, tente `duration_magnitude=6.0s` | Partiel — remplacement tag `Burning` → `Charged` manuel |
| `create_sample_unlock_definitions()` | Crée `/Game/Data/Unlocks/`, liste les 4 `DA_Unlock_*` | Logging uniquement |
| `create_sample_weapon_movesets()` | Crée `/Game/Data/Movesets/`, liste les 8 `DA_Moveset_*` | Logging uniquement |
| `create_sample_quests()` | Crée `/Game/Data/Quests/`, liste les 3 `DA_Quest_*` | Logging uniquement |
| `create_sample_loot_tables()` | Crée `/Game/Data/LootTables/`, liste les 3 `DA_LootTable_*` | Logging uniquement |
| `verify_tags_ini()` | Vérifie `Config/Tags/HWGameplayTags.ini` et `ImportTagsFromConfig=True` | Vérification uniquement |

### Assets créés automatiquement

| Asset | Dupliqué depuis | Modifications |
|---|---|---|
| `/Game/AbilitySystem/GEs/GE_IFrame_Invulnerable` | `GE_DodgeForwardIFrame` | `DurationPolicy=HAS_DURATION`, `DurationMagnitude=0.3s` |
| `/Game/AbilitySystem/GEs/GE_ApplyChargedFor6Seconds` | `GE_ApplyBurningFor10Seconds` | `DurationMagnitude=6.0s` |

### Actions manuelles listées (TODO)

**Répertoire `Content/Data/Unlocks/` — `UHWUnlockDefinition`** :
- `DA_Unlock_Sword_Combo2` — Sword Mastery >= 3
- `DA_Unlock_Sword_Skill1` — Sword Mastery >= 7 → Blade Rush
- `DA_Unlock_Fireball` — Fire Reactions >= 50 (condition cachée)
- `DA_Unlock_Title_Elementalist` — Toutes réactions déclenchées (condition cachée)

**Répertoire `Content/Data/Movesets/` — `UHWWeaponMoveset`** :
- `DA_Moveset_Sword`, `DA_Moveset_Axe`, `DA_Moveset_Bow`, `DA_Moveset_Staff`
- `DA_Moveset_Dagger`, `DA_Moveset_Mace`, `DA_Moveset_Spear`, `DA_Moveset_Shield`

**Répertoire `Content/Data/Quests/` — `UHWQuestData`** :
- `DA_Quest_Tutorial_FirstSword`, `DA_Quest_Tutorial_FirstKill`
- `DA_Quest_Hidden_ElementMaster`

**Répertoire `Content/Data/LootTables/` — `UHWLootTable`** :
- `DA_LootTable_BasicMob`, `DA_LootTable_BossMob`, `DA_LootTable_Chest`

### Vérification INI

Le script vérifie également :
- Présence de `Config/Tags/HWGameplayTags.ini`
- `ImportTagsFromConfig=True` dans `Config/DefaultGameplayTags.ini`

### Exécution

**Depuis le menu éditeur** :
```
Tools > Execute Python Script > Content/EditorScripts/SetupGameplayAssets.py
```

**Depuis la console Output Log** :
```
py "Content/EditorScripts/SetupGameplayAssets.py"
```

### Ce qu'il modifie

- Crée et sauvegarde des assets dans `/Game/AbilitySystem/GEs/`
- Crée les répertoires `/Game/Data/Unlocks/`, `/Game/Data/Movesets/`, `/Game/Data/Quests/`, `/Game/Data/LootTables/`
- Ne touche pas aux assets existants (vérification `asset_exists`)
- Produit un rapport dans l'Output Log

---

## Voir aussi

- [[Python Scripts]] — classe `SetupGameplayAssets.py` dans la catégorie « Content/EditorScripts — Setup d'assets » et liste son chemin `Content/EditorScripts/SetupGameplayAssets.py` dans le récapitulatif.
- [[Asset Migration Scripts]] — documente la création d'assets gameplay via duplication (création de `GE_IFrame_Invulnerable` depuis `GE_DodgeForwardIFrame`) en amont d'une éventuelle nativisation par `nativize_bp.py`.
