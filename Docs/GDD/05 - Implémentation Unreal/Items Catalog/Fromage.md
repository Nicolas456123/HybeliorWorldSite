---
tags: [item, archétype, consommable, fromage, nourriture, affinage]
type: archetype
category: Consommable
subcategory: Fromage
source: Fabriqué (Fromager, affineur)
mastery: Cuisine / Fromagerie
craft_category: Cuisine
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-conservation-longue, buff-présence-vs-pain, fromage-rituel]
---

# 🧀 Archétype — Fromage

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. Pattern proche [[Pain]] **mais conservation × 5** — solide affiné dont la qualité augmente avec le temps. Profil **Stamina + Présence**.

---

## 1. Vue d'ensemble

Le **fromage** est fabriqué par le [[Métiers|Fromager]] (voir [[Crafts]] §Cuisine) à partir de lait de créature (vache, chèvre, brebis, créature exotique). Solide affiné dont la **conservation est exceptionnellement longue** (jusqu'à 120-180 jours T5-T6), parfois bonifié par le temps.

**Ancrage gameplay :**
- Magnitude proche [[Pain]] T-1 (cf. [[Pain]] §10) — un peu en dessous du pain équivalent
- **Profil Stamina + Présence** (charisme, social) — différencié [[Viande]] (Vigueur)
- Pattern **conservation longue** — unique parmi consommables solides : ×5 vs Pain équivalent
- Composante du commerce noble (fromages affinés vendus comme produits de luxe)

**Ancrage culturel :** chaque pays a ses fromages signature. Chèvre des collines galenoriennes, fromage noir de Skaldoria, fromage d'autel astravian, brique d'Alkaran fumée. Le fromage est aussi **monnaie d'échange tribale** dans les régions pastorales.

---

## 2. Variations / sous-types

| Sous-type | État | Effet principal | Conservation |
|-----------|------|-----------------|--------------|
| **Fromage frais** | Non affiné | Stamina + Présence légère | 5-7 jours |
| **Fromage affiné** | Cave longue durée | Stamina + Présence + buff stat | 30-90 jours |
| **Fromage rare** | Affinage extrême ou créature exotique | Stamina + double stat | 90-180 jours |
| **Fromage cosmique** | Variant ère | Effet narratif + Stamina | T5-T6, 7 jours instable |
| **Fromage rituel** | 9 variants religieux | Effet thématique + Stamina | T4-T6 |

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Pain]] §10 hooks** : magnitude = Pain T-1. Conservation = ×5 vs Pain équivalent.

### 3.1 Fromage affiné — Stamina + Présence

| Tier | Nom typique | Stamina rendu | Buff stat | Durée | Conservation |
|------|-------------|---------------|-----------|-------|--------------|
| 1 — Commun | Fromage frais | +40 | +1 Présence | 3 min | 7 jours |
| 2 — Façonné | Tomme de pays | +90 | +3 Présence | 5 min | 30 jours |
| 3 — Œuvré | Bleu des caves | +160 | +6 Présence + 3 stat (au choix) | 10 min | 60 jours |
| 4 — Magistral | Brique d'autel | +260 | +10 Présence + 6 stat | 15 min | 90 jours |
| 5 — Légendaire | Roue Étoilée | +420 | +18 Présence + 12 stat | 25 min | 120 jours |
| 6 — Mythique | Fromage de l'Aube | +680 + 25% Stamina max temp | +30 stat double | 40 min | 180 jours (mais ère-conditioned) |

> **Note** : T6 fromage **n'est pas instable** comme T6 Pain ou Potion — l'affinage **stabilise** la magie. Inversion intéressante du pattern T6 instable.

### 3.2 Fromage rituel (religion)

| Tier | Effet rituel canonique | Durée | Condition |
|------|------------------------|-------|-----------|
| 4 | Bénédiction mineure thématique | 30 min | Reconnaissance ≥ Initié |
| 5 | Bénédiction majeure + dialogue clergé | 1h | Reconnaissance ≥ Adepte |
| 6 | Bénédiction sacrée + Renom | 2h | Reconnaissance ≥ Maître + initiation |

---

