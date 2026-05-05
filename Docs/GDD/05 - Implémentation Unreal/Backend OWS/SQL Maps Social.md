---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# SQL_Maps_Social

> Tables OWS Monde + Social : `Maps`, `WorldServers`, `MapInstances`, `CharOnMapInstance`, `AreasOfInterest`, `PlayerGroup`, `ChatGroups`, `ChatMessages`. Source : `OWS/src/.docker/{mysql,postgres,mssql}/setup.sql`.

## `Maps` — Zones/Cartes

| Colonne | Type MySQL | Type PG | Defaut | Description |
|---------|-----------|---------|--------|-------------|
| `CustomerGUID` | CHAR(36) | UUID | — | Multi-tenant |
| `MapID` | INT AUTO_INCREMENT | SERIAL | auto | PK |
| `MapName` | VARCHAR(50) | VARCHAR(50) | — | Nom du fichier UE |
| `MapData` | `LONGBLOB` | `BYTEA` | NULL | Donnees binaires |
| `Width`, `Height` | SMALLINT | SMALLINT | — | Dimensions grille tile |
| `ZoneName` | VARCHAR(50) | VARCHAR(50) | — | Nom de zone (unique par Customer) |
| `WorldCompContainsFilter` | VARCHAR(100) | idem | `''` | Filtre World Composition |
| `WorldCompListFilter` | VARCHAR(200) | idem | `''` | Liste filtres WC |
| `MapMode` | INT | INT | `1` | 1=Normal, 2=Dungeon |
| `SoftPlayerCap` | INT | INT | `60` | Capacite douce |
| `HardPlayerCap` | INT | INT | `80` | Capacite dure |
| `MinutesToShutdownAfterEmpty` | INT | INT | `1` | Delai arret si vide |

> **Perf** : pas d'index sur `Maps.ZoneName` — recommandation `CREATE INDEX IX_Maps_ZoneName ON Maps(CustomerGUID, ZoneName);`.

## `WorldServers` — Serveurs de zones

| Colonne | Type | Defaut | Description |
|---------|------|--------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | — | Multi-tenant |
| `WorldServerID` | INT AUTO_INCREMENT/SERIAL | auto | PK |
| `ServerIP` | VARCHAR(50) | — | IP publique |
| `MaxNumberOfInstances` | INT | — | Instances max |
| `ActiveStartTime` | TIMESTAMP | NULL | Non-null = actif |
| `Port` | INT | `8181` | Port de gestion |
| `ServerStatus` | SMALLINT | `0` | 0=Inactif, 1=Actif |
| `InternalServerIP` | VARCHAR(50) | `''` | IP interne |
| `StartingMapInstancePort` | INT | `7778` | Port de base des instances |
| `ZoneServerGUID` | CHAR(36)/UUID | NULL | **Ajoute v20220424** |

**Contrainte Postgres** : `AK_ZoneServers` UNIQUE (CustomerGUID, ZoneServerGUID) — v20220424.

## `MapInstances` — Instances de zones actives

| Colonne | Type | Defaut | Description |
|---------|------|--------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | — | Multi-tenant |
| `MapInstanceID` | INT AUTO_INCREMENT/SERIAL | auto | PK |
| `WorldServerID` | INT | — | FK → WorldServers |
| `MapID` | INT | — | FK → Maps |
| `Port` | INT | — | Port UDP |
| `Status` | INT | `0` | 0=Init, 1=Loading, 2=Running |
| `PlayerGroupID` | INT | NULL | FK → PlayerGroup (optionnel) |
| `NumberOfReportedPlayers` | INT | `0` | Joueurs connectes |
| `LastUpdateFromServer` | TIMESTAMP | NULL | Heartbeat |
| `LastServerEmptyDate` | TIMESTAMP | NULL | Derniere fois vide |
| `CreateDate` | TIMESTAMP | NOW() | Creation |

## `CharOnMapInstance` — Correspondance personnage ↔ instance

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `CharacterID` | INT | FK → Characters |
| `MapInstanceID` | INT | FK → MapInstances |

PK : (CharacterID, MapInstanceID, CustomerGUID).

## `AreasOfInterest` + `AreaOfInterestTypes`

