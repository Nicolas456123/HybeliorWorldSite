---
tags: [créature, archétype, bestiaire, polymorphe, prédateur, infiltration, eldoria, somnix]
type: archetype
forme: Polymorphe
taille: Variable
revêtement: [Cuir mutable, Poils mutables]
sens: [Vision diurne, Vision nocturne, Odorat fin, Détection chimique]
cognition: Apprenant
socialité: Solitaire
territorialité: Nomade
milieu: [Forêt, Plaine, Caverne, Marais, Ruines, Variable selon imitation]
locomotion: [Marche, Course, Variable selon forme imitée]
aire_influence: Régionale
reproduction: Vivipare
métamorphose: Réversible
durée_vie: Longue
trophicité: Carnivore
fonction_éco: Prédateur intermédiaire / Infiltrateur
pouvoirs: [Mimétisme morphologique, Imitation vocale, Mémoire de forme, Embuscade par confiance, Régénération minute, Vision réelle (résistance Verbe)]
élément: "-"
résistances: [Physique léger, Poison partiel]
cr: 5-15
hp_base: 280
loot_table: [Cuir, Os, Cœur de creature, Sang, Œil, Sécrétion, Glande à mimétisme]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [mécanique-transformation, cap-taille-canonique, détection-Acuité-palier]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Cosmiques/Polymorphes/_Description|Cosmiques/Polymorphes]] pour les espèces concrètes décomposées de cet archétype.

# 🦎 Métamorphe — Archétype-référence

> Archétype canonique du **polymorphe sauvage** d'Hybelior. Pose le pattern **forme V2 Polymorphe** (1ère implémentation) : transformation morphologique d'imitation, traque par confiance, révélation par paliers d'Acuité ou Voie de Tempora. Pattern complémentaire à [[Esprit changeforme]] (gardien rituel) — ici, prédateur opportuniste.
>
> Voir [[Bestiaire - Index]] · [[Taxonomie des Créatures]] · [[Loup forestier]] · [[Esprit changeforme]]

---

## 1. Vue d'ensemble

### Description sensorielle

Le Métamorphe **n'a pas de forme propre observable** par le joueur non-éveillé : il **imite**. Sa forme native (rarement vue, sauf à la mort ou par révélation Acuité) est un **quadrupède gracile gris-rosé** de 1.5-2 m de long, peau lisse sans poils, yeux vitreux à 4 pupilles concentriques. Squelette **cartilagineux** capable de se réorganiser en 8-15 secondes pour adopter une silhouette d'imitation.

Sous forme d'imitation, le Métamorphe **ressemble très bien** à sa cible — voix, posture, démarche. **Indices subtils** révélables au joueur :
- Yeux légèrement trop fixes (cligne 30% moins souvent)
- Odeur très légèrement aigre (perceptible Maîtrise *Pistage* palier 3+)
- Ombre parfois en décalage de 1-2 frames (variant Onirique amplifie)
- Reflet incomplet dans l'eau ou dans un miroir poli (signature canonique)

### Place écologique et culturelle

**Prédateur intermédiaire** atypique — chasse par **confiance gagnée** plutôt que par force brute. Affinité naturelle Eldoria (rêve / illusion) et Somnix (perception altérée). Régulé par : prédateurs apex insensibles à l'illusion (dragons-bête sages), Liés de Tempora, Druides du Verbe Doux qui les détectent.

