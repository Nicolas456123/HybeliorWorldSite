---
tags: [implementation, mastery, weapon, progression, balance, signature]
status: drafted
last_review: 2026-05-07
needs_review_for: [chiffres-xp-playtest, courbes-par-arme, conditions-cachées-maître, paliers-décroissance]
type: implementation
canonical_concept: "[[Armes et Maîtrise]]"
---

# Mastery System — Implémentation

> Page d'implémentation technique du concept narratif **[[Armes et Maîtrise]]**.
> Cette page contient les **chiffres, formules, specs Unreal et règles de balance** du système de progression par usage des armes (couche 2 — Maîtrises de combat).
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Armes et Maîtrise]].
>
> Cette page **n'est pas** la spec du composant runtime. Pour le composant Unreal qui pilote l'XP et les bonus en C++/BP, voir [[Weapon Mastery]] (cette page-ci définit *ce qui doit être calculé*, l'autre définit *comment c'est branché côté code*).

---

## Architecture générale

| Paramètre | Valeur |
|---|---|
| Paliers de Maîtrise par arme | 5 (Novice / Initié / Adepte / Expert / Maître) |
| Types d'armes canoniques | 13 (voir table ci-dessous) |
| Source de progression | Usage en combat (hits confirmés, kills, parades, esquives parfaites) |
| Décroissance | Active après 14 jours sans usage significatif |
| Plancher de décroissance | XP de seuil du palier actuel (jamais en dessous) |
| Rouille post-Souffle | Pénalité temporaire de 1 sem (Petit) / 2 sem (Grand) |
| Palier 5 (Maître) | **Condition cachée** 🔒 — non visible dans l'UI tant que non déclenchée |

---

## Les 5 paliers — table canonique

| Palier | Nom | XP requise (cumul, base épée 1H) | % joueurs estimé | Effets cumulés (combat) |
|---|---|---|---|---|
| 1 | **Novice** | 0 | 100% | Moveset de base, aucun bonus |
| 2 | **Initié** | 1 500 | ~60% | +5% dégâts, +5% vitesse d'attaque, combo 3 coups, 1 compétence active |
| 3 | **Adepte** | 6 000 | ~30% | +10% dégâts, +5% vitesse, +5% crit, finisseur de combo, passif de base |
| 4 | **Expert** | 18 000 | ~10% | +15% dégâts, +10% vitesse, +5% crit, attaque spéciale, combo 4 coups, source d'Accord +10% |
| 5 | **Maître** 🔒 | 45 000 + condition cachée | <2% | +20% dégâts, +10% vitesse, +5% crit, **technique signature nommée**, skin d'arme, quête secrète, source d'Accord +10% (cumul) |

**% par palier** : pourcentages estimés du peuplement engagé d'une Partie. Le palier 5 reste rare par design — c'est un statut de reconnaissance sociale, pas un palier "à faire".

> **Ne pas confondre** avec les paliers `MasteryLevel int32` du composant runtime [[Weapon Mastery]]. La transposition `int32 → palier nommé` est documentée dans [[Migration Accord]] §"Phase E".

---

## Formule de gain d'XP par usage

### Source de base

```
Hit confirmé sur cible vivante  : +10 XP
Kill (coup de grâce)            : +25 XP
Parade parfaite                 : +15 XP
Esquive parfaite (i-frame)      : +5 XP
Coup critique                   : ×1.5 sur le gain
```

### Modulation par écart de niveau (XP scaling fenêtre)

Reprise du barème canonique de [[Progression System]] §"XP Scaling" :

```
Écart = NiveauCible − PalierJoueur×20

Écart ≤ −10        →   0% XP    (trivial)
Écart −9 à −5      →  25% XP
Écart −4 à +5      → 100% XP    (zone optimale)
Écart +6 à +10     → 130% XP    (challenging)
Écart +11 à +20    →  80% XP
Écart > +20        →  10% XP
```

### Diminishing returns (anti-farm)

