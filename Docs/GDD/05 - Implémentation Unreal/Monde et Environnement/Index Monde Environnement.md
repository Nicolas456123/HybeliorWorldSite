---
tags: [implementation, ue5, world, environment]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# 04 — World & Environment

Environnement dynamique, terrain procédural et système Water — trois managers singletons.

Cœur :

- [[HW Environment Manager]] — `AHWEnvironmentManager` (orchestrateur jour/nuit, saisons, météo, ciel)
- [[Terrain Manager]] — `AHWTerrainManager` (biomes, clipmap, grottes SDF, érosion)
- [[Infinite Ocean]] — `AHWInfiniteOcean` (vagues Gerstner, QuadTree LOD)
- [[Terrain Water Bridge]] — `UHWTerrainWaterBridge` (pont environnement ↔ eau)

Les sous-systèmes (TimeOfDay, WeatherSystem, BiomeSystem, WaterBuoyancy, PCG…) sont rattachés à ces managers.
