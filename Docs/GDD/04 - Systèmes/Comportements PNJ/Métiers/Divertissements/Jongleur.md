---
tags: [pnj, comportement, métier, jongleur, divertissements]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Divertissements/Jongleur]]
mbti_typique: [ESFP, ENTP, ENFP]
karma_typique: vert
factions_compatibles: [Troupes foraines, Tavernes, Festivals, Cours royales (occasionnel), Camps itinérants]
needs_review_for: [calibration-playtest, calibrage-buffs-public]
---

# 🤹 Template PNJ — Jongleur

> Comportement PNJ pour un **Jongleur** (Vivacité+Présence, Divertissements). **Mode Festivité quasi-permanent**, itinérant ou fixe, **faible défense** → fuite en Crise. **Karma vert toujours**.
>
> Source métier : [[03 - Mécaniques/Métiers/Divertissements/Jongleur]].

---

## 1. Vue d'ensemble

Le Jongleur PNJ est l'**âme de la fête** : performances physiques légères (jonglerie, acrobatie, prestidigitation, animation foule). Métier **par essence festif**, **mobile**, **populaire**. Il ouvre les spectacles, attire la foule, chauffe l'ambiance.

**Particularités majeures** :
- **Mode Festivité QUASI-PERMANENT** : presque toute interaction du Jongleur passe par le mode festif
- **Itinérant ou fixe** : 70% itinérant (troupes foraines), 30% fixe (taverne, place de ville)
- **Faible défense** : Vigueur faible, Vivacité haute → en Crise = **fuite immédiate** (jamais combat)
- **Karma vert systématique** : profession ouverte, joyeuse, sans menace
- **Très extraverti** : ESFP/ENFP/ENTP — toujours en lien social

> [!important] Frontières
> - **Jongleur** = performance physique + petits tours, animation visuelle
> - **[[Acteur]]** = performance narrative incarnée
> - **[[Musicien]]** = performance sonore
> - **[[Barde]]** = transmission narrative + Lore

---

## 2. Cycle quotidien typique

### 2.1 Mode itinérant (70% des Jongleurs)
```
08:00 — Lever camp foraine ou auberge bon marché
08:30–10:00 — Petit déjeuner collectif, échauffement physique
10:00–12:00 — Répétition + maintenance accessoires
12:00–13:00 — Repas (souvent collectif avec troupe)
13:00–17:00 — **PERFORMANCES MARCHÉ / PLACE PUBLIQUE** (cœur du métier)
17:00–18:00 — Pause, comptage des pourboires
18:00–22:00 — **PERFORMANCES TAVERNES** (deuxième shift)
22:00–00:00 — Repas tardif, vie sociale troupe
00:00 — Coucher
```

### 2.2 Mode fixe (30%, taverne/place attitrée)
```
10:00 — Lever
11:00–13:00 — Échauffement, préparation
13:00–14:00 — Repas
14:00–18:00 — Performances place publique
18:00–22:00 — Performances taverne associée
22:00 — Repas tardif
00:00 — Coucher
```

**Modulation MBTI** :
- **ESFP** (50%) : spontané social, public adoré
- **ENFP** (30%) : enthousiasme contagieux, peut improviser des histoires
- **ENTP** (20%) : prestidigitation et tours d'esprit, charmeur narquois

---

## 3. MBTI typique et variantes

### 3.1 ESFP — Animateur (50%)
- Spontané social, vit pour le public
- Performance physique ×1.3, charme immédiat
- Mode Festivité = état naturel

### 3.2 ENFP — Inspirateur (30%)
- Enthousiasme contagieux, raconte ses tours
- Compatible jongleur-conteur (frontière vers Barde possible)
- Donneur de quêtes émotionnelles ("aide ma troupe perdue")

### 3.3 ENTP — Innovateur (20%)
- Charmeur narquois, prestidigitation/escroquerie légère
- Karma jaune occasionnel (tours de cartes truqués)
- Affiliation parfois Catena (mais reste populaire)

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **AudienceGathered** | > 5 PNJ/joueurs < 10m | **PERFORMANCE auto-déclenchée**, buffs publics actifs |
| **CoinThrown** | Pourboire reçu | Mood +5, animation sourire/clin d'œil |
| **InsultThrown** | Spectateur hostile | ENTP riposte spirituelle ; ESFP rit ; ENFP attristé |
| **FestivalStarts** | Tag `Festival.<id>.Active` | Active Mode Festivité **maximal**, performances continues |
| **TroupeArrives** | Autre membre de troupe < 5m | Mode Dialogue + Festivité combiné |
| **ThreatLevel > 30** | Menace approche | **FUITE IMMÉDIATE** (saturation Peur ≥ 60 chez Jongleur faible Vigueur) |
| **WeatherRain** | Pluie modérée | Performance suspendue, replie sous abri (préau, taverne) |

---

## 5. Modes superposables

