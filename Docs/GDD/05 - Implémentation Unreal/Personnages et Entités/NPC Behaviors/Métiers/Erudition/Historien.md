---
tags: [pnj, comportement, métier, historien, erudition]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Erudition/Historien]]
mbti_typique: [INTJ, ISTJ, INFJ]
karma_typique: vert
factions_compatibles: [Académies, Cabinets de Prédiction, Conseil des Augures, Bibliothèques d'État, Sociétés Savantes]
candidat_template_alternatif_souffle: secondaire
needs_review_for: [calibration-playtest, conditions-cachées-déblocage-ères-passées]
---

# 🏛️ Template PNJ — Historien

> Comportement PNJ pour un **Historien** (Mémoire+Verbe, Érudition). **Cycle voyage/cabinet alterné**. **Donneur de quête fréquent** (recherche d'artefacts, témoignages, calendriers). Crucial chaîne de [[Prédiction]] : ses calendriers anciens nourrissent l'[[Astronome]].
>
> Source métier : [[03 - Mécaniques/Métiers/Erudition/Historien]].

---

## 1. Vue d'ensemble

L'Historien PNJ alterne **deux modes de vie** : **cabinet** (cabinet d'étude, archives) et **voyage** (sites archéologiques, fouilles, interrogation des anciens). Métier **actif** dans Hybelior — pas un sédentaire pur.

**Particularités** :
- **Cycle alterné** : 60% cabinet / 40% voyage selon palier (Novice = cabinet ; Maître = voyage fréquent)
- **Donneur de quête fréquent** : recherche d'artefacts, témoignages, calendriers anciens
- **Mémoire encyclopédique** + **Verbe** (publications, conférences)
- **Candidat secondaire au template alternatif au Souffle** : son rôle de **chroniqueur** peut basculer en figure publique au Souffle (cohérent §5.5.2)

> [!important] Frontières
> - **Historien** = recherche active, publication, exhumation
> - **[[Bibliothécaire]]** = conservation, indexation
> - **[[Chercheur]]** = future, formules nouvelles
> - **[[Barde]]** = transmission orale
>
> Duo classique : Historien (vrai savoir) + Barde (mémorabilité).

---

## 2. Cycle quotidien typique

### 2.1 Mode cabinet (sédentaire, 60% du temps)
```
07:00 — Lever
07:30–09:00 — Petit déjeuner, courrier confrères
09:00–13:00 — Cabinet d'étude : déchiffrement, recoupement
13:00–14:00 — Repas
14:00–18:00 — Rédaction publications, copies de manuscrits
18:00–20:00 — Repas, étude
20:00–22:00 — Lecture, correspondance académique
23:00 — Coucher
```

### 2.2 Mode voyage (40% du temps, durée 1 semaine - 3 mois)
```
05:00 — Lever (rythme accéléré sur le terrain)
05:30–11:00 — Fouille / interrogation / déchiffrement in situ
11:00–13:00 — Repas + consignation cahier de campagne
13:00–18:00 — Suite fouille / déplacement
18:00–20:00 — Camp / négociation accès local
20:00–22:00 — Notes, dessins, planification du lendemain
22:30 — Coucher
```

**Modulation MBTI** :
- **INTJ** (45%) : vision long terme, projets sur des décennies
- **ISTJ** (35%) : voyage organisé minutieusement
- **INFJ** (20%) : connexion émotionnelle aux récits anciens

---

## 3. MBTI typique et variantes

### 3.1 INTJ — Architecte (45%)
- Stratège silencieux, recherche sur plusieurs ères
- Donneur de quêtes complexes ("retrouve les 5 fragments du codex perdu")
- Mode voyage : planifié à la journée près

### 3.2 ISTJ — Logisticien (35%)
- Méthodique, dossiers archivés
- Préfère sources écrites > témoignages oraux
- Compatible Lex Petra (rigueur méthodologique)

### 3.3 INFJ — Avocat (20%)
- Sensible aux récits humains, histoire orale
- Compatible [[Lore/Religions/Foedus Animae|Foedus Animae]] (mémoire des défunts)
- Donneur de quêtes émotionnelles ("aide-moi à comprendre cette tragédie ancienne")

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **ArtifactRumor** | Rumeur d'artefact dans village | Mode `Routine.Investigate` activé, voyage planifié |
| **PlayerOffersHistoricalInfo** | Joueur apporte témoignage / objet | Mode Dialogue intense, +20 rep individuelle si info utile |
| **PalimpsestDecipheredOK** | Réussite déchiffrement | Mood +30, publication imminente |
| **WitnessFound** | Ancien témoin oculaire d'événement | Suspend tâche, interroge longuement (Verbe activé) |
| **EraSouffleBroadcast** | Nouveau Souffle | Cycle de chroniques activé : devient temporairement chroniqueur public |
| **CalendarMatchAstronomer** | Calendrier ancien validé par Astronome | Synergie : envoi à [[Astronome]] (Prédiction §1) |

---

## 5. Modes superposables

| Mode | Comportement Historien | LOD requis |
|------|--------------------------|------------|
| **Routine** | Cabinet ou voyage selon phase | Tous |
| **Marchand** | Vente publications, conférences payantes, conseils privés | L0/L1 |
| **Dialogue** | Long, contextualisé, pédagogique. Adore parler de son sujet | L0 |
| **Crise** | Protège **carnet de campagne** + carnets de citations. Fuite si possible | L0 |
| **Festivité** | Présence atténuée, observe rituels comme données ethnographiques | Tous |
| **Religieux** | Selon affiliation : Foedus Animae (mémoire), Rota Mundi (cycles) | Tous |
| **Deuil** | Travaille en hommage : peut consigner la vie du défunt (chronique) | Tous |
| **Quête** | **Donneur fréquent** : recherche artefacts, témoignages, accès sites | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche avec artefact ancien
- **Branche BT** : `Dialogue.HistoricalAssessment`
- **Utility** : `Social.Greet` +50 si rep > 0, examen objet immédiat
- **MBTI** : INTJ analyse en silence ; ISTJ vérifie authenticité ; INFJ ressent l'objet
- **Effet** : si objet authentique → propose **achat** OU **quête de recherche** complémentaire ; +10 rep individuelle

### 6.2 Mode Crise — pillage du cabinet
- **Branche BT** : 
  1. `BTTask_GrabFieldNotebook` (cahier de campagne, irremplaçable)
  2. `BTTask_GrabKeyManuscripts`
  3. PUIS `Combat.Flee`
- **MBTI** : INTJ priorité absolue carnets ; ISTJ tente de sauver l'archive ; INFJ peut figer (Peur saturée)

### 6.3 Site archéologique en danger (mode voyage)
- **Branche BT** : reste sur place pour documenter (priorité savoir > sécurité personnelle)
- **MBTI** : INTJ stoïque ; ISTJ calcule retrait ; INFJ peut prendre risque émotionnel

### 6.4 Souffle imminent / changement d'Ère
- **Branche BT** : Mode `Routine.ChroniqueSouffle` activé
- **Effet** : Historien devient chroniqueur public temporaire (cf §5.5.2)
- **Candidat alternatif** : ~5% des Historiens nommés Maître+ ont template alternatif activable
- **Templates possibles** : `Historian_Era_Chronicler` (publications quotidiennes pendant transition)

### 6.5 Phénomène cosmique
- **Branche BT** : observation + consignation (priorité données)
- **MBTI N+J** : interprétation symbolique forte ; S+T : factuel
- **Mémoire** : événement weight 100, rédige chronique post-événement

### 6.6 Joueur Karma rouge
- Refuse partager savoir ; alerte Gardes
- Mais peut **noter** secrètement les exploits du joueur (chronique objective !)

---

## 7. Lifecycle (§18)

- **Persistant** systématique
- Historien Maître = nommé authored (~30 par continent)
- **Mort permanente** si nommé : side quest "Le carnet inachevé" (joueur termine recherche)
- **Successeur narratif 7j** : disciple ou associé (Maîtrise -1 palier)
- **Héritage** : œuvres signées (chroniques d'ère) survivent au Souffle

---

## 8. Variantes et signatures PNJ

### 8.1 Le chroniqueur de cour
- INTJ, accès archives royales, conseiller du roi
- Affiliation Couronne, parfois biaisé politiquement
- Donneur de quêtes politiques sensibles

### 8.2 L'archéologue itinérant
- ISTJ-P (souple), passe sa vie sur les sites
- Caravane équipée, [[Cartographe]] partenaire
- Donneur de quêtes terrain ("explore cette ruine avec moi")

### 8.3 L'historien des ères passées (Maître+)
- INTJ ou INFJ, spécialiste Souffles antiques
- **Candidat principal template alternatif au Souffle**
- Compatible [[Lore/Religions/Ordo Caelum]] et [[Lore/Religions/Rota Mundi]]
- Donneur de quêtes prophétiques

### 8.4 Le mémorialiste oral (INFJ)
- Recueille témoignages des anciens, registres de famille
- Compatible Foedus Animae
- Donneur de quêtes humaines ("retrouve la fille perdue de cette famille")

---

*Liens : [[03 - Mécaniques/Métiers/Erudition/Historien]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Prédiction]] · [[Bibliothécaire]] · [[Astronome]] · [[Chercheur]] · [[Barde]] · [[Le Souffle]] · [[Les Ères]] · [[Cartographe]]*
