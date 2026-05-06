---
tags: [implementation, vision, identite-produit, conditions-cachees, monetisation, balance]
status: drafted
last_review: 2026-05-07
needs_review_for: [plafond-conditions-cachees-playtest, palette-monetisation]
type: implementation
canonical_concept: "[[Vision]]"
---

# Vision Rules — Implémentation

> Page d'implémentation technique du concept narratif **[[Vision]]**.
> Cette page contient les **règles produit, plafonds de balance, spec de monétisation et critères d'arbitrage** dérivés de la vision.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Vision]].

---

## Identité produit — fiche canonique

| Champ | Valeur |
|---|---|
| **Titre** | HybeliorWorld |
| **Genre** | MMO Action-RPG monde ouvert |
| **Référence de style** | New World / Black Desert Online |
| **Plateforme** | PC uniquement |
| **Statut** | Pre-Alpha |
| **Moteur** | Unreal Engine 5 |
| **Backend** | OWS (Open World Server) — voir [[OWS Architecture]] |
| **Modèle de Partie** | Une seule Partie mondiale partagée, durée cible 1 à 2 ans (voir [[La Partie]]) |
| **Audience cible primaire** | Joueurs RPG / Histoire — investissement long terme, profondeur récompensée |

---

## Piliers de design — critères d'arbitrage

Les trois piliers sont utilisés comme **filtres de décision** lors des arbitrages produit. Toute proposition de feature est évaluée contre les trois.

| Pilier | Question d'arbitrage | Si la réponse est "non" sur les 3 |
|---|---|---|
| **Puissance progressive** | La feature donne-t-elle un sens à l'heure de jeu investie ? | Refuser ou reformuler |
| **Survie et tension** | La feature préserve-t-elle l'enjeu et le risque ? | Refuser ou reformuler |
| **Liberté et découverte** | La feature ouvre-t-elle un espace d'exploration ou de choix ? | Refuser ou reformuler |

**Règle d'or** : une feature qui ne touche aucun pilier n'a pas sa place dans Hybelior.

---

## Différenciateurs structurels — référence

Liste canonique des différenciateurs revendiqués. Chaque ligne pointe vers le système qui le porte.

| Différenciateur | Système porteur |
|---|---|
| Progression par la pratique (usage > XP générique) | [[Maîtrises]] / [[Weapon Mastery]] |
| Le Labeur (énergie quotidienne forçant des choix) | [[Labeur]] |
| Décroissance naturelle (ce qu'on n'entretient pas diminue) | [[Maîtrises]] §Décroissance |
| Conditions cachées (déblocages secrets) | voir §Cadre des conditions cachées ci-dessous |
| Une seule Partie mondiale (1-2 ans, partagée) | [[La Partie]] |
| Lore ambiant (pas de cinématique imposée) | [[Quest System]] / [[Traces des Ères]] |
| Magie réinventée (mêmes effets, nomenclature originale) | [[Le Lien]] / [[Voies]] |
| Le Souffle (cycle cosmique réactif) | [[Souffle System]] |

---

## Cadre des conditions cachées — règles canoniques

Les conditions cachées sont un pilier d'identité d'Hybelior. **Trois niveaux de visibilité** coexistent, chacun avec un domaine d'usage strictement défini.

### Hiérarchie des secrets

| Niveau | Visibilité côté joueur | Domaine d'usage | Exemples canoniques |
|---|---|---|---|
| 🟢 **Visible** | Condition + barre de progression affichées | Progression normale, paliers réguliers | Niveaux d'arme 1 à 4, quêtes ordinaires, métiers 1 à 4 |
| 🟡 **Indicé** | Une icône `🔒` signale qu'une condition existe, sans en révéler la nature | Paliers spéciaux, reliques, routes alternatives | Compétences signature niveau Maître, donjons spéciaux, rédemption karma |
| 🔴 **Cachée totale** | Aucune indication. Déclenchement par surprise. | Réservé aux **vrais secrets uniques** | Titres Célestes secondaires, Voies non répertoriées, conditions de Souffle Cardinal, fragments de lore exclusifs, signatures cosmétiques uniques |

### Plafond souple — règle de balance

```
Pour chaque système (Maîtrise d'arme, Voie, Métier, Donjon, Quête, Cosmologie) :
  Part du contenu en 🔴 Cachée totale ≤ 20% du contenu total du système
```

