---
tags: [pnj, comportement, métier, exploration, mineur, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]]"
mbti_typique: [ISTJ, ISTP, ESTJ]
karma_typique: vert
factions_compatibles: [Lex Petra, Ignis Aeternum, Galenor impérial, Mosrack libre, Cendara volcanique]
catégorie_métier: Exploration
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, mode-Crise-effondrement-gaz, extraction-Eclats-palier-Maître]
---

# ⛏️ Template PNJ — Mineur

> Comportement situationnel d'un PNJ Mineur. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Pivot industriel** de la chaîne d'artisanat. Cycle profond (cavernes). Mode Crise = effondrement, gaz, créature cavernicole. **Extraction Éclats au palier Maître**. Métier joueur : [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]].

---

## 1. Vue d'ensemble

Le Mineur est le **pivot industriel** de l'économie : sans lui, pas de lingots, gemmes, briques, sable de verre. **Métier physique brut**, sédentaire (galerie connue) mais **dans une zone de monde** (la mine = zone à part entière, avec ses dangers). Profil : **endurant, méthodique, taciturne, fier de la profondeur**. Mode dominant Routine, **bascule Mode Crise sur effondrement / gaz / créature cavernicole**.

**Spécificité majeure** : un Mineur Maître peut **extraire des Éclats** ([[Économie]] §Monnaie) — il a accès littéral à la création monétaire. Place le métier dans une économie politique tendue.

- **Identité comportementale** : routinier souterrain, économe en mots, méfiant des étrangers en galerie
- **Position sociale** : artisan respecté (le village dépend de lui pour outils, construction)
- **Slot Mode Marchand** : ouvre à la vente après quart (vente directe au [[Forgeron]], [[Maçon]], [[Verrier]], [[Bijoutier]])
- **Lien chaîne** : amont [[Forgeron]] (outils), [[Apothicaire]] (lampes huile, antidotes gaz), [[Bûcheron]] (étais) · aval **tous métiers transformation** (Forgeron, Maçon, Verrier, Bijoutier, Lapidaire)

---

## 2. Cycle quotidien

```
04:00  Lever pré-aube, petit-déjeuner copieux (Vigueur, journée 10-12h)
04:30  Marche vers entrée mine
05:00  Descente galerie, allumage lampe, vérification structure
05:30  Travail au front de taille (boucle T3 spécialisée minage)
12:00  Pause déjeuner sur place (sandwich + eau, 20 min)
12:20  Reprise minage
17:00  Remontée à la surface, tri minerai/pierre/gemme
18:00  Mode Marchand (vente au village, livraison ateliers)
19:30  Repas + bain (mineurs très sales) ; taverne ESTJ ; foyer ISTJ/ISTP
21:30  Coucher tôt (lever 04:00)
```

### Boucle minage canonique (T3+T5 spécialisés)

```
[T1 Récupérer outils + lampe + brouette]
   ↓
[T2 Aller au front de taille]
   ↓
[T3 Frapper la roche / extraire filon] (anim 8s répétée, étincelles)
   ↓
[T4 Charger brouette / wagonnet]
   ↓
[T5 Trier minerai/pierre/gemme] (Acuité check)
   ↓
[T6 Étayer galerie si besoin] (sécurité)
   ↓
[T7 Pause / boire / continuer]
```

> Voir `mine_galerie`, `front_taille`, `tri_atelier`, `treuil`, `carrière_open`, `forge_soutien` pour ancres.

---

## 3. MBTI typique

| Type | Profil mineur | Note |
|------|---------------|------|
| **ISTJ** | Mineur de village, méthodique, méthode traditionnelle | Le défaut canonique |
| **ISTP** | Mineur solitaire, virtuose technique, mécanique | Frontalier (Cendara, Alkaran) |
| **ESTJ** | Maître mineur, dirige équipe, contrats avec [[Forgeron]] et [[Architecte]] | Galenor, Mosrack |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **S+T** (commun aux 3) : focus pratique, peu de spéculation cosmique
- **J** (ISTJ/ESTJ) : adhérence stricte aux quarts, registre des extractions
- **P** (ISTP) : flexibilité tactique, lit la roche
- **I vs E** : ISTJ/ISTP laconiques ; ESTJ commande équipe (5-15 mineurs)

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **MineDescent** | `wake_time` + jour ouvré | T1 puis descente |
| **VeinDiscovered** | Acuité détecte filon riche | Mood +20, marquage carte mentale |
| **EclatVeinDiscovered** | Filon Éclats détecté (palier Maître seulement) | Mood +50, **alerte secrète** (rivalités politiques) |
| **CollapseDetected** | Sons sourds, vibrations anormales | Court-circuit P0 → `Combat.Flee` (sortie urgente) |
| **GasDetected** | Lampe vacille, animal canari mort | P0 → `Combat.Flee` immédiat (ne combat pas) |
| **CavernCreature** | Bestiaire souterrain détecté | P0 → `Combat.Flee` ou `Combat.Defense` (pioche-arme) |
| **CustomerApproach** | Client (Forgeron, joueur) en heures Mode Marchand | Bascule Marchand |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m | Saisit pioche (déjà en main) ; alerte voisins |
| **EraSouffleBroadcast** | Nouveau Souffle | Roche/filons modifiés (Tempora) ; rendement variable |
| **ToolBroken** | Pioche/marteau cassé | Pause → [[Forgeron]] |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Quart de mine | Boucle T1-T7 minage |
| **Marchand** | Heures vente (18h-19h30) | Présente extraction du jour, prix selon Reconnaissance |
| **Dialogue** | Entre mineurs ou avec acheteur | Bref, technique (qualité minerai, profondeur veine) |
| **Crise** | **Effondrement / gaz / créature cavernicole** | `Combat.Flee` priorité (galerie obscure, pas de combat productif) |
| **Festivité** | Festival local (rare car horaire incompatible) | Atténué — quart matin maintenu, soir partagé |
| **Religieux** | [[Lore/Religions/Lex Petra]] (serment matinal sur roche) ou [[Lore/Religions/Ignis Aeternum]] (forge interne) | Rituel court avant descente |
| **Deuil** | Camarade mort (effondrement fréquent) | -20 mood 7j, équipe entière en silence |
| **Quête** | Filon spécial commandé (mithril, adamantium, Éclats) | Continue routine + dialogue spécifique |

