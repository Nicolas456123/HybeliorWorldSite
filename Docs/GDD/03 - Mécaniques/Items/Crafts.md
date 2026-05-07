---
tags: [items, crafts, métiers, taxonomie, mécanique]
type: mechanic
status: drafted
last_review: 2026-05-01
needs_review_for: [recettes-individuelles, mini-jeux-craft, stations-crafts-paramétrées]
---

# 🛠 Crafts — Taxonomie des processus de fabrication

> Un **craft** = un processus qui prend des intrants (ressources brutes ou fabriquées) et produit un résultat (item fini ou ressource intermédiaire). Distinct des [[Sources de Ressources|sources]] (récolte nature, créature, fabrication) qui décrivent **d'où** viennent les matériaux ; ici on décrit **comment** ils sont transformés.
>
> Cette taxonomie pose les **catégories de craft** et leurs caractéristiques. Les **recettes individuelles** sont l'objet de la Phase 2 (Recipe Generator de [[Architecture Data-Driven]]).

---

## Anatomie d'un craft

Tout craft est défini par 7 axes :

| Axe | Description |
|-----|-------------|
| **Métier** | Quel métier permet ce craft (parmi les 63 — voir [[Métiers]]) |
| **Station** | Lieu / outil requis (forge, alambic, métier à tisser, four, atelier mobile…) |
| **Intrants** | Ressources consommées (matières premières + composants) |
| **Sortie** | Item produit (1 ou plusieurs items, qualité variable selon Maîtrise) |
| **Palier de Maîtrise requis** | Novice / Initié / Adepte / Expert / Maître — voir [[Armes et Maîtrise]] |
| **Durée gameplay** | Temps réel pour exécuter (de quelques secondes à plusieurs minutes) |
| **Mini-jeu / interactivité** | Action joueur vs auto (clic timing, séquence, jauge…) |

**Frontmatter Phase 2 (recette)** :
```yaml
---
tags: [recette, craft, <métier>]
type: recipe
craft_category: Forge | Alchimie | Cuisine | ...
métier: Forgeron
station: Forge à charbon
intrants: [Lingot de fer × 2, Cuir tanné × 1]
sortie: Épée à une main de fer
sortie_quantité: 1
mastery_required: Adepte
durée: 30s
mini_jeu: timing_temperature
era_availability: [toutes]
status: drafted
---
```

---

## Les 9 catégories de craft canoniques

> Hybelior compte **9 grandes catégories de craft** regroupant les 63 métiers. Chaque catégorie a sa logique propre (intrants typiques, type de mini-jeu, archétypes de sortie).

### 1. Forge (transformation métallique)

| Aspect | Détail |
|--------|--------|
| **Métiers** | Forgeron · Métallurgiste · Fondeur · Armurier · Bijoutier (partiel) |
| **Stations** | Four à fondre · Forge à charbon · Enclume · Bac à trempe · Étau |
| **Intrants typiques** | Minerai · Lingot · Alliage · Charbon · Bois (manche) · Cuir (poignée) |
| **Sorties typiques** | Lingots · Alliages · Armes mêlée · Armures (mailles, plate) · Outils métalliques · Bijoux métalliques |
| **Mini-jeu** | Timing température (forgeron — voir [[Forgeron]]) · Précision frappe enclume |

### 2. Alchimie (transformation chimique / magique)

| Aspect | Détail |
|--------|--------|
| **Métiers** | Alchimiste · Apothicaire · Distillateur · Brasseur · Parfumeur |
| **Stations** | Alambic · Mortier et pilon · Cornue · Cucurbite · Cuve à fermentation |
| **Intrants typiques** | Plante · Fleur · Racine · Champignon · Sang · Bave · Venin · Larme · Cœur de creature · Liquide · Poudre · Émulsion |
| **Sorties typiques** | Potions · Élixirs · Onguents · Émulsions · Poudres alchimiques · Boissons fermentées · Spiritueux · Parfums |
| **Mini-jeu** | Dosage proportionnel · Timing température · Combinaison réactive (effets cachés selon ère) |

### 3. Cuisine (transformation alimentaire)

| Aspect | Détail |
|--------|--------|
| **Métiers** | Cuisinier · Boulanger · Pâtissier · Charcutier · Fromager · Confiturier |
| **Stations** | Four à pain · Fourneau · Plan de travail · Pétrin · Affineur de fromage |
| **Intrants typiques** | Farine · Céréale · Viande · Poisson · Légumes · Fruits · Œuf · Miel · Lait · Épices · Herbes · Sel |
| **Sorties typiques** | Pains · Gâteaux · Plats préparés · Fromages · Conserves · Confitures · Festins (multi-buff) |
| **Mini-jeu** | Timing cuisson · Dosage assaisonnement · Découpe (coup à coup) |

### 4. Tissage et confection (textiles)

