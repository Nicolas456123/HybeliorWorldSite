---
tags: [métier, archétype, exploration, vigueur, endurance]
type: archetype
category: Métier
catégorie_métier: Exploration
stat_principale: Vigueur
stats_secondaires: [Endurance, Acuité, Mémoire]
craft_category: 9 — Récolte et transformation primaire
sources_ressources_accessibles: [Minerai, Pierre, Gemme brut, Poudre naturel, Éclat (rare)]
stations_principales: [Galerie minière, Front de taille, Atelier de tri, Treuil, Carrière à ciel ouvert, Forge de soutien]
outils_principaux: [Pic, Pioche, Marteau et coin, Pelle, Lampe à huile, Brouette, Tamis, Pince à gemme, Détecteur magnétique (Adepte+)]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
biomes_associés: [Montagne, Volcanique, Souterrain, Désert de glace (cavernes), Plaine (carrières)]
métiers_complémentaires: [Forgeron, Métallurgiste, Lapidaire, Bijoutier, Maçon, Verrier, Marchand, Explorateur]
era_modulation: true
status: drafted
last_review: 2026-05-01
---

# ⛏️ Mineur — Archétype Métier

> *"Sous chaque pierre, une fortune. Au-dessous d'elle, un cercueil. Le mineur connaît la différence — et choisit quand même."*

---

## 1. Vue d'ensemble

Le **Mineur** est le **pivot industriel** de la chaîne d'artisanat d'Hybelior. Sans lui, pas de **lingots** pour le [[Forgeron]], pas de **gemmes taillées** pour le [[Bijoutier]], pas de **briques** pour le [[Maçon]], pas de **sable de verre** pour le [[Verrier]]. C'est un métier de **récolte primaire** (Source 1 Nature — voir [[Sources de Ressources]] §Récolte Nature §Minerai §Pierre §Gemme brut §Poudre naturel) et l'un des plus **physiques** d'Hybelior. Mais le mineur est aussi un métier d'**Exploration** : la mine n'est pas un atelier — c'est **une zone de monde**, avec ses dangers (effondrements, gaz, créatures souterraines, créatures cosmiques de profondeur), ses cycles, ses légendes.

Spécificité d'Hybelior : le mineur **peut extraire des Éclats**. La monnaie d'Hybelior n'est pas une convention abstraite — ce sont des **fragments cosmiques** dispersés dans le monde lors de sa création (voir [[Économie]] §Monnaie). Les **profondeurs** des mines sont l'une des sources principales de ces Éclats. Un mineur Maître peut donc **littéralement extraire de l'argent** — ce qui place le métier dans une économie politique tendue (qui contrôle la mine contrôle l'inflation locale).

