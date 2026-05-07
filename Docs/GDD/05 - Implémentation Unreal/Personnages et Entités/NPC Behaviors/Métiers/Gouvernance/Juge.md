---
tags: [pnj, comportement, métier, juge, gouvernance]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Gouvernance/Juge]]
mbti_typique: [INTJ, ESTJ, ENTJ]
karma_typique: vert
factions_compatibles: [Politiques, Religieuses, Commerciales]
needs_review_for: [calibration-playtest]
---

# ⚖️ Template comportement PNJ — Juge

> Template de comportement IA d'un PNJ **Juge**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Gouvernance/Juge]].
>
> **Particularité** : Mode Marchand **jamais activé** (un Juge ne vend rien). Mode Dialogue très formel, en audience publique. Le PNJ est un **PNJ persistant nommé** (§9), souvent autorité visible d'une cité.

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Routine** + **Mode Religieux** ou **Mode Dialogue** lors d'audiences | **Mode Quête** (donneur de mandat), **Mode Festivité** (cérémonies civiques), **Mode Deuil** (funérailles publiques) | **Mode Marchand** ❌ (pas de transaction privée) |

**MBTI typiques** :
- **INTJ** (Architecte) : Juge stratège, raisonne par jurisprudence longue, peu loquace mais redoutable.
- **ESTJ** (Directeur) : Juge cantonal classique, code en main, calendrier strict, autorité directe.
- **ENTJ** (Commandant) : Grand Juge politique, audience théâtrale, vision d'État.

**Karma typique** : 🟢 **vert**. Un Juge en glissement jaune (corruption détectée par sa faction tutélaire) déclenche un script de **démission narrative** (§18 Lifecycle) — il devient PNJ "ancien Juge" sans pouvoir formel.

**Catégorie population (§9)** : **Persistant nommé authored** — chaque grande cité a son Juge nommé, mort permanente, succession scriptée par side-quest.

---

## 2. Cycle quotidien

