---
tags: [métier, archétype, artisanat, vigueur, endurance, forge]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Vigueur
stats_secondaires: [Endurance, Acuité, Mémoire]
craft_category: Forge
sources_ressources_accessibles: [Lingot, Alliage, Fil métallique, Charbon, Cuir tanné, Bois, Pigment, Fondant]
stations_principales: [Four à fondre, Forge à charbon, Enclume, Bac à trempe, Étau, Moule à lingot]
outils_principaux: [Marteau de forge, Pince de forge, Soufflet, Lime, Burin, Poinçon-signature]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Mineur, Métallurgiste, Tanneur, Menuisier, Bijoutier, Architecte]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-paliers-playtest, frontière-Forgeron-Armurier-Métallurgiste, mini-jeu-trempe-précis]
---

# 🔨 Archétype-Métier — Forgeron

> [!info] Entités tutélaires canoniques
> **[[Cosmologie|Ferros]]** (Céleste — *Forgeron légendaire*, maître artisan des métaux) et **[[Cosmologie|Forgion]]** (Céleste — *Enchanteur d'armes légendaires*) — voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> Premier archétype-référence de la **catégorie [[Métiers|Artisanat et Production]]**. Pose les **patterns canoniques** de la forge (chauffe → frappe → trempe → finition) et l'angle **Métier joueur** complémentaire à l'angle **Comportement PNJ** déjà ébauché dans [[Forgeron]].

> **Articulation avec l'ébauche PNJ** : [[Forgeron]] décrit la *boucle BT/routine quotidienne* d'un PNJ Forgeron (T1 récupérer → T7 poser pièce). Le présent archétype décrit le *métier jouable* : stats, paliers de Maîtrise, recettes débloquées, économie. Les deux fichiers se référencent mutuellement, ne se dupliquent pas.

---

## 1. Vue d'ensemble

Le **Forgeron** est l'artisan métal d'Hybelior. Il transforme les [[Lingot|lingots]] et [[Alliage|alliages]] (eux-mêmes issus de la fonte des minerais — voir [[Sources de Ressources]] §Fabriqué) en armes mêlée, armures plate/mailles, outils métalliques et composants pour les autres métiers (manches métalliques, parures de bouclier, ferrures de menuiserie).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Mineur]] (minerais bruts) → [[Métiers|Métallurgiste/Fondeur]] (lingots) → Forgeron
- **Aval** : [[Bijoutier]] (consomme lingots précieux), [[Architecte]] (consomme ferrures), [[Menuisier]] (consomme outils forgés), joueurs combattants (consomment armes/armures)

**Identité gameplay :**
- Métier **physique** par excellence — `Vigueur` (frappe au marteau), `Endurance` (sessions longues à la chaleur), `Acuité` (précision frappe), `Mémoire` (recettes complexes)
- Métier **central de l'économie joueur-driven** : *"Les meilleurs items viennent des joueurs"* ([[Économie]]) — le Forgeron Maître produit ce que personne d'autre ne peut produire
- Métier **lourd à équiper** : station triplette (four + enclume + trempe), peu d'aventure mobile possible — pousse à la sédentarité d'atelier

**Ancrage culturel :** chaque grande nation a son école de forge — Mosrack (cité-forge des plaines centrales, voir [[Lingot]] §7), Cendara (forge volcanique), Alkaran (forge du Nord, technique du froid), Galenor (forge impériale).

---

## 2. Stats & Maîtrises

### Stats brutes ([[Personnage]] couche 1) sollicitées

| Stat | Rôle dans le métier | Magnitude d'impact |
|------|----------------------|---------------------|
| **Vigueur** *(principale)* | Force de frappe au marteau, port des pièces lourdes | Direct — plafonne la puissance de frappe et la qualité de la déformation |
| **Endurance** *(principale)* | Tenir des heures à la chaleur du four | Direct — plafonne la durée de session avant fatigue Labeur |
| **Acuité** *(secondaire)* | Précision frappe, lecture température métal, détection scories | Multiplicative — qualité de la pièce finale |
| **Mémoire** *(secondaire)* | Recettes complexes, signatures pays, alliages rares | Débloque palier Expert+ |
| Vivacité | Cadence frappe, refroidissement maîtrisé | Marginal — gain de vitesse exécution |
| Esprit / Résonance | Forge magique (T5+ avec [[Le Lien]]) | Niche — uniquement pour items enchantés à la fonte |

### Maîtrises contextuelles ([[Personnage]] couche 2)

