---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# LoginEpic

> Fournisseur `EpicOnlineServicesLoginProvider` — implementation complete pour Epic Online Services (EOS). Source : `OWS/src/OWSExternalLoginProviders/Implementations/EpicOnlineServicesLoginProvider.cs`.

## Classe

```csharp
public class EpicOnlineServicesLoginProvider : ExternalLoginProvider<EpicOnlineServicesOptions>
```

## Constructeur

```csharp
public EpicOnlineServicesLoginProvider(
    IOptionsSnapshot<EpicOnlineServicesOptions> Options,
    IHttpClientFactory Httpclientfactory,
    IMemoryCache MemoryCache)
    : base(ExternalLoginProviderOptions.EpicOnlineServices, Options, Httpclientfactory, MemoryCache)
```

Passe la cle `"EpicOnlineServices"` a la classe de base pour resoudre les options nommees.

## Options — `EpicOnlineServicesOptions`

Herite de `ExternalLoginProviderOptions`. Toutes marquees `[Required]` doivent etre presentes dans `appsettings.json`.

| Propriete | Requis | Description |
|-----------|--------|-------------|
| `ClientId` | Oui | Identifiant client OAuth de l'application EOS |
| `ClientSecret` | Oui | Secret client pour authentification HTTP Basic |
| `DeploymentId` | Oui | Identifiant de deploiement EOS (Dev/Staging/Prod) |
| `RedirectUri` | Non | URI de callback apres authentification (obligatoire pour Authorization Code) |

### Config `appsettings.json`

```json
{
  "ExternalLoginProviderConfig": {
    "EpicOnlineServices": {
      "ClientId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "ClientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "DeploymentId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "RedirectUri": "https://votre-serveur-ows.com/auth/epic/callback"
    }
  }
}
```

**Securite** : `ClientSecret` et `ClientId` ne doivent jamais etre exposes cote client. Config exclusivement serveur (backend OWS).

## Flux AuthenticationRedirect

```
GET /id/authorize?client_id=...&response_type=code&scope=basic_profile&redirect_uri=...&state=...
    --> https://www.epicgames.com/id/authorize
```

Construit l'URL via `RequestUrl.CreateAuthorizeUrl()` (IdentityModel) avec :
- `responseType = "code"` — flux standard OAuth 2.0
- `scope = "basic_profile"` — portee minimale
- `state` — token anti-CSRF transmis tel quel

## Flux AuthenticateAuthorizationCodeAsync

**Endpoint** : `POST https://api.epicgames.dev/epic/oauth/v1/token`

**Auth client** : HTTP Basic Authentication (`ClientId:ClientSecret`) encodee RFC 6749.

**Corps** :

| Parametre | Valeur |
|-----------|--------|
| `grant_type` | `authorization_code` |
| `code` | Le code recu depuis Epic |
| `redirect_uri` | URI configure |
| `deployment_id` | ID deploiement EOS |
| `scope` | `"basic profile"` |

**Succes** : `response.AccessToken = request.AccessToken`.

## Flux AuthenticateAuthorizationExchangeAsync

**Endpoint** : `POST https://api.epicgames.dev/epic/oauth/v1/token`

**Grant type proprietaire Epic** : `exchange_code` (non standard OAuth 2.0).

| Parametre | Valeur |
|-----------|--------|
| `grant_type` | `exchange_code` |
| `exchange_code` | Code d'echange fourni par l'app Epic source |
| `deployment_id` | ID deploiement EOS |
| `scope` | `"basic profile"` |

**Usage** : joueur s'authentifie dans le launcher Epic Games → genere exchange code → jeu recupere ce code et l'envoie a OWS pour obtenir access token EOS.

> **Attention — bug potentiel** : en cas de succes, `response.AccessToken` n'est pas explicitement assigne dans le code actuel (seul `IsError` est gere en cas d'erreur). La ligne `response.AccessToken = request.AccessToken;` est manquante par rapport a `AuthenticateAuthorizationCodeAsync`.

## Methodes non supportees (EOS)

| Methode | Comportement |
|---------|-------------|
| `AuthenticatePasswordAsync` | `IsError = true` — grant type non supporte (code commente indique besoin de 2FA Epic non disponible) |
| `AuthenticateDeviceToken` | `IsError = true` — non supporte par EOS |
| `TwoFactorAuthentication` | `IsError = true` — 2FA non supportee |

