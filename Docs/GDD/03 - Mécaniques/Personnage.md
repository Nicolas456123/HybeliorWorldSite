---
tags: [personnage, stats, build, progression-par-usage]
status: recently_refactored
last_review: 2026-05-01
needs_review_for: [chiffres-playtest, focus-system]
type: mechanic
---

# 🧑 Le Personnage Joueur

## Concept fondamental

> [!important]
> **Pas de classe. Pas de restriction. Pas d'attribution manuelle de points.**
> Le personnage est une page blanche que le joueur remplit **par ses actions**, pas par des choix de menu.
>
> Tout est accessible, tout prend du temps à monter — et ce qu'on n'entretient pas redescend. La limite vient d'elle-même via le [[Labeur|Labeur]], la décroissance et le [[Le Souffle|Souffle]].

---

## Personnalisation visuelle

**À la création :**
- Visage, couleur de peau, morphologie
- Tatouages, coiffure, couleur des yeux
- Certaines options limitées selon la zone d'apparition (culture locale)

**En jeu :**
- Équipement visible sur le personnage intégralement
- Personnalisation via [[Métiers|métiers]] (gravure par un forgeron, teintures)
- Nouvelles options cosmétiques débloquées en explorant d'autres cultures

**Emplacements d'équipement :**

| Slot | Description |
|------|-------------|
| Torse, Épaules, Bras | Armure |
| Jambes, Bottes | Armure |
| Cape | Dos |
| Heaume / Coiffe | Tête |
| Collier / Amulette | Cou |
| 2× Bracelet | Poignets |
| 2× Bague | Doigts |
| Boucles d'oreilles | Oreilles |
| Main droite | Arme principale |
| Main gauche | Arme secondaire / Bouclier |

---

## Architecture du personnage en 3 couches

> Le système de stats d'Hybelior est organisé en **3 couches**, du général au spécifique. Cette architecture évite les transferts indésirables (un forgeron ne devient pas automatiquement détective parce qu'il monte une stat) et alignent la progression avec les actions.

```
┌─────────────────────────────────────────────────┐
│ COUCHE 0 — STATS FONDAMENTALES (4 stats)        │
│ Universelles. Montent automatiquement avec      │
│ le niveau. Tout joueur les a quoi qu'il fasse.  │
└─────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│ COUCHE 1 — STATS BRUTES (8 stats)               │
│ Capacités physiques/mentales génériques.        │
│ Montent par USAGE, pas par allocation.          │
│ Échelle 0–150. Compressées par les Souffles.    │
└─────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│ COUCHE 2 — MAÎTRISES CONTEXTUELLES              │
│ Savoir-faire spécifique à une activité.         │
│ Stats brutes × Maîtrises = efficacité réelle    │
└─────────────────────────────────────────────────┘
```

---

## COUCHE 0 — Stats fondamentales (4 stats universelles)

> Montent **automatiquement** avec le niveau. Pas d'allocation. Pas d'usage spécifique requis.

| Stat | Rôle |
|------|------|
| **Vitalité** | Points de vie de base — chair et résistance brute |
| **Souffle** | Stamina de base — capacité d'effort général |
| **Présence** | Charisme de base — comment les PNJ te perçoivent (prix marchands neutres, salutations, accès) |
| **Conscience** | Mana de base **si une Voie est active** — perception du Lien et seuil minimum |

> [!tip] Pourquoi universelles
> Un cuisinier maître a besoin de **Souffle** pour tenir des heures aux fourneaux, de **Présence** pour vendre, de **Vitalité** pour survivre à un voyage. Il n'investit pas en martial mais ces 4 stats lui montent quand même.

---

## COUCHE 1 — Stats brutes (8 stats, montent par usage)

> Échelle **0–150**. Plafond mou à **100** (asymptotique au-delà), plafond dur à **150**. Compressées par chaque [[Le Souffle|Souffle]] au-dessus du seuil 50.

| Stat | Description | Domaines impactés |
|------|-------------|-------------------|
| **Vigueur** | Force musculaire, encaissement | Combat, port de charge, métiers physiques (forge, bûcheron) |
| **Vivacité** | Vitesse de réaction, agilité | Combat, esquive, mini-jeux de timing |
| **Endurance** | Résistance à l'effort prolongé | Voyages, sprint, crafts longs, parades tenues |
| **Acuité** | Précision, attention, observation | Critique, détection, qualité de craft, mini-jeux |
| **Esprit** | Capacité magique brute | Mana max, complexité de sorts |
| **Résonance** | Intensité de canalisation | Puissance/durée des sorts, charisme aura |
| **Mémoire** | Apprentissage, recettes, lore | Gain de Maîtrise accéléré, identification d'items |
| **Verbe** | Communication, persuasion, expression | Marchandage, leadership, performances |

