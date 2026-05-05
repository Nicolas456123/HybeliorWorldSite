---
tags: [métier, archétype, exploration, vivacité, acuité]
type: archetype
category: Métier
catégorie_métier: Exploration
stat_principale: Vivacité
stats_secondaires: [Acuité, Vigueur, Endurance, Verbe]
craft_category: -
sources_ressources_accessibles: [-]
stations_principales: [Bureau de bounty (en ville), Cabane de chasseur, Camp d'embuscade, Avant-poste de frontière]
outils_principaux: [Arme principale (tirée du Combat), Filet renforcé, Cordes, Menottes, Affiches de prime, Compas, Cor de signalement]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert (mais profession violente)
biomes_associés: [Frontières, Routes, Camps de hors-la-loi, Tempéré, Désolation, Marécages, Désert]
métiers_complémentaires: [Mercenaire, Soldat, Garde, Chasseur de créature, Cartographe, Espion]
era_modulation: false
status: drafted
last_review: 2026-05-01
---

# 🎯 Chasseur de primes — Archétype Métier

> *"La prime parle plus fort que le sang. Mais le sang reste. Toujours."*

---

## 1. Vue d'ensemble

Le **Chasseur de primes** est le **traqueur de personnes**. Sa cible : **PNJ criminels** (avis de recherche émis par une autorité — seigneur, juge, faction) et **joueurs au statut Karma rouge ou banni** (voir [[PvP]] §Karma). Son gain : **bounty** — récompense officielle, payée par le **bounty fund** alimenté par 50% des taxes de l'hôtel des ventes (voir [[Économie]] §Bounty fund et [[PvP]] §Bounty).

> [!important] Trois chasseurs distincts
> - **[[Chasseur de créature]]** — cible = créatures, gain = loot/contrats sur monstres
> - **[[Chasseur de trésors]]** — cible = reliques, ruines, gain = trésors et lore
> - **Chasseur de primes** *(ce fichier)* — cible = **personnes** (PNJ ou joueurs karma rouge), gain = **bounty officiel**

Métier officiellement **karma vert** : tuer un joueur **rouge** ou un PNJ avec une **prime active** ne génère **jamais de karma négatif** (voir [[PvP]] §Définition stricte). Mais c'est une profession **violente**, et certains chasseurs glissent vers l'illégalité (tuer un suspect non-confirmé, accepter des contrats privés borderline). Le pur Chasseur de primes garde un cadre légal — proche du Soldat (qui sert un État) mais pas affilié à un État ; proche du [[Mercenaire]] (combat à la demande) mais avec une **cible spécifique et nommée**.

Hybelior connaît plusieurs traditions : les **chasseurs de l'Ouest sauvage** (frontières de [[Galenor]] et [[Onara]]), les **traqueurs de Lythar** (cavaliers nomades, [[Ilthara]]), les **rouges qui chassent les rouges** (fait rare mais existant — outlaws auto-régulateurs), et les **bounty-hunters institutionnels** ([[Mosrack]], guilde structurée).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Vivacité** — combat rapide (cibles humanoïdes intelligentes), esquive, immobilisation
- **Stats secondaires** : **Acuité** (pistage humain, lecture d'indices, identification de la cible), **Vigueur** (subduer une cible vivante, encaisser), **Endurance** (longues traques sur plusieurs jours), **Verbe** (interrogatoire, négociation avec témoins, marchandage de la prime)
- **Maîtrises** :
  - `Maîtrise_Pistage_Humain` — distinct du pistage de créatures (recoupe avec [[Espion]] et certains [[Détective]])
  - Maîtrise d'arme (combat, voir [[Armes et Maîtrise]])
  - `Maîtrise_Capture` — immobiliser vivant (prime souvent meilleure si cible vivante)
  - `Maîtrise_Interrogatoire` (Adepte+, recoupe [[Espion]])

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2.

---

## 3. Sources de ressources & compétences

**Consomme** :
- **Affiches de prime** (information officielle, distribuée par juges et seigneurs)
- **Munitions, armes** ([[Forgeron]])
- **Filets, cordes, menottes** ([[Forgeron]], [[Tisserand]])
- **Cartes de frontière** ([[Cartographe]])
- **Provisions** ([[Cuisinier]] / [[Boulanger]])
- **Information** — payée à des [[Espion|indics]], [[Tavernier|taverniers]], rumeurs

**Produit (sortie principale)** :
- **Bounty perçu** (voir [[PvP]] §Bounty et [[Économie]] §Bounty fund) :
  - 🟠 Hors-la-loi : **50 Éclats**
  - 🔴 Rouge : **200 Éclats** + cosmétique de chasseur
  - ⚫ Banni : **1 000 Éclats** + titre "Justicier" temporaire
- **Récompenses privées** (contrats nobles, factions) : 100-10 000 Éclats
- **Cosmétique de chasseur** (palier visible sur le personnage)
- **Réputation** (Reconnaissance) auprès des autorités locales

→ Référence [[PvP]] §Karma §Bounty et [[Économie]] §Catégorie 5 §Bounty fund.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Bureau de bounty (en ville)** | Inscription, rapport, paiement | Novice |
| **Cabane de chasseur** | Base mobile en zone frontière | Initié |
| **Camp d'embuscade** | Bivouac à proximité de la cible | Initié |
| **Avant-poste de frontière** | Hub structurel pour traque | Adepte |
| **Cellule mobile** (cage à transport) | Ramener la cible vivante | Adepte |

**Outils principaux** : arme principale (épée, hache, arbalète, dague — tirée du [[Combat]]), filet renforcé, cordes, menottes (forgées), affiches de prime (image et nom), compas, cor de signalement (rappel d'équipe), longue-vue, sceaux d'identification (preuve qu'on tient bien la cible).

→ Référence [[Crafts]] §Stations.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Bounty 🟠 (Hors-la-loi 50 Éclats), pistage régional, capture sans-effort cible désarmée |
| **Initié** | Bounty 🔴 (Rouge 200 Éclats), pistage interrégional, immobilisation de combattants moyens |
| **Adepte** | Bounty ⚫ (Banni 1 000 Éclats), traque internationale, capture vivante de cibles dangereuses |
| **Expert** | Contrats privés haut tier (1 000-10 000 Éclats), pistage à travers continents, capture de mages |
| **Maître** | **Condition cachée 🔒** — Capture de cibles **mythiques** (PNJ légendaires, joueurs cosmiques), titre "Justicier" permanent, réseau d'indics personnel mondial |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle]] 1 semaine, −15% pistage et capture.

---

## 6. Activités/Récoltes débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Voleur de poules · Voleur de routes mineur · Brigand isolé · Cible Hors-la-loi 🟠 (joueur) |
| **Initié** | Bandit de chemin armé · Voleur récidiviste · Cible Rouge 🔴 (joueur) · Déserteur |
| **Adepte** | Chef de bande · Assassin contracté · Cible Banni ⚫ (joueur) · Mage déserteur · Pirate |
| **Expert** | Seigneur outlaw avec garde · PJ guildé puissant rouge · Faction criminelle · Mage interdit |
| **Maître** | PNJ légendaire (boss assassin de [[Mosrack]] en cavale) · Joueur Mythique cosmique · Captures impossibles |

→ Tables de cibles individuelles : Phase 2.

---

## 7. Carrière et débouchés

- **Démarrage** : auxiliaire de garde, sergent recruteur d'indics, premier bounty mineur
- **Progression** : enregistrement officiel auprès d'un **Bureau de Bounty** (en ville majeure), réputation par victoires successives
- **Établissement** : pas de lieu fixe — **aventurier**. Beaucoup dans les **frontières** (zones où les rouges fuient — frontière [[Galenor]] / [[Endora]], [[Onara]] / [[Mosrack]], [[Ilthara]] / [[Pyrtara]])
- **Réseau** : [[Garde]] / [[Soldat]] / [[Juge]] (employeurs publics), [[Espion]] / [[Tavernier]] (indics), [[Cartographe]] (cartes), [[Forgeron]] (armes), [[Apothicaire]] (composés tranquillisants pour capture vivante)
- **Faction** : Bureaux de Bounty officiels (Mosrack, Galenor, Lumasar), Confréries privées (parfois borderline), Justiciers solitaires
- **Note PvP** : profession **karma vert** mais **directement engagée** dans le système PvP. Un Chasseur de primes actif voit son **flag PvP régulièrement actif** sans pénalité (cf. [[PvP]] §Récompenses du flag actif).

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Bounty fund élevé** ([[Économie]]) | Récompenses augmentées proportionnellement aux taxes HV |
| **Pic de joueurs rouges** | Pic d'activité — opportunité économique |
| **Post-[[Le Souffle]]** | Compression d'Accord — certains rouges baissent en "tier", primes réajustées |
| **[[L'Accord]] ≥ 75%** | Cibles cosmiques accessibles |
| **Religion [[Veritas]]** | Bénédiction du chasseur — réduction karma résiduel sur erreurs |
| **Religion [[Foedus Animae]]** | Conflit moral — refus de tuer si capture vivante possible |
| **Continent [[Mosrack]]** | Bureau de Bounty institutionnel, primes les plus régulières |
| **Continent [[Pyrtara]]** | Beaucoup de cibles dictatoriales, primes massives mais risque politique |
| **Zone frontière / Camps de hors-la-loi** | Concentration de cibles, mais hostilité environnante |

> [!note] Pas de modulation d'ère cosmique forte
> Le métier reste stable à travers les ères — l'humain criminel est constant. **`era_modulation: false`** dans le frontmatter.

---

## 9. Économie

**Gold sinks générés** :
- Indics (paiement information) : 10-200 Éclats / tuyau
- Réparation armure / armes : 50-500 Éclats / mission
- Provisions longue traque : 50-200 Éclats / semaine
- Transport / monture : 100-1 000 Éclats / déplacement transcontinental
- Achat d'affiches de prime à jour : 5-50 Éclats / set régional
- Taxe HV sur récompenses privées : 5% (voir [[Économie]])

**Bounty perçu (référence [[PvP]] §Bounty)** :
- 🟠 Hors-la-loi : **50 Éclats** (par victime, plafond 1 fois par 24h)
- 🔴 Rouge : **200 Éclats** + cosmétique
- ⚫ Banni : **1 000 Éclats** + titre temporaire "Justicier"
- Contrat privé Adepte : 500-3 000 Éclats
- Contrat privé Expert : 3 000-15 000 Éclats
- Contrat privé Maître : 15 000-100 000+ Éclats

**Chaîne économique (boucle propre)** :
```
Joueurs HV (Taxe 5%) ─→ [[Économie]] §Bounty fund (50% des taxes HV)
                                  ↓
                       Bureau de Bounty (publication)
                                  ↓
                       Chasseur de primes (capture/kill)
                                  ↓
                       Récompense (rétro-injection partielle dans l'économie)
```

> [!tip] Boucle économique propre
> Les taxes HV alimentent les primes — auto-régulation. Plus l'économie tourne, plus les primes sont riches. Voir [[Économie]] §Bounty fund.

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché.*

**Cycle quotidien typique** (en mission) :
- 05:00 lever discret, étude des affiches
- 06:00-10:00 — interrogatoire d'indics, [[Tavernier|taverne]] (informations)
- 10:00-15:00 — pistage actif (animation `pister_humain`, `interroger`)
- 15:00-18:00 — embuscade ou approche cible
- 18:00-22:00 — capture (animation `combattre`, `subduer`, `lier`) ou retraite stratégique
- En ville : encaissement, repos, rebriefing, vente de témoignages

**Signatures de PNJ archétypaux** :
- **Le chasseur de primes silencieux** — manteau, large chapeau, peu de paroles
- **La justicière marquée** — visage tatoué de "Justicier" (titre obtenu pour capture banni), redoutée
- **Le chasseur-mercenaire** — accepte les deux profils, frontière trouble
- **L'ex-rouge repenti** — connaît la psychologie outlaw mieux que personne
- **Le bureaucrate-chasseur** — guilde structurée, factures, contrats écrits, [[Mosrack]]

**PNJ célèbres** *(Phase 4)* :
- *Vor le Justicier* — capture de 50+ banni en 15 ans, titre permanent
- *Mère Karash* — Mosrack, dirige le plus grand Bureau de Bounty d'Hybelior
- *L'Ombre Blanche* — chasseuse mystérieuse, jamais vue, rapporte vivants

---

*Liens : [[Métiers]] · [[Personnage]] · [[Combat]] · [[PvP]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Chasseur de créature]] · [[Chasseur de trésors]] · [[Mercenaire]] · [[Soldat]] · [[Garde]] · [[Espion]] · [[Cartographe]]*
