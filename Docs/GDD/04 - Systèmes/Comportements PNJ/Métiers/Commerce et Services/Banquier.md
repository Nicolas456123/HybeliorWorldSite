---
tags: [pnj, comportement, métier, banquier, ia]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Commerce et Services/Banquier]]
mbti_typique: [INTJ, ISTJ, ENTJ, INTP, ESTJ]
karma_typique: vert
factions_compatibles: [Guilde des Banquiers, Maisons aristocratiques, Foedus Animae (banque sacrée), Bourse des Augures, Concordants L'Accord]
needs_review_for: [calibration-playtest, taux-prêts-paliers]
---

# 🏦 Comportement PNJ — Banquier

> Template de comportement IA pour les PNJ Banquiers d'Hybelior. Applique [[Concepts Fondamentaux IA PNJ|les 20 Concepts Fondamentaux]] et [[Actions Situationnelles]] au **pivot financier** du monde — **gold sink majeur**, conseiller politique, **MBTI fortement Thinking**.
>
> **Métier gameplay** : voir [[03 - Mécaniques/Métiers/Commerce et Services/Banquier]].

---

## 1. Vue d'ensemble

Le Banquier-PNJ est un **calculateur strict** : mémoire de milliers de comptes, autorité contractuelle, **très peu de combat**. Profil dominant : **Thinking strict, J structuré, mémoire haute, calme institutionnel**. Adossé à une **institution** (guilde, ordre, faction noble) — peu de banquiers indépendants. Se distingue du Marchand : ne vend pas, **garde et prête**. Hub d'information économique discrète (sait qui possède quoi, qui prend quels risques).

Modèle d'IA : §1 BT racine + Utility AI. Mode **Marchand variant "service financier"** (pas d'inventaire matériel, mais services). Combat minimal — coffres scellés et appel à la Garde.

---

## 2. Cycle quotidien spécifique au métier

```
[07:00] Lever — vérification coffres, comptage matinal (anim count_coins 30s)
[08:00] **Ouverture comptoir** (heure plus tardive que Marchand/Boulanger)
[08:00–12:00] Guichet : dépôts, retraits, change (Mode Marchand variant "service financier")
[12:00–13:30] Pause (souvent à la [[Tavernier|taverne]] de prestige : information stratégique)
[13:30–18:00] Prêts, audits, négociations (Mode Dialogue prolongé)
[18:00] Fermeture, comptage de fermeture (anim seal_coffer 60s simulation)
[19:00–22:00] Vie sociale (réceptions, rumeurs, salons — hub d'élite)
[23:00] Coucher
```

