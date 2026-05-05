---
tags: [mécanique, mort, conséquences, reconnaissance, renom]
type: mechanic
status: validated
last_review: 2026-05-01
needs_review_for: []
---

# 💀 Mort & Conséquences

## Principe

> [!warning]
> La mort n'est pas anodine. Elle a un **poids réel** — sans être définitive.

---

## Conséquences de la mort

| Conséquence | Description |
|-------------|-------------|
| 📉 **Perte de progression d'Accord** | Une portion de l'Accord d'ère récemment gagné est perdue. Le **Héritage** (titres, Ères Concordées, monuments) reste intact (voir [[L'Accord]]). |
| 🔧 **Durabilité des items** | Les équipements perdent de la durabilité → à réparer chez un forgeron |
| 🏆 **Perte de Reconnaissance et de Renom** | Baisse de la **Reconnaissance** (privée auprès des factions/guildes) **et** du **Renom** (public sur classements) |
| ~~⚠️ **Malus temporaire**~~ | ❌ **Pas de debuff de stats** — la perte permanente suffit |

> [!success] Ce qu'on ne perd JAMAIS
> ❌ **Aucun drop d'items** — ni en PvE, ni en PvP

---

## Reconnaissance vs Renom — Définitions canoniques

> [!important] Distinction fondamentale (D-GDD-RECONNAISSANCE)
> Les deux métriques sociales sont distinctes et servent des publics différents. À ne **pas** confondre.

### 🎖️ Reconnaissance (privée)

- **Public** : factions du lore, guildes joueurs, PNJ d'une région
- **Visibilité** : interne à la faction/guilde concernée
- **Effet** : ouvre l'accès aux quêtes exclusives, aux services privilégiés, aux Maîtrise_Foi (pour les religions), aux territoires de guilde
- **Récupération** : actions en faveur de la faction/guilde
- **Voir** : [[Factions]] et [[Guildes]]

### 🏆 Renom (public)

- **Public** : tous les joueurs du monde
- **Visibilité** : classements mondiaux, fiche personnage publique, cotes Bourse des Augures
- **Effet** : statut social global, rang dans les classements, recherche par les guildes
- **Récupération** : exploits publics, prédictions vérifiées, Ères Concordées (Héritage)
- **Voir** : [[L'Accord]] (Héritage), [[Prédiction]] (cotes prédicteur)

### Impact de la mort

- Une mort fait baisser la **Reconnaissance** auprès de la faction où elle s'est produite (si applicable)
- Une mort fait baisser le **Renom** dans les classements mondiaux (visible par tous)
- Les deux se regagnent en jouant normalement, indépendamment

---

## Respawn

```
Mort du personnage
       ↓
[Fenêtre de 30 secondes — résurrection possible par allié]
       ↓
Si pas réanimé : Perte d'XP + durabilité + Reconnaissance (permanentes)
       ↓
Respawn au dernier point de passage enregistré
       ↓
Zone sûre la plus proche — reprise immédiate, sans debuff de stats
```

> [!tip] Points de passage
> Hôtelleries, camps, balises de zone — s'enregistrent automatiquement au passage ou manuellement.

---

## Résurrection par allié

> [!note] Voie d'Eldoria uniquement
> Seul un Lié à la **Voie d'Eldoria** peut réanimer un joueur tombé, dans une **fenêtre de 30 secondes** après la mort.

| Élément | Valeur |
|---------|--------|
| **Fenêtre de réanimation** | 30 s après la mort |
| **Coût Mana** | 60% de la barre du sauveur |
| **Temps d'incantation** | 4 s ininterrompues (canalisé) |
| **HP restaurés** | 30% des HP max |
| **Pénalités évitées** | Tout — perte d'Accord, durabilité, Reconnaissance, Renom |
| **Cooldown** | 5 minutes (anti-abus en raid) |

> [!warning] Limite par mort
> Un même cadavre ne peut être réanimé **qu'une seule fois** par session. Si le joueur retombe, il subit les pénalités normales.

---

## Mort répétée — anti-griefing

> [!warning] Spam-mort = pénalité accrue
> Un joueur qui meurt **plusieurs fois en peu de temps** subit une pénalité progressive pour éviter le harcèlement et les exploits.

| Mort dans la fenêtre | Multiplicateur de perte d'Accord |
|----------------------|----------------------------------|
| 1ère mort | ×1 (perte normale) |
| 2e mort en 5 min | ×1.5 |
| 3e mort en 10 min | ×2 |
| 4e+ mort en 15 min | ×2 (plafond) |

> [!note] Pas de pénalité aggravée si la mort vient d'un boss / événement mondial
> Si le joueur meurt face à un boss ou un événement scripté (clairement identifié), le compteur ne s'incrémente pas — pour ne pas punir l'apprentissage des mécaniques.

---

## Mort dans un donjon

| Contexte | Respawn |
|----------|---------|
| **Donjon solo / instancié** | Respawn à **l'entrée du donjon** — l'instance est conservée, le joueur peut réessayer la phase |
| **Donjon en groupe** | Respawn à l'entrée OU à un **point de relai** débloqué dans le donjon — au choix |
| **Boss vaincu, mort hors boss** | Respawn juste avant la salle suivante |
| **Échec total du groupe (wipe)** | Respawn à l'entrée — l'avancement de l'instance est conservé pour 30 min, puis reset |

---

## Mort en PvP

Mêmes conséquences qu'en PvE. **Pas de drop d'items.**

> [!note] Karma PvP
> Le système de karma pour le PKing est géré dans → [[PvP#Karma — Le Statut Rouge]]

---

*Liens : [[Personnage]] | [[Combat]] | [[Progression]] | [[PvP]] | [[L'Accord]] | [[Factions]] | [[Guildes]]*
