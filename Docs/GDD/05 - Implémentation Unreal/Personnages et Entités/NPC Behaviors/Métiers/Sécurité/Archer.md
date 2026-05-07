---
tags: [pnj, comportement, métier, archer, sécurité]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Sécurité/Archer]]
mbti_typique: [INTP, ISTP, INTJ]
karma_typique: vert
factions_compatibles: [Politiques, Commerciales, Religieuses]
needs_review_for: [calibration-playtest]
---

# 🏹 Template comportement PNJ — Archer

> Template de comportement IA d'un PNJ **Archer**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Sécurité/Archer]].
>
> **Particularité** : Sécurité **ranged**. Cycle quotidien = entraînement + patrouille distance + chasse à l'arc occasionnelle (cf [[03 - Mécaniques/Items/Archétypes/Arc]] mécanique). Mode Crise = **engage à distance** (jamais mêlée). Calme, focus, peu loquace — MBTI dominés par I.

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Routine** (entraînement + poste de tir) + **Mode Crise** (engage distance) | **Mode Festivité** (tournois de tir), **Mode Quête** (chasse créatures volantes), **Mode Dialogue** (mentor formation) | **Mode Marchand** rare (vend rarement directement, sauf flèches custom) |

**MBTI typiques** :
- **INTP** (Logicien) : Archer-théoricien — lit le vent, calcule trajectoires, mentor d'école d'arc.
- **ISTP** (Virtuose) : Archer-bricoleur indépendant — geste précis, instinct, peu de discours, archer-chasseur de monastère.
- **INTJ** (Architecte) : Archer-stratège — embuscade planifiée, sniper diplomatique (palier Expert+, missions politiques).

**Karma typique** : 🟢 **vert** par défaut. Variant 🔴 **rouge** : Archer-bandit qui détrousse caravanes (cf §8 source) — vise l'arc puis fuit.

**Catégorie population (§9)** : **Mixte** — Capitaines d'arc nommés (palier Maître) sont **persistants nommés**, archers de muraille standards sont **persistants famille de génération**, archers de patrouille de campagne **transients**.

---

## 2. Cycle quotidien

