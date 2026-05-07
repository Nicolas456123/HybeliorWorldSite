---
tags: [pnj, comportement, métier, assassin, sécurité]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Sécurité/Assassin]]
mbti_typique: [INTJ, ISTP, INTP]
karma_typique: variable
factions_compatibles: [Politiques, Commerciales, Antagonistes, Religieuses]
needs_review_for: [calibration-playtest]
---

# 🗡️ Template comportement PNJ — Assassin

> Template de comportement IA d'un PNJ **Assassin**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Sécurité/Assassin]].
>
> **Particularité** : **Rare**, **méticuleux**, peu d'interactions sociales publiques. Très **Mode Crise solitaire**. Karma variable — rouge/noir typique mais variants vert légitimes (Garde de l'Ombre, Frappe scellée d'État sous sceau royal). Routine **inversée** : actif la nuit, dort le jour. Mode Marchand jamais. Cycle dominé par **Marquage de cible** (préparation longue avant frappe).

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Routine** (cycle inversé nuit) + **Mode Crise solitaire** (frappe ciblée) | **Mode Quête** (donneur de "contrat d'élimination"), **Mode Dialogue** rare et codé (école d'ombre), **Mode Religieux** Garde de l'Ombre Noctari | **Mode Marchand** ❌, **Mode Festivité** ❌ (sauf déguisement infiltration) |

**MBTI typiques** :
- **INTJ** (Architecte) : Assassin-stratège — planifie sur semaines, marquage longue durée, frappe parfaite.
- **ISTP** (Virtuose) : Assassin-virtuose — geste pur, instinct, dague rapide, peu de discours.
- **INTP** (Logicien) : Assassin-théoricien — analyse routines de cibles, poisons, trajectoires de patrouille (Acuité critique).

**Karma typique** : **variable selon variant** :
- 🔴 **Rouge** par défaut (Assassin libre — accumule kills NC, traqué par Juges)
- 🟢 **Vert** : Garde de l'Ombre (faction reconnue) ou Frappe scellée (sceau royal couvre l'acte)
- ⚫ **Noir** : Assassin Délié (lore Catena Fracta, antagoniste scripté)

**Catégorie population (§9)** : **Persistant nommé authored** uniquement (les Voiles, Gardes de l'Ombre nommés, Maîtres d'école). Les sicaires anonymes sont **transients** générés à la demande pour quêtes politiques.

---

## 2. Cycle quotidien (inversé)

