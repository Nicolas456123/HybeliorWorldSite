---
tags: [production, roadmap, assets, pipeline, implementation, specs]
status: drafted
last_review: 2026-05-07
needs_review_for: [validation-équipe, banque-assets-finalisée]
type: implementation-spec
implements: "[[Production]]"
---

# Production Spec — Tiers de coût, banque d'assets, roadmap, équipe

> Cette page chiffre la stratégie de production exposée philosophiquement dans [[Production]]. Tout ce qui relève de quantités, ratios, durées, coûts, mockups d'éditeur, métriques de succès, est ici. La page narrative en parle en prose qualitative.

---

## Tiers de coût de production

Chaque asset ou modification du monde tombe dans un des trois tiers. Le ratio cible est **80/15/5**.

### Tier 1 — Gratuit (UE5 natif)

Tout ce qui peut être configuré via une `DataAsset` ou un preset existant. **Coût quasi-nul par ère.**

| Élément | Outil UE5 | Effort par ère |
|---|---|---|
| Sky / lumière globale | `USkyAtmosphereComponent` + presets | 0 (sélection preset) |
| Post-process global | `UPostProcessVolume` (saturation, tint, vignette, contraste) | 0 (slider) |
| Particules ambiantes | Niagara templates pré-construits | 0 (toggle on/off) |
| Météo dominante | Système météo data-driven (already coded) | 0 (config) |
| Audio ambiant | UE5 audio mix overrides | 0 (mix preset) |
| Spawn tables | `UDataTable` lookup par ère | 0 (data swap) |
| Cycles jour/nuit | `UDirectionalLightComponent` curves | 0 (curve preset) |
| Densité foliage | World Partition density override | 0 (mask data) |
| Dialogues PNJ | Templates IA paramétrés (LLM ou behavior tree) | 0 (variables remplies) |
| Couleur lumière | `FLinearColor` config | 0 (palette swap) |

> Cible : **80 %** de la sensation d'ère doit venir d'ici.

### Tier 2 — Réutilisation (1j à 1sem par ère)

Travail outillé : on réutilise des assets existants en y appliquant un traitement codé.

| Élément | Effort | Outil |
|---|---|---|
| Reskin créature (shader + matériau cosmique) | 1-2 j / créature | Material Instance + Niagara attach |
| Variantes décoratives (modular meshes) | 2-3 j / set | ISMC + Material variants |
| Variants matériaux terrain (overlays) | 2-3 j | Landscape Material Layers |
| Aura/effet sur entité (Niagara attaché) | 1 j / créature | Niagara emitter spawn-attach |
| Variantes comportement IA | 2-3 j / créature | StateTree / BehaviorTree decorators |
| Items éphémères de craft | 2-3 j / recette | Recipe Generator + Item Modifier |
| Variant audio (filtre EQ + reverb) | 0,5 j | Sound Mix override |

> Cible : **15 %** de la sensation d'ère.

### Tier 3 — Création coûteuse (réservé aux moments clés)

| Élément | Effort | Fréquence |
|---|---|---|
| Nouvelle créature modèle 3D complet | 2-4 semaines | 1-2 par Partie max |
| Nouvelle zone modélisée | 2-3 mois | **Jamais en cours de Partie** |
| Trace géologique permanente | 1-2 semaines | Quand un événement majeur l'exige |
| Cinématique unique | 3-6 semaines | Réservé à L'Arrachement final ou moments narratifs majeurs |
| Boss model + animation set complet | 4-6 semaines | 1 par grande ère |

> Cible : **5 %** de la sensation d'ère, réservé aux moments mémorables.

---

## Banque d'assets initiale (recommandation pré-Alpha)

### Modèles 3D créatures (~50 créatures de base)

Spread suggéré, couvrant plusieurs écosystèmes (forêt, marais, désert, montagne, marin, urbain, souterrain) :

- **15 créatures « communes »** — loups, sangliers, cerfs, ours, chevaux sauvages, lapins, oiseaux génériques, poissons, rats
- **15 créatures « rares »** — wyverns mineurs, golems de pierre, élémentaires, sylphes, gardiens elite, bêtes mythiques mineures
- **10 créatures « boss »** — avec phases multiples, IA scriptée, drops uniques
- **10 créatures « mythiques/saisonnières »** — apparition selon ères et conditions cachées

