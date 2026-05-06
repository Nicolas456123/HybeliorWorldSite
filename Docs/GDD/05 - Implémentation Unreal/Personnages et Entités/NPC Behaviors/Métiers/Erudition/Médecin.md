---
tags: [pnj, comportement, métier, médecin, erudition]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Erudition/Médecin]]
mbti_typique: [ISFJ, ISTJ, INFJ]
karma_typique: vert
factions_compatibles: [École médicale de Galenor, Hospices urbains, Foedus Animae (médecin-prêtre), Ordres caritatifs]
needs_review_for: [calibration-playtest, frontière-guérisseur-mystique]
---

# 🩺 Template PNJ — Médecin

> Comportement PNJ pour un **Médecin** (Mémoire+Acuité, Érudition). Soin **terrestre** (anatomie, sutures, antidotes) — pas de Voie magique, contrairement au [[Guérisseur]] (M5 Mysticisme). Mode Crise = soin des blessés, **sang ne fait pas peur** (cohérent §2 perception).
>
> Source métier : [[03 - Mécaniques/Métiers/Erudition/Médecin]].

---

## 1. Vue d'ensemble

Le Médecin PNJ est un **érudit du corps**. Il connaît l'anatomie, lit les symptômes, prescrit les remèdes, opère quand il faut. Sa journée alterne **cabinet** (consultations privées) et **hospice** (gardes longues). Il est le **point d'entrée** pour les joueurs blessés cherchant soin sans aller au temple.

**Particularités** :
- **Karma vert systématique** : serment d'aider (Hippocrate-like)
- **Sang ne fait pas peur** : seuil `BloodDetectedNearby` à +5 Peur seulement (vs +15 standard) — habitué
- **Mode Crise = mode actif** : court vers les blessés au lieu de fuir (sauf saturation Peur extrême)
- **Frontière Guérisseur** : pas de magie, pas de Lien, pas de prière requise (mais peut être religieux à titre personnel)

> [!important] Frontière comportementale
> - **Médecin** = acte clinique, [[Hospice]], Mémoire dominante
> - **[[Apothicaire]]** = comptoir remèdes, Mémoire+Verbe
> - **[[Guérisseur]]** (Mysticisme) = soin magique, Esprit dominante
> - **[[Alchimiste]]** = laboratoire, recettes inédites

---

## 2. Cycle quotidien typique

```
06:00 — Lever
06:30–08:00 — Préparation cabinet, vérification stocks (bandages, infusions)
08:00–12:00 — Consultations privées (cabinet)
12:00–13:00 — Repas
13:00–17:00 — Hospice (gardes, opérations programmées)
17:00–19:00 — Visites à domicile (patients alités, accouchements)
19:00–21:00 — Repas, étude (anatomie, cas du jour)
21:00–22:00 — Garde de nuit possible (hospices urbains)
22:00 — Coucher (souvent réveillé pour urgences)
```

**Modulation MBTI** :
- **ISFJ** (45%) : dévotion patients, garde de nuit volontaire, jamais en retard
- **ISTJ** (35%) : protocole strict, dossiers méticuleux
- **INFJ** (20%) : médecin-philosophe, cas moraux complexes (avortement, fin de vie)

**Urgences** : trigger possible à toute heure → Médecin sort du cycle pour secourir.

---

## 3. MBTI typique et variantes

### 3.1 ISFJ — Défenseur (45%)
- Soignant discret, présence constante au chevet
- Karma vert+, refuse paiement aux pauvres
- F dominant : empathie ×1.3, peut pleurer avec les patients
- Mode Festivité : présent brièvement, ne s'amuse pas vraiment

### 3.2 ISTJ — Logisticien (35%)
- Méthodique, dossiers archivés sur 20 ans
- T : factuel, parfois sec ("Vous mourrez dans 3 jours, préparez-vous")
- Mode Crise : organise triage rationnel

### 3.3 INFJ — Avocat (20%)
- Médecin-philosophe, dilemmes moraux assumés
- Compatible [[Lore/Religions/Foedus Animae|Foedus Animae]] (médecin-prêtre fréquent)
- Donneur de quêtes émotionnelles complexes ("Aide-moi à comprendre cette épidémie")

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **PatientArrives** | NPC ou joueur blessé < 20m | Suspend tâche, accueille en priorité |
| **EmergencyCall** | `Memory.Public.MedicalEmergency` < 50m | Court vers le lieu, override Routine |
| **EpidemicDetected** | > 3 cas similaires < 7j village | Mode `Routine.EpidemicWatch`, alerte autorités |
| **BloodDetectedNearby** | actor tag `World.Trace.Blood` < 5m | Peur +5 SEULEMENT (vs +15 standard) — diagnostic immédiat à la place |
| **CombatNearby** | Combat < 30m | **NON-FUITE** : approche pour soigner après (sauf MBTI P+I qui hésitent) |
| **PatientDies** | Patient sous soin meurt | Mood -15 pour 24h, mémoire individuelle w50 |
| **DiseaseRare** | symptôme inconnu | Mode Quête : donneur de side quest (chercher composant ou archive) |

