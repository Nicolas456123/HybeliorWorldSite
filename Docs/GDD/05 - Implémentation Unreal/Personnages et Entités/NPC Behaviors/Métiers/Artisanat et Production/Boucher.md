---
tags: [pnj, comportement, métier, artisanat, boucher, ia, template]
type: behavior-template
métier_lié: "[[Boucher]]"
mbti_typique: [ISTP, ESTP, ESTJ]
karma_typique: [neutre, gris-clair]
factions_compatibles: [Catena Fracta, Galenor impérial, Alkaran clans, Cendara épicé]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-bascule-combat, sang-sensibilité-clients-F, fournisseur-Tanneur]
---

# 🥩 Template PNJ — Boucher

> Comportement situationnel d'un PNJ Boucher. **Seul métier Artisanat avec accès direct ressource créature** (cuir/sang/os). Manie déjà couteaux/fendoirs → **bascule rapide combat** en cas d'attaque. Chaîne fournisseur étroite avec [[Tanneur]] et [[Cuisinier]]. Métier joueur : [[Boucher]].

---

## 1. Vue d'ensemble

Le Boucher découpe les carcasses livrées par [[Métiers|Chasseur]] et [[Métiers|Berger]], redistribue viande/os/graisse/sang/cuir aux métiers concernés. Étal de marché en façade, atelier de découpe en arrière. Forte odeur, environnement physique brutal mais ordonné.

- **Identité comportementale** : pragmatique-physique, parle peu pendant la découpe, vend efficacement
- **Lien chaîne** : amont [[Métiers|Chasseur]] / [[Métiers|Berger]] / [[Métiers|Dépéceur]] · aval [[Cuisinier]] (viande), [[Tanneur]] (peau), [[Apothicaire]] (sang/organes), [[Boulanger]] (saindoux)
- **Position sociale** : robuste, populaire, cri vendeur sur le marché ; **bascule rapide combat**

---

## 2. Cycle quotidien

```
05:00  Lever, réception carcasses (livraison Chasseur/Berger)
06:00  Atelier découpe (T1) — fendoir, hachoir, scie à os
09:00  Sortie étal sur le marché (T2)
09:00–14:00  Mode Marchand (vente viandes prêtes)
14:00  Pause déjeuner
15:00  Reprise — charcuterie/salaison (T3)
18:00  Livraisons (Cuisinier, Tanneur, Apothicaire) (T4)
19:00  Repas + taverne (ESTP/ESTJ social)
21:00  Coucher
```

---

## 3. MBTI typique

| Type | Profil boucher | Note |
|------|----------------|------|
| **ISTP** | Boucher solitaire, virtuose du couteau, peu loquace, calme et précis | Le défaut canonique |
| **ESTP** | Boucher de marché, cri vendeur, plaisanteries grasses, taverne après le travail | Cités populaires |
| **ESTJ** | Boucher-chef, organise approvisionnement, plusieurs apprentis, échelle commerce | Galenor impérial, grosses villes |

