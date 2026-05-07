---
tags: [pnj, comportement, métier, éleveur, ia]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Agriculture et Élevage/Eleveur de créature]]
mbti_typique: [ISFJ, ENFJ, ISTP, ISFP, INFJ]
karma_typique: vert
factions_compatibles: [Guilde des Élevages Galenor, Cavaliers du Vent Aerion, Foedus Animae, Maisons aristocratiques équestres]
needs_review_for: [calibration-playtest, branche-créatures-rares-post-Souffle]
---

# 🐎 Comportement PNJ — Éleveur de créature

> Template de comportement IA pour les PNJ Éleveurs d'Hybelior. Applique [[Concepts Fondamentaux IA PNJ|les 20 Concepts Fondamentaux]] et [[Actions Situationnelles]] à un métier de **patience et de lignées** avec **double cycle** (élevage classique + créatures rares post-[[Le Souffle|Souffle]]).
>
> **Métier gameplay (paliers, recettes, économie)** : voir [[03 - Mécaniques/Métiers/Agriculture et Élevage/Eleveur de créature]].

---

## 1. Vue d'ensemble

L'Éleveur-PNJ est un **patient de lignées** : il pense en générations, pas en journées. Profil psychologique dominant : **calme, observateur, lié émotionnellement aux créatures, transmetteur de savoir**. Branche [[Bestiary/Index|Bestiaire]] forte : double pratique entre **bétail standard** (équidés, bovidés, aviens) et **créatures rares post-Souffle** (variants, créatures cosmiques apprivoisables — cf. [[Le Lien]]).

Modèle d'IA : §1 BT racine + Utility AI (cf. [[Concepts Fondamentaux IA PNJ]] §1). Mode dominant **Routine** + interactions intenses NPC↔créature (extension §19). Combat défavorable (peu armé sauf lasso/aiguillon), mais peut **lancer ses créatures** en défense passive.

---

## 2. Cycle quotidien spécifique au métier

> Adapte [[Routine Quotidienne]]. Cycle saisonnier pivotant (saillies au printemps, naissances été/automne).

```
[05:00] Lever — traite, ouverture étables
[05:30–09:00] Soins, alimentation, observation portées (boucle anim 8s par créature)
[09:00–12:00] Sortie pâturage / dressage de base / cycles reproduction
[12:00–13:00] Pause repas chez soi (souvent près des étables)
[13:00–17:00] Entretien enclos, suivi reproduction, mise à jour Carnet de lignée
[17:00–19:00] Rentrée bétail, dernier nourrissage
[19:00–22:00] Repas / loisir / coucher
```

**Lieux propres** :
- `etable_main` (étable principale)
- `volière` (aviens, créatures volantes)
- `enclos_pâturage` (sortie diurne)
- `couvoir_maternité` (naissances)
- `salle_reproduction` (croisements, palier Adepte+)
- `livre_lignée` (registre, animation read_book 5s)

**Tâches métier intégrées** :
- T3.A — Traire (palier Novice, anim 6s) → produit `Lait`
- T3.B — Nourrir (anim verser_grain 4s, par créature)
- T3.C — Observation comportement (Acuité, anim observe_animal 10s) → détecte maladie / chaleurs
- T3.D — Sélection croisement (palier Adepte+, anim 15s, table de planification)
- T5.A — Soins vétérinaires (palier Initié+, anim 8s)
- T5.B — Mise à jour `Carnet de lignée` (palier Initié+, anim 12s)

---

## 3. MBTI typique du métier

| Type | Justification |
|------|---------------|
| **ISFJ** (Défenseur) | Service maternel aux animaux, mémoire de chaque bête par son nom, transmission familiale |
| **ENFJ** (Protagoniste) | Éleveur charismatique, rassemble les Cavaliers du Vent, lien émotionnel fort aux créatures |
| **ISTP** (Virtuose) | Éleveur pragmatique, mécanicien de l'élevage, gère seul une grande exploitation |
| **ISFP** (Aventurier) | Éleveur-poète, lien profond aux créatures rares, ouvert au [[Foedus Animae|pacte]] |
| **INFJ** (Avocat) | Éleveur-mystique, spécialiste créatures rares post-Souffle, [[Le Lien]] possible |

**Sous-représentés** : ESTJ (Directeur — trop autoritaire pour des animaux qui demandent patience), ENTP (Innovateur — trop dispersé pour un cycle pluriannuel).

**Modulateurs spécifiques** :
- **F × J** ×1.4 sur `Help.Animal.Soin` (lien émotionnel + structure)
- **N** ×2.0 sur probabilité d'apprivoiser créature rare post-Souffle (mystique vs pratique)
- **S** ×1.3 sur sélection croisement classique (lecture sensorielle des chaleurs)

---

## 4. Triggers spécifiques au métier

