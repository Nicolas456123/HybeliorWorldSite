---
tags: [pnj, comportement, métier, exploration, chasseur, créature, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Exploration/Chasseur de créature|Chasseur de créature]]"
mbti_typique: [ISTP, ESTP, INTP]
karma_typique: vert
factions_compatibles: [Vael'Kurash, Drakora ordres de chasse, Ignis Aeternum, Foedus Animae rituel chasse, Mosrack libre]
catégorie_métier: Exploration
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, distinction-Dépeçeur, mode-Crise-combat-créature]
---

# 🏹 Template PNJ — Chasseur de créature

> Comportement situationnel d'un PNJ Chasseur de créature. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. Métier de **traque/abattage** ; cycle alterné observation-poursuite-mise à mort. Métier joueur : [[03 - Mécaniques/Métiers/Exploration/Chasseur de créature|Chasseur de créature]]. Branche [[Bestiaire - Index|Bestiaire]].

---

## 1. Vue d'ensemble

Le Chasseur de créature est le **prédateur professionnel** d'Hybelior. Cible : bestiaire non-humain. Profil : **calme tendu, attentif, économe en mots et en gestes**. Mode dominant **Routine + Itinérant** (camp de chasse, traques de plusieurs jours). Bascule **Mode Crise = combat créature** (sa spécialité — donc plutôt un mode de **performance** que de panique).

