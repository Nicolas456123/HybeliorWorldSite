---
tags: [item, archétype, ressource, fabriqué, intermédiaire, gemme, joaillerie]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Lapidaire / Bijoutier
intrants_typiques: [Gemme brut]
craft_category: Joaillerie et lapidaire
métiers_consommateurs: [Bijoutier, Sertisseur, Forgeron (sertissage armes), Enchanteur (focus magique)]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [taille-cosmique-T6-conditions, gemmes-mythiques-spécifiques]
---

# 💎 Archétype — Gemme taillé

> Gemme brute (récolte Mineur) **taillée, polie, calibrée** par le **Lapidaire** en gemme finie aux facettes optimales. Intermédiaire **emblématique** de la Joaillerie : alimente les bijoux ([[Anneau]], [[Amulette]]…), le sertissage d'armes haut tier ([[Épée à une main]] §6 T3+), et les **focus magiques** des items mages ([[Sceptre]], [[Orbe]]).

---

## 1. Vue d'ensemble

Le **Lapidaire** prend une gemme brute (récolte Mineur en cavernes profondes — voir [[Sources de Ressources]] §Nature ligne *Gemme brut*) et la **taille au tour à polir** selon une géométrie précise (taille brillant, taille princesse, taille rose, etc.). Chaque taille **optimise** un attribut différent : pureté optique (focus magique), brillance (prestige), répartition de masse (sertissage armes).

**Rôle d'intermédiaire :**
- **Sortie** : 1 gemme brute → 1 gemme taillée (perte de 30-60% du volume en chutes selon palier)
- **Entrée** : Bijouterie ([[Anneau]] §recette, [[Bracelet]], [[Amulette]] sertis), Armes Forge T3+ ([[Épée à une main]] §6 T3 *Gemme taillé × 1 optionnel*), [[Sceptre]] (focus magique), [[Orbe]] (sphère cristalline taillée)

---

## 2. Variations / matériaux (gemmes canoniques)

| Gemme | Couleur | Tier plancher | Tier plafond | Affinité magique |
|-------|---------|---------------|--------------|------------------|
| **Quartz** | Translucide | T1 | T2 | Aucune (focus neutre) |
| **Améthyste** | Violet | T2 | T3 | Voies obscures (Noctis, Umbra) |
| **Topaze** | Jaune | T2 | T3 | Voies solaires (Eldoria) |
| **Émeraude** | Vert | T3 | T4 | Voies végétales (Terranu, Spiritus) |
| **Rubis** | Rouge | T3 | T4 | Voies de feu (Eldoria — feu) |
| **Saphir** | Bleu | T3 | T4 | Voies aquatiques (Aquor) |
| **Diamant** | Translucide pur | T4 | T5 | Universelle, +durabilité |
| **Opale** | Irisée | T3 | T4 | Voies oniriques (Somnix) |
| **Cristal de Voie** | Variable | T4 | T6 | Voies majeures — focus haut tier |
| **Larme cristallisée** | Variable | T5 | T6 | Voies oraculaires (Fatum) |
| **Cosmite** *(stub Phase 4)* | Cosmique | T6 | T6 | Multi-Voie, mythique |

> **Note** : le **Cristal de Voie** ([[Cristal de Voie]]) est traité ici comme une **gemme taillée spécifique haut tier** quand il a été affiné par un Lapidaire Maître. À l'état brut, c'est une ressource Nature séparée.

---

## 3. Tier × Qualité

> **Règle** : le tier d'une gemme taillée **n'augmente pas** le tier de la brute (le Lapidaire **préserve** le tier inhérent), mais **permet l'expression** des affinités magiques. Une gemme brute T3 mal taillée (Novice) reste T3 mais perd 50% de sa résonance et l'affinité magique est nulle.

