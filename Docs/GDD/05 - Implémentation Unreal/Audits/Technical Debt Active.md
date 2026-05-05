---
tags: [implementation, ue5, audit, debt, active]
type: implementation
status: living-doc
last_review: 2026-05-01
needs_review_for: [persistence-race-condition-fix, input-ue54-migration]
implements: []
---

# Technical Debt Active

> Dette technique **en cours** — bugs, migrations API, race conditions, blocs commentés à investiguer.
> Issu de la scission V3.3 de `TechnicalDebt_Archive.md` + fusion de `FrameworkIncoherences.md`.
> Date d'analyse de référence : 2026-04-04 (avec ajouts 2026-04-07/08).

**Projet :** HybeliorWorld (UE 5.4)
**Périmètre :** `Source/HybeliorWorld/` + `Source/HybeliorWorldEditor/`

---

## Résumé exécutif

| Catégorie | Nombre | Sévérité |
|-----------|--------|----------|
| `// TODO` | 9 occurrences + 1 (visual apply) | Moyenne à haute |
| API dépréciées (UE 5.4) | 1 cluster (Input) — 5 fichiers | Haute |
| `PRAGMA_DISABLE_DEPRECATION_WARNINGS` | 5 blocs actifs | Haute |
| Fonction dépréciée (`DeprecatedFunction`) | 1 | Basse |
| Code commenté en bloc (potentiel mort) | 1 bloc logique significatif | Basse |
| Race condition critique documentée | 1 (`PERSISTENCE_RACE_CONDITION.md`) | **Critique** |
| BP cassés / warnings (2026-04-07) | 2 (UI_RegisterWidget, BP_EntitySpawner) | Moyenne |
| BlueprintImplementableEvent orphelins | 3 (BoatMove*) | Moyenne |
| MSVC ICE intermittent | 2 fichiers touchés | Basse |
| Composant supprimé sans remplacement | 1 (UHWCharacterCustomComponent) | Haute |
| Incohérences Framework (ex `FrameworkIncoherences.md`) | 9 | Variable |

---

## 1. Annotations `// TODO`

### 1.1 Système d'inventaire loot — code manquant

**Fichier :** `Private/Character/HWGASMobCharacter.cpp`, ligne 232

```cpp
// TODO: Add items to killer inventory or spawn as world pickups
```

**Contexte :** Le calcul du loot drop à la mort d'une entité est complet (tirage aléatoire, quantité, log), mais l'action suivante — ajouter les items à l'inventaire du tueur ou les faire apparaître dans le monde — n'est pas implémentée. Le loot est calculé mais disparaît.

**Statut :** Fonctionnalité incomplète. Bloque l'économie de drop en jeu.

### 1.2 Migration Input UE 5.4 — `AddPlayerMappableConfig`

**Fichier :** `Private/Character/HWGASPlayerCharacter.cpp`, ligne 173–175

```cpp
// TODO: Migrate to UEnhancedInputUserSettings (UE5.4 deprecation)
PRAGMA_DISABLE_DEPRECATION_WARNINGS
InputSubsystem->AddPlayerMappableConfig(Pair.Config.LoadSynchronous(), Options);
```

### 1.3 Migration Input — `RemovePlayerMappableConfig` sans équivalent

**Fichier :** `Private/Input/HWInputComponent.cpp`, ligne 76–81. La suppression d'un config mappable n'a pas de correspondance directe dans la nouvelle API. Le `UnregisterInputConfigs` appelle actuellement un no-op.

### 1.4 Migration struct Input — `FLoadedMappableConfigPair`

**Fichier :** `Public/Input/HWMappableConfigPair.h`, ligne 7–10. Migration vers `UEnhancedInputMappingContext` + `UEnhancedInputUserSettings` une fois la chaîne complète refactorisée.

### 1.5 Migration struct Input — `FMappableConfigPair`

**Fichier :** `Public/Input/HWMappableConfigPair.h`, ligne 19 et 48. Deux structs distinctes ont chacune un TODO de migration.

### 1.6 Migration `HWSettingsLocal`

**Fichier :** `Public/Core/HWSettingsLocal.h`, ligne 11.

### 1.7 Terrain — remplacement appels par réflexion Water

**Fichier :** `Private/Terrain/HWTerrainWaterBridge.cpp`, ligne 10. Les interactions avec `AHWInfiniteOcean` passent par `FindFunction` + `ProcessEvent` en réflexion. Risque de rupture silencieuse à chaque mise à jour Water.

### 1.8 Terrain Async — risque pointeur dangling

**Fichier :** `Private/Terrain/Generation/HWTerrainAsyncGenerator.cpp`, ligne 255. `FAutoDeleteAsyncTask` se détruit lui-même ; `ActiveTasks` conserve des pointeurs potentiellement dangling. `CancelAll()` ne peut pas appeler `EnsureCompletion()` de façon sûre.

### 1.9 Combat — type de dégâts physiques absent

