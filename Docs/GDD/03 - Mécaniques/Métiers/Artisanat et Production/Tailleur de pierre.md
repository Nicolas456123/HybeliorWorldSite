---
tags: [métier, archétype, artisanat, acuité, vigueur, pierre, taille, marbre, granite]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Acuité
stats_secondaires: [Vigueur, Endurance, Mémoire]
craft_category: Travail du bois et de la pierre
sources_ressources_accessibles: [Pierre, Pierre taillée, Marbre, Granite, Ardoise, Basalte, Eau (refroidissement)]
stations_principales: [Atelier de taille, Carrière, Polissoir, Tréteau de finition]
outils_principaux: [Maillet, Burin, Pointerolle, Ciseau, Polissoir, Compas, Râpe à pierre]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Maçon, Architecte, Sculpteur, Mineur, Lapidaire, Forgeron]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Tailleur-de-pierre-Sculpteur-Maçon, variants-marbre-par-pays, ardoise-toiture]
---

# ⛏️ Archétype-Métier — Tailleur de pierre

> Métier de la **taille fine** : transforme la pierre brute en blocs lisses, colonnes, dalles, ardoises de toiture. **Distinct du [[Sculpteur]]** (artistique 3D) et du **[[Maçon]]** (assemblage). Sa pierre devient les murs nobles, les colonnades, les sols de palais.

---

## 1. Vue d'ensemble

Le **Tailleur de pierre** prend la pierre brute extraite par le [[Mineur]] et la **transforme en éléments construits** : blocs équarris pour murs nobles, colonnes, chapiteaux lisses, dalles de pavement, ardoises de toiture, fûts monolithiques. Il livre des pièces **prêtes à poser** au [[Maçon]] (qui les assemble) et à l'[[Architecte]] (qui les a spécifiées).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Mineur]] (extraction en carrière), parfois lui-même (Tailleur peut posséder sa carrière)
- **Aval** : [[Maçon]] (pose des blocs taillés en murs), [[Architecte]] (spécifie les dimensions), [[Sculpteur]] (qui sculpte sur les blocs préparés), [[Lapidaire]] (frontière fine — gemmes serties dans pierre)
- **Frontière joueur/PNJ** : Tailleur joueur livre des **pièces** (composants) revendues au m² ou à l'unité, pas un service de chantier

**Identité gameplay :**
- Métier **précision + force** — `Acuité` (lecture de la roche, tracé exact, finesse de la frappe), `Vigueur` (frappe au maillet 8h/jour), `Endurance` (poussière, position pénible), `Mémoire` (variants de roche, recettes culturelles)
- Métier **technique** : la frappe ratée fend le bloc (perte totale du bloc — mécanique gold sink douce)
- Métier **fournisseur** plutôt qu'**exécutant chantier** : le Tailleur travaille en atelier ou en carrière, pas sur le chantier final

**Ancrage culturel :** Galenor (marbre blanc académique, Lumasar), Evertia (marbre rose impérial — Caëspia), Alkaran (granite, ardoise), Cendara (basalte volcanique noir), Cestra (pierre rouge de Vermilis).

---

## 2. Stats brutes & Maîtrises associées

### Stats brutes

| Stat | Rôle | Magnitude |
|------|------|-----------|
| **Acuité** *(principale)* | Lecture du grain de la pierre, tracé géométrique, finesse de frappe | Direct — qualité du bloc final |
| **Vigueur** *(principale)* | Frappe répétée au maillet, manipulation blocs lourds | Direct — vitesse d'avancement et plafond de taille des blocs |
| **Endurance** *(secondaire)* | Position pénible, poussière inhalée, sessions longues | Multiplicative — durée de session |
| **Mémoire** *(secondaire)* | Reconnaissance variants (marbre rose vs blanc, granite vs ardoise), recettes culturelles | Débloque palier Expert+ |

### Maîtrises contextuelles

- **`Maîtrise_Taille_de_Pierre`** — racine du métier
- **`Maîtrise_Marbre`** — sous-spécialisation pierre noble (Galenor, Evertia)
- **`Maîtrise_Granite`** — sous-spécialisation roche dure (Alkaran, Astravia)
- **`Maîtrise_Ardoise`** — sous-spécialisation pierre fendue (toitures, dallage)

