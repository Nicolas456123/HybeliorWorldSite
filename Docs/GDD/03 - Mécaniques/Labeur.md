---
tags: [labeur, progression, économie]
status: drafted
last_review: 2026-05-01
needs_review_for: [chiffres-playtest]
type: mechanic
---

# ⚡ Le Labeur

## Concept

> [!important] L'idée centrale
> Dans la vraie vie, on ne peut pas tout faire sans se fatiguer. Le Labeur transpose ça dans le jeu.
>
> **Objectif : donner de la valeur à ce qu'on choisit de faire.**

Le Labeur est une **barre d'énergie quotidienne** qui se vide avec les actions de progression et se régénère chaque jour.

---

## Fonctionnement

```
Barre de Labeur [████████████░░░░░]

Régénération lente en continu (X points / heure)
+ Bonus de régénération si repos en jeu
Labeur épuisé → qualité et efficacité réduites sur TOUTES les actions
               (pas seulement le craft)
```

### Régénération

| Source | Regen |
|--------|-------|
| **Temps réel** | Régénération lente et continue, même hors connexion |
| **Dormir à l'auberge** | Bonus de régénération accélérée |
| **Manger (nourriture de qualité)** | Bonus modéré selon la qualité du repas |
| **Se reposer en camp** | Bonus léger (moins qu'une auberge) |

> [!tip] Cela incite à utiliser les métiers et les auberges — un cuisinier de haut niveau peut préparer des repas qui régénèrent beaucoup de Labeur.

> [!note] Chiffres proposés — à valider en playtest
> Ces valeurs sont des points de départ raisonnables, pas des décisions finales.

| Paramètre | Valeur proposée | Raisonnement |
|-----------|----------------|--------------|
| **Capacité maximale** | **100 points** | Unité de base claire, facile à communiquer au joueur |
| **Regen hors connexion** | **10 pts / heure** | 100% rechargé en 10h (une nuit de sommeil réel) |
| **Regen en connexion (passif)** | **8 pts / heure** | Légèrement moins qu'hors connexion — incite à se déconnecter |
| **Regen à l'auberge (en jeu)** | **+20 pts / heure** soit 28 total | Se coucher à l'auberge = recharge en ~3h45 |
| **Bonus nourriture (qualité normale)** | **+10 pts immédiat** | Repas courant — accessible à tous |
| **Bonus nourriture (qualité rare)** | **+25 pts immédiat** | Repas de cuisinier expert — valeur économique |
| **Bonus camp de repos** | **+5 pts / heure** soit 13 total | Moins qu'une auberge, mais accessible en zone sauvage |

---

## Coûts estimés par action

| Action | Coût | Notes |
|--------|------|-------|
| Combat (XP maîtrise) | **0 pt** | Le combat ne pénalise pas le Labeur |
| Récolte de ressources | **2 pts** | Encouragé — 50 récoltes par barre complète |
| Craft d'un item commun | **5 pts** | 20 crafts par barre complète |
| Craft d'un item rare | **20 pts** | 5 crafts par barre — journée de spécialiste |
| Craft d'un item légendaire | **50 pts** | 2 crafts par barre — 2+ jours si mixte |
| Apprentissage d'une compétence | **15 pts** | ~6 apprentissages par barre |
| Entraînement intensif (hors combat) | **20 pts** | Même poids qu'un craft rare — choisir |

> [!tip] Exemple de journée type
> Un artisan avec 100 pts : récolte x5 (10 pts) + craft rare x2 (40 pts) + craft commun x5 (25 pts) + apprentissage x1 (15 pts) = **90 pts** — journée pleine, 10 pts restants en réserve.

---

## Impact stratégique

> [!tip] Forcer des choix significatifs
> Un joueur qui veut monter son niveau de forge **ET** sa cuisine **ET** sa maîtrise d'épée en une journée devra choisir.
>
> Il n'a pas assez de Labeur pour tout faire au maximum → chaque session de jeu a du poids.

**Ce que ça crée :**
- Des joueurs spécialisés naturellement (pas par contrainte artificielle)
- Une valeur économique au travail des artisans
- Des sessions de jeu significatives même courtes
- Un sens du temps et de l'investissement

---

## Relation avec la décroissance

Le Labeur limite la montée. La **décroissance** (→ [[Armes et Maîtrise]]) limite ce qu'on peut maintenir. Les deux ensemble créent la spécialisation naturelle :

```
Labeur limité  →  Je ne peux pas tout monter vite
Décroissance   →  Je ne peux pas tout maintenir en parallèle
Résultat       →  Je dois choisir mon identité de joueur
```

---

*Liens : [[Personnage]] | [[Armes et Maîtrise]] | [[Progression]] | [[Métiers]]*
