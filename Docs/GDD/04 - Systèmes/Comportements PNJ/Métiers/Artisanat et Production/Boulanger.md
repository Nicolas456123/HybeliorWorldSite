---
tags: [pnj, comportement, métier, artisanat, boulanger, ia, template]
type: behavior-template
métier_lié: "[[Boulanger]]"
mbti_typique: [ISFJ, ESFJ, ISTJ]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Foedus Animae, Rota Mundi, Ordo Caelum, Ignis Aeternum, Galenor impérial]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, recettes-pains-spécialités, lien-rumeurs-village]
---

# 🥖 Template PNJ — Boulanger

> Comportement situationnel d'un PNJ Boulanger. **Cycle inversé** : lever 03:00, fermeture 14:00. Mode Marchand central — le boulanger est avant tout un vendeur. Métier joueur : [[Boulanger]].
>
> Réécrit et intègre l'ébauche `Métiers - Boulanger.md` (archivée dans `_Ebauches Archivees/`).

---

## 1. Vue d'ensemble

Le Boulanger est le **point d'information sociale** d'un village ou d'un quartier. Lever **très tôt** (03:00), 4h de préparation pré-aube, ouverture matinale — il vend, écoute, propage les rumeurs. Cycle court mais intense : 11h de présence active, dont 7h en Mode Marchand.

- **Identité comportementale** : chaleureux-routinier, rythme serré, conversations brèves mais nombreuses
- **Position sociale** : carrefour des rumeurs (cf. [[Concepts Fondamentaux IA PNJ]] §3 — propagation village forte chez E)
- **Slot Mode Marchand** : 07:00-14:00 quasi-permanent, file de clients gérée
- **Lien chaîne** : amont [[Métiers|Meunier]] / [[Métiers|Apiculteur]] / [[Métiers|Berger]] · aval joueurs, [[Métiers|Tavernier]], [[Cuisinier]]

---

## 2. Cycle quotidien

```
03:00  Lever (très tôt)
03:30  Préparation pâte (T1) — pétrissage, levée, enfournement
06:30  Cuisson finale, refroidissement
07:00  Ouverture boulangerie (T2) → Mode Marchand
07:00–14:00  Vente continue (T3)
14:00  Fermeture (T4) — ranger comptoir
14:00–18:00  Approvisionnement / livraisons (T5) ou pause
18:00  Repas + loisir (taverne pour ESFJ, foyer pour ISFJ/ISTJ)
20:00  Coucher (tôt)
```

### Boucle préparation (T1 détaillée)

- 03:30 pétrissage (anim `pétrir`)
- 04:30 façonnage (anim `façonner_miches`)
- 05:00 levée + chauffe four (anim `attiser_four`)
- 06:00 enfournement (anim `enfourner_pain` à la pelle)
- 06:30 défournement (anim `surveiller_four` puis `extraire_pains`)
- 06:45 mise en présentoir (anim `disposer_pains_comptoir`)

> Stations : `bakery_back` (four, pétrin), `counter_position` (comptoir), `flour_supply` (stock farine).

---

## 3. MBTI typique

| Type | Profil boulanger | Note |
|------|------------------|------|
| **ISFJ** | Boulanger discret de quartier, soigneux, fidélise clientèle régulière | Le défaut canonique |
| **ESFJ** | Boulanger volubile, anime sa boulangerie, connaît tout le monde | Boulangers de cité |
| **ISTJ** | Boulanger rigoureux, recettes traditionnelles strictes, prix fixes | Boulangers de tradition (Galenor, Alkaran) |

