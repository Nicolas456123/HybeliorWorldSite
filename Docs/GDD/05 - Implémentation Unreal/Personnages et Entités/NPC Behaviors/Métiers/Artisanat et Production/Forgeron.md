---
tags: [pnj, comportement, métier, artisanat, forgeron, ia, template]
type: behavior-template
métier_lié: "[[Forgeron]]"
mbti_typique: [ISTJ, ISTP, ESTP]
karma_typique: [neutre, gris-clair]
factions_compatibles: [Lex Petra, Ignis Aeternum, Catena Fracta, Galenor impérial, Mosrack libre]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, animations-uniques, sons]
---

# 🔨 Template PNJ — Forgeron

> Comportement situationnel d'un PNJ Forgeron. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. Spécialise les Tâches 3 et 5 (travail matin/après-midi) avec la **boucle de forge** canonique. Métier joueur correspondant : [[Forgeron]].
>
> Ce template **réécrit et intègre** l'ébauche `Métiers - Forgeron.md` (archivée dans [[_Ebauches Archivees/Métiers - Forgeron|_Ebauches Archivees]]).

---

## 1. Vue d'ensemble

Le Forgeron est le pilier **physique-méthodique** d'un village. Lever tôt (~05:00), ouverture de forge à 06:00, fermeture à 19:00 — il enchaîne les boucles de chauffe-frappe-trempe avec une régularité cathédrale. Manie le marteau en permanence : **bascule rapide en Mode Crise** (combat) si raid bandit ou créature majeure, ses outils étant déjà des armes contondantes.

- **Identité comportementale** : routinier sédentaire, travail répétitif gratifiant, satisfaction du métal façonné
- **Position sociale** : artisan respecté, voix posée, opinions tranchées sur l'acier et le travail bien fait
- **Slot Mode Marchand** : ouvre le comptoir aux clients, vend les pièces du jour selon `mastery_level`
- **Lien chaîne** : amont [[Mineur]] / [[Tanneur]] / [[Menuisier]] · aval joueurs combattants, [[Architecte]] (ferrures), [[Bijoutier]] (sertissage T4+)

---

## 2. Cycle quotidien

```
05:00  Lever, petit-déjeuner solitaire ou en famille
06:00  Allumage four (T1 récup matériel + marteau)  → boucle forge
12:00  Pause déjeuner courte (15-30 min)
12:30  Reprise forge
17:00  Bascule Mode Marchand (vente des pièces du jour)
19:00  Fermeture forge
19:30  Repas + loisir (taverne pour ESTP, foyer pour ISTJ/ISTP)
21:00  Coucher
```

### Boucle de forge canonique (T3+T5 spécialisés)

```
[T1 Récupérer matériel + marteau]
   ↓
[T2 Aller au four]
   ↓
[T3 Faire chauffer le métal] → VFX rouge incandescent, attiser
   ↓
[T4 Aller à l'enclume] (cooldown métal 8s max)
   ↓
[T5 Tapper le fer] (3-5 coups, étincelles)
   ↓
[T6 Plonger dans l'eau / trempe] (sifflement vapeur)
   ↓
[T7 Poser la pièce] → boucle T1 si matériau dispo
```

> Voir `forge_furnace`, `forge_anvil`, `forge_water_basin`, `material_storage`, `finished_pieces_rack` pour ancres spatiales (Phase 3 layout).

---

## 3. MBTI typique