**Justification** : au-delà de 20%, les playtests ont montré un basculement frustration > sentiment de découverte. Le plafond est *souple* (modulable de ±5% selon le système), pas rigide.

### Critère d'arbitrage avant ajout

Avant qu'un nouveau secret soit accepté en 🔴 Cachée totale, il doit passer le test :

> *« Si ce secret n'existait pas, le système serait-il moins riche ? »*

- **Oui** → 🔴 Cachée totale légitime.
- **Non** → 🟡 Indicé ou 🟢 Visible.

### Application par système — référence canonique

| Système | 🟢 Visible | 🟡 Indicé | 🔴 Cachée totale |
|---|---|---|---|
| Maîtrise d'arme | Niveaux 1-4 | Niveau 5 (Maître) | Technique signature unique |
| Magie / Voies | Découverte de la Voie | Niveaux profonds | Voies non listées, fusion partielle |
| Métiers | Niveaux 1-4 | Niveau 5 (Maître) | Recettes légendaires |
| Donjons | Accès standard | Donjons à condition | Donjons-fantômes (existence non documentée) |
| Quêtes | Quêtes IA générées | Quêtes de rédemption | Quêtes uniques par Partie |
| Cosmologie | Éternels + Cosmiques | Intermédiaires | Célestes secondaires |

---

## Monétisation — spec produit

### Modèle économique canonique

| Composant | Statut | Détail |
|---|---|---|
| **Abonnement mensuel** | Actif | Accès complet au jeu. Pas de free-to-play. |
| **Cosmétiques** | Actif | Apparences, skins d'armes/armures, effets visuels, montures cosmétiques |
| **Avantages de puissance à l'achat** | **Interdit** | Aucun stat, aucune progression, aucun raccourci de puissance vendu |
| **Boost XP / Labeur / ressources** | **Interdit** | Pas de pay-to-progress |
| **Loot boxes / gachas** | **Interdit** | Aucune mécanique de hasard payante |

### Règle d'arbitrage monétisation

```
Toute proposition d'item monétisable doit répondre OUI aux 3 questions :
  1. Est-ce purement esthétique (zéro impact gameplay) ?
  2. L'absence de cet item ne désavantage-t-elle aucun joueur ?
  3. L'item respecte-t-il la cohérence visuelle des continents et des Ères ?
Si une seule réponse est NON → refus.
```

---

## Audience cible — segmentation

| Segment | Description | Priorité |
|---|---|---|
| **Primaire** | Joueurs RPG / Histoire — immersion, incarnation, légende long terme | P0 |
| **Secondaire** | Explorateurs / théoriciens — lore, secrets, prédiction | P1 |
| **Secondaire** | Artisans / sociaux — métiers, guildes, économie | P1 |
| **Tertiaire** | Compétiteurs PvP / raid hardcore | P2 (servis sans être prioritaires) |

**Règle d'inclusion** : la profondeur doit récompenser l'investissement *sans punir* ceux qui jouent moins. Toute mécanique qui crée un écart irrattrapable entre joueur P0 actif et joueur P0 occasionnel doit être revue.

---

## Points de calibrage à playtester

- [ ] Plafond 20% conditions cachées totales — ressenti "découverte" vs "frustration"
- [ ] Modèle abonnement seul vs abonnement + cosmétiques — viabilité économique
- [ ] Application des 3 piliers comme filtre — grille d'arbitrage formalisée ou jugement éditorial
- [ ] Cible audience P0 — proportion atteinte sur la cohorte pre-alpha

---

## Décisions actées (produit)

- ✅ PC uniquement, pas de portage console au lancement
- ✅ Abonnement mensuel + cosmétiques, **zéro pay-to-win**
- ✅ Une seule Partie mondiale, durée 1 à 2 ans
- ✅ Plafond souple de 20% en conditions cachées totales par système
- ✅ Test d'arbitrage à 3 questions pour les nouveaux secrets
- ✅ Audience primaire RPG/Histoire, profondeur sans punir le casual

---

*Liens narratifs : [[Vision]] | [[Univers]] | [[Personnage]] | [[La Partie]]*
*Liens techniques : [[OWS Architecture]] | [[Souffle System]] | [[Quest System]] | [[Weapon Mastery]]*
