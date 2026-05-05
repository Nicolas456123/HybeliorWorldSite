---
tags: [pnj, comportement, métier, conseiller, gouvernance]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Gouvernance/Conseiller]]
mbti_typique: [INTJ, INTP, ENTJ]
karma_typique: vert
factions_compatibles: [Politiques, Religieuses, Commerciales]
needs_review_for: [calibration-playtest]
---

# 🧠 Template comportement PNJ — Conseiller

> Template de comportement IA d'un PNJ **Conseiller**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Gouvernance/Conseiller]].
>
> **Particularité** : PNJ **politique de fond**, souvent **invisible au joueur**. Mode Dialogue presque permanent (en huis clos avec dirigeant ou collègues). Aucun Mode Marchand. Le Conseiller est **l'ombre du trône** — son comportement IA est dominé par le déplacement entre cabinets privés et chambres dérobées.

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Dialogue** (huis clos avec dirigeant) + **Mode Routine** (cabinet privé) | **Mode Quête** (donneur d'intrigues), **Mode Religieux** (Conseiller cultuel), **Mode Festivité** (banquets diplomatiques) | **Mode Marchand** ❌ |

**MBTI typiques** :
- **INTJ** (Architecte) : Conseiller stratège, planifie sur 3 ères, peu loquace mais redoutable — archétype canonique.
- **INTP** (Logicien) : Conseiller analyste, lit la situation à froid, peut paraître distant ; idéal Conseiller cultuel ou astronome officiel.
- **ENTJ** (Commandant) : Premier Conseiller / Vizir — leader ferme, voix qui porte en Conseil restreint, vision d'État.

**Karma typique** : 🟢 **vert** ou 🟡 **jaune limite** (manipulations sales mais légales — cf §8 source). Au-delà : exclusion automatique. Variant 🔴 rouge possible en cas de **trahison** (Conseiller retourné par faction adverse) — script de quête politique.

**Catégorie population (§9)** : **Persistant nommé authored**. Chaque cour majeure a 1-3 Conseillers nommés (Politique, Stratégie, Cultuel). Mort permanente, succession lente (§18) via promotion d'un cadet.

---

## 2. Cycle quotidien

```
[06:00] Réveil — relecture rapports nocturnes (Mémoire principale)
   ↓
[07:30] Premier rapport au dirigeant (audience matinale privée)
   ↓
[09:00–12:00] Cabinet privé — réception d'Espions, traitement courrier chiffré, croisement infos (Acuité)
   ↓
[12:00–13:30] Déjeuner politique (rarement seul — avec Ambassadeur, Juge, autre Conseiller)
   ↓
[13:30–17:00] Conseil restreint OU dossiers stratégiques OU rédaction recommandations
   ↓
[17:00–19:00] Audience de fin de journée avec dirigeant (validation décisions)
   ↓
[19:00] Retour appartements de fonction
   ↓
[19:30–22:30] Loisir discret — lecture, correspondance privée, réseau d'informateurs entretenu
   ↓
[22:30] Dormir
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 06:00 | INTJ : 05:00 (planification matinale longue) |
| `work_start` | 07:30 | (rapport matinal) |
| `work_end` | 19:00 | ENTJ : 21:00 si crise politique |
| `weekend_pattern` | `aucun` | Métier sans week-end — la cour ne dort pas |
| `leisure_preference` | `lecture` | INTP : `lecture` ; ENTJ : `social` (réseau) ; INTJ : `atelier` (codifie ses notes) |
| `workplace_location` | Salle du conseil + cabinet privé attenant aux appartements du dirigeant | — |
| `home_location` | Appartements de fonction (chambres dérobées proches) | — |

---

## 3. Modes contextuels actifs

### Mode Dialogue (dominant — huis clos)

Sous-mode **`Dialogue.HuisClos.Dirigeant`** :
- Trigger : audience matinale ou de fin de journée OU appel d'urgence
- Action : présente 2-3 options chiffrées au dirigeant (cf §3 source : "Recommander une décision")
- MBTI : INTJ formule à demi-mot, INTP analyse exhaustive, ENTJ tranche net

Sous-mode **`Dialogue.RéseauInformateurs`** :
- Trigger : visite d'Espion ou messager
- Lieu : cabinet privé, porte fermée
- Animation : assis, prend des notes chiffrées, hoche la tête

### Mode Quête (donneur d'intrigues)

- Le Conseiller est **donneur de quête politique fine** : récupérer document, discréditer rival, relayer message à Ambassadeur, sabotage social.
- Sous-mode `Quête.IntrigueLongue` : quêtes étalées sur plusieurs ères (§14).
- Tag GAS associé : `Quest.Source.Counselor.<Domain>`.

### Mode Religieux (Conseiller cultuel seulement)

- Trigger : sabbat ou heure de rituel
- Cas Conseiller du Hiérarque : participation aux offices majeurs (§13)
- Cohérent §3.2 : Religieux > Dialogue pendant créneau de rituel obligatoire

### Mode Crise

> Très rare en mode actif — le Conseiller est protégé par les Gardes, n'engage jamais.

- Trigger : `RaidOnVillage` OU `PactBrokenByPlayer` (rare, contre Conseiller perso)
- Branche BT : `RoutineAdjust.ShelterIndoor` + activation `EmergencyEvacuation` vers chambre forte
- Comportement : reste calme (T+J dominant) — donne ordres, ne fuit pas en panique
- Saturation Peur ≥ 80 : INTJ/ENTJ très résistants (T+J amplitude rep ×1.2 mais Peur baseline basse) ; INTP plus vulnérable
- **Cas spécifique trahison** : si Conseiller détecte un retournement (`Memory.Public.PactBroken`), bascule en Mode Quête `Quête.Démantèlement` (cf §3 source : "Démanteler une opposition")

### Mode Festivité (banquets diplomatiques)

- Trigger : réception officielle organisée par dirigeant ou Ambassadeur
- Comportement : présence obligatoire, **cherche infos**, conversations ciblées
- ENTJ : très actif, anime le réseau ; INTJ/INTP : observent, parlent peu mais bien

### Mode Deuil

- Mort du dirigeant qu'il sert : effondrement de carrière imminent, souvent script de transition (§18 succession ou disgrâce)
- Mood baseline -25 pendant 14 jours
- Peut basculer en Mode Quête "Survie politique" — chercher un nouveau patron

### Mode Marchand

❌ **Jamais activé**. Les "cadeaux diplomatiques" (§9 gold sink) ne passent pas par UI commerciale — c'est de la corruption polie scriptée.

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **PlayerHasCounselorRecommendation** (joueur recommandé par Conseiller allié) | Reconnaissance +20 instantanée, accès quêtes politiques | §7, [[03 - Mécaniques/Métiers/Gouvernance/Conseiller]] §6 |
| **EraSouffleBroadcast (Cardinal)** | Mode Quête activé : "Recalibrer la politique d'État" — surchauffe (cf §8 source) | §14 |
| **ÈreVoile** | Modulation : secrets renforcés, méfiance ×1.3, confidences plus rares | §14 |
| **PlayerKarmaRedOrBlackEntersCourt** | INTJ analyse silencieusement, ENTJ peut tenter négociation conditionnelle si rep ≥ +50 | §7, [[03 - Mécaniques/PvP]] |
| **AmbassadeurArrives** | Bascule Mode Dialogue formel ; rivalité §7 source — "qui parle au nom du dirigeant ?" | §5 graphe |
| **EspionRapporteCritique** | Mood Colère +20 si trahison interne, déclenche Mode Quête `Démantèlement` | §3, §4 |
| **SuspendreEnquêteJuge** (ordre politique) | Action coûteuse — perte rep si abuse (cf §6 source) | [[03 - Mécaniques/Métiers/Gouvernance/Juge]] |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur arrive avec recommandation Conseiller allié

| Rep effective | Réaction |
|---------------|----------|
| +75 (allié) | Reçoit en privé, propose mission politique majeure, confie info sensible |
| Neutre | Audience brève, étude du dossier reportée, "revenez avec plus de Reconnaissance" |
| -50 | Refuse l'audience, signale au Garde |
| < -75 | Mandate Espion pour surveiller le joueur |

### 5.2 Trahison détectée (Conseiller retourné par autre faction)

- Trigger interne : `Memory.Public.PactBroken` weight 100
- Branche : Mode Quête longue `Démantèlement` — collecte preuves, propose au dirigeant la "fin honorable" du traître
- Modulation MBTI : INTJ patient (3-5 sessions), ENTJ rapide et tranchant

### 5.3 Disgrâce (envoi en province)

- Trigger : `LoyaltyScore` interne descend < 30 (§12 factions, hypothétique)
- Effet : -1 palier `Maîtrise_Stratégie` par Souffle hors cour (§7 source décroissance)
- Comportement : bascule baseline mood -10, perd accès aux scènes scriptées de cour

### 5.4 Souffle Cardinal — surchauffe politique

- Mode Quête activé `Quête.RecalibrationÈre`
- Travaille 16h/jour pendant 1 semaine gameplay
- Saturation Fatigue +0.1/s — court-circuit `Routine.RestNow` plus fréquent

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Conseiller |
|------------|----------------------|
| **I** (Introverti) | Préfère écrit à oral, audiences courtes, réseau via correspondance | 
| **E** (Extraverti) | Réseau actif en personne, multiplie banquets, ENTJ harangue publique rare mais redoutable |
| **N** (Intuition) | **Métier dominé par N** — anticipe Souffles, lit signes politiques |
| **S** (Sensation) | **Rare** — Conseiller pragmatique, focalise sur faits chiffrés (commercial typiquement) |
| **F** (Sentiment) | **Rare** — Conseiller "humain" du dirigeant, prête au cœur, mal vu par les T |
| **T** (Pensée) | **Standard** — calcul froid, rep décalé -5 (calculateur strict) |
| **J** (Jugement) | Rigidité de procédure, dossiers structurés — **INTJ canonique** |
| **P** (Perception) | Adaptation continue, dossiers fluides — INTP analyste libre |

**Triplet typique** :
- **INTJ** : Vizir-stratège, joue 3 ères d'avance, archétype le plus pur.
- **INTP** : Conseiller-analyste, lit froidement, idéal pour Conseiller cultuel ou astronome officiel.
- **ENTJ** : Premier Conseiller, voix forte, ambition de Régence.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟢 **Vert** par défaut.
- 🟡 **Jaune limite** typique (cf §8 source) — manipulations légales mais sales.
- 🔴 **Rouge** : Conseiller traître retourné — script narratif, bascule en antagoniste de quête.
- ⚫ **Noir** : Conseiller délié (rare, lore Catena Fracta) — manipulateur cosmique.

**Reconnaissance** (§7) :
- C'est **le métier où la Reconnaissance compte le plus** (cf §9 source).
- Chute brutale = perte de charge instantanée.
- **Renom public faible** par construction — un Conseiller célèbre est un Conseiller en danger (§9 source).

**Factions** :
- **Politiques** : Conseiller du trône — archétypal.
- **Religieuses** : Conseiller du Hiérarque — formate avis selon doctrine.
- **Commerciales** : Conseiller du Consortium — gère portefeuilles et routes.
- **Antagonistes** : Conseillers de Catena Fracta — lore noir uniquement, manipulateurs des Déliés.

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque cour majeure : 1 Premier Conseiller + 2-3 Conseillers de domaine (Stratégie, Cultes, Économie).
- Templates alternatifs par Ère (§14 5%) :
  - Ère du Voile : `Conseiller_Ombres_Variant` — réseau Espions ×2, audiences nocturnes.
  - Ère de l'Effroi : `Conseiller_Crise_Variant` — recommandations militaires dominantes.
  - Ère lumineuse : Conseiller s'efface, le roi parle plus publiquement.

**NPC↔NPC (§19)** :
- **Scène scriptée Conseil restreint** : 3-5 Conseillers + dirigeant + Scribe greffier — dialogue politique long (5-10 min réel) sur dossier majeur.
- Croisement quotidien avec Ambassadeur (rivalité §7 source — qui parle au nom du dirigeant).
- Croisement avec Espion (chef de réseau).

**Lifecycle (§18)** :
- Mort permanente. **Pas de successeur automatique** — le poste reste vacant jusqu'à promotion d'un Conseiller cadet (Quest Generator §15 active une side quest).
- Cas disgrâce : envoi en province, perd 1 palier par Souffle (cohérent §7 source décroissance).

**Cross-références** :
- [[03 - Mécaniques/Métiers/Gouvernance/Conseiller]] — métier joueur source
- [[03 - Mécaniques/Métiers/Gouvernance/Ambassadeur]] — partenaire-rival
- [[03 - Mécaniques/Métiers/Gouvernance/Juge]] — rivalité diplomatie vs verdict
- [[03 - Mécaniques/Métiers/Sécurité/Espion]] — réseau d'informateurs
- [[03 - Mécaniques/L'Accord]] — Bourse des Augures (§6 source)
- [[Actions Situationnelles]] §5.5 (changement d'Ère), §5.7 (deuil dirigeant)
- [[Concepts Fondamentaux IA PNJ]] §6 MBTI, §7 Réputation, §14 Ères, §17 Authoring

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
