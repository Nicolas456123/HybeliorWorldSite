---
tags: [item, archétype, consommable, parchemin, scriptorium, magie]
type: archetype
category: Consommable
subcategory: Parchemin
source: Fabriqué
mastery: Scriptorium
craft_category: Scriptorium et enchantement
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-coût-mana-non-liés, conservation-scellé, frontière-tome-livre-récipient]
---

# 📜 Archétype — Parchemin

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. Sort encapsulé **single-use**, accessible aux **non-Liés** au prix d'un coût Mana doublé. Pendant consommable du [[Tome]] (focus durable) — voir aussi [[Livre Récipient]] (parchemins reliés multi-pages).

---

## 1. Vue d'ensemble

Un **parchemin** est un support écrit (papier, peau, vellum) sur lequel un [[Métiers|Scribe]] ou [[Métiers|Enchanteur]] a inscrit un **sort encapsulé** (voir [[Crafts]] §Scriptorium). Le parchemin est lu par le porteur — la lecture **consume** le parchemin et déclenche le sort une seule fois.

**Ancrage gameplay :**
- **Accessible aux non-Liés** : un personnage sans Voie active peut utiliser un parchemin (×2 coût Mana, voir [[Tome]] §10) — démocratisation tactique de la magie
- **Single-use** : se consume à la lecture (différent du [[Tome]] qui est durable)
- **Tier ≤ tier sort encapsulé** : un parchemin T3 contient un sort de tier ≤ 3
- **Magnitude du sort = 80% du sort lancé via Tome équivalent** (compensation : le coût Mana est plus élevé)

**Ancrage culturel :** marché de masse des [[Lore/Religions/Ordo Caelum|Stellari]], des bibliothécaires de Galenor, des marchés de Vytharia. Les parchemins sont produits en série par les scriptoriums urbains et vendus à prix abordable. Les parchemins rituels (T4-T5) sont au contraire des objets rares.

---

## 2. Variations / sous-types

> **5 sous-types canoniques**, déterminés par le **type de sort encapsulé**.

| Sous-type | Sort encapsulé | Notes |
|-----------|----------------|-------|
| **Parchemin offensif** | Sort dégât (projectile, zone) | Magie élémentaire — calibrage [[Combat]] |
| **Parchemin de soin** | Sort de soin direct | Concurrence directe [[Potion]] de Soin — magnitude inférieure |
| **Parchemin de buff** | Sort de buff (stat ou résistance) | Magnitude proche [[Boisson]] T-1 |
| **Parchemin de déplacement** | Téléportation, vol courte durée, sprint | Effet utilitaire majeur |
| **Parchemin rituel** | Effet narratif (invocation, communion, bannissement) | T4-T5, rituel long, conditions cachées |

> **Frontière avec [[Tome]]** : un parchemin contient **1 sort, 1 charge, jeté après usage**. Un Tome contient **plusieurs sorts, plusieurs charges, durable**. Voir [[Tome]] §1 tableau frontière.

> **Frontière avec [[Livre Récipient]]** : un Livre Récipient = plusieurs parchemins reliés (multi-page single-use, page-par-page). Voir [[Livre Récipient]].

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Tome]] / [[Combat]]** : magnitude parchemin = **80% du sort lancé via Tome de même tier**, mais **coût Mana ×1 pour Lié, ×2 pour non-Lié**.

### 3.1 Parchemin offensif (sort dégât)

| Tier | Nom typique | Dégâts (Lié) | Dégâts (non-Lié, ×2 mana) | Mana coût Lié | Mana coût non-Lié | Action |
|------|-------------|--------------|---------------------------|---------------|--------------------|--------|
| 1 — Commun | Étincelle scellée | 40 dgt | 40 dgt | 30 Mana | 60 Mana | 2s |
| 2 — Façonné | Trait de feu | 100 dgt | 100 dgt | 60 Mana | 120 Mana | 2s |
| 3 — Œuvré | Rafale tonnerre | 200 dgt | 200 dgt | 110 Mana | 220 Mana | 2.5s |
| 4 — Magistral | Lance de glace | 350 dgt + slow 3s | 350 dgt | 200 Mana | 400 Mana | 3s |
| 5 — Légendaire | Tempête contenue | 600 dgt zone | 600 dgt zone | 350 Mana | 700 Mana | 3s |

