---
tags: [métier, archétype, artisanat, acuité, endurance, boulangerie, cuisine]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Acuité
stats_secondaires: [Endurance, Verbe, Mémoire]
craft_category: Cuisine
sources_ressources_accessibles: [Farine, Liquide (eau, lait), Œuf, Miel, Beurre, Épices, Graines, Sel, Levain, Pigment alimentaire (or)]
stations_principales: [Pétrin, Four à pain, Plan de travail, Affineur de levain, Atelier de pâtisserie]
outils_principaux: [Pétrin, Pelle à four, Couteau de boulanger, Râteau à braise, Coupe-pâte]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Métiers#Meunier, Métiers#Fermier, Métiers#Apiculteur, Cuisinier, Métiers#Pâtissier, Apothicaire (épices)]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-paliers-playtest, frontière-Boulanger-Cuisinier-Pâtissier, recettes-pains-rituels-religions]
---

# 🥖 Archétype-Métier — Boulanger

> Métier **central de la consommation quotidienne**. Le Boulanger produit les **pains, gâteaux et pâtisseries** — denrée fondamentale d'Hybelior. Cet archétype-métier est l'**angle Métier joueur** complémentaire de l'angle **Comportement PNJ** déjà ébauché dans [[Métiers - Boulanger]].

> **Articulation avec l'ébauche PNJ** : [[Métiers - Boulanger]] décrit la *boucle BT/routine quotidienne* d'un PNJ Boulanger (cycle inversé 03:00-14:00, T1 préparation pré-aube → T5 livraisons). Le présent archétype décrit le *métier jouable* : stats, paliers de Maîtrise, recettes débloquées, économie. Les deux fichiers se référencent mutuellement, ne se dupliquent pas.

> **Articulation avec [[Pain]]** : l'archétype-item [[Pain]] détaille les recettes T1-T6, les buffs, la conservation. Cet archétype-métier détaille **qui apprend ces recettes, comment, et avec quels paliers**.

---

## 1. Vue d'ensemble

Le **Boulanger** mélange farine, eau, sel et levain ; pétrit, façonne, cuit. Ses produits — pains, gâteaux, pâtisseries, brioches — fournissent le **buff Stamina prolongé hors-combat** (cf. [[Pain]] §3). C'est le métier le plus **routinier-quotidien** d'Hybelior : une cité sans boulanger meurt en quelques jours.

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Métiers|Meunier]] (farine — intrant principal), [[Métiers|Fermier]] (céréales si moulin propre), [[Métiers|Apiculteur]] (miel), [[Métiers|Berger]] (lait, beurre), [[Métiers|Apothicaire]] (épices, levains rares), [[Boucher]] (graisse/saindoux)
- **Aval** : joueurs (consommation directe — voir [[Pain]] et [[Gâteaux]]), [[Métiers|Tavernier]] / [[Métiers|Aubergiste]] (revente), [[Cuisinier]] (pain accompagnant un plat — frontière collaborative)

**Identité gameplay :**
- Métier **précis-routinier** — `Acuité` (dosage, timing cuisson), `Endurance` (lever pré-aube, sessions intenses), `Verbe` (vente quotidienne, mode Marchand), `Mémoire` (recettes régionales, signatures)
- Métier **rotation très rapide** : pains se vendent en heures, périssent en jours
- Métier **cycle inversé** : lever 03:00, ferme 14:00 (cf. [[Métiers - Boulanger]])
- Métier **point d'information sociale** : la boulangerie est le carrefour des rumeurs (cf. [[Métiers - Boulanger]] §Lien social)

**Frontière canonique :**
- **Boulanger ≠ Cuisinier** : Boulanger = pains/gâteaux/pâtisseries (cuisson sèche au four à pain) ; Cuisinier = plats préparés (cuisson humide / grillade). Cuisinier peut faire pain T1-T4 mais pas T5+ (cf. [[Pain]] §6).
- **Boulanger ≠ Pâtissier** : Pâtissier = sous-spé Boulanger (palier Adepte+) sur les **pâtisseries fines** (gâteaux signatures, brioches royales). Frontière douce.
- **Boulanger ≠ Meunier** : Meunier = transformation grain → farine (préalable). Boulanger consomme la farine. Frontière nette.

