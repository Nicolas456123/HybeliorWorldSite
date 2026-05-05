---
tags: [métier, archétype, artisanat, vigueur, acuité, bois, charpente, construction]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Vigueur
stats_secondaires: [Acuité, Endurance, Mémoire]
craft_category: Travail du bois et de la pierre
sources_ressources_accessibles: [Bois, Planche, Bois précieux, Résine traitée, Lingot (ferrures), Cuir tanné (sangles)]
stations_principales: [Atelier de charpenterie, Scierie, Tréteaux de levée, Chantier]
outils_principaux: [Hache de charpentier, Herminette, Scie de long, Tarière, Maillet, Équerre, Cordeau]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Architecte, Menuisier, Maçon, Couvreur, Forgeron, Bûcheron, Navigateur]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Charpentier-Menuisier, charpente-navale-vs-civile, ponts-bois-vs-pierre]
---

# 🪵 Archétype-Métier — Charpentier

> Métier de la **grande structure bois** : charpentes de cathédrale, ponts en bois, mâts de navires, échafaudages monumentaux. Distinct du [[Menuisier]] (mobilier + structures légères) — voir frontière §11.

---

## 1. Vue d'ensemble

Le **Charpentier** taille, lève, assemble les **grandes pièces de bois structurel** : poutres maîtresses, fermes de toit, ponts, mâts, échafaudages, machines de siège. Il fournit l'**ossature bois** des bâtiments que le [[Maçon]] habille de pierre, et que le [[Couvreur]] couvre de tuile.

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Bûcheron]] (grumes, bois lourd), [[Menuisier]] (planches préparées, parfois), [[Forgeron]] (ferrures, sabots de poutre, étriers métalliques), [[Tanneur]] (sangles cuir des échafaudages)
- **Aval** : [[Architecte]] (qui orchestre), [[Maçon]] (qui appuie ses voûtes sur la charpente), [[Couvreur]] (qui couvre la charpente), [[Navigateur]] (mâts et coques de navires)
- **Frontière joueur/PNJ** : Charpentier joueur peut bâtir T1-T2 en autonomie ; T3+ sous direction d'[[Architecte]]

