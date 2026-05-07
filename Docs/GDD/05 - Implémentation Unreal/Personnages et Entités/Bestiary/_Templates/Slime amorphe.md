---
tags: [créature, archétype, bestiaire, amorphe, simple, caverne, marais]
type: archetype
forme: Amorphe
taille: Petit
revêtement: []
sens: [Détection vibrations, Détection chimique]
cognition: Instinctif
socialité: Solitaire
territorialité: Nomade
milieu: [Caverne, Marais, Sous-sol humide, Ruines]
locomotion: [Reptation lente, Étalement]
aire_influence: Local
reproduction: Division binaire
métamorphose: Aucune
durée_vie: Courte
trophicité: Détritivore
fonction_éco: Décomposeur primaire
pouvoirs: [Absorption, Acide corrosif, Division à mort, Adhésion, Étalement]
élément: "-"
résistances: [Physique léger (sans os), Tranchant inutile]
cr: 2
hp_base: 110
loot_table: [Sécrétion, Sang (gel), Cœur de creature (rare)]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [division-mort-mécanique, slime-pédagogie-arme]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Amorphes/_Description|Amorphes]] pour les espèces concrètes décomposées de cet archétype.

# 🟢 Slime amorphe — Archétype-référence

> Archétype canonique de la **forme Amorphe pure** (sans élément intrinsèque) d'Hybelior. Pattern pour slimes, vases, pulpes, gélatines vivantes. **Pose le pattern Amorphe de base** complémentaire à [[Élémentaire de feu]] (Amorphe + élément) — le Slime est **Amorphe pur**.
>
> Voir [[Bestiary/Index]] · [[Élémentaire de feu]] · [[Tentacule abyssal]]

---

## 1. Vue d'ensemble

### Description sensorielle

Le Slime amorphe est une **masse gélatineuse semi-translucide** (1-3 m diamètre étalé, 0.5-1 m hauteur en posture défensive). Couleurs vert-pâle à gris-marécage selon biome. Pas d'organes visibles, mais un **noyau central pulsant** (50-100 g matière dense) flotte dans la masse — point faible canonique.

Sons : **clapotis humide** caractéristique, **glissement** sur sol mouillé. Trace : **traînée gluante**, mues de pellicule extérieure, **objets dissous partiellement** (signature acide). Odeur : terreuse, légèrement aigre.

### Place écologique et culturelle

