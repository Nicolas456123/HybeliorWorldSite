---
tags: [créature, archétype, bestiaire, amorphe, élémentaire, feu, planaire, cosmique]
type: archetype
forme: Amorphe
taille: Variable
revêtement: [Cristaux]
sens: [Vision diurne, Vision 360°, Détection thermique]
cognition: Instinctif
socialité: Solitaire
territorialité: Nomade planaire
milieu: [Zones magmatiques, Volcanique, Planar (astral, éthéré), Caverne profonde]
locomotion: [Lévitation, Marche]
aire_influence: Instable
reproduction: Bourgeonnement
métamorphose: Multi-stades
durée_vie: Éphémère
trophicité: Détritivore énergétique
fonction_éco: Équilibreur
pouvoirs: [Aura brûlante, Projection de flamme, Régénération thermique, Immunité feu, Vulnérabilité eau-froid, Explosion à la mort]
élément: Feu
résistances: [Feu, Anti-énergie partielle, Physique normal partiel]
cr: 7
hp_base: 220
loot_table: [Essence spirituelle, Cœur de creature, Cristaux fondus, Cendres incandescentes, Sang, Larme, Sécrétion]
variants_cosmiques: [Frost, Onirique, Brisé, Pourpre, Vénérable, Doré, Verdoyant, Spectral, Shadow, Brulé]
status: drafted
last_review: 2026-05-01
needs_review_for: [cr-system-canonique, paradoxes-élémentaires-variants, planar-spawn-rules]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Cosmiques/Élémentaires/_Description|Cosmiques/Élémentaires]] pour les espèces concrètes décomposées de cet archétype.

# 🔥 Élémentaire de feu — Archétype-référence

> Archétype canonique de l'**élémentaire planaire** d'Hybelior. Sert de pattern pour toutes les créatures **élémentaires / cosmiques / planaires** : Élémentaire d'eau, Élémentaire de terre, Élémentaire d'air, Spectre temporel, Avatar de Vortex, etc. Deuxième archétype du sprint pilote bestiaire — il établit le **pattern exotique** complémentaire au [[Loup forestier]] (créature classique).
>
> Voir [[Bestiaire - Index]] · [[Taxonomie des Créatures]] · [[Combat]] · [[Cosmologie]] · [[Le Lien]]

---

## 1. Vue d'ensemble

### Description sensorielle

L'Élémentaire de feu n'a pas de forme fixe. Une silhouette **humanoïde-amorphe** se dessine dans une masse de flammes en lévitation à 1.5-3 m du sol, hauteur variable selon le tier (un Petit fait 1 m, un Avatar fait 6 m). Au cœur : un **noyau cristallin** orange-rouge battant comme un cœur, visible à travers les flammes, **point faible canonique**. Des **fragments de roche fondue** orbitent autour de la créature, projetés ou rappelés à volonté.

**Signature audio** : crépitement permanent + grondement sourd + sifflement aigu en attaque. **Signature thermique** : zone de chaleur perceptible à 15 m (le joueur voit la déformation de l'air, les feuilles s'enflamment au passage). **Lumière** : la créature **éclaire son environnement** (rayon 20 m, utile pour le joueur en caverne, dangereux car détectable de loin).

### Place écologique et culturelle

L'Élémentaire de feu n'est **pas indigène** au monde matériel d'Hybelior. C'est une **manifestation planaire** issue des Voies de Feu, de l'Éveil d'Eldoria endormie ou des éruptions de Mont Cendra. Il apparaît :
- Naturellement en **zones magmatiques** et près des **volcans actifs**
- Pendant l'**Ère du Feu Endormi** (cf. [[Les Ères]] §Feu Endormi)
- Au **Grand Rituel de Réveil de Cendara** (lore canonique — [[Cosmologie]] §Eldoria)
- Lors d'**incantations ratées** de la Voie de Feu (effet secondaire — voir [[Le Lien]])

**Folklore** :
- *Cendara* → Manifestation des **rêves d'Eldoria endormie**, vénérée par les Forgerons du Feu
- *Galenor (Seraphia)* → Esprit de Calor (Céleste du feu sacré), honoré au Festival des Lumières
- *Ilthara (Pyrtara)* → Présage d'éruption, fuie
- *Alkaran (Myrtam)* → Forge légendaire — un alliage trempé dans son cœur devient Acier Éternel
- *Mosrack (Onara)* → Ressource industrielle convoitée (cristaux fondus pour machines de guerre)

