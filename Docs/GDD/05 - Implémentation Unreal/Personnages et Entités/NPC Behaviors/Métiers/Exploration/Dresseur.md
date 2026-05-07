---
tags: [pnj, comportement, métier, exploration, dresseur, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Exploration/Dresseur|Dresseur]]"
mbti_typique: [ENFP, INFP, ISFP]
karma_typique: vert
factions_compatibles: [Vael'Kurash, Foedus Animae, Via Ventus, Trinoria sylvestre, Onara plaines]
catégorie_métier: Exploration
status: drafted
last_review: 2026-05-01
needs_review_for: [doublon-Dresseur-vs-Dresseur-de-créature-M2-Artisanat, calibration-mbti-playtest]
---

# 🦅 Template PNJ — Dresseur (terrain)

> Comportement situationnel d'un PNJ Dresseur **terrain** (apprivoisement sauvage). Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. Métier joueur : [[03 - Mécaniques/Métiers/Exploration/Dresseur|Dresseur]].
>
> ⚠️ **Frontière à valider** : voir §1.bis. Le **Dresseur de créature** (M2 Artisanat) traite l'élevage en captivité ; le **Dresseur** (M6 Exploration, ce fichier) traite l'apprivoisement sauvage.

---

## 1. Vue d'ensemble

Le Dresseur est le **rabatteur de l'inconnu** : il part dans la nature, approche des créatures sauvages, les capture vivantes ou les lie par confiance. **Profil émotionnel-empathique** dominant : extraverti chaleureux ou introverti sensible, lecteur intuitif du langage animal. Très mobile, souvent en sous-mode Itinérant pendant les phases d'apprivoisement (3-14 jours en forêt/savane).

- **Identité comportementale** : empathe animal, patient, douceur ferme, peu hiérarchique
- **Position sociale** : aventurier respecté mais marginal (pas tout à fait artisan, pas tout à fait combattant)
- **Slot Mode Marchand** : ponctuel, à l'arrivée d'un spécimen apprivoisé (vente directe à [[Eleveur de créature]] ou noble)
- **Lien chaîne** : amont [[Apothicaire]] (phéromones), [[Forgeron]] (filets, lassos) · aval [[Eleveur de créature]], [[Dresseur de créature]] (M2 Artisanat — atelier), arènes, montures pour aventuriers

### 1.bis Frontière Dresseur (M6) vs Dresseur de créature (M2 Artisanat)

> [!warning] Doublon en clarification
> - **Dresseur (M6, ce fichier)** = travail **dans la nature sauvage** : pister, approcher, capturer, premier lien — métier mobile, statut d'aventurier
> - **Dresseur de créature (M2 Artisanat)** = travail **en chenil/écurie** : conditionnement avancé, dressage de combat/spectacle, breeding — métier sédentaire d'artisan
>
> Les deux sont **complémentaires** : le M6 fournit le spécimen vivant, le M2 le conditionne pour son rôle final. Si playtest démontre redondance, fusionner avec sous-spécialités "branche exploration" / "branche atelier".

---

## 2. Cycle quotidien

### Cycle camp (basé en village, planning d'approche)

```
05:30  Lever, examen des appâts/phéromones, soin animaux compagnons
06:00  Préparation du matériel d'approche (lasso, filet, sifflet)
07:00  Marche vers terrain d'observation (poste d'affût, 30 min)
07:30  Observation longue (anim 30-60 min statique — Acuité)
12:00  Retour camp, déjeuner
13:00  Phase d'approche progressive (anim approche_lente, sifflet doux)
17:00  Retour camp, débriefing avec compagnon-PNJ s'il y en a
19:00  Repas, jeu/dressage avec spécimens en cours
21:30  Coucher tôt
```

### Cycle expédition (sous-mode Itinérant, 3-14j)

Pas de retour quotidien — campement permanent près de la zone de l'animal cible. Réveil pré-aube, journée entière en observation/approche, sommeil léger.

> Voir `tame_camp`, `observation_post`, `lure_storage`, `pen_temporaire` pour ancres spatiales.

---

## 3. MBTI typique

| Type | Profil dresseur | Note |
|------|-----------------|------|
| **ENFP** | Dresseur charismatique, lien fort avec animaux, raconteur d'histoires | Le défaut canonique |
| **INFP** | Dresseur poète, communion silencieuse, refuse animaux pour combat | Trinoria, Onara |
| **ISFP** | Dresseur artiste, sensible aux nuances comportementales, solitaire | Plaines / forêts profondes |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **F** (commun) : empathie animal forte, refuse contrats cruels, prix flexibles
- **N+F (ENFP/INFP)** : lecture intuitive du langage animal, rituel d'approche unique
- **S+F (ISFP)** : focus sensoriel concret (odeur, mouvement, posture)
- **E vs I** : ENFP bavard, raconte ses prises ; INFP/ISFP silencieux, communion intérieure
- **P** (commun) : adapte plan d'approche selon l'animal (pas de planification rigide)

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **AnimalSighted** | Cible repérée à `awareness_zone < 50m` | Bascule `Routine.Approach` (lente, silence) |
| **AnimalApproachSuccess** | Distance < 5m + comportement non-fuyant | Bascule `Routine.TameAttempt` (sifflet, phéromone, appât) |
| **AnimalAggression** | Cible attaque le dresseur | Court-circuit P1 → `Combat.Flee` ou `Combat.Subdue` non-létal |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m + animaux compagnons | Mood -20 ; appelle compagnons pour défense passive |
| **ExpeditionTrigger** | Commande spécimen reçue ou cible identifiée | Bascule sous-mode `Itinérant` (§5) |
| **TameSuccess** | Lien ≥ seuil créature | +30 mood, retour ville pour vente |
| **CompanionInjured** | Animal compagnon blessé | Mood -40, soigne immédiatement (Apothicaire branch) |
| **EraSouffleBroadcast** | Nouveau Souffle | Comportement faune modifié — adaptation, parfois retraite |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Camp ou approche | Observation, soin compagnons |
| **Itinérant** | Expédition apprivoisement | Voyage, campement, observation longue |
| **Marchand** | Spécimen apprivoisé prêt à vendre | Présente animal à acheteur ([[Eleveur de créature]], noble, joueur) |
| **Dialogue** | Échange avec collègue ou client | Bavard sur les bêtes (ENFP), silencieux (INFP/ISFP) |
| **Crise** | ThreatLevel ≥ 50 | Fuit avec compagnons ; combat défensif si MBTI **F** protège animal |
| **Festivité** | Festival local | Présente animaux dressés (parade), ENFP brille |
| **Religieux** | [[Vael Kurash]] / [[Lore/Religions/Foedus Animae]] (pacte animal) | Rituel d'offrande à l'esprit local, bénédiction des bêtes |
| **Deuil** | Mort d'un compagnon animal | Forte affliction (-30 mood 7j), cérémonie de sépulture animale |

Cascade priorité : Crise > Religieux > Itinérant > Marchand > Routine.

### 5.bis Sous-mode Itinérant (cycle apprivoisement long)

- **Pas de domicile fixe** durant 3-14 jours d'expédition
- **Cycle adapté** : réveil pré-aube, journée d'observation/approche, sommeil léger en campement
- **Modulation MBTI** : **P** (commun aux 3 types) **improvise** selon comportement animal — pas de rigidité ; mais ENFP planifie tactique sociale (communiquer avec villageois alentour pour info), INFP/ISFP planifient terrain
- **Compagnons animaux** restent avec le dresseur en expédition

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche

- **Trigger** : `CustomerApproach`
- **Comportement** : ENFP "Bonjour, vous cherchez une bête ? Regardez ce faucon, il a un caractère !" — INFP/ISFP montre silencieusement
- **Reconnaissance +75** : raconte l'histoire de chaque animal, propose lien gratuit (un compagnon offert)
- **Reconnaissance -50** : refuse de vendre (méfiance pour le sort de l'animal)

### 6.2 Attaque sur village (Mode Crise)

- **Trigger** : `RaidOnVillage`
- **Branche BT** : `Combat.Flee` avec compagnons, OU `Combat.Defense` si compagnons combatifs (Adepte+ Maîtrise)
- **Comportement** : siffle ralliement, fuit en groupe ; un MBTI **F+J** (rare INFJ exception) peut sacrifier sa fuite pour libérer les autres animaux

### 6.3 Souffle / changement d'Ère

- **Eldoria** : faune luxuriante, opportunité de captures rares ; mood +15
- **Noctis** : créatures plus agressives la nuit ; cycle inversé partiel (sortie crépusculaire)
- **Climata** : faune en hibernation/migration — saison creuse, focus dressage spécimens existants
- **MBTI N+F (ENFP/INFP)** : interprétation mystique du Souffle ("les bêtes savent avant nous")

### 6.4 Mort d'un compagnon animal

- **Trigger** : `CompanionDeath`
- **Mood** : -40 (extrême pour MBTI **F**)
- **Comportement** : 7 jours de deuil (cycle ralenti), cérémonie funéraire ([[Lore/Religions/Foedus Animae]] pacte animal — forte adhérence)
- **Mémoire** : weight 100 ; rancune envers cause de la mort

### 6.5 Apprivoisement réussi (mode Quête narrative)

- **Trigger** : `TameSuccess` sur créature rare/mythique (Adepte+ Maîtrise)
- **Comportement** : retour triomphal au village, raconte l'histoire (ENFP), donneur de quête (joueur peut récupérer animal pour mission)

---

## 7. Lifecycle PNJ

> [[Concepts Fondamentaux IA PNJ]] §9 + §18.

- **Catégorie** : Famille de génération (souvent itinérant) ou Nommé authored (rare — 0-1 par grande ville)
- **Mort transient/famille** : 7 jours gameplay → apprenti reprend si formé ; sinon les compagnons s'enfuient (libérés)
- **Mort nommé authored** : permanente, side quest "Les bêtes du dresseur" (libération ou recapture)
- **Apprenti** : 0-1 apprenti (transmission du langage animal — long apprentissage)
- **Héritage** : un Dresseur-Maître peut être lié à une **bête signature** (compagnon mythique légendaire) inscrit aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par nation

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Trinoria** (sylvestre) | Communion forestière, [[Vael Kurash]] | INFP | Apprivoisement loups, cervidés, oiseaux forestiers |
| **Onara** (plaines) | Cavalier-dresseur, équidés sauvages | ENFP | Chevaux de plaine, faucons |
| **Cendara** (volcanique) | Apprivoiseur de bêtes ignées | ISFP | Salamandres, créatures de feu |
| **Aerion** (vents) | Fauconnier des hauteurs, [[Lore/Religions/Via Ventus]] | ENFP | Aviens, montures volantes Phase 4 |
| **Pyrtara / frontières** | Dresseur de bêtes mythiques (rare) | INFP Maître | Créatures mythiques, [[Bestiaire]] tier élevé |

### Signatures PNJ (Phase 4 stub)

- **Lyssa Voix-de-Lune** (ENFP Maître, Trinoria) — communion avec les loups gris
- **Tarek le Cavalier-Vent** (ENFP Maître, Onara) — fauconnier royal
- **Veska de Cendara** (ISFP Maître) — apprivoise les salamandres ignées
- **Ulvar le Silencieux** (INFP Maître-Légende) — dompteur de la dernière Manticore

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Exploration/Dresseur|Dresseur (gameplay)]] · [[Dresseur de créature]] (M2 Artisanat) · [[Eleveur de créature]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de créature|Chasseur de créature]] · [[Apothicaire]] · [[Bestiary/Index]]*