**Ancrage culturel :** Galenor (pain de Voyageur impérial), Alkaran (pain noir nordique), Onara (pain Spirale rituel Foedus Animae), Cendara (pain volcanique épicé), Astravia (brioche étoilée Ordo Caelum). Voir [[Pain]] §8 pour signatures complètes.

---

## 2. Stats & Maîtrises

| Stat | Rôle |
|------|------|
| **Acuité** *(principale)* | Dosage farine/eau/sel, timing cuisson, justesse couleur croûte |
| **Endurance** *(principale)* | Lever pré-aube, sessions intenses pétrissage |
| **Verbe** *(secondaire)* | Vente quotidienne (Mode Marchand), animation comptoir |
| **Mémoire** *(secondaire)* | Recettes régionales, signatures, pains rituels |
| Vivacité | Cadence façonnage |
| Vigueur | Pétrissage manuel (pré-mécanisation), portage sacs farine |

### Maîtrises contextuelles

- **`Maîtrise_Boulangerie`** — racine
- **`Maîtrise_Pâtisserie`** — sous-spé fine (palier Adepte+, frontière [[Métiers|Pâtissier]])
- **`Maîtrise_Pain_Rituel`** — pains religieux (palier Expert+, initiation requise)
- **`Maîtrise_Conservation`** — sous-spé pains de longue conservation (palier Adepte+)

---

## 3. Sources de ressources accessibles

> Voir [[Sources de Ressources]] §Fabriqué.

### Intrants

| Intrant | Source | Notes |
|---------|--------|-------|
| **Farine** | Fabriqué (Meunier) | Intrant principal universel — voir [[Sources de Ressources]] §Fabriqué |
| **Liquide** *(eau, lait)* | Nature / Berger | Hydratation pâte |
| **Œuf** | Apiculteur poultry / Chasseur | Brioches, gâteaux |
| **Miel** | Apiculteur | Pains sucrés, pain d'épices |
| **Beurre raffiné** | Berger / Apothicaire | Brioches, viennoiseries |
| **Épices** | Apothicaire | Pain d'épices, parfums (cf. [[Pain]] §6.4) |
| **Graines** *(cumin, anis, vanille rare)* | Botaniste | Pains aromatiques |
| **Sel** | Mineur (sel gemme) / Pêcheur côtier | Tous pains |
| **Levain mère** | Auto-craft Boulanger / Apothicaire | Pain de campagne, T2+ |
| **Pigment alimentaire (or)** | Bijoutier (or comestible) | Brioche royale, pain de l'Aube T5-T6 |
| **Cristal de Voie** | Drop ère / [[Le Lien]] | Pain rituel sacré T5-T6 |

### Sortie

- 1 session matinale (Labeur ~30%) → ~20-30 pains T1-T2 OU 8-10 pains T3 OU 1 pain rituel T5-T6 (en plusieurs heures + condition cachée)

---

## 4. Stations + outils

> Voir [[Métiers - Boulanger]] §Paramètres pour la station PNJ équivalente.

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Pétrin** | Mélange et pétrissage pâte | T1+ |
| **Four à pain** | Cuisson principale | T1+ |
| **Plan de travail** | Façonnage | T1+ |
| **Affineur de levain** | Maintenir levain mère | T2+ |
| **Atelier de pâtisserie** | Pâtisseries fines (palier Adepte+) | T3+ |
| **Pétrin sacré + Four rituel** | Pains rituels T5-T6 | T5+ uniquement |

### Outils

| Outil | Notes |
|-------|-------|
| **Pétrin** *(à main ou méca)* | Pétrissage |
| **Pelle à four** | Enfournement |
| **Couteau de boulanger** | Scarification (signature) |
| **Râteau à braise** | Gestion four |
| **Coupe-pâte** | Découpe portion |

