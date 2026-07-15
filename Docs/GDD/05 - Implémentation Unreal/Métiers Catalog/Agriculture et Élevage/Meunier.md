---
tags: [métier, archétype, agriculture-élevage, vigueur, acuité]
type: archetype
category: Métier
catégorie_métier: Agriculture et élevage
stat_principale: Vigueur
stats_secondaires: [Acuité, Endurance, Mémoire]
craft_category: 9 — Récolte et transformation primaire
sources_ressources_accessibles: [Céréale, Graine, Farine]
stations_principales: [Moulin à eau, Moulin à vent, Moulin à traction animale, Pétrin manuel, Tamis et bluteau]
outils_principaux: [Meule de pierre, Sac de jute, Tamis, Bluteau, Pelle à grain]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Agriculteur, Boulanger, Cuisinier, Marchand]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-playtest]
---

# 🌾 Meunier — Archétype Métier

> *"Pas de pain sans farine, pas de farine sans la pierre qui tourne. Mon moulin est l'estomac silencieux du village."*

---

## 1. Vue d'ensemble

Le **Meunier** transforme les céréales brutes (récoltées par l'[[Agriculteur]] et le [[Berger]]) en **farine**, intrant primaire de toute la chaîne [[Cuisine]] et [[Boulanger|Boulangerie]]. C'est un métier de **bottleneck local** : un moulin sert souvent toute une vallée, et le meunier est de fait un **point de pouvoir économique** discret. Souvent monopole de famille (la pierre se transmet, l'art de l'équilibrer aussi). Hybelior connaît trois variantes principales : **moulin à eau** (rivière constante), **moulin à vent** (plaines venteuses, ère [[Les Ères|Vents]]), **moulin à traction animale** (petites bourgades, mules ou bœufs).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Vigueur** — porter les sacs de grain (40-60 kg), aligner les meules, manier les leviers d'engagement
- **Stats secondaires** : **Acuité** (juger la mouture, la finesse), **Endurance** (journées longues), **Mémoire** (recettes de mélange, calage saisonnier)
- **Maîtrise contextuelle** : `Maîtrise_Meunerie` — progresse à chaque session de mouture. Inclut sous-spécialités selon le type de moulin (eau / vent / animal).

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** :
- **Céréale brute** (Source 1 Nature, métier amont [[Agriculteur]]) — blé, seigle, orge, avoine
- **Graine** ponctuelle — pour huileries adjointes (en option, palier Adepte+)
- **Liquide** (eau de rivière) ou **Vent** comme énergie motrice

**Produit** :
- **Farine** (Source 3 Fabrication) — l'intrant principal du [[Boulanger]] et du [[Cuisinier]]
- **Son** (sous-produit) — vendu au [[Berger]] et à l'[[Eleveur de créature]] comme aliment bétail
- **Mouture spéciale** (palier Expert+) — farines fines pour pâtisserie, farines rituelles aux céréales rares

→ Référence [[Sources de Ressources]] §Fabrication §Farine.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Moulin à eau** | Mouture continue, débit élevé | Novice |
| **Moulin à vent** | Mouture par à-coups, dépend du vent | Initié |
| **Moulin à traction animale** | Mouture lente, rural | Novice |
| **Pétrin manuel** | Préparation de pré-mélanges | Initié |
| **Tamis et bluteau** | Séparation farine fine / son | Initié |
| **Bascule à grains** | Pesée des sacs (commerce) | Novice |

→ Référence [[Crafts]] §Stations et §Catégorie 9 (Récolte et transformation primaire).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Mouture standard d'une céréale à la fois, taux d'échec ~15% (farine brûlée, mouture grossière) |
| **Initié** | Mélanges 2 céréales, contrôle de la finesse (3 grades), taux d'échec ~7% |
| **Adepte** | Recettes de mouture régionales, pré-mélanges pour boulangers signés, vitesse +20% |
| **Expert** | Farines rituelles (céréales rares, ères [[Les Ères|spécifiques]]), proc qualité Magistrale 5% |
| **Maître** | **Condition cachée 🔒** — Mouture d'**Œuvre signée** (farine permanente d'une lignée), bonus +15% nutrition transmis à tout pain qui en utilise |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Rouille post-Souffle 1 semaine, −15% performance.

---

## 6. Crafts/recettes débloqués

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Farine de blé commun · Farine d'orge · Son grossier (sous-produit) |
| **Initié** | Farine bise · Farine de seigle · Mélange paysan (blé+orge) · Farine grossière pour bétail |
| **Adepte** | Farine fine de noblesse · Farine d'avoine pour cavaliers · Mélange "des collines" (3 céréales) · Pré-mélange à brioche |
| **Expert** | Farine de céréale d'ère ([[Les Ères|Verdoiement]]), farine sacrée [[Rota Mundi]], farine de [[Le Souffle|Bourrasque]] (très fine) |
| **Maître** | Farine de la Vallée (œuvre signée locale), Farine du [[Le Souffle|Cardinal]] (recette transmise sur 3 générations), Farine d'os pour pains rituels [[Vael'Kurash]] |