- **`Maîtrise_Forge`** — racine du métier, monte par exécution réussie
- **`Maîtrise_Trempe`** — sous-maîtrise (qualité durabilité)
- **`Maîtrise_Gravure`** — sous-maîtrise cosmétique (poinçon, motif)
- **`Maîtrise_Fonte`** — partagée avec [[Métiers|Métallurgiste]] (production de lingots à partir de minerai)

> **Cohérent avec la formule [[Personnage]]** : `Qualité de craft = Acuité × Mémoire × Maîtrise_Forge`. Un Forgeron à Acuité 80, Mémoire 60, Maîtrise_Forge palier 4 produit en moyenne du **Magistral**.

---

## 3. Sources de ressources accessibles

> Voir [[Sources de Ressources]] §Fabriqué et §Nature.

### Intrants principaux

| Intrant | Source | Notes |
|---------|--------|-------|
| [[Lingot]] (fer, cuivre, étain, plomb, zinc, argent, or, chrome, tungstène, mithril, adamantium, orichalque, cosmium) | Fabriqué (Forgeron/Métallurgiste) | Brique de base — voir [[Lingot]] §3 table par tier |
| [[Alliage]] (acier, bronze, laiton, acier inox, acier au tungstène, acier Ivar, bliysium…) | Fabriqué (Métallurgiste) | T2-T6 — voir [[Alliage]] |
| [[Fil métallique]] | Fabriqué | Pour fines décorations, mailles |
| **Minerai brut** | Nature ([[Mineur]]) | Si le Forgeron pratique aussi la fonte |
| **Charbon** | Nature ([[Bûcheron]] / [[Mineur]] charbon) | Combustible — toutes recettes |
| **Fondant** (silice, poudre naturelle) | Nature | Élimination scories en fonte (T2+) |
| [[Cuir tanné|Cuir]] | Fabriqué (Tanneur) | Poignées, sangles, garnitures intérieures armure |
| [[Bois]] / [[Planche]] | Nature/Fabriqué | Manches, hampes, crosse |
| **Pigment** | Fabriqué (Teinturier) | Coloration métal (bleu, doré, noir) |
| **Cristal de Voie** | Drop d'ère / [[Le Lien]] | T5+ uniquement, forge magique |

### Sortie économique typique

- 1 session de forge (Labeur ~30%) → **1 arme T2-T3** OU **1 pièce d'armure T2-T3** OU **3-5 outils T1**
- Maître : ~1 arme T5 par session intense (Labeur ~80%)

---

## 4. Stations + outils

> Cohérent avec [[Crafts]] §1 Forge et station triplette dans [[Forgeron]] (PNJ).

### Stations principales

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Four à fondre** | Fonte minerai → lingot | T1+ |
| **Forge à charbon** | Réchauffage métal pour façonnage | T1+ (Forge basique), T3+ (Forge améliorée), T5+ (Forge cosmique) |
| **Enclume** | Frappe et déformation | T1+ (basique), T4+ (enclume signature) |
| **Bac à trempe** | Refroidissement contrôlé | T1+ (eau), T3+ (huile/sel), T5+ (rituel) |
| **Étau** | Maintien pièce, finition lime/burin | T2+ |
| **Moule à lingot** | Coulée standardisée | T1+ |
| **Atelier mobile** *(version réduite)* | Forge de campagne | Qualité plafonnée à T2 |

### Outils du Forgeron