```
[14:00] Réveil dans planque (urbain, discret)
   ↓
[15:00–18:00] Étude de cible : cartographie, marquage routines (Acuité × Maîtrise_Furtivité)
   ↓
[18:00–20:00] Préparation matériel — affûtage dagues, enduit poison (lien Alchimiste)
   ↓
[20:00–23:00] Repas frugal + revue plan d'opération
   ↓
[23:00–04:00] **Phase active** — déplacement urbain (toits, conduits), exécution contrat ou repérage approfondi
   ↓
[04:00–06:00] Repli, lavage trace, fausses pistes
   ↓
[06:00] Retour planque — sommeil
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 14:00 | Cycle inversé |
| `work_start` | 23:00 | Phase active nocturne |
| `work_end` | 04:00 | |
| `weekend_pattern` | `aucun` | Métier sans pause structurée |
| `leisure_preference` | `atelier` (entretien matériel) ou `lecture` (codes anciens d'école) | Solitude prééminente |
| `workplace_location` | Toits / conduits / planque | Mobile, jamais lieu fixe public |
| `home_location` | Planque urbaine (loyer, amélioration sécurité §9 source) | Garde de l'Ombre : aile secrète palais |
| `mastery_level` | `Initié` | Novice → Maître |
| `current_contract` | null | Si actif : cible + délai + récompense |

---

## 3. Modes contextuels actifs

### Mode Routine (cycle inversé)

Sous-mode **`Routine.MarquageCible`** :
- Trigger : nouveau contrat assigné
- Action : suit cible à distance pendant 1-7 jours gameplay (cf §3 source compétence "Marquage de cible")
- Animation : caché derrière obstacles, observation longue, prises de notes mentales
- MBTI : INTJ patient sur semaines, INTP cartographie analytique, ISTP instinct rapide

Sous-mode **`Routine.EntretienPlanque`** :
- Action : vérification sécurité (fausses pistes, accès secondaires), entretien dagues, fioles
- Solitaire — Mode Dialogue rare

### Mode Crise solitaire (caractéristique)

> **Pattern Mode Crise spécifique Assassin** : engage **frappe ciblée** isolée OU se replie totalement. Pas de combat collectif. Furtivité prioritaire.

- Trigger : moment optimal de frappe (cible vulnérable selon marquage)
- Branche BT : sous-arbre `BT_NPCAssassinStrike` (variant `BT_NPCCombat` ultra-furtif)
  - **Phase 1 — Approche silencieuse** : `Combat.Stealth.Approach`, animation `marche_furtive` ; cumul `Maîtrise_Furtivité` × Acuité
  - **Phase 2 — Frappe sourde** : depuis le dos, dégât critique ×3 si non détecté (cf §3 source)
  - **Phase 3 — Repli fumigène** : `Combat.Smoke.Escape`, fenêtre d'évasion brève
- Si détecté avant frappe : `Combat.Retreat` immédiat (Acrobatie, toits) — pas de mêlée prolongée
- Saturation Peur ≥ 80 : ISTP fuite acrobatique, INTJ retraite calculée vers planque, INTP fumigène + crochetage
- Profil perception : **Humain veilleur** (§2) + bonus furtivité personnel
- Cas spéciaux :
  - **Frappe sourde** depuis le dos — kill silencieux
  - **Étranglement** — non armé, kill sans bruit, drain Stamina
  - **Empoisonnement** — enduit lame ou poison alimentaire
  - **Chute mortelle** — pousser depuis hauteur ("accident", variant karma jaune)

### Mode Quête (donneur ou exécutant)

- "Contrat d'élimination" (variant rouge libre OU vert Garde de l'Ombre OU Frappe scellée)
- Sous-mode `Quête.Sabotage` : empoisonner réserve, neutraliser témoin, remplacer document
- Sous-mode `Quête.InfiltrationMortelle` : forme spécialisée d'infiltration où objectif = frappe (cf §6 source — frontière Espion)
- Sous-mode `Quête.BountyInverse` : annuler contrat sur sa propre tête (§6 source)
- Quête spéciale **Élimination karma rouge / banni** : Assassin chasse les rouges avec bénéfice du bounty PvP ([[03 - Mécaniques/PvP]] §Bounty)

### Mode Dialogue (rare, codé)

- Sous-mode `Dialogue.ÉcoleOmbre` : rencontre avec Voile (maître d'école) ou commanditaire
- Lieu : planque ou rendez-vous tournant
- Codes verbaux particuliers (signes, mots de passe)
- Pas de scène publique (un Assassin connu = un Assassin mort, §9 source)

### Mode Religieux (Garde de l'Ombre Noctari)

- Variant cultuel — culte nocturne (Noctari notamment, cf §1 source)
- Rituels d'ombre nocturnes, sermons longs sous Ère du Voile
- Code interne distingue cible "juste" et cible "vile" (§1 source)

### Mode Festivité

❌ **Jamais en Mode Festivité ouvert**. Variant : peut **infiltrer** une fête sous déguisement pour atteindre cible (frontière Espion).

### Mode Deuil

- Mort d'un Voile / maître d'école : Mode Deuil discret, vengeance souvent activée
- INTJ : mémoire individuelle weight 100, plan de représailles longue durée

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **ContractAssigned** | Active `Routine.MarquageCible` immédiat | §6 source |
| **TargetVulnerableMomentDetected** | Bascule `BT_NPCAssassinStrike` Phase 1 | §3 source compétence |
| **AssassinIdentified** (témoin survit) | Saturation Peur immédiate ; protocole `Disparition` (déménager planque, changer identité) | §9 source — un Assassin connu est un Assassin mort |
| **PlayerKarmaRedOrBlackBounty** (variant Garde de l'Ombre) | Active `Quête.ChasseBounty` ouverte (§6 source) | [[03 - Mécaniques/PvP]] §Bounty |
| **EraVoileEffroiCrépuscule** | Prime à l'Assassin — recettes poison rares débloquées (§8 source [[03 - Mécaniques/Crafts]] §Ombre Longue) | §14 |
| **EraLumineuse** | Traque renforcée — métier marginalisé (§8 source) ; Mode Routine plus défensif | §14 |
| **GardeOmbreOrdreFactionAdverse** | Bascule rouge instantané (cf §8 source — agit hors juridiction) | §7, §12 |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur tente d'engager Assassin (rare — il est invisible)

- Si Assassin libre rouge identifié : `Combat.Retreat` immédiat (fuite, repli fumigène)
- Si Garde de l'Ombre légitime : Mode Dialogue codé bref puis disparition
- Pas de combat ouvert — l'Assassin **ne se bat jamais frontalement**

### 5.2 Frappe sur cible PNJ majeur

- Branche `BT_NPCAssassinStrike` — phases approche/frappe/repli
- Effet narratif : `Memory.Public.NamedNPCDied` weight 100 si cible était PNJ nommé
- Quête générée : "Découvrir qui a commandité le meurtre" (§15 Quest Generator)
- Si Assassin détecté : `Memory.Public.AssassinIdentified` → bounty instantané sur lui

### 5.3 Mode Crise vs détection précoce

- Trigger : `Memory.Public.AssassinIdentified` posé pendant approche
- Action : abandonne contrat, repli fumigène, change planque immédiatement
- Saturation Peur ne saute pas (T+I dominant, pro-actif) mais **mood Colère +30** (échec professionnel)

### 5.4 Garde de l'Ombre face à joueur

- Si rep ≥ +50 et joueur a contrat à proposer (politique, scellé) : Dialogue codé, négocie tarif
- Si rep < 0 ou joueur intrus : disparaît sans dialogue

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Assassin |
|------------|---------------------|
| **I** (Introverti) | **Métier dominé par I** — solitude, silence, action discrète |
| **E** (Extraverti) | **Inadapté** — Assassin extraverti = Assassin grillé |
| **N** (Intuition) | INTJ planifie, INTP analyse routines |
| **S** (Sensation) | ISTP geste précis, instinct dague |
| **F** (Sentiment) | **Rare** — empathie nuit au métier ; Assassin F = Assassin en crise éthique narrative |
| **T** (Pensée) | **Métier dominé par T** — calcul froid, distance émotionnelle |
| **J** (Jugement) | INTJ canonique — plan rigoureux, marquage longue durée |
| **P** (Perception) | ISTP improvise, lecture continue de situation |

**Triplet typique** :
- **INTJ** : Stratège — marquage semaines, frappe parfaite (canonique).
- **ISTP** : Virtuose — geste pur, dague rapide, instinct.
- **INTP** : Théoricien — analyse Acuité, poisons, trajectoires patrouilles.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** (cas particulier majeur) :
- 🔴 **Rouge** par défaut (Assassin libre — kills NC, traqué)
- 🟢 **Vert** : Garde de l'Ombre OU Frappe scellée (sceau royal couvre — légalité contestée par faction visée)
- ⚫ **Noir** : Délié Catena Fracta (lore antagoniste)
- ⚠️ **Frontière contextuelle** : la même action est rouge ou verte selon faction commanditaire et juridiction (§7 frontière, §8 source)

**Reconnaissance** (§9 source) — **inversée** :
- Reconnu **par négation** par écoles d'ombre, commanditaires, contre-monde
- Reconnaissance interne haute en faction tutélaire (Garde de l'Ombre du roi)

**Renom** (§9 source) :
- À **fuir absolument**
- Un Assassin connu publiquement = un Assassin mort
- Cf [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE

**Factions** :
- **Politiques** : Frappe scellée (vert sceau royal — diplomatiquement explosif si découverte)
- **Commerciales** : "Résolveurs" (jaune)
- **Religieuses** : Garde de l'Ombre Noctari (vert dans culte)
- **Antagonistes (Catena Fracta)** : Assassins Déliés (noir)

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque grande nation : 1 Voile (maître d'école) + 1-3 Gardes de l'Ombre nommés.
- Templates alternatifs par Ère (§14 5%) :
  - Ère Voile / Effroi / Crépuscule : `Assassin_Activé_Variant` — contrats abondants, recettes poison rares, prime au métier
  - Ère lumineuse : `Assassin_Marginalisé_Variant` — Mode Routine défensif, peu de contrats

**NPC↔NPC (§19)** :
- **Scène scriptée École d'ombre** : Voile + 2-4 apprentis — transmission codée, rare, scriptée seulement
- **Scène scriptée Rendez-vous commanditaire** : Assassin + Conseiller / Ambassadeur (variant Frappe scellée) — négociation contrat, lieu secret
- Croisement avec Espion (rivalité §7 source — "fait sauter la couverture / lenteur")
- Croisement avec Chasseur de primes (chasseur naturel du rouge)
- Croisement adversarial avec Chevalier (§7 source — figure d'antagoniste idéal pour Chevalier)

**Lifecycle (§18)** :
- Voile (Maître d'école) : mort permanente. Successeur : disciple le plus avancé promu (script discret, sans cérémonie publique).
- Garde de l'Ombre nommé : mort = remplaçant secret nommé par dirigeant.
- Décroissance `Maîtrise_Furtivité` rapide (cf §7 source — Maîtres entretiennent "faux contrats").

**Cross-références** :
- [[03 - Mécaniques/Métiers/Sécurité/Assassin]] — métier joueur source
- [[03 - Mécaniques/Métiers/Sécurité/Espion]] — frontière critique (témoin vs acteur)
- [[03 - Mécaniques/Métiers/Sécurité/Chevalier]] — antagonisme structurel (§7 source)
- [[03 - Mécaniques/PvP]] §Karma + §Bounty (chasse rouges légitime)
- [[03 - Mécaniques/Le Lien]] — Voie Umbra (option furtivité magique)
- [[03 - Mécaniques/Crafts]] §Ombre Longue — recettes poison Ère
- [[Actions Situationnelles]] §5.1 (Karma rouge réaction faction), §5.2 (frappe combat isolé)
- [[Concepts Fondamentaux IA PNJ]] §6 MBTI, §16 Combat AI furtif, §12 Factions

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
