---
tags: [implementation, sessions, boucles-gameplay, balance, retention, vision]
status: drafted
last_review: 2026-05-07
needs_review_for: [calibrer-durées-après-playtest, boucles-quotidiennes-à-affiner, seuil-engagement-70pct]
type: implementation
canonical_concept: "[[La Partie]]"
---

# Player Sessions Spec — Implémentation

> Page d'implémentation technique du concept narratif **[[La Partie]]**.
> Cette page contient les **durées de session, listes de boucles, seuils numériques et métriques d'engagement**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[La Partie]].

---

## Grains de session — paramètres canoniques

| Grain | Durée cible | Cadence joueur typique | Promesse fonctionnelle |
|---|---|---|---|
| **Session courte** | 15–30 min | Quotidien (joueur intermittent) | Boucle complète sans dette résiduelle |
| **Session moyenne** | 1–2 h | 3–5×/semaine (joueur régulier) | Un chapitre entier, une boucle production-vente, un donjon court |
| **Session longue** | 3 h+ | 1–2×/semaine (soir/weekend) | Préparation + climax + débrief, payoff narratif/social |

**Règle de design transversale** : toute boucle doit pouvoir se **clôturer** dans son grain. Aucun système ne doit nécessiter d'enchaîner deux grains pour valider un payoff minimal.

---

## Catalogue de boucles — Session courte (15–30 min)

| Boucle | Durée typique | Payoff principal | Dépendance système |
|---|---|---|---|
| Combat de routine + récolte ciblée | ~15 min (5–10 ennemis) | Ressource précise + XP Maîtrise arme | [[Entity Spawner]], [[Loot Tables]] |
| Commande métier livrée (série courte) | ~15–25 min | Gain Accord par cycle bouclé + or | [[Crafting System]], [[Économie]] |
| Quête contractuelle simple | ~15–25 min | Réputation faction + or | [[Quest System]] |
| Hôtel des ventes | ~5–10 min | Revenus passifs, stocks ajustés | [[Marketplace]] |
| Action thématique d'Accord du jour | ~10 min ciblée | +Accord (selon Ère) | [[Migration Accord]] |
| Visite sociale ciblée (guilde / PNJ) | ~5–15 min | Maintien lien social, dialogue PNJ | [[Social System]], [[NPC AI]] |

**Contrainte technique** : la connexion serveur + chargement instance + premier objectif accessible doit prendre **< 90 secondes** depuis le clic "Jouer".

---

## Catalogue de boucles — Session moyenne (1–2 h)

| Boucle | Durée typique | Payoff principal | Dépendance système |
|---|---|---|---|
| Expédition d'exploration (1–2 zones) | ~1–1h30 | POI débloqués + cartographie + lore | [[World Map]], [[Discovery System]] |
| Donjon court en groupe (3–5 joueurs) | ~45–60 min | Butin collectif T2–T3 + XP | [[Dungeon System]] |
| Cycle de production complet | ~1h–1h30 | Item craft + or + Maîtrise métier | [[Crafting System]] |
| Chapitre narratif | ~1h–1h30 | Avancement arc + récompense scénaristique | [[Quest System]] §Arcs |
| Combat épisode (élite régional / champion) | ~45–90 min | Trophée + lore + or | [[Boss System]] |
| Pratique de [[Prédiction]] | ~45–60 min | Indices Bourse des Augures | [[Bourse des Augures]] |
| Activité guilde courte (patrouille / construction) | ~1h | Contribution guilde + ressources | [[Guildes]] |

---

## Catalogue de boucles — Session longue (3 h+)

| Boucle | Durée typique | Payoff principal | Dépendance système |
|---|---|---|---|
| Donjon majeur préparé (comp + bouffes + run + débrief) | ~3–4 h | Butin T4–T5 + lore avancé | [[Dungeon System]] §Endgame |
| Siège ou conquête de guilde | ~3–5 h | Territoire + héritage de guilde | [[Guildes]] §Sièges |
| Voyage long de découverte (multi-zones) | ~3–5 h | Trace archéologique + cartographie majeure | [[Traces des Ères]] |
| Roleplay social étendu | ~2–4 h | Réputation, intrigue politique | [[Social System]] |
| Projet d'Héritage (œuvre signée / monument / item T5–T6) | 3 h+ par jalon | Item légendaire signé, monument persistant | [[Héritage System]] |
| Bourse des Augures (analyse + pari) | ~3–4 h | Pari sur Ère suivante, gain potentiel important | [[Bourse des Augures]] |

