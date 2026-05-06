---
tags: [implementation, labeur, energie, progression, economie, balance]
status: drafted
last_review: 2026-05-07
needs_review_for: [chiffres-playtest, plafonds-banking, courbe-bonus, cuisine-tuning]
type: implementation
canonical_concept: "[[Labeur]]"
---

# Labeur System — Implémentation

> Page d'implémentation technique du concept narratif **[[Labeur]]**.
> Cette page contient les **chiffres, formules, specs Unreal et règles de balance**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Labeur]].

---

## Échelle canonique et capacité

Le Labeur est une jauge entière sur la plage `[0, LabeurMax]`.

| Paramètre | Valeur canonique | Raisonnement |
|---|---|---|
| **LabeurMax (de base)** | `100` | Unité claire, facile à communiquer. |
| **Labeur de départ (nouveau perso)** | `100` (plein) | Pas de friction au lancement de la première session. |
| **Plancher** | `0` | Pas de Labeur négatif ; au-dessous, le joueur subit le malus d'épuisement. |
| **Plafond temporaire (banking)** | `LabeurMax + 50` (soit `150`) | Permet le report partiel d'une journée non-jouée — voir §Banking. |

`LabeurMax` peut être **augmenté de façon permanente** via certains accomplissements de couche Héritage (voir §Modificateurs permanents).

---

## Régénération journalière — modèle de base

Le Labeur ne se vide pas et ne se remplit pas en temps réel actif uniquement : il est **calé sur un cycle journalier réel** (24 h, fuseau du compte). À chaque tick journalier (rollover serveur 04:00 UTC par défaut, configurable par compte), le joueur reçoit une **recharge journalière** appelée `DailyLabeur`.

| Source de régénération | Mode | Valeur canonique |
|---|---|---|
| **Recharge journalière (tick rollover)** | Instantanée | `+100` Labeur, capé à `LabeurMax + banking` |
| **Régénération continue passive (en jeu)** | Tick / heure | `+8 / heure` |
| **Régénération continue passive (hors connexion)** | Tick / heure | `+10 / heure` (légèrement supérieure pour ne pas pénaliser la déconnexion) |
| **Repos en auberge (en jeu)** | Tick / heure | `+20 / heure` (cumulé avec passif → `+28 / heure`) |
| **Repos en camp sauvage** | Tick / heure | `+5 / heure` (cumulé → `+13 / heure`) |
| **Repas qualité commune** | Instantanée | `+10` (consommable) |
| **Repas qualité rare** | Instantanée | `+25` |
| **Repas qualité magistrale (cuisinier expert)** | Instantanée | `+50` |
| **Tisane / élixir d'apothicaire (rare)** | Instantanée | `+15` à `+40` selon recette |

> Le but du modèle : **un joueur normal récupère son Labeur en une nuit IRL** (rollover) ; un joueur intense peut prolonger sa session en utilisant l'économie des métiers (auberges, cuisine, alchimie) — c'est-à-dire en faisant tourner l'économie.

### Formule de régénération continue

```
LabeurRegenPerHour =
    BasePassive (8 ou 10 selon connexion)
  + ContextBonus (0 / +5 camp / +20 auberge / +X buff temporaire)
  + GuildHallBonus (jusqu'à +5 si guilde rang 3+)

LabeurCurrent = clamp(LabeurCurrent + LabeurRegenPerHour, 0, LabeurMax + Banking)
```

**Cap d'absorption** : la régénération continue **ne peut pas dépasser** `LabeurMax` ; seuls le rollover journalier et certains bonus narratifs spéciaux (festivals, événements) peuvent pousser au-dessus dans la zone de banking.

---

## Banking — report partiel des jours non joués

Le Labeur non consommé d'une journée **ne disparaît pas immédiatement**, dans la limite du plafond banking.

