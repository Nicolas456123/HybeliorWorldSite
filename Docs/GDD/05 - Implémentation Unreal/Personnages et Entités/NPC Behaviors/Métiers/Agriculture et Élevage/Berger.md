---
tags: [pnj, comportement, métier, berger, ia]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Agriculture et Élevage/Berger]]
mbti_typique: [INFP, ISTP, ISFP, INFJ, ISTJ]
karma_typique: vert
factions_compatibles: [Confréries pastorales Aerion, Confréries Climata, Spiritus, Foedus Animae, Indépendants]
needs_review_for: [calibration-playtest, intégration-transhumance]
---

# 🐑 Comportement PNJ — Berger

> Template de comportement IA pour les PNJ Bergers d'Hybelior. Applique [[Concepts Fondamentaux IA PNJ|les 20 Concepts Fondamentaux]] et [[Actions Situationnelles]] à un métier **nomade et saisonnier** (transhumance), **observateur du monde**, à mi-chemin entre le pastoral et le mystique.
>
> **Métier gameplay** : voir [[03 - Mécaniques/Métiers/Agriculture et Élevage/Berger]].

---

## 1. Vue d'ensemble

Le Berger-PNJ est un **observateur taciturne** : il sait avant tout autre quand une [[Le Souffle|ère]] tourne (les bêtes le sentent). Profil psychologique dominant : **introverti, calme, profond, sensible aux cycles cosmiques**. Pratique nomade (transhumance entre pâturages d'été en montagne et d'hiver en vallée). Hub social mobile entre régions (transmet rumeurs, nouvelles, savoirs). Combat : faible (houlette, fronde, chien), fuit ou cache troupeau.

Modèle d'IA : §1 BT racine + Utility AI. Cycle pivotant **saison pâturage** vs **hivernal sédentaire**. Mode dominant **Routine** + Religieux pour bergers liturgiques [[Rota Mundi]].

---

## 2. Cycle quotidien spécifique au métier

> **Double cycle saisonnier**.

### Saison pâturage (printemps-automne, transhumance active)

```
[04:00] Lever — traite matinale
[04:30–05:00] Comptage troupeau
[05:00–12:00] Sortie troupeau, garde, déplacement (boucle anim watch / move_herd / repel_predator)
[12:00–13:00] Pause repas / surveillance (anim eat_outdoors 8s)
[13:00–18:00] Retour progressif vers camp / village
[18:00–19:00] Comptage, soins, traite du soir
[20:00] Coucher (avec une oreille)
```

### Cycle hivernal (sédentaire, bergerie)

```
[06:00] Lever — soins bergerie
[07:00–10:00] Tonte, vente laine, traitement peaux
[10:00–14:00] Pause + interactions sociales (forte fréquentation taverne)
[14:00–18:00] Entretien équipement, dressage chiens, préparation transhumance suivante
[19:00–21:00] Vie sociale au village (rare moment où le berger est accessible)
[22:00] Coucher
```

