---
tags: [architecture, matériaux, ressources, mapping, mécanique]
type: mechanic
status: drafted
last_review: 2026-05-01
needs_review_for: [matériaux-niveau-6-canoniques, variants-bois-précieux-par-pays, ajout-cuir-tanné-fabriqué]
---

# 🧱 Matériaux de Construction — Mapping vers les ressources

> Tout matériau de construction d'Hybelior se ramène aux **ressources canoniques** de [[Sources de Ressources]]. Ce fichier établit le mapping détaillé : *quel matériau* est produit *à partir de quelle ressource* via *quel craft* ([[Crafts]]) et utilisable à *quel niveau d'opulence* ([[Échelles et Niveaux]]).
>
> Aucun nouveau type de ressource n'est introduit ici — tous référencent les **15 ressources fabriquées**, les **21 récoltes nature** et les **25 récoltes créature** existantes.

---

## Vue d'ensemble du flux

```
[Récolte Nature]              [Fabrication]                    [Construction]
────────────────              ─────────────                    ──────────────
Bois (récolté)        ─→      Planche (Menuisier)         ─→   Habitation, Mobilier
Pierre (récoltée)     ─→      Brique (Maçon)              ─→   Murs, Voûtes, Forges
Minerai sablonneux    ─→      Plaque de verre (Verrier)   ─→   Fenêtres, Vitraux
Minerai métallique    ─→      Lingot (Forgeron)           ─→   Charpentes métalliques, Ornements
Argile (Pierre conc.) ─→      Brique réfractaire          ─→   Fours, Forges, Cheminées
Plante fibreuse       ─→      Tissu (Tisserand)           ─→   Tentures, Ameublement, Voiles
Gemme brut            ─→      Gemme taillé (Lapidaire)    ─→   Décor cosmique, Sertissage architectural
```

---

## Tableau principal — Matériaux par tier