**Fichier :** `Private/Combat/HWElementalReactionSystem.cpp`, ligne 155. La réaction "Shatter" (Physique + Gelé = 2× dégâts + dégel) est prévue mais nécessite l'ajout d'un type de dégâts physiques au GAS.

---

## 2. API Dépréciées (UE 5.3 → 5.4)

### 2.1 Cluster de migration Input (`UPlayerMappableInputConfig`)

Migration en cours affectant **5 fichiers** de façon cohérente. `UPlayerMappableInputConfig` est déprécié depuis UE 5.3 au profit de `UEnhancedInputUserSettings` + `UInputMappingContext`.

| Fichier | Usage déprécié |
|---------|---------------|
| `Public/Core/HWSettingsLocal.h` | Référence à `UPlayerMappableInputConfig` |
| `Private/Core/HWSettingsLocal.cpp` | `RegisterInputConfig`, `UnregisterInputConfig` |
| `Public/Input/HWMappableConfigPair.h` | `FLoadedMappableConfigPair`, `FMappableConfigPair` |
| `Private/Input/HWMappableConfigPair.cpp` | `RegisterPair` / `UnregisterPair` |
| `Private/Character/HWGASPlayerCharacter.cpp` | `InputSubsystem->AddPlayerMappableConfig(...)` |
| `Private/Input/HWInputComponent.cpp` | `RemovePlayerMappableConfig` (no-op temporaire) |

**Cible de migration :** Remplacer par `UEnhancedInputUserSettings::MapPlayerKey()` + `UEnhancedInputLocalPlayerSubsystem::AddMappingContext()` / `RemoveMappingContext()`.

---

## 3. `PRAGMA_DISABLE_DEPRECATION_WARNINGS` actifs

| Fichier | Portée | Raison documentée |
|---------|--------|-------------------|
| `Public/Core/HWSettingsLocal.h` | Toute la classe | `UPlayerMappableInputConfig` déprécié |
| `Private/Core/HWSettingsLocal.cpp` | Tout le fichier | Idem |
| `Public/Input/HWMappableConfigPair.h` | Struct `FLoadedMappableConfigPair` | Idem |
| `Public/Input/HWMappableConfigPair.h` | Struct `FMappableConfigPair` | Idem |
| `Private/Input/HWMappableConfigPair.cpp` | Tout le fichier | Idem |
| `Private/Character/HWGASPlayerCharacter.cpp` | Bloc inline | Idem |

`HWSettingsLocal.cpp` désactive les warnings pour **l'ensemble du fichier** sans réactiver — pragma le plus large.

---

## 4. Fonction dépréciée (`DeprecatedFunction`)

**Fichier :** `Source/HybeliorWorldEditor/HybeliorEditorSubsystem.h`, ligne 91.
Le plugin `NodeToCode` a été retiré ; la fonction `ExportBlueprintNodeToCode()` exécute toujours `GEditor->Exec(TEXT("NodeToCode.ExportCurrentBlueprint"))` qui n'existe plus.

**Recommandation :** Supprimer la fonction et l'entrée de menu.

---

## 5. Code commenté en bloc (code potentiellement mort)

### 5.1 Logique CommonUI — trait de plateforme (mort confirmé)

**Fichier :** `Private/Input/HWMappableConfigPair.cpp`, lignes 18–30. Logique de filtrage par trait de plateforme dépendait de `ICommonUIModule` (CommonUI), retiré du projet. La fonction `CanBeActivated()` retourne toujours `true`.

**Recommandation :** Supprimer le bloc commenté + champs `DependentPlatformTraits` / `ExcludedPlatformTraits` si non utilisés ailleurs.

---

## 6. Race condition critique — Persistence au logout

**Référence :** `Source/HybeliorWorld/PERSISTENCE_RACE_CONDITION.md`

| Problème | Fichier | Ligne | Impact |
|----------|---------|-------|--------|
| `BagInventory` non flushé au logout | `HWPlayerController.cpp` | 151–154 | Perte inventaire sac (fenêtre 20s) |
| `EquipmentInventory` jamais persisté | `HWPlayerController.cpp` | ~1444 | Perte équipement **100% des sessions** |
| Double appel `PersistCharacterData` dans `EndPlay` | `HWGASPlayerCharacter.cpp` | 1007 | Duplication + nullptr possible |
| `PlayerLogout` fire-and-forget sans ACK | `HWPlayerController.cpp` | 208 | Backend peut marquer offline avant persist |
| `NotifyPlayerLogout` — BlueprintImplementableEvent vide | `HWPlayerController.h` | 352 | Aucun séquençage Persist→ACK→Logout possible |

---

## 7. Incohérences Framework (ex `FrameworkIncoherences.md`)

> Fusion V3.3 du fichier obsolète `FrameworkIncoherences.md`.

Dette connue relative à `GameFramework`, à adresser par priorité :