## 4. Mécanique d'usage

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action** | 2s (T1-T3), 3s (T4-T6) | Plus rapide que [[Pain]] (snack-friendly) |
| **Possible en mouvement** | Marche oui, sprint oui (en sécurité), saut non | |
| **Possible en combat** | **Bloqué** | |
| **Cumul** | 1 buff alimentaire actif ; plafond 3 buffs simultanés | |

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Affiné en cave noble** | +1 tier conservation |
| 2 | **Aux herbes** | Modificateur Herbes appliqué |
| 3 | **Cendré** | +5 résistance feu bonus |
| 4 | **Lait de créature unique** | +20% magnitude |
| 5 | **Bénédiction d'autel** | +1 Reconnaissance religion |
| 6 | **Roulé en cire d'abeille** | Conservation × 2 |
| 7 | **Glaçé** ([[Cosmologie\|Aquor]]) | Conservation × 3, magnitude −10% |
| 8 | **Doré** ([[Cosmologie\|Eldoria]]) | +20% magnitude jour |
| 9 | **Fromage de quête** | +50% durée si quête active |
| 10 | **Soufflé** ([[L'Accord]]) | Résiste à la rouille post-Souffle |

> **Affixes négatifs** : *Moisi* (poison T1, sauf si "moisissure noble"), *Sec* (durée /2), *Trop affiné* (magnitude /2 si > date conservation).

---

## 6. Recettes (Cuisine / Fromagerie — 1 par tier)

> Station principale : **Affineur de fromage** ([[Crafts]] §Cuisine). Mini-jeu : **dosage présure + timing affinage**.

### 6.1 T1 — Fromage frais

| Aspect | Valeur |
|--------|--------|
| **Métier** | Fromager ou Cuisinier |
| **Palier** | Novice |
| **Station** | Plan de travail + Récipient |
| **Intrants** | Lait × 3, Présure × 1, Sel × 1 |
| **Sortie** | 4× Fromage frais |
| **Durée** | 60s (simulation : 1 jour caillage) |
| **Mini-jeu** | Dosage présure (1 jauge) |

### 6.2 T2 — Tomme de pays

| Aspect | Valeur |
|--------|--------|
| **Palier** | Initié |
| **Station** | Plan de travail + Affineur |
| **Intrants** | Lait × 4, Présure × 1, Sel × 2, Moule × 1 |
| **Durée** | 90s (simulation : 30j affinage) |
| **Mini-jeu** | Dosage 2 jauges + timing affinage |

### 6.3 T3 — Bleu des caves

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Plan de travail + Affineur (cave) |
| **Intrants** | Lait × 5, Présure × 2, Sel × 2, Moule rare × 1, Spore × 1 |
| **Durée** | 2 min |
| **Mini-jeu** | Dosage 3 jauges + timing affinage 60j |

### 6.4 T4 — Brique d'autel

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Plan de travail + Affineur + Atelier rituel |
| **Intrants** | Lait sacré × 4, Présure × 2, Sel rituel × 3, Spore × 2, Herbe × 2, Moule rituel × 1 |
| **Durée** | 5 min (simulation : 90j affinage) |
| **Mini-jeu** | Dosage 4 jauges + timing affinage 3 phases |

### 6.5 T5 — Roue Étoilée

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Affineur + Cercle d'enchantement |
| **Intrants** | Lait sacré × 5, Présure × 3, Sel rituel × 3, Spore rare × 2, Herbe rare × 3, Cristal × 1, Moule rituel × 1 |
| **Durée** | 15 min |
| **Mini-jeu** | Dosage 6 jauges + timing affinage 4 phases + séquence rituelle |

### 6.6 T6 — Fromage de l'Aube

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître + condition cachée 🔒 (lait de créature mythique pendant ère lumineuse) |
| **Station** | Affineur + Cercle d'enchantement + composante d'ère |
| **Intrants** | Lait mythique × 3, Présure × 3, Sel rituel × 4, Cristal de Voie d'Eldoria × 1, Larme × 1, Moule rituel × 1 |
| **Durée** | 1h (rituel) + 180j affinage simulation |
| **Mini-jeu** | Dosage 8 jauges + canalisation [[Le Lien\|Voie d'Eldoria]] palier Adepte |

> **Pattern recette canonique** : tier N = N intrants principaux + (N-1) secondaires + 1 moule/récipient ≥ T-1.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet |
|---------|-----|-------|
| **Shadow** | Ombre Longue | Magnitude silencieuse, +furtivité 5 min |
| **Spectral** | Échos Brisés | Buff anticipé |
| **Frost** | Sommeil de Glace | Conservation × 4 |
| **Verdoyant** | Verdoiement | Magnitude × 1.3 |
| **Brulé** | Feu Endormi | +rés. feu |
| **Pourpre** | Brume Mortelle | Immunité brume |
| **Doré** | Rêve Lumineux | +20% magnitude jour |
| **Brisé** | Échos Brisés | 50% double / 50% nul |
| **Onirique** | Sommeil Onirique | Mange en rêve |
| **Vénérable** | Présages | +durée quête active |

---

## 8. Exemples de signatures

- **Roue Étoilée d'Astravia** (T5, [[Lore/Religions/Ordo Caelum]])
  *Affiné sous lumière stellaire 6 mois. Effet : Stamina + +18 Présence + 12 Acuité 25 min. Bonus narratif : déverrouille observatoire privé.*

- **Brique Volcanique de Cendara** (T4, [[Lore/Religions/Ignis Aeternum]])
  *Affiné dans cave volcanique. Effet : Stamina + +10 Présence + 6 Vigueur + +20% rés. feu 15 min.*

- **Tomme de Galenor** (T3, identité commerçante)
  *Fromage standard du commerce. Effet : Stamina + +6 Présence 10 min. Bonus narratif : reconnu marchands.*

- **Bleu Spirale d'Onara** (T4, [[Lore/Religions/Foedus Animae]])
  *Bleu rare en spirale. Effet : Stamina + +10 Esprit + dialogues morts.*

- **Brique Noire d'Alkaran** (T3, identité Vael'Kurash)
  *Fumé au bois sacré. Effet : Stamina + +6 Vigueur + résistance froid.*

---

## 9. Conservation, stockage, dégradation

> **Pattern unique : conservation longue + bonification temporelle.**

| Tier | Conservation par défaut | Conditions optimales | Dégradation/Bonification |
|------|--------------------------|----------------------|--------------------------|
| 1 | 7 jours | Garde-manger frais | Sec J7, gaspillé J14 |
| 2 | 30 jours | Cave + linge | Pic J20, gaspillé J45 |
| 3 | 60 jours | Cave + cire | Pic J45, +10% magnitude pic, gaspillé J90 |
| 4 | 90 jours | Cave magique | Pic J60, +15% magnitude pic, gaspillé J120 |
| 5 | 120 jours | Cave magique + cristal | Pic J90, +20% magnitude pic, gaspillé J180 |
| 6 | 180 jours | Cave rituelle | Pic J120, +25% magnitude pic, gaspillé J270 |

> **Inversion T6 stabilité** : contrairement à Pain/Potion T6 instables, le **fromage T6 affine** sa puissance avec le temps. Concept narratif : la magie alimentaire fermentée mature comme un vin.

> **Pattern [[Pain]] §10** : Fromage = ×5 conservation Pain. T6 stable au lieu d'instable — exception canonique.

### Conditions spéciales

- **Cave noble Galenor** : ×2 conservation (service guilde [[Métiers]] §Fromager)
- **Post-[[Le Souffle|Souffle]]** : fromages T5-T6 résistent (la cave les protège)
- **[[Les Ères|Ère du Verdoiement]]** : lait + qualité = +1 tier possible

---

## 10. Décisions ouvertes

- [ ] **T6 stable** : confirmé ? Inversion intéressante du pattern T6 instable
- [ ] **Bonification temporelle** : équilibrer pour ne pas créer de "stack mort" de fromages T5-T6 mûrissant pour buff max
- [ ] **Lait de créature mythique** : drop limité ? Conditions à définir
- [ ] **Fromage rituel + autres consommables religieux** : 1 buff rituel actif maximum (cohérent avec [[Pain]] rituel)
- [ ] **Fromage en festin composite** : compte-t-il comme 1 ou 2 buffs alimentaires ? Penche pour **1 buff complexe**

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Pain]] · [[Viande]] · [[Lore/Religions/00 - Système Religieux]]*