Modulateurs :
- **S** (commun) : focus pratique, peu de spéculation cosmique
- **T** (commun) : calcul rationnel des prix, rarement de marge sentimentale
- **P** (ISTP/ESTP) vs **J** (ESTJ) : ISTP/ESTP improvisent selon arrivages ; ESTJ planifie commande hebdomadaire stricte
- **I/E** : ISTP silencieux à l'étal ; ESTP/ESTJ vocaux ("Belle viande de cerf, fraîchement débitée !")

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **CarcassDelivery** | Livraison Chasseur/Berger arrive | Pause T2 si Marchand, va peser/inspecter |
| **CustomerApproach** | Joueur < 5m + heures marché | Bascule Mode Marchand, cri vendeur (ESTP/ESTJ) |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30 ; **saisit fendoir** (déjà en main) → Combat.Defense possible |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → `Combat.Engage` (a déjà arme en main) |
| **TheftAttempt** | Player vole viande | Cri + intervention directe (ESTP charge fendoir, ISTP intercepte) |
| **RaidOnVillage** | Catastrophe imminente | Bascule Mode Crise — **combattant intermédiaire** (cf. §6.2) |
| **BloodSpilled** | Tag `World.Trace.Blood` proche | Inhabituel pour Boucher (a l'habitude) — désensibilisé, peu d'effet Peur |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul prix viande +/-10% |

---

## 5. Modes superposables

| Mode | Activation | Spécificité boucher |
|------|-----------|----------------------|
| **Routine** | Découpe + livraisons | Cycle T1-T4 |
| **Marchand** | Heures marché 09:00-14:00 | Cri vendeur (ESTP/ESTJ), silencieux (ISTP) ; prix négociables selon S |
| **Dialogue** | Avec collègues Tanneur/Cuisinier | Technique anatomie, plaisanteries crues |
| **Crise** ★ | Attaque, raid | **Combat intermédiaire** — fendoir T2 efficace, fait peur aux assaillants |
| **Festivité** | Festival | Pic demande, rôtit en plein air, ambiance forte |
| **Religieux** | Sabbat religion | Ferme pendant créneau ; peu de liens religieux profonds (S, T) |
| **Deuil** | Mort proche | Routine maintenue (T résistant), boutique fermée 1 jour si famille directe |
| **Quête** | Donneur (carcasse rare, créature spécifique) | Demande gibier rare, paiement en avance |

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur arrive (Mode Marchand)

- **Trigger** : `CustomerApproach`
- **Comportement** :
  - **ISTP** : pose fendoir, regard direct, "Quelle pièce ?" — laconique
  - **ESTP** : "Eh, mon ami ! Regardez ce filet, frais ce matin ! 30 Éclats pour vous !" — vocal, marchand de rue
  - **ESTJ** : "Liste des pièces : filet 30, gigot 50, ribs 25. Quantité ?"
- **Prix** : standard, négociable selon Mood et Reconnaissance

### 6.2 Attaque village / agression (Mode Crise) ★

- **Trigger** : `RaidOnVillage` ou `AllyAttackedNearby`
- **Branche BT** : `BT_NPCCombat.Defense` — **combattant intermédiaire**
- **Comportement** :
  - Fendoir T2 = arme contondante/tranchante ad hoc
  - **ISTP** : `Combat.Engage` calculé, frappes précises (virtuose)
  - **ESTP** : `Combat.Engage` brutal, cri de guerre
  - **ESTJ** : ordonne aux apprentis de fuir, défend l'étal
- **Mood** : `Colere +30`, `Peur +10` (résistant grâce à T)
- **Différence vs Forgeron** : Boucher manie déjà l'outil (couteau/fendoir), pas de phase "saisir arme"

### 6.3 Vol de viande

- **Trigger** : `TheftAttempt`
- **Comportement** :
  - Cri immédiat ("Au voleur !"), poursuite courte avec fendoir
  - ISTP : intercepte silencieusement à la sortie, désarme
  - ESTP : course-poursuite, cri public, alerte le marché
- **Réputation** : -40 individuelle, propagation village

### 6.4 Sang détecté à proximité

- **Trigger** : `BloodSpilled` < 5m
- **Spécifique Boucher** : **désensibilisé**, peu d'effet Peur (`+5` au lieu de `+15` standard)
- ESTP : peut commenter avec humour noir ("Quelqu'un a cherché à imiter mon métier ?")

### 6.5 Souffle / changement d'Ère

- **Verdoiement** (Terranu) : abondance bétail, prix -20%, plus de qualité
- **Sommeil de Glace** (Climata) : viande conservée naturellement, focus salaisons longues
- **Ombre Longue** (Noctis) : peu d'effet sauf rumeurs créatures bizarres
- **Échos Brisés** (Tempora) : carcasses étranges (créatures hybrides), méfiance Boucher

MBTI S/T : peu de spéculation, "le bétail meurt et se découpe pareil sous toutes les Ères."

### 6.6 Livraison à Tanneur (chaîne fournisseur)

- **Trigger** : T4 livraisons quotidiennes
- **Comportement** : transporte peaux dans charrette vers atelier Tanneur ; échange technique bref
- **Lien social** : graphe §5 typique = `friends` avec Tanneur local (collègues quotidiens)

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (transmission père/mère → fils/fille)
- **Apprenti** : 1-3 selon palier, sous-PNJ ISTP/ESTP qui charrie carcasses
- **Mort famille** : 7 jours → successeur (apprenti) ; reroll MBTI ISTP/ESTP/ESTJ
- **Mort nommée** : permanente, ferme l'étal, pénurie viande temporaire

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Galenor** | Boucher de garnison, viande rouge en masse | ESTJ | Approvisionnement militaire |
| **Alkaran** | Boucher-chasseur, gibier nordique, fumage | ISTP | Renne, ours, conservation longue |
| **Cendara** | Boucher épicé, charcuterie volcanique | ESTP | Saucissons épicés feu |
| **Cestra** | Boucher de poissonnerie (frontière Pêcheur) | ISTP | Mêle viande + poisson |
| **Catena Fracta** | Boucher-clandestin, gibier de braconnage | ESTP | Marché noir |

### Signatures PNJ (Phase 4 stub)

- **Maître Borvic de Galenor** (ESTJ) — fournisseur officiel garnisons
- **Vald le Sanglant d'Alkaran** (ISTP) — chasseur-boucher du Nord
- **Casca de Cendara** (ESTP) — saucissons volcaniques
- **Mira la Tranchante** (ISTP) — boucherie de quartier, virtuose

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Boucher]] (archétype joueur) · [[Tanneur]] · [[Cuisinier]] · [[Métiers|Chasseur]] · [[Métiers|Berger]]*
