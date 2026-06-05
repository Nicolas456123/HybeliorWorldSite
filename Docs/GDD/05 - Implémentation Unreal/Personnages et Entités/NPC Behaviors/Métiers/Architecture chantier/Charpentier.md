---
tags: [pnj, comportement, métier, architecture, chantier, charpentier, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Artisanat et Production/Charpentier|Charpentier]]"
mbti_typique: [ISTJ, ISTP, ESTP]
karma_typique: vert
factions_compatibles: [Trinoria sylvestre, Onara maritime, Astravia haute, Galenor cathédrale, Mosrack libre]
catégorie_métier: Architecture chantier
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, mode-Crise-navire-en-perdition-variant-naval, charpenterie-civile-vs-navale]
---

# 🪵 Template PNJ — Charpentier

> Comportement situationnel d'un PNJ Charpentier. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Grandes œuvres bois** (charpentes, ponts, mâts). Mode Crise = navire en perdition (variant naval). Métier joueur : [[03 - Mécaniques/Métiers/Artisanat et Production/Charpentier|Charpentier]]. Distinct [[Menuisier]] (mobilier).

---

## 1. Vue d'ensemble

Le Charpentier taille, lève, assemble les **grandes pièces de bois structurel** : poutres maîtresses, fermes de toit, ponts, mâts, échafaudages. Fournit l'ossature bois que le [[Maçon]] habille, que le [[Couvreur]] couvre. Profil : **physique lourd, méthodique, fier de la grosse pièce, parfois aventurier (charpenterie navale)**. Métier **collectif** (levée d'une ferme = 4-8 charpentiers en simultané, chant de levée).

- **Identité comportementale** : ouvrier robuste, fier de la grosse pièce, communautaire (cadence, chant)
- **Position sociale** : artisan respecté, présence au village important (tout toit, tout pont passe par lui)
- **Slot Mode Marchand** : non-vendeur direct — paiement chantier au forfait par [[Architecte]] / propriétaire / capitaine
- **Lien chaîne** : amont [[Bûcheron]] (grumes, bois lourd), [[Menuisier]] (planches), [[Forgeron]] (ferrures, sabots), [[Tanneur]] (sangles cuir échafaudages) · aval [[Maçon]], [[Couvreur]], [[03 - Mécaniques/Métiers/Exploration/Navigateur|Navigateur]] (mâts/coques)
- **Sous-spécialité prestigieuse** : **charpenterie navale** (coques, mâts) — branche maritime distincte

---

## 2. Cycle quotidien

```
05:30  Lever, petit-déjeuner copieux
06:00  Marche vers atelier ou chantier
06:30  Briefing équipe (cadence, chant de levée)
07:00  T3 spé : taille tenons-mortaises sur poutres au sol
12:00  Pause déjeuner (45 min, repas chaud)
12:45  T5 spé : levée de pièce / assemblage en hauteur (cadence collective)
17:00  Nettoyage outils, dépôt copeaux
17:30  Retour village
18:00  Repas
20:00  Loisir bref (taverne ESTP — chants de charpentier ; foyer ISTJ/ISTP)
22:00  Coucher
```

### Boucle taille canonique (T3+T5 spécialisés)

```
[T1 Sélection grume / poutre]
   ↓
[T2 Tracé tenon-mortaise au cordeau] (Acuité)
   ↓
[T3 Taille à l'herminette ou à la hache de charpentier] (anim 8s répétée)
   ↓
[T4 Vérification équerre]
   ↓
[T5 Levée et assemblage (cadence collective)] (anim 4-8 charpentiers)
   ↓
[T6 Vérification finale + chevillage]
```

> Voir `atelier_charpentier`, `scierie`, `tréteaux_levée`, `chantier_civil`, `chantier_naval` pour ancres.

---

## 3. MBTI typique

