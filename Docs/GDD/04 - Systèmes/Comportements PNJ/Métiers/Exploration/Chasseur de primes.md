---
tags: [pnj, comportement, métier, exploration, chasseur, primes, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Exploration/Chasseur de primes|Chasseur de primes]]"
mbti_typique: [ISTP, INTJ, ESTP]
karma_typique: vert (mais profession violente)
factions_compatibles: [Mosrack guilde, Galenor justice, Onara plaines, Lex Petra appliqué, Foedus Animae justice]
catégorie_métier: Exploration
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, distinction-Mercenaire-Soldat, branche-PvP-Karma-Bounty]
---

# 🎯 Template PNJ — Chasseur de primes

> Comportement situationnel d'un PNJ Chasseur de primes. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Cible : PNJ/joueurs Karma rouge/noir**. Branche [[PvP]] §Karma + Bounty. Métier joueur : [[03 - Mécaniques/Métiers/Exploration/Chasseur de primes|Chasseur de primes]].

---

## 1. Vue d'ensemble

Le Chasseur de primes est le **traqueur de personnes**. Cible : PNJ criminels (avis de recherche), joueurs Karma rouge/banni ([[PvP]] §Karma). Profil : **calme, méthodique, lecteur de pistes humaines, économe**. Très **mobile** (sous-mode Itinérant fréquent — 5-30j de traque), travaille seul ou en duo. Bascule **Mode Crise = combat humain ciblé**.

- **Identité comportementale** : traqueur silencieux, professionnel, peu bavard, méfiant
- **Position sociale** : ambivalent — craint mais utile (le seigneur local respecte qui débarrasse les routes des bandits)
- **Slot Mode Marchand** : non-vendeur — seulement **réception bounty** au bureau de prime ou tribunal
- **Lien chaîne** : amont [[Forgeron]] (armes), [[Apothicaire]] (poisons paralysants — capture vivante), [[Espion]] (renseignements) · aval **bounty fund** ([[Économie]]), juges, seigneurs
- **Karma vert** : tuer joueur **rouge** ou PNJ avec **prime active** ne génère **jamais karma négatif** ([[PvP]] §Définition stricte). Glissement possible vers gris si contrats privés borderline.

---

## 2. Cycle quotidien

### Cycle ville (entre traques, ~30% du temps)

```
06:30  Lever, lecture des nouveaux avis de prime au bureau
07:00  Petit-déjeuner solitaire ou avec contact ([[Espion]])
08:00  Bureau de bounty — récupération info, paiement précédent
10:00  Discussion avec témoins potentiels (interrogatoire bref)
12:00  Déjeuner taverne (renseignements informels — ESTP brille)
14:00  Préparation matériel (filet, menottes, arme, cordes)
16:00  Entraînement combat (Maîtrise d'arme)
18:00  Surveillance discrète d'une cible identifiée en ville (rare — ISTP/INTJ)
20:00  Repas + planification itinéraire de traque
22:00  Coucher
```

### Cycle traque (sous-mode Itinérant, dominant ~70%)

```
04:30  Lever pré-aube
05:00  Reprise piste (carte mentale + indices terrain)
12:00  Halte courte (pas longue — cible avance)
17:30  Recherche bivouac discret
19:00  Campement, écriture rapport, planification du lendemain
21:00  Coucher (sommeil léger, alerte)
```

> Voir `bounty_office`, `tracker_camp`, `embuscade_post`, `cabin_chasseur`, `frontière_avant_poste` pour ancres.

---

## 3. MBTI typique

