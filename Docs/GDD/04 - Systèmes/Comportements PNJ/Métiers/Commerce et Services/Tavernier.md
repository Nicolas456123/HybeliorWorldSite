---
tags: [pnj, comportement, métier, tavernier, ia]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Commerce et Services/Tavernier]]
mbti_typique: [ESFJ, ENFP, ENFJ, ESFP, ESTP]
karma_typique: vert
factions_compatibles: [Confréries de taverniers, Foedus Animae (taverne sacrée), Bardes Aerion, Indépendants, Noctari (clandestin)]
needs_review_for: [calibration-playtest, intégration-Modes-Sociaux-info]
---

# 🍺 Comportement PNJ — Tavernier

> Template de comportement IA pour les PNJ Taverniers d'Hybelior. Applique [[Concepts Fondamentaux IA PNJ|les 20 Concepts Fondamentaux]] et [[Actions Situationnelles]] au **maître du soir** — vendeur de boissons, animateur de salle commune, **hub d'information** par excellence. Cycle décalé : couché tard, levé tard.
>
> **Métier gameplay** : voir [[03 - Mécaniques/Métiers/Commerce et Services/Tavernier]].

---

## 1. Vue d'ensemble

Le Tavernier-PNJ est un **animateur permanent** : profil dominant **extraverti, charismatique, mémoire des visages, désamorçeur de conflit**. Hub d'information central — toutes les rumeurs passent par sa salle. Mode Festivité quasi-permanent le soir. Se distingue de l'[[Aubergiste]] (vend repos / matin) par son métier du **jour qui s'éteint et de la soirée**. Cycle décalé (lever tard, coucher tard).

Modèle d'IA : §1 BT racine + Utility AI. Modes **Marchand** + **Festivité** combinés en soirée. Hub d'information majeur (graphe social §5 dense, mémoire village §3 forte).

---

## 2. Cycle quotidien spécifique au métier

> **Cycle décalé** — vie nocturne, sommeil tardif.

```
[09:00] Lever tard (soirée tardive précédente)
[10:00–12:00] Courses, restock fûts, ménage salle
[12:00–14:00] **Service midi** (déjeuner clients) — Mode Marchand léger
[14:00–17:00] Pause / sieste (récupération avant soirée)
[17:00] **Ouverture officielle soirée**
[17:00–23:00] **Service intense** — cœur du métier (Mode Marchand + Festivité combinés)
[23:00–01:00] Fermeture, comptes, nettoyage
[02:00] Coucher
```

**Lieux propres** :
- `comptoir_taverne` (point central, palier Novice)
- `salle_commune` (tables, bancs, foyer)
- `cave_fûts` (palier Initié+, stockage et tirage boissons)
- `cuisine_légère` (palier Initié+)
- `estrade_barde` (palier Adepte+, animation musicale)
- `salle_privée` (palier Adepte+, négociations discrètes)
- `home_location` (souvent au-dessus de la taverne)

**Tâches métier intégrées** :
- T3.A — Tirer une chope (anim 6s, mini-jeu service simultané, palier Novice)
- T3.B — Service plat (anim serve_plate 5s, palier Novice)
- T3.C — Discussion/animation comptoir (Mode Dialogue intégré, palier Novice)
- T3.D — Désamorçage bagarre (palier Adepte+, mini-jeu Verbe + Présence)
- T3.E — Soirée musicale (palier Adepte+, gère [[Barde]]/[[Musicien]] sur estrade)
- T3.F — Préparation cuvée signée (palier Maître)

---

## 3. MBTI typique du métier

| Type | Justification |
|------|---------------|
| **ESFJ** (Consul) | Tavernier-bonhomme, chaleureux, mémoire des visages, hub de rumeurs |
| **ENFP** (Inspirateur) | Tavernier-musicien, ancien [[Barde]], soirées légendaires, scène ouverte |
| **ENFJ** (Protagoniste) | Tavernière-matriarche, autorité absolue, désamorce tout conflit, ancienne mercenaire |
| **ESFP** (Animateur) | Tavernier-festif, danse, propose tournées, joie communicative |
| **ESTP** (Entrepreneur) | Tavernier-pragmatique, gère bagarres physiquement, ancien soldat |

