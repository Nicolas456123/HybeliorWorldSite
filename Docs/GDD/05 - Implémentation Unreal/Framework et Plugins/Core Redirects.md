---
tags: [implementation, ue5, framework, plugins]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# CoreRedirects

Redirects d'assets dans `DefaultEngine.ini` assurant la compatibilité post-rename/purge. **Ne pas supprimer** avant resave complet du projet.

## PackageRedirects

```ini
; Water HW (ex-Oceanology) fusionné dans HybeliorWorld
+PackageRedirects=(OldName="/Oceanology_Plugin/",NewName="/Game/Environment/Water/")
+PackageRedirects=(OldName="/HWTerrain/",NewName="/Game/World/Terrain/")

; UDS content reorganization — all old paths redirect to Environment/Sky/
; (2026-04-07: Fixed — removed 6 INVERTED redirects that were pointing
;  /Game/Environment/Sky/* BACK to /Game/UltraDynamicSky/*)
+PackageRedirects=(OldName="/Game/_HWAssets/UltraDynamicSky/",NewName="/Game/Environment/Sky/")
+PackageRedirects=(OldName="/Game/UltraDynamicSky/",NewName="/Game/Environment/Sky/")
```

## ClassRedirects (Oceanology → HW)

104 entrées au total (Phase 1 + Phase 2). Exemple :

```ini
+ClassRedirects=(OldName="/Script/Oceanology_Plugin.OceanologyInfiniteOceanActor",
                 NewName="/Script/HybeliorWorld.HWInfiniteOceanActor")
; ... 13 autres redirects Phase 1 (plugin → HybeliorWorld)
; ... 68 autres redirects Phase 2 (Oceanology → HW prefix)
```

## État de la purge

- ✅ Code C++ 100% HW-préfixé (sauf ~18 symboles résiduels à renommer, voir memory `project_oceanology_purge`)
- ⚠️ 11 GB de contenu encore dans `Plugins/Oceanology_Plugin/Content/` — à migrer vers `Content/Environment/Water/`
- ⚠️ 104 redirects à conserver jusqu'au resave complet des assets

## Voir aussi
- [[Plugins]] — explique pourquoi `Oceanology_Plugin` n'est plus déclaré dans `HybeliorWorld_5.4.uproject` alors que ses 11 GB de contenu persistent sur disque ; les `+PackageRedirects=(OldName="/Oceanology_Plugin/",NewName="/Game/Environment/Water/")` listés ici couvrent cette purge.
- [[Config Files]] — les blocs `+PackageRedirects=` et `+ClassRedirects=` de cette page sont hébergés dans `DefaultEngine.ini`, décrit comme point central de configuration du projet.
- [[../04_World_Environment/InfiniteOcean]] — hub Water HW (ex-Oceanology) : cible principale des redirects `OceanologyInfiniteOceanActor` → `HWInfiniteOceanActor`.
