---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# SQL Bootstrap

Scripts d'initialisation de la base OWS (3 SGBD supportés).

## Fichiers

```
SQL/Initialize.sql             ; MSSQL
SQL/Initialize - MySQL.sql     ; MySQL
SQL/Initialize - Postgres.sql  ; PostgreSQL
```

## Données initiales

**Maps** : HubWorld (SoftCap 60, HardCap 80), SouthGate (identique).

**DefaultCharacterValues** :
```
StartingMapName = 'HubWorld'
Position : X=1510, Y=-160, Z=100
Rotation : (0, 0, 0)
```

**DefaultCustomCharacterData** :
```json
{
  "BaseCharacterStats": {"Strength": 10, "Agility": 10, "Constitution": 10},
  "BaseCharacterSkills": {"Skill1": 1},
  "SupplyPodsOpened": {},
  "BagInventory": {"items": []}
}
```

## Voir aussi
- [[../08_Backend_OWS/OWSArchitecture]] — hub backend : pointe vers `SQL_Users`, `SQL_Characters`, `SQL_Inventory` (schéma complet des 3 SGBD initialisés par `Initialize.sql`/`Initialize - MySQL.sql`/`Initialize - Postgres.sql`).
- [[Config Files]] — les URLs consommant la base bootstrappée (`OWS2APIPath`, `OWS2CharacterPersistenceAPIPath`, `OWS2InstanceManagementAPIPath`, `OWS2GlobalDataAPIPath`) sont déclarées dans `DefaultGame.ini` et lues par `UOWSAPISubsystem`.
