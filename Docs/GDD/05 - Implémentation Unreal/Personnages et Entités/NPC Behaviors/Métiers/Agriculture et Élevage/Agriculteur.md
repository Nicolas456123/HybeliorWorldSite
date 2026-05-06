---
tags: [pnj, comportement, métier, agriculteur, ia]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Agriculture et Élevage/Agriculteur]]
mbti_typique: [ISFJ, ISTJ, ISFP, ESFJ, INFJ]
karma_typique: vert
factions_compatibles: [Guildes paysannes, Confréries druidiques Rota Mundi, Domaines aristocratiques, Brigade de Verdoiement, Foedus Animae]
needs_review_for: [calibration-playtest, calendrier-saisonnier-Ères]
---

# 🌾 Comportement PNJ — Agriculteur

> Template de comportement IA pour les PNJ Agriculteurs d'Hybelior. Applique [[Concepts Fondamentaux IA PNJ|les 20 Concepts Fondamentaux]] et [[Actions Situationnelles]] au métier **le plus représenté chez les PNJ de campagne** (base nutritive du monde), au rythme **dicté par les Ères cosmiques** plus qu'aucun autre.
>
> **Métier gameplay** : voir [[03 - Mécaniques/Métiers/Agriculture et Élevage/Agriculteur]].

---

## 1. Vue d'ensemble

L'Agriculteur-PNJ est la **densité de population rurale** d'Hybelior. Profil dominant : **ancré, patient, à temps long, communautaire**. Cycle saisonnier extrême — les agriculteurs représentent ~40% des PNJ persistants ruraux. Hub d'information **village-niveau** (paysans se croisent au champ, à l'auberge). Combat très défavorable (faux/faucille = arme de fortune) mais **levée militaire fréquente** en temps de guerre. Pratique fortement modulée par [[Les Ères]] et [[Le Souffle]].

Modèle d'IA : §1 BT racine + Utility AI. Mode dominant **Routine** + cycle saisonnier (printemps semis · été désherbage/foin · automne récolte/battage · hiver entretien/cellier/repos).

---

## 2. Cycle quotidien spécifique au métier

> **Cycle saisonnier dominant** + cycle quotidien.

### Saison active (printemps-automne)

```
[04:30–05:00] Lever — soin animaux de trait (bœuf, cheval)
[05:00–07:00] Trajet champ + premier travail (semis / désherbage / récolte)
[07:00–12:00] Travaux champêtres intensifs
[12:00–13:30] Pause repas chez soi (souvent partagé avec famille étendue)
[13:30–18:00] Suite travaux + entretien outils
[18:00–20:00] Soins animaux soir, repas, **vie sociale au village** (cœur du tissu social)
[21:00] Coucher
```

### Saison hivernale (sédentaire)

```
[06:00] Lever
[07:00–11:00] Entretien outils, réparations, sélection semences
[11:00–14:00] Pause longue / vie sociale taverne
[14:00–17:00] Préparation cellier, conservation, travaux d'intérieur (vannerie, cordage)
[18:00–22:00] **Vie sociale intense** (saison sociale de l'agriculteur)
[22:00] Coucher
```

**Lieux propres** :
- `champ_cultivé` (production céréalière)
- `verger` (palier Initié+, fruits long terme)
- `potager` (proche maison, maraîchage)
- `grange` (stockage récoltes, foin)
- `aire_battage` (palier Initié+, séparation grain/paille)
- `cellier` (conservation longue durée)
- `pépinière` (palier Adepte+, sélection semences)

**Tâches métier intégrées** :
- T3.A — Labour (anim plow_field 30s + animal trait, palier Novice)
- T3.B — Semis (anim sow 8s, mémoire calendrier saisonnier)
- T3.C — Désherbage (anim weed 12s)
- T3.D — Fauche / récolte (anim harvest 15s)
- T3.E — Battage (palier Initié+, station aire_battage, anim 25s)
- T3.F — Greffe arbre verger (palier Adepte+)

---

## 3. MBTI typique du métier

