---
tags: [pnj, comportement, métier, chevalier, sécurité]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Sécurité/Chevalier]]
mbti_typique: [ESTJ, ENTJ, INFJ]
karma_typique: vert
factions_compatibles: [Politiques, Religieuses]
needs_review_for: [calibration-playtest]
---

# 🛡️ Template comportement PNJ — Chevalier

> Template de comportement IA d'un PNJ **Chevalier**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Sécurité/Chevalier]].
>
> **Particularité** : **élite militaire** — figure morale et martiale simultanément. Mode Crise = **rallie troupes** (charge montée, coordination Soldats), commande l'engagement. Toujours rattaché à un **ordre** avec code d'honneur — l'IA inclut un **filtre du code** avant action (refuser un acte indigne, accepter conséquences). Très scripté autour de duel codifié et tournoi.

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Routine** (entraînement + cérémonie) + **Mode Crise rallying** (`Combat.Charge` + commande) + **Mode Festivité** (tournoi) | **Mode Quête** (donneur ordre), **Mode Religieux** (Chevalier-paladin), **Mode Dialogue** (parlementer, jurer) | **Mode Marchand** ❌ |

**MBTI typiques** :
- **ESTJ** (Directeur) : Chevalier-banneret organisateur — commande compagnie élite, autorité tranchée.
- **ENTJ** (Commandant) : Grand Chevalier / Maître de l'ordre — vision d'ordre, leadership large.
- **INFJ** (Avocat) : Chevalier-paladin idéaliste — code d'honneur poussé, paladin pieux et guerrier d'élite.

