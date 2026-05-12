---
tags: [item, archétype, ressource, fabriqué, intermédiaire, brique, maçonnerie, architecture]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Maçon
intrants_typiques: [Argile, Pierre concassée, Charbon, Liquide (eau)]
craft_category: Travail du bois et de la pierre (Maçonnerie)
métiers_consommateurs: [Maçon, Architecte, Charpentier]
tier_min: 1
tier_max: 4
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [branche-Architecture-future, brique-runique-T4-T5, frontière-Brique-Pierre-taillée]
---

# 🧱 Archétype — Brique

> Argile (ou Pierre concassée) + Chaleur de four = brique cuite. Unité **modulaire de la construction** d'Hybelior. **Pont vers la branche Architecture** (chantier futur Phase 4) : la brique est le matériau de base des maisons, murs, fortifications, fours, voûtes.

---

## 1. Vue d'ensemble

Le **Maçon** mélange Argile humide (extraite de bancs argileux par un Mineur ou un Argilier — voir [[Sources de Ressources]] §Nature ligne Pierre) avec Pierre concassée comme dégraissant, façonne en moule rectangulaire standard, sèche au soleil, puis **cuit dans un four** à briques. Le résultat est une brique **modulaire** : toutes les briques d'un même tier ont la même dimension canonique, ce qui permet la **construction modulaire** des bâtiments en Phase 4.

**Rôle d'intermédiaire :**
- **Sortie** : 1 lot d'argile + 1 cuisson → 8-20 briques selon palier
- **Entrée** : **Architecture** (Phase 4) — toutes les constructions civiles, militaires, religieuses ; aussi les **fours d'autres métiers** (four à pain Boulanger, four à fondre Forgeron, four à verre Verrier — pattern récursif)

> [!important] Pont vers la branche Architecture
> La brique est le **premier maillon** de la branche **Construction & Architecture** d'Hybelior, à développer en **Phase 4** ([[Architecture Data-Driven]] §générateurs futurs). Cet archétype expose les briques comme matériau standardisé ; les recettes de bâtiments (mur, fondation, toit, voûte) seront détaillées dans une **Phase 4 Architecture**.

---

## 2. Variations / matériaux

| Type brique | Argile / pierre source | Additif | Tier | Usage |
|-------------|------------------------|---------|------|-------|
| **Brique d'argile** | Argile commune | — | T1 | Maisons paysannes, murets |
| **Brique cuite rouge** | Argile + grains de chamotte | — | T2 | Construction civile standard |
| **Brique de pierre concassée** | Pierre concassée + liant | Chaux | T2 | Murs porteurs, fortifications légères |
| **Brique réfractaire** | Argile + Sable | Charbon broyé | T3 | Four à fondre, four à verre, cheminées de forge |
| **Brique runique** | Argile + Pigment + Cristal de Voie broyé | Essence spirituelle (T4) | T4 | Murs runiques, fortifications anti-Voie |
| **Pierre taillée** *(hors archétype Brique)* | Bloc de pierre travaillé | — | T3-T4 | Voir [[Sources de Ressources]] §Nature Pierre — pas une brique |

> **Frontière** : brique = matériau **modulaire et cuit** ; pierre taillée = bloc **non-modulaire** issu d'extraction et taille (Tailleur de pierre, pas Maçon). Les deux co-existent en construction.

---

## 3. Tier × Qualité

| Tier | Nom | Argile/Pierre × | Charbon × | Briques produites | Maîtrise | Durée |
|------|-----|------------------|-----------|---------------------|----------|-------|
| T1 | Brique d'argile | 4 | 2 | 8 | Novice | 600 s (fournée) |
| T2 | Brique cuite rouge | 4 | 4 | 12 | Initié | 900 s |
| T3 | Brique réfractaire | 4 + Sable × 1 | 6 | 16 | Adepte | 1500 s |
| T4 | Brique runique | 4 + Pigment × 1 + Cristal × 1 | 8 + Essence × 1 | 12 (densité runique) | Expert + Enchanteur Adepte | 2400 s |

> **Pas de T5/T6** : la brique plafonne à T4. Au-delà, on entre dans la **Pierre taillée** ou les **Murs cosmiques** (Phase 4 architecturale).

---

## 4. Recette de production

> Catégorie : **Travail du bois et de la pierre** ([[Crafts]] §7) — sous-branche Maçonnerie. Station : **Four à briques** (semblable au four à pain mais plus grand) + Moule à briques + Aire de séchage.

### Recette canonique T2 — Brique cuite rouge

```yaml
tier: 2
métier: Maçon
mastery_required: Initié
station: Aire de séchage + Four à briques
intrants:
  - Argile × 4 (récoltée Mineur / Argilier)
  - Liquide (eau) × 2
  - Charbon × 4
durée: 900 s (séchage 60% du temps + cuisson 40%)
mini_jeu: dosage_eau_argile + timing_cuisson (jauge montée + jauge stable)
sortie: Brique cuite rouge × 12 (T2)
notes:
  - Échec dosage eau : briques fissurées (T1 avec malus -10% durabilité)
  - Proc Maître : +4 briques bonus (16 unités)
  - Pluie pendant séchage : briques perdues si pas couvertes
```

