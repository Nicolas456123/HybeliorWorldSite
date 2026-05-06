---
tags: [implementation, traces, archéologie, world-state, ères, persistance]
status: drafted
last_review: 2026-05-07
needs_review_for: [taux-apparition-playtest, équilibrage-récompenses-cardinales]
type: implementation
canonical_concept: "[[Traces des Ères]]"
---

# Traces System — Implémentation

> Page d'implémentation technique du concept narratif **[[Traces des Ères]]**.
> Cette page contient les **chiffres, formules, specs Unreal et règles de balance**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Traces des Ères]].

---

## Règle 90/10 — formalisation

| Catégorie d'effet d'ère | Persistance | Comportement au Souffle suivant |
|---|---|---|
| Effets cycliques (ambiance, faune, ressources thématiques) | **90%** | Disparition automatique au Souffle |
| Effets permanents (Traces) | **10%** | Conservation indéfinie, accumulation entre Ères |

**Formule du quota** :

```
Pour chaque ère N :
  N_effets_émis = ~50 à 200 modifications mondiales
  N_traces_permanentes(N) = floor(N_effets_émis × 0.10)
  Borne dure : 2 ≤ N_traces(N) ≤ 25 par ère
```

Une ère "calme" génère ~2-5 Traces permanentes. Une ère "intense" peut atteindre la borne supérieure (25). Un Souffle Cardinal contourne ce plafond et peut générer 30-100 Traces simultanées.

---

## Tiers de Traces — paramètres canoniques

| Tier | Échelle visuelle | Rayon d'effet | Conditions de génération | Récompenses associées |
|---|---|---|---|---|
| **Mineure** | Détail local (objet, motif, plante) | 5-50 m | Action joueur notable, fin d'ère calme | Lore fragment, +50 XP métier concerné, item Rare |
| **Majeure** | POI (ruine, cratère, forêt) | 100-1000 m | Boss d'ère vaincu, condition cachée, fin d'ère intense | Lore canonique, +500 XP, item Épique, titre régional |
| **Cardinale** | Région entière, multi-continent | 1-50 km | Souffle Cardinal exclusivement | Item Légendaire/Mythique, titre mondial, inscription perma |

**Distribution par ère typique** :
- Mineures : ~70% du quota
- Majeures : ~25% du quota
- Cardinales : ~5% (effectivement 0 hors Cardinal réel)

---

## Taux d'apparition post-Souffle

| Phase | Fenêtre temporelle | Génération de Traces |
|---|---|---|
| **T0 (Souffle)** | Instant | Calcul du nombre, scellement de l'ère N |
| **T0 + 0-7j** | Première semaine | 60% des Traces apparaissent (visible dans le monde) |
| **T0 + 1-4 sem** | Mois 1 | 30% supplémentaires révélées (nécessitent exploration) |
| **T0 + 1-3 mois** | Long terme | 10% restantes (Traces "endormies", conditions découverte spéciales) |

**Probabilité de découverte d'une Trace par exploration aveugle** :

```
P_découverte_par_heure_exploration =
  base × visibilité_tier × proximité_thématique × bonus_métier

base = 0.05 (Mineure) / 0.20 (Majeure) / 1.00 (Cardinale)
visibilité_tier ∈ [0.1, 1.0] selon discrétion narrative
bonus_métier ∈ [1.0, 3.0] selon métier actif (Cartographe, Historien, etc.)
```

---

## Conditions de découverte spécialisées

| Type de Trace | Métier requis ou recommandé | Mécanique de découverte |
|---|---|---|
| Géologique mineure | Cartographe, Géologue | Scan de zone, +bonus si terrain inexploré |
| Géologique majeure | Cartographe + Historien | Visible à grande distance, lecture nécessite Historien lvl 3+ |
| Géologique cardinale | Aucun (visible par tous) | Visible depuis l'autre bout du continent |
| Architecturale | Architecte, Maçon-Restaurateur | Layer UE5.4 toggle ; révélation par interaction |
| Culturelle | Barde, Bibliothécaire, Linguiste | Apprentissage via PNJ, livre, ou pratique rituelle |
| Item / relique | Chasseur de Trésors, Antiquaire | Loot table contextuel ; certaines uniques-monde |

