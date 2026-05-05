---
tags: [implementation, ue5, ows, login, subsystem]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# OWS Login Subsystem

> Singleton OWS attaché à la `GameInstance` : gère donnée globale (clé/valeur), création de personnage par défaut, et déconnexion.
> Source : `Plugins/OWSPlugin/Source/` — extrait V3.3 de `OWSPluginDetail.md`.

## UOWSAPISubsystem

Base : `UGameInstanceSubsystem`. Singleton créé avec la `GameInstance`. Gère données globales (clé/valeur), création via valeurs par défaut, déconnexion.

**Config** (lue dans `Initialize(FSubsystemCollectionBase&)`) : `OWSAPICustomerKey`, `OWS2APIPath`, `OWS2InstanceManagementAPIPath`, `OWS2CharacterPersistenceAPIPath`, `OWS2GlobalDataAPIPath`, `OWS2APIRequestTimeout` (30s).

### API GlobalData
- `GetGlobalDataItem(Key)` — `GET api/GlobalData/GetGlobalDataItem/{Key}`
- `AddOrUpdateGlobalDataItem(Key, Value)` — `POST api/GlobalData/AddOrUpdateGlobalDataItem`

### API Users
- `CreateCharacterUsingDefaultCharacterValues(SessionGUID, CharName, DefaultSetName)`
- `Logout(SessionGUID)`

### Modules supportés

| Valeur `ApiModuleToCall` | Variable config | Microservice |
|---|---|---|
| `PublicAPI` | `OWS2APIPath` | Utilisateurs, personnages |
| `InstanceManagementAPI` | `OWS2InstanceManagementAPIPath` | Instances |
| `CharacterPersistenceAPI` | `OWS2CharacterPersistenceAPIPath` | Persistance |
| `GlobalDataAPI` | `OWS2GlobalDataAPIPath` | Clé/valeur global |

## Structs identité / authentification

Depuis `OWS2API.h` :

- `FLoginAndCreateSessionJSONPost` (Email, Password)
- `FLoginAndCreateSession` (Authenticated, ErrorMessage, UserSessionGUID)
- `FRegisterJSONPost`
- `FSuccessAndErrorMessage`
- `FSetSelectedCharacterAndConnectToLastZoneJSONPost`
- `FTravelToLastZoneServerJSONPost`

## Voir aussi

- [[OWS Player Controller Component]] — composant client utilisant ces APIs
- [[OWS Network Replication]] — architecture HTTP et structs OWS2API
- [[Login Flow]]
- [[Login Epic]] / [[Login OAuth]] / [[Login Xsolla Stub]]
- [[SQL Users]] — table `UserSessions` → `UserSessionGUID`
