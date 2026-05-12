---
tags: [item, archétype, consommable, cristal, magie, rituel]
type: archetype
category: Consommable
subcategory: Cristal utilisable
source: Récolté (Mineur, Lapidaire) | Fabriqué (Joaillerie, Enchantement)
mastery: Joaillerie / Scriptorium / Alchimie
craft_category: Joaillerie | Scriptorium et enchantement
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-recharge-mana, frontière-cristal-de-voie, rituel-single-use-vs-tome]
---

# 💎 Archétype — Cristal utilisable

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. **Single-use énergétique** : cristal taillé qui se brise à l'usage pour libérer un effet magique (recharge Mana, déclenche un rituel, projette un sort). Frontière nette avec **Cristal de Voie** (focus magique durable, voir [[Tome]] §3 et §1).

---

## 1. Vue d'ensemble

Un **cristal utilisable** est une gemme ou un cristal taillé contenant une **charge magique unique**. À l'usage, il se **brise ou se consume** pour libérer son effet. Différent des [[Potion]] (alchimie liquide) et des [[Parchemin]] (sort encapsulé écrit) : le cristal utilise la **résonance minérale** comme support magique.

**Ancrage gameplay :**
- **Single-use énergétique** : recharge Mana, déclenche rituel, projection de sort
- **Pont avec [[Le Lien]]** : certains cristaux ne fonctionnent qu'avec une Voie compatible
- **Pas de cooldown global** mais **cooldown par cristal** (5-30s selon tier — anti-spam)
- Économie : matériau premier de la magie joueur — vendu en bourse minière (Cendara, Skaldoria)

**Ancrage culturel :** chaque pays a ses cristaux signature. Cristaux d'Eldoria à Astravia, cristaux noirs de Vytharia, cristaux rouges de Cendara, cristaux glacés de Skaldoria.

### Frontière avec **Cristal de Voie** (focus magique durable)

| Trait | **Cristal utilisable** *(Consommable)* | **Cristal de Voie** *(Équipement focus, voir [[Tome]] §1)* |
|------|---------------------------------------|------------------------------------------------------------|
| Usage | **Single-use** (se brise) | Durable, multi-usage, recharge avec rituel |
| Slot | Inventaire consommable | Équipé (ceinture, baguette, sertissage arme/armure) |
| Création | Lapidaire + Enchanteur (T1-T6) | Lapidaire-Maître + Enchanteur-Maître + ère compatible |
| Tier | 1-6 (mais T6 instable) | 3-6 (durable, ré-enchantable) |
| Conditionnement | Voie active OU non-Lié (×2 mana) | Voie active obligatoire |
| Économie | Marché de masse, prix accessible | Objet rare, transmission, héritage |

> **Règle frontière** : un cristal de Voie **vidé de toute charge** redevient un **cristal utilisable T-1**. Un cristal utilisable consumé est définitivement perdu.

---

## 2. Variations / sous-types

| Sous-type | Effet principal | Notes |
|-----------|-----------------|-------|
| **Cristal de recharge Mana** | Restaure Mana | Le plus commun, alternative [[Potion]] de Mana |
| **Cristal projecteur** | Projette un sort offensif | Concurrence [[Parchemin]] offensif |
| **Cristal de bouclier** | Crée un bouclier magique temporaire | Effet utilitaire défensif |
| **Cristal rituel** | Déclenche un rituel (invocation, communion) | T4-T6, condition Reconnaissance |
| **Cristal cosmique** | Effet narratif unique lié à une ère | T5-T6, instable |

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Potion]] de Mana / [[Parchemin]]** : magnitude proche potion équivalente. Coût d'usage : pas de Mana à payer (le cristal **fournit** son énergie), mais cristal **consumé**.

### 3.1 Cristal de recharge Mana

