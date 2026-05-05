---
tags: [métier, archétype, érudition, mémoire, esprit]
type: archetype
category: Métier
catégorie_métier: Erudition
stat_principale: Mémoire
stats_secondaires: [Esprit, Acuité, Endurance]
craft_category: 8 — Scriptorium et enchantement
sources_ressources_accessibles: [Parchemin, Encre, Cristal de Voie, Émulsion alchimique, Composants exotiques]
stations_principales: [Laboratoire, Cabinet d'étude, Atelier expérimental, Cercle de fixation, Cabinet de cabinet de Prédiction]
outils_principaux: [Carnet expérimental, Balance de précision, Sablier rituel, Cristal d'enregistrement, Loupe, Plume]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Alchimiste, Bibliothécaire, Historien, Astronome, Enchanteur d'objet, Mage]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [recipe-generator-déblocage-progression]
---

# 🔬 Chercheur — Archétype Métier

> *« L'Histoire dit ce qui fut. La Recherche dit ce qui pourrait être. Entre les deux, le présent transpire. »*
> — **Doctora Kalivane**, fondatrice du Cabinet des Sciences Exotiques

---

## 1. Vue d'ensemble

Le **Chercheur** est le métier de **découverte de nouvelles formules, recettes et phénomènes**. C'est le pendant **prospectif** de l'[[Historien]] : tourné vers le futur, l'inconnu, l'expérimentation. Il invente des recettes que personne n'a encore composées, étudie des composants exotiques (cosmiques, d'ère rare), formalise les patterns qui résistent à la classification.

C'est le métier qui alimente le **Recipe Generator** d'Hybelior in-fiction : chaque nouvelle recette qui circule un jour dans le monde a été, à un moment, **trouvée** par un Chercheur — joueur ou PNJ.

Métier exigeant : longues sessions, taux d'échec élevé (la Recherche échoue souvent), mais récompenses uniques. Un Chercheur Maître peut **signer** une recette qui porte son nom et entre dans l'Héritage du monde.

> [!important] Frontières
> - **Chercheur** : oriente vers le **nouveau**, le futur, l'inédit. Output = recette/formule signée.
> - **[[Historien]]** : oriente vers le **passé**, l'exhumation. Output = chronique/monographie.
> - **[[Bibliothécaire]]** : oriente vers le **conservé**, l'accès. Output = indexation/restauration.
> - **[[Alchimiste]]** : applique des recettes existantes (avec sa créativité). Le Chercheur **invente** la recette.
>
> Beaucoup d'Alchimistes Maîtres sont aussi Chercheurs. Mais un Chercheur n'est pas nécessairement un alchimiste : il peut chercher en métallurgie, en enchantement, en Voies, en linguistique ancienne.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Mémoire** — synthèse des essais, mémoire des paramètres testés, recoupement
- **Stats secondaires** :
  - **Esprit** — pour les recherches touchant aux Voies, aux composants magiques, aux essences
  - **Acuité** — précision des mesures, observation des résultats
  - **Endurance** — protocoles longs (jours/semaines de gameplay)
- **Maîtrise contextuelle** : `Maîtrise_Recherche` — progresse à chaque expérience publiée. Sous-spécialités à partir d'Adepte : Recherche alchimique / Recherche métallurgique / Recherche magique / Recherche linguistique / Sciences exotiques.

> [!note] Couplage métier-Maîtrise
> Pour chercher en alchimie, il faut Maîtrise_Alchimie ≥ Adepte ET Maîtrise_Recherche ≥ Initié. Le Chercheur est typiquement un **second métier** d'érudit déjà formé.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** (à perte importante : la Recherche échoue souvent) :
- **Source 1 — Nature** : composants rares ([[Cœur de plante]], [[Champignon]] exotiques, [[Poudre naturel]] volcanique)
- **Source 2 — Créature** : [[Larme]], [[Essence spirituelle]], [[Cœur de creature]] cosmique, [[Sang]] de créatures rares
- **Source 3 — Fabrication** : [[Émulsion alchimique]], [[Poudre fabriqué]], [[Cristal de Voie]]
- **Sources documentaires** : [[Tome|tomes]] anciens, archives ([[Bibliothécaire]] partenaire)

