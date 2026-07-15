---
tags: [métier, archétype, artisanat, acuité, endurance, verre, vitrail, soufflage]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Acuité
stats_secondaires: [Endurance, Vigueur, Mémoire]
craft_category: Verrerie
sources_ressources_accessibles: [Sable, Pierre concassée, Pigment, Plomb (sertis), Charbon, Bois (combustible), Plaque de verre, Gemme taillé (lentilles)]
stations_principales: [Four à verre, Marbre de verrier, Établi de verrier, Bac de recuit]
outils_principaux: [Canne de soufflage, Pince à mâchoire, Cisailles à verre, Pontil, Mailloche]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Architecte, Maçon, Astronome, Apothicaire, Lapidaire, Sertisseur, Bijoutier]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Verrier-Vitrier, lentilles-instruments-précision, vitraux-co-craft-Sertisseur]
---

# 🔮 Archétype-Métier — Verrier

> Métier du **feu et de la transparence**. Le Verrier souffle, coule, taille le verre — depuis la **plaque de fenêtre** jusqu'aux **lentilles d'instruments de précision** ([[Astronome]], [[Apothicaire]]) et **vitraux** des cathédrales. Produit la [[Plaque de verre]] (Fabriqué — voir [[Sources de Ressources]] §Fabrication).

---

## 1. Vue d'ensemble

