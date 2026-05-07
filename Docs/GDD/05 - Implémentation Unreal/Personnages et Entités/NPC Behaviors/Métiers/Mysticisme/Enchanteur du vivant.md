---
tags: [pnj, comportement, métier, enchanteur, vivant, mysticisme, ia, template]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: "[[03 - Mécaniques/Métiers/Mysticisme/Enchanteur du vivant]]"
mbti_typique: [INFJ, INTJ, INFP]
karma_typique: vert
voie_magique_principale: Spiritus | Aurion | Eldoria (secondaire)
religion_compatible: [Vael Kurash, Foedus Animae, Somnium Vigil]
factions_compatibles: [Vael Kurash, Foedus Animae, Cercles de Spiritus, Dresseurs de la Symbiose]
template_alternatif_souffle: false
ritual_pattern_religion: [RP_VAEL_KURASH, RP_FOEDUS_ANIMAE, RP_SOMNIUM_VIGIL]
needs_review_for: [calibration-playtest, frontière-enchanteur-objet]
---

# 🌿 Template PNJ — Enchanteur du vivant

> Comportement situationnel d'un PNJ Enchanteur du vivant. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Spécialise les routines autour des pactes avec créatures, plantes, et joueurs vivants**. Métier joueur correspondant : [[03 - Mécaniques/Métiers/Mysticisme/Enchanteur du vivant|Enchanteur du vivant]].
>
> **Particularité Mysticisme** : frontière nette avec l'[[Enchanteur d'objet]] (M2 Artisanat, mort/inanimé). L'Enchanteur du vivant **rencontre** son matériau (créatures, plantes, joueurs vivants), ce qui rend son cycle plus **exploratoire** et moins sédentaire qu'un artisan d'atelier. Branche [[Bestiaire]] forte.

---

## 1. Vue d'ensemble

L'Enchanteur du vivant pose des **enchantements sur des êtres vivants** : créatures (familiers, montures, bétail), plantes (arbres anciens, plantations rituelles), et **joueurs** (buffs prolongés, marques de pacte, liens de symbiose). Métier-pivot entre la magie pure et le soin/symbiose.

