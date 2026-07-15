---
tags: [implementation, era, world-system, biomes, variants, balance, data-driven]
status: drafted
last_review: 2026-05-07
needs_review_for: [archetypes-supplémentaires, équilibrage-voies, coût-production]
type: implementation
canonical_concept: "[[Les Ères]]"
---

# Era System — Implémentation

> Page d'implémentation technique du concept narratif **[[Les Ères]]**.
> Cette page contient les **paramètres canoniques, tableaux d'archétypes, variants visuels, spawn tables, configuration data-driven**.
> Pour la philosophie, le ressenti in-world et la voix narrative : voir [[Les Ères]].
> Pour la mécanique de transition entre ères (compression, rouille, dérive d'Accord) : voir [[Souffle System]].

---

## Les 6 dimensions canoniques d'une Ère

Toute Ère est définie par un **EraConfig** — un objet sérialisable diffusé aux clients à chaque [[Souffle System|Souffle]]. Il porte 6 dimensions paramétriques.

| Dimension | Type | Valeurs possibles | Effet runtime |
|---|---|---|---|
| **1. Force dominante** | enum | 5 Éternels + 12 Cosmiques + 3 Célestes/Astraux principaux (~20 entrées) | Voie amplifiée, thème principal, biais quêtes IA |
| **2. Force secondaire** | enum | mêmes 20 entrées (≠ dominante) | Voie semi-amplifiée, dynamique narrative |
| **3. État du monde** | enum | `Floraison` · `Dégénérescence` · `Stagnation` · `Bouleversement` | Modifie densité foliage, comportement faune, prospérité PNJ |
| **4. Mood social** | enum | `Sérénité` · `Méfiance` · `Ferveur` · `Effroi` · `Curiosité` | Bias dialogues PNJ, factions, pondération types de quêtes |
| **5. Tension cosmique** | enum | `Faible` · `Moyenne` · `Haute` · `Critique` | Fréquence événements mondiaux, intensité phénomènes |
| **6. Continent emphase** | array<continent_id> | 1-2 des 12 continents | Multiplicateur d'événements et spawn rares localisés |

**Combinatoire théorique** : 20 × 19 × 4 × 5 × 4 × 13 = **>100 000 combinaisons**.
**Combinatoire utile** (avec contraintes de cohérence) : ~2 000 archétypes potentiellement intéressants.

---

## Catalogue des archétypes — table de référence

Chaque archétype = un fichier YAML versionné (~50-100 lignes) dans `Content/Data/Eras/`.

| Archétype | Dominante | Secondaire | État | Mood | Tension | Variants actifs |
|---|---|---|---|---|---|---|
| **Ombre Longue** | Noctis | Umbra | Dégénérescence | Effroi | Haute | Shadow, Pourpre |
| **Échos Brisés** | Tempora | Fatum | Bouleversement | Méfiance | Critique | Spectral, Brisé |
| **Rêve Lumineux** | Eldoria | Spiritus | Floraison | Ferveur | Faible | Doré, Verdoyant |
| **Vents Bouleversants** | Aerion | Climata | Bouleversement | Curiosité | Moyenne | (météo dominante) |
| **Verdoiement** | Spiritus | Terranu | Floraison | Sérénité | Faible | Verdoyant |
| **Sommeil de Glace** | Aquor (froid) | Eldoria (endormie) | Stagnation | Méfiance | Moyenne | Frost |
| **Brume Mortelle** | Noctis | Aquor (brumeux) | Dégénérescence | Effroi | Critique | Shadow, Frost, Pourpre |
| **Crépuscule Pourpre** | Noctis | Eldoria | Bouleversement | Ferveur | Haute | Doré, Pourpre, Shadow |
| **Sommeil Onirique** | Somnix | Tempora | Stagnation | Curiosité | Faible | Onirique |
| **Présages** | Fatum | Stellaris | Stagnation | Méfiance | Moyenne | Vénérable |
| **Feu Endormi** | Calor | Terranu | Bouleversement | Ferveur | Haute | Brulé |
| **Communion** | Spiritus | Anima | Floraison | Sérénité | Faible | Verdoyant |

> Le catalogue est **ouvert** : tout designer peut ajouter un archétype en respectant le schéma YAML. Le système n'a pas besoin d'un nombre fixe.

---

## Voies amplifiées / atténuées par archétype

Les chiffres exacts (compression, dérive d'Accord) sont dans [[Souffle System]]. Ici : **biais des Voies par Ère**.

| Archétype | Voie + (bonus) | Voie - (malus) |
|---|---|---|
| **Ombre Longue** | Noctis +25% | Eldoria -20%, Spiritus difficile |
| **Échos Brisés** | Tempora +30% | Toutes autres -10% |
| **Rêve Lumineux** | Eldoria +30% | Noctis -25% |
| **Vents Bouleversants** | Aerion +25%, Spiritus +10% | — |
| **Verdoiement** | Spiritus +25%, Terranu +20% | — |
| **Sommeil de Glace** | Aquor +20% | Eldoria silencieuse |
| **Brume Mortelle** | Noctis +15%, Aquor +10% | Eldoria -15% |
| **Crépuscule Pourpre** | Noctis et Eldoria amplifiées mais s'annulent partiellement | — |
| **Sommeil Onirique** | Somnix +25%, Spiritus +10% | — |
| **Présages** | Fatum +25% | — |
| **Feu Endormi** | Calor +25% | Aquor -20% |
| **Communion** | Spiritus +30% | — |

> Les % de bonus/malus de Voie selon position dans l'ère (dominante / opposée / neutre) sont précisés dans [[Souffle System#Bonus/Malus de Voie selon Ère]].

---

## Religions favorisées / défavorisées

Chaque Ère décale le baromètre de prospérité des 9 religions. Effet runtime : multiplicateur sur fréquentation PNJ-fidèles, fréquence rituels publics, bonus karma factionnel.

| Religion | Prospère pendant | Souffre pendant | Multiplicateur prospérité |
|---|---|---|---|
| **Ordo Caelum** | Rêve Lumineux | Ombre Longue, Brume Mortelle | ×1.5 / ×0.6 |
| **Vael'Kurash** | Échos Brisés, Brume Mortelle | Rêve Lumineux | ×1.4 / ×0.7 |
| **Ignis Aeternum** | Rêve Lumineux, Feu Endormi | Ombre Longue, Sommeil de Glace | ×1.5 / ×0.6 |
| **Noctari** | Ombre Longue, Brume Mortelle, Crépuscule | Rêve Lumineux | ×1.6 / ×0.5 |
| **Rota Mundi** | Verdoiement, Communion | (stable) | ×1.4 / ×1.0 |
| **Via Ventus** | Vents Bouleversants | Sommeil Onirique | ×1.5 / ×0.7 |
| **Lex Petra** | Sommeil de Glace, Stagnation | Bouleversements | ×1.3 / ×0.7 |
| **Somnium Vigil** | Sommeil Onirique | Vents Bouleversants | ×1.5 / ×0.7 |
| **Foedus Animae** | Communion, Rêve Lumineux | Brume Mortelle | ×1.4 / ×0.7 |

---

## Variants visuels — table maître

10 variants visuels mappés aux entités cosmiques. **Un seul modèle 3D, 10 skins possibles.** Chaque créature de base peut prendre 0 à 6 variants selon sa nature.

| Variant | Entité associée | Matériau | Particules | Audio | IA modifiée |
|---|---|---|---|---|---|
| **Standard** | — | base mesh | aucune | base | base |
| **Shadow** | Noctis | sombre, fresnel noir | particules d'ombre | feedback grave | aggressive_pack |
| **Spectral** | Tempora | translucide, fresnel cyan | échos visuels | reverb forte | erratic |
| **Frost** | Aquor froid | bleu/blanc, glace cristalline | givre flottant | crackle | slow_heavy |
| **Verdoyant** | Spiritus + Terranu | vert, mousse, écorce | spores végétales | feuillage | passive |
| **Brulé** | Calor | rouge/cendres, émissive | braises, fumée | crackle feu | aggressive_burn |
| **Pourpre** | Umbra | pourpre, brouillard épais | brume violette | étouffé | stalking |
| **Doré** | Eldoria | or, émissive forte | éclat lumineux | choral | pacified |
| **Brisé** | Tempora aigu | glitch RGB | distorsion temporelle | static | teleporting |
| **Onirique** | Somnix | couleurs irréelles, gradient | particules pastel | amorti, lointain | dreamlike |
| **Vénérable** | Fatum | runiques émissives | symboles flottants | grave, lent | oracular |

**Mapping créature → variants disponibles** : défini dans `DT_CreatureVariants.uasset`.

Exemple — le Loup :

| Variant | Disponible | IA | Spawn-conditions |
|---|---|---|---|
| Standard | oui | neutre | toujours |
| Shadow | oui | aggressive_pack | Ère dominante Noctis |
| Spectral | oui | erratic | Ère dominante Tempora |
| Frost | oui | slow_heavy | Ère dominante Aquor froid |
| Verdoyant | oui | passive | Ère Verdoiement |
| Pourpre | oui | stalking | Ère Brume Mortelle |

---

## Spawn tables par archétype

Chaque archétype d'Ère charge un **DataAsset de spawn** (DT_EraSpawnRules) qui surcharge les tables par défaut des biomes.

```
EraSpawnRule:
  era_archetype: "OmbreLongue"
  base_biome_overrides:
    Forest:
      remove: [Deer, Boar]
      add: [ShadowWolf, SpectralStag, CorruptedUndead]
      density_multiplier: 1.2
    Swamp:
      add: [PourpreCrocodile]
    Plains:
      add: [ShadowRavens]
  rare_spawns:
    - entity: ShadowKing
      probability: 0.001
      condition: night_only
```

| Archétype | Faune ajoutée | Faune retirée | Densité globale |
|---|---|---|---|
| **Ombre Longue** | Loups d'ombre, cerfs spectraux, morts-vivants | Faune diurne pacifique | ×1.2 |
| **Échos Brisés** | Créatures translucides, sangliers temporels, échos prédateurs | Variations imprévisibles | ×0.8 (instable) |
| **Rêve Lumineux** | Loups dorés, faune lumineuse | Créatures hostiles fortes | ×1.0 |
| **Vents Bouleversants** | Oiseaux migrateurs en masse, créatures volantes rares | Faune sédentaire | ×1.1 |
| **Verdoiement** | Faune luxuriante, créatures mutées par sève | — | ×1.4 |
| **Sommeil de Glace** | Faune hivernante, certaines pétrifiées | Faune chaude | ×0.7 |
| **Brume Mortelle** | Prédateurs invisibles, créatures spectres | Faune visible | ×0.6 (cachée) |
| **Crépuscule** | Créatures hybrides | — | ×1.0 |
| **Sommeil Onirique** | Papillons géants, poissons aériens, créatures rêve | Faune mondaine | ×0.9 |
| **Présages** | Créatures aux comportements oraculaires | — | ×1.0 |
| **Feu Endormi** | Salamandres géantes, créatures de feu | Faune fragile | ×1.0 |
| **Communion** | Tous animaux pacifiés, certains domesticables | — | ×1.3 |

---

## Effets sur les biomes (état neutre + états d'ère)

Chaque biome a un **état neutre** + des **états d'ère** prédéfinis. Architecture : `DA_Biome` + `DA_BiomeEraState` (override partiel).

### Forêt (ex. Galenor central)

| État | Apparence | Faune | Ressources |
|---|---|---|---|
| **Neutre** | Verdoyante, tempérée | Cerfs, loups, sangliers | Bois standard, baies |
| **Verdoiement** | Croissance explosive, lierres géants | Faune luxuriante | Bois exotique, plantes alchimiques rares |
| **Ombre Longue** | Champignons luminescents, troncs sombres | Loups d'ombre, cerfs spectraux | Bois noir, baies de minuit |
| **Échos Brisés** | Arbres vibrants, certains à l'envers | Faune erratique | Sève temporelle |
| **Sommeil de Glace** | Givre permanent, arbres figés | Faune hivernante | Glace pérenne, écorce givrée |

### Marais (Onara, côtes Cestra)

| État | Apparence | Faune | Ressources |
|---|---|---|---|
| **Neutre** | Humide, opaque | Crocodiles, serpents | Roseaux, herbes aquatiques |
| **Vents Bouleversants** | Vagues, brouillards déplacés | Oiseaux migrateurs | Plumes rares, vents capturés |
| **Brume Mortelle** | Eau noircie, brumes pourpres | Créatures spectrales | Algues d'ombre, ossements rituels |
| **Crépuscule Pourpre** | Lumière étrange | Faune hybride | Items frontaliers |

### Désert / Plaines / Côtes / Montagnes

Chaque biome a son propre tableau de variations selon les ères. Voir `Content/Data/Biomes/*.uasset`.

---

## Ressources éphémères par Ère

| Ressource | Disponibilité | Tier | Usage |
|---|---|---|---|
| **Fer Standard** | toujours | commun | base craft |
| **Fer-Ombre** | Ère Noctis dominante | rare | armes Magistrales sombres |
| **Sève Temporelle** | Échos Brisés uniquement | unique | matériau Légendaire |
| **Glace Pérenne** | Sommeil de Glace uniquement | rare | stockage longue durée, alchimie froid |
| **Plumes du Vent** | Vents Bouleversants uniquement | rare | composant alchimique |
| **Sève d'Or** | Verdoiement uniquement | rare | recettes Magistrales |
| **Essence Solaire** | Rêve Lumineux uniquement | rare | soins amplifiés |
| **Cristaux de Tempora** | Échos Brisés uniquement | rare | items prédiction |
| **Baumes de Communion** | Communion uniquement | rare | alchimie d'esprit |
| **Métaux Fondus de Calor** | Feu Endormi uniquement | unique | armes feu Légendaires |

→ Effet économique : artisans **anticipent** les ères pour stocker. Les Oracles deviennent monétairement utiles.

---

## Pondération des quêtes IA par Ère

Chaque archétype injecte un biais dans le générateur de quêtes ([[Quest System]]).

| Archétype | Types de quête pondérés (poids) |
|---|---|
| **Ombre Longue** | Escorte nocturne (×3), retrouver disparus (×2.5), purifier site corrompu (×3) |
| **Échos Brisés** | Investiguer anomalie (×3.5), fixer événement passé (×3), recueillir fragments Tempora (×2.5) |
| **Rêve Lumineux** | Soigner communauté (×2.5), retrouver artefact lumineux (×3), célébration (×2) |
| **Vents Bouleversants** | Escorte caravane (×3), suivre migration (×2.5), découvrir lieu dévoilé (×3.5) |
| **Verdoiement** | Récolter plantes rares (×3), apaiser faune mutée (×2.5), défendre contre prolifération (×2) |
| **Sommeil de Glace** | Survivre (×3), retrouver disparus dans neige (×3), prospecter glacière (×2.5) |
| **Brume Mortelle** | Construire défenses (×3), explorer dans la brume (×3), fuir menace invisible (×2.5) |
| **Crépuscule Pourpre** | Quêtes de tension religieuse (×3), trahisons (×2.5), conflits Voies (×3) |
| **Sommeil Onirique** | Investiguer rêves (×3), interpréter songes PNJ (×2.5), retrouver objet rêvé (×3) |
| **Présages** | Décoder un signe (×3.5), prédire un événement (×3), suivre destin spécifique (×2.5) |
| **Feu Endormi** | Calmer volcan (×3), forge rituelle (×2.5), explorer caldeira (×3) |
| **Communion** | Communiquer avec animal (×3.5), domestiquer sans capture (×3), médiation faunique (×2.5) |

**Paramètres d'IA** :
- `era_theme_keyword` : injecté dans le prompt LLM de génération narrative
- `era_mood_modifier` : module la tonalité des dialogues PNJ
- `era_continent_focus` : pondère la localisation des quêtes générées

---

## Effets sur les Maîtrises

Voir [[Armes et Maîtrise]] pour la décroissance de base.

| Effet | Valeur | Conditions |
|---|---|---|
| Bonus XP Maîtrise liée à l'Ère | **+20%** | Si Maîtrise utilise la Voie dominante ou secondaire |
| Maîtrise non-liée | décroissance normale | Conserve coût Labeur d'entretien |
| Cap de progression saisonnier | non | (les Maîtrises montent toujours) |

---

## Économie — phases d'Ère

| Phase | Durée approx | Comportement marché |
|---|---|---|
| **Début d'ère** (post-Souffle) | 1-2 sem | Spéculation forte, prix volatils, demande sur ressources nouvelles |
| **Pic d'ère** | 60-70% durée | Stabilisation, ressources d'ère maximales |
| **Fin d'ère** (signes forts) | 1-2 sem | Anticipation Souffle, stockage stratégique, [[Bourse des Augures]] s'agite |
| **Post-Souffle** (transition) | 2 sem | Items d'ère précédente → reliques, vague demande sur basiques |

Multiplicateurs de prix appliqués par le système économique : voir [[Economic System]].

---

## Tiers d'effort visuel par Ère

Pour gérer le coût de production, chaque Ère est classée en niveau d'effort.

| Tier | Effort | Contenu | Coût prod (estimation) |
|---|---|---|---|
| **Léger** | Faible | Palette couleurs + 1 effet ambiant | 5 jours |
| **Moyen** | Moyen | Refonte éclairage + particules + 2-3 reskins créatures | 2 semaines |
| **Lourd** | Élevé | Tout précédent + 1-2 nouveaux assets uniques | 4-6 semaines |

→ Réservé aux Ères clés (transitions narratives majeures, Grand Souffle).

---

## Architecture data-driven

```
Content/
  Data/
    Eras/
      DA_Era_OmbreLongue.uasset          (EraConfig YAML/JSON)
      DA_Era_EchosBrises.uasset
      ...
    Biomes/
      DA_Biome_Forest.uasset
      DA_Biome_Forest_OmbreLongue.uasset (override partiel)
      ...
    Variants/
      DT_CreatureVariants.uasset         (mapping créature → variants)
      DT_VariantMaterials.uasset         (matériaux par variant)
    Spawn/
      DT_EraSpawnRules.uasset
    Resources/
      DT_EraResources.uasset
    Quests/
      DT_EraQuestWeights.uasset
```

**Flux de chargement à un Souffle** :

```
1. Serveur génère EraConfig(N+1) (voir Souffle System)
2. Diffusion EraConfig → clients (~quelques KB JSON)
3. Client résout DA_Era_<archetype> depuis le ID
4. Application HW Environment Manager :
   - Sky preset (Time Of Day)
   - Lumière (lighting profile)
   - Foliage density (Foliage Assets)
   - Audio mix
5. Refresh spawn tables (Entity Spawner)
6. Refresh créatures actives → swap variants si éligibles
7. Refresh ressources disponibles
8. Push biais quêtes au Quest System
```

---

## Bibliothèque de modules réutilisables

Pour éviter de réécrire chaque Ère de zéro, le système s'appuie sur une bibliothèque modulaire taggée par Ère.

| Catégorie | Quantité cible (initiale) |
|---|---|
| Phénomènes environnementaux | 30-50 |
| Templates de quêtes IA | 100-150 |
| Événements mondiaux | 20-30 |
| PNJ archétypes saisonniers | 20-30 |
| Modificateurs de zone | 10-15 |
| Recettes éphémères | 30-50 |
| Variants de créatures | 10 (les 10 listés) |

→ **200-300 modules** + 10 variants = bibliothèque suffisante pour des dizaines d'Ères.

---

## Réactivité de l'Ère aux actions des joueurs

Voir [[Souffle System#Facteurs de modulation de la durée]] pour les chiffres exacts.

| Événement | Effet sur Ère |
|---|---|
| Boss d'Ère vaincu | Accélération Souffle (+20% au compteur) |
| Condition cachée 🔒 d'Ère accomplie | Événements spéciaux + accélération forte possible |
| Inactivité globale | Ère s'étire (durée +X%) |
| Actions des Déliés (antagonistes) | Bouleversement du rythme (cas par cas) |
| Joueurs Accord 100% | Déblocage contenu d'Ère caché |

---

## Workflow designer — création d'une Ère

```
1. Designer ouvre l'éditeur d'Ère (UE5 custom tool)
2. Sélectionne les 6 paramètres canoniques
3. Active les variants visuels appropriés
4. Pondère les types de quêtes (DT_EraQuestWeights)
5. Définit les recettes débloquées (DT_EraResources)
6. Configure l'atmosphère (sky, particules, audio mix)
7. (Optionnel) Ajoute conditions cachées 🔒 spécifiques
8. Save as YAML → versionné dans le repo
9. Test en zone test (sandbox shard)
10. Publication via Global Data Service quand le moment cosmique arrive
```

→ Cible : **livrer une Ère en quelques heures** (Tier Léger), pas en semaines.

---

## Conditions cachées 🔒 liées aux Ères

| Condition | Récompense |
|---|---|
| Vivre 5 Ères différentes | Titre "Voyageur des Souffles" |
| 100% Accord pendant 3 Ères différentes | Accès contenu Mythique |
| Décoder patterns de 7 Ères (Astronomie/Oracle) | Titre "Lecteur des Cycles" |
| Trouver les 10 variants de Loup | Titre "Naturaliste des Souffles" |
| Vaincre boss-signature de chaque archétype | Titre "Mille-Souffles" |

---

## Documentation publique vs cachée

**Public** (apprenable in-game par Astronomes / Oracles) :
- Les 10 variants visuels mappés aux entités
- Les amplifications/atténuations des Voies par dominante
- Les biomes de base et leurs états d'Ère
- Les religions et leurs interprétations

**Caché** 🔒 (à découvrir par les joueurs) :
- L'algorithme exact de durée d'une Ère
- Les facteurs précis modulant la durée
- Les conditions cachées débloquant du contenu rare
- Le catalogue complet des dominantes possibles
- Liens entre actions joueurs et événements

---

## Dépendances système

| Composant | Rôle dans le système d'Ère |
|---|---|
| [[Souffle System]] | Trigger de transition entre Ères |
| [[OWS Architecture]] | Diffusion EraConfig multi-shard |
| [[Global Data Service]] | Stockage/sync de l'EraConfig courante |
| [[HW Environment Manager]] | Application sky/lumière/foliage par Ère |
| [[Time Of Day]] / [[Weather System]] | Bascule météo par Ère |
| [[Entity Spawner]] | Spawn tables Ère-dépendantes |
| [[VFX Audio Rendu/Index]] | Variants visuels créatures + ambiances |
| [[Foliage Assets]] | Densité/type foliage par État du monde |
| [[Quest System]] | Génération quêtes biaisées thème Ère |
| [[Economic System]] | Volatilité prix par phase d'Ère |
| [[HW Progression Component]] | Bonus XP Maîtrise liée Ère |

---

## Points de calibrage à playtester

- [ ] Bonus XP Maîtrise +20% — assez incitatif pour pousser à varier les pratiques ?
- [ ] Densité variants Pourpre / Shadow — lisibilité visuelle préservée ?
- [ ] Spawn tables Brume Mortelle (×0.6) — assez de faune pour rester jouable ?
- [ ] Tier Lourd 4-6 sem — soutenable côté studio sur le long terme ?
- [ ] 12 archétypes initiaux — diversité ressentie suffisante pour 18 mois de Partie ?

---

## Décisions actées (techniques)

- ✅ 6 dimensions canoniques par Ère (Force dom, Force sec, État, Mood, Tension, Continent)
- ✅ Catalogue ouvert d'archétypes (12 à l'init, extensible)
- ✅ 10 variants visuels mappés aux entités cosmiques
- ✅ Architecture data-driven YAML versionnée
- ✅ Pas de transformation géographique en cours de Partie (sauf Cardinal)
- ✅ Bibliothèque modulaire 200-300 modules réutilisables
- ✅ Hybride curaté (designer) + IA générative biaisée par Ère
- ✅ Réactivité aux joueurs (durée et intensité modulées)
- ✅ Documentation partielle : public/caché 🔒

---

*Liens narratifs : [[Les Ères]] | [[Le Souffle]] | [[Cosmologie]] | [[L'Accord]]*
*Liens techniques : [[Souffle System]] | [[OWS Architecture]] | [[HW Environment Manager]] | [[Entity Spawner]] | [[Quest System]] | [[Time Of Day]] | [[Weather System]] | [[VFX Audio Rendu/Index]]*
