---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# OWSBenchmarks

> Benchmarks de performance HTTP ciblant `OWSPublicAPI`. Framework : BenchmarkDotNet 0.13.1, cible .NET 6.

## Projet OWSBenchmarks

**Fichier** : `OWSBenchmarks/ResponseBenchmarks.cs`
**Entrypoint** : `OWSBenchmarks/Program.cs` — execute `BenchmarkRunner.Run<ResponseBenchmarks>()`
**Attributs BenchmarkDotNet** : `[InProcess]`, `[MemoryDiagnoser]`

## Configuration du benchmark

- **WebApplicationFactory** : instancie `OWSPublicAPI.Startup` en memoire avec logs desactives (`logging.ClearProviders()`).
- **Header** : `X-CustomerGUID: EEE65F97-BAB1-482E-8439-9A14AE7366B5` (GUID de test hardcode).
- **Endpoint cible** : `GET https://localhost:44303/api/Users/GetUserSession?UserSessionGUID=147DBA25-5689-42A4-A52D-8621F17BB99D`

## Benchmark mesure

| Benchmark | Methode | Description |
|---|---|---|
| `GetUserSessionTime` | `GET /api/Users/GetUserSession` | Temps de reponse HTTP de bout en bout pour recuperer une session utilisateur par GUID |

**Metriques collectees** :
- Temps moyen d'execution (Mean)
- Erreur standard et ecart-type
- Mediane
- Allocations memoire managee (via `[MemoryDiagnoser]`)

## Observations

- La methode `POST` alternative est commentee dans le code : le benchmark a ete concu pour tester les deux verbes HTTP mais seul GET est actif.
- L'URL cible `localhost:44303` indique que le benchmark necessite un environnement IIS Express ou un serveur local actif. Il ne peut pas s'executer de maniere totalement autonome.
- `postContent = new StringContent("")` est initialise mais inutilise dans le benchmark actif.

## Benchmarks manquants

| Endpoint | Priorite |
|---|---|
| `POST /api/Characters/GetAllCharacters` | Haute — requete frequente |
| `POST /api/Characters/GetCharacterStatsByName` | Haute — chargement combat |
| `POST /api/Zone/GetZoneInstancesByZoneName` | Haute — transition de zone |
| `POST /api/Users/RegisterUser` | Moyenne — inscription |
| `POST /api/Characters/CreateCharacter` | Moyenne |
| Benchmark charge Redis (`GetAsync`/`SetAsync`) | Haute — cache critique |
| Benchmark sous concurrence (N clients simultanes) | Haute — contexte MMO |

## Tests d'integration manquants

Aucun test d'integration n'existe. Scenarios non couverts :
- Flux complet : `RegisterUser` → `GetUserSession` → `GetCharacter`
- Transition zone : `GetZoneInstancesByZoneName` → `InternalAPICallsService.RequestServerSpinUp`
- Pipeline middleware complet : `RateLimitingMiddleware` + `StoreCustomerGUIDMiddleware` en chaine
- Fallback cache Redis (Redis indisponible → base de donnees)

## Couverture actuelle

| Categorie | Tests | Lacune |
|---|---|---|
| Rate Limiting HTTP | 3 | Pas de test IP `null` |
| Authentification (GUID tenant) | 5 | Pas de case-insensitivity |
| Validation saisie | 10 | Pas de Unicode dans noms perso |
| Validation options config | 5 | Options imbriquees absents |
| Cache Redis | 0 | **Aucun test** |
| Persistance personnage | 0 | **Aucun test** |
| Gestion d'instances | 0 | **Aucun test** |
| Messages RabbitMQ | 0 | **Aucun test** |
| Sessions utilisateur | 0 (benchmark seul) | Pas de test fonctionnel |
| Benchmarks API | **1** (GetUserSession) | 1 seul endpoint |

**Total : 23 tests unitaires + 1 benchmark.**

## Voir aussi

- [[OWS Tests]] — complémentaire : 17 tests unitaires xUnit couvrent `RateLimitingMiddleware`, `StoreCustomerGUIDMiddleware`, `DefaultPublicAPIInputValidation` et `ValidationExtensions` — tous ciblent `OWSShared` alors que ce benchmark cible `OWSPublicAPI.Startup`.
- [[OWS Architecture]] — l'endpoint `GET /api/Users/GetUserSession?UserSessionGUID=...` mesuré ici est exposé par le microservice `owspublicapi` dont l'architecture est détaillée dans ce hub.
- [[OWS Player Controller Component]] — côté UE5, `UOWSGameInstance::UserSessionGUID` est le GUID que `GetUserSession` (endpoint mesuré) valide et renvoie.
- [[Instance Launcher]] — les benchmarks manquants `POST /api/Zone/GetZoneInstancesByZoneName` et `InternalAPICallsService.RequestServerSpinUp` listés ici impliquent directement le launcher (étape 5 du flux connexion).
- [[Docker]] — `WebApplicationFactory` lance `OWSPublicAPI.Startup` en mémoire sans Docker ; ce benchmark est un complément in-process au déploiement Docker Compose décrit là-bas.
