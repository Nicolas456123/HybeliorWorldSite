---
tags: [implementation, ue5, vfx, audio, rendering]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# NiagaraAssets

Native Niagara usage in HybeliorWorld — systems, meshes, vector fields, material functions, and full asset catalogue.

> Catalogue généré via MCP Python (Unreal Editor) — 2026-04-04
> Total : **42 assets NiagaraSystem** répertoriés (dont doublons Environment/UDS) — **~31 uniques**

## FX directory layout — `Content/Assets/FX/`

```
FX/
├── Functions/      Reusable Material Functions (MF_*)
├── Materials/      Particle materials (M_*)
├── Meshes/         Static meshes consumed by particles
├── Particles/      Particle systems (P_* Cascade legacy or NS_* Niagara)
├── Textures/       FX-dedicated textures (T_*)
└── VectorFields/   Vector fields for GPU particles
```

## Ice / Muriel particle set — `Content/Assets/FX/Particles/Ice/`

Systems still carry the `P_` prefix (Cascade legacy) but are treated as Niagara in UE5.4.

| File | Description |
|------|-------------|
| `P_Aurora_Decoy_Spawn` | Aurora decoy spawn (teleport / clone) |
| `P_Muriel_Primary_HitCharacter` | Character hit — ice burst v1 |
| `P_Muriel_Primary_HitCharacter1` | Character hit — v2 (more intense) |
| `P_Muriel_Primary_HitWorld` | World hit — ice shards on ground |
| `P_Muriel_Primary_NoHit` | In-flight dissipation (no target) |
| `P_Muriel_Primary_Projectile` | Primary projectile trail v1 |
| `P_Muriel_Primary_Projectile1` | Primary projectile trail v2 |
| `P_Muriel_Primary_Spawn` | Launch flash |

Pipeline:
```
Spawn → [P_Muriel_Primary_Spawn]
  In-flight → [P_Muriel_Primary_Projectile / _Projectile1]
    Hit character → [P_Muriel_Primary_HitCharacter / _HitCharacter1]
    Hit world    → [P_Muriel_Primary_HitWorld]
    No impact    → [P_Muriel_Primary_NoHit]
Aurora decoy → [P_Aurora_Decoy_Spawn]
```

## Weather particles — `Content/UltraDynamicSky/Particles/`

Driven dynamically by `AHWEnvironmentManager` via `UHWWeatherEffectsSystem`.

| File | Rôle |
|------|-------------|
| `Dripping_Curve` | Dripping curve (roofs, rocks) |
| `Dust` | Dust storm particles |
| `Inside_Cloud_Fog` | Cloud fog inside cloud layer |
| `Lightning_Strike` | Ground lightning + dynamic light |
| `Obscured_Lightning` | In-cloud diffuse lightning |
| `Puddle_Splash` | Puddle splash |
| `Rain` | Standard rain |
| `Rain_and_Snow` | Freezing rain (mix) |
| `Snow` | Snowflakes |
| `Snow_Trail` | Footstep snow trail |
| `Weather_Particles` | Master orchestrator |
| `Wind_Debris` | Wind-blown debris |

Do NOT modify these UDS assets directly — drive them through `UHWWeatherEffectsSystem`. See [[Character Effects]] and [[Water Shader]].

## Underwater Niagara — UHWSwimmingComponent

File: `Source/HybeliorWorld/Public/Water/Components/HWSwimmingComponent.h`.

| Property | Type |
|----------|------|
| `HeadBubblesEffectNiagara` | `UNiagaraSystem*` |
| `RightFootBubblesEffectNiagara` | `UNiagaraSystem*` |
| `LeftFootBubblesEffectNiagara` | `UNiagaraSystem*` |
| `SwimFastTrailEffectNiagara` | `UNiagaraSystem*` |

Sockets: `head_Socket`, `foot_r_Socket`, `foot_l_Socket`, `swim_fast_trail_Socket`.

---

## Catalogue Niagara — Résumé par catégorie

| Catégorie | Nombre | Sous-systèmes |
|---|---|---|
| Vol / Locomotion aérienne | 6 | Trail, HighSpeed, Hover, Dodge |
| Atterrissages (sol) | 5 | Concrete, Grass, Ground, Sand, Water |
| UnderDust | 5 | Concrete, Grass, Ground, Sand, Water |
| Eau / Natation | 7 | Bulles, traînes, Gerstner, debug |
| Météo UDS | 11 | Pluie, neige, foudre, brouillard |
| Météo copie locale (Sky) | 7 | Pluie, neige, vent, poussière, foudre |
| **Total unique** | **~31** | |

## Vol (SuperheroFlight/VFX/Niagara/System/Flight/)

| Système | Emitters | Rôle | Matériaux clés |
|---|---|---|---|
| `NS_Flight_Trail` | 4 | Traînée persistante en vol | `MI_Hand_Trail`, `MI_Smoke`, `SK_Mannequin`, `SphereRenderMask` |
| `NS_Flight_Trail_Start` | 5 | Burst d'initiation vol | + `MI_ShockWave_Noise_Fade`, `Plane` |
| `NS_Flight_HighSpeed_Start` | 2 | Transition haute vitesse | `M_Flight_Wind_Cloud`, `SphereRenderMask` |
| `NS_Flight_HighSpeed_Wave` | 1 | Onde de pression continue | idem |
| `NS_Flight_Hover_Start` | 1 | Flash d'onde hover | `Plane`, `MI_ShockWave_Noise_Fade` |
| `NS_Flight_Dodge` | 1 | Esquive aérienne | idem |

