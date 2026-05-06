---
tags: [pnj, comportement, métier, marchand, ia]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Commerce et Services/Marchand]]
mbti_typique: [ENTJ, ESTJ, ESFJ, ENTP, ISTJ]
karma_typique: variable
factions_compatibles: [Guildes marchandes nationales, Compagnies inter-nations, Hôtel des ventes, Foedus Animae, Maisons aristocratiques]
needs_review_for: [calibration-playtest, taux-marges-régionales]
---

# 💰 Comportement PNJ — Marchand

> Template de comportement IA pour les PNJ Marchands d'Hybelior. Applique [[Concepts Fondamentaux IA PNJ|les 20 Concepts Fondamentaux]] et [[Actions Situationnelles]] au **liant économique** du monde — celui qui déplace les biens, prédit les marges, hub d'information.
>
> **Métier gameplay** : voir [[03 - Mécaniques/Métiers/Commerce et Services/Marchand]].

---

## 1. Vue d'ensemble

Le Marchand-PNJ est un **calculateur sociable** : pivot économique et nœud d'information. Profil dominant : **extraverti, mémoire des prix, charisme de négociation, planification rationnelle ou opportuniste**. Trois archétypes : **boutiquier sédentaire**, **caravanier itinérant**, **maître de comptoir** (gros volumes inter-régionaux). Souvent **politiquement influent** (conseil de seigneurs, financement guildes). Karma **variable** — du marchand droit ([[Foedus Animae]]) au contrebandier [[Noctari]].

Modèle d'IA : §1 BT racine + Utility AI. Mode **Marchand** quasi-permanent en heures d'ouverture (variant fort). Hub social majeur (voir [[Concepts Fondamentaux IA PNJ]] §5 graphe).

---

## 2. Cycle quotidien spécifique au métier

> **Deux cycles** selon archétype.

### Boutiquier sédentaire

```
[06:00] Lever — comptage caisse, ouverture
[07:00–12:00] Vente matinale (clientèle régulière)
[12:00–13:30] Pause repas (souvent à la [[Tavernier|taverne]] voisine pour rumeurs)
[13:30–19:00] Vente après-midi + arrivages (caravanes, livraisons)
[19:00–21:00] Comptes, restock, soir auberge ou maison (si E : auberge ; I : maison)
[22:00] Coucher
```

### Caravanier itinérant

```
[04:00] Lever — vérification caravane
[05:00–18:00] Voyage et vente d'étape (stops villages, négociation contrats)
[19:00] Auberge et négociation (cf. [[Aubergiste]] hub clients réguliers)
[22:00] Coucher
```

**Lieux propres** :
- `étal_marché` (palier Novice, place de ville)
- `boutique_sédentaire` (palier Initié+)
- `caravane` (mules, charrettes — palier Initié+ caravanier)
- `comptoir_échange` (palier Adepte+, hub fixe régional)
- `hôtel_des_ventes` (institution centrale, accès tous paliers)
- `coffre_verrouillé` (sécurisation stock — palier Initié+)
- `home_location` (au-dessus boutique souvent)

**Tâches métier intégrées** :
- T3.A — Disposer marchandises (anim arrange_goods 8s, palier Novice)
- T3.B — Marchandage avec client (Mode Marchand + dialogue, mini-jeu Verbe)
- T3.C — Authentification objet (palier Adepte+, anim 12s)
- T3.D — Tenue registre comptable (anim 15s, palier Novice)
- T3.E — Préparation caravane (palier Initié+, anim 60s simulation)

---

## 3. MBTI typique du métier

| Type | Justification |
|------|---------------|
| **ENTJ** (Commandant) | Marchand-leader, gère compagnie commerciale, conseiller politique, vision long terme |
| **ESTJ** (Directeur) | Boutiquier rationnel, marges strictes, fiable et ponctuel, registre exact |
| **ESFJ** (Consul) | Marchand-cordial, bonhomie, hub de rumeurs, prix justes (high Verbe) |
| **ENTP** (Innovateur) | Caravanier-aventureux, voit opportunités, semi-illégalités assumées, [[Noctari]] possible |
| **ISTJ** (Logisticien) | Maître-comptoir sédentaire, gestion gros volumes, prudent, légalité stricte |

