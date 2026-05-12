---
tags: [métier, archétype, artisanat, verbe, acuité, cuisine]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Verbe
stats_secondaires: [Acuité, Mémoire, Endurance]
craft_category: Cuisine
sources_ressources_accessibles: [Viande, Poisson, Légumes, Fruits, Œuf, Lait, Miel, Épices, Herbes, Sel, Farine, Huile, Boisson, Champignons]
stations_principales: [Fourneau, Plan de travail, Marmite, Plancha, Affineur (frontière Fromager)]
outils_principaux: [Couteau de chef, Mortier et pilon, Poêles, Cuillère bois, Louche, Mandoline]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Boulanger, Boucher, Métiers#Pêcheur, Métiers#Fermier, Apothicaire, Métiers#Tavernier, Métiers#Aubergiste]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Cuisinier-Boulanger-Charcutier-Fromager, festins-buffs-multi-joueurs, plats-vs-pain-pattern-canonique]
---

# 🍲 Archétype-Métier — Cuisinier

> Métier **central de la consommation** d'Hybelior. Produit les **plats préparés** (viandes/poissons cuits, soupes, ragoûts, festins multi-buff) qui complètent les pains du [[Boulanger]] et les boissons du [[Métiers|Tavernier]]. Pivot social fort : la cuisine est le **medium des buffs sociaux** et des festins de [[Guildes|guilde]].

---

## 1. Vue d'ensemble

Le **Cuisinier** transforme les viandes (livrées par le [[Boucher]]), poissons ([[Métiers|Pêcheur]]), légumes/fruits/céréales ([[Métiers|Fermier]] / [[Métiers|Botaniste]]), épices et herbes ([[Apothicaire]] / [[Métiers|Herboriste]]) en **plats prêts à consommer**. Il sert au quotidien (taverne, foyer) et exceptionnellement (festins de guilde, mariage, intronisation noble).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Boucher]] (viandes), [[Métiers|Pêcheur]] (poissons), [[Métiers|Fermier]] (céréales, légumes), [[Métiers|Botaniste]] (herbes), [[Apothicaire]] (épices), [[Boulanger]] (pain accompagnant), [[Métiers|Meunier]] (farines), [[Métiers|Apiculteur]] (miel)
- **Aval** : joueurs directement, [[Métiers|Tavernier]] / [[Métiers|Aubergiste]] (revente), [[Guildes|guildes]] (festins)
- **Frontière** :
  - **Cuisinier ≠ Boulanger** : pains/gâteaux/pâtisseries = Boulanger ; plats = Cuisinier
  - **Cuisinier ≠ Boucher** : viande **crue prête à cuire** = Boucher ; viande **cuite** = Cuisinier
  - **Cuisinier ≠ Charcutier** : salaison/fumage à long terme = Charcutier (sous-spé Boucher) ; cuisson immédiate = Cuisinier
  - **Cuisinier ≠ Fromager** : affinage = Fromager (sous-spé) ; usage en plat = Cuisinier
  - **Cuisinier ≠ Brasseur** : boisson fermentée = Brasseur ([[Crafts]] §Alchimie) ; jus / soupe = Cuisinier

**Identité gameplay :**
- Métier **socialement riche** — `Verbe` (présentation plat, vente, animation festin), `Acuité` (dosage, timing, présentation), `Mémoire` (recettes nationales/cultes), `Endurance` (sessions intenses devant fourneau)
- Métier **gold-sink positif** : produit des **buffs sociaux multi-joueurs** (festins) — pivot des [[Guildes|guildes]]
- Métier **rotation rapide** : plats consommés vite, cycle production-vente très court

**Ancrage culturel :** Galenor (cuisine impériale raffinée), Cendara (cuisine épicée volcanique), Alkaran (plats nordiques denses, soupes longues), Onara (cuisine rituelle), Endora (cuisine subtile aux herbes), Cestra (cuisine de la mer).

---

## 2. Stats & Maîtrises

| Stat | Rôle |
|------|------|
| **Verbe** *(principale)* | Présentation, animation festin, mode Marchand de qualité |
| **Acuité** *(principale)* | Dosage assaisonnement, timing cuisson, équilibre plat |
| **Mémoire** *(secondaire)* | Recettes par culture, signatures, herbes/épices propriétés |
| **Endurance** *(secondaire)* | Sessions longues coup de feu (festin = plusieurs heures intensives) |
| Vivacité | Cadence ; festin demandant rapidité |

