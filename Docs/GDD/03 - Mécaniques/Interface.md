---
tags: [mécanique, interface, hud, contrôles]
type: mechanic
status: drafted
last_review: 2026-05-01
needs_review_for: [mapping-manette, écrans-détails]
---

# 🖥️ Interface Utilisateur

## HUD en jeu

> [!note]
> **Minimaliste par défaut.** Niveau d'immersion réglable dans les options.

```
┌────────────────────────────────────────────────────┐
│ [Mini-carte]                    [Buffs / Debuffs]  │
│                                                    │
│                   (Monde 3D)                       │
│                                                    │
│ [HP][Stamina][Mana]              [Barre d'actions] │
└────────────────────────────────────────────────────┘
```

> [!tip] 3 barres seulement
> HP (rouge) · Stamina (verte) · Mana (bleu — visible uniquement si une Voie est active). Plus de barre Énergie. Voir [[Personnage]].

> [!info] Bandeau Accord d'ère
> Le HUD intègre en bandeau supérieur **L'Accord de l'Ère en cours** (0-100%) plutôt qu'un niveau global classique — voir [[L'Accord]]. La fiche personnage (P) détaille les 4 stats fondamentales et les 8 stats brutes.

---

## Contrôles — Clavier / Souris

### Déplacement et caméra
| Action | Touche |
|--------|--------|
| Déplacement | ZQSD / WASD |
| Caméra | Souris |
| Saut | Espace |
| Sprint | Shift maintenu |
| Accroupi | Ctrl |
| Marcher (lent) | Alt maintenu |

### Combat
| Action | Touche |
|--------|--------|
| Attaque légère (main droite) | Clic gauche |
| Attaque légère (main gauche / bouclier) | Clic droit |
| Attaque lourde | Maintenir clic gauche / clic droit |
| Esquive | **Alt + direction** ou **double-tap direction** (option dans les paramètres) |
| Parade (tenue) | Q (ou bouton souris 4) |
| Lock-on / Verrouillage cible | T |
| Switch de cible (en lock) | Molette souris |
| Dégainer / Rengainer | R |
| Méditation (regen Mana hors combat) | F maintenu, immobile |

### Compétences
| Action | Touche |
|--------|--------|
| Compétences 1–8 | 1 à 8 |
| Cibler ground (compétence ciblée) | Maintenir → relâcher |
| Annuler ciblage | Échap pendant ciblage |

### Système / UI
| Action | Touche |
|--------|--------|
| Inventaire | I |
| Fiche personnage | P |
| Carte | M |
| Compétences / Maîtrises | K |
| Quêtes / Journal | J |
| Social (guilde, amis) | O |
| Activer / désactiver flag PvP | **Y** *(confirmation requise)* |
| Émotes | B |
| Chat | Entrée |
| Capture d'écran sans HUD | F12 |
| Bascule HUD complet / minimal | Tab |

---

## Écrans principaux

### Inventaire (I)
- Grille d'items (par catégorie : armes / armures / consommables / matériaux / quête)
- Aperçu 3D du personnage avec équipement
- Comparaison automatique au survol d'un item équipable
- Filtre par rareté / type / niveau requis
- Tri auto-magnétique (option)

### Fiche personnage (P)
- **Bandeau supérieur** : Accord de l'Ère en cours (0-100%), nom de l'ère, paliers atteints
- **HP / Stamina / Mana max** (calculés depuis stats fondamentales + brutes)
- **Couche 0 — 4 stats fondamentales** : Vitalité, Souffle, Présence, Conscience
- **Couche 1 — 8 stats brutes** : Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe (avec marqueur Focus ⭐ sur 1-3 stats)
- Stats dérivées (dégâts, critique, résistances)
- Liste des **maîtrises actives** (armes + Voie + métiers) avec niveau et barre de décroissance
- **Reconnaissance** (privée — auprès des factions/guildes) et **Renom** (publique — classements globaux) — voir [[Mort]]
- **Héritage** : Ères Concordées, titres, œuvres signées, monuments
- Karma PvP (couleur de marque + compteur de kills NC sur fenêtre de 72h)

### Compétences / Maîtrises (K)
- Liste des armes maîtrisées (niveau + récompenses débloquées)
- Voie active (sorts débloqués + arbre de progression visible)
- Métiers (recettes connues, niveau, prochain palier)
- Compétences universelles (cri de guerre, taunt, méditation…)
- Slot d'attribution rapide vers la barre d'action

### Carte (M)
- Carte du continent / monde
- Filtres : marchands / quêtes / points de passage / événements / zones de récolte connues
- Marqueurs personnels du joueur
- Zones inexplorées en brouillard
- Affichage des zones contrôlées par guildes/factions

### Quêtes (J)
- Quêtes actives / disponibles / terminées
- Génération IA visible avec contexte (zone, faction concernée, conditions)
- Indicateur de quête principale en cours

### Social (O)
- Liste d'amis (en ligne / hors ligne)
- Guilde (membres, banque, territoires, événements à venir)
- Factions (réputation actuelle, quêtes disponibles)
- Recherche de groupe (LFG)

### Options
- Graphismes (5 presets + paramètres avancés)
- Son (musique, ambiance, voix, UI séparés)
- Contrôles (remap complet, choix esquive **Alt+dir** vs **double-tap**)
- Immersion (HUD complet / réduit / minimal / dynamique)
- Accessibilité (taille de texte, daltonisme, simplification d'inputs)

---

## Règles de design UI

- Toujours préférer **moins d'informations mieux présentées**
- Le joueur peut **choisir son niveau d'immersion** (HUD minimal ↔ HUD complet)
- Les informations critiques (HP, Stamina) restent toujours visibles même en mode immersif

---

*Liens : [[Personnage]] | [[Combat]] | [[Progression]] | [[L'Accord]]*