**Sous-représentés** : INFP (Médiateur — pas le tempérament transactionnel), ISFP (Aventurier — peu de stratégie économique).

**Modulateurs spécifiques** :
- **E** ×1.5 sur expression réputation (cf. [[Actions Situationnelles]] §6.1)
- **T** ×1.4 sur calcul marges (rigide), **F** ×0.8 (flexible, partage)
- **J** ×1.3 sur stricte adhérence horaires + contrats
- **N** ×1.4 sur opportunités spéculation pré-Souffle (Bourse des Augures)

---

## 4. Triggers spécifiques au métier

```yaml
trigger:
  id: PlayerWantsToBuy
  source_concept: [§7_reputation, §1_utility]
  conditions:
    - player.distance < 3m
    - player.dialogue_intent == "trade"
  utility_score: { Social.Trade: +60 }
  effect: Mode Marchand variant pricing_modifier (rep < 0 → +20%, rep > 75 → -30%, items rares cachés)
  mbti_modulation: { E: { dialogue_long: +1 }, T: { focus_marges: +1 }, F: { ajustement_émotionnel: +1 } }

trigger:
  id: CaravaneArrival
  source_concept: [§5_graphe_social, §19_npc_interaction]
  conditions:
    - caravane_npc.distance < 30m
    - caravane.cargo_unloading == true
  utility_score: { Social.Trade.Restock: +70 }
  effect: réception, négociation gros volume, rumeurs régionales (mémoire village §3)

trigger:
  id: PreSouffleBourseSignal
  source_concept: [§14_eres, §10_persistance]
  conditions:
    - era.transition_imminent == true
    - palier >= "Expert"
  utility_score: { Routine.Speculate: +60 (N), +30 (S) }
  effect: stocks stratégiques pré-Souffle (reliques d'ère précédente prennent valeur post)
  mbti_modulation: { N: { spéculation_haute: ×1.5 }, S: { stockage_pratique: +1 } }

trigger:
  id: PenuryDetected
  source_concept: [§14_eres, §15_quetes]
  conditions:
    - region.pénurie_active == true
  utility_score: { Routine.PriceUp: +60 (T), Help.Distribute: +40 (F) }
  effect: marges +50% à +200% selon ère ; MBTI F propose distribution caritative
  mbti_modulation: { T: { profit_max: ×1.3 }, F: { partage: +1 } }

trigger:
  id: PlayerDetectsFakeItem
  source_concept: [§7_reputation, §3_mémoire]
  conditions:
    - player.dialogue == "denunciation_faux"
    - marchand.has_fake_item == true
  immediate_branch: ModeSocial.RefuseService OR ModeSocial.Negotiate
  effect: si MBTI honnête → exécute -50% prix réparation ; si MBTI ENTP/Noctari → cache, dénonce le joueur
  mbti_modulation: { F+J: { honte_admise: +1 }, T+P: { défausse: +1 } }

trigger:
  id: BanditsApproachCaravane
  source_concept: [§2_perception, §16_combat]
  conditions:
    - bandits_group.distance < 100m
    - npc.role == "caravanier"
  immediate_branch: Combat.Hide.Cargo OR Combat.Flee.Caravane
  effect: priorité absolue protéger coffre, MBTI T+J active escorte ([[Mercenaire]])
  mbti_modulation: { T+E: { coordination_combat: +1 }, F+I: { panique: +1 } }

trigger:
  id: KarmaRedPlayer
  source_concept: [§7_reputation, §12_factions]
  conditions:
    - player.karma_state == "rouge_ou_noir"
    - player.distance < 20m
  immediate_branch: ModeSocial.Lock.Shop
  effect: Peur +40, ferme boutique, alerte Garde
  mbti_modulation: { T: { calcul_risque: +1 }, F: { détresse: +1 } }

trigger:
  id: HighSeasonFestival
  source_concept: [§14_eres, §19_npc_interaction]
  conditions:
    - festival.active == true
    - festival.type == "marchand_annuel"
  utility_score: { Social.Trade: +80, Routine.Continue: -20 }
  effect: marges +20%, animation, chaland augmenté
```