**Importance gameplay** :
- **Première rencontre élémentaire/cosmique** typique d'un joueur Adepte-Expert
- Sert de **mentor de combat magique** (immunité feu force le joueur à diversifier, vulnérabilité eau invite à utiliser environnement / Voie d'Aquor)
- **Boss de zone volcanique** récurrent — calibrage CR 7-22 selon tier
- Loot **rare et puissant** (Cœur de Flamme, Essence spirituelle, Cristaux fondus) — débloque artisanat haut tier (Acier Éternel, alchimie de feu, recettes Magistrales)
- **Source d'ouverture planaire** : invoquer un Élémentaire est un acte de Voie risqué qui peut **fissurer le voile** (lien narratif avec Navigor disparu)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie & Physiologie

**Amorphe** par nature — pas de squelette, pas d'organes au sens biologique. Le corps est une **masse de plasma magique** entretenue par le **noyau cristallin** central. Taille **Variable** (Étincelle 30 cm → Avatar 6 m). Revêtement **Cristaux** (le noyau + les fragments orbitaux). Sens : **Vision 360°** (la créature "voit" par ondes thermiques dans toutes les directions, pas d'angle mort), **Détection thermique** (sensibilité aux sources de chaleur et de froid à 50 m), **Vision diurne** standard. **Pas d'audition fine** (l'air chaud déforme les sons), **pas d'odorat**.

> [!note] Conséquence gameplay
> Pas de furtivité possible **par les flancs/dos** (Vision 360°), mais possible **derrière un mur d'eau / source de froid** qui aveugle sa détection thermique. Inversion intéressante du pattern Loup.

### Axe 2 — Comportement & Cognition

**Instinctif** : Behavior Tree simple, réactions stéréotypées. L'Élémentaire **ne se souvient pas** du joueur d'un combat à l'autre (contrairement au Loup Apprenant). Il **ne planifie pas**, il **réagit** : menace détectée → projection de flamme → si proche → aura → si HP bas → explosion. Cette simplicité cognitive est **canonique** pour les élémentaires — c'est ce qui les rend lisibles et différents des créatures sociales.

**Socialité Solitaire** (un seul élémentaire par zone d'apparition typiquement, sauf événement d'ère). **Territorialité Nomade planaire** : il n'a pas de territoire fixe, il **suit les flux d'énergie** (failles magmatiques, rituels de Voie de Feu, sources de chaleur intense). **Communication** : signaux lumineux (intensité de la flamme), sons (crépitement plus fort = menace), **pas de télépathie**, **pas d'ondes oniriques** (sauf variant Onirique).

### Axe 3 — Habitat & Mobilité

Milieux : **Zones magmatiques, Volcanique, Planar (astral, éthéré), Caverne profonde** (proximité noyau planétaire). **Évite** : Eau (douce ou océan), Toundra/Désert de glace, Forêts humides (sauf en feu). **Locomotion : Lévitation principale** (3-8 m/s, agile), **Marche** secondaire (forme humanoïde basse, plus lente). **Pas de vol battu** (il flotte, ne vole pas activement). **Aire d'influence Instable** : apparitions sporadiques, peut disparaître si la source d'énergie tarit, peut **se replier sur le plan astral** si gravement blessé (mécanique de fuite planaire — voir §8).

### Axe 4 — Cycle de vie & Reproduction

**Bourgeonnement** : un Élémentaire suffisamment grand peut **émettre une Étincelle** (mini-élémentaire CR 1) qui dérive et grandit en absorbant de la chaleur. Pas de reproduction sexuée. **Métamorphose Multi-stades** :

| Stade | Taille | CR | Apparence |
|-------|--------|-----|-----------|
| **Étincelle** | 30 cm | 1 | Boule de feu errante |
| **Petit** | 80 cm | 3 | Forme indistincte, lévitation basse |
| **Standard** | 1.8 m | 7 | Humanoïde-amorphe, noyau visible |
| **Grand** | 3.5 m | 14 | Stable, deux noyaux satellites |
| **Avatar** | 6 m | 22 | Forme stable, halo de cristaux orbitaux, conscience émergente |

**Durée de vie Éphémère** par défaut (heures à jours en monde matériel — il se dissipe sans source d'énergie), mais **Immortelle** sur le plan astral (où il "dort" jusqu'à appel). Distinction importante : **dans le jeu**, le joueur affronte une **incarnation**, pas l'entité totale.

### Axe 5 — Écologie & Régime alimentaire

**Détritivore énergétique** : se nourrit de **chaleur, de magie de Feu, de combustibles** (forêts en feu, rituels, foyers). Ne mange pas de chair, ne boit pas. **Méthode de chasse : Absorption d'énergie** (passive sur sources environnementales) + **prédation magique** sur Liés de Feu (extrêmement rare). Il **n'a pas de proies au sens classique** — d'où sa fonction écologique d'**Équilibreur** (régule l'excès de chaleur planétaire, redistribue l'énergie magique de Feu).

> [!note] Conséquence gameplay
> Combattre un Élémentaire **dans une forêt à l'aube après pluie** est plus facile (pas de combustible). Combattre **près d'un foyer / volcan / brasier** lui donne **régen +5 HP/s** (voir §5).

### Axe 6 — Rôle & Relations

**Équilibreur** (rôle écologique distinct du Prédateur intermédiaire du Loup). Pas vraiment "menace écologique" pour la faune — il dérange par sa chaleur, brûle l'environnement, mais ne chasse pas activement. **Alliances : Pacte magique possible** (un Lié de la Voie de Feu peut **invoquer** ou **pacter** avec un Élémentaire — voir [[Le Lien]] §Voie de Feu). **Partenariat planaire possible** avec d'autres créatures de feu (salamandres géantes, phénix de Cendara). **Menacé** par : Liés d'Aquor (eau), Liés de Glacius (froid profond), **Rituels d'extermination** des Forgerons du Feu (contrôle de population), gel de la source d'énergie.

