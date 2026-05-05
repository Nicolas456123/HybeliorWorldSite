---
tags: [souffle, cycle, cosmologie, mécanique-centrale, ères, polyphonie]
status: drafted
last_review: 2026-05-02
needs_review_for: [chiffres-compression-playtest]
type: mechanic
---

# 🌬️ Le Souffle — Le rythme cosmique d'Hybelior

> [!important] Concept central
> *« Le monde respire. À intervalles que les mortels ne maîtrisent pas, le dialogue cosmique change de mouvement. Les voix Éternelles se redistribuent ; certaines deviennent éloquentes, d'autres se font silencieuses. À chaque Souffle, le grand puissant se sent un peu moins puissant, et le novice un peu moins novice. »*
>
> *— attribué à Maître Veyran d'Astravia, « Les Cycles du Monde »*

Le **Souffle** est le mouvement émergent de la [[Univers#La Polyphonie cosmique|Polyphonie cosmique]] — le moment où la **configuration des voix Éternelles** se reconfigure et fait basculer une Ère vers la suivante. Côté gameplay, c'est l'**identité** d'Hybelior : il rééquilibre les écarts de puissance, fait avancer le monde, et rythme les communautés.

Sans Souffle, le monde tomberait dans le piège classique des MMO (power creep, vétérans inaccessibles, nouveaux décrochés). Avec Souffle, Hybelior reste **vivant et accessible** sans jamais effacer le mérite des anciens.

---

## Ce qu'un Souffle résout

| Problème classique MMO | Comment le Souffle le résout |
|------------------------|------------------------------|
| **Power creep** : les anciens écrasent tout | La compression cyclique le ramène en arrière |
| **Barrière à l'entrée** : nouveau joueur abandonne | Il sait qu'il rattrapera partiellement à chaque Souffle |
| **Stagnation end-game** : "j'ai tout fini" | Le cycle redonne du sens à pratiquer |
| **Wipe brutal** détruit les acquis | Les acquis (titres, savoir, cosmétiques) restent — seule la puissance se rééquilibre |
| **Lore détaché du gameplay** | C'est une mécanique **intrinsèque au monde**, pas un patch éditeur |

---

## Trois magnitudes de Souffle

> Hybelior connaît trois échelles de Souffle, qui s'imbriquent :

```
┌─────────────────────────────────────────────────────────┐
│ PETIT SOUFFLE          ─ 3 à 9 mois (gameplay)          │
│ Cycle d'ère thématique                                  │
│ Compression légère des stats, rouille temporaire        │
│ Plusieurs par Partie                                    │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ GRAND SOUFFLE          ─ 1 à 2 ans (gameplay)           │
│ Fin de Partie                                           │
│ Bouleversement majeur, redistribution totale            │
│ Reset complet (excepté héritage cosmétique)             │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ SOUFFLE CARDINAL       ─ Échelle des âges (lore)        │
│ Reconfiguration profonde de la Polyphonie               │
│ Rare, mémorable, parfois nommé par les chroniqueurs     │
│ Modification durable d'Hybelior                         │
└─────────────────────────────────────────────────────────┘
```

> [!note] Les magnitudes vues du joueur
> - Le **Petit Souffle** est l'événement régulier — celui qui structure la vie du joueur
> - Le **Grand Souffle** est une transition majeure entre groupes d'Ères thématiques (compression renforcée, mais **pas de fin de Partie**)
> - Le **Cardinal** est l'événement historique mythique — bouleversement civilisationnel rarissime

---

## Le Petit Souffle — détaillé

### Mécanique de compression

À chaque Petit Souffle, les **stats brutes** des joueurs sont partiellement compressées au-dessus d'un seuil. C'est ce qui resserre les écarts.

> [!important] Formule retenue : **compression linéaire au-dessus d'un seuil**

```
Seuil = 50 (niveau "humain accompli")

Pour chaque stat brute :
  Si valeur ≤ 50 → inchangée
  Si valeur > 50 → on ramène 30% de l'excès vers 50

Exemples :
  Stat 100 → 50 + (50 × 0.7) = 85
  Stat 80  → 50 + (30 × 0.7) = 71
  Stat 60  → 50 + (10 × 0.7) = 57
  Stat 50  → 50 (inchangée)
  Stat 30  → 30 (inchangée)
```

### Ce qui est touché vs préservé

| Élément | Touché par le Souffle ? | Détail |
|---------|------------------------|--------|
| **Stats brutes** ([[Personnage]]) | ✅ **Compression** | Tout point au-dessus de 50 partiellement ramené |
| **Maîtrises** ([[Armes et Maîtrise]]) | ⚠️ **Rouille temporaire** | Paliers intacts. 1ère semaine post-Souffle : performance −15%, dissipée par usage |
| **Items équipés** | ⚠️ **Légère perte temporaire** | Hauts tiers (Magistral, Légendaire) perdent ~10% stats pendant 2 semaines |
| **L'Accord** ([[L'Accord]]) | 🔄 **Dérive avec inertie** | Pas de reset brutal — l'Accord glisse progressivement (~2-4 sem) vers une nouvelle valeur cible calculée sur la similarité Ère(N) ↔ Ère(N+1). Si Ères proches : Accord largement préservé. Si très différentes : redescente progressive. Voir [[L'Accord]] §Transition d'Ère. |
| **Niveau de contenu** (zones, ennemis) | ❌ Non | Le monde reste à son niveau |
| **Cosmétiques, titres, Renom** | ❌ Non | Héritage immatériel sacré |
| **Recettes connues** | ❌ Non | Le savoir reste |
| **Éclats, items en banque, montures** | ❌ Non | Aucune perte de richesse |
| **Karma, factions, guilde** | ❌ Non | La société reste cohérente |
| **Lore découvert, conditions cachées trouvées** | ❌ Non | Découvertes acquises |

