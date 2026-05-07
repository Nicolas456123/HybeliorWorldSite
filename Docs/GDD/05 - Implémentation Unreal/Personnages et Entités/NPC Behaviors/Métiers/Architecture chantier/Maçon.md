---
tags: [pnj, comportement, métier, architecture, chantier, maçon, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Artisanat et Production/Maçon|Maçon]]"
mbti_typique: [ISTJ, ISTP, ESTJ]
karma_typique: vert
factions_compatibles: [Lex Petra, Galenor impérial, Mosrack libre, Cendara volcanique, Cestra]
catégorie_métier: Architecture chantier
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, mode-Crise-effondrement-chantier, mode-Festivité-inauguration, équipe-chantier]
---

# 🧱 Template PNJ — Maçon

> Comportement situationnel d'un PNJ Maçon. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Métier de chantier** sous direction d'[[Architecte]] dès T3+. Mode Crise = effondrement. Mode Festivité = inauguration. Métier joueur : [[03 - Mécaniques/Métiers/Artisanat et Production/Maçon|Maçon]]. Distinct **Architecte conçoit, Maçon érige**.

---

## 1. Vue d'ensemble

Le Maçon est le **bras qui érige** ce que l'[[Architecte]] a conçu. Assemble pierre, brique, mortier en murs porteurs, voûtes, fondations, cheminées, fours, ponts. Profil : **physique brut, méthodique, patient, fier de l'œuvre durable**. Métier **collectif** (équipe : apprenti porteur, compagnon poseur, maître appariteur). Cycle quotidien long (10-12h chantier au soleil).

- **Identité comportementale** : ouvrier discipliné, méthode, fierté de l'ouvrage durable
- **Position sociale** : artisan respecté, tout village a son Maçon (cheminée, four à pain, mur d'enceinte)
- **Slot Mode Marchand** : non-vendeur direct — paiement chantier au forfait par l'[[Architecte]] ou propriétaire
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]] (pierre brute, argile), [[Tailleur de pierre]] (blocs taillés), [[Forgeron]] (ferrures), [[Charpentier]] (échafaudages) · aval propriétaires (joueurs, guildes), [[Couvreur]] (toiture), [[Architecte]] (orchestration)

---

## 2. Cycle quotidien

```
05:30  Lever, petit-déjeuner copieux (Vigueur)
06:00  Marche vers chantier (5-30 min)
06:30  Briefing équipe (par contremaître ESTJ ou Architecte)
07:00  Mortier préparé (T3 spé : eau/chaux/sable)
07:30  Pose des pierres / briques (boucle T5 spé)
12:00  Pause déjeuner (45 min, repas chaud sur place)
12:45  Reprise pose
17:00  Nettoyage outils, dépôt matériel
17:30  Retour village
18:00  Bain (mineurs très sales, Maçons aussi), repas
20:00  Loisir bref (taverne ESTJ, foyer ISTJ/ISTP)
22:00  Coucher
```

### Boucle pose canonique (T3+T5 spécialisés)

```
[T1 Préparer mortier] (eau + chaux + sable, ratio précis)
   ↓
[T2 Charrier pierres / briques au pied du mur]
   ↓
[T3 Poser couche mortier sur précédent rang] (anim truelle 5s)
   ↓
[T4 Aligner pierre / brique avec niveau et plomb] (Acuité check)
   ↓
[T5 Frapper au maillet pour assoir] (anim 3s, étincelles légères)
   ↓
[T6 Vérifier alignement et boucler]
```

> Voir `chantier_zone`, `mortier_cuve`, `échafaudage`, `atelier_taille_intermédiaire`, `four_briques` pour ancres.

---

## 3. MBTI typique

| Type | Profil maçon | Note |
|------|--------------|------|
| **ISTJ** | Maçon de village, méthode traditionnelle, recettes mortier transmises | Le défaut canonique |
| **ISTP** | Maçon solitaire, virtuose technique, taille difficile | Frontière [[Tailleur de pierre]] |
| **ESTJ** | Maître maçon / contremaître, dirige équipe 5-15 ouvriers, négocie [[Architecte]] | Galenor impérial, Mosrack |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **S+T** (commun aux 3) : focus pratique, peu de spéculation
- **J (ISTJ/ESTJ)** : adhérence stricte aux horaires chantier, rigueur recettes
- **P (ISTP)** : adapte selon roche, climat
- **E (ESTJ)** : commandement équipe, voix forte
- **I (ISTJ/ISTP)** : exécution silencieuse, dialogue technique uniquement

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **ChantierStart** | `wake_time` + jour ouvré | Briefing équipe |
| **MortierEmpty** | Cuve mortier vide | Pause → préparation nouveau mortier |
| **MaterialDelivery** | [[Tailleur de pierre]] livre blocs taillés | Réception, paiement, signature |
| **CollapseDetected** | **Effondrement bâtiment en construction** | Court-circuit P0 → `Combat.Flee` ; **Architecte donne ordre évacuation** |
| **ScaffoldingFailure** | Échafaudage cède | P0 → `Combat.Flee` ; alerte voisins |
| **InaugurationDay** | Bâtiment terminé + cérémonie | Mode **Festivité spécifique** (fierté professionnelle) |
| **ArchitectInspection** | [[Architecte]] arrive pour inspection | Bascule Mode Dialogue technique |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m | Saisit maillet (déjà en main souvent) |
| **EraSouffleBroadcast** | Nouveau Souffle | Recettes mortier modifiées (Tempora rare) |
| **PenuryStone** | Pénurie pierre | Travail au ralenti, prix +25% |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Chantier actif | Boucle pose, mortier, alignement |
| **Marchand** | Atypique — réception paiement chantier | Discute prix avec Architecte/propriétaire |
| **Dialogue** | Inspection ou collègue | Bref technique ; ESTJ commande, ISTJ/ISTP exécute |
| **Crise** | **Effondrement / échafaudage cède** | `Combat.Flee` collectif, Architecte évacue |
| **Festivité** | **Inauguration bâtiment** ou festival | **Fierté professionnelle** — voir §6.3 |
| **Religieux** | [[Lore/Religions/Lex Petra]] (serment matinal sur pierre, courant chez Maçons) | Rituel court avant chantier |
| **Deuil** | Camarade tué (effondrement fréquent) | -25 mood 7j, équipe entière silencieuse |
| **Quête** | Chantier exceptionnel (cathédrale, rempart) | Continue routine + dialogue spécifique |

