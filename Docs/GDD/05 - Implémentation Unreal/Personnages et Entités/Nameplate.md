---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Nameplate

Systeme de widget de nameplate au-dessus des personnages.

## Roles

Affichage au-dessus de chaque personnage :
- Nom de l'entite / joueur
- HP courant et HP%
- Niveau

## Methode principale

Dans `AHWGASEntityCharacter` :

```cpp
void UpdateEntityNameplate();
```

Met a jour le widget (HP, HP%, niveau) a chaque changement d'attribut.

## Integration cote joueur

`AHWGASPlayerCharacter` initialise le nameplate dans `BeginPlay()` (C++) depuis 2026-04-07. Voir [[HW GAS Player Character]].

## Actualisation

- Les entites mettent a jour le nameplate a chaque `HealthChanged` (BlueprintImplementableEvent de [[HW GAS Character]]).
- Le widget est attache via une `UWidgetComponent` sur le mesh (socket de tete ou offset vertical).

## Widgets associes

Les Blueprints de widgets UI listent le widget de nameplate. Voir [[Character Blueprints]] pour l'inventaire.

## Voir aussi

- [[HW GAS Entity Character]] — composant `UHWEntityNameplateWidgetComponent* EntityNameplateWidgetComponent` (`HWGASEntityCharacter.h:39`) et methode `UpdateEntityNameplate()` (`HWGASEntityCharacter.h:69`) qui rafraichit HP/HP%/niveau ; declenchee par l'override `OnHealthChange` de cette classe (`HWGASEntityCharacter.h:226`).
- [[HW GAS Player Character]] — composant `UHWEntityNameplateWidgetComponent* NameplateWidgetComponent` (`HWGASPlayerCharacter.h:74`) cree et attache au RootComponent dans le constructeur (`HWGASPlayerCharacter.cpp:32-33`) ; `SetupNameplate()` (`HWGASPlayerCharacter.h:335`) appelle `RefreshLinkToParent()` et masque le widget pour le LocalPlayer (`HWGASPlayerCharacter.cpp:1068`).
- [[HW GAS Character]] — BlueprintNativeEvent `HealthChanged(float OldValue, float NewValue)` (`HWGASCharacter.h:184-185`) declenche par la chaine `OnHealthChange` ; c'est ce hook qui est override cote entite/joueur pour appeler `UpdateEntityNameplate()` / `UpdateNameplate()`.