| Tier | Mana rendu | Régen sur durée | Action | Cooldown propre |
|------|------------|-----------------|--------|-----------------|
| 1 — Commun | +50 Mana | — | 1.5s | 10s |
| 2 — Façonné | +120 | +12/s × 10s | 1.5s | 15s |
| 3 — Œuvré | +220 | +20/s × 12s | 1.5s | 20s |
| 4 — Magistral | +400 | +35/s × 15s | 1.2s | 25s |
| 5 — Légendaire | +700 | +55/s × 18s | 1.0s | 30s |
| 6 — Mythique | +1100 + 25% Mana max temp | +90/s × 20s | 0.8s | 30s |

> **Comparaison [[Potion]] de Mana** : magnitudes identiques. Le cristal n'a **pas** de cooldown global potion (30s même catégorie) mais a un **cooldown propre par cristal** (10-30s). Avantage joueur : peut alterner Potion + Cristal pour buffer Mana en burst.

### 3.2 Cristal projecteur (sort offensif)

| Tier | Dégâts | Action | Cooldown | Mana coût (Lié / non-Lié) |
|------|--------|--------|----------|----------------------------|
| 1 | 60 dgt | 1.5s | 10s | 0 (cristal fournit) |
| 2 | 130 dgt | 1.5s | 15s | 0 |
| 3 | 240 dgt | 2s | 20s | 0 |
| 4 | 400 dgt | 2s | 25s | 0 |
| 5 | 680 dgt | 2.5s | 30s | 0 |
| 6 | 1100 dgt zone | 3s | 30s | 0 |

### 3.3 Cristal de bouclier

| Tier | HP bouclier | Durée | Cooldown |
|------|-------------|-------|----------|
| 1 | 60 HP | 5s | 10s |
| 2 | 140 HP | 8s | 15s |
| 3 | 250 HP | 10s | 20s |
| 4 | 420 HP | 12s | 25s |
| 5 | 700 HP | 15s | 30s |
| 6 | 1100 HP + reflète 20% dgt | 20s | 30s |

### 3.4 Cristal rituel (T4-T6)

| Tier | Effet rituel | Durée | Conditions |
|------|--------------|-------|------------|
| 4 | Invocation compagnon temporaire 2 min | 2 min | Reconnaissance ≥ Initié religion / Voie |
| 5 | Communion / bannissement | 5 min | Reconnaissance ≥ Adepte + ère compatible |
| 6 | Pacte ou rituel majeur | Permanent (1 effet) | Reconnaissance ≥ Maître + initiation rituelle |

---

## 4. Mécanique d'usage

### 4.1 Activation du cristal

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action** | 1.5s (T1-T3), 1.2s (T4), 1.0s (T5), 0.8s (T6) | Identique [[Potion]] §4.1 |
| **Possible en mouvement** | Oui (marche), non sprint, non saut | |
| **Possible en combat** | **Oui** (sans malus, contrairement à Boisson) | Le cristal fournit son énergie, pas le porteur |
| **Interruption si dégâts** | Oui — cristal **non consumé** (resté en inventaire) | Évite le grief |
| **Effet appliqué** | À la fin de l'action | |

### 4.2 Cooldown propre

| Mécanique | Valeur |
|-----------|--------|
| **Cooldown par cristal** | 10-30s selon tier (voir §3) |
| **Cooldown global cristal** | Aucun (peut alterner Mana + Bouclier + Projecteur) |
| **Cooldown vs Potion** | 8s (inter-catégories, cf. [[Potion]] §4.2) |
| **Cumul** | Effets de cristaux différents cumulent ; 1 cristal du même type à la fois |

### 4.3 Voie compatible / non-Lié

| Lecteur | Magnitude effet | Notes |
|---------|-----------------|-------|
| **Lié + Voie compatible** | 100% | Standard |
| **Lié + Voie incompatible** | 80% | Légère pénalité |
| **Non-Lié** | 60% | Pénalité majeure (cristal ne reconnaît pas pleinement le porteur) |

