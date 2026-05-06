---
tags: [implementation, stats, character, balance, progression]
status: drafted
last_review: 2026-05-07
needs_review_for: [chiffres-playtest, focus-cadence, formules-derived-stats]
type: implementation
canonical_concept: "[[Personnage]]"
---

# Stats System — Implémentation

> Page d'implémentation technique du concept narratif **[[Personnage]]**.
> Cette page contient les **chiffres, formules, specs Unreal et règles de balance** des stats joueur.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Personnage]].

---

## Architecture en 3 couches

```
┌─────────────────────────────────────────────────┐
│ COUCHE 0 — STATS FONDAMENTALES (4 stats)        │
│ Universelles. Montent automatiquement avec      │
│ le niveau (Accord). Pas d'allocation manuelle.  │
└─────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│ COUCHE 1 — STATS BRUTES (8 stats)               │
│ Capacités physiques/mentales génériques.        │
│ Montent par USAGE.                              │
│ Échelle 0–150. Compressées par les Souffles.    │
└─────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│ COUCHE 2 — MAÎTRISES CONTEXTUELLES              │
│ Savoir-faire spécifique à une activité.         │
│ Stats brutes × Maîtrises = efficacité réelle    │
└─────────────────────────────────────────────────┘
```

Cette architecture évite les transferts indésirables entre domaines (un forgeron ne devient pas détective parce qu'il monte une stat brute). Voir [[HW Character]] §"Refonte sémantique stats" pour le mapping UE5 actuel et [[HW GAS Character]] pour l'intégration GAS.

---

## COUCHE 0 — Stats fondamentales (4 stats)

Montent automatiquement avec la progression d'Accord du joueur. Aucune allocation, aucun usage spécifique requis.

| Stat | Rôle | Échelle |
|---|---|---|
| **Vitalité** | Points de vie de base — chair et résistance brute | 0–100 |
| **Souffle** | Stamina de base — capacité d'effort général | 0–100 |
| **Présence** | Charisme de base — perception PNJ (prix neutres, accès, salutations) | 0–100 |
| **Conscience** | Mana de base si une Voie est active — perception du Lien | 0–100 |

**Progression** : interpolation linéaire entre 0 (création) et 100 (Accord max d'ère). Ces stats ne sont pas affectées par la compression de Souffle.

---

## COUCHE 1 — Stats brutes (8 stats)

Échelle **0–150**. Plafond mou à **100** (gain asymptotique au-delà), plafond dur à **150**. Compressées par chaque [[Souffle System|Petit Souffle]] au-dessus du seuil **50**.

| Stat | Description | Domaines impactés |
|---|---|---|
| **Vigueur** | Force musculaire, encaissement | Combat, port de charge, métiers physiques |
| **Vivacité** | Vitesse de réaction, agilité | Combat, esquive, mini-jeux de timing |
| **Endurance** | Résistance à l'effort prolongé | Voyages, sprint, crafts longs, parades tenues |
| **Acuité** | Précision, attention, observation | Critique, détection, qualité de craft |
| **Esprit** | Capacité magique brute | Mana max, complexité de sorts |
| **Résonance** | Intensité de canalisation | Puissance/durée des sorts, charisme aura |
| **Mémoire** | Apprentissage, recettes, lore | Gain de Maîtrise accéléré, identification |
| **Verbe** | Communication, persuasion, expression | Marchandage, leadership, performances |

### Échelle narrative et plafonds

| Niveau | Sens | Effet concret |
|---|---|---|
| 0–20 | Novice / Faible | Référence — humain ordinaire |
| 20–40 | Compétent | Au-dessus du commun |
| 40–60 | Aguerri | Vraiment au-dessus |
| 60–80 | Exceptionnel | Rare, on remarque |
| 80–100 | Légendaire | Histoires se racontent |
| 100–150 | Mythique | Quelques rares dans toute la Partie |

**Plafond mou à 100** : au-dessus de 100, le gain par usage est divisé par un facteur asymptotique (à playtester, valeur initiale `0.3`).
**Plafond dur à 150** : aucun gain au-delà.

### Compression cyclique au seuil 50

À chaque [[Souffle System|Petit Souffle]], les valeurs au-dessus de 50 sont partiellement ramenées :

```
Seuil = 50
Pour chaque stat brute du joueur :
  Si valeur ≤ 50 → inchangée
  Si valeur > 50 → valeur = 50 + (valeur - 50) × 0.7
```

Pour la formule complète, le facteur Grand Souffle (0.5), et la cinétique : voir [[Souffle System]] §"Formule de compression".

---

## COUCHE 2 — Maîtrises contextuelles

5 paliers, alignés sur [[Armes et Maîtrise]] :
1. **Novice**
2. **Initié**
3. **Adepte**
4. **Expert**
5. **Maître** (condition cachée)

### Catégories

| Catégorie | Exemples |
|---|---|
| **Combat** | Maîtrise par arme (épée, hache, arc, lance, dague, marteau, bouclier...) |
| **Magie** | Maîtrise par Voie (mono-Voie, voir [[Le Lien]]) |
| **Métiers** | 63 métiers (Forge, Cuisine, Tissage, Alchimie...) |
| **Exploration** | Pistage, Survie, Navigation, Escalade, Cartographie |
| **Social** | Marchandage, Diplomatie, Performance, Intimidation, Commandement |

**Décroissance** : les Maîtrises non entretenues décroissent. Au Souffle, rouille temporaire de 1 semaine, −15% performance. Voir [[Souffle System]] §"Rouille des Maîtrises".

---

## Système de Focus

Le joueur n'attribue jamais de points. Toutefois, il peut désigner 1 à 3 stats brutes en **Focus** : ces stats montent **×2 plus vite** quand utilisées.

| Élément | Valeur |
|---|---|
| Focus de base | **1 stat** |
| Focus à Accord ≥ 50% | **2 stats** |
| Focus à Accord ≥ 75% | **3 stats** |
| Multiplicateur de gain | **×2** sur stats focalisées (pendant action utilisatrice) |
| Cadence de changement | **1 fois par semaine réelle** |
| Visualisation HUD | Icône ⭐ dans la fiche personnage |

**Anti-abuse** : un cooldown serveur de 7 jours (réels) bloque tout changement de Focus avant échéance. Le compteur est persistant (pas reset par déconnexion).

---

## Caractéristiques dérivées — formules canoniques

Toutes les formules ci-dessous sont **indicatives** et à équilibrer en playtest. La couche fondamentale (Vit/Souf/Prés/Conscience) fournit la base universelle ; la couche brute amplifie selon l'orientation du joueur.

### Ressources max

| Ressource | Formule |
|---|---|
| **HP max** | `Vitalité + Vigueur × 1.5` |
| **Stamina max** | `Souffle + Endurance × 2` |
| **Mana max** | `Conscience + Esprit × 2` *(si Voie active, sinon 0)* |

### Régénération

| Ressource | Hors combat | En combat |
|---|---|---|
| **HP (Vigueur faible, ≤30)** | ~1% HP/s | 0 |
| **HP (Vigueur moyenne, 30–70)** | ~3% HP/s | ~0.5% HP/s |
| **HP (Vigueur élevée, ≥70)** | ~6% HP/s | ~1.5% HP/s |
| **Stamina (immobile)** | ~80 pts/s | ~15 pts/s |
| **Stamina (en marche)** | ~60 pts/s | ~15 pts/s |
| **Mana** | `5 + Esprit × 0.1` pts/s | `1 + Esprit × 0.05` pts/s |
| **Régen Mana méditation** | ×3 multiplier sur régen hors combat | n/a |

**Définition "En combat"** : entrée dès que le joueur reçoit ou inflige des dégâts. Sortie après **5 secondes** sans nouvelle action de combat. État signalé sur le HUD.

### Combat

| Effet | Formule |
|---|---|
| **Dégâts physiques** | `Vigueur × Maîtrise_Arme` |
| **Dégâts magiques** | `Esprit × Résonance × Maîtrise_Voie` |
| **% Critique** | `(Vivacité ou Acuité, selon arme) ÷ 5` |
| **Multiplicateur critique** | `150% + Acuité ÷ 20` |
| **Défense physique** | `Vigueur + bonus équipement` |
| **Défense magique** | `Esprit + Conscience + bonus équipement` |
| **Vitesse mouvement** | `Base + Vivacité × 0.3% + Endurance × 0.2%` |
| **Vitesse attaque** | `Vivacité × Maîtrise_Arme` |

### Hors-combat

| Effet | Formule |
|---|---|
| **Prix d'achat marchand** | `Base − Verbe × 0.5%` (plafond −30%) |
| **Qualité de craft** | `Acuité × Mémoire × Maîtrise_Métier` |
| **Capacité de port (kg)** | `Vigueur + Endurance` |
| **Détection** | `Acuité × Maîtrise contextuelle (Pistage, Survie...)` |
| **Gain de Maîtrise** | `Base × (1 + Mémoire × 0.005)` |

---

## Slots d'équipement

| Slot | Description | Compteur |
|---|---|---|
| Tête | Heaume / Coiffe | 1 |
| Cou | Collier / Amulette | 1 |
| Oreilles | Boucles d'oreilles | 1 (paire) |
| Torse | Plastron / Chemise | 1 |
| Épaules | Spallières | 1 |
| Bras | Brassards | 1 |
| Poignets | Bracelets | **2** |
| Doigts | Bagues | **2** |
| Mains | Gantelets | 1 |
| Jambes | Pantalon / Cuissards | 1 |
| Pieds | Bottes | 1 |
| Dos | Cape | 1 |
| Main droite | Arme principale | 1 |
| Main gauche | Arme secondaire / Bouclier | 1 |
| **Total emplacements** | | **15** |

### Prérequis d'équipement (double condition)

Pour équiper un item, **les deux conditions suivantes** doivent être remplies :

1. **Accord d'ère suffisant** :
   - Items Communs / Rares : aucun prérequis d'Accord
   - Items **Magistraux** : Accord ≥ 50%
   - Items **Légendaires** : Accord ≥ 75%
2. **Maîtrise du type d'équipement suffisante** :
   - Maîtrise d'arme palier ≥ N (selon tier item, voir [[Armes et Maîtrise]])

### Modificateurs d'équipement (par slot)

Liste des stats que l'équipement peut modifier (déterminé par le tier et l'archetype de l'item) :

| Type de modificateur | Stats potentiellement affectées |
|---|---|
| **Stats brutes** | Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe (bonus plat, +X) |
| **Ressources** | HP max, Mana max, Stamina max (bonus plat ou %) |
| **Régénération** | HP/s, Mana/s, Stamina/s |
| **Combat offensif** | Dégâts (plat / %), % crit, dmg crit, vitesse attaque |
| **Combat défensif** | Défense physique, défense magique, résistances élémentaires |
| **Mobilité** | Vitesse mouvement, vitesse esquive, capacité port |
| **Voie / Magie** | Bonus efficacité d'une Voie spécifique, réduction coût Mana |
| **Maîtrise** | Bonus à une Maîtrise spécifique (rare) |

Limites : un item peut porter **1 à 4 modificateurs** selon son tier (Commun = 1, Rare = 2, Magistral = 3, Légendaire = 4).

---

## Slots de Focus (rappel du système)

| Palier d'Accord | Slots Focus disponibles |
|---|---|
| 0–49% | 1 slot |
| 50–74% | 2 slots |
| 75–100% | 3 slots |

Chaque slot Focus = une stat brute marquée. Cooldown de changement = 7 jours réels par slot (indépendants).

---

## Progression par usage — gains de stats brutes

Chaque action utilisatrice d'une stat brute incrémente son XP de stat. Quand l'XP atteint le seuil du palier suivant, la valeur de stat augmente de 1.

| Palier de stat | XP requis (palier suivant) | Notes |
|---|---|---|
| 0 → 20 | Faible (montée rapide) | Découverte |
| 20 → 40 | Moyen | Apprentissage |
| 40 → 60 | Élevé | Spécialisation |
| 60 → 80 | Très élevé | Expertise |
| 80 → 100 | Très élevé + plafond mou | Approche du Légendaire |
| 100 → 150 | Asymptotique (×3 du palier précédent) | Mythique |

**Multiplicateurs sur le gain** :
- Stat marquée Focus : **×2**
- Voie dominante de l'ère (si stat associée à Voie) : **×1.25** (sem 1) puis **×1.10**
- Voie opposée à dominante : **×0.80**
- Labeur en saturation : **×0.5** ou plus bas (voir [[Labeur]])

---

## Compatibilité avec systèmes existants

| Système | Lien |
|---|---|
| [[Le Souffle]] / [[Souffle System]] | Compression au seuil 50, rouille post-Souffle |
| [[L'Accord]] | Détermine paliers Focus + prérequis d'équipement |
| [[Armes et Maîtrise]] | Couche 2 (Maîtrises de combat) |
| [[Le Lien]] | Mono-Voie, Esprit + Résonance = puissance magique |
| [[Labeur]] | Limite la vitesse de progression |
| [[Mort]] | Pas de perte de stats à la mort |
| [[HW Character]] | Classe base C++ portant les structs répliquées |
| [[HW GAS Character]] | `UHWCombatAttributeSet` à étendre pour les 8 stats brutes |
| [[Character Data Assets]] | Apparence visuelle (orthogonale aux stats) |

---

## Mapping UE5 — état actuel et travail à faire

Voir [[HW Character]] §"Refonte sémantique stats" pour la table de mapping détaillée.

**État actuel** (`UHWCombatAttributeSet`, 7 attributs) :
- `Strength` → **Vigueur** ✅
- `Agility` → **Vivacité** ✅
- `Constitution` → **Endurance** ✅ (mais non utilisé dans formules actuelles, à corriger)
- `Attack`, `Defense`, `CritRate`, `CritDamage` → dérivés combat (gardés)

**À ajouter** (5 attributs manquants pour atteindre les 8 brutes canoniques) :
- **Acuité**
- **Esprit**
- **Résonance**
- **Mémoire**
- **Verbe**

**À ajouter** (4 fondamentales) :
- **Vitalité** (existe via `Health` mais à expliciter comme couche 0)
- **Souffle** (couche 0, distinct de la Stamina ressource)
- **Présence**
- **Conscience**

---

## Points de calibrage à playtester

- [ ] Plafond mou 100, plafond dur 150 — sensation d'asymptote correcte ?
- [ ] Multiplicateur Focus ×2 — trop fort / juste / trop faible ?
- [ ] Cooldown Focus 7 jours — trop contraignant pour les joueurs casuals ?
- [ ] Formule HP `Vit + Vigueur × 1.5` — durée de combat à équilibrer
- [ ] Formule Qualité craft `Acuité × Mémoire × Maîtrise` — multiplicatif vs additif
- [ ] Régen HP en combat (1.5%/s à Vigueur élevée) — trop facile à survivre ?
- [ ] Seuil Magistral à 50% Accord, Légendaire à 75% — gating équilibré ?
- [ ] Asymptote au-dessus 100 (facteur 0.3) — 100→120 doit être un long voyage

---

## Décisions actées (techniques)

- ✅ **Architecture en 3 couches** : 4 fondamentales + 8 brutes + Maîtrises contextuelles
- ✅ **Pas d'attribution manuelle** — toute progression par usage
- ✅ **Système de Focus** : 1–3 stats focalisées, ×2 gain, cooldown 7j
- ✅ **Stats brutes 0–150**, plafond mou 100 / dur 150
- ✅ **Compression au seuil 50** par Souffle (voir [[Souffle System]])
- ✅ **Maîtrises contextuelles** : pas de transfert indésirable entre domaines
- ✅ **15 slots d'équipement** (incluant 2 bracelets + 2 bagues)
- ✅ **Double prérequis équipement** : Accord d'ère + Maîtrise
- ✅ **Régénération HP liée à Vigueur** (anciennement Constitution UE)
- ✅ **Pas de stat *Énergie* séparée** — Stamina + Mana suffisent
- ✅ **Pas de perte de stats à la mort** (voir [[Mort]])

---

*Liens narratifs : [[Personnage]] | [[Armes et Maîtrise]] | [[Le Lien]] | [[L'Accord]] | [[Le Souffle]] | [[Labeur]]*
*Liens techniques : [[HW Character]] | [[HW GAS Character]] | [[Character Data Assets]] | [[Souffle System]] | [[Migration Accord]]*
