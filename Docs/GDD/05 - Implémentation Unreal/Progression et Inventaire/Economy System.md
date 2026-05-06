---
tags: [implementation, economy, currency, market, balance, gold-sinks]
status: drafted
last_review: 2026-05-07
needs_review_for: [tarifs-pnj-playtest, courbe-inflation, taxes-hv-tuning]
type: implementation
canonical_concept: "[[Économie]]"
---

# Economy System — Implémentation

> Page d'implémentation technique du concept narratif **[[Économie]]**.
> Cette page contient les **chiffres, formules, taux, tarifs et règles de balance**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Économie]].

---

## Monnaie canonique — L'Éclat

### Hiérarchie des unités

| Unité | Valeur en Esquilles | Usage typique |
|---|---|---|
| **Esquille (e)** | 1 | Monnaie courante, transactions de PNJ de base, pourboires |
| **Éclat (É)** | 100 e | Standard de commerce, prix d'items communs/rares |
| **Grand Éclat (GÉ)** | 100 É = 10 000 e | Transactions majeures, items magistraux, foncier guilde |

**Notation interne (DB / UI)** : valeur stockée en **Esquilles** (entier 64 bits). Conversion d'affichage automatique selon contexte UI.

```
displayPrice(esquilles) :
  if esquilles >= 10000 then "X GÉ Y É Z e"
  elif esquilles >= 100 then "Y É Z e"
  else "Z e"
```

### Bornes techniques

| Paramètre | Valeur | Justification |
|---|---|---|
| Capacité max portefeuille joueur | `2^53 - 1` esquilles | Limite int safe JS / blueprint |
| Plafond soft d'alerte économique | 5 000 GÉ par joueur | Trigger d'analyse anti-RMT |
| Précision minimale d'une transaction | 1 Esquille | Pas de fractions |

---

## Sources de monnaie par activité — table canonique

Valeurs en **Esquilles** (1 É = 100 e). Modulables ±20% selon Ère, région, état du marché.

| Activité | Gain typique | Cooldown / cap |
|---|---|---|
| Quête d'amorce (PNJ ville) | 50–500 e | Sans CD, scénarisé |
| Quête narrative principale | 500–5 000 e | Unique |
| Quête IA générée | 200–2 000 e | Cap 10/jour |
| Quête d'Ère | 1 000–10 000 e | Lié au cycle [[Souffle System]] |
| Événement mondial | 5 000–50 000 e | 1–3 par semaine |
| Boss mondial (loot + or) | 10 000–200 000 e | 1 par cycle de spawn |
| Mob standard (drop) | 5–50 e | Diminishing returns sur farm |
| Mob d'élite | 100–1 000 e | Anti-farm soft cap |
| Vente de ressources brutes (PNJ) | 60–80% du prix HV moyen | Régulé par stock PNJ |
| Vente d'item crafté (PNJ) | 50–70% du prix HV moyen | Décourage vente PNJ vs HV |
| Mining/Cueillette (Labeur) | 10–500 e par node | Selon rareté node |
| Récompense de faction | 100–10 000 e | Voir [[Factions]] |
| Bounty PvP encaissée | 100% du fond bounty | Voir [[PvP]] |
| Salaire de garde de territoire (guilde) | 500–5 000 e/sem | Si guilde paie |

### Diminishing returns sur farm répétitif

```
gain(n_e_kill_in_zone) = base_drop × 1 / (1 + 0.05 × n)
  où n = nb de mêmes mobs tués dans la dernière heure (par joueur, par zone)
```

Reset toutes les **60 minutes** de temps réel.

---

## Tarifs PNJ — services et consommables

### Réparation d'équipement (forgeron PNJ)

```
coût_réparation = base_tier × usure_pct × multiplicateur_région
```

| Tier item | base_tier (Esquilles) |
|---|---|
| Commun | 200 |
| Inhabituel | 800 |
| Rare | 3 000 |
| Magistral | 12 000 |
| Légendaire | 50 000 |
| Mythique | 200 000 |

`usure_pct` = pourcentage de durabilité perdue à réparer (0.0–1.0).
`multiplicateur_région` = 0.8 (forgeron de capitale) à 1.5 (forgeron isolé).

> **Réparation par joueur forgeron** : prix négocié librement, mais matières premières achetées au PNJ. Économie d'artisans encouragée.

### Voyage rapide

| Service | Coût (e) | Conditions |
|---|---|---|
| Balise → Balise (même continent) | 2 000–20 000 | Distance × multiplicateur |
| Balise → Balise (continent différent) | 50 000–200 000 | Très coûteux, dissuade le hop |
| Téléport direct (Voie de Navigor PNJ) | 50 000+ | Service rare, instantané |
| Voyage en caravane (lent, sûr) | 500–5 000 | Alternative économique |

