---
tags: [implementation, profession, métiers, craft, progression, balance, recettes]
status: drafted
last_review: 2026-05-07
needs_review_for: [recettes-tier-playtest, courbes-gain-tuning, balance-inter-métiers, conditions-maitrise-5]
type: implementation
canonical_concept: "[[Métiers]]"
---

# Profession System — Implémentation

> Page d'implémentation technique du concept narratif **[[Métiers]]**.
> Cette page contient la **liste exhaustive des 63 métiers**, leurs **paliers, recettes, courbes de gain, items produits, dépendances de récolte** et les règles de **balance inter-métiers**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Métiers]].
>
> Cette page **n'est pas** la spec du composant runtime. Pour les composants Unreal qui pilotent crafting, maîtrise et persistance, voir [[HW Progression Component]] / [[HW Inventory Component]] / [[Weapon Mastery]] (cette page-ci définit *ce qui doit être configuré dans les data tables*, l'autre définit *comment c'est branché côté C++/BP*).

---

## 1. Catalogue canonique — 63 métiers

### 1.1 Agriculture & Élevage (5)

| ID métier | Nom | Type | Récolte / Production | Dépendance amont | Sortie typique |
|---|---|---|---|---|---|
| `prof_agri_01` | Agriculteur | Récolte | Cultures saisonnières | Sol, climat (Ère) | Grains, légumes, fibres |
| `prof_agri_02` | Berger | Élevage | Bétail (laine, lait, viande) | Pâturage | Laine brute, lait, viande |
| `prof_agri_03` | Bûcheron | Récolte | Bois | Forêts | Bois brut (multiples essences) |
| `prof_agri_04` | Éleveur de créature | Élevage | Montures, créatures rares | Aliment, dressage | Montures, œufs, ressources animales |
| `prof_agri_05` | Meunier | Transformation | Mouture des grains | Agriculteur | Farine, son |

### 1.2 Artisanat & Production (19)

| ID métier | Nom | Type | Mini-jeu | Dépendance amont | Sortie typique |
|---|---|---|---|---|---|
| `prof_art_01` | Forgeron | Transformation | Timing martelage + chaleur | Mineur, Charbonnier | Armes, armures lourdes, outils |
| `prof_art_02` | Architecte | Conception | Plan + structure | Maçon, Charpentier | Bâtiments, fortifications |
| `prof_art_03` | Maçon | Construction | Mortier + alignement | Tailleur de pierre | Murs, voûtes, fours, ponts |
| `prof_art_04` | Charpentier | Construction | Levée collective + tenon-mortaise | Bûcheron, Menuisier | Charpentes, ponts, mâts, machines de siège |
| `prof_art_05` | Tailleur de pierre | Transformation | Tracé géométrique + burin | Mineur (carrière) | Blocs taillés, colonnes, dalles |
| `prof_art_06` | Bijoutier | Transformation | Précision + assemblage | Lapidaire, Forgeron | Bagues, amulettes |
| `prof_art_07` | Lapidaire | Transformation | Examen optique + facettes | Mineur (gemmes) | Gemmes taillées, cristaux de Voie |
| `prof_art_08` | Verrier | Transformation | Soufflage rythmé + colorants | Mineur (silice) | Plaques, fioles, vitraux, lentilles |
| `prof_art_09` | Boucher | Transformation | Découpe + conservation | Berger, Chasseur | Viandes, cuirs bruts, os |
| `prof_art_10` | Cordonnier | Transformation | Coupe + couture | Tanneur | Bottes, jambières légères |
| `prof_art_11` | Cuisinier | Transformation | Combinaisons + cuisson | Boucher, Agriculteur, Pêcheur | Plats avec buffs, régénération Labeur |
| `prof_art_12` | Dresseur de créature | Transformation | Apprivoisement | Éleveur | Créatures dressées (combat / travail) |
| `prof_art_13` | Enchanteur d'objet | Transformation | Incantations + runes | Lapidaire, Forgeron | Items enchantés temporaires |
| `prof_art_14` | Menuisier | Transformation | Assemblage bois | Bûcheron | Meubles, structures bois |
| `prof_art_15` | Sculpteur | Transformation | Sculpture détaillée | Tailleur de pierre, Menuisier | Statues, talismans |
| `prof_art_16` | Tailleur | Transformation | Coupe + assemblage tissus | Tisserand | Vêtements, armures légères, capes |
| `prof_art_17` | Tanneur | Transformation | Trempage + dosage tannins | Boucher | Cuirs tannés |
| `prof_art_18` | Tisserand | Transformation | Tissage rythmé | Berger, Agriculteur (fibres) | Tissus, armures de tissu |
| `prof_art_19` | Boulanger | Transformation | Dosage + cuisson | Meunier | Pain, pâtisseries (régénération basique) |

