---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Flow Login → Jeu

Cascade d'initialisation entre la phase login (serveur web OWS) et la session de jeu (zone server UE).

## Séquence complète

```
1. AssetManager::StartInitialLoading() → GAS init
2. LoginController → GetAllCharacters() → SelectCharacter()
3. GetZoneServerToTravelTo() → TravelToMap2(ServerIP:Port)
4. Zone Server: OnPossess → InitializeCharacterOnServerSide()
5. OWS GetCustomCharacterData() → Load 14 catégories de données
   (HWCharacterCustomComponent removed; TODO in HWPlayerController.cpp:959 — visual appearance re-application pending)
6. PartialInitializationComplete cascade → ReadyToPlay()
7. Server: ReadyToPlayOnServer() + Timer AutoSave
8. Client: HideLoadingScreen + SetupHUD + ReadyToPlayOnClient()
```

## Persistance (14 catégories)

| Donnée | Fréquence | Backend |
|--------|-----------|---------|
| Character Attributes | 10s | OWS CustomCharacterData |
| Inventory (x2) | 10s | OWS CustomCharacterData |
| Appearance (x2) | 10s (delay) | OWS CustomCharacterData |
| Weapon Mastery | 5min | OWS CustomCharacterData |
| Progression | 5min | OWS CustomCharacterData |
| SkillBar | 5min | OWS CustomCharacterData |
| Quest Progress | 5min | OWS CustomCharacterData |
| SupplyPods/Containers | On event | OWS CustomCharacterData |

## Fragilités connues
- **Race condition initialisation** (cascade sans timeouts)
- **Pas de timeout OWS** (loading infini si backend offline)
- Hardcoded DeadKingdom travel

Voir [[Technical Debt Active]] pour la liste complète.

## Voir aussi
- [[Player Controllers]] — `AHWLoginPlayerController` (phase 1) puis `AHWPlayerController` (phase 2)
- [[Asset Manager]] — étape 1 `StartInitialLoading()` → `InitializeAbilitySystem()`
- [[Initialization Sequence]] — détail de la cascade `PartialInitializationComplete` (phase 6)
- [[Persistence Flow]] — les 14 catégories chargées à l'étape 5
- [[Serialization Format]] — template utilisé pour désérialiser les CustomCharacterData
- [[Zone Travel]] — `GetZoneServerToTravelTo` → `TravelToMap`
- [[Technical Debt Active]] — race condition, hardcoded DeadKingdom travel
- [[Game Mode Blueprints]] — BP_LoginGameMode, BP_LoginPlayerController
- [[../05_Interaction_UI/LoginUI]] — `UHWLoginWidget` instancié en BeginPlay
- [[../08_Backend_OWS/OWSArchitecture]] — hub backend : `OWSPlayerControllerComponent` (GetAllCharacters, GetCustomCharacterData) + GlobalDataService
