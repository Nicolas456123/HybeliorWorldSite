---
tags: [créature, archétype, bestiaire, insectoïde, hivemind, swarm, caverne, forêt]
type: archetype
forme: Insectoïde
taille: Variable
revêtement: [Carapace]
sens: [Vision 360°, Vision diurne, Audition vibrations, Phéromones]
cognition: Hivemind
socialité: Ruche
territorialité: Fixe
milieu: [Caverne, Forêt, Sous-bois, Souterrain]
locomotion: [Marche, Vol battu, Rampement]
aire_influence: Régionale
reproduction: Spores
métamorphose: Multi-stades
durée_vie: Variable
trophicité: Omnivore
fonction_éco: Décomposeur / Pollinisateur agressif
pouvoirs: [Hivemind partagé, Swarm de zone, Phéromone d'alarme, Reproduction rapide, Reine vulnérable, Multi-rôles]
élément: "-"
résistances: [Physique léger (individu), Massif (ruche complète)]
cr: 8
hp_base: "50 (individu) / 600 (ruche complète)"
loot_table: [Carapace, Antenne, Aile, Sécrétion, Œuf, Cire, Miel, Cœur de creature (Reine)]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [hivemind-mécanique-IA, swarm-perfs, reine-encounter]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Arthropodes/Insectes/_Description|Arthropodes/Insectes]] pour les espèces concrètes décomposées de cet archétype.

# 🐝 Ruche d'insectes — Archétype-référence

> Archétype canonique de l'**insectoïde Hivemind** d'Hybelior. Pattern pour ruches d'abeilles géantes, fourmilières-colosses, essaims de guêpes, swarms de scarabées, termitaires à reine. Pose le pattern **Hivemind partagé** (BT collectif), **multi-rôles** (ouvrière/soldat/reine), **rencontre de groupe massive** (50-200 individus).
>
> Voir [[Bestiaire - Index]] · [[Élémentaire de feu]] · [[Loup forestier]]

---

## 1. Vue d'ensemble

### Description sensorielle

La Ruche d'insectes (au sens canonique Hybelior) est un **collectif** plutôt qu'un individu. **Ouvrières** : 5-30 cm, **soldats** : 20-60 cm, **reine** : 1-3 m. Carapaces brun-jaunes à noir-iridescent selon variant. Forme : abeilles, guêpes, fourmis, scarabées géants, termites colossaux.

Sons : **bourdonnement signature** (ruche entière, audible 200 m), **stridulation** soldats (avertissement), **silence inquiétant** ouvrières. Trace : **nid central** (alvéoles, tunnels, monticule), **chemins de phéromones** au sol.

### Place écologique et culturelle

**Décomposeurs / Pollinisateurs agressifs** : essentiels à l'écosystème, mais **dangereux** quand provoqués. Régulés par : prédateurs spécialisés (ours, blaireaux), incendies, conditions extrêmes.

**Folklore** :
- *Galenor (Mosrack)* → ruche-cité = construction industrielle (apiculture industrielle, miel ressource majeure)
- *Pyrtara (Ilthara)* → swarm-marais = fléau, lié à pestilences
- *Cendara* → swarm-cendre (variant Brulé) = ruches volcaniques, miel d'or
- *Onara* → ruche = symbole de communauté, totem de Spiritus collectif
- *Cestra* → ruche sacrée = oracle (mouvement des abeilles = présage)

**Importance gameplay** :
- **Première rencontre swarm/groupe massif** typique d'un joueur Adepte
- Mentor de **combat de zone** (AoE, fuite, gestion de la reine)
- Loot : **Miel** (cuisine + alchimie), **Cire** (artisanat), **Carapace** (armure légère), **Cœur de Reine** (composant Magistral)
- Pose le **pattern Hivemind** réutilisable pour autres swarms (rats géants, chauves-souris vampire en groupe)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie

**Insectoïde** Variable (individu Petit, ruche complète Colosse). Revêtement **Carapace**. Sens : **Vision 360°**, Vision diurne, **Audition vibrations**, **Phéromones** (communication chimique canonique). Pas d'odorat aérien classique.

