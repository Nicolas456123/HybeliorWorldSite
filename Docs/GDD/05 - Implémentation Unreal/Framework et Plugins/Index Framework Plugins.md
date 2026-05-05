---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 07 — Framework & Plugins

Classes orchestrant la session, flow login → jeu, persistance, input, config.

Cœur :

- [[Game Mode]] — `AHWGameMode` + `AHWGameState`
- [[Player Controllers]] — `AHWPlayerController` + `AHWLoginPlayerController`
- [[Asset Manager]] — `UHWAssetManager`
- [[Input System]] — `UHWInputConfig` + `UHWInputComponent`

Les flows (LoginFlow, InitializationSequence, PersistenceFlow, ZoneTravel), Settings/Config, Plugins et CoreRedirects sont rattachés à ces classes.
