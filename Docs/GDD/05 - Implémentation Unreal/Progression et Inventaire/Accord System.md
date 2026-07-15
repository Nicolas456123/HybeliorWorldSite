---
tags: [implementation, accord, progression, era, balance]
status: drafted
last_review: 2026-05-07
needs_review_for: [sources-accord-playtest, paliers-effets, similarite-ponderee]
type: implementation
canonical_concept: "[[L'Accord]]"
---

# Accord System — Implémentation

> Page d'implémentation technique du concept narratif **[[L'Accord]]**.
> Cette page contient les **chiffres, formules, specs Unreal et règles de balance**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[L'Accord]].

---

## Échelle canonique 0–100%

L'Accord se mesure sur un pourcentage entier `[0, 100]`. Le total **disponible** dans une Ère dépasse 100% (~100–130%), pour permettre plusieurs trajectoires.

| Palier | Plage | Définition gameplay |
|---|---|---|
| **Désaccordé** | 0–24% | Aucun bonus. Accès au contenu de base. |
| **Mi-accordé bas** | 25–49% | +5% gains XP. Accès quêtes secondaires d'ère. |
| **Mi-accordé haut** | 50–74% | +1 slot d'action sur la barre de compétences. +1 emplacement de Focus. Reconnaissance accélérée. |
| **Accordé** | 75–99% | Accès aux contenus rares (donjons spéciaux, recettes uniques, événements limités). Titre temporaire *"Accordé à l'Ère du [nom]"* affiché. |
| **Concordant** | 100% | Titre permanent *"Concordant de l'Ère du [nom]"* (visible Parties suivantes). Accès à un événement de fin d'ère unique. Conditions cachées vers contenu Mythique débloquées. |

---

## Sources d'Accord — table canonique

| Type d'objectif | Exemple | Accord gagné |
|---|---|---|
| Découverte de l'ère | Visiter zones nouvelles révélées par le Souffle | +10% |
| Quêtes d'ère | Quêtes spécifiques générées par l'ère (IA + scriptées) | jusqu'à +20% |
| Événements mondiaux | Participer aux événements liés à l'ère | jusqu'à +15% |
| Maîtrise active palier 4+ | Atteindre/maintenir Expert ou Maître | +10% par palier 4+ |
| Conditions cachées d'ère | Accomplir objectifs cachés de l'ère | +5 à +15% par condition |
| Contribution sociale | Reconnaissance, contribution guilde, aide nouveaux | jusqu'à +10% |
| Voie active maintenue | Garder un Lien actif avec une Voie pendant l'ère | +5% |
| Œuvre signée | Crafter item Magistral+ qui circule dans le monde | +5% par œuvre (plafonné +15%) |

**Total disponible par ère** : ~100–130% selon paramètres ère et profil joueur.
**Cap dur** : 100% (les sources au-delà sont absorbées sans effet supplémentaire).

---

## Effets par palier — table de balance

| Palier | Effets mécaniques |
|---|---|
| 0–25% | Aucun bonus. |
| 25–50% | +5% gains XP. Accès quêtes secondaires d'ère. |
| 50–75% | +1 slot d'action. +1 emplacement de Focus (voir [[Personnage]]). Multiplicateur Reconnaissance ×1.2. |
| 75–100% | Accès contenu rare ère. Titre temporaire affiché. Multiplicateur Reconnaissance ×1.5. |
| 100% | Titre permanent. Compteur "Ères Concordées" +1. Accès événement fin d'ère. Conditions cachées Mythique débloquées. |

---

## Bonus/Malus de Voie selon Accord

Pour les Liés (voir [[Le Lien]]) :

| Accord | Effet sur efficacité Voie |
|---|---|
| ≥ 75% | +10% |
| 25–74% | aucun |
| ≤ 25% | -10% |

**Cumul** : si la Voie est aussi la dominante de l'ère, ajouter le bonus Voie-dominante (voir [[Souffle System]]).

---

## Consécrations — exigences d'Accord

Les Consécrations (honneurs mortels nommés d'après une entité — voir [[L'Accord]] et [[Cosmologie]]) sont les sommets prestigieux du jeu : elles se tiennent tant que l'Accord tient, jamais comme une place dans la Polyphonie.

| Règle | Valeur |
|---|---|
| Acquisition | Accord 100% pendant l'ère où la Consécration est revendiquée |
| Conservation | Accord ≥ 80% à chaque Souffle (mesure prise au moment du Souffle) |
| Perte | Accord < 80% au moment du Souffle → Consécration retirée |
| Récupération | Re-acquérable lors d'une ère ultérieure si conditions remplies |

---

## Formule de similarité Ère(N) ↔ Ère(N+1)

```
similarité(N, N+1) = Σ (poids_dim × match_dim) / Σ poids_dim
```