### 1.3 Commerce & Services (4)

| ID métier | Nom | Type | Sortie typique | Dépendance |
|---|---|---|---|---|
| `prof_com_01` | Marchand | Service | Commerce, marges | Tous métiers de production |
| `prof_com_02` | Banquier | Service | Prêts, dépôts en Éclat | — |
| `prof_com_03` | Tavernier | Service | Vente boissons, ambiance | Brasseur (PNJ), Cuisinier |
| `prof_com_04` | Aubergiste | Service | Régénération Labeur accélérée | — |

### 1.4 Gouvernance (5 — majoritairement PNJ)

| ID métier | Nom | Type | Sortie typique |
|---|---|---|---|
| `prof_gov_01` | Juge | Service | Application des lois locales |
| `prof_gov_02` | Conseiller | Service | Diplomatie, stratégie |
| `prof_gov_03` | Scribe | Production | Documents officiels, actes |
| `prof_gov_04` | Ambassadeur | Service | Relations entre nations |
| `prof_gov_05` | Avocat | Service | Défense légale |

### 1.5 Sécurité (8 — majoritairement PNJ)

| ID métier | Nom | Type | Sortie typique |
|---|---|---|---|
| `prof_sec_01` | Archer | Combat | Tir à distance |
| `prof_sec_02` | Assassin | Combat | Opérations secrètes |
| `prof_sec_03` | Espion | Renseignement | Information |
| `prof_sec_04` | Garde | Combat | Protection villes/PNJ |
| `prof_sec_05` | Soldat | Combat | Armée régulière |
| `prof_sec_06` | Chevalier | Combat | Élite militaire |
| `prof_sec_07` | Chasseur de primes | Combat | Traque joueurs Karma rouge |
| `prof_sec_08` | Mercenaire | Combat | Combat à la demande |

### 1.6 Érudition (7)

| ID métier | Nom | Type | Sortie typique | Dépendance |
|---|---|---|---|---|
| `prof_eru_01` | Alchimiste | Transformation | Potions, poisons, enchant. temp. | Herboriste, Mineur |
| `prof_eru_02` | Astronome | Service | Navigation céleste, prédictions | — |
| `prof_eru_03` | Médecin | Service | Soins avancés, antidotes | Apothicaire |
| `prof_eru_04` | Bibliothécaire | Service | Lore, grimoires | — |
| `prof_eru_05` | Enseignant | Service | Transmission de compétences | — |
| `prof_eru_06` | Historien | Service | Conservation du lore | Bibliothécaire |
| `prof_eru_07` | Chercheur | Production | Nouvelles recettes/formules | Tous |

### 1.7 Divertissements (5)

| ID métier | Nom | Type | Sortie typique |
|---|---|---|---|
| `prof_div_01` | Jongleur | Service | Attractions publiques |
| `prof_div_02` | Musicien | Service | Buffs de moral, ambiance |
| `prof_div_03` | Barde | Service | Récits, épopées (Reconnaissance) |
| `prof_div_04` | Acteur | Service | Représentations, festivals |
| `prof_div_05` | Peintre | Production | Art décoratif, cosmétiques |

### 1.8 Mysticisme (8)

| ID métier | Nom | Type | Sortie typique | Dépendance |
|---|---|---|---|---|
| `prof_mys_01` | Enchanteur du vivant | Transformation | Enchant. créatures vivantes | Dresseur |
| `prof_mys_02` | Mage | Service | Pratique des Voies | — |
| `prof_mys_03` | Prêtre | Service | Soins spirituels, rites | — |
| `prof_mys_04` | Guérisseur | Service | Soins physiques + spirituels | Apothicaire |
| `prof_mys_05` | Herboriste | Récolte | Plantes (alchimie, cuisine) | — |
| `prof_mys_06` | Nécromancien | Service | Voie de Navigor (interdit social) | — |
| `prof_mys_07` | Oracle | Service | Visions, augures (Voie Fatum) | — |
| `prof_mys_08` | Apothicaire | Transformation | Préparations médicinales | Herboriste |

