---
tags: [pnj, comportement, métier, exploration, explorateur, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Exploration/Explorateur|Explorateur]]"
mbti_typique: [ENTP, ESTP, INFP]
karma_typique: vert
factions_compatibles: [Via Ventus, Vael'Kurash, Lumasar académique, Mosrack libre, Concordants L'Accord]
catégorie_métier: Exploration
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, sous-mode-itinérant-permanent, donneur-de-quête-fréquent]
---

# 🧭 Template PNJ — Explorateur

> Comportement situationnel d'un PNJ Explorateur. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **PNJ très mobile** — sous-mode Itinérant **dominant** (~80% du temps). Donneur de quête fréquent (sites découverts). Métier joueur : [[03 - Mécaniques/Métiers/Exploration/Explorateur|Explorateur]].

---

## 1. Vue d'ensemble

L'Explorateur est l'**ouvreur de zones** — premier passage dans territoires inconnus, survie en conditions extrêmes, rapport de relevés bruts au [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]]. Profil : **endurant, opportuniste, fasciné par l'inconnu**. **Rarement en ville** (~20% du temps en ravitaillement et débriefing) ; le reste du temps en sous-mode Itinérant permanent.

- **Identité comportementale** : aventurier mobile, peu attaché aux lieux, ouvert au risque, donneur de récits
- **Position sociale** : marginal mais admiré (raconte ce que personne d'autre n'a vu)
- **Slot Mode Marchand** : irrégulier — **vend relevés bruts au [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]]** (50-500 Éclats/unité), ravitaille auprès du [[Marchand]]
- **Lien chaîne** : amont [[Forgeron]] (équipement), [[Apothicaire]] (provisions, antidotes) · aval [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] (relevés), [[Bibliothécaire]] (lore), joueurs aventuriers (informateur/guide)

---

## 2. Cycle quotidien

### Cycle ville (5-15% du temps, ravitaillement)

```
07:00  Lever, achat provisions chez [[Marchand]] / [[Apothicaire]]
09:00  Vente de relevés au [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] (transactions)
11:00  Discussion avec [[Bibliothécaire]] / [[Historien]] (lore zone à venir)
13:00  Déjeuner taverne, raconte exploits (bavard ENTP/ESTP, INFP discret)
15:00  Préparation matériel, planification expédition
17:00  Mode Marchand inverse — vend trophées/curiosités ramassés
19:00  Repas + cartographie personnelle de notes
21:00  Coucher (départ pré-aube le lendemain)
```

### Cycle expédition (sous-mode Itinérant, dominant)

```
04:30  Lever pré-aube
05:00  Marche / escalade / traversée
12:00  Halte courte, déjeuner sec, croquis observations
13:00  Reprise progression
17:30  Recherche site bivouac sécurisé
18:00  Campement, soin équipement, écriture relevés (carnet)
21:00  Coucher (sommeil léger, alerte)
```

> Voir `expedition_camp_kit`, `bivouac_haute_altitude`, `station_relais`, `survival_pack` pour ancres.

---

## 3. MBTI typique

