---
tags: [métier, archétype, artisanat, acuité, verbe, couture, vêtements]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Acuité
stats_secondaires: [Verbe, Mémoire, Vivacité]
craft_category: Tissage et confection
sources_ressources_accessibles: [Tissu, Fil, Pigment, Broderie, Boutons (Bijoutier), Cuir (lacets), Fourrure]
stations_principales: [Atelier de couture, Patron de couture, Métier à broder, Mannequin de mesure]
outils_principaux: [Aiguille, Ciseaux, Mètre, Patron, Dé à coudre, Fer à repasser]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Tisserand, Métiers#Couturier, Métiers#Brodeur, Cordonnier, Forgeron (boucles), Bijoutier (boutons précieux)]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Tailleur-Tisserand-Couturier-Brodeur, robes-magiques-armure-tissu, vêtements-civils-vs-armure]
---

# 👗 Archétype-Métier — Tailleur

> Métier **assembleur du tissu**. Le Tailleur prend le **tissu** (produit par le [[Tisserand]]) et le coupe/coud en **vêtements** (civils, robes, capes, tabards, robes magiques d'armure tissu). Frontière nette : **Tisserand fabrique l'étoffe**, **Tailleur la met en forme**.

---

## 1. Vue d'ensemble

Le **Tailleur** mesure, coupe, assemble, brode, finit des vêtements. Il fournit les slots **Tête (capuche)**, **Torse (robe, tunique)**, **Cape**, **Tabard** ([[Personnage]] §Emplacements d'équipement) en classe d'armure **Tissu** et en classe **Civile** (non-armure).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Tisserand]] (tissu de toutes natures), [[Forgeron]] (boucles, broches métalliques), [[Bijoutier]] (boutons précieux), [[Tanneur]] (cuir lacets/garniture), [[Métiers|Apothicaire]] (teintures rares)
- **Aval** : joueurs (slot Vêtement et Cape — voir [[Catégories d'Items]] §Vêtements)
- **Frontière** :
  - **Tailleur ≠ Tisserand** : Tisserand produit le **tissu intermédiaire** ; Tailleur le **coupe et le coud**. Distinction nette, métiers complémentaires.
  - **Tailleur ≠ Couturier** : Couturier = sous-spé Tailleur palier Adepte+ (couture seule, pas la coupe haut de gamme)
  - **Tailleur ≠ Brodeur** : Brodeur = sous-spé Tailleur ou métier séparé (broderie spécifique, palier Expert+)
  - **Tailleur ≠ Cordonnier** : Cordonnier = chaussures/maroquinerie cuir
  - **Tailleur ≠ Forgeron** : armure plate/mailles = Forgeron ; armure tissu/robe = Tailleur

**Identité gameplay :**
- Métier **précis-cosmétique** — `Acuité` (coupe, couture, mesure), `Verbe` (vente, présentation), `Mémoire` (patrons, signatures, modes), `Vivacité` (cadence couture)
- Métier **cosmétique fort** : les vêtements signent le statut social et la culture
- Métier **pivot mage** : produit les **robes d'armure tissu** (cf. [[Catégories d'Items]] §Armure Tissu — pour les magiciens et [[Le Lien|Liés]])

**Ancrage culturel :** Avalor (robes royales en or), Endora (vêtements raffinés), Galenor (uniformes impériaux, tabards), Onara (robes cérémonielles), Cestra (vêtements marins en lin), Vytharia (robes funéraires), Alkaran (vêtements épais bordés fourrure).

---

## 2. Stats & Maîtrises

| Stat | Rôle |
|------|------|
| **Acuité** *(principale)* | Coupe précise, couture régulière, mesure |
| **Verbe** *(principale)* | Vente, présentation, mode |
| **Mémoire** *(secondaire)* | Patrons, signatures, modes culturelles |
| **Vivacité** *(secondaire)* | Cadence couture |
| Endurance | Sessions longues |

### Maîtrises contextuelles