### 3.2 Parchemin de soin

| Tier | HP rendus | Mana coût Lié | Mana coût non-Lié |
|------|-----------|---------------|--------------------|
| 1 | +40 HP | 30 | 60 |
| 2 | +100 HP | 60 | 120 |
| 3 | +180 HP | 110 | 220 |
| 4 | +320 HP | 200 | 400 |
| 5 | +560 HP | 350 | 700 |

> **Comparaison [[Potion]] de Soin** : potion T3 = +220 HP sans coût Mana. Parchemin T3 = +180 HP mais coûte 110 Mana. Le parchemin est **moins efficace en HP brut**, mais permet d'utiliser un pool ressource différent (Mana au lieu de stocks de potions).

### 3.3 Parchemin de buff

| Tier | Buff stat | Durée |
|------|-----------|-------|
| 1 | +4 stat | 60s |
| 2 | +8 stat | 120s |
| 3 | +14 stat | 180s |
| 4 | +24 stat | 240s |
| 5 | +40 stat | 360s |

### 3.4 Parchemin de déplacement

| Tier | Effet | Mana coût Lié |
|------|-------|---------------|
| 1 | Saut allongé (+50% portée), 1 charge | 30 |
| 2 | Sprint silencieux 5s | 60 |
| 3 | Téléport courte 10m | 110 |
| 4 | Téléport moyenne 30m + invisibilité 3s | 200 |
| 5 | Téléport longue 100m + reset cooldowns combat | 350 |

### 3.5 Parchemin rituel

| Tier | Effet rituel | Conditions |
|------|--------------|------------|
| 4 | Invocation mineure (compagnon temporaire 2 min) | Reconnaissance ≥ Initié religion |
| 5 | Communion / bannissement / pacte mineur | Reconnaissance ≥ Adepte + ère compatible |

---

## 4. Mécanique d'usage

### 4.1 Action lecture

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action lecture** | 2s (T1-T2), 2.5s (T3), 3s (T4-T5) | Plus rapide que [[Pain]] (3-5s), comparable à [[Boisson]] |
| **Possible en mouvement** | Marche oui, sprint non, saut non | |
| **Possible en combat** | **Oui**, mais interruption sur dégâts subis (parchemin perdu) | Différencie du Tome qui résiste mieux |
| **Possible en parade tenue** | Non | |
| **Coût Mana payé** | À la fin de la lecture, **avant** déclenchement du sort | Si Mana insuffisant : parchemin non consommé, action annulée |

### 4.2 Coût Mana — Lié vs non-Lié

> **Règle canonique [[Tome]] §10** : un non-Lié peut lire un parchemin avec **coût Mana doublé**. Cela suppose que le non-Lié a un **pool Mana de base** (par défaut, oui — voir [[Personnage]] §Mana).

| Lecteur | Coût Mana | Magnitude effet |
|---------|-----------|-----------------|
| **Lié + Voie compatible** | ×1 (base) | 100% magnitude |
| **Lié + Voie incompatible** | ×1.5 | 100% magnitude (mais malus secondaire possible) |
| **Non-Lié** | ×2 | 100% magnitude |
| **Non-Lié + Mana insuffisant** | — | Action impossible |

### 4.3 Cooldown

