---
tags: [implementation, npc, ai, behavior, balance, dialogue]
status: drafted
last_review: 2026-05-07
needs_review_for: [taux-spawn-playtest, balance-marchands, mémoire-pnj]
type: implementation
canonical_concept: "[[PNJ]]"
---

# NPC Spec — Implémentation

> Page d'implémentation technique du concept narratif **[[PNJ]]**.
> Cette page contient les **chiffres, formules, règles de balance et specs de comportement** des PNJ.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[PNJ]].
>
> Pour l'architecture composant `UHWNPCComponent` brute : voir [[NPC System]].
> Pour l'IA partagée avec les entités hostiles : voir [[AI Controller]] et [[AI Blueprints]].

---

## 1. Archétypes — règles de comportement

Chaque PNJ instancié reçoit un **archétype canonique** qui détermine son template comportemental. L'archétype se combine avec sa **personnalité MBTI** (cf. [[NPC System]]) pour produire le comportement final.

| Archétype | Tag | Mobilité | Rayon de vie | Réactivité Ère | Présence dialogue |
|---|---|---|---|---|---|
| Artisan | `NPC.Archetype.Artisan` | Sédentaire | 30-80 m autour de l'atelier | Faible | Élevée |
| Marchand | `NPC.Archetype.Merchant` | Sédentaire ou caravanier | 50 m (étal) ou route | Élevée (stocks) | Élevée |
| Pèlerin | `NPC.Archetype.Pilgrim` | Itinérant | route inter-régions | Très élevée | Moyenne |
| Scribe | `NPC.Archetype.Scribe` | Sédentaire | 20-50 m | Élevée (rumeurs) | Élevée |
| Mendiant | `NPC.Archetype.Beggar` | Faible mobilité | 100 m d'un lieu fréquenté | Moyenne | Variable |
| Ermite | `NPC.Archetype.Hermit` | Très sédentaire | 200 m d'un sanctuaire/grotte | Faible | Faible |
| Notable | `NPC.Archetype.Noble` | Sédentaire (résidence) | 50 m | Élevée (politique) | Conditionnée |
| Garde | `NPC.Archetype.Guard` | Patrouille | 150-400 m (route définie) | Faible | Faible |
| Soldat | `NPC.Archetype.Soldier` | Cantonnement / patrouille | 200 m caserne, sortie possible | Moyenne | Faible |
| Voyageur | `NPC.Archetype.Traveler` | Très mobile | continent | Moyenne | Moyenne |
| Conteur | `NPC.Archetype.Storyteller` | Sédentaire (taverne) | 30 m | Très élevée | Très élevée |
| Présence muette | `NPC.Archetype.Silent` | Variable | variable | Aucune | Nulle (pas de dialogue) |

> Les archétypes alimentent le `UHWNPCComponent::ArchetypeTag` (à ajouter) et conditionnent le pick de `DefaultDialogue` et `ConditionalDialogues` lors de la génération.

---

## 2. Densité et taux de spawn

Un lieu habité (cf. catégories de lieux dans [[PNJ]]) instancie un nombre de PNJ borné par sa taille et son rang.

| Catégorie de lieu | PNJ actifs simultanés | Pool total disponible |
|---|---|---|
| Hameau | 8 à 15 | 25 |
| Village | 20 à 40 | 80 |
| Ville | 60 à 120 | 250 |
| Capitale | 150 à 300 | 600 |
| Forteresse | 30 à 70 | 120 |
| Sanctuaire | 5 à 15 | 30 |
| Camp nomade | 10 à 25 | 40 |
| Cité sous-marine | 40 à 100 | 200 |