**Sous-représentés** : INTJ, INTP (pas le tempérament social public).

**Modulateurs spécifiques** :
- **E** ×1.5 sur expression sociale + score `Social.Talk` (cf. [[Actions Situationnelles]] §6.1)
- **F** ×1.4 sur lecture émotionnelle clients (anticipation conflit)
- **Présence** Couche 0 ([[Personnage]]) ×1.3 — influence l'ambiance générale de la taverne
- **MBTI ESTP** ×1.5 sur capacité physique de désamorçage (sortie bagarreurs)

---

## 4. Triggers spécifiques au métier

```yaml
trigger:
  id: ClientArrives
  source_concept: [§7_reputation, §5_graphe_social]
  conditions:
    - npc_or_player.distance < 5m
    - npc_or_player.enters_taverne == true
  utility_score: { Social.Greet: +50 }
  effect: salutation chaleureuse, registre mémoire visage (§3 individuelle weight 30 si premier passage)
  mbti_modulation: { E: { dialogue_long: +1 }, F: { lecture_humeur: +1 } }

trigger:
  id: BarFightStarting
  source_concept: [§4_emotion, §16_combat]
  conditions:
    - clients.conflict_escalation > threshold
  immediate_branch: ModeSocial.Desamorcer OR Combat.PhysicalRemoval
  effect: palier Adepte+ désamorce 70%, sinon expulse manu militari
  mbti_modulation: { ENFJ+ESFJ: { verbe_désamorçage: ×1.5 }, ESTP: { expulsion_physique: ×1.5 } }

trigger:
  id: BardArrivesForPerformance
  source_concept: [§5_graphe_social, §19_npc_interaction]
  conditions:
    - barde_npc.distance < 10m
    - barde_npc.has_appointment == true
  utility_score: { Routine.HostBarde: +60, Social.Talk: +30 }
  effect: ambiance taverne +20 mood général soirée

trigger:
  id: PlayerOffersInformation
  source_concept: [§3_mémoire, §15_quetes]
  conditions:
    - player.dialogue_intent == "share_rumor" OR "ask_rumor"
  utility_score: { Social.Trade.Information: +40 }
  effect: échange info contre Éclats / boisson, alimente mémoire village (§3)
  mbti_modulation: { E+F: { partage_libre: +1 }, ESTP: { contre-partie_exigée: +1 } }

trigger:
  id: KarmaRedClientEnters
  source_concept: [§7_reputation, §16_combat]
  conditions:
    - client.karma_state == "rouge_ou_noir"
  immediate_branch: ModeSocial.WarningDiscret OR ModeSocial.RefuseService
  effect: ENFJ matriarche peut refuser ; ESTP peut tolérer si bon payeur
  mbti_modulation: { F+J: { refus_moral: +1 }, T+P: { tolérance_si_paiement: +1 } }

trigger:
  id: VeilléeDuSouffle
  source_concept: [§14_eres, §19_npc_interaction]
  conditions:
    - era.souffle_just_occurred == true
  utility_score: { Routine.OpenAllNight: +80 }
  effect: soirée massive (cohérent fichier source §8), recette unique débloquée (Cuvée du Souffle)

trigger:
  id: NobleRequestsPrivateRoom
  source_concept: [§12_factions, §5_graphe_social]
  conditions:
    - noble_npc.request == "private_room"
    - palier >= "Adepte"
  utility_score: { Social.Trade.Premium: +70 }
  effect: salle privée, prix x3, réception VIP, info politique (mémoire individuelle §3 weight 60)

trigger:
  id: ClergyRequestsSacredEvent
  source_concept: [§13_religion, §19_npc_interaction]
  conditions:
    - clergy_npc.request == "soirée_rituelle"
    - npc.religion_compatible == true
  utility_score: { Routine.HostRitualEvent: +50 }
  effect: soirée [[Rota Mundi]] solstice OU [[Foedus Animae]] (paix sacrée le temps de la soirée)
```