| Matériau | Source canonique | Craft | Métier | Niveau d'opulence | Catégories de construction |
|----------|------------------|-------|--------|-------------------|---------------------------|
| **Bois brut** | [[Sources de Ressources#Source 1 — Récolte nature\|Bois]] (Récolte Nature) | — *(récolte directe)* | [[Métiers#Bûcheron\|Bûcheron]] | **1-2** | Habitation, Rural, Mobilier modeste |
| **Bois ouvragé / Planche** | [[Sources de Ressources#Source 3 — Fabrication\|Planche]] (Fabriqué) | [[Crafts#7. Travail du bois et de la pierre\|Menuiserie]] | [[Métiers#Menuisier\|Menuisier]] | **2-4** | Habitation, Mobilier, Lieux de production |
| **Bois précieux** | Variants de Bois (If d'Astravia, Ébène d'Onara, Bois pétrifié d'Akmoral — voir [[Traces des Ères]]) | Menuiserie maître | Menuisier Maître / Charpentier Maître | **4-6** | Mobilier signature, Habitation distinguée+, Décor lieux religieux |
| **Pierre simple** | [[Sources de Ressources#Source 1 — Récolte nature\|Pierre]] (Récolte Nature) | — *(taille minimale)* | [[Métiers#Mineur\|Mineur]] / Tailleur de pierre *(D-ARCHITECTURE-02)* | **1-2** | Fondations, Murs basiques, Infrastructure rurale |
| **Pierre taillée** | [[Sources de Ressources#Source 1 — Récolte nature\|Pierre]] taillée | Maçonnerie / Taille de pierre | Tailleur de pierre, Maçon | **2-4** | Murs porteurs, Ponts, Fortifications, Lieux religieux |
| **Brique** | [[Sources de Ressources#Source 3 — Fabrication\|Brique]] (Fabriqué) | [[Crafts#7. Travail du bois et de la pierre\|Maçonnerie]] | Maçon | **2-4** | Murs intérieurs, Cheminées, Habitation honnête à distinguée |
| **Brique réfractaire** | Variant de Brique (Argile + tannins minéraux) | Maçonnerie spécialisée | Maçon Adepte+ | **3-4** | Forges, Fours à pain, Verreries, Fonderies |
| **Pierre noble (Marbre)** | Variant de Pierre (carrières spécifiques — Galenor, Evertia, Cendara) | Sculpture + Maçonnerie maître | Sculpteur Maître + Maçon Maître | **4-6** | Cathédrales, Palais, Mobilier monumental |
| **Pierre noble (Granite)** | Variant de Pierre (Alkaran, Astravia) | Taille de pierre experte | Tailleur de pierre Expert | **4-5** | Forteresses signature, Tombeaux royaux |
| **Métal (charpente)** | [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] / [[Sources de Ressources#Source 3 — Fabrication\|Alliage]] | [[Crafts#1. Forge\|Forge architecturale]] | Forgeron architectural *(variant à proposer — D-ARCHITECTURE-02)* | **3-5** | Fortifications, Charpentes lourdes, Ponts, Herses |
| **Métal précieux (Or)** | Lingot d'or (variant) | Forge précieuse + Orfèvrerie | [[Métiers#Bijoutier\|Bijoutier]] / Orfèvre | **5-6** | Coupoles, Ornements, Mobilier impérial |
| **Métal précieux (Argent)** | Lingot d'argent (variant) | Forge précieuse | Orfèvre | **4-6** | Lustres, Pieds de mobilier, Reliquaires |
| **Métal précieux (Mithril ?)** | Lingot exotique (à confirmer comme métal canonique — voir [[Items/Index]] §Décisions ouvertes) | Forge maître + Enchantement | Forgeron Maître + Enchanteur | **5-6** | Citadelles légendaires, Armures architecturales mythiques |
| **Verre simple** | [[Sources de Ressources#Source 3 — Fabrication\|Plaque de verre]] | [[Crafts#7. Travail du bois et de la pierre\|Verrerie]] | [[Métiers#Verrier\|Verrier]] / Vitrier *(D-ARCHITECTURE-02)* | **3-5** | Fenêtres, Vitrages d'atelier, Lampadaires |
| **Vitrail** | Plaque de verre + Pigment + Plomb | Verrerie maître + Sertissage | Verrier Expert + Sertisseur | **4-6** | Cathédrales, Académies, Palais |
| **Verre cosmique** | Variants exotiques (Verre d'Astravia, Verre noir de Cendara) | Verrerie + Enchantement | Verrier Maître + Enchanteur | **6** | Constructions cosmiques, Niveau 6 exclusif |
| **Tissu (intérieur)** | [[Sources de Ressources#Source 3 — Fabrication\|Tissu]] | [[Crafts#4. Tissage et confection\|Tissage]] | [[Métiers#Tisserand\|Tisserand]] | **1-5** | Tentures, Tapisseries, Sièges, Baldaquins |
| **Soie (haut tier)** | Variant de Tissu (Laine creature exotique — vers à soie ?) | Tissage maître | Tisserand Maître | **4-6** | Tentures impériales, Mobilier de palais, Décor religieux |
| **Cuir tanné (mobilier)** | Cuir + Tannins *(implicite — voir [[Sources de Ressources]] §note Cuir tanné)* | [[Crafts#5. Travail du cuir\|Tannage]] | [[Métiers#Tanneur (à intégrer)\|Tanneur]] | **2-5** | Sièges, Reliures de bibliothèque, Sellerie d'écurie |
| **Cristal** | [[Sources de Ressources#Source 3 — Fabrication\|Gemme taillé]] / Cristaux cosmiques | [[Crafts#6. Joaillerie et lapidaire\|Lapidaire]] + Enchantement | [[Métiers#Lapidaire (à intégrer)\|Lapidaire]] + Enchanteur | **5-6** | Décor cosmique, Cercles d'enchantement, Reliquaires |
| **Argile / Torchis** | Pierre concassée + Liquide (eau) + paille | Maçonnerie de base | Maçon Novice ou auto-construit | **1-2** | Construction populaire, Murs intérieurs ruraux, Étables |
| **Chaume / Joncs** | [[Sources de Ressources#Source 1 — Récolte nature\|Plante]] / Céréale (paille) | — *(récolte + bottelage)* | [[Métiers#Agriculteur\|Agriculteur]] / Couvreur *(D-ARCHITECTURE-02)* | **1-2** | Toitures rurales, Granges |
| **Tuile** | Variant de Brique cuite | Maçonnerie + cuisson | Maçon | **2-5** | Toitures de toutes constructions à partir niveau 2 |
| **Ardoise** | Variant de Pierre (Alkaran, Trinoria) | Taille fine | Tailleur de pierre | **3-5** | Toitures distinguées, Héritage |
| **Pigment / Peinture** | [[Sources de Ressources#Source 3 — Fabrication\|Pigment]] | [[Crafts#4. Tissage\|Teinture]] / Peinture *(à proposer)* | [[Métiers#Teinturier (à intégrer)\|Teinturier]] / [[Métiers#Peintre\|Peintre]] | **1-6** | Décor mural, Fresques, Cosmétique extérieur |
| **Résine / Vernis** | [[Sources de Ressources#Source 3 — Fabrication\|Résine traitée]] | Apothicairerie | [[Métiers#Apothicaire\|Apothicaire]] | **2-5** | Finition mobilier, Étanchéité bois, Charpentes |
| **Os exotique** | Récolte créature + Trace d'ère ([[Traces des Ères#1. Géologiques\|Os des Géants]]) | Sculpture + Construction rituelle | Sculpteur Maître | **5-6** | Donjons cosmiques, Mobilier signature |

---

## Matériaux exotiques — Niveau 6 (Cosmique)

> Ces matériaux n'apparaissent qu'aux niveaux les plus élevés. La plupart sont liés à des [[Traces des Ères|Traces]] ou à des conditions cachées 🔒. **Non-marchands** par défaut.

| Matériau exotique | Source | Trace / Origine | Construction-cible |
|------------------|--------|-----------------|-------------------|
| **Bliysium** | Mines légendaires de Myrtam (cf. [[Géographie]] §Alkaran) | Lore canonique d'Alkaran | Citadelles légendaires, Armures architecturales |
| **Acier Éternel** | Forge spécifique de Myrtam, Voies cachées | Lore Alkaran — *« forge légendaire — Acier Éternel »* | Charpentes légendaires, Ponts éternels |
| **Spuelium** | *(à définir lore)* | Mythique | Constructions cosmiques |
| **Cristaux cosmiques** | [[Le Lien\|Voies de magie]] cristallisées | Cratères du Cardinal, Brèches | Cercles d'enchantement supérieurs |
| **Filaments du Vide** | [[Traces des Ères#1. Géologiques\|Brèches du Néant]] | Cumul des Cardinaux | Donjons cosmiques (composant de Voie d'Umbra) |
| **Pierres-cicatrices** | [[Traces des Ères#1. Géologiques\|Cratères du Cardinal]] | L'Arrachement, ~250 ans | Reliquaires majeurs |
| **Sève d'Argent** | [[Traces des Ères#1. Géologiques\|Forêt d'Argent de Galenor]] | Ère du Rêve Lumineux | Mobilier signature, autels |
| **Bois pétrifié** | [[Traces des Ères#1. Géologiques\|Forêt Pétrifiée d'Akmoral]] | Ère du Sommeil de Glace | Sculpteurs et Luthiers maîtres ; mobilier-signature |
| **Pierre-Voix** | [[Traces des Ères#1. Géologiques\|Falaises Chantantes de Baelor]] | Ère des Vents Bouleversants | Bardes / Théâtres acoustiques |
| **Braises éternelles** | [[Traces des Ères#1. Géologiques\|Veines de Feu Endormi]] | Ère du Feu Endormi | Forges rituelles, Cheminées impériales |
| **Eau-d'Air** | [[Traces des Ères#1. Géologiques\|Lacs Suspendus d'Aerion]] | Ère du Souffle Élevé | Bassins flottants, Citadelle Volante (mythique) |

---

## Variants régionaux (Phase 4 long terme)

Chaque pays a ses **variants de matériaux** signature :

| Pays / Région | Matériau signature | Notes |
|---------------|-------------------|-------|
| **Altram, Myrtam** (Alkaran) | Acier Éternel, Bliysium, Pierre noire | Métaux et pierres légendaires |
| **Astravia** (Celethor) | If d'Astravia (bois aux propriétés magiques), Verre d'Astravia | Constructions célestes |
| **Onara** | Ébène d'Onara (bois sombre dense) | Mobilier de luxe nordique |
| **Ilthara** | Bois vivant (forêts conscientes), Sève d'Avalor | Architecture organique |
| **Cendara** | Basalte volcanique, Verre noir de Cendara, Braises éternelles | Architecture volcanique |
| **Galenor (Lumasar)** | Marbre blanc académique | Académies, observatoires |
| **Evertia** | Marbre rose impérial, gemmes serties | Caëspia, palais impérial |
| **Pyrtara** (Ilthara) | Pierre vibrante de l'Anneau de Pyrtara | Cercles rituels |
| **Cestra** | Pierre rouge de Vermilis (Murailles Rouges) | Fortifications signature |

---

## Cas particuliers et arbitrages

### Cuir tanné et reliures

Le **Cuir tanné** est listé en [[Sources de Ressources]] §Source 3 mais avec la note *« n'est pas dans la liste fabriquée mais devrait l'être »*. **Recommandation Architecture** : confirmer son ajout en Phase 2 — il est massif pour le mobilier (sièges, reliures de bibliothèque) et la sellerie d'écurie.

### Stations de craft = matériaux ?

Une **station de craft** (forge, alambic, métier à tisser) est-elle un *matériau* assemblé dans une construction ? **Recommandation** : Non. Une station est une **construction enfant** dans une [[Catégories de Constructions#2. Lieux de production|Construction-Atelier]] (D-ARCHITECTURE-04). Les matériaux qui la composent (briques réfractaires, métaux, planches) sont en revanche dans le présent tableau.

### Charbon, sable, paille

Composants secondaires souvent invisibles dans le rendu mais **essentiels** au craft :

- **Charbon** : voir [[Sources de Ressources]] (à confirmer Phase 2 — semble manquer comme ressource explicite)
- **Sable** : variant de Pierre concassée — intrant de Plaque de verre
- **Paille** : variant de Céréale post-récolte — intrant de chaume / torchis

### Ressources de Trace

Certains matériaux n'existent que **post-Trace** ([[Traces des Ères]]) — Bois pétrifié, Sève d'Argent, Pierres-cicatrices. Ils sont **non-marchands sauf en Hôtels des Ventes catégorie Reliques** ([[Traces des Ères]] §Économie des reliques).

---

## Décisions ouvertes

| Code | Décision | Recommandation |
|------|----------|----------------|
| **D-MATÉRIAUX-01** | Cuir tanné comme ressource fabriquée canonique | Confirmer en Phase 2 (cohérent avec [[Sources de Ressources]]) |
| **D-MATÉRIAUX-02** | Chaume / Paille / Sable / Charbon : ressources canoniques distinctes ou variants ? | À arbitrer |
| **D-MATÉRIAUX-03** | Mithril : matériau canonique ou réservé Trace/Légendaire ? | Cohérent avec [[Items/Index]] §Décisions |
| **D-MATÉRIAUX-04** | Variants régionaux (Bois précieux par pays) : générés par Material Generator ([[Architecture Data-Driven]]) ou archétypés à la main ? | Phase 3 |
| **D-MATÉRIAUX-05** | Niveau 6 strictement non-marchand vs achetable à coût exotique (cohérent D-ARCHITECTURE-06) | À aligner |

---

*Liens : [[Architecture/Index|← Index Architecture]] · [[Catégories de Constructions]] · [[Échelles et Niveaux]] · [[Mapping Métiers de Construction]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Traces des Ères]] · [[Architecture Data-Driven]]*
