---
tags: [implementation, ue5, audit]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# D03 — Audit de Sécurité HybeliorWorld

> **Date :** 2026-04-04  
> **Périmètre :** UE5.4 C++ (`Source/HybeliorWorld/`) + OWS .NET (`OWS/src/`)  
> **Auditeur :** Analyse statique automatisée + revue manuelle du code  
> **Classification :** CONFIDENTIEL — Usage interne uniquement

---

## Table des matières

1. [Résumé exécutif](#1-résumé-exécutif)  
2. [Méthodologie](#2-méthodologie)  
3. [Vulnérabilités UE5 — Côté réseau / RPCs](#3-vulnérabilités-ue5--côté-réseau--rpcs)  
4. [Vulnérabilités UE5 — Données et propriété](#4-vulnérabilités-ue5--données-et-propriété)  
5. [Vulnérabilités OWS — Authentification et autorisation](#5-vulnérabilités-ows--authentification-et-autorisation)  
6. [Vulnérabilités OWS — Données et injections](#6-vulnérabilités-ows--données-et-injections)  
7. [Vulnérabilités OWS — Infrastructure et configuration](#7-vulnérabilités-ows--infrastructure-et-configuration)  
8. [Tableau récapitulatif](#8-tableau-récapitulatif)  
9. [Plan d'action priorisé](#9-plan-daction-priorisé)

---

## 1. Résumé exécutif

L'audit a identifié **17 vulnérabilités** réparties entre le client/serveur UE5 et les microservices OWS. Parmi elles, **3 sont critiques** (compromission de serveur, falsification de stats de personnage, secrets en clair) et **6 sont de haute sévérité**. Le vecteur d'attaque principal côté OWS est l'absence de mécanisme d'autorisation par rôle ou par propriété de ressource au-delà du simple `X-CustomerGUID` partagé — une validation insuffisante pour un MMO multi-joueurs.

| Sévérité | Nombre |
|----------|--------|
| Critique | 3 |
| Haute | 7 |
| Moyenne | 5 |
| Faible | 2 |

---

## 2. Méthodologie

- Recherche de patterns dangereux (`_Validate`, `HasAuthority`, `GetFirstPlayerController`, `EditAnywhere`) dans tous les `.h` et `.cpp`.
- Revue des controllers OWS (CharacterPersistence, PublicAPI, InstanceManagement, GlobalData, Management).
- Analyse des requêtes SQL (GenericQueries, MSSQLQueries, MySQLQueries, PostgresQueries).
- Inspection des fichiers de configuration (`appsettings.json`).
- Examen des middlewares de sécurité (`RateLimitingMiddleware`, `StoreCustomerGUIDMiddleware`).

---

## 3. Vulnérabilités UE5 — Côté réseau / RPCs

---

### UE-01 — RPC `Server_SetFlySpeed` sans validation des bornes

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Critique** |
| **Fichier** | `Private/Character/HWGASPlayerCharacter.cpp` (ligne 958) |
| **Catégorie** | RPC sans validation métier |

**Description**  
La RPC serveur `Server_SetFlySpeed` accepte un `float NewSpeed` envoyé par le client et l'applique directement à `MaxFlySpeed` sans aucune vérification de borne. Il n'existe aucune fonction `Server_SetFlySpeed_Validate` — la validation est totalement absente.

```cpp
// HWGASPlayerCharacter.cpp : 958 — AUCUNE _Validate correspondante
void AHWGASPlayerCharacter::Server_SetFlySpeed_Implementation(float NewSpeed)
{
    if (UCharacterMovementComponent* CMC = GetCharacterMovement())
    {
        CMC->MaxFlySpeed = NewSpeed;  // NewSpeed non borné
    }
}
```

**Exploitation possible**  
Un client malveillant envoie `Server_SetFlySpeed(999999.f)` pour se téléporter instantanément à travers la carte, bypasser les zones, ou effectuer un speed hack de vol. Aucune détection côté serveur.

**Correction recommandée**  
Ajouter une fonction `_Validate` et clamper la valeur :
```cpp
bool AHWGASPlayerCharacter::Server_SetFlySpeed_Validate(float NewSpeed)
{
    return NewSpeed > 0.f && NewSpeed <= MaxAllowedFlySpeed; // constante dans DataAsset
}
```

---

### UE-02 — RPC `Server_OpenSupplyPod` avec `_Validate` retournant toujours `true`

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Haute** |
| **Fichier** | `Private/Game/HWPlayerController.cpp` (lignes 435-458) |
| **Catégorie** | Validation RPC triviale |

**Description**  
La RPC `Server_OpenSupplyPod` (déclarée `Unreliable` — anomalie en soi pour une action persistante) possède une `_Validate` qui retourne systématiquement `true` sans aucun contrôle. L'implémentation ne vérifie pas si le joueur est réellement en contact avec le pod ciblé côté serveur avant d'appeler `Interact()`.

```cpp
bool AHWPlayerController::Server_OpenSupplyPod_Validate()
{
    return true;  // aucune validation
}
```

**Exploitation possible**  
Le client peut spammer l'ouverture de supply pods à distance, ou déclencher `Interact()` sur n'importe quel pod visible dans son volume de pertinence réseau, même sans proximité physique. De plus, utiliser `Unreliable` pour un RPC d'ouverture de pod (action persistée en BDD via OWS) peut mener à des états incohérents.

**Correction recommandée**  
1. Passer le RPC en `Reliable`.
2. Ajouter dans `_Validate` une vérification de distance maximale (ex. `InteractionRadius`).
3. Vérifier que `OverlappedInteractables[0]` est bien de type `ASupplyPod` avant d'appeler `Interact()`.

---

### UE-03 — RPC `Server_OpenContainer` avec `_Validate` retournant toujours `true`

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Haute** |
| **Fichier** | `Private/Game/HWPlayerController.cpp` (lignes 540-558) |
| **Catégorie** | Validation RPC triviale |

**Description**  
Identique à UE-02 : la `_Validate` de `Server_OpenContainer` retourne `true` sans condition. L'implémentation fait confiance à `GetOverlappedInteractables()` calculé côté serveur, ce qui est une bonne pratique, mais l'absence totale de validation de type (`IInteractable` n'est pas vérifié comme étant un `AHWContainer`) expose à une confusion de type.

**Exploitation possible**  
Un client pourrait déclencher `Server_OpenContainer` en ciblant n'importe quel `IInteractable` dans le rayon (porte, NPC, portail), déclenchant `Interact()` de manière non intentionnelle sur ces acteurs.

**Correction recommandée**  
Ajouter dans `_Validate` ou au début de `_Implementation` un `Cast<AHWContainer>` avec vérification de non-nullité avant de procéder.

---

### UE-04 — Validations `HWSwimmingComponent` basées sur `HasAuthority()` côté serveur uniquement

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Moyenne** |
| **Fichier** | `Private/Water/Components/HWSwimmingComponent.cpp` (lignes 188-216) |
| **Catégorie** | Anti-pattern `_Validate` |

**Description**  
Toutes les `_Validate` des RPCs de nage (`Server_SwimFast_Validate`, `Server_MoveLeftRight_Validate`, etc.) retournent `GetOwner()->HasAuthority()`. Or, les fonctions `_Validate` s'exécutent **déjà** sur le serveur — `HasAuthority()` sera toujours `true` dans ce contexte, rendant ces validations inutiles.

```cpp
bool UHWSwimmingComponent::Server_SwimFast_Validate(bool Value)
{
    return GetOwner()->HasAuthority(); // toujours true sur le serveur
}
```

**Exploitation possible**  
N'importe quelle valeur de `Value` (vitesse de nage) est acceptée sans contrôle de borne. Un client peut envoyer des valeurs extrêmes pour se déplacer anormalement vite dans l'eau.

**Correction recommandée**  
Remplacer par des validations métier réelles (vérification d'état de nage actif, bornes de vitesse) plutôt que `HasAuthority()`.

---

### UE-05 — `GetWorld()->GetFirstPlayerController()` dans des acteurs de monde

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Moyenne** |
| **Fichier** | `Private/Interaction/HWContainer.cpp` (l.48), `Private/Interaction/SupplyPod.cpp` (l.50), `Private/Environment/HWEnvironmentManager.cpp` (l.1068, 1611, 3513), `Private/Terrain/HWTerrainManager.cpp` (l.584) |
| **Catégorie** | Accès au mauvais joueur en contexte serveur |

**Description**  
Ces fichiers utilisent `GetWorld()->GetFirstPlayerController()` pour obtenir un contrôleur joueur. Sur un serveur dédié accueillant plusieurs joueurs simultanément, cette fonction retourne **le premier joueur connecté** (arbitraire), non le joueur à l'origine de l'action.

```cpp
// HWContainer.cpp:48 — sur un serveur avec N joueurs, retourne le joueur 0
AHWPlayerController* HWPlayerController = Cast<AHWPlayerController>(GetWorld()->GetFirstPlayerController());
```

**Exploitation possible**  
- Dans `IsContainerOpened` / `IsSupplyPodOpened` : le joueur A peut voir l'état ouvert/fermé d'un conteneur depuis la perspective du joueur 0, permettant de déterminer ce que d'autres joueurs ont ouvert.
- Dans `HWEnvironmentManager` : les calculs de biome et de caméra utilisent la position du joueur 0 pour tous les joueurs — erreur de logique mais sans impact sécurité direct.

**Correction recommandée**  
Passer le `PlayerController` en paramètre depuis l'appelant, ou utiliser `GetInstigatorController()` / `GetOwner()` selon le contexte.

---

### UE-06 — `Server_TravelToZone_Validate` : validation insuffisante du nom de zone

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Moyenne** |
| **Fichier** | `Private/Game/HWPlayerController.cpp` (lignes 1569-1577) |
| **Catégorie** | Validation d'entrée insuffisante |

**Description**  
La validation ne vérifie que si `ZoneName` est non vide. Aucune vérification que la zone demandée existe dans la liste des zones autorisées.

```cpp
bool AHWPlayerController::Server_TravelToZone_Validate(const FString& ZoneName, FVector Location, FRotator Rotation)
{
    return !ZoneName.IsEmpty(); // "ZONEINEXISTANTE" passe la validation
}
```

**Exploitation possible**  
Un client peut tenter de voyager vers des zones non publiées, des niveaux de test, ou injecter des noms de zones avec des caractères spéciaux pouvant causer des comportements inattendus dans OWS lors de la lookup de la carte.

**Correction recommandée**  
Valider `ZoneName` contre une liste blanche de zones connues (via DataTable ou AssetManager), et vérifier que les coordonnées `Location` sont dans des bornes raisonnables.

---

## 4. Vulnérabilités UE5 — Données et propriété

---

### UE-07 — Champs `UPROPERTY(BlueprintReadWrite, EditAnywhere)` exposant des configs réseau sensibles

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Haute** (réévaluée 2026-04-07 — la clé OWS est désormais réelle) |
| **Fichier** | `Public/Game/HWPlayerController.h` (lignes 251-258) |
| **Catégorie** | Exposition de données de configuration |

**Description**  
Les champs `OWSAPICustomerKey`, `OWS2APIPath` et `OWSEncryptionKey` sont déclarés `BlueprintReadWrite` — modifiables depuis Blueprint. Bien que non répliqués, leur accessibilité en Blueprint augmente la surface d'exposition lors de tests ou en mode PIE.

```cpp
UPROPERTY(BlueprintReadWrite)
    FString OWSAPICustomerKey;  // clé API OWS lisible/modifiable en BP

UPROPERTY(BlueprintReadWrite, Category = "Config")
    FString OWSEncryptionKey = "";
```

**Mise à jour 2026-04-07 :** La valeur `OWSAPICustomerKey` est lue depuis `DefaultGame.ini` qui contient désormais une **vraie clé API OWS** (anciennement un placeholder). Ce fichier est versionné dans Git. Combiné avec OWS-01 (absence d'autorisation forte), la possession de cette clé donne un accès complet aux microservices OWS. **Cette clé devrait être déplacée vers un fichier non versionné** (`DefaultGame_Local.ini`, variable d'environnement, ou `.NET User Secrets` côté serveur).

**Exploitation possible**  
En contexte de développement ou via un accès mod/cheat, ces valeurs pourraient être lues ou modifiées via la console Blueprint. De plus, tout clone du dépôt Git expose la clé API réelle.

**Correction recommandée**  
1. **Urgent** : Déplacer `OWSAPICustomerKey` hors de `DefaultGame.ini` vers un fichier `.gitignore`-é ou une variable d'environnement.
2. Passer en `BlueprintReadOnly` (pas d'écriture) et `meta=(AllowPrivateAccess="true")`. La `OWSEncryptionKey` ne devrait pas être exposée du tout en Blueprint.

---

### UE-08 — `ServerMoveItem_Validate` ne vérifie pas la propriété du personnage cible

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Haute** |
| **Fichier** | `Private/Inventory/HWInventoryComponent.cpp` (lignes 485-504) |
| **Catégorie** | Violation de propriété de ressource |

**Description**  
La `_Validate` de `ServerMoveItem` vérifie que l'item existe dans l'inventaire source et que `TargetInventoryOwner` est non-null. Elle **ne vérifie pas** que `TargetInventoryOwner` appartient au même joueur ou est un inventaire que ce joueur a le droit de modifier (conteneur ouvert, marchand autorisé, etc.).

```cpp
bool UHWInventoryComponent::ServerMoveItem_Validate(const FGuid& ItemGUID, AActor* TargetInventoryOwner, const FName& TargetInventoryName)
{
    // Vérifie ItemGUID dans l'inventaire source — OK
    // Vérifie TargetInventoryOwner != null — mais pas la propriété !
    return true;
}
```

**Exploitation possible**  
Un client malveillant peut passer en `TargetInventoryOwner` un pointeur vers l'inventaire d'un autre joueur en ligne, déplaçant des items vers son inventaire sans consentement — vol d'items entre joueurs.

**Correction recommandée**  
Dans `_Validate`, vérifier que `TargetInventoryOwner` est soit le pawn local, soit un acteur dans la liste des interactions autorisées (conteneurs ouverts, marchands, etc.) stockée côté serveur. Ne jamais faire confiance au pointeur fourni par le client.

---

### UE-09 — `UPROPERTY(EditAnywhere)` sur des structs de progression répliquées

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Faible** |
| **Fichier** | `Public/Game/HWPlayerController.h` (lignes 194, 224) |
| **Catégorie** | Modification de données sensibles en éditeur |

**Description**  
`SupplyPodsOpened` et `ContainersOpened` sont déclarés `EditAnywhere` et répliqués. En mode éditeur, un développeur peut modifier directement ces fast arrays répliqués, ce qui peut introduire des états incohérents non détectables au runtime.

**Exploitation possible**  
Risque interne ou lors de tests : modification involontaire de l'état de persistance.

**Correction recommandée**  
Utiliser `VisibleAnywhere` (lecture seule en éditeur) pour les fast arrays répliqués contenant des données de progression.

---

## 5. Vulnérabilités OWS — Authentification et autorisation

---

### OWS-01 — Absence totale d'autorisation sur `OWSCharacterPersistence`, `OWSInstanceManagement` et `OWSGlobalData`

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Critique** |
| **Fichier** | `OWSCharacterPersistence/Startup.cs` (l.113), `OWSInstanceManagement/Startup.cs` (l.113), `OWSGlobalData/Startup.cs` (l.109) |
| **Catégorie** | Endpoint sans authentification forte |

**Description**  
Dans trois microservices sur cinq, `app.UseAuthorization()` est commenté :

```csharp
// OWSCharacterPersistence/Startup.cs:113
//app.UseAuthorization();
```

Le seul mécanisme de protection est le `StoreCustomerGUIDMiddleware` qui vérifie la présence d'un header `X-CustomerGUID`. Ce GUID est un identifiant de tenant, **pas un secret d'authentification**. Il est transmis en clair depuis le client UE5 et stocké en config :

```cpp
// HWPlayerController.cpp:39-43 — lu depuis GGameIni
GConfig->GetString(TEXT("/Script/EngineSettings.GeneralProjectSettings"), TEXT("OWSAPICustomerKey"), OWSAPICustomerKey, GGameIni);
```

**Exploitation possible**  
Tout attaquant connaissant le `CustomerGUID` (extrait du client, des logs, ou par brute force sur un espace GUID prévisible) peut :
- Lire les stats de tous les personnages via `GetByName`
- Modifier les stats de personnages via `UpdateCharacterStats`
- Supprimer des instances de zones via `ShutDownServerInstance`
- Accéder et modifier les GlobalData (données monde persistantes)

**Correction recommandée**  
1. Dé-commenter `app.UseAuthorization()` sur tous les microservices internes.
2. Implémenter un schéma JWT ou mTLS pour les communications serveur-à-serveur (OWS ↔ UE Dedicated Server).
3. Le `X-CustomerGUID` doit être complété par un secret partagé rotatif (API Key + HMAC sur le body de la requête).

---

### OWS-02 — `RemoveCharacter` : absence de vérification de propriété du personnage

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Haute** |
| **Fichier** | `OWSPublicAPI/Requests/Users/RemoveCharacterRequest.cs` (ligne 61) |
| **Catégorie** | Violation de propriété de ressource (IDOR) |

**Description**  
La suppression de personnage prend en paramètre `UserSessionGUID` et `CharacterName`. La requête vérifie que la session est valide, mais **ne vérifie pas explicitement dans le code Request que le personnage appartient bien à l'utilisateur identifié par cette session**.

```csharp
// RemoveCharacterRequest.cs:61
output = await usersRepository.RemoveCharacter(CustomerGUID, UserSessionGUID, CharacterName);
```

La vérification est déléguée à la procédure stockée. Si la procédure stockée ne filtre pas correctement sur le UserGUID issu de la session, un attaquant peut supprimer le personnage d'un autre utilisateur en connaissant son nom.

**Exploitation possible**  
Attaque IDOR (Insecure Direct Object Reference) : un attaquant possédant une session valide et connaissant le nom d'un personnage adverse peut le supprimer définitivement.

**Correction recommandée**  
Ajouter dans le `Handle()` une vérification explicite :
```csharp
var character = await usersRepository.GetCharacterByNameForUser(CustomerGUID, UserSessionGUID, CharacterName);
if (character == null) return new UnauthorizedResult();
```

---

### OWS-03 — `UserSessionSetSelectedCharacter` : aucune vérification de propriété du personnage sélectionné

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Haute** |
| **Fichier** | `OWSPublicAPI/Requests/Users/UserSessionSetSelectedCharacterRequest.cs` |
| **Catégorie** | Violation de propriété de ressource |

**Description**  
Un utilisateur peut appeler `UserSessionSetSelectedCharacter` avec le nom d'un personnage qui ne lui appartient pas. Cette action précède `GetServerToConnectTo` et détermine quel personnage est chargé à la connexion au serveur de zone.

```csharp
output = await usersRepository.UserSessionSetSelectedCharacter(customerGUID, UserSessionGUID, SelectedCharacterName);
// Aucune vérification que SelectedCharacterName appartient à UserSessionGUID
```

**Exploitation possible**  
Un attaquant peut se connecter avec la session et les stats d'un autre personnage (niveau élevé, équipement rare), en contournant la progression normale.

**Correction recommandée**  
Avant l'appel au repository, vérifier que `SelectedCharacterName` est dans la liste des personnages retournée par `GetAllCharacters(CustomerGUID, UserSessionGUID)`.

---

### OWS-04 — Rate limiting présent uniquement sur `OWSPublicAPI`, absent des autres microservices

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Moyenne** |
| **Fichier** | `OWSCharacterPersistence/Startup.cs`, `OWSInstanceManagement/Startup.cs`, `OWSGlobalData/Startup.cs` |
| **Catégorie** | Absence de rate limiting |

**Description**  
Le `RateLimitingMiddleware` (60 req/min par IP, IMemoryCache) est enregistré uniquement dans `OWSPublicAPI/Startup.cs`. Les microservices internes (CharacterPersistence, InstanceManagement, GlobalData) n'ont aucun middleware de rate limiting.

De plus, le rate limiting existant dans PublicAPI présente des faiblesses :
- Basé sur l'IP source uniquement — contournable avec un proxy ou en IPv6
- `IMemoryCache` in-process — non partagé entre instances horizontales (scaling)
- Pas de distinction par endpoint (Login vs GetCharacter traitée pareil)

**Exploitation possible**  
- Brute force sur les endpoints Login/Register de PublicAPI depuis plusieurs IPs.
- Spam illimité de `UpdateCharacterStats` ou `UpdateAllPlayerPositions` sur CharacterPersistence, pouvant saturer la base de données.
- DoS sur `ShutDownServerInstance` ou `SpinUpServerInstance`.

**Correction recommandée**  
1. Ajouter le middleware de rate limiting sur tous les microservices.
2. Migrer vers un rate limiting distribué basé sur Redis (déjà présent dans l'infrastructure).
3. Appliquer des limites différenciées par endpoint sensible.

---

### OWS-05 — `RegisterUser` : pas de validation d'entrée appliquée dans le `RegisterUserRequest`

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Moyenne** |
| **Fichier** | `OWSPublicAPI/Requests/Users/RegisterUserRequest.cs` |
| **Catégorie** | Validation d'entrée manquante |

**Description**  
Le `RegisterUserRequest` appelle directement `_usersRepository.RegisterUser(...)` sans passer par `IPublicAPIInputValidation`. La classe `DefaultPublicAPIInputValidation` existe et valide email, mot de passe, prénom, nom — mais elle n'est jamais invoquée dans ce flux.

```csharp
// RegisterUserRequest.cs — ValidateEmail, ValidatePassword ne sont PAS appelés
SuccessAndErrorMessage registerOutput = await _usersRepository.RegisterUser(
    _customerGUID, _registerUserDTO.Email, _registerUserDTO.Password, ...);
```

**Exploitation possible**  
- Création de comptes avec des mots de passe vides ou de 1 caractère.
- Injection de caractères spéciaux dans le champ email.
- Énumération de comptes via le message d'erreur "Duplicate Account!" distinct.

**Correction recommandée**  
Appeler `_publicAPIInputValidation.ValidateEmail()` et `ValidatePassword()` avant l'appel au repository, et retourner les erreurs de validation appropriées.

---

## 6. Vulnérabilités OWS — Données et injections

---

### OWS-06 — `UpdateAllPlayerPositions` : parsing manuel de chaîne sans validation

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Haute** |
| **Fichier** | `OWSCharacterPersistence/Requests/Characters/UpdateAllPlayerPositionsRequest.cs` |
| **Catégorie** | Injection de données / crash serveur |

**Description**  
La méthode parse manuellement une chaîne `|`-délimitée envoyée par le serveur UE :

```csharp
foreach (string PlayerDataString in SerializedPlayerLocationData.Split('|'))
{
    string[] PlayerDataValues = PlayerDataString.Split(':');
    string PlayerName = PlayerDataValues[0]; // aucune validation de longueur
    float X = float.Parse(sX); // crash si non-float
    // ...
    await charactersRepository.UpdatePosition(customerGUID, PlayerName, MapName, X, Y, Z, ...);
}
```

Problèmes :
1. `float.Parse()` sans `TryParse` : une valeur non-numérique lève une exception non gérée.
2. `PlayerDataValues[n]` sans vérification de longueur du tableau : un `IndexOutOfRangeException` si le format est invalide.
3. `PlayerName` transmis sans validation de longueur ou whitelist — peut injecter un nom de 10 000 caractères en base.

**Exploitation possible**  
Si un composant UE serveur est compromis ou mal configuré, un attaquant peut envoyer une chaîne malformée pour crash le service, ou insérer des noms de joueurs avec des caractères spéciaux pour corrompre des données en BDD.

**Correction recommandée**  
1. Utiliser `float.TryParse()` avec retour d'erreur gracieux.
2. Vérifier `PlayerDataValues.Length >= 7` avant accès.
3. Valider `PlayerName` via `IPublicAPIInputValidation.ValidateCharacterName()`.
4. Passer à un format JSON sérialisé au lieu d'un format délimiteur custom.

---

### OWS-07 — `UpdateCharacterStats` : aucune validation de propriété côté CharacterPersistence

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Critique** |
| **Fichier** | `OWSCharacterPersistence/Requests/Characters/UpdateCharacterStatsRequest.cs`, `OWSData/SQL/GenericQueries.cs` (UpdateCharacterStats) |
| **Catégorie** | Falsification de stats (God Mode) |

**Description**  
L'endpoint `POST /api/Characters/UpdateCharacterStats` accepte un objet `UpdateCharacterStats` contenant **toutes les statistiques du personnage** (Health, MaxHealth, Gold, PremiumCurrency, XP, Level, Strength, etc.) et les écrit directement en base sans aucune validation des valeurs ni vérification que la session appelante est autorisée à modifier ce personnage.

```csharp
// UpdateCharacterStatsRequest.cs:33
await charactersRepository.UpdateCharacterStats(updateCharacterStats);
// updateCharacterStats.Health, .Gold, .PremiumCurrency — non validés
```

La requête SQL met à jour **50+ champs** incluant la monnaie premium :
```sql
-- GenericQueries.cs:186
UPDATE Characters SET Health=@Health, MaxHealth=@MaxHealth, Gold=@Gold,
    FreeCurrency=@FreeCurrency, PremiumCurrency=@PremiumCurrency, ...
WHERE CharName=@CharName AND CustomerGUID=@CustomerGUID
```

**Exploitation possible**  
Tout appelant connaissant le `CustomerGUID` peut envoyer une requête `UpdateCharacterStats` avec `PremiumCurrency=999999`, `Health=9999999`, `CharacterLevel=100` pour n'importe quel personnage, constituant un cheat absolu et une fraude monétaire.

**Correction recommandée**  
1. **Urgent** : Vérifier que le personnage modifié appartient à la session appelante (via `UserSessionGUID`).
2. Valider que les valeurs sont dans des bornes cohérentes avec les règles du jeu.
3. Séparer les stats "écriture serveur uniquement" (PremiumCurrency, Level, XP) des stats "écriture gameplay" (Health, Position).
4. Implémenter un système d'audit log pour tout changement de currency.

---

### OWS-08 — Injections SQL : analyse de risque

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Faible** |
| **Fichier** | `OWSData/SQL/*.cs`, tous les repositories |
| **Catégorie** | Risque d'injection SQL — atténué |

**Description**  
L'ensemble du code SQL utilise Dapper avec `DynamicParameters` (paramètres nommés). Les requêtes en texte brut (`CommandType.Text`) utilisent toutes des paramètres `@NomParam`, ce qui prévient l'injection SQL classique. Les procédures stockées utilisent `CommandType.StoredProcedure`.

Aucune injection SQL directe n'a été identifiée dans le code audité.

**Risque résiduel**  
La chaîne `SerializedPlayerLocationData` (voir OWS-06) est parsée puis insérée via paramètre — le risque d'injection est donc atténué par Dapper, mais la robustesse du parsing reste insuffisante.

**Correction recommandée**  
Maintenir l'utilisation systématique de `DynamicParameters`. Documenter explicitement cette pratique dans les guidelines de développement.

---

## 7. Vulnérabilités OWS — Infrastructure et configuration

---

### OWS-09 — Secrets en dur dans les fichiers `appsettings.json` versionnés

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Critique** |
| **Fichier** | `OWSCharacterPersistence/appsettings.json`, `OWSInstanceManagement/appsettings.json`, `OWSGlobalData/appsettings.json`, `OWSManagement/appsettings.json`, `OWSPublicAPI/appsettings.json` |
| **Catégorie** | Secrets exposés en clair |

**Description**  
Cinq fichiers `appsettings.json` contiennent des credentials en clair, apparemment versionnés dans le dépôt :

```json
// Présent dans TOUS les microservices
"OWSDBConnectionString": "Server=host.docker.internal;Database=OpenWorldServer;User Id=SA;Password=yourStrong(!)Password;..."
"RabbitMQPassword": "test"
```

Le compte `SA` (System Administrator) de SQL Server est le compte le plus privilégié. Le mot de passe `yourStrong(!)Password` semble être un mot de passe de développement/template. Le mot de passe RabbitMQ `test` est trivial.

**Exploitation possible**  
Si le dépôt Git est exposé (même partiellement via une fuite), un attaquant obtient un accès administrateur complet à la base de données (`SA` = DBA) et au message broker (RabbitMQ). Cela permet :
- Lecture/modification/suppression de toutes les données joueurs.
- Envoi de faux messages RabbitMQ pour spawner ou arrêter des instances de serveur.

**Mise à jour 2026-04-07 :** Le fichier `Config/DefaultGame.ini` (côté UE5) contient désormais une **vraie clé OWSAPICustomerKey** (anciennement un placeholder). Ce fichier est versionné dans Git. La surface d'exposition des secrets s'étend donc au-delà des `appsettings.json` OWS — le client UE5 lui-même embarque un secret réel dans un fichier commité.

**Correction recommandée**  
1. **Immédiat** : Vérifier que les fichiers `appsettings.json` sont dans `.gitignore`.
2. **Immédiat** : Retirer `OWSAPICustomerKey` de `DefaultGame.ini` et le charger depuis un fichier non versionné ou une variable d'environnement.
3. Utiliser les variables d'environnement ou les secrets Docker/Kubernetes pour les credentials.
4. Remplacer le compte `SA` par un compte SQL dédié avec permissions minimales (SELECT/INSERT/UPDATE/DELETE uniquement sur la base OWS).
5. Changer le mot de passe RabbitMQ pour un secret fort aléatoire.
6. Utiliser `.NET User Secrets` en développement local.

---

### OWS-10 — Swagger UI exposé en production sur tous les microservices

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Moyenne** |
| **Fichier** | Tous les `Startup.cs` |
| **Catégorie** | Exposition de surface d'attaque |

**Description**  
Tous les microservices activent `app.UseSwagger()` et `app.UseSwaggerUI()` sans condition d'environnement. En production, Swagger expose la documentation complète de toutes les APIs, facilitant la reconnaissance par un attaquant.

```csharp
// Startup.cs — tous les microservices, pas de condition env.IsDevelopment()
app.UseSwagger();
app.UseSwaggerUI(c => { c.SwaggerEndpoint("./v1/swagger.json", "..."); });
```

**Exploitation possible**  
Un attaquant découvrant l'URL d'un microservice interne obtient instantanément la liste de tous les endpoints, paramètres et types de retour — réduisant significativement le temps de reconnaissance.

**Correction recommandée**  
Conditionner Swagger à l'environnement de développement :
```csharp
if (env.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(...);
}
```

---

### OWS-11 — `UseHttpsRedirection` commenté sur les microservices internes

| Champ | Valeur |
|-------|--------|
| **Sévérité** | **Faible** |
| **Fichier** | `OWSCharacterPersistence/Startup.cs` (l.108), `OWSInstanceManagement/Startup.cs` (l.108) |
| **Catégorie** | Transport non chiffré |

**Description**  
```csharp
//app.UseHttpsRedirection(); // commenté dans CharacterPersistence et InstanceManagement
```

Les communications entre microservices transitent en HTTP clair. Dans un environnement Docker/K8s avec réseau interne isolé, ce risque est atténué, mais constitue une mauvaise pratique si le réseau interne est compromis (attaque latérale).

**Correction recommandée**  
Activer HTTPS avec des certificats internes (mTLS service mesh, ou certificats auto-signés gérés par Kubernetes Secrets). En attente, documenter explicitement que ces services ne sont accessibles que sur réseau privé.

---

## 8. Tableau récapitulatif

| ID | Titre | Composant | Sévérité |
|----|-------|-----------|----------|
| UE-01 | `Server_SetFlySpeed` sans validation de borne | UE5 GAS Character | **Critique** |
| UE-02 | `Server_OpenSupplyPod` — `_Validate` triviale + Unreliable | UE5 PlayerController | **Haute** |
| UE-03 | `Server_OpenContainer` — `_Validate` triviale | UE5 PlayerController | **Haute** |
| UE-04 | `HWSwimmingComponent` — `HasAuthority()` dans `_Validate` | UE5 Swimming | **Moyenne** |
| UE-05 | `GetFirstPlayerController()` dans des acteurs de monde | UE5 Container/SupplyPod/Env | **Moyenne** |
| UE-06 | `Server_TravelToZone` — ZoneName non whitelisté | UE5 PlayerController | **Moyenne** |
| UE-07 | `OWSAPICustomerKey` réelle exposée en BlueprintReadWrite + commitée dans DefaultGame.ini | UE5 PlayerController | **Haute** |
| UE-08 | `ServerMoveItem` — propriété du TargetInventory non vérifiée | UE5 Inventory | **Haute** |
| UE-09 | `EditAnywhere` sur fast arrays répliqués | UE5 PlayerController | **Faible** |
| OWS-01 | `UseAuthorization` commenté sur 3 microservices | OWS CharPersistence/InstanceMgmt/GlobalData | **Critique** |
| OWS-02 | `RemoveCharacter` — IDOR, propriété non vérifiée | OWS PublicAPI | **Haute** |
| OWS-03 | `SetSelectedCharacter` — personnage d'un autre joueur | OWS PublicAPI | **Haute** |
| OWS-04 | Rate limiting absent sur microservices internes | OWS Microservices | **Moyenne** |
| OWS-05 | `RegisterUser` — validation d'entrée non appliquée | OWS PublicAPI | **Moyenne** |
| OWS-06 | `UpdateAllPlayerPositions` — parsing unsafe | OWS CharPersistence | **Haute** |
| OWS-07 | `UpdateCharacterStats` — God Mode, currency fraud | OWS CharPersistence | **Critique** |
| OWS-08 | Injection SQL — risque atténué par Dapper | OWS Data Layer | **Faible** |
| OWS-09 | Secrets en dur dans `appsettings.json` | OWS Configuration | **Critique** |
| OWS-10 | Swagger UI en production | OWS Tous microservices | **Moyenne** |
| OWS-11 | HTTPS désactivé sur microservices internes | OWS CharPersistence/InstanceMgmt | **Faible** |

---

## 9. Plan d'action priorisé

### Phase 1 — Immédiat (avant tout déploiement en staging)

1. **[OWS-09]** Sortir les `appsettings.json` du dépôt Git. Utiliser les variables d'environnement. Changer tous les mots de passe.
2. **[UE-07]** Retirer la vraie `OWSAPICustomerKey` de `DefaultGame.ini` (fichier commité). Charger depuis un fichier non versionné ou variable d'environnement.
3. **[OWS-07]** Ajouter une vérification de session sur `UpdateCharacterStats`. Protéger les champs monétaires.
4. **[UE-01]** Ajouter `Server_SetFlySpeed_Validate` avec bornes de vitesse max.
5. **[OWS-01]** Implémenter une authentification serveur-à-serveur pour les microservices internes.

### Phase 2 — Court terme (sprint suivant)

5. **[OWS-02]** Vérifier la propriété du personnage avant suppression.
6. **[OWS-03]** Vérifier que le personnage sélectionné appartient à la session.
7. **[UE-08]** Valider la propriété de `TargetInventoryOwner` dans `ServerMoveItem`.
8. **[UE-02/03]** Corriger les RPCs `Server_OpenSupplyPod` et `Server_OpenContainer`.
9. **[OWS-06]** Réécrire le parsing de `UpdateAllPlayerPositions` avec TryParse et validation.

### Phase 3 — Moyen terme

10. **[OWS-04]** Rate limiting Redis distribué sur tous les microservices.
11. **[UE-04]** Corriger les `_Validate` de HWSwimmingComponent.
12. **[UE-05]** Remplacer les `GetFirstPlayerController()` par des paramètres contextuels.
13. **[UE-06]** Whitelist des zones valides dans `Server_TravelToZone_Validate`.
14. **[OWS-05]** Appliquer la validation d'entrée dans `RegisterUser`.
15. **[OWS-10]** Conditionner Swagger à l'environnement de développement.

### Phase 4 — Hygiène continue

16. **[UE-09]** Passer les fast arrays répliqués en `VisibleAnywhere`.
17. **[OWS-11]** Activer HTTPS ou documenter le périmètre réseau isolé.

---

*Document généré suite à l'audit statique du 2026-04-04. À mettre à jour après implémentation des corrections.*

---

## Voir aussi

- [[Network Replication Audit]] — section 2.2 corrèle UE-02 (`Server_OpenSupplyPod` Unreliable, `HWPlayerController.h:216`) avec NET-002, et UE-04 (validations `HasAuthority()` dans `HWSwimmingComponent.cpp:188-216`) avec NET-011.
- [[Cross System Framework World]] — documente `AHWPlayerController` comme God Object concentrant la surface d'attaque des RPCs UE-02/UE-03/UE-06/UE-07 (`Server_OpenSupplyPod`, `Server_OpenContainer`, `Server_TravelToZone`, `OWSAPICustomerKey`).
- [[Cross System Character Inventory]] — analyse `HWInventoryComponent::ApplyEquipmentStats` et le passage via PlayerController ciblés par UE-08 (`ServerMoveItem_Validate` sans vérification de propriété du `TargetInventoryOwner`).
- [[Technical Debt Active]] — section 6 documente la race condition persistence logout (`BagInventory`/`EquipmentInventory` non flushés, HWPlayerController.cpp:151-154) et section 10.5 la suppression de `UHWCharacterCustomComponent`, pertinentes pour la surface d'attaque OWS.