> **Règle** : contrairement au [[Parchemin]] qui exige Mana ×2 pour non-Lié, le cristal **fonctionne** pour non-Lié mais avec **magnitude réduite**. Différenciation tactique.

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Taillé Maître** | Magnitude +15% |
| 2 | **Sertis dans cire d'abeille** | Conservation × 2 |
| 3 | **Cristal de Voie ([Voie])** | ×1.4 magnitude si Voie correspondante active |
| 4 | **Soufflé** ([[L'Accord]]) | Résiste à la rouille post-Souffle |
| 5 | **Polychromé** | 50% chance double effet (gamble) |
| 6 | **Glacé** ([[Cosmologie\|Aquor]]) | Magnitude +20% en zone froide |
| 7 | **Solaire** ([[Cosmologie\|Eldoria]]) | Magnitude +20% jour |
| 8 | **Cristal pur** | Pas de cooldown propre |
| 9 | **Brisé partiel** | Effet × 0.5 mais conserve 50% chance d'usage second (le cristal ne se brise pas toujours complètement) |
| 10 | **Lié à un porteur** | Magnitude × 1.3 si porté par celui qui l'a taillé |

> **Affixes négatifs** : *Fissuré* (50% chance échec), *Terni* (magnitude /2), *Instable* (10% chance explosion = dégâts auto-infligés mineurs).

---

## 6. Recettes (Joaillerie + Scriptorium — 1 par tier)

> Stations : **Tour à polir + Pince à sertir** ([[Crafts]] §Joaillerie) + **Cercle d'enchantement** ([[Crafts]] §Scriptorium). Mini-jeu : **précision taille + séquence rituelle d'enchantement**.

### 6.1 T1 — Cristal mineur

| Aspect | Valeur |
|--------|--------|
| **Métier** | Lapidaire ou Bijoutier |
| **Palier** | Novice |
| **Station** | Tour à polir |
| **Intrants** | Cristal brut × 2, Pigment × 1 |
| **Sortie** | 3× Cristal mineur |
| **Durée** | 60s |
| **Mini-jeu** | Précision taille (1 jauge) |

### 6.2 T2 — Cristal de Mana

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Tour à polir + Cercle d'enchantement (basique) |
| **Intrants** | Cristal brut × 3, Pigment × 1, Essence spirituelle × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Précision taille 2 jauges + séquence rituelle 3 étapes |

### 6.3 T3 — Cristal d'éclat

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Tour + Cercle d'enchantement |
| **Intrants** | Cristal taillé × 2, Essence × 2, Pigment rare × 1, Cristal de Voie mineur × 1 |
| **Durée** | 3 min |
| **Mini-jeu** | Précision taille 3 jauges + séquence rituelle 5 étapes |

### 6.4 T4 — Cristal majeur

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Tour + Pince à sertir + Cercle d'enchantement (rituel) |
| **Intrants** | Cristal rare × 2, Essence × 3, Pigment d'ère × 1, Cristal de Voie × 1, Larme × 1 |
| **Durée** | 6 min |
| **Mini-jeu** | Précision 4 jauges + séquence rituelle + canalisation Voie palier Initié |

### 6.5 T5 — Cristal d'Aurore

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Tour + Pince à sertir + Cercle d'enchantement (Maître) |
| **Intrants** | Cristal cosmique × 2, Essence × 4, Pigment d'or × 1, Cristal de Voie taillé × 1, Larme × 2 |
| **Durée** | 15 min |
| **Mini-jeu** | Précision 6 jauges + séquence rituelle Maître + canalisation Voie palier Adepte |

### 6.6 T6 — Cristal de l'Aube

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître + condition cachée 🔒 (ère compatible OU [[Lore/Religions/Ordo Caelum]] Reconnaissance Maître) |
| **Station** | Tour + Cercle d'enchantement + Autel rituel |
| **Intrants** | Cristal mythique × 1, Essence × 5, Pigment d'or × 2, Cristal de Voie d'Eldoria × 1, Larme d'Eldoria × 1 |
| **Durée** | 1h (rituel) |
| **Mini-jeu** | Précision 8 jauges + canalisation [[Le Lien\|Voie]] palier Maître |

> **Pattern recette canonique** : tier N = N intrants principaux (cristal + essence + pigment) + (N-1) secondaires (cristal de Voie, larme) + station ≥ T-1.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet sur le cristal |
|---------|-----|----------------------|
| **Shadow** | Ombre Longue | Activation silencieuse |
| **Spectral** | Échos Brisés | Effet anticipé 3s |
| **Frost** | Sommeil de Glace | +rés. froid + slow ennemi 2s |
| **Verdoyant** | Verdoiement | Récolte +1 ressource si activé près de plante |
| **Brulé** | Feu Endormi | Dégâts feu zone supplémentaire |
| **Pourpre** | Brume Mortelle | Immunité brume 30s |
| **Doré** | Rêve Lumineux | Magnitude +20% jour |
| **Brisé** | Échos Brisés | 50% double effet / 50% nul |
| **Onirique** | Sommeil Onirique | Activable pendant sommeil |
| **Vénérable** | Présages | Effet auto-cible optimale |

---

## 8. Exemples de signatures

- **Cristal Étoilé d'Astravia** (T4, [[Lore/Religions/Ordo Caelum]])
  *Cristal taillé sous lumière stellaire. Effet : recharge Mana +400 + +20% Mana max temp. Bonus narratif : Stellari accessibles.*

- **Cristal Volcanique de Cendara** (T3, [[Lore/Religions/Ignis Aeternum]])
  *Taillé dans cendre fondue. Effet : projecteur feu 240 dgt + zone 1m × 3s. Bonus narratif : badge Ignitari.*

- **Cristal Noir de Vytharia** (T4, espionnage)
  *Cristal opaque rare. Effet : bouclier 420 HP + invisibilité 3s à l'activation. Bonus narratif : marqueur Veilari.*

- **Cristal Glacé de Skaldoria** (T3, identité Vael'Kurash)
  *Taillé dans cristal de glace ancien. Effet : bouclier 250 HP + slow zone 5m × 3s.*

- **Cristal de l'Aube** (T6, cosmique)
  *Cristal mythique. Effet : recharge Mana max + déclenche bénédiction unique selon Voie.*

---

## 9. Conservation, stockage, dégradation

| Tier | Conservation par défaut | Conditions optimales | Dégradation |
|------|--------------------------|----------------------|-------------|
| 1 | Illimitée | Sac standard | Choc fort = fissure |
| 2 | Illimitée | Sac doublé | Idem |
| 3 | Illimitée | Pochette rituelle | Idem |
| 4 | Illimitée | Pochette rituelle | Post-[[Le Souffle\|Souffle]] : 20% chance fissure |
| 5 | Illimitée | Coffre rituel | Post-Souffle : 30% chance fissure |
| 6 | 30 jours réels | Coffre rituel + cristal stabilisateur | **Mythique = volatile** : magie volatile, doit être utilisé |

> **Pattern unique** : cristal scellé ne se dégrade **pas avec le temps** (matière minérale stable), mais peut **fissurer** sur choc ou Souffle. T6 instable comme Potion/Pain T6.

### Conditions spéciales

- **Post-[[Le Souffle|Souffle]]** : cristaux T4-T6 risquent fissure forcée
- **[[Les Ères|Ère du Sommeil de Glace]]** : cristaux glacés stabilisés × 2
- **Mines de Cendara** : coffres premium pour cristaux stockés (service Mineur Maître)

---

## 10. Décisions ouvertes

- [ ] **Magnitude pour non-Lié à 60%** : équilibrer pour ne pas dévaluer la Voie
- [ ] **Cristal vs Potion Mana** : magnitudes identiques mais cooldowns différents — playtester équilibre
- [ ] **Cristal rituel T6** : effet permanent (1 effet) — limiter à 1 par personnage par mois ?
- [ ] **Frontière cristal de Voie** : règle "vidé = T-1 utilisable" à confirmer
- [ ] **Activation pendant interruption** : si dégâts subis, cristal non consumé. Confirmé pour ne pas créer grief
- [ ] **Cristal cosmique T5-T6 dropant** : drop boss ou craft pur ?

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Métiers]] · [[Le Lien]] · [[Tome]] · [[Potion]] · [[Parchemin]]*