---

## 5. Modes contextuels propres

| Mode | Usage typique chez le Tavernier |
|------|---------------------------------|
| **Routine** | Ménage, restock, courses (~25%) |
| **Marchand** | Service comptoir continu en soirée (~50%) |
| **Dialogue** | Sous-état du Marchand quasi-permanent (chaque chope = échange) |
| **Crise** | Désamorçage bagarre (Mode Crise variant non-létal) ; rare combat direct |
| **Festivité** | **Mode dominant le soir** — quasi-permanent (cf. briefing) |
| **Religieux** | [[Rota Mundi]] (soirées rituelles solstices) ou [[Foedus Animae]] (taverne sacrée de paix, serments) |
| **Deuil** | Particulier — peut **fermer** 1 jour pour deuil majeur (ami client tué). Symbolique fort |
| **Quête** | **Hub d'information majeur** — donneur fréquent (rumeurs payantes), témoin (sait tout) |

**Cas particuliers** :
- **Mode Festivité quasi-permanent le soir** (cf. briefing) : Tavernier vit dans Mode Festivité de 17h à 23h — c'est sa norme, pas l'exception. Mood général taverne +15 pour MBTI **E+F**.
- **Tavernier-prêtre [[Foedus Animae]]** : taverne **sacrée de paix** — combat impossible sous son toit (cf. Mode Crise §3.2 compatibilité — exception sacrée).
- **Tavernier-clandestin [[Noctari]]** : façade respectable + arrière-salle contrebande. Karma jaune-noir, double vie.

---

## 6. Réactions situationnelles signature

### 6.1 Présence joueur (§5.1)
- **Mode Festivité actif** : ambiance entière modifie l'accueil. Salutation forte (E), animation comptoir.
- **Reconnaissance neutre** : prix standards, dialogue chaleureux.
- **Reconnaissance +75** : tournée offerte, info gratuite (rumeurs), accès soirée privée.
- **Reconnaissance -50** : prix +20%, refuse tournées prolongées.
- **Karma rouge** : trigger `KarmaRedClientEnters` — selon MBTI, refuse ou tolère stricte.

### 6.2 Attaque sur ville (§5.2)
- **Tavernier ESTP/ENFJ peut intervenir** (ancien soldat / ancienne mercenaire), prend épée derrière comptoir.
- **Tavernier ESFJ/ESFP** : panique modérée, ferme volets, abrite clients vulnérables.
- Taverne devient **point de rassemblement civil** (mémoire village §3 : `Memory.Public.TaverneAsRefuge`).

### 6.3 Festival (§5.3) — **Mode dominant**
- **Mode Festivité activé** sur tous festivals (cf. briefing), pleine performance.
- Tavernier MBTI **E+F** : organise tournées, anime, chante.
- Festivals locaux : taverne **épicentre**.

### 6.4 Climat (§5.4)
- **Pluie / tempête** : fréquentation **augmente** (les gens cherchent un refuge), Mode Marchand boost +30%.
- **Sécheresse / pénurie** : prix boissons +50% (matières premières chères).
- **Phénomène cosmique** : taverne reste **point de rassemblement** pour partager peur / rumeurs.

### 6.5 Souffle / Ère (§5.5)
- **Modulation paramétrique** :
  - Verdoiement : cuvées miellées, fruits abondants, fréquentation +30%
  - Sommeil de Glace : plats chauds, eaux-de-vie réchauffantes, +20% fréquentation
  - Vents (Aerion) : bardes voyageurs, soirées musicales animées
  - Brume Mortelle : méfiance, fréquentation -20%, rumeurs morbides
  - Ombre Longue : ouverture plus tard, [[Noctari]] hub clandestin
