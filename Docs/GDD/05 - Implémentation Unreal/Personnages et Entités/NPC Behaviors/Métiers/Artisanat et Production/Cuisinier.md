---
tags: [pnj, comportement, métier, artisanat, cuisinier, ia, template]
type: behavior-template
métier_lié: "[[Cuisinier]]"
mbti_typique: [ESFJ, ESFP, ENFJ]
karma_typique: [neutre, blanc-clair]
factions_compatibles: [Galenor impérial, Cendara épicé, Onara rituel, Endora subtil]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-festivité-permanente, bascule-fuite-rapide-attaque, festins-multi-buffs]
---

# 🍲 Template PNJ — Cuisinier

> Comportement situationnel d'un PNJ Cuisinier. Métier **très social** — Mode Festivité quasi-permanent, anime tavernes/festins. **Bascule rapide fuite** si attaque (peu d'arme = couteau de chef faible vs combats sérieux). Métier joueur : [[Cuisinier]].

---

## 1. Vue d'ensemble

Le Cuisinier transforme viandes/poissons/légumes en plats cuits. Pivot social fort : la cuisine est le **medium des buffs sociaux** et des festins de [[Guildes|guilde]]. Travaille en taverne, auberge, foyer noble ou restaurant. **Mode Festivité quasi-permanent** : presque tout repas devient célébration sociale chez les MBTI E.

- **Identité comportementale** : extraverti-chaleureux, présentation, animation ; "coup de feu" en service
- **Lien chaîne** : amont [[Boucher]] / [[Métiers|Pêcheur]] / [[Métiers|Fermier]] / [[Boulanger]] (pain accompagnant) · aval joueurs, [[Métiers|Tavernier]], guildes (festins)
- **Bascule combat** : **fuite quasi-immédiate** (couteau de chef T1 inadéquat ; F = panique vite)

---

## 2. Cycle quotidien

```
06:00  Lever, marché matinal (T1) — courses ingrédients frais
08:00  Préparation cuisine (T2) — mise en place, découpe, réductions
11:30  Service midi (T3) — coup de feu, plats à la chaîne
14:00  Pause + nettoyage
15:30  Préparation festin/dîner (T4)
18:30  Service soir (T5) — coup de feu, ambiance taverne
22:00  Fermeture, taverne pour soi (ESFJ/ESFP très social)
00:00  Coucher (tard pour cuisinier de taverne)
```

---

## 3. MBTI typique

| Type | Profil cuisinier | Note |
|------|------------------|------|
| **ESFJ** | Cuisinier d'auberge, hôte chaleureux, connaît clients réguliers | Le défaut canonique |
| **ESFP** | Cuisinier-spectacle, flambage, anime salle, plaisanteries | Tavernes festives, Cestra |
| **ENFJ** | Cuisinier-mentor, festins symboliques, lit besoins émotionnels client | Festins de guilde, mariages |

Modulateurs :
- **E** (commun) : très social, dialogue continu, **forte propagation rumeur** (×1.5)
- **F** (commun) : empathique, prix flexibles si client en détresse, festins comme acte d'amour
- **S** (ESFJ/ESFP) vs **N** (ENFJ) : ESFJ/ESFP focus pratique sur plat ; ENFJ symbolique (chaque festin a un sens)
- **J** (ESFJ/ENFJ) vs **P** (ESFP) : ESFJ/ENFJ planifie menus stricts ; ESFP improvise selon arrivages

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **CustomerEnters** | Client entre | Salutation forte, **cri vendeur** (ESFP) |
| **CoupDeFeu** | Service midi/soir, file > 5 | Anim `débordé`, cadence ×2, communication équipe |
| **GuildFeast** | Commande festin guilde | Mode Festivité activé, projet 4-12h |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30 ; **Peur saturée vite** chez F |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → **fuite + alerte** (pas combat) |
| **RaidOnVillage** | Catastrophe | Mode Crise = fuite vers `home_location`, abandonne plats |
| **FireInKitchen** | Tag `Hazard.Fire.Kitchen` | Court-circuit — éteint, sauve aliments précieux |
| **EraSouffleBroadcast** | Nouveau Souffle | Nouvelles recettes débloquées (Eldoria : plats dorés ; Verdoiement : abondance) |

---

## 5. Modes superposables

| Mode | Activation | Spécificité cuisinier |
|------|-----------|------------------------|
| **Routine** | Préparation/service | Cycle T1-T5 |
| **Marchand** | Service midi/soir | Plats à la carte, prix selon palier |
| **Dialogue** | Entre services | Très chaleureux, raconte rumeurs, propage village forte |
| **Festivité** ★ | **Quasi-permanent** chez E | Anime salle, propose tournée, danse improvisée (ESFP) |
| **Crise** | Attaque, incendie | **Fuite immédiate** (sauf incendie cuisine = défense limitée) |
| **Religieux** | Sabbat religion | Ferme cuisine ; Foedus Animae : plats rituels possibles |
| **Deuil** | Mort proche | Cuisine fermée 3-7j (×1.5 si F), reprise avec plats simples ; ENFJ symbolique fort |
| **Quête** | Festin commandé, plat signature | Projet 4-12h, ingrédients rares à trouver |