```yaml
trigger:
  id: AnimalGivesBirth
  source_concept: [§4_emotion, §18_lifecycle]
  conditions:
    - creature.gestation_complete == true
  immediate_branch: Routine.AssistBirth
  effect: suspend autres tâches 2h, mood Joy +30 si succès, Mood Tristesse +40 si mort-né
  mbti_modulation: { F: { Joy_amplification: ×1.5, Tristesse_amplification: ×1.5 } }

trigger:
  id: AnimalSick
  source_concept: [§4_emotion, §15_quetes]
  conditions:
    - creature.health < 50%
  utility_score: { Help.Animal.Soin: +60, Routine.Continue: -30 }
  effect: appelle [[Apothicaire]] ou [[Médecin]] si gravité haute → side-quest générée

trigger:
  id: PostSouffleVariantBornInLitter
  source_concept: [§14_eres, §17_authoring]
  conditions:
    - era_state.post_souffle == true
    - rng.roll < creature_variant_chance(palier_éleveur)
  immediate_branch: Routine.IsolateVariant
  effect: weight 100 mémoire individuelle, alerte Faction (Guilde/Foedus/Cavaliers)
  mbti_modulation: { N: { excitation: +1, isolement_protectif: +1 }, S: { méfiance: +1, observe_avant_décision: +1 } }

trigger:
  id: PredatorNearbyHerd
  source_concept: [§2_perception, §16_combat]
  conditions:
    - predator.distance < 30m
    - predator.threat_level > 30
  immediate_branch: Combat.Defense.Animal OR Help.Berger.Coordination
  utility_score: { Combat.Defense.Animal: +40 (T+J), Combat.Hide: +30 (F+P) }

trigger:
  id: BergerBringsBackLambs
  source_concept: [§5_graphe_social, §19_npc_interaction]
  conditions:
    - berger_npc.distance < 5m
    - berger_npc.cargo == "lambs"
  utility_score: { Social.Talk.Coordination: +30 }
  effect: scène scriptée NPC↔NPC §19 si pas de joueur observant

trigger:
  id: PlayerWantsToBuyMount
  source_concept: [§7_reputation, §1_utility]
  conditions:
    - player.distance < 5m
    - player.dialogue_intent == "buy_mount"
  utility_score: { Social.Trade: +50 }
  effect: lance Mode Marchand variant "vente vivant" ; prix x3 si rep < 0, x0.7 si rep > 75
  mbti_modulation: { F: { teste_le_joueur_pour_protection_animal: oui } }

trigger:
  id: BoucherRequestsAbattage
  source_concept: [§5_graphe_social, §13_religion]
  conditions:
    - boucher_npc.message == "abattage_demandé"
  utility_score: { Help.Boucher: +30 (T), -20 (F) }
  effect: MBTI F refuse souvent, redirige vers autre éleveur ; MBTI T accepte rationnellement
```

---

## 5. Modes contextuels propres

| Mode | Usage typique chez l'Éleveur |
|------|------------------------------|
| **Routine** | ~75% du temps (cycle journalier patient) |
| **Marchand** | Variant "vente vivant" : bête livre vivante, dialogue long (acheteur teste) |
| **Dialogue** | Riche — l'éleveur a beaucoup à raconter (lignées, anecdotes), MBTI E surtout |
| **Crise** | Défense par les créatures elles-mêmes (chien, cheval ruant) ; éleveur lui-même fuit ou se cache |
| **Festivité** | Atténué : continue traite matinale puis rejoint (impossible de manquer la traite) |
| **Religieux** | Forte composante [[Foedus Animae]] (pacte avec créatures intelligentes) ou [[Spiritus]] |
| **Deuil** | Particulier — peut concerner **mort d'une bête phare** (cheval signature) → mood -15 baseline 7j |
| **Quête** | Donneur fréquent : "trouver le bélier perdu", "apprivoiser un variant", "convoyer monture rare" |

**Cas particuliers** :
- **Branche post-Souffle créatures rares** : lorsque l'éleveur est palier Expert+ ET ère post-Souffle active, **double routine** : matin standard + après-midi dédié aux variants (étable isolée, communication mystique).
- **Mode Religieux profond** : éleveur [[Foedus Animae]] traite ses chevaux comme partenaires de pacte — tabou abattage, scène scriptée si Boucher insiste.

---

## 6. Réactions situationnelles signature

