---
tags: [pnj, comportement, métier, acteur, divertissements]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Divertissements/Acteur]]
mbti_typique: [ENFP, ENFJ, ESFP]
karma_typique: variable
factions_compatibles: [Théâtres permanents, Tréteaux foraine, Cours royales, Religions (théâtre rituel), Troupes itinérantes]
needs_review_for: [calibration-playtest, propagande-politique-mécaniques, théâtre-rituel-religions]
---

# 🎭 Template PNJ — Acteur

> Comportement PNJ pour un **Acteur** (Verbe+Présence, Divertissements). **Mode Festivité + Mode Dialogue théâtral**. **Théâtre rituel** (politique, propagande, religion). **Variable culturelle forte** : cour vs rue.
>
> Source métier : [[03 - Mécaniques/Métiers/Divertissements/Acteur]].

---

## 1. Vue d'ensemble

L'Acteur PNJ **incarne** : il devient un autre devant un public. Hybelior valorise particulièrement le **théâtre rituel** (cérémonies religieuses jouées) et la **propagande politique** (théâtre de cour, satires, mises en scène d'allégeance). Métier moins commun que [[Barde]] / [[Musicien]] mais **central** dans la vie sociale.

**Particularités majeures** :
- **Mode Dialogue théâtral** : peut **déclamer** au lieu de parler normalement
- **Mode Festivité actif**
- **Variable culturelle forte** : Acteur de **cour** (formel, propagande) vs Acteur de **rue/foire** (populaire, satirique)
- **Théâtre rituel** : intégré aux cérémonies religieuses (mystères de [[Lore/Religions/Foedus Animae]], passions de [[Lore/Religions/Rota Mundi]])
- **Karma variable** : satiriste de cour peut fâcher = Karma jaune politique

> [!important] Frontières
> - **Acteur** = incarnation. **Verbe + Présence**.
> - **[[Barde]]** = transmission narrative distanciée
> - **[[Jongleur]]** = performance physique sans récit
> - **[[Musicien]]** = sonore

---

## 2. Cycle quotidien typique

### 2.1 Mode théâtre permanent (cour ou théâtre urbain)
```
09:00 — Lever
10:00–12:00 — Échauffement vocal, révision texte
12:00–13:00 — Repas
13:00–17:00 — Répétition (ensemble troupe ou solo)
17:00–18:00 — Pause, costume, maquillage
18:00–22:00 — **REPRÉSENTATION** (cœur du métier)
22:00–00:00 — Démaquillage, vie troupe, dîner
00:30 — Coucher
```

### 2.2 Mode itinérant (tréteaux foraine, troupe)
```
08:00 — Lever camp
09:00–11:00 — Déplacement
11:00–13:00 — Installation tréteaux + repas
13:00–16:00 — Représentation après-midi (foire)
16:00–17:00 — Pause
17:00–22:00 — Représentation soir
22:00–00:00 — Vie troupe
```

**Modulation MBTI** :
- **ENFP** (40%) : émotionnel intense, improvise volontiers
- **ENFJ** (35%) : leader de troupe, transmissif
- **ESFP** (25%) : spectacle physique, comédie corps

---

## 3. MBTI typique et variantes

### 3.1 ENFP — Inspirateur (40%)
- Émotionnel intense, improvisation
- Compatible théâtre populaire, satires
- Donneur de quêtes émotionnelles ("aide-moi à retrouver mon costume")

### 3.2 ENFJ — Protagoniste (35%)
- Leader de troupe, gestion ensemble
- Théâtre rituel (incarnation symbolique)
- Mode Religieux compatible

### 3.3 ESFP — Animateur (25%)
- Comédie physique, mime, masques
- Théâtre populaire, foires
- Mode Festivité maximal

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **PerformanceStarting** | Heure scéduling | Bascule en personnage (changement de voix, posture) |
| **AudienceReaction** | Applaudissements / huées | Mood ±10, ajustement performance |
| **PoliticalPlayCommissioned** | Roi/noble commande pièce | Mode Quête (production), Karma à risque |
| **RitualTheaterSchedule** | Heure rituel théâtral religieux | Mode Religieux + Festivité combiné |
| **CostumeDamaged** | Costume abîmé | Mood -20, urgence Tailleur |
| **MaskCracked** | Masque sculpté cassé | Mood -30, urgence Sculpteur |
| **EraSouffleBroadcast** | Nouveau Souffle | Adapte répertoire (cf §5.5 modulation paramétrique) |

---

## 5. Modes superposables