```
Même type d'ennemi, même journée :
  hit 1-20      : 100% XP
  hit 21-50     :  60% XP
  hit 51-100    :  30% XP
  hit > 100     :  10% XP (asymptote)

Reset chaque jour réel (aligné cycle [[Labeur]])
```

### Multiplicateurs additifs

| Source | Multiplicateur |
|---|---|
| Mémoire (stat brute) ≥ 50 | ×(1 + Mémoire × 0.005) |
| Stat de Focus correspondante (Vigueur/Vivacité) | ×1.25 sur la maîtrise indirecte |
| Voie dominante de l'Ère active si arme magique (Sceptre) | ×1.10 |
| Première Maîtrise du joueur dans la Partie | ×1.20 (boost découverte, max 1 fois) |
| Maîtrise déjà acquise dans le passé (héritage) | ×1.50 (rampe accélérée jusqu'à l'ancien palier) |

---

## Courbes d'XP par type d'arme

Les armes ne progressent pas toutes au même rythme. Une dague donne plus de hits par combat (rapide, multi-cibles) qu'une hache 2 mains (lent, mono-cible). On compense en ajustant le coût par palier.

| Arme | Multiplicateur de courbe | XP Initié | XP Adepte | XP Expert | XP Maître |
|---|---|---|---|---|---|
| ⚔️ Épée 1 main | ×1.00 (base) | 1 500 | 6 000 | 18 000 | 45 000 |
| 🗡️ Épée 2 mains | ×1.10 | 1 650 | 6 600 | 19 800 | 49 500 |
| 🔨 Marteau 1 main | ×1.15 | 1 725 | 6 900 | 20 700 | 51 750 |
| ⚒️ Marteau 2 mains | ×1.25 | 1 875 | 7 500 | 22 500 | 56 250 |
| 🪓 Hache 1 main | ×1.10 | 1 650 | 6 600 | 19 800 | 49 500 |
| 🪓 Hache 2 mains | ×1.20 | 1 800 | 7 200 | 21 600 | 54 000 |
| 🏹 Lance | ×1.05 | 1 575 | 6 300 | 18 900 | 47 250 |
| 🤺 Rapière | ×0.90 | 1 350 | 5 400 | 16 200 | 40 500 |
| 🏹 Arc | ×1.00 | 1 500 | 6 000 | 18 000 | 45 000 |
| ✨ Sceptre | ×1.15 | 1 725 | 6 900 | 20 700 | 51 750 |
| 🗡️ Dague | ×0.85 | 1 275 | 5 100 | 15 300 | 38 250 |
| 🛡️ Bouclier | ×1.00 | 1 500 | 6 000 | 18 000 | 45 000 |
| 🛡️ Grand bouclier | ×1.10 | 1 650 | 6 600 | 19 800 | 49 500 |

**Rappel** : ces seuils sont l'XP **cumulée** depuis Novice. Le composant runtime stocke l'XP totale, pas l'XP par palier.

---

## Décroissance — formule et durée

### Déclenchement

| Paramètre | Valeur |
|---|---|
| Délai avant déclenchement | **14 jours réels** sans usage significatif de l'arme |
| "Usage significatif" | ≥ 50 hits confirmés OU ≥ 1 kill avec l'arme dans la journée |
| Cycle d'évaluation | Toutes les 24h (job serveur quotidien) |

### Formule de perte

```
Pour chaque jour réel sans usage significatif après J+14 :
  XP_perdue = max(0, (XP_actuelle − XP_seuil_palier) × 0.02)
            ≈ 2% par jour de l'XP "au-dessus du palier"
```

**Plancher de décroissance** : la perte s'arrête au seuil du palier acquis. On ne peut **jamais redescendre de palier par décroissance seule** — la décroissance grignote l'XP intra-palier mais ne révoque pas un palier obtenu.

### Exemples concrets

| Situation | Effet après 1 mois sans usage |
|---|---|
| Adepte avec 12 000 XP (seuil 6 000) | tombe à ~9 200 XP (toujours Adepte) |
| Expert avec 30 000 XP (seuil 18 000) | tombe à ~22 800 XP (toujours Expert) |
| Maître avec 60 000 XP (seuil 45 000) | tombe à ~50 800 XP (toujours Maître) |