| Type | Profil explorateur | Note |
|------|--------------------|------|
| **ENTP** | Aventurier charmeur, défie l'inconnu, théoricien | Le défaut canonique (Mosrack, Lumasar) |
| **ESTP** | Audacieux pragmatique, prend risques, raconteur | Frontalier (Pyrtara, Skaldoria) |
| **INFP** | Explorateur poète, communion avec paysages, solitaire | Trinoria, [[Lore/Religions/Vael'Kurash]] |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **N+T (ENTP)** : forte spéculation cosmique, fasciné par lore
- **S+T (ESTP)** : focus pratique, valeur concrète des découvertes
- **N+F (INFP)** : sensibilité poétique, écrits intimes, interprétation mystique
- **P** (commun) : improvisation tactique, adaptation au terrain
- **E vs I** : ENTP/ESTP bavards (donneurs de récits) ; INFP introspectif (carnet personnel)

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **ResupplyComplete** | Provisions remplies, relevés vendus | Bascule sous-mode `Itinérant` (départ) |
| **ZoneEntered** | Premier passage zone inconnue | Anim `croquis_terrain`, +1 Memory weight 70 |
| **DangerDetected** | Créature/piège terrain | `Routine.Cautious`, MBTI **N** anticipe, **S** réagit |
| **WeatherExtreme** | Tempête / froid extrême / chaleur | Bascule `Routine.Survive` (refuge, vêtements adaptables) |
| **PlayerInquiry** | Joueur demande info sur zone | Donneur de récit / quête (§6.5) |
| **CartographerSale** | Présence [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] + relevés en cargo | Bascule Mode Marchand spécial (vente) |
| **DiscoveryMajor** | Site/cité majeure découverte | Mood +50, retour ville urgent pour annoncer |
| **EraSouffleBroadcast** | Nouveau Souffle | Géographie partiellement modifiée — opportunité, recartographie |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Itinérant** *(défaut, ~80% du temps)* | Permanent hors ville | Voyage, campement, observation, survie |
| **Routine** | Phases ville | Ravitaillement, vente, planification |
| **Marchand** | Vente relevés/trophées | Négocie avec Cartographe, Marchand |
| **Dialogue** | Échange avec érudit, joueur, autre explorateur | ENTP/ESTP bavards (récits), INFP réservé mais profond |
| **Crise** | Climat extrême OU créature OU effondrement | `Combat.Survive` ou `Combat.Flee` (combat seulement si acculé) |
| **Festivité** | Festival ou retour de grande expédition | ENTP/ESTP raconte avec emphase, INFP poème écrit |
| **Religieux** | [[Lore/Religions/Via Ventus]] (mouvement obligatoire) ou [[Lore/Religions/Vael'Kurash]] (terre sacrée) | Pèlerinage intégré au voyage |
| **Quête** | **Donneur de quête fréquent** (sites découverts) | Continue routine + dialogue narratif riche |

Cascade priorité : Crise > Itinérant > Marchand (en ville) > Routine.

### 5.bis Sous-mode Itinérant (mode dominant)

- **Pas de domicile fixe** (couche maison reset permanente — Explorateur loue chambre auberge en ville, jamais maison)
- Cycle quotidien adapté ([[Routine Quotidienne]] modifiée)
- **Modulation MBTI** :
  - **J** (rare chez Explorateur — INFJ exception) : itinéraire planifié strict
  - **P** (ENTP/ESTP/INFP) : improvisation, opportunités sur la route
- **Compagnons** : 0-3 compagnons (autres explorateurs, parfois animal-guide)
- **Persistance** : position sauvegardée toutes 5 min ([[Concepts Fondamentaux IA PNJ]] §10) — l'Explorateur peut être à n'importe quel point du continent

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche en ville

- **Comportement** :
  - **ENTP** : "Vous voulez savoir ce que j'ai vu sur la côte d'Azoria ? Asseyez-vous !"
  - **ESTP** : "Bon prix pour mon dernier relevé ?"
  - **INFP** : sourire silencieux, montre carnet sans parler
- **Reconnaissance +75** : propose **partenariat** (joueur peut accompagner expédition — donneur de quête majeur)
- **Reconnaissance -50** : refuse de parler de ses découvertes (les protège)

### 6.2 Climat extrême (Mode Crise)

- **Trigger** : `WeatherExtreme`
- **Branche BT** : `Routine.Survive` (refuge, isolation thermique, économie ressources)
- **Comportement** : creuse abri (neige), grimpe (inondation), allume feu rituel
- **MBTI N** (ENTP/INFP) : anticipe avant survenue ; **S** (ESTP) : réagit au déclenchement
- **Mood** : `Fatigue +30` ; `Peur +10` mais reste calme (préparation)

### 6.3 Souffle / changement d'Ère

- **Eldoria** : zones du sud ouvertes, opportunité majeure — Explorateur en fête
- **Tempora** : géographie instable — frustration ENTP/ESTP, fascination INFP/INTJ
- **Climata** : passes glaciaires nouvelles, missions hivernales lucratives
- **Donneur de quête** : Souffle déclenche **génération de side-quests** "Explorer la zone révélée par le Souffle"

### 6.4 Découverte majeure (Mode Quête)

- **Trigger** : `DiscoveryMajor` (site ancien, cité, phénomène)
- **Comportement** : retour ville urgent (sprint), annonce publique au [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] et [[Bibliothécaire]]
- **Génère side-quest** "Aller voir le site avec moi" (joueur peut accepter)
- ENTP raconte au public, ESTP marchande première offre, INFP écrit récit poétique

### 6.5 Rencontre créature en zone inconnue

- **Trigger** : `DangerDetected` créature
- **Comportement** : **fuite priorisée** (Explorateur n'est pas chasseur — pas équipé pour combat majeur)
- **Mémoire** : note la créature, espèce, comportement → revend info au [[03 - Mécaniques/Métiers/Exploration/Chasseur de créature|Chasseur de créature]] ou [[Bestiaire - Index]]

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (rare — souvent itinérant unique) ou Nommé authored (2-5 par grande nation)
- **Mort transient/famille** : 14 jours → relevés inachevés, side-quest "Le carnet perdu"
- **Mort nommé authored** : permanente, **forte génération de quêtes** ("Récupérer la carte de [Nom]")
- **Apprenti** : rare (métier solitaire) — 0-1, accompagne en expédition
- **Héritage** : un Maître peut être lié à une **découverte signature** (cité, route, espèce) inscrite aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Mosrack** (libre) | Aventurier indépendant, contrats privés | ENTP | Tous terrains |
| **Lumasar** (académique) | Explorateur-naturaliste | ENTP | Faune/flore inconnues |
| **Pyrtara** (frontières) | Audacieux, frontière hors-la-loi | ESTP | [[No man's land]], territoires interdits |
| **Trinoria** (sylvestre) | Communion forestière, [[Lore/Religions/Vael'Kurash]] | INFP | Forêts conscientes |
| **Skaldoria** (toundra) | Survie hivernale extrême | ESTP | Toundra, désert de glace |

### Signatures PNJ (Phase 4 stub)

- **Erevan le Vagabond** (ENTP Maître, Mosrack) — premier à traverser le [[No man's land]] central
- **Maître Asravim** (ENTP Maître, Lumasar) — naturaliste, auteur "Faunes des Onze Continents"
- **Yulia la Givrée** (ESTP Maître, Skaldoria) — exploratrice de la Toundra du Nord
- **Sylvain le Silencieux** (INFP Maître, Trinoria) — communion avec forêts d'Ilthara

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Exploration/Explorateur|Explorateur (gameplay)]] · [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]] · [[03 - Mécaniques/Métiers/Exploration/Navigateur|Navigateur]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de trésors|Chasseur de trésors]] · [[03 - Mécaniques/Métiers/Exploration/Dresseur|Dresseur]] · [[Bibliothécaire]]*
