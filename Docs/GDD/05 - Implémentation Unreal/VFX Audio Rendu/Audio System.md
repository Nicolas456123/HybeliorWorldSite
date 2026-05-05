---
tags: [implementation, ue5, vfx, audio, rendering]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# AudioAssets

HybeliorWorld audio catalogue — Attenuations, Cues, Waves, music, footsteps and weather audio.

> Documentation générée via MCP Python — Asset Registry scan de `/Game/Assets`
> Date : 2026-04-04

## Layout — `Content/Assets/Audio/`

```
Audio/
├── Attenuation/    3D spatialization profiles (SA_*)
├── Cues/           Sound Cues (SC_*)
│   ├── Foley/
│   │   └── Footsteps/
│   └── Magic/
│       └── Air/
└── Waves/          Raw imported sounds (SW_*)
    ├── Foley/
    ├── Impact/
    └── Magic/
```

## Spatial attenuation

| File | Description |
|------|-------------|
| `SA_Spatialized01` | Standard 3D attenuation (human range) |
| `SA_Spatialized01Giant` | Extended attenuation for giants / large-scale events |

## Sound Cues

| Path | File | Description |
|------|------|-------------|
| `Cues/Foley/Footsteps/` | `SC_Footsteps01` | Standard footstep cue (randomized) |
| `Cues/Foley/Footsteps/` | `SC_FootstepsGiant` | Heavy footsteps (giants) |
| `Cues/Magic/Air/` | `SC_AirDash01` | Air dodge / wind dash |

## Statistiques globales (MCP scan)

| Type | Quantité |
|---|---|
| SoundCue | 3 728 |
| SoundWave | 3 906 |
| SoundAttenuation | 2 |

### Sons de pas — 31 surfaces physiques (3 720 SoundCues)

Pack **TomWinandySFX** — 31 surfaces × 120 variantes. Catégories : Verre, Pierre/Béton, Terre/Nature, Gravier, Eau, Métal, Bois, Revêtements, Terrains spéciaux (Ice, Mud, Sand, Snow).

## Musique — contextes

- **Beauty/** (136 pistes) — Vindsvept, Narnia OST, Scott Buckley, etc. → `C_Beautifull`
- **Battle/** (16 pistes) — AudioMachine, Brand X, City of the Fallen, etc. → `C_Battle`
- **Pirate/** (20 pistes) — Pirates of the Caribbean OST (vol 1-3) → `C_Pirates`

## SoundClasses (plugins)

### Ocean (`/Game/Environment/Water/Design/Audio/SoundClasses/`)
```
MasterSoundClass
├── WhooshSoundClass
├── TouchSoundClass
├── SandSoundClass
└── FadeOutSoundClass
```

### UltraDynamicSky
- `UDS_Weather` — Sons météo
- `UDS_Outdoor_Sound` — Ambiance extérieure

## SoundMixes

| SoundMix | Rôle |
|---|---|
| `SupressTouchOnWhooshMix` | Supprime Touch pendant Whoosh (évite superposition) |
| `FadeOutSoundMix` | Fondu global (transitions zones / mort) |

## Attenuations

| Asset | Usage |
|---|---|
| `SA_Spatialized01` | Standard (PNJ, effets proches) |
| `SA_Spatialized01Giant` | Créatures géantes, boss |
| `Rain_Hit_Attenuation` | Pluie impact |
| `SA_SoundAttenuation` | Ocean général |
| `ATT_Birds` | Oiseaux marins |

## Weather audio — `Content/UltraDynamicSky/Sound/`

- **Thunder** : `Close_Thunder/` (6 waves + Cue), `Distant_Thunder/` (11 waves + Cue)
- **Rain** : LightRain_1–4, MediumRain_1–4, Rain_Cue, RainHit_1–3, Rain_Fadein_Curve
- **Snow** : Snow_Compress_1–6 (driven by `UHWWeatherEffectsSystem::CompressDLWESnow`), Snow_Movement
- **Wind** : BrownianNoise_1–4, Wind_Cue, Wind_Whistling
- **Dust** : Dust_1–6 + Dust_Compress_Cue
- **Puddles** : Puddle_01–04, Puddle_Splash (triggered by `RippleDLWEPuddle`), Water_Movement

## Naming conventions

| Prefix | Type |
|--------|------|
| `SA_` | Sound Attenuation |
| `SC_` | Sound Cue |
| `SW_` | Sound Wave |
| `C_` | Master music cue |

## Notes techniques

- Convention pas : `CUE_TomWinandySFX_-_FS_<Surface>_<index>_Cue`
- SoundClasses déléguées aux plugins (Ocean, UDS)
- Deux niveaux d'atténuation (standard/géant)
- 172 SoundWaves musicales non-streamées — activer le streaming recommandé

## Voir aussi
- [[Niagara Systems]] — NS météo + sons (Rain_Hit_Cue, Thunder_Cue) pairés avec les particles UDS
- [[Character Effects]] — sons surface-physique couplés aux effets de déplacement
- [[Material Instances]] — MPC `UltraDynamicWeather_Parameters` partagé entre ripples et sons météo
- [[Water Shader]] — pipeline ocean et pairing audio `SwimFastTrailSound` via `UHWSwimmingComponent`
- [[../04_World_Environment/HWEnvironmentManager]] — hub environnement : pilote `UHWWeatherEffectsSystem` (Snow_Compress_*, Puddle_Splash) et `UHWSwimmingComponent` (sons submersion/natation)
