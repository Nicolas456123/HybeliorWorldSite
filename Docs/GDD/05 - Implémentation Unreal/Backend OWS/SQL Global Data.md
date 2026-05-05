---
tags: [implementation, ue5, ows, sql, global-data]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: ["Migration Accord"]
---

# SQL Global Data

> [!warning] DETTE TECHNIQUE — voir [[Migration Accord]]
> Les fonctions D&D `AbilityMod` et `RollDice` documentées plus bas sont du **code mort à terme** : elles présupposent le modèle d'attributs D&D (`Strength`, `Agility`, etc.) et ne s'inscrivent pas dans la refonte 8 stats brutes + 4 fondamentales. À supprimer ou neutraliser après Phase C de la migration.

> Tables diverses et support : `GlobalData`, `WorldSettings`, `OWSVersion`. Vues, fonctions scalaires, versions & migrations, differences inter-moteurs, incoherences globales. Source : `OWS/src/.docker/{mysql,postgres,mssql}/setup.sql`.

## `GlobalData` — Donnees globales cle-valeur

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `GlobalDataKey` | VARCHAR(50) | Cle |
| `GlobalDataValue` | TEXT | Valeur (JSON ou texte) |

PK : (GlobalDataKey, CustomerGUID).

## `WorldSettings`

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `WorldSettingsID` | INT AUTO_INCREMENT/SERIAL | PK |
| `StartTime` | BIGINT | Timestamp Unix debut du monde |

## `OWSVersion`

| Colonne | Type | Description |
|---------|------|-------------|
| `OWSDBVersion` | VARCHAR(10) | Ex `'20230304'` |

Table a une seule ligne. Toutes les procedures de migration mettent a jour cette valeur.

## Vues

### `vRandNumber`

```sql
-- MySQL
CREATE VIEW vRandNumber AS SELECT RAND() AS RandNumber;
-- PostgreSQL
CREATE VIEW vRandNumber AS SELECT RANDOM() AS RandNumber;
```

Utilisee par `RollDice()` pour simuler jets de des. Permet d'appeler une fonction aleatoire non-deterministe depuis des fonctions SQL.

## Fonctions scalaires

### `AbilityMod(AbilityCore INT) → INT`

Modificateur D&D standard d'un attribut.

```sql
RETURN FLOOR((AbilityCore - 10) / 2);
```

`AbilityMod(18)` = 4, `AbilityMod(10)` = 0, `AbilityMod(8)` = -1.

### `CalcXFromTile` / `CalcYFromTile` / `OffsetIntoMap`

- `CalcXFromTile(Tile, MapWidth)` : `RETURN Tile % MapWidth;`
- `CalcYFromTile(Tile, MapWidth)` : `RETURN FLOOR(Tile / MapWidth);`
- `OffsetIntoMap(X, Y, MapWidth)` : `RETURN (Y - 1) * MapWidth + X;`

### `RollDice(NumberOfDice, MaxDiceValue)`

Boucle `NumberOfDice` fois, ajoute `FLOOR(MaxDiceValue * RANDOM()) + 1` a chaque iteration. Utilise `vRandNumber`.

### `CalculateDistanceBetweenTwoTiles`

Distance Chebyshev × 5 unites. Algorithme octile.

### `StartWorldServer(_CustomerGUID, _ServerIP)` (MySQL FUNCTION uniquement)

1. Cherche le WorldServer par IP (publique ou interne)
2. Si trouve : `ActiveStartTime=NOW()`, `ServerStatus=1`
3. Si IP = `'::1'` : prend premier WorldServer disponible
4. Retourne `WorldServerID` ou -1

En PostgreSQL c'est une **procedure** (pas une fonction).

## Fonctions utilitaires

### `fSplit` — Decoupe de chaines

MySQL : PROCEDURE peuplant `tmp_fSplit` (MEMORY engine). PG : FUNCTION RETURNS TABLE via temp_table ON COMMIT DROP.

### `GetPointsOnLine` / `GetPointsOnVisionLine`

