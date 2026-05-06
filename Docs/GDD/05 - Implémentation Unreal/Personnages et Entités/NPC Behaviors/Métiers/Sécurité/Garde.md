---
tags: [pnj, comportement, métier, garde, sécurité]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Sécurité/Garde]]
mbti_typique: [ISTJ, ESTJ, ISFJ]
karma_typique: vert
factions_compatibles: [Politiques, Commerciales, Religieuses]
needs_review_for: [calibration-playtest]
---

# 🛡️ Template comportement PNJ — Garde

> Template de comportement IA d'un PNJ **Garde**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Sécurité/Garde]].
>
> **Particularité** : sécurité **statique** (un poste, une enceinte, une personnalité). Le métier de Sécurité **le plus omniprésent** (cf §1 source). PNJ que **tout joueur croise dès l'entrée d'une ville** — premier filtre du karma. Mode Crise = **dégage zone** (priorité immédiate, `Combat.Defense` static — protège poste/enceinte).

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Routine** (poste statique + patrouille courte) + **Mode Dialogue** (filtrage porte) + **Mode Crise** (Combat.Defense) | **Mode Quête** (donneur "traque hors-la-loi"), **Mode Festivité** (présence cérémonie civique), **Mode Religieux** (Garde de temple) | **Mode Marchand** ❌ |

**MBTI typiques** :
- **ISTJ** (Logisticien) : Garde-vétéran fiable, méthodique, archétype canonique du sergent de la porte sud.
- **ESTJ** (Directeur) : Capitaine de garde — coordonne, applique procédures, autorité directe.
- **ISFJ** (Défenseur) : Garde palatiale dévouée, soin de la personnalité protégée, loyauté profonde.

**Karma typique** : 🟢 **vert** strict (cf §8 source — un Garde jaune est révoqué).

**Catégorie population (§9)** : **Mixte** — Capitaines nommés (palier Maître) sont **persistants nommés**, sergents et patrouilleurs **persistants familles génération**, factionnaires anonymes de relais **transients** (générés/repop régulier pool §9).

---

## 2. Cycle quotidien

### Garde de poste statique (porte de cité, palais)

```
[06:00] Réveil caserne
   ↓
[07:00] Prise de poste (relève) — briefing rapide
   ↓
[07:00–13:00] **Quart matin** — poste statique, sommation, filtrage, alerte
   ↓
[13:00–14:00] Pause repas (relève temporaire)
   ↓
[14:00–19:00] **Quart après-midi**
   ↓
[19:00] Fin de service (relève)
   ↓
[19:30–22:00] Loisir caserne — taverne, famille, lecture
   ↓
[22:00] Dormir
```

### Garde patrouilleur