| Tier | Nom | Brute consommée | Volume préservé | Maîtrise | Durée |
|------|-----|------------------|------------------|----------|-------|
| T1 | Gemme commune taillée | 1 | 40% (pertes énormes) | Novice | 120 s |
| T2 | Gemme façonnée | 1 | 55% | Initié | 240 s |
| T3 | Gemme œuvrée | 1 | 65% (taille brillant standard) | Adepte | 480 s |
| T4 | Gemme magistrale | 1 | 75% (résonance optimale) | Expert | 900 s |
| T5 | Gemme légendaire | 1 | 80% (affinité parfaite) | Maître | 1800 s |
| T6 | Gemme mythique | 1 + condition cachée 🔒 | 90% (perfection cristallographique) | Maître + signature | 3600 s + scénarisé |

> **Échec critique au Novice** : 5% de chance de **briser** la gemme brute — perte totale.

---

## 4. Recette de production

> Catégorie : **Joaillerie et lapidaire** ([[Crafts]] §6). Station : **Tour à polir** + Pince à tenir + Outils de taille (limes, ciseaux fins).

### Recette canonique T3 — Émeraude œuvrée

```yaml
tier: 3
métier: Lapidaire (sous-spécialité Bijoutier)
mastery_required: Adepte
station: Tour à polir + Outils de taille
intrants:
  - Gemme brut (émeraude brute) × 1 (T3)
  - Huile × 0.1 cruche (lubrification taille — voir [[Huile]])
durée: 480 s (8 min — 3 phases : ébauche, taille, polissage)
mini_jeu: précision_taille (3 jauges, fenêtre verte 0.6s) + alignement_facettes
sortie: Émeraude taillée × 1 (T3) — affinité Voies végétales préservée
notes:
  - Sous-produit : Poudre de gemme (chutes — récupérable en [[Poudre fabriqué]] cristalline)
  - Échec taille : gemme T2 (perte 1 tier de qualité, brute consommée)
  - Proc Maître : 1 gemme bonus + qualité T+1 possible
```

### Recette signature — Cristal de Voie taillé légendaire

```yaml
tier: 5
métier: Lapidaire Maître + Enchanteur Adepte
mastery_required: Maître Lapidaire + Adepte Enchantement
station: Tour à polir rituel + Cercle d'enchantement (mini)
intrants:
  - Cristal de Voie brut × 1 (T4-T5)
  - Huile rituelle × 0.2 cruche
  - Essence spirituelle × 1 (préserve résonance)
durée: 1800 s (30 min — non interruptible)
mini_jeu: précision_taille (5 jauges) + canalisation_Voie continue
sortie: Cristal de Voie taillé × 1 (T5) — focus magique haut tier, +résonance Voie
```

### Recette ultime — Gemme mythique T6

```yaml
tier: 6
métier: Lapidaire Maître + Enchanteur Maître + signature
mastery_required: Maître + condition cachée 🔒 (taille pendant ère cosmique précise)
station: Tour à polir d'une cité-académie (Hibel) ou cité-temple
intrants:
  - Larme cristallisée × 1 (drop boss mondial)
  - Composant ère × 1
  - Essence spirituelle × 2
  - Huile sacrée × 0.5 cruche
durée: 3600 s+ (variable — quête de taille scénarisée)
mini_jeu: aucun standard — quête narrative
sortie: Gemme mythique × 1 (T6) — devient Héritage ([[L'Accord]]) du joueur
```

---

## 5. Variants par ère

| Variant | Effet gemme |
|---------|--------------|
| **Doré** ([[Les Ères\|Rêve Lumineux]]) | Halo doré permanent : +20% prestige bijouterie |
| **Verdoyant** | Veinures vivantes : régen mineure quand portée |
| **Frost** | Givre interne : +résistance givre sur item serti |
| **Brulé** | Lueur ambrée : +5% dégâts feu sur arme sertie |
| **Onirique** | Couleur changeante en rêve : gemmes oniriques |
| **Vénérable** | Marques runiques internes : 1 affixe gratuit en sertissage |
| **Pourpre** | Aura brume : gemmes signalétiques faction Umbra |
| **Spectral** | Gemme presque invisible : sertissages discrets |
| **Brisé** | Gemme RNG : 50% double effet / 50% nul |
| **Shadow** | Gemme noire absorbante : -5% détection portée |

---