- `GetPointsOnLine(Tile1, Tile2, MapWidth)` : algorithme de Bresenham
- `GetPointsOnVisionLine(Tile1, Tile2, MapWidth)` : version 8 octants avec `FromCode` indiquant de quelle direction vient chaque tile (fog-of-war precis)

### `GetWorldStartTime`

```sql
-- MySQL
SELECT UNIX_TIMESTAMP(NOW()) - WS.StartTime AS CurrentWorldTime
-- PostgreSQL
SELECT CAST(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) AS BIGINT) - WS.StartTime AS CurrentWorldTime
```

## Historique des versions et migrations

| Version | Date | MSSQL | MySQL | PostgreSQL |
|---------|------|-------|-------|------------|
| `20210203` | Fev 2021 | Backup .bak initial | — | — |
| `20210829` | Aout 2021 | — | setup.sql initial | setup.sql initial |
| `20220424` | Avr 2022 | Migration | Migration | Migration |
| `20220613` | Juin 2022 | — | Migration | Migration |
| `20220801` | Aout 2022 | Migration | Migration | Migration |
| `20230304` | Mars 2023 | Migration | Migration | Migration |

**MSSQL** : pas de v20220613. Version base inconnue (backup `.bak` binaire).

### v20220424

MSSQL : `ALTER TABLE WorldServers ADD ZoneServerGUID uniqueidentifier NULL`
MySQL : `ALTER TABLE WorldServers ADD ZoneServerGUID CHAR(36) NULL;` + creation `AddOrUpdateWorldServer`
PG : `ALTER TABLE ... + CONSTRAINT AK_ZoneServers UNIQUE (CustomerGUID, ZoneServerGUID)` (UNIQUE ajoutee en PG uniquement)

### v20220613 (MySQL/PG uniquement)

Stored procedures `AddOrUpdateAbility`, `AddOrUpdateAbilityType`, `GetAbilityTypes`, `AddAbilityToCharacter` (PG uniquement).

### v20220801

MSSQL : `AddNewCustomer` reecrit avec transactions + `BEGIN TRY/CATCH` + `RAISERROR`.
MySQL : `AddNewCustomer` avec controle doublon.
PG : `AddNewCustomer` + ajout `JoinMapByCharName` (procedure majeure).

### v20230304

Ajout de `DefaultCharacterValues` et `DefaultCustomCharacterData` dans les 3 moteurs.

| Aspect | MSSQL | MySQL | PostgreSQL |
|--------|-------|-------|------------|
| Auto-increment | `IDENTITY(1,1)` | `AUTO_INCREMENT` | `SERIAL` |
| GUID type | `uniqueidentifier` | `CHAR(36)` | `UUID` |
| FieldValue type | `varchar(max)` | `TEXT` | `TEXT` |

## Differences MSSQL/MySQL/PostgreSQL

### Types de donnees

| Concept | MSSQL | MySQL | PostgreSQL |
|---------|-------|-------|------------|
| GUID | `uniqueidentifier` | `CHAR(36)` | `UUID` |
| Auto-increment | `IDENTITY(1,1)` | `AUTO_INCREMENT` | `SERIAL` |
| Booleen | `BIT` | `BOOLEAN` | `BOOLEAN` |
| Binaire | `varbinary(max)` | `LONGBLOB` | `BYTEA` |
| Texte long | `varchar(max)` | `TEXT` | `TEXT` |
| Timestamp courant | `GETUTCDATE()` | `NOW()` | `NOW()`/`CURRENT_TIMESTAMP` |
| GUID genere | `NEWID()` | `UUID()` | `gen_random_uuid()` |

### Stored procedures vs fonctions