---

## Objectifs par horizon — métriques

### Horizon quotidien (par session)

| Objectif | Métrique cible | Système |
|---|---|---|
| Action thématique d'Accord | +1 unité d'Accord journalier | [[Migration Accord]] |
| Maîtrise progressive | +1 à +5 points de Maîtrise (selon discipline) | [[Armes et Maîtrise]], [[Métiers]] |
| Réseau social | ≥ 1 interaction sociale (guilde/faction/PNJ) | [[Social System]] |

### Horizon hebdomadaire à mensuel (continuité)

| Objectif | Métrique cible | Système |
|---|---|---|
| Engagement Accord | **≥ 70% d'Accord sur l'Ère active** = "joueur engagé" | [[L'Accord]] |
| Palier de Maîtrise | Passer Novice → Apprenti → Adepte → Compagnon → Maître → Grand Maître | [[Armes et Maîtrise]] |
| Projet de guilde | ≥ 1 contribution majeure / semaine | [[Guildes]] |
| Arc narratif | Avancer 1 arc long sur plusieurs sessions | [[Quest System]] §Arcs |
| Préparation Bourse des Augures | Accumuler indices avant prochain Souffle | [[Prédiction]] |

**Seuil canonique d'engagement** : **70% d'Accord** sur l'Ère active = joueur considéré "engagé". Au-dessus, accès à événements de fin d'Ère, dialogues PNJ spécifiques, et compteur d'éligibilité Concordant.

### Horizon long terme (multi-Ères, signature de Partie)

| Objectif | Métrique / condition | Système |
|---|---|---|
| Concordant | **100% d'Accord** sur une Ère complète | [[L'Accord]] |
| Titre cumulatif | "Concordant des 3 Ères", "Survivant du Cardinal X", "Maître des 4 Voies" | [[Titles System]] |
| Héritage | Œuvres signées + monuments + items légendaires persistants | [[Héritage System]] |
| Polyvalence Voies | Maîtriser plusieurs des **5 Éternels / 8 Cosmiques** (= 13 Voies) | [[Le Lien]] |
| Polyvalence métiers | Plusieurs des **63 métiers** ouverts | [[Métiers]] |
| Trace archéologique | Exhumer une Trace majeure d'une Ère passée | [[Traces des Ères]] |

---

## Règles d'auto-suffisance des boucles

Toute boucle de session courte (15–30 min) doit satisfaire :