### 1.9 Exploration (8)

| ID métier | Nom | Type | Sortie typique | Dépendance |
|---|---|---|---|---|
| `prof_exp_01` | Cartographe | Production | Cartes, topographie | Explorateur |
| `prof_exp_02` | Chasseur de créature | Récolte | Ressources animales, pièges | — |
| `prof_exp_03` | Chasseur de trésors | Récolte | Loot ruines, coffres cachés | — |
| `prof_exp_04` | Dresseur | Transformation | Apprivoisement créatures sauvages | — |
| `prof_exp_05` | Explorateur | Récolte | Découverte zones inconnues | — |
| `prof_exp_06` | Mineur | Récolte | Minerais (Forge, Lapidaire) | — |
| `prof_exp_07` | Navigateur | Service | Navigation maritime | Cartographe |
| `prof_exp_08` | Pêcheur | Récolte | Poissons, ressources aquatiques | — |

**Total : 63 métiers canoniques.**

> [!note] Sous-spécialisations
> Les **42 sous-spécialisations canoniques** (ex-`AccessExport/Role.csv`) sont absorbées dans les fiches métiers individuelles au palier **Maître+**. Voir `[[Registre des Décisions]]` D-METIERS-ROLES-CSV-INTEGRATION.

---

## 2. Paliers de progression — alignement Mastery

> **Renvoi canonique** : les 5 paliers de Maîtrise, leurs % de peuplement et leurs effets gameplay sont définis dans **[[Mastery System]]** (alias [[Weapon Mastery]] / [[Progression System]] §Couche 2). Ne pas dupliquer.

### 2.1 Application aux métiers

