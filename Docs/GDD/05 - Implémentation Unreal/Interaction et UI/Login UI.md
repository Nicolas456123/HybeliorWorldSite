---
tags: [implementation, ue5, ui, interaction]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# LoginUI

Login screen widgets and flow (pre-character-select).

## UHWLoginWidget

Email + password fields pushing to `POST /api/Users/LoginAndCreateSession` via OWS.

- `OnLoginSuccess` → navigate to Character Select
- `OnLoginError` → show error message
- **[2026-04-07]** Widget creation moved to C++: `AHWLoginPlayerController::BeginPlay()` creates `UI_LoginWidget` (previously driven by BP `SetupDialogs`).
- **[2026-04-07]** `UHWLoginWidget::NativeConstruct` no longer binds buttons — BP handles via `OnClicked` events.
- **[2026-04-07]** BindWidget renames (all `BindWidgetOptional`): `LoginButton`→`btnLogin`, `ExitButton`→`btnExit`, `CreateAccountButton`→`btnCreateAccount`.
- **[2026-04-07]** `ValidateAndLogin` reads OWS config from `GGameIni` instead of `OWSGameInstance` — resolves the hardcoded URL concern.
- **[2026-04-07]** `UI_RegisterWidget` has pre-existing compile errors (Register function pins lost).

## BP binding

| C++ class | Widget BP | Path |
|-----------|-----------|------|
| UHWLoginWidget | UI_LoginWidget | /Game/UI/Login/ |

Note: project-wide the naming convention is not `WBP_` but `UI_`, `BP_`, or `UW_` depending on era.

## Voir aussi
- [[Player Controllers]] — `AHWLoginPlayerController::BeginPlay()` crée/ajoute le widget (`CreateWidget<UHWLoginWidget>` + `AddToViewport`, HWLoginPlayerController.cpp:33-48) ; hub domaine 07 (routed via PlayerControllers — couvre LoginFlow)
- [[UI Other Widgets]] — `UI_LoginWidget` et widgets Login/Register associés
- [[HUD]] — écran suivant après `OnLoginSuccess` (vue d'ensemble in-game)
