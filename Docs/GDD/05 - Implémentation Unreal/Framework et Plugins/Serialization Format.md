---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# FHWJsonSerializer — Sérialisation JSON

Helper template C++ qui encapsule `FJsonObjectConverter` pour sérialiser/désérialiser n'importe quel `USTRUCT` UE5 en JSON.

**Fichier :** `Source/HybeliorWorld/Public/Core/HWJsonSerialization.h`
**Type :** Template C++ (non-UObject, pas de `UCLASS`)

## Interface publique

| Méthode statique | Signature | Description |
|---|---|---|
| `Serialize` | `static FString Serialize(const StructType& InData)` | Convertit un `USTRUCT` en chaîne JSON. Retourne `FString()` vide en cas d'échec. |
| `Deserialize` | `static bool Deserialize(const FString& InJson, StructType& OutData)` | Parse une chaîne JSON dans un `USTRUCT`. Retourne `true` en succès. |

## Mécanisme interne

- `Serialize` appelle `FJsonObjectConverter::UStructToJsonObjectString(InData, JsonString, 0, 0, 0, nullptr, false)`
- `Deserialize` appelle `FJsonObjectConverter::JsonObjectStringToUStruct(InJson, &OutData, 0, 0)`

## Utilisations

Instancié directement dans `AHWPlayerController` pour persister les données de personnalisation :

```cpp
// Sérialisation apparence dans PersistCharacterData()
FString AppearanceCEJSON = FHWJsonSerializer<FHWCharacterAppearanceCE>::Serialize(
    GetHWGASPlayerCharacter()->CharacterAppearanceCE
);

// SaveCharacterCustomization / LoadCharacterCustomization
FString AppearanceJSON = FHWJsonSerializer<FHWCharacterAppearance>::Serialize(MyCharacter->CharacterAppearance);
FHWJsonSerializer<FHWCharacterAppearance>::Deserialize(AppearanceStr, MyCharacter->CharacterAppearance);
```

## Dépendances

- `JsonObjectConverter.h` (moteur UE5)
- Utilisé par : `AHWPlayerController` (inclus dans `Game/HWPlayerController.cpp`)

## Voir aussi
- [[Persistence Flow]] — consommateur principal du template (toutes les clés `PersistCharacterData`)
- [[Player Controllers]] — `AHWPlayerController` inclut `HWJsonSerialization.h`
- [[../02_Characters_Entities/HWCharacter]] — hub personnage : utilise le template pour `FHWOftenChangeCharacterData`, `FHW{Change,RarelyChange}CharacterData`, `FHWBaseCharacterSkills`, `FHWCharacterAppearance(CE)`, `SaveCharacterCustomization`/`LoadCharacterCustomization`
- [[../08_Backend_OWS/OWSArchitecture]] — destination des JSON via API CustomCharacterData