| Mécanique | Valeur |
|-----------|--------|
| **Cooldown global parchemin** | Aucun (limité par stocks de parchemins et Mana) |
| **Cooldown par type de sort** | 5s entre 2 lectures du même type (offensif, soin, etc.) |
| **Cumul** | Pas de cumul de buffs venant de parchemins identiques (refresh) ; types différents cumulent |

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Encre noire de Vytharia** | Lecture silencieuse (pas de FX visible aux ennemis) |
| 2 | **Calligraphie soignée** | −20% Mana coût |
| 3 | **Vellum sacré** ([[Lore/Religions/Ordo Caelum]]) | Magnitude effet +15% si lu de jour |
| 4 | **Scellé de Voie** | ×2 magnitude si la Voie active correspond, sinon refuse de s'activer |
| 5 | **Inscription tremblante** ([[Les Ères\|Échos Brisés]]) | 30% chance double effet, 30% chance effet retardé 5s |
| 6 | **Parchemin de cendre** | Brûle au sol après usage = zone de feu 1m × 5s |
| 7 | **Pages collées** | 50% chance lecture instantanée (action 0.5s), 50% chance échec (parchemin gaspillé) |
| 8 | **Sigillum royal** | Reconnu par les autorités = +1 Reconnaissance dans la zone d'origine |
| 9 | **Encre de Voie** | Si Voie correspondante au max, magnitude effet +30% |
| 10 | **Parchemin du Souffle** ([[L'Accord]]) | Résiste à la rouille post-Souffle (l'encre ne s'efface pas) |

> **Affixes négatifs** : *Effacé* (50% chance échec), *Humide* (Mana coût ×1.5), *Déchiré* (action lecture +1s).

---

## 6. Recettes (Scriptorium — 1 par tier)

> Stations : **Pupitre de scribe + Cercle d'enchantement** ([[Crafts]] §Scriptorium). Métier : [[Métiers|Scribe]] (T1-T3), [[Métiers|Enchanteur]] (T4-T5). Mini-jeu canonique : **précision tracé + séquence rituelle**.

### 6.1 T1 — Étincelle scellée

| Aspect | Valeur |
|--------|--------|
| **Métier** | Scribe |
| **Palier** | Novice |
| **Station** | Pupitre de scribe |
| **Intrants** | Parchemin × 1 (papier vierge), Encre × 1, Pigment × 1 |
| **Sortie** | 3× Étincelle scellée |
| **Durée** | 60s |
| **Mini-jeu** | Tracé simple (1 jauge précision) |

### 6.2 T2 — Trait de feu

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Pupitre + Cercle d'enchantement (basique) |
| **Intrants** | Parchemin × 1, Encre × 2, Pigment × 1, Cristal mineur × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Tracé 2 jauges + séquence d'incantation 3 étapes |

### 6.3 T3 — Rafale tonnerre

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Pupitre + Cercle d'enchantement |
| **Intrants** | Parchemin de qualité × 1, Encre rituelle × 2, Pigment × 2, Essence spirituelle × 1, Cristal × 1 |
| **Durée** | 3 min |
| **Mini-jeu** | Tracé 3 jauges + séquence rituelle 5 étapes |

### 6.4 T4 — Lance de glace

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Pupitre + Cercle d'enchantement (rituel) |
| **Intrants** | Vellum sacré × 1, Encre noire × 3, Pigment rare × 2, Essence × 2, Cristal de Voie × 1 |
| **Durée** | 6 min |
| **Mini-jeu** | Tracé 4 jauges + séquence rituelle + canalisation Voie palier Initié |

### 6.5 T5 — Tempête contenue

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Pupitre + Cercle d'enchantement + composante d'ère |
| **Intrants** | Vellum d'or × 1, Encre cosmique × 3, Pigment d'ère × 3, Essence × 3, Cristal de Voie taillé × 1, Larme × 1 |
| **Durée** | 15 min |
| **Mini-jeu** | Tracé 6 jauges + séquence rituelle Maître + canalisation Voie palier Adepte |

> **Pattern recette canonique** : tier N = N intrants principaux (encre/pigment/essence) + (N-1) secondaires + 1 support (parchemin/vellum) ≥ T-1. **Pas de T6** : un sort T6 nécessite un support durable (Tome), pas un parchemin jetable.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet sur le parchemin |
|---------|-----|------------------------|
| **Shadow** ([[Cosmologie\|Noctis]]) | Ombre Longue | Lecture silencieuse, Mana coût −10% de nuit |
| **Spectral** ([[Cosmologie\|Tempora]]) | Échos Brisés | Effet anticipé 3s avant fin lecture |
| **Frost** ([[Cosmologie\|Aquor]]) | Sommeil de Glace | Conservation × 5, ajoute slow 2s à l'effet |
| **Verdoyant** ([[Cosmologie\|Spiritus]]) | Verdoiement | Si effet utilitaire, durée doublée |
| **Brulé** (Voie de Feu) | Feu Endormi | Convertit 20% effet en dégât feu zone |
| **Pourpre** ([[Cosmologie\|Umbra]]) | Brume Mortelle | Mana coût halved en zone de brume |
| **Doré** ([[Cosmologie\|Eldoria]]) | Rêve Lumineux | Magnitude +20% de jour |
| **Brisé** ([[Cosmologie\|Tempora]]) | Échos Brisés | 50% double effet / 50% annulé |
| **Onirique** ([[Cosmologie\|Somnix]]) | Sommeil Onirique | Lisible pendant le sommeil (rêve actif) |
| **Vénérable** ([[Cosmologie\|Fatum]]) | Présages | Auto-détecte la cible optimale (homing) |

---

## 8. Exemples de signatures

> Phase 4 stub. Signatures inventées (pas de CSV pour ce type).

- **Parchemin du Veilleur** (T4, Astravia, [[Lore/Religions/Ordo Caelum]])
  *Vellum stellaire, encre brillant doucement la nuit. Effet : sort de scrutation (révèle ennemis dans 30m pendant 20s). Bonus narratif : reconnu des Stellari.*

- **Sceau de la Caverne d'Ulinor** (T3, identité [[Lore/Religions/Vael Kurash]])
  *Parchemin gravé d'écorce sacrée. Effet : invoque un esprit-loup compagnon 60s. Bonus narratif : les chamanes accèdent.*

- **Lettre Brûlée de Cendara** (T5, [[Lore/Religions/Ignis Aeternum]])
  *Parchemin enflammé qui ne se consume pas. Effet : tempête de feu 5m × 5s. Bonus narratif : preuve d'allégeance Ignitari.*

- **Glyphe Silencieux de Baelor** (T3, [[Lore/Religions/00 - Système Religieux|Taciti]])
  *Encre invisible révélée sous le doigt. Effet : silence de zone 5m × 10s. Bonus narratif : monnaie d'échange entre espions.*

- **Parchemin de Fugue** (T4, Galenor)
  *Vendu sous le manteau dans les ports. Effet : téléport 30m + invisibilité 3s. Bonus narratif : marqueur de fugitif.*

---

## 9. Conservation, stockage, dégradation

| Tier | Conservation par défaut | Conditions optimales | Dégradation |
|------|--------------------------|----------------------|-------------|
| 1 | Illimitée si scellé | Tube de transport sec | Humidité = encre coule, parchemin gaspillé |
| 2 | Illimitée si scellé | Tube + cire | Idem |
| 3 | Illimitée si scellé | Tube rituel | Idem |
| 4 | Illimitée si scellé | Tube rituel + cristal | Post-[[Le Souffle\|Souffle]] : 30% chance d'effacement progressif |
| 5 | Illimitée si scellé | Coffre rituel | Post-Souffle : 50% chance d'effacement (cf. [[L'Accord]]) |