Où `match_dim ∈ [0, 1]` pour chaque dimension, et les poids sont :

| Dimension | Poids |
|---|---|
| Force dominante | 0.30 |
| Force secondaire | 0.20 |
| État du monde (Floraison/Dégénérescence/Stagnation/Bouleversement) | 0.15 |
| Mood social | 0.10 |
| Tension cosmique | 0.10 |
| Continent emphase | 0.15 |

**Plage** : `similarité ∈ [0, 1]`.

```
Accord_cible(N+1) = Accord_actuel(N) × similarité(Ère N, Ère N+1)
```

---

## Cas de similarité — cibles d'Accord

Référence pour calibrage (Accord_actuel = 100% en entrée) :

| Cas | Ère N → Ère N+1 | Similarité | Accord cible |
|---|---|---|---|
| Très proche | Verdoiement (Spiritus / Floraison) → Pousse Lente (Spiritus / Stagnation) | 0.85 | 85% |
| Modéré | Crépuscule (Tempora / Bouleversement) → Voile (Tempora-Noctis / Bouleversement) | 0.55 | 55% |
| Très éloigné | Verdoiement (Spiritus / Floraison) → Sommeil de Glace (Aquor / Stagnation) | 0.15 | 15% |
| Extrême | Feu Endormi → Brume Mortelle | 0.05 | 5% |

---

## Cinétique de dérive — jour-par-jour

Au moment du Souffle, l'Accord **reste** à sa valeur actuelle puis dérive vers `Accord_cible` :

| Temps | Progression vers Accord_cible |
|---|---|
| Jour 0 (Souffle) | 0% (Accord conservé à Accord_actuel) |
| Jour 1–3 | ~10% |
| Semaine 1 | ~30% |
| Semaine 2 | ~60% |
| Semaine 3–4 | ~90% |
| Mois 2 | ~100% (équilibre atteint) |

