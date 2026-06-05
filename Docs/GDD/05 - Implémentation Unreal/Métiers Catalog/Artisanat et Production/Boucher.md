---
tags: [métier, archétype, artisanat, vigueur, acuité, boucherie, viande]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Vigueur
stats_secondaires: [Acuité, Endurance, Vivacité]
craft_category: Cuisine + Récolte transformation primaire
sources_ressources_accessibles: [Viande brute, Os, Graisse animale, Organe, Sang, Cuir, Peau, Carcasse]
stations_principales: [Table de découpe, Crochet à viande, Hachoir, Saumure, Fumoir]
outils_principaux: [Couteau de boucher, Fendoir, Hachette, Scie à os, Crochet]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Chasseur, Métiers#Dépéceur, Cuisinier, Tanneur, Métiers#Charcutier, Apothicaire]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Boucher-Tanneur-Cuisinier, sang-organes-pour-Apothicaire, conservation-viande-par-tier]
---

# 🥩 Archétype-Métier — Boucher

> Métier de **transformation primaire animale**. Le Boucher fait le pont entre la **carcasse brute** (issue du [[Métiers|Chasseur]] ou du [[Métiers|Berger]] / [[Métiers|Dépéceur]]) et les **viandes prêtes à cuire** consommées par le [[Cuisinier]]. Il fournit aussi des **sous-produits canoniques** : os, graisse, organes, sang — qui irriguent l'Apothicairerie/Alchimie.

---

## 1. Vue d'ensemble

Le **Boucher** découpe les carcasses, sépare les morceaux, conserve la viande (saumure, fumage, séchage) et redistribue les sous-produits aux métiers concernés. Il est le **maillon manquant** entre la chasse/élevage et la cuisine.

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Métiers|Chasseur]] (gibier sauvage), [[Métiers|Berger]] (élevage), [[Métiers|Dépéceur]] (dépeçage technique des grandes créatures du [[Bestiary/Index|Bestiaire]])
- **Aval** :
  - **[[Cuisinier]]** consomme les viandes prêtes
  - **[[Tanneur]]** consomme cuir/peau si pas pré-traité par le Dépéceur
  - **[[Apothicaire]] / [[Métiers|Alchimiste]]** consomment sang, organes, graisse pour potions
  - **[[Boulanger]]** peut consommer la graisse (saindoux pour pâte)
  - Joueurs (viande directe en consommable simple — voir [[Viande]])

**Identité gameplay :**
- Métier **physique** mais précis — `Vigueur` (manipulation carcasses lourdes, frappe au fendoir), `Acuité` (découpe précise, sélection morceaux nobles), `Endurance` (sessions longues), `Vivacité` (cadence soutenue)
- Métier **fournisseur multi-aval** : un Boucher Adepte+ alimente 3-4 autres métiers
- Métier **rotation rapide** : viande périt vite (cf. [[Pain]] §9 pattern conservation), pousse à un cycle court production-vente

**Frontière canonique (importante) :**
- **Boucher ≠ Tanneur** : le Boucher transforme la **viande/os** ; le [[Tanneur]] transforme **cuir/peau**. Quand un Boucher reçoit une carcasse complète, il prélève la peau et la livre au Tanneur (ou la stocke vendable séparément).
- **Boucher ≠ Cuisinier** : le Boucher livre la **viande crue prête à cuire** ; le [[Cuisinier]] cuit. Un Boucher peut faire de la **charcuterie** (saucissons, jambon, salaisons — frontière partagée [[Métiers|Charcutier]]) mais pas des plats.
- **Boucher ≠ Dépéceur** : le [[Métiers|Dépéceur]] (catégorie Exploration/Chasse) traite les **créatures sauvages** sur le terrain (grosses pièces, dragons, créatures rares avec composants alchimiques précieux). Le Boucher traite en atelier **animaux d'élevage et carcasses ramenées**.

---

## 2. Stats & Maîtrises

