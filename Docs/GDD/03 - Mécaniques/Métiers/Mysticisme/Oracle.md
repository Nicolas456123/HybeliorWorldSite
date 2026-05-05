---
tags: [métier, archétype, mysticisme, prédiction, conscience, verbe]
type: archetype
category: Métier
catégorie_métier: Mysticisme
stat_principale: Conscience
stats_secondaires: [Verbe, Mémoire, Esprit]
voie_magique: Fatum (canonique) | Tempora (rare)
religion_compatible: [Foedus Animae, Rota Mundi, Somnium Vigil, Ordo Caelum]
craft_category: -
sources_ressources_accessibles: [Cartes de Fatum, Osselets sculptés, Miroir sombre, Encens d'augure, Cristal de Voie de Fatum]
stations_principales: [Pierres de Fatum, Sanctuaire de Fatum, Cabinet d'oracle, Salle des miroirs sombres]
outils_principaux: [Cartes de Fatum, Osselets, Miroir sombre, Talisman augural]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: jaune (méfiance sociale)
factions_compatibles: [Foedus Animae, Conseil des Augures (Astravia), Rota Mundi]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [équilibrage-fiabilité-prédiction-playtest, biais-religieux, bourse-augures]
---

# 🎴 Oracle — Archétype Métier

> [!info] Entité tutélaire canonique
> **[[Cosmologie|Fatum]]** (Cosmique — *Juge des destins*, détermine destins et chemins de vie). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *"Je ne lis pas le futur. Je lis les fils. Et parfois, je vois lesquels vont se rompre."*
> — citation canonique, voir [[Prédiction]] §Oracle

---

## 1. Vue d'ensemble

L'**Oracle** est le pratiquant de la **Voie de Fatum** (Cosmique des destins) ou — plus rarement — de la **Voie de Tempora** (Éternel du temps). Il est le spécialiste de la **lecture des fils du destin**, l'une des **5 disciplines de Prédiction** d'Hybelior (cf. [[Prédiction]] §Oracle).

L'Oracle ne voit pas un futur unique : il perçoit **plusieurs futurs pondérés**, comme des fils tissés par Fatum, dont l'épaisseur indique la probabilité. Ses méthodes traditionnelles incluent le **lancer d'osselets**, le **tirage de cartes de Fatum** (24 lames), le **scrying en miroir sombre**, et l'**augure rituel**. Il est l'un des deux métiers d'aspect **NATURE PROBABLE** dans l'écosystème de prédiction (avec la Voie de Tempora qui prédit par analogie historique).

> [!important] Place dans l'écosystème de Prédiction
> Les **5 disciplines de Prédiction** ([[Prédiction]]) sont :
> 1. **Astronomie** ([[Astronome]] M4) — TIMING
> 2. **Oracle** *(ce fichier)* — NATURE PROBABLE
> 3. **Voie de Tempora** ([[Mage]] Tempora) — NATURE PAR ANALOGIE
> 4. **Lecture animale** ([[Chasseur]], [[Berger]]) — IMMINENCE
> 5. **Tradition religieuse** ([[Prêtre]]) — INTERPRÉTATION CULTURELLE
>
> L'Oracle apporte la **distribution probabiliste sur les natures possibles** de la prochaine ère. Il est complémentaire — pas substituable. Sa **fiabilité** : ★★★ ☆ ☆ (probabiliste, jamais certaine).

→ Référence [[Prédiction]] §Oracle, [[Cosmologie]] §Fatum, [[Le Lien]] §Voie de Fatum.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Conscience** (Couche 0) — perception du Lien et des fils du destin (cf. [[Prédiction]] §Oracle)
- **Stats secondaires** :
  - **Verbe** — formulation des présages, performance rituelle, persuasion des clients
  - **Mémoire** — répertoire des cartes de Fatum, lectures historiques, croisement avec les autres disciplines
  - **Esprit** — Mana max, complexité du rituel d'augure
- **Maîtrises contextuelles** :
  - `Maîtrise_Oracle` — sous-maîtrise contextuelle de la discipline
  - `Maîtrise_Voie_Fatum` (canonique) ou `Maîtrise_Voie_Tempora` (rare)
  - `Maîtrise_Foi_Foedus_Animae` ou `Maîtrise_Foi_Rota_Mundi` (selon religion)

> **Formule canonique** : `Conscience × Maîtrise_Oracle` (cf. [[Prédiction]] §Oracle).
> Pour un Lié à Fatum : amplification multiplicative par `Maîtrise_Voie_Fatum`.

---

## 3. Voie magique principale + religion

### Voies principales

| Voie | Style | Religion principale | Karma typique |
|------|-------|---------------------|---------------|
| **Voie de Fatum** | Lecture des fils, malédictions mineures, augures, altération de probabilités | [[Lore/Religions/Foedus Animae\|Foedus Animae]] | **jaune** (méfiance sociale forte — "ceux qui manipulent le destin") |
| **Voie de Tempora** *(rare)* | Lecture par échos passés, vision rétroactive | [[Lore/Religions/Rota Mundi\|Rota Mundi]] | jaune |

### Religions et oracle

| Religion | Rôle de l'Oracle |
|----------|------------------|
| **[[Lore/Religions/Foedus Animae\|Foedus Animae]]** | Le plus aligné — Fatum est partiellement vénéré ; Animari et Oracle se chevauchent souvent |
| **[[Lore/Religions/Rota Mundi\|Rota Mundi]]** | Vénère Fatum comme Cosmique des destins ; Oracle = praticien légitime |
| **[[Lore/Religions/Ordo Caelum\|Ordo Caelum]]** | Croit lire les destins dans les étoiles — **erreur théologique** : les Stellari sont des Astronomes, pas des Oracles. Les véritables Oracles d'Ordo Caelum sont rares. |
| **[[Lore/Religions/Somnium Vigil\|Somnium Vigil]]** | Oracle onirique (lecture pendant sommeil rituel) — variante via *Vigili* |

> [!warning] Méfiance sociale
> Les **augures de Fatum sont vus avec méfiance** dans plusieurs cultures (cf. [[Prédiction]] §Oracle). Bannis de plusieurs cités, ils opèrent dans les **marchés noirs** ou les **sociétés secrètes**. La méfiance vient de la croyance — partiellement justifiée — que les Liés de Fatum **manipulent** les destins, pas seulement les lisent.

---

## 4. Sources / composantes

**Consomme** :
- **Cartes de Fatum** (24 lames) — paquet rituel ; certaines lames sont **rarissimes** (drop ou quête, voir [[Prédiction]] §Outils)
- **Osselets sculptés** — consommables, usure progressive (rituel rapide mais peu fiable)
- **Miroir sombre** — objet de prédiction de haut niveau (voir directe, drain Mana sévère)
- **Encens d'augure** — amplifie les rituels, collab [[Apothicaire]] / [[Alchimiste]]
- **Cristal de Voie de Fatum** (mineur à apex)
- **Sacrifice symbolique** (objet précieux) — pour augure rituel amplifié

**Produit** (services) :
- **Tirage simple** — réponse rapide, faible précision (osselets, 5min)
- **Tirage de cartes** — distribution probabiliste sur les natures possibles d'ère (lecture lente, 30min-2h)
- **Scrying** — vision directe via miroir sombre (rare, drain Mana fort, 1 utilisation/jour)
- **Augure rituel** — sacrifice + tirage amplifié, fiabilité accrue (1 utilisation/semaine réelle)
- **Misage à la Bourse des Augures** — paris ritualisés sur la prochaine ère ([[Prédiction]] §Bourse des Augures)

→ Référence [[Prédiction]] §Outils de prédiction, [[Tome]] §5 *Liber Fati*, [[Anneau]] §5 Fatum.

---

## 5. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Pierres de Fatum** (Mosrack/Onara) | POI mondial, rituels de tirage amplifiés ([[Prédiction]] §Lieux dédiés) | Adepte |
| **Sanctuaire de Fatum** | Lieu consacré privé (collab [[Architecte]]) | Initié |
| **Cabinet d'oracle** | Cabinet urbain (Astravia, Vytharia, Lumasar) | Novice |
| **Salle des miroirs sombres** | Lieu équipé pour scrying | Expert |

**Outils** :
- **Cartes de Fatum** (paquet rituel, 24 lames) — usure progressive
- **Osselets sculptés** — consommables
- **Miroir sombre** — objet rare, drain Mana (cf. [[Prédiction]] §Items de prédiction)
- **Tome *Liber Fati*** — sorts encapsulés (cf. [[Tome]] §5 — *Malédiction mineure*, *Augure court terme*, *Lecture de destin* Apex)
- **Talisman augural** — porte un sort de divination léger à charges illimitées
- **Anneau de Fatum** ([[Anneau]] §5 Fatum) — +1% chance critique cumulé, 1 reroll d'événement aléatoire / jour réel

---

## 6. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Tirage simple (3 osselets, lecture binaire), résultat affiché en distribution faible (1 réponse, fiabilité ★) |
| **Initié** | Tirage de 9 osselets, première lecture de cartes (3 lames), distribution sur 2-3 issues. Fiabilité ★★. |
| **Adepte** | Tirage complet de cartes (12 lames), scrying mineur (1×/jour, drain Mana 50%), distribution sur 4-5 issues. Fiabilité ★★★. |
| **Expert** | Augure rituel (sacrifice symbolique, 1×/semaine), scrying complet, lecture d'archétypes d'ère ([[Les Ères]] catalogue). Fiabilité ★★★★. |
| **Maître** | **Condition cachée 🔒** — Tirage des 24 lames complètes, *Lecture de destin* Apex (peut suivre une cible nommée sur 1 ère), Œuvre signée (titre **« Prophète »** si 3 Souffles successifs prédits avec exactitude — cf. [[Prédiction]] §Conditions cachées). |

> Décroissance : un Oracle qui prédit faussement perd en Reconnaissance et Renom (cf. [[Prédiction]] §Garde-fous). 3 prédictions ratées = cote Bourse des Augures effondrée.

---

## 7. Sorts/rituels par palier

| Palier | Rituels signature |
|--------|-------------------|
| **Novice** | *Tirage des 3 osselets* (réponse oui/non/incertain), *Lecture de présage mineur* (météo personnelle 24h) |
| **Initié** | *Tirage de cartes courtes* (3 lames sur passé/présent/futur proche), *Augure mineur* (cible : voyage, mariage, transaction) |
| **Adepte** | *Tirage de 12 lames* (lecture nuancée), *Scrying mineur* (vision 5s d'un futur probable), *Malédiction mineure* (Voie de Fatum offensive) |
| **Expert** | *Augure rituel* (lecture sur 1 ère entière), *Scrying complet* (vision 30s), *Altération de probabilité* (favorise issue d'événement aléatoire à proximité — karma jaune si abus), *Lecture d'archétype d'ère* |
| **Maître** | *Tirage des 24 lames* (lecture complète distribution probabiliste), *Lecture de destin* Apex (suit cible nommée), *Œuvre signée — Vision Exceptionnelle* (collab 5 disciplines ; cf. [[Prédiction]] §Conditions cachées) |

→ Cross-réf [[Tome]] §5 *Liber Fati*, [[Anneau]] §5 Fatum, [[Potion]] §3.6 Élixir cosmique.

---

## 8. Carrière et progression spirituelle

- **Vocation** — souvent suite à une vision spontanée enfant, ou à une lignée familiale (Animari Foedus Animae)
- **Apprentissage** — auprès d'un Maître Oracle (rare et caché — souvent aux Pierres de Fatum, ou clandestinement à Astravia)
- **Premier tirage public** — rite de passage ; un faux pas peut détruire la carrière
- **Spécialisation** — tirage rapide (osselets, marché populaire), tirage long (cartes, clientèle riche), scrying (Maître+, prestige extrême)
- **Inscription au Conseil des Augures** (Astravia) — étape de prestige, accès à la Bourse des Augures
- **Maîtrise** — titre **« Prophète »** (cf. [[Prédiction]] §Progression du métier de prédicteur, étape 5). Œuvre signée. Statut quasi-mythique.

**Réseau** : [[Astronome]] (collab pour timing), [[Mage]] de Tempora (collab pour analogie), [[Chasseur]] / [[Berger]] (collab pour imminence), [[Prêtre]] (collab pour interprétation), [[Bibliothécaire]] (almanachs).

---

## 9. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère des Présages** ([[Les Ères]]) | +30% efficacité, recettes de cartes spéciales, Bourse des Augures dynamique |
| **Ère du Verdoiement / Rêve Lumineux** | −15% (Fatum moins audible) |
| **Post-[[Le Souffle]]** | Prédiction obligatoire si veut conserver Reconnaissance ; jugement public sur la justesse |
| **[[L'Accord]] ≥ 75%** | Tirages rituels plus précis, débloque *Lecture de destin* plus tôt |
| **Pierres de Fatum (Mosrack/Onara)** | +25% efficacité tirages, scrying gratuit en Mana 1×/jour |
| **Religion alignée** ([[Lore/Religions/Foedus Animae\|Foedus Animae]] ou [[Lore/Religions/Rota Mundi\|Rota Mundi]]) | +Reconnaissance, accès rituels exclusifs |
| **Religion opposante** ([[Lore/Religions/Ignis Aeternum\|Ignis Aeternum]] : "le destin se forge par le feu") | Reconnaissance −20%, hostilité PNJ |
| **PvP — usage offensif (malédiction Fatum)** | Karma jaune systématique |
| **Bourse des Augures (Astravia)** | Système de misages, gain financier majeur si juste, perte si faux |

**Karma typique** : **jaune** par défaut (méfiance sociale liée à la "manipulation des destins"). Bascule **vert** dans les sociétés Foedus Animae / Rota Mundi qui le légitiment. Bascule **rouge** si malédictions de Fatum utilisées contre des joueurs sans cause juste, ou si manipulation avérée d'événements à des fins personnelles.

---

## 10. Économie + Signatures PNJ

**Gold sinks générés** :
- Cartes de Fatum (paquet rituel) : 500-50 000 Éclats selon rareté des lames
- Osselets sculptés : 50-200 Éclats / lot (consommables)
- Miroir sombre : 50 000-500 000 Éclats (rare, parfois quête signature)
- Encens d'augure : 100-1 000 Éclats / portion
- Cristal de Voie de Fatum : 100-80 000 Éclats selon tier
- Construction de Cabinet d'oracle : 30 000-300 000 Éclats

**Revenus typiques** :
- Tirage simple (osselets, 5min) : 50-500 Éclats
- Tirage de cartes (12 lames, 30min) : 500-5 000 Éclats
- Scrying (vision 30s, 1×/jour) : 5 000-50 000 Éclats
- Augure rituel (sacrifice + tirage, 1×/semaine) : 10 000-100 000 Éclats
- Conseil à un seigneur (rente mensuelle) : 5 000-100 000 Éclats / mois
- **Bourse des Augures** : gains très variables (peuvent atteindre des centaines de milliers d'Éclats par bonne prédiction)
- Vente de fragment d'almanach : 1 000-50 000 Éclats

**Chaîne économique** :
```
[[Bibliothécaire]] / [[Historien]] (Almanachs, lores) → Oracle (recoupement)
[[Astronome]] (Timing) ↔ Oracle (Nature) — collab essentielle
[[Mineur]] / [[Bijoutier]] (Cristal de Fatum) → Oracle
[[Apothicaire]] (Encens d'augure) → Oracle
Oracle → Bourse des Augures (Astravia) → Économie spéculative globale
Oracle → Caravanes / Guildes / Seigneurs (clients riches)
```

**Signatures PNJ archétypaux** :
- **L'Oracle des Pierres de Fatum** — sédentaire, gardien du POI mondial, tirages massifs lors des Souffles
- **L'Augure d'Astravia** — Conseil des Augures, autorité officielle, double-casquette [[Astronome]]
- **L'Oracle clandestin** — banni d'une cité (Cendara), opère dans le marché noir d'une autre (Vytharia)
- **L'Animari oraculaire** — chamane Foedus Animae, lecture des fils via les ancêtres, karma vert
- **Le Vigili onirique** — Somnium Vigil, lecture pendant sommeil rituel, méthodes hallucinogènes

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *La Dame des 24 Lames* — Maîtresse Oracle anonyme, dernière détentrice du paquet originel de Fatum
- *Maître Veylan d'Astravia* — Astronome ET Oracle, président du Conseil des Augures, autorité combinée
- *Korian de Mosrack* — Oracle des Pierres de Fatum, lit pour les caravanes du sud

---

*Liens : [[Métiers]] · [[Personnage]] · [[Le Lien]] · [[Cosmologie]] · [[Prédiction]] · [[Astronome]] · [[Mage]] · [[Prêtre]] · [[Chasseur]] · [[Berger]] · [[Tome]] · [[Anneau]] · [[Potion]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Lore/Religions/Foedus Animae]] · [[Lore/Religions/Rota Mundi]]*
