---
tags: [pnj, comportement, métier, chercheur, erudition]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Erudition/Chercheur]]
mbti_typique: [INTP, INTJ, ENTP]
karma_typique: variable
factions_compatibles: [Cabinet des Sciences Exotiques, Académies, Guildes mage, Cabinets de Prédiction, Confréries hérétiques (parfois)]
candidat_template_alternatif_souffle: secondaire
needs_review_for: [calibration-playtest, recipe-generator-déblocage-progression]
---

# 🔬 Template PNJ — Chercheur

> Comportement PNJ pour un **Chercheur** (Mémoire+Esprit, Érudition). **Très indépendant**, **expérimentations risquées**, taux d'échec élevé. **Découvertes peuvent déclencher événements** (cf §15 Quest Generator). Pendant **post-Souffle**, Chercheur exalté = générateur naturel de quêtes émergentes.
>
> Source métier : [[03 - Mécaniques/Métiers/Erudition/Chercheur]].

---

## 1. Vue d'ensemble

Le Chercheur PNJ est l'**explorateur de l'inconnu** : il invente, teste, échoue, recommence. Métier **prospectif** (vs [[Historien]] rétrospectif). Sa journée est rythmée par des **protocoles expérimentaux** longs, des **échecs fréquents** assumés, et des **percées rares** qui peuvent transformer le monde.

**Particularités** :
- **Très indépendant** : peu de hiérarchie, choisit ses sujets
- **Découvertes peuvent déclencher événements** : nouvelle recette = side quests pour la diffuser, conflits de propriété intellectuelle, attentions des guildes
- **Karma variable** : un Chercheur peut basculer en hérétique (recherche interdite) ou en pilier (recherche officielle)
- **Compatible avec [[Alchimiste]]** : double-métier fréquent (alchimiste + chercheur)
- **Candidat secondaire au template alternatif au Souffle** : sa connaissance des phénomènes anormaux le place en figure d'autorité au Souffle

> [!important] Frontières
> - **Chercheur** = nouveau, futur, inédit. Output = recette/formule signée.
> - **[[Historien]]** = passé, exhumation
> - **[[Alchimiste]]** = applique recettes existantes (créativité incluse)
> - **[[Bibliothécaire]]** = donne accès au conservé

---

## 2. Cycle quotidien typique

```
07:30 — Lever (souvent décalé selon expériences en cours)
08:00–09:00 — Vérification expériences nocturnes
09:00–13:00 — Protocole expérimental (cœur du métier)
13:00–14:00 — Repas, parfois oublié si percée
14:00–18:00 — Mesures, ajustements, nouvelles itérations
18:00–19:00 — Pause / repas
19:00–22:00 — Lecture, recoupement, planification lendemain
22:00 — Coucher (peut prolonger jusqu'à 02h si découverte)
```

**Modulation MBTI** :
- **INTP** (50%) : très flexible, suit ses idées spontanées, journées chaotiques
- **INTJ** (35%) : protocole strict, plan sur plusieurs mois
- **ENTP** (15%) : sociable, partage avec confrères, parfois extravagant

**Particularité** : un Chercheur **oublie de manger** quand absorbé (Fatigue+Faim cumulés > seuil = court-circuit `Routine.RestNow`).

---

## 3. MBTI typique et variantes

### 3.1 INTP — Logicien (50%)
- Curieux théoricien, recherches spontanées, peu d'écrits formels
- Découvertes accidentelles fréquentes
- Mode Festivité : peu intéressé, sauf si phénomène cosmique = sortie observation

### 3.2 INTJ — Architecte (35%)
- Stratège silencieux, projets de recherche sur 5-10 ans
- Maître Chercheur = Héritage signé (recettes nommées)
- Donneur de quêtes long terme

### 3.3 ENTP — Innovateur (15%)
- Sociable, partage trouvailles, collaborations multiples
- Karma jaune parfois (recettes douteuses, brevets contestés)
- Compatible avec confréries non-orthodoxes

---

## 4. Triggers spécifiques

| Trigger | Conditions | Effet |
|---------|------------|-------|
| **DiscoveryBreakthrough** | Recette/formule nouvelle validée | Mood +50, side quest générée pour diffuser |
| **ExperimentFailed** | Protocole échoué (fréquent !) | Mood -5, INTJ persiste, INTP change de sujet |
| **RareComponentReceived** | Composant exotique livré | Mood +20, expérience prioritaire |
| **CompetitorPublishes** | Confrère publie recette concurrente | Colère +15, accélère propre recherche |
| **EraSouffleBroadcast** | Nouveau Souffle | **Mode `Routine.SouffleResearch`** : phénomènes nouveaux = opportunités |
| **ApprenticeQuestion** | Disciple pose question pertinente | Mode Dialogue, peut transmettre savoir |
| **CosmicPhenomenonAvailable** | Brume Mortelle, Échos Brisés actifs | Sortie immédiate pour observation/captation |

