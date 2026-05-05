---
tags: [métier, archétype, exploration, vigueur, vivacité]
type: archetype
category: Métier
catégorie_métier: Exploration
stat_principale: Vigueur
stats_secondaires: [Vivacité, Endurance, Acuité, Verbe]
craft_category: -
sources_ressources_accessibles: [-]
stations_principales: [Camp de mercenaires, Bivouac de campagne, Quartier général de compagnie, Taverne de recrutement]
outils_principaux: [Arme principale (variable), Arme secondaire, Bouclier, Armure de campagne, Cor de signalement, Anneau de compagnie]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: variable (vert à rouge selon contrats)
biomes_associés: [Tempéré, Plaine, Frontières, Routes, Champs de bataille, Tous biomes]
métiers_complémentaires: [Soldat, Chevalier, Garde, Chasseur de primes, Espion, Forgeron, Apothicaire]
era_modulation: false
status: drafted
last_review: 2026-05-01
---

# ⚔️ Mercenaire — Archétype Métier

> *"Mon épée n'a pas de drapeau. Elle a un prix. Et un code — pas écrit, mais tenu."*

---

## 1. Vue d'ensemble

Le **Mercenaire** est le **combattant à la demande**. Il vend son **service martial** au plus offrant : escorte de caravane, défense d'un village, attaque d'un fort, garde du corps, renfort dans une guerre de faction, intervention dans un duel d'honneur. Distinct du [[Soldat]] (qui sert un État, drapeau permanent, allégeance jurée), du [[Chevalier]] (élite militaire, code d'honneur formel, lié à un seigneur), du [[Garde]] (protection statique d'un lieu ou d'une personne, contrat institutionnel) et du [[Chasseur de primes]] (cible spécifique, bounty officiel).