### 6.1 Présence joueur (§5.1)
- **Reconnaissance neutre** : présentation des bêtes, prix standards. MBTI **F** observe comment le joueur se comporte avec les créatures avant d'accepter de vendre (test moral implicite).
- **Reconnaissance +75** : montre le couvoir, propose monture rare cachée, anecdotes de lignées.
- **Reconnaissance -50** : refuse de vendre les créatures phares, ne propose que les communes.
- **Karma rouge** : refuse toute vente (le joueur tuerait l'animal), trigger Peur +30.

### 6.2 Attaque sur ville (§5.2)
- **Priorité 1** : rassembler les créatures à l'abri (étables fermées). MBTI **J** rigoureux, **P** chaotique mais efficace.
- **Pas de combat direct** sauf via créatures (chien de garde, étalon agressif).
- **MBTI F** : reste avec les bêtes au péril de sa vie (tabou abandon).

### 6.3 Festival (§5.3)
- **Foire annuelle aux montures** (cohérent §19 marchand annuel récoltes) : **événement majeur** pour l'éleveur — Mode Festivité + Marchand combinés, place centrale.
- **Festival commun** : participation atténuée (la traite ne s'arrête pas).

### 6.4 Climat (§5.4)
- **Pluie** : rentre bétail à l'abri, protège les jeunes (mortalité jeunes critique).
- **Tempête** : Mode Crise pour le bétail (panique des chevaux), trigger `WeatherStormStarting` → assist_animals priorité absolue.
- **Sécheresse** : -25% naissances ([[Concepts Fondamentaux IA PNJ]] §14 Climata-like), achat fourrage cher → mood -15.
- **Phénomène cosmique** : MBTI **N+F** observe les **réactions des créatures** avant les humains (les bêtes sentent l'ère tourner).

### 6.5 Souffle / Ère (§5.5)
- **Modulation paramétrique** :
  - Verdoiement : +30% fertilité, mood Joy +20
  - Sommeil de Glace : -25% naissances, focus animaux résistants
  - Vents (Aerion) : aviens +30% performance
  - Brume Mortelle : variants morbides apparaissent (opportunité Expert+)
- **Post-Souffle** : surveillance accrue des portées (chance variant), MBTI **N** spéculatif, **S** méfiant.
- **Templates alternatifs §5.5.2** : éleveur Expert+ devient détenteur de **lignées d'ère** (recherché par nobles, [[L'Accord]] Héritage).

### 6.6 Pénurie / abondance (§5.6)
- **Pénurie fourrage** : **drame** — l'éleveur sacrifie d'abord ses propres rations, puis abat les bêtes les plus faibles (MBTI **T** rationnel, **F** larmes).
- **Abondance** : surplus laitier, fromages affinés, naissances multiples → moments fastes.

### 6.7 Deuil (§5.7)
- **Spécificité** : le deuil **inclut les créatures**. Mort d'un cheval signature = mood -15 baseline 14 jours pour MBTI **F** (cf. §5 graphe étendu aux créatures pour les éleveurs).
- **MBTI F** ×1.5 : peut développer Mode Deuil pour bête perdue, ce qui est inhabituel pour les autres métiers.
- Si meurtre d'une créature par joueur : Memory.Public.PlayerKilledLivestock weight 100 → -100 individuel, propagation village.

### 6.8 Quête (§5.8)
- **Donneur fréquent** :
  - "Apprivoiser un variant post-Souffle" (T_SaveAnimal, F+N) — MBTI INFJ/ISFP
  - "Retrouver l'étalon échappé" (T_FindLost, F+S) — MBTI ISFJ/ENFJ
  - "Convoyer monture rare à un noble" (T_DeliverGoods, T+S) — MBTI ESTJ/ISTP
  - "Diagnostiquer maladie mystérieuse du troupeau" (T_Investigate, T+N) — MBTI INFJ
- **Branche [[Bestiaire]]** : génère quêtes liées aux créatures qu'il connaît (modulation §15).

---

## 7. Lifecycle PNJ

**Apprenti** : valet d'écurie, vacher rural — apprend chaleurs, portées, maladies. 14-22 ans.

**Maître** : ferme isolée ou domaine seigneurial. Le palier Maître débloque l'**élevage de créatures rares post-Souffle** (Magistral+).

**Successeur** :
- Transmission **familiale ou apprenti adopté** (très commun car métier de patience).
- Cycle ~25-35 ans gameplay réel.
- Le **carnet de lignée** est l'objet patrimonial transmis (cf. [[L'Accord]] Héritage).

**Mort** :
- Si éleveur mort sans successeur : créatures **dispersées** (vendues, libérées si pacte [[Foedus Animae]]) → trigger `Memory.Public.LineageLost` weight 80.
- Lignées signées peuvent **disparaître** (impact économique régional).

---

## 8. Variantes culturelles & signatures PNJ

| Pays | Variante | Signature MBTI / Profil |
|------|----------|-------------------------|
| **Galenor** | Éleveur de chevaux de prestige (Maisons aristocratiques) | ESTJ-like (rare) ou ISFJ |
| **Aerion** | Cavalière des plaines, aviens et chevaux légers | ENFP-like (rare) ou ENFJ — voyageuse |
| **Climata** | Éleveur de bêtes résistantes au froid (yacks, rennes) | ISTJ taciturne |
| **Cendara** | Éleveur de créatures volcaniques (variants Eldoria) | ISFP mystique |
| **Onara** | Éleveur-prêtre [[Foedus Animae]] — créatures de pacte | INFJ, refuse abattage |

**PNJ canoniques nommés** (cohérent fichier source §10) :
- *Master Yorwen d'Aldraan* — chevaux de course de prestige international, ESTJ
- *Vespera la Cosmique* — éleveuse de créatures variants post-Souffle, controversée, INFJ-like, [[Le Lien]] forte

---

*Liens : [[NPC Behaviors/Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]] · [[03 - Mécaniques/Métiers/Agriculture et Élevage/Eleveur de créature|Éleveur (gameplay)]] · [[Berger]] · [[Bestiary/Index]] · [[Le Lien]] · [[Foedus Animae]]*
