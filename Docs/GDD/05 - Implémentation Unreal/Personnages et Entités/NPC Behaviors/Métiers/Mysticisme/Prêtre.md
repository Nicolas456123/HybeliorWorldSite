---
tags: [pnj, comportement, métier, prêtre, mysticisme, religion, ia, template]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: "[[03 - Mécaniques/Métiers/Mysticisme/Prêtre]]"
mbti_typique: [INFJ, ENFJ, ISFJ]
karma_typique: vert
voie_magique_principale: Voie de l'entité principale de la religion (si Lié, rare)
religion_compatible: [Vael'Kurash, Ignis Aeternum, Ordo Caelum, Noctari, Rota Mundi, Via Ventus, Lex Petra, Somnium Vigil, Foedus Animae]
factions_compatibles: [9 grandes religions canoniques]
template_alternatif_souffle: true
ritual_pattern_religion: [RP_VAEL_KURASH, RP_IGNIS_AETERNUM, RP_ORDO_CAELUM, RP_NOCTARI, RP_ROTA_MUNDI, RP_VIA_VENTUS, RP_LEX_PETRA, RP_SOMNIUM_VIGIL, RP_FOEDUS_ANIMAE]
needs_review_for: [calibration-playtest, signatures-prêtres-par-religion-phase4]
---

# 🛐 Template PNJ — Prêtre

> Comportement situationnel d'un PNJ Prêtre. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Spécialise la routine quotidienne autour du RitualPattern de la religion** (§13 D-PNJ-RELIGION). Métier joueur correspondant : [[03 - Mécaniques/Métiers/Mysticisme/Prêtre|Prêtre]].
>
> **Particularité Mysticisme** : ce template est le **plus religion-intensive** d'Hybelior. Le Prêtre se décline en **9 spécialisations** (1 par grande religion canonique), chacune avec un RitualPattern propre qui réécrit massivement le cycle quotidien. Les **Prêtres senior d'une grande religion** sont des **PNJ-clés** (template alternatif au Souffle §14).

---

## 1. Vue d'ensemble

Le Prêtre est l'**officiant religieux** d'Hybelior — intermédiaire culturellement reconnu entre les mortels et les entités cosmiques. Là où le [[03 - Mécaniques/Métiers/Mysticisme/Mage|Mage]] sert un Lien personnel, le Prêtre **sert une institution** : porte les rites, conserve les textes sacrés, conseille les fidèles, célèbre naissances/mariages/funérailles.

- **Identité comportementale** : sociable-empathique (E+F dominants), MBTI Feeling (F) très majoritaire, dévotion ritualisée, attitude grave
- **Position sociale** : très respecté ; voix de la communauté ; préside cérémonies
- **Slot Mode Religieux** : **dominant** — souvent 30-50% de la journée selon religion (sabbats Lex Petra, veillées Noctari)
- **Lien chaîne** : amont [[Apothicaire]] (encens), [[Herboriste]] (plantes rituelles), [[Tisserand]] (vêtements liturgiques) · aval fidèles, [[03 - Mécaniques/Métiers/Mysticisme/Guérisseur|Guérisseur]] (collab bénédiction), [[03 - Mécaniques/Métiers/Mysticisme/Oracle|Oracle]] (Foedus Animae, Rota Mundi)

---

## 2. Cycle quotidien — gabarit générique

```
05:00-06:30  Réveil + rituel d'aube selon religion (cf §8 RitualPattern)
06:30-09:00  Office matinal au temple, accueil fidèles
09:00-12:00  Conseil aux fidèles, confessions, lectures sacrées
12:00-13:00  Repas communautaire ou solitaire (selon religion)
13:00-17:00  Rituels selon liturgie (cérémonies vie/mort, bénédictions)
17:00-19:00  Étude des textes, préparation prêche
19:00-21:00  Office du soir (variable selon religion)
21:00-22:00  Méditation finale + coucher (variable Noctari = inversion)
```

> Le RitualPattern de chaque religion **substitue** des créneaux entiers de ce gabarit. Voir §8 pour le mapping exhaustif des 9 RitualPatterns.

---

## 3. MBTI typique

| Type | Profil Prêtre | Note |
|------|---------------|------|
| **INFJ** | Prêtre contemplatif, idéal pour Foedus Animae, Somnium Vigil, Vael'Kurash | Profil dominant pour religions mystiques |
| **ENFJ** | Prêtre charismatique-mentor, donneur de quêtes émotionnelles, idéal Rota Mundi, Via Ventus | Profil donneur narratif fort |
| **ISFJ** | Prêtre communautaire-soignant, idéal Foedus Animae, Vael'Kurash, Ignis Aeternum villageois | Profil hôtelier-pasteur |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **F** (commun aux 3) : empathie envers fidèles, ton émotionnel, deuil amplifié ×1.5
- **J (INFJ/ISFJ)** : adhérence stricte au RitualPattern (×1.3), sabbats inviolables
- **P (rare)** : flexibilité avec rituels, interprétation libre des textes
- **E (ENFJ)** : prêche public, anime festivités religieuses, voix forte
- **I (INFJ/ISFJ)** : confessions privées privilégiées, retrait méditatif
- **S (ISFJ)** : adhérence rituelle stricte (×1.3), interprétation littérale des textes
- **N (INFJ/ENFJ)** : ajout de pratiques mystiques personnelles, interprétation symbolique

---

## 4. Triggers situationnels

> Format canonique [[Actions Situationnelles]] §4.

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **DailyRitualHour** | Heure du rituel quotidien atteinte (selon RitualPattern) | Bascule Mode Religieux (priorité Utility +30 vs métier ordinaire) |
| **WeeklySabbathDay** | Jour sabbat religieux (Lex Petra, Rota Mundi) | Suspend tous services laïques, présence obligatoire au temple |
| **FuneralRequested** | Décès dans le village + famille demande | Déclenche rituel funéraire (selon religion) ; voir §6.5 |
| **SacredPlaceProfaned** | `World.Sacred.Profaned` < 15m | Court-circuit P1 → `Combat.Defense` (cf §13 tabou) |
| **TabooBreached** | Item/comportement taboué selon RitualPattern | Refus de service, mood -30, possible exorcisme |
| **WeatherTabooConflict** | Pluie + Ignitari (tabou §13) | Outdoor tasks -70%, irritation |
| **EraSouffleBroadcast** | Nouveau Souffle | **Si Prêtre senior** : template alternatif au Souffle (§14, voir §6.6) ; sinon paramétrique |
| **CosmicPhenomenonAlignedReligion** | Phénomène aligné avec entité vénérée | Grande célébration ou panique selon archétype |
| **FaithIntensityCrisis** | Si `faith_intensity < 30` après crise | Doute interne, ralentissement rituels |

---

## 5. Modes superposables

> [[Actions Situationnelles]] §3 catalogue 8 modes. Pour le Prêtre :

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Hors créneau rituel | Étude / accueil fidèles / méditation |
| **Marchand** | Ponctuel (vente reliques, encens, médailles) | Refuse marchandage (F empathique : "donnez ce que votre cœur permet") |
| **Dialogue** | Joueur sollicite confession ou guidance | Long, empathique (F), références sacrées (N) |
| **Crise** | ThreatLevel ≥ 50 OU lieu sacré profané | **Défense lieu sacré** prioritaire (cf §6.4) ; sinon prière collective de protection |
| **Festivité** | Festival religieux du calendrier | **Officie** rituel collectif ; ENFJ = anime ; INFJ = solennel |
| **Religieux** | RitualPattern actif (créneaux fréquents) | **Mode dominant** — voir §8 par religion |
| **Deuil** | Mort proche ou décès dans communauté | Officie funérailles selon religion ; F amplifié ×1.5 |
| **Quête** | Donneur quête (mission sacrée, reliquaire perdu) | Continue rituel + dialogue spécifique au joueur cible |

Cascade priorité Prêtre : **Religieux (sabbat strict) > Crise (sauf défense lieu sacré) > Deuil > Marchand > Routine**.

> **Cas critique** : Prêtre Lex Petra en Mode Religieux (sabbat) qui détecte attaque sur lieu sacré → bascule Crise mais **branche défense**, pas fuite ([[Actions Situationnelles]] §3.3).

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur sollicite bénédiction / confession

- **Trigger** : Joueur < 5m + temple ouvert
- **Branche BT** : `ModeSocial.PriestlyConsultation`
- **Comportement** : F = empathique ("Asseyez-vous, mon enfant"), récite formule liturgique de la religion
- **Prix** : pas de prix fixe (don libre) ; F refuse marchandage rigide

### 6.2 Office quotidien (Mode Religieux dominant)

- **Trigger** : `DailyRitualHour`
- **Branche BT** : `ModeReligious.DailyOffice`
- **Comportement** : présence au temple, prière publique, allume encens, récite textes sacrés
- **Modulation MBTI** : ENFJ = sermon public expansif, INFJ = méditation guidée silencieuse, ISFJ = accueil des fidèles individuels

### 6.3 Sabbat hebdomadaire

- **Trigger** : `WeeklySabbathDay`
- **Branche BT** : `ModeReligious.WeeklyAssembly`
- **Comportement** : office prolongé (3-5h), assemblée des fidèles, jugement (Lex Petra : Tribunal sacré)
- **Mémoire village** : `Memory.Public.WeeklyService` weight 30

### 6.4 Lieu sacré profané

- **Trigger** : `SacredPlaceProfaned` < 15m
- **Branche BT** : court-circuit P1 → `Combat.Defense` (lieu sacré)
- **Comportement** :
  - F (INFJ/ENFJ/ISFJ) : Colère sacrée +60, dénonciation publique, appel aux gardes
  - **Pas de fuite** même si menacé physiquement (devoir rituel)
- **Mood** : `Colere +60`, `Peur -10` (foi protectrice)
- **Réputation** : -100 individuel + -50 faction religion concernée si joueur profanateur

### 6.5 Funérailles d'un fidèle

- **Trigger** : `FuneralRequested`
- **Branche BT** : `ModeReligious.FuneralRite` (variantes par religion)
- **Comportement par religion** :
  - **Foedus Animae** : veillée funéraire familiale, pacte transmis, dialogue nostalgie
  - **Ignis Aeternum** : crémation obligatoire (tabou §13 contre inhumation)
  - **Vael'Kurash** : enterrement au pied d'un arbre ancien
  - **Rota Mundi** : célébration cyclique (mort = retour)
  - **Noctari** : veillée d'ombre nocturne
  - **Ordo Caelum** : sépulture orientée vers l'étoile du défunt
  - **Lex Petra** : sépulcre lapidaire codifié
  - **Somnium Vigil** : adieu onirique (proches dorment près du corps)
  - **Via Ventus** : crémation puis dispersion des cendres au vent
- **Mood** : F amplifié ×1.5, baseline -20 pendant 14j (cf [[Actions Situationnelles]] §5.7)

### 6.6 Souffle / changement d'Ère — Template alternatif (PNJ-clé)

> **Critère PNJ-clé** : Prêtre senior (Adepte+) d'une grande religion, nommé authored. ~50-100 par monde (cf §17 D-PNJ-AUTHORING).

- **Trigger** : `EraSouffleBroadcast` + match dans `era_alternative_templates`
- **Branche BT** : substitution du `routine_replacement` + `authored_dialogues` activés
- **Cas concrets** :
  - **Prêtre Noctari à l'Ère de l'Ombre Longue** : `Routine_Priest_Nocturnal` (rituels nocturnes, processions, sermons longs sur l'éveil de l'Ombre)
  - **Prêtre Ignis Aeternum à l'Ère du Voile** : `Routine_Priest_Defensive_Flame` (veillées de flammes intensifiées, sermons défensifs)
  - **Prêtre Foedus Animae à l'Ère des Destins Croisés** : `Routine_Priest_Pacts` (sceaux funéraires multipliés, communion ancestrale)
  - **Prêtre Lex Petra à l'Ère de Tempora** : `Routine_Priest_Stillness` (refus de mouvement extrême, sermons contre le chaos)
- **Pour Prêtre standard (95%)** : modulation paramétrique uniquement (mood baseline + dialogues d'Ère)

### 6.7 Combat dans la rue / raid

- **Trigger** : `RaidOnVillage`
- **Branche BT** : selon religion :
  - Foedus Animae : aide blessés, scelle morts (`Help.Ally` +50)
  - Ignis Aeternum : bénit défenseurs (buff buff allié)
  - Lex Petra : appelle Tribunal (alerte gardes)
  - Vael'Kurash : invoque esprit local protecteur
- **MBTI F** (commun) : panique modérée mais devoir rituel maintient action ; saturation Peur rare

---

## 7. Lifecycle PNJ

> [[Concepts Fondamentaux IA PNJ]] §9 + §18.

- **Catégorie** : Famille de génération (persistant, ~100-300 par grand pays) ou **Nommé authored** (5-15 par capitale religieuse — Prêtres senior, Hierarques)
- **Mort transient/famille** : 7 jours gameplay → successeur narratif (Acolyte devient Prêtre ; rituel d'investiture)
- **Mort nommé authored** : permanente, side quest "Le successeur" générée, cérémonie d'intronisation visible aux joueurs
- **Apprenti** (graphe §5) : 1-3 Acolytes selon `mastery_level`
- **Héritage** : un Hierarque nommé peut signer une **Doctrine Héritage** (texte sacré inscrit aux chroniques)

---

## 8. RitualPattern par religion (9 sous-sections — §13 D-PNJ-RELIGION)

> Chaque religion possède un RitualPattern Data Asset (`DA_RP_<religion>_v1`) qui réécrit la routine quotidienne. Le `URoutineGenerator` injecte les créneaux au spawn.

### 8.1 Vael'Kurash (Vael'Kari)

- **Pratique quotidienne** : Offrande matinale à l'esprit local (5 min, 06:30) + tatouage rituel régulier
- **Pratique hebdo** : Visite au bois sacré 1×/sem (3-5h dans la forêt)
- **Tabous** : Refuse d'abattre arbre ancien sans rituel ; refuse d'urbaniser zone sacrée
- **Rituel collectif** : Solstice/équinoxe 4×/an (rassemblement tribal)
- **MBTI dominant** : INFJ, ISFJ, INFP
- **Voie potentielle si Lié** : Spiritus
- **Routine matin** : 06:30 offrande → 07:00 office → 09:00 promenade rituelle au bois

### 8.2 Ignis Aeternum (Ignitari)

- **Pratique quotidienne** : Prière à l'aube face au feu (06:00) + entretien flamme domestique permanent
- **Pratique hebdo** : Veillée pleine lune (forge ouverte la nuit, collab forgerons)
- **Tabous** : **Abstinence par temps de pluie** (sortie réduite 70%) ; refus inhumation (crémation obligatoire)
- **Rituel collectif** : Forge rituelle collective 1×/an
- **MBTI dominant** : ESTP, ENTJ (rare pour le Prêtre, plus ENFJ-ESFJ courant)
- **Voie potentielle si Lié** : Eldoria
- **Routine matin** : 06:00 prière feu → 07:00 office → 09:00 entretien flammes communautaires

### 8.3 Ordo Caelum (Stellari)

- **Pratique quotidienne** : Prière midi (Celestia, 5 min) + **prière nuit (étoiles, 10 min, 22:00-23:00)**
- **Pratique hebdo** : Lecture astrale hebdo + jeûne lors des éclipses
- **Tabous** : Refuse décision majeure sans consulter horoscope ; refuse d'agir contre alignement astral
- **Rituel collectif** : Procession aux observatoires (mensuelle)
- **MBTI dominant** : INTJ, INTP (plus rare pour Prêtre — la religion penche Astronome)
- **Voie potentielle si Lié** : Celestia
- **Routine** : 12:00 prière midi → office après-midi → 22:00 prière nuit (avant coucher tardif)

### 8.4 Noctari (Veilari)

- **Pratique quotidienne** : **ACTIVITÉ DOMINANTE NOCTURNE** — sommeil journée, travail/social/rituels la nuit
- **Pratique hebdo** : Méditation obscurité totale 1×/sem (3-5h en cellule sombre)
- **Tabous** : Refuse d'allumer feux vifs ; conversation à voix basse en public ; refus exposition lumière vive
- **Rituel collectif** : Veillée d'ombre (mensuelle, du crépuscule à l'aube)
- **MBTI dominant** : INTJ, INTP, ISTJ
- **Voie potentielle si Lié** : Noctis ou Umbra
- **Routine inversée** : 18:00 réveil → 19:00 office crépusculaire → 22:00-04:00 activité principale → 06:00 coucher → sommeil journée

### 8.5 Rota Mundi (Roteri)

- **Pratique quotidienne** : Marquage rituel matinal de la date du Calendrier
- **Pratique hebdo** : **Repos sabbatique 1×/sem** (jour fixe — `sabbath_day`, refus total de travail)
- **Tabous** : Refus de stagnation prolongée (>3j sans bouger d'activité — ironique compte tenu du sabbat)
- **Rituel collectif** : Fête saisonnière collective (4×/an, équinoxes/solstices)
- **MBTI dominant** : ISTJ, ESTJ, ENFJ
- **Voie potentielle si Lié** : Tempora ou Fatum
- **Routine** : 05:00 marquage Calendrier → office matinal → activité métier sauf sabbat

### 8.6 Via Ventus (Ventari)

- **Pratique quotidienne** : Offrande au vent matinale (depuis hauteur ou fenêtre, 5 min)
- **Pratique hebdo/annuelle** : **Voyage occasionnel obligatoire (1×/an min)** — pèlerinage ou caravane
- **Tabous** : Refus d'enracinement permanent (clergé toujours en mouvement) ; refus de promesse de sédentarité
- **Rituel collectif** : Chant marin pré-traversée (collectif occasionnel)
- **MBTI dominant** : ENFP, ESTP, ENFJ
- **Voie potentielle si Lié** : Aerion (Navigor disparu)
- **Routine** : 06:00 offrande au vent → office mobile → mouvement quotidien (refus de domicile fixe)

### 8.7 Lex Petra (Petrani)

- **Pratique quotidienne** : Serment matinal sur pierre (2 min, 06:00)
- **Pratique hebdo** : **Tribunal sacré hebdomadaire** (présence obligatoire, sabbat fixé)
- **Tabous** : **Refuse de manipuler items temporels** (sabliers, mécanismes Tempora) ; refus mouvement non-nécessaire (PNJ très **sédentaire**)
- **Rituel collectif** : Procession lapidaire (mensuelle)
- **MBTI dominant** : ESTJ, ISTJ, INTJ
- **Voie potentielle si Lié** : Terranu
- **Routine** : 06:00 serment pierre → office → activité sédentaire stricte → Tribunal sabbat

### 8.8 Somnium Vigil (Vigili)

- **Pratique quotidienne** : **Siestes longues** (2-3h après-midi, 13:00-15:30) + méditation onirique au coucher
- **Pratique hebdo** : Rituel onirique collectif 1×/sem (Herbes de Somnix, partage de rêves)
- **Tabous** : Refus de se réveiller brutalement (interdit aux fidèles de réveiller un Vigili) ; activité onirique privilégiée
- **Rituel collectif** : Rêve partagé mensuel
- **MBTI dominant** : INFJ, INFP, INTP
- **Voie potentielle si Lié** : Somnix ou Aurion
- **Routine** : 06:30 office matinal → 13:00 sieste rituelle → 16:00 réveil + lecture rêves → office du soir

### 8.9 Foedus Animae (Animari)

- **Pratique quotidienne** : Offrande quotidienne à l'autel familial (5 min, **19:00 — heure des morts**)
- **Pratique hebdo/mensuelle** : **Repas partagé avec les morts 1×/mois** (place à table laissée vide pour ancêtre)
- **Tabous** : **Pacte avec compagnon vivant (animal/PNJ allié)** obligatoire ; refus absolu de profanation tombe
- **Rituel collectif** : Veillée funéraire familiale (occasionnelle, par décès)
- **MBTI dominant** : ISFJ, INFJ, INFP
- **Voie potentielle si Lié** : Fatum (rare)
- **Routine** : 06:30 office matinal → conseils aux endeuillés → 19:00 offrande autel → 20:00 dialogue avec ancêtres

> **Religions mineures** (Taciti, Cantus Mundi) : voir [[03 - Mécaniques/Métiers/Mysticisme/Prêtre|fiche métier]] §3 ; templates spécifiques Phase 4.

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Mysticisme/Prêtre|Prêtre (archétype joueur)]] · [[Lore/Religions/00 - Système Religieux|Système Religieux]] · [[Prédiction]] · [[Cosmologie]] · [[Le Souffle]] · [[Les Ères]]*
