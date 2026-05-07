---
tags: [pnj, comportement, métier, artisanat, tanneur, ia, template]
type: behavior-template
métier_lié: "[[Tanneur]]"
mbti_typique: [ISTP, ISTJ]
karma_typique: [neutre, gris-clair]
factions_compatibles: [Galenor, Alkaran, Cendara, Mosrack, Catena Fracta]
catégorie_métier: Artisanat et Production
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-solitaire, fournisseur-Boucher-Chasseur, isolement-géographique-tannerie]
---

# 🥩 Template PNJ — Tanneur

> Comportement situationnel d'un PNJ Tanneur. Métier **solitaire-méthodique** — souvent installé en marge des villes (odeurs fortes des cuves). Forte chaîne fournisseur avec [[Boucher]] (peaux brutes). Métier joueur : [[Tanneur]].

---

## 1. Vue d'ensemble

Le Tanneur transforme les peaux brutes (livrées par [[Boucher]] ou [[Métiers|Chasseur]]) en cuir tanné. Travaille près d'une source d'eau, isolé du centre village (odeur). Cuves de tannage, étendoirs, atelier robuste. Cycle long (jours réels par lot de cuves) — moins de rotation rapide, plus de patience.

- **Identité comportementale** : solitaire-pragmatique, peu loquace, robustesse physique, tolérance aux odeurs
- **Lien chaîne** : amont [[Boucher]] (peaux), [[Métiers|Chasseur]] / [[Métiers|Dépéceur]] (peaux sauvages), [[Métiers|Bûcheron]] (sève, écorce — tannins) · aval [[Cordonnier]] (cuir bottes), [[Forgeron]] (sangles), [[Tailleur]] (lacets), [[Métiers|Maroquinier]], [[Métiers|Sellier]], [[Métiers|Relieur]]

---

## 2. Cycle quotidien

```
06:00  Lever
07:00  Atelier (T1) — écharner, étirer peau brute
09:00  Mise en cuve tannage (T2) — long cycle (1-7 jours selon type)
11:00  Atelier — préparation autre lot (T3)
12:00  Pause déjeuner solo
13:00  Reprise écharnage / battage / lissage (T4)
17:00  Mode Marchand-Service (livraisons à Cordonnier/Forgeron)
19:00  Fermeture, sécurisation cuves
19:30  Repas + foyer solitaire
22:00  Coucher
```

### Boucle tannage (cycle long)

```
[Réception peau brute] → [Écharnage] → [Mise en cuve tannage 1-7j] →
[Étirage / Battage] → [Lissage] → [Étendoir séchage] → [Cuir tanné final]
```

---

## 3. MBTI typique

| Type | Profil tanneur | Note |
|------|----------------|------|
| **ISTP** | Tanneur solitaire de bout de village, virtuose technique, peu loquace | Le défaut canonique |
| **ISTJ** | Tanneur méthodique, recettes traditionnelles, comptabilité stricte | Galenor manufacture |

Modulateurs :
- **I** + **S** + **T** (commun) : **profil très solitaire-méthodique** (cohérent avec brief)
- **P** (ISTP) vs **J** (ISTJ) : ISTP improvise selon arrivages peaux ; ISTJ planifie cycles cuves
- Tolérance odeurs : **acquise**, peu de réaction négative à l'environnement
- **Position géographique** : souvent en marge village → réseau social restreint, graphe §5 = peu de `friends`

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **HideDelivery** | Boucher/Chasseur livre peaux | Pause T1, inspecte qualité, signe livraison |
| **VatReady** | Cycle tannage cuve terminé | Anim `extraire_cuir_cuve`, suite traitement |
| **CustomerPickup** | Cordonnier/Forgeron vient chercher cuir | Mode Marchand-Service bref |
| **PlayerArmDrawnNearby** | Player arme < 30m | ThreatLevel +30 ; Tanneur isolé = vulnérable |
| **AllyAttackedNearby** | Allié <10m | Court-circuit P1 → fuite (couteau de tanneur T1, peu efficace) |
| **VatContaminated** | Cuve souillée (créature morte tombée, poison) | Court-circuit — perte lot, Colère +30 |
| **RaidOnVillage** | Catastrophe | Mode Crise — fuite (tannerie souvent en bordure, plus exposée) |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul prix tannins +/-10% |

