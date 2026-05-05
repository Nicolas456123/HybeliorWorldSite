---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Cross-System — Character & Inventory

Hiérarchie Character et intégrations Inventory (stats GAS, UI, persistence OWS).

---

## Character

### Fichiers analysés

- `Character/HWCharacter.h`
- `Character/HWGASCharacter.h`
- `Character/HWGASPlayerCharacter.h`
- `Character/HWPlayerAnimInstance.h`

### Hiérarchie

```
ACharacter (Engine)
  └── AHWCharacter          (OWS data: OftenChange, ChangeChar, Appearance, Targeting)
        └── AHWGASCharacter  (ASC + CombatAttributeSet + UI tags + death events)
              └── AHWGASPlayerCharacter  (Input + Equipment + tous les composants gameplay)
```

### Character → GAS

```
AHWGASCharacter
  │  implements IAbilitySystemInterface  ──► GetAbilitySystemComponent()
  │  owns UHWAbilitySystemComponent* AbilitySystem
  │  owns UHWCombatAttributeSet* CombatAttributes
  │  OnHealthChange / OnEnergyChange / OnStaminaChange / OnManaChange
  │    └─► delegates GAS OnAttributeChange → appels BlueprintNativeEvent HealthChanged()
  │        (2026-04-07: BP overrides removed; C++ _Implementation now runs directly)
  │  SetupAttributeChangeDelegates()  ──► binding sur ASC
  │  OnUIRelatedTagsChanged()         ──► binding sur ASC tag events
  │  FNormalAbility1CooldownBeginDelegate / EndDelegate  ──► delegates custom (non DECLARE_*)
```

**Mode** : Ownership direct + binding delegates ASC
**Risque** : **MOYEN** — Les delegates `FNormalAbility1CooldownBeginDelegate` / `End` sont déclarés dans le .h sans leur macro `DECLARE_`. Cela suggère une déclaration manquante ou un typedef opaque hérité d'un autre module.

### Character → Inventory

```
AHWGASPlayerCharacter
  │  UpdateMeshEquipment()  ──► lit EquipmentInventory depuis PlayerController
  │  Server_ChangeAppearanceNative()  ──► Server RPC
  │  OnRep_UpdateMeshEquipment()      ──► client replication
  │
AHWPlayerController
  │  BagInventory: UHWInventoryComponent*
  │  EquipmentInventory: UHWInventoryComponent*
  │    └─► AHWGASPlayerCharacter les lit via GetHWGASPlayerCharacter()->GetController()
```

**Mode** : Appel direct via PlayerController
**Risque** : **MOYEN** — `UpdateMeshEquipment()` accède au PlayerController casté. Sur un client sans autorité, `EquipmentInventory` peut ne pas être disponible avant la fin de l'init OWS.

> **Mise à jour 2026-04-07** : `UHWCharacterCustomComponent` a été supprimé. `LoadCharacterCustomization` dans `HWPlayerController.cpp` ne fait plus appel au composant (TODO ajouté pour le raccordement visuel). `Server_ChangeAppearanceNative` RPC existe toujours mais la customisation visuelle n'est plus appliquée. `bUpdateMeshEquipment` (replicated) et `UpdateMeshEquipment()` restent en service.

### Character → Combat

```
AHWGASPlayerCharacter
  │  ComboComponent: UHWComboComponent*
  │  WeaponMasteryComponent: UHWWeaponMasteryComponent*
  │  GA_ReadyToFight / GA_UnarmedAttack / GA_BowShoot / GA_SwordAttack  ──► TSubclassOf<UGameplayAbility>
  │  Input_WeaponLeft / Input_WeaponRight  ──► appels directs vers ComboComponent
```

**Mode** : Ownership composant + activation d'abilities
**Risque** : **FAIBLE**

### Character → Progression / Quest

```
AHWGASPlayerCharacter
  │  ProgressionComponent: UHWProgressionComponent*
  │  QuestComponent: UHWQuestComponent*
  │  DialogueComponent: UHWDialogueComponent*
  │  SkillBarComponent: UHWSkillBarComponent*
```

**Mode** : Ownership direct — tous les composants sur le même Actor
**Risque** : **FAIBLE** — Architecture correcte (fat player character). La dépendance inverse (Progression → Character) passe par `GetOwner()`.

### Character → Animation

```
AHWGASPlayerCharacter → UHWPlayerAnimInstance
  │  ComboComponent notifie: OnComboAttack delegate  ──► AnimInstance écoute (supposé en BP)
  │  PlayAttackMontage() dans ComboComponent  ──► appel direct sur AnimInstance via owner
```

**Mode** : Appel direct / delegate
**Risque** : **FAIBLE** — Standard UE5.

### Character → Water

```
AHWGASPlayerCharacter
  │  BuoyancyComponent: UHWBuoyancyComponent*
  │  BindWaterEvents()  ──► binding delegates Buoyancy
  │  OnEnteredWater() / OnExitedWater()  ──► activent GA_SwimmingStart/Stop
```