Modulateurs :
- **S** (commun aux 3) : focus pratique sur la cuisson, peu de spéculation cosmique
- **F** (ISFJ/ESFJ) vs **T** (ISTJ) : ISFJ/ESFJ chaleureux, prix flexibles ; ISTJ formel, prix rigides
- **J** (commun) : adhère au cycle inversé strict, forte tolérance imprévu **basse** (mauvaise humeur si pénurie)
- **I/E** : ISFJ/ISTJ → file gérée silencieusement ; ESFJ → animation, anecdotes

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **PrepStart** | `wake_time` 03:00 atteint | Bascule T1 préparation |
| **OpeningTime** | `prep_done` + horloge ≥ 07:00 | Anim `ouvrir_volets`, écriteau "Ouvert", Mode Marchand |
| **CustomerQueue** | File clients > 5 | Anim `débordé`, accélère cadence vente |
| **LateCustomer** | Joueur arrive 14:01-14:15 | "Désolé fermé" OU "j'ai encore un pain" (chance × Mood) |
| **StockEmpty** | `inventory_marchand` vide | Fermeture anticipée + dialogue désolé |
| **ClosingTime** | Horloge ≥ 14:00 | Anim `fermer_volets`, bascule T5 |
| **FlourPenury** | `flour_supply` < 20% | Stock réduit, prix +25%, recettes simplifiées |
| **FestivalLocalStarts** | Tag festival actif | Pains spéciaux (gâteaux), prix x1.5, ouverture prolongée |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30 — civil ISFJ panique vite (peu d'arme = fuite) |
| **RaidOnVillage** | Tag catastrophe imminente | Mode Crise — fuite vers `home_location`, abandonne stock |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul prix +/-10%, recettes ère active débloquées |

---

## 5. Modes superposables

| Mode | Activation | Spécificité boulanger |
|------|-----------|------------------------|
| **Routine** | Préparation pré-aube + post-fermeture | T1, T5 |
| **Marchand** ★ | 07:00-14:00 quasi-permanent | Cœur du métier ; ESFJ animé, ISFJ chaleureux discret, ISTJ formel |
| **Dialogue** | Joueur engage hors transaction | Lieu de **rumeurs** ; propagation §3 forte chez E (×1.5) |
| **Crise** | Raid, attaque, incendie | **Fuite** prioritaire (peu d'arme — couteau de boulanger faible), Peur saturée vite chez ISFJ/ESFJ (F) |
| **Festivité** | Festival local | Ouverture prolongée, brioches/gâteaux signature, prix x1.5 |
| **Religieux** | Sabbat religion locale | Ferme pendant créneau ; **pains rituels** débloqués (Foedus Animae : Pain Spirale ; Ignis Aeternum : Pain Volcanique) |
| **Deuil** | Mort proche détectée | Boulangerie fermée 1-3j (×1.5 si MBTI F) ; pain noir simple à reprise |
| **Quête** | Donneur quête (cliente noble, pain rituel) | Continue cycle + sous-objectif livraison |

Cascade : Crise > Religieux (sabbat) > Deuil > Marchand > Festivité > Routine.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive (Mode Marchand)

- **Trigger** : `CustomerApproach` heures ouverture
- **Comportement** :
  - Pose la fournée (anim `essuyer_mains_tablier`)
  - **ESFJ** : "Bonjour ! Vous voulez goûter le pain du jour ? J'ai entendu que…" (relai rumeur §3)
  - **ISFJ** : sourire discret, "Que désirez-vous ?"
  - **ISTJ** : "Bonjour. La miche commune fait 5 Éclats."
- **Prix** : modulés Reconnaissance, ISFJ/ESFJ (F) plus indulgents (`rigidité_prix -20`)

### 6.2 File de clients > 5 (Trigger CustomerQueue)

- **Anim** : `débordé`, mains rapides, gestes secs
- **MBTI J** (commun) : visible irritation (cycle bousculé) ; ESFJ continue à plaisanter, ISTJ se concentre silencieusement
- **Effet** : cadence vente +30%, dialogues raccourcis aux salutations

### 6.3 Attaque sur la rue / village (Mode Crise)

- **Trigger** : `RaidOnVillage` ou `PlayerArmDrawnNearby` agressif
- **Branche BT** : Mode Crise = **fuite** prioritaire (P2 saturation Peur)
- **Comportement** :
  - **ISFJ/ESFJ (F)** : Peur saturée ≥80 quasi-immédiate → court-circuit `Combat.Flee` panique, ferme volets, cache derrière comptoir
  - **ISTJ (T)** : analyse, ferme méthodiquement la boutique, fuit avec coffre d'Éclats vers `home_location`
- **Aucun ne combat** (couteau de boulanger inadéquat)
- **Mémoire** : weight 80 individuelle ; ESFJ propage rumeur ×1.5 dans village

### 6.4 Pénurie de farine

- **Trigger** : `FlourPenury` (économie Meunier en rupture)
- **Effets** : stock réduit, prix +25%, recettes simplifiées (pain commun seul, plus de brioche)
- **Mood** : `Colere +5` baseline (frustration métier J), dialogue plaintif

### 6.5 Festival local

- **Trigger** : `FestivalLocalStarts`
- **Comportement** : sort gâteaux signatures, étend horaires (06:00-18:00), tarifs ×1.5
- **MBTI** : ESFJ s'épanouit (animateur naturel) ; ISFJ heureux mais discret ; ISTJ apprécie la rentrée, reste posé

### 6.6 Souffle / changement d'Ère

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | +20% production (céréales abondantes), mood +10 |
| **Sommeil de Glace** (Climata) | Céréales rares, focus pains de conservation, prix x1.3 |
| **Vents** (Aerion) | Recette "Pain du Voyageur" boostée, mood +5, rumeurs/chants |
| **Brume Mortelle** (Umbra) | Ouverture limitée, peur, demande pains rituels (ESFJ propage rumeur "Fin du monde") |
| **Rêve Lumineux** (Eldoria) | Pains dorés, magnitude ×2 jour |

### 6.7 Témoin de vol / dispute dans la file

- **Trigger** : Joueur tente couper la file ou vol
- **MBTI** :
  - **ESFJ** : intervention vocale immédiate ("Eh, attendez votre tour !"), alerte les voisins
  - **ISFJ** : silence gêné, soupir audible, signale après coup
  - **ISTJ** : intervention rationnelle, demande de respecter l'ordre
- **Réputation joueur** : -25 individuelle (témoin)

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (persistant), 1-2 par bourg, 3-5 par cité
- **Apprenti** : sous-PNJ qui prépare la pâte (cycle simplifié T1), monte progressivement
- **Mort famille** : 7 jours → successeur narratif (apprenti devient maître ; reroll MBTI cohérent ISFJ/ESFJ/ISTJ)
- **Mort nommée** : permanente, side quest "La boulangerie silencieuse" + pénurie temporaire pain dans le village

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par nation

| Nation | Style | MBTI dominant | Pain signature |
|--------|-------|---------------|----------------|
| **Galenor** (impérial) | Pain de Voyageur, pains de cour | ISTJ | Pain de Voyageur impérial |
| **Alkaran** (Nord) | Pain noir nordique, conservation longue | ISTJ | Pain Noir d'Alkaran |
| **Onara** | Boulangers rituels Foedus Animae | ISFJ | Pain Spirale (rituel) |
| **Cendara** (volcanique) | Pains épicés, four volcanique | ESFJ | Pain Volcanique (Ignis Aeternum) |
| **Astravia** | Boulangers astronomes Ordo Caelum | ISFJ | Brioche Étoilée (rituel Ordo Caelum) |
| **Vytharia** | Pains funéraires Vael'Kurash | ISFJ | Pain Onirique (Somnium Vigil) |

### Signatures PNJ (Phase 4 stub)

- **Maître Halvar de Galenor** (ISTJ Maître) — Pain de Voyageur impérial canonique
- **Vasta la Sombre d'Alkaran** (ISFJ Maître) — pain noir nordique, longue conservation
- **Padre Iolan d'Onara** (ISFJ Maître) — Pain Spirale rituel Foedus Animae
- **Maître Cendric de Cendara** (ESFJ Maître) — pain volcanique épicé, four au cratère
- **Astre Veyran d'Astravia** (ISFJ Maître) — Brioche Étoilée Ordo Caelum, recette à l'aube

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Boulanger]] (archétype joueur) · [[Pain]] · [[Métiers|Meunier]] · [[Cuisinier]]*
