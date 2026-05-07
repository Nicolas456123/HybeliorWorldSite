---
tags: [créature, archétype, bestiaire, quadrupède, poisson, aquatique, eau-douce, magique-mineur]
type: archetype
forme: Quadrupède
taille: Petit
revêtement: [Écaille]
sens: [Vision aquatique, Électroception, Audition aquatique]
cognition: Instinctif
socialité: Couple
territorialité: Nomade
milieu: [Eau douce, Rivière, Lac, Cascade]
locomotion: [Nage, Bond aquatique]
aire_influence: Local
reproduction: Ovipare
métamorphose: Aucune
durée_vie: Courte
trophicité: Carnivore
fonction_éco: Proie privilégiée / régulateur invertébrés
pouvoirs: [Esquive aquatique, Bond hors-eau, Camouflage écailles, Lueur magique mineure (variants)]
élément: Eau (mineur, variants seulement)
résistances: [Eau, Froid mineur]
cr: 1
hp_base: 60
loot_table: [Écaille, Os, Cœur de creature, Œuf, Sang, Œil]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [pêche-mécanique, truite-magique-conditions]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Poissons/Eaux douces/_Description|Poissons/Eaux douces]] pour les espèces concrètes décomposées de cet archétype.

# 🐟 Truite mystique — Archétype-référence

> Archétype canonique du **poisson aquatique d'eau douce**. Pattern pour poissons "ordinaires-mais-magiques" (truite, brochet, carpe sage, saumon de Lune). Pose le pattern **aquatique non-prédateur** et la **mécanique de pêche** distincte du combat. Premier archétype "**ressource récurrente non-combat**" du bestiaire.
>
> Voir [[Bestiary/Index]] · [[Loup forestier]] · [[Sources de Ressources]] §Pêche

---

## 1. Vue d'ensemble

### Description sensorielle

La Truite mystique est un poisson allongé (30-60 cm, 0.5-3 kg), **écailles iridescentes** (signature visuelle — *mystique* dans le nom car elle **luit faiblement** au crépuscule, plus que la truite réelle). Variants magiques montrent une **lueur prismatique** sous l'eau. Yeux dorés, nageoires fines.