**Karma typique** : 🟢 **vert** strict (cf §8 source — toute action codifiée comme indigne entraîne **honte**, mécanique d'ordre, perte de Reconnaissance interne avant même un karma jaune. La perte de titre est **plus lourde que le glissement karmique**).

**Catégorie population (§9)** : **Persistant nommé authored** uniquement. Les Grand Maîtres et Chevaliers nommés (5-10 par grand ordre × ~10 ordres = ~50-100 Chevaliers nommés monde). Pas de transients — un Chevalier sans nom n'est pas un Chevalier (§1 source — "On n'est pas Chevalier de fait, on l'**est** par investiture").

---

## 2. Cycle quotidien

```
[06:00] Réveil — prière matinale (ordres religieux) ou méditation
   ↓
[07:00] Entraînement — lice, entraîneur écuyer, exercices d'armes lourdes
   ↓
[09:00–12:00] Service de l'ordre OU audience à la cour OU patrouille élite
   ↓
[12:00–13:30] Déjeuner — souvent en commanderie / chapitre, communauté de l'ordre
   ↓
[13:30–17:00] Activité selon palier :
   - Adepte/Expert : tournoi local, escorte d'apparat, mission ponctuelle
   - Banneret : commande compagnie élite (entraînement collectif)
   - Maître : conseil de l'ordre, audience royale, plaidoyer politique
   ↓
[17:00–19:00] Sortie publique en armure — visite, cérémonie, audience
   ↓
[19:00–22:00] Loisir — souvent en présence des frères de l'ordre, banquet régulier
   ↓
[22:00] Dormir
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 06:00 | Chevalier-paladin : 05:00 (prière matinale longue) |
| `work_start` | 07:00 (entraînement) | |
| `work_end` | 19:00 | ENTJ Maître : 21:00 si conseil de l'ordre |
| `weekend_pattern` | `prière` ou `social` | INFJ : `prière` ; ESTJ/ENTJ : `social` (banquets ordre) |
| `leisure_preference` | `social` (banquets ordre) | INFJ : `prière` ; ENTJ : `social` ; ESTJ : `famille` |
| `workplace_location` | Maison de l'ordre + lice de tournoi + cour royale ou cathédrale | Variantes |
| `home_location` | Commanderie / château ancestral / aile de palais | — |
| `mastery_level` | `Initié` (adoubé) | Novice (écuyer) → Maître |
| `ordre_attached` | string (nom de l'ordre) | Détermine code d'honneur, rituels, interdits |
| `code_strict_score` | 80 | INFJ : 95 (intransigeant) ; ESTJ : 75 (pragmatique) |

---

## 3. Modes contextuels actifs

### Mode Routine (entraînement + cérémonie)

Sous-mode **`Routine.LiceEntrainement`** :
- Action : entraîne écuyer, exercices lance/épée lourde, animations charges courtes
- Cumul `Maîtrise_Lance_Cavalerie` ou `Maîtrise_Épée_Longue`
- Modulation MBTI : ESTJ programme rigoureux ; ENTJ pousse ses subordonnés ; INFJ pratique méditative

Sous-mode **`Routine.PatrouilleElite`** :
- Action : sortie en compagnie d'écuyer ou subordonnés, à cheval, présence rassurante
- Cumul `Maîtrise_Équitation` (cavalerie lourde quasi-obligatoire, §2 source)

Sous-mode **`Routine.ConseilOrdre`** (palier Expert+) :
- Trigger : convocation chapitre
- Action : participation aux décisions internes (élection Grand Maître, exclusion d'un frère)
- Cohérent §6 source

### Mode Crise rallying (caractéristique — commande)

> **Pattern Mode Crise spécifique Chevalier** : **rallie les troupes**, charge montée, coordonne. Pas de tactique solitaire — le Chevalier mène. **Refus de la fuite** (option mécanique narrative dernier carré, cf §3 source).

- Trigger : `RaidOnVillage`, `EnemyChargesPosition`, `AlliedChevalierFalls`
- Branche BT : sous-arbre `BT_NPCChevalierCombat` (variant `BT_NPCCombat` rallying)
  - **Phase 1 — Aura de commandement** : Soldats alentour gagnent buff Présence × Maîtrise_Code (cf §3 source)
  - **Phase 2 — `Combat.Charge.Cavalerie`** : signature du Chevalier — coût Stamina élevé, dégâts et stagger massifs (§3 source)
  - **Phase 3 — `Combat.Brèche.Élite`** : pénétration de défense par groupe restreint et lourd
  - **Phase 4 — `Combat.HoldRalliement`** : tient ligne avec aura, ne fuit pas
- Cas spécifique **Refus de la fuite** : option de tenir position contre tous (dernier carré) — déclenchable sur `Memory.Public.AllyChevalierFell`, mood Colère +60
- Saturation Peur ≥ 80 : **résistance forte** par MBTI T+J amplitude rep ×1.2 ; INFJ peut basculer en martyre narratif (refuse de fuir, meurt en pose héroïque)
- Saturation Colère ≥ 90 chez T : court-circuit `Combat.Defense` (§4 source)
- Pas d'embuscade — le Chevalier engage **ouvertement** (cf §1 source — "le Chevalier hostile cherche le **duel codifié** plutôt que l'embuscade")
- Tag GAS `Combat.State.Honorable` ajouté

### Mode Festivité (tournoi)

> **Mode Festivité dominant pour Chevalier**.

- Trigger : tournoi annoncé OU ère lumineuse (prestige tournois explose, §8 source)
- Comportement : participe activement, **gain Renom et objets cérémoniels** (§6 source)
- Sous-mode `Festivite.DuelCodifié` : engage adversaire en cérémonie, bonus moral et Reconnaissance si gagne selon règles
- ENTJ pilote organisation ; ESTJ veille protocole ; INFJ moments contemplatifs
- Cf [[Actions Situationnelles]] §5.3 — Mode Festivité

### Mode Quête (donneur d'ordre)

- "Missions d'honneur, défense d'un faible, traque d'un brigand (avec interdiction explicite d'embuscade)" — cf §10 source
- Sous-mode `Quête.AdoubementÉcuyer` (Adepte+) : **adoube** son propre écuyer — peut être joueur écuyer
- Sous-mode `Quête.Serment` : engagement public modifiant jauge Reconnaissance
- Sous-mode `Quête.SiègeHonneur` (Maître) : **déclare un siège codifié** (variante diplomatique du siège [[03 - Mécaniques/Guildes]])

### Mode Dialogue

Sous-mode **`Dialogue.Parlementer`** :
- Avant combat — peut tenter parlement formel selon code (§3 source compétence "Tenue d'honneur")
- INFJ canonique — préfère parlementer si possible

Sous-mode **`Dialogue.Serment`** :
- Engagement solennel à un acte — modifie jauge Reconnaissance d'après respect (§3 source)
- Public, scriptable, cérémoniel

### Mode Religieux (Chevalier-paladin / ordres-temple)

- Variantes ordres-temple — cf §8 source (Ordo Caelum, Ignis Aeternum, Lex Petra notamment se prêtent bien)
- Combine `Maîtrise_Foi_<Religion>` + `Maîtrise_Lance`
- Sabbat respecté strictement — INFJ canonique
- Rituels d'adoubement intégrés (cérémonie publique)

### Mode Deuil

- Mort d'un frère de l'ordre : Mode Deuil 14j, mood baseline -15
- Funérailles cérémoniales (§19 NPC↔NPC) — formation en armure, chants, hommages
- INFJ : durée ×1.5

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **PlayerSeeksAdoubement** (joueur écuyer + rep ≥ +50) | Active `Quête.AdoubementÉcuyer` (palier Adepte+) | §6 source |
| **DuelChallenge** (provocation publique codifiée) | Active `Festivite.DuelCodifié` | §3 source |
| **AssassinDetected** (cf [[03 - Mécaniques/Métiers/Sécurité/Assassin]]) | Mood Colère +40 — antagonisme structurel ; tente engager mais Assassin fuit | §7 source — Chevalier vs Assassin |
| **CodeBroken** (action indigne de l'ordre) | Mécanique d'ordre — **honte**, perte Reconnaissance interne (cf §8 source) | §8 source |
| **EraEffroi** | Multiplication serments-suicide ("dernier carré"), §8 source | §14 |
| **EraLumineuse** | Prestige tournois explose — Mode Festivité dominant | §14 |
| **EraVoile** | Ordres se referment, méfiants — réduction sorties publiques | §14 |
| **GrandMaitreElection** | Sous-mode interne ordre, vote au chapitre (Expert+) | §6 source |
| **AlliedChevalierFalls** | Possibilité activation **Refus de la fuite** (mood Colère +60) | §3 source compétence |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur sollicite adoubement

- Trigger : joueur écuyer atteint pré-requis + rep ≥ +50
- Mode Dialogue + cérémonie scriptée publique
- Adoubement = transition palier Novice → Initié (entrée dans l'ordre)
- INFJ : cérémonie longue, prière ; ESTJ : protocole strict

### 5.2 Bataille rangée — rallying

- Phase 1 : monte à cheval, lance levée, **Aura de commandement** active (buff Soldats alentour)
- Phase 2 : `Combat.Charge.Cavalerie` — coût Stamina élevé, dégâts/stagger massifs
- Phase 3 : `Combat.Brèche.Élite` ou `Combat.HoldRalliement` selon situation
- Soldats sous commandement gagnent buff Présence × Maîtrise_Code

### 5.3 Duel codifié

- Sous-mode `Festivite.DuelCodifié`
- Mini-jeu cérémoniel, témoins, formules
- Si gagne dans respect strict du code : Reconnaissance +30, Renom +20
- Si gagne hors code (coup bas) : honte, Reconnaissance -50 dans son ordre

### 5.4 Assassin détecté en territoire

- Mood Colère +40 (§7 source — antagonisme structurel)
- Engagement immédiat tenté mais Assassin fuit (cf template Assassin §3 — fuite avant engagement)
- Quête potentielle "Traque le couard" générée

### 5.5 Refus de la fuite (dernier carré)

- Trigger : `AlliedChevalierFalls` + position désespérée
- Action : `Combat.HoldRalliement` jusqu'à mort, ne fuit pas
- Effet narratif : si meurt, devient `Memory.Public.NamedNPCDied` weight 100, chants célèbrent
- INFJ : pose héroïque scriptée, chant funèbre généré

### 5.6 Code brisé (action indigne)

- Trigger : action contre code de l'ordre
- Mécanique d'ordre : **honte** déclenchée
- Perte Reconnaissance interne -50
- Si récidive : exclusion du chapitre → Chevalier déchu (cf §10 source — antagoniste tragique récurrent)

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Chevalier |
|------------|---------------------|
| **I** (Introverti) | INFJ paladin idéaliste — action codifiée intérieure |
| **E** (Extraverti) | ENTJ leader d'ordre — voix qui porte ; ESTJ commande compagnie |
| **N** (Intuition) | ENTJ vision d'ordre, INFJ idéaliste |
| **S** (Sensation) | ESTJ pragmatique strict |
| **F** (Sentiment) | INFJ canonique paladin — code intérieur fort |
| **T** (Pensée) | ENTJ/ESTJ — calcul tactique, code rationnel |
| **J** (Jugement) | **Métier dominé par J** — calendrier, code, hiérarchie |
| **P** (Perception) | **Inadapté** — Chevalier flexible mal vu par ordre |

**Triplet typique** :
- **ESTJ** : Banneret organisateur — commande compagnie élite.
- **ENTJ** : Grand Chevalier / Maître de l'ordre — leadership large.
- **INFJ** : Paladin idéaliste — code intérieur, paladin pieux.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟢 **Vert** strict (cf §8 source — toute action indigne déclenche **honte** avant karma).

**Reconnaissance** (§9 source) — **double et serrée** :
- Reconnaissance interne ordre (peut radier)
- Reconnaissance large auprès noblesse
- Toute défaillance code touche les deux
- **Renom** public : Chevalier de tournoi connu fait l'objet de chants ; Maître entre dans chroniques (œuvre signée)
- Cf [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE

**Factions** :
- **Politiques** : ordres royaux nationaux — chevalerie courtoise, rude, raffinée
- **Religieuses** : ordres-temple — Ordo Caelum, Ignis Aeternum, Lex Petra (combine `Maîtrise_Foi_<Religion>`)
- **Commerciales** : ordres marchands de prestige (rare — "Compagnons du Sceau") — plus cérémoniels que martiaux
- **Antagonistes** : pas de Chevaliers Déliés au sens strict, mais **Chevaliers déchus** (bannis de leur ordre, antagonistes scriptés)

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque grand ordre : 1 Grand Maître nommé + 5-10 Chevaliers authored.
- Pas de Chevaliers transients — toujours nommés (§1 source).
- Templates alternatifs par Ère (§14 5%) :
  - Ère Effroi : `Chevalier_DernierCarré_Variant` — multiplication serments-suicide
  - Ère lumineuse : `Chevalier_Tournoi_Variant` — focus tournois, prestige tournois explose
  - Ère Voile : `Chevalier_Cloitré_Variant` — ordres se referment, méfiance, sorties réduites

**NPC↔NPC (§19)** :
- **Scène scriptée Adoubement** : Grand Maître + écuyer + frères témoins — cérémonie publique
- **Scène scriptée Conseil de l'ordre** : 5-15 Chevaliers + Grand Maître — décisions internes
- **Scène scriptée Tournoi** : 8-30 Chevaliers + spectateurs — événement majeur
- **Scène scriptée Funérailles d'un frère** : ordre entier en armure + famille — Mode Deuil collectif cérémoniel
- Croisement avec Soldat (Soldat suit, Chevalier mène — §1 source)
- Croisement avec Assassin (antagonisme structurel — §7 source figure d'antagoniste idéal)
- Croisement avec Délié (antagonisme cosmologique scripté — §7 source)

**Lifecycle (§18)** :
- Tous les Chevaliers PNJ sont nommés authored — mort permanente toujours.
- Successeur : élection au chapitre (script 7-14j gameplay).
- Œuvre signée Maître ("un fait d'arme entré dans les chants", §6 source) : codifiée par Scribe → survit Souffles (§10 Héritage).
- Cas Chevalier déchu : exclusion ordre = bascule en antagoniste (§10 source — "antagoniste tragique récurrent en lore"). Peut basculer en variante Mercenaire / Hors-la-loi.

**Cross-références** :
- [[03 - Mécaniques/Métiers/Sécurité/Chevalier]] — métier joueur source
- [[03 - Mécaniques/Métiers/Sécurité/Soldat]] — Soldat suit, Chevalier mène
- [[03 - Mécaniques/Métiers/Sécurité/Garde]] — élite vs infrastructure
- [[03 - Mécaniques/Métiers/Sécurité/Assassin]] — antagonisme structurel
- [[03 - Mécaniques/Métiers/Gouvernance/Conseiller]] — Conseiller du trône promu Régent
- [[03 - Mécaniques/Métiers/Gouvernance/Ambassadeur]] — escorte cérémonielle
- [[03 - Mécaniques/Combat]] — mécaniques charge montée
- [[03 - Mécaniques/Factions]] — ordres royaux + religieux
- [[03 - Mécaniques/PvP]] — duels codifiés
- [[03 - Mécaniques/Guildes]] — siège d'honneur (variante diplomatique)
- [[Actions Situationnelles]] §5.2 (raid + rallying), §5.3 (festival = tournoi)
- [[Concepts Fondamentaux IA PNJ]] §6 MBTI, §16 Combat AI rallying, §17 Authoring tous nommés

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
