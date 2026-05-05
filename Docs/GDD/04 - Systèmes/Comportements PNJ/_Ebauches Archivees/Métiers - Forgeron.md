---
tags: [pnj, comportement, métier, forgeron, ia, système, ébauche]
type: behavior-template
status: ébauche
last_review: 2026-05-01
needs_review_for: [concepts-fondamentaux, modulation-mbti-forgeron, animations-uniques, sons]
---

> [!warning] Ébauche narrative — pas encore une spec technique
> Voir [[Concepts Fondamentaux IA PNJ]] pour les 20 questions à arbitrer.

# 🔨 Métier PNJ — Forgeron

> Comportement métier d'un PNJ Forgeron. Hérite de [[Routine Quotidienne]] et spécialise les Tâches 3 et 5 (travail matin/après-midi) avec la **boucle de forge**. Une fois ouvert, le forgeron peut aussi basculer en [[Modes Sociaux]] §Marchand pour vendre ses œuvres.
>
> Métier source : voir [[Métiers]] §Forgeron pour le métier joueur correspondant.

---

## Boucle de forge — vue d'ensemble

```
[Récupérer matériel + marteau]
       ↓
[Aller au four]
       ↓
[Faire chauffer le métal]
       ↓
[Aller à l'enclume]
       ↓
[Tapper le fer]
       ↓
[Plonger dans l'eau (trempe)]
       ↓
[Poser la pièce finie]
       ↓ (boucle ou nouvelle pièce)
```

---

## Décomposition en tâches

### T1 — Récupérer du matériel et le marteau

- **Trigger** : début de session de forge (work_start ou reprise post-pause)
- **Action** : pathfinding vers `material_storage` (coffre / râtelier) → animation `prendre_matériau` → équiper marteau (`tool_marteau`) → état `matériau_carried = true`
- **Conditions** : `material_storage` contient au moins une pièce de matériau (Lingot ou Alliage). Si vide, basculer sur sous-tâche `commander_matériau` ou idle.
- **Sortie** : matériau et marteau en main, prêt à aller au four

### T2 — Aller au four

- **Trigger** : `matériau_carried = true`
- **Action** : pathfinding vers `forge_furnace` (position du four), animation marche
- **Sortie** : devant le four

### T3 — Faire chauffer le métal

- **Trigger** : devant le four
- **Action** : animation `placer_metal_dans_four` → boucle d'attente avec animation `attiser_feu` (durée `heating_time`, par défaut 5 secondes gameplay) → animation `extraire_metal_chaud`
- **Effets visuels** : VFX particules → métal devient rouge → fumée
- **Sortie** : métal incandescent en main, prêt pour l'enclume

### T4 — Aller à l'enclume

- **Trigger** : métal incandescent en main
- **Action** : pathfinding vers `forge_anvil`, animation marche rapide (le métal refroidit)
- **Conditions** : si trajet > `cooldown_metal_time` (par défaut 8 secondes), métal trop froid → retour T3
- **Sortie** : devant l'enclume

### T5 — Tapper le fer

- **Trigger** : devant l'enclume avec métal chaud
- **Action** : boucle d'animations `frapper_marteau` (3 à 5 coups), avec sons d'impact, étincelles, déformation visuelle progressive de la pièce
- **Conditions** : entre chaque coup, vérifier température du métal ; si trop froid, retour T3 (refonte)
- **Sortie** : pièce forgée brute, prête pour la trempe

### T6 — Plonger dans l'eau (trempe)

- **Trigger** : pièce forgée brute en main
- **Action** : pathfinding vers `forge_water_basin`, animation `plonger_pièce_eau`, VFX vapeur, son de sifflement
- **Sortie** : pièce trempée

### T7 — Poser la pièce

- **Trigger** : pièce trempée
- **Action** : pathfinding vers `finished_pieces_rack` (ou directement comptoir si en mode marchand), animation `poser_pièce`, ajout de la pièce dans le `inventory_marchand` ou `material_storage`
- **Sortie** : pièce livrée — boucle vers T1 si encore du matériau dispo, sinon idle ou mode marchand

---

## Paramètres du PNJ Forgeron

| Paramètre | Type | Valeur par défaut | Notes |
|-----------|------|-------------------|-------|
| `forge_furnace` | Coord | — | Position du four de la forge |
| `forge_anvil` | Coord | — | Position de l'enclume |
| `forge_water_basin` | Coord | — | Position du baquet à trempe |
| `material_storage` | Coord | — | Râtelier / coffre des matériaux bruts |
| `finished_pieces_rack` | Coord | — | Présentoir des pièces finies |
| `heating_time` | Sec | 5 | Temps de chauffe (à l'écran) |
| `cooldown_metal_time` | Sec | 8 | Temps avant que le métal soit trop froid |
| `inventory_marchand` | Inv | — | Stock pour vente quand en mode marchand |
| `mastery_level` | Enum | `Initié` | Novice / Initié / Adepte / Expert / Maître — voir [[Armes et Maîtrise]] |
| `wake_time` | Heure | 05:00 | Forgerons ouvrent tôt |
| `work_start` | Heure | 06:00 | |
| `work_end` | Heure | 19:00 | |
| `bed_time` | Heure | 21:00 | |

---

## Effets gameplay

- **Inventaire**: chaque cycle complet de forge produit 1 unité de pièce, type selon `current_recipe` (qui peut tourner — épée, marteau, hache, plastron)
- **Économie**: les pièces du forgeron sont **achetables** par les joueurs (mode marchand, voir [[Modes Sociaux]] §Marchand). Qualité dépend de `mastery_level` du PNJ
- **Mastery PNJ**: progresse au fil du temps de jeu (le forgeron monte en compétence) — voir [[Armes et Maîtrise]] §PNJ
- **Variants par ère**: pendant l'Ère du Feu Endormi (Eldoria), VFX renforcés ; pendant l'Ombre Longue, le forgeron travaille moins (inquiétude)

---

## Modulations

### Selon le contexte

| Trigger | Effet |
|---------|-------|
| Joueur observe à 5 m | Le forgeron continue mais peut saluer / dialoguer entre pièces |
| Joueur interagit | Bascule sur [[Modes Sociaux]] §Marchand |
| Pas de matériau | Idle, parle aux passants, attend livraison |
| Pénurie de minerai (économie) | Travaille au ralenti, prix augmentés |

### Selon l'ère

| Ère type | Effet |
|----------|-------|
| Feu Endormi (Eldoria) | +20% qualité production, +10% chance pièce avec affixe rare |
| Ombre Longue (Noctis) | -10% production, prix minerai augmentés |
| Verdoiement (Terranu) | Volume production normal, focus sur outils agricoles |

---

## Hooks pour Phase 2

- **Spécialisations** : Forgeron d'armes / Forgeron d'armures / Forgeron d'outils — variantes du template
- **Variants nationaux** : forgeron d'Alkaran (style nordique) vs Galenor (style impérial) vs Cendara (style volcanique)
- **Apprenti** : sous-PNJ qui assiste le forgeron, sous-cycle simplifié
- **Animations spécifiques** : à lister + storyboarder en Phase 3
- **Sons** : marteau sur enclume, soufflet, trempe, ambiance — à brancher sur [[Audio System]]

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Métiers - Boulanger]] · [[Métiers]] · [[Armes et Maîtrise]] · [[Sources de Ressources]]*