---

## Récompenses chiffrées

### Découverte initiale

| Tier | XP métier | Éclats | Item drop |
|---|---|---|---|
| Mineure | +50 à +200 | +10 | Rare (50% chance) |
| Majeure | +500 à +2000 | +100 | Épique garanti |
| Cardinale | +5000 à +20000 | +1000 | Légendaire garanti, chance Mythique 5% |

### Études approfondies (lecture, décodage)

| Tier | Sessions requises | Récompense finale |
|---|---|---|
| Mineure | 1 session (~5-15 min) | Lore fragment ajouté au journal |
| Majeure | 3 à 5 sessions (~30-60 min cumulées) | Lore canonique, condition cachée potentielle révélée |
| Cardinale | Quête multi-joueurs, multi-métiers (~plusieurs heures) | Accès à un donjon caché, événement mondial annexe |

### Première découverte serveur (1ʳᵉ jamais)

| Tier | Bonus première | Inscription |
|---|---|---|
| Mineure | +500 Éclats, titre local | Mention dans calendrier régional |
| Majeure | +5000 Éclats, titre serveur | Nom inscrit dans le lore officiel |
| Cardinale | +50000 Éclats, titre mondial unique | Statue/monument généré, persiste à travers Parties |

---

## Items reliques — flags et génération

```yaml
relic_template:
  id: <unique_string>
  ere_specific: true
  ere_origin_id: <ere_id>
  tier: [Rare, Epique, Legendaire, Mythique]
  unique_world: <bool>
  effets_passifs: [...]
  condition_cachée_attachée: <id_optionnel>
  reproductible: false
  trace_origin_id: <trace_id>
```

**Plafonds par catégorie** :

| Catégorie | Max simultané sur serveur |
|---|---|
| Reliques Rares | Illimité |
| Reliques Épiques | ~500 |
| Reliques Légendaires | ~50 |
| Reliques Mythiques (unique-monde) | 1 par ID (jamais dupliqué) |

---

## Failles Temporelles — paramètres

Phénomène spécifique aux Cardinaux. Voir narratif [[Traces des Ères]] §Failles Temporelles.

| Paramètre | Valeur |
|---|---|
| Apparition | Uniquement post-Cardinal |
| Durée d'instabilité | 6 à 24 mois (gameplay) |
| Rayon visuel | 50-200 m |
| Effet sur joueur | Vision de l'ère passée superposée, déphasage léger des contrôles dans la zone |
| Récompense d'exploration | Item Légendaire à thème de l'ère ancienne, condition cachée serveur |
| Stabilisation possible | Oui, via rituel multi-joueurs (Voie de Tempora niv 5+) |

---

## Brèches du Néant — paramètres

