---
tags: [métier, archétype, agriculture-élevage, endurance, vigueur]
type: archetype
category: Métier
catégorie_métier: Agriculture et élevage
stat_principale: Endurance
stats_secondaires: [Vigueur, Acuité, Mémoire]
craft_category: 9 — Récolte et transformation primaire
sources_ressources_accessibles: [Céréale, Graine, Plante, Fleur, Racine, Feuille, Baie, Légume, Fruit]
stations_principales: [Champ cultivé, Verger, Potager, Grange, Aire de battage, Cellier]
outils_principaux: [Charrue, Faux, Faucille, Houe, Râteau, Semoir, Fléau de battage]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Meunier, Berger, Cuisinier, Botaniste, Herboriste, Marchand]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-playtest, calendrier-saisonnier-Ères]
---

# 🌾 Agriculteur — Archétype Métier

> *"Je sème quand le ciel se tait, je récolte quand il rugit. Le monde respire — moi je travaille avec son souffle."*

---

## 1. Vue d'ensemble

L'**Agriculteur** est la **base nutritive** d'Hybelior — celui qui produit **céréales, légumes, fruits, plantes utiles**. Métier de **patience, de dos, et de saison**. Son rythme est dicté par l'**ère cosmique** ([[Les Ères]]) plus que par n'importe quel autre métier : ce qui pousse, quand, comment, dépend du Souffle dominant. C'est le métier le plus représenté chez les PNJ de campagne. Pour le joueur, c'est un métier **à temps long** mais aux **rendements massifs** (un champ bien tenu nourrit 30-50 personnes). Un agriculteur célèbre est connu pour la **variété** qu'il maintient, pas pour des objets uniques.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Endurance** — journées 12h+ aux champs, dos courbé
- **Stats secondaires** : **Vigueur** (charrue, fauchage, port), **Acuité** (lecture du sol, du climat, des semences), **Mémoire** (calendrier saisonnier, rotations, recettes paysannes)
- **Maîtrise contextuelle** : `Maîtrise_Agriculture` — montée par cycles de récolte achevés. Sous-maîtrises : `Maîtrise_Céréales`, `Maîtrise_Maraîchage`, `Maîtrise_Verger`, `Maîtrise_Sélection_Semences`.

→ Forte synergie avec [[Botaniste]] (savoir des plantes) sans transfert direct (Pas de transfert — voir [[Personnage]]).

---

## 3. Sources de ressources

**Consomme** :
- **Graine** (auto-produite cycle suivant) — gestion semencière
- **Outils en métal** ([[Forgeron]])
- **Travail animal** ([[Eleveur de créature]] : bœuf de trait, cheval) ou personnel

**Produit** :
- **Céréale** (Source 1 Nature, principal) — blé, seigle, orge, avoine, riz d'ère
- **Plante / Fleur / Racine / Feuille / Baie / Graine** (potager / verger)
- **Fruits** (sous-catégorie de Plante — pommes, poires, raisins, fruits d'ère)
- **Légumes** (carottes, choux, navets, courges)
- **Foin et paille** (sous-produit céréalier) → [[Berger]], [[Eleveur de créature]]

→ Référence [[Sources de Ressources]] §Source 1 §Cultivé et §Végétal.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Champ cultivé** | Production céréalière de masse | Novice |
| **Verger** | Production fruitière (long terme) | Initié |
| **Potager** | Production maraîchère (proche maison) | Novice |
| **Grange** | Stockage récoltes, foin | Novice |
| **Aire de battage** | Séparation grain / paille | Initié |
| **Cellier** | Conservation longue durée | Initié |
| **Pépinière** | Sélection semences, jeunes plants | Adepte |

**Outils** : charrue (avec animal), faux, faucille, houe, semoir, râteau, fléau, batte, panier d'osier.

→ Référence [[Crafts]] §Catégorie 9. Mini-jeu : **timing saisonnier** (semer trop tôt = gel, trop tard = pas de récolte) + **lecture de sol** (densité de semis).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | 1 culture (céréale standard), petit champ ≤ 1 ha, rendement de base, taux d'échec ~25% (mauvaise saison) |
| **Initié** | 3 cultures en rotation, ≤ 5 ha, sélection semences basique, +20% rendement |
| **Adepte** | 5+ cultures, verger, gestion saisonnière fine, lecture du Souffle approchant, qualité Façonnée |
| **Expert** | Cultures d'ère ([[Les Ères|variants Verdoiement, riz Climata]]), pépinière, semences signées, qualité Œuvrée |
| **Maître** | **Condition cachée 🔒** — Variété **signée d'Œuvre** (ex. "Blé d'Aldraan", inscrite à l'Héritage [[L'Accord]]), résistance accrue aux ères dures, semences-héritage |

> Décroissance : oubli de semis = perte d'1 saison entière. Rouille post-[[Le Souffle|Souffle]] : -15% lecture du climat la 1ère semaine.

---

## 6. Crafts/recettes débloqués

> "Recettes" = pratiques agricoles et préparations brutes.

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Blé commun · Avoine · Choux · Foin · Pommes-de-terre |
| **Initié** | Rotation triennale · Compost · Pommes / Poires · Légumes d'hiver · Sélection de la meilleure portion de graines |
| **Adepte** | Verger productif · Cultures spéciales (lin, chanvre) · Greffe d'arbres · Fruits d'ère ([[Les Ères]]) · Conservation cellier |
| **Expert** | Variétés rares · Cultures rituelles ([[Rota Mundi]]) · Plants pour [[Apothicaire]] · Riz Climata / Maïs Cendara · Pépinière de sélection |
| **Maître** | Variété signée (Magistral) · Semences-héritage · Cultures cosmiques post-[[Le Souffle|Souffle]] · Vergers Concordés |

---

## 7. Carrière et débouchés

- **Démarrage** : aide aux champs familiaux, ramassage, désherbage
- **Progression** : ferme familiale, métayer chez seigneur, ou propriétaire libre selon nation
- **Établissement** : ferme — proche source d'eau, près d'un village pour [[Marchand]] et [[Meunier]]
- **Réseau** : [[Meunier]] (céréales), [[Berger]] (foin/paille), [[Cuisinier]] / [[Boulanger]] (clients), [[Marchand]] (vente excédent), [[Botaniste]] / [[Herboriste]] (échange savoirs)
- **Faction** : Guildes paysannes, Confréries druidiques [[Rota Mundi]], Domaines aristocratiques (servage léger)
- **Voie possible** : [[Le Lien|Lié]] [[Terranu]] (terre nourricière) ou [[Spiritus]]

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 1 — Agriculture et élevage). Ces rôles correspondent à des **paliers Maître+** absorbés du legacy AccessExport.