**Décomposeur primaire** : digère matière organique morte, charognes, pourriture. Régulé par : prédateurs spécialisés (rares — peu d'animaux mangent slime), incendies, gel.

**Folklore** :
- *Pyrtara (Ilthara)* → slimes-marais = "âmes des noyés digérées" (lore canonique)
- *Galenor (Mosrack)* → slimes industriels = nettoyeurs de canalisations (rare)
- *Cestra* → slime-doré (variant Doré) = signe de bénédiction (rare, paradoxe)
- *Cendara* → slimes-cendre (variant Brulé) = vases volcaniques

**Importance gameplay** :
- **Première rencontre Amorphe** typique d'un joueur Novice
- Mentor de **diversification d'arme** (tranchant inutile, **contondant ou magique** efficace — pédagogie inverse de mammifère)
- Loot modeste : **Sécrétion** (gel — alchimie de base), **Sang gelé**
- Pose le pattern **Amorphe pur** réutilisable (pulpes, vases, méduses)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie

**Amorphe Petit** (1-3 m étalé). **Pas de revêtement** (membrane gélatineuse). Sens : **Détection vibrations** (au sol, 15 m), **Détection chimique** (perçoit composés organiques à 5 m). **Pas de vision, pas d'audition aérienne** — c'est une **créature aveugle au sens classique**.

### Axe 2 — Comportement

**Instinctif** : BT extrêmement simple. Réactions stéréotypées : matière organique détectée → s'étend vers, attaque → si HP < 50% → divise. **Socialité Solitaire**. **Territorialité Nomade**. Pas de communication active.

### Axe 3 — Habitat

**Caverne, Marais, Sous-sol humide, Ruines**. **Locomotion : Reptation lente (0.8 m/s), Étalement (peut s'aplatir et glisser sous portes basses)**. **Aire d'influence Local**.

### Axe 4 — Cycle de vie

**Division binaire** : un slime tué se **divise** en 2 mini-slimes vivants (mécanique canonique — voir §5). **Pas de métamorphose**. **Durée de vie Courte** (semaines à mois selon ressources alimentaires).

### Axe 5 — Écologie

**Détritivore** strict (matière organique morte). **Méthode** : **Absorption passive** (recouvre proie, digère 10-30 min).

### Axe 6 — Rôle

**Décomposeur primaire**. Pas d'alliance.

### Axe 7 — Capacités

**Pas d'élément** (Slime standard — variants peuvent avoir Acide / Toxique). **Pouvoirs** : Absorption (digestion), Acide corrosif (dégâts dégradants équipement), Division à mort, Adhésion (ralentit joueur), Étalement (manœuvre). **Résistances** : **Physique léger très réduit** (membrane absorbe), **Tranchant quasi-inutile** (lame passe à travers — 30% dégâts seulement). Vulnérable à : **Contondant** (×1.5), **Feu** (×2), **Gel** (×2 — solidifie), **Magie pure**.

### Axe 8 — Stats

Voir §3. HP base 110 (CR 2). **Pas de Stamina, pas de Mana** — pure créature passive.

### Axe 9 — Récompenses

**Loot** : 3 ressources (§6) — pattern **simple**. Slime = **première leçon** d'arme adaptée.

---

## 3. Stats par CR

| Variante | CR | HP | Vitesse | Acide dmg | Comportement |
|----------|----|----|---------|-----------|--------------|
| **Mini-slime** *(division)* | 0.5 | 30 | 0.8 m/s | 4-7 | Erre, attaque opportuniste |
| **Slime standard** | 2 | 110 | 0.8 m/s | 12-18 | Pattern complet |
| **Slime géant** | 4 | 220 | 0.6 m/s | 22-30 | Plus lent, plus tank |
| **Slime ancestral** *(rare)* | 6 | 360 | 0.5 m/s | 32-44 | Boss zone caverne, division ×3 |

> **Calibrage** : Slime CR 2 simple à tuer SI joueur a contondant/feu. Sinon : **frustrant pédagogique**.

### Régen

| Stat | Hors combat | En combat |
|------|-------------|-----------|
| HP | +1 HP/s | 0 |

---

## 4. Attaques canoniques

| Attaque | Type | CD | Effet | Telegraph |
|---------|------|----|----|-----------|
| **Coup gélatineux** | Contondant + Acide | 1.5 s | Dégât base, **Acide** stack 1 (dégrade équipement 1 dmg/s 3 s) | Étirement (0.5 s) |
| **Étalement attaque** | Acide + AoE local | 5 s | Étend membrane sur 2 m, dmg 0.7×, **immobilise 1 s** | Aplatissement (0.7 s) |
| **Absorption** *(joueur immobilisé)* | Acide DOT lourd | 10 s | Recouvre joueur 3 s, dmg 0.5× × 4 ticks, **dégrade armure** rapidement | Englobement (1.0 s — fenêtre interrupt) |
| **Division à mort** *(à 0 HP)* | Mode | déclenché | Slime se divise en **2 Mini-slimes (CR 0.5)** chacun avec 50% HP du parent au moment mort | Implosion gélatineuse 1.0 s |

**Pattern IA standard** : approche lente → Coup gélatineux → si joueur reste → Étalement → Absorption si possible. **Pas de Phase 2** — slime est simple. À la mort : **division** (mécanique canonique).

---

## 5. Pouvoirs spécifiques

| Pouvoir | Description |
|---------|-------------|
| **Absorption** | Voir §4. Si joueur staggered : englobement. **Dégrade équipement** (mécanique d'usure canonique — réparation requise après combat). |
| **Acide corrosif** | DOT léger + dégradation arme/armure. Pédagogie : entretien d'équipement. |
| **Division à mort** | À 0 HP, divise en 2 Mini-slimes. **Si Mini tués** : pas de re-division (pattern : 1 → 2 → 0, pas de cascade). Cap canonique. |
| **Adhésion** | Slime "colle" : joueur en contact perd 30% vitesse. |
| **Étalement** | Slime peut **passer sous portes**, fissures, conduits. Pédagogie : **incontournable** (les slimes envahissent zones inattendues). |

---

## 6. Loot table

| Ressource | Drop rate | Modificateur | Métier |
|-----------|-----------|--------------|--------|
| **Sécrétion** *(Gel de slime)* | 100% (2-5) | Composant alchimie de base (potion mineure) | Apothicaire Novice |
| **Sang** *(Sang gelé)* | 80% (1-2 fioles) | Composant alchimie acide / colle | Apothicaire Initié |
| **Cœur de creature** *(rare)* | 5% — **30% ancestral** | Composant alchimie de division | Apothicaire Adepte |

> **Pas de Cuir, Os, Carapace, Plume** — pattern Amorphe pur (no matière solide).

> **Loot rare mais simple** : pattern de **drop léger** pour créature CR bas — équilibrage économique.

---

## 7. Variants cosmiques

| Variant | Spécificité |
|---------|-------------|
| **Shadow** | Slime noir, **invisible en pénombre** |
| **Spectral** | Translucide totalement, traverse murs (**hantise** zone) |
| **Frost** | Slime gelé, slow joueur permanent zone |
| **Verdoyant** | Slime moussu, niche en forêt, régen biome |
| **Brulé** | Slime de cendre (quasi-élémentaire, paradoxe) |
| **Pourpre** | Brume + slime, **Confusion** sur Absorption |
| **Doré** | Slime doré (rare), paisible, drop **Larme** rare |
| **Brisé** | Slime glitché, division ×4 au lieu ×2 |
| **Onirique** | Slime des rêves (Somnix), Sommeil sur Coup |
| **Vénérable** | Slime ancien (siècles), géant, Phase 4 dialogable rare |

---

## 8. Comportement IA

### Décisions

- **Détection vibrations** : approche lente vers source
- **Joueur attaque tranchant** : ne fuit pas (peu de dégâts), continue avancer
- **Joueur attaque contondant/feu** : ne fuit pas non plus (Instinctif), encaisse
- **Joueur en hauteur** : tournis 30 s puis dispersion (Slime ne grimpe pas)
- **HP < 50%** : ne change rien (Instinctif simple)
- **0 HP** : Division → Mini-slimes attaquent

### Cycle Ère

- **Ère du Verdoiement** : slimes prolifèrent en forêts humides
- **Ère du Sommeil de Glace** : slimes solidifiés (loot facile, pas hostiles)
- **Ère des Échos Brisés** : variant Brisé (division ×4)

---

## 9. Signatures (PHASE 4 stub)

### Le Mère-Vase de Pyrtara
- **Localisation** : Marais de Pyrtara (Ilthara), profondeur centrale
- **CR** : 8 (Slime ancestral renforcé)
- **Variante** : Verdoyant ancestral
- **Lore** : *« Le Mère-Vase a digéré trois villages. Les Druides de Pyrtara disent qu'il est l'âme du marais. Si on le tue, le marais meurt. »*
- **Bonus** : combat = échec écologique (le marais s'assèche, perte de biome — pénalité narrative).

### Le Slime des Catacombes (Veldoria)
- **Localisation** : Catacombes de Veldoria (Trinoria)
- **CR** : 4 (Slime géant)
- **Variante** : Shadow géant
- **Lore** : *« Il a digéré les os des rois oubliés. »*

---

## 10. Décisions ouvertes

- **Dégradation équipement** par Acide : pattern d'**usure** canonique — à formaliser ([[Combat]] §Équipement / [[Sources de Ressources]] §Réparation)
- **Division à mort** : cap canonique (1 → 2, pas de cascade) à valider playtest
- **Pédagogie arme** : Slime = première leçon "ton arme est inadaptée" — placement Tutoriel Novice à valider
- **Mère-Vase** : pattern "boss écologique" (tuer = pénalité environnementale) — à généraliser

---

*Liens : [[Bestiary/Index|← Index Bestiaire]] · [[Élémentaire de feu]] · [[Tentacule abyssal]] · [[Combat]] · [[Sources de Ressources]] · [[Les Ères]]*
