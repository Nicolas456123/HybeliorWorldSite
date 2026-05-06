---
tags: [implementation, ui, hud, controles, accessibilite, specifications]
type: implementation
canonical_concept: "[[Interface]]"
status: drafted
last_review: 2026-05-07
needs_review_for: [mapping-manette, ecrans-details]
---

# UI Specifications — Implémentation

> Page d'implémentation technique du concept narratif **[[Interface]]**.
> Cette page contient les **mockups, layouts, listes de panneaux, raccourcis, règles d'affichage et paramètres d'accessibilité**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Interface]].

---

## HUD en jeu — Layout canonique

**Niveau d'immersion réglable dans les options.** Mode par défaut : **minimal**.

```
┌────────────────────────────────────────────────────┐
│ [Mini-carte]                    [Buffs / Debuffs]  │
│                                                    │
│                   (Monde 3D)                       │
│                                                    │
│ [HP][Stamina][Mana]              [Barre d'actions] │
└────────────────────────────────────────────────────┘
```

### 3 barres ressources seulement

| Barre | Couleur | Visibilité |
|---|---|---|
| HP | Rouge | Toujours |
| Stamina | Verte | Toujours |
| Mana | Bleu | Uniquement si une Voie est active |

**Pas de barre Énergie.** Voir [[Personnage]].

### Bandeau Accord d'ère

Le HUD intègre en bandeau supérieur **L'Accord de l'Ère en cours** (0-100%) plutôt qu'un niveau global classique — voir [[L'Accord]]. La fiche personnage (P) détaille les 4 stats fondamentales et les 8 stats brutes.

### Modes d'affichage HUD

| Mode | HP/Stam/Mana | Mini-carte | Buffs | Barre actions | Bandeau Accord |
|---|---|---|---|---|---|
| **Complet** | toujours | toujours | toujours | toujours | toujours |
| **Réduit** | toujours | sur clic | toujours | toujours | sur clic |
| **Minimal** | sur changement | sur clic | actifs uniquement | toujours | sur clic |
| **Dynamique** | en combat / bas niveau | en exploration | en combat | en combat | hors combat |

**Règle d'or** : HP et Stamina restent **toujours visibles** même en mode immersif (sécurité gameplay).

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

Voir [[Inventory UI]] pour les widgets Unreal associés.

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

Voir [[Skill Bar UI]] pour les widgets Unreal associés.

### Carte (M)

- Carte du continent / monde
- Filtres : marchands / quêtes / points de passage / événements / zones de récolte connues
- Marqueurs personnels du joueur
- Zones inexplorées en brouillard
- Affichage des zones contrôlées par guildes/factions

Voir [[Map UI]] pour les widgets Unreal associés.

### Quêtes (J)

- Quêtes actives / disponibles / terminées
- Génération IA visible avec contexte (zone, faction concernée, conditions)
- Indicateur de quête principale en cours

Voir [[Quest Tracker UI]] pour les widgets Unreal associés.

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

## Règles de design UI (chiffrées / actées)

| Règle | Spécification |
|---|---|
| Densité d'info HUD par défaut | ≤ 5 éléments visibles simultanément (3 barres + bandeau Accord + barre actions) |
| Latence d'apparition d'un widget contextuel | < 150 ms après trigger |
| Tooltip sur item | Délai de 400 ms avant apparition |
| Comparaison item équipable | Affichage automatique côte-à-côte |
| Bascule HUD complet/minimal | Touche Tab, transition fade 200 ms |
| Écran-palier (I/P/M/K/J/O) | Pause de l'input combat, mais pas du monde |
| Barre d'actions | 8 slots maximum, pas d'extension |

---

## Accessibilité — paramètres

### Visuel

| Paramètre | Valeurs |
|---|---|
| Taille de texte | 80% / 100% / 120% / 150% |
| Contraste UI | Standard / Élevé |
| Daltonisme | Aucun / Protanopie / Deutéranopie / Tritanopie |
| Marqueurs de menace (combat) | Couleur + forme (redondance visuelle) |
| Sous-titres dialogues | Off / On / On + nom locuteur |
| Taille sous-titres | 80% / 100% / 120% / 150% |

### Input