- **Pré-Souffle** : trigger `VeilléeDuSouffle` post-événement → **soirée massive** + cuvée unique (Cuvée du Souffle).
- **Templates alternatifs §5.5.2** : Tavernier-clé (Vellor "le Brasseur", Mère Tessa) peut basculer en archétype "diplomate informel" (lieu de paix sacrée).

### 6.6 Pénurie / abondance (§5.6)
- **Pénurie** : prix boissons +50%, MBTI **F** offre une dernière chope aux pauvres avant fermeture.
- **Abondance** : tournées généreuses, atmosphère euphorique.

### 6.7 Deuil (§5.7)
- **Deuil d'un client habitué** : MBTI **F** ×1.5, peut fermer 1 jour symbolique (toast posthume).
- Funérailles : taverne offre la veillée (cf. [[Actions Situationnelles]] §5.7.1 [[Foedus Animae]] veillée funéraire familiale).

### 6.8 Quête (§5.8) — **Hub majeur**
- **Donneur très fréquent** :
  - "Apporter cette lettre à un client de l'autre ville" (T_DeliverGoods, T+S) — MBTI ESFJ
  - "Localiser un client qui a oublié sa bourse" (T_FindLost, F+S) — MBTI ESFJ
  - "Désamorcer un conflit entre deux familles fidèles" (T_RestoreLove, F+N) — MBTI ENFJ
  - "Apporter une nouvelle cuvée d'une autre région" (T_RetrieveSomething, T+S) — MBTI ESFP
- **Témoin** (§5.8.3) : **mémoire forte** des visages et des conversations entendues. Donne indices contre Éclats / boisson.

---

## 7. Lifecycle PNJ

**Apprenti** : serveur, plonge, apprenti tireur de bière. 16-24 ans.

**Maître** : palier Maître débloque **taverne légendaire** (Héritage [[L'Accord]]) + **diplomatie informelle** (lieu de paix sacré) + accès Conseiller.

**Successeur** :
- Transmission **familiale** ou par **succession dans guilde**.
- Cycle ~25-35 ans gameplay.
- Héritage = recettes signature + clientèle fidèle + sceau confrérie.

**Mort** :
- Persistant majeur (PNJ très visible).
- Si meurt : taverne **change d'âme** (mood -10 baseline 30 jours, fréquentation -20%).
- Trigger `Memory.Public.TavernierDied` weight 70 — peut générer arc narratif "Sauver la taverne".

---

## 8. Variantes culturelles & signatures PNJ

| Pays | Variante | Signature MBTI / Profil |
|------|----------|-------------------------|
| **Galenor capitale** | Tavernier-bonhomme prestige, recette signature ancrée | ESFJ, mémoire visages, hub rumeurs |
| **Aldraan port** | Taverniere-matriarche, désamorce bagarres marins | ENFJ, autorité, ancienne mercenaire |
| **Aerion** | Tavernier-musicien, ancien [[Barde]], soirées chantées | ENFP, scène ouverte, chants pastoraux |
| **Cendara** | Tavernier-festif, danses volcaniques, joie | ESFP, animation tribale |
| **Noctis** | Tavernier-clandestin [[Noctari]], hub contrebandiers | ENTP, double vie |
| **Onara** | Tavernier-prêtre [[Foedus Animae]], taverne sacrée de paix | ENFJ rare, serments |

**PNJ canoniques nommés** (cohérent fichier source §10) :
- *Vellor "le Brasseur"* (Galenor capitale) — ESFJ, taverne "L'Eclat Doré", recette signature "Bière de l'Aube"
- *Mère Tessa* (Aldraan port) — ENFJ, taverne "La Cale Pleine", désamorce bagarres marins d'un regard
- *La Taverne du Concordant* (Cendara) — ouverte par un Concordant différent à chaque ère, INFJ rare

---

*Liens : [[Comportements PNJ - Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]] · [[03 - Mécaniques/Métiers/Commerce et Services/Tavernier|Tavernier (gameplay)]] · [[Aubergiste]] · [[Brasseur]] · [[Cuisinier]] · [[Marchand]] · [[Barde]] · [[Musicien]] · [[Foedus Animae]]*
