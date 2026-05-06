---
tags: [pnj, comportement, métier, alchimiste, erudition]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Erudition/Alchimiste]]
mbti_typique: [INTP, INTJ, ISTP]
karma_typique: variable
factions_compatibles: [Guilde des Alchimistes d'Astravia, Foedus Animae, Confréries clandestines de poisonniers, Cabinets de Prédiction]
needs_review_for: [calibration-playtest]
---

# 🧪 Template PNJ — Alchimiste

> Comportement PNJ pour un **Alchimiste** (Mémoire dominante, Érudition). Métier de cabinet/laboratoire isolé, cycle long (recettes 4-12h gameplay condensé), **risque manipulé** (explosifs, poisons, vapeurs). Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]] §5 + [[Concepts Fondamentaux IA PNJ]].
>
> Source métier : [[03 - Mécaniques/Métiers/Erudition/Alchimiste]].

---

## 1. Vue d'ensemble

L'Alchimiste PNJ est un **érudit cabinet-bound** : il travaille au laboratoire (alambic, cornue, athanor), entouré de bocaux, de fumées colorées, de sabliers en marche. Sa journée est dominée par des **sessions longues** (distillation, fixation) qui le rendent **peu disponible** pour interagir — il ne lève les yeux qu'entre deux phases de recette.

