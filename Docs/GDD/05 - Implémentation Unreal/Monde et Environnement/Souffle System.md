---
tags: [implementation, souffle, era, world-system, balance]
status: drafted
last_review: 2026-05-06
needs_review_for: [chiffres-compression-playtest, cadence-tuning]
type: implementation
canonical_concept: "[[Le Souffle]]"
---

# Souffle System — Implémentation

> Page d'implémentation technique du concept narratif **[[Le Souffle]]**.
> Cette page contient les **chiffres, formules, specs Unreal et règles de balance**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Le Souffle]].

---

## Magnitudes — paramètres canoniques

| Magnitude | Durée gameplay | Cadence | Effet sur stats brutes | Effet sur l'Accord |
|---|---|---|---|---|
| **Petit Souffle** | 3 à 9 mois (typique 3-6) | Plusieurs par Partie | Compression linéaire au-dessus du seuil 50, ramène 30% de l'excès | Dérive ~2-4 sem selon similarité Ère(N)↔Ère(N+1) |
| **Grand Souffle** | ~1 à 2 ans | Transition de groupes d'Ères | Compression renforcée : ramène 50% de l'excès au-dessus de 50 | Dérive ~3-5 sem |
| **Souffle Cardinal** | Échelle des âges | Très rare, possiblement jamais en cours de Partie | Reconfiguration profonde, équipe planifiée | Cas par cas, événement scripté |

**Bornes de cadence (Petit Souffle)** :
- Durée minimum : **6 semaines** (sécurité système anti-burnout)
- Durée maximum : **9 mois** (sécurité contre stagnation)
- Tolérance de glissement émergent : **±20%** selon état du monde

---

## Formule de compression (Petit Souffle)

```
Seuil = 50
Pour chaque stat brute du joueur :
  Si valeur ≤ 50 → inchangée
  Si valeur > 50 → valeur = 50 + (valeur - 50) × 0.7
```

**Exemples** :
| Stat avant | Stat après |
|---|---|
| 30 | 30 |
| 50 | 50 |
| 60 | 57 |
| 80 | 71 |
| 100 | 85 |
| 120 | 99 |

