---
tags: [bestiaire, taxonomie, créatures, système]
type: system
status: drafted
last_review: 2026-05-01
needs_review_for: [validation-9-axes, frontmatter-spécialisé]
---

# 🧬 Taxonomie des Créatures — 9 axes V2

> Toute créature d'Hybelior se décrit par **9 axes** orthogonaux. La combinatoire est volontairement large : 7 formes × 6 tailles × 6 milieux × 6 niveaux cognitifs × etc. permet une explosion de variantes qui sera **maîtrisée par les générateurs paramétriques** (voir [[Architecture Data-Driven]] §NPC Generator + Behavior Generator).
>
> Cette taxonomie est l'extension V2 du dump utilisateur. À valider avant production des archétypes Phase 2.

---

## Axe 1 — Morphologie & Physiologie

### Forme générale

| Valeur | Exemples |
|--------|----------|
| **Bipède** | Humanoïdes, démons, certains avians |
| **Quadrupède** | Mammifères classiques, reptiles, dragons-bête |
| **Amorphe** | Slimes, élémentaires liquides, brumes |
| **Tentaculaire** | Krakens, abominations, êtres planaires |
| **Polymorphe** | Métamorphes, esprits qui changent de forme |
| **Fractal** | Êtres mathématiques, créatures du Vide |
| **Insectoïde** | Insectes géants, swarms, ruches |

### Taille

| Valeur | Échelle | Exemples |
|--------|---------|----------|
| **Minuscule** | < 10 cm | Insectes utiles, lutins, sprites |
| **Petit** | 10 cm – 1 m | Renards, lapins, gobelins |
| **Moyen** | 1 – 2 m | Humains, loups, chiens |
| **Grand** | 2 – 5 m | Ours, orcs, gorilles |
| **Colosse** | 5 – 30 m | Géants, jeunes dragons |
| **Variable** | Selon ère / forme | Métamorphes, créatures cosmiques |

### Revêtement

Poils · Plumage · Carapace · Cuir · **Biométal** · **Cristaux**

