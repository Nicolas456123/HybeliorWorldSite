---
tags: [implementation, ue5, ows, network, replication, http]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: ["Migration Accord"]
---

# OWS Network Replication

> Architecture HTTP du plugin OWS, mécanisme retry/perf, GameMode/PlayerState serveur dédié, et structs OWS2API utilisées en (dé)sérialisation.
> Source : `Plugins/OWSPlugin/Source/` — extrait V3.3 de `OWSPluginDetail.md`.

## AOWSGameMode

Base : `AGameMode`. Mode de jeu serveur dédié. Gère présence joueurs, instances, sauvegardes, temps monde.

**Propriétés** : `CharactersOnline`, `IAmZoneName`, `ZoneInstanceID`, `GetCharactersOnlineIntervalInSeconds` (10s), `UpdateServerStatusEveryXSeconds` (10s), `SaveIntervalInSeconds`, `SplitSaveIntoHowManyGroups`, `DayLengthInSeconds`, `DaysPerLunarCycle`, `DaysPerSolarCycle`.

**Méthodes** :
- Zones / serveurs : `GetZoneInstancesForZone`, `GetZoneInstanceFromZoneInstanceID`, `UpdateNumberOfPlayers`, `AddZone(Name, MapName, SoftCap, HardCap, Mode)`, `GetAddressURLAndPort`, `GetCurrentWorldTime`
- Personnages : `GetAllCharactersOnline`, `IsPlayerOnline`, `SaveAllPlayerLocations`
- GlobalData : `GetGlobalDataItem`, `AddOrUpdateGlobalDataItem`

## AOWSPlayerState

Base : `APlayerState`. Stocke données OWS : position de spawn, GUID de session, ID de groupe.

**Propriétés** : `PlayerStartLocation` (FVector BP), `PlayerStartRotation` (FRotator BP), `DefaultPawnClass` (FString BP), `UserSessionGUID` (FString BP), `AlwaysRelevantPartyID` (int32 BP).

## Architecture HTTP

Toutes les requêtes suivent :
```
Header X-CustomerGUID: <OWSAPICustomerKey>
Content-Type: application/json
User-Agent: X-UnrealEngine-Agent
```

**Flux requête typique** : struct → JSON via `FJsonObjectConverter::UStructToJsonObjectString` → `ProcessOWS2POSTRequest` → callback `On[Action]ResponseReceived` → `GetJsonObjectFromResponse` / `ProcessAPIResponse` → `GetStructFromJsonObject<T>` → délégate `OnNotify...` ou retry puis `OnError...`.

## Système de retry et suivi des performances

**Retry avec backoff** : `MaxRetryCount` = 3 par défaut, retry si `bWasSuccessful == false` ou HTTP 500-599. Les 4xx ne sont pas retentés.

**Suivi perf** : `RequestStartTimes : TMap<FString, double>` indexée par URL. `LogRequestDuration` log `[OWS] API Request <url> completed in <N> ms`.

## OWS2API — Structures principales

Fichier : `OWS2API.h`. Ensemble des USTRUCT sérialisés/désérialisés vers/depuis les microservices.

### FUserCharacter (BlueprintType) — structure principale du personnage

> [!warning] DETTE TECHNIQUE — voir [[Migration Accord]]
> Cette struct expose toujours `Level`, `XP`, et 10 attributs D&D classiques (`Strength`, `Agility`, `Constitution`, `Dexterity`, `Intellect`, `Wisdom`, `Charisma`, `Fortitude`, `Reflex`, `Willpower`). Conceptuellement, ces champs deviennent **techniques internes** (matchmaking, diff de patch). Ils ne sont plus exposés au joueur en HUD. La progression visible est portée par `CurrentEraAccord` + `ConcordedErasCount` (à ajouter en parallèle, pas de breaking change OWS).

- Identité : CharacterName, ClassName, Level, Gender, ZoneName, Description, BaseMesh, ClassId, LastActivity, CreateDate
- Progression : XP, Score, Fame, Alignment
- Monnaie : Gold, Silver, Copper, FreeCurrency, PremiumCurrency
- Ressources : Max/Current/RegenRate de Health, Mana, Stamina, Energy
- Attributs de base : Strength, Agility, Constitution, Dexterity, Intellect, Wisdom, Charisma, Fortitude, Reflex, Willpower
- Combat offensif : BaseAttack, BaseAttackBonus, AttackPower, AttackSpeed, CritChance (0.0-1.0), CritMultiplier (1.0), Haste, SpellPower, SpellPenetration, Initiative, Speed
- Combat défensif : Defense, Dodge, Parry, Avoidance, Versatility, NaturalArmor, PhysicalArmor, BonusArmor, ForceArmor, MagicArmor, Resistance

### FCreateCharacter
Inclut en plus Success, ErrorMessage, StartingMapName, XYZ/RxRyRz, TeamNumber, Size, Weight.

### Données custom
- `FCustomCharacterDataStruct` (pair Name/Value)
- `FCustomCharacterData` (ajoute CharacterName)

### Capacités
- `FAbility` (AbilityID, AbilityName, AbilityTypeID, GameplayAbilityClassName, CharHasAbilitiesID, AbilityLevel, CharHasAbilitiesCustomJSON, AbilityCustomJSON, Class, Race, TextureToUseForIcon, AbilityInSlotNumber)
- `FAbilityBar` (CharAbilityBarID, AbilityBarName, CharacterID, MaxNumberOfSlots, NumberOfUnlockedSlots, CharAbilityBarsCustomJSON)
- `FAbilityBarWithAbilities`
- `FAddAbilityToCharacterJSONPost`, `FUpdateAbilityOnCharacterJSONPost`, `FRemoveAbilityFromCharacterJSONPost`

### Zones
`FZoneInstance`, `FAddOrUpdateZone`, `FGetServerInstanceFromPort`.

### Groupes
`FPlayerGroup`, `FLaunchZoneInstance`.

### Chat
`FChatGroup`.

### Serveur
`FUpdateAllPlayerPositionsJSONPost`, `FUpdateNumberOfPlayersJSONPost`, `FCharacterNameJSONPost`.

## Configuration requise — DefaultGame.ini

```ini
[/Script/EngineSettings.GeneralProjectSettings]
OWSAPICustomerKey=F9B16963-DC44-4E9C-9635-257FA18D4D41
OWS2APIPath=https://<votre-serveur>/PublicAPI/
OWS2InstanceManagementAPIPath=https://<votre-serveur>/InstanceManagementAPI/
OWS2CharacterPersistenceAPIPath=https://<votre-serveur>/CharacterPersistenceAPI/
OWS2GlobalDataAPIPath=https://<votre-serveur>/GlobalDataAPI/
OWS2APIRequestTimeout=30.0
OWSEncryptionKey=<cle-aes-128>
```

Lues via `GConfig->GetString` / `GConfig->GetFloat` dans `UOWSPlayerControllerComponent()`, `UOWSAPISubsystem::Initialize()`, et implicitement dans `AOWSGameMode`.

## Voir aussi

- [[OWS Player Controller Component]] — utilisateur principal du flux HTTP retry
- [[OWS Login Subsystem]] — singleton GlobalData
- [[OWS Architecture]] — vue d'ensemble microservices
- [[Migration Accord]] — stratégie XP/Level → Accord
- [[Global Data Service]] / [[Global Data Replication]] — flux cache/réplication
- [[Instance Launcher]] / [[Instance Launcher Ops]] — RabbitMQ et CustomerGUID
- [[SQL Characters]] / [[SQL Abilities]] / [[SQL Maps Social]] / [[SQL Users]]