**Job serveur** : tick journalier qui interpole `Accord_actuel(t)` vers `Accord_cible` selon courbe ci-dessus. Les actions du joueur (sources d'Accord) sont additives par-dessus la dérive.

```
Accord_actuel(t+1) = Accord_actuel(t) + drift(t) + actions_joueur(t)
```

Avec `drift(t) = (Accord_cible - Accord_actuel(t)) × facteur_courbe(t)`.

---

## Décompte d'Accord — exemple "Crépuscule Pourpre" (Noctis dominant)

| Action | Accord cumulable |
|---|---|
| Visiter les 3 zones révélées par le Souffle | +10% |
| Compléter 5 quêtes d'ère (sur 12 disponibles) | +15% |
| Participer à l'événement *Le Cri de Noctis* (boss mondial) | +10% |
| Participer à l'événement *La Marée Pourpre* (zone temporaire) | +5% |
| Atteindre/maintenir Maîtrise palier 4+ sur 1 arme | +10% |
| Maintenir un Lien actif avec une Voie | +5% |
| Découvrir 2 conditions cachées d'ère | +20% |
| Contribuer à la guilde (récolte, défense, partage) | +10% |
| Forger 3 œuvres Magistrales signées | +15% |
| **TOTAL** | **100%** |

Total disponible avec sources additionnelles : ~120–130%. Le joueur peut choisir 60–80% des actions pour atteindre 100%.

---

## UI — affichage principal

```
╔═══════════════════════════════════════════╗
║  Aldric ─ Forgeron de Mosrack             ║
║                                           ║
║  L'Accord de l'Ère du Reflux d'Aube       ║
║  ████████████████░░░░  73%                ║
║                                           ║
║  Héritage : ●●○○○ (2 ères Concordées)    ║
║                                           ║
║  Maîtrises   : Forge ★★★★ · Épée ★★★      ║
║  Stats       : Habileté 78 · Vigueur 65   ║
║                                           ║
║  Voie active : Spiritus (Lié niveau 3)    ║
╚═══════════════════════════════════════════╝
```

**Sous-écran "Détail de l'Accord"** : liste des sources, ce qui est complété, ce qui reste, hints sur conditions cachées. Sert d'à-faire dynamique, non-autoritaire.

---

## Effets sur l'économie

| Effet | Détail |
|---|---|
| Accès marchés ère | Palier 50%+ requis pour PNJ marchands spéciaux ère |
| Réduction marchands accordés | -10% prix chez marchands liés à l'ère, palier 75%+ |
| Services rares | Palier 75%+ requis (téléporteurs ritualisés, oracles dédiés) |
| Bourse des Augures — crédit | Concordants connus (compteur ≥ 1) ont une ligne de crédit |
| Disciples | L'Héritage attire PNJ et joueurs apprentis ; influence drop tables locales |

---

## Conditions cachées — récompenses mécaniques

| Condition | Récompense |
|---|---|
| 100% Accord pendant l'ère | Titre permanent *"Concordant de l'Ère du [nom]"* + accès événement fin d'ère |
| 100% sur 5 ères consécutives | Titre *"Voyageur Éternel"* (très rare) |
| 100% pendant un Souffle Cardinal | Trace permanente dans la géographie (monument cosmique inscrit) |
| Atteindre 100% en moins de 30 jours réels | Titre *"Sprinter de l'Accord"* |
| 0% volontaire pendant une ère entière | Engagement voie des Déliés (voir [[Le Lien]], path antagoniste) |
| Accord parfait sur toutes Voies cosmiques jouées | Vision d'un fragment cosmique (cinématique unique + cosmétique) |
| Prédire 3 Souffles avec Accord ≥ 90% sur chaque ère | Titre *"Prophète Concordant"* (cumulatif Prophète + Concordant) |

---

## Compteur "Ères Concordées" — affichage social

| Format | Description |
|---|---|
| `Héritage : ●●●●○` | 4 ères Concordées sur 5 dernières ères vécues (track court, lisible) |
| `Concordant de N Souffles` | Compteur total à vie, jamais perdu |

Affiché en sous-titre d'identité PJ, visible par les autres joueurs via examen.

---

## Décisions actées (techniques)

- ✅ Échelle 0–100%, cap dur à 100%, total disponible ~100–130%
- ✅ 5 paliers d'effets (0–25 / 25–50 / 50–75 / 75–100 / 100)
- ✅ Pas de reset au Souffle — dérive cinétique 2–4 semaines vers `Accord_cible`
- ✅ Similarité vectorielle pondérée sur 6 dimensions (poids 0.30 / 0.20 / 0.15 / 0.10 / 0.10 / 0.15)
- ✅ Consécrations : 100% requis pour acquisition, perte si <80% au Souffle
- ✅ Voie : ±10% efficacité selon Accord ≥75% / ≤25%
- ✅ Sources multiples (>100% disponible) pour personnaliser trajectoire
- ✅ Compteur "Ères Concordées" permanent, jamais décrémenté
- ✅ Conditions cachées avec récompenses Titre/cosmétique/géographique

---

## Implications sur autres systèmes

| Système | Implication |
|---|---|
| [[Le Souffle]] / [[Souffle System]] | Déclenche le calcul `Accord_cible` et lance le job de dérive |
| [[Les Ères]] | Fournit le vecteur 6-dimensions utilisé par la similarité |
| [[Le Lien]] | Bonus/malus efficacité Voie selon Accord |
| [[Personnage]] | +1 slot action et +1 Focus aux paliers 50% et 75% |
| [[Cosmologie]] | Consécrations verrouillées derrière Accord 100% |
| [[Univers]] (Déliés) | Path antagoniste si refus actif d'Accord |
| [[Quest System]] | Quêtes d'ère = sources principales d'Accord |
| [[Prédiction]] | Bourse des Augures donne crédit aux Concordants connus |
| [[Reconnaissance System]] | Multiplicateur Reconnaissance ×1.2 (50%+) / ×1.5 (75%+) |

---

## Dépendances système

| Composant | Rôle dans l'Accord |
|---|---|
| [[Global Data Service]] | Persistence Accord, compteur Ères Concordées, titres |
| [[HW Progression Component]] | Application des bonus de palier (slot, Focus, mults) |
| [[Migration Accord]] | Job de dérive jour-par-jour vers `Accord_cible` |
| [[Quest System]] | Génération des quêtes d'ère et attribution Accord |
| [[OWS Architecture]] | Sync inter-shard de l'Accord et des titres |
| [[HW Environment Manager]] | Trigger des conditions cachées contextuelles |

---

## Points de calibrage à playtester

- [ ] Cap à 100% avec sources >100% — le joueur ressent-il du choix, ou de la frustration de "perdre" du surplus ?
- [ ] Cinétique de dérive 2–4 sem — trop lent / juste / trop rapide ?
- [ ] Poids de similarité (0.30/0.20/0.15/0.10/0.10/0.15) — équilibre entre force dominante et autres dimensions
- [ ] Seuil 80% pour les Consécrations — punitif ou stimulant ?
- [ ] +10/-10% efficacité Voie — différence sentie ou marginale ?
- [ ] Sources +10/+15/+20% — équilibre entre les types d'objectifs
- [ ] Crédit Bourse des Augures pour Concordants — abus économique ?

---

*Liens narratifs : [[L'Accord]] | [[Le Souffle]] | [[Les Ères]] | [[Cosmologie]] | [[Le Lien]] | [[Univers]]*
*Liens techniques : [[Souffle System]] | [[Migration Accord]] | [[HW Progression Component]] | [[Quest System]] | [[Global Data Service]]*