> *Biométal* et *Cristaux* sont des revêtements rares de créatures cosmiques / planaires (ex. Insectoïdes du Vide, créatures de l'Ère du Feu Endormi).

### Sens

| Valeur | Spécificité |
|--------|-------------|
| Vision diurne | Standard |
| Vision nocturne | Prédateurs nocturnes, créatures de cavernes |
| Infrarouge | Reptiles, prédateurs spéciaux |
| Ultrason (écholocation) | Chauves-souris, dauphins, créatures de cavernes |
| Audition fine | Chiens, loups |
| Odorat fin | Pisteurs |
| Électroception | Créatures aquatiques (anguilles, requins) |
| Vision 360° | Insectoïdes, créatures fractales |

---

## Axe 2 — Comportement & Cognition

### Niveau cognitif

| Valeur | Décision IA | Exemples |
|--------|-------------|----------|
| **Instinctif** | Behavior Tree simple, réactions stéréotypées | Insectes, animaux primaires |
| **Apprenant** | BT + mémoire courte, adaptation au joueur | Loups, gros prédateurs, créatures sociales |
| **Sapient** | BT + dialogue + planification | Humanoïdes, dragons sages, esprits anciens |
| **Hivemind** | BT collectif partagé entre individus | Ruches insectoïdes, swarms |

### Socialité

Solitaire · Couple · Meute / Troupe · Ruche / Colonie · **Essence émergeante** *(la créature n'existe que comme phénomène d'un groupe)*

### Territorialité

Fixe · Nomade · **Nomade planaire** *(traverse les plans)* · Zone changeante *(territoire qui bouge avec une variable — ères, saisons, marées)*

### Communication

Sons · Postures · Couleurs *(camouflage / signaux visuels)* · Signaux lumineux · **Télépathie** · **Ondes oniriques** *(communication via le sommeil, lié à Somnix)*

---

## Axe 3 — Habitat & Mobilité

### Milieu

Forêt · Plaine · Montagne · Caverne · Eau douce · Océan profond · **Zones magmatiques** · **Planar (astral, éthéré)**

### Locomotion

| Valeur | Note |
|--------|------|
| Marche | Standard |
| Nage | Aquatiques |
| Vol battu | Aviens classiques |
| Vol plané | Écureuils volants, raies célestes |
| Rampement | Reptiles, vers |
| **Lévitation** | Esprits, créatures cosmiques |
| **Téléportation** | Démons, créatures planaires |
| **Filtration d'air** | Créatures qui glissent sur les courants atmosphériques (méduses aériennes) |

### Aire d'influence

| Valeur | Échelle |
|--------|---------|
| Local | < 500 m |
| Régionale | 500 m – 5 km |
| Étendue | > 10 km |
| **Instable (planaire)** | Apparitions sporadiques sans territoire fixe |

---

## Axe 4 — Cycle de vie & Reproduction

### Méthode

Ovipare · Vivipare · **Bourgeonnement** · **Spores** · **Division binaire**

### Métamorphose

Aucune · Larve→Adulte · **Multi-stades** *(N stades)* · **Réversible** *(peut revenir en arrière)*

### Durée de vie

| Valeur | Échelle | Exemples |
|--------|---------|----------|
| Éphémère | Heures | Spores, créatures mémétiques |
| Courte | < 1 an | Insectes, petites créatures |
| Moyenne | 1 – 50 ans | Mammifères classiques |
| Longue | > 50 ans | Dragons jeunes, esprits |
| **Immortelle** | — | Cosmiques mineurs, esprits ancestraux |

---

## Axe 5 — Écologie & Régime alimentaire

### Trophicité

Herbivore · Carnivore · Omnivore · Détritivore · Parasite · Nécrophage

### Proies

Faune locale · Plantes · **Cristaux énergétiques** · **Âmes errantes**

### Méthode de chasse

Embuscade · Poursuite · **Filtration** · **Pièges** · Parasitisme · **Absorption d'énergie**

---

## Axe 6 — Rôle & Relations

### Fonction écologique

Symbiote · Prédateur intermédiaire · **Prédateur apex** · Équilibreur · **Parasite planétaire**

### Alliances

Opportuniste · **Pacte magique** · **Partenariat planaire**

### Menaces

Prédateurs supérieurs · Maladies · **Chasseurs planaires** · **Rituels d'extermination**

---

## Axe 7 — Capacités & Affinités

### Pouvoirs

Régénération · Camouflage · Illusions · **Contrôle du temps** · **Manipulation de la matière** · **Ondes psychiques**

### Élément

Feu · Eau · Air · Terre · **Temps** · **Âme** · **Vide** · **Gravité instable**

> Le mapping élément ↔ Voie magique ([[Le Lien]]) est partiellement direct (Feu→Voie de Flamara/Ignis, Eau→Voie d'Aquor, etc.) mais pas systématique pour les éléments rares (Vide, Gravité instable).

### Résistances

Physique · Poison · Arcanes · **Anti-tempo** *(résiste aux effets temporels)* · **Anti-énergie** *(résiste aux effets énergétiques)*

---

## Axe 8 — Statistiques de jeu

| Stat | Note |
|------|------|
| **Challenge Rating** | Indice de puissance ; échelle à figer (D&D-style 1-30 ou Hybelior-spécifique ?) — voir [[Combat]] |
| **Points de vie** | HP — calibrés sur taille et fonction écologique |
| **Endurance / Mana** | Selon usage de capacités physiques / magiques |
| **Vitesse (m/s)** | Locomotion principale × modificateur de taille |
| **Attaques & dégâts** | Liste d'attaques canoniques (mêlée / distance / sort), dégâts par tier de créature |

> ⚠️ **Décision ouverte** : adopter un CR figé style D&D 1-30, ou une échelle Hybelior-spécifique alignée sur les 8 stats brutes du joueur (voir [[Personnage]]) ?

---

## Axe 9 — Récompenses & Interactions

| Élément | Note |
|---------|------|
| **Loot** | Liste de ressources créature (Os, Cuir, Plume, Sang, Cœur, Essence spirituelle, etc.) — voir [[Sources de Ressources]] §Récolte sur créature |
| **XP accordée** | Selon CR + fenêtre d'XP scaling (voir [[Personnage]]) |
| **Événements** | Quête de chasse / Découverte de zone / Rituel planaire / Déclencheur de scénario |

---

## Frontmatter spécialisé créature *(proposé pour Phase 2)*

```yaml
---
tags: [créature, archétype, <forme>, <milieu>, <élément>]
type: archetype
forme: Bipède | Quadrupède | Amorphe | Tentaculaire | Polymorphe | Fractal | Insectoïde
taille: Minuscule | Petit | Moyen | Grand | Colosse | Variable
revêtement: [Poils, Plumage, ...]
sens: [Vision diurne, Vision nocturne, ...]
cognition: Instinctif | Apprenant | Sapient | Hivemind
socialité: Solitaire | Couple | Meute | Ruche | Émergeante
territorialité: Fixe | Nomade | Nomade planaire | Zone changeante
milieu: [Forêt, Plaine, ...]
locomotion: [Marche, Vol battu, ...]
aire_influence: Local | Régionale | Étendue | Instable
reproduction: Ovipare | Vivipare | Bourgeonnement | Spores | Division
métamorphose: Aucune | Larve-Adulte | Multi-stades | Réversible
durée_vie: Éphémère | Courte | Moyenne | Longue | Immortelle
trophicité: Herbivore | Carnivore | Omnivore | Détritivore | Parasite | Nécrophage
fonction_éco: Symbiote | Prédateur intermédiaire | Prédateur apex | Équilibreur | Parasite planétaire
pouvoirs: [Régénération, Camouflage, ...]
élément: Feu | Eau | Air | Terre | Temps | Âme | Vide | Gravité instable | -
résistances: [Physique, Poison, Arcanes, Anti-tempo, Anti-énergie]
cr: 1
hp_base: 100
loot_table: [Os, Cuir, ...]
variants_cosmiques: [Shadow, Spectral, ...]   # variants par ère
status: drafted
last_review: 2026-XX-XX
---
```

Ce frontmatter permet à Dataview de filtrer le bestiaire par n'importe quel axe (ex. "tous les Apex prédateurs des Forêts" ou "toutes les créatures du Vide").

---

## Variants cosmiques

Chaque archétype peut avoir jusqu'à **10 variants visuels** mappés sur les entités cosmiques (voir [[Les Ères]]) :

| Variant | Entité cosmique mappée *(à valider)* |
|---------|--------------------------------------|
| Shadow | Noctis |
| Spectral | Tempora |
| Frost | Climata |
| Verdoyant | Terranu |
| Brulé | Eldoria endormie / Flamara (rumeur) |
| Pourpre | Aetheron |
| Doré | Celestia |
| Brisé | Vortex |
| Onirique | Somnix (Astral) |
| Vénérable | Spiritus |

> ⚠️ Ce mapping est une **proposition initiale** héritée de V3.3 GameDoc. À valider en V4-bis ou en sprint pilote bestiaire.

---

*Liens : [[Bestiaire - Index|← Index Bestiaire]] · [[PNJ]] · [[Les Ères]] · [[Combat]] · [[Architecture Data-Driven]] · [[Sources de Ressources]]*
