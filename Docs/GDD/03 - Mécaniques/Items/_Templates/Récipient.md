---
tags: [item, archétype, consommable, équipement, récipient, fiole, gourde]
type: archetype
category: Consommable | Équipement
subcategory: Récipient
dual_use: true
source: Fabriqué (Verrier, Potier, Cuir)
mastery: Travail du verre / Poterie / Travail du cuir
craft_category: Travail du bois et de la pierre | Travail du cuir
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-dual-use, frontière-équipement-consommable, capacité-vs-durabilité]
---

# 🍶 Archétype — Récipient

> Sous-catégorie **dual-use** : appartient à la fois à la **catégorie [[Catégories d'Items|Consommable]]** (rempli = consommable contenant un liquide) et à **Équipement** (vide = utilitaire portable). Bouteille, fiole, gourde, jarre, flasque — voir [[Catégories d'Items]] §arbitrage récipient.

---

## 1. Vue d'ensemble

Un **récipient** est un contenant physique : bouteille, fiole, gourde, jarre, flasque, outre. Sa **dualité** :

- **Vide** = **équipement utilitaire** : occupe un slot inventaire spécial, sert à transporter ou contenir un liquide
- **Rempli** = **consommable** : transporte une [[Potion]], [[Boisson]], émulsion alchimique, eau, etc.

Le récipient lui-même n'est pas consommé — c'est son **contenu** qui se boit. Mais le récipient **scellé** devient une unité de consommable transportable et échangeable.

**Ancrage gameplay :**
- **Capacité** : varie de 1 charge (fiole T1) à 10 charges (jarre T5) selon tier et type
- **Qualité du sceau** : module la conservation du contenu (fiole pure cristal = +50% conservation potion)
- Pont avec [[Sources de Ressources]] §Fabriqué (intermédiaires verrerie/poterie)
- Re-utilisation : un récipient vidé peut être rincé et rempli à nouveau (sauf si scellé permanent)

**Ancrage culturel :** chaque pays a ses récipients signature. Verre soufflé d'Astravia, poterie noire de Vytharia, gourde en peau d'Alkaran, fiole sertie de Galenor.

---

## 2. Variations / sous-types

| Sous-type | Capacité | Mode | Notes |
|-----------|----------|------|-------|
| **Fiole de verre** | 1 charge | Vide ou Rempli | T1-T5 alchimie, fragile |
| **Bouteille** | 2-4 charges | Vide ou Rempli | T1-T4 boisson |
| **Gourde / Outre** | 2-3 charges | Équipement (transport) | Voyage, peau ou tissu |
| **Jarre / Pot** | 5-10 charges | Stockage statique | Pas portable, stockage |
| **Flasque sertie** | 1-2 charges | Vide ou Rempli | T4-T5 noble, rituelle |

> **Frontière dual-use** : un même récipient bascule entre Consommable (rempli) et Équipement (vide) selon contexte. Voir §4 pour mécanique.

---

## 3. Effets par tier (table chiffrée canonique)

> **Le récipient n'a pas d'effet propre** sur le porteur — il **module les propriétés** de ce qu'il contient (durée conservation, capacité, qualité du contenu).

### 3.1 Capacité par tier et sous-type

| Tier | Fiole | Bouteille | Gourde | Jarre | Flasque |
|------|-------|-----------|--------|-------|---------|
| 1 | 1 charge | 2 charges | 2 charges | 5 charges | — |
| 2 | 1 charge | 3 charges | 2 charges | 6 charges | — |
| 3 | 1 charge | 3 charges | 3 charges | 8 charges | 1 charge |
| 4 | 1 charge | 4 charges | 3 charges | 10 charges | 2 charges |
| 5 | 1 charge | 4 charges | 3 charges | 10 charges | 2 charges |

### 3.2 Bonus conservation au contenu

| Tier récipient | Bonus conservation contenu | Notes |
|----------------|----------------------------|-------|
| 1 | +0% | Récipient simple |
| 2 | +20% conservation | Cire/scellé basique |
| 3 | +50% conservation | Verre épais ou poterie scellée |
| 4 | +100% (× 2) conservation | Cristal pur ou poterie rituelle |
| 5 | +200% (× 3) conservation | Récipient rituel + cristal stabilisateur |

> **Exemple** : une [[Potion]] de Soin T3 (conservation 30 jours) dans une fiole T4 = 30j × 2 = 60 jours conservés.

### 3.3 Durabilité du récipient (vide ou rempli)