> **Important** : le titre "Maître de l'épée" est un **trophée d'Héritage** (couche 4, voir [[Progression System]]). Il ne se perd jamais, même si l'XP redescend au seuil exact du palier 5. Seuls les **bonus mécaniques** régressent — la **reconnaissance sociale** reste.

---

## Rouille post-Souffle

À chaque déclenchement de [[Souffle System|Souffle]] (Petit / Grand), la maîtrise courante subit une rouille temporaire :

| Magnitude | Durée | Pénalités |
|---|---|---|
| **Petit Souffle** | 1 semaine réelle | −15% dégâts, −10% vitesse arme, −1 palier de qualité de craft (si métier), +20% coût Mana, +15% durée d'incantation |
| **Grand Souffle** | 2 semaines réelles | mêmes effets, durée doublée |
| **Souffle Cardinal** | Cas par cas | Événement scripté, voir [[Souffle System]] |

**Dissipation** :
- Automatique par usage.
- Effacée totalement après ~10 utilisations significatives par maîtrise (≈ 10 hits confirmés ou équivalents).
- Implémentation : flag `bRusty: bool` + `RustAmount: float` (0..0.15) sur `FHWWeaponMasteryData`. À chaque hit confirmé, `RustAmount -= 0.015`. Voir [[Weapon Mastery]] §"Rouille post-Souffle".

> **Distinction philosophique** : la rouille n'est **pas** une décroissance. Elle est une friction d'adaptation à la nouvelle Ère. Elle ne grignote jamais l'XP elle-même ; elle module seulement les bonus appliqués pendant sa durée.

---

## Conditions cachées 🔒 — palier 5 (Maître)

Le passage Expert → Maître **exige une condition cachée** en plus du seuil d'XP. Tant qu'elle n'est pas déclenchée, le joueur reste bloqué à 99% du palier Expert (asymptote douce).

### Templates canoniques (plusieurs par arme)

| Famille | Exemples de conditions cachées |
|---|---|
| **Mortalité** | Tuer N ennemis d'un type spécifique avec cette seule arme (jamais autre) |
| **Précision** | Réussir N parades parfaites consécutives |
| **Pureté** | Vaincre un boss mondial en n'utilisant que cette arme et sans subir de dégâts |
| **Contexte** | Utiliser l'arme sous des conditions météo/ères spécifiques (combat sous tempête, sous une éclipse, etc.) |
| **Inattendu** | Accomplir une action non-combat avec l'arme (sculpter avec une dague, briser un mur avec un marteau dans une quête narrative) |
| **Social** | Être reconnu Maître par un PNJ Maître existant (qui doit te défier ou te recommander) |
| **Signature** | Forger ton arme toi-même puis atteindre l'Expert avec cette arme précise |

### Tableau exemple par arme (extrait — calibrage v1)

| Arme | Condition cachée canonique (v1) |
|---|---|
| ⚔️ Épée 1 main | Vaincre 3 boss mondiaux à l'épée 1H seule, dont un sans avoir reçu de dégâts |
| 🗡️ Épée 2 mains | 100 finishers consécutifs sans rater de combo |
| 🔨 Marteau 1 main | Briser 50 gardes ennemies (stagger break) en une Ère |
| ⚒️ Marteau 2 mains | Tuer un boss mondial en un seul coup chargé (one-shot) |
| 🪓 Hache 1 main | Cumuler 10 000 dmg de saignement en une Ère |
| 🪓 Hache 2 mains | Tuer 500 ennemis Mythiques (créatures épiques) en mode Berserk |
| 🏹 Lance | 200 kills à distance (>15m) avec lance, sans approche |
| 🤺 Rapière | 50 duels gagnés en PvP avec uniquement la rapière |
| 🏹 Arc | Headshot 1000 cumulés en une Ère |
| ✨ Sceptre | Lancer 1000 sorts amplifiés par sceptre + 500 hits physiques |
| 🗡️ Dague | Réussir 30 backstabs critiques sans être détecté |
| 🛡️ Bouclier | 200 parades parfaites consécutives sans rater |
| 🛡️ Grand bouclier | Tenir une position seul contre un assaut 5+ ennemis pendant 2 min |

