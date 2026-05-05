---
tags: [implementation, ue5, ows, sql, migration, debt]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: [validation-stratégie-migration, schema-DB-sandbox]
implements: [L'Accord, Le Souffle, Les Ères]
---

# Migration Accord

> **Document de stratégie** : décrit la migration sémantique du modèle `CharacterLevel`/`XP` (D&D classique, OWS bootstrap) vers `CurrentEraAccord` + `ConcordedErasCount` (refonte Souffle/Accord/Ères).
> **V3 = documentation seule.** Pas d'implémentation SQL ici. Le refactor effectif sera planifié post-V4.

## Pourquoi

Avant la refonte 2026-04/05, HybeliorWorld utilisait un système classique :

- `CharacterLevel` (1 → ~100) : niveau global du personnage
- `XP` : points d'expérience cumulés
- 10 attributs D&D (Strength, Agility, Constitution, Dexterity, Intellect, Wisdom, Charisma, Fortitude, Reflex, Willpower) avec base ~10
- Récompenses de quêtes : `ExperienceReward` + `GoldReward`
- Maîtrises d'armes : courbe `XP × 1.15^N` exponentielle, `MasteryLevel` int32

La refonte Souffle/Accord/Ères ([[Le Souffle]], [[L'Accord]], [[Les Ères]]) **abandonne le concept de niveau global** au profit d'un système 5-couches :

- **Couche 0** : 4 stats fondamentales (Vitalité, Souffle, Présence, Conscience) — auto
- **Couche 1** : 8 stats brutes (Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe) — par usage, 0-150, **compressées au-dessus de 50**
- **Couche 2** : Maîtrises contextuelles **5 paliers** (Novice → Apprenti → Adepte → Expert → Maître) ; rouille post-Souffle (-15 %, dissipée par usage)
- **Couche 3** : **L'Accord** (0-100 % alignement vectoriel avec l'Ère active ; **pas de reset** au Souffle — dérive avec inertie ~2-4 sem selon similarité Ère(N)↔Ère(N+1) ; titre permanent inscrit si 100 % atteint sur une Ère)
- **Couche 4** : Héritage (Ères Concordées, œuvres signées, titres, monuments)

Cette refonte résout 5 problèmes structurels MMO d'un coup : power creep, barrière à l'entrée, stagnation, wipe brutal, lore détaché.

## Comment — stratégie de migration parallèle (D-MIGRATION-SQL)

### Principe

**Ne pas casser OWS.** OWS bootstrap, OWS2API.h (`FUserCharacter`), tables SQL `Characters`/`CharHasAbilities` etc. continuent de **fonctionner identiquement** côté technique. Aucun breaking change réseau.

`CharacterLevel` et `XP` deviennent des **techniques internes** : utiles pour matchmaking, diff de patch, scaling de difficulté côté serveur, statistiques internes. **Plus jamais exposés au joueur** dans le HUD ou les UI de progression.

### Champs SQL à ajouter (côté `Characters` ou table liée)

| Colonne | Type | Description |
|---|---|---|
| `CurrentEraAccord` | FLOAT (0-100) | Pourcentage d'accord avec l'ère cosmique en cours. Reset à 0 à chaque [[Le Souffle]]. |
| `ConcordedErasCount` | INT | Nombre d'Ères Concordées dans la carrière du personnage (Héritage). |
| `EraAccordsHistory` | JSON ou table liée | Historique : `[{eraId, peakAccord, concorded, finalAt}, ...]`. Utile pour titres permanents et analyse Héritage. |
| `CurrentMasteryRustLevel` | FLOAT | Niveau de rouille post-Souffle (0 = pas de rouille, 0.15 = -15 % juste après Souffle). Décroît avec l'usage. |

> Les colonnes existantes `CharacterLevel`, `XP`, `Strength`, `Agility`, etc. **restent en place** — pas de DROP.

### Phasage proposé (post-V4)

1. **Phase A — Schéma** : ajout des 4 colonnes ci-dessus, sans migration de données. Valeurs par défaut.
2. **Phase B — Lecture/écriture client** : `UHWProgressionComponent` lit/écrit `CurrentEraAccord` à chaque event gameplay pertinent. UI bascule sur Accord. `CharacterLevel`/`XP` deviennent invisibles côté HUD.
3. **Phase C — Mapping des 8 stats brutes** : nouvelles colonnes `RawStat_Vigueur`, `RawStat_Vivacite`, etc. (FLOAT 0-150). Les 10 attributs D&D existants sont projetés dessus pour la rétrocompat (ex : `Strength` → `RawStat_Vigueur`, `Agility` → `RawStat_Vivacite`, `Constitution` → `RawStat_Endurance`, `Wisdom` → `RawStat_Conscience`, `Intellect` → `RawStat_Esprit`...). Stats UE manquantes (Acuité, Résonance, Mémoire, Verbe) ajoutées comme **nouvelles** colonnes.
4. **Phase D — Compression Souffle** : `UHWGameplayEffectExecutionCalc` applique la règle « stats > 50 ramenées 30 % vers 50 » côté combat, sans modifier la valeur stockée.
5. **Phase E — Maîtrises 5 paliers** : la courbe `XP × 1.15^N` est remplacée par 5 seuils discrets. Les `MasteryLevel int32` actuels sont mappés dans une table de transposition.
6. **Phase F — (optionnel)** : migration "soft" — les vieux `CharacterLevel` peuvent être traduits en `ConcordedErasCount` × poids selon une table de conversion (ex. niveau 50 = 3 ères concordées). Validation Nicolas requise.

### Pas de breaking change OWS

- `FUserCharacter` (OWS2API.h) **garde tous ses champs**.
- Le client lit ces champs et les ignore visuellement, mais le serveur les écrit toujours.
- Les microservices PublicAPI / CharacterPersistenceAPI sont inchangés.
- `OWSPlayerControllerComponent::UpdateCharacterStats()` continue de fonctionner.

## Risques et mitigations

| Risque | Mitigation |
|---|---|
| Désynchronisation `Level` ↔ `Accord` (deux modèles vivent en parallèle) | Convention : `Level` jamais lu pour gameplay client après Phase B. Tests unitaires vérifient que UI ne lit pas `CharacterLevel`. |
| Pression DB en Phase A (ajout colonnes sur table volumineuse) | Migration `ALTER TABLE ... ADD COLUMN ... DEFAULT 0` non bloquante. Estimation < 1 min sur sandbox. |
| Discrepancy entre `MasteryLevel` int32 actuel et 5 paliers | Table de transposition simple : 0 = Novice, 1-5 = Apprenti, 6-15 = Adepte, 16-30 = Expert, > 30 = Maître. À calibrer. |
| Ré-introduction de progression "niveau global" via détour | Politique design : pas de XP cumulatif visible. Reviewer toute UI qui affiche un nombre croissant. |

## Impacts par fichier (référence)

Les fichiers documentation qui décrivent les colonnes/structs concernés portent un avertissement renvoyant ici :

- [[SQL Characters]] — table `Characters`, ajout colonnes Accord
- [[SQL Inventory]] — `BaseCharacterStats={Strength:10, Agility:10}` à mapper sur 8 stats brutes
- [[SQL Abilities]] — `AbilityLevel` int32 → 5 paliers Maîtrise
- [[SQL Global Data]] — fonctions D&D `AbilityMod`/`RollDice` à documenter comme code mort à terme
- [[OWS Network Replication]] — `FUserCharacter` (OWS2API.h)
- [[HW Progression Component]] — refonte sémantique du composant
- [[Quest System]] / [[HW Quest Component]] — récompenses XP/Gold → Accord/Héritage
- [[Combat Attribute Set]] — compression Souffle au-dessus de 50
- [[Weapon Mastery]] — 5 paliers + rouille
- [[HW Character]] / [[HW GAS Character]] / [[HW GAS Player Character]] — 8 stats brutes + 4 fondamentales
- [[Loot System]] — `PlayerLevel` → Accord + stats brutes
- [[Global Data Service]] — `XPMultiplier` → `EraAccordMultiplier`

## Voir aussi

- [[L'Accord]] — mécanique gameplay canonique
- [[Le Souffle]] — cycle qui déclenche le reset
- [[Les Ères]] — saisons cosmiques + catalogue d'archétypes
- [[OWS Architecture]]
- [[OWS Network Replication]]
- [[Index Backend OWS]]