---

## 5. Paliers de Maîtrise

| Palier | Capacités | Conditions |
|--------|-----------|------------|
| **1 — Novice** | Pain commun T1, miches simples. Échec 12% (croûte brûlée / pâte ratée) | Défaut |
| **2 — Initié** | Pain de campagne T2 (levain mère). Brioche simple. Échec 7% | Usage : 50 fournées (cf. [[Pain]] §6.2) |
| **3 — Adepte** | Pain noir T3, pain d'épices simple. Pâtisserie débloquée. Recettes régionales. Échec 5% | Usage : 200 fournées + commande noble (cf. [[Pain]] §6.3) |
| **4 — Expert** | Pain d'épices T4 Magistral, gâteaux signatures, pains de cour, pain rituel mineur (initié religion). Échec 3% (cf. [[Pain]] §6.4) | Usage : 500 fournées + signature reconnue |
| **5 — Maître** 🔒 | Brioche royale T5, Pain de l'Aube T6 Mythique. Pains rituels sacrés (par religion). Héritage | **Condition cachée** ([[Pain]] §6.6) : ex. pétrir au lever du soleil pendant l'[[Les Ères|Ère du Rêve Lumineux]], avoir Reconnaissance Maître dans une religion solaire ([[Lore/Religions/Ignis Aeternum]] / [[Lore/Religions/Ordo Caelum]]) |

### Rouille post-[[Le Souffle|Souffle]]

| Effet | Magnitude | Durée |
|-------|-----------|-------|
| Première semaine post-Souffle : qualité réduite, pains T5-T6 −20% magnitude | −15% performance + −20% sur hauts tiers | 7 jours |

---

## 6. Crafts / recettes débloqués

> Cohérent avec [[Pain]] §6 (recettes T1-T6) et [[Crafts]] §3 Cuisine.

### Productions par palier

| Palier | Pains | Brioches / Gâteaux | Pains rituels | Spécial |
|--------|-------|---------------------|----------------|----------|
| Novice | Miche commune (T1) | — | — | — |
| Initié | Pain de campagne (T2) | Brioche simple (T2) | — | Premiers pigments |
| Adepte | Pain noir (T3), pain régional | Brioche fine (T3) | — | Pâtisserie débloquée |
| Expert | Pain d'épices (T4), pain signature pays | Brioche de cour (T4) | Pain rituel mineur (initié) | Recettes régionales 30 pays |
| Maître | T5 Légendaire ([[Pain]] §3.1) | Brioche royale (T5) | Pain rituel sacré (par religion) | Pain de l'Aube T6 Mythique |

### Pattern recette canonique Boulangerie

> Voir [[Pain]] §6 pour le détail. Synthèse :

> **Tier N requiert** : N intrants principaux (farine + 1-3 céréales/épices) + (N-1) intrants enrichissants (œuf, miel, beurre, lait) + station T-1 + Mastery requis. Les T5-T6 introduisent un composant rituel.

> **Mini-jeu canonique** : **dosage assaisonnement + timing cuisson** (T1-T3) + **séquence d'incorporation** (T4+) + **rituel/canalisation** (T5-T6) — pattern aligné [[Cuisinier]] §6.

### Recettes signatures (~30 pains régionaux + 9 pains rituels)

> Voir [[Pain]] §8 pour la liste complète. Les principaux :

- **Pain de Voyageur de Galenor** (T3, ère Vents)
- **Pain Noir d'Alkaran** (T3-T4)
- **Pain Spirale d'Onara** (T5, rituel Foedus Animae)
- **Pain Volcanique de Cendara** (T4, rituel Ignis Aeternum)
- **Brioche Étoilée d'Astravia** (T5, rituel Ordo Caelum)
- **Pain Silencieux de Baelor** (T4, rituel Taciti)
- **Pain de Pierre de Gryndor** (T4, rituel Lex Petra)
- **Pain Onirique de Vytharia** (T5, rituel Somnium Vigil)
- **Pain du Cycle de Sylthara** (T5, rituel Rota Mundi)
- **Pain Ancestral d'Ulinor** (T4, rituel Vael'Kurash + Foedus Animae)

