---
tags: [pnj, comportement, métier, exploration, cartographe, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]]"
mbti_typique: [INTJ, INTP, ISTJ]
karma_typique: vert
factions_compatibles: [Lex Petra, Ordo Caelum, Galenor impérial, Lumasar académique, Solena marchand, Tyndara marchand]
catégorie_métier: Exploration
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, cycle-cabinet-vs-terrain, sous-mode-itinérant]
---

# 🗺️ Template PNJ — Cartographe

> Comportement situationnel d'un PNJ Cartographe. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. Métier **pivot cabinet/terrain** : alterne semaines de scriptorium et semaines de relevés en expédition. Métier joueur correspondant : [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe]].

---

## 1. Vue d'ensemble

Le Cartographe est le **scribe de l'espace** — un esprit méthodique qui transforme observations brutes en cartes lisibles. Son comportement IA est **bicéphale** : 80% du temps en **mode cabinet** (scriptorium, table à dessin, archives — sédentaire, calme, concentré), 20% en **mode terrain** (relevés courts en expédition pour vérifier un croquis ou compléter une zone — voyage 3-7 jours gameplay).

- **Identité comportementale** : analyste silencieux, perfectionniste, focus prolongé, peu sociable
- **Position sociale** : artisan respecté de la connaissance, partenaire commercial des [[03 - Mécaniques/Métiers/Exploration/Explorateur|Explorateurs]] et [[03 - Mécaniques/Métiers/Exploration/Navigateur|Navigateurs]]
- **Slot Mode Marchand** : ouvre à la vente de cartes 1-2 fois par semaine (jours fixes pour MBTI **J**)
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Exploration/Explorateur|Explorateur]] / [[03 - Mécaniques/Métiers/Exploration/Navigateur|Navigateur]] (relevés bruts) · aval [[Bibliothécaire]], [[Marchand]], joueurs aventuriers, [[Architecte]] (plans urbains)

---

## 2. Cycle quotidien

### Cycle cabinet (semaine standard, ~80% du temps)

```
06:30  Lever, petit-déjeuner solitaire (lecture des notes de la veille)
07:00  Scriptorium — relecture des relevés bruts (T1)
08:00  Tracé fin (T3 spécialisé : tracé encre, projection)
12:00  Pause déjeuner (15 min, frugale)
12:15  Reprise tracé / colorisation (T5)
16:00  Mode Marchand 1×/sem (jeudi typique J ; aléatoire P)
17:00  Archive / mise à jour atlas
19:00  Repas + lecture (rare visite à la taverne — ENTP/INTJ exception)
21:30  Coucher
```

### Cycle terrain (1 semaine sur 4-5)

```
04:30  Lever pré-aube, équipement (boussole, vélin, théodolite)
05:00  Voyage vers zone à vérifier (cheval ou marche)
Halte midi : croquis sur place + déjeuner sec
Soir : campement, croquis nocturne (étoiles si Adepte+)
Retour : 2-3 jours plus tard, bascule cabinet pour intégrer relevés
```

> Voir `scriptorium`, `drawing_table`, `archive_cartographique`, `field_camp_kit` pour ancres spatiales.

---

## 3. MBTI typique

