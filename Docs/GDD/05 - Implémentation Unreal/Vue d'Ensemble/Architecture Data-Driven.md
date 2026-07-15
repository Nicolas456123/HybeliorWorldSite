---
tags: [production, architecture, technique, générateurs, data-driven, ères, souffle]
status: drafted
last_review: 2026-05-01
needs_review_for: [implémentation-mvp]
type: system
---

# 🏗️ Architecture Data-Driven — Production d'Hybelior

> [!abstract] Résumé exécutif
> Hybelior n'est pas un monde "fait à la main puis figé". C'est un **monde paramétrique** : un socle stable d'assets et de règles, traversé périodiquement par des **Souffles** (cf. [[Le Souffle]]) qui reconfigurent l'ambiance, l'économie, la faune, le loot et les quêtes. Ce document décrit **comment ce monde est produit techniquement** pour que chaque nouvelle Ère ([[Les Ères]]) coûte des heures-jours, et non des mois.

---

## Principe fondamental

> [!important] La règle d'or
> **Le contenu fini est petit. Les règles de combinaison sont nombreuses. Les variations émergent.**

Hybelior repose sur trois affirmations productrices :

1. **L'asset 3D est une matière première**, pas un livrable. Une épée, un loup, un tronc d'arbre — chacun est une *forme* sur laquelle des shaders, des particules, des sons et des comportements viendront se greffer dynamiquement.
2. **Le générateur est l'unité de design**. On n'écrit pas "100 quêtes". On écrit *un* générateur de quêtes, alimenté par l'état du monde.
3. **L'instance est jetable**. Un Loup-Ombre qui apparaît durant l'Ère du Voile n'a pas à exister dans la base de données du jeu en tant qu'entité fixe : c'est `Loup_Base × Variant_Shadow × Modifiers_Era_Voile` calculé au runtime.

Conséquence directe : **la production scale en O(A+B), pas en O(A×B)**. Si on a 50 créatures et 10 variants visuels, on obtient 500 créatures perçues — sans avoir produit 500 modèles.

---

## Architecture en 3 couches

```
   ┌─────────────────────────────────────────────────────────────┐
   │  COUCHE C — INSTANCES RUNTIME                              │
   │  (calculées en jeu, non persistées en base globale)        │
   │                                                             │
   │  • "Loup-Ombre" = Loup_Base + Variant_Shadow + Era_Voile   │
   │  • "Fer Spectral" = Fer_Brut + Variant_Spectral + Recipe_X │
   │  • Quête "Trouver le tisseur dans la brume"                │
   └────────────────────────▲────────────────────────────────────┘
                            │ produit
   ┌────────────────────────┴────────────────────────────────────┐
   │  COUCHE B — GÉNÉRATEURS                                    │
   │  (12 systèmes paramétriques, alimentés par l'état du monde)│
   │                                                             │
   │  EraGen → VariantGen → MaterialGen → RecipeGen → QuestGen  │
   │  → NPCGen → LootGen → EventGen → TraceGen → ItemModGen     │
   │  → PlantGen → BehaviorGen                                  │
   └────────────────────────▲────────────────────────────────────┘
                            │ consomme
   ┌────────────────────────┴────────────────────────────────────┐
   │  COUCHE A — ASSETS DE BASE                                 │
   │  (produits une fois, réutilisés en permanence)             │
   │                                                             │
   │  Modèles 3D, animations, shaders maîtres, banques sonores, │
   │  Niagara FX, sky presets, archétypes IA, heightmaps        │
   └─────────────────────────────────────────────────────────────┘
```

### Couche A — Assets de base

C'est le seul niveau **vraiment coûteux**. Une fois produit, un asset y reste pour toute la vie du projet.

- **Géométrie** : meshes statiques et squelettiques, sans matériau ni texture définitive
- **Shaders maîtres** : un shader par grande famille (peau, métal, tissu, feuillage, pierre) avec tous les paramètres exposés
- **Animations** : banque de squelettes humanoïdes / quadrupèdes / volants / serpentins
- **Niagara FX maîtres** : émetteurs paramétriques (couleur, densité, vitesse) qui s'instancient en variantes
- **Banque sonore** : impacts, pas, ambiances, vocalisations
- **Sky presets** : 6-8 préréglages atmosphériques de base
- **Heightmaps** : géographie fixe des 12 continents (cf. [[Géographie]])

### Couche B — Générateurs

Chaque générateur est une **fonction pure** :

```
input  : (état du monde, archétype, paramètres d'ère)
output : une instance prête à être affichée/jouée
```