---

## 5. Modes superposables

| Mode | Activation | Spécificité |
|------|-----------|-------------|
| **Routine** | Atelier + cuves | Cycle T1-T4 long |
| **Marchand-Service** | Pickup collègue | Bref, technique |
| **Dialogue** | Avec Boucher (fournisseur principal) | Technique, peaux, prix ; lien social rare hors collègues |
| **Crise** | Attaque (vulnérable) | Fuite prioritaire |
| **Festivité** | Festival | Peu d'effet (atelier en marge, peu de visiteurs) |
| **Religieux** | Sabbat religion | Ferme atelier ; peu de lien religieux fort |
| **Deuil** | Mort proche | Atelier fermé 1-3j, qualité maintenue |
| **Quête** | Cuir signature (créature rare) | Projet long, ingrédient spécifique |

---

## 6. Réactions situationnelles canoniques

### 6.1 Livraison peaux Boucher (chaîne fournisseur)

- **Trigger** : `HideDelivery`
- **Comportement** :
  - Inspection peau brute (qualité, taille, espèce)
  - **ISTP** : geste rapide, "Ouais, pas mal. 15 Éclats le lot." — laconique
  - **ISTJ** : pèse, calcule, "Lot de 8 peaux cervidé, qualité B. 120 Éclats."
- **Lien social** : graphe §5 = `friends/colleagues` avec Boucher local (livraison quasi-quotidienne)

### 6.2 Pickup Cordonnier (Mode Marchand-Service)

- **Trigger** : `CustomerPickup`
- **Comportement** :
  - **ISTP** : pose battoir, va au stock, livre rouleau
  - **ISTJ** : feuilles comptables, "Cuir tanné 4mm, 3 mètres, livraison du 12. 45 Éclats."

### 6.3 Cuve contaminée (Trigger VatContaminated)

- **Comportement** : Colère +30, vide cuve, recommence (perte 3-7 jours travail)
- **MBTI ISTJ** : analyse cause, peut accuser saboteur si pattern récurrent
- **MBTI ISTP** : fataliste, recommence sans cri

### 6.4 Attaque (Mode Crise) — vulnérabilité

- **Spécifique** : tannerie en marge → moins de Garde proche, plus exposé
- **Comportement** : fuite vers village ou cache, abandonne cuves
- **MBTI ISTP** : peut tenir à distance avec couteau, virtuose technique mais arme T1
- **MBTI ISTJ** : analyse trajet fuite, sauve registres comptables

### 6.5 Souffle / changement d'Ère

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | Tannins végétaux abondants, +20% qualité |
| **Sommeil de Glace** | Cuirs épais demandés, +30% prix |
| **Eldoria** | Cuirs dorés (teintures rares), nobles demandent |
| **Brume Mortelle** | Carcasses étranges (créatures hybrides), méfiance Tanneur |

ISTJ/ISTP S/T : peu de spéculation, "le cuir est cuir, on tanne pareil."

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (atelier transmis, souvent isolé)
- **Apprenti** : 0-1 (volume bas, métier peu prisé socialement)
- **Mort famille** : 14 jours → successeur, atelier transmis ; reroll MBTI ISTP/ISTJ
- **Mort nommée** : rare (peu de Tanneurs nommés), side quest "Les cuves silencieuses"

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Galenor** | Manufacture volume, cuirs militaires | ISTJ | Volume armée |
| **Alkaran** (Nord) | Cuirs épais, fourrures | ISTP | Conservation hiver |
| **Cendara** (volcanique) | Cuirs résistants chaleur, teintures rouges | ISTP | Spécialité Ignis |
| **Mosrack** | Cuirs forge (sangles, garniture armures) | ISTJ | Frontière Forgeron |
| **Catena Fracta** | Cuirs braconnage, marchés noirs | ISTP | Hors-la-loi sympathique |

### Signatures PNJ (Phase 4 stub)

- **Vesna d'Alkaran** (ISTP Maître) — cuirs nordiques épais
- **Brorvic de Mosrack** (ISTJ Maître) — sangles forge fournisseur
- **Cendric le Rouge de Cendara** (ISTP Maître) — cuirs volcaniques teints

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[Tanneur]] (archétype joueur) · [[Boucher]] · [[Cordonnier]] · [[Forgeron]] · [[Tailleur]]*