### Axe 2 — Comportement

**Hivemind** : **BT collectif partagé** entre tous les individus (canonique). La ruche **pense comme un seul cerveau distribué**. Tuer 1 ouvrière = aucun impact ; tuer 30 = ruche en alerte ; tuer la reine = **collapse total**. **Socialité Ruche**. **Territorialité Fixe** (nid central, défendu farouchement). Communication : **phéromones** (alarme, recrutement, route alimentaire) + bourdonnement modulé.

### Axe 3 — Habitat

**Caverne, Forêt, Sous-bois, Souterrain**. **Locomotion : Marche (insectes au sol), Vol battu (abeilles, guêpes), Rampement (fourmis, termites)**. **Aire d'influence Régionale** (5-10 km autour du nid).

### Axe 4 — Cycle de vie

**Spores** *(au sens canonique : œufs en grand nombre — la reine pond 100-1000/jour)*. **Métamorphose Multi-stades** : Œuf → Larve → Pupe → Adulte (rôle attribué selon larve nourrie : ouvrière, soldat, reine future). **Durée de vie Variable** : ouvrière 1-3 mois, soldat 3-6 mois, **reine 5-30 ans**.

### Axe 5 — Écologie

**Omnivore** au niveau collectif (nectar, charognes, plantes, pillage de ruches rivales). **Méthode** : **swarm coordonné** + **pillage** + **élevage** (certaines fourmis géantes élèvent pucerons-géants).

### Axe 6 — Rôle

**Décomposeur / Pollinisateur agressif**. Pas d'alliance par défaut, mais **apiculture** = pacte canonique humain-ruche (Mosrack industriel, ruches domestiquées).

### Axe 7 — Capacités

**Pas d'élément**. **Pouvoirs** : Hivemind partagé, Swarm de zone (AoE), Phéromone d'alarme (recrutement), Reproduction rapide, **Reine vulnérable** (mécanique boss canonique), Multi-rôles. **Résistances** : Physique léger (carapace mince individu), **Massif** au niveau ruche (impossible de tuer "la ruche" sans tuer la Reine). Vulnérables : feu, gel, eau (noie ruche), poison ciblé (Voie de Spiritus inverse — perturbe phéromones).

### Axe 8 — Stats

Voir §3. **HP base double** : 50 individu / 600 ruche complète. Stats **par rôle** (ouvrière / soldat / reine).

### Axe 9 — Récompenses

**Loot** : 8 ressources (§6). **Miel** = ressource agricole. **Reine** = boss à drop majeur. **XP** spécifique : combat de groupe + furtivité ruche.

---

## 3. Stats par CR (rôles)

| Rôle | CR ind. | HP | Stamina | Vitesse | Dmg coup | Comportement |
|------|---------|----|---------|---------|----------|--------------|
| **Ouvrière** | 0.5 | 25 | 30 | 4 m/s (vol 8) | 4-7 (piqure) | Fuit en cas de menace, alerte ruche |
| **Soldat** | 3 | 80 | 100 | 5 m/s (vol 10) | 14-22 + venin léger | Défense agressive, harcèlement |
| **Soldat élite** *(rare)* | 6 | 180 | 160 | 6 m/s (vol 12) | 26-38 + venin standard | Anti-intrus prioritaire |
| **Reine** *(boss)* | 12 | 600 | 280 | 1 m/s | 38-54 + ponte continue | Stationnaire, pond/régen ruche |
| **Ruche complète** *(rencontre)* | 8-15 selon population | n/a (cumul individus) | — | — | 30-200 individus actifs |

> **Calibrage Ruche CR 8** (mode standard) : ~50 ouvrières + 10 soldats + 1 Reine. Joueur affronte **swarm** : la fuite ou le **feu/AoE** sont stratégies viables.

### Régen ruche

| Stat | Hors combat | En combat |
|------|-------------|-----------|
| Population | +1 ouvrière / 2 min jeu (régen Reine) | 0 (Reine occupée à défendre) |
| HP individu | n/a (mort permanente) | 0 |

