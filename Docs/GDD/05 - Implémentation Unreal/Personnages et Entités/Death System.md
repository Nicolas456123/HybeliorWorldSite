---
tags: [implementation, death, respawn, penalty, pvp, pve, balance]
status: drafted
last_review: 2026-05-07
needs_review_for: [pénalités-playtest, fenêtre-réa-tuning, anti-griefing-tuning]
type: implementation
canonical_concept: "[[Mort]]"
---

# Death System — Implémentation

> Page d'implémentation technique du concept narratif **[[Mort]]**.
> Cette page contient les **chiffres, formules, règles de pénalité et specs Unreal**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Mort]].

---

## Principes mécaniques canoniques

| Règle | Valeur |
|---|---|
| Drop d'items à la mort (PvE et PvP) | **Aucun, jamais** |
| Debuff de stats post-respawn | **Aucun** (la perte permanente suffit) |
| Perte permanente | XP d'ère + Reconnaissance + Renom + durabilité |
| Conservation totale | Items en banque, items équipés, monture, Héritage, titres, savoirs, Maîtrises, Lien à la Voie |
| Mode du respawn | Au dernier point de passage enregistré, sans pénalité de stats |

---

## Fenêtre de mort — états du personnage

```
État 1 : Vivant
   ↓ (HP → 0)
État 2 : À terre — fenêtre de réanimation (30 s)
   - Personnage incapacité, vue en mode caméra libre
   - Possibilité d'attendre une réanimation par allié Voie d'Eldoria
   - Possibilité de cliquer "Accepter la mort" pour passer immédiatement à État 3
   ↓ (timer expire OU joueur accepte)
État 3 : Mort confirmée — application des pénalités
   - Calcul perte d'XP d'ère
   - Calcul perte Reconnaissance / Renom
   - Application durabilité items
   - Trigger respawn timer
   ↓ (timer respawn : 5 s standard, 15 s en donjon, 30 s en boss world)
État 4 : Respawn — chargement du monde au point de passage
```

---

## Pénalités chiffrées — Petite Mort (PvE standard)

| Pénalité | Valeur | Notes |
|---|---|---|
| Perte d'XP d'ère | **3% de l'XP de la barre courante** | Jamais sous le palier précédent |
| Perte de Reconnaissance | **-50 points** auprès de la faction de la zone | Si la zone n'est associée à aucune faction : pas d'effet |
| Perte de Renom | **-25 points** au classement mondial | Visible publiquement |
| Durabilité équipements portés | **-8%** sur toutes les pièces équipées | Réparation chez forgeron |
| Durabilité arme principale | **-12%** | Réparation chez forgeron |
| Cooldown actifs | **Préservés** (pas de reset bonus) | |
| Buffs / consommables | **Effacés** | Buffs de banquet, potions, etc. |
| Mana / HP au respawn | **100% / 100%** | Pas de pénalité de récupération |

---

## Pénalités chiffrées — Mort en zone à risque