---

## 5. Modes superposables

| Mode | Comportement Médecin | LOD requis |
|------|------------------------|------------|
| **Routine** | Cabinet → hospice → domicile | Tous |
| **Marchand** | Vente remèdes simples ; consultation = "produit" — paiement par acte | L0/L1 |
| **Dialogue** | Patient/familles : empathique (F) ou factuel (T) ; explique diagnostic | L0 |
| **Crise** | **Bascule mode SOIGNANT** : court vers blessés, sang OK, soin sous pression. Si Peur ≥ 80 → fuit comme civil | L0 |
| **Festivité** | Présent atténué, garde un œil sur l'hospice | Tous |
| **Religieux** | Médecin-prêtre fréquent ([[Foedus Animae]]) ; rituel + acte clinique combinés | Tous |
| **Deuil** | Si patient = proche, deuil +1.5 (F) ; sinon stoïque | Tous |
| **Quête** | Donneur de quêtes "trouve composant rare", "arrête épidémie" | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive blessé (HP < 50%)
- **Branche BT** : `BTTask_AssessAndHeal` (court vers joueur)
- **Utility** : `Help.Player` +60 (override autres tâches), `Social.Trade` -20 (gratuit ou différé)
- **MBTI** : ISFJ pose 100 questions ; ISTJ examine en silence ; INFJ détecte aspect émotionnel
- **Effet** : soin gratuit ou prix modeste si rep > 0 ; +5 rep individuelle (action héroïque)

### 6.2 Mode Crise — raid sur village
- **Branche BT** : 
  1. `BTTask_TriagePatients` (priorise blessés graves)
  2. `BTTask_FieldFirstAid` (sutures rapides)
  3. Reste sur place tant que blessés à soigner
  4. Fuite UNIQUEMENT si Peur saturée OU plus de blessés
- **MBTI** : ISFJ tient jusqu'à épuisement ; ISTJ rationnel triage ; INFJ exalté par devoir
- **Réputation** : si joueur défend → +30 individuelle (médecin témoigne post-combat)
- **Sang** : Médecin ignore, contrairement civils (perception §2 : tag World.Trace.Blood = +5 Peur seulement)

### 6.3 Combat de rue isolé
- **Trigger** : `Memory.Public.FightInStreet` < 30m
- **Branche BT** : attend que combat se termine, puis approche pour soin
- **MBTI** : F immédiat ; T attend que ce soit safe
- **Risque** : peut être pris pour cible si pris pour participant — fuit alors

### 6.4 Épidémie détectée
- **Branche BT** : `Routine.EpidemicWatch` long-terme
- **Mémoire** : `Memory.Public.EpidemicAlert` w70 propagation village
- **Quête générée** : "Aide le Médecin à trouver la source / l'antidote" (cf §15 Quest Generator)
- **MBTI** : INFJ se sacrifie volontairement, ISFJ protège ses proches en priorité

### 6.5 Joueur Karma rouge (NON-violent vers Médecin)
- Médecin **soigne quand même** si HP joueur très bas (Karma vert serment)
- Mais signale aux Gardes après (sauf MBTI F extrême)
- Prix +50% (méfiance), services premium refusés (potions de combat)

### 6.6 Mort d'un patient sous soin
- Mood -15 pour 24h
- ISFJ : peut pleurer, écrit lettre à la famille (F+I)
- ISTJ : analyse cause, archive dossier
- INFJ : crise existentielle brève (demande sens)

---

## 7. Lifecycle (§18)

- **Persistant** systématique (compétence professionnelle = valeur narrative)
- Maître Médecin = nommé authored (5-10 par capitale)
- **Successeur narratif** : élève / apprenti devient maître après 7j gameplay
- **Mort permanente** si nommé : side quest "L'hospice sans son maître"

---

## 8. Variantes et signatures PNJ

### 8.1 Le vieux médecin de quartier
- ISFJ, connaît trois générations
- Karma vert+, paiement souple
- Donneur de quêtes émotionnelles ("retrouve la fille de mon ancien patient")

### 8.2 Le médecin militaire
- ISTJ, vétéran de campagnes, méthodes brutales mais efficaces
- Souvent affilié garde, accès hospice militaire
- Mode Crise : sang-froid ×1.5

### 8.3 Le médecin-prêtre
- INFJ, double affiliation [[Foedus Animae]] ou [[Salus]] partielle
- Mode Religieux + Médecin combiné : rituel + acte clinique
- Frontière souple avec Guérisseur

### 8.4 Le chirurgien itinérant
- ISTJ-P (souple), voyage de ville en ville
- Spécialisé chirurgie complexe, prix élevés
- Faible attachement local, peu de famille (graphe social réduit)

---

*Liens : [[03 - Mécaniques/Métiers/Erudition/Médecin]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Routine Quotidienne]] · [[03 - Mécaniques/Items/Crafts]] · [[Apothicaire]] · [[Alchimiste]] · [[Guérisseur]] · [[Lore/Religions/Foedus Animae]]*
