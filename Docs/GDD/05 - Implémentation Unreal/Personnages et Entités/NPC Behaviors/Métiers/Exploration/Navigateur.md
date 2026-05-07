---
tags: [pnj, comportement, métier, exploration, navigateur, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Exploration/Navigateur|Navigateur]]"
mbti_typique: [INTJ, ISTJ, ISTP]
karma_typique: vert
factions_compatibles: [Ordo Caelum, Via Ventus, Solena marchand, Tyndara marchand, Haldria astrale]
catégorie_métier: Exploration
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, navigation-aérienne-Phase-4, branche-Astronome]
---

# ⛵ Template PNJ — Navigateur

> Comportement situationnel d'un PNJ Navigateur. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Maritime principal** (aérien Phase 4). Cycle nautique. Branche [[Astronome]] (navigation céleste). Métier joueur : [[03 - Mécaniques/Métiers/Exploration/Navigateur|Navigateur]].

---

## 1. Vue d'ensemble

Le Navigateur est l'**orienteur des grandes étendues** maritimes. Il pilote (ou seconde le capitaine) bateaux sur mers, océans, fleuves. Trace la route, lit les étoiles, calcule la dérive. Profil : **précis, méthodique, observateur, calme**. Mode dominant alterne **Routine port** (préparation, calcul, rencontres) et **Routine traversée** (sous-mode Itinérant maritime — semaines en mer).

> [!note] Navigation aérienne (Phase 4)
> Frontmatter prévoit l'extension aérienne (dirigeables, montures aériennes Aerion, îles volantes Astravia). Pour l'instant, archétype maritime-dominant.

- **Identité comportementale** : précis, observateur, autorité tranquille, lié au ciel et à la mer
- **Position sociale** : artisan-cadre (Maître navigateur = officier de marine, respecté)
- **Slot Mode Marchand** : non-vendeur — produit relevés maritimes vendus au [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]]
- **Lien chaîne** : amont [[Forgeron]], [[Bijoutier]], [[Verrier]] (instruments, lentilles), [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] (cartes marines), [[Astronome]] (calculs célestes) · aval [[Marchand]] (commerce inter-continental), capitaines, [[Pêcheur]] (frontière)

---

## 2. Cycle quotidien

### Cycle port (entre traversées, ~25-40% du temps)

```
06:00  Lever, vérification météo (étoiles couchantes, vent)
07:00  Petit-déjeuner avec équipage ou solitaire (INTJ)
08:00  Cabine de navigation — révision cartes, instruments calibrés
10:00  Bureau marchand — négociation contrat traversée
12:00  Déjeuner port (taverne marine — ESTJ rare exception)
14:00  Achat cartes au [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]], lentilles au [[Verrier]]
16:00  Briefing équipage, planification itinéraire détaillé
18:00  Échange avec [[Astronome]] sur événements célestes à venir
20:00  Repas + lecture journaux de bord d'autres navigateurs
22:00  Coucher
```

### Cycle traversée (sous-mode Itinérant maritime, dominant)

```
04:00  Lever pré-aube (relève quart de nuit)
04:30  Calcul position (étoile + sextant + sablier)
06:00  Briefing équipage matinal, ajustement cap
12:00  Mesure soleil au zénith (point fixe)
18:00  Calcul dérive jour, écriture journal
20:00  Veille étoile montante, point de nuit
00:00  Couche selon quart (alternance avec second navigateur)
```

> Voir `pont_navire`, `cabine_navigation`, `vigie_nidpie`, `quai_embarquement`, `phare_côtier`, `dirigeable_plateforme` (Phase 4) pour ancres.

---

## 3. MBTI typique