- **`Maîtrise_Couture`** — racine
- **`Maîtrise_Patronnage`** — sous-spé coupe précise (palier Adepte+)
- **`Maîtrise_Broderie`** — sous-spé décoration (palier Expert+)
- **`Maîtrise_Robe_Magique`** — sous-spé armure tissu pour Liés (palier Expert+, frontière [[Enchanteur d'objet]])
- **`Maîtrise_Mode_Cérémonielle`** — sous-spé événements/cour (palier Maître)

---

## 3. Sources de ressources accessibles

### Intrants

| Intrant | Source | Notes |
|---------|--------|-------|
| **[[Tisserand|Tissu]]** | Fabriqué (Tisserand) | Coton, lin, laine, soie, chanvre — voir [[Sources de Ressources]] §Fabriqué |
| **Fil** | Fabriqué (Tisserand / Cordier) | Couture |
| **Pigment** | Fabriqué (Teinturier) | Coloration tissu |
| **Broderie / Fil métallique** | Bijoutier / Métallurgiste | Broderie de luxe (palier Expert+) |
| **Boutons / Boucles** | Forgeron / Bijoutier | Attaches |
| **Cuir** *(lacets, garniture)* | Tanneur | Détails, ceintures intégrées |
| **Fourrure** | Créature | Doublures, capes nordiques |
| **Cristal de Voie** | Drop ère / [[Le Lien]] | Robes magiques (T5+) — frontière Enchanteur |

### Sortie

- 1 session (Labeur ~25%) → 1 vêtement T2 OU 2-3 vêtements simples T1 OU 1 robe signature T4 (en plusieurs sessions)

---

## 4. Stations + outils

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Atelier de couture** | Travail principal | T1+ |
| **Patron de couture** | Gabarit modèle | T1+ |
| **Métier à broder** | Broderie décoration | T3+ |
| **Mannequin de mesure** | Ajustement client | T2+ |

### Outils

| Outil | Notes |
|-------|-------|
| **Aiguille / Fuseau** | Couture (cf. [[Catégories d'Items]] §Outils — partagé Tisserand) |
| **Ciseaux** | Coupe précise |
| **Mètre / Règle de mesure** | Mensurations |
| **Patron** | Modèle réutilisable |
| **Dé à coudre** | Protection doigts |
| **Fer à repasser** | Finition (palier Adepte+) |

---

## 5. Paliers de Maîtrise

| Palier | Capacités | Conditions |
|--------|-----------|------------|
| **1 — Novice** | Tunique simple, capuche, robe basique. T1. Échec 12% (couture défaillante) | Défaut |
| **2 — Initié** | Robes T2, capes simples, tabards basiques. Premier patron sur-mesure | Usage : 30 vêtements |
| **3 — Adepte** | Robes signature T3, capes ouvragées, tabards faction (héraldique simple). Broderie débloquée | Usage : 100 vêtements + commande noble |
| **4 — Expert** | Robes magiques T4 (armure tissu pour Liés). Robes de cour T4. Broderie complexe. Mode signature pays | Usage : 300 vêtements + signature reconnue |
| **5 — Maître** 🔒 | T5 Légendaire. Robes royales, tenues cérémonielles d'intronisation. T6 Mythique sur quête. Héritage | **Condition cachée** : ex. coudre la robe d'un Roi à son couronnement, fournir les robes d'une [[Guildes|guilde]] majeure (50+ membres), confectionner une tenue qui survit à un [[Le Souffle|Souffle]] |

---

## 6. Crafts / recettes débloqués

### Productions par palier

| Palier | Vêtements civils | Robes / armure tissu | Capes | Tabards | Spécial |
|--------|--------------------|----------------------|-------|---------|----------|
| Novice | Tunique T1, capuche T1 | — | Cape simple | — | — |
| Initié | Robe simple T2, tunique fine | Robe Tissu T2 | Cape T2 | Tabard simple | — |
| Adepte | Robe T3 signée, vêtements bourgeois | Robe magique T3 | Cape ouvragée | Tabard faction (héraldique) | Voile, foulard |
| Expert | Robe T4 cour | Robe magique T4 (logement enchantement) | Cape Magistrale | Tabard royal | Tenue cérémonielle T4 |
| Maître | T5 royal | T5 Légendaire (frontière Enchanteur) | T5 cosmique | T5 nation | Tenue intronisation |

### Pattern recette canonique Couture

> Tier N = **N tissu T-N** + **(N+1) fil** + **(N-1) finitions** (boutons, broderie, cuir) + **station T-1** + **Mastery requis** + (T3+) **patron sur-mesure**.

| Recette type | Tier | Intrants | Durée | Mini-jeu | Sortie |
|--------------|------|----------|-------|----------|--------|
| Tunique T2 | 2 | Tissu × 2, Fil × 3, Bouton × 1 | 20 min | 2 jauges (coupe + couture) | 1× Tunique Façonnée |
| Robe magique T4 | 4 | Tissu fin × 4, Fil × 6, Broderie × 2, Cristal logement × 1 | 2h | 4 jauges + broderie + ajustement | 1× Robe Tissu Magistrale (1 logement enchantement) |
| Cape signature T4 | 4 | Tissu × 3, Fourrure × 1, Fil × 4, Broderie héraldique × 2, Pigment × 2 | 3h | 4 jauges + broderie héraldique | 1× Cape Magistrale (1 affixe) |
| Tenue intronisation T5 | 5 | Tissu cosmique × 5, Fil mithril × 4, Broderie or × 3, Cristal × 2 | 2 jours | 5 jauges + canalisation | 1× Tenue Légendaire (3 affixes) |

### Affixes signature vêtement (10)

1. **Couture invisible** — durabilité ×1.5, reprises invisibles
2. **Doublure thermique** — résistance froid/chaud +20%
3. **Cape de voyageur** — −10% Labeur en voyage
4. **Vêtement-mémoire** — épouse forme du porteur (pas de gêne)
5. **Tabard de fierté** — bonus Présence en territoire allié faction
6. **Robe magique** — logement enchantement (frontière Enchanteur)
7. **Doré** ([[Les Ères|Rêve Lumineux]]) — broderie or, prestige
8. **Spectral** ([[Les Ères|Échos Brisés]]) — vêtement translucide brièvement (furtivité 5s)
9. **Sépulcral** ([[Lore/Religions/Vael'Kurash]]) — tenue funéraire, dialogues morts
10. **Cosmique** — survit au [[Le Souffle|Souffle]]

---

## 7. Carrière et débouchés

```
[Apprenti] → [Tailleur de marché] → [Tailleur de cité] → [Tailleur de cour / Couturier-Maître] → [Tailleur-Légende royal]
```

### Spécialisations

- **Tailleur civil** — vêtements communs
- **Tailleur de cour** — haute couture, exclusivité noble
- **Costumier rituel** — tenues cérémonielles religieuses
- **Couturier de robes magiques** — armure tissu pour Liés (frontière Enchanteur)
- **Brodeur** — palier Expert+ (frontière [[Métiers|Brodeur]])

### Débouchés

- **Boutique** — clientèle bourgeoise/noble
- **Tailleur de cour** — exclusivité noble (Adepte+)
- **Costumier de [[Guildes|guilde]]** — uniformes/tabards collectifs
- **Tenue d'intronisation / Mariage** — gros sinks Cat. 5 (cf. [[Économie]])
- **Tenue de festival** — flux régulier saisonnier

### Métiers complémentaires

- **[[Tisserand]]** — fournisseur amont obligatoire (frontière nette)
- **[[Forgeron]]** / **[[Bijoutier]]** — boucles, boutons précieux
- **[[Tanneur]]** — cuir détails
- **[[Cordonnier]]** — co-livraison tenue complète + bottes
- **[[Enchanteur d'objet]]** — co-craft robes magiques

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | Tissus végétaux abondants, +20% qualité |
| **Sommeil de Glace** (Climata) | Demande capes/fourrures +50% |
| **Vents** (Aerion) | Capes voyage bonifiées |
| **Brume Mortelle** (Umbra) | Vêtements *Pourpres*, immunité brume |
| **Présages** (Fatum) | Tenues cérémonielles bonifiées |
| **Rêve Lumineux** (Eldoria) | Broderie or, prestige boosté |

### Par contexte

- **Saison** — vêtements adaptés (chauds en hiver, légers en été)
- **Faction** — tabards/uniformes en série
- **Mariage / cérémonie noble** — gros sinks
- **Religion** — tenues sacrées par religion (9 styles canoniques)

---

## 9. Économie

### Ratios canoniques

| Palier | Coût intrants | Vente | Marge | Volume |
|--------|----------------|-------|-------|--------|
| Novice | 5-15 Éclats | 30 Éclats | ~50% | 3-5 / jour |
| Adepte | 50-200 | 300-1500 | ~75% | 1-2 / jour |
| Expert | 500-3000 | 3000-30 000 | ~80% | 1 / 2 jours |
| Maître | 5000-50 000 | 50 000-500 000 | ~85% | 1 / semaine |

### Gold sinks

- **Tenue de mariage** — gros sink Cat. 5 (10 000+ Éclats)
- **Tenue d'intronisation** — sink prestige (100 000+ Éclats)
- **Costumier guilde** — sink collectif

---

## 10. Comportement IA + signatures PNJ

### Routine Tailleur PNJ (Phase 2)

```
[Lever 07:00] → [Atelier matin : coupe / couture en cours]
              → [Boutique 10:00-18:00 : Mode Marchand + mesures clients]
              → [Soir : finition / broderie]
              → [Coucher 22:00]
```

### Signatures PNJ (Phase 4)

- **Maître Lyssira d'Avalor** — robes royales en or
- **Doyenne Aelis d'Endora** — haute couture raffinée
- **Padre Olwyn d'Onara** — robes cérémonielles Foedus Animae
- **Vasta la Bordée d'Alkaran** — vêtements nordiques fourrés
- **Maître Velka la Brodeuse** *(itinérante Maître)* — broderie héraldique faction

---

## 11. Décisions ouvertes

- [ ] **Frontière Tailleur / Tisserand / Couturier / Brodeur** : 1 racine **Tailleur** + Tisserand séparé (M2) + sous-spé Couturier/Brodeur. Validé canon.
- [ ] **Robes magiques armure tissu** : Tailleur produit la base, Enchanteur appose ? Proposition oui (co-craft canonique pour T4+)
- [ ] **Vêtements civils non-armure** : avantage statistique nul mais bonus social Présence ? Proposition : oui, +5 Présence T2-T3, +10 T4+
- [ ] **Calibration durabilité** par tissu et tier
- [ ] **Mode saisonnière** : système de "tendance" qui module les ventes ? Phase 4
- [ ] **Tenue cérémonielle religion** : 9 religions × Tailleur — Phase 4 (~9 tenues canoniques)

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Tisserand]] · [[Cordonnier]] · [[Bijoutier]] · [[Enchanteur d'objet]] · [[Économie]] · [[Les Ères]] · [[Lore/Religions/00 - Système Religieux]]*
