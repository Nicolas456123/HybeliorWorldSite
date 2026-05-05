---
tags: [pnj, comportement, métier, aubergiste, ia]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Commerce et Services/Aubergiste]]
mbti_typique: [ISFJ, ESFJ, INFJ, ISTJ, ENFJ]
karma_typique: vert
factions_compatibles: [Guilde des Aubergistes, Foedus Animae (auberge sacrée), Via Ventus (auberge des routes), Concordants L'Accord, Indépendants]
needs_review_for: [calibration-playtest, taux-régen-Labeur-paliers]
---

# 🛏️ Comportement PNJ — Aubergiste

> Template de comportement IA pour les PNJ Aubergistes d'Hybelior. Applique [[Concepts Fondamentaux IA PNJ|les 20 Concepts Fondamentaux]] et [[Actions Situationnelles]] au **maître de la nuit et du matin** — vendeur de repos, sécurité, petit-déjeuner. Cycle inverse du Tavernier : lever **tôt**, coucher tôt.
>
> **Métier gameplay** : voir [[03 - Mécaniques/Métiers/Commerce et Services/Aubergiste]].

---

## 1. Vue d'ensemble

L'Aubergiste-PNJ est un **maître discret du repos** : profil dominant **introverti structuré, calme, observateur, mémoire des visages, autorité bienveillante**. Service clé : **régénération accélérée du [[Labeur]]** (cf. fichier source §9). Hub de **clients identifiés** (différent du Tavernier qui flux anonyme). Cycle inverse Tavernier : **matin > soir**. Auberge = **point fixe** dans géographie hostile, **paix garantie** sous le toit (zone safe PvP).

Modèle d'IA : §1 BT racine + Utility AI. Mode dominant **Marchand variant "service repos"** + interactions clients individualisées. Combat indirect via gardiens nocturnes ([[Garde]] employé).

---

## 2. Cycle quotidien spécifique au métier

> **Cycle inverse du Tavernier** — matin actif, soir clôturé.

```
[05:00] Lever — préparation petit-déj, cuisine matinale (cf. briefing : matin/repos)
[06:00–10:00] **Service petit-déjeuner**, départs voyageurs (Mode Marchand variant "service")
[10:00–14:00] Ménage chambres, lessive, préparation soir
[14:00–17:00] Pause / réception fournisseurs ([[Boulanger]], [[Brasseur]])
[17:00–22:00] Accueil arrivants, service dîner léger
[22:00–00:00] Fermeture, registre, comptes
[00:00–05:00] **Sommeil** (gardien de nuit prend le relais)
```

**Lieux propres** :
- `hall_accueil` (réception, registre, palier Novice)
- `chambres` (5-30 selon palier)
- `salle_à_manger` (petit-déjeuner)
- `étable_auberge` (palier Initié+, montures voyageurs)
- `coffre_privé` (palier Initié+, stockage clients)
- `bains_chauds` (palier Adepte+)
- `salle_privée` (palier Adepte+, réunions discrètes)
- `home_location` (souvent appartement attenant)

**Tâches métier intégrées** :
- T3.A — Accueil arrivant (anim greet 8s, registre, palier Novice)
- T3.B — Service petit-déjeuner (anim serve 6s, palier Novice)
- T3.C — Ménage chambre (anim clean 30s par chambre)
- T3.D — Préparation feu / chauffage (palier Initié+, anim stoke_fire)
- T3.E — Authentification client (palier Adepte+, mini-jeu lecture humeur Acuité)
- T3.F — Préparation suite VIP (palier Expert+, anim 60s simulation)

---

## 3. MBTI typique du métier

| Type | Justification |
|------|---------------|
| **ISFJ** (Défenseur) | Service maternel, mémoire des préférences, accueil discret |
| **ESFJ** (Consul) | Aubergiste-cordial, sourire, info précieuse aux voyageurs réguliers |
| **INFJ** (Avocat) | Aubergiste-prêtre [[Foedus Animae]], paix sacrée garantie |
| **ISTJ** (Logisticien) | Aubergiste-discret, accueil sans questions, clients louches |
| **ENFJ** (Protagoniste) | Aubergiste-matriarche, Présence imposante, ancienne aventurière |

**Sous-représentés** : ENTP, ESTP (pas le tempérament service silencieux). ESFP (trop festif — c'est le Tavernier).

**Modulateurs spécifiques** :
- **Présence** Couche 0 ([[Personnage]]) ×1.4 — marque la qualité ressentie de l'auberge
- **F** ×1.4 sur lecture humeur clients (anticipation conflit, anticipation besoin)
- **J** ×1.5 sur strictes règles maison (couvre-feu, sécurité)
- **MBTI INFJ** [[Foedus Animae]] ×1.5 sur enforcement paix sacrée (no PvP)

---

## 4. Triggers spécifiques au métier

```yaml
trigger:
  id: TravelerArrives
  source_concept: [§7_reputation, §3_mémoire]
  conditions:
    - npc_or_player.distance < 5m
    - npc_or_player.intent == "lodge"
  utility_score: { Social.Greet: +60, Social.Trade.Lodging: +50 }
  effect: registre des hôtes (mémoire individuelle §3 weight 30, Memory.Public.GuestArrived weight 10)
  mbti_modulation: { F: { lecture_humeur: +1 }, J: { questions_règles_strictes: +1 } }

trigger:
  id: PlayerNeedsRest
  source_concept: [§4_emotion, §1_utility]
  conditions:
    - player.fatigue > 70%
    - player.distance < 5m
  utility_score: { Social.Trade.Lodging: +70 }
  effect: propose chambre selon palier (régen Labeur ×1.2 à ×2.0 selon palier)

trigger:
  id: SuspiciousClientArrives
  source_concept: [§2_perception, §7_reputation]
  conditions:
    - client.threat_level > 30 OR client.karma_red == true
  immediate_branch: ModeSocial.LectureClient
  effect: Acuité check, accueil prudent, MBTI ISTJ accepte sans questions, INFJ refuse moralement
  mbti_modulation: { F+J: { refus_moral: +1 }, T+P: { tolérance_si_paiement: +1 } }

trigger:
  id: PvPAttemptUnderAubergisteRoof
  source_concept: [§8_decision_P0, §13_religion]
  conditions:
    - player.combat_action == true
    - npc.location == "auberge_interior"
    - auberge.is_sanctuary == true
  immediate_branch: ModeCrise.EnforceSafetyZone (court-circuit P0)
  effect: serment du seuil (auberge sacrée Foedus Animae) → combat impossible OU [[Garde]] intervient
  mbti_modulation: { INFJ: { enforcement_serment: ×1.5 } }

trigger:
  id: NightShiftSecurityCheck
  source_concept: [§2_perception, §16_combat]
  conditions:
    - time.hour == 00:00
    - npc.has_gardien == true
  utility_score: { Routine.NightHandover: +60 }
  effect: passage de relais avec gardien nocturne ([[Garde]] employé)

trigger:
  id: BoulangerDeliversBread
  source_concept: [§5_graphe_social, §19_npc_interaction]
  conditions:
    - boulanger_npc.distance < 5m
    - time.hour ∈ [05:00, 07:00]
  utility_score: { Routine.RestockMorning: +50 }
  effect: livraison pour petit-déjeuner, scène scriptée §19

trigger:
  id: ClientCoffrePrivéRequest
  source_concept: [§7_reputation, §1_utility]
  conditions:
    - client.dialogue_intent == "store_item"
  utility_score: { Social.Trade.Coffre: +40 }
  effect: stockage temporaire (100 Éclats/mois, cf [[Économie]] §Coffre privé)

trigger:
  id: PelerinaireArrives
  source_concept: [§13_religion, §12_factions]
  conditions:
    - client.is_pèlerin == true
    - npc.faction_compatible == "Via Ventus" OR "Foedus Animae"
  utility_score: { Social.Trade.PrixRéduit: +50 }
  effect: prix réduits, accueil chaleureux, info routes pèlerinage
  mbti_modulation: { F+J: { hospitalité_amplifiée: ×1.5 } }
```

---

## 5. Modes contextuels propres

| Mode | Usage typique chez l'Aubergiste |
|------|---------------------------------|
| **Routine** | Ménage, cuisine, registre (~40%) |
| **Marchand** | Variant "service lodging" — accueil + chambre + bain + petit-déj (~40%) |
| **Dialogue** | Court mais profond (lecture humeur client), MBTI F surtout |
| **Crise** | **Auberge sacrée** : enforcement zone safe ; sinon appel [[Garde]]. Combat indirect |
| **Festivité** | Atténué — auberge accueille fêtards mais ne les anime pas (différencie du Tavernier). Suites premium VIP |
| **Religieux** | Forte composante [[Foedus Animae]] (auberge sacrée) ou [[Via Ventus]] (auberge des routes pour pèlerins) |
| **Deuil** | Discret, suspend lessive et loisir personnel, continue accueil |
| **Quête** | Donneur "voyageur a oublié objet précieux dans chambre 3" ; témoin (sait qui dort où) |

**Cas particuliers** :
- **Mode Sanctuaire actif** : auberge **Maître** = "Sanctuaire de la Route" (cf. fichier source §5) → **PvP impossible sous le toit** (cohérent [[PvP]] §Zones safes).
- **Mode Aubergiste matin / repos** (cf. briefing) : différencie strictement du Tavernier — Aubergiste **dort la nuit**, Tavernier travaille la nuit.

---

## 6. Réactions situationnelles signature

### 6.1 Présence joueur (§5.1)
- **Reconnaissance neutre** : prix standards, accueil cordial.
- **Reconnaissance +75** : meilleure chambre disponible, petit-déj enrichi gratuit, info précieuse (qui dort là, qui est passé).
- **Reconnaissance -50** : prix +20%, refuse suite premium.
- **Karma rouge** : MBTI **INFJ** [[Foedus Animae]] **refuse logement** ; MBTI **ISTJ** discret accepte si paiement comptant.

### 6.2 Attaque sur ville (§5.2)
- **Si auberge sacrée** : zone refuge — civils convergent. Aubergiste **enforce** la paix (gardien armé + Foedus Animae).
- **Sinon** : ferme volets, abrite voyageurs en chambres, contacte [[Garde]].
- MBTI **ENFJ matriarche** : peut prendre épée (ancienne aventurière).
- Memory.Public.AubergeAsRefuge weight 80.

### 6.3 Festival (§5.3)
- **Atténué** : auberge accueille fêtards mais ne participe pas (rôle de repos).
- Festivals = **fréquentation +30%** (afflux voyageurs).
- MBTI **ESFJ/ENFJ** : organise petit-déj festif le lendemain.

### 6.4 Climat (§5.4)
- **Pluie / tempête** : **fréquentation +50%** (refuge), prix bois chauffage +30%.
- **Sécheresse** : prix bains rares (eau précieuse).
- **Phénomène cosmique** : **point de rassemblement** — voyageurs anxieux convergent.

### 6.5 Souffle / Ère (§5.5)
- **Modulation paramétrique** :
  - Verdoiement : petit-déj copieux, fréquentation +20%, Labeur regen +10% bonus
  - Sommeil de Glace : bois chauffage cher, prix +30%, fréquentation +30% (besoin chaleur)
  - Vents (Aerion) : caravanes nombreuses, étables pleines, marges étables x2
  - Brume Mortelle : sécurité critique, prix gardiens +50%
  - Ombre Longue : auberges fortifiées, ouverture précoce
- **Post-Souffle** : voyageurs désorientés, sur-fréquentation 1 semaine, prix +20%.
- **Templates alternatifs §5.5.2** : auberge-Maître devient "Sanctuaire de la Route" Concordé → suite VIP automatique pour Concordants.

### 6.6 Pénurie / abondance (§5.6)
- **Pénurie** : petit-déj minimal, MBTI **F** maintient hospitalité par devoir moral.
- **Abondance** : suites premium activées, services étendus.

### 6.7 Deuil (§5.7)
- **Mort d'un client habitué** : MBTI **F** émotionnellement marqué, garde la chambre vide 3 jours en mémoire (geste).
- Funérailles dans auberge possibles ([[Foedus Animae]] veillée funéraire).

### 6.8 Quête (§5.8)
- **Donneur typique** :
  - "Un voyageur a oublié objet précieux dans chambre 3" (T_RetrieveSomething, T+S) — MBTI ISTJ
  - "Localiser un client qui n'est pas revenu de son escapade" (T_FindLost, F+S) — MBTI ESFJ
  - "Apporter ce paquet discret au prochain client de [pays]" (T_DeliverGoods, T+P) — MBTI ISTJ
  - "Investiguer pourquoi un client a peur de dormir" (T_Investigate, F+N) — MBTI INFJ
- **Témoin précieux** : **mémoire des passages** (qui a dormi où, quand) — info recherchée par enquêteurs / [[Espion]] / quêtes joueur.

---

## 7. Lifecycle PNJ

**Apprenti** : femme/homme de chambre, valet d'étable, marmiton. 14-22 ans.

**Maître** : palier Maître débloque **auberge légendaire** (Héritage [[L'Accord]]) + régen Labeur ×2.0 + "Sanctuaire de la Route".

**Successeur** :
- Transmission **familiale** ou **gestion seigneuriale**.
- Cycle ~25-40 ans gameplay.
- Héritage = sceau d'auberge + clientèle inter-régionale + recettes signature.

**Mort** :
- Persistant majeur (auberge identifiable géographiquement).
- Si meurt : auberge change d'âme, parfois ferme 1 saison avant successeur.
- Trigger `Memory.Public.AubergisteDied` weight 60.

---

## 8. Variantes culturelles & signatures PNJ

| Pays | Variante | Signature MBTI / Profil |
|------|----------|-------------------------|
| **Galenor central** | Aubergiste-matriarche au croisement, mythique | ENFJ, autorité bienveillante |
| **Aldraan port** | Aubergiste-cordial, route maritime, thé légendaire | ESFJ, mémoire des marins |
| **Aerion (caravanes)** | Aubergiste-discret, accueille tous, info ciblée | ISTJ, hub voyageurs |
| **Cendara montagne** | Aubergiste-vétéran, fortifiée, ancien chevalier | ISTJ, ancien soldat, sécurité absolue |
| **Onara** | Aubergiste-prêtre [[Foedus Animae]], auberge sacrée, paix garantie | INFJ, serment du seuil |

**PNJ canoniques nommés** (cohérent fichier source §10) :
- *Mère Aldira "des Cinq Routes"* (Galenor central) — ENFJ, auberge mythique au croisement
- *L'Hôte de la Brume* (Aldraan) — ESFJ, auberge maritime, légendaire pour son thé
- *Vorr "le Silencieux"* (Cendara montagne) — ISTJ, ancien chevalier, auberge fortifiée

---

*Liens : [[Comportements PNJ - Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]] · [[03 - Mécaniques/Métiers/Commerce et Services/Aubergiste|Aubergiste (gameplay)]] · [[Tavernier]] · [[Boulanger]] · [[Cuisinier]] · [[Marchand]] · [[Garde]] · [[Eleveur de créature]] · [[PvP]] · [[Foedus Animae]]*