Cascade priorité : **Crise (effondrement/gaz)** > Religieux > Marchand > Routine.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive (Mode Marchand)

- **Comportement** : ISTJ "Minerai ? Tier 2 disponible. Prix fixe." — ISTP montre sans parler — ESTJ "Bonsoir. Stock du jour : tant de fer, tant d'argent."
- **Prix** : `rigidité_prix +30` (T) — pas de marge ; ESTJ avec [[Forgeron]] partenariat → prix négocié
- **Reconnaissance +75** : propose pièces rares cachées (gemmes brutes, voire Éclats si Maître)

### 6.2 Mode Crise effondrement / gaz

- **Trigger** : `CollapseDetected` ou `GasDetected`
- **Branche BT** : `Combat.Flee` priorité absolue (P0)
- **Comportement** :
  - Crie alarme à équipe ("Sortez ! Effondrement !")
  - **MBTI J (ISTJ/ESTJ)** : aide voisins à fuir (sens du devoir) ; **P (ISTP)** : sauve outils + soi
  - **ESTJ Maître** : reste plus longtemps pour évacuer équipe (sacrifice loyal)
- **Mood** : `Peur +60`, `Fatigue +30` ; `Colere +20` post-incident (rage envers défaut sécurité)
- **Mémoire** : weight 100 ; améliore vigilance future

### 6.3 Mode Crise créature cavernicole

- **Trigger** : `CavernCreature` (chauve-souris géantes, vers de pierre, créatures abyssales tier élevé)
- **Branche BT** : `Combat.Flee` (priorité) ou `Combat.Defense` si acculé
- **Comportement** : pioche en arme contondante (T1), retraite groupée
- **Lien [[Bestiary/Index]]** : créatures cavernicoles connues (modulation MBTI **S** → réaction directe, **N** → analyse rapide)

### 6.4 Souffle / changement d'Ère

- **Tempora** : roche partiellement modifiée — filons brisés, rendement chaotique ; ISTJ frustration
- **Eldoria** : minerais d'or et de cuivre plus riches ; mood +10
- **Climata** : galeries givrées, lenteur ; ISTP adapte technique
- **Effets paramétriques** : `prices_modifier`, `rendement_modifier` (cf [[Concepts Fondamentaux IA PNJ]] §14)

### 6.5 Découverte filon Éclats (palier Maître, événement majeur)

- **Trigger** : `EclatVeinDiscovered`
- **Comportement** : **alerte secrète** au Maître mineur principal et au seigneur local
- **Tension politique** : qui contrôle la mine contrôle l'inflation locale ([[Économie]] §Monnaie) → side-quest générée
- **Mémoire** : weight 100 ; signal possible à [[03 - Mécaniques/Métiers/Exploration/Chasseur de primes|Chasseur de primes]] si tentative de vol

### 6.6 Pénurie / sécheresse minerai

- **Trigger** : `PenuryMineral`
- **Effets** : prix +25%, dialogue plaintif ; pression du [[Forgeron]] et [[Maçon]] qui dépendent de lui
- **Side-quest** "Trouver un nouveau filon" générée

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (mineur de village, équipe pérenne) ou Nommé authored (1-2 par cité minière — Maître)
- **Mort transient/famille** : effondrements **fréquents** (cause #1 mortalité Mineur) → 7 jours → apprenti reprend
- **Mort nommé authored** : permanente, side-quest "La galerie de Maître [Nom]" (joueur peut hériter de la concession)
- **Apprenti** : 1-3 selon palier (équipe naturelle)
- **Héritage** : un Maître peut signer la **découverte d'un filon Éclats légendaire** inscrit aux chroniques (et déclencher conflit politique)

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Mosrack** (cité-forge) | Mineur d'acier, école pratique | ISTJ | Fer, acier, école Mosrack |
| **Galenor** (impérial) | Mineur seigneurial, mine banale | ESTJ | Cuivre, fer, mine de masse |
| **Cendara** (volcanique) | Mineur de basalte, Ignis Aeternum | ISTP | Obsidienne, soufre, gemmes feu |
| **Alkaran** (Nord) | Mineur de glace, granit | ISTJ | Granite, mithril (rare) |
| **Endora** (sables) | Carrière à ciel ouvert, gemmes désertiques | ESTJ | Pierre, sable verrier, gemmes désertiques |

### Signatures PNJ (Phase 4 stub)

- **Brakh Marteau-Profond** (ISTJ Maître, Mosrack) — découvreur du filon adamantium #3
- **Ulrica la Granite** (ISTJ Maître, Alkaran) — auteure du Code de la Mine du Nord
- **Tarek Soufre-Noir** (ISTP Maître, Cendara) — extraction obsidienne sacrée
- **Maître Roderick** (ESTJ Maître-Légende, Galenor) — premier mineur Maître à extraire un Éclat majeur

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur (gameplay)]] · [[Forgeron]] · [[Maçon]] · [[Verrier]] · [[Lapidaire]] · [[Bijoutier]] · [[Économie]]*