Cascade priorité : **Crise (effondrement)** > Religieux > Festivité (inauguration) > Routine.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche

- **Comportement** :
  - **ISTJ** : "Chantier en cours. Pas de visiteurs sans casque." — bref, ferme
  - **ISTP** : silence, hoche, retourne à la pose
  - **ESTJ** : "Bonjour. Architecte est par là si vous cherchez le devis."
- **Reconnaissance +75** : propose tour du chantier, raconte techniques

### 6.2 Mode Crise effondrement chantier

- **Trigger** : `CollapseDetected` ou `ScaffoldingFailure`
- **Branche BT** : `Combat.Flee` priorité absolue (P0) — équipe entière fuit
- **Comportement** :
  - **ESTJ contremaître** : crie ordre évacuation, compte les ouvriers
  - **[[Architecte]] présent** : donne ordre d'évacuation officiel (voix d'autorité)
  - **ISTJ/ISTP** : exécute fuite ordonnée, sauve outils précieux si possible
- **Mood** : `Peur +60`, `Colere +30` post-incident (rage envers défaut conception → Architecte)
- **Mémoire** : weight 100 (apprend, vigilance future)

### 6.3 Mode Festivité — Inauguration bâtiment

- **Trigger** : `InaugurationDay`
- **Comportement** :
  - **Présence obligatoire** de l'équipe complète (compagnon, apprenti, maître)
  - Vêtements propres (rare — Maçons habituellement sales)
  - **Fierté professionnelle** : Maître Maçon discours bref, ESTJ raconte difficultés vaincues
  - **ESTP/ENFP** Architecte/Sculpteur peuvent monter sur l'œuvre — Maçon reste sobre
- **Mood** : +30 général, sentiment d'œuvre durable
- **Effet social** : +20 Reconnaissance locale pour l'équipe

### 6.4 Souffle / changement d'Ère

- **Eldoria** : briques rouges plus durables, prix mortier -10% ; mood +5
- **Tempora** : recettes mortier instables, fissures imprévisibles ; ISTJ frustration
- **Climata** : mortier prend plus longtemps (froid), travail ralenti l'hiver
- **MBTI S** (commun) : peu de spéculation cosmique — "Bah, on adapte la recette."

### 6.5 Pénurie pierre

- **Trigger** : `PenuryStone`
- **Effets** : travail au ralenti, prix +25%, dépendance accrue [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]]/[[Tailleur de pierre]]
- **Side-quest** : "Trouver carrière de remplacement" possible

### 6.6 Distinction Architecte vs Maçon

- **[[Architecte]]** : conçoit (plans, calculs, devis), supervise, ne porte pas de pierre
- **Maçon (ce fichier)** : érige (porte, pose, frappe), exécute le plan
- **Frontière** : Maçon Maître peut concevoir T1-T2 (cabane, maison village) ; T3+ besoin Architecte

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (équipes pérennes) ou Nommé authored (1-2 par cité construite)
- **Mort transient/famille** : effondrements **non rares** → 7 jours → apprenti reprend
- **Mort nommé authored** : permanente, side-quest "Le mur de Maître [Nom]" (joueur peut hériter du chantier)
- **Apprenti** : 1-3 (équipe naturelle — porteur, poseur, maître)
- **Héritage** : un Maître peut signer un **bâtiment Héritage** (cathédrale, rempart) inscrit aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Mosrack** ([[Lore/Religions/Lex Petra]] école) | Murailles Rouges de Vermilis, école Lex Petra | ISTJ | Fortifications, voûtes |
| **Altram** (Alkaran) | Pierre noire d'Alkaran, fortins compacts | ISTJ | Forteresses du Nord |
| **Cendara** (volcanique) | Basalte volcanique, briques réfractaires | ISTP | Fours, forges, briques de feu |
| **Lumasar** (académique) | Académies en pierre blanche | ESTJ | Académies, bibliothèques |
| **Cestra** (Vermilis) | Pierre rouge de Vermilis, urbanisme rouge | ESTJ | Murs urbains rouges |

### Signatures PNJ (Phase 4 stub)

- **Maître Roderick le Rouge** (ESTJ Maître, Cestra) — bâtisseur des Murailles Rouges
- **Brakh la Pierre** (ISTJ Maître-Légende, Mosrack) — école Lex Petra, voûte du Tribunal
- **Tarek le Basalte** (ISTP Maître, Cendara) — briques réfractaires de la Forge Sacrée
- **Solenne l'Académicienne** (ESTJ Maître, Lumasar) — académie blanche

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Artisanat et Production/Maçon|Maçon (gameplay)]] · [[Architecte]] · [[Tailleur de pierre]] · [[Charpentier]] · [[Couvreur]] · [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]] · [[Forgeron]] · [[Architecture/Index]] · [[Mapping Métiers de Construction]]*