`AreasOfInterest` : zones d'interet spatial.

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `AreasOfInterestGUID` | CHAR(36)/UUID | PK secondaire |
| `MapZoneID` | INT | Zone de reference |
| `AreaOfInterestName` | VARCHAR(50) | Nom |
| `Radius` | FLOAT | Rayon |
| `AreaOfInterestType` | INT | FK → AreaOfInterestTypes |
| `X`, `Y`, `Z` | FLOAT | Centre |
| `RX`, `RY`, `RZ` | FLOAT | Rotation |
| `CustomData` | TEXT | Donnees custom |

`AreaOfInterestTypes` : PK `AreaOfInterestTypeID`, `AreaOfInterestTypeDesc`. **Pas de CustomerGUID — table partagee** (comme `PlayerGroupTypes`).

## `PlayerGroupTypes` / `PlayerGroup` / `PlayerGroupCharacters`

`PlayerGroupTypes` (partagee, sans CustomerGUID) : `PlayerGroupTypeID`, `PlayerGroupTypeDesc`.

`PlayerGroup` :

| Colonne | Type | Defaut | Description |
|---------|------|--------|-------------|
| `PlayerGroupID` | INT AUTO_INCREMENT/SERIAL | auto | PK |
| `CustomerGUID` | CHAR(36)/UUID | — | Multi-tenant |
| `PlayerGroupName` | VARCHAR(50) | — | Nom du groupe |
| `PlayerGroupTypeID` | INT | — | FK |
| `ReadyState` | INT | 0 | Etat pret |
| `CreateDate` | TIMESTAMP | NULL | Creation |

`PlayerGroupCharacters` : `PlayerGroupID` + `CustomerGUID` + `CharacterID` + `DateAdded` (NOW) + `TeamNumber` (0).

## Chat — `ChatGroups`, `ChatGroupUsers`, `ChatMessages`

`ChatGroups` : `CustomerGUID` + `ChatGroupID` (AUTO_INCREMENT/SERIAL, PK) + `ChatGroupName`.

`ChatGroupUsers` : (CustomerGUID, ChatGroupID, CharacterID) — PK composite.

`ChatMessages` :

| Colonne | Type | Description |
|---------|------|-------------|
| `ChatMessageID` | INT AUTO_INCREMENT/SERIAL | PK |
| `SentByCharID` | INT | Expediteur |
| `SentToCharID` | INT | Destinataire (nullable = broadcast) |
| `ChatGroupID` | INT | Groupe (nullable = MP direct) |
| `ChatMessage` | TEXT | Contenu |
| `MessageDate` | TIMESTAMP | NOW() |

## Stored procedures Monde

### `AddOrUpdateMapZone`

MySQL : UPDATE-then-INSERT sans transaction explicite. PG : `SELECT FOR UPDATE` puis INSERT/UPDATE.

### `AddOrUpdateWorldServer` (v20220424)

Cherche par `ZoneServerGUID`, met a jour si existant. Port gestion hardcode a 8081.

> **Bug** : port 8081 hardcode meme si autre port en parametre.

### `SpinUpMapInstance(_CustomerGUID, _ZoneName, _PlayerGroupID, _Nested)`

1. Trouve `MapID` par `ZoneName`
2. Selectionne `WorldServer` le moins charge (actif, `ServerStatus=1`, `ActiveStartTime IS NOT NULL`) — ORDER BY COUNT(instances)
3. Cherche port disponible via CTE recursive entre `StartingMapInstancePort` et `StartingMapInstancePort + MaxNumberOfInstances + 10`
4. Insere dans `MapInstances` avec `Status=1` (Loading)
5. Si `_MapMode=2` (dungeon) ET `_PlayerGroupID > 0` : associe le groupe

> **BUG MySQL critique** : `CONCAT(_MaxNumberOfInstances, 10)` est une concatenation de chaines, pas addition. Pour `MaxNumberOfInstances=10` → `"1010"` au lieu de `20`. Plage de ports massivement surdimensionnee. Version PG correcte avec `$4 + 10`.

### `JoinMapByCharName(_CustomerGUID, _CharName, _ZoneName, _PlayerGroupType)`

La plus complexe.