---

## 5. Modes contextuels propres

| Mode | Usage typique chez le Marchand |
|------|--------------------------------|
| **Routine** | Réveil + rangement + comptes (~30%) |
| **Marchand** | **Mode dominant** quasi-permanent en heures d'ouverture (~55% temps gameplay) |
| **Dialogue** | Sous-état du Mode Marchand (marchandage, persuasion). Riche, MBTI E surtout |
| **Crise** | Verrouille boutique, fuit avec coffre, alerte Garde — pas de combat direct (sauf escorte mercenaire) |
| **Festivité** | Marchand annuel récoltes = **événement clé**, mode dominant 1-3 jours |
| **Religieux** | Selon foi : [[Foedus Animae]] (contrats sacrés, caution morale) ; [[Catena Fracta]] (rare, marché noir) |
| **Deuil** | Atténué : continue ventes (commerce ne s'arrête pas), ralentit le ton |
| **Quête** | Donneur fréquent (livraison, achat objet rare, escorte) ; **hub d'information** pour quêtes joueur |

**Cas particuliers** :
- **Mode Marchand variant fort** : applique formule **Prix d'achat = Base − Verbe × 0.5%** (cf. fichier source §2 + [[Personnage]]). Chaque négociation = mini-jeu Verbe.
- **Mode Crise particulier** : pas de combat direct mais **protection coffre** (ferme, scelle, fuit avec). MBTI **T** rationnel : cache d'abord, fuite ensuite.

---

## 6. Réactions situationnelles signature

### 6.1 Présence joueur (§5.1)
- **Reconnaissance haute prioritaire** pour ce métier (cf. [[Actions Situationnelles]] §5.1.1) : Marchand favorise reconnaissance haute (-30% prix, items cachés).
- **Reconnaissance neutre** : prix standards, salutation chaleureuse (E) ou brève (I).
- **Reconnaissance -50** : prix +20%, refuse services premium (cohérent fichier source §8).
- **Karma rouge** : ferme boutique, Peur +40, alerte Garde.
- **MBTI E+F** : convertissent neutre → favorable rapidement (relation client).

### 6.2 Attaque sur ville (§5.2)
- **Cache marchandise** dans coffre (priorité absolue), ferme boutique.
- **Fuit avec coffre** si possible (caravanier l'embarque, boutiquier scelle et part).
- Aucun combat direct — embauche [[Mercenaire]] via QuestGenerator (§15).
- MBTI **T+E** : peut diriger des civils dans la fuite (chef de fait).

### 6.3 Festival (§5.3)
- **Marchand annuel récoltes** (cohérent §19) : **événement majeur** pour le marchand. Place centrale, Mode Festivité + Marchand combinés. Marges +20%, fréquentation x3.
- **Festivals communs** : ouverture prolongée, prix modulés.

### 6.4 Climat (§5.4)
- **Pluie** : ouvre étals couverts (cf. [[Actions Situationnelles]] §5.4.1), boutique sédentaire continue normalement.
- **Tempête** : ferme tôt, Mode Crise pour caravanier (route impraticable).
- **Sécheresse** : prix denrées x1.5+, MBTI **T** spécule.
- **Phénomène cosmique** : marchand **opportuniste** (MBTI ENTP) trafique remèdes (marges +200%, risque légal).

### 6.5 Souffle / Ère (§5.5)
- **Modulation paramétrique** :
  - Verdoiement : surplus céréales/fruits, marges resserrées sur denrées, opportunités outils agricoles
  - Sommeil de Glace : pénurie alimentaire, marges +50% sur denrées
  - Vents (Aerion) : caravanes rapides, marges +20% sur trajet
  - Brume Mortelle : trafic de remèdes, marges extrêmes (+200%), risque
  - Ombre Longue (Noctis) : marché noir, contrebande facile [[Noctari]]
- **Pré-Souffle** : trigger `PreSouffleBourseSignal` → spéculation maximale (Bourse des Augures avec [[Banquier]]).
- **Post-Souffle** : reliques d'ère précédente prennent valeur — opportunité majeure stockage stratégique.
- **Templates alternatifs §5.5.2** : marchand-clé (Vasso d'Aldraan etc.) peut basculer en archétype "spéculateur d'ère".

### 6.6 Pénurie / abondance (§5.6) — **Très impactant**
- **Pénurie** : tensions extrêmes. MBTI **T** profite (prix +200%), **F** distribue caritative ([[Foedus Animae]]).
- **Abondance** : marges resserrées, mais volume x3 → stratégie volume.
- Trigger `Memory.Public.MarchandSpeculator` peut générer **mauvaise réputation** si MBTI **T** trop dur en pénurie.

### 6.7 Deuil (§5.7)
- **MBTI T** : Colère rationnelle si associé tué (vendetta économique, embauche [[Mercenaire]]).
- **MBTI F** : ralentit ventes 5-7 jours, prix -10% (geste).
- **Deuil corporatif** : si grand marchand de la ville meurt, communauté marchande célèbre 1 jour (Mode Festivité atténué + Deuil).

### 6.8 Quête (§5.8)
- **Donneur très fréquent** (cf. §5.8.1 et §5.8.2) :
  - "Livre ce courrier pour 10 Éclats" (T_DeliverGoods, T+S) — MBTI ESTJ
  - "Récupérer cargaison perdue avec une caravane" (T_RetrieveSomething, T+S) — MBTI ENTJ
  - "Investiguer pourquoi mes prix s'effondrent" (T_Investigate, T+N) — MBTI ENTP
  - "Apporter ce paquet discret à un client à Noctis" (semi-illégal, T+P) — MBTI ENTP/Noctari
- **Hub d'information** : briefings, rumeurs, contrats officieux. Cohérent §5.8.3 (Témoin).

---

## 7. Lifecycle PNJ

**Apprenti** : colporteur, étal modeste, achat de surplus paysan. 16-24 ans.

**Maître** : palier Maître débloque **compagnie de commerce signée** (Héritage [[L'Accord]]) + accès marchés cosmiques + plafond Verbe-bonus relevé à -40%.

**Successeur** :
- Transmission **familiale** ou par **cooptation associé** (compagnies en plusieurs générations).
- Cycle ~25-40 ans gameplay.
- Héritage = sceau de marchand certifié + relations clients.

**Mort** :
- Persistant (PNJ majeur ville).
- Si meurt, succession publique + **lutte de pouvoir** dans la guilde marchande (génère arc narratif).
- Trigger `Memory.Public.MerchantDied` weight 60.

---

## 8. Variantes culturelles & signatures PNJ

| Pays | Variante | Signature MBTI / Profil |
|------|----------|-------------------------|
| **Galenor capitale** | Maître-comptoir sédentaire, conseiller politique | ENTJ, gros volumes, hub politique |
| **Aldraan (port)** | Marchand maritime, navires + caravanes | ENTJ, voyageur, multi-langues |
| **Aerion (caravanier)** | Caravanière itinérante, escorte armée | ESTJ, multilingue, hub de rumeurs |
| **Cendara (métropole)** | Marchand des bourses, [[Bourse des Augures]] | ENTP spéculateur |
| **Noctis** | Marchand-clandestin [[Noctari]], contrebande | ENTP, marché noir, semi-illégal |

**PNJ canoniques nommés** (cohérent fichier source §10) :
- *Vasso d'Aldraan* — ENTJ, comptoir le plus grand de Galenor central
- *La Caravane Pourpre* — itinérante mythique, traverse 6 nations, ENTJ collectif
- *Maitre Tellur* — courtier de l'[[Hôtel des ventes]], oracle des prix, ENTP/INTP

---

*Liens : [[Comportements PNJ - Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]] · [[03 - Mécaniques/Métiers/Commerce et Services/Marchand|Marchand (gameplay)]] · [[Banquier]] · [[Tavernier]] · [[Aubergiste]] · [[Cartographe]] · [[Mercenaire]] · [[Hôtel des ventes]]*
