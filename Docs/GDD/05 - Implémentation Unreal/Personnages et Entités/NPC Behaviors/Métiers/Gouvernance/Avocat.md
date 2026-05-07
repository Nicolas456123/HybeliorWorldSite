---
tags: [pnj, comportement, métier, avocat, gouvernance]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Gouvernance/Avocat]]
mbti_typique: [ENTJ, ESTJ, ENTP]
karma_typique: vert
factions_compatibles: [Politiques, Commerciales, Religieuses]
needs_review_for: [calibration-playtest]
---

# 📚 Template comportement PNJ — Avocat

> Template de comportement IA d'un PNJ **Avocat**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Gouvernance/Avocat]].
>
> **Particularité** : seul Gouvernance qui **facture à l'affaire** (§9 source) plutôt que d'être salarié. Mode Marchand activable (vente de **services** : conseil, rédaction de contrat, plaidoirie, charte de guilde). Mode Dialogue très actif (cabinet privé reçoit clientèle). Karma vert avec variant scriptable "Avocat du diable" jaune.

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Dialogue** (cabinet privé reçoit clientèle) + **Mode Marchand** atypique (vente de **services**, pas d'objets) + **Mode Routine** (étude dossiers) | **Mode Quête** (donneur), **Mode Festivité** (cérémonies civiques), **Mode Crise** (rare — Avocat fuit) | Aucun |

**MBTI typiques** :
- **ENTJ** (Commandant) : Avocat de cour, plaidoirie tonitruante, ambition de Haute Cour.
- **ESTJ** (Directeur) : Avocat consulaire / commercial — méthodique, dossiers carrés, rentable.
- **ENTP** (Innovateur) : Avocat malicieux, "trouve une faille", idéal pour défense karma jaune.

**Karma typique** : 🟢 **vert**. Variant 🟡 **jaune** "Avocat du diable" (défend hors-la-loi notoires) — marginalisé auprès des cours respectables (cf §8 source).

**Catégorie population (§9)** : **Persistant famille de génération**. Cabinets privés dans toutes les villes majeures (3-8 Avocats par cité). Mort = succession narrative ~7 jours (associé devient titulaire).

---

## 2. Cycle quotidien

```
[07:00] Réveil
   ↓
[08:00] Cabinet privé — étude dossiers du jour (Mémoire principale + Acuité)
   ↓
[09:30–12:00] Mode Dialogue : réception clients + rédaction contrats / consultation
   ↓
[12:00–13:00] Déjeuner — souvent au cabinet, parfois palais de justice
   ↓
[13:00–16:00] **Audiences** au palais de justice (plaidoirie quand affaire programmée) OU rédaction continue
   ↓
[16:00–18:00] Suite réception clients OU médiation extra-judiciaire
   ↓
[18:00] Fermeture cabinet
   ↓
[19:00–22:00] Loisir — bibliothèque personnelle, social (réseau de juges/conseillers)
   ↓
[22:00] Dormir
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 07:00 | ESTJ strict |
| `work_start` | 08:00 | |
| `work_end` | 18:00 | ENTJ : 20:00 si grand procès |
| `weekend_pattern` | `social` | Réseau professionnel entretenu |
| `leisure_preference` | `social` | ENTJ : `taverne` (banquets professionnels) ; ESTJ : `lecture` ; ENTP : `social` |
| `workplace_location` | Cabinet privé + palais de justice + chambres de guilde | Itinérant possible (frontières) |
| `home_location` | Demeure adjacente au cabinet | — |

---

## 3. Modes contextuels actifs

### Mode Dialogue (dominant — clientèle)

Sous-mode **`Dialogue.ConsultationCabinet`** :
- Trigger : client à `interaction_distance` du cabinet
- Action : invite à s'asseoir, écoute (Acuité), prend notes, propose stratégie
- MBTI : ESTJ structure méthodique, ENTJ trançant et confiant, ENTP improvise solutions créatives
- Tarification à l'heure (cf §9 source)

Sous-mode **`Dialogue.PlaidoirieAudience`** :
- Trigger : audience programmée + Juge présent
- Action : mini-jeu rhétorique en audience devant Juge (cf §3 source)
- ENTJ : plaidoirie tonitruante ; ESTJ : argumentation cadrée ; ENTP : effets de manche

Sous-mode **`Dialogue.MédiationMarchande`** :
- Trigger : négociation hors audience (éviter procès)
- Souvent plus rentable que plaider (§3 source)
- Prend 5-10% de la valeur du litige réglé (§6 source)

### Mode Marchand atypique (vente de services)

- Trigger : client demande service explicite
- "Inventaire" = catalogue de services :
  - Cas mineur : 50-200 Éclats
  - Cas commercial : 5-10% valeur litige
  - Charte de guilde : 1 000-20 000 Éclats selon palier
- Pas d'UI commerciale standard — passe par dialogue scripté avec choix payant
- Modulation prix MBTI : T = +10% rigidité, F = -5% empathie (rare en Avocat)

### Mode Quête (donneur)

- "Récupère ce témoignage", "Vérifie cette propriété", "Discrédite ce témoin (légalement)" (cf §10 source)
- Sous-mode `Quête.DéfenseKarma` : défend joueur traîné devant Juge → réduit la peine (§6 source — utilité réelle au système [[03 - Mécaniques/PvP]])
- Sous-mode `Quête.RédigerCharteGuilde` : service très demandé (§6 source)

### Mode Festivité

- Cérémonies civiques (ouverture session, intronisation Juge) — présence professionnelle
- Banquets de barreau (réseau pairs) — ENTJ très actif

### Mode Crise

- Trigger : `RaidOnVillage`
- Branche BT : `RoutineAdjust.ShelterIndoor` — fuite vers cabinet ou demeure
- Comportement : pas d'arme, embauche **un Garde** si menace persistante (cf §4 source)
- Saturation Peur ≥ 80 : ENTP fuite rapide, ENTJ tente négocier (rarement efficace)
- Pas d'engagement combat

### Mode Deuil

- Mort d'un Juge ou d'un client important : Mode Deuil 14j
- Suspension partielle activité : audiences reportées

### Mode Religieux

- Avocat ecclésiastique (faction religieuse) : sabbat respecté, défense canonique
- Cumul `Maîtrise_Foi_<Religion>`

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **PlayerHasOpenBounty** | Si rep ≥ +25 ET joueur paie : active sous-mode `Quête.DéfenseKarma` | §6 source, [[03 - Mécaniques/PvP]] |
| **PlayerSeeksGuildCharter** | Sous-mode `Quête.RédigerCharteGuilde` (1 000-20 000 Éclats) | §6 source, [[03 - Mécaniques/Guildes]] |
| **PlayerNotoriousOutlaw** (karma rouge) | ENTP : peut accepter défense (variant jaune scriptable) ; ENTJ/ESTJ : refus (perdrait sa Reconnaissance) | §7, §8 source |
| **EraVoileEffroi** | Peines durcies → défense plus difficile mais plus demandée (§8 source) | §14 |
| **EraLumineuse** | Amnisties → clientèle changeante, Avocat consulaire prospère | §14 |
| **JugeDemandeAttendu** | Active sous-mode collaboration avec Juge (cf template Juge §8 scène scriptée Tribunal) | §19 NPC↔NPC |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur entre dans cabinet

| Rep effective | Réaction |
|---------------|----------|
| +75 (allié) | Reçoit immédiatement, propose tarif réduit, peut accepter cas difficile |
| Neutre | Audience programmée selon disponibilité, tarif standard |
| -50 | "Je n'ai plus de créneaux disponibles" — refus poli |
| < -75 | Refus net, peut signaler au barreau si comportement louche |

### 5.2 Joueur demande défense karma

- Trigger : `PlayerHasOpenBounty` + paiement
- Action : sous-mode `Quête.DéfenseKarma`
- ENTP **accepte** plus facilement (compétence "trouver une faille") — variant jaune scriptable
- ENTJ/ESTJ : refus si karma joueur > orange
- Effet : si gagne, peine réduite -1 niveau ; si perd, perd Reconnaissance interne

### 5.3 Plaidoirie historique (palier Maître)

- Trigger : grand procès médiatisé
- Effet : peut **faire évoluer la jurisprudence** (œuvre signée, §6 source)
- Scène scriptée Tribunal (NPC↔NPC) : Avocat + Juge + Scribe + Garde + spectateurs
- ENTJ canonique brille

### 5.4 Crise (raid bandits)

- Court-circuit P3 → fuite vers demeure
- Aucune défense physique — embauche `Garde` si menace persistante
- Cabinet sécurisé : coffre-fort à dossiers (parchemins importants)

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Avocat |
|------------|-------------------|
| **I** (Introverti) | **Rare** — métier d'élocution publique |
| **E** (Extraverti) | **Métier dominé par E** — plaidoirie, réseau, banquet barreau |
| **N** (Intuition) | ENTP "trouve faille" ; ENTJ stratégie longue |
| **S** (Sensation) | ESTJ pragmatique strict, dossiers carrés |
| **F** (Sentiment) | **Rare** — Avocat empathique attire clientèle vulnérable mais cours méprisent |
| **T** (Pensée) | **Métier dominé par T** — calcul rationnel, rigidité contractuelle |
| **J** (Jugement) | ENTJ/ESTJ — calendrier strict, dossiers structurés |
| **P** (Perception) | ENTP improvise — utile en plaidoirie créative, dangereux en contrat |

**Triplet typique** :
- **ENTJ** : Avocat de cour ambitieux — Haute Cour visée.
- **ESTJ** : Avocat consulaire commercial — pratique, rentable, fiable.
- **ENTP** : Avocat malin — défense créative, variant jaune accessible.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟢 **Vert** par défaut.
- 🟡 **Jaune** : "Avocat du diable" (cf §8 source) — défend hors-la-loi notoires, marginalisé.

**Reconnaissance** (§9 source) — **double** :
- Auprès du milieu juridique (Juges, autres Avocats)
- Auprès de sa clientèle (guildes, marchands)

**Renom** (§9 source) :
- Grand procès gagné se chante — Renom durable
- Cf [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE

**Factions** :
- **Politiques** : Avocat couronne ou opposition
- **Commerciales** : forme **la plus jouable** (clientèle large, revenu régulier)
- **Religieuses** : Avocat ecclésiastique — défense canonique

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque cité majeure : 3-8 Avocats avec cabinets privés.
- Templates alternatifs par Ère (§14 5%) :
  - Ère Effroi : `Avocat_Défenseur_Variant` — clientèle élargie aux condamnés (peines durcies)
  - Ère lumineuse : Avocat consulaire prospère, multiplie chartes de guildes

**NPC↔NPC (§19)** :
- **Scène scriptée Tribunal** (cf template Juge §8) : Avocat + Juge + Scribe + Garde — 4 PNJ co-localisés
- **Scène scriptée Médiation** : Avocat + 2 parties en conflit — résolution sans procès
- Croisement avec Conseiller (rivalité §7 source — "résoudre par influence vs juridiciser")

**Lifecycle (§18)** :
- Mort = succession narrative associé → titulaire (§9 source) après 7j gameplay.
- Si Avocat Maître meurt : œuvre signée (charte historique) **survit** (§10 Héritage).
- Side quest générée si dossiers en cours non terminés.

**Cross-références** :
- [[03 - Mécaniques/Métiers/Gouvernance/Avocat]] — métier joueur source
- [[03 - Mécaniques/Métiers/Gouvernance/Juge]] — plaide devant
- [[03 - Mécaniques/Métiers/Gouvernance/Scribe]] — copie chartes
- [[03 - Mécaniques/Métiers/Gouvernance/Conseiller]] — rivalité diplomatie/droit
- [[03 - Mécaniques/Guildes]] — chartes de guilde
- [[03 - Mécaniques/PvP]] §Karma + §Bounty (défense karma)
- [[Actions Situationnelles]] §5.1 (présence joueur), §5.5 (changement d'Ère)
- [[Concepts Fondamentaux IA PNJ]] §6 MBTI, §7 Réputation, §10 Héritage

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