| Aspect | Détail |
|--------|--------|
| **Métiers** | Tisserand · Couturier · Tailleur · Brodeur · Cordier · Fileur |
| **Stations** | Métier à tisser · Rouet · Aiguille · Patron de couture · Métier à broder |
| **Intrants typiques** | Laine plante · Laine creature · Soie *(à définir)* · Fil métallique · Tissu · Pigment · Cuir (lacets) |
| **Sorties typiques** | Tissus · Robes · Capes · Tabards · Vêtements civils · Voiles · Tentures · Cordes |
| **Mini-jeu** | Cadence métier à tisser · Précision points de couture · Composition motif (broderie) |

### 5. Travail du cuir (tannage et maroquinerie)

| Aspect | Détail |
|--------|--------|
| **Métiers** | Tanneur · Maroquinier · Cordonnier · Sellier · Garnisseur |
| **Stations** | Cuve de tannage · Étendoir · Établi cuir · Forme à botte · Selle |
| **Intrants typiques** | Cuir · Peau · Fourrure · Tannins (résine, écorce) · Fil · Pigment · Boucles métalliques |
| **Sorties typiques** | Cuir tanné · Armures cuir · Bottes · Sacs · Selles · Ceintures · Reliures de livres |
| **Mini-jeu** | Trempage / temps tannage · Coupe précise · Couture cuir |

### 6. Joaillerie et lapidaire (gemmes et orfèvrerie)

| Aspect | Détail |
|--------|--------|
| **Métiers** | Bijoutier · Lapidaire · Sertisseur · Orfèvre · Émailleur |
| **Stations** | Établi de bijoutier · Tour à polir · Pince à sertir · Four à émail |
| **Intrants typiques** | Gemme brut · Gemme taillé · Lingot précieux · Fil métallique · Émail · Cristal |
| **Sorties typiques** | Gemmes taillées · Anneaux · Amulettes · Broches · Bracelets · Boucles d'oreilles · Sertissages d'armes/armures |
| **Mini-jeu** | Précision taille (lapidaire) · Sertissage (alignement) |

### 7. Travail du bois et de la pierre (architecture et menuiserie)

| Aspect | Détail |
|--------|--------|
| **Métiers** | Menuisier · Charpentier · Maçon · Sculpteur · Tailleur de pierre · Vitrier |
| **Stations** | Établi de menuiserie · Scie · Atelier de taille · Mortier · Maillet et burin · Four à verre |
| **Intrants typiques** | Bois · Planche · Pierre · Brique · Plaque de verre · Sable · Charbon |
| **Sorties typiques** | Planches · Briques · Mobilier · Arcs · Manche d'outils · Vitres · Statues · Bâtiments |
| **Mini-jeu** | Coupe précise · Assemblage / chevillage · Sculpture (pas-à-pas) |

### 8. Scriptorium et enchantement (savoirs et magie)

