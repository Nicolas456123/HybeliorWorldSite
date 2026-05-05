---
tags: [pnj, comportement, métier, artisanat, architecte, ia, template, pivot-architecture]
type: behavior-template
métier_lié: "[[Architecte]]"
mbti_typique: [INTJ, INTP, ESTJ]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Lex Petra, Ordo Caelum, Galenor impérial, Lumasar académique, Guildes architectes]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [pivot-branche-architecture-future, calibration-mbti-playtest, supervision-chantier-T3+]
---

# 🏛 Template PNJ — Architecte

> Comportement situationnel d'un PNJ Architecte. **Métier pivot** vers la future branche [[Architecte|Architecture]] (chantier Phase suivante). L'Architecte conçoit, supervise, oriente — il ne pose pas la pierre lui-même. **Mode Crise unique : supervision urgente d'effondrement**. Métier joueur : [[Architecte]].

---

## 1. Vue d'ensemble

L'Architecte est le **cerveau du chantier**. Bureau d'études le matin, supervision sur site l'après-midi, négociations en soirée. Il commande aux **5 métiers chantier** ([[Maçon]], [[Charpentier]], [[Tailleur de pierre]], [[Verrier]], [[Lapidaire]]) et collabore avec [[Forgeron]] (ferrures), [[Sculpteur]] (ornements), [[Menuisier]] (planches structurées).

- **Identité comportementale** : intellectuel-stratège, planification longue, peu de présence physique sur les coups de marteau
- **Position sociale** : prestige élevé, dialogue avec nobles/factions, accès permis de construire
- **Lien chaîne** : aval = chaîne chantier (Maçon, Charpentier, Tailleur de pierre, Verrier, Lapidaire) + Forgeron, Sculpteur

---

## 2. Cycle quotidien

```
07:00  Lever, petit-déjeuner soigné
08:00  Bureau d'études (T1) — plans, calculs, maquettes
12:00  Pause déjeuner (souvent invité ou client)
13:00  Visite chantiers (T2) — supervision, ajustements
17:00  Retour bureau (T3) — révision plans selon retours
18:30  Négociations / clients (Mode Marchand-Service)
20:00  Repas + lecture (INTJ/INTP) ou réunion sociale (ESTJ)
22:00  Coucher
```

Le cycle est **moins routinier** que les artisans physiques : T2 supervision varie selon nombre de chantiers actifs (0-3 simultanés selon palier).

---

## 3. MBTI typique

| Type | Profil architecte | Note |
|------|-------------------|------|
| **INTJ** | Stratège silencieux, plans complexes, vision longue (cathédrales, urbanisme) | Architectes signature, palier Maître |
| **INTP** | Théoricien, calcule plus qu'il ne supervise, fascination structures | Académiques (Lumasar), école Ordo Caelum |
| **ESTJ** | Directeur de chantier, exécution stricte, équipes disciplinées | Architectes Galenor impérial, fortifications |

Modulateurs :
- **N** (INTJ/INTP) vs **S** (ESTJ) : N spéculation cosmique forte aux Souffles, lit signes Ères ; S focus pratique sur chantier
- **T** (commun aux 3) : factuel, contractuel ; négociation rationnelle
- **J** (INTJ/ESTJ) vs **P** (INTP) : INTJ/ESTJ adhère strict aux plannings ; INTP procrastine, ajuste en continu
- **I/E** : INTJ/INTP travail solo bureau ; ESTJ extraverti, dirige équipes vocalement

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **PlanRequest** | Joueur ou faction commande plan | Bascule Mode Quête (donneur) + dialogue spécifique |
| **SiteVisit** | Heure T2 atteinte + chantier actif | Pathfinding vers `current_construction_site` |
| **WorkerQuestion** | Maçon/Charpentier interroge plan | Pause routine, explique, ajuste plan ; ESTJ tranche, INTJ explique en profondeur |
| **CollapseImminent** ★ | Tag `Construction.State.Unstable` détecté | **Mode Crise unique** = supervision urgente (cf. §6.2) |
| **CollapseHappened** | Tag `Construction.Event.Collapsed` | Crise post-effondrement, blame, deuil possible si morts |
| **InaugurationDay** | Bâtiment terminé + cérémonie | Mode Festivité (cf. §6.4) |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30 ; recule, signale Garde ; **ne combat pas** |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → fuit + alerte (pas de combat direct) |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul styles tendance ; INTJ/INTP forte spéculation cosmique |

---

## 5. Modes superposables

| Mode | Activation | Spécificité architecte |
|------|-----------|------------------------|
| **Routine** | Bureau d'études + supervision | Cycle 4 phases (plans / chantier / révision / négo) |
| **Marchand-Service** | Client négocie commande | Vend un **service** plus qu'un produit ; plans T2-T5 selon palier |
| **Dialogue** | Avec ouvriers (Maçon/Charpentier) ou nobles | Technique détaillée avec ouvriers, formel avec nobles ; INTJ taciturne, ESTJ direct |
| **Crise** ★ | Effondrement imminent ou survenu | Supervision urgente, évacuation, calcul recours (cf. §6.2) |
| **Festivité** | Inauguration bâtiment | Présence cérémonielle, discours technique court, fierté visible |
| **Religieux** | Architecture sacrée (temple) | Adhère aux contraintes religieuses du commanditaire ; Ordo Caelum strict alignement astral |
| **Deuil** | Mort proche OU effondrement avec morts | Reprise lente, audit retrospectif (INTJ/INTP) ou refus de blâme (ESTJ) |
| **Quête** | Donneur ou cible quête | Plans signature pour quête, ou cible (architecte ennemi à abattre) |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur sollicite un plan (Mode Marchand-Service)