| Mode | Comportement Acteur | LOD requis |
|------|--------------------------|------------|
| **Routine** | Répétition + représentation | Tous |
| **Marchand** | Vente billets théâtre, costumes anciens, manuscrits | L0/L1 |
| **Dialogue** | **Théâtral** : peut déclamer au lieu de parler. Émotion amplifiée | L0 |
| **Crise** | Faible défense ; fuite mais peut **utiliser maquillage/costume** comme déguisement | L0 |
| **Festivité** | **Mode dominant** durant festivals | Tous |
| **Religieux** | **Théâtre rituel** : représentations cérémonielles ([[Foedus Animae]], [[Rota Mundi]]) | Tous |
| **Deuil** | Joue **pièce funéraire** ; représentation commémorative | Tous |
| **Quête** | Donneur fréquent : "retrouve mon manuscrit volé", "joue dans ma pièce" | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Représentation théâtrale (cœur du métier)
- **Branche BT** : `Routine.TheatricalPerformance` (45-180 min selon pièce)
- **Effet** :
  - Spectacle attire 10-100 PNJ/joueurs
  - Pourboires + entrée payante
  - Possible influence politique si pièce engagée
- **MBTI** : ENFP émotion brute ; ENFJ contrôle ensemble ; ESFP physique

### 6.2 Festival local
- Mode Festivité activé, théâtre intégré aux festivités
- ESFP : tréteaux foraine, comédie populaire
- ENFJ : pièce rituelle si religion locale active
- ENFP : improvisation, masques de [[Lore/Religions/Larvatus]] (dans festivités)

### 6.3 Théâtre rituel religieux
- **Trigger** : `RitualTheaterSchedule` (calendrier religieux)
- **Branche BT** : Mode Religieux + Festivité combiné
- **Religions compatibles** :
  - **Foedus Animae** : mystères funéraires (acteur incarne défunt)
  - **Rota Mundi** : passions cycliques (acteur joue cycle des saisons)
  - **Cantus Mundi** : théâtre + chant
  - **Larvatus** : masques rituels (théâtre noble)
  - **Catena Fracta** : refuse théâtre officiel (parfois théâtre clandestin contestataire)

### 6.4 Pièce politique commandée (cour)
- **Trigger** : `PoliticalPlayCommissioned`
- **Branche BT** : Mode Quête (production de pièce, plusieurs jours/semaines)
- **Risque Karma** : satire trop vive = Karma jaune politique, ennemis nobles
- **MBTI** : ENFJ stratégique ; ENFP risque-tout émotionnel ; ESFP léger

### 6.5 Mode Crise — incendie de théâtre
- **Branche BT** : 
  1. Évacue public (annonce calme), rôle de leader
  2. Sauve **manuscrits** + masques rares
  3. Fuite finale
- **MBTI** : ENFJ leader évacuation ; ENFP émotionnel ; ESFP rapide

### 6.6 Joueur Karma rouge dans le public
- Cesse représentation si menace évidente
- Pas d'agression, fuite ou figement
- Si Acteur de cour : peut alerter Gardes royaux

---

## 7. Lifecycle (§18)

- **Persistant** pour Acteurs de troupe stable / théâtre permanent
- **Transient** pour foule de festivals
- Maître Acteur = nommé authored (~10 par grande ville)
- **Mort permanente** si nommé : side quest "Le rôle vacant" + reprise par disciple
- **Héritage** : pièces composées (auteur-acteur palier Maître) survivent au Souffle

---

## 8. Variantes et signatures PNJ

### 8.1 L'acteur de cour (ENFJ)
- Élégant, voix posée, accès royal
- Affiliation Couronne, propagande politique
- Donneur de quêtes politiques sensibles
- Karma jaune potentiel (satires)

### 8.2 Le comédien des tréteaux (ESFP)
- Énergique, populaire, comédie physique
- Karma vert, foule adore
- Mode Festivité maximal

### 8.3 L'acteur rituel religieux (ENFJ ou INFJ)
- Compatible Foedus Animae, Rota Mundi
- Théâtre cérémoniel, parfois prêtre-acteur
- Mode Religieux + Festivité combiné

### 8.4 Le satiriste contestataire (ENFP)
- Karma jaune, parfois rouge
- Affiliation [[Lore/Religions/Catena Fracta|Catena Fracta]] possible
- Donneur de quêtes "aide ma troupe à fuir le tribunal"

---

*Liens : [[03 - Mécaniques/Métiers/Divertissements/Acteur]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Routine Quotidienne]] · [[Barde]] · [[Musicien]] · [[Jongleur]] · [[Lore/Religions/Foedus Animae]] · [[Lore/Religions/Rota Mundi]] · [[Lore/Religions/Larvatus]]*