Chaque créature **doit** disposer du set d'animations standard :
- `idle`, `walk`, `run`, `attack_primary`, `attack_secondary`, `hurt`, `die`, `special` (taunt, channel, etc.)
- Plus 3 slots libres pour variantes de comportement.

### Variants visuels (les 10 à implémenter)

| Variant | Force cosmique | Effet shader | Effet Niagara |
|---|---|---|---|
| **Shadow** | Noctis | Shader sombre, contraste augmenté | Particules d'ombre |
| **Spectral** | Tempora | Translucidité, fresnel bleu | Écho audio + traînée |
| **Frost** | Aquor (froid) | Givre overlay, cristaux | Brume glacée + ralenti |
| **Verdoyant** | Spiritus + Terranu | Lierres, mousse, vert profond | Pollen + spores |
| **Brulé** | Voie de Feu | Cendres, braises, fissures luminescentes | Étincelles + fumée |
| **Pourpre** | Umbra | Brouillard pourpre, désaturation | Volutes pourpres |
| **Doré** | Eldoria | Éclat lumineux, rim light or | Poussière dorée |
| **Brisé** | Tempora aigu | Glitch visuel, fragmentation | Distorsion temporelle |
| **Onirique** | Somnix | Couleurs irréelles, halos | Bulles oniriques |
| **Vénérable** | Fatum | Marques runiques gravées | Glyphes flottants |

> **Coût estimé : ~1 semaine pour les 10 variants** si la chaîne d'outillage (master shader paramétré + templates Niagara) est en place. Sans outillage : 2-3 semaines.

### Matériaux et palettes

- **~30 matériaux de base**
  - Métaux : fer, acier, argent, or, mithril, cuivre, bronze
  - Bois : chêne, ébène, bouleau, if, pin, bambou
  - Cuirs : vache, sanglier, dragonide, exotique
  - Tissus : lin, soie, laine, brocart
  - Pierres : granit, marbre, obsidienne
- **10 traitements cosmiques** (un par variant ci-dessus)
- **Total : 30 × 10 = 300 instances de matériaux possibles**, chacune une simple ligne de data dans une `UDataTable`.

### Plantes et décoration

- **~100 plants/décorations** — arbres, buissons, herbes, fleurs, champignons, rochers, ruines modulaires
- Chacun doit avoir **3-5 variants visuels** (saison + ère)
- Total perçu : ~400 décorations différentes

### Audio

- **~200 sons de base**
- Banques : `ambient_nature`, `weather`, `creatures`, `footsteps`, `combat`, `magic`, `ui`, `voice`
- Variants par ère via filtres EQ + reverb (Tier 1)

### Effets Niagara

- **~40 effets de base** — particules ambiantes, magie, hits, météo, auras, traces
- Réutilisables, combinables, paramétrés (couleur, intensité, density)

### Sky presets

- **~6 presets fondamentaux** — `clear_day`, `overcast`, `storm`, `dawn`, `dusk`, `night`
- **10-15 variantes thématiques par ère** (eg. `dusk_pourpre`, `night_shadow`, `storm_brise`)

---

## Roadmap de réalisation

### Phase 1 — Foundation (2-4 semaines)

**Objectif** : système d'ère paramétrique fonctionnel, Tier 1 only.

- Era Generator codé (lecture template → application config monde)
- Variant Generator codé (recolor + spawn Niagara attach)
- Material Generator codé (instances dynamiques)
- Une seule « ère type » jouable (ère neutre de référence)
- Banque d'assets minimale : **10 créatures**, **10 matériaux**, **5 variants**
- Test multiplayer : payload config envoyé aux clients, vérification de réplication
- **Livrable** : démo interne d'un changement d'ère en temps réel

### Phase 2 — Variation (4-6 semaines)

**Objectif** : première ère vraiment thématique, démontrer la valeur du système.

- Implémenter les **10 variants visuels** complets
- 5-6 variants visuels appliqués sur **20 créatures**
- 1 archétype d'ère réellement implémenté (eg. **Ère de l'Ombre Longue / Noctis dominante**)
- Recipe Generator + Behavior Generator
- 1 événement mondial spécifique à l'ère
- Banque enrichie : **30 créatures**, **20 matériaux**
- **Livrable** : 1 ère pleinement jouable, démo externe (presse, investisseurs, communauté)