Formule générique :
```
coût_balise = 2000 + 50 × distance_km + 5000 × frontières_traversées
```

### Banque et stockage

| Service | Coût |
|---|---|
| Stockage banque public | 100 e / slot / jour |
| Coffre privé en auberge | 10 000 e / mois |
| Banque guilde (slot) | Voir [[Guildes]] |
| Banque d'Éclats (dépôt épargne) | Voir §Banques d'Éclats ci-dessous |

### Services de personnage

| Service | Coût (e) |
|---|---|
| Reset Focus hors fenêtre hebdo | 50 000 × Ères Concordées |
| Renomination | 500 000 |
| Re-roll apparence (barbier) | 20 000 par changement |
| Réinitialisation maîtrise d'arme | 300 000 |
| Identification d'item rare | 20 000–100 000 |
| Désenchantement | 10 000 |

---

## Hôtel des Ventes — taxes et règles

### Taxes canoniques

| Taxe | Valeur | Application |
|---|---|---|
| Taxe de mise en vente | **2%** du prix demandé | Au moment du listing, non remboursé si invendu |
| Taxe de transaction | **5%** | Retirée au vendeur sur vente effective |
| Taxe de listing prolongé | **+1% par jour** | Au-delà de 7 jours, plafonné à +14% (jour 21) |
| Plafond automatique d'expiration | jour 30 | Item retourné à l'expéditeur |

### Distribution des taxes (gold sink + redistribution)

```
50% → bounty fund (voir [[PvP]])
30% → destruction nette (sink anti-inflation)
20% → fonds régional (subventions PNJ, événements de ville)
```

### Anti-manipulation

| Règle | Valeur |
|---|---|
| Prix max d'un item | 100 × prix médian glissant 7 jours |
| Prix min d'un item | 0.1 × prix médian glissant 7 jours |
| Limite de listings simultanés / joueur | 50 (étend +10 par tier de guilde) |
| Cooldown re-listing (même item) | 5 minutes |

---

## Banques d'Éclats — épargne et crédit

### Compte d'épargne

| Niveau | Plafond dépôt | Intérêt par cycle (semaine RT) |
|---|---|---|
| Tier 0 (Basique) | 100 GÉ | 0% (coffre) |
| Tier 1 (Avec compte) | 1 000 GÉ | 0.5% |
| Tier 2 (Citoyen reconnu) | 10 000 GÉ | 1.0% |
| Tier 3 (Faction alliée) | 100 000 GÉ | 1.5% |

**Plafond dur d'intérêt par joueur** : 100 GÉ / semaine (anti-thésaurisation).

### Crédit / prêt

| Service | Conditions | Coût |
|---|---|---|
| Prêt court terme (caution PNJ) | Karma neutre+, < 10 000 É | 8% / cycle |
| Prêt entre joueurs (contrat in-game) | Liberté contractuelle | Taux libre, écrits par contrat |
| Hypothèque sur foncier guilde | Tier 2 guilde | 3% / cycle |

Défaut de paiement → saisie automatique sur compte épargne, puis sur portefeuille à la connexion.

---

## Économie d'enchantement (gold sink dédié)

| Sink | Coût |
|---|---|
| Maintenance enchantement temporaire | 50% du coût initial du cast | Re-cast périodique |
| Désenchantement standard | 10 000 e | Récupère 10–30% des composants |
| Désenchantement de Magistral+ | 50 000–500 000 e | Récupère composants signés |

---

## Formule d'inflation et régulation dynamique

### Mesure de l'inflation

```
IPH (Indice des Prix Hybelior) = moyenne pondérée des prix HV de 50 items canoniques
référence : IPH de fin Ère 0 = 100
```

Les 50 items canoniques (panier représentatif) sont mis à jour à chaque Souffle.

### Boucle de régulation

```
Si IPH > 110 (inflation > 10%) :
  → augmentation des coûts de services PNJ × 1.05
  → augmentation de la taxe de mise en vente +0.5%
  → trigger d'événements "raretés" (sinks narratifs)

Si IPH < 90 (déflation > 10%) :
  → diminution des coûts de services PNJ × 0.95
  → augmentation des drops mob × 1.1
  → spawn d'événements de récompense
```

Recalcul **hebdomadaire** par job serveur. Variations capées à ±10% par cycle pour éviter les chocs.

### Reset partiel au Grand Souffle