| Aspect | MSSQL | MySQL | PostgreSQL |
|--------|-------|-------|------------|
| Sans retour | `CREATE PROCEDURE` | `CREATE PROCEDURE` | `CREATE PROCEDURE LANGUAGE PLPGSQL` |
| Avec retour | `CREATE FUNCTION` | `CREATE FUNCTION` | `CREATE FUNCTION RETURNS TABLE` |
| Appel | `EXEC ...` | `CALL ...` | `CALL ...` |
| Tables temp | `#TempTable` | `CREATE TEMPORARY TABLE ... ENGINE=MEMORY` | `CREATE TEMP TABLE ... ON COMMIT DROP` |
| Dernier ID | `SCOPE_IDENTITY()` | `LAST_INSERT_ID()` | `CURRVAL(PG_GET_SERIAL_SEQUENCE(...))` |
| Erreurs | `BEGIN TRY / CATCH / RAISERROR` | Pas de transaction (initial) | `RAISE ... USING ERRCODE=...` |

### Mots de passe

| Moteur | Methode | Notes |
|--------|---------|-------|
| MSSQL | Non documente | Probablement BCrypt C# |
| MySQL | `ENCRYPT(_Password, Salt)` avec `MD5(RAND())[-10:]` | **Deprecie MySQL 8** |
| PostgreSQL | `crypt(_Password, gen_salt('md5'))` via `pgcrypto` | MD5 — faible, devrait etre `bcrypt` |

### Ordre PK composite

Inversion systematique entre MySQL et PG :

| Table | MySQL PK | PG PK |
|-------|----------|-------|
| Characters | (CharacterID, CustomerGUID) | (CustomerGUID, CharacterID) |
| Class | (ClassID, CustomerGUID) | (CustomerGUID, ClassID) |
| Maps | (MapID, CustomerGUID) | (CustomerGUID, MapID) |
| Items | (ItemID, CustomerGUID) | (CustomerGUID, ItemID) |
| Abilities | (AbilityID, CustomerGUID) | (CustomerGUID, AbilityID) |

## Incoherences et bugs critiques

1. **JSON invalide** : `Initialize - {MySQL,Postgres}.sql` : `BagInventory` = `'{   "items":  }'` au lieu de `'{   "items": [] }'`.
2. **CONCAT dans SpinUpMapInstance MySQL** : concatenation de chaines au lieu d'addition → plage de ports surdimensionnee.
3. **Notice debug en prod (PG)** : `raise notice '_ClassID: %', _ClassID;` dans `AddCharacter`.
4. **MySQL 8 ENCRYPT()** : supprime, authentification cassee.
5. **Port 8081 hardcode** dans `AddOrUpdateWorldServer` (MySQL v20220424).
6. **Z += 1** dans `UpdatePositionOfCharacterByName` : comportement silencieux.
7. **CustomerGUID vide** dans `Initialize.sql` (MSSQL) : `DECLARE @CustomerGUID uniqueidentifier = ''` = GUID nul.
8. **Pas de transaction** dans `AddNewCustomer` MySQL : donnees orphelines possibles.
9. **Suppression inter-tenant** possible dans `RemoveCharacter` MySQL (`CharHasItems` sans CustomerGUID).
10. **Migration MSSQL v20220613 absente** : procedures Abilities a creer manuellement.
11. **Salt PG absent** : migration inter-moteurs impossible pour mots de passe.

## Voir aussi

- [[Global Data Service]] — microservice OWSGlobalData qui lit/ecrit la table `GlobalData` via Dapper + `IMemoryCache`
- [[Global Data Replication]] — replication cache multi-instance + console OWSManagement
- [[SQL Users]] — `AddNewCustomer` insere dans `WorldSettings` et initialise `OWSVersion` ; bug `CustomerGUID = ''` dans Initialize.sql
- [[SQL Characters]] — fonctions scalaires `AbilityMod`, `RollDice` appliquees aux stats de `Characters`
- [[SQL Maps Social]] — `StartWorldServer` active `WorldServers` ; `GetWorldStartTime` lit `WorldSettings.StartTime`
- [[SQL Abilities]] — migration v20220613 (procedures Abilities) tracee dans `OWSVersion`
- [[SQL Inventory]] — bug JSON `BagInventory` dans `Initialize - {MySQL,Postgres}.sql`
- [[OWS Player Controller Component]] — struct `FGlobalDataItem` serialisee par `UOWSAPISubsystem::GetGlobalDataItem`
- [[OWS Architecture]] — `GlobalData` cle-valeur expose dans `/api/GlobalData/*`
