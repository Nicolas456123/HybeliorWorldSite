---
tags: [pnj, comportement, actions, situation, ia, système]
type: system
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-seuils-playtest, scenes-emergentes-supplementaires]
---

# 🎯 Actions Situationnelles — Comportement PNJ en situation

> **Document maître Phase 2.** Application directe des [[Concepts Fondamentaux IA PNJ|20 Concepts Fondamentaux IA PNJ]] aux **situations concrètes** du jeu.
>
> Là où Concepts Fondamentaux pose le **modèle** (BT racine + Utility AI, perception, mémoire, MBTI, etc.), ce fichier décrit comment ce modèle se **traduit en actions** quand un PNJ rencontre une situation : présence du joueur, attaque, festival, météo extrême, changement d'Ère, deuil, quête.
>
> **Source canonique systématique** : chaque section renvoie au numéro §X du fichier [[Concepts Fondamentaux IA PNJ]] qu'elle applique.

---

## 1. Vue d'ensemble — intégration des 20 Concepts

### 1.1 Les 20 Concepts en couches d'application

Le comportement situationnel est le résultat d'une **chaîne de résolution** qui mobilise les 20 concepts dans un ordre précis :

```
                    ┌──────────────────────────────────────┐
                    │   SITUATION PERÇUE (§2 perception)   │
                    │  Sight + Hearing + Awareness Zones   │
                    └────────────────┬─────────────────────┘
                                     ▼
            ┌──────────────────────────────────────────────┐
            │  CONTEXTUALISATION                            │
            │  - mémoire individuelle (§3) + village (§3)   │
            │  - relations sociales (§5)                    │
            │  - réputation joueur (§7)                     │
            │  - factions actives (§12)                     │
            │  - religion + tabous (§13)                    │
            │  - Ère active + modulation (§14)              │
            └────────────────┬─────────────────────────────┘
                             ▼
            ┌──────────────────────────────────────────────┐
            │  COUCHE 1 — RÈGLES DURES (§8 P0-P3)           │
            │  HP<20% / allié attaqué / lieu sacré / etc.   │
            │  → court-circuit immédiat                     │
            └────────────────┬─────────────────────────────┘
                             ▼ (si rien ne match)
            ┌──────────────────────────────────────────────┐
            │  COUCHE 2 — ÉMOTIONS SATURÉES (§4)            │
            │  Peur≥80 / Fatigue≥90 / Colère≥90 + T         │
            │  → override Utility                           │
            └────────────────┬─────────────────────────────┘
                             ▼ (si non saturé)
            ┌──────────────────────────────────────────────┐
            │  COUCHE 3 — UTILITY SCORER (§1)               │
            │  score = base + mood + mbti + context         │
            │  options : Combat / Routine / Social / Help   │
            └────────────────┬─────────────────────────────┘
                             ▼
            ┌──────────────────────────────────────────────┐
            │  ACTION CHOISIE → BT exécute                  │
            │  - branche routine / mode social / combat     │
            │  - module pathfinding (§20) selon LOD (§11)   │
            │  - quête potentiellement déclenchée (§15)     │
            │  - événement NPC↔NPC (§19) si applicable      │
            │  - lifecycle (§18) si mort/blessure           │
            │  - état persisté (§10) si stable              │
            └──────────────────────────────────────────────┘
```

### 1.2 Mapping concepts → sections de ce fichier

| Concept | Section appliquée |
|---------|---------------------|
| §1 BT racine + Utility AI | §2 matrice contexte×action, §5 toutes les réactions |
| §2 Perception 5 profils | §4 triggers (seuils ThreatLevel) |
| §3 Mémoire stratifiée | §5.1 réputation par interactions, §5.7 deuil |
| §4 Mood + 3 émotions | §5 toutes (modulateurs émotionnels) |
| §5 Graphe social | §5.7 deuil, §5.2 défense alliés, §3 mode deuil |
| §6 MBTI | §6 table de modulation transverse |
| §7 Réputation | §5.1 présence joueur (6 seuils), §2 matrice |
| §8 Modèle décision 3 couches | §1.1 chaîne, §4 triggers structurés |
| §9 Population persistants/transients | §5 réactions (granularité par catégorie) |
| §10 Persistance | §5.7 mood baseline post-deuil, §5.5 era_state |
| §11 LOD AI | §3 mode actif L0 vs scène scriptée L2 |
| §12 Factions | §5.1 réaction Karma, §5.5 alignement Ère/Religion |
| §13 Religion / RitualPattern | §3 Mode Religieux, §5.3 festival, §5.4 météo |
| §14 Réaction Ères | §5.5 changement Ère cosmique, modulation 95/5 |
| §15 Quêtes | §3 Mode Quête, §5.8 donneur/témoin/cible |
| §16 Combat AI | §5.2 attaque, §3 Mode Crise |
| §17 Authoring | §5 cas particuliers PNJ nommés, §5.5 templates alternatifs |
| §18 Lifecycle | §5.7 deuil, mort de masse |
| §19 NPC↔NPC | §3 Mode Festivité, §5.7 funérailles |
| §20 Pathfinding | §5.4 météo (réfugier intérieur), §5.2 fuite |

---

## 2. Matrice contexte × action canonique

> Tableau de référence. Pour chaque type de **contexte**, fixe l'**action prioritaire**, l'**action secondaire** (fallback ou option concurrente), et la **modulation MBTI** principale.

