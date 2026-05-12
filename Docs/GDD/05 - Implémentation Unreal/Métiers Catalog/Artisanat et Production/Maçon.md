---
tags: [métier, archétype, artisanat, vigueur, endurance, construction, pierre, brique]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Vigueur
stats_secondaires: [Endurance, Acuité, Mémoire]
craft_category: Travail du bois et de la pierre
sources_ressources_accessibles: [Pierre, Brique, Brique réfractaire, Mortier, Argile, Sable, Chaux, Eau, Pierre taillée]
stations_principales: [Atelier de taille, Four à briques, Mortier (cuve), Échafaudage, Chantier]
outils_principaux: [Truelle, Maillet, Burin, Niveau, Plomb à fil, Brouette, Auget]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Architecte, Charpentier, Tailleur de pierre, Forgeron, Sculpteur, Couvreur, Mineur]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Maçon-Architecte-exécutant, frontière-Maçon-Tailleur-de-pierre, mortier-recettes-rituelles]
---

# 🧱 Archétype-Métier — Maçon

> Métier **pivot du chantier** : le Maçon est le **bras qui érige** ce que l'[[Architecte]] a conçu. Sans lui, aucun bâtiment de pierre, aucune voûte, aucun mur d'enceinte. Premier métier d'exécution de la branche [[Architecture/Index|Architecture]] (D-ARCHITECTURE-02).

---

## 1. Vue d'ensemble

Le **Maçon** assemble pierres, briques et mortier pour construire **murs porteurs, voûtes, fondations, cheminées, fours, ponts**. Il travaille majoritairement sur chantier (rarement en atelier) sous la supervision d'un [[Architecte]] dès le tier 3+. Il peut bâtir seul un T1-T2 (cabane, maison de village).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Mineur]] (pierre brute, argile), [[Tailleur de pierre]] (blocs taillés haut tier), [[Bûcheron]] (paille pour torchis, bois pour échafaudages), [[Forgeron]] (ferrures, ancrages, clous)
- **Aval** : [[Architecte]] (qui orchestre les chantiers), occupants finaux (joueurs propriétaires, [[Guildes|guildes]]), [[Couvreur]] (qui pose la toiture sur les murs maçonnés)
- **Frontière joueur/PNJ** : un Maçon joueur peut exécuter directement T1-T2 ; pour T3+ il devient l'**exécutant principal** sous direction d'Architecte

