---
tags: [métier, archétype, mysticisme, magie, vivant, esprit, résonance]
type: archetype
category: Métier
catégorie_métier: Mysticisme
stat_principale: Esprit
stats_secondaires: [Résonance, Conscience, Verbe]
voie_magique: Spiritus | Aurion | secondaire (Eldoria, Fatum, Somnix)
religion_compatible: [Vael'Kurash, Foedus Animae, Somnium Vigil]
craft_category: -
sources_ressources_accessibles: [Cristal de Voie, Essence spirituelle, Sève d'arbre ancien, Plume de créature liée, Larme]
stations_principales: [Cercle d'enchantement vivant, Bosquet sacré, Étable consacrée, Pavillon de symbiose]
outils_principaux: [Sceptre vivant, Tome Spiritus, Anneau de pacte, Talisman lié]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert (variantes jaunes selon usage)
factions_compatibles: [Vael'Kurash, Foedus Animae, Cercles de Spiritus, Dresseurs de la Symbiose]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-enchanteur-objet, équilibrage-buff-vivant-pvp, durée-pacte-créature]
---

# 🌿 Enchanteur du vivant — Archétype Métier

> *"L'Enchanteur d'objet grave une rune dans une lame. Moi, je grave un serment dans un cœur qui bat. La lame oublie quand l'enchantement s'épuise. Le cœur, lui, se souvient — et c'est là toute la différence."*
> — **Maître Olbar Sève-Ancienne**, Enchanteur du vivant Vael'Kari, Alkaran

---

## 1. Vue d'ensemble

L'**Enchanteur du vivant** est le pratiquant magique qui pose des **enchantements sur des êtres vivants** : créatures (animaux familiers, montures, bétail), plantes (arbres anciens, plantations rituelles), et **joueurs** (buffs prolongés, marques de pacte, liens de symbiose). Il se distingue radicalement de l'**[[Enchanteur d'objet]]** (catégorie Artisanat, M2) qui inscrit des runes dans le métal, le cuir, le bois mort.

> [!important] Convention de nommage
> Le terme **"Enchanteur"** seul désigne par convention l'**[[Enchanteur d'objet]]** (M2). Pour la pratique sur le vivant, on précise toujours **"Enchanteur du vivant"** (parfois aussi : *Enchanteur de chair*, *Pacte-Sceau* en langue commune). Ne pas confondre dans les fichiers de données.

L'Enchanteur du vivant est un **métier-pivot** entre la magie pure et le soin/symbiose. Il chevauche le [[Guérisseur]] (Voie de Spiritus), le [[Dresseur de créature]] (compagnons animaux), et le [[Prêtre]] de [[Lore/Religions/Foedus Animae\|Foedus Animae]] (sceaux de pacte sur lignées). Il est particulièrement valorisé en société tribale et nature-centrée.

→ Référence [[Cosmologie]] §Spiritus + §Arborius, [[Le Lien]] §Voies de Spiritus, [[Enchanteur d'objet]] (M2, frontière).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Esprit** — capacité magique brute, complexité des enchantements vivants
- **Stats secondaires** :
  - **Résonance** — durée des enchantements, profondeur du Lien établi avec la cible
  - **Conscience** (Couche 0) — perception du Lien, **lecture de l'aura** d'un être vivant (compatibilité de pacte)
  - **Verbe** — incantations rituelles, communication avec créature/plante/joueur cible
- **Maîtrises contextuelles** :
  - `Maîtrise_Voie_Spiritus` (la plus fréquente, mono-Voie)
  - `Maîtrise_Enchantement_Vivant` — sous-maîtrise contextuelle, multiplicative

> **Distinction clé** : la `Maîtrise_Enchantement_Vivant` est **séparée** de la `Maîtrise_Enchantement_Objet` (de l'[[Enchanteur d'objet]]). Pas de transfert entre les deux (cf. [[Personnage]] §Pas de transferts indésirables).

---

## 3. Voie magique principale + religion

### Voies principales

| Voie | Style | Religion principale | Karma | Spécificité |
|------|-------|---------------------|-------|-------------|
| **Voie de Spiritus** | Symbiose nature, animal-pacte, plante-veilleuse | [[Lore/Religions/Vael'Kurash\|Vael'Kurash]] | vert | La Voie canonique. Permet l'invocation temporaire et le pacte permanent avec la faune. |
| **Voie d'Aurion** | Énergie pure infusée dans le vivant | [[Lore/Religions/Somnium Vigil\|Somnium Vigil]] | vert | Plus académique. Buff arcanique sur joueur ; rare en symbiose animale. |

### Voies secondaires

| Voie | Usage |
|------|-------|
| **Voie d'Eldoria** | Bénédiction lumineuse sur cible vivante (chevauche [[Guérisseur]]) — buff régen + révélation |
| **Voie de Fatum** | Marquage de destin sur lignée (souvent rituel funéraire [[Lore/Religions/Foedus Animae\|Foedus Animae]]) — karma jaune |
| **Voie de Somnix** | Enchantement onirique sur cible endormie (rare, souvent [[Lore/Religions/Somnium Vigil\|Somnium Vigil]]) — karma jaune |

> [!warning] Voies interdites au vivant
> Les Voies de **Noctis**, **Umbra**, et **Tempora** ne fonctionnent **pas** comme enchantement bienveillant sur le vivant. Leur usage sur être vivant relève du [[Nécromancien]] (drain, marquage hostile, malédiction) ou de l'agression — karma rouge à noir.

---

## 4. Sources / composantes

**Consomme** :
- **Cristal de Voie de Spiritus** (mineur à apex)
- **Essence spirituelle** — particulièrement importante (l'âme/aura de la cible doit dialoguer avec l'essence canalisée)
- **Sève d'arbre ancien** — composant rituel pour pacte avec créature ou plante
- **Plume de créature liée** ou **Mèche de poil** ou **Goutte de sang** — composante "ancre" sur la cible (consenti)
- **Larme** (rare, élémentaire ou créature mythique) — pacte permanent
- **Plante médicinale rituelle** (collab [[Herboriste]]) — préparation de la cible

**Produit** (services) :
- **Buff prolongé sur joueur** (durée 1-24h selon tier, sur la durée d'une expédition)
- **Pacte de monture / familier** (cf. [[Dresseur de créature]] pour la symbiose pratique — collab fréquente)
- **Plante-veilleuse** : enchanter un arbre/buisson pour qu'il alerte d'une intrusion ou produise un fruit aux propriétés magiques
- **Sceau de lignée** ([[Lore/Religions/Foedus Animae\|Foedus Animae]]) : enchantement transmissible parent → enfant (rituel funéraire)
- **Marque de Voie** sur joueur (Lié à la même Voie : amplificateur passif jusqu'à la prochaine ère)

→ Référence [[Sources de Ressources]], [[Tome]] §5 *Tomus Spiritus*, [[Anneau]] §5 Spiritus.

---

## 5. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Cercle d'enchantement vivant** | Variante du cercle d'enchantement standard, intégrant matière vivante (mousse, lichen, racines) | Initié |
| **Bosquet sacré** | Forêt ancienne ; rituels de pacte créature/plante | Adepte |
| **Étable consacrée** | Lieu de pacte avec montures et bétail, collab [[Dresseur de créature]] | Adepte |
| **Pavillon de symbiose** | Tente rituelle nomade pour Vael'Kari errants | Initié |

**Outils** :
- **Sceptre vivant** (bois sève, parfois encore vert) — focus organique, +Résonance sur enchantements vivants
- **Tome *Tomus Spiritus*** — sorts encapsulés (cf. [[Tome]] §5)
- **Anneau de pacte** ([[Anneau]] §5 Spiritus) — bonus passif Voie + 1 invocation mineure
- **Talisman lié** — porte un sort encapsulé spécifique au pacte (charges illimitées, conditionné par lien)

---

## 6. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Buff mineur sur joueur consentant (+5 stat brute, durée 30min). Apaiser un animal (calme temporaire). |
| **Initié** | Buff Standard (+10-15 stat, 2h), pacte-éphémère avec petit animal (corbeau, écureuil) — durée 24h. Enchantement de plante mineure (fleur lumineuse, fruit nourrissant). |
| **Adepte** | Buff Magistral (+25 stat, 6h), pacte avec créature moyenne (loup, lynx, cervidé) — durée 1 mois réel. Plante-veilleuse (arbre alarme zone). |
| **Expert** | Buff Apex (+50 stat, 12h, plafond), pacte avec créature majeure (ours, grand-cerf, créature mythique mineure) — durée 6 mois réels. Sceau de lignée (pacte transmissible 1 génération). |
| **Maître** | **Condition cachée 🔒** — Pacte permanent (durée illimitée tant que pacte respecté), enchantement de créature mythique majeure (collab Dresseur Maître), Œuvre signée. Sceau de lignée multi-générationnel. |

> Décroissance : un pacte permanent **se brise** si l'Enchanteur du vivant abandonne son Lien ou meurt sans transmission. La créature/plante reprend son comportement naturel.

---

## 7. Sorts/rituels par palier

| Palier | Rituels signature |
|--------|-------------------|
| **Novice** | *Apaiser la bête* (calme animal sauvage 30s), *Souffle de Spiritus* (buff +5 stat sur ami) |
| **Initié** | *Bénédiction du voyage* (buff +10 Endurance + résistance climatique 6h), *Pacte du corbeau* (familier-éclaireur 24h), *Veillée de la fleur* (alarme plante 12h) |
| **Adepte** | *Pacte du loup* (compagnon de combat 1 mois), *Sève d'or* (buff +25 stat 6h), *Plante-veilleuse* (POI mineur, 1 mois), *Bénédiction de troupeau* (collab Berger : +30% productivité) |
| **Expert** | *Pacte du grand-cerf* (monture mystique), *Sceau de lignée* (transmission rituel funéraire, 1 génération), *Convocation du bosquet* (collab cercle Vael'Kari, transforme zone en sanctuaire 1 jour) |
| **Maître** | *Pacte éternel* (créature mythique mineure permanent), *Lignée d'or* (sceau multi-générationnel, lore familial), *Œuvre signée — Sève de l'Aube Nouvelle* (collab [[Alchimiste]] cf. [[Potion]] §6.6 T6) |

→ Cross-réf [[Tome]] §5 *Tomus Spiritus*, [[Anneau]] §5 Spiritus, [[Potion]] §3.5 (Buff temporaire) et §6.6 (Sève de l'Aube Nouvelle T6).

---

## 8. Carrière et progression spirituelle

- **Initiation** — souvent enfant en Alkaran/Ulinor, contact avec un animal-mentor familial (Vael'Kari)
- **Apprentissage** — auprès d'un Maître Vael'Kari ou d'un Cercle de Spiritus
- **Premier pacte** — un animal sauvage choisit l'Enchanteur (le pacte n'est jamais imposé). Souvent rite de passage à l'âge adulte.
- **Expansion** — élargissement vers plusieurs créatures, vers les plantes (Bosquets), vers les joueurs/voyageurs (services payants)
- **Reconnaissance** — Reconnaissance forte chez Vael'Kurash, parfois Foedus Animae (lignées)
- **Maîtrise** — Œuvre signée de pacte (lignée pacte-créature transmise), parfois nomination au siège Éthéré ***Mythanos*** (Élevage et symbiose, cf. [[Cosmologie]] §Sièges)

**Réseau** : [[Dresseur de créature]] (collaboration permanente), [[Herboriste]] (plantes rituelles), [[Berger]] (bénédictions de troupeau), [[Guérisseur]] (rituels conjoints), [[Prêtre]] Vael'Kari ou Animari, [[Mage]] de Spiritus.

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 8 — Mysticisme). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Gardien des sceaux

> Source canonique : `Role.csv` (cat 8, role n°39).

- **Description** : Enchanteur du vivant-Maître investi du pouvoir de **sceller / défaire des pactes magiques** liés au vivant — pactes-créatures, bénédictions de territoires sacrés, sceaux d'interdiction sur des Bosquets. Figure rituelle, gardien des serments cosmiques.
- **Conditions** : palier Maître + Œuvre signée de pacte + ≥ 1 sceau majeur posé/maintenu (territoire, créature, lignée) + 🔒 condition cachée (être reconnu par une entité tutélaire — Vael'Kurash, Foedus Animae OU Spiritus — comme dépositaire d'un sceau cosmique).
- **Notes** : peut aussi se rattacher à un [[Mage]]-Maître orienté pactes ou à un [[Prêtre]]-Maître Foedus Animae. `[REFONTE-NEEDED — frontière Mysticisme : Enchanteur du vivant / Mage / Prêtre. Le rôle « Gardien des sceaux » est trans-métier mystique — pluri-rôle possible. Voir aussi [[Mage]] §Sous-spé.]`

---

## 9. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère du Verdoiement** ([[Les Ères]], Spiritus) | +30% efficacité, durée pactes ×1.5, recettes uniques (Sève d'or) |
| **Ère du Sommeil de Glace** | −20% efficacité, créatures hibernent, pactes plus difficiles |
| **Post-[[Le Souffle]]** | Pactes Magistral+ rouille −10% sem 1-2 ; un Souffle peut **briser** un pacte fragile |
| **[[L'Accord]] ≥ 75%** | Durée pactes +50%, sceau de lignée permanent débloqué plus tôt |
| **Forêt ancienne / Bosquet** | +25% efficacité, recharge Mana +50% |
| **Religion alignée** ([[Lore/Religions/Vael'Kurash\|Vael'Kurash]]) | +Reconnaissance, accès rituels exclusifs |
| **Ville/Capitale industrielle** (Iskara, Mosrack) | −15% efficacité, suspicion sociale |
| **PvP — buff prolongé sur cible joueur** | Buff plafonné à 1h en zone PvP active (anti-stack) |
| **Cible animale stressée/blessée** | Pacte 30% plus difficile (Conscience check) |

**Karma typique** : **vert** par défaut (symbiose, consentement). Bascule **jaune** si :
- Pacte forcé sans consentement (abus de pouvoir)
- Sceau de lignée à des fins manipulatrices (chantage générationnel — typique de certaines pratiques Foedus Animae corrompues)
- Enchantement de joueur PvP via Voie de Somnix sans consentement clair

---

## 10. Économie + Signatures PNJ

**Gold sinks générés** :
- Cristal de Voie de Spiritus : 100-80 000 Éclats selon tier
- Essence spirituelle : 500-3 000 Éclats / unité (consommée à chaque pacte)
- Sève d'arbre ancien : 200-2 000 Éclats / portion (drop forêt rituelle, [[Bûcheron]] consacré)
- Larme rituelle (pacte permanent) : 50 000-500 000 Éclats (rare drop)
- Construction de Bosquet sacré : 200 000-3 000 000 Éclats (joueur-driven, branche [[Architecte]])

**Revenus typiques** :
- Buff voyageur (Standard, 2h) : 100-1 000 Éclats
- Pacte-éphémère animal (24h) : 500-3 000 Éclats
- Pacte mensuel créature : 5 000-30 000 Éclats
- Pacte permanent (collab Dresseur, expert+) : 50 000-500 000 Éclats
- Sceau de lignée (rituel funéraire) : 10 000-100 000 Éclats par génération
- Plante-veilleuse (POI mineur) : 5 000-50 000 Éclats

**Chaîne économique** :
```
[[Bûcheron]] (Sève d'arbre ancien) → Enchanteur du vivant
[[Herboriste]] (Plantes rituelles) → Enchanteur du vivant
[[Mineur]] / [[Bijoutier]] (Cristal de Spiritus) → Enchanteur du vivant
Enchanteur du vivant ↔ [[Dresseur de créature]] (collab pacte)
Enchanteur du vivant → Aventuriers/Caravanes (buffs payants)
Enchanteur du vivant → Lignées nobles ou Foedus Animae (sceau de lignée)
```

**Signatures PNJ archétypaux** :
- **Le Vael'Kari nomade** — itinérant, pactes éphémères, vit de troc dans les villages d'Alkaran
- **La Dame du Bosquet** — sédentaire, gardienne d'un Bosquet sacré, collab permanente avec [[Dresseur de créature]] local
- **L'Animari sceau-de-lignée** — chamane Foedus Animae, spécialiste des sceaux multi-générationnels (Torkam, Skaldoria)
- **L'Aurion académique** — Vytharia/Lumasar, enchantements d'énergie pure sur joueur, méthodes "froides" controversées
- **Le maître de l'Étable consacrée** — collab permanente avec un Berger noble, fournit pactes de troupeau

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Maître Olbar Sève-Ancienne* — Vael'Kari d'Alkaran, pacte permanent avec un grand-cerf de l'Ère du Verdoiement
- *Sœur Helia du Bosquet* — gardienne du dernier Bosquet sacré d'Ulinor, Maîtresse Voie de Spiritus
- *Le Sceau-d'Or de Torkam* — titre porté par génération chez les Animari, dernière en date inconnue

---

*Liens : [[Métiers]] · [[Personnage]] · [[Le Lien]] · [[Cosmologie]] · [[Enchanteur d'objet]] · [[Dresseur de créature]] · [[Guérisseur]] · [[Herboriste]] · [[Berger]] · [[Prêtre]] · [[Mage]] · [[Tome]] · [[Anneau]] · [[Potion]] · [[L'Accord]] · [[Le Souffle]] · [[Lore/Religions/Vael'Kurash]] · [[Lore/Religions/Foedus Animae]]*