### Axe 7 — Capacités & Affinités

**Élément : Feu** (canonique). **Pouvoirs** : Aura brûlante (passive zone), Projection de flamme (à distance), Régénération thermique (près de chaleur), Immunité feu, Vulnérabilité eau/froid (×2 dmg subis), Explosion à la mort (mécanique de fin de combat — voir §5). **Résistances** : Feu (immunité totale), Anti-énergie partielle (résiste 30% aux Voies pures Aurion/Aetheron), Physique normal partiel (50% dégâts subis sur dégâts non-magiques — l'épée frappe le plasma, peu d'effet sans enchant). **Vulnérabilité** : Eau (×2), Froid (×2), Voie d'Aquor (×3 sur compétences), Voie de Glacius (×3).

> [!important] Pattern de combat
> L'Élémentaire **inverse** le pattern Loup : ce dernier est vulnérable au feu/magie, le Feu est vulnérable à l'eau/froid. **Pédagogie de design** : enseigner au joueur la **diversification** des outils.

### Axe 8 — Statistiques de jeu

Voir §3 (table CR détaillée). HP base 220 (CR 7 Standard). **Stamina réduite** (la créature est rapide à dépenser, lente à régénérer hors source de chaleur). **Mana propre** (formes de "souffle de feu" magique). Vitesse pointe ~7 m/s (lévitation, plus lent que joueur sprint mais plus mobile en 3D).

### Axe 9 — Récompenses & Interactions

**Loot** : 7 ressources principales, dont 3 **uniques aux créatures cosmiques/élémentaires** (§6). **XP accordée** ×1.5 vs créature physique de même CR (récompense la difficulté magique). **Événements** : *Apparition d'ère* (Feu Endormi), *Quête de Forge Légendaire* (récolter Cœur pour Acier Éternel), *Fissure planaire* (déclencheur de scénario Navigor — Phase 4), *Pacte de Feu* (Lié peut négocier au lieu de combattre — Phase 4).

---

## 3. Stats de combat par CR (table chiffrée)

> Convention CR canonique posée dans [[Loup forestier]] §3 : **échelle Hybelior 1-30**. Voir §10 pour rappel.

### Table de variantes par stade — Élémentaire de feu

| Stade | CR | HP | Stamina | Mana | Vitesse | Dégâts coup type | Dégâts AoE aura | Comportement |
|-------|----|----|---------|------|---------|------------------|-----------------|--------------|
| **Étincelle** | **1** | 35 | 30 | 20 | 5 m/s | 4-6 (feu) | 1 dmg/s rayon 1.5 m | Erre, fuite si attaquée 2 fois |
| **Petit** | **3** | 110 | 80 | 60 | 6 m/s | 10-14 | 2 dmg/s rayon 2 m | Réactif, projection simple |
| **Standard** | **7** | 220 | 140 | 140 | 7 m/s | 22-32 | 4 dmg/s rayon 3 m | Pattern complet, change de forme |
| **Grand** | **14** | 480 | 220 | 280 | 7 m/s | 38-54 | 7 dmg/s rayon 4 m | Phases multiples, deux noyaux orbitaux |
| **Avatar** | **22** | 950 | 380 | 600 | 6 m/s | 65-90 | 12 dmg/s rayon 6 m | Boss de phase, conscience émergente, parle |

> **Calibrage Standard CR 7** : 220 HP face à un joueur Adepte (~300 HP, ~30 dmg/coup léger non-enchant, ~50 dmg/coup léger enchant feu **mais inutile**, ~80 dmg coup léger enchant froid). Joueur sans bon outil tue en 15+ coups (pénible). Joueur avec arme enchant froid ou Voie d'Aquor tue en 5-6 coups (récompense de préparation). **Combat lisible 60-90 s.** Les variants cosmiques (Frost, Spectral) augmentent ou réduisent ce profil.