#### Sous-spécialisation Maître+ : Seigneur des terres

> Source canonique : `Role.csv` (cat 1, role n°4).

- **Description** : titre **noble** d'un Agriculteur-Maître propriétaire d'un grand domaine — gère plusieurs métayers / paysans, encadre la production agricole d'une seigneurie. Plus une fonction de **gouvernance terrienne** qu'un travail de champs au quotidien.
- **Conditions** : palier Maître + ≥ 1 domaine reconnu (ferme étendue ou fief mineur) + Reconnaissance ≥ Adepte locale + 🔒 condition cachée (héritage noble OU achat d'un fief OU faveur royale).
- **Notes** : frontière forte avec [[Conseiller]] / Intendant de Gouvernance — un Seigneur des terres exerce un pouvoir politique local. `[REFONTE-NEEDED — frontière Agriculture/Gouvernance à valider : peut être pluri-rôle Agriculteur-Maître + titre Gouvernance].`

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | +50% rendement, semences abondantes, fruits exceptionnels |
| **Ère [[Les Ères|Sommeil de Glace]] (Aquor)** | -40% rendement, focus cultures résistantes (seigle, chou) |
| **Ère [[Les Ères|Vents]] (Aerion)** | Pollinisation excellente, récoltes balayées si tempête |
| **Ère [[Les Ères|Brume Mortelle]]** | Cultures contaminées, opportunités cultures variants |
| **Ère [[Les Ères|Feu Endormi]] (Eldoria)** | Sécheresses, irrigation requise |
| **Post-[[Le Souffle]]** | Réorganisation totale du calendrier ; 1ère semaine perdue |
| **[[L'Accord]] ≥ 75%** | Variétés signées débloquables |
| **Religion [[Rota Mundi]]** | Liturgie agraire, fêtes solstice/équinoxe = bonus |
| **Religion [[Foedus Animae]]** | Pacte avec la terre, cultures résilientes |

---

## 9. Économie

**Gold sinks générés** :
- Achat semences : 50-500 Éclats / saison
- Outils ([[Forgeron]]) : 100-1 000 Éclats
- Métayage seigneurial : 20-40% de la récolte en nature
- Stockage cellier : 1 Éclat / sac / mois (équivalent banque)
- Transport vers villes : 5-20 Éclats / sac / km

**Prix indicatifs** :
- Sac de blé : 30 Éclats · Sac de seigle : 25 Éclats
- Pomme : 0.2 Éclat · Cageot pommes : 15 Éclats
- Variété rare : 100-500 Éclats / sac
- Variété signée : 1 000+ Éclats / sac

**Chaîne économique** :
```
Agriculteur → Céréale → [[Meunier]] → Farine → [[Boulanger]] / [[Cuisinier]] → Plats
            → Légumes → [[Cuisinier]] / [[Marchand]] / Marché direct
            → Foin/Paille → [[Berger]] / [[Eleveur de créature]]
            → Plantes utiles → [[Botaniste]] / [[Herboriste]] / [[Apothicaire]]
            → Lin / Chanvre → [[Tisserand]]
```

---

## 10. Comportement IA / signatures PNJ

**Cycle quotidien typique (saison active)** :
- 04:30-05:00 lever — soin animaux de trait
- 05:00-12:00 — travaux champêtres (charrue, semis, désherbage, récolte)
- 12:00-13:30 pause repas chez soi
- 13:30-18:00 — suite travaux + entretien outils
- 18:00-20:00 — soins animaux soir, repas, vie sociale au village
- 21:00 coucher

**Cycle saisonnier** : printemps semis · été désherbage/foin · automne récolte/battage · hiver entretien/cellier/repos.

**Signatures de PNJ archétypaux** :
- **Le paysan-patriarche** — connaît toutes les saisons, transmet le savoir, méfiant des nobles
- **La paysanne-druidique** — [[Rota Mundi]], lit le ciel, prédit les Souffles
- **Le métayer servile** — sous joug seigneurial, hub des doléances
- **L'agriculteur-libre** — propriétaire fier, parfois rebelle, [[Terranu]]
- **L'agriculteur-d'ère** — cultive les variants post-Souffle, recherché

**PNJ célèbres** *(Phase 4)* :
- *Maitre Almar des Trois Champs* — Galenor sud, blé signé "Almar Doré"
- *La Brigade de Verdoiement* — collectif d'agriculteurs Concordants, [[Rota Mundi]]

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Meunier]] · [[Berger]] · [[Boulanger]] · [[Cuisinier]] · [[Marchand]] · [[Botaniste]] · [[Herboriste]] · [[Tisserand]] · [[Le Lien]]*