| Type | Justification |
|------|---------------|
| **ISFJ** (Défenseur) | Service à la famille élargie, transmission semencière, mémoire calendrier saisonnier |
| **ISTJ** (Logisticien) | Agriculteur rationnel, rotation triennale stricte, registre des récoltes |
| **ISFP** (Aventurier) | Paysan-libre, propriétaire fier, lien à la terre [[Terranu]] |
| **ESFJ** (Consul) | Paysan-patriarche, hub social du village, organisateur des fêtes de récolte |
| **INFJ** (Avocat) | Paysanne-druidique [[Rota Mundi]], lit le ciel, prédit Souffles, vision cyclique |

**Sous-représentés** : ENTP (Innovateur — pas le tempérament répétitif), INTJ (Architecte — trop solitaire pour la vie communautaire paysanne).

**Modulateurs spécifiques** :
- **S** ×1.5 sur Acuité lecture du sol et de la météo (sensorialité concrète)
- **J** ×1.4 sur calendrier saisonnier strict (semer trop tôt = gel)
- **F** ×1.3 sur entraide villageoise (moisson collective, partage en pénurie)
- **MBTI Communautaire** (E + F) ×1.3 sur fréquentation taverne + assistance moisson

---

## 4. Triggers spécifiques au métier

```yaml
trigger:
  id: SeasonalSowingTime
  source_concept: [§14_eres, §1_utility]
  conditions:
    - calendar.season == "printemps"
    - weather.gel_recent == false
  utility_score: { Routine.Sow: +60, Routine.Continue: -20 }
  duration: 2-3 semaines gameplay
  mbti_modulation: { J: { intensité: ×1.3 }, P: { tolérance_décalage: +1 jour } }

trigger:
  id: SeasonalHarvestTime
  source_concept: [§14_eres, §19_npc_interaction]
  conditions:
    - crop.maturity >= 95%
    - weather.dry_window > 3 jours
  utility_score: { Routine.Harvest: +70 }
  effect: scène scriptée §19 — moisson collective si plusieurs agriculteurs proches
  mbti_modulation: { F: { entraide_proposée: oui }, T: { calcul_prix_marché: prioritaire } }

trigger:
  id: PreSouffleSky
  source_concept: [§14_eres, §13_religion]
  conditions:
    - era.transition_imminent == true
    - calendar.observation_sky == true
  utility_score: { Routine.Pray: +30 (religieux), Social.Talk.Warning: +40 (E) }
  effect: paysannes druidiques INFJ deviennent prophétiques (1-3 jours avant Souffle)
  mbti_modulation: { N+F+J: { vision_symbolique: oui } }

trigger:
  id: CropDisease
  source_concept: [§4_emotion, §15_quetes]
  conditions:
    - crop.health < 60%
  utility_score: { Help.Botaniste: +50, Help.Apothicaire: +40 }
  effect: side-quest générée "Sauver la récolte" (T_Investigate, N+S)
  mbti_modulation: { F: { détresse: +30 }, T: { calcul_pertes: +1 } }

trigger:
  id: MeunierBringsFlourBack
  source_concept: [§5_graphe_social, §19_npc_interaction]
  conditions:
    - meunier_npc.distance < 5m
    - meunier_npc.cargo == "flour"
  utility_score: { Social.Trade: +40 }
  effect: échange grain → farine (10% commission)

trigger:
  id: SeigneurialLevyDemand
  source_concept: [§12_factions, §15_quetes]
  conditions:
    - lord_npc.demand_active == true
  immediate_branch: Routine.PaySeigneurialDue
  effect: 20-40% récolte en nature (métayage), MBTI F+T variations
  mbti_modulation: { F: { soumission_résignée: +1 }, T: { négociation: +1 }, J: { adhère_strict: +1 }, P: { tente_éviter: +1 } }

trigger:
  id: WaterIrrigationFailure
  source_concept: [§14_eres, §20_pathfinding]
  conditions:
    - era.drought_active == true
    - water_source.depleted == true
  utility_score: { Help.NPC.IrrigationCollective: +50 }
  effect: travail collectif inter-fermes pour réorganiser l'irrigation

trigger:
  id: PlayerOffersHelpWithHarvest
  source_concept: [§7_reputation, §1_utility]
  conditions:
    - player.distance < 10m
    - player.dialogue_intent == "help_harvest"
  utility_score: { Social.Talk: +50, Help.Player: +20 }
  effect: +20 reconnaissance individuelle si joueur participe à la récolte
  mbti_modulation: { F: { gratitude_amplifiée: ×1.5 } }
```

