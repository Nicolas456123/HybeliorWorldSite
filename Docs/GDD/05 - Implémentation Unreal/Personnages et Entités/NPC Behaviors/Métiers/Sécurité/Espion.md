---
tags: [pnj, comportement, métier, espion, sécurité]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Sécurité/Espion]]
mbti_typique: [ENTJ, ENTP, INTJ]
karma_typique: jaune
factions_compatibles: [Politiques, Commerciales, Religieuses, Antagonistes]
needs_review_for: [calibration-playtest]
---

# 👁️ Template comportement PNJ — Espion

> Template de comportement IA d'un PNJ **Espion**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Sécurité/Espion]].
>
> **Particularité** : presque **en Mode Dialogue permanent** (déguisement social). Karma 🟡 **jaune** par défaut (mensonge constant). N'est jamais "lui-même" en public — sa routine apparente est celle du **rôle qu'il joue** (marchand, prêtre, courtisan, etc.). Le PNJ Espion canonique a **deux routines superposées** : son rôle public ET son cycle d'agent (rapports, rendez-vous secrets, dépôt boîtes aux lettres mortes).

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Dialogue** (déguisement social actif) + **Mode Routine couverture** (rôle public) | **Mode Quête** (donneur d'infos), **Mode Festivité** (terrain de chasse classique — banquets, tavernes), **Mode Religieux** (couverture Veilleur cultuel) | **Mode Crise ouvert** ❌ (l'Espion fuit toujours, ne combat pas frontalement) |

**MBTI typiques** :
- **ENTJ** (Commandant) : Officier traitant — chef de réseau, recrute, manipule, ENTJ canonique pour Maître Espion.
- **ENTP** (Innovateur) : Espion-charmeur — séduction informée, improvisation, multiples couvertures, idéal pour infiltration de salons.
- **INTJ** (Architecte) : Agent dormant — identité enracinée sur ère entière, planifie sur long terme.

**Karma typique** : 🟡 **jaune** par défaut (mensonge constant, pas de kills NC). Peut rester 🟢 **vert** intra-faction si exclusivement loyal sans actions illégales chez alliés. 🔴 **Rouge** si bascule kills NC — mais alors devient Assassin.

**Catégorie population (§9)** : **Persistant nommé authored** pour les Chefs de Service et grands agents (5-10 par grande nation). **Persistants familles génération** pour mouchards et agents dormants. **Transients** pour informateurs anonymes.

---

## 2. Cycle quotidien (deux routines superposées)

### Routine apparente (couverture publique)

```
[selon rôle joué : marchand 06:00, prêtre 05:00, courtisan 09:00...]
   ↓
[Cycle complet du métier de couverture — voir template métier correspondant]
   ↓
[Soir 19:00] Apparente fin de journée du rôle
```

### Routine d'agent (cachée, superposée)