**Distribution archétypale par défaut (% du pool actif d'un village)** :

| Archétype | % typique | % min | % max |
|---|---|---|---|
| Artisan | 25 | 15 | 35 |
| Marchand | 10 | 5 | 20 |
| Garde | 10 | 5 | 25 |
| Notable | 3 | 1 | 8 |
| Mendiant | 4 | 0 | 12 |
| Ermite | 1 | 0 | 5 |
| Scribe | 3 | 1 | 8 |
| Pèlerin (de passage) | 5 | 0 | 15 |
| Voyageur (de passage) | 5 | 0 | 15 |
| Conteur | 2 | 0 | 5 |
| Présence muette | 8 | 3 | 20 |
| Habitant ordinaire (sans archétype dominant) | 24 | 10 | 40 |

> Pool géré par [[Entity Pool Manager]] ; spawn déclenché par [[Entity Spawner]] selon la proximité joueur.

**Bornes système** :
- Distance d'activation PNJ : **80 m** (rayon de la sphère de detection)
- Distance de désactivation : **120 m** (hystérésis)
- Tick de mise à jour rumeurs/humeur : **toutes les 30 s**
- Persistance d'un PNJ unique (rang Rare+) hors zone joueur : **persistant côté serveur** (pas pooled)

---

## 3. Mémoire de PNJ

Chaque PNJ persiste un **MemoryRecord** par joueur rencontré. Stockée serveur, sérialisée par `FNPCMemoryRecord`.

| Champ | Type | Description |
|---|---|---|
| `PlayerID` | FGuid | Identifiant joueur |
| `LastSeenEra` | int32 | Index d'Ère lors de la dernière rencontre |
| `InteractionCount` | int32 | Nombre total d'interactions |
| `LastInteractionTimestamp` | int64 | Timestamp serveur |
| `Affinity` | float | -1.0 (hostile) à +1.0 (proche). Init à 0. |
| `KnownTitles` | TArray<FGameplayTag> | Titres du joueur reconnus par le PNJ |
| `MemoryFlags` | TArray<FGameplayTag> | Souvenirs spécifiques (ex: `NPC.Memory.SavedFromBandits`) |

**Règles de mémoire** :

| Événement | Effet sur Affinity | Pose un MemoryFlag |
|---|---|---|
| Première rencontre dialogue | +0.05 | `NPC.Memory.FirstMet` |
| Don d'objet (selon valeur) | +0.05 à +0.30 | — |
| Service rendu (quête PNJ) | +0.20 | `NPC.Memory.QuestCompleted.<TagQuest>` |
| Sauvetage (le joueur a évité sa mort) | +0.40 | `NPC.Memory.SavedLife` |
| Vol (réussite) | -0.30 | `NPC.Memory.Stolen` |
| Agression non létale | -0.50 | `NPC.Memory.Assaulted` |
| Trahison (quête PNJ ratée volontairement) | -0.40 | `NPC.Memory.Betrayed` |

**Décroissance** : l'`Affinity` dérive de **5% par mois réel** vers 0 (l'oubli). Les `MemoryFlags` ne s'effacent **jamais** sauf sur Souffle Cardinal.

