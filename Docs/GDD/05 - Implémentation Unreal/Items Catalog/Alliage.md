---
tags: [item, archétype, ressource, fabriqué, intermédiaire, alliage, métal]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Métallurgiste
intrants_typiques: [Lingot, Charbon, Fondant, Composant créature (haut tier)]
craft_category: Forge
métiers_consommateurs: [Forgeron, Armurier, Bijoutier, Lapidaire]
tier_min: 2
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [équilibrage-9-signatures-CSV, lignée-Acier-Ivar-vs-Acier-Éternel, drop-Bliysium-Anterium-Déterium]
---

# 🧬 Archétype — Alliage

> Le **niveau supérieur du Lingot**. Un alliage est la **fusion canonique de 2+ Lingots** (ou Lingots + composants créature), produisant un matériau aux propriétés émergentes — plus dur, plus léger, plus résonant, plus rare. Les **9 alliages canoniques** d'Hybelior sont définis par le CSV [[AccessExport]] et signent les armes haut-tier.

---

## 1. Vue d'ensemble

L'**alliage** est l'**aboutissement métallurgique**. Là où le [[Lingot]] est la forme standard d'un minerai unique, l'alliage **mélange plusieurs métaux** (parfois avec composant créature ou cosmique) pour atteindre des propriétés impossibles aux lingots purs : résistance accrue, légèreté inversée, résonance magique, anti-armure, etc.

**Rôle d'intermédiaire :**
- **Sortie** d'une opération de métallurgie ([[Métiers|Métallurgiste]], parfois Forgeron Maître)
- **Entrée** dans tous les items Forge **T3+** ([[Épée à une main]] §6 recettes T3-T6, armures plate, mailles haut tier)

**Ancrage canonique :** les **9 signatures CSV** ([[AccessExport]] type 31) sont la liste fermée des alliages d'Hybelior. Toute autre combinaison crée un alliage **générique** (effets standards) ; les 9 signatures portent **identité narrative + bonus dédiés**.

> [!important] Lien lore avec le Bestiaire
> L'**Acier Ivar** (T5) est l'ancêtre métallurgique de l'**Acier Éternel** (T6, hors-CSV) qui est forgé à partir de Cœur de [[Bestiary/Index|Zocshawk]] + Cœur de Cendre Vivante. Ce passage Ivar → Éternel est documenté §7.

---

## 2. Variations / matériaux

### Les 9 signatures CSV canoniques

| # | Nom CSV | Tier | Recette schéma (intrants) | Profil gameplay |
|---|---------|------|----------------------------|-----------------|
| 1 | **Laiton** | T2 | Lingot cuivre × 2 + Lingot zinc × 1 | Décoratif, conducteur — bijouterie de masse |
| 2 | **Bronze** | T2 | Lingot cuivre × 2 + Lingot étain × 1 | Polyvalent ancien — armes T2 économiques |
| 3 | **Acier inoxydable** | T3 | Lingot fer × 3 + Lingot chrome × 1 + Charbon × 4 | Anti-corrosion, durabilité +20% |
| 4 | **Acier au tungstène** | T4 | Lingot fer × 3 + Lingot tungstène × 1 + Charbon × 6 | Très dense, anti-armure +15%, vitesse −5% |
| 5 | **Acier Ivar** | T5 | Lingot acier × 4 + Cœur de creature haut tier × 1 + Sang × 2 | Lignée Ivar — affixe *Stagger renforcé* gratuit |
| 6 | **Bliysium** | T4 | Lingot mithril × 2 + Lingot argent × 2 + Cristal de Voie × 1 | Léger résonant — focus magique, items mages |
| 7 | **Spuelium** | T3 | Lingot fer × 2 + Lingot plomb × 1 + Poudre fabriqué × 2 | Anti-Voie, sceaux et reliques |
| 8 | **Anterium** | T4 | Lingot orichalque × 2 + Lingot cuivre × 2 + Essence spirituelle × 1 | Conducteur de mana, +Mana max sur item |
| 9 | **Déterium** | T5 | Lingot adamantium × 1 + Lingot acier × 3 + Os de creature haut tier × 2 | Très dur, anti-magique +10% |

### Alliages génériques (non-signatures)

Tout autre mélange de 2+ Lingots produit un **alliage générique** nommé descriptivement (ex. *alliage cuivre-argent*) avec effets standards (moyenne pondérée des lingots-source +5% durabilité). Pas d'affixe gratuit, pas de bonus narratif.

---

## 3. Tier × Qualité