| Tier | Durabilité | Cassable au choc |
|------|------------|------------------|
| 1 | 50 HP | Oui (fragile) |
| 2 | 100 HP | Oui |
| 3 | 200 HP | Oui (mais résistance choc améliorée) |
| 4 | 400 HP | Rarement |
| 5 | 700 HP | Très rarement (cristal pur ou poterie rituelle) |

> **Casse en combat** : si le porteur subit un coup direct au sac, 5% chance de casser un récipient T1-T2, 1% T3-T4, 0% T5. Voir [[Combat]] §dégâts environnementaux.

---

## 4. Mécanique d'usage

### 4.1 Mode Vide (équipement utilitaire)

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Slot occupé** | Slot inventaire utilitaire (spécial) | Pas de slot équipement Personnage classique |
| **Action remplir** | 3s à un point d'eau / source / cuve | Convertit Vide → Rempli avec liquide source |
| **Action transvaser** | 5s d'un récipient à un autre | Permet de répartir une potion sur 2 fioles |
| **Action vider** | 1s (jeter le contenu au sol) | Convertit Rempli → Vide |

### 4.2 Mode Rempli (consommable)

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Action boire** | Selon contenu (cf. [[Potion]] §4 / [[Boisson]] §4) | Le récipient n'ajoute pas de durée |
| **Charges** | Selon §3.1 | Chaque "boisson" consomme 1 charge |
| **Effet du récipient sur le contenu** | Bonus conservation (§3.2) | Pas de bonus à la magnitude |
| **Récipient vide après dernière charge** | Reste en inventaire = utilitaire vide | Réutilisable |

### 4.3 Combinaison