**Particularités** :
- **Atelier souvent isolé** (en marge de ville, ou cave d'apothicairerie) — peu de passants
- **Risque manipulé** : explosifs, poisons, fumées toxiques. Mode Crise = sécurisation des stocks AVANT évacuation
- **Cycle long** : une recette Adepte+ peut occuper 4-12h gameplay condensé sans interruption
- **Mémoire dominante** : tous les modulateurs MBTI N (intuition recettes), J (rigueur protocole) sont fortement amplifiés

> [!important] Frontière comportementale
> - **Alchimiste** = cabinet isolé, stat Mémoire, méfiant de la pluie sur ses poudres
> - **[[Apothicaire]]** = comptoir public, stat Mémoire+Verbe, accueille les patients
> - **[[Médecin]]** = au chevet, stat Mémoire+Acuité, peu de craft

---

## 2. Cycle quotidien typique

```
06:00 — Lever, récolte des composants frais (rosée, plantes du matin)
07:00 — Petit déjeuner discret (souvent dans le labo)
07:30–12:00 — Préparation, broyage, distillations rapides
12:00–13:30 — Pause, consultation clientèle au comptoir si Apothicaire associé
13:30–19:00 — Distillations longues, suivi de l'athanor (ne quitte pas le labo)
19:00–20:00 — Repas
20:00–22:30 — Étude (grimoires, almanachs), correspondance avec confrères
23:00 — Coucher (ou veille longue durant ère propice)
```

**Modulation MBTI** :
- **J** (INTJ, ISTJ) : adhère strictement aux horaires, planifie chaque recette
- **P** (INTP, ENTP) : décale d'1-2h selon l'inspiration, recettes spontanées
- **I** (tous) : mange seul, parle peu aux apprentis
- **N** : sessions de spéculation prolongées le soir (lit des traités d'ère)

**Wake/bed paramétrables** : `wake_time = 06:00 ± 2h MBTI`, `bed_time = 23:00 ± 2h`. Pendant **post-Souffle semaine 1** : sessions raccourcies (rouille -15% performance).

---

## 3. MBTI typique et variantes

### 3.1 INTP — Logicien (40% des Alchimistes)
- Curieux théoricien, expérimentations spontanées
- **Routine flexible** (P), recettes inédites, nombreux échecs assumés
- Combat : fuite (Peur saturée fréquente), mais peut **utiliser ses fioles** comme arme défensive
- Ère [[Les Ères|Brume Mortelle]] : exalté, cherche recettes rares

### 3.2 INTJ — Architecte (35%)
- Stratège silencieux, plan long terme (recettes signées, sous-spécialité Maître)
- **Routine ultra-stricte** (J), athanor surveillé heure par heure
- Mode Crise : sauve d'abord ses **carnets de recettes**, puis les composants rares
- Donne quêtes : transactionnelles, deadlines fines ("ramène-moi 3 Larmes avant la pleine lune")

### 3.3 ISTP — Virtuose (25%)
- Bricoleur indépendant, alchimiste de montagne ou clandestin (poisonnier)
- **S+P** : pragmatique, recettes éprouvées, peu d'écrits
- Frontière vers **poisonnière** (Karma jaune/rouge selon faction)

---

## 4. Triggers spécifiques (extension §4 Actions Situationnelles)

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **AlchemyExplosion** | Recette ratée + composant volatil + MBTI P (P > J) | VFX explosion, dégâts -10HP, alerte voisins, `Memory.Public.AlchemistAccident` w50 |
| **CompositionPoisonous** | Recette poison + témoin civil | -5 rep individuelle, +20 rep faction clandestine |
| **RareComponentArrived** | Livraison composant exotique | Mood +20 pour 24h, suspend autres tâches |
| **WeatherRainOnPowder** | Pluie + tâche outdoor active + poudre exposée | court-circuit `Routine.RushIndoor`, stress +30 |
| **EraSouffleAlchemyShift** | Souffle + recette d'ère sortante en cours | recette devient instable (rouille -15%) ; mood -20 |
| **ApprenticeBlunder** | Apprenti `subordinate` casse fiole rare | Colère +30, J = sermon strict, F = pédagogie |

---

## 5. Modes superposables

> Cf. [[Actions Situationnelles]] §3 catalogue.

| Mode | Comportement Alchimiste | LOD requis |
|------|--------------------------|------------|
| **Routine** | Cycle laboratoire ; refuse interruptions sauf urgence | Tous |
| **Marchand** | Rare — uniquement si Alchimiste-comptoir (auto-vente). Sinon réfère à Apothicaire | L0/L1 |
| **Dialogue** | Réservé, voix basse, vocabulaire technique. Attend pause de recette | L0 |
| **Crise** | **Sécurisation prioritaire** : éteint athanor, ferme bocaux toxiques, PUIS évacue. Si pas le temps → quitte tout (mais Mood -50) | L0/L1 |
| **Festivité** | Quasi absent — Alchimiste se tient à l'écart, observe brièvement (I dominant) | Tous |
| **Religieux** | Selon religion : [[Foedus Animae]] potions de pacte, [[Ignis Aeternum]] alchimie purificatrice | Tous |
| **Deuil** | Travaille en silence pendant 14j, recettes funéraires (encens, baumes mémoriaux) | Tous |
| **Quête** | Donneur fréquent : "ramène-moi un composant rare". MBTI N+J = précis | L0 |

**Compatibilités spécifiques** : Routine + Religieux ✅ ; Marchand + Crise = override Crise (ferme labo immédiatement) ; Festivité + Routine = atténué (Alchimiste réduit travail mais ne fête pas vraiment).

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur entre dans l'atelier (rep neutre)
- **Branche BT** : `ModeSocial.StandardGreet` mais **interruptive minimale** (Alchimiste finit son geste)
- **Utility** : `Routine.Continue` +20 (priorité tâche), `Social.Greet` -10 (dérangé)
- **MBTI** : INTP "Hm ? Une seconde..." ; INTJ "Vous êtes attendu ?" ; ISTP silence + regard
- **Mood** : aucun changement sauf si client habituel (+5)

### 6.2 Joueur tente d'acheter potion (rep > +25)
- **Branche BT** : Mode Marchand sous-état Alchimiste (prix élevés, stocks limités)
- **MBTI** : T = prix ferme, F = peut négocier si raison émotionnelle
- **Effet** : prix élevés (50-2000 Éclats selon palier), stock visible faible → urgence simulée

### 6.3 Mode Crise — combat de rue ou raid village
- **Trigger** : `Memory.Public.RaidOnVillage` OU `ThreatLevel > 50`
- **Branche BT** : **séquence sécurisation** :
  1. `BTTask_ExtinguishAthanor` (5s)
  2. `BTTask_LockToxicCabinets` (3s)
  3. `BTTask_GrabRecipeNotebook` (1s)
  4. PUIS `Combat.Flee` (sortie atelier)
- **MBTI** : J insiste sur séquence complète ; P peut sauter étapes 1-2 si Peur >= 80
- **Risque** : si Peur saturée trop tôt → fuit en laissant athanor allumé → **incendie** possible (chained event)

### 6.4 Phénomène cosmique (Brume Mortelle, Échos Brisés)
- **Branche BT** : `Routine.OpportunityResearch` (au lieu de fuir, examine !)
- **Utility** : `Routine.Continue` +50 (Alchimiste N+P = curiosité override Peur), `Combat.Hide` +10 (dans son labo)
- **MBTI** : INTP ravi (+30 mood), ISTP analyse en silence
- **Mémoire** : `Memory.Public.PhenomenonObserved` weight 80 individuelle
- **Effet** : recettes inédites parfois découvertes (cf. §15 Quest Generator)

### 6.5 Pluie modérée
- Si poudre en cours de séchage outdoor → `BTTask_RushIndoor` immédiat (court-circuit dérivé)
- Religion [[Ignis Aeternum]] : tâches outdoor réduites 70% (tabou)
- Sinon : ignore (Alchimiste dans son labo de toute façon)

---

## 7. Lifecycle (§18 Concepts)

- **Persistant "famille de génération"** dans la plupart des cas. Maître Alchimiste = nommé authored.
- **Mort permanente** si nommé : déclenche side quest "L'atelier orphelin" (apprenti reprend ou héritage perdu)
- **Successeur narratif 7 jours** : si famille de génération, l'apprenti (`subordinates`) reprend le labo → mastery_level reset à -1 palier
- **Cas spécial** : si mort par AlchemyExplosion → labo détruit, scène scriptée d'enquête possible

---

## 8. Variantes et signatures PNJ

### 8.1 L'alchimiste reclus
- INTP, atelier en marge de ville, taches de réactifs aux mains, parle bas
- Karma vert, méfiant des étrangers, accueille les apprentis avec patience
- Donne quêtes de récolte de composants exotiques

### 8.2 L'alchimiste de cour
- INTJ, habits soignés, démarche prudente
- Affilié Couronne (faction politique), Karma vert affiché mais accès secrets
- Donne quêtes politiques (potions pour le roi, antidotes)

### 8.3 La poisonnière clandestine
- ISTP, visage masqué, opère dans les bas quartiers
- Karma jaune, faction clandestine (Catena Fracta possible)
- Hostile aux Gardes (Lex Petra), accueille hors-la-loi
- Mode Crise : fuit immédiatement, n'attend pas la séquence sécurisation complète

### 8.4 Le chercheur d'ère
- INTP+N fort, double-métier Alchimiste+[[Chercheur]]
- Toujours à la chasse de composants éphémères, voyage avec un [[Cartographe]]
- Mode Festivité ignoré ; phénomène cosmique = exalté
- Candidat secondaire pour template alternatif au Souffle (5%)

---

*Liens : [[03 - Mécaniques/Métiers/Erudition/Alchimiste]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[03 - Mécaniques/Items/Crafts]] · [[Apothicaire]] · [[Médecin]] · [[Chercheur]] · [[Le Souffle]] · [[Les Ères]]*
