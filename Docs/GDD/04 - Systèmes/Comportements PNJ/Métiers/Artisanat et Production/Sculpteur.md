---
tags: [pnj, comportement, métier, artisanat, sculpteur, ia, template, héritage]
type: behavior-template
métier_lié: "[[Sculpteur]]"
mbti_typique: [ISFP, INFP, INTP]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Endora art, Avalor royal, Cendara basalte, Onara sacré, Astravia constellations, Alkaran totems]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-artiste, lifecycle-apprentis-assistants-héritage, distinction-Enchanteur]
---

# 🗿 Template PNJ — Sculpteur

> Comportement situationnel d'un PNJ Sculpteur. Métier **artistique** — taille pierre/bois/os/marbre. Œuvres signées peuvent devenir **Héritage** (cf. [[Sculpteur]] §gold sinks). Lifecycle riche : apprentis → assistants → héritage. Distinction Enchanteur d'objet : Sculpteur = matière brute, atelier physique bruyant. Métier joueur : [[Sculpteur]].

---

## 1. Vue d'ensemble

Le Sculpteur travaille en **atelier de taille** ouvert, bruyant (maillet sur burin), poussiéreux. Il produit **statues, ornements monumentaux, frises, gargouilles, talismans, statuettes**. Cycle long pour œuvres signature (semaines réelles). Mode Marchand secondaire — il vend une œuvre par mois plutôt qu'un produit quotidien.