**Reconnaissance** : alimente la **Reconnaissance** côté joueur ; cf. [[L'Accord]] §Reconnaissance pour le côté joueur. Un `Affinity > 0.5` débloque les dialogues conditionnés `NPC.Dialogue.Trusted`.

---

## 4. Dialogues — règles de génération

### 4.1 Pool de dialogues par archétype

Chaque PNJ pioche dans plusieurs pools :

| Pool | Source | Nombre de lignes typique |
|---|---|---|
| Salutation par archétype | `DT_Greetings_<Archetype>` | 8 à 15 |
| Variantes selon humeur | `DT_Mood_<Mood>` | 4 à 8 |
| Rumeurs d'Ère | généré IA, biaisé `EraConfig` (cf. [[Souffle System]]) | 3 à 6 par cycle |
| Réplique de reconnaissance | `DT_RecognitionLines` | 6 à 10 |
| Dialogue conditionnel (quête, faction, mémoire) | `ConditionalDialogues` (TMap) | dépend du PNJ |
| Silence / mime | `DT_SilentReactions` | 4 à 8 (animations) |

### 4.2 Sélection à l'interaction

```
1. Lire NPCMemoryRecord(PlayerID)
2. Si KnownTitles ou MemoryFlags → injection dans LineContext
3. Si Affinity > 0.5 → priorité au pool DT_RecognitionLines
4. Sinon → DT_Greetings_<Archetype> + variante DT_Mood_<CurrentMood>
5. ConditionalDialogues : parcourus dans l'ordre TArray (pas TMap — corrige l'incohérence relevée dans [[NPC System]])
6. Première condition IsUnlocked() → dialogue retourné
7. Sinon → fallback DefaultDialogue
8. Si Archetype == Silent → retourne FX d'animation, pas de texte
```

### 4.3 Humeur dynamique

L'humeur d'un PNJ varie selon trois facteurs :

| Facteur | Poids | Source |
|---|---|---|
| Ère courante | 50% | `EraConfig.Mood` (cf. [[Souffle System]]) |
| Personnalité MBTI | 30% | `NPCPersonality` |
| Événements locaux récents (24 h serveur) | 20% | `LocalEventLog` régional |

Moods canoniques : `Joyful`, `Serene`, `Anxious`, `Bitter`, `Grieving`, `Excited`, `Suspicious`, `Resigned`, `Devout`.

---

## 5. Réactions à l'Ère

Lorsqu'un Souffle se déclenche (cf. [[Souffle System]]), chaque PNJ applique une réaction selon son archétype.

| Archétype | Réaction au Souffle |
|---|---|
| Artisan | Change de recette dominante. Pool dialogue rumeurs +30% pendant 1 sem. |
| Marchand | Stock recomposé selon `EraConfig.DominantForce`. Prix ajustés (cf. §6). |
| Pèlerin | Migre vers le sanctuaire correspondant à la nouvelle dominante. |
| Scribe | Génère 2-3 nouvelles rumeurs régionales sous 48 h serveur. |
| Mendiant | Mood biaisé vers `Anxious` ou `Grieving` pendant 1 sem. |
| Ermite | Aucune réaction visible. Dialogue gagne 1 ligne d'augure cryptique. |
| Notable | Discours politiques mis à jour selon nouvelle Ère. |
| Garde / Soldat | Aucune réaction comportementale. Patrouilles inchangées. |
| Voyageur | Repart sur les routes 24-72 h après Souffle. |
| Conteur | Nouveau récit débloqué (`DT_Tale_<EraN>`). |
| Présence muette | Aucune réaction. |

**Signes faibles pré-Souffle** : pendant la phase signes faibles (cf. [[Souffle System]]), 5-15% des PNJ d'archétype Scribe / Pèlerin / Conteur / Ermite reçoivent une **ligne de rêve** insérée dans leur pool de salutation. Détectable par les joueurs attentifs (cf. [[Prédiction]]).

---

## 6. Balance économique des PNJ marchands

### 6.1 Catégories de marchands

| Catégorie | Capital init | Inventaire (slots) | Refresh stock | Marge |
|---|---|---|---|---|
| Étalier (légumes, pain) | 50 éclats | 8 | 6 h | 5-15% |
| Marchand établi (artisan-revendeur) | 500 éclats | 20 | 12 h | 10-25% |
| Grand Marchand (rang Rare) | 5 000 éclats | 50 | 24 h | 15-30% |
| Marchand caravanier | 2 000 éclats | 30 (rotatif) | déplacement | 20-40% |
| Marchand exotique (rang Épique) | 20 000 éclats | 80 | 48 h, items rares | 25-50% |

### 6.2 Modulation par Ère

```
PrixFinal = PrixBase × (1 + (DemandeEre - 0.5) × 0.4) × (1 - Affinity × 0.15)
```

- `DemandeEre` ∈ [0, 1] : demande pour la catégorie d'item dans l'Ère courante (de `EraConfig.EconomyBias`)
- `Affinity` : MemoryRecord du joueur pour ce marchand (max -15% prix si Affinity = 1.0)

**Bornes** : prix final ∈ [50%, 200%] du prix base.

### 6.3 Détection vol et conséquences

| Événement | Effet |
|---|---|
| Vol détecté en flagrant | `Affinity = -1.0`, refus de vente 30 jours réels, alerte gardes voisins |
| Vol détecté différé (inventaire constaté) | `Affinity -= 0.5`, dialogue accusatoire au prochain rencontre |
| Vol non détecté | rien (mais flag `NPC.Memory.Stolen.Suspicion` à 30%) |

---

## 7. IA combat (PNJ non hostiles passant en combat)

La majorité des PNJ ne combattent pas. Ceux qui le font (Garde, Soldat, certains Notables, certains Marchands armés) utilisent l'IA combat partagée avec les entités via [[AI Controller]] et [[AI Blueprints]] (`BT_EnemyBase`).

### 7.1 Trigger combat pour PNJ

| PNJ touché par | Comportement face au danger | Action |
|---|---|---|
| Garde / Soldat | Courageux | Engage, alerte radio (50 m), `BT_EnemyBase` |
| Notable armé | Courageux ou Reste calme | Engage si `Affinity` joueur < 0, sinon fuit |
| Artisan | selon MBTI (cf. [[NPC System]]) | Fuite par défaut, paralysé si ISFJ/ESFJ, attaque si ESTP |
| Marchand | Se défend un peu | Riposte 1-2 coups puis fuit |
| Pèlerin / Ermite | Ne se défend pas | Fuite ou paralysie |
| Mendiant | Prend la fuite | Fuite immédiate |

### 7.2 Stats combat PNJ (par rang)

| Rang | HP | DPS | Niveau IA |
|---|---|---|---|
| Commun (non militaire) | 40 | 5 | basique (fuite) |
| Commun (militaire) | 200 | 35 | `BT_EnemyBase` |
| Rare (militaire) | 600 | 90 | `BT_EnemyBase` + abilities supplémentaires |
| Épique | 2 500 | 300 | BT custom + 2-4 GA |
| Légendaire | 12 000 | 1 200 | BT scripté évent |

### 7.3 Alerte de zone

Quand un PNJ militaire engage, il broadcast `NPC.Combat.Alert` dans un rayon de **50 m** :
- Tous les PNJ militaires du rayon (Garde, Soldat) basculent en combat avec le même `TargetActor`.
- Tous les PNJ civils du rayon basculent en mode `Flee` pendant **60 s**.
- Le `Affinity` du joueur baisse de **-0.10** sur tous les PNJ témoins (s'il est l'agresseur identifié).

---

## 8. Dépendances système

| Composant | Rôle |
|---|---|
| [[NPC System]] | Composant `UHWNPCComponent` — base technique |
| [[AI Controller]] | Possession IA des PNJ militaires |
| [[AI Blueprints]] | BT/BB partagés entité-PNJ |
| [[Dialogue Component]] | Affichage et flux dialogue côté joueur |
| [[Entity Spawner]] | Spawn PNJ selon proximité |
| [[Entity Pool Manager]] | Pool des PNJ communs |
| [[Souffle System]] | Source de `EraConfig` (mood, économie, rumeurs) |
| [[Quest System]] | Génération quêtes biaisées par archétype |
| [[Migration Accord]] | Recalcul Affinity post-Souffle si nécessaire |
| [[HW Progression Component]] | Lecture conditions joueur (titres, quêtes) |

---

## 9. Points de calibrage à playtester

- [ ] Densité 60-120 PNJ actifs en ville — ressenti "vivant" vs perf
- [ ] Décroissance Affinity 5%/mois — oubli trop rapide ou trop lent ?
- [ ] Prix marge ±40% selon DemandeEre — économie stable ou volatile ?
- [ ] Alerte combat 50 m — débordement réaliste ou frustrant ?
- [ ] Pool DT_Greetings 8-15 lignes par archétype — répétition ressentie ?
- [ ] Lignes de rêve pré-Souffle 5-15% PNJ — détectabilité par joueurs attentifs
- [ ] Reconnaissance dialogue (Affinity > 0.5) — trigger trop facile ou trop difficile ?

---

## 10. Décisions actées

- ✅ 12 archétypes canoniques avec tags `NPC.Archetype.*`
- ✅ MemoryRecord par joueur, persistance serveur, Affinity ∈ [-1, +1]
- ✅ Décroissance Affinity 5%/mois réel, MemoryFlags persistants
- ✅ ConditionalDialogues passé en TArray ordonné (corrige incohérence ordre TMap dans [[NPC System]])
- ✅ Humeur PNJ : 50% Ère + 30% MBTI + 20% événements locaux
- ✅ Marge marchands ±40% modulée par DemandeEre
- ✅ IA combat partagée avec entités via `BT_EnemyBase` pour militaires
- ✅ Alerte combat broadcast 50 m
- ✅ Présence muette (`Silent`) = pas de dialogue, animations seules

---

*Liens narratifs : [[PNJ]] | [[Le Souffle]] | [[L'Accord]] | [[Métiers]]*
*Liens techniques : [[NPC System]] | [[AI Controller]] | [[AI Blueprints]] | [[Dialogue Component]] | [[Entity Spawner]] | [[Souffle System]]*
