---
tags: [pnj, comportement, métier, architecture, chantier, tailleur, pierre, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Artisanat et Production/Tailleur de pierre|Tailleur de pierre]]"
mbti_typique: [ISTP, INTP, ISTJ]
karma_typique: vert
factions_compatibles: [Lex Petra, Galenor académique, Cendara volcanique, Cestra, Alkaran granite]
catégorie_métier: Architecture chantier
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, distinction-Sculpteur-Maçon, frappe-ratée-gold-sink]
---

# ⛏️ Template PNJ — Tailleur de pierre

> Comportement situationnel d'un PNJ Tailleur de pierre. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Métier précision** (utilitaire vs [[Sculpteur]] artistique). Cycle plus monotone. Métier joueur : [[03 - Mécaniques/Métiers/Artisanat et Production/Tailleur de pierre|Tailleur de pierre]].

---

## 1. Vue d'ensemble

Le Tailleur de pierre transforme la pierre brute en **éléments construits** : blocs équarris, colonnes, dalles de pavement, ardoises de toiture, fûts. Livre des pièces **prêtes à poser** au [[Maçon]]. Profil : **précision + force, patient, monotone, fier de la finesse**. **Distinct du [[Sculpteur]]** (artistique 3D) et du **[[Maçon]]** (assemblage). Frappe ratée = bloc perdu (gold sink).

- **Identité comportementale** : ouvrier précis, patient, méditatif (frappes répétitives), peu communicatif
- **Position sociale** : artisan respecté, **fournisseur** plutôt qu'exécutant chantier
- **Slot Mode Marchand** : vente de pièces préparées au [[Maçon]] / [[Architecte]] (au m² ou unité)
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]] (extraction carrière, parfois lui-même), [[Forgeron]] (burins, ciseaux trempés) · aval [[Maçon]] (pose), [[Architecte]] (spec), [[Sculpteur]] (sculpte sur blocs préparés), [[Lapidaire]] (frontière fine)

---

## 2. Cycle quotidien

```
06:00  Lever, petit-déjeuner solitaire ou famille
06:30  Marche vers atelier ou carrière
07:00  Sélection bloc brut (Acuité — lecture des veines, fissures)
07:30  T3 spé : tracé du plan de taille au compas/cordeau
08:00  T5 spé : frappe au maillet sur burin (anim répétée 8h, méditative)
12:00  Pause déjeuner (frugale, sur place — poussière)
12:30  Reprise frappe
16:00  Polissoir / finition (Adepte+)
17:30  Tri pièces, dépôt
18:00  Rentre, bain (très poussiéreux)
19:00  Repas + lecture rare (INTP) ou silence (ISTJ/ISTP)
21:30  Coucher
```

### Boucle taille canonique (T3+T5 spécialisés, monotone-méditative)

```
[T1 Sélection bloc brut]
   ↓
[T2 Tracé plan de taille au cordeau / compas] (Acuité)
   ↓
[T3 Première dégrossissage à la pointerolle] (anim 5s répétée)
   ↓
[T4 Taille fine au burin / ciseau] (anim 8s répétée — gestes précis)
   ↓
[T5 Frappe maillet] (rythme régulier — méditatif)
   ↓
[T6 Polissage final] (Adepte+)
   ↓
[T7 Inspection (refus si fissure découverte)]
```

> Voir `atelier_taille_pierre`, `carrière_extraction`, `polissoir_station`, `tréteau_finition` pour ancres.

---

## 3. MBTI typique

| Type | Profil tailleur pierre | Note |
|------|------------------------|------|
| **ISTP** | Tailleur solitaire, virtuose technique, frappes calculées | Le défaut canonique (Cendara, Alkaran) |
| **INTP** | Tailleur-théoricien, étudie roches, expérimente techniques | Académique (Lumasar) |
| **ISTJ** | Tailleur de guilde, méthode rigoureuse, recettes culturelles | Galenor, Cestra |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **T** (commun) : factuel, rationnel, prix fixes
- **I** (commun) : silencieux, méditatif (frappes répétitives)
- **P (ISTP/INTP)** : adapte selon roche
- **J (ISTJ)** : méthode rigoureuse, recettes traditionnelles
- **N (INTP)** : spéculation sur la roche (origines géologiques, modulation par Ères)
- **S (ISTP/ISTJ)** : focus pratique, sens tactile

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **TailleStart** | `wake_time` + jour ouvré | T1 sélection bloc |
| **CarrièreVisit** | Approvisionnement ou besoin pierre rare | Marche vers carrière, sélection |
| **FrappeRatée** | RNG check fail (frappe maillet trop forte) | **Bloc fendu — perte totale** ; mood -20 (frustration) |
| **CommandeSpéciale** | [[Architecte]] commande pièce sur-mesure | Bascule Mode Quête (commande exclusive) |
| **MaçonOrder** | [[Maçon]] commande lot de blocs standard | Production en série, anim répétée |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m | Saisit maillet (déjà en main) ; arme contondante T1 |
| **EraSouffleBroadcast** | Nouveau Souffle | Roche modifiée (Tempora) — fissures imprévisibles |
| **PenuryStone** | Pénurie pierre | Travail au ralenti, ouverture nouvelle carrière |
| **MasterworkSession** | Pièce signature en cours (Maître+) | Concentration extrême, refuse interruptions |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Atelier ou carrière | Boucle taille (monotone-méditative) |
| **Marchand** | Vente pièces au Maçon/Architecte | Présente lot, prix au m² ou unité |
| **Dialogue** | Inspection ou client | Bref technique ; INTP plus loquace sur la roche |
| **Crise** | ThreatLevel ≥ 50 | Fuit (atelier rural — pas de combat productif) ; saisit maillet en défense |
| **Festivité** | Festival local | Atténué (continue taille matinale, rejoint le soir) |
| **Religieux** | [[Lore/Religions/Lex Petra]] (serment matinal sur pierre — fort chez Tailleurs) | Rituel court avant taille |
| **Deuil** | Mort proche | Ralentit cadence, qualité maintenue |
| **Quête** | Pièce signature ou exceptionnelle | Continue routine + dialogue |