---

## 5. Modes contextuels propres

| Mode | Usage typique chez l'Agriculteur |
|------|----------------------------------|
| **Routine** | ~80% en saison active, ~50% en hiver (plus de social) |
| **Marchand** | Bref (vend surplus au marché de la ville voisine 1-2x/semaine) |
| **Dialogue** | Riche en hiver (taverne), bref en saison active |
| **Crise** | Fuite peu armée ; levée militaire possible avec faux/faucille (arme de fortune) |
| **Festivité** | **Très fort** — fêtes de récolte, solstices [[Rota Mundi]], moissons collectives |
| **Religieux** | Forte composante [[Rota Mundi]] (liturgie agraire, fêtes solstice/équinoxe) ou [[Foedus Animae]] (pacte terre) |
| **Deuil** | Communautaire — famille élargie, voisins, patriarche du village |
| **Quête** | Témoin (a vu le ciel, le sol, la bête) ; donneur fréquent (T_HelpFamily, T_BringFood) |

**Cas particuliers** :
- **Mode Festivité étendu** : agriculteurs sont les **cœurs des fêtes saisonnières** (cohérent §19 marchand annuel récoltes). Mode Festivité combiné avec Mode Religieux [[Rota Mundi]] sur 3-7 jours.
- **Levée militaire seigneuriale** : MBTI **J** adhère strict (devoir), **P** déserte parfois, **F** larmes en quittant la famille.

---

## 6. Réactions situationnelles signature

### 6.1 Présence joueur (§5.1)
- **Reconnaissance neutre** : salut chaleureux **MBTI E**, hochement **MBTI I**.
- **Reconnaissance +75** : invitation à dîner familial, donne pomme/pain, propose travail saisonnier rémunéré.
- **Reconnaissance -50** : méfiance modérée, mais ne se détourne pas (paysan = peu de jugement).
- **Karma rouge** : Peur élevée (paysan vulnérable), prévient le voisin discrètement.
- Particularité : agriculteurs peuvent **identifier le joueur comme fils-du-coin** s'il a participé à plusieurs moissons (mémoire village §3 forte).