> **Cohérent avec [[Personnage]]** : `Qualité du bloc = Acuité × Vigueur × Maîtrise_Taille`. Un Tailleur Acuité 80, Vigueur 60, palier 4 produit du **Magistral structurel** (blocs sans défaut de fendage).

---

## 3. Sources de ressources

### Intrants principaux

| Intrant | Source | Notes |
|---------|--------|-------|
| [[Pierre]] brute | [[Mineur]] / carrière | Extraction en blocs grossiers — équarrissage = travail du Tailleur |
| **Marbre** (variant Pierre) | Carrières spécifiques (Galenor, Evertia) | Pierre noble — palier Adepte+ requis |
| **Granite** (variant Pierre) | Alkaran, Astravia | Pierre dure, longue à tailler |
| **Ardoise** (variant Pierre) | Alkaran, Trinoria | Pierre feuilletée — toitures, dallage |
| **Basalte** (variant Pierre) | Cendara | Pierre noire volcanique |
| **Eau** | Liquide | Refroidissement burin, lubrification taille |

### Outputs (production directe)

- **Bloc équarri standard** (intermédiaire fabriqué — vendable au [[Maçon]])
- **Bloc taillé fin** (T3+) pour murs nobles, façades cathédrale
- **Colonne** (fût + chapiteau lisse — frontière fine [[Sculpteur]] qui orne les chapiteaux complexes)
- **Dalle** de pavement (sol palais, place publique pavée)
- **Ardoise** (T2+) — couvertures de toit haut tier
- **Linteau / Seuil** (passage de porte, marche)
- **Fût monolithique** (T5+, prouesse technique)

---

## 4. Stations + outils

### Stations principales

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Atelier de taille** | Lieu principal de travail | T1+ |
| **Carrière** *(zone monde)* | Extraction et premier équarrissage | T2+ |
| **Polissoir** | Finition lisse pour pierre noble | T3+ |
| **Tréteau de finition** | Reposage des pièces taillées avant livraison | T1+ |

### Outils

| Outil | Catégorie | Notes |
|-------|-----------|-------|
| **Maillet (de Tailleur)** | Outils | Frappe sur burin — distinct du marteau Forgeron |
| **Burin / Ciseau / Pointerolle** | Outils | Outils signature — la précision de la pointe fait le métier |
| **Polissoir** | Outils | Pierre abrasive, finition lisse |
| **Compas / Règle / Équerre** | Outils | Tracé géométrique partagé [[Architecte]] |
| **Râpe à pierre** | Outils | Finition de courbures |

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées | Conditions |
|--------|----------------------|------------|
| **1 — Novice** | Équarrissage simple, blocs cubiques de pierre commune. Taux de fendage ~25% (perte de bloc) | Défaut |
| **2 — Initié** | Blocs taillés fins (faces lisses), seuils, linteaux, ardoises. Premiers variants (granite, basalte). Taux fendage ~15% | Usage : 100 blocs taillés |
| **3 — Adepte** | **Marbre** débloqué. Colonnes et fûts (≤ 3 m), dalles de pavement, chapiteaux lisses. Taux fendage ~8% | Usage + condition : 300 blocs + 1 colonne livrée intacte |
| **4 — Expert** | Marbre rose impérial, blocs courbes (voussoirs), corniches, balustrades. Co-signature avec [[Sculpteur]] sur chapiteaux ornés. Taux fendage ~3% | Usage + condition : 600 blocs + 1 colonnade complète livrée |
| **5 — Maître** 🔒 | Fût monolithique (≥ 6 m), pierre cosmique (Pierres-cicatrices, Pierre-Voix de Baelor), variants Trace. Procs T6 | **Condition cachée** : ex. tailler un fût monolithique sans fendage, restaurer une colonne d'une [[Traces des Ères|Trace architecturale]], tailler une Pierre-Voix sans la rendre muette |

> **Décroissance** : −1 palier latent après 60 jours sans taille. Rouille post-Souffle : taux de fendage doublé la 1ère semaine.

---

## 6. Crafts/recettes débloqués

> Voir [[Crafts]] §7. Le Tailleur produit l'**élément** (bloc, colonne, dalle) ; le [[Maçon]] le pose ; le [[Sculpteur]] orne (frontière fine).