| Contexte | Action prioritaire | Action secondaire | Modulation MBTI | Concept(s) |
|----------|--------------------|-------------------|-------------------|------------|
| **Routine matin paisible** | Cycle métier | Salutation passants | I=silencieux, E=bavard | §1, §6 |
| **Routine après-midi** | Cycle métier | Pause + dialogue collègue | J=continue strict, P=pause facile | §1, §6 |
| **Soirée loisir** | Loisir préféré | Famille / taverne | E=taverne, I=lecture solo | §1, §6 |
| **Pluie modérée** | Réfugier intérieur | Continuer si urgent | J=adapter strict, P=ignorer ; Ignis Aeternum forcé inside | §13, §14 |
| **Tempête** | Réfugier obligatoire | — (court-circuit Pluie+90%) | (toutes) | §1 P3, §13 |
| **Sécheresse** | Conservation eau / prix +↑ | Migration possible | T=stockage, F=partage | §14, §15 |
| **Phénomène cosmique (Brume Mortelle)** | Cache / Prière | Fuite | Peur ↑↑ pour tous, INFP/ISFP +50% | §14, §13 |
| **Joueur arrive (rep neutre)** | Saluer minimal | Continuer tâche | F=plus chaleureux, I=brève | §7, §6 |
| **Joueur arrive (rep +75)** | Salut chaleureux + dialogue | Prix -30%, propose item caché | E=expansif, F=ami | §7, §6 |
| **Joueur arrive (rep -50)** | Méfiance + ton froid | Prix +20%, refuse premium | T=calculateur strict | §7, §6 |
| **Joueur arrive (rep -75)** | Refus de service | Garde alertée | J=jugement tranché ×1.2 | §7, §8 |
| **Joueur arme dégainée** | Méfiance / Garde (ThreatLevel +30) | Bascule Combat si > 50 | Peur immédiate sauf Garde | §2, §4, §8 |
| **Joueur Karma rouge/noir** | Selon faction | (Garde alertée / Marchand peur / Hors-la-loi allié) | E=cri d'alarme, I=signale silencieusement | §7, §12 |
| **Sang détecté (rayon 5m)** | Alerte (ThreatLevel +15) | Prévenir Garde | F=panique, T=analyse | §2, §3 |
| **Combat dans la rue** | Mode Crise | Fuite ou aide selon métier | T=rationnel, F=panique ; Garde=engage | §16, §6 |
| **Allié direct attaqué (10m)** | Combat.Defense (court-circuit P1) | (forcé) | (toujours) | §5, §8 |
| **Festival local** | Festivité | Travail réduit | E=animer, I=observer | §13, §14 |
| **Mort d'un proche (graphe §5)** | Deuil (mood -25, routine ralentie) | Funérailles selon religion | F=marqué ×1.5 | §5, §3, §13 |
| **Mort d'un voisin** | Tristesse mineure | Routine continue | F=tristesse +1.3 | §5 |
| **Changement d'Ère (Souffle)** | Modulation paramétrique | Templates alternatifs si Oracle/Prêtre | N=spéculation, S=continuité pratique | §14 |
| **Pénurie alimentaire** | Conservation, prix ↑ | Migration possible | T=stockage, F=partage, J=rationnement | §14, §15 |
| **Abondance (Verdoiement)** | Festivités spontanées | Surplus production | E=fêter, I=stocker | §14 |
| **Quête active reçue (joueur cible)** | Continuer routine + objectif | Dialogue spécifique | (selon MBTI donneur) | §15 |
| **Quête : témoin d'événement** | Donne indice si rep > 0 | Refus si rep < 0 | F=facile à témoigner, T=requiert intérêt | §15, §7 |
| **Quête : escorte demandée** | Suivre joueur | Fuite si combat | J=strict timing, P=détours | §15 |
| **Lieu sacré profané (15m)** | Combat.Defense (P1 court-circuit) | (forcé) | F=Colère ×1.5 | §13, §8 |
| **Pacte cassé par joueur** | Combat.Aggressive vs joueur (P1) | Memory.Public.PactBroken | F=Colère ×1.5 | §3, §8 |
| **Joueur dans la file** | Attente standard | — | J=patience longue, P=râleur si > 5min | Modes Sociaux |
| **Joueur tente couper la file** | Réaction selon attitude | (silence/soupir/plainte/agression) | T=intervention rationnelle, F=plainte | Modes Sociaux |
| **Témoin d'un vol** | Crier (rep_indiv joueur -25) | Prévenir Garde | E=crier, I=signaler discret | §3, §7 |
| **Joueur sauve PNJ** | Memory.Public.PlayerSavedNPC weight 100 | Mood +30, rep +15 individuel | F=reconnaissance ×1.3 | §3, §7 |
| **Tribunal sacré (Lex Petra)** | Présence obligatoire (sabbat hebdo) | Suspension métier | J=respect strict | §13, §19 |
| **Funérailles d'un proche** | Procession + rituel religion | Mood -20 baseline 3 jours | F=plus marqué | §13, §19 |
| **Marchand annuel récoltes** | Place centrale, transactions | Festivité collective | E=anime, I=transactions discrètes | §19, §14 |
| **Croisement ami/famille rue** | Salutation chaleureuse + 30s chat | +1 relation | E↔E +20 score, I↔I +10 | §5, §19 |
| **Croisement étranger MBTI opposé** | Évite si I face E inconnu | Salut bref | I=détourne, E=approche | §6, §19 |
| **Population.Catastrophe (>30% morts)** | Deuil collectif 14j | Pas de festivité | (toutes) mood -30 baseline | §18, §3 |
| **Heure rituel quotidien (religion)** | Rituel (priorité Utility +30) | Suspension routine 5-15 min | S=strict, N=mystique libre | §13 |
| **Heure rituel mais Pluie + Ignis** | Rituel intérieur ou skip si tiède | Mood -10 (frustration) | J=trouve adaptation, P=skip | §13, §14 |
| **Mort d'un PNJ nommé authored** | Memory.Public.NamedNPCDied weight 100 | Side quest "Découvrir ce qu'il voulait" | F=deuil collectif, T=enquête | §18, §15 |
| **Joueur entre dans quartier (LOD L1→L0)** | Promotion immédiate, perception activée | Anim complet, RVO actif | (toutes) | §11, §20 |

> **40+ contextes** couverts. Cette matrice est le **point d'entrée canonique** pour tout designer ou implémenteur cherchant à savoir ce qu'un PNJ fait dans une situation donnée.

---

## 3. Modes contextuels superposables

> Reprend [[Modes Sociaux]] et **étend** avec les modes nés des Concepts Fondamentaux : Religieux (§13), Deuil (§5+§3), Quête (§15), Festivité (§14+§19).

### 3.1 Catalogue exhaustif des modes (8 modes canoniques)

| Mode | Trigger d'entrée | Trigger de sortie | LOD requis | Concept(s) |
|------|------------------|---------------------|------------|------------|
| **Mode Routine** *(défaut)* | Réveil, pas d'autre mode actif | Fin de journée OU autre mode prend la main | Tous | §1 racine |
| **Mode Marchand** | Heure d'ouverture boutique métier | Heure de fermeture OU client absent | L0/L1 (UI demande L0) | Modes Sociaux + §1 |
| **Mode Dialogue** | Joueur initie interaction OU NPC↔NPC §19 | Fin dialogue / sortie joueur | L0 obligatoire | Modes Sociaux + §15 |
| **Mode Crise** *(combat / catastrophe)* | ThreatLevel ≥ 50 OU dégâts reçus OU `Population.Catastrophe` | 5s sans dégât (cohérent [[Combat]]) | L0/L1 | §16, §8 P3 |
| **Mode Festivité** | Festival local taggé OU `Era.Mood.Ferveur` + jour fête | Fin du festival (1-3 jours) | Tous (compressé L2) | §14, §19 |
| **Mode Religieux** *(rituel)* | Heure RitualPattern OU jour sabbat | Fin du créneau de rituel | Tous (visuels L0/L1) | §13 |
| **Mode Deuil** | Mort proche détectée (graphe §5) | 14 jours gameplay (×1.5 si MBTI F) | Tous | §5, §3, §18 |
| **Mode Quête** *(donneur ou exécutant)* | Quête assignée au PNJ (donneur) OU PNJ sujet de quête | Quête complétée ou échouée | L0 pour interactions | §15 |

### 3.2 Tableau de compatibilité étendu (8×8)

> Extension du tableau existant dans [[Modes Sociaux]] §Composabilité. **Override** signifie que le mode envahisseur prend totalement le contrôle ; **✅** signifie coexistence ; **❌** signifie exclusion mutuelle.

| ↓ actif \ → compatible | Routine | Marchand | Dialogue | Crise | Festivité | Religieux | Deuil | Quête |
|------------------------|---------|----------|----------|-------|-----------|-----------|-------|-------|
| **Routine**            | —       | ✅       | ✅       | Override par Crise | ✅ atténué | ✅ pendant créneau | ✅ atténué | ✅ |
| **Marchand**           | ✅      | —        | ✅ (sous-état) | Override par Crise | ✅ prix modulés | ❌ pendant rituel | ✅ atténué (vente lente) | ✅ |
| **Dialogue**           | ✅      | ✅       | —        | Override par Crise | ✅ | ❌ | ✅ ton solennel | ✅ donne quête |
| **Crise**              | Override | Override | Override | —    | Override   | Override (sauf défense lieu sacré) | Override | Override |
| **Festivité**          | ✅ atténué | ✅ prix modulés | ✅ | Override par Crise | — | ✅ rituels collectifs | ❌ (deuil annule fête) | ✅ |
| **Religieux**          | ✅ pendant créneau | ❌ | ❌ (sauf après) | Override sauf défense lieu | ✅ rituels collectifs | — | ✅ funérailles | ✅ |
| **Deuil**              | ✅ atténué | ✅ atténué | ✅ ton solennel | Override | ❌ | ✅ funérailles | — | ✅ atténué |
| **Quête**              | ✅      | ✅       | ✅       | Override | ✅ | ✅ | ✅ | — |

### 3.3 Règles de priorité (cascade)

```
Crise (P0)
  ↓
Religieux pendant créneau de rituel obligatoire (P1)
  ↓
Deuil dans les 24h post-mort (P2)
  ↓
Quête active avec deadline (P2)
  ↓
Marchand pendant heures d'ouverture (P3)
  ↓
Festivité (P3)
  ↓
Dialogue spontané (P4)
  ↓
Routine (défaut, P5)
```