---

## 4. Attaques canoniques

| Attaque | Type | Effet | Telegraph |
|---------|------|-------|-----------|
| **Piqure** *(ouvrière)* | Perçant + venin léger | Dégât 4-7, **Venin léger** stack 1 | Aucun (rapide) |
| **Charge soldat** | Perçant + venin standard | Dégât 14-22, **Venin** stack 2 | Plongeon (0.5 s) |
| **Swarm de zone** *(passif si ruche en alerte)* | AoE phéromone | Tous individus dans zone 30 m attaquent simultanément, dmg cumulé selon population | Bourdonnement intense (déclenche par alarme) |
| **Phéromone d'alarme** *(ouvrière, déclenchement)* | Utility | Recrute 5-15 ouvrières/soldats à 30 m sur cible | Zigzag rapide ouvrière (1 s) |
| **Coup de Reine** | Contondant + venin lourd | Dégât 38-54, **Venin Mythique** stack 3 | Mouvement abdomen (1.0 s) |
| **Spore-explosion** *(rare, certains insectoïdes)* | AoE chimique | Nuage 3 m, DOT 5 dmg/s 6 s, +Confusion | Gonflement abdomen (1.5 s) |

**Pattern IA standard** : Ouvrière détecte → **Phéromone d'alarme** → swarm ouvrières + soldats convergent → **encerclement** → harcèlement constant. **Reine stationnaire** : ne bouge pas, **pond + régen**. Tuer la Reine = **collapse** (toutes ouvrières confuses 10 s, fuite, ruche désorganisée).

---

## 5. Pouvoirs spécifiques

| Pouvoir | Description |
|---------|-------------|
| **Hivemind partagé** | Tous les individus partagent un BT collectif. Décisions optimales (encerclement, recrutement). **Pédagogie** : enseigner la **gestion de menace de groupe** (AoE, fuite, frappe Reine). |
| **Swarm de zone** | Voir §4. Mécanique d'arène canonique : la zone autour du nid devient hostile. |
| **Phéromone d'alarme** | Voir §4. Recrutement chaîne : 1 ouvrière en détresse → 5 viennent → 15 viennent → escalade. **Stratégie clé** : silencer la première ouvrière avant qu'elle alerte. |
| **Reproduction rapide** | Reine pond 100-1000/jour. La ruche **se régénère** sur le long terme. **Mécanique narrative** : si joueur ne tue pas la Reine, ruche reste Phase 4 (peut renaître à 100% en 1 mois jeu). |
| **Reine vulnérable** | Reine **stationnaire**, point faible **ovipositeur** (zone exposée). 1.5× dmg subis. **Pattern boss canonique pour Hivemind**. |
| **Multi-rôles** | Loot et combat varient selon rôle visé. Pédagogie : enseigner la **priorité** (Reine > soldats > ouvrières). |

---

## 6. Loot table

