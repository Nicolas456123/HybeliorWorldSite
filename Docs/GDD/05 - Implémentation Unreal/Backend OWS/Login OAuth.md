---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# LoginOAuth

> Module `OWSExternalLoginProviders` : abstraction unifiee pour l'authentification via fournisseurs externes. Pattern Factory + Strategy. Source : `OWS/src/OWSExternalLoginProviders/`.

## Vue d'ensemble

Bibliotheque .NET 6.0 qui fournit une abstraction pour l'authentification des joueurs via des fournisseurs d'identite externes. S'integre au pipeline OWS et delegue la verification d'identite a des services tiers.

Pattern : fabrique centrale `ExternalLoginProviderFactory` distribue les implementations concretes selon le nom demande, toutes conformes a `IExternalLoginProvider`.

## Architecture

```
OWSExternalLoginProviders/
├── Interfaces/
│   ├── IExternalLoginProvider.cs
│   └── IExternalLoginProviderFactory.cs
├── Internal/
│   └── ExternalLoginProvider.cs        -- Classe de base abstraite generique
├── Implementations/
│   ├── EpicOnlineServicesLoginProvider.cs
│   └── XsollaLoginProvider.cs          -- Stub vide
├── Extensions/
│   └── ExternalLoginProviderFactory.cs
├── Options/
│   ├── ExternalLoginProviderOptions.cs
│   └── EpicOnlineServicesOptions.cs
├── Responses/
│   └── ExternalLoginProviderResponse.cs
└── OWSExternalLoginProviders.csproj
```

**Flux general** :

```
Client de jeu → OWS API Controller → IExternalLoginProviderFactory.Get("...")
  → IExternalLoginProvider.AuthenticateAuthorizationCodeAsync(code)
  → OAuth API externe (https://api.epicgames.dev/epic/oauth/v1/token)
  → ExternalLoginProviderResponse { AccessToken }
  → IExternalLoginProvider.VerifyToken(accessToken)
  → Session OWS ouverte
```

## IExternalLoginProvider — Contrat public

| Methode | Signature | Role |
|---|---|---|
| `AuthenticationRedirect` | `RedirectResult (string state)` | Redirige vers la page de connexion du fournisseur (flux OAuth Authorization Code) |
| `AuthenticatePasswordAsync` | `Task<Response>(username, password, ct)` | Grant type ROPC (deprecie OAuth 2.1) |
| `AuthenticateAuthorizationCodeAsync` | `Task<Response>(code, ct)` | Echange authorization_code → access token (voir [[Login Epic]]) |
| `AuthenticateAuthorizationExchangeAsync` | `Task<Response>(exchange_code, ct)` | Exchange code proprietaire Epic launcher |
| `AuthenticateDeviceToken` | `Task<Response>(token, ct)` | Device token (consoles, sans navigateur) |
| `TwoFactorAuthentication` | `Task<Response>(method, code, ct)` | 2FA (`totp`, `sms`, `email`) |
| `VerifyToken` | `Task<bool>(token, ct)` | **Central pour securite** : doit etre appele avant toute session |

## IExternalLoginProviderFactory

| Methode | Signature | Description |
|---|---|---|
| `Get` | `IExternalLoginProvider Get(string name)` | Recupere un fournisseur enregistre |
| `Register<TImplementation>` | `void (string name) where TImpl : IExternalLoginProvider` | Enregistre |
| `IsValid` | `bool (string name)` | Verifie enregistrement |

Noms : constantes dans `ExternalLoginProviderOptions` (`"EpicOnlineServices"`, `"Xsolla"`). Resolution insensible a la casse (`StringComparer.OrdinalIgnoreCase`).

## Classe abstraite `ExternalLoginProvider<TOptions>`

Base generique qui implemente `IExternalLoginProvider`.

| Propriete injectee | Type | Description |
|---|---|---|
| `Options` | `TOptions` | Config specifique, resolue par nom via `IOptionsSnapshot<TOptions>.Get(ProviderName)` |
| `HttpClientFactory` | `IHttpClientFactory` | Clients HTTP isoles |
| `MemoryCache` | `IMemoryCache` | Cache JWKS |

```csharp
protected ExternalLoginProvider(
    string ProviderName,
    IOptionsSnapshot<TOptions> Options,
    IHttpClientFactory HttpClientFactory,
    IMemoryCache MemoryCache)
```

`ProviderName` est la cle pour recuperer la config nommee dans `appsettings.json`. Toutes les methodes de l'interface sont `abstract`.

## ExternalLoginProviderFactory — implementation

Basee sur **SimpleInjector** :

```csharp
private readonly Dictionary<string, InstanceProducer<IExternalLoginProvider>> _externalLoginProviders
    = new(StringComparer.OrdinalIgnoreCase);
```

- Stockes dans un dictionnaire insensible a la casse
- Chaque entree : `InstanceProducer<IExternalLoginProvider>` avec lifestyle **Transient**
- `Register<TImplementation>` verifie unicite via `IsValid()`. En cas de doublon : erreur Serilog, pas d'exception.