Cascade priorité : Crise > Religieux > Marchand > Routine.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche

- **Comportement** :
  - **ISTP** : silence, hoche, montre les pièces
  - **INTP** : "Bonjour. Vous cherchez quelle finition ? Granit, marbre, ardoise ?" — peut s'animer si client érudit
  - **ISTJ** : "Tarif au m². Lot prêt en livraison."
- **Reconnaissance +75** : montre pièces signature (Maître+), explique technique
- **Reconnaissance -50** : refuse vente (pièces réservées commande prioritaire)

### 6.2 Frappe ratée — bloc perdu (gold sink mécanique)

- **Trigger** : `FrappeRatée`
- **Mood** : -20 immédiat (frustration MBTI **T** — perte rationnelle)
- **Comportement** :
  - **ISTP** : juron silencieux, recommence
  - **INTP** : analyse la fissure (point faible roche, leçon technique)
  - **ISTJ** : irritation visible, changement maillet (vérifie outil)
- **Mémoire** : pas de propagation (sait que ça arrive), mais frustration cumulée

### 6.3 Mode Crise (atypique)

- **Trigger** : Attaque ou raid
- **Branche BT** : `Combat.Flee` (atelier rural, peu de chance combat)
- **Comportement** : maillet en arme défensive (T1-T2), fuit vers village

### 6.4 Souffle / changement d'Ère

- **Eldoria** : marbre plus lumineux (réflexion solaire), prix +10% ; mood +5
- **Tempora** : roche temporellement instable — fissures imprévisibles, frappes ratées +30%
- **Climata** : pierre gelée, lente à travailler ; saison creuse l'hiver
- **MBTI N (INTP)** : interprétation cosmologique de l'instabilité ("la pierre garde l'Ère")

### 6.5 Pièce signature (Maître+)

- **Trigger** : `MasterworkSession`
- **Comportement** : concentration extrême, refuse interruptions (cri si dérangé MBTI **T** + colère)
- **Effet** : +1 tier qualité si réussite, échec catastrophique si interrompu
- **Mémoire** : weight 80 si réussite (fierté inscrite Héritage)

### 6.6 Distinction Sculpteur / Maçon / Lapidaire

- **vs [[Sculpteur]]** : Sculpteur = artistique 3D (statues, motifs), Tailleur = utilitaire 2D/blocs lisses
- **vs [[Maçon]]** : Maçon = assemblage chantier, Tailleur = préparation atelier (fournisseur)
- **vs [[Lapidaire]]** : Lapidaire = gemmes (millimétrique), Tailleur = blocs (centimétrique)

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (atelier transmis) ou Nommé authored (1-2 par cité construite)
- **Mort transient/famille** : 7 jours → apprenti reprend ; reroll MBTI cohérent
- **Mort nommé authored** : permanente, side-quest "La pièce inachevée" possible
- **Apprenti** : 1-2 (transmission frappe précise — long apprentissage)
- **Héritage** : un Maître peut signer une **colonnade Héritage** (palais, temple) inscrite aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Galenor** (académique) | Marbre blanc académique, Lumasar | ISTJ | Marbre blanc, écoles |
| **Evertia** (impérial) | Marbre rose impérial, Caëspia | ISTJ | Marbre rose Caëspia |
| **Alkaran** (Nord) | Granite, ardoise — pierre noire | ISTP | Granite, ardoise toiture |
| **Cendara** (volcanique) | Basalte volcanique noir | ISTP | Basalte sacré |
| **Cestra** (Vermilis) | Pierre rouge de Vermilis | ISTJ | Pierre rouge urbaine |

### Signatures PNJ (Phase 4 stub)

- **Maître Aldwen le Blanc** (ISTJ Maître-Légende, Lumasar) — colonnades de l'Académie
- **Vela la Granite** (ISTP Maître, Alkaran) — ardoise du Sanctuaire Nordique
- **Tarek le Basalte** (ISTP Maître, Cendara) — pierre noire du Temple Ignis
- **Maître Roderick** (ISTJ Maître, Cestra) — pierre rouge des Murailles

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Artisanat et Production/Tailleur de pierre|Tailleur de pierre (gameplay)]] · [[Maçon]] · [[Architecte]] · [[Sculpteur]] · [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]] · [[Lapidaire]] · [[Forgeron]] · [[Architecture/Index]]*