> [!tip] Lecture
> **Le Souffle compresse les écarts, jamais les acquis.** Tout ce qui est *connaissance, identité, achievement* est sacré. Seul ce qui est *capacité brute en cours* fluctue.

---

## Cadence — variable et imprévisible

> [!warning] Pas de date prévisible
> Aucun calendrier ne fixe les Souffles. Ils surviennent selon des **rythmes cosmiques** que le monde tente de prédire (voir [[Prédiction]]).

| Élément | Valeur |
|---------|--------|
| **Durée typique d'une ère** | 3 à 6 mois (parfois jusqu'à 9) |
| **Durée minimum** | 6 semaines (sécurité système) |
| **Durée maximum** | 9 mois |
| **Tolérance de glissement** | ±20% selon l'état du monde et les actions des joueurs |

### Facteurs qui modulent la durée

> [!important] Le monde réagit aux joueurs
> La durée d'une ère est **émergente**, pas scriptée :

- Si un boss mondial lié à l'ère est vaincu → l'ère s'accélère vers sa fin
- Si une condition cachée 🔒 est remplie → un Souffle anticipé peut se déclencher
- Si l'ère est calme (peu d'événements joués) → elle s'étire
- Les **rituels coordonnés** des grandes religions ou des Concordants accumulés peuvent peser à la marge sur la transition
- Les **Cardinaux passés** continuent d'influencer la tonalité des ères suivantes

→ **Ce ne sont pas les designers qui décident à la seconde près** — c'est le monde qui réagit. Cela renforce la sensation d'**intrinsèque cosmique**.

---

## Phases d'un Petit Souffle