> Les conditions exactes seront ajustées en playtest. L'esprit : chaque condition doit être **racontable** — un Maître a une histoire, pas une cocheuse de checklist.

---

## Techniques signature — palier 5

Au passage Maître, le joueur débloque **une technique signature** : un mouvement unique nommé, avec des FX dédiés et un slot d'attaque dédié. Le nom est généré à la passation (template + variable joueur) et reste à vie.

### Tableau de techniques signature par arme

| Arme | Nom canonique du template | Effet mécanique |
|---|---|---|
| ⚔️ Épée 1 main | "Trait de [Nom]" | Frappe instantanée, 250% dégâts arme, ignore 30% armure, cd 90s |
| 🗡️ Épée 2 mains | "Coupe du [Nom]" | Frappe en arc 8m, 180% dégâts en zone, étourdit 2s, cd 120s |
| 🔨 Marteau 1 main | "Chant de [Nom]" | Coup résonnant, 150% dégâts + stagger garanti même Boss, cd 60s |
| ⚒️ Marteau 2 mains | "Marteau de [Nom]" | Saut + impact zone 10m, 300% dégâts + chute, cd 180s |
| 🪓 Hache 1 main | "Morsure du [Nom]" | Saignement infligé +400% (dot 30s), cd 90s |
| 🪓 Hache 2 mains | "Fureur de [Nom]" | Mode berserk 15s : +50% dégâts, ignore 20% armure, immunité ralentissement, cd 240s |
| 🏹 Lance | "Pointe de [Nom]" | Tir transperçant ligne 20m, 200% dégâts à toutes cibles touchées, cd 120s |
| 🤺 Rapière | "Pas de [Nom]" | Triple frappe rapide, chacune +50% crit, cd 90s |
| 🏹 Arc | "Flèche de [Nom]" | Tir guidé, 250% dégâts crit garanti, ignore couvert, cd 120s |
| ✨ Sceptre | "Sceau de [Nom]" | Amplifie prochain sort ×2.5, sans surcoût Mana, cd 180s |
| 🗡️ Dague | "Souffle de [Nom]" | Frappe invisible 100% crit, +300% dégâts, désengage automatique, cd 90s |
| 🛡️ Bouclier | "Garde de [Nom]" | 5 sec d'invulnérabilité absolue + reflète 50% dégâts subis, cd 180s |
| 🛡️ Grand bouclier | "Mur de [Nom]" | Pose tour défensive 6m, abrite alliés, 1500 PV, 30s, cd 240s |

**[Nom]** = nom du joueur ou pseudonyme choisi à la passation Maître (modifiable une seule fois par quête narrative).

**Diffusion sociale** : le nom de la technique est **public** — apparaît dans les logs de combat des autres joueurs ("X subit Souffle d'Aldric"), inscrit sur les tableaux des halls de guilde, transmis par les bardes (voir [[Reconnaissance]]).

---

## Tableaux de balance par arme

### Stats de base (par hit, équipement Commun, palier Novice)

| Arme | Dégâts base | Vitesse atk | % crit | Stagger | Portée |
|---|---|---|---|---|---|
| ⚔️ Épée 1 main | 50 | 1.0/s | 8% | medium | 2m |
| 🗡️ Épée 2 mains | 90 | 0.6/s | 6% | high | 2.5m |
| 🔨 Marteau 1 main | 60 | 0.8/s | 4% | high | 2m |
| ⚒️ Marteau 2 mains | 110 | 0.5/s | 3% | very high | 2.5m |
| 🪓 Hache 1 main | 55 | 0.9/s | 8% | medium | 2m |
| 🪓 Hache 2 mains | 100 | 0.55/s | 7% | high | 2.5m |
| 🏹 Lance | 65 | 0.85/s | 7% | medium | 4m |
| 🤺 Rapière | 35 | 1.5/s | 15% | low | 2m |
| 🏹 Arc | 55 (par flèche) | 1.0/s tir | 12% | low | 50m |
| ✨ Sceptre | 30 (physique) | 1.0/s | 5% | low | 2m + magie |
| 🗡️ Dague | 25 | 1.8/s | 18% | very low | 1.5m |
| 🛡️ Bouclier | 20 (bash) | 0.7/s | 4% | medium | 1.5m |
| 🛡️ Grand bouclier | 25 (bash) | 0.5/s | 3% | high | 1.5m |

