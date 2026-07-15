---
tags: [métier, archétype, artisanat, vigueur, acuité, bois, menuiserie]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Vigueur
stats_secondaires: [Acuité, Endurance, Mémoire]
craft_category: Travail du bois et de la pierre
sources_ressources_accessibles: [Bois, Planche, Écorce, Sève, Résine traitée, Pigment, Boucles métalliques (frontière Forgeron)]
stations_principales: [Établi de menuiserie, Scierie, Atelier, Tour à bois]
outils_principaux: [Scie, Rabot, Ciseaux à bois, Maillet, Marteau, Vrille, Vis-presse]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Métiers#Bûcheron, Forgeron (ferrures), Architecte, Sculpteur, Métiers#Charpentier, Cordonnier (sellier)]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Menuisier-Charpentier-Sculpteur, arcs-vs-armes-pure, mobilier-vs-architecture]
---

# 🪵 Archétype-Métier — Menuisier

> Métier **fondamental du bois**. Le Menuisier transforme le bois brut (livré par le [[Métiers|Bûcheron]]) en **mobilier, structures secondaires, manches d'outils, hampes d'armes, arcs**. Il fournit aussi des planches comme intrant standardisé pour [[Architecte]] / [[Métiers|Charpentier]].

---

## 1. Vue d'ensemble