Sons : aucun (au-dessus de l'eau). **Bond signature** quand chassée — saute hors de l'eau jusqu'à 1.5 m. Trace : **frai** (œufs déposés sur graviers — récolte écologique non-létale Phase 3).

### Place écologique et culturelle

**Proie privilégiée** des prédateurs aquatiques (loutres-géantes, ours pêcheurs, oiseaux pêcheurs, pêcheurs humains). **Régulateur d'invertébrés** (mange larves, insectes aquatiques).

**Folklore** :
- *Skaldoria* → truite de printemps = annonce du dégel, festival
- *Cestra, Trinoria* → truite de Lune (variant Doré) = chair sacrée d'Eldoria, banquet d'investiture
- *Kharazir, Onara* → truite des sources = signe de bénédiction de Via Aquor
- *Pyrtara (Ilthara)* → truite-marais (variant Pourpre) = empoisonnée, n'est pas mangée

**Importance gameplay** :
- **Première ressource de pêche** typique d'un joueur Novice (canne + appât = Maîtrise *Pêche* palier 1)
- Pattern de **récolte non-combat** canonique (la truite ne se "tue" pas — elle se **pêche**)
- Variants magiques (Doré, Onirique) = **récompense exotique** rare
- **Cuisine** : ressource intrant majeure (recettes de base à magistrales selon variant)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie

**Quadrupède Petit** (forme poisson — convention : *quadrupède* dans la taxonomie regroupe les vertébrés à symétrie bilatérale incluant poissons). Revêtement **Écaille** iridescente. Sens : **Vision aquatique** (mauvaise hors eau), **Électroception** faible (détecte mouvements proches), **Audition aquatique** (perçoit pas humains à 30 m).

### Axe 2 — Comportement

**Instinctif** (pas d'apprentissage, BT simple). **Socialité Couple** (frai en couple, sinon solitaire). **Territorialité Nomade** (suit courants saisonniers). Pas de communication active (lueur passive variants).

### Axe 3 — Habitat

**Eau douce** (rivière, lac, cascade). Évite eau croupie, eau chaude, océan. **Locomotion : Nage (3-6 m/s), Bond hors-eau (1.5 m)**. **Aire d'influence Local**.

### Axe 4 — Cycle de vie

**Ovipare** (frai sur graviers, 200-1000 œufs). **Pas de métamorphose**. **Durée de vie Courte** (3-7 ans).

### Axe 5 — Écologie

**Carnivore** d'invertébrés (larves, insectes aquatiques, alevins occasionnels). **Méthode : Embuscade aquatique** (immobile près d'un courant).

### Axe 6 — Rôle

**Proie privilégiée**. Pas d'alliance.

### Axe 7 — Capacités

**Élément Eau mineur** (variants seulement — la truite **standard** n'a pas d'élément actif). **Pouvoirs** : Esquive aquatique (mouvement vif), Bond hors-eau, Camouflage écailles, Lueur magique mineure (variants Doré/Onirique). **Résistances** : Eau, Froid mineur.

### Axe 8 — Stats

HP base 60 (CR 1). Pas de combat actif — la truite **fuit**. **Pêche** = mini-jeu de tension/relâchement (Maîtrise *Pêche* — voir §5).

### Axe 9 — Récompenses

**Loot** : 6 ressources (§6). **Cuisine** : ingredient cuisine de base à magistrale.

---

## 3. Stats par CR

> La truite **ne combat pas**. Stats indicatives pour cas exceptionnel (variant magique boss, monstre aquatique géant non-truite).

| Variante | CR | HP | Comportement |
|----------|----|----|--------------|
| **Alevin** | 0.5 | 10 | Fuit |
| **Truite adulte** | 1 | 60 | Fuit ou pêche |
| **Truite Vénérable** | 3 | 130 | Vieille, lente, drop magique élevé |
| **Truite-Roi** *(variant régional)* | 6 | 220 | Boss de pêche, lutte étendue (5+ min mini-jeu) |

### Mini-jeu de pêche (canonique)

| Phase | Action joueur |
|-------|---------------|
| **Lancer** | Choix d'appât selon variant souhaité |
| **Touche** | Réaction dans 0.5 s pour ferrer |
| **Lutte** | Tension/relâchement (Maîtrise *Pêche*) — **résistance fonction de CR** |
| **Sortie** | Échec si fil cassé / réussite = capture |

---

## 4. Attaques canoniques (cas exceptionnel)

| Attaque | Effet |
|---------|-------|
| **Bond** | Mobilité — saute hors eau, peut renverser pêcheur (stagger 1 s) |
| **Lueur magique mineure** *(variant Doré/Onirique)* | Aveugle pêcheur 2 s |

> La Truite n'a **pas d'attaque létale**. Pas de pattern combat IA standard.

---

## 5. Pouvoirs spécifiques

| Pouvoir | Description |
|---------|-------------|
| **Esquive aquatique** | Évade 70% des coups directs sous l'eau (Maîtrise *Lance/Trident* palier 2+ requise) |
| **Bond hors-eau** | 1.5 m saut, peut esquiver flèche tirée à la verticale |
| **Camouflage écailles** | Iridescence reflète environnement, +30% à esquive si eau claire |
| **Lueur magique mineure** *(variants)* | Variant Doré/Onirique luit, attire ou repousse selon contexte |

### Pêche (Maîtrise *Pêche*)

- **Palier 1** : truite standard CR 1
- **Palier 2** : Vétéran CR 3
- **Palier 3** : Truite-Roi CR 6
- **Palier 4-5** : variants magiques (Doré, Onirique, Vénérable)

---

## 6. Loot table

| Ressource | Drop rate | Modificateur | Métier |
|-----------|-----------|--------------|--------|
| **Écaille** *(Écailles iridescentes)* | 100% (5-15) | × 2 Vénérable, × 5 variant magique | Pêcheur / Dépéceur |
| **Os** *(Arêtes)* | 100% (1-3) | Intrant aiguilles, hameçons | Dépéceur Novice |
| **Cœur de creature** *(rare)* | 5% — **30% Vénérable**, **80% Truite-Roi** | Composant alchimie aquatique | Apothicaire Adepte |
| **Œuf** *(Frai)* | 70% en saison ponte | Cuisine + composant alchimie fertilité | Pêcheur |
| **Sang** | 30% | Composant alchimie d'eau (rare pour poisson) | Apothicaire Adepte |
| **Œil** | 50% (2) | Composant alchimie de Vue aquatique | Apothicaire Adepte |

> **Cuisine canonique** : Truite grillée = recette de base (régen Stamina). Truite de Lune (Doré) = recette Magistrale (régen Mana + soin).

---

## 7. Variants cosmiques

| Variant | Spécificité |
|---------|-------------|
| **Shadow** | Écailles noires, **invisible** sous eau (pêche difficile palier 4) |
| **Spectral** | Translucide, **traverse** filets |
| **Frost** | Écailles bleu glace, eau autour gelée légèrement |
| **Verdoyant** | Algues fixées, n'apparaît que dans rivières de forêt sacrée |
| **Brulé** | Écailles braisées, n'apparaît qu'en zone volcanique (sources chaudes) |
| **Pourpre** | Empoisonne le pêcheur (3 dmg/s 5 s sur capture sans gants) |
| **Doré** *(Truite de Lune)* | Halo lunaire, drop **Larme dorée**, recette Magistrale, Ère du Rêve Lumineux |
| **Brisé** | Téléportation hors filet |
| **Onirique** | N'apparaît qu'en zone Somnix nuit, capture = bonus rêve (Essence onirique) |
| **Vénérable** | Truite-grand-mère, géante (60 cm+), drop max |

---

## 8. Comportement IA

- **Pas de combat actif**
- **Détection joueur** : fuite si ombre / mouvement brusque
- **Frai** (printemps) : reste sur graviers, capture facile mais **éthique** (raréfaction l'année suivante — Phase 3 cycle écologique)
- **Variant Doré/Onirique** : conditions strictes (Ère + biome), capture impossible si pas de Lié

---

## 9. Signatures (PHASE 4 stub)

### La Truite-Reine du Lac de Veldoria
- **Localisation** : Lac sacré de Veldoria (Trinoria)
- **CR** : 6 (Truite-Roi)
- **Variante** : Vénérable Doré
- **Lore** : *« On dit qu'elle est l'âme d'une reine noyée. La pêcher est un sacrilège — la relâcher porte chance. »*

### Le Saumon de Lune de Cestra
- **Localisation** : Rivière de Cestra
- **CR** : 4
- **Variante** : Doré (Truite de Lune adaptée saumon)
- **Lore** : *« Banquet d'investiture des Druides — un saumon, un druide, une vie. »*

---

## 10. Décisions ouvertes

- **Mécanique de pêche** complète à formaliser dans [[Sources de Ressources]] §Pêche (proposition canonique)
- **Cycle de frai** : impact écologique (capture en frai = raréfaction Phase 3)
- **Variants magiques** : conditions de spawn (Ère + Accord)
- **Recettes Magistrales de cuisine** : pipeline Truite Doré → composant cuisine légendaire — Phase 4

---

*Liens : [[Bestiary/Index|← Index Bestiaire]] · [[Loup forestier]] · [[Sources de Ressources]] · [[Les Ères]]*
