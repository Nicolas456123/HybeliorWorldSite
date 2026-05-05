---
tags: [implementation, ue5, vfx, audio, rendering]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# CharacterEffects

Character-facing material functions implementing gameplay and status visuals — burn, frost, hit flash, death fade, shield iris, etc.

## Location — `Content/Assets/Materials/_MF/`

| Function | Effect |
|----------|--------|
| `MF_CharacterEffects` | Generic visual effects aggregator for character meshes |
| `MF_HitFlash` | Impact flash (see [[Hit Flash]]) |
| `MF_DeathFade` | Death dissolve / fade |
| `MF_Displacement` | Mesh displacement (damage deformation) |
| `MF_IcyNoise` | Frost / frozen status |
| `MF_ThinFilm_Frensel` | Thin-film iridescence (magic shields) |
| `MF_OrionRimlight` | Orion-style rim light (outline glow) |
| `MF_Transmission` | Lightweight subsurface scattering |
| `MinionBurn` | Minion burn effect |
| `MF_Minion_EmissiveFX` | Minion emissive effects |
| `mf_MinionPrimeBuff` | Minion "prime" buff aura |
| `MF_MinionApperation` | Minion appearance / disappearance transition |

## Usage pattern

These functions are plugged into character master materials (see [[Master Materials]]) so status visuals are driven by GAS-provided scalar / vector parameters:

- Status onset writes parameters to the character's MID (e.g. `WetAmount`, `BurnAmount`, `FrozenAmount`)
- The MF blends the proper overlay (albedo tint, emissive, normal distortion)
- `MF_HitFlash` is pulsed on damage received (see [[Hit Flash]])

## Freeze / frozen surface side

The frost look on the character is complemented by environment materials:
- `Content/Assets/Materials/_Master/M_Frozen_Master01`
- `Content/Assets/Materials/Ice/MI_Frozen01` (standard ice instance)
- `Content/Assets/Materials/Ice/MI_FrozenLake01` (frozen lake)
- Aurora textures: `T_Aurora_Crystal_N_01`, `T_Aurora_Noise_N`, `T_Aurora_Veins`, `T_Noise_Water`

## Ice / magic FX pairing

These MFs are typically paired with the [[Niagara Systems]] Ice/Muriel set (`P_Muriel_Primary_*`) for projectile impacts on characters.

## Voir aussi
- [[Hit Flash]] — `MF_HitFlash` est une des fonctions listées dans cette page (`_MF/MF_HitFlash.uasset`) et pulse l'émissif via le paramètre `HitFlashIntensity` écrit par le pipeline dégâts GAS.
- [[Master Materials]] — les `MF_*` de cette page sont enfichées dans les masters `M_Surface_Master` / `M_NearMesh_Master` / `M_Frozen_Master01` documentés côté masters.
- [[Material Instances]] — `MI_Frozen01` / `MI_FrozenLake01` dérivent de `M_Frozen_Master01` et exposent les paramètres pilotés par `MF_IcyNoise` / `MF_ThinFilm_Frensel`.
- [[Niagara Systems]] — les impacts `P_Muriel_Primary_HitCharacter*` sont pairés avec `MF_HitFlash` et `MF_IcyNoise` lors des dégâts glace sur les characters.