```
[ÈRE EN COURS — phase stable]
   ↓
[Signes faibles apparaissent — environ 30-50% de la durée écoulée]
   - PNJ font des rêves étranges
   - Créatures changent de comportement subtilement
   - Constellations se troublent (l'Astronome remarque)
   - Animaux migrent à contre-saison (le Chasseur remarque)
   ↓
[Signes forts apparaissent — 1 à 2 semaines avant le Souffle]
   - Événement mondial annonciateur (parfois unique à chaque ère)
   - Phénomènes visibles dans le ciel
   - Oracles prédisent un changement imminent
   - Bourse des Augures s'agite
   ↓
[LE SOUFFLE]
   - Événement mondial visuel et global
   - Tous les joueurs voient le ciel se "fendre" pendant quelques minutes
   - Effet visuel cosmique sur tous les clients
   - Compression des stats appliquée
   - Variants visuels nouveaux activés
   - Nouvelle ère démarre
   ↓
[NOUVELLE ÈRE]
   - Atmosphère du monde change (ciel, lumière, brume…)
   - Variants de créatures actifs
   - Ressources / matériaux d'ère débloqués
   - Quêtes ère-thématiques générées
   - Bourse des Augures verse les gains
```

> [!tip] Effet de seuil
> Le moment du Souffle est un **événement social** — beaucoup de joueurs se connectent pour le vivre ensemble. Les guildes organisent des veillées. Les revenants reviennent.

---

## Le Grand Souffle — transition d'Ères majeure

> [!important] Pas un reset, pas un wipe
> Comme tous les Souffles, le Grand Souffle **compresse** (au-dessus du seuil 50) — il ne réinitialise rien. La **Partie du joueur ne s'arrête pas** (voir [[La Partie]]). Ce qui distingue le Grand Souffle du Petit, c'est l'**ampleur** du basculement narratif et cosmique.

### Spécificités

Le Grand Souffle survient à la transition entre **groupes d'Ères thématiques** (typiquement tous les 1-2 ans gameplay). Il provoque un bouleversement plus marqué que les Petits Souffles inter-Ères, mais reste dans la mécanique générale du Souffle.

| Élément | Effet du Grand Souffle |
|---------|------------------------|
| **Stats brutes** | Compression renforcée (formule canonique au-dessus de 50, mais ramène 50% de l'excès au lieu de 30%) |
| **Maîtrises** | Conservées intégralement ; rouille post-Souffle plus longue (2 semaines au lieu de 1) |
| **L'Accord** | Dérive renforcée — la similarité Ère(N) ↔ Ère(N+1) est typiquement plus faible au Grand Souffle, donc descente plus marquée mais toujours progressive (3-5 sem au lieu de 2-4). Voir [[L'Accord]] §Transition d'Ère. |
| **Items, Éclats, montures** | ✅ Conservés (perte temporaire ~15% sur 3 sem pour items haut tier, vs 10% sur 2 sem pour Petit Souffle) |
| **Cosmétiques, titres, *"Concordant des X Ères"*** | ✅ Conservés à vie (Héritage permanent) |
| **Renom historique, œuvres signées, monuments** | ✅ Inscrits dans les chroniques, visibles à travers les Ères suivantes |
| **Carte explorée, lore découvert, recettes connues** | ✅ Conservés |
| **Ambiance & ère active** | Bascule majeure — nouveau cycle pluri-Ères thématique |

> Voir [[La Partie]] pour le cycle continu du joueur, et [[Les Ères]] pour le détail des cycles thématiques.

### Ce que le Grand Souffle révèle

- Une grande révélation de lore marque la transition entre cycles pluri-Ères
- Des **traces permanentes** plus visibles s'inscrivent dans la géographie ([[Traces des Ères]])
- Un arc narratif transverse atteint son apex
- Les **Joueurs marquants** de cette période laissent des **monuments permanents** dans le monde

---

## Le Souffle Cardinal — l'échelle des âges

### Caractère exceptionnel

Un **Souffle Cardinal** est une reconfiguration profonde de la Polyphonie cosmique. Il survient à l'échelle des **siècles**. C'est un événement historique que les chroniqueurs nomment, datent, transmettent.

