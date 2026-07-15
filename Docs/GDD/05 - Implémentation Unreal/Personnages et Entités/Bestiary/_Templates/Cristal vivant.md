---
tags: [créature, archétype, bestiaire, fractal, cristallin, caverne, magmatique, aetheron, stellaris]
type: archetype
forme: Fractal
taille: Variable
revêtement: [Cristaux]
sens: [Vision 360°, Détection magique, Détection vibrations, Résonance harmonique]
cognition: Hivemind
socialité: Émergeante
territorialité: Fixe
milieu: [Caverne profonde, Zones magmatiques, Filons magiques, Failles de cristal, Planar (astral)]
locomotion: [Croissance, Marche fragmentée, Lévitation mineure]
aire_influence: Local
reproduction: Bourgeonnement
métamorphose: Multi-stades
durée_vie: Immortelle
trophicité: Détritivore énergétique
fonction_éco: Filtre énergétique / Cathédrale magique
pouvoirs: [Croissance fractale, Branches autonomes, Résonance sonore, Réflexion magique, Régénération cristalline, Pulsation collective]
élément: Terre
résistances: [Physique partiel, Anti-énergie, Poison total, Vulnérabilité harmonique]
cr: 6-18
hp_base: 320
loot_table: [Cristaux fondus, Essence spirituelle (cristal), Cœur de creature (nœud fractal), Sécrétion (poudre cristalline)]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [croissance-fractale-mécanique, branches-autonomes-IA, harmonique-vulnérabilité]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Cosmiques/Fractals/_Description|Cosmiques/Fractals]] pour les espèces concrètes décomposées de cet archétype.

# 💎 Cristal vivant — Archétype-référence

> Archétype canonique de la **forme V2 Fractal** (1ère implémentation). Pose le pattern **géométrie évolutive** : la créature **change de forme selon sa taille** (croissance fractale — plus elle grandit, plus elle a de branches autonomes). Cognition **Hivemind interne** (les branches partagent un esprit collectif). Pattern complémentaire à [[Tisseur du Vide]] (fractal mobile/hostile/Vide), ici **fractal sédentaire/ancien/Terre**.
>
> Voir [[Bestiary/Index]] · [[Taxonomie des Créatures]] · [[Tisseur du Vide]] · [[Élémentaire de feu]]

---

## 1. Vue d'ensemble

### Description sensorielle

Le Cristal vivant est une **structure cristalline ramifiée** émergeant du sol ou d'une paroi. Au repos : ressemble à une formation minérale ordinaire (signature canonique = il **résonne** quand frappé près, alors qu'un cristal mort sonne à plat). Activé : **pulse de lumière** au cœur de chaque branche, **excroissances mobiles**, **fragments orbitent** autour des grosses branches.

**Pattern fractal canonique** : la forme se complexifie selon le stade.
- Stade 1 (Bourgeon) : 1 cristal central, 30 cm
- Stade 2 (Pousse) : cristal central + 3-5 branches secondaires, 1.5 m
- Stade 3 (Cathédrale) : cristal central + 12-20 branches, **chaque branche a ses sous-branches** autonomes, 3-5 m diamètre
- Stade 4 (Ancienne) : 50-200 branches imbriquées, fractale visible à toutes échelles, **cathédrale** de 8-15 m

Sons : **résonance harmonique permanente** (variations subtiles selon humeur ; signature audio canonique). **Lumière** : éclaire 5-30 m selon stade (utile pour joueur en caverne, dangereux car détectable). **Aucune odeur**.

### Place écologique et culturelle

**Filtre énergétique / Cathédrale magique**. Le Cristal vivant **filtre** les flux magiques d'une zone (capte fuites de Voies, redistribue lentement). Présence stable = signe de **filons magiques actifs**. Souvent **point de pélerinage** pour Liés à Aetheron. Affinité **Aetheron** (énergie pure) et **Stellaris** (astral mineur — proposition canonique à valider).