**Folklore** :
- *Cestra* → "**Ceux qui Portent les Visages**", peur ancestrale, exorcismes ritualisés
- *Galenor (Trinoria)* → contes pour enfants (le voisin n'est pas le voisin), prudence sociale
- *Pyrtara (Ilthara)* → identifié à un *présage de Crépuscule*, marais réputés infestés
- *Eldhoryn* → un Métamorphe doré (variant rare) serait gardien d'une porte oubliée

**Importance gameplay** :
- **Première rencontre d'horreur sociale** typique d'un joueur Adepte
- Pédagogie : enseigne au joueur à **observer** (Acuité, palier de Pistage)
- **Pivot narratif** : peut imiter un PNJ-quête, déclencher trahison scénaristique
- Loot rare et **alchimiquement précieux** (Glande à mimétisme — composant pour potions de Déguisement)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie & Physiologie

**Polymorphe** par essence — squelette cartilagineux, organes mobiles, masse musculaire reconfigurable. Taille **Variable** mais **plafonnée par la masse native** (~70-90 kg) : un Métamorphe **ne peut pas devenir Colosse**. Il imite efficacement Petit→Grand (lapin, humanoïde, ours juvénile), mais un Colosse réel le démasque (densité incohérente). Revêtement **Cuir mutable** + **Poils mutables** (peut générer fourrure, écailles légères, plumes courtes ; les écailles lourdes et carapaces lui sont inaccessibles).

Sens : **Vision diurne** + **Vision nocturne** (yeux à 4 pupilles), **Odorat fin** (1-2 km, sert à reconnaître les cibles à imiter), **Détection chimique** (lit phéromones et odeur d'individu — base de l'imitation). Pas de Vision 360°, pas d'infrarouge.

> [!note] Cap de taille canonique
> **Règle Polymorphe Hybelior** : la transformation ne peut **pas dépasser la taille native** de la créature. Un Métamorphe Moyen ne peut pas devenir Colosse, mais peut devenir Petit (densité ajustée par compression). Pattern réutilisé par [[Esprit changeforme]].

### Axe 2 — Comportement & Cognition

**Apprenant** : BT + mémoire courte + **mémoire de forme** (registre interne des silhouettes apprises, jusqu'à 5-10 selon âge). Le Métamorphe **observe** sa cible 1-3 jours avant d'attaquer — il regarde de loin, mémorise voix, démarche, gestes, odeur. Cette phase d'observation est **indétectable hors Pistage palier 3+**.

**Socialité Solitaire** (jamais en groupe — la concurrence d'imitations s'annule). **Territorialité Nomade** (suit les sources de proies, change de territoire tous les 1-3 mois). **Communication** : sons (mimés selon forme), postures (mimées), **pas de télépathie**. **Pas d'ondes oniriques** sauf variant Onirique.

### Axe 3 — Habitat & Mobilité

Milieux : très large — **Forêt, Plaine, Caverne, Marais, Ruines**, partout où vit une faune ou société à imiter. Évite : Zones magmatiques, Planar pur, Océan profond. **Locomotion : Marche, Course** native (~9 m/s native), **variable** selon forme imitée (peut grimper en imitant un lynx, nager en imitant une loutre, mais avec efficacité ~70% du modèle réel). **Aire d'influence Régionale** (territoire de chasse 10-30 km²).

### Axe 4 — Cycle de vie & Reproduction

**Vivipare** (1-2 petits par portée, gestation longue ~5 mois). Les petits naissent sous **forme native** et n'apprennent l'imitation qu'à 2-3 ans (premières mimes maladroites). **Métamorphose Réversible** — ne pas confondre avec la métamorphose ontogénétique : le Métamorphe peut **changer de forme à volonté** tout au long de sa vie (1-3 fois par jour environ — coût énergétique élevé). **Durée de vie Longue** : 60-120 ans.

### Axe 5 — Écologie & Régime alimentaire

**Carnivore** strict, mais **opportuniste de société** : préfère les proies isolées (chasseur, voyageur, berger). **Méthode de chasse : Embuscade par confiance** (canonique). Phase 1 : observation 1-3 jours. Phase 2 : approche en imitation d'un proche/connu de la cible. Phase 3 : attaque en forme native ou hybride à courte distance, surprise totale. Pas de poursuite longue (épuise la transformation).

### Axe 6 — Rôle & Relations

**Prédateur intermédiaire / Infiltrateur**. **Alliances opportunistes** uniquement — il ment trop pour des pactes durables. Variant Doré et Vénérable peuvent **négocier** (cas rare, Phase 4). **Menacé** par : prédateurs apex magiques (dragons-bête, Avatars), Druides du Verbe Doux, Voie de Tempora (révèle la forme réelle), chasseurs équipés.

### Axe 7 — Capacités & Affinités

**Pas d'élément** affilié pour l'archétype standard (`élément: -`). Affinité **Eldoria/Somnix** sans appartenance. **Pouvoirs** : Mimétisme morphologique (transformation), Imitation vocale, Mémoire de forme (registre), Embuscade par confiance (×2 dmg ouverture si cible n'a pas révélé), Régénération minute (cicatrise petites blessures hors combat en 1 min), Vision réelle (palier 5+ — il voit à travers les illusions joueur). **Résistances** : Physique léger (le corps absorbe le coup en se réorganisant — 15% réduction sauf coup critique), Poison partiel (organes mobiles, neutralisation partielle).

> [!important] Détection canonique
> La forme réelle d'un Métamorphe est révélée par :
> - **Acuité ≥ 80** (palier perception haut — voir [[Personnage]])
> - **Maîtrise *Pistage* palier 4+**
> - **Voie de Tempora palier 3+** (voit l'instant, pas l'illusion)
> - **Voie d'Eldoria palier 4+** (lumière révèle, dispelle illusion forte)
> - **Reflet** dans miroir/eau profonde immobile (toujours, signature canonique)

### Axe 8 — Statistiques de jeu

Voir §3. HP base 280 (CR 8 standard adulte). Stamina propre, pas de Mana mais une jauge **Forme** (énergie de transformation, 100 pts ; 1 transformation = 30 pts ; régen +5/s hors combat, 0 en combat).

### Axe 9 — Récompenses & Interactions

**Loot** rare-précieux (§6). **XP accordée** ×1.4 vs créature physique de même CR (récompense la difficulté de détection). **Événements** : *Quête de chasse au Métamorphe* (révéler le PNJ-imposteur d'un village), *Trahison scénarisée* (variant unique), *Pacte d'imitation* (Phase 4 — Doré/Vénérable).

---

## 3. Stats de combat par CR

> Convention CR canonique Hybelior 1-30 (cf. [[Loup forestier]] §3).

### Table de variantes par maturité — Métamorphe

| Variante | CR | HP | Stamina | Forme | Vitesse native | Dégâts forme native | Comportement |
|----------|----|----|---------|-------|----------------|----------------------|--------------|
| **Juvénile** | **5** | 160 | 140 | 60 | 8 m/s | 18-26 | Imite mal (1-2 silhouettes), fuit révélation |
| **Adulte** *(standard)* | **8** | 280 | 200 | 100 | 9 m/s | 28-40 | Pleinement opérationnel, 5-7 silhouettes |
| **Vétéran** | **11** | 380 | 240 | 130 | 9 m/s | 36-52 | Imite voix parfaitement, 10 silhouettes |
| **Ancien** *(rare régional)* | **15** | 540 | 320 | 180 | 10 m/s | 48-66 | Phase de combat hybride (forme partielle), Vision réelle |

> **Calibrage Adulte CR 8** : 280 HP face à un joueur Adepte (~300 HP, ~30 dmg/coup). Combat lisible 50-80 s **après révélation** ; phase d'imitation peut durer **plusieurs sessions** narratives. Le combat est **court mais punitif** car il commence par une ouverture surprise ×2.

### Régen et endurance

| Stat | Hors combat | En combat |
|------|-------------|-----------|
| HP | +1 HP/s | 0 |
| Stamina | +25/s | +6/s |
| Forme | +5/s | 0 |

**Coût de transformation** : 30 pts Forme par changement majeur, 8 pts par ajustement mineur (voix, posture). En combat, un Métamorphe **bloqué en forme native** (Forme 0) perd −20% HP régen et devient **prévisible** (joueur lit ses attaques normalement).

---

## 4. Attaques canoniques

| Attaque | Type | Coût Stamina | Cooldown | Effet | Telegraph |
|---------|------|---------------|----------|-------|-----------|
| **Griffure mutable** | Tranchant | 8 | 1.0 s | Dégât base | Très subtil (0.2 s — *à dessein*) |
| **Morsure native** | Perçant | 12 | 1.5 s | Dégât base ×1.1 | Léger (0.3 s) — gueule s'ouvre |
| **Coup d'ouverture par confiance** *(une fois par combat)* | Tranchant lourd | 30 | déclenché | **Dégât ×2** si cible non-révélée au début du combat | **Aucun telegraph** (canonique) |
| **Bond reconfiguré** | Contondant | 25 | 6 s | Dégât ×1.3, repositionnement 4 m | Compression musculaire (0.5 s) |
| **Imitation hybride** *(Vétéran+)* | Utility | 40 | 20 s | Pendant 6 s, le Métamorphe **change partiellement de forme** : le joueur perd lock-on / cible visuelle | Flash mutable (0.6 s) |
| **Cri de la voix volée** *(Ancien uniquement)* | Sonore | 50 | 30 s | Le Métamorphe **prononce une phrase** mémorisée d'un proche du joueur (lore-driven) — joueur subit **−15% Stamina régen 5 s** (effroi) | 1.0 s — **fenêtre de coup parfait** |

**Pattern d'attaque IA** : ouverture par confiance (une seule fois) → griffure + morsure en alternance → bond reconfiguré pour reset distance → imitation hybride pour casser le rythme. Si Forme < 30, **revient sur la forme native pure** (pattern lisible).

**Fenêtre interrupt** : la **Cri de la voix volée** est interruptible (telegraph 1.0 s). L'**ouverture par confiance** ne l'est pas — seule la **détection préalable** annule son bonus.

---

## 5. Pouvoirs spécifiques du Métamorphe

| Pouvoir | Description | Activation |
|---------|-------------|------------|
| **Mimétisme morphologique** | Transformation en silhouette mémorisée. Cap de taille = taille native. Coût 30 pts Forme. | Actif (hors combat) |
| **Imitation vocale** | Reproduit voix d'individus observés. Capacité partielle en combat (cris brefs uniquement). | Passif |
| **Mémoire de forme** | Registre interne 5-10 silhouettes selon âge. Mémorisation = 1-3 jours d'observation. | Passif |
| **Embuscade par confiance** | Ouverture ×2 si cible n'a pas révélé l'imposture en début de combat. **Canonique.** | Passive (déclenchée) |
| **Régénération minute** | Hors combat, +5 HP/s pendant 60 s puis 0. Cicatrise petites blessures sans soins. | Passive (déclenchée) |
| **Vision réelle** | Ancien uniquement. Voit à travers les illusions du joueur (Voie d'Eldoria, masque). | Passive |
| **Cap de taille** | **Ne peut pas dépasser sa taille native**. Convention canonique Polymorphe. | Passif (limite) |

> [!important] Pédagogie de design
> Le Métamorphe **enseigne au joueur l'observation**. Compétences récompensées : Acuité, Pistage, Voie de Tempora. **Punit** : l'inattention sociale (faire confiance aveugle aux PNJ rencontrés en zone hostile).

---

## 6. Loot table — Récolte sur créature

| Ressource | Drop rate (Adulte CR 8) | Modificateur tier | Métier requis | Palier minimum |
|-----------|-------------------------|-------------------|---------------|----------------|
| **Cuir** *(Cuir mutable)* | 100% (1-2 unités) | × 1.5 vétéran, × 2 ancien — **cuir spécial pour vêtements de Déguisement** | Dépéceur + Tanneur | Adepte (palier 3) |
| **Os** *(cartilagineux)* | 80% (1-3 unités) | Spécial — flexible, recherché par sculpteurs | Dépéceur | Initié (palier 2) |
| **Cœur de creature** | 30% (1) — **80% Ancien** | Tier alchimique +2 par âge | Dépéceur + Apothicaire | Adepte |
| **Sang** *(plasma mutable)* | 60% (1-2 fioles) | Composant *Potion de Déguisement* (intrant Magistral) | Apothicaire | Adepte |
| **Œil** | 40% (4) — 4 pupilles concentriques | Composant divinatoire / Voie de Tempora | Dépéceur + Alchimiste | Expert (palier 4) |
| **Sécrétion** *(huile mimétique)* | 50% (1-2 unités) | Intrant cosmétique / parfum d'imitation | Apothicaire | Adepte |
| **Glande à mimétisme** *(rare unique)* | 10% — **30% Vétéran**, **70% Ancien** | **Composant Mythique** : intrant pour potion *Déguisement Parfait* (1h, ressemble à un PNJ ciblé) | Alchimiste expert | Maître (palier 5) |

> [!tip] Économie
> La **Glande à mimétisme** est le seul intrant connu pour le Déguisement Parfait — le seul moyen joueur d'**imiter un PNJ nommé**. Recette à formaliser dans [[Sources de Ressources]] §Fabrication.

---

## 7. Variants cosmiques

> [!note] Pattern Polymorphe
> Pour un archétype déjà polymorphe, les variants modifient la **tendance** de transformation et l'affinité élémentaire de la forme native, pas la mécanique de transformation elle-même.

| Variant | Entité | Modification | Rareté |
|---------|--------|---------------|--------|
| **Shadow Métamorphe** | Noctis | Imite préférentiellement formes de prédateurs nocturnes ; ombres décalées | Ère de l'Ombre Longue |
| **Spectral Métamorphe** | Tempora | **Imitation décalée** : la forme est en retard de 0.3 s sur les mouvements (signature visible aux Acuité 60+) | Ère des Échos Brisés |
| **Frost Métamorphe** | Climata | Imite bien faune froide, mauvais avec faune chaude (peau givrée trahit) ; aura froide légère | Ère de Sommeil de Glace |
| **Verdoyant Métamorphe** | Spiritus + Terranu | **Pacifié** ; imite plantes/animaux pour *cacher* (pas pour attaquer) ; peut être traversé sans combat | Ère du Verdoiement |
| **Brulé Métamorphe** *(paradoxe)* | Eldoria endormie | Imitations laissent traces brûlées ; voix avec écho enflammé (signature aux Acuité 50+) | Ère du Feu Endormi |
| **Pourpre Métamorphe** | Aetheron / Umbra | Inflige Confusion 10% par morsure ; le joueur **doute de sa propre identité** (effet narratif) | Ère de la Brume Mortelle |
| **Doré Métamorphe** | Celestia / Eldoria active | **Pacifié par défaut** ; imite proches disparus du joueur pour **réconforter** (lore-driven, Phase 4) | Ère du Rêve Lumineux + condition |
| **Brisé Métamorphe** | Tempora aigu / Vortex | Forme **glitche** entre 2-3 silhouettes simultanément ; détection réelle quasi-impossible | Ère des Échos Brisés Cardinal |
| **Onirique Métamorphe** | Somnix | **N'apparaît qu'aux rêveurs** ; imite figure de cauchemar du joueur (utilise mémoire joueur). **Ombre toujours décalée** (signature) | Ère du Sommeil Onirique |
| **Vénérable Métamorphe** | Fatum / Spiritus ancien | Apparaît directement Ancien ; **lit les attentes** du joueur et adapte la forme à ce qu'il cherche | Conditions cachées 🔒 (joueur ayant tué 30 Métamorphes) |

> [!warning] Variants à manipuler avec soin
> Les variants Doré, Onirique, Vénérable sont des **outils narratifs** plus que des combats. Ils déclenchent réflexion morale ou révélation lore.

---

## 8. Comportement IA

### Cycle de chasse (canonique)

```
[Phase 0 — Observation] (1-3 jours, indétectable hors Pistage palier 3+)
   ↓
[Phase 1 — Approche en imitation] (forme d'un proche connu, voix, démarche)
   ↓
[Phase 2 — Test de confiance] (parle, sourit, gagne distance courte)
   ↓
[Phase 3 — Ouverture par confiance] (×2 dmg, premier coup, AUCUN telegraph)
   ↓
[Phase 4 — Combat] (forme native ou hybride, pattern §4)
   ↓
[Phase 5 — Fuite] (si HP < 30%, abandonne forme et fuit en native ; ne poursuit JAMAIS)
```

### Décisions de combat clés

- **Cible révélée avant approche** (Acuité, Pistage) : Métamorphe **fuit**, tente une autre cible plus tard
- **Cible isolée** : préférence forte (combat de groupe = échec garanti)
- **Cible en groupe** : il **n'engage pas** — attend l'isolement
- **HP < 30%** : fuite immédiate, abandon forme, course en native
- **Forme à 0** : combat en native pure — joueur reconnaît le pattern, lit normalement

### Pas de jour/nuit ni de meute

Le Métamorphe est **opportuniste opportun** — actif dès qu'une cible isolée se présente. Pas de routine fixe. **Chasse plus en zones de transit** (routes, lisières, ruines).

> [!note] Branche [[Comportements PNJ - Index]]
> Pattern canonique pour créatures **Apprenantes Solitaires Polymorphes**. Hérité par : [[Esprit changeforme]] (mais Sapient + gardien), Doppelgängers (Phase 4), Imitateurs marins.

---

## 9. Exemples de signatures (PHASE 4 stub)

### Le Voisin de Trinoria
- **Localisation** : village frontalier de **Trinoria** (Galenor)
- **CR** : 12 (Vétéran)
- **Variante** : Pourpre Métamorphe
- **Lore** : *« Le Voisin a été le maire pendant 7 ans. Personne n'a remarqué — sauf l'ancien chien, qui aboyait. Le chien est mort un mardi. »* Quête : 4 PNJ disparus en 6 mois ; le joueur doit identifier l'imposteur (énigme sociale).

### L'Imitateur d'Ulinor
- **Localisation** : Forêt d'**Ulinor**, près du Grand Canyon de l'Écho
- **CR** : 15 (Ancien)
- **Variante** : Vénérable Métamorphe + signature Spectrale
- **Lore** : *« On l'appelle l'Imitateur. Il prend la forme de votre mentor. Il vous dit ce que votre mentor n'a jamais eu le courage de dire. Puis il attaque. »* Drop unique **Glande Vénérable** (composant unique pour potion *Identité Stable*).

> [!warning] CHANTIER PHASE 4
> 1-2 signatures par grand pays — les Métamorphes sont **rares** (10-15 signatures totales).

---

## 10. Décisions ouvertes

### Mécanique de transformation canonique

> [!important] Convention canonique Polymorphe Hybelior
>
> 1. **Cap de taille** = taille native. Pas de transformation au-delà (densité incohérente).
> 2. **Mémoire de forme** = registre limité (5-10 selon âge). Pas d'imitation à la volée d'inconnus.
> 3. **Coût Forme** : jauge dédiée, pas Stamina ni Mana.
> 4. **Détection canonique** : Acuité ≥ 80 OU Pistage palier 4+ OU Voie de Tempora 3+ OU Voie d'Eldoria 4+ OU reflet dans eau/miroir.
> 5. **Réversibilité** : peut revenir à forme native à volonté (coût 8 pts Forme).
>
> Pattern réutilisé dans [[Esprit changeforme]] avec spécialisation gardien/Sapient.

### Chantiers

- **Doppelgänger pur** : sous-archétype Phase 4 (humanoïde sapient, imitation parfaite, intelligence sociale) — distinct du Métamorphe sauvage
- **Mimétisme inversé** : variant joueur ? une potion *Déguisement Parfait* devrait permettre au joueur d'imiter un PNJ — symétrie narrative à formaliser ([[Sources de Ressources]] §Fabrication)
- **Trahison scénarisée** : règle de design pour PNJ-imposteur — au moins 1 par grand pays (énigme sociale, narrative-driven)

### Notes pour autres agents

| Pattern | Réutilisation |
|---------|---------------|
| Cap de taille = native | [[Esprit changeforme]] (sauf si Sapient + Voie de Spiritus 5+ qui *autorise* dépassement rituel) |
| Embuscade par confiance | Doppelgängers, Sirènes-illusion, Mimics-coffres |
| Détection multi-paliers | Tous les Polymorphes |
| Forme jauge dédiée | Tous les Polymorphes |

---

*Liens : [[Bestiaire - Index|← Index Bestiaire]] · [[Taxonomie des Créatures]] · [[Esprit changeforme]] · [[Loup forestier]] · [[Élémentaire de feu]] · [[Combat]] · [[Sources de Ressources]] · [[Personnage]] · [[Le Lien]]*
