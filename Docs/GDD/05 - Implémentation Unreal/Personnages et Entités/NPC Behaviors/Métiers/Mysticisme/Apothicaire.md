---
tags: [pnj, comportement, métier, apothicaire, mysticisme, remèdes, ia, template]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: "[[03 - Mécaniques/Métiers/Mysticisme/Apothicaire]]"
mbti_typique: [ISTJ, ISFJ, ISTP]
karma_typique: vert
voie_magique_principale: -
religion_compatible: [Vael'Kurash, Foedus Animae, Ignis Aeternum]
factions_compatibles: [Guildes d'apothicaires, Vael'Kurash, Foedus Animae]
template_alternatif_souffle: false
ritual_pattern_religion: [RP_VAEL_KURASH (rare), RP_FOEDUS_ANIMAE, RP_IGNIS_AETERNUM]
needs_review_for: [calibration-playtest, frontière-alchimiste-précise, gamme-T4-T5]
---

# 💊 Template PNJ — Apothicaire

> Comportement situationnel d'un PNJ Apothicaire. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Plafonne T3-T4** (frontière avec Alchimiste M4 expérimental qui seul accède T5-T6). Métier joueur correspondant : [[03 - Mécaniques/Métiers/Mysticisme/Apothicaire|Apothicaire]].
>
> **Particularité Mysticisme** : métier **principalement terrestre** (pas de Voie active obligatoire) — généralement non-Lié, métier de quartier respectable. **Officine respectable** vs **laboratoire mystérieux** (Alchimiste). Mode Marchand fréquent. Karma vert standard.

---

## 1. Vue d'ensemble

L'Apothicaire est le **préparateur de remèdes traditionnels** d'Hybelior — médecine artisanale **codifiée, transmise, et respectée**. Là où l'[[Alchimiste]] (M4 Érudition) explore l'inconnu, l'Apothicaire **conserve un savoir éprouvé** : remèdes de grand-mère, baumes contre plaies, antidotes courants, sirops apaisants, onguents.

- **Identité comportementale** : méthodique-fiable (S+J dominants), MBTI majoritaires Sensing+Judging, mémoire encyclopédique des recettes ancestrales, ton conseiller
- **Position sociale** : très respecté ; officine = lieu social du village/quartier, ouvert à tous, transparent
- **Slot Mode Marchand** : **dominant** — Mode Marchand fréquent, présence quasi-continue au comptoir
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste]] (intrants principaux : plantes médicinales) / [[Chasseur]] (sang créatures communes) / [[Pêcheur]] (rare) · aval clientèle directe + [[03 - Mécaniques/Métiers/Mysticisme/Guérisseur|Guérisseur]] (potions) + [[Médecin]] M4 (collaboration anatomique) + [[Alchimiste]] (recettes T1-T3 partagées)

---

## 2. Cycle quotidien

```
06:00  Lever, ouverture officine
06:30  Petit-déjeuner solitaire ou en famille
07:00  **Officine ouverte** — préparation premières doses, étiquetage
07:00-12:00  Service clientèle matinal (forte affluence)
12:00  Repas (ferme officine 30-60 min — pause modulée P)
13:00  Reprise — préparation lots, mortier et pilon, alambic léger
13:00-18:00  Service après-midi + consultations (rôle quasi-Médecin populaire)
18:00  Inventaire, réception livraisons Herboriste
19:00  Repas
20:00  Étude carnet remèdes, lecture Codex Apothicaire
21:30  Coucher
```

### Boucle de préparation canonique (T1-T6 spécialisés)

```
[T1 Réception intrants — plante, eau pure, cire, cendre, sang créature]
   ↓
[T2 Mortier et pilon — broyage Acuité × Mémoire (qualité)]
   ↓
[T3 Décoction / infusion — eau pure + intrants]
   ↓
[T4 Alambic léger (T2-T3 recettes) — distillation simple]
   ↓
[T5 Conditionnement — bocaux scellés, étiquetage Verbe (lisibilité)]
   ↓
[T6 Stockage / vente comptoir]
```

> Voir `officine`, `comptoir_apothicaire`, `cabinet_consultation`, `mortier_alambic` pour ancres spatiales.

---

## 3. MBTI typique