Les chroniques d'Hybelior mentionnent plusieurs Cardinaux dans la mémoire longue. Les plus récents ont laissé des **observations durables** que les théologiens, érudits et religions interprètent diversement :

- Des **Failles Temporelles** où passé et présent se chevauchent (voir [[Traces des Ères]])
- Des **Cratères du Cardinal** et des **Brèches du Néant** dans plusieurs continents
- Des **modifications observables** dans la présence ou l'éloquence de certaines voix Éternelles
- L'apparition de mouvements philosophiques marginaux qui en tirent leurs propres conclusions

> [!info] Sur les causes
> Les religions traditionnelles parlent d'un **rééquilibrage** initié par les Éternels eux-mêmes. Les érudits évoquent une **amplitude exceptionnelle** rare mais possible dans la Polyphonie. Les Déliés y voient l'expression d'une **lutte interne** entre entités. Aucune lecture ne s'est imposée comme canon.

### Conditions d'apparition

> [!warning] Très rare — peut-être jamais pendant le cycle de jeu
> Un Cardinal pourrait survenir au cours d'une Partie **uniquement si** :
> - L'arc narratif global converge vers ce climax
> - Plusieurs conditions cachées 🔒 inter-Parties sont accomplies
> - L'équipe de design le décide narrativement
>
> En pratique : ce sera un **événement annoncé à très grande échelle**, qui transformera durablement le monde présent.

### Ce qu'il pourrait modifier durablement

