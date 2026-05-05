---
tags: [pnj, comportement, métier, bûcheron, ia]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Agriculture et Élevage/Bûcheron]]
mbti_typique: [ISTP, ESTJ, ISTJ, ISFP, INTP]
karma_typique: vert
factions_compatibles: [Confréries forestières, Druidiques Rota Mundi, Guildes de bois, Indépendants]
needs_review_for: [calibration-playtest, intégration-zones-foretières]
---

# 🪵 Comportement PNJ — Bûcheron

> Template de comportement IA pour les PNJ Bûcherons d'Hybelior. Applique [[Concepts Fondamentaux IA PNJ|les 20 Concepts Fondamentaux]] et [[Actions Situationnelles]] à un métier de **force pure** mais d'**isolement géographique** (forêt).
>
> **Métier gameplay** : voir [[03 - Mécaniques/Métiers/Agriculture et Élevage/Bûcheron]].

---

## 1. Vue d'ensemble

Le Bûcheron-PNJ est un **homme de la lisière** : il vit entre village et forêt, en équipe ou seul, avec un rythme **saisonnier** (hiver privilégié). Profil dominant : **physique, rude, peu bavard, parfois suspect**. Faible défense urbaine mais souvent **excellent à la hache** en combat de fortune. Loin du village = **isolation possible** → Mode Crise individuel fréquent.

Modèle d'IA : §1 BT racine + Utility AI. Mode dominant **Routine** + équipes (NPC↔NPC §19). Synergie naturelle avec [[Botaniste]], [[Apothicaire]], [[Menuisier]].

---

## 2. Cycle quotidien spécifique au métier

```
[05:30] Lever — affûtage outils, repas dense
[06:00–07:00] Marche vers chantier (souvent 30-60 min depuis village)
[07:00–12:00] Coupe (en équipe de 2-3 : abattage / ébranchage / débitage)
[12:00–13:30] Pause repas en forêt (feu, peu de mots, silence respectueux)
[13:30–17:30] Débitage, transport, ébranchage
[18:00–20:00] Retour, entretien outils, repas
[21:00] Coucher tôt
```

