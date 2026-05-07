---
tags: [item, archétype, consommable, livre-récipient, scriptorium, magie]
type: archetype
category: Consommable
subcategory: Livre Récipient
source: Fabriqué (Scribe, Enchanteur, Relieur)
mastery: Scriptorium
craft_category: Scriptorium et enchantement
tier_min: 2
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-multi-page-vs-tome, conservation-pages, frontière-tome-parchemin]
---

# 📚 Archétype — Livre Récipient

> Sous-catégorie de la **catégorie [[Catégories d'Items|Consommable]]**. Pluralité de [[Parchemin|parchemins]] reliés ensemble en un livre — **single-use par page mais multi-page**. Distinction nette avec [[Tome]] (focus magique durable, multi-charges, **non consommable**).

---

## 1. Vue d'ensemble

Un **livre récipient** est un livre relié contenant **N pages**, chacune portant un sort encapsulé (équivalent [[Parchemin]]). À chaque lecture, **une page est consumée** (déchirée, brûlée, ou simplement "vidée"). Le livre lui-même est conservé jusqu'à épuisement de toutes ses pages.

**Ancrage gameplay :**
- **Single-use par page, multi-page par livre** : 3-10 pages selon tier
- Chaque page = un sort encapsulé proche [[Parchemin]] équivalent
- **Plus économe en matériau** que des parchemins individuels (recette globale au lieu de N recettes)
- **Plus pratique en transport** qu'un sac de parchemins (1 slot inventaire au lieu de N)
- Accessible aux **non-Liés** (×2 coût Mana, comme [[Parchemin]])

**Ancrage culturel :** scriptoriums urbains des [[Lore/Religions/Ordo Caelum|Stellari]], bibliothèques privées de Galenor, codex secrets de Vytharia, livres-récipients funéraires d'Onara.

### Frontière critique : **Livre Récipient vs Tome**

| Trait | **Livre Récipient** *(Consommable)* | **Tome** *(Équipement, Focus magique)* |
|------|-------------------------------------|----------------------------------------|
| Usage | **Single-use par page** | **Multi-use par sort, charges/recharges** |
| Slot | Inventaire consommable | Équipé (main libre / dos / ceinture) |
| Création | Scribe (T2-T5, intrants modérés, scellage) | Scriptorium-Enchanteur (T1-T6, intrants élevés, rituel long) |
| Tier | 2-5 (pas de T1, jetable T6 difficile à justifier) | 1-6 (durable, évolutif via ré-enchantement) |
| Conditionnement | Voie active OU non-Lié (×2 mana) | Voie active obligatoire |
| Durabilité | Pages consumées une à une | Tome lui-même perdure, charges se rechargent |
| Économie | Marché de masse, livres reliés à grande échelle | Objet personnel, transmission, héritage |

> **Règle frontière** : un Livre Récipient **vidé de toutes ses pages** redevient un **livre vierge** (Récolte fabriquée intermédiaire — peut être réécrit). Un Tome **vidé** redevient un livre vierge T1 lui aussi (cf. [[Tome]] §1). Mais le Tome n'est jamais consumé page par page — il fonctionne par recharges.

### Frontière avec [[Parchemin]]

| Trait | **Parchemin** | **Livre Récipient** |
|------|---------------|---------------------|
| Pages | 1 | 3-10 |
| Slots inventaire | 1 par parchemin | 1 par livre (peu importe pages) |
| Coût matière | Faible | Moyen (mais économique vs N parchemins) |
| Rarité sorts | T1-T5 | T2-T5 (pas T1 minimum) |
| Lecture | Action 2-3s | Action 2-3s par page |

---

## 2. Variations / sous-types

| Sous-type | Pages | Composition | Notes |
|-----------|-------|-------------|-------|
| **Codex offensif** | 3-5 pages | Sorts dégât variés | Combat de masse |
| **Codex de soin** | 3-5 pages | Sorts soin / régen | Support |
| **Codex de buff** | 3-7 pages | Sorts buff stat / résistance | Préparation |
| **Codex utilitaire** | 5-10 pages | Sorts déplacement / vision | Exploration |
| **Codex rituel** | 3-5 pages | Sorts thématiques religion | T4-T5, Reconnaissance requise |

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence [[Parchemin]] §3** : chaque page a magnitude **égale au parchemin équivalent**. Le tier du livre = tier des pages (uniformes).

### 3.1 Capacité par tier

| Tier livre | Pages typiques | Tier des sorts | Mana coût Lié / non-Lié (par page) |
|------------|----------------|----------------|-------------------------------------|
| 2 — Façonné | 3-5 | T2 | 60 / 120 |
| 3 — Œuvré | 4-7 | T3 | 110 / 220 |
| 4 — Magistral | 5-8 | T4 | 200 / 400 |
| 5 — Légendaire | 5-10 | T5 | 350 / 700 |

> **Note** : les pages d'un livre sont **uniformes** (même tier, même type) sauf affixe **Codex hybride** qui permet 2 types de sorts.

### 3.2 Magnitudes (rappel parchemin)

| Tier | Dégâts (offensif) | HP soin | Buff stat | Durée action lecture |
|------|-------------------|---------|-----------|----------------------|
| 2 | 100 dgt | +100 HP | +8 stat 120s | 2s |
| 3 | 200 dgt | +180 HP | +14 stat 180s | 2.5s |
| 4 | 350 dgt | +320 HP | +24 stat 240s | 3s |
| 5 | 600 dgt | +560 HP | +40 stat 360s | 3s |

---

## 4. Mécanique d'usage

### 4.1 Action lecture page

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Durée action lecture** | 2s (T2), 2.5s (T3), 3s (T4-T5) | Identique [[Parchemin]] |
| **Page consumée** | À chaque lecture | Déchirée, brûlée ou simplement vidée |
| **Action ouvrir le livre** | 1s (1ère lecture seulement) | Cooldown ouverture pas réinitialisé entre 2 lectures |
| **Possible en combat** | Oui, mais interruption sur dégâts (page perdue) | |
| **Possible en mouvement** | Marche oui, sprint non, saut non | |

### 4.2 Cooldown

| Mécanique | Valeur |
|-----------|--------|
| **Cooldown entre 2 lectures du même livre** | 5s (anti-spam) |
| **Cooldown entre 2 lectures de livres différents** | 0s |
| **Cooldown global parchemin/livre** | Aucun (limité par stocks et Mana) |
| **Cumul** | Sorts différents cumulent ; mêmes sorts refresh durée |

### 4.3 Coût Mana

> Identique à [[Parchemin]] §4.2 : Lié = ×1, non-Lié = ×2.

### 4.4 Livre épuisé

Quand toutes les pages sont consumées, le livre devient un **livre vierge** (Récolte intermédiaire fabriquée) qui peut être :
- **Recyclé** par un Scribe (réécrit avec nouveaux sorts → re-craft)
- **Jeté** (perte mineure)
- **Conservé** comme objet collector / lore

---

## 5. Affixes / modificateurs spécifiques (10)

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Reliure rituelle** | Conservation pages × 2 |
| 2 | **Pages dorées** | Mana coût −15% par page |
| 3 | **Codex hybride** | Pages de 2 types différents (ex. 3 offensif + 2 buff) |
| 4 | **Sceau de Voie** | Magnitude +20% si Voie correspondante active |
| 5 | **Encre noire** ([[Lore/Religions/Noctari]]) | Lecture silencieuse |
| 6 | **Reliure cuir précieux** | +durabilité livre, casse réduite |
| 7 | **Calligraphie Maître** | Cooldown entre lectures = 3s au lieu de 5s |
| 8 | **Codex jumeau** | 2 livres reliés à un porteur — activation simultanée possible |
| 9 | **Codex éternel** ([[L'Accord]]) | Résiste à la rouille post-Souffle |
| 10 | **Codex onirique** ([[Cosmologie\|Somnix]]) | Lisible pendant le sommeil |

> **Affixes négatifs** : *Pages humides* (50% chance échec lecture), *Reliure pourrie* (livre perdu si tombé au sol), *Encre tremblante* (durée action +1s).

---

## 6. Recettes (Scriptorium — 1 par tier)

> Stations : **Pupitre de scribe + Cercle d'enchantement + Atelier de reliure** ([[Crafts]] §Scriptorium). Métier : [[Métiers|Scribe]] + [[Métiers|Relieur]] (T2-T4), [[Métiers|Enchanteur]] (T5).

### 6.1 T2 — Codex commun (3 pages T2)

| Aspect | Valeur |
|--------|--------|
| **Métier** | Scribe + Relieur |
| **Palier** | Initié |
| **Station** | Pupitre + Atelier de reliure |
| **Intrants** | Parchemin × 3, Encre × 4, Pigment × 2, Cuir reliure × 1 |
| **Sortie** | 1× Codex (3 pages T2) |
| **Durée** | 4 min |
| **Mini-jeu** | Tracé 3 jauges + reliure (assemblage) |

### 6.2 T3 — Codex Œuvré (5 pages T3)

| Aspect | Valeur |
|--------|--------|
| **Palier** | Adepte |
| **Station** | Pupitre + Cercle d'enchantement + Atelier de reliure |
| **Intrants** | Parchemin × 5, Encre rituelle × 6, Pigment × 3, Essence × 2, Cuir reliure rituel × 1, Cristal mineur × 1 |
| **Durée** | 10 min |
| **Mini-jeu** | Tracé 5 jauges + séquence rituelle 5 étapes + reliure |

### 6.3 T4 — Codex Magistral (7 pages T4)

| Aspect | Valeur |
|--------|--------|
| **Palier** | Expert |
| **Station** | Pupitre + Cercle d'enchantement + Atelier de reliure |
| **Intrants** | Vellum sacré × 7, Encre noire × 8, Pigment rare × 4, Essence × 4, Cristal de Voie × 1, Cuir reliure précieux × 1 |
| **Durée** | 30 min |
| **Mini-jeu** | Tracé 7 jauges + canalisation Voie palier Initié + reliure rituelle |

### 6.4 T5 — Codex Légendaire (10 pages T5)

| Aspect | Valeur |
|--------|--------|
| **Palier** | Maître |
| **Station** | Pupitre + Cercle d'enchantement + Atelier de reliure rituel |
| **Intrants** | Vellum d'or × 10, Encre cosmique × 10, Pigment d'ère × 5, Essence × 5, Cristal de Voie taillé × 2, Larme × 1, Cuir reliure rituel × 1 |
| **Durée** | 1h |
| **Mini-jeu** | Tracé 10 jauges + canalisation Voie palier Adepte + reliure rituelle Maître |

> **Pas de T6** : un sort T6 mérite un [[Tome]] durable. Un livre récipient T6 jetable serait un **gaspillage** des intrants mythiques.

> **Pattern recette canonique** : tier N livre = N+1 parchemins (pages) + (N) intrants encre/pigment/essence + (N-1) intrants reliure + 1 cuir/cristal d'enchantement ≥ T-1.

---

## 7. Variants cosmiques (10)

| Variant | Ère | Effet sur le livre |
|---------|-----|--------------------|
| **Shadow** ([[Cosmologie\|Noctis]]) | Ombre Longue | Toutes pages = lecture silencieuse |
| **Spectral** ([[Cosmologie\|Tempora]]) | Échos Brisés | Effets anticipés 3s |
| **Frost** ([[Cosmologie\|Aquor]]) | Sommeil de Glace | Conservation × 5 |
| **Verdoyant** ([[Cosmologie\|Spiritus]]) | Verdoiement | Pages végétales (regénèrent +1 page après 30 jours) |
| **Brulé** (Voie de Feu) | Feu Endormi | Effets feu zone supplémentaire |
| **Pourpre** ([[Cosmologie\|Umbra]]) | Brume Mortelle | Mana coût halved en zone brume |
| **Doré** ([[Cosmologie\|Eldoria]]) | Rêve Lumineux | Magnitude +20% jour |
| **Brisé** ([[Cosmologie\|Tempora]]) | Échos Brisés | 50% pages double effet / 50% pages annulées |
| **Onirique** ([[Cosmologie\|Somnix]]) | Sommeil Onirique | Lisible pendant sommeil |
| **Vénérable** ([[Cosmologie\|Fatum]]) | Présages | +1 page bonus si quête active |

---

## 8. Exemples de signatures

> Signatures CSV (type 15 — Livre Récipient) — interprétation contextuelle :

- **Géant avec l'immortalité** (T5, [[Lore/Religions/Foedus Animae]])
  *Codex onarien lié à un rituel de longue vie. 10 pages : 5 sorts soin majeur + 5 sorts buff Endurance permanent. Bonus narratif : déverrouille dialogue avec esprit-ancien.*

- **Vautours avec honneur** (T4, [[Lore/Religions/Vael Kurash]])
  *Codex chamane des fjords. 7 pages : sorts d'invocation compagnon-charognard 2 min. Bonus narratif : reconnu chez les chamanes alkarans.*

- **Flèche des Dieux** (T5, [[Lore/Religions/Ignis Aeternum]])
  *Codex offensif cendarien. 10 pages : sorts projecteur feu + bouclier feu. Bonus narratif : badge Ignitari.*

- **Signes chez les anges** (T4, [[Lore/Religions/Ordo Caelum]])
  *Codex stellaire d'Astravia. 7 pages : sorts vision arcanique + buff Acuité. Bonus narratif : Stellari accessibles.*

- **Mendier dans les abysses** (T5, espionnage Vytharia)
  *Codex noir. 10 pages : sorts furtivité + invisibilité courte. Bonus narratif : marqueur Veilari.*

- **Arbres et vautours** (T3, [[Lore/Religions/Foedus Animae]] + [[Lore/Religions/Vael Kurash]])
  *Codex hybride double-religion. 5 pages : sorts communion + invocation. Bonus narratif : double allégeance.*

---

## 9. Conservation, stockage, dégradation

| Tier | Conservation pages scellées | Conditions optimales | Dégradation |
|------|------------------------------|----------------------|-------------|
| 2 | Illimitée si scellé | Étui sec | Humidité = encre coule, pages perdues |
| 3 | Illimitée si scellé | Étui rituel | Idem |
| 4 | Illimitée si scellé | Étui rituel + cristal | Post-[[Le Souffle\|Souffle]] : 30% chance d'effacement |
| 5 | Illimitée si scellé | Coffre rituel | Post-Souffle : 50% chance d'effacement |

> **Pattern unique** : pages de livre scellées ne se dégradent pas naturellement. Mais l'eau, le feu, et le **Souffle** détruisent l'encre (idem [[Parchemin]] §9).

### Conditions spéciales

- **Post-[[Le Souffle|Souffle]]** : livres T4-T5 risquent effacement (vérifier état)
- **[[Les Ères|Ère du Sommeil de Glace]]** : encre durcie, +20% conservation forcée
- **Bibliothèques d'Astravia** : coffres gratuits pour livres rituels (service guilde)

---

## 10. Décisions ouvertes

- [ ] **Pas de T1, pas de T6** : confirmé ? T1 trop simple (3 pages d'Étincelle = sous-rentable) ; T6 gaspille les intrants mythiques
- [ ] **Pages uniformes** : toutes les pages d'un livre = même tier et même type, sauf "Codex hybride" — confirmé ?
- [ ] **Recyclage livre vierge** : un livre vidé peut-il être réécrit avec **autres** sorts ? Penche pour **oui** (économie matière)
- [ ] **Conservation post-Souffle** : 30-50% chance effacement — équilibre à playtester (cohérent [[Parchemin]] §9)
- [ ] **Codex hybride** : permet 2 types de sorts différents — limiter à T4-T5 ?
- [ ] **Action ouvrir/fermer** : 1s ouverture initiale — appliquer à chaque session ou seulement 1ère lecture ? Penche pour **1ère seulement**

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Métiers]] · [[Le Lien]] · [[Tome]] · [[Parchemin]] · [[Potion]]*