| Paramètre | Valeurs |
|---|---|
| Maintien de touche | Maintien réel / Toggle |
| Esquive | Alt + direction / Double-tap direction |
| Remap complet | Toutes les actions remappables |
| Sensibilité souris séparée | X / Y / vise / hors vise |
| Vitesse de clic combo | 80% / 100% / 120% (fenêtre temporelle) |

### Audio

| Paramètre | Valeurs |
|---|---|
| Sliders séparés | Musique / Ambiance / Voix / UI / SFX combat |
| Indicateurs visuels d'audio important | Off / On (pour joueurs sourds/malentendants) |
| Réduction audio combat | Off / On (atténue mix combat de 20%) |

---

## Patterns refusés (interdits par design)

| Pattern MMO classique | Refus | Raison |
|---|---|---|
| Mini-map permanente plein écran | refusé | brise l'attention au monde 3D |
| Quest tracker permanent latéral | refusé | impose un objectif sur la perception du monde |
| Tooltip qui révèle stats cachées | refusé | spoile la découverte |
| Barre d'XP permanente | refusé | pas de niveau global ; remplacé par bandeau Accord |
| Marqueurs ! ? au-dessus des PNJ | refusé | les PNJ sont des présences, pas des distributeurs |
| Damage numbers sur tous les hits permanent | option | activable, désactivé par défaut |

---

## Composants Unreal associés

| Composant | Rôle |
|---|---|
| [[HUD]] | `AHWHUD` — Canvas 2D, floating damage, cooldowns |
| [[HUD Widgets]] | ResourceBars, AbilityCooldowns, Nameplates, UW_Map |
| [[Skill Bar UI]] | `WBP_SkillBar` ajouté au viewport |
| [[Inventory UI]] | Grille items, aperçu 3D, comparaison |
| [[Map UI]] | Carte continent, filtres, marqueurs |
| [[Quest Tracker UI]] | Quêtes actives, génération IA visible |
| [[Dialogue UI]] | Dialogues PNJ |
| [[Nameplate UI]] | `UHWEntityNameplateWidget` world-space |
| [[Login UI]] | Écran de connexion |
| [[UI Other Widgets]] | Widgets divers, CommonUI |
| [[Input Actions]] / [[Input Component]] | Enhanced Input — mapping actions → GA |

---

## Points de calibrage à playtester

- [ ] HUD minimal par défaut — friction perçue ou évidence ?
- [ ] Bandeau Accord à la place d'une barre XP — compris immédiatement ou pas ?
- [ ] Esquive Alt+dir vs double-tap — quel default sert mieux les joueurs casual / hardcore ?
- [ ] Latence apparition widgets contextuels (150 ms) — fluide ou abrupte ?
- [ ] Damage numbers off par défaut — frustrant ou immersif ?
- [ ] Marqueurs PNJ retirés — joueurs perdus ou pas ?

---

## Décisions actées (UI)

- ✅ HUD minimal par défaut, 4 modes au total (complet / réduit / minimal / dynamique)
- ✅ HP + Stamina toujours visibles, même en immersif
- ✅ Mana visible uniquement si Voie active
- ✅ Bandeau Accord d'ère en haut, pas de barre XP/niveau global
- ✅ 8 slots de barre d'actions, pas d'extension
- ✅ Esquive : option Alt+dir / double-tap, choix joueur
- ✅ Tab pour basculer HUD complet/minimal
- ✅ F12 capture sans HUD
- ✅ PvP toggle via Y avec confirmation
- ✅ Pas de marqueur ! ? au-dessus des PNJ
- ✅ Damage numbers désactivables (off par défaut)
- ✅ Remap complet de toutes les actions
- ✅ Sliders audio séparés (Musique / Ambiance / Voix / UI / SFX)
- ✅ Daltonisme : 3 modes + redondance forme/couleur sur menaces

---

*Liens narratifs : [[Interface]] | [[Personnage]] | [[Combat]] | [[L'Accord]]*
*Liens techniques : [[HUD]] | [[HUD Widgets]] | [[Skill Bar UI]] | [[Inventory UI]] | [[Map UI]] | [[Quest Tracker UI]] | [[Input Actions]] | [[Input Component]] | [[Index Interaction UI]]*