| Type | Profil charpentier | Note |
|------|--------------------|------|
| **ISTJ** | Charpentier de village, méthode traditionnelle, cathédrale impériale | Le défaut canonique (Galenor) |
| **ISTP** | Charpentier solitaire, virtuose technique, charpentes complexes | Trinoria, Astravia |
| **ESTP** | Charpentier naval / itinérant, navires, ponts, pression haute | Onara, Skaldoria |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **S+T** (commun) : focus pratique, peu de spéculation
- **J (ISTJ)** : adhérence horaires, méthode rigoureuse, cathédrale planifiée
- **P (ISTP/ESTP)** : adapte selon bois, tempête (naval)
- **E (ESTP)** : voix forte, anime cadence, raconte campagnes navales
- **I (ISTJ/ISTP)** : exécute en silence

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **ChantierStart** | `wake_time` + jour ouvré | Briefing équipe, T1 |
| **WoodDelivery** | [[Bûcheron]] livre grumes | Réception, paiement, signature |
| **LiftDay** | Levée de ferme programmée | Cadence collective (4-8 charpentiers, chant) |
| **CollapseDetected** | **Effondrement** (charpente cède) | P0 → `Combat.Flee` ; **Architecte évacue** |
| **NavireEnPerdition** | **Variant naval** : navire en perdition (tempête, brèche coque) | P0 → `Combat.NavalRepair` (urgence) ou `Combat.Flee` |
| **MâtCassé** | Mât principal cassé en mer | Réparation urgence — Charpentier naval embarqué |
| **InaugurationDay** | Bâtiment / navire terminé | Mode **Festivité** (fierté, lancement bateau) |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m | Saisit hache/herminette (déjà en main) |
| **EraSouffleBroadcast** | Nouveau Souffle | Bois rituel particulier (Eldoria), bois maudit (Tempora) |
| **PenuryWood** | Pénurie bois | Travail au ralenti, prix +25% |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Atelier ou chantier | Boucle taille, levée |
| **Itinérant** *(variant naval)* | Embarquement charpentier naval | Voyage en mer avec navire, réparation à bord |
| **Marchand** | Réception paiement forfait | Discute prix avec Architecte/capitaine |
| **Dialogue** | Inspection ou collègue | Bref technique ; ESTP raconte, ISTJ/ISTP factuel |
| **Crise** | **Effondrement charpente OU navire en perdition** | `Combat.Flee` ou `Combat.NavalRepair` urgent |
| **Festivité** | **Inauguration bâtiment / lancement navire** | Fierté, chant collectif, présent obligatoire |
| **Religieux** | Variable — [[Vael'Kurash]] (esprit du bois — Trinoria), [[Lore/Religions/Via Ventus]] (chant marin pré-traversée — naval) | Rituel court selon spé |
| **Deuil** | Camarade tué (chute hauteur, naufrage) | -25 mood 7j, équipe silencieuse |
| **Quête** | Construction exceptionnelle (cathédrale, navire amiral) | Continue routine + dialogue |

Cascade priorité : Crise > Religieux > Festivité (inauguration) > Itinérant (naval) > Routine.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche

- **Comportement** :
  - **ISTJ** : "Charpente en cours. Pas de visiteurs sans casque." — bref
  - **ISTP** : silence, hoche
  - **ESTP** : "Eh, vous voulez voir la levée ? Cadence dans 20 min !"
- **Reconnaissance +75** : invite à la cadence (joueur tire sur cordage, ESTP raconte)

### 6.2 Mode Crise effondrement charpente

- **Trigger** : `CollapseDetected`
- **Branche BT** : `Combat.Flee` priorité absolue
- **Comportement** : crie alarme, équipe entière évacue ; **[[Architecte]] présent** donne ordre formel
- **Mood** : `Peur +60`, `Colere +30` post-incident
- **Mémoire** : weight 100 (rage envers défaut conception)

### 6.3 Mode Crise variant naval — Navire en perdition

- **Trigger** : `NavireEnPerdition` ou `MâtCassé`
- **Branche BT** : `Combat.NavalRepair` (urgence) — réparation à bord en pleine tempête
- **Comportement** :
  - **ESTP** : performance — fonce sur la brèche, colmate, virtuose
  - **ISTP** : technique pure, taille pièce de remplacement à la hache
  - **ISTJ** : méthode (rare en mer — surtout chantier civil)
- **Mood** : `Colere +40` (focus), `Peur +20` ; reste plutôt calme MBTI **S**
- **Lien [[Lore/Religions/Via Ventus]]** : prière au vent durant tempête

### 6.4 Mode Festivité — Lancement navire ou inauguration cathédrale

- **Trigger** : `InaugurationDay`
- **Comportement** :
  - Présence obligatoire équipe (apprentis, compagnons, maître)
  - **Chant de levée final** (collectif, fierté professionnelle)
  - ESTP raconte campagne, ISTJ discours bref, ISTP silencieux fier
- **Mood** : +30 général
- **Effet** : +20 Reconnaissance locale (acclamation)

### 6.5 Souffle / changement d'Ère

- **Eldoria** : bois plus chaud à travailler (séchage rapide), mood +5
- **Tempora** : bois temporellement décalé — fibres instables, frustration
- **Climata** : bois gelé, lent à travailler ; saison creuse l'hiver
- **MBTI S** : peu de spéculation, "On adapte. C'est du bois."

### 6.6 Pénurie bois

- **Trigger** : `PenuryWood`
- **Effets** : prix +25%, dépendance [[Bûcheron]] ; certains chantiers reportés

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (équipes stables) ou Nommé authored (1-2 par cité construite, 1 par grand port)
- **Mort transient/famille** : chutes hauteur fréquentes ; naufrages (naval) → 7 jours → compagnon reprend
- **Mort nommé authored** : permanente, side-quest "La charpente inachevée" ou "Le navire perdu"
- **Apprenti** : 1-3 (équipe naturelle — porteur, tailleur, maître)
- **Héritage** : un Maître peut signer une **charpente Héritage** (cathédrale, navire amiral) inscrite aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Trinoria** (sylvestre) | Bois clair, hauts-perchoirs forestiers | ISTP | Charpentes en hauteur |
| **Onara** (maritime) | Charpenterie navale, ports nordiques | ESTP | Coques, mâts |
| **Astravia** (haute) | Charpentes alignées sur constellations | ISTJ | Charpentes astrales |
| **Galenor** (impérial) | Cathédrales impériales, charpentes monumentales | ISTJ | Cathédrales |
| **Skaldoria** (toundra) | Charpentes brise-glace, navires arctiques | ESTP | Brise-glace |

### Signatures PNJ (Phase 4 stub)

- **Maître Erevan** (ISTJ Maître-Légende, Galenor) — charpente de la Cathédrale Impériale
- **Brask Mât-Brisé** (ESTP Maître, Onara) — charpentier naval, sauvé 12 navires
- **Sylvain le Sylvestre** (ISTP Maître, Trinoria) — auteur des charpentes du Sanctuaire Vael'Kurash
- **Capitaine Ulfric** (ESTP Maître, Skaldoria) — navire brise-glace l'Inflexible

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Artisanat et Production/Charpentier|Charpentier (gameplay)]] · [[Architecte]] · [[Maçon]] · [[Couvreur]] · [[Bûcheron]] · [[Menuisier]] · [[03 - Mécaniques/Métiers/Exploration/Navigateur|Navigateur]] · [[Architecture/Index]] · [[Mapping Métiers de Construction]]*