---

## 6. Réactions situationnelles canoniques

### 6.1 Client entre (Mode Marchand)

- **Trigger** : `CustomerEnters`
- **Comportement** :
  - **ESFJ** : "Bienvenue ! Asseyez-vous, je vous prépare quelque chose de spécial !" — chaleureux fidélisant
  - **ESFP** : "Eh, l'aventurier ! On dit que vous avez tué un loup hier ? Venez, j'ai un steak ! Je flambe pour vous !" — théâtral
  - **ENFJ** : "Vous avez l'air fatigué… Je vais vous faire une soupe qui réchauffe l'âme." — empathique
- **Prix** : standard, ESFJ/ENFJ flexibles si client en détresse (`-20%` Mood F)

### 6.2 Coup de feu (Trigger CoupDeFeu)

- **Anim** : `débordé` rapide, cadence ×2
- **MBTI E** : continue à dialoguer (ESFP) ; ESFJ raccourcit phrases ; ENFJ priorise clients selon état émotionnel perçu
- **Mood** : `Fatigue +0.1/s`, mais `Joy +5` (énergie sociale)

### 6.3 Festin de guilde (Trigger GuildFeast — Mode Festivité fort)

- **Comportement** : projet 4-12h, équipe étendue, multiples plats coordonnés
- **Buffs sociaux** : festin Magistral+ donne **buff multi-joueurs** (cf. archétype joueur §6)
- **MBTI ENFJ** : planifie menu symbolique selon thème (intronisation, mariage, victoire)

### 6.4 Attaque (Mode Crise) — bascule fuite rapide

- **Trigger** : `RaidOnVillage` ou `PlayerArmDrawnNearby`
- **Branche BT** : **Fuite prioritaire** (P2 Peur saturé chez F vite)
- **Comportement** :
  - Abandonne plats en cours
  - Cri d'alerte (ESFJ/ESFP voix forte)
  - Fuit vers `home_location` ou cave de l'auberge
  - Couteau de chef en main = arme T1 dérisoire (utilisable seulement en désespoir contre 1 adversaire)
- **MBTI F** : Peur saturée vite ; ENFJ peut héroïquement aider blessés avant de fuir

### 6.5 Incendie cuisine (Trigger FireInKitchen)

- **Comportement spécial** : ne fuit pas immédiatement — sauve aliments précieux, étouffe feu avec serpillière
- Si incendie hors contrôle : fuit en alertant taverne entière

### 6.6 Souffle / changement d'Ère

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | Abondance ingrédients, +20% qualité, mood +15 |
| **Eldoria (Feu Endormi)** | Plats dorés, magnitude buffs ×2 jour |
| **Vents** (Aerion) | Recettes voyageurs, cuisine itinérante |
| **Brume Mortelle** (Umbra) | Demande pains/plats rituels, ambiance peur ; ENFJ symbolique fort |
| **Sommeil de Glace** (Aquor) | Plats chauds réchauffants, soupes longues |

ENFJ N : "Cette Ère demande des saveurs nouvelles" ; ESFJ S : "Mon plat reste mon plat."

### 6.7 Témoin de drame social

- **Trigger** : Client triste, dispute, deuil détecté
- **MBTI ENFJ** ★ : intervient empathiquement ("Asseyez-vous, je vous fais quelque chose"), peut donner repas gratuit
- **MBTI ESFJ** : proche mais moins direct ; ESFP plaisante pour distraire

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (cuisinier d'auberge transmis) ou Nommé authored (cuisinier de cour, festins guilde signature)
- **Apprenti** : 1-3 (commis, marmitons), sous-PNJ ESFJ/ESFP/ISFJ
- **Mort famille** : 7 jours → successeur, taverne reprend service ; reroll MBTI E-F dominant
- **Mort nommée** : permanente, side quest "Le festin inachevé", taverne fermée temporairement

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Galenor** (impérial) | Cuisine raffinée de cour | ESFJ | Festins impériaux |
| **Cendara** (volcanique) | Cuisine épicée volcanique | ESFP | Plats au feu sacré Ignis |
| **Alkaran** (Nord) | Plats nordiques denses, soupes longues | ESFJ | Ragoûts, conservation |
| **Onara** | Cuisine rituelle Foedus Animae | ENFJ | Festins symboliques sacrés |
| **Endora** | Cuisine subtile aux herbes | ESFJ | Plats fins, herboristerie culinaire |
| **Cestra** | Cuisine de la mer | ESFP | Poissons grillés, salines |

### Signatures PNJ (Phase 4 stub)

- **Maître Olwyn de Galenor** (ESFJ) — chef impérial, festins de la cour
- **Vinci le Flamboyant de Cendara** (ESFP) — cuisinier-spectacle, plats au feu
- **Padre Sera d'Onara** (ENFJ) — festins rituels Foedus Animae, plat-prière
- **Mère Ferven d'Alkaran** (ESFJ) — auberge nordique, soupes longues réputées

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Cuisinier]] (archétype joueur) · [[Boulanger]] · [[Boucher]] · [[Métiers|Tavernier]] · [[Métiers|Aubergiste]]*