> **Règle :** le tier d'un alliage est calculé via la formule **moyenne pondérée arrondie supérieure** des lingots-source, **plus modulation Maître** (l'expertise métallurgique permet de dépasser la moyenne d'1 tier max).

### Formule

```
Tier_Alliage = ceil( Σ(Tier_Lingot_i × Quantité_i) / Σ(Quantité_i) ) + Mod_Mastery_Métallurgiste
```

- Mod_Métallurgiste : Novice 0, Initié 0, Adepte 0, Expert +0.5, Maître +1
- **Cap dur** : Tier_Alliage ≤ max(Tier_Lingot_i) + 1 (un alliage ne peut **pas** dépasser de plus d'1 tier le meilleur ingrédient)

### Exemples

- *Bronze T2* : 2 lingots cuivre T1 + 1 lingot étain T1 → moyenne 1, Métallurgiste Adepte → tier 2 (proc qualité)
- *Acier inoxydable T3* : 3 lingots fer T2 + 1 lingot chrome T2 → moyenne 2, Métallurgiste Adepte → T3
- *Acier Ivar T5* : 4 lingots acier T3 + Cœur T4 + Sang T4 → moyenne 3.4, Métallurgiste Maître → T5 (cap +1 → 4 mais composant créature haut tier autorise +1 supp = T5)

| Tier | Nom palier | Charbon × | Durée | Taux échec | Maîtrise |
|------|------------|-----------|-------|------------|----------|
| T2 | Façonné | 3 | 180 s | 10% | Initié |
| T3 | Œuvré | 5 | 360 s | 6% | Adepte |
| T4 | Magistral | 8 | 720 s | 4% | Expert |
| T5 | Légendaire | 12 | 1500 s | 2% | Maître |
| T6 | Mythique | 20 | 3600 s + scénarisation | 0% (quête) | Maître + signature |

---

## 4. Recette de production

> Catégorie : **Forge** ([[Crafts]] §Forge). Station : **Four à fondre haut creuset** + Bac de coulée + Bac à scories.

### Recette canonique — Acier inoxydable T3

```yaml
tier: 3
métier: Métallurgiste (Forgeron Adepte+ accepté)
mastery_required: Adepte (palier 3)
station: Four à fondre haut creuset + Bac de coulée
intrants:
  - Lingot de fer × 3 (T2-T3)
  - Lingot de chrome × 1 (T2)
  - Charbon × 4
  - Fondant × 2
durée: 360 s
mini_jeu: timing_température (4 jauges) + dosage_proportionnel (2 jauges)
sortie: Lingot d'acier inoxydable × 1 (T3)
notes:
  - Échec : sortie 2 lingots de fer T2 + 1 scorie chrome (récupérable)
  - Proc Maître Métallurgiste : +1 lingot bonus
```

### Recette signature — Acier Ivar T5

```yaml
tier: 5
métier: Métallurgiste Maître + (Forgeron Expert)
mastery_required: Maître Métallurgie + Expert Forge
station: Four à fondre haut creuset + Cercle de fusion runique
intrants:
  - Lingot d'acier × 4 (T3+)
  - Cœur de creature × 1 (créature T4+ minimum, voir [[Bestiary/Index]])
  - Sang × 2 (créature haut tier)
  - Charbon × 12
  - Fondant × 4
durée: 1500 s (25 min — non interruptible)
mini_jeu: timing_température (6 jauges) + dosage (3 jauges) + canalisation (Voie active recommandée)
sortie: Lingot d'Acier Ivar × 1 (T5) — affixe gratuit *Stagger renforcé* sur item final
notes:
  - Premier alliage de la lignée Ivar — voir §7 pour passage à Acier Éternel T6
  - Forger pendant Eldoria/Feu Endormi : variant Brulé bonus
```

---

## 5. Variants par ère

> Mêmes 10 variants que [[Lingot]] §5, **mais amplifiés** sur les alliages signatures (un alliage signature porte le variant comme **partie de son identité**, pas comme bonus temporaire).

| Variant | Effet ampli sur signature |
|---------|----------------------------|
| Brulé (Eldoria) | Acier Ivar Brulé : +DoT feu permanent sur arme finale |
| Frost (Climata) | Bliysium Frost : focus magique givre permanent |
| Onirique (Somnix) | Anterium Onirique : récupère Mana pendant le sommeil |
| Spectral (Tempora) | Spuelium Spectral : sceau anti-Voie traverse les murs |
| Vénérable (Fatum) | Déterium Vénérable : 1 affixe additionnel garanti |
| Pourpre (Umbra) | Bronze Pourpre : variant économique brume |
| Doré (Eldoria) | Laiton Doré : +20% prix revente bijoux |
| Brisé (Tempora) | Acier inoxydable Brisé : durabilité ±30% RNG |
| Shadow (Noctis) | Acier au tungstène Shadow : +15% dégâts cible mobile |
| Verdoyant (Terranu) | Bronze Verdoyant : régen HP léger sur arme |

---

## 6. Crafts / items destinés

| Destination | Alliages typiques | Tier item | Référence |
|-------------|-------------------|-----------|-----------|
| Armes mêlée T3+ ([[Épée à une main]], [[Hache à une main]], [[Marteau à une main]]…) | Acier inoxydable, Acier au tungstène, Acier Ivar, Déterium | T3-T6 | [[Épée à une main]] §6 |
| Armures plate / mailles T3+ ([[Cuirasse]], [[Heaume]]…) | Acier inoxydable, Déterium, Acier Ivar | T3-T6 | TBD Phase 2 |
| Bijouterie haute ([[Anneau]], [[Amulette]], [[Bracelet]]) | Laiton, Bronze, Bliysium, Anterium | T2-T5 | TBD |
| Items magiques / focus ([[Sceptre]], [[Orbe]], [[Cristal utilisable]]) | Bliysium, Anterium | T4-T5 | [[Sceptre]] |
| Reliques / sceaux anti-Voie | Spuelium, Déterium | T3-T5 | TBD |
| [[Fil métallique]] précieux (broderie magique) | Bliysium, Anterium | T4-T5 | [[Fil métallique]] §6 |

---

## 7. Signatures notables — les 9 du CSV

### Lignée Acier (économique → mythique)

- **Bronze** (T2) — alliage du monde antique, base économique des armes T2 standardisées
- **Acier inoxydable** (T3) — résiste à la corrosion, durabilité +20%, base militaire moderne
- **Acier au tungstène** (T4) — densité accrue, anti-armure +15%, marteaux et masses
- **Acier Ivar** (T5) — lignée Ivar, affixe *Stagger renforcé* gratuit, signature des forges nordiques
- **Acier Éternel** (T6, **hors-CSV**) — fusion Acier Ivar + Cœur de [[Bestiary/Index|Zocshawk]] + Cœur de Cendre Vivante. Pas dans le CSV car non standardisé : c'est une **œuvre signée unique**, fait Héritage ([[L'Accord]]) du forgeron qui le crée