```
[06:00–08:00 OU pendant pauses] Vérification boîtes aux lettres mortes (caches d'infos) en chemin
   ↓
[Pendant interactions du rôle apparent] Soutirage info via conversation orientée (Verbe × Acuité × Maîtrise_Infiltration)
   ↓
[14:00–16:00 OU pause repas] Rendez-vous tournant avec contact (jamais lieu fixe)
   ↓
[19:00–22:00] Sous couverture de loisir : rédaction rapport codé (Cryptographie — lien Scribe)
   ↓
[23:00] Dépôt boîte aux lettres morte ou transmission au courrier
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | selon rôle apparent | Variable totale |
| `couverture_role` | enum : marchand / prêtre / acteur / courtisan / artisan / mendiant | Détermine Routine apparente |
| `mastery_level` | `Initié` | Novice → Maître |
| `couverture_durée_palier` | Initié = 1 événement, Adepte = semaines, Expert = mois, Maître = 1 Souffle entier | Cf §5 source paliers |
| `home_location` | Planque + lieu apparent du rôle | Maître : "identité enracinée" cour adverse |
| `réseau_informateurs_count` | 0 (Novice) → 20+ (Maître) | Gold sink continu (cf §9 source) |

---

## 3. Modes contextuels actifs

### Mode Dialogue (dominant — déguisement social actif)

Sous-mode **`Dialogue.Couverture.<Role>`** :
- Trigger : interaction sociale dans contexte du rôle apparent
- Action : joue le rôle parfaitement (forgeron forge, marchand vend, courtisan flatte)
- Mais : **Acuité passive** détecte infos critiques que le rôle apparent ne devrait pas remarquer

Sous-mode **`Dialogue.Soutirage`** :
- Trigger : cible identifiée OU joueur avec info recherchée
- Action : conversation orientée, parfois aidée d'un verre (cf §3 source compétence)
- ENTP : séduction directe ; ENTJ : manipulation dirigée ; INTJ : conversation patiente plusieurs sessions

Sous-mode **`Dialogue.RendezVousContact`** :
- Trigger : cycle hebdomadaire ou information urgente
- Action : déplacement vers lieu tournant (taverne, ruelle, ambassade alliée), code verbal
- Furtivité maximale, vérifie filature avant et après (compétence "Décompromettre une couverture", §3 source)

### Mode Routine (couverture publique)

- Hérite intégralement du template métier du rôle apparent
- Différence : **Acuité passive +30** (toujours en alerte)
- `BBKey_PassiveAwareness` étendu — l'Espion remarque détails que le métier apparent ignorerait

### Mode Quête (donneur)

- "Récupère ce dossier", "Identifie cette cible", "Compromets ce PNJ" (§10 source)
- Sous-mode `Quête.Compromettre` : preuves de corruption, liaison, hérésie — utilité narrative énorme (§6 source)
- Sous-mode `Quête.SabotageSocial` : faire échouer mariage politique, traité, nomination
- Sous-mode `Quête.Bourse` : info précoce → mise gagnante (cf §6 source [[03 - Mécaniques/L'Accord]] Bourse des Augures)
- **Service info** : tout joueur peut **acheter une info** auprès d'Espion (prix variable, §10 source)

### Mode Festivité (terrain de chasse classique)

- Trigger : banquet, festival, taverne animée
- **Mode Festivité = mode optimal de soutirage**
- ENTP brille particulièrement — séduction et improvisation ; ENTJ pilote conversations stratégiques
- Cf §3.1 [[Actions Situationnelles]] — festival local = activité accrue Espion

### Mode Crise

> **Pattern Mode Crise spécifique Espion** : **fuite ou dissimulation**, jamais combat.

- Trigger : `AssassinIdentified` (couverture grillée) OU `RaidOnVillage` OU `PlayerArrivesAggressively` ciblant l'Espion
- Branche BT : `Combat.Hide` (priorité +50) OU `Combat.Flee` (priorité +60 si grillé)
- Compétence-vedette : **`Décompromettre une couverture`** (cf §3 source) — sortir d'une situation de suspicion sans combat
- Action : `BTAction_TalkOutOfTrouble` — utilise Verbe × Maîtrise_Infiltration pour désamorcer
- Si vraiment grillé : protocole `Disparition` — quitte la ville, réapparaît ailleurs sous nouvelle identité (Maître seulement)
- Saturation Peur ≥ 80 : ENTP cri d'alerte créatif, INTJ retraite calculée, ENTJ manipulation finale
- **Pas de combat** — petite arme cachée pour défense uniquement (§4 source — "se bat mal")

### Mode Religieux (Veilleur / Yeux du Hiérarque)

- Couverture cultuelle — espion interne d'un culte (cf §8 source)
- Sabbat respecté visuellement, mais usage du créneau pour soutirage entre pèlerins

### Mode Deuil

- Mort d'un Chef de Service ou contact clé : Mode Deuil discret, plan de succession activé
- Mémoire individuelle weight 80, rétention longue

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **CouvertureCompromise** (`Memory.Public.AgentIdentified`) | Court-circuit P0 → protocole `Disparition` immédiat | §9 source |
| **TargetSpotsAcuity** (cible repère regard appuyé) | Bascule sous-mode `Couverture.RenforcementImmédiat` — détourne attention | §3 source |
| **PlayerOffersInfoCurrency** (joueur paie pour info) | Active `Service.VenteInfo` (prix variable selon palier et risque) | §10 source |
| **PlayerSeeksAlliance** (rep ≥ +50) | ENTP/ENTJ peuvent proposer collaboration ; INTJ recrute joueur comme indic | §5 social |
| **EraVoile** | Demande explose — secret total, soutirage ×2 (§8 source) | §14 |
| **EraEffroi** | Paranoïa généralisée — risque de fausse accusation accru, vérifications croisées | §14 |
| **EraLumineuse** | Retour transparence officielle — espionnage continue mais mal vu (§8 source) | §14 |
| **NetworkAgentTurned** (agent retourné détecté) | Trigger Mode Quête `DémantèlementInterne` | §3 mémoire |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur identifie Espion sous couverture

- Si rep ≥ +50 ET joueur subtil : Mode Dialogue codé, peut accepter "deal" (info contre faveur)
- Si rep neutre : déni complet, "Vous me confondez avec quelqu'un d'autre", `Décompromettre couverture` activé
- Si joueur expose publiquement : protocole `Disparition` immédiat, perte de l'asset narratif

### 5.2 Banquet diplomatique (terrain optimal)

- Mode Festivité actif
- Cible : Ambassadeur tiers, Conseiller adverse, marchands clés
- Soutirage discret, identifie qui sait quoi (`Lire une salle`, §3 source)
- Modulation MBTI : ENTP brille — improvisation, séduction informée

### 5.3 Couverture grillée (raid sur ville pendant qu'agent est sur place)

- Trigger : `RaidOnVillage` + Espion = PNJ témoin
- Action : reste dans rôle apparent (un boulanger fuit comme un boulanger), évacue avec foule
- Reprend mission après (réseau résiste à crises locales)

### 5.4 Faction adverse révèle l'agent (Memory.Public.AgentIdentified)

- Court-circuit P0 → protocole `Disparition`
- Quitte ville en 1-2h gameplay, réapparaît ailleurs sous nouvelle identité (Maître)
- Maître peut maintenir réseau distance — ses mouchards continuent

### 5.5 Joueur achète info

- Mode Service active : prix selon info (50-2 000 Éclats, §9 source)
- Espion teste fiabilité joueur via dialogue avant vente (Acuité)
- Cf §10 source — service classique

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Espion |
|------------|-------------------|
| **I** (Introverti) | INTJ agent dormant, identité enracinée, peu de réseau visible |
| **E** (Extraverti) | **Métier dominé par E** — interaction sociale permanente |
| **N** (Intuition) | **Métier dominé par N** — anticipation, lecture de salle |
| **S** (Sensation) | **Rare** — Espion sensoriel = mauvais analyste |
| **F** (Sentiment) | **Rare** — empathie révèle émotions |
| **T** (Pensée) | **Métier dominé par T** — calcul froid, distance |
| **J** (Jugement) | INTJ planification longue, calendrier rigoureux |
| **P** (Perception) | ENTP improvise, multiples couvertures parallèles |

**Triplet typique** :
- **ENTJ** : Officier traitant — chef de réseau, recrute, manipule.
- **ENTP** : Espion-charmeur — séduction informée, improvisation, multi-couverture.
- **INTJ** : Agent dormant — identité enracinée, planification longue.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟡 **Jaune** par défaut (mensonge constant)
- 🟢 **Vert** : intra-faction loyal sans actions illégales chez alliés
- 🔴 **Rouge** : bascule kills NC → devient Assassin (cf §8 source)

**Reconnaissance** (§9 source) — **paradoxale** :
- Reconnaissance interne service très forte (chefs valorisent les bons)
- Reconnaissance publique nulle — et c'est tant mieux
- **Renom public à éviter à tout prix**
- Cf [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE

**Factions** :
- **Politiques** : services secrets nationaux — métier le plus institutionnalisé
- **Religieuses** : Veilleurs / Yeux du Hiérarque — espions internes des cultes
- **Commerciales** : intelligence économique des consortiums
- **Antagonistes (Catena Fracta)** : informateurs déliés — différent des Déliés actifs (§8 source)

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque grande nation : 1 Chef de Service nommé + 5-10 agents authored.
- Templates alternatifs par Ère (§14 5%) :
  - Ère du Voile : `Espion_Activé_Variant` — réseau ×2, demande explose
  - Ère Effroi : `Espion_Paranoïa_Variant` — vérifications croisées multipliées, fausses accusations
  - Ère lumineuse : Espion plus discret, métier mal vu publiquement

**NPC↔NPC (§19)** :
- **Scène scriptée Rendez-vous boîte aux lettres morte** : Espion + courrier — échange silencieux sous couverture
- **Scène scriptée Briefing service** : Chef de Service + 3-5 agents — réunion secrète, lieu sécurisé
- **Croisement Ambassadeur** : terrain de chasse classique (§4 source)
- Croisement avec Assassin (rivalité §7 source — partenaire dangereux)
- Croisement avec Garde (chasseur naturel des infiltrés)

**Lifecycle (§18)** :
- Chef de Service nommé : mort permanente, succession secrète immédiate (chef adjoint promu).
- Agent dormant Maître : identité enracinée — mort = perte d'asset narratif unique (Souffle complet construit pour rien).
- Décroissance `Maîtrise_Déguisement` rapide (cf §7 source — 1 palier par 2 Souffles inactifs).

**Cross-références** :
- [[03 - Mécaniques/Métiers/Sécurité/Espion]] — métier joueur source
- [[03 - Mécaniques/Métiers/Sécurité/Assassin]] — frontière critique (témoin vs acteur)
- [[03 - Mécaniques/Métiers/Gouvernance/Conseiller]] — chef commanditaire de réseau
- [[03 - Mécaniques/Métiers/Gouvernance/Ambassadeur]] — frontière publique/secrète
- [[03 - Mécaniques/Métiers/Gouvernance/Scribe]] — Scribe-faussaire fournit faux papiers
- [[03 - Mécaniques/L'Accord]] — Bourse des Augures (mise précoce)
- [[Actions Situationnelles]] §5.3 (festival = terrain), §5.5 (Ère)
- [[Concepts Fondamentaux IA PNJ]] §6 MBTI, §3 Mémoire (couverture longue), §17 Authoring agents nommés

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