À chaque [[Souffle System#Grand Souffle|Grand Souffle]] :
- Items d'Ères précédentes voient leur **valeur de marché × 0.7** (compression)
- Mais gagnent un **statut "Relique"** → +20% prix pour collectionneurs
- Net effet : items hauts tier d'anciennes Ères deviennent objets de prestige
- Voir [[Souffle System#Compression]] pour la formule générale

---

## Prix moyens canoniques (ère stable)

Valeurs **indicatives**, en **Esquilles**, pour un marché HV en début d'Ère (IPH = 100).

### Consommables

| Item | Prix moyen |
|---|---|
| Potion de soin mineure | 50 |
| Potion de soin majeure | 1 500 |
| Nourriture de base | 20 |
| Plat cuisiné (buff) | 200–2 000 |
| Parchemin d'enchantement temporaire | 5 000–50 000 |

### Équipement (par tier, item moyen)

| Tier | Prix moyen HV |
|---|---|
| Commun | 500 |
| Inhabituel | 5 000 |
| Rare | 50 000 |
| Magistral | 500 000 (5 GÉ) |
| Légendaire | 5 000 000 (50 GÉ) |
| Mythique | 50 000 000+ (500 GÉ+) |

### Ressources brutes

| Ressource | Prix moyen |
|---|---|
| Minerai commun (par unité) | 10 |
| Minerai rare | 500 |
| Minerai mythique | 50 000 |
| Plante commune | 5 |
| Plante rare | 200 |
| Composant cosmique (post-Souffle) | 20 000+ |

---

## Disparités régionales

| Région | Multiplicateur prix services | Multiplicateur prix items |
|---|---|---|
| Capitale de continent | 0.8 | 1.0 (référence) |
| Ville moyenne | 1.0 | 1.0 |
| Ville frontalière | 1.2 | 1.1 |
| Avant-poste isolé | 1.5 | 0.8 (achat ressources locales) / 1.4 (vente luxe) |
| Zone sauvage / hors la loi | 2.0 | Variable |

**Conséquence émergente** : commerce inter-régional rentable, métier de marchand-caravanier viable.

---

## Courbes de marché — modèle dynamique

Chaque item HV suit une courbe `prix = f(offre, demande, ère)`.

```
prix_marché(item, t) = prix_référence(item)
                     × ratio_offre_demande(item, t)
                     × modulateur_ère(item, ère_courante)
                     × bruit_aléatoire(±5%)

ratio_offre_demande = clamp( demande_glissante_7j / offre_glissante_7j , 0.5 , 2.0 )
modulateur_ère     = 1.0 si neutre,
                     1.3 si item résonne avec ère dominante,
                     0.7 si item dissonant avec ère dominante
```

**Mise à jour** : recalcul des prix de référence toutes les 6 heures (job serveur).
**Affichage joueur** : tendance 7 jours sur fiche item HV (montant / stable / baisse).

---

## Droits de douane inter-nations

Voir [[Factions]] pour le détail des relations.

| Relation entre nations | Taxe sur valeur transportée |
|---|---|
| Alliées | 0% |
| Cordiales | 2% |
| Neutres | 5% |
| Tendues | 10% |
| Hostiles | Confiscation possible |

Application : caravanes joueur, transport de stock guilde inter-territoires.

---

## Logistique guildes

| Service | Coût |
|---|---|
| Création de guilde | 100 000 e |
| Tier 1 territoire | 100 000 e/sem maintenance |
| Tier 2 territoire | 1 000 000 e/sem |
| Tier 3 territoire | 10 000 000 e/sem |
| Construction structure | Variable, voir [[Guildes]] |
| Mercenariat PNJ contracté | 5 000–50 000 e / mission |

Maintenance non payée → décroissance de territoire (voir [[Guildes]]).

---

## Prestige et social — gold sinks lourds

| Sink | Coût (Esquilles) |
|---|---|
| Cosmétiques PNJ exclusifs | 500 000 – 5 000 000 |
| Tatouages culturels | 50 000 – 500 000 |
| Statue commémorative (ville) | 10 000 000 (100 GÉ) |
| Festival privé / mariage | 1 000 000+ |
| Sponsorisation d'événement public | Variable |

Statue commémorative : héritage permanent, sauf modification au [[Souffle System#Souffle Cardinal|Souffle Cardinal]].

---

## Balance économique — synthèse des flux

### Inputs (création de monnaie)

| Source | Volume estimé / joueur actif / semaine |
|---|---|
| Quêtes & événements | ~50 000–200 000 e |
| Loot mob & boss | ~30 000–500 000 e |
| Ventes PNJ | ~10 000–100 000 e |
| Récompenses faction | ~5 000–50 000 e |

### Outputs (sinks)

| Sink | Volume estimé / joueur actif / semaine |
|---|---|
| Réparations | ~10 000–50 000 e |
| Voyages rapides | ~5 000–30 000 e |
| Maintenance banque/coffre | ~700–10 000 e |
| Maintenance enchantements | ~5 000–50 000 e |
| Taxes HV (sur vendeurs actifs) | ~5–10% du volume échangé |
| Services personnage (ponctuels) | Variable |
| Maintenance guilde (réparti) | ~10 000–100 000 e selon tier |

**Cible balance** : sinks ≈ inputs ± 5% sur fenêtre glissante 30 jours par cohorte de joueur (casual / régulier / hardcore).

### Indicateurs de pilotage

| Métrique | Cible | Action si dévie |
|---|---|---|
| IPH (Indice Prix Hybelior) | 95–105 | Trigger boucle régulation |
| Médiane portefeuille joueur actif | stable ±15% / mois | Investigation économique |
| Volume HV / semaine | croissance ≤ 5%/mois | Sinon : ajustement taxes |
| Top 1% richesse / médiane | < 50× | Sinon : sinks de prestige boostés |

---

## Cross-link Bourse des Augures

> ⚠️ Système non encore implémenté — voir [[Prediction System]] (à créer) pour le détail.

Aperçu du flux :
- Joueurs misent des Éclats sur des prédictions (prochain Souffle, événements d'Ère, conditions cachées)
- House cut : 5% (gold sink)
- Gains payés au prorata des paris validés
- Plafond mise / joueur / cycle : 100 GÉ
- Volatilité = source narrative ([[Le Souffle]] influence les marchés)

Liens économiques :
- Mises = sink supplémentaire si prédictions fausses
- Gains = source de monnaie pour les "Prophètes" (voir [[Souffle System#Conditions cachées]])
- Items "Relique" peuvent être mis en jeu en complément des Éclats

---

## Dépendances système

| Composant | Rôle dans l'économie |
|---|---|
| [[OWS Architecture]] | Synchro multi-shard des prix HV et compte joueur |
| [[Global Data Service]] | Stockage IPH, prix de référence, panier canonique |
| [[HW Inventory Component]] | Portefeuille joueur, transactions atomiques |
| [[HW Progression Component]] | Karma économique (réputation marchande) |
| [[Loot System]] | Inputs de monnaie (drops mobs/boss) |
| [[Quest System]] | Inputs de monnaie (récompenses) |
| [[Souffle System]] | Compression valeur items inter-Ère, statut Relique |
| [[Accord System]] | Œuvres signées → bonus de prix HV |
| [[Prediction System]] | Bourse des Augures (à venir) |

---

## Points de calibrage à playtester

- [ ] Tarifs réparation tier Magistral+ — perçus comme "investissement" ou "punition" ?
- [ ] Taxes HV 2% + 5% — équilibrage anti-flip vs friction marchande
- [ ] Diminishing returns farm — courbe 1/(1+0.05n) trop douce / trop dure
- [ ] Plafond intérêt épargne 100 GÉ/sem — anti-thésaurisation efficace ?
- [ ] Multiplicateurs régionaux 0.8–1.5 — assez incitatif au commerce inter-régional ?
- [ ] Modulateur ère ±30% sur prix items — ressenti économique ou anecdotique ?
- [ ] Volume sinks vs inputs — convergence ou divergence sur 30 jours ?

---

## Décisions actées (techniques)

- ✅ Monnaie unique L'Éclat, hiérarchie Esquille / Éclat / Grand Éclat (1 / 100 / 10 000)
- ✅ Stockage interne en Esquilles (int 64)
- ✅ Taxes HV : 2% listing + 5% transaction + 1%/jour au-delà 7 jours
- ✅ Distribution taxes : 50% bounty / 30% sink net / 20% fonds régional
- ✅ IPH (Indice Prix Hybelior) — boucle de régulation hebdomadaire ±10% max
- ✅ Compression items inter-Ère × 0.7 + statut Relique
- ✅ Multiplicateurs régionaux 0.8–2.0 selon zone
- ✅ Banque d'Éclats — épargne plafonnée, intérêts cap 100 GÉ/sem
- ✅ Diminishing returns farm 60 min, formule 1/(1+0.05n)

---

*Liens narratifs : [[Économie]] | [[Métiers]] | [[Guildes]] | [[Factions]] | [[L'Accord]] | [[Le Souffle]]*
*Liens techniques : [[HW Inventory Component]] | [[Loot System]] | [[Quest System]] | [[Souffle System]] | [[Accord System]] | [[Prediction System]]*