### Affixes signature pain (10)

> Voir [[Pain]] §5 pour la liste complète. Les principaux :

1. **Pétri par un Maître** — pas de cooldown 5s sur interruption
2. **Cuit au feu sacré** ([[Lore/Religions/Ignis Aeternum]]) — magnitude +30% près foyer
3. **Doré** ([[Les Ères|Rêve Lumineux]]) — magnitude ×2 jour
4. **Conservation jurée** — conservation ×3 mais magnitude −15%
5. **Pain de partage** — bonus social Reconnaissance si donné
6. **Pain du Voyageur** ([[Les Ères|Vents Bouleversants]]) — conservation +1 jour par voyage
7. **Pain du Souffle** — résiste à la dégradation post-Souffle

---

## 7. Carrière et débouchés

```
[Apprenti] → [Boulanger de bourg] → [Boulanger de cité] → [Boulanger-Maître reconnu] → [Boulanger-Légende patrimonial]
                                       ↓
                            Sous-spé Pâtissier (Adepte+)
```

### Spécialisations

- **Boulanger commun** — pains du quotidien
- **Pâtissier** — sous-spé fine ([[Métiers|Pâtissier]] palier Adepte+)
- **Boulanger rituel** — pains religieux (palier Expert+)
- **Boulanger de cour** — exclusivité noble
- **Boulanger-Voyageur** — pains de longue conservation pour caravanes (Aerion)

### Débouchés

- **Boulangerie** — boutique fixe, clientèle quotidienne
- **Boulanger de taverne / auberge** — partenariat fixe ([[Métiers|Tavernier]] / [[Métiers|Aubergiste]])
- **Boulanger de cour** — exclusivité noble (Adepte+)
- **Boulanger de [[Guildes|guilde]]** — fournisseur collectif
- **Boulanger d'événement** — festivals, mariages

### Métiers complémentaires

- **[[Métiers|Meunier]]** — fournisseur amont quasi obligatoire (farine)
- **[[Métiers|Apiculteur]]** — miel pour pains sucrés
- **[[Métiers|Berger]]** — lait, beurre, œufs (poultry)
- **[[Cuisinier]]** — frontière collaborative (un plat avec son pain)
- **[[Métiers|Apothicaire]]** — épices, pigment d'or, levains rares

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

> Cohérent avec [[Métiers - Boulanger]] §Modulations et [[Pain]] §7.

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | Récolte céréales abondante, +20% production |
| **Sommeil de Glace** (Climata) | Céréales rares, focus pains de conservation, prix x1.3 |
| **Vents** (Aerion) | Recette "Pain du Voyageur" boostée, rumeurs/chants en cuisine |
| **Brume Mortelle** (Umbra) | Ouverture limitée, peur, demande pains rituels |
| **Rêve Lumineux** (Eldoria) | Pains dorés, magnitude ×2 jour |
| **Sommeil Onirique** (Somnix) | Pains oniriques (variant) |
| **Échos Brisés** (Tempora) | Pains Spectraux |

### Par contexte

- **Festival** — pains spéciaux gâteaux, prix x1.5, ouverture prolongée (cf. [[Métiers - Boulanger]] §Modulations)
- **Pénurie de farine** — stock réduit, prix augmentés
- **Famine** — pic demande, commande de la couronne
- **Religion dominante** ([[Lore/Religions/00 - Système Religieux]]) : 9 pains rituels canoniques

---

## 9. Économie

### Ratios canoniques

