---
tags: [implementation, ue5, tools, automation]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Terrain Editor Tools

Outils éditeur spécifiques au système terrain — principalement le générateur procédural du matériau maître.

---

## UHWTerrainMaterialGenerator

**Fichiers** : `HWTerrainMaterialGenerator.h` / `.cpp`

```cpp
class HYBELIORWORLDEDITOR_API UHWTerrainMaterialGenerator : public UBlueprintFunctionLibrary
```

Librairie de fonctions Blueprint marquée `meta = (DevelopmentOnly)` — n'existe qu'en édition.

### Fonction principale

```cpp
static UMaterial* GenerateMasterMaterial(
    FString PackagePath = TEXT("/HWTerrain/Materials/M_HWTerrain_Master")
);
```

Crée de zéro un `UMaterial` C++ avec ses expressions, ses paramètres et son code HLSL, puis le sauvegarde sur disque. Callable depuis Blueprint ou Python.

**Étapes internes** :

1. Création du package UE et de l'objet `UMaterial` (`MD_Surface`, `BLEND_Opaque`, `MSM_DefaultLit`)
2. Création de toutes les expressions de paramètres
3. Création du nœud `UMaterialExpressionCustom` avec le code HLSL procédural
4. Câblage des sorties du Custom node vers les pins matériau (`BaseColor`, `Roughness`, `Normal`, `AmbientOcclusion`)
5. `PostEditChange()` + `ForceRecompileForRendering()` + `AssetCreated()` + `SavePackage()`

---

## Paramètres du matériau

| Paramètre | Type | Défaut | Rôle |
|---|---|---|---|
| `PrimaryLayerIndex` | Scalar | 0.0 | Couche terrain principale (0–6) |
| `SecondaryLayerIndex` | Scalar | 0.0 | Couche secondaire (0–6) |
| `SlopeLayerIndex` | Scalar | 0.0 | Couche appliquée sur les pentes (0–6) |
| `BiomeBlendWeight` | Scalar | 0.0 | Poids de blend primaire/secondaire (0–1) |
| `SlopeThreshold` | Scalar | 0.7 | Seuil de détection de pente (dot produit Z) |
| `UVScale` | Scalar | 1.0 | Échelle UV globale |
| `TileSize` | Scalar | 25600.0 | Taille d'une tuile en unités UE (256m) |
| `RoughnessOffset` | Scalar | 0.0 | Décalage additif de roughness |
| `BiomeTint` | Vector | Blanc | Teinte multiplicative biome |
| `WorldOffset` | Vector | (0,0,0,0) | Décalage monde (XY utilisés) |
| `TerrainDiffuseArray` | TextureObject | — | Tableau diffuse (non utilisé en procédural) |
| `TerrainNormalArray` | TextureObject | — | Tableau normal (non utilisé en procédural) |

**Correspondance `EHWTerrainLayer`** :

| Index | Couche | Couleur | Roughness |
|---|---|---|---|
| 0 | Rock | (0.42, 0.40, 0.38) | 0.85 |
| 1 | Grass | (0.25, 0.50, 0.12) | 0.70 |
| 2 | Sand | (0.82, 0.75, 0.52) | 0.75 |
| 3 | Snow | (0.92, 0.93, 0.96) | 0.25 |
| 4 | Dirt | (0.40, 0.30, 0.18) | 0.80 |
| 5 | Mud | (0.28, 0.22, 0.15) | 0.45 |
| 6 | Gravel | (0.55, 0.53, 0.50) | 0.90 |

---

## Shader HLSL intégré

Shader entièrement procédural — aucune texture tableau requise en fonctionnement normal. 4 sorties :

| Sortie | Type | Description |
|---|---|---|
| `return float4` | BaseColor | Couleur finale RGB |
| `Roughness` | float | Roughness avec variation bruit |
| `OutNormal` | float3 | Normale perturbée par micro-bump procédural |
| `AO` | float | Occlusion ambiante combinée pente + bruit |

### Pipeline de calcul

1. **Poids triplanaires** : `pow(abs(VNorm), 4.0)` normalisés — prêts pour projection triplanaire
2. **FBM 4 octaves** : bruit hash sinusoïdal à 4 fréquences (`0.00003`, `0.00012`, `0.0005`, `0.002`)
3. **Lookup de couleur par index** : `LayerColors[7]` et `LayerRoughness[7]` avec `clamp((int)Index, 0, 6)`
4. **Blend biome** : `lerp(Primary, Secondary, NoisyBlend)` avec bord perturbé par bruit
5. **Teinte biome** : `BiomeColor *= BTint`
6. **Détection pente** : `dot(VNorm, float3(0,0,1))` comparé à `SlopeThreshold`, mask lissé sur 6 unités
7. **Variation macro** : deux fréquences à échelle monde (`0.000008`) multiplient la couleur finale (`±12%`)
8. **Variation micro** : bruit N4 module de `±4%`
9. **Micro-bumps normaux** : dérivées finies par décalage de 0.1 en XZ, amplitude `0.15`
10. **AO** : `SlopeAO * NoiseAO` — pentes reçoivent jusqu'à 40% d'AO supplémentaire

---

## Appel de génération

Depuis la toolbar Hybelior : **Tools > Generate Master Material**

Depuis Python :
```python
sub = unreal.get_editor_subsystem(unreal.HybeliorEditorSubsystem)
sub.generate_master_material()
```

Asset produit : `/HWTerrain/Materials/M_HWTerrain_Master`

---

## Voir aussi

- [[Editor Subsystems]] — décrit `UHybeliorEditorSubsystem::GenerateMasterMaterial()` (catégorie Tools) qui appelle directement `UHWTerrainMaterialGenerator::GenerateMasterMaterial()` pour produire `/HWTerrain/Materials/M_HWTerrain_Master`.
- [[Utility Widgets]] — liste l'entrée « Generate Master Material » sous la section Tools de la toolbar `LevelEditor.LevelEditorToolBar.PlayToolBar` qui invoque ce générateur.