| Type | Profil navigateur | Note |
|------|-------------------|------|
| **INTJ** | Navigateur stratège, calcul céleste rigoureux, plan long terme | Le défaut canonique (Haldria, Solena) |
| **ISTJ** | Navigateur de routine, méthode éprouvée, registre minutieux | Tyndara marchand |
| **ISTP** | Navigateur réactif, virtuose dans la tempête, pragmatique | Cendara, Skaldoria |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **T** (commun) : factuel, calcul rationnel, négociation ferme
- **N+T (INTJ)** : forte spéculation cosmique (Ordo Caelum proche), plan multi-étape
- **S+T (ISTJ/ISTP)** : focus pratique, observation directe ; ISTJ = méthode rigoureuse, ISTP = adaptation
- **J (INTJ/ISTJ)** : itinéraire planifié strict, journal rigoureux
- **P (ISTP)** : adapte cap selon vent/courant
- **I** (commun) : calme, peu bavard ; sauf commandement équipage

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **DepartureScheduled** | Date départ + équipage prêt | Bascule sous-mode `Itinérant` (traversée) |
| **WeatherCheck** | Heure aube ou crépuscule | Anim `regarde_ciel`, écriture relevé météo |
| **CelestialPoint** | Heure de mesure (zénith, étoile montante) | Anim `astrolabe_mesure` 30s, calcul position |
| **TempêteApproach** | Vent fort + pression baisse + nuages | Court-circuit P1 → `Routine.StormPrep` (équipage en alerte) |
| **RécifDetected** | Sondeur révèle profondeur < seuil | P0 → `Combat.Avoid` (ordre virer urgence) |
| **MutinyRisk** | Équipage tendu (mood collectif < 30) | Bascule Mode Dialogue commandement (Verbe) |
| **CartographerSale** | [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] proche + relevés en cargo | Bascule Mode Marchand vente relevés |
| **PirateAttack** | Navire hostile à portée | **Mode Crise navale** — combat ou fuite selon évaluation |
| **EraSouffleBroadcast** | Nouveau Souffle | Étoiles modifiées (Tempora rare), routes redessinables |
| **AstronomicalEvent** | Éclipse / convergence céleste | Bascule observation (rituel Ordo Caelum) |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Port ou traversée | Calcul, observation, commandement |
| **Itinérant** | Traversée active | Cycle nautique adapté (quarts, observations, journal) |
| **Marchand** | Vente relevés au Cartographe | Négocie, prix selon zone (rare/dangereuse = +50%) |
| **Dialogue** | Commandement équipage ou échange technique | Bref, ferme ; INTJ explique stratégie, ISTJ donne ordres clairs |
| **Crise** | **Tempête / récif / pirates** | `Routine.StormPrep` ou `Combat.Naval` ou `Combat.Flee` |
| **Festivité** | Festival portuaire / retour de grande traversée | Atténué, participation officielle (uniforme) |
| **Religieux** | [[Lore/Religions/Ordo Caelum]] (prière étoile midi+nuit) ou [[Lore/Religions/Via Ventus]] (offrande au vent) | Fort — beaucoup de navigateurs Ordo Caelum |
| **Quête** | Donneur quête (zone à explorer, route à ouvrir) | Continue routine + dialogue narratif |

Cascade priorité : Crise (tempête/récif/pirates) > Religieux (rituel céleste fixe) > Itinérant > Routine.

### 5.bis Sous-mode Itinérant maritime (cycle nautique)

- **Pas de domicile fixe** durant traversée (1-8 semaines en mer)
- **Cycle adapté** : quarts alternés (relève toutes 4h pour maître, 6h pour second)
- **MBTI J (INTJ/ISTJ)** : itinéraire **planifié** avec étapes prévues, calcul à l'avance
- **MBTI P (ISTP)** : **improvise** selon vent et courants ; cap ajusté en continu
- **Compagnons** : équipage entier (5-50 marins selon navire)

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche

- **Comportement** :
  - **INTJ** : "Vous voulez traverser ? Quelle destination, quelle date ?"
  - **ISTJ** : "Tarif fixe au passage. Embarquement 06:00."
  - **ISTP** : silence, hoche la tête, montre carte
