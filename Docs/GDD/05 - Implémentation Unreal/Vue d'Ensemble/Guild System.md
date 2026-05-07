---
tags: [implementation, guild, territoire, siege, social, balance]
status: drafted
last_review: 2026-05-07
needs_review_for: [siege-window-playtest, guild-tax-balance, monument-cost-tuning]
type: implementation
canonical_concept: "[[Guildes]]"
---

# Guild System — Implémentation

> Page d'implémentation technique du concept narratif **[[Guildes]]**.
> Cette page contient les **chiffres, formules, specs Unreal et règles de balance**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Guildes]].

---

## Règles d'admission

| Paramètre | Valeur |
|---|---|
| Niveau minimum joueur pour fonder une guilde | 20 |
| Coût de fondation | 50 000 Éclats + 1 Sceau de Serment (item rare) |
| Nombre de co-fondateurs requis (signataires) | 5 minimum |
| Karma minimum des fondateurs | ≥ 0 (pas de hors-la-loi actif) |
| Délai de probation pour un nouveau membre | 7 jours réels |
| Serment de guilde | Texte personnalisable (max 500 caractères), affiché à l'admission |
| Refus de serment | Membre n'accède pas aux salles internes / banque / territoires |

**Vérifications serveur à l'admission** :
- Pas déjà membre d'une autre guilde (un joueur = une guilde active à la fois)
- Pas en cooldown d'exclusion (voir ci-dessous)
- Acceptation explicite du serment via UI

**Cooldown post-départ** :
| Cause | Cooldown avant ré-admission ailleurs |
|---|---|
| Départ volontaire | 24h |
| Exclusion par le Maître | 7 jours |
| Exclusion pour trahison (vol banque, espionnage) | 30 jours + tag public "Renégat" 30 jours |

---

## Taille maximale et seuils de progression

| Niveau guilde | Membres max | Membres actifs requis (30j) pour maintenir niveau |
|---|---|---|
| 1 | 30 | 5 |
| 2 | 60 | 15 |
| 3 | 100 | 30 |
| 4 | 150 | 50 |
| 5 | 200 | 80 |

**Plafond absolu** : 200 membres (au-delà, fragmentation forcée ou fondation de guildes-sœurs).

**Décroissance automatique** : si une guilde tombe en dessous des actifs requis pendant 60 jours, elle redescend d'un niveau (territoires en surplus passent en statut "négligé" — capturable par n'importe quelle guilde sans siège).

---

## Hiérarchie de rôles

| Rôle | Slots | Permissions clés |
|---|---|---|
| **Maître** | 1 | Tous droits : dissolution, déclaration de guerre, modification serment, transfert maîtrise |
| **Sénéchal** | 2 | Gestion territoire, déclaration siège, contrôle banque (sauf retrait Maître) |
| **Officier** | 8 | Recrutement, exclusion (sauf Sénéchal/Maître), gestion contributions, commandes en siège |
| **Vétéran** | illimité | Accès banque tier 1+2, vote consultatif sur décisions majeures |
| **Membre** | illimité | Accès banque tier 1, chat, participation territoire/siège |
| **Initié** | illimité | Probation 7j, accès chat seulement, pas de banque |

**Transmission de la maîtrise** :
- Volontaire : par UI, à un Sénéchal uniquement, cooldown 30 jours avant nouvelle transmission
- Inactivité Maître (90 jours déconnecté) : transfert automatique au Sénéchal le plus ancien
- Mort Cardinal (cas Souffle Cardinal) : voir §Souffle ci-dessous

---

## Règles de territoire et siège

### Plafonds de possession (rappel calibré)

| Niveau guilde | Avant-postes | Forts | Villes | Zones de ressources | Monuments |
|---|---|---|---|---|---|
| 1 | 1 | 0 | 0 | 1 | 0 |
| 2 | 2 | 0 | 0 | 2 | 0 |
| 3 | 3 | 1 | 0 | 3 | 1 |
| 4 | 4 | 2 | 1 | 4 | 1 |
| 5 | 5 | 3 | 2 | 5 | 2 |

### Siège — paramètres canoniques

| Phase | Durée / Paramètre |
|---|---|
| Déclaration | Coût : 5 000 Éclats + 200 unités ressources guerre (vivres, armement) |
| Préavis | 48h réelles |
| Fenêtre de bataille | 2h, créneau choisi par défenseur dans 3 propositions de l'attaquant |
| Tenue de l'objectif central | 15 min continues, max 40 vs 40 sur l'objectif |
| Cooldown post-siège (ville) | 7 jours avant nouvelle déclaration |
| Cooldown post-siège (fort) | 3 jours |
| Cooldown post-siège (avant-poste) | 24h |