| Stat | Rôle |
|------|------|
| **Vigueur** *(principale)* | Manipulation carcasses lourdes (bovin, cerf), frappe fendoir, port |
| **Acuité** *(principale)* | Découpe précise, identification morceaux nobles vs communs, ne pas perdre de matière |
| **Endurance** *(secondaire)* | Sessions longues debout |
| **Vivacité** *(secondaire)* | Cadence et rapidité avant que la viande ne se gâte |
| Verbe | Vente directe (étal de marché, mode Marchand) |

### Maîtrises contextuelles

- **`Maîtrise_Boucherie`** — racine
- **`Maîtrise_Charcuterie`** — sous-spécialité salaison/fumage (palier Adepte+)
- **`Maîtrise_Découpe_Créature`** — sous-spécialité grandes pièces / créatures du Bestiaire (palier Expert+, frontière Dépéceur)

---

## 3. Sources de ressources accessibles

> Voir [[Sources de Ressources]] §Créature.

### Intrants

| Intrant | Source | Notes |
|---------|--------|-------|
| **Carcasse** *(implicite)* | Chasseur / Berger / Dépéceur | Achetée brute ou en consignation |
| **Viande brute** | Sortie de découpe (auto-produit) | Tier varie selon créature |
| Sel | Fabriqué (Mineur / [[Métiers|Pêcheur]] côtier) | Conservation |
| Épices | Fabriqué (Apothicaire / Cuisinier) | Charcuterie |
| Bois (fumage) | Nature | Charcuterie chêne, hêtre |

### Sortie économique typique

- 1 session sur carcasse moyenne (mouton, cerf) → ~10-20 morceaux viande + 2-5 os + 1-3 organes + graisse + cuir + peau (livrables ou vendables)
- Carcasse créature Bestiaire (T4+) → matière noble pour [[Apothicaire]], gros revenu

### Sous-produits canoniques