| Palier | Nom | Conditions d'accès | Effets sur le craft |
|---|---|---|---|
| **1** | Novice | Apprentissage initial (PNJ formateur ou observation) | Recettes Tier 1 (Commun). Échec craft 30%. Qualité aléatoire forte. |
| **2** | Initié | Seuil XP métier atteint | Recettes Tier 1–2 (Commun, Façonné). Échec 15%. Qualité moyenne. |
| **3** | Adepte | Seuil + diversité de matériaux/recettes | Recettes Tier 1–3 (jusqu'à Œuvré). Échec 8%. +1 slot enchant optionnel. |
| **4** | Expert | Seuil + œuvres signées + diversité | Recettes Tier 1–4 (jusqu'à Magistral). Échec 3%. Signature visible. Source d'Accord +10%. |
| **5** | Maître 🔒 | Voir §2.2 | Recettes Tier 1–5 (Légendaire). Tier 6 Mythique conditionnel. Échec <1%. Source d'Accord cumul +10%. Titre permanent. |

### 2.2 Conditions de Maîtrise — palier 5

Le palier 5 est **caché** : aucun PNJ n'annonce qu'on peut y accéder. Il se déclenche par **conjonction** de plusieurs conditions :

| Condition | Détail | Vérifié par |
|---|---|---|
| **Seuil d'XP métier** | XP métier max (palier 4 saturé pendant ≥ 30 jours) | `HWProfessionComponent` |
| **Œuvre signée Légendaire** | Au moins 1 item Tier 5 produit, signé, en circulation | `Inventory Items` metadata `signedBy` + `tier ≥ 5` |
| **Reconnaissance sociale** | Score réputation métier ≥ seuil (5+ reviews positives PNJ ou 3+ joueurs ayant porté l'œuvre) | Global Data Service |
| **Condition cachée d'Ère** | Spécifique au métier ET à l'Ère active (ex : Forgeron + Ère "Échos Brisés" = forger pendant un événement Tempora) | `HWProgressionComponent` `EHWConditionType::EraSpecific` |
| **Diversité de pratique** | Avoir produit au moins N recettes différentes du métier (N variable selon métier, typ. 15–30) | Compteur recettes uniques |

**Récompense** : Titre permanent (`Maître <Métier>`), accès Tier 5 Légendaire, +10% Accord cumulatif (couche 3), voix de PNJ apprentis qui cherchent à apprendre auprès du joueur.

### 2.3 Décroissance

Cf. [[Mastery System]] §Décroissance. Synthèse :
- ~1 palier perdu par mois sans pratique significative.
- Palier 5 ne descend jamais sous 4 (titre permanent).
- Rouille post-Souffle : −15% qualité craft pendant 1 sem (Petit Souffle), 2 sem (Grand). Cf. [[Souffle System]].

---

## 3. Recettes par tier — règles de balance

### 3.1 Tiers de recettes alignés sur les tiers d'items

| Tier recette | Palier requis | Tier item produit | Coût matériaux | Temps craft | Échec base |
|---|---|---|---|---|---|
| **T1 — Commun** | Novice | Commun | 1× | 1× | 30% Novice / 15% Initié+ |
| **T2 — Façonné** | Initié | Façonné | 1.5× | 1.3× | 15% Initié / 8% Adepte+ |
| **T3 — Œuvré** | Adepte | Œuvré | 2× | 1.7× | 8% Adepte / 3% Expert+ |
| **T4 — Magistral** | Expert | Magistral | 3× | 2.5× | 3% Expert / <1% Maître |
| **T5 — Légendaire** 🔒 | Maître | Légendaire | 4.5× | 4× | <1%, mais qualité variable |
| **T6 — Mythique** 🔒🔒 | Maître + condition cosmique | Mythique | 6×+ | 8× | Variable, 1 seul exemplaire monde |

> Renvoi pour le détail des **multiplicateurs de stats par tier d'item** : [[Progression System]] §Items §Différence concrète entre tiers.

### 3.2 Composition d'une recette (data structure)

```
ProfessionRecipe :
  recipeId          : FName
  professionId      : FName             # ex prof_art_01
  tier              : ETier (T1..T6)
  requiredMastery   : EMasteryTier (1..5)
  inputs            : Map<ItemId, Count>
  primaryStation    : EStationType      # Enclume, Métier à tisser, Fourneau...
  secondaryStations : Array<EStationType>
  baseDuration      : float (sec)
  baseFailureRate   : float [0, 1]
  qualityVariance   : float [0, 1]      # 0 = qualité fixe ; 1 = qualité très variable
  output            : Item
  outputCountRange  : Range<int>
  signedByDefault   : bool              # true à partir de T3
  unlockConditions  : Array<UnlockCondition>
  eraBonusEras      : Array<EEra>       # Ères qui boostent ce craft
  eraMalusEras      : Array<EEra>       # Ères qui pénalisent ce craft
```

### 3.3 Mini-jeux — variance qualité

Chaque métier de transformation expose un mini-jeu propre. La **variance qualité** dans la recette est modulée par la **performance du joueur dans le mini-jeu** :

| Performance mini-jeu | Effet sur la qualité finale |
|---|---|
| Échec critique | Item manqué (input perdu, pas de sortie) |
| Échec | Item Tier inférieur de 1, ou stats min |
| Réussite passable | Stats au seuil min de la recette |
| Réussite | Stats au milieu de la fourchette |
| Réussite parfaite | Stats au max + petite chance d'enchant gratuit |
| Critique | Item Tier supérieur de 1 (rare) ou propriété spéciale ajoutée |

---

## 4. Courbes de gain XP métier

### 4.1 Formule de base

L'XP métier suit la formule canonique du fenêtre d'écart (cf. [[Progression System]] §XP Scaling) — adaptée au craft :

```
EcartCraft = TierRecette − PalierJoueur

EcartCraft  ≤ −2  →   0% XP métier   (trivial)
EcartCraft  −1     →  25% XP métier
EcartCraft  0      → 100% XP métier   (recette à son palier — zone optimale)
EcartCraft  +1     → 130% XP métier   (challenging — qualité variable)
EcartCraft  +2     →  80% XP métier   (stretch)
EcartCraft  > +2   →  10% XP + risque échec critique
```

### 4.2 Diminishing returns — anti-farm craft

Identique au système global ([[Progression System]] §Diminishing returns) :

```
Crafter 5x la même recette dans la journée :
100% / 80% / 60% / 40% / 20% → puis 10% asymptotique
Reset à 100% au prochain cycle Labeur (jour réel)
```

### 4.3 Seuils d'XP cumulés par palier (estimation)

| Palier visé | XP métier cumul | Heures de pratique engagée | Heures casual |
|---|---|---|---|
| 2 — Initié | 1 000 | ~10 h | ~25 h |
| 3 — Adepte | 5 000 | ~40 h | ~100 h |
| 4 — Expert | 25 000 | ~150 h | ~400 h |
| 5 — Maître 🔒 | 100 000 + conditions §2.2 | ~600 h + RNG conditions | 1500+ h |

> Calibrage à playtester. Aligné sur [[Progression System]] §Cap d'évolution.

### 4.4 Modulateurs de gain

| Modulateur | Effet sur gain XP métier |
|---|---|
| Première fois sur la recette | ×2 (first discovery) |
| Recette d'Ère active (eraBonusEras) | ×1.5 |
| Recette d'Ère opposée (eraMalusEras) | ×0.5 |
| Joueur Concordant (100% Accord) | ×1.2 sur tout craft |
| Maîtrise palier 4+ Enseignant à proximité | ×1.3 (apprenti boost) |
| Atelier signé ou monument du métier proche | ×1.1 |

---

## 5. Items produits — synthèse par métier

> Renvoi exhaustif aux templates : [[Items]] / [[Inventory Items]]. Cette section liste **les sorties principales** par métier pour la balance économique.

### 5.1 Producteurs d'équipement de combat

| Métier | Sorties combat | Tier max accessible (Maître) |
|---|---|---|
| Forgeron | Armes lames, armures lourdes, outils | Légendaire |
| Tailleur | Armures légères, capes | Légendaire |
| Tisserand | Armures tissu, robes magiques | Légendaire |
| Cordonnier | Bottes, jambières légères | Magistral |
| Bijoutier | Anneaux, amulettes (slots enchant) | Légendaire |
| Enchanteur d'objet | Enchant temporaires sur tout équipement | Légendaire |
| Sculpteur | Talismans (slot enchant rare) | Magistral |
| Lapidaire | Gemmes/cristaux de Voie (consommables enchant) | Légendaire |

### 5.2 Producteurs de consommables

| Métier | Sorties consommables |
|---|---|
| Cuisinier | Plats à buffs, régénération Labeur |
| Boulanger | Pain, pâtisseries (régénération basique) |
| Alchimiste | Potions, poisons, enchantements temp. |
| Apothicaire | Médicaments, antidotes |
| Herboriste | Plantes brutes (intermédiaire) |
| Médecin | Soins avancés (service) |
| Guérisseur | Soins physico-spirituels (service) |

### 5.3 Producteurs de structures

| Métier | Sorties structures |
|---|---|
| Architecte | Plans (intermédiaires conception) |
| Maçon | Murs, voûtes, fours, ponts pierre |
| Charpentier | Charpentes, ponts bois, mâts, machines de siège |
| Tailleur de pierre | Blocs, colonnes, dalles |
| Verrier | Vitraux, fioles, lentilles |
| Menuisier | Meubles, structures bois |

### 5.4 Producteurs de savoir / culture

| Métier | Sorties savoir |
|---|---|
| Scribe | Documents, actes, copies de grimoires |
| Bibliothécaire | Lore, grimoires (compilation) |
| Historien | Chroniques, monographies |
| Chercheur | Nouvelles recettes/formules |
| Astronome | Cartes du ciel, prédictions |
| Cartographe | Cartes du monde |
| Peintre | Œuvres décoratives, cosmétiques |

---

## 6. Dépendances de récolte — graphe canonique

```
                    ┌─── Mineur ────┐
                    │               │
         ┌─Bûcheron│  Tailleur de   │
         │         │   pierre       │
         ▼         ▼     │          ▼
     Menuisier  Charpentier  Maçon  Forgeron
         │         │            │      │
         │         └──┐         │      ├── Bijoutier ←── Lapidaire ←── Mineur (gemmes)
         │            ▼         ▼      │
         │         Architecte ─┘       │
         │            (assemble)       │
         ▼                             ▼
      Sculpteur                    Enchanteur d'objet
                                       ▲
                                       │
                                   Lapidaire (cristaux Voie)


                    ┌── Berger ──── laine, lait, viande ──┐
   Agriculteur ─────┤                                      │
   (grains, fibres) │                                      │
        │           └── Boucher ──┬── viande ──┐           │
        │                          │            ▼           │
        │                          ▼         Cuisinier ←────┘
        │                       Tanneur ──→ Cordonnier
        │                       (cuir)        │
        ▼                                     │
     Meunier ──→ Boulanger                    │
        │                                     │
        ▼                                     │
     (farine)                                 │
                                              ▼
   Tisserand ←──── (fibres)              Tailleur (assemblage tissu)


   Herboriste ──→ Apothicaire ──→ Médecin / Guérisseur
        │              │
        ▼              ▼
   Alchimiste     (préparations)


   Pêcheur ──→ Cuisinier
   Chasseur de créature ──→ Boucher (viandes sauvages) / Tanneur (cuirs sauvages)
   Chasseur de trésors ──→ Marchand / Bibliothécaire (artefacts)
   Explorateur ──→ Cartographe ──→ Navigateur
```

**Règle de balance** : aucun métier de transformation Tier 4+ ne doit pouvoir être 100% autosuffisant. Un Forgeron Maître a **toujours** besoin d'un Mineur Maître (pour minerais Légendaires) et d'un Lapidaire (pour cristaux). Cette interdépendance est **structurelle**.

---

## 7. Balance entre métiers complémentaires

### 7.1 Paires complémentaires canoniques

| Paire | Métier amont | Métier aval | Ratio matière typique | Notes balance |
|---|---|---|---|---|
| **Bois** | Bûcheron | Menuisier / Charpentier | 1 bûche → 0.7 planche → 0.4 pièce assemblée | Charpentier consomme 2x plus que Menuisier par item |
| **Pierre** | Mineur (carrière) | Tailleur de pierre → Maçon | 1 bloc brut → 1 bloc taillé → 0.8 mur posé | Pertes au taillage = dechets recyclables (gravier) |
| **Métal** | Mineur | Forgeron | 3 minerai brut → 1 lingot → 0.5–1 item | Pertes scories ; Forge-bijoutier : 1 lingot → multi-bagues |
| **Gemme** | Mineur | Lapidaire → Bijoutier / Enchanteur | 5 gemme brute → 1 taillée → enchant ou bijou | Variance qualité forte sur taille |
| **Cuir** | Boucher / Chasseur | Tanneur → Cordonnier / Tailleur | 1 peau → 0.6 cuir tanné → 0.3 botte | Tannage = goulot temporel (jours réels) |
| **Tissu** | Berger / Agriculteur | Tisserand → Tailleur | 5 fibre → 1 tissu → 0.5 vêtement | Variance qualité selon teinture |
| **Grain** | Agriculteur | Meunier → Boulanger / Tavernier | 3 grain → 1 farine → 1 pain ou 0.5 bière | Saisonnalité |
| **Plante** | Herboriste | Alchimiste / Apothicaire | 3 plante → 1 potion / médicament | Plantes d'Ère = variance forte |
| **Poisson** | Pêcheur | Cuisinier | 1 poisson → 1 plat | Buffs spécifiques selon Ère |
| **Carte** | Explorateur | Cartographe → Navigateur | Découverte → carte → route maritime | Persistance monde |
| **Savoir** | Bibliothécaire / Historien | Chercheur / Mage | Lore → recette/formule | Conditions cachées |

### 7.2 Règle d'équilibre économique

Pour qu'un produit Tier N reste rentable pour le **dernier maillon**, la chaîne doit dégager un multiplicateur de valeur ≥ 1.5× par étape :

```
Valeur(item Tier N) ≥ 1.5 × Σ(Valeur inputs) + Coût Labeur du crafter
```

Si un Forgeron Maître ne peut pas vendre son épée Légendaire à 1.5× le coût des minerais + lingots + gemmes + son temps, le métier est **cassé** — les joueurs ne crafteront plus, l'économie collapse.

### 7.3 Goulots intentionnels

| Goulot | Métier(s) bottleneck | Raison design |
|---|---|---|
| Cuir Tier 4+ | Tanneur Adepte+ | Tannage = temps réel (≥ 24h), pas accélérable |
| Cristal de Voie | Lapidaire + Mineur en zones d'Ère | Récolte saisonnière liée à l'Ère active |
| Plantes d'Ère | Herboriste pendant Ère donnée | Disparaissent au Souffle |
| Pierre de carrière géante | Mineur + Tailleur de pierre | Coopératif (multi-joueurs) |
| Encre rare | Scribe + Alchimiste | Composition propre à chaque grimoire |

Ces goulots sont **désirés** : ils créent des relations sociales nécessaires (un Forgeron doit *connaître* un Mineur et un Lapidaire fiables).

---

## 8. Métiers et Souffle — modulation par Ère

> Renvoi : [[Souffle System]] §Bonus/Malus de Voie selon Ère.
> Ici : **table canonique des bonus/malus par métier × Ère active**.

### 8.1 Affinités métier × force dominante d'Ère

| Métier | Ère favorable (bonus +20% qualité, +30% gain) | Ère défavorable (malus −15% qualité, −20% gain) |
|---|---|---|
| Forgeron | Ignis (feu, forge active) | Aquor (humidité ronge le métal) |
| Maçon / Tailleur de pierre | Petra | Aerion (vent érode les chantiers) |
| Charpentier / Menuisier / Bûcheron | Spiritus (forêt vivante) | Ignis (incendies) |
| Tisserand / Tailleur / Berger / Agriculteur | Spiritus (verdoiement) | Noctis (sols stériles) |
| Verrier | Ignis + Aerion (combinaison) | Petra (manque de chaleur) |
| Bijoutier / Lapidaire | Lumina (lumière qui révèle les facettes) | Noctis |
| Enchanteur d'objet / Mage | Voie active dominante (cas par cas) | Voie opposée |
| Alchimiste / Apothicaire / Herboriste | Spiritus / Aquor | Ignis (sécheresse) |
| Pêcheur / Navigateur | Aquor | Ignis |
| Astronome / Oracle | Lumina (ciel clair) / Tempora | Aerion (tempêtes) |
| Cuisinier / Boulanger | Toutes Ères de "Verdoiement" / "Rêve Lumineux" | Ères de "Brume Mortelle" / "Ombre Longue" |
| Barde / Acteur / Musicien | Ères "festives" / Eldoria | Ères "lugubres" / Noctis |
| Scribe / Bibliothécaire / Historien | Tempora (mémoire active) | Aerion (dispersion) |
| Cartographe / Explorateur | Aerion (vents porteurs) / Spiritus | Brume Mortelle |
| Mineur | Petra | Aquor (mines inondées) |
| Chasseur de créature / Dresseur | Spiritus | Ignis |
| Nécromancien | Noctis / Navigor | Lumina (l'Ère du Rêve Lumineux le rejette) |

### 8.2 Stockage

```
ProfessionEraModifier (data table) :
  professionId    : FName
  eraTag          : FName (ex 'Era_Spiritus_Verdoiement')
  qualityModifier : float (-0.30 .. +0.30)
  xpGainModifier  : float (-0.50 .. +0.50)
  recipeUnlocks   : Array<RecipeId>   # recettes saisonnières
  recipeLocks     : Array<RecipeId>   # recettes verrouillées par cette Ère
```

### 8.3 Recettes éphémères par Ère

Certaines recettes ne sont **disponibles que pendant une Ère donnée**. Au prochain Souffle, la recette se verrouille jusqu'à retour de l'Ère compatible. Les items déjà craftés restent valides — cf. promesse "ce qui est mémoire reste" du [[Souffle]].

| Type de recette éphémère | Exemple | Condition |
|---|---|---|
| Plantes d'Ère | Potion de Ronces de Verdoiement | Spiritus actif |
| Métal d'Ère | Lingot de Pierre-Lumière | Lumina actif |
| Tissu d'Ère | Soie de Brume | Brume Mortelle |
| Encre d'Ère | Encre de Tempora | Échos Brisés |

---

## 9. Économie — œuvres signées

> Renvoi : [[Économie]] et [[Métiers]] §L'économie des œuvres signées.

### 9.1 Signature

À partir du Tier 3 (Œuvré), tout item produit porte la **signature du crafter** :

```
Item.metadata :
  signedBy          : PlayerId
  signedByName      : DisplayName    # cached for offline display
  craftedAt         : Timestamp
  craftedDuringEra  : EraId
  craftedAtLocation : LocationId
  craftRollCritical : bool           # true si réussite critique du mini-jeu
  isFirstDiscovery  : bool           # true si premier exemplaire de cette recette
```

### 9.2 Effet économique de la signature

| Élément | Effet |
|---|---|
| **Réputation du crafter** | Score réputation du joueur dans son métier ↑ à chaque item porté visiblement |
| **Prix de vente** | +10% à +50% sur la base, selon réputation du signataire |
| **Reconnaissance** | Mention dans la Bourse des Augures (BdA) lors de drops/échanges notables |
| **First discovery** | Bonus permanent +5% qualité sur cette recette pour le crafter, à vie |

### 9.3 Persistance inter-Souffles

La signature **survit aux Souffles** (cf. [[Le Souffle]] §Ce que le Souffle préserve). Une épée Légendaire forgée par un Maître il y a 3 Ères circule toujours avec son nom — c'est ce qui fait la **mémoire matérielle** du monde.

---

## 10. Dépendances système

| Composant | Rôle dans le Profession System |
|---|---|
| [[HW Progression Component]] | Conditions cachées palier 5, Héritage |
| [[HW Inventory Component]] | Stockage items, signature metadata |
| [[Weapon Mastery]] | Composant Maîtrise (mutualisé combat + craft) |
| [[Inventory Items]] | Format runtime des items produits |
| [[Inventory Persistence]] | Persistance signature + œuvres en circulation |
| [[Loot System]] | Drops minerais/plantes pour métiers de récolte |
| [[Entity Spawner]] | Spawn ressources selon Ère active |
| [[Quest System]] | Quêtes de craft (commandes PNJ, événements de métier) |
| [[Souffle System]] | Compression XP métier, rouille, recettes éphémères |
| [[Accord System]] | Source d'Accord +10% par palier 4+ et 5 |
| [[Global Data Service]] | Réputation crafter, items signés en circulation |

---

## 11. Points de calibrage à playtester

- [ ] Seuils XP cumulés par palier (1 000 / 5 000 / 25 000 / 100 000) — sentiment de progression juste / trop lent / trop rapide ?
- [ ] Conditions cachées Maître palier 5 — découvrabilité (joueurs trouvent-ils naturellement ?) vs frustration
- [ ] Multiplicateurs ratio matière (1 bûche → 0.7 planche → 0.4 pièce) — économie tient-elle ?
- [ ] Bonus/malus d'Ère (+20% / −15%) — incite-t-il vraiment à pivoter de métier secondaire selon la saison ?
- [ ] Recettes éphémères — frustration de perdre l'accès vs satisfaction de FOMO légitime
- [ ] First discovery +5% permanent — assez incitatif pour pousser à expérimenter ?
- [ ] Rouille craft post-Souffle (−15% qualité 1 sem) — narratif ou frustrant ?
- [ ] Goulot Tannage (24h+) — coopération sociale induite ou simplement gênant ?
- [ ] Diminishing returns par recette − reset journalier — empêche-t-il vraiment le farm sans étouffer le grind légitime ?

---

## 12. Décisions actées (techniques)

- ✅ **63 métiers canoniques** répartis en 9 catégories
- ✅ **5 paliers de Maîtrise** mutualisés avec [[Mastery System]] (Novice → Maître palier 5 verrouillé)
- ✅ **6 tiers de recettes** alignés sur les tiers d'items ([[Progression System]])
- ✅ **Conditions cachées Maître palier 5** : XP + œuvre signée Légendaire + reconnaissance + condition d'Ère + diversité
- ✅ **Signature à partir du Tier 3** Œuvré, persistante inter-Souffles
- ✅ **Recettes éphémères par Ère** — locks/unlocks au Souffle, items déjà créés conservés
- ✅ **Bonus/malus d'Ère** : qualité ±20%, gain XP métier ±30%
- ✅ **Diminishing returns** craft : −20% par répétition, reset journalier (Labeur)
- ✅ **Multiplicateur économique** ≥ 1.5× par étape de chaîne (anti-collapse)
- ✅ **Goulots intentionnels** sur tannage, cristaux de Voie, plantes d'Ère, pierres de carrière
- ✅ **Sous-spécialisations Role.csv** absorbées au palier Maître+ (D-METIERS-ROLES-CSV-INTEGRATION)

---

*Liens narratifs : [[Métiers]] | [[Armes et Maîtrise]] | [[Progression]] | [[Le Souffle]] | [[L'Accord]] | [[Économie]] | [[Labeur]] | [[Items]]*
*Liens techniques : [[Mastery System]] | [[Progression System]] | [[Souffle System]] | [[Accord System]] | [[HW Progression Component]] | [[HW Inventory Component]] | [[Weapon Mastery]] | [[Inventory Items]] | [[Inventory Persistence]] | [[Loot System]] | [[Quest System]]*