**Lieux propres** :
- `comptoir_bancaire` (accueil, dépôt, retrait — palier Novice)
- `salle_coffres` (palier Initié+, sécurisée)
- `bureau_change` (palier Initié+, devises régionales)
- `salle_prêt` (palier Adepte+, négociation contrats)
- `bourse_augures` (palier Expert+, spéculation pré-Souffle, [[L'Accord]])
- `salle_audit` (palier Adepte+, vérification grands transferts)
- `home_location` (souvent quartier riche, hôtel particulier)

**Tâches métier intégrées** :
- T3.A — Comptage Éclats (anim 8s, palier Novice)
- T3.B — Authentification sceau / item (anim 12s, palier Adepte+)
- T3.C — Tenue registre (anim 15s, palier Novice)
- T3.D — Négociation prêt (Mode Dialogue + mini-jeu Acuité × Mémoire, palier Adepte+)
- T3.E — Audit grand compte (palier Adepte+, anim 25s)
- T3.F — Spéculation Bourse (palier Expert+, mini-jeu prédiction Souffle)

---

## 3. MBTI typique du métier

| Type | Justification |
|------|---------------|
| **INTJ** (Architecte) | Banquier-stratège, vision long terme, Bourse des Augures, prédit Souffles |
| **ISTJ** (Logisticien) | Banquier-comptable, précision absolue, registre exact, fiable |
| **ENTJ** (Commandant) | Maître d'institution, dynastie bancaire, conseille rois, finance guerres |
| **INTP** (Logicien) | Banquier-analyste, audit, détection de fraude, mathématique pure |
| **ESTJ** (Directeur) | Directeur d'agence, gère personnel, applique règles guilde strictement |

**Thinking strict** ([[Concepts Fondamentaux IA PNJ]] §6) : T dominant chez ~85% des banquiers. F rare et souvent associé à banque sacrée [[Foedus Animae]] (caution mystique → INFJ rare).

**Sous-représentés** : ENFP, ESFP (pas le tempérament rigoureux).

**Modulateurs spécifiques** :
- **T** ×1.5 sur calcul prêt et taux d'intérêt
- **J** ×1.4 sur strict respect horaires + contrats
- **N** ×1.3 sur spéculation Bourse Augures (vision pré-Souffle)
- **F (rare)** ×1.5 sur caution sacrée [[Foedus Animae]] (serment moral)

---

## 4. Triggers spécifiques au métier

```yaml
trigger:
  id: PlayerWantsLoan
  source_concept: [§7_reputation, §1_utility]
  conditions:
    - player.distance < 3m
    - player.dialogue_intent == "loan_request"
  utility_score: { Social.Trade.Negotiate: +50 }
  effect: évalue solvabilité (Acuité × Mémoire), accepte/refuse selon palier banquier + rep joueur
  mbti_modulation: { T: { calcul_pur: ×1.5 }, F: { tolérance_émotionnelle: +0.2 (rare) } }

trigger:
  id: PlayerOffersFakeItem
  source_concept: [§3_mémoire, §7_reputation]
  conditions:
    - player.item_authenticate.is_fake == true
  immediate_branch: ModeSocial.RefuseAndAlert
  effect: détecte (palier Initié+ détection courante, Adepte+ rares), alerte Garde
  mbti_modulation: { T+J: { dénonciation_immédiate: +1 }, F: { discussion_d'abord: +1 (rare) } }

trigger:
  id: PreSouffleSpeculationOpportunity
  source_concept: [§14_eres, §1_utility]
  conditions:
    - era.transition_imminent == true
    - palier >= "Expert"
  utility_score: { Routine.BourseAugures: +70 }
  effect: spéculation maximale (gain ou faillite), mini-jeu prédiction Souffle
  mbti_modulation: { N: { vision: ×1.5 }, S: { prudence: +1 } }

trigger:
  id: BankruptcyClient
  source_concept: [§3_mémoire, §15_quetes]
  conditions:
    - client_npc.default_status == true
  immediate_branch: Routine.RecouvrementJudiciaire
  effect: contacte [[Juge]] (recouvrement), saisit garanties
  mbti_modulation: { T+J: { strict: ×1.4 }, F: { délai_supplémentaire: +1 (rare) } }

trigger:
  id: KarmaRedPlayerNearVault
  source_concept: [§7_reputation, §16_combat]
  conditions:
    - player.karma_state == "rouge_ou_noir"
    - player.distance < 30m
    - npc.location == "comptoir_bancaire"
  immediate_branch: ModeCrise.SealVaultCallGarde
  effect: scelle coffre, alarme silencieuse, [[Garde]] arrive 30s
  mbti_modulation: { T+J: { protocole_strict: +1 } }

trigger:
  id: PostSouffleContractReset
  source_concept: [§14_eres, §3_mémoire]
  conditions:
    - era.souffle_just_occurred == true
    - contract.has_souffle_clause == true
  immediate_branch: Routine.ContractRecalibration
  effect: 1 semaine de re-évaluation tous les contrats actifs (rouille post-Souffle)
  mbti_modulation: { J: { stress: +1 }, T: { calcul_intensif: +1 } }

trigger:
  id: NobleRequestsCounsel
  source_concept: [§5_graphe_social, §12_factions]
  conditions:
    - noble_npc.request == "financial_counsel"
  utility_score: { Social.Talk.Strategic: +60 }
  effect: Mode Dialogue prolongé, peut influencer politique nationale
  mbti_modulation: { ENTJ+INTJ: { vision_long_terme: ×1.3 } }

trigger:
  id: ScribeBringsContractDraft
  source_concept: [§5_graphe_social, §19_npc_interaction]
  conditions:
    - scribe_npc.distance < 5m
  utility_score: { Routine.ReviewContract: +40 }
  effect: scène scriptée NPC↔NPC §19, signature et sceau
```

---

## 5. Modes contextuels propres

| Mode | Usage typique chez le Banquier |
|------|--------------------------------|
| **Routine** | Comptage, registre, audit (~30%) |
| **Marchand** | Variant "service financier" — pas d'inventaire matériel mais services. Mode dominant heures ouverture (~50%) |
| **Dialogue** | Riche, prolongé pour prêts et conseils (Mode dialogue 5-15 min gameplay) |
| **Crise** | **Mode Crise spécifique : scellement coffre + ordre de Garde** (cf. cas particulier briefing). Pas de combat direct |
| **Festivité** | Atténué : ferme tôt, participe en soirée (réceptions élites) |
| **Religieux** | [[Foedus Animae]] (caution sacrée — défaut = manquement à serment) ou [[Rota Mundi]] (remise de dette à Souffle, rare) |
| **Deuil** | Stoïque, court (1-3 jours), reprend rapidement (institution prime) |
| **Quête** | Donneur (récupérer débiteur en fuite, audit fraude) ; cible (sécurisation coffre attaque) |

**Cas particulier — Mode Crise spécifique** :
> En cas d'attaque sur la banque ou détection joueur Karma rouge proche : protocole strict.
> 1. **Scellement coffre** (anim seal_vault 30s, vault_locked = true)
> 2. **Alarme silencieuse** vers [[Garde]] locale (cf §16 Combat AI : Garde engage)
> 3. Banquier se cache derrière comptoir ou dans `salle_coffres` sécurisée
> 4. **Pas de fuite** (différencie du Marchand) : le banquier reste car le coffre ne peut être déplacé
> 5. MBTI **T+J** : protocole impeccable. **F (rare)** : peut négocier avec assaillants pour épargner clients

---

## 6. Réactions situationnelles signature

### 6.1 Présence joueur (§5.1)
- **Banquier exige preuves de solvabilité** (cf. briefing) : pas de service sans dépôt initial ou garantie. Reconnaissance haute = taux d'intérêt réduit (5% vs 10% standard).
- **Reconnaissance neutre** : services standards, ton formel.
- **Reconnaissance -50** : **refuse prêts** (priorité absolue), services minimum (change basique).
- **Reconnaissance -75** : refuse tout service, fait sortir.
- **Karma rouge** : trigger `KarmaRedPlayerNearVault` → scellement immédiat.

### 6.2 Attaque sur ville (§5.2) — **Cas particulier**
- **Scelle coffre** en priorité absolue (pas de fuite avec le coffre).
- Protocole **différent du Marchand** : reste sur place, alerte Garde, négocie si attaque organisée.
- MBTI **T+J** : impassible, exécute protocole. **F** : peut craquer si menace personnelle.
- Memory.Public.BankAttacked weight 100, propagation continent.

### 6.3 Festival (§5.3)
- **Banquier ferme tôt** (cf. briefing) : 16:00 au lieu de 18:00 jours de festival.
- Participe **soirée mondaine** (élite) plutôt que fête populaire.
- Marchand annuel récoltes : ouvre une **bourse temporaire** sur place pour transactions volume.

### 6.4 Climat (§5.4)
- **Pluie / tempête** : aucun effet (banque intérieure, indoor). MBTI **J** : ouvre normalement.
- **Sécheresse / pénurie** : **demande forte de prêts** (paysans, petits commerçants) → tension.
- **Phénomène cosmique** : **ruée sur les coffres** ([[Concepts Fondamentaux IA PNJ]] §14 Brume Mortelle), Mode Crise possible (panique de masse).

### 6.5 Souffle / Ère (§5.5)
- **Modulation paramétrique** :
  - Verdoiement : prêts faciles, taux bas (5%)
  - Sommeil de Glace : crise, défauts +30%, taux durs (15-20%)
  - Brume Mortelle : effondrement de confiance, **ruée sur coffres**
  - Ombre Longue : banques clandestines, contrebande financière
- **Pré-Souffle** : trigger `PreSouffleSpeculationOpportunity` → Bourse des Augures s'agite.
- **Post-Souffle** : trigger `PostSouffleContractReset` → 1 semaine recalibrage, rouille -15% précision.
- **Templates alternatifs §5.5.2** : Maitre Augure Domvar (Bourse Cendara) bascule en mode prophétique.

### 6.6 Pénurie / abondance (§5.6)
- **Pénurie** : taux durcis, défauts en hausse → MBTI **T** rationnel applique strict, **F (rare)** étend délais.
- **Abondance** : capital expand, prêts faciles, marges +.
- Banquier **observe** la santé économique régionale en temps réel.

### 6.7 Deuil (§5.7)
- **Stoïque** : continue ouverture (institution prime sur émotion).
- MBTI **T** : Colère rationnelle si associé/employé tué (vendetta judiciaire).
- Mort d'un grand débiteur : **drame financier** plus que émotionnel — MBTI **T** calcule pertes, lance recouvrement.

### 6.8 Quête (§5.8)
- **Donneur typique** :
  - "Recouvrer une dette auprès d'un débiteur en fuite" (T_RetrieveSomething version humaine, T+J) — MBTI ENTJ
  - "Auditer une comptabilité suspecte" (T_Investigate, T+N) — MBTI INTJ/INTP
  - "Sécuriser un transfert de fonds entre villes" (Escorte, T+S) — MBTI ESTJ
  - "Authentifier un sceau ancien" (T_DiscoverTruth, T+N) — MBTI INTP
- **Témoin précieux** (§5.8.3) : sait qui a déposé quoi (mémoire individuelle §3 forte par MBTI **J**, durée 48h+).

---

## 7. Lifecycle PNJ

**Apprenti** : commis au comptoir, écriture sur registres, tenue de caisse. 18-25 ans (formation longue).

**Maître** : palier Maître débloque **banque signée** (Héritage [[L'Accord]]) + capital quasi-illimité + conseiller des nations.

**Successeur** :
- Transmission **dynastique** (institution familiale 4-6 générations) ou **par cooptation guilde**.
- Cycle ~30-50 ans gameplay (formation longue).
- Héritage = sceau d'authentification + relations clients premium + savoir Bourse Augures.

**Mort** :
- Persistant majeur (ville importante).
- Successeur immédiat (vice-directeur prend la suite).
- Trigger `Memory.Public.BankerDied` weight 70, peut générer **succession contestée** (arc narratif, side-quest).

---

## 8. Variantes culturelles & signatures PNJ

| Pays | Variante | Signature MBTI / Profil |
|------|----------|-------------------------|
| **Galenor capitale** | Banquier-patriarche, dynastie, conseiller royal | ENTJ, gros volumes, hub politique |
| **Aldraan port** | Banquier-sceptique, refus 50% prêts, jamais de pertes | INTJ, lit chaque débiteur dans les yeux |
| **Cendara métropole** | Banquier-spéculateur, Bourse des Augures | ENTP rare ou INTJ, fortunes faites/perdues à chaque Souffle |
| **Noctis** | Banquière-clandestine [[Noctari]], finance contrebandiers | INTJ amorale |
| **Onara** | Banquier-prêtre [[Foedus Animae]], serments sacrés, caution mystique | INFJ rare, exception morale |

**PNJ canoniques nommés** (cohérent fichier source §10) :
- *Maison Veltarn* (Galenor capitale) — dynastie 6 générations, ENTJ collectif
- *Selvar le Sec* (Aldraan port) — INTJ, surnom dû à son refus systématique de boire pendant négociations
- *Maitre Augure Domvar* (Cendara) — INTJ, directeur Bourse des Augures, oracle

---

*Liens : [[Comportements PNJ - Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]] · [[03 - Mécaniques/Métiers/Commerce et Services/Banquier|Banquier (gameplay)]] · [[Marchand]] · [[Scribe]] · [[Juge]] · [[Conseiller]] · [[Tavernier]] · [[Foedus Animae]]*