```
[06:00] Réveil dans demeure officielle
   ↓
[07:00] Lecture du dossier du jour (Mémoire principale §6 stat)
   ↓
[09:00] Tribunal — entrée en salle d'audience (Mode Dialogue formel)
   ↓
[09:00–12:00] Audiences publiques — verdicts mineurs/majeurs
   ↓
[12:00–13:30] Déjeuner privé (souvent avec Conseiller ou Avocat allié)
   ↓
[13:30–17:00] Délibérations en chambre + rédaction d'attendus (avec Scribe)
   ↓
[17:00–18:00] Audience close OU sortie publique (Mode Dialogue civic)
   ↓
[18:00] Retour demeure officielle
   ↓
[19:00–22:00] Loisir — lecture de codex, discussions familiales, rituel religieux si juge ecclésiastique
   ↓
[22:00] Dormir
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 06:00 | INTJ : 05:30 (planification matinale) |
| `work_start` | 09:00 | (heure d'audience) |
| `work_end` | 18:00 | ESTJ strict ; ENTJ peut tirer jusqu'à 20:00 si grand procès |
| `weekend_pattern` | `prière` ou `lecture` | Juge ecclésiastique : sabbat sacré strict (§13) |
| `leisure_preference` | `lecture` | INTJ : `lecture` ; ESTJ : `famille` ; ENTJ : `social` (banquets diplomatiques) |
| `workplace_location` | Palais de justice / salle d'audience adossée temple | Juge itinérant des frontières : campement temporaire |
| `home_location` | Demeure officielle (logement de fonction §9 Économie) | — |

---

## 3. Modes contextuels actifs

### Mode Dialogue (formel, audience)

Sous-mode **`Audience.Public`** :
- Trigger : heure d'audience + dossier programmé
- Sortie : verdict prononcé OU report à séance suivante
- Animation : assis sur estrade, marteau cérémoniel à portée
- Modulation MBTI : INTJ = silences pesants, peu de questions ; ESTJ = questions précises et tranchées ; ENTJ = harangue théâtrale

Sous-mode **`Audience.HuisClos`** :
- Trigger : affaire sensible (politique, faction-faction)
- Sortie : décision écrite remise au Conseiller ou Garde
- Présence Garde rapprochée obligatoire (§5 graphe `boss` du Garde escorte)

### Mode Religieux (Juge ecclésiastique seulement)

- Trigger : sabbat hebdomadaire OU heure de rituel doctrinal (Lex Petra typiquement)
- Override audiences : ❌ une audience programmée est **suspendue** automatiquement — aucun jugement civil n'a cours en sabbat sacré (cohérent §3.2 tableau compat : Religieux > Dialogue)
- MBTI : J adhère strictement, P peut chercher exception adaptée

### Mode Crise

> Mode peu fréquent pour Juge — il ne combat jamais, mais bascule en branche **`Crisis.Civilian`** (cf [[Actions Situationnelles]] §5.2.1).

- Trigger : `RaidOnVillage` OU `SacredPlaceProfanedNearby` (si cour tenue dans temple)
- Branche BT : `RoutineAdjust.ShelterIndoor` + appel `CalledForGuardEscort`
- Comportement : reste retranché derrière son Garde affecté, **ordonne** plutôt qu'agit
- Saturation Peur ≥ 80 : court-circuit `Combat.Flee` — un Juge n'a pas honte de fuir si attaque ouverte
- Cas spécial **profanation lieu sacré (Juge ecclésiastique)** : court-circuit P1 → `Combat.Defense` doctrinal — le Juge dénonce verbalement, n'engage pas physiquement, mais reste sur place et appelle le Tribunal

### Mode Quête (donneur)

- Le Juge est **donneur de quête** principal pour : enquêtes, traque de hors-la-loi karma rouge ([[03 - Mécaniques/PvP]]), mandats d'arrestation, cas de jurisprudence à trancher.
- Sous-mode `Quête.MandatDélivré` : le Juge "active" un PNJ Garde ou un joueur Chasseur de primes pour exécuter.

### Mode Festivité

- Un Juge participe aux **cérémonies civiques** (couronnement, ouverture de session, fête de la justice). Ne danse pas. ENTJ animera la cérémonie.

### Mode Deuil

- Mort d'un Juge collègue OU d'un dirigeant qu'il servait : `Memory.Public.NamedNPCDied` weight 100 + **suspension** des audiences pendant 3-7 jours gameplay.
- MBTI F (rare pour ce métier) : durée ×1.5.

### Mode Marchand

❌ **Jamais activé**. Un Juge corrompu (script jaune) acceptera un **pot-de-vin** scénarisé hors mode marchand, via dialogue de quête politique (cf §10 Avocat — défense karma).

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **PlayerKarmaRedOrBlackEntersCourtyard** | Mode Dialogue refusé, Garde alertée immédiatement | §7, [[03 - Mécaniques/PvP]] |
| **PlayerHasOpenBounty** | Si rep ≥ +25, propose `BountyAnnulation` (palier Maître seulement) — quête politique | §9 Maître, [[03 - Mécaniques/PvP]] |
| **CorruptionAttempt** (joueur tente pot-de-vin) | INTJ/ESTJ : refus glacial, +25 rep individuelle ; ENTJ : peut accepter conditionnellement (variante jaune scriptée) | §6, §7 |
| **NamedAdvocateApproaches** (Avocat joueur Maître) | Branche dialogue formel, score Acuité +15 (cf §3 compétence "Repérer une contradiction") | [[03 - Mécaniques/Métiers/Gouvernance/Avocat]] |
| **ÈreVoileOuEffroi** | Peines durcies (cf source §8) — modulation paramétrique routine : audiences plus longues, plus de mandats | §14 Souffle |
| **EraSouffleBroadcast** | Recalcul `mood_baseline` ; ENTJ politique peut basculer en variante "Juge de l'Ère" autoritaire | §14 |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur arrive en salle d'audience

| Rep effective | Réaction |
|---------------|----------|
| +75 (allié) | Salut respectueux, accélère son dossier, discount narratif (peine -1 niveau) |
| Neutre | Audience standard, formalisme strict |
| -50 (méfiant) | Audience à charge, peine au plafond du barème |
| < -75 (hostile) | Refuse l'audience, déclare le joueur en outrage, mandat émis |

### 5.2 Procès en cours interrompu (raid bandits sur cité)

- Trigger : `RaidOnVillage`
- Action : interrompt la séance, ordonne au Garde "Évacuez la salle !", se dirige vers `home_location` sécurisée
- MBTI : ENTJ peut tenter rallying speech avant fuite ; INTJ analyse situation 2s puis décide ; ESTJ applique procédure d'évacuation par le livre

### 5.3 Mort d'un Juge collègue

- Trigger : `NamedNPCDeath` (autre Juge)
- Effet : suspension audiences 7j, Mode Deuil, présence aux funérailles
- Quête potentielle générée : "Qui a tué le Juge ?" (§15 Quest Generator)

### 5.4 Profanation lieu sacré (Juge ecclésiastique)

- Court-circuit P1 → `Combat.Defense` doctrinale
- N'engage pas physiquement (pas d'arme), mais : appelle Garde + déclare anathème + mémoire village +100 weight

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Juge |
|------------|----------------|
| **I** (Introverti) | Audience courte, peu de mots, rédige seul ses attendus | 
| **E** (Extraverti) | Audience théâtrale, parole ample, harangue publique |
| **N** (Intuition) | Cite jurisprudence rare, voit les implications longues, INTJ très politique |
| **S** (Sensation) | Tranche selon faits matériels, ESTJ pragmatique strict |
| **F** (Sentiment) | **Rare pour ce métier** — si présent, peines plus douces, +1.3 empathie victimes |
| **T** (Pensée) | Standard — rigueur, distance, rep décalé -5 (sévère) |
| **J** (Jugement) | Rigidité barème, calendrier strict, amplitude rep ×1.2 |
| **P** (Perception) | **Rare et inadapté** — tolère les retards, jugements fluctuants, mal vu par sa faction |

**Triplet typique** :
- **INTJ** : Juge stratège, lit 3 ères d'avance, peu d'audiences mais verdicts marquants.
- **ESTJ** : Juge classique, machine à rendre la justice quotidienne, fiable.
- **ENTJ** : Juge politique, ambition de Haute Cour, harangues publiques.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟢 **Vert** par défaut — Juge intègre, refus rituel des pots-de-vin (cf §3 source).
- 🟡 **Jaune** : variante "Juge corrompu" — script narratif, perd 20% autorité (cf §8 source). Devient PNJ donneur de quêtes troubles.
- 🔴 **Rouge / Noir** : démis automatiquement par sa faction tutélaire (cf §8 source) — n'apparaît qu'en lore comme antagoniste exilé.

**Reconnaissance** (§7) :
- Reconnaissance interne **faction tutélaire** très haute (sinon la charge tombe).
- Reconnaissance publique modérée mais stable.
- Cf. [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE.

**Renom** :
- Un Juge Maître ayant fait jurisprudence apparaît dans classements Renom social. Ouvre invitations diplomatiques mais ne change pas son salaire.

**Factions** :
- **Politiques** : Juge royal, sert le trône, prête serment.
- **Religieuses** : Juge ecclésiastique, droit canon, cumule `Maîtrise_Foi_<Religion>`.
- **Commerciales** : Juge consulaire, contrats et faillites, plus pragmatique.
- **Antagonistes (Catena Fracta)** : pas de Juge officiel — n'apparaît qu'en lore.

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque grande cité a **un Juge nommé** authored. Variants : Grand Juge royal, Juge ecclésiastique, Juge itinérant.
- Templates alternatifs par Ère (§14 5%) :
  - Ère du Voile : `Juge_Inquisiteur_Variant` — peines durcies, audiences à huis clos.
  - Ère lumineuse : `Juge_Amnistie_Variant` — ouverture publique de la cour, allégement des peines.

**NPC↔NPC (§19)** :
- **Scène scriptée Tribunal** : Juge + Avocat + Garde + Scribe (4 PNJ) co-localisés, dialogue scripté (1-3 min réel) lors d'audiences majeures.
- Croisement quotidien avec Conseiller (rivalité §7 source — "résoudre par diplomatie vs trancher par verdict").

**Lifecycle (§18)** :
- Mort permanente. Side quest "L'héritier disparu" générée automatiquement (§15 Quest Generator).
- Successeur narratif : un Avocat senior allié promu, ou un INTJ jeune désigné par la faction.

**Cross-références** :
- [[03 - Mécaniques/Métiers/Gouvernance/Juge]] — métier joueur source
- [[03 - Mécaniques/Métiers/Gouvernance/Avocat]] — Mode Quête plaide devant
- [[03 - Mécaniques/Métiers/Gouvernance/Scribe]] — rédige attendus
- [[03 - Mécaniques/Métiers/Sécurité/Garde]] — escorte
- [[03 - Mécaniques/PvP]] §Karma + §Bounty
- [[Actions Situationnelles]] §5.1 (présence joueur), §5.2 (raid)
- [[Concepts Fondamentaux IA PNJ]] §6 MBTI, §7 Réputation, §13 Religion

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
