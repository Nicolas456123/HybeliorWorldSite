---
tags: [métier, archétype, exploration, verbe, présence]
type: archetype
category: Métier
catégorie_métier: Exploration
stat_principale: Verbe
stats_secondaires: [Présence, Acuité, Endurance, Vigueur]
craft_category: -
sources_ressources_accessibles: [Sécrétion, Sang, Œuf, Plume, Fourrure]
stations_principales: [Camp d'apprivoisement temporaire, Enclos de capture mobile, Foyer de bivouac, Poste d'observation]
outils_principaux: [Lasso, Filet renforcé, Sifflet de dressage, Appâts spécialisés, Piège non-létal, Bâton d'aiguillon, Phéromones d'approche]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
biomes_associés: [Tempéré, Plaine, Forêt, Taïga, Tropical, Savanne, Toundra, Mystique]
métiers_complémentaires: [Chasseur de créature, Éleveur de créature, Dresseur de créature, Explorateur, Apothicaire]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [doublon-Dresseur-vs-Dresseur-de-créature-M2]
---

# 🦅 Dresseur — Archétype Métier

> *"L'animal sauvage ne se laisse pas prendre. Il se laisse rejoindre."*

---

## 1. Vue d'ensemble

Le **Dresseur** est le **rabatteur de l'inconnu** : il part **dans la nature sauvage**, y rencontre des créatures non-domestiquées, les **approche**, les **capture vivantes** ou les **lie par la confiance**, et les **forme initialement** avant de les ramener à la civilisation. Il est avant tout un homme de **terrain mobile**, à la frontière du métier d'aventure.

