---
tags: [créature, archétype, bestiaire, insectoïde, désert, embuscade, venin, prédateur]
type: archetype
forme: Insectoïde
taille: Grand
revêtement: [Carapace]
sens: [Vision diurne mineure, Vision 360°, Détection vibrations, Détection chimique]
cognition: Instinctif
socialité: Solitaire
territorialité: Fixe
milieu: [Désert de sable, Désert de pierres, Canyons arides, Ruines ensablées, Plaines sèches]
locomotion: [Marche (8 pattes), Embuscade enfouissement]
aire_influence: Local
reproduction: Ovipare
métamorphose: Larve-Adulte
durée_vie: Moyenne
trophicité: Carnivore
fonction_éco: Prédateur d'embuscade / Régulateur désertique
pouvoirs: [Embuscade enfouie, Frappe-dard paralysante, Pinces broyeuses, Déshydratation par dard, Carapace dure, Détection sismique]
élément: "-"
résistances: [Physique modéré (carapace), Chaleur intense, Poison total]
cr: 6-14
hp_base: 280
loot_table: [Carapace, Antenne, Venin paralysant, Pince, Œuf, Sang (hémolymphe), Œil, Cœur de creature]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [venin-tier-3-5, embuscade-vibrations-mécanique, déshydratation-mécanique]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Arthropodes/Arachnides/_Description|Arthropodes/Arachnides]] pour les espèces concrètes décomposées de cet archétype.

# 🦂 Scorpion géant — Archétype-référence