### Période de grâce post-conquête

| Élément | Règle |
|---|---|
| Délai de bascule effective | 24h réelles |
| Coffres privés résidents | Inviolables, accès permanent |
| Téléport joueurs déconnectés | Vers point de passage le plus proche |
| Statut PvP intra-ville | Zone sûre maintenue (siège = mécanique programmée, pas combat libre) |
| Reprise des taxes | À la fin de la grâce (T+24h) |

### Siège du siège-mère (capitale guilde)

Si la **capitale** d'une guilde tombe :
- Tous les territoires liés perdent 50% bonus pendant 7 jours
- Cooldown de re-déclaration de capitale ailleurs : 14 jours
- Trésor banque guilde : **inviolable** (pas de pillage de banque, contrairement aux taxes/ressources de territoire)

---

## Contributions chiffrées

### Coût de progression de niveau guilde

| Niveau cible | Éclats | Bois | Minerai | Nourriture | Items spéciaux |
|---|---|---|---|---|---|
| 1 → 2 | 100 000 | 5 000 | 2 000 | 1 000 | — |
| 2 → 3 | 500 000 | 20 000 | 10 000 | 5 000 | 5 Sceaux d'Honneur |
| 3 → 4 | 2 000 000 | 80 000 | 40 000 | 20 000 | 20 Sceaux + 1 Relique d'Ère |
| 4 → 5 | 8 000 000 | 300 000 | 150 000 | 80 000 | 50 Sceaux + 3 Reliques + Condition cachée |

### Contributions individuelles (ledger)

Chaque membre dispose d'un **compteur de contribution glissant 30j** :
- Éclats déposés banque : 1 pt / 100 Éclats
- Ressources déposées : 1 pt / 10 unités (selon table)
- Participation siège : 50 pts / siège tenu
- Participation défense : 30 pts / défense réussie
- Quête de guilde complétée : 5-50 pts selon difficulté

**Seuils** :
| Contribution 30j | Statut |
|---|---|
| < 50 pts | Avertissement automatique |
| 50-200 pts | Membre régulier |
| 200-500 pts | Vétéran (auto-promotion possible) |
| > 500 pts | Pilier (bonus accès banque tier supérieur) |

---

## Mécanique des guerres de guildes

| Paramètre | Valeur |
|---|---|
| Déclaration de guerre | Coût : 20 000 Éclats + accord 3 Officiers minimum |
| Préavis | 72h réelles |
| Durée maximale d'une guerre | 14 jours, prolongeable par accord mutuel |
| Effets actifs | PvP autorisé entre membres déclarés, hors zones sûres ; objectifs de guerre générés |
| Zones de combat dédiées | Marches contestées (générées dynamiquement entre territoires des belligérants) |
| Conditions de victoire | Score d'objectifs (kills, captures de points, sièges remportés pendant la guerre) |
| Trêve forcée pendant Souffle | Oui (voir §Souffle ci-dessous) |
| Cooldown re-déclaration entre mêmes guildes | 30 jours |

**Score de guerre** :
```
Score = (kills × 1) + (objectifs capturés × 50) + (sièges remportés × 200) + (capitale prise × 1000)
```

**Récompenses de victoire** :
- Trophée de guerre (item monument, durée vie 1 Ère)
- Renom +500
- Reconnaissance auprès des factions alignées : +200
- Trésor de guerre : 30% des Éclats taxés sur les territoires pris

**Limite simultanée** : une guilde peut être en guerre contre **au maximum 2 guildes** simultanément (anti-pile-on).

---

## Taxes guilde

### Taxes prélevées par la guilde sur ses territoires

| Type de territoire | Plafond taxe | Bénéficiaire |
|---|---|---|
| Avant-poste | 5% sur ventes hôtel local | Banque guilde |
| Fort | 8% sur ventes + droits de passage 50 Éclats | Banque guilde |
| Ville | 10% sur ventes + 100 Éclats / résidence | Banque guilde (50%) + maintenance (50%) |
| Zone de ressources | 15% sur récolte des non-membres | Banque guilde |

**Plafond global anti-abus** : aucune taxe ne peut excéder **15%**. Les guildes peuvent baisser sous ces plafonds (taxe à 0% possible, signal politique fort).

### Taxes internes (membres → banque guilde)

