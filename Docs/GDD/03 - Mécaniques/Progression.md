---
tags: [progression, accord, maîtrise, xp-scaling, items]
status: recently_refactored
last_review: 2026-05-01
needs_review_for: [chiffres-playtest, accord-tuning]
type: mechanic
---

# 📈 Progression — Le système d'Accord

## Architecture en 5 couches

> [!important] Hybelior n'a PAS de "niveau global classique"
>
> La progression repose sur **5 couches distinctes** qui se complètent. Le concept de "niveau global" classique est remplacé par **L'Accord** (alignement à l'ère cosmique en cours).

```
┌─────────────────────────────────────────────────┐
│ COUCHE 1 — STATS BRUTES                         │
│ Vigueur, Vivacité, Acuité, Esprit… 0–150        │
│ Compressées par chaque Souffle (Vigueur > 50)   │
│ Voir [[Personnage]]                        │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ COUCHE 2 — MAÎTRISES                            │
│ 5 paliers par activité (Novice → Maître)        │
│ Préservées, mais "rouille" 1 sem post-Souffle   │
│ Voir [[Armes et Maîtrise]]                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ COUCHE 3 — L'ACCORD                             │
│ 0–100% par ère, reset à chaque Souffle          │
│ Le cœur de la progression visible               │
│ Voir [[L'Accord]]                          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ COUCHE 4 — L'HÉRITAGE                           │
│ Compteurs et titres permanents                  │
│ "Concordant de 3 Ères", œuvres signées, etc.    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ COUCHE 5 — IDENTITÉ                             │
│ Cosmétiques, monuments, signatures              │
│ Visage du joueur dans le monde                  │
└─────────────────────────────────────────────────┘
```

---

## La Couche 1 — Stats brutes (rappel)

> Voir [[Personnage]] pour le détail complet.

8 stats brutes (Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe) qui montent **par usage**. Pas d'attribution manuelle. Le système de **Focus** permet de doubler le gain sur 1-3 stats choisies.

**Échelle 0–150** :
- 0–20 : Novice
- 20–40 : Compétent
- 40–60 : Aguerri
- 60–80 : Exceptionnel
- 80–100 : Légendaire
- 100–150 : Mythique (élite absolue)

---

## La Couche 2 — Maîtrises

> Voir [[Armes et Maîtrise]] pour le détail complet.

| Palier | Nom | % de joueurs estimé pendant une Partie |
|--------|-----|---------------------------------------|
| **1** | Novice | 100% (tous commencent là) |
| **2** | Initié | ~60% |
| **3** | Adepte | ~30% |
| **4** | Expert | ~10% |
| **5** | Maître 🔒 | <2% (condition cachée) |

> [!warning] Décroissance et rouille
> - **Décroissance** : maîtrises non utilisées descendent lentement (~1 palier perdu par mois sans pratique)
> - **Rouille** : à chaque Souffle, 1 semaine de performance −15% qui se dissipe par usage

---

## La Couche 3 — L'Accord

