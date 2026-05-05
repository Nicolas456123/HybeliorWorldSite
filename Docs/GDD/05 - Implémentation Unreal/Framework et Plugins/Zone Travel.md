---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Zone Travel

Mécanismes de voyage inter-zones pilotés par le serveur et relayés au client via OWS.

## Méthodes principales (`AHWPlayerController`)

| Méthode | Description |
|---|---|
| `TravelToZone(ZoneName, Location, Rotation)` | **Serveur uniquement.** Vérifie l'état du personnage, stoppe le mouvement, affiche le loading screen, puis appelle `GetZoneServerToTravelTo`. |
| `SetSelectedCharacterAndConnectToLastZone(GUID, CharName)` | Sélectionne un personnage et demande son dernier serveur de zone via OWS. |
| `TravelToLastZoneServer(CharName)` | Délègue directement à `OWSPlayerControllerComponent->TravelToLastZoneServer`. |
| `TravelToMap(ServerAndPort, X, Y, Z, RX, RY, RZ, PlayerName, SeamlessTravel)` | Travel bas niveau via OWS. |
| `Server_TravelToZone(ZoneName, Location, Rotation)` | RPC client→serveur (Reliable, WithValidation). |
| `Server_TravelToDeadKingdom()` | RPC hardcodé vers le Dead Kingdom — ⚠️ à migrer (voir [[Technical Debt Active]]). |

## Flux typique

```
Client appelle Server_TravelToZone(name, loc, rot)
  └─ Serveur: TravelToZone(name, loc, rot)
       ├─ Vérifie état personnage (pas en combat, pas mort, etc.)
       ├─ StopMovementImmediately()
       ├─ Client RPC → HideHUD / ShowLoadingScreen
       └─ OWS::GetZoneServerToTravelTo(zone)
            └─ NotifyGetZoneServerToTravelTo(serverAddr)
                 └─ TravelToMap(serverAddr, loc.X, loc.Y, loc.Z, rot.R, rot.P, rot.Y, playerName, true)
                      └─ ClientTravel → nouvelle map + nouvelle session
```

## Propriétés liées

| Propriété | Type | Description |
|---|---|---|
| `OWSAPICustomerKey` | `FString` | Clé client OWS (lue depuis `GGameIni`) |
| `OWS2APIPath` | `FString` | URL base de l'API OWS2 |
| `OWSEncryptionKey` | `FString` | Clé de chiffrement OWS |

## Voir aussi
- [[Player Controllers]] — méthodes `TravelToZone`, `TravelToMap`, `Server_TravelToZone`, `Server_TravelToDeadKingdom` sur `AHWPlayerController`
- [[Login Flow]] — premier travel déclenché depuis le login (phase 3)
- [[Initialization Sequence]] — le nouvel OnPossess côté serveur déclenche la cascade
- [[Persistence Flow]] — flush via `PawnLeavingGame` avant travel
- [[Technical Debt Active]] — `Server_TravelToDeadKingdom` hardcodé à migrer
- [[../08_Backend_OWS/OWSArchitecture]] — hub backend : `OWSPlayerControllerComponent::TravelToLastZoneServer`, `GetZoneServerToTravelTo`, spawn du zone server via `InstanceLauncher`