**Lieux propres** :
- `pâturage_été` (montagne, palier Adepte+)
- `pâturage_hiver` (vallée)
- `bergerie_mobile` (abri démontable de nuit)
- `refuge_nuit` (cabane / grotte)
- `abreuvoir_naturel` (source repérée)
- `home_location` (résidence d'hiver, souvent en bourg)

**Tâches métier intégrées** :
- T3.A — Conduite troupeau (anim guide_herd, mini-jeu 3D §[[03 - Mécaniques/Métiers/Agriculture et Élevage/Berger]] §4)
- T3.B — Traite (anim 6s, 2x/jour)
- T3.C — Comptage (Mémoire, anim count 12s)
- T3.D — Tonte (saisonnière, palier Initié+, anim shear 15s par bête)
- T3.E — Repérage et marquage source d'eau (palier Adepte+)

---

## 3. MBTI typique du métier

| Type | Justification |
|------|---------------|
| **INFP** (Médiateur) | Berger-poète, lecture symbolique du paysage, lien profond aux bêtes, [[Spiritus]] |
| **ISTP** (Virtuose) | Berger pragmatique, mécanique de la garde, adaptable, défense contre prédateur |
| **ISFP** (Aventurier) | Berger-voyageur, transhumance assumée, sensible aux cycles |
| **INFJ** (Avocat) | Berger-prédicateur [[Rota Mundi]], lit le ciel, prédit Souffles |
| **ISTJ** (Logisticien) | Berger-rationnel, gestion stricte du troupeau, registre des pertes, transmission familiale |

**Sous-représentés** : ESTJ (Directeur — pas le tempérament solitaire), ENFP (Inspirateur — trop disperse pour vigilance constante).

**Modulateurs spécifiques** :
- **I** ×1.5 sur durée tolérance solitude (jours sans interaction humaine)
- **N+F** ×2.0 sur lecture pré-Souffle (sensibilité cosmique)
- **P** ×1.3 sur adaptation transhumance (tolérance imprévu, météo)
- **J** ×0.7 sur frustration imprévu (mais ×1.3 sur registre lignée)

---

## 4. Triggers spécifiques au métier

```yaml
trigger:
  id: PredatorApproach
  source_concept: [§2_perception, §16_combat]
  conditions:
    - predator_creature.distance < 50m
    - predator.threat_level > 30
  immediate_branch: Combat.Defense.Herd OR Help.Dog.Command
  utility_score: { Combat.Defense: +50 (T+J), Combat.Hide.Herd: +40 (F+P) }
  effect: chien de berger engage, berger en soutien (fronde, houlette)

trigger:
  id: SheepStrayed
  source_concept: [§3_mémoire, §15_quetes]
  conditions:
    - herd.count_delta < 0
  immediate_branch: Routine.SearchStray
  effect: pause autres tâches 30 min gameplay, consulte Mémoire (chemins habituels)
  mbti_modulation: { J: { intensité_recherche: ×1.3 }, F: { détresse_émotionnelle: +1 } }

trigger:
  id: SeasonalTranshumanceTime
  source_concept: [§14_eres, §10_persistance]
  conditions:
    - calendar.season_change == true
    - palier >= "Initié"
  immediate_branch: Routine.PrepareTranshumance
  effect: 3-5 jours préparation, persiste état (§10), possibles rencontres NPC↔NPC §19 sur la route

trigger:
  id: PreSouffleAnimalRestlessness
  source_concept: [§14_eres, §4_emotion]
  conditions:
    - herd.collective_mood == "agitation"
    - era.transition_imminent == true
  utility_score: { Routine.SecureHerd: +60, Social.Talk.Warning: +40 (E) }
  effect: berger pressent Souffle 1-3 jours à l'avance, peut donner indice quête (§5.8 Témoin)
  mbti_modulation: { N+F: { vision_symbolique: oui } }

trigger:
  id: ShearingSeason
  source_concept: [§14_eres, §1_utility]
  conditions:
    - calendar.shearing_season == true
  utility_score: { Routine.Shear: +50, Routine.Continue: -20 }
  duration: 2 semaines gameplay

trigger:
  id: BotanisteRequestsHerb
  source_concept: [§5_graphe_social, §19_npc_interaction]
  conditions:
    - botaniste_npc.request == "rare_herb_from_pasture"
  utility_score: { Help.Botaniste: +30 (F), +10 (T) }
  effect: scène scriptée NPC↔NPC §19 (échange botanique-pastoral)

trigger:
  id: CartographeRequestsRoute
  source_concept: [§5_graphe_social, §15_quetes]
  conditions:
    - cartographe_npc.request == "pastoral_route"
  utility_score: { Social.Trade.Knowledge: +35 (T), Social.Talk: +20 (F) }
  effect: vente de "renseignement géographique" (50-300 Éclats, cf fichier source §9)
```

---

## 5. Modes contextuels propres

| Mode | Usage typique chez le Berger |
|------|------------------------------|
| **Routine** | ~85% du temps (vigilance constante, peu d'interactions) |
| **Marchand** | Rare et bref (vend laine et lait à tonte / fin journée) |
| **Dialogue** | Bref, profond — peu de mots mais riches (pour PNJ persistant nommé Phase 4) |
| **Crise** | Défense par chien et fronde, retraite avec troupeau ; **Mode Crise individuel** fréquent (loin du village) |
| **Festivité** | Quasi-jamais en saison pâturage (impossible de quitter troupeau), normal en hiver |
| **Religieux** | **Forte composante [[Rota Mundi]]** : cycles annuels = liturgie. Bergers liturgiques fréquents |
| **Deuil** | Inclut les bêtes (mort par prédateur) — particularité partagée avec [[Eleveur de créature]] |
| **Quête** | Témoin précieux (§5.8.3) — a vu le paysage, donne indices terrain |

**Cas particuliers** :
- **Mode Crise individuel isolé** : si attaque créature majeure loin du village (>500m), berger livré à lui-même, fuite seul ou avec troupeau (sacrifice possible).
- **Cycle religieux [[Rota Mundi]]** : bergers liturgiques calent leur transhumance sur les solstices/équinoxes — forme un **maillage rituel** régional.

---

## 6. Réactions situationnelles signature

### 6.1 Présence joueur (§5.1)
- **Reconnaissance neutre** : salut bref, MBTI **I** dominant. Peu de ventes.
- **Reconnaissance +75** : partage **rumeurs régionales** (a traversé 3 vallées récemment, sait des choses).
- **Karma rouge** : méfie immédiatement (le berger sent les loups, humains compris) → cache troupeau.

### 6.2 Attaque sur ville (§5.2)
- **Berger rassemble bétail** (priorité absolue). Si en pâturage hors ville : **isolation complète** — Mode Crise individuel.
- Pas de défense de la ville (trop loin), mais **témoin précieux** en revenant (rumeurs à propager §3 mémoire village).
- MBTI **F** : larmes pour les villageois mais reste avec bêtes.

### 6.3 Festival (§5.3)
- **Saison pâturage** : continue garde, **bétail prime** sur fête. MBTI **F** triste de manquer.
- **Saison hivernale** : pleine participation, parfois acteur central (chants pastoraux Aerion).

### 6.4 Climat (§5.4)
- **Pluie** : continue (cape étanche), MBTI **J** râle, **P** s'en fout.
- **Tempête** : **Mode Crise** — refuge bétail urgent (cabane, grotte, abri naturel). Trigger `WeatherStormStarting` priorité absolue.
- **Sécheresse** : transhumance hâtive vers sources connues (Mémoire forte).
- **Phénomène cosmique** : berger **première sentinelle** — bêtes agitées 1-3 jours avant l'humain ne perçoit. MBTI **N+F** : vision symbolique des signes.

### 6.5 Souffle / Ère (§5.5)
- **Modulation paramétrique** :
  - Verdoiement : pâturages riches +30% lait, agneaux abondants, mood Joy +20
  - Sommeil de Glace : transhumance hâtive, pertes +15%, laine épaisse +20%
  - Vents (Aerion) : **idéal**, troupeaux mobiles, bergers chantent, mood +10
  - Ombre Longue (Noctis) : prédateurs +50%, garde de nuit obligatoire — **mode crise quasi-permanent**
- **Post-Souffle** : bêtes désorientées 1 semaine, taux perte ×2 — frustration MBTI **J**.
- **Templates alternatifs §5.5.2** : berger-prédicateur [[Rota Mundi]] passe en **mode prophétique** à chaque transition d'Ère (sermon ouvert).

### 6.6 Pénurie / abondance (§5.6)
- **Pénurie fourrage** : doit déplacer troupeau plus loin → effort, pertes possibles.
- **Abondance Verdoiement** : naissances multiples, lait surplus → opportunité économique.

### 6.7 Deuil (§5.7)
- **Mort d'un chien de berger** : **événement majeur** pour le berger (lien personnel fort). Mood -20 baseline 14 jours pour MBTI **F**, équivalent ami proche.
- Mort d'un proche humain : MBTI **I** ×1.4 retrait social allongé (déjà solitaire, devient ermite).

### 6.8 Quête (§5.8)
- **Témoin idéal** (§5.8.3) : a vu, sait, retient. MBTI **N** : indices symboliques. MBTI **S** : indices factuels précis.
- **Donneur** :
  - "Retrouver mouton perdu" (T_FindLost, F+S) — MBTI ISFP
  - "Découvrir pourquoi les bêtes ont peur de cette colline" (T_Investigate, N+F) — MBTI INFP/INFJ
  - "Convoyer un troupeau à transhumance contre prédateurs" (Escorte) — MBTI ISTP
  - "Apporter une rumeur d'une vallée à l'autre" (T_DeliverGoods version sociale) — MBTI ISFJ

---

## 7. Lifecycle PNJ

**Apprenti** : aide-berger familial, garde de chèvres au village. 8-16 ans (très jeune).

**Maître** : palier Maître débloque **chemin de transhumance signé** (Héritage [[L'Accord]]) + compagnonnage créature sauvage.

**Successeur** :
- Transmission **familiale** (la route = héritage immatériel transmis).
- Parfois orphelin adopté (les bergers solitaires forment des "fils du chemin").
- Cycle ~20-30 ans gameplay réel.

**Mort** :
- En transhumance, mort possible loin de tout (prédateur, chute, gel) — **persistant transient** §9 : peut disparaître sans cérémonie, troupeau retrouvé sans maître par d'autres.
- Trigger `Memory.Public.LostShepherd` weight 60.

---

## 8. Variantes culturelles & signatures PNJ

| Pays | Variante | Signature MBTI / Profil |
|------|----------|-------------------------|
| **Aerion (plaines venteuses)** | Berger-chanteur, troupeaux mixtes (chèvres + faucons d'éclat) | ENFP rare ou INFP, [[Via Ventus]] |
| **Climata (montagnes glacées)** | Berger des Hauts-Pics, transhumance verticale, taciturne extrême | ISTJ, peu de mots, force tranquille |
| **Galenor pastoral** | Berger seigneurial (troupeau noble), guildes pastorales | ISFJ, structuré, hub local |
| **Cendara (volcanique)** | Berger des cendres, créatures résistantes (variants), rude | ISTP, mécanique de survie |
| **Onara (terres sacrées)** | Berger-prédicateur [[Rota Mundi]], lit le ciel, prédit Souffles | INFJ, prophétique, transmet savoir cosmique |

**PNJ canoniques nommés** (cohérent fichier source §10) :
- *Vieux Damarrec* (Climata) — ISTJ, transhumance des Hauts-Pics, 50 ans de garde
- *Selka du Vent* (Aerion) — ENFP-like (rare), troupeau mixte chèvres + faucons d'éclat

---

*Liens : [[Comportements PNJ - Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]] · [[03 - Mécaniques/Métiers/Agriculture et Élevage/Berger|Berger (gameplay)]] · [[Eleveur de créature]] · [[Tisserand]] · [[Cartographe]] · [[Rota Mundi]] · [[Le Lien]]*