- **Reconnaissance +75** : propose route exclusive (passage sécurisé via îles cachées)
- **Reconnaissance -50** : refuse passage (sécurité de l'équipage)

### 6.2 Mode Crise tempête

- **Trigger** : `TempêteApproach`
- **Branche BT** : `Routine.StormPrep` puis `Combat.Survive`
- **Comportement** :
  - Crie ordres équipage (Verbe), réduit voilure
  - **INTJ** : prévoit avant survenue (lecture pression, nuages)
  - **ISTJ** : applique procédure rigoureuse
  - **ISTP** : adapte en temps réel, virtuose dans la rafale
- **Mood** : `Peur +20`, `Colere +10` ; reste calme (préparation MBTI **J**)
- **Lien [[Lore/Religions/Via Ventus]]** : prière au vent durant la tempête

### 6.3 Mode Crise navale (pirates)

- **Trigger** : `PirateAttack`
- **Branche BT** : `Combat.Naval` (combat de bord) ou `Combat.Flee` (manœuvre dérobade)
- **Comportement** :
  - **INTJ** : calcule chances, choisit fuite ou combat
  - **ISTP** : combat tactique au corps-à-corps si abordage
  - **ISTJ** : défend le navire avec discipline militaire
- **Karma** : pirates généralement Karma rouge → combat légitime

### 6.4 Souffle / changement d'Ère

- **Eldoria** : étoiles plus brillantes, navigation facilitée ; mood +10
- **Noctis** : ciel obscurci, étoiles voilées — danger accru, routes recalculées
- **Tempora** : étoiles temporellement décalées — fascination INTJ ([[Lore/Religions/Ordo Caelum]] rituels), refonte cartes
- **Climata** : passes glaciaires nouvelles — opportunité ou danger
- **Effets paramétriques** : `route_modifier`, `time_modifier` pour traversée

### 6.5 Événement astronomique

- **Trigger** : `AstronomicalEvent` (éclipse, convergence)
- **Comportement** : observation **obligatoire** (rituel [[Lore/Religions/Ordo Caelum]] si pratiquant)
- **MBTI N+T (INTJ)** : interprétation cosmologique riche
- **MBTI S+T (ISTJ/ISTP)** : note observation, calcul d'impact route

### 6.6 Donneur de quête

- **Quête typique** : "Atteindre la côte d'[Azoria], rapporter relevé maritime" — joueur peut embarquer
- **Beaucoup de side-quests** : rumeur d'île nouvelle, navire perdu, monstre marin

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (équipage stable, transmission familiale) ou Nommé authored (1-3 par grande cité portuaire)
- **Mort transient/famille** : 14 jours → second navigateur reprend ; reroll MBTI cohérent
- **Mort nommé authored** : permanente, side-quest "Le journal de bord perdu"
- **Apprenti** : 1-2 (transmission art céleste — long apprentissage)
- **Héritage** : un Maître peut être lié à une **route signature** (premier passage commercial inter-continental) inscrit aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Solena** ("Grandes Explorations") | Navigateur d'expédition, premier passage | INTJ | Routes nouvelles, cartes vierges |
| **Tyndara** ("Ligue Marchands") | Navigateur commercial, routes tracées | ISTJ | Routes commerciales établies |
| **Haldria** ("Astrale") | Navigateur des Brumes, calcul céleste avancé | INTJ | Traversée des Brumes |
| **Cendara** (volcanique) | Navigateur de mer chaude, courants thermiques | ISTP | Mers proches du volcan |
| **Skaldoria** (toundra) | Navigateur arctique, glace de mer | ISTP | Brise-glace, navigation hivernale |

### Signatures PNJ (Phase 4 stub)

- **Maître Solvane** (INTJ Maître-Légende, Solena) — premier à atteindre Azoria englouti
- **Branneck l'Étoile** (INTJ Maître, Haldria) — auteur du Code des Brumes
- **Ulrica la Givrée** (ISTP Maître, Skaldoria) — navigation arctique permanente
- **Tarik le Vent-Chaud** (ISTP Maître, Cendara) — courant volcanique maîtrisé

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Exploration/Navigateur|Navigateur (gameplay)]] · [[Astronome]] · [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] · [[03 - Mécaniques/Métiers/Exploration/Explorateur|Explorateur]] · [[Marchand]] · [[Charpentier]] · [[Verrier]]*
