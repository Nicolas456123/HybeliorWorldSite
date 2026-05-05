---
tags: [métier, archétype, artisanat, acuité, mémoire, architecture, construction]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Acuité
stats_secondaires: [Mémoire, Verbe, Endurance]
craft_category: Travail du bois et de la pierre
sources_ressources_accessibles: [Planche, Brique, Pierre, Bois, Plaque de verre, Lingot (ferrures), Mortier]
stations_principales: [Bureau d'études, Table à plans, Atelier de taille, Chantier]
outils_principaux: [Compas, Équerre, Plomb à fil, Stylet, Maquette, Treuil de chantier]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Menuisier, Charpentier, Maçon, Tailleur de pierre, Vitrier, Forgeron, Sculpteur]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [pivot-branche-architecture-future, échelles-bâtiments-canoniques, métiers-chantier-vs-architecte]
---

# 🏛 Archétype-Métier — Architecte

> Archétype **pivot crucial** : il anticipe la **future branche Architecture & Constructions** (chantier Phase suivante) et pose la **frontière canonique** entre l'Architecte (concepteur) et les métiers chantier (Maçon, Charpentier, Vitrier, Tailleur de pierre).

---

## 1. Vue d'ensemble

L'**Architecte** conçoit, plane et supervise la construction de bâtiments, fortifications et structures civiles. Il ne pose pas (toujours) lui-même la pierre : il dessine, calcule, dimensionne, et orchestre les artisans-chantier qui exécutent. C'est le **métier-chef de file** de la branche construction.

**Place dans la chaîne d'artisanat :**
- **Amont** : aucun intrant matériel direct *(consomme parchemin, encre, pigments pour les plans)*. L'Architecte est un **producteur de plans** plus qu'un consommateur de matières.
- **Aval** : Plans → exécutés par [[Menuisier]], [[Métiers|Charpentier]], [[Métiers|Maçon]], [[Métiers|Tailleur de pierre]], [[Métiers|Vitrier]], [[Forgeron]] (ferrures), [[Sculpteur]] (ornements)
- **Frontière joueur/PNJ** : un Architecte joueur peut concevoir, mais doit s'associer (ou employer) à des artisans-chantier pour faire bâtir