- **Identité comportementale** : artiste-introspectif, observation longue, geste précis, parle peu en taille
- **Lien chaîne** : amont [[Métiers|Mineur]] / [[Tailleur de pierre]] (pierre, marbre), [[Métiers|Bûcheron]] / [[Menuisier]] (bois sculptable), [[Boucher]] (os) · aval [[Architecte]] (ornements bâtiments), joueurs (statuettes, talismans), religions (statues culte), guildes/nobles (statues commémoratives)
- **Distinction Enchanteur** : Sculpteur = pierre/bois/os, atelier bruyant ; [[Enchanteur d'objet]] = scriptorium silencieux, runes magiques

---

## 2. Cycle quotidien

```
07:00  Lever
08:00  Étude modèle / observation (T1) — 30-60 min
08:30  Atelier de taille (T2) — burin, maillet, polissage
12:00  Pause déjeuner
13:00  Reprise taille (T3)
17:00  Mode Marchand-Service (rendez-vous clients, présentations)
19:00  Fermeture, croquis-projets
20:00  Repas + réflexion solo (INTP/INFP) ou taverne discrète (ISFP)
22:00  Coucher
```

### Boucle taille (œuvre signature : semaines réelles)

```
[Modèle terre] → [Tracé bloc] → [Dégrossissage gros burin] → 
[Taille fine] → [Polissage] → [Signature poinçon] → [Présentation]
```

---

## 3. MBTI typique

| Type | Profil sculpteur | Note |
|------|------------------|------|
| **ISFP** | Sculpteur intuitif, art subtil, statues sacrées discrètes | Le défaut canonique, Onara |
| **INFP** | Sculpteur-poète, vision symbolique, mausolées émouvants | Vytharia, Endora |
| **INTP** | Sculpteur-théoricien, calcul proportions, école académique | Lumasar, Astravia |

Modulateurs :
- **I** + **P** (commun) : introspectif, peu loquace, improvise selon "ce que la pierre veut"
- **F** (ISFP/INFP) vs **T** (INTP) : ISFP/INFP émotionnel-symbolique ; INTP technique-géométrique
- **N** (INFP/INTP) vs **S** (ISFP) : INFP/INTP spéculation forte aux Souffles ; ISFP focus sensoriel direct
- **Sculpture en cours** : dialogue refusé pendant taille critique (concentration extrême)

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **MaterialSelection** | Bloc pierre livré | Étude longue (15-30 min), choix orientation |
| **CarvingInProgress** | Taille en cours phase critique | Verrouille social (refuse interruption non-amie) |
| **CustomerInquiry** | Joueur intéressé œuvre | Bascule Mode Marchand-Service |
| **CommissionRequest** | Commande signature (statue, frise) | Mode Quête long terme (semaines) |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30 ; INFP Peur saturée vite |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → fuite (maillet/burin = arme T1 contondante limitée) |
| **WorkVandalized** ★ | Œuvre détruite par vandale | Court-circuit — Colère extrême, marqueur Mémoire weight 100 |
| **EraSouffleBroadcast** | Nouveau Souffle | Forte spéculation cosmique (N), nouveaux thèmes inspirent |
| **PatrimonyDeclared** | Œuvre déclarée Héritage | Mood +50 sur 30 jours, prestige social grimpe |

---

## 5. Modes superposables

| Mode | Activation | Spécificité |
|------|-----------|-------------|
| **Routine** | Étude + taille | Cycle T1-T3, **dialogue refusé** pendant taille critique |
| **Marchand-Service** | RDV client | Présente œuvres terminées, négocie commande ; INTP calcule, INFP raconte symbolique |
| **Dialogue** | Avec Mineur, Architecte, religions | Technique pierre, lore symbolique |
| **Crise** | Attaque OU œuvre vandalisée | Fuite (combat) ou Colère extrême (vandalisme) |
| **Festivité** | Inauguration statue, fête patrimoniale | Présence cérémonielle, INFP émotionnel ; INTP discours technique |
| **Religieux** | Sabbat religion | Statues sacrées en projet selon religion (Foedus Animae, Ordo Caelum) |
| **Deuil** | Mort proche | Peut sculpter mausolée/stèle pour proche (cycle ×2 si famille directe) |
| **Quête** | Commission long terme | Projet 3-12 semaines réelles |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur intéressé œuvre (Mode Marchand-Service)

- **Trigger** : `CustomerInquiry`
- **Comportement** :
  - **ISFP** : "Cette statuette… je l'ai sentie venir d'un rêve. Si vous la prenez, prenez-en soin." — discret-émotionnel
  - **INFP** : "Cette gargouille pleure le passé. Elle est faite pour un toit qui regarde l'ouest." — poétique-symbolique
  - **INTP** : "Diorite, taille en relief de 18 cm, proportions phi. 350 Éclats. Voulez-vous polissage rituel ?" — technique
- **Prix** : 50 Éclats (statuette commune) à 500 000 Éclats (statue Héritage)

### 6.2 Œuvre vandalisée (Trigger WorkVandalized) ★

- **Trigger** : Player ou PNJ détruit/dégrade œuvre
- **Branche BT** : court-circuit — Colère extrême (saturation chez F)
- **Comportement** :
  - **INFP** : larmes silencieuses, peut maudire à voix haute, mémoire individuelle weight 100 permanente
  - **ISFP** : retrait douloureux, refuse dialogue 7+ jours
  - **INTP** : analyse rationnelle, appelle Garde, exige réparation chiffrée
- **Réputation joueur** : -100 individuelle + propagation Foedus Animae (sacrilège art)

### 6.3 Commission long terme (Trigger CommissionRequest)

- **Comportement** : projet 3-12 semaines réelles, sessions multiples, ingrédients rares
- Suspension partielle Mode Marchand pour clients standards
- **MBTI INFP** : peut refuser commission si symbolique conflictuelle (noble cruel, dieu interdit)

### 6.4 Œuvre déclarée Héritage ★ (Trigger PatrimonyDeclared)

- **Trigger** : statue/frise reconnue par institution (chronique, faction, religion)
- **Mood** : +50 baseline 30 jours, prestige social monte
- Le Sculpteur entre dans Apprenti → Assistant → Maître reconnu → **Héritage** lifecycle
- L'œuvre **survit aux Parties** (cf. [[Le Souffle]] §Héritage)

### 6.5 Souffle / changement d'Ère

| Ère | Effet |
|-----|-------|
| **Eldoria (Feu Endormi)** | Statues dorées tendance, demande nobles +30% |
| **Tempora (Échos Brisés)** | Pierre instable, fragmentation possible, ±15% rendement |
| **Brume Mortelle** | Statues funéraires, mausolées en pic |
| **Verdoiement** | Statues organiques, frontière Foedus Animae |

INFP/INTP N : entend "ce que cette Ère veut sculpter" ; ISFP S : "Le marbre est marbre, je travaille."

### 6.6 Attaque (Mode Crise)

- **Comportement** : fuite avec œuvres en cours signatures (objets précieux)
- INFP : Peur saturée vite (sensibilité), abrite croquis-projets
- INTP : analyse trajet fuite, calcule perte matérielle

---

## 7. Lifecycle PNJ ★ (riche)

> Lifecycle distinctif Sculpteur — apprentis → assistants → maître reconnu → héritage.

- **Catégorie** : Famille de génération (artistes locaux) + Nommé authored (Maîtres signature)
- **Apprenti** (1-3) : sous-PNJ ISFP/INFP qui charrie pierre, polit, dégrossit
- **Assistant** (Adepte+, 0-2) : sous-PNJ qui taille phases secondaires, signe avec poinçon Maître autorisé
- **Maître reconnu** : signe pièces Magistrales+, peut former 5-7 ans avant successeur
- **Héritage** : œuvres survivant Parties, Sculpteur inscrit aux chroniques [[Mort]] §Renom
- **Mort nommée** : permanente, atelier devient mausolée / musée local, side quest "L'inachevée"

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Endora** (art subtil) | Statues d'art subtiles | INFP | Frises poétiques |
| **Avalor** (royal) | Statues royales en or-pierre | INTP | Monument noble |
| **Cendara** (volcanique) | Statues volcaniques basalte | ISFP | Idoles Ignis Aeternum |
| **Onara** (sacré) | Statues sacrées Foedus Animae | ISFP | Idoles compagnons |
| **Astravia** (constellations) | Constellations en marbre | INTP | Astronomique-géométrique |
| **Alkaran** (totems) | Totems en bois nordique | ISFP | Totems clans |

### Signatures PNJ (Phase 4 stub)

- **Maître Olwen d'Endora** (INFP Maître) — frises poétiques, école subtile
- **Sereneth d'Astravia** (INTP Maître) — constellations en marbre, Ordo Caelum
- **Vahld d'Alkaran** (ISFP Maître) — totems clans nordiques
- **Mère Tezara de Cendara** (ISFP Maître) — idoles volcaniques Ignis Aeternum
- **Padre Solivan d'Onara** (ISFP Maître) — idoles Foedus Animae compagnons

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Sculpteur]] (archétype joueur) · [[Tailleur de pierre]] · [[Menuisier]] · [[Architecte]] · [[Enchanteur d'objet]] (distinction) · [[Le Souffle]] §Héritage*