## Cache JWKS (Epic)

Pour la verification offline des JWT Epic, les cles JWKS sont mises en cache :

```csharp
await MemoryCache.GetOrCreateAsync("epicgames.jwks", entry => {
    entry.AbsoluteExpiration = DateTimeOffset.Now.AddDays(1);
    return Task.FromResult(jwks_result);
});
```

- **Cle cache** : `"epicgames.jwks"`
- **TTL** : 24 heures (expiration absolue)
- **Source** : `GET https://api.epicgames.dev/epic/oauth/v1/.well-known/jwks.json`

Evite un appel reseau a chaque verification. Rotation JWKS Epic rare → 24h bon compromis.

## VerifyToken — Strategie a deux niveaux

### Niveau 1 — Vérification online (introspection)

```
POST https://api.epicgames.dev/epic/oauth/v1/tokenInfo
```

Appel d'introspection standard OAuth 2.0. Retourne `request.IsActive`.

### Niveau 2 — Vérification offline (JWT local)

Declenche si niveau 1 echoue :

1. Recuperation JWKS depuis cache memoire (ou appel reseau si cache vide)
2. Validation JWT locale avec `JwtSecurityTokenHandler`
3. Verification des claims `aud` (ClientId) et `pfdid` (DeploymentId)

Si JWKS echoue (HTTP non 200) : `VerifyToken` retourne `false` immediatement.

### Parametres de `TokenValidationParameters`

| Parametre | Valeur | Description |
|-----------|--------|-------------|
| `ValidateIssuerSigningKey` | `true` | Signature via cle JWKS Epic |
| `ValidateAudience` | `false` | Validation manuelle via claim `aud` |
| `ValidateLifetime` | `true` | Expiration (`exp`) |
| `ValidIssuer` | `"https://api.epicgames.dev/epic/oauth/v1"` | Emetteur |
| `IssuerSigningKey` | `jwks.Keys.First()` | **Premiere cle uniquement** |

> **Limitation** : `jwks.Keys.First()` n'itere pas sur toutes les cles. En cas de rotation de cle Epic (plusieurs cles actives), la verification pourrait echouer. Une implementation plus robuste utiliserait `IssuerSigningKeys = jwks.Keys` (pluriel).

### Verification des claims applicatifs

```csharp
Claim clientId    = claims.Where(x => x.Type == "aud").FirstOrDefault();
Claim deploymentId = claims.Where(x => x.Type == "pfdid").FirstOrDefault();

if (clientId.Value == Options.ClientId && deploymentId.Value == Options.DeploymentId)
    return true;
```

- `aud` : audience → doit matcher `ClientId` configure
- `pfdid` : product fulfillment deployment ID → doit matcher `DeploymentId` configure

Empeche la reutilisation de tokens valides d'autres applications EOS.

### Erreurs silencieuses

```csharp
catch (SecurityTokenValidationException) { return false; }
catch (ArgumentException)               { return false; }
```

Aucun log emis. Ajout d'un `ILogger` recommande pour diagnostic en prod.

## HTTP Basic (RFC 6749)

```csharp
httpClient.SetBasicAuthentication(Options.ClientId, Options.ClientSecret);
// + AuthorizationHeaderStyle = BasicAuthenticationHeaderStyle.Rfc6749
```

Conforme a la section 2.3.1 de la RFC 6749.

## Voir aussi

- [[Login OAuth]] — `EpicOnlineServicesLoginProvider` hérite de `ExternalLoginProvider<EpicOnlineServicesOptions>` (classe abstraite générique) et est enregistré dans `ExternalLoginProviderFactory` avec la clé constante `"EpicOnlineServices"`.
- [[Login Xsolla Stub]] — documente le stub `XsollaLoginProvider` (classe vide) pour contraster avec l'implémentation complète d'EOS décrite ici.
- [[OWS Architecture]] — `IExternalLoginProvider` est cité dans la section "Auth Externe" comme point d'entrée alternatif à `PlayerLoginAndCreateSession`.
- [[OWS Player Controller Component]] — côté UE5, `UOWSGameInstance::UserSessionGUID` stocke le token obtenu après `VerifyToken` du provider EOS.
- [[SQL Users]] — l'auth EOS bypasse `PlayerLoginAndCreateSession` mais réutilise la table `UserSessions` pour enregistrer la session OWS qui en résulte.
