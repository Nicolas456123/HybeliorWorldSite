---
tags: [pnj, comportement, métier, meunier, ia]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Agriculture et Élevage/Meunier]]
mbti_typique: [ISTJ, ISFJ, ESTJ, INTP, ISTP]
karma_typique: vert
factions_compatibles: [Guildes meunières, Domaines seigneuriaux Galenor, Confréries Rota Mundi, Concordants L'Accord]
needs_review_for: [calibration-playtest]
---

# 🌾 Comportement PNJ — Meunier

> Template de comportement IA pour les PNJ Meuniers d'Hybelior. Applique [[Concepts Fondamentaux IA PNJ|les 20 Concepts Fondamentaux]] et [[Actions Situationnelles|Actions Situationnelles]] à un métier de **bottleneck local sédentaire** (pierre qui tourne, débit calé sur eau/vent/animal).
>
> **Métier gameplay (paliers, recettes, économie)** : voir [[03 - Mécaniques/Métiers/Agriculture et Élevage/Meunier]].

---

## 1. Vue d'ensemble

Le Meunier-PNJ est un **sédentaire méthodique** : il vit autour d'une machine (la meule) qu'il **écoute** plus qu'il ne la regarde. Profil psychologique dominant : **introverti, conscienciencieux, structuré**. Surdité fréquente (le bruit de la meule) → réception sociale particulière (parle fort, demande de répéter). Hub de pouvoir économique discret : la moitié du village dépend de son moulin. Faible exposition au combat, fuite ou défense passive.

Modèle d'IA générique appliqué : §1 BT racine + Utility Scorer (cf. [[Concepts Fondamentaux IA PNJ]] §1). Mode dominant : **Mode Routine** (cf. [[Actions Situationnelles]] §3) avec **Mode Marchand** ponctuel à la pesée des sacs.

---

## 2. Cycle quotidien spécifique au métier

> Adapte [[Routine Quotidienne]] §Tâches. Heures et lieux propres au métier.

```
[04:30] Lever — vérifier roue / voiles / mule (T1 réveil + T2 trajet court)
[05:00–05:30] Engagement de la meule, premier sac de grain versé
[05:30–12:00] Mouture matinale (boucle métier, anim engager_meule / verser_grain / ramasser_farine)
[12:00–13:00] Pause repas — chez soi ou logement adjacent au moulin
[13:00–17:00] Mouture après-midi + pesée clients (Mode Marchand ponctuel à chaque pesée)
[17:00–19:00] Entretien (graissage engrenages, taille des sillons des meules)
[19:00–21:00] Loisir court — lecture / famille / visite à la taverne
[21:00] Coucher tôt
```

**Lieux propres** :
- `mill_workspace` (zone meule + tamis + bluteau)
- `flour_storage` (sacs farine prêts)
- `grain_intake` (réception sacs grain de l'[[Agriculteur]])
- `mill_engine_room` (roue à eau / voiles à vent / mule attelée selon variante)
- `home_location` (souvent attenant au moulin)

**Tâches métier intégrées** dans T3/T5 de [[Routine Quotidienne]] :
- T3.A — Verser le grain dans la trémie (anim 5s répétée)
- T3.B — Surveiller la finesse de la mouture (Acuité, anim regarder_meule 10s)
- T3.C — Récolter la farine, ensacher (anim 8s)
- T3.D — Tamiser pour séparer son et farine fine (palier Initié+)

---

## 3. MBTI typique du métier

> 5 types **sur-représentés** chez les Meuniers (cf. [[Concepts Fondamentaux IA PNJ]] §6 + [[Actions Situationnelles]] §6).

| Type | Justification |
|------|---------------|
| **ISTJ** (Logisticien) | Routine ultra-stricte, registre des sacs pesés, mouture régulière, transmission familiale |
| **ISFJ** (Défenseur) | Service au village (chacun vient avec son grain), discret, mémoire des clients réguliers |
| **ESTJ** (Directeur) | Maître meunier qui dirige 2-3 aides, négocie avec seigneur (moulin banal Galenor) |
| **INTP** (Logicien) | Meunier-ingénieur qui optimise les engrenages, expérimente nouveaux mélanges |
| **ISTP** (Virtuose) | Meunier solitaire, mécanique pure, parle peu, répare lui-même |

**Sous-représentés** : ENFP (Inspirateur — pas le tempérament pour journées identiques), ENTP (Innovateur — trop dispersé pour un poste sédentaire à risque économique).

**Modulateurs spécifiques** (cohérents §6 MBTI) :
- **J × S** ×1.3 sur `Routine.Continue` : adhérence stricte aux heures de mouture
- **I** ×0.7 sur `Social.Greet` mais ×1.2 sur `Social.Talk` quand client connu (mémoire §3 individuelle)
- **T** ×1.2 sur `Mémoire.Stockage_Sacs` (mental ledger de qui a apporté combien)

---

## 4. Triggers spécifiques au métier

> Format YAML cohérent [[Actions Situationnelles]] §4.

```yaml
trigger:
  id: MoulinFlourLevelLow
  source_concept: [§1_utility, §15_quetes]
  conditions:
    - inventory.flour < threshold_resupply
  utility_score: { Routine.Continue.MoutureIntense: +30 }
  mbti_modulation: { J: { production_intensité: +20% } }

trigger:
  id: AgriculteurBringsGrain
  source_concept: [§5_graphe_social, §1_utility]
  conditions:
    - agriculteur_npc.distance < 5m
    - agriculteur_npc.cargo == "grain"
  utility_score: { Social.Trade.PeséeService: +50, Routine.Continue: -10 }
  mbti_modulation: { F: { dialogue_long: +1 }, T: { transaction_brève: +1 } }

trigger:
  id: WaterFlowChange
  source_concept: [§14_eres, §20_pathfinding]
  conditions:
    - mill_variant == "eau"
    - water_flow.delta > 30%
  immediate_branch: Routine.AdjustMillSpeed
  effect: production ±20%
  mbti_modulation: { S: { ajustement_rapide: +1 }, N: { observation_pré_ajustement: +1 } }

trigger:
  id: WindStallVent
  source_concept: [§14_eres, §13_religion]
  conditions:
    - mill_variant == "vent"
    - wind.speed < 5 km/h pendant 30 min
  immediate_branch: Routine.WaitForWind OR SwitchManualMode
  utility_score: { Routine.Continue: -50, Social.Talk.Voisin: +20 }

trigger:
  id: BoulangerOrderReceived
  source_concept: [§5_graphe_social, §15_quetes]
  conditions:
    - boulanger_npc.message == "commande_farine_fine"
  utility_score: { Routine.Continue.MoutureFine: +40 }
  duration: jusqu'à livraison

trigger:
  id: BronzeMillstoneWear
  source_concept: [§18_lifecycle, §10_persistance]
  conditions:
    - millstone.wear > 70%
  immediate_branch: Routine.MillstoneMaintenance
  effect: suspendre mouture 1 jour gameplay (entretien lourd)
  persistence: oui (état persisté §10)

trigger:
  id: PlayerBringsGrainForGrinding
  source_concept: [§7_reputation, §1_utility]
  conditions:
    - player.distance < 3m
    - player.has_item("céréale")
  utility_score: { Social.Trade.MoutureService: +35 }
  effect: lance Mode Marchand variant "service mouture" (10% du grain en commission)
```

---

## 5. Modes contextuels propres

> Référence [[Actions Situationnelles]] §3 catalogue 8 modes.

| Mode | Usage typique chez le Meunier |
|------|-------------------------------|
| **Routine** | Mode dominant ~80% du temps gameplay (mouture + entretien) |
| **Marchand** | Activé ponctuellement à chaque pesée (variant "service" : commission en grain plutôt qu'achat) |
| **Dialogue** | Court, souvent technique (qualité du grain, finesse demandée) |
| **Crise** | Rare — fuit derrière la meule ou alerte les voisins ; combat très défavorable (Vigueur OK mais pas d'arme) |
| **Festivité** | Atténué : continue mouture le matin (céréales prime), rejoint le soir si fête de récolte ([[Rota Mundi]] équinoxe) |
| **Religieux** | Pratique [[Rota Mundi]] (cycles = mouture liturgique aux solstices/équinoxes) ou [[Foedus Animae]] (mouture de serment pour pacte) |
| **Deuil** | Atténué : continue à moudre car le village dépend de lui ; intensifie le silence (déjà sourd, encore plus replié) |
| **Quête** | Donneur de side-quest "récupérer une meule de remplacement", "acheminer farine d'ère rare" |

**Cas particuliers** :
- **Mode Crise individuel** : si moulin en feu (incendie), priorité absolue P0 → sauve les sacs de farine et la meule signée (palier Maître), pas sa propre vie chez les MBTI **F+J** (loyauté à l'œuvre).
- **Mode Marchand variant "Service"** : le meunier ne vend pas, il **transforme**. La transaction = 10% du grain apporté. UI à adapter (cf. [[Modes Sociaux]] §Marchand).

---

## 6. Réactions situationnelles signature

> Ce qui distingue le Meunier dans les 8 catégories d'[[Actions Situationnelles]] §5.

### 6.1 Présence joueur (§5.1)
- **Reconnaissance neutre** : salut bref (parle fort à cause de la surdité — peut surprendre joueur).
- **Reconnaissance +75** : le meunier offre la mouture gratuite (commission = 0%) et raconte des rumeurs (tout le village passe ici).
- **Reconnaissance -50** : refuse de moudre le grain (excuse "la meule est usée"), prix pesée +30%.
- **MBTI I** : préfère pointer du doigt l'inventaire plutôt que parler.

### 6.2 Attaque sur ville (§5.2)
- **Bûcheron, Berger, Meunier** : tous trois en métiers ruraux peu armés → **fuite prioritaire**. Le Meunier **bloque la meule** (sécurise mécanisme) avant de fuir si MBTI **J**, fuit immédiatement si **P**.
- Tag `Memory.Public.MillThreatened` weight 80.
- Le moulin = **cible stratégique** pour bandits (priver le village de farine) → Garde locale priorité défense.

### 6.3 Festival (§5.3)
- **Fête de récolte** ([[Rota Mundi]] équinoxe automnal) : le meunier est **acteur central** (mouture rituelle pour le pain de fête). Suspend Mode Routine standard, bascule **Mode Religieux + Festivité combinés**.
- **Festival commun** : participation atténuée (continue mouture matinale puis rejoint le soir). MBTI **E** anime, **I** observe.

### 6.4 Climat (§5.4)
- **Pluie** : si moulin à eau, **+20% débit** (rivière haute) → opportunité économique. Si moulin à vent, neutre. Si traction animale, neutre.
- **Tempête** : moulin à vent **arrêté d'urgence** (risque casse), trigger `WindStallVent` → bascule réparation préventive. Moulin à eau peut être **submergé** (Mode Crise).
- **Sécheresse** : moulin à eau au ralenti (-50%), trigger pénurie farine → augmentation prix +50%.
- **Phénomène cosmique** : MBTI **N+F** voit signe dans la pierre qui chante différemment.

### 6.5 Souffle / Ère (§5.5)
- **Modulation paramétrique** ([[Concepts Fondamentaux IA PNJ]] §14) :
  - `wake_hour_offset = 0` (déjà très matinal)
  - `production_modifier` : Verdoiement +20%, Sommeil de Glace -30%, Vents +40% (moulin à vent)
  - `prices_modifier` : Dégénérescence +20% farine, Floraison -10%
- **Ère des Vents (Aerion)** : moulin à vent en pleine performance, recette "Farine du Voyageur" débloquée — meunier fier, anim animée.
- **Post-Souffle** : rouille -15% précision mouture, irritation MBTI **J** (perfectionnistes).
- Pas de templates alternatifs §5.5.2 (Meunier non-clé).

### 6.6 Pénurie / abondance (§5.6)
- **Très impactant** : la chaîne céréale → farine → pain dépend de lui.
- **Pénurie** : meunier devient **point de rationnement** local, queue (cf. [[Modes Sociaux]] Mode 1 File indienne) avec patience tendue. MBTI **T** rationne strictement, **F** privilégie les pauvres.
- **Abondance** : surplus permettant des farines spéciales (rituelles, signées). Anim joyeuse (rare).
- Génère side-quest "Approvisionner moulin en grain" via QuestGenerator (§15 + §5.8).

### 6.7 Deuil (§5.7)
- **MBTI F** ×1.5 : meunier réduit la mouture à 30% pendant 7 jours (graphe famille), ferme moulin pour funérailles.
- **MBTI T** : Colère rationnelle si mort par négligence (ex. apprenti tué par engrenage non gardé) → Memory weight 100, vendetta possible.
- Communauté impactée : tout le village ressent (-10 mood baseline 3 jours, accès farine retardé).

### 6.8 Quête (§5.8)
- **Peu de main quests donnés** (sauf meuniers nommés Phase 4).
- **Beaucoup de side procédurale** :
  - "Récupérer pièce de rechange pour meule" (T_DeliverGoods, T+S) — MBTI ESTJ/ISTJ
  - "Acheminer farine rare au boulanger d'une autre ville" (T_DeliverGoods, T+S)
  - "Dénouer un conflit avec un seigneur sur droit de mouture" (T+J Mode Dialogue)
- **Témoin d'événement** : a vu beaucoup de villageois passer (mémoire individuelle §3 forte par MBTI **J**, durée 48h).

---

## 7. Lifecycle PNJ

> Cohérent [[Concepts Fondamentaux IA PNJ]] §18 D-PNJ-LIFECYCLE.

**Apprenti** : aide-meunier 14-20 ans, porte les sacs, apprend à juger la finesse. Souvent enfant ou neveu (transmission familiale forte).

**Maître** : 25-65 ans, gère le moulin seul ou avec 1-2 aides. Le palier Maître débloque la mouture d'**Œuvre signée** (cf. fichier source §5).

**Successeur** :
- Transmission **familiale** prioritaire (la pierre se transmet avec l'art de l'équilibrer, cf. fichier source §1).
- Si pas d'héritier biologique : **apprenti adopté** (souvent un orphelin du village).
- Cycle de transmission : ~30-40 ans gameplay réel pour atteindre Maître.

**Mort** :
- Si meunier mort sans successeur : moulin reste actif **1 saison** (autres villageois improvisent), puis ferme → trigger `Memory.Public.MillClosed` weight 70 → trigger pénurie locale (§5.6.1) → side-quest "Trouver un nouveau meunier".

---

## 8. Variantes culturelles & signatures PNJ

> 5 PNJ canoniques par pays. Cohérent fichier source §10 et [[Pays]] / [[Régions Géographiques]].

| Pays | Variante | Signature MBTI / Profil |
|------|----------|-------------------------|
| **Galenor central** | Meunier banal (seigneurial) — pierre transmise sur 4 générations, registre seigneurial strict | ESTJ, fort réseau noble, prix garantis |
| **Aerion (plaines venteuses)** | Meunière à vent itinérante (rare) — gère 2-3 moulins selon vent | ENTJ, voyageuse, [[Via Ventus]] possible |
| **Climata (vallées froides)** | Meunier à traction animale (mule), focus farines de conservation | ISTJ, taciturne, hub d'hiver |
| **Cendara (terres volcaniques)** | Meunier à pierre noire (basalte), mouture rapide mais usée vite | ISTP, mécanique adaptée aux cendres |
| **Onara (terres sacrées)** | Meunier-prêtre [[Rota Mundi]] — farines rituelles uniquement | INFJ, mouture liturgique, pas de commerce profane |

**Variantes régionales** :
- **Moulin à eau** (rivière constante) : MBTI **J** dominant, routine quasi-mécanique
- **Moulin à vent** (Aerion) : MBTI **P** plus toléré (adaptation au vent imprévisible)
- **Moulin à mule** (rural) : MBTI **F** courant (lien à l'animal de traction)

**PNJ canoniques nommés** (cohérent fichier source §10) :
- *Maitre Ourrec* (Galenor) — ESTJ, "Meunier des Trois Vallées", PNJ persistant authored (cf. [[Concepts Fondamentaux IA PNJ]] §17)
- *Vela la Bise* (Aerion) — ENTP rare exception, championne moulins à vent, [[Via Ventus]]

---

*Liens : [[NPC Behaviors/Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]] · [[03 - Mécaniques/Métiers/Agriculture et Élevage/Meunier|Meunier (gameplay)]] · [[Agriculteur]] · [[Boulanger]] · [[Berger]] · [[Eleveur de créature]]*