---

## 5. Modes superposables

| Mode | Comportement Chercheur | LOD requis |
|------|--------------------------|------------|
| **Routine** | Laboratoire / cabinet, expérimentations | Tous |
| **Marchand** | Vente recettes signées (prix très élevés), brevets | L0/L1 |
| **Dialogue** | Précis, technique, peut s'enthousiasmer (ENTP) ou rester sec (INTJ) | L0 |
| **Crise** | Sécurise **carnet expérimental** + composants rares, fuit | L0 |
| **Festivité** | Absent ou observe brièvement (sauf ENTP qui peut participer) | Tous |
| **Religieux** | Rare ; INTP peut être sceptique-curieux | Tous |
| **Deuil** | Travaille en silence, peut dédier découverte au défunt | Tous |
| **Quête** | **Donneur fréquent + DESTINATAIRE** : reçoit aide pour ses propres recherches | L0 |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur apporte composant rare
- **Branche BT** : `Dialogue.ResearchAssessment`
- **Utility** : `Social.Trade` +30, examen composant immédiat
- **MBTI** : INTP enthousiasme spontané ; INTJ évalue silencieusement ; ENTP négocie
- **Effet** : si composant pertinent → **achat élevé** + **side quest associée** ("trouve-m'en 3 autres")

### 6.2 Mode Crise — pillage du laboratoire
- **Branche BT** :
  1. `BTTask_GrabResearchNotebook` (priorité absolue)
  2. `BTTask_SaveSamples` (échantillons rares)
  3. PUIS `Combat.Flee`
- **MBTI** : INTJ méthodique ; INTP peut figer (analyse paralysie) ; ENTP improvise

### 6.3 Phénomène cosmique
- **Branche BT** : `Routine.OpportunityResearch` (override Peur)
- **Utility** : `Routine.Continue` +60 (Chercheur N+P = curiosité override Peur)
- **MBTI** : INTP exalté (+30 mood), peut s'exposer dangereusement
- **Mémoire** : événement w100 individuelle, base de futures recherches

### 6.4 Découverte majeure (breakthrough)
- **Trigger** : `DiscoveryBreakthrough`
- **Effet** : 
  - Mood +50, peut entraîner **fête solo** (INTP)
  - Side quest générée : "Diffuse cette découverte" / "Brevette-la auprès de la guilde"
  - Si découverte = recette d'ère : Héritage activable
- **Conflit potentiel** : confrères concurrents peuvent générer quête de **vol** ou **espionnage**

### 6.5 Souffle imminent
- **Branche BT** : `Routine.SouffleResearch` activé
- **Effet** : Chercheur spécialisé Sciences Exotiques devient figure d'autorité temporaire
- **Candidat alternatif** : ~5% des Chercheurs Maître ont template alternatif au Souffle
- Templates : `Researcher_Cosmic_Authority` (consultation publique)

### 6.6 Joueur Karma rouge
- Réaction variable selon faction : si Chercheur clandestin (Catena), peut être allié
- Sinon : refuse, mais ne dénonce pas toujours (curiosité scientifique)

---

## 7. Lifecycle (§18)

- **Persistant** souvent (recherche = projet long terme)
- Maître Chercheur = nommé authored (~20 par continent)
- **Mort permanente** si nommé : side quest "L'expérience inachevée" ; carnet de recherche devient quête
- **Successeur narratif 7j** : disciple poursuit (Maîtrise -1 palier) — possibilité de **changer la direction** de la recherche

---

## 8. Variantes et signatures PNJ

### 8.1 Le théoricien d'académie (INTJ)
- Cabinet bien tenu, financement institutionnel
- Karma vert, recherche orthodoxe
- Donneur de quêtes "aide-moi à compléter ma thèse"

### 8.2 Le savant excentrique (INTP)
- Atelier en désordre, expériences spontanées
- Karma vert avec quelques accidents
- Donneur de quêtes spontanées et bizarres

### 8.3 L'expérimentateur clandestin (ENTP, parfois INTJ)
- Recherches interdites (poisons, magie noire, créatures cosmiques)
- Karma jaune/rouge, faction Catena Fracta
- Donneur de quêtes risquées et payantes

### 8.4 Le chercheur d'ère (Maître+)
- INTJ ou INTP, spécialiste phénomènes Souffle
- **Candidat secondaire template alternatif au Souffle**
- Compatible [[Lore/Religions/Ordo Caelum]] et confréries hérétiques
- Héritage : recettes signées d'ère

---

*Liens : [[03 - Mécaniques/Métiers/Erudition/Chercheur]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Items/Crafts]] · [[Alchimiste]] · [[Historien]] · [[Bibliothécaire]] · [[Astronome]] · [[Le Souffle]] · [[Les Ères]]*