| Outil | Catégorie | Notes |
|-------|-----------|-------|
| **[[Marteau de forge]]** | [[Catégories d'Items]] §Outils | Outil principal — différent du Marteau-arme |
| **Pince de forge** | Outils | Manipulation pièce chaude |
| **Soufflet** | Outils | Attiser le feu — partagé [[Métiers|Verrier]] |
| **Lime / Burin** | Outils | Finition |
| **Poinçon-signature** | Outils Maître | Marquer les pièces signature (palier Expert+) |

---

## 5. Paliers de Maîtrise

> Pattern canonique aligné [[Armes et Maîtrise]] (5 paliers Novice → Maître). Conditions cachées 🔒 au palier 5.

| Palier | Capacités débloquées | Conditions de progression |
|--------|----------------------|----------------------------|
| **1 — Novice** | Recettes T1 (lingot brut, outils basiques, armes T1). Taux d'échec ~15%. Mini-jeu : 1 jauge timing température | Défaut |
| **2 — Initié** | Recettes T2 (armes acier basique, mailles, casques simples). Taux échec ~8%. Mini-jeu : 2 phases (chauffe + frappe). Accès aux **alliages binaires** (Bronze, Laiton) | Usage : ~50 forges réussies + commande validée |
| **3 — Adepte** | Recettes T3 (armes œuvrées, plate moyenne, outils précis). Taux échec ~5%. Mini-jeu : 3 jauges. Accès **gravures personnalisées** (cosmétique). Peut former un apprenti PNJ. | Usage + condition : forger 200 pièces + tester 10 alliages |
| **4 — Expert** | Recettes T4 Magistral (armes signature, plate complète, items à 1 affixe). Taux échec ~3%. Mini-jeu : 4 jauges + précision coulée. Débloque **Mithril** et **Acier au tungstène**. Poinçon personnel autorisé. | Usage + condition : 500 pièces + signer 1 ouvrage reconnu (Reconnaissance ≥ Adepte dans une cité) |
| **5 — Maître** 🔒 | Recettes T5 Légendaires (Mithril Eldoria, Adamantium, Orichalque). Procs T6 Mythique possibles. Taux échec ~1%. Mini-jeu : 5 jauges + canalisation [[Le Lien]] optionnelle. Quête secrète, technique signature, skin de marteau légendaire | **Condition cachée** : ex. forger sous une éruption volcanique active, forger un objet pour un Éternel, terminer une "Forge des Cent Pièces", découvrir une Trace de l'Arrachement (voir [[Traces des Ères]]) |

> **Décroissance** : la Maîtrise_Forge décline si non entretenue (≥ 30 jours sans forge → −1 palier latent jusqu'à reprise). Voir [[Personnage]] §Maîtrises et [[Le Souffle]] §Rouille post-Souffle.

### Rouille post-[[Le Souffle|Souffle]]

| Effet | Magnitude | Durée |
|-------|-----------|-------|
| Première semaine post-Souffle : taux échec doublé, qualité −1 tier sur procs | −15% performance | 7 jours, dissipation par ~10 forges |

---

## 6. Crafts / recettes débloqués

> Voir [[Crafts]] §1 Forge pour la taxonomie. Tableau : ce que **chaque palier débloque concrètement**.

### Palier × Type de production

| Palier | Armes mêlée | Armures | Outils / divers | Joaillerie / fin |
|--------|--------------|---------|------------------|--------------------|
| Novice | [[Dague]] T1, [[Hache à une main]] T1, [[Marteau à une main]] T1 | Casque cuir-renforcé T1 | Clous, fers à cheval, [[Marteau de forge]], [[Pioche]] | — |
| Initié | [[Épée à une main]] T2, [[Lance]] T2, [[Hache à deux mains]] T2 | [[Cuirasse]] mailles T2, [[Heaume]] T2, [[Gantelets]] T2, [[Jambières]] T2 | Outils précis ([[Aiguille et fuseau|aiguille]], [[Faux]], [[Hache de bûcheron]]) | Anneaux simples ([[Anneau]] T1-T2 fer/cuivre) |
| Adepte | T3 toutes armes mêlée + [[Bouclier]] renforcé | Plate complète T3 (8 slots), [[Pauldrons]] T3, [[Brassards]] T3 | Outils signature, ferrures pour [[Architecte]] | [[Bracelet]] T3, parures pour bouclier |
| Expert | T4 Magistral signatures (Acier-Mosrack, Acier Ivar) — voir [[Lingot]] §7 | Plate Magistrale T4, mailles T4 — possibilité affixe par sertissage | Manches signature, [[Marteau de forge]] Magistral | [[Anneau]] T4 (or, argent — frontière avec [[Bijoutier]]) |
| Maître 🔒 | T5 Légendaires (Mithril, Adamantium), T6 Mythique sur quête | Plate T5 (Mithril-Eldoria, Adamantium-Profondeurs), T6 sur quête | Outils sacrés (poinçon-Maître, marteau-relique) | Sertissage sur arme/armure (frontière Bijoutier) |

### Pattern recette canonique Forge

> Tier N requiert : **N+1 unités de lingot/alliage** + **(N×2) charbon** + **(N-1) fondant** + **(N-1) intrants secondaires** (cuir poignée, bois manche, pigment) + **station de qualité ≥ T-1** + **palier Mastery requis**.

| Recette type | Tier | Intrants | Durée | Mini-jeu | Sortie |
|--------------|------|----------|-------|----------|--------|
| [[Épée à une main]] T3 | 3 | Lingot acier × 2, Cuir × 1, Bois × 1, Charbon × 4 | 4 min | 3 jauges (chauffe + frappe + trempe) | 1× Épée œuvrée |
| [[Cuirasse]] plate T4 | 4 | Lingot acier × 6, Cuir × 3, Fil métallique × 2, Charbon × 12 | 20 min | 4 jauges + assemblage | 1× Cuirasse Magistrale |
| [[Hache à deux mains]] T5 | 5 | Lingot mithril × 3, Bois rare × 2, Cuir Magistral × 2, Charbon × 16 | 60 min | 5 jauges + canalisation | 1× Hache Légendaire |

---

## 7. Carrière et débouchés

### Échelle d'évolution joueur

```
[Apprenti errant] → [Forgeron de village] → [Forgeron de cité] → [Forgeron-Maître reconnu] → [Forgeron-Légende d'une nation]
        ↓                  ↓                       ↓                    ↓                          ↓
   Recettes T1          Boutique fixe         Commandes nobles    Signature reconnue        Œuvre dans les chroniques
   Atelier mobile       Apprentis PNJ         Festivals d'art      Héritage [[Mort]]
```

### Débouchés

- **Boutique propre** : ouverture d'atelier (cf. [[Économie]] §Logistique), revenu passif via PNJ apprenti
- **Forgeron de guilde** : équipement standardisé pour membres ([[Guildes]])
- **Armurier de noble** : commande exclusive (Reconnaissance ≥ Adepte)
- **Forgeron-Légende** : Renom inscrit dans les chroniques de Partie ([[Mort]] §Renom, [[Le Souffle]] §Héritage), titre **"Forgeron-Maître des Sept Aciers"** (palier Maître + 7 alliages T5+ forgés)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 2 — Artisanat et production). Ces rôles correspondent à des **paliers Maître+** absorbés du legacy AccessExport.

#### Sous-spécialisation Maître+ : Maître forgeron

> Source canonique : `Role.csv` (cat 2, role n°5).

- **Description** : titre canonique du palier 5 — Forgeron reconnu comme l'autorité de référence d'une cité ou d'une nation. Forge des pièces signature T5+, peut former des apprentis et siéger aux guildes.
- **Conditions** : palier Maître + ≥ 5 ans d'activité reconnue + signature poinçonnée déposée dans une cité notable + 🔒 condition cachée (cf. §5 — éruption volcanique, "Forge des Cent Pièces", commande pour un Éternel, etc.).
- **Notes** : équivalent direct du **Forgeron-Maître reconnu** dans l'échelle d'évolution joueur (§7). Quand le titre est lié à une école nationale (Mosrack, Cendara, Alkaran, Galenor), il devient « Maître forgeron de [pays] ».

### Métiers complémentaires fortement liés

- **[[Mineur]]** — fournisseur amont quasi obligatoire
- **[[Métiers|Métallurgiste]]** — séparation possible (un Forgeron Maître peut sous-traiter la fonte)
- **[[Tanneur]]** — fournisseur cuir (poignées, sangles)
- **[[Menuisier]]** — fournisseur bois (manches, hampes)
- **[[Bijoutier]]** — frontière Joaillerie (sertissage gemmes sur armes/armures)
- **[[Architecte]]** — fournisseur de ferrures, charnières, pentures pour bâtiments

---

## 8. Modulation par contexte

### Par ère active ([[Les Ères]])

| Ère | Effet sur le Forgeron |
|-----|------------------------|
| **Feu Endormi** (Eldoria) | +20% qualité Forge, +10% chance affixe rare sur armes, accès Mithril facilité |
| **Ombre Longue** (Noctis) | −10% production, prix minerai +25%, recettes *Shadow* débloquées |
| **Sommeil de Glace** (Climata) | −10% rendement (chaleur dispersée), +30% qualité trempe (eau froide pure) |
| **Verdoiement** (Terranu) | Recettes ferrures agricoles boostées, focus outils plutôt qu'armes |
| **Échos Brisés** (Tempora) | Forges instables : ±15% rendement aléatoire, items *Brisé* possibles |
| **Brume Mortelle** (Umbra) | Forges sombres : recettes obscures, items *Pourpre* gratuits |

### Par contexte local

- **Pénurie de minerai** ([[Économie]] joueur-driven) : recettes en sursis, prix flambés
- **Faction militaire** ([[Factions]]) : commandes en série armures/armes — flux Éclats régulier mais marges resserrées
- **Religion forge** ([[Lore/Religions/Ignis Aeternum]]) : Reconnaissance + permet recettes *Cuit au feu sacré* (cf. [[Pain]] §5 affixe 2 — pattern partagé)

### Spécialisations possibles

- **Forgeron d'armes** (focus mêlée) — débloque techniques de saignement/stagger
- **Forgeron d'armures** (focus 8 slots plate/mailles) — frontière [[Métiers|Armurier]]
- **Forgeron d'outils** (focus outils métiers) — fournisseur des autres artisans
- **Forgeron rituel** (cosmétique + magique T5+) — frontière [[Enchanteur d'objet]]

---

## 9. Économie

### Ratios canoniques

| Métier | Investissement intrants | Marge typique | Vitesse rotation |
|--------|--------------------------|---------------|--------------------|
| Forgeron Novice | Lingot fer 5 Éclats × 2 + charbon = ~12 Éclats | Vente arme T1 ~25 Éclats → marge ~50% | 1 pièce / heure réelle |
| Forgeron Adepte | Lingot acier 30 Éclats × 2 + charbon = ~80 Éclats | Vente arme T3 ~250 Éclats → marge ~70% | 1-2 pièces / 2 heures |
| Forgeron Maître | Lingot Mithril 800 Éclats × 3 + composants = ~3000 Éclats | Vente arme T5 signature ~10 000-50 000 Éclats → marge ~70-90% | 1 pièce / session intense |

### Gold sinks contribués

- **Réparation d'équipement** ([[Économie]] §Gold sinks Cat. 1) — 5-50 Éclats, source de revenu régulier
- **Gravure / poinçon personnalisé** — 50-500 Éclats par pièce
- **Commande exclusive** (joueur paie d'avance) — 1000+ Éclats
- **Forgeron-Maître refonte** — recyclage arme cassée (50% rendement, voir [[Lingot]] §8)

### Hôtel des ventes ([[Économie]])

- Items joueur > items PNJ marchand : prix premium pour signatures
- Fluctuations par ère : items "ère précédente" deviennent reliques (post-Souffle)

---

## 10. Comportement IA + signatures PNJ

### Lien avec l'ébauche [[Forgeron]] (PNJ)

> Cet archétype-métier décrit le **versant joueur** ; [[Forgeron]] décrit le **versant PNJ** (boucle BT 7 tâches : T1 récup matériel → T7 poser pièce). Les deux fichiers se croisent sur :

| Élément partagé | Référence |
|-----------------|-----------|
| Stations triplette (four + enclume + trempe) | [[Forgeron]] §Boucle de forge |
| Mini-jeu timing température | [[Forgeron]] T3 + présent §6 mini-jeu |
| Paliers Mastery PNJ | [[Forgeron]] §Paramètres `mastery_level` |
| Modulation par ère | Identique (cohérence stricte) |

### Signatures PNJ Forgerons par grand pays (stub Phase 4)

- **Aldric le Marteau-de-Mosrack** (Maître, Acier-Mosrack canonique — voir [[Lingot]] §7)
- **Vesna la Givrée** (Maître, Alkaran — spécialiste trempe en eau de glace)
- **Théron du Cratère** (Maître, Cendara — forge volcanique, Ignis Aeternum)
- **Olwyn la Sertisseuse** (Maître, Avalor — frontière Bijoutier-Forgeron, sertissage royal)
- **Ivar Sanglant** (Maître-Légende, signataire de l'Acier Ivar — Galenor impérial)

### Pour les joueurs aspirant Maître

- Quêtes signatures par cité (~30 cités notables, 1 Forgeron-Maître chacune)
- Apprentissage chez un Maître débloque **+1 palier potentiel** (réduit la condition cachée de 50%)
- Forge en duo avec un Métallurgiste séparé : +20% rendement (synergie de métiers)

---

## 11. Décisions ouvertes

- [ ] **Frontière Forgeron / Métallurgiste / Armurier** : 3 métiers distincts ou 3 spécialisations d'un même Forgeron ? Proposition canonique : **1 Forgeron principal** avec **3 spécialisations possibles** au palier Adepte (focus arme / armure / outil)
- [ ] **Sertissage gemmes** : Forgeron Expert+ ou réservé Bijoutier ? Proposition : Bijoutier produit la gemme taillée et la sertit ; Forgeron prépare le logement seulement
- [ ] **Forge magique T5+** : Forgeron seul ou co-craft avec Enchanteur ? Proposition : Forgeron forge la base, [[Enchanteur d'objet]] appose l'enchantement après (deux étapes distinctes)
- [ ] **Apprenti PNJ** : un Forgeron-Maître joueur peut-il employer un PNJ apprenti ? Proposition : oui à partir d'Adepte, +20% rendement passif, coût 100 Éclats/jour
- [ ] **Calibration paliers** : seuils d'usage (50/200/500 forges) à playtester
- [ ] **Mini-jeu trempe** : précision exacte du timing à définir (Phase 3)

---

*Liens : [[Métiers]] · [[Forgeron]] (angle PNJ) · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Armes et Maîtrise]] · [[Le Souffle]] · [[Lingot]] · [[Alliage]] · [[Épée à une main]] · [[Cuirasse]] · [[Économie]] · [[Les Ères]]*