> [!warning] **REFONTE-NEEDED — vérifier doublon avec [[Dresseur de créature]] (M2 Artisanat #3)**
> Deux métiers nommés "Dresseur" existent dans la base canonique :
> - **Dresseur** (M6 Exploration #56) — *ce fichier* — apprivoisement **sauvage en exploration** (rencontre, capture, formation initiale)
> - **Dresseur de créature** (M2 Artisanat #3) — élevage/dressage **en captivité** (formation avancée, breeding pour PNJ riches, recoupe partiellement [[Eleveur de créature]])
>
> **Frontière proposée** (à valider sprint suivant) :
> - **M6 Dresseur** = travail **dans la nature** : pister, approcher, capturer, premier lien — métier mobile, dangereux, statut d'aventurier
> - **M2 Dresseur de créature** = travail **en chenil/écurie/arène** : conditionnement avancé, dressage de combat, dressage de spectacle — métier sédentaire d'artisan
> - L'un **fournit** la créature vivante apprivoisée (M6) ; l'autre **la conditionne** pour son rôle final (M2)
> - Si playtest démontre redondance, fusionner en gardant la mention "branche exploration / branche atelier" dans les sous-spécialités

Le Dresseur est distinct du [[Chasseur de créature]] (qui **abat** pour le loot) et de l'[[Eleveur de créature]] (qui **reproduit** depuis la naissance). Il est le **fournisseur de spécimens vivants** pour ces deux derniers ainsi que pour les arènes, les armées (montures), et les nobles excentriques.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Verbe** — voix, intonation, langage para-verbal de l'apaisement
- **Stat principale (co)** : **Présence** — autorité naturelle, charisme animal, posture qui ne fait pas fuir
- **Stats secondaires** : **Acuité** (lire le comportement, anticiper la fuite/attaque), **Endurance** (longues approches, jours d'observation), **Vigueur** (immobiliser une créature affaiblie sans la blesser)
- **Maîtrise contextuelle** : `Maîtrise_Apprivoisement` — montée par chaque créature ramenée vivante. Sous-spécialités : `Maîtrise_Apprivoisement_Mammifères`, `Maîtrise_Apprivoisement_Aviens`, `Maîtrise_Apprivoisement_Reptiles`, `Maîtrise_Apprivoisement_Mythiques` (Expert+).

→ Couche 1 [[Personnage]] §Stats brutes. Maîtrise [[Personnage]] §Couche 2. Voir [[Exploration]] §Obtenir une monture (Capture).

---

## 3. Sources de ressources & compétences

**Consomme** :
- **Appâts** : viande, plantes spécifiques, [[Apothicaire|composés alchimiques]] d'apaisement
- **Phéromones d'approche** ([[Apothicaire]]) — masquent l'odeur humaine
- **Filet, lasso, piège non-létal** ([[Tisserand]], [[Forgeron]], [[Menuisier]])

**Produit (sortie principale)** :
- **Créatures vivantes apprivoisées** — passées en relais à l'[[Eleveur de créature]] ou au [[Dresseur de créature]] (M2), ou directement vendues comme **monture**, **animal de compagnie**, **animal de combat de bas tier**

**Produit secondaire (ressources)** :
- **Sécrétion** (collectée passivement sur la créature apprivoisée — glandes domptées) — alchimie
- **Plume / Fourrure / Œuf** — produits réguliers d'une créature vivante
- **Sang récolté ponctuellement** — composant alchimique (sans abattage)

→ Référence [[Sources de Ressources]] §Source 2 Créature et [[Bestiary/Index]].

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Camp d'apprivoisement temporaire** | Bivouac mobile près de la cible | Novice |
| **Enclos de capture mobile** | Cage légère démontable | Initié |
| **Poste d'observation** | Affût discret pour étudier le comportement | Initié |
| **Foyer de bivouac** | Cuisson appâts, repos | Novice |
| **Cage de transport renforcée** | Ramener vivant en ville | Adepte |
| **Sanctuaire d'apprivoisement** (sédentaire) | Lieu rituel post-capture (premier lien stable) | Expert |

**Outils principaux** : lasso, filet renforcé, sifflet de dressage (sons spécifiques), appâts spécialisés, piège non-létal, bâton d'aiguillon (pour redresser sans blesser), phéromones d'approche, corne d'appel.

→ Référence [[Crafts]] §Stations.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Apprivoisement de petits animaux communs (chiens errants, lapins-de-roche), taux de fuite ~50% |
| **Initié** | Animaux moyens (loups solitaires, cerfs, faucons), capture vivante 60% de réussite |
| **Adepte** | Apprivoisement de **montures** terrestres communes ([[Exploration]] §Capture), créatures de chasse, taux 75% |
| **Expert** | Créatures rares (aurochs, panthère, aigle géant), montures aériennes basses, taux 85% |
| **Maître** | **Condition cachée 🔒** — Apprivoisement de **créatures mythiques** (cf. [[Bestiary/Index]] tier élevé), variants post-[[Le Souffle]], certaines créatures cosmiques (sous condition [[Le Lien\|Voie de Spiritus]]) |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle]] 1 semaine, −15% chance de capture. Une créature en cours d'apprivoisement peut s'enfuir si la rouille frappe en plein milieu.

---

## 6. Activités/Récoltes débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Capture chien sauvage · Apprivoisement chèvre des montagnes · Faucon juvénile |
| **Initié** | Loup gris · Cerf de plaine · Faucon adulte · Renard arctique |
| **Adepte** | Cheval sauvage des plaines (monture commune) · Aurochs · Sanglier de bataille · Lynx |
| **Expert** | Aigle géant · Panthère noire · Cerf-fantôme ([[Onara - Continent|Onara]]) · Cervidé d'ère ([[Bestiary/Index]]) · Tigre de jungle ([[Ilthara - Continent|Ilthara]]) |
| **Maître** | Dragon mineur (apprivoisable, [[Drakora]]) · Phénix de Cendres ([[Cendara - Continent|Cendara]]) · Variant post-[[Le Souffle]] · Léviathan apprivoisé ([[Le Lien]] requis) |

→ Recettes individuelles : Phase 2 Recipe Generator.

---

## 7. Carrière et débouchés

- **Démarrage** : assistant d'un dresseur établi, courses en forêt, observation
- **Progression** : reconnaissance par les guildes de chasse / les écuries seigneuriales, contrats de capture
- **Établissement** : pas d'établissement fixe — **homme de terrain**. Base éventuelle dans une ville-frontière (Galenor sud, Drakora, Onara)
- **Réseau** : [[Chasseur de créature]] (concurrents et alliés), [[Eleveur de créature]] (clients premiers), [[Dresseur de créature]] (M2, suite du processus), [[Explorateur]] (cartes des biomes-source), [[Apothicaire]] (composés d'apaisement)
- **Faction** : Confréries de Dresseurs ([[Drakora]], [[Lythar]]), Cavaliers du Vent ([[Aerion]] / [[Onara - Continent|Onara]]), Cercles de Spiritus
- **Branche [[Le Lien\|Voie de Spiritus]]** : Dresseur-Lié peut tisser un **lien de symbiose** réel avec une créature (distinct de la monture-objet — voir [[Exploration]] §note)

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères\|Verdoiement]] (Terranu)** | +20% spécimens disponibles, faune luxuriante |
| **Ère [[Les Ères\|Sommeil de Glace]] (Climata)** | Faune diminuée, mais variants de glace apparaissent |
| **Ère [[Les Ères\|Vents]] (Aerion)** | Aviens +30% disponibilité, sessions montagneuses |
| **Ère [[Les Ères\|Brume Mortelle]]** | Variants morbides apprivoisables (haut risque) |
| **Post-[[Le Souffle]]** | Variants apparaissent — pic de demande d'experts |
| **[[L'Accord]] ≥ 75%** | Apprivoisement de créatures cosmiques mineures débloqué |
| **Religion [[Foedus Animae]]** | Pacte renforcé avec le vivant, +25% taux de capture |
| **Continent [[Drakora]]** | Apprivoisement de dragons (école locale) |
| **Continent [[Baelor - Continent|Baelor]]** | Apprivoisement des *Vaporae* (créatures de brume, Maître requis) |

---

## 9. Économie

**Gold sinks générés** :
- Appâts et composés [[Apothicaire]] : 20-200 Éclats / sortie
- Réparation filets, cages : 50-500 Éclats
- Transport ville : 100 Éclats / créature moyenne
- Soin créature blessée durant capture : 100-1000 Éclats
- Taxe HV sur créature vendue : 5% (voir [[Économie]])

**Prix indicatifs** :
- Petite créature commune : 20-100 Éclats
- Monture commune capturée : 200-800 Éclats
- Faucon de chasse adulte : 500-2 000 Éclats
- Créature rare (aigle géant, panthère) : 5 000-20 000 Éclats
- Créature mythique vivante : 100 000+ Éclats
- Variant post-Souffle : 50 000+ Éclats

**Chaîne économique** :
```
Dresseur (capture) ─→ [[Eleveur de créature]] (lignée) ─→ Marché monture
                  ─→ [[Dresseur de créature]] (M2) (formation arène/combat)
                  ─→ [[Apothicaire]] (composants vivants : Sécrétion, Plume, etc.)
                  ─→ Joueur direct (monture personnelle, animal de combat)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seule.*

**Cycle quotidien typique** (en mission, ~3-7 jours) :
- 04:00 lever discret, analyse traces fraîches
- 05:00-09:00 — pistage, approche silencieuse
- 09:00-15:00 — observation longue durée, dépôt d'appâts, retraits
- 15:00-18:00 — repos camouflé, repas froid
- 18:00-22:00 — tentative d'approche / capture (créatures crépusculaires) ou bivouac
- En ville (cycle court) : repos, vente, recharge

**Signatures de PNJ archétypaux** :
- **Le dresseur-pisteur** — barbe, cuir, sifflets autour du cou
- **La dresseuse silencieuse** — Spiritus, marche pieds nus, créatures la suivent spontanément
- **Le maître des cages** — vit en lisière de ville, fournisseur des arènes
- **Le dresseur-Lié** — Voie de Spiritus, créature compagne permanente (distinct monture)

**PNJ célèbres** *(Phase 4)* :
- *Maître Vorrek d'[[Drakora]]* — apprivoise des dragons mineurs
- *Sève la Silencieuse* — Spiritus, lien profond avec un cerf-fantôme

---

## Décisions ouvertes

- **Doublon Dresseur (M6) vs Dresseur de créature (M2)** : frontière proposée (terrain vs atelier) à valider après playtest. Cf. flag `REFONTE-NEEDED` ci-dessus.
- **Apprivoisement vs symbiose [[Le Lien]]** : un Dresseur sans Voie peut-il maintenir une créature de tier élevé ? Probablement non — la Voie de Spiritus devient un soft-gating naturel pour les Maîtres.
- **Statistiques de réussite** par tier de créature à playtester.

---

*Liens : [[Métiers]] · [[Personnage]] · [[Exploration]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Bestiary/Index]] · [[Chasseur de créature]] · [[Eleveur de créature]] · [[Dresseur de créature]] · [[Explorateur]] · [[Apothicaire]] · [[Le Lien]]*