| Ressource | Source | Drop rate | Métier |
|-----------|--------|-----------|--------|
| **Carapace** *(insectoïde)* | Tous | 80% individu (1) ; 100% ruche (15-30 cumul) | Dépéceur Initié |
| **Antenne** | Tous | 60% individu (2) | Dépéceur Initié |
| **Aile** | Volants (abeille, guêpe) | 40% (2) | Dépéceur Initié |
| **Sécrétion** *(venin)* | Soldat | 70% (1 fiole) | Apothicaire Adepte |
| **Œuf** *(rare — pillage de la Reine)* | Reine | 100% sur Reine vaincue (3-8) | Pilleur de nids Adepte |
| **Cire** *(ruche d'abeille)* | Nid abandonné/conquis | 100% (5-20) | Apiculteur Novice |
| **Miel** *(ruche d'abeille)* | Nid | 100% (10-50 unités) | Apiculteur / Cuisinier |
| **Cœur de creature** *(Reine)* | Reine | 100% (1) | Apothicaire Expert |

> **Cœur de Reine** = composant **Magistral** alchimie collective + cuisine de royauté.

> **Apiculture canonique (Mosrack)** : ruche **non-tuée mais domestiquée** = production permanente de miel/cire (pacte avec ruche, Voie de Spiritus). Phase 4.

---

## 7. Variants cosmiques

> Ruches **ne sont pas des individus** — variants s'appliquent à la **ruche entière**.

| Variant | Spécificité |
|---------|-------------|
| **Shadow** | Carapaces noires, swarm silencieux, embuscade en pleine vue |
| **Spectral** | Translucides, traversent murs (terrifiant Phase 4) |
| **Frost** | Givrées, ralentissent joueur (1 s freeze sur Piqûre) |
| **Verdoyant** | Couvertes de mousse, niche en arbre géant |
| **Brulé** | Ruches volcaniques (Cendara), miel d'or, soldats enflammés |
| **Pourpre** | Brume, Confusion sur Phéromone |
| **Doré** | Halo lumineux, ruche pacifique (apiculture sacrée Cestra) |
| **Brisé** | Hivemind glitché, ouvrières désynchronisées (plus faible) |
| **Onirique** | N'apparaît qu'en Somnix nuit, Sommeil sur Piqûre |
| **Vénérable** | Reine ancienne (siècles), pond plus, dialogable Phase 4 |

---

## 8. Comportement IA

### Hivemind décisions

- **Phase 1 — Vigilance** : ouvrières patrouillent autour nid (50 m)
- **Phase 2 — Alerte** (joueur détecté) : phéromone, recrutement 10 s
- **Phase 3 — Swarm** (joueur attaque) : 30+ individus convergent
- **Phase 4 — Défense Reine** (joueur approche nid) : soldats élites + Reine défendent
- **Phase 5 — Collapse** (Reine morte) : ouvrières fuient, ruche dispersée

### Variations stage

- **Larvaire** : passive, vulnérable
- **Naissante** (1-2 mois) : population faible, harcèlement léger
- **Mature** (1-5 ans) : pattern complet
- **Vénérable** (10+ ans) : Reine vénérable + soldats élites multiples

### Cycle Ère

- **Ère du Verdoiement** : ruches **prolifèrent** (population +50%)
- **Ère du Sommeil de Glace** : ruches **dorment** (récolte facile mais pas de Reine active)
- **Ère du Feu Endormi** : variant Brulé apparait

---

## 9. Signatures (PHASE 4 stub)

### La Ruche-Cité de Mosrack
- **Localisation** : Mosrack (Onara), centre industriel
- **CR** : 14 (Vétéran)
- **Variante** : Doré domestique (apiculture sacrée)
- **Lore** : *« Mille générations d'apiculteurs y ont conclu un pacte. La Reine reconnaît leur visage. Le miel de Mosrack guérit. »*
- **Bonus narratif** : pas de combat — quête économique, joueur peut **devenir apiculteur** (Maîtrise nouvelle Phase 4).

### L'Essaim de Pyrtara
- **Localisation** : Marais de Pyrtara (Ilthara)
- **CR** : 16 (Vétéran)
- **Variante** : Pourpre, swarm de guêpes-marais
- **Lore** : *« Trois villages disparus. La Reine porte la brume. »*

---

## 10. Décisions ouvertes

- **Hivemind BT** : implémentation technique (BT collectif partagé) — à tracer avec [[Architecture Data-Driven]] §Behavior Generator
- **Swarm performance** : 200 individus en arène = défi technique Unreal — à valider perfs
- **Apiculture canonique** : système de pacte ruche Phase 4 — Maîtrise nouvelle
- **Variant Vénérable Reine dialogable** : pattern Sapient émergent (cf. Tortue ancestrale) — à généraliser

---

*Liens : [[Bestiaire - Index|← Index Bestiaire]] · [[Élémentaire de feu]] · [[Loup forestier]] · [[Combat]] · [[Sources de Ressources]] · [[Les Ères]] · [[Architecture Data-Driven]]*