> Un récipient peut être **transvasé** (T1 → T3 = mieux conservé), **scellé en plomberie** (irréversible, +50% conservation supplémentaire mais récipient consommé à la fin) ou **sigillé rituel** (T5+, conservation × 5 mais lié à un porteur unique).

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Cristal pur** (Verrier-Maître) | +50% conservation contenu, casse réduite × 0.5 |
| 2 | **Sertis or** (Bijoutier) | +30% conservation, valeur marchande × 2 |
| 3 | **Scellé cire d'abeille** | +20% conservation, mais 1 usage seul (fiole irréversible) |
| 4 | **Doublé cuir** (Maroquinier) | +durabilité 50%, casse réduite |
| 5 | **Glaçé** ([[Cosmologie\|Aquor]]) | Conservation contenu × 1.5 froid |
| 6 | **Verre cosmique** ([[Cosmologie\|Solaris]]) | +20% conservation jour |
| 7 | **Récipient à sigillum** | Lié à un porteur unique (anti-vol) |
| 8 | **Fiole double** | 2 compartiments séparés (2 contenus différents) |
| 9 | **Récipient nomade** ([[Les Ères\|Vents Bouleversants]]) | Conservation +100% en monture |
| 10 | **Récipient soufflé** ([[L'Accord]]) | Résiste à la rouille post-Souffle |

> **Affixes négatifs** : *Fissuré* (conservation /2 + 50% chance casse), *Mal scellé* (conservation /2), *Trop fragile* (casse 50% au moindre choc).

---

## 6. Recettes (Verrerie / Poterie / Travail du cuir — 1 par tier)

> Stations : **Four à verre** (fiole, bouteille — Verrier), **Atelier de tournage potier** (jarre, pot — Potier), **Établi cuir** (gourde, outre — Maroquinier). Mini-jeu : **précision soufflage / tournage / couture**.

### 6.1 T1 — Fiole simple

| Aspect | Valeur |
|--------|--------|
| **Métier** | Verrier |
| **Palier** | Novice |
| **Station** | Four à verre |
| **Intrants** | Sable × 2, Charbon × 1 |
| **Sortie** | 5× Fiole simple |
| **Durée** | 60s |
| **Mini-jeu** | Soufflage simple (1 jauge) |

### 6.2 T2 — Bouteille standard

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Four à verre + Plan de travail |
| **Intrants** | Sable × 3, Pigment × 1, Cire × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Soufflage 2 jauges + scellage |

### 6.3 T3 — Bouteille épaisse

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Four à verre + Plan de travail |
| **Intrants** | Sable raffiné × 4, Pigment × 2, Cire × 1, Cristal mineur × 1 |
| **Durée** | 2 min |
| **Mini-jeu** | Soufflage 3 jauges + précision épaisseur |

### 6.4 T4 — Fiole sertie

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Four à verre + Établi de bijoutier (sertissage) |
| **Intrants** | Sable raffiné × 3, Cristal × 1, Lingot précieux × 1 (or/argent), Pigment d'ère × 1 |
| **Durée** | 5 min |
| **Mini-jeu** | Soufflage 4 jauges + sertissage 3 phases |

### 6.5 T5 — Flasque rituelle

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Four à verre + Cercle d'enchantement (mini) |
| **Intrants** | Sable cosmique × 3, Cristal de Voie × 1, Lingot précieux × 2, Pigment d'or × 1, Larme × 1 |
| **Durée** | 15 min |
| **Mini-jeu** | Soufflage 6 jauges + séquence rituelle Maître |

> **Pas de T6** : récipient = utilitaire, pas effet en soi. T6 atteignable via affixe rituel "Soufflé" ou union avec [[Cristal utilisable]] T6.

> **Pattern recette canonique** : tier N = N intrants principaux (sable/argile/cuir + pigment) + (N-1) secondaires (cire/cristal/sertissage) + station ≥ T-1.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet |
|---------|-----|-------|
| **Shadow** | Ombre Longue | Récipient invisible (pas de FX) |
| **Spectral** | Échos Brisés | Conservation anticipée 5s avant remplissage |
| **Frost** | Sommeil de Glace | Conservation × 2 par froid |
| **Verdoyant** | Verdoiement | Récipient vivant (ne casse pas, mais 1 jour conservation max) |
| **Brulé** | Feu Endormi | Résiste à la chaleur (+rés. feu sur contenu) |
| **Pourpre** | Brume Mortelle | Filtre la brume (immunité brume contenu) |
| **Doré** | Rêve Lumineux | Magnitude contenu +20% jour |
| **Brisé** | Échos Brisés | 50% durabilité × 2 / 50% casse à l'usage |
| **Onirique** | Sommeil Onirique | Le contenu se boit aussi en rêve |
| **Vénérable** | Présages | Magnitude contenu +50% si quête active |

---

## 8. Exemples de signatures

- **Fiole d'Astravia** (T4, [[Lore/Religions/Ordo Caelum]])
  *Fiole soufflée sous lumière stellaire. Bonus : conservation × 2 + +20% magnitude potion contenue.*

- **Gourde Nomade de Galenor** (T3, identité voyageuse)
  *Outre en cuir traité pour voyages longs. Bonus : conservation × 1.5 en monture + capacité 3 charges.*

- **Bouteille Volcanique de Cendara** (T3, [[Lore/Religions/Ignis Aeternum]])
  *Verre soufflé près d'une coulée de lave. Bonus : résiste à la chaleur + +rés. feu sur contenu.*

- **Flasque Sertie d'Onara** (T5, [[Lore/Religions/Foedus Animae]])
  *Flasque rituelle sertie or. Bonus : conservation × 3 + sigillum lié au porteur.*

- **Jarre Noire de Vytharia** (T4, espionnage)
  *Poterie noire opaque. Bonus : récipient invisible + conservation × 2.*

---

## 9. Conservation, stockage, dégradation

| Tier | Durabilité du récipient | Conservation contenu | Notes |
|------|--------------------------|----------------------|-------|
| 1 | 50 HP / fragile | +0% | Casse facilement |
| 2 | 100 HP | +20% | |
| 3 | 200 HP | +50% | |
| 4 | 400 HP | +100% | |
| 5 | 700 HP | +200% | Très résistant |

> **Le récipient lui-même** ne se dégrade pas avec le temps (matière inerte) — il se casse uniquement par choc.

### Conditions spéciales

- **Post-[[Le Souffle|Souffle]]** : récipients T4-T5 perdent bonus conservation pendant 2 semaines
- **[[Les Ères|Ère du Sommeil de Glace]]** : récipients verre fragiles +10% chance casse (gel)
- **Mines/Verriers d'Astravia** : coffres de transport ×0.5 chance casse

---

## 10. Décisions ouvertes

- [ ] **Slot inventaire spécial** : récipient vide occupe-t-il un slot distinct ou inventaire général ? Penche pour **utilitaire séparé**
- [ ] **Re-remplissage illimité** : récipient T5 peut être rincé/rempli infiniment ? Penche pour **oui** sauf "Scellé cire d'abeille" (single-use)
- [ ] **Dual-use tag dans data** : `dual_use: true` accepté ?
- [ ] **Pas de T6** : confirmé ? (utilitaire pur)
- [ ] **Casse en combat** : %s à playtester pour ne pas frustrer le joueur
- [ ] **Capacité multi-charges** : un récipient T4 contient-il **plusieurs** charges du **même** liquide ou des **différents** ? Penche pour **même seulement** (un mélange = nouvelle recette)

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Métiers]] · [[Potion]] · [[Boisson]] · [[Sources de Ressources]]*