→ Recettes individuelles : Phase 2 Recipe Generator.

---

## 7. Carrière et débouchés

- **Démarrage** : aide-meunier rural, transport de sacs, entretien des meules
- **Progression** : reprise du moulin familial OU contrat avec un seigneur local (moulin banal, droit de mouture)
- **Établissement** : un moulin = un emplacement géographique stratégique. Choisir entre rivière (régularité), vent (volume mais à-coups), ou colline (mule-driven, rural)
- **Réseau** : alliances étroites avec [[Agriculteur]] (intrants), [[Boulanger]] (clients fixes), [[Marchand]] (export régional)
- **Faction** : guildes meunières dans certaines nations, droits de mouture aristocratiques dans d'autres (Galenor : moulin banal seigneurial)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 1 — Agriculture et élevage). Ces rôles correspondent à des **paliers Maître+** absorbés du legacy AccessExport.

#### Sous-spécialisation Maître+ : Gardien des réserves

> Source canonique : `Role.csv` (cat 1, role n°2).

- **Description** : Meunier-Maître responsable des **stocks alimentaires stratégiques** d'une cité ou d'un fief — supervise greniers, silos, taxes en grain, redistribution en cas de disette.
- **Conditions** : palier Maître + 1 contrat seigneurial ou municipal de garde des stocks + Reconnaissance ≥ Adepte + 🔒 condition cachée (avoir tenu un grenier durant ≥ 1 ère post-[[Le Souffle|Souffle]] sans perte critique).
- **Notes** : frontière avec [[Marchand]] (redistribution) et Gouvernance (Intendant). Rôle clé pendant les ères [[Les Ères|Sommeil de Glace]] / [[Les Ères|Brume Mortelle]] où la conservation devient vitale.

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | +20% rendement, céréales abondantes, prix farine baisse |
| **Ère [[Les Ères|Sommeil de Glace]] (Aquor)** | -30% rendement, focus farines de conservation, prix x1.5 |
| **Ère [[Les Ères|Vents]] (Aerion)** | Moulins à vent +40% débit, recette "Farine du Voyageur" |
| **Post-[[Le Souffle]] semaine 1** | Rouille -15% : mouture irrégulière, plus d'échecs |
| **[[L'Accord]] ≥ 75%** | Recette de farine d'ère débloquée |
| **Religion [[Rota Mundi]]** | Farines rituelles (cycles, équinoxe) |
| **Religion [[Foedus Animae]]** | Mouture de serment (pour pains de pacte) |
| **Faction noble vs guilde** | Noble : monopole local, prix garantis. Guilde : mutualisation, prix marché |

---

## 9. Économie

**Gold sinks générés** :
- Entretien meule de pierre : 200 Éclats / mois (taille des sillons)
- Réparation engrenages bois : 50-300 Éclats selon dégâts
- Loyer moulin banal (si seigneurial) : 10% de la production en nature
- Taxe HV sur farine de prestige : 2-5% (voir [[Économie]] §Taxe HV)

**Prix indicatifs** :
- Farine commune : 2 Éclats / kg
- Farine fine : 8 Éclats / kg
- Farine d'ère / rituelle : 30-100 Éclats / kg
- Mouture pour client (service) : 10% du grain apporté

**Chaîne économique** :
```
[[Agriculteur]] (Céréale) → Meunier (Farine) → [[Boulanger]] (Pain) → [[Tavernier]] / [[Aubergiste]] (Repas)
                                            → [[Cuisinier]] (Plats)
                                            → [[Eleveur de créature]] (Son → Bétail)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 04:30 lever — vérifier la roue / les voiles / la mule
- 05:00-12:00 — mouture matinale (animation `engager_meule`, `verser_grain`, `ramasser_farine`)
- 12:00-13:00 — pause repas
- 13:00-17:00 — mouture après-midi + pesée clients
- 17:00-19:00 — entretien (graissage, taille des meules)
- 20:00 coucher tôt

**Signatures de PNJ archétypaux** :
- **Le meunier sourd** — un classique : la meule fait perdre l'audition. Hub de rumeurs paradoxal (les gens parlent fort devant lui).
- **La meunière (matriarche)** — souvent veuve, contrôle l'économie locale par le grain
- **Le meunier de [[L'Accord|l'Accord]]** — Concordant, farines rituelles, lié au sanctuaire local

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Maitre Ourrec, "le Meunier des Trois Vallées"* — Galenor central, fournit 3 villages
- *Vela la Bise* — Aerion, championne des moulins à vent, [[Via Ventus]]

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Agriculteur]] · [[Boulanger]] · [[Cuisinier]] · [[Marchand]]*