Le **Menuisier** scie, rabote, assemble le bois pour produire des objets utilitaires (mobilier, outils, manches), des armes en bois ([[Arc]], [[Lance]] hampes), et des composants pour d'autres métiers ([[Forgeron]] manches de marteau, [[Architecte]] planches structurées).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Métiers|Bûcheron]] (bois brut, écorce, sève), [[Forgeron]] (ferrures, clous, charnières), [[Tanneur]] (cordes/lacets), [[Métiers|Apothicaire]] (résine, vernis)
- **Aval** :
  - **Joueurs** (mobilier de domicile, outils, [[Arc]])
  - **[[Architecte]] / [[Métiers|Charpentier]]** (planches préparées)
  - **[[Forgeron]]** (manches d'armes/outils)
  - **[[Sculpteur]]** (frontière — voir §11)
  - **[[Cordonnier]] §Sellier** (cadres de selle)

**Identité gameplay :**
- Métier **physique précis** — `Vigueur` (sciage, rabotage, port de poutres), `Acuité` (assemblage précis, lecture du fil du bois), `Endurance` (sessions longues), `Mémoire` (essences, signatures)
- Métier **versatile** : plus large que la forge en termes de catégories d'output (mobilier, armes, structures, outils)
- Métier **pivot vers Architecture** : produit la **planche** (intrant standardisé bâtiment, voir [[Sources de Ressources]] §Fabriqué)

**Frontière canonique :**
- **Menuisier ≠ Charpentier** : Charpentier = grosse charpente structurale (poutres, fermes, toits) ; Menuisier = menuiserie fine (mobilier, portes, fenêtres, manches)
- **Menuisier ≠ Sculpteur** : Sculpteur = œuvre artistique sur bois/pierre ; Menuisier = utilitaire et fonctionnel
- **Menuisier ≠ Bûcheron** : Bûcheron = récolte arbre → bois brut ; Menuisier = bois brut → planche/objet fini

---

## 2. Stats & Maîtrises

| Stat | Rôle |
|------|------|
| **Vigueur** *(principale)* | Sciage manuel, rabotage, port poutres, frappe au maillet |
| **Acuité** *(principale)* | Assemblage précis, lecture du fil du bois, ajustement |
| **Endurance** *(secondaire)* | Sessions longues |
| **Mémoire** *(secondaire)* | Essences, signatures, recettes assemblage |
| Vivacité | Cadence rabot/scie |

### Maîtrises contextuelles

- **`Maîtrise_Menuiserie`** — racine
- **`Maîtrise_Arcier`** — sous-spécialité [[Arc]] et hampes (palier Adepte+)
- **`Maîtrise_Mobilier_Fin`** — sous-spécialité mobilier raffiné (palier Expert+)
- **`Maîtrise_Charpenterie`** — sous-spécialité grosse charpente (palier Maître, frontière)

---

## 3. Sources de ressources accessibles

### Intrants

| Intrant | Source | Notes |
|---------|--------|-------|
| **Bois brut** | Nature ([[Métiers|Bûcheron]]) | Voir [[Bois]] — essences variées (chêne, frêne, érable, if pour arc, ébène, bois magique) |
| **Planche** | Auto-produit (Menuisier) | Forme intermédiaire ([[Sources de Ressources]] §Fabriqué) |
| **Écorce** | Bûcheron | Vannerie, décoration |
| **Sève** | Botaniste | Vernis, colle |
| **Résine traitée** | Apothicaire | Imperméabilisation, finition |
| **Pigment** | Teinturier | Coloration |
| **Boucles / Clous / Charnières** | Forgeron | Assemblage |

### Sortie

- 1 session (Labeur ~30%) → ~10 planches T1-T2 OU 1 meuble T2 OU 3-5 manches T1 OU 1 [[Arc]] T2-T3

### Essences canoniques (pattern aligné [[Bois]])

| Essence | Tier plancher | Tier plafond | Usage typique |
|---------|---------------|---------------|----------------|
| Sapin / pin | T1 | T2 | Planche, mobilier basique |
| Chêne | T2 | T4 | Mobilier solide, planches Architecte |
| Frêne | T2 | T3 | Manches d'outils (souple, résistant) |
| Érable | T2 | T3 | Mobilier fin |
| If | T3 | T5 | [[Arc]] — bois canonique arcier |
| Ébène | T3 | T5 | Mobilier de luxe, sceptres |
| Bois cosmique *(variant ère)* | T5 | T6 | Items légendaires |

---

## 4. Stations + outils

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Établi de menuiserie** | Travail principal | T1+ |
| **Scierie** | Découpe planches en série | T2+ |
| **Atelier** *(complet)* | Assemblage gros mobilier | T3+ |
| **Tour à bois** | Mobilier tourné, pieds, axes | T3+ |

### Outils

| Outil | Notes |
|-------|-------|
| **Scie** | Coupe |
| **Rabot** | Lissage |
| **Ciseaux à bois** | Détail |
| **Maillet** | Frappe douce |
| **Marteau** | Clouage |
| **Vrille** | Perforation |
| **Vis-presse** | Maintien colle/séchage |

---

## 5. Paliers de Maîtrise

| Palier | Capacités | Conditions |
|--------|-----------|------------|
| **1 — Novice** | Planches T1, manches d'outils basiques, mobilier rustique. Échec 12% | Défaut |
| **2 — Initié** | Mobilier moyen, [[Arc]] T2 simple, hampes lances, portes. Premier vernis | Usage : 50 pièces |
| **3 — Adepte** | Mobilier signature, [[Arc]] T3 (composite), escaliers, fenêtres. Vernis multi-couche | Usage : 200 pièces + commande |
| **4 — Expert** | Mobilier de cour T4, arcs Magistraux (if, composites rares). Marqueterie. Frontière Charpenterie | Usage : 500 pièces + signature reconnue |
| **5 — Maître** 🔒 | Mobilier T5 Légendaire (ébène, bois cosmique). Arcs T5-T6. Charpente monumentale (Maître Charpentier de fait). Héritage | **Condition cachée** : ex. construire le mobilier d'un Roi, fabriquer un arc qui ne casse jamais (résiste 100 [[Le Souffle|Souffles]] simulés), restaurer un [[Traces des Ères|arbre de la Trace]] |

---

## 6. Crafts / recettes débloqués

### Productions par palier

| Palier | Mobilier | Armes / outils | Architecture | Spécial |
|--------|----------|------------------|---------------|----------|
| Novice | Tabouret, étagère T1 | Manches outils basiques | Planche T1 | — |
| Initié | Table, chaise, lit T2 | [[Arc]] T2, hampe Lance T2, manche hache | Planche T2 | Coffre |
| Adepte | Mobilier signature T3, armoire | [[Arc]] T3 composite, hampes Magistrales | Portes, fenêtres T3 | Marqueterie simple |
| Expert | Mobilier de cour T4 | [[Arc]] T4 Magistral, sceptre bois | Charpente moyenne | Marqueterie complexe |
| Maître | Mobilier Légendaire T5 (ébène, cosmique) | [[Arc]] T5-T6 | Charpente monumentale | Œuvre patrimoniale |

### Pattern recette canonique Menuiserie

> Tier N = **N planches T-N** (ou bois brut équivalent) + **(N-1) éléments métalliques** (Forgeron) + **vernis × N/2** + **station T-1** + **Mastery requis**.

| Recette type | Tier | Intrants | Durée | Mini-jeu | Sortie |
|--------------|------|----------|-------|----------|--------|
| Planche | 1 | Bois × 1 | 2 min | Sciage (1 jauge) | 4× Planche T1 |
| Coffre solide | 2 | Planche × 4, Charnière × 2, Clous × 8 | 30 min | Assemblage (2 jauges) | 1× Coffre Façonné |
| [[Arc]] T3 | 3 | Bois if × 2, Corde × 1 (Tisserand), Cuir × 1 | 1h | 3 jauges (taille + tension + finition) | 1× Arc Œuvré |
| Mobilier signature T4 | 4 | Bois rare × 4, Charnières × 4, Vernis × 2, Pigment × 1 | 4h | 4 jauges + marqueterie | 1× Mobilier Magistral |

### Affixes signature (10)

1. **Bois traité** — durabilité ×1.5
2. **Imperméabilisé** — résiste à la pluie
3. **Trempé au feu** — résistance feu (bois durci)
4. **Cosmique** — survit au [[Le Souffle|Souffle]] sans rouille
5. **Souple** *(if)* — flèches [[Arc]] +10% portée
6. **Marqueterie signature** — bonus social, prestige
7. **Ferré** — assemblage métal renforcé (durabilité ×2)
8. **Doré** ([[Les Ères|Rêve Lumineux]]) — bois doré, prestige
9. **Sépulcral** ([[Lore/Religions/Vael'Kurash]]) — bois funéraire bonifié
10. **Onirique** ([[Les Ères|Sommeil Onirique]]) — items persistent à travers le sommeil

---

## 7. Carrière et débouchés

```
[Apprenti] → [Menuisier de bourg] → [Menuisier de cité] → [Menuisier-Maître / Arcier-Maître] → [Menuisier-Légende royal]
```

### Spécialisations

- **Arcier** — [[Arc]] et arcs composites (palier Adepte+)
- **Menuisier de mobilier** — fin, marqueterie
- **Charpentier** — frontière palier Maître, grosse structure
- **Sellier** — cadres de selle (frontière [[Cordonnier]])
- **Manchier** — manches d'outils/armes (fournisseur Forgeron)

### Débouchés

- **Boutique mobilier** — clientèle bourgeoise
- **Menuisier de chantier** — partenariat [[Architecte]]
- **Arcier de faction** — fournisseur militaire ([[Factions]])
- **Mobilier de cour** — exclusivité noble (Adepte+)

### Métiers complémentaires

- **[[Métiers|Bûcheron]]** — fournisseur amont quasi obligatoire
- **[[Forgeron]]** — ferrures, clous
- **[[Architecte]]** / **[[Métiers|Charpentier]]** — débouché architecture
- **[[Sculpteur]]** — frontière partagée (œuvre artistique)
- **[[Tisserand]]** — cordes pour arcs

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | +20% qualité bois, essences rares accessibles |
| **Sommeil de Glace** (Aquor) | Bois compact, résistance dégâts +10% |
| **Échos Brisés** (Tempora) | Bois Spectral (variant) |
| **Sommeil Onirique** (Somnix) | Items Onirique persistent à travers sommeil |
| **Brume Mortelle** (Umbra) | Bois Pourpre |

### Par contexte

- **Saison** — printemps = sève abondante (vernis), automne = bois mature
- **Faction militaire** — commande arcs/hampes en série
- **Religion** — mobilier sacré spécifique (autels en chêne sacré, etc.)

---

## 9. Économie

### Ratios canoniques

| Palier | Coût intrants | Vente | Marge | Volume |
|--------|----------------|-------|-------|--------|
| Novice | 5-15 Éclats | 30 Éclats | ~50% | 5-10 / jour |
| Adepte | 50-200 | 250-1000 | ~70% | 1-3 / jour |
| Expert | 500-3000 | 3000-15 000 | ~80% | 1 / jour |
| Maître | 5000-50 000 | 50 000-500 000 | ~85% | 1 / 2 jours |

### Gold sinks

- **Mobilier de domicile** — gold sink invisible mais cumulé
- **Réparation** — service quotidien
- **Arc signature** — gros sink prestige
- **Charpente bâtiment** (avec [[Architecte]]) — gros sink combiné

---

## 10. Comportement IA + signatures PNJ

### Routine Menuisier PNJ (Phase 2)

```
[Lever 06:00] → [Atelier matin : sciage / rabotage]
              → [09:00 : ouverture boutique — Mode Marchand]
              → [Mi-journée : assemblage commandes]
              → [Après-midi : finition / vernis]
              → [Soir : livraisons / réparations]
              → [Coucher 22:00]
```

### Signatures PNJ (Phase 4)

- **Maître Brann le Cintreur de Galenor** — arcier impérial
- **Vasta la Sève d'Endora** — mobilier de cour raffiné
- **Olwyn d'Alkaran** — bois nordique, mobilier dense
- **Padre Iolan d'Ulinor** — arbre-mobilier rituel Vael'Kurash
- **Maître Théron du Cratère** *(Cendara)* — bois durci au feu

---

## 11. Décisions ouvertes

- [ ] **Frontière Menuisier / Charpentier / Sculpteur** : 1 Menuisier racine + spé Charpenterie palier Maître + Sculpteur métier distinct (ce sprint produit Sculpteur séparé). Décision : **Charpentier** sera Phase suivante (branche Architecture)
- [ ] **Arcier** : sous-spé Menuisier (canonique ici) ou métier séparé ? Proposition : **sous-spé** (palier Adepte+)
- [ ] **Sceptre bois** : Menuisier Expert+ peut-il faire un [[Sceptre]] (arme magique) ? Proposition : oui pour la base bois, mais l'enchantement final = [[Enchanteur d'objet]]
- [ ] **Frontière Menuisier / Sellier** ([[Cordonnier]] §Sellier) : cadres de selle = Menuisier ou Sellier ? Proposition : Menuisier produit le cadre, Sellier l'habille de cuir
- [ ] **Calibration durabilité** par essence et tier
- [ ] **Mobilier monumental** (orgue, escaliers cathédrale) : Menuisier-Maître ou Architecte ? Proposition : co-craft

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Bois]] · [[Arc]] · [[Lance]] · [[Architecte]] · [[Forgeron]] · [[Sculpteur]] · [[Cordonnier]] · [[Économie]] · [[Les Ères]]*
