---
tags: [implementation, pvp, combat, zones, karma, sieges, arenes, balance]
status: drafted
last_review: 2026-05-07
needs_review_for: [seuils-karma-playtest, durees-sieges-tuning, balance-classes-pvp]
type: implementation
canonical_concept: "[[PvP]]"
---

# PvP System — Implémentation

> Page d'implémentation technique du concept narratif **[[PvP]]**.
> Cette page contient les **chiffres, formules, specs Unreal et règles de balance**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[PvP]].

---

## Typologie des zones

| Zone | PvP | Flag requis | Conséquences kill | Notes |
|---|---|---|---|---|
| **Sûre** (cités majeures, sanctuaires) | Désactivé | — | — | Tout dégât interjoueur ignoré ; gardes auto-kill agresseurs en débordement |
| **Sauvage** (continents ouverts) | Optionnel | Flag actif des deux côtés requis | Karma neutre si flag-vs-flag | Bonus de récolte / XP si flag actif |
| **Contestée** (zones frontières, ruines, donjons ouverts) | Forcé | Flag forcé à l'entrée | Kill non-consenti possible si flag inactif côté victime | Loot & ressources de tier supérieur |
| **Siège** (forteresses de guildes) | Structuré | Inscription guilde | Cf. règles de siège ci-dessous | Fenêtres temporelles déclarées |
| **Arène** (instances dédiées) | Structuré | Inscription joueur/équipe | Aucune (instance) | Classements ELO |

### Règles de transition

| Action | Délai |
|---|---|
| Activation flag PvP | Immédiate |
| Désactivation flag (hors combat) | 30 s |
| Désactivation flag (en combat) | Bloquée tant que combat actif |
| Sortie zone contestée | Flag conservé 60 s |
| Téléport hors zone sauvage avec flag | Bloqué pendant 10 s post-combat |

---

## Pénalités de mort PvP

Cross-link : [[Death System]] (règles générales de mort).

| Contexte | Durabilité équipement | XP perdue | Rouille temporaire | Drop d'items |
|---|---|---|---|---|
| Mort PvP flag-vs-flag | -5% | 0% | Aucune | Aucun |
| Mort PvP en zone contestée | -8% | -1% palier en cours | -10% dégâts 5 min | Aucun |
| Mort par joueur Hors-la-loi/Rouge | -3% (réduit, victime non-fautive) | 0% | Aucune | Aucun |
| Mort en tant que Hors-la-loi/Rouge | -15% | -2% palier en cours | -20% dégâts 10 min | Possibilité de drop d'un item au sol (Rouge uniquement) |
| Mort en arène | 0% | 0% | Aucune | Aucun |
| Mort en siège (assaillant) | -5% | 0% | Respawn au camp d'assaut, cooldown 60 s | Aucun |
| Mort en siège (défenseur) | -3% | 0% | Respawn forteresse, cooldown 30 s | Aucun |

> Pas de drop d'inventaire en PvP standard — seul le statut Rouge fait exception (1 item aléatoire de l'inventaire visible peut tomber, plafonné à 1 par mort).

---

## Karma — Système et paliers

### Définition d'un kill non-consenti (NC)

Un kill compte comme NC si **toutes** les conditions suivantes sont remplies :
- La victime n'avait **pas** son flag PvP actif au moment de l'engagement
- L'attaque a été initiée par le tueur (pas de légitime défense)
- La victime n'était pas elle-même Hors-la-loi/Rouge/Bannie
- Le combat n'a pas eu lieu en zone contestée ou siège

### Paliers

| Palier | Seuil | Effets mécaniques |
|---|---|---|
| **Neutre** | 0 pt | Aucun |
| **Suspect** | 1-2 kills NC en 24h | Marque jaune visible 6h ; -10 Reconnaissance par faction adjacente ; gardes méfiants (dialogue) |
| **Hors-la-loi** | 3-5 kills NC en 48h | Marque orange ; attaquable sans pénalité par tous ; bannissement de 30% des villes ; -25% accès services marchands ; bounty 50 Éclats |
| **Rouge** | 6+ kills NC en 72h **OU** meurtre PNJ majeur (named) | Marque rouge ; attaquable par tous sans pénalité ; banni de toutes villes majeures ; bounty 200 Éclats + cosmétique chasseur ; possibilité drop d'item à la mort |
| **Banni** | 15+ kills NC cumulés sans rédemption | Marque noire ; toutes factions hostiles ; bounty 1000 Éclats + titre temporaire "Justicier" pour le chasseur ; accès uniquement aux camps hors-la-loi ; téléports désactivés |

### Décrément naturel et rédemption