**Folklore** :
- *Alkaran (Myrtam)* → "**Cathédrales de Pierre Vivante**", protégées par Mineurs-Liés ; source d'Acier Magistral
- *Skaldoria* → "**Cœurs de Givre**" (variant Frost) — sanctuaires de Climata
- *Galenor (Trinoria)* → "**Forêts Cristallines**", interdites de récolte sauf rituel
- *Cestra* → "**Voix de Pierre**", chante avant les Souffles d'ère
- *Endora (Esperia)* → "**Glyphes Cristallins**", base des cités perdues

**Importance gameplay** :
- **Première rencontre Fractal** typique d'un joueur Adepte
- Pédagogie : enseigne la **résonance harmonique** (vulnérabilité par fréquence — Voie de Verbe, instruments)
- **Boss régional** Stade 3-4 (Cathédrale, Ancienne)
- Loot **rare et puissant** (Cristaux fondus, nœud fractal pour joaillerie/forge magistrale)
- **Source de paliers Voie d'Aetheron** (méditation devant un Cristal vivant Pacifié donne XP Voie)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie & Physiologie

**Fractal** par essence : structure ramifiée auto-similaire à toutes les échelles. Taille **Variable** (Bourgeon 30 cm → Ancienne 8-15 m). Revêtement **Cristaux** (cristallisation organique semi-vivante — pas du minéral pur, pas du vivant pur). Sens : **Vision 360°** (chaque branche "voit" indépendamment, pas d'angle mort), **Détection magique** (50-200 m selon stade), **Détection vibrations** (sols + air, signature de pas), **Résonance harmonique** (capte et émet fréquences — base de communication interne et de sa vulnérabilité).

> [!important] Géométrie évolutive (canonique Fractal)
> **Règle Fractal Hybelior** : la forme physique de la créature **se complexifie avec la taille**. Pas de transformation à volonté (≠ Polymorphe) — la complexification est **lente, irréversible** (ou très lentement réversible par destruction de branches).
>
> Conséquence gameplay : le **stade visible** = indicateur fiable du CR. Pas de surprise de difficulté.

### Axe 2 — Comportement & Cognition

**Hivemind interne** : les branches partagent un esprit collectif (cognition émergente). Une branche tranchée **conserve son intelligence quelques minutes** (peut continuer à attaquer en autonomie). **Socialité Émergeante** : un Cristal vivant Stade 3+ **est un essaim à lui seul**. **Territorialité Fixe** (lié à son point d'ancrage). **Communication** : Résonance harmonique (entre branches et avec autres Cristaux à distance — réseau régional possible), **pas de voix**, **pas de télépathie joueur** (sauf variant Vénérable).

### Axe 3 — Habitat & Mobilité

Milieux : **Caverne profonde, Zones magmatiques, Filons magiques, Failles de cristal, Planar (astral)**. Évite : zones d'eau libre, surface intensément lumineuse. **Locomotion : Croissance** (le Cristal "se déplace" en croissant dans une direction et en se résorbant de l'autre — 0.3 m/jour standard, 5 m/jour en zone magique très dense), **Marche fragmentée** (Stade 3+ : peut détacher des branches mobiles qui marchent sur 4-6 piliers cristallins ; vitesse 4 m/s), **Lévitation mineure** (fragments orbitaux). **Aire d'influence Local** (< 500 m).

### Axe 4 — Cycle de vie & Reproduction

**Bourgeonnement** : un Cristal Stade 3+ peut **émettre un Bourgeon** (Stade 1 mini) qui se détache et dérive vers une autre source magique pour s'enraciner et croître. **Métamorphose Multi-stades** :

| Stade | Taille | CR | Apparence |
|-------|--------|-----|-----------|
| **Bourgeon** | 30 cm | 1 | 1 cristal pulsant |
| **Pousse** | 1.5 m | 6 | Cristal + 3-5 branches |
| **Cathédrale** | 4 m | 12 | 12-20 branches, sous-branches autonomes |
| **Ancienne** | 10 m | 18 | 50+ branches, fractale complète |

**Durée de vie Immortelle** sur le plan astral et longue en matériel (millénaires). Le Cristal **ne meurt pas** par vieillesse — uniquement par destruction physique ou tarissement de filon magique.

### Axe 5 — Écologie & Régime alimentaire

**Détritivore énergétique** : se nourrit de **flux magiques fuités** (Voies ratées, résidus arcaniques, Souffles d'ère). Ne mange pas de matière. **Méthode** : **Filtration** passive (capte énergie ambiante), **Absorption d'énergie** active sur joueur Lié (peut **drainer** Mana / Essence joueur en combat — voir §5).

### Axe 6 — Rôle & Relations

**Filtre énergétique / Cathédrale magique**. **Alliances : Pacte magique** (Liés à Aetheron, Mineurs-Liés de Myrtam). **Partenariat planaire** avec esprits cristallins. **Menacé** par : profanateurs (récolte non-rituelle), Voie de Vortex (corrosion magique), Voie de Vide (annihile structure fractale), guerres de Mineurs.

### Axe 7 — Capacités & Affinités

**Élément : Terre** (matrice cristalline) avec affinité Aetheron (énergie). **Pouvoirs** : Croissance fractale (passive), Branches autonomes (chaque branche peut attaquer indépendamment), Résonance sonore (AoE harmonique), Réflexion magique (renvoie 30% des sorts subis), Régénération cristalline (régen lente passive en zone magique), Pulsation collective (synchronisation des branches → boost coordonné). **Résistances** : Physique partiel (50% sur Pousse, 70% sur Cathédrale, 80% sur Ancienne — la fractale absorbe l'impact), **Anti-énergie**, **Poison total** (immunité), **Vulnérabilité harmonique** (×2.5 sur dégâts sonores ciblés à la fréquence-faille — voir §5).

### Axe 8 — Statistiques de jeu

Voir §3. HP base 320 (CR 9 standard Pousse-Cathédrale juvénile). HP **distribué entre branches** : pas une jauge unique, mais une **somme de jauges** (canonique Fractal). Pas de Stamina, **Mana / Énergie** (jauge collective).

### Axe 9 — Récompenses & Interactions

**Loot** rare-magique (§6). **XP accordée** ×1.5 vs créature physique de même CR. **Événements** : *Récolte rituelle de Cristaux* (Voie d'Aetheron + offrande), *Méditation devant Cristal* (XP Voie d'Aetheron), *Profanation* (combat forcé, malédiction régionale), *Filon découvert* (zone à protéger / exploiter Phase 4).

---

## 3. Stats de combat par CR

### Table de variantes par stade — Cristal vivant

| Stade | CR | HP total | Mana | Branches | Vitesse fragment | Dégâts type | Comportement |
|-------|----|----------|------|----------|------------------|-------------|--------------|
| **Bourgeon** | **1** | 50 | 30 | 1 (le cristal) | 0 (immobile) | 4-6 (résonance) | Pulse, attaque rare, principalement décoratif |
| **Pousse** | **6** | 200 | 120 | 3-5 | 4 m/s (fragment) | 20-28 | Branches secondaires attaquent, cristal central immobile |
| **Cathédrale** | **12** | 480 | 280 | 12-20 | 5 m/s | 38-54 | Phases multiples, sous-branches autonomes, AoE résonance |
| **Ancienne** | **18** | 880 | 500 | 50+ | 5 m/s (fragments) | 60-85 | Boss de zone, **réseau** (autres Cristaux locaux peuvent réagir) |

> **Calibrage Cathédrale CR 12** : 480 HP **distribués** (cristal central 200 HP + 12 branches × 20-25 HP). **Détruire les branches en cascade** est la méthode standard ; détruire le cristal central seul = victoire rapide mais difficile (caché derrière les branches).

### Régen et endurance

| Stat | Hors zone magique | En zone magique | En filon actif |
|------|-------------------|------------------|------------------|
| HP central | 0 | +2 HP/s | +6 HP/s |
| HP branches | 0 | 0 | repousse 1 branche / 30 s |
| Mana | +3/s | +8/s | +15/s |

**Mécanique de phase** : à **50% HP central**, le Cristal **active Pulsation collective** (synchronise ses branches restantes — +30% dmg coordonné 10 s). À **20% HP central**, peut **détacher la branche-cœur** (mini-boss mobile qui combat 30 s avant de chercher à fuir/se replanter).

---

## 4. Attaques canoniques

| Attaque | Type | Coût Mana | Cooldown | Effet | Telegraph |
|---------|------|------------|----------|-------|-----------|
| **Pulsation lumineuse** | Magique Terre / Énergie (zone) | 8 | 2 s | Dégât base sur joueur en ligne de vue | Halo de branche (0.5 s) |
| **Branche fragment** *(branche détachée mobile)* | Contondant + Tranchant | — (HP branche) | continu | Une branche détachée attaque autonome 30-90 s | Détachement (1.0 s — interruptible) |
| **Résonance harmonique** | AoE Sonore | 30 | 8 s | Onde rayon 6 m, dmg ×0.7 base + applique **Cassure mineure** (−10% défense 4 s) | Compression sonore (0.7 s) |
| **Cristaux orbitaux** *(Cathédrale+)* | Magique 3 projectiles | 50 | 15 s | 3 cristaux trackants (similaire Élémentaire de feu) | Élévation (0.8 s) |
| **Pulsation collective** *(< 50% HP)* | Buff zone | 80 | une fois par phase | Toutes les branches +30% dmg pendant 10 s | Sync visuelle (1.2 s) |
| **Réflexion magique** *(passive)* | Réflexion | drain 4/s | toggle | Renvoie 30% des dégâts magiques subis | Halo réflectif visible |
| **Branche-cœur détachée** *(< 20% HP, Cathédrale+)* | Phase 2 | 200 | une fois par combat | Une branche absorbe 50% HP central et part en mini-boss mobile (30 s avant fuite) | 1.5 s — **fenêtre punition** |

**Pattern d'attaque IA** : Branches attaquent en autonomie individuellement (chaque branche = mini-IA simple) ; Cristal central concentre Pulsation lumineuse + Résonance + Cristaux orbitaux. À 50% HP : Pulsation collective. À 20% HP : Branche-cœur détachée + fuite des branches restantes (reset partiel).

**Fenêtre interrupt** : la **Pulsation collective** est interruptible (telegraph 1.2 s). La **Résonance harmonique** est interrompue par dégât harmonique ciblé (Voie de Verbe Doux, instruments à corde forgés en Verbe).

---

## 5. Pouvoirs spécifiques du Cristal vivant

| Pouvoir | Description | Activation |
|---------|-------------|------------|
| **Croissance fractale** | Le Cristal grandit en zone magique (passe de Bourgeon à Pousse en ~50 ans, Pousse à Cathédrale en ~500 ans). Pas pertinent en combat, **pertinent en lore et économie** (récolter trop = arrêter croissance). | Passive long-terme |
| **Branches autonomes** | Chaque branche est une mini-IA. **HP, attaques, comportement individuels**. Détruire le cristal central tue les branches. Détruire les branches affaiblit le central. | Passive structurelle |
| **Résonance sonore** | AoE harmonique. Pose Cassure mineure. | Actif |
| **Réflexion magique** | Renvoie 30% des sorts subis (10% sur Pousse, 30% sur Cathédrale, 50% sur Ancienne). Drain Mana 4/s. | Passive (toggle, défaut ON) |
| **Régénération cristalline** | En zone magique, +2 HP/s central ; en filon actif, repousse 1 branche / 30 s. **Combat de longue durée favorise le Cristal**. | Passive conditionnelle |
| **Pulsation collective** | Voir §4. Sync des branches. | Actif (déclenché à 50% HP) |
| **Vulnérabilité harmonique** *(canonique Fractal)* | Chaque Cristal a une **fréquence-faille** (aléatoire, identifiable par Voie de Verbe Doux palier 3+ ou par Maîtrise *Joaillerie* palier 4+). Frapper à cette fréquence : **×2.5 dmg + interrompt branches autonomes 3 s**. | Passive (faille canonique) |

> [!important] Pédagogie de design
> Le Cristal vivant **enseigne la lecture de structure** : (1) pas de combat brute-force (les branches repoussent), (2) **identifier la fréquence-faille** (mécanique de découverte), (3) **viser le cristal central** quand exposé. Récompense préparation + Voie de Verbe Doux.

---

## 6. Loot table — Récolte sur créature

> [!warning] Convention
> **Récolter un Cristal vivant non rituellement = combat forcé.** La récolte rituelle (Voie d'Aetheron palier 3+ + offrande) **ne tue pas** le Cristal et donne **un sous-ensemble du loot** sans conséquence négative.

| Ressource | Drop rate (Cathédrale CR 12) | Modificateur tier | Métier requis | Palier minimum |
|-----------|--------------------------------|-------------------|---------------|----------------|
| **Cristaux fondus** | 100% (5-12 unités) — **× 2 Ancienne**, **× 0.4 récolte rituelle** | Tier joaillerie/forge ; intrant *Acier Éternel* secondaire | Dépéceur + Joaillier | Adepte (palier 3) |
| **Essence spirituelle** *(Essence cristalline)* | 80% (1-2 unités) — **× 2 Ancienne** | Tier alchimique +2 | Dépéceur + Apothicaire | Adepte |
| **Cœur de creature** *(Nœud fractal)* | 25% — **70% Ancienne**, **récolte rituelle: 0%** | **Composant Mythique** : intrant pour amulettes magistrales (Voie d'Aetheron), instruments de Verbe magistraux | Joaillier maître + Alchimiste | Maître (palier 5) |
| **Sécrétion** *(poudre cristalline)* | 90% (3-8 unités) | Composant alchimique / poussière de soin (Voie d'Aetheron) | Apothicaire | Initié (palier 2) |

> [!tip] Récolte rituelle
> Voie d'Aetheron palier 3+ permet de **chanter une fréquence d'accord** qui détache des cristaux **sans rompre** la structure. Loot diminué (×0.4), mais **Cristal continue de croître** et la zone reste favorable. Pattern à formaliser dans [[Sources de Ressources]] §Récolte rituelle.

---

## 7. Variants cosmiques

| Variant | Entité | Modification | Rareté |
|---------|--------|---------------|--------|
| **Shadow Cristal** | Noctis | Cristal **noir d'absorption** (absorbe lumière au lieu d'émettre) ; vision 360° devient infrarouge ; Réflexion **drain HP** au lieu de renvoyer dmg | Ère de l'Ombre Longue |
| **Spectral Cristal** | Tempora | Cristal **partiellement phasé** ; certaines branches en décalage temporel ; combat de timing | Ère des Échos Brisés |
| **Frost Cristal** | Climata | Cristal **bleu glacé** ; Résonance applique **gel mineur** (3 s ralenti) ; régénération en zone froide au lieu de magique | Toundra / Cestra / Celethor |
| **Verdoyant Cristal** *(paradoxe)* | Spiritus + Terranu | Cristal **mélange flore** (lierres et mousses cristallisés) ; Pacifié hors récolte ; Bénédiction passive aux visiteurs respectueux (+5% régen Mana 1h) | Ère du Verdoiement |
| **Brulé Cristal** | Eldoria endormie | Cristal **fondu-rouge** ; émet chaleur (DOT 2 dmg/s zone 4 m) ; intrant Forge spécial (recettes Acier Éternel +30%) | Ère du Feu Endormi |
| **Pourpre Cristal** | Aetheron | **Forme canonique** dans son archétype ; affinité Aetheron renforcée ; Réflexion +50%, drain Mana joueur léger | Filons d'Aetheron actifs |
| **Doré Cristal** | Celestia / Eldoria active | Cristal **doré-éclatant** ; bénit visiteurs respectueux (palier Voie d'Aetheron +1 niveau temporaire) ; **non-hostile par défaut** | Ère du Rêve Lumineux |
| **Brisé Cristal** *(paradoxe destructeur)* | Tempora aigu / Vortex | Cristal **glitche** ; fréquence-faille change toutes les 30 s (combat aléatoire) ; **pas de récolte rituelle possible** | Ère des Échos Brisés Cardinal |
| **Onirique Cristal** | Somnix | Apparaît dans les rêves ; combat **dans Somnix** uniquement ; loot = ressource Somnix (pas matériel) | Ère du Sommeil Onirique |
| **Vénérable Cristal** | Fatum / Spiritus ancien | Apparaît directement Ancienne ; **télépathie possible** (lit l'historique du joueur) ; bénit ou maudit selon Karma | Conditions cachées 🔒 (joueur ayant médité 10 fois devant un Cristal Doré) |

> [!note] Pattern Fractal vs Élémentaire
> Pour le Cristal vivant, **le Pourpre est sa nature canonique** (Aetheron). Comme [[Élémentaire de feu]] avec Brulé, les autres variants sont des **paradoxes ou contre-natures**.

---

## 8. Comportement IA

### Pattern d'apparition

Le Cristal vivant **n'apparaît pas** — il **est là**, depuis longtemps. Découvert par exploration (caverne, mine, ruine, faille). Réseau régional possible : un Cristal Cathédrale+ peut **réveiller** d'autres Cristaux dans 5 km si profané.

### Routine de combat (Cathédrale CR 12)

```
[Joueur entre à 30 m]
   ↓
[Détection magique — pulse]
   ↓
[Si joueur calme (pas d'arme dégainée, pas de Voie active hostile) → reste passif]
[Si joueur agressif ou récolte non-rituelle → activation]
   ↓
[Phase 1 — 100% à 50% HP central]
   ├─ Branches attaquent autonomes (3-5 actives)
   ├─ Cristal central : Pulsation lumineuse + Résonance harmonique
   └─ Réflexion magique ON (drain Mana central)
   ↓
[Transition 50% — Pulsation collective +30% dmg 10 s, branches synchronisent]
   ↓
[Phase 2 — 50% à 20%]
   ├─ Cristaux orbitaux activés
   ├─ Repousse de branches accélérée si en filon actif (mécanique d'usure joueur)
   └─ Resonance CD réduit
   ↓
[Transition 20% — Branche-cœur détachée]
   ├─ Branche-cœur = mini-boss mobile (HP 200, attaque 30 s)
   ├─ Branches restantes battent en retraite, fuient en croissance arrière
   └─ Si la branche-cœur s'échappe (fuite), **un nouveau Cristal naît** dans 50 km après quelques années (lore)
```

### Décisions clés (différences vs autres)

- **Pas de poursuite** (Fixe) — branches détachées poursuivent jusqu'à 50 m du cristal central, puis reviennent
- **Pas de jour/nuit** — actif H24
- **Sensible à l'Ère** : Ère des Échos Brisés réveille tous les Cristaux Brisés (paradoxe destructeur)
- **Réseau régional** : profaner un Cristal Cathédrale+ réveille les voisins (multi-combats)
- **Fuite de la branche-cœur** : pas de "mort" propre — le Cristal **se replante** ailleurs

> [!note] Branche [[NPC Behaviors/Index]]
> Pattern canonique pour créatures **Hivemind Émergeante Fractale Fixe**. Hérité par : [[Tisseur du Vide]] (mais mobile + Vide), Coraux conscients, Champignons-réseau (Phase 4).

---

## 9. Exemples de signatures (PHASE 4 stub)

### La Cathédrale de Myrtam (Alkaran)
- **Localisation** : profondeur des **mines de Myrtam**, salle interdite
- **CR** : 18 (Ancienne)
- **Variante** : Pourpre + traits Brulé (proche du Forgeron-Cœur signature de [[Élémentaire de feu]])
- **Lore** : *« Les Mineurs-Liés chantent à la Cathédrale chaque solstice. Elle leur répond. Quiconque récolte sans chanter est broyé par les branches en 30 secondes. »* Source secondaire d'**Acier Éternel** (alternative au Cœur de Cendara). Pacte de Mineur-Lié = palier 3 Voie d'Aetheron débloqué.

### Le Coeur de Skaldoria
- **Localisation** : **Glacier-mère** des Fils de l'Hiver, sommet de Thalendil
- **CR** : 14 (Cathédrale Frost)
- **Variante** : Frost Cristal vivant
- **Lore** : *« Le Coeur chante par mauvais temps. Quand il se tait, l'hiver arrive. »* Sanctuaire de Climata mineur ; bénédiction = résistance Froid +20% permanent (Phase 4).

### La Cristallerie d'Esperia (Endora)
- **Localisation** : **Cités Perdues** d'Esperia, jungle tropicale
- **CR** : 12 (Cathédrale Verdoyant — paradoxe)
- **Variante** : Verdoyant Cristal
- **Lore** : *« Les glyphes magiques de vie éternelle d'Esperia sont gravés sur ses branches. Lire en avoir vu = palier de Voie de Spiritus. La piller = malédiction de mort lente. »*

> [!warning] CHANTIER PHASE 4
> 1-2 Cristaux signatures par grand pays minier ou magique (~10-15 totaux).

---

## 10. Décisions ouvertes

### Mécanique Fractale canonique

> [!important] Convention canonique Fractal Hybelior
>
> 1. **Géométrie évolutive** : forme = fonction de la taille (stade canonique). Pas de transformation à volonté.
> 2. **HP distribué** : cristal central + N branches autonomes. Pas une jauge unique.
> 3. **Branches autonomes** : mini-IA individuelle, hérite cognition Hivemind.
> 4. **Fréquence-faille** : chaque Fractal a une faille harmonique identifiable (×2.5 dmg).
> 5. **Réseau régional** : Cristaux Cathédrale+ peuvent communiquer 5 km (Résonance harmonique).
>
> Pattern réutilisé par [[Tisseur du Vide]] avec inversion (mobile, hostile, Vide au lieu de Terre/Aetheron).

### Chantiers

- **Voie d'Aetheron** : à formaliser dans [[Le Lien]]. Le Cristal vivant est le **lieu de méditation** principal pour XP de Voie
- **Récolte rituelle** : pattern à étendre à d'autres ressources (arbres-totems Phase 4, sources sacrées)
- **Réseau régional de Cristaux** : carte à formaliser pour les régions minières (Myrtam, Mosrack, Vythar)
- **Stellaris** : entité astrale mineure proposée pour affinité Cristal — à valider [[Cosmologie]]

### Notes pour autres agents

| Pattern | Réutilisation |
|---------|---------------|
| Géométrie évolutive | [[Tisseur du Vide]], Coraux conscients, Cristaux mobiles, Champignons-réseau |
| HP distribué | Tous les Fractals, Hiveminds physiques (Ruches partiellement) |
| Fréquence-faille | Tous les Fractals + créatures cristallines |
| Récolte rituelle | Cristaux, Arbres-totems, Sources sacrées |
| Réseau régional | Tous les Hiveminds Émergeants à grande échelle |

---

*Liens : [[Bestiary/Index|← Index Bestiaire]] · [[Taxonomie des Créatures]] · [[Tisseur du Vide]] · [[Élémentaire de feu]] · [[Spectre des Ères]] · [[Cosmologie]] · [[Le Lien]] · [[Sources de Ressources]] · [[Combat]]*