> **Lecture des dégâts** :
> - "Dégâts coup type" = projection de flamme à distance OU coup de bras enflammé corps-à-corps
> - "Dégâts AoE aura" = drain passif sur joueur dans le rayon (pas de telegraph, mécanique d'**arène**)
> - Multiplier × 1.5 pour Projection de flamme chargée (telegraph 1.2 s)
> - Multiplier × 0.5 pour le **noyau exposé** (point faible — voir §5)

### Régen et endurance de la créature

| Stat | Hors zone chaude | En zone chaude (volcan, brasier, braise) |
|------|------------------|------------------------------------------|
| HP | 0 (base) | **+5/s** (régen thermique) |
| Stamina | +12/s | +20/s |
| Mana | +4/s | +10/s |

**Mécanique de phase** (Standard CR 7+) : à **50% HP**, l'Élémentaire **éjecte ses cristaux orbitaux** au sol (zone de feu), expose son noyau **3 secondes** (×1.5 dmg subis pendant la fenêtre — **fenêtre punition canonique**). À **20% HP**, il prépare l'**Explosion à la mort**.

---

## 4. Attaques canoniques

| Attaque | Type | Coût Mana (élémentaire) | Cooldown | Effet | Telegraph |
|---------|------|--------------------------|----------|-------|-----------|
| **Coup de bras enflammé** | Contondant + Feu | 8 | 1.5 s | Dégât base, **Brûlure** (2 dmg/s 4 s) | Bras se forme (0.4 s) |
| **Projection de flamme** | Magique Feu (distance 15 m) | 25 | 4 s | Dégât base ×1.0, Brûlure stack 2 | Recul + boule de feu visible (0.7 s) |
| **Projection de flamme chargée** | Magique Feu (distance 25 m) | 60 | 12 s | Dégât ×1.5, AoE explosion 3 m, Brûlure stack 3 | Charge longue (1.2 s — **fenêtre interrupt**) |
| **Aura brûlante** *(toujours active)* | Feu (passive zone) | drain 2/s | toggle | Dégâts AoE rayon 3 m (Standard) | Visible (halo rouge) |
| **Vague d'éruption** *(Standard CR 7+)* | AoE Feu | 90 | 25 s | Onde 360°, dégât ×1.2 base, knockback 4 m | Compression visuelle (1.0 s) |
| **Cristaux orbitaux** *(Grand CR 14+)* | Magique Feu (3 projectiles) | 70 | 18 s | 3 cristaux trackant cible 5 s, dmg 0.4× chacun (cumul 1.2×) | Cristaux s'élèvent (0.8 s) |
| **Explosion à la mort** *(toujours)* | AoE Feu massif | gratuit | déclenché à 0 HP | **Dégât = HP max × 0.4** rayon 5 m, fenêtre fuite 1.5 s | Crépitement aigu (1.5 s — **fuite obligatoire**) |
| **Replier sur l'astral** *(Avatar uniquement)* | Fuite planaire | 200 | une fois par combat | Disparaît, réapparaît 8 s plus tard à 30% HP, perd toutes les cristaux orbitaux | Halo translucide (1.5 s) |

**Pattern d'attaque IA standard** : Aura active → Projection à distance pour ouvrir → si joueur s'approche → Coup de bras → si joueur recule → Projection chargée → cycle. Au **passage 50% HP** : Vague d'éruption + éjection cristaux + fenêtre noyau exposé. Au **20% HP** : Cristaux orbitaux en boucle + préparation explosion. À **0 HP** : Explosion à la mort.

**Fenêtre interrupt** : la **Projection chargée** (1.2 s telegraph) est interruptible par dégâts froids/eau ou par compétence d'interruption (Guard break, certaines compétences d'arme).

---

## 5. Pouvoirs spécifiques de l'Élémentaire de feu

| Pouvoir | Description | Activation |
|---------|-------------|------------|
| **Aura brûlante** | Voir §4. Dégâts passifs zone. Le joueur **doit gérer la distance** ou utiliser un bouclier de Voie d'Aquor. | Passive (toggle) |
| **Projection de flamme** | Voir §4. Standard à distance. | Actif |
| **Régénération thermique** | +5 HP/s en zone chaude (voir §3). Si l'élémentaire reste **3 s sans bouger** dans une braise, +10 HP/s. | Passive conditionnelle |
| **Immunité feu** | Dégâts Feu = 0. Voie de Feu = 0. Brûlure = 0. **Soins par feu** au lieu de dégâts pour les sorts soin-feu (rare). | Passive |
| **Vulnérabilité eau/froid** | Dégâts Eau ×2, Dégâts Froid ×2, Voie d'Aquor ×3, Voie de Glacius ×3. **Ralenti** 30% pendant 3 s sur dégât froid. | Passive |
| **Explosion à la mort** | Voir §4. **Mécanique d'arène canonique** : la mort de l'élémentaire **danger encore 1.5 s**. | Passive (déclenchée) |
| **Noyau exposé** | À **50% HP** (et toutes les 50% HP des élémentaires Grand+), le noyau cristallin s'expose 3 s : **×1.5 dmg subis**, **point faible visible**. Le joueur qui frappe le noyau au moment exact gagne **bonus dmg ×2**. **Fenêtre punition canonique** des élémentaires. | Passive (déclenchée) |
| **Replier sur l'astral** | Avatar uniquement. Voir §4. Mécanique de **deuxième vie**. | Actif (une fois) |

> [!important] Pédagogie de design
> Cet archétype enseigne au joueur : (1) **diversifier les dégâts** (pas tout sur le feu), (2) **gérer la distance** (aura), (3) **lire les phases** (noyau exposé), (4) **anticiper la mort** (explosion). C'est un **boss tutoriel cosmique** par excellence.

---

## 6. Loot table — Récolte sur créature

> Voir [[Sources de Ressources]] §Récolte sur créature pour les 25 ressources canoniques. L'Élémentaire de feu **brise le pattern mammifère** — pas de Cuir, pas d'Os, pas de Fourrure. Les ressources sont **magiques/cristallines/spirituelles**.