**Mode** : Binding delegates Water → activation d'abilities GAS
**Risque** : **FAIBLE** — Le système Water est intégré dans le module HybeliorWorld.

> **Mise à jour 2026-04-07** : `BoatMoveForward`, `BoatMoveRight`, `OnBoatOffsetMove` sont des `BlueprintImplementableEvent` toujours déclarés en C++ mais dont les BP event stubs ont été supprimés. Ces fonctions ne font plus rien quand elles sont appelées (voir [[Technical Debt Active]]).

---

## Inventory

### Fichiers analysés

- `Inventory/HWInventoryComponent.h`
- `Inventory/HWItemStaticData.h`
- `Inventory/HWLootTable.h`

### Inventory → GAS (stats d'équipement)

```
HWInventoryComponent
  │  ApplyEquipmentStats(FHWInventoryItem)
  │    └─► GetOwner()->GetComponentByClass<UAbilitySystemComponent>()  [supposé]
  │    └─► crée UGameplayEffect dynamique avec Modifiers basés sur FHWCara[]
  │  ActiveEquipmentEffects: TMap<FGuid, FActiveGameplayEffectHandle>
  │  RemoveEquipmentStats(FGuid)  ──► ASC->RemoveActiveGameplayEffect()
```

**Mode** : Appel direct vers ASC
**Risque** : **FORT** — `FHWInventoryItem` transporte les stats via `TArray<FHWCara>` (enum `ECara` → valeur int). La conversion `ECara` → `FGameplayAttribute` doit se faire en code. Si cette correspondance n'est pas maintenue en parallèle des modifications de `HWCombatAttributeSet`, les stats d'équipement peuvent référencer des attributs inexistants.

### Inventory → OWS (persistence)

```
HWInventoryComponent
  │  PersistInventory()     ──► appelle OWS via PlayerController (BP ou via OWSPlayerControllerComponent)
  │  SerializeInventory()   ──► JSON pour stockage
  │  LoadInventorySerialize() ──► désérialisation depuis OWS
```

**Mode** : Sérialisation JSON + appel OWS via PlayerController
**Risque** : **MOYEN** — Pas d'interface C++ directe vers OWS visible dans ce header. Le passage s'effectue probablement via `AHWPlayerController::RunPersistenceData()` (BlueprintNativeEvent) ou directement en Blueprint.

### Inventory → UI

```
HWInventoryComponent
  │  InventoryDisplayItems: TArray<UHWInventoryDisplayItemObject*>
  │  AddDisplayItem / RemoveDisplayItem / ReloadDisplayItems  ──► notifications UI
  │  InventoryWidget: UHWCommonInventoryListWidget*         ──► référence directe widget
  │  EquipmentWidget: UHWEquipmentWidget*                   ──► référence directe widget
```

**Mode** : Références directes vers widgets
**Risque** : **FORT** — `HWInventoryComponent` (composant Actor) détient des pointeurs vers des widgets UMG. C'est un couplage fort Gameplay → UI qui va à l'encontre du pattern MVP/MVVM. Si le widget est détruit (ex: fermeture du panneau), les pointeurs deviennent invalides.

---

## Voir aussi

- [[Cross System Overview]] — classe le lien `Inventory → UI (Widgets)` en FORT (direct ptr vers UMG) et `CombatAttributeSet → Character` en FORT (raw pointer `WhoAttackedUsLast`) dans le tableau global.
- [[Cross System GAS Combat]] — documente `HWInventoryComponent::ApplyEquipmentStats(FHWInventoryItem)` qui crée un dynamic GE appliqué sur l'ASC et la conversion `ECara → FGameplayAttribute` fragile.
- [[Cross System Progression Quest]] — décrit `UHWProgressionComponent`, `UHWQuestComponent` et `UHWDialogueComponent` possédés par `AHWGASPlayerCharacter` (dépendance inverse via `GetOwner()`).
- [[Cross System Framework World]] — détaille `AHWPlayerController` comme God Object avec `BagInventory`/`EquipmentInventory`, les RPCs `Save*`/`Load*` et `HandleDialogueAction` (hub Character↔Inventory).
- [[Cross System Circular Deps]] — confirme la circulaire `Inventory → Widgets UMG` comme l'anti-pattern MVP le plus problématique du projet et la circulaire `GAS ↔ Character` gérée par forward declare.
- [[Technical Debt Active]] — section 10.4 documente les BlueprintImplementableEvents orphelins `BoatMoveForward`/`BoatMoveRight`/`OnBoatOffsetMove` (HWGASPlayerCharacter.h) et 10.5 la suppression de `UHWCharacterCustomComponent`.
- [[Network Replication Audit]] — section 1.3 déclare `bUpdateMeshEquipment` en `COND_None` sur `AHWGASPlayerCharacter` et section 9.2 couvre `Server_ChangeAppearanceNative` sans composant visuel (`HWGASPlayerCharacter.cpp:1201`).