**Variante Grand Souffle** : facteur `0.5` au lieu de `0.7` (ramène 50% de l'excès).

---

## Effets temporaires post-Souffle

### Rouille des Maîtrises

| Magnitude | Durée | Effet par activité |
|---|---|---|
| Petit Souffle | 1 semaine | Dégâts -15%, vitesse arme -10%, qualité craft -1 palier, coût Mana +20%, durée incantation +15% |
| Grand Souffle | 2 semaines | mêmes effets, durée doublée |

**Dissipation** : automatique par usage, entièrement effacée après ~10 utilisations significatives par maîtrise.

### Perte temporaire d'items haut tier

| Magnitude | Tiers concernés | Pénalité | Durée |
|---|---|---|---|
| Petit Souffle | Magistral, Légendaire | -10% stats | 2 semaines |
| Grand Souffle | Magistral, Légendaire | -15% stats | 3 semaines |

---

## Dérive de l'Accord

Voir [[L'Accord]] §Transition d'Ère pour le détail. Spécifications :

```
Accord_cible(N+1) = Accord_actuel(N) × similarité(Ère N, Ère N+1)
```

**Similarité** = vecteur de Hamming pondéré sur les 6 dimensions canoniques d'Ère (force dominante, secondaire, état du monde, mood social, tension cosmique, continent emphase). Échelle [0, 1].

**Cinétique de dérive (Petit Souffle)** :
| Temps | Progression vers Accord_cible |
|---|---|
| Jour 0 (Souffle) | 0% (Accord reste à sa valeur) |
| Jour 1-3 | ~10% |
| Semaine 1 | ~30% |
| Semaine 2 | ~60% |
| Semaine 3-4 | ~90% |
| Mois 2 | ~100% (équilibre atteint) |

---

## Bonus/Malus de Voie selon Ère

Pour les Liés (voir [[Le Lien]]) :

| Position de la Voie dans l'ère | Effet semaine 1 | Effet reste de l'ère |
|---|---|---|
| Voie dominante de l'ère | +25% efficacité | +10% efficacité |
| Voie opposée à la dominante | -20% efficacité | -20% efficacité |
| Voie neutre | aucun | aucun |

Mana max : compressé selon la formule générale (seuil 50, facteur 0.7).

---

## Phases techniques d'un Petit Souffle

```
T0 : Phase stable (ère en cours)
T0 + 30-50% durée : Signes faibles
   - Triggers narratifs PNJ (rêves, comportements)
   - Variants visuels subtils (constellations)
   - Migration faune
T0 + (durée - 1 à 2 sem) : Signes forts
   - Événement mondial annonciateur
   - VFX ciel
   - Activation Bourse des Augures
T0 + durée : LE SOUFFLE
   - Cinématique globale (~5 sec)
   - Compression stats appliquée côté serveur
   - Diffusion EraConfig aux clients
   - Application variants visuels
   - Init rouille Maîtrises
   - Calcul Accord_cible(N+1)
T+ : Nouvelle ère
   - Dérive Accord en arrière-plan
   - Quêtes IA biaisées thème ère
   - Spawn tables modifiées
```

---

## Flux serveur

```
1. Serveur déclenche Souffle (timing modulé par état du monde)
2. Génération EraConfig(N+1) :
   - Force dominante (pick parmi 5 Éternels + 12 Cosmiques)
   - Force secondaire
   - État du monde
   - Mood social
   - Tension cosmique
   - Continent(s) emphase
3. Diffusion config aux clients (~quelques KB JSON)
4. Application client :
   - Sky / lumière (UE5 presets : voir [[Time Of Day]], [[Weather System]])
   - Variants visuels (shaders, particules — voir [[VFX Audio Rendu/Index]])
   - Spawn tables modifiées (voir [[Entity Spawner]])
   - Audio mix
   - Foliage density (voir [[Foliage Assets]])
5. Côté serveur :
   - Compression stats brutes (formule canonique)
   - Init état rouille Maîtrises
   - Recalcul Accord_cible
   - Dérive Accord amorcée (job en arrière-plan)
6. Quêtes IA biaisées (prompt thématique) — voir [[Quest System]]
```

---

## Facteurs de modulation de la durée

L'algorithme peut **avancer** ou **retarder** la fin d'une ère selon l'état du monde :

| Événement | Effet sur durée restante |
|---|---|
| Boss mondial lié à l'ère vaincu | Accélération (-X%) |
| Condition cachée 🔒 d'ère remplie | Accélération forte ou Souffle anticipé |
| Ère calme (peu d'événements joués) | Étirement (+X%) |
| Rituels coordonnés massifs (religions, Concordants) | Influence marginale |
| Cardinaux passés actifs | Modulation de tonalité, marginale |

**Bornes** : la durée reste contrainte par les bornes min/max (6 sem / 9 mois).

---

## Conditions cachées 🔒 mécaniques

| Condition | Récompense |
|---|---|
| Prédire correctement 3 Souffles successifs | Titre "Prophète" |
| 100% Accord pendant l'ère | Titre "Concordant" + accès événement fin d'ère |
| Voie de Tempora niv 5 + 3 ères vécues | Résistance partielle compression : -10% au lieu de -30% sur stats au-dessus de 50 |
| 5 ères différentes vécues | Titre "Voyageur des Souffles" |
| Refus actif d'Accord (path Délié) | Engagement voie des Déliés (voir [[Le Lien]]) |

---

## Dépendances système

| Composant | Rôle dans le Souffle |
|---|---|
| [[OWS Architecture]] | Diffusion EraConfig multi-shard |
| [[Global Data Service]] | Stockage/sync de l'EraConfig courante |
| [[HW Environment Manager]] | Application des variants visuels |
| [[Time Of Day]] / [[Weather System]] | Bascule sky/lumière/météo par ère |
| [[Entity Spawner]] | Spawn tables ère-dependent |
| [[HW Progression Component]] | Application compression + rouille |
| [[Migration Accord]] | Calcul de la dérive d'Accord |
| [[Quest System]] | Génération quêtes biaisées par thème |

---

## Points de calibrage à playtester

- [ ] Seuil 50 + facteur 0.7 — ressenti de compression "ferme mais pas brutal"
- [ ] Cinétique de dérive Accord — 2-4 sem trop lent / juste / trop rapide
- [ ] Rouille -15% sur 1 sem — friction perçue comme "narratif" ou comme "chiant"
- [ ] Bonus Voie dominante +25% sem 1 / +10% reste — équilibrage Liés
- [ ] Cadence ressentie : 3-9 mois — joueurs lassés ou pas assez le temps de s'investir ?

---

## Décisions actées (techniques)

- ✅ Compression linéaire au-dessus seuil 50, facteur 0.7 (Petit) / 0.5 (Grand)
- ✅ Cadence variable 3-9 mois, bornes 6 sem / 9 mois, tolérance ±20%
- ✅ Rouille Maîtrise -15% sur 1 sem (Petit) / 2 sem (Grand)
- ✅ Items haut tier -10% stats sur 2 sem (Petit) / -15% sur 3 sem (Grand)
- ✅ Dérive Accord proportionnelle à similarité, cinétique 2-4 sem
- ✅ EraConfig diffusée aux clients en JSON ~quelques KB
- ✅ Bonus Voie dominante : +25% sem 1, +10% reste de l'ère

---

*Liens narratifs : [[Le Souffle]] | [[Les Ères]] | [[L'Accord]] | [[Cosmologie]]*
*Liens techniques : [[OWS Architecture]] | [[HW Environment Manager]] | [[Migration Accord]] | [[Entity Spawner]]*