**Identité gameplay :**
- Métier **mental + observation** — `Acuité` (lecture site, proportions), `Mémoire` (styles, cultures, recettes architecturales), `Verbe` (négocier le permis, diriger le chantier), `Endurance` (chantiers longs, déplacements)
- Métier **macro-économique** : un bâtiment est un **investissement long terme** (jours réels, milliers d'Éclats) — l'Architecte est l'opérateur clé du gold-sink majeur "Construction de structure"
- Métier **transversal** : pivot entre [[Guildes]] (constructions), [[Économie]] (chantiers), [[Factions]] (bâtiments diplomatiques), [[Lore/Religions/00 - Système Religieux]] (temples)

**Pivot vers la future branche Architecture (Phase suivante) :** ce fichier anticipe le système de Constructions — voir §6 (échelles de bâtiments) et §7 (mapping vers métiers chantier).

---

## 2. Stats & Maîtrises

| Stat | Rôle dans le métier |
|------|----------------------|
| **Acuité** *(principale)* | Lecture du site (terrain, lumière, accès), proportions, justesse des plans |
| **Mémoire** *(principale)* | Styles culturels (galenorien, alkaran, cendarien, onarien…), recettes architecturales, lore-géologique |
| **Verbe** *(secondaire)* | Permis auprès des nobles/factions, direction de chantier, présentation aux clients |
| **Endurance** *(secondaire)* | Chantiers tenus sur jours-semaines, déplacements multi-sites |
| Vigueur | Marginal — un Architecte peut superviser un coup de masse, mais n'est pas le poseur |
| Esprit | Marginal sauf branche **Architecte rituel** (temples, lieux sacrés [[Lore/Religions/00 - Système Religieux]]) |

### Maîtrises contextuelles

- **`Maîtrise_Architecture`** — racine : conception générale
- **`Maîtrise_Fortification`** — sous-spécialité défensive (murs, tours, donjons)
- **`Maîtrise_Architecture_Sacrée`** — temples, sanctuaires (initiation religieuse requise)
- **`Maîtrise_Urbanisme`** — planification de quartiers, places, rues (palier Maître)

> **Cohérent avec [[Personnage]]** : `Qualité de plan = Acuité × Mémoire × Maîtrise_Architecture`. Un Architecte Acuité 70, Mémoire 90, Maîtrise palier 4 produit des plans Magistraux qui débloquent des bâtiments T4.

---

## 3. Sources de ressources accessibles

> L'Architecte consomme **peu de matières directement** — il consomme du **savoir et du temps**. Ses chantiers, eux, dévorent des ressources.

### Intrants directs (faibles)

| Intrant | Source | Usage |
|---------|--------|-------|
| **Parchemin / papier** | Fabriqué (Scribe / [[Métiers|Relieur]]) | Plans dessinés |
| **Encre / Pigment** | Fabriqué (Teinturier / Apothicaire) | Tracé, code couleur |
| **Maquette** *(consommable)* | Auto-craft Architecte | Présentation client, simulation pré-construction |

### Intrants des chantiers (orchestrés)

| Ressource | Volume typique bâtiment T3 | Métier-fournisseur |
|-----------|-----------------------------|--------------------|
| [[Planche]] | 200-500 unités | [[Menuisier]] / [[Métiers|Charpentier]] |
| [[Brique]] | 500-2000 unités | [[Métiers|Maçon]] |
| **Pierre taillée** | 100-500 blocs | [[Métiers|Tailleur de pierre]] |
| [[Plaque de verre]] | 20-100 plaques | [[Métiers|Vitrier]] |
| [[Lingot]] (ferrures, charnières) | 50-200 unités | [[Forgeron]] |
| **Mortier** | 100-400 sacs | [[Métiers|Maçon]] |
| **Sculptures / ornements** | 0-30 selon style | [[Sculpteur]] |

---

## 4. Stations + outils

### Stations principales

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Bureau d'études / Table à plans** | Conception plans, calculs | T1+ |
| **Atelier de maquette** | Prototypage 3D miniature | T2+ |
| **Atelier de taille** *(supervision)* | Direction des artisans-chantier | T3+ |
| **Chantier** *(zone monde)* | Lieu de construction effective | T1+ |
| **Bibliothèque architecturale** | Lore-géologique, styles culturels | T4+ (palier Expert) |

### Outils

| Outil | Notes |
|-------|-------|
| **Compas / Équerre / Règle de plomb** | Tracé géométrique |
| **Plomb à fil** | Verticalité sur chantier |
| **Stylet / Plume** *(scriptorium)* | Plans encrés |
| **Maquette modulaire** | Simulation interactive |
| **Treuil de chantier** | Levage pièces lourdes (palier Adepte+) |

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées | Conditions |
|--------|----------------------|------------|
| **1 — Novice** | Plans T1 : cabane, atelier mobile, palissade. Bâtiments simples ≤ 1 niveau | Défaut |
| **2 — Initié** | Plans T2 : maison rurale, échoppe, écurie. Échelle 1-2 niveaux. Premier embauchage de [[Métiers|Charpentier]]/[[Métiers|Maçon]] | Usage : 5 bâtiments T1 livrés |
| **3 — Adepte** | Plans T3 : manoir, taverne, forge complète, bibliothèque communale. Fortifications légères (mur d'enceinte). Coordination 3-5 artisans | Usage : 10 bâtiments T2 + 1 chantier collectif réussi |
| **4 — Expert** | Plans T4 Magistral : palais provincial, donjon, temple mineur, atelier-citadelle de [[Guildes|guilde]]. Coordination 10+ artisans. **Plans signatures** (Phase 4) | Usage : 5 bâtiments T3 + permis nobiliaire |
| **5 — Maître** 🔒 | Plans T5 Légendaires : citadelle, grand temple, bâtiment monumental d'une [[Guildes|guilde]] majeure. T6 Mythique sur quête. **Œuvre patrimoniale** : inscrite dans la géographie de la Partie | **Condition cachée** : ex. concevoir un bâtiment qui survit à un [[Le Souffle|Souffle]] sans dégâts, fonder une école d'architecture (3 apprentis Adeptes formés), restaurer une [[Traces des Ères|Trace de l'Arrachement]] |

### Décroissance et rouille

- Architecte qui n'exerce pas : −1 palier latent après 60 jours sans chantier supervisé
- Post-Souffle : plans en cours subissent ±10% de marge d'erreur supplémentaire 1 semaine

---

## 6. Crafts / recettes débloqués — Échelles de bâtiments canoniques

> **Pivot crucial pour la future branche Architecture.** Ce tableau pose les **5 échelles canoniques** + les variants nationaux à venir.

### Échelles canoniques

| Échelle | Tier | Surface | Niveaux | Coût indicatif Éclats | Durée chantier |
|---------|------|---------|---------|------------------------|------------------|
| **Petite structure** *(cabane, atelier mobile)* | T1 | < 30 m² | 1 | 100-500 | 1-2 jours réels |
| **Bâtiment civil** *(maison, échoppe)* | T2 | 30-100 m² | 1-2 | 1 000-5 000 | 3-5 jours |
| **Manoir / Bâtiment majeur** *(taverne, manoir, forge complète)* | T3 | 100-300 m² | 2-3 | 10 000-50 000 | 10-20 jours |
| **Palais / Donjon** *(palais provincial, temple mineur)* | T4 | 300-1000 m² | 3-5 | 100 000-500 000 | 30-60 jours |
| **Monument / Citadelle** *(citadelle, grand temple)* | T5 | > 1000 m² | 4-8 | 1 000 000+ | 60-180 jours |

> **Pattern coût × durée × tier** : `Coût ≈ 10^Tier × 100 Éclats`. Durée ~`5 × 2^(Tier-1)` jours réels. Cohérent avec les gold-sinks de [[Économie]] §Cat. 4.

### Catégories de bâtiments (échantillon)

| Catégorie | T1 | T2 | T3 | T4 | T5 |
|-----------|-----|-----|-----|-----|-----|
| **Habitat** | Cabane | Maison rurale | Manoir | Palais | — |
| **Commerce** | Échoppe mobile | Échoppe fixe | Taverne | Marché couvert | Halle commerciale |
| **Artisanat** | Atelier mobile | Forge basique | Forge complète | Atelier-citadelle | Cité-forge (Mosrack-style) |
| **Religieux** | Autel | Chapelle | Temple mineur | Temple majeur | Grand Temple (par religion) |
| **Défensif** | Palissade | Mur d'enceinte | Tour de guet | Donjon | Citadelle |
| **Civil** | — | Mairie de village | Mairie de cité | Hôtel de ville | Capitole |

### Pattern recette canonique Architecture

> Tier N requiert : **N catégories d'artisans** + **(N×500) Éclats matériaux** + **N×5 jours chantier** + **palier Mastery requis** + **(N-2 si ≥ T3) permis** auprès noble/faction.

---

## 7. Carrière et débouchés — Mapping vers métiers chantier

> **Anticipation de la branche Architecture future.** Cette section pose la **frontière canonique** Architecte vs métiers chantier.

### Mapping Architecte → métiers chantier

```
[ARCHITECTE] (conçoit, supervise, signe)
     │
     ├── [Charpentier] (charpente bois — toits, poutres, planchers)
     ├── [Menuisier] (menuiserie fine — portes, fenêtres, escaliers)
     ├── [Maçon] (murs, fondations, briquetage)
     ├── [Tailleur de pierre] (blocs taillés, colonnes, dalles)
     ├── [Vitrier] (vitres, vitraux — pivot Religion/Lore)
     ├── [Forgeron] (ferrures, charnières, grilles)
     ├── [Sculpteur] (gargouilles, frises, statues — pivot Sculpteur)
     └── [Couvreur / Tuilier] *(Phase ultérieure)*
```

### Frontière canonique

| Question | Réponse |
|----------|---------|
| L'Architecte pose-t-il la pierre ? | **Non** (sauf petite structure T1 en autonome). Il conçoit et supervise. |
| Un Maçon peut-il bâtir sans Architecte ? | Oui jusqu'à T2 (maison simple). T3+ requiert un plan d'Architecte (palier Adepte+) |
| Qui signe le bâtiment ? | L'Architecte (poinçon de plan). Le Maçon-Maître peut co-signer T4+ |
| Qui paie les artisans-chantier ? | Le **client** (pas l'Architecte). L'Architecte facture la conception + supervision. |

### Évolution joueur

```
[Plan-griffe] → [Architecte de village] → [Architecte de cité] → [Architecte-Maître reconnu] → [Architecte-Légende]
   T1 cabanes      T2 maisons              T3 manoirs              T4 palais/temples           T5 monument inscrit
```

### Débouchés économiques

- **Honoraires de plan** : 5-15% du coût du bâtiment (paie au signing)
- **Honoraires de supervision** : 5% du coût total + bonus de livraison
- **Plans réutilisables** : un plan T3 peut être revendu (50% prix initial à chaque revente)
- **Architecte de [[Guildes|guilde]]** : salaire fixe + commande exclusive de territoire
- **Architecte de cour** : noble paie 10-30 000 Éclats / an pour exclusivité (Reconnaissance Adepte+)

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet sur l'Architecte |
|-----|-------------------------|
| **Verdoiement** (Terranu) | Bâtiments organiques bonifiés : intégration jardins, +10% durabilité bois |
| **Sommeil de Glace** (Climata) | Pas de chantier extérieur en hiver. Focus plans + maquettes |
| **Échos Brisés** (Tempora) | Plans instables : ±10% surface effective vs prévue |
| **Ombre Longue** (Noctis) | Bâtiments défensifs en demande, +20% commande fortifications |
| **Présages** (Fatum) | Recettes rituelles temples bonifiées |

### Par contexte

- **Capitale** : commande pléthorique, marges resserrées, prestige élevé
- **Frontière** : commandes fortification (faction militaire), urgence
- **Zone post-Souffle** : reconstruction massive, +30% demande, prix matières flambés
- **Religion dominante** ([[Lore/Religions/00 - Système Religieux]]) : recettes temple spécifiques par religion (9 styles canoniques)

---

## 9. Économie

### Ratios canoniques

| Palier | Honoraires plan typique | Délai conception | Bâtiment max possible |
|--------|--------------------------|--------------------|------------------------|
| Novice | 50-200 Éclats | 1 jour | T1 |
| Initié | 500-2000 Éclats | 2-3 jours | T2 |
| Adepte | 5 000-20 000 Éclats | 5-10 jours | T3 |
| Expert | 50 000-200 000 Éclats | 15-30 jours | T4 |
| Maître | 500 000-5 000 000 Éclats | 30-90 jours | T5 (T6 sur quête) |

### Gold sinks contribués

- **Construction de structure de [[Guildes|guilde]]** ([[Économie]] Cat. 4) — gros sink
- **Maintenance de territoire de guilde** — l'Architecte facture les réparations cycliques
- **Permis et taxes** auprès des nobles/factions (10-30% du coût total) — partage avec [[Factions]]

### Hôtel des ventes

- **Plans réutilisables** sont des items vendables (catégorie [[Catégories d'Items]] §Consommable §Livre Récipient — un plan = un livre architectural)
- **Maquettes** vendables comme cosmétiques de luxe (~500-5000 Éclats selon échelle)

---

## 10. Comportement IA + signatures PNJ

### Routine Architecte PNJ (Phase 2 prévue)

> Sera ébauchée comme [[Métiers - Forgeron]] / [[Métiers - Boulanger]]. Profil esquissé :

```
[Lever 06:00] → [Bureau d'études matin : plans en cours]
              → [Visite de chantier 10:00-13:00 : supervision artisans]
              → [Repas + clients potentiels (taverne/atelier)]
              → [Après-midi : maquette / négociation noble]
              → [Soir : étude / lecture lore architectural]
              → [Coucher 22:00]
```

### Signatures PNJ (stub Phase 4)

- **Maître Veyran d'Astravia** *(astronome-architecte cité dans [[Le Souffle]])* — signature Ordo Caelum, temples-observatoires
- **Doyen Korr de Mosrack** — Maître canonique, école d'architecture impériale
- **Ystrid la Sépulcrale** *(Vael'Kurash)* — architecte de mausolées et lieux funéraires
- **Hélios de Galenor** — Architecte de cour impérial, palais provinciaux
- **Sadrina la Cendrée** *(Cendara, Ignis Aeternum)* — temples-forges volcaniques

### Apprentis et école

- Architecte-Maître peut fonder une **école d'architecture** (Reconnaissance Maître + bâtiment T4 dédié)
- 3-5 apprentis simultanés possibles, +1 palier potentiel chacun

---

## 11. Décisions ouvertes

- [ ] **Branche Architecture séparée** : ce métier reste-t-il dans Métiers ou bascule en branche dédiée ([[Architecture Data-Driven]] §Constructions Generator) ? Proposition : **archétype-métier ici** + **branche Constructions** Phase suivante (système chantier, blueprint, simulation, durée réelle, état dégradation)
- [ ] **Permis de construire** : obligation systémique ou selon faction/cité ? Proposition : facultatif T1-T2, obligatoire T3+ (cité), T4+ (royal/religieux)
- [ ] **Métiers chantier comme archétypes-métiers ?** Charpentier, Maçon, Tailleur de pierre, Vitrier, Couvreur — actuellement non listés dans les 14 métiers Artisanat (Menuisier oui). Proposition : **les ajouter en Phase suivante** quand la branche Architecture s'ouvrira (4-5 métiers chantier supplémentaires)
- [ ] **Maquettes interactives** : quel système data-driven (procédural [[Architecture Data-Driven]]) ?
- [ ] **Bâtiments persistants par Partie** : un T5 inscrit-il dans l'héritage de la Partie suivante ? Proposition : **oui** (cf. [[Le Souffle]] §Héritage, [[Mort]] §Renom)
- [ ] **Plans templates** : data-driven (Recipe Generator architecture) ou édité main-Phase 4 ?
- [ ] **Échelles canoniques** : 5 paliers retenus — à valider
- [ ] **Frontière Architecte / Sculpteur** sur les ornements monumentaux

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Économie]] · [[Guildes]] · [[Factions]] · [[Architecture Data-Driven]] · [[Le Souffle]] · [[Mort]] · [[Les Ères]] · [[Lore/Religions/00 - Système Religieux]] · [[Menuisier]] · [[Sculpteur]] · [[Forgeron]]*