### Bonus cumulatifs par palier

| Palier | Dégâts | Vitesse | Crit | Effets supplémentaires |
|---|---|---|---|---|
| Novice | ×1.00 | ×1.00 | +0% | Moveset de base |
| Initié | ×1.05 | ×1.05 | +0% | Combo 3 coups, 1 compétence active |
| Adepte | ×1.10 | ×1.05 | +5% | Finisseur de combo, passif de base |
| Expert | ×1.15 | ×1.10 | +5% | Attaque spéciale, combo 4 coups |
| Maître | ×1.20 | ×1.10 | +5% | Technique signature, skin d'arme, quête secrète |

**Multiplicatif** avec les multiplicateurs Stats brutes (voir [[Stats System]]) et les bonus d'équipement.

---

## Dual-wield et combinaisons

| Combinaison | Bonus | Pénalités | Notes |
|---|---|---|---|
| 1H + 1H (dual-wield) | Combos alternés débloqués si les **deux** armes ≥ Adepte | −10% dégâts par hit (compense la cadence) | Skill hybride à Maîtrise conjointe Maître |
| 1H + Bouclier | +30% défense bloquée, parade dédiée | Vitesse −5% | Style "tank-duelliste" |
| Arme 2H | +25% dégâts par hit, stagger renforcé | Pas de bouclier, vulnérable backstab | — |
| Lance 2H | +50% portée allonge | Pas de bouclier, lent au demi-tour | Anti-cavalerie naturelle |
| Arc 2H | Distance 50m, flèches élémentaires | Pas de mêlée efficace, lent au switch | — |

### Compétences hybrides (Maîtrise conjointe Adepte+ sur les deux armes)

| Combo | Compétence hybride | Effet |
|---|---|---|
| Dague + Rapière | "Style duelliste" | +20% crit en dual, riposte automatique sur parade |
| Épée 1H + Bouclier | "Garde de fer" | Bloc actif pendant attaque, pas de pénalité de mouvement |
| Hache 1H + Hache 1H | "Berserk fluide" | Saignements cumulés ×1.5 |
| Marteau 1H + Bouclier | "Brise-garde" | Bash ignore les parades, +20% stagger |
| Dague + Dague | "Danse des ombres" | Combo 6 coups, dernier coup +200% crit |

---

## Maîtrises hors-combat — coexistence avec ce système

Le Mastery System ici décrit couvre uniquement la **Couche 2 → Combat** (voir [[Stats System]] §"COUCHE 2 — Maîtrises contextuelles"). Les autres catégories de Maîtrises (Métiers, Magie, Exploration, Social) suivent des courbes parallèles avec leurs propres conditions :

| Catégorie | Page canonique | Spécificités |
|---|---|---|
| **Combat** (cette page) | [[Armes et Maîtrise]] | 13 armes, conditions cachées de combat |
| **Magie** | [[Le Lien]] / [[Lien System]] | 5 paliers de Voie, conditions cachées magiques (voir [[Lien System]] §"Conditions cachées 🔒") |
| **Métiers** | [[Labeur]] | 63 métiers, courbes de Maîtrise par métier |
| **Exploration** | [[Géographie]] | Pistage, Survie, Navigation, Escalade, Cartographie |
| **Social** | [[Reconnaissance]] | Marchandage, Diplomatie, Performance, Intimidation, Commandement |