## 6. Crafts / items destinés

| Destination | Type gemme | Quantité | Référence |
|-------------|------------|----------|-----------|
| **Bijouterie** ([[Anneau]], [[Bracelet]], [[Amulette]], [[Boucle d'oreille]], [[Broche]]) | Toutes | 1-3 / bijou | [[Anneau]] §recettes |
| **Sertissage armes haut tier** ([[Épée à une main]] T3+ §6, [[Hache à une main]], [[Marteau à une main]]…) | Rubis, saphir, émeraude, diamant | 1-2 / arme | [[Épée à une main]] §6 |
| **Sertissage armures haut tier** | Diamant, saphir, émeraude | 2-4 / cuirasse | TBD Phase 2 |
| **Focus magique** ([[Sceptre]], [[Orbe]], [[Talisman]]) | Cristal de Voie, opale, gemme affinité | 1 / focus | [[Sceptre]], [[Orbe]] |
| **Couronnes / regalia** (royal — Phase 4) | Diamant, rubis, gemme mythique | 5-20 / couronne | TBD Phase 4 |
| **Reliques / ostensoirs** (religion) | Cristal de Voie, larme cristallisée | 1-3 / relique | TBD Phase 4 religion |
| **Lentilles magiques** (avec [[Plaque de verre]] verre de Voie) | Cristal taillé fin | 1 / lentille | [[Plaque de verre]] §6 |

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet |
|-----------|------|------------|-------|
| **Diamant d'Avalor** | Diamant T4-T5 | Endora (mines royales) | Standard regalia, +durabilité bijou |
| **Émeraude d'Onara** | Émeraude T4 | Onara (forêts cosmiques) | Affinité Voies végétales pure, +Esprit |
| **Saphir de Cestra** | Saphir T3 | Cestra (récifs profonds) | Affinité Voies aquatiques, focus marin |
| **Rubis d'Eldoria** | Rubis T4 | Eldoria (cratères volcaniques) | Affinité Voies de feu, +5% dégâts feu |
| **Cristal de Voie d'Hibel** | Cristal taillé T5 | Hibel (académie) | Focus mages haut tier, étalon académique |
| **Améthyste de Vytharia** | Améthyste T3 | Vytharia (cavernes profondes) | Affinité Voies obscures, focus assassins-mages |
| **Larme de Galenor** | Larme cristallisée T5 | Galenor (drop créatures cosmiques) | Affinité Voies oraculaires (Fatum) |
| **Opale d'Ilthara** | Opale T4 | Ilthara (cité-monastère onirique) | Affinité Voies oniriques (Somnix), +Esprit en rêve |

---

## 8. Décisions ouvertes

- [ ] **Cristal de Voie brut vs taillé** : confirmer la frontière. Brut = ressource Nature ; Taillé = ressource Fabriqué (cet archétype). Préserver les deux entrées
- [ ] **Gemme cosmique T6** : confirmer existence + condition cachée. Proposition : oui, mais drop scénarisé uniquement (pas tier standard récolte)
- [ ] **Recyclage** : gemme brisée = perte totale ou récupérable en poudre ? Proposition : récupérable en [[Poudre fabriqué]] cristalline (rendement 30%)
- [ ] **Affinité magique vs sertissage arme** : un rubis serti sur une épée donne-t-il l'affixe *Élémentaire feu* gratuitement ? Proposition : oui mais seulement si Bijoutier+Forgeron co-craftent ; sinon affinité partielle (+5% dégâts feu)
- [ ] **Pertes au polissage** : un Novice perd 60% du volume — c'est punitif. Proposition : oui, c'est intentionnel pour valoriser les Maîtres
- [ ] **Gemmes mythiques nominales** : faut-il fixer 5-10 noms canoniques (Cœur d'Avalor, Larme du Premier Voile, etc.) ? Proposition : oui en Phase 4 avec lore associé

---

*Liens : [[Items - Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Anneau]] · [[Épée à une main]] · [[Sceptre]] · [[Orbe]] · [[Cristal de Voie]] · [[Plaque de verre]] · [[L'Accord]]*
