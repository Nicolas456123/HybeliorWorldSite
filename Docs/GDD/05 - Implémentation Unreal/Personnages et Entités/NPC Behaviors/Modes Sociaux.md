---
tags: [pnj, comportement, modes, ia, système, ébauche]
type: behavior-template
status: ébauche
last_review: 2026-05-01
needs_review_for: [concepts-fondamentaux, modulation-mbti-modes, interaction-ui-mapping]
---

> [!warning] Ébauche narrative — pas encore une spec technique
> Voir [[Concepts Fondamentaux IA PNJ]] pour les 20 questions à arbitrer (notamment §1 modèle d'IA et §6 personnalité MBTI).

# 🎭 Modes Sociaux — Comportements superposables

> Les **modes sociaux** sont des sous-arbres de comportement qui se superposent à la [[Routine Quotidienne]] d'un PNJ quand une condition d'entrée est remplie. Plusieurs modes peuvent être actifs simultanément si compatibles (ex. file indienne + en attente d'interaction marchand).

---

## Mode 1 — File indienne

> Le PNJ fait la queue derrière un autre PNJ ou joueur. Sert pour les boulangeries, échoppes, guichets, événements.

### Tâches

| Étape | Trigger | Action | Sortie |
|-------|---------|--------|--------|
| 1 | PNJ arrive au point d'entrée d'une file (`queue_marker`) | S'arrête, oriente regard vers personne devant | Attente |
| 2 | Personne devant ne bouge pas depuis ≥ 0.5s | Maintenir position, animation `idle_attente` | — |
| 3 | Personne devant avance ou disparaît | Avancer d'un pas (`pas_de_queue`) vers le marker suivant | Reboucle étape 2 |
| 4 | PNJ arrive au début de la file | Sortir du mode file indienne, déclencher action de fin (interaction marchand, paiement, départ) | Exit |
| 5 | Patience dépassée (timeout `queue_patience`) | Sortir de la file, abandon, possibilement râler | Exit anormal |

### Paramètres

| Paramètre | Valeur par défaut | Notes |
|-----------|-------------------|-------|
| `pas_de_queue` | 1 m | Distance d'avance par cran |
| `queue_patience` | 5 minutes | Avant abandon |
| `idle_attente_anim` | `idle_neutre` | Animation par défaut |
| `attitude` | `neutre` | `pressé` · `détendu` · `irrité` · `neutre` (module l'animation et la patience) |

### Cas particuliers

- **Joueur dans la file** : le PNJ accepte d'être derrière un joueur (joueur compte comme une "personne devant")
- **Joueur tente de couper la file** : déclencher réaction selon `attitude` (silence, soupir, plainte, agression)
- **File qui se déplace** (marché itinérant) : le `queue_marker` peut bouger ; les PNJ suivent

---

## Mode 2 — Marchand

> Le PNJ tient une échoppe, attend les clients, déclenche l'UI commerciale à l'interaction.

### Tâches

| Étape | Trigger | Action | Sortie |
|-------|---------|--------|--------|
| 1 | PNJ ouvre la boutique (déclenché par routine métier) | Disposer les marchandises (animation + état boutique = ouverte) | Idle marchand |
| 2 | Pas d'interaction | Animation `idle_marchand` (regarder l'allée, ranger, parler à voisin) | Boucle |
| 3 | Joueur ou PNJ s'approche à `interaction_distance` | Tourner regard vers le client, animation `salutation` | Pré-interaction |
| 4 | Client lance l'interaction (touche / clic) | Lancer dialogue d'accueil, ouvrir UI commerciale | Mode Dialogue + UI active |
| 5 | UI fermée OU client s'éloigne | Animation `au revoir`, retour à étape 2 | Idle marchand |
| 6 | Heure de fermeture | Ranger marchandises, fermer boutique, retour [[Routine Quotidienne]] | Sortie mode |

### Paramètres

| Paramètre | Valeur par défaut | Notes |
|-----------|-------------------|-------|
| `interaction_distance` | 2 m | Détection du client |
| `inventory_template` | — | Pointeur vers stock du marchand (Loot Generator paramétré) |
| `pricing_modifier` | 1.0 | Marge appliquée aux prix de base ; varie par marchand et par ère |
| `accepted_currencies` | `[Éclat]` | Possibilité de troc selon métier |
| `dialogue_template` | `marchand_standard` | Branchable avec dialogues spécialisés |

### UI commerciale (rappel — voir [[Interface]])

Quand le mode marchand déclenche l'interaction :

1. UI s'affiche (panneau commerce)
2. Joueur voit l'inventaire du marchand + ses propres ressources
3. Achat / vente via boutons
4. Fermeture par touche Échap ou bouton

---

## Mode 3 — Dialogue *(template, à formaliser Phase 2)*

> Le PNJ entre en conversation avec un joueur ou un autre PNJ. Branche les arbres de dialogue (gestion par Quest Generator + Dialogue Component).

### Tâches résumées

1. Joueur initie l'interaction → PNJ tourne, salue
2. Affichage UI dialogue (texte + choix)
3. Choix joueur → branche d'arbre de dialogue
4. Fin → PNJ retour idle ou mode social précédent

> Détails à étoffer en Phase 2 (formats des arbres de dialogue, conditions, intégration quêtes).

---

## Mode 4 — Réaction Crise *(template embryonnaire)*

> Bascule de comportement quand une menace arrive (combat, attaque magique, créature, désastre).

| Réaction | Trigger | Effet |
|----------|---------|-------|
| Fuite | Menace létale détectée à < 10 m | Pathfinding vers `safe_location`, abandon mode actuel |
| Cache | Menace lointaine, pas le temps de fuir | Se cacher derrière obstacle proche |
| Combat | PNJ Garde / Soldat / certains métiers | Engager la menace, tirer arme |
| Cri d'alarme | PNJ Civil témoin | Crier, alerter Gardes, paniquer |
| Soin | PNJ Healer / Religieux | Aider blessés alentour |

> À formaliser Phase 2 / 3 — interaction avec [[Combat]] et [[Mort]].

---

## Composabilité des modes

Tableau de compatibilité (ce qui peut tourner en parallèle) :

| Mode actif ↓ \ Compatible avec → | Routine | File | Marchand | Dialogue | Crise |
|----------------------------------|---------|------|----------|----------|-------|
| **Routine** | — | ✅ | ✅ | ✅ | ❌ (Crise prend le relais) |
| **File** | ✅ | — | ❌ (mutually exclusive) | ❌ | ❌ |
| **Marchand** | ✅ | ❌ | — | ✅ (sous-état du marchand) | ❌ |
| **Dialogue** | ✅ | ❌ | ✅ | — | ❌ |
| **Crise** | Override | Override | Override | Override | — |

---

## Décisions ouvertes

- **Marchand itinérant** : variant de Mode Marchand où la boutique se déplace (caravan, colporteur). Trigger d'ouverture/fermeture lié au lieu plutôt qu'à l'heure.
- **Dialogue dynamique** : un PNJ peut-il avoir des dialogues qui changent selon l'ère active, les actions du joueur dans le passé, ou les rumeurs locales ? (Probablement oui — branche sur Quest Generator)
- **Salutation différenciée** : selon réputation du joueur (Reconnaissance, Renom — voir [[Registre des Décisions]] §D-GDD-RECONNAISSANCE)

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Forgeron]] · [[Boulanger]] · [[Interface]] · [[Combat]]*