- Optionnel : prélèvement automatique 1-5% sur revenus quêtes membres (toggle par membre, désactivé par défaut, activable par serment renforcé)
- Cotisation mensuelle : 0 à 1 000 Éclats / mois selon décision Maître
- Non-paiement cotisation 30j : rétrogradation Initié, accès banque coupé

### Maintenance des territoires

| Territoire | Coût d'entretien hebdomadaire |
|---|---|
| Avant-poste | 500 Éclats + 50 ressources |
| Fort | 2 500 Éclats + 200 ressources + 100 vivres garnison |
| Ville | 10 000 Éclats + 800 ressources + 400 vivres |
| Zone ressources | 1 000 Éclats |

**Si entretien non payé 14 jours** : territoire passe en "négligé" (perd bonus, capturable sans siège).

---

## Monuments guilde

### Types de monuments

| Type | Niveau guilde requis | Coût | Effet |
|---|---|---|---|
| **Stèle commémorative** | 3 | 50 000 Éclats + 1 Sceau d'Honneur | Inscrit nom guilde + 5 noms membres choisis ; trace permanente même après dissolution |
| **Statue de Maître** | 4 | 200 000 Éclats + 1 Relique d'Ère | Aura +5% Renom dans rayon 500m ; persiste 3 Ères |
| **Hall des Serments** | 4 | 500 000 Éclats + 5 Reliques | Bonus +10% gain XP guilde dans la zone ; serments des nouveaux membres y sont gravés |
| **Forteresse-Mémoire** | 5 | 2 000 000 Éclats + Condition cachée 🔒 | Persiste à travers tous les Souffles ; devient lieu d'événement scripté lors de Souffle Cardinal |

### Persistance à travers les Souffles

| Type monument | Petit Souffle | Grand Souffle | Cardinal |
|---|---|---|---|
| Stèle | Conservé | Conservé (déco peut changer) | Conservé, peut devenir ruine narrative |
| Statue | Conservé | -10% efficacité bonus, conservé visuellement | Cas par cas |
| Hall | Conservé, bonus dérive avec Accord guilde | Conservé, bonus recalculé | Cas par cas |
| Forteresse-Mémoire | Pleinement conservée | Pleinement conservée | Devient point d'événement scripté |

### Limite anti-spam

- Maximum 2 monuments actifs par guilde simultanément (cf. tableau plafonds)
- Maximum 1 nouveau monument tous les 90 jours réels
- Démolition par la guilde elle-même : possible, restitue 30% du coût
- Démolition par siège ennemi : nécessite contrôle 24h consécutives + coût 100 000 Éclats

---

## Balance des bonus de guilde

### Bonus passifs liés au niveau

| Niveau guilde | Bonus XP | Bonus craft | Réduction téléport intra-territoire | Slots banque |
|---|---|---|---|---|
| 1 | +2% | +1% qualité | 5% | 100 |
| 2 | +4% | +2% qualité | 10% | 250 |
| 3 | +6% | +3% qualité | 20% | 500 |
| 4 | +8% | +4% qualité | 35% | 1 000 |
| 5 | +10% | +5% qualité | 50% | 2 500 |

**Plafond cumulable** : ces bonus ne se cumulent pas avec les bonus de faction (voir [[Factions]]) au-delà de **+15% XP total** (cap dur).

### Bonus liés au territoire

| Territoire contrôlé | Bonus pour membres dans la zone |
|---|---|
| Avant-poste | +5% XP, respawn local |
| Fort | +8% défense, +5% PV max |
| Ville | +10% gains commerce, accès services réduits |
| Zone ressources | +15% rendement récolte |

### Bonus liés aux monuments (cumulables avec les autres)

| Monument actif | Bonus zone (rayon variable) |
|---|---|
| Stèle | Aucun bonus mécanique (purement narratif/social) |
| Statue de Maître | +5% Renom gain, 500m |
| Hall des Serments | +10% XP guilde, 1 km autour du Hall |
| Forteresse-Mémoire | +5% à toutes les stats des membres dans 2 km, + accès événements scriptés |

**Anti-snowball** : tous les bonus de guilde sont **soumis à la compression du Souffle** au même titre que les stats brutes (voir [[Souffle System]]). Une guilde dominante voit ses bonus ramenés à la moyenne au passage d'un Souffle.

---

## Souffle et guildes

### Ce qui est conservé

