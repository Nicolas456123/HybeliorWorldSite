---
tags: [implementation, ue5, ows, plugin, controller]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# OWS Player Controller Component

> Composant principal du plugin OWS coté client : interface API entre UE5 et le backend OWS2.
> Source : `Plugins/OWSPlugin/Source/` — extrait V3.3 de `OWSPluginDetail.md`.

Plugin tiers OWSPlugin (Sabre Dart Studios v5.4) — pont entre le client UE5 et le backend OWS2.

## Informations du plugin

Fichier : `OWSPlugin.uplugin`

```json
{
  "FriendlyName": "OWSPlugin",
  "Description": "Open World Server",
  "CreatedBy": "Sabre Dart Studios",
  "CreatedByURL": "https://www.openworldserver.com",
  "EngineVersion": "5.4.0",
  "Version": 5,
  "VersionName": "5.4"
}
```

Dépendances activées : `GameplayAbilities`, `ReplicationGraph`.

## FOWSPluginModule

Fichier : `OWSPlugin.h / OWSPlugin.cpp`. Classe module standard `IModuleInterface`. Déclare `DECLARE_LOG_CATEGORY_EXTERN(OWS, Log, All);`.

**Macros de canaux de collision** : `COLLISION_PROJECTILE` (GameTraceChannel1), `COLLISION_TRACE_WEAPON` (GameTraceChannel2), `COLLISION_PROJECTILE_SHOOTABLE` (GameTraceChannel3), `COLLISION_TELEPORTING_OBJECT` (GameTraceChannel4), `COLLISION_PAWNOVERLAP` (GameTraceChannel5), `COLLISION_TRACE_WEAPONNOCHARACTER` (GameTraceChannel6).

## UOWSGameInstance

Base : `UGameInstance`. Fournit cycle de vie (écran de chargement), chargement d'assets depuis des chemins, chiffrement AES.

**Propriétés** : `Http` (FHttpModule*), `UserSessionGUID` (FString BP), `LocalMeshItemsMap` (TMap local).

**Méthodes cycle de vie** : `Init()`, `BeginLoadingScreen(MapName)`, `EndLoadingScreen(world)`, `HideLoadingScreen`. Évènements BP implémentables : `RPGBeginLoadingScreen`, `RPGEndLoadingScreen`, `HideLoadingDialog`.

**Chargement d'assets** : `LoadWeaponActorClassFromPath`, `LoadStaticMeshFromPath`, `LoadSkeletalMeshFromPath`, `LoadSkeletonFromPath`, `LoadMaterialInstanceFromPath`, `FindClass`, `FindGameplayAbilityClass`, `LoadGameplayAbilityClass`.

**Chiffrement AES** : `EncryptWithAES(FString, FString Key)` chiffre avec AES-128, clé hashée MD5, marqueur `OWS#@!` append avant chiffrement. `DecryptWithAES` fait l'inverse (split sur le marqueur).

## UOWSPlayerControllerComponent

Base : `UActorComponent` — `BlueprintSpawnableComponent`. Centralise les opérations API OWS côté client, avec retry + backoff et suivi perf.

**Propriétés de config** (depuis `DefaultGame.ini`) : `OWSAPICustomerKey`, `OWS2APIPath`, `OWS2InstanceManagementAPIPath`, `OWS2CharacterPersistenceAPIPath`, `OWSEncryptionKey`, `TravelTimeout` (60s), `MaxRetryCount` (3).

### Voyage entre zones
- `TravelToMap(URL, SeamlessTravel)`
- `TravelToMap2(ServerAndPort, X,Y,Z, RX,RY,RZ, PlayerName, SeamlessTravel)` — coordonnées chiffrées AES dans `?ID=`
- `SetSelectedCharacterAndConnectToLastZone(SessionGUID, CharName)`
- `GetZoneServerToTravelTo(CharName, Scheme, WorldServerID, ZoneName)`

### Personnages
`GetAllCharacters`, `GetCharacterStats`, `GetCharacterDataAndCustomData`, `UpdateCharacterStats`, `GetCustomCharacterData`, `AddOrUpdateCustomCharacterData`, `CreateCharacter`, `CreateCharacterUsingDefaultCharacterValues`, `RemoveCharacter`, `PlayerLogout`. Chaque méthode expose un délégate `OnNotify...Delegate` (succès) et `OnError...Delegate` (erreur).

### Capacités (GAS)
`GetCharacterAbilities`, `AddAbilityToCharacter(CharName, AbilityName, Level, CustomJSON)`, `UpdateAbilityOnCharacter`, `RemoveAbilityFromCharacter`, `GetAbilityBars`.

### Groupes et instances
`GetPlayerGroupsCharacterIsIn(SessionGUID, CharName, GroupTypeID)`, `LaunchZoneInstance(CharName, ZoneName, GroupType)`, `GetChatGroupsForPlayer()`.

### Sauvegarde
`SavePlayerLocation()`, `SaveAllPlayerData()`.

### Méthodes protégées internes

| Méthode | Description |
|---|---|
| `ProcessOWS2POSTRequest(Module, API, Params, Callback)` | Construit et envoie POST avec header `X-CustomerGUID`. Enregistre timestamp départ. |
| `ProcessAPIResponse(...)` | Valide connexion, JSON, champ `ErrorMessage` absent |
| `GetJsonObjectFromResponse(...)` | Désérialise en `TSharedPtr<FJsonObject>` |
| `GetStructFromJsonObject<T>(...)` | Template via `FJsonObjectConverter` |
| `GetOWSPlayerState()` | Cast `AOWSPlayerState` depuis owner |
| `IsRetryableFailure(Request, Response, bSuccess)` | true si échec connexion, timeout, ou HTTP 5xx |
| `RetryFailedRequest(RetryRequest)` | Rejoue la requête avec le même callback |
| `LogRequestDuration(Request)` | Log en ms via `UE_LOG(OWS, Log, ...)` |

### Structure FPendingRetryRequest

```cpp
struct FPendingRetryRequest {
    FString ApiModuleToCall;
    FString ApiToCall;
    FString PostParameters;
    int32   RetryCount;
    float   NextRetryTime;
    void (UOWSPlayerControllerComponent::* Callback)(...);
};
```

## Voir aussi

- [[OWS Login Subsystem]] — UOWSAPISubsystem (singleton GameInstance) et structs auth/login
- [[OWS Network Replication]] — architecture HTTP, retry/perf, AOWSGameMode/PlayerState, structs OWS2API
- [[OWS Architecture]] — vue d'ensemble microservices
- [[Player Controllers]]
- [[Login Flow]]