> **Pattern unique** : le parchemin scellé ne se dégrade pas naturellement (l'encre est fixée). Mais l'eau, le feu, et le **Souffle** détruisent l'encre. Le parchemin est donc **fragile à l'environnement**, mais **stable dans le temps**.

### Conditions spéciales

- **Post-[[Le Souffle|Souffle]]** : parchemins T4-T5 subissent une dégradation forcée — vérifier état régulièrement
- **Pendant l'[[Les Ères|Ère du Sommeil de Glace]]** : encre durcie, +20% conservation forcée (effet bonus)
- **Bibliothèques d'Astravia** : coffres gratuits pour conservation longue (service guilde Stellari)

---

## 10. Décisions ouvertes

- [ ] **Coût Mana ×2 non-Lié** : ratio à playtester — trop cher en early game, juste en mid-late ?
- [ ] **Pas de T6 parchemin** : confirmé ? Décision préliminaire = oui (un sort T6 mérite un Tome durable, pas un consommable jetable)
- [ ] **Parchemin de soin vs Potion** : la potion reste meilleure ratio HP/coût ; le parchemin offre alternative pool Mana — équilibrage à valider
- [ ] **Parchemin rituel** : invocation/bannissement single-use vs Tome rituel multi-use — frontière nette ?
- [ ] **Conservation post-Souffle** : 30-50% chance d'effacement — est-ce trop punitif sur stock joueur ?

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Métiers]] · [[Combat]] · [[Personnage]] · [[Le Lien]] · [[Tome]] · [[Livre Récipient]] · [[Potion]]*