**Lieux propres** :
- `coupe_forêt` (lieu d'abattage actif)
- `aire_débitage` (ébranchage, tronçonnage)
- `scierie` (palier Initié+, avec [[Menuisier]])
- `meule_charbon` (palier Adepte+)
- `aire_stockage_couvert` (séchage 3 mois - 2 ans)
- `cabane_bûcheron` (parfois en forêt, palier Expert+)
- `home_location` (village ou cabane forestière)

**Tâches métier intégrées** :
- T3.A — Abattage (anim chop_tree 30s + chute scriptée, mini-jeu timing)
- T3.B — Ébranchage (anim trim_branches 20s par arbre)
- T3.C — Débitage (anim split_log 12s)
- T3.D — Transport billes (anim drag 8s, dépend Vigueur)
- T3.E — Affûtage hache (T4 retour, anim 8s, palier Novice)
- T3.F — Combustion meule à charbon (palier Adepte+, simulation 24h+)

---

## 3. MBTI typique du métier

| Type | Justification |
|------|---------------|
| **ISTP** (Virtuose) | Manuel pur, mécanique de la hache, solitude forestière OK |
| **ESTJ** (Directeur) | Chef d'équipe, gère 5-10 hommes, négocie avec seigneurs |
| **ISTJ** (Logisticien) | Bûcheron rationnel, registre des coupes, respect des quotas druidiques |
| **ISFP** (Aventurier) | Bûcheron-druide [[Rota Mundi]], lien à la forêt, replante |
| **INTP** (Logicien) | Bûcheron-ingénieur, optimise scierie, technique d'abattage avancée |

**Sous-représentés** : ENFP (Inspirateur — pas le tempérament solitaire), ENFJ (Protagoniste — métier peu social).

**Modulateurs spécifiques** :
- **S** ×1.5 sur Acuité lecture de l'arbre (sensorial concret)
- **T** ×1.3 sur calcul direction de chute (rationnel, calcul force/vent)
- **F (rare)** ×1.4 sur tabous druidiques (pas couper l'arbre patriarche sans rituel)
- **I** ×1.3 sur tolérance journées silencieuses

---

## 4. Triggers spécifiques au métier

```yaml
trigger:
  id: TreeFallDangerImminent
  source_concept: [§2_perception, §8_decision_P0]
  conditions:
    - tree.fall_imminent == true
    - npc.distance < tree.danger_radius
  immediate_branch: Combat.Flee.Immediate (court-circuit P0)
  effect: Vivacité check, sinon dégâts
  mbti_modulation: { S: { réaction_directe: ×1.3 }, P: { distraction: ×0.7 } }

trigger:
  id: CreatureForestierAttack
  source_concept: [§2_perception, §16_combat]
  conditions:
    - hostile_creature.distance < 30m
  utility_score: { Combat.Flee: +60 (F+P), Combat.Defense.Hache: +40 (T+J) }
  effect: bûcheron a la hache → combat de fortune possible
  mbti_modulation: { ISTP+ESTJ: { hache_combat: ×1.3 } }

trigger:
  id: PostSouffleForestVariant
  source_concept: [§14_eres, §17_authoring]
  conditions:
    - era_state.post_souffle == true
    - tree.variant_chance > 0
  immediate_branch: Routine.AssessVariant
  effect: tree marqué d'ère → opportunité (Expert+) ou tabou ([[Rota Mundi]] druidique refuse)
  mbti_modulation: { N: { excitation: +1 }, druidique: { interdit_couper: oui } }

trigger:
  id: BotanisteRequestsBark
  source_concept: [§5_graphe_social, §19_npc_interaction]
  conditions:
    - botaniste_npc.request == "écorce_spécifique"
  utility_score: { Help.Botaniste: +30, Social.Trade: +25 }
  effect: échange écorce → tannins / herbes médicinales

trigger:
  id: MenuisierRequestsTimber
  source_concept: [§5_graphe_social, §15_quetes]
  conditions:
    - menuisier_npc.order_active == true
  utility_score: { Routine.Continue.Specific: +50 }
  effect: priorise essence demandée (chêne / hêtre / pin)

trigger:
  id: DruidiqueProhibition
  source_concept: [§13_religion, §12_factions]
  conditions:
    - npc.religion == "Rota Mundi"
    - tree.is_patriarche == true
  immediate_branch: Routine.Refuse OR Routine.RitualBeforeCut
  effect: bûcheron druidique refuse OU exécute rituel 30 min gameplay avant coupe

trigger:
  id: HacheBroken
  source_concept: [§18_lifecycle]
  conditions:
    - hache.durabilité <= 0
  immediate_branch: Routine.GoToForgeron
  effect: pause coupe, va voir [[Forgeron]] (30 Éclats réparation)

trigger:
  id: HostileBandits
  source_concept: [§2_perception, §16_combat]
  conditions:
    - bandits_group.distance < 80m
    - npc.distance_to_village > 500m
  immediate_branch: Combat.Hide OR Combat.Flee
  effect: Mode Crise individuel, isolation possible
  mbti_modulation: { ISTP+ESTJ: { combat_with_axe: +0 mais possible }, INFP+ISFP: { hide: +1 } }
```

---

## 5. Modes contextuels propres

| Mode | Usage typique chez le Bûcheron |
|------|--------------------------------|
| **Routine** | ~80% du temps en saison active |
| **Marchand** | Bref (vend bois à [[Menuisier]]/[[Architecte]]/[[Forgeron]] charbon) |
| **Dialogue** | Bref, technique (essence, qualité, livraison) |
| **Crise** | **Mode Crise individuel** fréquent (loin du village) — fuite vers village ou cache |
| **Festivité** | Atténué : revient pour grands événements, sinon continue (saison courte) |
| **Religieux** | [[Rota Mundi]] druidique : abattage rituel, replantation. Peut bloquer la coupe d'arbres patriarches |
| **Deuil** | Rare - mort d'un coéquipier en chantier (chute d'arbre) → arrêt travail 7-14 jours |
| **Quête** | Témoin (a vu créatures forestières, chemins cachés). Donneur "trouver hache perdue" |

**Cas particuliers** :
- **Mode Crise individuel isolé** : faible défense, loin du village → Combat.Hide ou Combat.Flee. ISTP/ESTJ peuvent combattre à la hache (cohérent §16 Combat AI + Maîtrise_Hache_Combat synergie fichier source §2).
- **Bûcheron druidique [[Rota Mundi]]** : refus systématique de couper certains arbres, peut entrer en conflit avec un employeur qui exige.

---

## 6. Réactions situationnelles signature

### 6.1 Présence joueur (§5.1)
- **Reconnaissance neutre** : peu bavard, hochement, retour à la coupe.
- **Reconnaissance +75** : partage rumeurs forestières (bêtes vues, chemins cachés, créatures rares).
- **Karma rouge** : MBTI **ISTP/ESTJ** considère combat à la hache plausible si dérangé en territoire familier ; **INFP/ISFP** fuit ou se cache.
- **Joueur arme dégainée** près d'un bûcheron seul en forêt : ThreatLevel +50 (cf §4) → fuite ou hache levée selon MBTI.

### 6.2 Attaque sur ville (§5.2)
- **Si en forêt** : ne sait pas immédiatement. Apprend en revenant le soir (Memory.Public.RaidOnVillage propagation).
- **Si en ville** : **fuite peu armé**, possible coup de hache désespéré si acculé.
- Bûcheron = **réservoir de hommes-troupes** en cas de levée militaire (force physique + maniement hache).

### 6.3 Festival (§5.3)
- **Atténué en saison de coupe** (revenir = perdre 1 jour travail). Participation **complète en morte-saison** (été + récolte).
- Bûcheron ESTJ chef d'équipe : organise pic-niques de coupe en fin de chantier.

### 6.4 Climat (§5.4)
- **Pluie** : **réduit travail forestier** (chute imprévisible, sol glissant) — trigger `WeatherStormStarting` → cabane forestière ou retour village.
- **Tempête** : Mode Crise (forêt = mille projectiles), trigger `WeatherStormStarting` priorité absolue.
- **Sécheresse** : risque incendie forestier accru, alarme. MBTI **J** organise patrouille.
- **Phénomène cosmique** : forêt **dangereuse** (créatures variants), bûcheron Expert+ y voit **opportunité**, autres fuient.

### 6.5 Souffle / Ère (§5.5)
- **Modulation paramétrique** :
  - Verdoiement : +30% rendement (mais bois moins dense)
  - Sommeil de Glace : +20% qualité (bois dense), journée courte
  - Brume Mortelle : forêts dangereuses, opportunités essences variants
  - Ombre Longue : bois sombre rituel ([[Noctari]]), production -20% prix x1.5
- **Post-Souffle** : variants d'arbres, opportunités/dangers — MBTI **N** explore, **S** prudent.

### 6.6 Pénurie / abondance (§5.6)
- **Pénurie bois** (rare) : prix x2, livraisons hiérarchisées (forge prime sur menuiserie).
- **Abondance** : surplus charbon, mais saturation marché → bûcheron MBTI **T** spécule, **F** distribue.

### 6.7 Deuil (§5.7)
- **Mort coéquipier sur chantier** : événement marquant. Memory weight 100 individuelle (rare en métier non-combattant). Mood baseline -15 14 jours, refus de chantier seul.
- **Tabou druidique** [[Rota Mundi]] : si bûcheron coupe par accident un arbre tabou, **deuil collectif** confrérie + rituel de réparation.

### 6.8 Quête (§5.8)
- **Témoin** : connaît la forêt comme sa poche (chemins, points d'eau, refuges, créatures vues).
- **Donneur** :
  - "Récupérer ma hache familiale dans une cache profonde de la forêt" (T_RetrieveSomething, T+S) — MBTI ISTJ
  - "Sauver mon coéquipier coincé sous un arbre" (T_SaveAnimal version humaine, F+S) — MBTI ISFP
  - "Localiser un patriarche pour la coupe rituelle annuelle" (T_FindLost spécifique, N+F) — MBTI ISFP druidique
  - "Escorter livraison de charbon à la forge royale" (Escorte) — MBTI ESTJ

---

## 7. Lifecycle PNJ

**Apprenti** : assistant en forêt seigneuriale, transport bûches, affûtage. 14-20 ans (force physique requise).

**Maître** : équipe indépendante ou contrat avec nation forestière (Galenor nord). Palier Maître débloque **abattage Patriarche** + bois Concordé (Héritage [[L'Accord]]).

**Successeur** :
- Transmission **familiale ou par cooptation d'équipe** (savoir se transmet sur les chantiers).
- Cycle ~25-30 ans gameplay.

**Mort** :
- Risque accru en chantier (chute d'arbre, créature, isolation). Si meurt seul en forêt : **persistant transient** §9 — corps peut être trouvé par joueur (side-quest "Identifier le bûcheron disparu").

---

## 8. Variantes culturelles & signatures PNJ

| Pays | Variante | Signature MBTI / Profil |
|------|----------|-------------------------|
| **Galenor nord (forêts denses)** | Bûcheron seigneurial, équipes structurées, droit de coupe | ESTJ, chef d'équipe, hub d'information |
| **Aerion (essences nobles)** | Bûcheronne rare, [[Aerion]], force et solitude | ISTP, "preuve qu'aucun métier n'est interdit" |
| **Cendara (bois résistants)** | Bûcheron des terres rouges, charbon de forge majeur | ISTJ, fournisseur forges Cendara |
| **Onara (forêts sacrées)** | Bûcheron-druide [[Rota Mundi]], coupe rituelle, replantation | ISFP, refuse coupe profane, pratique liturgique |
| **Climata (bois dense d'hiver)** | Bûcheron-solitaire, cabane forestière, force impressionnante | ISTP solitaire, parfois suspect |

**PNJ canoniques nommés** (cohérent fichier source §10) :
- *Vorund Brisechêne* (Galenor nord) — ISTJ, abat des arbres centenaires d'une seule main (légende)
- *La Forestière de Verdoiement* — ISFP-INFP, Liée [[Spiritus]], symbiose avec la forêt

---

*Liens : [[Comportements PNJ - Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]] · [[03 - Mécaniques/Métiers/Agriculture et Élevage/Bûcheron|Bûcheron (gameplay)]] · [[Menuisier]] · [[Architecte]] · [[Forgeron]] · [[Botaniste]] · [[Rota Mundi]] · [[Le Lien]]*