| Ressource | Drop rate (Standard CR 7) | Modificateur tier | Métier requis | Palier Maîtrise minimum |
|-----------|----------------------------|-------------------|---------------|-------------------------|
| **Essence spirituelle** | 60% (1) — **100% Grand**, **100% Avatar** | Tier ×2 par stade | Dépéceur + Apothicaire | Adepte (palier 3) |
| **Cœur de creature** *(Cœur de Flamme)* | 25% Standard (1) — **70% Grand**, **100% Avatar (2)** | Tier alchimique +2 par stade ; **composant Magistral à partir de Grand** | Dépéceur + Alchimiste | Expert (palier 4) |
| **Cristaux fondus** | 90% (2-5 unités) — **× 3 Grand**, **× 5 Avatar** | Tier de joaillerie/forge ; intrant *Acier Éternel* | Dépéceur + Forgeron | Initié (palier 2) |
| **Cendres incandescentes** *(Poudre)* | 100% (3-8 unités) | Quantité × 2 par stade | Dépéceur + Alchimiste | Initié |
| **Sang** *(Plasma magique)* | 40% (1-2 fioles) | Composant alchimique haut tier (intrant Émulsion) | Dépéceur + Apothicaire | Adepte |
| **Larme** *(Larme de feu — composant rare)* | 8% Standard — **20% Grand**, **40% Avatar** | Composant *Mythique* (intrant pour items de Voie de Feu) | Dépéceur + Alchimiste | Maître (palier 5) |
| **Sécrétion** *(Résidu de noyau)* | 30% (1) | Glande énergétique, alchimie de feu | Dépéceur + Apothicaire | Adepte |

> [!warning] Spécificité élémentaire
> **Pas de Cuir, Os, Fourrure, Plume, Carapace** : ces ressources **n'existent pas** chez un élémentaire (pas de squelette, pas de peau biologique). Ce **pattern d'absence** est canonique pour tous les élémentaires/créatures cosmiques amorphes.
>
> Le Cœur (Cœur de Flamme) sert d'**intrant Magistral pour Acier Éternel** ([[Géographie]] §Myrtam — légende canonique). Voir [[Sources de Ressources]] §Fabrication.

> [!tip] XP Dépeçage
> Dépecer un Élémentaire est **techniquement difficile** (la créature est en feu — il faut attendre le refroidissement, ou utiliser un outil enchant froid). XP Maîtrise *Dépeçage* élevée : +25-40 pts Standard, +60-100 pts Grand, +150 pts Avatar. **Maîtrise *Dépeçage Cosmique*** (sous-spécialité, palier 4+) requise pour ne pas perdre le Cœur.

> [!warning] CHANTIER
> Pipeline Cœur de Flamme → Acier Éternel à formaliser dans [[Sources de Ressources]] §Fabrication (recette spécifique, palier Maître Forgeron). Idem pour Larme → composant Mythique.

---

## 7. Variants cosmiques (10 variants par ère)

> [!important] Inversion du pattern
> Pour le **Loup**, les variants étaient des **affinités secondaires** sur un archétype neutre. Pour l'**Élémentaire de feu**, **le Brulé est sa nature canonique** (Eldoria endormie / Voie de Feu). Les autres 9 variants sont des **paradoxes** ou **contre-natures intéressantes**, plus rares.
>
> **Pattern canonique posé** : pour les archétypes à **élément intrinsèque**, les variants standard contre-naturent l'élément, créant des hybrides exotiques.

