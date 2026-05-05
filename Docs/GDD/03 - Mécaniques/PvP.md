---
tags: [pvp, combat, zones, karma]
status: validated
last_review: 2026-05-01
needs_review_for: [seuils-karma-playtest]
type: mechanic
---

# ⚔️ PvP

## Structure des zones

| Zone | PvP | Description |
|------|-----|-------------|
| 🏘️ **Zones sûres** (villes) | ❌ Désactivé | Aucune attaque possible |
| 🌲 **Zones sauvages** | ⚑ Flag optionnel | Le joueur active son flag → devient attaquable |
| 🏟️ **Arène** | ✅ Structuré | Duels, équipes, tournois |
| 🏰 **Guerres de factions** | ✅ Organisé | Batailles pour le contrôle de zones |

---

## Flag PvP

> [!note] Système de flag volontaire
> Le joueur **choisit** d'activer son statut PvP.
> - Flag actif → attaquable par tout joueur ayant son propre flag actif
> - Activation **immédiate**, désactivation avec **délai de 30 secondes** hors combat
> - **Récompenses supplémentaires** tant que le flag est actif (risque = récompense)

### Récompenses du flag actif

| Bonus | Valeur |
|-------|--------|
| **XP de combat (PvE)** | +10% |
| **XP de maîtrise** | +10% |
| **Récolte / Drop de ressources** | +15% en zone sauvage |
| **Drop de monstres élites** | +5% chance d'item rare |
| **Découverte d'événements** | +20% de probabilité de déclencher des événements rares dans la zone |

> [!tip] Lecture du choix
> Le flag est volontaire mais réellement récompensé. Cela évite les zones PvP désertes et donne du sens au risque.

---

## Conséquences de la mort en PvP

Identiques au PvE → [[Mort]]

> [!success] Pas de drop d'items — ni en PvP, ni en PvE

---

## Arène & Tournois

- ⚔️ Duels 1v1
- 👥 Combats en équipe
- 🏆 Tournois avec classements et récompenses cosmétiques uniques

---

## Karma — Le Statut Rouge

> [!warning] PKing répété = conséquences croissantes
> Un joueur qui attaque trop de joueurs **non-consentants** (sans flag) accumule du **karma négatif** et devient progressivement une cible publique.

### Qu'est-ce qu'un kill non-consenti ?

> [!important] Définition stricte
> Un kill compte comme **non-consenti** uniquement si :
> - La cible **n'avait pas son flag PvP actif**, ET
> - L'attaque a été initiée par le tueur (ne pas confondre avec la légitime défense)
> - Le joueur n'était pas en statut rouge au moment du combat
>
> Tuer un joueur flag-vs-flag, ou tuer un rouge, ne donne **jamais** de karma négatif.

### Paliers de karma

| Palier | Seuil | Effets |
|--------|-------|--------|
| **🟢 Neutre** | 0 pt | Aucune marque, comportement normal |
| **🟡 Suspect** | 1–2 kills NC en 24h | Marque visible jaune, perte légère de Reconnaissance, certains gardes méfiants |
| **🟠 Hors-la-loi** | 3–5 kills NC en 48h | Marque orange, attaquable sans pénalité, gardes hostiles dans certaines villes, accès aux services réduit |
| **🔴 Rouge** | 6+ kills NC en 72h *ou* meurtre d'un PNJ majeur | **Attaquable par tous**, banni de toutes les villes majeures, **bounty actif** (voir ci-dessous) |
| **⚫ Banni** | 15+ kills NC sans rédemption | Toutes les factions hostiles, bounty maximum, accès uniquement aux camps de hors-la-loi |

> [!note] Les seuils décrémentent dans le temps — un joueur peut redescendre naturellement.

### Bounty — Mise à prix

| Statut | Récompense pour le tueur |
|--------|--------------------------|
| 🟠 Hors-la-loi | 50 Éclats |
| 🔴 Rouge | 200 Éclats + cosmétique de chasseur |
| ⚫ Banni | 1 000 Éclats + titre "Justicier" temporaire |

> [!tip] Bounty progressif et plafonné
> La récompense est financée par le pot des taxes de l'hôtel des ventes (gold sink → [[Économie#Gold sinks]]). Un même tueur ne peut toucher la prime sur la même victime que **1 fois par 24h**.

### Diminution du karma

| Action | Effet |
|--------|-------|
| **Temps sans kill NC** | -1 kill / 12h réelles de jeu actif |
| **Quête de rédemption** (faction) | -2 kills, requiert une quête longue par faction |
| **Don à une œuvre** (église / faction) | -1 kill par 500 Éclats donnés (plafonné à 1 par 24h) |
| **Mort en tant que rouge/banni** | -1 kill (purification par la chair) |

> [!tip] Double lecture
> Le statut rouge est à la fois une **punition** et une **identité de jeu** pour les joueurs qui choisissent l'outlaw. Le système ne les exclut pas — il les force juste à jouer dans des zones spécifiques (camps de hors-la-loi, frontières).

---

> [!success] Décisions prises
> - ✅ Récompenses du flag PvP actif (+10% XP, +15% récolte, +5% drop rare, +20% events rares)
> - ✅ Seuils de karma chiffrés (1-2 / 3-5 / 6+ / 15+)
> - ✅ Bounty progressif (50 / 200 / 1000 Éclats)

---

*Liens : [[Mort]] | [[Guildes]] | [[Univers]]*
