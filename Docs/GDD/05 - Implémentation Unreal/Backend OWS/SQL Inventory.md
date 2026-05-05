---
tags: [implementation, ue5, ows, sql, inventory]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [migration-accord-stats-brutes]
implements: [L'Accord]
---

# SQL Inventory

> [!warning] DETTE TECHNIQUE — voir [[Migration Accord]]
> Les valeurs `BaseCharacterStats={Strength:10, Agility:10, ...}` documentées ici reposent sur le modèle 10 attributs D&D. Le mapping cible vers les **8 stats brutes canoniques** (Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe) est documenté dans [[Migration Accord]] §"Phase C". Aucun changement SQL imposé en V3 — documentation de la translation.

> Tables OWS Inventaire : `Items`, `ItemTypes`, `CharHasItems` (inventaire libre), `CharInventory` + `CharInventoryItems` (grille), `ClassInventory`. Source : `OWS/src/.docker/{mysql,postgres,mssql}/setup.sql`.

## `Items` — Objets du jeu

| Colonne | Type | Defaut | Description |
|---------|------|--------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | — | Multi-tenant |
| `ItemID` | INT AUTO_INCREMENT/SERIAL | auto | PK |
| `ItemTypeID` | INT | — | FK → ItemTypes |
| `ItemName` | VARCHAR(50) | — | Nom |
| `ItemWeight` | DECIMAL(18,2) | 0 | Poids |
| `ItemCanStack` | BOOLEAN | FALSE | Empilable |
| `ItemStackSize` | SMALLINT | 0 | Taille pile max |
| `ItemIsUsable` | BOOLEAN | FALSE | Utilisable |
| `ItemIsConsumedOnUse` | BOOLEAN | TRUE | Consomme a l'usage |
| `CustomData` | VARCHAR(2000) | `''` | JSON custom |
| `DefaultNumberOfUses` | INT | 0 | Utilisations |
| `ItemValue` | INT | 0 | Valeur marchande |
| `ItemMesh` | VARCHAR(200) | `''` | Chemin mesh |
| `MeshToUseForPickup` | VARCHAR(200) | `''` | Mesh ramassage |
| `TextureToUseForIcon` | VARCHAR(200) | `''` | Icone |
| `PremiumCurrencyPrice`, `FreeCurrencyPrice` | INT | 0 | Prix boutique |
| `ItemTier` | INT | 0 | Tier qualite |
| `ItemDescription` | TEXT | `''` | Description |
| `ItemCode` | VARCHAR(50) | `''` | Code item |
| `ItemDuration` | INT | 0 | Duree (consommable) |
| `CanBeDropped`, `CanBeDestroyed` | BOOLEAN | TRUE/FALSE | Comportements |
| `WeaponActorClass` | VARCHAR(200) | `''` | Classe UE arme |
| `StaticMesh`, `SkeletalMesh` | VARCHAR(200) | `''` | Meshes 3D |
| `ItemQuality` | SMALLINT | 0 | Qualite |
| `IconSlotWidth`, `IconSlotHeight` | INT | 1 | Taille grille |
| `ItemMeshID` | INT | 0 | ID mesh alternatif |

PK : (ItemID, CustomerGUID) MySQL ; (CustomerGUID, ItemID) PG.

## `ItemTypes` — Types d'objets

| Colonne | Type | Defaut | Description |
|---------|------|--------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | — | Multi-tenant |
| `ItemTypeID` | INT AUTO_INCREMENT/SERIAL | auto | PK |
| `ItemTypeDesc` | VARCHAR(50) | — | Description |
| `UserItemType` | SMALLINT | 0 | Type utilisateur |
| `EquipmentType` | SMALLINT | 0 | Sous-type equipement |
| `ItemQuality` | SMALLINT | 0 | Qualite par defaut |
| `EquipmentSlotType` | SMALLINT | 0 | Slot d'equipement |

## `CharHasItems` — Inventaire libre (non-grille)

| Colonne | Type | Defaut | Description |
|---------|------|--------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | — | Multi-tenant |
| `CharacterID` | INT | — | FK → Characters |
| `CharHasItemID` | INT AUTO_INCREMENT/SERIAL | auto | PK |
| `ItemID` | INT | — | FK → Items |
| `Quantity` | INT | 1 | Quantite |
| `Equipped` | BOOLEAN | FALSE | Equipe |

> **Redondance design** : cette table coexiste avec `CharInventoryItems` (voir ci-dessous). Documentation ou suppression recommandee.

## `CharInventory` — Inventaires avec grille

| Colonne | Type | Description |
|---------|------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `CharacterID` | INT | FK → Characters |
| `CharInventoryID` | INT AUTO_INCREMENT/SERIAL | PK |
| `InventoryName` | VARCHAR(50) | Nom (ex `'Bag'`) |
| `InventorySize` | INT | Slots total |
| `InventoryWidth` | INT | Largeur grille (defaut 1) |
| `InventoryHeight` | INT | Hauteur grille (defaut 1) |

## `CharInventoryItems` — Objets dans les inventaires grille

| Colonne | Type | Defaut | Description |
|---------|------|--------|-------------|
| `CustomerGUID` | CHAR(36)/UUID | — | Multi-tenant |
| `CharInventoryID` | INT | — | FK → CharInventory |
| `CharInventoryItemID` | INT AUTO_INCREMENT/SERIAL | auto | PK |
| `ItemID` | INT | — | FK → Items |
| `InSlotNumber` | INT | — | Position dans la grille |
| `Quantity` | INT | — | Quantite |
| `NumberOfUsesLeft` | INT | 0 | Utilisations restantes |
| `Condition` | INT | 100 | Etat (0-100) |
| `CharInventoryItemGUID` | CHAR(36)/`UUID gen_random_uuid()` | — | GUID unique de cet item |
| `CustomData` | TEXT | NULL | Donnees supplementaires |

## `ClassInventory` — Inventaires par defaut des classes

| Colonne | Type | Description |
|---------|------|-------------|
| `ClassInventoryID` | INT AUTO_INCREMENT/SERIAL | PK |
| `CustomerGUID` | CHAR(36)/UUID | Multi-tenant |
| `ClassID` | INT | FK → Class |
| `InventoryName` | VARCHAR(50) | Ex `'Bag'` |
| `InventorySize` | INT | Nombre de slots total |
| `InventoryWidth` | INT | Largeur grille |
| `InventoryHeight` | INT | Hauteur grille |

Utilise par `AddCharacter` pour cloner les inventaires initiaux selon la classe.

## Donnees initiales (HybeliorWorld `Initialize.sql`)

**DefaultCustomCharacterData** initial :

| CustomFieldName | FieldValue |
|-----------------|------------|
| BaseCharacterStats | `{"Strength": 10, "Agility": 10, "Constitution": 10 }` |
| BaseCharacterSkills | `{ "Skill1": 1 }` |
| SupplyPodsOpened | `{}` |
| BagInventory | `{   "items": [] }` |

> **Bug JSON detecte** : fichiers `Initialize - MySQL.sql` (ligne 51) et `Initialize - Postgres.sql` (ligne 56) ont `'{   "items":  }'` au lieu de `'{   "items": [] }'`. Le tableau `[]` est absent — JSON invalide. Toute desserialisation C# levera exception.

## Voir aussi

- [[SQL Characters]] — `CharHasItems.CharacterID` / `CharInventory.CharacterID` FK vers `Characters` ; `AddCharacter` copie `ClassInventory` → `CharInventory` ; `CustomCharacterData` stocke `BagInventory`
- [[SQL Abilities]] — `Class` FK utilisee a la fois dans `ClassInventory` et dans `Abilities` (restrictions de classe)
- [[SQL Global Data]] — bug JSON `BagInventory` (Initialize - {MySQL,Postgres}.sql) ; fonctions scalaires `AbilityMod`
- [[SQL Users]] — `AddNewCustomer` cree automatiquement l'inventaire `Bag` 16 slots de demonstration
- [[OWS Player Controller Component]] — `UOWSGameInstance::LocalMeshItemsMap` + `LoadWeaponActorClassFromPath` consomment `Items.WeaponActorClass`, `StaticMesh`, `SkeletalMesh`, `ItemMesh`
- [[OWS Architecture]] — tables Inventaire dans la synthese 33 tables