- Reconfiguration profonde du calendrier ([[Histoire d'Hybelior]])
- Évolution observable des présences cosmiques
- Modification ponctuelle de la géographie (très rare, équipe planifiée)
- Émergence d'un nouvel équilibre des Voies de magie ([[Le Lien]])
- Le "monde présent" se transforme — les Parties suivantes héritent du nouveau canon

---

## Les Ères — ce que chaque Souffle inaugure

> Un Souffle ne fait pas que rééquilibrer. **Il colore le monde** pour la durée de l'ère qui suit.

Une **Ère** est une saison cosmique thématique. Définie par :

1. **Force dominante** — une entité majeure (parmi les 5 Éternels et 12 Cosmiques, parfois un Céleste majeur)
2. **Force secondaire** — une autre entité, souvent en tension ou complément
3. **État du monde** — Floraison / Dégénérescence / Stagnation / Bouleversement
4. **Mood social** — Sérénité / Méfiance / Ferveur / Effroi / Curiosité
5. **Tension cosmique** — Faible / Moyenne / Haute / Critique
6. **Continent emphase** — 1-2 des 13 continents focalisés

Voir [[Les Ères]] pour le détail des archétypes et de leurs effets.

---

## Interprétations religieuses

> [!note] Le même phénomène vu différemment
> Les 9 religions d'Hybelior interprètent le Souffle de manière distincte. Aucune n'a la vérité absolue ; chacune éclaire un aspect.

| Religion | Interprétation du Souffle |
|----------|---------------------------|
| **Ordo Caelum** (Celestia) | Régulation cosmique — Celestia maintient l'équilibre depuis sa retraite |
| **Vael'Kurash** (mort, ancêtres) | Test — chaque Souffle évalue les vivants pour les ancêtres |
| **Ignis Aeternum** (feu, lumière) | Combat éternel entre lumière et obscurité — chaque Souffle un round |
| **Noctari** (ombre) | Souffle = respiration de Noctis qui grandit ; chaque Souffle le rapproche du sommet |
| **Rota Mundi** (cycles, Spiritus + Terranu) | Roue du monde — tout est cycle, rien n'est neuf |
| **Via Ventus** (vent, Aerion) | Souffle = expiration cosmique, vent du monde |
| **Lex Petra** (pierre, immuabilité) | Hérésie — la "vraie" Lex Petra rejette le Souffle ; sectes dissidentes l'acceptent |
| **Somnium Vigil** (rêves, Somnix) | Souffle = changement de rêve — Hybelior rêvée différemment |
| **Foedus Animae** (âmes, serments) | Souffle = renouvellement des serments cosmiques entre les entités |

→ Le joueur peut **choisir** son interprétation (selon sa religion ou ses préférences). Cela colore son expérience narrative.

---

## La rouille post-Souffle (Maîtrises)

> [!important] Friction d'adaptation
> Pendant la **première semaine** après un Souffle, les Maîtrises subissent une **rouille temporaire** : performance réduite de 15%, qui s'estompe par usage.

| Activité de premier usage | Effet de la rouille |
|--------------------------|---------------------|
| Premier combat avec une arme maîtrisée | Dégâts −15%, vitesse −10% |
| Premier craft avec un métier maîtrisé | Qualité réduite, plus de chances d'échec mineur |
| Première utilisation de Voie (magie) | Coût Mana +20%, durée d'incantation +15% |

> [!tip] Effet narratif
> La rouille reflète le sentiment vrai : *"Le monde a changé, mes outils familiers semblent étrangers pour quelques jours."* Cela force les joueurs à se **réacclimater**, ce qui rend la première semaine d'une nouvelle ère intense et mémorable.

Dissipation : la rouille s'estompe **automatiquement par usage** (entièrement effacée après ~10 utilisations significatives par maîtrise).

---

## Effets sociaux d'un Souffle

| Avant le Souffle | Pendant le Souffle | Après le Souffle |
|------------------|--------------------|--------------------|
| Course au sommet, tension | Pause, anticipation, événement | Réajustement, nouvelle vague de progression |
| Vétérans dominent les classements | Brève période d'incertitude | Newcomers et "joueurs revenants" relancés |
| Économie inflationniste | Stabilisation forcée | Demande renouvelée pour items milieu de gamme |
| Stocks d'ère accumulés | Liquidation ou stockage stratégique | Items d'ère devenue précédente : reliques précieuses |

> [!tip] Calendrier communautaire
> Le Souffle devient un **moment-clé** :
> - Les guildes organisent des veillées et des "courses au 100% Accord"
> - Les revenants reviennent à ce moment
> - La Bourse des Augures s'anime fortement
> - Les artisans préparent des stocks pour la "vague post-Souffle"

---

## Implications sur les autres systèmes

| Système | Comment le Souffle l'affecte |
|---------|------------------------------|
| **[[Personnage]]** | Compression stats brutes |
| **[[Armes et Maîtrise]]** | Rouille temporaire 1 semaine |
| **[[Le Lien]]** | Mana max compressé. Le Lien doit se "retisser". Voies dominantes amplifiées, opposées atténuées |
| **[[Progression]]** | L'Accord dérive avec inertie selon similarité d'Ères (voir [[L'Accord]] §Transition d'Ère) |
| **[[Économie]]** | Items d'ère précédente deviennent reliques, demande change |
| **[[Guildes]]** | Sièges peuvent être bouleversés ; territoires reconfigurés |
| **[[Cosmologie]]** | États des entités cosmiques évoluent ; Titres Célestes peuvent être contestés |

---

## Effet sur les Liés (magiciens)

> [!warning] Le Lien doit se retisser
> Les pratiquants de magie (Liés à une Voie unique — voir [[Le Lien]]) sont **particulièrement affectés** :

- Mana max compressé comme les autres stats
- Première semaine : leur Voie est **amplifiée ou diminuée** selon l'ère
- Si la Voie est **dominante de l'ère** : +25% efficacité (semaine 1) puis +10% le reste
- Si la Voie est **opposée à la dominante** : −20% efficacité tout au long de l'ère
- Si la Voie est neutre : pas de modificateur

→ Les Liés vivent les ères de manière **plus intense** que les autres joueurs. Pour eux, chaque Souffle est une renaissance ou une épreuve.

---

## Conditions cachées 🔒 liées aux Souffles

> Récompenses pour ceux qui interagissent profondément avec le mécanisme :

- **Prédire correctement 3 Souffles successifs** → titre "Prophète" (rare)
- **Atteindre 100% d'Accord pendant l'ère** → titre "Concordant" + accès événement de fin d'ère
- **Maîtriser un Souffle** (Voie de Tempora niv 5 + 3 ères vécues) → résistance partielle à la compression (−10% au lieu de −30%)
- **Vivre 5 ères différentes** → titre "Voyageur des Souffles"
- **Refuser un Souffle** (path mythique) → s'engager dans la voie des **Déliés** (secte philosophique antagoniste)

---

## Production technique

> Voir [[Architecture Data-Driven]] et [[Production]] pour les détails techniques.

### Résumé du flux

```
1. Le serveur déclenche un Souffle (timing modulé par état du monde)
2. Une nouvelle EraConfig est générée (force dominante, secondaire, etc.)
3. Le serveur diffuse la config aux clients (~quelques KB JSON)
4. Chaque client applique localement :
   - Sky / lumière (UE5 presets)
   - Variants visuels actifs (shaders, particules)
   - Spawn tables modifiées
   - Audio mix
   - Foliage density
5. Stats brutes des joueurs compressées côté serveur
6. Maîtrises rouillent (état temporaire)
7. L'Accord_cible recalculé via similarité Ère(N)↔Ère(N+1) ; dérive progressive amorcée
8. Quêtes IA biaisées vers le thème de l'ère
```

### Coût production

- **Mécanique du Souffle** : 1 fois codé, fonctionne pour toutes les ères
- **Compression stats** : 1 fonction
- **Effet visuel global du Souffle** : 1 cinématique courte (~5 sec) — créée une fois, réutilisée
- **Variants par ère** : déjà pris en charge par le système de générateurs

→ Le Souffle est **bon marché à produire** une fois l'architecture en place.

---

## Synthèse — Pourquoi le Souffle est le cœur d'Hybelior

Le Souffle :
- Donne du **rythme** au monde sans imposer un calendrier rigide
- Maintient l'**équité** entre joueurs sans annuler le mérite
- Crée un **arc narratif vivant** où le cosmos et les joueurs interagissent
- Permet à Hybelior d'**évoluer** sans casser la cohérence
- Donne du sens à la **prédiction**, à l'**archéologie**, à la **mémoire**
- Ancre tout le gameplay dans la **cosmologie** déjà riche du monde

> [!important] Promesse au joueur
> **"Tu n'es pas grand parce que tu es ancien dans le monde. Tu es grand parce que tu t'accordes au monde tel qu'il EST. Et le monde respire."**

---

## Décisions actées

- ✅ **Compression linéaire** au-dessus du seuil 50, ramène 30% de l'excès vers 50
- ✅ **Cadence variable** : 3-9 mois, min 6 semaines, max 9 mois, ±20%
- ✅ **Pas de date prévisible** mais **signes** annoncent (faibles puis forts)
- ✅ **Maîtrises rouillent** 1 semaine post-Souffle (−15%, dissipation par usage)
- ✅ **Items haut tier** légère perte stats temporaire (10% sur 2 semaines)
- ✅ **Interprétations multiples** selon les 9 religions
- ✅ **Réactivité aux joueurs** : durée modulée par actions
- ✅ **3 magnitudes** : Petit (cycle d'Ère, 3-9 mois), Grand (transition pluri-Ères, ~1-2 ans, compression renforcée), Cardinal (reconfiguration profonde, échelle des âges)
- ✅ **Cardinaux passés** documentés dans les chroniques (voir [[Histoire d'Hybelior]])

---

*Liens : [[L'Accord]] | [[Les Ères]] | [[Architecture Data-Driven]] | [[Histoire d'Hybelior]] | [[Prédiction]] | [[Traces des Ères]] | [[Production]] | [[La Partie]] | [[Cosmologie]]*