### Recette signature — Brique runique magistrale

```yaml
tier: 4
métier: Maçon Expert + Enchanteur Adepte
mastery_required: Expert Maçonnerie + Adepte Enchantement
station: Four à briques + Cercle d'enchantement
intrants:
  - Argile × 4 + Pigment × 1
  - Cristal de Voie mineur × 1 (broyé)
  - Essence spirituelle × 1
  - Charbon × 8
durée: 2400 s (40 min)
mini_jeu: dosage + timing + canalisation_Voie continue (rare cas longue durée)
sortie: Brique runique × 12 (T4) — résiste +50% aux dégâts de sorts
```

---

## 5. Variants par ère

| Variant | Effet sur brique |
|---------|-------------------|
| **Brulé** ([[Les Ères\|Feu Endormi]]) | Brique cuite plus dure : durabilité +15% murs |
| **Frost** ([[Les Ères\|Sommeil de Glace]]) | Brique givrée : isolation thermique +20% |
| **Verdoyant** | Brique perméable au lierre : murs naturels animés |
| **Brisé** | Brique craquelée : risque effondrement RNG (cosmétique) |
| **Spectral** | Brique partiellement transparente : murs spectraux |
| **Pourpre** | Brique brume : opacité augmentée, masque les fenêtres |
| **Doré** | Brique dorée : prestige +10% prix construction |
| **Onirique** | Brique persistante en rêve : refuges oniriques |
| **Vénérable** | Brique pré-runique : 1 rune mineure gratuite |
| **Shadow** | Brique noire : bâtiments faible-lumière |

---

## 6. Crafts / items destinés (futur — Phase 4 Architecture)

| Destination | Tier brique | Quantité typique | Référence Phase 4 |
|-------------|-------------|-------------------|--------------------|
| **Mur de maison** (1 m²) | T1-T2 | 50 briques | Branche Architecture |
| **Fortification** (palissade renforcée) | T2-T3 | 200-500 briques | Branche Architecture |
| **Four à pain** (Boulanger) | T3 réfractaire | 80 briques | [[Pain]] §recettes — station |
| **Four à fondre** (Forgeron) | T3 réfractaire | 120 briques | [[Lingot]] §station |
| **Four à verre** (Verrier) | T3 réfractaire | 100 briques | [[Plaque de verre]] §station |
| **Mur runique** (anti-Voie) | T4 runique | 200-500 briques | Branche Architecture, fortifications magiques |
| **Voûte de cathédrale** | T2-T3 + pierre taillée | 1000-5000 briques | Branche Architecture, religieux |

> [!info] Branche Construction — Chantier Phase 4
> Les recettes de bâtiments (Maison T1, Maison de marchand T2, Manoir T3, Forteresse T4, etc.) sont l'objet de la **Phase 4 Architecture & Construction**, à venir. Cet archétype Brique sert de **fondation matérielle** à cette branche : toute construction sera décrite par sa **liste de matériaux** dont les briques sont le composant principal.

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet |
|-----------|------|------------|-------|
| **Brique rouge de Mosrack** | Cuite rouge T2 | Mosrack | Standard urbain, +5% prix vente bâtiment |
| **Réfractaire de Cestra** | Réfractaire T3 | Cestra | Fours commerciaux, durée chauffe -10% |
| **Brique runique d'Hibel** | Runique T4 | Hibel (académie) | Murs anti-Voie, fortifications académiques |
| **Argile noire de Vytharia** | Cuite (variant Shadow) | Vytharia caves | Discrétion, bâtiments faible-lumière |
| **Brique dorée d'Avalor** | Variant Doré | Endora | Façades royales, prestige cosmétique |

---

## 8. Décisions ouvertes

- [ ] **Branche Architecture** : Phase 4 dédiée — formaliser les **recettes de bâtiments** (mur, toit, voûte, fenêtre) à partir de cet archétype
- [ ] **Brique runique T4 → T5** : peut-on aller jusqu'à T5 ? Proposition : non, T5 = pierre taillée gravée (Sculpteur), pas brique. La brique plafonne à T4
- [ ] **Recyclage** : briques cassées peuvent-elles être broyées et réutilisées ? Proposition : oui, rendement 60%, perte 1 tier
- [ ] **Modularité dimensions** : les briques d'un tier ont-elles toutes la même dimension ? Proposition : oui, dimensions canoniques par tier (T1 = 20×10×6, T2 = 22×11×7, T3 = 24×12×8 cm) — verrouille la grille de construction modulaire
- [ ] **Briques pour fours d'autres métiers** : récursivité matérielle (brique réfractaire pour four à briques, etc.) — confirmer ce **bootstrap** est cohérent

---

*Liens : [[Items/Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Architecture Data-Driven]] · [[Pain]] · [[Lingot]] · [[Plaque de verre]]*
