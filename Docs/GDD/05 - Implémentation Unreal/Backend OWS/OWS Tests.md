---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# OWSTests

> Tests unitaires du backend OWS — 17 tests dans 4 classes via xUnit 2.4.2 cible .NET 6. Le projet cible `OWSShared`.

## Vue d'ensemble

Le backend OWS est compose de 9 microservices. La suite de tests se concentre sur `OWSShared` (middleware, validations, interfaces). Total identifie : **17 tests unitaires** dans 4 classes.

## Middleware — RateLimiting

**Fichier** : `OWSTests/Middleware/RateLimitingTests.cs`
**Classe testee** : `OWSShared.Middleware.RateLimitingMiddleware`
**Mecanisme** : Limite par IP via `IMemoryCache`, fenetre glissante 60s, seuil 60 req/min.

| # | Test | Scenario | Resultat attendu |
|---|---|---|---|
| 1 | `RateLimiting_UnderLimit_PassesThrough` | 1 requete 127.0.0.1 | HTTP 200 |
| 2 | `RateLimiting_OverLimit_Returns429` | 61 requetes consecutives meme IP | HTTP 429 — derniere bloquee |
| 3 | `RateLimiting_DifferentIPs_IndependentLimits` | IP A epuise quota, IP B envoie 1 | IP B HTTP 200 |

**Constante verifiee** : `MaxRequestsPerMinute = 60`. Le header `Retry-After: 60` n'est pas verifie dans les assertions actuelles.

## Middleware — StoreCustomerGUID

**Fichier** : `OWSTests/Middleware/StoreCustomerGUIDMiddlewareTests.cs`
**Classe testee** : `OWSShared.Middleware.StoreCustomerGUIDMiddleware`
**Mecanisme** : extraction et validation du header `X-CustomerGUID`. Injecte dans `IHeaderCustomerGUID` pour les controleurs en aval.

| # | Test | Scenario | Resultat attendu |
|---|---|---|---|
| 4 | `MissingHeader_Returns401` | Pas de header | HTTP 401 |
| 5 | `InvalidGUID_Returns401` | Header `not-a-valid-guid` | HTTP 401 |
| 6 | `EmptyGUID_Returns401` | `Guid.Empty` | HTTP 401 |
| 7 | `ValidGUID_PassesThrough` | GUID aleatoire | `next` appele |
| 8 | `ValidGUID_StoresCorrectGUID` | GUID valide | `IHeaderCustomerGUID.CustomerGUID` contient la valeur exacte |

## Validation — InputValidation

**Fichier** : `OWSTests/Validation/InputValidationTests.cs`
**Classe testee** : `OWSShared.Implementations.DefaultPublicAPIInputValidation`
**Interface** : `IPublicAPIInputValidation`

Chaque methode retourne chaine vide si valide, ou message d'erreur.

### ValidateEmail

Utilise `System.Net.Mail.MailAddress`.

| # | Donnees | Attendu |
|---|---|---|
| 9 | `test@example.com`, `user@domain.org` | Valide |
| 10 | `""`, `invalid`, `@domain.com`, `user@` | Erreur |

### ValidatePassword

**Regles** : min 8 chars, 1 majuscule, 1 minuscule, 1 chiffre.

| # | Donnees | Attendu |
|---|---|---|
| 11 | `Password1`, `Str0ngP@ss`, `MyP4ssword` | Valide |
| 12 | `""`, `short`, `alllowercase1`, `ALLUPPERCASE1`, `NoDigitsHere` | Erreur |

### ValidateFirstName / ValidateLastName

**Regles** : non vide, 1-50 chars, lettres Unicode + espaces + apostrophe + tiret.

| # | Donnees | Attendu |
|---|---|---|
| 13-14 | `John`, `Jean-Pierre`, `O'Brien` (valide) ; `""`, `null` (erreur) | — |
| 15-16 | `Doe`, `O'Connor`, `De La Cruz` (valide) ; `""`, `null` (erreur) | — |

### ValidateCharacterName

**Regles** : min 4 chars, `^\w+$` (lettres/chiffres/underscore).

| # | Donnees | Attendu |
|---|---|---|
| 17 | `ValidCharacter`, `Player_123`, `Test1234` | Valide |
| 18 | `""`, `ab`, `name with spaces!` | Erreur |

## Options — OptionsValidation

**Fichier** : `OWSTests/Options/Validation/OptionsValidationTests.cs`
**Mecanisme** : `ValidationExtensions.ValidationErrors()` de `OWSShared.Extensions`
**Systeme** : `Microsoft.Extensions.Options` avec `DataAnnotations`
**Config test** : `appsettings.json` contient `{"TestOptions":{"Field":"Value"}}`