### Échelle narrative

| Niveau de stat | Sens narratif | Effet concret |
|----------------|---------------|----------------|
| **0–20** | Novice / Faible | Référence — un humain ordinaire |
| **20–40** | Compétent | Au-dessus du commun |
| **40–60** | Aguerri | Vraiment au-dessus |
| **60–80** | Exceptionnel | Rare, on remarque |
| **80–100** | Légendaire | Histoires se racontent à ton sujet |
| **100–150** | **Mythique** | Quelques rares dans toute la Partie |

> [!warning] Compression cyclique
> À chaque [[Le Souffle|Petit Souffle]], les valeurs au-dessus de 50 sont **partiellement ramenées** vers 50 :
> - Stat 100 → 85
> - Stat 80 → 71
> - Stat 50 et en-dessous → inchangée
>
> Cela compresse les écarts mais préserve les acquis spécifiques (voir [[L'Accord]]).

---

## Pas d'attribution manuelle — Système de Focus

> [!important] Tout monte par usage, mais le joueur peut "diriger" sa progression
> Le joueur **n'attribue jamais de points**. Tout monte par les actions qu'il fait. **Mais** il peut choisir 1 à 2 stats **Focus** qui montent **2× plus vite** quand utilisées.

### Règles du Focus

| Élément | Valeur |
|---------|--------|
| **Nombre de stats Focus** | 1 (par défaut) — 2 (au palier d'Accord 50%) — 3 (palier d'Accord 75%) |
| **Effet** | Stats focalisées montent ×2 quand utilisées par les actions associées |
| **Changement** | 1 fois par semaine réelle (pas plus, pour éviter l'optimisation excessive) |
| **Visualisation** | Focus marqué d'une icône ⭐ dans la fiche personnage |

### Exemple

Aldric le forgeron-aventurier décide de focaliser **Acuité** et **Mémoire** :
- Quand il forge → son **Acuité** monte ×2
- Quand il identifie un minerai → son **Œil** (sous-application d'Acuité) bénéficie du gain accéléré
- Quand il étudie un grimoire → sa **Mémoire** monte ×2
- Pendant 1 semaine, ces stats progressent visiblement plus vite que les autres

---

## COUCHE 2 — Maîtrises contextuelles

> Les **Maîtrises** sont des savoir-faire spécifiques. Elles ne montent que par l'usage de leur activité. Elles **ne se transfèrent pas** entre activités différentes, même si la stat brute sous-jacente est commune.

### Catégories de maîtrises

| Catégorie | Exemples |
|-----------|----------|
| **Combat** | Maîtrise par arme (épée, hache, arc, lance, dague, marteau, bouclier...) — voir [[Armes et Maîtrise]] |
| **Magie** | Maîtrise par Voie (mono-Voie de toute façon — voir [[Le Lien]]) |
| **Métiers** | Forge, Cuisine, Tissage, Alchimie, Herboristerie... (les 63 métiers — voir [[Métiers]]) |
| **Exploration** | Pistage, Survie en froid/chaud, Navigation maritime, Escalade, Cartographie |
| **Social** | Marchandage, Diplomatie, Performance (barde), Intimidation, Commandement |

### 5 paliers de Maîtrise (existant)

Voir [[Armes et Maîtrise]] :
1. **Novice**
2. **Initié**
3. **Adepte**
4. **Expert**
5. **Maître** 🔒

> [!note] Décroissance
> Les Maîtrises non entretenues décroissent. À chaque Souffle, une **rouille temporaire** s'applique (1 semaine, −15% performance).

---

## Pourquoi cette architecture évite les transferts indésirables

> [!important] Stats brutes × Maîtrises = efficacité réelle
>
> Une stat brute seule ne fait rien. Elle doit être **multipliée par une maîtrise contextuelle** pour produire un effet utile.

### Exemple concret

```
Aldric le forgeron a Acuité 80 (stat brute haute).
Il a Maîtrise_Forge palier 5 (Maître).
Il a Maîtrise_Pistage palier 0 (jamais pratiqué).

→ Forger une épée : Acuité 80 × Maîtrise_Forge palier 5 = excellent
→ Lire des traces dans la forêt : Acuité 80 × Maîtrise_Pistage 0 = médiocre
```

> Sans la **maîtrise**, la **stat brute seule** ne donne rien. Aldric voit les traces (il a un bon œil) mais ne sait pas les interpréter (il n'est pas chasseur).

→ **Le forgeron ne devient pas automatiquement détective.** ✅

---

## Tableau des effets — comment les stats produisent du gameplay

> Ces formules sont **indicatives** (à équilibrer en playtest).

| Effet de gameplay | Formule indicative |
|-------------------|---------------------|
| **HP max** | Vitalité (couche 0) + Vigueur (couche 1) × 1.5 |
| **Stamina max** | Souffle (couche 0) + Endurance (couche 1) × 2 |
| **Mana max** | Conscience (couche 0) + Esprit (couche 1) × 2 (si Voie active) |
| **Régen Mana** | Esprit + Résonance (passif lent) |
| **Dégâts physiques** | Vigueur × Maîtrise_Arme |
| **Dégâts magiques** | Esprit × Résonance × Maîtrise_Voie |
| **% Critique** | (Vivacité ou Acuité, selon arme) ÷ 5 |
| **Multiplicateur critique** | 150% base + Acuité ÷ 20 |
| **Défense physique** | Vigueur + équipement |
| **Défense magique** | Esprit + Conscience + équipement |
| **Vitesse de mouvement** | Base + Vivacité × 0.3% + Endurance × 0.2% |
| **Vitesse d'attaque** | Vivacité × Maîtrise_Arme |
| **Prix d'achat marchand** | Base − Verbe × 0.5% (plafond −30%) |
| **Qualité de craft** | Acuité × Mémoire × Maîtrise_Métier |
| **Capacité de port** | Vigueur + Endurance |
| **Détection (générique)** | Acuité × Maîtrise contextuelle (Pistage, Survie, etc.) |

---

## Régénération HP

| Contexte | Vigueur faible | Vigueur moyenne | Vigueur élevée |
|----------|---------------|-----------------|----------------|
| **Hors combat** (5 sec sans dégât) | ~1% HP/s | ~3% HP/s | ~6% HP/s |
| **En combat** | 0 | ~0.5% HP/s | ~1.5% HP/s |
| **Potions / Nourriture** | Soin direct ou HoT — s'ajoute toujours par-dessus la régén passive |

> [!note] Statut "En combat"
> Le joueur entre en combat dès qu'il **reçoit ou inflige des dégâts**. Il en sort après **5 secondes sans nouvelle action de combat**. Le HUD signale clairement le statut.

> [!tip] Choix de build
> Une Vigueur faible rend les **potions et la cuisine** indispensables → valorise les métiers. Une Vigueur élevée permet le combat prolongé sans appui → spécialisation tank/dueliste.

---

## Régénération Stamina et Mana

| Ressource | Hors combat | En combat |
|-----------|-------------|-----------|
| **Stamina** | ~80 pts/s (immobile), ~60 pts/s (en marche) | ~15 pts/s |
| **Mana** | ~5 pts/s + bonus Esprit | ~1 pts/s |

> Voir [[Combat]] pour les coûts détaillés des actions et la méditation.

---

## Prérequis d'équipement

> [!warning] Double condition
> Pour équiper un item, **deux conditions doivent être remplies simultanément** :
> 1. **L'Accord d'ère** suffisant (palier 50%+ pour items Magistraux, 75%+ pour Légendaires) → [[L'Accord]]
> 2. **Maîtrise de l'arme / type d'équipement** suffisant → [[Armes et Maîtrise]]
>
> Un Concordant à 75% sans maîtrise épée ne peut pas équiper une épée légendaire. Un Maître épée à seulement 30% d'Accord non plus.

> [!note] Évolution depuis l'ancien système
> Auparavant, le prérequis était "Niveau global suffisant". Avec le système d'Accord ([[L'Accord]]), c'est l'Accord d'ère qui sert de prérequis "social" (avec les Maîtrises pour la technique).

---

## Exemples de profils joueurs

### Profil 1 — Le forgeron-aventurier
*"Je crafte mes propres armes, j'ai pas peur de me défendre."*

| Couche | Stats |
|--------|-------|
| **Fondamentales** | Vitalité 60, Souffle 65, Présence 50, Conscience 30 |
| **Brutes** | Acuité 90, Mémoire 80, Vigueur 65, Endurance 55, Vivacité 35, Esprit 25, Résonance 20, Verbe 30 |
| **Maîtrises** | Maîtrise_Forge ★★★★★, Maîtrise_Bijouterie ★★★, Maîtrise_Épée ★★ |
| **Focus actuel** | Acuité, Mémoire |

### Profil 2 — Le duelliste
*"Vivacité et Vigueur, rien d'autre ne compte."*

| Couche | Stats |
|--------|-------|
| **Fondamentales** | Vitalité 70, Souffle 75, Présence 40, Conscience 20 |
| **Brutes** | Vivacité 100, Vigueur 80, Endurance 70, Acuité 60, Mémoire 35, Esprit 20, Résonance 15, Verbe 25 |
| **Maîtrises** | Maîtrise_Rapière ★★★★★, Maîtrise_Dague ★★★, Maîtrise_Bouclier ★ |
| **Focus actuel** | Vivacité, Vigueur |

### Profil 3 — Le Lié de Spiritus, herboriste
*"Le Lien avec la nature est mon métier autant que mon arme."*

| Couche | Stats |
|--------|-------|
| **Fondamentales** | Vitalité 50, Souffle 55, Présence 60, Conscience 80 |
| **Brutes** | Esprit 85, Résonance 80, Acuité 70, Endurance 50, Mémoire 60, Vivacité 30, Vigueur 25, Verbe 40 |
| **Maîtrises** | Maîtrise_Voie_Spiritus ★★★★, Maîtrise_Herboristerie ★★★★, Maîtrise_Alchimie ★★★ |
| **Focus actuel** | Esprit, Acuité |

### Profil 4 — Le marchand-voyageur
*"Je ne combats jamais. Je voyage, je commerce, je raconte."*

| Couche | Stats |
|--------|-------|
| **Fondamentales** | Vitalité 50, Souffle 65, Présence 90, Conscience 25 |
| **Brutes** | Verbe 100, Endurance 75, Mémoire 80, Acuité 60, Vivacité 40, Vigueur 30, Esprit 20, Résonance 15 |
| **Maîtrises** | Maîtrise_Marchandage ★★★★★, Maîtrise_Diplomatie ★★★★, Maîtrise_Cartographie ★★★ |
| **Focus actuel** | Verbe, Mémoire |

### Profil 5 — Le hors-la-loi furtif
*"Frapper fort, disparaître."*

| Couche | Stats |
|--------|-------|
| **Fondamentales** | Vitalité 55, Souffle 60, Présence 30, Conscience 50 |
| **Brutes** | Vivacité 90, Acuité 75, Vigueur 70, Esprit 60, Résonance 45, Endurance 50, Mémoire 35, Verbe 20 |
| **Maîtrises** | Maîtrise_Dague ★★★★, Maîtrise_Voie_Umbra ★★★, Maîtrise_Furtivité ★★★★ |
| **Focus actuel** | Vivacité, Acuité |
| **Note** | Karma rouge probable — voir [[PvP]] |

---

## Cohérence avec les autres systèmes

| Système | Lien |
|---------|------|
| **[[Le Souffle]]** | Compresse les stats brutes au-dessus de 50 |
| **[[L'Accord]]** | Remplace l'ancien "niveau global". Détermine les paliers d'effets |
| **[[Armes et Maîtrise]]** | Les Maîtrises sont la couche 2 |
| **[[Le Lien]]** | Mono-Voie. Esprit + Résonance = puissance magique |
| **[[Labeur]]** | Limite la vitesse de progression |
| **[[Mort]]** | Pas de perte de stats à la mort |

---

## Décisions actées

- ✅ **Architecture en 3 couches** (4 fondamentales + 8 brutes + Maîtrises contextuelles)
- ✅ **Pas d'attribution manuelle** — tout par usage
- ✅ **Système de Focus** : 1-3 stats focalisées montent ×2
- ✅ **Stats brutes 0-150**, plafond mou 100 / dur 150
- ✅ **Compression par Souffle** : voir [[Le Souffle]]
- ✅ **Maîtrises contextuelles** : pas de transfert indésirable entre domaines
- ✅ **Plus de stat *Énergie* séparée** — Stamina + Mana suffisent
- ✅ **Régénération HP** liée à Vigueur (anciennement Constitution)
- ✅ **Régénération Mana** méditation possible hors combat

---

*Liens : [[Labeur]] | [[Combat]] | [[Armes et Maîtrise]] | [[Le Lien]] | [[Progression]] | [[Mort]] | [[Le Souffle]] | [[L'Accord]]*