> **Cas critique** : Prêtre Lex Petra en Mode Religieux (sabbat) qui détecte attaque sur lieu sacré → bascule Crise mais **branche défense**, pas fuite (cohérent §13 tabou + §16 BT_NPCCombat).

---

## 4. Triggers d'événements — format canonique

> Triggers que le BT racine et le `BTService_UtilityScorer` (§1) détectent et qui modifient le comportement.

### 4.1 Format formel YAML

```yaml
trigger:
  id: PlayerArrivesAggressively
  source_concept: [§2_perception, §8_decision_P3]
  conditions:
    - perception.player.armDégainée: true
    - perception.player.distance: { lt: 30 } # mètres
  threat_level_add: +30
  immediate_branch: Combat.React.Vigilance
  duration: 30s ou jusqu'à désengagement
  mbti_modulation:
    Peur_baseline_add: { F: +10, T: 0 }
    I: { distance_recule: +2m }
```

### 4.2 Catalogue de 18 triggers canoniques

| ID | Conditions | Effet immédiat | Concept |
|----|-----------|---------------------|---------|
| **PlayerEntersAwarenessZone** | distance(player) < SightRadius | Marque `LastSeenPlayer`, mood +0 | §2 |
| **PlayerArrivesAggressively** | armDégainée + distance < 30m | ThreatLevel +30, branch `Combat.React.Vigilance` | §2, §8 P3 |
| **PlayerSprintsTowardsNPC** | vélocité > seuil + dirigée vers NPC | ThreatLevel +20, Peur +10 | §2 |
| **PlayerHasAttackedNPCInVillageMemory** | rumeur `Memory.Public.PlayerAttacked` < 30j | ThreatLevel +40 | §3 |
| **PlayerIsKarmaRedOrBlack** | Karma ≥ 6 kills NC | Garde→Combat ; civil→Peur +50 ; outlaw→allié | §7, [[PvP]] |
| **PlayerIsTaggedAggressive** | tag GAS `Combat.State.Aggressive` actif | ThreatLevel +50 | §2 |
| **BloodDetectedNearby** | actor tag `World.Trace.Blood` < 5m | ThreatLevel +15, Peur +5 | §2, §3 |
| **AllyDirectlyAttacked** | allié `family/friends/boss` < 10m attaqué | court-circuit P1 → `Combat.Defense` | §5, §8 P1 |
| **PactBrokenByPlayer** | Memory.Public.PactBroken vs joueur | court-circuit P1 → `Combat.Aggressive` ce joueur | §3, §8 P1 |
| **SacredPlaceProfanedNearby** | `World.Sacred.Profaned` < 15m + religion correspond | court-circuit P1 → `Combat.Defense` | §13, §8 P1 |
| **HPLow** | Health < MaxHealth × 0.20 | court-circuit P0 → `Combat.Retreat` | §8 P0 |
| **HPCritical** | Health < MaxHealth × 0.10 + pas de fuite | court-circuit P0 → `Combat.Surrender` | §8 P0 |
| **FearSaturated** | Peur ≥ 80 (§4) | court-circuit P2 → `Combat.Flee` (panique) | §4, §8 P2 |
| **FatigueSaturated** | Fatigue ≥ 90 + hors combat | court-circuit P2 → `Routine.RestNow` | §4, §8 P2 |
| **AngerSaturatedThinking** | Colère ≥ 90 + MBTI T | court-circuit P2 → `Combat.Defense` | §4, §6, §8 P2 |
| **WeatherStormStarting** | tag `Weather.State.Storm` | Force réfugier intérieur, suspend tâches outdoor | §13 (Ignis), §14 |
| **EraSouffleBroadcast** | nouveau Souffle reçu (`EraGenerator.OnSouffleBroadcast`) | Recalcul mood baseline (§4), reload `EraModulationProfile` | §14 |
| **NamedNPCDeath** | `Memory.Public.NamedNPCDied` weight 100 | Propagation continent, mood -10 sur 7j si NPC connu | §3, §18 |
| **PopulationCatastrophe** | >30% persistants morts < 24h gameplay | Mode Deuil collectif 14j, festivités suspendues | §18 |
| **FestivalLocalStarts** | tag `Festival.<id>.Active` posé | Active Mode Festivité, prix modulés | §14, §19 |

> **Tous les triggers** écrivent dans `Blackboard` ou directement dans `BBKey_NextAction` selon §8 (court-circuit ou Utility).

---

## 5. Réactions situationnelles canoniques

> Pour chaque grande situation, on décrit en format **structuré canonique** :
> - **Trigger** (cf §4)
> - **Branche BT activée** (§1, §16)
> - **Score Utility modifié** (§1)
> - **Modulation MBTI** (§6)
> - **Impact mémoire** (§3)
> - **Impact mood/émotion** (§4)
> - **Impact réputation** (§7)

### 5.1 Présence joueur — réaction selon Reconnaissance / Renom

> Concept canonique : §7 Réputation. Cas types pour chaque seuil de `rep_effective`.

#### 5.1.1 Joueur réputation +75 (Allié)