### Lignée précieuse

- **Laiton** (T2) — alliage cuivre+zinc, décoratif, bijouterie de masse, instruments
- **Bliysium** (T4) — alliage mithril+argent+cristal de Voie, focus magique léger, robes et bijoux mages d'Eldoria

### Lignée résonante / cosmique

- **Anterium** (T4) — orichalque + cuivre + essence spirituelle, conducteur de mana, items magie haut tier
- **Spuelium** (T3) — fer + plomb + poudre fabriqué, anti-Voie, reliques et sceaux Vytharia
- **Déterium** (T5) — adamantium + acier + os créature haut tier, anti-magique, armures de chasseurs de mages

> **Pattern signature** : chaque alliage **dicte un affixe gratuit** sur l'item final. Le forgeron qui choisit son alliage choisit déjà partiellement la personnalité de l'arme.

---

## 8. Décisions ouvertes

- [ ] **Acier Éternel T6** : pas dans CSV. Confirmer le statut "œuvre signée unique" vs alliage canonique. Si signature unique, ne pas l'ajouter au CSV.
- [ ] **Bliysium / Anterium / Déterium** : ces noms sont CSV mais pas explicités dans le lore. À documenter en Phase 4 (origine du nom, premier forgeron, nation associée)
- [ ] **Recyclage d'alliage** : refondre un Acier Ivar récupère-t-il le Cœur de creature ? Proposition : non, composants créature consommés irréversiblement
- [ ] **Alliage Magistral+ post-Souffle** : décroissance de la signature ? Proposition : non, signature est permanente, mais durabilité subit la décroissance standard ([[Le Souffle]])
- [ ] **Alliage cosmique T6 hors signatures** : Cosmium pur (cf. [[Lingot]] §2) peut-il être allié ? Proposition : Cosmium est déjà au plafond ; allier cosmium = œuvre Héritage

---

*Liens : [[Items/Index|← Index Items]] · [[Lingot]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Bestiary/Index]] · [[Épée à une main]] · [[L'Accord]]*