1. **Entrée rapide** : objectif accessible en < 90 sec après connexion.
2. **Granularité atomique** : la plus petite unité (1 ennemi, 1 craft, 1 livraison) produit déjà un gain marginal d'XP/Accord/or.
3. **Sortie sans dette** : se déconnecter en cours de boucle ne pénalise pas (pas de timer de raid, pas de buff perdu, pas d'instance qui kick).
4. **Empilage vers horizon supérieur** : chaque action courte doit alimenter au moins **1 horizon hebdo** ET **1 horizon long terme**.

---

## Règles anti-burnout / anti-FOMO

| Règle | Détail |
|---|---|
| Pas de daily reset punitif | Aucune mécanique ne génère de "dette" en cas de jour manqué |
| Pas de fenêtre horaire fixe pour endgame | Sièges et raids planifiés par les guildes, pas par des timers serveur globaux |
| Buffs de retour | Joueur absent ≥ 7 jours : +X% gain Maîtrise/Accord pendant N jours (à calibrer) |
| Pas de stuff time-gated | Aucun item endgame ne dépend uniquement de présence répétée à heures fixes |
| Catch-up via Souffle | La compression du Souffle (voir [[Souffle System]]) re-resserre l'écart joueur ancien / nouveau |

---

## Métriques de retention à instrumenter

| Métrique | Seuil cible | Action si en-dessous |
|---|---|---|
| Sessions < 30 min / sessions totales | ≥ 40% | Vérifier que la session courte tient sa promesse |
| Joueurs atteignant 70% Accord / Ère | ≥ 60% | Rééquilibrer activités thématiques |
| Joueurs atteignant 100% Accord / Ère (Concordant) | ~5–15% | Vérifier que le sommet reste atteignable mais distinctif |
| Taux de retour D1 / D7 / D30 | À définir post-playtest | Ajuster boucles et signaux de retour |
| Temps médian "clic Jouer → premier objectif" | < 90 sec | Optimiser flow de connexion |

---

## Hooks de retour (signaux "quelque chose t'attend")

À implémenter dans le flow de connexion / écran de personnage :

| Signal | Source système | Condition d'apparition |
|---|---|---|
| Événement mondial en cours | [[Era System]] | Toujours afficher l'Ère active + ses signaux |
| Mouvement de marché | [[Marketplace]] | Variation prix > X% sur items du joueur |
| Message de guilde non lu | [[Guildes]] | ≥ 1 message depuis dernière session |
| Quête entamée à reprendre | [[Quest System]] | Quête active avec progression < 100% |
| Commande métier en attente | [[Crafting System]] | Commande PNJ ou joueur en queue |
| Palier de Maîtrise atteignable rapidement | [[Armes et Maîtrise]] | Progression > 90% du palier suivant |
| Mouvement Bourse des Augures | [[Bourse des Augures]] | Cote modifiée significativement |
| Signe d'Ère (faible/fort) | [[Souffle System]] | Selon phase de l'Ère |

---

## Dépendances système

| Composant | Rôle dans les sessions |
|---|---|
| [[Quest System]] | Quêtes courtes, contractuelles, arcs |
| [[Crafting System]] | Cycles de production toutes durées |
| [[Migration Accord]] | Tracking objectifs Accord (jour / Ère) |
| [[Marketplace]] | Hôtel des ventes, marché passif |
| [[Dungeon System]] | Donjons courts (45–60 min) et majeurs (3–4 h) |
| [[Guildes]] | Patrouilles, sièges, projets collectifs |
| [[Bourse des Augures]] | Pari sur Ère suivante |
| [[Souffle System]] | Phase de l'Ère, signaux de bascule |
| [[Héritage System]] | Œuvres signées, monuments, items légendaires |

---

## Points de calibrage à playtester

- [ ] Session courte 15–30 min — sentiment de "boucle complète" effectif
- [ ] Session moyenne 1–2 h — boucle se clôt sans frustration
- [ ] Session longue 3 h+ — préparation + climax + débrief tient sans fatigue
- [ ] Seuil 70% Accord = "engagé" — atteignable par joueur intermittent ?
- [ ] Seuil 100% Accord = Concordant — taux d'atteinte 5–15% sur la cohorte ?
- [ ] Connexion → premier objectif < 90 sec — mesuré en playtest
- [ ] Buffs de retour après absence — équilibrage
- [ ] Hooks de retour — affichage clair, non-anxiogène

---

## Décisions actées

- ✅ Trois grains canoniques de session : 15–30 min / 1–2 h / 3 h+
- ✅ Toute boucle courte doit être auto-suffisante (entrée < 90 sec, sortie sans dette)
- ✅ Empilage obligatoire : action courte → horizon hebdo + horizon long terme
- ✅ Seuil 70% Accord = "joueur engagé"
- ✅ Seuil 100% Accord = Concordant (titre prestigieux)
- ✅ Pas de daily reset punitif, pas de fenêtre horaire fixe pour endgame
- ✅ Compression du Souffle assure le catch-up multi-Ères

---

*Liens narratifs : [[La Partie]] | [[Vision]] | [[Le Souffle]] | [[L'Accord]]*
*Liens techniques : [[Souffle System]] | [[Migration Accord]] | [[Quest System]] | [[Crafting System]] | [[Marketplace]] | [[Guildes]] | [[Héritage System]]*