**Produit / découvre** :
- **Recettes signées** — formule + nom du Chercheur, entre dans le Recipe Generator
- **Traités scientifiques** — publications fondatrices
- **Procédés brevetés** — exclusivité temporaire (cotisation guilde)
- **Œuvres signées** — Héritage palier Maître (cf. [[L'Accord]])
- **Connaissances négatives** — ce qui ne marche pas (vendable aussi !)

→ Référence [[Crafts]] §8 — Scriptorium et enchantement (output : recette codifiée). Cross-réf [[Architecture Data-Driven]] §Recipe Generator.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Cabinet d'étude** | Recoupement, hypothèses | Novice |
| **Atelier expérimental** | Tests itératifs (variables : intrants, dosage, timing) | Initié |
| **Laboratoire** | Recherche systématique avec instruments | Adepte |
| **Cercle de fixation** | Stabilisation magique des résultats | Expert |
| **Cabinet de Prédiction** | Recherche d'ère, en collaboration avec [[Astronome]] / [[Oracle]] | Expert |
| **Académie de Recherche** | Publication reconnue, validation pair | Maître |

**Outils signature** :
- **Carnet expérimental** — log méthodique des essais
- **Balance de précision** ([[Bijoutier]]) — mesures fines
- **Sablier rituel** — timing exact
- **Cristal d'enregistrement** (rare) — palier Expert+, capture l'état d'une réaction
- **Loupe** et **Plume** — observation et consignation

→ Référence [[Crafts]] §Stations §Cercle d'enchantement (pour la recherche magique).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Reproduction d'expériences connues, premiers essais. Taux d'échec ~50% (normal !) |
| **Initié** | Variation contrôlée des paramètres, premières micro-découvertes. Taux d'échec ~35% |
| **Adepte** | Découverte de variantes (ex : potion existante avec composant alternatif), sous-spécialité déclarable. Taux d'échec ~20% |
| **Expert** | Découverte de recettes inédites (potion, alliage, enchantement), publication reconnue. Taux d'échec ~10% |
| **Maître** | **Condition cachée 🔒** — Recette signée portant son nom (Héritage permanent), école de Recherche fondée, accès aux composants cosmiques (Cœur de creature [[Cosmique]]) |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Un Chercheur sans pratique perd l'intuition expérimentale (rouille -15%).

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Reproduire une potion connue · Tester un dosage alternatif · Tenir un carnet d'essai |
| **Initié** | Découvrir une variante mineure · Publier une note de recherche · Rejoindre un cabinet |
| **Adepte** | Découvrir une recette de variante (3+ paramètres modifiés) · Conférence locale · Conseil à une guilde |
| **Expert** | Inventer une recette inédite (Magistrale) · Publication régionale · Accès aux fonds de recherche |
| **Maître** | **Œuvre signée** : recette nommée d'après le Chercheur (Héritage permanent), accès aux composants cosmiques, école de Recherche |

→ Cross-réf : un Chercheur Maître peut alimenter le **Recipe Generator** in-fiction — chaque ère apporte de nouvelles recettes qui ont été *trouvées*.

---

## 7. Carrière et débouchés

- **Démarrage** : assistant de laboratoire, ou Alchimiste/Forgeron Adepte+ qui se tourne vers la recherche
- **Progression** : publications croissantes → reconnaissance académique → fondation de cabinet
- **Établissement** :
  - **Chercheur de cour** — finance par le souverain, publications stratégiques
  - **Chercheur de cabinet** — collabore avec [[Astronome]], [[Oracle]], [[Bibliothécaire]] pour [[Prédiction]] avancée
  - **Chercheur indépendant** — vit de la vente de recettes signées
  - **Chercheur en sciences exotiques** — composants cosmiques, Voies rares, expérimentation extrême
- **Réseau** :
  - **Pair-amont** : [[Bibliothécaire]] (sources), [[Historien]] (recettes anciennes oubliées), [[Alchimiste]] / [[Forgeron]] / [[Enchanteur d'objet]] (collaborateurs métier)
  - **Pair-aval** : tous les artisans (les recettes nouvelles leur sont vendues)
  - **Concurrence** : Chercheurs entre eux (course à la primeur)
- **Faction** : Académies de Recherche (Astravia), guildes spécialisées, Cabinet des Sciences Exotiques

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Recherche botanique +30%, abondance d'intrants |
| **Ère [[Les Ères|Brume Mortelle]]** | Recettes alchimiques rares accessibles uniquement durant l'ère (cf. [[Crafts]]) — fenêtre critique |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Sciences obscures débloquées, recettes Noctari accessibles |
| **Ère [[Les Ères|Vents]] (Aerion)** | Recherches sur volatils, gaz, distillations légères |
| **Ère [[Les Ères|Échos Brisés]]** | Recherches temporelles débloquées (Cristaux temporels, [[Voie de Tempora]]) |
| **Post-[[Le Souffle]] semaine 1** | Pic de découvertes (nouveaux composants, nouvelles ressources d'ère) |
| **[[L'Accord]] ≥ 75%** | Accès à des composants d'ère réservés |
| **[[L'Accord]] = 100%** | Œuvre signée : Recette signée d'ère (Héritage, [[L'Accord]] §Héritage) |
| **Religion [[Foedus Animae]]** | Recherches sur les Pactes (mécaniques sociales) |
| **Faction guilde mage** | Accès aux composants magiques rares |

---

## 9. Économie

**Gold sinks générés** :
- Composants exotiques (échec compris) : 500-10 000 Éclats / session
- Loyer laboratoire : 500-5 000 Éclats / mois
- Cotisation Académie : 1 000 Éclats / ère
- Achat de cristaux d'enregistrement : 200-2 000 Éclats
- Voyages d'expédition (chercher des composants rares) : 1 000+ Éclats / mission

**Prix indicatifs** :
- Note de recherche : 50-300 Éclats
- Recette inédite (Adepte) : 500-3 000 Éclats / vente
- Recette signée Expert : 5 000-30 000 Éclats / vente
- Œuvre signée Maître : 50 000-500 000 Éclats ou Héritage social
- Brevet exclusif (1 ère) : redevances ~10% des ventes par le Recipe Generator

**Chaîne économique** :
```
[[Bibliothécaire]] / [[Historien]] (sources) + [[Herboriste]] / [[Mineur]] / [[Dépéceur]] (composants) → Chercheur
                                                                                                       ↘ Recettes vendues
                                                                                                       ↘ [[Alchimiste]] / [[Forgeron]] / [[Enchanteur d'objet]]
                                                                                                       ↘ Recipe Generator (Héritage mondial)
                                                                                                       ↘ Cabinets de [[Prédiction]]
```

> [!tip] Économie de l'échec
> Le Chercheur paie cher ses échecs (composants perdus). Mais une seule réussite Maître peut financer des années de recherche. Le métier valorise la **patience et le risque**.

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 07:00 lever — vérification des protocoles en cours (réactions de nuit)
- 08:00-12:00 — expériences, mesures
- 12:00-13:00 — pause, lecture
- 13:00-18:00 — analyse, hypothèses, design d'expériences suivantes
- 18:00-20:00 — rédaction, correspondance avec confrères
- 20:00-22:00 — étude personnelle, sources rares

**Signatures de PNJ archétypaux** :
- **Le savant excentrique** — laboratoire en désordre, brûlures aux mains, idées par éclairs
- **La chercheuse rigoureuse** — carnet impeccable, méthode infaillible, peu de discoveries mais toutes solides
- **Le chercheur d'ère** — voyage avec une caravane équipée, traque les composants éphémères
- **Le savant maudit** — ses recherches l'ont marqué (corps modifié, mental altéré), [[Voie]] active permanente

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Doctora Kalivane, fondatrice du Cabinet des Sciences Exotiques* (cf. citation d'ouverture)
- *Maître Errand le Patient* — 47 ans pour signer une recette, mais signature inégalée
- *La Pâle Sœur Ihora* — recherches en poisons (souvent confondue avec une alchimiste-poisonnière)

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Prédiction]] · [[Architecture Data-Driven]] · [[Alchimiste]] · [[Bibliothécaire]] · [[Historien]] · [[Astronome]] · [[Enchanteur d'objet]] · [[Mage]]*
