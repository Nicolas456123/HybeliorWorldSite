---
tags: [pnj, comportement, métier, bibliothécaire, erudition]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Erudition/Bibliothécaire]]
mbti_typique: [ISTJ, INTJ, INFJ]
karma_typique: vert
factions_compatibles: [Bibliothèques d'État, Catacombes-Bibliothèques de Mosrack, Cabinets de Prédiction, Ordres monastiques]
needs_review_for: [calibration-playtest, mode-crise-priorité-livres-vies]
---

# 📚 Template PNJ — Bibliothécaire

> Comportement PNJ pour un **Bibliothécaire** (Mémoire+Acuité, Érudition). Métier **sédentaire**, **silencieux**, profondément lié à la conservation. **Mode Festivité jamais activé**. **Mode Crise = sauver les livres en priorité** (avant les vies humaines !).
>
> Source métier : [[03 - Mécaniques/Métiers/Erudition/Bibliothécaire]].

---

## 1. Vue d'ensemble

Le Bibliothécaire PNJ est un **gardien du savoir**. Métier **profondément introverti**, **silencieux**, **patient**. Sa journée se déroule dans les salles d'archives, à classer, restaurer, indexer, conseiller les rares chercheurs admis. **Cabinet calme** absolu — il **déteste** les interruptions bruyantes.

**Particularités majeures** :
- **Mode Festivité jamais activé** — un Bibliothécaire ne fête pas. S'il y a festival, il **continue de travailler** ou **sort discrètement** observer un instant
- **Mode Crise = SAUVER LES LIVRES** : priorité **absolue** aux manuscrits rares avant les vies humaines (oui, même les siennes)
- **Très introverti** : I dominant, voix basse, parle peu
- **Mémoire encyclopédique** : repère un détail, cite une source

> [!important] Hiérarchie des priorités en Crise (UNIQUE parmi les métiers)
> 1. Manuscrits rares (Héritage)
> 2. Index et catalogues (irremplaçables)
> 3. Sa propre vie
> 4. Vies des autres
>
> Cohérent avec la philosophie du métier : *« Un livre archivé pour cent ans est une civilisation »* (Othalys de Mosrack).

---

## 2. Cycle quotidien typique

```
06:30 — Lever
07:00–08:00 — Petit déjeuner discret, vérification scellés salle d'archives
08:00–12:00 — Indexation, classement, copie (cœur du métier)
12:00–13:00 — Repas seul (souvent dans cabinet)
13:00–17:00 — Restauration manuscrits, accueil chercheurs admis
17:00–19:00 — Lecture personnelle, étude
19:00–20:00 — Repas
20:00–22:00 — Lecture, correspondance avec autres bibliothécaires
22:30 — Coucher
```

**Modulation MBTI** :
- **ISTJ** (50%) : protocole strict, classement irréprochable
- **INTJ** (30%) : restaurations complexes, projets long terme
- **INFJ** (20%) : conseiller spirituel, ouvert aux questions philosophiques

**Couvre-feu archives** : salles fermées la nuit (sauf urgence). Apprentis interdits d'entrée hors créneaux.

---

## 3. MBTI typique et variantes

### 3.1 ISTJ — Logisticien (50%)
- Méthodique fiable, catalogues parfaits
- Karma vert+, refuse pots-de-vin pour accès anticipé
- Compatible Lex Petra (ordre absolu)

### 3.2 INTJ — Architecte (30%)
- Conservatrice de longue date, projets de restauration sur des décennies
- Donneur de quêtes complexes ("retrouve le fragment manquant du codex")

### 3.3 INFJ — Avocat (20%)
- Bibliothécaire-philosophe, conseil spirituel
- Compatible [[Lore/Religions/Foedus Animae|Foedus Animae]] (méditation textuelle)

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **VisitorEnters** | Joueur ou PNJ entre dans bibliothèque | "Chuuut" préventif, observe |
| **NoiseDetected** | Tag `World.Trace.Noise` > seuil dans archives | Colère +20, intervention immédiate |
| **ManuscriptDamaged** | Tag `Item.Damaged.Rare` détecté | Colère +50 (saturation T = court-circuit Defense agressive) |
| **FireNearby** | Tag `World.Trace.Fire` < 50m | **PANIQUE LIVRES** : court vers archives pour évacuer manuscrits |
| **WaterLeakDetected** | Pluie + toit défaillant + archives concernées | Court-circuit absolu : protège manuscrits sous tissus, mood -50 |
| **RareSeekerArrives** | Chercheur authentifié demande accès | Mood +10 (interaction utile), prépare matériaux |
| **CatalogQuery** | Joueur demande information précise | Mémoire activée → si rep > 0, donne référence |

---

## 5. Modes superposables

| Mode | Comportement Bibliothécaire | LOD requis |
|------|--------------------------|------------|
| **Routine** | Salle d'archives → bureau → cabinet | Tous |
| **Marchand** | Vente almanachs, copies, accès payant. Comptoir = pupitre | L0/L1 |
| **Dialogue** | Voix très basse, vocabulaire précis. Pas de small talk | L0 |
| **Crise** | **PRIORITÉ MANUSCRITS** : évacuation livres rares avant fuite. Court-circuit unique parmi les métiers | L0 |
| **Festivité** | **JAMAIS** activé. Bibliothécaire continue ou sort brièvement | Tous |
| **Religieux** | Lecture spirituelle, méditation textuelle. Compatible créneaux silencieux | Tous |
| **Deuil** | Travaille en silence. Si proche bibliothécaire mort, restaure son dernier projet | Tous |
| **Quête** | Donneur fréquent : "retrouve fragment", "déchiffre palimpseste", "récupère manuscrit volé" | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur entre dans bibliothèque (rep neutre)
- **Branche BT** : `Dialogue.LibrarianGreet` — chuchoté, "Que cherchez-vous ?"
- **Utility** : `Social.Greet` +5 (très limité), `Routine.Continue` +30
- **MBTI** : ISTJ formel ; INTJ évalue le visiteur ; INFJ légèrement plus chaleureux
- **Refuse** : si visiteur bruyant, joueur Karma rouge, ou rep < 0

### 6.2 Mode Crise — incendie de la bibliothèque
- **Branche BT** : 
  1. `BTTask_GrabRareManuscripts` (séquence indexée par valeur)
  2. `BTTask_RescueCatalogs` (irremplaçables)
  3. **PUIS** `Combat.Flee` (et seulement si pas le choix)
- Si vies civiles en danger en parallèle : **continue manuscrits** (priorité métier)
- **MBTI** : tous appliquent l'ordre (rare unanimité)
- **Mood post-événement** : -50 si manuscrits perdus, -100 si Héritage perdu

### 6.3 Joueur fait du bruit dans archives
- Trigger `NoiseDetected` → Colère +20
- ISTJ intervient sèchement ("Silence ou sortez")
- INTJ regard tueur silencieux (I)
- INFJ rappel poli mais ferme

### 6.4 Joueur Karma rouge
- Refuse l'entrée, alerte Gardes si rep < -50
- Si déjà entré : observe silencieusement, ne quitte pas des yeux les manuscrits rares
- Aucun service, aucune réponse

### 6.5 Phénomène cosmique (Brume Mortelle)
- **Branche BT** : `Routine.SecureArchives` — scelle les archives, applique tissus protecteurs
- **MBTI** : INTJ utilise comme opportunité d'étude après ; INFJ médite le sens
- Pas de panique (introvertis stoïques)

### 6.6 Festival local
- Mode Festivité **jamais activé** (rare exception : Cantus Mundi peut tirer un INFJ pour 30 min)
- Bibliothèque reste ouverte, calme refuge des introvertis non-festifs

### 6.7 Mort proche (autre bibliothécaire collègue)
- Mode Deuil silencieux, travaille en hommage
- Restaure le dernier projet du défunt (cf §5.7 Actions Situationnelles)

---

## 7. Lifecycle (§18)

- **Persistant** systématique (compétence rare)
- Conservateur en chef = nommé authored (1-3 par grande bibliothèque)
- **Mort permanente** si nommé : side quest "Le scellé brisé" (joueur doit remplacer ou restaurer)
- **Successeur narratif 7j** : assistant ou apprenti (Maîtrise -1 palier)

---

## 8. Variantes et signatures PNJ

### 8.1 La vénérable conservatrice
- INFJ, lunettes épaisses, mains tachées d'encre
- Connaît chaque livre par cœur
- Karma vert+, mentor désintéressé pour chercheurs

### 8.2 Le bibliothécaire d'État
- ISTJ, costume strict, accès archives royales
- Méfiant envers étrangers, exige lettres de recommandation
- Affilié Couronne, peut bloquer accès politique

### 8.3 Le moine bibliothécaire
- INFJ, ordre [[Lore/Religions/Foedus Animae|Foedus Animae]] ou monastique
- Catacombes-Bibliothèques de Mosrack
- Donneur de quêtes mystiques (manuscrits scellés, prophéties)

### 8.4 La bibliothécaire-restauratrice clandestine
- INTJ, opère sur manuscrits volés ou interdits
- Karma jaune, faction grise (Catena Fracta possible)
- Réseau secret de bibliothécaires hérétiques

---

*Liens : [[03 - Mécaniques/Métiers/Erudition/Bibliothécaire]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Items/Crafts]] · [[Historien]] · [[Astronome]] · [[Scribe]] · [[Lore/Religions/Foedus Animae]]*