| Type | Profil chasseur primes | Note |
|------|------------------------|------|
| **ISTP** | Chasseur solitaire, virtuose technique, traque silencieuse | Le défaut canonique |
| **INTJ** | Chasseur stratège, planifie traque longue, capture intelligente | Mosrack guilde, élite |
| **ESTP** | Audacieux, fonce sur la prime, bagarre frontale | Frontière hors-la-loi (Pyrtara) |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **T** (commun) : factuel, peu d'empathie envers cibles, négociation prime ferme
- **S+T (ISTP/ESTP)** : action directe, réflexes
- **N+T (INTJ)** : planification longue, traque stratégique
- **P (ISTP/ESTP)** : adaptation tactique
- **J (INTJ)** : itinéraire planifié, méthode rigoureuse
- **I vs E** : ISTP/INTJ silencieux ; ESTP plus exhibitionniste (raconte exploits taverne)

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **BountyAcquired** | Nouvel avis de prime accepté | Étude, planification, bascule sous-mode `Itinérant` |
| **TargetSighted** | Cible visuellement identifiée (rep faciale + Acuité) | `Routine.Stalk` (filature discrète) |
| **TargetEngageRange** | Cible à portée + situation favorable | Bascule **Mode Crise** combat humain ciblé |
| **TargetSurrender** | Cible se rend | Capture vivante (prime souvent meilleure) |
| **WitnessNeedsInterrogation** | Témoin connu de la cible | Bascule Mode Dialogue interrogatoire |
| **PlayerKarmaRed** | Joueur Karma rouge dans rayon perception | Évalue pour traque éventuelle (libre du joueur) |
| **PlayerArmDrawnNearby** | Player armDégainée + non-cible | Vigilant, dégaine arme prête |
| **BountyFraud** | Cible déclarée morte mais en fait pas (fraude) | Mood -30, vendetta envers fraudeur |
| **EraSouffleBroadcast** | Nouveau Souffle | `era_modulation: false` — peu d'effet (besoin constant) |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Ville (entre primes) ou traque | Recherche, surveillance, traque |
| **Itinérant** | Traque active | Voyage, campement, traque sur plusieurs jours |
| **Marchand** | Non-vendeur — **récupération bounty** uniquement | Bureau de prime, réception paiement |
| **Dialogue** | Interrogatoire ou négociation | Bref, factuel, parfois intimidant |
| **Crise** | **Combat humain ciblé** OU défense personnelle | `Combat.Engage` ou `Combat.Subdue` (capture vivante) |
| **Festivité** | Festival local (rare — souvent en route) | Atténué, brève visite si en ville |
| **Religieux** | [[Lore/Religions/Lex Petra]] (justice incarnée) ou [[Lore/Religions/Foedus Animae]] (serment de pacte) | Fort — beaucoup de chasseurs serment Lex Petra |
| **Quête** | Donneur quête "trouver tel criminel" | Continue routine + dialogue spécifique |

Cascade priorité : Crise (combat ciblé) > Itinérant > Routine.

### 5.bis Sous-mode Itinérant (traque longue)

- **Pas de domicile fixe** durant 5-30j de traque (souvent plus long que Chasseur de créature)
- **Cycle adapté** : réveil pré-aube, journée de filature/traque, sommeil léger
- **MBTI J (INTJ)** : itinéraire **planifié** la veille avec carte des routes possibles
- **MBTI P (ISTP/ESTP)** : **improvise** selon piste fraîche
- Compagnons rares (parfois duo pour cible dangereuse)

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche

- **Comportement** :
  - **ISTP** : silence évalue, hoche la tête
  - **INTJ** : "Vous cherchez quelqu'un ? Je peux aider — pour un prix."
  - **ESTP** : "Hé ! Asseyez-vous ! Vous voulez gagner une prime ?"
- **Reconnaissance +75** : propose **partenariat** (joueur peut accompagner traque — donneur de quête)
- **Reconnaissance -50** : méfiance, suspect le joueur d'être lié à une cible

### 6.2 Combat humain ciblé (Mode Crise)

- **Trigger** : `TargetEngageRange`
- **Branche BT** : `Combat.Engage` ou `Combat.Subdue`
- **Comportement** :
  - **ISTP** : précis, immobilise vivant si prime meilleure
  - **INTJ** : embuscade calculée, attaque préparée
  - **ESTP** : frontale, prend risques, charge directement
