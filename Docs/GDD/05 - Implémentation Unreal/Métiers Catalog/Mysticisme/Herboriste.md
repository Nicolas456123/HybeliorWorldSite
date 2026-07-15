---
tags: [métier, archétype, mysticisme, plantes, mémoire, acuité]
type: archetype
category: Métier
catégorie_métier: Mysticisme
stat_principale: Mémoire
stats_secondaires: [Acuité, Esprit, Endurance]
voie_magique: Spiritus (optionnelle)
religion_compatible: [Vael'Kurash, Foedus Animae, Somnium Vigil]
craft_category: 9 — Récolte et transformation primaire
sources_ressources_accessibles: [Plante médicinale, Plante magique, Champignon, Herbe rituelle, Sève, Fleur d'ère]
stations_principales: [Atelier d'herboristerie, Séchoir, Cabane de cueillette, Jardin d'herbes]
outils_principaux: [Serpe rituelle, Mortier et pilon, Pochette d'herboriste, Carnet de plantes]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
factions_compatibles: [Vael'Kurash, Foedus Animae, Cercles de Spiritus, Guildes d'herboristerie]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [pont-botaniste-apothicaire, signatures-plantes-cosmiques-phase4]
---

# 🌿 Herboriste — Archétype Métier

> *"Vous voyez de l'herbe ; je vois trois siècles de patience. Chaque plante est une mémoire du sol, du climat, et des bêtes qui sont passées par là. La connaître, c'est apprendre une langue que personne ne parle plus."*
> — **Mère Tirshara**, Doyenne Herboriste-Vael'Kari d'Alkaran

---

## 1. Vue d'ensemble

L'**Herboriste** est le **connaisseur des plantes** d'Hybelior — médicinales, magiques, rituelles, alimentaires, hallucinogènes. Métier-pivot **hybride** entre la botanique pure (récolte et identification — proche d'un futur **Botaniste** M6 Exploration) et l'application mystique (préparation de plantes pour rituels, alchimie légère, cuisine mystique). C'est un **métier de Mémoire et d'Acuité** plutôt que d'Esprit/Résonance, ce qui le distingue des autres métiers de la catégorie Mysticisme.

L'Herboriste est un **fournisseur essentiel** dans la chaîne mystique :
- Pour l'[[Apothicaire]] : remèdes traditionnels (intrants principaux)
- Pour l'[[Alchimiste]] (M4 Érudition) : potions complexes
- Pour le [[Cuisinier]] : cuisine aux propriétés (buffs)
- Pour le [[Prêtre]] et le [[Guérisseur]] : encens sacrés et plantes rituelles
- Pour le [[Mage]] de Spiritus : plantes-composantes des sorts

Il chevauche aussi la **lecture animale** comme discipline de prédiction (cf. [[Prédiction]] §Lecture animale) — les **floraisons précoces** et les **plantes à cycles cosmiques** sont des indices d'imminence de Souffle.

→ Référence [[Cosmologie]] §Spiritus + §Arborius, [[Sources de Ressources]] §Plantes, [[Apothicaire]], [[Alchimiste]].

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Mémoire** — répertoire de plantes, propriétés, lieux de pousse, saisons, cycles cosmiques
- **Stats secondaires** :
  - **Acuité** — détection des plantes rares, identification précise, qualité de récolte
  - **Esprit** — pour les Herboristes Liés à Spiritus (optionnel mais courant) : préparation rituelle des plantes
  - **Endurance** — randonnée prolongée, journées de cueillette
- **Maîtrises contextuelles** :
  - `Maîtrise_Herboristerie` — répertoire et préparation
  - `Maîtrise_Voie_Spiritus` (optionnelle, mono-Voie) — Herboriste-Lié, plus puissant en symbiose plante
  - `Maîtrise_Foi_Vael_Kurash` (optionnelle) — Herboriste religieux, lecture des plantes selon la doctrine animiste

> **Formule canonique** : `Mémoire × Maîtrise_Herboristerie × Acuité` (qualité de récolte et d'identification).

---

## 3. Voie magique principale + religion (optionnelles)

L'Herboriste **n'est pas obligatoirement Lié** — c'est l'une des spécificités du métier dans la catégorie Mysticisme. Beaucoup d'Herboristes excellents sont purement terrestres (Mémoire et Acuité haut). Cependant, deux profils mystiques sont fréquents :

### Herboriste-Lié à Spiritus (Vael'Kari)

- **Voie de Spiritus** active (mono-Voie [[Le Lien]])
- Religion : [[Lore/Religions/Vael'Kurash\|Vael'Kurash]]
- Bonus : **dialogue avec les plantes** (rare mais canonique), récolte sans perte de qualité, plantes "consentent" — narratif fort
- Karma : **vert**

### Herboriste de Somnium Vigil (Vigili)

- Voie d'Aurion ou de Somnix optionnelle
- Religion : [[Lore/Religions/Somnium Vigil\|Somnium Vigil]]
- Spécialité : **plantes hallucinogènes sacrées** (Herbes de Somnix) — préparation rituelle pour rêves prophétiques
- Karma : **jaune** (substances illicites dans certaines cultures)

### Herboriste profane (sans Lien)

- Pas de Voie active, base Mémoire + Acuité
- Religion : variable ou aucune
- Karma : **vert**
- Plus efficace en récolte massive et en commerce ; moins en rituel

---

## 4. Sources / composantes (que produit l'Herboriste)

**Récolte / consomme** :
- **Plante médicinale** (Source 1 Nature) — Hémostine, Sanguinaire, Mousse-de-Lumière, Feuille-d'Aurore, etc.
- **Plante magique** — composantes pour rituels Mage / Guérisseur
- **Champignons** — rituels et alimentation
- **Herbe rituelle** — pour Prêtres / Guérisseurs
- **Sève d'arbre ancien** — composant rare (collab [[Bûcheron]] consacré)
- **Fleurs d'ère** — variants cosmiques (fleurs qui ne poussent que pendant certaines ères [[Les Ères]])

**Produit (transformation primaire)** :
- **Bouquet médicinal sec** — base de remèdes
- **Décoction simple** — précurseur de potion (collab [[Apothicaire]] T1, cf. [[Potion]] §6.1)
- **Onguent** — applique cutanée, soin léger
- **Encens** — combustible rituel (collab [[Prêtre]])
- **Sachet d'herbes** — buff mineur sur durée
- **Identification de plante inconnue** — service rémunéré aux aventuriers

→ Référence [[Sources de Ressources]] §Nature, [[Potion]] §6.1, [[Prédiction]] §Lecture animale (floraisons précoces).

---

## 5. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Atelier d'herboristerie** | Tri, séchage, broyage, préparations simples | Novice |
| **Séchoir** | Conservation longue durée | Novice |
| **Cabane de cueillette** | Camp temporaire en zone de récolte (forêt, plaine, marais) | Initié |
| **Jardin d'herbes** | Culture domestiquée de plantes médicinales rares | Adepte |
| **Bosquet sacré** ([[Lore/Religions/Vael'Kurash\|Vael'Kari]]) | Récolte rituelle, plantes magiques uniques | Expert |

**Outils** :
- **Serpe rituelle** (souvent argent, parfois or pour rituels) — coupe les plantes sans les "tuer" symboliquement
- **Mortier et pilon** — broyage et préparation
- **Pochette d'herboriste** (slot ceinture) — capacité +30% transport plantes
- **Carnet de plantes** — répertoire personnel, +Mémoire passive (cf. [[Tome]] §Codex de savoir)

---

## 6. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Reconnaissance des 20 plantes communes, récolte simple (taux d'échec ~15% : plante abîmée), préparation décoction T1 |
| **Initié** | 40 plantes (incluant 10 magiques mineures), récolte propre (échec ~7%), onguents, sachets d'herbes mineurs |
| **Adepte** | 80 plantes (incluant 20 rares), identification de plantes inconnues (Acuité check), encens rituels (collab Prêtre), proc qualité Magistrale 5% |
| **Expert** | 150 plantes (incluant variants d'ère [[Les Ères]]), récolte de plantes mythiques (collab Mage de Spiritus pour permission rituelle), production de sève d'or |
| **Maître** | **Condition cachée 🔒** — Connaissance de **plantes disparues** ([[Le Souffle]] anciens), Œuvre signée (variété signée — fleur unique nommée par sa lignée), **Consécration** possible (honneur mortel lié à une entité ; à définir Phase 4 — *Arborius* ?) |

> Décroissance : un Herboriste qui ne récolte/cueille plus oublie les plantes rares. Rouille post-Souffle 1 semaine, −15%.

---

## 7. Recettes/préparations par palier

| Palier | Préparations |
|--------|--------------|
| **Novice** | Décoction d'Hémostine (anti-saignement mineur), Bouquet sec, Tisane apaisante |
| **Initié** | Onguent de Sanguinaire (soin cutané), Sachet de Mousse-de-Lumière (anti-froid 4h), Encens de cèdre (rituel Prêtre Novice) |
| **Adepte** | Préparation de Feuille-d'Aurore (intrant Potion T3), Encens d'augure (collab Oracle), Pommade de Spiritus (régen mineur), Sachet de plantes-veilleuses (mini POI alarme 24h) |
| **Expert** | Récolte de fleurs d'ère ([[Les Ères]] : *Fleur du Verdoiement*, *Lichen de l'Ombre Longue*), Sève d'or (collab Enchanteur du vivant), Champignon de Somnix (collab Vigili Somnium Vigil) |
| **Maître** | **Œuvre signée** : variété signée (*Hémostine de la Vallée d'Olbar*, *Sève d'Or des Trois Souffles*), recette ancestrale transmise (potion mythique T6 intrant — [[Potion]] §6.6) |

→ Cross-réf [[Potion]] §6 (Recettes Alchimie — intrants), [[Apothicaire]] (clientèle directe).

---

## 8. Carrière et débouchés

- **Démarrage** — apprentissage local (souvent transmis dans les villages d'Alkaran/Ulinor par les anciens)
- **Spécialisation** — Herboriste itinérant (récolte sauvage, voyage), Herboriste sédentaire (jardin domestiqué, atelier urbain), Herboriste-Vael'Kari (rituel forestier)
- **Établissement** — atelier urbain (clientèle Apothicaire/Alchimiste), ferme botanique (cultures rares), cabane forestière (récolte sauvage premium)
- **Réseau** — alliances étroites avec [[Apothicaire]] (client direct principal), [[Alchimiste]] (client haut tier), [[Cuisinier]] (épices), [[Prêtre]] (encens), [[Guérisseur]] (plantes médicinales mystiques)
- **Reconnaissance** — Doyen / Doyenne d'une vallée, parfois nomination religieuse (Vael'Kari)
- **Maîtrise** — Œuvre signée (variété de plante nommée), parfois une **Consécration** (à définir)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 6 — Erudition). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport, mais classé en frontière Erudition/Mysticisme.

#### Sous-spécialisation Maître+ : Archidruide

> Source canonique : `Role.csv` (cat 6, role n°28).

- **Description** : Herboriste-Maître élevé au rang spirituel d'**Archidruide** — figure rituelle des cercles druidiques (Vael'Kari et autres traditions forestières), conseille les villages d'Alkaran/Ulinor sur les rapports à la nature, préside les liturgies de [[Rota Mundi]] / [[Foedus Animae]].
- **Conditions** : palier Maître + ≥ 1 Œuvre signée végétale + reconnaissance druidique (Vael'Kari ou équivalent) + ≥ 1 [[Le Lien|Lien]] établi avec une entité tutélaire de la nature + 🔒 condition cachée (présider une liturgie d'équinoxe / solstice avec succès rituel mesurable, ou découvrir une variété cosmique post-[[Le Souffle|Souffle]]).
- **Notes** : `[REFONTE-NEEDED — frontière Erudition (cat 6 CSV — savoir des plantes) / Mysticisme (pratique rituelle, [[Le Lien]]) / Agriculture (Botaniste si culture). Le rôle est nominalement Erudition mais correspond canoniquement mieux à un Herboriste-Maître + lien spirituel — pluri-rôle Mysticisme/Erudition.]`

---

## 9. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère du Verdoiement** ([[Les Ères]], Spiritus + Terranu) | +30% rendement, **fleurs d'ère** disponibles, plantes mythiques accessibles |
| **Ère du Sommeil de Glace** | −40% rendement, focus sur plantes hivernales et conservation, *Lichen de Glace* débloqué |
| **Ère du Crépuscule** (Noctis dominant) | Plantes nocturnes valorisées, *Mousse-de-Lumière* devient critique |
| **Post-[[Le Souffle]] sem 1-2** | Rouille −15% : récolte irrégulière, plus d'échecs ; mais **floraisons précoces** post-Souffle révèlent l'imminence du suivant ([[Prédiction]] §Lecture animale) |
| **[[L'Accord]] ≥ 75%** | Recettes de plantes d'ère débloquées plus tôt |
| **Forêt ancienne / Bosquet sacré** | +25% qualité, plantes mythiques accessibles |
| **Désert / zone aride** | Spécialisation cactacées / racines profondes |
| **Religion alignée** ([[Lore/Religions/Vael'Kurash\|Vael'Kurash]]) | +Reconnaissance, rituels conjoints |
| **Faction guilde herboriste** (Astravia, Lumasar) | Mutualisation, accès marchés |

**Karma typique** : **vert**. Bascule **jaune** uniquement si :
- Récolte de plantes hallucinogènes pour usages illicites (souvent associé Vigili Somnium Vigil)
- Récolte de plantes empoisonneuses massives pour [[Assassin]] (collab grise)
- Pillage de bosquet sacré sans consentement

---

## 10. Économie + Signatures PNJ

**Gold sinks générés** :
- Carnet de plantes (mise à jour avec nouvelle entrée) : 50-500 Éclats / nouvelle plante identifiée
- Serpe rituelle d'argent : 2 000-15 000 Éclats
- Construction Jardin d'herbes domestiqué : 20 000-200 000 Éclats (collab Architecte)
- Renouvellement Pochette d'herboriste : 1 000 Éclats / an

**Revenus typiques** :
- Plante commune sèche : 5-20 Éclats / portion
- Plante rare : 50-500 Éclats / portion
- Plante mythique (fleur d'ère) : 500-10 000 Éclats / portion (volatil, lié à l'ère active)
- Identification plante inconnue : 50-1 000 Éclats / consultation
- Sachet médicinal (Initié+) : 30-300 Éclats
- Encens d'augure : 100-1 000 Éclats / portion (revente Oracle/Prêtre)
- Sève d'or (Expert+) : 1 000-15 000 Éclats / portion
- Vente de variété signée (Maître) : 10 000-200 000 Éclats / unité

**Chaîne économique** :
```
Herboriste (Récolte/Culture) → [[Apothicaire]] (Remèdes traditionnels)
                              → [[Alchimiste]] (Potions complexes, [[Potion]] §6)
                              → [[Cuisinier]] (Épices, plats mystiques)
                              → [[Prêtre]] (Encens sacrés)
                              → [[Guérisseur]] (Plantes médicinales mystiques)
                              → [[Mage]] de Spiritus (Composantes de sorts)
                              → [[Enchanteur du vivant]] (Plantes rituelles de pacte)
                              → Marché / [[Marchand]] (vente brute)
```

**Signatures PNJ archétypaux** :
- **Le vieil Herboriste de village** — sédentaire, atelier rural, fournit toute la vallée, double-casquette [[Apothicaire]]
- **L'Herboriste-Vael'Kari nomade** — chamane, parcourt les forêts d'Alkaran et d'Ulinor, double Voie de Spiritus
- **Le maître du Jardin d'Astravia** — sédentaire urbain, fournit l'académie, jardin domestiqué célèbre
- **Le Vigili Somnium Vigil** — herboriste des plantes hallucinogènes sacrées, Vytharia/Lumasar, karma jaune
- **L'Herboriste-aventurier** — itinérant, récolte sauvage premium, vend cher aux Alchimistes des grandes villes

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Mère Tirshara* — Doyenne Vael'Kari d'Alkaran, dernière connaisseuse de la *Mousse de l'Ère du Verdoiement Originel*
- *Maître Olen Jardinier* — gardien du Jardin d'Astravia, créateur de la variété *Hémostine d'Astravia*
- *Vigili Khalan* — Maître herboriste Somnium Vigil de Vytharia, fournit les Veilari en plantes oniriques

---

*Liens : [[Métiers]] · [[Personnage]] · [[Sources de Ressources]] · [[Apothicaire]] · [[Alchimiste]] · [[Cuisinier]] · [[Guérisseur]] · [[Prêtre]] · [[Mage]] · [[Enchanteur du vivant]] · [[Botaniste]] *(à venir M6)* · [[Potion]] · [[Tome]] · [[Cosmologie]] · [[Le Lien]] · [[Prédiction]] · [[Les Ères]] · [[L'Accord]] · [[Le Souffle]] · [[Lore/Religions/Vael'Kurash]] · [[Lore/Religions/Somnium Vigil]]*
