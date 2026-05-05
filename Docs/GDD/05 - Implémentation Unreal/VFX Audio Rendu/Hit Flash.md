---
tags: [implementation, ue5, vfx, audio, rendering]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# HitFlash

`MF_HitFlash` — material function driving the short coloured flash applied to character meshes when they take damage.

## Location

`Content/Assets/Materials/_MF/MF_HitFlash.uasset` — part of the [[Character Effects]] MF set.

## Usage

Injected into the character master material (see [[Master Materials]]). The character's MID is pulsed on damage:
1. GAS damage effect lands.
2. Component (e.g. on `AHWGASPlayerCharacter`) writes `HitFlashIntensity` scalar.
3. `MF_HitFlash` samples an emissive / albedo overlay based on that intensity.
4. Intensity decays over a short window (controlled by curve or timer).

## 2D HUD side

The floating damage number system is separate and purely Canvas 2D — see [[HUD]] for `AddFloatingDamageItem` and its curves. `MF_HitFlash` only drives the mesh-space flash; the two systems run in parallel.

Hit VFX particles (sparks, blood) are delivered via GAS using the [[Niagara Systems]] sparks / ice hit assets.

## Voir aussi
- [[Character Effects]] — `MF_HitFlash` est listé dans le set `_MF/` de `CharacterEffects` (aggregator `MF_CharacterEffects`) et partage le même contrat d'overlay émissif/albedo sur la MID du character.
- [[HUD]] — `AHWHUD::AddFloatingDamageItem()` (HWHUD.h:197) fournit le feedback 2D Canvas parallèle au flash mesh-space ; les deux pipelines tournent indépendamment sur le même événement de dégâts.
- [[Master Materials]] — `MF_HitFlash` est enfiché dans les masters character (`M_NearMesh_Master`, `M_Surface_Master`) documentés côté masters ; sans ces masters le flash n'est pas composité.
- [[Niagara Systems]] — particles `P_Muriel_Primary_HitCharacter*` déclenchés par le même événement GAS que le flash, couplés visuellement (sparks/ice + flash émissif).
