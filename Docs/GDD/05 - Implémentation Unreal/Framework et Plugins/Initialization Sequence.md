---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Séquence d'initialisation (AHWPlayerController)

Le système d'initialisation suit un modèle à **étapes nommées et pondérées**, côté serveur et côté client. Chaque étape complétée appelle `PartialInitializationComplete(StepName)`. Quand toutes les étapes d'un côté sont complétées, `ReadyToPlay()` est déclenché.

## Structure `FHWInitializationPart`

| Champ | Type | Description |
|---|---|---|
| `InitializationPartName` | `FString` | Nom de l'étape (ex. `"GAS"`, `"CUSTOMCHARACTERDATA"`, `"PLAYERSTATE"`) |
| `InitializationPartPercentage` | `float` | Poids dans la progression totale (0.0 → 1.0) |
| `bServerSide` | `bool` | `true` = étape serveur, `false` = étape client |
| `bInitializationComplete` | `bool` | Marqué `true` quand l'étape est terminée |

## Étapes serveur (constructeur)

| Nom | Poids |
|---|---|
| `"GAS"` | 25 % |
| `"CUSTOMCHARACTERDATA"` | 50 % |
| `"PLAYERSTATE"` | 25 % |

## Étapes client

| Nom | Poids |
|---|---|
| `"PLAYERSTATE"` | 50 % |
| `"SERVERSIDEDONE"` | 50 % |

## Flux d'initialisation

```
OnPossess() [Server]
  └─ InitializeCharacterOnServerSide()
       └─ OWS::GetCustomCharacterData()
            └─ NotifyGetCustomCharacterData() → désérialise toutes les données custom
                 └─ PartialInitializationComplete("CUSTOMCHARACTERDATA")
                      └─ [si toutes étapes OK] ReadyToPlay() [Server]
                           ├─ ReadyToPlayOnServer() [BP]
                           └─ OwningClient_ReadyToPlay() [Client RPC]
                                └─ PartialInitializationComplete("SERVERSIDEDONE")
                                     └─ [si toutes étapes OK] ReadyToPlay() [Client]
                                          ├─ HideLoadingScreen()
                                          ├─ SetInputMode(GameOnly)
                                          └─ ReadyToPlayOnClient() [BP]

BeginPlayingState() [Serveur + Client]
  └─ PartialInitializationComplete("PLAYERSTATE")
```

## Risques connus

- **Race condition** : la cascade `PartialInitializationComplete` n'a pas de timeouts. Si une étape ne complète jamais (OWS offline, crash), le joueur reste bloqué sur l'écran de chargement.
- **Pas de timeout OWS** : `GetCustomCharacterData` peut bloquer indéfiniment.

Voir [[Technical Debt Active]].

## Voir aussi
- [[Player Controllers]] — `FHWInitializationPart`, `PartialInitializationComplete`, `ReadyToPlay`, `OnPossess`
- [[Login Flow]] — flux amont jusqu'à OnPossess
- [[Persistence Flow]] — étape `"CUSTOMCHARACTERDATA"` déclenche les Load*FromJSON
- [[Asset Manager]] — étape 1 (GAS init) avant même le login
- [[Zone Travel]] — TravelToMap aboutit à une nouvelle session → OnPossess → cette séquence
- [[Technical Debt Active]] — race condition, pas de timeout OWS
- [[../02_Characters_Entities/HWGASPlayerCharacter]] — cible de `GetHWGASPlayerCharacter()`, reçoit les données désérialisées
- [[../08_Backend_OWS/OWSArchitecture]] — `OWSPlayerControllerComponent::GetCustomCharacterData`