**Identité gameplay :**
- Métier **physique brut** — `Vigueur` (port de pierres, frappe au maillet), `Endurance` (journées entières sur chantier au soleil), `Acuité` (alignement, niveau, dosage mortier), `Mémoire` (recettes mortier, motifs d'appareillage)
- Métier **collectif** : fonctionne en équipe (apprenti porteur, compagnon poseur, maître appariteur). Cohérent avec [[Mapping Métiers de Construction]] §Chaîne de chantier.
- Métier **structurant l'économie locale** : tout village a un Maçon ; sans lui, pas de cheminée durable, pas de four à pain, pas de mur d'enceinte.

**Ancrage culturel :** Mosrack (école Lex Petra, Murailles Rouges de Vermilis), Altram (pierre noire d'Alkaran, fortins compacts), Cendara (basalte volcanique), Lumasar (académies en pierre blanche).

---

## 2. Stats brutes & Maîtrises associées

### Stats brutes ([[Personnage]] couche 1)

| Stat | Rôle dans le métier | Magnitude |
|------|----------------------|-----------|
| **Vigueur** *(principale)* | Port de pierres lourdes, frappe au maillet sur burin, compactage mortier | Direct — plafonne la vitesse de pose et la taille des pièces manipulées |
| **Endurance** *(principale)* | Journées 10+ heures sur chantier, intempéries | Direct — plafonne durée de session avant fatigue Labeur |
| **Acuité** *(secondaire)* | Lecture niveau, alignement, dosage mortier précis | Multiplicative — qualité structurelle du mur (taux de fissure, durée de vie) |
| **Mémoire** *(secondaire)* | Recettes mortier (chaux/sable/eau ratio), motifs d'appareillage culturels | Débloque palier Expert+ |

### Maîtrises contextuelles ([[Personnage]] couche 2)

- **`Maîtrise_Maçonnerie`** — racine du métier (assemblage pierre/brique/mortier)
- **`Maîtrise_Mortier`** — sous-maîtrise (recettes par climat, mortier réfractaire pour fours/forges)
- **`Maîtrise_Voûtes`** — sous-maîtrise architecturale (T3+ : voûtes en berceau, croisées, dômes)
- **`Maîtrise_Fortification`** — sous-maîtrise défensive (murs d'enceinte, donjons — partagée avec [[Architecte]] §Maîtrise_Fortification)

> **Cohérent avec [[Personnage]]** : `Qualité de pose = Vigueur × Acuité × Maîtrise_Maçonnerie`. Un Maçon Vigueur 70, Acuité 60, Maîtrise palier 4 produit du **Magistral structurel** (durabilité × 2 vs Novice).

---

## 3. Sources de ressources

> Voir [[Sources de Ressources]] §Fabrication et [[Matériaux de Construction]].

### Intrants principaux

| Intrant | Source | Notes |
|---------|--------|-------|
| [[Pierre]] (récolte nature) | [[Mineur]] / carrière | Pierre brute, à équarrir grossièrement sur chantier |
| **Pierre taillée** | [[Tailleur de pierre]] | Blocs prêts à poser pour murs nobles T3+ |
| [[Brique]] (Fabriqué) | **Le Maçon lui-même** (production de briques) | Argile + Sable + Chaleur — voir [[Sources de Ressources]] §Fabrication |
| **Brique réfractaire** | Maçon Adepte+ | Variant pour fours, forges, cheminées (T3+) |
| **Mortier** | Maçon (chaux + sable + eau) | Liant — recette par climat (mortier ordinaire, mortier de chaux maritime, mortier romain à la pouzzolane) |
| **Argile** | Récolte nature (carrière d'argile) | Intrant brique |
| **Chaux** | Cuisson de pierre calcaire | Intrant mortier |
| **Sable** | Variant de Pierre concassée | Intrant brique + mortier — voir [[Matériaux de Construction]] §Cas particuliers |
| **Eau** | Liquide | Intrant mortier |
| **Bois (échafaudage)** | [[Bûcheron]] | Consommable de chantier (récupérable post-construction) |

### Outputs (production directe Maçon)

- **Brique** standard (intermédiaire fabriqué — vendable à d'autres Maçons ou Architecte)
- **Brique réfractaire** (Adepte+) — intrant des [[Forgeron|forges]], [[Boulanger|fours à pain]], [[Verrier|verreries]]
- **Mur** (élément de construction directe)
- **Voûte / Coupole** (T3+)
- **Pont en pierre** (T3+ frontière [[Charpentier]] qui fait les ponts en bois)
- **Cheminée / Four** (T2+)
- **Fortification** (mur d'enceinte, tour, donjon — T3+ avec Architecte)

---

## 4. Stations + outils

### Stations principales

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Atelier de taille** *(supervision)* | Équarrir pierre brute, finir blocs | T2+ |
| **Four à briques** | Cuisson briques argile / réfractaires | T2+ (basique), T4+ (réfractaire) |
| **Cuve à mortier** | Mélange chaux/sable/eau | T1+ |
| **Échafaudage** *(consommable de chantier)* | Accès en hauteur | T2+ (échafaudage simple), T4+ (échafaudage haute hauteur cathédrale) |
| **Chantier** *(zone monde)* | Lieu de construction effective | T1+ |

### Outils du Maçon

| Outil | Catégorie | Notes |
|-------|-----------|-------|
| **Truelle** | [[Catégories d'Items]] §Outils | Outil signature — pose mortier |
| **Maillet** | Outils | Frappe sur burin / pierre |
| **Burin** | Outils | Équarrissage rapide (frontière fine [[Tailleur de pierre]]) |
| **Niveau / Plomb à fil** | Outils | Vérification verticalité / horizontalité (partagé [[Architecte]]) |
| **Brouette** | Outils | Transport pierres et mortier sur chantier |
| **Auget** | Outils | Petite cuve portable de mortier |

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées | Conditions |
|--------|----------------------|------------|
| **1 — Novice** | Pose de briques alignées, mur droit jusqu'à 3 m, cheminée simple, fondations basiques. Mortier ordinaire seulement. Taux échec ~15% | Défaut |
| **2 — Initié** | Murs jusqu'à 6 m, voûte en berceau simple, four à pain, mur d'enceinte rural. Production de briques standard. Taux échec ~10% | Usage : 50 murs/structures réussis |
| **3 — Adepte** | **Brique réfractaire** débloquée (forges, fours haute température). Voûtes croisées, coupole simple, ponts en pierre courts. Coordination avec [[Architecte]]. Taux échec ~5% | Usage + condition : 200 chantiers + 1 voûte tenue (sans effondrement post-construction) |
| **4 — Expert** | Mortier signature (variants par culture — mortier altramian, mortier mosrack rouge), voûtes complexes (cathédrales provinciales), murs porteurs sur 3+ étages. Co-signature de plans T4 avec Architecte Expert. Taux échec ~2% | Usage + condition : 500 chantiers + co-signer 1 cathédrale ou donjon |
| **5 — Maître** 🔒 | Voûtes monumentales, coupoles cathédrales, murailles signature (Murailles Rouges, fortins de cendre compactée), restauration de Trace architecturale. Procs T6 sur quête | **Condition cachée** : ex. ériger un mur qui survit à un [[Le Souffle|Souffle]] sans fissure, restaurer une [[Traces des Ères|Trace de l'Arrachement]] architecturale, fonder une école Lex Petra (3 apprentis Adeptes formés) |

> **Décroissance** : −1 palier latent après 60 jours sans chantier supervisé. Rouille post-Souffle : voûtes en cours d'élévation +20% risque effondrement la 1ère semaine post-Souffle.

---

## 6. Crafts/recettes débloqués

> Voir [[Crafts]] §7 *Travail du bois et de la pierre* pour la taxonomie. Le Maçon produit l'**élément de construction** (brique, mur, voûte) ; l'[[Architecte]] orchestre l'ensemble.

### Recettes signature par palier

| Palier | Production directe | Construction-cible |
|--------|--------------------|---------------------|
| **Novice** | Mortier ordinaire (1 chaux + 3 sable + eau), Brique standard (1 argile + 1 sable + cuisson 12h) | Mur droit, fondation, cheminée simple |
| **Initié** | Brique cuite haute densité, mortier de chaux maritime | Voûte en berceau, four à pain, mur d'enceinte rural |
| **Adepte** | **Brique réfractaire** (argile + chamotte + cuisson 24h), mortier réfractaire (haute température) | Forge complète, four à pain communal, verrerie, voûte croisée |
| **Expert** | Mortier signature culturel (rouge de Vermilis, noir de Cendara, blanc de Lumasar) | Cathédrale provinciale, donjon, palais |
| **Maître** | Mortier rituel (mortier consacré [[Lex Petra]]), brique de pierre-cicatrice (Trace) | Cathédrale capitale, citadelle, monument inscrit |

### Pattern recette canonique Maçonnerie

> Tier N requiert : **N×2 unités de pierre/brique** + **(N-1) sacs de mortier** + **(N×4) heures chantier** + **palier Mastery requis**. Cohérent avec [[Échelles et Niveaux]] §Durée de chantier.

**Mini-jeu** : alignement (curseur précision niveau), dosage mortier (jauge ratio chaux/sable/eau), frappe maillet (timing). Échec = mur penché, fissure, voûte effondrée à la pose.

---

## 7. Carrière et débouchés

### Échelle d'évolution joueur

```
[Apprenti porteur] → [Maçon de village] → [Maçon de cité] → [Maçon-Maître] → [Maçon-Légende d'une nation]
        ↓                  ↓                  ↓                   ↓                   ↓
   Pose de briques     Murs/cheminées      Voûtes/forges      Cathédrales         Murailles signature
   Échafaudage         Maison T2           Manoir T3          Palais T4           Œuvre patrimoniale T5+
```

### Débouchés économiques

- **Maçon de village** : commande régulière (cheminée, four, mur de jardin) — 50-500 Éclats par chantier
- **Maçon de cité** : chantiers de 1-3 mois sous Architecte — salaire + part du gâteau
- **Maçon de [[Guildes|guilde]]** : construction de quartier-général, fortifications de territoire
- **Maçon-Restaurateur** *(spécialisation Maître)* — voir [[Mapping Métiers de Construction]] : restauration de Traces architecturales post-Souffle, archéologie active
- **Briquetier** *(sous-spécialisation)* : production massive de briques, ne pose pas — fournit les autres Maçons

### Métiers complémentaires fortement liés

- **[[Architecte]]** — chef de chantier, indispensable T3+ (frontière : Architecte conçoit, Maçon érige)
- **[[Tailleur de pierre]]** — fournisseur des blocs nobles (frontière : Tailleur de pierre prépare le bloc, Maçon le pose)
- **[[Charpentier]]** — la charpente bois repose sur les murs maçonnés (collaboration sur tout chantier)
- **[[Forgeron]]** — fournisseur de ferrures (ancrages, herses, charnières)
- **[[Sculpteur]]** — ornements de façade (frontière : le Maçon laisse des emplacements, le Sculpteur orne)
- **[[Couvreur]]** — pose la toiture sur les murs (sous-spécialisation possible de Charpentier)

---

## 8. Modulation par contexte

### Par ère active ([[Les Ères]])

| Ère | Effet sur le Maçon |
|-----|---------------------|
| **Verdoiement** (Terranu) | Mortier végétal possible (intégration mousses, lichens) ; +10% durabilité humide |
| **Sommeil de Glace** (Climata) | Mortier gèle ; chantiers extérieurs suspendus l'hiver, focus production briques |
| **Feu Endormi** (Eldoria) | Briques réfractaires +20% qualité, mortier rouge de cendre |
| **Échos Brisés** (Tempora) | Voûtes instables : ±10% risque fissure post-pose |
| **Ombre Longue** (Noctis) | Fortifications en demande (+20% commandes), motifs sombres |
| **Brume Mortelle** (Umbra) | Mortier osseux (recettes nécromantiques rares) |

### Par religion

- **[[Lore/Religions/Lex Petra]]** : religion de la pierre — Maçon central, recettes consacrées, mortier béni, Reconnaissance bonifiée
- **Vael Kurash** : tabou sur certaines pierres tombales (rituels d'apaisement requis)
- **Foedus Animae** : pierre vivante (carrières conscientes) — extraction rituelle obligatoire

### Par faction / contexte

- **[[Guildes]] de construction** : commandes régulières (avant-postes, forts) — flux Éclats stable
- **Cours nobles** : commandes prestigieuses (palais, manoirs) — marges élevées
- **Zone post-Souffle** : reconstruction massive, demande +30%, prix matières flambés (cohérent [[Architecte]] §8)

---

## 9. Économie

### Marges typiques

| Palier | Coût matériaux/chantier | Vente moyenne | Marge typique |
|--------|--------------------------|----------------|----------------|
| Novice | 20-50 Éclats (cheminée) | 50-150 Éclats | ~50% |
| Adepte | 500-2000 Éclats (forge complète) | 2000-8000 Éclats | ~70% |
| Maître | 50 000+ Éclats (cathédrale) | 200 000+ Éclats | ~75% (hors honoraires Architecte) |

### Gold sinks contribués

- **Brique standard** : prix unitaire 1-3 Éclats, vendue en lots de 100 — cash flow régulier
- **Brique réfractaire** : 5-15 Éclats l'unité, marges +50% vs standard
- **Réparation post-Souffle** : revenu massif récurrent
- **Mortier signature** : 50-500 Éclats le sac selon culture

### Chaîne économique

```
[Mineur (pierre)] / [Bûcheron (chaux/sable variants)] / [Tailleur de pierre (blocs nobles)]
                ↓
              [MAÇON] (briques + mortier + pose)
                ↓
        [Architecte] (orchestration) + [Charpentier / Couvreur / Forgeron / Sculpteur]
                ↓
        [Bâtiment livré au client (joueur, guilde, noble)]
```

---

## 10. Comportement IA / signatures PNJ

### Cycle quotidien type

```
[05:30 lever — réveil tôt pour la fraîcheur du chantier]
[06:00-12:00 chantier matin : pose briques, mortier, montée d'échafaudage]
[12:00-13:30 pause repas + sieste]
[13:30-18:00 chantier après-midi : finition, alignement, niveau]
[18:00-19:00 nettoyage outils, rangement chantier]
[19:00-22:00 taverne/atelier — souvent au cœur de la communauté ouvrière]
[22:00 coucher tôt]
```

### Signatures PNJ canoniques (5 PNJ — pays différents)

- **Maître Korben de Mosrack** (Galenor) — signataire des Murailles Rouges de Vermilis, mortier rouge canonique, école Lex Petra de Mosrack
- **Vorga la Compactée** (Altram, Alkaran) — fortins de cendre, technique de la pierre noire, fournisseuse des Guildes martiales du Nord
- **Sintia di Caëspia** (Evertia) — Maître Maçonne du palais impérial, voûtes signature à motifs floraux
- **Padron Hesteban d'Onarae** — voûtes maritimes en mortier de chaux à la pouzzolane, ports et phares
- **Kelvin le Restaurateur de Lumasar** — Maçon-Restaurateur, archéologie architecturale active sur les Tours d'Astravia (Traces des Ères)

### Pour les joueurs aspirant Maître

- Quêtes signatures par cité (chaque cité notable a son Maçon-Maître apprenable)
- Apprentissage chez un Maître débloque +1 palier potentiel
- Co-chantier avec Architecte Expert+ accélère la progression palier (×1.5)

---

## 11. Décisions ouvertes

- [ ] **Frontière Maçon / Architecte** : confirmée comme conçoit vs érige. Cas limite : un Maçon Maître peut-il signer un plan T4 sans Architecte ? **Proposition** : oui, mais cumul des deux Maîtrises (Architecte + Maçon) requis
- [ ] **Frontière Maçon / Tailleur de pierre** : Tailleur prépare le bloc fin, Maçon le pose. Cas limite : équarrissage rapide sur chantier — du ressort du Maçon ; taille fine de chapiteaux/colonnes — du ressort du Tailleur de pierre
- [ ] **Brique réfractaire** : recette unique ou variants par usage (forge / four / verrerie) ? **Proposition** : recette de base + 3 variants déblocables au palier Expert
- [ ] **Maçon-Restaurateur** : sous-spécialisation Maître ou métier dédié ? Cohérent [[Mapping Métiers de Construction]] §D-MÉTIERS — **Proposition** : sous-spécialisation Palier 5+
- [ ] **Mortier rituel [[Lex Petra]]** : effets gameplay quantifiés (durabilité +X%, résistance siège, etc.) à playtester
- [ ] **Calibration paliers** : seuils d'usage (50/200/500 chantiers) à playtester
- [ ] **Production de briques** : Maçon seul ou métier briquetier dédié ? **Proposition** : sous-spécialisation Maçon palier 2-3 (briquetier non-poseur)

---

*Liens : [[Métiers]] · [[Architecture/Index|Architecture]] · [[Catégories de Constructions]] · [[Échelles et Niveaux]] · [[Matériaux de Construction]] · [[Mapping Métiers de Construction]] · [[Architecte]] · [[Tailleur de pierre]] · [[Charpentier]] · [[Sculpteur]] · [[Forgeron]] · [[Mineur]] · [[Brique]] · [[Pierre]] · [[Crafts]] · [[Sources de Ressources]] · [[Le Souffle]] · [[Lore/Religions/Lex Petra]] · [[Traces des Ères]]*