Distinct du [[Chasseur de trésors]] (qui fouille avec contexte historique, cible reliques) — le Mineur extrait **brut, à l'échelle industrielle**. Distinct de l'[[Explorateur]] (le mineur connaît sa galerie ; l'explorateur ouvre la suivante).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Vigueur** — frapper la roche pendant des heures, soulever des wagonnets, pousser le pic en force
- **Stats secondaires** : **Endurance** (journées de 10-12h sous terre), **Acuité** (lire la roche, identifier les filons, détecter les gaz dangereux et les anomalies de structure), **Mémoire** (cartographie mentale des galeries, mémoire des veines)
- **Maîtrise contextuelle** : `Maîtrise_Minage` — montée par chaque session de minage. Sous-spécialités : `Maîtrise_Minage_Minerai`, `Maîtrise_Minage_Pierre`, `Maîtrise_Minage_Gemme`, `Maîtrise_Minage_Éclats` (Maître).

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2.

---

## 3. Sources de ressources & compétences

**Consomme** :
- **Outils** ([[Forgeron]] : pioche, pic, marteau et coin)
- **Lampes à huile, mèches** ([[Apothicaire]])
- **Bois pour étayer galeries** ([[Bûcheron]] / [[Menuisier]])
- **Briques et ciment** ([[Maçon]])
- **Provisions de mine** (rations sèches)

**Produit (Source 1 Nature)** :
- **Minerai** (fer, cuivre, étain, argent, or, mithril, adamantium au tier élevé) — voir [[Sources de Ressources]] §Source 1
- **Pierre** (granit, marbre, ardoise, obsidienne)
- **Gemme brut** (quartz, améthyste, émeraude, rubis, saphir, gemmes cosmiques aux tier élevés)
- **Poudre naturel** (poudres minérales, soufre, salpêtre, poudres volcaniques)
- **Éclats** (rare, palier Adepte+ avec chance, Maître garantie sur veines spécifiques) — monnaie cosmique d'Hybelior, voir [[Économie]] §Monnaie

→ Référence [[Sources de Ressources]] §Récolte Nature §Minerai §Pierre §Gemme brut §Poudre naturel.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Galerie minière** | Front de taille, extraction profonde | Novice |
| **Front de taille** | Section active d'extraction | Novice |
| **Atelier de tri** | Séparation minerai / pierre / déchet | Initié |
| **Treuil** | Remontée de minerai et de mineurs | Initié |
| **Carrière à ciel ouvert** | Extraction de pierre massive | Novice |
| **Forge de soutien** (in situ) | Réparation rapide outils | Adepte |
| **Salle d'étayage** | Bois et structure de soutien | Initié |

**Outils principaux** : pic, pioche, marteau et coin, pelle, lampe à huile, brouette, tamis, pince à gemme, détecteur magnétique (Adepte+ — pour filons cachés), canari (détection gaz, vivant), perforateur lourd (Expert+).

→ Référence [[Crafts]] §Stations §Catégorie 9.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Minage de surface (cuivre, fer, pierre), rendement faible, taux d'échec ~20% (outil cassé, blessure) |
| **Initié** | Minage de profondeur faible (étain, argent), tri efficace, lecture basique des filons |
| **Adepte** | Minage profond (or, premières gemmes), détection gaz, gemmes brutes de qualité, **chance d'Éclats** ~5% |
| **Expert** | Minage très profond (mithril, gemmes rares, obsidienne), galeries longues, gestion d'une équipe, **Éclats** ~15% |
| **Maître** | **Condition cachée 🔒** — Minage des **Veines Cosmiques** (gemmes liées aux Cosmiques, cf. [[Cosmologie]]), **Éclats garantis** sur veines spéciales, capacité à extraire de l'**adamantium** et des minéraux post-[[Le Souffle]] |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle]] 1 semaine, −15% rendement et taux d'échec accru.

---

## 6. Activités/Récoltes débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Minerai de fer · Cuivre · Pierre commune (granit, ardoise) · Quartz |
| **Initié** | Étain · Argent · Marbre · Améthyste · Pierre noble (obsidienne mineure) |
| **Adepte** | Or · Émeraude · Rubis · Soufre · **Éclats** (chance) |
| **Expert** | Mithril · Saphir · Diamant · Salpêtre · Obsidienne profonde · **Éclats fréquents** |
| **Maître** | Adamantium · Gemmes cosmiques ([[Cosmologie]] — Spiritae, Tempora, Aetheris...) · Minerais post-[[Le Souffle]] · **Veine d'Éclats** garantie |

→ Référence [[Sources de Ressources]] §Source 1 et §Bestiaire (créatures souterraines).

---

## 7. Carrière et débouchés

- **Démarrage** : porteur, manœuvre, apprenti dans une mine seigneuriale ou guildée
- **Progression** : équipier sur front de taille, puis chef d'équipe, puis exploitant indépendant
- **Établissement** : la mine est l'**emplacement géographique** clé. Le mineur s'enracine. Beaucoup d'exploitants familiaux. Souvent lié à un **seigneur** (mine seigneuriale, [[Myrtam]] : "Acier Éternel") ou à une **guilde** ([[Altram]] : tradition métallurgique)
- **Réseau** : [[Forgeron]] (client #1 — minerai → lingot), [[Bijoutier]] / [[Lapidaire]] (gemmes brutes), [[Maçon]] (pierre), [[Verrier]] (sable et minerai sablonneux), [[Apothicaire]] (poudres), [[Marchand]] (export)
- **Faction** : Guildes minières ([[Altram]], [[Myrtam]], [[Cestra - Continent|Cestra]]), Compagnies métallurgistes, Confréries des Profondeurs ([[Celethor - Continent\|Thalendil]] — forteresses souterraines)
- **Note** : pivot d'inflation. Un afflux soudain d'Éclats par un Maître peut **dérégler une économie locale**. Surveillance des autorités.

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères\|Verdoiement]] (Terranu)** | Filons frais, +20% rendement minerai |
| **Ère [[Les Ères\|Sommeil de Glace]] (Climata)** | Glace bouche les galeries, mais expose des veines polaires |
| **Ère [[Les Ères\|Vents]] (Aerion)** | Aération naturelle, baisse risque gaz |
| **Ère [[Les Ères\|Brume Mortelle]]** | Veines cosmiques exposées (gemmes uniques), risque de contamination |
| **Post-[[Le Souffle]]** | Nouvelles veines apparaissent, anciennes disparaissent — pic d'activité de prospection |
| **[[L'Accord]] ≥ 75%** | Veines Cosmiques détectables (Maître seul) |
| **Religion [[Veritas]]** | Mines bénies (rituels d'entrée, baisse des accidents) |
| **Continent [[Myrtam]]** | Tradition de l'Acier Éternel, recettes exclusives |
| **Continent [[Cendara - Continent|Cendara]]** | Volcanique — soufre, obsidienne, pierres de feu |
| **Continent [[Azoria - Continent|Azoria]]** | Mines des Anciens (Maître + équipe) |

---

## 9. Économie

**Gold sinks générés** :
- Outils (pic, pioche) : 50-500 Éclats / unité, casse fréquente
- Bois d'étayage : 100-500 Éclats / mois
- Lampes et huile : 50 Éclats / semaine
- Salaire équipe (mineur principal vers ses ouvriers) : 5-50 Éclats / jour / ouvrier
- Réparation effondrement : 1 000-50 000 Éclats
- Loyer mine seigneuriale : 10-30% de la production
- Taxe HV sur minerai brut : 5% (voir [[Économie]])

**Prix indicatifs** :
- Minerai de fer : 1-3 Éclats / kg
- Argent : 30-100 Éclats / kg
- Or : 200-500 Éclats / kg
- Mithril : 5 000+ Éclats / kg
- Émeraude brute : 100-1 000 Éclats / pièce
- Gemme cosmique : 10 000-100 000 Éclats / pièce
- **Veine d'Éclats** (Maître) : extraction directe de monnaie

**Chaîne économique (pivot industriel)** :
```
Mineur ─→ [[Forgeron]] / [[Métallurgiste]] (Lingots) ─→ Armes, Armures, Outils
      ─→ [[Lapidaire]] / [[Bijoutier]] (Gemmes taillées) ─→ Bijoux
      ─→ [[Maçon]] (Briques, Pierre) ─→ Construction
      ─→ [[Verrier]] (Sable + minerai) ─→ Verre
      ─→ [[Apothicaire]] / [[Alchimiste]] (Poudres) ─→ Potions, alchimie
      ─→ Économie générale (Éclats — pivot d'inflation/déflation)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché.*

**Cycle quotidien typique** :
- 04:00 lever, petit déjeuner copieux
- 05:00-12:00 — descente mine, minage (animation `frapper_pioche`, `pousser_wagonnet`, `trier_minerai`)
- 12:00-13:00 — pause repas (souvent au fond)
- 13:00-18:00 — minage suite, étayage, tri
- 18:00-20:00 — remontée, pesée, livraison forge/marchand
- 20:00-22:00 — repas, repos, entretien outils
- Repos plus long après gros effort (grosse veine, accident)

**Signatures de PNJ archétypaux** :
- **Le mineur barbu** — torse nu sous terre, lampe au front, vocabulaire de mineur
- **La cheffe d'équipe** — autorité naturelle, gère la sécurité de 5-15 personnes
- **Le mineur-prospecteur** — solitaire, instinct pour les filons cachés, parfois Lié à [[Le Lien\|Spiritus]]
- **Le mineur-Concordé** ([[L'Accord]] ≥ 75%) — accède aux Veines Cosmiques, vénéré localement
- **Le vétéran muet** — accident sous terre, silencieux, hub d'expérience

**PNJ célèbres** *(Phase 4)* :
- *Maître Vorgrim de [[Myrtam]]* — forge de l'Acier Éternel, signature millénaire
- *Mère Kadrina d'[[Altram]]* — première Maître à extraire une Veine Cosmique post-Souffle
- *Le Vieux Vorth* — [[Cestra - Continent|Cestra]], "celui qui a survécu à trois effondrements"

---

*Liens : [[Métiers]] · [[Personnage]] · [[Sources de Ressources]] · [[Économie]] · [[Crafts]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Forgeron]] · [[Lapidaire]] · [[Bijoutier]] · [[Maçon]] · [[Verrier]] · [[Apothicaire]] · [[Marchand]] · [[Explorateur]] · [[Cosmologie]]*