| Mode | Comportement Jongleur | LOD requis |
|------|--------------------------|------------|
| **Routine** | Performance + déplacement entre lieux | Tous |
| **Marchand** | Pas vraiment marchand, mais pourboires actifs ; vente accessoires (cartes, foulards) | L0/L1 |
| **Dialogue** | Court, joyeux, charmeur. Ne peut tenir conversation longue (toujours une foule à animer) | L0 |
| **Crise** | **FUITE IMMÉDIATE** : abandonne accessoires si nécessaire, court vite (Vivacité haute) | L0 |
| **Festivité** | **MODE DOMINANT** ~80% du temps. Animation maximale | Tous |
| **Religieux** | Rare, mais peut performer rituels festifs (Cantus Mundi compatible) | Tous |
| **Deuil** | **Difficile** : Jongleur déprimé = perte de revenu. Suspend ~5 jours puis reprend | Tous |
| **Quête** | Donneur léger : "trouve mes accessoires perdus", "aide ma troupe en difficulté" | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Festival local (mode dominant)
> Cf. §5.3 Actions Situationnelles. Pour Jongleur, c'est l'**état par défaut**.

- **Branche BT** : `ModeFestivite.JuggleStreet` 
- **Utility** : `Routine.Continue` +50 (performance), `Social.Talk` +30 (entre numéros)
- **MBTI** : ESFP en avant-plan, danse + jonglerie ; ENFP raconte entre tours ; ENTP prestidigitation
- **Effet** :
  - **Buffs publics** : régen [[Labeur]] +15% pour spectateurs proches (mécanique cf [[Métiers]])
  - Pourboires +30% en festival
  - Mood Jongleur +30 base
- **Religion** :
  - [[Lore/Religions/Cantus Mundi|Cantus Mundi]] : intégré au chant collectif
  - [[Lore/Religions/Rota Mundi|Rota Mundi]] : danse cyclique participative
  - [[Lore/Religions/Catena Fracta|Catena Fracta]] : hostile (refus festivité officielle)
  - Taciti : silencieux, observation seule (Jongleur compatible avec respect)

### 6.2 Joueur lance pourboire
- Trigger `CoinThrown` → Mood +5, animation
- ESFP : sourire éclatant, salut théâtral
- ENFP : "Merci mille fois !", peut offrir un tour gratuit en bonus
- ENTP : clin d'œil narquois, tour spécial

### 6.3 Mode Crise — combat à proximité
- **Branche BT** : `Combat.Flee` immédiat
- **Saturation Peur** : seuil bas (Jongleur faible Vigueur) → Peur ≥ 60 = court-circuit fuite
- **Vivacité haute** : course rapide, peut esquiver, mais pas se battre
- **Accessoires** : peut **lancer ses massues** comme distraction (1 utilisation)

### 6.4 Pluie modérée
- Suspend performance outdoor, replie taverne ou préau
- ESFP : continue indoor avec énergie ; ENFP léger blues ; ENTP improvise tour avec parapluie

### 6.5 Joueur Karma rouge
- Civil → Peur +30, fuit ou se cache
- Cesse performance immédiatement
- Pas d'agression, pas d'alarme bruyante (laisse les Gardes faire)

### 6.6 Mort d'un membre de troupe
- Mode Deuil **lourd** (graphe `friends` fort)
- Suspend performances 5-7 jours
- ESFP : peut sombrer brièvement, sortie de troupe possible
- Reprise = performance dédiée au défunt

---

## 7. Lifecycle (§18)

- **Transient** majoritaire (foule de festivals, jongleurs anonymes)
- **Persistant** pour jongleurs nommés de troupe (chef de troupe, vedette)
- **Mort = remplacement** rapide pool (si transient)
- **Mort permanente** si nommé : side quest "La massue tombée" (apprenti reprend)

---

## 8. Variantes et signatures PNJ

### 8.1 Le jongleur de marché
- ESFP, taches solaires, costumes colorés
- Karma vert+, populaire dans le quartier
- Mode Festivité spontané dès qu'on lui jette un sou

### 8.2 Le prestidigitateur de cour
- ENTP, costume soigné, accès royal occasionnel
- Karma vert mais malicieux
- Donneur de quêtes "récupère mes accessoires volés"

### 8.3 Le cracheur de feu (Expert+)
- ESFP, technique impressionnante (Huile + Vivacité)
- Karma vert, attire foule majeure
- Vulnérable (huile = inflammable autour de soi)

### 8.4 La jongleuse-acrobate ambulante
- ENFP, voyage avec petite caravane
- Compatible duo avec [[Musicien]] / [[Barde]]
- Donneur de quêtes "ma caravane est en panne, aide-moi"

---

*Liens : [[03 - Mécaniques/Métiers/Divertissements/Jongleur]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Acteur]] · [[Musicien]] · [[Barde]] · [[Lore/Religions/Cantus Mundi]] · [[Lore/Religions/Rota Mundi]]*