### Maîtrises contextuelles

- **`Maîtrise_Cuisine`** — racine
- **`Maîtrise_Festin`** — sous-spécialité multi-plats coordonnés (palier Adepte+)
- **`Maîtrise_Cuisine_Rituelle`** — plats religieux/cérémoniels (palier Expert+)
- **`Maîtrise_Fromagerie`** — sous-spé affinage (palier Adepte+, frontière [[Métiers|Fromager]])
- **`Maîtrise_Cuisine_Cosmique`** — variants par ère (palier Maître)

---

## 3. Sources de ressources accessibles

### Intrants (très diversifiés)

| Intrant | Source | Notes |
|---------|--------|-------|
| **Viande** | Boucher | Voir [[Viande]] |
| **Poisson** | Pêcheur | Voir [[Poisson]] |
| **Légumes** | Fermier | Voir [[Légumes]] |
| **Fruits** | Botaniste / Cueilleur | Voir [[Fruits]] |
| **Œuf** | Apiculteur poultry / Chasseur | Aviens, Reptiles |
| **Lait** | Berger | Pas dans Sources canon — à confirmer Phase 2 |
| **Miel** | Apiculteur | Voir [[Sources de Ressources]] |
| **Épices** | Apothicaire (broyage) | Modificateur cuisine — voir [[Catégories d'Items]] §Épices |
| **Herbes** | Herboriste / Botaniste | Voir [[Herbes]] |
| **Sel** | Mineur (gemme sel) / Pêcheur côtier | Conservation + saveur |
| **Farine** | Meunier | Pour pâtes, sauces liées |
| **Huile** | Apothicaire / Pressier | Cuisson, marinade |
| **Champignons** | Mycologue | Voir [[Champignons]] |
| **Fromage** | Fromager (sous-métier) | Voir [[Fromage]] |
| **Boisson** | Tavernier / Brasseur | Pour sauces, soupes |
| **Pain** | Boulanger | Accompagnement (frontière) |

### Sortie

- 1 session quotidienne (Labeur ~30%) → ~10-20 plats T1-T2 OU 5-8 plats T3 OU 1 festin T4 (en plusieurs heures)

---

## 4. Stations + outils

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Fourneau / Plan de travail** | Cuisson, préparation principale | T1+ |
| **Marmite** | Soupes, ragoûts, mijotés | T1+ |
| **Plancha / Gril** | Viandes/poissons grillés | T2+ |
| **Affineur de fromage** *(frontière Fromager)* | Affinage long | T3+ |
| **Cuisine de festin** *(grand atelier)* | Festin multi-plats | T4+ |

### Outils

| Outil | Notes |
|-------|-------|
| **Couteau de chef** | Découpe précise |
| **Mortier et pilon** | Broyage épices (partagé Apothicaire) |
| **Poêles diverses** | Cuisson |
| **Cuillère bois / Louche** | Mélange, service |
| **Mandoline** | Découpe légumes fines |

---

## 5. Paliers de Maîtrise

| Palier | Capacités | Conditions |
|--------|-----------|------------|
| **1 — Novice** | Soupes simples, grillades basiques. T1. Buff Stamina pure. Échec 12% | Défaut |
| **2 — Initié** | Ragoûts, plats viande/poisson moyens, salades. T2. Buff Stamina + 1 stat mineure | Usage : 50 plats |
| **3 — Adepte** | Plats complets régionaux. T3. Buff multi-stat (1+1). Festin 2-3 plats coordonnés (3-5 convives) | Usage : 200 plats + 1 festin réussi |
| **4 — Expert** | Plats signature pays. T4 Magistral. Festin grand 5-7 plats (10+ convives, buff zone). Cuisine rituelle (initié religion) | Usage : 500 plats + signature reconnue |
| **5 — Maître** 🔒 | T5 Légendaires. T6 Mythique sur quête. Festins cosmiques (variant ère). Cuisine d'Éternel | **Condition cachée** : ex. servir un Roi à un mariage royal, cuisiner pour un Éternel via quête, festin de [[Guildes|guilde]] majeure pour 50+ joueurs |

---

## 6. Crafts / recettes débloqués

### Productions par palier

| Palier | Plats individuels | Festins | Spécialités |
|--------|--------------------|---------|--------------|
| Novice | Soupe simple, grillade T1 | — | Bouillons |
| Initié | Ragoût, poisson grillé, salade composée T2 | — | Marinades |
| Adepte | Plats régionaux T3 (Galenor, Cendara, etc.) | Festin T3 (3 plats, 5 convives) | Mijotés longs |
| Expert | Plats signature T4 (1-2 affixes) | Festin T4 (5-7 plats, 10+ convives) | Cuisine rituelle (par religion) |
| Maître | T5-T6 Légendaire/Mythique | Festin cosmique T5 (variant ère) | Cuisine d'Éternel |

### Pattern recette canonique Cuisine (aligné [[Pain]] §6)

> Tier N = **N intrants principaux** + **(N-1) intrants enrichissants** + **station T-1** + **Mastery requis**.

> Mini-jeu canonique : **Dosage assaisonnement + Timing cuisson** (T1-T3) + **Séquence d'incorporation** (T4+) + **Présentation/Rituel** (T5-T6).

| Recette type | Tier | Intrants | Durée | Mini-jeu | Sortie |
|--------------|------|----------|-------|----------|--------|
| Ragoût Façonné | 2 | Viande T2 × 2, Légumes × 3, Sel × 1, Bouillon × 1 | 20 min | 2 jauges (dosage + timing) | 4× Ragoût Façonné |
| Plat signature Galenor T4 | 4 | Viande T3 × 1, Légumes × 4, Épices × 3, Vin × 1, Herbes × 2 | 1h | 4 jauges + séquence | 2× Plat Magistral (2 affixes) |
| Festin de guilde T4 | 4 | Viandes × 6, Légumes × 12, Pain × 8 (Boulanger), Boisson × 6 (Tavernier) | 4h coordonnées | Jauges multi-plat + timing parallèle | 1× Festin (10 convives buff zone 2h) |
| Festin cosmique T5 | 5 | Viande T5 + ingrédients ère + composants rituels | 8h | Festin + rituel + canalisation | 1× Festin Légendaire (20+ convives, buff persistant) |

### Pattern festin (canonique)

> Le **festin** est un craft **multi-plat coordonné** qui produit un **buff de zone** sur les convives :

| Élément | Valeur |
|---------|--------|
| **Convives min** | 3 (T3), 5 (T4), 10 (T5) |
| **Durée buff zone** | 1h (T3), 2h (T4), 4h (T5) |
| **Magnitude buff** | +5 stat × N (T3), +10 × N (T4), +15 × N (T5) |
| **Cumul** | 1 seul festin actif par joueur (remplace pain ordinaire — cf. [[Pain]] §4 cumul) |
| **Co-craft** | Boulanger (pain), Tavernier/Brasseur (boisson) — bonus si tous présents |

### Affixes signature plats (10)

1. **Cuit avec patience** — durée buff ×1.5
2. **Épicé du Sud** — +résistance feu/froid (selon épice)
3. **Du terroir** *(régional)* — bonus +25% si consommé dans la région d'origine
4. **Festin partagé** — +5% magnitude par convive co-mangeant
5. **Plat sacré** *(rituel)* — bonus narratif religion
6. **Subtil** — non détectable par effet vision/aura (poison furtif possible)
7. **Robuste** — résistance dégradation post-Souffle
8. **Doré** ([[Les Ères|Rêve Lumineux]]) — magnitude +25% jour
9. **Brulé** ([[Les Ères|Feu Endormi]]) — résistance feu inclus
10. **Spectral** ([[Les Ères|Échos Brisés]]) — buff anticipé 5s avant fin manger

---

## 7. Carrière et débouchés

```
[Apprenti] → [Cuisinier de marché] → [Cuisinier de taverne] → [Chef de cour / Maître festin] → [Cuisinier-Légende d'un Roi]
```

### Spécialisations

- **Cuisinier de tous les jours** — taverne, foyer
- **Chef de festin** — événements de guilde, mariages
- **Cuisinier rituel** — temples, cérémonies
- **Fromager** — affinage long ([[Métiers|Fromager]] sous-spé)
- **Cuisinier-explorateur** — rations voyageurs (frontière Boulanger/Aerion)

### Débouchés

- **Taverne** — partenariat fixe avec [[Métiers|Tavernier]]
- **Auberge** — partenariat avec [[Métiers|Aubergiste]] (régen Labeur)
- **Cour** — chef noble (Reconnaissance Adepte+)
- **Festin de guilde** — gros gold sink positif
- **Cuisinier de bataille** — fournit rations factions militaires

### Métiers complémentaires

- **[[Boulanger]]** — pain accompagnant (frontière nette mais collaboration)
- **[[Boucher]]** — fournisseur viande
- **[[Métiers|Pêcheur]]** — fournisseur poisson
- **[[Métiers|Fermier]]** — légumes/céréales
- **[[Apothicaire]]** — épices (frontière broyage)
- **[[Métiers|Tavernier]]** — boisson, débouché direct

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | +20% qualité plats végétariens, herbes abondantes |
| **Sommeil de Glace** (Climata) | Soupes longues bonifiées, conservation +30% |
| **Vents** (Aerion) | Recettes voyageurs/rations boostées |
| **Brume Mortelle** (Umbra) | Plats *Pourpres* (immunité brume) |
| **Présages** (Fatum) | Plats augures, divination par festin |
| **Rêve Lumineux** (Eldoria) | Plats dorés, festins de jour bonifiés |

### Par contexte

- **Festival** — demande pléthorique, prix x2
- **Mariage / cérémonie noble** — gros sink (10 000+ Éclats)
- **Religion** ([[Lore/Religions/00 - Système Religieux]]) : 9 styles canoniques par religion
- **Saison** — agrumes l'hiver, baies l'été (pattern avec [[Métiers|Botaniste]])

---

## 9. Économie

### Ratios canoniques

| Palier | Coût intrants par plat | Vente | Marge | Volume |
|--------|--------------------------|-------|-------|--------|
| Novice | 2-5 Éclats | 8 Éclats | ~50% | 10-15 plats / jour |
| Adepte | 10-30 | 50-150 | ~75% | 5-8 / jour |
| Expert | 100-500 | 500-3000 | ~80% | 2-3 / jour ou 1 festin |
| Maître | 1000-10 000 | 10 000-100 000 (festin) | ~85% | 1 festin / 3 jours |

### Gold sinks contribués

- **Festin privé / mariage** ([[Économie]] §Cat. 5) — gros sink 10 000+ Éclats
- **Service taverne quotidien** — micro-paiements cumulés, économie de circulation

---

## 10. Comportement IA + signatures PNJ

### Routine Cuisinier PNJ (Phase 2)

```
[Lever 06:00] → [Marché matin : achats frais auprès Boucher/Pêcheur/Fermier]
              → [09:00-12:00 : préparation midi]
              → [Service midi 12:00-14:00 : Mode Marchand]
              → [15:00-18:00 : préparation soir + festin si commandé]
              → [Service soir 19:00-22:00 : Mode Marchand + animation]
              → [Coucher 23:00]
```

### Signatures PNJ (Phase 4)

- **Maître Geryon de Galenor** — chef impérial, cuisine raffinée
- **Vasta la Cendrée de Cendara** — cuisine volcanique épicée
- **Padre Selan d'Onara** — cuisine rituelle Foedus Animae
- **Aldo le Marin de Cestra** — cuisine de la mer
- **Mère Thrana d'Alkaran** — soupes nordiques longues, festins d'hiver

---

## 11. Décisions ouvertes

- [ ] **Frontière Cuisinier / Boulanger / Charcutier / Fromager** : 1 racine **Cuisinier** + spé Boulanger (déjà séparé), Charcutier (Boucher sous-spé), Fromager (Cuisinier sous-spé Adepte+) — à valider
- [ ] **Festin pattern canonique** : magnitude/durée/convives à playtester
- [ ] **Cumul plat + pain + boisson + potion** : voir [[Pain]] §4. À aligner ici
- [ ] **Cuisine rituelle** : 9 religions × Cuisinier — Phase 4 (≥9 plats rituels canoniques)
- [ ] **Plats signature par pays** : ~30 grandes signatures (1-2 par grand pays) Phase 4
- [ ] **Cuisinier vs Boulanger overlap** : un Cuisinier T2-T4 peut faire pains de base (cf. [[Pain]] §6 variante Cuisinier) — à confirmer canon

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Pain]] · [[Viande]] · [[Poisson]] · [[Boisson]] · [[Boulanger]] · [[Boucher]] · [[Apothicaire]] · [[Économie]] · [[Les Ères]] · [[Guildes]] · [[Lore/Religions/00 - Système Religieux]]*