Toutes partagent les **mêmes 5 paliers nommés** (Novice → Maître) et la **même rouille post-Souffle**, mais ont leurs propres formules de gain et conditions cachées.

---

## Cross-link Maîtrise et Voies — les Liés à plusieurs spécialités

Pour un joueur qui maintient à la fois une **Maîtrise d'arme** et un **Lien à une Voie** (voir [[Lien System]]) :

| Configuration | Effet sur la Maîtrise d'arme |
|---|---|
| Sceptre + Voie active | Maîtrise Sceptre gagne ×1.10 d'XP si la Voie est dominante de l'Ère |
| Athamé + Voie sombre (Noctis/Umbra/Sanguis/Vermis) | Maîtrise Athamé gagne ×1.15 d'XP |
| Arme physique + Voie incompatible | aucun bonus, aucune pénalité |
| Maître d'une Voie + Maître d'une arme | accès à technique signature **fusionnée** (palier supérieur, voir [[Lien System]] §"Magie + Armes") |

**Synergies cumulables** : un Lié-Maître peut atteindre plusieurs Maîtrises Maître. Aucun cap n'est imposé sur le nombre de Maîtrises de palier 5 — la limite est purement temporelle (durée d'investissement par arme, décroissance des autres pendant ce temps).

> **Anti-omniscience** : la décroissance rend impossible de maintenir plus de **3 à 4 Maîtrises au palier Maître simultanément** sans usage actif rotatif. C'est le principal régulateur, pas un cap dur.

---

## Sources d'XP — table de correspondance

| Action | Maîtrise gagne XP | Stats brutes gagnent XP (rappel) |
|---|---|---|
| Hit confirmé | ✅ Maîtrise de l'arme utilisée | ✅ Vigueur, Vivacité, Acuité (selon arme) |
| Kill | ✅ +25 XP | ✅ idem |
| Parade parfaite | ✅ +15 XP (arme/bouclier porteur) | ✅ Vivacité |
| Esquive parfaite | ✅ +5 XP (arme actuellement équipée) | ✅ Vivacité |
| Combo complet (4 coups) | ✅ ×1.5 sur les 4 hits | ✅ idem |
| Critique | ✅ ×1.5 sur le gain | ✅ idem |
| Backstab (dague) | ✅ ×2 | ✅ idem |
| Headshot (arc) | ✅ ×2 | ✅ Acuité ×1.5 |
| Charge longue (marteau 2H) | ✅ ×1.3 sur le hit chargé | ✅ Vigueur ×1.3 |
| Sort amplifié (sceptre) | ✅ +10 XP Sceptre | ✅ Esprit, Résonance |
| Bash bouclier | ✅ +8 XP Bouclier | ✅ Vigueur |

---

## Dépendances système

| Composant | Rôle dans le Mastery System |
|---|---|
| [[Weapon Mastery]] | Composant runtime UE5 (`UHWWeaponMasteryComponent`) — stocke XP, niveau, rouille |
| [[HW Progression Component]] | Application des unlocks de palier, conditions cachées |
| [[Combo System]] | Source XP via `NotifyHitConfirmed()` — déclenche +10 XP par hit |
| [[Movesets]] | Filtre les attaques disponibles selon `RequiredMasteryLevel` |
| [[Combat Attribute Set]] | Multiplicateurs appliqués dans le calcul de dégâts |
| [[Gameplay Tags]] | Mapping `EHWWeaponType` → `Weapon_Sword/Axe/...` |
| [[Souffle System]] | Compression cyclique + rouille post-Souffle |
| [[Stats System]] | Couche 1 (Stats brutes) × Couche 2 (Maîtrises) = efficacité réelle |
| [[Progression System]] | XP scaling fenêtre + diminishing returns + Héritage |
| [[Lien System]] | Cross-link Voies/armes pour Sceptre, Athamé, etc. |
| [[Quest System]] | Conditions cachées palier 5 (templates de quête signature) |

---

## Persistance et serveur