Le **Verrier** transforme **sable + chaleur** en verre, sous toutes ses formes : plaques planes (fenêtres), pièces soufflées (fioles, bouteilles, lustres), vitraux colorés, lentilles optiques. Métier ancien, exigeant, lié à la pyrotechnie domestiquée — il partage la maîtrise du feu avec [[Forgeron]], [[Boulanger]], [[Maçon]] (briques réfractaires).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Mineur]] (sable, soude, potasse), [[Bûcheron]] (charbon de bois — combustible), [[Maçon]] (brique réfractaire pour le four), [[Pigment]] / [[Apothicaire]] (oxydes colorants)
- **Aval** :
  - [[Architecte]] (vitrages d'habitations, vitraux T4+ de cathédrales — voir [[Catégories de Constructions]] §Religieux)
  - [[Apothicaire]] (fioles, alambic, cornues en verre)
  - [[Astronome]] (lentilles, oculaires d'observatoire)
  - [[Alchimiste]] (verrerie scientifique)
  - [[Sertisseur]] (vitraux co-craft : Verrier coule, Sertisseur appose le plomb)
- **Frontière joueur/PNJ** : Verrier joueur produit en atelier ; un Verrier-Vitrier itinérant pose sur chantier (voir §11 frontière)

**Identité gameplay :**
- Métier **précision sous chaleur extrême** — `Acuité` (timing du soufflage, lecture viscosité), `Endurance` (chaleur du four), `Vigueur` (canne de soufflage et masses fondues), `Mémoire` (recettes de couleur, temperatures de coulée)
- Métier **double output** : intermédiaire fabriqué (Plaque de verre standardisée) **+** pièces signature soufflées (œuvres d'art)
- Métier **stratégique** : sans Verrier, pas d'instruments scientifiques ([[Astronome]] et [[Apothicaire]] dépendent de lui)

**Ancrage culturel :** Astravia (Verre d'Astravia, vitraux astronomiques), Cendara (Verre noir volcanique), Lumasar (lentilles d'académie), Onara (verreries marines à fioles teintées).

---

## 2. Stats brutes & Maîtrises associées

### Stats brutes

| Stat | Rôle | Magnitude |
|------|------|-----------|
| **Acuité** *(principale)* | Timing soufflage, lecture viscosité, précision dosage colorants | Direct — qualité de la pièce finale, pureté du verre |
| **Endurance** *(principale)* | Chaleur du four (8h face à 1200°C), inhalation possible | Direct — durée de session avant fatigue Labeur |
| **Vigueur** *(secondaire)* | Manipulation canne de soufflage chargée, port de plaques chaudes | Multiplicative — taille des pièces réalisables |
| **Mémoire** *(secondaire)* | Recettes pigments + oxydes (cuivre = vert, cobalt = bleu, manganèse = violet), températures précises | Débloque palier Expert+ |

### Maîtrises contextuelles

- **`Maîtrise_Verrerie`** — racine du métier
- **`Maîtrise_Soufflage`** — sous-spécialisation des pièces soufflées (fioles, bouteilles, lustres, œuvres d'art)
- **`Maîtrise_Vitrail`** — sous-spécialisation des vitraux colorés (frontière co-craft [[Sertisseur]])
- **`Maîtrise_Optique`** — sous-spécialisation lentilles et instruments de précision (frontière [[Astronome]], [[Apothicaire]])

> **Cohérent avec [[Personnage]]** : `Qualité de la pièce = Acuité × Mémoire × Maîtrise_Verrerie`. Un Verrier Acuité 80, Mémoire 70, palier 4 produit du **Magistral** (verre sans bulle, transparence parfaite).

---

## 3. Sources de ressources

### Intrants principaux

| Intrant | Source | Notes |
|---------|--------|-------|
| **Sable** (silice) | [[Mineur]] / récolte (variant Pierre concassée — voir [[Matériaux de Construction]] §Cas particuliers) | Brique de base — qualité variable selon gisement |
| **Soude / Potasse** | Récolte nature (cendre végétale) | Fondant — abaisse température fusion |
| **Chaux** | Cuisson de pierre calcaire | Stabilisant (verre durable) |
| **Charbon de bois** | [[Bûcheron]] | Combustible four — toutes recettes |
| **Pigment / Oxyde métallique** | [[Pigment]] / [[Apothicaire]] | Cuivre (vert), Cobalt (bleu), Manganèse (violet), Or (rouge rubis) |
| **Plomb** | [[Forgeron]] / [[Mineur]] | Sertis pour vitraux (frontière [[Sertisseur]]) |
| **Lingot d'or** | [[Forgeron]] | Verre rouge rubis (Maître seulement) |
| **Cristaux cosmiques** | Drop d'ère / Trace | Verre cosmique T6 (uniquement Maître + Trace) |

### Outputs (production directe)

- **[[Plaque de verre]]** (intermédiaire fabriqué — vendable à l'[[Architecte]] / [[Maçon]] pour fenêtrage)
- **Vitrail** (T3+) — assemblage co-craft avec [[Sertisseur]] possible
- **Fiole / bouteille / cornue** — verrerie d'[[Apothicaire]] et [[Alchimiste]]
- **Lentille** (T3+) — instrument optique pour [[Astronome]] / [[Apothicaire]]
- **Lustre / Pendant** — décor architectural haut tier
- **Œuvre d'art soufflée** — sculpture de verre, signature
- **Verre cosmique** (T6) — Verre d'Astravia, Verre noir de Cendara — voir [[Matériaux de Construction]] §Niveau 6

---

## 4. Stations + outils

### Stations principales

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Four à verre** | Fusion sable → verre liquide (1100-1500°C) | T1+ (basique), T3+ (four à creusets multiples), T5+ (four signature) |
| **Marbre de verrier** | Plaque de marbre où on roule la masse en fusion | T1+ |
| **Établi de verrier** | Assemblage à froid, taille, finition | T2+ |
| **Bac de recuit** | Refroidissement contrôlé (évite la casse) | T2+ |
| **Atelier mobile de souffleur** | Verrerie de campagne | Qualité plafonnée à T2 |

### Outils

| Outil | Catégorie | Notes |
|-------|-----------|-------|
| **Canne de soufflage** | Outils | Outil signature — long tube creux |
| **Pince à mâchoire** | Outils | Mise en forme à chaud |
| **Cisailles à verre** | Outils | Taille à froid |
| **Pontil** | Outils | Tige de support pour pièces fines |
| **Mailloche** | Outils | Aplatissement pour plaques planes |
| **Soufflet** | Outils | Attiser le four — partagé [[Forgeron]] (voir [[Forgeron]] §4) |

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées | Conditions |
|--------|----------------------|------------|
| **1 — Novice** | Verre commun (vert-bouteille), [[Plaque de verre]] simple, fioles basiques. Bulles fréquentes. Taux échec ~20% | Défaut |
| **2 — Initié** | Verre transparent purifié, plaques pour vitrage standard, bouteilles, gobelets. Premiers colorants (cuivre = vert, cobalt = bleu) | Usage : 50 pièces réussies |
| **3 — Adepte** | **Lentille optique** débloquée (oculaire pour [[Astronome]] / [[Apothicaire]]), vitrail simple (mosaïque de verre coloré), lustre 5 branches | Usage + condition : 200 pièces + 1 lentille livrée fonctionnelle |
| **4 — Expert** | Vitrail figuratif (cathédrale provinciale), verre rouge rubis (à l'or), lentille de précision (téléscope, microscope), œuvres d'art soufflées signature. Co-craft [[Sertisseur]] | Usage + condition : 500 pièces + 1 vitrail co-signé |
| **5 — Maître** 🔒 | Verre cosmique (Verre d'Astravia, Verre noir de Cendara), vitrail monumental (cathédrale capitale), lentilles cosmiques alignées sur constellations. Procs T6 | **Condition cachée** : ex. souffler une œuvre sous éruption volcanique active (Cendara), produire un vitrail qui survit à un Souffle Cardinal sans casse, créer une lentille révélant une constellation disparue (avec [[Astronome]] Maître) |

> **Décroissance** : −1 palier latent après 60 jours sans atelier actif. Rouille post-Souffle : taux de bulle doublé la 1ère semaine.

---

## 6. Crafts/recettes débloqués

> Voir [[Crafts]] §7 *Travail du bois et de la pierre* (Verrerie y est listée). Le Verrier produit l'**intermédiaire** ([[Plaque de verre]]) **+** pièces finies (fioles, lentilles, vitraux).

### Recettes signature par palier

| Palier | Production | Cible |
|--------|------------|--------|
| **Novice** | [[Plaque de verre]] commune (sable + soude + chaleur 1200°C, 4h) | Fenêtrage T2, fioles basiques |
| **Initié** | Plaque de verre purifiée, fiole [[Apothicaire]] graduée, gobelet | Vitrage T3, alchimie |
| **Adepte** | Lentille convexe simple, vitrail mosaïque, lustre 5 branches | Observatoire, cathédrale T3 |
| **Expert** | Lentille de précision (10x), vitrail figuratif, verre rubis à l'or | Téléscope, cathédrale T4, palais |
| **Maître** | Verre cosmique, vitrail monumental, lentille cosmique | Trace architecturale, monument T5+ |

### Pattern recette canonique Verrerie

> Tier N requiert : **N×2 unités de sable** + **N unités de fondant** + **(N×3) charbon** + **(N-1) pigments** + **temps de fusion 1-12h** + **palier Mastery requis**.

**Mini-jeu** : timing (température montée/descente), souffle (rythme respiration), rotation canne (cadence régulière), pinçage (précision). Échec = bulles, fissure au refroidissement, couleur ratée.

---

## 7. Carrière et débouchés

### Échelle d'évolution joueur

```
[Apprenti souffleur] → [Verrier de village] → [Verrier de cité] → [Maître Verrier] → [Verrier-Légende]
        ↓                  ↓                     ↓                   ↓                   ↓
   Plaques basiques    Fioles/vitrage         Lentilles/vitraux    Vitraux cathédrale  Verre cosmique
                                                                    Œuvres signature    Trace inscrite
```

### Débouchés économiques

- **Verrier de village** : commande régulière (fenêtre, fiole, bouteille) — 5-50 Éclats par pièce
- **Verrier de cité** : vitraux et lentilles (chaîne avec [[Astronome]] / [[Apothicaire]])
- **Verrier-Vitrier itinérant** *(sous-spécialisation possible)* : pose sur chantier les vitraux qu'il a coulés (frontière voir §11)
- **Verrier de cathédrale** : exclusivité religieuse (Reconnaissance ≥ Adepte)
- **Verrier d'académie** : exclusivité savoir (Lumasar, Astravia)
- **Verrier-Légende** : œuvre signature inscrite dans l'héritage ([[Le Souffle]] §Héritage)

### Métiers complémentaires fortement liés

- **[[Architecte]]** — client direct (vitrages T3+, vitraux cathédrale)
- **[[Maçon]]** — collaboration sur fenêtrage (Maçon laisse l'ouverture, Verrier pose la plaque)
- **[[Astronome]]** — client critique (lentilles d'observatoire, frontière `Maîtrise_Optique`)
- **[[Apothicaire]]** — client régulier (fioles, alambic en verre, lentilles de loupe)
- **[[Alchimiste]]** — verrerie scientifique (cornues, retortes)
- **[[Sertisseur]]** — co-craft vitrail (Verrier coule, Sertisseur appose le plomb)
- **[[Bijoutier]]** — verre coloré comme imitation gemme (frontière marché bas/moyen tier)
- **[[Lapidaire]]** — partage `Maîtrise_Optique` (taille gemmes vs taille verre)

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet sur le Verrier |
|-----|-----------------------|
| **Feu Endormi** (Eldoria) | +20% qualité fusion, recettes verre rubis bonifiées |
| **Cieux Lus** (Stellaris) | Lentilles d'observation +25% qualité, recettes Verre d'Astravia accessibles |
| **Sommeil de Glace** (Aquor) | Chaleur du four luttant contre le froid : −10% rendement, +15% durabilité au refroidissement |
| **Verdoiement** (Terranu) | Recettes verre vert (pigment cuivre végétal) bonifiées |
| **Brume Mortelle** (Umbra) | Verre opaque/sombre en demande, recettes Verre noir |
| **Échos Brisés** (Tempora) | Vitraux instables : ±10% taux casse au recuit |

### Par culture / faction

- **Astravia** : Verre d'Astravia signature, vitraux astronomiques, école Aerion
- **Cendara** : Verre noir volcanique, frontière Ignis Aeternum
- **Lumasar** (Galenor) : lentilles d'académie, frontière savoir
- **Onara** : verreries marines (fioles teintées résistantes au sel)

### Par religion

- **[[Lore/Religions/00 - Système Religieux|Religions cosmiques]]** : vitraux figuratifs représentant les Cosmiques — recettes consacrées par religion (9 styles)
- **Lex Petra** : peu d'intérêt pour le verre, frontière sceptique
- **Foedus Animae** : fioles d'âme (verrerie rituelle pour réceptacles d'âme)

---

## 9. Économie

### Marges typiques

| Palier | Coût intrants | Vente moyenne | Marge |
|--------|---------------|----------------|--------|
| Novice | 5 Éclats (sable + charbon) | 20 Éclats (plaque) | ~75% |
| Adepte | 50 Éclats | 200-500 Éclats (lentille) | ~80% |
| Maître | 5 000 Éclats (verre cosmique) | 100 000+ Éclats (vitrail monumental) | ~90% |

### Gold sinks contribués

- **Casse au recuit** : perte de pièce — incitation à la maîtrise
- **Charbon** consommation continue
- **Pigments rares** (or, cobalt) : 50-500 Éclats par lot
- **Réparation vitraux** post-Souffle : revenu récurrent

### Chaîne économique

```
[Mineur (sable, oxydes)] / [Bûcheron (charbon)] / [Maçon (briques réfractaires)]
                                ↓
                            [VERRIER]
                                ↓
        ┌───────────────────────┼───────────────────────┐
        ↓                       ↓                       ↓
   [Architecte/Maçon]      [Astronome/Apothicaire]   [Sertisseur (vitraux)]
   (vitrage)               (lentilles, fioles)       (cathédrales)
```

---

## 10. Comportement IA / signatures PNJ

### Cycle quotidien

```
[04:30 lever — allumer le four (montée 4h pour T° fusion)]
[08:30-12:30 soufflage matin (chaleur maxi, pic de production)]
[12:30-13:30 pause repas (court, four laissé en chaleur)]
[13:30-17:30 finition à froid + vitraux à l'établi]
[17:30-19:00 recuit pièces du jour, étouffement progressif du four]
[19:00-22:00 vie sociale — souvent peu (épuisement chaleur)]
[22:00 coucher tôt]
```

### Signatures PNJ canoniques (5 PNJ — pays différents)

- **Maître Lyssara d'Astravia** — signataire du Verre d'Astravia, lentilles cosmiques alignées sur constellations disparues, fournisseuse des Tours d'Astravia (Trace)
- **Cinder le Volcanique de Cendara** — Maître du Verre noir, école Ignis Aeternum, vitraux des Temples des Flammes Éternelles
- **Maîtresse Veylinn de Lumasar** (Galenor) — Verrière des Académies, lentilles de précision pour Astronomes et Apothicaires
- **Old Halger des Ports d'Onara** — verreries marines, fioles graduées, technique du recuit en eau de mer
- **Sera la Sertie de Caëspia** (Evertia) — Maîtresse Verrière des vitraux impériaux, co-craft avec Sertisseur royal

---

## 11. Décisions ouvertes

- [ ] **Frontière Verrier / Vitrier** : cohérent avec [[Mapping Métiers de Construction]] §D-MÉTIERS-04. **Proposition** : sous-spécialisation Verrier (Verrier = matière + soufflage ; Vitrier = pose et assemblage sur chantier). Un Verrier-Vitrier joueur peut faire les deux, mais un Verrier d'atelier sédentaire reste possible
- [ ] **Lentilles d'instruments** : co-craft obligatoire avec [[Astronome]] / [[Apothicaire]] ou Verrier seul ? **Proposition** : Verrier seul (palier Adepte+) suffit pour la lentille, le client l'intègre à son instrument
- [ ] **Vitraux** : co-craft obligatoire avec [[Sertisseur]] (plomb) ou Verrier autonome ? **Proposition** : sertissage = sous-spé Sertisseur, mais Verrier-Maître peut sertir lui-même (palier 5)
- [ ] **Verre cosmique** (Verre d'Astravia, Verre noir de Cendara) : recette fixe ou variants par Trace ? **Proposition** : 5 variants minimum (un par grande Trace de [[Traces des Ères]])
- [ ] **Casse au recuit** : mécanique exacte (taux par palier, possibilité de récupération du verre brisé) ? À playtester
- [ ] **Calibration paliers** : 50/200/500 pièces à valider
- [ ] **Verrier rituel** : Verrier-Maître + Enchanteur pour vitraux cosmiques — séquence rituelle exacte ? Phase 3

---

*Liens : [[Métiers]] · [[Architecture/Index|Architecture]] · [[Catégories de Constructions]] · [[Matériaux de Construction]] · [[Mapping Métiers de Construction]] · [[Plaque de verre]] · [[Architecte]] · [[Maçon]] · [[Astronome]] · [[Apothicaire]] · [[Alchimiste]] · [[Sertisseur]] · [[Bijoutier]] · [[Lapidaire]] · [[Forgeron]] · [[Mineur]] · [[Bûcheron]] · [[Crafts]] · [[Sources de Ressources]] · [[Le Souffle]] · [[Traces des Ères]] · [[Lore/Religions/00 - Système Religieux]]*