### Recettes signature par palier

| Palier | Production | Construction-cible |
|--------|------------|---------------------|
| **Novice** | Bloc équarri (1 pierre brute → 1 bloc) | Fondation, mur extérieur Maçon |
| **Initié** | Ardoise fendue, seuil de porte, linteau | Toitures honnêtes, ouvertures de maison T2 |
| **Adepte** | Colonne en marbre 2-3 m, dalle de pavement | Manoir T3, temple T3, place pavée |
| **Expert** | Voussoir de voûte, balustrade, corniche, chapiteau lisse pré-Sculpteur | Cathédrale T4, palais T4 |
| **Maître** | Fût monolithique, pierre cosmique taillée, colonne signature | Cathédrale capitale T5, monument T5-T6 |

### Pattern recette canonique

> Tier N requiert : **N×1 pierre brute** (selon variant) + **(N×3) heures taille** + **N×0.5 unités d'eau** + **palier Mastery requis**. Risque de fendage = `(palier_max - palier_actuel) × 5%`.

**Mini-jeu** : tracé géométrique (précision compas), choix point d'impact (lecture du grain), frappe (timing + force calibrée). Échec = bloc fendu (perte totale ou partielle).

---

## 7. Carrière et débouchés

### Échelle d'évolution joueur

```
[Apprenti carrier] → [Tailleur de village] → [Tailleur de cité] → [Maître Tailleur] → [Tailleur-Légende]
        ↓                  ↓                     ↓                   ↓                    ↓
   Blocs équarris      Seuils/ardoises        Colonnes marbre     Marbre impérial    Pierre cosmique
   carrière proche      maison T2              manoir T3           palais T4           monument T5+
```

### Débouchés économiques

- **Tailleur de carrière** : exploitation directe d'une carrière (revenu massif mais investissement initial)
- **Tailleur d'atelier urbain** : commande sur mesure pour [[Architecte]] / [[Maçon]] / nobles
- **Tailleur de cour** : exclusivité noble (palais provincial, cathédrale capitale)
- **Tailleur-Restaurateur** : restauration de Traces architecturales ([[Traces des Ères]]) — complémentaire avec [[Maçon]]-Restaurateur

### Métiers complémentaires fortement liés

- **[[Maçon]]** — client direct (frontière : Tailleur prépare, Maçon pose)
- **[[Architecte]]** — spécifie les dimensions et profils
- **[[Sculpteur]]** — frontière fine : Tailleur livre le bloc lisse, Sculpteur orne ; Sculpteur-Maître peut tailler ses propres blocs
- **[[Mineur]]** — fournisseur amont (extraction)
- **[[Lapidaire]]** — frontière sur la pierre semi-précieuse (intersection rare : pierre noble + gemme sertie)
- **[[Forgeron]]** — fournisseur d'outils (burins, ciseaux acier trempé)

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet sur le Tailleur de pierre |
|-----|----------------------------------|
| **Sommeil de Glace** (Climata) | Pierre gelée plus dure, +20% temps mais +10% qualité finition |
| **Feu Endormi** (Eldoria) | Basalte volcanique de Cendara abondant, recettes pierre-de-cendre |
| **Verdoiement** (Terranu) | Pierre poreuse végétalisée — variants intégration mousses |
| **Échos Brisés** (Tempora) | Risque de fendage doublé (instabilité du grain) |
| **Cieux Lus** (Stellaris) | Granite étoilé d'Astravia bonifié, alignements rituels possibles |

### Par culture / faction

- **Galenor** (Lumasar) : académies en marbre blanc — école centrale du métier, prestige maximal
- **Evertia** : marbre rose impérial, Caëspia signature
- **Alkaran** : granite et ardoise, fortifications nobles
- **Cendara** : basalte volcanique noir, intégration au flux de lave (Maître)
- **[[Lore/Religions/Lex Petra]]** : religion de la pierre — Tailleur central, recettes consacrées, taille rituelle

---

## 9. Économie

### Marges typiques

| Palier | Coût intrants | Vente moyenne (bloc) | Marge |
|--------|---------------|------------------------|--------|
| Novice | 1-3 Éclats (pierre brute) | 5-15 Éclats | ~70% |
| Adepte | 50-200 Éclats (marbre brut) | 300-1500 Éclats (colonne) | ~75% |
| Maître | 5 000+ Éclats (pierre cosmique) | 50 000+ Éclats (fût monolithique signé) | ~85% |