| Variant | Entité | Visuel | Stats | Comportement | Rareté |
|---------|--------|--------|-------|--------------|--------|
| **Brulé Élémentaire** *(forme canonique)* | Eldoria endormie / Voie de Feu | Flammes orange-rouge, noyau pulsant | Stats de référence (§3) | Pattern standard | **Forme par défaut** |
| **Frost Élémentaire** *(paradoxe)* | Climata / Aquor froid | Flammes **bleues glacées**, noyau bleu-pâle, aura **givre** au lieu de chaleur | HP +30%, vitesse −20%, dmg +**Froid** au lieu de Feu, **Régénération thermique inversée** : régen en zone froide | Inversion totale : ralentit + congèle au contact (1 s freeze sur Brûlure stack 3) | Très rare — Ère de Sommeil de Glace × Ère du Feu Endormi (Cardinal) |
| **Onirique Élémentaire** | Somnix | Flammes irréelles (couleurs prismatiques), sons amortis | HP −20%, dmg ×0.7, **N'attaque que les rêveurs** (joueur ayant dormi en zone Somnix dans 24h RT) | Apparaît seulement la nuit en zone onirique. **Inflige Sommeil** (joueur perd contrôle 2 s) au lieu de Brûlure | Ère du Sommeil Onirique uniquement |
| **Brisé Élémentaire** | Tempora aigu | Flammes glitchées, fragments visuels manquants | HP normal, **téléportation courte** (3 m, 6 s CD), **dégâts aléatoires** ×0.5 ou ×2 | Imprédictible, **noyau ne s'expose pas** (mécanique de phase brisée) | Ère des Échos Brisés |
| **Pourpre Élémentaire** | Aetheron / Umbra brouillard | Flammes pourpres, brume violacée | Pose **Confusion** (15% chance par projection), aura **désoriente** | Sa Vague d'éruption inflige Confusion 5 s (cible vise mal) | Ère de la Brume Mortelle, Ère du Crépuscule |
| **Vénérable Élémentaire** | Fatum / Spiritus ancien | Flammes anciennes, marques runiques sur le noyau | Apparaît directement au stade **Grand ou Avatar**, **lit les patterns joueur** (apprenant ×2 sur le combat unique) | Plus tactique, anticipe esquives. **Conditions cachées 🔒** | Ère des Présages OU rencontre conditionnelle (joueur ayant tué 50 élémentaires) |
| **Doré Élémentaire** | Celestia / Eldoria active | Flammes dorées éclatantes, halo lumineux | **Pacifié par défaut** (n'attaque que si attaqué), **soigne** les alliés au lieu de brûler les ennemis | **Compagnon possible** (Phase 4 — pacte avec Voie d'Eldoria, Accord >75%). Soigne 5 HP/s zone alliée | Ère du Rêve Lumineux uniquement |
| **Verdoyant Élémentaire** *(paradoxe)* | Spiritus + Terranu | Flammes vertes, lierres carbonisés flottants | HP +20%, dmg réduit, **fait pousser des plantes brûlées** au passage (zones empoisonnées) | Moins agressif, mais **empoisonne** la zone (lierres venimeux) — DOT 3 dmg/s 10 s zone | Ère du Verdoiement (rare — paradoxe) |
| **Spectral Élémentaire** | Tempora | Flammes translucides, échos | −40% HP, **immunité physique partielle** (50% dmg subis), **disparition 2 s** | Apparition/disparition imprévisible, frappe puis fuite | Ère des Échos Brisés (variante de Brisé) |
| **Shadow Élémentaire** *(paradoxe)* | Noctis | Flammes **noires** (anti-feu), aura sombre | dmg **+Ombre au lieu de Feu**, drain HP au lieu de brûler (vampirisme), **lumière inversée** : assombrit au lieu d'éclairer | Très tactique, vise les zones sombres pour amplifier dégâts. **Fuit la lumière de Lumos/Doré** | Ère de l'Ombre Longue (paradoxe — feu noir) |

> [!note] Pattern de distribution canonique pour archétypes à élément intrinsèque
> - **Forme par défaut** = élément canonique (ici Brulé). Toujours présent.
> - **Variants paradoxes** (Frost, Shadow, Verdoyant) : extrêmement rares, conditions cumulées (ères Cardinal ou rituel)
> - **Variants compatibles** (Vénérable, Pourpre, Brisé) : Ères normales correspondantes
> - **Variants incompatibles** (Doré, Onirique) : conditions strictes (Ère + Accord)

> [!warning] CHANTIER
> Les **variants paradoxes** (Frost, Shadow, Verdoyant) demandent une **réflexion d'équilibrage** : un Frost Élémentaire est-il un *vrai* Élémentaire de feu (dans la lignée taxonomique) ou un *autre* archétype (Élémentaire de glace) ? **Convention proposée** : c'est le **même squelette de comportement et loot** (Cœur de Glace remplace Cœur de Flamme dans la table de loot), mais l'élément primaire change. À valider.

---

## 8. Comportement IA

> ⚠️ Modèle d'IA global non tranché (cf. [[Concepts Fondamentaux IA PNJ]] §1). On pose des **comportements descriptifs**.

### Pattern d'apparition

L'Élémentaire **n'erre pas** comme une créature classique. Il **apparaît** :

| Déclencheur | Probabilité |
|-------------|-------------|
| Joueur entre en zone volcanique active | 60% (CR scaling à la zone) |
| Rituel de Voie de Feu raté | 40% (CR scaling au tier de sort) |
| Pendant Ère du Feu Endormi en n'importe quel biome chaud | 25% / hour de jeu |
| Cœur de Cendra pulse (lore canonique [[Cosmologie]] §Eldoria) | scénario scripté |
| Joueur invoque délibérément (Voie de Feu palier 4+) | 100% mais coût lourd |

### Routine de combat (Standard CR 7)

```
[Apparition]
   ↓
[Aura active ON] (toujours)
   ↓
[Détection joueur — Vision 360° + thermique 50 m]
   ↓
[Phase 1 — 100% à 50% HP]
   ├─ Si distance > 8 m : Projection de flamme
   ├─ Si distance < 4 m : Coup de bras enflammé + recul
   ├─ Toutes 12-15 s : Projection chargée (telegraph 1.2 s — fenêtre interrupt)
   └─ Aura passive permanente
   ↓
[Transition 50% HP — Vague d'éruption + éjection cristaux + Noyau exposé 3 s]
   ↓
[Phase 2 — 50% à 20% HP]
   ├─ Cristaux orbitaux (Grand+ uniquement)
   ├─ Projection chargée plus fréquente (CD 8 s au lieu de 12)
   └─ Vague d'éruption CD 18 s au lieu de 25
   ↓
[Transition 20% HP — préparation Explosion à la mort]
   ├─ Élémentaire ralentit, flammes intensifient
   ├─ Cristaux orbitaux en boucle continue
   └─ Si Avatar : Replier sur l'astral (fuite 8 s, retour 30%)
   ↓
[0 HP] → Explosion à la mort (1.5 s telegraph, fuite obligatoire)
```