- **Identité comportementale** : prédateur silencieux, lecteur de traces, économique, fier de ses prises
- **Position sociale** : aventurier respecté, fournisseur de matières rares (cuir, corne, venin)
- **Slot Mode Marchand** : vente directe au [[Tanneur]], [[Apothicaire]], [[Boucher]] — ponctuel à chaque retour
- **Lien chaîne** : amont [[Forgeron]] (munitions, pièges) · aval [[Tanneur]], [[Apothicaire]], [[Boucher]], joueurs aventuriers (fourniture matières)
- **Karma vert** par défaut — sauf chasse illégale (espèces protégées en territoire [[Lore/Religions/Vael'Kurash]] → Karma gris/rouge)

---

## 2. Cycle quotidien

### Cycle camp (basé près village)

```
04:00  Lever pré-aube (heure de la chasse)
04:30  Sortie vers terrain (affût ou traque)
05:00-11:00  Chasse matinale (boucle observation/poursuite)
12:00  Retour camp, dépeçage rapide (anim) si prise
13:00-15:00  Repos, entretien armes, affûtage
15:00  Sortie après-midi (option si pas de prise matin)
18:00-19:00  Mode Marchand (vente au village)
20:00  Repas, taverne brève (ESTP) ou solitaire (ISTP/INTP)
21:00  Coucher
```

### Cycle traque (sous-mode Itinérant, 3-10j)

Cible spécifique (créature majeure, contrat) — campement à proximité, observation patiente, frappe quand l'occasion se présente.

> Voir `hunter_camp`, `affût_post`, `dépeçage_table`, `boucan_foyer` pour ancres.

---

## 3. MBTI typique

| Type | Profil chasseur | Note |
|------|-----------------|------|
| **ISTP** | Chasseur solitaire, virtuose technique, peu loquace | Le défaut canonique (Trinoria, Skaldoria) |
| **ESTP** | Chasseur audacieux, contrats lucratifs, raconteur | Frontière [[03 - Mécaniques/Métiers/Exploration/Mercenaire|Mercenaire]] (Drakora) |
| **INTP** | Chasseur-naturaliste, étude des points faibles, passion bestiaire | Académique (Lumasar) |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **T** (commun) : factuel, négociation prix ferme, peu d'empathie animale
- **S+T (ISTP/ESTP)** : action directe, réaction rapide, faible spéculation cosmique
- **N+T (INTP)** : analyse comportement, cartographie mentale du bestiaire
- **P** (commun) : adapte tactique selon créature ; flexibilité tactique
- **I vs E** : ISTP/INTP solitaires ; ESTP plus social, voyage avec partenaire

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **PreyDetected** | Cible bestiaire visible/audible | `Routine.Approach` (silencieuse) |
| **PreyEngageRange** | Cible à portée d'arme | Bascule **Mode Crise** = combat créature (P3 §8) |
| **CreatureBoss** | Créature majeure (boss bestiaire) | Court-circuit `Combat.Tactical` ; recul si HP < 30% |
| **TrapTriggered** | Piège posé activé | Anim `relève_piège`, dépèce ou achève cible |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m | Dégaine arme (déjà en main souvent) ; attend signal d'agression |
| **HuntContract** | Contrat reçu (créature spécifique) | Bascule sous-mode `Itinérant` (§5) |
| **AnimalCompanionAlert** | Chien/faucon de chasse alerte | Suit le sens indiqué |
| **EraSouffleBroadcast** | Nouveau Souffle | Comportement faune modifié — ajustement tactique |
| **PenuryGame** | Faune locale en pénurie | Migration vers nouveau terrain de chasse |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Camp ou chasse | Boucle observation-poursuite-dépeçage |
| **Itinérant** | Contrat lointain ou traque longue | Voyage, campement, traque sur plusieurs jours |
| **Marchand** | Retour avec prise | Vend au [[Tanneur]]/[[Apothicaire]]/[[Boucher]] |
| **Dialogue** | Échange technique (autre chasseur, client) | Bref, factuel ; ESTP raconte exploits |
| **Crise** | **= combat créature actif** | **Performance** — `Combat.Tactical`, exploite faiblesses (Mémoire bestiaire) |
| **Festivité** | Festival de chasse local | Présente prises rares, parade trophée (ESTP brille) |
| **Religieux** | [[Lore/Religions/Vael'Kurash]] (ritual avant chasse) ou [[Lore/Religions/Foedus Animae]] (offrande à la prise) | Prière brève, offrande à l'esprit de la bête |
| **Deuil** | Animal compagnon tué | -20 mood 5j (moins long que Dresseur — relation fonctionnelle) |

Cascade priorité : Crise (combat créature) > Religieux > Itinérant > Marchand > Routine.

### 5.bis Sous-mode Itinérant (traque longue)

- Pas de domicile fixe pendant 3-10 jours
- Cycle adapté : réveil pré-aube, journée traque/affût, sommeil léger campement
- **MBTI P** (commun) : improvise selon comportement proie ; mais ESTP planifie tactique sociale (renseignements villageois sur passage de la bête), ISTP/INTP planifient terrain (pistes, vents)

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive (Mode Marchand)

- **Comportement** : ISTP "Cuir frais. Vous voulez ?" — ESTP "Regardez cette corne ! Une bête de cinq quintaux !" — INTP analyse cliniquement la pièce
- **Prix** : `rigidité_prix +30` (T) — peu de marge négociation
- **Reconnaissance +75** : propose pièces rares cachées (cœur de mythique, venin pur)

### 6.2 Combat créature (Mode Crise = performance)

- **Trigger** : `PreyEngageRange` ou créature charge le chasseur
- **Branche BT** : `Combat.Tactical` (exploite faiblesses)
- **Comportement** :
  - **ISTP** : virtuose technique, frappes calculées aux points faibles
  - **ESTP** : audacieux, prend risques, contre-attaque agressive
  - **INTP** : analyse rapide, cible point critique selon Bestiaire mémorisé
- **Mood** : `Colere +20`, `Peur +5` (faible — c'est leur métier)
- **Branche [[Bestiaire - Index]]** : utilise faiblesses connues (feu sur loup-garou, argent sur certaines créatures)

### 6.3 Souffle / changement d'Ère

- **Eldoria** : faune luxuriante, abondance de prises, mood +10
- **Noctis** : créatures nocturnes plus agressives, cycle inversé partiel
- **Tempora** : faune mutée par éclats temporels — INTP fasciné, ISTP/ESTP frustrés
- **Climata** : migration faune, terrains de chasse déplacés

### 6.4 Chasse illégale (Karma)

- **Trigger** : tir sur espèce protégée (territoire [[Lore/Religions/Vael'Kurash]])
- **Effets** : -30 Reconnaissance faction Vael'Kurash ; karma gris si vu, rouge si répété
- **MBTI T** (commun) : peu de remord moral ; rationalise par profit

### 6.5 Attaque sur village (Mode Crise humain)

- **Trigger** : `RaidOnVillage`
- **Branche BT** : `Combat.Engage` (chasseur de bandits = même tactique que chasse créature)
- **Comportement** : embuscade, frappe à distance (arc/arbalète) ; ESTP prend l'initiative, ISTP couvre, INTP cible le chef

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération ou Nommé authored (1-3 par région de chasse)
- **Mort transient/famille** : 7 jours → apprenti chasseur reprend
- **Mort nommé authored** : permanente, side quest "La bête venge son chasseur" possible
- **Apprenti** : 0-2 (transmission pistage et arme)
- **Héritage** : un Maître peut être inscrit aux chroniques pour avoir tué une **créature mythique** unique

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Trinoria** (forêt) | Traqueur sylvestre, embuscades, flèches | ISTP | Cervidés, sangliers, loups |
| **Onara** (plaine) | Cavalier-chasseur, cor et meute | ESTP | Bêtes des plaines, faucon-chasse |
| **Drakora** (frontières) | Tueur de monstres officiel, contrats | ESTP | Créatures dangereuses, [[No man's land]] |
| **Skaldoria** (toundra) | Chasseur solitaire, hivernal | ISTP | Ours, loups arctiques, créatures glace |
| **Lumasar** (académique) | Chasseur-naturaliste, étude bestiaire | INTP | Spécimens rares pour Bibliothèque |

### Signatures PNJ (Phase 4 stub)

- **Korven le Silencieux** (ISTP Maître, Trinoria) — flèche unique pour cerf royal
- **Brask le Trompeur** (ESTP Maître, Drakora) — tueur de hydre légendaire
- **Théodora la Naturaliste** (INTP Maître, Lumasar) — Bestiaire des Onze Continents

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de créature|Chasseur de créature (gameplay)]] · [[Bestiaire - Index]] · [[03 - Mécaniques/Métiers/Exploration/Dresseur|Dresseur]] · [[Tanneur]] · [[Apothicaire]] · [[Boucher]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de trésors|Chasseur de trésors]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de primes|Chasseur de primes]]*
