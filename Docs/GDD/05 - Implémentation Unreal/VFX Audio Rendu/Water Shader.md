---
tags: [implementation, ue5, vfx, audio, rendering]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# WaterShader

HW Water — native HLSL vertex factory and the surrounding material pipeline used by the ocean mesh in HybeliorWorld.

## Native HLSL shader

Path: `HybeliorWorld_5.4/Shaders/Water/`

| File | Role |
|------|------|
| `HWWaterMeshVertexFactory.ush` | HLSL vertex factory for the ocean mesh — handles vertex-level wave deformation |

`.ush` is an include file extending the UE5 rendering pipeline. It is referenced by the HW Water materials and participates in shader compilation.

## Ocean materials

Path: `Content/Environment/Water/` — external actors of the `Horizon_Map` (open-ocean world). Water materials are managed by the Water HW system and its internal instances (no separate master/instance pair surfaced at the project level; the vertex factory does the heavy lifting).

## Interaction with weather

Surface ripples caused by rain are delivered via the UDS/UDW materials (e.g. `WaterSurface_Rain_Ripples`, `Splash_ParticleMat`) — see [[Material Instances]]. These are separate from the Water HW mesh itself and composited on top.

## Related weather driver

`UHWWeatherEffectsSystem` (see [[Material Instances]]) uses a `RippleFrameInterval = 1/24s` animation counter, driving ripple frames that sync with water surface effects.

The `WaterSurface_Rain_Ripples` material reads from the `UltraDynamicWeather_Parameters` MPC; rain intensity there drives ripple density.

## Underwater FX

See [[Niagara Systems]] — `UHWSwimmingComponent` owns the underwater bubbles and swim-trail Niagara assets. Attached to sockets `head_Socket`, `foot_r_Socket`, `foot_l_Socket`, `swim_fast_trail_Socket`. The `SwimFastTrailSound` audio pairing is documented in [[Audio System]].

## Pipeline summary

```
HW Water mesh (procedural/large-scale ocean)
    │  vertex factory → wave deformation (HLSL)
    │
    ├─ Surface material (Water HW internal)
    │     ↑ reads MPC: wind, wetness, rain
    │
    ├─ Rain ripple overlay (UDW: WaterSurface_Rain_Ripples)
    │
    └─ Weather splashes (UDW: Splash_ParticleMat / Puddle_Splash Niagara)
```

## Voir aussi
- [[Material Instances]] — `WaterSurface_Rain_Ripples`, `Splash_ParticleMat`, MPC `UltraDynamicWeather_Parameters` composités par-dessus l'ocean
- [[Master Materials]] — masters environnement / water / sky consommant le vertex factory
- [[Niagara Systems]] — `NS_GerstnerWaves`, `NS_GerstnerWaves_Splash`, bulles (`NS_Head_Bubbles`, `NS_Foot_Bubbles`) posées par `UHWSwimmingComponent`
- [[Audio System]] — `SwimFastTrailSound` pairé via `UHWSwimmingComponent`
- [[../04_World_Environment/InfiniteOcean]] — hub océan : `UHWSwimmingComponent` (sockets bulles/trail), `UHWWeatherEffectsSystem` (ripples 24 fps)
