---
tags: [pnj, comportement, métier, architecture, chantier, verrier, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Artisanat et Production/Verrier|Verrier]]"
mbti_typique: [ISTP, INTP, ISFJ]
karma_typique: vert
factions_compatibles: [Ignis Aeternum, Ordo Caelum (lentilles), Lex Petra cathédrale, Galenor académique, Lumasar académique]
catégorie_métier: Architecture chantier
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, mode-Crise-explosion-brûlure, lentilles-instruments-précision, vitraux-co-craft-Sertisseur]
---

# 🔮 Template PNJ — Verrier

> Comportement situationnel d'un PNJ Verrier. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Station très haute température**. Mode Crise = explosion / brûlure. Métier joueur : [[03 - Mécaniques/Métiers/Artisanat et Production/Verrier|Verrier]]. Précision technique. Co-craft vitraux avec [[Sertisseur]].

---

## 1. Vue d'ensemble

Le Verrier transforme **sable + chaleur extrême** en verre : plaques planes, pièces soufflées, vitraux colorés, lentilles optiques. Métier ancien, exigeant, lié à la pyrotechnie. Profil : **précis, endurant à la chaleur, méditatif (souffle régulier), fier de la transparence**. Mode dominant Routine atelier ; **Mode Crise = explosion / brûlure** (four 1300°C, danger constant).

- **Identité comportementale** : artisan précis, méditatif (souffle régulier), résistant chaleur
- **Position sociale** : artisan respecté (rare, technique), proche des [[Lore/Religions/Ignis Aeternum]] (maîtrise du feu)
- **Slot Mode Marchand** : ouvre comptoir aux clients (apothicaire, astronome, architecte) — fioles, lentilles, plaques
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]] (sable, soude, potasse), [[Bûcheron]] (charbon de bois), [[Maçon]] (briques réfractaires four), [[Apothicaire]] (oxydes colorants) · aval [[Architecte]] (vitrages), [[Apothicaire]] (fioles, alambic), [[Astronome]] (lentilles), [[Alchimiste]] (verrerie scientifique), [[Sertisseur]] (vitraux co-craft)

---

## 2. Cycle quotidien

```
04:30  Lever, allumage four (montée chaleur 2-3h pour 1300°C)
07:00  Petit-déjeuner pendant montée four
07:30  Vérification température, sélection bain de verre
08:00  T3 spé : prélèvement bain à la canne, soufflage
12:00  Pause déjeuner courte (15-20 min — four ne s'arrête pas)
12:20  Reprise soufflage / coulée
16:00  Recuit (lent — pièces refroidissent au bac)
17:30  Mode Marchand (vente apothicaire, astronome, architecte)
19:00  Fermeture four (entretien, recharge bois pour le lendemain)
20:00  Repas (épuisé par chaleur), bain
22:00  Coucher
```

### Boucle soufflage canonique (T3+T5 spécialisés)

```
[T1 Vérifier température four 1300°C]
   ↓
[T2 Prélèvement bain à la canne] (anim 5s — bain incandescent)
   ↓
[T3 Premier soufflage léger + façonnage marbre] (anim 8s)
   ↓
[T4 Réchauffe bouchon dans four] (anim 3s)
   ↓
[T5 Soufflage final + façonnage à la pince] (anim 10-15s — précision)
   ↓
[T6 Détache au pontil, dépose au bac de recuit] (lent, ~3s)
```

> Voir `four_verre`, `marbre_verrier`, `établi_verrier`, `bac_recuit` pour ancres.

---

## 3. MBTI typique