| Donnée | Stockage | Réinitialisation au Souffle |
|---|---|---|
| XP par arme | `FHWWeaponMasteryData::CurrentExperience` | Préservée |
| Palier atteint | `MasteryLevel int32` | Préservé |
| Rouille active | `bRusty: bool` + `RustAmount: float` | Initialisée à 0.15 au Souffle |
| Date dernier usage significatif | `LastSignificantUseTimestamp` | Préservée (sert au calcul décroissance) |
| Titre Maître (héritage) | `HWProgressionComponent` rewards | Préservé à vie |
| Nom de technique signature | `SignatureTechniqueName` (string) | Préservé à vie |

**Job décroissance** : tâche serveur quotidienne qui itère sur tous les joueurs en ligne dans les 30 derniers jours, applique `XP_perdue` selon la formule. Voir [[OWS Architecture]] pour le scheduling.

---

## Points de calibrage à playtester

- [ ] Seuils XP (1 500 / 6 000 / 18 000 / 45 000) — Initié atteint en ~2-4h, Adepte en ~10-15h, Expert en ~40-60h, Maître en ~100-150h ?
- [ ] Multiplicateurs de courbe par arme (×0.85 dague à ×1.25 marteau 2H) — équilibrage perçu correct ?
- [ ] Décroissance 14 jours sans usage / 2% par jour — friction "réaliste" ou "frustrante" ?
- [ ] Plancher de décroissance = seuil du palier — bonne sécurité psychologique ?
- [ ] Bonus cumulés palier 5 (×1.20 / +5% crit / signature) — rend-il vraiment le Maître supérieur sans casser la balance ?
- [ ] Rouille −15% sur 1 sem — perçue comme rite de passage ou comme punition ?
- [ ] Conditions cachées palier 5 — nombre de joueurs atteignant le palier 5 sur 12 mois (cible <2%) ?
- [ ] Techniques signature : noms personnalisés — adoption sociale (les autres joueurs reconnaissent-ils les noms) ?
- [ ] Anti-omniscience par décroissance — combien de Maîtrises Maître maintenues en moyenne par vétéran ?

---

## Décisions actées (techniques)

- ✅ **5 paliers nommés** : Novice / Initié / Adepte / Expert / Maître (au lieu de la courbe `XP × 1.15^N` legacy)
- ✅ **Palier 5 = condition cachée 🔒** — non visible dans l'UI tant que non déclenchée
- ✅ **Source XP** : +10 par hit, +25 par kill, +15 parade parfaite, +5 esquive parfaite (×1.5 si critique)
- ✅ **XP scaling fenêtre** : −4 à +5 = 100%, +6 à +10 = 130% (cf. [[Progression System]])
- ✅ **Diminishing returns** : −20% / paliers de 20 hits sur même cible, reset journalier
- ✅ **Décroissance** : −2% XP intra-palier par jour après 14j sans usage, plancher = seuil du palier
- ✅ **Pas de descente de palier** par décroissance seule — le palier obtenu reste acquis
- ✅ **Titre Maître** est un trophée d'Héritage (jamais perdu)
- ✅ **Rouille post-Souffle** : 1 sem (Petit) / 2 sem (Grand), dissipée par usage
- ✅ **Technique signature** au palier 5 — nom personnalisé `[Nom du joueur]`, public dans les logs de combat
- ✅ **Cross-link Voies/armes** : Sceptre/Athamé bénéficient des bonus de Voie cumulés
- ✅ **13 armes canoniques** + courbes ajustées par cadence d'usage (×0.85 dague à ×1.25 marteau 2H)
- ✅ **Anti-omniscience par décroissance** plutôt que cap dur sur nombre de Maîtrises

---

*Liens narratifs : [[Armes et Maîtrise]] | [[Personnage]] | [[Le Souffle]] | [[Le Lien]] | [[L'Accord]] | [[Reconnaissance]] | [[Labeur]]*
*Liens techniques : [[Weapon Mastery]] | [[Combo System]] | [[Movesets]] | [[Combat Attribute Set]] | [[Stats System]] | [[Progression System]] | [[Souffle System]] | [[Lien System]] | [[HW Progression Component]]*