```
[06:00] Réveil — préparation arc et flèches (vérification, cire des cordes)
   ↓
[07:00] Entraînement matinal au stand de tir (Acuité × Maîtrise_Tir_Arc)
   ↓
[09:00] Prise de poste — muraille / tour / poste élevé
   ↓
[09:00–12:00] Garde distance + patrouille longue vue + observation (Acuité)
   ↓
[12:00–13:00] Repas frugal au poste OU caserne
   ↓
[13:00–17:00] Suite poste OU chasse à l'arc (gibier, créatures volantes)
   ↓
[17:00–18:00] Entretien matériel (cordes, plumes, pointes — entretien préventif quotidien)
   ↓
[18:00] Retour caserne / domicile
   ↓
[19:00–22:00] Loisir — souvent solitaire (lecture, atelier, fabrication flèches)
   ↓
[22:00] Dormir
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 06:00 | Archer-chasseur : 04:30 (lever du jour optimal) |
| `work_start` | 07:00 | (entraînement) |
| `work_end` | 18:00 | |
| `weekend_pattern` | `chasse` ou `aucun` | INTP/ISTP : tir personnel le week-end |
| `leisure_preference` | `atelier` (fabrication flèches) ou `lecture` | ISTP : `atelier` ; INTP : `lecture` ; INTJ : `lecture` |
| `workplace_location` | Stand de tir + muraille / tour de garde | Archer-chasseur : forêt |
| `home_location` | Caserne ou demeure proche | Ermite : cabane isolée |
| `mastery_level` | `Initié` | Novice → Maître |
| `entrainement_hebdo_obligatoire` | true | Cf §7 source — décroissance si pas pratiqué |

---

## 3. Modes contextuels actifs

### Mode Routine (entraînement + poste)

Sous-mode **`Routine.Entrainement`** :
- Trigger : début matinée + stand de tir disponible
- Action : tirs sur cibles, animation `armer_arc`, `viser`, `tirer`
- Récupère flèches (cycle court), boucle 30-60 min
- Modulation MBTI : INTP analyse résultats ; ISTP affine geste sans verbaliser ; INTJ planifie progression

Sous-mode **`Routine.PosteMuraille`** :
- Trigger : prise de poste + horaire
- Action : station debout, `regarder_lointain` (Acuité), rotation lente, attentif au paysage
- Détection passive (§2 source — `BBKey_PassiveAwareness`) augmentée — l'Archer voit loin
- Profil perception : **Humain veilleur** (§2 — Vision jour 50m, audition silence 25m)

Sous-mode **`Routine.ChasseArc`** :
- Trigger : créneau libre + permission chasse
- Action : pathfinding vers terrain de chasse, `furtif`, traque, tir embusqué
- Cumul `Maîtrise_Survie_<Climat>` (§2 source)

### Mode Crise (engage à distance — caractéristique)

> **Pattern Mode Crise spécifique Archer** : ne jamais entrer en mêlée. Maintient distance, repositionne, abandonne poste si encerclé.

- Trigger : `RaidOnVillage`, `PlayerArrivesAggressively`, `AllyDirectlyAttacked`
- Branche BT : sous-arbre `BT_NPCArcherCombat` (variant `BT_NPCCombat` pour ranged)
  - **Si poste élevé** (muraille, tour) : `Combat.Engage.Ranged` à distance, tir en cadence
  - **Si surface** : `Combat.Reposition` vers point élevé, puis tir
  - **Si encerclé** (ennemi < 3m) : `Combat.Retreat` + tir court
- Cadence : 3-6 flèches selon palier (cf §3 source)
- Cible priorité (T+I dominant) : adversaires armes tirées > cibles éloignées en charge > leaders ennemis
- Saturation Peur ≥ 80 : INTP fuite organisée, ISTP fuite + tir d'arrière-garde, INTJ retraite vers position défendable
- Profil **Humain veilleur** (§2) — détection +20m vs garde standard
- Cas Capitaine d'arc : `Combat.Command` (palier Expert+) — coordonne tirs groupés (cf §6 source — tient muraille seul lors de siège, condition Maître)

### Mode Festivité (tournois de tir)

- Trigger : événement festival local + tournoi annoncé
- Comportement : participe activement, **ouvre une école éphémère** si Maître
- ISTP : démonstration silencieuse mais respectée ; INTP/INTJ : challenge intellectuel
- Gain Renom +30 si gagne grand tournoi (§9 source)

### Mode Quête (donneur ou exécutant)

- "Abats cette créature volante", "Chasse cet espion fuyard", "Garde cette muraille pendant 3 nuits" (cf §10 source)
- Sous-mode `Quête.SniperDiplomatique` (palier Expert+) : missions politiques discrètes (frontière avec [[03 - Mécaniques/Métiers/Sécurité/Espion]])

### Mode Dialogue

- Rare — Archer peu loquace par MBTI
- Sous-mode `Dialogue.MentorFormation` (palier Adepte+) : forme apprenti contre Éclats / faveurs
- Mini-jeu de transmission (cf §10 source)

### Mode Religieux

- Variant **Archer-prêtre** (rare, cf §8 source) — certains cultes ont des archers sacrés
- Sabbat respecté, rituels de bénédiction des arcs

### Mode Deuil

- Mort d'un compagnon de muraille : Mode Deuil 7-14j, mood baseline -10
- Tournoi commémoratif possible (§19 NPC↔NPC)

### Mode Marchand (rare)

- Variante : Maître Archer vend flèches custom, peut faire bénédiction d'arc (palier Maître)
- Pas d'inventaire standard — service à commande

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **EnemySpotted** (longue distance, Vision 50m) | `BBKey_ThreatLevel +20` ; alerte sifflet — appelle Garde mêlée | §2 source profil veilleur |
| **CreatureVolanteRepérée** | Active `Combat.Engage.Ranged` immédiat — niche exclusive Archer (§6 source) | §6 source |
| **EraVoile** | Demande forte d'archers d'embuscade (§8 source) — bascule Mode Quête `SniperDiplomatique` plus fréquemment | §14 |
| **EraVent** (Aerion) | Recettes de flèches voyageuses bonifiées (cf §8 source + [[03 - Mécaniques/Crafts]]) | §14 |
| **PlayerSeeksTraining** (palier Maître + rep ≥ +25) | Active sous-mode `Quête.MentorFormation` | §10 source |
| **TournoiTirAnnoncé** | Mode Festivité `TournoiTir` | §6 source |
| **EncerclementMêlée** (ennemi < 3m) | Court-circuit P0 → `Combat.Retreat` (l'Archer fuit la mêlée par discipline métier) | §1 P0 + §16 |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur s'approche du poste de muraille

| Rep effective | Réaction |
|---------------|----------|
| +75 (allié) | Salut respectueux, échange court (peu de mots, MBTI I), possible offre formation |
| Neutre | Hochement de tête, continue garde |
| -50 | Méfiance, suit du regard, main près du carquois |
| < -75 | Vise sans tirer (sommation visuelle), alerte Garde par sifflet |

### 5.2 Raid bandits sur ville (Mode Crise)

- Trigger : `RaidOnVillage`
- Action :
  - Si poste muraille : `Combat.Engage.Ranged` immédiat, tir en cadence, focus leaders ennemis
  - Si patrouille : monte sur point élevé proche puis tire
  - Coordonne tirs (Capitaine d'arc) — ralliement
- MBTI : INTJ analyse position et tire en stratège ; ISTP geste précis sans verbaliser ; INTP cible analytique

### 5.3 Joueur tente de couper la file d'attente au tournoi

- ISTP regard méprisant silencieux ; INTP commentaire technique ("Votre cadence est déplorable") ; INTJ ignore
- Pas d'agression — Archers méprisent les conflits inutiles

### 5.4 Créature volante repérée

- Niche exclusive Archer — gain Reconnaissance forte si abattu
- Quête potentielle générée pour joueur Archer collaborateur (§6 source)

### 5.5 Encerclement par mêlée (court-circuit P0)

- L'Archer fuit la mêlée immédiatement, abandonne poste de tir si nécessaire
- Cherche position élevée à 30m+
- Si encerclement total (impossible de fuir) : ISTP peut tirer dague (Vigueur 50+), INTP/INTJ fuient panique

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Archer |
|------------|-------------------|
| **I** (Introverti) | **Métier dominé par I** — concentration, peu de discours, geste solitaire |
| **E** (Extraverti) | **Rare** — Archer extraverti peu efficace en concentration |
| **N** (Intuition) | INTJ stratège embuscade, INTP analyse trajectoires |
| **S** (Sensation) | ISTP geste pur, instinct |
| **F** (Sentiment) | **Très rare** — empathie nuit au tir |
| **T** (Pensée) | **Métier dominé par T** — calcul, distance, vent |
| **J** (Jugement) | INTJ planification, calendrier d'entraînement strict |
| **P** (Perception) | ISTP/INTP improvisation, lecture continue du vent |

**Triplet typique** :
- **INTP** : Archer-théoricien — école d'arc, mentor.
- **ISTP** : Archer-virtuose — geste pur, instinct, archer-chasseur.
- **INTJ** : Archer-stratège — embuscade, sniper diplomatique.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟢 **Vert** par défaut.
- 🔴 **Rouge** : Archer-bandit (cf §8 source) — détrousse caravanes, vise et fuit.

**Reconnaissance** (§9 source) :
- Forte interne garnison ou faction servie.
- **Renom** : monte vite via tournois — Archer Maître peut tirer revenu durable célébrité (cf [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE).

**Factions** :
- **Politiques** : Archer de muraille royale.
- **Religieuses** : Archer-prêtre (rare — cultes spécifiques).
- **Commerciales** : Archer-escorte privée des consortiums.

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque cité fortifiée : 1 Capitaine d'arc nommé + 5-15 archers de muraille.
- Templates alternatifs par Ère (§14 5%) :
  - Ère Voile : `Archer_Embuscade_Variant` — patrouille nocturne, furtivité +50%.
  - Ère Vent : flèches voyageuses bonifiées, Maître Archer peut produire arcs Légendaires.

**NPC↔NPC (§19)** :
- **Scène scriptée Tournoi de tir** : 5-15 archers + spectateurs PNJ — événement festivité 30-60 min réel.
- **Scène scriptée Entraînement matinal** : 3-5 archers au stand — coordination silencieuse.
- Croisement avec Soldat (rivalité §7 source — méprisé "à l'arrière").
- Croisement avec Mage de Voie offensive (concurrence DPS distance — §7 source).

**Lifecycle (§18)** :
- Capitaine d'arc nommé : mort permanente, succession scriptée (premier sergent d'arc promu).
- Archer standard : succession transparente (pool §9).
- Œuvre signée Maître ("Pluie d'argent" tir signature) : peut être codifiée par Scribe → survit Souffles (§10 Héritage).

**Cross-références** :
- [[03 - Mécaniques/Métiers/Sécurité/Archer]] — métier joueur source
- [[03 - Mécaniques/Items/Archétypes/Arc]] — équipement
- [[03 - Mécaniques/Items/Archétypes/Flèche]] — variantes flèches
- [[03 - Mécaniques/Métiers/Sécurité/Soldat]] — rivalité corps lourd
- [[03 - Mécaniques/Métiers/Sécurité/Garde]] — coordination muraille
- [[03 - Mécaniques/Métiers/Sécurité/Espion]] — frontière sniper diplomatique
- [[03 - Mécaniques/Combat]] — mécaniques tir
- [[Actions Situationnelles]] §5.2 (raid), §5.4 (météo affectant tir)
- [[Concepts Fondamentaux IA PNJ]] §2 perception veilleur, §6 MBTI, §16 Combat AI

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
