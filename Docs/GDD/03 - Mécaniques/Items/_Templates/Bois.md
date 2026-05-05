---
tags: [item, archétype, ressource, récolte, nature, végétal, bois]
type: archetype
category: Récolte
subcategory: Nature
source: Récolte nature
mastery: Bûcheronnage
métiers_de_récolte: [Bûcheron]
métiers_consommateurs: [Menuisier, Charpentier, Sculpteur, Forgeron, Armurier, Tisserand (manche outil), Apothicaire (résine)]
biomes: [Forêt tempérée, Taïga, Tropical, Jungle, Marécages]
era_availability: [toutes]
tier_min: 1
tier_max: 6
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-essences-tier, signatures-par-pays]
---

# 🪵 Archétype — Bois

> Sous-catégorie de la **catégorie [[Catégories d'Items|Récolte]]**, source [[Sources de Ressources#Source 1 — Récolte nature|Récolte nature]]. Matière première fondamentale, intrant majeur de [[Crafts#7. Travail du bois et de la pierre]] et de la confection d'arcs / manches d'outils / éléments d'armures composites.

---

## 1. Vue d'ensemble

Le **bois** est récolté par le [[Métiers|Bûcheron]] sur les arbres des forêts d'Hybelior. C'est l'une des ressources les plus abondantes mais sa **qualité varie radicalement selon l'essence, la maturité de l'arbre et la saison de coupe**. Composant clé pour : planches (menuiserie), manches (forge), arcs (menuiserie spécialisée), structures (charpenterie), fioles et figurines (sculpture).

Le bois porte une dimension culturelle forte : chaque pays a son **bois national** (l'Acier Éternel d'Altram a son Hêtre-Cendré, Astravia ses Ifs-Lunaires, Cendara ses Bois-Brûlés). Voir §7.

---

## 2. Variations / essences

| Essence | Profil | Usage canonique |
|---------|--------|-----------------|
| **Chêne** | Dur, lourd, durable | Charpenterie, mobilier, manches lourds |
| **Hêtre** | Dur, lisse, polyvalent | Menuiserie fine, manches d'outils |
| **Bouleau** | Tendre, clair, souple | Sculpture, planches légères, papier |
| **If** | Élastique, dense | **Arcs** (référence) — voir [[Arc]] |
| **Frêne** | Souple, résistant aux chocs | Manches d'armes, lances |
| **Érable** | Dur, grain fin | Mobilier précieux, instruments |
| **Cèdre** | Léger, aromatique, durable | Coffres, reliures, navires |
| **Ébène** | Très dur, noir, rare | Sculpture noble, accessoires précieux |
| **Pin / Sapin / Épicéa** | Tendres, résineux | Charpente courante, pâte à papier |
| **Bois exotique** (Verdoiement) | Mutation magique de toute essence | Recettes Magistrales — voir [[Les Ères#🌿 Ère du Verdoiement]] |

> Liste non exhaustive ; chaque continent peut décliner ses essences endémiques en Phase 4.

---

## 3. Tier × Qualité

> Le tier d'un bois ne dépend pas que de l'essence : il dépend aussi de la **méthode de récolte** (saison, lune, technique d'abattage) et du **palier de [[Métiers|Maîtrise]] du Bûcheron**.

| Tier | Qualité | Conditions typiques | Yield typique (par arbre) |
|------|---------|---------------------|---------------------------|
| **T1** | Brut | Bois de jeune arbre, coupe novice, taches/nœuds | 4-6 unités |
| **T2** | Sain | Arbre mature, coupe propre, séchage standard | 6-8 unités |
| **T3** | Bonne qualité | Essence noble (chêne/hêtre/if), Bûcheron Adepte+ | 8-12 unités |
| **T4** | Excellent | Arbre centenaire, coupe en lune montante, Bûcheron Expert | 10-15 unités |
| **T5** | Exceptionnel | Arbre ancien (>250 ans), conditions cosmiques, Bûcheron Maître | 8-12 unités (rare) |
| **T6** *(signature uniquement)* | Mythique | Arbres légendaires nommés (un seul individu, conditions cachées 🔒) | 1-3 unités/saison |

> Magistral et Légendaire requièrent un essence noble **plus** une coupe optimale. Un Hêtre récolté par un Novice plafonne à T2 même mature.

---

## 4. Spawn / Récolte

| Aspect | Détail |
|--------|--------|
| **Biomes** | Forêts tempérées (toutes essences communes), Taïga (Pin/Sapin/Épicéa/Bouleau), Tropical/Jungle (Ébène, essences exotiques), Marécages (Cyprès, essences humides) |
| **Densité** | 1 nœud "arbre récoltable" / 30-80 m selon biome (data-driven via PlantDecoration Generator — voir [[Architecture Data-Driven]]) |
| **Outil requis** | Hache de bûcheron — voir [[Catégories d'Items#Sous-famille — Outils]] |
| **Mini-jeu** | Timing frappe (clic rythmique sur jauge — précision détermine le yield et un proc qualité +1 tier rare) |
| **Palier de Maîtrise minimum** | Novice (T1-T2), Adepte (essences nobles), Expert (T4+), Maître + condition cachée 🔒 (T5-T6) |
| **Saison favorable** | **Hiver** (sève redescendue) = +10 % qualité ; **Printemps** = -10 % (sève montante, bois "humide") |
| **Régénération** | Nœud d'arbre = ressource finie ; respawn 7-30 jours selon biome ; replantation possible (Botaniste/Bûcheron mixte) |

---

## 5. Modulation par ère

| Ère | Effet sur le Bois |
|-----|-------------------|
| **[[Les Ères#🌿 Ère du Verdoiement]]** | +30 % yield · variant **Verdoyant** débloqué (mousse intégrée, +1 tier effectif sur recettes alchimiques) · "bois exotique" rare |
| **[[Les Ères#🌑 Ère de l'Ombre Longue]]** | Variant **Shadow** (Bois Noir) sur bouleau/chêne récolté de nuit · usage runes obscures |
| **[[Les Ères#⏳ Ère des Échos Brisés]]** | Variant **Spectral** rare · Bois "à l'envers" (croissance inversée) · matière unique pour [[Arc]] T5+ |
| **[[Les Ères#❄️ Ère du Sommeil de Glace]]** | -30 % yield · variant **Frost** (Bois givré, conserve sève cristallisée) |
| **[[Les Ères#🔥 Ère du Feu Endormi]]** | Variant **Brulé** (Bois carbonisé exterieur, dur intérieur) · base de manches résistants au feu |
| **[[Les Ères#✨ Ère du Rêve Lumineux]]** | Variant **Doré** rare (Bois-de-Lumière) · usage instruments sacrés |
| **[[Les Ères#💭 Ère du Sommeil Onirique]]** | Variant **Onirique** · sculpture rituelle |

---

## 6. Crafts destinés

> Voir [[Crafts]] §7 (Travail du bois) en priorité, et catégories liées.

- **[[Crafts]] §7 Travail du bois** : Planche (intermédiaire) · Mobilier · Arc (corps) · Manches d'outils · Charpente · Sculpture
- **[[Crafts]] §1 Forge** : Manches d'armes (Marteau, Hache, Lance), poignées d'outils
- **[[Crafts]] §5 Travail du cuir** : Reliures de livres, structures de selles
- **[[Crafts]] §2 Alchimie** : Sève (sous-produit) → résine traitée
- **[[Crafts]] §8 Scriptorium** : Pâte à papier (Bouleau, Pin)

→ Voir aussi [[Sources de Ressources#Source 3 — Fabrication]] : Bois → **Planche** (Menuisier).

---

## 7. Signatures notables

- **Hêtre-Cendré d'Altram** (Alkaran) — utilisé pour les manches des armes en *Acier Éternel*. Bois patiné par les fumées des forges légendaires de Myrtam.
- **Bois d'If d'Astravia** (Celethor) — référence pour les arcs de cour magocratique. Récolté en lune-double, séché 7 ans.
- **Chêne Ancien de Trinoria** (Galenor) — utilisé par les archers d'élite ; bois de la *Forêt des Mille-Flèches*.
- **Cèdre Rouge des Khalorins** (Galenor sud) — léger, résistant aux insectes, usage selles et carrosseries.
- **Ébène de Warenthor** (Ilthara, jungle) — bois noble, sculpture cérémonielle, instruments des bardes de Thalmaris.
- **Bois-Brûlé de Cendara** — bois récupéré sur les pentes du Mont Cendra, naturellement résistant au feu (T4 garanti).
- **Bois Spectral d'Ulinor** (variant Échos Brisés) — apparait uniquement dans le **Grand Canyon de l'Écho** pendant l'ère.

---

## 8. Décisions ouvertes

- [ ] **Décroissance d'un nœud d'arbre** : respawn fixe ou modulé par actions joueurs (déforestation visible) ? Lien [[Économie]].
- [ ] **Replantation** : mécanique de Bûcheron Maître ou Botaniste ? Tag `mastery: mixte` à valider.
- [ ] **Bois exotique du Verdoiement** : tier garantissant T4 ou simple bonus de magnitude ?
- [ ] **Bois nommés** (arbres légendaires uniques) : drop à vie 1× par Partie ou respawn lent ?
- [ ] Mapping des essences au CSV objet (à élargir si extension Phase 4).

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Les Ères]] · [[Arc]] · [[Écorce]] · [[Sève]]*