### Décisions clés (différences vs Loup)

- **Pas de meute, pas de hiérarchie** (solitaire)
- **Pas de mémoire** entre combats (Instinctif — chaque rencontre est neuve)
- **Pas de fuite tactique** sauf Avatar (Replier sur astral)
- **Pas de poursuite hors zone d'apparition** : l'Élémentaire **se dissout** s'il s'éloigne de sa source d'énergie >100 m, perd 5 HP/s — **mécanique de fuite joueur viable**
- **Pas de jour/nuit** : actif H24 quand invoqué/spawn
- **Sensible à l'Ère** : pendant Ère du Feu Endormi → +30% HP, +20% dmg, plus fréquent (cf. [[Les Ères]])

### Variants comportementaux par stade

- **Étincelle** : **fuit** si attaquée 2 fois, ne fait rien d'agressif (faune environnementale)
- **Petit/Standard** : pattern complet
- **Grand** : **2 noyaux orbitaux** = double point faible, double frappe possible
- **Avatar** : **conscience émergente — il parle** (lignes scriptées par scénario, lien narratif avec Cosmologie). Peut **proposer un pacte** au joueur Lié de Feu palier 4+ au lieu de combattre (Phase 4 — quête de Voie de Feu)

> [!note] Branche [[Comportements PNJ - Index]]
> Pattern canonique pour créatures **Instinctives Solitaires Planaires** posé ici. Autres archétypes hériteront : Élémentaires d'eau/terre/air, Spectres temporels, Avatars de Voie.

---

## 9. Exemples de signatures (PHASE 4 stub)