### Phase 3 — Library (2 mois)

**Objectif** : 3-4 archétypes d'ère implémentés, cycle commence à exister.

- Quest Generator + NPC Generator + Loot Generator
- 3 archétypes d'ère (**Ombre Longue**, **Verdoiement**, **Échos Brisés** par exemple)
- Bibliothèque de modules narratifs (~50 modules réutilisables)
- Première itération du **système de prédiction** (Astronomie, Lecture animale)
- Banque : **40 créatures**, toutes les variantes nécessaires
- **Livrable** : cycle d'ères jouable, ~6 mois de contenu équivalent

### Phase 4 — Pré-Alpha publique (2-3 mois)

**Objectif** : cycle complet d'ères jouable par des joueurs externes.

- Trace Generator (premières traces permanentes inscrites dans le monde)
- Event Generator
- Toutes **5 disciplines de prédiction** implémentées
- Bourse des Augures fonctionnelle
- **5+ archétypes d'ère** dans le catalogue
- Première **Partie publique** (testing fermé puis ouvert)
- **Livrable** : pré-alpha jouable

### Phase 5+ — Continu

**Objectif** : enrichissement permanent du catalogue.

- 1-2 assets signature par grande ère (création Tier 3 ciblée)
- Nouvelles ères ajoutées au catalogue
- Conditions cachées enrichies (les comportements émergents qui « s'éveillent » selon l'état du monde)
- Refinements basés sur retours joueurs
- Évolution d'Hybelior à travers les Parties successives (l'univers garde mémoire)

---

## L'Éditeur d'Ère (outil designer)

### Maquette d'interface

```
╔═══════════════════════════════════════════╗
║  Era Editor — UE5                         ║
╟───────────────────────────────────────────╢
║  Nom: [Ère du Crépuscule Pourpre______]   ║
║  Force dominante: [Noctis ▼] Intensité: 0.8║
║  Force secondaire: [Umbra ▼] Intensité: 0.5║
║  État du monde: [Dégénérescence ▼]        ║
║  Mood social: [Effroi ▼]                  ║
║  Tension cosmique: [Haute ▼]              ║
║  Continent emphase: [Cendara, Onara]      ║
╟───────────────────────────────────────────╢
║  Variants activés:                        ║
║  ☑ Shadow (loup, cerf, sanglier)          ║
║  ☑ Pourpre (faune nocturne, brouillards)  ║
║  ☐ Frost                                  ║
║  ...                                      ║
╟───────────────────────────────────────────╢
║  Matériaux débloqués:                     ║
║  ☑ Iron_Shadow                            ║
║  ☑ Wood_Pourpre                           ║
╟───────────────────────────────────────────╢
║  Quêtes pondérées:                        ║
║  escort_through_dark: ×3                  ║
║  hunt_haunted_creature: ×2                ║
╟───────────────────────────────────────────╢
║  Atmospherics:                            ║
║  Sky tint: [dark_purple] (preview)        ║
║  Particles: [shadow_mist]                 ║
║  Light intensity: 0.6                     ║
║                                           ║
║  [Save Template] [Test In-Game]           ║
╚═══════════════════════════════════════════╝
```

### Fonctionnalités

- **Preview en temps réel** — Le viewport UE5 montre comment l'ère rend dans une zone test, en direct.
- **Save as YAML/template** — Versionné via Git, lisible par humain, exportable.
- **Test playthrough rapide** — Charger l'ère dans une zone test isolée pour playtest 5-10 minutes.
- **Export pour playtest serveur** — Push direct sur un serveur de staging OWS pour tests multi.
- **Versioning et tagging des templates** — Historique des modifications, retours en arrière, comparaisons A/B.
- **Validation automatique** — L'éditeur refuse les configurations invalides (ex. : intensité totale > 1.5, conflits de variants incompatibles).

---

## Équipe et compétences requises

Profils nécessaires pour la production. La taille minimale viable est ~6 personnes ; la taille cible pré-Alpha est ~10-12.

