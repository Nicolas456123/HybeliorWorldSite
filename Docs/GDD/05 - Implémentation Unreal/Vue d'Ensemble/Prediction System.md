---
tags: [implementation, prediction, souffle, oracle, augures, bourse]
status: drafted
last_review: 2026-05-07
needs_review_for: [fiabilite-playtest, bourse-augures-economie, equilibrage-pari]
type: implementation
canonical_concept: "[[Prédiction]]"
---

# Prediction System — Implémentation

> Page d'implémentation technique du concept narratif **[[Prédiction]]**.
> Cette page contient les **chiffres, formules, règles de pari et specs Unreal**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Prédiction]].

---

## Disciplines — paramètres canoniques

Trois disciplines actives, chacune éclaire un aspect distinct du prochain Souffle.

| Discipline | Aspect prédit | Stat principale | Maîtrise | Outil signature | Fiabilité de base |
|---|---|---|---|---|---|
| **Astronomie** | TIMING (fenêtre temporelle) | Acuité | Maîtrise_Astronomie | Lunette astronomique, Astrolabe | ★★★★ ☆ |
| **Oracle** | NATURE de l'Ère (Voie/dominante probable) | Conscience | Maîtrise_Oracle | Cartes de Fatum, Miroir sombre | ★★★ ☆ ☆ |
| **Voie de Tempora** | ANALOGIE historique (archétype d'Ère) | Conscience | Maîtrise_Voie_Tempora | Cristaux temporels, Lieux d'Échos | ★★ ☆ ☆ ☆ |

**Score d'efficacité d'une lecture** :
```
Score_lecture = Stat_principale × Maîtrise × Modificateur_lieu × Modificateur_outil
```

Les modificateurs cumulés sont plafonnés à `× 2.0` pour éviter les dérives top-tier.

---

## Astronomie — règles techniques

| Paramètre | Valeur |
|---|---|
| Action | Observation nocturne (mini-jeu de calibrage de lunette) |
| Durée d'une session | 15 min IRL (10 min in-game compressé) |
| Fenêtre météo requise | Couverture nuageuse < 30% |
| Sortie | Estimation `T ± Δ jours` |
| Δ initial | ±60 jours (apprenti) à ±5 jours (Maître + Astrolabe) |
| Décroissance Δ | -10% par session validée, plancher absolu = ±2 jours |
| Cooldown | 1 session par nuit IRL par joueur |

**Précision dégradée** : pour les Souffles courts (< 4 mois d'Ère), Δ minimal augmente de +50%.

---

## Oracle — règles techniques

| Paramètre | Valeur |
|---|---|
| Action | Tirage rituel (cartes / osselets / scrying) |
| Coût Mana | 30% du pool max par tirage |
| Cooldown | 1 tirage par 24h IRL |
| Sortie | Distribution de probabilités sur 3 à 5 Voies/dominantes possibles |
| Risque échec critique | 5% — debuff *Esprit Voilé* (-20% Conscience pendant 24h IRL) |
| Bonus Lié à Fatum | +25% précision, -50% risque échec critique |

**Méthodes** :
| Méthode | Coût | Fiabilité | Drain |
|---|---|---|---|
| Lancer d'osselets | Léger (consommable) | -20% | Faible |
| Cartes de Fatum | Moyen (paquet rituel) | Standard | Moyen |
| Scrying en miroir sombre | Élevé (item rare) | +15% | Sévère (-50% Mana max 1h) |
| Augure rituel (sacrifice item) | Variable selon item | +30% | Sévère |

---

## Voie de Tempora — règles techniques

| Paramètre | Valeur |
|---|---|
| Pré-requis | Voie de Tempora niveau 3 minimum |
| Action | Pèlerinage à Lieu d'Écho + captation + analyse atelier |
| Durée totale | ~2h IRL (déplacement + rituel + analyse) |
| Sortie | Identifie l'archétype d'Ère analogue (catalogue [[Les Ères#Archétypes]]) |
| Risque écho corrompu | 15% (lecture inversée) |
| Bonus Lié à Tempora niv 5+ | -50% risque corrompu, +1 archétype révélé |

---

## Signes du monde — déclencheurs

Les signes ne sont pas des prédictions actives mais des **émissions environnementales** déclenchées par le serveur en fonction du `T_souffle` planifié.

### Signes faibles

Émis automatiquement à `T0 + 30-50% durée d'Ère`. Cf. [[Souffle System]] §"Phases techniques".

| Signe | Source | Fréquence | Lisibilité |
|---|---|---|---|
| PNJ rapporte un rêve étrange | Quêtes ambiantes générées | 1-3 par semaine IRL | Acuité ≥ 30 pour repérer |
| Migration animale à contre-saison | [[Entity Spawner]] biaisé | Continue, observable | Maîtrise_Survie ≥ 20 |
| Constellation tremble (variant visuel) | Sky shader pulse | Toutes nuits | Maîtrise_Astronomie ≥ 30 |
| Floraison précoce | Foliage variant | Statique sur zones | Maîtrise_Herboristerie ≥ 20 |
| Silence forestier | Ambient audio mix | Sporadique | Acuité ≥ 40 |

### Signes forts

Émis à `T0 + (durée - 1 à 2 sem)`. Lisibilité **publique** — aucune Maîtrise requise.

| Signe | Effet |
|---|---|
| Événement mondial annonciateur | VFX ciel global, narration in-world |
| Oracles parlent ouvertement | PNJ Oracles diffusent prédictions publiques |
| Activation Bourse des Augures | Période de paris ouverte, cf. ci-dessous |
| Veillées rituelles guildes | Quêtes dynamiques disponibles |

---

## Bourse des Augures — mécanique de pari

### Conditions d'ouverture

La Bourse s'active à l'émission des **signes forts** et reste ouverte jusqu'au Souffle.

### Misages — règles

| Paramètre | Valeur |
|---|---|
| Mise minimale | 10 Éclats |
| Mise maximale | 10 000 Éclats par joueur par fenêtre |
| Types de pari | (a) Voie/dominante de l'Ère N+1 ; (b) fenêtre temporelle ±3 jours ; (c) combiné Voie+fenêtre |
| Cote initiale | 1.0 sur toutes les options |
| Évolution cote | Modèle bookmaker (totalisateur pondéré par les misages) |
| Frais maison (Conseil des Augures) | 5% du pot total |

### Calcul des gains

```
Gain_brut = Mise × Cote_finale × (1 - Frais_maison)
Gain_net = Gain_brut - Mise        si gagnant
Perte    = Mise                    si perdant
```

### Bonus Concordant

Un joueur **Concordant** (Accord 100% pendant l'Ère N, voir [[Souffle System]] §"Conditions cachées") déclenche :

| Avantage Concordant | Valeur |
|---|---|
| Réduction frais maison | 5% → 2% sur ses propres misages |
| Bonus de gain | +15% sur Gain_net |
| Cap mise individuelle | levé à 25 000 Éclats |
| Visibilité cote | accès aux misages anonymisés des autres joueurs (info privilégiée) |

**Règle** : ces bonus s'appliquent uniquement si le joueur est Concordant **au moment du Souffle**. Perdre l'Accord en fin d'Ère annule rétroactivement les bonus (les gains restent au taux standard).

### Cotes des prédicteurs renommés

Les joueurs ayant publié des prédictions vérifiables voient leur **Renom** influencer le marché.

| Renom | Effet sur les misages publics |
|---|---|
| Renom < 100 | Aucun effet |
| Renom 100-499 | Misages affichés publiquement, influence marginale |
| Renom 500-999 | Pondération ×1.2 sur les cotes (les joueurs suivent) |
| Renom ≥ 1000 (Prophète) | Pondération ×1.5, possibilité de vendre des prédictions privées avant publication |

---

## Titre Prophète — conditions et effets

### Conditions d'obtention

```
Si (3 prédictions publiques successives correctes)
   ET (chaque prédiction couvre Voie + fenêtre ±5 jours)
   ET (prédictions postées avant émission des signes forts)
→ Obtention du titre "Prophète"
```

**Reset** : une prédiction ratée **après** obtention ne retire pas le titre, mais réinitialise le compteur pour de futurs paliers.

### Effets du titre

| Effet | Détail |
|---|---|
| Persistance | Survit aux Souffles (titre gravé, voir [[Souffle System]] §"Préservation") |
| Renom passif | +500 Renom permanent |
| Accès | Conseil des Augures (instance sociale d'Astravia) |
| Bourse | Cap mise levé à 50 000 Éclats |
| Économie | Peut vendre prédictions privées (item lettré, échangeable) |
| Quêtes | Débloque ligne de quêtes "Voix du Cosmos" |
| Rétro-effet | Si réputation chute (3 prédictions ratées d'affilée après le titre), passage en *Faux Prophète* — Renom -1000, exclusion temporaire de la Bourse 30 jours IRL |

### Paliers ultérieurs

| Palier | Condition | Récompense |
|---|---|---|
| Prophète Confirmé | 6 prédictions correctes successives | +1000 Renom, accès archives Bourse |
| Voix du Cosmos | 9 prédictions correctes successives | PNJ historique nommé d'après le joueur |
| Cardinal Lecteur | Prédire correctement un Souffle Cardinal | Légendaire — gravure mondiale, voir [[Souffle System]] §"Cardinaux" |

---

## Reconnaissance et Renom — tracking

| Action | Reconnaissance | Renom |
|---|---|---|
| Prédiction privée correcte (vendue à un client) | +5 par client satisfait | 0 |
| Prédiction publique correcte | +10 | +50 |
| Prédiction publique ratée | -5 | -100 |
| Contribution à un almanach validé | +20 | +30 |
| Référencement par PNJ savant | 0 | +25 |
| Faux Prophète (3 ratés post-titre) | -50 | -1000 |

---

## Interactions avec [[Souffle System]]

| Interaction | Détail |
|---|---|
| `T_souffle` | Le Prediction System lit (read-only) la valeur planifiée par le Souffle System pour calibrer les fenêtres affichées |
| Émission des signes faibles | Déclenchée par Souffle System à `T0 + 30-50% durée` ; consommée par Prediction System pour activer les déclencheurs ci-dessus |
| Émission des signes forts | Déclenchée par Souffle System à `T - 1 à 2 sem` ; ouvre la Bourse |
| Validation des prédictions | Au tick du Souffle, Prediction System reçoit l'EraConfig(N+1) effective et valide les paris |
| Persistance titres | Souffle System préserve le titre "Prophète" via la liste `titres_perennes` (voir [[Souffle System]] §"Conditions cachées") |
| Bonus Concordant | Le statut Concordant (calculé par Souffle System / Migration Accord) est lu par Prediction System pour appliquer les bonus Bourse |
| Souffle anticipé par condition cachée | Si un joueur déclenche un Souffle anticipé, la Bourse se ferme immédiatement et tous les misages en cours sont remboursés à 100% (pas de gain, pas de perte) |

---

## Flux serveur — cycle de prédiction

```
1. Souffle System publie EraConfig(N) et T_souffle planifié
2. Prediction System initialise :
   - Catalogue de signes faibles candidats
   - Fenêtre Bourse fermée
3. À T0 + 30-50% durée :
   - Souffle System émet signal "signes_faibles"
   - Prediction System active les déclencheurs (PNJ, sky, foliage, audio)
4. À T_souffle - 1 à 2 sem :
   - Souffle System émet signal "signes_forts"
   - Prediction System ouvre la Bourse des Augures
   - PNJ Oracles publient leurs lectures publiques
5. Joueurs misent / publient prédictions / vendent privées
6. Au tick du Souffle :
   - Souffle System fournit EraConfig(N+1) finale
   - Prediction System :
     a) Verrouille la Bourse
     b) Calcule les gagnants (Voie + fenêtre)
     c) Applique frais maison (5% standard, 2% Concordant)
     d) Distribue les gains
     e) Met à jour Reconnaissance et Renom de chaque prédicteur
     f) Vérifie conditions de titre (Prophète, paliers)
     g) Persiste les titres via Souffle System
7. Reset Bourse, retour étape 1 pour Ère N+1
```

---

## Lieux dédiés (POI)

| Lieu | Localisation | Discipline | Bonus mécanique |
|---|---|---|---|
| Observatoire Étoilé d'Astravia | Astravia | Astronomie | Δ × 0.7 (précision +30%) |
| Pierres de Fatum | Marais de Mosrack, Onara | Oracle | -50% risque échec critique |
| Échos d'Akmoral | Plaines de Glas | Voie de Tempora | -75% risque écho corrompu |
| Sanctuaires d'Animaux | Sites continentaux | Lecture animale (passif) | Détection signes faibles automatique |
| Conseil des Augures | Astravia (instance) | Bourse | Accès Prophètes seulement |

---

## Items signature

| Item | Effet | Rareté |
|---|---|---|
| Lunette du Lecteur | Maîtrise_Astronomie ×1.2 | Rare (craft Maître) |
| Astrolabe d'Astravia | Maîtrise_Astronomie ×1.4, exige formation | Légendaire |
| Cartes de Fatum (paquet) | Tirage standard amplifié | Peu commun |
| Lame rare des Cartes de Fatum | +15% précision sur tirage spécifique | Rare à Légendaire |
| Cristal de Tempora | Capter un écho pour analyse différée | Rare |
| Miroir sombre | Vision Oracle profonde, drain Mana sévère | Rare |
| Sifflet de la Faune | Focalise observation animale (200m) | Peu commun |
| Encens sacré | Rituels religieux amplifiés | Commun à Rare |

---

## Garde-fous

- ✅ Plafond fiabilité globale : aucune combinaison ne dépasse **95%** de précision (5% irréductible).
- ✅ Cap misage individuel par fenêtre (10k / 25k Concordant / 50k Prophète).
- ✅ Vérifiabilité : toutes les prédictions publiques sont enregistrées avec timestamp.
- ✅ Anti-monopole : un joueur ne peut publier que **3 prédictions publiques** par fenêtre temporelle.
- ✅ Pas de pay-to-predict : tous les outils sont craftables ou drop in-game.
- ✅ Souffle anticipé → remboursement intégral des misages (équité).

---

## Dépendances système

| Composant | Rôle |
|---|---|
| [[Souffle System]] | Source de vérité pour T_souffle et EraConfig |
| [[Migration Accord]] | Source du statut Concordant |
| [[Quest System]] | Génération des quêtes liées à la Voix du Cosmos |
| [[Entity Spawner]] | Migration animale (signes faibles) |
| [[HW Environment Manager]] | Variants visuels constellations / floraison |
| [[Global Data Service]] | Stockage misages, prédictions, titres |
| [[OWS Architecture]] | Synchronisation multi-shard de la Bourse |

---

## Points de calibrage à playtester

- [ ] Δ astronomie : ±60 → ±2 jours, courbe trop douce / juste / trop dure ?
- [ ] Coût Mana Oracle 30% : drain perçu comme "engagé" ou "punitif" ?
- [ ] Bonus Concordant Bourse +15% : trop généreux face aux non-Concordants ?
- [ ] Cap mise 10k : trop bas (frustration whales) / trop haut (pay-to-predict ressenti) ?
- [ ] Seuils titre : 3 / 6 / 9 — friction d'obtention adaptée ?
- [ ] Faux Prophète : exclusion 30 jours, trop sévère ou nécessaire ?

---

## Décisions actées (techniques)

- ✅ Trois disciplines actives : Astronomie, Oracle, Voie de Tempora
- ✅ Bourse ouverte à l'émission des signes forts uniquement
- ✅ Titre Prophète : 3 prédictions publiques successives correctes (Voie + fenêtre ±5j)
- ✅ Bonus Concordant Bourse : -3% frais, +15% gains, cap doublé
- ✅ Plafond fiabilité 95% (5% irréductible)
- ✅ Persistance titres déléguée à [[Souffle System]] §"Conditions cachées"
- ✅ Frais maison 5% standard, 2% Concordant
- ✅ Souffle anticipé → remboursement intégral

---

*Liens narratifs : [[Prédiction]] | [[Le Souffle]] | [[Les Ères]] | [[L'Accord]] | [[Le Lien]]*
*Liens techniques : [[Souffle System]] | [[Migration Accord]] | [[Quest System]] | [[Entity Spawner]]*