Aucun générateur ne crée de la géométrie ou des textures à la volée. Ils **assemblent** des assets existants avec des paramètres modulés.

### Couche C — Instances

Les instances sont **résolues à la demande** par le serveur ou le client, et **n'ont pas besoin d'être stockées globalement**. Elles vivent le temps d'une session, d'un événement, d'une Ère. Ce qui survit, ce sont les **traces** (cf. plus bas) et les invariants joueurs (Renom, recettes connues, items acquis).

---

## Les 12 générateurs principaux

| # | Générateur | Rôle | Fréquence d'invocation |
|---|------------|------|-----------------------|
| 1 | **EraGenerator** | Chef d'orchestre, déclenche tous les autres | À chaque Souffle |
| 2 | **VariantGenerator** | Applique un variant visuel (shader+FX+audio) à un mesh | Par spawn |
| 3 | **MaterialGenerator** | Produit les matériaux disponibles dans l'Ère | Au début d'Ère |
| 4 | **RecipeGenerator** | Calcule les recettes craftables et leurs coûts | Au début d'Ère |
| 5 | **QuestGenerator** | Compose les quêtes secondaires depuis des templates | Continue |
| 6 | **NPCGenerator** | Habille les PNJ (apparence, dialogues d'ambiance) | Au début d'Ère |
| 7 | **LootGenerator** | Décide ce que drop chaque créature | Par kill |
| 8 | **EventGenerator** | Sélectionne et lance les événements de zone | Cycles courts |
| 9 | **TraceGenerator** | Dépose les traces permanentes laissées par l'Ère | Fin d'Ère |
| 10 | **ItemModifierGenerator** | Ajoute des affixes/auras temporaires aux items | Par drop |
| 11 | **PlantDecorationGenerator** | Pilote PCG : foliage, décorations, pousses saisonnières | Au début d'Ère |
| 12 | **BehaviorGenerator** | Sélectionne profils d'IA selon mood/tension | Par spawn |

### 1. Era Generator (chef d'orchestre)

> Voir section dédiée plus bas.

### 2. Variant Generator

```yaml
input:
  base_mesh: Wolf_SkeletalMesh
  variant: Shadow
  intensity: 0.7  # 0..1, profondeur de l'effet
output:
  applied_shader: M_Creature_Skin (param tint=#1A0830, fresnel=0.9)
  applied_niagara: NS_AmbientShadow (intensity=0.7)
  applied_audio_layer: SFX_Whisper_Loop_Soft
  ai_aura: Fear_Pulse (radius=4m, low)
```

### 3. Material Generator

Produit la **liste des matériaux disponibles** pour l'Ère, en croisant la base de matériaux génériques avec les variants autorisés.

```yaml
input:
  era_dominant: Noctis
  era_secondary: Umbra
  era_tension: Haute
output:
  craftable_materials:
    - { id: Iron_Standard,   weight: 1.0,  source: mining, areas: all }
    - { id: Iron_Shadow,     weight: 0.4,  source: mining_at_night, areas: [Pendragoria, Caldegar] }
    - { id: Cloth_Veiled,    weight: 0.6,  source: looms_during_era }
  forbidden:
    - Iron_Solar  # Eldoria-aligned, dort durant cette Ère
```

### 4. Recipe Generator

Liste ce qui est craftable, à quel coût, avec quel résultat. Toutes les recettes ne sont pas annoncées : certaines sont **conditions cachées** 🔒 que les artisans découvrent en expérimentant (cf. [[Armes et Maîtrise]]).

```yaml
input:
  era_state: Bouleversement
  active_materials: [Iron_Shadow, Cloth_Veiled, ...]
output:
  recipes:
    - { id: Recipe_DaggerShadow, public: true,  cost: 2 Iron_Shadow + 1 Cloth_Veiled, mastery_min: 25 }
    - { id: Recipe_VeilCloak,    public: false, hidden_unlock: "rituel près d'une Faille du Temps", mastery_min: 60 }
```

### 5. Quest Generator

Pas de "fabrique de quêtes infinies". Une **bibliothèque de templates** (40-80 archétypes), filtrés par état du monde et alimentés par les NPCs réellement présents.

```yaml
input:
  template: T_RetrieveSomethingLost
  era_mood: Méfiance
  npc_giver: Elara_Innkeeper@CaldegarPort
  pool_targets: [items_lost_in_recent_event, items_associated_with_era]
output:
  quest_instance:
    title: "La lanterne de mon frère"
    objective: récupérer Lantern_Brass dans les ruines d'East Cove
    reward: 4 silver + Recipe_LightOilCommon
    flavor_lines: 3 lignes paramétrées par mood Méfiance
```

### 6. NPC Generator

Les **identités** des NPCs principaux sont écrites à la main (cf. [[PNJ]]). Le générateur **habille** : tenue saisonnière, dialogues d'ambiance d'Ère, posture (mood).

```yaml
input:
  npc_template: Innkeeper_Generic
  era_mood: Effroi
  region: Caldegar
output:
  outfit_layer: Era_Voile_Innkeeper_Apron (tint shadow)
  ambient_lines:
    - "Ferme tôt ce soir. Et toi aussi tu devrais rentrer."
    - "On a entendu des choses dans la brume hier."
  posture_anim: posture_wary
```

### 7. Loot Generator

Drops conditionnés par : type de créature × variant × Ère × niveau du joueur × *facteur d'incertitude*.

```yaml
input:
  killed_entity: Loup_Shadow (variant Shadow @ Era_Voile)
  player_level_band: 20-30
output:
  rolls:
    - { table: T_Wolf_Common, weight: 0.7 }
    - { table: T_Variant_Shadow, weight: 0.25 }    # essences d'ombre
    - { table: T_Era_Voile_Memory, weight: 0.05 }  # fragment narratif
```

### 8. Event Generator

Boucle continue : pour chaque sous-zone, "y a-t-il un événement à lancer ?". Décision basée sur cooldown, densité de joueurs, état d'Ère.

```yaml
trigger_check: every 30s per subzone
chosen_event:
  template: T_AmbushFromMist
  scaling: party_size + era_tension
  duration: ~10min
  unique_loot_chance: 8%
```

### 9. Trace Generator

> [!important] Les traces permanentes
> Quand une Ère se termine, le monde **garde des cicatrices**. Le TraceGenerator décide quelles traces déposer, où, pour combien de temps. Certaines durent une Ère, d'autres toute la Partie, d'autres au-delà du Grand Souffle.

```yaml
input:
  ending_era: Era_Voile (Noctis dominant, durée 7 mois)
  intensity: high (joueurs ont participé à 4 événements signature)
output:
  traces:
    - { type: visual_overlay, asset: Decal_ShadowSeep, region: Caldegar, lifespan: 1 era }
    - { type: location, asset: Ruin_VeilTemple, coords: 1284,2031, lifespan: full_partie }
    - { type: lore_entry, codex_id: VoilesDuSiecle, public: true }
```

### 10. Item Modifier Generator

Affixes temporaires liés à l'Ère, qui disparaissent ou se neutralisent au Souffle suivant.

```yaml
example:
  base_item: Sword_Iron_Standard (mastery 30)
  era_aura: Voile (Noctis)
  computed_modifiers:
    - "+5% damage la nuit"
    - "regen 1pt/s en zone d'ombre"
  expires_at: next_petit_souffle  # l'aura s'éteint, l'épée reste
```

### 11. Plant / Decoration Generator

Pilote le **PCG d'UE5** : densités de foliage, choix de pousses, props secondaires. Aucune intervention manuelle de level designer.

```yaml
input:
  biome: Foret_Caldegar
  era_state: Dégénérescence
  era_dominant: Noctis
output:
  pcg_overrides:
    - foliage_density.flowers: 0.2 (×0.4)
    - foliage_density.deadwood: 1.4 (×2.5)
    - foliage_palette.tint: #2A1F2E
    - decoration_props: [Lantern_Broken, MossSpread_Shadow]
```

### 12. Behavior Generator

Sélectionne des profils d'IA déjà écrits (cf. archétypes IA en Couche A) selon le mood d'Ère.

```yaml
input:
  base_creature: Wolf
  era_mood: Effroi, era_tension: Haute
output:
  behavior_profile: Wolf_Aggressive_Pack (size 4-6, ambush-prone)
```

---

## Les 10 variants visuels

Les variants sont **mappés sur la cosmologie** (cf. [[Cosmologie]]). Chaque variant = un set cohérent shader + Niagara + audio + aura.

| Variant | Entité dominante | Shader principal | Niagara | Audio signature | Aura IA |
|---------|------------------|------------------|---------|-----------------|---------|
| **Shadow** | Noctis (Éternel) | tint sombre, fresnel violet | wisps noirs, particules d'ombre | murmures basse fréquence | peur faible |
| **Spectral** | Tempora (blessé) | translucide, dépolarisation | flux rétrograde, glitch | échos temporels | vertige court |
| **Frost** | Aquor (état froid) | givre, microcristaux | flocons, brume bleue | craquements glace | ralentissement |
| **Verdoyant** | Spiritus + Terranu | mousse, croissance | spores, pollens | bourdonnements | calme/charme |
| **Brûlé** | Voie de Feu (extension) | charbon, lave | braises, fumée | crépitements | dégâts continus |
| **Pourpre** | Umbra (Céleste) | iridescent violet | particules secrètes | chuchotements aigus | confusion |
| **Doré** | Eldoria (en sommeil, rêve) | dorures, lumière interne | étincelles solaires | carillons | aveuglement bref |
| **Brisé** | Tempora (failles aiguës) | fissures lumineuses | éclats, désynchro | parasites | déphasage |
| **Onirique** | Somnix (Cosmique du rêve) | flottement, halo pastel | volutes, papillons | nappes oniriques | sommeil/désorientation |
| **Vénérable** | Fatum (Cosmique) | patine, runes anciennes | poussière dorée | basses graves | révérence/peur fond |

> [!note] Extensibilité
> Ajouter un 11ᵉ variant coûte ~1-2 semaines artiste senior (shader + FX + audio + tests sur 5 archétypes meshes). C'est l'investissement le plus rentable du projet.

---

## Exemple concret : système de matériaux et recettes

### Couche A — Assets de base

```yaml
assets_base:
  meshes:
    - Sword_GenericMesh_v1   # 3 ans en prod, jamais touché
    - Sword_GenericMesh_v2   # variante taille
  shaders_master:
    - M_Metal_Master (params: base_color, fresnel, edge_glow, noise_pattern)
  niagara_master:
    - NS_WeaponAura_Master (params: color, density, speed, pattern)
  audio_master:
    - SFX_MetalImpact_Pack (12 variations physiques)
```

### Couche B — MaterialGenerator + RecipeGenerator

```yaml
era: Era_Voile (Noctis dominant, Umbra secondaire, mood Effroi, tension Haute, emphase Caldegar)

material_generator_output:
  iron_standard:    available_everywhere
  iron_shadow:      available_in_caldegar_pendragoria_at_night
  iron_solar:       UNAVAILABLE (Eldoria dort, l'Ère ne porte pas son énergie)
  cloth_veiled:     available_via_looms_during_era

recipe_generator_output:
  - sword_iron_standard:     toujours
  - sword_iron_shadow:       craftable cette Ère, devient relique après
  - sword_iron_solar_seeker: 🔒 conditions cachées, seuls quelques artisans découvrent
```

### Couche C — Instances en jeu

```yaml
inventory_player_X:
  - Sword_IronStandard (forgé Ère précédente, stable)
  - Sword_IronShadow (forgé Ère actuelle, aura "perdra son éclat au Souffle")
  - Recipe_KnownByPlayer: [sword_iron_shadow]  # survit au Souffle (cf. [[Le Souffle]])
```

### Effet économique cyclique

> [!example] La boucle vertueuse
> - **Pendant l'Ère du Voile** : Fer-Ombre est minable. Marché actif. Joueurs forgent des armes.
> - **Au Petit Souffle suivant** : Fer-Ombre disparaît du minage. Les armes existantes deviennent **reliques d'Ère**.
> - **Sur la durée d'une Partie (1-2 ans)** : ces reliques prennent de la valeur narrative *et* économique. Une "Lame d'Ombre du Voile" à la 4ᵉ Ère de la Partie est une pièce de musée.
> - **Au Grand Souffle (transition d'Ères majeure, pas une fin de Partie joueur)** : compression renforcée des stats brutes (formule canonique au-dessus de 50), mais Héritage, items, Maîtrises et identité persistent — voir [[Le Souffle]] §Grand Souffle.

C'est la **mécanique de rareté générée par le temps**, pas par les drop rates.

---

## Exemple concret : variants de créatures

```
Couche A : Loup_Base (1 mesh, 1 set d'animations, 1 BehaviorTree générique)

Couche B : VariantGenerator × 6 variants applicables

Couche C : 6 instances perçues
   → Loup_Standard         (ambiance par défaut)
   → Loup_Shadow           (Ère du Voile)
   → Loup_Frost            (Ère du Long Hiver)
   → Loup_Verdoyant        (Ère de la Floraison)
   → Loup_Spectral         (proche d'une Faille de Tempora)
   → Loup_Vénérable        (rare, Fatum)
```

Coût production : **1 loup**. Perception joueur : **6 loups différents**, avec ambiances cohérentes liées au lore. La même logique s'applique à toutes les créatures.

---

## Le générateur d'Ère — chef d'orchestre

```
                    ┌──────────────────────────┐
                    │    SOUFFLE DÉCLENCHÉ     │
                    │  (cf. [[Le Souffle]])│
                    └────────────┬─────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │   EraGenerator.RollNewEra()  │
                  │   → tire OU lit la config    │
                  │     d'Ère (6 dimensions)     │
                  └──────┬───────────────────────┘
                         │ era_config: { dom, sec, state, mood, tension, focus }
                         │
        ┌────────────────┼────────────────┬──────────────────┐
        ▼                ▼                ▼                  ▼
   MaterialGen      VariantGen        QuestGen          PlantDecoGen
   (recalcule       (active set       (filtre           (PCG override
    table mat.)      shader/FX)        templates)        densités)
        │                │                │                  │
        ▼                ▼                ▼                  ▼
   RecipeGen        BehaviorGen      NPCGen            EventGen
   (recalcule       (ajuste          (dialogues +      (active pool
    craftable)       agressivité)     tenues)           événements)
        │                │                │                  │
        └────────────────┴────────────────┴──────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   ItemModifierGen sweep  │
                    │   sur inventaires actifs │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   TraceGen finalise les  │
                    │   traces de l'Ère sortie │
                    └──────────────────────────┘
```

Tout cela se résout en quelques secondes côté serveur, puis se diffuse aux clients via une **petite config**.

---

## Multiplayer — bande passante

> [!important] Coût réseau
> Une transition d'Ère **n'envoie pas de textures, pas de meshes, pas de sons**. Elle envoie **un JSON de quelques kilo-octets**. Tout le reste est résolu localement par le client à partir de Couche A déjà installée.

### Format de payload (exemple)

```json
{
  "era_id": "voile_du_3eme_souffle",
  "era_index_in_partie": 3,
  "started_at_ms": 1738240000000,
  "predicted_duration_days": 210,
  "dimensions": {
    "dominant": "noctis",
    "secondary": "umbra",
    "state": "Dégénérescence",
    "mood": "Effroi",
    "tension": "Haute",
    "emphasis_continents": ["caldegar"]
  },
  "variant_pool_active": ["shadow", "spectral", "venerable"],
  "material_table_diff": {
    "+": ["iron_shadow", "cloth_veiled"],
    "-": ["iron_solar", "petals_dawn"]
  },
  "event_pool_seed": 88412,
  "quest_pool_seed": 99231,
  "trace_overlay_url": "cdn://traces/voile_03.bin",
  "narrative_codex_unlocks": ["voile_03_intro"]
}
```

Taille typique : **2-6 KB**. Diffusable à des dizaines de milliers de joueurs sans pression réseau.

### Synchronisation

- Le **serveur** est l'autorité sur `era_id`, `event_pool_seed`, `quest_pool_seed`
- Le **client** rejoue les générateurs avec le seed → mêmes résultats que le voisin
- Les **événements signature** restent autoritaires serveur (loot unique, narratif global)

---

## Production : tiers de coût

> [!success] Le secret de scalabilité

### TIER 1 — GRATUIT (UE5 natif, paramétrage)
**Coût** : minutes à heures de tweak.
**Couvre** : ~80 % de la sensation d'Ère.

- Sky / éclairage global
- Volumes de post-process
- Niagara ambiantes (brouillards, particules d'air)
- Météo dynamique
- Layers audio ambiance + mix
- Spawn tables (qui apparaît, où, à quelle densité)
- Cycles jour/nuit (longueur, contraste)
- Densités de foliage (PCG)
- Dialogues d'ambiance PNJ
- Couleurs UI (subtilement)

### TIER 2 — RÉUTILISATION (1 jour à 1 semaine)
**Coût** : assets-jours d'un artiste mid.
**Couvre** : ~15 % du delta sensoriel d'Ère.

- Reskin créature (tint + petites modifs shader)
- Variantes décoratives (lanternes, banderoles, autels d'Ère)
- Variants de matériau de terrain (decals, overlays)
- Aura/effet cosmique de l'entité dominante
- Comportements IA additionnels (modulés)
- Items éphémères (bibelots, consommables d'Ère)

### TIER 3 — CRÉATION COÛTEUSE (réservé moments clés)
**Coût** : semaines à mois.
**Couvre** : ~5 % — les moments **iconiques** que la communauté retient.

- Nouveau modèle 3D créature (1-2 par Partie maximum)
- Nouvelle zone explorable (jamais en cours de Partie ; uniquement entre Parties)
- Trace géologique majeure (cratère, faille, monument)
- Cinématique scénarisée
- Boss unique d'événement signature

> [!warning] Discipline
> Quand un designer dit "il faudrait un nouveau dragon de feu pour cette Ère", la première question est : **"Peut-on l'obtenir avec un variant + comportement modulé sur un mesh existant ?"**. 9 fois sur 10, oui.

---

## Géographie : ne change pas, mais paraît changée

> [!important] Heightmap fixe
> Les 12 continents (cf. [[Géographie]]) sont **figés à la heightmap près**. Aucun Souffle, aucun générateur ne déplace une montagne ou ne creuse une vallée — sauf un **Souffle Cardinal** (échelle des âges, hors d'une Partie).

Ce qui varie :

| Élément | Variabilité | Mécanisme |
|---------|-------------|-----------|
| Terrain (heightmap) | Aucune | Fixe |
| Matériau de terrain (texture, decals) | Forte | Couche shader |
| Foliage / décorations | Forte | PCG override |
| Lumière / sky | Forte | Sky preset + post-process |
| Météo | Forte | Météo paramétrique |
| Faune | Très forte | SpawnTable + Variants |
| Bâtiments majeurs | Faible | Quelques traces (TraceGen) |
| Routes / chemins | Aucune | Fixe (peut être occulté par foliage) |

**Résultat** : un joueur revenant à Caldegar après un an a la sensation de "ce n'est plus le même endroit", alors que la collision et les accès n'ont pas bougé d'un mètre. Sa carte mentale reste valide.

---

## Limites honnêtes

> [!warning] Ce que ce système **ne** fait **pas**

- **Il ne génère pas de nouvelles formes 3D**. Si l'Ère demande "un cosmique-poulpe géant", il faut un nouveau mesh (Tier 3).
- **Il ne réécrit pas la narration principale**. Les arcs de [[PNJ]] majeurs sont écrits humain.
- **Il ne corrige pas un manque de variants**. Avec 2 variants, tout se ressemble. Avec 10, tout respire. **Le seuil critique est ~6**.
- **Il dépend d'une Couche A solide**. Une Couche A pauvre = générateurs pauvres. *Garbage in, garbage out*.
- **Il ne sait pas faire d'humour ou d'émotion fine**. Les répliques narratives clés restent humaines ; seule la **modulation d'ambiance** est automatisée.

> [!info] Élargir l'espace
> Pour rendre les Ères plus distinctes, on n'écrit pas plus d'instances : on **investit Couche A et B**. Un nouveau shader maître, un nouveau template de quête, un nouveau preset sky — chaque ajout multiplie la combinatoire.

---

## Banque d'assets initiale recommandée

Minimum pour un système viable en pré-Alpha :

| Catégorie | Quantité cible | Justification |
|-----------|----------------|---------------|
| Créatures (mesh + skel + anims) | **~50** | Loups, ours, sangliers, cervidés, oiseaux, grands prédateurs, humanoïdes hostiles, créatures cosmiques |
| Matériaux génériques | **~30** | Bois, métaux, tissus, cuirs, pierres, essences magiques |
| Variants visuels | **~10** | Liste fournie plus haut. **Seuil minimal viable : 6** |
| Effets Niagara maîtres | **~40** | Ambiance, impacts, auras, sorts, climat |
| Sons | **~200** | Footsteps multi-surfaces, vocalisations, ambiances, UI |
| Sky presets | **~6** | Aube, jour, crépuscule, nuit, météo dégradée, surnaturel |
| Templates de quêtes | **~40-80** | Pour avoir variété narrative sans répétition manifeste |
| Archétypes IA (BTs) | **~15** | Patrouilleur, embuscade, tank, fuyard, harceleur, gardien… |
| Templates d'événements | **~30** | Embuscades, phénomènes, apparitions, festivals, raids |
| Modèles de PNJ habillables | **~25** | Aubergiste, garde, marchand, érudit, prêtre, paysan, voyageur… |

**Investissement total estimé** (pré-Alpha solide) : 4-6 personnes × 6-9 mois sur Couche A. C'est **un seul effort frontal**, ensuite la Couche B prend le relais.

---

## Procgen : où elle aide, où elle nuit

| Domaine | Procgen ? | Pourquoi |
|---------|-----------|----------|
| **Terrain global** (heightmap) | ❌ | Lisibilité du monde, mémoire spatiale joueurs |
| **Donjons instanciés** | ✅ | Variabilité élevée, pas de mémorisation attendue |
| **Placement de décorations / foliage** | ✅ (UE5 PCG) | Couche dense, rejouable, peu signifiante isolément |
| **Loot tables** | ✅ | Variabilité = surprise = engagement |
| **Quêtes secondaires** | ✅ (templates) | Volume nécessaire vs coût d'écriture humaine |
| **Quêtes principales / arcs** | ❌ | Émotion, cohérence, voix |
| **Événements de zone** | ✅ | Densité élevée, rejouabilité |
| **Événements signature** | ❌ | Iconiques, écrits humain |
| **Dialogues de fond PNJ** | ✅ (modulation) | Volume immense, modulation suffit |
| **Dialogues clés** | ❌ | Voix d'auteur |
| **Comportements IA détaillés** | ❌ (sélection oui) | BT écrits main, mais sélectionnés par BehaviorGen |

---

## Éditeur d'Ère (outil designer)

> [!example] Concept de l'outil interne
> Un éditeur visuel intégré à UE5 permet à un designer de **composer une Ère en remplissant des champs**, puis de l'exporter en YAML/template prêt à être servi par EraGenerator.

### Maquette d'interface (conceptuelle)

```
╔══════════════════════════════════════════════════════════════════╗
║  ERA COMPOSER                                          [Save…]   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Identifiant       : [voile_du_3eme_souffle________________]   ║
║  Nom narratif      : [L'Ère du Voile_______________________]   ║
║                                                                  ║
║  ── Dimensions cosmiques ────────────────────────────────────── ║
║  Force dominante   : [Noctis        ▾]  (Éternel)              ║
║  Force secondaire  : [Umbra         ▾]  (Céleste)              ║
║  État du monde     : [Dégénérescence▾]                         ║
║  Mood social       : [Effroi        ▾]                         ║
║  Tension cosmique  : [────────●──── ]  Haute                   ║
║  Emphase continents: [✓ Caldegar  ✓ Pendragoria  ☐ ...]        ║
║                                                                  ║
║  ── Variants actifs ─────────────────────────────────────────── ║
║  [✓] Shadow   [✓] Spectral   [✓] Vénérable                    ║
║  [☐] Frost    [☐] Verdoyant  [☐] Doré         ...             ║
║                                                                  ║
║  ── Tables (overrides) ──────────────────────────────────────── ║
║  Materials (+/−)   : [iron_shadow +0.4]  [iron_solar -1.0]     ║
║  Quest templates   : [✓ T_RetrieveLost  ✓ T_PursueShadow ...]  ║
║  Events signature  : [+ Add: La Brume d'Ezra]                  ║
║                                                                  ║
║  ── Aperçu live (PIE) ───────────────────────────────────────── ║
║  Zone de test : [Caldegar_Port ▾]   [▶ Apply era preview]      ║
║                                                                  ║
║  ── Validation ──────────────────────────────────────────────── ║
║  ⚠ Ratio "tier 3" prévu : 0   ✓ Reuse only                     ║
║  ✓ Variants couvrent ≥3 archétypes meshes                      ║
║                                                                  ║
║  [ Export YAML ]  [ Send to staging ]  [ Roll on shard QA ]    ║
╚══════════════════════════════════════════════════════════════════╝
```

L'export produit un fichier YAML signable, versionné en repo, qu'EraGenerator consomme.

---

## Roadmap de réalisation

### Phase 1 — Foundation (2-4 semaines)
- EraGenerator + VariantGenerator + MaterialGenerator
- 1 Ère thématique POC (jouable interne)
- 2 variants visuels minimum
- **Critère** : un Souffle interne fait basculer le monde de manière sensible

### Phase 2 — Variation (4-6 semaines)
- 5-6 variants visuels créatures
- RecipeGenerator + ItemModifierGenerator
- Première Ère thématique réelle (déployable QA)
- **Critère** : une Ère "Voile" et une Ère "Floraison" se distinguent au premier regard

### Phase 3 — Library (2 mois)
- 3-4 archétypes d'Ère pré-paramétrés (Voile / Floraison / Long Hiver / Bouleversement)
- QuestGenerator + EventGenerator
- TraceGenerator (premières traces persistantes)
- **Critère** : un cycle de 3 Ères enchaînées laisse des traces lisibles dans le monde

### Phase 4 — Pré-Alpha (2-3 mois)
- Cycle complet jouable bout-en-bout
- Prédiction d'Ère par Oracle/Astronome (cf. [[PNJ]] et règles publiques/secrètes)
- 10 variants visuels complets
- Éditeur d'Ère utilisable par les designers
- **Critère** : une Partie réduite (3-4 mois compressés) montre la mécanique

### Phase 5+ — Continu (vie du projet)
- Ajouts d'Ères (catalogue qui grossit)
- Traces permanentes affinées
- Événements signature ajoutés Ère par Ère
- Conditions cachées 🔒 enrichies au fil du temps

---

## Documentation des règles vs secrets

> [!info] Lisibilité publique vs mystère

Hybelior maintient deux registres :

### Règles **publiques** (apprenables en jeu)
- Mécanique générale du Souffle (cf. [[Le Souffle]]) : tout joueur l'apprend en quelques semaines de jeu
- Préservation des invariants (Renom, recettes connues, items, cosmétiques)
- Existence des Ères et de leurs dimensions (Oracle, Astronome enseignent)
- Catalogue des variants visuels (les joueurs identifient "ah, du Spectral" rapidement)

### Conditions **cachées** 🔒
- Recettes débloquées par interactions précises (artisans senior les découvrent par tâtonnement, cf. [[Armes et Maîtrise]])
- Critères de déclenchement de certains événements signature
- Traces permanentes dont l'apparition dépend de comportements collectifs joueurs
- Probabilités exactes de drop/spawn
- Critères de résurgence d'Eldoria, signal annonçant un Grand Souffle

> [!warning] Discipline
> Ce qui est documenté côté joueur **ne doit jamais inclure** la liste exhaustive des paramètres. Le mystère est une mécanique, pas un oubli.

---

## Auto-génération vs curation

Modèle **hybride** :

```
   [État du monde + cosmologie + historique des Ères]
                       │
                       ▼
         ┌─────────────────────────────┐
         │  IA propose un draft d'Ère  │
         │  (6 dimensions + variants)  │
         └──────────────┬──────────────┘
                        │
                        ▼
         ┌─────────────────────────────┐
         │  Designer valide / ajuste   │
         │  (Éditeur d'Ère, ci-dessus) │
         └──────────────┬──────────────┘
                        │
                        ▼
         ┌─────────────────────────────┐
         │  Export YAML + déploiement  │
         │  via EraGenerator           │
         └─────────────────────────────┘
```

**Pourquoi pas full-auto ?** Parce que la cohérence narrative à long terme (sur 1-2 ans de Partie) demande un regard humain. Une IA pourrait enchaîner trois Ères sombres et tuer la Partie ; un designer corrige.

**Pourquoi pas full-manuel ?** Parce que paramétrer 4-6 Ères par Partie à la main, sur 12 continents, sans assistance, est un goulot d'étranglement. L'IA fait 80 % du travail mécanique.

---

## Métriques de santé du système

> [!success] Indicateurs à monitorer en pré-Alpha

| Métrique | Cible | Si dérive |
|----------|-------|-----------|
| Coût production par Ère | ≤ 5 jours-homme | Investir Couche B (templates) |
| % de Tier 1 dans une Ère | ≥ 70 % | Discipline Tier 3 |
| Taille payload Ère | ≤ 10 KB | Auditer générateurs |
| Identifiabilité d'Ère par joueur (test) | ≥ 80 % à 5 min | Renforcer variants/sky/audio |
| Reuse rate des templates de quête | ≥ 60 % | OK : signe d'élasticité |
| Diversité perçue créatures | ≥ 6 variants visibles par session moyenne | Activer pool variants plus large |

---

## TL;DR

1. **Trois couches** : Assets de base (coûteux, une fois) → Générateurs (moyennement coûteux, durables) → Instances (gratuites, runtime).
2. **12 générateurs** orchestrés par EraGenerator, déclenchés par chaque [[Le Souffle]].
3. **10 variants visuels** mappés sur la cosmologie ([[Cosmologie]]) — multiplicateur de perception.
4. **80 % de la sensation d'Ère est gratuite** (Tier 1 UE5 natif). 5 % seulement est coûteux (Tier 3).
5. **La géographie ne bouge pas**. Tout le reste, oui — proprement, paramétriquement, sans coût exponentiel.
6. **Un éditeur d'Ère** permet aux designers de composer plutôt que de produire.
7. **Hybride IA + curation humaine** pour la cohérence narrative à long terme.

---

*Liens : [[Le Souffle]] | [[Les Ères]] | [[Cosmologie]] | [[Géographie]] | [[PNJ]] | [[Armes et Maîtrise]] | [[Production]]*
