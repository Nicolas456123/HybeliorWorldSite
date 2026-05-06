---
tags: [pnj, comportement, métier, soldat, sécurité]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Sécurité/Soldat]]
mbti_typique: [ESTJ, ISTJ, ESTP]
karma_typique: vert
factions_compatibles: [Politiques, Religieuses]
needs_review_for: [calibration-playtest]
---

# ⚔️ Template comportement PNJ — Soldat

> Template de comportement IA d'un PNJ **Soldat**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Sécurité/Soldat]].
>
> **Particularité** : combat **mobile** (campagnes, frontières, batailles rangées). Hiérarchie pyramidale, déplacements longs, **coordination d'unités**. Mode Crise = **attaque collective** — le Soldat charge en formation, ne tient pas un poste comme un Garde. Cycle quotidien dépend du **contexte** (caserne en paix, campement de campagne, bataille en cours).

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Routine** (caserne / campement) + **Mode Crise mobile** (`Combat.Engage.Formation`) | **Mode Quête** (donneur missions militaires), **Mode Religieux** (Soldat-frère), **Mode Festivité** (revue, victoire), **Mode Deuil** (frère d'arme tombé) | **Mode Marchand** ❌ |

**MBTI typiques** :
- **ESTJ** (Directeur) : Capitaine d'unité — coordonne, applique tactique, archétype officier.
- **ISTJ** (Logisticien) : Soldat-vétéran fiable, discipline parfaite, archétype piquier de ligne.
- **ESTP** (Entrepreneur) : Soldat audacieux pragmatique — esprit corps lourd, charge directe, peut basculer Mercenaire en démobilisation.

**Karma typique** : 🟢 **vert**. Tuer hors mandat (kills NC sur civils) bascule jaune ou rouge — passible de cour martiale immédiate (cf §8 source). Pillage en campagne **gris** (toléré ou puni selon discipline du corps).

**Catégorie population (§9)** : **Mixte** — Généraux nommés sont **persistants nommés** (lore), Capitaines/officiers sont **persistants familles génération**, soldats de ligne anonymes sont **transients** (pool de combattants pour batailles).

---

## 2. Cycle quotidien (3 contextes)

### Contexte A — Caserne en paix

```
[06:00] Réveil au son du clairon
   ↓
[06:30] Rassemblement, appel
   ↓
[07:00–11:00] Entraînement collectif (formation, marche, manœuvres)
   ↓
[11:00–12:00] Inspection armes/armure (entretien)
   ↓
[12:00–13:00] Repas collectif au mess
   ↓
[13:00–17:00] Suite entraînement OU corvées de caserne OU tour de garde
   ↓
[17:00–19:00] Détente caserne, jeux, écriture famille (les lettres)
   ↓
[19:00] Repas du soir
   ↓
[20:00–22:00] Loisir caserne — taverne attenante, camaraderie
   ↓
[22:00] Couvre-feu, dormir
```

### Contexte B — Campement de campagne

```
[05:00] Réveil — clairon précoce
   ↓
[06:00] Marche forcée (cumul `Maîtrise_Survie_<Climat>`)
   ↓
[Variable selon stratégie : marche, montage camp, escarmouche]
   ↓
[Soir] Montage camp, repas frugal
   ↓
[Tour de garde rotatif nuit]
```

### Contexte C — Bataille en cours

```
[Mode Crise mobile actif — voir §3]
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 06:00 caserne / 05:00 campagne | ESTJ strict |
| `work_start` | 06:30 | |
| `work_end` | 19:00 | Officier : 21:00 (briefing soir) |
| `weekend_pattern` | `aucun` (rotation) | |
| `leisure_preference` | `taverne` (camaraderie) | ESTP : `taverne` ; ISTJ : `lecture` ; ESTJ : `social` |
| `workplace_location` | Caserne / camp / champ de bataille | Mobile |
| `home_location` | Caserne | Officier : logement officiel ; vétéran : cantonnement |
| `mastery_level` | `Initié` | Novice → Maître (Général) |
| `arme_principale` | `lance` (piquier), `épée+bouclier` (légionnaire), `hache` (corps lourd) | Selon corps |
| `corps_assigné` | enum : piquier / légionnaire / hache / archer-soldat | Détermine sous-arbre Combat |

---

## 3. Modes contextuels actifs

### Mode Routine (caserne / campement)

Sous-mode **`Routine.EntrainementCollectif`** :
- Action : formation, marche cadencée, manœuvres simples → complexes selon palier
- Cumul `Maîtrise_Formation` (§3 source — bonus collectif quand soldats coordonnés)
- ESTJ pilote ; ISTJ exécute ; ESTP rush les exercices

Sous-mode **`Routine.MarcheCampagne`** :
- Action : marche forcée, drainer Stamina sur trajet long sans se rompre (§3 source compétence)
- Cumul `Maîtrise_Survie_<Climat>`
- Cohésion d'unité maintenue par chant et cadence

Sous-mode **`Routine.MontageCamp`** :
- Action : pose tente, feu, palissades temporaires
- Tour de garde rotatif nuit

### Mode Crise mobile (Combat.Engage.Formation — caractéristique)

> **Pattern Mode Crise spécifique Soldat** : **attaque en formation collective**, jamais isolé. Discipline d'unité prioritaire. Tient sa ligne.

- Trigger : `RaidOnVillage` (urbain), `EnemyEngagedInBattle` (campagne), ordre du Capitaine
- Branche BT : sous-arbre `BT_NPCSoldatCombat` (variant `BT_NPCCombat` collectif)
  - **Phase 1 — Formation** : se met en place selon corps (piquier, légionnaire), `Maîtrise_Formation`
  - **Phase 2 — `Combat.Engage.Formation`** : avance coordonnée, frappe selon arme (cf §3 source compétences)
  - **Phase 3 — `Combat.Hold.Line`** : "Tenir une ligne" face à charge ennemie (§3 source) — clé en bataille rangée
  - **Phase 4 — `Combat.Breach`** : "Brèche et assaut" — pénétration de défense ennemie
- Tactiques palier élevé (Adepte+) : "Manœuvre de siège" (poser béliers, échelles — Architecte/Menuisier en soutien, §3 source)
- Suit le Chevalier en charge (cf [[03 - Mécaniques/Métiers/Sécurité/Chevalier]] §1 — "Soldat **suit** le Chevalier en charge")
- Saturation Peur ≥ 80 : ESTJ tente repli ordonné ; ISTJ tient par discipline (T+J amplitude rep ×1.2) ; ESTP charge en avant (instinct corps lourd)
- Saturation Colère ≥ 90 chez T : court-circuit `Combat.Defense` agressive (§4 source)
- Cas désertion : très rare, déclenche événement narratif (cour martiale)
- Tag GAS `Combat.State.Disciplined` ajouté

### Mode Quête (donneur ou exécutant)

- Donneur (officiers seulement) : missions militaires, escorte de convoi, défense de poste
- Exécutant : engagement régimentaire, campagne de saison (1-2 ères), bataille rangée, siège
- Sous-mode `Quête.GarnisonGuilde` : Adepte+ peut louer ses services à guilde ([[03 - Mécaniques/Guildes]])

### Mode Religieux (Soldat-frère)

- Variante ordre religieux militaire (cf §1 source — Soldat-frère mêle Soldat et Foi)
- Combine `Maîtrise_Foi_<Religion>` + `Maîtrise_Formation`
- Sabbat respecté en caserne, prières collectives avant bataille

### Mode Festivité

- Trigger : revue, victoire militaire, fête nationale
- Comportement : participe en formation cérémoniale ; Mode Festivité assoupli après revue
- Banquet de victoire — Mode Festivité dominant pour ESTP (audacieux), ESTJ pilote protocole

### Mode Deuil

- Mort d'un frère d'armes : Mode Deuil 7-14j, mood baseline -10
- Funérailles militaires (§19 NPC↔NPC)
- ISTJ : durée standard, F rare ×1.5

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **CommanderOrderEngage** | Court-circuit (suit hiérarchie) → `Combat.Engage.Formation` immédiat | §5 graphe boss |
| **EnemyChargesPosition** | `Combat.Hold.Line` activé — tient ligne face charge | §3 source compétence |
| **AlliedSoldierFalls** (frère d'armes tombé) | `Memory.Public.AllyFallen` weight 60 → mood Colère +30 → Combat plus agressif | §3 mémoire |
| **EraEffroiOuGuerreFactions** | Pic de recrutement (§8 source) — Routine entraînement intensifié | §14 |
| **EraLumineuse** | Démobilisations massives — Soldat libre devient Mercenaire (§8 source) | §14 |
| **SiegeDeclared** | Active `Combat.Siege` — manœuvres machines, échelles, ouvre voie de Brèche | §6 source, [[03 - Mécaniques/Guildes]] §sièges |
| **DeserterDetected** (rare interne) | Trigger événement narratif cour martiale | §8 source discipline |
| **PlayerKarmaRedAttacksGarrison** | `Combat.Engage` immédiat collectif | §7, [[03 - Mécaniques/PvP]] |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur veut s'engager dans régiment

- Trigger : sergent recruteur sur place d'armes (§10 source)
- Sous-mode `Dialogue.Recrutement` — questions sur Vigueur, Endurance, Maîtrises armes
- Si rep ≥ +25 : engagement immédiat
- Si rep neutre : test physique éventuel
- Si rep < 0 : refus

### 5.2 Bataille rangée

- Trigger : `EnemyEngagedInBattle`
- Action : formation immédiate selon corps, `Combat.Engage.Formation`
- Coordination Capitaine (ESTJ canonique)
- Rivalité Soldat vs Chevalier visible : Soldat suit, Chevalier mène

### 5.3 Siège (assaut ou défense)

- Sous-mode `Combat.Siege` (§6 source)
- Soldats portent échelles, béliers (Architecte/Menuisier en soutien)
- Si défense : tient brèches, recharge volontaires

### 5.4 Démobilisation (Ère lumineuse)

- Trigger : `EraLumineuse` + `loyalty_score` faction baisse
- Action : retour caserne, salaire suspendu, certains deviennent Mercenaires (§7 source)
- Mood baseline -10 pendant transition

### 5.5 Soldat-frère religieux face à profanation lieu sacré

- Court-circuit P1 → `Combat.Defense` doctrinale
- Cumul `Maîtrise_Foi_<Religion>` — engagement combat motivé doctrinalement
- Colère +30 mood

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Soldat |
|------------|-------------------|
| **I** (Introverti) | ISTJ canonique — discipline silencieuse, vétéran fiable |
| **E** (Extraverti) | ESTJ Capitaine — coordination active, voix qui porte |
| **N** (Intuition) | **Rare** — Soldat tactique vision longue plus rare que stratège ESTJ |
| **S** (Sensation) | **Métier dominé par S** — ordre concret, exécution directe |
| **F** (Sentiment) | **Rare** — ISFJ peut convenir Soldat-frère religieux dévot |
| **T** (Pensée) | **Métier dominé par T** — discipline, ordre, calcul |
| **J** (Jugement) | **Métier dominé par J** — hiérarchie, calendrier, formation |
| **P** (Perception) | ESTP improvise — Soldat charge audacieuse, peut basculer Mercenaire |

**Triplet typique** :
- **ESTJ** : Capitaine — coordonne unité, archétype officier.
- **ISTJ** : Vétéran fiable — piquier de ligne, discipline parfaite.
- **ESTP** : Soldat audacieux — corps lourd, charge directe.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟢 **Vert** par défaut.
- 🟡 / 🔴 si kills NC hors mandat (cf §8 source) — cour martiale immédiate.
- Pillage en campagne **gris** — toléré ou puni selon discipline.

**Reconnaissance** (§9 source) :
- Forte interne au régiment et à la nation servie.
- **Renom** public : Général Maître ayant gagné bataille marquante peut entrer dans les chants — Renom durable, chanté par les Bardes.
- Cf [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE.

**Factions** :
- **Politiques** : armée régulière, Soldat archétypal.
- **Religieuses** : Soldat-frère, Soldat-paladin (combiné [[03 - Mécaniques/Métiers/Sécurité/Chevalier]] selon ordres).
- **Commerciales** : très rare (consortiums préfèrent Mercenaires) — cf §8 source.

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque grande nation : 1 Général nommé + 5-15 Capitaines/officiers authored + transients pool pour batailles.
- Templates alternatifs par Ère (§14 5%) :
  - Ère Effroi / guerre : `Soldat_Mobilisation_Variant` — recrutement intensifié, batailles fréquentes
  - Ère lumineuse : `Soldat_Démobilisation_Variant` — peut basculer Mercenaire libre
  - Ère Voile : opérations clandestines, soldats déguisés en patrouilles civiles

**NPC↔NPC (§19)** :
- **Scène scriptée Bataille rangée** : 50-200 Soldats + Chevaliers + Archers — événement majeur, plusieurs minutes
- **Scène scriptée Inspection caserne** : Capitaine + 8-12 soldats — exercice de discipline
- **Scène scriptée Funérailles militaires** : confrérie + famille — Mode Deuil collectif
- Croisement avec Chevalier (Soldat suit, Chevalier mène — §1 source)
- Croisement avec Garde (rivalité §7 source — "qui est vrai militaire ?")
- Croisement avec Archer (rivalité §7 source méprisé "à l'arrière")

**Lifecycle (§18)** :
- Général nommé : mort permanente, succession scriptée par promotion Major.
- Capitaine : succession ~7j gameplay (§9 source).
- Soldat de ligne : pool §9 — respawn rapide (les transients sont régénérés).
- Œuvre signée Maître ("Une bataille gagnée chronique", §6 source) : codifiée par Scribe → survit Souffles (§10 Héritage).
- **Population.Catastrophe** si défaite massive (>30% morts) : Mode Deuil collectif 14j (§5.7 [[Actions Situationnelles]]).

**Cross-références** :
- [[03 - Mécaniques/Métiers/Sécurité/Soldat]] — métier joueur source
- [[03 - Mécaniques/Métiers/Sécurité/Garde]] — frontière mobile/statique
- [[03 - Mécaniques/Métiers/Sécurité/Chevalier]] — Soldat suit, Chevalier mène
- [[03 - Mécaniques/Métiers/Sécurité/Archer]] — coordination distance
- [[03 - Mécaniques/Métiers/Soin/Médecin]] — premiers secours militaires (§3 source)
- [[03 - Mécaniques/Combat]] — mécaniques formation
- [[03 - Mécaniques/PvP]] — guerres de factions
- [[03 - Mécaniques/Guildes]] — sièges, garnisons
- [[03 - Mécaniques/Factions]] — armée régulière
- [[Actions Situationnelles]] §5.2.1 (raid majeur), §5.2 (Soldats engagent)
- [[Concepts Fondamentaux IA PNJ]] §6 MBTI, §16 Combat AI collectif, §18 Lifecycle catastrophe

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