| Type | Profil Apothicaire | Note |
|------|---------------------|------|
| **ISTJ** | Apothicaire rigoriste, recettes codifiées strictes, prix fixes, inventaire rigoureux | Profil dominant — gardien tradition |
| **ISFJ** | Apothicaire communautaire, soin familial, mémoire des cas, conseil empathique | Profil défenseur populaire |
| **ISTP** | Apothicaire-bricoleur, expérimentation modérée (proche frontière Alchimiste), virtuose technique | Profil rare-innovateur |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **S** (commun aux 3) : focus pratique, mémoire concrète des recettes, identification précise intrants
- **T (ISTJ/ISTP)** : prix rigides, négociation difficile, analyse rationnelle des cas
- **F (ISFJ)** : empathie envers patients, soin gratuit aux pauvres, ton chaleureux
- **J (ISTJ/ISFJ)** : adhère strict aux horaires, recettes codifiées, calendrier de préparation
- **P (ISTP)** : flexibilité, expérimentation occasionnelle (frontière Alchimiste mineure)
- **I** (commun) : présence calme au comptoir, dialogues mesurés

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **PatientArrival** | Client < 5m + officine ouverte | `Routine.Pause` court → bascule Mode Marchand/Conseil |
| **PlagueOutbreak** | `Memory.Public.Plague` village | Production massive antidotes, collab [[Médecin]]/[[Guérisseur]] |
| **PoisonedClient** | Client tag `Status.Poisoned` | Antidote priorité absolue (consultation gratuite F si désespoir) |
| **HerbalistDelivery** | Livraison [[Herboriste]] arrive | `Social.Trade` brève + tri intrants |
| **RecipeDiscovered** | Découverte recette T3-T4 nouvelle | Mood +20, mémoire individuelle weight 70 |
| **AlchemistExperimentNearby** | [[Alchimiste]] propose recette T4+ | Refuse (plafond métier), redirige vers Alchimiste |
| **EraSouffleBroadcast** | Nouveau Souffle | Modulation prix : Dégénérescence +10%, Floraison -5% |
| **InspectionGuilde** | Inspecteur Guilde apothicaire | Bascule Mode Marchand formel, présentation registres |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Préparation lots / inventaire | Cycle préparation |
| **Marchand** | Officine ouverte, client | **Mode dominant** — vente, conseil, prescription ; ISTJ = factuel, ISFJ = chaleureux |
| **Dialogue** | Client demande conseil santé | Long, encyclopédique ; ISFJ = ton maternel/paternel, ISTJ = factuel professionnel |
| **Crise** | ThreatLevel ≥ 50 OU plague | Reste à l'officine si possible (fournit antidotes) ; sinon fuite pacifique |
| **Festivité** | Festival local | Étal extérieur, vente accrue (élixirs festifs : alcool de plantes, parfums) |
| **Religieux** | RitualPattern Vael/Foedus/Ignis (si fidèle) | Office bref, ferme officine 30 min |
| **Deuil** | Mort proche détectée | Cycle ralenti 14j, refus de paroles légères |
| **Quête** | Donneur (chercher plante rare manquante, livrer remède au village voisin) | Continue routine + dialogue spécifique |

Cascade : **Crise (plague intensifié, raid pacifique fuite) > Religieux > Deuil > Marchand > Routine**.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur achète remède (Mode Marchand)

- **Trigger** : `PatientArrival` + officine ouverte
- **Branche BT** : `ModeSocial.ApothicaryTrade`
- **Comportement** :
  - ISTJ : "Que cherchez-vous ? Hémostine 3 Éclats, baume cendré 5."
  - ISFJ : "Qu'est-ce qui vous amène ? Asseyez-vous, je vais regarder cette plaie."
  - ISTP : "Je peux vous arranger ça — tenez, essayez ce mélange."
- **Prix** : modulé Reconnaissance × T (rigidité +30) ; ISFJ = -10% pauvre

### 6.2 Joueur sollicite conseil santé (rôle quasi-Médecin populaire)

- **Trigger** : Joueur décrit symptôme
- **Branche BT** : `ModeSocial.ApothicaryConsultation`
- **Comportement** :
  - ISTJ : diagnostic factuel basé sur Mémoire encyclopédique, prescription standard
  - ISFJ : pose questions sur famille, historique, ton maternel/paternel
  - ISTP : remède pratique improvisé selon stock disponible
- **Limite** : refuse cas T4+ (envoie chez [[Médecin]] M4 ou [[03 - Mécaniques/Métiers/Mysticisme/Guérisseur|Guérisseur]] selon nature)

### 6.3 Production massive en épidémie

- **Trigger** : `PlagueOutbreak`
- **Branche BT** : Mode Crise sanitaire
- **Comportement** :
  - Ouverture étendue (06:00-22:00)
  - Production massive antidotes (collab [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste]] intrants)
  - Distribution gratuite ou à prix coûtant (F = ISFJ ; T = prix réduit ×0.5)
  - Collab [[Médecin]] M4 (diagnostic) et [[03 - Mécaniques/Métiers/Mysticisme/Guérisseur|Guérisseur]] (soin direct)
- **Mood** : `Fatigue +0.05/s` permanent, `Colere +10` si manque de stock

### 6.4 Frontière avec Alchimiste

- **Trigger** : Client demande recette T4+ ou expérimentale
- **Branche BT** : `ModeSocial.RedirectToAlchimist`
- **Comportement** :
  - ISTJ : "Cela dépasse ma gamme. Voyez l'Alchimiste de Galenor."
  - ISFJ : "Je préfère ne pas tenter — un Alchimiste fera mieux."
  - ISTP : peut tenter mais avec avertissement (rare T4 réussi)