### Gold sinks contribués

- **Fendage** : perte de bloc (gold sink doux) — incitation à la maîtrise
- **Outils premium** (burins en acier signature) : 100-500 Éclats par jeu, à renouveler
- **Carrière** : achat/location de droit d'extraction

### Chaîne économique

```
[Mineur (extraction)] → [TAILLEUR DE PIERRE (équarrissage + taille fine)] → [Maçon (pose) / Sculpteur (orne)]
                                                                       ↘ [Architecte (spécifie)]
```

---

## 10. Comportement IA / signatures PNJ

### Cycle quotidien

```
[06:00 lever — atelier ouvert tôt pour la lumière naturelle]
[06:30-12:00 taille matin : tracé puis frappe (la frappe au matin, plus précis)]
[12:00-13:30 pause repas + nettoyage poussière]
[13:30-17:30 polissage et finition (l'après-midi est pour la finition fine)]
[17:30-19:00 inspection blocs livrables, livraison aux Maçons]
[19:00-22:00 repos — métier solitaire, peu de vie sociale tardive]
[22:00 coucher tôt]
```

### Signatures PNJ canoniques (5 PNJ — pays différents)

- **Maître Veylan le Patient de Lumasar** (Galenor) — école du marbre blanc académique, fournisseur des Académies de Lumasar, signe les colonnades signature
- **Maîtresse Anessa de Caëspia** (Evertia) — Maîtresse du marbre rose impérial, taille les fûts du palais impérial
- **Old Drogvan d'Altram** (Alkaran) — granite et ardoise, fortifications nobles, technique du frappage en hiver gelé
- **Cinderya la Noire de Cendara** — basalte volcanique, Maîtresse de la pierre noire de Cendra, frontière Ignis Aeternum
- **Faldur le Restaurateur de Vermilis** (Cestra) — Tailleur-Restaurateur des Murailles Rouges, archéologie active sur Traces des Ères

---

## 11. Décisions ouvertes

- [ ] **Frontière Tailleur de pierre / Sculpteur** : Tailleur fait les blocs lisses + chapiteaux simples, Sculpteur orne et fait les statues. Cas limite : balustrade ornée ? **Proposition** : co-craft (Tailleur prépare, Sculpteur orne) — frontière `Maîtrise_Taille` (lisse) vs `Maîtrise_Sculpture` (motif)
- [ ] **Frontière Tailleur de pierre / Maçon** : Tailleur livre les pièces, Maçon les pose. Cas limite : équarrissage rapide sur chantier ? **Proposition** : Maçon peut équarrir grossièrement, Tailleur seul fait les finitions
- [ ] **Sous-spécialisations Marbre / Granite / Ardoise** : 3 sous-Maîtrises dédiées ou cumul libre ? **Proposition** : 3 sous-Maîtrises spécialisables (un Tailleur ne peut pas être Maître des 3 simultanément — choix de carrière)
- [ ] **Fût monolithique** : recette légendaire unique ou 5 variants par hauteur ? **Proposition** : 5 variants (3m / 6m / 9m / 12m / cosmique)
- [ ] **Pierre cosmique** ([[Traces des Ères]] : Pierre-Voix, Pierres-cicatrices) : Maître seul ou requiert co-craft Enchanteur ? **Proposition** : Tailleur Maître + Enchanteur pour rituel d'éveil
- [ ] **Calibration paliers** : 100/300/600 blocs à playtester
- [ ] **Carrière comme construction** : à archétyper en Phase 2 Architecture (catégorie Production rurale) — voir [[Catégories de Constructions]]

---

*Liens : [[Métiers]] · [[Architecture/Index|Architecture]] · [[Catégories de Constructions]] · [[Matériaux de Construction]] · [[Mapping Métiers de Construction]] · [[Maçon]] · [[Architecte]] · [[Sculpteur]] · [[Mineur]] · [[Lapidaire]] · [[Forgeron]] · [[Pierre]] · [[Crafts]] · [[Sources de Ressources]] · [[Le Souffle]] · [[Lore/Religions/Lex Petra]] · [[Traces des Ères]]*