| Type | Profil cartographe | Note |
|------|--------------------|------|
| **INTJ** | Cartographe royal, projection géodésique stricte, peu loquace | Le défaut canonique (Galenor, Lumasar) |
| **INTP** | Cartographe-théoricien, expérimente projections nouvelles | Académique (Lumasar) |
| **ISTJ** | Cartographe de guilde marchande, cartes itinéraires précises | Solena/Tyndara |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **I** (commun) : mode Marchand laconique, dialogue technique uniquement
- **N+T** (INTJ/INTP) : forte spéculation aux Souffles (cartes deviennent obsolètes — frustration intellectuelle)
- **S+T** (ISTJ) : focus pratique, peu de spéculation, prix rigides
- **J vs P** : INTJ/ISTJ adhérence stricte au calendrier ; INTP plus souple, peut prolonger une session passionnante

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **CabinetSession** | `wake_time` atteint + jour cabinet | Ouvre scriptorium, T1 relecture |
| **TerrainExpedition** | Date prévue OU relevé urgent commandé | Bascule sous-mode `Itinérant` (§5) |
| **ExplorerBringsRaw** | [[03 - Mécaniques/Métiers/Exploration/Explorateur|Explorateur]] PNJ/joueur < 5m + cargo `relevé_brut` | `Routine.Pause` → bascule Mode Marchand variant "achat relevé" |
| **MapSold** | Joueur achète carte ≥ 100 Éclats | Mood +5, +1 Memory weight 30 |
| **EraSouffleBroadcast** | Nouveau Souffle | Cartes obsolètes en partie ; recalcul `production_modifier`, frustration MBTI **J** |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m | Mode Crise — fuit (pas d'arme en cabinet) |
| **CelestialEvent** | Éclipse / convergence | Ouvre cahier d'observation (croquis astral) |
| **ClientVIP** | Noble ou Architecte arrive avec commande exclusive | Bascule Mode Quête (commande spéciale) |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Cabinet ou terrain selon cycle | Tracé / archive / relevé |
| **Marchand** | Joueur arrive en heures ouverture (1-2j/sem) | Présente carte du jour, prix selon Reconnaissance |
| **Itinérant** | Cycle terrain (§ infra) | Voyage, halte midi, campement soir, pas de domicile fixe |
| **Dialogue** | Échange technique avec Explorateur ou collègue | Factuel, longue durée si sujet d'intérêt (INTP) |
| **Crise** | ThreatLevel ≥ 50 | **Fuit** — pas d'arme, sauve les cartes en priorité ([[Concepts Fondamentaux IA PNJ]] §6 MBTI **J** sauvegarde œuvre) |
| **Festivité** | Festival local | Atténué (continue tracé matinal, rejoint le soir) |
| **Religieux** | Sabbat [[Lore/Religions/Lex Petra]] / [[Lore/Religions/Ordo Caelum]] | Suspend travail le temps du rituel |
| **Quête** | Commande spéciale (carte d'un noble, atlas pour bibliothèque) | Continue routine + dialogue spécifique |

Cascade priorité : Crise > Religieux > Itinérant > Marchand > Routine.

### 5.bis Sous-mode Itinérant (cycle terrain)

- **Pas de domicile fixe** durant la phase terrain (3-7 jours) — couche maison reset, dort en campement
- **Cycle adapté** : réveil 04:30 (voyage), halte midi tracé, campement 19:00
- **Modulation MBTI** : **J** (INTJ/ISTJ) **planifie** itinéraire la veille (carte d'expédition tracée, étapes prévues) ; **P** (INTP) **improvise** selon découvertes
- **Dialogue terrain** : très court, économise voix et énergie

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive (Mode Marchand)

- **Trigger** : `CustomerApproach` + heures ouverture cabinet
- **Comportement** : pose plume, montre carte du jour, ne se lève pas (INTJ/INTP) ; prix `rigidité_prix +30` (T)
- **Salutation** : INTJ "Vous cherchez une zone ?" — INTP "Hmm. Carte de quoi ?" — ISTJ "Bienvenue. Quelle région ?"
- **Reconnaissance +75** : montre cartes secrètes (donjons, routes commerciales protégées)

### 6.2 Attaque sur le village (Mode Crise)

- **Trigger** : `RaidOnVillage` ou attaque directe
- **Branche BT** : `Combat.Flee` priorité absolue (pas de combat, sauve les cartes)
- **Comportement** : enroule cartes maîtresses (anim `roule_atlas` 5s), saisit sacoche, fuit vers refuge
- **MBTI J (INTJ/ISTJ)** : prend les cartes signées en priorité ; **P (INTP)** prend ce qui est sous la main
- **Mémoire** : `Memory.Public.RaidOnVillage` weight 90 (cartes perdues = drame intellectuel)

### 6.3 Souffle / changement d'Ère

- **Trigger** : `EraSouffleBroadcast`
- **Effets paramétriques** ([[Concepts Fondamentaux IA PNJ]] §14) :
  - **Eldoria (Feu Endormi)** : routes du sud rouvertes, cartes redessinables, mood +10
  - **Tempora (Échos Brisés)** : géographie partiellement instable — cartes obsolètes, refonte massive ; frustration INTJ/ISTJ visible (mood -20, irritabilité)
  - **Climata** : nouvelles passes glaciaires à cartographier, opportunité d'expédition
- **MBTI N** (INTJ/INTP) : longue méditation sur l'instabilité du monde (rare flash poétique)
- **MBTI S** (ISTJ) : "Bon. Faut tout refaire. Au travail."

### 6.4 Relevé brut apporté par Explorateur

- **Trigger** : `ExplorerBringsRaw`
- **Comportement** : examine relevé (anim `examine_relevé` 15s, loupe), négocie prix (50-500 Éclats), achète si qualité OK
- **Lien graphe social** ([[Concepts Fondamentaux IA PNJ]] §5) : Explorateur souvent en `friends`/`partners` — Reconnaissance bonus

### 6.5 Découverte d'erreur cartographique

- **Trigger** : Cartographie révèle inexactitude (zone explorée à nouveau, désaccord avec relevé récent)
- **Effets** : MBTI **J** (INTJ/ISTJ) : irritation, refonte immédiate, mood -10 ; **P** (INTP) : curiosité intellectuelle, hypothèses
- **Side-quest générée** : "Vérifier la côte de [zone]" (joueur peut accepter)

---

## 7. Lifecycle PNJ

> [[Concepts Fondamentaux IA PNJ]] §9 + §18.

- **Catégorie** : Famille de génération (persistant) ou Nommé authored (1-3 par capitale)
- **Mort transient/famille** : 14 jours gameplay (plus long que Forgeron — succession savante) → apprenti devient maître ; reroll MBTI cohérent INTJ/INTP/ISTJ
- **Mort nommé authored** : permanente, side quest "L'atlas inachevé" générée
- **Apprenti** : 0-2 apprentis (transmission du tracé fin, des projections)
- **Héritage** : un Cartographe-Maître nommé peut signer un **Atlas Héritage** (atlas légendaire d'un continent) inscrit aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par nation

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Galenor** (impérial) | École royale, projection géodésique | INTJ | Cartes administratives, échelle stricte |
| **Lumasar** (académique) | Théorique, projections expérimentales | INTP | Atlas cosmiques, cartographie céleste |
| **Solena** (marchand) | Cartes marines + itinéraires commerciaux | ISTJ | Routes commerciales, vents, douanes |
| **Tyndara** (marchand) | Ligue des Marchands, cartes intercontinentales | ISTJ | Atlas inter-continentaux |
| **Ilthara** (sacré) | Cartes spirituelles (lieux sacrés superposés) | INFJ | Cartes-prières, géographie mystique |

### Signatures PNJ (Phase 4 stub)

- **Maître Aevran de Lumasar** (INTP Maître) — auteur de l'Atlas des Onze Constellations
- **Solenne la Géodésique** (INTJ Maître, Galenor) — cartographe royale, partenaire d'Aldric le Marteau-de-Mosrack
- **Branneck du Trois-Voiles** (ISTJ Maître, Solena) — cartes maritimes de référence
- **Yulia la Pèlerine** (INFJ Maître, Ilthara) — cartes-prières des routes sacrées

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Exploration/Cartographe|Cartographe (gameplay)]] · [[03 - Mécaniques/Métiers/Exploration/Explorateur|Explorateur]] · [[03 - Mécaniques/Métiers/Exploration/Navigateur|Navigateur]] · [[Bibliothécaire]] · [[Astronome]]*
