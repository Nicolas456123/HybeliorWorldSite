---
tags: [implementation, ue5, character]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# TargetingSystem

Systeme de ciblage / lock-on des personnages joueurs.

## Composants (sur AHWCharacter / AHWGASPlayerCharacter)

| Composant / Methode | Role |
|---------------------|------|
| `TargetDetectionSphere` | Sphere de detection des cibles a portee |
| `LockOnTarget` | Cible actuellement verrouillee |
| `SelectNext()` | Passe a la cible suivante dans la sphere |
| `SelectPrevious()` | Passe a la cible precedente |

## Tick update (C++)

Depuis 2026-04-07, la logique de ciblage est geree dans `AHWGASPlayerCharacter::Tick()` (C++) :
- Detection des cibles dans la sphere
- Maintien de `LockOnTarget` si celle-ci est toujours valide
- Rotation camera / personnage vers la cible

Voir [[HW GAS Player Character]] section Tick.

## Input associe

Input bindings typiques (a configurer dans Input Mapping Context) :
- LockOn toggle (souvent Middle Mouse Button ou LT/L2)
- Next target (right stick ou molette)
- Previous target

Voir [[Input System]] pour configuration Enhanced Input.

## Interaction avec [[Nameplate]]

La cible verrouillee peut afficher un widget etendu (indicator de lock-on, barre HP etendue). Le widget de nameplate standard reste actif sur les autres entites detectees.

## Voir aussi

- [[HW GAS Player Character]] — override `Tick(float DeltaTime)` (`HWGASPlayerCharacter.h:195`) qui appelle `UpdateTargetingSystem(DeltaTime)` herite chaque frame ; consomme les composants Cameras `FirstCamera`/`ThirdCamera` (`HWGASPlayerCharacter.h:82-88`) pour appliquer la rotation vers la cible verrouillee.
- [[HW Character]] — classe qui declare l'ensemble de l'API : `TargetDetectionSphere` (`HWCharacter.h:685`), `CurrentTarget` (`TWeakObjectPtr<AActor>`, `HWCharacter.h:669`), `LockOnTarget()` / `ReleaseTarget()` / `SelectNextTarget()` / `SelectPreviousTarget()` (`HWCharacter.h:691-708`), callbacks d'overlap `OnTargetEnterSphere` / `OnTargetExitSphere` (`HWCharacter.h:711-715`).
- [[Nameplate]] — le composant `UHWEntityNameplateWidgetComponent` rattache a chaque entite detectee par `TargetDetectionSphere` peut etre bascule en affichage etendu pour la cible verrouillee (pas de lien C++ direct mais partage du meme ensemble d'entites observees).