1. `CleanUp()` en preambule
2. Resout `MapID` + `SoftPlayerCap` depuis `Maps`
3. Resout `CharacterID` + `IsInternalNetworkTestUser`
4. Resout `EnableAutoLoopBack` + `NoPortForwarding` depuis `Customers`
5. Si `_PlayerGroupType > 0` : cherche `PlayerGroupID` actif
6. Cherche instance `Status=2` (Running), `NumberOfReportedPlayers < SoftPlayerCap`, groupe correspondant — ORDER BY joueurs
7. Si instance trouvee : retourne connexion avec `NeedToStartUpMap=FALSE`
8. Sinon : appelle `SpinUpMapInstance()` et retourne avec `NeedToStartUpMap=TRUE`
9. Selection IP : publique ou interne selon `IsInternalNetworkTestUser`

> **Comportement** : `CleanUp()` synchrone a chaque JoinMap peut ralentir sous forte charge. Commentaire "Later this can get moved to a scheduler".

### `AddCharacterToMapInstanceByCharName`, `SetMapInstanceStatus`, `ShutdownMapInstance`, `ShutdownWorldServer`

- `AddCharacterToMapInstanceByCharName` : supprime anciennes entrees `CharOnMapInstance`, insere nouvelle, MAJ `Characters.MapName`
- `SetMapInstanceStatus` : MAJ `Status` + log
- `ShutdownMapInstance` : supprime `CharOnMapInstance` puis `MapInstances`
- `ShutdownWorldServer` : supprime toutes les instances du serveur + reset `WorldServers.ActiveStartTime=NULL`, `ServerStatus=0`

### `GetZoneInstancesOfZone`, `GetServerInstanceFromIPandPort`, `GetMapInstancesForWorldServerID`

`GetMapInstancesForWorldServerID` inclut `MinutesServerHasBeenEmpty`, `MinutesSinceLastUpdate` (TIMESTAMPDIFF / EXTRACT).

### `UpdateNumberOfPlayers`

MAJ `NumberOfReportedPlayers` et `LastUpdateFromServer`. Si 0 : enregistre `LastServerEmptyDate`.

### Social — `GetPlayerGroupsCharacterIsIn`

Jointure `PlayerGroupCharacters → PlayerGroup → Characters → UserSessions`. Filtre optionnel par `_PlayerGroupTypeID`.

## Donnees initiales HybeliorWorld

| MapName | ZoneName | SoftCap | HardCap | MapMode |
|---------|----------|---------|---------|---------|
| HubWorldMap | HubWorld | 60 | 80 | 1 |
| HubWorldMap | SouthGate | 60 | 80 | 1 |

DefaultCharacterValues : `Default`, HubWorld, X=1510 Y=-160 Z=100.

## Voir aussi

- [[SQL Characters]] — `CharOnMapInstance.CharacterID`, `PlayerGroupCharacters.CharacterID`, `ChatGroupUsers.CharacterID` FK vers `Characters`
- [[SQL Users]] — `JoinMapByCharName` lit `Users.LastAccess` (CleanUp) et `Customers.EnableAutoLoopBack`/`NoPortForwarding`
- [[SQL Global Data]] — `StartWorldServer` fonction MySQL/procedure PG ; `WorldSettings.StartTime` pour temps monde ; bug `CONCAT` dans `SpinUpMapInstance` MySQL
- [[Instance Launcher]] — `RegisterLauncher`/`StartInstanceLauncher` ecrivent dans `WorldServers` ; `SpinUpMapInstance` cree les entrees `MapInstances` que le launcher execute
- [[Instance Launcher Ops]] — `GetZoneInstancesForWorldServer` lit `MapInstances.LastServerEmptyDate` + `Maps.MinutesToShutdownAfterEmpty`
- [[OWS Player Controller Component]] — `AOWSGameMode::AddZone`, `GetZoneInstancesForZone`, `UpdateNumberOfPlayers` ecrivent vers ces tables ; structs `FZoneInstance`, `FAddOrUpdateZone`, `FPlayerGroup`, `FChatGroup`
- [[OWS Architecture]] — statuts MapInstance (0=off, 1=starting, 2=ready, 3=full) + flux connexion