> [!warning] Karma variable
> Le Mercenaire peut servir une **cause juste** (défense de village, escorte) ou **criminelle** (attaque d'un convoi, élimination ciblée commandée). Il est l'archétype au **karma le plus variable** : un Mercenaire ascendant peut accumuler une réputation propre, un autre peut basculer dans la **rouge** ([[PvP]] §Karma) selon ses contrats.
>
> **`era_modulation: false`** — comme le [[Chasseur de primes]], le besoin de mercenaires est constant à travers les ères. **`karma_typique: variable`** dans le frontmatter.

Le Mercenaire est aussi un **archétype de joueur** : beaucoup de joueurs combat-orientés trouvent dans le mercenariat un cadre narratif souple — pas d'allégeance forcée, contrats à la carte, voyages constants. Il est par excellence le **métier d'aventure mobile**.

Hybelior connaît plusieurs traditions : les **Compagnies libres** (groupes structurés, contrats officiels — [[Mosrack]], [[Galenor]]), les **mercenaires solitaires** (lances pour louer, [[Onara]] / [[Skaldoria]]), les **bandes mercenaires** (frontière entre guilde et brigandage, [[Pyrtara]]), et les **Mercenaires Concordés** ([[L'Accord]] ≥ 50% — élite militaire de l'ère).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Vigueur** — encaisser, frapper fort, porter armure
- **Stat principale (co)** : **Vivacité** — esquive, vitesse au combat, mobilité
- **Stats secondaires** : **Endurance** (longues campagnes, marches forcées), **Acuité** (lecture du combat, anticipation), **Verbe** (négociation des contrats, commandement éventuel d'une bande)
- **Maîtrises** :
  - Maîtrise d'arme (souvent multiple — épée, hache, lance, arbalète — voir [[Armes et Maîtrise]])
  - `Maîtrise_Bouclier`
  - `Maîtrise_Tactique` (Adepte+, recoupe [[Soldat]] / [[Chevalier]])
  - `Maîtrise_Survie` (campagnes en biome hostile)
  - Optionnel : `Maîtrise_Voie` (mage-mercenaire — voir [[Le Lien]])

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2.

---

## 3. Sources de ressources & compétences

**Consomme** :
- **Arme principale et secondaire** ([[Forgeron]])
- **Bouclier, armure** ([[Forgeron]], [[Tanneur]])
- **Provisions de campagne** ([[Cuisinier]] / [[Boulanger]])
- **Potions** ([[Apothicaire]] / [[Alchimiste]])
- **Monture** (achetée — voir [[Exploration]] §Obtenir une monture)
- **Anneau de compagnie** (signe d'appartenance, [[Bijoutier]])
- **Information** — [[Espion]] / [[Tavernier]] (qui paie quoi pour quel contrat)

**Produit (sortie principale)** :
- **Service martial** rendu (escorte, défense, attaque, garde)
- **Réputation** (Reconnaissance) — gagnée ou perdue selon contrats
- **Loot de campagne** — équipement ennemi récupéré, parfois moitié au commanditaire selon contrat
- **Contacts** — réseau d'employeurs précédents (récurrence)

→ Pas d'extraction de ressources brutes. Métier de **service**.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Camp de mercenaires** | Bivouac mobile | Novice |
| **Bivouac de campagne** | En mission, près de la cible | Novice |
| **Quartier général de compagnie** | Pour les compagnies organisées | Adepte |
| **Taverne de recrutement** | Lieu d'embauche, contrats verbaux | Initié |
| **Champ d'entraînement** | Maintien du niveau, recrue formation | Initié |

**Outils principaux** : arme principale (variable selon spécialisation), arme secondaire (souvent dague de réserve), bouclier, armure de campagne (cuir lourd à plates selon Vigueur), cor de signalement (rappel d'unité), anneau de compagnie (identification), bourse à contrat (sceau du commanditaire).

→ Référence [[Crafts]] §Stations.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Garde de caravane locale, escorte courte, contrats 50-200 Éclats |
| **Initié** | Défense de village, garde du corps mineur, contrats 200-1 000 Éclats |
| **Adepte** | Attaque organisée, intervention en guerre de faction, contrats 1 000-5 000 Éclats |
| **Expert** | Commandement de bande (10-30 hommes), contrats internationaux, contrats 5 000-30 000 Éclats |
| **Maître** | **Condition cachée 🔒** — Capitaine de Compagnie libre, contrats d'État (50 000+ Éclats), capable de basculer une bataille à lui seul, **statut Concordé** ([[L'Accord]] ≥ 75%) débloque équipement Légendaire |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle]] 1 semaine, −15% performance combat.

---

## 6. Activités/Récoltes débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Escorte d'un marchand local · Garde d'une taverne pour la nuit · Contrat anti-bandits mineur |
| **Initié** | Défense d'un village (1 semaine) · Garde du corps d'un noble en voyage · Renfort dans une querelle de seigneurie |
| **Adepte** | Capture d'un fort mineur · Escorte transcontinentale · Intervention en guerre de faction |
| **Expert** | Bataille rangée · Siège · Commandement d'une bande de 30 hommes · Contrat noble pour conflit dynastique |
| **Maître** | Bataille décisive d'une guerre · Capture d'un général ennemi · Mission d'élite (extraire un otage royal) · Contrat des Cosmiques (légende) |

→ Contrats individuels : Phase 2.

---

## 7. Carrière et débouchés

- **Démarrage** : recrue dans une compagnie, bras armé d'une caravane
- **Progression** : reconnaissance par victoires successives, recrutement par compagnies plus prestigieuses
- **Établissement** : pas de lieu fixe — **aventurier permanent**. Base éventuelle dans une **taverne de recrutement** d'une ville-frontière
- **Réseau** : [[Forgeron]] / [[Tanneur]] (équipement), [[Apothicaire]] (potions), [[Cartographe]] (cartes), [[Marchand]] (employeurs récurrents), [[Espion]] (renseignement), autres mercenaires (camaraderie, tension)
- **Faction** :
  - **Compagnies libres** organisées : "Les Faucons d'Acier" ([[Galenor]]), "La Lame Brisée" ([[Mosrack]]), "Les Veuves de Skaldoria"
  - **Solitaires** : pas de faction, contrats à la pièce
  - **Confréries grises** : frontière brigandage / mercenariat ([[Pyrtara]])
- **Note PvP** : flag PvP **fréquemment actif** par nature du métier. Karma fluctue selon contrats. Un Mercenaire qui accepte trop de contrats criminels glisse en **🟠 Hors-la-loi** ou **🔴 Rouge** (voir [[PvP]]).

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Période de guerre (faction, état)** | Demande explose, contrats x3 en valeur |
| **Période de paix prolongée** | Marché restreint, mercenaires glissent vers escorte/banditisme |
| **Post-[[Le Souffle]]** | Compression d'Accord — rééquilibrage des forces, opportunités d'embauche |
| **[[L'Accord]] ≥ 75%** | Équipement Légendaire débloqué (cf. [[Personnage]] §Prérequis), contrats d'élite |
| **Religion [[Veritas]]** | Code moral — refuse les contrats d'attaque non-justes |
| **Religion [[Foedus Animae]]** | Refuse de tuer des cibles innocentes |
| **Ère [[Les Ères\|Brume Mortelle]]** | Pic de criminalité — pic de demande mercenaire |
| **Continent [[Skaldoria]]** | Tradition guerrière, beaucoup de mercenaires d'origine |
| **Continent [[Mosrack]]** | Compagnies institutionnelles, contrats réglementés |

> [!note] `era_modulation: false`
> Le Mercenaire reste pertinent à toutes les ères — l'humain en conflit est une constante. La **modulation par contexte est principalement géopolitique** (guerre/paix) plutôt que cosmique.

---

## 9. Économie

**Gold sinks générés** :
- Équipement (renouvelé fréquemment) : 500-10 000 Éclats / set complet
- Réparation après combat : 100-1 000 Éclats / mission
- Potions de soin et stamina : 50-500 Éclats / mission
- Provisions de campagne : 100-500 Éclats / semaine
- Cotisation à une Compagnie libre : 10% du gain de chaque contrat
- Taxe HV sur loot revendu : 5%

**Tarifs indicatifs (par contrat)** :
- Garde de nuit / taverne : 5-20 Éclats / nuit
- Escorte locale : 50-200 Éclats / jour
- Garde du corps semaine : 200-1 000 Éclats
- Mission d'attaque organisée : 500-5 000 Éclats
- Bataille rangée (un homme) : 1 000-3 000 Éclats + part du butin
- Contrat Maître / élite : 50 000-500 000 Éclats
- Contrat criminel (haut karma risk) : prime x2 mais risque rouge

**Chaîne économique** :
```
Marchand / Noble / Faction / Joueur ─→ Mercenaire (contrat)
                                           ↓
                                   Service rendu / Loot
                                           ↓
                              Mercenaire ─→ [[Forgeron]] (réparation)
                                        ─→ [[Apothicaire]] (potions)
                                        ─→ Compagnie libre (cotisation)
                                        ─→ Économie générale
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché.*

**Cycle quotidien typique (en mission)** :
- 05:00 lever, vérification équipement (animation `aiguiser_arme`, `lacer_armure`)
- 06:00-08:00 — entraînement matinal léger
- 08:00-18:00 — mission active (combat, garde, marche selon contrat)
- 18:00-22:00 — repas, repos, surveillance, jeu de cartes au camp
- En ville : taverne, recrutement, vente loot, repos prolongé

**Signatures de PNJ archétypaux** :
- **Le mercenaire endurci** — cicatrices visibles, armure usée, paroles rares
- **La capitaine de compagnie** — autorité naturelle, équipement de prestige, gère 30 hommes
- **Le mage-mercenaire** ([[Le Lien]]) — Voie active, contrats spécialisés, prix doublé
- **Le mercenaire au code** — refuse certains contrats, [[Veritas]] / [[Foedus Animae]]
- **Le mercenaire-bandit** — frontière trouble, karma jaune/orange, [[Pyrtara]]
- **Le retraité** — vétéran reconverti en formateur ou tavernier-recruteur

**PNJ célèbres** *(Phase 4)* :
- *Capitaine Vorek "Faucon d'Acier"* — Galenor, Compagnie légendaire
- *Mère Lashka* — Mosrack, Compagnie de la Lame Brisée, contrats d'État
- *Le Lié Vorthal* — mage-mercenaire, [[Voie d'Ignis]], frontière du légendaire

---

*Liens : [[Métiers]] · [[Personnage]] · [[Combat]] · [[PvP]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Soldat]] · [[Chevalier]] · [[Garde]] · [[Chasseur de primes]] · [[Espion]] · [[Forgeron]] · [[Apothicaire]] · [[Le Lien]]*