- **Identité comportementale** : intuitif-empathique (N+F dominants), MBTI majoritaires Intuitifs, attention aux auras, lien profond avec compagnons animaux
- **Position sociale** : respecté en société tribale et nature-centrée ; rare et précieux en capitale
- **Slot Mode Marchand** : services à la demande (pacte, buff prolongé) plutôt que stock fixe
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste]] (sève d'arbre ancien, plantes rituelles) / [[Bûcheron]] (collab consacrée) / [[Chasseur]] (composantes consenties) · aval [[Dresseur de créature]] (collab pacte), [[03 - Mécaniques/Métiers/Mysticisme/Prêtre|Prêtre Foedus Animae]] (sceau de lignée)

---

## 2. Cycle quotidien

```
06:00  Lever, salutation rituelle aux compagnons (familier, plante-veilleuse)
06:30  Entretien du Lien (Spiritus/Aurion) — méditation au pavillon de symbiose
07:30  Petit-déjeuner partagé avec compagnon animal
08:00  Cabinet / pavillon — réception clients (pactes, buff joueurs)
12:00  Repas
13:00  **Sortie en nature** (1-3h, exploration rencontres créatures, herborisation rituelle)
16:00  Retour, préparation rituels (composantes : sève, plumes, larmes)
18:00  Rituels de pacte si demandés (durée 15-60 min selon tier)
19:00  Repas, méditation
20:30  Salutation finale aux compagnons
21:30  Coucher
```

### Boucle de pacte canonique

```
[T1 Client présente cible (créature/plante/lui-même)]
   ↓
[T2 Lecture aura — Conscience perception]
   ↓
[T3 Choix Voie + composantes (Cristal Spiritus, sève, plume...)]
   ↓
[T4 Rituel d'inscription (15-60 min)] → VFX Spiritus (sève lumineuse) ou Aurion (énergie pure)
   ↓
[T5 Sceau apposé sur cible — durée selon tier (1h - permanent lignée)]
```

> Voir `pavillon_symbiose`, `bosquet_sacre`, `cercle_enchantement_vivant`, `etable_consacree` pour ancres spatiales.

---

## 3. MBTI typique

| Type | Profil Enchanteur du vivant | Note |
|------|------------------------------|------|
| **INFJ** | Enchanteur contemplatif, lecture aura subtile, idéal Spiritus | Profil dominant — empathie nature |
| **INTJ** | Enchanteur stratège-académique, Voie d'Aurion, recherche pure | Profil rare-érudit |
| **INFP** | Enchanteur poète-jardinier, Spiritus avec arbres anciens | Profil rural-rêveur |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **N** (commun aux 3) : interprétation symbolique des auras, lecture de Lien profonde
- **F (INFJ/INFP)** : empathie envers cibles vivantes, refuse pacte forcé/non-consenti
- **T (INTJ)** : analyse stratégique de la compatibilité aura/cible
- **J (INFJ/INTJ)** : rituels stricts, calendrier précis
- **P (INFP)** : exploration spontanée, herborisation aléatoire
- **I** (commun) : présence calme, voix douce avec animaux, dialogues longs avec plantes

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **PactRequest** | Joueur sollicite buff prolongé / pacte créature | Bascule rituel d'inscription (cf §6.1) |
| **CompagnionInDanger** | Familier/plante-veilleuse menacé | Court-circuit P1 → `Combat.Defense` (lien profond) |
| **CreatureWildEncounter** | Sortie nature + créature compatible Voie | `Social.Approach` +30 (tente lien aura) |
| **AbortedPactByCible** | Cible refuse aura (incompatibilité ou résistance) | Mood -15, refus du paiement client |
| **ForcedBindAttempt** | Joueur demande pacte non-consenti | Refus catégorique, mood -30, alerte tribale |
| **SacredTreeFelled** | Arbre ancien abattu sans rituel | Court-circuit P1 → `Combat.Aggressive` (Vael'Kari) |
| **SymbioseCorrupted** | Compagnon corrompu (Voie hostile) | Mode Crise — tente exorcisme (cf §6.4) |
| **EraSouffleBroadcast** | Nouveau Souffle | Modulation Voie : Spiritus +30% pendant Verdoiement, Aurion stable |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Cabinet / sortie nature / méditation | Cycle pacte + exploration |
| **Marchand** | Joueur sollicite pacte/buff | Service rituel rémunéré ; refuse paiement si non-consenti par cible |
| **Dialogue** | Initiation joueur ou collègue | Long, références écosystème/aura ; INFJ = lecture spirituelle |
| **Crise** | ThreatLevel ≥ 50 OU compagnon menacé | Défense compagnon priorité, pas combat direct (canalise Spiritus) |
| **Festivité** | Festival local (Vael'Kurash solstices) | Rituel collectif avec compagnons, présence centrale |
| **Religieux** | RitualPattern Vael'Kurash / Foedus Animae | Bois sacré / autel familial selon religion |
| **Deuil** | Mort proche OU compagnon | Deuil amplifié (graphe §5 inclut compagnon — F ×1.5) |
| **Quête** | Donneur (récupérer plume légendaire, sauver bête malade) | Continue routine + dialogue spécifique |

Cascade : **Crise (compagnon priorité) > Religieux > Deuil > Marchand > Routine**.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur sollicite pacte / buff prolongé

- **Trigger** : `PactRequest` + cible vivante consentante
- **Branche BT** : `ModeSocial.PactRitual`
- **Comportement** :
  - INFJ : "Asseyez-vous. Je dois lire ce qui vit en vous avant de poser un sceau."
  - INTJ : "La compatibilité de votre aura avec Spiritus est de 60%. Acceptable. Procédons."
  - INFP : "Votre âme cherche le vert... oui, Spiritus accepte."
- **Prix** : 20-500 Éclats selon tier (1h-permanent), F = ajustable selon désespoir
- **Refus** : si cible non-consenti (surtout pour pacte forcé sur créature) → refus catégorique, mood -30

### 6.2 Sortie en nature (Bestiaire)

- **Trigger** : créneau quotidien 13:00 OU `CreatureWildEncounter`
- **Branche BT** : `Routine.NatureExploration`
- **Comportement** :
  - Marche en forêt/plaine, repère créatures compatibles avec Voie
  - Approche douce (pas d'agression) — `Social.Approach` +30
  - Tente lien aura (rituel court 5-10 min) → si succès, créature peut devenir compagnon
- **Branche [[Bestiaire]]** : interaction avec créatures sauvages selon types (loup-Spiritus compatible, mort-vivant incompatible, etc.)

### 6.3 Compagnon en danger

- **Trigger** : `CompagnionInDanger`
- **Branche BT** : court-circuit P1 → `Combat.Defense` (lien profond compagnon)
- **Comportement** :
  - Lance bouclier de Spiritus sur compagnon
  - Si Voie d'Aurion : projection arcanique entre menace et compagnon
  - **Reste exposé** — ne fuit pas tant que compagnon en danger (F+J devoir)
- **Mood** : `Colere +50`, `Peur +20` (Peur saturée seulement si compagnon mort)
- **Mémoire individuelle** : `CompagnionWasAttacked` weight 80

### 6.4 Symbiose corrompue (compagnon sous influence Voie hostile)

- **Trigger** : `SymbioseCorrupted` (familier sous Noctis, possession)
- **Branche BT** : Mode Crise — tentative d'exorcisme
- **Comportement** : rituel de purification (Spiritus expulse Noctis), durée 5-30 min
- **Échec** : compagnon perdu — deuil profond F ×1.5

### 6.5 Souffle / changement d'Ère

- **Trigger** : `EraSouffleBroadcast`
- **Effets paramétriques** :
  - **Spiritus alignement (Verdoiement, Floraison)** : +30% efficacité pacte ; rituels publics renforcés
  - **Eldoria (Feu Endormi)** : Voie d'Eldoria secondaire bonus +20%, Voie d'Aurion stable
  - **Noctis (Ombre Longue)** : risque corruption compagnons +10%, mood -10
  - **Tempora (Échos Brisés)** : pactes 10% chance d'échec ; refus de sceller pendant l'ère si nommé prudent
- **Templates alternatifs** : non (non-PNJ clé), modulation paramétrique uniquement

### 6.6 Mort d'un compagnon

- **Trigger** : familier/plante-veilleuse meurt (graphe §5 étendu)
- **Branche BT** : Mode Deuil profond 14j (équivalent membre `family`)
- **Comportement** : retrait social, refus de nouveau pacte 30j minimum
- **Mood** : `mood_baseline -30` permanent 14j ; F ×1.5 amplification
- **Mémoire individuelle** : weight 100 jamais décroît

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (rare, 0-2 par village rural ; 1-3 par capitale tribale Alkaran/Skaldoria) ou Nommé authored (1-2 par grand pays)
- **Mort transient/famille** : 7 jours → successeur (apprenti hérite parfois du compagnon)
- **Mort nommé authored** : permanente, side quest "Le compagnon orphelin" générée — joueur peut adopter familier
- **Apprenti** (graphe §5) : 0-2 apprentis ; sous-PNJ avec un compagnon junior
- **Héritage** : Enchanteur-Maître peut signer une **Lignée Héritage** (sceau familial transmissible)

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par Voie

| Voie | Religion | MBTI dominant | Spécialité |
|------|----------|---------------|------------|
| **Voie de Spiritus** | Vael'Kurash | INFJ, INFP | Symbiose nature, animal-pacte, plante-veilleuse |
| **Voie d'Aurion** | Somnium Vigil | INTJ, INTP | Buff arcanique sur joueur, académique |
| **Voie d'Eldoria** *(secondaire)* | Ignis Aeternum | INFJ | Bénédiction lumineuse + régen ; chevauche Guérisseur |
| **Voie de Fatum** *(secondaire)* | Foedus Animae | INFJ | Marquage destin sur lignée, sceau funéraire ; karma jaune |
| **Voie de Somnix** *(secondaire)* | Somnium Vigil | INFJ, INFP | Enchantement onirique cible endormie ; karma jaune |

> **Voies interdites au vivant** : Noctis, Umbra, Tempora — relèvent du [[03 - Mécaniques/Métiers/Mysticisme/Nécromancien|Nécromancien]] (drain hostile, malédiction).

### RitualPattern compatibles

- **Vael'Kurash** : offrande matinale à l'esprit local + visite bois sacré (cohérent avec Spiritus)
- **Foedus Animae** : offrande autel 19:00 + **pacte avec compagnon vivant obligatoire** (parfait alignement)
- **Somnium Vigil** : siestes longues + méditation onirique (cohérent Aurion/Somnix)

### Signatures PNJ (Phase 4 stub)

- **Maître Olbar Sève-Ancienne** (INFJ Maître, Alkaran) — Voie de Spiritus, Vael'Kari ; citation canonique du fichier source
- **Dame Iolen** (INTJ Maître, Lumasar) — Voie d'Aurion, académique Somnium Vigil
- **Père Wennar des Lignées** (INFJ Maître, Torkam) — Voie de Fatum, Animari Foedus Animae, sceau lignée
- **Frère Holm aux Loups** (INFP Adepte, Skaldoria) — Voie de Spiritus tribale, meute de loups compagnons

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Mysticisme/Enchanteur du vivant|Enchanteur du vivant (archétype joueur)]] · [[Enchanteur d'objet]] · [[Le Lien]] · [[Cosmologie]] · [[Bestiaire]] · [[Dresseur de créature]]*