- **Frontière nette** : T1-T3 partagés ; T4-T6 = Alchimiste exclusif

### 6.5 Vol détecté à l'officine

- **Trigger** : Joueur tente vol bocaux
- **Branche BT** : court-circuit P1 → cri d'alerte (pas de combat — métier non-combatif)
- **Comportement** : crie ("Au voleur !"), alerte gardes, bascule fermeture officine
- **Réputation** : -40 individuelle + -20 faction locale

### 6.6 Souffle / changement d'Ère

- **Effets paramétriques** :
  - **Floraison / Verdoiement** : intrants +30% qualité (Herboriste fournit mieux), prix -5%
  - **Dégénérescence** : intrants -20% qualité, prix +10%, recettes "Era_Degenerescence" disponibles
  - **Effroi** : -30% fréquentation officine (clients restent chez eux)
  - **Ferveur** : ouverture étendue, +30% transactions
- **Templates alternatifs** : non — non-PNJ-clé, modulation paramétrique uniquement

### 6.7 Inspection de Guilde

- **Trigger** : Inspecteur Guilde apothicaire (PNJ nommé) arrive
- **Branche BT** : `ModeSocial.GuildInspection`
- **Comportement** : présentation registres, démonstration Mortier-pilon, ISTJ excelle (rigueur stricte) ; ISTP risque erreurs

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (persistant, ~1-3 par village, 5-10 par capitale) ou Nommé authored (rare, 1-2 par capitale, "Maître X")
- **Mort transient/famille** : 7 jours → successeur (apprenti hérite officine et Codex Apothicaire familial)
- **Mort nommé authored** : permanente, side quest "L'officine fermée" générée — héritage du Codex
- **Apprenti** (graphe §5) : 0-2 apprentis selon `mastery_level` ; sous-PNJ avec cycle simplifié (préparation T1)
- **Héritage** : Maître Apothicaire peut signer un **Codex de Remèdes Héritage**

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par tradition

| Tradition | Religion | MBTI dominant | Spécialité |
|-----------|----------|---------------|------------|
| **Apothicaire-Lié Spiritus (rare)** | Vael'Kurash | ISFJ | Récolte/préparation rituelle, +20% qualité |
| **Apothicaire de tradition Foedus Animae** | Foedus Animae | ISFJ | Remèdes funéraires, baumes de conservation, élixirs de paix pour mourants |
| **Apothicaire de tradition Ignitari** | Ignis Aeternum | ISTJ | Pommades de brûlure, baumes de forge, antidotes au monoxyde |
| **Apothicaire profane (le plus fréquent)** | aucune | ISTJ, ISFJ | Métier de quartier ou village, prix fixes, savoirs régionaux |
| **Apothicaire-Herboriste hybride** | variable | ISFJ | Cumule récolte + préparation T1 (rare en capitale, fréquent rural) |

### Variantes régionales

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Galenor** (impérial) | Officines codifiées, Guilde stricte | ISTJ | Recettes standardisées, Guilde apothicaire centrale |
| **Alkaran** (Nord) | Apothicaire-Vael'Kari hybride | ISFJ | Plantes nordiques rares, préparations rituelles |
| **Cendara** (volcanique) | Tradition Ignitari | ISTJ | Pommades de brûlure, Forge-collab |
| **Skaldoria** (tribale) | Apothicaire-Animari hybride | ISFJ | Remèdes funéraires, lien Foedus Animae |
| **Lumasar** (académique) | Apothicaire frontière Alchimiste | ISTP | Expérimentation T3 limite |

### RitualPattern compatibles (rare car non-Lié majoritaire)

- **Vael'Kurash** (Apothicaire-Lié Spiritus rare) : offrande matinale + bois sacré
- **Foedus Animae** (tradition funéraire) : offrande autel 19:00 + remèdes pour mourants
- **Ignis Aeternum** (Ignitari) : prière à l'aube + spécialité brûlures

### Signatures PNJ (Phase 4 stub)

- **Maître Velia** (ISTJ Maître, Galenor central) — citation canonique du fichier source, Guilde centrale
- **Mère Sereny aux Mains-douces** (ISFJ Maître, Alkaran) — Apothicaire-Vael'Kari hybride
- **Maître Forn la Cendre** (ISTJ Maître, Cendara) — tradition Ignitari, brûlures spécialiste
- **Sœur Donna des Adieux** (ISFJ Adepte, Skaldoria) — tradition Foedus Animae, élixirs de paix
- **Maître Erlin l'Inventif** (ISTP Adepte, Lumasar) — frontière Alchimiste, expérimentation modérée

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Mysticisme/Apothicaire|Apothicaire (archétype joueur)]] · [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste]] · [[Alchimiste]] · [[Médecin]] · [[03 - Mécaniques/Métiers/Mysticisme/Guérisseur|Guérisseur]] · [[Potion]]*