**Cycle de vie Transient** : coherent avec `IOptionsSnapshot` Scoped. Resolution Transient depuis Scoped est sure. Chaque resolution obtient la config courante de la requete HTTP.

## Options de configuration

### `ExternalLoginProviderOptions` (abstraite)

| Constante | Valeur | Description |
|-----------|--------|-------------|
| `SectionName` | `"ExternalLoginProviderConfig"` | Racine `appsettings.json` |
| `EpicOnlineServices` | `"EpicOnlineServices"` | Nom fournisseur EOS |
| `Xsolla` | `"Xsolla"` | Nom fournisseur Xsolla |

## `ExternalLoginProviderResponse`

DTO unifie retourne par toutes les methodes.

| Propriete | Type | Description |
|-----------|------|-------------|
| `IsError` | `bool` | `true` si erreur |
| `ErrorDescription` | `string` | Description (null si ok) |
| `TwoFactorAuthenticationRequired` | `bool` | `true` si etape 2FA requise |
| `TwoFactorAuthenticationMethod` | `string` | `"totp"`, `"sms"`, ... |
| `AccessToken` | `string` | Token d'acces |

**Logique recommandee** :

```csharp
var response = await provider.AuthenticateAuthorizationCodeAsync(code, ct);
if (response.IsError) { /* traiter response.ErrorDescription */ return; }
if (response.TwoFactorAuthenticationRequired) {
    // demander code 2FA, puis provider.TwoFactorAuthentication(method, code, ct)
    return;
}
// utiliser response.AccessToken
```

## Gestion des erreurs

Toutes erreurs encapsulees dans le DTO plutot qu'exceptions. Gestion unifiee cote appelant.

| Scenario | `IsError` | `ErrorDescription` |
|---|---|---|
| Erreur API Epic (token invalide/expire, reseau) | `true` | Fourni par Epic |
| Grant type non supporte (Password, Device, 2FA sur EOS) | `true` | Message explicite |
| Erreur inconnue | `true` | `"An Unknown Error Occurred, Failed To Process Authentication Request."` |

## Grant types par fournisseur

| Grant Type | Methode interface | EOS | Xsolla |
|------------|-------------------|-----|--------|
| Authorization Code | `AuthenticateAuthorizationCodeAsync` | Supporte | Non implemente |
| Exchange Code (proprietaire Epic) | `AuthenticateAuthorizationExchangeAsync` | Supporte | Non implemente |
| Resource Owner Password | `AuthenticatePasswordAsync` | Non (2FA requise) | Non implemente |
| Device Token | `AuthenticateDeviceToken` | Non | Non implemente |
| Redirect OAuth | `AuthenticationRedirect` | Supporte | Non implemente |
| Two-Factor Auth | `TwoFactorAuthentication` | Non | Non implemente |
| Token Verification | `VerifyToken` | Supporte (online + offline fallback) | Non implemente |

## Dependances NuGet

| Package | Version | Usage |
|---------|---------|-------|
| `IdentityModel` | 6.1.0 | Clients OAuth 2.0 (`RequestUrl`, `AuthorizationCodeTokenRequest`, introspection, Basic Auth) |
| `IdentityModel.AspNetCore` | 4.3.0 | Integration ASP.NET Core |
| `Serilog` | 2.12.0 | Logging dans la factory |
| `SimpleInjector` | 5.4.1 | IoC dans `ExternalLoginProviderFactory` |

**Implicites** (.NET 6.0) : `Microsoft.AspNetCore.Mvc` (`RedirectResult`), `Microsoft.Extensions.Caching.Memory`, `Microsoft.Extensions.Options`, `Microsoft.IdentityModel.Tokens`.

## Voir aussi

- [[Login Epic]] — implémentation concrète de `ExternalLoginProvider<EpicOnlineServicesOptions>` : code `AuthenticateAuthorizationCodeAsync`, `VerifyToken` (dual online/offline), cache JWKS 24h — exemple de référence pour cette abstraction.
- [[Login Xsolla Stub]] — cas opposé : `XsollaLoginProvider` stub n'hérite pas de la classe abstraite décrite ici, illustrant ce qu'il ne faut pas faire pour rester conforme à `IExternalLoginProvider`.
- [[OWS Architecture]] — `IExternalLoginProvider` apparaît dans la section "Auth Externe" comme voie alternative à `PlayerLoginAndCreateSession` (flux standard OWS).
- [[SQL Users]] — après `VerifyToken` réussi, l'intégration réutilise `UserSessions` (même table que `PlayerLoginAndCreateSession`) pour ouvrir la session OWS.
- [[OWS Player Controller Component]] — côté UE5, `UOWSGameInstance` reçoit l'`AccessToken` retourné dans `ExternalLoginProviderResponse` et le stocke dans `UserSessionGUID`.
