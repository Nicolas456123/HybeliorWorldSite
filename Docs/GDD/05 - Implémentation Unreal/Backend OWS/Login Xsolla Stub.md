---
tags: [implementation, ue5, ows, backend]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# LoginSteam

> Fournisseur `XsollaLoginProvider` — stub vide, implementation non realisee. Source : `OWS/src/OWSExternalLoginProviders/Implementations/XsollaLoginProvider.cs`.

> **Note** : bien que la demande mentionne "LoginSteam", le code OWS actuel n'inclut pas de fournisseur Steam a proprement parler. Le fournisseur alternatif disponible (mais non implemente) est **Xsolla**, qui peut s'interfacer avec Steam indirectement via le reseau de paiement. Cette page documente l'etat reel du code.

## Etat actuel : stub vide

```csharp
public class XsollaLoginProvider
{
    // Corps vide
}
```

La classe est presente dans le projet mais :

- **N'herite pas** de `ExternalLoginProvider<TOptions>` ni n'implemente `IExternalLoginProvider`
- **Ne contient aucune methode**
- Les imports presents (`JwtSecurityTokenHandler`, `IExternalLoginProvider`, options) suggerent une implementation prevue mais non realisee

## Etat fonctionnel

**Non fonctionnel**. Le fournisseur Xsolla est declare comme constante dans `ExternalLoginProviderOptions.Xsolla` mais n'a pas d'implementation utilisable.

Si `ExternalLoginProviderFactory.Get("Xsolla")` est appele : SimpleInjector essaierait de produire une instance, mais comme la classe n'implemente pas l'interface, aucune inscription ne peut reussir — ou l'appel retournerait un objet non utilisable.

## Prerequis pour une implementation future

Pour rendre Xsolla fonctionnel (et potentiellement permettre un login via Steam/Xsolla) :

1. **Heriter** de `ExternalLoginProvider<XsollaOptions>` (creer la classe `XsollaOptions`)
2. **Implementer** les methodes de l'interface `IExternalLoginProvider` :
   - `AuthenticationRedirect(state)` — redirection vers `https://login.xsolla.com/api/...`
   - `AuthenticateAuthorizationCodeAsync(code, ct)` — echange code Xsolla
   - `AuthenticatePasswordAsync` ou autres selon les grant types supportes
   - `VerifyToken(token, ct)` — valider les JWT Xsolla avec leurs JWKS
3. **Creer** la configuration `XsollaOptions` avec au minimum :
   - `ProjectId` — identifiant projet Xsolla
   - `LoginId` — identifiant module login
   - `SecretKey` — secret pour signature HMAC
4. **Configurer** `appsettings.json` dans la section `ExternalLoginProviderConfig` :
   ```json
   "Xsolla": {
     "ProjectId": "...",
     "LoginId": "...",
     "SecretKey": "..."
   }
   ```
5. **Enregistrer** via `ExternalLoginProviderFactory.Register<XsollaLoginProvider>(ExternalLoginProviderOptions.Xsolla)`
6. **Valider** les JWT avec les JWKS de Xsolla (cache 24h comme pour Epic)

## API Xsolla — endpoints de reference

L'API Xsolla Login expose :

- `https://login.xsolla.com/api/oauth2/login/token` — echange code → token
- `https://login.xsolla.com/api/token/check` — introspection
- `https://login.xsolla.com/api/oauth2/users/me` — profil utilisateur

L'integration Steam via Xsolla se fait generalement via le flux "Social Networks" avec provider Steam.

## Constante declaree

Dans `Options/ExternalLoginProviderOptions.cs` :

| Constante | Valeur |
|-----------|--------|
| `Xsolla` | `"Xsolla"` |

La constante existe pour permettre une future implementation, mais aucun code ne l'utilise actuellement.

## Alternative — implementation custom

Pour HybeliorWorld, un fournisseur Steam direct (sans passer par Xsolla) necessiterait :

1. Creer `SteamLoginProvider : ExternalLoginProvider<SteamOptions>` avec `SteamOptions.ApiKey` + `AppId`
2. Utiliser l'API Steam Web (`https://partner.steam-api.com/ISteamUserAuth/AuthenticateUserTicket/v1/`)
3. Valider le ticket session Steam recu par le client UE5 via le plugin OnlineSubsystemSteam
4. Generer un access token OWS en retour
5. Enregistrer avec une nouvelle constante `"Steam"` dans `ExternalLoginProviderOptions`

## Statut de la documentation

Cette page documente l'**etat reel du code source** (stub vide). Elle sert de marqueur pour une eventuelle implementation future. Voir [[Login Epic]] pour un exemple d'implementation complete du meme pattern.

## Voir aussi

- [[Login OAuth]] — `XsollaLoginProvider` ne respecte pas (encore) le contrat `IExternalLoginProvider` décrit dans ce hub, d'où l'impossibilité de résolution via `ExternalLoginProviderFactory.Get("Xsolla")` malgré la constante `ExternalLoginProviderOptions.Xsolla = "Xsolla"`.
- [[Login Epic]] — référence d'implémentation complète du même pattern (héritage `ExternalLoginProvider<TOptions>` + enregistrement Factory) à reproduire pour compléter le stub Xsolla.
- [[OWS Architecture]] — l'alternative `SteamLoginProvider` native proposée dans cette page s'intégrerait en tant que 3ème `IExternalLoginProvider` dans la section Auth Externe du flux de connexion.
- [[SQL Users]] — une implémentation future Xsolla/Steam alimenterait la table `UserSessions` avec les mêmes colonnes que `PlayerLoginAndCreateSession`.
- [[OWS Player Controller Component]] — côté UE5, le client via `OnlineSubsystemSteam` transmettrait le ticket session au backend OWS, puis `UOWSGameInstance::UserSessionGUID` capturerait le token retourné.
