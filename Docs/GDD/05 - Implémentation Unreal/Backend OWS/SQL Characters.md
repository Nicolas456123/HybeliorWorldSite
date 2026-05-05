---
tags: [implementation, ue5, ows, sql, characters]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [migration-accord-phase-A]
implements: [L'Accord]
---

# SQL Characters

> [!warning] DETTE TECHNIQUE — voir [[Migration Accord]]
> La table `Characters` documentée ci-dessous expose toujours `CharacterLevel`, `XP`, et 10 attributs D&D classiques (`Strength`, `Agility`, `Constitution`, etc.). Ces colonnes restent en place techniquement pour ne pas casser OWS, mais conceptuellement la progression est **désormais portée par `CurrentEraAccord` + `ConcordedErasCount`** (à ajouter en parallèle). `CharacterLevel` et `XP` deviennent techniques internes (matchmaking, scaling serveur), plus exposés au joueur en HUD.

> Tables OWS Personnages : table centrale `Characters` (80+ colonnes), `Class` (modeles), `CustomCharacterData`, `DefaultCharacterValues`, `Races`. Source : `OWS/src/.docker/{mysql,postgres,mssql}/setup.sql`.

## `Characters` — Personnages joueurs

La table centrale, contient l'integralite des statistiques du personnage.

| Colonne | Type | Defaut | Description |
|---------|------|--------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | — | FK → Customers |
| `CharacterID` | INT AUTO_INCREMENT / SERIAL | auto | **PK** (composite avec CustomerGUID) |
| `UserGUID` | CHAR(36)/UUID | — | FK → Users (nullable) |
| `Email` | VARCHAR(256) | — | Duplique depuis Users |
| `CharName` | VARCHAR(50) | — | Unique par Customer |
| `MapName` | VARCHAR(50) | — | Zone courante |
| `X`, `Y`, `Z` | FLOAT | — | Position monde |
| `RX`, `RY`, `RZ` | FLOAT | 0 | Rotation |
| `ServerIP` | VARCHAR(50) | — | IP serveur de zone actif |
| `LastActivity` | TIMESTAMP | NOW() | Derniere activite |
| `CreateDate` | TIMESTAMP | NOW() | Creation |
| **Survie** | | | |
| `Spirit`, `Magic` | FLOAT | 0 | Stats esoteriques |
| `Thirst`, `Hunger` | FLOAT | 0 | Survie |
| `Wounds` | FLOAT | 0 | Blessures |
| **Ressources** | | | |
| `MaxHealth`, `Health`, `HealthRegenRate` | FLOAT | 0 | Sante |
| `MaxMana`, `Mana`, `ManaRegenRate` | FLOAT | 0 | Mana |
| `MaxEnergy`, `Energy`, `EnergyRegenRate` | FLOAT | 0 | Energie |
| `MaxFatigue`, `Fatigue`, `FatigueRegenRate` | FLOAT | 0 | Fatigue |
| `MaxStamina`, `Stamina`, `StaminaRegenRate` | FLOAT | 0 | Endurance courte |
| `MaxEndurance`, `Endurance`, `EnduranceRegenRate` | FLOAT | 0 | Endurance longue |
| **Attributs primaires** | | | |
| `Strength`, `Dexterity`, `Constitution` | FLOAT | 0 | Physique |
| `Intellect`, `Wisdom`, `Charisma` | FLOAT | 0 | Mental/Social |
| `Agility`, `Fortitude`, `Reflex`, `Willpower` | FLOAT | 0 | Secondaires |
| **Combat** | | | |
| `BaseAttack`, `BaseAttackBonus` | FLOAT | 0 | Attaque de base |
| `AttackPower`, `AttackSpeed` | FLOAT | 0 | Puissance/vitesse |
| `CritChance`, `CritMultiplier` | FLOAT | 0 | Critique |
| `Haste` | FLOAT | 0 | Hate |
| `SpellPower`, `SpellPenetration` | FLOAT | 0 | Magie offensive |
| `Defense`, `Dodge`, `Parry`, `Avoidance` | FLOAT | 0 | Defense |
| `Versatility`, `Multishot`, `Initiative` | FLOAT | 0 | Divers |
| **Armure** | | | |
| `NaturalArmor`, `PhysicalArmor`, `BonusArmor` | FLOAT | 0 | Physiques |
| `ForceArmor`, `MagicArmor`, `Resistance` | FLOAT | 0 | Magiques |
| **Mobilite** | | | |
| `ReloadSpeed`, `Range`, `Speed` | FLOAT | 0 | Vitesse/portee |
| **Monnaies** | | | |
| `Gold`, `Silver`, `Copper` | INT | 0 | Monnaie de jeu |
| `FreeCurrency`, `PremiumCurrency` | INT | 0 | Monnaie virtuelle |
| **Divers** | | | |
| `Fame`, `Alignment` | FLOAT | 0 | Reputation |
| `TeamNumber` | INT | 0 | Equipe PvP |
| `CharacterLevel` | SMALLINT | 0 | Niveau |
| `Gender` | SMALLINT | 0 | 0=male, 1=female |
| `XP` | INT | 0 | Experience |
| `HitDie` | SMALLINT | 0 | De de vie |
| `Score` | INT | 0 | Score |
| `Size` | SMALLINT | 0 | Taille |
| `Weight` | FLOAT | 0 | Poids |
| `Perception`, `Acrobatics`, `Climb`, `Stealth` | FLOAT | — | Competences |
| `Description` | TEXT | — | Description |
| `DefaultPawnClassPath` | VARCHAR(200) | `''` | Classe Pawn UE |
| `IsInternalNetworkTestUser` | BOOLEAN | FALSE | Test interne |
| `ClassID` | INT | — | FK → Class |
| `BaseMesh` | VARCHAR(100) | — | Mesh de base |
| `IsAdmin`, `IsModerator` | BOOLEAN | FALSE | Droits admin |

**Contraintes MySQL** : `PK_Chars` (CharacterID, CustomerGUID) ; FK UserGUID.
**Contraintes PG** : `PK_Chars` (CustomerGUID, CharacterID) — **ordre inverse**.

> 80+ colonnes : schema plat volontaire (optimisation lectures MMO, pas de normalisation des stats).

## `Class` — Classes de personnages (modeles)

Meme structure que `Characters` mais sans les champs de session (`ServerIP`, `LastActivity`, `UserGUID`, `Email`, `IsAdmin`, `IsInternalNetworkTestUser`, `DefaultPawnClassPath`, `BaseMesh`, `CreateDate`). Template pour la creation de perso.

Colonnes notables : `ClassID` (AUTO_INCREMENT/SERIAL), `ClassName` (ex `'MaleWarrior'`), `StartingMapName`, `X`/`Y`/`Z` spawn initial, toutes les stats.

PK : (ClassID, CustomerGUID) MySQL ; (CustomerGUID, ClassID) PG.

## `CustomCharacterData` — Donnees custom JSON

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `CustomCharacterDataID` | INT AUTO_INCREMENT/SERIAL | PK |
| `CharacterID` | INT | FK → Characters |
| `CustomFieldName` | VARCHAR(50) | Cle |
| `FieldValue` | TEXT | JSON ou texte libre |

**Usage HybeliorWorld** : stocke donnees GAS — `'BaseCharacterStats'`, `'BaseCharacterSkills'`, `'BagInventory'`, `'SupplyPodsOpened'`.

## `DefaultCharacterValues` (v20230304)

Positions et configurations de spawn nommees.

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `DefaultCharacterValuesID` | INT AUTO_INCREMENT/SERIAL | PK |
| `DefaultSetName` | VARCHAR(50) | Ex `'Default'` |
| `StartingMapName` | VARCHAR(50) | Zone de depart |
| `X`, `Y`, `Z` | FLOAT | Position spawn |
| `RX`, `RY`, `RZ` | FLOAT | Rotation (defaut 0) |

PK composite — ordre inverse MySQL vs PG.

## `DefaultCustomCharacterData` (v20230304)

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `DefaultCustomCharacterDataID` | INT AUTO_INCREMENT/SERIAL | PK |
| `DefaultCharacterValuesID` | INT | FK → DefaultCharacterValues |
| `CustomFieldName` | VARCHAR(50) | Cle |
| `FieldValue` | TEXT | JSON |

## `Races` — Races jouables

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `RaceID` | INT AUTO_INCREMENT/SERIAL | PK |
| `RaceName` | VARCHAR(50) | Nom |

## Stored procedures personnages

### `AddCharacter(_CustomerGUID, _UserSessionGUID, _CharacterName, _ClassName)`

Retourne : `ErrorMessage`, `CharacterName`, `ClassName`, `CharacterLevel`, `StartingMapName`, `X`, `Y`, `Z`, `RX`, `RY`, `RZ`, `TeamNumber`, `Gold`, `Silver`, `Copper`, `FreeCurrency`, `PremiumCurrency`, `Fame`, `Alignment`, `Score`, `Gender`, `XP`, `Size`, `Weight`.

Logique : verifie session, verifie classe, valide nom (regex `[^a-zA-Z0-9 ]` si `SupportUnicode=FALSE`), verifie unicite nom, copie stats de `Class` dans `Characters`. Si `ClassInventory` existe : copie, sinon cree `Bag` 4x4 (16 slots).

> **Bug PG** : `raise notice '_ClassID: %', _ClassID;` laisse en production.

### `AddOrUpdateCustomCharData(_CustomerGUID, _CharacterName, _CustomFieldName, _FieldValue)`

MySQL : UPDATE puis INSERT si non existant.
PG : `SELECT FOR UPDATE` puis INSERT ou UPDATE (verrou pesimiste).

> **Anomalie** : log de debug mal formate (`CONCAT(_CustomFieldName, 'Empty Field Name')` au lieu d'un message conditionnel).

### `GetAllCharacters(_CustomerGUID, _UserSessionGUID)`

Jointure `Characters → Class → Users → UserSessions`. Inclut `LastActivityString`, `CreateDateString`.
MySQL : `DATE_FORMAT('%b %d %Y %h:%i%p', ...)`. PG : `TO_CHAR(..., 'mon dd yyyy hh:miAM')`.

### `GetCharByCharName`, `GetCustomCharData`

`GetCharByCharName` : jointure `Class`, `Customers`, `CharOnMapInstance`, `MapInstances`, `WorldServers`. Retourne toutes colonnes `Characters.*` + `Port`, `ServerIP`, `MapInstanceID`, `ClassName`, `EnableAutoLoopBack`.

`GetCustomCharData` : jointure simple `Characters → CustomCharacterData`.

### `UpdateCharacterStats`

Met a jour environ 70 colonnes du personnage. Declenche depuis le serveur de zone a chaque sauvegarde.

### `UpdatePositionOfCharacterByName`

Met a jour X, Y, Z+1, RX, RY, RZ. Met a jour `Users.LastAccess`.

> **Anomalie** : `Z = _Z + 1` — Z systematiquement incremente de 1 (probablement pour eviter le sol, non documente).

### `RemoveCharacter`

Suppression cascade manuelle (pas de `ON DELETE CASCADE`) : `CharAbilityBarAbilities` → `CharAbilityBars` → `CharHasAbilities` → `CharHasItems` → `CharInventoryItems` → `CharInventory` → `CharOnMapInstance` → `ChatGroupUsers` → `CustomCharacterData` → `PlayerGroupCharacters` → `Characters`.

> **Bug MySQL** : `DELETE FROM CharHasItems WHERE CharacterID = _CharacterID;` ne filtre pas par `CustomerGUID` — risque inter-tenant.

## Performance — index manquants

- **Pas d'index sur `Characters.CharName`** : recherche `WHERE C.CharName = _CharName` provoque scan complet. Recommandation : `CREATE INDEX IX_Characters_CharName ON Characters(CustomerGUID, CharName);`.

## Voir aussi

- [[SQL Users]] — `Characters.UserGUID` FK vers `Users` ; `AddCharacter` verifie `UserSessionGUID`
- [[SQL Inventory]] — `AddCharacter` copie `ClassInventory` ou cree `Bag` 4x4 ; `RemoveCharacter` cascade vers `CharHasItems`, `CharInventoryItems`, `CharInventory`
- [[SQL Abilities]] — `RemoveCharacter` cascade vers `CharAbilityBarAbilities`, `CharAbilityBars`, `CharHasAbilities`
- [[SQL Maps Social]] — `GetCharByCharName` jointure `CharOnMapInstance`, `MapInstances`, `WorldServers` ; `RemoveCharacter` cascade vers `CharOnMapInstance`, `ChatGroupUsers`, `PlayerGroupCharacters`
- [[SQL Global Data]] — fonctions scalaires `AbilityMod`, `RollDice` applicables aux stats Characters
- [[OWS Player Controller Component]] — `FUserCharacter` (100+ colonnes) mirroir exact de `Characters`
- [[OWS Architecture]] — endpoints `CreateCharacter`, `GetAllCharacters`, `UpdateCharacterStats`