| Sous-produit | Métier-aval principal | Notes |
|--------------|------------------------|-------|
| Viande noble (T2-T6) | [[Cuisinier]], joueur direct | Voir [[Viande]] |
| **Os** | [[Apothicaire]] (poudre d'os), [[Bijoutier]] (objets sculptés) | Voir [[Os]] |
| **Graisse animale** | [[Apothicaire]] (huile, savon), [[Boulanger]] (saindoux) | Voir [[Sources de Ressources]] §Créature |
| **Organe** (foie, rein, cœur) | [[Apothicaire]], [[Métiers|Alchimiste]] | Composant alchimique |
| **Sang** | [[Métiers|Alchimiste]], rituels | Très commun T1-T3, rare T4+ (créature haute) |
| **Cuir / Peau** | [[Tanneur]] | Transmis directement (frontière) |
| **Charcuterie** *(sortie travaillée)* | Joueurs / [[Cuisinier]] | Saucisson, jambon, lard fumé |

---

## 4. Stations + outils

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Table de découpe** | Découpe principale | T1+ |
| **Crochet à viande** | Suspension carcasses | T1+ |
| **Hachoir** | Préparation hachis, charcuterie | T2+ |
| **Saumure / Cuve à sel** | Conservation salaison | T2+ |
| **Fumoir** | Charcuterie fumée (palier Adepte+) | T3+ |

### Outils

| Outil | Notes |
|-------|-------|
| **Couteau de boucher** | Outil principal, plusieurs tailles |
| **Fendoir** | Os, articulations |
| **Hachette** | Préparation hachis grossier |
| **Scie à os** | Coupes propres |
| **Crochet** | Manipulation pièces lourdes |

---

## 5. Paliers de Maîtrise

| Palier | Capacités | Conditions |
|--------|-----------|------------|
| **1 — Novice** | Découpe simple petits gibiers (lièvre, volaille). Rendement morceaux nobles ~50%. Conservation 1 jour | Défaut |
| **2 — Initié** | Mouton, chèvre, cerf moyen. Salaison basique. Rendement ~65%. Conservation 3 jours | Usage : 30 carcasses |
| **3 — Adepte** | Bovin, sanglier, gibier moyen. Charcuterie fumée. Rendement ~80%. Conservation 7 jours | Usage : 100 carcasses + recette charcuterie débloquée |
| **4 — Expert** | Grandes carcasses, créatures Bestiaire T3-T4. Découpe créature exotique (frontière Dépéceur). Charcuterie signature pays | Usage + spécialité (signature charcutière reconnue) |
| **5 — Maître** 🔒 | Créatures Bestiaire T5+ (dragons, colosses). Préservation organes alchimiques rares. Découpe rituelle (cf. [[Lore/Religions/Vael'Kurash]]) | **Condition cachée** : ex. découper un dragon entier sans perte, fournir un organe d'Éternel à un Apothicaire-Maître, cérémonie funéraire d'une bête sacrée |

---

## 6. Crafts / recettes débloqués

### Productions par palier

| Palier | Viandes | Charcuterie | Sous-produits livrés |
|--------|---------|-------------|------------------------|
| Novice | Découpe petite volaille / lièvre | — | Os, graisse, organes basiques |
| Initié | Mouton, chèvre, cerf — découpe moyenne | Salaison basique (lard salé) | Cuir/peau livrables |
| Adepte | Bovin, sanglier — découpe noble | Saucissons, jambon fumé, lardons fumés | Organes nobles (foie, cœur) |
| Expert | Créatures Bestiaire T3-T4 — découpe technique | Charcuterie signature (jambon de pays) | Sang noble, organes alchimiques |
| Maître | Créatures T5+ rituelles | Charcuterie cosmique (variants par ère) | Composants alchimiques rares (cœur d'Éternel, sang cosmique) |

### Pattern recette canonique Boucherie

> Tier N = **1 carcasse T-N** (ou supérieur) + **station T-1** + **Mastery requis**. Sortie multiple (~ N+5 morceaux + sous-produits).

| Recette type | Tier | Intrants | Durée | Mini-jeu | Sortie |
|--------------|------|----------|-------|----------|--------|
| Découpe mouton | 2 | Carcasse mouton × 1 | 10 min | Découpe (séquence coups) | 8× Viande T2 + 4× Os + Graisse + Cuir + Organe |
| Saucisson signature | 3 | Viande T2 × 4, Sel × 2, Épices × 2, Bois fumage × 1 | 30 min + 24h fumage | Dosage + timing fumage | 5× Saucisson T3 (conservation 30 jours) |
| Découpe créature T5 | 5 | Carcasse T5 × 1 | 2h | Découpe précise + canalisation | Viande T5 × 12 + composants nobles + cuir T5 |

### Charcuterie signature

- **Jambon de Galenor** (T3) — fumé hêtre
- **Saucisson Cendarien** (T3) — épicé volcanique
- **Lard alkaran** (T2) — fumé bois nordique, conservation extrême
- **Jambon Spectral** (T4-T5, [[Les Ères|Échos Brisés]]) — variant rituel

---

## 7. Carrière et débouchés

```
[Apprenti] → [Boucher de marché] → [Boucher de cité] → [Boucher-Maître + signature charcuterie] → [Boucher-Légende des Bêtes Cosmiques]
```

### Spécialisations

- **Boucher de viandes communes** — élevage, marché quotidien
- **Boucher de gibier** — chasse, partenariat avec [[Métiers|Chasseur]]
- **Charcutier** ([[Métiers|Charcutier]]) — salaison/fumage, frontière partagée
- **Découpeur de Bestiaire** — créatures rares, frontière [[Métiers|Dépéceur]]

### Débouchés

- **Étal de marché** — mode Marchand quotidien
- **Boucher de taverne** — partenariat fixe avec [[Métiers|Tavernier]]
- **Fournisseur d'Apothicaire** — sous-produits nobles
- **Boucher de cour** (Reconnaissance Adepte+) — viandes nobles exclusives

### Métiers complémentaires

- **[[Métiers|Chasseur]]** / **[[Métiers|Berger]]** — fournisseurs amont obligatoires
- **[[Cuisinier]]** — client principal
- **[[Tanneur]]** — récupère le cuir/peau
- **[[Apothicaire]]** — récupère sang, organes, graisse

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | Élevages florissants, +20% rendement viande |
| **Sommeil de Glace** (Climata) | Conservation +30% (froid naturel), focus salaison |
| **Brume Mortelle** (Umbra) | Viandes "Pourpres" (variant), recettes alchimiques boostées |
| **Présages** (Fatum) | Découpes rituelles, organes augures bonifiés |
| **Échos Brisés** (Tempora) | Charcuterie *Spectrale* (T4+ variant) |

### Par contexte

- **Saison de chasse** — afflux gibier, rendements bonifiés
- **Festival** — demande pléthorique, prix x1.5
- **Famine / pénurie** — viande rare, prix flambés
- **Pacte religieux** ([[Lore/Religions/Vael'Kurash|Vael'Kurash]] — découpe rituelle des ancêtres) : recettes spécifiques

---

## 9. Économie

### Ratios canoniques

| Palier | Coût carcasse | Vente totale (viande + sous-produits) | Marge | Volume |
|--------|----------------|-----------------------------------------|-------|--------|
| Novice | 5-15 Éclats | 25-40 Éclats | ~50% | 3-5 carcasses / jour |
| Adepte | 50-100 Éclats | 200-400 | ~70% | 2 / jour |
| Expert | 500-2000 | 2000-10 000 | ~75% | 1 / jour |
| Maître | 5 000-50 000 (créature T5) | 50 000-300 000 | ~85% | 1 / 3 jours |

### Boucle de valeur

- Le Boucher achète bas (carcasses brutes), revend haut (viande + sous-produits) — marge cumulée élevée
- Un partenariat avec Apothicaire (sous-produits alchimiques) double la rentabilité

---

## 10. Comportement IA + signatures PNJ

### Routine Boucher PNJ (Phase 2)

```
[Lever 04:00] → [Réception carcasses livrées par chasseurs/bergers]
              → [05:00-09:00 : découpe principale]
              → [09:00 : ouverture étal — Mode Marchand]
              → [Mi-journée : livraison sous-produits aux Apothicaires/Tanneurs]
              → [Après-midi : charcuterie (salaison, fumage)]
              → [Coucher 21:00]
```

### Signatures PNJ (Phase 4)

- **Bertrand le Sanglant de Galenor** — signataire du Jambon de Galenor
- **Vassia la Grande Lame** *(Cendara)* — découpe rituelle, charcuterie volcanique
- **Tovar de Skaldoria** *(alkaran)* — lard nordique, conservation extrême
- **Maître Halvar le Découpeur** *(Maître Légendaire, créatures T5+)* — fournisseur des Apothicaires-Maîtres
- **Yssalin la Silencieuse** *(Vael'Kurash)* — découpe rituelle des bêtes ancestrales

---

## 11. Décisions ouvertes

- [ ] **Frontière Boucher / Charcutier** : 1 métier avec spé ou 2 distincts ? Proposition : 1 métier avec spé Charcuterie palier Adepte+
- [ ] **Frontière Boucher / Dépéceur** : Boucher en atelier vs Dépéceur sur terrain — semble clair, à valider
- [ ] **Cuir/peau livraison** : Boucher prélève systématiquement et livre au Tanneur, ou peut-il les conserver/vendre lui-même ? Proposition : peut conserver (revendable), mais Tanneur les transforme uniquement
- [ ] **Sang créature** comme composant : tier varie comment ? Voir [[Sources de Ressources]]. Pattern à confirmer
- [ ] **Calibration conservation** par tier (1/3/7/15/30/90 jours) à playtester
- [ ] **Charcuterie signature** par grand pays — Phase 4, ~30 signatures à produire

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Viande]] · [[Os]] · [[Cuisinier]] · [[Tanneur]] · [[Apothicaire]] · [[Bestiary/Index]] · [[Économie]] · [[Les Ères]] · [[Lore/Religions/Vael'Kurash]]*
