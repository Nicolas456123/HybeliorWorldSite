---
tags: [implementation, ue5, ows, sql, abilities, gas]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [migration-accord-paliers-maitrise]
implements: [Le Souffle]
---

# SQL Abilities

> [!warning] DETTE TECHNIQUE — voir [[Migration Accord]]
> La colonne `AbilityLevel` (`int32`) suit le modèle exponentiel `XP × 1.15^N`. La cible canonique est **5 paliers Maîtrise** (Novice → Apprenti → Adepte → Expert → Maître) avec rouille post-Souffle. Voir [[Weapon Mastery]] et [[Migration Accord]] §"Phase E" pour la table de transposition.

> Tables OWS Capacites/Sorts (GAS) : `Abilities`, `AbilityTypes`, `CharHasAbilities`, `CharAbilityBars`, `CharAbilityBarAbilities`. Source : `OWS/src/.docker/{mysql,postgres,mssql}/setup.sql`.

## `Abilities` — Capacites/Sorts

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `AbilityID` | INT AUTO_INCREMENT/SERIAL | PK |
| `AbilityName` | VARCHAR(50) | Nom |
| `AbilityTypeID` | INT | FK → AbilityTypes |
| `TextureToUseForIcon` | VARCHAR(200) | Chemin icone |
| `Class` | INT | ID classe requise (nullable) |
| `Race` | INT | ID race requise (nullable) |
| `GameplayAbilityClassName` | VARCHAR(200) | Classe GAS C++ |
| `AbilityCustomJSON` | TEXT | Donnees custom JSON |

**Contraintes** : `FK_Abilities_AbilityTypes` → AbilityTypes(AbilityTypeID, CustomerGUID).

PK : (AbilityID, CustomerGUID) MySQL ; (CustomerGUID, AbilityID) PG.

## `AbilityTypes` — Types de capacites

| Colonne | Type | Description |
|---------|------|-------------|
| `AbilityTypeID` | INT AUTO_INCREMENT/SERIAL | PK |
| `AbilityTypeName` | VARCHAR(50) | Nom du type |
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |

## `CharHasAbilities` — Capacites possedees

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `CharHasAbilitiesID` | INT AUTO_INCREMENT/SERIAL | PK |
| `CharacterID` | INT | FK → Characters |
| `AbilityID` | INT | FK → Abilities |
| `AbilityLevel` | INT (defaut 1) | Niveau de la capacite |
| `CharHasAbilitiesCustomJSON` | TEXT | Donnees custom |

## `CharAbilityBars` — Barres d'actions

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `CharAbilityBarID` | INT AUTO_INCREMENT/SERIAL | PK |
| `CharacterID` | INT | FK → Characters |
| `AbilityBarName` | VARCHAR(50) | Nom barre |
| `CharAbilityBarsCustomJSON` | TEXT | Config custom |
| `MaxNumberOfSlots` | INT (defaut 1) | Slots total |
| `NumberOfUnlockedSlots` | INT (defaut 1) | Slots debloques |

## `CharAbilityBarAbilities` — Capacites placees dans les barres

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `CharAbilityBarAbilityID` | INT AUTO_INCREMENT/SERIAL | PK |
| `CharAbilityBarID` | INT | FK → CharAbilityBars |
| `CharHasAbilitiesID` | INT | FK → CharHasAbilities |
| `CharAbilityBarAbilitiesCustomJSON` | TEXT | Config custom |
| `InSlotNumber` | INT (defaut 1) | Position dans la barre |

## Stored procedures Abilities

### `AddOrUpdateAbility` / `AddOrUpdateAbilityType` (v20220613)

Pattern upsert standard par ID ou nom. PG utilise `SELECT ... FOR UPDATE` pour verrouiller avant insert/update.

### `GetAbilityBars(_CustomerGUID, _CharName)`

Retourne liste des barres (`AbilityBarName`, `CharAbilityBarID`, `CharAbilityBarsCustomJSON`, etc.).