Certaines zones (Failles d'Hybelior, Zones Sauvages, expéditions cosmiques) appliquent un multiplicateur de pénalité.

| Type de zone | Multiplicateur perte XP | Multiplicateur perte Renom |
|---|---|---|
| Zone standard | ×1.0 | ×1.0 |
| Zone élite | ×1.3 | ×1.2 |
| Faille / expédition cosmique | ×1.8 | ×1.5 |
| Zone Souffle (post-événement annonciateur) | ×1.5 | ×1.5 |

---

## Mort répétée — pénalité progressive (anti-griefing)

| Mort consécutive dans la fenêtre | Multiplicateur perte XP | Multiplicateur perte Renom |
|---|---|---|
| 1ère mort | ×1.0 (perte normale) | ×1.0 |
| 2e mort en 5 min | ×1.5 | ×1.0 |
| 3e mort en 10 min | ×2.0 | ×1.2 |
| 4e+ mort en 15 min | ×2.0 (plafond) | ×1.5 (plafond) |

**Reset du compteur** : 15 minutes sans mort, ou changement de zone majeure.

**Exclusion du compteur** :
- Mort face à un boss mondial scripté
- Mort face à un événement cosmique
- Mort dans un donjon en phase de progression normale
- Mort PvP par un joueur Karma Rouge (la victime n'est pas pénalisée — voir [[PvP]])

---

## Mort en PvP — règles spécifiques

| Contexte PvP | Pénalités appliquées au mort | Bonus/Malus pour le tueur |
|---|---|---|
| Duel consenti | Perte XP ×0.5, pas de perte Reconnaissance | Aucun |
| PvP en Zone Sauvage (consentement zonal) | Perte standard ×1.0 | +Renom (selon écart de niveau) |
| Guerre de guildes déclarée | Perte standard ×1.0 | +Reconnaissance guilde |
| Mort par Karma Rouge (PKing non consenti) | **Pénalités ×0.0** (mort gratuite) | Karma Rouge accru, voir [[PvP]] |
| Joueur Karma Rouge tué par un autre | Perte XP ×1.5 (pas de protection) | Récompense de chasse |

> Détail complet du karma, des zones de PvP et de la mécanique sociale : voir [[PvP]].

---

## Réanimation — Voie d'Eldoria

| Élément | Valeur |
|---|---|
| Caster requis | Lié à la Voie d'Eldoria, niveau Voie ≥ 2 |
| Fenêtre de réanimation | 30 s après HP=0 |
| Coût Mana | 60% de la barre Mana max du sauveur |
| Temps d'incantation | 4 s ininterrompues (canalisé, interruptible) |
| HP restaurés au mort | 30% des HP max |
| Mana restaurée | 0% (le mort ressuscite épuisé) |
| Pénalités évitées | **Toutes** : aucune perte XP/Reconnaissance/Renom/durabilité |
| Cooldown sur le sauveur | 5 minutes (anti-abus en raid) |
| Limite par cadavre | 1 réanimation par session de combat |

**Si le joueur retombe après réanimation** : pénalités normales appliquées, sans cumul du compteur "mort répétée" (la réanimation a remis le compteur à 0 sur ce cadavre).

---

## Respawn — points de passage

| Type de point | Activation | Durée de vie |
|---|---|---|
| **Hôtellerie** | Manuelle (interaction PNJ) | Permanente |
| **Camp d'aventure** | Automatique (au passage) | Permanente |
| **Balise de zone** | Automatique (au passage) | Permanente |
| **Foyer (player housing)** | Manuelle | Permanente, payante (location) |
| **Point de relai donjon** | Automatique en progression | Vie de l'instance |

**Algorithme de sélection** : le système choisit le **dernier point enregistré** par défaut. Si le joueur est mort dans une instance, l'instance prime sur le monde ouvert.

---

## Mort en donjon

| Contexte | Respawn | Note |
|---|---|---|
| Donjon solo / instancié | Entrée du donjon | Instance conservée, phase rejouable |
| Donjon en groupe | Entrée OU point de relai débloqué (au choix) | Choix UI au respawn |
| Boss vaincu, mort hors boss | Juste avant la salle suivante | Loot du boss préservé |
| Wipe complet du groupe | Entrée du donjon | Avancement conservé 30 min puis reset |
| Mort en raid mondial | Cimetière de raid (mass-respawn point) | Pas de pénalité supplémentaire |

---

## Coût de retour au point de mort (optionnel)

Le joueur peut, après respawn, **payer un coût** pour revenir à proximité de son point de mort plutôt que de marcher.

| Service | Coût | Disponibilité |
|---|---|---|
| Téléportation au point de mort | 50 Éclats × niveau du joueur | PNJ Hôtelier |
| Récupération de buffs perdus | 20% du coût des consommables consumés | Auberge spécialisée |
| Réparation d'urgence (pas de nouveau forgeron) | +25% sur le tarif normal | PNJ ambulant |

**Limite** : 1 téléportation au point de mort par tranche de 30 minutes (anti-bypass de pénalité).

---

## Debuffs post-mort

> **Décision actée : aucun debuff de stats post-respawn.**
> La perte permanente (XP, Reconnaissance, Renom, durabilité) constitue la pénalité suffisante. Ajouter un debuff temporaire serait une double peine.

**Exception** : si le joueur meurt en transportant une **relique de quête épique**, la relique tombe au sol et reste 5 minutes accessible avant de retourner à son spawn. Ce n'est pas un debuff sur le joueur mais une mécanique de quête.

---

## Cas particuliers

| Cas | Règle |
|---|---|
| Mort par chute / environnement | Pénalité standard ×0.7 (réduite, accidentel) |
| Mort par PNJ ami (friendly fire impossible normalement) | Pénalité ×0.0 (bug-protect) |
| Mort lors d'un événement cosmique scripté | Pénalité ×0.5 |
| Mort lors d'un Souffle (cinématique en cours) | Mort impossible : invulnérabilité globale pendant les ~5 sec de cinématique |
| Mort lors d'un duel consenti | Voir tableau PvP ci-dessus |
| Suicide volontaire (commande /suicide ou saut dans le vide) | Pénalité ×1.0, comptée dans le compteur anti-griefing |

---

## Flux serveur — mort confirmée

```
1. Détection HP=0 sur HW Progression Component
2. Passage en état "À terre" (HW Character)
   - Désactivation contrôles offensifs
   - Activation caméra libre
   - Démarrage timer 30 s
   - Notification clients alentours (animation, son)
3. Pendant la fenêtre :
   - Si réanimation Eldoria réussie → restauration HP + sortie de l'état
   - Si "Accepter la mort" cliqué → saut direct à étape 4
   - Si timer expire → étape 4
4. Mort confirmée :
   - Calcul pénalités (formules canoniques + multiplicateurs zone/répétition)
   - Application sur HW Progression Component (XP, Reconnaissance, Renom)
   - Application durabilité sur Equipment Component
   - Effacement buffs (Buff Manager)
   - Incrémentation compteur anti-griefing
   - Trigger respawn timer (5/15/30 s selon contexte)
5. Respawn :
   - Sélection point de passage (dernier enregistré, ou entrée donjon)
   - Chargement zone (si nécessaire)
   - Spawn personnage
   - Reset HP/Mana à 100%
   - Notification UI : récap pénalités appliquées
```

---

## Dépendances système

| Composant | Rôle dans la mort |
|---|---|
| [[HW Character]] | États (vivant / à terre / mort) |
| [[HW Progression Component]] | Application perte XP / Reconnaissance / Renom |
| [[HW GAS Player Character]] | Gestion HP=0, triggers gameplay abilities |
| [[Stats System]] | Calcul HP/Mana au respawn |
| [[AI Blueprints]] | Reset agro des PNJ après respawn |
| [[Entity Spawner]] | Respawn au point de passage |
| [[OWS Architecture]] | Synchro multi-shard du respawn |
| [[Migration Accord]] | Pas affecté (la mort ne touche pas l'Accord d'ère) |
| [[PvP]] | Karma, zones, règles spécifiques PvP |

---

## Points de calibrage à playtester

- [ ] Perte XP 3% par mort — perçue comme "ferme mais pas frustrante" ?
- [ ] Perte Reconnaissance -50 — assez visible pour pousser la prudence sans punir ?
- [ ] Fenêtre 30 s de réa Eldoria — assez de temps en raid ? trop court en solo ?
- [ ] Multiplicateur ×2 plafond mort répétée — efficace contre griefing ?
- [ ] Coût téléportation au point de mort — barrière efficace ou contournement ?
- [ ] Aucun debuff post-respawn — décision tenue ou frustration émergente ?

---

## Décisions actées (techniques)

- ✅ Aucun drop d'items, ni en PvE ni en PvP
- ✅ Aucun debuff de stats post-respawn (la perte permanente suffit)
- ✅ Perte XP de base : 3% de la barre courante, jamais sous palier précédent
- ✅ Perte Reconnaissance -50 (faction de zone), perte Renom -25 (mondial)
- ✅ Durabilité -8% équipement / -12% arme principale
- ✅ Fenêtre 30 s de réanimation (Voie d'Eldoria uniquement)
- ✅ Réanimation : 60% Mana, 4 s incantation, 30% HP restaurés, 5 min cooldown
- ✅ Multiplicateurs de zone (×1 → ×1.8 selon dangerosité)
- ✅ Anti-griefing : pénalité ×1.5 → ×2 selon répétition, plafond ×2
- ✅ Mort par Karma Rouge sur victime non consentante : pénalité ×0
- ✅ Coût de téléportation au point de mort : 50 Éclats × niveau, 1 par 30 min

---

*Liens narratifs : [[Mort]] | [[L'Accord]] | [[PvP]] | [[Le Souffle]]*
*Liens techniques : [[HW Character]] | [[HW Progression Component]] | [[Stats System]] | [[Entity Spawner]] | [[OWS Architecture]]*
