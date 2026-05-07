---
tags: [pnj, comportement, routine, ia, système, ébauche]
type: behavior-template
status: ébauche
last_review: 2026-05-01
needs_review_for: [concepts-fondamentaux, modulation-mbti-routine, paramétrage-horaires]
---

> [!warning] Ébauche narrative — pas encore une spec technique
> Ce template suppose un modèle d'IA, de mémoire, de personnalité et de simulation qui ne sont pas encore tranchés. Voir [[Concepts Fondamentaux IA PNJ]] pour les 20 questions à arbitrer.

# 🌅 Routine Quotidienne — Template générique

> Template de comportement quotidien standard pour un PNJ urbain ou villageois. Adapté pour artisans, marchands, fermiers, citoyens ordinaires. Sert de **squelette** : chaque métier (Forgeron, Boulanger, etc.) hérite de cette routine et la spécialise.

---

## Vue d'ensemble

```
[06:00] ─ Réveil
   ↓
[07:00] ─ Aller au travail
   ↓
[08:00–12:00] ─ Travailler (boucle métier)
   ↓
[12:00–13:00] ─ Pause du midi (manger, repos)
   ↓
[13:00–18:00] ─ Retravailler (boucle métier)
   ↓
[18:00] ─ Retourner chez soi
   ↓
[19:00–22:00] ─ Loisir / vie sociale (taverne, famille, prière, lecture)
   ↓
[22:00] ─ Dormir
   ↓ (boucle 24h)
```

> Heures données comme **valeurs par défaut**. À paramétrer par PNJ (chaque PNJ a ses horaires propres).

---

## Décomposition en tâches

### Tâche 1 — Se réveiller à une certaine heure

- **Trigger** : horloge globale = `wake_time` (paramètre PNJ, par défaut 06:00)
- **Action** : changer animation (lit→debout), changer état `awake = true`
- **Sortie** : prêt à exécuter Tâche 2

### Tâche 2 — Aller au travail

- **Trigger** : `awake = true` ET horloge ≥ `work_start - 1h`
- **Action** : pathfinding domicile → lieu de travail (`workplace_location`)
- **Conditions** : éviter zones dangereuses (état du monde), prendre route habituelle
- **Sortie** : arrivé au lieu de travail

### Tâche 3 — Travailler (matin)

- **Trigger** : arrivé au lieu de travail ET horloge ∈ [`work_start`, `lunch_start`]
- **Action** : boucle de tâches métier (voir [[Forgeron]], [[Boulanger]], etc.)
- **Sortie** : `lunch_start` atteint

### Tâche 4 — Faire la pause du midi

- **Trigger** : horloge ≥ `lunch_start` (par défaut 12:00)
- **Action** : aller à la taverne / chez soi / lieu de pause, animation manger, durée ~1h
- **Sortie** : `lunch_end` atteint (par défaut 13:00)

### Tâche 5 — Retravailler (après-midi)

- **Trigger** : horloge ∈ [`lunch_end`, `work_end`]
- **Action** : reprendre boucle métier
- **Sortie** : `work_end` atteint (par défaut 18:00)

### Tâche 6 — Retourner chez soi

- **Trigger** : horloge ≥ `work_end`
- **Action** : pathfinding lieu de travail → domicile
- **Sortie** : arrivé chez soi

### Tâche 7 — Loisir / vie sociale *(optionnelle)*

- **Trigger** : à domicile ET horloge ∈ [`work_end + 1h`, `bed_time - 1h`]
- **Action** : selon `leisure_preference` du PNJ — taverne, famille, prière, lecture, jardinage, social, atelier
- **Conditions** : météo, état social du quartier, présence d'événement local
- **Sortie** : `bed_time` approchant

### Tâche 8 — Dormir à une certaine heure

- **Trigger** : horloge ≥ `bed_time` (par défaut 22:00)
- **Action** : aller au lit, changer animation (debout→couché), changer état `awake = false`
- **Sortie** : boucle au prochain `wake_time`

---

## Paramètres par PNJ

| Paramètre | Type | Valeur par défaut | Notes |
|-----------|------|-------------------|-------|
| `wake_time` | Heure | 06:00 | Variable par profession (boulanger 04:00, voleur 14:00) |
| `work_start` | Heure | 08:00 | Variable |
| `lunch_start` | Heure | 12:00 | |
| `lunch_end` | Heure | 13:00 | |
| `work_end` | Heure | 18:00 | |
| `bed_time` | Heure | 22:00 | Variable |
| `workplace_location` | Coord | — | Forge, four, atelier, champ, marché… |
| `home_location` | Coord | — | Maison du PNJ |
| `leisure_preference` | Enum | `taverne` | `taverne` · `famille` · `prière` · `lecture` · `social` · `atelier` · `jardinage` · `aucun` |
| `work_metier` | Enum | — | Pointeur vers fichier métier ([[Forgeron]] etc.) |
| `weekend_pattern` | Enum | `repos` | `repos` · `marché` · `prière` · `chasse` · `aucun` (pas de week-end) |

---

## Modulations et exceptions

### Selon l'ère active

Les ères ([[Les Ères]]) modulent la routine :

| Ère type | Effet typique |
|----------|---------------|
| Ombre Longue (Noctis) | Couvre-feu, rentrer plus tôt, prier plus |
| Verdoiement (Terranu) | Travail prolongé en extérieur, fêtes |
| Sommeil de Glace (Climata) | Rester chez soi, hiver intensifié |
| Crépuscule (transition) | Anxiété, processions, foules |
| Vents (Aerion) | Voyages, marché itinérant, rumeurs |

### Selon le contexte local

| Trigger | Effet |
|---------|-------|
| Attaque sur la ville | Bascule sur template `Réaction Crise` (à définir Phase 2) |
| Festival local | Bascule sur template `Festivité` |
| Présence d'un joueur en interaction | Bascule sur [[Modes Sociaux]] §Marchand ou §Dialogue |
| Pluie / tempête | Réfugier intérieur, retarder pathfinding extérieur |

---

## Stratégie d'implémentation

- **Behavior Tree principal** : la routine quotidienne est l'arbre racine
- **Modes superposés** : [[Modes Sociaux]] (file indienne, marchand, dialogue) sont des sous-arbres qui prennent le contrôle quand une condition d'entrée est remplie
- **Métiers** : la Tâche 3 et 5 délèguent à un sous-arbre métier ([[Forgeron]], etc.)
- **Variation entre PNJ** : NPC Generator instancie un PNJ avec ses paramètres (horaires, métier, préférence loisir) ; deux PNJ avec le même métier diffèrent par paramétrage

---

## Décisions ouvertes

- **Cycle de 24h ou cycle d'ère ?** Hybelior a un Time of Day mais aussi des ères pluri-mensuelles. La routine quotidienne est jour/nuit ; les ères modulent par-dessus.
- **Granularité du week-end** : Hybelior a-t-il un calendrier hebdomadaire ? Mensuel ? Lié aux ères ?
- **Routines spéciales** : enfants (école), retraités (pas de travail), nomades (déplacement entre villes), bateau (cycle de marées) — à templater Phase 2

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Modes Sociaux]] · [[Forgeron]] · [[Boulanger]] · [[Architecture Data-Driven]] · [[Les Ères]]*