```
[06:00] Réveil caserne
   ↓
[07:00] Briefing + équipement, départ patrouille
   ↓
[07:00–12:00] Ronde sur secteur — détecte anomalies (cf [[03 - Mécaniques/Items/Archétypes/Œil]])
   ↓
[12:00–13:00] Pause caserne ou poste relais
   ↓
[13:00–18:00] Ronde après-midi — quartiers sensibles renforcés
   ↓
[18:00] Retour caserne, rapport
   ↓
[19:00–22:00] Loisir
   ↓
[22:00] Dormir
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 06:00 | ISTJ strict |
| `work_start` | 07:00 | |
| `work_end` | 19:00 | Garde de nuit : cycle inversé |
| `weekend_pattern` | `aucun` | Garde tourne en relais — pas de week-end fixe |
| `leisure_preference` | `taverne` (camaraderie) ou `famille` | ISTJ : `famille` ; ESTJ : `social` ; ISFJ : `famille` |
| `workplace_location` | Poste de garde fixe OU secteur de patrouille | Garde palatial : palais |
| `home_location` | Caserne urbaine | Capitaine : logement officiel |
| `mastery_level` | `Initié` | Novice → Maître (Capitaine) |
| `arme_principale` | `hallebarde` (porte) ou `épée+bouclier` (palais) | `masse+bouclier` (geôle) |
| `profil_perception` | **Humain veilleur** (§2) | Vision jour 50m, audition silence 25m |

---

## 3. Modes contextuels actifs

### Mode Routine (poste statique + patrouille)

Sous-mode **`Routine.PosteStatique`** :
- Action : station debout, animation `idle_garde`, regards latéraux périodiques
- `BBKey_PassiveAwareness` actif — détection passive `Humain veilleur` profil (§2 — 50m vision, 25m audition)
- Dissuasion par Présence (§2 source — cible Présence 50+)
- ISTJ : posture rigide constante ; ESTJ : briefe régulièrement coéquipiers ; ISFJ : attentive à la personnalité protégée

Sous-mode **`Routine.PatrouillerSecteur`** :
- Action : pathfinding cyclique sur waypoints (`Maîtrise_Patrouille`)
- Détecte anomalies, contrôle papiers de passants suspects
- Lanterne nuit (cf §4 source)

Sous-mode **`Routine.FiltrageEntrée`** :
- Trigger : passant à `interaction_distance` du poste de porte
- Action : sommation "Halte !", contrôle papiers/karma, fouille si suspect
- Interaction quasi-quotidienne avec joueurs (cf §3 source)

### Mode Dialogue (filtrage porte + sommation)

Sous-mode **`Dialogue.Sommation`** (rituel pré-action) :
- "Halte !" — première étape, permet de désamorcer (cf §3 source)
- Patience modulée MBTI : ISTJ patient strict ; ESTJ tranchant ; ISFJ courtois mais ferme
- Si joueur ne se conforme pas en 5s : escalade vers Crise

Sous-mode **`Dialogue.ContrôleKarma`** :
- Trigger : joueur entre dans zone de contrôle
- Lookup `rep_effective` (§7) + Karma joueur ([[03 - Mécaniques/PvP]])
- Filtres canoniques :
  - **Vert / Jaune léger** : passe sans problème
  - **Orange** : retient, exige justification, signale supérieur
  - **Rouge / Banni** : refuse l'entrée, alerte renforts (sifflet/corne)

### Mode Crise (Combat.Defense static — caractéristique)

> **Pattern Mode Crise spécifique Garde** : **dégage zone autour du poste**, ne quitte **jamais** le poste sauf relève autorisée. `Combat.Defense` static — protège poste/enceinte/personnalité protégée.

- Trigger : `PlayerArrivesAggressively`, `RaidOnVillage`, `BloodDetectedNearby`, `AllyDirectlyAttacked`, `PlayerKarmaRedOrBlack`
- Branche BT : sous-arbre `BT_NPCGuardCombat` (variant `BT_NPCCombat` static)
  - **Phase 1 — Sommation** : "Halte !" (compétence §3)
  - **Phase 2 — Sifflet alarme** : appelle renforts (cf §4 source équipement)
  - **Phase 3 — `Combat.Engage.Defense`** : tient le poste, frappe défensive de poussée (Vigueur principale)
  - **Phase 4 — `Combat.Hold.Position`** : compétence "Tenir un poste" (§3 source) — résiste plusieurs assaillants à pont/escalier/porte
- **Ne quitte JAMAIS le poste** sauf si `Combat.Pursuit` ordonné par Capitaine OU enceinte tombée
- Court-circuit P1 si allié direct attaqué : `Combat.Defense` immédiat (cf §8 P1)
- Court-circuit P3 si Karma rouge/banni dans zone : `Combat.Engage` immédiat
- Saturation Peur ≥ 80 : ISTJ tient quand même par discipline (T+J amplitude rep ×1.2) ; ISFJ panique vers personnalité protégée (instinct sauvegarde) ; ESTJ tente repli organisé
- Profil **Humain veilleur** (§2) — détection +20m vs civil

### Mode Quête (donneur)

- Enquêtes locales, traque hors-la-loi karma rouge, escortes
- Sous-mode `Quête.ChasseRouge` : Garde donne mandat à joueur Chasseur de primes (cf [[03 - Mécaniques/PvP]] §Karma)
- Sous-mode `Quête.EvasionDeGeole` (Garde de geôle) : empêcher / accompagner évasion scriptée

### Mode Festivité

- Présence cérémonie civique (couronnement, fête)
- Surveillance renforcée — pas d'animation, position d'apparat
- ESTJ pilote la formation cérémoniale

### Mode Religieux (Garde de temple)

- Variantes : Garde de pèlerinage, Garde de temple
- Code de conduite spécifique selon culte (cf §8 source)
- Sabbat respecté — Garde de Lex Petra : tribunal sacré obligatoire

### Mode Deuil

- Mort d'un compagnon de garde tombé en service : Mode Deuil 7-14j, mood baseline -10
- Cotisation à confrérie de Garde (§9 source — mutualisation décès)
- Funérailles avec honneurs (§19 NPC↔NPC)

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **PlayerKarmaRedOrBlackEntersZone** | Court-circuit P3 → `Combat.Engage` immédiat (cf §5.1.5 [[Actions Situationnelles]]) | §7, [[03 - Mécaniques/PvP]] |
| **PlayerHasOpenBounty** | Sommation puis tentative arrestation (Combat non-létal par défaut) | [[03 - Mécaniques/PvP]] §Bounty |
| **PlayerArmDégainée** dans rayon poste | `BBKey_ThreatLevel +30` ; vigilance accrue, main près de l'arme | §2 source |
| **AllyDirectlyAttacked** (autre Garde de l'enceinte) | Court-circuit P1 → `Combat.Defense` immédiat | §8 P1 |
| **SiegeDeclared** | Active `Combat.Hold.Siege` ; coordination Capitaine | §6 source — siège, [[03 - Mécaniques/Guildes]] §sièges |
| **EraVoileEffroi** | Embauches massives, multiplication postes (§8 source) | §14 |
| **ThiefSpotted** (Memory.Public.PlayerStoleLocal) | Engagement immédiat, sifflet, course-poursuite courte | §3 mémoire |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur arrive à porte de cité

| Rep effective + Karma | Réaction |
|------------------------|----------|
| Vert + rep ≥ +25 | Salut respectueux, passage immédiat |
| Vert + rep neutre | Filtrage standard, papiers vérifiés rapidement |
| Jaune léger | Filtrage approfondi, fouille possible |
| Orange | Retient, exige justification, signale supérieur |
| Rouge / Banni | Refus, sifflet alarme, `Combat.Engage` si tentative forçage |

### 5.2 Raid bandits sur ville (Mode Crise)

- Trigger : `RaidOnVillage`
- Action : tient son poste, sifflet alarme, `Combat.Hold.Position`
- ISTJ tient strictement par discipline ; ISFJ tient par devoir face menace ; ESTJ pilote relèves
- Cas spécifique Capitaine : coordonne défense (§6 source — Capitaine de muraille palier Expert)

### 5.3 Tribunal sacré (Garde Lex Petra)

- Trigger : sabbat hebdomadaire
- Action : présence obligatoire (§3.2 [[Actions Situationnelles]] — Religieux > Routine)
- Suspension métier civil pendant créneau

### 5.4 Évasion de geôle

- Trigger : prisonnier tente fuite
- Action : `Combat.Engage.NonLethal` immédiat ; sifflet ; coordination collègues geôliers
- Sous-mode `Quête.EvasionDeGeole` peut être side quest joueur

### 5.5 Joueur insulte Garde / tente couper file

- ISTJ : impassible, formule rappel à l'ordre standard
- ESTJ : tranchant, "Veuillez circuler ou être interpellé"
- ISFJ : ferme mais courtois
- Si insistance : `Combat.NonLethal.Subdue`

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Garde |
|------------|------------------|
| **I** (Introverti) | ISTJ canonique — peu de discours, présence |
| **E** (Extraverti) | ESTJ Capitaine — pilote équipe |
| **N** (Intuition) | **Rare** — Garde S dominant |
| **S** (Sensation) | **Métier dominé par S** — observation concrète, faits |
| **F** (Sentiment) | ISFJ Garde palatiale — devoir affectif |
| **T** (Pensée) | ISTJ/ESTJ — règles, procédures |
| **J** (Jugement) | **Métier dominé par J** — discipline, calendrier, hiérarchie |
| **P** (Perception) | **Inadapté** — Garde flexible = mauvais Garde |

**Triplet typique** :
- **ISTJ** : Sergent fiable — vétéran, méthodique, archétype.
- **ESTJ** : Capitaine — pilote, coordonne, autorité directe.
- **ISFJ** : Garde palatiale — soin de la personnalité protégée, loyauté.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟢 **Vert** strict (cf §8 source — un Garde jaune est révoqué).

**Reconnaissance** (§9 source) :
- Forte au niveau local — Capitaine connu de toute sa cité
- **Renom** modeste sauf actes héroïques (avoir tenu un siège célèbre)
- Cf [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE

**Factions** :
- **Politiques** : Garde urbaine, Garde palatiale royale
- **Religieuses** : Garde de temple, Garde de pèlerinage
- **Commerciales** : Garde d'entrepôt / de comptoir

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque cité majeure : 1 Capitaine de Garde nommé + 5-15 sergents authored + 30+ factionnaires transients.
- Templates alternatifs par Ère (§14 5%) :
  - Ère Voile / Effroi : `Garde_Patrouille_Renforcée_Variant` — patrouilles ×2, couvre-feu
  - Ère lumineuse : routines plus relâchées, Capitaine accessible socialement

**NPC↔NPC (§19)** :
- **Scène scriptée Relève de garde** : 2 Gardes en transition de quart — bref échange, codes
- **Scène scriptée Tribunal** (cf template Juge §8) : Garde + Juge + Avocat + Scribe — escorte
- **Scène scriptée Funérailles d'un Garde tombé** : confrérie locale + famille — Mode Deuil collectif
- Croisement avec Espion (chasseur naturel — §7 source)
- Croisement avec Soldat (rivalité §7 source — "qui est le vrai militaire ?")

**Lifecycle (§18)** :
- Capitaine nommé : mort permanente, succession scriptée (sergent senior promu).
- Sergent : succession ~7j gameplay (§9 source).
- Factionnaire : succession transparente (pool §9).
- Cas mort en service : entrée chronique locale, side quest "Le poste muet" possible.

**Cross-références** :
- [[03 - Mécaniques/Métiers/Sécurité/Garde]] — métier joueur source
- [[03 - Mécaniques/Métiers/Sécurité/Soldat]] — frontière mobile/statique
- [[03 - Mécaniques/Métiers/Sécurité/Chevalier]] — élite vs infrastructure
- [[03 - Mécaniques/Métiers/Sécurité/Espion]] — chasseur des infiltrés
- [[03 - Mécaniques/Métiers/Gouvernance/Juge]] — escorte audience
- [[03 - Mécaniques/Métiers/Gouvernance/Ambassadeur]] — escorte voyage
- [[03 - Mécaniques/PvP]] — filtrage karma
- [[03 - Mécaniques/Guildes]] — sièges, garnisons
- [[03 - Mécaniques/Items/Archétypes/Œil]] — détection
- [[Actions Situationnelles]] §5.1.5 (Karma rouge réaction faction Garde), §5.2 (raid)
- [[Concepts Fondamentaux IA PNJ]] §2 perception veilleur, §6 MBTI, §8 P1+P3 court-circuits

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