## Atterrissages (SuperheroLanding/)

Socle commun 4–5 emitters. Variante choisie par Physical Material.

| Système | Emitters | Particularité |
|---|---|---|
| `NS_Superhero_Landing_Concrete` | 4 | Débris minéraux, pas de végétation |
| `NS_Superhero_Landing_Grass` | 5 | Ajoute projection feuillage (mesh `Foliage`) |
| `NS_Superhero_Landing_Ground` | 5 | Version standard |
| `NS_Superhero_Landing_Sand` | 5 | Variantes sable |
| `NS_Superhero_Landing_Water` | 5 | Splash (`M_Water_Splash`) |

## UnderDust (vol rasant / hover)

| Système | Emitters | Matériaux |
|---|---|---|
| `NS_Under_Dust_Concrete` | 2 | `MI_Smoke`, `SphereRenderMask` |
| `NS_Under_Dust_Grass` | 3 | `M_Grass`, `Foliage`, `MI_Smoke` |
| `NS_Under_Dust_Ground` | 2 | `MI_Smoke`, `SphereRenderMask` |
| `NS_Under_Dust_Sand` | 2 | idem |
| `NS_Under_Water` | 2 | `M_Water_Splash`, `MI_Smoke` |

## Eau / Natation (Environment/Water/Effects/Particles/)

| Système | Rôle | Matériau |
|---|---|---|
| `NS_Foot_Bubbles` | Bulles pieds | `M_CharacterBubbles_Inst` |
| `NS_Head_Bubbles` | Bulles tête | idem |
| `NS_LakeBurbblesUnderwater` | Ambiance lac | `M_LakeBubbles_Inst` |
| `NS_OceanBurbblesUnderwater` | Ambiance océan | `M_OceanBubbles_Inst` |
| `NS_SwimFast_Trail` | Sprint aquatique | `M_CharacterBubbles_Inst` |
| `NS_Particle` *(debug)* | Visualisation dev | Engine default |

## Vagues Gerstner

| Système | Emitters | Rôle |
|---|---|---|
| `NS_GerstnerWaves` | 1 | Simulation surface (WaveAmplitude, WaveFrequency, WaveDirection) |
| `NS_GerstnerWaves_Splash` | 1 | Gerbe déclenchée par intersection |

## Météo UDS

| Système | Emitters | Matériaux |
|---|---|---|
| `Rain` | 4 | Fog/Splash/Rain_ParticleMat + `Rain_Hit_Cue` |
| `Snow` | 1 | Fog/Rain/Snow_ParticleMat |
| `Rain_and_Snow` | 2 | RainSnow_ParticleMat |
| `Wind_Debris` | 1 | Fog/Rain_ParticleMat |
| `Dust` | 2 | Dust_ParticleMat, Dust_Spot_ParticleMat |
| `Lightning_Strike` | 5 | LightningBolt/Branch/Ball/Flare |
| `Obscured_Lightning` | 1 | Lightning_Glow, LightningFlare |
| `Inside_Cloud_Fog` | 1 | (matériau UDS interne) |
| `Puddle_Splash` | 1 | Splash_Droplet_Particle |
| `Snow_Trail` | 1 | Snow_Trail_Particle |
| `Dripping_Curve` | 2 | Splash/Rain_ParticleMat |

## Notes techniques

- Tous les systèmes : `MaxPoolSize: 32`, `WarmupTime: 0.0s`, `bFixedBounds: False`.
- Emitters partagés : `NM_Circle_Dust`, `NM_Flight_Under_Dust_Velocity`, `NM_ShockWave_*`, `Weather_Particles`, `Splashes`, `Splash_Droplets`.
- **Recommandation** : activer `bFixedBounds` pour `Lightning_Strike` et `Rain` (effets larges) afin d'éviter les recalculs de bounds par frame.
- Choix de variante (Concrete/Grass/Ground/Sand/Water) via Line Trace + Physical Material.

## Voir aussi
- [[Character Effects]] — `MF_CharacterEffects` accompagne les particles de personnage (frozen, etc.)
- [[Hit Flash]] — feedback combat, systèmes `P_Muriel_Primary_Hit*` pipelinés avec le flash
- [[Audio System]] — pairing des sons (Rain_Hit_Cue, SwimFastTrailSound) avec les NS correspondants
- [[Material Instances]] — matériaux consommés par emitters (`MI_Hand_Trail`, `M_Water_Splash`, `MI_Smoke`, etc.)
- [[Water Shader]] — pipeline ocean lié aux NS Gerstner (`NS_GerstnerWaves`, `NS_GerstnerWaves_Splash`)
- [[../04_World_Environment/HWEnvironmentManager]] — hub environnement : pilote `UHWWeatherEffectsSystem` (NS météo UDS) et `UHWSwimmingComponent` (bubbles/trail Niagara)
