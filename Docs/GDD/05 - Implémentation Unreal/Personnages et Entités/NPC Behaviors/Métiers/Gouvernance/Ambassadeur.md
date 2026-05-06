---
tags: [pnj, comportement, métier, ambassadeur, gouvernance]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Gouvernance/Ambassadeur]]
mbti_typique: [ENTJ, ENFJ, ESFJ]
karma_typique: vert
factions_compatibles: [Politiques, Religieuses, Commerciales]
needs_review_for: [calibration-playtest]
---

# 🕊️ Template comportement PNJ — Ambassadeur

> Template de comportement IA d'un PNJ **Ambassadeur**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Gouvernance/Ambassadeur]].
>
> **Particularité** : PNJ qui **voyage entre nations** (cf §17 NPC↔NPC scènes scriptées + §14 réaction Ères changeant le climat diplomatique). Mode Marchand jamais. Mode Festivité **dominant** (banquets diplomatiques sont son terrain de chasse). Inviolabilité narrative (§5.2 source).

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Festivité** (banquets, réceptions) + **Mode Dialogue** formel + **Mode Routine** (entre voyages) | **Mode Quête** (donneur diplomatique), **Mode Religieux** (Légat religieux) | **Mode Marchand** ❌ |

**MBTI typiques** :
- **ENTJ** (Commandant) : Plénipotentiaire, négociateur dur mais juste, voix qui porte au banquet — archétype prestige.
- **ENFJ** (Protagoniste) : Ambassadeur charismatique, gagne les cœurs, idéal pour mariages politiques.
- **ESFJ** (Consul) : Hôte chaleureux, maîtrise codes culturels, indispensable en délégation.

**Karma typique** : 🟢 **vert** strict (cf §8 source — aucune tolérance, jaune = rappel immédiat). Variant 🟡 jaune secret possible : Ambassadeur = Espion sous couverture (rare, scripté).

**Catégorie population (§9)** : **Persistant nommé authored**. Chaque grande capitale a 1-3 Ambassadeurs étrangers en résidence + 1-2 nationaux en mission. Mort permanente, succession lente.

---

## 2. Cycle quotidien

```
[07:00] Réveil dans ambassade (résidence officielle)
   ↓
[08:00] Lecture courrier diplomatique + rapport Conseiller mère-faction (Mémoire / Acuité)
   ↓
[09:30] Sortie publique — visite cour locale, audience programmée
   ↓
[10:00–12:30] Audience formelle OU négociation à plusieurs tours
   ↓
[12:30–14:30] Déjeuner social — souvent banquet intermédiaire (cf §3.1 Mode Festivité atténué)
   ↓
[14:30–17:00] Réception ambassade : marchands, autres Ambassadeurs, Espions cachés
   ↓
[17:00–19:00] Cabinet privé — rédaction rapport codé pour faction d'origine
   ↓
[19:00–23:00] Banquet du soir (3-4 fois / semaine) — Mode Festivité dominant
   ↓
[23:00] Dormir
```