1. `BlueprintFunctionLibrary` vide — réservé pour de futures fonctions utilitaires
2. `PlayerMappableInputConfig` deprecated (cf. section 2 — migration UE5.4 requise)
3. **Race condition initialisation** — cascade `PartialInitializationComplete` sans timeouts
4. **Pas de timeout OWS** — loading infini si backend offline
5. Hardcoded DeadKingdom travel
6. `AddFloatingDamage` via `ProcessEvent` (non-optimal)
7. Menu + Map state overlap possible
8. `CPF_RepSkip` usage non documenté
9. `WorldEvents` sans protection thread

### Génération procédurale de villes (BP)

`BP_GenerateCity` (BP) → spawne `BP_Ville` + `BP_InterestPointBase`. **10 noms hardcodés** (Durnhollow, Iseldra, Korveth, Lirandel, Myrralis, Oskavarn, Tharnor, Valendreth, Velmorin, Zepharun) → **à migrer vers DataTable**.

---

## 8. Éléments ajoutés — 2026-04-07/08

### 8.1 UI_RegisterWidget — noeud Register cassé

**Widget :** `UI_RegisterWidget`. Le noeud Register est cassé suite à un changement d'API OWS. L'inscription de nouveaux joueurs via l'UI est non fonctionnelle.

### 8.2 BP_EntitySpawner — warning de type mismatch

Warning de type mismatch à la compilation. Source de comportement inattendu au runtime.

### 8.3 MSVC 14.38 ICE — `LandscapeDataAccess.h` / `HWCombatAttributeSet.h`

Internal Compiler Error intermittent ; build échoue aléatoirement. Bug compilateur Microsoft.

### 8.4 Boat BlueprintImplementableEvents — stubs BP supprimés

**Fonctions :** `BoatMoveForward`, `BoatMoveRight`, `OnBoatOffsetMove`. Déclarées en C++ comme `BlueprintImplementableEvent` mais event stubs Blueprint supprimés (2026-04-07). Les inputs sont consommés sans effet.

### 8.5 `Server_ChangeAppearanceNative` — composant visuel supprimé

**Fichier :** `HWGASPlayerCharacter.cpp`, `HWPlayerController.cpp`. `UHWCharacterCustomComponent` supprimé (2026-04-07). RPC existe toujours, `LoadCharacterCustomization` a un TODO. Les changements d'apparence ne sont pas rendus.

---

## 9. Priorités de remédiation recommandées

| Priorité | Action | Effort estimé |
|----------|--------|---------------|
| **CRITIQUE** | Corriger la race condition persistence logout | 2–4h |
| **HAUTE** | Migrer `UPlayerMappableInputConfig` → `UEnhancedInputUserSettings` (6 fichiers) | 1–2 jours |
| **HAUTE** | Implémenter le nouveau pipeline visuel d'apparence | 4–8h |
| **MOYENNE** | Remplacer `FAutoDeleteAsyncTask` par `FAsyncTask` dans le terrain async | 2–4h |
| **MOYENNE** | Remplacer les appels `FindFunction/ProcessEvent` Water par API directe | 2–4h |
| **MOYENNE** | Corriger UI_RegisterWidget (noeud Register cassé, API OWS) | 1–2h |
| **MOYENNE** | Implémenter BoatMoveForward/Right/OnBoatOffsetMove en C++ ou supprimer | 2–4h |
| **BASSE** | Supprimer `ExportBlueprintNodeToCode` + entrée de menu | 30min |
| **BASSE** | Supprimer le bloc CommonUI commenté dans `HWMappableConfigPair.cpp` | 15min |
| **BASSE** | Corriger BP_EntitySpawner type mismatch warning | 30min |
| **BASSE** | MSVC 14.38 ICE — mettre à jour compilateur ou isoler les TU | Investigation |
| **BACKLOG** | Implémenter le type de dégâts physiques (Shatter reaction) | Design + implémentation |
| **BACKLOG** | Implémenter le loot drop effectif dans `HWGASMobCharacter` | Dépend du système inventaire |

---

## Voir aussi

- [[Technical Debt Resolved]] — assets archivés `_Archive/` et code mort confirmé
- [[Cross System Character Inventory]] — confirme suppression `UHWCharacterCustomComponent` + Boat orphelins
- [[Cross System Circular Deps]] — manques CRITIQUES `FHWQuestReward::ItemRewards`, `HWNPCComponent::ShopInventoryTag`
- [[Performance Analysis]] — anomalie P7.1 (dangling pointers `FAutoDeleteAsyncTask`)
- [[Network Replication Audit]] — section 9.2 documente `Server_ChangeAppearanceNative`
- [[Security Audit]] — vulnérabilité UE-07 expose `OWSAPICustomerKey`
- [[Game Mode]] — `AHWGameMode` et code mort commenté
- [[Player Controllers]] — `AHWPlayerController` race condition cascade
- [[Login Flow]] — manifestation de la race et timeout OWS
- [[Input System]] — migration `UPlayerMappableInputConfig`