| Paramètre | Valeur |
|---|---|
| Apparition | Cumul de plusieurs Cardinaux successifs (au moins 3 historiques) |
| Mobilité | Lentement mobiles dans le monde (~50 m/jour) |
| Difficulté | Tier donjon élite (groupe 5-10 joueurs niveau max) |
| Loot exclusif | Filaments du Vide (composant Voie d'Umbra) |
| Risque | Mort permanente d'objets équipés tier ≤ Rare (5% chance par mort) |

---

## Cratères du Cardinal — paramètres

| Paramètre | Valeur |
|---|---|
| Génération | 1 à 5 cratères par Cardinal historique |
| Taille | Diamètre 500 m à 5 km |
| Effet ambiance | Magie résiduelle perceptible (ambiance Voie aléatoire) |
| Ressource exclusive | Pierres-cicatrices (composant rituel haut tier) |
| Condition cachée | Construire un monument permanent au centre → trace inter-Parties |

---

## Architecture technique (UE5.4 + OWS.NET)

```
1. Trace Registry (server-side) :
   - Stockage YAML versionné
   - Sync vers World State global d'OWS.NET
   - Diffusion incrémentale aux clients

2. Génération post-Souffle :
   - Évaluation ère(N) : événements, conditions remplies
   - Sélection des Traces à promouvoir en permanent (quota 10%)
   - Inscription dans Trace Registry
   - Notification cinématique (signes visuels in-world)

3. Application client :
   - Sub-levels UE5.4 toggle on/off selon Traces actives
   - Spawn d'assets statiques (modèles 3D)
   - Chargement de loot tables enrichies (Item Modifier Generator)
   - Audio mix contextuel sur les zones de Trace

4. Découverte par joueur :
   - Trigger volume ou interaction
   - Vérification first-discovery serveur
   - Distribution récompenses
   - Inscription dans journal d'exploration personnel
```

---

## Cross-links archéologie

| Système | Rôle |
|---|---|
| [[Souffle System]] | Trigger de génération des Traces (10% des effets sont conservés) |
| [[Migration Accord]] | L'Accord du joueur module la sensibilité aux Traces de la Voie correspondante |
| [[Quest System]] | Génération de quêtes émergentes autour de Traces nouvellement découvertes |
| [[Item Modifier Generator]] | Génération des reliques avec flags `ere_specific` |
| [[Entity Spawner]] | Spawn de PNJ liés aux Traces (Antiquaires, Bibliothécaires de cité, Lords ruinés) |
| [[Global Data Service]] | Stockage et synchronisation du Trace Registry |
| [[HW Environment Manager]] | Application des Sub-levels et variants visuels |
| [[OWS Architecture]] | Diffusion multi-shard du Trace Registry |

---

## Persistance inter-Parties

| Donnée | Persistance |
|---|---|
| Traces géologiques majeures et cardinales | **Permanente** à travers toutes les Parties |
| Traces architecturales | **Permanente**, peuvent être restaurées ou laissées en ruine |
| Traces culturelles | **Permanente**, transmises par PNJ et Bardes |
| Reliques uniques-monde | **Persistance d'identité** (ID conservé), possession peut changer |
| Inscriptions de joueurs (statues, monuments) | **Permanentes en lore + cosmétique** |
| Stats / pouvoirs de joueurs | **Aucune persistance inter-Parties** (cf. [[La Partie]]) |

---

## Trace Browser (outil interne GM/designer)

Interface web interne permettant :
- Liste filtrée de toutes les Traces actives par continent / ère / tier
- Édition manuelle des champs YAML
- Création de Traces narratives ad hoc (event GM)
- Audit de l'équilibre quota par ère
- Réversibilité (suppression d'une Trace test)

---

## Points de calibrage à playtester

- [ ] Quota 10% — densité perçue trop pauvre / juste / surchargée
- [ ] Distribution Mineure 70% / Majeure 25% / Cardinale 5%
- [ ] Probabilités de découverte aveugle — exploration valorisée ou frustrante
- [ ] Récompenses Cardinales — équilibrage XP / Éclats vs effort réel
- [ ] Plafonds reliques Légendaires (~50) — économie saine ou rareté excessive
- [ ] Durée d'instabilité Failles Temporelles (6-24 mois) — fenêtre exploitable
- [ ] Mobilité des Brèches (~50 m/jour) — assez visible / trop fugace

---

## Décisions actées (techniques)

- ✅ Règle 90/10 : 10% des effets d'ère deviennent Traces permanentes
- ✅ Trois tiers : Mineure / Majeure / Cardinale
- ✅ Bornes par ère : 2 à 25 Traces (hors Cardinal qui contourne le plafond)
- ✅ Stockage YAML versionné dans repo content
- ✅ Sub-levels UE5.4 pour layers archéologiques des villes
- ✅ Trace Registry diffusé via OWS.NET World State global
- ✅ Reliques uniques-monde avec ID persistant inter-Parties
- ✅ Première découverte serveur inscrite dans lore officiel

---

*Liens narratifs : [[Traces des Ères]] | [[Le Souffle]] | [[Les Ères]] | [[Histoire d'Hybelior]] | [[Exploration]]*
*Liens techniques : [[Souffle System]] | [[Item Modifier Generator]] | [[Entity Spawner]] | [[OWS Architecture]] | [[HW Environment Manager]]*
