---
tags: [implementation, ue5, vfx, audio, rendering]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 06 — VFX, Audio & Rendering

Particules Niagara, audio spatial, matériaux et shaders custom.

Cœur :

- [[Niagara Systems]] — systèmes Niagara (combat, élémentaires, UI, weather)
- [[Audio System]] — cues, metasounds, audio sous-marin
- [[Master Materials]] — `M_*` masters (terrain, sky, fog, water)
- [[Water Shader]] — `HWWaterMeshVertexFactory.ush` + pipeline water

Les Material Instances, Material Functions (`MF_HitFlash`, `MF_CharacterEffects`) et MPCs sont rattachés à ces racines.
