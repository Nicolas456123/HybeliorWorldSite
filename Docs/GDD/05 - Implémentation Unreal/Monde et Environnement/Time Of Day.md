---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# TimeOfDay

> Cycle jour/nuit 24h. Source : `Source/HybeliorWorld/Public/Environment/HWTimeOfDaySystem.h/.cpp`

`UHWTimeOfDaySystem` gère l'horloge monde, les calculs astronomiques et les positions soleil/lune. Tick phase 1 du pipeline ([[HW Environment Manager]]).

## Horloge monde

| Paramètre | Valeur |
|-----------|--------|
| Plage | 0 - 24h |
| Auto-avance | Oui |
| RealSecondsPerGameHour | 150s |
| Facteur temporel | 36x temps réel |
| Jour complet | ~60 min IRL |

## Calculs astronomiques

- **Déclinaison solaire** : calculée depuis la date monde + latitude
- **Equation du temps** : correction temps moyen vs temps vrai
- **Angle horaire** : position soleil dans le ciel
- **WorldLatitude + AxialTilt** : durée jour/nuit variable par saison

## Lune

- **Cycle synodique** : 29.53 jours (période lunaire complète)
- **8 phases** : Nouvelle lune → Premier croissant → Premier quartier → Gibbeuse croissante → Pleine lune → Gibbeuse décroissante → Dernier quartier → Dernier croissant

## 7 périodes de la journée

| Période | Description |
|---------|-------------|
| Night | Nuit profonde (soleil < -18°) |
| AstronomicalTwilight | Soleil -18° à -12° |
| NauticalTwilight | Soleil -12° à -6° |
| CivilTwilight | Soleil -6° à 0° |
| BlueHour | Juste avant lever / après coucher |
| GoldenHour | Lever / coucher jusqu'à ~10° |
| Day | Soleil > 10° |

## Intégration pipeline

Le TimeOfDay fournit à chaque frame :
- Position soleil (azimut + élévation)
- Position lune + phase
- Période courante (enum)
- Progression 0.0-1.0 dans la journée

Ces données alimentent [[Sky Surface Renderer]] (paramètres sky), [[Seasons]] (durée jour/nuit), et les systèmes de lumière dynamique.

## Incohérence connue

- Sync multi-serveur OWS incomplet : chaque serveur peut afficher une heure différente. Sync via OWS CustomWorldData non implémenté.

## Voir aussi

- [[HW Environment Manager]] — possède l'UPROPERTY `TObjectPtr<UHWTimeOfDaySystem> TimeOfDaySystem` (ligne 710 de `HWEnvironmentManager.h`) qu'il tick en phase 1 pour calculer les positions soleil/lune avant tout autre sous-système.
- [[Sky Surface Renderer]] — `UHWSkySurfaceRenderer` forward-declare `class UHWTimeOfDaySystem` dans son header et lit chaque frame les outputs astronomiques (azimut, élévation, phase lunaire) pour piloter les curves (`SunIntensityCurve`, `MoonIntensityCurve`, `StarsIntensityCurve`) appliquées aux matériaux ciel.