> Voir [[L'Accord]] pour le détail complet.

Métrique **0-100%** qui mesure l'alignement du joueur avec l'ère cosmique en cours. Reset à chaque Souffle. Le titre permanent "Concordant de l'Ère X" reste si 100% atteint.

### Sources d'Accord

| Type d'objectif | Accord gagné |
|-----------------|--------------|
| Découverte de l'ère (zones nouvelles) | +10% |
| Quêtes d'ère | jusqu'à +20% |
| Événements mondiaux | jusqu'à +15% |
| Maîtrise active palier 4+ | +10% par palier 4+ |
| Conditions cachées 🔒 | +5 à +15% |
| Contribution sociale | jusqu'à +10% |
| Voie active maintenue | +5% |
| Œuvre signée Magistrale ou + | +5% par œuvre |

### Effets par palier

| Accord | Effets concrets |
|--------|-----------------|
| **0–25%** | Aucun bonus, accès au contenu de base |
| **25–50%** | +5% gain XP, accès quêtes secondaires d'ère |
| **50–75%** | +1 slot d'action, +1 slot Focus, bonus Reconnaissance |
| **75–100%** | Accès contenus rares, donjons spéciaux, titre temporaire |
| **100%** | Titre permanent, accès événement de fin d'ère, conditions cachées Mythiques |

---

## La Couche 4 — L'Héritage

> Voir [[L'Accord]] pour le détail complet.

L'Héritage est ce qui **s'accumule à vie** sans jamais se perdre. C'est l'identité historique du joueur.

| Élément | Description |
|---------|-------------|
| **Ères Concordées** | Compteur d'ères où 100% atteint |
| **Œuvres signées** | Items légendaires créés et qui circulent |
| **Titres et exploits** | Tout ce qui se gagne une fois |
| **Rang social** | Reconnaissance auprès des factions |
| **Cosmétiques** | Skins, montures, tatouages (inter-Parties) |
| **Disciples** | PNJ ou joueurs influencés/formés |
| **Monuments** | Statues/inscriptions à ton nom |

---

## XP Scaling — Système de fenêtre

> [!important] Concept central
> L'XP gagné dépend de l'**écart** entre le niveau de l'activité et le niveau du joueur dans cette compétence. C'est ce qui empêche le farm bas niveau et pousse à explorer du contenu adapté.

### Formule de base

```
Écart = NiveauActivité − NiveauJoueur

Écart  ≤ −10  →  0% XP    (trivial, on n'apprend rien)
Écart  −9 à −5 →  25% XP  (encore un peu d'apprentissage)
Écart  −4 à +5 →  100% XP (zone optimale)
Écart  +6 à +10 →  130% XP (challenging — récompense le risque)
Écart  +11 à +20 → 80% XP (limite, mais possible)
Écart  > +20 →  10% XP + risque d'échec critique
```

### Exemples concrets

| Situation | Effet |
|-----------|-------|
| Forgeron Maîtrise 4 forge des dagues niv 5 | **0% Maîtrise_Forge** — sortie en série mais aucun apprentissage |
| Forgeron Maîtrise 4 forge des épées Magistrales (niv 65-70) | **130% gain** — challenging, qualité variable, grosse progression |
| Combattant niv 30 tue des sangliers niv 5 | **0% XP arme et Vigueur** — 100 sangliers : rien |
| Combattant niv 30 affronte un boss niv 38 | **130% XP** — combat dur mais juteux |
| Combattant niv 30 essaie un boss niv 60 | **10%** + risque de mort très élevé |

### Pourquoi c'est bon pour le jeu

- **Le marché reste vivant** : les artisans expérimentés peuvent forger des items basiques pour la communauté, mais ils ne progressent **plus** dessus → ils doivent viser plus haut pour leur progression
- **Force le voyage et l'exploration** : si tu plafonnes ta zone, tu dois bouger
- **Fait sens narrativement** : on apprend de ce qui nous challenge

### Diminishing returns (anti-farm)

> [!tip] Anti-spam
> En plus du scaling, **chaque action répétée perd 20% d'XP** sur la même cible/recette dans la même journée :
>
> - Forger 5 épées identiques : 100% / 80% / 60% / 40% / 20% / puis 10% asymptotique
> - Tuer 5 fois le même boss spawné : idem
> - **Reset à 100%** chaque jour réel (lié au cycle Labeur)
>
> Encourage la **variété** d'activités plutôt que le grind d'une seule.

---

## Sources d'XP par couche

| Source d'action | XP Stats brutes | XP Maîtrise | Accord |
|-----------------|----------------|-------------|--------|
| Tuer un ennemi | ✅ (Vigueur, Vivacité, Acuité selon arme) | ✅ (arme utilisée) | indirect via Reconnaissance |
| Terminer une quête | ✅ (selon nature) | — | ✅ (si quête d'ère) |
| Explorer une zone | ✅ (Endurance, Acuité) | ✅ (Cartographie, Survie) | ✅ (zones d'ère) |
| Craft d'un item | ✅ (Acuité, Mémoire) | ✅ (métier) | ✅ (si item Magistral+ signé) |
| Récolte | ✅ (Endurance) | ✅ (métier de récolte) | indirect |
| Utiliser la magie | ✅ (Esprit, Résonance) | ✅ (Voie) | ✅ (si Voie active maintenue) |
| Marchander | ✅ (Verbe) | ✅ (Marchandage) | indirect |
| Performer (barde) | ✅ (Verbe, Présence) | ✅ (Performance) | ✅ (Reconnaissance) |
| Étudier un grimoire | ✅ (Mémoire) | ✅ (Voie ou métier érudit) | ✅ (si lié à l'ère) |

---

## Quêtes — Générées dynamiquement et biaisées par l'ère

> [!note] IA de génération de quêtes
> Les quêtes sont générées par l'IA selon :
> - La zone dans laquelle se trouve le joueur
> - Ses capacités actuelles et son niveau
> - Son historique et ses préférences
> - La situation en cours (factions, événements)
> - **L'ère active** ([[Les Ères]])
> - L'**Accord** du joueur (pour proposer des quêtes adaptées au palier)
>
> Certaines quêtes ont des **conditions cachées 🔒** de déclenchement.

### Pondération par ère

| Ère | Types de quêtes pondérées |
|-----|---------------------------|
| **Ombre Longue** (Noctis) | Escorter à travers la nuit, retrouver des disparus, purifier un site corrompu |
| **Échos Brisés** (Tempora) | Investiguer des anomalies, fixer un événement passé |
| **Rêve Lumineux** (Eldoria) | Soigner une communauté, retrouver un artefact lumineux |
| **Verdoiement** (Spiritus) | Récolter des plantes rares, apaiser une faune mutée |
| **Vents Bouleversants** (Aerion) | Escorter caravanes pendant tempêtes, suivre migrations |
| **Brume Mortelle** (Noctis+Aquor) | Construire des défenses, explorer dans la brume |

→ Voir [[Les Ères]] pour le catalogue complet d'archétypes.

---

## Items — Tiers de qualité

> Les items s'organisent en **6 tiers qualitatifs** alignés sur les paliers de Maîtrise.

| Niveau d'item | Tier qualitatif | Couleur UI | Source typique |
|--------------|-----------------|------------|----------------|
| **1–20** | **Commun** | Gris | Loot bas, marchands PNJ, novices |
| **21–40** | **Façonné** | Blanc | Initiés, drops zones moyennes |
| **41–60** | **Œuvré** | Vert | Adeptes, drops zones avancées |
| **61–80** | **Magistral** | Bleu | Experts, drops zones difficiles |
| **81–100** | **Légendaire** | Violet | Maîtres, drops boss mondiaux |
| **101+** | **Mythique** 🔒 | Orange | Conditions cachées extrêmes, artefacts cosmiques |

### Différence concrète entre niveaux d'item

> [!important] Tiers qualitatifs > nombre brut
> Un item d'un même tier (ex : Magistral 61 vs 80) a des stats progressives mais **dans la même fourchette**. La vraie différence se fait **entre tiers** :

| Élément | Commun | Façonné | Œuvré | Magistral | Légendaire | Mythique |
|---------|--------|---------|-------|-----------|------------|----------|
| Stats numériques | 1× | 1.5× | 2× | 3× | 4.5× | 6×+ |
| Slot d'enchantement | Non | Non | Optionnel | 1 | 2 | 3+ |
| Propriété spéciale | Non | Non | Non | 1 | 2-3 | 3+ et unique |
| Signature du créateur | Non | Optionnelle | Oui | Oui | Oui (visible) | Oui (légende) |
| Reproduction | Triviale | Standard | Difficile | Rare | Quasi-impossible | Impossible (1 seul exemplaire dans le monde) |

### Qu'est-ce qui rend une œuvre légendaire au-delà du tier

> Au-delà des stats numériques, une œuvre devient **légende** par :
>
> - **Le nom de son créateur** (signature visible, prestige social)
> - **La circonstance de création** (forgée pendant un événement mondial, l'arrachée d'un Souffle, etc.)
> - **First discovery** (premier exemplaire d'une recette nouvelle)
> - **Histoire d'usage** (porté lors d'une bataille célèbre, transmis entre joueurs notables)

→ Voir [[Économie]] pour le rôle économique des items légendaires.

---

## Spécialisation naturelle

> Pas d'attribution manuelle. Pas de classe. Mais la spécialisation **émerge naturellement** :

```
[Pas d'attribution] →  Pas de "build math-tryhard"
                  →  Le joueur devient ce qu'il joue

[Labeur limité]   →  Pas de progression infinie en une journée
                  →  Choix de priorités obligatoire

[Décroissance]    →  Pas de maintien parallèle de toutes maîtrises
                  →  Élagage naturel

[Souffle]         →  Compression cyclique des stats hautes
                  →  Réduction des écarts entre joueurs

[Maîtrises]       →  Spécifiques par activité, pas de transfert
                  →  L'identité de joueur émerge

= IDENTITÉ DE JOUEUR UNIQUE et NATURELLE
```

→ Voir [[Labeur]] | [[Armes et Maîtrise#Décroissance]] | [[Le Souffle]]

---

## Cap d'évolution — durée pour atteindre le sommet

> [!note] Estimations indicatives, à affiner en playtest

| Étape | Joueur engagé | Joueur casual |
|-------|---------------|---------------|
| Stats brutes domaine principal à 60 | 1-2 mois | 3-4 mois |
| Stats brutes domaine principal à 80 | 3-4 mois | 6-8 mois |
| Maîtrise palier 4 (Expert) | 4-6 mois | 8-12 mois |
| Maîtrise palier 5 (Maître) 🔒 | 8-12 mois (avec condition cachée) | 12-18+ mois |
| Première Ère Concordée (100% Accord) | 1ère ère possible | 2-3 ères pour la première |
| 3 Ères Concordées | ~12 mois | ~20+ mois |

### Cap d'une stat brute

- **Plafond mou** à **100** (gain marginal asymptotique au-delà)
- **Plafond dur** à **150** (impossible au-delà — atteint après centaines d'heures)
- **150 ne sera atteint que par 1-2 joueurs par stat, par Partie.** C'est l'**élite absolue**.

---

## Cohérence avec les autres systèmes

| Système | Lien |
|---------|------|
| **[[Personnage]]** | Source des stats brutes et fondamentales |
| **[[Labeur]]** | Limite la vitesse de progression quotidienne |
| **[[Armes et Maîtrise]]** | Couche 2 (technique acquise) |
| **[[Le Lien]]** | Voies et leurs Maîtrises |
| **[[Mort]]** | Perte d'XP à la mort |
| **[[Métiers]]** | Maîtrises de craft |
| **[[Le Souffle]]** | Compression cyclique des stats |
| **[[L'Accord]]** | Couche 3 (alignement à l'ère) |
| **[[Les Ères]]** | Influence les types de quêtes et XP |

---

## Décisions actées

- ✅ **5 couches de progression** : Stats brutes / Maîtrises / Accord / Héritage / Identité
- ✅ **L'Accord remplace le niveau global**
- ✅ **Stats par usage uniquement** (pas d'attribution)
- ✅ **Système de Focus** (1-3 stats focalisées ×2)
- ✅ **XP scaling fenêtre** : −4 à +5 = 100%, +6 à +10 = 130%, etc.
- ✅ **Diminishing returns** : −20% par répétition, reset journalier
- ✅ **6 tiers d'items** (Commun → Mythique) alignés sur les Maîtrises
- ✅ **Légende au-delà du tier** : créateur + circonstance + first discovery
- ✅ **Plafond mou 100, dur 150** sur stats brutes
- ✅ **Quêtes IA biaisées par l'ère**

---

*Liens : [[Personnage]] | [[Labeur]] | [[Armes et Maîtrise]] | [[Le Lien]] | [[Métiers]] | [[Le Souffle]] | [[L'Accord]] | [[Les Ères]] | [[Économie]]*