| Profil | Mission principale | Priorité |
|---|---|---|
| **Designer Système** | Architecture data-driven, équilibrage générateurs, métriques | Critique |
| **Designer Lore/Narratif** | Ères, traces, archétypes, arcs narratifs | Critique |
| **Tech Designer** | Paramétrer, créer templates ère, maintenir l'éditeur | Critique |
| **Programmeur Engine (UE5/C++)** | Générateurs, multiplayer config, GAS | Critique |
| **Programmeur Backend (.NET/OWS)** | Services microservices, persistance, économie | Critique |
| **Artist 3D (créatures/env)** | Modèles haute qualité, animations | Important |
| **Artist Tech (shaders)** | Master shader paramétré, variants, master materials | Critique |
| **Artist VFX (Niagara)** | Templates effets, variants cosmiques | Important |
| **Sound Designer** | Audio modulaire, banques, variants par ère | Important |
| **Artist UI/UX** | HUD, éditeur d'ère, écrans cosmiques | Important |
| **QA / Playtesters** | Tester équilibrage, valider ères, reproduire bugs | Important |

> **Note** : Le rôle de **Tech Designer** est le plus sous-estimé en MMO. Sur Hybelior, il est central. Sans lui, l'éditeur d'ère devient un outil mort que personne n'utilise.

---

## Risques et mitigations

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Dérapage scope sur les variants | Élevée | Élevé | Stricte liste fermée de **10 variants**, refus catégorique d'en ajouter avant Phase 5 |
| Équilibrage ère désordonné | Élevée | Moyen | L'éditeur permet tests rapides + métriques in-game (durée combat, taux mortalité) |
| Cohérence narrative entre ères | Moyenne | Élevé | Arc narratif planifié à grandes mailles + revue narrative obligatoire avant publication d'ère |
| Bug de compression stats / réplication | Moyenne | Critique | Rollback automatique si anomalie détectée (replication health checks) |
| Explosion combinatoire des recettes | Élevée | Moyen | Ne **générer instances** que si réellement utilisées par recette/joueur (lazy materialization) |
| Dette de banque d'assets initiale | Élevée | Élevé | Phase 1 verrouillée à 10 créatures, ne pas commencer Phase 2 si banque incomplète |
| Charge serveur sur changement d'ère | Moyenne | Élevé | Payload < 50 KB enforced + tests de charge OWS avant chaque release |
| Outils éditeur non adoptés par designers | Moyenne | Critique | Tech Designer dédié à l'amélioration continue de l'éditeur, sessions formation |
| Perte de cohérence Tier 1/2/3 (dérive vers Tier 3) | Élevée | Élevé | Revue mensuelle du ratio 80/15/5, alerte si déséquilibre |

---

## Métriques de succès production

Indicateurs mesurables pour valider la santé du pipeline :

- **Temps de création d'une nouvelle ère** : < 2 semaines (designer seul, sans programmeur)
- **Taille payload config ère** : < 50 KB transmis aux clients
- **Taux de réutilisation modules** : > 70 % du contenu d'une nouvelle ère vient de modules existants
- **Bug critique par ère** : < 2 à la sortie
- **Satisfaction joueurs sur la sensation de changement** : > 70 % retours positifs sur "le monde a vraiment changé"
- **Ratio Tier 1/2/3 effectif** : 75-85 % / 12-18 % / 3-7 %
- **Temps moyen entre détection bug et hotfix ère** : < 24h (rollback automatique inclus)
- **Croissance du catalogue d'archétypes** : +1 archétype d'ère par mois minimum à partir de Phase 3

---

## Pipeline d'intégration continue

Chaque template d'ère, avant d'être utilisé en Partie publique, doit passer :

1. **Validation automatique** (éditeur) — config valide, pas de conflits
2. **Test isolé** (zone test) — playthrough 10 minutes par designer
3. **Revue narrative** (designer lore) — cohérence avec arc en cours
4. **Test serveur de staging** (OWS) — 4 joueurs minimum pendant 1h
5. **Revue technique** (lead programmeur) — payload, perf, replication
6. **Approbation finale** — go/no-go par direction créative

> **Aucune ère ne va en prod publique sans avoir traversé les 6 étapes.** Le coût de cette discipline est élevé en heures, mais infiniment plus bas que celui d'une ère ratée vue par 5 000 joueurs.

---

*Liens : [[Production]] (philosophie narrative) | [[Architecture Data-Driven]] | [[Vision Rules]]*