### `GetAbilityBarsAndAbilities`

Jointure complete : `CharAbilityBars → CharAbilityBarAbilities → CharHasAbilities → Abilities → Characters`.

### `GetAbilityTypes`

MySQL : PROCEDURE. PG : FUNCTION. Retourne les types avec sous-comptage des capacites par type.

### `GetCharacterAbilities`

Jointure `CharHasAbilities → Abilities → Characters`.

### `AddAbilityToCharacter` (PostgreSQL uniquement, v20220613)

Parametres : `_CustomerGUID`, `_AbilityName`, `_CharacterName`, `_AbilityLevel`, `_CharHasAbilitiesCustomJSON`.

Insere dans `CharHasAbilities` si l'association n'existe pas. Utilise `SELECT FOR UPDATE` pour verrou pesimiste.

> **Incoherence** : le script de migration v20220613 n'existe pas pour MSSQL. Un projet MSSQL voulant utiliser Abilities doit creer ces procedures manuellement. Aussi : `AddAbilityToCharacter` existe en PG mais pas en MySQL (asymetrie inter-moteurs).

## Integration HybeliorWorld

Le champ `GameplayAbilityClassName` lie chaque capacite OWS a sa classe C++ `UGameplayAbility` via `LoadGameplayAbilityClass` ou `FindGameplayAbilityClass` du `UOWSGameInstance` (plugin OWS).

Cote client UE5, le composant `UOWSPlayerControllerComponent` expose :
- `GetCharacterAbilities(CharName)`
- `AddAbilityToCharacter(CharName, AbilityName, Level, CustomJSON)`
- `UpdateAbilityOnCharacter(CharName, AbilityName, Level, CustomJSON)`
- `RemoveAbilityFromCharacter(CharName, AbilityName)`
- `GetAbilityBars(CharName)`

Les endpoints HTTP correspondants sont dans `OWSCharacterPersistence /api/Abilities/`.

## Structures C++ associees

Cote plugin OWS (fichier `OWS2API.h`) :
- `FAbility` : capacite complete (`AbilityID`, `AbilityName`, `AbilityTypeID`, `GameplayAbilityClassName`, `CharHasAbilitiesID`, `AbilityLevel`, JSON, icone, slot)
- `FAbilityBar` : barre (`CharAbilityBarID`, `AbilityBarName`, `CharacterID`, `MaxNumberOfSlots`, `NumberOfUnlockedSlots`)
- `FAbilityBarWithAbilities` : `FAbilityBar` + `TArray<FAbility> Abilities`
- `FAddAbilityToCharacterJSONPost`, `FUpdateAbilityOnCharacterJSONPost`, `FRemoveAbilityFromCharacterJSONPost`

## Voir aussi

- [[SQL Characters]] — `CharHasAbilities.CharacterID` FK vers `Characters` ; `RemoveCharacter` cascade vers toutes les tables Abilities
- [[SQL Users]] — multi-tenant partitionne par `CustomerGUID` (cf. `Customers.CustomerGUID`)
- [[OWS Player Controller Component]] — structs `FAbility`, `FAbilityBar`, `FAbilityBarWithAbilities`, `FAddAbilityToCharacterJSONPost` dans `OWS2API.h` + methodes `UOWSPlayerControllerComponent::GetCharacterAbilities`, `AddAbilityToCharacter`
- [[OWS Architecture]] — endpoints `/api/Abilities/` (GetAbilities, GetCharacterAbilities, AddAbilityToCharacter, UpdateAbilityOnCharacter, RemoveAbilityFromCharacter, GetAbilityBars, GetAbilityBarsAndAbilities)
- [[SQL Global Data]] — migrations v20220613 (creation des procedures Abilities) + OWSVersion
- [[SQL Inventory]] — pattern de table parallele (`Items`/`CharHasItems` vs `Abilities`/`CharHasAbilities`)