> **Cycle pluri-mensuel** : tous les 1-3 mois gameplay, voyage diplomatique entre nations (§14 + §17 NPC↔NPC). Pendant le voyage : Mode Routine voyage, escorte Garde + Scribe + parfois Espion.

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 07:00 | ENFJ peut tirer au lit après banquet tardif |
| `work_start` | 09:30 | |
| `work_end` | 23:00 (banquet inclus) | Métier sans pause stricte |
| `weekend_pattern` | `social` | Banquet du week-end fréquent |
| `leisure_preference` | `social` | ENFJ : `taverne` ; ESFJ : `famille` (de la cour d'accueil) |
| `workplace_location` | Ambassade + palais étrangers | Mobile pendant voyages |
| `home_location` | Résidence d'ambassade | Voyageur : campement / auberge |
| `voyage_pattern` | 1-3 mois | Variantes selon faction |

---

## 3. Modes contextuels actifs

### Mode Festivité (dominant)

Sous-mode **`Festivite.BanquetDiplomatique`** :
- Trigger : invitation OU organisation propre
- Action : conversations multiples, écoute attentive (Acuité), formules ciselées (Verbe)
- MBTI : ENTJ pilote conversation, ENFJ harmonise tablée, ESFJ veille au protocole
- Cohérent §3.1 source : "lieu privilégié de la diplomatie en Hybelior"

### Mode Dialogue (formel — audiences)

Sous-mode **`Dialogue.Audience.LettreCréance`** :
- Trigger : arrivée dans nouvelle cour
- Action : cérémonie d'arrivée, gain initial Reconnaissance auprès faction d'accueil (cf §3 source compétence)

Sous-mode **`Dialogue.Négociation`** :
- Mini-jeu social à plusieurs tours (cf §3 source)
- Modulation MBTI : ENTJ pousse, ENFJ cherche win-win, ESFJ trouve compromis
- Compétence "Refuser sans rompre" (§3 source)

### Mode Quête (donneur diplomatique)

- Convoyage diplomatique, recherche cadeau rare, médiation litige
- Service spécifique : **plaider la cause du joueur** auprès faction où il est mal vu (cf §10 source — coût Éclats + faveurs)
- Sous-mode `Quête.OuvrirRouteCommerciale` : impact direct [[03 - Mécaniques/Économie]] et [[03 - Mécaniques/Guildes]]
- Sous-mode `Quête.SuspendreSiège` : trêve ponctuelle pour guerres de factions ([[03 - Mécaniques/PvP]])

### Mode Religieux (Légat religieux seulement)

- Variantes Légat / Émissaire d'une église
- Cumul `Maîtrise_Foi_<Religion>`
- Sabbat respecté strictement

### Mode Crise

- Trigger : `RaidOnVillage` OU `PactBrokenByPlayer` (rare directe contre Ambassadeur)
- Branche BT : `RoutineAdjust.ShelterEmbassy` — l'ambassade est inviolable narrativement (cf §1 source)
- Comportement : reste dans ambassade, n'engage pas physiquement, **escorte Garde** active
- Cas spécifique **Ère de l'Effroi** : risque de **prise d'otage** réelle (§8 source) — script narratif quête de libération
- Saturation Peur ≥ 80 : ENTJ amplitude rep ×1.2 (peur maîtrisée publiquement) ; ENFJ panique plus visible
- Cas inviolabilité brisée par joueur : event majeur, déclenche guerre entre factions

### Mode Routine (voyage diplomatique)

- Pendant voyages : Pathfinding longue distance, escorte (cf §17 NPC↔NPC)
- Croisement avec Ambassadeurs tiers en chemin (§19 scènes)

### Mode Deuil

- Mort dirigeant faction d'accueil OU faction émettrice : Mode Deuil 14j, présence funérailles diplomatiques
- ENFJ : durée ×1.5, larmes publiques scriptées

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **PlayerSeeksDiplomaticIntervention** (rep ≥ +50) | Active sous-mode `Quête.PlaiderCause` | §10 source |
| **EraVoileEffroi** | Ambassades se ferment ; Ambassadeur revient à émissaires secrets (§8 source) | §14 |
| **EraLumineuseAube** | Multiplication conférences ouvertes — Mode Festivité activé ×1.5 | §14 |
| **AmbassadeurArriveCour** | Cérémonie `LettreCréance` — gain Reconnaissance initiale | §3 source |
| **InviolabilitéBrisée** | Event majeur, déclenche `Memory.Public.PactBrokenInternational` weight 100 | §3 |
| **HostageScript** (Ère Effroi) | Ambassadeur retenu ; Mode Crise spécial, immobilisation prolongée | §14, §15 quête |
| **EraSouffleBroadcast** | Climat diplomatique recalibré ; voyages ré-ordonnancés | §14 |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur se présente à l'ambassade

| Rep effective | Réaction |
|---------------|----------|
| +75 (allié) | Reçoit en privé, propose mission diplomatique, peut **plaider sa cause** ailleurs |
| Neutre | Audience polie, propose visite formelle |
| -50 | Refus diplomatique courtois, "votre démarche est notée" — pas d'action |
| < -75 | Refus public, peut signaler aux Gardes locaux si karma rouge |

### 5.2 Banquet diplomatique inter-factions

- Rassemble : Ambassadeur + 2-3 Conseillers + Ambassadeurs tiers + Espions cachés
- Scène scriptée 5-10 min réel
- ENTJ pilote table, ENFJ anime, ESFJ veille protocole
- Joueur invité (rep ≥ +50) : peut intervenir via dialogue scripté

### 5.3 Voyage diplomatique entre nations

- Trigger : calendrier mensuel
- Pathfinding longue distance, **escorte Garde + Scribe + parfois Espion**
- Peut être attaqué en route (§5.2 source — risque Ère Effroi)
- Croisement avec Ambassadeurs tiers : scène scriptée NPC↔NPC sur la route

### 5.4 Crise inviolabilité (joueur attaque ambassadeur)

- Court-circuit P3 → bascule Combat (Ambassadeur fuit, Garde engage)
- Effet narratif majeur : `Memory.Public.PactBrokenInternational` weight 100
- Faction émettrice déclare état diplomatique grave (script Phase 2 — guerre potentielle entre factions)

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Ambassadeur |
|------------|------------------------|
| **I** (Introverti) | **Inadapté** — métier dominé par interaction permanente |
| **E** (Extraverti) | **Métier dominé par E** — banquets, audiences, présence physique |
| **N** (Intuition) | Anticipe Souffles, lit climat diplomatique long terme |
| **S** (Sensation) | Maîtrise détails protocolaires, ESFJ canonique |
| **F** (Sentiment) | **Métier dominé par F** — empathie cible, gain cœurs (ENFJ canonique) |
| **T** (Pensée) | ENTJ négociateur dur — calcul concessions chiffrées |
| **J** (Jugement) | Tenue protocolaire stricte, calendrier respecté |
| **P** (Perception) | Adaptation continue, improvisation utile |

**Triplet typique** :
- **ENTJ** : Plénipotentiaire dur, négociateur d'État.
- **ENFJ** : Ambassadeur charismatique — gagne les cœurs, mariages politiques.
- **ESFJ** : Hôte protocolaire — maîtrise codes culturels.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟢 **Vert** strict (cf §8 source — aucune tolérance).
- 🟡 **Jaune** : rappel immédiat. Variant secret : Ambassadeur = Espion sous couverture (scripté seulement).

**Reconnaissance** (§7) — **dédoublée** :
- Faction émettrice ET faction d'accueil
- Trop de Reconnaissance d'accueil = soupçon de loyauté brouillée (§9 source)

**Renom** (§10 source) :
- Plénipotentiaire célèbre par définition
- Renom monte fort mais expose (cf [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE)

**Factions** :
- **Politiques** : Ambassadeur classique entre couronnes
- **Religieuses** : Légat / Émissaire d'église — concessions dogmatiques
- **Commerciales** : Délégué consulaire — commerce et droits de douane
- **Antagonistes (Catena Fracta)** : pas d'Ambassadeur officiel, **émissaires de l'ombre** (chevauchement Espion)

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque grande capitale : 1-3 Ambassadeurs étrangers résidents + 1-2 nationaux en mission.
- Templates alternatifs par Ère (§14 5%) :
  - Ère du Voile : `Ambassadeur_Émissaire_Variant` — voyages secrets, ambassade fermée publique mais réseau souterrain actif.
  - Ère lumineuse : conférences inter-factions multipliées, Mode Festivité dominant ×1.5.
  - Ère Effroi : `Ambassadeur_Otage_Variant` — script narratif d'enlèvement.

**NPC↔NPC (§19)** :
- **Scène scriptée Banquet diplomatique** : 5-10 PNJ co-localisés, dialogues entrelacés (5-10 min réel).
- **Scène scriptée Conférence inter-factions** : 3-5 Ambassadeurs + Conseillers, négociation longue.
- **Scène scriptée Voyage** : Ambassadeur + Garde + Scribe sur route, peut croiser caravane / autre Ambassadeur.

**Lifecycle (§18)** :
- Mort permanente. Si tué en mission → event diplomatique majeur.
- Successeur : autre Ambassadeur de la faction émettrice envoyé après ~14j gameplay (cohérent §17 authoring).
- Cas Mode Disgrâce : rappelé chez lui — `loyalty_score` (§12 source) chute, perte progressive Maîtrise_Diplomatie_<Faction>.

**Cross-références** :
- [[03 - Mécaniques/Métiers/Gouvernance/Ambassadeur]] — métier joueur source
- [[03 - Mécaniques/Métiers/Gouvernance/Conseiller]] — rivalité parle au nom du dirigeant
- [[03 - Mécaniques/Métiers/Sécurité/Espion]] — frontière diplomatique secrète
- [[03 - Mécaniques/Métiers/Sécurité/Garde]] — escorte
- [[03 - Mécaniques/Guildes]] — médiation de siège
- [[03 - Mécaniques/PvP]] — suspension hostilités factions
- [[Actions Situationnelles]] §5.5 (changement d'Ère climat diplomatique), §5.3 (festival/banquet)
- [[Concepts Fondamentaux IA PNJ]] §6 MBTI, §17 Authoring NPC nommés, §19 NPC↔NPC

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