| Palier | Coût intrants par fournée | Vente totale | Marge | Volume |
|--------|------------------------------|--------------|-------|--------|
| Novice | 5-15 Éclats / fournée 10 pains | 50 Éclats | ~70% | 2-3 fournées / jour |
| Adepte | 30-100 / fournée 8 pains | 200-800 | ~75% | 1-2 fournées / jour |
| Expert | 200-1000 / fournée 5 pains | 1500-10 000 | ~80% | 1 fournée / jour |
| Maître | 5000-50 000 / pain T6 | 50 000-500 000 (Pain de l'Aube unique) | ~85% | 1 / semaine |

### Boucle économique

- Le Boulanger a une **rotation très rapide** : ses produits se vendent en heures, périssent en jours
- Pas de stockage long terme (sauf pains de conservation T3+ Alkaran)
- Pic de revenu matinal (07:00-12:00 — cf. [[Métiers - Boulanger]])

### Gold sinks contribués

- **Pain de prestige** — pains royaux de couronnement (~100 000 Éclats)
- **Festival** — commandes en masse
- **Pain rituel** — gold-sink religion

---

## 10. Comportement IA + signatures PNJ

### Lien avec l'ébauche [[Métiers - Boulanger]] (PNJ)

> Cet archétype-métier décrit le **versant joueur** ; [[Métiers - Boulanger]] décrit le **versant PNJ** (cycle inversé 03:00-14:00, T1 préparation pré-aube → T5 livraisons). Les deux fichiers se croisent sur :

| Élément partagé | Référence |
|-----------------|-----------|
| Cycle inversé 03:00-14:00 | [[Métiers - Boulanger]] §Cycle quotidien |
| Stations (Pétrin + Four à pain) | [[Métiers - Boulanger]] §Paramètres + présent §4 |
| Stock initial typique | [[Métiers - Boulanger]] §Stock + [[Pain]] §2 |
| Modulation par ère | Identique (cohérence stricte) |
| Variantes régionales | [[Pain]] §8 (signatures pays) |

### Signatures PNJ (Phase 4)

> Voir aussi [[Pain]] §8 pour les pains canoniques par pays. Les Boulangers signature seront nommés en Phase 4 :

- **Maître Halvar de Galenor** — Pain de Voyageur impérial canonique
- **Vasta la Sombre d'Alkaran** — pain noir nordique, longue conservation
- **Padre Iolan d'Onara** — Pain Spirale rituel Foedus Animae
- **Maître Cendric de Cendara** — pain volcanique épicé
- **Astre Veyran d'Astravia** — Brioche Étoilée Ordo Caelum

### Apprentis et école

- Boulanger-Maître peut former des apprentis (cf. [[Métiers - Boulanger]] §Hooks Phase 2)
- Apprenti = sous-PNJ qui prépare la pâte, monte en mastery progressivement

---

## 11. Décisions ouvertes

- [ ] **Frontière Boulanger / Pâtissier / Cuisinier** : 1 racine **Boulanger** + sous-spé Pâtissier palier Adepte+. Cuisinier peut faire pains T1-T4 mais pas T5+ (cf. [[Pain]] §6 variante Cuisinier). Validé canon
- [ ] **Calibration paliers** : seuils d'usage (50/200/500 fournées) à playtester
- [ ] **Pains rituels par religion** : 9 religions × Boulanger — tous spécifiés dans [[Pain]] §8. Validé canon
- [ ] **Mini-jeu cuisson** : timing exact à playtester (Phase 3)
- [ ] **Boulanger-Maître exclusif T6** : Cuisinier ne peut pas faire Pain de l'Aube T6, validé. Confirmer pour autres T6 hypothétiques
- [ ] **Conservation post-Souffle** : pains T5-T6 −20% magnitude pendant 2 semaines (cf. [[Pain]] §9). Validé canon

---

*Liens : [[Métiers]] · [[Métiers - Boulanger]] (angle PNJ) · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Pain]] · [[Gâteaux]] · [[Cuisinier]] · [[Économie]] · [[Les Ères]] · [[Le Souffle]] · [[Lore/Religions/00 - Système Religieux]]*