| Élément | Persistance |
|---|---|
| Existence de la guilde | Oui (tag, membres, hiérarchie) |
| Banque guilde (Éclats, items) | Oui, intégralement |
| Serment | Oui |
| Monuments | Oui (selon type, voir tableau ci-dessus) |
| Renom historique | Oui (archivé par Ère) |

### Ce qui est rééquilibré

| Élément | Effet au Souffle |
|---|---|
| Bonus de guilde au-dessus du seuil 50 | Compression formule canonique (voir [[Souffle System]]) |
| Territoires conquis pendant l'Ère sortante | **30% des territoires** redistribués en statut "négligé" — capturables sans siège pendant 14 jours |
| Taxes accumulées | Plafonnées : excédent au-dessus de 1M Éclats/territoire est versé aux PNJ résidents |
| Score de guerre en cours | Reset si guerre active au moment du Souffle ; trêve forcée 7 jours |

### Souffle Cardinal — règles spéciales

- Le Maître est-il connecté au moment du Cardinal ? Si oui, il participe à un événement scripté décisif. Sinon, le Sénéchal prend le relais.
- Toutes les guerres en cours sont annulées sans pénalité.
- Une fenêtre de **30 jours** post-Cardinal autorise la **fondation de guildes** sans coût en Éclats (uniquement le Sceau de Serment), pour favoriser la recomposition sociale.
- Les Forteresses-Mémoire deviennent des points d'événement scripté.

---

## Religions et guildes

| Paramètre | Règle |
|---|---|
| Une guilde peut se déclarer **alignée à une religion** | Oui, via UI, accord 3 Officiers |
| Bonus d'alignement religieux | +5% Reconnaissance auprès de la religion choisie, +2% bonus Voie pour les Liés à cette Voie |
| Coût d'alignement | 10 000 Éclats + 1 Sceau Sacré (loot dans temples) |
| Changement d'alignement | Cooldown 60 jours, coût doublé |
| Conflit avec religion adverse | +10% gains de guerre contre guildes alignées à la religion antagoniste |

**Religions antagonistes (matrice canonique)** : voir [[00 - Système Religieux]] pour la matrice complète. Exemples : Ordo Caelum ↔ Noctari, Ignis Aeternum ↔ Via Ventus, etc.

---

## Dépendances système

| Composant | Rôle |
|---|---|
| [[OWS Architecture]] | Synchronisation territoire / guilde multi-shard |
| [[Global Data Service]] | Persistance guilde, banque, ledger contributions |
| [[HW Progression Component]] | Application bonus de guilde + compression au Souffle |
| [[Quest System]] | Génération quêtes de guilde |
| [[Migration Accord]] | Recalcul bonus de guilde lors transition d'Ère |
| [[Entity Spawner]] | PNJ garnison / résidents villes guilde |
| [[Souffle System]] | Compression bonus, redistribution territoires négligés |

---

## Points de calibrage à playtester

- [ ] Plafond 200 membres — guildes saines ou trop diluées ?
- [ ] Coût fondation 50k Éclats + 5 cofondateurs — barrière utile ou frustrante ?
- [ ] Fenêtre de siège 2h + 15 min objectif — équilibre attaque/défense
- [ ] Taxe ville 10% — économique pour résidents non-membres ?
- [ ] Coût Forteresse-Mémoire (2M Éclats + condition cachée) — atteignable en cours d'Ère ?
- [ ] Redistribution 30% territoires au Souffle — choc social ou bouffée d'air ?
- [ ] Cap 2 guerres simultanées — anti-pile-on suffisant ?
- [ ] Cooldown Renégat 30j — assez dissuasif ?

---

## Décisions actées (techniques)

- ✅ Plafond 200 membres niveau 5
- ✅ Cofondateurs : 5 minimum
- ✅ Hiérarchie 6 rôles (Maître, Sénéchal ×2, Officier ×8, Vétéran, Membre, Initié)
- ✅ Plafond taxes 15% absolu
- ✅ 2 monuments max actifs par guilde
- ✅ 2 guerres simultanées max
- ✅ Cap +15% XP total (guilde + faction)
- ✅ Compression bonus de guilde au Souffle (formule canonique)
- ✅ 30% territoires redistribués "négligés" au Souffle
- ✅ Trêve forcée 7 jours pendant Souffle

---

*Liens narratifs : [[Guildes]] | [[Factions]] | [[Économie]] | [[PvP]] | [[L'Accord]] | [[Le Souffle]]*
*Liens techniques : [[OWS Architecture]] | [[Souffle System]] | [[HW Progression Component]] | [[Migration Accord]]*
