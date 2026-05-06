---
tags: [pnj, comportement, métier, musicien, divertissements]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Divertissements/Musicien]]
mbti_typique: [ISFP, ENFP, ESFP]
karma_typique: vert
factions_compatibles: [Conservatoire de Galenor, Tavernes, Cours royales, Troupes foraines, Cantor (Voie cosmique de la musique)]
needs_review_for: [calibration-playtest, calibrage-buffs-musique]
---

# 🎵 Template PNJ — Musicien

> Comportement PNJ pour un **Musicien** (Verbe+Présence, Divertissements). **Sédentaire (taverne, place) ou itinérant**. **Buffs publics aux passants** (cohérent gameplay). Performance sonore pure (vs Barde = narratif).
>
> Source métier : [[03 - Mécaniques/Métiers/Divertissements/Musicien]].

---

## 1. Vue d'ensemble

Le Musicien PNJ est l'**âme sonore** des lieux d'Hybelior. Il anime tavernes, places, mariages, festivals avec son instrument (luth, vièle, harpe, flûte, cornemuse, tambour). Métier qui produit **buffs publics passifs** : régen [[Labeur]] +X% aux passants à portée.

**Particularités** :
- **Sédentaire OU itinérant** : 60% sédentaire (taverne attitrée, place de ville), 40% itinérant
- **Buffs publics constants** : tant qu'il joue, les passants bénéficient (mécanique gameplay)
- **Maîtrise par instrument** : un Maître luth ≠ Maître cornemuse
- **Compatible [[Cantor]]** (Voie cosmique) : certains musiciens hauts paliers développent un Lien magique
- **F majoritaire** : ISFP, ENFP, ESFP — émotionnel, sensible

> [!important] Frontières
> - **Musicien** = sonore pur. Buffs régen Labeur, ambiance.
> - **[[Barde]]** = narratif + chant + Lore. Influence Reconnaissance.
> - **[[Compositeur de sorts]]** (Mysticisme) = musique-magie
> - **[[Luthier]]** = artisan d'instruments

---

## 2. Cycle quotidien typique

### 2.1 Mode sédentaire (taverne)
```
09:00 — Lever
10:00–12:00 — Petit déjeuner, accordage instrument, répétition
12:00–13:00 — Repas
13:00–14:00 — Échauffement
14:00–17:00 — **PERFORMANCE PLACE PUBLIQUE** (afternoon set)
17:00–18:00 — Pause + repas léger
18:00–23:00 — **PERFORMANCE TAVERNE** (evening set, cœur du métier)
23:00–01:00 — Vie sociale, rencontres
01:00 — Coucher
```

### 2.2 Mode itinérant (caravane, troupe)
```
08:00 — Lever camp
09:00–11:00 — Déplacement vers prochain village
11:00–13:00 — Installation + repas
13:00–17:00 — Performance place
17:00–22:00 — Performance taverne du village
22:00–00:00 — Vie troupe
```

**Modulation MBTI** :
- **ISFP** (40%) : artiste discret, performance émotionnelle
- **ENFP** (35%) : enthousiaste, raconte entre morceaux
- **ESFP** (25%) : spectacle visuel, dansant

---

## 3. MBTI typique et variantes

### 3.1 ISFP — Aventurier (40%)
- Artiste discret, voix douce, performance intériorisée
- Karma vert, musicien-poète, peut écrire ses propres compositions
- Mode Festivité atténué (présent mais discret)

### 3.2 ENFP — Inspirateur (35%)
- Enthousiaste, raconte les chansons avant de les jouer
- Frontière proche [[Barde]], double-métier fréquent
- Mode Festivité actif

### 3.3 ESFP — Animateur (25%)
- Spectacle vivant, danse en jouant, charme physique
- Mode Festivité maximal

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **AudienceListening** | > 3 spectateurs immobiles < 15m | Performance qualité ×1.2 (motivé) |
| **CoinThrown** | Pourboire reçu | Mood +5, animation salut |
| **TavernFull** | Taverne >75% capacité | Performance maximale, buffs +20% |
| **DanceStarted** | PNJ commence à danser | ESFP = synchronise rythme dansant |
| **InstrumentBroken** | Trigger event accidentel | Mood -50, suspend performance, urgence Luthier |
| **FestivalStarts** | Tag `Festival.<id>.Active` | Active Mode Festivité, performances étendues |
| **WeddingCalled** | Demande pour mariage local | Engagement contractuel, prestation premium |
| **ThreatLevel > 40** | Menace approche | Suspend performance, fuite (faible défense) |

---

## 5. Modes superposables