- **Trigger** : `PlanRequest`
- **Comportement** :
  - **INTJ** : "Asseyez-vous. Décrivez votre besoin. Combien de temps avez-vous ?" — pose question stratégique, calcule
  - **INTP** : "Intéressant… avez-vous pensé à la portée des arcs ? Le terrain dicte beaucoup…" — divague techniquement
  - **ESTJ** : "Surface ? Budget ? Délai ? Je dessine en 3 jours, livré sous 5." — efficace
- **Prix** : 100-50 000 Éclats selon T1-T5 du plan ; gold sink majeur de l'économie

### 6.2 Effondrement imminent (Mode Crise unique) ★

- **Trigger** : `CollapseImminent` — tag posé par système structure ou rapport ouvrier
- **Branche BT** : `Mode Crise.Supervision` (pas combat — supervision urgente)
- **Comportement** :
  - Pathfinding sprint vers chantier
  - Évacuation ouvriers (cri ESTJ, geste autoritaire INTJ)
  - Calcul recours (INTP cherche solution technique en temps réel)
  - Si effondrement effectif : sauve survivants, blâme ou auto-blâme
- **Mémoire** : weight 100 personnelle, propagation village si morts
- **Réputation** : -50 faction si morts joueurs, +30 si héros sauveur

### 6.3 Attaque de chantier ou village (Mode Crise standard)

- **Trigger** : `RaidOnVillage`, `PlayerArmDrawnNearby` agressif
- **Branche BT** : **fuite** prioritaire (Architecte = combattant nul, P2 Peur saturé vite)
- **Comportement** : recul immédiat, alerte Garde, abrite plans (objet précieux) dans `home_location`
- **MBTI** : INTJ analyse trajet de fuite optimal ; ESTJ donne ordres aux ouvriers (qui combattent eux)

### 6.4 Inauguration bâtiment (Mode Festivité)

- **Trigger** : `InaugurationDay`
- **Comportement** :
  - Présent en habit de cérémonie
  - Discours bref technique (INTJ) ou triomphal (ESTJ) ou philosophique-divagant (INTP)
  - Mood +30 sur 3 jours, fierté visible
- **Spécifique** : co-célèbre avec [[Maçon]] / [[Charpentier]] / [[Tailleur de pierre]] / [[Verrier]] / [[Lapidaire]] présents — chaîne chantier complète

### 6.5 Souffle / changement d'Ère

- **Effets paramétriques** :
  - **Tempora (Échos Brisés)** : structures instables, ±15% fiabilité plans, INTJ alarmé
  - **Eldoria (Feu Endormi)** : nouveaux styles dorés, demandes nobles, INTJ inspiré
  - **Aerion (Vents)** : architectures aérées, ponts, INTP fasciné
- **MBTI N** (INTJ/INTP) : forte spéculation cosmique, parle des signes, lit l'architecture comme oracle
- **MBTI ESTJ** (S) : "L'Ère ne change pas mes plans, le client paie c'est tout"

---

## 7. Lifecycle PNJ

- **Catégorie** : Nommé authored préférentiellement (5-10 par capitale, ~150 monde) — métier prestigieux à faible volume
- **Mort nommée** : permanente, side quest "Le plan inachevé" + bâtiment de signature reste comme Héritage
- **Apprentis** : 0-2 dessinateurs/ingénieurs subordonnés (sous-PNJ avec maîtrise montante)
- **Héritage** : un Architecte-Maître nommé signe **bâtiments Héritage** (cathédrale, palais) inscrits aux chroniques sur plusieurs Parties

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par nation

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Galenor** (impérial) | Cathédrales, casernes uniformisées | ESTJ | Architecture militaire de masse |
| **Lumasar** (académique) | Écoles en pierre blanche, observatoires | INTP | Architecture savante, lentilles intégrées |
| **Astravia** | Alignement constellations, observatoires Ordo Caelum | INTJ | Architecture sacrée astronomique |
| **Mosrack** | Forteresses Lex Petra, fortifications | ESTJ | Architecture défensive |
| **Onara** | Temples Foedus Animae, sanctuaires | INTJ | Architecture sacrée organique |
| **Cendara** (volcanique) | Constructions basaltes anti-feu | INTJ | Architecture résistante chaleur |

### Signatures PNJ (Phase 4 stub)

- **Maître Aurelius de Lumasar** (INTP) — académique, observatoires Ordo Caelum
- **Magna Voctra de Galenor** (ESTJ) — fortifications impériales standardisées
- **Sereneth d'Astravia** (INTJ) — alignement astral, cathédrales-zodiaque
- **Belarion de Mosrack** (ESTJ) — Murailles Rouges de Vermilis, école Lex Petra
- **Solivan d'Onara** (INTJ) — temples Foedus Animae, architecture organique

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Architecte]] (archétype joueur) · [[Maçon]] · [[Charpentier]] · [[Tailleur de pierre]] · [[Verrier]] · [[Lapidaire]] · [[Forgeron]] · [[Sculpteur]]*