### La Cendre Vivante du Mont Cendra
- **Localisation** : sommet du **Mont Cendra**, île **Cendara**
- **CR** : 22 (Avatar) — **Boss continental signature**
- **Variante** : Avatar Brulé Élémentaire, conscience pleinement émergente
- **Lore** : *« La Cendre est née de la première éruption. Elle est l'éclat de cœur d'Eldoria endormie. Elle ne dort jamais. Elle parle aux Forgerons du Feu en rêve. Elle attend le Grand Rituel de Réveil — ou le coup qui la délivrera de l'attente. »*
- **Bonus narratif** : Loot unique **Cœur de la Cendre Vivante** (intrant pour **Acier Éternel** Magistral, et seul intrant possible pour la lame légendaire *Souvenir d'Eldoria*). Quête signature *Le Réveil Avorté* (résolution Ignis Aeternum / Cendara). Compagnon possible si pacte (Voie de Feu Maître + Accord 90% Eldoria).

### L'Errant des Failles d'Ilthara (Pyrtara)
- **Localisation** : Failles volcaniques des **Marécages de Noyrath**, Ilthara
- **CR** : 14 (Grand)
- **Variante** : Grand Pourpre Élémentaire (paradoxe brume + feu)
- **Lore** : *« L'Errant ne s'éteint jamais — la brume de Noyrath le nourrit comme un combustible étrange. Les Druides de Pyrtara disent qu'il porte une malédiction de Crépuscule. Il erre en cercle, comme s'il cherchait quelque chose qu'il a perdu il y a mille ans. »*
- **Bonus narratif** : Loot **Larme Pourpre** (composant Mythique pour potion *Confusion Réversible*). Déclenche événement *La Marche de l'Errant* (boss mondial mineur quand il atteint un certain village). Lien lore : disparition de Navigor.

### Le Forgeron-Cœur de Myrtam (Alkaran)
- **Localisation** : profondeur des mines de **Myrtam** (Alkaran)
- **CR** : 18 (Grand renforcé)
- **Variante** : Grand Brulé Élémentaire avec Vénérable trait (apprenant ×2)
- **Lore** : *« Les mineurs de Myrtam le nourrissent depuis 500 ans. En échange, il forge — la nuit, seul, dans la salle interdite — l'Acier Éternel. Personne ne l'a vu directement. Ceux qui essaient ne reviennent pas. La forge produit, c'est tout. »*
- **Bonus narratif** : **Pas hostile par défaut**. L'attaquer = perte de l'**Acier Éternel** pour Myrtam et événement de chute économique. Le **convaincre** (Verbe + Voie de Feu + offrande) = devient PNJ-forgeron unique avec recettes Magistrales exclusives. Quête morale Phase 4.

> [!warning] CHANTIER PHASE 4
> 2-3 signatures par grand pays/biome → ~20-30 Élémentaires de feu signatures. Les Élémentaires sont **plus rares** que les loups (pattern intentionnel — ils sont **événements**, pas faune).

---

## 10. Décisions ouvertes / chantiers de profondeur

### CR system (rappel et confirmation)

> [!important] Convention CR Hybelior 1-30
> Posée dans [[Loup forestier]] §3 et confirmée ici. **5 paliers de Maîtrise × 6 = 30**. Élémentaire de feu Standard = CR 7 (palier Initié-Adepte joueur). Avatar = CR 22 (Maître). Voir §3.
>
> **Pattern de stade** : Loup utilise **âge** (juvénile → colosse), Élémentaire utilise **stade de croissance** (étincelle → avatar). Convention canonique : chaque archétype documente son **axe de variation** (âge / stade / forme), pas un mélange.

### Listes complètes de variants

- **Variants paradoxes** (Frost, Shadow, Verdoyant Élémentaire de feu) : valider que le squelette du **comportement reste celui de l'archétype d'origine** (Élémentaire de feu) avec **élément primaire modifié**, plutôt que d'être un archétype distinct (Élémentaire de glace).
- **Conditions Cardinal** : un Frost Élémentaire de feu nécessite une **Ère Cardinale** (Souffle exceptionnel mêlant deux ères). À cadrer avec [[Le Souffle]].

### Ouvertures planaires

- **Mécanique d'invocation** : un Lié de Voie de Feu palier 4+ peut invoquer un Élémentaire (CR scaling au tier). Quel est le **risque planaire** ? Proposition : 5% chance de **fissure** qui invoque un **second Élémentaire incontrôlé**, ou ouvre une faille temporaire vers le plan astral (lien Navigor disparu).
- **Pacte vs Combat** : en Phase 4, l'Avatar peut **dialoguer**. Branche sur [[PNJ]] §Dialogue (Verbe + offrande de Voie). Exception au pattern "créature combat-only".

### Notes pour les autres agents bestiaire

> Patterns posés ici, à **réutiliser** pour les autres archétypes élémentaires/cosmiques/planaires :

| Pattern | Réutilisation |
|---------|---------------|
| **Multi-stades par croissance** (Étincelle → Avatar) | Tous les élémentaires (Eau, Air, Terre), Spectres, Avatars cosmiques |
| **Mécanique Noyau exposé** (point faible, fenêtre punition) | Tous les élémentaires + boss avec point faible |
| **Aura passive zone + projection à distance + AoE éruption** | Tous les casters cosmiques |
| **Explosion à la mort** | Élémentaires explosifs (feu, air, électricité) ; remplacer par **Dispersion** (eau), **Effondrement** (terre), **Implosion** (air) |
| **Régénération conditionnelle (zone élément)** | Tous les élémentaires (eau→pluie, terre→sol, air→vent) |
| **Replier sur l'astral (Avatar uniquement)** | Tous les Avatars (deuxième vie planaire) |
| **Vulnérabilité élémentaire opposée** | Pattern eau↔feu, terre↔air, ombre↔lumière |
| **Loot magique** (Essence, Cristaux, Cendres, Cœur) | Tous les cosmiques. Mappings selon élément (eau→Cristaux fondus eau, Cœur d'Onde, Larme glacée…) |
| **Pattern d'apparition événementielle** (pas faune errante) | Tous les planaires |
| **10 variants dont 1 canonique + paradoxes rares** | Tous les archétypes à élément intrinsèque |
| **Conditions cachées** par Ère + Accord | Doré et Onirique, transposable à tous |
| **Dialogue à l'Avatar (Phase 4)** | Tous les Avatars cosmiques |

> [!note] Différence canonique vs Insectoïde Hivemind / Spectre planaire
> - **Insectoïde Hivemind** : remplacer Solitaire par Ruche/Colonie, BT individuel par BT collectif partagé, comportement par **rôle dans la ruche** (ouvrière, soldat, reine), loot par Carapace/Antenne/Sécrétion. Pattern de stade = Larve→Pupe→Adulte→Reine.
> - **Spectre planaire** : remplacer élément par **incorporel** (immunité physique 80%), pas de loot matériel sauf Essence spirituelle, comportement = hantise (zone fixée, n'attaque que les profanateurs). Pattern de stade : Écho→Spectre→Gardien→Lich.

### Chantiers de profondeur

- **Acier Éternel pipeline** : Cœur de Flamme → fondu dans forge spéciale (Myrtam, Cendara, Mosrack ?) → Acier Éternel → équipements Magistraux. À formaliser dans [[Sources de Ressources]].
- **Pacte de Feu** : système de pacte cosmique distinct, branche sur [[Le Lien]] §Voie de Feu (proposition entité — Calor Céleste).
- **Élémentaires des autres éléments** : Eau, Air, Terre, Temps, Âme, Vide, Gravité instable. Au moins **3 archétypes-référence supplémentaires** à produire en Phase 2 (proposition : Eau, Terre, Vide).
- **Salamandres géantes / Phénix** : créatures-feu **biologiques** (pas planaires) — archétype distinct (Quadrupède Apprenant + élément Feu), à créer.

---

*Liens : [[Bestiaire - Index|← Index Bestiaire]] · [[Taxonomie des Créatures]] · [[Loup forestier]] · [[Combat]] · [[Sources de Ressources]] · [[Les Ères]] · [[L'Accord]] · [[Cosmologie]] · [[Le Lien]] · [[Personnage]] · [[Architecture Data-Driven]]*