| Action | Effet karma |
|---|---|
| Temps sans kill NC | -1 kill compteur / 12h de jeu actif |
| Quête de rédemption faction (par faction) | -2 kills, cooldown 7 jours |
| Don à une œuvre (église / faction) | -1 kill par 500 Éclats donnés (plafonné à 1/24h) |
| Mort en tant que Rouge ou Banni | -1 kill ("purification par la chair") |
| Pèlerinage long (multi-faction) | -3 kills, cooldown 30 jours |

---

## Listes de wanted (bounty)

| Statut cible | Récompense tueur | Source de fonds | Limite |
|---|---|---|---|
| Hors-la-loi | 50 Éclats | Pot taxes hôtel des ventes | 1 prime / victime / 24h / chasseur |
| Rouge | 200 Éclats + cosmétique chasseur | Pot taxes hôtel des ventes | 1 prime / victime / 24h / chasseur |
| Banni | 1000 Éclats + titre "Justicier" 7 jours | Pot taxes + faction Ordre | 1 prime / victime / 7 jours / chasseur |
| Cible nominée par guilde | Variable (mise par contrat) | Trésorerie guilde | Cf. contrats de [[Guild System]] |

Cross-link : gold sink documenté dans [[Économie System#Gold sinks]].

---

## Sièges de guildes

Cross-link : [[Guild System]] pour les structures de guildes et les conditions de déclaration.

### Cadence et déclaration

| Paramètre | Valeur |
|---|---|
| Fenêtre de déclaration | 7 jours avant le siège |
| Durée d'un siège | 90 minutes (assaut) + 30 minutes (capture) |
| Cooldown entre sièges sur une même forteresse | 14 jours |
| Période d'invulnérabilité post-capture | 7 jours |
| Slots assaillants max | 60 joueurs |
| Slots défenseurs max | 60 joueurs |

### Phases d'un siège

```
T-7j      : Déclaration officielle (verrou de la fenêtre)
T-1j      : Inscription des participants verrouillée
T0        : Ouverture des portes du champ de siège
T0 → T+90 : Phase d'assaut (destruction murs / portes)
T+90      : Si point de capture atteint → Phase de capture
T+90 → T+120 : Capture (channel ininterrompu 5 min sur Cœur de forteresse)
T+120     : Résolution (transfert de propriété ou repli)
```

### Récompenses

| Camp | Issue | Récompenses |
|---|---|---|
| Assaillants | Capture réussie | Forteresse transférée, contrôle territoire 14 jours min, accès tax récolte zone, Éclats trésor (variable selon richesse forteresse) |
| Défenseurs | Défense réussie | Bonus prestige guilde, titre "Inébranlables", part trésor défensif |
| Tous | Participation | XP combat majorée +50%, contribution Reconnaissance faction de tutelle |

---

## Arènes — Modes structurés

| Mode | Format | Durée match | Classement |
|---|---|---|---|
| Duel | 1v1 | 5 min max | ELO individuel par classe |
| Escarmouche | 3v3 | 8 min max | ELO équipe |
| Bataille | 5v5 | 12 min max | ELO équipe |
| Tournoi saisonnier | 5v5 | Bracket élimination | Saison dédiée, récompenses cosmétiques uniques |
| Mêlée | 8 joueurs FFA | 6 min max | ELO individuel |

### Système ELO

```
ELO_initial = 1000
Gain/perte : ±15 à ±30 selon écart d'ELO
Décroissance saisonnière : -50 ELO / semaine d'inactivité (plancher 800)
```

**Paliers de classement** :

| Palier | ELO requis | Récompenses fin de saison |
|---|---|---|
| Bronze | < 1200 | Cosmétique mineur |
| Argent | 1200-1400 | Cosmétique standard |
| Or | 1400-1600 | Cosmétique + monture |
| Platine | 1600-1800 | Cosmétique unique + titre |
| Diamant | 1800-2000 | Cosmétique légendaire + monture saisonnière |
| Champion | top 100 | Trophée nominé + cosmétique exclusif tournoi |

---

## Balance — Équilibre classes/Voies en PvP

### Modificateurs PvP globaux

Pour éviter que le PvE déteigne directement sur le PvP, des modificateurs spécifiques sont appliqués :

| Catégorie | Modificateur PvP |
|---|---|
| Dégâts directs vs joueur | ×0.85 (réduction globale pour éviter one-shot) |
| Soins reçus vs joueur | ×0.70 (PvP dampening) |
| Contrôles (stuns, roots) | Diminishing Returns : 100% → 50% → 25% → immune 15s |
| Burst sur cible <30% PV | Cap à 25% PV par hit |

### Voies — bonus/malus PvP par Ère

Les bonus de Voie selon l'Ère (cf. [[Souffle System]]) sont **atténués en PvP** pour éviter les ères "kingmaker" qui déséquilibreraient les ladders :

| Position de la Voie | Bonus PvE (réf [[Souffle System]]) | Bonus PvP |
|---|---|---|
| Voie dominante | +25% sem 1 / +10% reste | +10% sem 1 / +5% reste |
| Voie opposée | -20% | -10% |
| Voie neutre | aucun | aucun |

### Balance par classe — paliers de surveillance

| Métrique | Cible | Seuil d'alerte |
|---|---|---|
| Win rate par classe (toutes Ères confondues) | 50% ±3% | <45% ou >55% |
| Présence en top 100 ladder | 8-15% par classe | <5% ou >25% |
| Pick rate tournoi | 8-15% par classe | <5% ou >30% |

---

## Durée des conflits — bornes système

| Type de conflit | Durée min | Durée max | Cooldown |
|---|---|---|---|
| Duel | 30 s | 5 min | Aucun |
| Escarmouche/Bataille arène | 2 min | 12 min | Aucun (matchmaking continu) |
| Engagement zone sauvage | — | — | Flag PvP timer |
| Siège forteresse | 60 min | 120 min | 14 jours sur même cible |
| Guerre de guildes (déclarée) | 7 jours | 30 jours | 60 jours entre deux guerres entre mêmes guildes |
| Guerre de factions (mondiale) | Émergent (lié Souffle) | Borné par Ère | Reset à chaque Souffle |

---

## Flux serveur — engagement PvP standard

```
1. Joueur A active flag PvP (input UI)
2. Serveur valide → broadcast état flag
3. Joueur A engage Joueur B
4. Serveur vérifie :
   - B a-t-il son flag actif ? OUI → kill consenti
   - NON → vérification zone (contestée ? sauvage ?)
   - Zone sauvage + B sans flag → kill NC → +1 compteur karma A
5. Application dégâts (avec modificateurs PvP)
6. Mort de B :
   - Application pénalités selon table mort PvP
   - Ajout entrée bounty si A devient Rouge
   - Notification factions, mises à jour Reconnaissance
7. Logs persistés dans [[Global Data Service]] pour audit
```

---

## Dépendances système

| Composant | Rôle dans le PvP |
|---|---|
| [[OWS Architecture]] | Routing combat cross-shard, replication |
| [[HW Combat Component]] | Calcul dégâts, modificateurs PvP |
| [[Death System]] | Pénalités de mort, respawn |
| [[Guild System]] | Sièges, déclarations de guerre |
| [[Faction System]] | Reconnaissance, gardes hostiles |
| [[Économie System]] | Pot bounty, gold sinks |
| [[Souffle System]] | Modulation balance par Ère |
| [[Quest System]] | Quêtes de rédemption, contrats bounty |
| [[Global Data Service]] | Persistance karma, ELO, historique sièges |

---

## Points de calibrage à playtester

- [ ] Seuils karma 1-2 / 3-5 / 6+ / 15+ — punitif ou laxiste ?
- [ ] Décrément naturel -1 / 12h jeu actif — trop rapide / trop lent
- [ ] Bounty 50 / 200 / 1000 Éclats — incite-t-il vraiment à chasser ?
- [ ] Modificateur PvP dégâts ×0.85 — TTK ressenti
- [ ] Soins ×0.70 — healers viables ou inutiles
- [ ] Bonus Voie atténué en PvP — encore trop fort par Ère ?
- [ ] Durée siège 90+30 min — épuisement ou trop court
- [ ] DR contrôles — jouable face à classes burst
- [ ] ELO ±15-30 par match — progression saisonnière fluide

---

## Décisions actées (techniques)

- ✅ Flag PvP volontaire en zone sauvage, forcé en zone contestée
- ✅ Désactivation flag avec délai 30 s hors combat
- ✅ Pas de drop d'inventaire sauf statut Rouge (1 item plafond)
- ✅ Karma 5 paliers (Neutre / Suspect / Hors-la-loi / Rouge / Banni)
- ✅ Décrément naturel -1 / 12h, rédemption par quête / don / mort
- ✅ Bounty 50 / 200 / 1000 Éclats financé par taxes AH
- ✅ Sièges 90 min assaut + 30 min capture, cooldown 14 j
- ✅ Slots siège : 60 vs 60
- ✅ Arène ELO base 1000, gain ±15-30, paliers Bronze→Champion
- ✅ Modificateurs PvP : dégâts ×0.85, soins ×0.70, DR contrôles
- ✅ Bonus Voie PvP atténué (+10/+5 dom, -10 opp)

---

*Liens narratifs : [[PvP]] | [[Guildes]] | [[Factions]] | [[Mort]] | [[Le Souffle]]*
*Liens techniques : [[Death System]] | [[Guild System]] | [[Faction System]] | [[Souffle System]] | [[OWS Architecture]] | [[HW Combat Component]]*