| Aspect | Détail |
|--------|--------|
| **Métiers** | Scribe · Cartographe · Enchanteur · Relieur · Compositeur de sorts · Calligraphe |
| **Stations** | Pupitre de scribe · Cercle d'enchantement · Atelier de reliure · Atelier cartographique |
| **Intrants typiques** | Parchemin · Papier · Encre · Pigment · Cristal de Voie · Essence spirituelle · Mémoire (composant abstrait — voir [[Le Lien]]) |
| **Sorties typiques** | Parchemins · Tomes · Cartes · Items enchantés (ajout d'effet sur item existant) · Sorts encapsulés · Recettes écrites |
| **Mini-jeu** | Précision tracé (calligraphie) · Séquence rituelle (enchantement) · Mémorisation glyphes |

### 9. Récolte et transformation primaire (premier traitement)

> Catégorie **transversale** : ce sont les crafts effectués sur les ressources brutes par les métiers de récolte avant qu'elles n'entrent dans les autres catégories.

| Aspect | Détail |
|--------|--------|
| **Métiers** | Bûcheron · Mineur · Botaniste · Pêcheur · Apiculteur · Mycologue · Fermier · Cueilleur · Dépéceur · Herboriste · Chasseur |
| **Stations** | Outil dédié (pioche, hache, faux, canne à pêche, ruche, panier, table de découpe…) |
| **Intrants typiques** | Le monde lui-même (nœud de récolte) — voir [[Sources de Ressources]] |
| **Sorties typiques** | Les 21 ressources nature + 25 ressources créature listées dans [[Sources de Ressources]] |
| **Mini-jeu** | Timing nœud · Précision frappe · QTE (poisson, créature) |

---

## Stations de craft (vue transversale)

Les **stations** sont les lieux/outils physiques requis. Une même station peut servir plusieurs crafts ; certains crafts requièrent plusieurs stations en séquence (la forge utilise four → enclume → trempe).

| Station | Métiers concernés | Notes |
|---------|------------------|-------|
| **Forge** *(four+enclume+trempe)* | Forgeron, Armurier, Outils-fabricant | Station triplette — voir [[Forgeron]] |
| **Alambic / Cornue** | Alchimiste, Distillateur, Apothicaire | Station haute température + condensation |
| **Mortier et pilon** | Apothicaire, Alchimiste, Cuisinier | Station de broyage portable |
| **Four à pain** | Boulanger, Pâtissier, Cuisinier | Station haute température sèche |
| **Fourneau / Plan de travail** | Cuisinier, Charcutier, Fromager | Station de cuisine domestique |
| **Métier à tisser** | Tisserand | Lourd, immobile, commun en atelier |
| **Rouet** | Fileur, Tisserand | Préparation du fil |
| **Atelier de couture** | Couturier, Brodeur, Tailleur | Aiguille, fil, patron |
| **Cuve de tannage** | Tanneur | Plein air, exhalations fortes |
| **Établi de bijoutier** | Bijoutier, Sertisseur, Orfèvre | Outils précis |
| **Tour à polir / Pince à sertir** | Lapidaire, Sertisseur | Précision |
| **Atelier de menuiserie** | Menuisier, Charpentier, Sculpteur | Scies, rabots, ciseaux |
| **Atelier de taille** | Tailleur de pierre, Sculpteur, Maçon | Maillet, burin, pierre brute |
| **Four à verre** | Verrier | Très haute température |
| **Pupitre de scribe** | Scribe, Calligraphe, Cartographe | Parchemin, plume, encre |
| **Cercle d'enchantement** | Enchanteur, Compositeur de sorts | Cercle gravé, cristaux, rituel |
| **Atelier mobile / portable** | Plusieurs métiers | Version réduite, qualité limitée, pour l'aventurier |

---

## Modulation des crafts

### Par palier de Maîtrise

Le palier de Maîtrise du joueur dans le métier (Novice → Maître, voir [[Armes et Maîtrise]]) module :

- **Recettes accessibles** : palier minimal pour débloquer une recette
- **Qualité de sortie** : un Maître produit en moyenne un tier au-dessus du tier "minimum" de la recette
- **Vitesse d'exécution** : Maître plus rapide
- **Taux d'échec** : Novice échoue parfois (gaspille intrants), Maître presque jamais
- **Procs spéciaux** : Maître a une chance de produire un item de qualité exceptionnelle (Magistral+ alors que la recette nominale est Œuvré)

### Par ère active

Les ères ([[Les Ères]]) modulent les crafts :

| Ère type | Effet typique |
|----------|---------------|
| Verdoiement (Terranu) | +20% qualité Botanique / Apothicairerie / Cuisine végétale |
| Sommeil de Glace (Climata) | -20% rendement Botanique, +30% conservation alimentaire |
| Feu Endormi (rumeur Eldoria) | +20% qualité Forge, +10% chance affixe rare sur armes |
| Brume Mortelle | Recettes alchimiques rares disponibles, autres crafts -10% |
| Ombre Longue (Noctis) | Recettes obscures débloquées (Scriptorium / Enchantement), Forge -10% |
| Vents (Aerion) | Recettes voyageurs (rations, cordages, voiles) bonifiées |

### Par contexte local

- **Pénurie d'intrant** (économie joueur-driven) : prix et disponibilité affectent ce qu'on peut crafter
- **Réputation faction** ([[Factions]]) : certaines recettes accessibles uniquement avec faction donnée
- **Religion pratiquée** ([[Lore/Religions/00 - Système Religieux]]) : recettes rituelles spécifiques par religion (voir [[Concepts Fondamentaux IA PNJ]] §13)

---

## Branche Architecture Data-Driven

Les recettes individuelles sont produites par le **Recipe Generator** (un des 12 générateurs de [[Architecture Data-Driven]]) à partir de :

- Catalogue d'archétypes d'items (Phase 2)
- Catalogue d'intrants (ressources)
- Tables de modulation (Maîtrise, ère, faction, religion)
- Templates de recettes par catégorie de craft

Chaque recette est un **objet data** queryable via Dataview (filtrable par métier, ère, palier).

---

## Phase 2 attendue (recettes individuelles)

Ordre suggéré pour produire le catalogue de recettes :

| Sprint | Cible | Volume estimé |
|--------|-------|---------------|
| 1 | Recettes de Forge (armes mêlée + armures plate/mailles) | ~200 recettes (paramétriques + signatures) |
| 2 | Recettes d'Alchimie (potions, élixirs, onguents) | ~150 |
| 3 | Recettes de Cuisine + Boulangerie | ~100 |
| 4 | Recettes de Tissage + Confection (vêtements, robes, capes) | ~100 |
| 5 | Recettes de Cuir + Joaillerie + Bois/Pierre + Scriptorium | ~250 |
| **Total** | **~800 recettes** pour pré-Alpha | |

À multiplier par variants (par ère, par culture nationale) pour l'extension long terme.

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Sources de Ressources]] · [[Métiers]] · [[Architecture Data-Driven]] · [[Armes et Maîtrise]] · [[Les Ères]]*