> Archétype canonique du **prédateur insectoïde désertique** d'Hybelior. Pose le pattern **insectoïde Solitaire** (vs [[Ruche d'insectes]] Hivemind) et **embuscade enfouie** (vs Embuscade forêt du [[Loup forestier]] ou Embuscade neige du [[Loup arctique]]). Premier archétype clairement **désertique** du bestiaire — pose les patterns Désert (déshydratation, vibrations, chaleur). Pattern **8 pattes + dard** (insectoïde quadrupède partiel).
>
> Voir [[Bestiary/Index]] · [[Ruche d'insectes]] · [[Serpent géant]] · [[Vermifuge des sables]] · [[Taxonomie des Créatures]]

---

## 1. Vue d'ensemble

### Description sensorielle

Le Scorpion géant est un **insectoïde massif** de **2-4 m de long** (corps + queue), **8 pattes articulées** + **2 pinces frontales** (envergure 1.5-2.5 m) + **queue dardée** se relevant en arc à 2-3 m de haut. Carapace **brun-sable à jaune-doré** (camouflage désertique), articulée en 12-15 segments rigides, lustrée par dépôt de sable fin. Yeux **multiples** (4-8 ocelles selon variant), brillants la nuit en vision nocturne joueur (signature canonique).

Sons : **cliquetis sec** des articulations en mouvement, **stridulation** d'avertissement (canonique — frottement des pinces), **silence absolu en embuscade enfouie** (sous le sable). Trace : **traînées de sable déplacé** (visible aux Maîtrise *Pistage* palier 2+), **monticules d'embuscade** (signature à reconnaître).

### Place écologique et culturelle

**Prédateur d'embuscade / Régulateur désertique**. Régule populations de petits mammifères désertiques, oiseaux nidant au sol, lézards. Régulé par : prédateurs supérieurs spécialisés ([[Vermifuge des sables]] occasionnellement), tempêtes de sable cataclysmiques, gel nocturne extrême (variante saisonnière), chasseurs nomades.

**Folklore** :
- *Endora (No man's land)* → "**Le Patient des Sables**", animal totémique des nomades survivants ; carapace = bouclier rituel
- *Galenor (Trinoria)* → menace classique des caravanes dans le désert oriental ; chasse organisée pour venin (commerce alchimique)
- *Onara (Mosrack)* → variant militarisé (Industrial Pourpre) chassé par chasseurs-Liés Aetheron pour ressource industrielle
- *Endora (Esperia)* → présent dans le désert avant la jungle ; gardien-pré-cité des Cités Perdues (le voir = approche d'une cité enfouie)
- *Cestra* → absent (climat hostile au scorpion — exception : variant Frost rare)

**Importance gameplay** :
- **Première rencontre désertique** typique d'un joueur Initié-Adepte (CR 6-10 standard)
- Pédagogie : enseigne la **gestion de la déshydratation** (le dard inflige perte d'hydratation gameplay), l'**embuscade silencieuse** (Pistage palier 2+ requis pour anticiper)
- **Loot alchimique central** : Venin paralysant T3-T5 (intrant pour potions de Paralysie, pièges, flèches enrobées)
- Variant **Pourpre / Brulé** courants en désert ; Frost rare et notable (paradoxe)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie & Physiologie

**Insectoïde** taille **Grand** (2-4 m corps + queue). 8 pattes articulées (locomotion stable, basse, rapide en sprint), 2 pinces frontales (préhensile + arme), queue dardée articulée. Revêtement **Carapace** chitineuse (épaisseur 1-3 cm — dure mais cassable au point d'articulation). Sens : **Vision diurne mineure** (médiocre — adapté à l'ombre des trous), **Vision 360°** (8 ocelles répartis), **Détection vibrations** signature (lit le sol à 30 m — base de l'embuscade enfouie), **Détection chimique** (lit phéromones et sueur à 20 m).

> [!important] Forme V2 spécifique
> Le Scorpion géant est **Insectoïde** (axe principal) mais avec **forte composante Quadrupède** (8 pattes répartie en 2x4 = stable ground locomotion). Pattern canonique : Insectoïde > 4 pattes + dard / pinces. Distinct de [[Ruche d'insectes]] (Insectoïde Hivemind avec ailes).

### Axe 2 — Comportement & Cognition

**Instinctif** : BT simple, réactions stéréotypées. Le scorpion **ne planifie pas**, il **réagit aux vibrations**. Pas de mémoire entre combats. **Socialité Solitaire** absolue (les scorpions s'évitent — un par 1-5 km²). **Territorialité Fixe** (un trou d'embuscade peut être occupé 5-15 ans par le même individu). **Communication** : stridulation d'avertissement, posture en arc défensive, **pas de signaux complexes**, **pas de télépathie**.

### Axe 3 — Habitat & Mobilité

Milieux : **Désert de sable, Désert de pierres, Canyons arides, Ruines ensablées, Plaines sèches**. Évite : zones humides, forêts denses, montagnes hautes, eaux. **Locomotion : Marche (8 pattes — 4 m/s sol normal, 6 m/s sprint), Embuscade enfouissement** (signature : creuse en 8-15 s un trou pour s'enfouir, queue émergeant ou totalement caché). **Aire d'influence Local** (territoire 0.5-3 km²).

### Axe 4 — Cycle de vie & Reproduction

**Ovipare** atypique pour insectoïde : **gestation interne** + ponte d'œufs déjà éclos (5-15 mini-scorpions transportés sur le dos de la mère 2-4 mois — signature canonique pour embuscade *avec garde* de scorpionnes mères). **Métamorphose Larve→Adulte** : pas de stade pupe (insectoïde primitif), 5-7 mues. **Durée de vie Moyenne** : 8-15 ans adulte.

### Axe 5 — Écologie & Régime alimentaire

**Carnivore** strict. Proies : petits mammifères désertiques, oiseaux nidant au sol, lézards, parfois **humains imprudents**. **Méthode de chasse : Embuscade enfouissement + Frappe-dard paralysante**. Phase 1 : enfouissement, attente (heures à jours). Phase 2 : détection vibrations à 30 m, calcul de moment d'attaque. Phase 3 : surgissement (0.4 s — surprise totale), pinces saisissent, dard frappe. Phase 4 : **déshydratation par dard** (proie paralysée, hémolymphe + fluides absorbés en 30-60 min — proie morte par dessèchement).

> [!note] Conséquence gameplay
> Joueur attrapé par scorpion sans antidote subit **déshydratation accélérée** (+10% perte d'hydratation/min pendant 10 min). Mécanique à formaliser dans [[Survie & Climat]] (à créer).

### Axe 6 — Rôle & Relations

**Prédateur d'embuscade / Régulateur désertique**. **Alliances** : aucune. **Menacé** par : Vermifuge des sables, tempêtes cataclysmiques, gel nocturne extrême, chasseurs spécialisés.

### Axe 7 — Capacités & Affinités

**Pas d'élément**, **résistance Chaleur intrinsèque**. **Pouvoirs** : Embuscade enfouie (surprise ×2 dmg), Frappe-dard paralysante (paralysie 3-8 s selon âge), Pinces broyeuses (saisie + dégâts continus), Déshydratation par dard (DoT spécifique désertique), Carapace dure (réduction physique 40%), Détection sismique (lit le sol à 30 m). **Résistances** : **Physique modéré** (carapace), **Chaleur intense** (immunité chaleur ambiante, 60% Feu), **Poison total** (sa propre toxine = immunité), **Vulnérabilité Froid** (×1.5 — engourdit articulations).

### Axe 8 — Statistiques de jeu

Voir §3. HP base 280 (CR 8 adulte standard). Stamina propre. Pas de Mana. Vitesse pointe 6 m/s (lent en course mais explosif en surgissement embuscade).

### Axe 9 — Récompenses & Interactions

**Loot** : 8 ressources, **Venin** central (§6). **XP accordée** standard, +50% si chasse rituelle (Voie de Verbe Doux apaisant le scorpion avant prélèvement — pratique nomade Endora). **Événements** : *Trou d'embuscade découvert* (Pistage Palier 2+), *Mère + petits* (combat 1+10 difficile), *Récolte de venin* (Maîtrise *Apothicaire* palier 3+ requise sans tuer).

---

## 3. Stats de combat par CR

### Table de variantes par âge — Scorpion géant

| Variante | CR | HP | Stamina | Vitesse | Dégâts pince/dard | Comportement |
|----------|----|----|---------|---------|--------------------|--------------|
| **Juvénile** *(stade post-mue 3)* | **3** | 100 | 80 | 4 m/s | 12-18 / 14-20 | Embuscade simple, fuit si HP < 40% |
| **Adulte** *(standard)* | **8** | 280 | 180 | 5 m/s | 28-40 / 32-46 (paralysie 4 s) | Pleinement opérationnel |
| **Adulte aguerri** *(post-mue 5+, cicatrices)* | **11** | 380 | 220 | 6 m/s | 38-54 / 44-62 (paralysie 6 s) | Plus tactique, lit vibrations |
| **Mère + portée** *(unique régional, scorpionne avec 8-12 petits sur dos)* | **CR effectif 12** (mère CR 10 + 8-12 petits CR 1) | 320 + 8×40 | 200 | 5 m/s | 36-50 + petits 6-10 | Garde acharnée, **mort de la mère = mort des petits** ironique |
| **Vétéran** *(unique, désert profond, 30+ ans)* | **14** | 540 | 300 | 6 m/s | 50-72 / 58-82 (paralysie 8 s) | Phase 2 à 50%, **dard chargé** disponible |

> **Calibrage Adulte CR 8** : 280 HP face à un joueur Adepte (~300 HP). **Paralysie 4 s** est dévastatrice si le joueur n'a pas d'antidote — il subit le dard puis une cascade d'attaques sans pouvoir se défendre. Combat lisible 60-90 s **après révélation**.

### Régen et endurance

| Stat | Hors combat | En combat |
|------|-------------|-----------|
| HP | +1 HP/s | 0 |
| Stamina | +25/s | +6/s |

**Mécanique d'embuscade** : enfoui, le scorpion est **invisible** sauf à Pistage palier 2+ (perçoit déplacement de sable). Sortir : 0.4 s d'animation (très peu de temps de réaction). **Surprise ×2 dmg** sur premier coup si non-révélé.

---

## 4. Attaques canoniques

| Attaque | Type | Coût Stamina | Cooldown | Effet | Telegraph |
|---------|------|---------------|----------|-------|-----------|
| **Coup de pince** | Tranchant + Contondant | 8 | 1.0 s | Dégât base | 0.3 s — pince s'ouvre |
| **Saisie de pince** | Saisie | 20 | 5 s | Saisit joueur 2-3 s, dégâts continus 8/s ; brisable par Stamina ou attaque ciblée pince | 0.5 s — pince tendue |
| **Frappe-dard paralysante** | Perçant + Poison | 25 | 4 s | Dégât base ×1.1, **Paralysie 4 s** (pleinement immobilisé), inflige *Déshydratation* (5% hydra/s pendant 30 s) | 0.7 s — queue se cabre |
| **Frappe-dard chargée** *(Aguerri+, < 50% HP)* | Perçant lourd + Poison | 50 | 12 s | Dégât ×1.6, **Paralysie 8 s**, Déshydratation amplifiée (10% hydra/s 30 s) | 1.2 s — **fenêtre interrupt** |
| **Surgissement d'embuscade** *(une fois par rencontre)* | Surprise contondante | 30 | déclenché | Saisie + frappe-dard combinés ; **×2 dmg ouverture** si non-révélé | 0.4 s — sable explose |
| **Stridulation d'avertissement** | Sonore (utility, défensive) | 15 | 8 s | Pendant 3 s, **détection joueur ×2** (le scorpion lit chaque mouvement précisément) | 0.6 s — pinces frottées |
| **Cocon de soie de mort** *(Vétéran uniquement)* | Saisie longue | 80 | 30 s | Cocon le joueur en sable durci (3 s à briser), **paralysie 6 s** + déshydratation (15% hydra/s 30 s) | 1.5 s — pinces et dard combinés |

**Pattern d'attaque IA** : embuscade → surgissement (×2 dmg) → saisie pince + dard immédiat → si joueur paralysé : 3-4 coups gratuits → relâche, recule, attend cooldowns. Stridulation si joueur tente furtivité.

---

## 5. Pouvoirs spécifiques du Scorpion géant

| Pouvoir | Description | Activation |
|---------|-------------|------------|
| **Embuscade enfouie** | Creuse 8-15 s, attend immobile heures à jours, surgit en 0.4 s. **Surprise ×2 dmg ouverture**. Détectable Pistage palier 2+ (déplacement sable, monticule subtil). | Passive (état) |
| **Frappe-dard paralysante** | Voir §4. Paralysie + déshydratation. **Antidote** : potion de Voie d'Aquor / Eldoria, ou Voie de Spiritus palier 3+ (purifie status). | Actif |
| **Pinces broyeuses** | Saisie + dégâts continus. Brisable. Pince est **point faible** : frapper articulation = ×2 dmg + libère joueur saisi. | Actif |
| **Déshydratation par dard** | Pattern désertique canonique : DoT non-stat (perte d'hydratation gameplay). Joueur sans gourde ou Voie d'Aquor subit malus de fatigue. | Passive (sur dard appliqué) |
| **Carapace dure** | Réduction physique 40%. **Articulations exposées** = vulnérabilité (×1.5 dmg sur articulations ciblées avec Voie de Tempora ou Acuité haute). | Passive |
| **Détection sismique** | Lit le sol à 30 m. **Joueur immobile** échappe à la détection. Joueur en course = signal fort. **Bottes feutrées** (équipement Phase 4) réduisent signal de 50%. | Passive |

> [!important] Pédagogie de design
> Le Scorpion **enseigne la lecture du sol** (Pistage), la **gestion de l'hydratation** (Déshydratation), et l'**attaque ciblée** (articulations vs carapace). Récompense préparation désertique.

---

## 6. Loot table — Récolte sur créature

| Ressource | Drop rate (Adulte CR 8) | Modificateur tier | Métier requis | Palier minimum |
|-----------|-------------------------|-------------------|---------------|----------------|
| **Carapace** | 100% (3-6 unités) | × 1.5 aguerri, × 2 vétéran — **intrant Bouclier de Carapace** (équipement Initié-Adepte), résistance Physique | Dépéceur + Tanneur + Forgeron léger | Initié (palier 2) |
| **Antenne** | 70% (2 antennes) | Composant alchimique (potions de Détection / Furtivité) ; tier +1 par âge | Dépéceur + Apothicaire | Initié |
| **Venin paralysant** | 90% (1-2 fioles si fioles) — **× 2 vétéran** | **Tier 3-5** selon âge ; intrant : potions de Paralysie, flèches enrobées (+ Saignement combiné) | Dépéceur + Apothicaire | Adepte (palier 3) |
| **Pince** | 50% (2 pinces) | Composant artisanat (massue de pince, pince forgée en arme — Magistral) | Dépéceur + Forgeron | Adepte |
| **Œuf** | 30% (5-15 œufs si scorpionne mère) — **uniquement sur mère** | Aliment exotique (rare, à Endora — délicatesse nomade) ; alchimie : intrant *Potion d'Embuscade* (+furtivité 30 min) | Dépéceur + Cuisinier | Initié |
| **Sang** *(hémolymphe verdâtre)* | 60% (1-2 fioles) | Composant alchimique haut tier ; intrant Voie de Tempora (anti-paralysie ironique) | Apothicaire | Adepte |
| **Œil** | 40% (4-8 ocelles) | Composant divinatoire ; tier alchimique +1 vétéran | Dépéceur | Initié |
| **Cœur de creature** | 15% — **40% vétéran** | Tier alchimique +2 par âge ; intrant *Potion Patience d'Embuscade* (immobile sans malus 1h) | Dépéceur + Alchimiste | Expert (palier 4) |

> [!tip] Récolte rituelle (alternative)
> Maîtrise *Apothicaire* palier 3+ + Voie de Verbe Doux palier 2 = **récolte de venin sans tuer** (le scorpion endormi). 1 fiole/scorpion, économie locale Endora basée là-dessus. Pattern à formaliser dans [[Sources de Ressources]].

---

## 7. Variants cosmiques

| Variant | Entité | Modification | Rareté |
|---------|--------|---------------|--------|
| **Shadow Scorpion** | Noctis | Carapace **noire absorbante** ; embuscade nocturne ×2 efficacité ; vision diurne nulle, vision nocturne maximale | Ère de l'Ombre Longue + désert |
| **Spectral Scorpion** | Tempora | Carapace translucide ; **immunité physique 50%** ; queue dard peut frapper en avance temporelle (1 s) | Ère des Échos Brisés |
| **Frost Scorpion** *(paradoxe)* | Climata | Carapace bleu glacée ; **vit en désert de glace** (Cestra extrême, Azoria) ; venin devient *Gel Paralysant* (paralysie + Givre) ; vulnérable à la chaleur (×2) au lieu de l'inverse | Ère de Sommeil de Glace + désert de glace (paradoxe rare) |
| **Verdoyant Scorpion** | Spiritus + Terranu | Carapace verte ; **passe en oasis** uniquement ; venin devient *Sève Paralysante* (effet alchimique différent) | Ère du Verdoiement (rare en désert) |
| **Brulé Scorpion** *(forme canonique de certains déserts)* | Eldoria endormie | Carapace **rougeoyante incandescente** ; aura chaude (DOT 2 dmg/s zone 2 m) ; venin devient *Brûlure Paralysante* | **Forme par défaut** près volcans / déserts ardents (Cendara environs) |
| **Pourpre Scorpion** *(courant)* | Aetheron / Umbra brouillard | Carapace pourpre ; venin inflige Confusion 5 s sur paralysie | Ère de la Brume Mortelle / désert d'Ilthara |
| **Doré Scorpion** | Celestia / Eldoria active | Carapace **dorée éclatante** ; venin pacifié (paralysie sans déshydratation) ; non-hostile par défaut | Ère du Rêve Lumineux + condition |
| **Brisé Scorpion** | Tempora aigu / Vortex | Carapace glitchée ; surgissement aléatoire (parfois loin de la cible, parfois trop tôt) ; combat imprédictible | Ère des Échos Brisés |
| **Onirique Scorpion** | Somnix | Apparaît dans rêves désertiques ; venin = **Sommeil profond** (rêve forcé 10 min RT) | Ère du Sommeil Onirique |
| **Vénérable Scorpion** | Fatum / Spiritus ancien | Apparaît directement Vétéran ; combat tactique avancé ; signature folklorique des désertiers | Conditions cachées 🔒 (joueur ayant tué 30 scorpions) |

---

## 8. Comportement IA

### Routine quotidienne

| Phase | Comportement |
|-------|--------------|
| **Aube** | Sortie de trou, courte chasse aux insectes / lézards |
| **Matin** | Retour en trou (chaleur intense — protection) |
| **Après-midi** | **Embuscade prolongée** (peut durer toute la journée torride) |
| **Crépuscule** | Sortie active, patrouille territoriale |
| **Nuit** | Phase active : chasse, embuscade nocturne aux mammifères |
| **Avant l'aube** | Retour en trou, repos |

### Décisions clés

- **Vibrations détectées** : si proie de bonne taille → embuscade. Si proie trop grosse (Yéti, Vermifuge) → reste enfoui, ne révèle pas
- **Joueur révélé** (Pistage 2+) : combat ouvert, plus d'embuscade
- **HP < 30%** : tente de se ré-enfouir (8 s — fenêtre punition pour finir le combat)
- **Mère + portée** : combat acharné, ne fuit jamais ; les petits attaquent en swarm autour
- **Joueur grimpe / s'isole en hauteur** : scorpion attend, ne poursuit pas en hauteur

### Cycle saison & Ère

- **Saison chaude** : embuscade prolongée ; pic d'activité crépusculaire
- **Saison froide** *(rare en désert)* : torpeur partielle, peu d'activité
- **Ère du Feu Endormi** : variant Brulé domine, agressivité +30%
- **Ère de Sommeil de Glace** : Frost Scorpion paradoxe (rare)

> [!note] Branche [[NPC Behaviors/Index]]
> Pattern canonique pour créatures **Instinctives Solitaires Embuscade Désertique**. Hérité par : araignées géantes désertiques, scolopendres géants, lézards-pièges.

---

## 9. Exemples de signatures (PHASE 4 stub)

### Le Patient des Sables (Endora, No man's land)
- **Localisation** : **Désert post-Guerre du Sable**, Endora
- **CR** : 14 (Vétéran)
- **Variante** : Vétéran Pourpre Scorpion
- **Lore** : *« Il attend depuis avant la Guerre. Il a vu mille armées passer. Aucune n'a su où il était. Il prend son temps — peut-être encore mille ans. Quand il frappe, c'est qu'il a calculé. »* Drop unique **Carapace du Patient** (bouclier Magistral, +résistance immobilisé).

### La Mère de Mosrack (Onara, Mosrack)
- **Localisation** : **Désert oriental** de Mosrack, mines de surface
- **CR** : 12 effectif (Mère + 12 petits)
- **Variante** : Mère Scorpionne aguerrie + 12 juvéniles
- **Lore** : *« Les chasseurs de Mosrack la traquent depuis 30 ans. Aucun n'est revenu intact. Elle est intelligente — pour une instinctive. Elle sépare ses chasseurs en 2 groupes, les pousse vers des trous d'embuscade pré-creusés. »* Drop unique **Œufs de la Mère** (intrant *Potion d'Embuscade Magistrale*).

### Le Doré d'Esperia (Endora, Cités Perdues)
- **Localisation** : **Cités Perdues** d'Esperia (entrée désertique)
- **CR** : 14 (Vétéran Doré)
- **Variante** : Doré Scorpion
- **Lore** : *« Gardien-pré-cité d'Esperia. Le voir = la cité est proche. L'attaquer = la cité disparaît dans le sable pendant 100 ans. Le respecter = il s'écarte, montre l'entrée. »*

> [!warning] CHANTIER PHASE 4
> 1-2 signatures par grand pays désertique (Endora, Onara/Mosrack, Galenor désert, Ilthara/Pyrtara) → **5-7 signatures totales**.

---

## 10. Décisions ouvertes

### Pattern Désertique canonique

> [!important] Convention canonique
>
> Le Scorpion géant pose les patterns Désert :
> 1. **Déshydratation par dard / morsure / piqûre** : DoT non-stat (perte d'hydratation gameplay) — pattern réutilisable Vermifuge, vipère désertique, sphinx (Phase 4)
> 2. **Embuscade enfouie** : creusement, attente longue, surgissement 0.4 s ; détection Pistage palier 2+ (déplacement sable). À étendre Vermifuge, sphinx-piège
> 3. **Détection sismique** : lit le sol — pattern à étendre à toutes créatures désertiques enfouies
> 4. **Résistance Chaleur intrinsèque + Vulnérabilité Froid** : signature désertique standard
>
> Pattern partagé avec [[Vermifuge des sables]] (mais Tentaculaire + boss).

### Chantiers

- **Hydratation** : système à formaliser ([[Survie & Climat]] — à créer)
- **Pistage en désert** : palier 2+ requis pour anticiper embuscade ; pattern à formaliser Maîtrise *Pistage* (sous-spécialité désert)
- **Bottes feutrées** : équipement réducteur de signal sismique (Phase 4)
- **Récolte de venin sans tuer** : économie nomade Endora à formaliser
- **Variants Frost** : extrêmement rares (paradoxe Climata × Désert) ; cas d'usage Cestra/Azoria

### Notes pour autres agents

| Pattern | Réutilisation |
|---------|---------------|
| Déshydratation par dard | [[Vermifuge des sables]], vipère désertique, sphinx-piège |
| Embuscade enfouie | Vermifuge, sphinx-piège, lézard-trou |
| Détection sismique | Toutes créatures désertiques enfouies |
| Carapace + articulations vulnérables | Tous les Insectoïdes Solitaires |
| Venin paralysant T3-5 | Araignées géantes, scolopendres, sphinx |

---

*Liens : [[Bestiary/Index|← Index Bestiaire]] · [[Ruche d'insectes]] · [[Serpent géant]] · [[Vermifuge des sables]] · [[Sources de Ressources]] · [[Géographie]] · [[Combat]]*