- **Trigger** : `PlayerEntersAwarenessZone` + `rep_effective ≥ 75`
- **Branche BT** : `ModeSocial.WarmGreet` (sous-arbre `BT_NPCBase`)
- **Utility** : `Social.Greet` +30, `Social.Trade` +20 (avec discount), `Routine.Continue` -10
- **MBTI** : E expansif, dialogue long ; I réservé mais cordial ; F émotionnel ("Ah, mon ami !"), T factuel ("Bonjour, comment puis-je aider ?")
- **Mémoire** : ajoute entrée `PlayerVisited` weight 30 (§3)
- **Mood** : `MoodGeneral +5`, `Joy +10` ; aucune Peur
- **Réputation** : pas de modification immédiate (pas d'event significatif)
- **Effet concret** : prix -30%, propose items rares cachés, accès quêtes exclusives (PNJ nommés uniquement)

#### 5.1.2 Joueur réputation neutre (entre -25 et +25)

- **Trigger** : `PlayerEntersAwarenessZone`
- **Branche BT** : `ModeSocial.StandardGreet`
- **Utility** : `Social.Greet` +10, `Routine.Continue` standard
- **MBTI** : E salut bref + sourire ; I hochement de tête ; F regard chaleureux ; T regard neutre
- **Mémoire** : ajoute `PlayerVisited` weight 5
- **Mood** : aucun changement
- **Réputation** : pas de Δ
- **Effet concret** : prix standard, services standards

#### 5.1.3 Joueur réputation -50 (Méfiant)

- **Trigger** : `PlayerEntersAwarenessZone` + `rep_effective ∈ [-50, -25]`
- **Branche BT** : `ModeSocial.ColdGreet` ou `Routine.Continue` selon MBTI
- **Utility** : `Social.Greet` -20, `Routine.Continue` +15
- **MBTI** : E froide remarque, I tourne le dos, F déçu silencieux, T méprisant calculateur ; J tranché ×1.2 (encore plus distant), P plus tolérant ×0.8
- **Mémoire** : entrée `PlayerVisitedHostile` weight 15
- **Mood** : `Peur +5` (méfiance), `Colere +5`
- **Réputation** : pas de Δ supplémentaire
- **Effet concret** : prix +20%, refuse services premium (banque, quêtes)

#### 5.1.4 Joueur réputation -75 (Hostile)

- **Trigger** : `PlayerEntersAwarenessZone` + `rep_effective ∈ [-75, -50]`
- **Branche BT** : `ModeSocial.RefuseService` + alerte si Garde proche
- **Utility** : `Social.Greet` -50, `Combat.Hide` +10 (civil), `Combat.Engage` +30 (Garde)
- **MBTI** : E cri d'alerte fort ("Ce voyou est ici !"), I signale discret, F apeuré, T déclare faits aux Gardes
- **Mémoire** : entrée `PlayerHostileVisit` weight 30
- **Mood** : `Peur +20`, `Colere +10`
- **Réputation** : pas de Δ direct
- **Effet concret** : refus de service total, civil fuit, Garde se prépare au combat

#### 5.1.5 Joueur Karma rouge/banni — réaction par faction

> Cohérent [[PvP]] §Karma + §12 Factions PNJ.

| Faction du PNJ | Réaction Karma rouge | Réaction Karma banni |
|----------------|---------------------|---------------------|
| **Garde** (Lex Petra, milice) | Combat.Engage immédiat (P3) | Combat.Engage + cri général "Bounty !" |
| **Marchand** (commercial) | Peur +40, fuit + alerte | Refuse service, ferme boutique |
| **Civil ordinaire** | Peur +30, rentre chez soi | Cache enfants, prie |
| **Hors-la-loi** (Catena Fracta, camps) | Salut respectueux (E) ou neutralité (I) | Allié de fait, accès au camp |
| **Religieux** (clergé selon religion) | Foedus Animae : tente rachat ; Lex Petra : appelle Tribunal | Tous : refuse de parler |

- **MBTI** : F ressent peur émotionnelle ×1.3 ; T calcule risque, fuit si supérieur en force
- **Mémoire** : Memory.Public.PlayerKilledLocal propagation (§3) si meurtre récent
- **Réputation** : -50 par meurtre PNJ + propagation faction

### 5.2 Attaque / catastrophe locale — bascule Mode Crise

> Concept canonique : §16 Combat AI + §8 P1 + §6 MBTI.

#### 5.2.1 Attaque sur la ville (raid bandits, créature majeure)

- **Trigger** : multiple `Memory.Public.CombatNearby` + tag `Population.Catastrophe.Imminent`
- **Branche BT** : tous les PNJ en zone basculent sous-arbre `BT_NPCCombat` ou fuite, **tri par profil métier × MBTI**
- **Utility / Branche** :
  - **Soldats / Gardes** (combat metier) : `Combat.Engage` +50, branche `BT_NPCCombat` agressif
  - **PNJ Combatif** (T+E+J, ex. ESTJ, ENTJ, ISTP) : `Combat.Defense` +30, aide la défense
  - **PNJ Pacifique** (F+I+P, ex. INFP, ISFP, INFJ) : `Combat.Flee` +60 ; saturation Peur ≥ 80 → court-circuit fuite
  - **PNJ Religieux** : `Help.Ally` +30 (soin), `Combat.Pray` (anim prière de masse) ; Foedus Animae aide blessés, Ignis Aeternum bénit défenseurs
  - **PNJ Commerçant** : verrouille boutique, fuit avec coffre
- **MBTI synthèse** :
  - T+J = engagement rationnel
  - F+P = panique fuite
  - N = analyse stratégique (cherche position abritée)
  - S = réaction directe (fuite directe ou attaque directe)
- **Mémoire** : `Memory.Public.RaidOnVillage` weight 100, propagation continent
- **Mood** : tous PNJ `Peur +40`, `Colere +20` (si proche), `Fatigue +5/s` en combat actif
- **Réputation** : si joueur défend → +30 reconnaissance faction locale ; si joueur participe à l'attaque → -100 individuel + -50 faction

#### 5.2.2 Combat de rue isolé (1v1, agression spontanée)

- **Trigger** : `Memory.Public.FightInStreet` < 30m
- **Branche BT** : `ModeSocial.Witness` puis bascule selon MBTI
- **Utility** :
  - Garde proche : `Combat.Engage` +40 (intervient)
  - Civil F+P : `Combat.Flee` ou `Combat.Hide`
  - Civil T+I : `Routine.Continue` +5 (ignore si non concerné)
- **MBTI** : E rapporte aux Gardes, I se cache puis témoigne après
- **Mémoire** : individuelle weight 40 si participants connus
- **Mood** : Peur +30, Colere +10

### 5.3 Festival local — Mode Festivité

> Concept canonique : §14 (mood social Ferveur) + §19 (scènes scriptées) + §13 (rituel collectif).

- **Trigger** : `FestivalLocalStarts` (tag posé selon calendrier ou jour religieux)
- **Branche BT** : `ModeFestivite` activé (compatible Routine atténuée)
- **Utility** :
  - `Routine.Continue` -30 (travail réduit)
  - `Social.Talk` +40, `Social.Trade` +20 (acheter décorations/nourriture)
  - `Help.NPC.Animate` +20 (E+F préférentiellement)
- **MBTI** :
  - E : anime, danse, propose tournées (ESFP, ENFP en avant-plan)
  - I : observe depuis le bord, courte participation (INFJ, ISFP discrets)
  - F : célébration émotionnelle, larmes de joie
  - T : organisation logistique (ESTJ gère les stocks, INTJ planifie)
  - J : adhère au programme officiel
  - P : danse spontanée, improvisation
- **Religion** (cohérent §13) :
  - Rota Mundi : danse cyclique au centre (rituel collectif intégré)
  - Cantus Mundi : chant collectif improvisé
  - Catena Fracta : absent ou rejet visible
  - Taciti : silencieux, observation seule
- **Mémoire** : mémoire collective de village `Memory.Public.FestivalCelebrated` weight 30
- **Mood** : `MoodGeneral +20`, `Joy +30`, `Fatigue +0.05/s` (montée lente)
- **Réputation** : si joueur participe + offre cadeau → +5 individuel par PNJ rencontré

### 5.4 Climat / météo

> Concept canonique : §13 (tabous Ignis) + §14 (modulation Ère) + §20 (pas d'effet pathfinding mais effet comportemental).

#### 5.4.1 Pluie modérée

- **Trigger** : tag `Weather.State.Rain` posé
- **Branche BT** : selon MBTI et religion
- **MBTI** :
  - J : prend parapluie, adapte habits (vestiaire avant sortie)
  - P : ignore, continue
- **Religion** :
  - **Ignis Aeternum** : `outdoor_tasks` réduits 70% (tabou §13), reste à l'abri
  - Autres : standard
- **Effet** : marchands ouvrent étals couverts, fermiers rentrent récolte fragile
- **Mood** : `Joy -5` chez S (sensibles au confort), `Joy +5` chez Vael'Kurash (esprits aquatiques)

#### 5.4.2 Tempête (orage violent)

- **Trigger** : tag `Weather.State.Storm`
- **Branche BT** : `RoutineAdjust.ShelterIndoor` (court-circuit Pluie+90%)
- **Utility** : `Routine.Continue` -100 (travail outdoor), `Social.GoHome` +60
- **MBTI** : tous se réfugient (saturation Peur +20 chez S+F)
- **Religion** : Via Ventus voit signe ; Ordo Caelum lit les éclairs comme oracle
- **Mood** : `Peur +30` chez tous, `Joy -15`
- **Pathfinding (§20)** : pas d'impact NavMesh, mais waypoint `home_location` privilégié

#### 5.4.3 Sécheresse (long terme, plusieurs jours)

- **Trigger** : tag `Climate.Drought.Active`
- **Branche BT** : adaptations économiques + religieuses
- **MBTI** :
  - T : stockage, calcul rationnement
  - F : partage, soutien aux pauvres
  - J : règles strictes d'eau
  - P : adaptation au jour le jour
- **Religion** :
  - Vael'Kurash : rituels d'apaisement aux esprits
  - Lex Petra : pas d'effet (très sédentaire, peu d'agriculture)
  - Rota Mundi : cycle naturel à respecter
- **Effet économique** : prix eau ×3, prix nourriture ×1.5
- **Mémoire village** : `Memory.Public.DroughtPeriod` weight 50, propagation
- **Mood** : `MoodGeneral -10`, `Fatigue +0.02/s` (chaleur)

#### 5.4.4 Phénomène cosmique (Brume Mortelle, Échos Brisés, Vent Pourpre)

> Concept canonique : §14 Ères. Ces phénomènes sont liés à des Ères ou archétypes spécifiques.

- **Trigger** : `Era.Dimension.TensionCosmique = Critique` + tag phénomène spécifique
- **Branche BT** : `Combat.Hide` ou `Routine.Pray` selon MBTI/religion
- **Utility** : `Combat.Hide` +50, `Help.Ally` +30 (Foedus Animae), `Routine.Pray` +40 (clergé)
- **MBTI** : N+F panique ×1.5 (interprétation symbolique terrifiante), S+T calme ×0.7 (rationalisation)
- **Religion** :
  - Noctari : voit signe positif (l'Ombre s'éveille)
  - Ordo Caelum : tente de lire les signes
  - Foedus Animae : pacte protecteur avec un compagnon
  - Catena Fracta : "C'est la fin des dieux" — discours public
- **Mémoire** : weight 80 individuelle, weight 100 village
- **Mood** : `Peur +50` baseline pendant durée phénomène, `Joy -25`
- **Réputation** : si joueur résout (quête générée par §15) → +50 toutes factions zone

### 5.5 Changement d'Ère cosmique (Souffle)

> Concept canonique : §14 Modulation paramétrique 95% + Templates alternatifs 5%. **Cohérent §10 (era_state persisté)** et [[L'Accord]] §Transition d'Ère.

#### 5.5.1 95% des PNJ — modulation paramétrique

- **Trigger** : `EraSouffleBroadcast`
- **Branche BT** : aucune réécriture du BT (cohérent §14)
- **Effets** appliqués par `UHWNPCEraModulationSubsystem` selon `EraModulationProfile` :
  - `wake_hour_offset` : ex. forgeron en Noctis se lève 1h plus tard
  - `mood_baseline_delta` : ex. Eldoria → Joy +20, Fear -15
  - `ambient_lines_pool` : nouveau pool de dialogues d'Ère
  - `outfit_tint` : couleur teinte vêtements (ex. Noctis = #1A0830)
  - `prices_modifier` : ±10% selon État du monde (Dégénérescence +10%, Floraison -5%)
  - `forge_open_hours`, `forge_rituals` : adaptations métier
- **MBTI** :
  - N : spéculation ouverte ("Cette ère est étrange... regarde le ciel")
  - S : continuité pratique ("Bah, c'est comme ça, on travaille")
  - F : ressent émotionnellement le changement (mood baseline +/- ×1.3)
  - T : analyse rationnelle des effets pratiques
- **Mémoire** : `Memory.Public.EraChanged.<archetype>` weight 100, propagation continent
- **Mood** : adapté selon `mood_baseline_delta` du Profile (NB : mood quotidien actuel reste reset au matin §10)
- **Réputation** : pas de Δ direct
- **Visuels** : transition progressive sur 1 semaine (cohérent rouille post-Souffle [[Le Souffle]])

#### 5.5.2 5% PNJ-clés — templates alternatifs

> Réservé aux Oracles, Prêtres senior, Bardes-chroniqueurs, Astronomes officiels (~250 PNJ total monde, §17 authoring).

- **Trigger** : `EraSouffleBroadcast` + match dans `era_alternative_templates`
- **Branche BT** : substitution du `routine_replacement` + `authored_dialogues` activés
- **Cas concret — Prêtre Noctari à l'Ère de l'Ombre Longue** :
  - Routine remplacée par `Routine_Priest_Nocturnal` (rituels nocturnes, processions)
  - Dialogues : pool `OmbreLongue_Sermon_*` activés (sermons longs, prophéties)
  - Aura ambient : `Spectral_Calm`
  - Tenue : robes plus sombres, accessoires ajoutés
- **Cas concret — Prêtre Noctari à l'Ère du Rêve Lumineux (Eldoria)** :
  - Template `PrêtreNoctari_RêveLumineux_Defensive` : prêcheur défensif (réfute la lumière)
  - Dialogues `RêveLumineux_Réfutation_*`
  - Routine plus combative (apparitions publiques pour défendre la doctrine)
- **MBTI** : la signature reste la même (ENTJ reste ENTJ), seul le template macro change
- **Mémoire** : pas de modification (la signature MBTI persiste)
- **Mood** : recalibré sur baseline + delta paramétrique
- **Réputation** : peut entraîner -10 à +10 selon alignement faction joueur ↔ Ère

#### 5.5.3 L'Accord du PNJ ?

- Les **PNJ n'ont pas d'Accord mesurable** (cohérent §14 décision)
- Mais leur `loyalty_score` (§12) peut basculer si religion-active désalignée à l'Ère pendant longtemps
- Cas : Prêtre Lex Petra à l'Ère de Tempora (chaos temporel) → `loyalty_score` -20 progressif si Tempora reste actif > 6 mois ; possible bascule de faction (PNJ nommé uniquement)

### 5.6 Pénurie / abondance

> Concept canonique : §14 État du monde + §15 Quêtes générées + §3 Mémoire.

#### 5.6.1 Pénurie alimentaire

- **Trigger** : `Era.State.Degenerescence` OU `Climate.Drought.Active` OU mort de masse §18
- **Branche BT** : adaptations économiques + religieuses
- **Utility** : `Social.Trade` modifié (prix ↑), `Help.Ally` -10 (chacun pour soi sauf F)
- **MBTI** :
  - **T** : stockage stratégique, calcul rations
  - **F** : partage avec proches (`family/friends` priorité), aide aux pauvres
  - **J** : règles strictes (rationnement appliqué)
  - **P** : flexibilité, négociation
- **Religion** :
  - Foedus Animae : organise repas partagés communautaires
  - Lex Petra : tribunaux pour ration équitable
  - Cantus Mundi : chants pour apaiser
- **Mémoire** : `Memory.Public.FaminePeriod` weight 60, propagation village
- **Mood** : `MoodGeneral -15`, `Fatigue +0.03/s`
- **Quêtes générées** (§15) : +30% quêtes "récolte/livraison" via QuestGenerator

#### 5.6.2 Abondance (Verdoiement / Floraison)

- **Trigger** : `Era.State.Floraison` ET `Era.Mood.Serenite|Ferveur`
- **Branche BT** : Mode Festivité spontané, surplus production
- **Utility** : `Social.Talk` +20, `Routine.Continue` standard mais surplus visible
- **MBTI** : E fête, I stocke discret
- **Religion** : Vael'Kurash célèbre les esprits naturels, Ignis Aeternum bénit récoltes
- **Mémoire** : `Memory.Public.AbundancePeriod` weight 40
- **Mood** : `MoodGeneral +15`, `Joy +20`
- **Effet économique** : prix -5% (cohérent §14 `prices_modifier`)

### 5.7 Mort d'un proche — Mode Deuil

> Concept canonique : §5 graphe social + §3 mémoire + §13 funérailles + §18 lifecycle. **Cas le plus émotionnellement coûteux à designer**.

#### 5.7.1 Mort d'un membre `family` (parent / spouse / enfant)

- **Trigger** : event `OnNPCDied(npc_id)` + npc_id ∈ `family` du PNJ témoin
- **Branche BT** : Mode Deuil activé (compatible Routine atténuée)
- **Utility** :
  - `Routine.Continue` -50 (efficacité réduite)
  - `Help.Ally` +40 (réconforter autres family)
  - `Routine.Pray` +30 (rituel funéraire)
  - `Social.Talk` -30 (replié sur soi)
- **MBTI** :
  - F : impact ×1.5 (dépression marquée, larmes publiques)
  - T : impact ×0.7 mais Colere +20 (rage rationnelle si meurtre)
  - I : retrait social, ne sort plus 7 jours
  - E : exprime la peine en public, parle aux voisins
  - J : organise les funérailles avec rigueur
  - P : laisse les choses se faire, dérive
- **Mémoire individuelle** : entrée `FamilyMemberDied` weight 100, jamais décroît (event marquant)
- **Mémoire village** : `Memory.Public.NPCDied.<id>` weight 60
- **Mood** :
  - `mood_baseline -20` permanent pendant 14 jours (cohérent §4 + §10 mood_baseline persistable)
  - `Joy -30`, `Colere +30` si meurtre, `Peur +10`
- **Réputation** : si joueur tueur identifié → -100 individuel + -50 faction
- **Routine ralentie 14j** : `efficiency_modifier = 0.5` sur tâches métier
- **Funérailles (§13 + §19)** : selon religion du défunt, scène scriptée déclenchée
  - Foedus Animae : veillée funéraire familiale (dialogue nostalgie)
  - Ignis Aeternum : crémation obligatoire (tabou §13)
  - Vael'Kurash : enterrement au pied d'un arbre ancien
  - Rota Mundi : cycle célébré (mort = retour)
- **Successeur narratif si défunt persistant** (§18) : timer 7 jours, voir §18 lifecycle

#### 5.7.2 Mort d'un voisin / collègue (graphe `friends` ou hiérarchie pro)

- **Trigger** : `OnNPCDied(npc_id)` + npc_id ∈ `friends/boss/subordinates`
- **Branche BT** : Mode Deuil léger (court, 3-5 jours)
- **Utility** : `Social.Talk` +10 (parle de lui aux voisins), `Help.Ally` +20 (aide la famille)
- **MBTI** : F deuil sincère ×1.3 ; T solidaire bref
- **Mémoire** : entrée `FriendDied` weight 50, décroissance normale
- **Mood** : `mood_baseline -10` pendant 5j, `Joy -15`

#### 5.7.3 Mort d'un PNJ nommé connu (régional, pas dans graphe)

- **Trigger** : `Memory.Public.NamedNPCDied` (cohérent §18)
- **Branche BT** : Mode Routine standard + dialogues d'ambiance "Tu as entendu ?"
- **Utility** : pas de modification BT
- **MBTI** : N+F spéculation longue, S+T constatation factuelle
- **Mémoire** : weight 30 individuelle, propagation continent
- **Mood** : `mood_baseline -3` pendant 2j (impact léger)
- **Side quest générée** (§15) : "Découvrir ce qu'il voulait" chez les proches du défunt

### 5.8 Quête (donneur / témoin / cible)

> Concept canonique : §15 Quêtes hybride authored + procédural.

#### 5.8.1 PNJ donneur de quête (main authored)

- **Trigger** : joueur s'approche + prerequisites match (Reconnaissance min, Ère, etc.)
- **Branche BT** : Mode Dialogue activé sur sélection joueur
- **Utility** : `Social.Greet` +50 si joueur a déjà rep > 50, sinon +20
- **MBTI** :
  - F : donneur émotionnel ("Aide ma fille perdue dans la forêt, je t'en prie")
  - T : transactionnel ("Livre ce courrier pour 10 Éclats")
  - N : longue introduction lyrique, contexte historique
  - S : factuel et bref, "voici l'objet, voici l'endroit"
  - J : strict ("Tu as 3 jours, sinon je trouverai quelqu'un d'autre")
  - P : flexible ("Reviens quand tu peux")
- **Mémoire** : `QuestAssignedTo.<player_id>` weight 60
- **Mood** : `Joy +5` (espoir), `Peur +5` (anxiété si quête importante)
- **Réputation** : potentielle ±30 selon résultat de quête

#### 5.8.2 PNJ donneur de side quest procédurale

- **Trigger** : joueur s'approche + `QuestGenerator` peut produire une quête
- **Branche BT** : Mode Dialogue (court)
- **Utility** : `Social.Greet` +30 (PNJ recherche aide)
- **MBTI** : modulation directe sur templates choisis par §15
  - F+N : T_FindLost, T_RestoreLove, T_SaveAnimal
  - F+S : T_HelpFamily, T_ProtectChild, T_BringFood
  - T+N : T_Investigate, T_SolvePuzzle, T_DiscoverTruth
  - T+S : T_DeliverGoods, T_RetrieveSomething, T_CollectMaterials
- **Modulation Ère** (§14, §15) :
  - Effroi : +30% défense/exorcisme
  - Sérénité : +30% récolte/livraison/mariage
  - Méfiance : +30% investigation/espionnage
- **Mémoire** : `SideQuestAssignedTo.<player_id>` weight 30
- **Mood** : `Joy +3`

#### 5.8.3 PNJ témoin (peut donner indices)

- **Trigger** : joueur en quête active s'approche + PNJ a info pertinente (présent au lieu/heure)
- **Branche BT** : Mode Dialogue avec branche conditionnelle "indice"
- **Utility** : `Social.Talk` +15 si rep > 0, refus si rep < 0
- **MBTI** :
  - E : donne info volontiers
  - I : faut insister, reste vague
  - F : aide volontiers si requête émotionnelle
  - T : demande contrepartie (Éclats ou service)
- **Mémoire** : `WitnessedEvent.<id>` weight 40
- **Réputation** : pas de Δ ou +5 si joueur récompense

#### 5.8.4 PNJ cible (combat, escorte, livraison)

- **Trigger** : joueur exécute objectif vers ce PNJ
- **Branche BT** : selon nature de la quête
  - **Combat (cible hostile)** : bascule `BT_NPCCombat` (cohérent §16) ; couches §8 P3 actives
  - **Escorte (cible amicale)** : suit le joueur, `BTTask_FollowPlayer` ; bascule `Combat.Flee` ou `Combat.Hide` si menace
  - **Livraison (cible passive)** : reçoit objet, dialogue de remerciement
- **MBTI** :
  - Escorte J : strict timing (rappelle constamment l'objectif)
  - Escorte P : détours, curieux
  - Cible F : émotionnel ("Tu m'as sauvé !")
  - Cible T : transactionnel
- **Mémoire** : si quête réussie, `PlayerHelpedMe` weight 80 → grosse boost rep individuelle
- **Mood** : si sauvé, `MoodGeneral +30`, `Peur -20`, `Joy +30` (cohérent §4 trigger)
- **Réputation** : sauvetage → +30 individuel + +10 faction

---

## 6. Modulation par MBTI — table synthétique transverse

> Récap pour chaque dichotomie : comment elle module les actions situationnelles. **Tableau de référence** pour designer/implémenteur. Cohérent §6 + §7 + §8 + §13.

### 6.1 Dichotomie I / E (Introverti / Extraverti)

| Action | E (Extraverti) | I (Introverti) |
|--------|---------------|----------------|
| Salutation joueur | Expansive, longue | Brève, hochement |
| Mode Festivité | Anime, danse | Observe, retrait |
| Croisement étranger | Approche, parle | Détourne le regard |
| Témoin événement | Crie, alerte fort | Signale discret |
| Mode Deuil | Exprime peine en public | Retrait social 7j+ |
| Friends count cible (§5) | ×1.5 | ×0.6 (mais profondeur ×1.2) |
| Score `Social.Greet` (§1) | +30 | -25 |
| Réputation expression (§7) | ×1.3 | ×0.7 |

### 6.2 Dichotomie N / S (Intuition / Sensation)

| Action | N (Intuition) | S (Sensation) |
|--------|---------------|----------------|
| Réaction Souffle (§14) | Spéculation, lecture symbolique | Continuité pratique |
| Phénomène cosmique (§5.4) | Panique mystique ×1.5 | Constat factuel ×0.7 |
| Quête (§15) templates | Investigation, découverte | Livraison, collecte |
| Religion (§13) interprétation | Mystique libre, ajout pratiques | Stricte, adhérence rituelle ×1.3 |
| Mentor / Apprentice (§5) | ×2 probabilité | Standard |
| Score `Combat.Hide` | +15 (analyse) | — |
| Score `Combat.Engage` | — | +10 (réaction directe) |

### 6.3 Dichotomie T / F (Pensée / Sentiment)

| Action | T (Pensée) | F (Sentiment) |
|--------|-----------|----------------|
| Prix marchands | Rigides, +30 stricts | -20 flexibles, partage |
| Réaction mort proche (§5.7) | Colère rationnelle, vengeance | Tristesse ×1.5, larmes |
| Réputation seuils (§7) | -5 favorable (calculateur) | +5 favorable (pardonnant) |
| Donneur quête | Transactionnel | Émotionnel |
| Score `Help.Ally` | -15 | +20 |
| Score `Combat.Surrender` | — | +10 |
| Bascule faction (§12) | Δ rationnels ×1.3 | Δ émotionnels ×1.5 |
| Saturation Colère (§4) | Court-circuit Defense agressive (≥90) | Standard |

### 6.4 Dichotomie J / P (Jugement / Perception)

| Action | J (Jugement) | P (Perception) |
|--------|-------------|----------------|
| Adhérence routine (§1) | +30 strict | -30 flexible |
| Tolérance imprévu | -20 | +30 |
| Hiérarchie boss (§5) | Respect strict | Souple, change facilement |
| Mémoire durée (§3) | 48h structurée | 12h labile |
| Réputation amplitude (§7) | ×1.2 (jugement tranché) | ×0.8 (tolérant) |
| Loyauté faction initiale (§12) | +20 | -10 |
| Seuil bascule faction (§12) | loyalty < 15 | loyalty < 45 |
| Météo pluie | Parapluie, adapte | Ignore |
| Mode Quête deadline | Strict, presse | Détours, flexible |

### 6.5 Synthèse par type — exemples

> 4 types canoniques pour fixer les idées. Les 12 autres se déduisent par combinaison.

#### ESTJ (Directeur) — Capitaine de garde / Contremaître
- Routine ultra-stricte (J+S)
- Engage combat sans hésitation (T+E+J)
- Réaction Souffle : continuité pratique, organise transition logistique
- Mort proche : Colère rationnelle, vengeance organisée
- Donne quêtes : transactionnelles, deadlines strictes

#### INFP (Médiateur) — Poète / Jeune apprenti / Jardinier
- Routine flexible (P), adhérence émotionnelle au métier (F)
- Fuit combat immédiatement (saturation Peur ≥ 80 fréquente)
- Réaction Souffle : interprétation lyrique, art inspiré
- Mort proche : tristesse ×1.5, retrait 7j+
- Donne quêtes : émotionnelles ("aide ma fille perdue")

#### ENTP (Innovateur) — Marchand itinérant / Escroc sympathique
- Routine très flexible (P+E+N)
- Combat évité par ruse, fuite intelligente
- Réaction Souffle : voit opportunités, crée nouvelles offres
- Mort proche : passe à autre chose vite, mais marqué intérieurement
- Donne quêtes : aventureuses, semi-illégales

#### ISFJ (Défenseur) — Guérisseur / Mère / Hôtelier
- Routine stable (J+S), service aux autres (F)
- Combat : aide les blessés, refuse engagement direct
- Réaction Souffle : maintient le foyer stable
- Mort proche : deuil profond, présence pour autres family
- Donne quêtes : protection enfants, ramener objets perdus

---

## 7. Cohérence avec les 20 Concepts — renvois explicites

### 7.1 Diagramme input/output

```
                    [Concepts Fondamentaux IA PNJ]
                                  │
                                  ▼
       ┌──────────────────────────────────────────────┐
       │      Modèles, structures, paramètres           │
       └──────────────────────────────────────────────┘
                                  │
                                  ▼
                    ───────────────────────
                    │ Actions Situationnelles │  (CE FICHIER)
                    ───────────────────────
                                  │
                                  ▼
       ┌──────────────────────────────────────────────┐
       │   Phase 3 — Templates métier (forgeron,        │
       │   boulanger, garde, prêtre, etc.)              │
       └──────────────────────────────────────────────┘
                                  │
                                  ▼
       ┌──────────────────────────────────────────────┐
       │   Phase 4 — Signatures (PNJ nommés authored)   │
       └──────────────────────────────────────────────┘
```

### 7.2 Couverture des 20 concepts par section

| Concept | Sections où appliqué | Notes de cohérence |
|---------|---------------------|---------------------|
| §1 BT racine + Utility | §1.1 chaîne, §2 matrice, §5 toutes | Toutes les actions passent par Utility Scorer (couche 3) sauf court-circuits §8 |
| §2 Perception 5 profils | §4 triggers (ThreatLevel +30/+20/+15), §5.1 PlayerEntersAwarenessZone | Seuils chiffrés cohérents §2 implémentation |
| §3 Mémoire stratifiée | §5.1 entrée individuelle, §5.7 weight 100, §5.5 Memory.Public.EraChanged | Décroissance Weight ×0.9/6h respectée |
| §4 Mood + 3 émotions | §5.7 mood_baseline -20, §5.4 Peur +30, §5.5 mood_baseline_delta | Saturations Peur≥80 / Fatigue≥90 / Colère≥90+T appliquées |
| §5 Graphe social | §5.7 family/friends, §5.2 allié attaqué (P1) | Modulation MBTI sur graph (§5) reportée intacte |
| §6 MBTI | §6 table transverse, §5 toutes les sous-sections | 16 types couverts par 4 dichotomies |
| §7 Réputation | §5.1 (6 seuils), §2 matrice, §6.1 expression | Formule effective `0.7×indiv + 0.3×faction` cohérente |
| §8 Modèle décision 3 couches | §1.1 chaîne, §4 court-circuits P0-P3, §5.2 P1 allié attaqué | Ordre d'évaluation strict respecté |
| §9 Population persistants/transients | §5.7 successeur §18, §5.8 transients ne donnent pas | Granularité par catégorie respectée |
| §10 Persistance | §5.7 mood_baseline persistable, §5.5 era_state persistable | Mood quotidien actuel non persisté |
| §11 LOD AI | §3.1 LOD requis par mode, §3 émergence L0 only | Cohérent §11 promotion forcée si Combat |
| §12 Factions | §5.1.5 Karma rouge par faction, §5.5.3 loyalty_score | Bascule PNJ nommés selon Δ MBTI F/T/J/P |
| §13 Religion / RitualPattern | §3 Mode Religieux, §5.4.1 tabous Ignis pluie, §5.7 funérailles | 12 RitualPatterns canoniques référencés |
| §14 Réaction Ères | §5.5 (95% paramétrique + 5% templates), §5.6 abondance | EraModulationProfile + era_state cohérents |
| §15 Quêtes | §3 Mode Quête, §5.8 (donneur / témoin / cible) | Modulation MBTI×Ère×Faction sur QuestGenerator |
| §16 Combat AI | §3 Mode Crise, §5.2 BT_NPCCombat | Sortie 5s sans dégât respectée |
| §17 Authoring | §5.1.5 nommés ont rep individuelle, §5.5.2 templates alternatifs | Frontière authored/généré = persistants/transients |
| §18 Lifecycle | §5.7 successeur 7j, §5.7.3 NamedNPCDied | Mort permanente nommés, Pop.Catastrophe 14j deuil |
| §19 NPC↔NPC | §3 Mode Festivité scènes scriptées, §5.7 funérailles, §6 émergence MBTI | Cap 5 rencontres/min/village respecté |
| §20 Pathfinding | §5.4 réfugier intérieur (waypoint home), §5.2 fuite intelligente | Replan capé par LOD §11 |

> **Vérification systématique** : aucune section ne contredit un concept. Toutes les valeurs chiffrées sont héritées du fichier source.

### 7.3 Renvois inversés

Concept → où ce fichier l'utilise :
- §1 → §1.1, §2, §3.3, §5 (omniprésent)
- §2 → §4, §5.1.1, §5.1.4
- §3 → §5.1, §5.7, §5.8
- §4 → §5 (toutes), §6
- §5 → §5.7, §5.2, §3.1
- §6 → §6 entier, §5 (toutes)
- §7 → §5.1, §2, §6.1
- §8 → §1.1, §4, §5.2
- §13 → §3.1, §5.3, §5.4, §5.7
- §14 → §5.5, §5.6, §6.2
- §15 → §3.1, §5.8
- §16 → §3.1, §5.2
- §18 → §5.7, §5.6
- §19 → §3.1, §5.3, §5.7

---

## 8. Décisions ouvertes / chantiers

> Calibrations, scènes additionnelles, et variantes culturelles à playtester ou enrichir post-Phase 2.

### 8.1 Calibrations seuils à playtest

| ID | Paramètre | Valeur actuelle | Risque | Méthode validation |
|----|-----------|-----------------|--------|-----|
| **CAL-1** | Seuil ThreatLevel bascule Combat | 50 | Trop sensible → PNJ paniquent en pacifique ; trop laxe → PNJ ignorent menace réelle | Mesurer fréquence basculements en sandbox 30 min |
| **CAL-2** | Mood_baseline -20 pendant 14j (Mode Deuil) | 14 jours fixes | Trop long → joueur se lasse ; trop court → impact peu ressenti | Test perception joueur en playtest narratif |
| **CAL-3** | Mémoire individuelle 24-48h (selon J/P) | 48h J / 24h P / 12h P fort | Trop long → BDD lourde ; trop court → PNJ amnésiques ressentis | Mesure rétention en jeu |
| **CAL-4** | Cap 5 rencontres émergentes /village /minute | 5/min | Trop bas → village mort ; trop haut → CPU spike | Profiling CPU en village dense |
| **CAL-5** | Successeur narratif après 7 jours | 7j fixes | Trop court → casser deuil ; trop long → village vide | Playtest deuil + perception continuity |
| **CAL-6** | Modulation MBTI amplitude (×1.2 J / ×0.8 P sur réputation) | ×1.2 / ×0.8 | Trop fort → caricatures ; trop faible → invisible | Comparaison playtest avec amplitude × variants |
| **CAL-7** | Festival : ratio E/I qui anime vs observe | Implicite | Si trop d'E → village toujours fête ; trop d'I → village morne | Comptage par village type |
| **CAL-8** | Peur baseline +50 pendant phénomène cosmique | +50 fixe | Trop élevé → PNJ tous cachés ; trop bas → on ne ressent pas la menace | Playtest Brume Mortelle |
| **CAL-9** | Joueur Karma rouge → Peur civil +40 | +40 fixe | Trop fort → village fuit en bloc ; trop faible → impressionne pas | Playtest entrée joueur rouge |
| **CAL-10** | Pénurie alimentaire prix ×3 eau / ×1.5 nourriture | ×3 / ×1.5 | Économie déséquilibrée si trop fort | Simulation économique |

### 8.2 Scènes émergentes supplémentaires (au-delà des 9 canoniques §19)

> Le catalogue §19 fixe 9 scènes scriptées. À enrichir Phase 3+ :

- **Procession religieuse mensuelle** par religion (Ordo Caelum vers observatoires, Lex Petra lapidaire, Foedus Animae cimetière)
- **Marché itinérant inter-villages** (Via Ventus voyage 1×/an obligatoire)
- **Veillée d'ombre Noctari** mensuelle (inversion cycle) — intégration LOD spéciale
- **Méditation collective Taciti** silencieuse (gestion anim "rien" en groupe)
- **Performance Cantus Mundi** improvisée (génération musique procédurale ?)
- **Apprentissage public** (forgeron-maître + apprentis sur place du village)
- **Conseil de village** trimestriel (PNJ nommés se rassemblent, décisions visibles aux joueurs)
- **Naissance d'une rumeur** — propagation visible (PNJ A parle à PNJ B qui parle à PNJ C, anim chuchotement)
- **Conflit doctrinal en place publique** (deux clergés se confrontent, scène scripté narrativement)
- **Enterrement de masse** post-Population.Catastrophe (rituel collectif intervenant après 14j deuil)

### 8.3 Variantes culturelles par pays

> Cohérent §6 (distribution MBTI par pays — biais culturels) et `Lore/Pays/`. À spécifier Phase 4 :

- **Alkaran** (peuples tribaux, Vael'Kurash dominant) : densité E+F (sensibles, naturalistes), routines plus collectives
- **Cendara / Pyrtara** (Ignis Aeternum) : E+T+J (action, autorité), ouverts aux festivités du feu
- **Vytharia / Nysaria** (Noctari) : I+N+T (réservés, secrets), routines nocturnes inversées
- **Altram / Iskara** (Lex Petra) : J+T+S (méthodiques, ordre), tribunaux fréquents
- **Onara / Skaldoria** (Foedus Animae) : F+S (lien affectif fort), funérailles élaborées
- **Continents à cheval** (Iskara, Myrtam, Skaldoria, Thalmaris, Haldria) : variantes nomades — routines de voyage
- **Catena Fracta** (clandestin) : présent partout en minorité, avec routines de dissimulation

### 8.4 Modulation par sous-spécialisation métier

> Phase 3 : chaque métier reçoit ses sous-variantes situationnelles.

- **Forgeron** : Maître / Apprenti / Artisan-itinérant / Forgeron-religieux Ignis Aeternum / Forgeron-rebelle Catena
- **Garde** : Vétéran / Recrue / Capitaine / Garde-frontière / Tribunal Lex Petra
- **Prêtre** : Hierarch / Prêtre village / Oracle / Acolyte / Schismatique
- **Marchand** : Sédentaire / Itinérant / Caravanier / Boursicoteur / Récolteur
- **Aubergiste** : Métropolitain / Rural / Ferme-relai / Hôtellerie spirituelle (auberge + temple)

Chaque sous-spécialisation peut hériter de modulations spécifiques sur cette grille situationnelle (ex. Forgeron-religieux Ignis : strict tabou pluie, rituel forge collective annuelle, dialogue avec accent doctrinal).

### 8.5 Chantiers de cohérence transverse

| Chantier | Référence | Phase |
|----------|-----------|-------|
| Harmoniser `EvaluateCombatSituation()` C++ : `HP<30 absolu` → `HP<MaxHealth*0.20` | §8 P0 + [[AI Controller]] | Implémentation immédiate |
| Étendre `BTTask_HWRetreat` : 3-5 candidats RetreatLoc cône 90° | §20 fuite intelligente | Phase 2 |
| Implémenter `UVillageSceneScheduler` (UWorldSubsystem) | §19 scènes scriptées | Phase 2 |
| Implémenter `BTService_SocialEncounter` (émergence MBTI) | §19 + §6 | Phase 2 |
| Créer 6 `EraModulationProfile` Data Assets archétypes principaux | §14 | Phase 2-3 |
| Créer 12 `RitualPattern` Data Assets (1 par religion) | §13 | Phase 2 |
| Créer table SQL `npc_persisted` + migration | §10 + [[Migration Accord]] | Phase 2 |
| Mettre à jour ébauches Forgeron/Boulanger selon ce fichier | Phase 3 | À planifier |

---

## 9. Synthèse — diagramme final

```
                    ┌─────────────────────────────┐
                    │ Concepts Fondamentaux IA PNJ │  (20 décisions tranchées)
                    │     20 D-PNJ-* canoniques     │
                    └──────────────┬───────────────┘
                                   │ pose le modèle
                                   ▼
              ┌────────────────────────────────────────┐
              │      ACTIONS SITUATIONNELLES (CE FICHIER)│
              │                                          │
              │  • 40+ contextes (matrice §2)            │
              │  • 8 modes superposables (§3)            │
              │  • 18+ triggers canoniques (§4)          │
              │  • 8 catégories de réactions (§5)        │
              │  • Modulation MBTI exhaustive (§6)       │
              │  • 10 calibrations à playtester (§8)     │
              └─────────────────┬────────────────────────┘
                                │ applique aux situations
                                ▼
              ┌────────────────────────────────────────┐
              │  Phase 3 Templates Métier                │
              │  (Forgeron, Boulanger, Garde, Prêtre,   │
              │   Marchand, Aubergiste, etc.)           │
              └─────────────────┬────────────────────────┘
                                │ instancie par PNJ
                                ▼
              ┌────────────────────────────────────────┐
              │  Phase 4 Signatures (PNJ nommés)        │
              │  ~3 250 PNJ authored monde              │
              └────────────────────────────────────────┘
```

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Forgeron]] · [[Boulanger]] · [[Combat]] · [[PvP]] · [[Le Souffle]] · [[Les Ères]] · [[L'Accord]] · [[Lore/Religions/00 - Système Religieux|Système Religieux]] · [[Architecture Data-Driven]] · [[Registre des Décisions]]*