| # | Test | Scenario | Attendu |
|---|---|---|---|
| 19 | `Option_Field_Is_Required` | `[Required]` present | Valeur lue, 0 erreur |
| 20 | `Option_Field_Is_Of_Type` | `[DataType(Text)]` present | 0 erreur |
| 21 | `Option_Field_Is_Required_Failed` | `[Required]` absent | 1 erreur `"Field Is Required"` |
| 22 | `Option_Field_Is_Of_Type_Failed` | Non numerique attendu numerique | 1 erreur `"Field is not numeric"` |
| 23 | `Option_Field_Mutiple_Errors` | 2 `[Required]` absents | 2 erreurs |

**Integration** : `ServiceCollectionExtensions.ConfigureAndValidate<T>()` utilise ce mecanisme en production.

## Systemes OWSShared non testes

Aucun test pour :

| Composant | Risque |
|---|---|
| `HWRedisCacheService` | **Eleve** — cache Redis, 4 TTL, gestion d'erreurs silencieuse |
| `DefaultPublicAPICharacterDataValidation` | **Eleve** — retourne toujours `true` (stub "NOT safe for production") |
| `HubWorldMMOPublicAPICharacterDataValidation` | **Moyen** — validation partielle (HairColor non validee) |
| `InternalAPICallsService` | **Moyen** — HTTP interne vers InstanceManagement |
| `ServiceCollectionExtensions` | Faible |
| `OperatingSystemExtensions` | Inconnu |
| `WritableOptions<T>` | Faible |

## Couverture par microservice

| Microservice | Tests | Couverture |
|---|---|---|
| `OWSShared` middleware | 8 | Partielle |
| `OWSShared` validation | 15 | Partielle |
| `OWSPublicAPI` | 0 | Minimale (1 benchmark) |
| `OWSCharacterPersistence` | 0 | **Aucune** |
| `OWSInstanceManagement` | 0 | **Aucune** |
| `OWSInstanceLauncher` | 0 | **Aucune** |
| `OWSGlobalData` | 0 | **Aucune** |
| `OWSManagement` | 0 | **Aucune** |
| `OWSExternalLoginProviders` | 0 | **Aucune** |
| `OWSData` | 0 | **Aucune** |

## Recommandations prioritaires

**P1 immediat** :
1. Tests unitaires `HWRedisCacheService` avec `IDatabase` mocke (Moq/NSubstitute) — 4 CRUD + 4 TTL
2. Test regression `DefaultPublicAPICharacterDataValidation` documentant le stub non securise
3. Completer `HubWorldMMOPublicAPICharacterDataValidation` (valider HairColor)

**P2 court terme** :
4. Benchmarks `GetCharacterStatsByName`, `GetZoneInstancesByZoneName`
5. Tests integration pipeline middleware `RateLimiting` + `StoreCustomerGUID` via `WebApplicationFactory`
6. Test `InternalAPICallsService` avec `HttpClientFactory` mocke

**P3 moyen terme** :
7. Couverture cas limites (longueurs exactes, Unicode, IP nulle)
8. Tests integration flux complets (inscription → session → chargement)
9. Benchmark concurrent (N clients simultanes)

## Voir aussi

- [[OWS Benchmarks]] — 1 benchmark `GetUserSessionTime` dans `OWSBenchmarks/ResponseBenchmarks.cs` complète les 17 tests unitaires d'`OWSShared` décrits ici ; couverture perf vs couverture fonctionnelle.
- [[OWS Architecture]] — les tests `RateLimitingMiddleware` et `StoreCustomerGUIDMiddleware` valident des composants que le flux `LoginAndCreateSession` multi-tenant (`X-CustomerGUID`) traverse pour chaque requête HTTP.
- [[OWS Player Controller Component]] — couverture zéro pour `OWSCharacterPersistence`/`OWSInstanceManagement`/`OWSGlobalData` signifie que les `UOWSPlayerControllerComponent` méthodes (`GetCharacterData`, `UpdateCharacterStats`, `GetZoneServerToTravelTo`) ne sont testées que manuellement via l'intégration UE5.
- [[Instance Launcher]] — aucun test pour `OWSInstanceLauncher` ni pour les messages RabbitMQ `ows.serverspinup.{worldServerId}` décrits dans cette page voisine.
- [[Docker]] — les tests xUnit ne requièrent pas Docker (pur in-memory), contrairement au benchmark qui nécessite `localhost:44303` (IIS Express ou conteneur démarré).