**Identité gameplay :**
- Métier **physique lourd** — `Vigueur` (manipulation poutres de plusieurs tonnes), `Acuité` (assemblage tenon-mortaise, lecture du fil), `Endurance` (chantiers en hauteur, longues sessions), `Mémoire` (essences, recettes d'assemblage)
- Métier **collectif** : levée d'une ferme de toit nécessite 4-8 charpentiers en simultané (cadence rythmée, chant de levée)
- Métier **frontalier de la mer** : la charpenterie navale (cf. [[Navigateur]]) est une sous-spécialisation prestigieuse — coques, mâts, voilures lourdes

**Ancrage culturel :** Trinoria (charpentes en bois clair, hauts-perchoirs forestiers — voir [[Catégories de Constructions]] §Variants), Onara (charpenterie maritime, ports nordiques), Astravia (charpentes hautes alignées sur constellations), Galenor (charpenterie cathédrale impériale).

---

## 2. Stats brutes & Maîtrises associées

### Stats brutes

| Stat | Rôle dans le métier | Magnitude |
|------|----------------------|-----------|
| **Vigueur** *(principale)* | Lever des poutres, frapper la herminette, manipuler grumes | Direct — plafonne la taille des pièces manipulables |
| **Acuité** *(principale)* | Assemblage tenon-mortaise, alignement de fermes, lecture nœuds du bois | Direct — qualité de l'assemblage (durabilité, résistance vent) |
| **Endurance** *(secondaire)* | Chantiers en hauteur, sessions longues | Multiplicative — durée session |
| **Mémoire** *(secondaire)* | Essences (chêne, sapin, mélèze, if), techniques d'assemblage culturelles | Débloque palier Expert+ |

### Maîtrises contextuelles

- **`Maîtrise_Charpenterie`** — racine du métier
- **`Maîtrise_Charpenterie_Navale`** — sous-spécialisation maritime (coques, mâts) — prestige + Reconnaissance maritime
- **`Maîtrise_Pont`** — sous-spécialisation infrastructure (ponts en bois sur rivières, gorges)
- **`Maîtrise_Ferme`** — sous-maîtrise des fermes de toit complexes (cathédrales, halles)

> **Cohérent avec [[Personnage]]** : `Qualité de charpente = Vigueur × Acuité × Maîtrise_Charpenterie`. Un Charpentier Vigueur 80, Acuité 70, palier 4 produit du **Magistral structurel**.

---

## 3. Sources de ressources

### Intrants principaux

| Intrant | Source | Notes |
|---------|--------|-------|
| **Bois lourd (grumes)** | [[Bûcheron]] | Chêne, sapin, mélèze — pièces de 4-12 m |
| [[Planche]] | [[Menuisier]] | Pour planchers, bardages secondaires |
| **Bois précieux** | Bûcheron Maître / [[Traces des Ères]] (If d'Astravia, Bois pétrifié, Sève d'Argent) | Charpentes signature T5+ |
| **Ferrures structurelles** | [[Forgeron]] | Étriers, sabots de poutre, boulons forgés |
| **Sangles cuir** | [[Tanneur]] | Échafaudages, harnais de levée |
| **Résine traitée / Goudron** | [[Apothicaire]] | Étanchéité (charpente navale, ponts en bois) |
| **Cordage** | [[Tisserand]] / cordier | Levée et arrimage |
| **Clous forgés** | [[Forgeron]] | Assemblage massif |

### Outputs (production directe Charpentier)

- **Charpente de toit** (élément structurel) — du toit simple jusqu'à la ferme de cathédrale
- **Plancher / mezzanine**
- **Pont en bois** (T2+)
- **Mât de navire** (T3+ avec sous-spé navale)
- **Coque de navire** (T4+ navale uniquement)
- **Échafaudage** (consommable de chantier — réutilisable)
- **Machine de siège** (T4+, frontière militaire — voir [[Mapping Métiers de Construction]] §Fortifications)

---

## 4. Stations + outils

### Stations principales

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Atelier de charpenterie** | Taille des pièces avant levée | T1+ |
| **Scierie** | Refente des grumes (parfois mutualisée avec [[Menuisier]]) | T2+ |
| **Tréteaux de levée** | Assemblage à plat avant montage | T2+ |
| **Chantier de levée** *(zone monde)* | Lieu de montage final | T1+ |
| **Cale de construction navale** | Charpenterie navale | T3+ (uniquement Maîtrise_Charpenterie_Navale) |

### Outils

| Outil | Catégorie | Notes |
|-------|-----------|-------|
| **Hache de charpentier** | Outils | Outil signature — équarrissage |
| **Herminette** | Outils | Plane / dresse les poutres |
| **Scie de long** | Outils | Refente sur 2 charpentiers |
| **Tarière** | Outils | Perçage manuel pour chevillage |
| **Maillet** | Outils | Frappe sur ciseau / ajustement |
| **Équerre / Cordeau** | Outils | Tracé géométrique |

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées | Conditions |
|--------|----------------------|------------|
| **1 — Novice** | Charpente simple (toit en pente, plancher), assemblage chevillé basique. Échafaudage simple. Taux échec ~15% | Défaut |
| **2 — Initié** | Toits à 2 pans, pignons, ponts en bois courts, planchers d'étage. Pose de fermes pré-assemblées. Taux échec ~10% | Usage : 30 charpentes réussies |
| **3 — Adepte** | Fermes de toit complexes (manoir, taverne T3), ponts longs (≤ 30 m), mâts de petits navires. Coordination [[Architecte]]. Sous-spé navale ou pont accessibles | Usage + condition : 100 charpentes + 1 levée collective réussie |
| **4 — Expert** | Charpentes de cathédrale provinciale, ponts de pierre+bois mixtes, mâts de navires de guerre, machines de siège. Co-signature de plans T4 avec Architecte Expert. Taux échec ~3% | Usage + condition : 300 charpentes + co-signer 1 cathédrale ou navire majeur |
| **5 — Maître** 🔒 | Charpentes monumentales (cathédrale capitale, halle royale), navires-amiraux, ponts cosmiques. Bois précieux exotiques (If d'Astravia, Bois pétrifié, Sève d'Argent). Procs T6 | **Condition cachée** : ex. lever une ferme de cathédrale sans aucun support cassé, construire un navire qui survit à un Souffle Cardinal en mer, restaurer les Falaises Chantantes de Baelor (Trace des Ères) |

> **Décroissance** : −1 palier latent après 60 jours sans charpente significative. Rouille post-Souffle : assemblages en cours subissent +20% risque de désalignement la 1ère semaine.

---

## 6. Crafts/recettes débloqués

> Voir [[Crafts]] §7. Le Charpentier produit l'**ossature** ; le [[Maçon]] érige les murs ; le [[Couvreur]] couvre.

### Recettes signature par palier

| Palier | Production | Construction-cible |
|--------|------------|---------------------|
| **Novice** | Toit simple à 1 pan, plancher chevillé | Cabane, abri, atelier mobile |
| **Initié** | Ferme triangulaire, pont en bois 5-10 m, plancher d'étage | Maison rurale, étable, grange |
| **Adepte** | Ferme à entrait, voile mobile (navale), pont 10-30 m | Manoir, taverne T3, petit bateau, halle de marché |
| **Expert** | Ferme à entrait retroussé, ferme de cathédrale, mât de hunier | Cathédrale provinciale, navire de guerre, machine de siège |
| **Maître** | Charpente monumentale (croisée d'ogive bois), mât-amiral, pont cosmique en Sève d'Argent | Cathédrale capitale, navire-amiral, monument inscrit |

### Pattern recette canonique Charpenterie

> Tier N requiert : **N×3 grumes** + **(N-1) ferrures** + **(N×6) heures chantier** + **N charpentiers en simultané** pour la levée + **palier Mastery requis**.

**Mini-jeu** : tracé tenon-mortaise (précision), levée collective (timing + cadence rythmée — chant de levée), chevillage (force et précision). Échec = ferme penchée, mortaise ratée, poutre fendue.

---

## 7. Carrière et débouchés

### Échelle d'évolution joueur

```
[Apprenti gâcheur] → [Charpentier de village] → [Charpentier de cité] → [Maître Charpentier] → [Légende d'une nation]
        ↓                  ↓                       ↓                     ↓                       ↓
   Toits simples       Fermes / planchers      Cathédrale provinc.    Cathédrale capitale    Navire-amiral / Trace
```

### Débouchés économiques

- **Charpentier de village** : commande régulière (toiture, grange, étable) — 100-1000 Éclats
- **Charpentier de cité** : chantiers de manoirs/cathédrales sous Architecte
- **Charpentier-Naval** : sous-spécialisation prestige — chantier naval ([[Navigateur]] cohérence)
- **Charpentier de [[Guildes|guilde]]** : machines de siège, fortifications bois
- **Charpentier-Restaurateur** : restauration de charpentes patrimoniales

### Métiers complémentaires fortement liés

- **[[Architecte]]** — chef de chantier T3+
- **[[Menuisier]]** — frontière étroite (voir §11) : Menuisier fait le mobilier + structures légères, Charpentier la grosse œuvre
- **[[Maçon]]** — collaboration sur tout chantier (charpente sur murs maçonnés)
- **[[Couvreur]]** — la toiture coiffe la charpente (sous-spé possible de Charpentier — voir [[Mapping Métiers de Construction]] §D-MÉTIERS-02)
- **[[Forgeron]]** — fournisseur de ferrures
- **[[Bûcheron]]** — fournisseur amont obligatoire
- **[[Navigateur]]** — client maritime (sous-spé navale)

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet sur le Charpentier |
|-----|---------------------------|
| **Verdoiement** (Terranu) | Charpentes vivantes possibles (intégration arbres en croissance) ; +20% durabilité bois |
| **Sommeil de Glace** (Climata) | Bois gelé impossible à travailler ; chantiers d'hiver suspendus |
| **Vents Bouleversants** (Aerion) | Charpentes hautes valorisées, +25% pour toits ailés et mâts élevés |
| **Échos Brisés** (Tempora) | Assemblages instables : ±10% précision tenon-mortaise |
| **Ombre Longue** (Noctis) | Bois sombres en demande (charpentes nocturnes) |
| **Brume Mortelle** | Goudronnage massif requis (étanchéité contre la brume) |

### Par culture / faction

- **Trinoria** : charpentes en bois clair, technique des hauts-perchoirs forestiers — Reconnaissance bonifiée localement
- **Onara** : charpenterie maritime de port, technique de coque ronde
- **Astravia** : charpentes alignées sur constellations (cohérent [[Astronome]] — frontière savoir/charpente)
- **[[Guildes]] martiales** : machines de siège, palissades fortifiées

---

## 9. Économie

### Marges typiques

| Palier | Coût matériaux/chantier | Vente moyenne | Marge |
|--------|--------------------------|----------------|--------|
| Novice | 50 Éclats (toit cabane) | 150 Éclats | ~60% |
| Adepte | 2000 Éclats (ferme manoir) | 8 000 Éclats | ~70% |
| Maître | 100 000+ Éclats (charpente cathédrale capitale) | 500 000+ Éclats | ~75% |
| Maître naval | 500 000+ (navire-amiral) | 2-5M Éclats | ~75% |

### Gold sinks contribués

- **Réfection de toiture** post-tempête / post-Souffle : revenu récurrent
- **Mâts cassés** (rotation maritime) : revenu naval continu
- **Échafaudages** : location aux autres chantiers (revenu passif)

### Chaîne économique

```
[Bûcheron (grumes)] → [Charpentier] → [Architecte (orchestration)] → [Maçon + Couvreur + Forgeron]
                                  ↘
                                    [Navigateur (charpenterie navale)]
```

---

## 10. Comportement IA / signatures PNJ

### Cycle quotidien

```
[05:30 lever — chant de levée matinal en chantier collectif]
[06:00-12:00 chantier matin : taille à l'atelier OU levée sur chantier]
[12:00-13:00 pause repas (souvent en groupe — culture du chantier)]
[13:00-18:00 chantier après-midi : assemblage, chevillage]
[18:00-19:00 nettoyage outils, remise tréteaux]
[19:00-22:00 taverne ouvrière, transmission orale aux apprentis]
[22:00 coucher]
```

### Signatures PNJ canoniques (5 PNJ — pays différents)

- **Maître Brann le Lent de Trinoria** — charpentier des hauts-perchoirs, école des sapins de Trinoria, fermes en bois clair
- **Sigrid des Ports d'Onara** — Maîtresse Charpentière navale, conçoit les coques rondes nordiques, signataire de 12 navires-amiraux
- **Maître Veylor de Galenor** — charpentier de la cathédrale impériale, ferme à entrait retroussé, école Galenor
- **Astrid l'Étoilée d'Astravia** — charpentes alignées sur constellations, collaboration avec [[Astronome|Astronomes]] — Tour Astravienne du Cardinal
- **Old Hagrol de Mosrack** — Maître Charpentier de machines de siège, fournisseur des Guildes martiales — apprenti devenu légende militaire

---

## 11. Décisions ouvertes

- [ ] **Frontière Charpentier / Menuisier** : posée comme grosse œuvre vs mobilier+ouvertures+structures légères. Cas limites : escalier monumental ? Plancher de palais ? **Proposition** : escalier = Menuisier (finition fine), plancher porteur = Charpentier
- [ ] **Couvreur** : sous-spécialisation Charpentier (palier 3+) ou métier dédié ? Cohérent [[Mapping Métiers de Construction]] §D-MÉTIERS-02 — **Proposition** : sous-spé Charpentier
- [ ] **Charpenterie navale** : sous-spécialisation Maître ou métier dédié ([[Navigateur]] §Constructeur naval) ? **Proposition** : sous-spé `Maîtrise_Charpenterie_Navale` débloquée Adepte+
- [ ] **Ponts mixtes pierre+bois** : Charpentier + Maçon co-signature ? **Proposition** : oui, T3+ requiert les deux paliers Adepte minimum
- [ ] **Machines de siège** : Charpentier seul ou avec [[Forgeron]] obligatoire ? **Proposition** : co-craft Charpentier (structure) + Forgeron (mécanismes)
- [ ] **Chant de levée** : effet gameplay (bonus collectif, synchronisation Labeur) ? À playtester
- [ ] **Calibration paliers** : 30/100/300 charpentes à valider

---

*Liens : [[Métiers]] · [[Architecture/Index|Architecture]] · [[Catégories de Constructions]] · [[Mapping Métiers de Construction]] · [[Architecte]] · [[Menuisier]] · [[Maçon]] · [[Couvreur]] · [[Forgeron]] · [[Bûcheron]] · [[Navigateur]] · [[Crafts]] · [[Sources de Ressources]] · [[Le Souffle]] · [[Traces des Ères]]*