- **Capture vivante** : poison paralysant, filet, menottes — Maîtrise_Capture
- **Mood** : `Colere +20` (chasse de la justice), `Peur +5` (basse)
- **Lien [[PvP]]** : ne génère **jamais karma négatif** sur cible légitime

### 6.3 Joueur Karma rouge présent (décision de traque)

- **Trigger** : `PlayerKarmaRed` détecté
- **Comportement** :
  - **INTJ** : évalue rationnellement (prime > effort ?)
  - **ESTP** : tentation directe (charge si chance favorable)
  - **ISTP** : observe, suit discrètement, frappe quand opportunité
- **Important** : ne **traque pas tous** les joueurs rouges — choisit selon prime affichée

### 6.4 Cible se rend

- **Trigger** : `TargetSurrender`
- **Comportement** : capture vivante prioritaire (prime généralement +50% si vivant)
- **MBTI T** (commun) : pas de pitié mais respecte la reddition (intérêt rationnel)
- **MBTI F** (rare exception) : peut accepter conditions de la cible si raisonnables

### 6.5 Mode Marchand inverse (réception bounty)

- **Trigger** : retour avec preuve (tête, captif, sceau cible)
- **Comportement** : présentation au bureau bounty, réception paiement (pas de marchandage — prime fixe)
- **Mood** : +20 si paiement complet ; -40 si fraude (`BountyFraud`)

### 6.6 Distinction stricte avec Soldat / Mercenaire

- **vs [[03 - Mécaniques/Métiers/Sécurité/Soldat|Soldat]]** : Soldat sert un État (drapeau permanent) — Chasseur de primes **indépendant**, choisit ses contrats
- **vs [[03 - Mécaniques/Métiers/Exploration/Mercenaire|Mercenaire]]** : Mercenaire combat à la demande (généraliste) — Chasseur de primes **cible nommée spécifique**

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (souvent itinérant solitaire) ou Nommé authored (1-3 par grande nation)
- **Mort transient/famille** : 14 jours → primes inachevées libérées
- **Mort nommé authored** : permanente, side-quest "Le carnet du chasseur" (joueur peut hériter primes)
- **Apprenti** : très rare — 0-1
- **Héritage** : un Maître peut être lié à une **capture mythique** (chef de bande légendaire) inscrite aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Mosrack** (guilde) | Bounty-hunter institutionnel, contrats officiels | INTJ | Cibles haut-tier |
| **Galenor** (impérial) | Chasseur royal, mandat juge | INTJ | Criminels d'État |
| **Onara** (cavalier nomade) | Traqueur de [[Lythar]], cavalier | ISTP | Hors-la-loi des plaines |
| **Pyrtara** (frontières) | "Rouges qui chassent les rouges", auto-régulation | ESTP | Bandits |
| **Skaldoria** (toundra) | Chasseur d'évadés, hivernal | ISTP | Cibles fugitives en zones hostiles |

### Signatures PNJ (Phase 4 stub)

- **Karric le Silencieux** (ISTP Maître, Mosrack) — capture du Roi-Bandit de Vermilis
- **Maître Solenne** (INTJ Maître, Galenor) — bounty hunter royale, jamais raté de prime
- **Brask le Cavalier** (ESTP Maître, Onara) — traqueur des plaines de Lythar
- **Ulvar le Givré** (ISTP Maître, Skaldoria) — capture l'évadé d'Azoria

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de primes|Chasseur de primes (gameplay)]] · [[PvP]] · [[Économie]] · [[03 - Mécaniques/Métiers/Exploration/Mercenaire|Mercenaire]] · [[03 - Mécaniques/Métiers/Sécurité/Soldat|Soldat]] · [[03 - Mécaniques/Métiers/Sécurité/Garde|Garde]] · [[03 - Mécaniques/Métiers/Sécurité/Espion|Espion]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de créature|Chasseur de créature]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de trésors|Chasseur de trésors]]*
