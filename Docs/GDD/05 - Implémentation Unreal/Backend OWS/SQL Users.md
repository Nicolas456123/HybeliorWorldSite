---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# SQL_Users

> Tables OWS — Utilisateurs, sessions, clients (Customers), file d'attente. Source : `OWS/src/.docker/{mysql,postgres,mssql}/setup.sql`.

## Vue d'ensemble

OWS est un backend MMO multi-tenant. Chaque **Customer** (developpeur de jeu) est identifie par un `CustomerGUID` unique qui prefixe toutes les tables. Les tables ci-dessous forment la couche d'authentification.

### Moteurs supportes

| Moteur | Version initiale | Encodage | Particularites |
|--------|-----------------|----------|----------------|
| **MySQL** | 20210829 | `utf8mb4_unicode_ci` | `CHAR(36)` pour les GUIDs, `DELIMITER //` |
| **PostgreSQL** | 20210829 | UTF-8 | `UUID` natif, `pgcrypto` requis, `SERIAL` |
| **MSSQL** | 20210203 | — | Restauration depuis backup `.bak`, `uniqueidentifier` |

## `DebugLog` — Journal de debogage

| Colonne | Type MySQL | Type PG | Nullable | Description |
|---------|-----------|---------|----------|-------------|
| `DebugLogID` | `INT AUTO_INCREMENT` | `SERIAL` | NO | PK |
| `DebugDate` | `TIMESTAMP` | `TIMESTAMP` | YES | Horodatage |
| `DebugDesc` | `TEXT` | `TEXT` | YES | Message |
| `CustomerGUID` | `CHAR(36)` | `UUID` | YES | Proprietaire (non FK) |

PK : `PK_DebugLog` (DebugLogID). `CustomerGUID` nullable et sans FK (intentionnel pour erreurs avant resolution du GUID).

## `Customers` — Clients/Developpeurs

Table racine multi-tenant.

| Colonne | Type MySQL | Type PG | Nullable | Defaut | Description |
|---------|-----------|---------|----------|--------|-------------|
| `CustomerGUID` | `CHAR(36)` | `UUID` | NO | `gen_random_uuid()` (PG) | **PK** |
| `CustomerName` | `VARCHAR(50)` | `VARCHAR(50)` | NO | — | Nom |
| `CustomerEmail` | `VARCHAR(255)` | `VARCHAR(255)` | NO | — | Email |
| `CustomerPhone` | `VARCHAR(20)` | `VARCHAR(20)` | YES | — | Tel |
| `CustomerNotes` | `TEXT` | `TEXT` | YES | — | Notes |
| `EnableDebugLogging` | `BOOLEAN` | `BOOLEAN` | NO | `FALSE` | Logs SQL |
| `EnableAutoLoopBack` | `BOOLEAN` | `BOOLEAN` | NO | `TRUE` | Loopback auto |
| `DeveloperPaid` | `BOOLEAN` | `BOOLEAN` | NO | `FALSE` | Paiement dev |
| `PublisherPaidDate` | `TIMESTAMP` | `TIMESTAMP` | YES | — | Paiement editeur |
| `StripeCustomerID` | `VARCHAR(50)` | `VARCHAR(50)` | NO | `''` | ID Stripe |
| `FreeTrialStarted` | `TIMESTAMP` | `TIMESTAMP` | YES | — | Debut essai |
| `SupportUnicode` | `BOOLEAN` | `BOOLEAN` | NO | `FALSE` | Noms unicode |
| `CreateDate` | `TIMESTAMP` | `TIMESTAMP` | NO | `NOW()` | Creation |
| `NoPortForwarding` | `BOOLEAN` | `BOOLEAN` | NO | `FALSE` | Pas de port forwarding |

PK : `PK_Customers` (CustomerGUID).

## `Users` — Utilisateurs/Joueurs

Comptes associes a un Customer.

| Colonne | Type MySQL | Type PG | Nullable | Description |
|---------|-----------|---------|----------|-------------|
| `UserGUID` | `CHAR(36)` | `UUID gen_random_uuid()` | NO | **PK** |
| `CustomerGUID` | `CHAR(36)` | `UUID` | NO | FK → Customers |
| `FirstName`, `LastName` | `VARCHAR(50)` | `VARCHAR(50)` | NO | — |
| `Email` | `VARCHAR(255)` | `VARCHAR(255)` | NO | Unique par Customer+Role |
| `PasswordHash` | `VARCHAR(128)` | `VARCHAR(128)` | NO | Hash |
| `Salt` | `VARCHAR(50)` | **absent** | NO | Sel (MySQL uniquement) |
| `CreateDate` | `TIMESTAMP` | `TIMESTAMP` | NO | `NOW()` |
| `LastAccess` | `TIMESTAMP` | `TIMESTAMP` | NO | `NOW()` |
| `Role` | `VARCHAR(10)` | `VARCHAR(10)` | NO | `'Player'`, `'Developer'` |

**Contraintes** : `PK_Users` (UserGUID) ; `AK_User` UNIQUE (CustomerGUID, Email, Role).

> **Difference MSSQL/PG** : PostgreSQL n'a pas la colonne `Salt` — hash produit par `crypt(_Password, gen_salt('md5'))` via `pgcrypto`. MySQL utilise `ENCRYPT(_Password, Salt)` avec sel `MD5(RAND())[-10:]`.

## `UserSessions` — Sessions utilisateurs