| Type | Profil verrier | Note |
|------|----------------|------|
| **ISTP** | Verrier solitaire, virtuose technique, soufflage précis | Le défaut canonique |
| **INTP** | Verrier-théoricien, expérimente recettes (oxydes colorants, lentilles) | Académique (Lumasar) |
| **ISFJ** | Verrier soigné, souci du détail, fioles médicinales pour [[Apothicaire]] | Service communautaire |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **I** (commun) : silencieux, méditatif (rythme du souffle)
- **T (ISTP/INTP)** : factuel, recettes précises
- **F (ISFJ)** : soin du détail, lien avec patient/client (verrerie médicale)
- **P (ISTP/INTP)** : adapte selon bain, température
- **J (ISFJ)** : méthode rigoureuse, pas de raté
- **S (ISTP/ISFJ)** : sens tactile, chaleur, son du verre
- **N (INTP)** : spéculation cosmique, lentilles cosmiques

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **FourAllumage** | `wake_time` | Allumage four (2-3h montée) |
| **TempératureCheck** | Température critique 1300°C | Vérification, ajustement charbon |
| **BainPrélèvement** | Pièce à souffler | T2 prélèvement à la canne |
| **VerreExplosion** | **Mode Crise** : pièce explose (refroidissement trop rapide, défaut bain) | Court-circuit P0 → `Combat.Flee` (éclats) ; brûlures possibles |
| **Brûlure** | Contact bain incandescent | P0 → `Combat.Flee` puis [[Apothicaire]] |
| **CommandeApothicaire** | [[Apothicaire]] commande lot fioles | Production en série, qualité standard |
| **CommandeAstronome** | [[Astronome]] commande lentilles précises | Mode Quête (commande exclusive, précision millimétrique) |
| **VitraiCommand** | [[Sertisseur]] commande verre coloré pour vitrail | Co-craft : Verrier coule, Sertisseur appose plomb |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m | Vigilant, **garde main libre** (pas de couteau — canne en arme dérisoire) |
| **EraSouffleBroadcast** | Nouveau Souffle | Bain modifié (Tempora rare) |
| **PenuryFuel** | Pénurie charbon | Four ralenti, prix +30% |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Atelier four ouvert | Boucle soufflage / coulée |
| **Marchand** | Heures vente (17h30-19h) | Présente pièces, prix selon Reconnaissance |
| **Dialogue** | Inspection / client érudit | Bref technique ; INTP discute oxydes, ISFJ soin du détail |
| **Crise** | **Explosion verre / brûlure** | `Combat.Flee` ; soin urgent ; arrêt four si nécessaire |
| **Festivité** | Festival local (rare car four exige présence) | Atténué (continue four matinal, rejoint le soir) |
| **Religieux** | [[Lore/Religions/Ignis Aeternum]] (entretien flamme, prière à l'aube — fort chez Verriers) | Rituel intégré allumage four |
| **Deuil** | Mort proche | Maintient four (impossible d'arrêter), qualité maintenue mais visage fermé |
| **Quête** | Commande exclusive (lentille mythique, vitrail cathédrale) | Continue routine + dialogue |

Cascade priorité : Crise (explosion/brûlure) > Religieux > Marchand > Routine.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche

- **Comportement** :
  - **ISTP** : silence, montre pièces, "Soufflage en cours, attendez 3 minutes."
  - **INTP** : "Bonjour. Lentille ? Plaque ? J'ai un mélange à l'oxyde de cuivre intéressant."
  - **ISFJ** : "Bienvenue. Vous voulez quelle taille de fiole ?" — chaleureux mais bref
- **Reconnaissance +75** : montre pièces signature (lentille parfaite, vitrail), explique technique
- **Reconnaissance -50** : refuse vente (sécurité — visiteur peut perturber soufflage)

### 6.2 Mode Crise explosion verre

- **Trigger** : `VerreExplosion`
- **Branche BT** : `Combat.Flee` (éclats de verre projetés)
- **Comportement** :
  - **Tous types** : recul rapide, protection visage
  - **ISFJ** : vérifie immédiatement apprenti / collègue
  - **ISTP/INTP** : analyse cause (refroidissement, bain défectueux)
- **Mood** : `Peur +30`, `Colere +20` post-incident
- **Mémoire** : weight 90 (apprend cause, ajuste recette)

### 6.3 Mode Crise brûlure

- **Trigger** : `Brûlure`
- **Branche BT** : `Combat.Flee` puis `Action.SeekHealing`
- **Comportement** : eau froide immédiate, course vers [[Apothicaire]] / [[Médecin]]
- **Mood** : `Peur +40`, `Colere +50` (rage envers défaut technique)

### 6.4 Souffle / changement d'Ère

- **Ignis Aeternum** dominant : Verriers en fête (forge ouverte la nuit, ferveur)
- **Eldoria (Feu Endormi)** : flammes plus chaudes, soufflage facilité ; mood +10
- **Climata** : froid extérieur fragilise plaques (refroidissement chaotique)
- **Tempora** : bain temporellement instable — rare, frustration
- **MBTI N (INTP)** : spéculation sur la "mémoire du feu"

### 6.5 Co-craft vitraux avec Sertisseur

- **Trigger** : `VitraiCommand`
- **Comportement** : Verrier **coule** plaques colorées (oxydes selon couleur), [[Sertisseur]] **appose** plomb pour assembler
- **Synergie** : Verrier + Sertisseur travaillent en duo, salle dédiée à la cathédrale
- **Mémoire** : partagée, fierté collective

### 6.6 Pénurie carburant

- **Trigger** : `PenuryFuel`
- **Effets** : four ralenti, prix +30%, dépendance [[Bûcheron]] / charbon

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (rare — atelier complexe à transmettre) ou Nommé authored (1 par grande cité)
- **Mort transient/famille** : 14 jours (apprentissage long) → apprenti reprend si formé
- **Mort nommé authored** : permanente, side-quest "Le four éteint" (joueur peut tenter relance)
- **Apprenti** : 1-2 (transmission soufflage — très long apprentissage 5-7 ans)
- **Héritage** : un Maître peut signer un **vitrail Héritage** (cathédrale) ou **lentille Héritage** (observatoire) inscrit aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Cendara** ([[Lore/Religions/Ignis Aeternum]]) | Verrier sacré, four volcanique | ISTP | Verre rituel, fioles purifiées |
| **Lumasar** (académique) | Verrier-théoricien, lentilles précises | INTP | Lentilles télescopes, microscopes |
| **Galenor** (cathédrale) | Verrier de vitraux monumentaux | ISFJ | Vitraux cathédrales |
| **Tyndara** (marchand) | Verrerie commerciale, exportation | ISFJ | Fioles, bouteilles, exportation |
| **Aerion** (vents) | Verrerie légère, transparence aérienne | INTP | Verres ultra-fins, lampes |

### Signatures PNJ (Phase 4 stub)

- **Maître Aldwin le Souffle** (ISTP Maître-Légende, Cendara) — flamme sacrée Ignis Aeternum
- **Solenne la Lentille** (INTP Maître, Lumasar) — première lentille télescope T4
- **Sœur Yulia** (ISFJ Maître, Galenor) — vitraux de la Cathédrale Impériale
- **Branneck l'Aérien** (INTP Maître, Aerion) — verres ultra-fins

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Artisanat et Production/Verrier|Verrier (gameplay)]] · [[Architecte]] · [[Maçon]] · [[Sertisseur]] · [[Apothicaire]] · [[Astronome]] · [[Alchimiste]] · [[Lapidaire]] · [[Architecture/Index]]*
