---
tags: [métier, archétype, agriculture-élevage, vigueur, endurance]
type: archetype
category: Métier
catégorie_métier: Agriculture et élevage
stat_principale: Vigueur
stats_secondaires: [Endurance, Acuité, Vivacité]
craft_category: 9 — Récolte et transformation primaire
sources_ressources_accessibles: [Bois, Écorce, Sève, Résine, Feuille, Champignon]
stations_principales: [Coupe, Aire de débitage, Scierie, Aire de stockage couvert]
outils_principaux: [Hache à bûcher, Scie de long, Coin et masse, Câble de tirage, Affûteuse]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Menuisier, Charpentier, Architecte, Sculpteur, Botaniste, Apothicaire]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-playtest, intégration-zones-foretières]
---

# 🪵 Bûcheron — Archétype Métier

> *"L'arbre tombe quand l'arbre veut bien tomber. Mon métier, c'est de l'écouter avant de le couper."*

---

## 1. Vue d'ensemble

Le **Bûcheron** est le **premier maillon** de la chaîne **bois** d'Hybelior. Il abat, ébranche, débite, transporte. Métier de **force pure et d'endurance**, mais aussi de **lecture du vivant** — un arbre mal abattu blesse ou tue. Dans le système économique, il est le **fournisseur en amont** des [[Menuisier]], [[Architecte]], [[Sculpteur]] et — plus indirectement — du [[Forgeron]] (charbon, manches d'outils). Il a une **proximité forte avec le [[Botaniste]]** : le bûcheron sait *où* poussent les arbres mais aussi quels sont les jeunes à épargner. Métier souvent saisonnier (hiver privilégié — sève basse, bois plus dense), il alterne pratique de coupe et entretien d'outils en morte-saison.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Vigueur** — coups de hache, port de billes (50-200 kg)
- **Stats secondaires** : **Endurance** (journées 10h+ en forêt), **Acuité** (lecture de l'arbre, anticipation de la chute), **Vivacité** (s'écarter d'une chute imprévue)
- **Maîtrise contextuelle** : `Maîtrise_Bûcheronnage` — montée par arbre abattu et débité. Sous-spécialité : `Maîtrise_Hache` (peut transférer partiellement vers `Maîtrise_Hache_Combat` mais ce sont deux skills distincts — voir [[Personnage]] §Pas de transfert).

→ Synergie naturelle avec `Maîtrise_Hache` combat — un bûcheron-aventurier classique en Hybelior.

---

## 3. Sources de ressources

**Consomme** :
- **Outils en métal** (haches, scies, coins) — usure régulière, [[Forgeron]]
- **Affûteur** ou pierre à aiguiser ([[Sources de Ressources]] §Pierre)

**Produit** :
- **Bois** (Source 1 Nature, principal) — chêne, hêtre, pin, érable, essences rares d'ère
- **Écorce** — [[Tanneur]] (tannins) et [[Apothicaire]]
- **Sève** — [[Apothicaire]] / [[Alchimiste]] (résine traitée, baume)
- **Résine** (sous-produit pin / résineux)
- **Feuilles, champignons d'écorce** (glanage opportun)
- **Charbon de bois** (palier Adepte+ avec station meule à charbon) — précurseur [[Forgeron]]

→ Référence [[Sources de Ressources]] §Source 1 Nature §Bois, Écorce, Sève.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Coupe (forêt)** | Lieu d'abattage | Novice |
| **Aire de débitage** | Ébranchage et tronçonnage | Novice |
| **Scierie** (avec [[Menuisier]]) | Débit en planches | Initié |
| **Meule à charbon** | Transformation bois → charbon | Adepte |
| **Aire de stockage couvert** | Séchage du bois (3 mois - 2 ans) | Initié |

**Outils** : hache à bûcher (1 main / 2 mains), scie de long (à deux), coin et masse pour fendre, câble de tirage (extraction).

→ Référence [[Crafts]] §Catégorie 9. Mini-jeu : **timing de coup de hache** (zone visée, profondeur d'entaille, direction de chute).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Abattage de petits arbres (≤ Ø 30 cm), 1 essence (chêne/hêtre), taux d'échec ~20% (chute ratée, bois fendu) |
| **Initié** | Arbres ≤ Ø 60 cm, 3 essences, ébranchage propre, débit en bûches courantes |
| **Adepte** | Arbres ≤ Ø 100 cm, contrôle direction de chute, charbon de bois, écorce sans déchirer |
| **Expert** | Arbres centenaires, essences rares, arbres d'ère ([[Les Ères|Verdoiement]]), bois Œuvré pour [[Menuisier]] / [[Architecte]] |
| **Maître** | **Condition cachée 🔒** — Abattage d'**Arbre-Patriarche** (Magistral+), bois signé (Héritage [[L'Accord]]), respect de la forêt = aucun arbre gaspillé |

> Décroissance et rouille post-[[Le Souffle|Souffle]] : -15% précision direction de chute → risque accru.

---