### 6.2 Attaque sur ville (§5.2)
- **Levée d'urgence** : ESTJ/ESFJ (rares chez agriculteurs) prennent les faux ; majorité fuit.
- **Cache la récolte** dans le cellier avant tout (préserver l'hiver).
- MBTI **F** : tente de protéger les enfants et vieillards.

### 6.3 Festival (§5.3)
- **Acteurs centraux** des fêtes de récolte (cohérent §19 marchand annuel récoltes).
- **Solstices et équinoxes** [[Rota Mundi]] : **suspension de toutes activités** pendant 1 jour, rituels collectifs.
- MBTI **E+F** : organisent banquets, dansent. **I+T** : préparent logistique, cuisine.

### 6.4 Climat (§5.4)
- **Pluie** : OK si modérée (pousse les semis), Mode Crise si tempête en saison récolte (perte massive possible).
- **Sécheresse** : cause majeure de pénurie, MBTI **T** stocke, **F** partage. Trigger collectif `WaterIrrigationFailure`.
- **Phénomène cosmique** : **paysannes druidiques** lecture des signes (cf. §3 trigger PreSouffleSky), peuvent donner **indices quête** [[Le Souffle]].

### 6.5 Souffle / Ère (§5.5)
- **Le métier le plus modulé par les Ères** :
  - Verdoiement (Terranu) : +50% rendement, mood Joy +30
  - Sommeil de Glace (Climata) : -40% rendement, focus cultures résistantes (seigle, chou) — MBTI **T** rationnement, **F** détresse
  - Vents (Aerion) : pollinisation excellente, mais récoltes balayées si tempête
  - Brume Mortelle : cultures contaminées, opportunités cultures variants Expert+
  - Feu Endormi (Eldoria) : sécheresses, irrigation requise
- **Post-Souffle** : **réorganisation totale du calendrier** ; 1ère semaine perdue. MBTI **J** désorienté, **P** s'adapte.
- **Templates alternatifs §5.5.2** : paysanne-druidique [[Rota Mundi]] devient prophétique à transition d'Ère.

### 6.6 Pénurie / abondance (§5.6)
- **Pénurie alimentaire** : agriculteur = **fournisseur principal** → tensions extrêmes. MBTI **T** rationne sa famille puis vend cher. MBTI **F** partage en village.
- **Abondance** : surplus généralisé, prix s'effondrent → marchand profite.
- Trigger `Memory.Public.FaminePeriod` : si l'agriculteur est le seul disposant de stock, **événement social majeur** (peut basculer en hub politique).

### 6.7 Deuil (§5.7)
- **Très communautaire** (graphe social §5 fort) : mort d'un voisin = mood village -10 baseline 5j.
- **Moisson collective** suspendue 1 jour pour funérailles.
- MBTI **F** ×1.5 : peut entrer en mode deuil étendu.

### 6.8 Quête (§5.8)
- **Donneur très fréquent** (densité paysanne) :
  - "Aide à la moisson" (T_BringFood / T_HelpFamily, F+S) — MBTI ISFJ/ESFJ
  - "Retrouver l'enfant perdu dans le champ de blé" (T_FindLost, F+S) — MBTI ISFJ
  - "Sauver la récolte d'une maladie inconnue" (T_Investigate, T+N+S) — MBTI INFJ druidique
  - "Plaider auprès du seigneur sur le métayage abusif" (T+J Mode Dialogue) — MBTI ESTJ rare
- **Témoin** : a vu mille choses sur le terroir (créatures, voyageurs, accidents).

---

## 7. Lifecycle PNJ

**Apprenti** : aide aux champs familiaux, ramassage, désherbage. Très jeune (8-14 ans, intégration tôt).

**Maître** : propriétaire ou métayer. Palier Maître débloque **variété signée d'Œuvre** ("Blé d'Aldraan", Héritage [[L'Accord]]) + semences-héritage.

**Successeur** :
- Transmission **familiale très forte** (la terre se transmet, le savoir aussi).
- Cycle ~25-35 ans gameplay.
- **Héritage immatériel** : variétés signées qui peuvent disparaître à la mort si pas transmises.

**Mort** :
- Persistant (souvent attaché à une ferme, identifiable).
- Si meurt sans successeur, ferme **abandonnée 1 saison**, terrain réattribué (par seigneur ou guilde paysanne).
- Trigger `Memory.Public.FarmAbandoned` weight 50 → side-quest "Sauver la ferme du Père Almar".

---

## 8. Variantes culturelles & signatures PNJ

| Pays | Variante | Signature MBTI / Profil |
|------|----------|-------------------------|
| **Galenor sud (greniers à blé)** | Paysan métayer (servage léger) ou propriétaire libre | ISTJ / ISFP, hub des doléances |
| **Aerion (cultures venteuses)** | Paysanne-céréalière mobile, contacts caravaniers | ENFJ rare, voyageuse |
| **Climata (cultures résistantes)** | Paysan du seigle et du chou, hivers durs | ISTJ taciturne, MBTI J fort |
| **Cendara (terres rouges)** | Paysan des cendres, cultures spéciales (vignes volcaniques) | ISFP, fier, [[Cendara]] |
| **Onara (terroirs sacrés)** | Paysanne-druidique [[Rota Mundi]], lit le ciel | INFJ, prophétique |

**PNJ canoniques nommés** (cohérent fichier source §10) :
- *Maitre Almar des Trois Champs* (Galenor sud) — ISFJ/ISTJ, blé signé "Almar Doré"
- *La Brigade de Verdoiement* — collectif d'agriculteurs Concordants, [[Rota Mundi]] — formé d'INFJ/ESFJ

---

*Liens : [[Comportements PNJ - Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]] · [[03 - Mécaniques/Métiers/Agriculture et Élevage/Agriculteur|Agriculteur (gameplay)]] · [[Meunier]] · [[Berger]] · [[Boulanger]] · [[Marchand]] · [[Botaniste]] · [[Rota Mundi]] · [[Les Ères]]*