| Mode | Comportement Musicien | LOD requis |
|------|--------------------------|------------|
| **Routine** | Performance + déplacement | Tous |
| **Marchand** | Pourboires + vente compositions/recueils | L0/L1 |
| **Dialogue** | Doux, mélodique. Peut chanter au lieu de parler (ENFP) | L0 |
| **Crise** | Suspend performance, fuit ; **emporte instrument** (priorité) | L0 |
| **Festivité** | **Mode dominant** durant festivals (50-70% du temps) | Tous |
| **Religieux** | [[Lore/Religions/Cantus Mundi]] = compatible majeur ; chants rituels | Tous |
| **Deuil** | Compose **chant funéraire**, performance dédiée | Tous |
| **Quête** | Donneur léger : "retrouve mon luth volé", "compose chanson pour mariage" | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Festival local (mode actif)
> §5.3 Actions Situationnelles + §13 religion compatible.

- **Branche BT** : `ModeFestivite.MusicSet`
- **Utility** : `Routine.Continue` (performance) +50, `Social.Talk` +20 (entre morceaux)
- **MBTI** : ESFP danse en jouant ; ENFP raconte chaque morceau ; ISFP émotionnel intense
- **Effet** :
  - Buffs publics : régen [[Labeur]] +15-25% selon palier
  - Mood Musicien +25 base
  - Pourboires +50% en festival
- **Religion** :
  - **Cantus Mundi** : intégration parfaite, parfois rituel collectif
  - **Foedus Animae** : musique méditative, mémoire collective
  - **Catena Fracta** : refuse fêtes officielles
  - **Taciti** : compatible avec performances silencieuses (luth en sourdine, mais rare)

### 6.2 Performance régulière en taverne
- **Branche BT** : `Routine.TavernSet` (set de 2-4h)
- **Effet** :
  - Buffs régen Labeur passive aux clients de la taverne (gameplay direct)
  - Pourboires : 30-100 Éclats / soir selon affluence
- **MBTI** : modulation set (ISFP émotionnel, ENFP commenté, ESFP dansant)

### 6.3 Mode Crise — bagarre dans la taverne
- **Branche BT** : suspend, recule, emporte instrument
- **MBTI** : ISFP fige (Peur saturée fréquente) ; ENFP s'inquiète des autres ; ESFP fuit physiquement
- **Instrument** : **priorité absolue** — Musicien sans instrument = catastrophe (Mood -50 si abandonné)

### 6.4 Phénomène cosmique
- **Branche BT** : `Routine.AmbientPlay` (joue pour apaiser, surtout F)
- **MBTI** : ENFP/ISFP voient signe mystique, peuvent composer en réaction
- **Religion Cantus Mundi** : interprété comme appel divin

### 6.5 Joueur Karma rouge
- Civil → suspend performance, fuit ou se cache
- Pas d'agression, pas d'alarme bruyante
- Si dans taverne : peut se cacher derrière comptoir avec instrument

### 6.6 Mort d'un proche (graphe `family` ou `friends`)
- Compose **chant funéraire** pendant Mode Deuil
- Performance dédiée durant funérailles (cohérent §13 + §19 scènes scriptées)
- Mood -25 baseline 14j

---

## 7. Lifecycle (§18)

- **Persistant fréquent** (musicien attitré d'une taverne)
- **Transient** pour foule festivals
- Maître Musicien = nommé authored (~10 par grande ville)
- **Mort permanente** si nommé : side quest "Le luth muet" + perte ambiance taverne
- **Successeur narratif** : élève du conservatoire (Maîtrise -1)

---

## 8. Variantes et signatures PNJ

### 8.1 Le luthiste de taverne
- ISFP, voix douce, mélodies mélancoliques
- Karma vert+, taverne quasi-foyer
- Mode Festivité atténué mais constant

### 8.2 La harpiste de cour
- ISFP/INFP, élégante, performance intime
- Affiliation Couronne, prestige
- Donneur de quêtes raffinées

### 8.3 Le cornemuseur itinérant
- ESFP, voyage avec troupe, sons puissants
- Karma vert, populaire dans villages
- Mode Festivité maximal

### 8.4 Le percussionniste de festival
- ESFP, énergie maximale, danse en jouant
- Mode Festivité = état naturel
- Compatible Cantus Mundi (rythme rituel)

---

*Liens : [[03 - Mécaniques/Métiers/Divertissements/Musicien]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Modes Sociaux]] · [[Barde]] · [[Jongleur]] · [[Acteur]] · [[Lore/Religions/Cantus Mundi]] · [[Cantor]]*