## 6. Crafts/recettes débloqués

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Bûches communes · Bois de chauffage · Branches élaguées · Écorce brute |
| **Initié** | Billes droites (4 m) · Bûches calibrées · Tannins (écorce raclée) · Sève pure |
| **Adepte** | Charbon de bois · Bois fendu (planches semi-finies) · Résine purifiée · Bois Façonné pour [[Menuisier]] |
| **Expert** | Bois Œuvré (chêne ancien, érable rouge) · Bois d'ère (variants Verdoiement, Brume) · Charbon noble (forge prestige) |
| **Maître** | Cœur de Patriarche (Magistral+) · Bois Concordé · Essences Cosmiques post-[[Le Souffle|Souffle]] · Bois rituel pour [[Sculpteur]] / [[Architecte]] sacré |

---

## 7. Carrière et débouchés

- **Démarrage** : assistant bûcheron en forêt seigneuriale, transport de bûches
- **Progression** : équipe de bûcherons indépendants OU contrat avec une nation forestière (Galenor nord)
- **Établissement** : cabane de coupe en forêt, scierie au pied du massif, ou village forestier
- **Réseau** : [[Menuisier]] / [[Charpentier]] (clients principaux), [[Architecte]] (commandes massives), [[Forgeron]] (charbon), [[Botaniste]] (ressources annexes), [[Apothicaire]] (sève)
- **Faction** : Confréries forestières, Druidiques [[Rota Mundi]] (régulation), Guildes de bois
- **Voie possible** : [[Le Lien|Lié]] [[Spiritus]] (forêt) ou [[Terranu]] (terre)

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | +30% rendement, mais bois moins dense (sève haute) |
| **Ère [[Les Ères|Sommeil de Glace]] (Climata)** | Bois dense de qualité +20%, mais déplacement difficile, journée courte |
| **Ère [[Les Ères|Brume Mortelle]]** | Forêts dangereuses, créatures rares, essences variants |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Bois sombre rituel ([[Noctari]]), production -20%, prix x1.5 |
| **Post-[[Le Souffle]]** | Forêts modifiées : variants d'arbres, opportunités/dangers |
| **[[L'Accord]] ≥ 75%** | Patriarches signables — Héritage permanent |
| **Religion [[Rota Mundi]]** | Pratique liturgique : abattage rituel, replantation |
| **Faction Druidique** | Régulation stricte (quotas), accès essences sacrées |

---

## 9. Économie

**Gold sinks générés** :
- Affûtage hache : 5-20 Éclats
- Réparation hache (manche cassé) : 30-100 Éclats ([[Forgeron]] + [[Menuisier]])
- Droit de coupe (forêt seigneuriale) : 5-15% du bois
- Transport (bouvier / mule) : 20 Éclats / 100 kg / km
- Taxe HV bois prestige : 5%

**Prix indicatifs** :
- Bûche commune : 1 Éclat · Bois de chauffage stère : 30 Éclats
- Bille droite chêne : 50-200 Éclats
- Bois Œuvré : 500-2 000 Éclats / m³
- Bois d'ère (variant) : 5 000+ Éclats / pièce
- Charbon de bois : 5 Éclats / kg

**Chaîne économique** :
```
Forêt → Bûcheron (Bois, Écorce, Sève, Charbon) → [[Menuisier]] (Planches, Mobilier)
                                                → [[Architecte]] / [[Charpentier]] (Bâti)
                                                → [[Forgeron]] (Charbon, Manches)
                                                → [[Sculpteur]] (Statues, Talismans)
                                                → [[Apothicaire]] / [[Alchimiste]] (Sève, Résine)
                                                → [[Tanneur]] (Tannins d'écorce)
```

---

## 10. Comportement IA / signatures PNJ

**Cycle quotidien typique** :
- 05:30 lever — affûtage outils, repas dense
- 06:00-12:00 — coupe (souvent en équipe de 2-3)
- 12:00-13:30 pause repas en forêt (feu, peu de mots)
- 13:30-17:30 — débitage, transport, ébranchage
- 18:00-20:00 — retour, entretien outils, repas
- 21:00 coucher tôt

**Signatures de PNJ archétypaux** :
- **Le bûcheron solitaire** — cabane en forêt, peu de paroles, force impressionnante, parfois suspect
- **Le chef d'équipe** — gère 5-10 hommes, négocie avec seigneurs, rude mais juste
- **La bûcheronne** *(rare et notable)* — preuve qu'aucun métier n'est interdit, souvent renommée, [[Aerion]] ou [[Cendara]]
- **Le bûcheron druidique** — [[Rota Mundi]], coupe rituelle, replante, cycles respectés

**PNJ célèbres** *(Phase 4)* :
- *Vorund Brisechêne* — Galenor nord, abat des arbres centenaires d'une seule main (légende)
- *La Forestière de [[Les Ères|Verdoiement]]* — Liée [[Spiritus]], symbiose avec la forêt

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Menuisier]] · [[Architecte]] · [[Charpentier]] · [[Sculpteur]] · [[Forgeron]] · [[Botaniste]] · [[Apothicaire]] · [[Le Lien]]*