| Règle | Valeur |
|---|---|
| **Plafond banking** | `+50` au-dessus de `LabeurMax` (donc `150` total par défaut) |
| **Décroissance du banking** | Au rollover, si `LabeurCurrent > LabeurMax` : `LabeurCurrent = max(LabeurMax, LabeurCurrent - 25)` |
| **Recharge journalière en zone banking** | Ajout normal `+100` mais clampé au plafond banking ; l'excédent est **perdu** |
| **Effet** | Un joueur qui saute 1 ou 2 jours conserve un peu de marge ; un joueur qui saute 1 semaine ne capitalise pas indéfiniment |

> **Intention** : récompenser modestement le joueur intermittent (parent, adulte qui ne joue qu'un ou deux soirs par semaine) sans casser la promesse "un jour = une journée d'aventure".

---

## Coûts par type d'action — table canonique

Le Labeur ne couvre pas le combat normal : il couvre **les actions qui produisent une trace persistante** (récolte, craft, apprentissage, combat élite/raid, voyage rapide, etc.).

| Catégorie | Action | Coût | Notes |
|---|---|---|---|
| **Combat** | Combat standard (mob normal, XP de Maîtrise) | `0` | Le combat normal est gratuit en Labeur. |
| **Combat** | Combat élite (sub-boss, hérauts d'ère) | `5` | Friction légère pour éviter le farm intensif. |
| **Combat** | Boss de donjon | `15` | Limite à ~6 boss / jour à barre pleine. |
| **Combat** | Boss mondial (raid) | `25` | Limite à ~4 raids / jour. |
| **Récolte** | Ressource commune (bois, fibre, minerai T1) | `2` | 50 récoltes / jour. |
| **Récolte** | Ressource rare (gisement T3-T4) | `5` | 20 récoltes rares / jour. |
| **Récolte** | Ressource exceptionnelle (gisement Magistral+) | `15` | Coût significatif — voir §Métiers. |
| **Craft** | Item commun | `5` | 20 crafts / jour. |
| **Craft** | Item rare | `20` | 5 crafts / jour. |
| **Craft** | Item magistral | `50` | 2 crafts / jour si rien d'autre. |
| **Craft** | Item légendaire | `90` | Quasi-monothématique sur la journée. |
| **Apprentissage** | Apprendre une recette / compétence | `15` | ~6 par jour. |
| **Apprentissage** | Apprendre un sort / une ability rare | `25` | ~4 par jour. |
| **Entraînement hors combat** | Session intensive de stat focalisée | `20` | Voir [[Progression]] §Focus. |
| **Voyage** | Voyage rapide (téléportation entre nodes) | `10 / saut` | Évite l'abus de TP. |
| **Voyage** | Voyage rapide en région inconnue | `25 / saut` | Encourage l'exploration à pied. |
| **Social** | Fonder/intégrer une organisation (acte rare) | `30` | Acte avec poids. |
| **Construction** | Pose d'un module de monument / atelier | `40` | Construction = projet pluri-jours. |

**Coûts modulés par tier de l'objet** : un craft commun en T5 ne coûte pas la même chose qu'en T1. Voir §Modulation par tier.

---

## Modulation par tier (multiplicateur)

```
CoutEffectif = CoutBase × TierMultiplier × DifficultyMultiplier × MasteryDiscount
```

| Tier de l'item produit | TierMultiplier |
|---|---|
| Commun (T1) | `×1.0` |
| Inhabituel (T2) | `×1.5` |
| Rare (T3) | `×2.0` |
| Épique (T4) | `×3.0` |
| Magistral (T5) | `×5.0` |
| Légendaire (T6) | `×8.0` |

**MasteryDiscount** (réduction par Maîtrise du métier concerné) :

| Palier de Maîtrise | Réduction de coût |
|---|---|
| Novice (1) | `−0%` |
| Apprenti (2) | `−5%` |
| Compagnon (3) | `−10%` |
| Aguerri (4) | `−15%` |
| Expert (5) | `−25%` |
| Maître (6) | `−40%` |

> **Effet** : un Maître forgeron peut crafter ses items magistraux pour `~30` Labeur au lieu de `50`, ce qui justifie la spécialisation.

---

## Bonus de qualité selon Labeur dépensé

Le Labeur consommé sur une action **augmente la qualité du résultat**. C'est le mécanisme central qui rend "donner de soi" significatif.

### Formule générale

```
QualityScore = BaseQuality
             + (LabeurSpent / LabeurReference) × QualityMultiplier
             + RNGRoll
```

### Tableau de bonus par tranche de Labeur restant au moment de l'action

| Labeur courant | Bonus de qualité | Bonus XP de Maîtrise | Notes |
|---|---|---|---|
| ≥ 80 | `+15%` qualité, `+10%` XP | "Frais et plein d'élan" | Performance optimale. |
| 50-79 | `+5%` qualité, `+5%` XP | "Concentré" | Standard. |
| 25-49 | `0%` (référence) | "Engagé" | Aucune pénalité. |
| 10-24 | `−10%` qualité, `−10%` XP | "Fatigué" | Avertissement UI orange. |
| 1-9 | `−25%` qualité, `−25%` XP, échec critique 5% | "Épuisé" | Avertissement UI rouge. |
| 0 | Action **bloquée** sauf combat normal | "Au bout du rouleau" | Le joueur doit se reposer. |

### Bonus pour Labeur "investi" (acte sacralisé)

Si le joueur dépense **≥ 50% de son LabeurMax sur une seule action coordonnée** (un grand craft, un raid majeur, une cérémonie), un bonus narratif s'applique :

| Pourcentage de LabeurMax investi en une action | Bonus |
|---|---|
| 50-69% | `+10%` qualité, déclenche flag *"Œuvre soignée"* |
| 70-89% | `+20%` qualité, flag *"Œuvre dévouée"*, +1 chance d'apparition de gemme/sceau caché |
| 90-100% | `+35%` qualité, flag *"Œuvre signée"* (visible dans le monde — voir [[L'Accord]] couche 5), +Reconnaissance |

> **Intention** : il existe une vraie différence entre "j'ai fabriqué une épée à la chaîne" et "j'ai donné toute ma journée à cette épée". Le second cas laisse une trace dans le monde.

---

## Malus de surcharge (Labeur en zone basse)

Un joueur qui pousse jusqu'à `0` ou tente de continuer en dessous subit l'**Épuisement** — un état temporaire visible.

| État | Déclencheur | Effets | Durée |
|---|---|---|---|
| **Frais** | Labeur ≥ 50% de LabeurMax | Aucun | — |
| **Engagé** | Labeur 25-49% | Aucun, simple indicateur UI | — |
| **Fatigué** | Labeur 10-24% | `−10%` qualité, `−10%` XP, ralentissement craft `+15%` | Tant que < 25% |
| **Épuisé** | Labeur 1-9% | `−25%` qualité, échec critique 5%, ralentissement craft `+30%`, vitesse de déplacement `−5%` | Tant que < 10% |
| **Au bout du rouleau** | Labeur = 0 | Actions Labeur bloquées (sauf combat normal), debuff `Surmenage` | 4 h IRL minimum après remontée à >25%, OU dissipé instantanément par un repos en auberge |

---

## Modificateurs permanents de LabeurMax

Certains accomplissements augmentent durablement le LabeurMax du personnage. Ces modificateurs **persistent à travers les Souffles** (voir [[Le Souffle]]).

| Source | Bonus LabeurMax | Plafond cumulé |
|---|---|---|
| Stat **Endurance** atteint 60 | `+10` | — |
| Stat **Endurance** atteint 90 | `+20` (cumulé avec ci-dessus) | — |
| Maîtrise palier Maître (6) dans n'importe quel métier | `+5` par métier (max 3 métiers) | `+15` cumulé |
| Titre *"Concordant"* (voir [[Accord System]]) | `+5` par titre (max 3) | `+15` cumulé |
| Quête de Voie spécifique (voir [[Le Lien]]) | `+10` ponctuel | — |
| **Plafond absolu de LabeurMax** | `200` | Élite Mythique. |

---

## Interactions inter-systèmes

| Système | Interaction avec le Labeur |
|---|---|
| [[Le Souffle]] | À chaque Souffle, bonus de **rouille du Labeur** : `−15%` régénération pendant 1 semaine (Petit Souffle) ; `−25%` pendant 2 semaines (Grand Souffle). Reflète la friction d'adaptation. |
| [[L'Accord]] | Joueurs Accordés (≥ 75%) : `+10%` regen continue. Concordants (100%) : `+15%` regen + `+10` LabeurMax temporaire jusqu'au Souffle. |
| [[Armes et Maîtrise]] | La **décroissance des Maîtrises** se fonde sur l'absence de pratique ; les actions de pratique consomment du Labeur. Lien organique : pas assez de Labeur → choix de quoi maintenir. |
| [[Le Lien]] | Les Liés à une Voie ont un coût Labeur réduit pour les actions liées à leur Voie : `−15%` si Voie active. Pénalité `+15%` si Voie en opposition à l'Ère. |
| [[Personnage]] | Le **Focus** sur la stat *Endurance* augmente la régénération continue de `+25%`. |
| [[Progression]] | Couche 1 (stats brutes) — le Labeur module l'XP gagné. Couche 2 (Maîtrises) — module le palier de progression. |
| [[Métiers]] | Les métiers de soin du corps (cuisine, alchimie, médecine, hôtellerie) **redonnent** du Labeur aux autres → moteur économique central. |
| [[Reconnaissance]] | Une *Œuvre signée* (Labeur ≥ 90%) déclenche un gain de Reconnaissance régionale. |
| [[La Partie]] | Le Labeur est la promesse au joueur intermittent : un soir = une vraie journée d'aventure. |

---

## Spec serveur — flux Labeur

```
1. Tick rollover journalier (04:00 UTC)
   Pour chaque joueur :
     LabeurCurrent = clamp(LabeurCurrent + DailyLabeur, 0, LabeurMax + Banking)
     Si LabeurCurrent > LabeurMax : décroissance banking de -25
     Reset des compteurs de session (ŒuvresSigneesAujourdhui, etc.)

2. Tick horaire (passif, en jeu et hors jeu)
   LabeurRegen = BasePassive + ContextBonus + GuildHallBonus
   LabeurCurrent = min(LabeurCurrent + LabeurRegen, LabeurMax)

3. Action déclenchée par le joueur
   CoutEffectif = CoutBase × TierMultiplier × DifficultyMultiplier × MasteryDiscount
   Si LabeurCurrent < CoutEffectif :
     - Action légère : autorisée avec malus Épuisement
     - Action lourde (craft Magistral+, raid) : refusée → message UI
   Sinon :
     LabeurCurrent -= CoutEffectif
     QualityRoll appliqué selon §Bonus de qualité
     Flag "Œuvre signée" évalué
     Diffusion event au client (UI feedback)
```

---

## Composants Unreal impliqués

| Composant | Rôle |
|---|---|
| `UHWLabeurComponent` (à créer) | Composant joueur portant `LabeurCurrent`, `LabeurMax`, `LabeurRegenRate`, `LastTickTimestamp`. Réplication serveur autoritaire. |
| `FHWLabeurState` | Struct sérialisable pour persistance OWS (voir [[SQL Characters]] — colonnes à ajouter `labeur_current`, `labeur_max`, `labeur_banking`). |
| `UHWProgressionComponent` | Recevoir les flags *"Œuvre signée"*, *"Concordant"* pour appliquer les bonus permanents (voir [[HW Progression Component]]). |
| `UCombatAttributeSet` | Modifier *Endurance* y déclenche un recompute de `LabeurMax`. |
| `UGameplayEffect` *GE_Labeur_Cost* | Effet appliqué à chaque action soumise au coût Labeur ; consomme l'attribut. |
| `UGameplayEffect` *GE_Labeur_Restore* | Effet appliqué par les repas, repos, élixirs. |
| `UHWInventoryComponent` | Items "consommables Labeur" (repas, tisanes) référencent `GE_Labeur_Restore`. |
| `UHWLabeurUIWidget` | HUD : barre de Labeur, indicateur d'état, alerte couleur. Voir [[HUD]]. |

---

## Persistance & réplication

| Donnée | Stockage | Réplication client | Reset au Souffle |
|---|---|---|---|
| `LabeurCurrent` | OWS `characters.labeur_current` | `Replicated` (OnRep_Labeur) | Non — préservé. |
| `LabeurMax` | OWS `characters.labeur_max` | `Replicated` | Non — préservé (modificateurs Héritage). |
| `LabeurBanking` | OWS `characters.labeur_banking` | `Replicated` | Décroissance journalière, pas effet de Souffle. |
| `LastDailyTickAt` | OWS `characters.last_daily_tick_at` | Server-only | Non. |
| `LabeurRouille` (facteur après Souffle) | Calculé runtime | `Replicated` | Oui — appliqué post-Souffle, dissipé avec le temps. |

---

## Conditions cachées 🔒 mécaniques (Héritage)

| Condition | Récompense |
|---|---|
| Réaliser 10 *Œuvres signées* (90%+ Labeur en une action) | Titre permanent *"Artisan dévoué"* + `+5` LabeurMax |
| 30 jours consécutifs avec Labeur dépensé > 50% | Titre *"Infatigable"* + `+10%` regen continue permanent |
| Survivre à 3 Souffles sans jamais tomber à 0 Labeur | Titre *"Mesuré"* + résistance rouille `−50%` |
| Crafter une *Œuvre signée* en Voie dominante de l'ère | Titre *"Œuvre d'Ère"* (visible Parties suivantes), entrée Lore |
| Cumuler tous les bonus permanents de LabeurMax | Titre *"Maître du Souffle Vital"*, plafond LabeurMax porté à `220` |

---

## Points de calibrage à playtester

- [ ] `DailyLabeur = 100` + `LabeurMax = 100` → ressenti "une bonne journée d'aventure" ?
- [ ] Banking `+50` / décroissance `-25` → suffisant pour joueur intermittent ?
- [ ] Coûts par tier (×1.0 → ×8.0) → la spécialisation est-elle perçue comme nécessaire ?
- [ ] Bonus *"Œuvre signée"* à 90%+ → le joueur sent-il la différence ? L'UI met-elle assez en valeur le moment ?
- [ ] Repas `+10/+25/+50` → les cuisiniers ont-ils une vraie économie ?
- [ ] Rouille post-Souffle (`−15%` regen) → friction perçue comme "narrative" ou "punitive" ?
- [ ] Bonus regen Concordant (`+15%`) → assez sensible pour valoriser l'Accord ?

---

## Décisions actées (techniques)

- ✅ Échelle `[0, 100]`, banking jusqu'à `150`.
- ✅ Recharge journalière `+100` au tick 04:00 UTC.
- ✅ Régénération continue `+8/h` (en jeu) / `+10/h` (hors connexion).
- ✅ Auberge `+20/h`, camp `+5/h`, repas `+10/+25/+50`.
- ✅ Combat standard gratuit ; combat élite/raid coûte `5/15/25`.
- ✅ Multiplicateurs de tier `×1.0 → ×8.0`.
- ✅ MasteryDiscount jusqu'à `−40%` au palier Maître.
- ✅ Bonus qualité par tranche de Labeur courant : palier `≥80 / 50-79 / 25-49 / 10-24 / 1-9`.
- ✅ Flag *"Œuvre signée"* déclenché à `≥90%` LabeurMax investi sur une seule action.
- ✅ État *Épuisement* progressif (Fatigué → Épuisé → Au bout du rouleau).
- ✅ Modificateurs permanents de LabeurMax via Endurance, Maîtrises Maître, Concordant.
- ✅ Plafond absolu LabeurMax = `200` (220 avec titre Maître du Souffle Vital).

---

*Liens narratifs : [[Labeur]] | [[Le Souffle]] | [[L'Accord]] | [[Armes et Maîtrise]] | [[La Partie]] | [[Métiers]]*
*Liens techniques : [[HW Progression Component]] | [[Combat Attribute Set]] | [[SQL Characters]] | [[HUD]] | [[Inventory Items]]*
