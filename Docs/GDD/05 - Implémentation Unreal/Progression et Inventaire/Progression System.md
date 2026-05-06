---
tags: [implementation, progression, accord, maitrise, stats, xp-scaling, items, balance]
status: drafted
last_review: 2026-05-07
needs_review_for: [chiffres-playtest, paliers-maitrise, xp-window-tuning, tiers-items]
type: implementation
canonical_concept: "[[Progression]]"
---

# Progression System — Implémentation

> Page d'implémentation technique du concept narratif **[[Progression]]**.
> Cette page agrège les **chiffres, formules, specs Unreal et règles de balance** de la progression multi-couches d'Hybelior.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Progression]].
>
> Cette page **n'est pas** la spec du composant runtime. Pour le composant Unreal qui pilote les unlocks et l'Héritage, voir [[HW Progression Component]] (cette page-ci définit *ce qui doit être calculé*, l'autre définit *comment c'est branché côté C++/BP*).

---

## Architecture en 5 couches — vue technique

| Couche | Domaine | Stockage | Réinitialisation au Souffle | Page canonique |
|---|---|---|---|---|
| **1 — Stats brutes** | Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe | `CombatAttributeSet` + persistance OWS | Compression linéaire au-dessus de 50 | [[Personnage]] / [[Combat Attribute Set]] |
| **2 — Maîtrises** | Paliers d'expertise par activité (combat, craft, magie, social) | `WeaponMasteryComponent` + tables maîtrise | Préservées + rouille temporaire 1 sem | [[Armes et Maîtrise]] / [[Weapon Mastery]] |
| **3 — Accord** | Alignement à l'Ère cosmique en cours, 0–100% | `HWProgressionComponent` (`CurrentEraAccord`) | Reset à 0 (titre permanent si 100% atteint) | [[L'Accord]] / [[Accord System]] |
| **4 — Héritage** | Compteurs & titres permanents (`ConcordedErasCount`, `SouffleSurvived`, `EraConcorded`) | `HWProgressionComponent` (`EHWConditionType`/`EHWRewardType`) | Jamais réinitialisé | [[L'Accord]] / [[HW Progression Component]] |
| **5 — Identité** | Cosmétiques, monuments, signatures, disciples — visage du joueur dans le monde | Persistance OWS + Global Data Service | Jamais réinitialisé (inter-Parties) | [[L'Accord]] / [[Inventory Persistence]] |

> **Important** : la couche 3 (Accord) **remplace** le concept de "niveau global" classique. Il n'existe pas de variable `PlayerLevel` unique dans le code. La "puissance perçue" du joueur est la résultante des couches 1+2+3.

---

## Couche 1 — Stats brutes : échelle et plafonds

### Échelle canonique 0–150

| Plage | Qualificatif gameplay |
|---|---|
| 0–20 | Novice |
| 20–40 | Compétent |
| 40–60 | Aguerri |
| 60–80 | Exceptionnel |
| 80–100 | Légendaire |
| 100–150 | Mythique (élite absolue) |

### Plafonds

- **Plafond mou** : `100` — gain marginal asymptotique au-delà.
- **Plafond dur** : `150` — impossible au-delà, atteint après plusieurs centaines d'heures.
- **Estimation peuplement** : 1 à 2 joueurs par stat à 150, par Partie. C'est l'élite absolue de la Partie.

### 8 stats brutes (rappel structurel)

Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe.
Toutes montent **par usage**. Pas d'attribution manuelle. Voir [[Personnage]] pour le détail sémantique.

### Système de Focus

Le joueur peut désigner **1 à 3 stats focalisées** : gain ×2 sur ces stats. Les slots de Focus s'ouvrent selon la couche 3 (Accord) :

| Accord | Slots Focus |
|---|---|
| 0–49% | 1 slot |
| 50–99% | 2 slots |
| 100% (Concordant) | 3 slots |

### Compression au Souffle

Voir [[Souffle System]] pour la formule canonique.
- Petit Souffle : seuil 50, facteur 0.7.
- Grand Souffle : seuil 50, facteur 0.5.

---

## Couche 2 — Maîtrises : 5 paliers canoniques

| Palier | Nom | % de joueurs estimé pendant une Partie | Conditions d'accès | Effets gameplay clés |
|---|---|---|---|---|
| **1** | Novice | 100% (tous commencent là) | Aucune | Accès aux recettes/coups de base |
| **2** | Initié | ~60% | Seuil d'XP de maîtrise atteint | +1 slot recette, +5% qualité moyenne |
| **3** | Adepte | ~30% | Seuil + diversité d'usage | +2 slots, +10% qualité, accès recettes intermédiaires |
| **4** | Expert | ~10% | Seuil + œuvres signées + diversité | Source d'Accord +10%, accès recettes Magistrales |
| **5** | Maître 🔒 | <2% (condition cachée) | Condition cachée d'ère + œuvre Légendaire + reconnaissance sociale | Source d'Accord +10% (cumul), accès recettes Légendaires/Mythiques, titre permanent |

> **Décroissance** : maîtrises non utilisées descendent lentement (~1 palier perdu par mois sans pratique).
> **Rouille** : à chaque Souffle, performance −15% pendant 1 semaine, dissipée par usage. Détail dans [[Souffle System]].

Voir [[Weapon Mastery]] pour le composant runtime, [[Armes et Maîtrise]] pour la philosophie.

---

## Couche 3 — Accord : sources et effets

> **Renvoi** : la table canonique des **sources d'Accord**, des **effets par palier**, du **total disponible par ère** et du **cap dur 100%** vit dans [[Accord System]]. Ne pas dupliquer.

Rappel synthétique pour la vue d'ensemble :
- Échelle `[0, 100]%`, total disponible ~100–130%, cap dur 100%.
- 5 paliers : Désaccordé (0–24) → Mi-accordé bas (25–49) → Mi-accordé haut (50–74) → Accordé (75–99) → Concordant (100%).
- Reset à chaque Souffle ; le titre "Concordant de l'Ère du [nom]" reste permanent.

Sources d'Accord détaillées avec pourcentages → [[Accord System]] §Sources.
Effets par palier détaillés → [[Accord System]] §Effets.

---

## Couche 4 — Héritage : ce qui s'accumule à vie

| Élément | Description | Stockage |
|---|---|---|
| **Ères Concordées** | Compteur d'ères où 100% Accord atteint (`ConcordedErasCount`) | `HWProgressionComponent` |
| **Œuvres signées** | Items Magistraux+ créés et qui circulent | Inventaire monde + `signedBy` metadata |
| **Titres et exploits** | Tout ce qui se gagne une fois (rewards type `Title`, `LoreEntry`) | `HWProgressionComponent` `EHWRewardType` |
| **Rang social** | Reconnaissance auprès des factions | Global Data Service |
| **Cosmétiques** | Skins, montures, tatouages (inter-Parties) | OWS `CustomCharacterData` |
| **Disciples** | PNJ ou joueurs influencés/formés | Global Data Service |
| **Monuments** | Statues/inscriptions à ton nom | Persistance monde |
| **Souffles traversés** | Compteur (`SouffleSurvived`) | `HWProgressionComponent` |

Pour les types de conditions et de rewards (`EHWConditionType`, `EHWRewardType`) qui matérialisent l'Héritage en runtime, voir [[HW Progression Component]].

---

## Couche 5 — Identité : visage du joueur dans le monde

| Élément | Persistance | Visibilité |
|---|---|---|
| Cosmétiques (skins, tatouages, montures) | Inter-Parties (Global Data Service) | Tous |
| Monuments / inscriptions | Persistance monde, dégradation par histoire | Tous |
| Œuvres signées en circulation | Inventaire monde | Tous |
| Réputation (alignement, karma) | Global Data Service | Tous |
| Disciples | Global Data Service | Tous |

Voir [[Inventory Persistence]] et [[Global Data Replication]] pour les flux de persistance.

---

## XP Scaling — système de fenêtre

> **Concept central** : l'XP gagnée dépend de l'**écart** entre le niveau de l'activité et le niveau du joueur dans cette compétence. Empêche le farm bas niveau et pousse à explorer du contenu adapté.

### Formule de base

```
Écart = NiveauActivité − NiveauJoueur

Écart  ≤ −10  →   0% XP    (trivial, on n'apprend rien)
Écart  −9 à −5 →  25% XP   (encore un peu d'apprentissage)
Écart  −4 à +5 → 100% XP   (zone optimale)
Écart  +6 à +10 → 130% XP  (challenging — récompense le risque)
Écart  +11 à +20 → 80% XP  (limite, mais possible)
Écart  > +20 →   10% XP    + risque d'échec critique
```

### Exemples concrets

| Situation | Effet |
|---|---|
| Forgeron Maîtrise 4 forge des dagues niv 5 | **0% Maîtrise_Forge** — sortie en série mais aucun apprentissage |
| Forgeron Maîtrise 4 forge des épées Magistrales (niv 65–70) | **130% gain** — challenging, qualité variable, grosse progression |
| Combattant niv 30 tue des sangliers niv 5 | **0% XP arme et Vigueur** — 100 sangliers : rien |
| Combattant niv 30 affronte un boss niv 38 | **130% XP** — combat dur mais juteux |
| Combattant niv 30 essaie un boss niv 60 | **10%** + risque de mort très élevé |

### Diminishing returns (anti-farm)

Chaque action répétée perd 20% d'XP sur la même cible/recette dans la même journée :

```
Forger 5 épées identiques :  100% / 80% / 60% / 40% / 20% → puis 10% asymptotique
Tuer 5 fois le même boss spawné : idem
Reset à 100% chaque jour réel (aligné cycle [[Labeur]])
```

---

## Sources d'XP par couche

| Source d'action | XP Stats brutes | XP Maîtrise | Accord |
|---|---|---|---|
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

## Items — 6 tiers qualitatifs

| Niveau d'item | Tier | Couleur UI | Source typique |
|---|---|---|---|
| 1–20 | **Commun** | Gris | Loot bas, marchands PNJ, novices |
| 21–40 | **Façonné** | Blanc | Initiés, drops zones moyennes |
| 41–60 | **Œuvré** | Vert | Adeptes, drops zones avancées |
| 61–80 | **Magistral** | Bleu | Experts, drops zones difficiles |
| 81–100 | **Légendaire** | Violet | Maîtres, drops boss mondiaux |
| 101+ | **Mythique** 🔒 | Orange | Conditions cachées extrêmes, artefacts cosmiques |

### Différence concrète entre tiers

| Élément | Commun | Façonné | Œuvré | Magistral | Légendaire | Mythique |
|---|---|---|---|---|---|---|
| Stats numériques | 1× | 1.5× | 2× | 3× | 4.5× | 6×+ |
| Slot d'enchantement | Non | Non | Optionnel | 1 | 2 | 3+ |
| Propriété spéciale | Non | Non | Non | 1 | 2–3 | 3+ et unique |
| Signature du créateur | Non | Optionnelle | Oui | Oui | Oui (visible) | Oui (légende) |
| Reproduction | Triviale | Standard | Difficile | Rare | Quasi-impossible | Impossible (1 seul exemplaire dans le monde) |

### Légende au-delà du tier

Une œuvre devient légende non par ses stats mais par :
- Le nom de son créateur (signature visible, prestige social)
- La circonstance de création (forgée pendant un événement mondial, l'arrachée d'un Souffle, etc.)
- First discovery (premier exemplaire d'une recette nouvelle)
- Histoire d'usage (porté lors d'une bataille célèbre, transmis entre joueurs notables)

Voir [[Inventory Items]] pour le format runtime, [[Économie]] pour le rôle économique.

---

## Quêtes — pondération par ère

Génération IA biaisée par l'**ère active** ([[Les Ères]]) et l'**Accord** du joueur :

| Ère | Types de quêtes pondérées |
|---|---|
| **Ombre Longue** (Noctis) | Escorter à travers la nuit, retrouver des disparus, purifier un site corrompu |
| **Échos Brisés** (Tempora) | Investiguer des anomalies, fixer un événement passé |
| **Rêve Lumineux** (Eldoria) | Soigner une communauté, retrouver un artefact lumineux |
| **Verdoiement** (Spiritus) | Récolter des plantes rares, apaiser une faune mutée |
| **Vents Bouleversants** (Aerion) | Escorter caravanes pendant tempêtes, suivre migrations |
| **Brume Mortelle** (Noctis+Aquor) | Construire des défenses, explorer dans la brume |

Voir [[Quest System]] pour le pipeline IA et [[HW Quest Component]] pour le runtime.

---

## Cap d'évolution — durées indicatives

| Étape | Joueur engagé | Joueur casual |
|---|---|---|
| Stats brutes domaine principal à 60 | 1–2 mois | 3–4 mois |
| Stats brutes domaine principal à 80 | 3–4 mois | 6–8 mois |
| Maîtrise palier 4 (Expert) | 4–6 mois | 8–12 mois |
| Maîtrise palier 5 (Maître) 🔒 | 8–12 mois (avec condition cachée) | 12–18+ mois |
| Première Ère Concordée (100% Accord) | 1ère ère possible | 2–3 ères pour la première |
| 3 Ères Concordées | ~12 mois | ~20+ mois |

---

## Dépendances système

| Composant | Rôle dans la progression |
|---|---|
| [[HW Progression Component]] | Moteur d'unlocks cachés et d'Héritage (couches 4+5) |
| [[Combat Attribute Set]] | Source des stats brutes (couche 1) |
| [[Weapon Mastery]] | Composant Maîtrises (couche 2) |
| [[Accord System]] | Spec de la couche 3 (Accord) |
| [[Souffle System]] | Compression cyclique stats + dérive Accord |
| [[HW Quest Component]] | Source de progression via complétion de quêtes |
| [[Quest System]] | Pondération par ère et Accord |
| [[Inventory Persistence]] | Sérialisation Héritage côté OWS |
| [[Global Data Replication]] | Persistance Identité inter-Parties |

---

## Points de calibrage à playtester

- [ ] Échelle 0–150 stats — répartition des plafonds mou/dur ressentie comme juste
- [ ] Paliers Maîtrise (% peuplement estimé : 100 / 60 / 30 / 10 / <2) — courbe trop dure / juste / trop molle ?
- [ ] XP scaling fenêtre (−4/+5 = 100%, +6/+10 = 130%) — incite-t-elle vraiment à explorer ?
- [ ] Diminishing returns −20%/répétition, reset journalier — encourage-t-il la variété sans frustrer ?
- [ ] Tiers d'items (Commun → Mythique, multiplicateurs 1× → 6×+) — écart entre tiers perçu comme significatif ?
- [ ] Cap d'évolution (3 ères concordées en ~12 mois engagé / ~20+ casual) — sentiment de progression réaliste ?

---

## Décisions actées (techniques)

- ✅ **5 couches de progression** : Stats brutes / Maîtrises / Accord / Héritage / Identité
- ✅ **L'Accord remplace le niveau global** (pas de variable `PlayerLevel`)
- ✅ **Stats par usage uniquement** (pas d'attribution)
- ✅ **Système de Focus** : 1–3 stats ×2 selon palier d'Accord
- ✅ **5 paliers de Maîtrise** : Novice / Initié / Adepte / Expert / Maître (palier 5 verrouillé)
- ✅ **XP scaling fenêtre** : −4 à +5 = 100%, +6 à +10 = 130%, etc.
- ✅ **Diminishing returns** : −20% par répétition, reset journalier
- ✅ **6 tiers d'items** (Commun → Mythique) alignés sur les Maîtrises
- ✅ **Légende au-delà du tier** : créateur + circonstance + first discovery
- ✅ **Plafond mou 100, dur 150** sur stats brutes
- ✅ **Quêtes IA biaisées par l'ère**

---

*Liens narratifs : [[Progression]] | [[Personnage]] | [[Armes et Maîtrise]] | [[L'Accord]] | [[Le Souffle]] | [[Labeur]] | [[Les Ères]]*
*Liens techniques : [[HW Progression Component]] | [[Accord System]] | [[Souffle System]] | [[Combat Attribute Set]] | [[Weapon Mastery]] | [[Quest System]] | [[Inventory Persistence]]*
