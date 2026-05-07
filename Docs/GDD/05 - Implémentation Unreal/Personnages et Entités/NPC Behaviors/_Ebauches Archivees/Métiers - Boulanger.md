---
tags: [pnj, comportement, métier, boulanger, ia, système, ébauche]
type: behavior-template
status: ébauche
last_review: 2026-05-01
needs_review_for: [concepts-fondamentaux, modulation-mbti-boulanger, recettes-pain-spécialités]
---

> [!warning] Ébauche narrative — pas encore une spec technique
> Voir [[Concepts Fondamentaux IA PNJ]] pour les 20 questions à arbitrer.

# 🥖 Métier PNJ — Boulanger

> Comportement métier d'un PNJ Boulanger. Hérite de [[Routine Quotidienne]] mais avec un cycle inversé (lever **très tôt**, préparation pré-aube, ouverture matinale, fermeture l'après-midi). Le mode marchand est central — le boulanger est avant tout un vendeur.
>
> Métier source : voir [[Métiers]] §Boulanger pour le métier joueur correspondant.

---

## Cycle quotidien — vue d'ensemble

```
[03:00 — Lever]
   ↓
[03:30–06:30 — Préparation du pain (cuisson, simulation)]
   ↓
[07:00 — Ouverture boulangerie]
   ↓
[07:00–14:00 — Mode Marchand (vente)]
   ↓
[14:00 — Fermeture boulangerie]
   ↓
[14:00–18:00 — Pause / approvisionnement / livraisons]
   ↓
[18:00 — Repas + loisir]
   ↓
[20:00 — Coucher (tôt)]
```

> Cycle court mais intense. Le boulanger ouvre 2-3h avant les autres PNJ et ferme avant la fin de journée.

---

## Décomposition en tâches

### T1 — Attendre pour simuler la préparation du pain

- **Trigger** : `wake_time` atteint (par défaut 03:00)
- **Action** : entrer dans la boulangerie (zone `bakery_back`), animation `pétrir` / `enfourner` / `surveiller_four`, durée totale paramétrable
- **Effets visuels** : fumée des cheminées, lumière intérieure allumée pré-aube
- **Effets sonores** : pétrissage, four qui crépite
- **Sortie** : `prep_done = true` à `opening_time`

### T2 — Ouvrir la boulangerie à une certaine heure

- **Trigger** : `prep_done = true` ET horloge ≥ `opening_time`
- **Action** : animation `ouvrir_volets`, déplacer vers `counter_position`, sortir l'écriteau "Ouvert", remplir `inventory_marchand` avec les pains du jour
- **État** : boutique ouverte, prêt à vendre
- **Sortie** : transition vers Mode Marchand

### T3 — Passer en mode marchand

- **Trigger** : boutique ouverte
- **Action** : bascule sur sous-arbre [[Modes Sociaux]] §Marchand
- **Conditions** : reste actif jusqu'à `closing_time` ou stock épuisé
- **Sortie** : vers T4 quand fermeture ou rupture stock

### T4 — Fermer la boulangerie

- **Trigger** : horloge ≥ `closing_time` (par défaut 14:00) OU `inventory_marchand` vide
- **Action** : animation `fermer_volets`, ranger comptoir, mettre l'écriteau "Fermé"
- **Sortie** : passage en pause/approvisionnement (post-cycle)

### T5 — Approvisionnement / livraisons *(post-fermeture)*

- **Trigger** : boulangerie fermée
- **Action** : selon disponibilité — aller au moulin chercher de la farine ([[Sources de Ressources]] §Fabrication §Farine), livrer pains à des clients réguliers (auberges, nobles), ou faire pause
- **Sortie** : retour à domicile pour [[Routine Quotidienne]] §Loisir

---

## Paramètres du PNJ Boulanger

| Paramètre | Type | Valeur par défaut | Notes |
|-----------|------|-------------------|-------|
| `bakery_back` | Coord | — | Zone arrière (four, pétrin) |
| `counter_position` | Coord | — | Comptoir de vente |
| `flour_supply` | Coord | — | Stock de farine |
| `wake_time` | Heure | 03:00 | Très tôt |
| `prep_duration` | Sec | 14400 (4h) | Durée préparation simulation |
| `opening_time` | Heure | 07:00 | |
| `closing_time` | Heure | 14:00 | |
| `bed_time` | Heure | 20:00 | Tôt aussi |
| `inventory_marchand` | Inv | Pains du jour | Voir [[Catégories d'Items]] §Consommable |
| `daily_recipes` | List | `[Pain commun, Brioche]` | Évolue avec mastery PNJ |
| `mastery_level` | Enum | `Initié` | Voir [[Métiers]] §Boulanger |

---

## Stock initial typique

| Pain | Tier | Effet | Conservation |
|------|------|-------|--------------|
| Pain commun | Commun | Restaure stamina | 1 jour |
| Pain de campagne | Façonné | Restaure stamina + buff léger | 2 jours |
| Brioche | Façonné | Buff stamina + buff social | 1 jour |
| Pain noir / aux céréales rares | Œuvré | Buff stamina + résistance froid | 3 jours |
| Pain rituel | Magistral+ | Effet spécial selon religion | 1 jour |

> Stock croît en variété et qualité avec `mastery_level`. Voir [[Sources de Ressources]] §Fabrication §Farine pour intrants. Boulanger Maître peut produire des pains rituels [[Religions/Rota Mundi]] / [[Religions/Foedus Animae]].

---

## Modulations

### Selon le contexte

| Trigger | Effet |
|---------|-------|
| File de clients > 5 | Anim `débordé`, accélérer rythme vente |
| Joueur arrive à 14:01 | Possibilité "j'ai encore un pain" si chance, ou "désolé fermé" |
| Festival local | Pains spéciaux (gâteaux), prix x1.5, ouverture prolongée |
| Pénurie de farine (économie) | Stock réduit, prix augmentés, certains pains indisponibles |

### Selon l'ère

| Ère type | Effet |
|----------|-------|
| Verdoiement (Terranu) | Récolte céréales abondante, +20% production |
| Sommeil de Glace (Climata) | Céréales rares, focus pains de conservation, prix x1.3 |
| Vents (Aerion) | Rumeurs, chants en cuisine, recette "Pain du Voyageur" |
| Brume Mortelle | Ouverture limitée, peur, pains rituels |

---

## Hooks pour Phase 2

- **Variants régionaux** : pain de Galenor (impérial, gros), pain d'Alkaran (noir, dur, longue conservation), pain de Cendara (épicé, volcanique), pain d'Onara (sacré, en spirale)
- **Boulangers signature** : nommer 2-3 boulangers exceptionnels par grande ville (Phase 4)
- **Apprenti** : sous-PNJ qui prépare la pâte, monté en mastery progressif
- **Lien social** : le boulanger est un point d'information / rumeur dans une ville (lien avec [[Modes Sociaux]] §Dialogue)
- **Recettes complètes** : Phase 3 — chaque pain a sa recette précise (intrants, palier mastery requis, durée)

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Forgeron]] · [[Métiers]] · [[Catégories d'Items]] · [[Sources de Ressources]]*