| Type | Profil forgeron | Note |
|------|-----------------|------|
| **ISTJ** | Forgeron de village, méthodique, prix fixes, recettes traditionnelles | Le défaut canonique |
| **ISTP** | Forgeron solitaire de montagne, virtuose technique, peu loquace | Fréquent en Alkaran/Cendara |
| **ESTP** | Forgeron-aventurier, contrebande de pièces signature, tournées de villes | Rare mais marquant |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **I/E** : ISTJ/ISTP → mode Marchand laconique (1-3 phrases) ; ESTP → bavard, raconte ses voyages
- **S** (commun aux 3) : focus production concrète, peu de spéculation cosmique aux Souffles
- **T** (commun aux 3) : prix rigides, négociation difficile (`rigidité_prix +30`)
- **J vs P** : ISTJ adhère strict aux horaires ; ISTP/ESTP plus souples (pause prolongée si sujet d'intérêt)

---

## 4. Triggers situationnels

> Format canonique [[Actions Situationnelles]] §4.

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **ForgeStart** | `wake_time` atteint + four froid | T1 puis boucle |
| **MetalCooled** | `cooldown_metal_time` dépassé en T4/T5 | Retour T3 (refonte) |
| **MaterialEmpty** | `material_storage` vide | Idle ou bascule sous-tâche `commander_matériau` |
| **CustomerApproach** | Joueur < 5m + heures ouverture | `Routine.Pause` court → bascule [[Modes Sociaux]] §Marchand |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m | ThreatLevel +30 ; saisit marteau (déjà en main → +10 Combat.Defense) |
| **AllyAttackedNearby** | Allié `family/friends` <10m attaqué | Court-circuit P1 → `Combat.Defense` (frappe au marteau) |
| **RaidOnVillage** | Tag `Population.Catastrophe.Imminent` | Bascule Mode Crise — voir §6 |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul `wake_hour_offset`, modulation prix +/-10% (§5.5) |
| **PenuryMineral** | Économie locale en pénurie | Travail au ralenti, prix +25% |

---

## 5. Modes superposables

> [[Actions Situationnelles]] §3 catalogue 8 modes. Pour le Forgeron :

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Travail forge | Boucle 7 tâches |
| **Marchand** | Joueur s'approche en heures ouverture | Pose pièce, salue, propose stock ; ISTJ/ISTP laconique, ESTP expansif |
| **Dialogue** | Initiation joueur ou collègue | Discute pièces, alliages, recettes ; T = factuel, refuse spéculation |
| **Crise** | ThreatLevel ≥ 50, raid, attaque directe | **Saisit marteau-arme**, défend forge, bascule combatif (cf. §6) |
| **Festivité** | Festival local | Réduction travail 50%, étal à l'extérieur, bonne humeur |
| **Religieux** | Sabbat Ignis Aeternum / Lex Petra | Ferme forge pendant créneau ; rituels de bénédiction du four (Ignis) |
| **Deuil** | Mort proche détectée (graphe §5) | Forge ralentie, qualité -1 tier 3 jours (mémoire individuelle deuil) |
| **Quête** | Donneur quête (commande exclusive) | Continue routine + dialogue spécifique au joueur cible |

Cascade priorité : Crise > Religieux (sabbat strict) > Deuil > Marchand > Routine.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive (Mode Marchand)

- **Trigger** : `CustomerApproach` + heures ouverture
- **Branche BT** : `ModeSocial.StandardGreet` ou `ModeSocial.WarmGreet` selon `rep_effective`
- **Comportement** :
  - Pose la pièce en cours (animation `pose_piece_propre`)
  - Essuie ses mains sur le tablier
  - Salue selon MBTI : ISTJ "Que cherchez-vous ?", ESTP "Ah, un client ! Regardez ces lames !"
- **Prix** : modulés Reconnaissance (-30% à +50% selon seuil §7) × `rigidité_prix +30` (T) → moins de marge négociation

### 6.2 Attaque sur le village (Mode Crise)

- **Trigger** : `RaidOnVillage` ou `AllyAttackedNearby` (P1)
- **Branche BT** : `BT_NPCCombat.Defense` agressive
- **Comportement** :
  - Marteau-outil devient marteau-arme (frappe contondante T1-T2)
  - **MBTI T+J (ISTJ)** : `Combat.Engage` rationnel, défend la forge en priorité (matériel précieux)
  - **MBTI T+P (ISTP)** : `Combat.Engage` virtuose, frappes calculées
  - **MBTI E+P (ESTP)** : `Combat.Engage` agressif, contre-attaque immédiate
- **Mood** : `Colere +40`, `Peur +20` (les 3 types restent calmes — base T)
- **Mémoire** : `Memory.Public.RaidOnVillage` weight 100

### 6.3 Témoin de vol à la forge

- **Trigger** : Joueur tente vol depuis `material_storage` ou `finished_pieces_rack` détecté
- **Branche BT** : `Combat.Engage` direct (court-circuit P1 — son métier attaqué)
- **Comportement** : crie ("Au voleur !"), saisit marteau, charge ; alerte propagation village (§3 Mémoire)
- **Réputation** : -40 individuelle + -20 faction locale

### 6.4 Souffle / changement d'Ère

- **Trigger** : `EraSouffleBroadcast`
- **Effets paramétriques** (§5.5.1) :
  - **Eldoria (Feu Endormi)** : +20% qualité production, VFX étincelles renforcés, mood +5
  - **Noctis (Ombre Longue)** : -10% production, prix minerai +25%, mood -5 (inquiétude métier T)
  - **Climata (Sommeil de Glace)** : +30% qualité trempe, focus outils ; baisse productivité chaleur dispersée
  - **Tempora (Échos Brisés)** : ±15% rendement aléatoire, items *Brisé* possibles → frustration ISTJ visible
- **MBTI S** (commun) : peu de spéculation, "bah, c'est comme ça, on travaille"

### 6.5 Pénurie minerai

- **Trigger** : `PenuryMineral`
- **Effets** : travail au ralenti (50% cadence), prix +25%, dialogue plaintif (T = "le Mineur ne livre plus")
- **Mood** : `Colere +10` baseline durant pénurie

---

## 7. Lifecycle PNJ

> [[Concepts Fondamentaux IA PNJ]] §9 + §18.

- **Catégorie** : Famille de génération (persistant) ou Nommé authored (5-15 par capitale)
- **Mort transient/famille** : 7 jours gameplay → successeur narratif (apprenti devient maître ; reroll MBTI cohérent ISTJ/ISTP/ESTP)
- **Mort nommé authored** : permanente, side quest "La forge muette" générée, statue commémorative possible (cf. [[Sculpteur]] héritage)
- **Apprenti** (graphe §5) : 0-3 apprentis selon `mastery_level` ; sous-PNJ avec cycle simplifié, monte mastery progressivement
- **Héritage** : un Forgeron-Maître nommé peut signer une **œuvre Héritage** (épée légendaire) inscrite aux chroniques, survivant à plusieurs Parties

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par nation

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Mosrack** (cité-forge centrale) | Acier-Mosrack canonique | ISTJ | Acier de référence, école académique |
| **Cendara** (volcanique) | Forge volcanique, Ignis Aeternum | ESTP | Lames basaltiques, recettes feu sacré |
| **Alkaran** (Nord) | Trempe en eau de glace | ISTP | Aciers durcis, technique du froid |
| **Galenor** (impérial) | Forge cathédrale uniformisée | ISTJ | Armes/armures de masse, qualité standardisée |
| **Avalor** (royal) | Sertissage royal (frontière Bijoutier) | ISTJ | Armes ornementées, frontière joaillerie |

### Signatures PNJ (Phase 4 stub)

- **Aldric le Marteau-de-Mosrack** (ISTJ Maître) — Acier-Mosrack canonique, école académique
- **Vesna la Givrée** (ISTP Maître, Alkaran) — trempe en eau de glace
- **Théron du Cratère** (ESTP Maître, Cendara) — forge volcanique, Ignis Aeternum
- **Olwyn la Sertisseuse** (ISTJ Maître, Avalor) — frontière Bijoutier-Forgeron
- **Ivar Sanglant** (ESTP Maître-Légende, Galenor) — signataire de l'Acier Ivar

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Forgeron]] (archétype joueur) · [[Mineur]] · [[Tanneur]] · [[Bijoutier]] · [[Architecte]] · [[Armes et Maîtrise]]*