| Colonne | Type MySQL | Type PG | Nullable | Description |
|---------|-----------|---------|----------|-------------|
| `CustomerGUID` | `CHAR(36)` | `UUID` | NO | FK → Customers |
| `UserSessionGUID` | `CHAR(36)` | `UUID gen_random_uuid()` | NO | Token |
| `UserGUID` | `CHAR(36)` | `UUID` | NO | FK → Users |
| `LoginDate` | `TIMESTAMP` | `TIMESTAMP` | NO | Connexion |
| `SelectedCharacterName` | `VARCHAR(50)` | `VARCHAR(50)` | YES | Perso selectionne |

**Contraintes** : `PK_UserSessions` (UserSessionGUID, CustomerGUID) ; `FK_UserSessions_UserGUID`.

## `UsersInQueue` — File d'attente matchmaking

| Colonne | Type | Defaut | Description |
|---------|------|--------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | — | Multi-tenant |
| `UserGUID` | CHAR(36)/UUID | — | FK → Users |
| `QueueName` | VARCHAR(20) | — | Nom file |
| `JoinDT` | TIMESTAMP | — | Entree |
| `MatchMakingScore` | INT | 0 | Score |

PK : (UserGUID, QueueName, CustomerGUID).

## Stored procedures cles

### `AddUser(_CustomerGUID, _FirstName, _LastName, _Email, _Password, _Role)`

**MySQL** : retourne le `_UserGUID` (CHAR(36)). Salt = `SUBSTRING(MD5(RAND()), -10)`. Hash = `ENCRYPT(_Password, _Salt)` — **deprecie en MySQL 8+**. GUID = `UUID()`.

**PostgreSQL** : retourne TABLE(UserGUID UUID) via `RETURN QUERY`. Hash = `crypt(_Password, gen_salt('md5'))` via `pgcrypto`. GUID = `gen_random_uuid()`. Pas de colonne `Salt`.

### `AddNewCustomer`

Parametres : `_CustomerName`, `_FirstName`, `_LastName`, `_Email`, `_Password` (+ `_CustomerGUID` optionnel en MSSQL/MySQL v20220801).

Logique : genere/utilise `CustomerGUID`, verifie non-existence, insere `Customers` + `WorldSettings`, cree utilisateur (via `AddUser`), cree 5 maps demo, cree classe `MaleWarrior`, cree perso `Test`, cree inventaire `Bag` 16 slots.

**MSSQL v20220801** : `RAISERROR` + `BEGIN TRY/CATCH` + `BEGIN TRANSACTION`.
**MySQL** : pas de transaction (risque donnees partielles).
**PostgreSQL** : `RAISE 'Duplicate Customer GUID' USING ERRCODE = 'unique_violation'`.

### `PlayerLoginAndCreateSession(_CustomerGUID, _Email, _Password, _DontCheckPassword)`

1. Compare `ENCRYPT(_Password, Salt) = PasswordHash` (MySQL) ou `crypt()` (PG)
2. Si authentifie : supprime anciennes sessions, cree nouvelle `UserSession`
3. Retourne `(Authenticated, UserSessionGUID)`

### `CleanUp(_CustomerGUID)`

Supprime `CharOnMapInstance` pour `Users.LastAccess < NOW() - 1min`. Supprime `CharOnMapInstance` et `MapInstances` pour instances sans heartbeat depuis 2 minutes.

MySQL : `DATE_SUB(NOW(), INTERVAL 1 MINUTE)`. PG : `CURRENT_TIMESTAMP - (1 || ' minutes')::INTERVAL`.

### `GetUser` / `GetUserSession` / `UserSessionSetSelectedCharacter` / `PlayerLogOut`

`GetUserSession` retourne jointure riche : session + user + perso selectionne. `UserSessionSetSelectedCharacter` met a jour `UserSessions.SelectedCharacterName`. `PlayerLogOut` supprime les entrees `CharOnMapInstance` (la ligne `PlayerGroupCharacters` est commentee — deconnexion ne quitte pas le groupe).

## Incoherences notables

- **Mot de passe MySQL** : `ENCRYPT()` supprime depuis MySQL 8.0 → migrer vers `AES_ENCRYPT()` ou BCrypt cote app.
- **Salt absent en PG** : migration inter-moteurs impossible directement.
- **MSSQL v20220613 manquant** : pas de script de migration pour les procedures Abilities.

## Voir aussi

- [[SQL Characters]] — `Characters.UserGUID` FK vers `Users` ; `AddNewCustomer` cree un user + un perso `Test`
- [[SQL Maps Social]] — `CleanUp()` supprime `CharOnMapInstance` sur `Users.LastAccess` > 1 min ; `AddNewCustomer` cree 5 maps demo
- [[SQL Inventory]] — `AddNewCustomer` cree inventaire `Bag` 16 slots a la creation du Customer
- [[SQL Global Data]] — `AddNewCustomer` insere aussi dans `WorldSettings` ; `OWSVersion` track les migrations
- [[OWS Architecture]] — flux `LoginAndCreateSession` → `UserSessionGuid` (procedure `PlayerLoginAndCreateSession`)
- [[OWS Player Controller Component]] — `UOWSGameInstance::UserSessionGUID` stocke le token retourne par la procedure
- [[Login OAuth]] — auth externe contourne `PlayerLoginAndCreateSession`, reutilise table `UserSessions`
- [[Global Data Service]] — partage le `CustomerGUID` (cle d'identification multi-tenant)
